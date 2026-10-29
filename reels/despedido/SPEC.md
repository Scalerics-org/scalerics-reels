# Reel "Despedido": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; acá vende UNA cosa: el
**agente de IA** que atiende el WhatsApp del comercio). Formato C, LISTA EN PASOS hecha DIARIO DE
UNA SEMANA: el dueño de un almacén (Charon, canchero y ahorrativo) cuenta: "El lunes despedí a mi
agente de IA. Para ahorrar. Total, contestar mensajes lo hace cualquiera." Y cada día se cae algo,
con humor creciente: martes, cuarenta mensajes sin leer y clientes (Leda) que repiten "¿A qué hora
abren?" ("¡A las nueve! ¡Dice en el cartel!"); miércoles, Doña Marta, la de siempre (Gacrux), se
fue al de enfrente "porque allá me contestan, querido"; jueves, contesta con la izquierda, cobra
con la derecha, el posnet que no anda, "solo efectivo, señora"; viernes, se le pasa un pedido
grande que ya compraron en otro lado; sábado, se duerme con el celular en la cara y lo despierta un
audio de cuatro minutos; domingo, lo vuelve a llamar, de rodillas. Vuelve el agente (Kore,
irónico y tierno): "Volví. ¿Me extrañaste?" / "Un montón." / "Ahorraste una semana. Perdiste una
semana. Lo caro no era yo: era que no dormías. Ahora andá a dormir, que yo atiendo." GIRO: el
ahorro le salió caro; lo que le faltaba era dormir. Cierra Orus (Scalerics): "En Scalerics lo
armamos para tu comercio: contesta al instante, a cualquier hora, toma pedidos, sigue al que
preguntó y no compró, y te pasa lo que es para vos. Guardalo para el día que quieras ahorrar."
Voz de 70.5 s (cuatro voces), reel de 73.7 s.

## ESTILO: ALMANAQUE DE TACO DE PARED que se arranca hoja por hoja. Edición CARGADA.
En la pared (fondo gris tinta oscuro) cuelga un almanaque de taco: una tira roja arriba con un
clavo (la pone `ambiente.html`) y debajo LA HOJA del día: papel blanco almanaque, con el NOMBRE DEL
DÍA GIGANTE arriba (Lexend 900, tinta; el DOMINGO en rojo, como en los almanaques), un rótulo
mono debajo ("DÍA 3 · PLAN AHORRO") y una línea roja fina. Debajo de esa línea, en la misma hoja,
se DIBUJA lo que pasa ese día: dibujos de tinta negra como en una libreta (personajes genéricos:
el dueño pelado de bigote y delantal, Doña Marta con rodete y bolsa de los mandados, el agente de IA
como un globito de chat con ojos, brazos y piernas), notas en birome azul escritas a mano
(Caveat), y tachones, círculos, X y sellos con MARCADOR ROJO. Cada día nuevo es un CAPÍTULO: la
hoja del día anterior se ARRANCA (se levanta de una esquina y cae girando fuera de cuadro, con
sonido de papel `arranque`) y aparece la del día nuevo con el nombre gigante que entra de golpe.
En la pared, alrededor del almanaque, se ACUMULAN POST-ITS amarillos (uno por día, con lo que el
dueño no llegó a hacer) y arriba a la derecha un celular con un CONTADOR DE MENSAJES SIN LEER que
sube (40 en "cuarenta", y después más, hasta "99+"). Cuando vuelve el agente ("Volví"), el
contador baja a 0 en verde y los post-its se caen.
Mirá `compositions/s01-lunes.html`: ES LA ESCENA MODELO. Copiá su estructura (las capas `pad`,
`hoja`, `dia`, `sub`, `linea`, `contenido`, la `vieja` que se arranca; los helpers `dibujar`,
`pop`, `golpe`, `sello`, `escribir`, `sacudon`; la salida que borra solo el contenido y deja la
hoja, porque la escena siguiente arranca con esa misma hoja).

## Paleta (SOLO estos colores)
- Papel almanaque `#f6f3ea` (la hoja); su borde y el taco de abajo `#dcd6c6` / `#c4beae`.
- Tinta `#16181d`: dibujos (trazo 6, caps redondos), nombres de los días, textos.
- Rojo domingo `#e63228`: la tira del almanaque, el DOMINGO, los tachones, X, círculos y sellos
  de marcador, el contador de sin leer.
