# Reel "Dos gimnasios": spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
punto 6 de CLAUDE.md), con la fuerza visual del punto 7 y los subtítulos del formato estrella
(arriba al centro, 1 a 3 palabras, recuadro verde; rojo apagado para lo que está mal).
Producto: **CRM** (ver quién bajó la frecuencia y escribirle a tiempo). Una sola voz: Orus
(acelerada a 1.07 con ffmpeg atempo). Voz 34.0 s; total 37.2 s. 92 palabras.

Historia: gancho "Dos gimnasios en la misma cuadra. Uno se da cuenta cuando dejás de ir." Sofía se
anota en los dos (Fuerza e Impulso, inventados): tres veces por semana, después dos, después
ninguna. A la izquierda (Fuerza) su ficha vive en una planilla y nadie lo nota. A la derecha
(Impulso) el CRM avisa: Sofía viene menos. Le llega un mensaje con su nombre ("Sofía, ¿todo bien?
Te guardamos lugar el jueves."), y el jueves vuelve. GIRO: los dos tienen buenas máquinas y buenos
profes; uno además se acuerda de cada socio. "Ese CRM lo armamos a tu medida." Cierre: videollamada
gratis en scalerics.com. Sin cifras (los 3/2/0 son la historia de Sofía, no estadísticas).

Distinto de `dos-cafeterias` (Puntos, tarjeta de sellos y aviso de premio): acá es la ficha del
socio, la frecuencia y el seguimiento personal (CRM).

## Recurso visual central
- Fondo navy claro `#16243d` LISO (armar.mjs local, copiado de dos-restaurantes con ese color).
  Paneles e interfaces en navy oscuro `#0b1220` con borde crema de 6 px, para que se despeguen.
- Dibujos de líneas grandes (trazo 7 px): dos fachadas de gimnasio de 430 px de ancho, con pesas en
  la vidriera. Fuerza en gris `#8a96ab`, Impulso en crema con franja y pesas verdes.
- Interfaz recreada a pantalla completa: calendario de asistencia, planilla "socios.xlsx", panel
  CRM con barras de visitas por semana y alerta, chat en un celular de 660x1040, grilla de 12 fichas
  de socios, laptop con "TU GIMNASIO · CRM" y una cinta de medir verde.
- Todas las escenas salen de `gen.mjs`: correr `node gen.mjs && node armar.mjs`.
- `reel.json`: `subDesde` 14 (el gancho está en grande en s01), `subHasta` 86 (el CTA tiene su
  texto grande), cortes a mano, `malo` = ninguna, planilla, Nadie, menos.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-4.50): cuadro 0 con el gancho entero (Lexend 800, 92/110/104 px, "cuando dejás
  de ir." en verde) y las dos fachadas ya dibujadas. En "Uno" (2.3) titila la vidriera de Impulso y
  Fuerza baja a 0.45; pills "Te escribe" (3.2, verde lleno) y "Ni se entera" (3.6, roja).
- **s02-sofia** (4.50-9.68): ficha "Sofía · socia desde enero" con chips FUERZA e IMPULSO (en "dos");
  calendario "Asistencia de Sofía": semana 1 tres tildes verdes ("Tres", 1.67) y "3"; semana 2 dos
  tildes y "2" (3.0-3.3); semana 3 los círculos se ponen rojos ("ninguna", 3.94), "0" rojo, flecha
  roja que baja, temblor y pill "Ninguna".
- **s03-planilla** (9.68-13.37): "FUERZA · SIN CRM". Planilla "socios.xlsx" de 980 px con 15 socios;
  en "ficha" (1.1) recuadro rojo en la fila de Sofía y "vencida" en rojo; "Una fila más"; en "Nadie"
  (2.55) la lista sube y Sofía se pierde, pill roja "Nadie lo nota".
- **s04-crm** (13.37-17.27): "IMPULSO · CON CRM". Panel CRM: ficha de Sofía y barras de visitas por
  semana (S1-S3 verdes, S4-S5 crema, S6 vacía punteada en rojo) que crecen en "CRM"; en "avisa"
  (1.6) cae la alerta verde "AVISO · Sofía viene menos" con la campana; en "Sofía viene" se dibuja
  la tendencia roja y un recuadro sobre las barras que bajan.
- **s05-mensaje** (17.27-21.81): celular grande con el chat de "Gimnasio Impulso": "escribiendo"
  (0.5), el mensaje aparece palabra por palabra con la voz ("Sofía," en verde) y pill "Con su
  nombre"; en "jueves" tarjeta "Clase funcional · Jueves 19:00 · Tu lugar"; respuesta "¡Ahí voy!".
- **s06-vuelve** (21.81-23.41): hoja de calendario gigante "JUEVES" con un tilde verde que se dibuja
  en "vuelve", "Sofía 19:00" y pill "Volvió".
- **s07-iguales** (23.41-25.50): vuelven las dos fachadas, ahora las dos en crema; tildes
  "Máquinas" (0.99) y "Profes" (1.79) en las dos, "=" verde en el medio.
- **s08-se-acuerda** (25.50-28.40): grilla de 12 fichas de socios (Sofía primero, con borde verde)
  con su estado ("Volvió", "Cumple el 12", "Quiere pilates"...); en "acuerda" un tilde verde en
  cada una; pill "Se acuerda de cada uno".
- **s09-medida** (28.40-31.12): laptop con "TU GIMNASIO · CRM" y cuatro socios con estado; en
  "armamos a tu medida" se despliega una cinta de medir verde y pill "A tu medida".
- **s10-cta** (31.12-37.24): la laptop se achica y se vuelve la videollamada (TU GIMNASIO ·
  Scalerics); "Videollamada" (0.45), "gratis" con recuadro (0.68), "scalerics.com" verde (1.68);
  queda ~4 s quieto respirando.

---

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

