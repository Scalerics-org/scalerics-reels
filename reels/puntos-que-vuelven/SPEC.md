# Reel "Puntos que vuelven" — spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics Puntos (app de puntos/fidelización para comercios uruguayos),
narrado por una locución. Copia el ESTILO del reel de referencia (cuadros en
`../../referencias/puntos-ig/hoja1.png`, `hoja2.png`, `hoja3.png`: miralos antes de diseñar), con la
paleta de Scalerics en lugar del naranja.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-mismo-cafe.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.**

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Ilustración de líneas: `stroke #efeee5`, `stroke-width 5`, `round` caps/joins, sin relleno. El
  acento es verde `#5ce611` (trazo o relleno chico: ventanas, badges, números, flechas). Un solo
  acento, nada de otros colores. Lo apagado: crema con opacity 0.35–0.45.
- Todo vive en un `<svg viewBox="0 0 1080 1920">` a pantalla completa (coordenadas = píxeles).
- Zona del dibujo: y 600–1200, centrado en x 540, ancho 420–820 px. Nada arriba de y=580 (ahí
  están los subtítulos) ni abajo de y=1330.
- Etiqueta mono debajo del dibujo: `.etiqueta` igual que s01 (IBM Plex Mono 500, 25px,
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
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. No animar letterSpacing, width,
  height, left, top: solo transforms, opacity, filter, strokeDashoffset.
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft, error,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx hyperframes snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx hyperframes check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (inicios abajo).

## Inicios globales
s02 6.16 · s03 9.57 · s04 14.93 · s05 21.11 · s06 28.79 · s07 34.61 · s08 38.50 · s09 40.75 ·
s10 49.42 · s11 54.35 · s12 59.32 (dura hasta 64.00; la voz termina en 61.25)

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s02-no-es** — "No es el café. Ni el precio. Ni que quede cerca." Tres íconos en fila (y≈900):
taza de café, etiqueta de precio con "$", pin de ubicación. Cada uno se dibuja en su palabra y
enseguida le cae el badge X verde. Etiquetas chicas debajo de cada uno (CAFÉ / PRECIO /
UBICACIÓN, mono 22px crema 0.6). Etiqueta principal al final: "NADA DE ESO".

**s03-sabe-quien** — "Es que ese lugar sabe quién sos, qué pediste la última vez y cuánto hace
que no vas." Celular centrado con la ficha de un cliente: ícono de persona + "Lucía"
(en "quién sos"), "ÚLTIMO PEDIDO" + "Cortado y medialuna" (en "pediste"), "ÚLTIMA VISITA" +
"hace 12 días" en verde (en "cuánto hace"). Las filas aparecen como en la referencia. Etiqueta:
"SABEN QUIÉN SOS".

**s04-sumas** — "Y cada vez que volvés, sumás puntos. Una merienda, una pizza, un postre de
regalo." Primero una órbita como la referencia (hoja2 fila 1): círculo-objetivo en el centro, un
punto que da vueltas alrededor, y en cada vuelta "VISITA 1, 2, 3" y un contador verde que sube
(+150, 300, 450 PTS) — en "sumás puntos" el contador hace punch. Después (en "Una merienda") la
órbita se achica/se va y aparecen tres premios en fila con su ícono de línea: taza con plato
(MERIENDA), porción de pizza (PIZZA), postre/torta (POSTRE), cada uno en su palabra, con un moño
de regalo verde chico. Etiquetas: "VUELVE Y SUMA" → "DE REGALO".

**s05-gasta** — "Mientras tanto, la mayoría de los comercios gasta en atraer gente nueva cada mes.
Y al que ya vino, no le vuelve a hablar nunca más." Un local de líneas (mismo dibujo que el café
de s01 pero con cartel "TU LOCAL") sobre el suelo. En "gasta": billetes/monedas "$" que salen
del local hacia la izquierda; en "gente nueva": figuritas que entran desde la izquierda; un
calendario chico arriba pasa hojas en "cada mes". En "al que ya vino": una figurita sale por la
derecha y se aleja; en "no le vuelve a hablar": globo de mensaje sobre ella, tachado. Etiquetas:
"GASTA EN GENTE NUEVA" → "NI UN MENSAJE".

