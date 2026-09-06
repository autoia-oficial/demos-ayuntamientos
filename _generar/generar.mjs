// ---------------------------------------------------------------------------
//  GENERA LAS DEMOS DEL SEGUNDO ENVIO
//
//    node _generar/generar.mjs
//
//  Reutiliza el CSS de la demo de Elche para que las ocho se vean igual, y
//  monta el motor de busqueda parametrizado por municipio. El contenido de
//  cada una sale de municipios.mjs, que es lo unico que hay que tocar.
//
//  El motor es deliberadamente tonto: busca palabras clave, y si ninguna ficha
//  puntua lo suficiente dice que no lo sabe. No hay modelo de lenguaje detras.
//  Para una demo comercial es lo correcto: lo que se ensena es que el asistente
//  cita la fuente y se calla cuando no la tiene, no que improvise.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MUNICIPIOS } from './municipios.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const WEB = join(AQUI, '..');
const ELCHE = join(WEB, '..', '_envios', 'DIA 01 - martes 1 sep', 'elche', 'demo-elche.html');

// El CSS vive en la demo de Elche y se copia tal cual: si algun dia se retoca
// el diseno, se retoca alli y se vuelve a generar. Una sola fuente de verdad.
const fuente = readFileSync(ELCHE, 'utf8');
const CSS = (fuente.match(/<style>[\s\S]*?<\/style>/) || [])[0];
if (!CSS) throw new Error('No encuentro el bloque <style> en la demo de Elche');

const esc = s => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
const js = o => JSON.stringify(o, null, 0);

