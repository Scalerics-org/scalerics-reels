// partes/NN.wav -> partes/NN-c.wav: recorta silencios de punta y deja los silencios internos de
// más de MAX s en MAX (la guía de meditación hace pausas largas). Correr desde reels/respira-hondo.
import { execSync } from "node:child_process";
const MAX = Number(process.argv[2] ?? 0.5);
for (const n of process.argv.slice(3)) {
  const tmp = `partes/${n}-t.wav`;
  execSync(`ffmpeg -hide_banner -loglevel error -y -i partes/${n}.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" ${tmp}`);
  const dur = Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${tmp}`).toString());
  const log = execSync(`ffmpeg -hide_banner -i ${tmp} -af silencedetect=noise=-35dB:d=${MAX} -f null - 2>&1`, { shell: true }).toString();
  const ini = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const fin = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const keep = []; let a = 0;
  ini.forEach((s, i) => { if (fin[i] === undefined) return; keep.push([a, s + MAX / 2]); a = fin[i] - MAX / 2; });
  keep.push([a, dur]);
  const f = keep.map(([x, y], i) => `[0:a]atrim=${x.toFixed(3)}:${y.toFixed(3)},asetpts=PTS-STARTPTS[k${i}];`).join("") + keep.map((_, i) => `[k${i}]`).join("") + `concat=n=${keep.length}:v=0:a=1[o]`;
  execSync(`ffmpeg -hide_banner -loglevel error -y -i ${tmp} -filter_complex "${f}" -map "[o]" partes/${n}-c.wav`);
  execSync(`rm ${tmp}`);
  console.log(n, dur.toFixed(2), "->", Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${n}-c.wav`).toString()).toFixed(2));
}
