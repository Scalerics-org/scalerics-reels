# Reel "Diciembre: el doble": spec

Reel vertical 1080x1920 de Scalerics, ~32.7 s (voz Orus de 29.5 s, pausas recortadas y atempo
1.08). Producto: **sistema a medida** (pedidos, stock y caja en un solo lugar). Público: dueños de
pymes. Fecha del calendario: se vienen las fiestas. Formato del punto 6 de CLAUDE.md: **tipografía
cinética + caos → control**. Gancho en el segundo 0 (ya entero en pantalla): "En diciembre vas a
vender más que nunca." y enseguida "¿Tu negocio aguanta el doble?". Caos: el doble de pedidos en el
mismo cuaderno, el doble de "¿esto ya se pagó?", stock a ojo, caja a las once (pilas que crecen).
Giro: "Crecer está bien. Lo que no tiene que crecer es el desorden." Solución: sistema a medida,
los papeles se juntan en un panel verde. Consejo de colega: "Ordenalo en noviembre, no el 23 de
diciembre." Cierre: videollamada gratis en scalerics.com (punto 8). Sin cifras ni estadísticas.

## Recurso visual central
Tipografía GIGANTE (Lexend 800-900, mayúsculas) que entra en la palabra dicha + objetos llenos
grandes (barras de ventas, el cuaderno tapado de pedidos, globo "¿esto ya se pagó?" con tickets,
torre de cajas con "?", caja registradora con 23:00, pila de papeles tachada, el panel). Las
escenas se generan todas desde `gen.mjs` (correr `node armar.mjs && node gen.mjs && node armar.mjs`).

## ESTILO (manda sobre SPEC-base)
- **Fondos alternados**: navy oscuro liso `#0b1220` (el `armar.mjs` local saca los degradés del
  fondo, por la compresión de Instagram) y escenas cortas en **verde de marca `#5ce611`** con texto
  navy (s02, s06, s09 y el cierre s11). En las verdes, una píldora navy detrás del logo (y 1718).
- Color con significado: rojo apagado `#c7655b` y gris `#7c8698` = el problema (tickets sin
  cobrar, 23:00, el 23 de diciembre, el desorden tachado); verde = resuelto (tildes, panel, noviembre).
- Paleta: navy `#0b1220`, navy claro `#16243d` / `#1f3254`, crema `#efeee5`, blanco, verde `#5ce611`
  (sombra `#3fa60a`), rojo apagado, gris. Cartón de cajas `#d9c9a3` (único color fuera de marca,
  apagado). Sin emojis, sin fotos, sin rayas largas.
- **Sin subtítulos karaoke** (`"subtitulos": false`): el texto gigante ES el subtítulo; cada frase
  dicha está en pantalla. Contenido entre y 380 y y 1620; logo en y ~1746.
- Trazos de 6-8 px, sombras duras planas (sin blur), textos de interfaz de 28 px para arriba.

## Escenas (tiempos relativos en tiempos.md)
- **s01-diciembre** (0-2.40, navy): cuadro 0 con "EN DICIEMBRE / VAS A VENDER / MÁS QUE / NUNCA."
  ya entero (más que nunca en verde) y un gráfico de barras grande JUL-DIC (crema); en "más" (1.10)
  la barra DIC (verde) se dispara y se dibuja una flecha verde de tendencia.
- **s02-aguanta** (2.40-4.15, VERDE): "¿TU NEGOCIO / AGUANTA / EL [DOBLE?]" navy, golpe por
  palabra; en "doble" (0.90) cae un "×2" gigante (× blanco, 2 navy) y sacudón chico.
- **s03-cuaderno** (4.15-6.31, navy): "EL DOBLE / DE PEDIDOS"; un cuaderno grande (tapa roja apagada,
  espiral, renglones) y desde "pedidos" (0.35) le caen 12 papelitos "PEDIDO 31..42" que lo tapan.
  En "mismo" "EN EL MISMO" y en "cuaderno" (1.15) "CUADERNO." grande.
- **s04-pago** (6.31-8.23, navy): "EL DOBLE DE"; tickets blancos con "?" rojo apagado van cayendo
  abajo; en "¿esto" (0.73) un globo crema grande con "¿ESTO YA / SE PAGÓ?" navy que tiembla.
- **s05-stock-caja** (8.23-11.51, navy): "STOCK / CONTADO A OJO." con una torre de 6 cajas de
  cartón con "?" que se tambalea y etiquetas grises "¿12?" "¿15?" "¿9?" en "ojo". En "Caja" (1.56)
  todo sube y entra desde abajo una caja registradora grande; "CAJA CERRADA / A LAS ONCE." y en
  "once" (2.27) el visor marca "23:00" en rojo apagado que titila.
- **s06-crecer** (11.51-14.63, VERDE · giro): "CRECER / ESTÁ [BIEN.]" con barras navy que crecen y
  una flecha blanca (VENTAS). En "Lo" (0.98) cambia a "LO QUE NO TIENE / QUE CRECER / ES EL /
  [DESORDEN.]"; a la derecha cae una pila de papeles (DESORDEN) y en "desorden" (2.29) una X roja
  apagada la tacha.
- **s07-a-medida** (14.63-17.26, navy · caos → control): "HACEMOS SISTEMAS / A LA MEDIDA" (verde)
  con una cinta métrica verde que se despliega en "medida"; los papeles del caos (PEDIDO, STOCK,
  CAJA, ¿PAGÓ?) tiemblan y se chupan al centro; aparece el panel navy con borde verde y tres filas
  con tilde: PEDIDOS, STOCK, CAJA. "DE TU NEGOCIO." abajo.
- **s08-panel** (17.26-19.97, navy · interfaz recreada): "PEDIDOS, STOCK Y CAJA" (cada palabra se
  pone verde al decirse) y una interfaz crema grande "TU NEGOCIO · HOY": tarjeta Pedidos (#41
  listo, #42 pagado, #43 enviado), Stock (Pan dulce lleno, Sidra en rojo "reponer"), Caja
  ("Cuadra", cerrada a las 20:05); tildes verdes en "solo"; "EN UN [SOLO LUGAR.]" abajo.
- **s09-doble** (19.97-22.48, VERDE): "VENDER / EL [DOBLE,]" gigante navy; "SIN TRABAJAR / EL
  DOBLE." y en el último "doble" dos rayas rojas apagadas lo tachan.
- **s10-noviembre** (22.48-25.06, navy · consejo): "ORDENALO EN / NOVIEMBRE," (verde); hoja de
  calendario NOVIEMBRE (cabecera verde) con un tilde verde gigante; en "no" (1.22) entra la hoja
  DICIEMBRE con "23" y en "veintitrés" una X roja apagada la tacha. "NO EL 23 / DE DICIEMBRE."
- **s11-cta** (25.06-32.70, VERDE): "¿QUERÉS VERLO / EN TU NEGOCIO?" con una ventana de
  videollamada navy (dos participantes); en "videollamada" (2.14) "VIDEOLLAMADA" y en "gratis"
  "GRATIS" gigantes; en "scalerics.com" (3.34) la píldora navy con "scalerics.com" en verde.
  Queda quieto ~3 s con el punto "en vivo" latiendo.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba.**

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

