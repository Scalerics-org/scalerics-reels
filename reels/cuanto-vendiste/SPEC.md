# Reel "¿Cuánto vendiste ayer?": spec

Reel vertical 1080x1920 de Scalerics, ~43 s (voz Orus de 39.9 s). Producto: **sistema a medida
con reportes** (ventas del día, lo que más sale, quién compra, caja y stock en un panel, y el
resumen que llega solo al celular a la mañana). Público: dueños de pymes. Formato del punto 6 de
CLAUDE.md: **tipografía cinética de marca**. Gancho en el segundo 0: "¿Cuánto vendiste ayer? Si
tenés que calcularlo, seguí mirando." El dueño queda bien parado: sabe su negocio de memoria
(el cliente de los sábados, lo que sale cuando llueve); lo que le falta es el número a mano sin
sentarse a sumar tickets. Giro final: "Vos ya sabés tu negocio. Ahora tenés el número." y el
número aparece (callback del gancho). Cierre: "Mandáselo al que todavía suma tickets el domingo
de noche."

## Recurso visual central
**El número.** En s01 es un monto gris que no para de cambiar (`$ ??.???` con dígitos que ruedan:
hay que calcularlo). En s07 aparece en verde en el panel (`$ 48.250`), en s08 llega al celular y
en s09 cae gigante en verde: ya está. **Color con significado:** gris `#7c8698` = lo que hay que
calcular, lo pendiente, los papeles (tickets, calculadora, cuaderno, Excel); verde `#5ce611` = lo
que ya está resuelto (el dato, los tildes, "a medida", el panel). Crema y blanco = la voz del reel.

## ESTILO: tipografía cinética de marca (manda sobre SPEC-base donde choque)
- Palabras ENORMES (Lexend 800-900, mayúsculas, letter-spacing -0.02em) que entran en la palabra
  exacta en que se dicen: golpe de escala (1.25-1.6 → 1, 0.18-0.25 s, power4.out), entradas
  desde abajo con back.out, lo anterior se apaga a opacity 0.25-0.35 o se va arriba. Ritmo de
  `reels/vagos`, pero SOBRIO: sin sacudones fuertes (a lo sumo 3 tweens de 8 px en el golpe más
  importante), sin rotaciones mayores a 3 grados, sin glitch, sin brillos rojos.
- Elementos de líneas crema (stroke 5, round) que se dibujan con `dibujar()`: el ticket, la
  calculadora, el cuaderno, la planilla, el reloj, el ojo, la cinta métrica, el panel, el celular.
- **Sin subtítulos karaoke**: el texto gigante ES el subtítulo (cada frase dicha está en pantalla,
  entera o casi entera), así no se duplica. `reel.json` lleva `"subtitulos": false` y el
  `armar.mjs` local no arma `subtitulos.html`. Se entiende sin sonido.
- Paleta (SOLO estos): navy de fondo (lo pone el index, igual que el molde), crema `#efeee5`,
  blanco `#ffffff` (lo más fuerte), verde de marca `#5ce611`, gris pendiente `#7c8698`. Sin
  degradés en las escenas, sin emojis, sin fotos, sin rayas largas en textos visibles.
- Letra: Lexend para todo lo grande; IBM Plex Mono 500 para etiquetas, montos y UI.
- **Zona**: como no hay subtítulos, el contenido va entre y 380 y y 1600. El logo de Scalerics
  está en y ~1746 (no taparlo). Etiqueta mono verde (28 px, letter-spacing 0.34em) en top 400.
- `compositions/ambiente.html`: grilla de puntos crema muy tenue que deriva despacio, viñeta navy
  en los bordes y un destello verde suave (opacity 0.13) en "panel" (26.1 s) y "número" (36.2 s).
  El `armar.mjs` local la pone DEBAJO de las escenas (si va encima, `check` marca el texto como tapado).

## Escenas (tiempos relativos en tiempos.md)
- **s01-ayer** (0-4.62): cuadro 0 con "¿CUÁNTO" ya entrando. "¿CUÁNTO / VENDISTE / AYER?" en
  blanco gigante (el "?" verde), golpe en cada palabra (0.30, 0.60, 0.90). En "Si" (1.86) la
  pregunta sube y se achica; aparece el monto gris `$ ??.???` en mono enorme con dígitos que ruedan
  (determinista) y "SI TENÉS QUE CALCULARLO," en gris. En "seguí" (2.80) "SEGUÍ MIRANDO." en verde
  cae de golpe. Etiqueta: "Pregunta simple".