function pagina(m) {
  const bi = !!m.idioma2;
  const of = m.oficina;

  // Palabras que delatan que la pregunta viene en la segunda lengua. Solo se
  // usan en los municipios bilingues; en los demas el bloque ni se genera.
  const PISTAS_CA = ['que necessito', 'necessito', 'empadronar-me', 'aquest', 'aquesta', 'quin', 'quina',
    'com puc', 'on puc', 'aixo', 'tramit', 'tramits', 'seu electronica', 'atencio', 'quant', 'per a',
    'hi ha', 'cal ', 'puc ', 'voldria', 'm agradaria', 'gracies', 'si us plau', 'padro', 'volant',
    'certificat', 'llicencia', 'ajuda', 'taxa', 'adreca', 'horari', 'telefon', 'demanar'];

  return `<title>Asistente de ${esc(m.nombre)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

${CSS}

<div class="wrap">
  <header>
    <div class="mark"><i></i></div>
    <div class="brand">AutoIA</div>
    <div class="badge">Demostración</div>
  </header>

  <div class="intro">
    <h1>Asistente de atención ciudadana<br>del Ayuntamiento ${esc(m.articulo)}</h1>
    <p class="sub">Responde con la documentación publicada en ${esc(m.dominios)}, citando en
    cada respuesta la página de la que procede.${bi ? ' Contesta en el idioma de la pregunta.' : ''}</p>
  </div>

  <div class="chips" id="chips"></div>
  <div id="log"></div>

  <form class="ask" id="form" autocomplete="off">
    <input id="q" placeholder="Escriba su consulta…" aria-label="Consulta">
    <button class="send" type="submit">Enviar</button>
  </form>

  <footer>
    <b>Demostración de AutoIA.</b> No es un servicio oficial del Ayuntamiento ${esc(m.articulo)}.
    Contenido recogido de ${esc(m.dominios)} el ${esc(m.fecha)}.<br>
    Las tasas, licencias y ayudas sociales están excluidas a propósito: son las materias en las que
    una respuesta aproximada causa más perjuicio que la ausencia de respuesta.
  </footer>
</div>

<script>
const OFI = ${js(of.tel)};
const OFI_MAIL = ${js(of.email)};
const OFI_SIGLA = ${js(of.sigla)};
const KB = ${js(m.kb)};

// Materias excluidas a proposito: importes, licencias y ayudas sociales.
const BLOCK = ["tasa","tasas","basura","basuras","ibi","impuesto","impuestos","cuanto cuesta","cuánto cuesta","precio","importe","coste","cuota","recibo","licencia","licencias","obra","apertura","ayuda","ayudas","subvencion","subvención","subvenciones","servicios sociales","emergencia social","plusvalia","plusvalía","circulacion","circulación","taxa","taxes","impost","quant costa","preu","import","llicencia","llicencies","ajuda","ajudes","subvencio","plusvalua","plusvàlua"];

const norm = s => s.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9\\s]/g," ").replace(/\\s+/g," ").trim();

${bi ? `const L2 = ${js(PISTAS_CA)};
const is2 = t => { const n=norm(t); return L2.some(w=>(" "+n+" ").includes(" "+norm(w)+" ")); };`
      : `const is2 = () => false;`}

// Las claves se buscan por PALABRA COMPLETA, no como subcadena. Con subcadena,
// la clave catalana "on" casaba dentro de "Girona" y el asistente contestaba la
// ficha de la oficina a quien preguntaba por un tren. En una demo comercial ese
// fallo es el peor de todos: el ayuntamiento no ve un buscador flojo, ve un
// sistema que responde con seguridad a algo que no le han preguntado.
const tiene = (n, k) => (" " + n + " ").includes(" " + k + " ");

function match(t){
  const n = norm(t);
  if (BLOCK.some(b => tiene(n, norm(b)))) return "BLOCK";
  let best=null, bs=0;
  for (const e of KB){
    let sc=0;
    for (const k of e.k){ const nk=norm(k); if(nk && tiene(n, nk)) sc += nk.split(" ").length*2 + nk.length/12; }
    if (sc>bs){ bs=sc; best=e; }
  }
  return bs>=2 ? best : null;
}

const log = document.getElementById("log");
function esc(s){ return String(s).replace(/[<>&]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c])); }

function render(q, hit, dos){
  const turn = document.createElement("div"); turn.className = "turn";
  const qq = document.createElement("div"); qq.className = "q"; qq.textContent = q;
  turn.appendChild(qq);
  const a = document.createElement("div"); a.className = "a";

  if (hit === "BLOCK"){
    a.classList.add("refuse");
    a.innerHTML = dos
      ? \`<div class="rlabel">Fora d'abast</div>
         <p>No puc donar-li aquesta informació. <b>Els imports de taxes i impostos, les llicències i els ajuts socials estan exclosos d'aquest assistent</b> a propòsit: una resposta aproximada en aquestes matèries causa més perjudici que no respondre.</p>
         <p>Consulti-ho directament a l'\${OFI_SIGLA}: <b>\${OFI}</b>, o al correu \${OFI_MAIL}.</p>\`
      : \`<div class="rlabel">Fuera de alcance</div>
         <p>No puedo darle esa información. <b>Los importes de tasas e impuestos, las licencias y las ayudas sociales están excluidos de este asistente</b> a propósito: una respuesta aproximada en esas materias causa más perjuicio que no responder.</p>
         <p>Consúltelo directamente en \${OFI_SIGLA}: <b>\${OFI}</b>, o en el correo \${OFI_MAIL}.</p>\`;
  } else if (!hit){
    a.classList.add("refuse");
    a.innerHTML = dos
      ? \`<div class="rlabel">Sense font</div>
         <p>No he trobat documentació municipal publicada que sustenti una resposta a això, i no me la inventaré.</p>
         <p>Li recomano consultar-ho a l'\${OFI_SIGLA}: <b>\${OFI}</b>.</p>\`
      : \`<div class="rlabel">Sin fuente</div>
         <p>No he encontrado documentación municipal publicada que sustente una respuesta a esto, y no voy a improvisarla.</p>
         <p>Le recomiendo consultarlo en \${OFI_SIGLA}: <b>\${OFI}</b>.</p>\`;
  } else {
    const c = (dos && hit.ca) ? hit.ca : hit.es;
    let html = \`<p>\${c.h}</p>\`;
    if (c.l && c.l.length) html += "<ul>" + c.l.map(x=>\`<li>\${x}</li>\`).join("") + "</ul>";
    if (c.f) html += \`<p>\${c.f}</p>\`;
    html += \`<div class="src"><a href="\${hit.s.u}" target="_blank" rel="noopener">
      <span class="k">\${dos?"Font":"Fuente"}</span><span>\${esc(hit.s.t)}</span></a></div>\`;
    a.innerHTML = html;
  }

  turn.appendChild(a);
  log.appendChild(turn);
  a.scrollIntoView({behavior:"smooth", block:"nearest"});
}

function ask(t){ t = t.trim(); if(!t) return; render(t, match(t), is2(t)); }

const SUG = ${js(m.sugerencias)};
const chips = document.getElementById("chips");
SUG.forEach(s=>{
  const b=document.createElement("button");
  b.className="chip"; b.type="button";
  b.innerHTML = \`<span class="lang">\${s.lang}</span><b>\${esc(s.t)}</b>\`;
  b.onclick = ()=>ask(s.t);
  chips.appendChild(b);
});

document.getElementById("form").onsubmit = e=>{
  e.preventDefault();
  const i=document.getElementById("q");
  ask(i.value); i.value="";
};
</script>`;
}

// El esqueleto: los fragmentos de Elche no lo traian y sin charset los acentos
// salen rotos. Ver el README de la carpeta.
function envolver(cuerpo) {
  return ['<!doctype html>', '<html lang="es">', '<head>', '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="robots" content="noindex, nofollow">', cuerpo.trimEnd(), '</html>'].join('\n');
}

for (const m of MUNICIPIOS) {
  mkdirSync(join(WEB, m.slug), { recursive: true });
  const html = envolver(pagina(m));
  writeFileSync(join(WEB, m.slug, 'index.html'), html, 'utf8');
  console.log(`${m.slug.padEnd(22)} ${String(html.length).padStart(6)} bytes  ${m.kb.length} fichas  ${m.idioma2 ? 'bilingüe ' + m.idioma2.cod : 'castellano'}`);
}
console.log(`\n${MUNICIPIOS.length} demos generadas en ${WEB}`);
