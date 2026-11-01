# Reel "Match point": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): TRANSMISIÓN DE TENIS por TV, en
un torneo sobre césped (Wimbledon, las frutillas con crema y el ojo de halcón SOLO nombrados: nada
de logos, trofeos, jugadores reales, colores oficiales ni marcas). Dos COMENTARISTAS en SUSURRO
(Charon, veterano irónico; Kore, refinada) relatan un "peloteo" eterno: la EMPLEADA del local (Leda)
le pregunta al DEPÓSITO por teléfono "¿Te queda el cuarenta en negro?"; el del depósito (Fenrir, con
filtro de teléfono) devuelve "Fijate en el Excel"; "El Excel dice que hay dos, pero no los
encuentro"; "Preguntale a Centro". Punto largo: la CLIENTA, en el mostrador, mira a un lado y al
otro como en la tribuna, "ya pidió frutillas con crema". "¡Centro dice que los mandó ayer!" /
"¡Acá no llegó nada!". Out, cuarenta iguales, deuce. La clienta (Aoede): "Bueno... gracias, eh." y
se va: "game, set y partido para el de enfrente". GIRO (Kore): estos dos juegan bien, pero con una
RAQUETA PRESTADA: un Excel en cada local y un sistema enlatado que no sabe cómo trabajan. ORUS
(Scalerics, voz normal): un sistema a medida de tu negocio, el stock de cada local y del depósito
en un solo lugar, al instante; preguntás en el mostrador y la respuesta está en la pantalla.
"Ojo de halcón: hay dos en el depósito." "Punto en un segundo. Ni se oyó el pique." Cierre (Orus):
"¿Cuánto dura el partido en tu negocio? Contanos en los comentarios."

