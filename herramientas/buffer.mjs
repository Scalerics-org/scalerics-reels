// TikTok por Buffer (desde 17-11). TikTok rechazó la app propia el 09-11 por ser de uso interno de
// la empresa, así que el video sale por Buffer, que ya es una app aprobada por TikTok y publica
// directo en @scalerics (modo "automatic", sin pasar por borradores).
// Clave: BUFFER_API_KEY (plan Free de Buffer: 1 clave, 600 pedidos por día). El video lo baja Buffer
// de la URL pública del bucket que ya usa Instagram.
const API = "https://api.buffer.com";

async function gql(clave, query) {
  const r = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + clave },
    body: JSON.stringify({ query }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors?.length) throw new Error(`buffer ${r.status}: ${JSON.stringify(j.errors || j).slice(0, 500)}`);
  return j.data;
}

// Los textos van dentro de la consulta: JSON.stringify da un string válido de GraphQL (comillas y \n escapados)
const s = (v) => JSON.stringify(String(v));

// El canal de TikTok conectado en Buffer (si hay más de uno, el primero)
export async function canalTikTokBuffer(clave) {
  const { account } = await gql(clave, `query { account { organizations { id } } }`);
  for (const o of account.organizations || []) {
    const { channels } = await gql(clave, `query { channels(input: { organizationId: ${s(o.id)} }) { id service name isQueuePaused } }`);
    const c = (channels || []).find((x) => String(x.service).toLowerCase() === "tiktok");
    if (c) return c;
  }
  throw new Error("buffer: no hay ningún canal de TikTok conectado (Buffer > Canales > TikTok)");
}

// TikTok acepta como mucho 5 hashtags y 2.200 caracteres por publicación (límites de Buffer)
export function textoTikTok(caption) {
  let n = 0;
  const t = caption.replace(/#[\p{L}\p{N}_]+/gu, (h) => (++n <= 5 ? h : "")).replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
  return t.length > 2200 ? t.slice(0, 2199).trimEnd() + "…" : t;
}

// Publica ya (shareNow), marcado como contenido generado por IA. Devuelve { id, status }.
export async function publicarTikTokBuffer(clave, { videoUrl, caption, canal }) {
  const c = canal || (await canalTikTokBuffer(clave));
  const d = await gql(clave, `mutation {
    createPost(input: {
      text: ${s(textoTikTok(caption))}
      channelId: ${s(c.id)}
      schedulingType: automatic
      mode: shareNow
      aiAssisted: true
      metadata: { tiktok: { isAiGenerated: true } }
      assets: [{ video: { url: ${s(videoUrl)} } }]
    }) {
      ... on PostActionSuccess { post { id status } }
      ... on MutationError { message }
    }
  }`);
  const r = d.createPost || {};
  if (!r.post) throw new Error("buffer: " + (r.message || JSON.stringify(r)));
  return { ...r.post, canal: c.name };
}

// En qué quedó una publicación (sent, error, ...): para la prueba y para revisar a mano
export async function estadoPostBuffer(clave, id) {
  const { post } = await gql(clave, `query { post(input: { id: ${s(id)} }) { id status sentAt externalLink error { message } } }`);
  return post;
}
