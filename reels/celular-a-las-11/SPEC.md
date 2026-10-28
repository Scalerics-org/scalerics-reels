# Reel "El celular a las 11" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "tu competencia no es el de enfrente: es el celular de tu cliente a las once de
la noche". Ahí compiten tiendas de todo el país, y no gana el mejor precio ni el local más lindo:
gana el que deja comprar en ese momento. Vos tenés un Instagram que dice "precio por privado", y a
esa hora nadie pregunta: compra. Lo que se vende: la **tienda online** de Scalerics (tus productos
y precios, abierta a toda hora, Mercado Pago, envíos por DAC, Correo o PedidosYa). Locución de
54 s, ritmo rápido. Mismo estilo que los reels aprobados (`../el-de-enfrente/`,
`../cerraste-a-las-8/`, `../bot-whatsapp/`): mirá sus `compositions/`.

Recurso central del reel: **el celular es la cancha**. Un celular grande (crema, rx 52) con la
hora "23:00" en mono verde en la barra de arriba: adentro de él pasa la competencia (tarjetas de
tiendas, foto, precio, botón verde "Comprar"). **Tu local** (el de `../el-de-enfrente/`, con
toldo y cartel "TU LOCAL") aparece chico y apagado (crema 0.4, sin verde) AFUERA del celular: es
lo que queda fuera de la cancha. El verde es comprar: botón, tilde, "+1 venta".

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-celular.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define tu local, el celular con "23:00" y la luna:
  reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.25 (la voz termina en
54.05).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-celular** (5.71 s) — "Tu competencia no es el de enfrente: es el celular de tu cliente a
las once de la noche." Arranca con dos locales chicos lado a lado medio dibujados (TU LOCAL izq.,
ENFRENTE der., suelo y≈1150), con un "VS" mono entre ellos en "competencia" (0.30). En "no es el
de enfrente" (1.29–2.00) el de enfrente recibe el badge X y se apaga. En "celular" (3.10) los
locales se corren/achican y entra con golpe un celular grande centrado; en "cliente" (3.80) una
mano/pulgar en el borde inferior; en "once" (4.40) la hora "23:00" verde rueda en la barra del
celular, y en "noche" (4.80) se dibuja una luna arriba a la derecha. Etiquetas: "TU COMPETENCIA"
→ "23:00 · EN SU CELULAR".

**s02-todo-el-pais** (4.99 s) — "Ahí no compite tu cuadra. Compiten tiendas de todo el país, a un
toque de distancia." Primero (0–1.6): una cuadra de 3 localcitos en fila (el tuyo al medio) con
cartel de calle "TU CUADRA", que en "cuadra" (0.79) recibe el badge X. Después (1.70–5.0): el
celular grande con una lista de 4–5 tarjetas de tienda (cuadradito-foto + líneas + precio verde)
que caen una tras otra desde "tiendas" (1.89); en "todo el país" (2.73–2.99) un rótulo mono
"TODO EL PAÍS" con pin de mapa; en "toque" (3.89) un dedo toca la primera tarjeta con onda.
Etiquetas: "NO ES TU CUADRA" → "A UN TOQUE".

**s03-no-gana** (5.25 s) — "Y ahí no gana el mejor precio. Ni el local más lindo. Ni el que
tiene más años." Tres íconos en fila (como `../el-de-enfrente/compositions/s03-por-que.html`),
cada uno con su badge X al aparecer: etiqueta de precio "$" con flecha abajo (precio 1.50), un
local con toldo y estrellitas (lindo 2.90), un cartel "DESDE 1985" (años 4.40). Etiquetas:
"NI EL PRECIO" → "NI EL LOCAL" → "NI LOS AÑOS".

**s04-gana** (2.80 s) — "Gana el que lo deja comprar en ese momento." Un botón verde grande
"Comprar" (píldora verde con texto navy) que entra con pop en "Gana" (0.00) y una copa/medalla de
línea arriba; en "comprar" (0.85) un dedo lo aprieta con onda; en "ese momento" (1.65–1.85) un
reloj "23:00" con tilde verde. Etiqueta: "COMPRAR YA".

