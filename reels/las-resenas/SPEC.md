# Reel "Las reseñas": spec

Reel vertical 1080x1920 de Scalerics, ~58.7 s (voz Orus de 55.45 s). **Consejo de gestión para
pymes** (las reseñas en Google) y Scalerics aparece solo al final con una **automatización**:
después de cada compra o turno, al cliente le llega solo un mensaje amable con el link para dejar
la reseña; el dueño ve cuáles llegaron y las contesta. Formato del punto 6 de CLAUDE.md:
**tipografía cinética de marca** con consejo de colega en 3 pasos (números gigantes).
Gancho en el segundo 0: "Tus clientes contentos no dejan reseñas. Hay que pedírselas." El dueño
queda bien parado: atiende bárbaro; lo que pasa es que el que tuvo un problema escribe solo y el
contento se olvida. Giro: no hace falta rogarle a nadie, hace falta acordarse de pedir, y en un
día lleno eso es lo que se olvida. Sin estadísticas; reseñas de verdad, nada de comprarlas.
Cierre: "Mandáselo al que atiende bárbaro y tiene tres reseñas."

## Recurso visual central
**Las cinco estrellas de líneas.** En s01 están vacías (crema que se apaga) y se llenan en verde
en "pedírselas". La **tarjeta de reseña** recreada propia (avatar de líneas, nombre inventado,
fila de estrellas, texto) aparece en s02 (la queja de la noche: 1 estrella rojo apagado, resto
gris), s03 (la que nunca se escribe: tarjeta punteada vacía que se borra), s07 (la mala que se
contesta con calma) y s11 (las que llegan, en verde). **Color con significado:** gris `#7c8698` =
lo que falta o se olvida, rojo apagado `#b25b57` = la queja (solo en s02, s07 y la tachadura de
s06/s08); verde `#5ce611` = lo resuelto (las estrellas llenas, el link, la respuesta, los pasos).
Nada de logos ni colores de Google (las estrellas nunca amarillas).

## ESTILO: tipografía cinética de marca (manda sobre SPEC-base donde choque)
- Palabras ENORMES (Lexend 800-900, mayúsculas, letter-spacing -0.02em) que entran en la palabra
  exacta: golpe de escala (1.4-1.5 → 1, 0.2 s, power4.out), entradas desde abajo con back.out; lo
  anterior se achica arriba o se apaga. Ritmo de `reels/vagos` pero SOBRIO (sacudón de 3 tweens
  de 7 px solo en golpes clave, nada de glitch).
- Números de paso gigantes (Lexend 900, ~400 px, verde) a la izquierda en s05, s06 y s07.
- **Sin subtítulos karaoke** (`"subtitulos": false`, como `reels/cuanto-vendiste`): el texto
  gigante ES el subtítulo. Se entiende sin sonido.
- Paleta (SOLO estos): navy de fondo (index), crema `#efeee5`, blanco, verde `#5ce611`, gris
  `#7c8698`, rojo apagado `#b25b57` (poco). Lexend + IBM Plex Mono. Sin emojis, fotos, degradés
  en escenas ni rayas largas.
- **Zona**: contenido entre y 380 y y 1600 (logo en y ~1746). Etiqueta mono verde en top 400.
- `compositions/ambiente.html`: grilla de puntos que deriva, viñeta y destello verde suave en
  "pedírselas" (3.35), "automático" (43.6) y "llegaron" (50.0). Va DEBAJO de las escenas.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-4.39): cinco estrellas de líneas a medio dibujar en el cuadro 0 (y 548).
  "TUS CLIENTES" (0) / "CONTENTOS" verde (0.70) / "NO DEJAN" (1.0) / "RESEÑAS." gris con golpe
  (1.95); las estrellas se apagan. En "Hay" (3.07) todo se achica arriba, "HAY QUE /
  PEDÍRSELAS." verde (3.30) con raya, y las estrellas se llenan en verde una por una.
  Etiqueta: "Consejo para tu local".
- **s02-problema** (4.39-9.57): "PASA EN TODOS / LOS RUBROS." (0) con una fila de 4 íconos de
  líneas (taza, tijera, llave inglesa, bolsa) que se dibujan. En "El" (1.75) sube chico y entra
  "EL QUE TUVO / UN PROBLEMA" (gris) y "ESCRIBE SOLO," blanco (3.21). Tarjeta de reseña: "Martín
  G.", 1 estrella rojo apagado + 4 grises, texto que se tipea "Esperé y nadie me avisó." En "esa
  misma noche" (3.84) luna de líneas y "23:47" mono en la tarjeta. Etiqueta: "La queja".
