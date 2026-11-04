# caso-toyota · caso de éxito (formato "resultaaquee")

Caso de éxito: el kanban del sistema de producción de Toyota. Gancho-pregunta en el cuadro 0
("¿Por qué Toyota pone una tarjetita en cada caja?"), la respuesta enseguida (se llama kanban:
cuando la caja se vacía, la tarjeta vuelve y pide reponer justo eso), el giro ("la tarjeta no
cuenta lo que hay: avisa lo que se usó"), el puente al dueño ("¿y en tu local, quién se da cuenta
de que falta algo? El que ve el estante vacío") y el producto: AUTOMATIZACIÓN (cuando un producto
baja del mínimo, el pedido al proveedor queda armado solo). Cierre: videollamada gratis en
scalerics.com. Fuentes en `fuentes.md` (sin años, sin Ohno, sin cifras).
Toyota se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: caja de piezas,
engranajes, tornillos y tarjeta genéricos con los colores de Scalerics.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, sombra plana en el
  piso, bordes crema de 6-8 px), que se transforma: caja de piezas con su tarjeta (x3) → push-in a
  la tarjeta KANBAN → la caja se vacía, la tarjeta viaja al PROVEEDOR y vuelve una caja llena →
  grilla de 6 cajas (contar todo, tachado) → la tarjeta de la caja vacía salta al frente → estante
  TU LOCAL → push-in al hueco vacío → panel de stock que baja del mínimo → pedido al proveedor
  armado → videollamada.
- Fondo navy CLARO `#16243d` LISO (sin brillo radial: compresión de Instagram) con estrellitas
  tenues. Objetos en navy medio `#2b4573`, navy oscuro `#0b1220`, crema, blanco y verde.
- Paleta: `#16243d`, `#0b1220`, `#2b4573`, `#355489`, crema `#efeee5`, blanco, verde `#5ce611`
  (luz `#9df26a`); rojo apagado `#c7655b` solo para lo que está mal ("Vacía", "Contar todo",
  "Vacío", "Bajo el mínimo").
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px, palabra clave en recuadro verde
  (rojo para "cuenta" y "vacío"). El gancho (s01) y "Agendá..." (s09) no llevan subtítulos.
- Voz Orus acelerada a 1.07 con `atempo` (de 33.4 a 31.2 s); `palabras.json` escalado igual, con
  "¿Y en tu local" y "¿Lo vemos" corregidos a mano.
- Las escenas NO se escriben a mano: salen de `gen.mjs`, con los tiempos de las palabras (`w(i)`).
  Lo que se mueve y escala lo hace tweenando el atributo `transform` (helper `pl()`), no con
  svgOrigin: mezclar orígenes dejaba las cajas fuera de lugar. Después de tocarlo:
  `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-4.22): "¿Por qué Toyota / pone una / tarjetita / en cada caja?" (100-150 px,
  "tarjetita" en verde) desde el cuadro 0 + caja de piezas gigante con su tarjeta KANBAN. "tarjetita":
  la tarjeta salta. "cada caja": se achica y aparecen dos iguales a los costados; al final vuelve a
  ser una sola, grande.
- s02-kanban (4.22-6.41): push-in hasta que la tarjeta llena la pantalla (las piezas y el borde de
  la caja se apagan). "llama": rótulos QUÉ PIEZA (A-12) y CUÁNTAS (50) con línea guía. "kanban":
  recuadro de selección sobre el encabezado.
- s03-vuelve (6.41-10.87): la caja vuelve chica a la izquierda, entra el PROVEEDOR a la derecha.
  "vacía": las piezas se van, pill roja "Vacía". "la tarjeta vuelve": línea punteada y la tarjeta
  viaja a la puerta del proveedor. "pide reponer": sale una caja llena del proveedor, la vacía se
  va, la tarjeta vuelve a la caja nueva. "justo eso": tilde y pill "Justo eso".
- s04-giro (10.87-15.10): la caja se vuelve una de seis (la del medio de abajo, vacía). "no cuenta":
  pill roja "Contar todo" y números 1-5 sobre las cajas; "hay": tachado. "Avisa": las demás se
  apagan y la tarjeta de la vacía salta al frente, grande; pill "Lo que se usó".
- s05-local (15.10-18.04): estante TU LOCAL (latas, cajas, frascos, cajas de herramientas) que se
  arma. "quién": signo de pregunta verde. "falta algo": un lugar se vacía y queda el recuadro rojo
  punteado.
- s06-estante (18.04-19.85): push-in al hueco; "ve": entra el dueño con un "!" rojo; "vacío": pill
  roja "Vacío" adentro del hueco.
- s07-minimo (19.85-23.65): panel crema "Pintura blanca · STOCK EN EL LOCAL", 12 UNIDADES y barra
  con la marca MÍNIMO 5. "automatización": chip verde AUTOMATIZACIÓN. "producto baja": el número
  baja a 4 y la barra se pone roja; pill "Bajo el mínimo".
- s08-pedido (23.65-26.70): el panel gira y queda "PEDIDO AL PROVEEDOR · Distribuidora Norte" con
  Pintura blanca 4 L × 12 y Rodillo 23 cm × 6. "armado": tildes y botón "Listo para enviar";
  "solo": pill "Armado solo".
- s09-cta (26.70-34.39): el pedido se vuelve la videollamada (TU LOCAL / Scalerics EQUIPO);
  "Videollamada" / "gratis" (recuadro) / "scalerics.com" en verde.

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

