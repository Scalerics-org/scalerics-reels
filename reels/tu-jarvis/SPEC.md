# Reel "Tu propio JARVIS": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, apps de
puntos y tiendas online para comercios). Pedido de Juan: "como crear tu propio JARVIS, bien cargado
de edición", y que NO se parezca a los reels anteriores. Formato distinto: gancho del narrador
("¿Y si tu comercio tuviera su propio JARVIS?"), después **habla el asistente** (otra voz, de IA,
calma) dándole el parte de la mañana a Martín, el dueño: mensajes contestados, turnos, pedidos
cobrados, una clienta que volvió por el aviso de puntos, una consulta que es para él. Después el
narrador revela: "Esto no es una película. Es tu comercio, con su propio JARVIS", qué hace, y que
Scalerics lo arma. Voz de 50 s.

## El estilo: interfaz holográfica (HUD) de película
Nada del estilo de líneas crema de los otros reels. Todo es una interfaz de asistente de IA:
- Paleta (SOLO estos): cian `#38e1ff` (el asistente, trazos de UI), blanco hielo `#e8f6ff`
  (textos e íconos), verde `#5ce611` (hecho/OK/cobrado/marca), ámbar `#ffb020` (alertas, lo que
  requiere atención), fondo ya puesto (navy-cian oscuro).
- Paneles: rectángulos con esquinas cortadas en diagonal (path), trazo cian 2–3 px, relleno
  `rgba(56,225,255,0.06)`, una barrita de título arriba en mono chico ("// MENSAJES", "CLIENTE
  #0412"). Datos en IBM Plex Mono; títulos y números grandes en Lexend 700 o Plex Mono.
- Efectos permitidos y BIENVENIDOS (que haya edición): brillo `filter: drop-shadow(0 0 14px
  rgba(56,225,255,.8))` en lo importante, contadores que suben (0 → 32), texto que se tipea letra
  por letra (revelá con un `clip-path: inset(0 X% 0 0)` animado o letra por letra con opacity; nada
  de animar width), glitch (saltos de x de 10–20 px en 3–4 tweens de 0.03 s), anillos que giran,
  barridos de escaneo, líneas que conectan nodos, cortes rápidos (scaleY a 0.02 como s01), zoom
  in/out de toda la escena, paneles que entran deslizándose desde los costados.
- Ritmo: cortes secos y movimientos rápidos (power3/expo), nunca un segundo quieto.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy con brillo cian, la voz, el logo y los efectos.
- `compositions/ambiente.html`: esquinas del visor, grilla tenue, partículas, barrido de escaneo
  cada 4 s y una **onda de voz** abajo (y≈1590–1660) que late mientras habla el asistente
  (3.25–24.1). No los dupliques y no pongas nada abajo de y=1500.
- `compositions/subtitulos.html`: el texto narrado arriba a la izquierda (y 236 a ~500), acentos
  cian. **Las escenas NO escriben la frase narrada.**
- `compositions/s01-hook.html`: **la escena modelo**. Copiá su estructura, clases, el NÚCLEO del
  asistente (anillos que giran + centro cian brillante) y la salida con corte. El núcleo puede
  reaparecer chico en un rincón de las escenas del asistente (como "el que habla").

## Trampas ya pagadas (leelas)
- `fromTo` hace *immediateRender*: el estado "from" se aplica al construir la timeline, aunque el
  tween arranque después. Si querés que algo esté invisible hasta su momento, `gsap.set(..., {opacity:0})`
  y animalo con `to`, o asegurate de que el primer tween de ese elemento sea el que lo esconde.
- En un `<g>` anidado NO uses `svgOrigin` para escalar (es global): usá `transformOrigin` o la
  escala fija en el markup. `svgOrigin` sirve para grupos de primer nivel (como en s01).
- `gsap.set(g, {scale})` en SVG escala desde la esquina: no lo hagas.

## Sonidos extra
`hud-on` (encendido, 0.5 s), `blip` (bip corto de UI, para cada dato que aparece), `scan`
(barrido, 0.6 s), `beep`. Más los de la lista de abajo (`typing`, `key-press`, `notification`,
`ping`, `glitch-1/2/3`, `whoosh-short`, `impact-bass-1/2`, `riser`, `sparkle`, `chime`).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (colores, brillos, efectos, etiqueta en cian, salida con corte en vez de blur si querés).

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


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 53.64 (la voz termina en
50.44). Algunos tiempos de palabras son interpolados (±0.3 s).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA como una interfaz. Si se te ocurre
algo más impactante en este lenguaje, usalo.

**s02-buenos-dias** (1.59 s, corta): "Buenos días, Martín." Panel de bienvenida que se abre con
corte: "07:00" grande en blanco hielo, "BUENOS DÍAS, MARTÍN" tipeado en mono cian, un sol de
líneas cian chico, y el núcleo chico arriba a la izquierda que late con la voz.

**s03-mensajes** (4.86 s): "Mientras dormías, contesté treinta y dos mensajes, agendé cinco
turnos..." Panel "// ANOCHE" con una línea de tiempo 00:00 → 07:00 que se recorre (dormías
0.16). En "contesté" (0.76) entra un panel con burbujas de WhatsApp que caen en cascada rápida y
un contador "MENSAJES 0 → 32" (treinta y dos 1.46–1.93) con tilde verde. En "agendé cinco
turnos" (2.16–3.96) un segundo panel: una agenda con 5 casilleros que se llenan uno por uno con
blip ("TURNOS 5"). Etiquetas "MIENTRAS DORMÍAS" → "32 RESPONDIDOS · 5 TURNOS".

