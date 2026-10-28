# Reel "El cuaderno" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le habla al dueño de un comercio al que
le va bien: "tu cuaderno de pedidos te cuesta más que un sistema". Todo lo anota en un cuaderno o
en la cabeza, y eso tiene un costo que no se ve: el pedido que no salió, los turnos que se pisan,
el cliente de años que no sabe cómo se llama, el negocio que se frena cuando él no está. No crece
porque todo pasa por él. Producto: el bot de WhatsApp (toma pedidos, agenda turnos) y Scalerics
Puntos (quiénes son tus clientes y cada cuánto vienen). Locución de 58 s, ritmo rápido. Mismo
estilo que los reels aprobados: `../el-de-enfrente/`, `../puntos-que-vuelven/`,
`../bot-whatsapp/` y `../descuentos/` (mirá sus `compositions/`).

Recurso central del reel: **el cuaderno**. Una libreta espiralada de líneas crema (tapa con
anillos arriba, renglones, garabatos a mano: rayitas onduladas que imitan letra, tachones,
flechas). Todo lo "a mano" es crema, torcido e imperfecto; todo lo que es sistema es prolijo y
lleva el verde (tildes, horarios ordenados, nombres). El cuaderno vuelve al final (s11) cerrado,
con una lamparita: ahora es para las ideas.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-cuaderno.html`: **la escena modelo. Copiá su estructura, clases, helper
  `dibujar()` y el dibujo del cuaderno.**

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 61.37 (la voz termina en
58.17).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-cuaderno** (5.88 s) — "Tu cuaderno de pedidos te cuesta más que un sistema. Y lo pagás
todos los días sin verlo." El cuaderno abierto (≈520x600, centrado, y 640–1200) arranca medio
dibujado; en "pedidos" (1.00) se garabatean 5 renglones a mano con un lápiz que va bajando. En
"cuesta" (1.90) le cuelga del espiral una etiqueta de precio con "$" verde (como s09 de
el-de-enfrente) que se balancea. En "pagás todos los días" (4.00–4.70) caen monedas de línea
desde abajo del cuaderno, de a una, y se desvanecen (gotea plata); en "sin verlo" (5.20) un ojo
chico tachado. Etiquetas: "EL CUADERNO" → "TE CUESTA" → "SIN QUE LO VEAS".

**s02-te-va-bien** (6.22 s) — "Te va bien. Tenés pedidos, turnos, clientes. Y todo está anotado
ahí, o en tu cabeza." Un local (como s01 de el-de-enfrente) con luces verdes y un gráfico chico
que sube con flecha verde en "bien" (0.42). En "pedidos" (1.32), "turnos" (2.26), "clientes"
(2.72) aparecen tres íconos en fila sobre el local: bolsa, reloj, figurita, con pop. En "anotado
ahí" (4.42) los tres se meten volando adentro del cuaderno, que aparece a la izquierda; en
"cabeza" (5.72) a la derecha una cabeza de perfil con garabatos enredados adentro. Etiquetas:
"TE VA BIEN" → "TODO ANOTADO".

**s03-pasa-por-vos** (7.62 s) — "¿Por qué no crecés más? No es falta de clientes. Ni de ganas.
Ni de plata. Es que todo pasa por vos." Un gráfico de barras que sube y se aplana (meseta) con
un "?" verde grande (0–1.3). Después tres íconos en fila, cada uno con badge X verde en su
palabra: figuritas (clientes 2.50), rayo (ganas 3.70), bolsa con "$" (plata 4.60). En "todo"
(5.90) los íconos se van y aparece UNA figurita al centro ("VOS") con 6 flechas que llegan desde
todos lados (pedidos, teléfono, turnos, caja...) en "pasa por vos" (6.30–6.70); la figurita se
achica un poco, aplastada. Etiquetas: "NO CRECÉS" → "NADA DE ESO" → "TODO PASA POR VOS".

**s04-pedido-turno** (3.68 s) — "Un pedido que se anotó mal y no salió. Dos turnos a la misma
hora." El cuaderno abierto grande, un renglón "PEDIDO" (texto a mano: mono 26px) con garabato;
en "mal" (0.98) un tachón crema torcido encima; en "no salió" (1.48) una caja/paquete al lado con
badge X verde. En "Dos turnos" (2.34) la página pasa a una grilla de agenda con horas
"10:00 / 11:00 / 12:00" y dos tarjetitas de turno que caen en el mismo casillero y se enciman con
un temblor y un "!" verde en "misma hora" (3.08). Etiquetas: "NO SALIÓ" → "SE PISAN".

**s05-cliente** (3.98 s) — "Un cliente que viene hace años y no sabés ni cómo se llama." Una
figurita frente a un mostrador; en "viene hace años" (1.20–1.70) a su lado se apilan marcas de
calendario (muchas hojas que pasan rápido, o rayitas de conteo que se dibujan). En "no sabés"
(2.50) arriba de la figurita una tarjeta de nombre vacía con "¿ ... ?"; en "cómo se llama" (3.30)
el "?" late verde. Etiquetas: "HACE AÑOS" → "¿CÓMO SE LLAMA?".

**s06-frena** (3.23 s) — "Y el día que vos no estás, el negocio se frena." El mostrador con
la silla vacía y un cartelito "VUELVO EN 5'" colgado; en "no estás" (0.92) la figurita que
estaba se desvanece. En "negocio" (1.63) un engranaje crema que giraba se traba: en "frena"
(2.22) tiembla y queda quieto, y todo baja a opacity 0.4. Etiquetas: "SI NO ESTÁS" → "SE FRENA".

**s07-caja** (6.19 s) — "Eso no aparece en la caja. Pero lo pagás: en el cliente que se cansó
de esperar y no volvió." Una caja registradora de líneas con visor "$ 0" que se abre en "caja"
(1.39) y muestra un tilde (no aparece nada raro). En "pagás" (2.39) se corre a la izquierda y
entra una figurita esperando con un relojito arriba cuyas agujas giran rápido ("esperar" 4.59);
en "no volvió" (4.99–5.19) la figurita se da vuelta y se va por la derecha y queda su lugar
vacío punteado. Etiquetas: "NO APARECE EN LA CAJA" → "LO PAGÁS IGUAL".

**s08-sistema** (3.00 s) — "Crecer no es trabajar más horas. Es tener un sistema." Un reloj
grande con agujas que giran rápido (trabajar más horas 0.83–1.20) y recibe el badge X verde en
"horas" (1.20). En "Es" (2.08) el reloj se va girando y se dibuja el engranaje verde/crema (como
s09 de el-de-enfrente) con punch en "sistema" (2.70). Etiquetas: "NO ES MÁS HORAS" → "ES UN
SISTEMA".

**s09-bot** (7.02 s) — "En Scalerics lo armamos para comercios: un bot de WhatsApp que toma
pedidos y agenda turnos sin que se pisen." Arriba (y≈650) una caja redondeada con "Scalerics"
(Lexend 700 ~56px) en "Scalerics" (0.48) y "PARA COMERCIOS" mono en "comercios" (2.10); la caja
sube/se achica en "bot" (3.20) y entra un celular con chat (como
`../bot-whatsapp/compositions/s01-domingo.html`): burbuja del cliente "2 milanesas para las 21"
y respuesta verde "Listo, pedido #128" en "toma pedidos" (4.30–4.60); después "¿Turno el
jueves?" → respuesta verde "Jueves 10:00 · agendado" en "agenda turnos" (5.20–5.50). En "sin
que se pisen" (5.90–6.60) al lado del celular una mini agenda de 3 casilleros prolijos, cada uno
con su tilde verde. Etiquetas: "BOT DE WHATSAPP" → "PEDIDOS Y TURNOS".

**s10-puntos** (5.25 s) — "y Scalerics Puntos, que te dice quiénes son tus clientes y cada
cuánto vienen." Una tarjeta de puntos (rectángulo redondeado con "PUNTOS" y "+120" verde) que
entra en "Puntos" (0.58) y se convierte en un panel (como `../puntos-que-vuelven/compositions/s10-panel.html`):
4 filas con círculo de iniciales y nombre (Lucía M., Martín R., Sofía P., Diego A.) que entran
en "quiénes son" (1.98), y a la derecha de cada una su frecuencia en verde ("cada 7 días",
"cada 15 días"...) en "cada cuánto" (3.18–3.98). Etiquetas: "SCALERICS PUNTOS" → "QUIÉNES Y
CADA CUÁNTO".

**s11-ideas** (3.73 s) — "Vos te dedicás a crecer. El cuaderno, para las ideas." Una flecha
verde que sube en escalones en "crecer" (0.83). En "cuaderno" (1.63) vuelve el cuaderno de s01,
limpio, y en "ideas" (2.73) se garabatea una lamparita en su página con rayitos verdes. Etiquetas:
"VOS A CRECER" → "EL CUADERNO, PARA IDEAS".

**s12-cta** (5.57 s) — "Comentá SISTEMA y te contamos cómo." (la voz termina en 1.9). Igual
que `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande centrado en y≈860, debajo
"Bots · Puntos · Tiendas para comercios", la píldora crema con texto navy: Comentá "SISTEMA",
pop en "Comentá", golpe en "SISTEMA" (0.40) y pulsos finitos. Sin salida con blur.
