# dice-cuarenta · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/dice-cuarenta` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces de siempre: **Rubén = Algenib**, **Nico = Fenrir** (fija desde ya-lo-cargo), **narrador del cartel =
Rasalgethi**. Graciela, Marta y Walter no hablan en este reel (solo burbujas).

**"Excel":** que se oiga "éxel", como se dice en Uruguay. Si Gemini lo dice en inglés marcado ("ex-SEL" con la ese
aspirada o "ékschel"), probar el .txt con "Éxcel" o "éxel"; en `palabras.json` y en los subtítulos va "Excel".

Burbujas SIN voz (solo pop): la de Nico del cuadro 0 ("Rubén, ¿hay aceite? Graciela quiere 40."), Marta ("¿Tenés
aceite? 40."), Walter ("40 de aceite, para mañana."), la de Graciela en la parte 2. Tampoco se dicen los remitos, el
cartel, el celular, el aviso del monitor ni la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-ruben.txt · "El Excel dice cuarenta." | Rubén | Algenib | Dueño de distribuidora de 55 años, grave y cansado, mirando la planilla en el monitor de su oficina con el mate en la mano; lo dice con total seguridad, como quien lee un dato que no se discute, sin mirar a nadie. ~1,3 s. | Sin filtro; un poco de reverb corta de galpón (aecho chico) porque habla desde la oficina hacia el depósito: probar. Es el gancho (entra a ~0,25 s). |
| 02-nico.txt · "¡Vendido!" | Nico | Fenrir | Vendedor uruguayo de 25 años, simpático y rápido, pulgar arriba, al celular con la clienta: contento, seguro, como quien cierra una venta fácil. ~0,5 s. | Sin filtro. |
| 03-nico.txt · "¡Vendido!" | Nico | Fenrir | El mismo Nico caminando por el pasillo, más rápido y más entusiasta que la 02, mirando el cartel de reojo. ~0,45 s. | Sin filtro. **Otra toma que la 02.** |
| 04-nico.txt · "¡Vendido!" | Nico | Fenrir | Nico ya en piloto automático, cantadito, sin mirar nada, casi de memoria. ~0,4 s. | Sin filtro. **Otra toma que la 02 y la 03** (si dos suenan iguales, atempo 1,1 a la tercera). |
| 05-nico.txt · "Pero el Excel dice cuarenta." | Nico | Fenrir | Nico frente a un pallet con tres cajas, de buena fe y un poco desconcertado, mostrando el celular: "pero si dice…", sin quejarse ni culpar a nadie. ~1,3 s. | Sin filtro. Tiene que sonar al eco de la 01 (misma frase), pero con duda. |
| 06-ruben.txt · "El Excel nunca bajó al depósito." | Rubén | Algenib | Rubén girando la cabeza despacio hacia Nico; seco, grave, sin levantar la voz, con la ironía en el tiempo y no en el tono: una verdad que sabía hace años. Leve pausa antes de "al depósito". Nada de reírse ni de suspirar. ~1,8 s. | Sin filtro. Es EL remate: va después de la pausa de la paloma, con la cama baja. Si suena enojado o a sermón, regenerar. |
| 07-nico.txt · "Tranqui, ya lo actualicé." | Nico | Fenrir | Nico tocando el celular, orgulloso y servicial, como quien soluciona algo: "tranqui" relajado, "ya lo actualicé" con una sonrisa. ~1,2 s. | Sin filtro. Escuchar que diga "actualicé" (pasado, acento en la última); si sale "actualice", regenerar. |
| 08-ruben.txt · "Bárbaro. Ahora miente actualizado." | Rubén | Algenib | Rubén mirando el 37 sobre el pallet vacío; "Bárbaro." plano y lento, una pausa, y "Ahora miente actualizado." seco, cansado, con mala leche contenida; ni gritado ni triste. ~2,0 s. | Sin filtro. Pausa de ~0,35 s después de "Bárbaro." (estirarla con ffmpeg si sale pegada). Es el remate del remate. |
| 09-narrador.txt · "Un sistema más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". | **No generar: reusar `reels/ya-lo-cargo/assets/voice/narrador.wav`** (mismo texto). |
| 10-nico.txt · "Rubén, ¿hay aceite?" | Nico | Fenrir | Nico al pie de la escalera, mirando hacia la oficina de arriba, pregunta de todos los días, levantando un poco la voz. ~0,9 s. | Sin filtro. |
| 11-ruben.txt · "Fijate vos." | Rubén | Algenib | Rubén desde la oficina, sin levantar la vista del mate, tranquilo, apenas cansado de que le pregunten: "fijate vos" como quien dice "para eso está". ~0,7 s. | Sin filtro; la misma reverb corta que la 01. |
| 12-nico.txt · "¡Vendido!" | Nico | Fenrir | Nico mirando el celular, contento y seguro, esta vez con razón. ~0,5 s. | Sin filtro. Puede ser la 02 si suena bien (callback); si no, otra toma. |
| 13-nico.txt · "¿Y? ¿Cuántos hay?" | Nico | Fenrir | Nico al lado de Rubén, que está probando el cartel sacando y poniendo una caja; curioso, medio divertido. ~0,9 s. | Sin filtro. |
| 14-ruben.txt · "Los que dice." | Rubén | Algenib | Rubén frente al pallet lleno, mate en la mano; seco y satisfecho, con media sonrisa que no se ve: el desconfiado que por fin confía. ~0,7 s. | Sin filtro. Si suena a pregunta, regenerar (tiene que caer). |

Si alguna voz de siempre no estuviera disponible, no cambiarla por otra de un personaje recurrente: avisar.
