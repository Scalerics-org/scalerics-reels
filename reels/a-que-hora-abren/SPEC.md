# Reel "¿A qué hora abren?" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le habla al dueño de un comercio al
que le va bien y está ocupado: las preguntas más fáciles de su negocio ("¿A qué hora abren?",
"¿Cuánto sale?", "¿Tenés en negro?") tienen siempre la misma respuesta, pero esperan en fila
mientras él atiende al que tiene enfrente; el que preguntó no espera, le escribe al de al lado,
y el de al lado contesta. No perdió la venta por una pregunta difícil: la perdió por la más
fácil. El bot contesta al instante, a cualquier hora, con horarios, precios y stock; toma
pedidos, agenda turnos y le pasa al dueño lo que es para él. Cierre: "Tu local cierra. Tu
WhatsApp, no." Locución de 57.0 s, ritmo rápido.

Mismo estilo que los reels aprobados: `../el-de-enfrente/`, `../turnos-perdidos/`,
`../bot-whatsapp/` (celulares con chat, badges X, engranaje, CTA).

Recurso visual central: **el celular con la burbuja "¿A qué hora abren?"** que se queda
esperando: doble tilde tenue, un relojito chico al lado que corre, y la fila de burbujas fáciles
que se apila. Segundo recurso: **la vidriera del local** (fachada de líneas: toldo con rayas,
puerta, cartel "ABIERTO" que se da vuelta a "CERRADO"), que aparece en s03, s07 (dos locales
lado a lado) y en el cierre.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-abren.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()`, `pop()`, `punch()`, `etq()` y tono visual.** Define el celular
  con el chat: reusalo.

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
  `flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (están en `tiempos.md`).


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 60.21 (la voz termina en
57.01).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-abren** (5.20 s) · "¿A qué hora abren? Si esa pregunta la contestás vos, estás perdiendo
ventas." Celular grande centrado (x 350-730, y 620-1220), cabecera "Tu local", arranca medio
dibujado. En "hora" (0.50) entra la burbuja del cliente "¿A qué hora abren?" con notificación
verde. En "contestás vos" (2.40-3.00) aparece abajo a la derecha, chica, una mano/figurita "VOS"
ocupada con una bolsa (atendiendo) y en el celular tres puntitos de "escribiendo..." que se
apagan: nadie contesta. En "perdiendo ventas" (3.80-4.20) la burbuja se queda con doble tilde
tenue y una etiqueta de precio "$" chica se desprende del celular y se va hacia la derecha con
blur. Etiquetas: "¿A QUÉ HORA ABREN?" → "VENTA PERDIDA".

**s02-no-es** (5.56 s) · "No es que la gente no lea tu Instagram. Ni que pregunte por
preguntar. Ni que sea mala onda." Tres íconos en fila con badge X verde en su palabra (como
`../turnos-perdidos/compositions/s02-no-es.html`): cuadradito de Instagram (cuadro redondeado con
círculo y punto) con rótulo "NO LEE" (Instagram 1.20); signo "?" grande con rótulo "CURIOSO"
(preguntar 2.90); carita seria con rótulo "MALA ONDA" (onda 4.70). Etiqueta "NADA DE ESO" (5.0).

**s03-quiere-ir** (2.62 s) · "Pregunta porque quiere ir. Hoy." A la izquierda una figurita con
el celular en la mano; a la derecha la vidriera del local (toldo, puerta). En "quiere ir"
(0.94-1.14) se dibuja una flecha punteada verde de la figurita a la puerta y la figurita da dos
pasos. En "Hoy" (1.87) hace pop un taco de calendario "HOY" verde arriba del local. Etiquetas:
"QUIERE IR" → "HOY".

**s04-preguntas** (3.58 s) · "¿A qué hora abren? ¿Cuánto sale? ¿Tenés en negro?" El celular
otra vez (mismo de s01), ahora con tres burbujas de cliente que entran una por palabra:
"¿A qué hora abren?" (0.0), "¿Cuánto sale?" (1.30), "¿Tenés en negro?" (2.36), cada una con su
pop y notificación. A la derecha del celular un contador verde redondo que sube 1, 2, 3.
Etiqueta: "LAS DE SIEMPRE".

**s05-faciles** (4.64 s) · "Son las preguntas más fáciles de tu negocio. La respuesta es
siempre la misma." Las tres preguntas en columna a la izquierda (burbujas crema chicas); a la
derecha sus respuestas en burbujas verdes: "9 a 20 h", "$ 890", "Sí, hay". En "fáciles" (0.74)
las preguntas aparecen; en "respuesta" (2.44) se dibujan tres flechas y las respuestas hacen
pop; en "siempre la misma" (3.34-3.74) las respuestas se "copian": cada una deja dos copias
tenues atrás (fantasmas apilados con offset), como sello que se repite. Etiquetas: "LAS MÁS
FÁCILES" → "SIEMPRE LO MISMO".

