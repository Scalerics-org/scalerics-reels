# Reel "El hipnotista": spec

Reel vertical 1080x1920 de Scalerics. Tema: AUTOMATIZACIONES (sacarle al dueño las tareas repetidas
que hace a mano). Formato P: SHOW DE HIPNOSIS DE TEATRO DE REVISTA. EL GRAN MESMERINO (personaje
inventado, capa negra forrada de rojo, cuello alto, bigote manubrio; voz Algenib, grave y teatral)
sube a un voluntario: OSVALDO, dueño de una veterinaria de barrio. Gancho: "Voy a hipnotizar a este
comerciante. Ah, no... ya viene hipnotizado." (Osvaldo ya tiene espirales en los ojos.) Una VECINA
del público (voz Leda) grita: "¡Mirá los ojos que tiene!". Mesmerino: "cuando chasquee los dedos,
nos va a contar qué hace todas las noches". Osvaldo EN TRANCE (voz Charon, monótono): "Copiar el
pedido... pegar en la planilla... avisar que está listo... copiar... pegar..." · vecina: "¡Ay, es
igualito a mi marido!" · "Recordarle el turno a la señora del caniche... uno por uno... uno por
uno..." · Mesmerino: "¡Suficiente! A la cuenta de tres, se despierta. Uno, dos... ¡tres!" · Osvaldo
sigue: "Actualizar el stock de la tienda... mandarme el reporte... son las dos de la mañana..." ·
vecina: "¡Debe ser lento, pobre!" · GIRO (Mesmerino, serio): "¿Lento? Señora, este hombre sabe hacer
de todo. Lo hace a mano porque nadie le dijo que eso se puede hacer solo." · Scalerics (Orus): "En
Scalerics hacemos automatizaciones: el pedido de WhatsApp pasa solo a la planilla, el turno se
recuerda solo y el stock se actualiza solo. Mientras vos te despertás de verdad." CTA: "Chasqueale
los dedos: mandáselo al que sigue copiando y pegando."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/fixpartes.mjs → partes/componer.mjs):
72.4 s; reel 75.6 s.

## RECURSO VISUAL CENTRAL
La ESPIRAL HIPNÓTICA blanco y negro (disco crema con espiral negra de dos brazos) que gira SUAVE
(90-160 °/s, nunca estroboscópica) detrás de los personajes, y los OJOS DE ESPIRAL de Osvaldo (giran
en su lugar todo el tiempo que está en trance). El RELOJ DE BOLSILLO DORADO que Mesmerino hace
oscilar (vaivén lento). Las TECLAS GIGANTES "CTRL+C" / "CTRL+V" que se aprietan solas en cada
"copiar" / "pegar" (el trance del copiar y pegar). Desde s12 la espiral se vuelve un engranaje
verde que hace las tareas solo, y Osvaldo abre los ojos de verdad.

## ESTILO: ESCENARIO DE REVISTA
Fondo (armar.mjs): negro escenario con reflector cálido al centro, telón rojo terciopelo con
pliegues a los costados (x 0-170 y 910-1080, hasta y 1440) con ribete dorado, bambalina roja con
fleco dorado arriba (y 0-120) y tablas del escenario de madera oscura abajo (desde y 1440, filete
dorado). ambiente.html: CARTEL DE VARIETÉ con bombitas arriba al centro ("EL GRAN MESMERINO" en
Luckiest Guy dorado, bombitas que titilan en cadena), chapa de quién habla abajo a la izquierda
(EL GRAN MESMERINO · HIPNOTIZADOR dorado / OSVALDO · VOLUNTARIO violeta / LA VECINA · FILA 3 rosa /
SCALERICS · AUTOMATIZACIONES verde), luminoso "RISAS" abajo a la derecha que se prende cuando se
ríe el público, polvo en el haz del reflector, viñeta, flash en "¡tres!" y en "Scalerics".
Personajes planos con contorno negro grueso (stroke 7-8), piezas en `assets/hipnosis.js`
(window.HP): `HP.mesmerino(x,y,s,o)`, `HP.osvaldo(x,y,s,{trance, brazos})`, `HP.vecina(x,y,s,{mano})`,
`HP.espiral(cx,cy,r,cls)`, `HP.pendulo(x,y,l,r,cls)`, `HP.platea(...)`, `HP.tecla(...)`,
`HP.planilla(...)`, `HP.celular(...)`, y `HP.kit(tl, root)` con pop, popSvg, sello, golpe, sacudon,
dibujar, girar, ojosTrance, vaiven, trance, hablar, balanceo, salida.

