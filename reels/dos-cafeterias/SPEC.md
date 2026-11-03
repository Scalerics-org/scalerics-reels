# Reel "Dos cafeterías" — spec para los que construyen escenas

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (formato motion
persuasivo, línea de Juan del 02-11). Producto: **Scalerics Puntos**. Una sola voz: Orus.

Historia: dos cafeterías iguales en la misma cuadra. A la IZQUIERDA el café de Andrés, sin
sistema: tarjetita de cartón que se pierde, nadie se entera de que Lucía dejó de venir. A la
DERECHA el de Sofía, con Scalerics Puntos: tarjeta en el celular, cada compra suma sola, a Lucía
le llega un aviso ("te extrañamos, tenés un café de regalo"), vuelve el jueves, canjea; Sofía ve
en su panel quiénes son y cada cuánto vienen. Giro respetuoso: Andrés trabaja igual de duro; la
diferencia es que el local de Sofía se acuerda de cada cliente aunque ella esté a mil. Cierre para
compartir: "Mandáselo al dueño de tu café de siempre."

**Recurso visual central: la pantalla partida.** Una línea vertical punteada en x=540 (y 640–1220,
crema 0.3) separa los dos locales. Encabezados fijos de cada mitad a y≈650:
- izquierda (x 270): "ANDRÉS" (Lexend 600 34px, crema 0.5) y debajo "SIN SISTEMA" (mono 24px,
  crema 0.4).
- derecha (x 810): "SOFÍA" (Lexend 600 34px, verde) y debajo "CON PUNTOS" (mono 24px, verde 0.8).
Color con significado: lo que está mal a la izquierda va en crema apagado (0.4) y, solo en los
puntos de dolor (la X, la tarjeta perdida), **rojo apagado `#c0625a`**; lo resuelto, a la derecha,
en verde de marca `#5ce611` (tildes, contador de sellos, notificación). Cuando el beat es de un
solo lado, el otro lado se apaga a 0.3 (no desaparece: la comparación sigue a la vista). s09, s11
y s12 son a pantalla completa (el lado de Sofía "gana" y ocupa todo).

Interfaz recreada en motion: tarjeta de sellos (6 círculos, los llenos en verde), celular con la
tarjeta, notificación, tildes verdes, panel con filas de clientes. Todo texto en pantalla
refuerza lo que se dice para que se entienda sin sonido.

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios: navy casi negro con brillo verde,
subtítulos karaoke Lexend arriba con acentos verdes, logo blanco abajo).

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
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de `#c0625a` (rojo apagado, solo en dolores),
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


## Inicios globales
s01 0 · s02 5.40 · s03 9.20 · s04 16.57 · s05 23.70 · s06 29.01 · s07 34.32 · s08 40.50 ·
s09 44.50 · s10 49.37 · s11 56.55 · s12 60.11 (dura hasta 65.41; la voz termina en 62.21).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-dos-cafes** (0–5.40) — "Dos cafeterías en la misma cuadra. Una sabe quién volvió esta
semana." Dos fachadas de café idénticas (toldo ondulado, cartel "CAFÉ", vidriera, puerta, una taza
dibujada en la vidriera) sobre una misma vereda (línea de suelo y≈1120), centradas en x 270 y
810. Cuadro 0: la izquierda ya medio dibujada. En "cafeterías" se dibuja la derecha. En "cuadra"
aparece la línea divisoria punteada y los encabezados ANDRÉS/SOFÍA. En "Una" la derecha se prende
(vidrios verdes) y la izquierda baja a 0.45. En "volvió" una figurita entra a la puerta de la
derecha y sale una tilde verde arriba; sobre la izquierda aparece un "?" crema apagado. Etiqueta:
"MISMA CUADRA" → "UNA SABE QUIÉN VUELVE".

**s02-diferencia** (5.40–9.20) — "Mismo rubro, misma calle, una sola diferencia." Tabla de
comparación de la serie, dos columnas (x 300 y 780), tres filas: taza = taza (en "rubro",
"=" crema en el medio), cartel de calle = cartel de calle (en "calle"), y en "una sola diferencia"
la tercera fila: a la izquierda una tarjetita de cartón (crema 0.45), a la derecha un celular
chico con tilde (verde), y en el medio un "≠" verde grande con punch. Etiqueta:
"DOS NEGOCIOS" → "UNA DIFERENCIA".

**s03-andres** (9.20–16.57) — El lado de Andrés. Pantalla partida con la derecha apagada (0.3,
fachada de Sofía chica). A la izquierda: Andrés detrás del mostrador (figura de línea con delantal),
en "café" una taza con vapor, en "atención" una sonrisa/globito con tilde crema. En "tarjetita"
pop de una tarjeta de cartón con 6 sellos (2 marcados) grande, en "cartón" se marca otro sello;
en "pierde" la tarjeta se cae girando hacia abajo, se desvanece y queda un contorno punteado
rojo apagado con "?" donde estaba. Etiqueta: "BUEN CAFÉ" → "TARJETA DE CARTÓN" → "SE PIERDE".

