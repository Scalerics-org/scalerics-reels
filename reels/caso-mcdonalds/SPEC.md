# caso-mcdonalds · caso de éxito (formato "resultaaquee")

Caso de éxito: el Speedee Service System de los hermanos McDonald. Gancho-pregunta en el cuadro 0
("¿Por qué McDonald's sale igual en cada local?"), la respuesta enseguida (rehicieron la cocina
como una línea: cada paso, siempre en el mismo orden), el giro ("el secreto no es la receta: es
que el cómo no vive en la cabeza de nadie, está escrito"), el puente al dueño ("¿en tu negocio,
eso lo sabés solo vos?") y el producto: sistema a medida (cada pedido sigue los mismos pasos:
pedido → preparación → entrega, y cada uno sabe qué le toca), para sumar gente o abrir otro local
sin desordenarse. Cierre: videollamada gratis en scalerics.com. Fuentes en `fuentes.md`.
McDonald's se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: hamburguesa,
plancha, bandeja, ficha y tablet genéricas con los colores de Scalerics.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, luz en diagonal
  con corte duro, sombra plana en el piso), que se transforma: hamburguesa → tres iguales (LOCAL
  1-2-3) → se desarma en capas → se achica y queda como el paso 3 de una línea de 4 estaciones
  sobre un mostrador → la línea se recorre en orden → ficha RECETA tachada → cabeza con los pasos
  adentro → los pasos salen y quedan en el manual "Cómo se hace" → tu negocio y el dueño con la
  burbuja de pasos → tablet "Tu sistema" → pedido #104 que recorre las columnas → dos locales con
  los mismos pasos → videollamada.
- Fondo navy oscuro `#0b1220` LISO (sin brillo radial: compresión de Instagram) con estrellitas
  tenues. Trazos de 6-8 px, textos de interfaz de 28 px para arriba.
- Paleta: navy `#0b1220`, `#16243d`, `#1f3254`, crema `#efeee5`, blanco, verde `#5ce611`
  (sombra `#3fa60a`, luz `#9df26a`); rojo apagado `#c7655b` solo para lo que está mal (la
  receta tachada, "En la cabeza", "Solo vos").
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px, palabra clave en recuadro verde
  (rojo para "receta" y "solo vos"). El gancho (s01) y "Agendá..." (s10) no llevan subtítulos.
- Las escenas NO se escriben a mano: salen de `gen.mjs`, con los tiempos de las palabras (`w(i)`).
  Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.9): "¿Por qué / McDonald's / sale igual / en cada local?" (104-148 px, "igual"
  en verde) desde el cuadro 0 + hamburguesa gigante. "igual": se achica y salen dos idénticas a
  los costados, rótulos LOCAL 1-2-3; al final vuelve a ser una sola, grande.
- s02-linea (3.9-7.38): "hermanos": rótulo 1948. "rehicieron": la hamburguesa se desarma en capas.
  "cocina": se arma, se achica y queda como el paso 3; entra el mostrador y las estaciones
  (plancha, pan con carne, hamburguesa, bandeja). "línea": números 1-4 con flechas, pill "Una línea".
- s03-pasos: el recuadro de selección salta estación por estación en "Cada", "paso", "siempre",
  "mismo"; tilde en cada una; "orden": pill "Siempre igual". Push-in suave.
- s04-receta: ficha RECETA (Pan, Carne, Queso, Lechuga, Salsa). "no es": se apaga, X roja apagada.
- s05-cabeza: cabeza de perfil con 4 tarjetas de pasos adentro ("cómo"). "cabeza": se apaga, pill
  roja "En la cabeza". "nadie": los pasos salen volando. "está escrito": entra el manual "Cómo se
  hace" (1 Tomar el pedido, 2 Preparar, 3 Revisar, 4 Entregar, con tildes), pill "Escrito".
- s06-vos: tu negocio (toldo verde/crema, TU NEGOCIO) con el dueño adelante. "eso": burbuja con los
  4 pasos saliendo del dueño. "solo vos": pill roja "Solo vos", la burbuja tiembla.
- s07-sistema: la burbuja se vuelve la tablet "Tu sistema" con PEDIDO · PREPARACIÓN · ENTREGA;
  "medida": chip verde A MEDIDA.
- s08-pedido: "cada pedido": entra el ticket #104 · Mesa 3. "sigue": pasa a PREPARACIÓN y entra
  #105; "pasos": #104 a ENTREGA; tildes. "cada uno": Ana, Luis y Sofi abajo de cada columna;
  "qué le toca": anillo verde y su tarea (Toma, Prepara, Entrega).
- s09-local: LOCAL 1 con pasos 1-2-3. "sumás gente": dos personas más. "abrís otro local": entra
  LOCAL 2 con los mismos pasos. "sin desordenarte": tildes y pill "Mismos pasos".
- s10-cta: los locales se juntan en la videollamada (TU NEGOCIO / Scalerics EQUIPO); "Agendá":
  "Videollamada", "gratis" (recuadro), "scalerics.com" en verde.

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

