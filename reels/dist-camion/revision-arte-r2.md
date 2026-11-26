# dist-camion · revisión de arte r2 (QA visual independiente, sobre renders/dist-camion-final.mp4, 45,97 s)

Cuadros en /tmp/claude-0/-home-user-scalerics-reels/e7134b03-b34e-5982-a6c2-3d3afd5d546e/scratchpad/qa-camion-r2/
(`hoja0-7.png` = cada 0,25 s con la hora impresa; `cortes/c_<t>.png` = 30 fps ±0,3 s en cada corte (cuadro i = t-0,3+i/30);
`full/t_<t>.png` = cuadros a 540 px; `full/mate_42.6.png`, `full/ruso_18.png`, `full/barra_36.5.png`, `cortes/p6a_mano.png`,
`cortes/cierre.png` = detalles).
Cortes detectados (scdet): 1,77 · 2,87 · 5,07 · 6,0 · 8,9 · 12,6 · 13,8 · 15,27 · 16,4 · 19,9 · 20,43 · ~22,6 (iris) · 23,63 ·
25,37 · 27,33 · 28,13 · 29,3 · 32,37 · 34,43 · 35,07 · 36,17 · 38,4 · 39,23 · 40,0 · 41,4 · 42,27. Ninguno en negro, ninguno con
un cuadro de la cámara anterior, ningún texto fantasma en los cortes.

## Estado de la ronda 1
- Alta 1 (puerta que atraviesa al Ruso, 13,8): **resuelto** (las puertas ya están abiertas; c_13.8).
- Alta 2 (globos pisados en P5/Q3): **resuelto** (secuenciales, 6,0-8,9 y 29,3-32,3).
- Alta 3 (globo sobre la cara de Graciela, cuadro 0): **resuelto** (globo a la izquierda, sello sin pisar el pelo; full/t_0.0).
- Medio 4 (guía a la pila): **a medias**: ahora sale del rótulo hacia arriba-izquierda y termina FUERA del cuadro, en la caja
  cortada por el borde (14,0-15,1; full/t_14.5). Ver baja 12.
- Medio 5 (¿? del remito): **resuelto** (se lee "Recibió: ~~~ ¿?"); las manos siguen siendo dos salchichas (baja 13).
- Medio 6 (aviso de Marta): **resuelto** con el inserto Q2i (27,33-28,13; full/t_27.5).
- Medio 7 (planos generales chicos con la mitad de abajo vacía): **resuelto en el muelle y el súper, NO en la oficina** (media 3).
- Medio 8 (texto pisado en el panel): **resuelto** ("Parada 16 · Cafetería Marta · 12 a 13 h").
- Medio 9 (reloj/celular en 10:50): **resuelto en Q3**, pero ahora rompe Q1 (media 2).
- Medio 10 (P6a cortado): **resuelto** el encuadre; aparece el problema de la mano (alta 1).
- Medio 11 (Q4 cortado): **resuelto** (los dos enteros; las cajas cortadas a la derecha son utilería).
- Medio 12 (el Ruso): bandas y dedos **resueltos**; la barba **sigue mal** (media 1).
- Medio 13 (tarjeta que tapa a Rubén): **resuelto** (cabeza y mate arriba de la tarjeta), pero ver media 4 (la pose del mate).
- Medio 14 (P4b en negro): **resuelto** (rambla y tablero); queda chico (baja 1).
- Medio 15 (horas fuera del recuadro): **resuelto** (full/t_27.5).

## ALTA (no se entrega así)
1. **12,6-13,8 (P6a) · el puño del Ruso está pegado/metido en su propia nariz**, no contra la persiana. Todo el plano: la mano
   levantada queda delante de la nariz y los dedos se confunden con ella (se lee "se rasca la nariz" o "se mete el dedo"), y no
   llega a tocar las lamas. Es justo lo que CLAUDE.md pide cazar ("manos que atraviesan la cara, dedos en la boca").
   `cortes/p6a_mano.png`, `full/t_13.0.png`. Cambiar: el brazo extendido hacia adelante y abajo de la cara (a la altura del pecho
   o del hombro), el puño apoyado en la persiana con 10-15 cm de aire hasta la nariz; o el Ruso 20-30 cm más lejos de la persiana
   con el brazo estirado.

