# Reel "Feliz cumple" — spec para los que construyen escenas

Formato D, **confesión de una clienta**. Producto: **Scalerics Puntos**. Tres voces: Graciela
(Gacrux, señora uruguaya de unos 65, cálida y con humor), Julio (Charon, el carnicero, tímido y
colorado) y el narrador Orus, que entra recién en s09 con Scalerics.

Historia: Graciela compra hace once años en la carnicería de Don Julio. Ayer, por primera vez, le
llegó al celular "¡Feliz cumple, Graciela! Tenés un regalo para canjear con tus puntos" (la tarjeta
se la había puesto la nieta, y suma sola con cada compra). Fue a buscar el regalo y, ya que estaba,
se llevó el asado del domingo. Julio, colorado: "siempre la quise saludar; lo que no tenía era dónde
anotar el cumpleaños de todo el barrio". Ella lo perdona ("que el año que viene no se le pase").
Giro (el dueño bien parado): el cariño Julio ya lo tenía, le faltaba dónde anotarlo. Orus: Scalerics
Puntos (suma con cada compra, tarjeta en el celular, el saludo del cumple sale solo, ves quién
viene y cada cuánto). Cierre para compartir: "Etiquetá al comercio que te sabe el nombre."

**Recurso visual central: el celular de Graciela con la notificación del cumple + la carnicería de
líneas crema.** La fachada de la carnicería (toldo a rayas, cartel "CARNICERÍA" mono, vidriera con
un gancho y una pieza colgada, puerta) vuelve en s01, s04 y s12. El celular (rect redondeado crema,
UI en Lexend crema/verde) vuelve en s02, s03, s10 y s11. Personajes de líneas, sobrios y adultos
(nada de caritas infantiles): Graciela con pelo corto ondulado (3-4 arcos), lentes redondos, saco
de lana; Julio grandote con delantal, bigote y gorrito. Lo pendiente o lo que falta en crema
apagado (0.4); el saludo, los puntos y lo resuelto en verde de marca.

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).

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



## Inicios globales
s01 0 · s02 7.35 · s03 17.21 · s04 24.38 · s05 29.16 · s06 34.02 · s07 40.14 · s08 45.05 ·
s09 51.33 · s10 55.97 · s11 62.08 · s12 66.24 (dura hasta 72.24; la voz termina en 69.04).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-once-anos** (0–7.35, Graciela) — "Hace once años que compro en la misma carnicería. Ayer,
por primera vez, me dijeron feliz cumpleaños." La fachada de la carnicería centrada (x 540, suelo
y 1150), a medio dibujar en el cuadro 0. En "once años" una fila de 11 rayitas cortas bajo la vereda
(y 1200) que aparecen de a una (crema 0.5). En "carnicería" el cartel se prende. En "Ayer" la
rayita 11 se vuelve verde y hace punch. En "feliz cumpleaños" pop de una tarjeta de saludo
(rect 300x170 doblada, borde verde, "¡Feliz cumple!" Lexend verde) arriba a la derecha del toldo,
con tres trazos cortos de festejo. Etiqueta: "LA MISMA CARNICERÍA" → "POR PRIMERA VEZ".

**s02-mensaje** (7.35–17.21, Graciela) — A la izquierda (x 280) Graciela sentada con mate (mate y
bombilla, termo bajo el brazo). A la derecha un celular (x 600–940, y 640–1290). En "mate" el mate
echa vapor; en "suena" el celular vibra (rotación ±3°, ondas a los costados). En "Carnicería" baja
la notificación "CARNICERÍA DON JULIO" (mono) con un icono de tarjeta; en "¡Feliz" aparece
"¡Feliz cumple, Graciela!" (Lexend 600, verde); en "regalo" un paquete con moño verde; en
"puntos" un botón "CANJEAR CON TUS PUNTOS". Graciela se apaga a 0.4 cuando el celular manda.
Etiqueta: "SUENA EL CELULAR" → "UN REGALO".

**s03-tarjeta** (17.21–24.38, Graciela) — "¿Puntos?": un "?" crema grande hace pop junto al
celular centrado (x 540). En "nieta" una figura joven (cola de caballo) chica a la izquierda con
un arco punteado hacia el celular. En "tarjeta" el celular muestra la tarjeta "CARNICERÍA DON JULIO
· GRACIELA" y un contador de puntos. En "compro" un ticket entra al celular y "+10" verde; en
"suma" y "sola" el contador sube solo. En "enteraba" el "?" se convierte en tilde verde.
Etiqueta: "LA TARJETA EN EL CELULAR" → "SUMA SOLA".

