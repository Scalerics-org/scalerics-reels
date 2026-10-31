# Reel "Pit stop": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): TRANSMISIÓN DE FÓRMULA 1 por TV,
solo nombrada (nada de escuderías, pilotos, autos, logos ni marcas reales: autos y mecánicos
dibujados genéricos). El RELATOR (Gemini Puck, a los gritos) anuncia un récord: "la parada en boxes
más lenta de la historia". Domingo a las diez de la noche tu cliente entra a boxes y pide por la
RADIO del auto (Gemini Leda, con filtro de radio): "Box, box. Hola, ¿cuánto sale? ¿Tenés turno para
mañana?". En TU box, el mecánico (el dueño, Gemini Charon) no encuentra la llave: "¿Quién vio la
llave? Decile que le contesto el lunes". Radio: "Box... ¿hay alguien?". La COMENTARISTA (Gemini
Kore, seca): el cronómetro sigue corriendo, una hora, un día, "esto ya no es una parada: es una
siesta". El cliente se va sin atender y entra al box del de enfrente: precio, turno, pedido, ¡dos
segundos!, vuelta rápida. Sale con las gomas del de enfrente: "ese ya no vuelve". GIRO
(comentarista): tu mecánico no es lento, está solo en el box (mostrador, repone, cuentas) y el
domingo a la noche duerme. ORUS (Scalerics): el de enfrente no tiene más mecánicos, tiene un agente
de IA, equipo de boxes las veinticuatro horas; armamos el tuyo. Relator: "¡Parada de dos segundos!
¡Y el mecánico, durmiendo!". Cierre (Orus): "Etiquetá al que tarda tres días en boxes."

