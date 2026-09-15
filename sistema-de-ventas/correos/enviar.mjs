// ---------------------------------------------------------------------------
//  ENVÍO DIARIO A AYUNTAMIENTOS
//
//    node correos/enviar.mjs --dia 5              simula (NO envía nada)
//    node correos/enviar.mjs --dia 5 --enviar     envía de verdad
//
//  Por defecto SIMULA. Enviar de verdad exige --enviar a propósito: un fallo
//  aquí no se puede deshacer, y un correo mal mandado a un ayuntamiento se
//  paga con el dominio quemado.
//
//  Tres reglas que el script no deja saltarse:
//    1. A quien esté en bajas.txt no se le escribe. Nunca.
//    2. A quien ya se le escribió no se le repite (registro en enviados.json).
//    3. Sin correo verificado no se inventa ninguno: ese municipio se salta.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { enviarCorreo } from './smtp.mjs';

const AQUI  = dirname(fileURLToPath(import.meta.url));
const DATOS = join(AQUI, '..', 'datos', 'municipios.json');
const REGISTRO = join(AQUI, 'enviados.json');

// ------------------------------------------------------------- argumentos --
const args = process.argv.slice(2);
const valor = n => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };
const dia     = valor('--dia');
const deVerdad = args.includes('--enviar');

if (!dia || !/^\d+$/.test(dia)) {
  console.error('Uso: node correos/enviar.mjs --dia <número> [--enviar]');
  process.exit(1);
}

// ----------------------------------------------------------------- datos ---
if (!existsSync(DATOS)) {
  console.error('Falta datos/municipios.json. Genéralo:  node datos/extraer.mjs');
  process.exit(1);
}
const municipios = JSON.parse(readFileSync(DATOS, 'utf8'));

const bajas = new Set(
  (existsSync(join(AQUI, 'bajas.txt'))
    ? readFileSync(join(AQUI, 'bajas.txt'), 'utf8').split('\n') : [])
    .map(l => l.trim().toLowerCase())
    .filter(l => l && !l.startsWith('#'))
);

const enviados = existsSync(REGISTRO)
  ? JSON.parse(readFileSync(REGISTRO, 'utf8')) : {};

// --------------------------------------------------------------- selección --
const tanda = municipios.filter(m => String(m.dia) === dia);
if (!tanda.length) {
  console.error(`No hay ningún municipio en la tanda ${dia}.`);
  process.exit(1);
}

const saltados = [];
const cola = [];
for (const m of tanda) {
  const correo = (m.email || '').trim().toLowerCase();
  if (!correo)                 { saltados.push([m.nombre, 'sin correo verificado']); continue; }
  if (bajas.has(correo))       { saltados.push([m.nombre, 'pidió la BAJA']);          continue; }
  if (enviados[m.slug])        { saltados.push([m.nombre, `ya se le escribió el ${enviados[m.slug].fecha}`]); continue; }
  cola.push(m);
}

// ------------------------------------------------------------- plantilla ---
const cfgRuta = join(AQUI, 'config.json');
let cfg = null;
if (existsSync(cfgRuta)) cfg = JSON.parse(readFileSync(cfgRuta, 'utf8'));

const cruda = readFileSync(join(AQUI, 'plantilla.txt'), 'utf8');
const [lineaAsunto, ...resto] = cruda.split('\n');
const plantillaAsunto = lineaAsunto.replace(/^Asunto:\s*/, '');
const plantillaCuerpo = resto.join('\n').trim();

// Las siglas vienen con su artículo puesto ('el SAC', 'la OMAC', "l'OAC").
// Detrás de la preposición 'a', el castellano contrae: a + el = al. Sin esto
// salen 63 correos diciendo 'a el SAC', que es justo el detalle que hace que
// un correo comercial parezca automático.
const conPreposicionA = oficina =>
  oficina.startsWith('el ') ? 'al ' + oficina.slice(3) : 'a ' + oficina;

const rellenar = (txt, m) => {
  const oficina = m.oficina || 'la oficina de atención ciudadana';
  return txt
    .replaceAll('{{NOMBRE}}',     m.nombre)
    .replaceAll('{{DEMO}}',       m.demo)
    .replaceAll('{{A_OFICINA}}',  conPreposicionA(oficina))
    .replaceAll('{{OFICINA}}',    oficina)
    .replaceAll('{{REMITENTE}}',  cfg?.remitente || 'tu-correo@tudominio.es');
};

// ---------------------------------------------------------------- informe --
console.log(`\n  TANDA ${dia} — ${deVerdad ? 'ENVÍO REAL' : 'SIMULACIÓN'}\n`);
console.log(`  en la tanda   : ${tanda.length}`);
console.log(`  se enviarían  : ${cola.length}`);
console.log(`  se saltan     : ${saltados.length}`);
if (saltados.length) {
  for (const [n, motivo] of saltados) console.log(`      · ${n} — ${motivo}`);
}

const tope = cfg?.porDia ?? 15;
if (cola.length > tope) {
  console.log(`\n  Tope diario de ${tope}; se mandarán los ${tope} primeros.`);
  cola.length = tope;
}

if (!cola.length) { console.log('\n  Nada que enviar.\n'); process.exit(0); }

// Se enseña el primero entero: si algo está mal escrito, se ve aquí y no en
// la bandeja de entrada de un ayuntamiento.
console.log('\n  ── VISTA PREVIA DEL PRIMERO ' + '─'.repeat(38));
console.log(`  Para:   ${cola[0].email}`);
console.log(`  Asunto: ${rellenar(plantillaAsunto, cola[0])}`);
console.log();
console.log(rellenar(plantillaCuerpo, cola[0]).split('\n').map(l => '  │ ' + l).join('\n'));
console.log('  ' + '─'.repeat(64) + '\n');

if (!deVerdad) {
  console.log('  Esto ha sido una simulación: no se ha enviado nada.');
  console.log(`  Para enviar de verdad:  node correos/enviar.mjs --dia ${dia} --enviar\n`);
  process.exit(0);
}

// ----------------------------------------------------------------- envío ---
if (!cfg) {
  console.error('\n  Falta correos/config.json.');
  console.error('  Cópialo de config.ejemplo.json y pon tus datos SMTP.\n');
  process.exit(1);
}

const espera = (cfg.segundosEntreEnvios ?? 45) * 1000;
let bien = 0, mal = 0;

for (const [i, m] of cola.entries()) {
  try {
    await enviarCorreo(cfg, {
      para:       m.email,
      asunto:     rellenar(plantillaAsunto, m),
      cuerpo:     rellenar(plantillaCuerpo, m),
      responderA: cfg.responderA || '',
    });
    enviados[m.slug] = { fecha: new Date().toISOString().slice(0, 10), email: m.email };
    // Se guarda después de CADA envío: si esto se corta a la mitad, lo ya
    // enviado queda registrado y no se repite en la siguiente ejecución.
    writeFileSync(REGISTRO, JSON.stringify(enviados, null, 2) + '\n');
    bien++;
    console.log(`  ✓ ${m.nombre} <${m.email}>`);
  } catch (e) {
    mal++;
    console.log(`  ✗ ${m.nombre} <${m.email}> — ${e.message}`);
  }
  if (i < cola.length - 1) {
    await new Promise(r => setTimeout(r, espera));
  }
}

console.log(`\n  Enviados: ${bien}   Fallidos: ${mal}\n`);
