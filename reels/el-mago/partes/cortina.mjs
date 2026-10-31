// Sintetiza assets/bgm/show.mp3: cortina de show de magia (vals misterioso en re menor con
// cajita de música, redoble antes de cada truco, trombón triste "wah wah" cuando el dueño lo
// arruina, fanfarria del ¡TA-DÁ! con platillo y aplausos, acorde mayor cuando entra Scalerics) y
// mezcla el público (partes/publico: "uuuh" y "oooh" con varias voces). Determinista.
// Uso (desde reels/el-mago): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 73.4, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };
let semilla = 777;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
const pad = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => amp * env(t, d, 0.3, 0.4) * (sin(fr, t) + 0.4 * sin(fr * 2.003, t) + 0.2 * sin(fr * 3.01, t)) * (1 + 0.2 * sin(5.5, t))));
const bajo = (t0, fr, amp) => add(t0, 0.5, (t) => amp * Math.exp(-t * 6) * (sin(fr, t) + 0.3 * sin(fr * 2, t)) * Math.min(1, t * 300));
const cajita = (t0, fr, amp) => add(t0, 1.0, (t) => amp * Math.exp(-t * 5) * (sin(fr, t) + 0.35 * sin(fr * 2.76, t) + 0.15 * sin(fr * 5.4, t)));
const tambor = (t0, amp) => add(t0, 0.12, (t) => amp * Math.exp(-t * 40) * (0.6 * rnd() + 0.4 * sin(190, t)));
const redoble = (t0, t1, a0, a1) => { for (let t = t0; t < t1; t += 0.045) tambor(t, a0 + (a1 - a0) * ((t - t0) / (t1 - t0))); };
const platillo = (t0, amp) => { let y = 0; add(t0, 2.2, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * 2.2) * v; }); };
// trombón triste: nota que baja con vibrato (sierra suavizada)
const wah = (t0, f0, d, amp) => add(t0, d, (t) => { const f = f0 * Math.pow(0.94, t / d) * (1 + 0.025 * sin(6, t)); return amp * env(t, d, 0.03, 0.12) * (sin(f, t) + 0.5 * sin(2 * f, t) + 0.3 * sin(3 * f, t)) * (0.6 + 0.4 * Math.min(1, t * 6)); });
const triste = (t0, amp = 0.05) => { wah(t0, 233, 0.32, amp); wah(t0 + 0.36, 220, 0.32, amp); wah(t0 + 0.72, 207.7, 0.32, amp); wah(t0 + 1.08, 196, 0.9, amp); };
const aplauso = (t0, d, amp) => { let y = 0; add(t0, d, (t) => { const r = rnd(); y = 0.6 * y + 0.4 * r; const golpes = 0.55 + 0.45 * Math.abs(sin(7.3, t) * sin(11.1, t + 0.3)); return amp * env(t, d, 0.25, 0.9) * (r - y) * golpes; }); };
const brillo = (t0, amp) => [1318.5, 1568, 1975.5, 2637, 3136].forEach((fr, k) => add(t0 + k * 0.06, 1.4, (t) => amp * Math.exp(-t * 3) * sin(fr, t)));
const glis = (t0, amp, sube = true) => { for (let k = 0; k < 12; k++) cajita(t0 + k * 0.045, 587.3 * Math.pow(2, (sube ? k : 11 - k) / 6), amp); };

