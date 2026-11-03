# Reel "Lo de siempre": spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Formato motion persuasivo **"Rutina + punto de dolor"**. Producto: **agente de IA que ofrece la
reposición** (el único de agentes de la tanda). El dolor NO es no contestar: Hugo, dueño de una
distribuidora chica que le reparte a almacenes, kioscos y bares del barrio, cada jueves espera que
le escriban; Graciela se acuerda a las 23:04, el kiosco le compró al proveedor que pasó primero y
el bar pidió de menos y el sábado se quedó sin agua. Punto de dolor: querían comprar, nadie les
preguntó a tiempo. Giro respetuoso: Hugo sabe de memoria lo que lleva cada uno; ahora esa memoria
trabaja sola. El miércoles el agente de IA le escribe a cada cliente ("¿te mando lo de siempre?"),
Graciela suma una caja de yerba, el agente arma el pedido con precios y stock, le pasa a Hugo lo
que no sabe, y el jueves Hugo carga el camión. Cierre: "¿Qué te piden tus clientes todas las
semanas? Contanos en los comentarios."
Voces: Orus (narrador), Kore (el agente, 1 mensaje), Leda (Graciela, 1 respuesta). 186 palabras,
60.5 s de voz, 63.7 total.

## Recurso visual central: la rutina de la semana y el chat de marca
- **La tira de la semana** (L M M J V S D, s03, s07, s10): siempre la misma, en y 600-690. Con la
  rutina vieja se marca el JUEVES en gris/rojo apagado (esperar); con el agente se marca el
  MIÉRCOLES en verde (preguntar antes) y el jueves queda verde (cargar).
- **La tarjeta "lo de siempre"** (s01, s06, s08, s09, s12): el pedido de cada semana (2 cajones de
  agua, 3 de refresco) es siempre la misma tarjeta: gris y repetida en s01, nota de memoria en s06,
  dentro del globo del agente en s08, pedido armado en s09, verde y resuelta en s12.
- **Chat de marca** (s08, s09): no es WhatsApp. Celular de líneas crema (rx 52) con globos propios:
  el agente con borde verde y rótulo mono "AGENTE DE IA"; el cliente con borde crema; tildes verdes
  dibujadas (sin emojis ni íconos de la app).
- **Color con significado**: lo que está mal en rojo apagado `#b8574e` (texto `#d27a6e`) y gris
  `#7c8698` (texto `#8f99aa`): el jueves esperando, 23:04, "le compró a otro", "sin agua", "nadie
  preguntó". Lo resuelto en verde `#5ce611`. Crema `#efeee5` para dibujos y textos.
- Subtítulos: molde con acento verde y clase `malo` en rojo apagado (`reel.json` → "malo", el
  armar.mjs local es el de te-buscaron).

## Personajes y objetos (iguales en todas las escenas)
- **Hugo** (dueño): figura de líneas crema con origen en los pies, gorra con visera, chapita verde
  "HUGO". ~380 px a escala 1.
- **Agente de IA**: el de `lo-pienso` (cabeza-pantalla con ojos verdes, antena, "IA" en el torso).
- **Clientes**: Graciela (G · ALMACÉN), el kiosco (K · KIOSCO), el bar (B · BAR). Fachadas de
  líneas con toldo, cartel y puerta.
- **Cajón**: rect con tablitas y tapitas de botella arriba. **Camión** de líneas, de perfil.

## Capa `compositions/ambiente.html` (toda la duración, debajo de las escenas)
Encabezado arriba (y 128-188, por encima de los subtítulos): a la izquierda punto rojo apagado y
"ESPERANDO PEDIDOS" en crema apagado; en "Ahora" (27.41) pasa a punto verde y "CON AGENTE DE IA".
A la derecha, en mono: CADA SEMANA (0) → JUE · 18:00 (9.58) → JUE · 23:04 rojo (15.5 "once") →
VIE · REPARTO (16.78) → SÁB (20.3) → CADA SEMANA (24.76) → MIÉ · 10:00 verde (29.4) → JUE · CARGA
verde (49.72) → CADA SEMANA verde (52.59). Línea finita debajo (verde desde "Ahora").

