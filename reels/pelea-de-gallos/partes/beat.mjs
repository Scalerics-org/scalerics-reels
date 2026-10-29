// Sintetiza la pista de fondo de la batalla: beat boom-bap a 90 BPM + público (murmullo, "uuuh",
// festejo) + bocina. Todo determinista (ruido con semilla fija). Sale en assets/bgm/beat.wav
// (armar.mjs la usa como bgm en vez de bed.mp3). Correr desde reels/pelea-de-gallos:
//   node partes/beat.mjs && ffmpeg -y -i assets/bgm/beat.wav -b:a 192k assets/bgm/beat.mp3
// Los tiempos (segundos globales) salen de assets/voice/palabras.json.
import fs from "node:fs";

const SR = 48000;
const DUR = 75.6;
const N = Math.round(SR * DUR);
// tres capas que se normalizan por separado y se mezclan: beat, público y bocina
const capa = () => [new Float32Array(N), new Float32Array(N)];
const CAPAS = { beat: capa(), publico: capa(), bocina: capa() };
let L, R;
const en = (c) => ([L, R] = CAPAS[c]);

let semilla = 1234567;
const rnd = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);
const ruido = () => rnd() * 2 - 1;

// ---- momentos (de palabras.json) ----
const P = JSON.parse(fs.readFileSync("assets/voice/palabras.json", "utf8"));
const fin = (i) => P[i].end;
const ini = (i) => P[i].start;
const T = {
  tiempo: ini(18),          // "¡Tiempo!": arranca el beat del round 1
  r1a: fin(56),             // "corazón": uuuh
  r1b: fin(89),             // "tres": uuuh grande, corta el beat
  r2: ini(94) - 0.35,       // "Pará la mano": vuelve el beat
  r2a: fin(133),            // "prisa": uuuh (risas)
  r2b: fin(177),            // "domingo": uuuh enorme, corta el beat
  gana: fin(183),           // "gana el agente": bocina y festejo
  cierre: ini(184),         // beat suave por debajo del cierre
};

// ---- beat ----
const BPM = 90, PASO = 60 / BPM / 4; // semicorchea
const BAR = PASO * 16;
// bajo: La menor, Fa, Sol, Mi
const BAJO = [55, 43.65, 49, 41.2];
function bombo(t0, g) {
  const n = Math.round(0.45 * SR), s0 = Math.round(t0 * SR);
  let fase = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    const f = 48 + 110 * Math.exp(-t * 32);
    fase += (2 * Math.PI * f) / SR;
    const v = Math.sin(fase) * Math.exp(-t * 7.5) * g + (i < 40 ? ruido() * 0.3 * g : 0);
    L[s0 + i] += v; R[s0 + i] += v;
  }
}
function caja(t0, g) {
  const n = Math.round(0.3 * SR), s0 = Math.round(t0 * SR);
  let lp = 0, fase = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    const x = ruido();
    lp += 0.35 * (x - lp);
    const hp = x - lp; // ruido sin graves
    fase += (2 * Math.PI * 190) / SR;
    const v = (hp * 0.7 * Math.exp(-t * 16) + Math.sin(fase) * 0.45 * Math.exp(-t * 28)) * g;
    L[s0 + i] += v * 0.95; R[s0 + i] += v;
  }
}
function platillo(t0, g, largo = 0.06) {
  const n = Math.round(largo * 2.5 * SR), s0 = Math.round(t0 * SR);
  let prev = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    const x = ruido();
    const hp = x - prev; prev = x;
    const v = hp * Math.exp(-t / largo) * g;
    L[s0 + i] += v * 0.8; R[s0 + i] += v * 1.1;
  }
}
function bajo(t0, f, dur, g) {
  const n = Math.round(dur * SR), s0 = Math.round(t0 * SR);
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.01) * Math.min(1, (dur - t) / 0.05);
    const v = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(2 * Math.PI * 2 * f * t)) * env * g;
    L[s0 + i] += v; R[s0 + i] += v;
  }
}
// acorde menor oscuro, como un "piano" de batalla, en el 1 de cada compás
function acorde(t0, raiz, g) {
  const notas = [raiz * 4, raiz * 4 * 1.189, raiz * 4 * 1.498, raiz * 8];
  const n = Math.round(1.6 * SR), s0 = Math.round(t0 * SR);
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    let v = 0;
    for (const f of notas) v += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * 2 * f * t) * Math.exp(-t * 6);
    v *= Math.exp(-t * 2.4) * g * 0.25;
    L[s0 + i] += v * 1.1; R[s0 + i] += v * 0.9;
  }
}
function tramoBeat(desde, hasta, g = 1, suave = false) {
  const SW = PASO * 0.12; // swing en las semicorcheas impares
  for (let b = 0; desde + b * BAR < hasta; b++) {
    const t0 = desde + b * BAR;
    const raiz = BAJO[b % 4];
    if (t0 < hasta) acorde(t0, raiz, g * (suave ? 0.8 : 1));
    for (let s = 0; s < 16; s++) {
      const t = t0 + s * PASO + (s % 2 ? SW : 0);
      if (t >= hasta) break;
      if (!suave) {
        if (s === 0 || s === 7 || s === 10) bombo(t, 0.9 * g);
        if (s === 4 || s === 12) caja(t, 0.55 * g);
        if (s % 2 === 0) platillo(t, (s % 4 === 2 ? 0.16 : 0.1) * g);
        if (s === 14 && b % 2) platillo(t, 0.14 * g, 0.18);
        if (s === 0 || s === 10) bajo(t, raiz, PASO * (s === 0 ? 5 : 4), 0.32 * g);
      } else {
        if (s === 0 || s === 10) bombo(t, 0.45 * g);
        if (s === 4 || s === 12) platillo(t, 0.08 * g, 0.12);
      }
    }
  }
}
// "scratch" de DJ: ruido barrido ida y vuelta
function scratch(t0, g) {
  const n = Math.round(0.42 * SR), s0 = Math.round(t0 * SR);
  let lp = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    const vel = Math.sin((t / 0.42) * Math.PI * 3);
    const a = 0.05 + 0.4 * Math.abs(vel);
    lp += a * (ruido() - lp);
    const tono = Math.sin(2 * Math.PI * (300 + 500 * Math.abs(vel)) * t);
    const v = (lp * 0.8 + tono * 0.25) * Math.abs(vel) * g;
    L[s0 + i] += v; R[s0 + i] += v;
  }
}

