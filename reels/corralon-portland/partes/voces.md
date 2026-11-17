# corralon-portland · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/corralon-portland` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces: **Gustavo = Alnilam** (nuevo, dueño del corralón, ~50; firme y grave, uruguayo de mostrador; Alnilam no es de
ningún personaje recurrente: solo salió en reels viejos sin elenco y como alternativa no usada en taller-presupuestos; si
suena a locutor o a Charon/Óscar, probar Algieba con el mismo tono), **Beto = Sadachbia** (nuevo, maestro de obra, ~45,
SOLO en audios de WhatsApp; vivo, apurado, canchero; si no convence, Algieba), **Tito = Enceladus** (nuevo, albañil
veterano, ~65; voz gastada y tranquila; Enceladus solo salió en reels viejos sin elenco), **Sofi = Achernar** (la de
siempre), **narrador del cartel = Rasalgethi, audio REUSADO** de `reels/abren-hoy-completo/assets/voice/narrador.wav`
("Un agente de IA más tarde."). Ninguna es de un personaje recurrente de la línea (Algenib = Rubén, Gacrux = Graciela,
Fenrir = Nico, Umbriel = Walter, Sadaltager = Héctor, Kore = Lorena, Leda = Carolina, Charon = Óscar/Raúl, Puck =
Maxi/Fabián, Zubenelgenubi = Sergio, Despina = Jimena, Iapetus, Achird, Schedar = el proveedor de la-lista): no usarlas.
Que Gustavo y Beto no se confundan: Gustavo grave y pausado, Beto más agudo, rápido y con el filtro de audio.

**Cuatro callbacks reusan el MISMO audio** (es el chiste: la frase idéntica, otra respuesta). No se generan de nuevo:
- Q1 · Beto "Gustavo, ¿tenés portland? Cuarenta bolsas. Hoy llenamos la losa." = la toma final de `01-beto`.
- Q1 · Gustavo "¡Ya te digo!" = la toma final de `02-gustavo`.
- Q3 · Tito "¿Me das una bolsita de portland?" = la toma final de `08-tito`.
- Q4 · Beto "Ya las están bajando." = la toma final de `06-beto`; y Gustavo "Es de la casa." = la toma final de
  `04-gustavo`. Por eso `03` y `04` (y `05` y `06`) van en archivos separados: se pegan en la parte 1 con ~0,25 s de
  silencio y se reusan sueltos en la parte 2. Al elegir la toma de `04-gustavo`, que sirva para las dos: seguro y
  tranquilo, sin soberbia (en P3 se lee como confianza; en Q4, con la imagen de su camión, como verdad).

