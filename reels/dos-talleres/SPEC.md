# Reel "Dos talleres" — spec para los que construyen escenas

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (formato motion
persuasivo, línea de Juan del 02-11). Producto: **automatizaciones** (avisos y recordatorios
automáticos por WhatsApp). Una sola voz: Orus.

Historia: dos talleres mecánicos en la misma calle, igual de buenos con la llave. ARRIBA el de
Gustavo, sin avisos: el teléfono no para de sonar ("¿ya está mi auto?", tercera llamada del mismo
cliente), deja la llave para atender; meses después nadie le recuerda el service al cliente y se
lo hace donde lo agarre. ABAJO el de Andrea, con avisos automáticos: cuando el auto está pronto al
cliente le llega "Listo, podés pasar desde las 17 h"; a los meses, "Te toca el service, ¿te
reservo el jueves?", dice que sí y la noche antes le llega el recordatorio. Giro respetuoso: los
dos arreglan igual de bien; el taller de Andrea se queda en la cabeza del cliente. Cierre que pide
comentar: "Y tu mecánico, ¿es el de arriba o el de abajo? Contanos en los comentarios."

**Recurso visual central: la pantalla partida ARRIBA/ABAJO con la calle en el medio** (se
diferencia de dos-cafeterias, que partió izquierda/derecha). Medidas fijas en todas las escenas:
- Taller de ARRIBA (Gustavo): vereda/suelo en y=870, fachada centrada en x=600 (x 350–850, cartel
  "TALLER" arriba hasta y≈648). Encabezado a la izquierda, x=64 alineado a la izquierda: "GUSTAVO"
  (Lexend 600 34px, crema 0.55) en y=668 y "SIN AVISOS" (mono 24px, crema 0.4) en y=704.
- La calle: cordón superior y=892, cordón inferior y=968 (crema 0.35), línea central discontinua
  y=930 (crema 0.3, guiones largos). Por ahí pasan los autos.
- Taller de ABAJO (Andrea): suelo y=1200, fachada centrada en x=600 (cartel arriba hasta y≈978).
  Encabezado x=64: "ANDREA" (Lexend 600 34px, verde) en y=998 y "CON AVISOS" (mono 24px, verde
  0.8) en y=1034.
- Fachada de taller (coordenadas locales, origen = suelo al centro): pared `M-250 0 V-170 H250 V0`,
  cartel `rect -150,-222 300x46` con "TALLER" (mono), portón abierto `M-220 0 V-140 H60 V0` con
  la cortina enrollada arriba (dos líneas horizontales), un auto de perfil adentro, ventana de
  oficina `rect 100,-140 120x70` (vidrio verde en lo de Andrea).
- Auto de perfil (~240 px de largo, dos ruedas r 22), siempre el mismo dibujo.
En s01 los dos talleres van a escala 0.85 (centro x 600) para dejar lugar a la burbuja; en s11 a
escala 0.85 con centro x 520 (a la derecha, "¿ARRIBA?"/"¿ABAJO?" y el globo de comentario); en
s09 a escala 0.8 con centro x 340 y el cartel dice el nombre ("GUSTAVO"/"ANDREA") en vez de
"TALLER". Cuando el beat es de un solo taller, el otro queda a 0.3 (no desaparece: la comparación sigue a la
vista). Para el celular del cliente (s06, s08), el taller activo se corre a la izquierda (centro x 400,
escala 0.75) y el celular ocupa la derecha (x 640–1000, y 620–1220), pasando por encima de la calle.

Color con significado: lo de Gustavo en crema apagado, y SOLO en los dolores (teléfono que suena,
"tercera llamada", el auto que se va a otro lado) **rojo apagado `#c0625a`**; lo de Andrea en
verde de marca `#5ce611` (vidrios, tildes, burbujas de WhatsApp, calendario con el jueves
marcado). Interfaz recreada en motion: burbujas de mensaje, botones "Sí"/"Otro día", tildes,
campanita de recordatorio. Todo texto en pantalla refuerza lo que se dice (se entiende sin sonido).

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).

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


