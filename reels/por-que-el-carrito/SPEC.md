# por-que-el-carrito · serie "¿Por qué…?" (formato resultaaquee)

Explicador: por qué la tienda online te escribe cuando dejás algo en el carrito (el que llega al
carrito ya eligió; algo lo frenó: el envío, una llamada, lo dejó para después; no se fue, quedó a
medio camino; la tienda le escribe sola con el carrito guardado). Giro: en tu negocio pasa lo
mismo (el presupuesto sin respuesta, el pedido sin retirar). Producto del cierre:
Automatizaciones. Cierre: videollamada gratis en scalerics.com. Fuentes en `fuentes.md`. Sin
marcas ni cifras.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: el protagonista es UN celular gigante (700 x 1140, canto crema de
  10 px, cuerpo navy claro, sombra plana) que no se va en todo el reel; lo que se transforma es su
  pantalla: carrito → producto elegido → envío / llamada entrante / pantalla apagada → camino de la
  compra a medio hacer → notificación con carrito guardado → "Tu negocio" → presupuesto y pedido →
  mensaje automático → caja con tilde → videollamada.
- Fondo navy oscuro `#0b1220` LISO (celular a pantalla completa como recurso de la tanda).
  Pantallas crema `#efeee5` con tarjetas blancas y borde navy de 6 px; verde `#5ce611` / `#3fa60a`
  para lo resuelto; rojo apagado `#c7655b` solo para lo que frena (envío, pausa, "sin respuesta",
  "no lo retiró", "se fue").
- Subtítulos arriba al centro (1 a 3 palabras, 86 px, recuadro verde de selección; rojo en
  "frenó", "envío", "llamada"), de `armar.mjs` (versión de por-que-el-service con fondo #0b1220).
  El gancho (s01) y "Agendá una videollamada gratis en scalerics.com" (s09) no llevan subtítulo.
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
- s01-gancho: cuadro 0 = "¿Por qué la / tienda online / te escribe si / dejás algo en / el
  carrito?" a 110 px ("carrito?" verde) y el celular al 80 % abajo con "Tu carrito" (zapatilla
  verde, subtotal, envío, botón "Finalizar compra"). "escribe": cae la notificación "¿Te olvidaste
  algo?" y vibra. "carrito": laten la palabra y el ícono. Sale el título y push-in del celular.
- s02-eligio: pills con línea guía "Talle 41 ✓" (llega), "Color ✓" (carrito), "Cantidad 1 ✓" y
  recuadro sobre "Finalizar compra" (eligió).
- s03-freno: "frenó": el botón se apaga a gris y aparece la pausa roja. "envío": recuadro rojo en
  la fila y pill "¿Encima envío?". "una llamada": pantalla de llamada entrante "Trabajo" y vibra.
  "para después": pantalla apagada con reloj que gira y "Después lo veo"; el celular se inclina.
- s04-medio: la pantalla se prende con el camino "TU COMPRA": Eligió ✓ · Carrito ✓ · Pagar
  (punteado). "No se fue": pill "Se fue" tachada. "quedó a medio camino": el carrito baja por la
  vía y queda en el medio; pill "A un paso" sobre Pagar.
- s05-aviso: pantalla bloqueada 21:40. "escribe": notificación "Te guardamos el carrito". "sola":
  pill "Sale solo ⚡". "carrito guardado": se abre la tarjeta del carrito guardado con "Guardado ✓"
  y "Comprar".
- s06-negocio: la pantalla gira y es "Tu negocio · clientes a un paso": Martín (pidió
  presupuesto), Sofía (encargó y no vino), Laura (preguntó el precio). Pill "Pasa lo mismo".
- s07-casos: tarjeta "Presupuesto · Enviado a Martín" con "Sin respuesta"; tarjeta "Pedido ·
  Pronto para Sofía" (bolsa LISTO) con "No lo retiró"; en "buscar" las dos pasan a "A un paso".
- s08-automatico: chat con Sofía: "aviso": sale el mensaje verde "Hola Sofía, tu pedido está
  pronto. ¿Pasás hoy?" (ENVIADO SOLO · 10:00). "automatización": chip "⚡ AVISO AUTOMÁTICO".
  "momento justo": contesta "¡Sí! Paso a las 6." y la pantalla se vuelve la caja con tilde
  "Retirado".
- s09-cta: "¿Lo armamos en tu negocio?": la pantalla pasa a la videollamada (Tu negocio /
  Scalerics / botón de cámara) y el celular se achica arriba; "Videollamada" / "gratis" (recuadro
  verde) / "scalerics.com" en verde.
