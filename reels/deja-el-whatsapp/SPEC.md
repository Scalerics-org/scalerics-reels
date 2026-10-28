# Reel "Dejá el WhatsApp" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Producto: **Bot de WhatsApp**. Le dice
al dueño de un comercio: "Dejá de atender el WhatsApp vos". El dueño vive con el celular en la
mano, contesta la misma pregunta todo el día ("¿A qué hora abren?", "¿Cuánto sale?", "¿Hacen
envíos?"), en el mostrador, en la cena, un domingo, y deja de hacer lo que hace crecer el negocio
(conseguir clientes, atender al que entró, pensar el próximo paso). Los que crecen no contestan
más rápido: tienen un sistema. El bot contesta solo y te pasa lo que es para vos. Locución de
49 s. Mismo estilo que los reels aprobados (`../el-de-enfrente/`, `../bot-whatsapp/`,
`../puntos-que-vuelven/`, `../descuentos/`).

Recurso central del reel: **la mano con el celular**. Una mano de líneas que agarra el celular
(pulgar a la izquierda, cuatro dedos sobre el borde derecho, palma y muñeca abajo), con un
contador verde de mensajes sin leer que no para de subir y rayitas de vibración a los costados.
Es el dueño atado al teléfono. Al final (s09-s11) el celular queda **apoyado solo**, sin mano, y
contesta él; la mano queda libre. Lo repetido (la misma burbuja una y otra vez) es crema; lo que
contesta el bot es verde.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy, locución, logo abajo (y 1746–1786), sonidos.
- `compositions/subtitulos.html`: el texto narrado aparece arriba a la izquierda (x 72, y 236 a
  ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-gancho.html`: **la escena modelo**. Copiá su estructura, helpers `dibujar()`
  y `pop()`, la mano, el celular, la lista de chats y el contador.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 52.53 (la voz termina en
49.33).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-gancho** (3.30 s) — "Dejá de atender el WhatsApp vos. Sí, vos. El dueño." La mano con el
celular, centrada (celular 320x560 centrado en x 540, y≈850). Arranca medio dibujada. En la
pantalla, una lista de chats (círculo + dos rayas + burbujita verde con número) que van entrando
de a uno desde arriba; arriba a la derecha del celular un contador verde que sube (3 → 9 → 14 →
22). En "WhatsApp" (1.00) rayitas de vibración a los costados y el celular tiembla; en "vos"
(1.40) golpe de vibración más fuerte. En "Sí, vos" (2.18–2.30) todo hace punch hacia la cámara;
en "dueño" (3.00) aparece un cartelito colgado de la muñeca "DUEÑO". Etiquetas: "DEJÁ DE
ATENDER" → "SÍ, VOS".

**s02-no-es** (6.65 s) — "No es que seas el único que sabe los precios. Ni que el cliente quiera
hablar con vos. Ni que sea parte del trabajo." Tres íconos en fila (x 270 / 540 / 810, y≈880)
con su badge X verde en su palabra, el anterior se apaga a 0.4: etiqueta de precio con "$"
(precios 2.00), dos burbujas de diálogo con una figurita (hablar 3.60), un maletín (trabajo
5.70). Rótulos mono: PRECIOS / HABLAR CON VOS / EL TRABAJO. Etiqueta final "NO ES ESO".

**s03-tu-dia** (3.77 s) — "Mirá tu día: ¿A qué hora abren? ¿Cuánto sale? ¿Hacen envíos?" Un
celular grande (sin mano) con cabecera de chat y un relojito arriba a la derecha que avanza. Las
tres burbujas del cliente (crema, a la derecha) entran en pop en su palabra: "¿A qué hora
abren?" (0.55), "¿Cuánto sale?" (1.83), "¿Hacen envíos?" (2.71), cada una de un cliente distinto
(círculo chico con inicial). Etiqueta "MIRÁ TU DÍA".

**s04-misma** (4.08 s) — "La misma pregunta, todo el día. Y vos, con el celular en la mano." La
burbuja "¿Cuánto sale?" se copia: en "misma" (0.08) aparecen 6-8 copias idénticas apiladas y
desplazadas en abanico, en "todo el día" (0.78–1.58) un reloj de línea al costado cuyas agujas
dan una vuelta entera. En "Y vos" (1.88) las burbujas se van y vuelve la mano con el celular
(como s01), con el contador subiendo; en "mano" (3.28) la mano aprieta (scale corto).
Etiquetas: "LA MISMA PREGUNTA" → "CELULAR EN LA MANO".

**s05-siempre** (2.70 s) — "Contestás en el mostrador, en la cena, un domingo." Tres viñetas
chicas en fila, cada una con un celular chiquito con burbuja verde arriba: un mostrador con caja
registradora (mostrador 0.60), un plato con tenedor y cuchillo (cena 1.60), un calendario con
"DOM" (domingo 2.20). Etiqueta "SIEMPRE CONTESTANDO".

**s06-no-crece** (5.20 s) — "Y mientras contestás lo mismo de siempre, no estás haciendo lo que
hace crecer tu negocio." Izquierda: el celular en la mano, más chico, con burbujas "¿Cuánto
sale?" que entran y "escribiendo" (contestás 0.80, mismo 1.50). Derecha: una maceta con una
plantita (tu negocio) que no crece: en "crecer" (3.80) se dibuja una flecha verde punteada
hacia arriba y en "negocio" (4.30) le cae un badge X; la planta se apaga a 0.4. Etiquetas: "LO
MISMO DE SIEMPRE" → "TU NEGOCIO, QUIETO".

**s07-crecer** (4.30 s) — "Conseguir clientes nuevos. Atender al que entró. Pensar el próximo
paso." Tres íconos en fila en su palabra, ahora en positivo (con un toque verde cada uno):
figuritas con un "+" verde (clientes 0.30), una puerta de local con una figurita entrando y un
tilde (atender 1.10 / entró 1.90), una escalera con una flecha verde que sube (pensar 2.55 /
paso 3.30). Rótulos mono: CLIENTES / ATENDER / PRÓXIMO PASO. Etiqueta "LO QUE TE HACE CRECER".

**s08-sistema** (4.32 s) — "Los que crecen no contestan más rápido que vos. Tienen un sistema."
Un cronómetro con un rayito (más rápido 1.60–1.80) que recibe el badge X (vos 2.30); en
"sistema" (3.20) se transforma en el engranaje que se dibuja y gira con punch (como
`../puntos-que-vuelven/compositions/s07-sistema.html`). Etiquetas: "NO MÁS RÁPIDO" → "UN
SISTEMA".

**s09-bot** (6.42 s) — "Por eso hacemos bots de WhatsApp para comercios. Contesta al instante, a
cualquier hora, con tus precios y tus horarios." Primero (0–2.6) la caja redondeada con colita
de burbuja "Bots de WhatsApp" (WhatsApp en verde) y "PARA COMERCIOS" (como
`../bot-whatsapp/compositions/s09-marca.html`), con su palabra (bots 0.48, comercios 1.48).
Después (2.6–6.4) la caja sube y se achica y abajo aparece el celular apoyado SOLO (sin mano):
la burbuja del cliente "¿A qué hora abren?" y enseguida la respuesta verde "Abrimos de 9 a 20 h"
(instante 3.18); arriba la hora cambia a "03:12" con luna (cualquier hora 3.78–4.28); llega
"¿Cuánto sale?" y la respuesta verde "$ 590, ¿te lo guardo?" (precios 5.08). Etiquetas: "AL
INSTANTE" → "A CUALQUIER HORA".

**s10-funciones** (4.50 s) — "Agenda turnos, toma pedidos, y cuando la consulta es para vos, te la
pasa." Tres íconos en fila con su verde: calendario con un día marcado y tilde (agenda 0.00 /
turnos 0.26), bolsa/lista de pedido con tilde (pedidos 1.26), y una burbuja que viaja por una
flecha verde hasta la mano libre (consulta 2.46, pasa 3.86). Rótulos: TURNOS / PEDIDOS / PARA
VOS. Etiqueta "SOLO LO QUE ES PARA VOS".

**s11-dueno** (2.24 s) — "Y vos volvés a ser el dueño." El celular queda apoyado en un mostrador
contestando solo (burbujas verdes que entran) y al lado la figurita del dueño parada, con las
manos libres; en "dueño" (1.36) el cartelito "DUEÑO" de s01 vuelve con un tilde verde. Etiqueta
"EL DUEÑO, DE NUEVO".

**s12-cta** (5.05 s) — "Comentá BOT y te contamos cómo." (la voz termina en 1.85). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Bots · Puntos ·
Tiendas para comercios" y la píldora crema Comentá "BOT" que entra en "Comentá" y late cada
~1.2 s. Sin salida con blur.