## MEDIA
1. **El Ruso, todos sus planos (12,6-19,9 · 35,07-36,17 · 39,23-42,27) · la barba se lee como media cara manchada o una
   máscara.** Es una cáscara color oliva con un borde recto y duro que baja vertical detrás de la oreja y corta la cabeza en dos
   tonos; de perfil y de espaldas (que es como más se lo ve) parece suciedad o una sombra rota, no una barba. El pelo es un
   casquete amarillo con un borde recto sobre la frente. `full/ruso_18.png`, `full/t_16.8.png`, `full/t_19.0.png`,
   `full/t_39.5.png`. Cambiar: barba con volumen propio (bultos/mechones como el bigote de Rubén) y borde redondeado que siga la
   mandíbula, sin subir detrás de la oreja; o barba de 3 días bien oscura solo en mentón y mejilla; o sin barba.
2. **22,91-23,63 (Q1) · continuidad de hora.** El chip dice "Martes, 9:40." pero el panel del monitor ya marca "14 de 18",
   "Parada 14 · Panadería Nelly ✓ 10:31" y "Parada 15 · llega 10:52", y el celular del escritorio dice "10:50". A las 9:40 no
   puede haber una entrega hecha a las 10:31. `full/t_23.2.png`. Cambiar: en Q1 el panel con el estado de las 9:40 (p. ej.
   "8 de 18", paradas 9-11 con horas antes de las 10, Graciela como próxima) y el celular en 9:40; el 10:50 queda solo para Q3.
3. **5,97-8,88 y 29,3-32,37 (P5/Q3, la oficina) · plano general con personajes chicos.** El 12 % de arriba es una banda gris
   lisa (techo) con una línea clara suelta en el borde superior izquierdo (x 0-620 a 1080), y el 30 % de abajo es el frente navy
   del escritorio + el piso de madera, sin nada. Las cabezas miden ~250-280 px. Son 6 s del reel, con los remates "Llegando." /
   "¿Adónde?". `full/t_7.0.png`, `hoja1.png`, `hoja4.png` (29,25-29,75). Cambiar: bajar la cámara y cerrar a plano medio
   (Rubén desde la cintura, Nico desde las rodillas), de modo que el borde del escritorio quede en el tercio de abajo y no se vea
   techo; o subir el encuadre ~250 px.
4. **42,27-45,97 (cierre C) · Rubén tiene el mate apretado contra la mejilla**, con la mano tapándole el cachete, como si fuera un
   teléfono; el mate pisa el contorno de la cara. Es el plano final, el que más se mira. `full/t_42.4.png`, `full/mate_42.6.png`,
   `cortes/cierre.png`. Cambiar: el mate a la altura del pecho/hombro, separado de la cara (el gesto de "brindis" o de mostrarlo
   a cámara), o el brazo bajo con el mate en la mano.
5. **36,17-38,4 (Q4i) · una barra negra vertical sale de la parte de arriba del celular hasta el borde superior** (x ~300-500,
   y 0-520 a 1080), con el globo "Vos." encima. Se lee como un palo pegado al celular. `full/barra_36.5.png`, `full/t_36.5.png`.
   Cambiar: sacar del encuadre lo que la produce (manga del Ruso o marco de la puerta del súper) o correr la cámara; el fondo
   liso queda bien.

## BAJA
1. 5,07-5,97 (P4b): el celular arranca chico (~20 % del ancho) y crece; "llamadas perdidas" mide ~22 px y el rótulo "Maneja. No
   atiende." entra 0,3 s después del corte en un plano de 0,9 s. Arrancar más cerca o con el rótulo desde el primer cuadro.
   `c_5.07.png`, `full/t_5.5.png`.
2. 34,43-35,07 (Q4r): la hoja de ruta ocupa ~40 % del ancho y la mitad de abajo es tablero navy liso; "16 · Cafetería Marta" y
   "17 · Kiosco Beto" en gris sobre crema a ~26 px. `full/t_34.6.png`. Más cerca y los renglones en navy.
