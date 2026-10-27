// Tiempos por palabra de la locución, con la ortografía del guion (para subtítulos y escenas).
// Transcribe con Speech-to-Text de Google (whisper no anda en la nube: Hugging Face está bloqueado)
// y alinea lo que oyó contra el guion; las palabras que no oyó bien se interpolan.
// Uso: node herramientas/tiempos.mjs <locucion.wav> <guion.txt> <palabras.json>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";
import { llamar } from "./google.mjs";

const [audio, guion, salida] = process.argv.slice(2);
if (!salida) {
  console.error("uso: node herramientas/tiempos.mjs <locucion.wav> <guion.txt> <palabras.json>");
  process.exit(1);
}

const G = fs.readFileSync(guion, "utf8").split(/\s+/).filter(Boolean);
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const dur = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${audio}"`, { encoding: "utf8" }));

// Speech-to-Text síncrono acepta hasta 1 minuto: tramos de 50 s con 5 s de solape.
const TRAMO = 50, SOLAPE = 5;
const frases = [...new Set(G.map((g) => g.replace(/[^\p{L}\p{N}]/gu, "")).filter(Boolean))].slice(0, 500);
const oidas = [];
for (let desde = 0; desde < dur; desde += TRAMO) {
  const tmp = path.join(os.tmpdir(), `tramo-${process.pid}-${desde}.raw`);
  execSync(`ffmpeg -hide_banner -loglevel error -y -ss ${desde} -t ${TRAMO + SOLAPE} -i "${audio}" -ac 1 -ar 16000 -f s16le "${tmp}"`);
  const j = await llamar("https://speech.googleapis.com/v1/speech:recognize", {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "es-UY",
      enableWordTimeOffsets: true,
      speechContexts: [{ phrases: frases }],
    },
    audio: { content: fs.readFileSync(tmp).toString("base64") },
  });
  fs.unlinkSync(tmp);
  const seg = (s) => Number(String(s ?? "0s").replace("s", ""));
  for (const r of j.results ?? []) {
    for (const w of r.alternatives?.[0]?.words ?? []) {
      const ini = desde + seg(w.startTime);
      // del solape, quedarse con lo que oyó el tramo siguiente
      if (desde + TRAMO < dur && ini >= desde + TRAMO) continue;
      oidas.push({ t: w.word, ini, fin: desde + seg(w.endTime) });
    }
  }
}
console.log("oyó:", oidas.map((w) => w.t).join(" "));

// Speech-to-Text pega el silencio de una pausa al principio de la palabra que sigue: si dentro
// de una palabra termina un silencio, la palabra en realidad arranca ahí.
const finesDeSilencio = [...execSync(`ffmpeg -hide_banner -i "${audio}" -af silencedetect=noise=-35dB:d=0.12 -f null - 2>&1`, { encoding: "utf8", shell: true })
  .matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
for (const w of oidas) {
  const dentro = finesDeSilencio.filter((b) => b > w.ini && b < w.fin - 0.05);
  if (dentro.length) w.ini = Math.max(...dentro);
}

// Alineación por subsecuencia común más larga entre guion y lo oído.
const a = G.map(norm), b = oidas.map((w) => norm(w.t));
const L = Array.from({ length: a.length + 1 }, () => new Int32Array(b.length + 1));
for (let i = a.length - 1; i >= 0; i--)
  for (let k = b.length - 1; k >= 0; k--)
    L[i][k] = a[i] && a[i] === b[k] ? L[i + 1][k + 1] + 1 : Math.max(L[i + 1][k], L[i][k + 1]);
const st = Array(G.length).fill(null), en = Array(G.length).fill(null);
for (let i = 0, k = 0; i < a.length && k < b.length; ) {
  if (a[i] && a[i] === b[k]) { st[i] = oidas[k].ini; en[i] = oidas[k].fin; i++; k++; }
  else if (L[i + 1][k] >= L[i][k + 1]) i++;
  else k++;
}
for (let i = 0; i < G.length; ) {
  if (st[i] !== null) { i++; continue; }
  let j = i;
  while (j < G.length && st[j] === null) j++;
  const desde = i > 0 ? en[i - 1] : 0, hasta = j < G.length ? st[j] : Math.min(dur, desde + 0.35 * (j - i));
  for (let k = i; k < j; k++) {
    st[k] = desde + ((hasta - desde) * (k - i)) / (j - i);
    en[k] = desde + ((hasta - desde) * (k - i + 1)) / (j - i);
  }
  console.log("interpolado:", G.slice(i, j).join(" "));
  i = j;
}
const r3 = (x) => Math.round(x * 1000) / 1000;
fs.writeFileSync(salida, JSON.stringify(G.map((t, i) => ({ id: i, text: t, start: r3(st[i]), end: r3(en[i]) }))));
console.log(`${G.length} palabras → ${salida} (voz de ${dur.toFixed(2)} s)`);