- Amarillo post-it `#ffd84a`: post-its; acento de los subtítulos.
- Azul birome `#2f5bd3`: notas escritas a mano (Caveat 600), flechas de birome.
- Pared `#1a1c22` (fondo, lo pone `armar.mjs`).
- Desde "Volví" (s11) se suma el verde Scalerics `#5ce611` para el agente que vuelve, los tildes y
  el contador en 0.
Prohibido: emojis, fotos, degradés de colores en lo dibujado, rayas largas (—) en textos visibles,
logos de marcas (el posnet, WhatsApp y el celular son genéricos).

## Tipos de letra
Lexend 900 para los días y los sellos, Lexend 700 para textos dibujados; IBM Plex Mono 500 para
rótulos; Caveat 600 (birome azul) para notas a mano y post-its. Nada que haya que leer de menos de
26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba a la izquierda (y 236 a ~430). La tira roja del almanaque va en y 556-626
(ambiente). La hoja: x 150-930, y 620-1330. Nombre del día: y 650-790; rótulo mono y 796; línea
roja y 846. Dibujo del día: x 180-900, y 870-1310. Abajo de la hoja, en la pared (y 1360-1700),
los post-its del ambiente: no dibujes ahí. Logo en y ~1746. Celular con contador: x 940-1060, y
590-720 (ambiente).

## Lo que ya está hecho (no tocar)
- `armar.mjs` local: pared gris tinta, acento amarillo post-it en subtítulos, capa `ambiente`.
- `compositions/ambiente.html`: tira roja y clavo, contador de sin leer, post-its (martes 7.3,
  miércoles 17.0, jueves 25.2, viernes 33.0, sábado 39.3, domingo 45.0; se caen en 49.0), contador
  (40 en 8.03, sube cada día, "99+" en 41.6, baja a 0 verde en 48.95, se va en 60.7).
- `assets/sfx/arranque.mp3`: papel que se arranca (sintetizado). Va en el t 0.02 de cada escena que
  arranca la hoja.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba**: acá NO es ilustración crema con acento verde; es el almanaque de papel con la paleta de arriba. Sí valen las reglas técnicas, el `.sfx.json` y la verificación con snapshot y check (con `flock /tmp/hyperframes.lock`).

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


## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA en la hoja del día. Tiempos exactos
por palabra en `tiempos.md` (relativos a cada escena).

**s01-lunes** (6.50 s, hoja LUNES · "DÍA 1 · PLAN AHORRO"). Cuadro 0: la hoja ya está y el agente
(globito con ojos) se está dibujando. 0.48 "despedí": el agente sostiene una caja de cartón
(la caja del despedido, con una plantita). 1.71 "IA": sello rojo DESPEDIDO cae encima, sacudón.
2.67 "ahorrar": chanchito alcancía en birome azul con una moneda que cae y nota "plan ahorro!".
3.78 "Total": el agente se va caminando por la derecha con su caja; entra el dueño (pelado, bigote,
delantal) con el celular en alto, sobrado. 5.52 "cualquiera": nota en birome "contestar: YO" con
flecha al dueño y un círculo rojo.

**s02-martes** (3.74 s). Arranca LUNES, cae; MARTES (golpe). Un celular grande de tinta en el
centro; 1.53 "Cuarenta": globitos de mensaje que se apilan en el celular (salen de abajo) y el
número 40 gigante rojo con círculo de marcador; 2.85 "sin leer": sello rojo SIN LEER torcido.

**s03-abren** (3.76 s, sigue MARTES). Tres globos de chat de clientes distintos (iniciales en
círculo) "¿A qué hora abren?" en 0.00, 0.86 y 2.51, cada uno más grande y torcido; el tercero
tiembla y lleva "!!!" rojo. El celular del dueño vibra.

**s04-cartel** (2.21 s, sigue MARTES). El cartel de la puerta colgado de un clavito, "ABIERTO" y
"9 a 20 h" (se dibuja en 0.0); 0.35 "nueve": círculo rojo de marcador alrededor del 9; 0.70-1.24
"¡Dice en el cartel!": flecha roja gigante que apunta al cartel y el dueño a la izquierda,
desbordado (gotitas de sudor, boca abierta), sacudón.

