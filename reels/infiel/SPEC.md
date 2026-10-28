# Reel "Tu cliente te está siendo infiel": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, apps de
puntos y tiendas online para comercios). Pensado para ser MUY viral: formato de **telenovela /
programa de chimentos**. El narrador cuenta, con drama exagerado y humor, que "tu cliente te está
siendo infiel" y presenta las pruebas: le escribió a vos un martes a las 23 y nadie contestó; le
escribió "al otro" y le contestaron en un minuto; el otro se acuerda de su nombre y de lo que pide;
el otro le mandó "te extrañamos, tenés un regalo" y volvió. Remate: no te dejó por más barato, te
dejó porque el otro estaba. Scalerics hace que "el otro" seas vos. Voz de 60 s.

## Estilo: TELENOVELA (que no se parezca a nada de lo anterior)
- Paleta (SOLO estos): rosa escándalo `#ff3d7f` (sellos, marcador, corazones, acentos), dorado
  `#ffc83d` (el otro, brillos, carteles, etiquetas), crema papel `#fff6ea` (polaroids, papeles,
  líneas), vino oscuro `#2a0d1d` (fondo de las fotos, textos sobre papel). El fondo ya es vino con
  focos.
- Recursos de la estética: **polaroids** (papel crema, foto vino, pie en mono "MARTES · 23:07"),
  **sellos** que caen de golpe ("PRUEBA Nº1", "INFIEL", "CONFIRMADO", "CASO CERRADO") con
  `drop-shadow` rosa, **círculos y flechas de marcador** rosa dibujados encima, **hilo rojo**
  (rosa) uniendo pruebas, carpeta "EXPEDIENTE", **zooms dramáticos** de cámara (scale 1→1.15
  rápido en cada revelación), **pantalla dividida** VOS / EL OTRO, corazones que se rompen, tiembles.
- Personajes: **tu cliente** = la figurita de palitos crema con un corazón rosa arriba (s01).
  **Vos** = tu local (de líneas crema, apagado). **El otro** = local de líneas DORADO con cartel
  "EL OTRO" (s01), siempre un poco más lindo, con brillitos.
- Efectos BIENVENIDOS: drop-shadow rosa o dorado en lo importante, tiembles, zooms de golpe, entrar
  "cayendo" con rotación, flashes (los grandes ya están en ambiente), texto que se tipea.
- Ritmo: cada revelación con golpe. Nunca un segundo quieto.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo vino con brillo rosa, la voz, el logo y los efectos.
- `compositions/ambiente.html`: dos focos dorados que barren, brillitos dorados, viñeta y **flashes
  de paparazzi** en 1.6, 3.8, 5.3, 17.65, 25.55, 44.55 y 57.55 s globales. No los dupliques; si
  uno cae en tu escena, sincronizá ahí un golpe tuyo y el sonido `flash`.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda (y 236 a ~500), acentos
  rosa. **Las escenas NO escriben la frase narrada.**
- `compositions/s01-infiel.html`: **la escena modelo**. Copiá su estructura, la polaroid, el sello,
  el marcador, la figurita del cliente y el local del otro. Etiqueta mono dorada en **top 1305**
  (más abajo que en otros reels, para no pisar las polaroids).

## Trampas ya pagadas
- `fromTo` hace *immediateRender*: el "from" se aplica al construir la timeline. Para que algo esté
  invisible hasta su momento: `gsap.set(..., {opacity: 0})` y después `fromTo(..., {immediateRender:false})` o `to`.
- En un `<g>` anidado NO uses `svgOrigin` (es global): `transformOrigin: "50% 50%"`. Nunca
  `gsap.set(g, {scale})` sin transformOrigin en SVG.
- Los movimientos de glitch/tiemble con `x` pisan un `translateX` de CSS: no centres con CSS
  transform algo que después vas a mover.

## Sonidos extra
`drama` (el "dun dun dunnn" de telenovela, 1.5 s: usalo en LAS revelaciones fuertes, no más de 1
por escena, y "max"), `flash` (disparo de cámara), `blip`, más la lista de abajo (`typing`,
`notification`, `pop`, `glitch-1`, `impact-bass-1/2`, `whoosh-short`, `riser`, `sparkle`,
`chime`).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (colores, brillos, efectos, etiqueta dorada en top 1305, salidas con zoom o corte).

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Ilustración de líneas: `stroke #efeee5`, `stroke-width 5`, `round` caps/joins, sin relleno. El
  acento es verde `#5ce611` (trazo o relleno chico: ventanas, badges, números, flechas). Un solo
  acento, nada de otros colores. Lo apagado: crema con opacity 0.35–0.45.