**s06-cuesta** — "Y esa diferencia pesa. Porque un cliente que vuelve te cuesta mucho menos que
uno nuevo." En "pesa": una balanza de líneas que se inclina. Después se parte la pantalla con una
línea vertical verde (como la referencia, hoja3 fila 2): a la izquierda una figurita con flecha
circular de vuelta (CLIENTE QUE VUELVE) y UNA moneda; a la derecha una figurita nueva (CLIENTE
NUEVO) con una pila de monedas que crece (5–6). En "mucho menos" la moneda de la izquierda pulsa
verde. Etiquetas debajo de cada lado: "CUESTA MENOS" / "CUESTA MÁS".

**s07-sistema** — "Fidelizar no es tener suerte. Es tener un sistema." Trébol de cuatro hojas de
líneas (en "Fidelizar"), en "suerte" le cae el badge X y se apaga; se transforma/cruza a un
engranaje que se dibuja y gira despacio (en "sistema", con punch). Etiquetas: "NO ES SUERTE" →
"ES UN SISTEMA".

**s08-marca** — "Por eso hicimos Scalerics Puntos." Corta. Una caja redondeada de trazo crema
(como la de "LaCarta" en la referencia) que se dibuja y adentro el nombre en Lexend 700 ~64px:
"Scalerics" crema + " Puntos" verde, que entra en "Scalerics" 0.71 / "Puntos" 1.32. Un pulso de
escala en "Puntos". Sin etiqueta mono (o "FIDELIZACIÓN" chiquita). Al final la caja sube hacia
y≈700 y se encoge un poco (la escena siguiente arranca desde ahí).

**s09-como-anda** — "Tu cliente suma con cada compra, lleva su tarjeta en el celular, y si pasan
unas semanas sin verlo, le llega un aviso: tenés puntos esperándote." Arranca con la caja
"Scalerics Puntos" chica arriba (y≈680, igual a como terminó s08) y un árbol que baja de ella a
tres ramas (como la referencia hoja3 fila 4): ticket con "+120" (SUMA), tarjeta (TARJETA),
campana/sobre (AVISOS), cada uno en su palabra (suma 0.47 / tarjeta 2.28 / aviso 6.07). Entre
"semanas" y "aviso" un calendario chico con días tachados. En "tenés puntos esperándote" (6.78)
todo se va y queda un celular con pantalla bloqueada: hora "19:30" grande y una notificación
que cae: "Scalerics Puntos · ahora" / "Tenés 450 puntos esperándote". Etiqueta final: "TE
ESCRIBE SOLO".

**s10-panel** — "Y vos ves quiénes son tus clientes, cada cuánto vienen y qué premios
funcionan." Lo ve el DUEÑO: una pantalla de panel (rectángulo ancho ~820x560 tipo tablet, trazo
crema). En "quiénes": 3–4 filas de clientes con iniciales en círculo y nombre (Lucía M., Martín
R., Sofía P., Diego A.). En "cada cuánto": a cada fila le aparece un dato verde a la derecha
("cada 9 días", "cada 15 días"...). En "premios funcionan": las filas se apilan arriba y aparece
un gráfico de barras horizontales de 3 premios (Merienda, Pizza, Postre) que crecen. Etiqueta:
"TU PANEL".

**s11-cadenas** — "Las cadenas lo hacen con equipos enteros. Vos lo podés tener andando en tu
local." En "cadenas": un edificio corporativo de líneas con grilla de ventanas (como la
referencia), en "equipos enteros" una fila de 6–7 figuritas debajo. Etiqueta "EQUIPOS ENTEROS".
En "Vos" (2.32) todo eso se apaga/achica y aparece un local chico (el de s01/s05) con un celular
o tablet al lado con un tilde verde que se dibuja en "andando". Etiqueta "EN TU LOCAL".

**s12-cta** — "Comentá PUNTOS y te contamos cómo." (la voz termina en 1.93; la escena dura 4.68).
El cierre como la referencia (hoja3 última): el nombre grande "Scalerics Puntos" (Lexend 700
~96px, "Puntos" en verde) centrado en y≈860 con una línea chica debajo "Fidelización para tu
comercio" (Lexend 500 34px, crema 0.7); y una píldora crema con texto navy #0B1D35:
Comentá "PUNTOS" (PUNTOS en verde oscuro no: en #0B1D35 bold) en y≈1150, que entra con pop en
"Comentá" y hace un pulso suave cada ~1.2 s hasta el final (con tweens finitos, no repeat -1).
NO hagas la salida con blur: es el último cuadro, tiene que quedar quieto y legible al final.
