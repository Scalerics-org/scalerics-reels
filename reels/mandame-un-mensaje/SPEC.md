# Reel "Mandame un mensaje" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
puntos y tiendas online para comercios). Le habla al comercio que vende por Instagram con
"mandame un mensaje": cada mensaje que el cliente tiene que mandar es una espera, y en cada
espera la venta se enfría. El que quiere comprar no quiere charlar: quiere pagar. La salida es
una tienda online donde elige, ve el precio y paga con Mercado Pago sin preguntar nada, con
envíos por DAC, Correo o PedidosYa, y en el Instagram un link en vez de "mandame un mensaje".
Producto: Tienda online. Cierre: Comentá LINK. Locución de 55 s, ritmo rápido.

Recurso visual central: **el chat como obstáculo**. Una figurita (el cliente) con un billete
verde en la mano quiere pagar; entre él y el pago se interponen burbujas de chat que se apilan,
cada una con un relojito de espera. En la segunda mitad el chat desaparece y queda un camino
recto: producto → precio → botón "Pagar" verde → tilde. Las burbujas del cliente van en crema
(trazo), las respuestas del comercio en crema tenue; el verde se reserva para lo que es plata,
pago y la tienda.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo, locución, logo de Scalerics abajo (y 1746-1786),
  efectos de sonido.
