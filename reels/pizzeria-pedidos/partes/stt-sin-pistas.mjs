// STT SIN pistas de vocabulario (para verificar que una toma se entiende sola): node partes/stt-sin-pistas.mjs a.wav [b.wav ...]
import fs from "node:fs";
import { execSync } from "node:child_process";
import { llamar } from "../../../herramientas/google.mjs";
for (const f of process.argv.slice(2)) {
  execSync(`ffmpeg -hide_banner -loglevel error -y -i "${f}" -af "adelay=400,apad=pad_dur=0.4" -ac 1 -ar 16000 -f s16le /tmp/stt-sp.raw`);
  const j = await llamar("https://speech.googleapis.com/v1/speech:recognize", { config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "es-UY", maxAlternatives: 1 }, audio: { content: fs.readFileSync("/tmp/stt-sp.raw").toString("base64") } });
  console.log(f.split("/").pop(), "→", (j.results ?? []).map((r) => r.alternatives?.[0]?.transcript).join(" | ") || "(nada)");
}
