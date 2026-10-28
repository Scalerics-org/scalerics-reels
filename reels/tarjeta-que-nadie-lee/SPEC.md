# Reel "Tarjeta que nadie lee" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace sitios web,
bots de WhatsApp, apps de puntos y tiendas online para comercios). Producto: **sitio web**. Le dice
al dueño de un comercio: "tu página web es una tarjeta personal que nadie lee": nombre, dirección y
un botón de "contactanos". El cliente entra con una pregunta (qué vendés, cuánto sale, a qué hora
abrís), la página no le contesta y se va. Una web que trabaja muestra lo que vendés, precios y
horarios, y te lleva a pedir o reservar en un toque (WhatsApp o tienda). Locución de 54.6 s.
Mismo estilo que los reels aprobados: `../el-de-enfrente/`, `../nadie-te-encuentra/` (su s05 tiene
un celular con una página: reusalo), `../puntos-que-vuelven/`, `../bot-whatsapp/`.

Recurso central: **la tarjeta contra la web que trabaja**. La tarjeta es un rectángulo apaisado
crema (rx 18) con "Tu Local", una dirección y un botón contorneado "Contactanos": se dibuja en
crema y, cuando ya se sabe que no sirve, se apaga (crema 0.4). La web que trabaja es un celular
(rx 52) con productos, precios verdes, horario y botones verdes "Pedir" / "Reservar": ahí vive el
acento verde. Lo que no trabaja va sin verde.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo, locución, logo de Scalerics abajo (y 1746–1786),
  efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado palabra por palabra arriba a la izquierda (x 72,
  y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-tarjeta.html`: **la escena modelo.** Copiá su estructura, helpers `dibujar()`,
  `pop()`, `badge()`, `etiqueta()`, y la tarjeta tal cual (mismas medidas y textos).

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.81 (la voz termina en
54.61).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-tarjeta** (3.97 s) — "Tu página web es una tarjeta personal que nadie lee." Arranca con una
ventana de navegador (x 230–850, y 700–1100: barra con tres circulitos y una barra de dirección)
a medio dibujar. En "tarjeta" (1.30) la ventana se encoge en y y se convierte en la tarjeta
(x 250–830, y 760–1080) con "Tu Local", la dirección "Av. Siempreviva 742" (con pin) y el botón
contorneado "Contactanos". En "nadie lee" (2.70–3.30) arriba (y≈660) se dibuja un ojo que se
cierra (párpado) y la tarjeta se apaga a 0.45. Etiquetas: "TARJETA PERSONAL" → "NADIE LA LEE".

**s02-nada-mas** (4.51 s) — "Tu nombre, tu dirección y un botón de contactanos. Y nada más." La
tarjeta grande otra vez (sin apagar). Cada renglón hace un golpe y se marca con una flechita
verde a la izquierda en su palabra: nombre (0.13), dirección (0.93), botón "Contactanos" (1.83).
En "Y nada más" (3.43) la tarjeta se queda sola y debajo aparecen tres renglones punteados vacíos
(crema 0.35) que parpadean: lo que falta. Etiquetas: "NOMBRE · DIRECCIÓN" → "Y NADA MÁS".

**s03-no-es** (4.43 s) — "El problema no es el diseño. Ni los colores. Ni que sea vieja." Tres
íconos en fila (x 270 / 540 / 810, y≈930), cada uno en su palabra con su badge X verde: un lápiz
y regla (diseño 1.12), tres muestras de color de líneas (colores 2.02), un calendario viejo con
hojas dobladas (vieja 3.42). Etiquetas: "EL PROBLEMA" → "NADA DE ESO".

**s04-pregunta** (6.34 s) — "Es que no trabaja. Tu cliente entra con una pregunta: qué vendés,
cuánto sale, a qué hora abrís." Primero (0–1.0) la tarjeta chica con un engranaje quieto al lado
que recibe el badge X en "trabaja" (0.39). Después (1.09–) una figurita con celular a la
izquierda (cliente 1.79) y tres burbujas crema que aparecen apiladas a la derecha: "¿Qué
vendés?" (3.49), "¿Cuánto sale?" (4.39), "¿A qué hora abrís?" (5.39). Etiquetas: "NO TRABAJA" →
"TRAE UNA PREGUNTA".

**s05-contesta** (4.46 s) — "Y tu página le contesta: contactanos. Él no contacta." Un celular
(como s05 de `nadie-te-encuentra`) con la tarjeta adentro; a su izquierda arriba las tres
preguntas en chico. En "contactanos" (1.60) el botón "Contactanos" del celular late grande, como
única respuesta. En "no contacta" (3.10–3.55) un dedo/cursor se acerca al botón, se frena y se
retira; el botón recibe el badge X. Etiquetas: "TODA LA RESPUESTA" → "NO CONTACTA".

**s06-se-va** (2.59 s) — "Cierra y se va al que le muestra todo de una." Dos celulares chicos: el
tuyo (izq., apagado, con la tarjeta) y el del otro (der.). En "Cierra" (0.0) una X de cerrar en
el tuyo y se apaga; la figurita camina hacia la derecha (se va 0.59); en "muestra todo" (0.89–1.19)
el de la derecha se llena de renglones con precios verdes y un botón verde. Etiqueta "SE VA AL
OTRO".

**s07-trabaja** (4.81 s) — "Una web que trabaja muestra lo que vendés, con precios y horarios
claros." Un celular grande al centro. Engranaje chico verde que gira en la cabecera (trabaja
0.50). En "muestra lo que vendés" (1.20–1.90) tres productos de línea en fila (taza, bolsa,
caja). En "precios" (3.00) aparecen "$ 190", "$ 450", "$ 320" verdes debajo de cada uno. En
"horarios" (3.60) un renglón con reloj "Abierto hoy · 9 a 21" y en "claros" (4.00) un tilde
verde. Etiquetas: "LO QUE VENDÉS" → "PRECIOS Y HORARIOS".

**s08-compra** (4.29 s) — "Y te lleva a pedir o a reservar en un toque. Ahí el cliente no lee:
compra." El celular con dos botones grandes: "Pedir" (pedir 0.59, verde lleno con texto navy) y
"Reservar" (reservar 0.99, contorno verde). En "toque" (1.49) un dedo toca "Pedir" con onda.
En "no lee" (2.79–3.09) la tarjeta chica a un costado, tachada con línea verde; en "compra"
(3.80) una bolsa de compras con tilde verde hace punch. Etiquetas: "EN UN TOQUE" → "COMPRA".

**s09-sistema** (6.62 s) — "No hace falta gastar una fortuna. Hace falta un sistema: una web
que trabaje, no que adorne." Una bolsa de plata con "$" que recibe el badge X en "fortuna"
(1.60). En "sistema" (3.10) se va y se dibuja un engranaje que gira con punch. En "trabaje"
(4.60) el engranaje se corre a la derecha con rótulo "TRABAJA" y a la izquierda aparece un
cuadro colgado (marco con un paisajito de líneas) "ADORNA", que se apaga y recibe X en "adorne"
(5.50). Etiquetas: "NO ES UNA FORTUNA" → "ES UN SISTEMA".

**s10-scalerics** (5.68 s) — "En Scalerics hacemos sitios web para comercios. Con tu carta o tu
catálogo, tus precios y tus horarios a la vista." Arriba (y≈680) caja redondeada que se dibuja
con "Scalerics" (Lexend 700 ~60px) en 0.08, debajo "SITIOS WEB PARA COMERCIOS" mono en
"comercios" (1.48). Debajo tres íconos con rótulo: carta/menú (carta 2.68; el rótulo pasa de
"CARTA" a "CATÁLOGO" en 3.38), etiqueta de precio con "$" (precios 4.48), reloj (horarios 4.98).
En "a la vista" (5.38) los tres hacen un golpe a la vez y se marcan en verde. Sin etiqueta.

**s11-boton** (4.51 s) — "Y un botón que termina en pedido: directo a tu WhatsApp, o en tu
tienda online." Arriba un botón verde grande "Hacer pedido" (botón 0.60) que se aprieta en
"pedido" (1.40); de él baja una flecha que se abre en dos ramas: a la izquierda un celular chico
con chat y burbuja verde "Pedido recibido" con rótulo "WHATSAPP" (2.60), a la derecha una bolsa de
compras con tilde y rótulo "TIENDA ONLINE" (3.40). Sin etiqueta: los rótulos (y 1228) hacen de etiqueta.

**s12-cta** (5.60 s) — "Comentá PÁGINA y te contamos cómo." Como `../nadie-te-encuentra/compositions/s12-cta.html`:
"Scalerics" grande, bajada "Sitios web para comercios", píldora crema Comentá "PÁGINA" que entra
en "Comentá" (0.0), golpe en "PÁGINA" (0.59) y pulsos finitos. Sin salida con blur.
