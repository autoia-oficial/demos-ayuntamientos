// ---------------------------------------------------------------------------
//  GENERA LAS DEMOS DE ASISTENTE MUNICIPAL
//
//    node _generar/generar.mjs
//
//  Reutiliza el CSS de la demo de Elche para que todas se vean igual, y monta
//  el motor de busqueda parametrizado por municipio. El contenido de cada una
//  sale de los municipios*.mjs, que es lo unico que hay que tocar.
//
//  El motor es deliberadamente tonto: busca palabras clave, y si ninguna ficha
//  puntua lo suficiente dice que no lo sabe. No hay modelo de lenguaje detras.
//  Para una demo comercial es lo correcto: lo que se ensena es que el asistente
//  cita la fuente y se calla cuando no la tiene, no que improvise.
//
//  OJO: este script solo escribe las carpetas de los municipios que conoce.
//  Nunca borrar la carpeta padre entera: ahi viven el repo git, el generador y
//  las demas tandas. Ya paso una vez.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MUNICIPIOS as LOTE2 } from './municipios.mjs';
import { MUNICIPIOS_DIA03 as LOTE3 } from './municipios-dia03.mjs';
import { MUNICIPIOS_DIA04 as LOTE4 } from './municipios-dia04.mjs';
import { MUNICIPIOS_DIA05 as LOTE5 } from './municipios-dia05.mjs';
import { MUNICIPIOS_DIA06 as LOTE6 } from './municipios-dia06.mjs';
import { MUNICIPIOS_DIA07 as LOTE7 } from './municipios-dia07.mjs';
import { MUNICIPIOS_DIA08 as LOTE8 } from './municipios-dia08.mjs';
import { MUNICIPIOS_DIA09 as LOTE9 } from './municipios-dia09.mjs';

// Todas las tandas en un solo array: generar es idempotente, asi que volver a
// escribir las anteriores no molesta y evita que una quede sin regenerar
// cuando se toca el motor.
const MUNICIPIOS = [...LOTE2, ...LOTE3, ...LOTE4, ...LOTE5, ...LOTE6, ...LOTE7, ...LOTE8, ...LOTE9];

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

// Palabras que delatan en que lengua viene la pregunta. La clave (ca, gl, va)
// dice ademas en que campo de cada ficha esta escrita la respuesta: hit.ca,
// hit.gl, hit.va.
const PISTAS = {
  ca: ['que necessito', 'necessito', 'empadronar-me', 'aquest', 'aquesta', 'quin', 'quina',
    'com puc', 'on puc', 'aixo', 'tramit', 'tramits', 'seu electronica', 'atencio', 'quant', 'per a',
    'hi ha', 'cal', 'puc', 'voldria', 'm agradaria', 'gracies', 'si us plau', 'padro', 'volant',
    'certificat', 'llicencia', 'ajuda', 'taxa', 'adreca', 'horari', 'telefon', 'demanar'],
  gl: ['que necesito', 'empadroarme', 'empadroamento', 'concello', 'onde', 'como podo',
    'canto', 'preciso', 'tramite', 'tramites', 'sede electronica', 'hai', 'podo', 'quixera',
    'gustariame', 'grazas', 'enderezo', 'cidadan', 'cidadania', 'rexistro', 'axuda'],
  va: ['que necessite', 'necessite', 'empadronar-me', 'aquest', 'aquesta', 'quin', 'quina',
    'com puc', 'on puc', 'tramit', 'tramits', 'seu electronica', 'atencio', 'quant',
    'hi ha', 'cal', 'puc', 'voldria', 'gracies', 'padro', 'volant', 'certificat', 'telefon'],
  eu: ['zer', 'nola', 'non', 'noiz', 'zenbat', 'behar dut', 'nahi dut', 'dago', 'daude',
    'ordutegia', 'telefonoa', 'helbidea', 'erroldatu', 'errolda', 'ziurtagiria', 'agiria',
    'udala', 'udaletxea', 'bulegoa', 'hitzordua', 'eskatu', 'mesedez', 'eskerrik asko',
    'zein', 'dizut', 'dezaket', 'daukat'],
};

