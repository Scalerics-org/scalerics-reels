# Reel "Game over": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: la
TIENDA ONLINE (vende sola, cobra con Mercado Pago, envía por DAC, Correo o PedidosYa), nombrada una
sola vez, al final. Formato P (personaje de la cultura popular): un VIDEOJUEGO RETRO de plataformas.

Una JUGADORA (voz Leda, canchera e impaciente) mira a cámara: "Comprarte es más difícil que pasar
el último nivel de un videojuego." Un ANUNCIADOR de fichín (voz Algenib, grave y épica) arranca la
partida: "Jugadora uno. Tres vidas. Misión: comprar una campera. ¡Nivel uno: averiguar el precio!"
Ella pregunta "Hola, ¿cuánto sale la campera negra?" y TU LOCAL (voz Charon, seco) contesta
"Consultá por privado." "¡Pierde una vida! ¡Nivel dos: que te contesten!" "Ya te escribí por
privado. Hace dos días." "Visto. Visto. Sigue en visto. ¡Pierde otra vida! ¡Nivel tres: pagar!"
"¿Te puedo pagar con tarjeta?" "Solo efectivo. O transferime y mandame el comprobante." "¡Última
vida! ¡Llegó el jefe final!" El JEFE FINAL (Charon con eco, cavernoso): "Pasá el lunes." "Game
over. ¿Insertar ficha?" "Ni loca. Me voy al de enfrente." "¡Modo fácil! Link. Precio. Pago con
tarjeta. Envío mañana. ¡Nivel completado!" GIRO: "Y eso que tu campera era más linda." Entra el
narrador (voz Orus): "Tenés la mejor campera del juego. Lo que está roto es el control. Hacemos tu
tienda online: vende sola, cobra con Mercado Pago y envía por DAC, Correo o PedidosYa. Que
comprarte sea modo fácil. ¿En qué nivel perdés clientes vos? Comentá el número."
157 palabras. Voz de 72.89 s, reel de 76.09 s. 16 parlamentos en `partes/` (ver `partes/voces.sh`,
`partes/cortar.sh` y `partes/componer.mjs`; al 10 se le recortó "¡Cuidado!").

## RECURSO VISUAL CENTRAL: el HUD del fichín y las VIDAS
Arriba de todo (lo pone `ambiente.html`, y 56-200) está el HUD: a la izquierda "1UP" y el PUNTAJE
(000000, sube de a 1000 con cada moneda del modo fácil: 49.40, 50.26, 51.17, 52.43 y 009000 en
"completado" 54.52; con la tienda pasa a "------"); al medio el cartel del NIVEL ("PRESS START" →
"NIVEL 1" 9.08 → "NIVEL 2" 17.01 → "NIVEL 3" 27.89 → "JEFE FINAL" 36.61 → "GAME OVER" 41.52 →
"MODO FÁCIL" 48.11 → "TU TIENDA" en verde 62.11); a la derecha TRES CORAZONES de pixel que aparecen
en "Tres vidas" (4.85) y se rompen de a uno con flash rojo y "-1 VIDA" en 15.84, 26.29 y 39.26; se
llenan de nuevo en el de enfrente (48.2) y vuelven VERDES con la tienda (63.66). Además: scanlines y
viñeta de CRT, una franja de barrido que baja, flashes. No pongas nada tuyo arriba de y 560.

## ESTILO: ARCADE 8-BIT. Edición CARGADA.
Noche violeta con estrellas de pixel, skyline pixelado con ventanitas y piso de LADRILLOS rosas con
borde amarillo (y 1524-1716): lo pone el fondo del index (`armar.mjs`). Todo es pixel art hecho con
divs y `<svg>` de rectángulos (`shape-rendering: crispEdges`): los sprites salen de
`assets/pixel.js` (mapas de letras: `jugadora`, `jugadoraB` (paso), `jugadoraE` (enojada),
`corazon`, `corazonV`, `corazonG`, `moneda`, `campera`, `tilde`/`tildeK`/`tildeC`, `calavera`,
`flecha`, `estrella`) con `<div data-sprite="..." data-px="12">` y `PX.llenar(root)`. Textos de
juego en Press Start 2P (`assets/fonts/PressStart2P.woff2`) con sombras duras desplazadas (sin
blur). Movimiento a saltos: `ease: "steps(n)"`, parpadeos con `steps(1)`, sacudones, cosas que caen
del cielo y aplastan a la jugadora. Nada quieto más de ~0.8 s.
Personajes genéricos dibujados: la jugadora (rodete amarillo, campera rosa, jean cian), TU LOCAL
(un localcito con toldo a rayas y cartel "TU LOCAL"; el dueño no aparece: habla el local), el JEFE
FINAL (un calendario monstruo rosa con la hoja "LUNES", cejas, ojos y dientes). Nada de personajes,
logos ni música de juegos reales.

