# Reel "La pregunta de siempre" · spec

Reel vertical 1080x1920 de Scalerics, formato **consejo de colega con un ejercicio concreto**
(línea de Juan del 02-11: consejo de gestión para pymes donde Scalerics aparece solo al final).
Tema: delegar. Gancho: "La pregunta que más te hace tu equipo dice qué tenés que ordenar
primero." El ejercicio: una semana, un palote en un anotador por cada pregunta del equipo. Las
preguntas las dicen las voces del equipo: la cajera (Leda, colita) "¿Cuánto le cobro a este?" y
"¿Dónde está el pedido de la señora?"; el del depósito (Charon, gorra) "¿Esto ya se pagó?" y "¿Hay
de esto en el depósito?". El sábado los palotes se amontonan en unas pocas preguntas. La lectura
(giro): el equipo pregunta bien; pregunta porque la respuesta vive en un solo lugar, el dueño, y
por eso le cuesta irse aunque sea una tarde. Lo primero para ordenar es la de más palotes:
escribirla, armar la lista de precios, que el sistema diga qué se pagó y qué hay en el depósito.
Scalerics una sola vez: sistemas a medida para que esas respuestas estén a mano de todo el
equipo. Remate: la semana siguiente la hoja queda casi en blanco. Cierre: "Contanos en los
comentarios: ¿cuál es la pregunta que más te hacen a vos?". Cuatro partes de Orus (narrador,
firma) + dos de Leda + dos de Charon, 63.8 s de voz (Orus con atempo 1.06).

Recurso visual central: **el anotador** (`compositions/anotador.html`), una capa propia que
`armar.mjs` monta encima de las escenas de "Probá" (4.65 s) a "Ojo" (28.24 s)
(`reel.json` → `anotador: [14, 72]`). Hoja crema de anotador con anillos arriba, título mono
PREGUNTAS DE LA SEMANA y los días LUN MAR MIÉ JUE VIE SÁB (el día que corre se marca con un
círculo verde). Seis renglones; la pregunta se escribe en el renglón cuando alguien la dice y un
lápiz va haciendo PALOTES (grupos de 4 rayas y la quinta cruzada), de a uno en la semana y en
ráfaga el sábado. Renglones y totales finales (ilustrativos, no se dicen): ¿Cuánto le cobro? 17 ·
¿Ya se pagó? 14 · ¿Dónde está el pedido? 12 · ¿Hay en el depósito? 11 · ¿Me cambiás el turno? 2
· ¿Viene el técnico? 1.
- Geometría (global): hoja x 130–950, y 588–1078; renglones de 68 px desde y 660; etiquetas en
  x 170; palotes desde x 585, cada 12 px, grupo cada 64 px.
- 4.65–22.96: la hoja arriba, las escenas dibujan al equipo (bustos) en y 1110–1245.
- "sábado" (22.96): la hoja baja y crece (escala 1.1, centro y≈893), ráfaga de palotes; en
  "amontonan" los renglones 5 y 6 se apagan; en "pocas" un recuadro verde se dibuja alrededor de
  los cuatro primeros.

Color con significado (manda sobre el "un solo acento" de la base): las preguntas y los palotes
en crema; lo que depende de la cabeza del dueño en rojo apagado `#c0625a` (la cabeza con las
respuestas adentro, los globos que lo frenan en la puerta); lo resuelto en verde `#5ce611`
(tildes, la lista de precios, el sistema, la hoja casi en blanco). Personajes en crema: la
cajera (colita), el del depósito (gorra) y el dueño (pelo corto y bigote).

Las escenas se generaron con un armador común (helpers `dibujar()`, `pop()`, `latir()`, `etq()`),
la misma estructura que s01.

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


## Escenas (tiempos relativos en tiempos.md)
1. **s01-gancho** (0–4.65): mostrador; el dueño al centro, la cajera a la izquierda y el del
   depósito a la derecha (arranca medio dibujado). Globos "?" que salen del equipo y rodean la
   cabeza del dueño en "pregunta", "equipo", "dice", "qué", "tenés"; en "ordenar" los globos se
   alinean en fila arriba; en "primero" el primero se pone verde y late. Etiqueta TU EQUIPO
   PREGUNTA → ¿QUÉ ORDENO PRIMERO?
2. **s02-anotador** (4.65–10.87): entra la capa del anotador (se dibuja en "Probá", días en
   "semana"). Abajo los bustos de la cajera y del depósito en "equipo"; en "pregunta" un globo "?"
   sale de la cajera y en "palote" vuela a la hoja; el lápiz aparece en "palote". Etiqueta UNA
   SEMANA → UN PALOTE POR PREGUNTA.
