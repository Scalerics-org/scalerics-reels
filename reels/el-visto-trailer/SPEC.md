# Reel "El Visto (tráiler)": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; acá vende UNA cosa: el
**agente de IA** que atiende el WhatsApp del comercio). Formato P: **TRÁILER DE PELÍCULA ÉPICA**.
La voz grave de los tráileres (Algenib) presenta "EL VISTO": "En un mundo donde los clientes
escriben a las once de la noche… un solo hombre se atrevió… a contestar el jueves." Placas de
tráiler ("Basada en hechos reales. Los tuyos.", "Del director de «Pasá el lunes»"), escenas
cortas con diálogo: la clienta (Leda) "Hola, ¿tenés en talle M?", el dueño, héroe trágico
(Charon), "Ahora no… estoy en la caja"; la clienta "¿Hola? ¿Seguís ahí?" y contesta el de enfrente
(Fenrir), canchero: "Hola, vecina. Sí, tengo en talle M. Te lo separo y te lo mando hoy."; el dueño
en cámara lenta: "¡No! ¡Era mi clienta!". Críticas falsas de póster: "Dos tildes azules de
cinco", "Te deja en visto de principio a fin". "Este verano… nadie contesta." GIRO: "Pero el
villano es otro. Este hombre tiene la mejor mercadería del barrio. Solo que está solo. Contra mil
mensajes." "Próximamente: la secuela." El dueño: "Esta vez… tengo refuerzos." Título: "EL VISTO 2:
LA VENGANZA DEL QUE CONTESTA". Entra Orus (Scalerics): el agente de IA que atiende al instante, a
cualquier hora, con precios y stock, toma pedidos, agenda, escribe al que preguntó y no compró;
"En Scalerics lo armamos a tu medida. ¿Qué actor haría de vos? Te leemos en los comentarios."
Voz de 70.3 s, reel de 73.5 s. Cinco voces.

## ESTILO: CINE ÉPICO (tráiler). Edición CARGADA.
Letterbox: franjas negras fijas arriba (y 0-480) y abajo (y 1440-1920) que pone `ambiente.html`
POR ENCIMA de las escenas: **todo lo que dibujes fuera de y 480-1440 no se ve**. Los subtítulos
quedan sobre la franja de arriba (como subtítulos de cine) y el logo sobre la de abajo.
Dentro del cuadro: gradación teal y naranja (sombras teal, luces naranja), personajes como
SILUETAS genéricas oscuras con luz de borde naranja de un lado y teal del otro, el brillo azulado
de los celulares en las caras. **Placas negras de tráiler** (rectángulo `#030405` que cubre el
cuadro 480-1440) con texto que se ACERCA LENTO (scale 1 → 1.08 en toda la placa). **Títulos dorados
metálicos** (Outfit 800, mayúsculas, espaciados, degradé de oro con `background-clip: text` y un
brillo que barre). Golpes de bombo y "braaam" en los títulos, silencio dramático, cortes con
flash, destellos de lente, polvo en el aire. Nada quieto más de ~0.8 s: la "cámara" siempre se
mueve (push-in lento o paneo).
Mirá `compositions/s01-mundo.html`: ES LA ESCENA MODELO. Copiá su estructura (`.s01-escenario`
con push-in, `.oro` con el brillo `.brillo` que barre, siluetas SVG con luz de borde, placa,
`gsap.set(...opacity 0)` + `fromTo` con `immediateRender:false`, salida de 0.25 s con blur).

## Paleta (SOLO estos colores)
- Negro cine `#030405` / `#05070a`: franjas, placas, siluetas (`#08161b`).
- Teal `#1f8a96` (sombras, luz de borde fría) y teal claro `#7fd9e3` (brillos de pantalla).
- Naranja `#ff8a2a`: luz cálida de borde, el fuego de los momentos épicos, lo que se pierde.
- Oro `#f2c45a` (degradé metálico `#fff3c8 → #f2c45a → #b07a1f → #f7d98a`): títulos, estrellas, laureles.
- Crema `#f3ead8`: textos de placa chicos, burbujas de chat.
- Azul tilde `#34b7f1`: SOLO las dos tildes del visto.
- Desde s13 (Scalerics): se suma verde Scalerics `#5ce611` para el agente (lo que contesta).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos de estudios, caras o nombres
de películas o actores reales. Los "laureles" de crítica son genéricos (sin nombres de festivales).

