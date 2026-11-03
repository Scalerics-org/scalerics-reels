# Reel "Dos distribuidoras" — spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
línea de Juan del 02-11). Producto: **sistema a medida** (cuentas corrientes y cobranzas). Voces:
Orus narrador y Leda en una sola línea (la del kiosco: "Raúl, ¿cuánto te debo?").

Historia: dos distribuidoras de bebidas y almacén en la misma calle, que venden a crédito a
almacenes y kioscos. Las dos venden bien. A la IZQUIERDA la de Raúl: buenos precios, reparto
puntual, y las cuentas en un cuaderno y tres planillas; a fin de mes llama a sus clientes uno por
uno, la del kiosco le pregunta "¿cuánto te debo?" y él tiene que fijarse; entre llamada y llamada
alguna boleta se traspapela y esa plata se va olvidando. A la DERECHA la de Silvia: mismo
reparto y un sistema hecho a su medida, cada cliente con su saldo al día; el recordatorio le llega
solo a cada cliente con su detalle, y el vendedor ve en el celular el saldo del almacén antes de
cargar el pedido. Giro respetuoso: los dos venden igual de bien; Silvia, además de vender, cobra.
Cierre: "Etiquetá al que se pasa los fines de mes cobrando."

**Recurso visual central: la pantalla partida IZQUIERDA/DERECHA** (dos-talleres fue arriba/abajo y
dos-tiendas en secuencia). Medidas fijas:
- Divisoria vertical punteada x=540, y 630–1220 (crema 0.3). Suelo común y=1150 (x 40–1040).
- Encabezados: izquierda x=270 "RAÚL" (Lexend 600 36px, crema 0.55) y=668 + "SIN SISTEMA" (mono
  24px, crema 0.4) y=708; derecha x=810 "SILVIA" (verde) + "A SU MEDIDA" (verde 0.8).
- Depósito (coordenadas locales, origen = suelo al centro, ~410 de ancho): pared
  `M-190 0 V-200 H190 V0`, cornisa `M-206 -200 H206`, cartel `rect -140,-258 280x46` con
  "DISTRIBUIDORA" (mono 24), portón abierto `M-160 0 V-150 H20 V0` con la cortina enrollada y
  cajones apilados adentro, ventana de oficina `rect 60,-150 100x64` (vidrio verde en lo de
  Silvia) y puerta abajo. Centro x 270 / 810.
- Cuando el beat es de un solo lado, el otro queda a 0.28 (no desaparece).
Color con significado: lo de Raúl en crema apagado y SOLO en los dolores (el "?" de cuánto debe,
la boleta que se pierde, la plata que se olvida) **rojo apagado `#c0625a`**; lo de Silvia en verde
`#5ce611` (vidrios, saldos, tildes, notificación, cinta métrica de "a su medida"). Interfaz
recreada: panel de clientes con saldos, notificación con detalle, botón "Cargar pedido".
Las cifras de los saldos son de la UI de ejemplo, no estadísticas.

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).

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
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de `#c0625a` (rojo apagado, solo en dolores),
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
s01 0 · s02 6.18 · s03 9.40 · s04 17.60 · s05 25.54 · s06 28.60 · s07 35.95 · s08 41.62 ·
s09 46.62 · s10 51.57 · s11 57.34 · s12 61.40 (dura hasta 66.56; la voz termina en 63.36).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-dos-distribuidoras** (0–6.18) — Cuadro 0: el depósito de la izquierda a medio dibujar. En
"distribuidoras" (0.20) se dibuja el de la derecha, idéntico. En "calle" (1.50) la divisoria y
los encabezados. En "venden bien" (2.90–3.20) sobre cada depósito una flechita de ventas que sube
con tilde crema, "=" en el medio. En "Una" (4.12) el de Silvia se prende (vidrio verde) y el de
Raúl baja a 0.5. En "quién le debe" (4.90–5.40) sobre Silvia una tarjetita con tres filas y
saldos verdes; sobre Raúl un "?" crema apagado. Etiqueta: "MISMA CALLE" → "LAS DOS VENDEN BIEN"
→ "UNA SABE QUIÉN LE DEBE".

**s02-diferencia** (6.18–9.40) — Tabla de la serie, columnas x 270 / 810, filas y 820 / 970 /
1110. "rubro" (0.22): cajón de bebidas = cajón; "calle" (1.12): cartel de calle = cartel;
"diferencia" (2.00–2.52): a la izquierda un cuaderno con "?" rojo apagado, a la derecha un
celular con saldo y tilde verde, "≠" verde con punch. Etiqueta: "DOS NEGOCIOS" → "UNA DIFERENCIA".

**s03-raul** (9.40–17.60) — Lado de Raúl (derecha 0.28). En "izquierda" (0.70) punch del depósito
(escala 0.8, centro x 230); en "Raúl" (1.60) se dibuja Raúl (x 455). "buenos precios" (2.35):
etiqueta de precio "$" con tilde crema arriba; "reparto puntual" (3.00–3.70): camioneta y reloj
con tilde. En "cuentas" (4.70) todo baja a 0.15 y pop de un cuaderno grande (espiral, renglones
que se escriben en "almacén" 5.40); en "cuaderno" (6.20) punch; en "tres planillas" (6.90–7.20)
tres planillas con grilla que caen encima, abanicadas. Etiqueta: "BUEN PRECIO" → "REPARTO
PUNTUAL" → "CUADERNO · 3 PLANILLAS".