// ---- público ----
// una voz de la multitud: diente de sierra con formantes de vocal (u: 320/800 Hz, e: 500/1800 Hz)
function vozPublico(t0, dur, f0, vocal, g, curva) {
  const [F1, F2] = vocal === "u" ? [330, 760] : [520, 1750];
  const n = Math.round(dur * SR), s0 = Math.round(t0 * SR);
  let fase = 0, b1 = [0, 0], b2 = [0, 0];
  const res = (F, bw) => { const r = Math.exp(-Math.PI * bw / SR); return [2 * r * Math.cos(2 * Math.PI * F / SR), -r * r]; };
  const [a1, a2] = res(F1, 120), [c1, c2] = res(F2, 160);
  const pan = 0.3 + rnd() * 0.4, vib = 4 + rnd() * 2;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR, u = t / dur;
    const f = f0 * curva(u) * (1 + 0.015 * Math.sin(2 * Math.PI * vib * t));
    fase = (fase + f / SR) % 1;
    const x = (fase * 2 - 1) * 0.6 + ruido() * 0.15;
    const y1 = x + a1 * b1[0] + a2 * b1[1]; b1 = [y1, b1[0]];
    const y2 = x + c1 * b2[0] + c2 * b2[1]; b2 = [y2, b2[0]];
    const env = Math.min(1, u / 0.12) * Math.pow(Math.min(1, (1 - u) / 0.35), 1.5);
    const v = (y1 * 0.05 + y2 * 0.025) * env * g;
    L[s0 + i] += v * (1 - pan); R[s0 + i] += v * pan;
  }
}
// "uuuuh" de batalla: sube y cae
function uuuh(t0, g, largo = 1.6, voces = 18) {
  for (let k = 0; k < voces; k++) {
    const f0 = (k % 3 === 0 ? 200 : 110) * (0.85 + rnd() * 0.5);
    const d = largo * (0.8 + rnd() * 0.35);
    vozPublico(t0 + rnd() * 0.18, d, f0, "u", g * (0.7 + rnd() * 0.5), (u) => 1 + 0.35 * Math.sin(Math.min(1, u * 1.6) * Math.PI) - 0.25 * Math.max(0, u - 0.6));
  }
  murmullo(t0, largo + 0.3, g * 0.5);
}
// festejo: "eeeh" + aplausos
function festejo(t0, dur, g) {
  for (let k = 0; k < 16; k++) {
    const f0 = (k % 2 ? 230 : 130) * (0.85 + rnd() * 0.4);
    vozPublico(t0 + rnd() * 0.25, dur * (0.6 + rnd() * 0.4), f0, "e", g * 0.8, (u) => 1 + 0.2 * Math.sin(u * Math.PI));
  }
  aplausos(t0, dur + 0.6, g);
}
function aplausos(t0, dur, g) {
  const golpes = Math.round(dur * 70);
  for (let k = 0; k < golpes; k++) {
    const t = t0 + rnd() * dur, s0 = Math.round(t * SR), n = Math.round(0.02 * SR);
    const env0 = Math.min(1, (t - t0) / 0.15) * Math.min(1, (t0 + dur - t) / (dur * 0.5));
    const pan = rnd();
    let prev = 0;
    for (let i = 0; i < n && s0 + i < N; i++) {
      const x = ruido(); const hp = x - prev * 0.7; prev = x;
      const v = hp * Math.exp(-i / (SR * 0.004)) * g * 0.22 * env0;
      L[s0 + i] += v * (1 - pan); R[s0 + i] += v * pan;
    }
  }
}
function murmullo(t0, dur, g) {
  const n = Math.round(dur * SR), s0 = Math.round(t0 * SR);
  let lp = 0, lp2 = 0;
  for (let i = 0; i < n && s0 + i < N; i++) {
    const t = i / SR;
    lp += 0.04 * (ruido() - lp); lp2 += 0.08 * (lp - lp2);
    const env = Math.min(1, t / 0.3) * Math.min(1, (dur - t) / 0.4) * (0.8 + 0.2 * Math.sin(t * 5.3));
    const v = lp2 * 1.6 * env * g;
    L[s0 + i] += v; R[s0 + i] += v * 0.9;
  }
}
// bocina de batalla (air horn): tres toques
function bocina(t0, g) {
  [0, 0.22, 0.44].forEach((d, k) => {
    const dur = k === 2 ? 0.75 : 0.16, s0 = Math.round((t0 + d) * SR), n = Math.round(dur * SR);
    const fases = [0, 0, 0];
    for (let i = 0; i < n && s0 + i < N; i++) {
      const t = i / SR;
      const glide = 1 - 0.04 * Math.exp(-t * 30);
      let v = 0;
      [466, 587, 698].forEach((f, j) => { fases[j] = (fases[j] + (f * glide) / SR) % 1; v += fases[j] < 0.5 ? 1 : -1; });
      v *= 0.06 * g * Math.min(1, t / 0.01) * Math.min(1, (dur - t) / 0.03);
      L[s0 + i] += v; R[s0 + i] += v;
    }
  });
}

