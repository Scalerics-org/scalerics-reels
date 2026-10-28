# Reel "Tu memoria" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos y tiendas online para comercios). Le dice al dueño al que le va bien que si el
negocio funciona porque él se acuerda de todo, no funciona: lo que se olvida no hace ruido, y el
día que se enferma nadie sabe nada. Cierra con todo Scalerics (bot que contesta y agenda, Puntos
que se acuerda de cada cliente y avisa si deja de venir, tienda que toma pedidos) y "Comentá
MEMORIA". Locución de 56.8 s (voz Orus), escenas en `tiempos.md`.

Recurso central del reel: **la cabeza del dueño de perfil** (mirando a la derecha, trazo crema)
con **cajitas apiladas adentro** (bolsa = pedido, calendario = turno/mañana, burbuja = mensaje,
persona = cliente; íconos verdes, rayitas tenues de "texto"). Es el único lugar donde vive el
negocio. Path de la cabeza (coordenadas locales, se ubica con x/y en el grupo):
`M-110 280 C-110 210 -190 170 -200 60 C-215 -120 -100 -270 60 -270 C190 -270 270 -180 272 -70 L276 -40 L318 30 Q324 44 306 48 L282 52 L288 80 L278 92 L286 108 L278 122 Q284 160 250 168 L190 174 Q160 186 160 280`
Cuando aparece Scalerics, las cajitas salen de la cabeza a un sistema (engranaje, celulares).

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


Ojo: animar con GSAP un `<g>` que tiene `transform="translate(..)"` pisa el atributo: envolvé el
`<g>` animado en otro que tenga el translate (así quedó s01).

## Escenas (palabras y tiempos en `tiempos.md`)

### s01-no-funciona (5.30 s)
La cabeza arranca medio dibujada (cuadro 0 visible). Con "porque", "vos", "acordás", "todo" caen
cuatro cajitas que forman una torre torcida adentro de la cabeza. "no funciona": badge X verde
arriba a la derecha de la cabeza y sacudón. "Funciona de casualidad": la torre se tambalea.
Etiqueta: TODO EN TU CABEZA → DE CASUALIDAD.

### s02-no-es (4.28 s)
Tres íconos en fila: reloj de arena (LA EDAD, "edad" 0.90), rayo/zigzag (EL ESTRÉS, "estrés" 1.70),
papeles revueltos (EL DESORDEN, "desordenado" 3.00). Cada uno se dibuja y recibe badge X en su
palabra; el anterior se apaga a 0.4. Etiqueta: NO ES ESO.

### s03-cabeza (4.39 s)
Un local (toldo, vidriera, puerta) grande al centro en "negocio" (0.62), late en "entero".
"guardado" (1.32): se achica y se mete en el lugar del cerebro mientras la cabeza se dibuja
alrededor ("un solo lugar" 2.02-2.42). "cabeza" (3.22): punto/candado verde, golpe.
Etiqueta: UN SOLO LUGAR → TU CABEZA.

### s04-pendientes (4.35 s)
Cabeza más grande (o centrada) con tres tarjetas legibles que entran de a una y la cabeza se
llena: "pidió" (0.13) tarjeta bolsa "PEDIDOS"; "debés" (1.53) burbuja "SIN RESPONDER"; "mañana"
(3.43) calendario "MAÑANA". La cabeza se infla un poco con cada una. Etiqueta acompaña.

### s05-la-senora (2.98 s)
Señora (figurita con rodete y cartera) a la izquierda; a la derecha una grilla de sábados (SÁB):
fila de arriba con tildes verdes rápidos en "todos los sábados" (0.78-1.38), fila de abajo vacía
en "hace un mes" (1.98); la señora se apaga a 0.3 en "aparece" (2.58).
Etiqueta: TODOS LOS SÁBADOS → HACE UN MES.

### s06-sin-ruido (6.80 s)
"Lo que se te olvida no hace ruido" (0-2.0): campanita grande, en "ruido" (2.00) una línea verde
la tacha. "El mensaje sin contestar no te avisa" (2.84-4.20): la campana sube chica y aparece un
celular a la izquierda con un mensaje de cliente sin respuesta (puntitos, sin tilde). "El cliente
que dejó de venir, tampoco" (5.11-6.60): a la derecha una figurita se aleja de una puerta y se
desvanece. Etiqueta: NO HACE RUIDO → NO TE AVISA.

### s07-enfermas (4.10 s)
"enfermás" (1.40): cabeza con termómetro en la boca, mercurio verde que sube; la cabeza se apaga.
"nadie sabe" (2.30-3.20): tres figuritas con signos "?" verdes que se balancean.
Etiqueta: TE ENFERMÁS → NADIE SABE NADA.

### s08-sistema (3.71 s)
"memoria" (0.70): cabeza a la izquierda llena de cajitas, tilde verde. "sistema" (2.30): a la
derecha un engranaje grande que gira; las cajitas viajan de la cabeza al engranaje.
Etiqueta: TE FALTA UN SISTEMA.

### s09-bot (6.11 s)
"Scalerics" (0.09): caja de marca (como el-de-enfrente s10), "comercios" (1.39) bajada. En "bot"
(2.59) la caja sube y se va; celular con chat: cliente "¿Tenés turno mañana?", "contesta"
(3.59) respuesta verde al instante, "agenda" (4.59) tarjeta de turno con tilde.
Etiqueta: BOT DE WHATSAPP.

### s10-puntos (4.98 s)
Celular con Scalerics Puntos: ficha de clienta (Marta, "viene los sábados", tarjeta de sellos).
"acuerda" (1.68) tilde y sellos; "aviso" (3.88) notificación que sale hacia la clienta:
"Marta, tenés un premio esperándote". Etiqueta: SCALERICS PUNTOS → AVISO SOLO.

### s11-tienda (4.20 s)
Celular con tienda (dos productos, botón verde Comprar). "toma los pedidos" (1.90-2.40): tickets
de pedido que se apilan al costado con tilde. "vende sola" (2.90-3.30): monedas a la bolsa.
Etiqueta: TIENDA ONLINE → VENDE SOLA.

### s12-cta (8.77 s)
"Y tu cabeza queda libre" (0-0.90): cabeza vacía, liviana. "crecer" (1.80): una plantita verde
crece adentro. "Comentá" (3.11): la cabeza se va y entra el cierre como el-de-enfrente s11:
Scalerics + bajada + píldora "Comentá MEMORIA". Sin salida: último cuadro quieto.
