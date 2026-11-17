// voz contra el resto (ya agachado) por tramos de 0,5 s, solo donde la voz habla de verdad (> -32 dBFS RMS)
const { execFileSync } = require("child_process");
const rd = (f) => { const b = execFileSync("ffmpeg", ["-loglevel", "error", "-i", f, "-f", "s16le", "-ac", "1", "-ar", "8000", "-"], { maxBuffer: 1e8 }); const a = new Float32Array(b.length / 2); for (let i = 0; i < a.length; i++) a[i] = b.readInt16LE(i * 2) / 32768; return a; };
const v = rd("assets/audio/stem-voz.wav"), r = rd("assets/audio/stem-resto.wav"); const N = 4000; let peor = 99; const lst = [];
for (let i = 0; i * N < v.length; i++) {
  let sv = 0, sr = 0; for (let j = i * N; j < Math.min(v.length, (i + 1) * N); j++) { sv += v[j] * v[j]; sr += r[j] * r[j]; }
  const dv = 10 * Math.log10(sv / N + 1e-12), dr = 10 * Math.log10(sr / N + 1e-12);
  if (dv > -32) { const d = dv - dr; lst.push((i * 0.5).toFixed(1) + ":" + d.toFixed(1)); if (d < peor) peor = d; }
}
console.log("voz-resto (s:dB):", lst.join(" ")); console.log("peor tramo con voz:", peor.toFixed(1), "dB");
// por palabra (lo que pide el CLAUDE.md: la voz 6 LU arriba mientras habla)
const PAL = require("../assets/voice/palabras.json"); let peorP = 99, malas = [];
for (const p of PAL) { const a = Math.round(p.t * 8000), b = Math.round(p.f * 8000); let sv = 0, sr = 0; for (let j = a; j < b; j++) { sv += v[j] * v[j]; sr += r[j] * r[j]; } const d = 10 * Math.log10(sv / sr); if (d < peorP) peorP = d; if (d < 6) malas.push(p.w + "@" + p.t + ":" + d.toFixed(1)); }
console.log("por palabra: peor", peorP.toFixed(1), "dB; debajo de 6:", malas.join(" ") || "ninguna");
// lo mismo, pero solo con las ventanas de 25 ms donde la voz suena (> -35 dBFS): saca las pausas que el alineado mete dentro de una palabra
{ let peor = 99, malas = []; const W = 200;
  for (const p of PAL) { let sv = 0, sr = 0, n = 0; for (let a = Math.round(p.t * 8000); a + W <= Math.round(p.f * 8000); a += W) { let ev = 0, er = 0; for (let j = a; j < a + W; j++) { ev += v[j] * v[j]; er += r[j] * r[j]; } if (10 * Math.log10(ev / W + 1e-12) > -35) { sv += ev; sr += er; n++; } }
    if (!n) continue; const d = 10 * Math.log10(sv / sr); if (d < peor) peor = d; if (d < 6) malas.push(p.w + "@" + p.t + ":" + d.toFixed(1)); }
  console.log("por palabra, solo donde suena: peor", peor.toFixed(1), "dB; debajo de 6:", malas.join(" ") || "ninguna"); }
