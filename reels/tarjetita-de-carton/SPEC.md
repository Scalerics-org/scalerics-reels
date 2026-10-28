# Reel "La tarjetita de cartón": spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos, tiendas online). Producto: **Scalerics Puntos**. Le dice al dueño de un comercio
una verdad incómoda: "la tarjetita de cartón con sellos no fideliza a nadie", esa que tiene al
lado de la caja hace años. No es culpa del premio, ni del cliente, ni de la imprenta: el cartón
se pierde, se lava con el pantalón, queda olvidado en otra billetera. Y lo peor: no sabés quién
la tiene, quién está a un sello del premio, quién dejó de venir, ni cómo se llama; y no podés
avisarle a nadie (el cartón no manda mensajes). Premiar al que vuelve es tener un sistema:
Scalerics Puntos (suma, tarjeta en el celular que no se pierde, sellos, canje, aviso si deja de
venir, panel). Locución de 49 s, ritmo rápido. Mismo estilo que los reels aprobados
(`../el-de-enfrente/`, `../el-que-no-vuelve/`, `../tu-mejor-cliente/`).

Recurso visual central: **la tarjetita de cartón** (dibujo de líneas crema), contra la misma
tarjeta adentro del celular. Geometría compartida de la tarjeta de cartón (coordenadas del SVG,
usala igual en todas las escenas que la muestran, escalada con un `<g>` si hace falta):
- cuerpo: `rect x 300 y 740 w 480 h 300 rx 20`, con la esquina de arriba a la derecha doblada:
  `M740 740 L780 780` + `M740 740 V780 H780` (oreja).
- título: "MIS SELLOS" mono 24px crema, `x 336 y 792`.
- sellos: 2 filas x 5, `cx 360 + i*90` (360..720), `cy 856` y `cy 936`, círculos `r 26` (trazo
  crema 4, opacity 0.55 cuando están vacíos). Sello puesto: círculo crema `r 26` trazo 5 + una
  estrellita/cruz chica adentro (`M-10 0 H10 M0 -10 V10` trasladado), como de goma.
- nombre: mono 24px "NOMBRE" en `x 336 y 1006` y una raya `M470 1000 H744` (en blanco: nadie lo
  llena).
- Lo verde es la pérdida (X, "?", tachados) y, al final, el sello digital (rellenos verdes en
  el celular).

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` y `compositions/subtitulos.html` los genera `armar.mjs`: fondo, locución, logo,
  sonidos y subtítulos karaoke arriba (y 236 a ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-carton.html`: la escena modelo. Copiá su estructura, `dibujar()`, `pop()`,
  `etiqueta()` y la salida con blur.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 52.53 (la voz termina en
49.33). Los tiempos de abajo son relativos a cada escena.

## Escenas

### s01-carton (0.00, 3.66 s) · "La tarjetita de cartón con sellos no fideliza a nadie."
La tarjeta de cartón (geometría de arriba) arranca medio dibujada en el cuadro 0, con un leve
giro (-4°). En "tarjetita" (0.30) aparece "MIS SELLOS" y la raya del nombre. En "cartón" (1.00)
se dobla la oreja (pop) y la tarjeta da un saltito. En "sellos" (1.70) caen 6 sellos de goma en
cascada (cada uno con pop y un golpecito de la tarjeta). En "no fideliza" (2.00–2.20) aparece el
badge X verde grande arriba a la derecha de la tarjeta y la tarjeta se apaga a 0.45. En "nadie"
(2.80) la tarjeta cae unos px y se tuerce más. Etiqueta: "Tarjetita de cartón" (0.3) →
"No fideliza" (2.2).

### s02-caja (3.66, 2.95 s) · "Sí, esa que tenés al lado de la caja hace años."
Un mostrador (línea horizontal y 1120, de x 180 a 900, con frente) y una caja registradora a la
derecha (cuerpo, visor inclinado, teclitas). A la izquierda, sobre el mostrador, una pilita de
tarjetas de cartón (4 rectángulos superpuestos, cada uno corrido) con una gomita. En "esa"
(0.14) se dibuja la pila; en "tenés" (0.64) una flecha verde la señala desde arriba. En "caja"
(1.44) se dibuja la registradora con pop. En "hace años" (1.64–1.94) una telaraña (radios +
arcos crema 0.6) se dibuja en la esquina de la pila y la pila se apaga a 0.45. Etiqueta:
"Al lado de la caja" (0.64) → "Hace años" (1.64).

