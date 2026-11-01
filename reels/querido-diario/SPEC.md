# Reel "Querido diario": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: AUTOMATIZACIONES.
Formato D (confesión con nombre): Sofi, 14 años, lee su DIARIO ÍNTIMO (voz Leda). "Querido diario:
creo que papá tiene otra. Todas las noches, a las once, se encierra con ella en el escritorio. Se
llama Planilla." Entradas por día: lunes pasa los pedidos del WhatsApp a la planilla uno por uno
(papá en off, voz Charon: "¡Ya voy, ya voy!"); martes escribe "tu pedido está listo" a cuarenta
clientes y a Sofi la deja en visto desde el living; miércoles vende un taladro en la ferretería y
se queda hasta la una cambiando el stock de la tienda online a mano; jueves le canta el feliz
cumpleaños con la compu abierta ("el reporte del día"); papá en off: "Copiar... pegar... ¡No! ¡Se
me corrió una fila!". GIRO (viernes): mamá dice que no es otra, que papá las quiere: el problema
es que hace a mano lo que una máquina haría sola. "¿Quién le avisa a papá?" Entra Orus (Scalerics):
"Nosotros, Sofi": automatizaciones (el pedido pasa solo a la planilla, el aviso de listo sale solo,
el reporte llega al celular; lo repetido se hace solo mientras él cena con ustedes). Sábado: papá
cenó con nosotras, sin la Planilla. Cierre (Orus): "Mandáselo a tu papá." 76 s.

## ESTILO: DIARIO ÍNTIMO DE ADOLESCENTE. NO es el estilo de líneas crema.
Todo pasa en LAS HOJAS DEL DIARIO de Sofi, apoyado sobre su acolchado violeta de noche (el fondo ya
está), con una guirnalda de lucecitas arriba (ambiente). Cada día es una hoja rayada nueva
(renglones celestes, margen rosa, anillos de espiral a la izquierda) que entra girando un poco y se
va arrancada/dada vuelta. La letra es BIROME AZUL MANUSCRITA (Caveat 700) que se escribe
destapándose de izquierda a derecha con clip-path (helper `escribir()`). Los dibujos son GARABATOS
DE BIROME (SVG, trazo azul 6px, caps redondos) que se dibujan solos (helper `dibujar()`), más
STICKERS (corazones rosa rellenos con borde blanco, estrellitas amarillas), CINTA WASHI amarilla o
rosa con rayitas, RESALTADOR amarillo detrás de palabras, TACHONES (garabato en zigzag encima) y
corazoncitos dibujados en los márgenes. Humor tierno: la Planilla es "la otra" (la rival), con su
foto pegada como polaroid y un "LA OTRA" en birome con flecha.
Mirá `compositions/s01-querido.html`: ES LA ESCENA MODELO. Copiá su estructura (hoja `.sXX-hoja`
con renglones, margen y espiral; cinta washi; helpers `escribir()`, `dibujar()`, `pop()`;
etiqueta washi abajo; salida de 0.25 s con la hoja que se va).

## Paleta (SOLO estos colores)
- Papel `#fbf7ee` (hojas) con renglones celestes `rgba(78,140,214,0.35)` y margen rosa `#f07aa0`.
- Birome azul `#2b4fc7`: todo lo que escribe y dibuja Sofi.
- Rosa chicle `#ff6fa5`: corazones, stickers, acento de subtítulos, lo emotivo; tachones en rosa
  fuerte también valen.
- Amarillo resaltador `#ffe14d`: resaltador, cinta washi, estrellitas, la luz de la puerta.
- Violeta noche (el fondo, `#4a2d63` a `#170d20`): el cuarto. Para dibujos rellenos oscuros
  (puerta, sillón) usar `#3a2350`.
- Verde planilla `#1f8f4e` (con celdas `#d9f2e2`): SOLO la Planilla, "la otra" (s02, s03, s08,
  s12, s13).
Sombras suaves permitidas (`box-shadow: 0 16px 36px rgba(10,4,20,0.5)`). Prohibido: emojis, fotos,
degradés de colores, rayas largas (—) en textos visibles, cualquier color fuera de la paleta (el
verde WhatsApp tampoco: los globos de chat son papel con borde birome).

## Tipos de letra
Caveat 700 (`assets/fonts/Caveat-var.woff2`) para todo lo que escribe Sofi (mínimo 56px, ideal
70-130px); Lexend 600-800 para lo impreso (la Planilla, el celular); IBM Plex Mono 500 para
celdas y números de la planilla. Nada que haya que leer de menos de 28px.

