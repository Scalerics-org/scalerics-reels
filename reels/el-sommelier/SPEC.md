# El sommelier · tienda online · cata de vinos de cómo se compra en tu local

**De qué trata.** Programa de cata en una bodega a la luz de las velas. Un sommelier pretencioso
(Sadaltager, engolado y nasal) "cata" la experiencia de comprarle a tu local por Instagram, con
lenguaje de cata. Gancho: "Caté la experiencia de comprarle a tu local por Instagram. Y la tuve que
escupir." (y escupe en la escupidera). La clienta (Leda) acota: "¿Tan mala era?". Fase visual:
"un visto intenso, con tres horas de guarda". Fase olfativa: notas de "precio por privado",
invasivas. La clienta: "¡me mandaron un audio de cuatro minutos!". En boca: "transferime y mandame
la captura", áspero. Final: larguísimo, tres días esperando que le confirmen el envío. Puntaje: dos
sobre cien, y la ficha a la escupidera. Entra el dueño (Charon), ofendido: "¡Lo que yo vendo es
bueno!". GIRO del sommelier, amable: "La uva es excelente, caballero. Lo que arruina la botella es
cómo se compra." Orus: tu producto ya está; falta que comprarte sea fácil: la tienda online (ve el
precio, paga con Mercado Pago, elige envío DAC, Correo o PedidosYa). El sommelier, conmovido: "Un
vino que se sirve solo. Noventa y ocho puntos." Cierre: "¿Qué nota le ponés a cómo se compra en tu
local? Te leemos en los comentarios."

**Formato:** P (personaje de la cultura popular: cata de vinos / programa de gastronomía).
**Recurso visual central:** la cata: copa que gira con vino bordó, botella con etiqueta crema
"TU LOCAL", escupidera dorada, barricas de roble, ficha de cata con puntaje manuscrito, rueda de
aromas, carta de colores, velas.

## Paleta (manda sobre SPEC-base)
- Negro bodega `#0e0506` / `#26090f` / `#3e141c` (fondo, con hiladas de ladrillo horizontales en armar.mjs).
- Bordó `#7a1a2c` (oscuro `#4f0f1c`), vino `#a3263d`: el saco del sommelier, el vino, los sellos.
- Dorado viejo `#d9ad52` (oscuro `#a8822f`): acento de subtítulos, etiquetas, escupidera, medallas, cápsulas.
- Crema etiqueta `#efe4cc` (sombra `#d9c9a6`): etiquetas de botella, fichas, contornos de copa.
- Roble `#5a3a22` (claro `#7a5232`): barricas, mesa, delantal del dueño.
- Piel `#d9a77c` (sombra `#c48a5e`). Ilustración plana con relleno y contorno `#1a0a0c`.

## Tipografía
- Subtítulos: Lexend 600, 52px, crema `#efe4cc`; acento dorado `#d9ad52`.
- Fichas, carteles, etiqueta debajo del dibujo y rótulo del ambiente: Cormorant Garamond 600 (y la
  itálica 500 para "«precio por privado»"). Manda sobre el "sin serif" de SPEC-base.
- Lo que escribe el sommelier en la ficha: Caveat 700. UI del celular: Lexend 600.
- Etiqueta debajo del dibujo: Cormorant 600, 34px, mayúsculas, espaciada 0.22em, dorada, top 1372.

## Ambiente (`compositions/ambiente.html`)
Luz de velas que tiembla, dos velas abajo en los costados con llama que se mueve, arcos de ladrillo
apenas marcados, grano y viñeta. Golpes de luz bordó en el borde en los momentos de asco: escupir
4.9, invasivas 17.46, áspero 27.9, larguísimo 31.0, dos 36.65, ¡pará! 39.52. Desde "En Scalerics"
(53.3) luz dorada pareja y el rótulo pasa de "BODEGA · CATA A CIEGAS" a "TIENDA ONLINE · SE SIRVE SOLA".

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh → tiempos.mjs por parte → componer.mjs (atempo 1.05-1.2 y
silencios entre parlamentos; 1 s después del "Sobre cien" para la escupida) → ajustes.mjs (tiempos
corregidos a mano con silencedetect). Sommelier Sadaltager (01, 03, 04, 06, 07, 08, 10, 13), clienta
Leda (02, 05), dueño Charon (09), Orus (11, 12, 14). La música (`assets/bgm/bed.mp3`) es la del
molde estirada a 77 s con un crossfade.

## Escenas: cómo se hicieron
Las escenas salen de `partes/generador/*.mjs` (personajes y objetos compartidos en `lib.mjs`): para
cambiar una, editá su generador y corré `node partes/generador/<archivo>.mjs` y `node armar.mjs`
desde `reels/el-sommelier`. Todo lo que anima GSAP va en un `<g>` interno; la posición va en el
`<g transform>` de afuera (si no, GSAP pisa el transform del SVG).

## Personajes (siempre iguales)
- **Sommelier:** pelo negro engominado para atrás con canas en las sienes, ceja derecha levantada,
  ojos entrecerrados de desdén, bigotito con rulos, saco bordó, moño negro, catavinos dorado colgado.
- **Clienta:** pelo castaño oscuro con rodete, aros dorados, buzo dorado, cejas de indignación.
- **Dueño:** pelado con canas a los costados, bigote canoso grande, camisa crema y delantal de roble.
- **Cliente genérico (s10):** silueta simple crema con cara sonriente.

