# Reel "Crecer sin contratar" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos y tiendas online para comercios). Le habla al dueño al que le va bien y no da
abasto: para crecer no necesita contratar a nadie, necesita dejar de hacer todo a mano. No le faltan
manos, ni horas, ni ganas: le sobra trabajo que no tendría que hacer nadie (contestar el mismo
precio, anotar pedidos en un cuaderno, acordarse de quién dejó de venir). Si suma a alguien para
eso, son dos haciendo todo a mano. Su equipo está para atender, no para copiar y pegar. Cierra con
todo Scalerics (bot que contesta y toma pedidos, Puntos que se acuerda y avisa, tienda que vende sola
con envíos y Mercado Pago) y "Comentá CRECER". Locución de 54.9 s (voz Orus), total 58.05 s;
escenas en `tiempos.md`. Sin despreciar a los empleados: el equipo es lo valioso, lo que sobra es
la tarea repetida.

Recurso central del reel: **el mostrador con la figurita del dueño (o del empleado) atrás y la
pila de tareas a mano** encima: tres íconos que se repiten en todo el reel, siempre iguales:
- **burbuja de WhatsApp** (globo redondeado con colita, adentro "¿Precio?" o rayitas),
- **cuaderno de pedidos** (rectángulo con espiral arriba: 5 circulitos, renglones tenues, lápiz),
- **ficha de cliente** (tarjeta con figurita de persona a la izquierda y un "?" verde).
Contra eso, **el engranaje del sistema** (rueda dentada crema con centro verde) que se traga las
tareas y gira solo. Figurita de persona: cabeza círculo r 26–34, cuerpo en path de hombros
redondeados (sin brazos de palito), como un busto detrás del mostrador.
Mostrador: `M-260 0 H260` (tapa) + `M-240 0 V150 M240 0 V150` (frente), coordenadas locales.
Engranaje (local, centro 0 0, r ext 110, 10 dientes; agujero círculo r 34 con relleno verde):
`M86.7 -15.1 L109.3 -12.1 L109.3 12.1 L86.7 15.1 A88 88 0 0 1 79.0 38.7 L95.5 54.5 L81.4 74.0 L61.2 63.2 A88 88 0 0 1 41.2 77.8 L45.3 100.3 L22.3 107.7 L12.4 87.1 A88 88 0 0 1 -12.4 87.1 L-22.3 107.7 L-45.3 100.3 L-41.2 77.8 A88 88 0 0 1 -61.2 63.2 L-81.4 74.0 L-95.5 54.5 L-79.0 38.7 A88 88 0 0 1 -86.7 15.1 L-109.3 12.1 L-109.3 -12.1 L-86.7 -15.1 A88 88 0 0 1 -79.0 -38.7 L-95.5 -54.5 L-81.4 -74.0 L-61.2 -63.2 A88 88 0 0 1 -41.2 -77.8 L-45.3 -100.3 L-22.3 -107.7 L-12.4 -87.1 A88 88 0 0 1 12.4 -87.1 L22.3 -107.7 L45.3 -100.3 L41.2 -77.8 A88 88 0 0 1 61.2 -63.2 L81.4 -74.0 L95.5 -54.5 L79.0 -38.7 A88 88 0 0 1 86.7 -15.1 Z`
Figurita (busto, local, base en y 0): cabeza `circle cx 0 cy -150 r 30`, cuerpo
`M-70 0 V-60 Q-70 -104 -26 -108 H26 Q70 -104 70 -60 V0`.

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


## Escenas (palabras y tiempos en `tiempos.md`)

### s01-contratar (5.20 s)
Cartel colgante de vidriera "SE BUSCA PERSONAL" (rectángulo redondeado con dos hilos y un clavito
arriba, texto Lexend 600 crema en dos renglones), centrado en y ~800, arranca medio dibujado
(cuadro 0 visible). "crecer" (0.20): flechita verde para arriba al costado. "contratar" (1.60): el
cartel se balancea. "nadie" (2.10): una línea verde lo tacha en diagonal + badge X, sacudón.
"Necesitás" (2.91): el cartel se achica y sube apagado (0.35); abajo se dibuja el cuaderno de
pedidos abierto con un lápiz. "hacer" (4.10): el lápiz escribe renglones; "a mano" (4.80) late.
Etiqueta: NO HACE FALTA → TODO A MANO.

### s02-no-das-abasto (4.23 s)
Dueño detrás del mostrador (centro, y del mostrador ~1060). "bien" (0.80): flechita verde que sube
encima de una caja registradora chiquita en el mostrador. "no das abasto" (1.41-1.70): le saltan
burbujas alrededor de la cabeza (3-4, pop rápido) y una fila de 3 clientes a la derecha; el dueño
tiembla. "pensás" (2.50): globo de pensamiento arriba a la izquierda; "sumar a alguien" (3.00-3.30):
adentro aparece una segunda figurita en trazo tenue con un "+" verde.
Etiqueta: NO DAS ABASTO → SUMAR A ALGUIEN.

