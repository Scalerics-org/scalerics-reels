# te-queda · voces (Gemini TTS, una toma por archivo)

Sin Orus. Las líneas, voces y tonos están en `partes/lineas.tsv`; `node partes/voces.mjs` genera las tomas que falten
en `partes/tomas/` (a y b; `TOMAS=cde` para más), de a una y reintentando si la cuota corta (429). Recortes con
silenceremove en `partes/rec/`; los finales en `assets/voice/` (todos verificados con tiempos.mjs: "oyó" coincide).

Voces de siempre: Rubén = Algenib, Graciela = Gacrux, Héctor = Sadaltager, Walter = Umbriel, Marta = Aoede, narrador del
cartel = Rasalgethi (se reusa `narrador.wav` de anotamelo: "Un sistema más tarde.").

| final | toma | texto | proceso | dura |
|---|---|---|---|---|
| g1 | 01-graciela-a | ¿Te queda polenta? | (se reusa en Q1) | 1,04 |
| r1 | 02-ruben-c | Ya me fijo. | (ronda 2: la b clipeaba y la a se oía "yo me fijo") | 1,06 |
| r2 | 03-ruben-b | No, no queda. | | 1,22 |
| w1 | 04-walter-c | ¿Y fideos? | (a y b salían "IFE"/"sífilis"; c con tono más claro) | 0,91 |
| m1 | 05-marta-b | ¿Azúcar te queda? | adeclip, -1,5 dB (ronda 2: sin muestras a 0 dBFS) | 1,02 |
| h1 | 06-hector-b | ¿Te queda dulce de leche? | atempo 1,1 | 1,53 |
| r3 | 07-ruben-a | Queda uno. | (ronda 2) recortada desde 0,22 s (clic y silencio al principio) | 0,78 |
| h2a / h2b | 08-hector-c | "Ah, no." (0-0,56) / "Era para saber." (desde 1,42) | partida en dos: la pausa la arma gen.mjs (ronda 1) | 0,56 / 0,89 |
| h3 | 09-hector-c | ¿Y yerba? | (ronda 1: la a se oía "bizerba") | 0,69 |
| r4 | 11-ruben-a | Quedan tres. | adeclip | 0,87 |
| h4 | 12-hector-a | ¿Y dulce de leche? | | 1,01 |
| r5 | 13-ruben-b | Doce. | | 0,63 |
| h5 | 14-hector-a | Era para saber. | adeclip | 0,88 |
| r6 | 15-ruben-a | Ahora sabés. | | 1,00 |

Burbujas sin voz: los dos "No." de P4 y P5. Sin decir: el chip, las cajas, la tablet, la línea chica.
