# ferreteria-encargo · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/ferreteria-encargo` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "<tono>"`.
Recortar silencios (silenceremove) en `partes/rec/`; los finales en `assets/voice/`. Medir cada línea con `tiempos.mjs`
("oyó:" tiene que coincidir con el .txt). Copiar la forma de `reels/corralon-portland/partes/procesar.sh`.

Voces: **Gustavo = Alnilam** y **Tito = Enceladus** (los de corralon-portland: mismo local, que se reconozcan),
**Susana = Vindemiatrix** (nueva para este personaje; en el repo Vindemiatrix solo hizo a Ceci de pilates-cuota, 17-11;
fallback Erinome; no usar Gacrux = Graciela, Sulafat = Inés, Autonoe = Adriana, Aoede = Paola, Callirrhoe = Vero, ni las
que use `estetica-sesiones` en la misma corrida: confirmar con su voces.md antes de generar), **narrador del cartel =
Rasalgethi**: audio REUSADO de `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde.", 2,26 s), como
dice-cuarenta. No se genera. Que Susana y Gustavo no se confundan: Susana más aguda y suave; Gustavo grave y pausado.

**Tomas que se reusan (callback exacto, a propósito):**
- `01-susana` en P1 y Q1 (el mismo pedido; esta vez se carga en la tablet).
- `03-gustavo` ("Dejame tu número.") en P1b, P5, Q1 y Q5: cuatro veces la MISMA toma; por eso va en archivo aparte de
  `02`. Elegir una toma neutra y servicial que funcione como costumbre (P1b), como reflejo (P5) y como pie para "Ya lo
  tenés." (Q5).
- `04-tito` en P2 y Q2.
- `08-susana` ("¿Me encargás este?") en P5 y Q5. Por eso `07` ("Ya lo compré.") va aparte: se pegan en P5 con ~0,2 s.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-susana.txt · "Gustavo, ¿tenés este cartucho? Me gotea la canilla." | Susana | Vindemiatrix | Señora uruguaya de 60 años en el mostrador de la ferretería del barrio, levantando una bolsita con la pieza rota; amable, de confianza con el ferretero, un poco preocupada por la canilla: "Gustavo" para llamar, "este cartucho" mostrando, "me gotea la canilla" como explicación. Sin apuro, nada de locutora. ~2,6 s. | Sin filtro. Es el gancho (entra a ~0,15 s). Se reusa idéntica en Q1. Si pasa de 2,9 s, atempo 1,06-1,08. |
| 02-gustavo.txt · "Ese no me queda. Te lo encargo." | Gustavo | Alnilam | Dueño de ferretería uruguayo de 50 años, servicial y seguro, después de medir la pieza con el calibre: "ese no me queda" sin drama, "te lo encargo" como solución de todos los días. ~1,6 s. | Sin filtro. Pegar con ~0,2 s antes de 03 en P1/P1b. |
| 03-gustavo.txt · "Dejame tu número." | Gustavo | Alnilam | El mismo Gustavo arrancando un pedazo de papel, de oficio, como lo dijo mil veces: neutro, amable, rápido. ~0,9 s. | Sin filtro. Se reusa idéntica en P5, Q1 y Q5. |
| 04-tito.txt · "Seis tornillos del ocho." | Tito | Enceladus | Albañil veterano de 65 años con los codos en el mostrador, tranquilo, pidiendo lo de siempre como quien pide un café. ~1,3 s. | Sin filtro. Se reusa idéntica en Q2. |
| 05-susana.txt · "Gustavo, ¿llegó lo mío?" | Susana | Vindemiatrix | La misma Susana tres semanas después, esperanzada y amable, sin reproche; "lo mío" con naturalidad, como si él supiera qué es. ~1,3 s. | Sin filtro. Es la frase de la portada. |
| 06-gustavo.txt · "Elegí." | Gustavo | Alnilam | Gustavo con el cajón de encargos abierto hacia ella, después de una pausa; seco, bajo, con la ironía en el tiempo y no en el tono, media sonrisa amarga; nada de enojo, ni de desprecio, ni de chiste marcado. ~0,5 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena a reto o a burla, regenerar. |
| 07-susana.txt · "Ya lo compré." | Susana | Vindemiatrix | Susana, amable y práctica, sin culpa ni enojo, como quien da una novedad: ya lo resolvió. ~0,8 s. | Sin filtro. Pegar con ~0,2 s antes de 08. |
| 08-susana.txt · "¿Me encargás este?" | Susana | Vindemiatrix | Susana levantando otra bolsita (el flotador), con toda la confianza del mundo, simpática, como si nada. ~0,9 s. | Sin filtro. Se reusa idéntica en Q5. |
| 09-narrador.txt · "Un sistema más tarde." | Narrador del cartel | Rasalgethi | (no se genera) | REUSAR `reels/ya-lo-cargo/assets/voice/narrador.wav`. Comprobar con tiempos.mjs que dice exactamente esto. |
| 10-susana.txt · "¡Llegó lo mío!" | Susana | Vindemiatrix | Susana en su cocina leyendo el WhatsApp, contenta y sorprendida, para sí misma, con la canilla goteando al lado. ~0,9 s. | Sin filtro (ambiente de cocina muy bajo, la gota). |
| 11-susana.txt · "Ya lo tenés." | Susana | Vindemiatrix | Susana con media sonrisa pícara, señalando la tablet: le gana de mano a Gustavo, cariñosa. ~0,8 s. | Sin filtro. |
| 12-gustavo.txt · "Comentá ENCARGO y te mando cómo funciona para tu ferretería." | Gustavo | Alnilam | Gustavo a cámara, de dueño de ferretería a dueño de ferretería, cálido y claro, sin tono de aviso ni urgencia; "ENCARGO" un poco marcado (es la palabra para comentar). ~3,3 s. | Sin filtro. Si pasa de 3,5 s, atempo 1,06-1,08. |

Burbujas SIN voz (solo pop): el "?" de P3, el papelito, todo lo de la tablet y los celulares, los rótulos y la línea
chica. Se tiene que entender sin sonido.

Si alguna voz de siempre (Alnilam, Enceladus, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
