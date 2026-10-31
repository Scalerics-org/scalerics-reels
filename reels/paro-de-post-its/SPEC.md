# Reel "Paro de post-its": spec de escenas

Reel vertical 1080x1920 de Scalerics. Vende el **CRM**. Formato P (cultura popular): **asamblea en
paro con conferencia de prensa en vivo**, muy uruguaya. Los post-its pegados en la caja registradora
del local se declaran en paro. El DELEGADO (post-it amarillo con vincha "PARO" y megáfono) abre:
"¡Los post-its de tu caja estamos de paro! Y tenemos razón." Una periodista de noticiero cubre la
toma ("como en Toy Story, pero de papel") y pide los reclamos. Punto uno: "somos un montón y nadie
nos lee". La compañera ROSA: «llamar a la señora del pedido», ¿qué señora?, ¿qué pedido?, "estoy acá
desde el invierno". El CELESTE veterano (anteojos y bigote): «Gómez, dos cajas»: nadie sabe quién
es Gómez, "ni Gómez". El CHIQUITO: "¡a mí me pegaron con cinta!". Se cae uno al piso, «seña de
Martina, el lunes», y con él se va una clienta: minuto de silencio. El DUEÑO negocia, nervioso:
"¿más cinta? les consigo más cinta". GIRO: "¡No queremos más cinta! Queremos jubilarnos. Jefe: vos no
tenés mala memoria. Tenés el negocio pegado con papelitos." Entra Orus (Scalerics): el CRM con la
ficha de cada cliente, lo que compró, lo prometido y el aviso de a quién escribirle (la ficha es de
Martina, la del post-it que se cayó). El celeste se jubila: "Por fin. Me voy a La Paloma." Cierre:
"Mostranos tu caja: ¿cuántos post-its tiene? Te leemos en los comentarios."
Voz de 71.8 s, reel de 75.0 s, seis voces (ver `partes/voces.sh`).

## Recurso visual central y ESTILO: corcho, post-its con carita y cartón de movilización
Fondo de CORCHO marrón tostado con motas (`assets/corcho.svg` en el fondo de `armar.mjs`).
Personajes = post-its de colores con carita de caricatura (cejas, ojos con brillo, cachetes, boca
que habla), bracitos y piernitas de tinta, esquina doblada y sombra; escriben su "papelito" en
letra de marcador (Caveat 700) arriba de la cara. Pancartas de CARTÓN con palo, megáfono rojo,
cinta adhesiva semitransparente, banderines de cartón y post-it arriba ("PARO EN LA CAJA"),
chinches en las esquinas y zócalo de noticiero "EN VIVO" abajo (y 1588) hasta que entra Scalerics.
Con Scalerics (desde 54.6) entra el verde y una pantalla oscura limpia: el contraste del papelito
contra el sistema.
Todas las escenas se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs`
(piezas comunes en `partes/escenas/comun.mjs`: `postit()`, `persona()`, `caja()`, `pancarta()`,
`megafono()`, `cinta()`, `rollo()` y los helpers de animación `pop`, `golpe`, `pega`, `entra`,
`dibujar`, `habla`, `respira`, `balancea`, `pestanea`, `escribe`). El ambiente sale de
`node partes/escenas/ambiente.mjs`, la cortina de murga de `node partes/cortina.mjs` y la voz de
`partes/voces.sh` + `partes/recortar.sh` + `node partes/pegar.mjs` (tempos y silencios en
`partes/conf.mjs`).

## Paleta (SOLO estos)
- Amarillo post-it `#ffd84d` (sombra `#e0b22c`): el delegado, el chiquito, lo que grita.
- Rosa post-it `#ff8fb8` (sombra `#de6592`): la compañera.
- Celeste post-it `#7fd3f7` (sombra `#4ea7d0`): el veterano, la periodista.
- Tinta de marcador `#1d1b22`: todos los contornos y la letra sobre papel.
- Rojo pancarta `#e5383b`: megáfono, vincha, ¡PARO!, X, EN VIVO.
- Cartón `#d6a46a` (oscuro `#b07f45`): pancartas, caja registradora, cajas.
- Papel `#fff6e0` para textos sobre el corcho; fondo corcho `#6e4a2c` a `#24170e`.
- Desde s12 (Scalerics) entra el verde `#5ce611` (pantalla del CRM, aviso, cartel de La Paloma).
Subtítulos: crema con sombra; acento según quién habla (amarillo delegado, rojo periodista, rosa,
celeste, naranja `#f2a65a` el dueño, verde Scalerics: `reel.voces` en `reel.json`).
Prohibido: emojis, fotos, logos o imágenes de Toy Story ni de ningún sindicato o partido, rayas
largas (—) en textos visibles.

## Zona
Subtítulos arriba (y 236 a ~420); banderines en y 40-170. Contenido entre y 560 y 1520. El
zócalo EN VIVO ocupa y 1588-1652 (5.05 a 54.4); logo en y 1746.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá no es línea crema con un solo acento: es corcho, post-its de colores y cartón).
> Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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


