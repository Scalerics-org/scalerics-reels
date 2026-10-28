# Reel "Clientes fantasma" (especial Halloween): spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, apps de
puntos y tiendas online para comercios) para Halloween. La idea: tu local está lleno de
"fantasmas", clientes que vinieron una vez y desaparecieron sin avisar ("te ghostearon"), y vos ni
te enteraste. Lo que da miedo es que tu competencia sí los tiene anotados. Cierre: Scalerics
Puntos los hace volver (puntos en el celular + aviso cuando dejan de venir) y el bot contesta a
las 3 de la mañana. Locución de 54 s. Mismo estilo que los reels aprobados:
`../el-de-enfrente/`, `../puntos-que-vuelven/`, `../bot-whatsapp/`, `../descuentos/` (mirá sus
escenas en `compositions/`).

Recurso central: **el fantasma**. Un cliente que se fue = una sábana de líneas crema con dos ojos
(está definida en s01, clase `s01-fan`; copiala TAL CUAL: path
`M-45 50 V-10 A45 45 0 0 1 45 -10 V50 l-15 -14 l-15 14 l-15 -14 l-15 14 l-15 -14 l-15 14 Z`
centrado en 0,0, ojos = dos elipses crema rellenas rx 6 ry 9 en ±15,-8). Los fantasmas van en
crema con opacity 0.5–0.6 y flotan (y ±10, sine.inOut, yoyo con repeat FINITO). Un cliente que
está o vuelve = la figurita sólida de palitos de s01 (crema 1, con verde cerca: tilde, puntos).
El toque de Halloween va en el dibujo (fantasmas, luna, murciélagos de líneas, calabaza,
reloj 3:00): **sin naranja ni violeta**, sigue habiendo un solo acento verde.

Movimiento: entradas con golpe (power3.out / back.out), cambios EN la palabra; lo fantasmal se
mueve lento y flotando.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy, la locución, el logo abajo y los efectos.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda (y 236 a ~500). **Las
  escenas NO escriben la frase narrada.**
- `compositions/s01-fantasmas.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()`, el fantasma, el local y la figurita.**

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 57.09 (la voz termina en
53.89). Algunos tiempos de palabras sueltas son interpolados (±0.2 s): si una palabra corta da
raro, poné el cambio en el arranque de la frase.

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s02-no-es** (3.30 s): "No se murieron. Ni se mudaron. Ni se quedaron sin plata." Tres íconos
en fila (y≈900), cada uno con su badge X verde al aparecer (como
`../bot-whatsapp/compositions/s02-no-es.html`): una lápida con "RIP" (murieron 0.60), una caja de
mudanza con flechita (mudaron 1.60), una billetera abierta vacía con "$" (arrancala en "quedaron"
2.70). Un fantasmita chico arriba que se ladea en cada X. Etiqueta "NO ES ESO".

**s03-ghosteo** (5.70 s): "Te ghostearon. Como en una cita: vinieron, les gustó, y
desaparecieron sin avisar." En "ghostearon" (0.70) un celular (centro, ~360x640, y 640–1240)
con un chat: tu burbuja crema "¿Volvés pronto?" con doble tilde y debajo "Visto" en mono; un
fantasma asoma por el costado del celular con punch. Etiqueta "TE GHOSTEARON". En "cita" (2.20)
el celular se achica y se corre a la izquierda y a la derecha aparece una figurita con un corazón
de líneas verde arriba (vinieron 2.82; les gustó 3.60: el corazón late). En "desaparecieron"
(4.32) la figurita se convierte en fantasma (cross-fade figurita → fantasma a opacity 0.5) y se
va flotando hacia arriba hasta desvanecerse; el corazón se apaga a crema 0.3. Etiqueta "SIN
AVISAR".

**s04-ni-cuenta** (7.10 s): "Y lo peor es que ni te diste cuenta. No sabés cómo se llaman, ni su
teléfono, ni cuándo vinieron por última vez." Primero (0–2.9) tu local con vos (figurita) en la
puerta mirando para el otro lado mientras por detrás pasan 2 fantasmas flotando; en "cuenta"
(2.10) un "?" crema sobre tu cabeza. Etiqueta "NI TE ENTERASTE". Después (2.98–7.0) se reemplaza
por una ficha de cliente (rectángulo redondeado ~640x460 centrado) con tres renglones que
aparecen en su palabra: "NOMBRE" + "???" (llaman 3.80), "TELÉFONO" + "???" (teléfono 4.70),
"ÚLTIMA VEZ" + "???" (cuándo 5.80); los "???" en verde. Un fantasma chico asoma por la esquina de
la ficha. Etiqueta "NO SABÉS NADA".

