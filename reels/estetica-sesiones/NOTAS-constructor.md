# estetica-sesiones · notas del constructor (19-11)

Proyecto con la forma de estetica-turnos / resto-reservas: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada con
partes de `reels/estetica-turnos/assets/tres.js` (utilidades, set del centro, living, tarjetas pegadas a la cámara,
insertos) + lo nuevo. `assets/personajes.js` = el de estetica-turnos con un parámetro nuevo de pose: `estira` (sentada con
las piernas estiradas: Carolina en la camilla).

## Comandos (desde reels/estetica-sesiones)
```
LINEAS=partes/lineas.tsv TOMAS="a b c" bash partes/reintentar.sh    # tomas Gemini (de a una por la cuota)
LINEAS=partes/lineas-extra.tsv TOMAS="d e f" bash partes/reintentar.sh   # retomas de 10 y 13
bash partes/medir-tomas.sh       # recorta silencios a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh          # assets/voice/ desde las tomas elegidas
node gen.mjs                     # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni tarjetas
python3 medir.py                 # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre       # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1;t2@px,py,pz,mx,my,mz,fov" renders/prev/x   # solo la capa 3D (FULL=1 a 1080; JS='window.__dbg={lor:[x,z,giro]}')
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/estetica-sesiones.mp4
bash paso10.sh                   # paso 10 (loudnorm en dos pasadas) → renders/estetica-sesiones-final.mp4
```

## Voces (partes/procesar.sh; "oyó:" del STT igual al texto, sin tildes)
Lorena = Kore, Carolina = Leda (las de estetica-turnos); Vale sin voz; narrador = `reels/ya-lo-cargo/assets/voice/narrador.wav`
(Rasalgethi, "Un sistema más tarde.", 2,26 s). Tomas: c1 01-c · l1 02-c · l2 03-b (atempo 1,06; la a no decía "una") ·
c2 04-a (atempo 1,06; con la pausa interna recortada el STT oía "una vaca", se dejó entera) · l3 05-b · c3 06-c (la única
"cuánto da") · l4 07-c · l5 08-c · c4 10-a ("Ah." pausa "Tres.") · l6 11-a con la pausa interna 0,58 → 0,2 s · c5 12-a ·
l7 13-e (retoma más ágil, atempo 1,05: 3,32 s; "SESIONES" a 0,30 s). c1 y l5 son el MISMO audio en la parte 1 y en la 2.

## Duración
43,2 s. Parte 1 0-17,56 · cartel 17,56-19,92 · parte 2 19,92-43,2 = 23,3 s (54 %). Cierre (C) desde 39,41, tarjeta
SESIONES desde 39,88, línea chica desde 41,85. Más que los 39,4 del plan: las voces reales (c2 2,42 s, l7 3,32 s) y los
insertos de lectura (ficha 1,25 s, mensaje 1,3 s, renovar 2,25 s).

## Mundo / planos
La camilla derecha a lo largo de z (rot 0: Carolina de frente a cámara, recostada en el respaldo levantado, toalla
sobre las piernas, gafas de láser en la frente). Vale en el banquito a la izquierda de la camilla, a la altura de las
piernas (-1,12, -0,98), con el cabezal. El equipo láser atrás a la izquierda (-1,06, -2,46), frente hacia la camilla, el
costado con el post-it CARO a cámara; Vale lo gira 180° en P6 y aparece el costado de 38 post-its. Lorena parada atrás a
la derecha (0,5, -2,3) con el cuaderno de paquetes. La lámpara lupa apagada en el rincón derecho; el carrito adelante a
la derecha; el tacho al lado del equipo. Recepción: la tablet del panel en el atril, Lorena detrás del mostrador; los
cisnes en el estante (solo en Q4; en C quedaban como orejas sobre su cabeza). Living de Carolina en x = 30 con la mesita
del cajón.
P1 general (cuadro 0) · P2 el cuaderno de cerca (cámara pegada al cuaderno) · P3 Carolina saca la tarjetita · P3b la
tarjetita de cerca · P4 general con los tres rótulos · P5 Lorena de frente · P5b Carolina · P5c Lorena ("Tres.") · P6 el
equipo y Vale, el giro y los post-its · cartel · Q1 = P1 · Q1f inserto de la ficha · Q1b Carolina con el celular · Q1c
inserto del mensaje · Q1d Carolina · Q1e = P5 · Q2 = P6 · Q2i inserto de la ficha de Jimena · Q2b el post-it al tacho ·
Q3 el living · Q3i inserto del aviso de renovar · Q3b la tarjetita al cajón · Q4 el panel · C Lorena a cámara.

