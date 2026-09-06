// ---------------------------------------------------------------------------
//  LOS CINCO DEL SEPTIMO ENVIO — martes 22 de septiembre de 2026.
//  Comprobado en cada web municipal el 7 de septiembre de 2026.
//
//  Son cinco y no ocho porque ya no quedan mas municipios aptos en la base:
//  de los 275 con material preparado, el resto o no tiene correo de contacto
//  verificado o esta pendiente de comprobar si ya tiene chatbot. Linares queda
//  fuera aparte: su web no responde.
//
//  Portugalete estrena euskera. No es opcional: su propio correo promete
//  "en el idioma en que se le pregunta (euskera o castellano)", asi que una
//  demo que solo hablara castellano dejaria el correo en evidencia.
// ---------------------------------------------------------------------------

export const MUNICIPIOS_DIA07 = [

// ===========================================================================
{
  slug: 'miranda-de-ebro',
  nombre: 'Miranda de Ebro',
  articulo: 'de Miranda de Ebro',
  dominios: 'mirandadeebro.es',
  fecha: '7 de septiembre de 2026',
  oficina: { sigla: 'el SAC', tel: '010 o 670 600 145', email: 'buzon@mirandadeebro.es' },
  idioma2: null,
  kb: [
    {
      k: ['sac', 'oficina', 'oficinas', 'atencion ciudadana', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'plaza de espana', 'fuente vieja', 'raimundo porres'],
      es: { h: 'El <b>Servicio de Atención Ciudadana (SAC)</b> está en la planta baja del Ayuntamiento, entre la plaza de España y la Fuente Vieja.',
            l: ['Dirección: plaza de España, 8 — 09200 Miranda de Ebro.',
                'Hay un segundo SAC en el Centro Cívico Raimundo Porres, junto al parque Emiliano Bajo.',
                'Teléfonos: el <b>010</b> desde Miranda y su zona de influencia; el 670 600 145 desde cualquier otro sitio; y el 947 34 91 00, que es la centralita municipal.'],
            f: 'Correo: buzon@mirandadeebro.es.' },
      s: { t: 'Servicio de Atención Ciudadana (SAC) — mirandadeebro.es', u: 'https://www.mirandadeebro.es/ayuntamiento/servicios/servicio-de-atencion-ciudadana/informacion-general/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta', 'baja', 'certificado', 'volante', 'cambio de domicilio'],
      es: { h: 'El SAC gestiona el <b>Padrón de Habitantes</b> completo.',
            l: ['Altas y bajas.',
                'Cambios de domicilio.',
                'Certificados y volantes de empadronamiento.'],
            f: 'También hace de oficina registral, ventanilla única y validación de certificado digital.' },
      s: { t: 'Servicio de Atención Ciudadana (SAC) — mirandadeebro.es', u: 'https://www.mirandadeebro.es/lugar/servicio-de-atencion-ciudadana-sac/' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'reservar', 'como pido cita', 'espera', 'colas', 'sin cita'],
      es: { h: 'El SAC tiene <b>cita previa</b>, y el Ayuntamiento aconseja usarla.',
            l: ['Se pide en el <b>010</b> desde Miranda y su zona de influencia.',
                'Desde fuera: 670 600 145, o la centralita en el 947 34 91 00.'],
            f: 'La recomendación es explícita: con cita se evitan esperas innecesarias y la atención es más eficiente.' },
      s: { t: 'Cita previa — Servicio de Atención Ciudadana', u: 'https://www.mirandadeebro.es/cita-previa-servicio-de-atencion-ciudadana/' },
    },
    {
      k: ['certificado digital', 'validacion', 'ventanilla unica', 'registro', 'oficina registral', 'presentar documentos'],
      es: { h: 'El SAC hace además de <b>oficina registral y ventanilla única</b>.',
            l: ['Presentación y registro de documentos.',
                'Validación del certificado digital.'],
            f: 'Es decir, no hace falta ir a otro sitio para registrar un escrito.' },
      s: { t: 'Servicio de Atención Ciudadana — mirandadeebro.es', u: 'https://www.mirandadeebro.es/ayuntamiento/servicios/servicio-de-atencion-ciudadana/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Dónde está el SAC?' },
    { lang: 'ES', t: '¿Cuánto cuesta exactamente el IBI?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Qué trámites de padrón puedo hacer?' },
  ],
},

// ===========================================================================
{
  slug: 'mazarron',
  nombre: 'Mazarrón',
  articulo: 'de Mazarrón',
  dominios: 'mazarron.es y sede.mazarron.es',
  fecha: '7 de septiembre de 2026',
  oficina: { sigla: 'Atención al Ciudadano', tel: '968 333 255', email: 'secretaria@mazarron.es' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'atencion al ciudadano', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'canalejas', 'ayuntamiento'],
      es: { h: 'La oficina de <b>Atención al Ciudadano</b> está en la calle Canalejas, 3.',
            l: ['Teléfono: 968 333 255.',
                'Horario: de 8:00 a 14:00.',
                'El Ayuntamiento está en la plaza del Ayuntamiento, s/n — 30870 Mazarrón (Murcia), teléfono 968 59 00 12.'],
            f: 'Son dos direcciones distintas: la de atención al ciudadano no es la del Ayuntamiento.' },
      s: { t: 'Información y atención al ciudadano — gobiernoabierto.mazarron.es', u: 'http://gobiernoabierto.mazarron.es/participacion/informacion-y-atencion-al-ciudadano/informacion-y-atencion-al-ciudadano-portada/' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'reservar', 'como pido cita', 'presencial'],
      es: { h: 'La <b>cita previa</b> se pide llamando al <b>968 59 00 12</b>.',
            l: ['El teléfono atiende para citas de 9:00 a 14:00.'],
            f: 'Ojo: para la cita es el 968 59 00 12, no el de la oficina de Atención al Ciudadano.' },
      s: { t: 'Atención presencial con cita previa — mazarron.es', u: 'https://www.mazarron.es/de/ayuntamiento/noticias/EL-AYUNTAMIENTO-RETOMA-EL-LUNES-LA-ATENCION-PRESENCIAL-CON-CITA-PREVIA-OBLIGATORIA-Y-MEDIDAS-DE-SEGURIDAD-ANTE-LA-COVID-19/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'estadistica', 'registro de entrada', 'certificado', 'volante'],
      es: { h: 'El <b>padrón</b> lo lleva Estadística, junto con el Registro de Entrada.',
            l: ['Ambos servicios comparten horario de atención al público.',
                'Los trámites también están disponibles en la sede electrónica.'],
            f: 'La documentación concreta depende de su caso. Confírmela en el 968 333 255 antes de ir.' },
      s: { t: 'Nuevo horario de atención al público para Registro de Entrada y Estadística — mazarron.es', u: 'https://www.mazarron.es/es/ayuntamiento/noticias/Nuevo-horario-de-atencion-al-publico-para-Registro-de-Entrada-y-Estadistica/' },
    },
    {
      k: ['sede electronica', 'tramite', 'tramites', 'online', 'internet', 'por internet', 'servicios'],
      es: { h: 'La <b>sede electrónica</b> está en sede.mazarron.es.',
            l: ['Los trámites y servicios municipales están listados en mazarron.es.'],
            f: 'Dudas: 968 333 255.' },
      s: { t: 'Sede electrónica — Ayuntamiento de Mazarrón', u: 'https://sede.mazarron.es/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Dónde está la oficina de atención al ciudadano?' },
    { lang: 'ES', t: '¿Cuánto cuesta exactamente el IBI?' },
    { lang: 'ES', t: '¿A qué teléfono llamo para pedir cita?' },
    { lang: 'ES', t: '¿Hasta qué hora abren?' },
  ],
},

// ===========================================================================
{
  slug: 'portugalete',
  nombre: 'Portugalete',
  articulo: 'de Portugalete',
  dominios: 'portugalete.org',
  fecha: '7 de septiembre de 2026',
  oficina: { sigla: 'la OIAC', tel: '94 472 92 00', email: 'alcaldia@portugalete.org' },
  idioma2: { cod: 'EU', clave: 'eu', sigla: 'OIAC bulegoa (San Roke plaza)', nombre: 'euskera' },
  kb: [
    {
      k: ['oiac', 'oficina', 'atencion ciudadana', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'san roque', 'sabado', 'sabados', 'tarde',
          'bulegoa', 'ordutegia', 'telefonoa', 'helbidea', 'non dago', 'larunbata'],
      es: { h: 'La <b>Oficina de Información y Atención a la Ciudadanía (OIAC)</b> está en la plaza de San Roque, s/n — 48920 Portugalete (Bizkaia).',
            l: ['Teléfono: 94 472 92 00.',
                'De lunes a viernes: de 14:30 a 20:15.',
                'Sábados: de 9:00 a 13:45.'],
            f: 'Es una oficina de tarde: complementa el horario de mañana del Ayuntamiento.' },
      eu: { h: '<b>Herritarrentzako Informazio eta Arreta Bulegoa (OIAC)</b> San Roke plazan dago, z/g — 48920 Portugalete (Bizkaia).',
            l: ['Telefonoa: 94 472 92 00.',
                'Astelehenetik ostiralera: 14:30etik 20:15era.',
                'Larunbatetan: 9:00etatik 13:45era.'],
            f: 'Arratsaldeko bulegoa da: Udalaren goizeko ordutegia osatzen du.' },
      s: { t: 'OIAC — Ayuntamiento de Portugalete', u: 'http://www.portugalete.org/es-ES/VivirenPortugalete/OIAC/Paginas/default.aspx' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'acreditar residencia',
          'errolda', 'erroldatu', 'ziurtagiria', 'agiria'],
      es: { h: 'La OIAC expide los <b>certificados y volantes de empadronamiento</b>.',
            l: ['También registra documentos y tramita solicitudes.',
                'Y permite pagar tasas e impuestos municipales.'],
            f: 'Todo en la misma ventanilla: plaza de San Roque, s/n.' },
      eu: { h: 'OIACek <b>errolda-ziurtagiriak eta -agiriak</b> ematen ditu.',
            l: ['Dokumentuak ere erregistratzen ditu eta eskaerak izapidetzen.',
                'Eta udal tasak eta zergak ordaintzeko aukera ematen du.'],
            f: 'Dena leiho berean: San Roke plaza, z/g.' },
      s: { t: 'Atención a la Ciudadanía — Ayuntamiento de Portugalete', u: 'https://www.portugalete.org/es-ES/Paginas/atencion-ciudadana.aspx' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'reservar', 'personal especializado', 'especialista',
          'hitzordua', 'eskatu'],
      es: { h: 'En la OIAC se puede <b>concertar cita con personal especializado</b>.',
            l: ['Se pide en el 94 472 92 00, o en la propia oficina.'],
            f: 'Para lo demás —certificados, registro, pagos— se atiende directamente en ventanilla.' },
      eu: { h: 'OIACen <b>langile espezializatuekin hitzordua</b> har daiteke.',
            l: ['94 472 92 00 telefonoan eskatzen da, edo bulegoan bertan.'],
            f: 'Gainerakorako —ziurtagiriak, erregistroa, ordainketak— leihatilan bertan artatzen dute.' },
      s: { t: 'OIAC — Ayuntamiento de Portugalete', u: 'http://www.portugalete.org/es-ES/VivirenPortugalete/OIAC/Paginas/default.aspx' },
    },
    {
      k: ['tasas', 'impuestos', 'pagar', 'registro', 'documentos', 'asesoramiento', 'informacion',
          'erregistroa', 'dokumentuak', 'informazioa'],
      es: { h: 'La OIAC informa, asesora y tramita las solicitudes de la ciudadanía.',
            l: ['Registro de documentos.',
                'Pago de tasas e impuestos.'],
            f: 'Si su gestión es una de estas, no hace falta cita: se atiende en ventanilla.' },
      eu: { h: 'OIACek herritarren eskaerak informatu, aholkatu eta izapidetzen ditu.',
            l: ['Dokumentuen erregistroa.',
                'Tasa eta zergen ordainketa.'],
            f: 'Zure kudeaketa horietako bat bada, ez duzu hitzordurik behar: leihatilan artatzen dute.' },
      s: { t: 'Atención a la Ciudadanía — Ayuntamiento de Portugalete', u: 'https://www.portugalete.org/es-ES/Paginas/atencion-ciudadana.aspx' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué horario tiene la OIAC?' },
    { lang: 'ES', t: '¿Cuánto cuesta exactamente el IBI?' },
    { lang: 'EU', t: 'Non dago OIAC bulegoa?' },
    { lang: 'EU', t: 'Nola eskatzen da errolda-ziurtagiria?' },
  ],
},

// ===========================================================================
{
  slug: 'nijar',
  nombre: 'Níjar',
  articulo: 'de Níjar',
  dominios: 'nijar.es',
  fecha: '7 de septiembre de 2026',
  oficina: { sigla: 'el Ayuntamiento', tel: '950 360 012', email: 'info@nijar.es' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'oficinas', 'ayuntamiento', 'direccion', 'horario', 'hasta que hora', 'a que hora abren', 'abren', 'cierran', 'telefono', 'contacto', 'glorieta', 'sabado', 'domingo'],
      es: { h: 'El Ayuntamiento está en la <b>plaza/glorieta, 1</b> — 04100 Níjar (Almería).',
            l: ['Teléfono: 950 360 012.',
                'Horario: de lunes a viernes de 9:00 a 13:30.',
                'Cerrado sábados y domingos.',
                'Correo: info@nijar.es.'],
            f: 'La franja es estrecha: cuatro horas y media, solo por la mañana.' },
      s: { t: 'Oficinas Municipales — nijar.es', u: 'https://nijar.es/ayuntamiento/organizacion-municipal/oficinas-municipales/' },
    },
    {
      k: ['san isidro', 'otra oficina', 'segunda oficina', 'servicios sociales', 'los montes'],
      es: { h: 'Hay una segunda oficina en <b>San Isidro de Níjar</b>, la de Servicios Sociales.',
            l: ['Calle Los Montes, 28 — 04117 San Isidro de Níjar (Almería).',
                'Teléfono: 950 367 832.',
                'Horario: de 9:00 a 13:30.'],
            f: 'Mismo horario que la oficina principal.' },
      s: { t: 'Oficinas Municipales — nijar.es', u: 'https://nijar.es/ayuntamiento/organizacion-municipal/oficinas-municipales/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'cambio de domicilio'],
      es: { h: 'Los trámites del <b>padrón</b> se atienden en las oficinas municipales de la plaza/glorieta, 1.',
            l: ['De lunes a viernes de 9:00 a 13:30.',
                'Hay también una oficina virtual en nijar.es.'],
            f: 'La documentación concreta depende de su caso. Confírmela en el 950 360 012 antes de ir: el horario es corto y no conviene ir dos veces.' },
      s: { t: 'Contacto — Ayuntamiento de Níjar', u: 'https://nijar.es/contacto/' },
    },
    {
      k: ['oficina virtual', 'sede electronica', 'tramite', 'tramites', 'online', 'internet', 'por internet', 'portal tributario'],
      es: { h: 'El Ayuntamiento tiene <b>oficina virtual</b> y un portal tributario aparte.',
            l: ['Oficina virtual: nijar.es/oficina-virtual.',
                'Portal tributario: portalciudadano.nijar.es.'],
            f: 'Son dos sitios distintos según lo que necesite.' },
      s: { t: 'Oficina Virtual — Ayuntamiento de Níjar', u: 'https://nijar.es/oficina-virtual/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Hasta qué hora abren?' },
    { lang: 'ES', t: '¿Cuánto cuesta exactamente el IBI?' },
    { lang: 'ES', t: '¿Hay oficina en San Isidro?' },
    { lang: 'ES', t: '¿Puedo hacer trámites por internet?' },
  ],
},

// ===========================================================================
{
  slug: 'puente-genil',
  nombre: 'Puente Genil',
  articulo: 'de Puente Genil',
  dominios: 'puentegenil.es y sede.puentegenil.es',
  fecha: '7 de septiembre de 2026',
  oficina: { sigla: 'el Ayuntamiento', tel: '957 605 034', email: 'ayuntamiento@puentegenil.com' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'ayuntamiento', 'direccion', 'telefono', 'contacto', 'don gonzalo', 'donde esta el ayuntamiento'],
      es: { h: 'El Ayuntamiento está en la <b>calle Don Gonzalo, 2</b> — 14500 Puente Genil (Córdoba).',
            l: ['Teléfono: 957 605 034.'],
            f: 'El directorio completo de teléfonos por departamento está en puentegenil.es.' },
      s: { t: 'Directorio y teléfonos — puentegenil.es', u: 'https://puentegenil.es/directorio-y-telefonos/' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'reservar', 'como pido cita', 'presencial'],
      es: { h: 'La <b>cita previa</b> tiene su propio portal: citaprevia.puentegenil.es.',
            l: ['También se puede pedir por teléfono, en el 957 605 034.',
                'Para servicios sociales, la cita se pide en el propio centro o por teléfono en horario de atención al público.'],
            f: 'Con cita se evita la espera.' },
      s: { t: 'Cita Previa del Ayuntamiento de Puente Genil', u: 'https://citaprevia.puentegenil.es/' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'cambio de domicilio', 'informacion al ciudadano'],
      es: { h: 'Los trámites municipales, el <b>padrón</b> incluido, se gestionan en el Ayuntamiento o por la sede electrónica.',
            l: ['Calle Don Gonzalo, 2, con cita previa.',
                'O en sede.puentegenil.es, sin desplazarse.'],
            f: 'La documentación concreta depende de su caso. Confírmela en el 957 605 034 antes de pedir la cita.' },
      s: { t: 'Información al Ciudadano — puentegenil.es', u: 'https://puentegenil.es/informacion_municipal/informacion_municipal-informacion_al_ciudadano/' },
    },
    {
      k: ['sede electronica', 'tramite', 'tramites', 'online', 'internet', 'por internet'],
      es: { h: 'La <b>sede electrónica</b> está en sede.puentegenil.es.',
            l: ['Permite presentar solicitudes sin ir al Ayuntamiento.'],
            f: 'Dudas: 957 605 034.' },
      s: { t: 'Sede electrónica — Ayuntamiento de Puente Genil', u: 'https://sede.puentegenil.es/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Dónde está el ayuntamiento?' },
    { lang: 'ES', t: '¿Cuánto cuesta exactamente el IBI?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Puedo hacer trámites por internet?' },
  ],
},

];
