# Reel "La quiniela": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA (atiende WhatsApp a cualquier hora con tus
precios, stock y horarios, toma pedidos y reservas, le escribe al que preguntó y no compró). Formato P:
PERSONAJE DE LA CULTURA POPULAR, un SORTEO DE LOTERÍA DE LA TELE (inventado: "El Gran Sorteo del
Comercio", sin marcas reales). La LOCUTORA (voz Aoede, solemne de ceremonia) abre: "Atención, comerciante.
Estos son los números con los que hoy perdiste clientes." Gira el bolillero y cada bolilla es un momento
en que el cliente escribe y nadie contesta: "¡El veintitrés! Las once de la noche: la hora en que te
preguntan el precio y vos dormís" (la CLIENTA, voz Leda: "Hola, ¿cuánto sale? ¿Hola?"); "¡El siete!
Domingo al mediodía... vos estás en el asado" ("¿Y? ¿Me van a contestar o no?"). El DUEÑO (voz Charon)
festeja equivocado con su boleta: "¡El siete! ¡Lo tengo! ¡Gané!" · "Señor, usted no ganó. Usted perdió una
mesa para ocho." "¡El cuarenta y ocho! El muerto que habla (referencia a la quiniela de los sueños). Como
tu WhatsApp: muerto, y no habla." La clienta: "Listo. Le compro al de enfrente." El dueño: "Pero yo
contesto todo... cuando puedo." GIRO (la locutora sale del personaje, cálida): "Y ahí está. A usted le
importa. Pero es uno solo, y el celular no duerme nunca." Entra Scalerics (Orus): agentes de IA. Vuelve el
veintitrés: "¡Me contestaron!" · "Con un agente de IA, todas las bolillas salen ganadoras." CTA (Orus):
"Mandáselo al que juega todas las semanas y nunca contesta un mensaje."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs; atempo 1.28 a la
locutora, 1.15 al resto): 74.6 s; reel 77.8 s.

## RECURSO VISUAL CENTRAL
El BOLILLERO de vidrio dorado que gira y las BOLILLAS numeradas que caen (23, 07, 48), cada una
"perdida" (roja en el panel SALIERON). El TABLERO de números iluminados. Al final, con el agente, las
mismas bolillas salen verdes: ganadoras.

## ESTILO: ESTUDIO DE SORTEO DE TV RETRO
Telón de paño verde oscuro con pliegues y foco crema al centro, piso negro con filete dorado (y 1540,
en armar.mjs). ambiente.html: arriba la marquesina "EL GRAN SORTEO / DEL COMERCIO · EN VIVO" con luces
de bombita que titilan; abajo a la izquierda la chapa de quién habla (LA LOCUTORA dorado · LA CLIENTA
rojo · EL DUEÑO verde claro · SCALERICS verde); abajo a la derecha el panel "SALIERON" con las tres
bolillas (rojas cuando salen, verdes en "bolillas" del final); viñeta; flash crema en "Scalerics" y
"¡Me contestaron!"; desde "Scalerics" la marquesina dice "CON AGENTE DE IA" con borde verde.
Personajes planos con contorno tinta grueso (stroke 7-8), piezas en `assets/sorteo.js` (window.SO):
la locutora (peinado voluminoso de los noventa, vestido dorado con lentejuelas y hombreras, aros,
micrófono), la clienta (cola de caballo, buzo rojo, celular), el dueño (pelado con costados grises,
bigote, camisa verde y delantal crema, boleta de quiniela).

## Paleta (SOLO estos)
- Verde paño `#0f3b2a` (oscuro `#0a2a1e`, medio `#17553c`, claro `#2f7a55`): telón, tablero, camisa del dueño.
- Dorado `#e8b923` (claro `#ffd65a`, oscuro `#a87d12`): bolillero, marquesina, vestido, títulos.
- Crema `#f4ead2` (sombra `#e4d6b4`): bolillas, delantal, globos, papel.
- Rojo `#d7263d` (claro `#ff5d6c`): bolillas perdidas, sellos, buzo de la clienta, alertas.
- Tinta `#14100c`: contornos y textos.
- Piel `#f0c8a0` / `#e0ad86` (solo personajes).
- Solo desde s10 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para lo que sale bien.
Subtítulos: crema con contorno tinta; acento dorado (locutora), rojo claro (clienta), verde claro
`#8fe3b0` (dueño), verde `#5ce611` (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), marcas de lotería.

## Tipos de letra
Lexend 900 (números de bolillas, títulos dorados), Lexend 600 (chat), IBM Plex Mono 600 (rótulos,
tags), Black Ops One (sellos), Caveat (boleta).

## Zona
Subtítulos arriba (y 236-420). Marquesina en y 30-215. Contenido entre y 540 y 1540. Chapa y panel
SALIERON en y 1572-1672 y logo en y 1746: no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el estudio de sorteo con la paleta de arriba). Sí valen las
> reglas técnicas.

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