**s05-tres-am** (6.90 s): "Y a las tres de la mañana, alguien te escribió preguntando un precio.
Nadie le contestó. Otro fantasma." Arriba a la derecha una luna creciente de líneas y 2
murciélagos chicos de líneas que cruzan. Un reloj digital "3:00" en verde (tres 1.00, mañana
1.50). En "escribió" (2.40) un celular (como s03) con la burbuja del cliente "¿Precio?" que entra
con pop (precio 3.30). En "Nadie le contestó" (4.15–4.60) tres puntitos que aparecen y se apagan
sin respuesta y el celular baja a 0.4. En "Otro fantasma" (5.67–5.80) la burbuja se transforma en
fantasma (cross-fade) que flota hacia arriba. Etiquetas "3 DE LA MAÑANA" → "SIN RESPUESTA" →
"OTRO FANTASMA".

**s06-miedo** (5.73 s): "Lo que da miedo de verdad no es que se vayan. Es que tu competencia sí
los tiene anotados." En "miedo" (0.50) 3 fantasmas salen de tu local (izquierda, x≈270, apagado
0.4, cartel "TU LOCAL") flotando hacia la derecha ("se vayan" 1.90). En "competencia" (3.10) se
dibuja el local de enfrente (derecha, x≈810, ventanas verdes, cartel "ENFRENTE") y los
fantasmas, al llegar, se convierten en figuritas sólidas. En "anotados" (4.60) aparece arriba del
local de enfrente un anotador con 3 renglones y 3 tildes verdes que se dibujan uno tras otro.
Etiquetas "DA MIEDO" → "ÉL LOS TIENE ANOTADOS".

**s07-sistema** (2.51 s): "No es mala suerte. Es no tener un sistema." Un gato negro de líneas
(sentado, cola en curva, ojos verdes) que de entrada (0.1) recibe el badge X verde; en "no tener"
(1.07) se va y se dibuja el engranaje que gira con punch en "sistema" (1.67) (como
`../puntos-que-vuelven/compositions/s07-sistema.html`). Escena corta: entradas rápidas (0.25 s).
Etiquetas "NO ES MALA SUERTE" → "ES UN SISTEMA".

**s08-puntos** (7.40 s): "En Scalerics hacemos que vuelvan: cada compra suma puntos en el
celular, y si alguien deja de venir, le llega un aviso." Arriba (y≈660) una caja redondeada con
"Scalerics" (Lexend 700 ~60px) en "Scalerics" (0.36). En "vuelvan" (1.56) un fantasma a la
izquierda se convierte en figurita sólida (cross-fade) con una flecha circular verde. En "cada
compra" (2.39) un celular (derecha) con una tarjeta de puntos: "+10" verde que sube en "suma
puntos" (2.96–3.26) y un total que pasa de 40 a 50. En "deja de venir" (5.06) la figurita se
vuelve fantasma otra vez y en "le llega un aviso" (6.04–6.56) cae una notificación verde al
celular, "Te extrañamos: café de regalo" (Lexend ≥24px), y el fantasma vuelve a ser figurita.
Etiquetas "HACEMOS QUE VUELVAN" → "PUNTOS EN EL CELULAR" → "AVISO AUTOMÁTICO".

**s09-bot** (4.96 s): "Y el bot de WhatsApp contesta a las tres de la mañana, con tus precios."
La revancha de s05: el mismo celular de noche (luna chica arriba, reloj "3:00" verde), burbuja
crema del cliente "¿Precio?"; en "bot" (0.26) aparece un ícono de bot chico (cabeza redonda con
antena) arriba del celular; en "contesta" (1.38) entra la respuesta verde "$ 290 · ¿Te lo
guardo?" con punch; en "precios" (3.76) una segunda burbuja verde "Abrimos a las 9" o un tilde
grande. Nada se vuelve fantasma. Etiquetas "EL BOT CONTESTA" → "CON TUS PRECIOS".

**s10-halloween** (3.44 s): "Este Halloween, que los únicos fantasmas sean los disfraces." En
"Halloween" (0.20) se dibuja una calabaza de líneas (crema; ojos y boca triangulares rellenos de
verde) al centro-izquierda, con 2 murciélagos que pasan. En "fantasmas" (1.60) un fantasma flota
a la derecha; en "disfraces" (2.40) la sábana sube y se desvanece y debajo queda una figurita
sólida con una bolsita de compras (era un cliente disfrazado), con un pop. Etiqueta "FELIZ
HALLOWEEN".

**s11-cta** (5.35 s): "Comentá FANTASMA y te contamos cómo." (la voz termina en 2.15). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande (Lexend 700 ~110px, crema)
centrado en y≈860, debajo "Bots · Puntos · Tiendas para comercios" (Lexend 500 34px, crema 0.7),
y la píldora crema con texto navy #0B1D35: Comentá "FANTASMA", que entra con pop en "Comentá" y
hace un pulso suave cada ~1.2 s (tweens finitos). Un fantasmita chico asoma detrás de la píldora
y se mece una vez. NO hagas la salida con blur: es el último cuadro.
