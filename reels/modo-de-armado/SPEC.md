# Reel "Modo de armado": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: AUTOMATIZACIONES.
Formato C (lista en pasos) disfrazado de MANUAL DE INSTRUCCIONES de un mueble en kit (el de la
tienda sueca, solo como idea: sin marca, sin nombres de muebles, sin su azul/amarillo exacto).
La VOZ DEL MANUAL (Kore, neutra y demasiado amable) explica "cómo armar la noche de un
comerciante": "Felicitaciones por tu negocio. Viene con cuarenta y siete pasos y ninguno se hace
solo." Piezas incluidas: A el celular, B la planilla, C el café frío. Paso uno abrí el WhatsApp,
paso dos copiá el pedido, paso tres pegalo en la planilla, paso cuatro repetí. El HOMBRECITO DEL
PICTOGRAMA (el dueño, Charon, cansado) protesta: "¿Hasta cuándo?" "Hasta el paso cuarenta y
siete." "¿¡Cuarenta y siete!?". Paso 48: avisale a cada cliente que su pedido está listo, uno por
uno, con una sonrisa. Paso 49: vendiste en el local, actualizá el stock de la tienda online, a
mano. "Son las doce y media. Y me sobró un tornillo." "Ese tornillo es tu espalda. Es normal."
GIRO: "Fe de erratas: a este manual le faltaba un paso. Paso cero: dejá que se haga solo." Entra
el narrador de Scalerics (Orus): automatizaciones que pasan el pedido de WhatsApp a la planilla,
mandan el aviso de pedido listo, actualizan el stock y te mandan el reporte del día al celular.
"Manual nuevo: una página. Paso uno: andá a dormir." Cierre (Orus): "Contanos en los comentarios
en qué paso te agarran las doce." Voz de 73.4 s, total 76.6 s.

## ESTILO: HOJA DE MANUAL DE ARMADO
Todo es una hoja impresa de manual de mueble en kit: fondo blanco hueso, PICTOGRAMAS de línea
negra gruesa (stroke 6-7, round) con relleno blanco papel, HOMBRECITOS SIN CARA (cabeza círculo
liso, cuerpo de bloque, brazos y piernas de "doble trazo": un trazo negro de 26 y encima uno papel
de 14, así se ven contorneados), piezas con LETRAS EN CÍRCULOS (A, B, C), flechas gruesas de
montaje, una CUADRÍCULA DE PASOS con NÚMEROS GIGANTES (Lexend 800, negros), cotas, "x1" "x47",
la llave Allen (una L hexagonal), tornillos, signos: tilde azul en círculo (bien) y X roja en
círculo (mal), el globito con "?" del hombrecito confundido. Recuadros con esquinas redondeadas
y trazo negro de 5. El humor sale de lo prolijo y amable del manual contra el desastre que cuenta.
Edición cargada: cada "Paso N" es un número gigante que cae en su palabra; nada quieto más de
~0.8 s; sacudones chicos en los golpes del dueño.
Mirá `compositions/s01-felicitaciones.html`: ES LA ESCENA MODELO. Copiá su estructura: el helper
`hombre()` que arma el hombrecito (con brazos en grupos que rotan con `svgOrigin` en el hombro),
`dibujar()`, `pop()`, `.s<NN>-escenario` que tiembla, `gsap.set(...opacity 0)` + `fromTo` con
`immediateRender:false`, la salida de 0.2 s (la hoja se va hacia arriba con blur, como dar vuelta
la página).

## Paleta (SOLO estos colores)
- Papel blanco hueso `#f3efe4` (fondo, lo pone index) y papel claro `#fffdf6` (rellenos de
  pictogramas, hojas, pantallas).
- Tinta negra `#1a1a1a`: todos los trazos, números gigantes, textos del manual.
- Azul manual `#2b50d6`: lo bueno, el tilde, flechas de montaje, etiqueta mono, acento de
  subtítulos, lo que hace la automatización.
- Amarillo `#ffcf1f`: relleno de piezas destacadas, círculos de letra, el café, resaltador.
- Rojo `#e0362c`: la X, lo que está mal, los "x47", el reloj de las doce y media.
- Gris guía `#b9b3a3`: cotas, líneas de puntos, sombras planas, lo apagado.
Sin degradés ni brillos (es papel impreso). Sombras: solo planas, gris guía, desplazadas 8 px.

## Tipos de letra
Lexend 800 para números gigantes y títulos; Lexend 600 para textos del manual; IBM Plex Mono 500
para rótulos, códigos de pieza, cotas, "x1". Nada que haya que leer de menos de 26px.

## Zona
Subtítulos arriba (y 236 a ~420, negros con acento azul). Contenido entre y 580 y 1500. Ancho:
x 60-1020. La etiqueta mono azul va en top 1268 cuando hay espacio, o en 1440 si el dibujo baja.
El logo de Scalerics (en negro) va en y ~1746. `ambiente.html` pone el marco de la hoja, marcas
de corte, el encabezado mono (y ~120) y el número de página abajo a la derecha (y ~1800): no
taparlos.

