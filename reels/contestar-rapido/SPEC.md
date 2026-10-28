# Reel "Contestar rápido" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Producto: **Bot de WhatsApp**. Le dice
al dueño de un comercio que contestar rápido vende más que bajar el precio: hoy el cliente le
escribe a tres locales a la vez y le compra al primero que contesta, no al más barato. Entonces el
dueño baja el precio y pierde plata, cuando en realidad perdió por lento. Locución de 54 s.
Mismo estilo que los reels aprobados (`../el-de-enfrente/`, `../bot-whatsapp/`,
`../puntos-que-vuelven/`, `../descuentos/`).

Recurso central del reel: **la carrera de las respuestas**. Tres locales chicos en fila (A, B y
TU LOCAL, el tuyo a la derecha) y un celular del cliente abajo que les escribe a los tres. El
primero que contesta se prende en verde (y se lleva la bolsa de compra); el tuyo queda apagado
(crema 0.4) aunque tenga la etiqueta de precio más baja. Contra eso, la **etiqueta de precio**
($) es el falso remedio: baja, pierde monedas, se tacha.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy, locución, logo abajo (y 1746–1786), sonidos.
- `compositions/subtitulos.html`: el texto narrado aparece arriba a la izquierda (x 72, y 236 a
  ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-gancho.html`: **la escena modelo**. Copiá su estructura, helpers `dibujar()`
  y `pop()`, la etiqueta de precio y la burbuja de chat.

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


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.25 (la voz termina
en 54.05).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-gancho** (3.01 s) — "Contestar rápido vende más que bajar el precio." Una balanza de dos
platos (eje en x 540, y≈760). Plato izquierdo: una burbuja de chat con un rayito verde adentro
(contestar 0.23 / rápido 0.70). Plato derecho: una etiqueta de precio "$" con flecha verde hacia
abajo (bajar 1.90 / precio 2.20). Arranca a medio dibujar; en "vende más" (0.90–1.50) la balanza
se inclina hacia la burbuja (pesa más) y la burbuja late. Etiquetas: "RÁPIDO" → "VENDE MÁS".

**s02-no-gana** (4.42 s) — "No gana el más barato. Ni el más lindo. Ni el más conocido." Tres
íconos en fila con badge X verde en su palabra: etiqueta "$" con flecha abajo (barato 0.89),
vidriera/percha con chispitas (lindo 2.09), megáfono (conocido 3.19). El anterior se apaga a 0.4.
Rótulos mono debajo: BARATO / LINDO / CONOCIDO. Etiqueta "NO GANA ESO".

**s03-tres-locales** (5.93 s) — "Mirá cómo compra la gente hoy: le escribe a tres locales a la
vez. ¿Cuánto sale?" Un celular chico del
cliente centrado abajo (x 540, y≈1080). En "tres locales" (2.77–3.07) aparecen tres locales chicos
arriba (x 230 / 540 / 850, y≈760), el de la derecha con cartel "TU LOCAL". En "a la vez"
(3.27–3.77) salen tres líneas punteadas del celular a los tres locales a la vez y viajan tres
burbujitas. En "¿Cuánto sale?" (4.69) arriba de cada local aparece la misma burbuja "¿Cuánto
sale?" en pop simultáneo. Etiquetas: "ASÍ COMPRA HOY" → "A TRES A LA VEZ".

**s04-quien-contesta** (4.24 s) — "Uno contesta en un minuto. Otro en una hora. Vos, al otro
día." Los mismos tres locales (sin el celular). Debajo de cada uno, un relojito y un tiempo:
local 1 "1 MIN" verde con tilde y su local se prende (contesta 0.14 / minuto 0.84); local 2
"1 HORA" crema (hora 2.24); tu local "MAÑANA" con calendario chico que pasa de hoja, apagado
(vos 3.05 / día 4.04). Etiqueta "LA CARRERA".

**s05-ya-compro** (5.44 s) — "Y vos eras el más barato. No importa: ya le compró al primero que
contestó." Tu local (derecha) con etiqueta de precio más baja "$ 790" con tilde (barato 1.40)
frente al local 1 (izquierda) con "$ 890". En "No importa" (2.30) tu etiqueta recibe un badge X.
En "le compró al primero" (3.30–3.70) una bolsa de compras viaja hasta el local 1, que se prende
verde con un "1°" grande; en "contestó" (4.20) la burbuja verde del local 1 late. Etiquetas:
"EL MÁS BARATO" → "LE COMPRÓ AL PRIMERO".

**s06-bajas** (5.24 s) — "Entonces pensás que el problema es el precio. Y lo bajás. Y perdés
plata en cada venta." Una cabeza de perfil con burbuja de pensamiento que tiene un "$" adentro
(pensás 0.16 / precio 1.56). En "lo bajás" (2.46–2.66) la cabeza se va y queda una etiqueta de
precio grande cuyo número baja ("$ 890" → "$ 790") con flecha verde para abajo. En "perdés plata"
(3.46–3.76) caen tres monedas de la etiqueta, una por golpe ("cada venta" 4.16–4.36). Etiquetas:
"EL PRECIO" → "LO BAJÁS" → "PERDÉS EN CADA VENTA".

**s07-lento** (3.45 s) — "Pero no perdiste por caro. Perdiste por lento." Etiqueta de precio
con badge X en "caro" (0.82). En "Perdiste por lento" (1.65–2.32) se va y aparece un caracol de
línea que avanza muy despacio sobre una línea de piso, con un relojito arriba; en "lento" punch
y el caracol queda en verde el espiral. Etiquetas: "NO POR CARO" → "POR LENTO".

**s08-sistema** (4.29 s) — "Y llegar primero no es vivir pegado al celular. Es tener un
sistema." Una figurita encorvada con un celular pegado a la cara (pegado 1.17), signos de
cansancio; badge X en "celular" (1.67). En "Es tener un sistema" (2.59–3.07) se va y se dibuja el
engranaje que gira (como `../puntos-que-vuelven/compositions/s07-sistema.html`) con punch en
"sistema". Etiquetas: "NO ES VIVIR PEGADO" → "ES UN SISTEMA".

**s09-bot** (6.52 s) — "Por eso hacemos bots de WhatsApp para comercios. Contesta al instante,
a cualquier hora, con tus precios y tus horarios." Primero (0–2.6): una caja con "Scalerics"
(Lexend 700) arriba (y≈680) en "hacemos", y debajo un celular con la cabecita de bot (robot de
línea) en "bots" (0.38); "PARA COMERCIOS" mono en "comercios". Después (2.73–6.5): el celular
crece y muestra un chat: cliente "¿Cuánto sale?" y la respuesta verde aparece de inmediato en
"instante" (3.18); arriba del chat una hora "23:40" con luna (cualquier hora 3.98–4.38); en
"precios" (4.98) la respuesta muestra "$ 890" y en "horarios" (5.58) "Abrimos 9 a 20 h".
Etiquetas: "BOT DE WHATSAPP" → "AL INSTANTE".

**s10-funciones** (4.68 s) — "Toma pedidos, agenda turnos, y cuando la consulta es para vos, te
la pasa." Tres íconos que aparecen en su palabra (como un árbol corto o fila): una lista de pedido
con tilde (pedidos 0.26), un calendario con un día marcado en verde (turnos 1.36), y un celular
con una flecha verde que pasa a una figurita (vos 3.06 / pasa 3.86). Rótulos mono: PEDIDOS /
TURNOS / TE LA PASA.

**s11-primero** (4.53 s) — "Así llegás primero sin bajar un peso. Aunque estés atendiendo el
mostrador." Los tres locales; ahora el tuyo se prende verde con un "1°" (primero 0.48); su
etiqueta de precio queda igual con un "=" verde (sin bajar un peso 1.28–2.01). En "atendiendo el
mostrador" (2.78–3.38) cambia a un mostrador con vos atendiendo a una figurita y el celular en el
mostrador recibiendo burbujas verdes solo. Etiquetas: "LLEGÁS PRIMERO" → "MIENTRAS ATENDÉS".

**s12-cta** (5.50 s) — "Comentá PRIMERO y te contamos cómo." (la voz termina en 2.30). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, debajo "Bots de WhatsApp
para comercios" (Lexend 500 34px, crema 0.7) y la píldora crema con texto navy: Comentá
"PRIMERO", pop en "Comentá" y pulso suave finito. Sin salida con blur.
