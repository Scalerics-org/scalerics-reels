# caso-spotify · caso de éxito (formato "resultaaquee")

Caso de éxito: Spotify Wrapped. Desenlace primero ("¿Por qué Spotify te regala el resumen de lo
que escuchaste en el año? Cada diciembre, la gente lo comparte sola."), la lección (ya tenía tus
datos y te los devolvió como un regalo; un regalo así se muestra), el giro hacia el dueño ("vos
también sabés cosas de tus clientes") y Scalerics Puntos: en diciembre cada cliente recibe su
resumen (31 visitas, su favorito: el cortado) y un premio. Cierre: videollamada gratis.
Spotify se NOMBRA, pero no se dibuja su logo, su verde ni su tipografía: regalo, auriculares y
celular genéricos con los colores de Scalerics.

## Lo que cambia respecto de SPEC-base (manda sobre lo de abajo)
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, luz en diagonal
  con corte duro, cara lateral más oscura para el volumen, sombra plana en el piso), que se
  transforma: regalo → celular "Tu año" → auriculares → fichas de datos → regalo → celular que se
  comparte → cliente con su cortado → celular con Scalerics Puntos → resumen del cliente → cupón
  de premio → celular que gira y es la videollamada.
- Fondo navy oscuro `#0b1220` liso con un brillo radial chico y estrellitas tenues (fondo de este
  reel en la tanda: navy oscuro con objetos llenos).
- Paleta: navy `#0b1220`, `#16243d`, `#1f3254`, crema `#efeee5`, blanco, verde `#5ce611`
  (sombra `#3fa60a`, cara de arriba `#9df26a`). Sin rojo: no hay "problema" en este reel.
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px, la palabra clave en recuadro
  verde (`armar.mjs` de por-que-la-tarjeta). El gancho (s01) y "Agendá..." (s12) no llevan
  subtítulos: tienen el texto grande en la escena.
- Las escenas NO se escriben a mano: salen de `gen.mjs`, con los tiempos tomados de las palabras
  (`w(i)`). Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.95): "¿Por qué Spotify / te regala / tu año?" a 112-156 px desde el cuadro 0
  + regalo verde gigante en 3/4. La tapa tiembla en "regala" y "resumen"; en "escuchaste" se
  levanta y salen tres notas musicales verdes; al final la tapa se abre (match con s02).
- s02-comparte: la tapa vuela, del regalo sale el celular "TU AÑO EN MÚSICA" (arte verde con
  auriculares, "Tu año", ranking 1-2-3, botón Compartir). "diciembre": cae la etiqueta de
  calendario DICIEMBRE. "la gente": seis círculos de historias con anillo verde que se cargan;
  "comparte": a cada uno se le pega su mini resumen.
- s03-datos: auriculares gigantes (vincha crema, copas verdes) con ondas. "tenía": pill "Lo que
  escuchaste". "datos": salen fichas MIN, #1, TOP 5 y caen en la ficha TUS DATOS.
- s04-lista: tres fichas grandes que caen en cada "tus": MINUTOS ESCUCHADOS (contador hasta
  18.240, reloj), CANCIONES (barras 1-2-3, disco que gira), ARTISTA ("Tu nº 1", estrella).
- s05-regalo: las fichas se achican y entran al regalo; "como": se cierra la tapa, salta el moño;
  "regalo": pill "Para vos".
- s06-muestra: el regalo se vuelve el celular "Tu año"; un dedo aprieta Compartir (pill), y en
  "muestra" salen cuatro copias a los costados con corazones.
- s07-giro: cliente (silueta crema) en el mostrador con su cortado. "sabés": pill "Cuántas veces
  vino"; "cosas de": pill verde "Qué lleva siempre" sobre la taza.
- s08-puntos: celular con Scalerics Puntos (tarjeta verde con sellos 7/10, "Hola, Laura", tildes).
  "Scalerics": pill "Scalerics Puntos". "diciembre": cae la hoja de calendario DIC.
- s09-llega: "cada uno": salen dos celulares más a los costados; "recibe": a todos les llega el
  aviso "Tu año con nosotros".
- s10-visitas: pantalla TU AÑO EN EL CAFÉ: contador 0 → 31 "visitas" y 31 puntos verdes que se
  llenan; pill "Visitas".
- s11-favorito: la pantalla cambia a TU FAVORITO: taza en el arte verde, "Cortado" con recuadro
  de selección; "premio": cupón verde "PREMIO · Un cortado de regalo".
- s12-cta: el celular gira y es la videollamada (TU LOCAL / Scalerics EQUIPO); "Videollamada",
  "gratis" (recuadro), "scalerics.com" en verde.

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

