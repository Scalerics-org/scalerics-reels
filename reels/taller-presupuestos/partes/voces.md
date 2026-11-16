# taller-presupuestos · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/taller-presupuestos` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces: **Óscar = Charon** (nuevo, dueño del taller, ~52; grave, seco, uruguayo; si suena a locutor de noticias, probar
Alnilam con el mismo tono), **Maxi = Puck** (nuevo, ayudante, ~22), **Sergio = Zubenelgenubi** (nuevo, cliente, ~40,
casual; que no se parezca a Óscar: más liviano y más rápido), **Sofi = Achernar** (la de siempre, `reels/estetica-turnos`
y `reels/trabajar-con-scalerics`), **narrador del cartel = Rasalgethi**. Ninguna de estas voces es de un personaje
recurrente de la línea (Algenib = Rubén, Gacrux = Graciela, Fenrir = Nico, Umbriel = Walter, Sadaltager = Héctor, Kore =
Lorena, Leda = Carolina): no usarlas.

**Dos callbacks reusan el MISMO audio** (es el chiste: la frase idéntica, otra respuesta):
- Q1 · Sergio "Lo pienso y te aviso." = la toma final de `01-sergio` (no se genera de nuevo).
- Q3 · Maxi "Jefe, ¿a esos no los llamamos?" = la toma final de `02-maxi`.

Burbujas SIN voz (solo pop): los mensajes de la semana (Fabián "Visto", Pablo "Lo hablo con mi señora.", Silvia "Te
confirmo el lunes.", Andrés "Dale, cualquier cosa te escribo."), el mensaje nuevo del remate del remate ("Hola, ¿me
pasás presupuesto de embrague?"), el presupuesto con botones, el seguimiento automático, el tablero, los rótulos y la
línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-sergio.txt · "Lo pienso y te aviso." | Sergio | Zubenelgenubi | Cliente uruguayo de 40 años en un taller mecánico, recibiendo un presupuesto de papel; amable, liviano, sin compromiso, como quien sale de una tienda: "lo pienso" tranquilo, "y te aviso" con una sonrisa, ya yéndose. Nada de grosero ni de mentiroso. ~1,2 s. | Sin filtro. Es el gancho (entra a ~0,30 s). Se reusa idéntica en Q1. |
| 02-maxi.txt · "Jefe, ¿a esos no los llamamos?" | Maxi | Puck | Ayudante de taller de 22 años, sentado sobre una pila de cubiertas, pregunta de buena fe, medio aburrido, mirando el pincho lleno de papeles; "jefe" corto, la pregunta sincera. ~1,3 s. | Sin filtro. Se reusa idéntica en Q3. |
| 03-oscar.txt · "Si les interesa, llaman." | Óscar | Charon | Dueño de un taller mecánico de 52 años, uruguayo, limpiándose las manos con un trapo; seguro, de vuelta, con la sabiduría de 30 años de oficio que en este caso está equivocada: tranquilo, sin soberbia, como quien dice algo obvio. ~1,1 s. | Sin filtro. |
| 04-sergio.txt · "¡Óscar! Al final lo hice acá a la vuelta. ¡Me llamaron!" | Sergio | Zubenelgenubi | El mismo Sergio, gritando contento desde el auto que pasa por la calle, con la ventanilla baja; cero culpa, buena onda total, como quien da una buena noticia: "¡Óscar!" para llamar la atención, el resto rápido, "¡me llamaron!" como explicación obvia. ~2,3 s. | Sin filtro, con un poco de "afuera": highpass 150 Hz y -2 dB (está en la calle). Si pasa de 2,5 s, atempo 1,08. |
| 05-oscar.txt · "Lo pensó. Y me avisó." | Óscar | Charon | Óscar mirando el pincho con los cinco presupuestos, después de una pausa; seco, grave, sin levantar la voz, con la ironía en el tiempo y no en el tono; pausa clara entre "Lo pensó." y "Y me avisó.". Nada de enojo ni de queja: la verdad que todo mecánico conoce. ~1,5 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena enojado o a reto, regenerar. Si la pausa interna queda corta, abrirla a ~0,3 s con ffmpeg. |
| 06-narrador.txt · "Un sistema de presupuestos más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono de los carteles de abren-hoy-completo, las-siete-y-cincuenta-y-nueve y estetica-turnos). | Frase nueva: generar. Comparar tono y largo contra `reels/estetica-turnos/assets/voice/` (narrador, ~2,1-2,4 s). Si pasa de 2,6 s y no se puede apurar, reusar "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice "Un sistema" / "más tarde…". |
| 07-oscar.txt · "Pensalo tranquilo." | Óscar | Charon | Óscar en el mismo lugar del cuadro 0, ahora relajado y con media sonrisa, mientras toca "Enviar" en la tablet; sin ironía, sin apuro: de verdad no le preocupa. ~0,9 s. | Sin filtro. |
| 08-sergio.txt · "Justo lo estaba pensando." | Sergio | Zubenelgenubi | Sergio mirando el celular (le llegó el seguimiento), sorprendido y contento, como quien queda bien parado: un poquito exagerado, porque no lo estaba pensando para nada. ~1,2 s. | Sin filtro. |
| 09-oscar.txt · "Ya les escribió el sistema." | Óscar | Charon | Óscar sin levantar la vista de la tablet, tranquilo y práctico, casi divertido; "el sistema" dicho como quien nombra a un empleado nuevo que trabaja bien. ~1,2 s. | Sin filtro. |
| 10-sergio.txt · "Lo pensé." | Sergio | Zubenelgenubi | Sergio bajándose del auto en el taller, con la llave en la mano, satisfecho, un poquito orgulloso. ~0,6 s. | Sin filtro. |
| 11-oscar.txt · "Y me avisaste." | Óscar | Charon | Óscar recibiéndole la llave, cómplice, con media sonrisa; la misma frase del remate de la parte 1 pero ahora contento, seco y amable. ~0,8 s. | Sin filtro. Pausa de ~0,25 s después de "Lo pensé." |
| 12-sofi.txt · "Comentá PRESUPUESTO y te mando cómo funciona para tu taller." | Sofi | Achernar | Sofi de Scalerics en videollamada, 28 años, cálida y clara, de colega a colega, sin tono de aviso ni urgencia; "PRESUPUESTO" un poco marcado (es la palabra para comentar). ~3,0 s. | Lowpass 7 kHz muy leve (videollamada). Si pasa de 3,3 s, atempo 1,08-1,12 (en estetica-turnos fue 1,15 sin problema). |

Si alguna voz de siempre (Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
