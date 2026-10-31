// Sintetiza assets/bgm/escenario.mp3: la banda de un late night show (bajo caminante, platillo con
// swing, acordes de órgano, golpes de bronces), el BA-DUM TSS, redoble en la pregunta incómoda y
// aplausos; mezcla el público (partes/publico: risas "ja", asombro "oh", festejo "wu").
// Determinista. Uso (desde reels/el-late-night): node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
const SR = 44100, DUR = 71.72, N = Math.round(SR * DUR);
const L = new Float32Array(N);
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };
let semilla = 2024;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
const organo = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => amp * env(t, d, 0.03, 0.15) * (sin(fr, t) + 0.5 * sin(fr * 2, t) + 0.3 * sin(fr * 3, t)) * (1 + 0.2 * sin(6, t))));
const bronce = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => { const v = Math.min(1, t * 30) * Math.exp(-t * 2.5) * env(t, d, 0.01, 0.1); let s = 0; for (let k = 1; k <= 6; k++) s += sin(fr * k, t) / k; return amp * v * s; }));
const bajo = (t0, fr, amp) => add(t0, 0.48, (t) => amp * Math.exp(-t * 5) * (sin(fr, t) + 0.25 * sin(fr * 2, t)) * Math.min(1, t * 200));
const bombo = (t0, amp) => add(t0, 0.35, (t) => amp * Math.exp(-t * 14) * sin(55 + 90 * Math.exp(-t * 30), t));
const tambor = (t0, amp) => add(t0, 0.18, (t) => amp * Math.exp(-t * 28) * (0.7 * rnd() + 0.3 * sin(200, t)));
const hat = (t0, amp, d = 0.08) => { let y = 0; add(t0, d, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * 45) * v; }); };
const platillo = (t0, amp, dec = 2.0) => { let y = 0; add(t0, 2.4, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * dec) * v; }); };
const redoble = (t0, t1, a0, a1) => { for (let t = t0; t < t1; t += 0.05) tambor(t, a0 + (a1 - a0) * ((t - t0) / (t1 - t0))); };
const aplauso = (t0, d, amp) => { let y = 0; add(t0, d, (t) => { const r = rnd(); y = 0.6 * y + 0.4 * r; const golpes = 0.55 + 0.45 * Math.abs(sin(7.3, t) * sin(11.1, t + 0.3)); return amp * env(t, d, 0.2, 0.8) * (r - y) * golpes; }); };

// acordes (F6, Dm7, Gm7, C7) y bajo caminante, 120 bpm con swing
const ACORDES = [[174.6, 220, 261.6, 293.7], [146.8, 174.6, 220, 261.6], [196, 233.1, 293.7, 349.2], [130.8, 164.8, 233.1, 293.7]];
const CAMINA = [[87.3, 110, 130.8, 146.8], [73.4, 87.3, 110, 103.8], [98, 116.5, 146.8, 138.6], [65.4, 82.4, 98, 116.5]];
const groove = (desde, hasta, amp = 1) => {
  for (let k = 0, t = desde; t < hasta - 0.2; k++, t += 2) {
    const c = k % 4;
    organo(t, Math.min(2, hasta - t), ACORDES[c], 0.009 * amp);
    for (let b = 0; b < 4; b++) {
      const tb = t + b * 0.5; if (tb >= hasta) break;
      bajo(tb, CAMINA[c][b], 0.12 * amp);
      hat(tb, 0.05 * amp); hat(tb + 0.333, 0.03 * amp);
      if (b % 2 === 1) tambor(tb, 0.05 * amp);
      if (b === 0) bombo(tb, 0.16 * amp);
    }
  }
};
groove(0, 5.2, 0.8);
// "¡Buenas noches!": golpe de bronces y aplauso corto
bronce(5.3, 0.6, [349.2, 440, 523.3], 0.05); platillo(5.3, 0.12);
aplauso(5.4, 1.4, 0.18);
groove(6.0, 9.85, 0.75);
// entra el invitado: fanfarria, platillo, aplausos
bronce(9.95, 0.35, [392, 493.9, 587.3], 0.05); bronce(10.3, 1.4, [349.2, 440, 523.3, 698.5], 0.055); platillo(10.3, 0.2, 1.2);
aplauso(9.95, 3.2, 0.42);
groove(11.6, 17.7, 0.65);
// BA-DUM TSS
tambor(17.95, 0.35); tambor(18.15, 0.35); bombo(18.15, 0.3); platillo(18.4, 0.3, 2.2);
groove(19.3, 28.7, 0.65);
// rimshot chico antes de la risa del dueño soñando
tambor(28.85, 0.25); platillo(29.0, 0.15, 3);
groove(29.8, 39.7, 0.65);
// la pregunta incómoda: se corta la banda, nota grave y redoble
organo(39.83, 3.7, [73.4, 87.3, 103.8], 0.016);
redoble(41.3, 43.5, 0.03, 0.25);
platillo(43.55, 0.12, 2.5);
groove(43.6, 47.3, 0.55);
// "a los tres días": golpe y "oooh"
bombo(47.35, 0.35); platillo(47.35, 0.25, 1.6); bronce(47.4, 0.8, [233.1, 277.2, 349.2], 0.04);
groove(48.8, 55.9, 0.65);
// aplauso final con fanfarria
bronce(55.96, 0.3, [392, 493.9, 587.3], 0.055); bronce(56.3, 0.3, [440, 554.4, 659.3], 0.055); bronce(57.2, 1.7, [349.2, 440, 523.3, 698.5], 0.06);
platillo(57.2, 0.25, 1.0); aplauso(55.96, 3.6, 0.45);
// Scalerics: la banda queda tocando bajito y cierra con un acorde
groove(59.0, 68.0, 0.4);
organo(68.0, 3.6, [174.6, 220, 261.6, 349.2], 0.012); bronce(68.0, 1.5, [349.2, 440, 523.3], 0.03);

const tmp = "/tmp/escenario-late-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
// público: [archivo, segundo, volumen]
const P = [];
const hay = (f) => fs.existsSync(f);
const tribuna = (tipo, voces, t0, vol) => voces.forEach((v, k) => { const f = `partes/publico/${tipo}-${v}.wav`; if (hay(f)) P.push([f, t0 + k * 0.06, vol]); });
const RISA = ["Puck", "Leda", "Charon", "Kore", "Achird", "Zephyr"];
tribuna("wu", ["Kore", "Leda", "Zephyr"], 10.1, 0.3);
tribuna("ja", RISA, 18.5, 0.48);
tribuna("ja", RISA, 28.95, 0.48);
tribuna("oh", ["Puck", "Leda", "Charon", "Kore"], 47.45, 0.45);
tribuna("ja", ["Leda", "Kore", "Achird"], 51.85, 0.3);
tribuna("wu", ["Kore", "Leda", "Zephyr"], 56.1, 0.3);
const ins = P.map(([f]) => `-i ${f}`).join(" ");
const fil = P.map(([, t, v], k) => `[${k + 1}:a]aresample=44100,aformat=channel_layouts=mono,volume=${v},adelay=${Math.round(t * 1000)}:all=1[p${k}]`).join(";");
const mezcla = `[0:a]${P.map((_, k) => `[p${k}]`).join("")}amix=inputs=${P.length + 1}:normalize=0,aecho=0.8:0.5:50:0.12[o]`;
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} ${ins} -filter_complex "${fil};${mezcla}" -map "[o]" -t ${DUR} -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/escenario.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/escenario.mp3", P.length, "voces de público");
