// ---------------------------------------------------------------------------
//  QUE EL ASISTENTE PIENSE ANTES DE RESPONDER
//
//    node _generar/pensar-antes-de-responder.mjs            todas
//    node _generar/pensar-antes-de-responder.mjs elche leon  solo esas
//
//  Dos cambios en como se comporta la demo, y los dos son de credibilidad:
//
//  1. La respuesta ya no aparece en el mismo instante en que pulsas. Primero
//     se ve la pregunta, luego un "Pensando..." con tres puntos, y despues la
//     respuesta. Un asistente que contesta en cero milisegundos se delata solo
//     como lo que es por dentro -una tabla de respuestas- y el ayuntamiento
//     que lo prueba dos minutos lo nota.
//
//  2. Las preguntas sugeridas ya no se envian solas: al pulsarlas rellenan la
//     caja y hay que darle a Enviar. Antes bastaba rozar un chip para que
//     saliera la respuesta, que es justo lo que hace pensar que esta todo
//     precocinado.
//
//  Se puede volver a lanzar: si la demo ya lo tiene, no la toca.
//
//  POR QUE ES UN PARCHE Y NO SOLO UN CAMBIO EN generar.mjs: las ocho demos de
//  la primera tanda se escribieron a mano antes de que existiera el generador
//  y no salen de el. Ademas cada una nombra su detector de idioma a su manera
//  -is2, isVA...-, asi que aqui se lee el que tenga cada archivo en vez de
//  darlo por supuesto.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEMOS = join(dirname(fileURLToPath(import.meta.url)), '..');

// Como se dice "Pensando" en la lengua en que se ha preguntado.
const PENSAR = { ca: 'Pensant…', va: 'Pensant…', gl: 'Pensando…', eu: 'Pentsatzen…' };

const CSS = `
  .a.pensar{display:flex;align-items:center;gap:9px;color:var(--ink-3);
    border-left-color:var(--line-2);font-size:14.5px}
  .dots{display:inline-flex;gap:4px}
  .dots i{width:5px;height:5px;border-radius:50%;background:var(--ink-3);
    animation:pens 1.15s ease-in-out infinite}
  .dots i:nth-child(2){animation-delay:.16s}
  .dots i:nth-child(3){animation-delay:.32s}
  @keyframes pens{0%,65%,100%{opacity:.3;transform:translateY(0)}
                  32%{opacity:1;transform:translateY(-3px)}}
  .send:disabled{opacity:.4;cursor:default}
  @media (prefers-reduced-motion:reduce){.dots i{animation:none;opacity:.55}}
`;

function nuevoAsk(llamadaRender, etiqueta) {
  return `let __ocupado = false;
const __envio = document.querySelector(".send");

// La pregunta se pinta al momento; la respuesta, despues de pensarla. Mientras
// piensa, el boton se bloquea: sin eso se pueden encadenar cinco preguntas y
// las respuestas llegan todas de golpe y desordenadas.
function ask(t){
  t = t.trim(); if(!t || __ocupado) return;
  __ocupado = true; if(__envio) __envio.disabled = true;

  const __t = document.createElement("div"); __t.className = "turn";
  const __q = document.createElement("div"); __q.className = "q"; __q.textContent = t;
  const __p = document.createElement("div"); __p.className = "a pensar";
  __p.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>' + ${etiqueta};
  __t.appendChild(__q); __t.appendChild(__p);
  log.appendChild(__t);
  __p.scrollIntoView({behavior:"smooth", block:"nearest"});

  setTimeout(function(){
    __t.remove();
    ${llamadaRender};
    __ocupado = false; if(__envio) __envio.disabled = false;
  }, 700 + Math.random()*450);
}`;
}

function parchear(html) {
  if (html.includes('.a.pensar')) return null;          // ya lo tiene

  // 1. El ask original dice a quien llama y con que detector de idioma.
  const mAsk = html.match(/function ask\(t\)\s*\{[\s\S]*?\n?\}/);
  if (!mAsk) return { error: 'no encuentro function ask(t)' };
  const mRender = mAsk[0].match(/render\([^;]*\)/);
  if (!mRender) return { error: 'el ask no llama a render' };

  // 2. La etiqueta: si la demo es bilingue, en la lengua de la pregunta.
  const mDet = mRender[0].match(/,\s*(is[A-Za-z0-9_]*\(t\))\s*\)$/);
  const mL2 = html.match(/const L2KEY\s*=\s*"([a-z]{2})"/);
  let etiqueta = '"Pensando…"';
  if (mDet) {
    const clave = mL2 ? mL2[1] : (/isVA/.test(mDet[1]) ? 'va' : /isCA/.test(mDet[1]) ? 'ca' : null);
    const otro = PENSAR[clave] || 'Pensant…';
    etiqueta = `(${mDet[1]} ? "${otro}" : "Pensando…")`;
  }

  let out = html.replace(mAsk[0], nuevoAsk(mRender[0], etiqueta));

  // 3. Los chips rellenan la caja en vez de responder solos.
  const antes = out;
  out = out.replace(
    /b\.onclick\s*=\s*\(\)\s*=>\s*ask\(([^)]*)\);/,
    'b.onclick = ()=>{ const c=document.getElementById("q"); c.value=$1; c.focus(); };'
  );
  if (out === antes) return { error: 'no encuentro el onclick de los chips' };

  // 4. El CSS del "pensando", justo antes de cerrar el <style>.
  const i = out.lastIndexOf('</style>');
  if (i < 0) return { error: 'no encuentro </style>' };
  out = out.slice(0, i) + CSS + out.slice(i);

  return { out };
}

const pedidos = process.argv.slice(2);
const carpetas = readdirSync(DEMOS, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
  .map(d => d.name)
  .filter(n => !pedidos.length || pedidos.includes(n))
  .sort();

let hechas = 0, ya = 0, fallos = 0;
for (const slug of carpetas) {
  const f = join(DEMOS, slug, 'index.html');
  if (!existsSync(f)) continue;
  const r = parchear(readFileSync(f, 'utf8'));
  if (r === null) { ya++; continue; }
  if (r.error) { fallos++; console.log(`  FALLO ${slug.padEnd(28)} ${r.error}`); continue; }
  writeFileSync(f, r.out, 'utf8');
  hechas++;
  console.log(`  ${slug}`);
}

console.log(`\n${hechas} demos actualizadas · ${ya} ya lo tenian · ${fallos} fallos`);
process.exit(fallos ? 1 : 0);
