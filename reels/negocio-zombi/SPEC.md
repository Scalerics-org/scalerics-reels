# Reel "Negocio zombi" (Halloween 2): spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, apps de
puntos y tiendas online para comercios), especial Halloween, pensado para viralizar. Gancho:
"Tu negocio no está muerto. Es peor: es un zombi." Un negocio zombi abre, camina y cobra pero no
crece: vive de los mismos clientes, contesta cuando puede, anota en un cuaderno, está cerrado
cuando el cliente quiere comprar, y el dueño repite el mismo día. Lo que da miedo es pasar diez
años así. Scalerics "le devuelve el pulso": bot, puntos y tienda online. Voz de 56 s.

**Este reel ROMPE el estilo sobrio de los anteriores: es más cargado, con más color y efectos.**
Pedido de Juan: "con más colores y efectos de Halloween, bien currado". Animá con más energía:
golpes, sacudones, glitch, rebotes, cosas que entran volando. Que nunca haya un segundo quieto.

## Paleta (SOLO estos colores)
- Crema `#efeee5`: trazos de líneas (lo de siempre).
- Verde zombi `#5ce611`: piel/brazos del zombi, ojos, y la VIDA (el pulso que vuelve, Scalerics).
- Naranja calabaza `#ff7a1a`: alarma, calabazas, badges de "no", textos de etiqueta, grietas.
- Violeta noche `#9b5cff`: luna, niebla, murciélagos, sombras, brillos de fondo.
- Navy-violeta oscuro `#0d0819`: relleno de pupilas o huecos.
Acá SÍ se permiten: rellenos de color planos, `filter: drop-shadow(0 0 14px <color>)` sobre
cosas verdes, naranjas o violetas (brillo de Halloween, con moderación: 1–3 elementos por
escena), glitch (saltos de x de 10–20 px en 3–4 tweens de 0.03 s), sacudones, rotaciones.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo violeta oscuro con brillo violeta al centro y
  naranja abajo, la voz, el logo abajo y los efectos de sonido.
- `compositions/ambiente.html`: niebla violeta abajo, chispas naranjas que suben, viñeta y
  **rayos** (flash de pantalla) en 0.95, 2.95, 31.75, 41.35 y 51.15 s globales. No los dupliques.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda (y 236 a ~500), acentos
  en naranja. **Las escenas NO escriben la frase narrada.**
- `compositions/s01-zombi.html`: **la escena modelo. Leela entera y copiá su estructura, clases,
  el helper `dibujar()` y EL LOCAL ZOMBI** (local de líneas con toldo torcido, cartel inclinado
  "TU LOCAL", ventanas = ojos verdes con pupila, puerta = boca con dientes, brazos verdes
  estirados). Es el personaje del reel: aparece en varias escenas. Ojo con dos trampas que ya
  pagamos: (1) en un `<g>` anidado, NO uses `svgOrigin` para escalar (es en coordenadas globales
  y lo corre de lugar): usá `transformOrigin: "50% 100%"` o poné la escala fija en el markup con
  `transform="scale(...)"` en un `<g>` interno; (2) `gsap.set(g, {scale})` en SVG escala desde
  la esquina: no lo hagas.

## Sonidos extra disponibles (además de los de la lista de abajo)
`beep` (pitido de monitor cardíaco, corto), `plano` (pitido largo de línea plana, 1.6 s),
`trueno` (2.6 s, usá "max"). Los truenos de los rayos de ambiente ya están en s01; en otras
escenas, si un rayo cae en tu escena (ver tiempos), poné un `trueno` en ese momento.

> **Lo que sigue es la base de los reels anteriores. Donde choca con "Paleta" de arriba, MANDA lo de arriba:** acá hay 4 colores, rellenos, brillos con drop-shadow, etiqueta y badges de "no" en NARANJA. Sonidos además: beep, plano, trueno, impact-bass-2, glitch-2, glitch-3, whoosh-cinematic.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 59.21 (la voz termina en
56.01). Algunos tiempos de palabras sueltas son interpolados (±0.2 s).

