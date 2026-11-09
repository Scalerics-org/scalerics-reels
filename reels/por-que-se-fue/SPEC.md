# por-que-se-fue · explicador "¿Por qué…?" (~30 s, 3D real)

"Vino por su yerba. No había. ¿Qué hizo?". Estudio mundial de faltantes en góndola (Gruen, Corsten y Bharadwaj 2002,
ver `fuentes.md`): casi un tercio (31 %) se va a comprarlo a otro local, otros cambian de marca (26 %), se llevan otra
versión (19 %) o esperan (15 %), y 9 % no compra nada. Giro: suele faltar lo que más se vende. Bisagra "¿Por qué?":
sale tan rápido que se acaba antes de pedirlo. Callback: Rubén y la yerba del sábado (Graciela frente al hueco); su
sistema a medida le avisa el martes que quedan pocas, pide a tiempo, el sábado Graciela encuentra la suya. Cierre:
videollamada gratis. Producto: sistema a medida de stock. Sin marcas reales. Voz: Orus (90 palabras).

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro), base técnica de
`reels/por-que-buscando` y `reels/abren-hoy` (personajes). El objeto que viaja: el paquete de yerba (góndola → paquete
rebanado en porciones 31/26/19/15/9 → puerta de al lado, canasta, calendario → barras de ventas → "?" → pila que se
vacía → almacén de Rubén → tablet con el aviso → caja del proveedor → góndola llena).
**Fondo navy oscuro `#0b1220` liso**, piso `#16243d`; cierre en verde `#5ce611` con letras navy.
Plan detallado de objetos, cámara, rótulos y sonido: `plan3d.md` (manda junto con este archivo).

## Lo que cambia respecto de SPEC-base
Todo lo dibujado es 3D (no líneas SVG). Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 ~86 px crema con
borde navy; la palabra clave en recuadro verde con letras navy; rojo apagado `#c7655b` para "había", "nada", "falte".
El gancho (s01) y la tarjeta (s11) no llevan karaoke: tienen el texto grande. Logo blanco abajo. Rótulos con línea
guía 6-8 px, Lexend 600 36-44 px. Sin degradés ni glow en el fondo.

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


## Escenas (inicio por índice de palabra de `guion.txt`; duraciones estimadas a 0,34 s/palabra, se ajustan con tiempos.md)
| # | id | arranca en | frase | objeto protagonista | qué cambia y en qué palabra |
|---|----|-----------|-------|--------------------|-----------------------------|
| 1 | s01-gancho | 0 "Vino" | Vino por su yerba. No había. ¿Qué hizo? | Góndola llena con UN hueco y etiqueta roja | Cuadro 0 con gancho entero; push-in; "había": tiembla la etiqueta; "hizo": sube un paquete frente al hueco |
| 2 | s02-otro-lado | 8 "Casi" | Casi un tercio se va a comprarla a otro lado. | El paquete gigante que se rebana en 5 | "tercio": sale la tajada 31 % → travelling a la puerta de al lado, que se abre; "31 %" 3D arriba; rótulo "Compra en otro local" |
| 3 | s03-marca | 18 "Otros" | Otros cambian de marca o esperan. | Canasta + calendario | "marca": 26 % y 19 % caen en la canasta (otra marca / otro tamaño); "esperan": 15 % al calendario; 3 rótulos |
| 4 | s04-nada | 24 "Y" | Y nueve de cada cien no compran nada. | Canasta que queda vacía | "nueve": "9 %" rojo arriba + crédito del estudio; "nada": la tajada se esfuma, canasta vacía rebota |
| 5 | s05-lo-que-mas | 32 "Y" | Y suele faltar lo que más se vende. | La góndola del gancho → barras de ventas | "faltar": los paquetes se estiran en barras; "vende": la más alta es la del hueco (contorno rojo, vacía); "El más vendido" |
| 6 | s06-por-que | 40 "¿Por" | ¿Por qué? | "?" 3D verde | La barra vacía se condensa en el "?"; push-in |
| 7 | s07-rapido | 42 "Sale" | Sale tan rápido que se acaba antes de pedirlo. | Pila de paquetes con contador 12 → 0 | "rápido": bajan de a uno; "acaba": 0 en rojo; "pedirlo": llega tarde la notita "Pedido: lunes" |
| 8 | s08-ruben | 51 "A" | A Rubén le pasa con la yerba del sábado. | Almacén de Rubén: estante con el mismo hueco | Zambullida por la notita; Graciela estira la mano al hueco; "sábado": pizarra; etiqueta "Rubén" |
| 9 | s09-aviso | 60 "Su" | Su sistema a medida le avisa el martes: quedan pocas. | La tablet del mostrador | Calendario rebobina a martes; "sistema": pill; "martes": aviso "Yerba 1 kg · quedan 8 · se acaba el sábado" |
| 10 | s10-encuentra | 70 "Pide" | Pide a tiempo. El sábado, Graciela encuentra la suya. | Caja del proveedor → estante lleno | "Pide": Pedir ✓; caja cae y llena el hueco; "Graciela": toma su paquete, sonríe, tilde verde |
| 11 | s11-llamada | 86 "videollamada" | (¿Querés que no te falte? Agendá una) videollamada gratis en scalerics.com. | Tarjeta verde + góndola llena | 2,5-3 s; "Videollamada gratis" / "scalerics.com" |

Brief completo por escena (cámara, rótulos, sonido, cuidados): `plan3d.md`.
