# Reel "Te buscaron": spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Producto: **sitio web** (rápido en el celular, con horario, ubicación y botón a WhatsApp). Formato G,
**simulación de pantalla**: el cuadro entero es un celular de marca y la historia la cuenta la
interfaz (buscador genérico sin logos ni colores de Google; nombrarlo en la voz está bien).
Voz Orus sola, 54.3 s; total 57.5 s.

Historia: gancho "Te buscaron en Google. ¿Qué encontraron?". Martes 21:00, Martina busca
"veterinaria cerca" porque su gato se comió una media. Aparece tu veterinaria (Veterinaria del
Prado, inventada), primera de la lista: dice "Cerrado · cierra a las 18:00" (vos cerrás a las 22: el
horario es de hace tres años), una sola foto borrosa de la cortina baja, sin página web; llama y
suena, suena: vos estás con un perro en la camilla (el dueño queda bien parado: está trabajando).
Más abajo, la otra (Veterinaria Los Robles, inventada): página que abre al toque, abierto hasta las
23, cómo llegar, botón de WhatsApp; Martina toca, le contestan, va en camino. GIRO: seguro atendés
tan bien como ellos, o mejor (= que pasa a ≥ con una estrella verde sobre tu local); la primera
impresión ya no la das vos, la da el celular. Scalerics hace sitios web rápidos en el celular, con
tu horario, tu ubicación y tu WhatsApp a un toque: el sitio de Del Prado se arma con TU horario
real (22:00, callback de s04). Cierre: tu resultado ahora en verde, "ESTE SOS VOS", y la barra
tipea "tu negocio" (callback de s01). CTA: "Buscate ahora en el celular y contanos qué encontraste."

## Recurso visual central: el celular a pantalla completa + color con significado
- `compositions/ambiente.html` (debajo de las escenas): marco crema finito redondeado, isla, barra
  de estado con la hora de Martina (21:00 → 21:01 en "llama" 21.35 → 21:02 en "Martina toca"
  35.08), batería verde, rótulo mono "BÚSQUEDA · CERCA DE VOS" que en "Hacemos" (44.02) pasa a
  "TU NEGOCIO · EN EL CELULAR" en verde, línea finita y barrita de inicio abajo.
- **Lo que está mal** = rojo apagado `#b8574e` (texto `#d27a6e`) y gris `#7c8698`/`#8f99aa`:
  "Cerrado", el horario viejo, la foto borrosa, "Sitio web: no tiene" (chip punteado), el teléfono.
- **Lo resuelto** = verde de marca `#5ce611`: "Abierto", el sitio, el botón de WhatsApp (relleno
  verde con texto navy `#07111f`), la ruta, "ESTE SOS VOS".
- Crema `#efeee5` para textos y dibujos de líneas (gato, veterinaria con estetoscopio verde,
  perro, camilla, fachadas).
- Subtítulos karaoke arriba (molde) con acento verde y, nuevo, clase `malo` en rojo apagado
  (`reel.json` → `"malo"`; el `armar.mjs` local lo pinta `#d27a6e`).

## Zona y piezas fijas
- Barra de estado y 40-180 (ambiente). Subtítulos desde y 236. Escenas entre y 560 y 1600.
  Etiqueta mono verde (o roja `.mal`) en top 1612. Logo en y ~1746.
- Barra de búsqueda: x 90-990, y 600-696, pill. Tarjeta de resultado: x 90-990, top 740, 420 alto
  (miniatura 220x220, título Lexend 600 42, sub mono 26, estado Lexend 500 32, web mono 26, tres
  chips "Llamar · Cómo llegar · Sitio web"). s03, s04 y s05 la comparten en la misma posición
  (corte sin blur entre ellas).
- Sitio web (s08 y s11, mismo layout): barra de URL con candado verde (losrobles.uy / delprado.uy,
  inventados), cruz verde + nombre, pill "Abierto hasta las ...", mapa de calles con ruta punteada
  y pin verde, botón verde "Escribinos por WhatsApp" con onda de toque.
- Las escenas se generan con un script (gen.mjs) con helpers comunes: `dibujar()`, `pop()`,
  `sube()`, `etiqueta()`, `tipear()` (letras con display), `titila()`, `toque()`.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-2.49): cuadro 0 con la barra ya visible; se tipea "tu negocio"; en "Google"
  (0.60) brilla el borde; tres esqueletos de resultado grises con brillo de carga; en
  "encontraron" (1.30) un "?" gigante crema cae y se balancea; esqueletos se apagan.