## Lo que ya está hecho (no tocar)
`index.html` (lo genera `armar.mjs`), `compositions/ambiente.html`, `compositions/subtitulos.html`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde sobre navy; es la hoja de manual con la
> paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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


## Escenas (tiempos relativos a la escena: ver `tiempos.md`)

### s01-felicitaciones (6.53 s) · "Felicitaciones por tu negocio. Viene con cuarenta y siete pasos y ninguno se hace solo."
Tapa del manual. Arranca con la caja del kit ya medio dibujada (cuadro 0 no negro): una caja
plana en perspectiva con un local dibujado encima (toldo, vidriera) y el hombrecito al lado,
sonriente-sin-cara, saludando con el brazo arriba. "Felicitaciones" (0.0): sello azul arriba
"¡FELICITACIONES!" y el brazo del hombrecito saluda. "negocio" (1.29): pop de un rótulo mono "TU
NEGOCIO · MOD. NOCHE". "cuarenta y siete pasos" (2.76-3.62): cae un "47" gigante negro con
"PASOS" abajo, y un "x47" rojo al lado. "ninguno se hace solo" (4.48-5.52): una X roja en círculo
estampa sobre un ícono "se arma solo" (la caja con una flechita mágica); el hombrecito baja el
brazo. Etiqueta: "MODO DE ARMADO" → "x47 PASOS".

### s02-piezas (8.96 s) · "Instrucciones para armar la noche de un comerciante. Piezas incluidas: A, el celular. B, la planilla. C, el café frío."
"Instrucciones" (0.0): título del manual en recuadro: "CÓMO ARMAR LA NOCHE" + abajo "de un
comerciante" (en "noche" 1.53 aparece una luna chiquita de línea). "Piezas incluidas" (3.42): el
título sube y se dibuja la lámina de piezas: tres recuadros. "A" (4.10): celular con globitos
de chat, círculo amarillo con "A" y "x1". "B" (5.77): la planilla (grilla de celdas), círculo "B",
"x1". "C" (6.92): una taza de café sin humo, con una gota fría (y un rótulo mono "FRÍO"),
círculo "C", "x1". Etiqueta: "PIEZAS INCLUIDAS".

### s03-pasos (7.59 s) · "Paso uno: abrí el WhatsApp. Paso dos: copiá el pedido. Paso tres: pegalo en la planilla. Paso cuatro: repetí."
Cuadrícula 2x2 de pasos (cuatro recuadros de ~430x340 entre y 600 y 1330), cada uno con su número
gigante arriba a la izquierda. Cada recuadro aparece en su "Paso" (0.0, 1.88, 3.82, 5.80) con el
número cayendo. 1: mano del hombrecito con celular y globito de chat (en "WhatsApp" 1.21 vibra).
2: el globito con el pedido y unas tijeras/rectángulo punteado "COPIAR" (en "copiá" 2.76). 3: la
planilla y una flecha azul que mete el rectángulo en una celda (en "pegalo" 4.59). 4: una flecha
circular gigante "repetí" (6.60) que da la vuelta y vuelve al recuadro 1 (los cuatro recuadros
parpadean como un loop). Etiqueta: no (la cuadrícula ocupa la zona).

### s04-cuarenta-y-siete (5.37 s) · Dueño: "¿Hasta cuándo?" Manual: "Hasta el paso cuarenta y siete." Dueño: "¿¡Cuarenta y siete!?"
El hombrecito grande al centro, con el globito "?" que hace pop en "cuándo" (0.19), cabeza
inclinada. "Hasta el paso" (1.56): al lado una pila de hojas del manual que crece (hojas que caen
una sobre otra). "cuarenta y siete" (2.09-2.71): número "47" gigante con tilde azul, sereno. "¿¡Cuarenta
y siete!?" (3.46): el globito pasa a "!?" rojo, el hombrecito salta con los brazos arriba, la
escena tiembla, el 47 se pone rojo. Etiqueta: "PASO 47 DE 47".

### s05-listo (6.53 s) · "Paso cuarenta y ocho: avisale a cada cliente que su pedido está listo. Uno por uno. Con una sonrisa."
Número "48" gigante cae (0.26-0.91). Una fila de 6 hombrecitos chiquitos (los clientes) en fila
abajo; el dueño con su celular a la izquierda. "avisale" (1.24) / "cliente" (2.07): sale un
globito "LISTO" del celular hacia el primer cliente, que se ilumina con tilde. "uno por uno"
(4.12-4.66): los globitos salen de a uno, lento, a cada cliente (tilde tras tilde), con un
contador mono "1/47 · 2/47 · 3/47". "Con una sonrisa" (5.43): al hombrecito sin cara le aparece
una sonrisa dibujada torcida (una curva negra, lo único de cara del reel, el chiste). Etiqueta:
"UNO POR UNO".

