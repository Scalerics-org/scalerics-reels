# Reel "El late night": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: agentes de IA para
comercios). Formato P: LATE NIGHT SHOW de la tele, programa inventado "Nico de Noche" (sin nombre
ni estética de ningún programa real). Gancho de NICO, el conductor canchero en su escritorio:
"Mi invitado de esta noche trabaja veinticuatro horas, no pide aumento y tu empleado lo odia."
"¡Buenas noches! Esto es Nico de Noche. Y con ustedes... ¡el agente de IA!" (telón, fanfarria,
aplausos; el agente entra con lentes de sol de estrella). En el sillón: "Gracias, Nico. Qué lindo
público." Entrevista: "¿A qué hora te acostaste anoche?" "No me acuesto." (BA-DUM TSS de la
batería, risas). "¿Y qué hiciste?" A las tres de la mañana una clienta quiso reservar para el
sábado: se la tomó. Nico: "¡A esa hora el dueño está soñando que contesta!" (risas). El domingo
agendó un turno; al que preguntó y no compró le escribió al otro día. "¿Y si una clienta pide
hablar con el dueño?" "Se la paso. Hay cosas que son para él." GIRO: "Última pregunta. ¿No te
da miedo quedarte sin trabajo?" (se apaga el estudio, redoble) "Nico, el que se queda sin
clientes es el que contesta a los tres días." (¡oooh!). "¿Y es verdad que tu empleado te odia?"
"Me odiaba. Ahora atiende tranquilo al que tiene adelante, y del celular me encargo yo."
"¡Qué invitado! ¡Un aplauso!" Narrador Scalerics (Orus): "Ese invitado lo hacemos en Scalerics:
tu agente de IA, que atiende por WhatsApp a cualquier hora. Etiquetá al que contesta a los tres
días. Que vea la entrevista."
Tres voces: Nico Fenrir, agente de IA Aoede, narrador Orus; público con voces de Gemini (risas,
"oooh", festejo) mezclado en la cortina. 191 palabras; voz de 68.5 s, reel de 71.72 s.
Partes en `partes/`: `voces.sh` -> `recortar.sh` -> `tiempos.sh` -> `pegar.mjs` (atempo y
silencios en `conf.mjs`; silencios largos para aplausos, BA-DUM TSS, risas y "oooh").

## Recurso visual central
EL SET DE UN LATE NIGHT: detrás, el ventanal con el SKYLINE nocturno de una ciudad genérica
(edificios azul noche con ventanas ámbar, estrellas, luna; lo dibuja el fondo de `armar.mjs`) y
el piso de madera; escritorio de madera con taza "N" y micrófono de mesa, sillón rojo neón, telón,
batería de la banda ("NdN" en el bombo). La capa fija `compositions/ambiente.html` pone arriba el
CARTEL DE NEÓN manuscrito "Nico de Noche" (titila al prender y de vez en cuando) con una lunita
ámbar, y a la derecha el CARTEL DE LUZ DEL PÚBLICO que se prende rojo: APLAUSOS (9.9 y 55.95),
RISAS (17.75, 28.75, 51.8), ¡OOOH! (47.45); focos que barren; se apaga la pregunta incómoda
(39.83-48.87) y todo el set cuando entra Scalerics (58.96). El agente de IA es un personaje
simpático: cabeza-pantalla con ojos verdes, antenita, saco azul y moño ámbar.
Edición cargada: palabras gigantes que caen con golpe y sacudón, cortes a la batería, al celular,
al dueño durmiendo, al mostrador.

## Paleta (SOLO estos colores)
- Azul noche `#0b1330` / `#1c2a5e`: rellenos, sacos, pantallas, fondo.
- Ámbar `#ffb547`: ventanas, focos, títulos, moño del agente, la corbata de Nico.
- Rojo neón `#ff3d6e`: el neón, el sillón, el telón, "LO ODIA", "¿MIEDO?", el cartel del público.
- Crema `#fff1dc`: trazos (7 px) y textos.
- Madera `#7a4524`: escritorio, cama, tele, mostrador, delantal del dueño.
- Verde `#5ce611`: SOLO el agente de IA (y lo que hace) y Scalerics.
Acento de subtítulos por quién habla (`reel.voces` en `armar.mjs`): Nico ámbar, agente y Scalerics
verde. Prohibido: emojis, fotos, rayas largas, logos o nombres de programas reales, caras reales.

## Tipos de letra
Lexend 700-900 para lo grande, Caveat 700 para el neón y lo manuscrito, IBM Plex Mono 500 para
horas y cartelas chicas.

## Zona
Subtítulos arriba (y 236 a ~420). Barra del ambiente y 82-180. Escenas entre y 560 y 1540;
logo en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo con skyline, colores de subtítulos, cortina `assets/bgm/escenario.mp3`).
- `partes/cortina.mjs`: banda (bajo caminante, órgano, platillo con swing), bronces en 5.3, 9.95
  y 55.96; BA-DUM TSS en 17.95 / 18.15 / 18.40; rimshot 28.85; nota grave y redoble 39.83-43.5;
  golpe y "oooh" 47.35; aplausos 5.4, 9.95 y 55.96; risas 18.5, 28.95, 51.85; acorde final 68.