Burbujas SIN voz (solo pop): los mensajes del chat de la parte 1 ("¿A cuánto el portland?", "¿Tenés arena gruesa?",
"¿Llevan a obra hoy?", "¿Hola?"), el "Tengo las 40. ¿Te las mando?" de Gustavo, el conteo 37-38-39-40, todo lo que
escribe el agente, la respuesta de Beto en la parte 2 ("Dale. A las 9, Rivera 2340."), el chat de 300 bolsas, el panel,
los rótulos y la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-beto.txt · "Gustavo, ¿tenés portland? Cuarenta bolsas. Hoy llenamos la losa." | Beto | Sadachbia | Maestro de obra uruguayo de 45 años mandando un audio de WhatsApp a las siete menos cuarto desde la obra, apurado pero de buen humor, de confianza con el dueño del corralón: "Gustavo" corto para llamar, la pregunta rápida, "cuarenta bolsas" claro (es el número), "hoy llenamos la losa" como explicación del apuro. Ritmo de audio de WhatsApp, no de locutor. ~2,7 s. | Filtro audio de WhatsApp (highpass 250 Hz, lowpass 6 kHz, compresión suave) + cama de obra CC0 muy baja si la toma no la trae. Es el gancho (entra a ~0,25 s). Se reusa idéntica en Q1. Si pasa de 3,0 s, atempo 1,06-1,10. |
| 02-gustavo.txt · "¡Ya te digo!" | Gustavo | Alnilam | Dueño de un corralón uruguayo de 50 años, lunes temprano con la fila en el mostrador, colgando el teléfono y saliendo al patio: rápido, servicial, en movimiento, como quien de verdad va a ir a fijarse. ~0,7 s. | Sin filtro. Se reusa idéntica en Q1 (ahí suena de costumbre y llega tarde: no cambiarla). |
| 03-gustavo.txt · "Beto espera." | Gustavo | Alnilam | El mismo Gustavo de vuelta en el mostrador, un poco agitado de ir y venir, levantando un dedo hacia el albañil que le señala el celular; tranquilo, seguro, sin apuro. ~0,6 s. | Sin filtro. Pegar con ~0,25 s de silencio antes de 04. |
| 04-gustavo.txt · "Es de la casa." | Gustavo | Alnilam | Gustavo terminando la frase con orgullo de veinte años de mostrador, convencido: el cliente de siempre, que no se va a ningún lado. Seguro y amable, sin soberbia ni chiste. ~0,8 s. | Sin filtro. Se reusa idéntica en Q4 (ver arriba: elegir la toma que sirva para las dos). |
| 05-beto.txt · "Ya está, Gustavo. Me contestó otro." | Beto | Sadachbia | El mismo Beto en otro audio de WhatsApp, buena onda total y sin culpa, como quien da una novedad práctica: "ya está" resuelto, "me contestó otro" como explicación obvia, ni disculpa ni reproche. ~1,6 s. | Mismo filtro que 01 y la misma cama de obra un poco más presente (camión descargando lejos). Pegar con ~0,2 s antes de 06. |
| 06-beto.txt · "Ya las están bajando." | Beto | Sadachbia | Beto, el mismo audio, contento y práctico, mirando cómo descargan las bolsas en la obra. ~1,0 s. | Mismo filtro. Se reusa idéntica en Q4. |
| 07-gustavo.txt · "Era de la casa." | Gustavo | Alnilam | Gustavo en primer plano mirando la pila de 40 bolsas, después de una pausa; seco, grave, sin levantar la voz, con la ironía en el tiempo y no en el tono; "era" apenas marcado. Nada de enojo ni de queja ni de lástima: la verdad que todo dueño de corralón conoce. ~1,0 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena triste, enojado o a reto, regenerar. |
| 08-tito.txt · "¿Me das una bolsita de portland?" | Tito | Enceladus | Albañil uruguayo de 65 años, el de siempre de la fila, con los codos en el mostrador; tranquilo, amable, sin apuro y sin saber nada de lo que pasó: "bolsita" con cariño, como quien pide un cafecito. ~1,3 s. | Sin filtro. Se reusa idéntica en Q3. |
| 09-narrador.txt · "Un agente de IA más tarde." | Narrador del cartel | Rasalgethi | (no se genera) | REUSAR `reels/abren-hoy-completo/assets/voice/narrador.wav`. Comprobar con tiempos.mjs que dice exactamente esto. |
| 10-gustavo.txt · "Ya le dijo." | Gustavo | Alnilam | Gustavo con el tubo en la mano, mirando el celular que ya contestó y confirmó el pedido; sorprendido y divertido, en voz baja, con media sonrisa: se dio cuenta de que el "ya te digo" llegó tarde, esta vez a favor. ~0,7 s. | Sin filtro. Pausa de ~0,2 s después del ding. |
| 11-gustavo.txt · "Las que quieras, Tito." | Gustavo | Alnilam | Gustavo atendiendo el mostrador tranquilo, con tiempo, cálido y con media sonrisa, mientras le carga la bolsa; nada de vendedor: de vecino de mostrador. ~1,1 s. | Sin filtro. |
| 12-sofi.txt · "Comentá OBRA y te mando cómo funciona para tu corralón." | Sofi | Achernar | Sofi de Scalerics en videollamada, 28 años, cálida y clara, de colega a colega, sin tono de aviso ni urgencia; "OBRA" un poco marcado (es la palabra para comentar). ~3,0 s. | Lowpass 7 kHz muy leve (videollamada). Si pasa de 3,3 s, atempo 1,08-1,12. |

Si alguna voz de siempre (Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