// Las dos negativas —la de materia excluida y la de "no tengo fuente"— en la
// segunda lengua. Son las dos respuestas que mas se ensenan en la demo, asi que
// tienen que sonar nativas, no traducidas a medias.
//
// OFI_SIGLA2 trae la oficina CON su preposicion y articulo ya contraidos
// ("al SAC", "a l'OIAC", "na Oficina de Atencion Cidada"), y por eso estas
// plantillas NO ponen preposicion delante. Cuando la ponian salia "a l'la OIAC"
// y "consultalo no la Oficina": el articulo castellano venia dentro de la sigla
// y la plantilla anadia otro encima.
const NEGATIVAS = {
  ca: { fuera: "Fora d'abast", sinfuente: 'Sense font',
    bloqueo: "No puc donar-li aquesta informació. <b>Els imports de taxes i impostos, les llicències i els ajuts socials estan exclosos d'aquest assistent</b> a propòsit: una resposta aproximada en aquestes matèries causa més perjudici que no respondre.",
    consulte: 'Consulti-ho directament ${OFI_SIGLA2}: <b>${OFI}</b>, o al correu ${OFI_MAIL}.',
    nose: "No he trobat documentació municipal publicada que sustenti una resposta a això, i no me la inventaré.",
    recomiendo: 'Li recomano consultar-ho ${OFI_SIGLA2}: <b>${OFI}</b>.' },
  gl: { fuera: 'Fóra de alcance', sinfuente: 'Sen fonte',
    bloqueo: 'Non lle podo dar esa información. <b>Os importes de taxas e impostos, as licenzas e as axudas sociais están excluídos deste asistente</b> a propósito: unha resposta aproximada nesas materias causa máis prexuízo que non responder.',
    consulte: 'Consúlteo directamente ${OFI_SIGLA2}: <b>${OFI}</b>, ou no correo ${OFI_MAIL}.',
    nose: 'Non atopei documentación municipal publicada que sustente unha resposta a isto, e non a vou improvisar.',
    recomiendo: 'Recoméndolle consultalo ${OFI_SIGLA2}: <b>${OFI}</b>.' },
  // El euskera declina el nombre segun el caso, asi que aqui se evita meter la
  // oficina dentro de una frase declinada: se anuncia con dos puntos y va
  // suelta. Es la forma segura de no escribir algo que suene mal a un nativo.
  eu: { fuera: 'Esparrutik kanpo', sinfuente: 'Iturririk gabe',
    bloqueo: 'Ezin dizut informazio hori eman. <b>Tasen eta zergen zenbatekoak, lizentziak eta gizarte-laguntzak nahita geratu dira asistente honetatik kanpo</b>: gai horietan gutxi gorabeherako erantzun batek kalte handiagoa egiten du erantzunik ez emateak baino.',
    consulte: 'Galdetu zuzenean hemen: ${OFI_SIGLA2} — <b>${OFI}</b>, edo ${OFI_MAIL}.',
    nose: 'Ez dut aurkitu galdera hori oinarritzen duen udal-dokumentaziorik argitaratuta, eta ez dut asmatuko.',
    recomiendo: 'Hona jotzea gomendatzen dizut: ${OFI_SIGLA2} — <b>${OFI}</b>.' },
  va: { fuera: "Fora d'abast", sinfuente: 'Sense font',
    bloqueo: "No puc donar-li aquesta informació. <b>Els imports de taxes i impostos, les llicències i les ajudes socials estan exclosos d'aquest assistent</b> a propòsit: una resposta aproximada en aquestes matèries causa més perjudici que l'absència de resposta.",
    consulte: 'Consulte-ho directament ${OFI_SIGLA2}: <b>${OFI}</b>, o al correu ${OFI_MAIL}.',
    nose: "No he trobat documentació municipal publicada que sustente una resposta a això, i no vaig a improvisar-la.",
    recomiendo: 'Li recomane consultar-ho ${OFI_SIGLA2}: <b>${OFI}</b>.' },
};

