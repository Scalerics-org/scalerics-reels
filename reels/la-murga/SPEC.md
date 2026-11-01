# Reel "La murga": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Formato P: MURGA DE
CARNAVAL uruguaya (solo nombrada: nada de letras ni canciones de murgas reales). Una murga, en un
tablado de barrio, le dedica el cuplé al comerciante que deja en visto: "Este carnaval, la murga
te dedica el cuplé. Y no te va a gustar." El coro se burla ("¡Después te contesto, después te
contesto! ¡Y compró en el de enfrente, por supuesto!"), el cupletero lo remata (cerrás el WhatsApp
a las ocho como quien baja la persiana; al del domingo, "pasá el lunes, si hay ganas"; "¡y la
culpa es del dólar!"). GIRO: el dueño se para en el público y grita "¿Y quién atiende? ¡Yo solo!
El mostrador, los proveedores, el reparto... ¡y encima el celular!". El director frena la murga:
"El vecino tiene razón: no es mal comerciante, está solo con todo. ¡Cambiamos la letra!
¡Retirada!". La retirada le canta al compañero que llegó: un agente de IA que contesta primero, a
las tres de la mañana, con tus precios y horarios, toma pedidos y te pasa la charla cuando es para
vos. "¡Y vos, por fin, te vas al tablado!". Cierra Orus: "En Scalerics hacemos el agente de IA de
tu comercio. Etiquetá al que se merece un cuplé."

Voces (Gemini, un .txt por parlamento en `partes/`, ver `partes/voces.sh`): director/cupletero
Fenrir (recitado con ritmo de murga), coro Puck + Algenib alineados frase por frase y mezclados
(`partes/coro.mjs`), el dueño desde el público Charon, narrador Orus solo al final. Locución de
70.2 s (duración total 73.44). Subtítulos con acento del color de quien habla (`reel.voces`):
dorado director, rojo coro, celeste dueño, verde Scalerics.

## ESTILO: TABLADO DE CARNAVAL DE NOCHE. Edición cargada.
Un tablado de barrio de noche: telón rojo a los costados y bambalina con flecos dorados, una
guirnalda de lamparitas de colores que titilan arriba (por encima de los subtítulos), piso de
tablas en perspectiva con borde dorado en y 1440, cono de luz que respira. Todo eso lo pone
`compositions/tablado.html` (capa de atrás, track 3); `compositions/ambiente.html` (capa de
adelante, track 4) pone viñeta, rótulo "TABLADO DE BARRIO · CARNAVAL" abajo a la derecha
(y 1610), fogonazos dorados de reflector en 2.41, 31.17, 34.45, 45.47, 62.99 y 68.45, y baja la
luz (32.3-44.5) cuando el dueño interrumpe. Personajes dibujados genéricos, planos y con relleno:
murguistas de cara blanca pintada (rombos en los ojos, estrellas en los cachetes, boca roja que
se abre en cada palabra), galera azul con banda de color, gola de volados; el dueño con delantal
celeste y bigote; el AGENTE DE IA como un celular murguista con galera, cara pintada verde y
brillo verde. Objetos: bombo con maza, platillos, almanaque, persiana, cartel de cartón "PASÁ EL
LUNES", moneda de dólar acusada, papelitos de colores. Palabras gigantes que caen de golpe en su
palabra (Lexend 900, scale 2.4 -> 1, sacudón), sellos rojos, todo se balancea con la marcha.

## Paleta (SOLO estos colores)
- Azul noche `#070d26` / `#0d1a47` / `#14245e`: fondo, rellenos, galeras, público.
- Dorado `#f2b632` (y cartón `#d9b77c`): lamparitas, bordes, textos gigantes, lo valioso.
- Rojo murga `#e63946` / `#b8202e` / `#ff5a5f`: telón, pintura, sellos, lo que está mal.
- Blanco tiza `#f7f1e3`: caras, textos, líneas.
- Celeste `#8fd3ff`: el dueño (delantal, su luz, sus textos).
- Verde Scalerics `#5ce611`: SOLO el agente de IA y lo que viene con él (desde s10).
Brillos con text-shadow/drop-shadow del mismo color (1-2 por escena). Prohibido: emojis, fotos,
logos, rayas largas en textos visibles, letras de murgas reales.

## Sonido
Fondo sintetizado (`partes/sonidos.mjs fondo` -> `assets/bgm/murga.mp3`): marcha camión (bombo,
platillo, redoblante) + murmullo; se corta en "¡Eh, pará!" (32.32) y vuelve más suave en la
retirada; aplausos cuando entra Orus. Efectos propios (`node partes/sonidos.mjs`): `bombo`,
`platillo`, `redoble`, `aplausos`, `abucheo`, `risas`; además los de siempre.

## Zona
Subtítulos arriba (y 236 a ~430). Contenido entre y 560 y 1520, x 60-1020 (el telón ocupa los
costados: x < 90 y x > 990). Logo en y ~1746, rótulo en y 1610 a la derecha.

