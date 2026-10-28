# Reel "Son unos vagos": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, apps de
puntos y tiendas online para comercios), pensado para viralizar con polémica. Gancho:
"Los comerciantes uruguayos son unos vagos." Enseguida: "Eso no lo digo yo, lo dicen tus
clientes", con las frases que los clientes escuchan ("Cerrado por almuerzo", "Te contesto
mañana", "Solo efectivo", "No hay cambio", "Pasá el lunes, que hoy no vino el que sabe"). Cada
frase es un cliente que se fue. GIRO a la mitad: "Yo conozco comerciantes: abren a las siete,
cierran a las diez, atienden todo a la vez. Eso no es ser vago: es estar solo." El cliente solo
ve un mensaje en visto. Scalerics hace bots de WhatsApp que contestan a cualquier hora. Cierre:
"¿Son vagos o no tienen quién les conteste? Te leemos en los comentarios." Voz de 53 s.

## ESTILO: TIPOGRAFÍA GIGANTE (kinetic type) + carteles. NO es el estilo de líneas.
Las escenas se arman sobre todo con PALABRAS ENORMES (Lexend 700-900, mayúsculas) que entran de
golpe en la palabra exacta en que se dicen, más objetos gráficos planos y duros: carteles de
comercio, sellos de goma, una persiana metálica, celulares con UI. Edición CARGADA: cada palabra
clave es un corte, golpes de escala (de 3x a 1x en 0.12-0.16 s, ease power4.in), sacudones de
pantalla (5 tweens de x/y de 0.04 s), rotaciones de -6 a 6 grados, glitch (saltos de x de 10-20 px),
textos que se apagan a opacity 0.2 cuando entra el siguiente golpe. Nada quieto más de ~0.8 s.
Mirá `compositions/s01-bomba.html`: ES LA ESCENA MODELO. Copiá su estructura (divs HTML con
texto absoluto, `.s01-escenario` que tiembla, `gsap.set(...opacity 0)` + `fromTo` con
`immediateRender: false` para lo que entra después, salida de 0.2 s con zoom + blur).

## Paleta (SOLO estos colores)
- Negro `#09090a` (el fondo ya está; usalo como relleno de carteles o texto sobre amarillo).
- Hueso `#f4f1ea`: texto principal, trazos.
- Amarillo señal `#ffd60a`: lo que hay que mirar, cinta de peligro, carteles de comercio, la
  etiqueta mono, Scalerics/la solución.
- Rojo `#ff2d2d`: lo que acusa ("VAGOS", sellos, X, el cliente que se va, "visto"). Brillo
  permitido: `text-shadow: 0 0 40px rgba(255,45,45,0.45)` o drop-shadow del mismo rojo, 1-2
  cosas por escena.
- Gris acero `#8a8f98`: la persiana metálica, cosas apagadas.
- Verde WhatsApp `#25d366` SOLO en s10-bot y s11 (el bot que contesta, burbujas, tildes).
Rellenos planos permitidos. Prohibido: degradés de colores, emojis, fotos, serif, rayas largas
(—) en textos visibles.

## Tipos de letra
Lexend (variable, 100-900) para todo lo grande; IBM Plex Mono 500 para etiquetas, carteles chicos
y UI. Nada de menos de 26px que haya que leer.

## Zona
Los subtítulos de la narración están arriba (y 236 a ~420, los pone
`subtitulos.html`): las escenas NO escriben la frase narrada entera, muestran las PALABRAS CLAVE
gigantes y los objetos. Contenido entre y 540 y y 1560. El logo de Scalerics está en y ~1746 (no
lo tapes). Arriba y abajo de todo hay una cinta de peligro amarilla que corre (la pone
`ambiente.html`). La etiqueta mono amarilla de cada escena va en top 560 (como s01) o abajo en
top 1500; textos de 1-4 palabras.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo negro con brillo amarillo al centro y rojo abajo.
- `compositions/ambiente.html`: escaneo sutil, viñeta, cintas de peligro, y FLASHES de pantalla
  en segundos globales: blanco en 8.12, 21.06, 33.1; rojo en 2.2, 32.3, 49.4. No los dupliques;
  si cae uno en tu escena, que tu golpe visual coincida.
- `compositions/subtitulos.html`, `compositions/s01-bomba.html`.

## Recursos que se repiten (que se reconozcan entre escenas)
- **El sello de goma**: rectángulo con borde rojo de 10 px, rx 14, texto Lexend 800 rojo en
  mayúsculas, rotado -8 a -12 grados, cae de scale 2.4 a 1 en 0.16 s con sacudón. Lo usa s03.
- **La persiana metálica** de un local: rectángulo gris acero `#8a8f98` con franjas horizontales
  (líneas negras cada 34 px), que baja (translateY) o sube. Aparece en s03 y s05.
- **El celular**: rectángulo redondeado hueso (rx 52, borde 6 px), ~420x820, fondo negro adentro,
  UI de chat simple en Lexend/Plex Mono. Aparece en s09, s10, s11.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `beep`.
