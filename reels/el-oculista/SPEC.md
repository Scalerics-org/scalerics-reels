# Reel "El oculista": spec

Reel vertical 1080x1920 de Scalerics. Tema: SITIO WEB (rápido en el celular, con horario, ubicación y
botón a WhatsApp). Formato B: DIÁLOGO de varias voces, un SKETCH EN EL CONSULTORIO DEL OCULISTA.
MARTÍN (voz Puck, paciente dramático) entra desesperado: "Doctor, me estoy quedando ciego. No puedo leer
la página de mi pizzería favorita." El OCULISTA (voz Iapetus, serio y paciente) le hace leer la carta de
agudeza visual, que es la página de la Pizzería Don Carmelo: "PIZZERÍA DON CARMELO" se lee y abajo
"hormiguitas" (letra diminuta: la web no está hecha para celular); "haga zoom, con dos dedos": media
letra y la página se va al costado; "siguiente línea": carga, carga, sigue cargando; "parpadee, descanse
la vista" (foróptero); un cartel emergente tapa todo ("suscribite a nuestro boletín"); "lea la última
línea": "martes a domingo, de diecinueve a... ¿eso es un horario o un precio?"; "¿y la dirección?" "en
ningún lado". GIRO: "Martín... usted ve perfecto. El que tiene un problema es el local." Entra DON
CARMELO (voz Charon), ofendido: "¡Pará, pará! Mi página es preciosa. En la compu de mi sobrino." El
oculista: "sus clientes no tienen la compu de su sobrino. Tienen un celular." Entra Scalerics (Orus):
"hacemos tu sitio web: rápido en el celular, con el horario, la ubicación y un botón a WhatsApp. Que se
lea sin anteojos." CTA: "Hacele el examen a tu página: abrila en el celular. Si tenés que entrecerrar
los ojos, escribinos."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs, con partes/fix.json
para 8 palabras corridas a mano): 70.3 s; reel 73.5 s.

## RECURSO VISUAL CENTRAL
La CARTA DE AGUDEZA VISUAL (tipo Snellen: tablero blanco con filas de letras que se achican y la línea
roja) que ES la página del local y se TRANSFORMA en la pantalla de un celular (s04) y vuelve (s08). El
FORÓPTERO (el aparato de lentes con perillas que giran) en s06. Al final la carta se lee perfecta (s13,
s14).

## ESTILO: CONSULTORIO DE OCULISTA
Pared celeste clínica con luz blanca al centro y friso de azulejos blancos con juntas celestes (y
1380-1670, en armar.mjs), zócalo azul tinta con filete rojo y el logo abajo. ambiente.html: arriba a la
izquierda la placa "OFTALMOLOGÍA · CONSULTORIO 3" y arriba a la derecha el turnero rojo "TURNO 14";
abajo a la izquierda la chapa de quién habla (MARTÍN · PACIENTE rojo · EL OCULISTA celeste · DON CARMELO
· PIZZERÍA mostaza · SCALERICS verde); viñeta suave; flash blanco en "perfecto" y en "Scalerics".
Personajes planos con contorno azul tinta grueso (stroke 7-8): el oculista (pelado con costados grises,
bigote gris, anteojos redondos, espejo frontal en la frente, guardapolvo blanco, corbata azul, puntero),
Martín (pelo castaño despeinado, buzo rojo, ojos que se entrecierran) y Don Carmelo (gorro de pizzero,
bigote negro enorme, camisa mostaza, delantal blanco con mancha de tomate). Piezas compartidas en
`assets/consultorio.js` (window.OC).

## Paleta (SOLO estos)
- Celeste clínico `#bfe0ec` (claro `#dceef5`, medio `#8cc4d8`, oscuro `#7fb8cc`): pared, azulejos, lentes.
- Blanco clínico `#f6fafc` (papel `#e9f3f7`): carta, guardapolvo, pantallas.
- Azul tinta `#16324a` (medio `#2c5a7a`): contornos, letras de la carta, zócalo.
- Rojo oftalmo `#e63946` (claro `#ff4d5a`): la línea roja de la carta, buzo de Martín, alertas, sellos.
- Mostaza `#f2b134` (claro `#ffc23d`): Don Carmelo y su página "preciosa".
- Piel `#f0c8a0` / `#e8b48c`, pelo `#5a3a28` / `#c9d3d8` (solo personajes).
- Solo desde s13 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para la página buena.
Subtítulos: blanco con contorno azul tinta; acento rojo (Martín), celeste `#7fe0ff` (oculista), mostaza
(Don Carmelo), verde (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto).

## Tipos de letra
Lexend 800 (letras de la carta, titulares), Lexend 600 (UI de celular), IBM Plex Mono 600 (rótulos,
placa, chapas), Caveat 700 (la receta y anotaciones del oculista), Black Ops One (sellos).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1540. Chapa en y 1566-1670 (izquierda) y logo
en y 1746: no taparlos. Placa y turnero arriba en y 60-190.

## Lo que hace ambiente.html (segundos globales)
Chapas de quién habla en cada turno (reel.voces). Turnero "TURNO 14" late en 0. Flash blanco en 41.99
("perfecto") y 56.01 ("Scalerics"). La placa se pone verde "SITIOS WEB" desde 56.01.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el consultorio con la paleta de arriba). Sí valen las
> reglas técnicas.

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
  `<script src="assets/consultorio.js"></script>`.
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. Solo transforms, opacity, filter,
  strokeDashoffset. En SVG rotar/escalar con `svgOrigin`.
