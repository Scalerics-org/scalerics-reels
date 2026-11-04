# Reel "Sábado, mediodía": spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (pymes, tono de colega, marca).
Producto: **agente de IA** que atiende el WhatsApp de una rotisería: contesta con el menú del día,
toma el pedido, confirma la hora de retiro y manda la comanda a la cocina; el dueño sigue en el
mostrador. Formato motion persuasivo **"Rutina + punto de dolor"** (punto 6) con un reloj que corre
arriba. Voz Orus sola, 94 palabras, 32.4 s; total 35.61 s. Las escenas salen de `gen.mjs`
(correr `node armar.mjs && node gen.mjs && node armar.mjs`).

Historia: gancho en el cuadro 0, entero y grande: "Sábado, 12:00 / Mostrador lleno y / WhatsApp
sonando" (verde), con el reloj de pared, el celular con badge rojo y la fila frente al mostrador de
la rotisería "La Esquina" (inventada). Llegan los mensajes (¿Tenés milanesas? · Dos tartas para la
una · ¿A qué hora llega?). El dueño hace todo bien (tilde en el mostrador), pero no puede despachar
y escribir a la vez (va de una tarjeta a la otra; "Dos lugares · una persona"). Punto de dolor:
el pedido entra justo cuando tiene las manos en la masa (manos amasando, notificación, contador
"SIN RESPUESTA" que corre en rojo apagado). Entra el agente de IA: contesta con el menú del día,
toma el pedido, confirma retiro 13:00, la comanda #49 cae en la pantalla de la cocina con tilde
verde y el dueño sigue en el mostrador. Giro: el "VS" entre WhatsApp y el cliente de enfrente se da
vuelta y queda un "+". Cierre en verde de marca: "¿Lo vemos para tu local?", videollamada,
"Videollamada gratis · scalerics.com".

## Recurso visual central
- Fondo navy liso `#0b1220`. Interfaz recreada grande y rellena: celular de 900x1190, burbujas
  crema 50-56 px, tarjetas navy claro `#16243d` con borde 8 px, comandas crema con borde verde.
- `compositions/ambiente.html`: pill del reloj arriba (y 74-186, encima de los subtítulos):
  "SÁBADO 12:01" → 12:11, con el minutero girando; en el punto de dolor (s04) borde y hora en rojo
  apagado `#c7655b`; desde "agente" (17.15) en verde. Se va antes del cierre.
- Color con significado: rojo apagado = sin contestar / no da; verde = resuelto.
- Subtítulos arriba al centro (armar.mjs de la-misma-pregunta): 1-3 palabras, 86 px, recuadro
  verde en la clave (rojo en "no" y "vez"), desde "¿Tenés" (9) hasta antes de "¿Lo" (85).
- Cierre (s10) con fondo verde `#5ce611` a pantalla completa y textos navy; scalerics.com verde en
  una píldora navy; el logo se oscurece (`firmaOscuraDesde` en reel.json, lo maneja armar.mjs).

## Escenas (tiempos en tiempos.md)
- **s01-gancho** (0-4.85): título gigante + reloj de pared (minutero llega a las 12 en "doce"),
  celular chico vibrando (badge 3 → 6 en "WhatsApp sonando"), fila de cinco personas y mostrador
  "ROTISERÍA"; la bolsa cae sobre el mostrador en "lleno".
- **s02-mensajes** (4.85-8.59): celular grande "La Esquina · ROTISERÍA · SIN LEER"; burbujas de
  Laura, Jorge, Vale (y Carlos) en sus palabras; badge rojo 1-2-3-4.
- **s03-a-la-vez** (8.59-12.59): dos tarjetas MOSTRADOR (bolsa, tilde, "Atendido") y WHATSAPP
  (celular, "Sin contestar"); el dueño va a la izquierda en "despachar", a la derecha en
  "escribir", tiembla en "a la vez"; pill roja "Dos lugares · una persona".
- **s04-masa** (12.59-16.05): manos amasando sobre la mesa; notificación blanca "Nuevo pedido ·
  Jorge" en "entra"; contador SIN RESPUESTA 0:00 → 3:59 en rojo apagado; pill "Las manos en la masa".
- **s05-agente** (16.05-18.20): esfera verde con chispa y ondas, "Agente de IA" 136 px con
  recuadro de selección, pill "EN LÍNEA · ATIENDE POR VOS".
- **s06-menu** (18.20-19.96): el celular ahora con "AGENTE DE IA · EN LÍNEA"; "Dos tartas para la
  una. ¿Qué tenés hoy?" → respuesta verde MENÚ DE HOY con tres filas y precios (de este local
  ficticio).
- **s07-pedido** (19.96-22.16): el menú sube; tarjeta "PEDIDO TOMADO · 2 tartas de jamón y queso"
  en "pedido"; "RETIRO CONFIRMADO · Jorge · hoy · 13:00" en "confirma".
- **s08-comanda** (22.16-25.34): pantalla COCINA · COMANDAS (#47, #48 del mostrador); la #49 cae en
  "cae" con borde verde, tilde y origen WHATSAPP; abajo el dueño despacha una bolsa al cliente,
  pill "Vos, en el mostrador".
- **s09-giro** (25.34-28.12): ENFRENTE (vos + cliente) y WHATSAPP (agente de IA) con un VS rojo en
  el medio; en "no compite" el VS se da vuelta en un "+" verde, bordes verdes y tildes; pill "Cada
  uno, atendido".
- **s10-cta** (28.12-35.61): círculo verde que llena la pantalla; "¿Lo vemos para tu local?",
  videollamada (La Esquina con la bolsa · Scalerics EQUIPO · botón de cámara), "Videollamada" /
  "gratis" (navy con texto verde) / "scalerics.com" en píldora navy.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá todo va relleno y grande, interfaz recreada, trazos de 6-8 px).

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

