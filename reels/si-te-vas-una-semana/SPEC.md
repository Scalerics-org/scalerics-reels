# Reel "Si te vas una semana" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, Scalerics Puntos y tiendas online para comercios). Le pregunta al dueño de un comercio
al que le va bien: "si te vas una semana de vacaciones, ¿tu negocio sigue vendiendo?". Si no,
no tiene un negocio: tiene un trabajo. Todo depende de él (contesta, anota, se acuerda). Un
sistema hace eso aunque no esté. Locución de 54 s, ritmo rápido. Mismo estilo que los reels
aprobados (`../el-de-enfrente/`, `../puntos-que-vuelven/`, `../bot-whatsapp/`, `../descuentos/`).

Recurso central del reel: **la sombrilla y el local**. La sombrilla de playa (con sol y una
línea de olas) es "vos de vacaciones"; tu local es el negocio. Sin sistema, cuando aparece la
sombrilla el local se apaga (crema 0.4, sin verde). Con sistema (desde s08), el local sigue con
la luz verde prendida aunque la sombrilla esté al lado. Sombrilla a la IZQUIERDA, local a la
DERECHA cuando están juntos.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy, locución, logo abajo, efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda. **Las escenas NO
  escriben la frase narrada.**
- `compositions/s01-vacaciones.html`: **la escena modelo.** Define la sombrilla, el local y el
  calendario de 7 días: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.37 (la voz termina en
54.17).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-vacaciones** (4.26 s) — "Si te vas una semana de vacaciones, ¿tu negocio sigue vendiendo?"
Arriba (y≈680) una tira de calendario de 7 casillas L M M J V S D que arranca medio dibujada; en
"semana" (0.90) una línea verde la recorre de punta a punta (la semana marcada). En "vacaciones"
(1.40) abajo a la izquierda se dibuja la sombrilla con el sol y las olas. En "negocio" (2.62) a la
derecha se dibuja tu local con las ventanas verdes. En "sigue vendiendo" (3.00–3.30) un "?" verde
grande hace pop sobre el local y las ventanas parpadean. Etiquetas: "UNA SEMANA AFUERA" →
"¿SIGUE VENDIENDO?".

**s02-trabajo** (4.06 s) — "Si la respuesta es no, no tenés un negocio. Tenés un trabajo." Tu
local grande al centro con un cartel arriba "NEGOCIO". En "no," (0.74) se apagan las ventanas y
aparece el badge X. En "no tenés un negocio" (1.44–2.04) una línea verde tacha la palabra
NEGOCIO. En "Tenés un trabajo" (2.83–3.14) el cartel gira y dice "TRABAJO", y aparece una
figurita detrás del mostrador con una bola y cadena atada al pie (atado al local). Etiquetas:
"SI LA RESPUESTA ES NO" → "ES UN TRABAJO".

