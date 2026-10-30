# Reel "Cámara oculta": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; este reel vende UNA cosa:
el SITIO WEB del comercio, rápido en el celular, con menú, cómo llegar y botón a WhatsApp).
Formato P: PROGRAMA DE CÁMARAS OCULTAS (bromas de la tele). El CONDUCTOR (Fenrir, pícaro,
susurrando desde la camioneta con auriculares): "Le hicimos una broma a tu cliente. Lo mandamos a
buscar tu local en internet. Él es Fede. Tiene hambre, y quiere ir a la parrilla de Don Tito."
FEDE (Puck, 25 años, cada vez más desesperado) en la parada del ómnibus: la página carga, carga,
y arranca una MÚSICA SOLA a todo volumen ("¡Estoy en la parada!"; "Toda la parada lo está
mirando"); el menú es una foto de la pizarra, de costado, con un dedo adelante; cómo llegar: "a
media cuadra de donde estaba el videoclub" ("¿Qué videoclub?"); el formulario de contacto lo manda
al principio, otra vez la música. "¿Esto es una broma?" "¡Sí, Fede! ¡Sonreí! ¡Es una cámara
oculta!" "¡Me mataron! ¿Y cuál era la broma?" GIRO: "Ninguna. La página es así de verdad." Fede
se va a la de enfrente: abrió al toque, menú con precios, cómo llegar, botón de WhatsApp, ya
reservó. DON TITO (Charon): "¿Página? Si a mí me conoce todo el barrio." Conductor: "Tito... Fede
vive arriba tuyo." Cierra ORUS (Scalerics): "La broma la pagás vos, todos los días. En Scalerics
hacemos sitios web rápidos en el celular, con tu menú, cómo llegar y un botón a WhatsApp.
Mandáselo al que dice que lo conoce todo el barrio." Voz de 73.42 s, total 76.62 s.

Chistes nuevos a propósito (no repetir los de mision-horario, storytime, recalculando, el-roast):
nada de "cerrado permanentemente", web de 2014, horario ni teléfono que no existe. Acá: la música
que arranca sola, la foto de la pizarra con el dedo, la referencia al videoclub que ya no existe,
el formulario que te devuelve al inicio, y el remate "Fede vive arriba tuyo".

## ESTILO: PROGRAMA DE BROMAS, AMARILLO Y NEGRO. Edición cargada.
Todo se ve como una cámara oculta: viñeta de OJO DE PEZ (bordes que se oscurecen), esquinas de
MIRA amarillas y una cruz central tenue, "● REC" que titila, el logo genérico "CÁMARA OCULTA"
(caja amarilla torcida con sombra negra), código de tiempo que corre, ZÓCALOS del programa
("LA VÍCTIMA", "PRUEBA 1..4", "ALERTA", "DATO") y RISAS GRABADAS escritas como texto
("[ risas grabadas ]", "[ aplausos ]", "[ silencio incómodo ]"). Eso lo hace `ambiente.html`
(fijo, delante). Las escenas son los planos: la camioneta del conductor, Fede en la parada con el
celular, el celular a pantalla completa con la página de Don Tito (UI vieja: gris, chiquita, con
música), el cartel gigante de SONRÍA cuando salta la broma, la vereda con las dos parrillas
enfrentadas, Don Tito en su puerta, el edificio con la ventana de Fede arriba de la parrilla.
Cortes secos con golpe; carteles que entran con sacudón; personajes dibujados GENÉRICOS.

## Paleta (SOLO estos colores)
- Negro `#0c0c0c` (fondo, rellenos de ropa, contornos de carteles) y gris `#2b2b2b` (caras,
  rellenos apagados).
- Amarillo `#ffd400`: el programa (logo, mira, zócalos, carteles, SONRÍA, auricular del
  conductor).
- Crema `#fbf7ea`: contornos de los dibujos (stroke 7), textos, pelo de Fede.
- Rojo `#ff3b30`: REC, el buzo de Fede, alertas, la página de Don Tito que falla, tachaduras.
  En los subtítulos, el acento de Fede es `#ff5a4f`.
- Verde Scalerics `#5ce611`: SOLO en la página buena de enfrente (s11), y desde s14 (Scalerics).
Sombras duras (box-shadow sin blur) en carteles; nada de glow. Prohibido: emojis, fotos, rayas
largas (—) en textos visibles, logos o caras reales, marcas reales.

## Personajes (`partes/escenas/pj.py`, iguales en todas las escenas)
- CONDUCTOR: pelo engominado negro, lentes negros, bigote fino, auricular con micrófono
  AMARILLO, campera negra con cierre amarillo.
- FEDE: rulos crema, buzo ROJO con capucha y cordones, celular en la mano (pantalla amarilla).
- DON TITO: boina negra, bigotazo crema, delantal crema, pinza de asado.

## Tipos de letra
Lexend 800-900 para carteles y palabras gigantes (mayúsculas, torcidos como sticker);
IBM Plex Mono 500 para REC, código de tiempo, risas grabadas y UI chica. Nada que haya que leer de
menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~400; el acento tiene el color de quien habla: amarillo conductor y
Tito, rojo claro Fede, verde Scalerics; lo arma `armar.mjs` con `voces`). Contenido de las
escenas entre y 540 y y 1410. Arriba (y 90-190) y abajo (zócalo y 1440-1590, risas y 1612-1670)
manda `ambiente.html`.

