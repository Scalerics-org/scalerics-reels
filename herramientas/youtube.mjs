// Sube un reel como Short al canal de YouTube de Scalerics (@scalerics, cuenta scalerics@gmail.com).
//
// Credenciales en el bucket privado scalerics-reels-estado:
//   youtube-cliente.json = { client_id, client_secret }  (cliente OAuth "publicador-reels" de scalerics-videos)
//   youtube.json         = { refresh_token }              (lo escribe herramientas/youtube-autorizar.mjs)
//
// Mientras la app de Google no pase la auditoría de la API de YouTube, todo lo que se sube por API
// queda PRIVADO aunque se pida público: se pasa a público a mano desde YouTube Studio. Por eso la
// privacidad sale de YT_PRIVACIDAD (por defecto "private"); al aprobarse la auditoría, ponerla en "public".

const ESTADO = "scalerics-reels-estado";

async function json(r, que) {
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${que} → ${r.status}: ${JSON.stringify(j).slice(0, 300)}`);
  return j;
}

async function leer(conG, nombre) {
  const r = await fetch(`https://storage.googleapis.com/storage/v1/b/${ESTADO}/o/${nombre}?alt=media`, { headers: conG });
  return r.ok ? r.json() : null;
}

// Devuelve un token de acceso de YouTube, o null si todavía no se autorizó el canal
export async function accesoYouTube(conG) {
  const cliente = await leer(conG, "youtube-cliente.json");
  const estado = await leer(conG, "youtube.json");
  if (!cliente?.client_id || !estado?.refresh_token) return null;
  const j = await json(
    await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: cliente.client_id,
        client_secret: cliente.client_secret,
        refresh_token: estado.refresh_token,
        grant_type: "refresh_token",
      }),
    }),
    "token de YouTube",
  );
  return j.access_token;
}

// Título: la primera línea de la descripción (máx. 100 caracteres, sin < ni >, que YouTube rechaza)
export function tituloDe(caption) {
  const linea = (caption.split("\n").find((l) => l.trim()) || "Scalerics").replace(/[<>]/g, "").trim();
  const t = linea.length > 90 ? linea.slice(0, 89).replace(/\s+\S*$/, "") + "…" : linea;
  return `${t} #Shorts`.slice(0, 100);
}

export async function subirShort(acceso, bytes, { titulo, descripcion, privacidad = "private" }) {
  const meta = {
    snippet: {
      title: titulo,
      description: descripcion.replace(/[<>]/g, "").slice(0, 4900),
      categoryId: "28", // Ciencia y tecnología
      defaultLanguage: "es",
      defaultAudioLanguage: "es",
    },
    status: {
      privacyStatus: privacidad,
      selfDeclaredMadeForKids: false,
      containsSyntheticMedia: true, // los reels son animación y voces generadas: se declara
    },
  };
  // subida reanudable: primero los metadatos (devuelve la URL de subida), después el video
  const ini = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + acceso,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": "video/mp4",
      "X-Upload-Content-Length": String(bytes.length),
    },
    body: JSON.stringify(meta),
  });
  if (!ini.ok) throw new Error(`YouTube (inicio) → ${ini.status}: ${(await ini.text()).slice(0, 300)}`);
  const url = ini.headers.get("location");
  const v = await json(
    await fetch(url, { method: "PUT", headers: { Authorization: "Bearer " + acceso, "Content-Type": "video/mp4" }, body: bytes }),
    "YouTube (video)",
  );
  return { id: v.id, url: `https://www.youtube.com/shorts/${v.id}`, privacidad: v.status?.privacyStatus };
}
