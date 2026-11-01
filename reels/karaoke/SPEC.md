# Reel "Karaoke": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA (atiende WhatsApp e Instagram al instante y a
cualquier hora con precios, stock y horarios; toma pedidos y reservas; le escribe a la que preguntó y no
volvió). Formato P: NOCHE DE KARAOKE EN UN BAR DE BARRIO. VALE (voz Leda, bolero sufrido) agarra el
micrófono: "Esta canción se la dedico a tu local. Que me dejó en visto." La mesa del fondo (Fenrir):
"¡Uuuh! ¡Dale, Vale!". Vale recita su bolero, y la letra se pinta palabra por palabra en la pantalla del
karaoke con la bolita que salta: "Te pregunté el precio... a las once de la noche. Y vos... dormías." /
"Te pedí una mesa para el sábado. Y me dijiste... pasá el lunes." / estribillo: "Y me fui con el de
enfrente... que me contestó al instante. ¡Al instante!". El ANIMADOR (Puck): "¡Qué temazo! Y el puntaje de
tu local es... ¡en visto!". GIRO: EL DUEÑO desde la barra (Charon): "¡Pará, Vale! ¡Estaba cerrando la
caja! Atiendo, repongo, llamo al proveedor... No es que no te quiera. Es que estoy solo." Entra Scalerics
(Orus): "Solo, no. En Scalerics hacemos agentes de IA..." "Para que ninguna clienta te dedique una
canción." CTA: "¿Y vos qué canción le dedicarías al local que te dejó en visto? Dejala en los comentarios."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs, con FIX para palabras
corridas a mano): 64.4 s; reel 67.6 s.

## RECURSO VISUAL CENTRAL
La PANTALLA DEL KARAOKE (monitor con marco negro y borde azul que brilla): adentro, un videoclip genérico
de los 90 (atardecer violeta-magenta-naranja, sol a rayas, mar violeta, palmeras en silueta, scanlines) y
una BANDA AZUL ELÉCTRICO abajo con la letra en blanco, contorno azul oscuro, que SE PINTA de amarillo (o
magenta en el estribillo) palabra por palabra, con la BOLITA amarilla que salta sobre cada palabra
(KR.linea + K.pintar). En el tramo de la letra (palabras 16-55) NO hay subtítulos del reel: la pantalla es
el subtítulo (reel.sinsub). Al final, el PUNTAJE del karaoke (s07: "EN VISTO"; s12: "¡AL INSTANTE!").

## ESTILO: KARAOKE DE BAR
Fondo (armar.mjs): pared violeta noche con resplandor magenta al centro y halo azul arriba; tarima de
madera violeta (y 1460-1670) con filete magenta neón; franja de abajo casi negra con filete azul y el logo.
ambiente.html: cartel de neón "Karaoke" en Caveat magenta arriba a la izquierda (titila al arrancar, se
pone verde desde Scalerics), BOLA DE ESPEJOS colgando arriba a la derecha (facetas que titilan, destello,
vaivén), dos haces de luz que barren y manchitas de luz que giran; chapa de quién habla abajo a la
izquierda (VALE magenta · LA MESA DEL FONDO amarillo · EL ANIMADOR celeste · EL DUEÑO naranja · SCALERICS
verde); flash blanco en "¡en visto!" (32.10) y "Scalerics" (42.84).
Personajes planos con contorno violeta casi negro grueso (stroke 6-8), en `assets/karaoke.js` (window.KR):
VALE (rulos enormes bordó, vestido de lentejuelas magenta, aros amarillos, micrófono, ojos cerrados al
cantar, lágrima), EL DUEÑO (pelado, bigote, camisa naranja, delantal, repasador), EL ANIMADOR (jopo, saco
azul con solapas amarillas, moñito magenta), EL AGENTE DE IA (un celular con cara en pantalla verde y
vincha con micrófono), el PÚBLICO (siluetas violetas con chopps).

## Paleta (SOLO estos)
- Violeta noche `#12081f` (medio `#2b1550`, `#3a1d6b`): fondo, contornos, siluetas.
- Azul karaoke eléctrico `#1638d6` (claro `#3d63ff`, oscuro `#0b1a6e`): pantalla, banda de letra, saco del animador.
- Amarillo letra pintada `#ffd81a`: la letra que se pinta, la bolita, chopps, aros.
- Magenta neón `#ff2fa0`: Vale, neón, sellos, estribillo.
- Naranja atardecer `#ff8a3d`: videoclip, el dueño.
- Blanco cálido `#fff6e8`: letra sin pintar, globos.
- Solo desde s10 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para el agente.
Subtítulos (para no confundirse con la letra del karaoke): Lexend 600 blanco cálido con contorno violeta
grueso, arriba a la izquierda (y 236); acento del color de quien habla: magenta Vale, amarillo público,
celeste `#4fd8ff` animador, naranja dueño, verde Scalerics. La letra del karaoke va en Outfit 800, centrada
y adentro de la pantalla.
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp e Instagram solo como texto), letras ni
música de canciones reales.

## Tipos de letra
Outfit 800 (letra del karaoke, títulos de tema), Lexend 800 (globos, chapas), IBM Plex Mono 600 (rótulos),
Caveat 700 (neón), Black Ops One (sellos).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1540. Chapa en y 1560-1660 (izquierda) y logo en y
1746: no taparlos. Neón y bola de espejos arriba en y 50-220.

## Lo que hace ambiente.html (segundos globales)
Chapas por turno: v 0 · p 4.42 · v 7.30 · a 28.54 · d 33.46 · o 41.75. Flash en 32.10 y 42.84. Neón verde
desde 42.84.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el karaoke con la paleta de arriba). Sí valen las reglas
> técnicas. GSAP local y después `<script src="assets/karaoke.js"></script>`.

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