## Paleta (SOLO estos colores)
- Noche `#120a2e` / violeta `#2a1a63`: fondo, edificios, paneles.
- Negro `#07051a`: contornos, sombras duras, rellenos.
- Rosa `#ff3d8b`: vidas, lo que duele (bloques que caen, muro, jefe), GAME OVER.
- Amarillo `#ffd23f`: monedas, puntaje, acento de subtítulos, carteles de nivel.
- Cian `#38e8ff`: NIVEL, celular, tarjeta, bloques.
- Hueso `#f4f1e6`: texto, globos de diálogo, contornos claros.
- Desde la tienda (s11, y el "MODO FÁCIL" del cierre) se suma verde Scalerics `#5ce611`.
Prohibido: emojis, fotos, rayas largas (—), logos reales (Mercado Pago, DAC, Correo y PedidosYa
solo como texto en cajitas), caras de personas reales.

## Tipos de letra
Press Start 2P para todo lo del juego (mínimo 28px lo que hay que leer); subtítulos Lexend 600 con
sombra dura negra y acento amarillo (los arma `armar.mjs`).

## Zona
HUD en y 56-200, subtítulos en y 236 a ~420. Contenido de cada escena entre y 580 y 1524 (el piso),
x 60-1020. Logo de Scalerics en y ~1746 (abajo del piso).

## Sonidos de este reel (sintetizados con ffmpeg, onda cuadrada)
`moneda`, `salto`, `golpe` (pierde vida), `gameover`, `powerup`, `nivel` (fanfarria), `alarma`
(jefe), `blip`, `ficha`; y de los de siempre `impact-bass-1/2`, `whoosh`, `pop`, `click`,
`notification`, `sparkle`, `typing`, `glitch-1`. Cama chiptune propia en `assets/bgm/bed.mp3`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es arcade 8-bit con la paleta de arriba.
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


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

### s01-imposible (0-3.81) · el gancho
Pantalla de título: "COMPRARTE" gigante rosa con sombra amarilla (cuadro 0 ya a medio caer). Debajo
"DIFICULTAD:" y una barra de 11 segmentos que se llena desde "más difícil" (0.83) amarillo → rosa →
hueso, tiembla y en "último nivel" (1.94) cae el sello rosa "IMPOSIBLE" con sacudón. A la derecha
se arma una ESCALERA de bloques cian hasta "ÚLTIMO NIVEL" con una calavera arriba. La jugadora
entra caminando y en "videojuego" (2.69) salta contra el primer bloque y rebota.

### s02-jugadora (3.81-12.01)
Selección de personaje: "JUGADORA 1" amarillo, la jugadora grande en un marco cian punteado que
parpadea; salta en "uno" (0.58). "Tres vidas" (1.08): corazón + "x3". "Misión" (2.63): caja de
diálogo con borde doble, se tipea "COMPRAR UNA CAMPERA" y aparece la campera en "campera" (4.17).
Corte en "¡Nivel!" (5.27): "NIVEL 1" gigante cian con sombra rosa, sacudón; se tipea "AVERIGUAR EL
PRECIO" y en "precio" (7.25) un bloque "?" larga una moneda y "$ ???".

### s03-precio (12.01-15.84)
TU LOCAL a la derecha (toldo a rayas, cartel, vidriera con la campera, puerta). La jugadora a la
izquierda con un globo: "HOLA, ¿CUÁNTO SALE LA CAMPERA NEGRA?". En "Consultá" (2.26) cae del cielo
un bloque rosa "CONSULTÁ / POR PRIVADO" y en "privado" (2.74) la aplasta (estrellita que sale).

### s04-nivel-dos (15.84-22.37)
"¡Pierde una vida!": corazón gigante que tiembla y en "vida" (0.58) se rompe en trozos, "-1 VIDA".
"NIVEL 2" (1.17) + "QUE TE CONTESTEN" tipeado + "ESPERANDO..." En "Ya" (3.73) sube un celular cian
"TU LOCAL" con el mensaje rosa de ella; "DÍA 1" → "DÍA 2" en "dos" (5.36), telaraña y zetas. Ella
golpea el pie, enojada.

