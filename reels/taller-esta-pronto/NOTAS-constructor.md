# taller-esta-pronto · notas del constructor (18-11)

Proyecto con la forma de dist-quien-debe / taller-presupuestos: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita para
este reel con el taller de taller-presupuestos y la infraestructura de dist-quien-debe: tarjetas pegadas a la cámara,
regla de burbujas `hablar()`, avatares por render target, rotisería con spiedo, pantalla partida con scissor,
`camPantalla`). `assets/personajes.js` = el de dist-quien-debe + **Daniel** nuevo en ELENCO (castaño oscuro "costados",
lentes navy2, camisa crema, saco navy3 abierto; la mochila la cuelga tres.js). Óscar va con `franja: null` (sentado en la
camilla la franja verde se leía como un aro).

## Comandos (desde reels/taller-esta-pronto)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv); LINEAS=otro.tsv para regenerar algunas
bash partes/medir-tomas.sh [toma]          # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                    # assets/voice/ desde las tomas elegidas (+ palabras-o7.json)
node gen.mjs                               # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                           # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                 # snapshots con el candado (renders/snap/<nombre>/hoja.png)
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/taller-esta-pronto.mp4
bash paso10.sh                             # paso 10: loudnorm en dos pasadas, lineal → renders/taller-esta-pronto-final.mp4
LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 1.0 renders/prev/por && cp renders/prev/por/t-001.00.png portada-src/fondo-limpio.png && SINAUDIO=1 node gen.mjs
```

## Voces (partes/procesar.sh)
g1 01-graciela-a (hueco tras "Óscar," a 0,08 s, atempo 1,1, teléfono 300-3400) · o1 02-oscar-d (las a-c el STT las oía
"la carne"/"a la par de": se generaron d-f) · w1 03-walter-c (teléfono; con el filtro el STT oye solo "pronto", sin
filtro "está pronto") · o2 04-oscar-c · m1 05-maxi-a (hueco 0,09, atempo 1,12; se reusa idéntico en Q3) · o3 06-oscar-a ·
d1 07-daniel-c (hueco 0,1, teléfono leve 200-4200; con atempo el STT oía "buscar esta aprendo") · o4 08-oscar-c · narrador
09-narrador-a (atempo 1,1 → 2,39 s, entra sin fallback) · g2 10-graciela-b (atempo 1,12) · o5 11-oscar-b (pasabajos 6 kHz)
· d2 12-daniel-f (STT "Dale cámbiala") · o6 13-oscar-b (hueco 0,12, atempo 1,05, pasabajos) · m2 14-maxi-a · o7 15-oscar-a
(hueco 0,12, atempo 1,04). No se escucharon: la elección es por el STT y la duración (dudoso: el tono "cansado" de o2, que
o4 suene plano y no a reto, que "PRONTO" esté marcado en o7).

## Mundo
Taller (de taller-presupuestos): pared del fondo z = -5 con portón; **elevador en LZ = -3,05** (se corrió atrás para que
quepa el de Graciela) con el sedán navy claro de Daniel (STR 7720) sin la rueda delantera izquierda (apoyada contra la
columna derecha), bomba de agua escalada ×1,6 con mancha húmeda y la gota que cae a la bandeja; el de Graciela (crema, SAB
3315) en cuatro caballetes (LIFT 0,42) en z = 1,0; la camilla (z adentro 2,32 / afuera 3,45, x 0,12) con seis rueditas
que giran; el banquito con el celular en (-0,62; 3,5); la pizarra de turnos a la derecha del portón (se tacha en P4 y se
tilda en Q4), el tablero de llaves, la radio, un auto verde de fondo con el capó abierto; pared trasera en z = 9.
Óscar acostado = `sentado: 1, piernasRectas: 0, inclina: -π/2` (torso hacia atrás, rodillas a 90°, pies en el piso);
incorporarse = `inclina` hacia 0 (función `incorporado(t)`), rodar = `rodadas(t)`. Rotisería x = 40 (de dist-quien-debe),
ómnibus x = 60 (pasamanos, asientos, caño con botón PARADA, la ciudad que pasa). Fotos de los chats por render target de
la misma escena (la bomba con la luz de la lámpara, el auto de Graciela con Óscar abajo, el sedán arreglado).

Planos: P1 cuadro 0 · P2 abajo del elevador (Maxi a la izquierda con la lámpara, la bomba y la bandeja) · P3 inserto
celular (Llamando / No contesta ×2 / chat con foto, Entregado ✓✓ 10:16) · P4 Walter · P4c0-3 cortes (Sergio 5, Fabián 9,
Silvia 14, Graciela 22) · Ppiz pizarra con tachones y rótulos · P5 sale disparado y se sienta ("¡Daniel!") · P5s pantalla
partida · P6a el auto clavado arriba · P6 primer plano "Está pronto para empezar." · P7 vuelve a sonar, la ruedita sale
rodando a la derecha (la cámara la sigue) · cartel · Q1 = P1 con "Aviso enviado ✓" · Q1i celular de Graciela · Q1g
Graciela · Q2 la tablet "Autos en el taller" · Q3 = P2 · Q3o "Mandale la foto." (desde los pies de Óscar) · Q3f la foto
· Q3d inserto del extra · Q3e Daniel "Dale, cambiala." · Q3a Aprobar → Aprobado ✓ · Q4 12:30, baja el auto, pizarra en
verde · Q4b ómnibus, "Pronto para retirar ✓", timbre · Q5 17:30 mate · C Óscar a cámara con el mate.

## Duración y mezcla
**45,6 s.** Parte 1 0-19,19 · cartel 19,19-21,7 · parte 2 21,7-45,6 = 23,9 s (52 %); C 42,19-45,6, tarjeta PRONTO desde
42,64 (sobre "PRONTO"), línea chica desde 44,25. Más largo que el plan (38,9): las tomas reales suman ~23 s de voz.
Mezcla como dist-quien-debe (TECHO -31, bus → -14 LUFS → limitador): -14,2 LUFS, pico -2,6 dBFS. medir.py: el único tramo
< 6 LU es 32,5 s y es la cola de "Mandale la foto." (voz -25 contra pico de -6,7 de la frase) contra la notificación y el
ómnibus que entran: no pisa habla. `check --json`: 0 errores (warnings de lint/runtime/craft como en los otros).

## Pasada propia (prev.mjs + snapshots renders/snap/p1…p6)
- Graciela y el elevador se pisaban (el elevador más atrás, el auto de Graciela más adelante, cámaras corridas).
- P2: la cámara quedaba dentro del auto de Graciela → de costado y abajo; Maxi tapaba la bomba y la lámpara le cruzaba
  la cara → Maxi a la izquierda, la lámpara en la mano del lado de la bomba, la bomba debajo del bloque (estaba adentro),
  más clara y con mancha húmeda; la bandeja sigue a la gota.
- P4/P6/C/split: las cámaras quedaban encima de Óscar (cara cortada) → más atrás; la tarjeta PRONTO ya no tapa la boca.
- P3: el texto del chat se salía de la burbuja → tres renglones de 42 px; la foto de la bomba salía negra → con luz.
- Ppiz: el auto tapaba la pizarra → plano de la pizarra legible; "Elevador ocupado" con guía a la columna.
- P5: "¡Daniel!" tapaba la cara → al costado; P6a era una pantalla navy (adentro del auto) → el auto clavado visto desde
  Óscar; la ruedita no se veía (7 cm y fuera de cuadro) → ×1,4, rueda hacia la derecha y la cámara la acompaña.
- Q3d/Q3a: la mano 3D de Daniel tapaba el celular → oculto en el inserto; Q2 arrancaba con la tablet vacía → tarjetas
  desde el primer cuadro; Q5 Maxi fuera de cuadro → al lado del banquito; "A la tarde." pisaba el chip del mate.

## Portada
`portada-src/fondo-limpio.png` (LIMPIO, t 1,0): Óscar incorporado con el celular en la oreja, el auto de Graciela y el de
Daniel arriba en el elevador. `portada.json` sin cambios (t 1,0). `herramientas/portada.mjs` pide el mp4: correrlo
después del render.

## Flojo / para los revisores
- No se renderizó el mp4 ni se miró cuadro por cuadro a 30 fps en los cortes: la pasada fue con snapshots cada 1 s y
  puntuales.
- 45,6 s (plan 38,9). Si hay que recortar: CORTE de P4 (0,44 s por corte), P3 (1,6 s) o la pausa de P6a.
- Q4: el auto de Daniel bajando se ve parcial (cortado a la izquierda) y la pizarra chica; el elevador no "sube el
  siguiente" (no se armó).
- P2/Q3: la bomba se lee poco (pieza gris bajo el bloque); Q3f la lámpara/polea queda grande arriba.
- La camilla no se ladea de forma visible cuando se sale la ruedita; la ruedita rueda hacia la derecha, no "hasta el
  portón" (fuera de cuadro).
- Q2: la tablet no llena el ancho (bordes del atril y madera abajo). P6: Óscar con media sonrisa; el remate debería ser
  más seco (revisar SECO).
- Pasajera del ómnibus asoma cortada a la izquierda en la pantalla partida y en Q3e.
- Las voces no se escucharon (ver Voces).

## Ronda 1, parte A (18-11, sobre revision-guion-r1.md y las decisiones del coordinador)
**40,5 s.** Parte 1 0-16,18 · cartel 16,18-18,55 · parte 2 18,55-40,53 = 22,0 s (54 %); C 37,16-40,53 (o7 en C + 0,3 s: el sorbo ya no pisa el arranque de la voz), tarjeta PRONTO
desde ~37,8. medir.py: voz ≥ +13,2 LU sobre el resto en todos los tramos con voz; -14 LUFS.
- **Alto 1 (Daniel):** en P3 Óscar ya no le manda foto ni precio: lo llama dos veces (No contesta) y le deja un audio de
  0:47, "Entregado ✓✓ 10:16" / "Sin escuchar", con el rótulo "Un audio sin escuchar. / Sin foto ni precio". En la parte 2
  le llega la foto, el precio y Aprobar; rótulo "Con foto y precio, / aprueba con un botón".
- **Duración:** sin la llamada de Walter con voz (Walter pasa a ser el primer corte, sin voz); cuatro cortes de 0,42 s y
  el "A la tarde." cansado (o2) va en el último (Graciela, 22); P3 1,42 s; pizarra 0,92 s; pausas de P5/P6/P7 un poco más
  cortas (el beat antes del remate queda: mirada 0,42 s + 0,38 s); m1 atempo 1,18, g2 1,2, narrador 1,15 (cartel "más
  tarde…" en 1,18 s), o7 1,09; Q1i/Q1g, Q2 (1,72 s), Q3e, Q4 (1,5 s), Q5 y C más ajustados.
- **Pizarra:** 9:00 Pablo, 10:30 Andrés, 14:00 Nelly, 16:00 Ramón (ninguno de los que llaman: Walter, Sergio, Silvia,
  Graciela; Fabián salió del reel).
- **Tiempo verbal:** Q4 "Mañana entran 4 services: $ 26.000"; elevador "Elevador ocupado: martes y miércoles".
- **d2:** las 7 tomas de "Dale, cambiala." (con el tono que pide cam-BIÁ-la) el STT las oye "cámbiala"/"cambiarla"/
  "cámbiale": no se pudo escuchar ni confirmar el voseo, así que la línea pasó a **"Dale, hacelo."** (voseo sin ambigüedad;
  toma 12-daniel-l, STT "Dale hacelo"); burbuja y guion igual. partes/12-daniel.txt cambiado (el viejo en partes/tmp).
- **Chips** todos con punto: "Martes, 12:10.", "Martes, 15:40.", "Miércoles, 9:00.", "Miércoles, 14:30.".
- **Contador:** "Óscar salió / a atender"; en el panel "Óscar salió a atender: 0".
- **Q1:** rótulo "Lo marcás con un toque / y le avisa solo" (el taller marca el estado; no promete que el sistema adivina).
- **Flojos:** remate más seco (SECO: boca -0,55, ojos 0,62); la camilla se ladea visible al perder la ruedita (0,11 rad,
  baja 2,5 cm); tablet de Q2 más grande (69 % del alto); la pasajera fuera del borde; la bomba más clara; Q4 más abierto
  (se ve el auto bajando y la pizarra). El celular en la oreja más pegado a la cabeza.
- **Portada:** fondo limpio nuevo con VER=portada (sin Maxi, cámara propia) en el último corte (t 8,06: Óscar incorporado,
  cansado, celular en la oreja, el auto de Daniel arriba): ver abajo. Para regenerarlo:
  `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 8.06 renders/prev/por && cp renders/prev/por/t-008.06.png portada-src/fondo-limpio.png && SINAUDIO=1 node gen.mjs`
- No tocado: el cierre lo dice Óscar con "te mando" (decisión del coordinador). Repite el ángulo de `dos-talleres`
  (avisos del estado): aviso para el coordinador, no se cambió el tema.

## Ronda 1, parte B (18-11, listas de arte y sonido sobre el render de 45,6 s)
**41,2 s.** Parte 1 0-16,02 · cartel 16,02-18,39 · parte 2 18,39-41,2 = 22,8 s (55 %); C 37,97-41,2. medir.py: voz ≥ +13,2 LU.
(Queda 1,2 s por encima de los ~40: el chip "Salió por el mate: 1" a 1,45 s (sonido 4) y el inserto de "Pronto para
retirar" (arte 12) sumaron ~1,5 s; se recortó lo que se pudo de P3, Q2, Q4, Q5 y la cola.)
- Arte 1: el elevador sube a 2,05 m, la bomba más chica (×1,35) y más arriba con la correa chica; Maxi corrido fuera de
  debajo del auto (delante, a la izquierda) y la cámara corrida: la pieza ya no se proyecta sobre su cabeza.
- Arte 2: en Q3f la tablet va en la mano derecha al costado de la cara, inclinada hacia la bomba (no la atraviesa).
- Arte 3: P6a desde arriba del techo del auto de Graciela, fov 30: el auto de Daniel clavado llena el plano.
- Arte 4: Q4 es un plano general alto del elevador (el auto bajando, Maxi fuera) con "Extra aprobado en 2 minutos" y la
  guía al auto; a los 0,88 s corta a Q4p, la pizarra con los tildes y "Mañana entran 4 services" con guía a la pizarra.
- Arte 5: parpadeos de 0,08 s y nunca durante una frase (Daniel sin parpadeos, Maxi sin, Óscar en el segundo corte y en
  Q5); Daniel con los ojos abiertos (sin "feliz"/mirada abajo que se leían como guiño).
- Arte 6: incorporarse con curva coseno en 0,35-0,4 s (cuadro 0, P5 al sentarse, P7 al acostarse, Q5 al salir).
- Arte 7: el cuello de Óscar más corto (cuelloAlto 0,03). Arte 8: sin el parpadeo antes del remate.
- Arte 9: Ppiz con el auto arriba en el elevador a la izquierda, la columna y la pizarra a la derecha, guías a cada uno.
- Arte 11: los pasos del celular de Graciela con ajuste de ancho (no se cortan); en Q1g la mano derecha de Graciela en el
  celular del soporte. Arte 12: Q4bi, inserto del celular de Daniel con "Pronto para retirar ✓" (rótulo arriba) y después
  Q4b con el timbre; la mano izquierda de Daniel en la argolla. Arte 13: sin la burbuja "¡Daniel!" en la pantalla partida.
- Bajas: los insertos de celular ya tienen el mensaje en el primer cuadro; "Mandale la foto." más arriba (no asoma la
  patente); TALLERES y el contador hasta el corte exacto; la llamada de Walter es el primer corte, con chip; PARADA más
  adentro; Q5 con Q5b más abierto; la burbuja del cartel lejos de "tarde…"; el panel dice "Sedán SAB 3315" (los tres son
  sedanes) y textos de 44-56 px; el panel arranca con las cuatro tarjetas (sin pantalla blanca).
- Sonido 2: "Mandale la foto." toma 11-oscar-o con tono man-DÁ-le (STT "mandale la foto"), pasabajos más suave.
- Sonido 3: "Comentá PRONTO…" toma 15-oscar-o con tono co-men-TÁ marcado. El STT escribe "Comenta" sin tilde en las 4
  tomas nuevas y en TODAS las tomas de "Comentá" de los otros reels (partes/rec/medidas.tsv de taller-presupuestos,
  estetica-turnos, veterinaria-vacunas, parrilla, corralón, importadora): es el STT, no prueba tuteo. No se escuchó.
- Sonido 4: "Salió por el mate: 1" entra cuando Óscar sale rodando y queda 1,45 s antes del cierre. Sonido 6: Q5 tiene
  push-in y un segundo plano (Q5b) para "A la tarde." y el mate. Bajas: "Aviso enviado" con click a -36 y ding a -38;
  la burbuja de "¿está pronto el mate?" se va 0,08 s antes de la de Maxi.

## Ronda 2 (18-11, sobre /home/user/qa/taller-r2.mp4: guion, arte; sonido pasó)
**41,6 s.** Parte 1 0-16,65 · cartel 16,65-19,02 · parte 2 19,02-41,57 = 22,6 s (54 %); C 38,57-41,57 (3,0 s).
- Rótulos más largos: P3 "Un audio sin escuchar. / Sin foto ni precio" desde que aparece el audio, 1,3 s (llamadas más
  rápidas, P3 1,9 s); pizarra 1,55 s con "Elevador ocupado" 1,45 s y "4 services que no entran" 1,25 s; panel con los
  ceros 1,05 s; Q4 en dos planos de ~1,1 s ("Extra aprobado en 2 minutos" al auto que baja, "Mañana entran 4 services"
  a la pizarra con los tildes). Para no pasar de 41,5: sale el corte de Sergio (cortes Walter 5, Silvia 14, Graciela 22),
  sale el plano de Daniel tocando el timbre (Q4b; el inserto "Pronto para retirar" queda), huecos de P7, Q1, Q3, Q5 y C.
- Bomba de agua nueva y de costado a la cámara: brida, cuerpo de aluminio, polea navy con cuatro tornillos crema y cubo,
  dos mangueras; gotas celestes de refrigerante cayendo a la bandeja (charco celeste). Cámara de P2/Q3 nueva: Maxi entero
  a la izquierda con la burbuja más angosta arriba, la bomba arriba a la derecha.
- Q3f: la tablet en la mano izquierda de Maxi, con la pantalla de la cámara (la foto de la bomba, el recuadro y el botón)
  hacia la cámara; Maxi con mangas largas (sin el antebrazo palito).
- Q4b (Daniel con el dedo y el timbre) sacado. Lentes de Daniel finos sin patillas (la barra navy era la patilla).
- Pizarra 2,1 × 1,4 m, el tablero de llaves corrido; Ppiz/Q4p de frente (la pizarra ~70 % del ancho).
- P3 sin las huellas grises; "No contesta" con aire. Patente del auto de Graciela oculta en P6, C y la portada.
- Q1: chip y contador desde que abre el iris; push-in al banquito; "Aviso enviado ✓" abajo con guía al celular.
- Q5: Maxi adelante a la izquierda (no lo tapa Óscar al sentarse), burbuja "A la tarde." al costado de la cabeza;
  Q5b más abierto. Mate más bajo en el cierre. Graciela en Q1g sin el brazo estirado, mirando el celular. Camilla más
  ladeada en P7; la burbuja de Graciela en P7 apunta al banquito. TALLERES a 172 px.
- Guion bajas: panel parejo (Walter "Sedán SCD 2210"); "4 services que no entran"; guion.txt y partes/lineas.tsv
  (12-daniel "hacelo") al día; portada chica "Miércoles, 14:30." (el fondo es el corte de las 14:30, t 8,2); créditos de
  zumbido, chisporroteo, Kenney y pizzicato en fuentes.md.
- medir.py marca -0,4 LU a 34,0 s: es el primer 0,1 s de "Maxi, ¿está pronto el mate?" (voz -27 LUFS) contra la cama
  antes del duck; desde 34,5 s la voz está ~20 LU arriba. El resto de los tramos ≥ +13 LU.

## Ronda 3 (41,8 s · P1 16,13 · P2 18,50 · cierre 38,78 · parte 2 23,3 s, 56 %)
Revisado con prev.mjs a tamaño completo (FULL=1) de cada plano tocado y con snapshots de HyperFrames de los 3 cuadros
alrededor de cada uno de los 28 cortes (cuadro anterior, primero y segundo, a 30 fps).
- Pizarra: CAM_PIZ centrada en la pizarra (x 2,7, mira a su centro): entra entera (~117-980 px) en Ppiz y Q4p; texto
  CAV 96 con ancho máximo y los tildes corridos para que no pisen "ANDRÉS"/"RAMÓN". El auto verde del fondo se corrió
  (3,75 / 2,7) para que no tape. "Elevador ocupado" sin guía, centrado a y 480 (abajo del contador); las guías de
  "4 services" y "Mañana entran" van al pie de la pizarra, sin cruzar el texto.
- Q1: plano cerrado del banquito con push-in (pantalla del celular legible); "Aviso enviado ✓" (1,0 s, desde el corte) arriba con la guía al
  borde superior del celular. Q1i: "Lo marcás con un toque…" entra 0,02 s después del corte (1,08 s en pantalla).
- Q5b: sin la burbuja de Óscar (solo en Q5); "A la tarde." se va 0,3 s después de la voz.
- Graciela (Q1g): una sola boca (sonrisa sin la boca de CARA.feliz); el celular en las dos manos, a la altura del
  pecho, mirándolo; cámara más baja y cerrada.
- P2/Q3/Q3f: cámara nueva (más adelante y más arriba en la mira): Maxi entero, la bomba más abajo, libre del contador;
  el auto de Graciela ya no entra por la izquierda (eran su luz trasera roja y su cola blanca: el "bulto" y la astilla).
  Lámpara nueva: mango navy, aro verde y tubo emisivo, sin alambres.
- Q3f: tablet 1,6×, de espalda a cámara apuntando a la bomba (la pantalla mira a Maxi), agarrada del borde de abajo.
- Botonera del elevador a la columna (-2,05 / -2,85); Maxi fuera de P1, P4, P7 y Q1 (generales): ni bloque crema en la
  cara ni capó cortándolo; la cola de la burbuja de Graciela ya no termina en él.
- Split: la burbuja de Daniel con hablar() proyectada con la cámara de abajo: la cola a la boca, no a las cejas.
- P3: sin la mano; el chat lleno (dos "Llamada sin respuesta", el audio, Entregado, "Sin escuchar", barra de escribir).
- Q4: plano cenital alto (sin calle de fondo); rótulo "Extra aprobado / desde el ómnibus" abajo a la izquierda con la
  guía al guardabarros delantero izquierdo (no cruza la patente). fuentes.md al día.
- Q3o: Óscar se asoma en la camilla (rueda 0,9 m afuera y se incorpora un poco) y la cámara lo toma de frente.
- Bajas: "Con foto y precio" solo en Q3d (0,9 s, entra a +0,05); "Pronto para retirar ✓" desde el corte (1,0 s);
  PARADA a 0,43; panel de Q2 al 64 %; termo más afuera del brazo; Maxi en Q5 más a la derecha (el cable de la lámpara
  colgante ya no le toca el pelo); patente oculta en Q5b; la burbuja de Graciela en P7 apunta al celular.
- fuentes.md: contador 1 → 5 → 14 → 22 → 23 → 24 (sin Sergio); créditos completos copiados de elevador, gota, llaves,
  calle, vibra, sorbo, stinger, cero y el banco de HyperFrames; "Aprobado desde el ómnibus".
- Portada: fondo limpio nuevo (VER=portada, t 7,95, último corte), portada.json t 7,95, portada.png regenerada.
- Mezcla: medir.py mínimo voz-resto 6,1 LU; -14,2 LUFS, pico -3,0 dBFS. check: 0 errores.
