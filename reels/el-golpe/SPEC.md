# Reel "El golpe": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, puntos de
fidelización y webs para comercios), pensado para viralizar: polémico, pillo, con referencias.
Habla un LADRÓN PILLO (la competencia), canchero, que te explica en la cara su plan para robarte
los clientes, en pasos, como en una película de atracos: "Te voy a robar los clientes. Y te aviso
antes, porque soy así de pillo." Paso uno, como en La Casa de Papel: estudiar el banco (o sea,
vos: cerrás a las ocho, los domingos no existís, el WhatsApp lo contestás cuando te acordás).
Paso dos: entrar por donde no mirás (vos cuidás la caja; él entra por el celular a las once de la
noche). "Como dijo Heisenberg: yo no soy el que golpea la puerta. Soy el que contesta." Paso
tres: el disfraz (su local sale en Google, tiene web y puntos). Paso cuatro: la fuga (tu cliente
pasa por tu vidriera y sigue de largo: "¿Qué mirás, bobo? Andá pa' allá."; y vos le echás la
culpa al dólar). "¿Y el paso cinco? No hay paso cinco. Porque ya te diste cuenta." CORTE: entra
el narrador de Scalerics (otra voz): "Bot que contesta, puntos que retienen, web que te pone en
el mapa. Cerrale la bóveda: lo hacemos nosotros. Mandáselo al que dice: a mí no me roba nadie."
Voz de 64.6 s.

## ESTILO: PLANO DE ATRACO (blueprint) + película de robos. Edición CARGADA.
Todo se ve como el plan de un golpe dibujado sobre papel de plano azul: plantas de locales vistas
desde arriba en líneas celestes, rótulos técnicos en mono, cotas, flechas, rutas punteadas ROJAS
que se dibujan, clientes como puntitos amarillos que se mueven por las rutas, sellos rojos
("PASO 1", "CONFIRMADO", "OBJETIVO"), cronómetros de cuenta regresiva, fotos de vigilancia,
antifaz de ladrón. Cada "PASO N" es un CARTEL GIGANTE que entra de golpe (como un título de
capítulo de película de atracos: Lexend 900, número enorme amarillo, con un sello). Palabras
clave gigantes que caen en su palabra exacta, sacudones, glitch, la cámara que se mueve sobre el
plano (pan/zoom). Nada quieto más de ~0.8 s.
Mirá `compositions/s01-robar.html`: ES LA ESCENA MODELO. Copiá su estructura (SVG a pantalla
completa con clases `plano`/`plano-fino`/`ruta`/`cliente`/`rotulo`, textos HTML absolutos, el
`.s<NN>-escenario` que tiembla, `gsap.set(...opacity 0)` + `fromTo` con `immediateRender:false`,
la ruta que se destapa con clip-path y el cliente que se mueve por la ruta con
`getPointAtLength`, el antifaz, la salida de 0.2 s que barre a la izquierda como pasar la hoja).

## Paleta (SOLO estos colores)
- Celeste plano `#7fd4ff`: líneas del plano, rótulos.
- Hueso `#f2f4f8`: textos grandes.
- Amarillo `#ffd23f`: los clientes (puntitos), los números de PASO, lo valioso, el dinero.
- Rojo `#ff3b30`: rutas del robo, sellos, alarmas, X.
- Azul oscuro `#06142e` / `#050b18`: rellenos (antifaz, pantallas).
- Desde s13 (Scalerics): se suma verde Scalerics `#5ce611` para lo que protege (la bóveda que se
  cierra, los tildes), y el rojo pasa a ser lo que se frena.
Brillos con text-shadow/drop-shadow del mismo color permitidos (1-2 por escena). Prohibido:
emojis, fotos, degradés de colores, rayas largas (—) en textos visibles. NADA de logos ni
imágenes de La Casa de Papel, Breaking Bad o Messi: solo dibujos genéricos propios (una máscara
de teatro genérica, un sombrero negro de ala corta genérico, una camiseta con el 10, etc.).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos, horas, cotas. Nada que haya que
leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Los subtítulos de la narración están arriba (y 236 a ~420, los pone `subtitulos.html`): las
escenas NO escriben la frase narrada entera. Contenido entre y 560 y y 1520. Ancho: todo dentro
de x 50-1030 (ojo con las palabras gigantes: medí; "LOS CLIENTES" a 124px ya ocupa ~950 px).
El logo de Scalerics va en y ~1746; abajo a la derecha (y 1600) hay un rótulo "PLAN: EL GOLPE"
que pone ambiente.html: no lo tapes.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo azul plano.
- `compositions/ambiente.html`: grilla de plano que se desliza, viñeta, rótulo; ALARMA roja que
  titila en las esquinas en 0.3, 44.9 y 48.2; FLASH blanco en 3.58, 25.7 y 59.72 (segundos
  globales). Si cae uno en tu escena, que tu golpe visual coincida.