## Mezcla
Como resto-reservas (bus +6 dB → compresor → ganancia a -14 LUFS → limitador). SFX nuevos CC0 de BigSoundBank (cierre,
cajón, tapa, bollito, pip; ver fuentes.md). Duck de la cama hasta 0,95 s después de cada voz.

## Pasadas
- Armado (prev.mjs de la capa 3D, ~15 hojas): la camilla girada 0,55 de estetica-turnos dejaba a Lorena de espaldas
  tapando a Carolina en el cuadro 0 → camilla derecha (rot 0) y Carolina de frente; Lorena parada atrás a la derecha
  (cara 3/4 a cámara); Vale a la izquierda de las piernas; el equipo atrás a la izquierda (antes lo tapaba Vale: Vale más
  a la izquierda y cámara desde la derecha, el post-it CARO a 0,17 m); el cuaderno mira a Lorena (la página de Carolina a
  su derecha) y el inserto P2 es una cámara pegada al cuaderno de 45° (en la normal quedaba dentro de su cabeza); las
  manos en los bordes del cuaderno en P2 (tapaban los palitos); la tarjetita agarrada del borde de abajo; las gafas
  parecían vincha → dos lentes abombados con brillo; los primeros planos de Lorena con la cabeza casi al frente (de 3/4
  la melena le tapaba la cara); Vale en P6/Q2 al costado del equipo (no delante); el carrito adelante a la derecha y la
  lámpara lupa al rincón derecho.
- Pasada 1 (hyperframes snapshot cada 0,5 s desde 0, renders/snap/p1): no aparecía NINGÚN globo con fin abierto (sale(Infinity)
  daba NaN) → fin 1e6; el cartel se iba de los bordes → 148/136 px; "hecha ✓" pisado; "Renovar y pagar" tapado por la
  mano → el aviso más compacto; el tacho fuera de cuadro → al lado del equipo; la tarjetita asomaba en el primer plano de
  Lorena → baja antes; living con Carolina cortada → cámara más atrás; cierre con la tablet cortada y los cisnes como
  orejas sobre la cabeza de Lorena → cámara más abierta y cisnes solo en Q4.
- Pasada 2 (cada 0,5 s desde 0,25, renders/snap/p2): "Te quedan 3." tocaba el borde de la burbuja → ajuste; "Ah. Tres." le
  tapaba los ojos a Carolina → arriba y el rótulo abajo; living con Carolina cortada a la izquierda → cámara más atrás;
  cierre con la cara cortada a la derecha → fov 56; la tarjeta SESIONES le tapaba el mentón → cámara más baja y el vinilo
  "Lorena Estética" del mostrador (cortado abajo) oculto en C; "Descontadas este mes".
- check --json: 0 errores (warnings de siempre: canvas al borde, dead_stretch que no ve el canvas).
- medir.py: mínimo -1,7 por dos tramos de 0,5 s (16,5 y 30,0 s) que son la cola (-35 LUFS momentáneo, los últimos 60 ms)
  de "Vale, ¿y la de Jimena?" contra la cama que vuelve; con umbral de voz -30 el mínimo es +7,4 LU. Mezcla -14,2 LUFS,
  pico -2,5 dBFS.
- Render: 20 min 12 s (hyperframes render --workers 2, con el candado). paso10.sh → renders/estetica-sesiones-final.mp4: 43,2 s,
  -14,1 LUFS, pico -2,4 dBFS. Hoja del final mirada: sin globos faltantes ni cortes.
- Portada: fondo LIMPIO=1 de P4 (9,4 s) con cámara propia (ver "cam" en portada.json): Carolina con las gafas y la tarjetita,
  Lorena con el cuaderno, el equipo con el post-it CARO, en la mitad de arriba; "¿Cuántas me quedan?" / "Jueves, 18:00." /
  ESTÉTICA.

