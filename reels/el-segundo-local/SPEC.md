# Reel "El segundo local" · spec

Reel vertical 1080x1920 de Scalerics sobre **sistemas a medida para varios locales**, formato
motion persuasivo **"caos → control"** (línea de Juan del 02-11). Una sola voz: Orus (58.1 s;
total 61.3 s). 177 palabras.

Historia: Claudia tiene una casa de repuestos en la Unión; le va tan bien que abre otra en el
Prado. Desde ese día vive en el medio: un mecánico pide pastillas de freno y hay que llamar al
otro local (no atiende nadie), la caja se cierra a mano dos veces, el lunes llegan dos cajas de
filtros porque los pidieron los dos locales. El camino entre los dos se vuelve un garabato. Giro
respetuoso: abrir el segundo estuvo bien; lo que no se multiplica es Claudia. Con un sistema hecho
a su medida: los dos locales en un panel en el celular, el stock pasa del Prado a la Unión con un
toque, cada caja cierra sola, un solo pedido al proveedor. El camino vuelve a ser una línea.
Cierre para comentar: "¿Cuántos locales tenés? ¿Y cuántos querés tener? Te leemos."

## Recurso visual central: el plano de la ciudad
- **El plano** (s01, s02, s06, s11): calles finas crema (opacity 0.2, trazo 2.5) en grilla
  x 120–960 / y 650–1190, una avenida en diagonal (más gruesa), un arroyo punteado y un parque
  chico al lado del Prado. Se dibuja solo.
- **Dos pines** iguales con número (1 = Unión en (300, 1080), 2 = Prado en (780, 780)) y etiqueta
  mono a la derecha ("LOCAL 1/2" en el gancho, "UNIÓN/PRADO" después).
- **El trayecto** por las calles `M300 1080 H420 V880 H660 V780 H780`: en el caos, punteado crema
  que corre (ida y vuelta, con Claudia como avatar o un ómnibus); en s06 se vuelve un
  **garabato** de idas y vueltas que se pone rojo apagado; en s11 el garabato se borra y la ruta
  se dibuja limpia en VERDE, los pines se ponen verdes y el ómnibus la recorre parejo.
- **Color con significado**: el caos en crema apagado y rojo apagado `#c0625a` ("¿?", "Sin
  respuesta", "x2", el garabato, el "0" de stock); lo resuelto en verde `#5ce611` (panel, tildes,
  "1 pedido", la línea limpia, los pines 3 y 4 punteados del cierre).
- Personajes de líneas: Claudia (pelo carré, buzo con escote en V) y un mecánico (gorra con
  visera, mameluco con bolsillo). Claudia siempre queda bien parada: el problema es estar en dos
  lados, no ella.

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).
Las escenas se generaron con un script (piezas comunes: plano, pin, Claudia, ómnibus, garabato,
teléfono) pero cada `compositions/sXX.html` es autocontenido y se puede editar a mano.

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


## Inicios globales
s01 0 · s02 5.23 · s03 12.46 · s04 18.04 · s05 22.16 · s06 26.16 · s07 28.88 · s08 33.67 ·
s09 36.94 · s10 44.03 · s11 48.55 · s12 54.59 (dura hasta 61.29; la voz termina en 58.09).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-gancho** (0–5.23) — "Abrir el segundo local es fácil. Lo difícil es estar en los dos a la
vez." Cuadro 0: el plano a medio dibujar y el pin 1 "LOCAL 1". En "segundo" cae el pin 2 "LOCAL
2"; en "fácil" un tilde verde arriba del pin 2. En "difícil" aparece el trayecto punteado y
Claudia (avatar redondo) va y vuelve cada vez más rápido; en "a la vez" Claudia aparece en los dos
pines a la vez, temblando, y un "¿?" rojo apagado. Etiqueta: "LOCAL 2: ABIERTO" → "ESTAR EN LOS
DOS" → "¿A LA VEZ?".

**s02-claudia** (5.23–12.46) — Claudia (x 280) y su local "REPUESTOS" (estantes con engranaje,
bujía, filtro, cubierta) que se llenan en "repuestos"; en "Unión" pin 1 "UNIÓN" sobre el cartel;
en "bien" flecha verde que sube y Claudia levanta el brazo. En "abre otra" todo se achica y entra
el plano; pin 1 "UNIÓN", en "Prado" pin 2 "PRADO". En "Ahora" el trayecto punteado y un ómnibus
que sale de la Unión y se queda yendo y viniendo; en "Claudia" su avatar en el medio, que salta
en "vive". Etiqueta: "REPUESTOS · UNIÓN" → "LOCAL 2 · PRADO" → "VIVE EN EL MEDIO".

