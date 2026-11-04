# Reel "Dos inmobiliarias": spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
punto 6 de CLAUDE.md), con la fuerza visual del punto 7 y los subtítulos del formato estrella
(arriba al centro, 1 a 3 palabras, recuadro verde; rojo apagado para lo que está mal).
Producto: **agente de IA** (contesta al instante con los datos del inmueble, pregunta lo justo y
agenda la visita en el calendario del corredor). Una sola voz: Orus (recortada y acelerada a 1.08
con ffmpeg atempo). Voz 33.7 s; total 36.9 s. 95 palabras.

Historia: gancho "Dos inmobiliarias en la misma calle. El domingo a la noche, una ya agendó tres
visitas." Domingo 21:30 entran consultas por un apartamento de 2 dormitorios: "¿Sigue disponible?",
"¿Aceptan mascotas?", "¿Puedo verlo el martes?" (Laura, Martín, Paula, inventados). A la izquierda
(Rodríguez Propiedades, inventada) esperan al lunes; el lunes a las 10:00 contestan y dos ya vieron
otro. A la derecha (Costa Propiedades, inventada) un agente de IA contesta al toque con los datos
del apartamento, pregunta cuándo y cuántos, y agenda la visita. El lunes el corredor tiene tres
visitas listas y la conversación para él. GIRO: los dos tienen los mismos apartamentos, y descansar
está bien (la fachada de Rodríguez pasa de gris a crema, con tilde: no hizo nada mal); la
diferencia es quién contestó mientras tanto. Cierre: videollamada gratis en scalerics.com. Sin
cifras (las tres visitas son de la historia, no estadísticas).

## Recurso visual central
- Fondo navy claro `#16243d` LISO (armar.mjs local, copiado de dos-gimnasios). Paneles en navy
  oscuro `#0b1220` con borde crema de 6 px.
- Dibujos de líneas grandes (trazo 7 px): dos fachadas de inmobiliaria de 440 px de ancho con
  cartel "RODRÍGUEZ / COSTA · PROPIEDADES", vidriera con 4 avisos (casitas) y puerta. Rodríguez en
  gris `#8a96ab`, Costa en crema con franja y avisos verdes. Luna para la noche del domingo.
- Interfaz recreada grande: avisos de consulta, celular de 740-760 x 1040-1090 con chat (cabecera
  verde de Costa / gris de Rodríguez), lista de chats del lunes con cruces rojas, calendario del
  corredor con el turno verde, agenda de tres visitas con tildes, dos celulares lado a lado.
- Todas las escenas salen de `gen.mjs`: correr `node gen.mjs && node armar.mjs`.
- `reel.json`: `subDesde` 16 (el gancho está grande en s01), `subHasta` 89 (el CTA tiene su texto
  grande), cortes a mano, `malo` = esperan, lunes, diez, otro.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-4.50): cuadro 0 con el gancho entero ("Dos inmobiliarias" 88 px, kicker mono
  "MISMA CALLE · DOMINGO 21:30", "Una ya agendó" 118 px blanco, "tres visitas." 118 px verde) y las
  dos fachadas ya dibujadas. "domingo" (2.1) sale la luna y Rodríguez baja a 0.5; "una" (2.85)
  globo de chat verde en la vidriera de Costa; "tres" (3.8) pill "3 visitas"; 4.05 pill "En espera".
- **s02-domingo** (4.50-7.07): "DOMINGO" 120 px + "21:30" 300 px verde + luna; "entran" (1.45)
  caen tres avisos "Consulta · Apto 2 dorm." y un globo rojo "3".
- **s03-consultas** (7.07-10.20): celular grande con el chat "Apto 2 dormitorios · 3 consultas":
  cada pregunta entra en su palabra (0, 1.14, 2.39) con el nombre de quien pregunta.
- **s04-izquierda** (10.20-12.30): "RODRÍGUEZ · SIN AGENTE"; la fachada gris con zZz a la
  izquierda, a la derecha las tres consultas con reloj y "SIN RESPUESTA"; "lunes" (1.7) cartel rojo
  "CONTESTA EL LUNES".
- **s05-lunes** (12.30-15.26): "LUNES 10:00"; lista de tres chats; "contestan" (1.0) aparece
  "Vos: ¡Hola! Sí, sigue."; "dos" (1.85) Laura y Paula responden "Gracias, ya vimos otro." con cruz
  roja; pill "Dos ya vieron otro".
- **s06-derecha** (15.26-18.06): "COSTA · CON AGENTE DE IA"; celular con cabecera verde "AGENTE DE
  IA · EN LÍNEA"; "agente" (0.95) escribiendo...; "contesta" (1.52) "¡Sí, sigue! Hola, Laura." y la
  ficha del apartamento (con patio, acepta mascotas, visitas mar y mié); "toque" pill "Al toque".
- **s07-agenda** (18.06-19.97): "¿Qué día? ¿Cuántos son?" / "Martes 18:30, somos dos."; "agenda"
  (0.62) entra el calendario del corredor y se llena el turno 18:30 con tilde (1.3).
- **s08-tres-visitas** (19.97-22.78): cabecera verde "Tu agenda · corredor · lunes 9:00"; "tres
  visitas" (1.3-1.9) entran tres tarjetas MAR 11:00 / MAR 18:30 / MIÉ 10:00; "listas" tildes;
  "La conversación, para vos".
- **s09-giro** (22.78-26.30): vuelven las dos fachadas; "mismos" (0.95) "=" verde y pill "Mismos
  apartamentos"; "descansar" (2.3) Rodríguez pasa de gris a crema; "bien" tilde "Descansar está
  bien" y pill "Contestó" bajo Costa.
- **s10-diferencia** (26.30-29.42): "DOMINGO 21:30" grande; dos celulares: Rodríguez "Sin
  respuesta", Costa responde en "quién" (1.15); recuadro verde y pill "¿Quién contestó?".
- **s11-cta** (29.42-36.92): videollamada (TU LOCAL · Scalerics); "Videollamada" (1.45), "gratis"
  con recuadro (1.95), "scalerics.com" verde (2.95); queda ~4 s respirando.

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