## Recurso central: el monitor cardíaco
Varias escenas usan un monitor de signos vitales: un rectángulo redondeado de líneas crema con una
línea de pulso adentro. Negocio zombi = línea casi plana violeta/crema con un latido chiquito cada
tanto. Vivo = línea verde con picos grandes que corren (animá un path de ECG desplazándose con
x, o dibujándose con dibujar() en loop finito). El número de "pulso" en mono (p. ej. "12 BPM" →
"98 BPM").

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea; si se te ocurre algo
mejor y más impactante en este lenguaje, usalo.

**s02-camina** (4.38 s): "Abre todos los días. Camina. Cobra. Pero no crece." El local zombi
(chico, x≈540) con un calendario arriba que pasa hojas rápido (abre todos los días 0–0.7); en
"Camina" (0.74) el local camina arrastrando los pies de izquierda a derecha (balanceo); en
"Cobra" (2.10) sale de la boca un ticket/billete y suena caja; en "no crece" (3.08–3.34) aparece
al lado una flecha de gráfico que intenta subir y se cae plana (naranja), con un "0%" naranja.
Etiquetas "ABRE · CAMINA · COBRA" → "NO CRECE".

**s03-no-es** (3.34 s): "No es la crisis. Ni el barrio. Ni la competencia." Tres lápidas en fila
que emergen de la tierra con rebote, cada una con su palabra grabada en naranja: "CRISIS"
(crisis 0.26), "BARRIO" (barrio 1.16), "COMPETENCIA" (competencia 1.86, más ancha o letra más
chica). Cada una recibe una X naranja y se hunde de nuevo. Murciélagos violetas que cruzan.
Etiqueta "NO ES ESO".

**s04-mismos** (6.26 s): "Un negocio zombi vive de los mismos clientes de siempre. Y cuando uno
se va, ni se entera." El local zombi a la izquierda; frente a él 4 figuritas crema que dan
vueltas en círculo (los mismos de siempre, una ronda que gira lento). En "se va" (4.12) una
figurita se separa, se aleja a la derecha y se desvanece; el zombi ni la mira (sus pupilas
siguen fijas o miran para otro lado) y sobre él aparece "Zzz" violeta o un "?" en "ni se entera"
(4.81–5.12). Etiquetas "LOS MISMOS DE SIEMPRE" → "NI SE ENTERA".

**s05-whatsapp** (3.68 s): "Contesta el WhatsApp cuando puede. Anota los pedidos en un cuaderno."
Un celular (≈320x560) con 5 burbujas de mensajes sin leer apiladas y un badge naranja "12" que
sube; una mano verde de zombi entra desde abajo lenta y torpe a tocarlo (cuando puede 0.56).
En "cuaderno" (2.76) el celular se corre y aparece un cuaderno abierto de líneas con garabatos
y una mancha/tachones; el lápiz tiembla. Etiquetas "CONTESTA CUANDO PUEDE" → "TODO EN UN
CUADERNO".

**s06-once** (3.68 s): "Y a las once de la noche, cuando el cliente quiere comprar, está cerrado."
Luna violeta grande con nubes; un reloj o "23:00" en naranja (once 0.28). Un celular con un
carrito de compras y un botón "COMPRAR" que el cliente toca (quiere comprar 1.68–2.18): el
botón se pone gris y aparece un cartel colgante "CERRADO" naranja que se balancea frente al
local zombi dormido ("Zzz") en "cerrado" (3.18). Etiqueta "23:00 · CERRADO".

**s07-dueno** (5.30 s): "Y el dueño, que tendría que pensar cómo crecer, se pasa el día haciendo
lo mismo que ayer." Una figurita (el dueño) con un globo de pensamiento con una flecha de
crecimiento verde (pensar cómo crecer 1.80–2.40) que se desinfla/explota en "se pasa el día"
(3.13); después el dueño corre en una rueda de hámster o en un círculo con flechas que gira
(loop), con un calendario que repite "LUNES · LUNES · LUNES" (lo mismo que ayer 4.50–5.00).
Etiquetas "TENDRÍA QUE CRECER" → "EL MISMO DÍA, OTRA VEZ".

