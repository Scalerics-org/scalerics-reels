# gym-cupo · voces (Gemini TTS; probar 2-3 tomas de cada una en partes/tomas/, recortes en partes/rec/)

Sin Orus. Generar desde `reels/gym-cupo` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."` (el tono de cada una
está en `partes/lineas.tsv`), o con los scripts de `reels/pilates-cuota/partes/` (reintentar.sh, medir-tomas.sh,
procesar.sh) adaptados. Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el .txt).

Voces:
- **Mauro = Sadaltager** (NUEVO personaje, dueño y profe de spinning, ~38). Sadaltager se usó una sola vez (Héctor,
  dist-cliente-grande, 17-11, un señor mayor): acá con tono de profe joven, canchero y cálido. Si suena a señor mayor o
  a locutor, probar **Algieba** (también usada una sola vez, el contador por altavoz) con el mismo tono. Que NO sea
  Zubenelgenubi (Joaco, el instructor de pilates-cuota) ni Puck/Fenrir/Achird (Maxi, Nico, Fabián).
- **Majo = Zephyr** (NUEVA, alumna ~30). Zephyr se usó una sola vez (Mica, tienda-tenes-stock). Si suena aniñada,
  probar **Despina**.
- **Graciela = Gacrux** (la de siempre).
- **Narrador del cartel = Rasalgethi**, frase NUEVA: "Un sistema de reservas más tarde." Comparar tono y largo con
  `reels/ferreteria-encargo/assets/voice/narrador.wav` ("Un sistema más tarde."); objetivo ~2,4-2,7 s.
- Sole, Lucía, Rodri y los alumnos NO hablan (burbujas y pops).

**Audio de WhatsApp (02):** filtro de celular, que se oiga que es un audio: highpass 300 Hz + lowpass 3,4 kHz, un poco
de compresión, -2 dB; nada de ruido sintético. En la parte 2 Majo habla en persona (06): sin filtro.

**Micrófono de vincha (04, 07, 09):** Mauro habla a la sala por el micrófono: un poco de "sala" que se note sin
ensuciar (eco corto muy bajo, p. ej. `aecho=0.8:0.6:40:0.15`, y un highpass 120 Hz). La 03 y la 10 sin efecto (en la
03 le habla al celular; la 10 es a cámara, limpia). **La voz siempre ≥ 6 LU sobre la música de spinning**: bajar la
cama debajo de 04, 07, 08 y 09.

| archivo | quién | voz | texto | largo objetivo | proceso |
|---|---|---|---|---|---|
| 01-mauro | Mauro | Sadaltager | Veintidós "yo voy". Hoy explota. | ~1,9 s | Sin filtro. Arranca a ~0,35 s del cuadro 0. Que "yo voy" se oiga como cita (pausa mínima antes). |
| 02-majo | Majo | Zephyr | Mauro, ¿hay lugar a las siete? | ~1,6 s | Filtro de celular. |
| 03-mauro | Mauro | Sadaltager | Llena, Majo. Perdoná. | ~1,1 s | Sin filtro. Amable, sin culpa. |
| 04-mauro | Mauro | Sadaltager | Los "yo voy" no pedalean. | ~1,5 s | Micrófono de vincha. EL remate: va después de una pausa de ≥ 0,7 s con la cama casi muda. Si suena enojado o a reto, regenerar. |
| 05-narrador | Narrador | Rasalgethi | Un sistema de reservas más tarde. | ~2,5 s | Frase nueva. Si pasa de 2,8 s, atempo. |
| 06-majo | Majo | Zephyr | ¿Quedan tres? ¡La siete! | ~1,4 s | Sin filtro. Pausa corta entre las dos frases. |
| 07-mauro | Mauro | Sadaltager | Catorce reservas. Pedalean catorce. | ~1,8 s | Micrófono de vincha, misma "sala" que 04 (es el callback: que se oiga igual). |
| 08-graciela | Graciela | Gacrux | Profe, ¿y ahora la toalla dónde la cuelgo? | ~1,8 s | Sin filtro (está en la sala). Si pasa de 2,0 s, atempo 1,06. |
| 09-mauro | Mauro | Sadaltager | En el cuello, Graciela. | ~0,9 s | Micrófono de vincha. |
| 10-mauro | Mauro | Sadaltager | Comentá CUPO y te mando cómo funciona para tu gimnasio. | ~3,0 s | Sin efecto, a cámara. "CUPO" un poco marcado. Si pasa de 3,2 s, atempo 1,06. |

Si alguna voz de siempre (Gacrux, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
