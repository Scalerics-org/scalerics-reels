// partes/NN.wav -> partes/NN-c.wav: cada silencio (silencedetect -30 dB, > K s) queda en K s,
// y se recortan las puntas. Correr desde reels/el-visto-trailer.
import { execSync } from "node:child_process";
const K = { "01": 0.3, "02": 0.3, "05": 0.25, "09": 0.3, "10": 0.3, "11": 0.3, "13": 0.25 };
const dur = (f) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString());
for (const n of ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"]) {
  const f = `partes/${n}.wav`, D = dur(f), k = K[n] ?? 0.18;
  const log = execSync(`ffmpeg -hide_banner -i ${f} -af silencedetect=noise=-30dB:d=${k} -f null - 2>&1`, { encoding: "utf8" });
  const ss = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const se = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  // tramos de voz: [fin de silencio anterior, inicio del siguiente], con colchones
  let segs = [], cur = 0.0;
  ss.forEach((s, i) => {
    const e = se[i] ?? D;
    if (s <= 0.01) { cur = Math.max(0, e - 0.04); return; }
    if (e >= D - 0.01) { segs.push([cur, Math.min(D, s + 0.08)]); cur = null; return; }
    segs.push([cur, s + k / 2]); cur = e - k / 2;
  });
  if (cur !== null) segs.push([cur, D]);
  const sel = segs.map(([a, b]) => `between(t,${a.toFixed(3)},${b.toFixed(3)})`).join("+");
  execSync(`ffmpeg -hide_banner -loglevel error -y -i ${f} -af "aselect='${sel}',asetpts=N/SR/TB" partes/${n}-c.wav`);
  console.log(n, D.toFixed(2), "->", dur(`partes/${n}-c.wav`).toFixed(2));
}