- Todo vive en un `<svg viewBox="0 0 1080 1920">` a pantalla completa (coordenadas = píxeles).
- Zona del dibujo: y 600–1200, centrado en x 540, ancho 420–820 px. Nada arriba de y=580 (ahí
  están los subtítulos) ni abajo de y=1330.
- Etiqueta mono debajo del dibujo: `.etiqueta` igual que s01 (IBM Plex Mono 500, 28px,
  letter-spacing 0.34em, mayúsculas, verde, top 1268). Cambia de texto con los beats (fade + y).
  Textos de 1 a 4 palabras.
- Textos dentro del dibujo (carteles, UI de celular): Lexend 600 o IBM Plex Mono 500; tamaño
  mínimo 24px para lo que hay que leer; lo decorativo más chico lleva `data-layout-ignore`.
- Movimiento: los trazos se DIBUJAN (stroke-dashoffset, 0.5–0.8 s, power2.inOut) con el helper
  `dibujar()` de s01 (que pone opacity 0 hasta que arranca, para que no queden puntitos de los
  caps redondos). Lo que aparece entero hace pop (scale 0.85→1 + opacity, back.out(1.6), 0.35 s).
  Las cosas cambian EN la palabra que las nombra (tenés los tiempos por palabra abajo).
  Algo se mueve siempre: ningún tramo de más de ~1 s quieto.
- Badge de "no": círculo verde (r 18, trazo 4) con una X adentro, arriba a la derecha del ícono,
  como la referencia. Tachar algo: línea verde que se dibuja encima.
- Celulares: rectángulo redondeado crema (rx 52, trazo 5), ~380x760, barrita arriba; adentro
  UI simple en Lexend (crema y verde), sin capturas.
- Entrada: los primeros 0.3 s el dibujo arranca (dibujándose o con pop); salida: los últimos
  0.3 s `opacity 0 + blur(6px)` sobre el contenedor de la escena, como s01.
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de
  `#efeee5` / `#5ce611` (y sus opacidades). Copy en español rioplatense; si Scalerics habla, en
  plural ("te contamos"), nunca primera persona singular.

## Reglas técnicas (HyperFrames)
- Archivo `compositions/<id>.html`, un `<template>` con `<style>`, un
  `<div id="root" data-composition-id="<id>" data-width="1080" data-height="1920" data-duration="<dur>">`
  y un `<script>` que arma UN `gsap.timeline({ paused: true })` y lo registra en
  `window.__timelines["<id>"]`. Los dos `@font-face` como en s01 (rutas `assets/fonts/...`).
- GSAP se carga SIEMPRE local: `<script src="assets/vendor/gsap.min.js"></script>`. Nunca del CDN
  (cdn.jsdelivr.net está bloqueado en la nube y el render falla).
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. No animar letterSpacing, width,
  height, left, top: solo transforms, opacity, filter, strokeDashoffset.
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx --yes hyperframes@0.8.206 snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx --yes hyperframes@0.8.206 check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (están en `tiempos.md`).


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 63.41 (la voz termina en
60.21). Algunos tiempos de palabras son interpolados (±0.3 s).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA con drama de telenovela. Si se te
ocurre algo más gracioso o impactante en este lenguaje, usalo.

**s02-pruebas** (2.28 s): "Y tengo las pruebas." Una carpeta "EXPEDIENTE · CASO 0412" (papel crema,
pestaña) cae sobre la mesa y se abre; salen disparadas en abanico 3 polaroids chicas (pruebas) con
un clip; en "pruebas" (0.81, flash a 3.8 global) cae el sello rosa "PRUEBAS". Etiqueta "EXPEDIENTE".

**s03-prueba1** (3.46 s): "Prueba número uno: martes, once de la noche." Tarjeta de título de
telenovela: "PRUEBA Nº1" gigante en Lexend 800 rosa con drop-shadow, que entra con zoom de golpe
(flash a 5.3 global, sonido drama). En "martes, once de la noche" (1.31–2.53) un reloj o
calendario "MARTES 23:00" en dorado con la luna; la tarjeta se va con barrido. Etiqueta "PRUEBA 1".

**s04-chat** (4.86 s): "Te escribe a vos: '¿tenés talle cuarenta?' Nadie contesta." Celular con el
chat de "TU LOCAL" (encabezado crema apagado): la burbuja del cliente "¿Tenés talle 40?" entra en
"tenés talle" (1.49); después… nada: tres puntitos que aparecen y desaparecen, el reloj del celular
avanza 23:00 → 23:47 → 00:30 rápido, una telaraña o un grillo (cri cri) para el silencio, y en
"Nadie contesta" (3.29) cae el sello rosa "SIN RESPUESTA" y el celular se apaga a 0.4. Etiqueta
"NADIE CONTESTA".

