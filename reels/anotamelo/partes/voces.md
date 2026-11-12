# anotamelo · voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)

Sin Orus. Generar cada una desde `reels/anotamelo` con
`node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz <Voz> --tono "..."`.
Recortar silencios (silenceremove) y dejar los recortes en `partes/rec/`; los finales en `assets/voice/`.
Medir cada línea con `tiempos.mjs` ("oyó:" tiene que coincidir; "Anotámelo" puede salir "anotámelo" o "anota melo",
está bien; "debía" puede salir "debía/debías").

Voces de siempre: **Rubén = Algenib**, **Graciela = Gacrux**, **Héctor = Sadaltager**, **Walter = Umbriel** (la de
su coro en hacen-envios), **Marta = Aoede** (houston-marta, hacen-envios), **narrador del cartel = Rasalgethi**.

Las burbujas "Anotámelo." ×3 del final de la escalada (P2, sin cara: vecinos de paso) NO se dicen: solo pop. Tampoco
se dicen los textos de la libreta, el almanaque, el antebrazo, la pelada, la tablet, el celular de Héctor ni la línea
chica. Se tiene que entender sin sonido.

| archivo | quién | voz | tono (para --tono) | proceso |
|---|---|---|---|---|
| 01-graciela.txt · "Anotámelo, Rubén." | Graciela | Gacrux | Señora de barrio de 65 años, cariñosa y apurada, apoyando la bolsa en el mostrador; lo dice como quien dice "chau": de costumbre, liviano, con una sonrisa, sin pedir permiso ni sonar a favor. "Anotámelo" de corrido, "Rubén" cantadito. ~1,1 s. | Sin filtro. Es el gancho (entra a ~0,25 s). **Se reusa la MISMA toma en la parte 2 (Q1)**: es el callback exacto. |
| 02-hector.txt · "Anotámelo." | Héctor | Sadaltager | Jubilado canchero de setenta, al pasar, con el dulce de leche en la mano y la sonrisa en la voz; rápido, como quien saluda. ~0,7 s. | Sin filtro. Si pasa de 0,8 s, atempo 1,1. |
| 03-walter.txt · "Anotámelo." | Walter | Umbriel | Oficinista de cuarenta, apurado y con cara de perdón, la mochila al hombro; lo dice en voz bajita, ya yéndose. ~0,7 s. | Sin filtro, -2 dB. |
| 04-marta.txt · "Anotámelo." | Marta | Aoede | La dueña de la cafetería de al lado, con el delantal puesto, apurada y simpática, de colega a colega. ~0,7 s. | Sin filtro. Las tres seguidas tienen que sonar a desfile: cada una más rápida que la anterior. |
| 05-hector.txt · "¿Yo te debía?" | Héctor | Sadaltager | El mismo Héctor, sorprendido de verdad y sin ninguna picardía: se le borró, como a cualquiera; cejas arriba, curioso, con buena onda. Nada de hacerse el vivo. ~0,9 s. | Sin filtro. |
| 06-walter.txt · "¿Eso no te lo pagué el martes?" | Walter | Umbriel | Walter dudando de buena fe, tratando de acordarse, un poco preocupado de quedar mal; "martes" con duda. Nada de discutir. ~1,5 s. | Sin filtro. Si pasa de 1,6 s, atempo 1,1. |
| 07-graciela.txt · "Rubén, vengo a pagarte. ¿Cuánto es?" | Graciela | Gacrux | La misma Graciela, contenta y orgullosa de venir a pagar, con el monedero abierto en la mano; dulce y decidida. ~1,8 s. | Sin filtro. Pausa entre "pagarte." y "¿Cuánto es?" de 0,15-0,25 s. |
| 08-ruben.txt · "Mil ochocientos cuarenta." | Rubén | Algenib | Almacenero uruguayo grave y cansado, leyendo un número de su propio antebrazo con total naturalidad, como quien lee una boleta; seco, parejo, sin suspiro ni ironía: la imagen hace el chiste. ~1,3 s. | Sin filtro. Va después de ~0,7 s de quietud: que se oiga solo, con la cama baja. Es EL remate. |
| 09-hector.txt · "¿Y yo cuánto te debía?" | Héctor | Sadaltager | Héctor en la puerta, que ahora sí se acordó y quiere pagar; servicial, con la billetera en la mano, buena voluntad pura. ~1,2 s. | Sin filtro. |
| 10-narrador.txt · "Un sistema más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito animado, exagerado y alegre, que estira "más taaarde" (el mismo tono de los carteles de abren-hoy-completo, las-siete y me-haces-precio). | Frase nueva: generar. Comparar el tono y el largo contra `reels/me-haces-precio/assets/voice/narrador.wav` (~2,0-2,3 s). |
| 11-ruben.txt · "Anotado." | Rubén | Algenib | El mismo Rubén grave, ahora tranquilo y con media sonrisa, tocando la tablet; corto y satisfecho, sin desafío. ~0,6 s. | Sin filtro. |
| 12-hector.txt · "¡Ah, mirá! Yo te debía." | Héctor | Sadaltager | Héctor mirando su celular, sorprendido y contento de enterarse, como quien encuentra plata en un bolsillo; "Yo te debía" afirmativo y alegre (es el callback de "¿Yo te debía?": que se oiga la misma frase sin pregunta). ~1,4 s. | Sin filtro. Si pasa de 1,6 s, atempo 1,1. |

Si alguna voz de siempre no estuviera disponible, no cambiarla por otra de un personaje recurrente: avisar.