- **s03-contento** (9.57-12.49): "EL QUE SE FUE / CONTENTO" (contento verde). Puerta de líneas
  que se abre y una flecha que sale; casita de líneas a la derecha en "casa" (1.43). Tarjeta
  punteada vacía con cursor titilando que se desvanece en "olvida" (2.03); "Y SE OLVIDA." gris.
- **s04-tres** (12.49-16.16): "POR ESO HAY LOCALES / QUE ATIENDEN BÁRBARO" (bárbaro verde, en
  1.01). Frente de local de líneas (toldo a rayas, puerta, vidriera, cartel "ABIERTO") con un
  corazón verde. En "tres" (2.31) "Y TIENEN / 3 RESEÑAS." con el 3 gris gigante; tres tarjetitas
  grises caen al lado. Etiqueta: "Atiende bárbaro".
- **s05-uno** (16.17-22.73): "TRES COSAS / PARA CAMBIARLO." con tres casilleros 1·2·3 mono. En
  "Uno" (1.72) el 1 crece gigante verde a la izquierda y a la derecha "PEDILA / EN EL MOMENTO /
  JUSTO." (2.36). En "Cuando" (3.91) un globo de diálogo de líneas con "¡Quedó divino!" (4.80) y
  en "ahí" (5.53) "AHÍ." verde gigante con una flecha verde al globo y un anillo que late.
- **s06-dos** (22.73-27.48): "2" gigante + "HACELO / FÁCIL." (0.87). En "link" (1.87) una
  tarjeta-botón verde con ícono de cadena: "Dejá tu reseña · un toque". En "no" (2.88)
  abajo, un globo gris "Buscanos en Google" con lupa; en "Google" (3.87) se tacha en
  rojo apagado. Etiqueta: "Un link directo".
- **s07-contesta** (27.48-31.78): "3" gigante + "CONTESTÁ / TODAS." (0.59). En "También" (1.95)
  "TAMBIÉN LAS MALAS," y una tarjeta de 2 estrellas (rojo apagado) "Tardaron con mi pedido.". En
  "con calma" (3.11) una respuesta del dueño con borde verde que se tipea "Gracias por
  avisarnos. Ya lo estamos mejorando." y "CON CALMA." verde.
- **s08-verdad** (31.78-35.87): "RESEÑAS / DE VERDAD," (0.12) "DE CLIENTES / DE VERDAD." (1.42)
  con un tilde verde en círculo. En "Nada" (2.54) una etiqueta de precio de líneas "$ 5 ★" gris
  que se tacha con una X rojo apagado en "comprarlas" (2.92); "NADA DE COMPRARLAS." Etiqueta:
  "Sin trucos".
- **s09-acordarse** (35.87-42.30): "NO HACE FALTA / ROGARLE / A NADIE." crema (0-1.6). En "Hace"
  (1.69) "HACE FALTA / ACORDARSE / DE PEDIR." verde. En "Y" (3.33) sube chico y entra una lista
  de tareas de líneas que se llena rápido (Abrir caja · Pedido al proveedor · Turno 10:30 ·
  Pedir reseña (verde, segunda) · Reponer góndola · Pagar la luz · Cerrar caja) "EN UN DÍA LLENO," (3.93); las
  tareas nuevas empujan y "Pedir reseña" se pone gris y se cae de la lista en "olvida" (5.53),
  con "ES LO QUE SE OLVIDA." gris.
- **s10-auto** (42.30-49.77): "EN SCALERICS / LO HACEMOS / AUTOMÁTICO." (Scalerics verde,
  automático en 1.30). En "Después" (2.35) sube chico; ticket de compra y agenda de turno de
  líneas con tilde verde a la izquierda, flecha que se dibuja hasta un celular de líneas. En
  "llega" (4.90) entra un mensaje: "¡Gracias por venir, Laura! Si te gustó, ¿nos dejás una
  reseña?" y en "link" (6.60) el botón verde "Dejar reseña". Etiqueta: "Llega solo".
- **s11-panel** (49.77-52.13): panel de líneas "Reseñas nuevas": tres tarjetas que entran en
  "llegaron" (0.63) con estrellas verdes llenas; "VOS VES CUÁLES / LLEGARON"; en "contestás"
  (1.33) cada tarjeta recibe un tilde verde "Contestada" y "Y LAS CONTESTÁS.".
- **s12-cta** (52.13-58.65): cinco estrellas arriba; "MANDÁSELO / AL QUE ATIENDE / BÁRBARO / Y
  TIENE TRES / RESEÑAS." entrando por frase (bárbaro verde, tres reseñas gris con un "3" gris).
  Las estrellas se llenan en verde al final y laten suave; ~3 s de movimiento suave.

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
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx --yes hyperframes@0.8.206 snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx --yes hyperframes@0.8.206 check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (están en `tiempos.md`).

