# veterinaria-vacunas · QA ronda 1 (revisores independientes, sobre el render de 39,9 s)

## Guion y datos (cuadros en renders/qa-guion-r1/)
1. MEDIA · la parte 2 es el 48 %: sacar ~1-1,5 s de la parte 1 (escalada P2 3,5-7 s o el tramo de Bruno 7-10 s) y/o estirar lo que explica la solución (puntos 3 y 5).
2. MEDIA · ~28,5-31 s · el panel dice "Vencidas 63 → 15" con el chip "JUNIO · 5 días antes" (nada está vencido 5 días antes). Renombrar a "Sin turno" o "Pendientes" (63 → 15); "63 recordatorios enviados" mantiene el callback.
3. MEDIA · ≈28,3-28,6 s · "Turno reservado ✓ · Martes 10:00" dura 0,3-0,4 s: dejarlo ≥ 1 s.
4. MEDIA · cuadro 0 (0-3 s) · no muestra el dolor: consulta tranquila, el fichero es una cajita chica en el carrito, sin pestañas rojas "VENCIDA". Fichero desbordado más grande y en primer término desde el cuadro 0, con pestañas rojas legibles.
5. MEDIA · ≈24,0-25,0 s · la ficha de Toto en la tablet a pantalla completa ~1 s con 5 renglones: 1,5-2 s, y el rótulo "La ficha de cada paciente" desde el primer cuadro del inserto.
6. BAJA-MEDIA · "Próxima: JUNIO" anotada en MARZO a un perro adulto de 6 años suena raro a una veterinaria. Opción: que el cuadro 0 sea JUNIO (del año anterior), ficha "Próxima: junio", P2 avanza JULIO… hasta MAYO/JUNIO del año siguiente y el golpe en JULIO; parte 2 "Un año después · 5 días antes". Si no da, dejarlo.
7. BAJA · ≈11,5-12,8 s · la burbuja de Vero queda parada en "…escribieron de la de" ~1-1,3 s: revisar tiempos por palabra o revelar "de la de la vuelta." junto.
8. BAJA · portada: chica "Julio." (1 palabra; pide 2-4): p.ej. "Vino vacunado." En la portada, el pañuelo rojo se lee como dos pinchos, una varilla de los lentes de Inés le cruza el ojo derecho, la mitad de arriba de la cabeza de Inés en penumbra.
9. BAJA · ≈13,5 s · "$ 94.500 que no volvieron" → opcional "$ 94.500 sin volver".
10. BAJA · ≈4,0-5,0 s · la línea guía "Ficha de Toto" apunta a una ficha en blanco ("FICHA" sin nombre): que se vea "TOTO" en la pestaña.