- Las escenas se escriben con `partes/escenas/gen.py` + `comun.py` (NICO, AGENTE, EMPLEADO,
  CLIENTA, DUENO, ESCRITORIO, SILLON, SILLON_BRAZOS, BATERIA, PUBLICO, HAZ, CELULAR, GLOBO):
  `python3 partes/escenas/gen.py partes/escenas/sNN.py` (desde la carpeta del reel).

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



## Escenas (tiempos relativos, ver `tiempos.md`)
- **s01-invitado** (5.31 s): Nico en su escritorio ya armado (cuadro 0 con dibujo) con
  acercamiento; "24 HORAS" ámbar cae en "veinticuatro" (1.43), sello rojo "SIN AUMENTO" en
  "aumento" (3.13), círculo rojo con el empleado de gorra y brazos cruzados en "empleado" (3.93),
  "LO ODIA" gigante rojo en "odia" (4.38) con temblor.
- **s02-con-ustedes** (6.24 s): el cartel de neón grande "Nico / de Noche" se prende (0.35 y
  "Noche" 2.23), focos que titilan, Nico saluda; en "ustedes" (2.96) sube todo y entra el telón
  rojo cerrado; en "el" (4.04) se abre, haz de luz, el agente con lentes de sol saluda; cartela
  verde "AGENTE DE IA · INVITADO DE ESTA NOCHE" en "IA" (4.64).
- **s03-sillon** (2.83 s): plano general: Nico chico en el escritorio a la izquierda, el agente en
  el sillón rojo; se saca los lentes (0.2), saluda en "público" (1.64) con brillitos.
- **s04-pregunta** (2.77 s): Nico de cerca con la tarjeta, "Arranquemos..." manuscrito; tarjeta
  crema "¿A QUÉ HORA TE ACOSTASTE ANOCHE?" en 1.10, "ACOSTASTE" en rojo.
- **s05-no-me-acuesto** (2.17 s): primer plano del agente, "NO ME ACUESTO" verde (0.2); corte a la
  batería: "BA-" (0.8), "DUM" (1.0), "TSS!" (1.25) con los palillos y el platillo.
- **s06-tres-am** (6.22 s): Nico "¿Y QUÉ HICISTE?"; corte al celular del agente: "03:00 DE LA
  MAÑANA" en "tres" (1.56); globo de la clienta "¿tienen mesa para el sábado?" (2.89); respuesta
  verde del agente (4.8) y sello "RESERVADO" en "tomé" (5.4).
- **s07-sonando** (4.28 s): "¿A LAS TRES?" con Nico sorprendido; corte al dueño durmiendo (zzz) y
  la nube del sueño en "soñando" (1.97): él contestando el celular, "¡Respondido!" en "contesta".
- **s08-domingo** (1.80 s): hoja de calendario "DOMINGO 12 · LOCAL CERRADO", tilde verde en
  "agendé" (0.45), etiqueta verde "TURNO · 10:30" en "turno" (0.98), el agente chiquito saluda.
- **s09-seguimiento** (3.21 s): chat con Sofía (preguntó y no compró): "¿Cuánto sale la campera
  verde?" (0.34), "Lo pienso." (1.06), "· AL OTRO DÍA ·", el agente le escribe (1.68), "¡Sí! Paso
  mañana." (2.6).
- **s10-el-dueno** (5.00 s): la clienta con su celular: "Quiero hablar con el dueño." (0.42);
  corte: el agente le tira el celular al dueño por un arco verde en "paso" (2.38); "Para vos,
  jefe." manuscrito en 3.4.
- **s11-miedo** (3.76 s): se apaga el estudio, haz rojo, Nico serio (boca recta) con zoom lento;
  "ÚLTIMA PREGUNTA" mono, "¿MIEDO?" gigante rojo en "miedo" (1.64), sello "SIN TRABAJO" (2.64).
- **s12-remate** (5.28 s): el agente se baja los lentes de sol (0.2), banda oscura con
  "SE QUEDA SIN CLIENTES" en "clientes" (1.76), "EL QUE CONTESTA" (2.96) y "A LOS 3 DÍAS" rojo en
  "tres" (3.42) con sacudón; guiño.
- **s13-odia** (7.09 s): Nico chusma con la mano, el empleado enojado en un círculo (0.8),
  "¿TE ODIA?" (1.52); el agente "Me odiaba." manuscrito (2.5); en "Ahora" (3.64) el mostrador: el
  empleado contento atiende a la clienta, el celular con la cara del agente sobre el mostrador;
  "ÉL: EL MOSTRADOR" en "tranquilo" (4.22), "YO: EL CELULAR" en "celular" (5.59), tildes verdes.
- **s14-aplauso** (3.00 s): Nico aplaude, el agente hace la reverencia, el público salta,
  confeti; "¡UN APLAUSO!" en "aplauso" (1.30).
- **s15-cta** (12.76 s): estudio apagado; una tele vieja de madera con el agente "EN VIVO"; cartela
  verde "TU AGENTE DE IA" (2.63) con "ATIENDE POR WHATSAPP · A CUALQUIER HORA" (4.27); "ETIQUETÁ"
  ámbar gigante (6.16), "al que contesta a los tres días" manuscrito, "QUE VEA LA ENTREVISTA" rojo
  (8.54); guiño del agente.
