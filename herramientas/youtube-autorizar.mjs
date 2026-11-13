// Autoriza una sola vez al publicador a subir al canal de YouTube de Scalerics y guarda el
// refresh_token en gs://scalerics-reels-estado/youtube.json. Se corre en la compu de Juan:
//   node herramientas/youtube-autorizar.mjs
// Abre el navegador: entrar con scalerics@gmail.com (la dueña del canal @scalerics) y permitir.
// Mientras la app no esté verificada, Google muestra "Google no verificó esta app": Avanzado →
// "Ir a Scalerics Reels".
import http from "node:http";
import { execSync } from "node:child_process";

const ESTADO = "scalerics-reels-estado";
const SCOPES = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"];
const g = execSync("gcloud auth print-access-token", { encoding: "utf8", shell: true }).trim();
const conG = { Authorization: "Bearer " + g };

const cliente = await (await fetch(`https://storage.googleapis.com/storage/v1/b/${ESTADO}/o/youtube-cliente.json?alt=media`, { headers: conG })).json();
if (!cliente.client_id) throw new Error("no está youtube-cliente.json en el bucket");

const servidor = http.createServer();
await new Promise((ok) => servidor.listen(0, "127.0.0.1", ok));
const redirect = `http://127.0.0.1:${servidor.address().port}`;
const url =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: cliente.client_id,
    redirect_uri: redirect,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
  });
console.log("Abrí esta dirección y entrá con scalerics@gmail.com:\n" + url);
if (!process.env.NO_ABRIR) try {
  execSync(`start "" "${url}"`, { shell: "cmd.exe", stdio: "ignore" });
} catch {}

const code = await new Promise((ok, mal) => {
  servidor.on("request", (req, res) => {
    const q = new URL(req.url, redirect).searchParams;
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(q.get("code") ? "Listo: YouTube autorizado. Podés cerrar esta pestaña." : "No vino el código: " + (q.get("error") || ""));
    q.get("code") ? ok(q.get("code")) : mal(new Error(q.get("error") || "sin código"));
  });
});
servidor.close();

const r = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ code, client_id: cliente.client_id, client_secret: cliente.client_secret, redirect_uri: redirect, grant_type: "authorization_code" }),
});
const tok = await r.json();
if (!tok.refresh_token) throw new Error("Google no devolvió refresh_token: " + JSON.stringify(tok).slice(0, 200));

// qué canal quedó autorizado
const canal = await (await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: { Authorization: "Bearer " + tok.access_token } })).json();
const c = canal.items?.[0];
console.log(`canal autorizado: ${c?.snippet?.title} (${c?.snippet?.customUrl}, ${c?.id})`);

await fetch(`https://storage.googleapis.com/upload/storage/v1/b/${ESTADO}/o?uploadType=media&name=youtube.json`, {
  method: "POST",
  headers: { ...conG, "Content-Type": "application/json" },
  body: JSON.stringify({ refresh_token: tok.refresh_token, canal: c?.id, autorizado: Date.now() }),
});
console.log("guardado en gs://scalerics-reels-estado/youtube.json");
