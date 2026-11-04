# por-que-el-service · serie "¿Por qué…?" (formato resultaaquee)

Explicador: por qué la concesionaria sabe cuándo te toca el service (tiene tu ficha: auto, fecha
de compra, kilómetros, último service; el próximo toca por km o por tiempo; el sistema hace la
cuenta y avisa solo). Giro: tu negocio también tiene clientes con "service" (corte de pelo,
lentes, comida del perro). Producto del cierre: CRM. Cierre: videollamada gratis en scalerics.com.
Fuentes en `fuentes.md`. Sin marcas de autos (auto genérico verde de marca).

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena, colores planos, canto oscuro y
  sombra plana. Se transforma: auto → entra a la foto de la ficha → push-in a los km → odómetro +
  tira de tiempo → celular con el aviso → la notificación se aplana y es el cartel de TU NEGOCIO →
  tijera → lentes → bolsa de alimento → seis clientes con "?" → se juntan en la ficha de Lucía (la
  misma ficha que la del auto: paralelo visual) → la ficha entra a la videollamada.
- Fondo navy claro `#16243d` LISO (sin brillo ni estrellas, por la compresión de Instagram).
  Paneles oscuros `#0b1220`, `#1f3254`; crema `#efeee5`, blanco, verde `#5ce611` / `#3fa60a`;
  rojo apagado `#c7655b` solo para "¿Se acuerda de vos?" y los "?" de los clientes.
- Subtítulos arriba al centro (1 a 3 palabras, 86 px, recuadro verde de selección en la palabra
  clave, rojo en "acuerda"), de `armar.mjs` (versión de por-que-la-tarjeta con fondo cambiado).
  El gancho (s01, palabras 0-9) y "Videollamada gratis scalerics.com" (s09) no llevan subtítulo.
- Las escenas salen de `gen.mjs`: `node gen.mjs && node armar.mjs`.

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
- s01-gancho: cuadro 0 = "¿Por qué la / concesionaria / sabe cuándo / te toca / el service?" a
  112 px ("service?" verde) y el auto verde de costado entrando con las ruedas girando. Sale el
  título a 3.1; "No se acuerda": pill "¿Se acuerda de vos?" con línea guía, tachada en rojo.
- s02-ficha: el auto se achica y sube a la foto de la "Ficha del cliente" (cartón crema,
  encabezado verde). Filas con tilde: AUTO Sedán 1.6 (auto), COMPRADO 14/03/2025 (día),
  KILÓMETROS contador 0 → 18.200 (kilómetros), ÚLTIMO SERVICE (último service) con recuadro y
  pill "Tu historial". Push-in a los km.
- s03-proximo: odómetro grande (18.200 → 19.650 km, barra hacia "Próximo: 20.000") y tira de
  meses "Tiempo" (barra hacia "Próximo: 03/2027"), una "o" verde entre los dos, "Lo que llegue
  primero". Se juntan hacia el centro.
- s04-aviso: celular grande; anillo de "PRÓXIMO SERVICE" que llega a 100 % (hace la cuenta); cae
  la notificación "CONCESIONARIA · AHORA / Te toca el service / Elegí día y hora" (avisa) y pill
  "Sale solo, a tiempo".
- s05-giro: la notificación se aplana en el cartel "TU NEGOCIO"; fachada, tres clientes (clientes)
  y un relojito verde junto a cada uno (service); pill "Clientes con service".
- s06-ejemplos: tijera (corte de pelo, "Le toca el 28/11") → lentes ("Le toca en marzo") → bolsa
  de ALIMENTO 15 KG con huella ("Le toca el 15/11").
- s07-pregunta: seis fichas de cliente oscuras y un "?" rojo apagado en cada una; se juntan.
- s08-crm: ficha de Lucía (avatar, "Clienta desde 2024"): QUIÉN ES, QUÉ COMPRÓ, CUÁNDO
  ESCRIBIRLE "Esta semana" con recuadro; burbuja "Hola Lucía, ¿te separo la bolsa de siempre?".
- s09-cta: la ficha se achica dentro de la videollamada (TU NEGOCIO / Scalerics EQUIPO / botón de
  cámara); "Videollamada / gratis / scalerics.com".
