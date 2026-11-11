# hacen-envios · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/hacen-envios` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Las burbujas del chat (¿Tenés pan?, ¿Y hielo?, ¿Me cambiás mil?, ¿Fósforos tenés?, ¡Gracias, Rubén!) NO se dicen:
solo pop + vibración. Se tiene que entender sin sonido.

Voces de siempre: **Rubén = Algenib**, **Héctor = Sadaltager** (la de me-haces-precio), **Graciela = Gacrux**,
**narrador del cartel = Rasalgethi**. Para el coro: **Marta = Aoede** (la Marta de houston-marta), **Walter = Umbriel**
(Walter nunca habló; Umbriel no es de ningún personaje recurrente), **vecino genérico = Charon**.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| hector-1.txt · "¿Hacen envíos?" | Héctor | Sadaltager | Jubilado uruguayo de setenta años, canchero y amable, preguntando con total inocencia y buen humor, como quien pregunta algo obvio; "envíos" con la sonrisa en la voz. Nada de vago ni de pícaro: no ve el chiste. ~1,0 s. | Sin filtro, cerca. Es el gancho (entra a ~0,25 s). |
| ruben-1.txt · "Para estar más cerca del cliente." (cambio de guion, ronda 1: el cartón SUCURSAL da la imagen en silencio y la frase arma el eco de "¡Qué cerquita…!") | Rubén | Algenib | Almacenero uruguayo grave y cansado, sentado en un cajón en el medio de la calle; lo anuncia con total seriedad y calma, como un empresario que comunica una expansión. Seco, sin ironía marcada, sin suspiro: la cara de nada hace el chiste. "sucursal" parejo, sin estirar. ~1,2-1,4 s. | Sin filtro. Va después de 1 s de silencio de barrio: que se oiga solo, con el ambiente bajo. |
| coro-graciela.txt · "¿Hacen envíos?" | Graciela | Gacrux | Señora de barrio de 65 años, cantarina y amable, asomada a la ventana. ~1,0 s. | Paneo leve a la izquierda, -3 dB. |
| coro-marta.txt · "¿Hacen envíos?" | Marta | Aoede | Dueña de la cafetería de al lado, apurada y simpática, con el delantal puesto. ~0,9 s. | Paneo leve a la derecha, -5 dB, filtro de ventana (lowpass 5 kHz). |
| coro-walter.txt · "¿Hacen envíos?" | Walter | Umbriel | Oficinista de cuarenta, cansado y con cara de perdón, desde un primer piso. ~1,0 s. | Paneo izquierda, -7 dB, lowpass 4 kHz. |
| coro-vecino.txt · "¿Hacen envíos?" | vecino genérico | Charon | Vecino mayor, lejos, a los gritos amables desde una ventana del fondo. ~1,0 s. | Paneo derecha, -9 dB, lowpass 3,5 kHz, un poco de reverb corta. |
| narrador.txt · "Una tienda online más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde". | **Reusar `reels/las-siete-y-cincuenta-y-nueve/assets/voice/narrador.wav`** (es la misma frase). Generar solo si no suena igual de bien. |
| hector-2.txt · "¡Qué cerquita que quedás, Rubén!" | Héctor | Sadaltager | El mismo Héctor, sorprendido de verdad y encantado, recién llegado al mostrador en pantuflas, como quien descubre algo; "cerquita" con asombro alegre, sin ninguna ironía. ~1,6 s. | Sin filtro. Si pasa de 1,8 s, atempo 1,1. |

**El coro** (remate del remate): las cuatro voces encadenadas, cada una entra 0,22-0,3 s después de la anterior y se
pisan (Graciela 0,0 · Marta +0,25 · Walter +0,5 · vecino +0,75), y se duplican las dos más lejanas con -4 dB más y
otra toma para que suenen 7 ventanas. Cada entrada coincide con el pop de una burbuja. Sobre el coro, la vibración del
celular de Rubén cada vez más seguida. Termina con un perro que ladra una vez y el "clac" del farol al prenderse.

Medir con tiempos.mjs cada línea suelta ("oyó:" tiene que coincidir; "envíos" puede salir "envío" por la s aspirada).


## Ronda 1 (cambios)
- ruben-1: "Para estar más cerca del cliente." Algenib, serio de empresario en conferencia de prensa; toma a (1,77 s).
- Coro de 7 voces para 7 ventanas: Graciela (Gacrux) dice la frase entera sola; después, a +0,25 s cada una: Marta (Aoede), Walter (Umbriel), Beto (Charon, toma a), Nelly (Vindemiatrix), Fede (Puck), Chela (Callirrhoe). coro-vecino2 = Charon toma c.
- hector-2: 30 ms de aire adelante del "¡Qué".