**s04-sofia** (16.57–23.70) — El lado de Sofía (izquierda apagada 0.3). Sofía detrás del
mostrador; en "tarjeta" pop de un celular (~300x540) con la tarjeta "CAFÉ DE SOFÍA · TUS SELLOS"
y 6 círculos; en "celular" el celular hace punch; en "compra" un ticket/taza se desliza hacia el
celular y se llena un sello verde con "+1"; en "suma" y "sola" se llenan dos más (contador "4/6"
→ "5/6"). Etiqueta: "TARJETA EN EL CELULAR" → "SUMA SOLA".

**s05-lucia** (23.70–29.01) — "En las dos, Lucía iba todas las mañanas. Hace tres semanas que no
aparece." Pantalla partida completa, en cada mitad la misma figurita de Lucía (pelo recogido, bolso)
en su puerta. En "mañanas" debajo de cada una aparece una tira de días L M M J V con tildes. En
"tres semanas" las dos figuritas se borran y en su lugar queda el contorno punteado, y un
calendario chico en cada lado tacha tres semanas (tres líneas). Etiqueta: "CLIENTA DE SIEMPRE"
→ "TRES SEMANAS SIN VENIR".

**s06-nadie** (29.01–34.32) — Lado Andrés (derecha apagada). Mostrador con fila de figuritas
(clientes) y Andrés sirviendo; en "entera" una libreta/cuaderno con la fila "Lucía ... ?" en crema
apagado; en "lleno" la fila de clientes se agranda (aparecen 2 más con pop), tazas que se apilan;
en "¿quién lleva esa cuenta?" un "?" rojo apagado grande hace pop sobre la libreta. Etiqueta:
"NADIE SE ENTERA" → "¿QUIÉN LLEVA LA CUENTA?".

**s07-aviso** (34.32–40.50) — Lado Sofía (izquierda apagada). Celular de Lucía a la derecha-centro;
en "aviso" baja una notificación verde ("CAFÉ DE SOFÍA"), en "extrañamos" su texto "Te
extrañamos, Lucía", en "regalo" una tarjeta "TENÉS UN CAFÉ DE REGALO" con taza y moño verde.
Etiqueta: "AVISO AUTOMÁTICO" → "CAFÉ DE REGALO".

**s08-vuelve** (40.50–44.50) — Lado Sofía. En "vuelve" Lucía entra caminando a la puerta;
en "canjea" el celular muestra "PREMIO CANJEADO" con tilde verde que se dibuja; en "desayunar"
mesa con taza y medialuna, Lucía sentada. Etiqueta: "VOLVIÓ" → "PREMIO CANJEADO".

**s09-panel** (44.50–49.37) — Pantalla completa: panel de Sofía (laptop de líneas ~780x490).
Arriba "TUS CLIENTES"; filas con avatar, nombre (Lucía, Martín, Ana, Pedro) y una barra de
frecuencia; en "quiénes" entran las filas; en "cuánto vienen" las barras crecen y en la de Lucía
aparece "VOLVIÓ" con tilde verde. Etiqueta: "TU PANEL".

**s10-memoria** (49.37–56.55) — El giro. Pantalla partida: Andrés y Sofía, misma altura, mismas
tazas en la mano; en "igual de duro" gotitas de sudor en los dos y un "=" entre ellos. En
"diferencia" la mitad de Sofía muestra arriba de su local un globo de "memoria": tarjetas de
clientes con tilde verde que se apilan (en "acuerda", "cada", "cliente"). En "a mil" Sofía con
tres tazas en las manos (brazos que se mueven) y la memoria sigue sumando tildes. Etiqueta:
"IGUAL DE DURO" → "SE ACUERDA POR VOS".

**s11-puntos** (56.55–60.11) — Pantalla completa. En "Scalerics Puntos" pop del celular con la
tarjeta "SCALERICS PUNTOS" y los 6 sellos que se llenan en cascada; en "tu local" se dibuja
alrededor una fachada de local genérica con cartel "TU LOCAL". Etiqueta: "SCALERICS PUNTOS".

**s12-cta** (60.11–65.41) — "Mandáselo al dueño de tu café de siempre." A la izquierda un celular
con un botón verde "Mandar"; en "dueño" sale un avión de papel verde por un arco hasta la fachada de
un café a la derecha; en "café" se prende su vidriera verde; en "siempre" aparece una tilde verde
arriba del café que flota hasta el final, y el botón late. Etiqueta: "MANDÁSELO" → "A TU CAFÉ DE
SIEMPRE".
