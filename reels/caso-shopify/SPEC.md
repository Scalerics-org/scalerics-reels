# SPEC · caso-shopify

**De qué trata:** caso de éxito (serie "Caso de éxito", formato estrella explicador estilo
@resultaaquee). "¿Por qué una tienda de snowboard terminó siendo Shopify?": sus fundadores querían
vender tablas por internet, ningún programa de tienda les servía, se hicieron el suyo a su medida,
otros comerciantes lo quisieron usar y ese programa se volvió Shopify. Giro: no se adaptaron al
software, hicieron un software que se adaptara a ellos. A tu escala: si tu negocio no entra en un
programa genérico, hacemos el sistema a la medida de cómo trabajás (SISTEMA A MEDIDA). Cierre:
videollamada gratis en scalerics.com. Fuentes en `fuentes.md`.

**Recurso visual central:** objetos llenos navy y verde con volumen (lado oscuro, sombra plana)
sobre fondo CREMA liso `#efeee5`, que se transforman: tabla de snowboard gigante → la tabla en
una tienda online → tres programas con huecos que no le sirven → su propio programa con el hueco
con forma de tabla → cuatro tiendas → "</>" con tiendas alrededor y "Shopify" en Lexend (sin logo
ni colores de la marca) → el ENCASTRE: tablero "PROGRAMA GENÉRICO" con hueco cuadrado; la tabla
no entra, el hueco cambia de forma y entra → tu negocio (un local) contra el hueco cuadrado → el
hueco toma la forma del local y aparecen los módulos (Stock, Pedidos, Proveedores, Caja) →
videollamada. Todas las escenas salen de `gen.mjs` (`node gen.mjs && node armar.mjs`).
Subtítulos navy arriba al centro (armar.mjs de caso-starbucks); `reel.json` `saltar: [40]` saca el
subtítulo "Shopify." porque la escena lo muestra gigante.

Paleta: crema `#efeee5` (fondo), navy `#0b1220` / `#16243d` / `#1f3254`, verde `#5ce611` /
`#3fa60a`, blanco, crema oscuro `#dcdacb` (lados), rojo apagado `#c7655b` solo para lo que no sirve.

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


## Escenas (ver tiempos.md)

- **s01-gancho** (0-2.94): cuadro 0 con la pregunta entera (Lexend 800, "Shopify?" en recuadro
  verde) y la tabla gigante en diagonal con sombra. "tienda": círculo navy con carrito verde.
  "snowboard": la tabla salta. "Shopify": late el recuadro.
- **s02-tablas**: la tabla vuela a una ventana de tienda online (barra navy, foto crema). "vender":
  "Tabla de snowboard" y botón Comprar. "internet": el cursor toca, el botón pasa a verde "Comprado".
- **s03-ninguno**: la tabla arriba, tres tarjetas "PROGRAMA 1/2/3" con huecos círculo, cuadrado y
  triángulo. La tabla baja a cada una, rebota, cruz roja en cada una. Pastilla roja "No les servía".
- **s04-suyo**: tablero "SU PROPIO PROGRAMA". "hicieron": chip "</>" y líneas de código. "suyo": el
  código se vuelve el hueco con forma de tabla. "a su medida": regla verde y la tabla entra justo,
  borde verde, tilde, pastilla "A su medida".
- **s05-otros**: el tablero se achica a la primera de cuatro tiendas (tabla, taza, remera, maceta);
  "comerciantes": aparecen las otras con su dueño; "usar": todas pasan a "Vendido".
- **s06-shopify**: las tiendas se juntan en un cubo navy "</>"; "se volvió": ocho mini tiendas
  alrededor; "Shopify": la palabra gigante en Lexend 900 con recuadro de selección.
- **s07-giro**: tablero "PROGRAMA GENÉRICO" con hueco cuadrado. "se adaptaron": la tabla se aprieta
  para entrar; "software": cruz roja grande y vuelve a su forma. Pastilla "A la fuerza".
- **s08-adapta**: "software": el hueco cuadrado se estira hasta tener la forma de la tabla y el
  rótulo pasa a "A SU MEDIDA" verde. "adaptara": la tabla entra, tilde, "Se adapta a ellos".
- **s09-tu-negocio**: el hueco vuelve a cuadrado; entra el local "TU NEGOCIO" (toldo verde). "no
  entra": baja, choca, rebota, el tablero tiembla, "No entra". "genérico": cruz roja.
- **s10-medida**: "sistema": el cuadrado se va y aparece el hueco con forma de local, rótulo
  "A SU MEDIDA". "medida": el local entra, tilde. "cómo trabajás": módulos Stock, Pedidos,
  Proveedores, Caja con tilde.
- **s11-cta**: "¿Lo vemos con tu caso?" arriba; el tablero se vuelve la videollamada (tu negocio y
  Scalerics); "Videollamada" / "gratis" (recuadro) / "scalerics.com" en pastilla verde.