**s05-otro** (4.03 s): "Le escribe al otro. El otro le contesta en un minuto." PANTALLA DIVIDIDA:
a la izquierda tu celular apagado; a la derecha entra con brillo dorado el celular de "EL OTRO"
(encabezado dorado). En "al otro" (0.61) el cliente le escribe "¿Tenés talle 40?" y en "contesta"
(2.11) llega la respuesta dorada "¡Sí! ¿Te lo guardo?" con un "1 MIN" dorado y corazoncitos rosa
que suben. Zoom dramático al celular del otro. Etiqueta "EL OTRO CONTESTA".

**s06-prueba2** (7.90 s): "Prueba número dos: el otro se acuerda de su nombre. De lo que siempre pide.
De que hace un mes que no va." Tarjeta "PRUEBA Nº2" (con sello y flash a 17.65 global, drama).
Después una "libreta de amante" del otro (o ficha dorada) que se completa con hilo rosa uniendo 3
polaroids: "NOMBRE: LUCÍA" (nombre 3.08), "PIDE: EL DE SIEMPRE" (pide 4.78), "ÚLTIMA VISITA: HACE
30 DÍAS" (no va 6.68), cada una con su círculo de marcador. Etiqueta "SE ACUERDA DE TODO".

**s07-prueba3** (8.38 s): "Prueba número tres: el otro le manda un mensaje: 'te extrañamos, tenés un
regalo esperándote'. Y vuelve." Tarjeta "PRUEBA Nº3" (flash a 25.55 global, drama). Después la
notificación dorada del otro en el celular del cliente, tipeada: "Te extrañamos. Tenés un regalo
esperándote" con un moño de regalo (extrañamos 3.78, regalo 5.38); en "Y vuelve" (7.30) la figurita
del cliente camina hacia el local del otro y explotan corazones rosas; el sello "CONFIRMADO".
Etiqueta "Y VUELVE".

**s08-anios** (6.11 s): "Vos le diste años de buena atención. El otro le da atención a cualquier
hora." Balanza o duelo VOS / EL OTRO: a la izquierda un calendario que muestra "2019 · 2020 · 2021…"
y un cartel "HORARIO: 9 A 19" (años de buena atención 1.07–1.90); a la derecha un reloj dorado que
gira a toda velocidad "24 H" (a cualquier hora 4.90–5.30), y la balanza se inclina hacia el otro.
Etiqueta "ÉL ESTÁ SIEMPRE".

**s09-dejo** (5.91 s): "Tu cliente no te dejó por más barato. Te dejó porque el otro estaba." Una
etiqueta de precio "$" que recibe una X rosa (más barato 1.59–1.89). En "Te dejó porque el otro
estaba" el corazón rosa grande se parte en dos con grieta (dejó 2.99) y en "estaba" (4.53, flash a
44.55 global, drama) aparece el local del otro con la luz prendida de noche y la puerta abierta,
brillando, mientras el tuyo queda con la persiana baja. Etiquetas "NO FUE EL PRECIO" → "ÉL ESTABA".

**s10-vos** (3.78 s): "En Scalerics hacemos que el otro seas vos:" El giro: "Scalerics" (Lexend
700 ~72px crema con brillo dorado) en "Scalerics" (0.08); la polaroid del local "EL OTRO" gira
como una carta (scaleX 1 → 0 → 1) y del otro lado aparece "TU LOCAL" ahora dorado y brillando
(el otro seas vos 1.68–2.88). Sello "EL OTRO SOS VOS". Etiqueta "EL OTRO SOS VOS".

**s11-tres** (7.17 s): "un bot que contesta al instante, puntos que le recuerdan volver, y una
tienda abierta cuando él te busca." Tres polaroids que caen de a una en un tablero con hilo rosa:
BOT (bot 0.10, contesta 0.60: burbuja dorada instantánea), PUNTOS (puntos 2.27, volver 3.50: tarjeta
con "+10" y flecha circular), TIENDA (tienda 4.60, te busca 6.00: tienda abierta con "ABIERTO 24 H"
dorado). Cada una con su rótulo mono dorado y un corazón rosa que late.

**s12-cta** (6.54 s): "Comentá INFIEL si alguna vez te pasó." (voz termina en ~3.3; flash a 57.55
global en "INFIEL"). Cierre: "Scalerics" grande (Lexend 700 ~110px, crema) en y≈820; debajo "Bots ·
Puntos · Tiendas para comercios" (Lexend 500 34px, crema 0.7); una píldora ROSA `#ff3d7f` con texto
`#2a0d1d`: Comentá "INFIEL", que entra como sello (cae con rotación) en "INFIEL" (0.67) y late
(pulsos finitos). Un corazoncito y una polaroid chica decorando. Quieto y legible al final.
