# caso-starbucks · caso de éxito, explicador estilo @resultaaquee

Por qué Starbucks quiere que pidas el café antes de llegar: para que no hagas la fila. Antes todo
pasaba en la fila (pedir, pagar, esperar); con su app pedís, pagás y pasás a retirar. Giro: el café
no se hace más rápido, lo que desaparece es la fila. Lección para la pyme: tu cafetería o panadería
con tienda online para pedir y pasar a retirar. Cierre: videollamada gratis en scalerics.com.
Fuentes en `fuentes.md`. Recurso central: el VASO de café genérico (blanco con manga verde y tapa
navy) que se transforma: vaso → fila → estaciones → celular → mostrador → cronómetro → local → bolsa.

## Lo que cambia respecto de SPEC-base (manda esto)
- Fondo CREMA `#efeee5` liso (sin degradés ni estrellitas). Es el fondo del reel en la tanda.
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena, navy `#0b1220`/`#16243d`/`#1f3254`
  y verde `#5ce611` (lado oscuro `#3fa60a`), blanco, crema oscuro `#dcdacb` para cantos, sombra
  plana `rgba(11,18,32,.16)`. Rojo apagado `#c7655b` solo para la fila y la espera. Gris `#b4b2a3`.
- Starbucks se nombra, no se dibuja: ni sirena, ni logo, ni su verde, ni su tipografía. Vaso
  genérico de marca Scalerics (blanco, manga verde lima, tapa navy), personas como siluetas navy.
- Subtítulos arriba al centro, Lexend 700 86 px NAVY, palabra clave en recuadro verde (rojo para
  "fila: pedir, pagar, esperar"). El gancho (s01) y el CTA (s11) no llevan subtítulos.
  `armar.mjs` copiado de amazon-tambien (fondo crema, logo oscuro).
- Tamaños: trazos 7-12 px, textos de interfaz desde 28 px. Zona de dibujo y 560-1700.

## Cómo se arma
Las escenas salen de `gen.mjs` (piezas: vaso, persona, celular, mostrador, cronómetro, local,
bolsa, pills). Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.44): cuadro 0 con "¿Por qué Starbucks / quiere que pidas / el café / [antes de
  llegar]?" a ~108 px y el vaso gigante; en "antes de llegar" entra un celular al costado con
  tilde verde "Listo".
- s02-fila (3.44-6.60): el vaso se va al fondo y es el mostrador; entra una fila de 6 siluetas
  navy grandes hacia el mostrador; "fila" pill roja "La fila"; "Antes," etiqueta mono ANTES;
  "en la fila": recuadro rojo sobre la fila.
- s03-antes (6.60-8.82): tres tarjetas grandes apiladas que caen en cada palabra: Pedir (globo),
  Pagar (caja registradora), Esperar (reloj que gira) con estado rojo "en la fila".
- s04-app (8.82-12.27): las tarjetas se meten en un celular gigante; "su app": etiqueta
  STARBUCKS · SU APP; "Pedís": el dedo toca "Café con leche" (se pone verde) y el carrito pasa a 1.
- s05-retiras (12.27-14.94): "pagás": botón Pagar → tilde verde "Pagado"; "llegás": el celular
  se corre y aparece el mostrador con el vaso y el cartel "LISTO · Lucía"; "retirás": el vaso
  sube; pill verde "Sin fila".
- s06-giro (14.94-17.17): EL GIRO. Cronómetro gigante con el vaso adentro: la aguja gira igual;
  "no se hace más rápido": pill navy "Mismo café, mismo tiempo".
- s07-sin-fila (17.17-19.05): la fila vuelve y en "desaparece" cada silueta se esfuma; queda
  el hueco punteado y la pill verde "Fila: 0".
- s08-tu-local (19.05-22.24): un local grande con toldo verde y vidriera; "cafetería": cartel
  CAFETERÍA con un vaso en la vidriera; "panadería": el cartel gira a PANADERÍA con medialunas;
  "lo mismo": pill "Lo mismo, a tu escala".
- s09-tienda (22.24-26.27): celular gigante con TU PANADERÍA: medialunas x6, chip "Retiro en
  el local", botón Pagar; "paga": tilde "Pagado"; "pasa a retirar": sale la bolsa con el ticket
  "Listo para retirar".
- s10-scalerics (26.27-27.98): la bolsa grande al centro; en "Scalerics" una tarjeta blanca con
  el logo se pega encima como etiqueta.
- s11-cta (27.98-35.29): "¿Querés verlo / en tu local?" grande; la bolsa se vuelve videollamada
  (pantalla TU LOCAL / Scalerics); "Videollamada" "gratis" (recuadro) y "scalerics.com" en pill
  verde grande. ~3 s quieto al final.

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