3. **s03-lunes** (10.87–14.94): LUN en verde (capa). La cajera salta con su globo "?" en
   "¿Cuánto" (renglón 1 + palotes), el del depósito en "¿Esto" (renglón 2). Etiqueta LUNES.
4. **s04-martes** (14.94–22.96): MAR y MIÉ; los dos globos se alternan en "Vuelven las mismas";
   cajera en "¿Dónde" (renglón 3), depósito en "¿Hay" (renglón 4); JUE y VIE al final. Etiquetas
   MARTES → MIÉRCOLES → LAS MISMAS → JUEVES · VIERNES.
5. **s05-sabado** (22.96–28.24): la hoja grande, ráfaga de palotes; renglones 5 y 6 apagados en
   "amontonan", recuadro verde en "pocas". La escena solo pone la etiqueta SÁBADO → LAS QUE MÁS SE
   REPITEN y unas marquitas de lápiz a los costados.
6. **s06-lectura** (28.24–33.00): la cajera detrás del mostrador con caja registradora y una
   bolsa que arma; una clienta del otro lado. En "trabajar" arma la bolsa y se la da; en
   "Pregunta" globo "?" hacia afuera y en "bien" un tilde verde grande. Etiqueta OJO CON LA
   LECTURA → PREGUNTA BIEN.
7. **s07-en-vos** (33.00–38.05): la cabeza del dueño de perfil, grande; en "respuesta" adentro
   aparecen cuatro íconos (etiqueta de precio, recibo, caja de pedido, estante) en rojo apagado;
   en "vive" cuatro flechas "?" llegan desde los bordes a la cabeza; en "vos" un círculo rojo
   apagado la marca. Etiqueta LA RESPUESTA → VIVE EN VOS.
8. **s08-una-tarde** (38.05–41.52): el dueño con la campera al hombro camina hacia la puerta
   (cartel SALGO UN RATO); en "irte" avanza, en "aunque" tres globos "?" rojos apagados le
   aparecen atrás y en "tarde" lo frenan y vuelve un paso. Etiqueta UNA TARDE LIBRE (rojo).
9. **s09-ordenar** (41.52–51.13): el renglón ¿Cuánto le cobro? con sus 17 palotes, grande; en
   "primero" un círculo verde y PRIMERO. En "Escribila" sube y se achica y se dibuja la hoja
   LISTA DE PRECIOS, que se llena de renglones con precio verde en "lista"/"precios". En "Que el
   sistema" la lista se va y se dibuja una pantalla: fila "Pedido de la señora · PAGADO" con
   tilde verde en "pagó" y fila "Depósito · HAY 4" en "depósito". Etiquetas LO PRIMERO → ESCRIBILA
   → QUE LO DIGA EL SISTEMA.
10. **s10-scalerics** (51.13–56.55): la cajera y el del depósito delante de una pantalla grande
    con cuatro filas que se tildan en verde (PRECIOS, PAGOS, PEDIDOS, STOCK) en "respuestas";
    en "mano" la cajera levanta una tablet. Etiqueta SISTEMAS A MEDIDA → A MANO DEL EQUIPO.
11. **s11-en-blanco** (56.55–60.21): hoja nueva del anotador (SEMANA SIGUIENTE), renglones
    vacíos; en "casi" un único palote; en "blanco" la hoja se pone verde con un tilde. Etiqueta
    LA SEMANA SIGUIENTE → CASI EN BLANCO.
12. **s12-cta** (60.21–67.04): tarjeta grande "¿Cuál es la pregunta que más te hacen?" con un
    renglón vacío donde el lápiz escribe palotes verdes; globo de comentario que late. Etiqueta
    CONTANOS EN LOS COMENTARIOS.

## Cómo se armó la voz
`partes/01..07.txt` (Orus 01, 04, 07; Leda 02, 05; Charon 03, 06) con `voz.mjs`; a cada parte se le
recortó el silencio de punta y cola (`silenceremove` + `areverse`), a las de Orus `atempo=1.06`, y
se pegaron con 0.5 / 0.4 / 0.55 / 0.4 / 0.4 / 0.55 s de silencio. Los tiempos de los parlamentos
del equipo (palabras 35–40 y 52–59) se corrigieron a mano en `palabras.json` (el STT no los oyó).
