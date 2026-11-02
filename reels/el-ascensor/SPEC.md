# Reel "El ascensor": spec

Reel vertical 1080x1920 de Scalerics. Producto: CRM. Formato D (historia de una clienta con nombre) en clave
de COMEDIA INCÓMODA: RUBÉN (Charon), dueño de una carpintería de muebles a medida, confiesa en la cara del que
mira: "Me quedé trancado en el ascensor con la clienta que nunca llamé." Silencio, música de ascensor
(sintetizada por `partes/musica.mjs`, melodía propia, sin derechos), el display clavado en el 4. VALERIA (Leda,
seca, cara de póker): "¿Rubén? El placard. Abril." Rubén: "¡Valeria! Justo... justo te iba a llamar." Ella:
"Estamos en noviembre, Rubén." Excusas: el post-it ("¿Y el post-it?"), "te busqué en el chat. En uno de los
cinco", "¿vos eras la del placard o la de la cocina?". El INTERCOMUNICADOR de emergencias (Kore, filtro de
parlante) sí sabe quién es ella: "¿Señora Valeria, piso siete? La tenemos en la ficha." "¿Y ustedes cómo saben
quién es?" "La anotamos, señor. No en un post-it." Remate: el placard se lo hizo el de enfrente, que la llamó al
otro día y le escribió para ver si había quedado conforme. "¿Y... quedaste conforme?" "Muy." (silencio
incómodo). GIRO (Orus, narrador, recién acá): "Rubén no es mal vendedor. Tiene a sus clientes en la cabeza, en
post-its y en cinco chats. Y así, alguno se queda trancado." En Scalerics armamos tu CRM: quién es cada
cliente, qué te pidió, a quién le prometiste algo y a quién volver a escribirle, todo en un solo lugar. El
ascensor arranca (4, 5, 6, 7, ding): "¿Y ahora qué hago?" "Llamá a la de la cocina." CTA (Orus): "¿Con qué
cliente no te querés quedar trancado? Contalo en los comentarios."

Voz armada por partes: `partes/voces.sh` (19 parlamentos) -> `partes/tiempos.sh` (corta silencios, tiempos por
parte con tiempos.mjs) -> `partes/componer.mjs` (atempo 1.2 Rubén, 1.15 Valeria, 1.3 intercomunicador con
filtro de parlante, 1.22 Orus; silencios en `partes/gaps.json`: 1.5 s de música tras el gancho y 1.2 s de
silencio incómodo tras "Muy."). Locución 69.4 s; reel 72.6 s. Música: `assets/sfx/ascensor.mp3` desde el
silencio del gancho hasta el giro (armar.mjs), después la cama de siempre. `assets/sfx/ding.mp3` sintetizado.

## RECURSO VISUAL CENTRAL
EL ASCENSOR TRANCADO: el display de pisos de 7 segmentos naranja clavado en el 4 con DETENIDO y la flecha que
titila, la luz de emergencia roja que tiñe todo hasta "Scalerics" (ahí pasa a EN SERVICIO en verde) y la placa
"CAPACIDAD 4 PERSONAS" que en "Abril" suma "+1 PRESUPUESTO SIN LLAMAR" (en "Scalerics": CLIENTES AL DÍA).
Los dos personajes, lado a lado y apretados, son el plano base de todo el sketch.

## ESTILO: INTERIOR DE ASCENSOR (comedia incómoda)
Fondo en armar.mjs (SVG): techo oscuro con panel de luz, paredes laterales de acero cepillado en perspectiva,
pared del fondo de acero con ESPEJO (reflejos en diagonal), pasamanos, piso de goma con relieve y botonera
en la pared derecha. ambiente.html: arriba a la izquierda la lámpara de emergencia (ALARMA ACTIVADA, titila;
EN SERVICIO verde desde "Scalerics"); arriba a la derecha el display PISO 4 · DETENIDO (sube 5, 6, 7 en
"¿Y ahora qué hago?"); abajo a la izquierda la chapa de quién habla (RUBÉN · CARPINTERÍA A MEDIDA naranja,
VALERIA · PIDIÓ PRESUPUESTO EN ABRIL rojo claro, EMERGENCIAS · INTERCOMUNICADOR ámbar, SCALERICS · CRM A
MEDIDA verde); abajo a la derecha la placa de capacidad; tinte rojo pulsante; viñeta; flash en "Scalerics".
Personajes planos con contorno tinta grueso, piezas en `assets/ascensor.js` (window.AS): Rubén (pelado con
canas, bigote canoso, lápiz en la oreja, camisa crema y delantal de madera; caras nervioso/culpa/sorpresa/
triste/orgullo/indignado/duda; brazos postit/celular/senala/hombros; gotas de sudor), Valeria (melena carré
oscura, tapado rojo, aros naranja; caras seria/ceja/sonrisa/feliz/mira; brazos cruzados/celular/chau/senala),
post-it (Caveat), celular, placard, cocina, parlante del intercomunicador, calendario, notas musicales,
botonera, dígitos de 7 segmentos.

