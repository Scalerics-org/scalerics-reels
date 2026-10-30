# Reel "El enlatado": spec de las escenas

Reel vertical 1080x1920 de Scalerics. Producto: **sistema a medida**. Formato P (cultura popular):
una **pelea de boxeo televisada**. Gancho del comentarista: "Tu negocio está perdiendo la pelea. Y el
que le pega es el sistema que vos mismo compraste." El anunciador presenta los rincones ("¡En este
rincón... tu negocio! ¡Y en el otro rincón... el sistema enlatado de la caja!"). Cuatro rounds con
tarjeta y campana: 1) vendés por kilo y por bulto y el enlatado dice "Ese campo no existe. Solo
unidades."; 2) gancho al hígado: abrís otro local y "No se puede. Un local por sistema."; 3) a la
mandíbula: anotás en un cuaderno al lado de la compu ("Pagué un sistema para dejar el cuaderno. ¡Y
ahora tengo los dos!"); 4) pedís ayuda: "Llame al soporte. Su llamada es muy importante para
nosotros." y la espera eterna. "¡Contra las cuerdas! El sistema lo obliga a trabajar como él
quiere." GIRO: el entrenador en el rincón: "¡Pará, campeón! Vos pegás bien. ¡Dejá de pelear contra
tu propio sistema y cambiá de rincón!" (el dueño no pelea mal: pelea contra su propio rincón). Entra
Orus (Scalerics): el sistema a medida, hecho para cómo trabaja tu negocio (por kilo y por bulto, dos
locales, stock, proveedores) "y pelea de tu lado". "¡Y el ganador, por nocaut... tu negocio!".
Cierre de Orus: "¿Y en tu local quién va ganando? Comentá NEGOCIO o SISTEMA."
El enlatado es GENÉRICO (ninguna marca real).

Voces (un .txt por parlamento en `partes/`, `partes/voces.sh`, `recortar.sh`, `pausas.sh`,
`componer.mjs`): comentarista Puck (01, 03, 05, 07, 09, 11), anunciador Fenrir (02, 14), el enlatado
Kore con filtro de robot (04, 06, 10; afftfilt + eco en `componer.mjs`), dueño Charon (08),
entrenador Algenib (12), narrador Orus (13, 15). Locución 73.0 s, video 76.2 s.

## ESTILO: RING DE BOXEO TELEVISADO
- Fondo (en `armar.mjs`): sala oscura, la lona del ring en perspectiva, cuerdas de atrás, poste
  ROJO a la izquierda (tu negocio) y AZUL a la derecha (el enlatado). Es un SVG fijo dentro de
  `#fondo`: las escenas dibujan encima, sin fondo propio.
- `compositions/ambiente.html` (encima de las escenas): cono del reflector cenital que se mece,
  humo, viñeta, el PÚBLICO de espaldas en primer plano (y 1540 para abajo) que salta y levanta
  brazos en los golpes, flashes de cámaras, el sobreimpreso de TV "EN VIVO · VELADA DEL COMERCIO"
  arriba a la izquierda y el marcador de round arriba a la derecha (PRESENTACIÓN, ROUND 1-4,
  CAMBIO DE RINCÓN). Flash blanco en los golpes: 1.58, 20.14, 28.25, 44.66 y 66.0 (globales).
  Desde 54.4 (entra Scalerics) un brillo verde.
- Personajes en `assets/kit.js` (`window.KIT`), dibujados en SVG plano con rellenos: el DUEÑO
  (boxeador pelado de bigote, guantes rojos, short rojo y delantal "TU NEGOCIO"; caras guardia,
  dolor, grito, feliz), el ENLATADO (cabeza de lata de conserva con abrelatas y ojos de LED, cuerpo
  de caja registradora con pantalla, guantes azules; "MODELO ÚNICO"), el ANUNCIADOR (smoking, moño
  dorado, micrófono que baja del techo), el ENTRENADOR (gorra roja, toalla, silbato), el SISTEMA A
  MEDIDA (el mismo robot pero verde, amable, "HECHO PARA VOS"), tarjeta de round, campana,
  estallidos de cómic, locales, compu y cuaderno. Ayudas: `K.cara`, `K.pantalla`, `K.golpe`,
  `K.pop`, `K.sacudir`, `K.dibujar`.
- Cada escena: `gen/escena.py` arma el esqueleto; las escenas salen de `gen/s*.py`
  (`python3 gen/s02_s04.py` etc. reescribe sus html y .sfx.json). s01 está escrita a mano.

## Paleta (SOLO estos colores)
- Rojo `#e5383b`: tu negocio (rincón rojo, guantes, short), alarmas, X.
- Azul `#2f6bff`: el enlatado (rincón azul, su cuerpo, sus sellos "NO SE PUEDE", "SOLO UNIDADES").
- Dorado `#ffc531`: tarjetas de round, campana, K.O., el cinturón, acento de los subtítulos.
- Hueso `#f5f1e8`: piel, cuerdas, textos grandes.
- Tinta `#0d0e14` / fondo `#08090d`: rellenos, contornos.
- Verde Scalerics `#5ce611`: SOLO desde s12 (rincón verde, el sistema a medida, guantes nuevos).

## Tipos y zona
Lexend 800-900 para lo grande; IBM Plex Mono 500 para rótulos. Subtítulos arriba (y 236-420),
sobreimpreso de TV en y 108-160. Contenido entre y 580 y ~1500; el público tapa desde y 1540.

## Sonidos propios
`campana` (tres toques de ring, hecha con ffmpeg), `campana1`, `espera` (musiquita de espera
telefónica, hecha con ffmpeg), `golpe`, `aplausos`, `uuh`, `murmullo`, `redoble`, `beep`.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba
> (acá no es ilustración de líneas crema con un solo acento verde). Valen las reglas técnicas.

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


## Escenas (tiempos por palabra en `tiempos.md`)

**s01-pelea** (5.66). Los dos ya en el ring (cuadro 0 con todo dibujado). 0.83 "PERDIENDO" rojo
gigante cae con sacudón y aparece el marcador "GOLPES RECIBIDOS 00". 1.58 ("pelea") el enlatado
pega: "¡PUM!" dorado, el dueño se dobla, cara de dolor, contador 01. 2.92 ("pega") segundo golpe
"¡PAF!" rojo, ojo morado, contador 02. 3.75 ("sistema") la pantalla del enlatado: "JA JA JA" y la
lata se ríe. 4.0-4.58 de la caja sale un TICKET DE COMPRA ("1 SISTEMA ENLATADO · MODELO ÚNICO ·
COMPRADO POR:") y cae el sello rojo "VOS".

**s02-rincones** (7.39). El anunciador en el centro con el micrófono colgando, boca que habla.
0.5 ("rincón") se prende el reflector izquierdo y aparece el dueño; 1.42 "TU NEGOCIO" rojo +
"RINCÓN ROJO". 2.92 se apaga el rojo; 3.25 reflector derecho y el enlatado cae del techo; 5.0
"EL ENLATADO" azul + "RINCÓN AZUL"; 5.84 "DE LA CAJA" y el cajón de la registradora se abre.

**s03-round1** (2.82). Tarjeta ROUND 1 que entra girando + campana (ding ding ding). 1.64 una
balanza "KILO 2,5 KG"; 2.05 cae una caja "BULTO X 24".

**s04-campo** (4.27). Formulario "NUEVA VENTA" (Yerba suelta, CANTIDAD 2,5 kg) y el enlatado al
lado. 0.51 el campo cantidad tiembla en rojo, pantalla "ERROR", ojos rojos; 1.28 "ESE CAMPO NO
EXISTE" rojo. 2.47 la cantidad pasa a "1 unidad"; 3.07 sello azul "SOLO UNIDADES".

**s05-higado** (4.27). 0.57 gancho al hígado (el guante entra por abajo), "¡AL HÍGADO!". 1.64
tarjeta ROUND 2 + campana. 2.45 "LOCAL 1"; 3.27 cae "LOCAL 2" y "¡OTRO LOCAL!" dorado.

**s06-no-se-puede** (3.84). Los dos locales unidos por una línea punteada dorada y el enlatado
en el medio. 0.4 sello azul "NO SE PUEDE"; 1.0 una X roja corta la línea; 1.6 el local 2 se
apaga con una cruz roja; 2.56 "1 LOCAL = 1 SISTEMA".

**s07-mandibula** (4.78). 0.17 gancho de abajo: el dueño sale volando hacia arriba, "¡CRAC!",
estrellitas. 1.44 tarjeta ROUND 3. 2.43 escritorio: la compu ("ENLATADO · CAMPO NO EXISTE") y al
lado el cuaderno, que se va llenando con el lápiz; 3.53 flecha "AL LADO DE LA COMPU".

**s08-los-dos** (3.88). El dueño; 0.72 cae la compu y el sello "PAGADO"; 1.52 tira el cuaderno
lejos... 2.05 y vuelve como bumerán; cara de grito; 3.03 "LOS DOS" dorado gigante.

**s09-soporte** (7.75). Tarjeta ROUND 4 + campana. 1.0 el dueño con el teléfono "¿Hola? ¿Ayuda?".
2.63 "LLAME AL SOPORTE" azul. Desde 3.79: el reloj gira loco, el calendario pasa de lunes a
viernes, barra "EN ESPERA · NO CORTE" que casi llega y vuelve a cero (5.2), telarañas sobre el
dueño. Suena la musiquita de espera.

**s10-cuerdas** (4.22). El enlatado lo empuja: las cuerdas del frente se doblan, "CONTRA LAS
CUERDAS". 1.48 baja una cruz de marioneta azul con hilos a los guantes y la cabeza del dueño: el
sistema lo maneja (brazos arriba y abajo); pantalla "ASÍ NO", "ASÍ"; 3.12 "COMO ÉL QUIERE".

**s11-entrenador** (5.53). El entrenador grita: "¡PARÁ, CAMPEÓN!"; 1.09 sello "PEGÁS BIEN". 2.19
el dueño (chiquito) le pega a su propio robot ("TU SISTEMA"), "TU PROPIO SISTEMA". 3.96 sube un
poste VERDE a la derecha y una flecha verde del rojo al verde; 4.22 "CAMBIÁ DE RINCÓN".

**s12-esquina** (4.54). Cae el sistema a medida (robot verde y amable) en el rincón verde,
"RINCÓN VERDE · SCALERICS". 1.37 una cinta de sastre lo mide; 1.8 sello "A MEDIDA". 2.52 entra el
dueño; pantalla "¿CÓMO TRABAJÁS?" y "ANOTADO"; 3.68 "HECHO PARA TU NEGOCIO".

**s13-de-tu-lado** (5.71). Lista con tildes verdes que se marca en su palabra: POR KILO, POR
BULTO, DOS LOCALES, STOCK, PROVEEDORES (la pantalla del robot verde dice lo mismo). 4.35 el dueño
con guantes verdes y su sistema le pegan juntos al enlatado, que sale volando; 4.78 "DE TU LADO".

**s14-ganador** (4.33). El anunciador, el dueño con cinturón dorado levanta el brazo, el enlatado
tirado con ojos en cruz. 0.27 sello "GANADOR"; 1.34 "K.O." gigante, campana, papelitos; 2.59 "TU
NEGOCIO" verde.

**s15-cta** (7.24). "¿QUIÉN VA GANANDO?"; dos tarjetas de votación: NEGOCIO (rojo, el dueño) VS
SISTEMA (azul, el enlatado); 1.93 "VOTÁ EN LOS COMENTARIOS"; 2.18 y 3.27 cada tarjeta se prende en
su palabra; después laten de a una hasta el final. Campana final.
