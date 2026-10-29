# Reel "El examen": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: SITIO WEB (nada de agentes ni puntos). Formato A
(polémica con giro) en clave de EXAMEN DE LICEO URUGUAYO (escala del 1 al 12). Habla un PROFESOR
severo y sarcástico (voz Algenib) que corrige el negocio del que mira: "Tu negocio se sacó un dos.
Y lo corregí yo." Pregunta uno: el horario ("consultar por privado". Mal.). Pregunta dos: dónde
quedás (un pin que lo mandó a otra cuadra, tres vueltas a la manzana. Mal.). Pregunta tres: la
página web ("En construcción" desde hace años: un terreno baldío con cartel). "Nota final: dos.
¡A marzo!" Un ALUMNO protesta (voz Puck): "¡Pero profe! ¡Si lo mío es buenísimo!". GIRO: el profe
baja el tono: fue de incógnito, atendés bárbaro, la mercadería es de doce; lo que reprueba es la
vidriera: tu cliente te busca en el celular y no te encuentra. Juicio del profesor: "tiene
condiciones, pero no las muestra". Una página rápida con horario, cómo llegar y botón a WhatsApp,
y "salvás en diciembre". Entra Orus (Scalerics): "Tu sitio web lo hacemos nosotros. Ponete nota en
los comentarios, del uno al doce." 66.6 s.

## ESTILO: PIZARRÓN Y HOJA DE EXAMEN
- Fondo: pizarrón verde (lo pone `armar.mjs`) con marco de madera, borrones de tiza, canaleta con
  tizas y borrador abajo (y 1612-1666), "EXAMEN · 4° B" arriba a la izquierda y "Montevideo,
  diciembre" en tiza arriba a la derecha (y ~112-160): todo eso lo pone `compositions/ambiente.html`.
- Dos materiales que se alternan:
  1. **TIZA en el pizarrón**: dibujos de líneas blancas tiza `#f2efe6` (trazo 6-7, round, con
     filtro `url(#...-tiza)` de feTurbulence+feDisplacementMap suave para que se vea a tiza, o sin
     filtro si molesta), letra a mano Caveat 600-700 en tiza; lo que corrige va en ROJO tiza.
  2. **HOJA DE EXAMEN**: papel crema `#f3ead2` con renglones azules claros `#9fb4d9` y margen rojo,
     levemente girada (-2 a 3°), con sombra corta `rgba(0,0,0,0.35)`. Las preguntas impresas en
     IBM Plex Mono 500 color `#2b2b2b`; las respuestas del alumno en Caveat azul birome `#1d3fa8`;
     la corrección en birome ROJA `#d42a1f`: tachones, círculos, "Mal.", la nota gigante.
- Edición CARGADA: la nota y los "Mal." caen como sello (scale 2.5→1, power4.in, 0.14 s) con
  sacudón del escenario (4 saltos x/y de 0.04 s), los tachones y círculos se DIBUJAN rápido
  (0.25-0.4 s), nada quieto más de ~0.8 s, zoom lento constante sobre la hoja.
- Salida de cada escena: 0.2 s, `opacity 0 + blur(6px)` (como un barrido de borrador) o la hoja
  que sale volando de costado.

## Paleta (SOLO estos colores)
- Verde pizarrón `#1d4033` / `#10261e` (fondo, rellenos sobre el pizarrón).
- Blanco tiza `#f2efe6`.
- Rojo corrección `#d42a1f` (sobre papel) y `#ff5a4a` (rojo tiza sobre el pizarrón; también el
  acento de los subtítulos).
- Papel crema `#f3ead2`, renglones `#9fb4d9`, tinta impresa `#2b2b2b`.
- Azul birome `#1d3fa8`.
- Madera `#4a3324` (solo ambiente).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos de marcas reales (el botón de
WhatsApp es un rectángulo con la palabra, sin logo).

## Tipos de letra
Caveat 600-700 (`assets/fonts/Caveat-var.woff2`) para la mano del profe, del alumno y la tiza;
Lexend 800-900 para palabras gigantes; IBM Plex Mono 500 para lo impreso. Mínimo 28px lo que hay
que leer (Caveat mínimo 40px porque es chica).

