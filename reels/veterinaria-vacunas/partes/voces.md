# veterinaria-vacunas · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/veterinaria-vacunas` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir con el texto del .txt).

Voces: **Inés = Sulafat** (nueva, la doctora, dueña de la veterinaria, ~45; Sulafat solo figuraba como alternativa no
usada en estetica-turnos. Si suena a locutora, a jueza o demasiado dulce, probar **Autonoe** con el mismo tono),
**Vero = Callirrhoe** (nueva, la dueña de Toto, ~38; Callirrhoe solo hizo una voz de fondo en el coro de hacen-envios.
Que no suene igual a Inés: más liviana, más rápida y más aguda. Alternativa: Laomedeia, bajándole la energía),
**Bruno = Schedar** (nuevo, ayudante y recepción, ~24; decisión del coordinador del 17-11: Sadachbia la usa otro reel
de esta noche), **Sofi = Achernar** (la de siempre, `reels/estetica-turnos`, `reels/taller-presupuestos`),
**narrador del cartel = Rasalgethi**. Ninguna de estas es de un personaje recurrente de la línea ni de los reels de la
semana (Algenib = Rubén, Gacrux = Graciela, Fenrir = Nico, Umbriel = Walter, Sadaltager = Héctor, Kore = Lorena, Leda =
Carolina, Despina = Jimena, Charon/Iapetus/Puck/Achird/Zubenelgenubi = taller y parrilla): no usarlas. Si el reel que se
hace en paralelo (`corralon-portland`) eligió alguna de estas tres, el coordinador decide cuál cambia.

**Toto no habla.** Solo ladridos reales (CC0) y el tic de las uñas en el piso; ver plan.md.

**Dos callbacks reusan el MISMO audio** (es el chiste: la frase idéntica, otra respuesta):
- Q1 · Vero "Doctora, ¿y cuándo le toca la próxima?" = la toma final de `01-vero` (no se genera de nuevo).
- Q3 · Bruno "Doctora, ¿y los avisos de las vacunas?" = la toma final de `03-bruno`.
El remate "¿Vos también, Toto?" en cambio va con DOS tomas distintas (06 seca, 11 con sonrisa): misma frase, otro sentido.

Burbujas SIN voz (solo pop): la ficha de cartón, los chips de los meses, "Vencidas: 12 → 31 → 63", el teléfono que se
cuelga, los rótulos de la pausa, la ficha de Toto en la tablet, el recordatorio de WhatsApp con botones, el panel, la
línea chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-vero.txt · "Doctora, ¿y cuándo le toca la próxima?" | Vero | Callirrhoe | Dueña de un perro, uruguaya de 38 años, en el consultorio de la veterinaria, acariciando a su perro recién vacunado; pregunta de buena fe, cariñosa y práctica, como quien quiere hacer las cosas bien: "doctora" corto, la pregunta clara. ~1,6 s. | Sin filtro. Es el gancho (entra a ~0,30 s). Se reusa idéntica en Q1. |
| 02-ines.txt · "Yo le aviso." | Inés | Sulafat | Veterinaria uruguaya de 45 años, dueña de su clínica, escribiendo la ficha sin levantar la vista; segura, cálida y rápida, la promesa que hace diez veces por día y que de verdad piensa cumplir. Nada de soberbia. ~0,8 s. | Sin filtro. |
| 03-bruno.txt · "Doctora, ¿y los avisos de las vacunas?" | Bruno | Schedar | Ayudante y recepcionista de 24 años de una veterinaria, con un fichero de cartón que ya no cierra en los brazos; pregunta de buena fe, medio en broma, sin sobrar a nadie. ~1,5 s. | Sin filtro. Se reusa idéntica en Q3. |
| 04-ines.txt · "El que quiere a su perro, se acuerda." | Inés | Sulafat | Inés secándose las manos, tranquila y convencida, con cariño por sus clientes: lo dice como una verdad del oficio, casi un elogio a los dueños. Nada de enojo ni de desprecio. ~1,5 s. | Sin filtro. |
| 05-vero.txt · "¡Doctora! A Toto le escribieron de la de la vuelta. Ya está vacunado." | Vero | Callirrhoe | La misma Vero entrando con el perro, contenta y buena onda, sin ninguna culpa, como quien da una buena noticia: "¡doctora!" de saludo, "le escribieron" con sorpresa simpática (le escribieron al perro), "ya está vacunado" orgullosa. ~2,8 s. | Sin filtro. Si pasa de 3,0 s, atempo 1,08. Que "de la de la vuelta" se entienda (si el STT oye otra cosa, regenerar). |
| 06-ines.txt · "¿Vos también, Toto?" | Inés | Sulafat | Inés mirando al perro desde arriba del mostrador, después de una pausa; seca, grave, sin levantar la voz, dolida en broma, como una traición de película dicha en voz baja; una pausita antes de "Toto". Nada de enojo de verdad: es el chiste. ~1,0 s. | Sin filtro. Es EL remate: va después de la pausa, con la cama baja. Si suena enojada o a reto, regenerar. Es la frase de la portada. |
| 07-narrador.txt · "Un recordatorio automático más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono de los carteles de abren-hoy-completo, estetica-turnos y taller-presupuestos). | Frase nueva: generar. Comparar con `reels/taller-presupuestos/assets/voice/` (narrador). Si pasa de 2,6 s y no se puede apurar, reusar "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice "Un sistema" / "más tarde…". |
| 08-ines.txt · "Le vamos a escribir a él." | Inés | Sulafat | Inés en el mismo lugar del cuadro 0, relajada, con media sonrisa cómplice, señalando con la cabeza al perro: "a él" marcado y cariñoso (la vuelta del "le escribieron" de la parte 1). ~1,1 s. | Sin filtro. |
| 09-vero.txt · "¡Toto! ¡Te escribieron!" | Vero | Callirrhoe | Vero en el living leyendo el celular, sorprendida y encantada, hablándole al perro como a una persona, un poco exagerada. ~1,0 s. | Sin filtro. |
| 10-ines.txt · "Ya salieron solos." | Inés | Sulafat | Inés sin levantar la vista de la tablet, tranquila y práctica, casi divertida. ~0,8 s. | Sin filtro. |
| 11-ines.txt · "¿Vos también, Toto?" | Inés | Sulafat | La misma frase del remate, ahora contenta: Inés se asoma a la sala llena y en hora y ve entrar al perro puntual; sonrisa grande, cariñosa, con la pausita antes de "Toto" igual que en la parte 1. ~1,0 s. | Sin filtro. Tiene que sonar claramente distinta de 06 (06 dolida en broma, 11 feliz). |
| 12-sofi.txt · "Comentá VACUNA y te mando cómo funciona para tu veterinaria." | Sofi | Achernar | Sofi de Scalerics en videollamada, 28 años, cálida y clara, de colega a colega, sin tono de aviso ni urgencia; "VACUNA" un poco marcado (es la palabra para comentar). ~3,1 s. | Lowpass 7 kHz muy leve (videollamada). Si pasa de 3,3 s, atempo 1,08-1,12. |

Si alguna voz de siempre (Achernar, Rasalgethi) no estuviera disponible, no cambiarla por otra: avisar.
