# Reel "Regalar un café" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos, tiendas online y sitios web para comercios). Producto: **Scalerics Puntos**. Le
dice al dueño de un comercio al que le va bien: "regalar un café te sale más barato que conseguir
un cliente nuevo", y sin embargo casi todos gastan en volantes, publicidad y sorteos para traer
desconocidos y al cliente de todas las semanas no le dan nada. No es mala intención: nadie lleva
la cuenta. Con un sistema de puntos el que ya te compra vuelve. Locución de 55.9 s.

Recurso visual central: **la taza de café contra el megáfono**. La taza (crema, con vapor verde)
es lo barato que premia al que ya viene; el megáfono con monedas que se le escapan es lo caro que
trae desconocidos. Arranca en una balanza en s01 y vuelve a aparecer: la taza es el premio en
s07, el centro del engranaje en s08, los sellos de la tarjeta en s09 y el aviso en s10.
No repetir los dibujos centrales de `../puntos-que-vuelven` (los dos cafés en la calle) ni de
`../tu-mejor-cliente` (el cliente que se va con el calendario de viernes).

Mismo estilo que los reels aprobados: `../el-de-enfrente/` (formato actual), `../puntos-que-vuelven/`,
`../descuentos/` (mirá sus `compositions/`).

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo, locución, logo y efectos.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda. **Las escenas NO
  escriben la frase narrada.**
- `compositions/s01-cafe.html`: **la escena modelo** (helper `dibujar()`, taza, balanza,
  megáfono, figurita). Reusá sus dibujos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 59.09 (la voz termina en
55.89).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-cafe** (4.53 s) — "Regalar un café te sale más barato que conseguir un cliente nuevo."
Una balanza de dos platos (poste y brazo, y≈760–1130). Arranca con la taza a medio dibujar en el
plato izquierdo; en "café" (0.80) sale el vapor verde y la etiqueta "UN CAFÉ". En "barato" (2.00)
una etiquetita de precio chica con "$" verde cuelga de la taza. En "conseguir un cliente nuevo"
(2.70–3.60) en el plato derecho cae el megáfono con 3 monedas "$" y una figurita con "?" y el
brazo se inclina con golpe hacia la derecha (lo caro pesa). Etiquetas: "UN CAFÉ" → "UN CLIENTE NUEVO".

**s02-al-reves** (7.82 s) — "Y casi todos los comercios hacen al revés. Pagan volantes,
publicidad y sorteos para que entre alguien que no conocen." Un local (toldo, puerta) a la
izquierda. En "al revés" (1.97) una flecha verde curva que sale del local hacia afuera y se da
vuelta. Después tres cosas que salen del local en su palabra, en fila a la derecha, y de cada
una cae una moneda "$": volantes (2.97, hojas que vuelan), megáfono (3.67, publicidad), cajita
de regalo con moño (4.87, sorteos). En "entre alguien que no conocen" (5.87–6.97) una figurita
con "?" sobre la cabeza entra por la puerta. Etiquetas: "AL REVÉS" → "PAGAN POR DESCONOCIDOS".

**s03-nada** (3.96 s) — "Y al que viene todas las semanas, no le dan nada. Ni un café." Una
figurita (el de siempre) frente a un mostrador. Arriba una tira de 4 semanas (casilleros) que se
tildan en verde una tras otra en "todas las semanas" (0.65–1.25). En "nada" (2.35) sobre el
mostrador queda un platito vacío. En "Ni un café" (2.96–3.15) aparece una taza punteada
(fantasma, crema 0.4) y recibe el badge X verde. Etiquetas: "VIENE SIEMPRE" → "NI UN CAFÉ".

**s04-no-es** (3.68 s) — "No es mala intención. Ni falta de plata. Ni falta de tiempo." Tres
íconos en fila con badge X al aparecer: corazón (intención 0.39), bolsa con "$" (plata 1.69),
reloj (tiempo 2.79). Etiqueta final "NADA DE ESO".

**s05-cuenta** (2.46 s) — "Es que nadie lleva la cuenta." Un contador de mano (cuerpo
redondeado, visor con "0 0 0", botón y anillo). En "nadie" (0.31) el botón se aprieta pero los
números no cambian; en "cuenta" (1.31) el visor se apaga a 0.4 y aparece un "?" verde grande al
lado. Etiqueta "NADIE LLEVA LA CUENTA".

