// ---------------------------------------------------------------------------
//  DIA 01 — los ocho primeros.
//
//  Estos ocho no los genero generar.mjs: se escribieron a mano antes de que
//  existiera el generador, y por eso no tenian su municipios-diaNN.mjs como
//  los demas. Este archivo existe para que el sistema de seguimientos pueda
//  tratarlos igual que al resto.
//
//  Los metadatos van a mano. Las claves del kb NO: se leen de la demo
//  publicada en _demos-web/<slug>/index.html, que es la que el ayuntamiento
//  tiene delante. Asi este archivo no puede prometer en un correo un tema que
//  la demo no responda: si se toca la demo, esto cambia solo.
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEMOS = join(dirname(fileURLToPath(import.meta.url)), '..');

// Saca los k:[...] del KB de la demo. Solo se queda con las claves: es lo
// unico que necesitan los seguimientos para saber de que sabe hablar.
function clavesDeLaDemo(slug) {
  const f = join(DEMOS, slug, 'index.html');
  if (!existsSync(f)) return [];
  const html = readFileSync(f, 'utf8');
  const dentro = html.slice(html.indexOf('const KB'), html.indexOf('const BLOCK'));
  const kb = [];
  for (const m of dentro.matchAll(/"?k"?\s*:\s*\[([^\]]*)\]/g)) {
    const k = [...m[1].matchAll(/"([^"]*)"/g)].map(x => x[1]).filter(Boolean);
    if (k.length) kb.push({ k });
  }
  return kb;
}

const META = [
  { slug: 'leon', nombre: 'León', articulo: 'de León', dominios: ['aytoleon.es'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
  { slug: 'alcala-de-henares', nombre: 'Alcalá de Henares', articulo: 'de Alcalá de Henares',
    dominios: ['ayto-alcaladehenares.es'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
  { slug: 'pinto', nombre: 'Pinto', articulo: 'de Pinto', dominios: ['ayto-pinto.es'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
  { slug: 'elche', nombre: 'Elche', articulo: 'de Elche', dominios: ['elche.es'],
    oficina: { sigla: 'la OMAC' },
    idioma2: { cod: 'VA', clave: 'va', sigla: 'a la OMAC', nombre: 'valenciano', sufijo: 'va' } },
  { slug: 'badajoz', nombre: 'Badajoz', articulo: 'de Badajoz', dominios: ['aytobadajoz.es'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
  { slug: 'telde', nombre: 'Telde', articulo: 'de Telde', dominios: ['telde.es'],
    oficina: { sigla: 'la Oficina de Atención a la Ciudadanía' }, idioma2: null },
  { slug: 'logrono', nombre: 'Logroño', articulo: 'de Logroño', dominios: ['logrono.es'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
  { slug: 'jumilla', nombre: 'Jumilla', articulo: 'de Jumilla', dominios: ['jumilla.org'],
    oficina: { sigla: 'el Servicio de Atención Ciudadana' }, idioma2: null },
];

export const MUNICIPIOS_DIA01 = META.map(m => ({ ...m, kb: clavesDeLaDemo(m.slug) }));
