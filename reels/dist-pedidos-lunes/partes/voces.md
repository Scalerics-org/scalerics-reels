# dist-pedidos-lunes · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/dist-pedidos-lunes` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces de siempre: **Rubén = Algenib**, **Graciela = Gacrux**, **Walter = Umbriel**, **Nico = Fenrir**, **narrador del
cartel = Rasalgethi**. Marta, Beto, Nelly y Fede no hablan en este reel (solo burbujas).

Burbujas SIN voz (solo pop): la foto de Marta, la ráfaga ("Lo de siempre.", "Lo mismo que la semana pasada, más harina.", "▶
2:51", la foto torcida), **"Rubén, ¿y mi pedido?"** de Walter, el mensaje perdido de las 8:04, **"Rubén, cambié todo.
Te mando audio." + "▶ 6:40"** de Graciela, y todo lo de las interfaces (catálogo, panel, tablet) y la tarjeta de
cierre. Se tiene que entender sin sonido.

**"Lo de siempre"** se dice cinco veces en el reel (01, 02, 04, 05, 07): que suene siempre igual de natural, de corrido,
sin comillas en la voz. En los subtítulos va con el recuadro verde.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-graciela.txt · "Y nada, Rubén, así que mandame lo de siempre. ¡Besos!" | Graciela (audio de chat) | Gacrux | Dueña de una rotisería, cariñosa y charlatana, cerrando un audio larguísimo de cuatro minutos como quien se despide por teléfono: "y nada" de relleno, "lo de siempre" liviano, "¡Besos!" cantadito. ~2,4 s sin acelerar. | **Acelerado como el 2x del celular:** `atempo=1.8` (sin cambiar el tono) → ~1,3 s; **filtro de audio de chat**: highpass=f=250, lowpass=f=4000, un poco de compresión. Es lo primero que se oye (entra a ~0,15 s): tiene que entenderse "lo de siempre" aunque esté rápido; si no se entiende, atempo 1.6. |
| 02-ruben.txt · "Cuatro minutos para decir lo de siempre." | Rubén | Algenib | Dueño de distribuidora de 55 años, grave y cansado, mirando la duración del audio en el celular; seco, sin levantar la voz, la ironía en el tiempo: pausa chiquita antes de "lo de siempre", que cae plano. Nada de reírse ni de suspirar. ~1,9 s. | Sin filtro. |
| 03-ruben.txt · "¿Eso es un siete o una mosca?" | Rubén | Algenib | El mismo Rubén haciendo zoom con dos dedos en la foto de una lista escrita a mano; de verdad no sabe, entrecierra los ojos; la pregunta sincera, con "mosca" seco al final. ~1,3 s. | Sin filtro. Si suena a enojo, regenerar: es desconcierto. |
| 04-walter.txt · "Dejá, Rubén. Lo de siempre se lo pedí a otro." | Walter (audio de chat) | Umbriel | Dueño de un bar de cuarenta y pico, sin enojo ni drama, práctico y un poco apurado: "dejá" amable, como quien no quiere molestar; "se lo pedí a otro" dicho como un dato, sin maldad. ~2,0 s. | **Filtro de audio de chat** (el mismo de la 01, sin acelerar). |
| 05-ruben.txt · "Lo de siempre era yo." | Rubén | Algenib | Rubén mirando el celular después de una pausa larga; seco, grave, bajito, sin autocompasión ni tristeza: una verdad que le cae de golpe, dicha casi para adentro, con mala leche contenida. Leve pausa antes de "era yo". ~1,2 s. | Sin filtro. Es EL remate: va después del tic del reloj, con la cama baja. Si suena a llanto o a sermón, regenerar. |
| 06-narrador.txt · "Un catálogo de pedidos más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". ~2,1 s. | Toma nueva. Que entre en 2,4 s con el cartel; si pasa de 2,3 s, atempo 1.1. Fallback: reusar `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde.") y cambiar el texto del cartel. |
| 07-graciela.txt · "Lo de siempre." | Graciela | Gacrux | La misma Graciela en su rotisería, otro lunes, tocando un botón en el celular: contenta, práctica, en un segundo; "lo de siempre" como quien tilda algo. ~0,8 s. | Sin filtro (está en cuadro, no es un audio). Es el callback de la 01: el mismo "lo de siempre", ahora sin los cuatro minutos. |
| 08-ruben.txt · "Siete. Sin mosca." | Rubén | Algenib | Rubén mirando el pedido de Marta en su panel, con el mate; satisfecho sin sonreír, como quien tilda: "Siete." plano, una pausa, "Sin mosca." seco, con media sonrisa que no se ve. ~1,1 s. | Sin filtro. Pausa de ~0,3 s después de "Siete." (estirarla con ffmpeg si sale pegada). |
| 09-ruben.txt · "Ocho y cinco. ¿Y ahora qué hago hasta las once?" | Rubén | Algenib | Rubén mirando el reloj de pared, con el mate lleno, desconcertado de verdad de que le sobre la mañana: "Ocho y cinco." como un dato, pausa, y la pregunta sincera, un poco perdido, con humor seco. ~2,4 s. | Sin filtro. Pausa de ~0,3 s después de "cinco." Que se oiga "ocho y cinco" (la hora), no "ocho y cinco" como número suelto. |
| 10-nico.txt · "¿Vender?" | Nico | Fenrir | Vendedor uruguayo de 25 años, asomado a la puerta de la oficina con el maletín, simpático, como quien dice lo obvio con una sonrisa, sin sobrar a nadie. ~0,5 s. | Sin filtro. |
| 11-ruben.txt · "Comentá PEDIDOS y te mando cómo funciona para tu distribuidora." | Rubén | Algenib | Rubén mirando a cámara con el mate, tranquilo y de colega, de dueño a dueño: "Comentá pedidos" claro, con un poco más de peso en "pedidos", y el resto de corrido, con media sonrisa; nada de locutor ni de aviso, nada de urgencia. ~3,2 s. | Sin filtro. Si Gemini deletrea PEDIDOS por las mayúsculas, generar con "pedidos" en minúscula (en subtítulos y pantalla va PEDIDOS). Que se oiga "comentá" con acento en la última. |

Si alguna voz de siempre no estuviera disponible, no cambiarla por otra de un personaje recurrente: avisar.
