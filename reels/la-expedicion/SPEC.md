# Reel "La expedición": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: **CRM**. Formato C (lista en pasos, acá CAPAS)
contado por personajes: una EXPEDICIÓN ARQUEOLÓGICA debajo de la caja de tu local. La DOCTORA
PALA (arqueóloga canchera con sombrero, voz Gemini Zephyr) y su AYUDANTE (voz Puck, grita
"¡Capa uno, doctora!") excavan capa por capa: capa 1 post-its de este mes ("Llamar sin falta."
¿a quién? ¿cuándo?), capa 2 el cuaderno con escritura indescifrable ("¿esto dice cobrar o
llorar?"), capa 3 chats enterrados bajo stickers del grupo de la familia y cadenas de buenos días,
capa 4 EL FÓSIL: un presupuesto de marzo ("Lavarropas, Andrea. La llamo el lunes."), "¡esto
pertenece a un museo! ¡Llamen a Indiana Jones!". El DUEÑO (voz Charon) se asoma al pozo: "¡Eh,
eso es mío! Yo tengo todo en la cabeza. ¿Andrea? ¿Quién es Andrea?". GIRO de la doctora: "Compró
al otro día, en otro lado. Esta venta no se perdió por mala: se perdió porque estaba enterrada."
Entra el NARRADOR de Scalerics (Orus): "Desenterrá tus ventas con un CRM: quiénes son tus
clientes, qué te compraron, a quién le prometiste algo y a quién volver a escribirle. Todo en un
solo lugar." Cierre: "Etiquetá al que tiene una civilización perdida abajo de la caja."
Voz de 70.2 s, total 73.4 s.

## Recurso visual central: CORTE ESTRATIGRÁFICO en sepia
La pantalla es un corte de excavación visto de costado: arriba, el mostrador con la CAJA
registradora; abajo, franjas horizontales de tierra (capas) de distintos tonos de siena, con
objetos fosilizados incrustados. Cada CAPA es un capítulo: entra un número GIGANTE ("CAPA" en
Cinzel y el número ocre de ~420px) con una ficha de campo ("COTA -10 CM"), golpe de pico y nube
de polvo. Elementos del mundo: cuerdas de cuadrícula con estacas, pinceles que barren, la lupa,
el sombrero de la doctora, etiquetas de hallazgo, flechas de mapa del tesoro punteadas
terracota, la X del tesoro, sello de museo. Edición CARGADA: palabras clave gigantes que caen en
su palabra, sacudones de pico, nada quieto más de ~0.8 s.

## Personajes (dibujos genéricos propios, líneas arena con rellenos de la paleta)
- DOCTORA PALA: busto de líneas, sombrero de ala ancha ocre, pañuelo terracota al cuello,
  sonrisa de costado, una ceja levantada. Pincel en la mano.
- AYUDANTE: más chico, casco con linterna, ojos grandes; asoma con una pala cuando grita "¡Capa N!".
- DUEÑO: cara redonda con bigote y lentes asomando por el borde del pozo, ofendido.
- ANDREA: silueta simple de mujer con bolsa (solo en s10).
NADA que copie a Indiana Jones: ni su cara, ni su logo; solo el nombre en un rótulo mono chico
"REFERENCIA: INDIANA JONES" y un sombrero genérico.

## Paleta (SOLO estos colores)
- Tierra oscura `#170f09`: el fondo (lo pone el index) y rellenos oscuros.
- Siena `#8a5a36`: las capas de tierra (opacidades 0.25 a 0.75 para distinguir estratos).
- Arena/pergamino `#f1e3c2`: líneas de dibujo, textos grandes, papeles.
- Ocre `#e8ad3c`: números de CAPA, lo valioso (el fósil), el sombrero, acento de subtítulos.
- Terracota `#c4532d`: marcas X, flechas del mapa, sellos, cuerdas, tachaduras.
- Desde s11 (Scalerics): se suma verde Scalerics `#5ce611` para el CRM (tildes, ficha ordenada).
Brillo con drop-shadow ocre permitido en el fósil y en los números de capa.
Prohibido: emojis, fotos, rayas largas en textos visibles.

## Tipos de letra
- Cinzel 700 (`assets/fonts/Cinzel-var.woff2`): "CAPA N", "MUSEO", títulos de expedición.
- Lexend 800-900: palabras gigantes que golpean.
- Caveat 700 (`assets/fonts/Caveat-var.woff2`): letra a mano de post-its, cuaderno, presupuesto.
- IBM Plex Mono 500: rótulos de campo ("COTA -40 CM", "HALLAZGO N.º 4").
Nada que haya que leer de menos de 26px.

## Zona
Subtítulos arriba (y 236 a ~420). Contenido entre y 560 y y 1520, x 50-1030. Rótulo de ambiente
abajo a la derecha (y 1600): no taparlo. Logo en y ~1746.

## Lo que ya está hecho
- `armar.mjs` local: fondo tierra oscura con brillo de lámpara ocre; subtítulos arena con acento ocre.
- `compositions/ambiente.html`: cuadrícula de cuerdas de excavación finas que deriva despacio,
  polvo flotando, viñeta sepia, rótulo "EXPEDICIÓN · SECTOR CAJA"; NUBE DE POLVO (flash arena) en
  cada "¡Capa!" (9.72, 17.12, 24.67, 31.22) y en "museo" (40.6).

## Sonidos extra
`golpe` (pico), `martillo`, `redoble`, `braaam` (el fósil), `drama`, `uuh`, `magia`, `gong`,
`tiza`, `viento`, `trueno`, `beep`. Cada "¡Capa N!" lleva `golpe` + `impact-bass-2`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (paleta, rellenos, tipografías, brillos). Valen las reglas técnicas, entrada/salida,
> `.sfx.json` y la verificación.

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

## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-civilizacion** (5.70 s). "Debajo de la caja de tu local hay una civilización perdida. Y son tus clientes."
- Cuadro 0: el corte a medio dibujar: mostrador con la caja registradora (y ~800-960), la línea
  del suelo, y debajo cuatro franjas de tierra siena que se rellenan de arriba abajo.
- 0.70 "caja": la caja tiembla, una flecha terracota punteada de mapa baja hasta lo hondo con una X.
- 2.20-3.00 "civilización perdida": "CIVILIZACIÓN" Cinzel + "PERDIDA" ocre, caen con sacudón.
- 4.40 "clientes": en las capas aparecen clientes fosilizados (caritas de líneas como fósiles) y
  una etiqueta "HALLAZGO: TUS CLIENTES".

**s02-doctora** (4.02 s). "Doctora Pala, arqueología comercial. Traigan los pinceles."
- 0.0 la doctora entra desde abajo (busto grande), el sombrero cae sobre su cabeza en 0.4
  ("Pala"); credencial "DRA. PALA · ARQUEOLOGÍA COMERCIAL" en 0.8.
- 2.66 "traigan": pinceles que caen en abanico; en 3.05 barren polvo.

**s03-capa1** (7.40 s). "¡Capa uno, doctora! Post-its de este mes. «Llamar sin falta.» ¿Llamar a quién? ¿Sin falta cuándo?"
- 0.0 "CAPA 1" gigante con ficha "COTA -10 CM"; el ayudante asoma con pala.
- 1.83 la capa 1: post-its pegados en la tierra, torcidos.
- 3.77 un post-it gigante en primer plano, Caveat: "Llamar sin falta!!"
- 5.22 "¿A QUIÉN?" sello terracota; 6.68 "¿CUÁNDO?" otro sello; lupa sobre el post-it.

**s04-capa2** (7.55 s). "¡Capa dos! El cuaderno. Escritura antigua, indescifrable. ¿Esto dice «cobrar» o «llorar»?"
- 0.0 "CAPA 2", "COTA -25 CM".
- 1.28 el cuaderno espiralado sube de la tierra, abierto, con garabatos.
- 2.45-3.58 lupa que pasa por los garabatos; "ESCRITURA ANTIGUA" e "INDESCIFRABLE" sello.
- 5.98 "¿COBRAR?" y 6.68 "¿LLORAR?" como dos traducciones posibles de un garabato.

**s05-capa3** (6.55 s). "¡Capa tres! Chats enterrados bajo stickers del grupo de la familia y cadenas de buenos días."
- 0.0 "CAPA 3", "COTA -60 CM".
- 1.19 un celular enterrado; sobre él caen stickers genéricos (carita, taza, gatito de líneas) en
  2.84 y burbujas "¡Buenos días!" con florcitas en 4.69-5.43 que lo tapan. Una burbuja del cliente
  abajo, aplastada: "¿me pasás precio?".

**s06-capa4** (3.66 s). "¡Capa cuatro! ¡Doctora, encontramos un fósil!"
- 0.0 "CAPA 4" con temblor fuerte, "COTA -1,20 M".
- 1.18 el ayudante salta; 2.78 "fósil": una roca con un rectángulo que brilla ocre, "¡UN FÓSIL!".

**s07-fosil** (4.73 s). "Un presupuesto de marzo. «Lavarropas, Andrea. La llamo el lunes.»"
- El fósil: un presupuesto petrificado en roca. 0.12 "PRESUPUESTO"; 0.92 "MARZO" con círculo
  terracota; 1.71 "Lavarropas" y 2.59 "Andrea" en Caveat; 3.52 "La llamo el lunes" subrayado.
- Etiqueta "HALLAZGO N.º 4 · INTACTO".

**s08-museo** (3.81 s). "¡Esto pertenece a un museo! ¡Llamen a Indiana Jones!"
- 0.99 "museo": vitrina con frontón "MUSEO", el presupuesto sobre pedestal, placa "PIEZA ÚNICA ·
  NUNCA LLAMADO".
- 1.98-2.69 un sombrero genérico cae sobre la vitrina; rótulo "REFERENCIA: INDIANA JONES".

**s09-dueno** (6.22 s). "¡Eh, eso es mío! Yo tengo todo en la cabeza. ¿Andrea? ¿Quién es Andrea?"
- 0.0 el dueño asoma ofendido; "¡ES MÍO!" en 0.88.
- 1.28-2.58 su cabeza se vuelve un corte de tierra con papeles enterrados; "TODO EN LA CABEZA".
- 3.72 "¿ANDREA?" gigante; 5.18 signos de pregunta que giran, gota de sudor.

**s10-enterrada** (6.53 s). "Compró al otro día, en otro lado. Esta venta no se perdió por mala: se perdió porque estaba enterrada."
- 0.0-1.16 Andrea camina con una bolsa hacia "OTRO LOCAL"; sello "VENDIDO".
- 1.97-3.46 GIRO: la venta (billete ocre) intacta en lo hondo; "NO ERA MALA".
- 5.16 "ENTERRADA." gigante; la tierra se le cae encima con sacudón.

**s11-crm** (10.50 s). CORTE A SCALERICS (aparece el verde). "Desenterrá tus ventas con un CRM: ..."
- 0.0-0.83 la tierra se barre hacia los costados.
- 1.53 "CRM" y una ficha de cliente limpia (borde verde) con 4 renglones que se llenan con tilde
  verde: 2.81 "QUIÉN ES", 3.83 "QUÉ COMPRÓ", 5.83 "QUÉ LE PROMETISTE", 7.73 "ESCRIBIRLE HOY".
- 8.63-9.53 "TODO EN UN SOLO LUGAR": sello verde.

**s12-cta** (6.77 s). "Etiquetá al que tiene una civilización perdida abajo de la caja."
- La caja registradora con post-its, mapa del tesoro punteado hasta una X; "ETIQUETÁ" gigante,
  "@" que late, la doctora guiña desde una esquina. Última escena: SIN salida.
