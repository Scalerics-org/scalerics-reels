# El divorcio · CRM · mediación de divorcio entre el dueño y su vendedor estrella

**De qué trata.** Comedia de mediación de divorcio. El dueño (Charon, dolido) y su vendedor
estrella (Fenrir, canchero) se separan; la mediadora (Kore, seca, por arriba de los lentes) reparte
los bienes. Abre ella, a cámara: "Tu vendedor estrella se va. Y se lleva a tus clientes en el
bolsillo." La heladera: "queda en el local" / "toda tuya". La silla giratoria: "del local, me
mareaba". ¿Los clientes? "Ah, no. Esos quedan conmigo": están en su WhatsApp, en su cabeza y en sus
post-its; él sabe a quién le prometió presupuesto, quién compra cada mes y quién está por volver.
"¿Usted tiene algún papel que diga que los clientes son suyos?" "¿Un cuaderno?" "Que está en mi
mochila." Sentencia: custodia de los clientes para el vendedor; el dueño los puede saludar en la
feria, los domingos. "¡Pero si el negocio es mío!" GIRO (Orus): el negocio es tuyo, pero los
clientes son del negocio cuando su historia queda en el negocio: con un CRM sabés quiénes son, qué
te compraron y a quién volver a escribirle; el seguimiento de cada venta en un solo lugar, aunque
alguien se vaya. En Scalerics lo armamos a la medida de cómo vendés. Remate: "Che, ¿y la heladera
me la puedo llevar?" "No." Cierre: "Etiquetá a tu vendedor estrella. Que vaya sabiendo."

**Formato:** P (cultura popular: mediación de divorcio de comedia). Producto: CRM.
**Recurso visual central:** la sala de mediación: mesa larga gris piedra, carpetas, la foto de
"EL EQUIPO" que se rompe a la mitad, la pizarra "REPARTO DE BIENES" con columnas LO TUYO / LO MÍO,
sellos de goma (DEL LOCAL, LO MÍO, PARA EL VENDEDOR, NO, NOTIFICADO) que caen con martillo. Los
clientes del vendedor son muñequitos que asoman de su bolsillo; sus post-its (Elena, Raúl, Gabi)
vuelven como fichas del CRM.

## Paleta (manda sobre SPEC-base)
- Gris piedra oscuro de fondo `#161819` → `#24282a` → `#33383a` (armar.mjs, con brillo menta suave).
- Gris piedra `#8a8f8c` (claro `#c9ccc7`, oscuro `#4b5052`): mesa, cárdigan del dueño, archivero.
- Verde menta `#7fd8b4` (oscuro `#4fae8a`): blazer de la mediadora, LO TUYO, toldos, todo lo de Scalerics.
- Coral `#ff6f59`: camisa del vendedor, LO MÍO, sellos, mochila, acento de subtítulos.
- Blanco `#f5f4ef`: papeles, heladera, textos claros.
- Negro tinta `#141515`: contornos de 5 px. Pieles `#e3b08a` / `#d9a77c` / `#c48a5e`.
Ilustración plana con relleno y contorno negro (nada de líneas crema ni madera).

## Tipografía
- Subtítulos: Lexend 600, 52 px, blanco `#f5f4ef`, acento coral `#ff6f59`.
- Expedientes, sellos, etiqueta y rótulo: Special Elite (máquina de escribir de oficina pública).
- Lo manuscrito (post-its, cuaderno, "Mi vendedor estrella"): Caveat 700.
- Interfaces (chat, CRM, etiqueta @): Lexend.
- Etiqueta debajo del dibujo: Special Elite 36 px, mayúsculas, 0.14em, top 1372, coral; menta desde s10.

## Ambiente (`compositions/ambiente.html`)
Tubo fluorescente de oficina arriba que parpadea (6.2, 19.8, 28.4, 33.1), grano, viñeta, golpes de
luz coral en el borde en los momentos de drama (se va 1.67, conmigo 16.86, para el vendedor 36.53,
mío 42.45, No 63.46). Desde "El negocio es tuyo" (43.44) luz menta pareja y el rótulo de abajo pasa
de "SALA DE MEDIACIÓN · DUEÑO C/ VENDEDOR" a "LOS CLIENTES, EN EL NEGOCIO".

## Sonido
`martillo` (sellos), `golpe`, `drama`, `uuh` (sentencia), `campanita` (feria), `notification`,
`typing`, `key-press`, `pop`, `chime`, `sparkle`, `tic`.

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh → tiempos.mjs por parte → componer.mjs (atempo
1.0-1.15 y silencios de 0.3-0.8 s). Mediadora Kore (01, 02, 05, 07, 11, 14, 20), dueño Charon (03,
09, 12, 15), vendedor Fenrir (04, 06, 08, 10, 13, 19), Orus (16, 17, 18, 21). La 13 se regeneró
("mochila" sonaba "motiva"); a la 19 se le pusieron a mano los tiempos de "Che, ¿y".

## Personajes (siempre iguales)
- **Mediadora:** blazer menta, blusa blanca, pelo gris en rodete, lentes rectangulares en la punta
  de la nariz (los ojos miran por arriba), boca recta.
- **Dueño:** pelado con pelo gris a los costados, bigote gris, cárdigan gris piedra, cejas tristes.
- **Vendedor:** jopo negro, lentes de sol en la cabeza, camisa coral abierta con bolsillo, sonrisa
  torcida y una ceja levantada.
