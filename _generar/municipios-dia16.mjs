// ---------------------------------------------------------------------------
//  LOS CUATRO GRANDES QUE FALTABAN DEL ENVIO 10 — martes 22 de septiembre.
//  Comprobado en cada web municipal el 10 de septiembre de 2026.
//
//  LOS CUATRO VAN SIN CORREO, Y ES A PROPOSITO. Gijon, L'Hospitalet, A Coruña
//  y Mostoles no publican ninguna direccion de contacto: todo va por el 010 y
//  por formulario web. Es justo lo que decia la ficha del envio 10 con el
//  "buscar" al lado de los cuatro. Antes que inventarse un correo, la demo se
//  queda en el telefono: generar.mjs ya se traga el email vacio y cae la frase
//  del correo en las cuatro negativas.
//
//  Y OJO CON A CORUÑA: publica las siete oficinas de registro con direccion y
//  telefono, pero NO publica el horario de ninguna. La ficha lo dice tal cual
//  y manda al 010. Es preferible a poner un horario a ojo, y ademas es
//  exactamente lo que se les esta vendiendo.
//
//  Idiomas: catalan en L'Hospitalet, gallego en A Coruña. Gijon y Mostoles,
//  solo castellano.
// ---------------------------------------------------------------------------

export const MUNICIPIOS_DIA16 = [

// ===========================================================================
{
  slug: 'gijon',
  nombre: 'Gijón',
  articulo: 'de Gijón',
  dominios: 'gijon.es y sedeelectronica.gijon.es',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'la atención telefónica municipal', tel: '985 18 11 05', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['oficina', 'oficinas', 'atencion ciudadana', 'atencion a la ciudadania', 'donde', 'direccion', 'cual me toca', 'mas cerca', 'cercana',
          'pescaderia', 'casa rosada', 'ateneo', 'calzada', 'el coto', 'el llano', 'gijon sur', 'arena', 'larena'],
      es: { h: 'Gijón tiene <b>siete Oficinas de Atención a la Ciudadanía</b>, y en todas se hace lo mismo: no hay una que le corresponda por barrio.',
            l: ['Antigua Pescadería, calle Cabrales, 2 · Antiguo Hogar (Casa Rosada), paseo de la Infancia, 2.',
                'Ateneo La Calzada, calle Ateneo Obrero de la Calzada, 1 · El Coto, plaza de la República s/n.',
                'El Llano, calle Río de Oro, 37 · Gijón Sur, calle Ramón Areces, 7 · L’Arena, calle Canga Argüelles, 16-18.'],
            f: 'Todas atienden en el mismo teléfono: 985 18 11 05.' },
      s: { t: 'Red de oficinas de atención a la ciudadanía — sedeelectronica.gijon.es', u: 'https://sedeelectronica.gijon.es/red-de-oficinas-de-atencion-a-la-ciudadania' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'verano', 'agosto', 'julio', 'sabado', 'sabados', 'tarde', 'por la tarde', 'que dias'],
      es: { h: 'Las oficinas abren <b>de lunes a viernes de 8:30 a 17:00</b>.',
            l: ['Del <b>15 de junio al 15 de septiembre</b> el horario es de 8:30 a 14:00, de lunes a viernes.',
                'Tres de ellas abren también los sábados de 9:00 a 13:00: Antigua Pescadería, Ateneo La Calzada y Gijón Sur.'],
            f: 'La atención telefónica en el 985 18 11 05 es de lunes a viernes de 8:30 a 18:00, salvo festivos.' },
      s: { t: 'Red de oficinas de atención a la ciudadanía — sedeelectronica.gijon.es', u: 'https://sedeelectronica.gijon.es/red-de-oficinas-de-atencion-a-la-ciudadania' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'alta padron', 'cambio de domicilio', 'mudarme', 'nuevo vecino', 'documentacion', 'papeles', 'que necesito'],
      es: { h: 'El <b>alta en el padrón</b> y el cambio de domicilio se presentan en cualquiera de las siete oficinas, o por el registro electrónico.',
            l: ['Hace falta documento de identidad en vigor. El DNI es obligatorio a partir de los 14 años.',
                'Y un documento que acredite la vivienda: escritura, contrato de alquiler o el último recibo del IBI, entre otros.',
                'Si en el domicilio ya hay alguien empadronado, esa persona tiene que firmar la autorización.'],
            f: 'La documentación cambia según el caso. Confírmela en el 985 18 11 05 antes de desplazarse.' },
      s: { t: '¿Qué documentación necesita aportar? — sedeelectronica.gijon.es', u: 'https://sedeelectronica.gijon.es/page/11396-que-documentacion-necesita-aportar' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'reservar', 'hace falta cita', 'necesito cita', 'turno'],
      es: { h: 'La <b>cita previa</b> se pide por internet o llamando al 985 18 11 05.',
            l: ['El Ayuntamiento la recomienda, y avisa de que la última atención es 15 minutos antes de la hora de cierre.'],
            f: 'Por ese mismo teléfono se puede pedir la cita o preguntar cómo se solicita.' },
      s: { t: 'Atención telefónica — sedeelectronica.gijon.es', u: 'https://sedeelectronica.gijon.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=SEDE_ATENCION_TELEFONICA' },
    },
    {
      k: ['telefono', 'llamar', 'atencion telefonica', 'por telefono', 'contacto', '010', 'queja', 'quejas', 'sugerencia', 'sugerencias', 'reclamacion', 'empleo publico', 'oposiciones'],
      es: { h: 'El teléfono de atención ciudadana es el <b>985 18 11 05</b>, de lunes a viernes de 8:30 a 18:00 salvo festivos.',
            l: ['Da información general de servicios, organización municipal y trámites.',
                'También sobre convocatorias de empleo público, y orienta para presentar quejas, sugerencias y agradecimientos.'],
            f: 'Desde ahí le orientan además para hacer los trámites por los servicios electrónicos.' },
      s: { t: 'Atención telefónica — sedeelectronica.gijon.es', u: 'https://sedeelectronica.gijon.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&PAGE_CODE=SEDE_ATENCION_TELEFONICA' },
    },
    {
      k: ['certificado', 'volante', 'certificado de empadronamiento', 'volante de empadronamiento', 'acreditar residencia', 'justificante', 'como consigo', 'descargar'],
      es: { h: 'El <b>certificado de empadronamiento</b> se puede pedir en la sede electrónica o en cualquiera de las siete oficinas.',
            l: ['Para hacerlo por internet hay que darse de alta como usuario de la Oficina Virtual.'],
            f: 'Si no tiene certificado digital, en las oficinas se lo tramitan presencialmente.' },
      s: { t: 'Certificado de empadronamiento — gijon.es', u: 'https://www.gijon.es/es/tramites/certificado-de-empadronamiento' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Gijón?' },
    { lang: 'ES', t: '¿Puedo pedir el volante por internet?' },
    { lang: 'ES', t: '¿Qué oficina me toca?' },
    { lang: 'ES', t: '¿Qué horario tienen en verano?' },
    { lang: 'ES', t: '¿Hace falta cita previa?' },
  ],
},

// ===========================================================================
{
  slug: 'l-hospitalet-de-llobregat',
  nombre: "L'Hospitalet de Llobregat",
  articulo: "de L'Hospitalet de Llobregat",
  dominios: 'l-h.cat y seuelectronica.l-h.cat',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'la OAC', tel: '010 · 900 10 02 77', email: '' },
  idioma2: { cod: 'CA', clave: 'ca', sigla: "a l'OAC", nombre: 'catalán' },
  kb: [
    {
      k: ['oac', 'oficina', 'oficinas', 'atencion ciudadana', 'donde', 'direccion', 'girona', 'emigrant', 'primavera', 'cual me toca',
          'atencio ciutadana', 'on es', 'adreca', 'oficines'],
      es: { h: "L'Hospitalet tiene varias <b>Oficinas de Atención Ciudadana (OAC)</b>.",
            l: ['OAC calle Girona, 10, bajos, 08901.',
                'OAC calle Emigrant, 27, 08906.',
                'OAC avenida Primavera, 71, 2.ª planta, 08905.'],
            f: 'En todas se atiende con y sin cita, según disponibilidad.' },
      ca: { h: "L'Hospitalet té diverses <b>Oficines d'Atenció Ciutadana (OAC)</b>.",
            l: ['OAC carrer Girona, 10, baixos, 08901.',
                'OAC carrer Emigrant, 27, 08906.',
                'OAC avinguda Primavera, 71, 2a planta, 08905.'],
            f: 'A totes s’atén amb cita i sense, segons disponibilitat.' },
      s: { t: "Oficina d'Atenció Ciutadana — seuelectronica.l-h.cat", u: 'https://seuelectronica.l-h.cat/detallEquipament.aspx?16PjdknXKhDGCw9qiw50Kvumqy08xPSAKBVczpFC9G7cqazB' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'navidad', 'semana santa', 'que dias',
          'horari', 'fins a quina hora', 'obren', 'tanquen', 'estiu', 'nadal'],
      es: { h: 'Las OAC abren <b>de lunes a viernes de 8:30 a 14:00</b>, y además <b>de lunes a jueves de 16:00 a 19:00</b>.',
            l: ['En verano, Semana Santa y Navidad el horario cambia, y el Ayuntamiento lo publica aparte.'],
            f: 'Para confirmar el horario de esos periodos, llame al 010 (gratuito) o al 900 10 02 77.' },
      ca: { h: "Les OAC obren <b>de dilluns a divendres de 8:30 a 14 h</b>, i també <b>de dilluns a dijous de 16 a 19 h</b>.",
            l: ["A l'estiu, Setmana Santa i Nadal l'horari canvia, i l'Ajuntament el publica a part."],
            f: 'Per confirmar l’horari d’aquests períodes, truqueu al 010 (gratuït) o al 900 10 02 77.' },
      s: { t: "Oficina d'Atenció Ciutadana — seuelectronica.l-h.cat", u: 'https://seuelectronica.l-h.cat/detallEquipament.aspx?16PjdknXKhDGCw9qiw50Kvumqy08xPSAKBVczpFC9G7cqazB' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'sin cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno',
          'cita previa', 'demanar cita', 'cal cita', 'sense cita', 'hora'],
      es: { h: 'La <b>cita previa</b> de las OAC se pide por internet, en l-h.cat/citaoac.',
            l: ['Las oficinas atienden con cita y sin cita, según la disponibilidad de cada momento.'],
            f: 'Si prefiere el teléfono: 010 desde L’Hospitalet, o 900 10 02 77 desde fuera.' },
      ca: { h: "La <b>cita prèvia</b> de les OAC es demana per internet, a l-h.cat/citaoac.",
            l: ['Les oficines atenen amb cita i sense, segons la disponibilitat de cada moment.'],
            f: 'Si preferiu el telèfon: 010 des de L’Hospitalet, o 900 10 02 77 des de fora.' },
      s: { t: "Cita prèvia a les Oficines d'Atenció Ciutadana — l-h.cat", u: 'https://www.l-h.cat/citaoac' },
    },
    {
      k: ['telefono', 'llamar', 'por telefono', 'contacto', '010', 'atencion telefonica', 'desde fuera', 'gratuito',
          'telefon', 'trucar', 'per telefon', 'contacte', 'gratuit'],
      es: { h: 'El teléfono de información municipal es el <b>010</b>, gratuito desde L’Hospitalet.',
            l: ['Desde fuera del municipio, el 900 10 02 77.',
                'Atienden de lunes a viernes de 8:00 a 20:00.'],
            f: 'Las quejas y sugerencias se presentan por el formulario de l-h.cat/contacteu.' },
      ca: { h: "El telèfon d’informació municipal és el <b>010</b>, gratuït des de L’Hospitalet.",
            l: ['Des de fora del municipi, el 900 10 02 77.',
                'Atenen de dilluns a divendres de 8 a 20 h.'],
            f: 'Les queixes i els suggeriments es presenten pel formulari de l-h.cat/contacteu.' },
      s: { t: "Oficina d'Atenció Ciutadana — seuelectronica.l-h.cat", u: 'https://seuelectronica.l-h.cat/detallEquipament.aspx?16PjdknXKhDGCw9qiw50Kvumqy08xPSAKBVczpFC9G7cqazB' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'volante', 'certificado', 'residencia', 'cambio de domicilio', 'nuevo vecino',
          'padro', 'empadronar-me', 'empadronament', 'volant', 'certificat', 'residencia', 'canvi de domicili'],
      es: { h: 'Los trámites de <b>padrón</b> y el <b>volante de residencia</b> se hacen en las OAC y en la sede electrónica.',
            l: ['La sede electrónica está en seuelectronica.l-h.cat.'],
            f: 'La ficha del trámite no estaba accesible el día de la consulta: confirme la documentación en el 010 antes de ir.' },
      ca: { h: "Els tràmits de <b>padró</b> i el <b>volant de residència</b> es fan a les OAC i a la seu electrònica.",
            l: ['La seu electrònica és a seuelectronica.l-h.cat.'],
            f: 'La fitxa del tràmit no era accessible el dia de la consulta: confirmeu la documentació al 010 abans d’anar-hi.' },
      s: { t: 'Seu electrònica — Ajuntament de L’Hospitalet', u: 'https://seuelectronica.l-h.cat/' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en L\'Hospitalet?' },
    { lang: 'ES', t: '¿Necesito certificado digital?' },
    { lang: 'CA', t: 'Quin horari tenen les OAC?' },
    { lang: 'ES', t: '¿Puedo ir sin cita?' },
    { lang: 'ES', t: '¿Dónde están las OAC?' },
  ],
},

// ===========================================================================
{
  slug: 'a-coruna',
  nombre: 'A Coruña',
  articulo: 'de A Coruña',
  dominios: 'coruna.gal y sede.coruna.gal',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'el Registro', tel: '981 18 42 00 · 010', email: '' },
  idioma2: { cod: 'GL', clave: 'gl', sigla: 'no Rexistro', nombre: 'gallego' },
  kb: [
    {
      k: ['oficina', 'oficinas', 'registro', 'rexistro', 'donde', 'direccion', 'maria pita', 'franja', 'franxa', 'forum', 'agora', 'mesoiro', 'cual me toca', 'atencion ciudadana',
          'onde', 'enderezo', 'oficinas de rexistro'],
      es: { h: 'A Coruña tiene varias <b>oficinas de registro</b>. La principal está en el Palacio Municipal de María Pita.',
            l: ['Palacio Municipal, plaza de María Pita, 1, 15001 · teléfono 981 18 42 00.',
                'A Franxa, calle Franja, 20 · Fórum Metropolitano, calle Río Monelos, 1, 15006, teléfono 981 18 42 93.',
                'Centro Sociocultural Ágora, lugar Gramela, 17, 15011 · Novo Mesoiro, calle Os Ancares, 15, 15190.'],
            f: 'Hay además dos registros especializados: Urbanismo, en calle Parque, y Vivienda, en calle Veeduría, 2.' },
      gl: { h: 'A Coruña ten varias <b>oficinas de rexistro</b>. A principal está no Palacio Municipal de María Pita.',
            l: ['Palacio Municipal, praza de María Pita, 1, 15001 · teléfono 981 18 42 00.',
                'A Franxa, rúa Franxa, 20 · Fórum Metropolitano, rúa Río Monelos, 1, 15006, teléfono 981 18 42 93.',
                'Centro Sociocultural Ágora, lugar Gramela, 17, 15011 · Novo Mesoiro, rúa Os Ancares, 15, 15190.'],
            f: 'Hai ademais dous rexistros especializados: Urbanismo, na rúa Parque, e Vivenda, na rúa Veeduría, 2.' },
      s: { t: 'Oficinas de registro — sede.coruna.gal', u: 'https://sede.coruna.gal/sede/es/ayuda/soporte/oficinas-de-registro?argIdioma=es' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'verano', 'tarde', 'sabado', 'que dias',
          'horario', 'ata que hora', 'abren', 'pechan', 'veran', 'que dias'],
      es: { h: 'El Ayuntamiento <b>no publica en su web el horario</b> de las oficinas de registro, y no se lo voy a estimar.',
            l: ['La página de oficinas da la dirección y el teléfono de cada una, pero no las horas de atención.'],
            f: 'Confírmelo en el 010 o en el 981 18 42 00 antes de desplazarse.' },
      gl: { h: 'O Concello <b>non publica na súa web o horario</b> das oficinas de rexistro, e non llo vou estimar.',
            l: ['A páxina de oficinas dá o enderezo e o teléfono de cada unha, pero non as horas de atención.'],
            f: 'Confírmeo no 010 ou no 981 18 42 00 antes de desprazarse.' },
      s: { t: 'Oficinas de registro — sede.coruna.gal', u: 'https://sede.coruna.gal/sede/es/ayuda/soporte/oficinas-de-registro?argIdioma=es' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'acreditar residencia', 'cambio de domicilio', 'modificar datos',
          'padron', 'empadroar', 'empadroarme', 'empadroamento', 'certificado', 'volante', 'cambio de domicilio'],
      es: { h: 'Los trámites de <b>padrón</b> se pueden hacer por la sede electrónica, en sede.coruna.gal.',
            l: ['El certificado de empadronamiento se puede pedir <b>aunque no se tenga certificado digital</b>.',
                'En ese caso el certificado se envía por correo postal al domicilio en el que consta empadronado.'],
            f: 'Para algunos trámites hay que pedir cita previa y presentarse con la documentación.' },
      gl: { h: 'Os trámites de <b>padrón</b> pódense facer pola sede electrónica, en sede.coruna.gal.',
            l: ['O certificado de empadroamento pódese pedir <b>aínda que non se teña certificado dixital</b>.',
                'Nese caso o certificado envíase por correo postal ao domicilio no que consta empadroado.'],
            f: 'Para algúns trámites hai que pedir cita previa e presentarse coa documentación.' },
      s: { t: 'Padrón de habitantes — sede.coruna.gal', u: 'https://sede.coruna.gal/sede/es/tramites-y-servicios-electronicos/padron-de-habitantes?argIdioma=es' },
    },
    {
      k: ['sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites', 'certificado digital', 'dni electronico', 'clave', 'identificarse', 'firma',
          'sede electronica', 'tramite', 'tramites', 'por internet', 'certificado dixital', 'sinatura'],
      es: { h: 'La <b>sede electrónica</b> está en sede.coruna.gal.',
            l: ['Admite identificarse con <b>Clave</b>, la plataforma del Estado, y también con certificado electrónico o DNI electrónico.'],
            f: 'Desde ahí se consultan los datos del padrón y se descargan certificados.' },
      gl: { h: 'A <b>sede electrónica</b> está en sede.coruna.gal.',
            l: ['Admite identificarse con <b>Clave</b>, a plataforma do Estado, e tamén con certificado electrónico ou DNI electrónico.'],
            f: 'Desde alí consúltanse os datos do padrón e descárganse certificados.' },
      s: { t: 'Sistemas de identificación e sinatura — sede.coruna.gal', u: 'https://sede.coruna.gal/sede/gl/conece-a-sede/sistemas-de-identificacion-e-sinatura?method=enter' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en A Coruña?' },
    { lang: 'GL', t: 'Onde está o Rexistro Xeral?' },
    { lang: 'ES', t: '¿Qué horario tienen las oficinas?' },
    { lang: 'ES', t: '¿Puedo hacer los trámites por internet?' },
  ],
},

// ===========================================================================
{
  slug: 'mostoles',
  nombre: 'Móstoles',
  articulo: 'de Móstoles',
  dominios: 'mostoles.es y su sede electrónica',
  fecha: '10 de septiembre de 2026',
  oficina: { sigla: 'Atención Ciudadana', tel: '010 · 91 647 17 10', email: '' },
  idioma2: null,
  kb: [
    {
      k: ['registro', 'registro general', 'oficina', 'oficinas', 'donde', 'direccion', 'ayuntamiento', 'casa consistorial', 'plaza de espana', 'atencion ciudadana', 'presentar documentos', 'instancia'],
      es: { h: 'El <b>Registro General</b> está en la Casa Consistorial, plaza de España, 1, 28934 Móstoles.',
            l: ['Es donde se presentan escritos e instancias dirigidos al Ayuntamiento.',
                'Hay además un registro auxiliar en la Oficina de Atención al Contribuyente.'],
            f: 'Por las obras de esa oficina, la atención se trasladó a la avenida de Portugal, 65.' },
      s: { t: 'Registro General — mostoles.es', u: 'https://www.mostoles.es/es/areas/participacion-ciudadana/atencion-ciudadana/oficinas-registro/registro-general-cod-o00000681' },
    },
    {
      k: ['horario', 'hasta que hora', 'a que hora abren', 'a que hora cierran', 'abren', 'cierran', 'tarde', 'por la tarde', 'verano', 'agosto', 'julio', 'que dias'],
      es: { h: 'El Registro General atiende <b>de 9:00 a 14:00 y de 17:00 a 20:00</b>.',
            l: ['Del <b>16 de junio al 31 de agosto</b>, solo de 9:00 a 14:00.'],
            f: 'El Ayuntamiento abre todos los días hábiles salvo el 24 y el 31 de diciembre.' },
      s: { t: 'Registro General — mostoles.es', u: 'https://www.mostoles.es/es/areas/participacion-ciudadana/atencion-ciudadana/oficinas-registro/registro-general-cod-o00000681' },
    },
    {
      k: ['telefono', 'llamar', 'por telefono', 'contacto', '010', 'atencion telefonica', 'desde fuera', 'informacion', 'que hacen', 'para que sirve', 'empleo publico', 'becas'],
      es: { h: 'El teléfono de información ciudadana es el <b>010</b> desde Móstoles, y el <b>91 647 17 10</b> desde fuera.',
            l: ['Atienden de 8:00 a 14:30.',
                'Informan de la organización municipal, de los procedimientos administrativos y del empleo público.',
                'También de becas, subvenciones y obras que gestionan otras administraciones.'],
            f: 'La centralita del Ayuntamiento es el 91 664 75 00.' },
      s: { t: '010 Información al Ciudadano — mostoles.es', u: 'https://www.mostoles.es/SEDE_ELECTRONICA/es/010-informacion-ciudadano' },
    },
    {
      k: ['cita', 'cita previa', 'pedir cita', 'hace falta cita', 'necesito cita', 'reservar', 'turno', 'sede electronica', 'internet', 'por internet', 'online', 'tramite', 'tramites'],
      es: { h: 'La <b>cita previa</b> se pide en la sede electrónica del Ayuntamiento.',
            l: ['Desde ahí se reserva la cita para las distintas gestiones municipales.'],
            f: 'Si prefiere el teléfono, en el 010 le informan de cómo solicitarla.' },
      s: { t: 'Cita previa — sede electrónica de Móstoles', u: 'https://www.mostoles.es/SEDE_ELECTRONICA/es/tramites-gestiones/listado-tramites-disponibles/cita-previa' },
    },
    {
      k: ['padron', 'empadronar', 'empadronarme', 'empadrono', 'me mudo', 'me empadrono', 'empadronamiento', 'certificado', 'volante', 'cambio de domicilio', 'nuevo vecino', 'documentacion', 'que necesito'],
      es: { h: 'Los trámites de <b>padrón</b> se presentan por el Registro General o por la sede electrónica.',
            l: ['El Registro está en la plaza de España, 1.'],
            f: 'El Ayuntamiento no publica en su web la documentación concreta de cada caso. Confírmela en el 010 antes de desplazarse.' },
      s: { t: 'Oficinas de Registro — mostoles.es', u: 'https://www.mostoles.es/es/areas/participacion-ciudadana/atencion-ciudadana/oficinas-registro' },
    },
  ],
  sugerencias: [
    { lang: 'ES', t: '¿Qué necesito para empadronarme en Móstoles?' },
    { lang: 'ES', t: '¿Dónde está el Registro General?' },
    { lang: 'ES', t: '¿Qué horario tienen en verano?' },
    { lang: 'ES', t: '¿Cómo pido cita previa?' },
    { lang: 'ES', t: '¿Cuál es el teléfono?' },
  ],
},

];