Cada golpe de palabra gigante lleva un sonido (impact-bass-1 bajo, click, pop o glitch-1).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración de líneas crema con acento verde; es tipografía gigante con
> la paleta de arriba, rellenos planos y brillos permitidos. Sí valen las reglas técnicas, la
> entrada/salida, el `.sfx.json` y la verificación con snapshot y check.

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
Lo que se dice está en los subtítulos; la escena lo ILUSTRA con palabras gigantes y objetos. Los
tiempos exactos por palabra están en `tiempos.md`. Seguí la idea; si se te ocurre algo con más
golpe, mejor.

**s01-bomba** (hecha). "LOS COMERCIANTES URUGUAYOS SON UNOS VAGOS." apilado; "VAGOS." rojo gigante.

**s02-clientes** (4.81 s). "Eso no lo digo yo. Lo dicen tus clientes. Y te lo dicen con estas frases."
- 0.0 "ESO NO LO DIGO YO" en hueso, 90px, entra con glitch, y unas manos/escudo no: mejor un
  micrófono de streaming (círculo + rectángulo, hueso) que se aparta.
- 1.79 "TUS CLIENTES" gigante amarillo (160px). Detrás aparece una fila de 5-7 siluetas de clientes
  (círculo + hombros, planas en gris acero), que hacen pop de a una (0.05 s de separación).
- 3.09-3.89 "CON ESTAS FRASES:" y globos de diálogo vacíos (hueso, borde 6 px) que saltan sobre
  las cabezas de las siluetas, preparando s03.
- Etiqueta abajo: "LO DICEN ELLOS".

**s03-frases** (5.15 s). Las cuatro frases. EL CORAZÓN DEL REEL: cada una es un SELLO rojo que cae
de golpe sobre la PERSIANA metálica de un local (la persiana ocupa x 140-940, y 640-1300, ya
baja en el cuadro 0, con un cartel amarillo arriba "ALMACÉN" en Lexend 800 negro sobre
amarillo).
- -0.00 "CERRADO POR ALMUERZO" (sello 1, arriba de la persiana, rotado -10).
- 1.08 "TE CONTESTO MAÑANA" (sello 2, rotado 8, un poco más abajo).
- 2.91 "SOLO EFECTIVO" (sello 3, rotado -6).
- 3.48 "NO HAY CAMBIO" (sello 4, rotado 11). Cada sello: cae de scale 2.4 a 1 en 0.14 s, sacudón de
  la persiana, sonido impact o click. Los anteriores quedan (se van amontonando, como afiches
  pegados). Que no queden ilegibles: superponelos un poco, no del todo.
- Un contador mono amarillo abajo: "CLIENTES PERDIDOS: 1 → 2 → 3 → 4" que sube con cada sello.

**s04-lunes** (3.16 s). "Pasá el lunes, que hoy no vino el que sabe."
- 0.0 "PASÁ EL" chico y "LUNES" gigante (220px, hueso) que entra girando.
- Un calendario de escritorio (rectángulo hueso con anillos arriba) que pasa hojas rápido: VIE,
  SÁB, DOM, LUN (flip con scaleY), en 0.43-1.4.
- 1.13-1.93 "HOY NO VINO EL QUE SABE" en dos líneas mono amarillo; al final, un cartelito colgado
  que se balancea "VUELVA PRONTO" (rotación de pendulo, -10 a 10, sine.inOut).
- Etiqueta: "EXCUSA Nº 5".

**s05-se-fue** (4.63 s). "Cada una de esas frases es un cliente que se fue a otro lado. Y no volvió."
- 0.0 los 4 sellos de s03 chiquitos en fila arriba (x 200-880, y 640), uno al lado del otro.
- 1.47 "UN CLIENTE" gigante. Una silueta de cliente (gris acero → hueso) camina desde el centro
  hacia la derecha (x), hacia una puerta con cartel amarillo "ABIERTO" del otro lado.
- 2.07-2.47 "SE FUE" rojo; la silueta sale de cuadro.
- 3.47 "Y NO VOLVIÓ." gigante rojo; la persiana de nuestro local baja de golpe hasta abajo con
  sacudón (golpe metálico: impact-bass-2). Contador "CLIENTES PERDIDOS: 4" queda arriba.

**s06-conozco** (4.94 s). EL GIRO. "Ahora, yo conozco comerciantes. Abren a las siete y cierran a las diez." (flash blanco en 0.0 de la escena = 21.06 global)
- 0.0 "AHORA..." y un sonido de disco que se frena (glitch-2). Todo cambia: la escena entra con
  un rebobinado (glitch de x y un barrido).
- 0.94 "YO CONOZCO COMERCIANTES" en hueso, más calmo pero firme.
- 2.60-4.34 un reloj grande (círculo hueso, agujas amarillas) que gira rápido de 7:00 a 22:00
  (la aguja corta da casi una vuelta y media); al lado "7:00" en Plex Mono amarillo gigante en
  3.04, que se convierte en "22:00" en 4.34. El sol (círculo amarillo) cruza y se vuelve luna.