**s03-pastillas** (12.46–18.04) — Mecánico (x 230), mostrador, Claudia (x 830). En "pastillas"
globo con una pastilla de freno verde y "Pastillas de freno"; en "¿Quedan...?" globo de
pensamiento de Claudia "¿Quedan en el otro local?". En "Llama" levanta el celular y salen ondas;
en "No atiende" el celular se pone rojo apagado, tiembla y sale "Sin respuesta"; el mecánico
espera ("..."). Etiqueta: "PASTILLAS DE FRENO" → "¿EN EL OTRO LOCAL?" → "NADIE ATIENDE".

**s04-caja** (18.04–22.16) — Luna en "noche". Cuaderno "CAJA · UNIÓN" (anillado); en "a mano" un
lápiz escribe las filas y el total. En "después en el otro" entra el cuaderno "CAJA · PRADO", el
primero se apaga y el lápiz vuelve a escribir. Etiqueta: "A LA NOCHE" → "CAJA A MANO" → "Y OTRA
VEZ".

**s05-filtros** (22.16–26.16) — Hoja de calendario "Lunes". En "dos" y "cajas" caen dos cajas
"FILTROS" iguales con rebote; en "filtros" un "x2" rojo apagado entre ellas. En "los dos locales"
sobre cada caja cae su pin (1 y 2). Etiqueta: "LUNES" → "DOS CAJAS IGUALES" → "PEDIDO DOBLE".

**s06-garabato** (26.16–28.88) — El plano con los dos pines; el trayecto se dibuja como garabato
de idas y vueltas; en "garabato" se pone rojo apagado, tiembla y los pines se apagan. Etiqueta:
"IDA Y VUELTA" → "UN GARABATO".

**s07-giro** (28.88–33.67) — Dos pines grandes (UNIÓN, PRADO) y una lupa que va al segundo; flecha
verde de crecimiento en "abrir"; en "bien" el pin 2 se pone verde con tilde y "Bien hecho". En
"Lo que no se multiplica" entra Claudia y en "multiplica" salen dos copias punteadas a los lados;
en "Claudia" las copias se tachan con X rojo apagado y se van, ella abre los brazos, gotita, "Hay
una sola". Etiqueta: "CRECER" → "BIEN HECHO" → "CLAUDIA HAY UNA SOLA".

**s08-medida** (33.67–36.94) — Calendario "Mes · el mismo" que late en "mes" y se va; en "sistema"
se dibuja el celular (x 330–750, y 600–1240); en "hecho a su medida" una cinta métrica verde lo
mide de costado y por abajo, "Hecho a / su medida" en verde. Etiqueta: "EL MISMO MES" → "SISTEMA A
MEDIDA".

**s09-panel** (36.94–44.03) — El mismo celular con "MIS LOCALES" y dos tarjetas UNIÓN / PRADO
(abierto, curvita verde) en "dos locales"; en "panel" laten, en "celular" el marco titila verde.
En "¿Pastillas...?" la búsqueda "Pastillas de freno"; en "Quedan seis" filas Unión 0 (rojo
apagado) y Prado 6 (verde). En "Pasan" el botón "Pasar 2 a Unión"; un dedo lo toca en "toque", el
botón se llena de verde ("Listo: en camino"), una ficha "2" viaja de Prado a Unión y los números
quedan 2 y 4. Etiqueta: "LOS DOS LOCALES" → "STOCK DE LOS DOS" → "PASA CON UN TOQUE".

**s10-caja-sola** (44.03–48.55) — Dos tickets "CAJA · UNIÓN" y "CAJA · PRADO" que se imprimen; en
"sola" tilde verde "Cerrada" en cada uno. En "un solo pedido" dos líneas punteadas bajan y se
juntan en "1 pedido" (verde); en "proveedor" flecha verde a un camión "PROVEEDOR"; en "los dos"
laten los dos tickets. Etiqueta: "CAJA AUTOMÁTICA" → "UN SOLO PEDIDO".

**s11-linea** (48.55–54.59) — El plano con el garabato rojo que se borra; en "vuelve" se dibuja la
ruta limpia en verde; en "línea" los pines se ponen verdes y el ómnibus la recorre parejo. En
"Scalerics" el plano se achica abajo y entra "Scalerics" grande con "Sistemas a medida" en verde;
en "pymes que crecen" cae un pin 3 punteado verde. Etiqueta: "UNA LÍNEA" → "PARA PYMES QUE
CRECEN".

**s12-cta** (54.59–61.29) — "¿Cuántos locales tenés? ¿Y cuántos querés tener? Te leemos." Fila de
pines sobre una línea: 1, en "locales" el 2; en "cuántos" un "+" verde y en "querés" / "tener" los
pines 3 y 4 punteados verdes. En "Te leemos" una caja de comentario "Tengo ... y quiero ..." con
cursor verde que titila y botón de enviar que late; abajo "Te leemos". Etiqueta: "¿CUÁNTOS
TENÉS?" → "¿CUÁNTOS QUERÉS?" → "EN LOS COMENTARIOS".
