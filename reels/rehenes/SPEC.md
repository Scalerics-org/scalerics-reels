# Reel "Rehenes": spec

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES (pedidos de WhatsApp que pasan
solos a la planilla, stock que se actualiza solo, aviso al cliente de que el pedido está listo,
reporte del día al celular). Formato P: PELÍCULA DE REHENES. La PLANILLA DE EXCEL del local
(villana, voz grave Algenib) tiene de rehén al dueño todas las noches después de cerrar y dicta sus
demandas en pasos ("Demanda 1: Control C, Control V. Toda la noche." ... "no me cierres sin
guardar"). Un NEGOCIADOR de la policía con megáfono (Fenrir) negocia ("nadie sale lastimado",
"¿cuáles son tus demandas?", "¡traigan pizzas!"); la HIJA del dueño (Leda) grita detrás de la
cinta ("¡Hace tres noches que cena frente a la compu!", "¡Papá! ¿Guardaste?"). El negociador no
puede más: "¡Llamen a los especialistas!". GIRO: entran los especialistas de Scalerics (Orus):
"Nosotros no negociamos con planillas. La automatizamos." La planilla se llena sola y se rinde con
bandera blanca. Orus explica la automatización y cierra: "Etiquetá al que esta noche sigue de
rehén." Voz de 73.0 s (13 parlamentos, ver `partes/`), total 76.17 s.

## Estilo: escena de rehenes nocturna en la vereda del local
Noche, luces de patrullero que alternan rojo (izquierda) y azul (derecha) cada 0.4 s, cinta
policial amarilla abajo ("NO PASAR · ESCENA DE REHENES"), cartel "EN VIVO · TOMA DE REHENES ·
23:47" arriba. La planilla es una PANTALLA MONSTRUO: grilla verde con dos celdas rojas como ojos,
cejas blancas enojadas y una fila de celdas con dientes como boca que habla. Personajes dibujados
genéricos con relleno plano y contorno blanco (caras blancas con rasgos oscuros). Carteles de
"DEMANDA N" como capítulos (Lexend 900, número amarillo gigante). Desde 53.3 s (entran los
especialistas) las sirenas se apagan, el ambiente pasa a verde Scalerics, a 59.7 la cinta se cae y
el cartel pasa a "REHÉN LIBERADO · 21:00". En el CTA vuelven las sirenas (el que sigue de rehén).

## Paleta
- Noche `#0a0d14` / `#141a28`: fondo y rellenos.
- Rojo sirena `#ff3b3b`: ojos de la planilla, sellos, amenaza.
- Azul sirena `#2f6bff`: policía, luces.
- Amarillo cinta `#ffd60a`: cinta, números de demanda, acentos de subtítulos.
- Verde planilla `#21a366`: la planilla.
- Blanco `#f2f2f2`: contornos y textos.
- Desde s13: verde Scalerics `#5ce611` (los especialistas, "automatizamos", lo que se resuelve).

## Cómo están hechas las escenas
Las escenas se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs`
(CSS + HTML + JS + SFX de cada escena; personajes compartidos en `partes/escenas/pj.mjs`:
planilla, poli, hija, dueño, local). Después, `node armar.mjs`. La voz: `partes/voces.sh`
(Gemini), `partes/recortar.sh` (silencios y atempo por voz), `tiempos.mjs` por parlamento y
`partes/componer.mjs` (pega y arma `palabras.json`, con correcciones a mano de silencedetect).

## Voces
Fenrir negociador (megáfono), Algenib planilla (grave, tiránica), Leda hija, Orus narrador
(especialistas y cierre).

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


## Escenas (tiempos en tiempos.md)
- **s01-atencion** (0-2.5): policía con megáfono, ondas amarillas, "¡ATENCIÓN!" gigante, sello azul "HABLA EL NEGOCIADOR" en "negociador".
- **s02-rehen** (2.5-7.8): el local de noche ("TU LOCAL", toldo a rayas, CERRADO), vidriera verde con la silueta del dueño frente a la compu; cartel "SECUESTRADORA: LA PLANILLA"; sello "REHÉN" en "rehén" (flash); círculo rojo al dueño; en "otra vez" palitos de noches contadas en el vidrio y "OTRA VEZ." gigante.
- **s03-demanda** (7.8-15.2): la planilla monstruo habla; reloj rojo "23:59" en "medianoche"; burbujas de chat que vuelan a la planilla y "40 PEDIDOS" en "cuarenta"; "UNO. POR. UNO." palabra por palabra mientras se llenan celdas.
- **s04-negociador** (15.2-19.0): el policía baja el megáfono; "NADIE SALE / LASTIMADO", sello "COMO EN LAS PELÍCULAS"; libreta "DEMANDAS: 1. 2. 3. 4.".
- **s05-ctrlc** (19.0-23.8): "DEMANDA 1"; teclas Ctrl + C y Ctrl + V que se aprietan cada vez más rápido; luna y "TODA LA NOCHE".
- **s06-hija** (23.8-27.0): la hija gritando detrás de la cinta; "3 NOCHES"; plato de milanesa "CENA: FRÍA"; compu verde y sello "FRENTE A LA COMPU".
- **s07-stock** (27.0-32.2): "DEMANDA 2"; tabla PRODUCTO/STOCK; la columna STOCK se marca, los números bailan, se pone roja y se borra: sello "COLUMNA BORRADA".
- **s08-celda** (32.2-37.0): "DEMANDA 3"; tres celdas se funden en "COMBINADA"; ventana de error; "ARREGLALA VOS.".
- **s09-pizzas** (37.0-39.5): el policía grita, caen cuatro cajas de PIZZA, cronómetro, sello "GANEMOS TIEMPO".
- **s10-avisos** (39.5-46.1): "DEMANDA 4"; cinco clientes (Marta, Rubén, Lucía, Pocho, Sofi) y el mensaje "Tu pedido está listo" mandado de a uno.
- **s11-guardar** (46.1-50.3): diálogo "¿Guardar los cambios?", el cursor va a la X y la planilla lo frena; entra la hija y "¿GUARDASTE?".
- **s12-especialistas** (50.3-53.3): el policía transpira y tira el megáfono; "¡LLAMEN A LOS / ESPECIALISTAS!".
- **s13-automatizamos** (53.3-56.8): entran dos especialistas con chaleco verde SCALERICS y anteojos negros; "NO NEGOCIAMOS / CON PLANILLAS." y "LA / AUTOMATIZAMOS." verde (flash).
- **s14-rindo** (56.8-60.8): la planilla sorprendida (ojos blancos), las celdas se llenan solas con tildes; "¿ME LLENO SOLA?"; bandera blanca y "ME RINDO.".
- **s15-solos** (60.8-67.8): "AUTOMATIZACIONES" y tres flujos: WhatsApp > planilla (OK), en el local > stock 12 a 10 (OK), pedido pronto > aviso al cliente.
- **s16-cena** (67.8-71.0): celular con "REPORTE DEL DÍA" y barras; se corre y aparece el dueño sonriendo en la mesa con la cena humeante: "MIENTRAS CENÁS.".
- **s17-cta** (71.0-76.2): "ETIQUETÁ / AL QUE ESTA NOCHE / SIGUE DE REHÉN" y el local con otro dueño de rehén; etiqueta azul "@el_de_la_planilla" que cae sobre la ventana. Vuelven las sirenas.
