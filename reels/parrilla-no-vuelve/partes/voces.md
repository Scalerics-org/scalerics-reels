# parrilla-no-vuelve · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/parrilla-no-vuelve` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces (decisión del coordinador, 16-11: taller-presupuestos usa Charon y Puck en paralelo): **Raúl = Iapetus**, **Fabián = Achird**. Plan original: **Raúl = Charon** (nuevo, dueño de la parrilla; en el repo Charon solo hizo extras de fondo: el vecino del coro
de hacen-envios y Beto; acá es protagonista. Si suena viejo, cansado de más o a locutor, probar **Iapetus** con el mismo
tono), **Fabián = Puck** (nuevo, el mozo; Puck solo hizo a Fede en un coro de fondo. Alternativa: Achird), **Walter =
Umbriel** (la de siempre), **Graciela = Gacrux** (la de siempre), **Sofi = Achernar** (la de estetica-turnos y
trabajar-con-scalerics), **narrador del cartel = Rasalgethi**. Algenib NO (es Rubén).

**Tomas que se reusan (callback exacto, a propósito):** la 01 de Walter vuelve tal cual en Q1 y la 06 en Q4. No
generarlas de nuevo: que el que mira oiga la MISMA frase con la misma música, y que lo único que cambie sea la respuesta
de Raúl.

Ambiente: en el sábado (P1-P3, Q1) las voces van sobre murmullo de salón; en febrero (P5-P7) sobre el ventilador y
casi nada: ahí la voz suena más "sola" (un poco más de reverb de cuarto, -1 dB). Ninguna línea va con filtro de
celular (todo es en persona), salvo Sofi (videollamada).

