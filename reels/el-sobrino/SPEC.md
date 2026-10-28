# Reel "El sobrino" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace sitios web,
bots de WhatsApp, puntos y tiendas online para comercios). Le dice al dueño de un comercio al que
le va bien: "le pagaste a un arquitecto para el local, y la página te la hizo tu sobrino". Cuidás
el cartel, la vidriera y hasta el color de las sillas, pero tu cara en internet quedó improvisada.
Y hoy el cliente conoce el local por la página ANTES de pisarlo. No es culpa del sobrino (no nos
burlamos de nadie): es que la página no está a la altura del local. Producto: sitios web que se ven
profesionales, cargan rápido en el celular y tienen lo que el cliente busca (horarios, ubicación,
cómo comprar o escribir). Locución de 49.6 s, ritmo rápido. Mismo estilo que los reels aprobados
(`../el-de-enfrente/`, `../nadie-te-encuentra/`, `../tarjeta-que-nadie-lee/`).

Recurso central del reel: **el local contra la página**. Dos piezas que se repiten:
- **EL LOCAL** (cuidado, "de arquitecto"): la fachada de `../el-de-enfrente/compositions/s01-te-roba.html`
  (toldo ondulado, cartel "TU LOCAL", dos vidrieras con vidrio verde, puerta), dibujada entera y
  prolija. Cuando hace falta, con cotas de arquitecto (líneas de medida finas con topes).
- **LA PÁGINA**: un celular (rx 52) con una página adentro. *Improvisada*: bloques torcidos (rotados
  2-6°), un título "MI LOCAL" chueco, un recuadro de imagen rota (rectángulo con una grieta en zigzag),
  renglones de largos desparejos, todo en crema apagado y SIN verde. *Prolija*: cabecera con un
  localcito + "Tu Local", filas alineadas (reloj verde + horario, pin + ubicación) y botón verde
  "Escribinos" (como `../nadie-te-encuentra/compositions/s05-su-pagina.html`).
