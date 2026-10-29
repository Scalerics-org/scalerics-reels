# Reel "El grupo de los agentes": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: el AGENTE DE IA, nombrado una vez, al final.
Formato B (diálogo espiado) contado como HISTORIETA.

Un narrador de cómic grave (voz Algenib) abre: "Nos metimos en el grupo de WhatsApp de los
agentes de IA. Y se están riendo de vos." En el grupo chusmean tres agentes de comercios del
barrio, dibujados como ROBOTITOS genéricos con su cartelito:
- LA DE LA PELUQUERÍA (voz Leda, robot MAGENTA con moño amarillo): agendó todos los turnos de la
  semana mientras la dueña estaba en el gimnasio.
- EL DE LA FERRETERÍA (voz Puck, robot CIAN con casco amarillo): vendió una canilla a las tres de
  la mañana; el dueño roncando.
- EL DE LA PIZZERÍA (voz Fenrir, robot AMARILLO con gorro de cocinero): tomó todos los pedidos
  durante el clásico; el dueño gritaba un gol.
Chusmerío: "¿Y el del almacén de la esquina?" Ese no tiene agente: contesta él, con un dedo, a
los tres días. "Pobre." Le mandó un audio de cuatro minutos a una clienta para decirle que sí, y
arrancó con "perdón la demora, estaba a mil". Risas del grupo. GIRO (el de la pizzería): "Bueno,
bueno, no se burlen. No es vago, che: tiene mil cosas. Atiende el mostrador, repone, cobra, y
encima tiene que contestar. Para eso estamos nosotros." La de la peluquería: "Tiene razón. Hay
que conseguirle uno de nosotros." Entra Orus (Scalerics): "En Scalerics hacemos tu agente de IA:
atiende por WhatsApp al instante, con tus precios, agenda turnos, toma pedidos, y te pasa la
charla cuando es para vos. Mandáselo al que todavía contesta con un dedo."
Voz de 67.2 s, reel de 70.38 s.

## RECURSO VISUAL CENTRAL: los mensajes del grupo son VIÑETAS de historieta
NO hay celular a pantalla completa. Cada mensaje del grupo es una viñeta (marco negro grueso con
sombra dura) donde el robot que habla aparece con un GLOBO de diálogo de 1 a 4 palabras (el texto
entero va en los subtítulos) y lo que cuenta dibujado al lado (la agenda llena, la canilla a las
3, el partido). Cada mensaje nuevo trae un "¡PLIN!" del color del que escribe arriba a la derecha
(lo pone ambiente). El DUEÑO DEL ALMACÉN es un humano de historieta (bigote, delantal cian, cara
cansada) que aparece en s05-s10. Onomatopeyas en estrellas de color ("¡ZAS!", "¡GOOOL!",
"¡TIC!", "¡JA JA JA!", "¡ALTO!") en la palabra que toca.

## ESTILO: CÓMIC con semitono. Edición CARGADA.
Papel con trama de puntos cian (lo pone el fondo del index). Contorno negro grueso (7-10 px) en
todo, sombras duras corridas 8-12 px en tinta, sombras internas con trama de puntos
(`url(#<prefijo>-trama)`), líneas de acción radiales, viñetas que entran torcidas y se acomodan,
sacudones, zoom de viñeta. Nada quieto más de ~0.8 s.

PIEZAS LISTAS en `assets/comic.js` (cargalo con `<script src="assets/comic.js"></script>` DESPUÉS
de gsap; expone `window.COMIC`): `defs(p)` (patrones de trama, va primero en cada svg),
`robot({p,x,y,s,kind:"pelu"|"ferre"|"pizza"|"scalerics",cara:"feliz"|"risa"|"pena"|"serio"|"sorpresa",tag,cls,flip})`
(origen entre los pies, ~300 de alto a s=1; partes `.cabeza .brazo-i .brazo-d .ojo .boca .acc`;
el cartel `tag` va en un `<g class="tag">` aparte), `dueno({p,x,y,s,cara:"cansado"|"apurado"|"feliz"})`,
`globo({x,y,w,h,cola:[x,y],lines,size})`, `onomato({x,y,r1,r2,txt,size,fondo,color,rot})`,
`vineta({p,x,y,w,h,fill,trama})`, `cartucho({x,y,txt,size})`, `rayos({x,y,r0,r1,n})`. Cada
escena arma su `<svg>` con `innerHTML` de esas piezas y después anima.

## Paleta (SOLO estos colores)
- Tinta `#141414`: contornos, sombras duras, trama, la noche.
- Papel `#fbf3dc` / blanco `#fffdf6`: fondos de viñeta y globos.
- Amarillo `#ffd60a`: onomatopeyas, cartuchos, el robot de la pizzería, subtítulos (caja).
- Cian `#22b8e6`: el robot de la ferretería, el delantal del almacenero, la trama del papel.
- Magenta `#ff2d87`: la robot de la peluquería, textos de onomatopeya, lo que es chiste.
- Desde s11 (Scalerics) entra verde `#5ce611`: el robot de Scalerics y lo que funciona.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales (ni WhatsApp: un
globito genérico), escudos o camisetas de cuadros reales (el clásico solo se nombra).

