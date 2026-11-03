# Reel "Primer día" — spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Consejo de gestión: **que el negocio esté escrito antes de sumar gente**. Scalerics aparece una
sola vez, al final, con **sistemas a medida** (cada tarea con sus pasos, precios y clientes en un
solo lugar; el nuevo aprende mirando el sistema y no persiguiendo al dueño).
Formato "Rutina + punto de dolor" contado como **documental sobrio del primer día de Lucía**, hora
por hora, en una librería de barrio a la que le va bien. Tres voces (método "Varias voces"):
Orus narrador, Leda (Lucía: "¿Cómo se abre la caja?", "¿A este señor se le fía?") y Charon (el
dueño: "Eso te lo muestro después.", "Mirá cómo lo hago yo."). Locución 66.5 s; total 69.7 s.

Giro respetuoso: Lucía es buena y el dueño es generoso; el problema es que el negocio funciona
porque él está siempre ahí. Cierre: segundo lunes, Lucía resuelve sola y el dueño sale a crecer.
CTA: "¿Qué es lo primero que le enseñarías a alguien nuevo? Contalo en los comentarios."

## Recurso visual central: el reloj del documental
- **Capa `compositions/ambiente.html`** (todo el reel, track 4), arriba de los subtítulos (y 120-200):
  a la izquierda punto + "PRIMER DÍA · LUCÍA" (mono 24, crema); a la derecha el reloj "LUN 08:00"
  que salta en cada capítulo (08:00 → 08:15 → 10:00 → 11:30 → 13:00) con un tic. Debajo, la
  **línea del día**: raya crema 0.15 de x 72 a 1008 con 5 marcas de capítulo; un punto avanza y la
  parte recorrida queda en rojo apagado. En "Consejo" (39.41) el encabezado pasa a "CONSEJO DE
  COLEGA" y el reloj se apaga a 0.35. En "Segundo lunes" (57.21) pasa a "SEGUNDO LUNES" en verde,
  el reloj vuelve a "LUN 08:00" en verde y la línea del día se recorre en verde.
- **Rótulo de capítulo** dentro de cada escena de la historia (s03-s06): mono verde 34 px,
  espaciado, centrado en y ~640 ("08:00 · LA LLEGADA", "08:15 · LA CAJA", "10:00 · LOS PRECIOS",
  "11:30 · EL FIADO", "13:00 · EL BALANCE"), entra con un cursor que se escribe.
- **Color con significado**: lo que traba = crema apagado (0.4) y puntos/signos en rojo apagado
  `#b8574e`; lo resuelto = verde `#5ce611` (tildes, bordes de ficha, botón). Primera mitad casi sin
  verde salvo la chapa de Lucía (es buena) y los rótulos; desde s08 el verde gana la pantalla.

## Personajes y objetos (iguales en todas las escenas)
- **Lucía**: figura de líneas crema con origen en los pies, cabeza r 42 en (0,-290), pelo con
  cola de caballo a la derecha, ojos y sonrisa, torso redondeado, brazos separados, piernas;
  chapita verde "LUCÍA" (mono 22). Alto ~340 a escala 1.
- **El dueño**: misma construcción, un poco más ancho, pelado arriba con pelo a los costados,
  anteojos redondos y bigote, saco con botones. Buena gente: sonríe siempre.
- **Mostrador**: rect largo con tapa (línea doble); lo que queda detrás se recorta con clipPath.
- **Caja registradora**, **agenda con etiqueta de precio**, **cuaderno de fiado**, **ficha de
  tarea** (rect rx 24, encabezado mono, pasos con casilla que se tilda en verde).

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


(En este reel también vale el rojo apagado `#b8574e`, solo en puntos, signos y la parte recorrida
de la línea del día. Nada grande en rojo.)

