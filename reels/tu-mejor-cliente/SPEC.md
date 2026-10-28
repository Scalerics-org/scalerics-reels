# Reel "Tu mejor cliente" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, Scalerics Puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "tu mejor cliente se fue y no te diste cuenta". Venía todos los viernes, hace dos
meses que no aparece y nadie le escribió. No fue el precio ni la crisis: nadie notó que faltaba.
En otro lado lo anotaron, le sumaron puntos y le escribieron. Producto: Scalerics Puntos (suma
con cada compra, tarjeta en el celular, aviso cuando deja de venir, el dueño ve quiénes son y
cada cuánto vienen). Locución de 54.7 s. Mismo estilo que los reels aprobados
(`../el-de-enfrente/`, `../puntos-que-vuelven/`, `../descuentos/`).

Recurso visual central: **tu mejor cliente = una figurita de línea crema con una estrellita verde
arriba de la cabeza** (siempre la misma, se llama Martín cuando aparece por nombre), y **la tira de
viernes**: casilleros de semanas con tildes verdes que de golpe quedan vacíos. Cuando el cliente ya
no está, se dibuja su silueta punteada (crema 0.4, `stroke-dasharray 10 12`) con la estrellita.
En el cierre (s11) el panel de Puntos muestra a Martín con su tira cortada y el aviso: el reel
cierra el círculo que abrió en s01-s02.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo, locución, logo, efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda (x 72, y 236 a ~500).
  **Las escenas NO escriben la frase narrada.**
- `compositions/s01-se-fue.html`: **la escena modelo**. Define el local, la figurita con estrella,
  los helpers `dibujar()` y `pop()` y la etiqueta.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.93 (la voz termina en
54.73).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-se-fue** (3.66 s) — "Tu mejor cliente se fue y no te diste cuenta." Tu local (fachada de
línea como `../el-de-enfrente` s01, cartel "TU LOCAL") a la izquierda (x≈360, suelo y 1140),
arranca medio dibujado. Al lado de la puerta, la figurita del cliente; en "mejor cliente" (0.30–0.50)
le cae la estrellita verde con pop. En "se fue" (1.00–1.70) camina hacia la derecha y se desvanece
en x≈900, dejando su silueta punteada en el lugar donde estaba. En "no te diste cuenta"
(2.40–3.00) arriba del local se dibuja un ojo CERRADO (arco con pestañas) que se mece. Etiquetas:
"TU MEJOR CLIENTE" → "NI TE ENTERASTE".

**s02-viernes** (4.95 s) — "Venía todos los viernes. Pedía lo de siempre. Hace dos meses que no
aparece." Una tarjeta de calendario (≈640x470, y 680–1150) con encabezado "VIERNES" y una taza
de café chica a la izquierda del encabezado; adentro 3 filas de 4 casilleros. "Venía todos los
viernes" (0–1.04): la primera fila recibe 4 tildes verdes en cadena. "Pedía lo de siempre"
(1.24–2.24): la taza hace pop y echa vapor (dos ondas que se dibujan). "Hace dos meses que no
aparece" (2.91–4.24): las filas 2 y 3 (8 semanas) se marcan vacías una por una, con un guion
crema 0.4 adentro, y en "aparece" el contorno de esas dos filas se encierra con una línea verde.
Etiquetas: "TODOS LOS VIERNES" → "LO DE SIEMPRE" → "HACE 2 MESES".

**s03-nadie-escribio** (3.29 s) — "Y nadie le escribió. Ni un mensaje." Un celular (≈340x600,
y 640–1240) con el chat de "Martín" (avatar con la estrellita, nombre en Lexend). El chat está
vacío; abajo la barra de escribir con un cursor que titila (tweens finitos). En "nadie le
escribió" (0.39–0.89) aparece en el medio "Sin mensajes" en crema 0.45. En "Ni un mensaje"
(1.87–2.09) un "0" grande verde hace pop al lado del celular, con badge X. Etiquetas: "NADIE LE
ESCRIBIÓ" → "NI UN MENSAJE".

**s04-no-es** (4.21 s) — "No se fue por el precio. Ni por la crisis. Ni por algo que hiciste
mal." Tres íconos en fila (como `../bot-whatsapp/compositions/s02-no-es.html`), cada uno con su
rótulo mono y badge X verde en su palabra: etiqueta de precio con "$" (precio 0.60), gráfico en
baja (crisis 1.50), cara con boca de queja (mal 3.20). Etiqueta final "NADA DE ESO".

