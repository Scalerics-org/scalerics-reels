# Reel "El que no vuelve": spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos, tiendas online). Producto: **Scalerics Puntos**. Le dice al dueño de un comercio
una verdad incómoda: "el cliente que no vuelve te cuesta más que el alquiler". El alquiler lo pagás
una vez por mes; al cliente que no vuelve lo perdés todos los días sin enterarte. No es el precio
ni la ubicación: tu local es un balde con un agujero. Gastás en traer gente nueva y por abajo se
va la que ya tenías. Los que crecen no consiguen más: pierden menos. Tapar el agujero es tener un
sistema: Scalerics Puntos (suma, tarjeta en el celular, canje, aviso si deja de venir, panel).
Locución de 58 s, ritmo rápido. Mismo estilo que los reels aprobados (`../el-de-enfrente/`,
`../tu-mejor-cliente/`, `../descuentos/`).

Recurso visual central: **el balde con agujero**. El local es un balde (dibujo de líneas crema):
borde elíptico arriba, costados que se angostan, asa en arco. Los clientes son figuritas de palo
(las de `../el-de-enfrente/compositions/s01-te-roba.html`) o gotas: entran por arriba y se
escapan por un agujero abajo, marcado en VERDE (el acento es la pérdida y, después, el parche).
Geometría compartida del balde (coordenadas del SVG, usala igual en todas las escenas que lo
muestran):
- borde: `ellipse cx 540 cy 760 rx 170 ry 34`
- cuerpo: `M370 760 L420 1100 Q540 1140 660 1100 L710 760`
- asa: `M370 760 Q540 600 710 760`
- agujero: `ellipse cx 570 cy 1118 rx 16 ry 7` en verde; las gotas/figuras caen de ahí hasta y≈1230.
- gota: `M0 -22 Q16 0 0 12 Q-16 0 0 -22 Z` (trazo crema; las que se pierden, verdes).

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.
## Lo que ya está hecho (no tocar)
- `index.html` y `compositions/subtitulos.html` los genera `armar.mjs`: fondo, locución, logo,
  sonidos y subtítulos karaoke arriba (y 236 a ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-balanza.html`: la escena modelo. Copiá su estructura, `dibujar()`, `pop()`,
  `etiqueta()` y la salida con blur.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 61.41 (la voz termina en
58.21). Los tiempos de abajo son relativos a cada escena.

## Escenas

### s01-balanza (0.00, 2.70 s) · "El cliente que no vuelve te cuesta más que el alquiler."
Una balanza de platillos (poste central, brazo, dos platillos colgando de hilos), arranca medio
dibujada en el cuadro 0. Platillo izquierdo: un recibo/factura con "ALQUILER" (mono 24px) y unas
rayitas. Platillo derecho: una figurita de palo, de espaldas, yéndose (inclinada). En "cliente"
(0.10) aparece la figurita; en "vuelve" (0.70) sale una flechita verde que se aleja de ella. En
"cuesta" (1.60) el brazo empieza a inclinarse hacia el lado del CLIENTE (más pesado) y en
"alquiler" (2.40) termina de caer con golpe; el recibo queda arriba, liviano. Etiqueta:
"El que no vuelve" (0.1) → "Pesa más" (1.6).

### s02-calendario (2.70, 7.63 s) · "El alquiler lo pagás una vez por mes. Al que no vuelve lo perdés todos los días, y ni te enterás."
Un calendario de mes (marco, dos argollas arriba, grilla 7x5 de casilleros). En "alquiler"
(0.90) / "pagás" (1.40): el día 1 se marca con un círculo crema y aparece un billete chico al
lado. En "una vez" (1.70–2.00) el círculo late. En "Al que no vuelve" (2.40–3.40): una figurita
chica sale caminando del costado derecho del calendario y se va. En "perdés" (4.20) y "todos
los días" (4.90–5.40): todos los casilleros se van marcando con una X verde, en cascada rápida
(fila por fila, ~0.04 s cada uno). En "ni te enterás" (6.20–6.40): un ojo cerrado (arco con
pestañas) baja sobre el calendario; el calendario se apaga a crema 0.4. Etiqueta: "Una vez por
mes" (1.4) → "Todos los días" (4.9) → "Sin enterarte" (6.2).

### s03-no-es (10.33, 3.57 s) · "No es el precio. Ni la ubicación. Ni la competencia."
Tres íconos en fila (x 280, 540, 800; y ~880), cada uno se dibuja en su palabra y enseguida le
cae el badge X verde arriba a la derecha y se apaga a 0.4: etiqueta de precio con "$" en
"precio" (0.37), pin de mapa en "ubicación" (1.47), un localcito con toldo en "competencia"
(2.47). Etiqueta: "No es el precio" → "Ni el lugar" → "Ni la competencia".

### s04-balde (13.90, 2.73 s) · "Es que tu local es un balde con un agujero."
El local (casita con toldo, centrado) se dibuja en "local" (0.50) y en "balde" (1.10) se
transforma: el local se desvanece con blur y en su lugar se dibuja el BALDE (geometría de
arriba), con gotas crema adentro (nivel). En "agujero" (1.60) aparece el agujero verde con pop
y empiezan a caer 2-3 gotas verdes. Etiqueta: "Tu local" (0.5) → "Un balde con agujero" (1.4).

### s05-se-va (16.63, 5.87 s) · "Pagás publicidad, vidriera y descuentos para que entre gente nueva. Y por abajo se te va la que ya tenías."
El balde (ya dibujado al entrar, medio redibujado en 0.3 s). Arriba del balde, a los costados
(y 620–700), entran en su palabra tres íconos que "echan" gente: megáfono en "publicidad"
(0.27), una vidriera (rectángulo con toldo) en "vidriera" (0.97), una etiqueta "%" en
"descuentos" (1.67). Con cada uno, una figurita/gota cae adentro por arriba. En "gente nueva"
(3.07) caen 3 más, seguidas. En "por abajo" (4.27) el foco baja: por el agujero salen gotas
verdes en chorro (5-6, en cascada) mientras el nivel adentro baja. En "tenías" (5.47) el nivel
queda igual que al principio. Etiqueta: "Entran nuevos" (0.27) → "Se van los tuyos" (4.27).

### s06-no-volvio (22.50, 7.83 s) · "Uno vino, le gustó, y no volvió. No porque lo atendieras mal. Porque nadie le dio un motivo."
Mostrador (línea horizontal con caja registradora chica a la derecha) y una puerta a la
izquierda. En "Uno vino" (0–0.6): una figurita entra por la puerta y camina al mostrador. En
"gustó" (1.60) aparece arriba de ella un globito con un tilde verde. En "no volvió" (2.50) la
figurita se da vuelta y sale por la puerta; la puerta se cierra (línea que gira) y queda vacío.
En "atendieras mal" (4.0–4.4): sobre el mostrador aparece una carita contenta/tilde con un
badge X (no fue eso). En "nadie" (5.50) aparece en el centro una caja de regalo VACÍA abierta
(solo líneas, tapa levantada) y en "motivo" (6.50) se dibuja un "?" verde arriba de la caja.
Etiqueta: "Le gustó" (1.6) → "No volvió" (2.5) → "Sin un motivo" (5.5).

### s07-pierden-menos (30.33, 5.06 s) · "Los comercios que crecen no consiguen más clientes que vos. Pierden menos."
Dos baldes chicos lado a lado (escala 0.62 de la geometría, en x 300 y x 780, rótulos mono
"VOS" y "LOS QUE CRECEN" arriba de cada uno). En "crecen" (0.67) aparecen. En "consiguen más
clientes" (1.47–2.17) entran 3 gotas por arriba en LOS DOS, iguales (mismo ritmo). En "Pierden"
(3.48) el de VOS pierde gotas verdes por el agujero y su nivel baja; el de la derecha NO tiene
agujero (fondo entero, un parche verde) y su nivel sube con golpe en "menos" (3.77). Etiqueta:
"Entran los mismos" (1.47) → "Pierden menos" (3.48).

### s08-sistema (35.39, 2.71 s) · "Tapar el agujero no es caro. Es tener un sistema."
El balde grande con el agujero; en "Tapar" (0.0–0.3) baja un parche verde (rectángulo redondeado
con dos cruces de costura) y tapa el agujero con golpe; las gotas dejan de caer. En "caro"
(1.22) un pequeño "$" crema aparece y se tacha con línea verde. En "Es" (1.85) el balde se va
con blur y se dibuja el engranaje (como `../tu-mejor-cliente/compositions/s09-sistema.html`);
punch en "sistema" (2.41). Etiqueta: "Tapá el agujero" (0.0) → "Es un sistema" (1.85).

### s09-puntos (38.10, 6.89 s) · "Con Scalerics Puntos, tu cliente suma con cada compra y lleva la tarjeta en el celular."
Celular (380x620, rx 52) que arranca medio dibujado. Header "Scalerics Puntos" (Puntos en
verde) en "Scalerics" (1.21). En "cliente" (2.80) la tarjeta del cliente (nombre "Lucía", número
grande verde "40", "PUNTOS", fila de 10 sellos con 4 llenos; la tarjeta vacía
se dibuja ya en "Puntos"). En "suma" (3.30) y "compra"
(4.20): +10 cada vez, se llena un sello con pop y la tarjeta late. En "celular" (6.00) punch del
celular. Etiqueta: "Scalerics Puntos" (1.21) → "Suma con cada compra" (3.30) → "En el celular"
(5.10).

### s10-vuelve (44.99, 3.97 s) · "Junta, canjea premios, y vuelve porque le falta poco."
Arriba: la tarjeta (sin celular, más grande, y 640–890) con la fila de sellos (6/10). En "Junta" (0) se llenan tres sellos más en cascada (9/10); en "canjea premios" (0.41–0.91)
aparece una caja de regalo con moño verde a la derecha de la tarjeta con pop. En "vuelve" (1.81) abajo se
dibuja una puerta y una figurita camina HACIA ella (de derecha a izquierda, entrando). En "falta
poco" (2.61–3.01) una barra de progreso dentro de la tarjeta se llena hasta casi el final, con un
texto mono "TE FALTA 1" (28px) debajo. Etiqueta: "Canjea premios" (0.41) → "Y vuelve" (1.81).

### s11-aviso (48.96, 7.07 s) · "Si deja de venir, le llega un aviso antes de que se olvide de vos. Y vos ves quiénes son y cada cuánto vienen."
Primera mitad (0–3.1): celular con la tarjeta de Diego; en "venir" (0.44) se apaga y aparece un texto gris "20 días
sin venir"; en "llega un aviso" (1.24–1.54) baja la notificación (caja con trazo verde: "Tenés
80 puntos" / "esperándote" en verde) y el celular vibra; en "olvide" (2.54) late. Segunda mitad
(desde "Y vos ves" 3.14): el celular se va hacia la izquierda con blur y aparece un PANEL
(pantalla de compu ancha, 760x470 con pie) con título "Tus clientes" y 4 filas: nombre +
"cada 7 días" / "cada 10 días" / "cada 14 días" / y la fila de Diego con "hace 20 días" en
verde y un puntito verde (el que falta). Las filas aparecen en "quiénes son" (4.29), los "cada N días" en
"cada cuánto" (5.14–5.34), y la fila verde late en "vienen" (5.94). Etiqueta: "Le llega un
aviso" (1.24) → "Vos ves quiénes son" (3.74).

### s12-cta (56.03, 5.38 s) · "Comentá VUELVE y te contamos cómo."
Igual que el CTA de `../tu-mejor-cliente/compositions/s12-cta.html`: "Scalerics" grande, bajada
"Fidelización para tu comercio" y la píldora crema "Comentá “VUELVE”". Pop en "Comentá" (0),
golpe en "VUELVE" (0.37), pulsos suaves. Sin salida: el último cuadro queda quieto.