## Escenas (todas hechas; tiempos por palabra en `tiempos.md`)

**s01-paro** (5.01 s). El delegado (post-it amarillo, vincha PARO, megáfono) parado arriba de la
caja registradora; en "post-its" se pegan 4 post-its chicos enojados a la caja con el puño en
alto; en "estamos" ondas del megáfono; en "paro!" (2.32) cae la pancarta de cartón "¡PARO!" con
sacudón; en "Y tenemos razón" sale "y tenemos razón" en marcador amarillo.

**s02-toma** (6.30 s). La periodista (busto, pelo largo, saco celeste, micrófono) a la izquierda y
la caja a la derecha. Sello rojo "¡INSÓLITO!" al arrancar; en "Toy Story" los post-its de la caja
pestañean y saltan ("versión papel" en marcador); en "tomaron" llueven post-its hasta tapar la
caja, que tiembla en "registradora"; en "¿Cuáles son los reclamos?" el micrófono apunta a la caja
y aparece "¿reclamos?".

**s03-reclamos** (4.51 s). Pliego de papel "PLATAFORMA DE RECLAMOS"; "1." en "uno"; en "montón"
cae una pila de post-its ("un montón"); en "nadie" se escribe "Nadie nos lee" y se subraya en
rojo en "lee"; en "Compañera" el delegado le cede la palabra y entra la rosa por la derecha.

**s04-senora** (6.57 s). La rosa grande con moño y su papelito "llamar a la señora del pedido";
en "¿Qué señora?" dos siluetas de señora con "?"; en "¿Qué pedido?" dos cajas de cartón con "?";
en "Estoy acá desde el invierno" nieva, le cae una bufanda roja, tirita, "desde el invierno".

**s05-gomez** (4.68 s). El celeste veterano (anteojos, bigote) con "Gómez, 2 cajas" y dos cajas
numeradas; en "Nadie sabe quién es Gómez" una silueta con "?" en la cara y "¿Gómez?"; en "Ni
Gómez" la silueta se encoge de hombros y cae "ni Gómez".

**s06-cinta** (4.39 s). El chiquito amarillo gritando con los brazos arriba; en "pegaron" y
"cinta" se le estampan dos tiras de cinta en X; en "cinta" (2.17) "¡CON CINTA!" rojo gigante;
en "compañeros" se asoman dos post-its sorprendidos.

**s07-cae** (1.89 s). "¡ATENCIÓN!" rojo titilando; el post-it «seña de Martina, el lunes» tiembla,
se despega en "cae" y cae balanceándose al piso; los otros miran abajo.

**s08-silencio** (6.60 s). El post-it de Martina tirado en el piso, triste; en "Y con él" entra
la clienta (silueta con cartera) y en "clienta" se va y desaparece ("chau, clienta"); en
"Minuto de silencio" los tres post-its de arriba agachan la cabeza, una vela y "minuto de
silencio"; el ambiente se oscurece (37.9-39.9).

**s09-negocia** (5.98 s). El dueño (pelado, bigote, delantal, sonrisa nerviosa, gota de sudor)
frente al delegado y la rosa de brazos cruzados; "mesa de negociación" en "Negociemos"; en "¿Más
cinta?" levanta un rollo de cinta que gira; en "Les consigo más cinta" aparecen tres rollos más.

**s10-jubilarnos** (3.62 s). Un rollo de cinta tachado con una X roja en "cinta!"; en
"jubilarnos" (2.37) la pancarta "¡QUEREMOS JUBILARNOS!" gigante; los compañeros saltan.

**s11-papelitos** (5.08 s, EL GIRO). El delegado chico y triste abajo a la izquierda; "mala
memoria" que se tacha en rojo; en "negocio" se dibuja la fachada del local en líneas, con
grietas rojas; en "pegado" se le pegan diez post-its como parches; en "papelitos" cae
"papelitos" amarillo y el local se tambalea.

**s12-crm** (2.41 s). Entra Scalerics: una notebook oscura con la lista CLIENTES en verde; los
post-its vuelan adentro de la pantalla en "armamos"; "CRM" verde gigante en "CRM".

**s13-ficha** (5.94 s). Ficha de cliente de Martina (la del post-it caído): avatar "M", "COMPRÓ ·
3 veces, la última en junio" en "compró", "LE PROMETISTE · reservarle la seña, el lunes" en
"prometiste", y en "aviso" la tarjeta verde "AVISO · HOY · Escribirle a Martina" con campanita.

**s14-paloma** (4.72 s). "Todo en un solo lugar": los post-its se meten en una ficha; en "Por fin"
el celeste veterano con sombrero de paja y valija roja, "¡por fin!", sol y mar; en "La Paloma"
el cartel verde "LA PALOMA" y se va caminando.

**s15-cta** (7.32 s). "Mostranos tu caja" en marcador amarillo, la caja con la pantalla
"TU CAJA"; en "post-its" se le pegan seis post-its; "¿cuántos tiene?"; en "Te leemos" un globo de
comentario verde con puntitos que escriben "Te leemos".
