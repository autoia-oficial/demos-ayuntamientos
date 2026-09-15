// ---------------------------------------------------------------------------
//  ESTADO REAL DEL CRM A PARTIR DE LOS CORREOS YA ENVIADOS
//
//    node datos/desde-gmail.mjs datos/municipios.json crm-inicial.json
//
//  El CRM arrancaba vacío, pero la campaña ya había salido a mano desde
//  contacto.autoia@gmail.com. Esto reconstruye ese estado para importarlo con
//  el botón "Importar".
//
//  La lista de ENVIOS se sacó del buzón de enviados de esa cuenta: 16 hilos con
//  el asunto "Asistente virtual de atención ciudadana", el 8 y el 10 de
//  septiembre de 2026. Ninguno rebotó y sólo contestó Badajoz. No hay aquí
//  ninguna dirección que no saliera de verdad: eso es lo que la hace fiable.
//
//  Si se manda otra tanda a mano, se añade aquí y se vuelve a ejecutar. Lo que
//  salga de correos/enviar.mjs NO hace falta apuntarlo: ese deja su propio
//  registro en enviados.json.
// ---------------------------------------------------------------------------
// El formato del CRM es { slug: { estado, nota, fecha } }. Los estados válidos
// son los de crm/index.html: pendiente, enviado, respondido, reunion, cliente,
// descartado.
import { readFileSync, writeFileSync } from 'node:fs';

// Sacado del buzón de enviados. Cada línea es un correo que salió de verdad:
// no hay ninguna dirección aquí que no esté en Gmail.
const ENVIOS = [
  ['010@ayto-alcaladehenares.es',    '2026-09-08'],
  ['contacto@aytobadajoz.es',        '2026-09-08'],
  ['omac@elche.es',                  '2026-09-08'],
  ['info@jumilla.org',               '2026-09-08'],
  ['atencion.ciudadano@aytoleon.es', '2026-09-08'],
  ['participacion@logrono.es',       '2026-09-08'],
  ['pinto@ayto-pinto.es',            '2026-09-08'],
  ['info@telde.es',                  '2026-09-08'],
  ['sac@badalona.cat',               '2026-09-10'],
  ['web@doshermanas.es',             '2026-09-10'],
  ['oac@aytojerez.es',               '2026-09-10'],
  ['010@leganes.org',                '2026-09-10'],
  ['sac@ayuntamientoparla.es',       '2026-09-10'],
  ['informacion@ayto-santander.es',  '2026-09-10'],
  ['omac@tarragona.cat',             '2026-09-10'],
  ['010infotramits@terrassa.cat',    '2026-09-10'],
];

// Quien contestó. Fecha = la de la respuesta, no la del envío.
const RESPUESTAS = {
  'contacto@aytobadajoz.es': {
    fecha: '2026-09-11',
    nota: 'Responden desde Contacto: hay que presentarlo por la sede electrónica para que llegue a Modernización. Contestado el 11 pidiendo que lo trasladen ellos mientras se activa el acceso.',
  },
};

const municipios = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const porEmail = new Map(municipios.filter(m => m.email).map(m => [m.email.toLowerCase(), m]));
// El índice por dominio usa dos fuentes: el campo 'dominios' (la web oficial) y
// el dominio del propio correo de contacto. Hacen falta las dos: a Santander se
// le escribió a informacion@ayto-santander.es, pero su campo 'dominios' dice
// "santander.es y sede.santander.es" — sólo con eso no cruzaría.
const porDominio = new Map();
const apuntar = (d, m) => {
  if (!d) return;
  if (!porDominio.has(d)) porDominio.set(d, []);
  if (!porDominio.get(d).includes(m)) porDominio.get(d).push(m);
};
for (const m of municipios) {
  for (const d of String(m.dominios || '').split(/,| y | e /).map(s => s.trim().toLowerCase()).filter(Boolean)) apuntar(d, m);
  if (m.email) apuntar(m.email.split('@')[1].toLowerCase(), m);
}

const estado = {};
const sinCruzar = [];
const porNombre = [];

for (const [email, fecha] of ENVIOS) {
  const dominio = email.split('@')[1].toLowerCase();
  let m = porEmail.get(email.toLowerCase());
  let via = 'correo exacto en municipios.json';
  if (!m) {
    const cand = porDominio.get(dominio) || [];
    if (cand.length === 1) { m = cand[0]; via = `dominio ${dominio}`; }
    else if (cand.length > 1) { sinCruzar.push(`${email}: el dominio ${dominio} lo comparten ${cand.map(c => c.slug).join(', ')}`); continue; }
  }
  if (!m) { sinCruzar.push(`${email}: ningún municipio con ese correo ni ese dominio`); continue; }

  const r = RESPUESTAS[email.toLowerCase()];
  // Si se escribió a una dirección distinta de la que tiene el municipio en la
  // lista, conviene que el CRM lo diga: si no, parecería que no se ha escrito.
  const otra = m.email && m.email.toLowerCase() !== email.toLowerCase()
    ? ` (en la lista figura ${m.email})` : '';
  estado[m.slug] = r
    ? { estado: 'respondido', nota: r.nota, fecha: r.fecha }
    : { estado: 'enviado',    nota: `Enviado el ${fecha} a ${email}${otra}. Sin respuesta.`, fecha };
  porNombre.push([m.nombre, m.slug, m.dia, via, estado[m.slug].estado]);
}

writeFileSync(process.argv[3], JSON.stringify(estado, null, 2) + '\n');

porNombre.sort((a, b) => a[0].localeCompare(b[0], 'es'));
console.log(`cruzados: ${porNombre.length} de ${ENVIOS.length}\n`);
for (const [nombre, slug, dia, via, est] of porNombre)
  console.log(`  ${est.padEnd(11)} ${nombre.padEnd(20)} ${('día ' + dia).padEnd(7)} slug=${slug.padEnd(20)} (${via})`);
if (sinCruzar.length) { console.log('\nSIN CRUZAR:'); for (const s of sinCruzar) console.log('  ' + s); }
