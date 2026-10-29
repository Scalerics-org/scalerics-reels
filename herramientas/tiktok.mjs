// TikTok (Content Posting API) para el publicador. La app es "Scalerics Reels" (sandbox "Scalerics
// prueba") en developers.tiktok.com, con Login Kit (redirect https://scalerics.com/tiktok) y
// Content Posting API con Direct Post.
//
// Autorizar una sola vez: abrir URL_AUTORIZAR, entrar con la cuenta de TikTok de Scalerics, copiar el
// "code" de la dirección a la que vuelve (scalerics.com/tiktok?code=...) y correr el Action
// "Publicar reel" con ese code en el campo tiktok_code (vence en minutos). El token se guarda en
// gs://scalerics-reels-estado/tiktok.json y se renueva solo (el de refresco dura un año).
//
// Mientras TikTok no audite la app, NO deja publicar directo (salvo cuentas privadas): el video va a
// la bandeja de borradores de la app y se publica desde ahí. Auditada: TIKTOK_PRIVACIDAD=PUBLIC_TO_EVERYONE.
export const CLIENT_KEY = "sbaw5hfo5gyagmulgu";
const REDIRECT = "https://scalerics.com/tiktok";
const API = "https://open.tiktokapis.com/v2";
export const URL_AUTORIZAR =
  "https://www.tiktok.com/v2/auth/authorize/?client_key=" + CLIENT_KEY +
  "&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=" +
  encodeURIComponent(REDIRECT) + "&state=scalerics";

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function token(params) {
  const secreto = process.env.TIKTOK_CLIENT_SECRET;
  if (!secreto) throw new Error("falta TIKTOK_CLIENT_SECRET");
  const r = await fetch(API + "/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: CLIENT_KEY, client_secret: secreto, ...params }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("TikTok no dio token: " + (j.error_description || j.error || r.status));
  return { access: j.access_token, refresh: j.refresh_token, vence: Date.now() + (j.expires_in - 300) * 1000 };
}

// estado = { leer(), guardar(obj) } sobre el bucket privado
export async function accesoTikTok(estado, code) {
  let t = code ? await token({ code, grant_type: "authorization_code", redirect_uri: REDIRECT }) : await estado.leer();
  if (code) await estado.guardar(t);
  if (!t?.refresh) return null; // todavía no se autorizó: se saltea TikTok
  if (Date.now() > t.vence) {
    t = await token({ grant_type: "refresh_token", refresh_token: t.refresh });
    await estado.guardar(t);
  }
  return t.access;
}

async function api(acceso, ruta, cuerpo) {
  const r = await fetch(API + ruta, {
    method: "POST",
    headers: { Authorization: "Bearer " + acceso, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(cuerpo ?? {}),
  });
  const j = await r.json();
  if (j.error && j.error.code !== "ok") throw new Error(`TikTok ${ruta}: ${j.error.code} ${j.error.message}`);
  return j.data;
}

export async function infoCreador(acceso) {
  return api(acceso, "/post/publish/creator_info/query/");
}

// Publicación desde el panel de aprobación: una persona eligió todo a mano (privacidad sin valor por
// defecto, interacciones, divulgación comercial) y aceptó las condiciones de TikTok. Sin borrador.
export async function publicarTikTokPanel(acceso, bytes, o) {
  const creador = await infoCreador(acceso);
  if (!creador.privacy_level_options?.includes(o.privacidad)) throw new Error(`privacidad no permitida: ${o.privacidad}`);
  const ini = await api(acceso, "/post/publish/video/init/", {
    post_info: {
      title: String(o.titulo || "").slice(0, 2200),
      privacy_level: o.privacidad,
      disable_comment: !o.comentarios || !!creador.comment_disabled,
      disable_duet: !o.duo || !!creador.duet_disabled,
      disable_stitch: !o.stitch || !!creador.stitch_disabled,
      brand_organic_toggle: !!o.marcaPropia,
      brand_content_toggle: !!o.marcaAjena,
      is_aigc: true,
    },
    source_info: { source: "FILE_UPLOAD", video_size: bytes.length, chunk_size: bytes.length, total_chunk_count: 1 },
  });
  const sub = await fetch(ini.upload_url, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(bytes.length), "Content-Range": `bytes 0-${bytes.length - 1}/${bytes.length}` },
    body: bytes,
  });
  if (!sub.ok) throw new Error("TikTok no aceptó el video: " + sub.status);
  for (let i = 0; i < 60; i++) {
    await espera(10000);
    const st = await api(acceso, "/post/publish/status/fetch/", { publish_id: ini.publish_id });
    if (st.status === "PUBLISH_COMPLETE") return `${o.privacidad} (publish_id ${ini.publish_id})`;
    if (st.status === "FAILED") throw new Error("TikTok falló: " + st.fail_reason);
  }
  throw new Error("TikTok tardó más de 10 minutos");
}

