# Reel "Turnos vacíos" · spec

Reel vertical 1080x1920 de Scalerics sobre **agentes de IA** (el único de la tanda), formato
motion persuasivo **"Rutina + punto de dolor"** con interfaz recreada (línea de Juan del 02-11).
Gancho: "Tu agenda del martes estaba llena. Y la silla quedó vacía tres veces." Una peluquería de
barrio: Carla abre a las 9 con todos los turnos tomados. A las 11 no vino Gonzalo (corte), a las
15 tampoco Ana (tintura), a las 16:30 otro hueco: la tijera, quieta. Giro que deja bien parados a
todos: nadie lo hizo de mala, la gente se olvida, y te enterás tarde. El mismo martes con un
agente de IA: el lunes a la tarde le escribe a cada uno por WhatsApp "¿Te confirmo mañana a las
11:00?"; Gonzalo contesta "mañana no puedo"; el agente le ofrece el jueves y él lo toma; el hueco
de las 11 se lo pasa a quien estaba en espera (Camila): confirmado. A la medianoche alguien pide
turno para el viernes y el agente lo agenda mientras Carla duerme. El martes, la agenda se cumple
entera (todo verde). Cierre: "Etiquetá a la peluquera que vive mirando la agenda." Una sola voz
(Orus, tomada a 1.06 con atempo), 56.6 s; total 59.8 s. El dolor es **la gente que falta sin
avisar**, no "no contestar mensajes".

## Recurso visual central: LA AGENDA DEL DÍA
Tarjeta crema (x 150–930, y 596–1248, rx 26) con encabezado "MARTES" (Lexend 600 34px, x 190,
y 648) y a la derecha "PELUQUERÍA CARLA" (mono 22px, crema 0.5). Línea separadora en y 668. Diez
filas de 56 px desde y 676 (fila i: y0 = 676 + 56·i). En cada fila: la hora (mono 24px, x 180,
y0+36) y un bloque de turno (x 300–900, y0+6, alto 44, rx 10) con el nombre (Lexend 600 26px,
x 324, y0+37). Turnos:
09:00 Marta · brushing · 10:00 Lucía · color · **11:00 Gonzalo · corte** · 12:00 Sofía · corte ·
13:00 Pedro · barba · 14:00 Valentina · peinado · **15:00 Ana · tintura** · **16:30 Diego · corte** ·
17:30 Laura · alisado · 18:30 Nico · corte.
- Estado normal: bloque con trazo crema (4px) y nombre crema.
- **Falta** (11:00, 15:00, 16:30 en la primera mitad): trazo rojo apagado `#c0625a` punteado,
  nombre a 0.35 con una raya que lo tacha, y a la derecha "NO VINO" (mono 22px rojo apagado).
- **Resuelto** (segunda mitad): trazo verde `#5ce611` y tilde verde a la derecha del bloque. En
  la segunda mitad el 11:00 dice "Camila · corte".
Se construye por script (función `agenda()` igual en s01, s04, s06, s10) para que sea idéntica.

**El agente de IA** (mismo ícono en s06–s11): círculo verde (r 56, trazo 6) con "IA" en Lexend
600 verde adentro y un destello de cuatro puntas arriba a la derecha. Nada de caras de robot.

**Color con significado**: la primera mitad (s01–s05) es crema con rojo apagado solo en las
faltas; desde s06 entra el verde y gana la pantalla. Fondo, logo y subtítulos: los del molde
(`armar.mjs` sin cambios).

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


## Inicios globales
s01 0 · s02 5.47 · s03 9.80 · s04 13.13 · s05 19.56 · s06 23.85 · s07 27.23 · s08 37.10 ·
s09 41.77 · s10 46.10 · s11 49.29 · s12 53.90 (dura hasta 59.83; la voz termina en 56.63).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-gancho** (0–5.47) — "Tu agenda del martes estaba llena. Y la silla quedó vacía tres
veces." La agenda completa. Cuadro 0: tarjeta y encabezado a medio dibujar. Los bloques se
dibujan en cascada entre "agenda" y "llena"; en "llena" un punch de toda la tarjeta. En "silla"
el bloque de las 11:00 pasa a falta; en "tres" el de las 15:00 y en "veces" el de las 16:30, y un
badge rojo apagado "3 HUECOS" arriba a la derecha de la tarjeta. Etiqueta: "MARTES · LLENO" →
"TRES HUECOS".

**s02-peluqueria** (5.47–9.80) — "Una peluquería de barrio. Carla abre a las nueve con todos los
turnos tomados." Fachada de peluquería (x 400, piso 1200): paredes, cartel "PELUQUERÍA" con una
tijera, vidriera con sillón y espejo adentro, puerta. En "Carla" se dibuja Carla (x 820): pelo
recogido, delantal, tijera en la mano. En "nueve" reloj "09:00" arriba a la izquierda (pop). En
"turnos tomados" la agenda en chico (tarjeta 220x260 arriba a la derecha) con 10 rayitas que se
llenan, todas crema. Etiqueta: "PELUQUERÍA DE BARRIO" → "09:00 · ABRE" →
"TODO TOMADO".

