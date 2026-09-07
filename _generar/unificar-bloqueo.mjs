// ---------------------------------------------------------------------------
//  PONE LA MISMA LISTA DE BLOQUEO EN LAS DEMOS ESCRITAS A MANO
//
//    node _generar/unificar-bloqueo.mjs
//
//  Las ocho demos de la primera tanda no las escribe generar.mjs: son
//  anteriores y llevan su propio "const BLOCK" dentro del HTML. Cuando se
//  corrige la lista en el generador, esas ocho se quedan atras y empiezan a
//  comportarse distinto que las demas.
//
//  Paso de verdad: la lista vieja bloqueaba la palabra "ayuda" a secas, asi
//  que "necesito ayuda" hacia que el asistente se negara a contestar. Se
//  arreglo en el generador y las ocho de la primera tanda siguieron rotas.
//
//  Este script coge la lista buena de generar.mjs y la escribe en las que no
//  se generan. Es idempotente: si ya la tienen, no toca el archivo.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DEMOS = join(AQUI, '..');

// La lista buena, tal cual esta en generar.mjs.
const gen = readFileSync(join(AQUI, 'generar.mjs'), 'utf8');
const i = gen.indexOf('const BLOCK = [');
const j = gen.indexOf('];', i);
if (i < 0 || j < 0) throw new Error('No encuentro el const BLOCK de generar.mjs');
const BUENA = gen.slice(i, j + 2).replace(/\n\s*/g, '');

let tocadas = 0, iguales = 0, sinBlock = 0;
for (const d of readdirSync(DEMOS, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('_') || d.name.startsWith('.')) continue;
  const f = join(DEMOS, d.name, 'index.html');
  if (!existsSync(f)) continue;

  const html = readFileSync(f, 'utf8');
  const a = html.indexOf('const BLOCK');
  if (a < 0) { sinBlock++; console.log(`  ${d.name}: no tiene const BLOCK, lo salto`); continue; }
  const b = html.indexOf('];', a);
  if (b < 0) { sinBlock++; continue; }

  const vieja = html.slice(a, b + 2);
  if (vieja === BUENA) { iguales++; continue; }

  writeFileSync(f, html.slice(0, a) + BUENA + html.slice(b + 2), 'utf8');
  tocadas++;
  console.log(`  ${d.name}: lista de bloqueo actualizada`);
}

console.log(`\n${tocadas} actualizadas · ${iguales} ya estaban bien · ${sinBlock} sin lista`);