**s08-miedo** (4.43 s): "Lo que da miedo no es cerrar. Es pasar diez años así." Un cartel
"CERRADO" que cae y recibe X naranja (cerrar 1.70); en "miedo" (1.10, coincide con un rayo en
31.75 global) la pantalla tiembla. Después un calendario/contador que corre rapidísimo de "2026"
a "2036" (diez años 2.80–3.20) con el local zombi envejeciendo: se le cae el cartel, aparecen
telarañas violetas en las esquinas del local. Etiquetas "NO ES CERRAR" → "10 AÑOS ASÍ".

**s09-revivir** (4.51 s): "Para revivirlo no hace falta un milagro. Hace falta un sistema." El
monitor cardíaco grande con la línea casi plana y "12 BPM"; suena `plano`. En "milagro" (1.77)
aparece una vela o estrellitas de "milagro" que reciben X naranja. En "sistema" (3.37) un
engranaje verde se dibuja y gira con punch al lado del monitor, y la línea da un primer latido
verde (beep). Etiquetas "NO ES UN MILAGRO" → "ES UN SISTEMA".

**s10-pulso** (3.40 s): "En Scalerics le devolvemos el pulso a tu comercio." EL momento: en
"Scalerics" (0.06) una caja redondeada con "Scalerics" (Lexend 700 ~64px, crema) con brillo
verde. En "pulso" (1.76, coincide con un rayo en 41.35 global) el monitor se dispara: línea verde
con picos grandes que corren, "98 BPM" verde, beeps rítmicos; el local zombi se transforma: los
brazos verdes se bajan, los ojos pasan de verde zombi a ventanas normales cremas con luz, el
cartel se endereza (o un cross-fade local zombi → local vivo). Etiqueta "PULSO DEVUELTO".

**s11-tres** (6.91 s): "un bot que contesta al instante, puntos para que tus clientes vuelvan, y
una tienda online que vende mientras dormís." Tres tarjetas que entran volando de a una con
golpe, cada una con un ícono en verde y su rótulo mono naranja: un celular con burbuja que
responde (bot 0.16, contesta 0.56: la burbuja aparece instantánea con "⚡" no: con un rayito de
líneas), una tarjeta de puntos con "+10" que sube (puntos 2.02, vuelvan 2.96: flecha circular),
una bolsa/tienda con luna y "Zzz" y monedas que caen (tienda 4.26, dormís 5.86). Debajo, la
línea de pulso verde corre todo el tiempo. Rótulos "BOT" · "PUNTOS" · "TIENDA ONLINE".

**s12-halloween** (3.08 s): "Este Halloween, dejá los zombis para los disfraces." Una calabaza
naranja RELLENA grande (cara verde/crema tallada) que se enciende en "Halloween" (0.25) con
drop-shadow naranja; murciélagos violetas que salen volando de atrás. En "zombis" (1.25, rayo en
51.15 global) aparece una figurita disfrazada de zombi (brazos verdes estirados) que en
"disfraces" (2.05) se saca la máscara y es una persona feliz con una bolsa de compras.
Etiqueta "FELIZ HALLOWEEN".

**s13-cta** (6.18 s): "Comentá ZOMBI y te contamos cómo revivirlo." (voz termina en ~2.4). Cierre
como `../el-de-enfrente/compositions/s11-cta.html` pero en esta paleta: "Scalerics" grande
(Lexend 700 ~110px, crema) en y≈820; debajo "Bots · Puntos · Tiendas para comercios" (Lexend
500 34px, crema 0.7); la píldora NARANJA `#ff7a1a` con texto `#0d0819`: Comentá "ZOMBI", que
entra con pop en "Comentá" y late (pulsos finitos). Arriba, una línea de pulso verde que late con
beeps. Una calabacita y un murciélago chicos decorando. Sin salida con blur: queda quieto al final.
