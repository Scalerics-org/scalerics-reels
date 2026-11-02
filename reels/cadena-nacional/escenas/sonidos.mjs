// Sintetiza los sonidos propios del reel (sin bajar nada): fanfarria oficial, cacerolas,
// aplausos y redoble. Correr desde reels/cadena-nacional: escribe assets/sfx/<nombre>.mp3.
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 48000;
let semilla = 7;
const azar = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const nuevo = (seg) => new Float32Array(Math.ceil(seg * SR));
function guardar(nombre, buf, gan = 0.9) {
  let pico = 0; for (const v of buf) pico = Math.max(pico, Math.abs(v));
  const b = Buffer.alloc(44 + buf.length * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + buf.length * 2, 4); b.write("WAVEfmt ", 8);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24);
  b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(buf.length * 2, 40);
  buf.forEach((v, i) => b.writeInt16LE(Math.round((v / (pico || 1)) * gan * 32767), 44 + i * 2));
  const tmp = `/tmp/cadena-${nombre}.wav`;
  fs.writeFileSync(tmp, b);
  execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -c:a libmp3lame -b:a 160k assets/sfx/${nombre}.mp3`);
  fs.unlinkSync(tmp);
  console.log("sonido", nombre, (buf.length / SR).toFixed(2), "s");
}
// nota de bronce: armónicos que decaen, ataque corto y un vibrato leve
function bronce(buf, f, t0, d, vol = 1) {
  const A = [1, 0.75, 0.55, 0.4, 0.28, 0.18, 0.1];
  const i0 = Math.floor(t0 * SR), n = Math.floor((d + 0.25) * SR);
  for (let i = 0; i < n && i0 + i < buf.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.025) * (t < d ? 1 - 0.25 * (t / d) : 0.75 * Math.exp(-(t - d) / 0.07));
    const vib = 1 + 0.004 * Math.sin(2 * Math.PI * 5.5 * t) * Math.min(1, t / 0.2);
    let s = 0;
    A.forEach((a, k) => (s += a * Math.sin(2 * Math.PI * f * (k + 1) * vib * t)));
    buf[i0 + i] += s * env * vol;
  }
}
function timbal(buf, t0, f = 70, vol = 1.6) {
  const i0 = Math.floor(t0 * SR);
  for (let i = 0; i < SR * 0.9 && i0 + i < buf.length; i++) {
    const t = i / SR;
    buf[i0 + i] += vol * Math.exp(-t / 0.25) * (Math.sin(2 * Math.PI * f * t) + 0.3 * (azar() * 2 - 1) * Math.exp(-t / 0.02));
  }
}
// ---------- fanfarria: ta-ta-ta-táaa y acorde final
{
  const b = nuevo(2.6);
  const G4 = 392, C5 = 523.25, E5 = 659.25, G5 = 783.99, C4 = 261.63;
  [[G4, 0, 0.13], [G4, 0.17, 0.13], [G4, 0.34, 0.13]].forEach(([f, t, d]) => { bronce(b, f, t, d); bronce(b, f / 2, t, d, 0.5); });
  [C5, E5, G5, C4].forEach((f, k) => bronce(b, f, 0.52, 0.45, k === 3 ? 0.6 : 0.8));
  [G4, C5, E5].forEach((f) => bronce(b, f * 1.122, 1.02, 0.22, 0.7));
  [C5, E5, G5, C4, C4 / 2].forEach((f) => bronce(b, f, 1.28, 0.95, 0.75));
  timbal(b, 0.52); timbal(b, 1.28, 65, 2);
  guardar("fanfarria", b);
}
// ---------- cacerolas: golpes metálicos de varias ollas, al ritmo de protesta
function olla(buf, t0, base, vol) {
  const P = [1, 2.31, 3.86, 5.12, 6.7].map((r) => base * r * (0.98 + azar() * 0.04));
  const i0 = Math.floor(t0 * SR);
  for (let i = 0; i < SR * 0.35 && i0 + i < buf.length; i++) {
    const t = i / SR;
    let s = 0;
    P.forEach((f, k) => (s += Math.sin(2 * Math.PI * f * t) * Math.exp(-t / (0.12 / (1 + k * 0.4))) / (1 + k * 0.3)));
    s += (azar() * 2 - 1) * Math.exp(-t / 0.006) * 1.2;
    buf[i0 + i] += s * vol;
  }
}
{
  const b = nuevo(3.4);
  const ritmo = [0, 0.18, 0.5, 0.68, 0.86]; // ta-ta, ta-ta-ta
  for (let c = 0; c < 3; c++) for (const r of ritmo) {
    const t = c * 1.1 + r;
    olla(b, t, 480, 1); olla(b, t + 0.012 + azar() * 0.02, 610, 0.8); olla(b, t + 0.02 + azar() * 0.03, 395, 0.7);
    if (azar() > 0.4) olla(b, t + 0.09, 720, 0.4);
  }
  guardar("cacerolas", b);
}
// ---------- aplausos: muchas palmas cortas al azar
{
  const b = nuevo(3.0);
  let lp = 0, prev = 0;
  for (let k = 0; k < 150; k++) {
    const t0 = azar() * 2.6, i0 = Math.floor(t0 * SR), vol = 0.4 + azar() * 0.6, tau = 0.006 + azar() * 0.01;
    for (let i = 0; i < SR * 0.06 && i0 + i < b.length; i++) b[i0 + i] += (azar() * 2 - 1) * Math.exp(-(i / SR) / tau) * vol;
  }
  for (let i = 0; i < b.length; i++) { // pasa banda simple y fade
    const x = b[i]; lp = lp + 0.35 * (x - lp); const hp = lp - prev; prev = lp;
    const t = i / SR;
    b[i] = hp * Math.min(1, t / 0.15) * (t > 2.2 ? Math.max(0, 1 - (t - 2.2) / 0.8) : 1);
  }
  guardar("aplausos", b, 0.8);
}
// ---------- redoble y golpe de platillo
{
  const b = nuevo(2.4);
  for (let k = 0; k < 34; k++) {
    const t0 = k * 0.04, i0 = Math.floor(t0 * SR), vol = 0.25 + 0.75 * (k / 34);
    for (let i = 0; i < SR * 0.05; i++) b[i0 + i] += (azar() * 2 - 1) * Math.exp(-(i / SR) / 0.015) * vol + Math.sin(2 * Math.PI * 190 * i / SR) * Math.exp(-(i / SR) / 0.01) * vol * 0.5;
  }
  timbal(b, 1.36, 60, 2.2);
  const i0 = Math.floor(1.36 * SR);
  for (let i = 0; i < SR * 1.0 && i0 + i < b.length; i++) b[i0 + i] += (azar() * 2 - 1) * Math.exp(-(i / SR) / 0.3) * 0.9;
  guardar("redoble", b);
}