## Director de arte (cuadros en renders/qa-arte-r1/f/NNNN.png, NNNN = t/0,25; grandes en big/; cortes en cuts/)
ALTA (9; varios son de rig y aparecen en todo el reel: arreglar primero 2, 3 y 7)
1. 0,0-3,5 y 20,5-24,2 s (f/0000, f/0011, big/c0, f/0092) · el hocico y la oreja de Toto atraviesan la mejilla y los lentes de Inés; a 2,75 s su cara queda tapada mientras dice "Yo le aviso.". Separar a Inés 25-30 cm o girarla a 3/4; Toto entre los dos sin tocar a nadie.
2. Rig · los lentes de Inés se despegan (un aro flota fuera de la cabeza) en 0-3,5, 6,5-10,2 (f/0026, 0030, 0035, big/c2), 14,5, 17-18,1, 33,75, 35,25 s (big/t35_3); en la noche (f/0022) y en la portada la patilla cruza la pupila del ojo derecho. Atarlos al grupo de la cabeza con el offset correcto y limitar el giro de cabeza.
3. Rig · Inés con el ojo cerrado (rayita) en todos los 3/4 y perfiles, también hablando (f/0002, 0026, 0082, 0135, 0141). Abrir el párpado / ojo de perfil y revisar `parpado` por tiempo.
4. 9,0-10,2 s (f/0035-0040, cuts/r_9) · la cabeza de Bruno tapa a Inés justo en "El que quiere a su perro, se acuerda.": contraplano sobre Inés o separar y cruzar cámara.
5. 6,4-10,2 s (big/c2) · el fichero atraviesa cuerpo y manos de Bruno, y un aro verde (franja de la chaqueta) flota como salvavidas en la cintura. Caja adelante, manos por fuera; corregir la franja.
6. 17,0-18,1 s (f/0068-0072, cuts/cut_17.00, big/c4) · la pata de Toto se estira como columna blanca que atraviesa el canto del mostrador hasta la cara de Inés; Toto salta vertical 17,03-17,13; la mano de Inés con la pata delante de su boca. Toto parado en las traseras con las delanteras en el mostrador, da la pata a una mano que baja; cámara más lateral.
7. Rig · la oreja parada de Toto se ve como tabla o palito suelto de atrás, 3/4 y perfil (f/0058, 0070, 0133, 0141): volumen, base ancha, cono redondeado con interior rosa, unida al cráneo.
8. 35,25 s (f/0140-0141, big/c9) · mentón y boca de Inés atraviesan el hocico de Toto en el segundo "¿Vos también, Toto?". Inés más arriba/atrás, cámara más baja y de frente.
9. 22,9-24,2 s (big/c5) y 31,25-32,7 s (big/c7) · la tablet le tapa la cara a Inés en "Le vamos a escribir a él." y "Ya salieron solos."; la burbuja tapa la cabeza de Toto. Tablet al costado y más baja, Inés de 3/4.
MEDIA
10. 15,17-17,0 s (cuts/cut_15.17) · Toto solo sobre fondo crema liso, sin mostrador ni Inés, la cola de la burbuja apunta a nada, el pañuelo no entra. Plano picado desde Inés con su hombro/cabeza en primer término, borde del mostrador navy, pañuelo visible.
11. 5,4-6,4 s (big/c1) · la noche: mitad de abajo vacía desde y≈1100. Bajar cámara o poner fichero y ficha de Toto en primer plano.
12. 6,1-6,3 s · la mano con el teléfono pasa por delante de lentes y ojos al colgar.
13. 10,3-14,2 s (big/c3) · Vero habla de espaldas; Inés chiquita y cortada a la izquierda; a 10,3 Vero cortada a la derecha. Contraplano desde atrás del mostrador o 3/4.
14. 10,5-13,1 s · la burbuja de Vero grande y vacía mientras se escribe; corte de línea feo ("escribieron de la / de"). Caja según el texto visible o líneas enteras.
15. f/0046-0060 · el pañuelo rojo de la otra veterinaria no se lee (triangulito bajo el collar); en la portada parece dos solapas. Agrandar, triángulo de frente, mostrarlo en el plano de Toto.
16. 14,4-15,1 s · los rótulos "63 vacunas vencidas…" y "$ 94.500…" tapan la cara de Inés, que está cortada a la izquierda; el fichero apuntado también cortado.
17. 25,0-25,7 y 27,8-28,7 s (big/c6) · el inserto del celular ocupa ~45 % del ancho, a la izquierda, mitad derecha crema lisa: centrar y ≥ 60 %.
18. 25,9-27,8 s · la burbuja "¡Toto! ¡Te escribieron!" tapa ojos y frente de Vero; a 25,9-26,1 Vero cierra los ojos; su boca de perfil sobresale como pico (f/0103).
19. 29,2-31,2 s · Bruno dice su línea sin estar en pantalla (burbuja con avatar sobre el panel a pantalla completa): que se lo vea al lado con la tablet.
20. 31,25-32,7 s · la tablet en la mano de Bruno es una pantalla negra lisa: ponerle el panel o la agenda.
21. 32,75 s (big/c8) · sala de espera: cabezas del señor de Coco y la dueña de Mora superpuestas; Luna casi no se ve; 40 % de abajo piso vacío.
22. 2,0-3,5 s y 38,25-39,9 s · la ficha "Próxima: JUNIO" y "Ficha de cada mascota… scalerics.com" caen en y≈1430-1860 (zona de botones de Instagram): subir a y ≤ 1500.
23. 36,4-36,6 s (cuts/cut_36.40) · barrido brusco panel→Sofi en 0,15 s; "Comentá VACUNA" entra chica y cortada ("nentá"); el panel queda cortado a la derecha todo el cierre. Panel entero junto a Sofi, viaje suave.
24. 4,2-5,4 s (cuts/cut_4.17) · la guía "Ficha de Toto" apunta a fichas nuevas en blanco; mover la guía con la ficha de Toto o poner nombres a las nuevas.
BAJA
25. cuadro 0: el dolor se lee poco (ver guion 4); "VETERINARIAS" (y≈110-290) en parte bajo la barra de Instagram: bajarla un poco.
26. 0,0 y 20,5-21,2 s · franja crema de techo de ~100 px arriba.
27. 6,5-9 s · Inés "se lava las manos" sin agua ni pileta.
28. 18,2-20,4 s · cartel: texto blanco sobre verde de bajo contraste y corrido a la izquierda (comparar con el cartel de taller-presupuestos).
29. 30-31 s · "Segundo aviso: mañana" ~23 px.
30. 28,0-28,3 s · el círculo del toque deja un aro oscuro sobre "10:00".
31. 14,2 y 17,0 s · cartel "VETERINARIA INÉS" cortado ("ARIA IN"); en la parte 2 no se ve la chapita verde del collar.
32. Portada: el sello tapa frente y lente de Inés; patilla sobre el ojo; Inés cortada arriba; "pañuelo" como dos solapas.

