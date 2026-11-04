# caso-duolingo · caso de éxito, explicador estilo @resultaaquee

Por qué Duolingo te recuerda todos los días que practiques: porque querer no alcanza, la gente se
olvida. Te avisa cada día, te muestra la racha y midió millones de avisos para ver cuál hace volver
(lo publicó en un paper, KDD 2020). Giro: no te obliga, te acuerda; tu cliente tampoco falta porque
no quiere: se olvida. Lección para la pyme: automatizaciones que recuerdan solas el turno, la cuota y
la seña, con un aviso amable justo a tiempo. Producto: Automatizaciones. Cierre: videollamada gratis
en scalerics.com. Fuentes en `fuentes.md`.
Recurso central: el CELULAR con la notificación que se transforma: celular bloqueado → ganas que se
apagan → racha (llama verde) → tres avisos medidos → candado que se vuelve campana → ficha del
cliente → tres recordatorios → chat del local con el aviso automático → agenda con "Avisado" → videollamada.

## Lo que cambia respecto de SPEC-base (manda esto)
- Fondo CREMA `#efeee5` liso. Objetos RELLENOS navy `#0b1220`/`#16243d`/`#1f3254`, verde `#5ce611`
  (lado oscuro `#3fa60a`), blanco, crema oscuro `#dcdacb` para cantos, sombra plana. Rojo apagado
  `#c7655b` solo para olvidarse, faltar y obligar. Gris `#b4b2a3`.
- Duolingo se nombra, no se dibuja: ni búho, ni logo, ni su verde, ni su tipografía, ni su llama
  naranja. "App de idiomas" genérica (cuadrado verde Scalerics con globo "Aa"), llama verde de marca.
- Subtítulos arriba al centro, Lexend 700 86 px navy, palabra clave en recuadro verde (rojo para
  olvidás, obliga, olvida). El gancho (s01) y el CTA (s10) no llevan subtítulos (subDesde 10,
  subHasta 72). `armar.mjs` copiado de caso-starbucks.
- Voz Orus acelerada con atempo 1.07 (34.0 s → 31.8 s); palabras.json reajustado a mano por frases
  con los silencios medidos (silencedetect), porque Speech-to-Text desfasaba varias frases.
- Trazos 7-16 px, textos de interfaz desde 28 px. Zona de dibujo y 560-1700.

## Cómo se arma
Las escenas salen de `gen.mjs`. Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.84): cuadro 0 con "¿Por qué Duolingo / te recuerda / todos los días / [que
  practiques?]" a 100-112 px y el celular bloqueado (19:30) con la notificación "¿Practicamos hoy?".
  "todos los días": cae otra ("Seguí con tu racha") y vibra; "practiques": vibra y late el recuadro.
- s02-olvidas (3.84-7.06): tarjeta GANAS DE APRENDER "Este año, inglés" con barra; "querer": se
  llena a 100 %; "no alcanza": pill navy; pasan siete días vacíos (cuadros punteados) y la barra se
  apaga a gris 12 %; "olvidás": días en rojo y pill roja "Me olvidé".
- s03-racha (7.06-10.08): celular gigante; "avisa": cae la notificación y vibra; "cada día": late;
  "muestra": pantalla de racha (llama verde, "12 días seguidos", semana con tildes); "racha": se tilda
  el domingo, el número sube a 12 y la llama late.
- s04-midio (10.08-13.32): "millones": lluvia de avisos chicos; "avisos": quedan tres tarjetas
  grandes AVISO A/B/C con barras; rótulo "LO PUBLICÓ EN UN ESTUDIO"; "ver cuál": las barras se miden;
  "te hace volver": gana B (verde, tilde) y pill "Este te hace volver".
- s05-giro (13.32-15.59): EL GIRO, sin texto grande (lo dicen los subtítulos). Candado gigante;
  "obliga": sacude, recuadro rojo, cruz y pill "Obligar"; "acuerda": el candado gira y se vuelve una
  campana verde que suena (ondas), pill verde "Acordar".
- s06-cliente (15.59-19.46): la campana se vuelve la ficha TU CLIENTE · Laura; "no falta": chip rojo
  "Faltó" en el turno del martes; "no quiere": fila "¿No quería venir? Sí quería"; "Se olvida":
  globo "¡Uy, me olvidé!".
- s07-lista (19.46-21.77): tres tarjetas que entran en cada palabra: El turno (calendario, "Mañana,
  10:00"), La cuota (recibo, "Vence el viernes"), La seña (billete, "Falta confirmar").
- s08-aviso (21.77-25.20): las tarjetas se meten en un celular con el chat "Tu local"; "aviso
  amable": burbuja verde "Hola, Laura. Te esperamos mañana a las 10:00. ¿Confirmás?"; "justo a
  tiempo": chip "HOY · UN DÍA ANTES" y reloj que gira; "sin mandarlo vos": pill "Automático"; Laura
  contesta "¡Sí, ahí estoy! Gracias".
- s09-scalerics (25.20-27.11): AGENDA DE HOY · Tu local con tres filas que se tildan "Avisado";
  "Scalerics": etiqueta blanca con el logo pegada encima.
- s10-cta (27.11-34.99): "¿Querés verlo / en tu [local?]" grande; la agenda se va y entra la
  videollamada (TU LOCAL / Scalerics); "Videollamada", "gratis" (recuadro) y "scalerics.com" en
  pill verde grande. ~3 s quieto al final.

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

