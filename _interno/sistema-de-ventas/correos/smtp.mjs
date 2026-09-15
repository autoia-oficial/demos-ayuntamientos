// ---------------------------------------------------------------------------
//  CLIENTE SMTP MÍNIMO — sin dependencias
//
//  Sólo hace lo que hace falta para mandar un correo autenticado: EHLO,
//  STARTTLS si el puerto lo pide, AUTH LOGIN, MAIL FROM, RCPT TO, DATA.
//
//  Se escribe a mano en vez de usar nodemailer para no meter node_modules en
//  un repositorio que GitHub Pages sirve tal cual.
// ---------------------------------------------------------------------------
import net from 'node:net';
import tls from 'node:tls';

// Lee respuestas SMTP, que pueden venir en varias líneas (250-XXX … 250 XXX).
function conversacion(socket) {
  let buffer = '';
  const esperando = [];
  socket.on('data', trozo => {
    buffer += trozo.toString('utf8');
    let corte;
    while ((corte = buffer.indexOf('\r\n')) !== -1) {
      const linea = buffer.slice(0, corte);
      buffer = buffer.slice(corte + 2);
      // Una línea con guión tras el código significa "sigo hablando".
      if (/^\d{3}-/.test(linea)) continue;
      const pendiente = esperando.shift();
      if (pendiente) pendiente(linea);
    }
  });
  return {
    enviar(orden) {
      return new Promise((resolver, rechazar) => {
        esperando.push(linea => {
          const codigo = parseInt(linea.slice(0, 3), 10);
          if (codigo >= 400) rechazar(new Error(`SMTP ${linea}`));
          else resolver(linea);
        });
        if (orden !== null) socket.write(orden + '\r\n');
      });
    },
  };
}

function base64(s) { return Buffer.from(s, 'utf8').toString('base64'); }

// Asunto con acentos: RFC 2047. Si va en crudo, llega como "=?" roto.
function asuntoCodificado(texto) {
  return /^[\x20-\x7E]*$/.test(texto)
    ? texto
    : `=?UTF-8?B?${base64(texto)}?=`;
}

/**
 * @param {object} cfg  {host, puerto, usuario, clave, remitente, nombre}
 * @param {object} msg  {para, asunto, cuerpo, responderA}
 */
export async function enviarCorreo(cfg, msg) {
  const implicito = cfg.puerto === 465;
  const socket = implicito
    ? tls.connect({ host: cfg.host, port: cfg.puerto, servername: cfg.host })
    : net.connect({ host: cfg.host, port: cfg.puerto });

  await new Promise((ok, mal) => {
    socket.once(implicito ? 'secureConnect' : 'connect', ok);
    socket.once('error', mal);
    socket.setTimeout(30000, () => mal(new Error('tiempo de espera agotado')));
  });

  let charla = conversacion(socket);
  let s = socket;

  await charla.enviar(null);                       // saludo del servidor
  await charla.enviar(`EHLO ${cfg.host}`);

  if (!implicito) {
    await charla.enviar('STARTTLS');
    s = tls.connect({ socket, servername: cfg.host });
    await new Promise((ok, mal) => {
      s.once('secureConnect', ok);
      s.once('error', mal);
    });
    charla = conversacion(s);
    await charla.enviar(`EHLO ${cfg.host}`);
  }

  await charla.enviar('AUTH LOGIN');
  await charla.enviar(base64(cfg.usuario));
  await charla.enviar(base64(cfg.clave));

  await charla.enviar(`MAIL FROM:<${cfg.remitente}>`);
  await charla.enviar(`RCPT TO:<${msg.para}>`);
  await charla.enviar('DATA');

  const cabeceras = [
    `From: ${cfg.nombre} <${cfg.remitente}>`,
    `To: <${msg.para}>`,
    msg.responderA ? `Reply-To: <${msg.responderA}>` : null,
    `Subject: ${asuntoCodificado(msg.asunto)}`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
  ].filter(Boolean).join('\r\n');

  // El cuerpo va en base64: así los acentos no dependen de la codificación
  // que decida el servidor, y no hay que preocuparse del punto solitario.
  const cuerpo = base64(msg.cuerpo).replace(/(.{76})/g, '$1\r\n');

  s.write(cabeceras + '\r\n\r\n' + cuerpo + '\r\n.\r\n');
  await charla.enviar(null);

  await charla.enviar('QUIT').catch(() => {});      // algunos cierran sin responder
  s.end();
  socket.destroy();
}

/**
 * Saluda al servidor y autentica, sin enviar nada. Para comprobar la
 * configuración antes de escribirle a un ayuntamiento de verdad.
 */
export async function comprobarConexion(cfg) {
  const implicito = cfg.puerto === 465;
  const socket = implicito
    ? tls.connect({ host: cfg.host, port: cfg.puerto, servername: cfg.host })
    : net.connect({ host: cfg.host, port: cfg.puerto });

  await new Promise((ok, mal) => {
    socket.once(implicito ? 'secureConnect' : 'connect', ok);
    socket.once('error', mal);
    socket.setTimeout(20000, () => mal(new Error('el servidor no responde (20 s)')));
  });

  let charla = conversacion(socket);
  let s = socket;
  try {
    await charla.enviar(null);
    await charla.enviar(`EHLO ${cfg.host}`);
    if (!implicito) {
      await charla.enviar('STARTTLS');
      s = tls.connect({ socket, servername: cfg.host });
      await new Promise((ok, mal) => { s.once('secureConnect', ok); s.once('error', mal); });
      charla = conversacion(s);
      await charla.enviar(`EHLO ${cfg.host}`);
    }
    await charla.enviar('AUTH LOGIN');
    await charla.enviar(base64(cfg.usuario));
    await charla.enviar(base64(cfg.clave));
    await charla.enviar('QUIT').catch(() => {});
  } finally {
    s.end(); socket.destroy();
  }
}
