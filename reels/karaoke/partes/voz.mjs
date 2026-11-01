// Genera la locución con Gemini TTS (la voz que eligió Juan el 27-10: Orus, acento uruguayo).
// Uso: node herramientas/voz.mjs <guion.txt> <salida.wav> [--voz Orus] [--tono "texto extra para el prompt"]
import fs from "node:fs";
import { llamar } from "../../../herramientas/google.mjs";

const [guion, salida] = process.argv.slice(2);
const flag = (n, d) => {
  const i = process.argv.indexOf("--" + n);
  return i > 0 ? process.argv[i + 1] : d;
};
if (!guion || !salida) {
  console.error("uso: node herramientas/voz.mjs <guion.txt> <salida.wav> [--voz Orus] [--tono ...]");
  process.exit(1);
}

const PROMPT =
  "Hablá como un locutor de Montevideo, Uruguay, de unos 30 años. Acento rioplatense uruguayo bien marcado: " +
  "la ll y la y suenan como sh, voseo natural, entonación uruguaya y no mexicana ni neutra. " +
  (flag("tono") ||
    "Es un reel de Instagram que le habla al dueño de un comercio: arrancá con un golpe seco y seguro, " +
      "tono provocador pero cercano, como un amigo que te dice las cosas en la cara.") +
  (flag("ritmo") || " Ritmo rápido, pausas muy cortas.") + " Leé el texto completo, palabra por palabra, sin agregar ni sacar nada.";

// Cómo se dice lo que la voz lee mal. Solo cambia el texto que se manda a la voz: el guion (y los
// subtítulos) quedan con la ortografía real. "Scálerics" lo eligió Juan el 27-10 entre 4 pruebas.
const PRONUNCIA = { Scalerics: "Scálerics" };

let texto = fs.readFileSync(guion, "utf8").replace(/\s*\n\s*/g, " ").trim();
for (const [palabra, dicha] of Object.entries(PRONUNCIA)) texto = texto.replaceAll(palabra, dicha);
const j = await llamar("https://texttospeech.googleapis.com/v1/text:synthesize", {
  input: { prompt: PROMPT, text: texto },
  voice: { languageCode: "es-419", name: flag("voz", "Orus"), modelName: "gemini-2.5-pro-tts" },
  audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 48000 },
});
fs.writeFileSync(salida, Buffer.from(j.audioContent, "base64"));
console.log("voz lista:", salida);