**s05-otra-tienda** (6.05 s) — "Otra tienda le muestra la foto, el precio y el botón de pagar.
Él toca, paga y se va a dormir." Celular grande con una tienda: en "foto" (1.05) se dibuja la
tarjeta con un producto de línea (una campera o mochila), en "precio" (1.65) el precio verde
"$ 2.890", en "botón de pagar" (2.25) el botón verde "Pagar" con pop. En "toca" (3.45) el dedo
lo aprieta; en "paga" (4.26) la pantalla muestra el tilde grande verde "Pago aprobado"; en
"dormir" (5.05) el celular se apaga (crema 0.4) y aparece una luna con "Zzz". Etiquetas:
"FOTO · PRECIO · PAGAR" → "COMPRÓ Y A DORMIR".

**s06-privado** (5.20 s) — "Vos tenés un Instagram que dice: precio por privado. Y a las once
nadie pregunta. Compra." Un celular con un posteo de Instagram genérico (cuadrado con producto de
línea, iconitos corazón/burbuja, sin logo) en "Instagram" (0.70); en "precio por privado"
(1.77–2.20) aparece debajo un comentario/caption "Precio por privado" en crema y una burbuja de
mensaje con "…" que queda esperando. En "nadie pregunta" (3.70–3.90) la bandeja de mensajes
muestra "0 mensajes" y la burbuja se tacha con línea verde; en "Compra" (4.81) una flecha verde
sale del celular hacia la derecha a un botón "Comprar" de otra tienda con punch. Etiquetas:
"PRECIO POR PRIVADO" → "NADIE PREGUNTA".

**s07-sin-jugar** (5.50 s) — "Tu producto puede ser mejor. Pero si no se puede comprar desde el
sillón, perdiste sin jugar." Tu producto (una caja/paquete de línea) con una estrella verde en
"mejor" (1.40). En "comprar desde el sillón" (2.90–3.80) se dibuja un sillón con la figurita y el
celular; tu producto queda afuera, gris. En "perdiste" (4.58) un tablero de partido mono
"VOS 0 · OTRO 1" o un silbato/cancha con el tuyo apagado; en "sin jugar" (5.20) golpe. Etiquetas:
"PUEDE SER MEJOR" → "PERDISTE SIN JUGAR".

**s08-sistema** (3.51 s) — "Y no es caro ni complicado. Es tener un sistema." Como
`../el-de-enfrente/compositions/s09-sistema.html`: etiqueta "$" con badge X en "caro" (0.80),
maraña de líneas con badge X en "complicado" (1.20); en "sistema" (2.60) los dos se van y se
dibuja el engranaje que gira con punch. Etiquetas: "NI CARO NI COMPLICADO" → "ES UN SISTEMA".

**s09-scalerics** (5.63 s) — "En Scalerics hacemos tu tienda online, con tus productos y tus
precios, abierta a toda hora." Caja redondeada con "Scalerics" (Lexend 700 ~60px) arriba (y≈660)
en "Scalerics" (0.09). Debajo un celular con la tienda en "tienda online" (1.29); en "productos"
(2.59) caen 4 tarjetas 2x2 de líneas; en "precios" (3.19) cada una recibe su precio verde; en
"abierta a toda hora" (3.39–4.79) un cartel verde "ABIERTO" y un relojito que da la vuelta.
Etiquetas: "TU TIENDA ONLINE" → "ABIERTA SIEMPRE".

**s10-cobra** (4.31 s) — "Cobra con Mercado Pago y el envío sale por DAC, Correo o PedidosYa."
Arriba un celular chico con "+1 venta · pagado" y tilde en "Cobra" (0.00) y "MERCADO PAGO" mono
(0.36). Abajo en "envío" (1.46) un paquete que sale en una camioneta; en "DAC" (2.06), "Correo"
(2.66) y "PedidosYa" (3.16) tres píldoras mono de línea con esos nombres en fila. Etiqueta
"COBRA Y ENVÍA".

**s11-tuya** (3.12 s) — "Así, a las once de la noche, la venta es tuya." Vuelve el celular
grande con "23:00" en la barra (once 0.85) y la luna (noche 1.35). Adentro, la tarjeta "Pedido
nuevo · TU LOCAL" que entra con pop y en "tuya" (2.35) un tilde verde grande con punch. Al
costado, tu local (antes apagado) se prende en verde. Etiqueta: "LA VENTA ES TUYA".

**s12-cta** (5.18 s) — "Comentá TIENDA y te contamos cómo." (la voz termina en 1.6). Como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande (Lexend 700 ~110px) en y≈860,
debajo "Bots · Puntos · Tiendas para comercios" (Lexend 500 34px, crema 0.7), y la píldora crema
con texto navy #0B1D35: Comentá "TIENDA", pop en "Comentá" y pulso suave cada ~1.2 s (tweens
finitos). Sin salida con blur.
