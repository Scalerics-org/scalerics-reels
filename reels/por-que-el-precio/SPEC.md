# por-que-el-precio · serie "¿Por qué…?" (formato resultaaquee)

Explicador: por qué Uber te dice cuánto vas a pagar antes de pedir el auto (en el taxi el
taxímetro corría y mirabas el número; la app te muestra el precio antes, "sin sorpresas"; si
sabés cuánto sale, no preguntás: decidís). Giro: en tu negocio la pregunta es la misma, "¿cuánto
sale?", y muchas webs contestan "consultar". Producto del cierre: **Sitio web** con los precios a
la vista o un cotizador simple, y botón a WhatsApp. Cierre: videollamada gratis en scalerics.com.
Fuentes en `fuentes.md`. Uber se NOMBRA pero no se dibuja: auto, app y taxímetro genéricos de
marca Scalerics. Precios y pastelería de ejemplo.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Estilo de la tanda: **celular a pantalla completa** sobre navy oscuro `#0b1220` LISO (sin
  degradé ni estrellas: compresión de Instagram).
- Composición distinta de por-que-el-carrito: el celular (720 x 1130, canto crema 10 px, cuerpo
  navy claro, sombra plana) va CORRIDO A LA IZQUIERDA (x 40-760, y 590-1720) y a su derecha cuelga
  el segundo protagonista: **una etiqueta de precio gigante** (310 x 200, rellena, sombra plana,
  hilo crema de 6 px atado al canto del celular) que se transforma con la historia:
  "?" crema (taxímetro) → "$ 420" verde (app) → "consultar" gris (web) → "$ 1.450" → "$ 1.990"
  verde (cotizador) → con tilde. Se balancea (rotación sobre el hilo) cada vez que cambia.
- Pantallas del celular: app de viaje (mapa crema con calles blancas y ruta navy/verde, hoja
  blanca con "Auto · $ 420" y botón verde "Confirmar viaje") → taxímetro (pantalla oscura, importe
  en mono rojo apagado que sube, fichas y tiempo que corren, cartel "OCUPADO") → web de la
  pastelería con "Consultar" en gris → la misma web con precios verdes → cotizador (slider de
  porciones, chips de relleno, total que se recalcula) → chat con el pedido → "tu sitio" que se
  arma → videollamada.
- Color con significado: lo que frena en gris `#9aa1ad` o rojo apagado `#c7655b`; lo resuelto en
  verde `#5ce611`. Trazos y bordes de 6-8 px; textos de interfaz de 28 px para arriba.
- Subtítulos arriba al centro (1 a 3 palabras, 86 px, recuadro verde; rojo en "consultar"), de
  `armar.mjs` (versión de por-que-el-carrito). El gancho (s01) y "Agendá una videollamada gratis en
  scalerics.com" (s10) no llevan subtítulo: tienen texto grande en la escena.
- Las escenas salen de `gen.mjs` (tiempos por índice de palabra): `node gen.mjs && node armar.mjs`.

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
- s01-gancho (3.99 s): cuadro 0 = "¿Por qué Uber / te dice cuánto / vas a pagar / antes de pedir /
  el auto?" a 100 px ("cuánto vas a pagar" en verde) y debajo el celular al 74 % con la app de
  viaje (precio $ 420 a la vista). "cuánto": cuelga la etiqueta verde "$ 420" y se balancea.
  "pedir": late el botón "Confirmar viaje". Al final sale el título y push-in del celular.
- s02-taximetro (3.78 s): la pantalla pasa al taxímetro (entra desde la izquierda). "taxímetro":
  la etiqueta se vuelve crema con "?". "corría": el importe sube en mono rojo apagado, las fichas y
  el tiempo corren. "mirabas el número": push-in sobre el importe, pill roja "¿Cuánto va?".
- s03-precio (3.11 s): vuelve la app. "precio": recuadro verde sobre "$ 420". "antes": la etiqueta
  gira y queda verde "$ 420" + pill "Antes de confirmar". "Sin sorpresas": tilde verde en la etiqueta.
- s04-decidis (3.56 s): "sabés cuánto sale": burbuja gris "¿Cuánto sale?". "no preguntás": la
  burbuja se tacha y se va. "decidís": dedo que toca "Confirmar viaje", el botón pasa a "Viaje
  confirmado" con tilde y el auto avanza por la ruta.
- s05-pregunta (3.57 s): la pantalla se transforma en la web "tunegocio.com.uy" de una pastelería
  (tortas de 20 y 30 porciones, sin precio aún). "pregunta": pill crema con avatar "¿Cuánto sale?".
  "la misma": la etiqueta vuelve a "?" crema y se balancea.
- s06-consultar (2.79 s): "contestan: consultar": en las dos tarjetas aparece "Consultar" en gris,
  recuadro rojo; la etiqueta pasa a gris con "consultar". Push-in a la primera tarjeta.
- s07-precios (3.29 s): "precios a la vista": "Consultar" se cambia por precios verdes
  ($ 1.450, $ 1.990); la etiqueta pasa a verde "$ 1.450". "cotizador": sube la hoja "Armá tu
  torta" (slider, relleno, total). "calcula": el slider va de 20 a 30 porciones y el total cuenta
  hasta $ 1.990, la etiqueta también.
- s08-escribe (2.61 s): "decide solo": tilde junto al total. "escribe": dedo en "Pedir por
  WhatsApp", la pantalla pasa al chat con la burbuja verde del pedido. "comprar": pill "Para
  comprar" con tilde; la etiqueta con tilde.
- s09-sitio (2.61 s): la etiqueta se va; la pantalla en blanco se arma sola: barra con
  "tunegocio.com.uy", cabecera, tarjetas con precio verde, botón de WhatsApp. "tu sitio": pill
  verde "Tu sitio".
- s10-cta (6.14 s): arriba "Videollamada" / "gratis" (recuadro verde), el celular al 70 % en el
  medio con la videollamada (tu negocio + Scalerics), abajo "scalerics.com" grande en verde.
