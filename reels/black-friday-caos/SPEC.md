# Reel "Black Friday: caos → control": spec

Reel vertical 1080x1920 de Scalerics, 34.6 s (voz Orus 31.4 s: pausas recortadas a ~0.22 s y
atempo 1.07 sobre la toma original de 33.7 s). Producto: **tienda online** (stock que se descuenta
solo, también con la venta del local; cobro con Mercado Pago; envío por DAC, Correo o PedidosYa).
Fecha del calendario: el Black Friday (no se dice la fecha). Formato del punto 6 de CLAUDE.md:
**caos → control** con tipografía gigante + interfaz recreada. Gancho en el cuadro 0, ya entero:
"BLACK FRIDAY: TU MEJOR NOCHE DE VENTAS." y enseguida "Y TU PEOR NOCHE DE PEDIDOS." Caos:
pedidos de Instagram, WhatsApp y mostrador que llueven, el cuaderno escrito a mano, la última
campera talle M vendida dos veces (etiqueta "QUEDA -1"), el stock a ojo, el reloj de la una y la
planilla. Giro (verde): "Vender mucho está bárbaro. El problema es anotarlo a mano." Control: la
tienda online descuenta el stock sola (3 → 2 → 1, también la venta del local), "Pago aprobado con
Mercado Pago", la caja del envío con DAC/Correo/PedidosYa, el panel del cierre en verde y el
remate: "A la una de la mañana estás durmiendo." Cierre: videollamada gratis en scalerics.com.
Sin estadísticas: los números ($ 186.500, 23 sin anotar, 87 pedidos, $ 2.490) son del local
ficticio. Distinto de `diciembre-el-doble` (ahí el sistema a medida, sin karaoke, cuaderno y caja
registradora): acá el centro es la tarjeta de pedido y la campera vendida dos veces, con karaoke.

## Recurso visual central
La **tarjeta de pedido** (450x176, crema, borde navy 6 px, chip navy con canal INSTAGRAM /
WHATSAPP / MOSTRADOR y su ícono genérico, producto en Lexend 700 40 px, número mono) que llueve en
s01-s03, y **la campera** grande colgada (crema con sombra plana, detalles navy 8 px) que en s06
vuelve como foto del producto en la tienda (verde). El celular grande (560x1100) de s06-s07 y el
panel del cierre (s08) son la interfaz recreada.
Color con significado: gris `#7c8698` y rojo apagado `#c7655b` = el problema (barras apagadas,
"PEDIDOS SIN ANOTAR", ×2, "QUEDA -1", 01:00, "¿?" de la planilla); verde `#5ce611` = resuelto.

## ESTILO (manda sobre SPEC-base)
- Fondo navy **liso** `#0b1220` (el `armar.mjs` local saca degradés y estrellas). **Verde de marca a
  pantalla completa solo en s05 (giro) y s10 (cierre)**, con píldora navy detrás del logo (y 1730).
- Subtítulos karaoke arriba al centro (armar.mjs de `por-que-la-tarjeta`: 1-3 palabras, 86 px, caja
  verde de selección / roja en `malo`). `sinSub` deja sin karaoke el gancho (0-12), el giro (40-49)
  y el CTA (84-89): ahí la tipografía gigante de la escena es el subtítulo.
- Contenido entre y 560 y 1690; trazos 6-8 px; textos de interfaz ≥ 28 px; sombras duras planas.
- Todas las escenas salen de `gen.mjs`: `node armar.mjs && node gen.mjs && node armar.mjs`.
  Caveat (letra a mano) solo dentro del cuaderno de s02.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-4.62): cuadro 0 con "BLACK FRIDAY:" (verde) / "TU MEJOR NOCHE" / "DE [VENTAS.]"
  y el panel VENTAS · VIERNES con barras verdes 20h-01h creciendo y el contador $ 41.500 → $ 186.500.
  En "Y" (2.79) cambia a "Y TU PEOR / NOCHE DE / [PEDIDOS.]" (caja roja), las barras se apagan a
  gris, el encabezado pasa a "PEDIDOS SIN ANOTAR" con contador rojo 0 → 23 y caen 7 tarjetas de pedido
  sobre el panel; sacudón en "pedidos".
- **s02-aluvion** (4.62-7.78): llueven tarjetas de INSTAGRAM (0.0), WHATSAPP (0.48) y MOSTRADOR
  (1.30). En "Todo" (1.78) sube un cuaderno grande y un lápiz verde escribe en letra a mano tres
  renglones ("Campera M · Lucía (insta)", "Buzo L · el de WhatsApp", "Gorro · mostrador ¿pagó?");
  píldora roja "A mano" en "mano".
- **s03-campera** (7.78-10.74): la campera colgada grande con la etiqueta "TALLE M · QUEDA 1"; en
  "vendida" (1.60) entra la tarjeta de Instagram con sello VENDIDA, en "dos" (2.02) la del mostrador
  con sello VENDIDA, cae un "×2" rojo gigante y la etiqueta pasa a "QUEDA -1" en rojo.
- **s04-planilla** (10.74-14.65): estantería con pilas de ropa y píldoras grises "¿5?" "¿3?" "¿6?"…
  en "ojo"; en "Y" el reloj grande 00:59 → "01:00" rojo en "una"; en "planilla" (2.97) el reloj se
  achica a la barra de una planilla gigante "pedidos_viernes_FINAL2.xls" (01:12) con filas que se
  tipean, "¿?" rojos en ¿PAGÓ? y el cursor verde titilando.
- **s05-giro** (14.65-17.78, VERDE): "VENDER / MUCHO ESTÁ / [BÁRBARO.]" con barras navy y flecha
  blanca que sube; en "El" (1.15) "EL PROBLEMA / ES ANOTARLO / [A MANO.]" y un lápiz grande que
  garabatea.
- **s06-tienda** (17.78-22.22): celular grande con la tienda (campera verde, $ 2.490, STOCK 3,
  Comprar) y a la derecha la tarjeta STOCK · Campera M gigante. En "cada" toast "Venta online
  #0431"; en "descuenta/stock" -1 y 3 → 2 (destello verde, "Automático"); en "También" entra la caja
  del LOCAL, línea verde y 2 → 1 en "local".
- **s07-cobra** (22.22-24.40): la pantalla pasa a "Pago aprobado · CON MERCADO PAGO · $ 2.490"; en
  "Arma" cae la caja de envío y aparecen las píldoras DAC (elegida, verde con tilde), Correo, PedidosYa.
- **s08-panel** (24.40-26.20): panel BLACK FRIDAY · CIERRE / Tu tienda / 01:00 con filas Pedidos 87,
  Stock al día, Cobrado todo, Envíos listos que se tildan en verde; en "estás" el encabezado se vuelve
  verde "Todo al día" con "Zzz".
- **s09-productos** (26.20-28.20): ventana de tienda "tutienda.uy · Black Friday" con 4 tarjetas
  "Tu producto" (campera, bolso, gorro, remera); el cursor elige una.
- **s10-cta** (28.20-34.62, VERDE): videollamada navy (TU TIENDA / Scalerics EQUIPO, punto en
  vivo), "VIDEOLLAMADA" / "[GRATIS]" gigantes navy y la píldora navy "scalerics.com" en verde en
  "scalerics.com" (1.70). Queda ~3 s con el botón latiendo.

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

