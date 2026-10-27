# Reel "Descuentos" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics Puntos (app de puntos/fidelización para comercios
uruguayos): "hacer descuentos es la forma más cara de vender". Narrado por una locución rápida
(49 s, cortes secos). Mismo estilo que los dos reels ya aprobados: `../puntos-que-vuelven/` y
`../bot-whatsapp/` (mirá sus escenas en `compositions/` como ejemplos de cómo se resolvieron
locales, figuritas, monedas, celulares, badges, splits, la caja de marca y el CTA) y la
referencia (`../../referencias/puntos-ig/hoja1.png`, `hoja2.png`, `hoja3.png`).

Como el reel es más rápido y polémico, el movimiento es más seco: entradas con golpe
(power3.out / back.out), cambios EN la palabra, nada de tramos lentos.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-caro.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()` y `pop()` y tono visual.** Define la etiqueta de precio con "%",
  las monedas verdes con "$" y el local chico con su "%" colgando: reusalos.

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
s02 4.72 · s03 9.86 · s04 15.80 · s05 21.85 · s06 23.57 · s07 27.23 · s08 32.72 · s09 35.64 ·
s10 37.56 · s11 43.72 · s12 46.96 (dura hasta 52.00; la voz termina en 48.85)

Tiempos por palabra de cada escena: `tiempos.md`.

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s02-dos-por-uno** (5.14 s) — "Pensalo. Ponés un dos por uno, el local se llena, y a la semana
siguiente, vacío." Un local de líneas grande (como el café de
`../puntos-que-vuelven/compositions/s01-mismo-cafe.html`) con un cartel colgado "2x1" en verde
que entra con golpe en "dos por uno" (1.27). En "llena" (2.59) entran rápido 6-7 figuritas y se
prenden las vidrieras (relleno verde como s01-mismo-cafe). En "semana siguiente" (3.34) un
calendario chico arriba a la derecha pasa hojas ("+7 DÍAS"); en "vacío" (4.33) las figuritas ya
no están, las luces se apagan y el local queda en crema 0.4. Etiquetas: "2x1" → "UNA SEMANA
DESPUÉS".

**s03-quien-vino** (5.94 s) — "¿Quién vino? El que busca ofertas. Y el que busca ofertas no es
tuyo. Es del próximo descuento." En "Quién vino" un signo de pregunta grande se dibuja. En
"busca ofertas" (1.43) se transforma en una figurita con una lupa que tiene un "%" adentro
(verde). En "no es tuyo" (3.43) aparece a la izquierda tu local apagado y la figurita le da la
espalda; en "próximo descuento" (4.71) a la derecha aparece otro local con una etiqueta "-40%"
verde y la figurita camina hacia él. Etiquetas: "CAZADOR DE OFERTAS" → "DEL PRÓXIMO
DESCUENTO".

**s04-de-siempre** (6.05 s) — "Mientras tanto, al cliente de siempre, el que pagaba precio
lleno, le cobraste menos por algo que iba a comprar igual." Una figurita con la flecha circular
de "vuelve" (como s01-mismo-cafe) sobre la cabeza = el cliente de siempre (en "cliente de
siempre" 1.13). Al lado, un ticket de líneas con "$ 400" en "precio lleno" (2.74). En "cobraste
menos" (3.71) una línea verde tacha el 400 y abajo aparece "$ 200"; un par de monedas se caen
del ticket. En "iba a comprar igual" (4.83) aparece encima de la figurita un globo con un tilde
(ya lo iba a comprar). Etiquetas: "PRECIO LLENO" → "IBA A COMPRAR IGUAL".

**s05-dos-veces** (1.72 s, corta y con golpe) — "Perdiste plata dos veces." Dos monedas verdes
grandes una al lado de la otra que caen con golpe en "plata" (0.45) y "dos" (0.70), y un "x2"
verde grande (Lexend 700 ~140px) entre/arriba de ellas en "veces" (0.87) con punch. Etiqueta
"DOS VECES". Salida seca.

**s06-viven** (3.66 s) — "Los que más venden no viven del descuento. Viven de que vuelvas." Un
edificio/local grande de líneas (una cadena). En "no viven del descuento" (0.83–1.39) una
etiqueta "%" chica se le acerca y le cae el badge X verde; se va. En "Viven de que vuelvas"
(2.26) se dibuja alrededor del local una flecha circular verde grande (la de "vuelve") que gira
con figuritas entrando. Etiquetas: "SIN DESCUENTOS" → "VIVEN DE QUE VUELVAS".

**s07-no-es-lo-mismo** (5.49 s) — "No es lo mismo. El descuento le regala plata a cualquiera. El
premio se lo da solo al que vuelve." Pantalla partida con línea vertical verde (como
`../puntos-que-vuelven/compositions/s06-cuesta.html`). En "No es lo mismo" se dibuja la línea.
Izquierda (en "descuento" 1.30): la etiqueta "%" de s01 que tira monedas hacia 4 figuritas
distintas con "?" en la cabeza (CUALQUIERA, en "cualquiera" 2.63). Derecha (en "premio" 3.68):
una caja de regalo con moño verde que va a UNA figurita con la flecha de "vuelve" (en "solo al
que vuelve" 4.34). Rótulos debajo de cada lado: "DESCUENTO" / "PREMIO" (mono 26px, crema y
verde). Sin etiqueta central.

**s08-caja** (2.92 s) — "Uno te vacía la caja. El otro te llena el local." Dos beats. "vacía la
caja" (0.27): una caja registradora de líneas con el cajón que se abre y monedas que salen y
desaparecen; el cajón queda vacío. "llena el local" (1.86): la caja se va y aparece un local
que se llena de figuritas con las vidrieras que se prenden en verde. Etiquetas: "VACÍA LA CAJA"
→ "LLENA EL LOCAL".

**s09-marca** (1.92 s) — "Por eso hicimos Scalerics Puntos." Copiá
`../puntos-que-vuelven/compositions/s08-marca.html` (caja redondeada con "Scalerics" crema +
" Puntos" verde) y ajustá a esta duración y tiempos: "Scalerics" 0.62, "Puntos" 1.08. Al final
sale con blur.

**s10-como-anda** (6.16 s) — "Tu cliente suma con cada compra, canjea premios que a vos te
cuestan poco, y vuelve porque le falta poco para el próximo." Un celular de líneas con la
tarjeta de puntos del cliente (inspirate en `../puntos-que-vuelven/compositions/s03-sabe-quien.html`
y s09-como-anda): nombre "Lucía", "450 PTS" grande. En "suma" (0.48) entra "+120" verde y el
número sube 330→450. En "canjea premios" (1.78) aparece una fila de premio "Café gratis · 300
PTS" con un botón "CANJEAR"; a un costado, fuera del celular, una nota chica mono "A VOS TE
CUESTA $40" en "te cuestan poco" (2.93). En "le falta poco para el próximo" (4.60) una barra de
progreso verde casi llena con "TE FALTAN 50 PTS". Etiquetas: "SUMA" → "CANJEA" → "LE FALTA
POCO".

**s11-desconocidos** (3.24 s) — "Dejá de pagarle a desconocidos para que vengan una sola vez."
Una mano/billetera a la izquierda de la que salen monedas hacia una fila de figuritas sin cara
con "?" (desconocidos, 0.88). En "vengan una sola vez" (1.88–2.58) las figuritas entran a un
local por una puerta y salen por el otro lado y se van, y aparece un "1" o "1 VEZ" verde con
punch. Etiqueta: "UNA SOLA VEZ".

**s12-cta** (5.04 s) — "Comentá PUNTOS y te contamos cómo." (la voz termina en 1.89). Copiá
`../puntos-que-vuelven/compositions/s12-cta.html` y ajustá tiempos ("Comentá" 0.00, "PUNTOS"
0.44) y duración. Debajo del nombre, en vez de su subtítulo: "Premios en vez de descuentos"
(Lexend 500 34px, crema 0.7). NO hagas la salida con blur: es el último cuadro, tiene que
quedar quieto y legible al final.
