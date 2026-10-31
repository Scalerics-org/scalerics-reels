# Manos a la obra · automatizaciones · programa infantil de manualidades

**De qué trata.** Programa infantil de manualidades de la tele de los noventa, "Manos a la obra".
La conductora, la Seño Pochi (hiperentusiasta, aguda), abre con el gancho que pica: "¡Hola,
amiguitos! Hoy aprendemos a manejar un negocio como en el jardín: ¡todo a mano y con
plasticola!". Su ayudante de hoy es Raúl, dueño de un comercio, agotado ("Hola."). Los materiales:
cuarenta chats de WhatsApp, una planilla, plasticola y tres horas de tu noche. Paso uno: copiamos
el pedido del chat ("Copiado."). Paso dos: lo pegamos en la planilla, bien derechito ("Se me corrió
una fila."). Paso tres: avisamos a cada cliente, uno por uno, que su pedido está listo; una nena del
público: "¿A los cuarenta?". "¡A los cuarenta!" Paso cuatro: el stock de la tienda online, a mano.
Raúl: "Son las doce de la noche." Seño: "¡Y mañana lo hacemos otra vez!". La nena: "Seño, el señor
se durmió en la cartulina." Se apagan las luces del estudio.
GIRO (Orus): hay cosas que quedan lindas hechas a mano (un regalo, una tarjeta de cumpleaños); tu
noche, no. En Scalerics hacemos automatizaciones: los pedidos de WhatsApp pasan solos a la
planilla, cada cliente recibe su aviso, el stock se actualiza solo y el reporte del día llega al
celular. Cierre para compartir: "Mandáselo al que todavía hace todo a mano."

**Formato:** P (personaje de la cultura popular: programa infantil de manualidades, género nombrado,
sin marcas reales). **Producto:** automatizaciones.
**Recurso visual central:** la mesa de manualidades del programa: cartulinas de colores, tijera de
punta redonda, plasticola, brillantina, recortes con borde dentado (tijera zigzag) y letras
recortadas de colores para los carteles (cada letra en su papelito, torcida). Números de PASO
gigantes recortados en cartulina con una estrella. Todo es papel: ilustración plana con relleno y
contorno grueso de tinta, con una "sombra" de papel desplazada (otra capa de cartulina, plana).

## Paleta (manda sobre SPEC-base)
- Azul francia `#2347c9` (fondo de estudio: `#2b55e0` al centro, `#1b36a8` en el borde, con la grilla
  de la mesa de corte en armar.mjs).
- Amarillo pollito `#ffd23f`: acento de subtítulos, estrellas de los pasos, delantal de Raúl, tira de abajo.
- Rojo tomate `#ef4b3c`: pelo de la Seño, plasticola (tapita), corbata de Raúl, alarmas y tachones.
- Verde manzana `#7ccf3a`: delantal de la Seño, lo que sale bien, todo lo automático de Scalerics.
- Blanco papel `#fbf8f0`: cartulinas, planilla, globos de chat, texto claro.
- Tinta `#141a3c` (contornos y textos sobre papel). Piel `#f6c49a`; gris del pelo de Raúl `#b9bccb`.
  La "sombra de papel" es tinta a opacity 0.25 desplazada 10 px abajo a la derecha.

## Tipografía
- Subtítulos: Lexend 600, 52px, blanco papel `#fbf8f0`; acento amarillo pollito `#ffd23f`.
- Carteles y letras recortadas: Fredoka 700 (redonda, de programa infantil; `assets/fonts/Fredoka-var.woff2`).
- Lo escrito a mano en la cartulina, la planilla y los chats manuscritos: Caveat 700.
- Etiqueta debajo del dibujo: Fredoka 700, 34px, mayúsculas, espaciada 0.12em, tinta sobre una tira
  de papel blanco con borde dentado, top 1372 (la escena la dibuja).

## Ambiente (`compositions/ambiente.html`)
Guirnalda de banderines de cartulina arriba de todo (y 40-190, por encima de los subtítulos) que se
hamaca; papelitos en los bordes; luz de estudio que respira; grano y viñeta azul. Abajo, una tira
amarilla con borde dentado: "MANOS A LA OBRA · EN VIVO" (con puntito rojo que titila). En "durmió"
se apagan las luces (velo azul noche) y la tira dice "SHHH · EL AYUDANTE DUERME"; en "Hay cosas"
(Orus) vuelve la luz, cálida, y la tira dice "TU NOCHE, PARA VOS".

## Sonido
Música sintetizada por `partes/musica.mjs` (`assets/bgm/manualidades.mp3`): cortina de xilofón
alegre y bajo saltarín; en "durmió" pasa a cajita de música de canción de cuna; con Orus, acordes
cálidos y pulso suave. Efectos propios: `aplausos`, `risas`, `campanita`, `magia`, `tic`, `splash`
(plasticola), `salto`, `tijera` y `ronquido` (sintetizados).

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh → tiempos.mjs por parte → componer.mjs (atempo y
silencios entre parlamentos). Seño Pochi Laomedeia (01, 02, 04, 05, 07, 09, 11, 13), Raúl Charon
(03, 06, 08, 12), nena del público Leda (10, 14, con pitch subido), narrador Orus (15, 16, 17).

## Personajes (siempre iguales)
- **Seño Pochi:** pelo rojo tomate en rulos grandes (círculos), vincha amarilla, ojos grandes con
  pestañas, cachetes rojos, sonrisa enorme abierta; remera blanca y delantal verde manzana con
  bolsillo de donde asoman lápices. Siempre a la izquierda o al centro; saluda con la mano.
- **Raúl:** dueño, unos 50; pelado arriba con pelo gris a los costados, bigote gris, ojos a media
  asta con ojeras azules, camisa blanca, corbata roja floja y el delantal amarillo del programa
  con "AYUDANTE" en letras recortadas. Siempre a la derecha.
- **La nena del público:** chiquita, dos colitas castañas con moños rojos, remera amarilla, levanta
  la mano desde la fila del público (abajo, en primer plano, de espaldas o de perfil).

## Cómo se arman las escenas
s01 está escrita a mano. s02 a s14 salen de `partes/escenas/<id>.html` con `node partes/hacer-escenas.mjs`
(marcadores `{{seno}}`, `{{raul}}`, `{{nena}}`, `{{paso}}`, `{{mesa}}`, `{{estilo}}`, `{{helpers}}`; ver el
encabezado del script): para cambiar una escena se edita la fuente y se vuelve a correr, no
`compositions/`. Personajes en `partes/pj-*.svg`, CSS y JS comunes en `partes/estilo.css` y `partes/helpers.js`.

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

### s01-gancho (0-6.68) · "¡Hola, amiguitos!"
El estudio: título "MANOS A LA / OBRA" en letras recortadas (cuadro 0 con las primeras ya pegadas), la
Seño Pochi detrás de la mesa roja con borde dentado, saludando; tijera y brillantina en la mesa. "negocio"
(2.50): pop de un dibujo de jardín pinchado con chinche, "MI NEGOCIO" (casita, sol, monigote) que se
dibuja con crayón en "jardín" (3.42). "mano" (4.58): una manito amarilla de témpera se estampa encima.
"plasticola" (5.42): entra una plasticola gigante, chorrea una gota y hace charco. Etiqueta "HOY: TU
NEGOCIO" → "TODO A MANO".

### s02-raul (0-5.02) · el ayudante
Raúl entra arrastrando los pies por la derecha; la Seño lo señala. "dueño" (0.66): flecha de papel
"dueño de un", "comercio" (1.33): localcito con toldo. "¡Saludá, Raúl!" (2.15): el cartel APLAUSOS se
prende con lamparitas que titilan. "Hola." (3.80): el cartel se apaga, Raúl levanta la mano apenas,
parpadea lento, "cri, cri". Etiqueta "EL AYUDANTE DE HOY" → "MODO: AGOTADO".

### s03-materiales (0-9.19) · necesitamos
Cartulina blanca con cinta, "NECESITAMOS" en letras recortadas. "cuarenta" (0.67): pila de globitos de
chat que crece, contador rojo x1 → x40 hasta "WhatsApp" (3.17). "planilla" (4.58), "plasticola" (6.22,
cae rebotando), "tres horas de tu noche" (7.17): luna con reloj de agujas que vuelan; "noche" (8.25):
círculo rojo de crayón. Etiqueta "MATERIALES" → "LO MÁS CARO: TU NOCHE".

### s04-paso-uno (0-3.90) · copiamos
Estrella "1" + "PASO". Celular de papel con el chat de Marta ("¿Me separás la torta de chocolate para
el sábado?"). "copiamos" (1.02): línea punteada y una tijera que recorta el globo; "chat" (2.08): el
recorte se despega hacia Raúl. "Copiado." (2.80): sello rojo COPIADO. Etiqueta "PASO UNO: COPIAR" →
"PEDIDO 1 DE 40".

### s05-paso-dos (0-5.66) · pegamos
Estrella "2". Planilla de papel (PEDIDO · CLIENTE · LISTO). "pegamos" (0.91): la plasticola aprieta,
gotón y la tira amarilla "torta chocolate · Marta" se pega en la fila vacía. "derechito" (2.75): una
regla verde pasa y tilde. "corrió" (3.98): las filas de abajo se tuercen, la tira se ladea, círculo
rojo y "?!". Etiqueta "PASO DOS: PEGAR" → "BIEN DERECHITO" → "UPS".

### s06-paso-tres (0-6.43) · uno por uno
Estrella "3". Cadena de muñequitos de papel recortados (40: 4 filas de 10) vista con zoom en los
primeros; tildes verdes de a uno en "cliente", "uno", "uno", "pedido", "listo". "¿A los cuarenta?"
(5.03): se abre el plano (los 40, solo 5 avisados), la nena del público levanta la mano, "¿40?".
Etiqueta "PASO TRES: AVISAR" → "UNO POR UNO" → "AVISADOS: 5 DE 40".

### s07-paso-cuatro (0-6.08) · el stock a mano
"¡A los cuarenta!": la Seño festeja, "¡A LOS 40!" recortado, lluvia de papelitos; se va. "Paso cuatro"
(1.56): estrella "4" y compu de cartón con "MI TIENDA ONLINE" (torta, pan, alfajor). "stock" (3.17):
un lápiz con goma borra el 3; "online" (4.08): da vuelta y escribe un 2. "¡a mano!" (4.80): "¡A MANO!"
en letras recortadas. Etiqueta "¡A LOS CUARENTA!" → "PASO CUATRO: EL STOCK" → "A MANO, CLARO".

### s08-doce (0-1.88) · las doce
Ventana con luna, reloj de cartón rojo que se clava en las 12 ("doce" 0.30) y tiembla; Raúl cabecea.
Etiqueta "00:00 · Y SIGUE".

### s09-otra-vez (0-2.37) · ¡y mañana otra vez!
La Seño se hamaca feliz; almanaque de taco: HOY → MAÑANA → Y PASADO. "otra" (0.83): flechas rojas
circulares que giran y "¡OTRA VEZ!" recortado; papelitos. Etiqueta "Y MAÑANA..." → "OTRA VEZ".

### s10-durmio (0-3.72) · se durmió en la cartulina
Raúl de cara sobre la cartulina verde, ojos cerrados, la plasticola volcada y el charco creciendo. La
nena (abajo a la izquierda) le avisa a la seño: "shhh". "durmió" (1.38): se apaga el estudio
(ambiente) y suben "Z Z Z" de papel. Etiqueta "EL AYUDANTE" → "FUERA DE SERVICIO".

### s11-a-mano (0-6.40) · el giro (Orus)
Vuelve la luz cálida. "HECHO A MANO" recortado; el regalo envuelto ("lindas" 0.85) y la tarjeta de
cumpleaños con brillantina ("mano" 1.71), tildes verdes en "regalo" (2.56) y "cumpleaños" (3.93).
"Tu noche" (5.13): se van, entra la luna con reloj; "no" (5.67): X roja enorme. Etiqueta "HECHO A
MANO" → "A MANO: SÍ" → "TU NOCHE: NO".

### s12-planilla (0-5.07) · automatizaciones
"AUTOMATIZACIONES" en letras recortadas pero TODAS DERECHITAS (lo automático no se tuerce). Celular
"Pedidos" a la izquierda, planilla a la derecha, camino punteado amarillo entre los dos. Llegan los
mensajes ("pedidos" 2.65) y viajan solos ("pasan" 3.63): cada fila se escribe sola con su tilde.
"solos" (3.85): cartelito "SOLOS". Etiqueta "SCALERICS" → "SIN PLASTICOLA".

### s13-reporte (0-5.88) · avisos, stock y reporte
Dos filas de muñequitos: "aviso" (0.91) todos los tildes a la vez. "stock" (1.77): tarjeta de la tienda;
"solo" (2.62) el 3 pasa a 2 sin lápiz. "reporte" (3.48): celular a las 22:00 con la notificación
"Reporte del día" (pedidos cargados, clientes avisados, stock al día); "celular" (4.93) vibra.
Etiqueta "TODOS A LA VEZ" → "SIN TOCAR NADA" → "Y VOS, A DORMIR".

### s14-cta (0-5.42) · CTA
"MANDÁSELO" en letras recortadas; un avioncito de papel vuela por una estela punteada; "todavía"
(0.68): sube una mano pegoteada de plasticola y brillantina que saluda en "todo a mano" (1.37). Etiqueta
"AL QUE HACE TODO A MANO". Queda respirando hasta el final.