## Flojo / para los revisores
- 43,2 s (plan 39,4): parte 2 + cierre 23,3 s (54 %).
- En el cuadro 0 Vale queda medio cortada en el borde izquierdo (de espaldas, con el cabezal); el equipo se ve detrás de ella.
- El post-it CARO en el plano general (P4) se lee chico (los 8 palitos no se cuentan ahí; sí el rótulo "Post-it: quedan 2").
- P2: abajo del cuaderno asoma la manga de Lorena (navy con la franja verde) como un arco grande.
- P6: Vale "gira" el equipo con las manos arriba y después las suelta; no camina con él.
- Q2b: el despegue del post-it y el bollito al tacho son chicos en el plano.
- medir.py marca dos tramos de cola de voz (ver arriba).

## Ronda 1 de corrección (3 revisores, 19-11)
**43,0 s.** Parte 1 0-17,51 · cartel 17,51-19,87 · parte 2 19,87-43,0 = 23,1 s (54 %). C desde 39,36; SESIONES 39,83; línea
chica 40,73; cola 0,15 s después de la voz (tarjeta 3,17 s).
- A1 guías de P4: los tres rótulos abajo (Post-it izq., Tarjetita centro, Cuaderno der.) y las guías suben a cada papel
  sin cruzar caras; la de la tarjetita ya no baja desde arriba por el reloj y la cara.
- A2 el panel entra con las 4 filas cargadas (T.filas = q4 − 0,05), cámara ya cerca, Lorena oculta en Q4.
- A3 el chat de Carolina arranca con la burbuja (T.msg = q1c).
- M4 Vale suelta el equipo antes del giro; post-its en 4 columnas × 9 filas dentro del costado, más pegados, nombres que
  entran en el papel; el push-in de P6 termina antes (Vale entera).
- M5 inserto nuevo P4b (8,70-9,45): el post-it CARO de cerca con "Post-it: quedan 2"; P1/P4 más abiertos y cerrados sobre
  los personajes (Vale y Lorena enteras, menos piso).
- M6 la mesita al lado de la rodilla con el cajón hacia Carolina; la tarjetita va de la mano al cajón abierto (vuela los
  últimos cm) y queda adentro cuando se cierra; cabeza menos girada.
- M7 cierre: tarjeta más abajo (top 1170) y línea chica abajo (1680); cámara que deja la cara arriba y el panel con el "0"
  verde visible arriba de la tarjeta; ojos a cámara; la línea chica entra 0,9 s después de SESIONES; cola 0,15 s.
- M8 "Vale, ¿y la de Jimena?" con cabecera "Lorena" (avatar) y la cola hacia afuera del cuadro a la derecha (P6 y Q2).
- M9 rótulo "El promedio daba 2. / Le dio 3 para no discutir.".
- M10 el cierre de la cartera 0,3 s antes y -6 dB: el STT sobre la mezcla oye "una acá tengo 7 sellos".
- M11 acento en la revelación: papel a -40 + madera-golpe a -36 + pop.
- B12 generales más abiertos. B13 la tablet de Vale agarrada del borde (el puño no tapa); Vale con sonrisa en Q2.
- B14 primeros planos más abiertos (fov 48-54). B15 insertos de interfaz ×1,18 (tablets) y ×1,1 (celulares);
  "Arranca después…" 46 px; los globos salen sin fundido. B16 tilde y 4 → 3 en el mismo cuadro. B17 tic al aparecer la
  ficha de Jimena. B18 parte 1 −0,05 s neto (+0,75 del inserto del post-it, −0,8 en pausas y P3b).
- medir.py: mínimo +7,4 LU (ya sin las colas).
- Render r1: 18 min 52 s; final 43,0 s, -14,0 LUFS, pico -2,6 dBFS; check 0 errores; hoja del final mirada.
- B19 portada rehecha: fondo LIMPIO de P4c (9,9 s) más abierto (cam en portada.json): Vale, Carolina y Lorena enteras arriba;
  la coma de "JUEVES, 18:00." sobre el fondo oscuro.
- No hecho: el "pelo tipo casquete" de Lorena (es el peinado "melena" de personajes.js, el mismo de estetica-turnos).

