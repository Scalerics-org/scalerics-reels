# gym-cupo · ronda 1 de revisión independiente (render 42,7 s)

Cuadros de los revisores en /tmp/claude-0/-home-user-scalerics-reels/492b8637-440b-5ebe-be47-1a3a035fd561/scratchpad/qa-gym-guion/, qa-gym-arte/ y qa-gym-sonido/.

## Guion y datos

### ALTA
1. 8,5-11,5: el chiste de los percheros no se ve (toalla en la 2 = cajita blanca; botella, celular, campera, mochila no se distinguen o fuera de cuadro). El remate final de la toalla depende de esto. Primer plano/push-in ~1 s a Graciela colgando una toalla de tela grande en la 2, rótulo con guía "Bici 2: perchero", y al menos 3 bicis vacías con objetos grandes y reconocibles.

### MEDIA
2. 12,0-12,8: "$ 3.800 por mes" dura < 1 s, chico y ambiguo; Sole nunca dice que se va. Ej.: "2 alumnas menos · $ 3.800 por mes que no entran", 1,5-2 s, más grande; o burbuja de Sole "Yo también".
3. La plata no tiene callback en la solución: en el 14/14 (30-33) etiquetas "Majo · 7" y "Sole · 4" con guía, o línea en el panel "Majo y Sole: siguen".
4. 22,5-24: no se sabe de quién es el celular en lista de espera (parece Majo): nombre "Sole" en el encabezado o chip, o marco/fondo distinto.
5. 2,5-12,5: el chat calca WhatsApp (salientes verde claro con doble tilde, nota de voz con avatar redondo/play/onda, avatar verde "S"): salientes navy o crema con borde verde de marca, sin doble tilde; nota de voz menos calcada.
6. 0,5-2,5: Mauro dice "Veintidós" mientras el contador marca 15-21: que el contador llegue a 22 antes de la burbuja.
7. Largo 42,7 s y solución sin cierre 40 %: recortar la parte 1 (entrada de a uno 7,5-10 a ~1,5 s; acortar 13-16) para ~36-38 s y ≥ 55 % de solución.

### BAJA
8. 41,75-42,7: línea chica final ~1 s y 26-28 px: ≥ 36 px y ~1,5 s.
9. 37,5-42,7: "y te mando cómo funciona para tu gimnasio" ~32 px; nombres de remitentes del chat y "38 participantes" 20-24 px.
10. 35-36: "Alumnas nuevas" vs varones en la sala: "Alumnos nuevos" o coherente.
11. portada.png no existe: generarla y verificar texto sin tapar caras, todo entre y 285 y 1635; opcional bici 2 con toalla en primer plano.
12. fuentes.md dice que "WhatsApp" se nombra en descripcion.txt y no está: corregir la nota.

## Sonido y ritmo

### ALTA
1. 13,80-15,85: FALTA el remate "Los «yo voy» no pedalean." en la mezcla: gen.mjs nunca llama `voz("m3", T.m3, -1)`; el stem de voz es silencio digital ahí y la burbuja y la boca se mueven mudas. Agregarlo, re-mezclar y medir voz/resto 13,3-16,4.

### MEDIA
2. "pedalean" se oye "pedalea/pedalear" en las 3 tomas de 04-mauro: si la "n" no se oye con la voz ya en la mezcla, regenerar solo esa frase.
3. Cierre 3,45 s (39,22-42,67), plano C 3,6 s sin cambio: ≤ 3 s.
4. Huecos sin voz vacíos (20-35 LU bajo la voz): 7,0-11,0 (7,3 s sin voz desde 6,48), 11,5 (-46), 24,5-29,5 (cama techo -40 con pasabajos, gen.mjs ~318), 37-39: subir la cama hacia el techo de -31 sin tocar los tramos con voz.

### BAJA
5. 5,13-6,48: "Llena" de "Llena, Majo. Perdoná." sale débil.
6. 3,19-5,05: audio de Majo con filtro poco claro (la burbuja cubre).
7. 22,31-24,07: "¿Quedan" arranca suave.
8. Cartel: las letras van 0,15-0,45 s adelante de la voz ("reservas", "más tarde…").

## Director de arte (cuadros en scratchpad/qa-gym-arte/: f30/NNNN.png con n = t·30+1, cortes/, full/)

### ALTA
1. 17,10-17,95 (P5c): no se ve el celular en el manubrio ni que lo da vuelta; la mano atraviesa el poste del manubrio (17,5); no se ve que suba la música. full/k.png.
2. 9,53-10,98: percheros ilegibles (bici 4 botella y 11 campera fuera de cuadro, celular de 30 px en la 7, mochila invisible en la 13); el rótulo "5 bicis vacías" no se comprueba (solo se ven 2). (= guion ALTA 1)
3. 32,9-34,9 (Q3b): Graciela de perfil: vincha verde como barra suelta cruzando la cara, un aro de los lentes flotando delante del ojo cerrado y el otro desaparece; dice la línea con la boca casi fuera de vista.

### MEDIA
4. 33,0 · 36,5 · 37,0: la patilla de los lentes de Graciela cruza el ojo; a 37,0 el aro izquierdo cuelga fuera de la cara.
5. 30,0-32,4: Sole pedalea en la bici 2 pero le tocó la 4 (la 4 no aparece).
6. Rodri ya dijo "Yo voy" en P1/P1b y a las 19:04 vuelve a sumar 22→23: usar otro nombre o sacarlo del grupo anterior.
7. 3,07: salto de continuidad del chat P1 → P1b (cambian los mensajes, desaparecen el pulgar y el audio 0:47; Mabel repetida dos veces).
8. 3,2-5,3: la burbuja "Mauro, ¿hay lugar a las siete?" tapa mensajes del chat.
9. 26,49-27,64 y 28,5-29,7: celular de Lucía con marco violeta y piso de madera marrón (fuera de paleta); mitad de abajo de la pantalla vacía.
10. 41,78-42,67: línea chica ~0,85 s (= guion 8).
11. 13,1-16,1 y 34,9-36,3: el cartel se lee "STUDIO" (cortado) y un glifo raro "Ʒ" desde 15,07.
12. 37,10-38,40: panel arranca con 4 tarjetas blancas vacías; la última vacía ~1,3 s.

### BAJA
13. 7,34-9,30: chip "Martes, 19:00." con reloj 18:52-18:59.
14. 0,4-1,8: burbuja antes que el contador (= guion 6).
15. 16,17-17,1: dock de la pantalla de bloqueo cortado a la derecha; contador pisa la esquina del celular.
16. 21,4-26,5: números "✓ 1…14" del mapa ~22 px; cuña verde oscura cortada a la izquierda (y 1240-1620).
17. 22,23-22,37: Majo con ojos cerrados al hablar.
18. 35,0-42,6: la toalla al cuello se sigue leyendo como tiradores; la de Graciela en la mano parece caja rígida (32,9-34,9).
19. 36,5: bulto blanco detrás del hombro de Graciela (tercer codo).
20. 39,1-42,6: la vincha de Mauro toca el borde de arriba; cartel cortado "UDIO MA".
21. 11,83-12,1: tercio superior del chat vacío; el rótulo del costo tapa el encabezado; el contador desaparece en el inserto.
22. 13,87-14,87: burbuja "Los «yo voy»" con segunda línea vacía 1 s: caja de una línea que crece.