## Escenas (tiempos relativos en tiempos.md)
**s01-atencion** (7.80). Cuadro 0: la locutora detrás del atril dorado "EL GRAN SORTEO" a la izquierda,
el bolillero a la derecha. En "Atención" sello dorado "¡ATENCIÓN, COMERCIANTE!"; en "números" (2.11)
tres bolillas (23, 07 roja, 48) aparecen sobre el bolillero; en "perdiste" (3.54) sello rojo
"CLIENTES PERDIDOS"; en "Gira" (4.88) zoom al bolillero que gira (manija y bolillas); en "Primera
bolilla" (6.41) sale una bolilla dorada por la canaleta y tag "PRIMERA BOLILLA".
**s02-veintitres** (8.82). En "veintitrés" (0.15) la bolilla 23 gigante cae y rebota al centro y en el
tablero se enciende el 23; en "once" (1.79) se achica arriba a la izquierda y aparece un reloj que
marca las 23:00 con luna; en "preguntan" (3.90) un dormitorio: el dueño dormido en la cama, celular en
la mesa de luz que se ilumina; en "dormís" (5.78) "Zzz"; en "Hola" (6.65) globos de chat en el celular
grande: "Hola, ¿cuánto sale?" y en "¿Hola?" (7.44) "¿Hola?" con tildes grises y sello rojo "23:04 · SIN
RESPUESTA".
**s03-siete** (8.28). En "siete" (0.15) cae la bolilla 07 roja; en "Domingo" (1.02) hoja de almanaque
"DOMINGO · 13 H"; en "reservar" (3.04) globo "¿Tenés mesa para ocho?"; en "asado" (4.92) el dueño en la
parrilla con pinza y chorizos, humo, el celular boca abajo en la mesa vibrando; en "¿Y?" (5.83) la
clienta enojada con su celular y en "contestar" (6.70) globo "¿ME VAN A CONTESTAR O NO?".
**s04-gane** (2.78). El dueño salta con la boleta levantada ("07"), confeti; en "tengo" (0.96) la boleta
crece; en "Gané" (1.79) título dorado "¡GANÉ!" y lluvia de confeti.
**s05-mesa** (4.98). La locutora fría de frente; en "no ganó" (1.32) el título "¡GANÉ!" se rompe y cae
el confeti; en "perdió" (2.84) sello rojo "PERDIÓ" sobre la boleta; en "mesa para ocho" (3.51) una mesa
larga con ocho sillas vacías que se apagan.
**s06-muerto** (5.99). En "cuarenta" (0.16) cae la bolilla 48; en "muerto que habla" (2.22) una carta
de la quiniela de los sueños "48 · EL MUERTO QUE HABLA" con un fantasmita dibujado; en "WhatsApp" (3.52)
un celular con el chat del local; en "muerto" (4.27) el celular se vuelve una lápida "Q.E.P.D."
con "EN LÍNEA: NUNCA"; en "no habla" (5.08) flores y una telaraña.
**s07-enfrente** (1.93). La clienta, de espaldas al local apagado, camina hacia el de enfrente que tiene
la luz prendida y cartel "ABIERTO · TE CONTESTAMOS"; en "enfrente" (1.13) flecha roja.
**s08-cuando-puedo** (2.78). El dueño detrás del mostrador, apurado, con el teléfono en una mano y la caja
en la otra; en "todo" (0.69) tilde dorada; en "cuando puedo" (1.53) gota de sudor y la tilde se vuelve
"¿?" y el tag "CUANDO PUEDE".
**s09-uno-solo** (6.03) GIRO. La luz se pone cálida; la locutora deja el micrófono, comprensiva; en
"importa" (1.57) un corazón dorado sobre el dueño (chiquito, abajo); en "uno solo" (2.66) el dueño
solo en su mostrador con un foco y el tag "UNO SOLO"; en "celular" (3.83) el celular con ojos abiertos
y un reloj que da vueltas rápido; en "nunca" (4.93) luna y sol se alternan: "24 H".
**s10-agente** (8.74). Flash; en "Scalerics" (0.52) el bolillero se vuelve verde y del medio sale el
AGENTE DE IA (un celular con cara amable y auriculares, contorno tinta, pantalla verde) con el cartel
"TU AGENTE DE IA"; en "empleado" (2.95) se le pone una credencial "EMPLEADO"; en "WhatsApp" (4.08) globo
de chat; en "cualquier hora" (4.60) reloj que gira 24 h; en "precios" (5.99), "stock" (6.92) y
"horarios" (7.73) tres fichas doradas que se encienden.
**s11-toma** (4.64). El celular grande con el chat del agente: en "pedido" (0.17) globo "Pedido anotado:
2 pizzas, retira 21 h" con tilde; en "reserva" (1.39) "Reserva: domingo 13 h, mesa para 8"; en "escribe"
(2.35) un mensaje saliente al que no compró: "¿Te sigue interesando la campera?"; tilde azul en "compró".
**s12-contestaron** (4.28). El bolillero dorado gira de nuevo; en "veintitrés" (0.15) cae la 23 VERDE;
en "noche" (1.87) reloj 23:00; en "Me contestaron" (2.74) la clienta feliz con el celular que muestra
"23:01 · ¡Hola! Sale..." y tilde azul, sello verde "CONTESTADO".
**s13-ganadoras** (3.82). El tablero entero se enciende en verde y dorado número por número; en
"bolillas" (1.80) bolillas verdes caen por todos lados; en "ganadoras" (2.66) título "¡TODAS GANADORAS!"
y confeti; el dueño feliz abajo.
**s14-cta** (6.95). Boleta de quiniela gigante crema como cierre: "MANDÁSELO" (0.0) en grande; en "juega"
(0.78) "AL QUE JUEGA TODAS LAS SEMANAS"; en "nunca contesta" (2.17) "Y NUNCA CONTESTA UN MENSAJE" con el
celular en visto; una flecha de compartir dorada que late hasta el final. Sin salida.
