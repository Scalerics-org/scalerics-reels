# Houston, Marta · sistema a medida · control de misión

**De qué trata.** Un control de misión espacial de película de los 60/70 en plena crisis. La nave es
el local. El director de vuelo (Charon, grave y dramático) abre con el gancho: "Houston, tenemos un
problema: Marta se fue de vacaciones." El operador de consola (Puck, nervioso) reporta fallas: stock
sin datos, un proveedor en la línea que dice que le debemos, "eso lo sabe Marta". Se comunican con
Piriápolis: Marta (Aoede, por radio, con olas, tranquilísima) dice que está todo en el cuaderno azul;
lo analizan en la pantalla grande ("¿eso es un siete o una vaca?"); "no, el otro azul, el de la
mancha de mate"; llega Don Carlos con su precio especial; Marta empieza a dictar la clave de la compu
y se pierde la señal. Cuenta regresiva para abrir: "peor que el Apolo trece". GIRO (el director,
calmo): Marta es una genia; el problema es que el negocio entero vive en su cabeza, y su cabeza está
en la playa. Entra Orus: un programa a medida, hecho para cómo trabajás vos (stock, pedidos,
proveedores, el precio de Don Carlos) en un lugar que entiende cualquiera. La nave vuela sola, Marta
vuelve bronceada ("Chiquilines, ¿me extrañaron?"). Cierre: "Etiquetá a la Marta de tu negocio."

**Formato:** D (historia de una persona con nombre) contada como película de control de misión.
**Recurso visual central:** la sala de control retro: consolas beige con perillas, pantallas de
fósforo ámbar, la pantalla grande con la trayectoria de la nave-local (un local con toldo y aletas de
cohete), luces de alarma rojas, la cuenta regresiva, y la polaroid de Marta en la playa.

## Paleta (manda sobre SPEC-base)
- Azul petróleo `#0f2a3a` (fondo, con `#07151e` en los bordes y como tinta).
- Beige consola `#e8dcc0` (consolas, marcos, auriculares).
- Ámbar fósforo `#ffb000` (texto de pantallas, etiquetas, acento de subtítulos, arena).
- Rojo alarma `#d7263d` (alertas, sellos, el toldo, la ropa de Marta).
- Crema `#fff4e0` (papel, polaroid, camisas, texto claro).
- Azul cuaderno `#3d7ea6` (los cuadernos azules, cielo y mar de la playa).
- Piel `#d9a77c` (Marta bronceada `#b9805a`); mancha de mate `#a87d3a`. Pantallas por dentro `#120e05`.
- Ilustración plana con relleno (no líneas crema): personajes genéricos con contorno `#07151e`.

## Tipografía
- Subtítulos: IBM Plex Mono 600, 52px, crema; acento ámbar.
- Pantallas, rótulos y etiqueta debajo del dibujo: IBM Plex Mono 600, mayúsculas, ámbar (top 1372).
- Manuscrito de Marta (cuaderno, polaroid, globo): Caveat 700.

## Ambiente (`compositions/ambiente.html`)
Dos balizas rojas que laten arriba durante la crisis (hasta "Ojo: Marta es una genia", 42.27 s);
líneas de barrido de monitor, una franja de barrido que baja, grano, viñeta; ruido de radio corto
cuando entra Marta (13.95, 23.3, 32.15) y estática fuerte cuando "perdimos la señal" (36.24). Desde
"En Scalerics" (49.87) luz ámbar cálida y el rótulo pasa de "● ALERTA" (rojo) a "● TODO EN ORDEN".

## Sonido
Efectos propios en `assets/sfx/`: `quindar` (el bip de radio de las misiones), `olas`, `estatica`,
`alarma`. Las líneas de Marta van con filtro de radio (componer.mjs).

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh → tiempos.mjs por parte → componer.mjs (atempo 1.08-1.17
y silencios entre parlamentos). Director Charon (01, 03, 05, 10, 13, 14), operador Puck (02, 04, 07,
09, 12), Marta Aoede (06, 08, 11, 17), Orus (15, 16, 18).

## Base técnica (de SPEC-base; la paleta y el estilo de arriba mandan)
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

### s01-houston (0-4.12) · el gancho
Pantalla grande con grilla ámbar y la trayectoria punteada; la nave-local sube con fuego. Delante, el
DIRECTOR (camisa crema, corbata roja, anteojos, auriculares con micrófono) y la consola beige.
"problema" (1.09): marco rojo titilando y rótulo ALERTA; el director tiembla y abre la boca.
"Marta" (1.91): entra la polaroid de Marta en la playa. "vacaciones" (2.82): sello rojo "DE
VACACIONES". Etiqueta "MISIÓN: LOCAL 1" → "ENCARGADA: AUSENTE".

### s02-alarmas (4.12-8.37) · las fallas
Dos monitores ("CONSOLA 1 · STOCK", "LÍNEA 1 · ENTRANTE"), el OPERADOR (anteojos grandes, auriculares)
y un teléfono rojo en la consola. "Stock" (0.44): señala el monitor; "datos" (1.31): las barras se
caen y titila "SIN DATOS". "proveedor" (2.18): suena el teléfono, "PROVEEDOR"; "debemos" (3.31):
banda roja "DICE QUE LE DEBEMOS", gota de sudor.

