# Reel "Un precio" · spec

Reel vertical 1080x1920 de Scalerics sobre **automatizaciones (precios en todos lados)**, formato
motion persuasivo **"Convergencia"** (línea de Juan del 02-11). Público: dueños y encargados de
pymes. Tono adulto, de colega, humor inteligente; el dueño queda bien parado ("cambiaste cinco de
seis: el tema es que eran seis"). Gancho: "Cambió un precio. ¿En cuántos lugares lo tenés que
cambiar?" Un bazar de barrio recibe la lista nueva del proveedor: el detergente de 5 L pasa de
$ 289 a $ 319 (precios de ejemplo). Se cuentan en pantalla los seis lugares donde vive ese precio
(pizarra del mostrador, planilla, tienda online, catálogo de WhatsApp, lista impresa del vendedor,
etiqueta de la góndola), la lista trae cuarenta cambios, se cambian cinco de seis y queda uno
viejo: la página. La clienta (voz Leda, una frase): "Disculpá, en la página decía 289." Giro: le
pasa a toda pyme que vende por más de un lado. Solución: los seis lugares se juntan en una sola
lista de precios; cambiás el 319 una vez y una automatización lo lleva sola a la tienda, el
catálogo y la planilla, el vendedor lo ve en el celular y salen las etiquetas nuevas para imprimir
(solo las que cambiaron). Cierre: "¿En cuántos lugares tenés tus precios hoy? Contalos y dejalo en
los comentarios." Voces: Orus (narrador, acelerado 1.08x) + Leda (clienta). Locución 62.9 s,
total 66.1 s.

En qué se distingue de `se-juntan` (la otra convergencia): acá no hay objetos sueltos que vuelan,
hay **una GRILLA de seis lugares que se cuenta en voz alta** (badge con número 1-6 en cada celda,
la etiqueta mono hace de contador "1 lugar · 2 lugares..."), un **contador "1 → 40 cambios"**, y la
convergencia es de ida y vuelta: los seis se juntan en la lista de precios (s08) y el precio
**sale** del panel por líneas verdes hacia cada lugar (s09-s12).

Recurso visual central: **el precio** como texto grande Lexend 600: `$ 289` viejo en crema apagado
(0.45) con un puntito rojo apagado `#c0564b` de "pendiente"; `$ 319` cambiado a mano en crema pleno
con tilde crema; `$ 319` puesto por la automatización en **verde de marca** con tilde verde.
Color con significado: gris/rojo apagado = viejo o pendiente; verde = resuelto solo.

Paleta (manda sobre SPEC-base): navy del fondo (index), crema `#efeee5`, verde `#5ce611`, blanco
`#ffffff` (solo "Scalerics" en el CTA), rojo apagado `#c0564b` (solo puntitos, anillos y el "≠";
nunca relleno grande). Lexend + IBM Plex Mono.

Íconos compartidos (coordenadas locales, centro 0,0, caja ~240x170; los arma el generador igual en
todas las escenas):
- PIZARRA: marco rx10 + marco interior fino + dos garabatos de tiza.
- PLANILLA: rect rx10, fila de encabezado y grilla 3x3.
- TIENDA ONLINE (la página): ventana de navegador con tres puntitos, foto del producto y botón.
- CATÁLOGO DE WHATSAPP: celular 124x200 rx20 con tarjeta de producto y un globo. Sin logo.
- LISTA IMPRESA: tabla con clip y renglones.
- GÓNDOLA: estante con dos bidones chicos y la etiqueta colgando adelante.
- BIDÓN de detergente: cuerpo redondeado, tapa, manija lateral y etiqueta "5 L".
- ETIQUETA COLGANTE (la del gancho): etiqueta con punta, agujero e hilo.
Grilla (s04, s05): 2 columnas x 3 filas, centros x 300/780, y 690/890/1090, celdas 450x190 con
marco fino tenue; ícono a la izquierda (escala 0.6) con su nombre mono abajo, precio a la derecha,
badge con el número arriba a la izquierda.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 66.1 (la voz termina en 62.9).
`palabras.json` corregido a mano en "Tres/Cuatro/Cinco/Seis/Y" con los silencios (silencedetect).

## Escenas (palabras clave en segundos relativos)

**s01-precio** (0–3.11) "Cambió un precio. ¿En cuántos lugares lo tenés que cambiar?"
Etiqueta colgante grande al centro (y ~890), ya a medio dibujar en el cuadro 0, con `$ 289`.
"precio" 0.40: línea roja apagada tacha el 289; 0.65 el 289 sale hacia arriba y entra `$ 319`
crema. "cuántos" 1.10: seis etiquetas chiquitas apagadas con "?" aparecen alrededor (una por
lugar). "cambiar" 2.10: se hamacan todas. Etiqueta: "Cambió un precio" → "¿En cuántos lugares?".

**s02-bazar** (3.11–6.00) "Un bazar de barrio. Llega la lista nueva del proveedor."
Fachada del bazar (cartel BAZAR, toldo con ondas, vidriera con bidón, balde y escoba, puerta) se
dibuja desde 0. "Llega" 1.18: el local se achica a la izquierda y entra desde la derecha la hoja
"LISTA DE PRECIOS · Proveedor", torcida, con renglones; "proveedor" 2.09: sello mono "NUEVA".
Etiqueta: "Un bazar de barrio" → "Lista nueva".

**s03-detergente** (6.00–10.23) "El detergente de cinco litros pasa de 289 a 319."
Bidón grande a la izquierda; "cinco" 0.60 aparece "5 L" en su etiqueta. "pasa" 1.20 se dibuja la
etiqueta colgante a la derecha; "289" 1.60 `$ 289`; "319" 2.70: el 289 se tacha y baja chico y
apagado ("antes"), entra `$ 319` crema grande, la etiqueta se hamaca. Etiqueta: "Detergente 5 L" →
"Precio nuevo".

**s04-cuenta** (10.23–20.88) "Uno: la pizarra del mostrador. Dos: la planilla. Tres: la tienda online. Cuatro: el catálogo de WhatsApp. Cinco: la lista impresa del vendedor. Seis: la etiqueta de la góndola."
La grilla se arma celda por celda: badge con el número EN el número (0.00, 1.81, 3.25, 4.79, 6.61,
8.70), ícono y marco EN el nombre (pizarra 0.47, planilla 2.27, tienda 3.77, catálogo 5.27, lista
7.17, etiqueta 9.17), y `$ 289` apagado con puntito rojo (pendiente). La etiqueta mono cuenta:
"1 lugar" → "2 lugares" → ... → "6 lugares".

**s05-cuarenta** (20.88–25.10) "Y la lista no trae un cambio: trae cuarenta. Siempre queda uno viejo."
Grilla completa quieta; 0.10 se apaga y aparece encima una tarjeta navy con "1 cambio"; "cuarenta"
1.72: el número rueda de 1 a 40. "Siempre" 2.57: la tarjeta se va y las celdas cambian a `$ 319`
crema con tilde crema una por una, MENOS la 3 (tienda online), que queda en `$ 289` con el puntito
rojo latiendo y un anillo rojo apagado en "viejo" 3.22. Etiqueta: "40 cambios" → "Queda uno viejo".

**s06-clienta** (25.10–28.91) "Disculpá, en la página decía 289." (voz Leda)
Mostrador de líneas; la clienta (cabeza, pelo, hombros) a la izquierda detrás del mostrador; a la
derecha el bidón con su etiqueta `$ 319`. "página" 1.30: la clienta levanta el celular con la
página; "289" 2.20: `$ 289` en la pantalla con anillo rojo apagado y un "≠" rojo apagado entre las
dos. Etiqueta: "En el mostrador" → "La página, vieja".

**s07-cinco-de-seis** (28.91–34.29) "Le pasa a toda pyme que vende por más de un lado. Cambiaste cinco de seis. El tema es que eran seis."
0–2.3: tres locales chicos (BAZAR, FERRETERÍA, LIBRERÍA) se dibujan en fila; "más de un lado" 1.59:
de cada uno salen tres ramitas a puntitos (sus canales). "Cambiaste" 2.45: se van y aparece arriba
"5 de 6" grande y abajo los seis íconos chicos (3x2) con tilde crema en cinco, que se tildan en
"cinco" 2.79; la tienda online con puntito rojo; "eran seis" 4.39: anillo rojo apagado sobre la
sexta y el "6" del texto late. Etiqueta: "Le pasa a todas" → "Cinco de seis".

**s08-juntan** (34.29–40.55) EL MOMENTO CENTRAL. "Ahora, la misma lista con una automatización. Los seis lugares se juntan en uno: tu lista de precios."
Los seis íconos apagados en un anillo (hexágono, centro 540,905). "automatización" 1.61: en el
centro aparece el símbolo verde de dos flechas en círculo que gira. "Los seis" 2.79: líneas
punteadas de cada ícono al centro. "juntan" 3.81: los seis vuelan al centro (power3.in), se
achican y se funden; anillo verde que se expande; se dibuja el panel (760x480) "Lista de precios"
(4.36) con cuatro filas: Detergente 5 L $ 289, Lavandina 2 L $ 95, Esponja x 3 $ 60, Escoba
$ 210. Etiqueta: "Ahora" → "Seis lugares" → "Uno solo".

**s09-una-vez** (40.55–46.10) "Cambiás el 319 una sola vez. Y sale solo a la tienda, al catálogo y a la planilla."
Panel compacto arriba (y 610–810) con la fila del detergente; "319" 0.45: un cursor llega, el 289
sale y se escribe `$ 319` en verde. "una sola vez" 1.05–1.85: píldora verde "UNA SOLA VEZ". "sale"
2.55: tres líneas verdes bajan del panel a tres íconos (tienda, catálogo, planilla) con un punto
verde que viaja; cada ícono se dibuja y recibe `$ 319` verde con tilde en su palabra (tienda 3.15,
catálogo 3.85, planilla 4.65). Etiqueta: "Un solo cambio" → "Sale solo".

**s10-vendedor** (46.10–51.63) "El vendedor lo ve en su celular. Las etiquetas nuevas salen listas para imprimir: solo las que cambiaron."
Izquierda: celular del vendedor con la lista; "ve" 0.60 la fila del detergente se ilumina con
`$ 319` verde y tilde en "celular" 0.90. Derecha: impresora de líneas; "salen" 2.40 sale la hoja
con tres etiquetas ($ 319, $ 99, $ 64); "solo las que cambiaron" 4.18-4.60: tilde verde en cada
una. Etiqueta: "El vendedor" → "Etiquetas nuevas" → "Solo las que cambiaron".

**s11-iguales** (51.63–55.77) "La próxima clienta ve 319 en la página y en la góndola."
Izquierda la página (tienda online) grande, derecha la góndola grande; "319" 1.27: `$ 319` verde
debajo de cada una; "página" 2.47 tilde verde en la página; "y" 2.77 un "=" verde grande al medio;
"góndola" 3.17 tilde verde en la góndola. Etiqueta: "La próxima clienta" → "El mismo precio".

**s12-cta** (55.77–66.10) "En Scalerics hacemos estas automatizaciones para pymes. ¿En cuántos lugares tenés tus precios hoy? Contalos y dejalo en los comentarios."
0–3.3: "Scalerics" en blanco arriba; abajo los seis íconos chicos en anillo, todos con tilde verde y
unidos al panel "PRECIOS" del centro por líneas verdes. "¿En" 3.36: se va y aparece la pregunta
"¿En cuántos lugares / tenés tus precios hoy?"; "Contalos" 4.93: seis fichas 1-6 aparecen de a
una y se van poniendo verdes (contando); "dejalo" 6.13: píldora crema "Dejalo en los comentarios";
6.6 "Scalerics" blanco chico abajo. Sin salida: el último cuadro queda legible.
- Escenas: generadas con `generar-escenas.mjs` (íconos y helpers comunes); después de editarlo, `node generar-escenas.mjs && node armar.mjs`.
