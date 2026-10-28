# Reel "Comprobante de transferencia" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
puntos y tiendas online para comercios). Le habla al comercio que vende por Instagram o WhatsApp
y cobra por transferencia: "pasame el comprobante". Para el cliente pagar es un trámite (abrir el
banco, copiar la cuenta, poner el monto, sacar la captura, mandarla), lo hace con el celular en
una mano y el ómnibus frenando, le entra un mensaje, lo deja para después y nunca vuelve. Y el
dueño, a la noche, revisa el banco transferencia por transferencia. Mientras, otro comercio cobra
con un botón y se va a dormir. La salida: tienda online donde el cliente elige y paga con Mercado
Pago, la venta llega confirmada y cobrada, y el envío sale por DAC, Correo o PedidosYa.
Producto: Tienda online. Cierre: Comentá COBRAR. Locución de 55.9 s (total 59.05 s).

Recurso visual central: **el comprobante como peaje**. Un ticket de transferencia de líneas
(rectángulo con borde de abajo en zigzag, título "Transferencia", una línea con "$" verde y
renglones tenues) que se interpone entre el cliente (figurita con billete verde) y la compra. En
la primera mitad el ticket y los pasos se apilan; en la segunda, el ticket se tacha y queda un
botón verde "Pagar" y un tilde. El verde se reserva para plata, pagos, tildes y badges.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo, locución, logo de Scalerics abajo (y 1746-1786),
  efectos de sonido.
