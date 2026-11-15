# la-lista · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/la-lista` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces de siempre: **Rubén = Algenib**, **Graciela = Gacrux**, **narrador del cartel = Rasalgethi**. Nuevo: **el
proveedor = Schedar** (solo voz, nunca se ve; Schedar no es de ningún personaje recurrente; si vuelve a aparecer en otro
reel, que sea con esta voz).

**PDF:** el guion y los subtítulos dicen "PDF", pero el .txt dice "pe de efe" para que la voz lo diga como en
Uruguay (y no "pi di ef"). Al comparar el "oyó:" de tiempos.mjs, esperar "pe de efe"; en `palabras.json` y en los
subtítulos, las tres palabras se juntan en "PDF".

Burbujas SIN voz (solo pop): Marta ("¿Me pasás la lista?"), Walter ("¿Tenés la lista nueva?"), Nico ("¿La lista para el
cliente nuevo?"), el proveedor en la ráfaga ("Bajó el azúcar.", "Cambió el dólar."). Tampoco se dicen los nombres de
archivo de la cinta, el chat, la planilla, el panel, los pedidos ni la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-graciela.txt · "Rubén, ¿me pasás la lista actualizada?" | Graciela | Gacrux | La dueña de una rotisería mandando un audio de chat, simpática y apurada, con la cocina andando atrás; lo pide como quien pide algo de todos los días, sin ninguna culpa. ~1,8 s. | **Filtro de audio de celular** (sale del parlante del celular sobre el escritorio): highpass=f=250, lowpass=f=5000, un poco de compresión. Es el gancho (entra a ~0,25 s). |
| 02-proveedor.txt · "Rubén, subió el aceite." | Proveedor | Schedar | Proveedor uruguayo de 50 años por teléfono, rutinario y cordial, casi alegre: avisa un aumento como quien da el pronóstico del tiempo; nada de pedir perdón. ~1,2 s. | **Filtro de teléfono** (altavoz del escritorio): highpass=f=300, lowpass=f=3400, compresión. **Esta misma toma se usa otra vez en la parte 2** (callback exacto). |
| 03-graciela.txt · "Rubén, ¿el aceite a cuánto está?" | Graciela | Gacrux | Graciela llamando mientras cierra la rotisería, práctica, sin enojo, como quien pregunta algo rápido antes de irse. ~1,4 s. | Filtro de teléfono (como 02). |
| 04-ruben.txt · "Está en la lista." | Rubén | Algenib | Dueño de distribuidora de 55 años, grave y cansado, de noche, con los anteojos en la punta de la nariz; seco, obvio, sin levantar la voz: para él es lo más evidente del mundo. ~0,9 s. | Sin filtro. |
| 05-graciela.txt · "¿En cuál? Tengo siete." | Graciela | Gacrux | Graciela de buena fe, mirando el celular y contando de verdad: "¿En cuál?" con duda genuina, "Tengo siete." como un dato, sin reproche ni ironía. ~1,5 s. | Filtro de teléfono. Pausa natural chica entre las dos frases (0,15-0,25 s). |
| 06-proveedor.txt · "Rubén, subió el aceite." | Proveedor | Schedar | El mismo proveedor, igual de cordial y rutinario, un poquito más contento que la primera vez (no sabe nada). ~1,2 s. | Filtro de teléfono. **Otra toma que la 02** (no la misma: en la parte 1 no se repite; la 02 vuelve recién en la parte 2). |
| 07-ruben.txt · "Ocho." | Rubén | Algenib | Rubén sin moverse, mirando al frente, contando en voz baja: seco, plano, cansado, con la ironía en el tiempo y no en el tono; una sola palabra que cae como un número en una planilla. Nada de reírse ni de suspirar. ~0,4 s. | Sin filtro. Es EL remate: va después de la pausa del perro. Si la toma suena a pregunta o a sorpresa, regenerar. |
| 08-graciela.txt · "Dale. ¿Me la mandás en pe de efe?" | Graciela | Gacrux | Graciela, contenta y práctica, cerrando el tema: "Dale" como "bárbaro, gracias", y el pedido del PDF como lo más normal del mundo. Simpática, sin ninguna mala intención. ~1,5 s. | Filtro de teléfono. Es el remate del remate. Escuchar que diga "pe de efe". |
| 09-narrador.txt · "Una tienda online más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". | **No generar: reusar `reels/hacen-envios/assets/voice/narrador.wav`** (mismo texto). |
| 10-ruben.txt · "¿Algo más?" | Rubén | Algenib | Rubén a las 18:30, tranquilo, con el mate en la mano, al proveedor por el altavoz: seco y apenas desafiante, con media sonrisa que no se ve; el dueño al que un aumento ya no le arruina la tarde. ~0,7 s. | Sin filtro. |

Si alguna voz de siempre no estuviera disponible, no cambiarla por otra de un personaje recurrente: avisar.
