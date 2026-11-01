# Reel "Cadena perpetua": spec

Reel vertical 1080x1920 de Scalerics. Tema: AUTOMATIZACIONES (los pedidos de WhatsApp que pasan solos
a la planilla, el aviso de "tu pedido está listo" que sale solo, el recordatorio de pago, el reporte).
Formato C: DÍAS EN PASOS, con números gigantes de capítulo ("DÍA 1", "DÍA 30", "DÍA 300", "DÍA 1.247",
"DÍA 1.248"), dentro de una PELÍCULA DE CÁRCEL. El VETERANO de la celda de al lado (voz Algenib, grave)
abre: "Te condenaron a cadena perpetua, pibe. Y el juez fuiste vos." El DUEÑO del almacén, preso de
uniforme naranja (voz Charon, cansado), cuenta su condena por días: día 1, un pedido de WhatsApp a la
planilla, "¿qué me va a costar?"; día 30, veinte por noche, copiar/pegar, una rayita de tiza por noche;
el GUARDIA (Fenrir) pasa lista: "¡Recluso del almacén! ¡Otra vez el reporte a mano!"; día 300, a las
once, uno por uno "tu pedido está listo", "me debés el de marzo". La ley del penal: "el que copia y pega
no sale nunca". Día 1.247: consiguió una cuchara, como en Sueños de libertad (solo nombrada); "¿un túnel
con una cuchara? mientras cavás te entran cuarenta pedidos"; la leyenda del pibe que se escapó por la
ventana del baño: "contrató al sobrino para copiar; ahora están presos los dos". GIRO: "No hay túnel. Hay
una llave." Entra Scalerics (Orus): la llave son las automatizaciones; la celda se abre. El guardia pasa
lista a una celda vacía ("¿Recluso?"). Día 1.248, nueve de la noche: el dueño en el cumpleaños de su
vieja. CTA (Orus): "¿Cuántas rayitas de tiza llevás vos? Contanos en los comentarios."
Voz armada por partes (partes/voces.sh → tiempos.sh → componer.mjs): 71.9 s; reel 75.1 s.

## ESTILO: CELDA DE CÁRCEL DE PELÍCULA
Pared de bloques de cemento gris (fondo en armar.mjs), luz amarilla de una lamparita arriba, sombras
diagonales de rejas y dos barrotes en primer plano a los costados (ambiente.html; se abren hacia afuera en
51.45, cuando entra la llave). Arriba: cartel "PENAL DEL ALMACÉN · CELDA 14" y contador "DÍA" en tiza que
cambia en cada "Día". Abajo a la izquierda, chapa de quién habla (RECLUSO 1247 naranja · EL VETERANO
amarillo · GUARDIA azul · SCALERICS verde). Personajes planos con contorno negro grueso: el dueño
(uniforme naranja con número 1247, ojeras, bigote, pelo ralo), el veterano (barba gris, gorro de lana azul
noche, escarbadientes) y el guardia (gorra azul con chapa amarilla, bigote, bastón). Marcas de tiza
(grupos de cinco) dibujándose. Números de capítulo gigantes en Black Ops One.

## Paleta (SOLO estos)
- Cemento `#4a4d52` `#33363b` `#2a2d32`, fondo `#121418`, acero `#7b7f86` `#6b6e73`.
- Naranja uniforme `#ff8a1f` (y sombra `#d9731a` `#b85f12`): uniforme, sellos, acento del dueño.
- Blanco tiza `#f2f0e6`: tiza, textos grandes, papel. Piel `#efe4cf`.
- Azul noche `#1d2b4a` `#2c3d63` (y claro `#8fb4ff` para el guardia): ventana, gorro, uniforme del guardia.
- Amarillo lámpara `#ffd25a`: lamparita, la luna, la llave, acento del veterano.
- Contornos `#111317`. Desde s11 (entra Scalerics) se suma verde `#5ce611` para lo automático.
Subtítulos: crema con sombra; acento naranja (dueño), amarillo (veterano), azul (guardia), verde (Scalerics).

## Tipos de letra
Black Ops One (números de capítulo, sellos, carteles), Caveat 700 (tiza), IBM Plex Mono 600 (rótulos),
Lexend (pantallas de celular y planilla).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1540. Chapa en y 1566-1670 (izquierda) y logo
en y 1746: no taparlos. Barrotes de ambiente en x 0-30 y 1050-1080.

## Lo que hace ambiente.html (segundos globales)
Contador DÍA: 0 → 1 (4.88) → 30 (9.65) → 300 (20.53) → 1.247 (29.77) → 1.248 (63.57). Parpadeo de la
luz en 16.85 y 60.62 (guardia). Flash amarillo en 49.42 ("llave") y 51.89 ("Scalerics"); los barrotes se
abren en 51.45.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es la celda con la paleta de arriba). Sí valen las reglas técnicas.

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


