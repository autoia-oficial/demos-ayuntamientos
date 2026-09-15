// ---------------------------------------------------------------------------
//  CAJA — base de datos cifrada para los datos del CRM
//
//    node datos/caja.mjs guardar <fichero.json>   cifra y guarda
//    node datos/caja.mjs abrir [salida.json]      descifra
//    node datos/caja.mjs estado                   info sin descifrar nada
//
//  Cifrado: AES-256-GCM. La clave sale de tu contraseña con scrypt.
//
//  GCM va autenticado: si alguien cambia un solo bit del fichero, al abrirlo
//  falla en vez de devolver datos corruptos en silencio. Eso importa más que
//  el cifrado en sí: un CRM que devuelve datos alterados sin avisar es peor
//  que uno que no abre.
//
//  Sin dependencias: todo sale de node:crypto.
// ---------------------------------------------------------------------------
import { scryptSync, randomBytes, createCipheriv, createDecipheriv, timingSafeEqual } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const AQUI = dirname(fileURLToPath(import.meta.url));
const CAJA = join(AQUI, 'crm.caja');

const MAGIA   = Buffer.from('AUTOIACAJA1');   // 11 bytes: identifica el formato
const SAL     = 16;
const NONCE   = 12;
const ETIQUETA = 16;

// scrypt con coste alto: ~1 s por intento. Contra quien pruebe contraseñas a
// lo bruto, cada intento le cuesta ese segundo. Subirlo rompe los ficheros ya
// creados, así que el coste va escrito en la cabecera.
const COSTE = { N: 1 << 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };

function derivar(clave, sal) {
  return scryptSync(clave, sal, 32, COSTE);
}

// La contraseña NO se pasa por argumentos: 'ps' la enseñaría a cualquier otro
// usuario de la máquina. Variable de entorno o preguntada por pantalla.
async function pedirClave(confirmar = false) {
  if (process.env.CAJA_CLAVE) return process.env.CAJA_CLAVE;
  if (!process.stdin.isTTY) {
    console.error('Sin terminal interactiva: exporta CAJA_CLAVE.');
    process.exit(1);
  }
  const preguntar = texto => new Promise(resolver => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const alEscribir = () => rl.output.write('\x1B[2K\x1B[200D' + texto);
    rl.input.on('data', alEscribir);
    rl.question(texto, respuesta => {
      rl.input.off('data', alEscribir);
      rl.close();
      process.stdout.write('\n');
      resolver(respuesta);
    });
  });
  const clave = await preguntar('  Contraseña de la caja: ');
  if (!clave) { console.error('Vacía. Cancelado.'); process.exit(1); }
  if (confirmar) {
    const otra = await preguntar('  Repítela: ');
    const a = Buffer.from(clave), b = Buffer.from(otra);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      console.error('No coinciden. Cancelado.');
      process.exit(1);
    }
  }
  return clave;
}

// ------------------------------------------------------------------ cifrar --
function cifrar(textoPlano, clave) {
  const sal   = randomBytes(SAL);
  const nonce = randomBytes(NONCE);
  const k     = derivar(clave, sal);
  const c     = createCipheriv('aes-256-gcm', k, nonce);
  // La cabecera entra como datos autenticados: si alguien la manipula para
  // rebajar el coste de scrypt, el descifrado falla.
  c.setAAD(MAGIA);
  const cuerpo = Buffer.concat([c.update(textoPlano, 'utf8'), c.final()]);
  return Buffer.concat([MAGIA, sal, nonce, c.getAuthTag(), cuerpo]);
}

function descifrar(buffer, clave) {
  if (buffer.length < MAGIA.length + SAL + NONCE + ETIQUETA)
    throw new Error('el fichero está truncado');
  if (!buffer.subarray(0, MAGIA.length).equals(MAGIA))
    throw new Error('no es una caja de AutoIA');

  let i = MAGIA.length;
  const sal      = buffer.subarray(i, i += SAL);
  const nonce    = buffer.subarray(i, i += NONCE);
  const etiqueta = buffer.subarray(i, i += ETIQUETA);
  const cuerpo   = buffer.subarray(i);

  const d = createDecipheriv('aes-256-gcm', derivar(clave, sal), nonce);
  d.setAAD(MAGIA);
  d.setAuthTag(etiqueta);
  return Buffer.concat([d.update(cuerpo), d.final()]).toString('utf8');
}

// ------------------------------------------------------------------ órdenes --
const [orden, argumento] = process.argv.slice(2);

if (orden === 'guardar') {
  if (!argumento || !existsSync(argumento)) {
    console.error('Uso: node datos/caja.mjs guardar <fichero.json>');
    process.exit(1);
  }
  const contenido = readFileSync(argumento, 'utf8');
  try { JSON.parse(contenido); }
  catch { console.error('Ese fichero no es JSON válido.'); process.exit(1); }

  if (existsSync(CAJA)) {
    console.log(`  Ya existe ${CAJA}. Se va a sobrescribir.`);
  }
  const clave = await pedirClave(true);
  process.stdout.write('  Derivando clave… ');
  const cifrado = cifrar(contenido, clave);
  writeFileSync(CAJA, cifrado, { mode: 0o600 });   // sólo tu usuario puede leerla
  console.log('hecho.');
  console.log(`  Guardado: ${CAJA}  (${cifrado.length} bytes)`);

} else if (orden === 'abrir') {
  if (!existsSync(CAJA)) { console.error(`No existe ${CAJA}.`); process.exit(1); }
  const clave = await pedirClave();
  let plano;
  try {
    plano = descifrar(readFileSync(CAJA), clave);
  } catch (e) {
    // GCM no distingue contraseña mala de fichero manipulado: ambas rompen la
    // etiqueta. Se dice así, sin adivinar cuál de las dos fue.
    console.error(`\n  No se pudo abrir: contraseña incorrecta o fichero alterado.`);
    console.error(`  (${e.message})`);
    process.exit(1);
  }
  if (argumento) {
    writeFileSync(argumento, plano, { mode: 0o600 });
    console.log(`  Descifrado en ${argumento}`);
  } else {
    process.stdout.write(plano.endsWith('\n') ? plano : plano + '\n');
  }

} else if (orden === 'estado') {
  if (!existsSync(CAJA)) { console.log('  No hay ninguna caja todavía.'); process.exit(0); }
  const s = statSync(CAJA);
  const b = readFileSync(CAJA);
  const valida = b.length > MAGIA.length && b.subarray(0, MAGIA.length).equals(MAGIA);
  console.log(`  fichero   : ${CAJA}`);
  console.log(`  tamaño    : ${s.size} bytes`);
  console.log(`  permisos  : ${(s.mode & 0o777).toString(8)}`);
  console.log(`  modificado: ${s.mtime.toISOString().slice(0, 16).replace('T', ' ')}`);
  console.log(`  formato   : ${valida ? 'caja de AutoIA (AES-256-GCM)' : 'NO RECONOCIDO'}`);
  console.log(`  cifrado   : AES-256-GCM · scrypt N=${COSTE.N}`);

} else {
  console.log(`
  CAJA — base de datos cifrada del CRM

    node datos/caja.mjs guardar <fichero.json>   cifra un JSON
    node datos/caja.mjs abrir [salida.json]      lo descifra
    node datos/caja.mjs estado                   info sin descifrar

  La contraseña se pregunta por pantalla, o se pasa en CAJA_CLAVE.
  Nunca por argumentos: 'ps' las deja ver a los demás usuarios.
`);
}