## Escenas (tiempos relativos a cada escena, ver tiempos.md)
1. **s01-gancho** (0–4.56): hoja de calendario "LUNES" (mono, verde) con una chapita vacía colgando
   ("NUEVO") que se dibuja desde el cuadro 0 (a medio hacer). En "¿Dónde" (2.36) a la derecha se
   abre una carpeta "CÓMO SE HACE" y sus hojas aparecen vacías (renglones apagados); en "todo"
   (3.60) un "?" grande rojo apagado late sobre la hoja. Etiqueta EMPIEZA EL LUNES → ¿DÓNDE ESTÁ ESCRITO?
2. **s02-libreria** (4.56–9.87): fachada de la librería de barrio (toldo a rayas, vidriera con
   cuadernos y lápices, cartel "LIBRERÍA"). En "Lucía" (0.54) aparece Lucía en la vereda. En "va
   bien" (3.34) entran clientes de líneas (dos siluetas chicas con bolsa) y la puerta se mueve; en
   "contrató" (4.24) un cartelito "BUSCAMOS PERSONAL" pegado en la vidriera se tilda en verde.
   Etiqueta PRIMER DÍA → LIBRERÍA DE BARRIO → LE VA BIEN.
3. **s03-la-caja** (9.87–16.77): rótulo "08:00 · LA LLEGADA". Lucía entra desde la izquierda con
   un salto chiquito en "ganas" (1.33), mano en alto. En "Ocho y cuarto" (2.18) el rótulo cambia a
   "08:15 · LA CAJA": aparece la caja registradora sobre el mostrador con un candado rojo apagado;
   globo de Lucía "?" en "abre" (3.73). En "Eso" (5.05) el dueño pasa por la derecha con una caja
   de cartón en brazos y un globo "DESPUÉS" (mono); el candado tiembla. Etiqueta CON GANAS →
   ¿CÓMO SE ABRE? → TE LO MUESTRO DESPUÉS.
4. **s04-precio** (16.77–21.17): rótulo "10:00 · LOS PRECIOS". Mostrador; un cliente (silueta
   de líneas) a la izquierda levanta una agenda; en "precio" (1.73) a la agenda le cuelga una
   etiqueta "$ ?" (signo rojo apagado). En "cabeza" (2.93) a la derecha, la cabeza del dueño (en
   grande) con un globo de pensamiento donde vive la etiqueta con el precio "$ 390" en verde; una
   línea punteada une la etiqueta vacía con la cabeza. Etiqueta ¿CUÁNTO SALE? → EN LA CABEZA DEL DUEÑO.
5. **s05-fiado** (21.17–24.53): rótulo "11:30 · EL FIADO". Un señor de boina (líneas) espera del
   otro lado del mostrador; en "¿A este" (1.19) Lucía mira de reojo, aparece un cuaderno "FIADO"
   cerrado con una gomita; en "fía" (2.23) un "?" rojo apagado se balancea arriba de Lucía.
   Etiqueta ¿SE LE FÍA?
6. **s06-la-una** (24.53–33.28): rótulo "13:00 · EL BALANCE". Dos columnas de palotes: "LUCÍA" y
   "CLIENTES"; en "atendió" (1.27) los palotes de LUCÍA crecen y pasan a los de CLIENTES (sin
   números). En "Mirá" (4.10) las columnas se van y aparece el dueño enseñando: él señala un
   mostrador, Lucía mira; globo "MIRÁ CÓMO LO HAGO YO". En "Con una persona" (5.88) se arma un
   diagrama: el dueño al centro, Lucía chica unida por una línea verde (alcanza); en "tres" (7.87)
   aparecen dos empleados más, las tres líneas tiran del dueño y se apagan a rojo; el dueño tiembla.
   Etiqueta ¿A QUIÉN ATENDIÓ? → MIRÁ CÓMO LO HAGO YO → CON UNA, ALCANZA → CON TRES, NO.