**s03-no-es** (3.68 s) — "Y no es culpa de tus empleados. Ni de la temporada. Ni de la
suerte." Tres íconos en fila con badge X al nombrarse (como `../el-de-enfrente/compositions/
s03-por-que.html`): dos figuritas (empleados 0.78), un sol con un calendario chico (temporada
2.08), un trébol (suerte 3.18). Rótulos mono debajo. Etiqueta final "NO ES ESO".

**s04-todo-vos** (7.64 s) — "Es que todo depende de vos. Vos contestás los mensajes. Vos anotás
los pedidos. Vos te acordás de cada cliente." Una figurita grande al centro (vos, y≈1000). En
"todo" (0.50) aparecen alrededor tres íconos: celular (arriba izq.), cuaderno (arriba centro) y
una ficha de cliente (arriba der.), y en "depende" (0.80) tres hilos bajan de cada ícono a las
manos/cabeza de la figurita (como marioneta al revés: todo cuelga de vos). Después cada ícono se
prende en su palabra: "contestás" (2.20) el celular con burbujas verdes que se escriben;
"anotás" (4.10) el cuaderno con renglones que se escriben; "acordás" (5.90) la ficha con 3
caritas que aparecen. Cuando los tres están activos la figurita tiembla (sobrecarga). Etiquetas:
"TODO DEPENDE DE VOS" → "VOS · VOS · VOS".

**s05-playa** (3.80 s) — "Te vas a la playa, y el WhatsApp se llena de preguntas sin
respuesta." Izquierda: la sombrilla con reposera, sol y olas (playa 0.36). Derecha: un celular
con chat; en "WhatsApp" (1.16) se prende; en "se llena de preguntas" (1.76–2.16) caen burbujas
crema una tras otra: "¿Precio?", "¿Abren hoy?", "¿Hacen envíos?", "¿Hola?" y un contador verde
de no leídos que sube. En "sin respuesta" (2.66) el celular se apaga a 0.4. Etiqueta "SIN
RESPUESTA".

**s06-otro** (2.75 s) — "El que quería comprar, le compró a otro." Tu local apagado a la
izquierda con un cartel "CERRADO", otro local a la derecha. Una figurita con una bolsa vacía
frente a tu local en "quería comprar" (0.16–0.46). En "le compró a otro" (1.22–1.86) cruza al
otro local, que se prende verde, y su bolsa recibe un tilde verde. Etiqueta "LE COMPRÓ A OTRO".

**s07-tostado** (3.02 s) — "Volvés tostado, y con una semana de ventas perdidas." Arriba un sol
grande que se dibuja y gira en "tostado" (0.11), con una valija chica que hace pop. Abajo un
gráfico de 7 barras (L a D) que se dibujan en "semana" (1.31) y caen a cero en "ventas perdidas"
(1.81–2.11), dejando una línea plana y un "$ 0" verde. Etiqueta "UNA SEMANA EN CERO".

**s08-sistema** (4.52 s) — "Descansar no es un lujo. Es tener un sistema que trabaje cuando
vos no estás." La reposera bajo la sombrilla con un cartel "LUJO" que en "lujo" (0.89) recibe el
badge X. En "sistema" (2.09) se dibuja el engranaje y gira (como `../el-de-enfrente/
compositions/s09-sistema.html`). En "cuando vos no estás" (2.99–3.69) a la derecha del engranaje
aparece tu local con la luz verde prendida y la sombrilla chica a la izquierda: el engranaje los
une. Etiquetas: "NO ES UN LUJO" → "UN SISTEMA QUE TRABAJA".

**s09-bot** (6.93 s) — "En Scalerics lo armamos para comercios. Un bot de WhatsApp que
contesta al instante con tus precios y toma los pedidos." Caja de marca "Scalerics" (Lexend 700,
como `../el-de-enfrente/compositions/s10-scalerics.html`) en "Scalerics" (0.07) y "PARA
COMERCIOS" en "comercios" (1.47). En "bot" (2.57) la caja se va y entra un celular con chat:
pregunta crema "¿Cuánto sale la torta?" y en "contesta al instante" (3.37–3.97) la respuesta
verde con un rayito; en "precios" (4.77) la respuesta dice "$ 890 · ¿Te la anoto?"; en "toma los
pedidos" (5.57) aparece una tarjeta "PEDIDO #24" con tilde verde. Etiqueta "BOT DE WHATSAPP".

**s10-puntos-tienda** (7.54 s) — "Scalerics Puntos, que le manda un aviso al cliente que dejó de
venir. Y una tienda online que vende y cobra con Mercado Pago, aunque estés en la playa." Primera
mitad (0–3.6): una tarjeta de puntos en un celular chico con "+120" verde (Puntos 0.14); en
"aviso" (1.84) sale una burbuja de notificación "Tenés puntos esperándote" que viaja hasta una
figurita apagada a la derecha (dejó de venir 2.74), que se prende y camina hacia la tarjeta.
Segunda mitad (3.62–7.54): una pantalla de tienda online (navegador simple con 2 productos) en
"tienda" (3.94); en "vende" (4.84) un producto hace pop con "COMPRAR"; en "cobra" (5.24) una
tarjeta "PAGO APROBADO" con tilde verde; en "playa" (7.24) la sombrilla chica aparece al lado.
Etiquetas: "SCALERICS PUNTOS" → "TIENDA ONLINE".

**s11-tranquilo** (3.62 s) — "Y vos te vas tranquilo. El negocio sigue vendiendo." Izquierda la
sombrilla con la reposera (tranquilo 0.90: el sol sonríe/gira suave). Derecha tu local con las
ventanas verdes prendidas, y en "sigue vendiendo" (2.30–2.60) caen notificaciones verdes "+1
pedido" una tras otra sobre el local. Etiquetas: "VOS DESCANSÁS" → "EL NEGOCIO VENDE".

**s12-cta** (5.55 s) — "Comentá VACACIONES y te contamos cómo." El cierre como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, la bajada "Bots · Puntos ·
Tiendas para comercios" y la píldora crema con Comentá "VACACIONES", pop en "Comentá" (0.0),
golpe en "VACACIONES" (0.28) y pulsos finitos. Sin salida con blur.
