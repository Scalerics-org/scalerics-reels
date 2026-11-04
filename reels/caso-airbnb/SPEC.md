# caso-airbnb · caso de éxito (formato "resultaaquee")

Caso de éxito: Airbnb en Nueva York (2009). Gancho-pregunta en el cuadro 0 ("¿Por qué Airbnb salió
a sacar fotos casa por casa?"), la respuesta enseguida (las reservas no despegaban; las fotos de
los anuncios eran malas: oscuras, sacadas con el celular; alquilaron una buena cámara y fueron
ellos, casa por casa), el giro ("no cambiaron las casas: cambiaron cómo se veían"), el dato con
fuente de los fundadores ("según contaron, lo que facturaban por semana se duplicó"), el puente
("tu cliente también compra con los ojos") y el producto: SITIO WEB (fotos claras, precios y un
botón a WhatsApp). Cierre: videollamada gratis en scalerics.com. Fuentes en `fuentes.md`.
Airbnb se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: cámara, cuarto, ficha
y celular genéricos con los colores de Scalerics.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, sombra plana en
  el piso, lado en sombra), que se transforma: cámara → tablero "Reservas · NUEVA YORK" → ficha del
  anuncio con foto oscura y borrosa (en abanico) → la foto en un celular apaisado → la cámara buena
  y tres casas → la misma foto con slider ANTES/DESPUÉS → barras x1 / x2 → ojo → (zoom a la
  pupila) web del comercio en el celular → videollamada.
- Fondo navy oscuro `#0b1220` LISO con estrellitas tenues (armar.mjs de caso-mcdonalds). Trazos
  de 6-12 px, textos de interfaz de 28 px para arriba.
- Paleta: navy `#0b1220`, `#16243d`, `#1f3254`, crema `#efeee5`, blanco, verde `#5ce611`
  (sombra `#3fa60a`, luz `#9df26a`); rojo apagado `#c7655b` solo para lo que está mal (la línea
  de reservas, "No despegan", "Fotos malas", "Oscura", "Con el celular", ANTES).
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px, palabra clave en recuadro verde
  (rojo apagado para "despegaban", "malas", "Oscuras"). El gancho (s01) y "Agendá..." (s10) no
  llevan subtítulos.
- La voz está acelerada un 9 % (atempo 1.09) y con los silencios largos recortados; los tiempos
  de 11 palabras se corrigieron a mano contra los silencios (palabras.json).
- Las escenas NO se escriben a mano: salen de `gen.mjs`, con los tiempos de las palabras (`w(i)`).
  Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.84): "¿Por qué Airbnb / salió a sacar / fotos / casa por casa?" (112-156 px,
  "fotos" en verde) desde el cuadro 0 + cámara gigante. "fotos": click y flash; "casa" y "casa":
  la cámara gira a un lado y al otro, flash en cada una.
- s02-reservas: tablero crema "Reservas" con chip NUEVA YORK. "reservas": se dibuja una línea roja
  apagada, plana. "no despegaban": el punto final intenta subir y se cae; pill "No despegan".
- s03-anuncio: el tablero se vuelve la ficha "Cuarto · Nueva York" (chip ANUNCIO) con la foto
  oscura y borrosa. "anuncios": dos fichas más en abanico. "fotos": selección roja en la foto;
  "malas": se sacude, pill "Fotos malas".
- s04-oscuras: la foto cae en un celular apaisado (inclinado). Etiqueta con guía "Oscura";
  "sacadas": tiembla la mano; "celular": etiqueta "Con el celular", click y flash.
- s05-camara: vuelve la cámara grande; "buena cámara": pill "Cámara buena". "fueron ellos": la
  cámara sube y se achica, entran tres casas; "casa / por / casa": la cámara va de una a otra,
  flash en las ventanas y tilde verde en cada una.
- s06-giro: la foto mala grande (ANTES). "casas": pill "Misma casa". "Cambiaron cómo se veían": un
  slider barre y descubre la misma foto, nítida y luminosa (DESPUÉS); pill "Otra foto".
- s07-duplico: pill mono "SEGÚN SUS FUNDADORES"; barra gris ANTES x1; "por semana": "Facturación
  por semana"; "se duplicó": crece la barra verde DESPUÉS al doble y "x2" gigante.
- s08-ojos: un ojo enorme se abre (iris verde). "también compra": el iris mira a los lados y en la
  pupila aparece una pantallita; pill "Antes de llegar". Al final, zoom a la pupila.
- s09-web: celular grande con la web "Tu negocio": foto clara de una torta, "Torta de la casa",
  "$ 690", botón "Pedir por WhatsApp"; chip "SITIO WEB · LO HACEMOS". Etiquetas con guía en
  "fotos claras", "precios" y "WhatsApp"; toque en el botón.
- s10-cta: el celular se achica y entra la videollamada (TU NEGOCIO / Scalerics EQUIPO);
  "videollamada", "gratis" (recuadro), "scalerics.com" en verde.

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