**s03-once** (9.80–13.13) — "A las once, no vino el corte de Gonzalo." Adentro de la peluquería:
sillón de peluquería con espejo (x 420) y Carla parada al lado (x 760) con la tijera; reloj
"11:00" arriba (pop en "once"). En "no vino" el sillón queda vacío y titila punteado; arriba del
espejo, la tarjeta de turno "11:00 · Gonzalo · corte" en estado falta, con "NO VINO". Carla mira
el reloj (cabeza gira). Etiqueta: "11:00" → "NO VINO".

**s04-tarde** (13.13–19.56) — "A las tres, tampoco llegó la tintura de Ana. A las cuatro y media,
otro hueco. La tijera, quieta." La agenda completa, con el 11:00 ya en falta. En "tres" el bloque
de las 15:00 pasa a falta; en "cuatro" el de las 16:30, y en "hueco" los tres huecos laten. En
"tijera" la agenda se va (blur) y entra una tijera grande cerrada (x 540, y 900) quieta, con
líneas punteadas de "quieta" alrededor que se apagan. Etiqueta: "15:00 · TAMPOCO" → "16:30 ·
OTRO HUECO" → "LA TIJERA, QUIETA".

**s05-olvida** (19.56–23.85) — "Nadie lo hizo de mala. La gente se olvida, y te enterás cuando ya
es tarde." Gonzalo (x 300) caminando apurado con la compu bajo el brazo; globo de pensamiento con
"11:00 · peluquería" que en "olvida" se deshace en puntitos. En "enterás" a la derecha un celular
(x 760) con hora "11:40" y un globo crema de Gonzalo: "¡Perdón! Me re olvidé". Etiqueta: "NADIE
DE MALA" → "LA GENTE SE OLVIDA" → "TE ENTERÁS TARDE".

**s06-agente** (23.85–27.23) — "Ahora, el mismo martes con un agente de IA." La agenda se
redibuja crema, con una flecha circular de "rebobinar" junto a "MARTES" en "mismo". En "agente"
el ícono del agente (pop) en la esquina superior derecha de la tarjeta (x 860, y 600) y una línea
verde que recorre el borde de la tarjeta. Etiqueta: "EL MISMO MARTES" → "CON UN AGENTE DE IA".

**s07-whatsapp** (27.23–37.10) — Celular grande al centro (x 320–760, y 590–1240) con el chat:
encabezado con el ícono del agente chico y "Peluquería Carla"; en "lunes" un chip "LUNES 18:00";
en "cada uno" sale un chip verde "A TODOS LOS DE MAÑANA" con tilde. Globos: en "confirmo" (agente,
derecha, borde verde) "¿Te confirmo mañana a las 11:00?"; en "Gonzalo" (izquierda, crema)
"Mañana no puedo"; en "ofrece" (agente) "¿Te sirve el jueves a las 11:00?"; en "toma" (Gonzalo)
"Dale, el jueves" y el turno del jueves con tilde verde. Etiqueta: "UN DÍA ANTES" → "¿CONFIRMÁS?"
→ "OTRO DÍA, MISMO CLIENTE".

**s08-espera** (37.10–41.77) — Arriba una tarjeta "EN ESPERA" (x 150–930, y 600–740) con "Camila ·
corte" y un relojito. Abajo tres filas grandes de la agenda (10:00, 11:00, 12:00). En "hueco" el
bloque de Gonzalo se desliza a la derecha con "→ JUEVES" y queda un hueco punteado; en "pasa" el
chip de Camila baja de la tarjeta al hueco; en "Confirmado" el bloque se pone verde con tilde.
Etiqueta: "11:00 · LIBRE" → "LISTA DE ESPERA" → "CONFIRMADO".

**s09-medianoche** (41.77–46.10) — Noche: luna y reloj "00:15". Carla durmiendo en la cama
(abajo, x 540) con "z z z". Arriba un celular (x 540) con un globo de cliente "¿Tenés turno el
viernes?" en "pide turno" y la respuesta del agente en "agenda": "Viernes 10:00 · agendado" con
tilde verde. Etiqueta: "00:15" → "MIENTRAS DORMÍS".

**s10-entera** (46.10–49.29) — "El martes, la agenda se cumple entera." La agenda completa, con
Camila a las 11:00 y Ana y Diego en su lugar: en "agenda" los diez bloques se ponen verdes en
cascada con tildes; en "entera" punch y un sello verde "COMPLETA". Etiqueta: "MARTES" →
"AGENDA CUMPLIDA".

**s11-scalerics** (49.29–53.90) — "Scalerics" grande arriba (y 680) en "Scalerics"; en "agentes
de IA" el ícono del agente al centro; en "cuidan tu agenda" tres íconos en órbita (globo de chat,
calendario con tilde, reloj) unidos por líneas verdes; en "empleado más" una credencial colgante
"EQUIPO · AGENTE DE IA". Etiqueta: "SCALERICS" → "AGENTES DE IA" → "UN EMPLEADO MÁS".

**s12-cta** (53.90–59.83) — "Etiquetá a la peluquera que vive mirando la agenda." La peluquera
(x 380) mirando el celular con la agenda, la tijera en la otra mano. En "Etiquetá" un "@" verde
grande que hace pop y una etiqueta tipo tag "@tu peluquera" que aparece sobre ella con un
piquito. En "mirando" los ojos van al celular y el celular late. Queda quieto latiendo hasta el
final. Etiqueta: "ETIQUETALA" → "LA QUE MIRA LA AGENDA".