## Tipos de letra
Outfit 700-800 para títulos de tráiler (mayúsculas, letter-spacing 0.06-0.16em); Lexend 500-600
para burbujas de chat; IBM Plex Mono 500 para rótulos chicos (horas, "PRÓXIMAMENTE"). Nada que
haya que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Contenido entre y 520 y y 1400 (adentro del cuadro), x 50-1030. Las escenas NO escriben la frase
narrada entera (está en los subtítulos); escriben las placas y los títulos del tráiler.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo teal oscuro con brillo naranja abajo.
- `compositions/ambiente.html`: franjas, grano, polvo, gradación, viñeta, rótulo "TRÁILER
  OFICIAL" en la franja de abajo; DESTELLO DE LENTE en 6.6, 16.5, 35.6, 49.3, 53.1 y 66.0 y FLASH
  de corte en 8.01, 25.22, 28.95, 47.76, 53.0 y 57.37 (segundos globales). Si cae uno en tu
  escena, que tu golpe visual coincida.
- `compositions/subtitulos.html`, `compositions/s01-mundo.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `braaam` (el golpe grave de tráiler, 3 s: usalo en los títulos
grandes, vol 0.5-0.7), `bombo` (tambor grave, 1.4 s), `impact-bass-2`, `glitch-2`,
`whoosh-cinematic`, `riser`. En las escenas de diálogo, `notification` / `typing` / `pop` para
el chat.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es cine épico con la paleta de arriba,
> rellenos, degradés de oro y brillos. Sí valen las reglas técnicas, la entrada/salida, el
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
`tiempos.md` (relativos a cada escena).

**s01-mundo** (8.01 s, hecha). Skyline nocturno de barrio con ventanas que se prenden; en
"clientes" burbujitas de chat flotan sobre la ciudad; "once" reloj mono "23:00"; "un solo hombre"
silueta del dueño de espaldas, borde naranja; "contestar el jueves" título dorado "EL JUEVES"
con braaam.

**s02-hechos** (3.06 s). Placa negra. 0.0 "BASADA EN HECHOS REALES" (Outfit 700, crema, chico y
espaciado) que se acerca lento. 1.62 "LOS TUYOS." en oro, enorme, entra de golpe con bombo y
sacudón; una línea fina dorada debajo que se dibuja.

**s03-talle** (3.87 s). Plano partido en diagonal: arriba-izquierda la CLIENTA (silueta con pelo
largo, celular que le ilumina la cara de teal) y su burbuja "Hola, ¿tenés en talle M?" que se
tipea (0.0-0.9) con hora "23:12" mono; abajo-derecha el DUEÑO (silueta de hombre, luz naranja de
la caja registradora) detrás del mostrador: 1.83 el celular vibra sobre el mostrador, él lo mira
de reojo, 2.02 "ahora no…" (el celular se apaga), en 2.87 cartelito "CAJA" se ilumina. Cámara
lenta: push-in.

**s04-director** (3.39 s). Placa negra con brillo naranja detrás. 0.0 "DEL DIRECTOR DE" crema
espaciado. 1.61 "PASÁ EL LUNES" en oro metálico gigante (dos líneas: "PASÁ EL" / "LUNES") con
braaam y el destello de lente de ambiente (16.5 global = 1.56 relativo). Brillo que barre el oro.

**s05-enfrente** (6.89 s). El chat a pantalla del celular (marco del celular grande ~560x860 en
y 540-1400, interfaz oscura teal). 0.0 burbuja de la clienta "¿Hola?" y 0.19 "¿Seguís ahí?" con
las DOS TILDES AZULES que se encienden (sin respuesta, "en línea" que se apaga). 1.72 CORTE: del
otro lado de la calle, el local DE ENFRENTE (fachada con toldo naranja encendido, luz cálida), su
dueño (silueta canchera con lentes de sol) y su burbuja que llega al toque: "Sí, tengo en talle
M" (3.33), "Te lo separo" (4.84), "y te lo mando hoy" (5.78) + tilde de "visto" de ella y un
corazón no: un "¡Gracias!" de ella (6.3). Rótulo mono "EL DE ENFRENTE · 23:13".

**s06-no** (3.73 s). CÁMARA LENTA: el dueño de rodillas en la vereda, brazo estirado hacia la
clienta que cruza la calle hacia el local de enfrente (silueta chica que se aleja, bolsa en la
mano). 0.0 "¡NO!" (la escena desatura un poco y hace zoom lento), sacudón; 1.41-1.70 "¡Era mi
clienta!": la luz naranja del local de enfrente la envuelve. Lluvia en diagonal (líneas
teal finas, deterministas) para el drama.

**s07-criticas** (5.40 s). Placa negra de póster de críticas. 0.0 laureles dorados genéricos y
"DOS TILDES AZULES" + "DE CINCO": cinco tildes dobles en fila, las dos primeras se encienden azul
(0.46-0.75) y las otras tres quedan apagadas (crema 0.25). 2.31 segunda crítica, otros laureles
que entran: "«TE DEJA EN VISTO / DE PRINCIPIO A FIN»" en oro, con la firma "LA CRÍTICA"
(decorativo). Estrellitas que titilan.

**s08-verano** (3.57 s). Placa negra. 0.0 "ESTE VERANO…" crema espaciado, se acerca lento. 1.29
"NADIE" y 1.56 "CONTESTA" en oro enorme, con braaam y el destello de lente (35.6 global = 1.25).
Silencio visual después: solo el título respirando y polvo.

**s09-villano** (4.81 s). EL GIRO, más íntimo. Interior del local del dueño a la luz de la caja:
estantes con ropa doblada linda, percheros, todo con luz cálida. 0.29 "villano": un cartel
tachado "VILLANO" sobre la silueta del dueño (línea naranja que lo tacha). 2.62 "mejor
mercadería": los estantes se iluminan uno por uno (oro), rótulo "LA MEJOR DEL BARRIO". 4.0
"barrio": push-in a él.

**s10-mil** (5.03 s). El dueño solo, chiquito en el centro, y alrededor le LLUEVEN burbujas de
chat y notificaciones (grilla determinista, entran en cascada desde arriba y los costados, cada
vez más) hasta taparlo. 1.60 "solo." rótulo "UN HOMBRE". 2.49-3.24 "CONTRA MIL MENSAJES" en oro,
con bombo en "mil". La cámara tiembla con cada tanda.

**s11-secuela** (5.24 s). Placa negra. 0.0 "PRÓXIMAMENTE" (Plex Mono crema espaciado, se acerca)
y 1.59 "LA SECUELA" en oro con bombo. 3.02 corte (sin placa): el dueño de frente, heroico, contra
luz naranja, se da vuelta; 3.68 "refuerzos": a su lado se enciende una segunda silueta hecha de
luz TEAL clara con líneas (el agente de IA, una figura holográfica con un celular brillando en la
mano), con riser.

**s12-titulo** (4.37 s). EL TÍTULO. 0.0 "EL VISTO" en oro metálico gigante, 0.66 "2" enorme que
cae con braaam y destello de lente (53.1 global = 0.1); 1.78 "LA VENGANZA" y 2.73 "DEL QUE
CONTESTA" en una línea más chica (Outfit 700, crema con borde oro). Chispas naranjas que suben.
Brillo que barre el título.

**s13-agente** (8.42 s). Entra Scalerics (Orus). Mismo cine pero con el VERDE: un celular grande
(~520x860, y 540-1400) con el chat del local; arriba "Tu local · en línea" con un puntito verde.
Llega "¿Tenés en talle M?" (0.05) a las "23:47" y la respuesta del agente al instante (0.6, "IA"):
"¡Sí! Te queda uno en negro." (sin precio en pantalla). 3.23
"cualquier hora": reloj mono que gira 03:12. 4.32 "precios" y 5.04 "stock": chips "PRECIO" y
"STOCK: 1" (sin cifras de negocio). 5.41 "pedidos": chip "PEDIDO TOMADO" verde. 6.04 "agenda":
"Retiro: mañana 10:00" con un calendarito. 6.78-8.05 "le escribe al que preguntó y no compró": una
segunda burbuja saliente "¿Seguís interesada en la campera?". Etiqueta mono verde abajo
"AGENTE DE IA" (top ~1330).

**s14-cta** (7.70 s). Póster final: 0.27 "Scalerics" (el logo ya está abajo: acá un título "UNA
PRODUCCIÓN SCALERICS" en oro chico). 1.90 "¿QUÉ ACTOR HARÍA DE VOS?" gigante (Outfit 800 oro, 3
líneas) y una silueta de protagonista con un signo de pregunta en la cara, reflector naranja.
3.02-3.72 "TE LEEMOS EN LOS COMENTARIOS" en crema, con una burbuja de comentario que late.
Termina quieto pero respirando (push-in lento) hasta el final.