### s03-no-es (6.61, 3.69 s) · "Y no es culpa del premio. Ni del cliente. Ni de la imprenta."
Tres íconos en fila (x 280, 540, 800; y ~900), cada uno se dibuja en su palabra y enseguida le
cae el badge X verde arriba a la derecha y se apaga a 0.4: caja de regalo con moño en "premio"
(0.69), figurita de palo en "cliente" (1.69), un sello de goma (mango, base, almohadilla) en
"imprenta" (2.79). Etiqueta: "No es el premio" → "Ni el cliente" → "Ni la imprenta".

### s04-se-pierde (10.30, 4.60 s) · "Es que el cartón se pierde. Se lava con el pantalón. Queda olvidado en otra billetera."
Tres viñetas seguidas, en el centro:
- "se pierde" (0.70–0.80): la tarjeta (escala 0.7) está en el centro; se cae girando hacia
  abajo (y +260, rotación 40°) y se desvanece; donde estaba queda un "?" verde que late.
- "Se lava" (1.30–1.65): se dibuja un lavarropas (cuerpo 340x380, panel arriba con dos
  perillas, puerta redonda r 110). Adentro de la puerta, la tarjeta chiquita y una ondita de
  agua giran. En "pantalón" (2.30) entra un pantalón (dos piernas) que gira junto con la tarjeta
  y la puerta tiembla. Badge X verde en la puerta en 2.6.
- "Queda olvidado" (3.21): el lavarropas se va con blur; se dibuja una billetera abierta
  (dos solapas) con la tarjeta adentro asomando; en "billetera" (4.30) la billetera se cierra
  (la solapa gira) y queda un "?" chico verde. Etiqueta: "Se pierde" (0.8) → "Se lava"
  (1.65) → "En otra billetera" (3.4).

### s05-quien (14.90, 4.31 s) · "Y lo peor no es eso. Vos no sabés quién la tiene."
Cuatro figuritas de palo en fila (x 270, 450, 630, 810; pies y 1180), cada una con una
tarjetita chica en la mano. Se dibujan en cascada al arrancar. En "peor" (1.00) golpe: todas se
apagan a 0.45 y la fila tiembla. En "Vos" (2.64) las cabezas pasan a línea punteada y en
"quién" (3.20) aparece un "?" verde arriba de cada una, en cascada; en "tiene" (3.60) las
tarjetitas laten. Etiqueta: "Lo peor" (1.0) → "¿Quién la tiene?" (3.2).

### s06-a-un-sello (19.21, 4.79 s) · "No sabés quién está a un sello del premio, ni quién dejó de venir hace un mes, ni cómo se llama."
La tarjeta de cartón grande, corrida hacia arriba (y -70), con 9 sellos puestos. En "sello"
(0.99) el sello 10 es un círculo verde punteado que late. En "premio" (1.69) aparece a la derecha
de la tarjeta un regalito con un "?" verde. En "dejó de venir" (2.49–2.79) abajo de la tarjeta
una figurita camina hacia la derecha y se va (fade); en "mes" (3.39) queda una flecha verde
alejándose. En "cómo se llama" (3.99–4.49) la raya del NOMBRE se marca en verde y aparecen
"???" verdes encima. Etiqueta: "A un sello" (0.99) → "Dejó de venir" (2.49) → "Sin nombre"
(3.99).

