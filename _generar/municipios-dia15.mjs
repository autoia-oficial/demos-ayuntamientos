// ---------------------------------------------------------------------------
//  LOS CUATRO DEL QUINCEAVO ENVIO — jueves 15 de octubre de 2026.
//  Comprobado en cada web municipal el 8 de septiembre de 2026.
//
//  SON CUATRO Y NO OCHO, Y CONVIENE SABER POR QUE. De dieciseis municipios
//  intentados hoy, solo cuatro publican un correo de contacto que se pueda
//  verificar. El cuello de botella de esta campana no es cuantos correos
//  aguanta Gmail —caben de sobra— sino esto.
//
//  Lo que ha fallado, por si sirve para la proxima vez:
//
//   - buscar-correo.mjs no ve nada en las webs hechas con javascript, que son
//     casi todas las catalanas y valencianas. Ahi hay que buscar a mano.
//   - Los buscadores tachan las direcciones de correo en sus resumenes. Solo
//     salen cuando el buscador las cita dentro de una frase.
//   - Los ayuntamientos grandes directamente no publican ninguno: todo por el
//     010 y formulario web.
//
//  Descartados hoy y por que:
//   - GAVA: han incorporado un asistente que guia la documentacion del padron.
//     No es un lead de "no teneis asistente".
//   - BURJASSOT: el unico correo que publican es
//     informacionburjassot@atenciontributaria.es, que ni es su dominio ni es
//     atencion ciudadana: es la ventanilla de tributos.
//   - Vilafranca, Llucmajor, Marratxi, Soria, Utrera: no he podido verificar
//     ningun correo. Vilafranca merece volver: su "xat" lo atienden personas
//     de 9 a 14, o sea que el hueco de fuera de horario esta sin cubrir.
//
//  Catalan en Blanes y Esplugues. Palencia y Ponferrada, solo castellano.
//
//  Estas cuatro publican menos que las tandas anteriores, y la demo lo dice:
//  donde no hay fuente, contesta que no la tiene y da el telefono. Es
//  preferible a inventar, y ademas es justo lo que se les esta vendiendo.
// ---------------------------------------------------------------------------