- **s02-martina** (2.49-8.34): "MARTES / 21:00" gigante (Lexend 200); en "Martina" (1.31) el reloj
  se va y aparece la barra con "MARTINA BUSCA"; en "veterinaria" (2.41) se tipea "veterinaria
  cerca", dos sugerencias grises; en "gato" (4.31) se dibuja el gato sentado de ojos culpables; en
  "media" (5.11) la media le cuelga de la boca (rayas verdes) y se balancea. Etiqueta "Urgencia felina".
- **s03-resultado** (8.34-11.23): la tarjeta de tu veterinaria sube; chip verde "TU VETERINARIA"
  en "tu" (0.36); dos resultados fantasma abajo; en "Primera" (1.66) el círculo "1".
- **s04-horario** (11.23-17.51): "Cerrado" en rojo en "cerrado" (0.65) con temblor y borde rojo;
  "· Cierra a las 18:00"; en "Vos" (2.37) fila DICE 9 a 18 h; en "diez" (3.57) fila ABRÍS 9 a 22 h
  en verde y tachado rojo del 9 a 18; en "horario" (4.37) sello "Actualizado hace 3 años".
- **s05-foto** (17.51-21.35): la miniatura crece a foto grande borrosa de la cortina baja (la
  cortina rebota en "baja" 1.49); en "Página" (2.14) vuelve a la tarjeta y aparece "Sitio web: no
  tiene"; el chip punteado tiembla en "ninguna" (3.12).
- **s06-llama** (21.35-25.95): pantalla de llamada "LLAMANDO... Veterinaria del Prado", ícono de
  teléfono, botón rojo apagado; ondas y temblor en cada "suena" (1.24, 1.55); en "Vos" (2.46) la
  llamada se achica arriba y se dibuja la veterinaria (vos) con estetoscopio verde, el perro en la
  camilla (colita en "perro" 3.15) y el celular vibrando en el mostrador.
- **s07-otra** (25.95-30.55): la lista scrollea: tu resultado en mini (gris/rojo) y la tarjeta de
  Los Robles con "Abierto · Cierra a las 23:00", foto nítida y chip "Sitio web" verde (borde verde
  en "otra" 0.75); en "página" (2.25) se toca el chip; en "Abre" (3.04) barra de carga verde
  instantánea y "CARGÓ AL TOQUE".
- **s08-pagina** (30.55-35.08): el sitio de Los Robles: "Abierto hasta las 23:00" (pulso en
  "once" 0.55), mapa con ruta y pin en "Cómo" (1.47), botón WhatsApp en "botón" (2.25) y toque en
  "escribinos" (2.99).
- **s09-camino** (35.08-38.30): chat genérico (sin marca): "¡Hola! Mi gato se comió una media.
  ¿Lo puedo llevar ya?", escribiendo..., "¡Sí! Traelo ahora, te esperamos. ✓✓" en "contestan"
  (1.12); en "camino" ruta verde que llega al pin. EN CAMINO.
- **s10-giro** (38.30-44.03): las dos fachadas de líneas (DEL PRADO y LOS ROBLES); "=" en "bien"
  (0.70) que pasa a "≥" verde con estrella sobre la tuya en "mejor" (1.60); en "Pero" (2.37) entra
  un celular grande por delante con tu resultado gris/rojo y "PRIMERA IMPRESIÓN"; vos quedás
  chiquito al costado (4.10); en "celular" (5.00) el celular late con borde rojo.
- **s11-sitio** (44.03-49.65): TU sitio (delprado.uy): carga instantánea y chip "RÁPIDO" en
  "rápidos" (0.87); "Abierto hasta las 22:00" en "horario" (2.67); mapa en "ubicación" (3.27);
  botón WhatsApp en "WhatsApp" (4.17) y toque en "toque" (4.97).
- **s12-cta** (49.65-57.53): tu resultado, ahora verde (abierto 22:00, foto nítida, delprado.uy),
  "ESTE SOS VOS" en "parezca" (1.25); en "Buscate" (2.23) la barra se pone verde y tipea "tu
  negocio"; en "contanos" (3.45) la caja "COMENTARIOS · ¿Qué encontraste?" y debajo el "?" del
  gancho; queda ~3.5 s con movimiento suave.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá la zona es y 560-1600 y hay UI de celular con rojo apagado y gris).

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

