# Reel "Cerraste a las 8" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "bajás la cortina a las ocho y hasta mañana vendés cero", y mientras tanto su
cliente sigue comprando, pero a otro. A las once de la noche el cliente está en el sillón con el
celular, busca, encuentra y paga. Lo que se vende: la **tienda online** de Scalerics, con tus
productos y precios, cobro con Mercado Pago y envío a la mañana por DAC, Correo o PedidosYa.
Locución de 49.9 s, ritmo rápido. Mismo estilo que los reels aprobados (`../el-de-enfrente/`,
`../bot-whatsapp/`, `../puntos-que-vuelven/`, `../descuentos/`): mirá sus `compositions/`.

Recurso central del reel: **la hora**. Un reloj digital mono (IBM Plex Mono, verde) que marca la
noche: 20:00 cuando bajás la cortina, 23:00 cuando el cliente compra, 08:00 cuando abrís. Y dos
objetos que se repiten: **tu local con la cortina metálica** (rectángulo con rayas horizontales
que baja; cerrado = crema 0.4, sin verde) y **el celular con la tienda** (crema con acentos
verdes: botón "Pagar", tilde, "+1 pedido"). El local cerrado es lo apagado; la tienda que vende
es lo que se prende.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-cortina.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define el local con la cortina, el reloj digital
  y la figurita: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 53.13 (la voz termina en
49.93).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s01-cortina** (3.70 s) — "Bajás la cortina a las ocho y hasta mañana vendés cero." Tu local
(como el de `../el-de-enfrente/compositions/s01-te-roba.html`, grande, centrado, suelo y≈1150)
arranca medio dibujado con la luz de las vidrieras prendida en verde. En "cortina" (0.50) la
cortina metálica baja de arriba a abajo tapando vidrieras y puerta (rayas horizontales que se
van sumando), y la luz verde se apaga; el local queda crema 0.4. Arriba del local, el reloj
digital "20:00" entra con pop en "ocho" (1.10). En "vendés cero" (2.00–3.32) aparece un
contador de ventas mono "$ 0" que cae con golpe en "cero" y queda temblando. Etiquetas:
"CERRADO" → "VENTAS: 0".

**s02-otro** (4.50 s) — "Tu cliente no. Tu cliente sigue comprando: le compra a otro." Tu
local cerrado chico a la izquierda (crema 0.4, cortina baja). Una figurita (tu cliente) entra
en "cliente" (0.40) y en "no" (1.17) un badge "no" sobre tu local. En "comprando" (2.60) a la
figurita le aparece un celular en la mano y una bolsa de compras; en "le compra a otro"
(3.51–4.00) de su celular sale una flecha verde que se dibuja hacia la derecha, a un local/
tienda "OTRO" con luz verde que hace punch al recibirla. Etiquetas: "SIGUE COMPRANDO" →
"A OTRO".

**s03-no-es** (3.70 s) — "Y no es tu rubro. Ni tu barrio. Ni que internet sea para los
grandes." Tres íconos en fila (como `../el-de-enfrente/compositions/s03-por-que.html`), cada uno
con su badge X verde al aparecer: un mostrador con una balanza o caja (rubro 0.50), una
esquina con cartel de calle (barrio 1.40), un edificio alto (grandes 3.40; arranca a dibujarse
en "internet" 2.40 con un globito de red arriba). Etiquetas: "NO ES EL RUBRO" → "NI EL BARRIO" → "NI EL TAMAÑO".

**s04-once** (4.81 s) — "A las once de la noche tu cliente está en el sillón, con el
celular." El reloj digital pasa de "20:00" a "23:00" (las cifras ruedan) en "once" (1.10); una
luna se dibuja arriba a la izquierda en "noche" (1.60). En "cliente" (2.10) se dibuja un sillón
de líneas con la figurita sentada (en "sillón" 2.90), y en "celular" (3.80) un celular chico en
su mano con la pantalla prendida verde y un pequeño haz de líneas. Etiqueta: "23:00 · EN EL
SILLÓN".

**s05-paga** (3.62 s) — "Busca lo que quiere, lo encuentra y lo paga ahí mismo." Un celular
grande (380x760, centrado) con una tienda: barra de búsqueda arriba en la que se tipea
"zapatillas" (Busca 0.00); en "encuentra" (1.19) aparece una tarjeta de producto (dibujo de
zapatilla de línea, "$ 2.490"); en "paga" (1.99) el botón verde "Pagar con Mercado Pago" se
aprieta (un dedo/círculo lo toca) y en "ahí mismo" (2.50) la pantalla muestra un tilde grande
verde "Pago aprobado". Etiquetas: "BUSCA · ENCUENTRA" → "PAGA AHÍ MISMO".