export const MUNICIPIOS_DIA15 = [

// ===========================================================================
{
  slug: 'blanes',
  nombre: 'Blanes',
  articulo: 'de Blanes',
  dominios: 'blanes.cat',
  fecha: '8 de septiembre de 2026',
  oficina: { sigla: "l'AMIC", tel: '972 37 93 00', email: 'amic@blanes.cat' },
  idioma2: { cod: 'CA', clave: 'ca', sigla: "a l'AMIC", nombre: 'catalán' },
  kb: [
    {
      k: ['amic', 'oficina', 'atencion ciudadana', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'passeig de dintre', 'ayuntamiento',
          'atencio ciutadana', 'adreca', 'horari', 'a quina hora obren', 'telefon'],
      es: { h: "En Blanes la oficina de atención ciudadana se llama <b>AMIC</b>, y está en la planta baja del Ayuntamiento: passeig de Dintre, 29, 17300 Blanes (Girona).",
            l: ['Teléfono: 972 37 93 00. Correo: amic@blanes.cat.',
                'Horario: días laborables de <b>8:30 a 14:30</b>.',
                'En las fiestas administrativas —22 de mayo, 24 y 31 de diciembre— de 9:30 a 13:30.'],
            f: 'Se puede pedir cita previa por internet.' },
      ca: { h: "A Blanes l'oficina d'atenció ciutadana es diu <b>AMIC</b>, i és a la planta baixa de l'Ajuntament: passeig de Dintre, 29, 17300 Blanes (Girona).",
            l: ['Telèfon: 972 37 93 00. Correu: amic@blanes.cat.',
                'Horari: dies laborables de <b>8:30 a 14:30</b>.',
                'A les festes administratives —22 de maig, 24 i 31 de desembre— de 9:30 a 13:30.'],
            f: 'Es pot demanar cita prèvia per internet.' },
      s: { t: "Oficina AMIC — blanes.cat", u: 'https://www.blanes.cat/imob/amic.e' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'mudarme', 'nuevo vecino', 'certificado', 'volante',
          'empadronar-me', 'empadronament', 'alta padro', 'canvi de domicili', 'mudar-me', 'certificat', 'volant'],
      es: { h: 'Los trámites de <b>padró</b> se hacen en el AMIC, en la planta baja del Ayuntamiento.',
            l: ['Passeig de Dintre, 29, de 8:30 a 14:30 en días laborables.'],
            f: 'El Ayuntamiento no publica en su web la documentación concreta de cada caso. Confírmela en el 972 37 93 00 o en amic@blanes.cat antes de desplazarse.' },
      ca: { h: "Els tràmits de <b>padró</b> es fan a l'AMIC, a la planta baixa de l'Ajuntament.",
            l: ['Passeig de Dintre, 29, de 8:30 a 14:30 en dies laborables.'],
            f: "L'Ajuntament no publica al seu web la documentació concreta de cada cas. Confirmeu-la al 972 37 93 00 o a amic@blanes.cat abans de desplaçar-vos." },
      s: { t: 'Atenció ciutadana — Ajuntament de Blanes', u: 'https://seu-e.cat/ca/web/blanes/govern-obert-i-transparencia/serveis-i-tramits/serveis/atencio-ciutadana' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'turno', 'por internet',
          'cita previa', 'demanar cita', 'per internet'],
      es: { h: 'La <b>cita previa</b> del AMIC se pide por internet.',
            l: ['El AMIC se presenta como «el Ayuntamiento en red las 24 h»: registro y atención en una sola ventanilla.'],
            f: 'Si prefiere el teléfono: 972 37 93 00.' },
      ca: { h: "La <b>cita prèvia</b> de l'AMIC es demana per internet.",
            l: ["L'AMIC es presenta com «l'Ajuntament en xarxa les 24 h»: registre i atenció en una sola finestreta."],
            f: 'Si preferiu el telèfon: 972 37 93 00.' },
      s: { t: 'Oficina AMIC — blanes.cat', u: 'https://www.blanes.cat/imob/amic.e' },
    },
    {
      k: ['sede electronica', 'tramite', 'tramites', 'online', 'internet', 'catalogo', 'registro', 'instancia', 'oficina virtual',
          'seu electronica', 'tramit', 'tramits', 'cataleg', 'registre', 'instancia'],
      es: { h: 'El AMIC tiene <b>oficina presencial y oficina virtual</b>, y por las dos se puede presentar la instancia general.',
            l: ['La presencial, en el passeig de Dintre, 29.'],
            f: 'Dudas: 972 37 93 00 o amic@blanes.cat.' },
      ca: { h: "L'AMIC té <b>oficina presencial i oficina virtual</b>, i per totes dues es pot presentar la instància general.",
            l: ['La presencial, al passeig de Dintre, 29.'],
            f: 'Dubtes: 972 37 93 00 o amic@blanes.cat.' },
      s: { t: 'Instància general — seu electrònica de Blanes', u: 'https://www.blanes.cat/oiapdocs.nsf/DD159A226996E35AC1256AB900253CCB/$file/INST%C3%80NCIA%20GENERAL%20SEU%20ELECTR%C3%92NICA.pdf' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Blanes?' },
    { lang: 'ES', t: '¿Puedo hacer los trámites por internet?' },
    { lang: 'CA', t: "On és l'AMIC i quin horari té?" },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
  ],
},

// ===========================================================================
{
  slug: 'esplugues-de-llobregat',
  nombre: 'Esplugues de Llobregat',
  articulo: 'de Esplugues de Llobregat',
  dominios: 'esplugues.cat',
  fecha: '8 de septiembre de 2026',
  oficina: { sigla: 'la atención ciudadana', tel: '900 300 082', email: 'ajuntament@esplugues.cat' },
  idioma2: { cod: 'CA', clave: 'ca', sigla: "a l'atenció ciutadana", nombre: 'catalán' },
  kb: [
    {
      k: ['oficina', 'oficinas', 'atencion ciudadana', 'pac', 'punto de atencion', 'puntos de atencion', 'telefono', 'contacto', 'gratuito',
          'atencio ciutadana', 'punts d atencio', 'punt d atencio', 'telefon', 'gratuit'],
      es: { h: 'Esplugues no tiene una sola oficina: tiene una <b>red de Punts d\'Atenció a la Ciutadania (PAC)</b> repartidos por el municipio.',
            l: ['Teléfono <b>gratuito</b>: 900 300 082.',
                'Correo: ajuntament@esplugues.cat.',
                'También se atiende por <b>videollamada</b>.'],
            f: 'El listado de cada PAC con su dirección y horario está en esplugues.cat, en el apartado de atención a la ciudadanía.' },
      ca: { h: "Esplugues no té una sola oficina: té una <b>xarxa de Punts d'Atenció a la Ciutadania (PAC)</b> repartits pel municipi.",
            l: ['Telèfon <b>gratuït</b>: 900 300 082.',
                'Correu: ajuntament@esplugues.cat.',
                'També s\'atén per <b>videotrucada</b>.'],
            f: "El llistat de cada PAC amb la seva adreça i horari és a esplugues.cat, a l'apartat d'atenció a la ciutadania." },
      s: { t: "Punts d'Atenció a la Ciutadania — esplugues.cat", u: 'https://www.esplugues.cat/serveis/atencio-ciutadania/punts-datencio-a-la-ciutadania/' },
    },
    {
      k: ['videollamada', 'videotrucada', 'por video', 'a distancia', 'sin ir', 'telematico', 'online',
          'videotrucada', 'a distancia', 'sense anar-hi'],
      es: { h: 'Se puede hacer la gestión <b>por videollamada</b>, sin ir a ninguna oficina.',
            l: ['Es uno de los canales que el Ayuntamiento ofrece junto con los PAC presenciales y el correo electrónico.'],
            f: 'Para concertarla, el teléfono gratuito 900 300 082.' },
      ca: { h: "Es pot fer la gestió <b>per videotrucada</b>, sense anar a cap oficina.",
            l: ["És un dels canals que l'Ajuntament ofereix juntament amb els PAC presencials i el correu electrònic."],
            f: 'Per concertar-la, el telèfon gratuït 900 300 082.' },
      s: { t: 'Atenció a la ciutadania — esplugues.cat', u: 'https://www.esplugues.cat/serveis/atencio-ciutadania' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'mudarme', 'nuevo vecino', 'certificado', 'volante',
          'empadronar-me', 'empadronament', 'alta padro', 'canvi de domicili', 'mudar-me', 'certificat', 'volant'],
      es: { h: 'Los trámites de <b>padró</b> se hacen en cualquiera de los Punts d\'Atenció a la Ciutadania.',
            l: ['También por videollamada o escribiendo a ajuntament@esplugues.cat.'],
            f: 'El Ayuntamiento no publica en su web la documentación concreta de cada caso. Confírmela en el teléfono gratuito 900 300 082 antes de desplazarse.' },
      ca: { h: "Els tràmits de <b>padró</b> es fan a qualsevol dels Punts d'Atenció a la Ciutadania.",
            l: ['També per videotrucada o escrivint a ajuntament@esplugues.cat.'],
            f: "L'Ajuntament no publica al seu web la documentació concreta de cada cas. Confirmeu-la al telèfon gratuït 900 300 082 abans de desplaçar-vos." },
      s: { t: 'Atenció a la ciutadania — esplugues.cat', u: 'https://www.esplugues.cat/serveis/atencio-ciutadania' },
    },
    {
      k: ['sede electronica', 'tramite', 'tramites', 'internet', 'por internet', 'catalogo', 'cita', 'cita previa', 'pedir cita',
          'seu electronica', 'tramit', 'tramits', 'per internet', 'cita previa', 'demanar cita'],
      es: { h: 'Los trámites en línea y la cita están en esplugues.cat, en el apartado de atención a la ciudadanía.',
            l: ['Los tres canales son: los PAC presenciales, la videollamada y el correo electrónico.'],
            f: 'Dudas: 900 300 082, que es gratuito, o ajuntament@esplugues.cat.' },
      ca: { h: "Els tràmits en línia i la cita són a esplugues.cat, a l'apartat d'atenció a la ciutadania.",
            l: ['Els tres canals són: els PAC presencials, la videotrucada i el correu electrònic.'],
            f: 'Dubtes: 900 300 082, que és gratuït, o ajuntament@esplugues.cat.' },
      s: { t: 'Atenció a la ciutadania — esplugues.cat', u: 'https://www.esplugues.cat/serveis/atencio-ciutadania' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Esplugues?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
    { lang: 'ES', t: '¿Puedo hacerlo sin ir, por videollamada?' },
    { lang: 'CA', t: 'On són els punts d\'atenció?' },
  ],
},

// ===========================================================================
{
  slug: 'palencia',
  nombre: 'Palencia',
  articulo: 'de Palencia',
  dominios: 'aytopalencia.es y sede.aytopalencia.es',
  fecha: '8 de septiembre de 2026',
  oficina: { sigla: 'Atención Ciudadana', tel: '979 718 125', email: 'padron@aytopalencia.es' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion ciudadana', 'atencion al ciudadano', 'registro', 'estadistica', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'mayor principal', 'agustinas'],
      es: { h: 'El área de <b>Atención Ciudadana, Registro y Estadística</b> está en el Edificio Agustinas Canónigas, planta baja, calle Mayor Principal, 7.',
            l: ['Teléfono: 979 718 125. Correo: padron@aytopalencia.es.',
                'Horario: de <b>lunes a viernes de 9:00 a 14:00</b>.'],
            f: 'Es la unidad que informa de los trámites administrativos y de los servicios municipales.' },
      s: { t: 'Atención Ciudadana, Registro y Estadística — aytopalencia.es', u: 'https://www.aytopalencia.es/area/atencion-ciudadana-estadistica' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'baja', 'cambio de domicilio', 'mudarme', 'nuevo vecino', 'cambio de datos', 'rectificacion'],
      es: { h: 'El <b>Padrón Municipal de Habitantes</b> lo lleva esta misma área: altas, bajas, cambios de domicilio y cambios de datos personales.',
            l: ['También la <b>rectificación padronal</b>.',
                'Toda persona que viva en España está obligada a inscribirse en el padrón del municipio donde resida habitualmente.',
                'Calle Mayor Principal, 7, de 9:00 a 14:00.'],
            f: 'La documentación concreta depende de su caso. Confírmela en el 979 718 125 o en padron@aytopalencia.es antes de desplazarse.' },
      s: { t: 'Empadronamiento — aytopalencia.es', u: 'https://www.aytopalencia.es/tramite/empadronamiento' },
    },
    {
      k: ['certificado', 'certificado de empadronamiento', 'volante', 'acreditar residencia', 'numeracion', 'portales', 'calles', 'datos demograficos'],
      es: { h: 'Además de los <b>certificados y volantes de empadronamiento</b>, esta área expide cosas que poca gente sabe que existen.',
            l: ['Certificados sobre <b>numeración de portales</b> y renumeración de calles.',
                'Explotación de <b>datos demográficos</b>.'],
            f: 'Se piden en el 979 718 125 o en padron@aytopalencia.es.' },
      s: { t: 'Atención Ciudadana, Registro y Estadística — aytopalencia.es', u: 'https://www.aytopalencia.es/area/atencion-ciudadana-estadistica' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'turno', 'sede electronica', 'tramite', 'tramites', 'online', 'internet', 'por internet', 'carpeta', '24 horas'],
      es: { h: 'La <b>cita previa</b> se pide en citaprevia.aytopalencia.es y la <b>sede electrónica</b> está en sede.aytopalencia.es.',
            l: ['Por la sede se puede tramitar <b>las 24 horas de los 365 días del año</b>.'],
            f: 'Dudas: 979 718 125 o padron@aytopalencia.es.' },
      s: { t: 'Sede Electrónica — Ayuntamiento de Palencia', u: 'https://sede.aytopalencia.es/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Palencia?' },
    { lang: 'ES', t: '¿Cómo pido el certificado de empadronamiento?' },
    { lang: 'ES', t: '¿Dónde está Atención Ciudadana y qué horario tiene?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
  ],
},

// ===========================================================================
{
  slug: 'ponferrada',
  nombre: 'Ponferrada',
  articulo: 'de Ponferrada',
  dominios: 'ponferrada.org y clic.ponferrada.org',
  fecha: '8 de septiembre de 2026',
  oficina: { sigla: 'el Ayuntamiento', tel: '987 446 600', email: 'clic@ponferrada.org' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion ciudadana', 'ayuntamiento', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'plaza del ayuntamiento'],
      es: { h: 'El Ayuntamiento está en la <b>plaza del Ayuntamiento, s/n</b>.',
            l: ['Teléfono: 987 446 600.',
                'Horario de atención al público: de <b>lunes a viernes de 8:30 a 14:00</b>.'],
            f: 'El Ayuntamiento publica un directorio telefónico por áreas en ponferrada.org.' },
      s: { t: 'Directorio telefónico — ponferrada.org', u: 'https://www.ponferrada.org/es/directorio-telefonico' },
    },
    {
      k: ['clic', 'carpeta', 'carpeta ciudadana', 'sede electronica', 'tramite', 'tramites', 'online', 'internet', 'por internet', 'portal'],
      es: { h: 'Los trámites en línea van por el <b>CLIC</b>, la Carpeta Local de Información Ciudadana: clic.ponferrada.org.',
            l: ['Desde ahí se consultan expedientes y se piden certificados.'],
            f: 'Si algo del CLIC no funciona, el correo de soporte es clic@ponferrada.org.' },
      s: { t: 'Carpeta Local de Información Ciudadana — clic.ponferrada.org', u: 'https://clic.ponferrada.org/portal/contacto.do' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'mudarme', 'nuevo vecino', 'certificado', 'volante'],
      es: { h: 'Los trámites de <b>padrón</b> y los certificados se gestionan por el CLIC o presencialmente en el Ayuntamiento.',
            l: ['Plaza del Ayuntamiento, s/n, de 8:30 a 14:00.'],
            f: 'El Ayuntamiento no publica en su web la documentación concreta de cada caso. Confírmela en el 987 446 600 antes de desplazarse.' },
      s: { t: 'Carpeta Local de Información Ciudadana — clic.ponferrada.org', u: 'https://clic.ponferrada.org/portal/contacto.do' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'turno', 'contactar', 'formulario', 'escribir'],
      es: { h: 'El Ayuntamiento tiene <b>cita previa</b> y un formulario de contacto en ponferrada.org.',
            l: [],
            f: 'No publica en su web qué trámites exigen cita y cuáles no. Confírmelo en el 987 446 600 antes de ir.' },
      s: { t: 'Formulario de contacto — ponferrada.org', u: 'https://ponferrada.org/es/mail' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Ponferrada?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
    { lang: 'ES', t: '¿Qué horario tiene el Ayuntamiento?' },
    { lang: 'ES', t: '¿Qué es el CLIC?' },
  ],
},

];