## Personajes y objetos que se repiten
- **La hoja del diario**: left ~120, top ~600, 840x720, papel con renglones cada 60px, margen
  rosa a 100px, espiral de 9 anillos a la izquierda (círculos violeta oscuro), rotada -2 a 3 grados.
  Arriba a la izquierda el día ("Lunes", "Martes"...) en Caveat 110px birome, subrayado con un
  trazo rosa.
- **Papá (garabato de birome)**: cabeza redonda con pelo de tres rulitos, anteojos redondos,
  bigote, ojeras (dos arquitos), hombros; casi siempre de espaldas o de perfil con una compu
  (rectángulo + teclado) con la pantalla verde planilla. Aparece en s02, s03, s07, s08, s13.
- **La Planilla, "la otra"**: polaroid pegada con cinta: una grilla verde con celdas claras (3x5),
  con dos ojitos y pestañas dibujadas en birome y labios rosa: la rival. s02 y s12/s13.
- **Corazones**: sticker rosa relleno con borde blanco 6px (SVG path), rotados.

## Zona
Los subtítulos están arriba (y 236 a ~420): las escenas NO escriben la frase narrada entera, solo
1-5 palabras manuscritas clave. Contenido entre y 580 y y 1340. La etiqueta (cinta washi amarilla
con texto Caveat 54px birome, 1-4 palabras) va centrada con top 1410. El logo de Scalerics va en y
~1746 (no lo tapes). Arriba, y 60-170, la guirnalda del ambiente: no pongas nada ahí.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo violeta de acolchado con luz de velador.
- `compositions/ambiente.html`: guirnalda de lucecitas amarillas que titilan, luz cálida de velador
  que respira, viñeta, y FLASHES rosados en segundos globales 3.45 ("otra"), 7.88 ("Planilla"),
  42.9 ("fila"), 68.7 ("cenó"). Si cae uno en tu escena, que tu golpe visual coincida.