## Zona
Subtítulos arriba (y 236 a ~420). Contenido de las escenas entre y 560 y y 1540. Logo en y ~1746.

## Lo que ya está hecho
`index.html`, `compositions/subtitulos.html` (los genera `armar.mjs`), `compositions/ambiente.html`
(flashes rojos en 1.4, 10.25, 19.56, 31.0, 32.2; flash tiza en 36.66; borrador que barre en 58.3:
segundos globales).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá no hay líneas crema ni verde Scalerics; es pizarrón, tiza y hoja de examen con la
> paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
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


## Escenas
Tiempos exactos en `tiempos.md` (relativos a cada escena).

**s01-dos** (4.19 s). "Tu negocio se sacó un dos. Y lo corregí yo."
- Cuadro 0: la hoja de examen ya en pantalla (entra desde abajo girando), encabezado impreso
  "NOMBRE: TU NEGOCIO" (escrito en birome azul) y "NOTA:" con un recuadro vacío; renglones con
  respuestas garabateadas en azul.
- 1.40 "dos": un "2" ROJO GIGANTE (Caveat 700, ~560px) cae como sello sobre la hoja, flash rojo,
  sacudón; en 1.7 se dibuja un círculo rojo a mano alrededor y dos subrayados.
- 2.80 "corregí yo": entra en diagonal una birome roja (dibujo plano: cuerpo rojo, punta) que
  firma "Prof." en rojo abajo a la derecha. Zoom lento hacia el 2.

**s02-horario** (6.56 s). "Pregunta uno: ¿cuál es tu horario? Respuesta: consultar por privado. Mal."
- La hoja más de cerca: "1." gigante en rojo al margen y la pregunta impresa "¿Cuál es tu horario?"
  (mono) que se tipea en 0.5-1.8 s.
- 3.61 "consultar": la respuesta en Caveat azul se escribe sola (revelado de izquierda a derecha
  con clip): "consultar por privado" + un reloj de tiza chiquito con signo de pregunta.
- 6.06 "Mal.": un tachón rojo doble cruza la respuesta y "MAL." rojo cae como sello con un "0"
  rojo en el margen. Sacudón.

**s03-pin** (6.63 s). "Pregunta dos: ¿dónde quedás? Un pin que me mandó a otra cuadra."
- PIZARRÓN: "2. ¿Dónde quedás?" en tiza arriba (y ~600). Un plano de manzanas de tiza (cuadrícula
  de 3x3 calles) que se dibuja en 0-1.5 s; tu local marcado con una casita de tiza.
- 3.95 "pin": un pin rojo cae y rebota en OTRA manzana. 5.35 "otra cuadra": línea punteada roja
  del pin a la casita y "ACÁ NO ES" en Caveat rojo con flecha.

**s04-vueltas** (3.43 s). "Di tres vueltas a la manzana. Mal."
- La manzana en grande y un muñequito de tiza (palito) que corre alrededor: tres vueltas
  (0.2-2.0), con palotes de conteo "I, II, III" que aparecen en tiza en cada vuelta.
- 2.18 "Mal.": "MAL." rojo gigante (rojo tiza) cae como sello, el muñequito se desploma.

**s05-construccion** (5.93 s). "Pregunta tres: tu página web. En construcción. Desde hace años."
- La hoja de examen de nuevo: "3." rojo en el margen y "Tu página web" impreso.
- 1.49 "página web": se dibuja en birome azul un celular sobre la hoja; adentro, cinta de obra a
  rayas rojo/crema y un cono; en 2.79 "En construcción" cae un cartel impreso "EN CONSTRUCCIÓN".
- 4.33 "Desde hace años": telarañas de birome se dibujan en las esquinas del celular, el cartel se
  despinta (opacity), y una flecha roja con "¡¿AÑOS?!" en Caveat.

**s06-baldio** (2.83 s). "Eso es un terreno baldío con cartel."
- PIZARRÓN: un terreno baldío de tiza: alambrado, yuyos, un cartel torcido "EN CONSTRUCCIÓN"
  clavado; una planta rodadora cruza rodando (x de 1100 a -100 rotando). "TERRENO BALDÍO" en
  Caveat tiza grande en 0.95 "terreno".