- `compositions/subtitulos.html`: la frase narrada aparece arriba a la izquierda (x 72, y 236 a
  ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-comprobante.html`: la escena modelo. Copiá su estructura, helpers `dibujar()`,
  `pop()`, `punch()`, `et()`, la figurita del cliente, el billete y el ticket.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 59.05 (la voz termina en
55.85).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-comprobante** (4.85 s) · "Si para comprarte hay que mandarte el comprobante de la
transferencia, no te compran." Un celular (x 250-630, y 610-1210) con un chat: arriba una burbuja
del comercio (izquierda, crema) "Pasame el comprobante" (Lexend 26). Arranca medio dibujado. A la
derecha, la figurita del cliente (x 850, piso y 1180) con el billete verde en la mano, que aparece
en "comprarte" (0.50). En "comprobante" (2.00) entra en una burbuja del cliente el ticket de
transferencia (zigzag abajo, "$" verde). En "transferencia" (2.80) un relojito verde gira al lado
del ticket. En "no te compran" (3.78-4.10) la figurita se da vuelta y se va por la derecha con el
billete; el ticket se apaga a 0.4 y le cae un badge X verde. Etiquetas: "PASAME EL COMPROBANTE" →
"NO TE COMPRAN".

**s02-no-es** (4.83 s) · "Y no es que no tengan plata. Ni que tu producto sea caro. Ni que
desconfíen de vos." Tres íconos en fila (x 270 / 540 / 810, y≈900), cada uno se dibuja y recibe
su badge X verde en su palabra: billetera con un billete verde asomando (plata 0.85), etiqueta de
precio con "$" (caro 2.75), candado (desconfíen 3.65). Etiquetas: "NO ES LA PLATA" (0.85) →
"NI EL PRECIO" (2.75) → "NI LA CONFIANZA" (3.65).

**s03-tramite** (3.64 s) · "Es que les hacés hacer un trámite para darte la plata." A la
izquierda la figurita con el billete; al centro-derecha un formulario de trámite (portapapeles,
x 470-790, y 640-1180) que se dibuja en "trámite" (1.32): clip arriba, 4 renglones con casilla
vacía y una firma garabateada abajo. En "darte la plata" (2.42-2.82) el billete hace punch, y una
flecha punteada intenta ir del billete al formulario y queda trabada contra él. Etiquetas:
"UN TRÁMITE" → "PARA PAGARTE".

**s04-pasos** (6.21 s) · "Abrir el banco, copiar tu cuenta, poner el monto, sacar la captura,
mandártela." Celular grande (x 290-790, y 600-1230). Adentro una lista que se va llenando, una
fila por palabra, cada una con un ícono de línea a la izquierda (x≈360) y el texto (Lexend 28):
"Abrir el banco" (0.00, ícono banco con columnas) · "Copiar la cuenta" (0.68, dos hojitas
superpuestas) · "Poner el monto" (2.18, "$" verde) · "Sacar la captura" (3.38, marco de cámara;
el celular hace un flash crema) · "Mandarla" (4.28, avioncito de papel). Cada fila nueva hace que
la anterior se atenúe un poco. La etiqueta cuenta: "PASO 1" … "PASO 5". Al final (5.2) el
celular entero se achica un toque, como cansado.

**s05-omnibus** (3.05 s) · "Todo con el celular en una mano y el ómnibus frenando." Un ómnibus
de costado (x 160-920, y 720-1110): carrocería, ventanillas, ruedas. Arranca medio dibujado. En
la ventanilla del medio, la figurita parada agarrada del pasamanos con una mano y el celular en la
otra (el celular pop en "celular" 0.37, la mano en "mano" 1.07). En "frenando" (1.97) todo el
ómnibus da un tirón: se inclina adelante, la figurita se va para adelante, aparecen rayas de
frenada bajo las ruedas y el celular se sacude. Etiquetas: "CON UNA MANO" → "FRENANDO".

**s06-despues** (5.71 s) · "En el medio le entra un mensaje, lo deja para después, y ese
después no llega." Celular (x 330-750, y 610-1210) con la app del banco a medio llenar: "Monto"
y una caja con "$" verde y un cursor que parpadea. En "entra un mensaje" (0.92-1.32) cae desde
arriba del celular un aviso (rectángulo redondeado con punto verde, "Nuevo mensaje"). En "deja
para después" (2.32-2.82) el celular se achica, se corre hacia abajo y se apaga a 0.35. En "ese
después no llega" (3.92-4.82): a la derecha un reloj de líneas cuyas agujas giran rápido; en
"llega" el formulario queda vacío y badge X sobre el celular. Etiquetas: "UN MENSAJE" →
"PARA DESPUÉS" → "NO LLEGA".

**s07-noche** (6.20 s) · "Y vos, a la noche, revisando el banco transferencia por transferencia
para ver quién pagó y quién no." Una luna (creciente de línea) arriba a la derecha en "noche"
(0.51). Una pantalla (notebook de líneas, x 220-860, y 700-1170) con la lista del banco: filas con
"Transferencia" y un "$" en cada una, que aparecen en "revisando el banco" (1.01-1.71) y en cada
"transferencia" (2.31, 3.31). Una lupa recorre las filas de arriba abajo. En "pagó" (4.71) una
fila recibe un tilde verde; en "quién no" (5.31-5.61) otra recibe un "?" crema tenue. Etiquetas:
"A LA NOCHE" → "UNA POR UNA" → "¿QUIÉN PAGÓ?".

**s08-boton** (4.45 s) · "Mientras tanto, otro comercio cobra con un botón y se va a dormir."
A la izquierda un local (fachada con toldo, x 170-480, y 760-1170) que se dibuja en "otro
comercio" (1.21-1.41). A la derecha un celular (x 580-900, y 680-1180) con un botón verde lleno
"Pagar" (Lexend 30, texto navy); en "cobra con un botón" (2.28-2.71) un dedo lo toca, el botón
hace punch y aparece un tilde. En "se va a dormir" (3.41-3.61) baja la persiana del local
(líneas horizontales) y sale una luna chica arriba; en el celular cae un aviso "Venta cobrada".
Etiquetas: "UN BOTÓN" → "COBRA DURMIENDO".

**s09-sistema** (1.76 s, corta) · "Y eso no es caro. Es tener un sistema." Etiqueta de precio "$"
con badge X en "caro" (0.46); en "Es tener" (0.76-1.16) se va y se dibuja el engranaje que gira,
punch en "sistema" (1.56). Como `../celular-a-las-11/compositions/s08-sistema.html`. Etiquetas:
"NO ES CARO" → "ES UN SISTEMA".

**s10-tienda** (5.70 s) · "En Scalerics hacemos tu tienda online: el cliente elige, paga con
Mercado Pago y listo." "Scalerics" (Lexend 700, 60px) arriba (y≈640) en "Scalerics" (0.80).
Debajo un celular (x 350-730, y 700-1220) con la tienda: dos productos en grilla (una remera y
una taza de líneas, con precio "$" verde) que se dibujan en "tienda online" (2.10-2.50). En
"elige" (3.40) un dedo toca la remera y su marco se pone verde. En "paga" (4.26) abajo aparece el
botón verde lleno "Pagar" y en "Mercado Pago" (4.60) el texto chico "con Mercado Pago" debajo. En
"listo" (5.50) el botón pasa a un tilde grande verde. Etiquetas: "TU TIENDA ONLINE" → "ELIGE Y
PAGA" → "LISTO".

**s11-confirmada** (7.75 s) · "La venta te llega confirmada y cobrada, sin capturas ni
comprobantes. Y el envío sale por DAC, Correo o PedidosYa." Celular del dueño (x 330-750,
y 620-1220). En "llega" (1.00) cae un aviso "Venta confirmada" con un punto verde; en "cobrada"
(2.20) debajo aparece "$ cobrado" verde con un tilde. En "sin capturas ni comprobantes"
(3.30-3.60) a los costados del celular aparecen el ticket de s01 y un marco de captura en crema
tenue, y una línea verde tacha cada uno. En "envío" (5.00) todo se corre a la izquierda y se
achica, entra una caja de cartón de líneas a la derecha, y en su palabra aparecen tres tickets
apilados "DAC" (5.70), "Correo" (6.20), "PedidosYa" (6.60). Etiquetas: "VENTA CONFIRMADA" →
"SIN COMPROBANTES" → "ENVÍOS".

**s12-cta** (4.90 s) · "Comentá COBRAR y te contamos cómo." Como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Bots · Puntos ·
Tiendas para comercios", píldora Comentá "COBRAR" con pop en "Comentá" y pulsos finitos. Sin
salida con blur: el último cuadro queda quieto.