## Ronda 2 de corrección (3 revisores, 24-11)
**44,77 s.** Parte 1 0-19,22 · cartel 19,22-21,58 · parte 2 21,58-44,77 = 23,2 s (52 %). Beats: P2 2,90 · P3 4,72 ·
P3b 7,28 · P4 7,98 · P4b 8,60 · P4c 9,30 · P5 9,85 · P5b 11,47 · P5c 12,47 ("Tres." 13,05; rótulo promedio 13,68; plata
14,53) · P6 15,58 (giro 17,07-17,67; rótulo 17,72) · Q1f 22,08 · Q1b 23,33 · Q1c 25,24 · Q1d 26,54 · Q1e 27,92 · Q2 29,66 ·
Q2i 31,42 · Q2b 32,47 · Q3 33,70 · Q3i 34,15 · Q3b 36,40 · Q4 38,82 · C 40,82 (tarjeta desde 40,82; SESIONES 41,29; línea
chica 42,19; cola 0,45 s).
Arreglado:
- A-1 (la cara de Lorena): en `assets/personajes.js` (copia propia) opción nueva `frenteLibre` (solo Lorena, la única con
  "melena"): el casquete inclinado hacia atrás (rotación x -0,46 en vez de -0,02: el borde de adelante queda por encima de
  las cejas levantadas), las puntas del flequillo del borde más cortas (0,07 en vez de 0,16) y las mechas del flequillo
  +0,12 rad más arriba. Frente, cejas, pestañas y ojos enteros, sin astillas de blanco ni motas en la sien; mirada de
  frente y de 3/4 en P5, P5c, Q1e y C.
- A-1 cierre / A-7 / A-8: en C Lorena de frente a cámara (giro π-0,05, cabeza y ojos al frente: la boca ya no se tuerce),
  las dos manos debajo del mostrador (los dedos lo atravesaban), cámara x 0,02 fov 55 y la tablet del atril a x 0,27
  (cara y panel enteros); Q4 recentrado en la tablet.
- A-2: la mesita a x 30,76 y el cajón sale 0,2 (no 0,32): queda enganchado en la mesita y no cruza la pierna; la mano
  de Carolina va encima del cajón y la tarjetita cae desde los dedos.
- A-3: en Q2b la tablet quedó sobre el banquito; Vale de 3/4 (giro 1,15) despega el post-it con la izquierda (el equipo le
  queda a la izquierda), hace el bollito delante del pecho (más grande, ×1,6-2,2) y lo tira al tacho que tiene adelante;
  cámara nueva más abierta y baja (tacho, banquito y tiro en cuadro).
- A-4: el globo de "Vale, ¿y la de Jimena?" en Q2 a y 440 (debajo del chip de la hora).
- A-5: P4/P4c mira a x -0,36 con fov 64 (Lorena entera a la derecha); P6 termina en P6C(0,52) (Vale entera).
- A-6: la tarjeta "Comentá SESIONES" desde el primer cuadro de C (pop de SESIONES en la palabra).
- A-9: Q3 y Q3b más cerca y más bajos (menos piso; Carolina y la mesita llenan).
- A-10: P1 (y Q1) mira a y 1,2 (menos piso abajo); la lámpara lupa fuera de la fusión y sin sombra (era la sombra grande).
- A-11: P3 mira a y 1,45 (el globo queda arriba de la cabeza, sin tapar las gafas); la tarjetita más abajo en el puño.
- A-12: la tarjetita no se dibuja en los primeros planos de Lorena (P5, P5c).
- A-13: en P2 Lorena (no el cuaderno) va a otra capa: no asoma la manga.
- A-14: Q1b con la cámara más baja: el reloj queda arriba de la cabeza.
- A-15: Carolina en el living ya no arranca parpadeando (el parpadeo pasó a Q3b + 0,9).
- A-16: el mensaje del inserto Q1c llena la pantalla (burbuja de 800 px, textos 64-124 px).
- A-17: "6 paquetes terminados." / "Nadie les avisó." / "No renovaron." (54 px).
- A-18: portada regenerada con el fondo limpio nuevo (ver abajo).
- S-A1: después de "Tres." 2,0 s en el plano: rótulo del promedio (56 px) y 0,85 s después el de la plata (56 px, $ 14.400
  a 92 px), los dos 1+ s en pantalla. S-M1: el rótulo de los 6 paquetes 1,5 s antes del cartel.
- S-M2: pips, hojas del cuaderno, papel y tela de la tarjetita y el banquito al techo (-31 a -33): 18-28 LU debajo de la voz
  (no se puede más sin pasar el techo de -31 por efecto). S-B4: sin los tics de birome en P2.