**s05-miercoles** (5.80 s). Arranca MARTES; MIÉRCOLES. Una calle vista de frente: tu local a la
izquierda ("TU LOCAL") y "EL DE ENFRENTE" a la derecha. 1.31 "Doña Marta": entra Doña Marta
(rodete, lentes, bolsa) frente a tu local; nota azul "la de siempre" con flecha (2.48).
3.24-3.62 "se fue al de enfrente": cruza por un camino punteado azul hasta el otro local; el de
enfrente se ilumina con un globo de chat con tilde. 4.66 "¿Por qué, Marta?": un signo de pregunta
rojo gigante sobre tu local.

**s06-marta** (2.34 s, sigue MIÉRCOLES). Doña Marta grande a la izquierda y un globo de diálogo:
"ALLÁ ME CONTESTAN." (0.48 "contestan" golpe) y 1.14 "querido." en birome azul subrayado en rojo.
Guiño de Marta.

**s07-jueves** (7.86 s). Arranca MIÉRCOLES; JUEVES. 1.62 "izquierda": una mano izquierda con
celular (globitos escribiéndose) a la izquierda; 3.05 "derecha": una mano derecha con un posnet
genérico a la derecha. 4.19 "posnet": la pantalla del posnet dice "ERROR"; 4.96 "no anda": X roja
y sacudón; el posnet echa humito. 5.84-6.48 "Solo efectivo, señora": cartelito de cartón "SOLO
EFECTIVO" que cuelga torcido en el medio, con billete dibujado.

**s08-viernes** (6.30 s). Arranca JUEVES; VIERNES. 1.76 "pedido grande": un ticket de pedido que
se desenrolla larguísimo ("PEDIDO" y renglones). 2.95 "Lo vi el sábado": un ojo dibujado y nota
azul "visto: sábado". 4.18-5.19 "Ya había comprado en otro lado": X roja enorme sobre el ticket y
sello "PERDIDO", sacudón.

**s09-sabado** (5.88 s). Arranca VIERNES; SÁBADO. El dueño acostado, dormido con el celular
apoyado en la cara (2.22 "cara"), Zzz azules que suben. 3.08 "Me despertó un audio": globo de
audio con onda y triángulo de play; 4.13-4.60 "cuatro minutos": "4:00" rojo con círculo, el dueño
salta (sacudón, ojos abiertos).

**s10-domingo** (4.56 s). Arranca SÁBADO; DOMINGO (en ROJO). El dueño de rodillas a la izquierda,
manos juntas; 1.53 "volví a llamar": celular con "LLAMANDO..." y ondas; 2.96 "de rodillas":
líneas de impacto en las rodillas, sello "POR FAVOR" rojo.

**s11-volvi** (3.72 s, sigue DOMINGO). 0.00 "Volví": el agente vuelve con su caja (pop con brillo
verde: ojos y tilde en verde Scalerics), globo "¿Me extrañaste?" en 1.24. 2.69 "Un montón": el
dueño lo abraza; corazón rojo de marcador que late.

**s12-semana** (2.85 s, sigue DOMINGO). Grilla de la semana (L M M J V S D) dibujada en la hoja.
0.00-0.76 "Ahorraste una semana": una moneda chiquita con nota azul "ahorro". 1.58-2.00 "Perdiste
una semana": X rojas que tachan los siete días, una tras otra, y "PERDIDA" sellado.

**s13-dormir** (5.19 s, sigue DOMINGO). 0.20 "caro": el agente señalándose, nota "lo caro" tachada
en rojo; 1.81 "no dormías": el dueño con ojeras y ojos de espiral. 2.89-4.10 "Ahora andá a
dormir, que yo atiendo": el dueño en la cama con la luna; el agente al lado con el celular
contestando (tildes verdes que aparecen). Círculo rojo alrededor de DOMINGO.

**s14-scalerics** (8.10 s). Arranca DOMINGO; LUNES de nuevo ("SEMANA NUEVA"). En la hoja, una lista
con birome que se escribe en cada palabra y un tilde verde por ítem: "contesta al instante"
(2.48), "a cualquier hora" (3.62), "toma pedidos" (4.19), "sigue al que no compró" (5.81), "te pasa
lo tuyo" (7.33). Arriba de la lista, en 0.29 "Scalerics", rótulo "TU AGENTE DE IA · SCALERICS" y
el agente chiquito trabajando.

**s15-cta** (4.88 s, sigue LUNES). Un marcador de "guardar" (cinta de libro genérica) gigante
rojo que cae sobre la hoja en 0.00 "Guardalo"; "GUARDALO" Lexend 900 y abajo en birome "para el
día que quieras ahorrar" (0.95-1.23), con el chanchito de s01 tachado. Queda quieto (con
respiración) hasta el final.