## Inicios globales
s01 0 · s02 4.45 · s03 7.78 · s04 13.10 · s05 19.11 · s06 24.12 · s07 29.30 · s08 34.71 ·
s09 41.74 · s10 47.19 · s11 51.98 (dura hasta 59.25; la voz termina en 56.05).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-dos-talleres** (0–4.45) — "Dos talleres en la misma calle. Uno te avisa cuando tu auto está
pronto." Cuadro 0: la calle (cordones y línea central) ya medio dibujada y el taller de arriba a
medio hacer. En "talleres" (0.30) se dibuja el de abajo, idéntico. En "calle" (1.50) los
encabezados GUSTAVO/ANDREA y un auto cruza la calle de izquierda a derecha. En "Uno" (2.49) el de
abajo se prende (vidrio y cartel verdes) y el de arriba baja a 0.5. En "avisa" (2.80) pop de una
burbuja verde sobre el taller de abajo: "Tu auto está pronto" con tilde; en "pronto" (3.80) un
"?" crema apagado al lado del taller de arriba. Etiqueta: "MISMA CALLE" → "UNO TE AVISA".

**s02-diferencia** (4.45–7.78) — "Mismo rubro, misma calle, una sola diferencia." Tabla de la
serie girada: fila de arriba = Gustavo, fila de abajo = Andrea, tres columnas (x 220, 540, 860).
En "rubro" (0.45) llave inglesa arriba y abajo con "=" entre ellas; en "calle" (1.35) cartel de
calle arriba y abajo con "="; en "una sola diferencia" (1.55–2.35) la tercera columna: arriba un
teléfono de mesa con "?" (rojo apagado), abajo un celular con burbuja y tilde verde, entre ellos
un "≠" verde grande con punch. Etiqueta: "DOS NEGOCIOS" → "UNA DIFERENCIA".

**s03-gustavo** (7.78–13.10) — Taller de arriba activo, el de abajo a 0.3. En "Arriba" el taller
de Gustavo hace punch; en "Gustavo" (0.92) entra Gustavo (figura con gorra y mameluco) junto al
portón. En "buenas manos" (1.90) su llave inglesa gira ajustando una rueda del auto (tilde crema);
en "precio justo" (2.82) pop de una etiqueta de precio con un "$" y tilde crema. En "teléfono"
(3.92) pop de un teléfono de mesa en la ventana de la oficina; en "no para de sonar" (4.52) tiembla
con ondas rojo apagado. Etiqueta: "BUENAS MANOS" → "EL TELÉFONO SUENA".

**s04-llamada** (13.10–19.11) — Taller de arriba en primer plano (el de abajo a 0.3). Globo grande
desde el teléfono: "¿Ya está mi auto?" (0.00–0.80). En "tercera" (1.80) tres íconos de llamada
en fila, el tercero en rojo apagado con punch, y debajo "3ª LLAMADA". En "Gustavo deja la llave"
(3.84–4.90) Gustavo suelta la llave, que cae girando al piso; en "atiende" (5.20) se lleva el tubo
a la oreja y el auto queda con el capó abierto esperando (puntos suspensivos crema). Etiqueta:
"¿YA ESTÁ MI AUTO?" → "TERCERA LLAMADA" → "DEJA LA LLAVE".

**s05-andrea** (19.11–24.12) — Taller de abajo activo, arriba a 0.3. En "Andrea" (0.89) entra
Andrea (cola de pelo, mameluco); en "mismas manos" (1.19) la misma llave gira en la rueda; en
"mismo precio" (2.47) la misma etiqueta "$" con "=" chiquito; en "teléfono tranquilo" (3.49–3.59)
el teléfono de mesa quieto en la ventana, con un mate al lado y una tilde verde. Etiqueta:
"MISMAS MANOS" → "EL TELÉFONO, TRANQUILO".