- `compositions/subtitulos.html`, `compositions/s01-querido.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `whoosh-cinematic`. Escribir con birome:
typing (vol 0.12-0.18, con "max"); hoja que cae: whoosh-short; sticker: pop; tachón: click o
glitch-1; corazón: sparkle o chime.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración de líneas crema con acento verde; es diario íntimo con papel,
> birome azul, stickers y la paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

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


## Brief por escena (tiempos relativos a la escena, de tiempos.md)

- **s01-querido** (4.12 s). Hoja del diario ya cayendo en el cuadro 0 con "Querido diario:"
  medio escrito arriba (Caveat 120 birome) y un corazoncito rosa en el margen. En "creo" (1.30) se
  escribe "papá tiene..." y en "otra" (3.45) aparece "OTRA" gigante en rosa, subrayado doble, un
  corazón sticker se parte en dos (dos mitades que se separan) + flash. Etiqueta: "Top secret".
- **s02-planilla** (4.80 s). Garabato de una puerta cerrada (violeta oscuro) con la luz amarilla
  que sale por abajo y un reloj dibujado que marca 23:00 ("once" 0.88). En "encierra" (1.84) la
  puerta tiembla. En "Planilla" (3.76): la polaroid de "la otra" cae pegada con cinta (grilla verde
  con ojitos, pestañas y labios rosa) y Sofi escribe "LA OTRA" con flecha birome; flash. Etiqueta:
  "Se llama Planilla".
- **s03-lunes** (4.31 s). Hoja nueva: "Lunes" arriba. Garabato de papá de espaldas frente a la
  compu verde; globos de chat de papel (borde birome) saltan del celular a las celdas de la
  planilla, UNO POR UNO (uno cada ~0.35 s desde "pedidos" 1.20); en "uno por uno" (3.08) un
  contador manuscrito "1, 2, 3... 38" y un dibujito de caracol. Etiqueta: "Uno por uno".
- **s04-ya-voy** (5.41 s). En "tarea" (0.81) el cuaderno de tarea de Sofi (con "Matemática" en
  Caveat) y Sofi mini (garabato con colitas) que levanta la mano. En "¡Ya voy" (2.20) desde el
  costado sale un globo de diálogo grande impreso "¡YA VOY, YA VOY!" (Lexend 800 birome) desde una
  puerta; en "Nunca vino" (3.93) un reloj dibujado gira las agujas rápido y aparece un sello rosa
  manuscrito "NUNCA VINO" torcido. Etiqueta: "Spoiler: no".
- **s05-martes** (7.65 s). "Martes". En "tu pedido está listo" (1.34) se apilan globos de chat de
  papel "Tu pedido está listo" (Lexend 600 28-34px) en cascada, contador manuscrito que sube a "x40"
  en "cuarenta" (2.84). En "A mí" (3.95) los globos se barren y aparece el celular de Sofi
  (rectángulo redondeado violeta oscuro con pantalla papel): un globo de ella "Pa, ¿me ayudás?" y
  debajo "Visto" en "visto" (5.47) con dos tildes; un círculo rosa a mano alrededor. En "living"
  (6.59) dibujito de un sillón y una flecha "a 3 metros" en birome. Etiqueta: "Visto".
- **s06-miercoles** (6.47 s). "Miércoles". Sticker de un taladro (recorte papel amarillo con
  contorno birome) en "taladro" (1.44) con "¡vendido!" manuscrito. En "la una" (3.36) un relojito
  marca la 1:00 y aparece una luna con ojeras. En "stock" (4.19) una mini ventana de tienda (Lexend)
  con "Stock: 12" que Sofi tacha y escribe "11" a mano; en "A mano" (5.52) una mano garabato con
  birome que escribe, temblando. Etiqueta: "A la una".
- **s07-jueves** (7.34 s). "Jueves" + "¡MI CUMPLE!" con estrellitas amarillas. En "cumpleaños"
  (0.80) torta dibujada con 14 (un "14" de velita) y corazones. En "cantó" (2.00) papá garabato con
  la boca abierta y notitas musicales, pero al lado la compu abierta (verde) en "compu" (3.76). En
  "El reporte del día" (4.94) un globo de diálogo de papá con esas palabras y la velita se apaga
  (humito garabato). Etiqueta: "Feliz cumple (?)".
- **s08-fila** (3.78 s). Primer plano de la planilla verde (grilla grande Plex Mono con pedidos:
  "2 milanesas", "tornillos x50"...). "Copiar" (0.00) y "pegar" (1.09): una selección punteada
  salta de una fila a otra. En "¡No!" (1.85) / "corrió" (2.43) todas las filas se corren de golpe
  hacia un costado (desfasadas) + sacudón + flash rosa en "fila" (2.80); un tachón de birome encima
  y "¡NOOO!" manuscrito. Etiqueta: "Se corrió".
- **s09-viernes** (7.35 s). "Viernes". En "Mamá dice que no es otra" (0.91-1.84) vuelve la frase
  "papá tiene otra" del primer día y se TACHA con zigzag rosa. En "nos quiere" (2.88) un corazón
  sticker grande. En "hace a mano" (4.56) un garabato de mano copiando, y en "máquina" (5.68) un
  engranaje dibujado que gira solo; en "sola" (6.40) se resalta "sola" con amarillo. Etiqueta:
  "Plot twist".
- **s10-quien** (2.65 s). "Querido diario:" de nuevo y un signo de pregunta gigante en birome que
  se dibuja en "quién" (1.12), con corazoncitos alrededor. Etiqueta: "¿Quién?".
- **s11-nosotros** (3.95 s). ENTRA SCALERICS: sobre la hoja se pega un post-it amarillo grande
  con cinta, escrito en Lexend impreso (otra letra: no es Sofi): "Nosotros, Sofi." en "Nosotros"
  (0.00), y en "automatizaciones" (2.52) un sello rosa "AUTOMATIZACIONES" (Lexend 800) que entra
  con golpe. Etiqueta: "Scalerics".
- **s12-solo** (5.77 s). Tres renglones de la hoja con tres flujos que se arman SOLOS (sin mano):
  "pedido" (0.05) globo de chat que vuela solo a la planilla verde con "solo" tildado; "aviso de
  listo" (1.96) un globo "Tu pedido está listo" que sale solo con un avioncito de papel; "reporte"
  (3.96) un celular con "Reporte del día" que llega con un ping. Cada uno con un tilde rosa y la
  palabra "solo" manuscrita al lado. Etiqueta: "Solito".
- **s13-sabado** (8.18 s). "Lo repetido se hace solo" (0.00-1.06): la compu verde se cierra (tapa
  que baja) y se apaga. En "cena" (2.28) una mesa dibujada con tres platos y tres cabecitas (papá,
  mamá, Sofi). En "Sábado" (3.89) hoja nueva con "Sábado" y la mesa crece; en "cenó" (5.09)
  corazones sticker que saltan alrededor + flash; en "Sin la Planilla" (6.69) la polaroid de la
  Planilla aparece chiquita y Sofi le dibuja una X/tachón y "chau". Etiqueta: "Sin la otra".
- **s14-cta** (4.27 s). Última hoja: "Mandáselo a tu papá" escrito en Caveat 120 birome con un
  corazón grande rosa que late, la cinta washi y abajo firma "Sofi" con un corazoncito. Se queda
  hasta el final, latiendo. Etiqueta: "Pasáselo".
