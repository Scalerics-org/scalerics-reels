# por-que-buscando · explicador "¿Por qué…?" (34,7 s, 3D real)

"¿Por qué algunas páginas te muestran que están 'buscando'?". Experimento de una página de viajes (Buell y Norton,
2011: ilusión de trabajo / transparencia operativa): unos ven los vuelos al instante, otros esperan viendo cada
aerolínea revisada; mismos vuelos, y la espera se valoraba más. Bisagra "¿Por qué?" (la arena del reloj arma un "?"
verde), "vieron el trabajo" (la lupa), callback al almacén de Rubén: él arma el pedido con cuidado pero Graciela no
ve nada ("Sin respuesta"); lo automatizamos: los avisos salen del celular del mostrador y caen en su chat
(recibimos, armando, salió, llegó). Cierre: videollamada gratis, con el celular del gancho tildado entero (callback).
Producto: Automatizaciones (avisos de estado del pedido). Sin marcas reales. Voz: Orus.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro). Zona A en fondo crema liso
#efeee5 (el celular gigante, el avión low-poly, los dos celulares con rayo y reloj de arena, las tarjetas de
embarque apiladas con "=", la balanza, el "?", la lupa y el cierre); zona B el almacén de Rubén (x = 40, con Nico
que se lleva la bolsa); zona C la casa de Graciela (x = -40, reloj de pared rojo apagado = el problema). El celular
del chat va pegado a la cámara en B y C (en B se achica a la esquina para que se vea Rubén). Cierre con fondo verde
#5ce611 y letras navy. Subtítulos navy con borde crema y recuadro verde (nunca blanco sobre crema), logo oscuro.

Cómo se arma: `node armar.mjs && node gen.mjs && node armar.mjs` (armar escribe `assets/tiempos3d.js`,
subtítulos, index y la cama sidechain `bgm/bed-corte.mp3`; gen escribe las capas HTML y los `.sfx.json`).
Tiempos por palabra: STT de Google ajustado a mano por frases (silencedetect) y repartido por sílabas
(`assets/voice/palabras-stt.json` es el crudo).

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


## Lo que cambia respecto de SPEC-base
Fondo crema (no navy), subtítulos arriba al centro de 1 a 3 palabras (86 px, navy, recuadro verde en la clave), logo
oscuro en píldora crema, todo lo dibujado es 3D (no líneas SVG). Cierre en verde con letras navy.

## Escenas (segundos globales)
1. **s01-gancho** 0,00-3,92 · Cuadro 0 = portada: gancho Lexend 900 en 4 líneas navy ("“buscando”" en recuadro verde)
   y el celular gigante con la ruedita verde girando y "Buscando…"; Aerolínea 1 tildada, la 2 en "páginas", la 3 en
   "buscando". Push-in leve en contrapicado. El gancho se va a 3,62.
2. **s02-prefiere** 3,92-5,83 · Órbita corta; la 4 se tilda en "que hasta"; en "prefiere" cae el sello 3D verde
   "PREFERIDA" sobre el celular (squash, golpe del sello).
3. **s03-viajes** 5,83-8,01 · El celular gira 360° y aparece la página de viajes ("Buscá tu vuelo", Montevideo →
   ¿A dónde?, Buscar). En "página" despega el avión low-poly de la pantalla, viene a cámara y sale por la derecha;
   grúa corta. Crédito "Experimento · Buell y Norton, 2011" (38 px mono) desde "probaron".
4. **s04-instante** 8,01-10,22 · El celular se corre a la izquierda; en "vuelos" destello y los tres vuelos aparecen
   de golpe; en "instante" el rayo 3D navy/verde y la píldora "Al instante".
5. **s05-aerolinea** 10,22-13,55 · Travelling a la derecha: el segundo celular sale de atrás del primero; "Revisando
   aerolíneas…", el marco verde recorre las filas y cada una se tilda (la 3 justo en "aerolínea"); el reloj de arena
   3D se da vuelta en "esperar" y la arena verde cae. Al terminar, los mismos vuelos. Píldora "Se ve el trabajo".
6. **s06-mismos** 13,55-16,58 · Plano general de los dos: escupen su tarjeta de embarque (08:40), se apilan en el
   centro con un "=" verde; sello "MISMO RESULTADO". En "Y la espera" los celulares salen por los costados, crece la
   balanza y caen tarjeta + rayo a un plato y tarjeta + reloj al otro; en "valoraba" baja el de la espera; en "más"
   tilde verde arriba.
7. **s07-por-que** 16,58-19,71 · La balanza se hunde, el reloj sube al centro y su arena (granos verdes) arma el "?"
   3D grande. En "Vieron" el "?" gira de canto y del otro lado está la lupa: adentro "Aerolínea 3/4" que se tildan;
   en "valoraron" cae una tilde verde gigante en el lente ("Esfuerzo a la vista"). La lupa viene a cámara (zambullida).
8. **s08-ruben** 19,71-22,44 · Corte al almacén, pegado a la bolsa de papel; se abre a Rubén (etiqueta "Rubén"
   arriba, nunca en la cara). Fideos, yerba, leche y pan entran en "arma", "cada", "pedido", "cuidado"; su mano
   derecha acomoda cada uno. Píldora "Pedido de Graciela".
9. **s09-no-ve** 22,44-24,74 · Contraplano: Graciela en su casa, preocupada, con el celular; el chat (pegado a
   cámara) sube desde abajo: "¿Y mi pedido?" con tilde gris y "Sin respuesta" (reloj rojo apagado). El reloj de pared
   corre y se clava en "nada"; píldora roja "Sin noticias".
10. **s10-avisos** 24,74-27,42 · El almacén otra vez; el chat se achica a la esquina. "Automatizado". En "recibimos"
    sale un globo 3D del celular del mostrador y vuela al chat: "Recibimos tu pedido".
11. **s11-salio** 27,42-29,54 · "Lo estamos armando" (Rubén cierra la bolsa), "¡Salió!" (Nico, el empleado, se la
    lleva; Rubén toma mate y saluda).
12. **s12-se-vea** 29,54-32,02 · Graciela sonríe, la bolsa ya está en su mesita; llega "¡Llegó!" y ella contesta
    "¡Gracias, Rubén!".
13. **s13-llamada** 32,02-34,69 · Fondo verde: "Videollamada" / "gratis" (navy con letras verdes) / "scalerics.com"
    (crema con borde navy); abajo el celular del gancho con "Tu pedido": Recibido, Armando, Salió, Llegó se tildan en
    fila y la tilde grande reemplaza a la ruedita.

## Sonido
Voz Orus a volumen 1; cama `bed.mp3` con sidechain (baja sola bajo la voz); SFX con techo -31 LUFS por efecto (ver
`armar.mjs`): tic-real/tac-real en cada fila tildada y en el reloj de pared y los pasos de Nico, pop en cada objeto,
sello en "PREFERIDA", "MISMO RESULTADO" y los golpes en la balanza, flash en "al instante", whoosh-cinematic en el
despegue y la zambullida, riser-corto + sparkle en el "?", campanita al entrar al almacén, papel en la bolsa,
burbuja en los productos y en la respuesta de Graciela, notification en cada aviso, chime en scalerics.com.