// ---- armado ----
en("publico");
murmullo(0, DUR, 0.18);                      // el público siempre está
festejo(0, 1.4, 1.1);                        // "¡arriba las manos!"
aplausos(0.2, 2.2, 1.1);
en("beat");
scratch(T.tiempo - 0.45, 0.35);
bombo(T.tiempo + 0.05, 1);
tramoBeat(T.tiempo + 0.55, T.r1b + 0.05, 1);
en("publico");
uuuh(T.r1a + 0.05, 0.9, 1.4);
uuuh(T.r1b + 0.02, 1.15, 1.9, 24);
en("beat");
scratch(T.r2 - 0.4, 0.3);
tramoBeat(T.r2, T.r2b + 0.05, 1);
en("publico");
uuuh(T.r2a + 0.05, 0.9, 1.4);
uuuh(T.r2b + 0.02, 1.3, 2.2, 28);
festejo(T.r2b + 1.0, 1.2, 0.4);
en("bocina");
bocina(T.gana + 0.05, 1);
en("publico");
festejo(T.gana + 0.1, 2.4, 0.7);
en("beat");
tramoBeat(T.cierre + 0.4, DUR - 0.8, 0.55, true);

// cada capa a su pico, mezcla y fade final
const MEZCLA = { beat: 0.42, publico: 0.95, bocina: 0.4 };
const ML = new Float32Array(N), MR = new Float32Array(N);
for (const [c, [cl, cr]] of Object.entries(CAPAS)) {
  let p = 0;
  for (let i = 0; i < N; i++) p = Math.max(p, Math.abs(cl[i]), Math.abs(cr[i]));
  const g = MEZCLA[c] / (p || 1);
  for (let i = 0; i < N; i++) { ML[i] += cl[i] * g; MR[i] += cr[i] * g; }
}
let pico = 0;
for (let i = 0; i < N; i++) {
  const fade = Math.min(1, (DUR - i / SR) / 1.2);
  ML[i] *= fade; MR[i] *= fade;
  pico = Math.max(pico, Math.abs(ML[i]), Math.abs(MR[i]));
}
const k = Math.min(1, 0.95 / pico);
[L, R] = [ML, MR];
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * k)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * k)) * 32767), 46 + i * 4);
}
fs.mkdirSync("assets/bgm", { recursive: true });
fs.writeFileSync("assets/bgm/beat.wav", buf);
console.log("beat listo", JSON.stringify(T));