- **s02-memoria** (4.62-9.70): "VOS SABÉS / TU NEGOCIO / DE MEMORIA." (memoria en verde: lo que el
  dueño ya tiene). En "Sabés" (1.94) sube arriba en chico; abajo dos tarjetas de líneas: un
  calendario con "SÁB" marcado en verde (en "sábados" 3.28) con "EL CLIENTE DE LOS SÁBADOS", y una
  nube con gotas (en "vende" 4.28, gotas en "llueve" 4.78) con "LO QUE SALE CUANDO LLUEVE".
- **s03-sumar** (9.70-16.98): "PERO PARA EL / NÚMERO EXACTO," (número exacto en gris) y "HAY QUE
  SENTARSE." en "sentarse" (2.50). En "tickets" (3.60) el texto se va arriba en chico y entra una
  grilla 2x2 de objetos de líneas grises con su palabra gigante debajo: TICKETS (3.60), LA
  CALCULADORA (4.40), EL CUADERNO (5.60), EL EXCEL (6.50). El ticket se desenrolla, la calculadora
  tipea, el cuaderno se abre, la planilla se llena de celdas.
- **s04-a-ojo** (16.98-20.23): reloj de líneas que marca las once con "23:00" mono; "A LAS ONCE /
  NO DA PARA SUMAR," (sumar en gris). En "decide" (1.92) "SE DECIDE / A OJO." blanco y un ojo de
  líneas que se dibuja (pupila verde que mira de un lado al otro).
- **s05-preguntas** (20.23-23.71): tres preguntas que caen una por línea: "¿QUÉ SE VENDIÓ MÁS?"
  (0.00), "¿A QUIÉN?" (0.96), "¿CUÁNTO QUEDÓ EN CAJA?" (1.94); debajo de cada una un casillero
  gris punteado con "calculando..." mono gris. Etiqueta: "Sin el dato".
- **s06-panel** (23.71-26.96): "HACEMOS / SISTEMAS / A MEDIDA" (a medida en verde, con una cinta
  métrica verde que se dibuja debajo en "medida" 0.89). En "ponen" (1.69) el texto sube y se
  dibuja el marco del panel; en "panel" (2.39) "TODO EN UN PANEL." y el panel hace pop.
- **s07-datos** (26.96-31.00): el panel grande (y 560-1500) se llena: arriba un título gigante que
  cambia en cada frase (VENTAS DEL DÍA · LO QUE MÁS SALE · QUIÉN TE COMPRA · CAJA Y STOCK) y en el
  panel: tarjeta "Ventas de ayer $ 48.250" (0.00), barras que crecen con "Yerba 1 kg" primera
  (1.04), "Laura P. · 3 compras esta semana" (2.21), "Caja cerrada ✓" (3.26) y "Stock: 2 para
  reponer" (3.84). Todo lo resuelto en verde. (Montos de ejemplo, no estadística.)
- **s08-celular** (31.00-34.30): "A LAS OCHO," arriba; celular de líneas con "08:00" en la pantalla
  bloqueada; en "llega" (1.70) baja la notificación "Resumen de ayer: Ventas $ 48.250 · Más
  vendido Yerba 1 kg · Caja cerrada"; en "solo" (1.90) "TE LLEGA SOLO." en verde abajo.
- **s09-numero** (34.30-36.91): "VOS YA SABÉS / TU NEGOCIO." crema; en "Ahora" (1.29) "AHORA TENÉS
  EL NÚMERO:" y en "número" (1.90) `$ 48.250` gigante en verde cae de golpe (rueda y frena).
- **s10-cta** (36.91-43.05): mini panel resuelto arriba (gráfico y tildes verdes); "MANDÁSELO /
  AL QUE TODAVÍA / SUMA TICKETS / EL DOMINGO DE NOCHE." entrando por frase (suma tickets en gris,
  con un ticket gris al lado). Queda ~3 s quieto con movimiento suave (el gráfico late).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá hay texto gigante, gris pendiente y la zona es y 380-1600 porque no hay
> subtítulos). Valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