- **Clientes:** muñequitos de colores (coral, menta, gris).
Las escenas se generaron con piezas compartidas (mismas funciones de dibujo para cada personaje).

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

### s01-gancho (0-4.75) · el gancho
Sala de mediación: foto "EL EQUIPO" en la pared, dueño / mediadora / vendedor detrás de la mesa
con carpetas. "vendedor" 0.37: salta; "estrella" 0.74: estrella coral. "va" 1.67: la foto se parte
y la mitad del vendedor se cae (golpe + drama). "clientes" 2.96: zoom al bolsillo del vendedor y
asoman tres clientes; "bolsillo" 3.52: palmadita y guiño. Etiqueta: EXPEDIENTE · DUEÑO C/ VENDEDOR →
EN DISPUTA: LOS CLIENTES.

### s02-heladera (0-5.19) · reparto de bienes
Pizarra REPARTO DE BIENES con LO TUYO (menta) / LO MÍO (coral). "heladera" 1.63: cae la heladera;
"queda" 2.65: pasa a LO TUYO; "local" 3.41: tilde menta y DEL LOCAL; "toda tuya" 4.13: el vendedor
(abajo a la derecha) hace un gesto generoso.

### s03-silla (0-3.89) · la silla giratoria
La silla gira en "giratoria" 0.55 con arcos coral; sello DEL LOCAL en 1.76; "me mareaba": espiral y
puntitos que orbitan, la silla se bambolea.

### s04-clientes (0-5.58) · ¿y los clientes?
Tres planos cortos: la mediadora levanta la vista por arriba de los lentes con la tarjeta LOS
CLIENTES; el vendedor mueve el dedo ("Ah, no") y cae el sello LO MÍO en "conmigo" 3.03; el dueño en
shock (boca abierta, gota, líneas) en "¿Cómo que con vos?" 4.15.

### s05-bolsillo (0-7.55) · las pruebas del vendedor
Celular con chats (Elena, Raúl, Gabi, Sra. Marta) en "WhatsApp" 0.45; cabeza del vendedor con el
dedo en la sien en "cabeza" 1.27; tres post-its en "post-its" 2.0, que se escriben: "Elena:
presupuesto (el lunes)" en "presupuesto", "Raúl: compra cada mes" en "compra", "Gabi: está por
volver" en "quién está por volver".

### s06-papel (0-3.99) · ¿tiene algún papel?
La mediadora mira por arriba de los lentes; "papel" 1.07: el TÍTULO DE PROPIEDAD en blanco; la línea
"Clientes de:" titila en coral en "clientes"; "?" coral en el sello vacío en "suyos" 2.94.

### s07-cuaderno (0-3.53) · ¿un cuaderno?
El dueño muestra un cuaderno espiral "Clientes"; "que está en mi mochila" 1.55: el cuaderno vuela a
la mochila coral del vendedor, que se cierra (1.92).

### s08-custodia (0-6.90) · la sentencia
Expediente CUSTODIA DE LOS CLIENTES; sello PARA EL VENDEDOR en "vendedor" 2.05 (martillo, uuh).
"Usted" 3.19: corte a la feria: puesto con toldo menta, el vendedor detrás, los clientes delante y el
dueño lejos saludando en "saludar" 3.93; cartel FERIA en 4.55; calendario DOM en "domingos" 5.71.

### s09-mio (0-2.06) · ¡pero si el negocio es mío!
El dueño con los brazos arriba, rayos coral girando atrás, lágrimas y temblor en "mío" 1.07.

### s10-giro (0-6.20) · el giro (Orus)
Luz menta. Local "TU NEGOCIO" con toldo; el dueño sonriendo en la puerta con tilde en "tuyo" 1.0;
los clientes entran en "clientes"; "historia" 4.02: tres fichas vuelan al archivero CLIENTES de la
vidriera, que se cierra en "queda" 4.75; marco menta en "negocio" 5.18.

### s11-crm (0-7.94) · el CRM
Monitor con la lista de clientes: nombres en "quiénes" 1.04, qué compraron en "compraron" 2.0,
badges "Escribirle" en "escribirle" 3.39; "seguimiento" 4.35: Consulta → Presupuesto → Venta con un
punto que llega en "venta" 5.13; marco menta en "un solo lugar"; "aunque alguien se vaya": el
vendedor chiquito se va por la derecha y cae el sello TODO SIGUE ACÁ (7.13).

### s12-scalerics (0-3.81) · a medida
Monitor "TU NEGOCIO · CRM"; en "medida" 1.54 se despliega la cinta métrica coral "A MEDIDA"; en
"vendés vos" 2.36 el dueño sonriente con el pulgar arriba.

### s13-heladera (0-3.01) · el remate
El vendedor vuelve abrazado a la heladera ("¿me la puedo llevar?"); sello gigante NO en 2.07 y se va.

### s14-cta (0-6.13) · CTA
Polaroid "Mi vendedor estrella" con estrella, burbuja de etiqueta "@tu_vendedor_estrella" en
"Etiquetá"; sello NOTIFICADO en "sabiendo" 1.98. Después se mueve suave hasta el final (estrella,
burbuja que flota, guiño).