## Capa fija: `compositions/ambiente.html` (DELANTE de las escenas)
REC + logo + código de tiempo arriba; mira y ojo de pez; zócalos en 0, 4.35, 8.53, 12.35, 17.29,
23.24, 28.14, 34.07, 42.19, 44.80, 52.80, 57.0; risas en 16.0, 21.6, 26.9, 32.6, 37.9 (aplausos),
43.2 (silencio incómodo), 54.2 (uuuh), 58.6; flash blanco en 35.44 (¡Sí, Fede!). En 60.4 se apaga
el programa (entra Scalerics). Audio: `assets/bgm/bromas.mp3` (bajo en puntas de pie,
sintetizado por `partes/musica.mjs`, con silencio seco en "Ninguna") y `assets/sfx/musiquita.mp3`
(la música de la página, onda cuadrada).

## Cómo están hechas las escenas
Todas se generan con `python3 partes/escenas/gen.py partes/escenas/sNN.py` (desde
`reels/camara-oculta`): cada `sNN.py` tiene ID, DUR, CSS (`$` = selector de la escena), HTML, JS y
SFX; `gen.py` pone el esqueleto, la paleta, los helpers (`golpe`, `pop`, `entra`, `dibujar`,
`habla`, `sacudon`) y la salida con blur; `pj.py` tiene los personajes. Voz: `partes/voces.sh`
(una voz por parlamento), `partes/pegar.sh` (atempo y silencios), `partes/componer.mjs`
(palabras.json y guion.txt).

## Brief por escena (tiempos en tiempos.md)
- s01-broma (0): la camioneta por dentro (ventana con cortinas, monitor con la víctima y REC),
  el conductor con el dedo en la boca ("shh"); "BROMA" sticker amarillo con golpe en "broma",
  "A TU CLIENTE" rojo en "cliente"; en "buscar" entra un buscador que tipea "tu local...".
- s02-fede (4.35): Fede en la parada (cartel de parada, techo), con hambre: globo de pensamiento
  con un chorizo; en "Fede" la etiqueta "VÍCTIMA" con flecha; en "parrilla de Don Tito" el globo
  muestra el cartel de la parrilla.
- s03-carga (8.53): celular gigante con la página de Don Tito cargando: barra que no avanza,
  ruedita girando, "Carga..." "carga..." en grande; Fede chiquito abajo zapateando.
- s04-musica (12.35): "¡Uy!": el celular explota en notas musicales amarillas, Fede salta del
  susto; en "parada" aparecen cabezas de gente en la parada que se dan vuelta (ojos que miran).
- s05-menu (17.29): la pantalla muestra el "menú": una foto de la pizarra GIRADA 90° con un DEDO
  enorme tapando; Fede gira la cabeza para leer de costado.
- s06-videoclub (23.24): "Cómo llegar": texto en la página "A MEDIA CUADRA DE DONDE ESTABA EL
  VIDEOCLUB"; aparece el fantasma de un videoclub (local tachado con casete VHS); "¿QUÉ
  VIDEOCLUB?" con signo gigante.
- s07-formulario (28.14): formulario de contacto, botón ENVIAR, flecha que da la vuelta al
  principio ("INICIO"), y otra vez las notas musicales; Fede se agarra la cabeza.
- s08-sonria (34.07): "¿Esto es una broma?": Fede mira de reojo, la mira de cámara hace zoom; en
  "¡Sí, Fede!" sale el conductor con el cartel gigante "SONRÍA" y "ES UNA CÁMARA OCULTA",
  papelitos amarillos.
- s09-cual (39.54): Fede se ríe, aliviado ("ME MATARON"), y pregunta "¿Y CUÁL ERA LA BROMA?".
- s10-ninguna (42.19): corte en seco: el conductor serio, "NINGUNA" en rojo, el cartel SONRÍA se
  cae; "LA PÁGINA ES ASÍ DE VERDAD".
- s11-enfrente (44.80): la vereda: parrilla de Tito (cartel apagado) y la de ENFRENTE; Fede cruza;
  en "abrió al toque" el celular muestra la página buena (verde): MENÚ CON PRECIOS, CÓMO LLEGAR,
  botón WHATSAPP; "RESERVADO" con sello.
- s12-tito (52.80): Don Tito en su puerta, pinza en mano, pecho inflado: "A MÍ ME CONOCE TODO EL
  BARRIO" en globo.
- s13-arriba (55.79): el edificio: abajo la parrilla de Tito, arriba la ventana de Fede, que
  saluda; flecha roja "FEDE"; "VIVE ARRIBA" sticker.
- s14-pagas (60.48): Scalerics: "LA BROMA LA PAGÁS VOS" y un calendario cuyos días se tachan.
- s15-web (63.66): celular con la página que Scalerics hace (verde): carga al instante, MENÚ,
  CÓMO LLEGAR (pin en mapa), botón WHATSAPP.
- s16-cta (70.55): "MANDÁSELO AL QUE DICE" + "A MÍ ME CONOCE TODO EL BARRIO" tachado en verde y
  una flecha de compartir; queda quieto 3 s.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es programa de bromas con la paleta de
> arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