## Base técnica (de SPEC-base; la paleta y el estilo de arriba mandan)
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



## Escenas (tiempos relativos; ver tiempos.md)

### s01-gancho (0-7.28) · caté y escupí
Bodega: barricas atrás, mesa de roble abajo (y 1150-1330), el sommelier de medio cuerpo con la copa
en alto que gira. "local" (2.12): botella "TU LOCAL por Instagram" en la mesa. Trago (3.0), cachetes
inflados, gira hacia la escupidera dorada; "escupir" (4.9): chorro bordó a la escupidera, gotas,
temblor, cara de asco. "¿Tan mala era?" (5.69): asoma la clienta abajo a la izquierda. Etiqueta
"CATA · TU LOCAL" → "DIRECTO A LA ESCUPIDERA".

### s02-color (0-6.44) · fase visual
Copa grande a contraluz de una vela; el vino gira. "color" (1.09): carta de colores (rosado, rubí,
granate, bordó). "visto" (2.87): en el vino aparece el mensaje "¿Precio?" con "Visto" abajo, y en la
carta el color "VISTO" con marco dorado. "intenso" (3.12): el vino se oscurece. "tres horas"
(4.67): barrica con tiza "3 horas". Etiqueta "FASE VISUAL" → "VISTO, SIN RESPUESTA" → "GUARDA: TRES HORAS".

### s03-nariz (0-5.04) · fase olfativa
El sommelier huele la copa; volutas de aroma. "notas" (1.13): rueda de aromas (frutos, roble,
vainilla, cuero, especias, privado). "precio" (2.07): la cuña "PRIVADO" sale y se pone dorada;
cartel "NOTAS DE «precio por privado»". "Invasivas" (3.74): se echa para atrás, ojos abiertos, las
volutas se ponen bordó, la rueda tiembla.

### s04-audio (0-5.12) · la clienta testigo
La clienta indignada con el celular (DM de "tu_local"). "cuánto" (0.92): su burbuja "¿Cuánto sale?";
escribiendo...; "audio" (2.87): llega un audio; "cuatro minutos" (3.34): "4:00" gigante en círculo
dorado. Etiqueta "TESTIGO · LA CLIENTA" → "AUDIO DE CUATRO MINUTOS".

### s05-boca (0-6.01) · fase gustativa
El sommelier hace buches (cachetes inflados). Ficha "EN BOCA" donde se escribe «transferime (1.38) /
y mandame (2.42) / la captura» (3.0); "captura": comprobante en un celular con flash. "Áspero"
(4.02): sello bordó "ÁSPERO", cara de asco; "muy áspero" (5.17): tiembla entero.

### s06-final (0-6.07) · el final
"FINAL:" y una línea dorada que se dibuja: "Largo" (0.5) y "Larguísimo" (1.2) se va de cuadro.
"Tres días" (2.8): hojas de calendario DÍA 1, 2, 3. "esperando" (3.39): caja "ENVÍO a confirmar" con
telaraña. "confirmen" (4.23): mensaje de tu_local "Ahí te confirmo el envío". "envío" (5.08): "?".

### s07-nota (0-3.56) · el veredicto
Ficha de cata completa (color: visto, nariz: a privado, boca: áspera, final: eterno). "dos" (0.69):
un "2" bordó; "cien" (1.91): "/100" y círculo. 2.45: la ficha da vueltas y cae en la escupidera, salpica.

### s08-para (0-2.63) · el dueño ofendido
El dueño entra de costado con la palma en alto ("¡Pará!"). "vendo" (1.04): muestra su botella "LO MÍO
de la casa"; "bueno" (1.61): brillos dorados.

### s09-uva (0-5.72) · el giro
Racimo de uvas. "excelente" (0.68): medalla dorada. "botella" (3.13): entra la botella "TU LOCAL";
"cómo se compra" (3.98): se le pegan papelitos "¿precio?", "transferí", "captura", "visto", y se raja.

### s10-razon (0-5.14) · Orus
Cliente a la izquierda, botella "TU PRODUCTO" a la derecha. "está" (1.92): tilde dorado. "falta"
(2.7): caen tres muros bordó "visto", "privado", "captura" en el medio; "comprarte" (3.4): se caen;
"fácil" (4.18): flecha dorada derecha del cliente al producto.

### s11-tienda (0-8.39) · la tienda online
Celular con la tienda: barra "Tu local · tienda" (Scalerics 0.29), producto con precio (tienda
1.27; "precio" 3.3 se agranda), botón "Pagar con Mercado Pago" (4.04) que se toca (4.41), "Elegí el
envío" (5.25) con DAC (6.23), Correo (6.72), PedidosYa (7.23) y el radio que se va marcando.

### s12-sirve-solo (0-5.65) · se sirve solo
El sommelier con la copa; "vino" (1.13): llega una botella flotando ya inclinada; "sirve" (1.91):
cae el chorro y la copa se llena; "solo" (2.43): ojos abiertos, sonrisa. "Noventa" (3.5): medalla
dorada "98 PUNTOS" y brillos.

### s13-cta (0-7.31) · CTA
Ficha de cata "Cómo se compra en tu local · NOTA: ___ / 100"; "ponés" (0.45): una pluma escribe un
"?" bordó. Dos copas a los costados; "leemos" (2.59): globo de comentario dorado; brindan. Etiqueta
"¿QUÉ NOTA LE PONÉS?" → "DEJÁ TU NOTA ABAJO".
