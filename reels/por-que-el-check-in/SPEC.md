# por-que-el-check-in · serie "¿Por qué…?" (formato resultaaquee)

Explicador: por qué la aerolínea quiere que hagas el check-in desde tu casa (antes era una fila y
un empleado en el mostrador; ahora lo hacés vos, cuando querés; elegís el asiento y la tarjeta de
embarque queda en el celular). Giro a la mitad: "parece que te pasan el trabajo", pero ganan los
dos: vos no hacés fila y el mostrador se libera. Lección para la pyme: ¿cuántos te escriben para
sacar un turno? Con reservas en tu web lo sacan solos, a cualquier hora, sin esperarte. Producto:
Sitio web con reservas/turnos online. Cierre: videollamada gratis en scalerics.com. Fuentes en
`fuentes.md`. Sin aerolíneas nombradas, sin logos, sin cifras.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: el protagonista es UN celular gigante (700 x 1140, canto crema de
  10 px, cuerpo navy claro, sombra plana) que cambia de pantalla: check-in → asientos → tarjeta de
  embarque con QR → credencial "PERSONAL · Vos" → mensajes de turnos → web con calendario de turnos
  → pantalla bloqueada 23:40 con "Turno nuevo" y tilde verde → videollamada. Dos escenas cambian el
  celular por un objeto lleno a pantalla completa: el aeropuerto (mostrador navy con tapa crema,
  cartel CHECK-IN, empleado crema, fila de 4 personas grises con valijas).
- Fondo navy oscuro `#0b1220` LISO. Pantallas crema `#efeee5` o navy con tarjetas blancas y borde
  navy de 6 px; verde `#5ce611` / `#3fa60a` para lo resuelto; gris `#b9b8ad` / `#8f8e86` y rojo
  apagado `#c7655b` solo para el problema (la fila, "Esperando", la credencial de personal, "Sin
  contestar").
- Subtítulos arriba al centro (1 a 3 palabras, 86 px, recuadro verde de selección; rojo en "fila",
  "mostrador", "trabajo"), de `armar.mjs` (versión de por-que-el-carrito). El gancho (s01) y el CTA
  (s10) no llevan subtítulo.
- Las escenas salen de `gen.mjs` (tiempos por índice de palabra): `node gen.mjs && node armar.mjs`.

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
- s01-gancho: cuadro 0 = "¿Por qué la / aerolínea quiere / que hagas el / check-in desde / tu
  casa?" a 112 px ("check-in" verde) y el celular al 74 % abajo con el check-in (TU VUELO, MVD →
  MAD con avión verde que avanza, tarjeta Pasajero / Equipaje / Asiento "Elegir", chip "CHECK-IN
  ABIERTO", botón verde "Hacer check-in"). "check-in": laten la palabra y el botón. "casa": toque en
  el botón. Sale el título y push-in del celular a tamaño completo.
- s02-fila: el aeropuerto lleno (mostrador, cartel CHECK-IN). "fila": entran de a uno 4 personas
  grises con valijas. "empleado": aparece detrás del mostrador. "mostrador": recuadro rojo sobre el
  mostrador y pill roja "Esperando" con reloj.
- s03-vos: vuelve el celular con el check-in desde abajo. "hacés": toque en el botón; "vos": pill
  verde "Desde casa" (en lugar del chip). "cuando querés": la hora pasa a 23:10 y la pill cambia a
  "A las 23:10" con luna.
- s04-asiento: "Elegí tu asiento" con el mapa A B | C D, filas 12-16, ocupados en gris. "asiento":
  el 14D se pinta verde y pill "Ventanilla ✓" con línea guía. "tarjeta de embarque": el mapa sube y
  entra la tarjeta de embarque (MVD → MAD, asiento 14D, embarque 07:50, QR grande). "celular":
  late el QR, pill "En el celular ✓" y push-in.
- s05-trabajo: el giro. "pasan el trabajo": cae sobre la tarjeta una credencial con cinta roja
  apagada "PERSONAL · Vos · MOSTRADOR" que se balancea; pill roja "¿Laburo tuyo?" y el celular vibra.
- s06-ganan: vuelve el aeropuerto con la fila y arriba "Ganan [los dos]". "vos no hacés fila": la
  fila se va y entra un celular con la tarjeta y el QR; pill "Sin fila ✓". "el mostrador se libera":
  el cartel pasa a verde "LIBRE", la tapa del mostrador a verde, el empleado se mueve; pill "Libre ✓".
- s07-negocio: el celular gira y es "Tu negocio · MENSAJES": caen 4 mensajes de turnos (Carla,
  Diego, Ana, Pablo) con punto rojo y el contador sube de 1 a 4; "turno": pill roja "Sin contestar".
- s08-web: la web del comercio "tunegocio.com.uy · Reservá tu turno · ONLINE 24 HS". "reservas":
  entra la semana (JU marcado) y los horarios (11:30 y 16:30 ocupados). "web": late JU, pill "Sin
  llamar". "sacan solos": toque en 18:00, se pinta verde, se habilita "Confirmar turno"; pill "Solos ✓".
- s09-hora: pantalla bloqueada 23:40 "MIÉRCOLES · NOCHE" con luna verde. "cualquier hora": cae la
  notificación "TU WEB · AHORA · Turno nuevo · Lucía · jueves 18:00". "sin esperarte": tilde verde
  grande "Confirmado" y pill "Sin esperarte ✓".
- s10-cta: "¿Lo armamos?": la pantalla pasa a la videollamada (Tu negocio / Scalerics / botón de
  cámara) y el celular se achica arriba; "Videollamada" / "gratis" (recuadro verde) /
  "scalerics.com" en verde.
