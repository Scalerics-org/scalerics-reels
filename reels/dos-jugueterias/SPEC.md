# Reel "Dos jugueterías": spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
punto 6 de CLAUDE.md), con la fuerza visual del punto 7 y los subtítulos del formato estrella
(arriba al centro, 1 a 3 palabras, recuadro verde; rojo apagado para lo que está mal).
Producto: **tienda online** (vender a todo el país: Mercado Pago y envío por DAC/Correo, solo
nombrados en texto y voz, sin logos). Una sola voz: Orus (acelerada a 1.07 con ffmpeg atempo,
silencios de las puntas recortados). Voz 31.6 s; total 34.8 s. 94 palabras (contando scalerics.com).

Historia: gancho "Dos jugueterías en la misma cuadra. Una le vende al barrio. La otra, a todo el
país." Se vienen las fiestas: un abuelo en Salto quiere el mismo juguete (un camión de bomberos)
para su nieto. A la izquierda (Trencito, inventado): linda vidriera, buena atención, pero se compra
solo en el local, y Salto queda lejos. A la derecha (Calesita, inventada): lo encuentra en el
celular, paga con Mercado Pago, sale por DAC y días después llega a Salto. GIRO: las dos son buenas
jugueterías; una, además, abre en todo el país. "Esa tienda online la armamos nosotros." Cierre:
videollamada gratis en scalerics.com. Sin cifras ni estadísticas.

Distinto de `dos-tiendas` (la vidriera que no cierra de noche): acá el ángulo es la distancia
(el interior del país) y la fecha (las fiestas), con el mapa de Uruguay como recurso central.

## Recurso visual central
- Fondo navy claro `#16243d` LISO (armar.mjs local, copiado de dos-gimnasios). Paneles en navy
  oscuro `#0b1220` con borde crema de 6 px.
- Dibujos de líneas gruesas (7 px) y rellenos planos: dos fachadas de juguetería de 430 px con toldo
  de rayas, vidriera con osito, pelota y bloques A/B, y puerta. Trencito en gris `#8a96ab`, Calesita
  en crema con toldo y juguetes verdes.
- El camión de bomberos de juguete (verde, ruedas navy con aro crema, sombra en el piso): el mismo
  objeto en s02, en la tienda del celular (s05) y en la laptop (s09).
- Mapa de Uruguay de líneas (contorno simplificado con lat/lon reales, 700 x 800 px) en s04, s06 y
  s08: ruta roja punteada "Lejos", ruta verde con la caja viajando, y rayos verdes a las 18 capitales.
- Interfaz recreada: celular 680x1100 con "La Calesita · tienda online", búsqueda, ficha del
  producto, botón Comprar y hoja "Pagar con Mercado Pago" → "Pago aprobado"; laptop "TU JUGUETERÍA ·
  TIENDA ONLINE" con 3 productos y chips Mercado Pago / DAC · Correo; videollamada final.
- Todas las escenas salen de `gen.mjs`: correr `node gen.mjs && node armar.mjs`.
- `reel.json`: `subDesde` 17 (el gancho está en grande en s01), `subHasta` 88 (el CTA tiene su
  texto grande), cortes a mano, `malo` = solo, lejos.

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


## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-5.10): cuadro 0 con el gancho entero (Lexend 800, 96/80/88 px, "La otra, a todo
  el país." en verde) y las dos fachadas ya dibujadas. En "barrio" pill roja "Al barrio" (2.6); en
  "La otra" titila la vidriera de Calesita y Trencito baja a 0.5; pill verde "A todo el país" (3.75).
- **s02-abuelo** (5.10-9.50): guirnalda de luces verdes y crema y "Fiestas" gigante en verde; en
  "abuelo" (1.4) entra la ficha "Un abuelo · quiere regalar" y el pin verde "Salto" (1.9); en
  "juguete" (2.5) el camión sube al frente con recuadro de selección y rótulo "EL MISMO JUGUETE";
  pill "Para su nieto" (3.5).
- **s03-vidriera** (9.50-14.22): "TRENCITO · SIN TIENDA ONLINE"; la fachada grande (x1.4). En
  "vidriera" saltan los juguetes y pill "Linda vidriera" (1.3); "Buena atención" (2.25); push-in a la
  puerta y en "Pero se compra" (3.3) cuelga el cartel crema con borde rojo "AVISO · Se compra solo
  en el local".
- **s04-lejos** (14.22-15.74): mapa de Uruguay; Trencito en Montevideo (gris), Salto (crema), ruta
  roja punteada que corre y pill roja "Lejos" (0.6) con temblor.
- **s05-celular** (15.74-19.33): "CALESITA · CON TIENDA ONLINE"; celular grande; se escribe "camión
  de bomberos"; en "encuentra" (0.95) aparece la ficha del camión con "Envío a todo el país"; toque en
  Comprar (1.75) y badge del carrito; en "Paga" sube la hoja "Pagar con Mercado Pago" (2.1), toque
  (2.75) y "Pago aprobado" (3.0).
- **s06-envio** (19.33-22.56): caja de envío grande con etiqueta "DAC" y "Envío por DAC"; se achica a
  Montevideo (0.8), viaja por la ruta verde que se dibuja (1.15-1.95), Salto se pone verde con onda
  (2.0) y pill "Llegó a Salto" (2.1).
- **s07-iguales** (22.56-24.20): las dos fachadas, ahora las dos en crema y verde; "=" verde (0.35);
  tildes "Juguetes" (0.5) y "Atención" (0.8) en las dos.
- **s08-todo-el-pais** (24.20-26.42): mapa con la tienda verde en Montevideo; en "abre" (0.5) una
  onda; en "todo el país" rayos verdes a las 18 capitales departamentales y el país se tiñe de verde;
  pill "Abierta en todo el país" (1.05).
- **s09-tienda** (26.42-28.92): laptop "TU JUGUETERÍA · TIENDA ONLINE" con camión, osito y pelota
  (botones Comprar) y chips "Mercado Pago" y "DAC · Correo"; pill "La armamos nosotros" (1.1).
- **s10-cta** (28.92-34.78): la laptop se achica y se vuelve la videollamada (TU JUGUETERÍA ·
  Scalerics); "Videollamada" (0.38), "gratis" con recuadro (0.62), "scalerics.com" verde (1.55).
