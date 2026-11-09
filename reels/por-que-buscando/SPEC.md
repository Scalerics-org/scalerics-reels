# por-que-buscando · explicador "¿Por qué…?" (34,7 s, 3D real)

"¿Por qué algunas páginas te muestran que están 'buscando'?". Experimento de una página de viajes (Buell y Norton,
2011: ilusión de trabajo / transparencia operativa): unos ven los vuelos al instante, otros esperan viendo cada
aerolínea revisada; mismos vuelos, y la espera se valoraba más. Bisagra "¿Por qué?" (la arena del reloj arma un "?"
verde), "vieron el trabajo" (la lupa), callback al almacén de Rubén: él arma el pedido con cuidado pero Graciela no
ve nada ("Sin respuesta"); lo automatizamos: los avisos salen del celular del mostrador y caen en su chat
(recibimos, armando, salió, llegó). Cierre: videollamada gratis, con el celular del gancho tildado entero (callback).
Producto: Automatizaciones (avisos de estado del pedido). Sin marcas reales. Voz: Orus.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro). Zona A en fondo crema liso
#efeee5 (el celular gigante, el avión low-poly, los dos celulares con rayo y reloj de arena, las tarjetas de
embarque apiladas con "=", la balanza, el "?", la lupa y el cierre); zona B el almacén de Rubén (x = 40, con Nico
que se lleva la bolsa); zona C la casa de Graciela (x = -40, reloj de pared rojo apagado = el problema). El celular
del chat va pegado a la cámara en B y C (en B se achica a la esquina para que se vea Rubén). Cierre con fondo verde
#5ce611 y letras navy. Subtítulos navy con borde crema y recuadro verde (nunca blanco sobre crema), logo oscuro.

Cómo se arma: `node armar.mjs && node gen.mjs && node armar.mjs` (armar escribe `assets/tiempos3d.js`,
subtítulos, index y la cama sidechain `bgm/bed-corte.mp3`; gen escribe las capas HTML y los `.sfx.json`).
Tiempos por palabra: STT de Google ajustado a mano por frases (silencedetect) y repartido por sílabas
(`assets/voice/palabras-stt.json` es el crudo).

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


## Lo que cambia respecto de SPEC-base
Fondo crema (no navy), subtítulos arriba al centro de 1 a 3 palabras (86 px, navy, recuadro verde en la clave), logo
oscuro en píldora crema, todo lo dibujado es 3D (no líneas SVG). Cierre en verde con letras navy.

## Escenas (segundos globales, voz de 34,14 s; DUR 34,26)
1. **s01-gancho** 0,00-3,92 · Cuadro 0 = portada: gancho Lexend 900 en 4 líneas navy ("“buscando”" en recuadro verde)
   y el celular gigante con la ruedita verde y "Buscando…"; Aerolínea 1 tildada, la 2 en "páginas", la 3 en
   "buscando"; push-in y órbita lenta. El gancho se va a 3,62.
2. **s02-prefiere** 3,92-5,83 · La 4 se tilda en "que hasta"; en "prefiere" cae el sello 3D "¿PREFERIDA?".
3. **s03-viajes** 5,83-8,01 · El celular gira 360° (dorso con módulo de cámara y franja verde) y aparece la página de
   viajes. En "página" el avión sale por delante de la pantalla, viene a cámara y se va entero por la derecha.
   Crédito "Experimento · Buell y Norton, 2011" arriba, debajo del subtítulo.
4. **s04-instante** 8,01-10,22 · El celular se corre a la izquierda con la cámara; en "A unos" los vuelos aparecen de
   golpe (pop, sin destello); rayo en "instante" y píldora "Al instante".
5. **s05-aerolinea** 10,22-13,55 · Barrido a la derecha: el segundo celular aparece en su lugar con un pop; filas que
   se tildan (la 3 en "aerolínea"), reloj de arena que se da vuelta en "esperar". Píldora "Se ve el trabajo".