## Tipos de letra
Lexend 800-900 en globos y onomatopeyas (con contorno de tinta `paint-order: stroke`), IBM Plex
Mono 500 para rótulos. Nada que haya que leer de menos de 26 px.

## Zona
Título "LOS AGENTES" arriba a la izquierda (y 40-210) y el ¡PLIN! arriba a la derecha
(x 790-1050, y 30-240): ambos de ambiente. Subtítulos en caja amarilla en y 236 a ~450.
Contenido de cada escena entre y 520 y 1660, x 50-1030. Pie negro con el logo desde y 1700.

## Lo que ya está hecho (no tocar)
`index.html`, `compositions/ambiente.html` (marco, título, ¡PLIN! en cada mensaje, "+ EL TUYO" verde
en 56.75), `compositions/subtitulos.html`.

## Sonidos extra de este reel
`risas` (2.8 s), `redoble` (1.3 s), `uuh` (1.9 s), `beep`. Los ¡PLIN! (ping) ya los pone ambiente.

## Escenas (tiempos relativos a la escena: ver tiempos.md)
- s01-espia (7.15 s): cartucho "MIENTRAS TANTO..." y una gran viñeta-ojo de cerradura: por el
  agujero se ve a los tres robots en ronda, con un globito de chat genérico sobre ellos. En
  "grupo" se arma la viñeta; en "agentes" aparecen los tres con sus carteles; en "riendo" pasan a
  cara de risa y estalla "¡JA JA JA!"; en "vos" los tres SEÑALAN a cámara (brazos al frente) con
  sacudón.
- s02-pelu (5.47): viñeta de la peluquería: robot magenta con globo "¡TODOS!" y una AGENDA
  semanal cuyos casilleros se llenan de tildes en "agendé/todos/turnos" con "¡ZAS!"; en "dueña"
  entra una viñeta chica torcida con la dueña (silueta humana genérica) levantando una pesa,
  "gimnasio" la hace subir.
- s03-ferre (4.23): viñeta NOCHE (tinta) con luna y reloj "3:00"; robot cian le alcanza una
  CANILLA a un señor; globo "¡VENDIDA!"; en "roncando" viñeta chica con el dueño durmiendo y
  "ZZZ" que sube.
- s04-pizza (6.04): robot amarillo rodeado de comandas que vuelan y se apilan ("pedidos");
  en "clásico" una tele con una cancha genérica; en "gol" estalla "¡GOOOL!" gigante y el dueño
  salta de espaldas.
- s05-esquina (2.85): zoom dramático: líneas de acción y el ALMACÉN (fachada con toldo cian,
  cartel "ALMACÉN") que aparece en "almacén"; en "alguien" los tres robots asoman de costado,
  ojos grandes, "¿?".
- s06-un-dedo (7.45): tira de 3 viñetas que caen una por frase: "CONTESTA ÉL" (el dueño con el
  celu), "CON UN DEDO" (dedo gigante que toca, "¡TIC!"), "A LOS 3 DÍAS" (calendario que pasa
  hojas). En "Pobre." las viñetas se apagan y aparece el robot amarillo con cara de pena y globo
  "Pobre." chiquito (y el uuh).
- s07-audio (9.13): globo-audio gigante del almacenero con onda larguísima y "4:00" que se
  estira hasta salirse de la viñeta; en "sí" el globo se reduce a un "SÍ." enorme; en "perdón la
  demora" globo de texto "perdón la demora, estaba a mil" con gotas de sudor; "¡JA JA JA!" y
  risas.
- s08-alto (4.17): "¡ALTO!" (estrella amarilla) y el robot amarillo con la mano levantada, serio;
  en "vago" una palabra "VAGO" tachada en magenta; en "mil cosas" se ve al dueño.
- s09-mil-cosas (5.66): el dueño en el centro con muchos brazos-objeto alrededor apareciendo en
  cada verbo (mostrador, cajas para "repone", caja registradora "cobra", celular que vibra
  "contestar"); en "nosotros" entran los tres robots en pose de equipo de superhéroes con rayos.
- s10-conseguirle (3.30): la robot magenta, ternura, con un paquete de regalo con moño "PARA EL
  DEL ALMACÉN" (cartel), corazón chico de cariño.
- s11-scalerics (8.86): entra el robot VERDE de Scalerics con auriculares, cartel "TU AGENTE DE
  IA"; cada función entra como viñetita con ícono en su palabra: globo genérico con rayo
  ("al instante"), etiqueta de precio, agenda, comanda, y una flecha que le pasa un globo al
  dueño ("te pasa la charla").
- s12-cta (6.07): portada final: "MANDÁSELO AL QUE TODAVÍA CONTESTA CON UN DEDO" gigante en
  estrella, el dedo índice dibujado, los cuatro robots saludando, flecha de compartir.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es historieta con la paleta de arriba.
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