### s03-debemos (8.37-11.99) · nadie sabe
Pantalla "DEUDA CON PROVEEDOR $ ? ? ? ?" titilando; tres operadores de espaldas. "Nadie" (1.25):
los tres se encogen de hombros con "?" arriba. "Marta" (2.82): la pantalla cambia a "FUENTE DE
DATOS: MARTA · UBICACIÓN: LA PLAYA" con su polaroid.

### s04-piriapolis (11.99-19.42) · la radio
Mapa de la costa: enlace punteado de CONTROL a PIRIÁPOLIS, "CONECTANDO...". "Hola" (2.13): la
pantalla pasa a la cámara de la playa: Marta en reposera bajo la sombrilla, lentes de sol, radio en la
oreja, mate; olas y sol en movimiento. "Tranquilos" (3.89) toma mate. "azul" (6.05): aparece el
cuaderno azul en la arena.

### s05-cuaderno (19.42-23.39) · ¿un siete o una vaca?
La hoja del cuaderno escaneada en la pantalla (Caveat: "yerba ~ ver Ramí...", "D. Carlos: lo de
siempre", "prov. ?? debe/debo"...). Mira ámbar que la recorre, barra de análisis. "¿Eso" (1.55): zoom
al garabato. "siete" (2.33): "¿SIETE?"; "vaca" (3.20): una vaca roja se dibuja sobre el garabato y
"¿VACA?".

### s06-otro-azul (23.39-27.74) · el otro azul
Estante con cinco cuadernos azules idénticos ("cuentas"); recuadro de radio "PIRIÁPOLIS" con la onda
de Marta. "no" (0.61): cruz roja en el primero; "otro azul" (1.48): el selector salta de uno a otro.
"mancha" (3.13): sale al frente el cuaderno con la mancha de mate; "mate" (3.48): aparece el mate.

### s07-don-carlos (27.74-32.24) · el precio especial
"CÁMARA · PUERTA": DON CARLOS (boina, bigote blanco, bastón) entra y guiña en "Marta" (1.31). Cae una
etiqueta "$ ???" y sello "ESPECIAL" (2.09). "¿Qué precio" (2.95): banda "CONSULTANDO A MARTA...".

### s08-senal (32.24-38.18) · perdimos la señal
Compu beige de época con "CLAVE:" y pista "la de siempre"; osciloscopio con la voz de Marta. "clave",
"compu", "es" (2.70, 3.13, 3.57): un asterisco por palabra. Corte (4.0): la onda queda plana, la
pantalla se llena de estática con "SIN SEÑAL". "Perdimos" (4.49): todo tiembla.

### s09-cuenta (38.18-42.27) · cuenta regresiva
Reloj "APERTURA EN T-10:00" que baja un segundo por segundo; la nave-local en la plataforma de
lanzamiento, temblando con humo, saltan tornillos, el cartel "CERRADO" se sacude. "peor" (2.32): sello
"PEOR"; "Apolo trece" (2.68): parche redondo "APOLO 13".

### s10-genia (42.27-49.87) · el giro
Se apagan las alarmas. MARTA de frente, grande. "Marta" (0.5): le cae una medalla "N°1"; "genia"
(1.21): sello ámbar "GENIA". "problema" (1.91): la cara se abre como radiografía: adentro de la cabeza,
el localcito y alrededor el cuaderno azul, la etiqueta de Don Carlos, la llave, la caja de stock y
"$ ???", que giran en "vive" (3.56). "playa" (6.25): vuelve la cara, le cae un sombrero de playa,
aparecen arena, olas y sol.

### s11-programa (49.87-59.61) · el programa a medida
Pantalla limpia "LOCAL 1 · HECHO A MEDIDA". "medida" (1.71): una cinta métrica se estira sobre la
pantalla. "trabajás" (3.08): la cabecera cambia a "COMO TRABAJA MI LOCAL". Filas con tilde en cada
palabra: STOCK (4.16), PEDIDOS (4.84), PROVEEDORES (5.58), DON CARLOS precio especial (6.62).
"entiende" (8.38): suben el operador con el pulgar arriba y el director aliviado.

### s12-vuela (59.61-66.08) · la nave vuela sola
La nave-local da vueltas en órbita sola, "PILOTO AUTOMÁTICO". "Marta vuelve" (1.32): entra Marta
bronceada con sombrero, lentes de sol y bolso; brillitos en "bronceada" (1.94). "Chiquilines" (4.14):
saluda; globo "¿me extrañaron?".

### s13-cta (66.08-71.39) · cierre
Polaroid vacía con la silueta de una encargada y un "?" ámbar, "tu Marta" en Caveat; una @ roja con
flecha que la señala. Etiqueta "ETIQUETÁ A LA MARTA DE TU NEGOCIO". Queda latiendo hasta el final.