6. **s06-mismos** 13,55-16,58 · Los dos celulares salen por los costados; las dos tarjetas de embarque aparecen
   apiladas en el centro con el "=" verde y el sello "MISMO RESULTADO". En "Y la espera" crece la balanza y caen tarjeta
   (parada, de frente) + rayo a un plato y tarjeta + reloj al otro; en "valoraba" baja el de la espera; tilde en "más".
7. **s07-por-que** 16,58-19,71 · Corte: UN "?" 3D verde grande desde el primer cuadro. En "Vieron" gira de canto y es la
   lupa (filas que se tildan, tilde gigante en "valoraron", "Esfuerzo a la vista"); la lupa viene a cámara.
8. **s08-ruben** 19,71-22,44 · Almacén, plano medio desde arriba: Rubén, la bolsa, el celular del mostrador; etiqueta
   "Rubén" desde el corte. Fideos, yerba, leche y pan caen en la bolsa; la mano derecha los acomoda.
9. **s09-no-ve** 22,44-24,72 · Graciela preocupada; el chat sube desde abajo: "¿Y mi pedido?" con tilde gris y el reloj
   rojo grande "Sin respuesta"; reloj de pared que se clava en "nada"; píldora "Sin noticias".
10. **s10-avisos** 24,72-27,40 · Vuelve el celular gigante del gancho (callback) con el chat: reloj rojo → en
    "automatizamos" tilde verde "Avisos automáticos" → en "recibimos" aparece el globo "Recibimos tu pedido",
    "escribiendo…" y la barra "Aviso automático".
11. **s11-salio** 27,42-29,24 · Almacén sin chat encima (mismo plano que s08, cajones de tomates y manzanas en primer
    plano): Rubén cierra la bolsa y aparece el globo 3D "Lo estamos armando"; en "salió" le da un empujoncito y la bolsa
    se desliza por el mostrador fuera de cuadro, aparece "¡Salió!"; Rubén toma mate. (Sin Nico.)
12. **s12-se-vea** 29,24-31,59 · Graciela sonríe con el chat lleno; llega "¡Llegó!", contesta "¡Gracias, Rubén!" y
    saluda con la mano mientras dice "Agendá…". El subtítulo "tu trabajo?" queda hasta el corte. (Sin reloj de pared.)
13. **s13-llamada** 31,59-34,26 · Fondo verde, tarjeta de videollamada; el celular del gancho con "Tu pedido" tildado.

Subtítulos: placa crema detrás (se lee sobre la estantería), arrancan junto con cada corte de cámara, los avisos van
entre comillas (“Recibimos tu pedido”…), "Vieron el trabajo" sin coma, y "Agendá una videollamada…" queda solo en
la tarjeta. Voz: la toma original (`partes/locucion-v1.wav`) con solo "¿Querés que se vea tu trabajo?" regenerada (`partes/queres1t.wav`,
de-esser + rebaje de 6,5 kHz, mismo loudness que lo que la rodea), 0,3 s de pausa antes de "Agendá", todo a -1,5 dB con
limitador (pico -1,5 dBFS, sin recortes). "Lo automatizamos:" quedó la toma original.
Balanza: bandejas arriba de los brazos (sin hilos); las tarjetas suben a las bandejas y recién ahí crece la balanza; rayo
y reloj caen después, atrás y hacia afuera de cada tarjeta.

## Sonido
Voz Orus a volumen 1; cama `bed.mp3` con sidechain (baja sola bajo la voz); SFX con techo -31 LUFS por efecto (ver
`armar.mjs`): tic-real/tac-real en cada fila tildada y en el reloj de pared y los pasos de Nico, pop en cada objeto,
sello en "PREFERIDA", "MISMO RESULTADO" y los golpes en la balanza, flash en "al instante", whoosh-cinematic en el
despegue y la zambullida, riser-corto + sparkle en el "?", campanita al entrar al almacén, papel en la bolsa,
burbuja en los productos y en la respuesta de Graciela, notification en cada aviso, chime en scalerics.com.