**s05-nadie-noto** (2.95 s) — "Se fue porque nadie notó que faltaba." Una fila de 5 figuritas
(clientes) en y≈1080; la del medio es la de la estrellita, pero ya es silueta punteada desde
"Se fue" (0.09). En "nadie notó" (0.89–1.49) las otras 4 se balancean como si nada. En "faltaba"
(1.89) la silueta punteada late y su estrellita parpadea; un corchete/llave verde la señala.
Etiqueta: "NADIE LO NOTÓ".

**s06-perro** (3.53 s) — "Vos sabés cómo se llama su perro, pero no tenés su teléfono."
Izquierda (x≈320): un perro de línea con chapita verde en el collar y el nombre "TOBY" (perro
1.44) con tilde verde. Derecha (x≈760): una ficha de contacto (avatar con estrellita, "Martín",
"Tel." y tres puntitos crema 0.4); en "teléfono" (2.54) badge X sobre la ficha. Etiquetas: "SABÉS
DE SU PERRO" → "NO TENÉS SU NÚMERO".

**s07-otro-lado** (5.66 s) — "En otro lado lo anotaron, le sumaron puntos, y cuando faltó una
semana le escribieron." Tres pasos en fila (x 230 / 540 / 850) unidos por flechas que se dibujan:
una libreta con la figurita y "Martín" (anotaron 0.91), una tarjeta de puntos con "+10" que
cuenta (puntos 2.11), un celular chico con "7 días" crema (semana 3.71) y en "escribieron" (4.41)
le entra una burbuja verde "¿Volvés?". Etiquetas: "EN OTRO LADO" → "LE ESCRIBIERON".

**s08-sin-ruido** (5.26 s) — "Un cliente que se va no hace ruido. No se queja. Simplemente deja
de venir." Una puerta de local a la izquierda; la figurita con estrella sale y camina despacio a
la derecha durante toda la escena. En "ruido" (1.45) arriba un parlante con ondas que se apagan
y le cae badge X. En "queja" (2.45) al lado de la figurita una burbuja vacía con "..." que se
desinfla. En "deja de venir" (3.95–4.35) la figurita se vuelve punteada y se desvanece; la puerta
queda sola. Etiquetas: "SIN HACER RUIDO" → "DEJA DE VENIR".

**s09-sistema** (2.68 s) — "No es mala suerte. Es no tener un sistema." Como
`../puntos-que-vuelven/compositions/s07-sistema.html`: trébol con badge X en "suerte" (0.39), se va
y se dibuja el engranaje (1.29) con punch en "sistema" (1.79). Etiquetas "NO ES SUERTE" → "ES UN
SISTEMA".

**s10-puntos** (9.31 s) — "Con Scalerics Puntos, tu cliente suma con cada compra y lleva la
tarjeta en el celular. Si deja de venir, le llega un aviso: tenés puntos esperándote." Un celular
(≈380x620, y 610–1230). Arriba de la pantalla "Scalerics Puntos" (Scalerics 0.41). Adentro una
tarjeta con "Martín", la estrellita y el saldo en verde grande "80" → "90" → "100" (suma 2.41,
compra 3.31) con una fila de 10 sellos que se llenan. En "tarjeta en el celular" (4.51–5.01) el
celular hace punch. En "Si deja de venir" (5.66–6.31) la tarjeta se apaga a 0.45 y aparece
"7 días sin venir" crema. En "aviso" (7.41) baja desde arriba de la pantalla una notificación
(caja de línea verde) con "Tenés 100 puntos esperándote"; late en "esperándote" (8.61).
Etiquetas: "SCALERICS PUNTOS" → "SUMA CON CADA COMPRA" → "EN EL CELULAR" → "LE LLEGA UN AVISO".

**s11-panel** (6.86 s) — "Y vos ves quiénes son tus clientes y cada cuánto vienen. El día que
uno falta, te enterás." Un panel (caja redondeada ≈780x520, y 650–1170) con título mono "TUS
CLIENTES". 4 filas que entran en "quiénes son" (1.22): círculo-avatar + nombre (Lucía, Martín
con estrellita, Sofía, Diego). En "cada cuánto vienen" (2.80–3.60) a la derecha de cada fila se
dibuja su tira de 6 puntitos de visitas (verdes llenos). En "uno falta" (4.90–5.00) la fila de
Martín se encierra en verde y sus últimos 3 puntitos quedan vacíos; en "te enterás" (5.40–5.80)
aparece una campanita verde que suena (se mece) al final de la fila. Etiquetas: "QUIÉNES SON" →
"CADA CUÁNTO VIENEN" → "TE ENTERÁS".

**s12-cta** (5.57 s) — "Comentá AVISO y te contamos cómo." (la voz termina en 2.37). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Fidelización para tu
comercio" y la píldora crema con texto navy: Comentá "AVISO", pop en "Comentá" y
pulsos finitos. Sin salida con blur.