### s05-visto (22.37-27.89)
El mismo celular. Cada "Visto" cae un sello hueso con doble tilde y "VISTO" (0.15 y 1.16); "Sigue en
visto" entra una banda rosa gigante "SIGUE EN VISTO" (2.2, golpe en 2.75). "¡Pierde otra vida!": una
tilde gigante cae y la aplasta en "vida" (4.5).

### s06-pagar (27.89-35.52)
"NIVEL 3" + "PAGAR" con monedas que saltan (1.2). Ella con la tarjeta cian ("tarjeta" 2.84), la
lanza; en "Solo" (3.8) cae un MURO de ladrillos rosa con el cartel "SOLO EFECTIVO" y la tarjeta
rebota con una X. "Transferime" (5.01): le llueven papeles encima. "Mandame el comprobante": cartel
negro con borde amarillo "MANDAME EL COMPROBANTE" (5.98, golpe en 6.53).

### s07-jefe (35.52-41.52)
"¡ÚLTIMA VIDA!" rosa parpadeando con un corazón. "¡Llegó" (1.09): banda de peligro amarilla y negra
con "JEFE FINAL"; el JEFE (calendario monstruo "LUNES") sube desde abajo, sacudón en "final"
(1.78), barra de vida que se llena, la mira con cejas fruncidas. "Pasá" (3.14): abre la boca y
escupe la frase "PASÁ EL LUNES" que vuela hasta ella; en "lunes" (3.74) le pega, ella sale volando
dada vuelta (se rompe el último corazón del HUD). El jefe se ríe.

### s08-game-over (41.52-48.11)
Velo oscuro. "GAME" / "OVER" caen letra por letra (0 y 0.84). "¿INSERTAR FICHA?" (1.93) con ranura
y moneda, cuenta regresiva 9-8-7-6. "Ni loca" (4.1): vuelve ella, enojada, globo "¡NI LOCA!";
aparece el cartel cian "EL DE ENFRENTE >" y ella se da vuelta y se va caminando para allá
("enfrente" 5.58).

### s09-modo-facil (48.11-56.00)
"MODO FÁCIL" amarillo con sombra rosa y "EL DE ENFRENTE". Ella corre (paso de dos cuadros) por
cuatro bloques "?" y salta a cada uno en su palabra: "Link" 1.29, "Precio" 2.15, "Pago" 3.06,
"Envío" 4.32; cada golpe larga una moneda y suma un renglón a la lista con moneda (LINK, PRECIO,
PAGO CON TARJETA, ENVÍO MAÑANA) y 1000 al puntaje del HUD. "¡Nivel completado!" (5.99): cartel
negro y amarillo, estrellas, ella salta con la campera del de enfrente sobre la cabeza.

### s10-control (56.00-62.11) · el giro
A la izquierda tu campera (la mejor) en un pedestal "TU LOCAL" con luz y estrellas. Ella, a la
derecha, se da vuelta a mirarla en "campera" (0.58) y en "linda" (1.34) le sale un corazón "+1";
se va. Entra Orus: cartel "LA MEJOR CAMPERA DEL JUEGO" en "mejor" (2.79). "Lo que está roto"
(4.42): sube un JOYSTICK; en "roto" (4.79) el palo se parte, la bola sale volando, chispas; sello
rosa "ROTO" en "control" (5.24).

### s11-tienda (62.11-67.97)
Ventana verde "TU TIENDA ONLINE" con la campera, "CAMPERA NEGRA", "PRECIO A LA VISTA" y el botón
"COMPRAR". "Vende sola" (1.55): un cursor aprieta solo, sello "¡VENDIDA!" y moneda. "Cobra" (2.49):
entra la cajita cian "COBRA CON MERCADO PAGO". Caen tres paquetes amarillos en su palabra: "DAC"
4.22, "CORREO" 4.79, "PEDIDOSYA" 5.22.

### s12-cta (67.97-76.09)
Vuelve la pantalla de título del principio: "COMPRARTE", "DIFICULTAD:" y la barra con UN solo
segmento verde; sello verde "MODO FÁCIL" en "modo" (1.27). "¿En qué nivel" (1.91): selector de
nivel con 4 casilleros (1 EL PRECIO, 2 EL VISTO, 3 EL PAGO, 4 EL LUNES en rosa) y un cursor que
salta de uno a otro; "Comentá el número" (4.19): banda verde "COMENTÁ EL NÚMERO" que late y
parpadea hasta el final.