**s07-marzo** (3.91 s). "Nota final: dos. ¡A marzo!"
- "NOTA FINAL:" en Caveat tiza que se escribe; 1.43 "dos" un "2" ROJO enorme (~720px Lexend 900 o
  Caveat) cae, flash rojo, sacudón fuerte. 2.59 "¡A marzo!": sello rectangular rojo rotado
  "¡A MARZO!" que golpea encima, y una hoja de almanaque "MARZO" que cae detrás. Todo tiembla.

**s08-profe** (3.20 s). "¡Pero profe! ¡Si lo mío es buenísimo!"
- Un alumno de tiza (cabeza redonda, pelo parado, brazo en alto) que salta; globo de diálogo
  tiza "¡PERO PROFE!" en 0.0 y en 1.52 "¡ES BUENÍSIMO!" que rebota. Gotitas de queja.

**s09-incognito** (5.66 s). "Ya sé. Por eso me da bronca. Fui de incógnito. Atendés bárbaro, y la mercadería es de doce."
- EL GIRO. El profe de tiza (cabeza calva, lentes, bigote) aparece de frente, se saca los lentes
  (0.0-1.3). 1.42 "Fui de incógnito": le caen sombrero, lentes oscuros y bigote falso.
- 3.23 "Atendés bárbaro": tilde azul grande en una libretita; 4.92 "doce": un "12" ROJO
  enorme circulado con "MUY BIEN" en Caveat. Esta vez la nota es buena: rebote alegre, no sacudón.

**s10-vidriera** (5.54 s). "Lo que reprueba es la vidriera. Tu cliente te busca en el celular antes de salir. Y no te encuentra."
- 0.0-1.2 tu local de tiza con una vidriera llena de cosas lindas; 0.76 "vidriera": la vidriera
  queda rodeada por un círculo rojo y "REPRUEBA" en rojo.
- 1.76-3.46 un celular de tiza grande al centro: buscador con lupa, se tipea "tu negocio" y gira el
  cargador. 4.46 "no te encuentra": "SIN RESULTADOS" y una X roja gigante. Sacudón.

**s11-juicio** (4.12 s). "Juicio del profesor: tiene condiciones, pero no las muestra."
- Un boletín (papel crema con tabla) entra: "JUICIO DEL PROFESOR:" impreso; 1.42 se escribe en
  birome roja "Tiene condiciones," y 2.57 "pero no las muestra." en dos renglones, con subrayado
  rojo doble en "no las muestra".

**s12-salvas** (6.30 s). "Una página que cargue rápido, con tu horario, cómo llegar y un botón a WhatsApp, y salvás en diciembre."
- Un celular de tiza grande en el centro; 0.2-1.2 "cargue rápido": barra de carga que se llena de
  golpe. 1.9 "horario": tarjeta "HORARIO" con líneas; 2.3 "cómo llegar": mapa chico con pin (ahora
  en el lugar correcto, con tilde); 3.4 "botón a WhatsApp": botón rectángulo "ESCRIBINOS POR
  WHATSAPP". Cada bloque hace pop con tilde azul al lado.
- 4.43 "salvás en diciembre": nota roja "12" circulada en tiza al costado + "¡SALVÁS EN DICIEMBRE!"
  Caveat tiza grande. Rebote.

**s13-cta** (8.30 s). Orus: "Tu sitio web lo hacemos nosotros. Ponete nota en los comentarios, del uno al doce."
- El pizarrón recién borrado (ambiente barre en 0.0). "TU SITIO WEB" gigante en tiza (Lexend 900
  tiza) en 0.0, subrayado; "LO HACEMOS NOSOTROS" en Caveat en 1.0.
- 2.40 "Ponete nota": recuadro "TU NOTA:" con un espacio vacío; 3.8-4.6 la fila de números 1 a 12
  en Caveat que aparecen en cascada; un círculo rojo que va saltando de número en número y queda
  titilando sobre el casillero vacío "?". "EN LOS COMENTARIOS" en mono abajo. Queda animado hasta el
  final (rebote suave del "?").