## Paleta (SOLO estos)
- Acero `#b8c0c8` (claro `#dfe4e8`, oscuro `#6b7580`) y tinta `#14181d`.
- Naranja display `#ff8a1f` (apagado `#3a2410`): display, notas, Rubén.
- Rojo emergencia `#e5303a` (claro `#ff7a80`, oscuro `#a81c25`): luz, alarma, Valeria, sellos.
- Crema `#fff6e3`; madera `#c98a4b` (oscura `#8f5a2b`) y amarillo post-it `#ffd84a` como objetos.
- Ámbar `#ffd166`: el intercomunicador.
- Solo desde "Scalerics" se suma verde `#5ce611` (oscuro `#3f9e0b`): CRM, EN SERVICIO, CTA.
Subtítulos: crema con contorno tinta; acento naranja (Rubén), rojo claro (Valeria), ámbar (intercomunicador),
verde (Scalerics).

> Lo que sigue es `molde/SPEC-base.md`. En este reel MANDA lo de arriba (estilo ascensor, paleta, personajes
> rellenos con contorno tinta): de la base valen las reglas técnicas, la zona del dibujo, los cambios en la palabra
> que se nombra, la entrada y la salida con blur.

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


## Cómo se arman las escenas
`compositions/s01-trancado.html` está escrita a mano (escena modelo). Las demás las genera `node escenas/hacer.mjs`
(desde `escenas/a.mjs` s02-s07 y `escenas/b.mjs` s08-s14, con el molde `escenas/molde.mjs`, que toma la
duración de cada escena de reel.json + palabras.json). Después `node armar.mjs`. Ojo: dentro de los personajes
(`.as-r-brazo`, `.as-cel`, `.as-r-cabeza`...) el `svgOrigin` va en coordenadas LOCALES del personaje.
Plano base: Rubén `AS.ruben(300, 1540, 1.27)` a la izquierda, Valeria `AS.valeria(800, 1540, 1.22)` a la derecha;
el espejo de arriba (y 590-1050) es donde aparece lo que se nombra. Cambio de cara = dos versiones del personaje
superpuestas y un `tl.set` de opacidad en la palabra.

## Escenas (tiempos relativos en tiempos.md)
- **s01-trancado** (4.91 s) · "Me quedé trancado en el ascensor con la clienta que nunca llamé." Primer plano de
  Rubén sonriendo forzado y sudando; en "trancado" (0.33) frenazo: sacudón, se prende la alarma roja y el display
  queda en 4 · DETENIDO. En "con la clienta" (1.75) se abre el plano: Valeria al lado, brazos cruzados, cara de
  póker. "nunca" (2.5): Rubén pasa a culpa, de reojo. "llamé" (3.0): sello NUNCA LA LLAMÉ. Silencio (3.25):
  etiqueta MÚSICA DE ASCENSOR y notas naranjas/ámbar que suben flotando (suena la música).
- **s02-placard** (3.24 s) · "¿Rubén? El placard. Abril." Valeria se inclina hacia él (ceja); Rubén boca abierta.
  "placard" (1.13): pop del placard de madera en el espejo. "Abril" (2.18): sello ABRIL y, en el ambiente, la placa
  suma +1 PRESUPUESTO SIN LLAMAR.
- **s03-justo** (4.63 s) · "¡Valeria! Justo... justo te iba a llamar." Rubén saca el celular en "justo" (0.85) y lo
  sacude en "llamar" (2.25). "Estamos en noviembre, Rubén." (2.98): calendario en ABRIL y vuelan las hojas mes a
  mes hasta NOVIEMBRE (3.42, sacudón). "Rubén" (3.85): Rubén triste, se achica.