- `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la escena.
- Verificar con `node armar.mjs`, snapshot (con `flock /tmp/hyperframes.lock`) y check.

## Escenas (tiempos en tiempos.md)
**s01-ciego** (5.14). Cuadro 0: Martín ya sentado en el sillón rojo de examen, a la izquierda,
entrecerrando los ojos con el celular pegado a la cara. En "ciego" (1.44) sello rojo "¿CIEGO?" y la
cabeza tiembla; en "página" (2.97) el celular crece a la derecha y muestra una página con letritas
borrosas; en "favorita" (3.81) un corazón rojo late sobre el celular y la etiqueta "MI PIZZERÍA
FAVORITA".
**s02-carta** (2.61). El oculista entra desde la derecha, serio, con el espejo frontal que brilla; en
"Tranquilo" (0.0) levanta la mano; en "Lea" (1.34) gira el puntero y en "carta" (1.74) la carta de
agudeza aparece a la izquierda con pop (fila gigante "E", filas que se achican, línea roja).
**s03-hormiguitas** (3.95). Primer plano de la carta: fila 1 "PIZZERÍA" (0.0), fila 2 "DON CARMELO"
(0.51); en "abajo" (1.89) el puntero baja a las filas diminutas; en "hormiguitas" (2.82) las letritas
se vuelven hormigas que caminan y la etiqueta "LETRA: MICROSCÓPICA".
**s04-zoom** (5.98). La carta se transforma en un celular (marco azul tinta que se cierra alrededor).
En "dos dedos" (1.22-1.48) dos yemas se separan haciendo pinza; en "media letra" (2.71-3.14) una "P"
gigante cortada por el borde; en "costado" (5.00) la página se desliza a la derecha y deja blanco, con
la barra de desplazamiento horizontal y "ZOOM 400%".
**s05-cargando** (5.58). "Siguiente línea": el puntero toca; el celular muestra la ruedita girando y la
barra de carga trabada en "3%"; en cada "Carga" (1.39, 2.47) la ruedita da un salto; el reloj del
consultorio gira rápido (pasa el tiempo); en "sigue cargando" (4.02) "4%" y a Martín le crece la
barba.
**s06-foroptero** (2.43). Primer plano del foróptero con los ojos de Martín detrás; en "Parpadee" (0.0)
los ojos parpadean dos veces; en "Descanse" (1.02) las perillas giran y cambian los lentes (clic).
**s07-cartel** (4.12). El celular con la página; en "cartel" (0.34) un cartel emergente cae y tapa todo:
"¡SUSCRIBITE A NUESTRO BOLETÍN!" con una X diminuta; en "todo" (1.36) se apilan "ACEPTÁ LAS COOKIES" y
"¿NOS DEJÁS TU MAIL?"; en "Suscribite" (2.11) el principal se sacude; en "boletín" (3.22) una lupa roja
busca la X diminuta.
**s08-ultima** (7.19). La carta de nuevo con el oculista; en "última" (0.78) el puntero va a la última
fila; en "Martes" (2.16) la última fila se agranda: "MAR A DOM 19 A 2350"; en "horario" (5.64) etiqueta
"¿HORARIO?" con relojito a la izquierda y en "precio" (6.32) "¿PRECIO?" con etiqueta de precio a la
derecha; Martín (abajo) con cara de duda.
**s09-direccion** (3.68). Planilla del oculista "EXAMEN DE LA PÁGINA" con renglones; en "dirección"
(0.70) aparece el renglón "DIRECCIÓN" y un pin de mapa con "?" que busca por un mapa vacío; en "ningún
lado" (1.94) sello rojo "NO FIGURA" y el pin se cae.
**s10-diagnostico** (4.60). El oculista de frente se saca los anteojos (0.0-0.85); en "perfecto" (1.31)
sello "VISTA: 10/10" celeste; en "problema" (2.79) aparece la receta "DIAGNÓSTICO:" en Caveat y en
"local" (3.57) "EL LOCAL" en rojo subrayado.
**s11-carmelo** (4.30). La puerta se abre de golpe y entra Don Carmelo con la mano en alto ("¡Pará,
pará!", 0.0-0.18); en "preciosa" (1.43) aparece un monitor ancho con su página llena de brillitos y
corazones; en "compu" (2.59) el cartel "COMPU DEL SOBRINO" se pega en el monitor.
**s12-celular** (6.26). El monitor ancho a la izquierda; en "clientes" (1.48) tres clientes con
celular; en "compu" (2.78) el monitor se tacha con una X roja; en "celular" (4.96) la página del monitor
se aplasta dentro de un celular y queda diminuta: "ASÍ LA VEN".
**s13-scalerics** (8.83). Flash; en "Scalerics" (0.17) la carta se vuelve un celular con la página buena
(verde): "PIZZERÍA DON CARMELO" grande; en "rápido" (2.30) la barra se llena de una y tilde "CARGÓ";
en "horario" (3.82) "ABIERTO HOY · 19 A 23 H"; en "ubicación" (4.69) mini mapa con pin; en "WhatsApp"
(6.17) botón verde "PEDIR POR WHATSAPP"; en "sin anteojos" (7.73) los anteojos del oculista salen
volando y la etiqueta "SE LEE SIN ANTEOJOS".
**s14-cta** (8.82). La carta de agudeza como cierre, fila por fila: "HACELE" (0.0), "EL EXAMEN" (0.52),
"A TU PÁGINA" (1.04); en "celular" (2.35) un celular al lado; en "entrecerrar" (3.56) un ojo que se
entrecierra; en "escribinos" (4.91) el botón verde "ESCRIBINOS" late hasta el final. Sin salida.