3. 8,88-12,41 (P5b): cuando entra "A algún lado llega." (11,0) la primera línea del globo se achica (cambia el tamaño de letra de
   "Es un camión, Nico." en el mismo globo). `hoja1.png` 10,75 → 11,0. Mantener el tamaño (globo más ancho).
4. 23,63 (Q1i), 27,33 (Q2i), 28,13-29,3 (Q2): manos tipo manopla (palma redonda + un dedo); en Q2 la mano de Marta tapa "hora" del
   cartel ("¡No sabía a qué [mano]ora venían!"). `full/t_27.5.png`, `full/t_28.5.png`.
5. 36,17-38,4 (Q4i): el pulgar izquierdo es una salchicha suelta al lado del celular (no lo agarra); el dedo que firma tapa
   "Recibió: Héctor" y "Entregar" mientras firma. `full/t_36.5.png`.
6. 27,33-28,13 (Q2i): pieza navy oscura con sombra en la esquina superior izquierda (ya anotada por el constructor). `full/t_27.5.png`.
7. 28,13-29,3 (Q2): la cola del globo "Al banco voy a la una." apoya sobre el rodete de Marta; el 20 % de abajo es frente del
   mostrador liso. `full/t_28.5.png`.
8. 38,4-39,0 (Q4p): el chip "Entregado ✓" se posa sobre el texto de la fila ("Parada 15 · Súper Entregado ✓ga 10:52") 3-4 cuadros
   antes de que la fila cambie a "✓ 10:52". `full/t_38.75.png`. Que el chip se funda al tocar la fila.
9. 22,91-23,15 (Q1): el chip "Martes, 9:40." entra ~0,25 s después del iris (cuadros sin chip en c_22.6).
10. 29,3-32,37 (Q3) y 6,0-8,9 (P5): el monitor y el calendario cortados en el borde izquierdo (se leen pedazos "10:31", "EMBRE").
11. 16,4-19,9 (P6c): la etiqueta "MARTA" de la caja de adelante cortada por el borde inferior; un punto naranja (el reflectivo
    del camión) asoma junto al cuello del Ruso. `full/t_16.8.png`.
12. 13,8-15,27 (P6b): la línea guía de "Cafetería Marta · vuelve al depósito" sale del cuadro por el borde izquierdo en vez de
    terminar sobre una caja "MARTA" visible. `full/t_14.5.png`.
13. 15,27-16,4 (P6i): las dos manos del remito son dos dedos sueltos que salen de las esquinas. `c_15.27.png`.
14. 42,78-44,0 (C): antes de que entre la línea chica, debajo de la tarjeta asoman las piernas de Rubén ("cartel con patas") ~1,2 s.
    `hoja7.png` 43,0-43,75.

## Lo que está bien
Cuadro 0 limpio (DISTRIBUIDORAS + "Martes, 9:40." + globo al costado de Graciela). Globos sin pisarse en toda la parte 1 y la
oficina. Cartel verde sin "Scalerics", con letras que rebotan y el iris abriendo sobre la escena (sin pantalla vacía). Insertos
de la parte 2 (aviso 10-11 y "Sos la próxima parada", aviso de Marta 12-13, panel, remito con firma y foto, "18 de 18 · 0 cajas
de vuelta") grandes y legibles. Q4 y el muelle con los dos personajes enteros y llenando el cuadro. Tarjeta CAMIÓN de 3,15 s sin
texto fantasma. Ortografía de globos, rótulos y pantallas correcta ("¿Qué… señor?", "Vos. No un señor.", "Cafetería", "remito
firmado"). Sin cortes en negro ni saltos de cámara de un cuadro.

## Veredicto
No llega todavía a la vara de abren-hoy-completo por **1 alta** (el puño del Ruso en la nariz, P6a) y 5 medias, de las que la
barba del Ruso (en todos sus planos), la hora de Q1 y el mate contra la cara en el plano final son las que un dueño nota.
Corregidas esas, el reel queda entregable; las bajas son pulido.
