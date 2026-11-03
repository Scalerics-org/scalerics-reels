# Reel "El contador" · spec

Reel vertical 1080x1920 de Scalerics sobre **automatizaciones**, formato motion persuasivo
"Contador en vivo" (línea de Juan del 02-11). Gancho: "Este contador suma las horas que tu equipo
pasa copiando datos de un lado a otro." Un martes de ejemplo en una distribuidora: Sofía pasa el
pedido del WhatsApp a la planilla y de la planilla a facturación, Martín descuenta a mano en la
tienda online lo que vendió en el local, alguien avisa "tu pedido está listo" uno por uno y a la
noche se arma el reporte. Giro: el equipo trabaja bien, está haciendo trabajo de máquina. Con
automatizaciones cada tarea se hace sola (tilde verde), el contador se frena y se pone verde, y
el equipo vuelve a atender y a vender. Cierre: "Contanos en los comentarios: ¿qué tarea le
sacarías primero a tu equipo?". Una sola voz (Orus), 56.6 s.

Recurso visual central: **el contador** (`compositions/contador.html`), una capa propia que
`armar.mjs` monta encima de las escenas de 0 a 45.9 s (`reel.json` → `contador: [0, 145]`).
Dígitos IBM Plex Mono HH:MM:SS dentro de una caja crema, estado "SUMANDO · UN MARTES" en rojo
apagado `#c7655b`. El valor es ilustrativo (segundos de un martes de ejemplo) y se calcula por
tramos según el tiempo del video: sube rápido en la parte manual, se acelera en "Mirá cómo sube",
se va frenando con cada automatización y se detiene en "frena" (41.8 s): dígitos y caja en verde
`#5ce611`, estado "FRENADO". No se dice ninguna cifra en la voz.
- 0–4.95 s: grande al centro (caja y≈750–925). Escena 1 dibuja debajo (y 1000–1230).
- desde "un martes": chico arriba (escala 0.68, y≈568–772). Las escenas dibujan en y 790–1240.
- "Mirá cómo sube" (23.73) y "frena" (41.17): crece a 0.85 (hasta y≈850) y vuelve.

Color con significado (manda sobre el "un solo acento" de la base): lo manual en rojo apagado
`#c7655b` (tarjetas que viajan, filas copiadas a mano, sellos, etiquetas de tareas a mano), lo
automático en verde `#5ce611` (flujos, tildes, filas que se llenan solas). Personajes en crema:
Sofía (pelo con colita) y Martín (gorra). Fondo navy, logo de Scalerics abajo (index).

Las escenas s02–s12 se generaron con un armador común (helpers `dibujar()`, `pop()`, `latir()`,
`etq()`), la misma estructura que s01.

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
1. **s01-contador** (0–4.95): el contador grande al centro corre desde 00:00:00. Abajo, una mesa:
   celular a la izquierda, Sofía en el medio, planilla a la derecha; una tarjetita roja va y viene
   entre los dos, cada vez más rápido, y Sofía gira con ella. Arcos grises en "copiando" y "lado".
   Etiqueta: COPIAR · PEGAR → DE UN LADO A OTRO (rojo).
2. **s02-martes** (4.95–7.30): el contador sube y se achica. Calendario MARTES (verde) a la
   izquierda; en "distribuidora", depósito con portón y cartel DEPÓSITO, cajas apiladas.
3. **s03-planilla** (7.30–10.49): celular WHATSAPP con globo "4 cajas de agua" en "pedido";
   Sofía aparece en "Sofía"; en "copia" la tarjeta roja vuela a la PLANILLA y aparece la fila
   "4 · agua" en rojo. Etiqueta WHATSAPP → PLANILLA.
4. **s04-factura** (10.49–13.42): planilla a la izquierda, monitor FACTURACIÓN a la derecha; sello
   rojo OTRA VEZ en "vuelve"; flecha roja; cursor que escribe Cliente, Cant. 4, Producto agua.
5. **s05-tienda** (13.42–17.85): Martín (gorra) detrás del mostrador LOCAL; tres cajas en "tres";
   se van en "local". Notebook TIENDA ONLINE con "Agua x6 · STOCK 12"; en "descuenta" el cursor
   tacha 12 y escribe 9 en rojo. Etiqueta LOCAL → TIENDA ONLINE.
6. **s06-tarde-noche** (17.85–23.73): sol; celular con cuatro globos rojos "Tu pedido está listo"
   que aparecen uno por uno. En "noche" baja el sol, se dibuja la luna, y tres hojas grises vuelan
   a la hoja REPORTE, que se llena de renglones rojos. Etiquetas UNO POR UNO, REPORTE A MANO.
7. **s07-sube** (23.73–28.36): el contador crece y tiembla en "Mirá cómo sube". Cinta
   transportadora con cinco íconos rojos de tareas que avanza; Sofía y Martín aparecen en "Tu
   equipo" con tildes verdes en "bien" (BUEN EQUIPO); en "máquina" un engranaje rojo gira y los
   dos suben y bajan al mismo compás (TRABAJO DE MÁQUINA).
8. **s08-automatico** (28.36–35.40): calendario MARTES otra vez; en "automatizaciones" un
   engranaje verde gira. Después el circuito WHATSAPP → PLANILLA → FACTURA con línea verde: la
   tarjeta verde viaja sola, la fila se llena en verde, tilde; sigue a la factura, tilde.
9. **s09-solo** (35.40–40.95): tres paneles con tilde: TIENDA STOCK 12 → 9 verde en "sola";
   celular con "Tu pedido está listo" verde y doble tilde en "solo"; celular que recibe la
   tarjeta "Reporte del día" con barras en "celular".
10. **s10-frena** (40.95–45.90): el contador crece, tiembla y se pone verde: FRENADO. Cinco
    tareas con tilde verde. Sofía atiende a un cliente (globo verde con puntos) en "atender";
    Martín sale con una caja hacia la puerta, flecha verde, en "vender".
11. **s11-scalerics** (45.90–53.16): caja verde SCALERICS · AUTOMATIZACIONES. Dos columnas: LO
    REPETIDO (hojas rojas que caen a un engranaje verde, SISTEMA) y TU EQUIPO (Sofía y Martín con
    un corazón verde, LO QUE IMPORTA). Etiqueta PARA PYMES.
12. **s12-cta** (53.16–59.81): cinco chips rojos con las tareas del reel; el cursor elige "Pasar
    pedidos a la planilla" (se pone verde), se escribe en una caja de comentario y aprieta enviar
    (botón verde). Etiqueta CONTANOS EN COMENTARIOS.
