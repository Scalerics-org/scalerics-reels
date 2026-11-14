# ya-lo-cargo · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/ya-lo-cargo` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir; "cargo" puede salir "cargo/cargó": escuchar que sea
"cargo", presente, en las líneas de Nico, y "cargué" en la de Rubén; si sale "cargue" o "cargó", regenerar).

Voces de siempre: **Rubén = Algenib**, **Graciela = Gacrux**, **Marta = Aoede** (houston-marta, hacen-envios,
anotamelo), **narrador del cartel = Rasalgethi**. **Nico = Fenrir**: Nico (ELENCO.empleado) no tuvo voz propia en los
reels 3D (en abren-hoy, dos-bicicleterias y hacen-envios aparece sin hablar); Fenrir es la voz que ya se usó para un
"Nico" (el conductor de el-late-night) y para el pillo canchero de el-golpe: joven, rápido, simpático. Desde este reel,
Fenrir queda como la voz fija de Nico (anotarlo para los próximos).

Burbujas SIN voz (solo pop): la de Graciela del cuadro 0 y de Q1 ("Cuarenta de harina para el lunes."), el bar ("¿Y el
agua con gas?" / "Ya lo cargo."), el kiosco ("Lo de siempre." / "Ya lo cargo."). Tampoco se dicen los textos de los
globos, el monitor, el remito, la ficha ni la línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-nico.txt · "Ya lo cargo." | Nico | Fenrir | Vendedor uruguayo de 25 años, simpático y seguro, con una sonrisa en la voz, apoyado en el mostrador; lo dice como quien dice "listo": liviano, rápido, sin mirar el celular, de total buena fe. ~0,8 s. | Sin filtro. Es el gancho (entra a ~0,25 s). |
| 02-marta.txt · "¿Me sumás dos de azúcar?" | Marta | Aoede | La dueña de la cafetería, con el delantal puesto, asomada a la vereda; de colega a colega, apurada y simpática. ~1,2 s. | Sin filtro, un poco de aire de calle (nada de reverb). |
| 03-nico.txt · "Ya lo cargo." | Nico | Fenrir | El mismo Nico desde la ventanilla del auto, ya arrancando: más automático y más rápido que la 01, casi de memoria, cantadito. ~0,6 s. | Sin filtro. Si pasa de 0,7 s, atempo 1,1. Que NO sea la misma toma que la 01. |
| 04-graciela.txt · "Rubén, ¿y mi harina?" | Graciela | Gacrux | La dueña de la rotisería llamando el lunes, sin enojo: extrañada, práctica, con la cocina andando atrás; "¿y mi harina?" como quien pregunta por algo que ya debería estar. ~1,2 s. | **Filtro de teléfono** (altavoz del escritorio): highpass=f=300, lowpass=f=3400, un poco de compresión. |
| 05-ruben.txt · "Lo único que carga Nico es el celular." | Rubén | Algenib | Dueño de distribuidora de 55 años, grave y cansado, mirando por el vidrio de su oficina el auto lleno de globos; seco, sin levantar la voz, con la ironía en el tiempo y no en el tono: la pausa chiquita antes de "es el celular". Nada de reírse. ~2,2 s. | Sin filtro. Es la línea picante: que se oiga sola, con la cama baja. |
| 06-ruben.txt · "¡Nico!" | Rubén | Algenib | El mismo Rubén desde la baranda, llamándolo hacia abajo, firme pero sin gritar de enojo: el "¡Nico!" de todos los días. ~0,4 s. | Sin filtro. Un poco de reverb corta de galpón (aecho chico) si suena muy seco: probar. |
| 07-nico.txt · "¡Ya lo cargo!" | Nico | Fenrir | Nico asomado a la ventanilla, de reflejo, antes de que le pregunten nada: entusiasta, alegre, pulgar arriba; seguro de que es lo que Rubén quería oír. ~0,7 s. | Sin filtro. |
| 08-ruben.txt · "Ya lo cargué." | Rubén | Algenib | Rubén al mando del autoelevador, recién metido el auto en el camión: seco, parejo, satisfecho sin sonreír, como quien tilda una tarea; "cargué" bien marcado (es el juego de palabras). ~0,9 s. | Sin filtro. Va después de la pausa del bip: EL remate. |
| 09-nico.txt · "Sí, sí. Ya lo cargo." | Nico | Fenrir | Nico atendiendo el celular adentro del camión cerrado, sin enterarse de nada, igual de simpático que siempre. ~1,2 s. | **Ahogado**: lowpass=f=900, -6 dB, y un eco corto de caja metálica (aecho=0.8:0.6:25:0.3). Es el remate del remate. |
| 10-narrador.txt · "Un sistema más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". | **No generar: reusar `reels/anotamelo/assets/voice/narrador.wav`** (mismo texto; te-queda también la reusó). |
| 11-nico.txt · "Ya lo car…" | Nico | Fenrir | El mismo Nico en la rotisería, tocando el celular, arrancando la frase de siempre; se corta solo cuando suena el ding. ~0,5 s hasta "car". | Generar "Ya lo cargo." entero (TTS no corta bien a mitad de palabra) y **recortar en ffmpeg justo después de "car"** (antes de la "g"), con un fundido de 15 ms. El ding tapa el corte. |
| 12-nico.txt · "Rubén, ¿lo de Graciela?" | Nico | Fenrir | Nico llegando al depósito con el auto limpio, servicial y un poco preocupado de que se le haya pasado: pregunta de verdad. ~1,1 s. | Sin filtro. |
| 13-ruben.txt · "Ya salió." | Rubén | Algenib | Rubén cerrando la puerta del camión sin mirarlo, tranquilo, seco, con media sonrisa que no se ve: el dueño al que ahora le sobra tiempo. ~0,6 s. | Sin filtro. |

Si alguna voz de siempre no estuviera disponible, no cambiarla por otra de un personaje recurrente: avisar.

## Tomas elegidas (14-11, constructor) · `assets/voice/`
Generadas con `partes/voces.sh` (lee `partes/lineas.tsv`; `LINEAS=partes/lineas-extra.tsv TOMAS="c d"` para tomas extra),
silencios recortados en `partes/rec/`. Verificadas con `tiempos.mjs` ("oyó:") y contando muestras recortadas (clip).
| voz final | toma | dur | proceso |
|---|---|---|---|
| n1 | 01-nico-d | 0,74 | sin filtro (a y b tenían clipping; c decía "se lo cargo") |
| m1 | 02-marta-a | 1,63 | sin filtro |
| n2 | 03-nico-a | 0,79 | sin filtro (otra toma que n1) |
| g1 | 04-graciela-c | 1,50 | teléfono: highpass 300, lowpass 3400, compresión |
| r1 | 05-ruben-b | 2,20 | sin filtro (pausa natural antes de "es el celular") |
| r2 | 06-ruben-b | 0,94 | eco corto de galpón (aecho 70 ms) |
| n3 | 07-nico-b | 0,76 | sin filtro |
| r3 | 08-ruben-a | 0,77 | -0,5 dB ("cargué" bien; la d decía "cargué" con 18 muestras recortadas, la b "cambié") |
| n4 | 09-nico-b | 1,73 | atempo 1,15 + ahogado: lowpass 900, -6 dB, aecho 25 ms |
| n5 | 11-nico-b | 0,43 | cortado a 0,425 s (antes de la "g", en el valle de energía) con fundido de 15 ms |
| n6 | 12-nico-b | 1,63 | pausa entre "Rubén," y "¿lo de Graciela?" acortada de 0,43 a 0,12 s |
| r4 | 13-ruben-b | 0,65 | sin filtro |
| narrador | reels/anotamelo | 2,26 | Rasalgethi, la misma toma |