## Sonido y ritmo (renders/qa-sonido-r1/)
1. MEDIA-ALTA · parte 2 al 48 %: sacar ~2 s de parte 1 en gen.mjs sin tocar la pausa de 1,34 s antes de "¿Vos también, Toto?": a) v2 sin "¡Doctora!" y su pausa (0,85 s; regenerar v2 sin el saludo y atempo ≤ 1,08, que hoy "le escribieron" suena "la escribieron"); b) MES 0,6 → 0,45; c) T.p7 + 1,15 → + 0,9; d) T.p3 = p2c + 0,95 → + 0,8 (ladrido + 0,25, cuelgue + 0,55); e) T.v1 0,3 → 0,15 y T.p2 = guarda + 0,25 → + 0,15; f) cartel P2 = P1 + nar + 0,05. Meta ~37,9 s, parte 2 ≥ 50,5 %.
2. MEDIA · 5,42-5,77 s · la llamada de noche sin tono de llamada: 1-2 tonos (k-tono / k-dos-tonos, pasabajos de auricular, techo -36) y verificar crédito.
3. MEDIA-BAJA · 24,15-24,2 s · el corte al inserto de la tablet pisa "a él" (el STT no lo oye en la mezcla): T.q1t = T.i4 + LEN.i4 + 0,3.
4. MEDIA · P4 10,25-14,20 (3,95 s) y P3 6,37-10,25 (3,88 s) sin cambio visual: contraplano a Vero/Toto con pañuelo en "de la vuelta"; corte o push-in a Inés en "El que quiere a su perro" (coincide con arte 4 y 13).
5. BAJA-MEDIA · cierre 3,27 s: aire final 0,4 → 0,25 y "Comentá VACUNA" entra en "Comentá" (~36,3). ~3,0 s.
6. BAJA-MEDIA · 11,59-12,1 s · burbuja de v2 por tercios deja "de" colgado: cortar en frase con los tiempos reales (= guion 7, arte 14).
7. BAJA-MEDIA · 27,68 s · el ladrido contento cae sobre el inserto del celular: ladrido ~T.v3 + LEN.v3 - 0,2 o correr el corte.
8. BAJA-MEDIA · 28,73-29,63 s · el panel termina de contar antes de que Bruno pregunte: panel quieto (63 enviados ✓, 0 turnos) durante la pregunta, contadores corriendo sobre "Ya salieron solos" con tics todo el conteo.
9. BAJA · 15,45 s · "¿Vos también, Toto?" sin pausita antes de "Toto": 0,15 s de silencio o otra toma.
10. BAJA · 3,5-6,4 s · escalada floja (-28/-30): música del montaje al techo, un plac por ficha, pop en el chip "JUNIO · 21:40".
11. BAJA · 32,75 campanita ~0,15 s antes de que se abra la puerta (→ ~32,88); Vero entra sin pasos en la parte 2; Inés da la mano sin roce de tela en 35,3.