Burbujas SIN voz (solo pop): "Ni idea." de Fabián, los seis pares de la ráfaga (P3), los contactos del celular, la
tarjeta de puntos, el panel, el aviso, los chips y los rótulos. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-walter.txt · "¡Impecable, Raúl! ¡Volvemos!" | Walter | Umbriel | Cliente uruguayo de 40 años saliendo de una parrilla un sábado a la noche, contento y lleno, con confianza de habitué: "¡impecable!" con ganas, "¡volvemos!" como promesa alegre, a media voz de salón ruidoso. ~1,5 s. | Sin filtro. Se usa dos veces (P1 y Q1). |
| 02-raul.txt · "¡Cuando quieras, maestro!" | Raúl | Charon | Dueño de una parrilla uruguaya de 52 años, anfitrión cálido y canchero, con la sonrisa en la voz, levantando la pinza: "maestro" como el apodo de todos los sábados. Nada de exagerado. ~1,1 s. | Sin filtro. |
| 03-raul.txt · "¿Quién era?" | Raúl | Charon | El mismo Raúl, de costado al mozo, bajito y rápido, sin cambiar la sonrisa: una confesión en voz baja, casi entre dientes. Es la frase de la portada: que se entienda clarito. ~0,7 s. | Sin filtro, -2 dB (es un aparte). |
| 04-mozo.txt · "¿Y si les avisás a los del sábado?" | Fabián | Puck | Mozo uruguayo de 28 años, un martes vacío, apoyado en una silla con el trapo al hombro; sugerencia tranquila y lógica, de buena fe, sin sobrar a nadie. ~1,7 s. | Sin filtro. Reverb de salón vacío muy leve. |
| 05-raul.txt · "¿A quién? ¿A maestro?" | Raúl | Charon | Raúl en primer plano después de una pausa, mirando el celular: seco, grave, sin levantar la voz; "¿a quién?" corto y "¿a maestro?" con la ironía en el tiempo y no en el tono, una pausita antes de "maestro". Nada de enojo ni de queja: la verdad. ~1,2 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena enojado o a reto, regenerar. En pantalla va "¿A 'maestro'?" con comillas. |
| 06-walter.txt · "¡Raúl! ¿Te acordás de mí?" | Walter | Umbriel | Walter entrando a la parrilla después de semanas, contento de volver, un poco expectante: "¡Raúl!" de saludo con los brazos abiertos, "¿te acordás de mí?" con una sonrisa que espera un sí. ~1,3 s. | Sin filtro. Se usa dos veces (P7 y Q4). |
| 07-raul.txt · "¡Obvio, maestro!" | Raúl | Charon | Raúl saliendo de atrás de la parrilla a abrazarlo, sonrisa enorme y exagerada, demasiado seguro: la mentira piadosa del anfitrión. ~0,8 s. | Sin filtro. |
| 08-narrador.txt · "Una tarjeta de puntos más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono de los carteles de abren-hoy-completo, las-siete-y-cincuenta-y-nueve y estetica-turnos). | Frase nueva: generar. Comparar tono y largo contra `reels/estetica-turnos/assets/voice/` (narrador, ~2,1-2,3 s). Si pasa de 2,4 s, atempo 1,06. |
| 09-raul.txt · "¡Te espero, Walter!" | Raúl | Charon | Raúl mirando de reojo la tablet y después a Walter, contento de verdad y un poco orgulloso de saber el nombre: "¡Walter!" bien claro y con cariño. ~0,9 s. | Sin filtro. Es el callback de 02: mismo volumen y energía, distinta palabra final. |
| 10-graciela.txt · "¡Vamos el martes!" | Graciela | Gacrux | Señora de 65 años en su living, leyendo el aviso con la provoleta de regalo, decidida y contenta, como quien ya avisa a las amigas. ~0,8 s. | Sin filtro. |
| 11-raul.txt · "Walter. Tira y morcilla dulce. Faltaste dos sábados." | Raúl | Charon | Raúl en la parrilla, señalándolo con la pinza, sin mirar ninguna pantalla: "Walter." seguro, "tira y morcilla dulce" de memoria como quien recita el pedido, y "faltaste dos sábados" seco y con media sonrisa, reto en broma de amigo. Pausitas cortas entre las tres frases. ~2,3 s. | Sin filtro. Si pasa de 2,5 s, atempo 1,06. Que "morcilla dulce" se entienda (si el STT oye otra cosa, regenerar). |
| 12-sofi.txt · "Comentá VUELVE y te mando cómo funciona para tu parrilla." | Sofi | Achernar | Sofi de Scalerics en videollamada, 28 años, cálida y clara, de colega a colega, sin tono de aviso ni urgencia; "VUELVE" un poco marcado (es la palabra para comentar). ~2,9 s. | Un poco de "llamada" muy leve (lowpass 7 kHz), nada que la ensucie. Si pasa de 3,1 s, atempo 1,08. Comparar con `reels/estetica-turnos` (s1). |

Si alguna voz de siempre (Umbriel, Gacrux, Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra de un
personaje recurrente: avisar.

## Tomas elegidas (constructor, 16-11; ver partes/procesar.sh)
w1 01-walter-a (atempo 1,08) · r1 02-raul-a · r2 03-raul-a (-2 dB) · f1 04-mozo-a (Achird, atempo 1,06) · r3 05-raul-a
(pausa interna 0,5 → 0,3 s) · w2 06-walter-b (atempo 1,08, pausa 0,41 → 0,15 s; la a decía "acuerdas") · r4 07-raul-b (atempo
1,08; la a sonaba "yo maestro") · narrador 08-narrador-a (Rasalgethi, atempo 1,05: 2,05 s) · r5 09-raul-e (las a-d el STT
las oía "espero vuelta/guardara") · g1 10-graciela-a · r6 11-raul-e2 (la e con la segunda pausa 0,2 s más corta, atempo
1,18: 3,62 s; la c decía "pira" y la d "tigre") · s1 12-sofi-b (atempo 1,15, lowpass 7 kHz). Todas con "oyó:" igual al texto
(salvo tildes que el STT no marca: "Comenta", "avisas").
