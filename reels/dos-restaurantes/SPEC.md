# Reel "Dos restaurantes": spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
punto 6 de CLAUDE.md), con la fuerza visual del punto 7 y los subtítulos del formato estrella
(arriba al centro, 1 a 3 palabras, recuadro verde de selección; rojo apagado para lo que está mal).
Producto: **sitio web** (rápido en el celular, carta, horario, cómo llegar, botón a WhatsApp o
reservas). Una sola voz: Orus (acelerada a 1.07 con ffmpeg atempo para que entre en ~33 s).
Voz 32.8 s; total 36.0 s. 90 palabras.

Historia: gancho "Dos restaurantes en la misma esquina. A uno lo eligen sin probarlo." Viernes a la
noche, una pareja busca dónde cenar desde el celular. A la izquierda El Fogón (inventado): sin
carta, "Cerrado · cierra 15:00" (horario viejo), foto borrosa; "¿Abre hoy? ¿Cuánto sale?". A la
derecha La Brasa (inventado): carta con precios, "Abierto hasta 00:00", botón "Reservar por
WhatsApp". Tocan: mesa para dos. GIRO: la comida de los dos es igual de buena (dos platos iguales
con un "=" verde); uno se dejó ver antes de que llegaran (la fachada de La Brasa queda adentro de un
celular verde, la pareja camina hacia su puerta, El Fogón se apaga). Scalerics hace sitios web
rápidos en el celular con tu carta y tu WhatsApp ("turestaurante.uy"). Cierre: el celular gira y se
vuelve la videollamada: "Videollamada gratis · scalerics.com".

Distinto de `reels/te-buscaron`: allá es Google y la ficha; acá es la carta y decidir antes de llegar.

## Recurso visual central
- Fondo navy oscuro `#0b1220` LISO (armar.mjs local: sin degradé ni estrellas, por la compresión).
- Dibujos de líneas grandes, trazo 7 px: dos fachadas de 470 px de ancho cada una (piso en y 1440,
  carteles en y ~734), separadas por una línea punteada en x 540. El Fogón en gris `#7c8698` con
  toldo gris; La Brasa en crema con toldo verde/crema, ventana con luz verde.
- Celulares de 540x960 (s03 a la izquierda, s04-s05 a la derecha) y 580x980 (s08-s09), con notas
  (pill + línea guía) del otro lado: rojas `#c7655b` para lo malo, verdes `#5ce611` para lo bueno.
- Todas las escenas salen de `gen.mjs` (forma de `reels/por-que-la-tarjeta/gen.mjs`): correr
  `node gen.mjs && node armar.mjs`.
- `reel.json`: `subDesde` 12 (el gancho ya está en grande en s01), `subHasta` 87 (el CTA tiene su
  texto grande), `cortes` "auto", `malo` = sin carta, viejo, borrosa, hoy, sale.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-4.66): cuadro 0 con el gancho entero (Lexend 800, 100 y 124 px, "sin probarlo."
  en verde) y las dos fachadas ya dibujadas. En "uno" (2.27) titila la luz de La Brasa y El Fogón se
  apaga a 0.45; en "eligen" (3.0) pill verde "La eligen"; 3.4 pill roja "Ni la miran".
- **s02-viernes** (4.66-7.60): "VIERNES" 200 px + "21:00" mono verde + luna; en "pareja" (1.24) se
  dibuja la pareja en el sillón con el celular verde; en "busca" (1.74) barra de búsqueda que tipea
  "¿Dónde cenamos?".
- **s03-izquierda** (7.60-13.50): entra el celular del Fogón (foto borrosa, carta "no disponible"
  punteada, "Cerrado · cierra 15:00", "Llamar"). "carta" (1.6) recuadro rojo + "Sin carta";
  "horario" (2.33) "Horario viejo" y se tacha; "foto" (3.31) "Foto borrosa" y se borronea más;
  "¿Abre hoy?" (4.54) y "¿Cuánto sale?" (5.43) en globos crema gigantes, el celular a 0.3.
- **s04-derecha** (13.50-17.82): entra el celular de La Brasa. "carta" (1.19) la carta con precios
  y "Carta y precios"; "horario" (1.7) "Abierto hasta 00:00" y "Abierto ahora"; "botón" (3.0) botón
  verde "Reservar por WhatsApp" y pill llena "Reservar"; toque en 3.95.
- **s05-mesa** (17.82-19.45): mismo celular, la pantalla pasa al chat: "¿Mesa para dos a las 21:30?"
  y "¡Listo! Los esperamos." con tilde; pill "Mesa para dos".
- **s06-giro** (19.45-21.84): dos platos iguales grandes con vapor, "El Fogón" y "La Brasa"; en
  "igual" (1.15) un "=" verde gira entre los dos; "Muy buena" con tilde en los dos.
- **s07-dejo-ver** (21.84-24.29): vuelven las fachadas; en "dejó ver" un celular verde se dibuja
  alrededor de La Brasa, El Fogón a 0.22; "Lo vieron antes" (lleno) y "¿Existe?" (rojo); en "antes"
  la pareja camina por una línea punteada hasta la puerta de La Brasa.
- **s08-sitio** (24.29-28.00): celular grande con "turestaurante.uy": barra de carga de un saque en
  "rápidos" + "Abre al toque"; hero verde "TU RESTAURANTE"; "Cómo llegar"; en "carta" (2.61) la carta
  y "Tu carta"; en "WhatsApp" botón "Escribinos por WhatsApp" + "Tu WhatsApp".
- **s09-cta** (28.00-36.00): el celular gira a horizontal y se vuelve la videollamada (TU
  RESTAURANTE · Scalerics); "Videollamada" (2.25), "gratis" con recuadro (2.55), "scalerics.com"
  verde (3.4); queda ~4 s quieto respirando.

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