### s03-no-faltan (3.60 s)
Tres íconos en fila (x 270/540/810, y ~900): mano abierta (MANOS, "manos" 0.94), reloj (HORAS,
"horas" 1.57), llama (GANAS, "ganas" 2.57). Cada uno se dibuja y recibe un tilde verde en su
palabra (no te faltan: los tenés); el anterior queda en 0.6. Nombres mono debajo.
Etiqueta: NO TE FALTA NADA.

### s04-te-sobra (3.02 s)
"sobra" (0.07)-"trabajo" (0.47): caen tarjetas de tareas (burbuja, cuaderno, ficha, burbuja, ...)
que forman una pila alta y torcida en el centro, y siguen cayendo hasta "que" (0.97). "tendría"
(1.27): al lado aparece una figurita; "nadie" (2.07): badge X sobre la figurita y la pila tiembla.
Etiqueta: TE SOBRA TRABAJO → NO ES PARA NADIE.

### s05-tareas (6.06 s)
Las tres tareas, una por vez, en tres columnas (x 230/540/850, y 700-1150), cada una con nombre
mono debajo; la activa a 1, las otras a 0.4.
"Contestar" (0.00)-"WhatsApp" (1.25): celular chico con tres burbujas iguales "¿Precio?" que llegan
una tras otra y la misma respuesta copiada (WHATSAPP).
"Anotar" (2.00)-"cuaderno" (3.05): cuaderno con renglones que se escriben solos con el lápiz
(PEDIDOS). "Acordarte" (3.89)-"venir" (5.15): ficha de cliente con figurita que se apaga y "?"
verde que salta (CLIENTES). Etiqueta: TODO A MANO.

### s06-dos-a-mano (2.89 s)
"Si sumás" (0.09): el dueño a la izquierda con su cuaderno; "alguien" (0.39): pop de una segunda
figurita a la derecha con "+" verde. "son dos" (1.70-1.89): los dos con su cuaderno y lápiz que se
mueve igual (en espejo); "todo a mano" (2.39-2.59): los dos lápices rayan a la vez, pila de papeles
crece en el medio. Etiqueta: DOS · TODO A MANO.

### s07-atender (4.76 s)
"Tu equipo" (0.60): figurita del equipo detrás del mostrador, con una pantalla adelante. Arriba,
un ícono de copiar/pegar (dos hojas superpuestas): en "copiar" (1.90) la hoja se duplica, en
"pegar" (2.30) se pega al lado, y enseguida badge X sobre el ícono.
"Está para atender" (3.17-3.60): entra un cliente del otro lado del mostrador, burbuja verde con
tilde entre los dos y una bolsa que pasa de mano. Etiqueta: COPIAR Y PEGAR → ATENDER.

### s08-sistema (3.81 s)
"Crecer no es contratar más" (0-1.24): fila de tres figuritas tenues (contrataciones) que aparecen
en "contratar" (0.64) y se tachan con una línea verde en "más" (1.24). "sistema" (2.64): el
engranaje grande se dibuja y gira; las tres tareas (burbuja, cuaderno, ficha) entran a él.
Etiqueta: NO ES CONTRATAR → ES UN SISTEMA.

### s09-bot (6.60 s)
"Scalerics" (0.13): caja de marca como tu-memoria s09 ("Scalerics" + "PARA COMERCIOS" en
"comercios" 1.53). En "Un bot" (2.63) la caja sube y se va; celular con chat: cliente "¿Tenés pan
de campo?"; "contesta" (3.73) respuesta verde al instante "Sí, recién salido. ¿Te lo guardo?";
"toma los pedidos" (5.23-5.63): tarjeta verde "PEDIDO TOMADO" con tilde.
Etiqueta: BOT DE WHATSAPP → PEDIDO TOMADO.

### s10-puntos (4.13 s)
Celular con Scalerics Puntos: ficha de clienta (Lucía, "viene los viernes", tarjeta de sellos).
"acuerda" (1.43) sellos y tilde; "cliente" (2.23) la ficha late; "avisa" (3.13) notificación que
sale: "Lucía, tenés un premio esperándote". Etiqueta: SCALERICS PUNTOS → AVISO SOLO.

### s11-tienda (4.36 s)
Celular con tienda (dos productos, botón verde Comprar). "vende sola" (1.60-1.90): ticket VENDIDO
con tilde. "envíos" (2.70): una caja sale del celular hacia la derecha con camioncito. "Mercado
Pago" (3.30-3.83): tarjeta "PAGO RECIBIDO" con tilde. Etiqueta: TIENDA ONLINE → ENVÍOS Y COBRO.

### s12-cta (9.39 s)
"Lo repetido" (0.53): engranaje a la izquierda girando, las tres tareas entran y desaparecen.
"sistema" (1.44) golpe. "Y tu gente atiende" (1.94-2.84): a la derecha figurita del equipo en el
mostrador con un cliente y burbuja verde con tilde. Etiqueta: LO HACE EL SISTEMA → TU GENTE ATIENDE.
"Comentá" (4.08): se va todo y entra el cierre
como tu-memoria s12: Scalerics + bajada "Bots · Puntos · Tiendas para comercios" + píldora
"Comentá CRECER" que late. Sin salida: último cuadro quieto.