**s04-carniceria** (24.38–29.16, Graciela) — La fachada a la izquierda; Graciela camina hasta la
puerta en "fui". En "regalo" pop de un paquete con moño verde y tilde "CANJEADO". En "ya que
estaba" guiño (la bolsa se balancea); en "asado" un paquete de papel de carnicería atado con
hilo; en "domingo" una hojita de calendario "DOMINGO". Etiqueta: "REGALO CANJEADO" → "Y YA QUE
ESTABA".

**s05-asado** (29.16–34.02, Graciela) — Una tabla de madera (líneas) y los cortes que aparecen en
cada palabra: "Vacío" (pieza ancha con vetas), "chorizo" (ristra de tres), "morcilla" (lazo). En
"Viene la familia entera" la tabla sube y aparece una mesa larga con cinco siluetas (de grande a
chico) y humito de parrilla. Etiqueta: "VACÍO, CHORIZO, MORCILLA" → "LA FAMILIA ENTERA".

**s06-colorado** (34.02–40.14, Julio) — Julio detrás del mostrador (delantal, bigote, gorrito).
En "colorado" rayitas de rubor en las mejillas (trazos cortos crema) y una gotita de vergüenza.
En "Graciela," (habla Julio) un globo de diálogo; en "siempre la quise saludar" adentro del globo
un corazón de líneas que se dibuja en verde. Etiqueta: "DON JULIO" → "SIEMPRE QUISO".

**s07-barrio** (40.14–45.05, Julio) — Zoom out: la carnicería chiquita al centro y alrededor un
barrio de líneas (casas, edificios) que se va dibujando; en "anotar" un cuaderno con lápiz y una
lista que se desborda; en "cumpleaños de todo el barrio" en cada ventana aparece una tortita /
"?" crema apagado. Etiqueta: "¿DÓNDE LO ANOTO?" → "TODO EL BARRIO".

**s08-perdono** (45.05–51.33, Graciela) — Graciela de nuevo (izquierda) y un calendario
(derecha). En "Once años" las hojas del calendario pasan rápido (11 hojas). En "perdono" ella
levanta el dedo, pícara. En "año que viene" la hoja nueva con una fecha marcada con círculo verde
y una tortita; en "pase" el círculo hace punch. Etiqueta: "LO PERDONA" → "EL AÑO QUE VIENE".

**s09-no-se-pasa** (51.33–55.97, Orus) — "No se le va a pasar": la fecha marcada recibe una
tilde verde y una campanita "AVISO PROGRAMADO". En "cariño" un corazón crema se dibuja a la
izquierda; en "faltaba dónde anotarlo" a la derecha un recuadro punteado vacío (crema 0.4).
Etiqueta: "EL CARIÑO YA ESTABA" → "FALTABA DÓNDE ANOTARLO".

**s10-puntos** (55.97–62.08, Orus) — El recuadro punteado se vuelve un celular verde: en
"Scalerics Puntos" título "Scalerics Puntos" (Lexend 600, crema + verde) arriba del celular; en
"suman" tickets que entran y el contador sube; en "tarjeta en el celular" el celular hace punch con
la tarjeta. Etiqueta: "SCALERICS PUNTOS" → "TARJETA EN EL CELULAR".

**s11-panel** (62.08–66.24, Orus) — En "saludo" la notificación "¡Feliz cumple, Rosa!" sale sola
(avioncito, "ENVIADO SOLO" con tilde). En "vos ves" un panel (laptop) con filas: Graciela · cada 7
días, Rosa · cada 15, Héctor · cada 3, con barras que crecen en "cuánto". Etiqueta: "SALE SOLO" →
"QUIÉN VIENE Y CADA CUÁNTO".

**s12-cta** (66.24–72.24, Orus) — La fachada de la carnicería a la derecha; un globo desde la
puerta "¡Hola, Graciela!" y una píldora verde "@ etiquetalo" con cursor que la toca. Etiqueta:
"ETIQUETALO" → "EL QUE TE SABE EL NOMBRE".
