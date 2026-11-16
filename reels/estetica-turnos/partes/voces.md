# estetica-turnos · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/estetica-turnos` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces: **Lorena = Kore** (nueva, dueña del centro; si suena a locutora o a jueza, probar Sulafat con el mismo tono),
**Carolina = Leda** (clienta joven), **Jimena = Despina** (otra clienta joven: que no suene igual a Leda), **Graciela =
Gacrux** (la de siempre), **Sofi = Achernar** (la de `reels/trabajar-con-scalerics`), **narrador del cartel =
Rasalgethi**. Vale y Mariana NO hablan (Vale habla con las toallas; Mariana es el "escribiendo…" que no llega).

**Audios de WhatsApp (01, 03, 05):** filtro de celular, que se oiga que es un audio y no alguien en la sala: highpass
300 Hz + lowpass 3,4 kHz, un poco de compresión, -2 dB; nada de ruido sintético agregado. En la parte 2 Carolina habla
en persona (10): sin filtro.

Burbujas SIN voz (solo pop): el mensaje de Lorena a Mariana y su "escribiendo…", la burbuja de Carolina de Q1 ("Lore,
¿me guardás el jueves que viene?", es el callback de 05 en texto), la página de reserva, el recordatorio, el aviso de la
lista de espera, la agenda, los rótulos y la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-carolina.txt · "Ay, Lore, justo me surgió algo." | Carolina | Leda | Clienta uruguaya de 32 años mandando un audio de WhatsApp a la hora exacta del turno, apurada y con culpa simpática, como quien avisa algo menor: "ay" de disculpa, "justo me surgió algo" rapidito y vago, sin dar detalles. Nada de sonar mala ni mentirosa: le surgió. ~1,7 s. | Filtro de audio de celular. Es el gancho (entra a ~0,30 s). |
| 02-lorena.txt · "Tranqui." | Lorena | Kore | Dueña de un centro de estética de 45 años, uruguaya, voz adulta y tranquila; lo dice mirando la camilla vacía, sin drama y sin reproche, como quien ya lo vivió mil veces. Corto y plano. ~0,5 s. | Sin filtro. |
| 03-jimena.txt · "¿Era hoy? Lo tenía para el jueves que viene." | Jimena | Despina | Otra clienta joven, audio de WhatsApp, sorprendida de verdad y de buena fe: "¿era hoy?" con sorpresa sincera, el resto como explicación rápida, casi riéndose de sí misma. ~2,0 s. | Filtro de audio de celular. Que no suene igual a la 01 (otra voz, otro ritmo). |
| 04-lorena.txt · "Lo único puntual hoy fueron las excusas." | Lorena | Kore | Lorena en primer plano, después de una pausa; seca, grave, sin levantar la voz, con la ironía en el tiempo y no en el tono; una leve pausa antes de "las excusas". Nada de enojo ni de sermón: la verdad que toda dueña piensa. ~1,8 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena enojada o a reto, regenerar. |
| 05-carolina.txt · "Lore, ¿me guardás el jueves que viene? Esta vez voy." | Carolina | Leda | La misma Carolina, otro audio, ahora dulce y entusiasta, convencida de que esta vez sí; "esta vez voy" con promesa sincera. ~2,1 s. | Filtro de audio de celular. Si pasa de 2,3 s, atempo 1,08. |
| 06-lorena.txt · "Te lo guardo." | Lorena | Kore | Lorena anotando en la agenda, resignada y amable, con un suspiro mínimo que no se escuche como queja: el "sí" de siempre. ~0,6 s. | Sin filtro. |
| 07-narrador.txt · "Una agenda online más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono de los carteles de abren-hoy-completo y las-siete-y-cincuenta-y-nueve). | Frase nueva: generar. Comparar tono y largo contra `reels/las-siete-y-cincuenta-y-nueve/assets/voice/narrador.wav` (~2,0-2,3 s). |
| 08-lorena.txt · "Te mando el link." | Lorena | Kore | Lorena en la recepción, tranquila y práctica, sin levantar la vista, con media sonrisa: el problema de la parte 1 ya no le pesa. ~0,8 s. | Sin filtro. |
| 09-graciela.txt · "¡Me lo quedo!" | Graciela | Gacrux | Señora de 65 años en su living, contenta y rápida, como quien agarra la última oferta antes que otra: "¡me lo quedo!" con picardía. ~0,8 s. | Sin filtro. |
| 10-carolina.txt · "¡Llegué! Pagué la seña, ¿cómo no voy a venir?" | Carolina | Leda | Carolina entrando al centro, en persona, a la hora exacta, contenta y un poco orgullosa; "pagué la seña" como argumento obvio, "¿cómo no voy a venir?" riéndose. ~2,1 s. | Sin filtro (está en la sala). Si pasa de 2,3 s, atempo 1,08. |
| 11-lorena.txt · "Mirá vos. Hoy le surgió venir." | Lorena | Kore | Lorena a Vale, en voz baja, de costado, cómplice y con media sonrisa; "mirá vos" lento, "hoy le surgió venir" seco, con la ironía amable de quien recuerda el "me surgió algo". ~1,5 s. | Sin filtro, -1 dB (es un aparte). Pausa de ~0,25 s después de "Mirá vos." |
| 12-sofi.txt · "Comentá TURNOS y te mando cómo funciona para tu centro de estética." | Sofi | Achernar | Sofi de Scalerics en videollamada, 28 años, cálida y clara, de colega a colega, sin tono de aviso ni urgencia; "TURNOS" un poco marcado (es la palabra para comentar). ~3,0 s. | Un poco de "llamada" muy leve (lowpass 7 kHz), nada que la ensucie. Si pasa de 3,2 s, atempo 1,06. Comparar con `reels/trabajar-con-scalerics/partes/04-sofi-Achernar.wav`. |

Si alguna voz de siempre (Gacrux, Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra de un personaje
recurrente: avisar.
