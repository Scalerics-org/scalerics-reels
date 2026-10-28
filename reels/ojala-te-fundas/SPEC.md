# Reel "Ojalá te fundas": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, puntos de
fidelización y webs para comercios), pensado para viralizar con polémica. Habla TU COMPETENCIA,
el del local de enfrente, como un VILLANO DE PELÍCULA desde su guarida llena de monitores de
vigilancia que apuntan a tu local: "Ojalá te fundas. Sí, vos. Te lo digo con cariño. Y no voy a
tener que hacer nada: lo vas a hacer vos solito." Explica su plan: cada cliente que te escribe a
la noche y no contestás le escribe a él; cada vez que te buscan en Google y no aparecés lo
encuentran a él; cada cliente que se olvida de vos vuelve a él. "Yo no vendo más barato. Solo
estoy cuando me buscan. Así que seguí así. Por favor. No cambies nada." Silencio. CORTE: entra el
narrador de Scalerics (otra voz), se prende la luz: "O cambiá todo, y no le des el gusto. Bot de
WhatsApp, puntos y web: lo hacemos nosotros. Etiquetá a tu competencia. Que se entere." 51 s.

## ESTILO: GUARIDA DE VILLANO (cámaras de vigilancia) hasta 41.44 s; después LUZ.
- **Parte del villano (s01-s09):** todo se ve como en monitores de seguridad: pantallas con borde
  gris `#2b302b` y fondo `#0f1a0c`, dibujos de líneas VERDE ÁCIDO `#b6ff3b` adentro (tu local,
  clientes, celulares), textos "CAM 0X" en mono, mira roja `#ff3344` que apunta, sillón del
  villano de espaldas (silueta negra con borde verde, como en s01), su mano/guante a veces
  (silueta). Palabras clave GIGANTES (Lexend 900) en verde ácido con brillo o rojo con brillo,
  que caen de golpe. Edición cargada: glitch de monitor (saltos de x, cortes de señal: scaleY a
  0.02 y vuelve), sacudones, zoom a un monitor, interferencia. Nada quieto más de ~0.8 s.
- **Parte de Scalerics (s10-s12):** la guarida se apaga (lo hace ambiente.html en 41.44) y todo
  pasa a LUZ: fondo con brillo verde Scalerics `#5ce611`, textos hueso `#f4f6ee`, los monitores
  se rompen/apagan, tu local aparece iluminado y vivo. Mismo golpe de edición, otra energía.
Mirá `compositions/s01-ojala.html`: ES LA ESCENA MODELO. Copiá su estructura (pared de
monitores con `<use href="#...">` y los atributos de trazo PUESTOS EN EL `<g>` del defs, NO por
clase CSS: por clase no llegan adentro del use; el sillón; la mira; los textos gigantes; el
`.s01-escenario` que tiembla; la salida de 0.18 s que aplasta la imagen como un monitor que se
apaga).

## Paleta (SOLO estos colores)
- Verde ácido `#b6ff3b`: líneas en los monitores, palabras del villano, brillos.
- Rojo `#ff3344`: mira, lo que acusa ("FUNDAS", "A MÍ"), REC.
- Hueso `#f4f6ee`: textos fuertes ("VOS.").
- Gris monitor `#2b302b`, fondo de pantalla `#0f1a0c`, negro `#050605`.
- Desde s10: verde Scalerics `#5ce611` y hueso; nada de verde ácido ni rojo (salvo para romper
  lo del villano en s10).
Brillos con text-shadow/drop-shadow del mismo color permitidos (1-2 cosas por escena). Prohibido:
emojis, fotos, degradés de colores, rayas largas (—) en textos visibles.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para "CAM 0X", horas, datos y UI. Nada que haya
que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Los subtítulos de la narración están arriba (y 236 a ~420, los pone `subtitulos.html`): las
escenas NO escriben la frase narrada entera. Contenido entre y 560 y y 1520. El logo de Scalerics
va en y ~1746. Hasta 41.44 hay un "● REC" arriba a la derecha (y 120) y "CAM 01 · ENFRENTE" abajo
a la izquierda (y 1600): los pone ambiente.html, no los tapes ni los dupliques.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`).
- `compositions/ambiente.html`: líneas de monitor, viñeta, REC, parpadeos de monitor en 2.9,
  11.3, 19.9, 27.4, 33.6; flashes rojos en 0.6, 7.86 y 38.38; en 41.44 flash blanco, se apaga la
  guarida y se prende una luz verde Scalerics (todo en segundos globales). Si cae uno en tu
  escena, que tu golpe coincida.
- `compositions/subtitulos.html`, `compositions/s01-ojala.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `beep`
(pitido de monitor). Cada golpe de palabra lleva sonido; los cortes de monitor, glitch.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la guarida del villano con la
> paleta de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

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


## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Tiempos exactos por palabra en
`tiempos.md`. Seguí la idea; si se te ocurre algo con más golpe, mejor.

**s01-ojala** (hecha). Pared de monitores, "OJALÁ TE FUNDAS.", zoom a CAM 05 y mira sobre "VOS.".

**s02-enfrente** (3.84 s). "El del local de enfrente. Te lo digo con cariño:"
- 0.0 un monitor grande al centro: una calle de líneas verdes vista desde arriba en diagonal, con
  DOS locales enfrentados: el tuyo (izquierda) y el del villano (derecha, con su cartel). En
  0.66 ("enfrente") una flecha punteada roja cruza la calle del suyo al tuyo y "ENFRENTE" en
  mono rojo.
- 1.92-2.68 "CON CARIÑO": un corazón de líneas verde ácido aparece latiendo, y en 2.68 se
  le dibuja una mira roja encima / se agrieta (glitch). "CON CARIÑO" en Lexend 900 verde, con
  comillas.
- Etiqueta (mono verde, top 1440): "CAM 02 · CALLE".

**s03-carino** (1.94 s). "ojalá te fundas." (flash rojo en 0.6 = 7.86 global)
- Golpe corto y brutal: "OJALÁ" verde y en 0.46-0.6 "TE FUNDAS." en rojo que cae enorme (más grande que en s01), la pantalla tiembla y TODOS los monitores (pared chica de fondo) se apagan de a uno (scaleY a 0.02) como fichas de dominó. Al final una línea plana de monitor.

**s04-solito** (4.76 s). "Y no voy a tener que hacer nada. Lo vas a hacer vos solito."
- 0.0-1.32 el SILLÓN de espaldas al centro, gira de a poco (rotation -4 a 4) mientras en un monitor
  pequeño se ve un reloj que pasa rápido; "NO VOY A HACER NADA" en mono verde, y una taza de café
  de líneas que humea al lado del sillón (el villano relajado).
- 2.5-3.42 "VOS SOLITO" gigante: en un monitor grande, tu local de líneas, y la puerta se cierra
  sola, las luces de las ventanas se apagan una a una; un cartel "CERRADO" se da vuelta solo.
- Etiqueta: "PLAN: NO HACER NADA".

**s05-noche** (4.82 s). "Cada vez que un cliente te escribe a la noche y no contestás, me escribe a mí."
- Monitor partido en dos (split): IZQUIERDA "TU CELULAR" (línea verde): luna arriba, hora "22:47",
  burbuja del cliente "¿Hacen envíos?" que en 2.42 ("contestás") queda con "sin respuesta" y una X
  roja. DERECHA "EL MÍO": en 3.52 ("me escribe a mí") la MISMA burbuja vuela de un celular al
  otro (traslado x con arco) y del lado del villano llega la respuesta al toque.
- 3.52 "A MÍ." gigante rojo con brillo, sacudón.
- Etiqueta: "CAM 05 · 22:47".

**s06-google** (4.68 s). "Cada vez que te busca en Google y no aparecés, me encuentra a mí."
- Un monitor con una barra de búsqueda de líneas: se tipea "local cerca" (Plex Mono) en 0.84-1.3.
- 1.28 "GOOGLE" en mono gigante verde; resultados: 3 tarjetas de resultado que caen. 1.78
  "NO APARECÉS": un hueco punteado vacío donde iría tu local, con "?" rojo.
- 2.98-3.88 el primer resultado se agranda con una corona de líneas: el local del villano, con un
  pin de mapa rojo. "ME ENCUENTRA A MÍ".
- Etiqueta: "CAM 06 · BÚSQUEDAS".

**s07-olvida** (6.26 s). "Cada vez que se olvida de vos, porque no le diste un motivo para volver, vuelve a mí."
- Un cliente (silueta de líneas verde) frente a tu local: un globo de pensamiento con tu cartel que
  se va borrando (opacity baja con glitch) en 0.94-1.5 ("se olvida de vos").