- `compositions/subtitulos.html`: la frase narrada aparece arriba a la izquierda (x 72, y 236 a
  ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-mensaje.html`: la escena modelo. Copiá su estructura, helpers `dibujar()`,
  `pop()`, `punch()`, `et()`, la figurita del cliente y el billete.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 58.37 (la voz termina en
55.17).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-mensaje** (4.45 s) · "Si para comprarte hay que mandarte un mensaje, ya perdiste la venta."
Un celular (x 350-730, y 610-1210) con un posteo de Instagram: foto de un producto (una
zapatilla de líneas), y debajo, donde iría el precio, un botón de línea "Mandame un mensaje"
(Lexend 26). Arranca medio dibujado. A la derecha del celular, la figurita del cliente con un
billete verde en la mano. En "mandarte un mensaje" (1.40-2.00) aparece una burbuja de chat con
tres puntitos de espera que laten. En "perdiste" (3.10) la figurita se da vuelta y se va hacia la
derecha, el billete verde se va con ella; en "venta" (3.60) un badge X verde sobre el botón.
Etiquetas: "MANDAME UN MENSAJE" → "VENTA PERDIDA".

**s02-charlar** (3.50 s) · "El que quiere comprar no quiere charlar. Quiere comprar." La
figurita grande al centro, con el billete verde extendido. En "charlar" (1.45) aparecen detrás de
ella 3 burbujas de chat vacías (crema tenue) que se tachan con una línea verde. En "Quiere
comprar" (2.19-2.35) entra una bolsa de compras a su lado y el billete hace punch. Etiquetas:
"NO QUIERE CHARLAR" → "QUIERE COMPRAR".

**s03-no-es** (4.21 s) · "Y no es el precio. Ni la confianza. Ni que la gente esté sin plata."
Tres íconos en fila (x 270 / 540 / 810, y≈900), cada uno con su badge X verde en su palabra:
etiqueta de precio con "$" (precio 0.55), dos manos que se dan la mano o un candado (confianza
1.45), billetera (plata 3.35). Etiqueta final "NADA DE ESO".

**s04-pedis** (3.18 s) · "Es todo lo que le pedís antes de dejarlo pagar." Un camino
horizontal: a la izquierda la figurita, a la derecha un botón verde "Pagar". En "todo" (0.36)
caen en el camino 4 vallas/obstáculos (burbujas de chat paradas como vallas) una tras otra. En
"pagar" (2.34) el botón "Pagar" hace punch, lejos. Etiqueta: "ANTES DE PAGAR".

**s05-chat** (10.50 s) · El chat completo, en un celular centrado (x 330-750, y 600-1220). Los
mensajes se apilan desde arriba y el contenido sube (scroll) cuando no entra.
- "¿precio?" (0.46): burbuja del cliente (derecha) "¿Precio?". En "espera" (1.66) un relojito
  verde chico gira al lado; etiqueta "ESPERA".
- "contestás" (2.46): burbuja del comercio (izquierda) "Hola! Te paso por privado".
- "talle" (4.06): cliente "¿Hay talle 40?". En "espera otra vez" (5.13) el relojito vuelve a
  girar; etiqueta "ESPERA OTRA VEZ".
- "envío" (6.96): cliente "¿Hacen envíos?" · "cuenta" (7.96): comercio "Te paso el número de
  cuenta" · "foto del comprobante" (8.76-9.26): burbuja con un ícono de foto/recibo.
  Etiqueta: "UN MENSAJE MÁS".
Arriba del celular, un contador de mensajes no hace falta: lo que se ve es la pila creciendo.

**s06-enfria** (4.01 s) · "En cada espera se enfría un poco. Hasta que deja de contestar." Un
termómetro de líneas grande a la izquierda (x≈360) con el nivel verde alto, y a la derecha la
columna de relojitos de espera. En cada "espera"/"enfría" (0.36, 1.06, 1.56) baja el nivel un
escalón. En "deja de contestar" (2.56-2.96) el nivel llega abajo y aparece una burbuja "..." que
se apaga a 0.3. Etiquetas: "SE ENFRÍA" → "NO CONTESTA MÁS".

**s07-visto** (5.02 s) · "Vos decís que te clavó el visto. Pero esa venta ya era tuya, y la
dejaste ir." Una burbuja grande del comercio con el doble tilde, en "visto" (0.95) el doble tilde
hace punch. En "venta ya era tuya" (1.95-2.85) a la derecha una bolsa de compras con tilde
verde. En "dejaste ir" (3.75-4.05) la bolsa se va flotando hacia
afuera por la derecha, con una línea punteada. Etiquetas: "TE CLAVÓ EL VISTO" → "ERA TUYA".

**s08-sistema** (3.18 s) · "Y arreglarlo no es caro. Es tener un sistema." Etiqueta de precio
"$" con badge X en "caro" (0.93); en "sistema" (2.13) se transforma en el engranaje que se
dibuja y gira (como `../celular-a-las-11/compositions/s08-sistema.html`). Etiquetas: "NO ES CARO"
→ "ES UN SISTEMA".

**s09-tienda** (3.08 s) · "En Scalerics hacemos tu tienda online, que vende sola:" Caja
redondeada con "Scalerics" (Lexend 700 ~60px) arriba en "Scalerics" (0.15), y debajo una
vidriera de tienda online: navegador/celular con tres productos en grilla que se dibujan en
"tienda online" (1.25), y en "vende sola" (2.05) un tilde verde sobre la grilla y "+1 VENTA" cae.
Etiqueta: "VENDE SOLA".

**s10-compra** (7.62 s) · "el cliente elige, ve el precio y paga con Mercado Pago, sin
preguntar nada. El envío sale por DAC, Correo o PedidosYa." Celular con la ficha de un producto
(la zapatilla de s01). "elige" (0.47): un dedo toca la foto; "precio" (1.27): el precio verde "$ 2.490" aparece con punch;
"paga" (1.87): botón verde "Pagar" que se toca, y en "Mercado Pago" (2.47) el botón
pasa a tilde "Pago aprobado"; "sin preguntar nada" (2.87-3.87): una burbuja de chat chica al
costado con badge X. En "envío" (4.67) el celular se corre a la izquierda y entra una caja que
sale en camioneta, con tres tickets DAC / Correo / PedidosYa que aparecen en su palabra (5.37,
5.77, 6.57). Etiquetas: "ELIGE · VE · PAGA" → "SIN PREGUNTAR NADA" → "ENVÍOS".

**s11-link** (4.35 s) · "Y en tu Instagram, en vez de 'mandame un mensaje', ponés un link."
El perfil de Instagram en un celular: círculo de foto, nombre "Tu comercio", la bio. En
"mandame un mensaje" (1.25-2.25) en la bio aparece "Mandame un mensaje" y una línea verde lo
tacha. En "ponés un link" (3.07-3.55) en su lugar entra un ícono de cadena y un botón verde
"Comprar" con punch. Etiqueta: "UN LINK".

**s12-cta** (5.27 s) · "Comentá LINK y te contamos cómo." Como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Bots · Puntos ·
Tiendas para comercios", píldora Comentá "LINK" con pop en "Comentá" y pulsos finitos. Sin salida
con blur: el último cuadro queda quieto.
