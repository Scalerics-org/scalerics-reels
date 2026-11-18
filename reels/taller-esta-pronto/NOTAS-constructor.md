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
- **Portada:** fondo limpio nuevo con VER=portada (sin Maxi, cámara propia) en el último corte (t 8,16: Óscar incorporado,
  cansado, celular en la oreja, el auto de Daniel arriba): ver abajo. Para regenerarlo:
  `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 8.16 renders/prev/por && cp renders/prev/por/t-008.16.png portada-src/fondo-limpio.png && SINAUDIO=1 node gen.mjs`
- No tocado: el cierre lo dice Óscar con "te mando" (decisión del coordinador). Repite el ángulo de `dos-talleres`
  (avisos del estado): aviso para el coordinador, no se cambió el tema.