## Escenas (tiempos en tiempos.md)
**s01-condena** (4.88). El VETERANO de frente detrás de los barrotes de su celda, lamparita que se hamaca, escarbadientes; sello "CADENA PERPETUA" en "cadena" (0.78); en "juez" (2.87) cae el martillo de juez y "EL JUEZ:"; "VOS." gigante naranja en 3.91.
**s02-dia1** (4.77). "DÍA 1" golpea; el dueño (fresco, sonriente) sube desde abajo; celular "¿Me mandás 2 kg de yerba?" en "pedido" (0.92); planilla PEDIDOS.XLS con una sola fila en "planilla" (2.83) y "UN SOLO PEDIDO"; pulgar arriba y primera rayita de tiza en "¿Qué me va a costar?" (3.69).
**s03-dia30** (7.20). "DÍA 30"; dueño con ojeras; se apilan seis mensajes y sello "20 POR NOCHE" (0.88); teclas CTRL C / CTRL V que se hunden en cada copiar/pegar (2.40, 3.10, 3.90, 4.73); en "rayita" (5.50) once grupos de cinco marcas de tiza llenan la pared.
**s04-guardia** (3.68). El GUARDIA pegado a la reja golpea los barrotes con el bastón en "¡Recluso" (0.0) y "almacén" (0.62); la hoja "REPORTE DEL DÍA" escrita a mano entra en "reporte" (2.23) y sello "A MANO" (2.76).
**s05-dia300** (5.15). "DÍA 300"; ventana alta con luna; celular "Enviando... (1 de 20)"; reloj "23:00" en "once" (1.42) y "UNO POR UNO"; cinco "Tu pedido está listo" (2.33) y dos "Me debés el de marzo" naranja (3.83).
**s06-ley** (4.09). "LEY DEL PENAL N.º 1": el veterano escribe en tiza palabra por palabra "Acá adentro, el que copia y pega no sale NUNCA." (NUNCA amarillo y subrayado en 3.04).
**s07-cuchara** (5.06). "DÍA 1.247"; el dueño con barba mira a los costados; saca la cuchara con brillo (2.32-2.75), túnel dibujado en tiza y "PLAN: TÚNEL"; recorte "COMO EN SUEÑOS DE LIBERTAD" en "Sueños" (3.83).
**s08-tunel** (4.51). Agujerito con la cuchara y "AVANCE DEL TÚNEL: 2 CM"; el veterano se ríe "JA JA JA" (0.96); en "mientras cavás" caen nueve mensajes sobre el agujero y sello "+40 PEDIDOS" (3.39).
**s09-ventana** (6.95). "LA LEYENDA": ventanita del baño con las piernas naranja colgando que se escapan (1.25); corte a EL PIBE y EL SOBRINO (3.18) tipeando en dos compus; en "presos" (5.27) caen las rejas y sello "PRESOS: 2".
**s10-llave** (4.38). El veterano se inclina, serio; el túnel de tiza se tacha con X naranja en "No hay túnel" (1.61); "HAY UNA LLAVE" y la llave dorada gira con rayos (3.13).
**s11-scalerics** (3.47). Candado gigante; la llave entra, gira y se vuelve verde en "hacemos" (0.78); el arco salta con rayos verdes y tilde en "Scalerics" (1.22), "LA LLAVE · SCALERICS"; sello verde "AUTOMATIZACIONES" (2.11).
**s12-solos** (6.48). Tres tarjetas verdes AUTOMÁTICO: el pedido de WhatsApp vuela solo a la planilla (1.23-1.84); "Jorge/Rita, tu pedido está listo" y "SALE SOLO" (2.79-3.66); "Recordatorio: queda el pago de marzo" y la respuesta "¡Uh, cierto! Ya te transfiero" (4.44-5.31).
**s13-vacia** (2.95). El guardia frente a la celda vacía con la puerta abierta y el catre solo; en la pared, en tiza: "Fui al cumple de mi vieja. Los pedidos se pasan solos."; en "¿Recluso?" (1.34) cejas arriba y dos "?".
**s14-cumple** (4.65). "DÍA 1.248" (verde) con luz cálida; el dueño libre (camisa azul, gorrito de cumple) junto a la vieja y la torta con velas; "21:00" en "Nueve" (1.62); "¡Feliz cumple, vieja!"; en "cumpleaños" (3.16) tres avisos verdes de tareas hechas solas.
**s15-cta** (6.89). La pared se llena de marcas de tiza; "¿Cuántas rayitas de tiza llevás vos?" en tiza palabra por palabra; globo verde "TE LEEMOS · CONTANOS EN LOS COMENTARIOS" en 2.24, late hasta el final. Sin salida.
