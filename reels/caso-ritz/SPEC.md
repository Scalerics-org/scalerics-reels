# caso-ritz · caso de éxito (formato "resultaaquee")

Caso de éxito: el Ritz-Carlton y las preferencias del huésped. Gancho-pregunta en el cuadro 0
("¿Por qué el Ritz-Carlton se acuerda de tu almohada?"), la respuesta enseguida (porque alguien la
anotó: el personal anota lo que prefiere cada huésped y queda en el sistema de la cadena; volvés,
incluso a otro hotel, y ya lo saben), el giro ("lo que sabe un empleado, lo sabe toda la empresa"),
el puente al dueño ("tu mejor vendedor sabe qué le gusta a cada cliente. ¿Y si mañana no viene?") y
el producto: CRM (cada cliente con su ficha, a la vista de todo el equipo). Cierre: videollamada
gratis en scalerics.com. Fuentes en `fuentes.md` (sin años, sin cifras, sin el nombre del sistema).
Ritz-Carlton se NOMBRA, pero no se dibuja su logo, sus colores ni su tipografía: almohada, cama,
hoteles y tarjetas genéricos con los colores de Scalerics.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, sombra plana en el
  piso, bordes crema de 6-8 px), que se transforma: almohada sobre la cama → se achica y queda de
  ícono en la tarjeta PREFERENCIAS (un lápiz anota tres filas) → la tarjeta entra al SISTEMA y se
  reparte a tres hoteles → push-in al hotel de la derecha, se prende una ventana → la habitación con
  la almohada lista y la tarjeta → un empleado con la tarjeta → los nueve de la empresa → TU NEGOCIO
  → tu mejor vendedor con lo que sabe de cada cliente → no viene (hueco rojo, calendario MAÑANA) →
  CRM con los clientes → ficha de Ana a la vista de tres del equipo → videollamada.
- Fondo navy OSCURO `#0b1220` LISO (sin brillo radial) con estrellitas tenues.
- Paleta: `#0b1220`, `#2b4573`, `#355489`, crema `#efeee5` (sombra `#b9b7a8`), blanco, verde
  `#5ce611`; rojo apagado `#c7655b` solo para "no viene".
- Subtítulos arriba al centro, 1 a 3 palabras (cortes "auto"), Lexend 700 86 px, palabra clave en
  recuadro verde (rojo para "viene?"). El gancho (s01) y "Agendá..." (s10) no llevan subtítulos.
- Voz Orus sin acelerar (29.8 s). En `palabras.json` se corrigió a mano el inicio de "¿Y" (18.55).
- Las escenas NO se escriben a mano: salen de `gen.mjs`, con los tiempos de las palabras (`w(i)`).
  Lo que se mueve y escala tweenea el atributo `transform` (helper `pl()`). Después de tocarlo:
  `node gen.mjs && node armar.mjs`.

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



## Escenas
- s01-gancho (0-2.83): "¿Por qué el / Ritz-Carlton se / acuerda de tu / almohada?" (104-140 px,
  "almohada?" en verde) desde el cuadro 0 + almohada gigante sobre la cama, "zz" verdes. "almohada":
  la palabra y la almohada saltan.
- s02-anota (2.83-6.10): la cama se va; la almohada se achica hasta el ícono de la primera fila de la
  tarjeta PREFERENCIAS (cabecera verde). "anotó": el lápiz escribe "FIRME" y tilde. "personal":
  pill "El personal anota". "prefiere cada huésped": filas Cama/GRANDE y Mesa/JUNTO A LA VENTANA.
- s03-sistema (6.10-8.23): la tarjeta se achica dentro del panel SISTEMA. "sistema": tres hoteles
  abajo. "cadena": rutas verdes y pulsos a cada hotel, se prende una ventana; pill "Toda la cadena".
- s04-otro-hotel (8.23-11.11): el hotel de la derecha pasa al frente, grande; "volvés": llega una
  valija verde. "otro hotel": pill. "y ya lo saben": se prende la ventana, push-in, la habitación
  con la almohada y la tarjeta encima, tilde grande y pill "Ya lo saben".
- s05-empresa (11.11-14.73): un empleado grande con la tarjeta; "empleado": pill "Un empleado".
  "lo sabe toda la empresa": se achica al centro, líneas verdes a ocho más, cada uno con la tarjeta;
  pill "Toda la empresa".
- s06-vendedor (14.73-18.55): "negocio": la tienda TU NEGOCIO (toldo verde y crema). "tu mejor
  vendedor": push-in por la puerta, el vendedor grande con estrella verde, pill. "gusta a cada
  cliente": tres globos "Ana · talle M", "Luis · sin azúcar", "Sofía · los viernes".
- s07-no-viene (18.55-20.44): "mañana": calendario MAÑANA con cruz roja. "no viene": el vendedor se
  va, queda un hueco punteado rojo; los globos se apagan y se caen; pill roja "No viene".
- s08-crm (20.44-22.16): panel crema CRM · CLIENTES con Ana, Luis y Sofía. "CRM": el título salta y
  cada uno muestra su preferencia en un chip verde.
- s09-ficha (22.16-25.41): el panel gira y es la FICHA DEL CLIENTE de Ana Méndez. "ficha":
  recuadro de selección y los datos (prefiere talle M, última compra campera, escribirle el
  viernes). "a la vista de todo el equipo": tres del equipo debajo con tilde; pill "Todo el equipo".
- s10-cta (25.41-fin): la ficha se vuelve la videollamada (TU NEGOCIO / Scalerics EQUIPO);
  "videollamada" / "gratis" (recuadro) / "scalerics.com" en verde.
