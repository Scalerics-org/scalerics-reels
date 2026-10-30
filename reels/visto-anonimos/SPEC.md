# Reel "Visto Anónimos": spec de las escenas

Reel vertical 1080x1920 de Scalerics. Formato B (DIÁLOGO de varias voces) en una REUNIÓN DE UN GRUPO
DE APOYO ANÓNIMO, "Visto Anónimos": los comerciantes que dejan en visto se sientan en ronda en un salón
parroquial. Gancho: "Hola. Me llamo Gustavo. Y hace tres días que dejo en visto." / el grupo, a coro:
"Hola, Gustavo." La coordinadora (voz Kore, cálida e irónica) guía la ronda; Gustavo (voz Charon,
avergonzado) confiesa: lo abre, lo lee, "después le contesto", y después es nunca; contestó un precio
con un pulgar; mandó un audio de cuatro minutos en el que se escucha el partido. Mirta (voz Leda,
canchera) confiesa que en Instagram pone "consultá por privado"... y en el privado también (aplauso
tibio). La coordinadora pincha al que mira: "¿Y vos? Sí, vos. El que está mirando esto con tres chats
sin contestar." Gustavo: "no doy abasto: si contesto, no atiendo; si atiendo, no contesto". GIRO: "No
sos un mal comerciante, Gustavo. Sos uno solo." Rosa (voz Aoede) lleva un mes limpia: un agente de IA
que contesta al instante, a cualquier hora, con sus precios y horarios, agenda turnos y le pasa lo que
es para ella. "¿Y vos qué hacés a las once de la noche?" "Duermo." (risas y aplausos). Cierra Orus
(Scalerics): "Ese agente de IA lo hacemos en Scalerics. Etiquetá al que tiene que venir a la próxima
reunión. Le guardamos una silla."
Voz armada de 22 parlamentos (`partes/`, 72.2 s); reel de 75.4 s.

## ESTILO: SALÓN PARROQUIAL (grupo de apoyo)
Un salón pelado de reunión: arriba, un TUBO FLUORESCENTE que parpadea (vive en
`compositions/ambiente.html`, arriba de los subtítulos, con su resplandor verdoso), pared verde
hospital, piso de BALDOSAS en damero (abajo, en perspectiva), SILLAS PLEGABLES de madera y caño en
ronda (vista cenital en s02, lateral en el resto), una mesita con TERMO y VASITOS de café de
plástico, el cartel escrito a mano "UN MENSAJE A LA VEZ" pegado con cinta, las etiquetas
autoadhesivas de nombre ("HOLA, SOY" + el nombre a mano) en el pecho de cada uno y las FICHAS /
MEDALLAS de "días sin dejar en visto". Personajes dibujados genéricos (bustos con relleno oscuro y
contorno beige): Gustavo (pelo con entradas, barba de tres días, camisa a cuadros madera), la
coordinadora (melena canosa, lentes con cadenita ámbar, cárdigan verde hospital, carpeta), Mirta
(pelo batido ámbar, aros ladrillo grandes, labios ladrillo), Rosa (pelo corto, delantal de
peluquera con tijera, la medalla del mes al cuello) y el agente de IA (un celular con cara y su
etiqueta de nombre). Edición cargada: palabras gigantes que caen, sellos ladrillo ("EN VISTO",
"NUNCA", "POR PRIVADO"), apagones del tubo en los golpes, la acotación "(aplauso tibio)".

Recurso central: los subtítulos llevan la ETIQUETA de quién habla (GUSTAVO madera, EL GRUPO con
borde, LA COORDINADORA verde, MIRTA ladrillo, ROSA ámbar, SCALERICS beige) y la letra de la
coordinadora va en verde claro, la de Mirta en ladrillo claro y la del grupo en cursiva. Lo arma el
`armar.mjs` local con `partes/voces.json` (g, x, k, m, r, o por palabra).