## Paleta (SOLO estos)
- Negro escenario `#120a0e` (medio `#1c0f16`, frac `#2b1d3a`): fondo, contornos.
- Rojo telón `#a3122a` (claro `#d6243a`, oscuro `#6e0a1b`): telón, forro de la capa, sellos.
- Dorado `#e6b143` (claro `#ffd36b`, oscuro `#a87a1e`): reloj, cartel de varieté, bombitas, ribetes.
- Crema `#f6ecd6`: espiral, globos, teclas, textos.
- Violeta hipnótico `#7a4fd8` (claro `#c7a4ff`): las espirales de los ojos, el chaleco de Osvaldo, lo "en trance".
- Piel `#f0c39c`, pelo castaño `#6b4a32`, rulos `#3a2230` (solo personajes).
- Solo desde s12 (Scalerics): verde `#5ce611` (oscuro `#3f9e0b`).
Subtítulos: crema con contorno negro; acento dorado (Mesmerino), violeta claro (Osvaldo), rosa
`#ff7a8a` (vecina), verde (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), estroboscópicos.

## Tipos de letra
Luckiest Guy (cartel de varieté, sellos, números de la cuenta, teclas), Cormorant Garamond itálica
(lo que murmura Osvaldo en trance, globos `.hp-globo.trance`), Lexend 800 (globos, UI), IBM Plex
Mono 600 (chapas, etiquetas `.hp-tag`).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1540. Chapa en y 1566-1670 (izquierda),
luminoso RISAS a la derecha en y 1580-1660, logo en y 1746: no taparlos. Cartel de varieté arriba en
y 130-215 (sobre la bambalina).

## Lo que hace ambiente.html (segundos globales)
Chapas por turno (h 0 · p 5.71 · h 8.14 · d 15.55 · p 22.84 · d 25.65 · h 33.13 · d 41.98 · p 48.92 ·
h 50.92 · o 59.14). RISAS se prende en 7.0, 24.2, 30.4 y 49.9. Flash en 40.73 ("¡tres!") y 59.55
("Scalerics"); desde 59.55 el cartel pasa a "SCALERICS PRESENTA" con bombitas verdes.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el escenario de revista con la paleta de arriba). Sí
> valen las reglas técnicas.

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Todo vive en un `<svg viewBox="0 0 1080 1920">` a pantalla completa (coordenadas = píxeles).
- Textos dentro del dibujo (carteles, UI de celular): Lexend 600 o IBM Plex Mono 500; tamaño
  mínimo 24px para lo que hay que leer; lo decorativo más chico lleva `data-layout-ignore`.
- Movimiento: los trazos se DIBUJAN (stroke-dashoffset) con `dibujar()`; lo que aparece entero hace pop
  (scale 0.85→1 + opacity, back.out(1.6), 0.35 s). Las cosas cambian EN la palabra que las nombra.
  Algo se mueve siempre: ningún tramo de más de ~1 s quieto.
- Entrada: los primeros 0.3 s el dibujo arranca; salida: los últimos 0.25 s `opacity 0 + blur(6px)`
  sobre el contenedor de la escena.
- Copy en español rioplatense; si Scalerics habla, en plural ("hacemos").

## Reglas técnicas (HyperFrames)
- Archivo `compositions/<id>.html`, un `<template>` con `<style>`, un
  `<div id="root" data-composition-id="<id>" data-width="1080" data-height="1920" data-duration="<dur>">`
  y un `<script>` que arma UN `gsap.timeline({ paused: true })` y lo registra en
  `window.__timelines["<id>"]`.
- GSAP se carga SIEMPRE local: `<script src="assets/vendor/gsap.min.js"></script>`; después
  `<script src="assets/hipnosis.js"></script>`.
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. Solo transforms, opacity, filter,
  strokeDashoffset. En SVG rotar/escalar con `svgOrigin`.
