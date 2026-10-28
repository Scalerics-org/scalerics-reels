# Reel "Dejé de comprar en el almacén": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: bots de WhatsApp, puntos de
fidelización, tiendas online y webs para comercios), pensado para viralizar con polémica. Es una
CONFESIÓN de un vecino: "Tengo que confesar algo. Dejé de comprar en el almacén del barrio. El
de Rubén, el de toda la vida. Y me duele, porque lo quiero." Cuenta tres días: el martes le
escribió y nunca le contestó; el jueves fue con tarjeta y "solo efectivo, flaco"; el sábado lo
buscó en Google y no aparecía. Mientras tanto el súper le manda ofertas al celular, le suma
puntos y le trae el pedido. "El súper no es mejor que Rubén. Pero me hace caso." Le habla a
Rubén: "no te quiero perder; el día que me contestes un WhatsApp, vuelvo." Cierre de Scalerics:
"Y si vos sos Rubén, se arregla: hacemos bots, puntos y la web. Mandáselo a tu almacenero." 56 s.

## ESTILO: PAPEL Y COLLAGE (la libreta del almacén). NO es el estilo de líneas.
Todo está armado con PAPELES sobre una mesa de madera oscura con la luz de una lamparita: hojas
de libreta rayada, recortes, cinta adhesiva, sellos, tickets, post-its, papeles que se pegan,
se arrugan (scaleY breve), se arrancan y vuelan. La letra MANUSCRITA (Caveat 700, birome azul o
marcador rojo) se "escribe" destapándose de izquierda a derecha con clip-path. Los objetos son
recortes de papel planos con sombra (`box-shadow: 0 10-18px 24-40px rgba(0,0,0,0.4-0.45)`),
siempre un poco rotados (-8 a 8 grados). Edición cargada: cada papel entra con golpe (cae con
rotación y back.out), sacudones de la mesa, cosas que se tachan con marcador, papeles que se
apilan. Nada quieto más de ~0.8 s.
Mirá `compositions/s01-confieso.html`: ES LA ESCENA MODELO. Copiá su estructura (divs HTML
absolutos, la hoja de libreta con renglones y margen, la cinta, el helper `escribir()` con
clip-path, el almacén de papel con toldo rayado y cartel amarillo, la salida de 0.22 s).

## Paleta (SOLO estos colores)
- Papel `#f3ead8` (hojas), papel viejo `#e9dcc0`, cinta `rgba(242,222,160,0.82)`.
- Birome azul `#2346a8`: lo que escribe el vecino.
- Marcador rojo `#e0342b`: tachar, círculos, lo que duele, toldo del almacén.
- Mostaza `#f2b632`: el cartel del almacén, la etiqueta mono, lo que hay que mirar.
- Marrón `#6b4a2e` y madera oscura (el fondo ya está): puertas, mostrador.
- Verde WhatsApp `#25d366` y el azul-gris del súper `#3b6e8f`: SOLO donde aparecen (el súper en
  s06-s07, WhatsApp en s09 y s11).
Sombras y rellenos planos permitidos. Prohibido: emojis, fotos, degradés de colores, rayas
largas (—) en textos visibles.

## Tipos de letra
Caveat 700 (manuscrita, `assets/fonts/Caveat-var.woff2`, con su @font-face como en s01) para lo
que escribe el vecino; Lexend 600-800 para carteles impresos; IBM Plex Mono 500 para tickets,
etiquetas y pantallas. Nada que haya que leer de menos de 28px (Caveat de menos de 56px se lee
mal: usalo grande).

## Personaje y objetos que se repiten (que se reconozcan entre escenas)
- **El almacén de Rubén**: el de s01 (frente papel viejo, toldo rayado rojo/papel, cartel
  mostaza "ALMACÉN", puerta marrón, dos vidrieras celestes `#a8c3d6`).
- **Rubén**: recorte de papel de un almacenero: cabeza redonda color piel `#d9a77c`, bigote
  marrón `#6b4a2e`, delantal blanco papel, brazos cruzados (formas planas). Aparece en s02, s04 y
  s08.
- **La hoja de libreta**: donde el vecino anota los días (s03, s04, s05 pueden ser renglones de
  la misma lista: "Martes ✗", no: sin símbolos raros, usar una X dibujada con marcador rojo).
- **El celular de papel**: rectángulo redondeado papel (rx 46) con pantalla `#1d2430`, ~380x720,
  UI simple en Plex Mono/Lexend. Aparece en s03, s06, s09, s11.

## Zona
Los subtítulos de la narración están arriba (y 236 a ~420, los pone `subtitulos.html`): las
escenas NO escriben la frase narrada entera. Contenido entre y 560 y y 1500. El logo de
Scalerics va en y ~1746 (no lo tapes). La etiqueta mono mostaza de cada escena va en top 1440
(como s01); 1-4 palabras.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo de madera oscura con luz cálida.
- `compositions/ambiente.html`: luz de lamparita que se hamaca, polvito flotando, viñeta, y
  FLASHES cálidos en segundos globales 3.0, 19.7, 39.8, 43.37. Si cae uno en tu escena, que tu
  golpe visual coincida.