## Escenas (tiempos en tiempos.md)
**s01-dedico** (4.42). Cuadro 0: Vale en la tarima a la izquierda, bajo un cono de luz, ojos cerrados con
el micrófono; arriba a la derecha la pantalla con el videoclip. En "canción" (0.26) la tarjeta del tema
"TEMA 47 · BOLERO «Me dejaste en visto»" y una nota musical; en "dedico" (1.22) entra la franja magenta
"DEDICADO A: TU LOCAL" (late en "local", 2.00); en "Que" (2.95) abre los ojos dolida; en "visto" (3.48)
doble tilde celeste que se dibuja, sello "EN VISTO" y lágrima.
**s02-publico** (2.88). La mesa del fondo: siluetas del público en primer plano con chopps en alto,
Vale chiquita al fondo en la tarima. En "¡Uuuh!" (0.00) globo "¡UUUH!" y las cabezas se mecen; en "Dale"
(1.07) los chopps se levantan y globo "¡DALE, VALE!".
**s03-once** (6.35). La pantalla grande (x 50-1030, y 560-1240) con la letra en dos líneas:
"Te pregunté el precio..." / "a las once de la noche." (se pintan en sus palabras) y después cambia a
"Y vos... dormías." (3.85). En el videoclip, arriba a la izquierda, un relojito "23:00"; Vale abajo de
espaldas a la izquierda, chiquita, con el micrófono; en "dormías" (4.76) un localcito con persiana baja y
"Zzz" en la esquina de la pantalla.
**s04-mesa** (4.01). Pantalla: "Te pedí una mesa" / "para el sábado." pintándose; abajo a la derecha una
mesita con mantel y cartelito "RESERVADO: ¿?" que aparece en "mesa" (1.48); un calendario "SÁBADO" en
"sábado" (2.61).
**s05-lunes** (4.27). Pantalla: "Y me dijiste..." / "pasá el lunes." (la segunda en magenta). En "pasá"
(1.53) un cartel colgado "PASÁ EL LUNES" se balancea; Vale se agarra el pecho (lágrima).
**s06-enfrente** (6.61). ESTRIBILLO: la pantalla con el título "ESTRIBILLO" y la letra en magenta:
"Y me fui con el de enfrente..." / "que me contestó al instante." y después "¡Al instante!" gigante (4.64).
A la derecha, un celular que vibra con la respuesta "¡Hola Vale! Sí, tenemos" y un corazón en "contestó"
(2.43). Vale de rodillas en la tarima con el puño en alto en "¡Al instante!".
**s07-puntaje** (4.92). El animador entra de la derecha con el micrófono ("¡Qué temazo!", 0.0) y aplaude;
en "puntaje" (1.56) la pantalla muestra "PUNTAJE DE TU LOCAL" con números que giran como tragamonedas
(redoble); en "¡en visto!" (3.42) los números se frenan en "EN VISTO" con la doble tilde, sello y flash.
**s08-caja** (5.46). La barra del bar: el dueño detrás del mostrador con la mano en alto ("¡Pará, Vale!",
0.0), sudando; en "caja" (1.70) una caja registradora que se abre con "¡CLIN!"; en "Atiendo" (2.69),
"repongo" (3.29) y "proveedor" (4.47) aparecen tres etiquetas que se apilan y le giran alrededor: una
bandeja, cajones, un teléfono.
**s09-solo** (2.83). Se apagan las luces: el dueño solo bajo un cono de luz, de frente, triste; en
"quiera" (0.43) se lleva la mano al pecho; en "solo" (1.60) la etiqueta "SOLO CONTRA TODO" y las
etiquetas de antes caen alrededor.
**s10-scalerics** (8.55). Flash: "Solo, no." (0.0) entra a su lado el AGENTE DE IA (celular con cara) que
agarra un segundo micrófono, A DÚO; en "Scalerics" (1.09) sello verde "AGENTE DE IA"; en "empleado"
(3.92) gafete "EMPLEADO DEL BAR · TURNO: SIEMPRE"; en "WhatsApp" (5.59) e "Instagram" (6.25) dos burbujas
de mensaje que llegan; en "instante" (6.92) tilde verde "AL INSTANTE"; en "cualquier hora" (7.75) un
reloj que gira hasta "03:00".
**s11-agente** (6.44). El celular a pantalla grande con el chat de Vale: Vale "¿Precio de la picada?"
→ agente "$ lista de precios" (en "precios" 0.29, con "stock" 0.87 tilde "HAY" y "horarios" 1.70 "ABIERTO
HASTA LAS 02"); en "pedidos y reservas" (2.62-3.20) aparece "MESA PARA 4 · SÁBADO 21 H · RESERVADA"; en
"escribe" (4.29) un mensaje nuevo del agente: "Vale, ¿al final venís el sábado?" y en "volvió" (5.87) Vale
contesta "¡Voy!" con corazón.
**s12-cancion** (3.24). La pantalla del karaoke: el puntaje ahora dice "¡AL INSTANTE!" con estrellas
verdes; Vale feliz abraza al agente; en "canción" (2.09) el título del tema se tacha.
**s13-cta** (7.65). La pantalla como menú "ELEGÍ TU CANCIÓN": en "canción" (0.67) lista de temas
inventados ("Pasá el lunes", "Dos tildes y un adiós", "Tu canción: ____"); en "visto" (2.50) la línea
vacía titila; en "Dejala" (3.26) el botón "DEJALA EN LOS COMENTARIOS" con el micrófono, que late hasta el
final. Sin salida.