**s04-silvia** (17.60–25.54) — Lado de Silvia (izquierda 0.28). En "derecha" (0.40) punch; en
"Silvia" (1.30) se dibuja Silvia; "mismo reparto" (1.91–2.30): la misma camioneta y reloj. En
"sistema" (3.20) el depósito baja y pop de un panel "CLIENTES" (x 580–1020, y 760–1130); en "a su
medida" (3.50–4.30) una cinta métrica verde se dibuja sobre el borde del panel; en "cada cliente"
(5.20–5.60) entran tres filas (Almacén Rosa, Kiosco Mari, Súper del Sol); en "saldo" (6.50) los
saldos en verde; en "al día" (7.00) chip "AL DÍA" con tilde. Etiqueta: "MISMO REPARTO" → "HECHO A
SU MEDIDA" → "SALDO AL DÍA".

**s05-fin-de-mes** (25.54–28.60) — Lado de Raúl. "Fin de mes" (0): almanaque con "30"; "Raúl"
(0.91) Raúl con el teléfono en la oreja; "llama a sus clientes" (1.36–1.66) lista de tres
contactos con tubito; "uno por uno" (2.39–2.86) cada fila se marca "llamando..." en orden.
Etiqueta: "FIN DE MES" → "UNO POR UNO".

**s06-cuanto-debo** (28.60–35.95) — Lado de Raúl. "kiosco" (1.00) kiosco chico arriba a la
izquierda con la kiosquera y una línea punteada de llamada hasta Raúl; "Raúl," (2.39) globo desde
el kiosco "Raúl, ¿cuánto te debo?" (crema, el "?" en rojo apagado); "Y él" (4.48) el kiosco baja;
"dejame que me fijo" (5.19–5.80) el cuaderno con hojas que pasan y un "?" rojo apagado; "te
llamo" (6.20) globito chico de Raúl "Te llamo...". Etiqueta: "¿CUÁNTO TE DEBO?" → "DEJAME QUE ME
FIJO".

**s07-se-olvida** (35.95–41.62) — Lado de Raúl. "Entre llamada y llamada" (0–0.65) dos tubitos que
suenan; "boleta" (1.75) pila de tres boletas; "traspapela" (2.25) la de arriba se desliza, cae
girando y queda un contorno punteado rojo apagado; "plata" (3.55) un billete "$"; "va olvidando"
(4.35–4.75) el billete se vuelve punteado y se desvanece subiendo. Etiqueta: "SE TRASPAPELA" →
"SE VA OLVIDANDO".

**s08-recordatorio** (41.62–46.62) — Lado de Silvia (izquierda 0.28). Celular del cliente (x
650–970, y 740–1210). "recordatorio" (0.98) baja la notificación "DISTRIBUIDORA SILVIA"; "llega
solo" (1.68–1.98) "Hola, Rosa. Tu resumen del mes:" + chip "AUTOMÁTICO"; "cada cliente" (2.48)
dos celulares fantasma detrás (a todos); "detalle" (3.88) las filas del detalle y el saldo en
verde. Etiqueta: "SALE SOLO" → "CON SU DETALLE".

**s09-vendedor** (46.62–51.57) — Lado de Silvia. "cargar un pedido" (0.38–0.78) camioneta con
cajones; "vendedor" (1.78) se dibuja el vendedor; "celular" (2.38) pop de la ficha del celular
"ALMACÉN ROSA"; "saldo" (3.08) la fila del saldo en verde; "almacén" (3.68) botón "Cargar pedido"
se llena de verde con tilde. Etiqueta: "ANTES DE CARGAR" → "VE EL SALDO".

**s10-cobra** (51.57–57.34) — El giro. Los dos de cuerpo entero, cada uno en su mitad. "venden
igual de bien" (0.73–1.73) chip "VENDE" con tilde crema en los dos y "="; "diferencia" (2.53) la
derecha se prende, la izquierda baja; "cobra" (4.91) chip "COBRA" con tilde verde en Silvia y,
del lado de Raúl, el mismo chip punteado rojo apagado con "?". Etiqueta: "IGUAL DE BIEN" →
"VENDE Y COBRA".

**s11-scalerics** (57.34–61.40) — Pantalla completa. "Scalerics" (0.56) pop de un panel grande
"TU SISTEMA"; "sistemas" (1.39) cuatro módulos (CLIENTES, SALDOS, AVISOS, PEDIDOS); "a la medida"
(2.46) cinta métrica verde sobre el panel; "tu negocio" (2.96) tildes en los módulos. Etiqueta:
"SCALERICS" → "A LA MEDIDA DE TU NEGOCIO".

**s12-cta** (61.40–66.56) — "Etiquetá al que se pasa los fines de mes cobrando." Globo de
comentario grande con "@" verde y puntitos que se escriben; abajo el almanaque "30" y un teléfono
que suena (los dos del lado de Raúl, en crema) que se calman con una tilde verde al final.
Etiqueta: "ETIQUETALO" → "AL QUE COBRA A FIN DE MES".