7. **s07-giro** (33.28–39.41): Lucía y el dueño juntos, de frente, sonriendo. En "buena" (1.02) un
   tilde verde arriba de Lucía; en "generoso" (2.02) otro arriba del dueño. En "Pasa" (2.94) se
   alejan y queda la fachada chica del local; en "funciona" (3.52) adentro solo el dueño, y del
   dueño salen hilos a la caja, a la agenda y al cuaderno; en "siempre ahí" (5.02) un pin rojo
   apagado sobre él late. Etiqueta LUCÍA ES BUENA → EL DUEÑO, GENEROSO → TODO PASA POR ÉL.
8. **s08-consejo** (39.41–47.16): una hoja grande "CÓMO SE HACE" (mono) con un lápiz. En
   "escribí" (2.45) el lápiz escribe cuatro renglones (Lexend 32): ABRIR LA CAJA, CARGAR UN
   PEDIDO, HACER UN PRESUPUESTO, RECIBIR MERCADERÍA. En "Mejor todavía" (4.64) la hoja se achica y
   se convierte en pantalla: aparece el marco de una tablet alrededor y los renglones quedan como
   filas con casilla. Etiqueta CONSEJO DE COLEGA → ANTES DE CONTRATAR → EN UN SISTEMA.
9. **s09-sistema** (47.17–53.43): la tablet en primer plano con la **ficha de tarea** "ABRIR LA
   CAJA": en "pasos" (3.33) tres pasos que se tildan en verde (1 CONTAR EL CAMBIO, 2 ENCENDER LA
   CAJA, 3 ANOTAR EL FONDO). En "precios" (3.73) y "clientes" (4.63) dos pestañas PRECIOS y
   CLIENTES vuelan desde afuera (cuaderno de fiado y etiqueta de precio que se transforman); en
   "un solo lugar" (5.33) se encastran en la ficha y el borde se pone verde. Etiqueta SISTEMAS A
   MEDIDA → CADA TAREA, SUS PASOS → UN SOLO LUGAR.
10. **s10-aprende** (53.43–57.21): Lucía mirando la tablet (tildes verdes); en "persiguiendo"
   (2.57) atrás, a la derecha, el dueño corriendo con un rastro de líneas de velocidad, que se tacha
   con una línea verde en "dueño" (3.17). Etiqueta APRENDE MIRANDO → SIN PERSEGUIR A NADIE.
11. **s11-segundo-lunes** (57.21–62.64): rótulo "LUN 08:00 · SEGUNDO LUNES" en verde. Lucía en el
   mostrador abre la caja sola (la caja se abre con un tilde verde) en "resuelve" (1.49). En
   "dueño sale" (2.89) el dueño sale por la puerta con portafolio; en "crecer" (4.68) arriba una
   flecha verde que sube y un segundo local chiquito que se dibuja al lado. Etiqueta RESUELVE
   SOLA → EL DUEÑO, A CRECER.
12. **s12-cta** (62.64–69.74): tarjeta "TU TURNO · ¿Qué le enseñarías a alguien nuevo?" con un renglón vacío y un
   cursor verde que titila; debajo un globo de comentario con tres puntitos que laten. En
   "Contalo" (2.36) el globo se pone verde. Etiqueta CONTALO EN LOS COMENTARIOS. Se queda hasta el
   final con algo moviéndose.

## Cómo se armó la voz
`partes/01..08.txt` (Orus 01, 04, 06, 08; Leda 02, 05; Charon 03, 07) con `voz.mjs`; a cada parte
se le recortó el silencio de punta y cola (`silenceremove` + `areverse`), a las de Orus
`atempo=1.07`, y se pegaron con 0.45 / 0.4 / 0.5 / 0.45 / 0.5 / 0.4 / 0.55 s de silencio. Los
tiempos de los bordes de cada parte ("Ocho en punto", "Ocho y cuarto", "Diez", "Once y media",
"A la una") se corrigieron a mano en `palabras.json` con `silencedetect`.

## Música
`assets/bgm/bed.mp3` se alargó a 69.8 s (la cama de molde pegada con `acrossfade` de 3 s y
`afade` de salida desde 66.8 s), y `armar.mjs` la deja sonar hasta 69.7 s en vez de 63.9.