## Paleta (SOLO estos colores)
- Verde casi negro `#141c19` (fondo y relleno de caras/cuerpos) y pared en sombra `#22302a` (brillo `#2c3d35`).
- Beige `#ece2c6`: líneas, papel, textos grandes, el tubo.
- Verde hospital `#8fb39b`: pared, cárdigan, pantalla del agente, resplandor del tubo (`#d8f0de` muy transparente).
- Madera `#9a6438`: sillas plegables, mesita, camisa de Gustavo, marco.
- Ámbar `#f2a541` (acento cálido): café, medallas, lentes, acento de los subtítulos.
- Ladrillo `#d65a3a`: sellos, banda de las etiquetas "HOLA, SOY", aros y labios de Mirta.

## Tipos de letra
Lexend 600-900 (lo grande, globos), IBM Plex Mono 500 (rótulos, etiquetas), Caveat 700 (el cartel,
las etiquetas de nombre, lo escrito a mano). Nada que se lea por debajo de 28 px.

## Cómo se arma
`partes/`: gen.sh / gentodo.sh (voces) -> raw/ ; recortar.sh (puntas y coro de 4 voces) -> rec/ ;
compactar.mjs (pausas internas y atempo) -> cmp/ ; pj.sh (tiempos por parlamento) -> pj/ ;
unir.mjs -> assets/voice/locucion.wav, palabras.json y partes/voces.json.
Escenas: `lib-escenas.mjs` (paleta, personajes, muebles, esqueleto) + `escenas.mjs` (una por escena);
`node escenas.mjs && node armar.mjs`.

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


## EN ESTE REEL MANDA LO DE ARRIBA
Paleta, tipos y estilo del salón parroquial reemplazan al estilo clásico de líneas (crema/verde) de
SPEC-base: rellenos planos de la paleta con contorno beige, sellos ladrillo, palabras gigantes que
caen. La zona del dibujo es y 580-1330; la etiqueta mono ámbar va en top 1420.

## Brief por escena (tiempos relativos a cada escena: ver tiempos.md)

- **s01-gustavo** (0-4.37, Gustavo): Gustavo de pie entre dos sillas plegables (ya a medio dibujar
  en el cuadro 0), avergonzado, con su etiqueta "HOLA, SOY Gustavo" que late en "Gustavo" (1.0).
  "HACE TRES DÍAS" cae en "tres" (2.3); "QUE DEJO EN VISTO" en ámbar en "dejo" (3.56); sello
  ladrillo "EN VISTO" con doble tilde en "visto" (3.8) + flash del tubo. Etiqueta "REUNIÓN DE LOS JUEVES".
- **s02-ronda** (4.37-8.53, el grupo + coordinadora): la ronda vista desde arriba: 8 sillas, 7
  cabezas y la de Gustavo con borde ámbar que titila; de cada cabeza sale un "hola" manuscrito
  (0.02-0.4). En "Acá" (2.25) cae "ACÁ NADIE TE JUZGA"; en 3.0 una flecha ladrillo señala a una
  del grupo: "(ella sí)". Etiqueta "VISTO ANÓNIMOS".
- **s03-lo-leo** (8.53-12.71, Gustavo): celular con el mensaje de la clienta "¡Hola! ¿Mañana abren
  temprano?" (0.15); "abro" (1.0) la pantalla se ilumina; "leo" (1.6) doble tilde ámbar + "LEÍDO";
  "pienso" (2.2) Gustavo chico abajo a la derecha con la nube de pensamiento: "después le
  contesto" escrito a mano en "después" (3.0); la pantalla se apaga (3.75).
- **s04-nunca** (12.71-16.98, coordinadora y Gustavo): la coordinadora con la ceja levantada y un
  almanaque de taco con la hoja "Después"; la hoja se arranca (1.25) y en "Nunca" (1.56) cae el
  sello "NUNCA"; en "Después es nunca" (2.46) se escribe "después = nunca" con subrayado ámbar.
- **s05-pulgar** (16.98-20.40, Gustavo): chat: "Hola, ¿qué precio tiene la mesa de luz?"; en
  "Contesté" (1.6) los tres puntitos; en "pulgar" (2.45) un pulgar gigante dibujado como respuesta;
  la clienta: "¿Eso es un sí?" (2.8). Etiqueta "RESPUESTA: UN PULGAR".
- **s06-audio** (20.40-25.67, Gustavo): burbuja de audio con onda y contador que corre hasta 4:12;
  "CUATRO MINUTOS" cae en "cuatro" (1.6); en "Se escucha" (3.18) "MINUTO 3 · DE FONDO", las barras
  del minuto 3 saltan en ladrillo, entra una pelota y "¡GOOOL!" manuscrito en "partido" (4.0).