- **s04-post-it** (3.84 s) · "Lo tenía anotado. En un post-it." Rubén orgulloso levanta el post-it «Llamar a la
  del placard» (0.5), que late en "post-it" (1.5). "¿Y el post-it?" (2.42): Valeria levanta la ceja; "?" rojo gigante.
- **s05-cinco-chats** (3.95 s) · "Se perdió." el post-it sale volando girando. "Después te busqué en el chat" (1.13):
  del celular salen cinco chats con globitos rojos (FAMILIA, PROVEEDORES, FÚTBOL 5, CLIENTES, CLIENTES 2 «¿Valeria?
  ¿cuál?»). "uno" (2.83): se apagan cuatro y se agranda CLIENTES 2. "cinco" (3.17): sello UNO DE LOS CINCO.
- **s06-cocina** (5.40 s) · "Vos eras la del placard... ¿o la de la cocina?" Concurso: A · PLACARD (1.17) y
  B · COCINA (2.5), Rubén señala la cocina con sonrisa nerviosa. "La del placard, Rubén." (3.28): X roja sobre la
  cocina (buzzer), círculo rojo en el placard y sello LA DEL PLACARD (3.71); Rubén triste (4.15).
- **s07-emergencias** (6.21 s) · Intercomunicador (parlante de acero con LED ámbar y ondas) y FICHA de emergencias
  que se llena en la palabra: SRA. VALERIA (1.31), PISO 7 (2.02), late en "ficha" (3.7), TÉCNICO EN CAMINO con
  barra (4.47). Rubén y Valeria miran el parlante.
- **s08-como-saben** (4.14 s) · "¿Y ustedes cómo saben quién es?" Rubén indignado señala el parlante. "La anotamos,
  señor." (1.62): ANOTADO · EN LA FICHA. "No en un post-it." (2.77): aparece el post-it de Rubén y lo tacha una X
  roja (3.08). Valeria sonríe.
- **s09-enfrente** (6.50 s) · Valeria muestra el celular: chat con «Carpintería de enfrente» (1.56, sello EL DE
  ENFRENTE), llamada AL OTRO DÍA que vibra (2.52), globo «¡Hola, Valeria! ¿Quedó conforme con el placard?» (4.08) y
  su respuesta «¡Divino! Gracias» (5.3). Rubén se achica.
- **s10-conforme** (3.70 s) · "¿Y... quedaste conforme?": zoom lento sobre Rubén con un hilo de voz. "Muy." (2.11):
  corte al plano de ella sonriendo, MUY. gigante rojo; SILENCIO INCÓMODO y notas de la música.
- **s11-giro** (6.92 s, Orus) · Rubén solo. "no es mal vendedor": etiqueta NO ES MAL VENDEDOR. "cabeza" (2.3): nube
  de pensamiento llena de caritas de clientes; "post-its" (3.12) se le pegan alrededor; "chats" tiembla la nube.
  "alguno" (5.17): sale la tarjeta VALERIA · PLACARD · ABRIL y en "trancado" (6.07) la aprietan dos puertas de
  ascensor: sello TRANCADA.
- **s12-crm** (8.89 s) · "En Scalerics": se apaga la alarma (EN SERVICIO verde, CLIENTES AL DÍA). Pantalla del CRM
  (tinta con borde verde) que se llena en la palabra: SCALERICS · CRM (1.74), Valeria · CLIENTA DESDE ABRIL
  (2.84), TE PIDIÓ presupuesto de placard (3.66), LE PROMETISTE llamarla el lunes (4.89), también la de la cocina,
  aviso verde «Escribile hoy» con campanita (6.36). "Todo" (7.18): los post-its sueltos entran al CRM; etiqueta
  TODO EN UN SOLO LUGAR.
- **s13-ding** (2.96 s) · "¿Y ahora qué hago?" el display sube 5, 6, 7 y suena el ding. "Llamá a la de la cocina."
  Valeria sonríe y saluda; aparece la cocina y LLAMANDO · LA DE LA COCINA; Rubén con el celular, contento. Ella sale.
- **s14-cta** (7.31 s) · "¿Con qué cliente no te querés quedar trancado?" en letras gigantes ("trancado?" naranja,
  sacudón); "Contalo en los comentarios" (2.94): píldora verde con globito de comentario que late. Rubén abajo
  hablando por teléfono.