### s07-avisar (24.00, 5.10 s) · "Y aunque lo supieras, no podés avisarle a nadie. El cartón no manda mensajes."
La tarjeta a la izquierda (escala 0.55, centro x ~300) y una figurita a la derecha (x 820). En
"supieras" (0.90) se dibuja un camino punteado en arco entre las dos. En "avisarle" (2.20) un
globito de mensaje (rectángulo redondeado con cola y tres puntos) sale de la tarjeta por el
arco, se frena a la mitad y cae; en "nadie" (2.70) badge X verde en el medio del arco. En "El
cartón" (3.54–3.70) la tarjeta se agranda al centro; en "manda mensajes" (4.10–4.50) un globito
con tres puntos aparece arriba de ella y se tacha con una línea verde. Etiqueta: "No podés
avisarle" (1.77) → "El cartón no habla" (3.7).

### s08-sistema (29.10, 3.10 s) · "Premiar al que vuelve no es caro. Es tener un sistema."
Caja de regalo al centro (se dibuja al arrancar). En "vuelve" (1.10) una figurita entra desde
la derecha caminando hacia el regalo. En "caro" (1.82) un "$" en círculo arriba a la derecha y se
tacha con línea verde. En "Es" (2.41) todo se va con blur y se dibuja el engranaje (como
`../el-que-no-vuelve/compositions/s08-sistema.html`), con golpe en "sistema" (2.70). Etiqueta:
"Premiar al que vuelve" (0.6) → "Es un sistema" (2.41).

### s09-puntos (32.20, 6.03 s) · "Con Scalerics Puntos, tu cliente suma con cada compra y lleva la tarjeta en el celular."
Como `../el-que-no-vuelve/compositions/s09-puntos.html`: celular (380x620, rx 52) medio dibujado
al arrancar. Header "Scalerics Puntos" (Puntos verde) en "Scalerics" (0.80). En "cliente"
(2.20) la tarjeta digital (nombre "Sofía", número verde grande, "PUNTOS", fila de 10 sellos con
4 llenos verdes). En "suma" (2.60) y "compra" (3.50): +10, se llena un sello con pop. En
"celular" (5.20) punch del celular. Etiqueta: "Scalerics Puntos" (0.8) → "Suma con cada compra"
(2.6) → "En el celular" (4.4).

### s10-no-se-pierde (38.23, 3.47 s) · "Esa no se pierde. Junta sellos, canjea premios,"
El celular (mismo que s09) con la tarjeta digital, grilla 2x5 de sellos (6 llenos). En "no se
pierde" (0.17–0.57) un badge tilde verde (círculo + tilde) pop arriba a la derecha del celular,
y a la izquierda una tarjeta de cartón chica, apagada, se cae y se va. En "Junta sellos"
(0.67–1.63) se llenan los 4 que faltan en cascada (pop verde). En "canjea premios" (2.59–2.97)
aparece a la derecha del celular una caja de regalo con moño verde con pop y salta. Etiqueta:
"No se pierde" (0.17) → "Junta sellos" (0.9) → "Canjea premios" (2.59).

### s11-aviso (41.70, 5.00 s) · "y si deja de venir, le llega un aviso. Y vos ves quiénes son y cada cuánto vienen."
Como `../el-que-no-vuelve/compositions/s11-aviso.html`: celular con la tarjeta de Diego; en
"venir" (0.80) se apaga y aparece un texto gris "hace un mes sin venir"; en "llega" (1.50) baja
la notificación (caja con trazo verde: "Te falta un sello" / "para tu premio" en verde) y el
celular vibra. Desde "Y vos ves" (2.64): el celular se va a la izquierda con blur y aparece el
PANEL "Tus clientes" con 4 filas (nombre + "cada semana" / "cada 15 días" / "cada mes" / Diego
"hace un mes" en verde). Filas en "quiénes" (3.10), frecuencias en "cada cuánto" (4.00–4.20),
la fila verde late en "vienen" (4.70). Etiqueta: "Le llega un aviso" (1.5) → "Vos ves quiénes
son" (2.9).

### s12-cta (46.70, 5.83 s) · "Comentá SELLOS y te contamos cómo."
Igual que el CTA de `../el-que-no-vuelve/compositions/s12-cta.html`: "Scalerics" grande, bajada
"Fidelización para tu comercio" y la píldora crema "Comentá “SELLOS”". Pop en "Comentá" (0),
golpe en "SELLOS" (0.81), pulsos suaves. Sin salida: el último cuadro queda quieto.