// Mientras la app no está auditada: el video va a la bandeja de la app de TikTok (notificación de
// "tenés un video para editar"); lo publica una persona desde ahí, pegando la descripción.
export async function mandarAlInboxTikTok(acceso, bytes) {
  const ini = await api(acceso, "/post/publish/inbox/video/init/", {
    source_info: { source: "FILE_UPLOAD", video_size: bytes.length, chunk_size: bytes.length, total_chunk_count: 1 },
  });
  const sub = await fetch(ini.upload_url, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(bytes.length), "Content-Range": `bytes 0-${bytes.length - 1}/${bytes.length}` },
    body: bytes,
  });
  if (!sub.ok) throw new Error("TikTok no aceptó el video: " + sub.status);
  for (let i = 0; i < 60; i++) {
    await espera(10000);
    const st = await api(acceso, "/post/publish/status/fetch/", { publish_id: ini.publish_id });
    if (st.status === "SEND_TO_USER_INBOX" || st.status === "PUBLISH_COMPLETE") return `en la bandeja de TikTok (publish_id ${ini.publish_id}, ${st.status})`;
    if (st.status === "FAILED") throw new Error("TikTok falló: " + st.fail_reason);
  }
  throw new Error("TikTok tardó más de 10 minutos");
}

export async function publicarTikTok(acceso, bytes, caption, prueba) {
  const creador = await api(acceso, "/post/publish/creator_info/query/");
  console.log(`tiktok: @${creador.creator_username}`);
  if (prueba) return null;
  const quiero = process.env.TIKTOK_PRIVACIDAD || "SELF_ONLY";
  const privacidad = creador.privacy_level_options?.includes(quiero) ? quiero : "SELF_ONLY";
  const fuente = { source: "FILE_UPLOAD", video_size: bytes.length, chunk_size: bytes.length, total_chunk_count: 1 };
  let ini, borrador = false;
  try {
    ini = await api(acceso, "/post/publish/video/init/", {
      post_info: { title: caption.slice(0, 2200), privacy_level: privacidad, disable_comment: false, disable_duet: false, disable_stitch: false, is_aigc: true },
      source_info: fuente,
    });
  } catch (e) {
    // Sin auditoría, TikTok solo deja publicar directo en cuentas privadas: el video va a la
    // bandeja de borradores de la app y alguien lo publica desde ahí (con la descripción pegada).
    if (!/unaudited_client/.test(e.message)) throw e;
    console.log("tiktok: la app no está auditada, va a borradores (inbox)");
    ini = await api(acceso, "/post/publish/inbox/video/init/", { source_info: fuente });
    borrador = true;
  }
  const sub = await fetch(ini.upload_url, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(bytes.length), "Content-Range": `bytes 0-${bytes.length - 1}/${bytes.length}` },
    body: bytes,
  });
  if (!sub.ok) throw new Error("TikTok no aceptó el video: " + sub.status);
  for (let i = 0; i < 60; i++) {
    await espera(10000);
    const st = await api(acceso, "/post/publish/status/fetch/", { publish_id: ini.publish_id });
    if (st.status === "PUBLISH_COMPLETE") return `${privacidad} (publish_id ${ini.publish_id})`;
    if (borrador && st.status === "SEND_TO_USER_INBOX") return `BORRADOR en la app (publish_id ${ini.publish_id})`;
    if (st.status === "FAILED") throw new Error("TikTok falló: " + st.fail_reason);
  }
  throw new Error("TikTok tardó más de 10 minutos");
}