- S-B1: "Ah. Tres." se revela palabra por palabra: "Tres." a c4 + 1,18 (cuando se oye).
- S-B2: el duck de la pausa muda 0,4 (antes 0,75) y la pausa 0,15 s más corta. S-B3: +0,17 s antes de "¿Y cuánto da?".
- S-B5: el golpe de madera en el giro (gira[0] + 0,42), cuando aparece el costado de los post-its; a -40 y el pop a -45 para
  que la cola de "¿y la de Jimena?" no quede debajo de 6 LU. S-B6: cola de 0,45 s.
- G1 línea chica "La ficha de cada clienta: / cada sesión se descuenta sola". G3 en descripcion.txt. G4 "Por terminar ·
  avisadas". G6 "Con 1 sesión, le llega / el aviso para renovar". G5: Q4 0,25 s más corto (el resto de la parte 1 creció por
  S-A1 y S-M1).
- medir.py: mínimo +7,4 LU (l3 arranca 0,04 s después para que su ataque no caiga en el tramo de la pausa). Mezcla -14,1 LUFS,
  pico -2,5 dBFS.
No hecho / quedó así:
- G5: el reel quedó en 44,8 s (+1,8): S-A1 y S-M1 pedían ~2 s más de lectura; se recortó lo que no pisa esos tiempos.
- El respaldo de la camilla (`resp`) sigue sin agregarse a la escena (el `g.add(resp)` quedó dentro de un comentario en la
  construcción original); nadie lo marcó y agregarlo ahora cruzaría a Carolina. Para una ronda futura.

## Ronda 3 de corrección (24-11)
**45,53 s.** Parte 1 0-20,07 · cartel 20,07-22,43 · parte 2 22,43-45,53 = 23,1 s (51 %). Rótulo de la plata 14,53-16,43 ·
P6 16,43 · Q2 30,51 (l5b a q2 + 0,04) · Q2i 32,21 · C 41,61 (SESIONES 42,08; línea chica 42,98).
Arreglado:
- E1: los insertos del celular (Q1c y Q3i) sin la "mano" (palma + pulgar quietos que nunca tocaban): queda solo el círculo
  del toque sobre el botón.
- E2: P4 y P4c más abiertos (cám. 0,6/1,75/1,52 → -0,45/1,05/-1,95, fov 68): Vale y Lorena enteras cuando Vale señala.
- E3: `T.p6 = rotPlata + 1,9`: el rótulo de la plata ~1,9 s (+0,85 s al total).
- E4: Q2b Vale más a cámara (giro 0,88, cabeza al frente); la mano al post-it recalculada.
- E5: la planta del gabinete al rincón (-1,72, -2,82).
- E6: Lorena no se dibuja en Q1b (asomaba de perfil al borde).
- E7: portada nueva: fondo LIMPIO de 9,6 s con Lorena girada a cámara (JS `__dbg.lor`), cámara más abierta; a la mitad
  de abajo del fondo un fundido a navy (ffmpeg geq, desde y 760) para que la coma de "Jueves, 18:00." se vea. La receta
  está en portada.json ("cam").
- E8: "Cada sesión se descuenta sola" arriba (y 230) en Q1c y en Q1d; el globo "Ah. Tres." abajo en los dos.
- E9: el cajón entero navy como el mueble.
- E10: puntas de la melena menos dentadas (×0,4 con `frenteLibre`).
- E11: rueditas `desde: 0.5` (desde 7,6 entraba muda); ahora suenan en el giro.
- E12: hoja del cuaderno en el hueco "quedan?" / "Dejame ver"; papel de la tarjetita en la pausa tras "¿Una?"; el plástico
  del banquito apenas termina "¿y la de Jimena?".
- E13: zumbido de la pausa muda +2 dB.
- Sonido: al moverse los tiempos, la cola de "¿y la de Jimena?" (Q2) caía en el tramo del whoosh del inserto Q2i: sin ese
  whoosh, el tic a q2i + 0,3 y l5b 0,06 s antes. medir.py: mínimo +7,4 LU. Mezcla -14,1 LUFS, pico -2,5 dBFS.
No hecho: las "costuras" de la melena en la portada (con Lorena a cámara ya no se ven); el respaldo de la camilla (ver ronda 2).