### s06-stock (5.17 s) · "Paso cuarenta y nueve: vendiste en el local. Actualizá el stock de la tienda online. A mano."
"49" gigante (0.27-0.95). Izquierda: el mostrador del local con una caja que sale ("vendiste" 1.29
→ la caja sale y aparece "-1"). Derecha: una pantalla de tienda online con un producto y "STOCK 8"
("tienda online" 3.34). "Actualizá" (2.41): una flecha punteada gris del local a la tienda con una
mano gigante con lápiz que tacha el 8 y escribe 7. "A mano" (4.21): la mano se agranda con un
rótulo "A MANO" y cotas como de dibujo técnico. Etiqueta: "PASO 49".

### s07-tornillo (7.38 s) · Dueño: "Son las doce y media. Y me sobró un tornillo." Manual: "Ese tornillo es tu espalda. Es normal."
Un reloj de pared (línea negra) que marca 00:30 con las agujas que se dibujan en "doce y media"
(0.47-1.16) y un rótulo rojo "00:30". El hombrecito sentado en el piso, encorvado, con la llave
Allen en la mano. "tornillo" (2.36): un tornillo solo en el piso, encerrado en un círculo y con
el rótulo "x1 ?" (el globito "?"). "Ese tornillo" (3.64): zoom al tornillo; "espalda" (5.46): el
tornillo vuela con una flecha punteada a la espalda del hombrecito (una columna dibujada en la
espalda, con un hueco donde encaja) y queda encajado; el hombrecito se endereza un poco con un
crujido (sacudón). "Es normal" (5.99): tilde azul en círculo, amable. Etiqueta: "PIEZA SOBRANTE".

### s08-erratas (6.59 s) · "Fe de erratas: a este manual le faltaba un paso. Paso cero: dejá que se haga solo."
Una tira de papel "FE DE ERRATAS" (rótulo grande Lexend 800 sobre recuadro amarillo) se pega
torcida sobre la hoja (0.0-0.35). "manual" (1.67): detrás, la pila del manual de 47 pasos. "le
faltaba un paso" (2.37-2.98): un recuadro de paso vacío con borde punteado y un signo "+". "Paso
cero" (4.12-4.30): en el recuadro cae un "0" gigante AZUL. "dejá que se haga solo" (5.08-5.70):
dentro del recuadro, el hombrecito con los brazos cruzados (descansando) mientras las piezas A, B
se encastran solas con flechas azules. Etiqueta: "PASO 0".

### s09-planilla (4.87 s) · Orus: "En Scalerics hacemos automatizaciones. El pedido de WhatsApp pasa solo a la planilla."
"automatizaciones" (1.07): título en recuadro azul (texto papel) "AUTOMATIZACIONES" que hace pop,
con un engranaje que gira. "pedido de WhatsApp" (2.48-2.92): celular con globito de pedido a la
izquierda. "pasa solo a la planilla" (3.64-4.16): el globito viaja solo por una flecha azul a la
planilla de la derecha y llena una fila (tilde azul); filas que se llenan solas una tras otra.
Ningún hombrecito trabajando: el dueño chiquito sentado mirando. Etiqueta: "SE HACE SOLO".

### s10-aviso-stock (5.19 s) · "El aviso de que está listo sale solo. El stock de la tienda se actualiza cuando vendés en el local."
Dos recuadros apilados (paso hecho). Arriba (0.0-1.77): celular que manda solo globitos "LISTO"
a la fila de clientes (los de s05), todos con tilde a la vez, en "sale solo" (1.54). Abajo
(2.04-4.69): local y tienda online conectados por una flecha azul; en "vendés" (3.98) la caja
sale del local y el stock de la tienda cambia solo de 8 a 7 (sin mano). Tildes azules en círculo.
Etiqueta: "AUTOMÁTICO".

### s11-reporte (2.24 s) · "Y el reporte del día te llega al celular."
Celular grande al centro; en "reporte" (0.30) cae una notificación "REPORTE DEL DÍA" con tres
barras que crecen y una línea de tilde; "celular" (1.54) el celular vibra. Etiqueta: "REPORTE".

### s12-una-pagina (4.35 s) · Manual: "Manual nuevo: una página. Paso uno: andá a dormir."
La pila de 47 hojas se desarma (vuelan hacia afuera) y queda UNA hoja: "Manual nuevo" (0.0),
"una página" (1.27) rótulo "1/1". En la hoja, recuadro con "1" gigante. "andá a dormir" (3.05):
el hombrecito acostado en una cama de línea, con "Z Z Z" en Lexend que suben, y una lunita.
Etiqueta: "1 PASO".

### s13-cta (5.79 s) · Orus: "Contanos en los comentarios en qué paso te agarran las doce."
Recuadro de comentario grande (globito con esquinas redondeadas, borde negro) con un renglón
"Paso __" que se escribe y un cursor azul; un reloj chico rojo 00:00 al lado; flechita azul de
montaje que apunta al globito. "comentarios" (0.46) pop del globito; "qué paso" (1.18-1.28) el
"Paso __" aparece con un "?" que gira; "las doce" (2.09) el reloj marca 12 y hace un sacudón.
Después se queda (3 s) con algo vivo: el cursor titila, el "?" se mueve. Etiqueta: "COMENTÁ TU PASO".