**s06-esperando** (4.40 s) · "Pero mientras atendés al que tenés enfrente, quedan esperando.
Una hora. Dos." A la izquierda vos detrás del mostrador (línea horizontal) con un cliente
enfrente, pasándole una bolsa en "atendés" (0.40). A la derecha el celular chico apoyado en el
mostrador con las tres burbujas apiladas y doble tilde tenue. En "esperando" (2.40) arriba del
celular un reloj; en "Una hora" (3.36) la aguja da una vuelta y aparece "+1 H" verde; en "Dos"
(4.25) otra vuelta, "+2 H". Etiquetas: "ATENDIENDO" → "ESPERANDO".

**s07-al-lado** (4.50 s) · "Y el que preguntó no espera: le escribe al de al lado. Y el de al
lado contesta." Dos vidrieras lado a lado (la tuya a la izquierda con cartel "TU LOCAL", la de
al lado a la derecha "AL LADO"); la figurita con celular abajo al medio. En "no espera" (1.20-1.50)
la figurita gira hacia la derecha. En "escribe" (2.40) una burbuja "?" sale de su celular hacia
el local de al lado (arco punteado). En "contesta" (4.10) del local de al lado vuelve una burbuja
verde con tilde, al instante, y tu local se apaga a 0.35. Etiquetas: "NO ESPERA" → "CONTESTA
EL DE AL LADO".

**s08-la-mas-facil** (5.30 s) · "No perdiste la venta por una pregunta difícil. La perdiste por la
más fácil." Dos tarjetas: arriba a la izquierda una burbuja "DIFÍCIL" con una pregunta larga
tenue (renglones grises), en "difícil" (2.40) tachada con badge X. En "La perdiste" (3.41) a la
derecha entra grande la burbuja "¿A qué hora abren?" con un aro verde que se dibuja alrededor y
rótulo "LA MÁS FÁCIL" en "fácil" (4.40), punch. Etiquetas: "NO FUE LA DIFÍCIL" → "FUE LA MÁS FÁCIL".

**s09-sistema** (3.82 s) · "Y no se arregla con el celular en la mano. Se arregla con un
sistema." Una mano con el celular que tiembla; en "celular" (0.90) badge X verde. En "Se
arregla" (2.02) se va con blur y en "sistema" (2.80) el engranaje se dibuja y gira con punch
(como `../el-de-enfrente/compositions/s09-sistema.html`). Etiquetas: "CON EL CELULAR, NO" →
"UN SISTEMA".

**s10-bot** (8.27 s) · "Por eso hacemos bots de WhatsApp para comercios. Contesta al instante,
a cualquier hora, con tus horarios, tus precios y lo que tenés en stock." Celular centrado con la
cabecera "Tu local", carita de bot verde y "en línea" en "bots" (0.48). En "Contesta" (2.28)
entra "¿A qué hora abren?" y en "instante" (3.28) la respuesta verde inmediata con doble tilde
verde. En "cualquier hora" (4.18) un relojito con luna a la derecha del celular, la aguja gira.
Dentro de la respuesta, tres renglones que entran en su palabra: "Abrimos 9 a 20 h" (horarios
5.28), "Remera: $ 890" (precios 6.18), "Negra: hay" con tilde (stock 7.38). Etiquetas: "BOT DE
WHATSAPP" → "AL INSTANTE" → "A CUALQUIER HORA".

**s11-pedidos** (4.72 s) · "Toma pedidos, agenda turnos, y si la consulta es para vos, te la
pasa." Tres tarjetitas que entran en fila (como íconos): en "pedidos" (0.11) una bolsa con
lista "PEDIDO" y tilde verde; en "turnos" (1.31) un calendario con una celda verde "TURNO"; en
"consulta" (2.41) una burbuja con "?" que en "te la pasa" (3.31-3.71) vuela en arco a una
figurita "VOS" a la derecha, que la recibe con un pop. Etiquetas: "PEDIDOS Y TURNOS" → "TE LA
PASA".

**s12-cta** (7.60 s) · "Tu local cierra. Tu WhatsApp, no. Comentá ABIERTO y te contamos
cómo." (la voz termina en 4.4). Primer tramo (0-2.5): la vidriera a la izquierda y el celular a
la derecha. En "cierra" (0.39) baja la persiana del local (rayas que se dibujan de arriba abajo)
y el cartel pasa a "CERRADO" tenue; en "WhatsApp" (1.19) el celular se enciende con un puntito
verde "en línea" y una burbuja verde de respuesta; en "no" (1.89) punch del celular. En 2.4 todo
se va con blur y entra el cierre como `../el-de-enfrente/compositions/s11-cta.html`:
"Scalerics" grande, bajada "Bots de WhatsApp para comercios" y la píldora Comentá "ABIERTO" en
"Comentá" (2.70) con golpe en "ABIERTO" (2.99) y pulsos finitos. Sin salida con blur.