function pagina(m) {
  const bi = !!m.idioma2;
  const of = m.oficina;
  const CLAVE2 = bi ? m.idioma2.clave : null;
  const PISTAS_L2 = bi ? (PISTAS[CLAVE2] || []) : [];
  const SIGLA2 = bi ? (m.idioma2.sigla || of.sigla) : of.sigla;

  // Los ${...} de NEGATIVAS se sustituyen AQUI, al generar, no en el navegador:
  // viajan dentro de un JSON, donde no interpolan solos.
  const T = bi ? Object.fromEntries(Object.entries(NEGATIVAS[CLAVE2]).map(([k, v]) => [k,
    v.replace(/\$\{OFI_SIGLA2\}/g, SIGLA2).replace(/\$\{OFI_MAIL\}/g, of.email)
      .replace(/\$\{OFI\}/g, of.tel)])) : null;

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
const L2KEY = ${js(CLAVE2)};
const T = ${js(T)};

// Materias excluidas a proposito: importes, licencias y ayudas sociales.
const BLOCK = ["tasa","tasas","basura","basuras","ibi","impuesto","impuestos","cuanto cuesta","cuánto cuesta","precio","importe","coste","cuota","recibo","licencia","licencias","obra","apertura","ayuda","ayudas","subvencion","subvención","subvenciones","servicios sociales","emergencia social","plusvalia","plusvalía","circulacion","circulación","taxa","taxes","impost","quant costa","preu","import","llicencia","llicencies","ajuda","ajudes","subvencio","plusvalua","plusvàlua","licenzas","axuda","axudas","canto custa"];

const norm = s => s.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9\\s]/g," ").replace(/\\s+/g," ").trim();

${bi ? `const L2 = ${js(PISTAS_L2)};
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
      ? \`<div class="rlabel">\${T.fuera}</div><p>\${T.bloqueo}</p><p>\${T.consulte}</p>\`
      : \`<div class="rlabel">Fuera de alcance</div>
         <p>No puedo darle esa información. <b>Los importes de tasas e impuestos, las licencias y las ayudas sociales están excluidos de este asistente</b> a propósito: una respuesta aproximada en esas materias causa más perjuicio que no responder.</p>
         <p>Consúltelo directamente en \${OFI_SIGLA}: <b>\${OFI}</b>, o en el correo \${OFI_MAIL}.</p>\`;
  } else if (!hit){
    a.classList.add("refuse");
    a.innerHTML = dos
      ? \`<div class="rlabel">\${T.sinfuente}</div><p>\${T.nose}</p><p>\${T.recomiendo}</p>\`
      : \`<div class="rlabel">Sin fuente</div>
         <p>No he encontrado documentación municipal publicada que sustente una respuesta a esto, y no voy a improvisarla.</p>
         <p>Le recomiendo consultarlo en \${OFI_SIGLA}: <b>\${OFI}</b>.</p>\`;
  } else {
    const c = (dos && hit[L2KEY]) ? hit[L2KEY] : hit.es;
    let html = \`<p>\${c.h}</p>\`;
    if (c.l && c.l.length) html += "<ul>" + c.l.map(x=>\`<li>\${x}</li>\`).join("") + "</ul>";
    if (c.f) html += \`<p>\${c.f}</p>\`;
    html += \`<div class="src"><a href="\${hit.s.u}" target="_blank" rel="noopener">
      <span class="k">\${dos ? ({gl:"Fonte", eu:"Iturria"}[L2KEY] || "Font") : "Fuente"}</span><span>\${esc(hit.s.t)}</span></a></div>\`;
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

// El esqueleto: los fragmentos originales no lo traian y sin charset los
// acentos salen rotos. Ver el README de la carpeta.
function envolver(cuerpo) {
  return ['<!doctype html>', '<html lang="es">', '<head>', '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="robots" content="noindex, nofollow">', cuerpo.trimEnd(), '</html>'].join('\n');
}

for (const m of MUNICIPIOS) {
  mkdirSync(join(WEB, m.slug), { recursive: true });
  const html = envolver(pagina(m));
  writeFileSync(join(WEB, m.slug, 'index.html'), html, 'utf8');
  console.log(`${m.slug.padEnd(26)} ${String(html.length).padStart(6)} bytes  ${m.kb.length} fichas  ${m.idioma2 ? 'bilingüe ' + m.idioma2.cod : 'castellano'}`);
}
console.log(`\n${MUNICIPIOS.length} demos generadas en ${WEB}`);