- `compositions/subtitulos.html`, `compositions/s01-confieso.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `whoosh-cinematic`, `beep`. Papel que
cae: whoosh-short o pop; escribir: typing (vol 0.15-0.2, con "max"); tachar o sellar:
impact-bass-1 o click.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración de líneas crema con acento verde; es collage de papel con la
> paleta de arriba, rellenos, sombras y letra manuscrita. Sí valen las reglas técnicas, la
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
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Tiempos exactos por palabra en
`tiempos.md`. Seguí la idea; si se te ocurre algo con más golpe, mejor.

**s01-confieso** (hecha). Hoja de libreta "Confesión" + "Dejé de comprar en el almacén del barrio...", el almacén de papel.

**s02-ruben** (5.60 s). "Sí. El de Rubén. El de toda la vida. Y me duele, porque lo quiero."
- 0.0-0.81 el almacén de papel grande al centro (más grande que en s01, ~600 px de ancho).
- 0.81 "Rubén." RUBÉN aparece en la puerta (recorte que sube desde atrás del almacén) con un
  cartelito pegado con cinta "RUBÉN" en Caveat azul.
- 1.21-2.4 "toda la vida": una foto vieja de papel (borde blanco, tono sepia: rellenos marrones
  claros) que se pega al costado con el almacén y un Rubén joven sin bigote, y en Caveat "desde
  1987" no (sin cifras): "de toda la vida".
- 3.31 "me duele": el vecino (recorte simple, otro color de remera) se agarra el pecho; un
  corazón de papel rojo con una curita (cinta) se pega encima.
- Etiqueta: "EL DE SIEMPRE".

**s03-martes** (6.47 s). "Pero te cuento qué pasó. Un martes le escribí: ¿tenés pan de campo? Nunca me contestó."
- 0.0 la hoja de libreta otra vez, con "Martes" en Caveat azul grande que se escribe en 1.81.
- 2.45-3.91 EL CELULAR de papel entra pegado: chat con "Almacén Rubén", burbuja del vecino
  "¿Tenés pan de campo?" (aparece en 3.47 con pop) con hora "08:12".
- 4.98 "Nunca": la hora del celular corre rápido 08:12 → 13:40 → 21:55 (Plex Mono) y la burbuja
  sigue sola; abajo aparece "sin respuesta" en mono rojo. 5.41 una X de marcador rojo se
  dibuja sobre el celular entero (dos rectángulos rotados ±45 que crecen con scaleX).
- Etiqueta: "MARTES".

**s04-jueves** (4.13 s). "Un jueves fui con la tarjeta. Solo efectivo, flaco." (flash en 2.84 = 19.7 global)
- 0.0 "Jueves" en Caveat que se escribe arriba.
- 0.79-1.14 una tarjeta de crédito de papel (rectángulo `#3b6e8f` con chip mostaza y rayas)
  entra deslizando hacia el mostrador.
- 2.29-2.84 RUBÉN detrás del mostrador con un cartel de cartón escrito a mano con marcador:
  "SOLO EFECTIVO" que golpea sobre el mostrador (cae y rebota) en 2.54; en 2.84 "FLACO." en
  Caveat rojo gigante con sacudón. La tarjeta sale volando y girando.
- Etiqueta: "JUEVES".

**s05-sabado** (5.39 s). "Un sábado lo busqué en Google para ver a qué hora abría. No aparecía ni el local."
- 0.0 "Sábado" en Caveat.
- 0.91-1.31 una barra de búsqueda de papel (rectángulo papel con lupa dibujada) donde se
  "tipea" en Plex Mono "almacén rubén horario" letra por letra (clip-path por pasos).
- 3.29-4.21 los resultados: tres tarjetas de resultado que caen, ninguna es el almacén: dos
  dicen "Supermercado" (con su cartel azul-gris) y una "Farmacia"; un mapa de papel con pines
  azul-gris y el lugar del almacén VACÍO con un signo de pregunta de marcador rojo. En 3.29
  "No aparecía ni el local" el almacén de papel se pone gris y transparente (opacity 0.3) como
  un fantasma.
- Etiqueta: "SÁBADO".

**s06-super** (5.82 s). "Mientras tanto, el súper me manda las ofertas al celular, me suma puntos y me trae el pedido a casa."
- 0.0 "Mientras tanto..." en Caveat; el SÚPER entra: un edificio de papel grande y prolijo, azul-
  gris, con cartel "SÚPER" en Lexend 800 blanco.
