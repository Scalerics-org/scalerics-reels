# Reel "Código rojo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; este reel vende UNA cosa: el
AGENTE DE IA que atiende el WhatsApp del comercio). Formato P: SERIE DE MÉDICOS DE GUARDIA.
Entra un PARAMÉDICO (voz Fenrir, a los gritos) empujando una camilla: "¡Doctora! ¡Comercio en
código rojo! ¡Lleva tres días sin contestar un WhatsApp!". La DOCTORA de guardia (Kore, seca e
irónica): "Esto no es Grey's Anatomy. Rápido: síntomas." Paramédico: "Visto crónico. Un 'consultá
por privado' agudo. Mensajes de las once de la noche sin leer. Y un 'te contesto el lunes' que ya
va por el jueves." Doctora: "Escuchen el monitor: cada cliente que se va es un bip menos." El
DUEÑO en la camilla (Charon, desesperado): "¡Estaba en la caja! ¡Tengo mil cosas! ¡Los
proveedores, el mostrador, la limpieza!" Doctora: "Desfibrilador. ¡Despejen!" Paramédico: "¡Nada,
doctora! Le mandó un audio de cuatro minutos y se le fue otro cliente." Doctora: "Como diría el
doctor House: todos mienten. Y este dijo que contestaba el lunes." GIRO: "Pero miren la
radiografía. El corazón está perfecto: buena mercadería, buena atención. El problema es que el
paciente hace todo solo." "Receta: un agente de IA. Atiende el WhatsApp al instante, a cualquier
hora, con tus precios, tu stock y tus horarios. Agenda, y le escribe al que preguntó y no compró."
Paramédico: "¡Doctora, volvió el pulso!" Doctora: "Se va de alta." Cierra ORUS (Scalerics): "Tu
agente de IA lo armamos en Scalerics. Mandáselo al que lleva tres días en visto." Voz de 69.7 s,
total 72.88 s. Las referencias (Grey's Anatomy, Dr. House) solo se NOMBRAN: nada de logos, caras,
tipografías ni imágenes de las series; personajes dibujados genéricos.

## Recurso central: el MONITOR CARDÍACO DEL LOCAL
Abajo (y 1426-1604) `ambiente.html` tiene un monitor que corre TODO el reel: "PULSO DEL LOCAL",
trazo verde que late, estado CRÍTICO / SIN PULSO / ESTABLE, corazón que late. El pulso es la
historia: rápido y urgente al principio, se debilita y pierde bips en "cada cliente que se va es
un bip menos" (19.6-21.0), descarga en "¡Despejen!" (30.42, flash blanco), PLANO y rojo en "¡Nada!"
(31.67-36.3), débil hasta la receta, y desde "Atiende" (53.6) cada latido más fuerte, hasta
"¡volvió el pulso!" (60.51, ESTABLE verde). Los bips se oyen (`assets/bgm/guardia.mp3`, sintetizado
por `partes/guardia.mjs` con los mismos latidos de `partes/latidos.json`).
Arriba (y 96-180) el cartel "GUARDIA" con cruz roja y dos BALIZAS rojas en las esquinas, que giran
y tiñen la pantalla de rojo en los tramos de código rojo (0-8.07 y 29.17-36.31).

## ESTILO: GUARDIA DE HOSPITAL (serie de médicos). Edición cargada.
Planos de serie de guardia: la camilla que entra a toda velocidad, la doctora con ambo y cofia
verde quirúrgico, la historia clínica en un portapapeles, palas de desfibrilador, la radiografía en
el negatoscopio (celeste sobre azul), el recetario. Personajes planos de contorno blanco grueso con
rellenos oscuros y un color de identidad. Cortes secos, palabras gigantes que caen en su palabra,
sellos, sacudones en los golpes. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Fondo quirófano `#03171b` / panel `#0b2e35` (rellenos de personajes, paneles).
- Verde quirúrgico `#4fc3b0`: ambo y cofia de la doctora, colchón de la camilla, rótulos, la
  bata de lunares del dueño.
- Blanco clínico `#eef6f5`: contornos (stroke 7), textos fuertes.
- Rojo emergencia `#ff3341`: código rojo, paramédico (chaleco), balizas, sellos, la línea plana,
  lo que falla. (Texto rojo en subtítulos: `#ff5c66`.)
- Celeste rayos X `#9fe3ff`: la radiografía, el negatoscopio, el dueño en subtítulos.
- Verde monitor / Scalerics `#5ce611`: el trazo del pulso, y desde la receta (s12) el AGENTE DE IA,
  los tildes, el ALTA, el CTA.
Bata del dueño: `#cfe5e2` (tono del blanco). Brillos (drop-shadow/text-shadow del mismo color)
en 1-2 cosas por escena como máximo. Prohibido: emojis, fotos, rayas largas (—) en textos
visibles, logos o caras reales.

## Personajes (iguales en todas las escenas: `partes/escenas/pj.py`)
- PARAMÉDICO: chaleco ROJO con banda blanca reflectiva, gorra roja con cruz blanca, cejas de
  urgencia, boca abierta gritando.
- DOCTORA: ambo y cofia VERDE QUIRÚRGICO con puntitos, anteojos, estetoscopio blanco.
- DUEÑO: sentado en la camilla, bata de paciente con lunares verdes, pelo revuelto, ojeras, barba
  de días, pulserita roja; cejas de preocupación.
- AGENTE DE IA (desde s12): celular verde con cara y auriculares.

## Tipos de letra
Lexend 800-900 para carteles y palabras gigantes; IBM Plex Mono 500 para rótulos, historia
clínica, horas. Nada que haya que leer de menos de 26px (lo decorativo chico, `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~400, `subtitulos.html`; el acento de cada palabra tiene el color de
quien habla: rojo paramédico, verde agua doctora, celeste dueño, verde Scalerics; lo arma
`armar.mjs` con `voces`). Las escenas NO escriben la frase entera. Contenido de las escenas entre
y 440 y y 1410 (abajo está el monitor), x 50-1030.

## Cómo se hacen las escenas
`partes/escenas/sNN.py` + `python3 partes/escenas/gen.py partes/escenas/sNN.py` (escribe
`compositions/<id>.html` y `.sfx.json`, con helpers `golpe`, `pop`, `entra`, `dibujar`, `habla`,
`sacudon` y la salida con blur). Los personajes salen de `pj.py`.


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)
- **s01-codigo** (2.38 s): la CAMILLA entra de derecha a izquierda a toda velocidad (ruedas que
  giran, líneas de velocidad) con el dueño sentado y el paramédico empujando atrás. En "código
  rojo" (1.26) cae "CÓDIGO ROJO" gigante rojo con sacudón. Cuadro 0: la camilla ya entrando.
- **s02-tres-dias** (2.30 s): celular gigante del local con un chat: tres burbujas de clientes
  ("¿Tenés talle M?", "¿A qué hora abren?", "¿Hola?") con hora y DOS tildes de visto; en "tres
  días" (0.24) cae un sello rojo "3 DÍAS" y un cartel "SIN RESPUESTA".
- **s03-greys** (3.39 s): entra la DOCTORA (de abajo) poniéndose los guantes; en "Grey's
  Anatomy" (0.60) un cartel "ESTO NO ES UNA SERIE" en blanco con "GREY'S ANATOMY" tachado con
  línea roja que se dibuja; en "síntomas" (2.29) la doctora señala y pop de "SÍNTOMAS".
- **s04-sintomas** (5.38 s): HISTORIA CLÍNICA en un portapapeles grande (papel blanco, clip
  verde): "PACIENTE: COMERCIO". Se van tildando renglones en su palabra: "VISTO CRÓNICO" (0.00),
  "'CONSULTÁ POR PRIVADO' AGUDO" (1.43), "MENSAJES DE LAS 23:00 SIN LEER" (3.50, con un reloj que
  marca las 23:00).
- **s05-lunes** (4.09 s): calendario de hoja que pasa: "LUNES" en "lunes" (1.38) con globo "te
  contesto el lunes", y las hojas vuelan martes, miércoles hasta "JUEVES" en "jueves" (2.68) con
  sello rojo "VENCIDO".
- **s06-monitor** (4.57 s): la doctora señala el monitor de abajo; en el centro, clientes
  (siluetas) que salen por una puerta uno por uno en "cliente" (1.65) y "se va" (2.23); en "bip"
  (3.11) un "BIP" gigante que se tacha / cae "-1".
- **s07-caja** (7.06 s): el DUEÑO en la camilla, primer plano, defendiéndose (boca que habla,
  brazos que se agitan); alrededor estallan carteles: "¡ESTABA EN LA CAJA!" (0.43), "MIL COSAS"
  (2.00), e íconos que lo rodean: caja de proveedor (3.21), mostrador (4.17), balde y escoba
  (5.39).
- **s08-despejen** (7.14 s): las PALAS del desfibrilador (rojo/blanco) con "CARGANDO" y una barra
  que se llena; "¡DESPEJEN!" (1.25) golpe gigante con flash y sacudón grande; "NADA" (2.50) en
  rojo, la línea plana; en "audio" (4.10) una burbuja de audio de WhatsApp larguísima "4:00"
  con onda; en "otro cliente" (5.80) una silueta que se va con "-1".
- **s09-house** (5.83 s): la doctora con anteojos de costado, irónica; "DR. HOUSE" cartela mono
  (0.86) y "TODOS MIENTEN" gigante (1.55); en "lunes" (4.57) el globo "te contesto el lunes" con
  sello rojo "MENTIRA".
- **s10-radiografia** (6.17 s): NEGATOSCOPIO (caja de luz celeste) y la radiografía del torso del
  local: costillas que se dibujan; en "corazón" (1.82) late un corazón celeste; "PERFECTO" (2.45)
  sello verde agua; rótulos con flecha "MERCADERÍA OK" (3.63) y "ATENCIÓN OK" (4.82).
- **s11-solo** (3.31 s): en la radiografía aparece UN solo hombrecito haciendo malabares con caja,
  celular, escoba y bolsa; en "solo" (2.28) cartela roja "DIAGNÓSTICO: HACE TODO SOLO".
- **s12-receta** (8.89 s): el RECETARIO ("Rp/") se escribe: "AGENTE DE IA" en verde (0.92); sale
  el AGENTE (celular verde con auriculares) y contesta burbujas al toque en su palabra: "al
  instante" (2.77), "24 h" en "cualquier hora" (3.52), "Precio", "Stock", "Horario" (4.44, 5.09,
  5.74), "Turno agendado" (6.41), "¿Te lo guardo?" al que preguntó y no compró (7.40).
- **s13-alta** (3.93 s): el paramédico festeja ("¡VOLVIÓ EL PULSO!" verde en 0.50); el dueño se
  baja de la camilla; sello gigante verde "ALTA" en "alta" (2.69).
- **s14-cta** (8.44 s): Scalerics: el agente de IA con un cartelito "TU AGENTE DE IA"; logo grande
  en "Scalerics" (2.21); en "Mandáselo" (2.77) botón "MANDÁSELO" con flecha de compartir y "AL QUE
  LLEVA 3 DÍAS EN VISTO" con doble tilde.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la guardia con la paleta de arriba,
> rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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

