// Arreglos a mano de los tiempos por palabra que Speech-to-Text interpoló mal (verificados con
// silencedetect sobre partes/NN-c.wav). Correr después de tiempos.mjs y antes de pegar.mjs.
import fs from "node:fs";
const fix = (n, i, s, e) => {
  const j = JSON.parse(fs.readFileSync(`partes/${n}.json`, "utf8"));
  if (s != null) j[i].start = s;
  if (e != null) j[i].end = e;
  fs.writeFileSync(`partes/${n}.json`, JSON.stringify(j));
};
fix("01", 1, 0.3, 1.17); fix("01", 2, 1.57, 2.39); // "catorce. Catorce"
fix("09", 10, 4.45, 4.55); fix("09", 11, 4.6, 5.35); // "y Furioso"
fix("11", 0, 0, 0.35); fix("11", 1, 0.35, 1.0); fix("11", 12, 3.2, 3.85); fix("11", 20, 5.8, 6.5); // "Actuás bárbaro", "teléfono", "filmás"