- 1.32-2.32 EL CELULAR del vecino recibe: notificación "Ofertas de la semana" (pop) con un ticket
  de oferta que sale del celular.
- 3.24-3.62 "me suma puntos": una tarjetita de puntos con 5 casilleros que se sellan uno tras
  otro (sellos redondos azul-gris), "+10 puntos" en mono.
- 4.62-5.42 "me trae el pedido a casa": una bolsa de papel con el logo del súper viaja en una
  moto de papel (forma simple) de izquierda a derecha hasta una casita de papel.
- Etiqueta: "MIENTRAS TANTO".

**s07-caso** (4.51 s). "El súper no es mejor que Rubén. Pero me hace caso."
- Balanza de almacén de papel (de las de dos platos): en un plato el SÚPER, en el otro RUBÉN.
- 0.0-1.9 la balanza se inclina hacia Rubén ("no es mejor que Rubén"), un corazón rojo sobre
  Rubén.
- 2.9-3.3 "Pero me hace caso": cae sobre el plato del súper un CELULAR con globito verde de
  respuesta "¡Hola! Sí, te lo llevo." y la balanza se va de golpe para el lado del súper
  (rotación con back.out, sacudón). "ME HACE CASO" en Caveat rojo gigante.
- Etiqueta: "LA DIFERENCIA".

**s08-carta** (4.37 s). "Rubén, si estás viendo esto: no te quiero perder." (flash en 3.09 = 39.8 global)
- Una CARTA: hoja de libreta doblada que se despliega (scaleY de 0 a 1 en dos tiempos) y se
  escribe en Caveat azul: 0.0 "Querido Rubén:", 0.95-1.6 "si estás viendo esto...", 2.55-3.09
  "no te quiero perder." (subrayado rojo). Al costado, el recorte de RUBÉN con un celular en la
  mano, mirando la carta.
- Una gota (de llanto, celeste) de papel que cae sobre la carta y deja una mancha. Medio dramático,
  medio gracioso.
- Etiqueta: "CARTA ABIERTA".

**s09-vuelvo** (3.56 s). "El día que me contestes un WhatsApp, vuelvo." (flash en 2.29 = 43.37 global)
- EL CELULAR de papel en el centro con el chat de "Almacén Rubén": 0.12-1.32 la burbuja del
  vecino "¿Tenés pan de campo?" y abajo "escribiendo..." que late.
- 1.22 "WhatsApp": aparece la respuesta verde `#25d366` "¡Sí! Te lo guardo. Abrimos 8 a 21."
  con pop.
- 2.29 "VUELVO." en Caveat rojo gigante con sacudón, y el recorte del vecino entra caminando
  hacia el almacén de papel con la puerta abierta.
- Etiqueta: "PROMETIDO".

**s10-arregla** (2.31 s). "Y si vos sos Rubén, se arregla."
- Cambio de tono: la cámara (todo el contenedor) se acerca al almacén. 0.36-0.56 "SI VOS SOS RUBÉN"
  en Lexend 800 mostaza, gigante, que entra de golpe; 1.14-1.26 "SE ARREGLA": un rollo de cinta
  adhesiva que pasa y "arregla" el cartel torcido del almacén (cinta que se estira con scaleX
  y el cartel se endereza con rotación a 0). Rápido y con golpe.
- Etiqueta: "SE ARREGLA".

**s11-hacemos** (6.99 s). "Hacemos bots que contestan por vos, puntos para que tus clientes vuelvan y la web para que te encuentren."
- Tres papeles grandes que se pegan uno al lado del otro sobre la mesa (o en columna), cada uno
  con cinta y una ilustración plana:
  - 0.35 "BOTS" → EL CELULAR con burbuja verde que se contesta sola (escribiendo... y respuesta).
  - 2.45 "PUNTOS" → la tarjetita de puntos, ahora con el cartel mostaza del almacén, sellándose.
  - 4.85 "WEB" → una ventanita de navegador de papel con el almacén y un pin de mapa, y una
    lupa: ahora sí aparece.
- Los títulos en Lexend 800 sobre cada papel; con cada uno un golpe y sonido.
- Etiqueta: "LO HACEMOS NOSOTROS".

**s12-cta** (5.07 s). "Mandáselo a tu almacenero."
- 0.0 un sobre de papel (rectángulo papel viejo con solapa triangular) que se cierra con la
  carta adentro, se pega una estampilla mostaza con el cartel "ALMACÉN", y en Caveat azul
  "Para: tu almacenero". En 1.5 el sobre sale volando hacia la derecha girando (como enviado),
  y queda en Lexend 800 mostaza "MANDÁSELO" grande con una flecha de marcador rojo que apunta
  abajo a la derecha (al botón de compartir).
- Hasta el final: la flecha late, algo de papel sigue moviéndose. Es la última escena: SIN
  salida con blur, dura más que la voz.
