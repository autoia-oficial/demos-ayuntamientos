// ---------------------------------------------------------------------------
//  EXTRAE LOS MUNICIPIOS A UN JSON QUE EL CRM PUEDA LEER
//
//    node sistema-de-ventas/datos/extraer.mjs
//
//  Importa los mismos ficheros que usa _generar/generar.mjs, así que la lista
//  del CRM y la de las demos no pueden desincronizarse: hay una sola fuente.
//
//  No inventa correos. Si un ayuntamiento no tiene email verificado, sale con
//  email vacío y el CRM lo marca como "sólo teléfono". Es la misma regla que
//  siguen los ficheros de origen, y conviene respetarla: un correo inventado
//  rebota, y los rebotes queman el dominio del remitente.
// ---------------------------------------------------------------------------
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const GEN  = join(AQUI, '..', '..', '_generar');

// Las tandas, en el orden en que se enviaron. La primera se llama
// municipios.mjs por razones históricas; las demás siguen el patrón del día.
const TANDAS = [
  // El día 01 construye su lista con un .map() sobre META y lee la base de
  // conocimiento de cada demo publicada, pero exporta igual que las demás.
  ['municipios-dia01.mjs',  'MUNICIPIOS_DIA01',  1],
  ['municipios.mjs',        'MUNICIPIOS',        2],
  ...Array.from({ length: 17 }, (_, i) => {
    const n = i + 3;
    const dd = String(n).padStart(2, '0');
    return [`municipios-dia${dd}.mjs`, `MUNICIPIOS_DIA${dd}`, n];
  }),
];

const municipios = [];
const fallos = [];

for (const [fichero, exportado, dia] of TANDAS) {
  let modulo;
  try {
    modulo = await import(join(GEN, fichero));
  } catch (e) {
    fallos.push(`${fichero}: no se puede importar (${e.code || e.message})`);
    continue;
  }
  const lista = modulo[exportado];
  if (!Array.isArray(lista)) {
    fallos.push(`${fichero}: no exporta ${exportado}`);
    continue;
  }
  for (const m of lista) {
    const email = m.oficina?.email || '';
    const tel   = m.oficina?.tel   || '';
    // La tanda del día 01 se envió a mano y no dejó contacto apuntado: sólo el
    // nombre de la oficina. Se marca como 'falta' en vez de dejarlo en blanco,
    // para que el CRM lo saque a buscar en vez de darlo por inservible.
    const contacto = email ? 'email' : tel ? 'solo-tel' : 'falta';
    municipios.push({
      slug:     m.slug,
      nombre:   m.nombre,
      dia,
      demo:     `https://autoia-oficial.github.io/demos-ayuntamientos/${m.slug}/`,
      tel,
      email,
      contacto,
      oficina:  m.oficina?.sigla || '',
      dominios: [].concat(m.dominios || []).join(', '),
    });
  }
}

// Un mismo municipio no debe aparecer en dos tandas: sería un correo duplicado.
const vistos = new Map();
const duplicados = [];
for (const m of municipios) {
  if (vistos.has(m.slug)) duplicados.push(`${m.slug} (días ${vistos.get(m.slug)} y ${m.dia})`);
  else vistos.set(m.slug, m.dia);
}

mkdirSync(AQUI, { recursive: true });
writeFileSync(join(AQUI, 'municipios.json'), JSON.stringify(municipios, null, 2) + '\n');

const cuenta = c => municipios.filter(m => m.contacto === c).length;
console.log(`municipios      : ${municipios.length}`);
console.log(`con correo      : ${cuenta('email')}`);
console.log(`sólo teléfono   : ${cuenta('solo-tel')}`);
console.log(`SIN contacto    : ${cuenta('falta')}  <- hay que buscarles el correo`);
console.log(`tandas          : ${new Set(municipios.map(m => m.dia)).size}`);
if (duplicados.length) console.log(`DUPLICADOS      : ${duplicados.join(', ')}`);
if (fallos.length)     console.log(`avisos          :\n  ${fallos.join('\n  ')}`);