// vals misterioso en re menor (3/4 a ~150 bpm: compás de 1.2 s) hasta el giro (45.8)
const Dm = [146.83, 174.61, 220], Bb = [116.54, 146.83, 174.61], A = [110, 138.59, 164.81], Gm = [98, 116.54, 146.83];
const PROG = [Dm, Bb, Gm, A];
const MELO = [587.3, 698.5, 880, 698.5, 587.3, 554.4, 587.3, 659.3, 698.5, 659.3, 587.3, 554.4];
const valsa = (desde, hasta, amp) => {
  for (let k = 0, t = desde; t < hasta - 0.2; k++, t += 1.2) {
    const ac = PROG[k % 4];
    bajo(t, ac[0] / 2, 0.11 * amp);
    pad(t + 0.4, 0.35, ac, 0.009 * amp); pad(t + 0.8, 0.35, ac, 0.009 * amp);
    cajita(t, MELO[(k * 3) % 12] , 0.035 * amp); cajita(t + 0.4, MELO[(k * 3 + 1) % 12], 0.025 * amp); cajita(t + 0.8, MELO[(k * 3 + 2) % 12], 0.025 * amp);
  }
};
glis(0, 0.04); platillo(0.02, 0.12);
valsa(0, 24.2, 1);
// la galera (24.3 a 26.8): redoble que se corta
redoble(24.3, 26.75, 0.04, 0.2);
valsa(26.8, 30.8, 0.8);
// la sierra (30.8): redoble y se corta
redoble(30.8, 33.9, 0.04, 0.2);
valsa(33.9, 37.7, 0.7);
// cada truco arruinado: trombón triste
triste(21.1, 0.045); triste(27.1, 0.045); triste(34.2, 0.05);
// ¡Basta! (37.78): golpe
platillo(37.78, 0.18); bajo(37.78, 55, 0.3);
// la asistente (41.75 a 45.8): solo pad suave
pad(41.75, 2.1, [146.83, 174.61, 220], 0.016); pad(43.8, 2.0, [110, 138.59, 164.81], 0.016);
redoble(44.6, 45.75, 0.04, 0.2);
// ¡TA-DÁ! (45.81): fanfarria en re mayor, platillo, brillo y aplausos
platillo(45.81, 0.3); brillo(45.81, 0.05);
pad(45.81, 0.18, [293.66, 369.99, 440], 0.03); pad(46.0, 2.2, [293.66, 369.99, 440, 587.33], 0.025);
glis(47.6, 0.03); glis(49.3, 0.03); glis(51.0, 0.03);
// después del truco: vals en mayor, liviano
const D = [146.83, 185, 220], G = [98, 123.47, 146.83], Am = [110, 130.81, 164.81];
const PROG2 = [D, G, A, D];
for (let k = 0, t = 48.2; t < 61.9; k++, t += 1.2) {
  const ac = PROG2[k % 4];
  bajo(t, ac[0] / 2, 0.09); pad(t + 0.4, 0.35, ac, 0.008); pad(t + 0.8, 0.35, ac, 0.008);
  cajita(t, ac[2] * 4, 0.02);
}
aplauso(51.95, 2.6, 0.3);
// "un mago nunca revela sus trucos": acorde misterioso
pad(58.9, 3.2, [146.83, 174.61, 220, 277.18], 0.016);
// Scalerics: acorde mayor que queda
brillo(62.14, 0.03); pad(62.14, 11, [146.83, 185, 220, 293.66], 0.018);

const tmp = "/tmp/show-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
// público: [archivo, segundo, volumen]
const P = [];
const tribuna = (tipo, t0, vol) => ["Puck", "Leda", "Fenrir", "Kore", "Charon", "Aoede"].forEach((v, k) => { const f = `partes/publico/${tipo}-${v}.wav`; if (fs.existsSync(f)) P.push([f, t0 + k * 0.07, vol]); });
tribuna("uh", 36.85, 0.34); tribuna("oh", 51.95, 0.3);
const ins = P.map(([f]) => `-i ${f}`).join(" ");
const fil = P.map(([, t, v], k) => `[${k + 1}:a]aresample=44100,volume=${v},adelay=${Math.round(t * 1000)}:all=1[p${k}]`).join(";");
const mezcla = `[0:a]${P.map((_, k) => `[p${k}]`).join("")}amix=inputs=${P.length + 1}:normalize=0,aecho=0.8:0.6:60:0.15[o]`;
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} ${ins} -filter_complex "${fil};${mezcla}" -map "[o]" -t ${DUR} -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/show.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/show.mp3", P.length, "voces de público");
