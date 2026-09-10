// ---------------------------------------------------------------------------
//  LOS CUATRO DE LOS ENVIOS 15 Y 16.
//  Comprobado en cada web municipal el 10 de septiembre de 2026.
//
//  FALTA ARRECIFE, del envio 14, y no por pereza: arrecife.es sirve un
//  certificado TLS que no valida, y citaprevia.arrecife.es directamente no
//  resuelve. No hay forma de leer su web para sacar datos ciertos. Merece la
//  pena volver a intentarlo antes del 30 de septiembre; si sigue asi, ese es
//  un argumento de venta en si mismo.
//
//  GAVA queda fuera a proposito, como ya decia la tanda 15: han incorporado un
//  asistente que guia la documentacion del padron. No es un lead de "no teneis
//  asistente".
//
//  DOS AYUNTAMIENTOS QUE NO PUBLICAN EL HORARIO: San Bartolome de Tirajana da
//  la direccion y el telefono de Estadistica pero no las horas. La ficha lo
//  dice y manda a llamar.
//
//  Y UN CORREO QUE APARECE: sac@utrera.org, publicado en la ficha del SAC.
//  Utrera estaba en la lista de "no he podido verificar ningun correo".
//
//  Los cuatro, solo castellano.
// ---------------------------------------------------------------------------

export const MUNICIPIOS_DIA18 = [

// ===========================================================================
{
  slug: 'linares',
  nombre: 'Linares',
  articulo: 'de Linares',
  dominios: 'ciudaddelinares.es y su sede electrónica',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el Registro General', tel: '953 64 88 10', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['registro', 'registro general', 'oficina', 'donde', 'direccion', 'ayuntamiento', 'plaza del ayuntamiento', 'presentar documentos', 'instancia', 'atencion ciudadana', 'telefono', 'llamar', 'contacto'],
      es: { h: 'El <b>Registro General</b> está en la plaza del Ayuntamiento s/n, 23700 Linares (Jaén).',
            l: ['Es donde se presentan los escritos y las solicitudes dirigidas al Ayuntamiento.',
                'Teléfono: 953 64 88 10. Fax: 953 64 88 13.'],
            f: 'El Ayuntamiento publica además un listado de teléfonos por servicio en ciudaddelinares.es.' },
      s: { t: 'Registro General — ciudaddelinares.es', u: 'https://ciudaddelinares.es/ayuntamiento/registro-general' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'que dias', 'sabado'],
      es: { h: 'El Registro General atiende <b>de lunes a viernes de 9:00 a 13:00</b>.',
            l: ['La web no publica un horario distinto para el verano.'],
            f: 'Si necesita confirmarlo, el teléfono es el 953 64 88 10.' },
      s: { t: 'Registro General — ciudaddelinares.es', u: 'https://ciudaddelinares.es/ayuntamiento/registro-general' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'nuevo vecino', 'certificado', 'volante', 'documentacion', 'que necesito'],
      es: { h: 'Los trámites de <b>padrón</b> se presentan en el Registro General o por la sede electrónica.',
            l: ['El Registro está en la plaza del Ayuntamiento, de 9:00 a 13:00.'],
            f: 'La web no publica la documentación concreta de cada caso. Confírmela en el 953 64 88 10 antes de desplazarse.' },
      s: { t: 'Registro General — ciudaddelinares.es', u: 'https://ciudaddelinares.es/ayuntamiento/registro-general' },
    },
    {
      k: ['sede electronica', 'carpeta ciudadana', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'certificado digital', 'identificarse', 'mis datos', 'expediente'],
      es: { h: 'El Ayuntamiento tiene <b>sede electrónica</b> y una <b>Carpeta Ciudadana</b>.',
            l: ['En la Carpeta Ciudadana se consultan los datos y los expedientes propios.'],
            f: 'Las dos se abren desde ciudaddelinares.es.' },
      s: { t: 'Carpeta Ciudadana — ciudaddelinares.es', u: 'https://www.ciudaddelinares.es/carpeta-ciudadana' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Linares?' },
    { lang: 'ES', t: '¿Dónde está el Registro General?' },
    { lang: 'ES', t: '¿Qué horario tiene el registro?' },
    { lang: 'ES', t: '¿Puedo hacerlo por internet?' },
    { lang: 'ES', t: '¿Cuál es el teléfono?' },
  ],
},

// ===========================================================================
{
  slug: 'san-bartolome-de-tirajana',
  nombre: 'San Bartolomé de Tirajana',
  articulo: 'de San Bartolomé de Tirajana',
  dominios: 'maspalomas.com y sede.maspalomas.com',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'Estadística', tel: '928 72 34 14', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['estadistica', 'oficina', 'donde', 'direccion', 'timanfaya', 'san fernando', 'maspalomas', 'ayuntamiento', 'telefono', 'llamar', 'contacto', 'atencion ciudadana'],
      es: { h: 'El padrón lo lleva <b>Estadística</b>, en la plaza de Timanfaya s/n, San Fernando de Maspalomas.',
            l: ['Teléfono directo: 928 72 34 14.',
                'La centralita del Ayuntamiento es el 928 72 34 00.'],
            f: 'Es el servicio que se ocupa del padrón municipal y de sus certificados.' },
      s: { t: 'Directorio de oficinas municipales — maspalomas.com', u: 'https://www.maspalomas.com/oficinas-municipales' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'que dias'],
      es: { h: 'El Ayuntamiento <b>no publica en su web el horario</b> de la oficina de Estadística, y no se lo voy a estimar.',
            l: ['El directorio municipal da la dirección y el teléfono, pero no las horas de atención.'],
            f: 'Confírmelo en el 928 72 34 14 antes de desplazarse.' },
      s: { t: 'Directorio de oficinas municipales — maspalomas.com', u: 'https://www.maspalomas.com/oficinas-municipales' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'dni', 'documento', 'documentos', 'que llevar', 'identidad', 'quien puede ir', 'acompanante'],
      es: { h: 'La <b>cita previa</b> de Estadística se pide por internet, en citaprevia.maspalomas.com.',
            l: ['Solo se atiende a la persona que pidió la cita.',
                'Hay que llevar el DNI, el NIE o el pasaporte <b>originales</b>.'],
            f: 'Si va a hacer el trámite en nombre de otra persona, necesita su autorización y los documentos de las dos.' },
      s: { t: 'Cita previa telemática para la atención a la ciudadanía — maspalomas.com', u: 'https://www.maspalomas.com/index.php/mnunotprensa/419-san-bartolome-de-tirajana-implanta-la-cita-previa-telematica-para-la-atencion-a-la-ciudadania' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'nuevo vecino', 'certificado', 'volante', 'convivencia', 'residencia', 'viajes', 'descuento', 'sede electronica', 'internet', 'por internet', 'tramite', 'tramites'],
      es: { h: 'Estadística lleva el <b>padrón</b> y sus certificados: convivencia, residencia y cambios de domicilio.',
            l: ['El <b>certificado de residencia para viajar</b> se puede emitir y descargar desde el portal electrónico.',
                'Los trámites del padrón se pueden hacer también por la sede electrónica.'],
            f: 'La sede está en sede.maspalomas.com.' },
      s: { t: 'Sede Electrónica — San Bartolomé de Tirajana', u: 'https://sede.maspalomas.com/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en San Bartolomé?' },
    { lang: 'ES', t: '¿Qué documentos tengo que llevar?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Qué horario tienen?' },
    { lang: 'ES', t: '¿Puedo hacerlo por internet?' },
  ],
},