**s06-listo** (24.12–29.30) — Taller de abajo a la izquierda (centro x 300), arriba apagado. En
"pronto" (0.48) tilde verde grande sobre el auto; en "cliente" (1.38) se dibuja el celular del
cliente a la derecha; en "llega un WhatsApp" (1.88–2.18) una línea punteada verde va del taller al
celular y baja la notificación "TALLER ANDREA"; en "listo" (2.78) el texto "Listo, ya está tu
auto."; en "desde las cinco" (3.88–4.28) "Podés pasar desde las 17 h" y tildes dobles verdes.
Etiqueta: "AVISO AUTOMÁTICO" → "SIN LLAMAR".

**s07-meses** (29.30–34.71) — Taller de arriba activo. En "Pasan los meses" un almanaque de hojas
que pasan (tres hojas que se arrancan y caen). En "cliente de Gustavo" (1.30) el auto del cliente
estacionado en la calle; en "nadie le recuerda el service" (2.49–3.40) globito de pensamiento
vacío sobre el auto y una tarjeta "SERVICE ?" en rojo apagado; en "donde lo agarre" (4.20–4.70) el
auto arranca y se va por la calle hacia la derecha, hasta un cartel genérico "OTRO TALLER →" (crema
apagado). Etiqueta: "PASAN LOS MESES" → "NADIE LE AVISA".

**s08-service** (34.71–41.74) — Taller de abajo a la izquierda, celular a la derecha. En "le llega"
(0.99) notificación "TALLER ANDREA"; en "te toca el service" (1.29–1.99) texto "Te toca el
service."; en "¿te reservo el jueves?" (2.29–2.99) texto "¿Te reservo el jueves?" y dos botones
"Sí" / "Otro día"; en "Dice que sí" (3.67–3.99) el botón "Sí" se llena de verde y un almanaque
chico (arriba a la izquierda, sobre el taller apagado) marca el jueves con un círculo verde; en
"la noche antes" (4.69) una luna sobre el celular; en "recordatorio" (5.89) baja una segunda
notificación con campanita: "Mañana 9 h te esperamos". Etiqueta: "TE TOCA EL SERVICE" → "TURNO
RESERVADO" → "RECORDATORIO".

**s09-cabeza** (41.74–47.19) — El giro. Los dos talleres de vuelta, más chicos y corridos a la
izquierda (centro x 340, escala 0.8). En "igual de bien" (0.96–1.26) una tilde crema en cada uno y
un "=" en la calle. En "diferencia" (1.86) se dibuja a la derecha el perfil de la cabeza del
cliente (x 700–1000, y 640–1180); en "taller de Andrea" (2.76–3.26) una línea punteada verde va
del cartel de abajo a la cabeza; en "cabeza" (4.26) adentro de la cabeza aparece el cartel
"TALLER ANDREA" en verde con una llave, y el de Gustavo baja a 0.3. Etiqueta: "IGUAL DE BIEN" →
"SE QUEDA EN LA CABEZA".

**s10-scalerics** (47.19–51.98) — Pantalla completa. En "Scalerics" (0.91) pop de un nodo central
(círculo verde con un rayo) y el texto "AUTOMATIZACIONES" en "automatizaciones" (1.51); de él salen
dos ramas: en "avisan" (2.81) burbuja "Tu auto está pronto" con tilde; en "recuerdan" (3.61)
burbuja "Te toca el service" con campanita; en "por vos" (4.31) tildes que laten. Etiqueta:
"SCALERICS" → "AVISAN Y RECUERDAN".

**s11-cta** (51.98–59.25) — Pantalla partida completa otra vez (los dos talleres). En "mecánico"
(0.42) los dos hacen punch; en "arriba" (1.42) un marco crema punteado rodea al de arriba con
"¿ARRIBA?"; en "abajo" (2.12) un marco verde rodea al de abajo con "¿ABAJO?"; en "Contanos"
(2.80) pop de un globo de comentario a la derecha de la calle con tres puntitos que se escriben
hasta el final. Etiqueta: "¿ARRIBA O ABAJO?" → "CONTANOS".
