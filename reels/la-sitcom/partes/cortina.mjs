// Sintetiza assets/bgm/escenario.mp3: la música de una comedia de living de los 90 (bajo slap,
// batería con palmas, bronces), la apertura "Dos en el Local" después del gancho, el "lick" de bajo
// de los cambios de escena, y mezcla el público de estudio (partes/publico: risas "ja", ternura
// "aw", "uuuh"). Los momentos salen de partes/inicios.json (lo escribe pegar.mjs), así que si
// cambia la voz basta con correrlo de nuevo. Determinista. Uso (desde reels/la-sitcom):
//   node partes/cortina.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
import { N as PARTES, T as TEMPO } from "./conf.mjs";
const SR = 44100;
const ini = Object.fromEntries(JSON.parse(fs.readFileSync("partes/inicios.json", "utf8")).map(([n, t]) => [n, t]));
const pal = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const VOZ = Number(execSync("ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/locucion.wav").toString());
const DUR = Math.round((Math.max(VOZ, pal.at(-1).end) + 3.2) * 100) / 100;
const N = Math.round(SR * DUR);
const L = new Float32Array(N);
// fin de cada parlamento = inicio del siguiente menos su silencio; alcanza con "fin aproximado"
const finDe = (n) => { const ws = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8")); const T = TEMPO[PARTES.indexOf(n)]; return ini[n] + ws.at(-1).end / T; };
const add = (t0, dur, f) => { const a = Math.round(t0 * SR), n = Math.round(dur * SR); for (let i = 0; i < n && a + i < N; i++) if (a + i >= 0) L[a + i] += f(i / SR, i); };
let semilla = 1994;
const rnd = () => { semilla = (semilla * 1103515245 + 12345) & 0x7fffffff; return (semilla / 0x7fffffff) * 2 - 1; };
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);
const env = (t, d, at = 0.01, rel = 0.2) => Math.min(1, t / at) * Math.min(1, Math.max(0, (d - t) / rel));
// bajo slap: ataque seco, armónicos que se apagan rápido, "pop" de octava
const slap = (t0, fr, amp, d = 0.32) => add(t0, d, (t) => amp * Math.min(1, t * 400) * (Math.exp(-t * 7) * (sin(fr, t) + 0.6 * sin(fr * 2, t) * Math.exp(-t * 18) + 0.35 * sin(fr * 3, t) * Math.exp(-t * 30))) * env(t, d, 0.002, 0.05));
const bronce = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => { const v = Math.min(1, t * 40) * (0.6 + 0.4 * Math.exp(-t * 4)) * env(t, d, 0.01, 0.08); let s = 0; for (let k = 1; k <= 7; k++) s += sin(fr * k * (1 + 0.002 * Math.sin(t * 30)), t) / k; return amp * v * s; }));
const organo = (t0, d, notas, amp) => notas.forEach((fr) => add(t0, d, (t) => amp * env(t, d, 0.04, 0.2) * (sin(fr, t) + 0.4 * sin(fr * 2, t)) * (1 + 0.15 * sin(5.5, t))));
const bombo = (t0, amp) => add(t0, 0.3, (t) => amp * Math.exp(-t * 16) * sin(60 + 100 * Math.exp(-t * 35), t));
const caja = (t0, amp) => add(t0, 0.2, (t) => amp * Math.exp(-t * 22) * (0.75 * rnd() + 0.25 * sin(190, t)));
const palma = (t0, amp) => [0, 0.011, 0.023].forEach((o) => add(t0 + o, 0.12, (t) => amp * Math.exp(-t * 40) * rnd()));
const hat = (t0, amp) => { let y = 0; add(t0, 0.06, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * 60) * v; }); };
const platillo = (t0, amp, dec = 2.0) => { let y = 0; add(t0, 2.2, (t) => { const r = rnd(); const v = r - y; y = r; return amp * Math.exp(-t * dec) * v; }); };

// tema: Mi mayor bailable, 112 bpm
const B = 60 / 112;
const RIFF = [[82.4, 0], [82.4, 0.5], [164.8, 0.75], [98, 1.5], [110, 2], [123.5, 2.5], [164.8, 3], [146.8, 3.5]];
const groove = (desde, hasta, amp = 1, bronces = false) => {
  for (let t = desde; t < hasta - 0.1; t += 4 * B) {
    for (const [fr, b] of RIFF) if (t + b * B < hasta) slap(t + b * B, fr, 0.2 * amp);
    for (let b = 0; b < 4; b++) {
      const tb = t + b * B; if (tb >= hasta) break;
      hat(tb, 0.05 * amp); hat(tb + B / 2, 0.035 * amp);
      if (b % 2 === 0) bombo(tb, 0.2 * amp); else { caja(tb, 0.09 * amp); palma(tb, 0.07 * amp); }
    }
    if (bronces) { bronce(t + 1.5 * B, 0.18, [329.6, 415.3, 493.9], 0.022 * amp); bronce(t + 2 * B, 0.3, [349.2, 440, 523.3], 0.022 * amp); }
  }
};
// el "lick" de bajo de los cambios de escena (tipo comedia de los 90)
const lick = (t0, amp = 1) => [[164.8, 0], [146.8, 0.09], [123.5, 0.18], [110, 0.27], [98, 0.4], [82.4, 0.55]].forEach(([f, o]) => slap(t0 + o, f, 0.26 * amp, 0.26));