- 2.3-3.8 "UN MOTIVO PARA VOLVER": aparece una tarjeta de puntos/fidelidad VACÍA (casilleros sin
  sellos) en tu lado, con una X roja; del lado del villano, una tarjeta llena que brilla.
- 4.7 "VUELVE A MÍ": el cliente se da vuelta y camina hacia el local de enfrente; la puerta del
  villano se abre con brillo verde ácido. "A MÍ" rojo gigante.
- Etiqueta: "CAM 07 · FIDELIDAD".

**s08-barato** (4.56 s). "Yo no vendo más barato. Solo estoy cuando me buscan."
- 0.0 el sillón gira hasta quedar de PERFIL (silueta lateral con sonrisa de líneas verdes y una
  ceja levantada) por primera vez.
- 0.3-0.94 una etiqueta de precio colgante (rectángulo con agujerito) con "$" en mono que se tacha
  en rojo: "MÁS BARATO" tachado.
- 2.08-3.38 "SOLO ESTOY" gigante verde, y abajo un cartel de neón de líneas "ABIERTO" que titila
  y se queda prendido; "CUANDO ME BUSCAN".
- Etiqueta: "LA ÚNICA DIFERENCIA".

**s09-segui** (7.16 s). "Así que seguí así. Por favor. No cambies nada." (flash rojo en 4.1 = 38.38 global). Después de 4.1 NO HAY VOZ (3 s de silencio dramático hasta 41.44).
- 0.0-0.78 "SEGUÍ ASÍ" en verde, el sillón de espaldas otra vez, el villano levanta una copa
  (silueta) como brindando hacia los monitores.
- 1.78-2.08 "POR FAVOR" en mono, con una sonrisa enorme de líneas verdes que se dibuja.
- 3.24-4.1 "NO CAMBIES NADA." gigante rojo con sacudón y todos los monitores muestran tu local
  con un sello rojo "SIN CAMBIOS".
- 4.1-6.8 SILENCIO: risa del villano en imagen (la sonrisa tiembla), los monitores parpadean, la
  mira se cierra lentamente sobre el monitor central, todo se oscurece despacio, tensión.
  6.8-7.16: estática de monitor (glitch fuerte) justo antes del corte.

**s10-cambia** (2.84 s). EL CORTE. "O cambiá todo, y no le des el gusto." (flash blanco en 0.0 = 41.44 global: ya lo hace ambiente)
- 0.0 la pared de monitores del villano SE ROMPE: los monitores salen volando para afuera (x/y
  hacia los bordes, rotaciones) y se apagan. 0.5 "CAMBIÁ" en Lexend 900 hueso GIGANTE (240px) con
  "TODO" debajo en verde Scalerics `#5ce611`. Luz.
- 1.52-2.08 "NO LE DES EL GUSTO": el sillón vacío del villano cae hacia atrás (rotation) o la mira
  roja se parte en dos.

**s11-hacemos** (4.02 s). "Bot de WhatsApp, puntos y web: lo hacemos nosotros."
- Tu local, ahora iluminado y vivo (líneas hueso y verde Scalerics, ventanas que se prenden), y tres
  cosas que se le conectan con un golpe cada una, en su palabra: 0.3 "BOT DE WHATSAPP" (un celular
  con burbuja verde que contesta), 1.3 "PUNTOS" (tarjeta de puntos que se llena), 1.96 "WEB" (una
  ventana de navegador con tu local y un pin). Líneas que las unen al local.
- 2.62-2.94 "LO HACEMOS NOSOTROS": una tilde grande verde que se dibuja (el logo de Scalerics ya está abajo,
  no lo dupliques).
- Etiqueta: "BOT · PUNTOS · WEB".

**s12-cta** (5.72 s). "Etiquetá a tu competencia. Que se entere."
- 0.0 "@" gigante en verde Scalerics que cae girando, y "ETIQUETÁ A TU COMPETENCIA" en hueso.
- 0.72 un comentario de Instagram simulado (globo hueso con un avatar circular y "@tu_competencia"
  en Plex Mono con el "@" verde), que se escribe solo; un corazoncito de "me gusta" que late.
- 1.88-2.06 "QUE SE ENTERE." gigante verde con sacudón.
- Después (sin voz): todo late suave; en el monitor viejo roto, chiquito en una esquina, el villano
  (silueta) se tapa la cara. Es la última escena: SIN salida, dura más que la voz.
