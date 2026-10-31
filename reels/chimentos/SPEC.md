# Reel "Chimentos": spec de escenas

Reel vertical 1080x1920 de Scalerics. Vende **automatizaciones** (recordatorios y avisos que hoy
se mandan a mano: confirmar turnos, avisar "tu pedido está listo", reclamar pagos). Formato P
(cultura popular): **programa de chimentos de la tarde**, inventado: "Picante a las Cinco". La
CONDUCTORA (rubia, vestido rosa, Zephyr) tira la primicia: "¡Primicia! Pescamos a Mirta, la
peluquera de la Unión, a las once de la noche, mandándole WhatsApp a sus clientas. Una por una."
Las dos PANELISTAS se pisan (Aoede: morocha con anteojos, chusma; Puck: varón de jopo y saco,
pícaro): "¿Y con quién se escribe?" "¡Con todas!". Fotos de paparazzi: Mirta en camisón y con
ruleros escribiendo «¿Confirmás tu turno de mañana?» (x40), Mirta en los ravioles del domingo con
el celular abajo de la mesa: «Ya está tu pedido». EXCLUSIVO: habla el MARIDO (Charon, franja de
"TESTIMONIO" en los ojos): "Ya no me mira. Mira el celular. Anoche le dije «te quiero» y me
contestó «te recuerdo tu pago pendiente»." "¡Escándalo!" "¡Se separan!". GIRO (Aoede): "Paren,
que hay más": la foto de la de enfrente, dormida a las nueve, y los recordatorios y avisos le
salen solos. "¿Quién se los manda?" "Nadie, mi amor. Son automáticos." Entra Orus (Scalerics):
"automatizamos lo que hacés a mano: recordar turnos, avisar que el pedido está listo, reclamar el
pago que se olvidó. Sale solo, a la hora justa. Y vos, a dormir." Cierre de la conductora:
"Mandáselo a tu peluquera. Que se entere por acá."
Voz de 69.3 s, reel de 72.5 s, cinco voces (ver `partes/voces.sh`).

## Recurso visual central y ESTILO: set de chimentos, fotos de paparazzi
Fondo de set de TV de noche: degradé ciruela a negro con haces de luz rosa y purpurina dorada
(`assets/set.svg` en el fondo de `armar.mjs`), lamparitas de camarín doradas que titilan a los
costados, mosca del programa arriba ("PICANTE a las cinco", negro con borde rosa) y zócalo
"EN VIVO" rojo + titulares en dorado abajo (y 1580-1650, de 4.9 a 55.9) en
`compositions/ambiente.html`. Personajes de busto dibujados, genéricos, con contorno negro grueso
y peinados que los distinguen. Las "pruebas" son FOTOS DE PAPARAZZI: marco blanco tipo polaroid,
interior de noche con franjas diagonales, hora en dorado, epígrafe manuscrito (Caveat), punto rojo
y un flash blanco cuando caen. Tipografía de revista: Lexend 900 en mayúsculas en BARRAS con
sombra dura (¡PRIMICIA!, ¡CON TODAS!, x40, ¡ESCÁNDALO!, ¡AUTOMÁTICOS!) y SELLOS rojos con borde
(EXCLUSIVO, OBSESIÓN). Círculos y flechas rojas de chimento.
Con Scalerics (56.1 a 66.3) se apaga el zócalo y entra el verde: un panel negro limpio con tres
interruptores que se prenden solos.
Todas las escenas se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs`
(piezas en `partes/escenas/comun.mjs`: `persona()`, `foto()`, `celular()`, `globo()`, `sillon()`,
`camara()`, `destello()`, `brillito()` y los helpers `pop`, `golpe`, `cae`, `entra`, `dibujar`,
`habla`, `respira`, `balancea`, `pestanea`, `flash`, `tiembla`, `acerca`). El ambiente sale de
`node partes/escenas/ambiente.mjs`, la cortina de `node partes/cortina.mjs` y la voz de
`partes/voces.sh` + `partes/recortar.sh` + `node partes/pegar.mjs` (tempos y silencios en
`partes/conf.mjs`).

## Paleta (SOLO estos)
- Rosa chicle `#ff4fa3` (y rosa claro `#ffb3d6`): la conductora, el sillón, globos enviados.
- Dorado `#f5c242`: lamparitas, barras, la panelista, ruleros, horas de las fotos.
- Negro del set `#140a12`: contornos, panelista varón, mesa del estudio.
- Blanco `#fff7fb`: marcos de las fotos, textos grandes, flash.
- Rojo flash `#ff2e4d`: ¡PRIMICIA!, sellos, círculos y flechas, EN VIVO.
- Fondo ciruela `#4a1238` a `#140a12`. Desde s13 (Scalerics) entra el verde `#5ce611`.
Subtítulos: blanco con sombra; acento según quién habla (rosa conductora, dorado Aoede, naranja
`#ff7a59` Puck, rosa claro el marido, verde Scalerics: `reel.voces` en `reel.json`).
Prohibido: emojis, fotos, logos o caras de programas o personas reales, rayas largas en textos.

