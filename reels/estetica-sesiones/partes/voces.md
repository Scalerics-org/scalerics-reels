# estetica-sesiones · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/estetica-sesiones` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "<tono>"`.
Recortar silencios (silenceremove) en `partes/rec/`; los finales en `assets/voice/`. Medir cada línea con `tiempos.mjs`
("oyó:" tiene que coincidir con el .txt).

Voces: **Lorena = Kore** y **Carolina = Leda** (las mismas de `estetica-turnos`: es el mismo centro y la gente las tiene
que reconocer). **Vale no habla** (como en estetica-turnos: todo con gestos). Jimena no aparece. **Narrador del cartel =
Rasalgethi**: audio REUSADO de `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde.", 2,26 s);
`09-narrador.txt` queda solo como referencia (no generar). No se usa ninguna voz nueva (Vindemiatrix NO: la usa Susana en
ferreteria-encargo).

**Tomas que se reusan (callback exacto, a propósito):**
- `01-carolina` ("Lore, ¿cuántas me quedan?") suena en P1 y en Q1: la MISMA pregunta, y esta vez la contesta el celular.
- `08-lorena` ("Vale, ¿y la de Jimena?") suena en P6 y en Q2: lo único que cambia es lo que muestra Vale.
- `07-lorena` ("Tres.") y `11-lorena` ("Tres. Sin promedio.") son tomas distintas: la 07 se rinde con gracia, la 11 es
  tranquila y satisfecha.

Todas en persona, sin filtro (están en el gabinete), sobre la música spa bajita; `12-carolina` en su living (sin la cama
del gabinete); `13-lorena` solo con la música de cierre.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-carolina.txt · "Lore, ¿cuántas me quedan?" | Carolina | Leda | Clienta uruguaya de 32 años sentada en la camilla del centro de estética, curiosa y de buena onda, pregunta al pasar, como quien pregunta la hora. ~1,3 s. | Es el gancho (entra a ~0,20 s). Se reusa en Q1. |
| 02-lorena.txt · "Dejame ver." | Lorena | Kore | Dueña de un centro de estética de 45 años, uruguaya, voz adulta y tranquila, hojeando un cuaderno; práctica, sin apuro. Corto. ~0,6 s. | — |
| 03-lorena.txt · "Según el cuaderno, una." | Lorena | Kore | La misma dueña leyendo el cuaderno, neutra y segura, una leve pausa después de "según el cuaderno". ~1,2 s. | — |
| 04-carolina.txt · "¿Una? Acá tengo siete sellos." | Carolina | Leda | La clienta sorprendida de buena fe, sin reclamo ni enojo, con una risita de "¿cómo puede ser?", mostrando una tarjetita. "¿Una?" con sorpresa, el resto simpático. ~1,8 s. | Si suena a reclamo o a pelea, regenerar. |
| 05-lorena.txt · "Hagamos el promedio." | Lorena | Kore | Dueña que ya se rindió, con media sonrisa y la ironía en el tiempo, no en el tono; tranquila, como quien propone algo razonable y absurdo a la vez. ~1,2 s. | EL remate: va después de la pausa muda. Si suena enojada o a reto, regenerar. |
| 06-carolina.txt · "¿Y cuánto da?" | Carolina | Leda | La clienta, ilusionada y curiosa, rápida, casi divertida. ~0,7 s. | — |
| 07-lorena.txt · "Tres." | Lorena | Kore | La dueña, con una sonrisa de anfitriona, cediendo con elegancia; corto, cálido, un poquito resignado. ~0,4 s. | Va después de 0,5 s de pausa. No estirarlo. |
| 08-lorena.txt · "Vale, ¿y la de Jimena?" | Lorena | Kore | La dueña a su cosmetóloga, seca y con miedo cómico a la respuesta, sin levantar la voz. ~1,2 s. | Se reusa en Q2. |
| 09-narrador.txt · "Un sistema más tarde." | Narrador del cartel | Rasalgethi | — | NO generar: reusar `reels/ya-lo-cargo/assets/voice/narrador.wav`. |
| 10-carolina.txt · "Ah. Tres." | Carolina | Leda | La clienta leyendo un WhatsApp en su celular, contenta y sin dudas; "Ah." de descubrimiento, pausa mínima, "Tres." claro. ~0,8 s. | — |
| 11-lorena.txt · "Tres. Sin promedio." | Lorena | Kore | La dueña tranquila y satisfecha, media sonrisa, sin cuaderno; "Tres." firme, pausa corta, "sin promedio" con complicidad. ~1,2 s. | — |
| 12-carolina.txt · "Chau, tarjetita." | Carolina | Leda | La clienta en su casa, guardando una tarjetita de cartón vieja en un cajón, con cariño y un poco de nostalgia graciosa, en voz baja. ~1,0 s. | Sin cama de gabinete (está en su living). |
| 13-lorena.txt · "Comentá SESIONES y te mando cómo funciona para tu centro de estética." | Lorena | Kore | La dueña a cámara, de colega a colega, cálida y clara, sin tono de aviso ni urgencia; "SESIONES" un poco marcado porque es la palabra para comentar. ~3,2 s. | Si pasa de 3,4 s, atempo 1,06. |

Burbujas SIN voz (solo pop): los rótulos de los tres números, "El promedio daba 2.", la ficha, el WhatsApp de "Te quedan
3", la ficha de Jimena, el aviso de renovar, el panel y la línea chica. Se tiene que entender sin sonido.
