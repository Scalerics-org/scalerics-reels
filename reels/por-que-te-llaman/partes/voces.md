# Voces · por-que-te-llaman

Gemini TTS (`herramientas/voz.mjs`), una toma por archivo, recortar silencios con `silenceremove` y pegar con
`partes/armar-voz.mjs` (copiar el de `reels/por-que-el-99/partes/`). Armar `partes/guion-voz.txt` con todo en orden y
sin acotaciones (el `guion.txt` de la carpeta tiene acotaciones entre corchetes y prefijos NARRADOR/RUBEN), y usarlo
para `tiempos.mjs`.

| archivo | quién | voz | texto | tono |
|---|---|---|---|---|
| `orus1.txt` | Narrador | **Orus** | frases 1-7 (gancho → "…llegar al que decide.") | Narrador de los explicadores, uruguayo, curioso, con ritmo, sin vender. El gancho, pregunta de verdad, con una sonrisa de "¿a vos también te pasó?". "Porque el interés se enfría rápido." asentado, como quien revela el truco. "¿Qué tan rápido?" corto, con intriga. "más de dos mil empresas" claro. "Casi una de cada cuatro nunca contestó." con un mini peso en "nunca". "casi dos días" algo incrédulo. "multiplicaba las chances de llegar al que decide" con energía, remarcando "primera hora". "CRM" se dice "ce-erre-eme". |
| `ruben.txt` | Rubén | **Algenib** | "Yo le compré al que llamó primero." / "¿Y esta consulta de ayer?" | Dueño de distribuidora, grave, cansado, uruguayo, picante seco. La primera, satisfecho y canchero, como quien cuenta que hizo negocio ("obvio"). **Pausa de 0,5 s** y la segunda más lenta, bajando el tono: se da cuenta en voz alta de que él es el que no llamó. Ironía contra sí mismo, sin drama ni culpa exagerada. ~3,5 s en total. |
| `orus2.txt` | Narrador | **Orus** | "Un CRM anota…" → cierre | Igual que orus1, ahora como respuesta a Rubén. "al instante" y "le escribe solo" claros y contentos. "¿Querés llegar primero?" de colega, sin urgencia. "scalerics.com" va escrito "Scálerics punto com" en el .txt para que lo pronuncie bien. |

Pausas (las mete armar-voz): +0,3 s después del gancho; +0,3 s antes y después de "¿Qué tan rápido?"; +0,25 s después
de "nunca contestó"; 0,45 s antes de Rubén, 0,5 s entre sus dos líneas y 0,4 s después.
Si "CRM" sale en inglés ("si-ar-em") o "Scálerics" mal, regenerar SOLO esa frase y pegarla.

## Ronda 1 (15-11)
Cambio de guion del coordinador (G1): el tramo de Orus después del gancho pasa a "¿Qué tan rápido? Un estudio lo midió:
llamar en la primera hora multiplicaba las chances de llegar al que decide. Pero cuando les escribió a más de dos mil
empresas, casi una de cada cuatro nunca contestó. Las demás tardaron, en promedio, casi dos días." Texto en
`partes/orus1b.txt` (con un "Listo." al final que se descarta: así Gemini no corta la última palabra). 4 tomas; va la
`orus1b-4.wav` (el STT la oye entera; "decides" es el sesgo de siempre del STT). Las frases 1-2 siguen de `orus1-1.wav`;
Rubén (`ruben-2.wav`) y el cierre (`orus2-4.wav`) no cambian. Los tramos terminan 60-120 ms más tarde con fundido de
60 ms (S4: colas de "promedio," y "primero?").