## Zona y piezas fijas
Subtítulos desde y 236. Dibujos entre y 590 y 1250. Etiqueta mono verde (o roja `.mal`) en top
1268. Logo en y ~1746 (index).

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-5.02): cuatro tarjetas de pedido iguales apiladas ("SEM 1..4 · 2 agua · 3
  refresco", gris): la primera arranca medio dibujada en el cuadro 0, las otras en "piden" (0.6),
  "mismo" (1.0), "semanas" (1.8). En "¿Y si" (3.02) las cuatro se juntan en una, que se pone verde;
  en "ofrecieras" (3.4) pop del globo verde "¿Te mando lo de siempre?"; en "antes" (3.7) flecha
  verde hacia atrás con "ANTES". Etiqueta "Cada semana" → "Antes".
- **s02-hugo** (5.02-9.58): el depósito de líneas con cartel DISTRIBUIDORA y cajones, Hugo adelante
  en "Hugo" (0); en "chica" (0.98) el cartel late; a la derecha tres fachadas en "almacenes"
  (1.82), "kioscos" (2.48), "bares" (3.18) con la ruta de reparto punteada que se dibuja hasta cada
  una. Etiqueta "Distribuidora" → "Reparto del barrio".
- **s03-jueves** (9.58-16.78): la tira de la semana, JUEVES se marca en "jueves" (0.12); Hugo a la
  izquierda y un celular a la derecha "PEDIDOS · JUEVES" vacío; en "esperar" (2.01) tres puntitos
  grises que laten y el reloj de Hugo gira; en "Graciela" (3.75) llega el mensaje gris de Graciela
  "Hugo, ¿me traés lo de siempre?"; en "once" (5.92) la hora 23:04 en rojo apagado y la luz de la
  tira se apaga; Hugo bosteza (boca). Etiqueta "Jueves" → "Esperando" → "23:04" (roja).
- **s04-otros** (16.78-22.12): pantalla partida. Izquierda KIOSCO: en "pasó" (1.02) cruza un
  camión gris "OTRO PROVEEDOR" y le deja un cajón; chip rojo "LE COMPRÓ A OTRO" en "primero"
  (1.22). Derecha BAR: góndola con botellas; en "pidió de menos" (2.42) chip "PIDIÓ 1"; en "sábado"
  (3.52) las botellas se van apagando y en "sin agua" (4.12) chip rojo "SÁB · SIN AGUA". Etiqueta
  "Pasó otro" → "Sin agua" (rojas).
- **s05-a-tiempo** (22.12-24.76): las tres tarjetas de cliente (Graciela, Kiosco, Bar); en
  "comprar" (0.28) un carrito verde en cada una; en "Nadie" (1.02) a la derecha de cada una un
  globo punteado vacío que late en rojo apagado; en "tiempo" (1.78) un reloj rojo abajo con la
  aguja que gira. Etiqueta "Nadie preguntó" (roja).
- **s06-memoria** (24.76-29.26): Hugo de medio cuerpo a la izquierda; en "memoria" (0.84), "lleva"
  (1.44) y "uno" (1.74) salen tres notas de memoria (Graciela 2 agua · 3 refresco / Kiosco 4
  gaseosa / Bar 6 agua · 2 soda); en "Ahora" (2.65) las notas se ponen verdes y en "trabaja sola"
  (3.24) se ordenan en una lista "LO DE SIEMPRE" con tildes. Etiqueta "De memoria" → "Trabaja sola".
- **s07-miercoles** (29.26-33.46): la tira con MIÉRCOLES verde en "miércoles" (0.14); el agente
  de IA en "agente" (1.04); en "escribe" (2.04) salen tres líneas verdes a los tres clientes, cada
  uno recibe su globo "¿Lo de siempre?" (2.04, 2.44, 2.84). Etiqueta "Miércoles" → "Agente de IA"
  → "A cada cliente".
- **s08-chat** (33.46-43.20): el celular grande con el chat Graciela · ALMACÉN. Globo verde del
  agente "Hola Graciela, ¿te mando lo de siempre?" (0, 0.64); dentro, filas "2 cajones de agua"
  (2.6, tilde en 3.24) y "3 cajones de refresco" (3.84, tilde en 4.24); "¿Agrego algo?" (5.52);
  respuesta de Graciela "Sí, y sumale una caja de yerba." en "Sí" (6.94); chip verde "+ 1 CAJA DE
  YERBA" en "yerba" (8.64). Etiqueta "Lo de siempre" → "¡Sí!".
- **s09-pedido** (43.20-49.57): tarjeta "PEDIDO · ALMACÉN GRACIELA" con las tres filas y columnas
  PRECIO y STOCK: tildes en "precios" (1.0) y "stock" (1.6); en "armado" (2.6) sello verde
  "ARMADO". En "Si le preguntan" (3.19) la tarjeta se achica arriba y entra un globo gris del bar
  "¿Me conseguís hielo el domingo?"; en "no sabe" (4.5) un "?" sobre el agente; en "pasa"
  (5.1) el globo viaja por una flecha verde al celular de Hugo; chip "PARA HUGO" en "Hugo" (5.85).
- **s10-camion** (49.57-52.59): la tira con JUEVES en verde (0.15); el camión de líneas; en "carga"
  (1.83) tres cajones (G, K, B) saltan a la caja del camión; en "camión" (2.23) el camión se sacude y
  arranca un poquito. Hugo al costado, contento. Etiqueta "Jueves · a cargar".
- **s11-scalerics** (52.59-57.24): Hugo y el agente de IA lado a lado; en "Scalerics" (0.21)
  el rótulo SCALERICS; en "agentes" (1.31) el agente saluda; en "equipo" (3.71) una llave verde
  debajo de los dos con "TU EQUIPO". Etiqueta "Agentes de IA" → "Uno más del equipo".
- **s12-cta** (57.24-63.71): la tarjeta "lo de siempre" en verde (callback de s01) arriba, la
  pregunta "¿Qué te piden todas las semanas?" en Lexend grande y la caja de COMENTARIOS con un
  cursor que titila en "Contanos" (2.11); movimiento suave hasta el final.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá hay UI de chat con rojo apagado y gris, y la zona es y 590-1250).

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