- Etiqueta: "15 HORAS PARADO".

**s07-todo** (5.62 s). "Atienden el mostrador, la caja, los proveedores y el celular. Todo a la vez."
- Cuatro palabras gigantes que entran desde las cuatro direcciones y se acomodan en grilla 2x2 con
  un ícono plano cada una: 0.60 "MOSTRADOR" (un mostrador), 1.40 "CAJA" (caja registradora),
  2.20 "PROVEEDORES" (una caja de cartón con flecha), 3.20 "CELULAR" (celular vibrando, con
  ondas). Cada una con golpe de sonido.
- 4.11 "TODO A LA VEZ" en amarillo gigante encima de todo; la grilla empieza a girar y sacudirse
  como malabares (rotaciones alternadas, cada vez más rápido) hasta el final.

**s08-solo** (2.53 s). "Eso no es ser vago. Es estar solo." (flash rojo en 0.68 = 32.3 global, blanco en 1.48 = 33.1)
- 0.0 "VAGO" gigante rojo (como en s01) con 0.68 una raya amarilla que lo TACHA de golpe
  (rectángulo que crece con scaleX) y la palabra se rompe en dos mitades que caen (clip o dos
  copias con clip-path inset fijo, moviendo y/rotation).
- 1.48 "SOLO." gigante hueso (260px), sola en el centro, mucho aire alrededor. Silencio visual: que
  se vaya achicando despacito (scale 1 → 0.9) hasta el final. Ninguna otra cosa en pantalla.

**s09-visto** (3.44 s). "Pero el cliente no ve eso. Ve un mensaje en visto."
- 0.0-0.95 "EL CLIENTE NO VE ESO" con un ojo grande (forma de ojo, hueso) que se cierra (scaleY).
- 1.25-2.45 EL CELULAR entra desde abajo con un chat: burbuja del cliente "Hola, ¿tienen stock?"
  con hora 21:47, y abajo "Visto" en Plex Mono. En 2.45 los dos tildes se ponen azules no, ROJOS
  (tilde doble rojo) y aparece gigante cruzado sobre el celular "VISTO" en rojo con brillo,
  rotado -8, con glitch.

**s10-bot** (7.61 s). "Por eso hacemos bots de WhatsApp que contestan a cualquier hora, con tus precios y tus horarios, y te pasan la consulta cuando es para vos."
- 0.0 "POR ESO" chico, 0.51 "BOTS DE WHATSAPP" gigante (verde WhatsApp `#25d366` en "WHATSAPP").
- 1.81 EL CELULAR otra vez, el mismo chat de s09 pero ahora la respuesta llega al instante:
  burbuja verde "¡Hola! Sí, tenemos. Cerramos a las 22:00. ¿Te lo reservo?"; los mensajes se
  escriben con "escribiendo..." breve. Hora "21:47" y "03:12" (en 2.41 "cualquier hora": un reloj
  mono arriba del celular que salta 21:47 → 03:12 → 07:30).
- 3.71 "PRECIOS" y 4.41 "HORARIOS" como chips amarillos que salen del celular.
- 5.51-6.81 una flecha amarilla desde el celular a una silueta de dueño con un cartel "PARA VOS"
  y un pop de notificación.
- Etiqueta: "CONTESTA SOLO".

**s11-espera** (3.02 s). "Vos seguís con lo tuyo. Y el cliente no espera."
- Pantalla partida en dos: izquierda el dueño (silueta) atendiendo el mostrador tranquilo,
  "VOS SEGUÍS" arriba; derecha el celular con tilde doble verde, "EL CLIENTE NO ESPERA" con
  "NO ESPERA" en amarillo gigante en 2.0-2.1. Un cronómetro mono "00:03" al lado del celular.

**s12-cta** (8.31 s). "Entonces: ¿son vagos, o no tienen quién les conteste? Te leemos en los comentarios." (flash rojo en 1.18 = 49.4 global)
- 0.0 "ENTONCES..." mono amarillo.
- 1.02-1.58 "¿SON VAGOS" gigante rojo con sacudón (vuelve el s01).
- 2.19-2.88 "O NO TIENEN QUIÉN LES CONTESTE?" en hueso y amarillo, 3 líneas; "VAGOS" se apaga.
- 3.38-4.58 dos botones grandes tipo encuesta, uno al lado del otro: "VAGOS" (rojo) y "SIN AYUDA"
  (amarillo), con un cursor/dedo que va y viene entre los dos sin decidirse; abajo un globo de
  comentario hueso con "Te leemos en los comentarios" en Lexend 600 y un ícono de comentario que
  late.
- Después de 5.2 (ya no hay voz): todo queda latiendo suave hasta el final; en 6.5 el logo de
  Scalerics ya está abajo (lo pone index), no lo dupliques.