## Cómo rehacer la voz
`partes/voces.sh` (genera lo que falte) -> `partes/limpiar.sh NN` por parte -> tiempos.mjs sobre
`NN-c.wav` (o `NN-a-c.wav` y `NN-b-c.wav` en el coro, a `NN.json` y `NN-b.json`) ->
`node partes/coro.mjs 02 04 06 09 11` -> `node partes/pegar.mjs` (atempo y silencios por parte;
arma locucion.wav, palabras.json y guion.txt) -> `node partes/sonidos.mjs fondo` -> `node armar.mjs`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el tablado con la paleta de arriba,
> rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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


## Escenas (todas hechas; tiempos en `tiempos.md`)

**s01-cuple** (5.35 s). El DIRECTOR (cara pintada, galera, gola) entra de abajo y se hamaca;
en "carnaval" estallan papelitos desde la galera; "te dedica" en mono y en "cuplé" cae "EL CUPLÉ"
gigante dorado con platillazo; en "no te va a gustar" guiña un ojo, sube una ceja y cae el sello
rojo "NO TE VA A GUSTAR".

**s02-atencion** (5.90 s). El CORO: tres murguistas (rojo, verde, dorado) que cantan y se
hamacan juntos; "SEÑOR COMERCIANTE" y "Prestá atención". En "escriben" el coro sube y se achica y
entra el celular con "Hola, ¿tienen para hoy?", "visto 20:14" y la caja de respuesta vacía con
cursor; en "ni un renglón" sello rojo gigante "NI UN RENGLÓN".

**s03-febrero** (5.59 s). Chat: "¿Precio?" (14 FEB 10:02) y la respuesta dorada "Después te
contesto" (19:40); una telaraña se teje sobre la respuesta; un almanaque colgado que se hamaca
en FEB 14 y en "febrero" se le arrancan las hojas hasta NOV.

**s04-enfrente** (5.75 s). El coro canta: "DESPUÉS / TE CONTESTO / TE CONTESTO" cae palabra por
palabra con la maza pegándole al bombo. En "¡Y compró...": la calle con TU LOCAL (apagado, "visto")
y ENFRENTE (dorado, "ABIERTO"); la clienta cruza caminando y sale con bolsa; tu local titila y se
apaga; sello "POR SUPUESTO".

**s05-persiana** (2.86 s). "20:00" gigante; un celular al que le siguen llegando mensajes; en
"baja la persiana" cae una persiana metálica con "CERRADO" y un candado; la hora se pone roja.

**s06-lunes** (4.25 s). Burbuja "¿Abren hoy?" (DOMINGO 11:30) que insiste; cae colgado de un
clavo el cartel de cartón "PASÁ EL LUNES", subrayado rojo, "(si hay ganas)", y queda torcido.

**s07-dolar** (2.62 s). Una moneda gigante con "$" y ojos de inocente que se hamaca; "LA
CULPA"; los dedos acusadores del coro entran de los costados; en "dólar" golpe, gotita de sudor,
mira para otro lado.

**s08-yo-solo** (6.66 s). Baja la luz (ambiente). EL DUEÑO se para en el público (cabezas de
espaldas), con la mano en alto: "¡PARÁ, PARÁ!" celeste, "¡YO SOLO!" gigante; aparecen en su palabra
el MOSTRADOR, las cajas de PROVEEDORES, el REPARTO y el CELULAR que vibra con globito rojo; él
transpira.

**s09-razon** (5.58 s). El director serio con la mano en alto ("Pará la murga"); en "tiene razón"
se saca la galera; "MAL COMERCIANTE" que se tacha en rojo; "SOLO CON TODO" dorado y cejas de
empatía.

**s10-retirada** (5.48 s). La hoja "CUPLÉ DEL VISTO" se tacha y sale volando; baja el
estandarte dorado "RETIRADA"; el dueño solo; en "llegó un compañero" entra bailando el AGENTE DE IA
(celular murguista verde) y "UN COMPAÑERO" en verde.

**s11-agente** (3.27 s). Primer plano del agente; "AGENTE DE IA" verde; "¿Tenés para hoy?" y la
respuesta verde al toque "¡Sí! Te lo guardo." (AL INSTANTE); en "primero" cae una medalla con 1.

**s12-tres** (7.89 s). "03:00" y luna; el chat del agente ("Agente de IA · en línea"): precio y
horario, "Dame dos para el sábado" / "Listo: pedido anotado.", "¿Hacen tortas de boda?" / "Te paso
con el dueño."; el dueño duerme en un círculo "VOS" (z z) y en "charla" le llega la flecha y se
despierta.

**s13-tablado** (3.64 s). La murga canta arriba y el dueño festeja con los brazos en alto, saltando
con la marcha; en "tablado" lluvia de papelitos y "AL TABLADO" gigante dorado.

**s14-cta** (8.60 s). Orus. El agente bailando, "Lo hacemos nosotros" y "TU AGENTE DE IA"; en
"etiquetá" cae una "@" dorada gigante con galera, "ETIQUETÁ" y "al que se merece un cuplé"; la
galera salta en "cuplé" y sigue la marcha hasta el final.
