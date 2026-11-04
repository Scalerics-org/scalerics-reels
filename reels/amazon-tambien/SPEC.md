# amazon-tambien · caso de éxito, explicador estilo @resultaaquee

Por qué Amazon te muestra "los que compraron esto también compraron": no compara clientes, compara
productos (filtrado colaborativo ítem a ítem, artículo de sus ingenieros en IEEE Internet Computing
2003 y Amazon Science) y no te muestra lo más vendido sino lo que va con lo tuyo. Lección para la
pyme: ofrecer el complemento justo al que ya está comprando. Vende: tienda online con "llevá
también". Cierre: videollamada gratis en scalerics.com. Fuentes en `fuentes.md`.

## Lo que cambia respecto de SPEC-base (manda esto)
- Fondo CREMA `#efeee5` liso (sin degradés ni estrellitas: sobrevive mejor a la compresión de
  Instagram). Es el fondo que distingue a este reel en la tanda.
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena, navy `#16243d`/`#0b1220`/`#1f3254`
  y verde `#5ce611` (lado oscuro `#3fa60a`), crema oscuro `#dcdacb` para el canto de tarjetas y
  celular, sombra plana `rgba(11,18,32,.16)`. Rojo apagado `#c7655b` solo para lo que NO hace
  (comparar clientes, lo más vendido). Gris `#b4b2a3` para lo apagado.
- Amazon se nombra, no se dibuja: ni logo, ni sonrisa, ni tipografía; carrito, cajas y productos
  genéricos (carpa, linterna, bolsa de dormir; café, filtros, taza, alfajores).
- Subtítulos arriba al centro, Lexend 700 86 px NAVY, palabra clave en recuadro verde de selección
  (rojo para "más"). El gancho (s01) y el CTA (s10) no llevan subtítulos: tienen el texto grande.
  `armar.mjs` propio (copiado de por-que-la-tarjeta, recoloreado) con el logo oscuro.
- Pills: blancas con borde navy 6 px; "lleno" verde con texto navy; "navy"; "rl" rojo.
- Tamaños: trazos 7-12 px, textos de interfaz desde 26-28 px.

## Cómo se arma
Las escenas salen de `gen.mjs` (piezas: carrito, tarjetas de producto, íconos, celular con la
tienda, pills). Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.1): "¿Por qué [Amazon] / te muestra / lo que compraron / los demás?" a 112 px
  desde el cuadro 0, con el carrito gigante y la carpa adentro. "compraron los demás": entran las
  tarjetas Linterna y Bolsa a los costados.
- s02-momento: el carrito sube; pill "El mejor momento" con línea guía; botón "Agregar al carrito";
  el cursor hace clic en "comprando" y el contador del carrito pasa a 1; "Ya está comprando".
- s03-compara: dos clientes (avatares) con "=", pill roja "Cliente con cliente" y tachado en
  "clientes"; en "Compara productos" los avatares giran y son Carpa y Linterna unidas por un arco
  verde; "Producto con producto".
- s04-carrito: cae la carpa al carrito (contador 1); en "aparece la linterna" sale la tarjeta
  "TAMBIÉN COMPRARON · Linterna" con luz que titila; "También la llevaron".
- s05-ojo (giro): la linterna se agranda y es el ranking "MÁS VENDIDOS" (cargador, pilas,
  auriculares en gris); en "vendido" se tacha con una X roja y tiembla: "No es lo que te muestra".
- s06-va-con: "Tu carpa" grande con recuadro de selección "LO TUYO"; se le enganchan Linterna y
  Bolsa de dormir con líneas verdes: "Va con lo tuyo".
- s07-vos: la bolsa de compras de TU LOCAL con un café; al lado un hueco punteado "?":
  "¿Filtros?", "¿Una taza?", "Ya está pagando".
- s08-escala: la caja de pedido grande; en "a tu escala" se achica: "A tu escala".
- s09-tienda: el celular con TU TIENDA: café en grano, "En el carrito", "LLEVÁ TAMBIÉN" (recuadro)
  con Filtros, Taza y Alfajores; el cursor suma Alfajores y el carrito pasa a 2.
- s10-cta: "¿Querés verlo con [tus productos?]" arriba; el celular gira y es la videollamada
  (TU LOCAL · Scalerics); "Videollamada / [gratis] / scalerics.com" en banda verde.

---

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