Voz armada de 15 parlamentos (`partes/01..15.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.05-1.17 por parlamento y pegados
con 0.3-0.55 s (`componer.mjs`). Tiempos: Speech-to-Text de cada parte. Locución 72.56 s; reel 75.76 s.

## ESTILO: GRÁFICA DE TRANSMISIÓN DE F1. Edición cargada.
Fondo de fibra de carbono (trama diagonal, en armar.mjs) con un brillo rojo tenue. Paneles de TV
planos e INCLINADOS (skewX -10deg) con barra de color a la izquierda; torre de tiempos (filas
posición · nombre · tiempo); cronómetro de parada (mono, grande); semáforo de largada (5 luces
rojas); radio del piloto (panel "RADIO" con onda de barras que se mueve con la voz); pit board
(la pizarra que le muestran al piloto); bandera a cuadros; neumáticos con banda de color; vista
cenital del pit lane (líneas blancas, cajas de box). Autos de carrera dibujados simples, de arriba
o de costado, genéricos (sin números famosos ni colores de escuderías). Mecánico = el dueño: figura
plana con mameluco y gorra rojos, cabeza blanca (genérico).
CAPA FIJA (`compositions/ambiente.html`): arriba, barra de transmisión "VIVO · GP DEL BARRIO · PARADA · TU BOX" +
cronómetro de PARADA que corre desde que el cliente entra a boxes (9.3 s), salta a 1:00:00 en
"hora" y a 24:00:00 en "día", y se pone "ABANDONO" rojo cuando el cliente se va (30.8 s); en el box
del de enfrente ("PARADA · ENFRENTE") cuenta 0.0 a 2.0 s en verde y queda así hasta el final. Rótulo abajo a la derecha "CÁMARA PIT LANE".
Flashes blancos y rojos en los golpes.

## Paleta (SOLO estos colores)
- Carbón `#0b0c0f` / `#16181d` / `#23262d`: fondo (armar.mjs) y rellenos de paneles.
- Blanco `#f4f4f1`: líneas, textos, subtítulos.
- Rojo `#e10600`: tu box, el error, ABANDONO, semáforo, sellos, EN VIVO.
- Amarillo `#ffd100`: acento de subtítulos, el cliente (su auto, su radio), bandera amarilla.
- Verde récord `#5ce611`: los tiempos buenos, el box del de enfrente, el agente de IA, Scalerics.

## Zona
Barra de transmisión en y 112-196 (ambiente); subtítulos y 236-420. Contenido de escenas entre
y 580 y 1520, x 60-1020. Rótulo de cámara y 1610; logo y ~1746.

## Escenas (tiempos relativos en tiempos.md)
- s01-record: cuadro 0 con el semáforo de largada (5 luces) ya a medio encender; en "Atención" se
  encienden todas rojas; en "récord" panel inclinado "NUEVO RÉCORD" (rojo/blanco) cae con sacudón;
  en "parada" se arma "LA PARADA EN BOXES"; en "lenta" "MÁS LENTA" gigante roja; en "historia"
  "DE LA HISTORIA" y un cronómetro chico que gira lentísimo.
- s02-domingo: placa "DOMINGO · 22:00" (la hora cae en "diez"), luna; vista cenital del PIT LANE
  (carril, boxes "TU LOCAL" rojo y "EL DE ENFRENTE"); en "Entra" el auto amarillo del cliente baja
  por el carril con flecha punteada y frena en TU box en "boxes"; etiqueta "PIT LANE · ABIERTO".
- s03-radio: panel de RADIO del piloto ("RADIO · TU CLIENTE"), onda de barras amarillas que late con
  cada palabra; transcripción en comillas: "Box, box." / "¿Cuánto sale?" / "¿Turno para mañana?".
- s04-tu-box: tu box de frente: cartel "TU LOCAL", auto amarillo sobre el gato, el mecánico (dueño)
  agachado revolviendo una caja de herramientas; en "llave" signos "?" que saltan y "¿LA LLAVE?".
- s05-llave: cosas que vuelan de la caja (cuaderno, mate, cables, un repuesto) en "¿Quién vio?";
  en "Decile" sube la PIT BOARD (pizarra) con "TE CONTESTO EL LUNES"; en "Box... ¿hay alguien?"
  aparece el panel de radio chiquito con onda floja y sello "SIN RESPUESTA".
- s06-cronometro: cronómetro gigante de parada; corre; en "hora" salta a 1:00:00 (rojo), en "día"
  a 24:00:00; en "parada" la palabra PARADA en la torre se tacha; en "siesta" sello amarillo
  "SIESTA" y "Zzz" que suben.
- s07-se-va: pit lane cenital: el auto amarillo sale de TU box (que queda vacío, con "?") y en
  "enfrente" entra al box verde "EL DE ENFRENTE"; "¡SE VA SIN ATENDER!" rojo.
- s08-dos-segundos: box del de enfrente: tres checks verdes en fila PRECIO / TURNO / PEDIDO en su
  palabra; en "dos segundos" cronómetro "2.0 S" verde gigante con golpe; en "vuelta rápida" fila de
  torre de tiempos "VUELTA RÁPIDA · EL DE ENFRENTE" con barra verde.
- s09-gomas: neumático grande que rueda con banda verde y etiqueta "GOMAS: DEL DE ENFRENTE"; en
  "Ese ya no vuelve" la torre: "1 EL DE ENFRENTE" sube y "TU LOCAL · ABANDONO" en rojo cae.
- s10-solo: GIRO. "NO ES LENTO" en blanco; "SOLO EN EL BOX": el mecánico solo en el centro, y
  alrededor se encienden tres tareas (MOSTRADOR, REPONE, CUENTAS) con flechas que lo jalan; en
  "domingo a la noche" se apaga la luz del box (luna), en "duerme" se duerme sentado sobre un
  neumático con "Zzz".
- s11-equipo: el box del de enfrente: un solo mecánico (no más gente, "MÁS MECÁNICOS" tachado); en
  "agente de IA" se ilumina en verde un panel "AGENTE DE IA" (chispa) con un auricular; en "equipo de
  boxes" aparece la fila de cascos de equipo dibujados en verde; "24 H" gigante en "veinticuatro".
- s12-agente: celular "Tu agente de IA · EN LÍNEA · 24 H" con la conversación (cliente amarillo,
  agente verde): "Hola, ¿cuánto sale?" / "¡Hola! Te paso los precios." al instante; "¿Turno para
  mañana?" / "Agendado: mañana a las diez."; "Y el pedido, tomado."; en "pasa la conversación" una flecha
  hacia un avatar "VOS". Etiqueta "EN SCALERICS ARMAMOS EL TUYO".
- s13-durmiendo: cronómetro verde "2.0 S" en "dos segundos"; el mecánico duerme feliz en una reposera
  con "Zzz"; bandera verde.
- s14-cta: bandera a cuadros que flamea; "ETIQUETÁ" gigante amarillo; "AL QUE TARDA TRES DÍAS EN
  BOXES"; arroba en un círculo; queda quieto con algo latiendo.

## El lenguaje visual de base (este reel cambia la paleta y el estilo: manda lo de arriba)
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