Voz armada de 19 parlamentos (`partes/01..19.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.04-1.12 por parlamento y pegados
con 0.25-0.7 s (`componer.mjs`). Tiempos: Speech-to-Text de cada parte. Locución 72.17 s; reel 75.37 s.

## RECURSO VISUAL CENTRAL: la PELOTA de tenis que va y viene
La pregunta del stock es una pelota amarilla con estela que cruza la cancha de un lado al otro (local
abajo, depósito arriba, "Centro" a un costado); cada devolución es un golpe con sonido `pelota`.
La clienta mira el peloteo girando la cabeza a un lado y al otro, como en la tribuna.

## ESTILO: TRANSMISIÓN DE TENIS EN CÉSPED. Edición cargada.
Fondo de césped oscuro con franjas horizontales (en armar.mjs). Las escenas dibujan la CANCHA en
perspectiva de cámara de TV (trapecio: fondo angosto arriba, cerca ancho abajo), césped claro con
franjas, líneas blancas gruesas, RED en el medio (banda blanca arriba y malla). Personajes planos
genéricos con contorno verde oscuro: la EMPLEADA (remera violeta, pelo recogido) del lado del local
con el CELULAR en la mano como si fuera la raqueta; el del DEPÓSITO (gorra y remera blancas, delantal
verde oscuro, cajas detrás) con el teléfono; la CLIENTA (saco crema, cartera amarilla) en el
mostrador/tribuna. Gráficas de TV planas: placas rectangulares verde oscuro con franja violeta,
texto blanco, números amarillos. Palabras clave gigantes que caen en su palabra, sacudones.
CAPA FIJA (`compositions/ambiente.html`): arriba (y 104-196) el MARCADOR de TV: filas LOCAL y
DEPÓSITO con sets, games y puntos (cambian: 15-0 en "saque", 15-15, 15-30, 30-30, 40-30, 40-40,
DEUCE en "out"; en "Game" la placa grita PARTIDO: ENFRENTE; desde Scalerics marcador nuevo y en
"segundo" LOCAL 15 en amarillo, PUNTO EN 00:01), a la derecha la placa "CANCHA CENTRAL · TIEMPO" con
el reloj del partido que arranca en 40:00 y corre. Rótulo abajo a la derecha "CÁMARA 1 · CÉSPED".
Flashes: blanco en "Out" (32.63) y "Scalerics" (52.10), violeta en "Game" (40.48), amarillo en
"Ojo de halcón" (62.60).

## Paleta (SOLO estos colores)
- Césped `#4f9a3c` / `#5aa646` (cancha), oscuro `#1f5426` / `#12361a` (fondo, en armar.mjs).
- Verde TV `#0f3d24`: placas del marcador, contornos de personajes.
- Blanco `#f7f7f2`: líneas de la cancha, textos, subtítulos, la red.
- Violeta `#5b2d8c` (y `#7a4bb8` claro): franjas de las placas, remera de la empleada, lo "oficial".
- Amarillo pelota `#e3f53a`: la pelota, los números del marcador, acento de los subtítulos, lo que importa.
- Crema `#f3ecd2`: caras/manos, la clienta, el papel.
- Rojo `#e5484d` SOLO para "OUT", su marca de pique y las frutillas.
Brillos con drop-shadow del mismo color permitidos (1-2 por escena). Prohibido: emojis, fotos,
logos (el Excel es una planilla de cuadrícula genérica con "PLANILLA.XLS" o sin nombre: sin el logo
ni la X verde de la marca), rayas largas (—) en textos visibles.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos, el reloj y los números de la
planilla. Nada que haya que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Marcador en y 104-196 (ambiente); subtítulos y 236-420. Contenido de escenas entre y 560 y 1520,
x 50-1030. Rótulo de cámara y 1610; logo y ~1746.

## Lo que ya está hecho (no tocar)
`index.html` (lo genera `armar.mjs`), `compositions/ambiente.html`, `compositions/subtitulos.html`,
`compositions/s01-partido.html` (ESCENA MODELO: copiá su estructura, la cancha en perspectiva,
los personajes y la pelota con estela).

## Sonidos extra
Además de la lista de abajo: `pelota` (golpe de raqueta, corto: cada devolución), `aplauso`
(aplauso de tribuna, ~2.6 s, `max` para recortar), `impact-bass-2`, `glitch-2`, `whoosh-cinematic`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la transmisión de tenis con la paleta
> de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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
- **s01-partido** (4.98 s, hecha). Cuadro 0: la cancha en perspectiva ya dibujada, la pelota cruzando
  con estela. "MIRÁ ESTE PARTIDO" en placa de TV en "partido" (0.46). En "cuarenta minutos" (1.46)
  un reloj de placa "40:00" que golpea. Golpes de pelota de lado a lado (sonido pelota). En "stock"
  (4.0) "¿HAY STOCK?" gigante amarillo con sacudón.
- **s02-silencio** (4.97 s). La TRIBUNA de frente (gradas violeta/verde con cabecitas crema en filas)
  y un rótulo mono "NI EN WIMBLEDON" en 0.27; contador de golpes
  "GOLPES: 37" que sube rápido en "peloteo" (1.18). En "Silencio" (2.20) aparece el cartel de juez
  "SILENCIO, POR FAVOR" (placa violeta) y las cabecitas se quedan quietas. En "Saca el local" (3.53)
  la cámara baja a la cancha: la EMPLEADA lado cercano levanta el celular como raqueta; "SACA: LOCAL".
- **s03-saque** (3.98 s). Empleada de cerca (medio cuerpo) con el celular en alto; globo de diálogo
  "¿EL 40 EN NEGRO?" con una remera negra chiquita dibujada. En "Buen saque" (1.93) la pelota sale
  disparada hacia el fondo con estela y placa TV "BUEN SAQUE". En
  "Devuelve el depósito" (2.75) arriba, al fondo, el del depósito entre cajas devuelve (pelota viene).
- **s04-excel** (4.0 s). La pelota viene hacia la cámara y en "Excel" (0.47) se convierte en una
  PLANILLA gigante (cuadrícula verde/blanca genérica, celdas mono con talles y "?"). En "Pelota al
  Excel" (1.32) la planilla queda en la cancha como un jugador más. En "valiente" (2.68) placa TV
  "QUÉ VALIENTE" y una cabeza de comentarista con auriculares (silueta) que asiente.
- **s05-centro** (5.17 s). Celda resaltada "T40 NEGRO · 2" (0.18-1.29: "dos" amarillo que late);
  el depósito: estantes con cajas, linterna que barre; en "no los encuentro" (2.03) estante vacío y
  "?" que saltan. En "Preguntale a Centro" (3.61) la pelota sale en diagonal hacia un tercer lado:
  cartel "LOCAL CENTRO" a un costado; "A CENTRO" con flecha punteada.
- **s06-punto-largo** (5.81 s). LA CLIENTA en el mostrador, de frente (medio cuerpo), con la pelota
  pasando de izquierda a derecha por delante (estela) y su CABEZA girando a un lado (2.28 "lado") y
  al otro (3.0 "otro"), cada vez con el sonido. "PUNTO LARGO" placa en 0.37 con contador de golpes que
  no para. En "frutillas con crema" (4.28) aparece en el mostrador un pocillo con frutillas y crema
  y ella come una, resignada.
- **s07-ayer** (3.73 s). Pantalla partida: empleada a la izquierda / depósito a la derecha, la pelota
  va y viene cada vez más rápido. "¡AYER!" en 1.23 sobre la empleada; "¡NADA!" en 2.67 sobre el
  depósito. Un camioncito de reparto genérico con "?" en el medio.
- **s08-deuce** (3.81 s). En "Out" (0.0) juez de línea con el brazo extendido y "OUT" gigante rojo
  con flash; pelota que pica afuera con marca. En "Cuarenta iguales" (0.37) placa "40 · 40"; en
  "Deuce" (1.85) "DEUCE" gigante amarillo y la pelota vuelve al medio de la red (otra vez).
- **s09-game-set** (6.76 s). La clienta de frente se levanta ("Bueno..." 0.0, "gracias" 0.9 con mano
  que saluda), se da vuelta y se va caminando hacia la derecha (2.56-3.28), hacia un local "ENFRENTE"
  con toldo; en "Game" (4.03), "set" (4.28), "partido" (4.65) tres golpes de texto gigante GAME / SET /
  PARTIDO apilados; en "enfrente" (5.56) placa "GANA: EL DE ENFRENTE" violeta + aplauso.
- **s10-raqueta** (8.71 s). GIRO. Los dos jugadores (empleada y depósito) de frente, sudando; en
  "juegan bien" (1.17) tilde amarillo y "BUENOS JUGADORES". En "raqueta prestada" (2.68-3.39) cada uno
  tiene una raqueta ABSURDA: la de ella es una planilla con mango ("UN EXCEL EN CADA LOCAL": en 3.93
  aparecen tres planillas que no coinciden: "2" / "0" / "5"); en "sistema enlatado" (5.53-5.80) la del
  depósito es una LATA de conserva con mango y etiqueta "SISTEMA ENLATADO · TALLE ÚNICO"; en "no sabe
  cómo trabajan" (6.78-7.50) la lata hace "clonk", la pelota rebota mal, "?".
- **s11-a-medida** (7.31 s). Scalerics. En "Scalerics" (0.18) flash; una raqueta NUEVA a medida
  (marco violeta, cuerdas amarillas en grilla) que se arma con cinta métrica alrededor ("A MEDIDA"
  en 1.97). En "stock de cada local y del depósito" (3.31-4.74) tres nodos (LOCAL, CENTRO, DEPÓSITO)
  que se conectan con líneas a una pantalla central; en "un solo lugar" (5.81) quedan todos en una
  sola tabla; "AL INSTANTE" en 6.61.
- **s12-mostrador** (3.37 s). El MOSTRADOR con una pantalla: la empleada tipea "40 NEGRO" (0.0-0.73),
  en "respuesta" (1.36) aparece la fila con stock por lugar; en "pantalla" (2.43) brillo amarillo.
- **s13-ojo-de-halcon** (6.11 s). Gráfica del OJO DE HALCÓN: cancha vista desde arriba en 3D simple,
  trayectoria punteada amarilla de la pelota, zoom a la marca de pique; en "hay dos en el depósito"
  (0.92-1.95) la marca dice "IN" y placa "DEPÓSITO: 2". En "Punto en un segundo" (3.07-3.62) reloj
  "00:01" amarillo y "PUNTO"; en "pique" (4.98) la pelota pica sin sonido (onda que se dibuja muda),
  la clienta (chiquita) sonríe con la bolsa.
- **s14-cta** (6.66 s). "¿CUÁNTO DURA" / "EL PARTIDO" / "EN TU NEGOCIO?" gigantes en placa de TV, con
  un reloj de partido que corre; en "Contanos" (1.82) un globo de comentario con tres puntitos que
  laten y "EN LOS COMENTARIOS". Queda quieto con la pelota rebotando suave hasta el final.