- **s07-mirta** (25.67-32.39, coordinadora y Mirta): "¿ALGUIEN MÁS?" (0.05); Mirta levanta la mano
  en "Yo" (1.0); en "Instagram" (1.94) entra su posteo (vestido en una percha) con "Precio:
  consultá por privado." subrayado en "consultá" (3.25); en "¿Y cuando...?" (4.85) cae "¿Y EN EL
  PRIVADO?" y Mirta cambia la cara.
- **s08-privado** (32.39-35.73, Mirta): el chat privado: "¡Hola! ¿Precio del vestido?" y la
  respuesta de Mirta "Consultá por privado." (0.8); sello "YA ES EL PRIVADO" (1.45); "(APLAUSO
  TIBIO)" con dos manitos que aplauden sin ganas (2.0) y el sfx de aplauso bajito.
- **s09-vos** (35.73-40.13, coordinadora al que mira): una silla plegable vacía de frente; "¿Y VOS?"
  (0.11) y "SÍ, VOS." ámbar (0.85) con apagón del tubo; la etiqueta "HOLA, SOY Vos" se pega en el
  respaldo (1.2); zoom lento a la silla; en "tres chats" (2.5-3.2) aparecen tres chats sin contestar
  con su globito rojo ("¿Precio?", "¿Abren hoy?", "¿Hay talle?").
- **s10-abasto** (40.13-44.48, Gustavo): mostrador con una clienta y timbre a la izquierda, el
  celular a la derecha, Gustavo en el medio; "NO DOY ABASTO" (0.45) con cara de grito; "Si
  contesto" (1.4) se inclina al celular y suena el timbre: sello "NO ATIENDO" (2.15); "Si atiendo"
  (2.6) se inclina al mostrador, vibra el celular: sello "NO CONTESTO" (3.35).
- **s11-uno-solo** (44.48-48.18, coordinadora: EL GIRO): Gustavo bajo el cono de luz del tubo;
  "NO SOS UN MAL / COMERCIANTE" (0.05-0.55); las otras sillas se van (1.9), el cono se intensifica y
  en "Sos" (2.2) cae "UNO SOLO." gigante ámbar; Gustavo se sorprende. Parpadeo fuerte del tubo.
- **s12-limpia** (48.18-52.03, coordinadora y Gustavo): Rosa serena con la medalla al cuello;
  "UN MES LIMPIA" (1.0); la ficha ámbar "UN MES · SIN DEJAR EN VISTO" entra girando (0.75) con
  destellos; Gustavo chico abajo a la derecha, sorprendido, en "¿Un mes?" (2.05).
- **s13-agente** (52.03-60.90, Rosa): el agente de IA (celular con cara y etiqueta "Agente de IA")
  sube en "agente" (0.05) y saluda; "UN AGENTE DE IA" (0.7); tarjetas con tilde en la palabra:
  "Contesta al instante" (1.5), "A cualquier hora" (2.9), "Tus precios y horarios" (4.3), "Agenda
  los turnos" (5.5); en "Y lo que es para mí" (7.5) la tarjeta ámbar "Lo que es para vos, te lo pasa".
- **s14-duermo** (60.90-64.34, Gustavo y Rosa): "23:00" cae en "once" (0.8); Rosa en "Duermo."
  (1.85) se pone el antifaz verde, se inclina, salen las Z y la luna; risas y aplausos del grupo.
- **s15-cta** (64.34-75.44, Orus): el agente de IA sentado entre dos del grupo: "AGENTE DE IA"
  (0.55) + "LO HACEMOS EN SCALERICS" (1.6). Corte (2.75): el cartel "Un mensaje a la vez", la silla
  vacía, "ETIQUETÁ" gigante (2.85) y "AL QUE TIENE QUE VENIR" (4.0); la etiqueta "HOLA, SOY @....."
  se pega en el respaldo (4.7) y late; en "guardamos" (6.7) un vasito de café humeante en el
  asiento y la etiqueta "LE GUARDAMOS UNA SILLA". Queda ~3 s quieto con movimiento suave.
