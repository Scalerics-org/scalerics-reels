# SPEC · por-que-el-99

Explicador "¿Por qué…?" (30,52 s) narrado por Orus con una línea de Rubén (Gemini Algenib). Producto: **reportes de
ventas automáticos** (automatización / sistema a medida: qué producto y a qué precio vende más, en el celular).
Fondo **navy3 `#1f3254` liso**; el piso 3D de la parte central es una **planilla gigante** del mismo navy con líneas
crema (encabezados A, B, C… en mono); objetos crema/navy/verde de marca; rojo apagado `#c7655b` solo para el problema
(sello NO PROBADO, el "?" de Rubén en la lista). Recurso central: **EL 999** (el precio que Rubén tipea en el cuadro 0,
sale de la pantalla como número 3D, se vuelve la etiqueta $ 99, aparece en la caja, vuelve a la lista de Rubén, al
reporte del celular y a la etiqueta 3D de la tarjeta de cierre).
3D real en una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro, cámara Catmull-Rom con tangentes monótonas);
las escenas HTML son la capa plana (gancho, rótulos con línea guía, créditos, tarjeta de cierre), generadas por
`gen.mjs`. Ver `plan.md` (brief aprobado) y `NOTAS-constructor.md` (planos, segundos, verificaciones).
**Lo de SPEC-base sobre "ilustración de líneas" no aplica** (es el estilo viejo): manda este SPEC; valen sus reglas
técnicas de HyperFrames.

## Escenas (segundos globales)
| # | id | inicio | qué se ve |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | por encima del hombro de Rubén (oficina vidriada, depósito con racks detrás del vidrio): la lista de precios en el monitor con "$ 1.000" seleccionado en verde; tipea 9, 9, 9 (0,95 / 1,30 / 1,65), confirma (2,0) y el 999 se despega de la pantalla en 3D (2,2). Gancho en 3 líneas: "¿Por qué los / precios terminan / en [99]?" |
| 2 | s02-primer-numero | 2,77 | corte escondido al 999 parado en la planilla (mismo encuadre frontal); la cámara gira a 3/4: en "primer" el primer 9 se pone verde y crece, los otros dos se achican grises. Rótulo "el primero manda" |
| 3 | s03-cien | 4,71 | travelling a dos etiquetas colgadas de un perchero navy: "$ 99" (verde) y "$ 100" (crema). En "menos" la de 100 cae pesada (rebote) y la de 99 sube y se hamaca. Crédito "Thomas y Morwitz · 2005", rótulo "1 peso de diferencia" |
| 4 | s04-cajero | 7,22 | caja registradora antigua (display "$ 99", teclas redondas, manivela, cajón). En "cajero" gira la manivela y se abre el cajón; en "vuelto" saltan 5 monedas; en "No está" baja un sello de goma y deja la placa roja "NO PROBADO" sobre el teclado. Rótulo "la historia del cajero" |
| 5 | s05-catalogo | 10,15 | catálogo de pie (tapa navy "CATÁLOGO / OTOÑO") que se abre; en "se midió" sube un vestido verde en su percha; en "mismo vestido" salen dos iguales a los costados. Crédito "Anderson y Simester · 2003 / catálogo de ropa" |
| 6 | s06-tres-precios | 12,44 | etiquetas sobre el riel: US$ 34 (en "treinta y cuatro"), US$ 39 (en "treinta y nueve") y US$ 44; pilas de cajas kraft con cinta verde crecen parejas a 3 |
| 7 | s07-vendio-mas | 14,95 | push-in a 34 y 39: flecha crema del 34 al 39 en "caro"; pausa; en "vendió" la pila del 39 suma la cuarta caja, tilde verde; 34 y 44 se apagan. Rótulo "vendió más" |
| 8 | s08-oferta | 17,46 | rótulo "mismo 3" con dos líneas guía a los 3 de 34 y 39; en "oferta" la etiqueta del 39 gira y del dorso dice OFERTA; push-in |
| 9 | s09-redondo | 19,28 | la etiqueta OFERTA salta del riel y vuela (con la cámara) hasta un regalo navy con moño verde y precio redondo "$ 4.000"; choca, rebota y cae; tilde verde sobre el regalo. Crédito "Wadhwa y Zhang · 2015 / en regalos". La cámara sube a cenital sobre la planilla (20,45) |
| 10 | s10-ruben | 20,99 | corte en la grilla (20,74) a la pantalla del monitor: la celda "$ 999" con un "?" rojo; la cámara sube por encima de Rubén y baja de frente a él (el depósito detrás del vidrio): "¿Y mi noventa y nueve vendió más?" (boca por amplitud); en "vendió más" mira al depósito |
| 11 | s11-reporte | 23,18 | el celular vibra en el escritorio, Rubén lo levanta y lo muestra; push-in: "REPORTE · Ventas de la semana": "Aceite x12 · a $ 999 · vendió más ✓" (23,78) y "Yerba x10 · a $ 1.200 · ganó el redondo ✓" (24,96) |
| 12 | s12-medimos | 25,92 | Rubén baja el celular y levanta el mate a cámara con media sonrisa |
| 13 | s13-cierre | 27,87 | fondo verde: "Videollamada / gratis / scalerics.com" + la etiqueta 3D "$ 999" que se hamaca (2,65 s) |

## Paleta y tipografía
navy `#0b1220`, navy2 `#16243d`, navy3 `#1f3254` (fondo y planilla), crema `#efeee5`, verde `#5ce611`, rojo apagado
`#c7655b` (solo problema), kraft `#c9a46b` (cajas), madera clara (escritorio, percha, sello). Subtítulos arriba al
centro, Lexend 800 86 px crema con borde navy de 14 px, palabra clave en recuadro verde con texto navy (rojo en
"probado."); números dichos en letras se muestran en cifras ("99", "34", "39."). Rótulos: placa crema, texto navy
Lexend 800 52 px, borde verde 6 px, línea guía crema de 7 px. Créditos: placa navy con borde crema, Lexend 700 46 px +
mono verde 40 px. Logo blanco en píldora navy (oculto en el inserto del celular).


---
# SPEC-base (reglas técnicas; el estilo visual de líneas no aplica)

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