// 1) gancho: groove bajito debajo del dueño
groove(0, ini["02"] - 3.0, 0.45);
// 2) apertura "Dos en el Local": fanfarria + groove con bronces en el silencio después de 01
const ap = finDe("01") + 0.15;
bronce(ap, 0.22, [493.9, 622.3, 740], 0.05); bronce(ap + 0.28, 0.9, [659.3, 830.6, 987.8], 0.055); platillo(ap + 0.28, 0.2, 1.4);
groove(ap + 0.28, ini["02"] - 0.15, 0.95, true);
lick(ini["02"] - 0.7, 0.8);
// 3) la madrugada (02-06): solo un órgano grave muy bajito, tic tac
organo(ini["02"], ini["07"] - ini["02"] - 0.6, [82.4, 123.5], 0.006);
for (let t = ini["02"]; t < ini["06"]; t += 1) caja(t, 0.018);
// el dueño se despierta (05): golpe de bronces y platillo
bronce(ini["05"] - 0.05, 0.4, [233.1, 277.2, 311.1], 0.05); platillo(ini["05"] - 0.05, 0.16, 2.2);
// 4) "a la mañana": lick y groove liviano hasta el final de 07
lick(ini["07"] - 0.85, 1);
groove(ini["07"] - 0.2, ini["09"] - 0.05, 0.35);
// "¡ochenta!": golpe
bronce(ini["08"] - 0.02, 0.5, [392, 493.9, 587.3], 0.05); platillo(ini["08"], 0.14, 2.4);
// 5) la pregunta desconfiada (10): nota grave
organo(ini["10"], ini["11"] - ini["10"], [73.4, 87.3], 0.012);
// "awww" (después de 11): acorde dulce
organo(finDe("11"), 1.6, [329.6, 415.3, 493.9, 659.3], 0.007);
// 6) Scalerics: lick, groove bajito y acorde final
lick(ini["14"] - 0.8, 0.9);
groove(ini["14"] - 0.1, DUR - 1.6, 0.32, true);
bronce(DUR - 1.6, 1.4, [329.6, 415.3, 493.9, 659.3], 0.035); platillo(DUR - 1.6, 0.12, 1.4);

const tmp = "/tmp/escenario-sitcom-" + process.pid + ".wav";
const buf = Buffer.alloc(44 + N * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(Math.tanh(L[i]) * 32767))), 44 + i * 2);
fs.writeFileSync(tmp, buf);
// público: [archivo, segundo, volumen]
const P = [];
const tribuna = (tipo, voces, t0, vol) => voces.forEach((v, k) => { const f = `partes/publico/${tipo}-${v}.wav`; if (fs.existsSync(f)) P.push([f, t0 + k * 0.07, vol]); });
const RISA = ["Puck", "Leda", "Charon", "Kore", "Achird", "Zephyr"];
const momentos = {
  ja1: finDe("01") - 0.1, ja2: finDe("06") + 0.05, uh: finDe("09") + 0.05, aw: finDe("11") + 0.05, ja3: finDe("13") + 0.05, ja0: finDe("04") + 0.02,
};
tribuna("ja", ["Leda", "Kore", "Achird"], momentos.ja1, 0.3);
tribuna("ja", ["Leda", "Achird"], momentos.ja0, 0.18);
tribuna("ja", RISA, momentos.ja2, 0.45);
tribuna("uh", ["Puck", "Leda", "Charon", "Kore", "Zephyr"], momentos.uh, 0.42);
tribuna("aw", ["Leda", "Kore", "Achird", "Zephyr", "Charon"], momentos.aw, 0.4);
tribuna("ja", RISA, momentos.ja3, 0.48);
fs.writeFileSync("partes/publico/momentos.json", JSON.stringify(Object.fromEntries(Object.entries({ ...momentos, apertura: ap }).map(([k, v]) => [k, Math.round(v * 100) / 100]))));
const ins = P.map(([f]) => `-i ${f}`).join(" ");
const fil = P.map(([, t, v], k) => `[${k + 1}:a]silenceremove=start_periods=1:start_threshold=-40dB,aresample=44100,aformat=channel_layouts=mono,volume=${v},adelay=${Math.round(t * 1000)}:all=1[p${k}]`).join(";");
const mezcla = `[0:a]${P.map((_, k) => `[p${k}]`).join("")}amix=inputs=${P.length + 1}:normalize=0,aecho=0.8:0.5:40:0.1[o]`;
fs.mkdirSync("assets/bgm", { recursive: true });
execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} ${ins} -filter_complex "${fil};${mezcla}" -map "[o]" -t ${DUR} -ac 1 -c:a libmp3lame -b:a 160k assets/bgm/escenario.mp3`);
fs.unlinkSync(tmp);
console.log("assets/bgm/escenario.mp3", DUR, "s,", P.length, "voces de público; momentos", JSON.stringify(momentos));