// ===========================================================================
{
  slug: 'utrera',
  nombre: 'Utrera',
  articulo: 'de Utrera',
  dominios: 'utrera.org y sede.utrera.org',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el SAC', tel: '955 86 45 45', email: 'sac@utrera.org' },
  idioma2: null,
  kb: [
    {
      k: ['sac', 'oficina', 'donde', 'direccion', 'gibaxa', 'registro', 'ayuntamiento', 'atencion ciudadana', 'telefono', 'llamar', 'contacto', 'correo'],
      es: { h: 'La oficina se llama <b>SAC</b>, Oficina de Asistencia en Materia de Registro, y está en la plaza de Gibaxa s/n.',
            l: ['Teléfono: 955 86 45 45, de 8:00 a 18:00.',
                'Correo: sac@utrera.org. La centralita del Ayuntamiento es el 954 86 00 50.'],
            f: 'Es la ventanilla única para el registro y para la mayoría de trámites municipales.' },
      s: { t: 'S.A.C. Oficina de Asistencia en Materia de Registro — utrera.org', u: 'https://www.utrera.org/project/s-a-c-oficina-de-asistencia-en-materia-de-registro/' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'que dias', 'cita', 'cita previa', 'pedir cita', 'hace falta cita', 'necesito cita', 'sin cita', 'turno'],
      es: { h: 'El SAC atiende <b>de 8:30 a 13:30, y con cita previa</b>.',
            l: ['El teléfono, en cambio, atiende de 8:00 a 18:00 en el 955 86 45 45.'],
            f: 'La web no publica un horario distinto para el verano.' },
      s: { t: 'S.A.C. Oficina de Asistencia en Materia de Registro — utrera.org', u: 'https://www.utrera.org/project/s-a-c-oficina-de-asistencia-en-materia-de-registro/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'acreditar residencia', 'como consigo', 'cambio de domicilio', 'nuevo vecino', 'trafico', 'pareja de hecho', 'catastro'],
      es: { h: 'En el SAC se expiden los <b>certificados de empadronamiento</b>, entre otros muchos trámites.',
            l: ['También tramitan el cambio de domicilio ante Tráfico y la inscripción en el registro de parejas de hecho.',
                'Y es Punto de Información Catastral.'],
            f: 'Todo ello con cita previa, en la plaza de Gibaxa.' },
      s: { t: 'S.A.C. Oficina de Asistencia en Materia de Registro — utrera.org', u: 'https://www.utrera.org/project/s-a-c-oficina-de-asistencia-en-materia-de-registro/' },
    },
    {
      k: ['sede electronica', 'registro electronico', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'presentar documentos', 'certificado digital', 'reclamacion', 'queja', 'sugerencia'],
      es: { h: 'La <b>sede electrónica</b> está en sede.utrera.org.',
            l: ['El SAC hace registro electrónico de documentos y recibe las solicitudes y reclamaciones municipales.'],
            f: 'Dudas: 955 86 45 45 o sac@utrera.org.' },
      s: { t: 'Sede electrónica — Ayuntamiento de Utrera', u: 'https://sede.utrera.org/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Utrera?' },
    { lang: 'ES', t: '¿Puedo presentar un escrito en el registro?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
    { lang: 'ES', t: '¿Dónde está el SAC?' },
    { lang: 'ES', t: '¿Puedo hacerlo por internet?' },
  ],
},

// ===========================================================================
{
  slug: 'segovia',
  nombre: 'Segovia',
  articulo: 'de Segovia',
  dominios: 'segovia.es y sede.segovia.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el Ayuntamiento', tel: '921 41 98 19', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion ciudadana', 'atencion al ciudadano', 'donde', 'direccion', 'plaza mayor', 'ayuntamiento', 'participacion', 'barrios'],
      es: { h: 'La <b>Oficina de Atención al Ciudadano</b> está en la plaza Mayor, 1, 40001 Segovia.',
            l: ['Depende de la Concejalía de Barrios, y va unida a Participación Ciudadana.',
                'Teléfono: 921 41 98 88. Correo: participacion@segovia.es.'],
            f: 'La centralita general del Ayuntamiento es el 921 41 98 00.' },
      s: { t: 'Oficina de Atención al ciudadano — segovia.es', u: 'https://segovia.es/area/barrios/oficina-de-atencion-al-ciudadano' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'sabado', 'domingo', 'fin de semana', 'verano', 'que dias'],
      es: { h: 'La atención al público es <b>de lunes a viernes, de 9:00 a 14:00</b>.',
            l: ['Sábados y domingos está cerrado.',
                'La web no publica un horario distinto para el verano.'],
            f: 'Ese horario de 9:00 a 14:00 es el general de atención al público del Ayuntamiento.' },
      s: { t: 'Atención telefónica — segovia.es', u: 'https://segovia.es/servicios/atencion-telefonica' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'nuevo vecino', 'certificado', 'volante', 'registro', 'telefono', 'llamar', 'documentacion', 'que necesito'],
      es: { h: 'El <b>padrón y el registro</b> se atienden en el mismo teléfono: <b>921 41 98 19</b>.',
            l: ['La atención al público es de 9:00 a 14:00.'],
            f: 'La web no publica la documentación concreta de cada caso. Confírmela en ese teléfono antes de desplazarse.' },
      s: { t: 'Atención telefónica — segovia.es', u: 'https://segovia.es/servicios/atencion-telefonica' },
    },
    {
      k: ['sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'registro electronico', 'certificado digital', 'cita', 'cita previa', 'pedir cita', 'hace falta cita', 'necesito cita', 'turno'],
      es: { h: 'La <b>cita previa</b> para la atención presencial se pide por la sede electrónica, en sede.segovia.es.',
            l: ['Desde la sede se accede también al registro electrónico y a los trámites municipales.'],
            f: 'Si prefiere preguntar antes si le atienden sin cita, llame al 921 41 98 19.' },
      s: { t: 'Cita previa — sede.segovia.es', u: 'https://sede.segovia.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=PTS2_OFIASIREG' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Segovia?' },
    { lang: 'ES', t: '¿Puedo hacer los trámites por internet?' },
    { lang: 'ES', t: '¿Qué horario tienen?' },
    { lang: 'ES', t: '¿Dónde está la oficina?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
  ],
},

];