**s06-confia** (5.95 s) — "El que ya te compra, ya confía en vos. No hay que convencerlo. Solo
darle un motivo para volver." Una figurita con bolsa de compras (compra 0.45). En "confía"
(1.35) un tilde verde en círculo sobre su cabeza. En "convencerlo" (2.85) a la izquierda aparece
el megáfono y una línea verde lo tacha. En "motivo para volver" (4.55–5.25) una flecha circular
verde rodea a la figurita y aparece la taza chica a su lado. Etiquetas: "YA CONFÍA" → "NO HAY QUE
CONVENCERLO" → "UN MOTIVO PARA VOLVER".

**s07-motivo** (4.14 s) — "Un café cuando junta sus puntos. Un postre si hace mucho que no
viene." Dos premios lado a lado. Izquierda: la taza (café 0.10) con una fila de 5 puntos debajo
que se llenan de verde en "junta sus puntos" (0.80–1.30). Derecha: una porción de torta (postre
2.10) con un relojito/calendario arriba que gira en "hace mucho" (2.70). Etiquetas: "AL JUNTAR
PUNTOS" → "SI HACE MUCHO QUE NO VIENE".

**s08-sistema** (2.66 s) — "Eso no es caro. Es tener un sistema." Etiqueta de precio con "$"
que recibe el badge X en "caro" (0.63); en "sistema" (1.86) se va y se dibuja un engranaje
verde que gira con la taza de café adentro. Etiquetas: "NO ES CARO" → "ES UN SISTEMA".

**s09-puntos** (5.87 s) — "Con Scalerics Puntos, tu cliente suma con cada compra y lleva la
tarjeta en el celular." Un celular (rx 52) que se dibuja en "Scalerics" (0.40); adentro el
encabezado "Scalerics Puntos" (Puntos 1.11). Una tarjeta de sellos con 8 tacitas en 2 filas; en
"suma" (2.30) y "cada compra" (2.90–3.20) se llenan de a una en verde con "+1" que sube. En
"tarjeta en el celular" (4.40–4.90) el celular hace un pulso y abajo "TU TARJETA" en verde.
Etiquetas: "SUMA CON CADA COMPRA" → "EN EL CELULAR".

**s10-aviso** (5.05 s) — "Canjea premios que a vos te cuestan poco. Y si deja de venir, le
llega un aviso." Primero (0–2.6): la tarjeta llena con tilde "CANJEADO" y la taza que sale de la
tarjeta (premios 0.23); en "cuestan poco" (1.53–2.03) una etiqueta de precio chiquita "$".
Después (2.71–5.0): una figurita que se aleja y se apaga (deja de venir 3.03–3.43) y un celular
con la notificación verde "Tenés un café esperándote" que entra en "aviso" (4.43). Etiquetas:
"PREMIOS QUE CUESTAN POCO" → "LE LLEGA UN AVISO".

**s11-crecer** (7.49 s) — "Y vos ves quiénes son y cada cuánto vienen. Para crecer no necesitás
más gente. Empezá por los que ya tenés." Panel (pantalla) con 3 filas de clientes: círculo con
iniciales, nombre (quiénes 0.48) y a la derecha "CADA SEMANA", "CADA 15 DÍAS", "HACE 1 MES" (cada
cuánto 1.48–2.28). En "crecer" (3.28) el panel se va y aparece una multitud de 5 figuritas
apagadas a la derecha; en "más gente" (4.48) recibe el badge X. En "los que ya tenés" (6.18–6.48)
3 figuritas a la izquierda se prenden con una flecha verde que sube. Etiquetas: "QUIÉNES SON" →
"CADA CUÁNTO VIENEN" → "LOS QUE YA TENÉS".

**s12-cta** (5.48 s) — "Comentá CAFÉ y te contamos cómo." El cierre como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, "Bots · Puntos · Tiendas
para comercios", y la píldora crema Comentá "CAFÉ" que entra en "Comentá" (0) con golpe en
"CAFÉ" (0.63) y pulsos finitos. Sin salida con blur.
