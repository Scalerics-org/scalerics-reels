# SPEC · tres-horas

**Qué es:** motion persuasivo de TikTok, patrón "Rutina + punto de dolor" con reloj, resuelto en
tipografía gigante de marca. El local cerró a las 20:00 y el dueño empieza su segundo turno: un
reloj grande (agujas + hora digital Lexend 900) corre de 20:00 a 23:00 mientras las tareas que
hace a mano se apilan en una lista de filas rojo apagado con la etiqueta "VOS". Giro: nada de eso
necesita que lo haga él; las etiquetas VOS se caen, las filas se tildan en verde con "SOLO", y a
la mañana le llega el resumen al celular. Producto: AUTOMATIZACIONES. Sin personajes, sin chistes.
Sin karaoke (`"subtitulos": false`): la tipografía de cada escena ES el subtítulo (como
`diciembre-el-doble`).

**Fondo:** navy oscuro `#0b1220` liso en todo el reel; cierre sobre verde de marca `#5ce611` con
texto navy y pastilla navy detrás del logo. Paleta: navy `#0b1220`, navy claro `#16243d`,
crema `#efeee5`, blanco, verde `#5ce611`, rojo apagado `#c7655b` (solo para el problema).

**Cómo se arma:** todas las escenas salen de `gen.mjs` (piezas comunes: `reloj()`, `barra()`,
`lista()`). Cambiar ahí y correr `node gen.mjs && node armar.mjs`.

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


> En este reel manda lo de arriba sobre SPEC-base: sin subtítulos karaoke, tipografía gigante
> centrada (Lexend 800-900, mayúsculas), fondo navy liso sin brillo.

## Escenas

1. **s01-cerraste** (0-4.3 s) · "Cerraste a las ocho. Tu segundo turno empieza ahora." Cuadro 0 =
   portada: CERRASTE (150 px), el reloj grande 20:00 en blanco, TU SEGUNDO / TURNO (200 px en
   recuadro verde) / EMPIEZA AHORA, y el cartel CERRADO colgado que se hamaca. "ocho": late el
   reloj; "turno": late el recuadro; "ahora": el reloj pasa a 20:01 y se pone rojo apagado.
2. **s02-tareas** (4.3-9.4 s) · Reloj arriba (20:05 → 21:35) con la barra del turno 20:00-23:00
   que se llena en rojo; cinco filas fantasma punteadas abajo. Cada tarea entra gigante en el
   centro ("PASAR LOS PEDIDOS / A LA PLANILLA", "CUADRAR / LA CAJA", "EL PEDIDO AL / PROVEEDOR",
   la palabra clave en rojo) y cae a su fila roja con "VOS".
3. **s03-tareas2** (9.4-13.5 s) · Igual: "AVISAR QUE / ESTÁ PRONTO", "ACTUALIZAR EL / STOCK";
   el reloj llega a 22:52, la lista se llena, tiembla y la cámara se acerca.
4. **s04-once** (13.5-16.7 s) · "ONCE DE / LA NOCHE." y el reloj enorme pasa a 23:00 en rojo,
   la barra se completa; "RECIÉN / TERMINÁS." (rojo).
5. **s05-responsable** (16.7-18.7 s) · Tipografía pura: LO HACÉS / PORQUE SOS / RESPON- / SABLE.
   en verde, subrayado verde. El dueño queda bien parado.
6. **s06-nada** (18.7-21.9 s) · "PERO NADA / DE ESO → NECESITA QUE" sobre la lista de las cinco
   tareas; "LO HAGAS VOS." y en "vos" las etiquetas VOS saltan y se caen.
7. **s07-solos** (21.9-25.9 s) · "LO / AUTOMATIZAMOS" (recuadro verde). Cada fila se tilda en verde
   con la etiqueta SOLO en "pedidos", "avisos", "stock" y después caja y proveedor; "SE HACEN /
   SOLOS." en verde.
8. **s08-manana** (25.9-29.2 s) · "A LA MAÑANA" y un celular grande: MIÉRCOLES 07:30; en "llega"
   baja la notificación "Resumen de ayer" con cinco renglones tildados.
9. **s09-cta** (29.2 s-fin) · Fondo verde: "¿QUÉ TAREA / TE SACÁS PRIMERO?", la videollamada
   (dos personas en pantalla), VIDEOLLAMADA / GRATIS y la pastilla navy "scalerics.com".