**s04-pedidos** (3.99 s): "...y vendí siete pedidos en la tienda. Ya están cobrados." Panel
"// TIENDA ONLINE" con 7 filas de pedidos (#1041… con montos en $) que entran de a una muy rápido
(siete pedidos 0.30–0.90); en "cobrados" (2.80) a cada fila le aparece un sello verde "PAGADO"
en cascada y un total "$ 18.450" que cuenta hacia arriba con brillo verde. Etiqueta "7 PEDIDOS ·
COBRADOS".

**s05-rosa** (7.00 s): "Doña Rosa hace tres semanas que no viene: le llegó un aviso con sus
puntos. Ya contestó: viene hoy." Ficha de cliente "CLIENTE #0412 · DOÑA ROSA" con avatar de
líneas, "ÚLTIMA VISITA: HACE 21 DÍAS" en ámbar con alerta parpadeante (tres semanas 0.81–1.11),
una barrita de "frecuencia" que cae. En "aviso" (3.11) sale volando una notificación del panel
hacia un celular chico: "Rosa, tenés 120 puntos esperándote" (puntos 3.91). En "Ya contestó"
(4.74–4.81) llega la respuesta: burbuja "¡Paso hoy!" y el
estado de la ficha cambia de ámbar a verde "VIENE HOY" con un check grande (viene hoy
5.74–6.01). Etiquetas "21 DÍAS SIN VENIR" → "AVISO ENVIADO" → "VIENE HOY".

**s06-consulta** (4.51 s): "Hay una consulta que es para vos. Te la dejé arriba de todo." Una
bandeja de entrada con 6 conversaciones grises en lista; en "consulta" (0.31) una de ellas se
ilumina en ámbar con etiqueta "PARA VOS" y en "arriba de todo" (2.71–3.31) sube a la primera
posición con un movimiento fluido mientras las otras bajan, y queda fijada con un pin. El núcleo
chico la señala con una línea. Etiqueta "PRIORIDAD".

**s07-pelicula** (4.69 s): "Esto no es una película. Es tu comercio, con su propio JARVIS." EL
GIRO: la interfaz se rompe con glitch fuerte (saltos, desfase de colores falso con dos copias
cian/blanco corridas 6 px, barras horizontales) y se "apaga" como una tele vieja (corte a una
línea) en "película" (0.90). En "Es tu comercio" (1.90–2.20) se prende otra vez mostrando un local
de líneas blanco hielo con el núcleo del asistente adentro (el local tiene ahora un anillo cian
que gira alrededor). En "JARVIS" (3.70) el núcleo se enciende con onda expansiva. Etiquetas
"NO ES UNA PELÍCULA" → "ES TU COMERCIO".

**s08-asistente** (6.50 s): "Un asistente que atiende tu WhatsApp a cualquier hora, se acuerda de
cada cliente y te avisa solo lo que importa." El núcleo al centro y tres módulos que se
despliegan alrededor conectados con líneas que se dibujan: WHATSAPP 24/7 (atiende 0.71, a
cualquier hora 1.61–2.31: un reloj que da vueltas rapidísimo), MEMORIA DE CLIENTES (se acuerda
2.87, cliente 3.71: fichas apiladas que se barajan), ALERTAS (avisa 4.61, importa 5.51: muchas
notificaciones que se filtran y queda una sola en ámbar). Cada módulo hace "blip" al activarse.

**s09-decidis** (1.91 s, corta): "Vos decidís. Él hace el resto." Dos paneles enfrentados: a la
izquierda "VOS" con un botón grande "APROBAR" que se presiona (decidís 0.21); a la derecha "ÉL"
con una barra de progreso de tareas que se completa a toda velocidad (hace el resto 1.21–1.51)
con checks verdes en cascada.

**s10-scalerics** (7.52 s): "En Scalerics lo armamos para comercios: el bot que contesta, los
puntos que hacen volver y la tienda que vende sola, trabajando juntos." En "Scalerics" (0.44)
aparece "Scalerics" en Lexend 700 ~72px blanco hielo con brillo y una línea de escaneo que lo
cruza, debajo "PARA COMERCIOS" mono cian. Después tres módulos-hexágono o tarjetas que entran
deslizándose y quedan alrededor del núcleo: BOT DE WHATSAPP (bot 3.00, contesta 3.30: burbuja
que responde), PUNTOS (puntos 4.30, volver 4.90: flecha circular), TIENDA ONLINE (tienda 5.80,
vende sola 6.40: carrito con monedas). Verde para los íconos activos.

**s11-juntos** (1.79 s, corta): "trabajando juntos." Los tres módulos se conectan con líneas de
energía cian→verde que corren hacia el núcleo, que hace un pulso grande y todo el sistema
"enciende" (flash de 0.1 s + onda). Etiqueta "SISTEMA COMPLETO".

**s12-cta** (6.03 s): "Comentá JARVIS y te mostramos cómo sería el tuyo." (voz termina en ~2.8).
Cierre en este estilo: el núcleo grande arriba (y≈760) girando; "Scalerics" (Lexend 700 ~100px,
blanco hielo) en y≈1010; debajo "Bots · Puntos · Tiendas para comercios" (Lexend 500 34px,
blanco 0.7); una píldora CIAN `#38e1ff` con texto `#02121c`: Comentá "JARVIS", que entra con pop y
glitch en "JARVIS" (0.29) y late (pulsos finitos). Todo quieto y legible al final (sin salida).
