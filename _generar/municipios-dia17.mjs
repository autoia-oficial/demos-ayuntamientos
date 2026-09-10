// ---------------------------------------------------------------------------
//  LOS CINCO DE LOS ENVIOS 11, 12 Y 13 QUE FALTABAN.
//  Comprobado en cada web municipal el 10 de septiembre de 2026.
//
//  San Sebastian de los Reyes tapa el hueco del envio 11; San Fernando y
//  Guadalajara el del 12; Sanlucar de Barrameda y Ferrol el del 13.
//
//  DOS COSAS QUE HAN COSTADO Y CONVIENE NO REPETIR:
//
//   - ssreyes.org tiene proteccion antibots y WebFetch solo ve "estamos
//     comprobando que no eres un robot". Hubo que leerlo con el navegador de
//     verdad, esperando a que pasara la verificacion. Si vuelve a tocar esa
//     web, ir directo por ahi.
//   - San Fernando NO publica telefono en la ficha de la oficina; el numero
//     sale del directorio general. La ficha de la demo no promete horario de
//     tarde porque la web solo dice "9:00 a 13:00".
//
//  Idioma: gallego en Ferrol. Los otros cuatro, solo castellano.
// ---------------------------------------------------------------------------

export const MUNICIPIOS_DIA17 = [

// ===========================================================================
{
  slug: 'san-sebastian-de-los-reyes',
  nombre: 'San Sebastián de los Reyes',
  articulo: 'de San Sebastián de los Reyes',
  dominios: 'ssreyes.org y sede.ssreyes.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el SAC', tel: '010 · 91 659 71 00', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['sac', 'oficina', 'oficinas', 'atencion ciudadana', 'donde', 'direccion', 'caseron', 'arroyos', 'pepe viyuela', 'centro civico', 'club de campo', 'cual me toca', 'punto de atencion'],
      es: { h: 'El <b>Servicio de Atención Ciudadana (SAC)</b> tiene <b>cuatro puntos</b> repartidos por el municipio.',
            l: ['El Caserón, plaza de la Constitución, 2.',
                'Los Arroyos, paseo de Guadalajara, 5.',
                'Centro Cívico Pepe Viyuela, avenida de Tenerife, 7.',
                'Club de Campo, calle Federico Chueca s/n.'],
            f: 'En todos se atiende lo mismo: información y trámites municipales, y también de otras administraciones.' },
      s: { t: 'Servicio de Atención Ciudadana — ssreyes.org', u: 'https://www.ssreyes.org/atenci%C3%B3n-ciudadana' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'julio', 'agosto', 'cerrado', 'que dias'],
      es: { h: 'El Caserón abre <b>de 8:30 a 14:30 de lunes a viernes</b>, y además <b>de 15:00 a 18:45 de lunes a jueves</b>.',
            l: ['Del 15 de junio al 15 de septiembre, El Caserón atiende de 8:30 a 14:00.',
                'Los Arroyos y el Centro Cívico Pepe Viyuela abren de 8:30 a 14:30, y <b>cierran en julio y agosto</b>.',
                'El Club de Campo atiende los martes de 12:00 a 14:00 y de 15:00 a 18:45, y los jueves de 8:30 a 14:30.'],
            f: 'Todos los horarios son de días laborables.' },
      s: { t: 'Servicio de Atención Ciudadana — ssreyes.org', u: 'https://www.ssreyes.org/atenci%C3%B3n-ciudadana' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'renovacion', 'mudarme', 'nuevo vecino'],
      es: { h: 'Para los <b>trámites de padrón la cita previa es obligatoria</b> desde el 12 de enero de 2026.',
            l: ['Afecta a las altas, a los cambios de domicilio y a las renovaciones.',
                'Para todo lo demás no hace falta cita, aunque puede pedirla si quiere reducir la espera.'],
            f: 'El Ayuntamiento pide que se anule la cita si al final no se va a usar, para que la aproveche otra persona.' },
      s: { t: 'Servicio de Atención Ciudadana — ssreyes.org', u: 'https://www.ssreyes.org/atenci%C3%B3n-ciudadana' },
    },
    {
      k: ['telefono', 'llamar', 'por telefono', 'contacto', '010', 'atencion telefonica', 'desde fuera', 'informacion'],
      es: { h: 'El teléfono de información es el <b>010</b> desde San Sebastián de los Reyes, y el <b>91 659 71 00</b> desde fuera.',
            l: ['Atiende de 8:30 a 14:30 de lunes a viernes, solo días laborables.',
                'Del 15 de junio al 15 de septiembre, de 8:30 a 14:00.'],
            f: 'Informa de trámites, procedimientos y servicios municipales.' },
      s: { t: 'Servicio de Atención Ciudadana — ssreyes.org', u: 'https://www.ssreyes.org/atenci%C3%B3n-ciudadana' },
    },
    {
      k: ['registro electronico', 'sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'presentar documentos', 'certificado digital', 'dni electronico', 'firma'],
      es: { h: 'El <b>registro electrónico</b> es el canal que el Ayuntamiento recomienda para presentar documentos.',
            l: ['Sirve para cualquier departamento del Ayuntamiento.',
                'Para usarlo hace falta DNI electrónico o certificado electrónico.'],
            f: 'Las personas físicas pueden elegir: también se admite la presentación presencial.' },
      s: { t: 'Sede electrónica — sede.ssreyes.es', u: 'https://sede.ssreyes.es/' },
    },
    {
      k: ['queja', 'quejas', 'sugerencia', 'sugerencias', 'reclamacion', 'reclamaciones', 'incidencia', 'aviso', 'felicitacion', 'buzon', 'protesta'],
      es: { h: 'Las quejas y sugerencias van al <b>Buzón del ciudadano</b>.',
            l: ['Sirve para sugerencias, avisos, incidencias, reclamaciones, felicitaciones y quejas.',
                'Para usarlo no hace falta ningún certificado.'],
            f: 'El Ayuntamiento avisa de que lo que se presenta por ahí no cuenta como alegación ni como recurso, y no suspende plazos.' },
      s: { t: 'Servicio de Atención Ciudadana — ssreyes.org', u: 'https://www.ssreyes.org/atenci%C3%B3n-ciudadana' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en San Sebastián de los Reyes?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
    { lang: 'ES', t: '¿Qué oficinas cierran en agosto?' },
    { lang: 'ES', t: '¿Dónde pongo una queja?' },
    { lang: 'ES', t: '¿Cuál es el teléfono?' },
  ],
},

// ===========================================================================
{
  slug: 'san-fernando',
  nombre: 'San Fernando',
  articulo: 'de San Fernando',
  dominios: 'sanfernando.es y sede.sanfernando.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el Ayuntamiento', tel: '956 94 98 40', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion ciudadana', 'donde', 'direccion', 'plaza del rey', 'ayuntamiento', 'isaac peral', 'registro general', 'informacion'],
      es: { h: 'La <b>Oficina de Atención a la Ciudadanía</b> está en la plaza del Rey, 5, 11100 San Fernando.',
            l: ['La Oficina de Información y Registro General está en la calle Isaac Peral, 11 y 13.',
                'El teléfono general del Ayuntamiento es el 956 94 98 40; el de la sede central, el 956 94 40 00.'],
            f: 'Es donde se hacen el registro, el padrón y la firma de la FNMT.' },
      s: { t: 'Oficina de Atención a la Ciudadanía — sanfernando.es', u: 'https://www.sanfernando.es/ayto/visor.asp?hidOptNav=2163' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'que dias'],
      es: { h: 'La Oficina de Atención a la Ciudadanía atiende <b>de 9:00 a 13:00</b>.',
            l: ['La web no publica horario de tarde ni un horario distinto para el verano.'],
            f: 'Si necesita confirmarlo, el teléfono del Ayuntamiento es el 956 94 98 40.' },
      s: { t: 'Oficina de Atención a la Ciudadanía — sanfernando.es', u: 'https://www.sanfernando.es/ayto/visor.asp?hidOptNav=2163' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno'],
      es: { h: 'Para el registro, el padrón y la firma de la FNMT <b>no hace falta cita</b>.',
            l: ['El Ayuntamiento lo dice expresamente: esos trámites se efectúan sin necesidad de cita.'],
            f: 'Para reservar cita en otros servicios, la web da el correo Reservadecitas@sanfernando.es.' },
      s: { t: 'Oficina de Atención a la Ciudadanía — sanfernando.es', u: 'https://www.sanfernando.es/ayto/visor.asp?hidOptNav=2163' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'cambio de domicilio', 'nuevo vecino', 'documentacion', 'que necesito', 'sede electronica', 'internet', 'por internet', 'tramite', 'tramites'],
      es: { h: 'Los trámites de <b>padrón</b> se hacen en la Oficina de Atención a la Ciudadanía, sin cita.',
            l: ['También hay sede electrónica, en sede.sanfernando.es.'],
            f: 'La web no publica la documentación concreta de cada caso. Confírmela en el 956 94 98 40 antes de desplazarse.' },
      s: { t: 'Sede Electrónica — Ayuntamiento de San Fernando', u: 'https://sede.sanfernando.es/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en San Fernando?' },
    { lang: 'ES', t: '¿Puedo pedir el volante por internet?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
    { lang: 'ES', t: '¿Qué horario tienen?' },
    { lang: 'ES', t: '¿Dónde está la oficina?' },
  ],
},

// ===========================================================================
{
  slug: 'guadalajara',
  nombre: 'Guadalajara',
  articulo: 'de Guadalajara',
  dominios: 'guadalajara.es y sedeelectronica.guadalajara.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el SAC', tel: '949 88 70 70', email: 'registro@aytoguadalajara.es' },
  idioma2: null,
  kb: [
    {
      k: ['sac', 'oficina', 'oficinas', 'atencion ciudadana', 'informacion', 'registro', 'donde', 'direccion', 'plaza mayor', 'vado', 'cmi', 'cual me toca'],
      es: { h: 'El servicio se llama <b>Información y Registro (SAC)</b> y tiene dos oficinas.',
            l: ['Plaza Mayor, 1-7, 19001 Guadalajara.',
                'Avenida del Vado, 15, 19005 Guadalajara.'],
            f: 'Teléfonos: 949 88 70 70 y 949 01 03 33 el del CMI. Correo: registro@aytoguadalajara.es.' },
      s: { t: 'Servicio de información administrativa y de atención al ciudadano — guadalajara.es', u: 'https://www.guadalajara.es/es/ayuntamiento/administracion/informacion-y-registro/' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'martes', 'jueves', 'verano', 'navidad', 'semana santa', 'que dias'],
      es: { h: 'Las dos oficinas abren <b>de lunes a viernes de 9:00 a 14:00</b>.',
            l: ['La de plaza Mayor abre además <b>martes y jueves de 15:00 a 18:00</b>.',
                'Esas tardes no se hacen en Semana Santa, en Navidad ni del 15 de junio al 16 de septiembre.'],
            f: 'Dudas de horario: 949 88 70 70.' },
      s: { t: 'Servicio de información administrativa y de atención al ciudadano — guadalajara.es', u: 'https://www.guadalajara.es/es/ayuntamiento/administracion/informacion-y-registro/' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'por internet', 'online'],
      es: { h: 'La <b>cita previa</b> se pide por internet o llamando al <b>949 88 70 70</b>.',
            l: ['Para los trámites del padrón municipal la cita previa es necesaria.'],
            f: 'El servicio de cita previa está publicado en guadalajara.es.' },
      s: { t: 'Cita previa — citaprevia.guadalajara.es', u: 'https://citaprevia.guadalajara.es/citaprevia/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'modificacion de datos', 'certificado', 'volante', 'nuevo vecino', 'extranjero', 'renovacion'],
      es: { h: 'La <b>inscripción en el padrón</b> y la modificación de datos se tramitan con cita previa.',
            l: ['El Ayuntamiento publica la ficha del trámite y sus modelos en guadalajara.es.',
                'Hay un procedimiento aparte para la confirmación de residencia de extranjeros que no tienen que renovar su inscripción.'],
            f: 'La documentación concreta va en la ficha de cada trámite. Si tiene dudas, 949 88 70 70.' },
      s: { t: 'Padrón de Habitantes — guadalajara.es', u: 'https://www.guadalajara.es/es/sede-electronica/tramites/tramites-generales/padron-de-habitantes/' },
    },
    {
      k: ['sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'certificado digital', 'dni electronico', 'firma', 'portal del ciudadano'],
      es: { h: 'La <b>sede electrónica</b> está en sedeelectronica.guadalajara.es.',
            l: ['Hay además un portal del ciudadano específico para gestión tributaria y padrón.'],
            f: 'Desde ahí se consultan los trámites generales y se presentan solicitudes.' },
      s: { t: 'Sede Electrónica de Guadalajara', u: 'https://sedeelectronica.guadalajara.es/info.0' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Guadalajara?' },
    { lang: 'ES', t: '¿Puedo hacer los trámites por internet?' },
    { lang: 'ES', t: '¿Qué días abren por la tarde?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Dónde están las oficinas?' },
  ],
},

// ===========================================================================
{
  slug: 'sanlucar-de-barrameda',
  nombre: 'Sanlúcar de Barrameda',
  articulo: 'de Sanlúcar de Barrameda',
  dominios: 'sanlucardebarrameda.es y sede.sanlucardebarrameda.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'Atención al Ciudadano', tel: '956 38 80 06', email: 'atencion.ciudadano@sanlucardebarrameda.es' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion ciudadana', 'atencion al ciudadano', 'donde', 'direccion', 'ayuntamiento', 'cuesta de belen', 'palacio municipal', 'contacto', 'telefono', 'correo', 'llamar'],
      es: { h: 'El Ayuntamiento está en la <b>Cuesta de Belén, 1</b>, 11540 Sanlúcar de Barrameda.',
            l: ['Atención al Ciudadano: teléfono 956 38 80 06, correo atencion.ciudadano@sanlucardebarrameda.es.',
                'La centralita general es el 956 38 80 00, y el correo general info@sanlucardebarrameda.es.'],
            f: 'La web no publica el horario de atención al público.' },
      s: { t: 'Teléfonos de los servicios de atención a la ciudadanía — sanlucardebarrameda.es', u: 'https://www.sanlucardebarrameda.es/es/content/tel%C3%A9fonos-de-los-servicios-de-atenci%C3%B3n-la-ciudadan%C3%ADa' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'app', 'aplicacion'],
      es: { h: 'En Sanlúcar se atiende <b>solo con cita previa</b>, salvo casos y situaciones específicas.',
            l: ['La cita se pide en citaprevia.sanlucardebarrameda.es.',
                'También se puede pedir desde la aplicación municipal de cita previa.'],
            f: 'Es el propio Ayuntamiento el que avisa de que no hay atención directa al público sin cita.' },
      s: { t: 'Servicios de Atención a la Ciudadanía — sanlucardebarrameda.es', u: 'https://www.sanlucardebarrameda.es/es/content/servicios-de-atenci%C3%B3n-la-ciudadan%C3%ADa' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'nacimiento', 'nuevo vecino', 'poblacion', 'estadistica', 'certificado', 'volante'],
      es: { h: 'El padrón lo lleva <b>Población y Estadística</b>, y hay que pedirle cita previa.',
            l: ['Vale tanto para el certificado de empadronamiento como para el cambio de domicilio.',
                'Y también para el alta por cambio de ciudad o por nacimiento.'],
            f: 'La cita se pide en citaprevia.sanlucardebarrameda.es o desde la aplicación municipal.' },
      s: { t: 'Solicitudes de certificado de empadronamiento — sanlucardebarrameda.es', u: 'https://www.sanlucardebarrameda.es/es/content/solicitudes-de-certificado-de-empadronamiento' },
    },
    {
      k: ['sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'catalogo', 'presentar documentos', 'registro'],
      es: { h: 'La <b>sede electrónica</b> está en sede.sanlucardebarrameda.es.',
            l: ['Tiene un catálogo de trámites y un portal del ciudadano.'],
            f: 'Es la vía para presentar solicitudes sin desplazarse.' },
      s: { t: 'Sede Electrónica — Sanlúcar de Barrameda', u: 'https://sede.sanlucardebarrameda.es/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Sanlúcar?' },
    { lang: 'ES', t: '¿Dónde presento una queja o sugerencia?' },
    { lang: 'ES', t: '¿Puedo ir sin cita?' },
    { lang: 'ES', t: '¿Cuál es el teléfono?' },
    { lang: 'ES', t: '¿Puedo hacerlo por internet?' },
  ],
},

// ===========================================================================
{
  slug: 'ferrol',
  nombre: 'Ferrol',
  articulo: 'de Ferrol',
  dominios: 'ferrol.gal y su sede electrónica',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el Concello', tel: '981 94 40 00', email: '' },
  idioma2: { cod: 'GL', clave: 'gl', sigla: 'no Concello', nombre: 'gallego' },
  kb: [
    {
      k: ['oficina', 'concello', 'ayuntamiento', 'donde', 'direccion', 'praza de armas', 'plaza de armas', 'contacto', 'telefono', 'llamar',
          'onde', 'enderezo', 'telefono'],
      es: { h: 'El <b>Concello de Ferrol</b> está en la Praza de Armas s/n, 15402 Ferrol.',
            l: ['El teléfono general es el 981 94 40 00.'],
            f: 'Los trámites del padrón los lleva la oficina de Estadística, en la extensión 236.' },
      gl: { h: 'O <b>Concello de Ferrol</b> está na Praza de Armas s/n, 15402 Ferrol.',
            l: ['O teléfono xeral é o 981 94 40 00.'],
            f: 'Os trámites do padrón lévaos a oficina de Estatística, na extensión 236.' },
      s: { t: 'Concello de Ferrol — ferrol.gal', u: 'https://www.ferrol.gal/Shared/Contidos/41' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'modificacion de datos', 'nuevo vecino', 'hoja padronal', 'estadistica',
          'padron', 'empadroar', 'empadroarme', 'empadroamento', 'cambio de domicilio', 'folla padroal', 'estatistica'],
      es: { h: 'El <b>alta, el cambio de domicilio y la modificación de datos</b> del padrón se pueden presentar de dos maneras.',
            l: ['Por internet, con la hoja padronal firmada digitalmente y la documentación, por el registro electrónico.',
                'El Concello avisa de que <b>no se aceptan documentos escaneados</b>: la firma tiene que ser digital.',
                'Presencialmente, en la oficina de Estadística del Concello.'],
            f: 'Para ir en persona hay que pedir cita antes por teléfono.' },
      gl: { h: 'A <b>alta, o cambio de domicilio e a modificación de datos</b> do padrón pódense presentar de dúas maneiras.',
            l: ['Por internet, coa folla padroal asinada dixitalmente e a documentación, polo rexistro electrónico.',
                'O Concello avisa de que <b>non se aceptan documentos escaneados</b>: a sinatura ten que ser dixital.',
                'Presencialmente, na oficina de Estatística do Concello.'],
            f: 'Para ir en persoa hai que pedir cita antes por teléfono.' },
      s: { t: 'Solicitude de alta, cambio de domicilio ou modificación de datos no Padrón — ferrol.gal', u: 'https://www.ferrol.gal:8443/cividas-core-web-ferrol/public/catalog-detail/29052673' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'extension',
          'cita previa', 'pedir cita', 'horario', 'ata que hora', 'abren'],
      es: { h: 'La <b>cita para el padrón</b> se pide llamando al <b>981 94 40 00, extensión 236</b>.',
            l: ['Ese teléfono atiende de 9:00 a 14:00.'],
            f: 'El Concello no publica en su web otro horario de atención presencial.' },
      gl: { h: 'A <b>cita para o padrón</b> pídese chamando ao <b>981 94 40 00, extensión 236</b>.',
            l: ['Ese teléfono atende de 9:00 a 14:00.'],
            f: 'O Concello non publica no seu web outro horario de atención presencial.' },
      s: { t: 'Solicitude de alta, cambio de domicilio ou modificación de datos no Padrón — ferrol.gal', u: 'https://www.ferrol.gal:8443/cividas-core-web-ferrol/public/catalog-detail/29052673' },
    },
    {
      k: ['sede electronica', 'registro electronico', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'clave', 'certificado digital', 'identificarse', 'firma', 'formulario', 'formularios',
          'sede electronica', 'rexistro electronico', 'por internet', 'tramite', 'tramites', 'sinatura', 'formularios'],
      es: { h: 'Para hacer los trámites por internet hay que identificarse con <b>Clave</b> y entrar en el registro electrónico.',
            l: ['El Concello publica el catálogo de procedimientos y los formularios de solicitud en su web.'],
            f: 'La sede electrónica se abre desde ferrol.gal.' },
      gl: { h: 'Para facer os trámites por internet hai que identificarse con <b>Clave</b> e entrar no rexistro electrónico.',
            l: ['O Concello publica o catálogo de procedementos e os formularios de solicitude no seu web.'],
            f: 'A sede electrónica ábrese desde ferrol.gal.' },
      s: { t: 'Sede electrónica — Concello de Ferrol', u: 'https://www.ferrol.gal/Sede' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Ferrol?' },
    { lang: 'ES', t: '¿Puedo hacerlo por internet?' },
    { lang: 'GL', t: 'Onde está o Concello?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Qué horario tiene el registro?' },
  ],
},

];