**s06-dos-caminos** (7.22 s) — "Si te lo compró a vos, mañana armás el paquete y sale. Si no,
mañana abrís y esa venta ya se la llevó otro." Split: arriba de todo el reloj "08:00". Primera
mitad (0–2.6): VOS con tienda: un paquete (caja de líneas) que se arma en "armás el paquete"
(1.27–1.87), con un tilde verde y en "sale" (2.37) se va hacia la derecha en una camioneta
chica. Etiqueta "SALE A LA MAÑANA". Segunda mitad (2.67–7.2): todo eso se va y aparece tu local
con la cortina baja; en "abrís" (4.17) la cortina sube; adentro, vacío. En "esa venta" (5.27)
aparece la tarjeta del pedido "Pedido 23:14" en verde, y en "se la llevó otro" (6.17–6.37) se
desliza hacia afuera a la derecha y desaparece; tu local se apaga a 0.4. Etiqueta "SE LA LLEVÓ
OTRO".

**s07-no-cierra** (2.65 s) — "Vos cerraste a las ocho. Tu tienda online, no." Izquierda: tu
local con la cortina baja (crema 0.4) y "20:00" mono chico encima, en "cerraste" (0.25). Derecha
en "tienda online" (1.65): un celular con la tienda y un cartel verde "ABIERTO" que se prende con
golpe en "no" (2.50). Rótulos "TU LOCAL" / "TU TIENDA". Etiqueta "ABIERTO 24 HS".

**s08-sistema** (3.50 s) — "Y no es caro ni complicado. Es tener un sistema." Como
`../el-de-enfrente/compositions/s09-sistema.html`: etiqueta de precio "$" con badge X en "caro"
(0.90), y un nudo/maraña de líneas con badge X en "complicado" (1.30); en "sistema" (2.70) los
dos se van y se dibuja el engranaje que gira con punch. Etiquetas: "NI CARO NI COMPLICADO" →
"ES UN SISTEMA".

**s09-scalerics** (4.95 s) — "En Scalerics hacemos tu tienda online, con tus productos y tus
precios." Arriba (y≈660) la caja redondeada con "Scalerics" (Lexend 700 ~60px) en "Scalerics"
(0.20). Debajo se dibuja una tienda online en una laptop o un celular grande en "tienda online"
(1.40); en "productos" (2.80) caen 4 tarjetas de producto de líneas en grilla 2x2 (remera,
taza, zapatilla, bolsa), una tras otra; en "precios" (3.80) a cada tarjeta le aparece su
precio verde "$ 890", "$ 450"... Etiquetas: "TU TIENDA ONLINE" → "TUS PRODUCTOS".

**s10-cobra** (5.96 s) — "Cobra con Mercado Pago mientras dormís. Y el envío sale a la mañana
por DAC, Correo o PedidosYa." Primera parte (0–2.2): celular con "+1 pedido · pagado" que cae en
"Cobra" (0.00) con un tilde y "Mercado Pago" mono (0.35); al lado una casa de noche con luna y
"Zzz" en "dormís" (1.25). Etiqueta "COBRA SOLA". Segunda parte (2.27–5.9): el reloj "08:00"
arriba; un paquete en el centro y en "envío" (2.35) sale en una camioneta; en "DAC" (3.75),
"Correo" (4.36) y "PedidosYa" (4.85) aparecen tres píldoras mono de línea con esos nombres en
fila (crema, sin logos), cada una con pop. Etiqueta "ENVÍO A LA MAÑANA".

**s11-abris** (3.38 s) — "Así cerrás a las ocho y abrís con pedidos pagos." Tu local: en
"cerrás" (0.29) la cortina baja y el reloj marca "20:00"; el reloj rueda a "08:00" en "abrís"
(1.59) y la cortina sube; desde adentro del local salen 3 tarjetitas verdes "Pedido · pagado"
apiladas en "pedidos" (1.99), con punch en "pagos" (2.59). Etiquetas: "CERRÁS A LAS 8" →
"ABRÍS CON PEDIDOS".

**s12-cta** (5.14 s) — "Comentá VENDER y te contamos cómo." (la voz termina en 1.9). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande (Lexend 700 ~110px, crema)
centrado en y≈860, debajo "Bots · Puntos · Tiendas para comercios" (Lexend 500 34px, crema 0.7),
y la píldora crema con texto navy #0B1D35: Comentá "VENDER", que entra con pop en "Comentá" y
hace un pulso suave cada ~1.2 s (tweens finitos). NO hagas la salida con blur: es el último
cuadro, tiene que quedar quieto y legible al final.
