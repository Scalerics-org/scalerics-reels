# Reel "La misma pregunta": spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (pymes, tono de colega, marca).
Producto: **agente de IA** (contesta al instante con tus precios, stock y horarios; te pasa la
conversación cuando es para vos). Formato **contador en vivo** del motion persuasivo de TikTok
(punto 6), todo dentro del **celular a pantalla completa** (punto 7: fondo de pantalla de celular).
Voz Orus sola, 85 palabras, 32.1 s; total 35.33 s. Las escenas salen de `gen.mjs` (correr
`node armar.mjs && node gen.mjs && node armar.mjs`).

Historia: gancho en el cuadro 0, entero y grande: "ESTE CONTADOR SUMA / ¿Cuántas veces te
preguntan lo mismo?" con el contador de tres dígitos (000) que rueda con cada "¿Abren hoy?" que
llega. Alma Ropa (casa de ropa inventada), martes 9:14. Cuatro tarjetas-contador (¿Abren hoy?,
¿Hacen envíos?, ¿Cuánto sale?, ¿Hay talle M?) que suben con cada mensaje; el dueño contesta bien
cada una (respuesta verde con tilde en cada tarjeta) y enseguida llega otra vez la misma. A la tarde
(17:46) los contadores se disparan y el TOTAL DE HOY (125, de este local ficticio, este día) crece
hasta no entrar en la pantalla. Giro: la gente no pregunta de más (tilde a cada pregunta, de cuatro
personas distintas): esas preguntas tienen siempre la misma respuesta (convergen en una sola
burbuja verde "Abrimos de 10 a 19 h", "SIEMPRE LA MISMA"). El agente de IA de Alma Ropa contesta
al instante, con las fichas PRECIOS / STOCK / HORARIOS; el pedido grande (30 remeras) se lo pasa
al dueño ("Esta es para vos"). El reloj vuelve para atrás: "Tiempo para vos". Cierre: videollamada
de Alma Ropa con Scalerics, "Videollamada gratis · scalerics.com".

## Recurso visual central
- `compositions/ambiente.html`: marco del celular, isla, hora (9:14 → 17:46 en "tarde"), batería
  (baja en rojo apagado a la tarde, vuelve a verde con el agente), rótulo mono arriba
  "MENSAJES · ALMA ROPA" → verde "AGENTE DE IA · EN LÍNEA" (19.95) → "SCALERICS · VIDEOLLAMADA".
- Fondo navy liso `#0b1220` (sin degradé ni estrellas: compresión de Instagram). Tarjetas navy
  claro `#16243d` con borde 6 px `#2c4268` y sombra plana; borde verde cuando cuentan.
- Burbujas entrantes crema `#efeee5` con texto navy (44-56 px), salientes verde `#5ce611`.
  Números enormes (196-420 px Lexend 900) en verde; lo que está mal en rojo apagado `#c7655b`
  (badge de no leídos, el total que no entra, la batería).
- Subtítulos arriba al centro (armar.mjs de por-que-la-tarjeta): 1-3 palabras, 86 px, recuadro
  verde en la clave; desde "Casa" (palabra 11) hasta antes de "Videollamada" (81).
- Zona: subtítulos 200-460; escenas 500-1700; logo 1760.

## Escenas (tiempos en tiempos.md)
- **s01-gancho** (0-4.32): título gigante + contador 000 en tarjeta grande; en "suma" (0.6),
  "cuántas" (1.58), 2.5 y 3.3 llega un "¿Abren hoy?" (Sofi, Martín, otros chats) y el dígito rueda
  1-2-3-4 con "+1"; a 3.75-4.0 rueda a 012. Sale el título.
- **s02-martes** (4.32-6.29): remera enorme rellena (crema, franja verde), "Alma Ropa" 120 px,
  pill "MARTES · 9:14" en "martes", badge rojo de no leídos 12 → 14.
- **s03-preguntas** (6.29-10.66): grilla 2x2 de contadores; cada pregunta entra como burbuja abajo
  en su palabra (0, 0.94, 2.14, 3.13), su tarjeta se enciende y suma; las anteriores siguen sumando
  (fin: 5, 3, 3, 2).
- **s04-contestas** (10.66-12.57): cada tarjeta recibe su respuesta verde con tilde (De 10 a 19 h ·
  A todo el país · $ 1.890 · Sí, quedan 3); en 1.22 llega otro "¿Abren hoy?" (Pablo) y suma a 6.
- **s05-tarde** (12.58-15.36): pill "A LA TARDE · 17:46"; los contadores se disparan a 38/27/41/19
  temblando; en "contador" (0.92) la grilla se va y aparece TOTAL DE HOY 125; en "no entra" crece,
  borde rojo; en "pantalla" se pone rojo y se sale del cuadro.
- **s06-giro** (15.36-19.95): cuatro personas (Sofi 10:02, Martín 12:15, Lu 15:40, Carla 17:31)
  preguntan "¿Abren hoy?"; tilde verde a cada una en "más"; líneas verdes convergen (2.0) en una sola
  respuesta "Abrimos de 10 a 19 h" (2.6), copias que se apilan y se funden en "misma" (3.54) +
  pill "SIEMPRE LA MISMA".
- **s07-agente** (19.95-25.01): chat: cabecera "Alma Ropa · AGENTE DE IA · EN LÍNEA" (recuadro en
  "agente"), "¿Cuánto sale el buzo gris? ¿Hay en M?", escribiendo..., respuesta verde en "instante"
  (2.05) + "AL INSTANTE" en la cabecera; fichas crema PRECIOS $ 1.890 / STOCK M: 3 / HORARIOS 10 a
  19 h en "precios", "stock", "horarios" con líneas guía a la respuesta.
- **s08-vos** (25.01-27.40): "Necesito 30 remeras con el logo de mi empresa." → "¡Buenísimo! Te paso
  con alguien del equipo." → notificación blanca grande "Esta es para vos · Pedido grande · 30
  remeras" en "pasa" + pill "Te pasa la conversación".
- **s09-tiempo** (27.40-29.38): reloj grande relleno; en "tiempo" las agujas vuelven para atrás y
  se pinta un cuarto verde; pill "Tiempo para vos" en "devuelve".
- **s10-cta** (29.38-35.33): videollamada horizontal (Alma Ropa con la remera · Scalerics EQUIPO ·
  botón de cámara), "Videollamada" / "gratis" en recuadro / "scalerics.com" verde, ~4 s de
  movimiento suave al final.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá todo va relleno y grande, interfaz recreada, trazos de 6-7 px).

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