- `compositions/subtitulos.html`, `compositions/s01-robar.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `beep`
(alarma/cuenta regresiva), `riser`. Cada golpe de palabra lleva sonido; cada "PASO N" un
impact-bass-2 fuerte.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el plano de atraco con la paleta de
> arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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

**s01-robar** (hecha). Plano de tu local, "TE VOY A ROBAR / LOS CLIENTES", ruta roja, antifaz, "PILLO.".

**s02-banco** (5.18 s). "Paso uno, como en La Casa de Papel: estudiar el banco. O sea, vos."
- 0.0 cartel gigante "PASO 1" (el 1 amarillo enorme) con sello rojo "ESTUDIAR EL BANCO".
- 0.82-1.66 una máscara de teatro GENÉRICA (cara blanca lisa con sonrisa, líneas hueso; nada que
  copie la de la serie) que aparece y gira levemente, con rótulo mono "REFERENCIA: LA CASA DE
  PAPEL".
- 2.34-3.14 un edificio de banco de líneas (columnas, frontón) con "BANCO" que en 3.86-4.32 ("o
  sea, vos") se TRANSFORMA en tu local (el frontón se vuelve toldo; crossfade + glitch), con una
  mira roja y "VOS." gigante hueso.

**s03-horarios** (5.22 s). "Cerrás a las ocho. Los domingos no existís. Y el WhatsApp lo contestás cuando te acordás."
- Ficha de investigación tipo expediente (rectángulo de plano con clip y foto de tu local de
  líneas), con tres renglones que se llenan en su palabra con mono amarillo:
  - 0.6 "CIERRA: 20:00" + un reloj chico.
  - 1.38 "DOMINGOS: NO EXISTE" y una hoja de calendario con el DOM tachado en rojo.
  - 3.0-4.26 "WHATSAPP: CUANDO SE ACUERDA" con un celular con tildes grises y "visto hace 3 h".
- Al final un sello rojo "OBJETIVO FÁCIL" cae sobre la ficha con sacudón.

**s04-entrar** (4.46 s). "Paso dos: entrar por donde no mirás. Vos cuidás la caja."
- 0.0 cartel gigante "PASO 2" con sello "ENTRAR POR DONDE NO MIRÁS".
- 2.98-4.46 el plano de tu local (como s01) visto desde arriba: el dueño (puntito celeste grande
  con un ojo/cono de visión) parado al lado de la CAJA; su cono de visión (triángulo celeste
  translúcido) mira la caja; "LA CAJA" en mono. Afuera del cono, por detrás, una puerta trasera
  punteada que se abre sola.

**s05-celular** (5.62 s). "Yo entro por el celular, a las once de la noche, cuando tu cliente pregunta y nadie le contesta."
- 0.0-0.74 la ruta roja del ladrón entra al plano por un CELULAR dibujado en la pared (no por la
  puerta), con "YO ENTRO POR EL CELULAR".
- 1.54 un reloj de cuenta regresiva / reloj mono gigante "23:00" que golpea; la escena se
  oscurece (noche: luna de líneas).
- 3.26-5.06 un celular grande: un cliente (puntito amarillo con burbuja) pregunta "¿Tienen
  stock?" y la burbuja queda sola con "sin respuesta"; en 5.06 ("contesta") la ruta roja "agarra"
  al cliente y lo arrastra fuera del celular.

**s06-heisenberg** (5.56 s). "Como dijo Heisenberg: yo no soy el que golpea la puerta. Soy el que contesta." (flash en 0.9 = 25.7 global)
- 0.0-0.9 un sombrero negro de ala corta GENÉRICO (silueta plana, borde celeste) y lentes de
  sol que caen sobre la silueta del ladrón; en 0.9, sin escribir el nombre en
  grande: rótulo mono chico "CITA CÉLEBRE" y comillas gigantes amarillas.
- 1.98-3.26 una PUERTA de líneas que tiembla como si la golpearan con "TOC TOC" en mono, y
  "NO SOY EL QUE GOLPEA" en hueso; la puerta queda cerrada, nadie abre.
- 3.88-4.48 "SOY EL QUE" + en 4.48 "CONTESTA." GIGANTE amarillo con brillo, y un celular con una
  burbuja de respuesta que sale disparada. Sacudón.

**s07-disfraz** (5.12 s). "Paso tres: el disfraz. Mi local sale en Google, tiene web y tiene puntos."
- 0.0 cartel gigante "PASO 3" con sello "EL DISFRAZ".
- 2.02-4.26 el local del ladrón (líneas celestes, con antifaz chiquito en el cartel) se "viste":
  en 2.88 ("Google") un pin de mapa rojo y una barrita de búsqueda que lo muestra primero; en
  3.42 ("web") una ventana de navegador con su local; en 4.0-4.26 ("puntos") una tarjeta de
  puntos llena. Cada cosa se le pega con un golpe y un brillo. "IMPECABLE" en mono al final.

**s08-bando** (3.26 s). "Tu cliente ni se da cuenta de que se cambió de bando."
- Una línea divisoria en el medio (tu local a la izquierda, el del ladrón a la derecha), y el
  cliente (puntito amarillo grande con dos ojitos) camina de izquierda a derecha cruzándola
  tranquilo, silbando (notas musicales de líneas). En 2.5 ("bando") una banderita/brazalete que
  cambia de color al cruzar; "CAMBIÓ DE BANDO" con un sello rojo.

**s09-fuga** (5.72 s). "Paso cuatro: la fuga. Tu cliente pasa por tu vidriera, te mira y sigue de largo."
- 0.0 cartel gigante "PASO 4" con sello "LA FUGA".
- 2.14-5.08 vista de frente de tu VIDRIERA (rectángulo grande de líneas con tu cartel) y el
  cliente (silueta de líneas, ahora de cuerpo entero) que pasa caminando de derecha a izquierda;
  en 4.24 ("te mira") gira la cabeza, en 4.72 ("sigue de largo") sigue caminando y sale de
  cuadro. Flechas de movimiento rojas.

**s10-bobo** (2.12 s). "¿Qué mirás, bobo? Andá pa' allá." (alarma en 0.44 = 44.9 global)
- EL MOMENTO MÁS GRACIOSO. Una camiseta de fútbol GENÉRICA de líneas (rayas verticales celestes,
  número 10 amarillo, SIN escudos ni marcas) de espaldas, y "¿QUÉ MIRÁS, BOBO?" gigante en hueso
  con "BOBO" amarillo que cae con sacudón en 0.52; en 1.12-1.64 "ANDÁ PA' ALLÁ" con una flecha
  roja enorme que señala a la derecha y todo se desliza hacia allá. Rótulo mono chico
  "REFERENCIA: QATAR 2022".

**s11-dolar** (2.38 s). "Y vos le echás la culpa al dólar." (alarma en 1.62 = 48.2 global)
- Un billete de dólar de líneas GENÉRICO (rectángulo con "$" y "1" en las esquinas, sin retrato)
  gigante; en 1.22 ("culpa") un dedo/flecha roja lo señala y cae un sello rojo "CULPABLE" sobre
  el billete; en 1.68 ("dólar") "AL DÓLAR" gigante con un "¿?" y el billete se encoge de hombros
  (se inclina). Tono irónico.

**s12-cinco** (5.00 s). "¿Y el paso cinco? No hay paso cinco. Porque ya te diste cuenta."
- 0.0-0.42 el cartel "PASO 5" empieza a entrar como los otros… y en 1.58 ("No hay") se rompe,
  queda vacío, glitch, el número 5 se cae y rebota, "NO HAY PASO 5".
- 3.04-4.0 "YA TE DISTE CUENTA" en hueso, con el plano del golpe entero (mini) que
  se TACHA con una X roja gigante, y el antifaz se cae.
- Etiqueta mono: "PLAN CANCELADO".

**s13-boveda** (7.86 s). EL CORTE A SCALERICS. "Bot que contesta, puntos que retienen, web que te pone en el mapa. Cerrale la bóveda: lo hacemos nosotros." (flash en 5.76 = 59.72 global)
- Tu local en el centro (líneas hueso, ahora iluminado con verde Scalerics `#5ce611`). Tres
  cerrojos/candados que se le ponen en su palabra: 0.0 "BOT QUE CONTESTA" (celular con burbuja
  verde), 1.48 "PUNTOS QUE RETIENEN" (tarjeta con sellos verdes; los clientes amarillos se quedan
  adentro), 2.9 "WEB EN EL MAPA" (pin verde). Las rutas rojas del ladrón chocan contra cada cosa
  y se rompen.
- 5.12-5.76 una PUERTA DE BÓVEDA circular gigante (círculos concéntricos, rueda de manija) que se
  cierra girando sobre tu local en 5.76, con golpe metálico y flash; "CERRADA" en verde.
- 6.52-6.88 "LO HACEMOS NOSOTROS" en hueso con "NOSOTROS" verde.

**s14-cta** (6.00 s). "Mandáselo al que dice: a mí no me roba nadie."
- 0.0 "MANDÁSELO AL QUE DICE:" en mono, y un globo de diálogo gigante con la frase "A MÍ NO ME
  ROBA NADIE" en hueso; en 1.5-2.3 sobre el globo se dibuja el antifaz del ladrón que le guiña
  (un ojo se cierra) y un sello rojo "FAMOSAS ÚLTIMAS PALABRAS".
- Una flecha roja de marcador hacia el botón de compartir (abajo a la derecha).
- Es la última escena: SIN salida, todo late suave hasta el final.
