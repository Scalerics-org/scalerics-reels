// Tiempos por palabra a mano para los parlamentos donde Speech-to-Text comprimió los tiempos
// (vocales estiradas del presentador): sacados de silencedetect -30dB sobre cada NN-p.wav.
// Correr DESPUÉS de tiempos.mjs (pisa partes/NN.json) y antes de componer.mjs.
// OJO: 07-p, 11-p y 15-p están recortados a mano (4.6, 3.8 y 4.75 s): ver componer.mjs.
import fs from "node:fs";
const M = {
  "06": [["¡Round", 0, 0.5], ["dos!", 0.5, 1.0], ["¡El", 1.2, 1.38], ["Copia-Pega!", 1.4, 2.6]],
  "07": [["Copiar.", 0, 1.0], ["Pegar.", 1.35, 2.16], ["Copiar.", 2.51, 3.37], ["Pegar.", 3.73, 4.52]],
  "10": [["¡Y", 0, 0.1], ["el", 0.1, 0.25], ["golpe", 0.25, 0.6], ["final:", 0.6, 1.15], ["Tu", 1.52, 1.7], ["Pedido", 1.7, 2.31], ["Está", 2.44, 2.8], ["Listo!", 2.96, 3.33]],
  "11": [["Hola,", 0, 0.54], ["tu", 0.74, 0.85], ["pedido", 0.85, 1.2], ["está", 1.2, 1.51], ["listo.", 1.62, 1.85], ["Hola,", 2.22, 2.79], ["tu", 2.92, 3.08], ["pedido...", 3.08, 3.78]],
  "12": [["¡A", 0, 0.25], ["la", 0.25, 0.5], ["lona!", 0.5, 1.75], ["¡Once", 2.03, 2.55], ["de", 2.55, 2.75], ["la", 2.75, 2.95], ["noche!", 2.95, 3.63], ["¡Uno!", 3.93, 4.7], ["¡Dos!", 4.97, 5.87], ["¡Tres!", 6.21, 7.4]],
  "15": [["¡Y", 0, 0.1], ["el", 0.1, 0.25], ["ganador...", 0.25, 0.82], ["el", 1.14, 1.3], ["dueño,", 1.3, 1.97], ["que", 2.15, 2.35], ["hoy", 2.35, 2.6], ["cena", 2.6, 2.95], ["caliente!", 2.95, 3.49]],
  "16": [["¿Cuál", 0, 0.2], ["es", 0.2, 0.35], ["el", 0.35, 0.45], ["rival", 0.45, 0.85], ["que", 0.85, 1.0], ["te", 1.0, 1.1], ["tira", 1.1, 1.4], ["a", 1.4, 1.45], ["vos?", 1.45, 1.82], ["Contanos", 2.15, 2.7], ["en", 2.75, 2.9], ["los", 2.9, 3.05], ["comentarios.", 3.05, 3.65]],
};
for (const [n, ws] of Object.entries(M)) {
  const txt = fs.readFileSync(`partes/${n}.txt`, "utf8").split(/\s+/).filter(Boolean);
  if (txt.join(" ") !== ws.map((w) => w[0]).join(" ")) throw new Error(`${n} no coincide con el .txt`);
  fs.writeFileSync(`partes/${n}.json`, JSON.stringify(ws.map(([text, start, end], id) => ({ id, text, start, end }))));
}
console.log("fijados", Object.keys(M).join(" "));