## Zona
Subtítulos arriba (y 236 a ~420); mosca en y 92-150. Contenido entre y 570 y 1560. Zócalo
EN VIVO en y 1580-1650; logo en y 1746.

## Escenas (tiempos relativos en `tiempos.md`)
- s01-primicia: conductora detrás de la mesa "PICANTE"; ¡PRIMICIA! cae (0.1) con flash y tiembla
  toda la escena; en "Mirta" (1.70) cae la foto de Mirta con ruleros y el celular iluminándole la
  cara (23:00); flashes en "peluquera" y "noche".
- s02-pescada: visor de paparazzi (esquinas, REC titilando) sobre el celular de Mirta: lista de
  chats con clientas (Graciela, Susana, Mónica...) que entran una tras otra; en "una por una"
  (2.2, 2.47, 2.74) se marcan los tildes.
- s03-panel: las panelistas en el sillón rosa; Aoede se inclina chusma, "¿con quién?" (0.70);
  Puck salta y la pisa: barra ¡CON TODAS! (1.98).
- s04-camison: cae la foto (0.35) de Mirta en camisón en la cama, ventana con luna, 23:47; sello
  EXCLUSIVO en "Mirta" (1.86); círculo rojo al celular en "camisón"; globos «¿Confirmás tu turno
  de mañana?» que se multiplican desde 3.30 y barra x40 en "Cuarenta" (5.48).
- s05-obsesion: primer plano de Aoede gritando: ¡40! y sello OBSESIÓN en "obsesión" (1.39).
- s06-ravioles: foto del almuerzo del domingo (abuela, nene, Mirta, ravioles, mantel a cuadros);
  círculo sobre Mirta en "ravioles"; en "abajo" (3.17) cae la segunda foto, abajo de la mesa,
  con el celular; globo «Ya está tu pedido» con flecha roja (4.52).
- s07-exclusivo: sello EXCLUSIVO (0.1); la silueta negra del marido se revela en "marido" (0.86)
  con franja TESTIMONIO; barra HABLA EL MARIDO entra en "Habló" (1.39).
- s08-marido: el marido con el micrófono "P5"; "ya no me mira"; globos: «Te quiero» (3.13) y la
  respuesta «Te recuerdo tu pago pendiente» (4.27); el corazón se parte en "pendiente" (5.91) y
  cae una lágrima.
- s09-escandalo: barra ¡ESCÁNDALO! (0.1) que tiembla, las dos panelistas saltan, ¡SE SEPARAN!
  (1.33) y el corazón gigante se parte.
- s10-enfrente (EL GIRO): "¡paren!"; Aoede saca la foto de la de enfrente (1.48): dormida con
  antifaz, reloj 21:00, luna; zzz en "dormir" y barra 21:00 en "nueve" (3.83).
- s11-solos: la de enfrente duerme; en la mesita, su celular manda solo los globos
  "Recordatorio: tu turno es mañana a las 10", "Tu pedido ya está listo", "Te recordamos tu pago";
  barra ¡SOLOS! (2.32).
- s12-automaticos: conductora sorprendida "¿quién se los manda?"; Puck sobrador "nadie, mi amor";
  barra ¡AUTOMÁTICOS! con flash en "automáticos" (4.03).
- s13-scalerics: panel negro con borde verde "Scalerics · automatizaciones"; "lo que hacés a
  mano" se tacha (2.15); interruptores que se prenden en "recordar" (2.64), "avisar" (3.72) y
  "reclamar" (5.40).
- s14-dormir: Mirta duerme con antifaz y ruleros; el celular en la mesita manda "Turno confirmado"
  con tilde verde en "solo" (0.21); "a la hora justa"; zzz en "dormir" (2.26).
- s15-cta: MANDÁSELO / A TU PELUQUERA en letras gigantes, avioncito de papel volando, la
  conductora habla; sello QUE SE ENTERE POR ACÁ en "entere" (1.91).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá no es línea crema con un solo acento: es set de chimentos, rosa, dorado y negro).
> Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