- `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la escena.
- Verificar con `node armar.mjs`, snapshot (con `flock /tmp/hyperframes.lock`) y check.

## Escenas (tiempos en tiempos.md)
**s01-hipnotizar** (5.72). Cuadro 0: la espiral grande (r 330) ya girando atrás al centro (y 1000),
Mesmerino a la izquierda (x 330, base y 1500, escala 0.95) con el reloj oscilando, Osvaldo sentado
a la derecha en una silla de escenario dorada. En "hipnotizar" (0.40) Mesmerino levanta el reloj y
sale el cartel "¡HIPNOSIS EN VIVO!"; en "comerciante" (1.76) etiqueta "VOLUNTARIO: OSVALDO · VETERINARIA";
en "Ah, no" (2.56) zoom a la cara de Osvaldo y se ve que YA tiene espirales en los ojos; en
"hipnotizado" (4.56) sello rojo "YA VIENE HIPNOTIZADO".
**s02-ojos** (2.42). Primer plano de la cara de Osvaldo con los ojos de espiral gigantes girando;
abajo en primer plano la vecina en la platea, señalando y riéndose; en "ojos" (0.53) los ojos
crecen; risas.
**s03-chasquido** (3.20). Mesmerino de cerca con la mano en alto, espiral detrás; en "Osvaldo" (0)
le apunta; en "chasquee" (1.36) los dedos se preparan (líneas de tensión), en "dedos" (2.24) brillo
dorado en los dedos.
**s04-noches** (4.49). Osvaldo en trance balanceándose con brazos de sonámbulo; en "contar" (0.56)
globo punteado "..."; en "todas las noches" (2.25-2.72) una luna creciente y un reloj de pared que
marca las 23; al final (3.9) "¡CHAS!" gigante y estrellitas (chasquido).
**s05-copiar** (7.01). Osvaldo tipea sonámbulo; arriba dos teclas gigantes CTRL+C y CTRL+V;
en "Copiar" (0) se aprieta CTRL+C y un globito "PEDIDO" sale de un celular a la izquierda; en
"pegar" (1.51) CTRL+V y la fila 1 de la planilla (derecha) se llena; en "avisar" (3.20) el celular
manda "¡ESTÁ LISTO!"; en "copiar" (5.07) / "pegar" (6.08) otra vez, más rápido, la fila 2 y 3.
Contador "PEDIDO N° 1, 2, 3...".
**s06-marido** (2.81). La vecina gigante riéndose a la derecha; a su lado el MARIDO (silueta con
ojos de espiral también, mirando el celular); en "igualito" (0.72) se le prenden las espirales al
marido; en "marido" (1.34) sello "¡IGUALITO!".
**s07-turno** (7.48). Osvaldo con un celular enorme; en "turno" (1.21) un turno de agenda "10:00 ·
CANICHE · SRA. ELSA"; en "caniche" (2.96) aparece un caniche dibujado con moño; en cada "uno por
uno" (3.91, 5.65) se mandan mensajes de a uno ("Le recuerdo su turno...") y se apilan, contador
de tildes; el reloj del fondo avanza.
**s08-cuenta** (8.85). Mesmerino agitado, de frente, con el reloj en vaivén; en "¡Suficiente!" (0)
aplaude (sacudón); en "cuenta de tres" (1.59) la espiral acelera un poco; "UNO" (5.34), "DOS" (6.41)
y "¡TRES!" (7.59) en letras de cartel gigantes con bombitas; en "¡tres!" flash, gong.
**s09-sigue** (6.94). Osvaldo SIGUE en trance (balanceo): en "stock" (1.11) una tienda online en un
celular con "STOCK: 12" que baja a 11 a mano; en "reporte" (3.11) un papel largo de reporte que se
desenrolla; en "dos de la mañana" (4.67-5.18) reloj que marca las 2:00, luna, "zzz" de Mesmerino
derrotado.
**s10-lento** (5.80). La vecina con la mano en alto, en "lento" (0.53) un caracol con etiqueta
"¿LENTO?"; en "¿Lento?" (2.00) entra Mesmerino serio, el reflector se cierra sobre él; en "sabe
hacer de todo" (4.40-5.20) alrededor de Osvaldo aparecen sus herramientas: el pedido, la planilla,
el turno, la caja (íconos con tilde dorado) y sello "SABE TODO".
**s11-giro** (4.42). Osvaldo en el centro con las manos tipeando; en "mano" (0.60) una mano gigante
dorada "A MANO"; en "nadie le dijo" (1.24-1.72) un globo vacío "..." tachado; en "solo" (3.08) el
cartel con bombitas "SE PUEDE HACER SOLO" se prende letra por letra.
**s12-scalerics** (10.32). Flash; en "Scalerics" (0.41) la espiral se vuelve un ENGRANAJE VERDE que
gira; en "automatizaciones" (1.10) etiqueta verde "AUTOMATIZACIONES"; en "WhatsApp" (2.80) un globo
"PEDIDO" vuela solo y en "planilla" (3.98) la planilla se llena sola; en "turno" (4.83) un
recordatorio sale solo con tilde; en "stock" (6.70) el contador baja solo; en "despertás" (8.98)
Osvaldo abre los ojos normales y se estira (los ojos de espiral desaparecen), sale el sol.
**s13-cta** (6.10). Cartel de varieté final con bombitas: "CHASQUEALE LOS DEDOS" (0.0) con la mano
que chasquea (¡CHAS!) en "dedos" (0.42); en "mandáselo" (1.08) un celular con botón "ENVIAR" y una
flecha; en "copiando y pegando" (1.86-2.29) las teclas CTRL+C CTRL+V tachadas. Late hasta el final.
Sin salida.
