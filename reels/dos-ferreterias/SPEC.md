# Reel "Dos ferreterías": spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
punto 6 de CLAUDE.md), con la fuerza visual del punto 7 y los subtítulos del formato estrella
(arriba al centro, 1 a 3 palabras, recuadro verde; rojo apagado para lo que está mal).
Producto: **CRM** (cada presupuesto anotado y con su seguimiento, en un solo lugar). Una sola voz:
Orus (acelerada a 1.07 con ffmpeg atempo, silencio inicial recortado). Voz 31.1 s; total 34.3 s.
92 palabras. Tiempos de "El", "A", "A" y "Ese" corregidos a mano contra los silencios.

Historia: gancho "Dos ferreterías en la misma cuadra. Las dos mandaron el presupuesto. Una sola lo
siguió." Martín reforma el baño; el lunes pide presupuesto en El Tornillo y en La Tuerca
(inventadas). A la izquierda (El Tornillo) el presupuesto queda en el chat, tapado por las demás
conversaciones, y en la cabeza del dueño. A la derecha (La Tuerca) el CRM lo anota, el miércoles le
avisa al vendedor y le escriben "Martín, ¿pudiste verlo? Te lo guardamos hasta el viernes". Martín
compra en la segunda. GIRO: las dos tenían buen precio; una sola volvió a escribir. "Ese CRM lo
armamos a tu medida." Cierre: videollamada gratis en scalerics.com. Sin cifras. Las dos contestan
bien: no es "el que no contesta", es el seguimiento del presupuesto. El dueño de la izquierda no
queda mal: tiene buen precio, solo que lo lleva en la memoria.

Distinto de `dos-gimnasios` (CRM de frecuencia de socios): acá es el presupuesto que nadie sigue.

## Recurso visual central
- **Fondo CREMA `#efeee5` liso** (primero de la serie "Dos negocios" en crema). `armar.mjs` local
  copiado de `caso-starbucks`: subtítulos navy `#0b1220`, recuadro verde con relleno 0.32, logo
  oscuro (`assets/logo-oscuro.png`).
- Todo en navy: trazos de 6-7 px, paneles blancos con borde navy de 7 px y sombra navy plana
  desplazada (volumen sin degradés). El verde de marca va SIEMPRE como relleno (toldo, pills,
  alertas, recuadros) con texto navy encima, porque verde sobre crema como texto no se lee. Rojo
  apagado `#c7655b` solo para lo perdido (El Tornillo · sin CRM, "Solo en la memoria", "Sin
  noticias"). Lo que se apaga, en gris cálido `#8d8a7c` / `#d9d6c8`.
- Dos fachadas de ferretería de 440 px (toldo a rayas, cartel navy, vidriera con martillo, tuerca y
  destornillador, puerta). El Tornillo con toldo navy, La Tuerca con toldo y herramientas verdes.
- Interfaz grande: celular de 700x1000-1040, panel CRM de 980x1000, hojas de presupuesto, laptop.
- Todas las escenas salen de `gen.mjs`: correr `node gen.mjs && node armar.mjs`.
- `reel.json`: `subDesde` 15 (el gancho está en grande en s01), `subHasta` 86 (el CTA tiene su
  texto grande), cortes a mano, `malo` = chat, cabeza.

## Escenas (tiempos relativos en tiempos.md)
- **s01-gancho** (0-5.96): cuadro 0 con el gancho entero (Lexend 800, 96/96/118/124 px; "lo
  siguió." en recuadro verde lleno) y las dos fachadas ya dibujadas. En "mandaron" (2.5) sale una
  hoja de presupuesto de cada una, con tilde (3.0). En "Una sola" (4.1) la de la izquierda cae y se
  apaga, pill roja "Quedó ahí" (4.5); La Tuerca late y pill verde "Lo siguió" (4.95).
- **s02-martin** (5.96-7.67): pared de azulejos de 940x580 con canilla y pileta; ficha navy
  "Martín · REFORMA EL BAÑO"; en "baño" cae una gota verde.
- **s03-lunes** (7.67-9.59): hoja de calendario "LUNES" y lista "Para el baño" (inodoro, grifería,
  cerámica, caños); en "pide presupuesto" (0.6) dos globos verdes "¿Me pasás un presupuesto?" con
  flechas a EL TORNILLO y LA TUERCA (1.1).
- **s04-chat** (9.59-12.71): rótulo rojo "EL TORNILLO · SIN CRM". Celular con la lista de chats: al
  principio solo Martín ("Presupuesto baño.pdf"); en "queda en el chat" (1.0) entran cinco
  conversaciones (proveedor, Laura, obra, Carlos, Ana) y lo empujan al fondo, recuadro rojo y pill
  "Una conversación más". En "cabeza" (1.85-2.0) el celular se corre y aparece la cabeza del dueño
  con la nube "¿Martín?" que se borronea; pill roja "Solo en la memoria".
- **s05-crm** (12.71-16.73): rótulo verde "LA TUERCA · CON CRM". Panel "CRM · Presupuestos": en
  "anota" (0.95-1.6) cae la ficha "Martín · Reforma del baño · ENVIADO EL LUNES" con tilde; tira de
  seguimiento LUN-VIE; en "miércoles" (2.38) se prende MIÉ en verde con campana; en "avisa" (2.88)
  sube la alerta navy "AVISO AL VENDEDOR · Escribirle a Martín".
- **s06-mensaje** (16.73-20.67): celular de Martín con el chat de "Ferretería La Tuerca":
  escribiendo, el mensaje palabra por palabra con la voz ("Martín," resaltado), pill "Con su
  nombre"; en "viernes" (3.05) tarjeta "Presupuesto baño · Guardado hasta el viernes · Reservado";
  respuesta "¡Paso el jueves!" (3.45).
- **s07-compra** (20.67-22.80): las dos hojas de presupuesto lado a lado; la de El Tornillo en gris
  con "Sin noticias"; en "segunda" (0.9-1.13) cae el sello verde "VENDIDO" sobre la de La Tuerca.
- **s08-giro** (22.80-25.74): vuelven las dos fachadas; "Buen precio" con tilde en las dos y "="
  (0.6-0.75); en "Una sola" (1.4) la izquierda se apaga con un globo vacío punteado rojo y a la
  derecha aparece el globo verde "Martín, ¿pudiste verlo?" (1.88).
- **s09-medida** (25.74-28.29): laptop "TU FERRETERÍA · CRM" con cuatro presupuestos y su estado
  (VENDIDO, ESCRIBIR HOY, ENVIADO, VENCE VIERNES); en "a tu medida" cinta de medir verde y pill.
- **s10-cta** (28.29-34.33): la laptop se vuelve la videollamada (TU FERRETERÍA · Scalerics);
  "Videollamada" (0.4), "gratis" con recuadro (0.68), "scalerics.com" navy en placa verde (1.6);
  queda ~4 s quieto respirando.

---

> Lo de abajo es el SPEC-base (fondo navy, líneas crema). En este reel MANDA lo de arriba: fondo
> crema, líneas y textos navy, verde solo como relleno, trazos de 6-7 px, textos de 28 px o más.

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