Cuando comparan, el local va a la IZQUIERDA y la página a la DERECHA.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-sobrino.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()`, `pop()`, `badge()`, `etiqueta()` y tono visual.** Define el local y
  la página improvisada: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 52.81 (la voz termina en
49.61).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-sobrino** (3.78 s) · "Le pagaste a un arquitecto para el local, y la página te la hizo tu
sobrino." Izquierda (x≈300): el local arranca medio dibujado; en "arquitecto" (0.40) aparecen las
cotas verdes (ancho arriba, alto al costado) y una escuadra chica; en "local" (1.20) se prenden las
vidrieras. Derecha (x≈790): en "página" (2.00) se dibuja el celular; en "sobrino" (2.90) la página
de adentro cae torcida (bloques que rotan al caer, imagen rota). Etiquetas: "DE ARQUITECTO" →
"DE APURO".

**s02-vidriera** (3.22 s) · "Elegiste el cartel, la vidriera, hasta el color de las sillas." El
local grande al centro (ancho ~560). En "cartel" (0.42) el cartel se dibuja y hace golpe con un
tilde verde; en "vidriera" (1.12) los vidrios se llenan de verde y un tilde; en "color" (2.32) al
costado derecho una paleta de tres muestras (rectángulos) donde una se rellena de verde con tilde;
en "sillas" (3.02) dos sillitas de línea delante de la vidriera hacen pop. Etiqueta "CADA DETALLE".

**s03-improvisada** (3.04 s) · "Y tu cara en internet quedó improvisada." Local chico prolijo a la
izquierda (apagado 0.45), celular a la derecha. En "cara" (0.70) el celular hace golpe y aparece
arriba "TU CARA" en mono; en "internet" (1.00) la página empieza a armarse; en "improvisada" (2.00)
se desarma: bloques que se tuercen, un renglón se cae, la imagen se rompe, un cartelito "EN
CONSTRUCCIÓN" con cinta rayada de líneas crema. Etiquetas: "TU CARA EN INTERNET" → "IMPROVISADA".

**s04-no-es** (3.82 s) · "No es culpa de tu sobrino. Ni de la plata. Ni de que no tuvieras
tiempo." Tres íconos en fila (como `../nadie-te-encuentra/compositions/s04-no-es.html`), cada uno con
badge X: una figurita con notebook (sobrino 0.66), una bolsa de plata con "$" (plata 1.66), un reloj
(tiempo 3.16). Etiqueta "NO ES CULPA DE NADIE".

**s05-primero** (7.08 s) · "Es que hoy el cliente conoce tu local antes de pisarlo. Y lo primero
que ve no es tu vidriera: es tu página." Parte A (0–3.1): figurita del cliente a la izquierda con un
celular en la mano; el local a la derecha, lejos (apagado). En "cliente" (0.74) la figurita hace
pop; en "conoce" (1.04) del celular salen ondas verdes y aparece un globo con un mini local adentro;
en "antes de pisarlo" (2.25–2.64) una línea punteada de pasos entre la figurita y el local que se
dibuja pero la figurita NO se mueve. Etiqueta "ANTES DE PISARLO". Parte B (3.14–7.08): todo se va;
un ojo grande arriba (y≈680) en "primero" (3.64) con un "1°" verde; abajo la vidriera (izq.) y el
celular (der.). En "no es tu vidriera" (4.54–5.29) la vidriera se apaga con badge X; en "es tu
página" (5.84) el ojo mira al celular, que se agranda con un aro verde. Etiqueta "LO PRIMERO QUE VE".

**s06-prolija** (3.13 s) · "Una página prolija le dice: acá te van a atender bien." Celular al
centro con la página PROLIJA que se arma rápido en "prolija" (0.26): cabecera, filas alineadas que
entran de a una, botón verde. En "dice" (1.06) sale un globo de diálogo a la derecha con un tilde
verde grande; en "atender bien" (2.16) el botón late y aparece una estrellita o corazón verde.
Etiquetas: "PROLIJA" → "CONFIANZA".

**s07-tarda** (4.27 s) · "Una que tarda, se ve rota o no dice a qué hora abrís, le dice lo
contrario." Celular al centro con la página improvisada. En "tarda" (0.23) la pantalla vacía con un
spinner que gira y una barra de carga trabada; en "rota" (1.33) cae la página torcida con la imagen
rota; en "a qué hora abrís" (2.23–2.53) aparece un relojito con "?" y su badge X; en "lo contrario"
(3.33) sale el globo de diálogo con una X verde grande. Etiquetas: "TARDA · ROTA · SIN HORARIO" →
"LO CONTRARIO".

**s08-no-viene** (2.75 s) · "Y no se queja. Simplemente no viene." El local a la izquierda, la
figurita del cliente a la derecha con su celular. En "queja" (0.26) un globo vacío "..." sobre la
figurita que se tacha; en "Simplemente no viene" (0.96–1.76) la figurita da media vuelta y se va por
la derecha; el local se apaga. Etiquetas: "NO SE QUEJA" → "NO VIENE".

**s09-sistema** (5.31 s) · "No es caro ni es un lujo. Es tener un sistema: que tu cara en
internet esté a la altura de tu local." Una etiqueta de precio con "$" (caro 0.21) y un diamante de
línea (lujo 0.91), cada uno con badge X. En "sistema" (2.11) los dos se van y se dibuja el
engranaje que gira (el de `../tarjeta-que-nadie-lee/compositions/s09-sistema.html`). En "tu cara en
internet" (3.11) el engranaje se achica y sube; abajo aparecen el local (izq.) y el celular con la
página prolija (der.) con la misma altura; en "altura" (4.51) una línea verde horizontal toca el
techo de los dos con topes de cota y un "=" verde. Etiquetas: "NO ES CARO" → "ES UN SISTEMA" → "A LA
ALTURA".

**s10-scalerics** (5.90 s) · "En Scalerics hacemos sitios web para comercios. Que se ven
profesionales y cargan rápido en el celular." Arriba (y≈660) una caja redondeada que se dibuja con
"Scalerics" (Lexend 700 ~60px) en "Scalerics" (0.70) y debajo "SITIOS WEB PARA COMERCIOS" mono. Abajo
un celular con la página prolija que se arma en "sitios web" (1.90). En "profesionales" (3.90) los
bloques se alinean con un golpe y aparece un tilde verde; en "cargan rápido" (4.80–5.20) una barra
de carga verde que se llena de un tirón y un rayo verde. Etiquetas: "PROFESIONAL" → "RÁPIDO EN EL
CELULAR".

**s11-busca** (5.70 s) · "Con lo que tu cliente busca: horarios, ubicación y cómo comprarte o
escribirte." Celular grande al centro con la página prolija; cuatro filas grandes que entran cada
una en su palabra con icono verde: reloj + "Horarios" (2.05), pin + "Ubicación" (2.76), bolsa +
"Comprar" (3.90), globo + "Escribinos" como botón verde (4.60). Etiqueta "LO QUE BUSCA" → "TODO A
MANO".

**s12-cta** (4.81 s) · "Comentá WEB y te contamos cómo." (la voz termina en 1.6). El cierre
como `../nadie-te-encuentra/compositions/s12-cta.html`: "Scalerics" grande, "Sitios web para
comercios" debajo, píldora crema con texto navy: Comentá "WEB", pop en "Comentá", golpe en "WEB"
(0.30) y pulsos finitos. Sin salida con blur.
