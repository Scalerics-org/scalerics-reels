# por-que-concurrido · explicador "¿Por qué…?" (formato resultaaquee)

¿Por qué Google Maps sabe a qué hora está lleno un local? Porque usa la ubicación de la gente que
lo permite, junta y anónima, y mira patrones (fuentes en `fuentes.md`). Giro: vos tenés un dato
mejor, tus ventas: qué día y a qué hora vendés más, para poner más gente en la hora pico y no tener
a tres parados un martes a las 15. Producto: **sistema a medida** (panel de ventas por hora y día
con los turnos del equipo). Cierre: videollamada gratis en scalerics.com.

## Lo que cambia respecto de SPEC-base
- **Celular a pantalla completa**: el cuadro entero es la pantalla (lo pone `armar.mjs` en
  `#fondo`): navy claro `#16243d` liso, marco crema finito, isla, hora 13:05, batería verde,
  barrita de inicio. Sin estrellitas ni degradés (compresión de Instagram).
- **Un solo objeto protagonista**: una tarjeta crema grande (x 60-1020, y 540-1680, borde navy
  8 px, sombra plana) que cambia de pantalla: mapa genérico → gente con ubicación → barras por
  hora → (se da vuelta) caja de tu local → ventas por hora → equipo en caja → martes 15 h →
  panel con mapa de calor → turnos → videollamada.
- Nada de interfaz, logo ni colores de Google: mapa con manzanas y calles genéricas, pin verde de
  marca, barras navy con la pico en verde. La marca solo se nombra.
- Color con significado: verde `#5ce611` = pico, resuelto, a medida; rojo apagado `#c7655b` =
  "Lleno", "No adivina", los tres parados del martes; gris `#9aa1ad` = la hora floja.
- Subtítulos arriba al centro (1-3 palabras, 86 px, recuadro verde en la palabra clave, rojo en
  "adivina" y "parados"): los arma `armar.mjs`. Gancho (s01) y CTA (s10) sin subtítulos.
- Paleta: navy `#0b1220`, navy claro `#16243d` / `#1f3254`, crema `#efeee5`, blanco, verde
  `#5ce611` (sombra `#3fa60a`, escalones de calor `#c3e8a9` / `#8fdc5c`), rojo apagado `#c7655b`,
  gris `#9aa1ad`, mapa `#d9d7ca` / `#cfccbd` / `#c9e7b2`.

## Cómo se arma
Las escenas salen de `gen.mjs` (piezas compartidas: mapa, pin, barras, panel, personas, pills).
Después de tocarlo: `node gen.mjs && node armar.mjs`.

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
- s01-gancho (0-3.48): "¿Por qué Google / Maps sabe a qué / hora está lleno?" 104 px desde el
  cuadro 0 ("hora" y "lleno?" en verde) + mapa con el pin del local + hoja "Café de la esquina ·
  HORARIOS CONCURRIDOS" con 13 barras que crecen (pico verde) y chip rojo "Lleno" que late en
  "lleno".
- s02-ubicacion (3.48-5.82): la hoja baja, push-in al mapa entero; "ubicación": ocho puntos
  (gente) caminan por las calles al local; "la gente": tarjeta "Ubicación · SOLO SI LA PERSONA
  QUIERE"; "lo permite": el interruptor pasa a verde, pill "Si lo permite".
- s03-patrones (5.82-9.56): los puntos se vuelven caras; "Juntos": se juntan en el local (pill);
  "anónimos": las caras pasan a círculos grises (pill verde); "No adivina": "?" tachado en rojo;
  "mira patrones": el gráfico entero "Horarios concurridos · SÁBADO · PROMEDIO DE SEMANAS", dos
  semanas punteadas y el promedio en barras, pill "Mira patrones".
- s04-giro (9.56-12.54): "Pero": la tarjeta se da vuelta (scaleX) y es "Tu local · CAJA · VENTAS
  DE HOY", siete ventas con hora y tilde; "dato mejor": pill "Un dato mejor"; "Tus ventas": recuadro
  verde sobre la columna de horas y pill "Cada venta, con su hora".
- s05-diahora (12.54-14.93): las ventas caen a las barras de "Ventas por hora"; "Qué día": chip S
  verde y pill "Sábado"; "a qué hora": crecen seis barras (9 a 19 h); "vendés más": la de 13 h verde,
  pill "Hora pico".
- s06-pico (14.93-17.11): fila "EQUIPO EN CAJA" con una persona por bloque; "ponés más gente":
  dos personas verdes más en 13 h, pill "+2 en caja".
- s07-martes (17.11-19.59): chip pasa a M (martes), barras bajan, 15 h gris; "tres parados": tres
  personas rojas que se balancean en 15 h; "martes": recuadro rojo y pill "Martes 15 h".
- s08-panel (19.59-22.45): "Panel de tu local", mapa de calor 7 días × 6 bloques que se llena por
  columnas; "a medida": chip verde "A MEDIDA"; "panel": las celdas pico laten, pill "Tus horas
  pico"; queda resaltado el sábado.
- s09-turnos (22.45-26.18): la fila del sábado sube a la cabecera; "turnos": Ana 9 a 15, Bruno 11
  a 17, Caro 13 a 21, Diego 15 a 21 como barras; "equipo": laten las caras; "al lado": columna de
  13 h recuadrada, tres turnos en verde, pill "3 en la hora pico"; "¿Querés verlo…?": botón "Ver
  con mis ventas" y un dedo lo toca en "ventas".
- s10-cta (26.18-32.53): videollamada (cuadro grande "SCALERICS", cuadrito "VOS", botones de
  micrófono, cámara y llamar en verde); "Videollamada" 124 px blanco, "gratis" verde en recuadro,
  "scalerics.com" 116 px verde.
