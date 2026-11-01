# Reel "Copiá y pegá": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Tema: AUTOMATIZACIONES.
Formato B, diálogo MAESTRO Y ALUMNO en un dojo, como en una película de karate (referencia
solo nombrada: "como en Karate Kid: dar cera, pulir cera"). El MAESTRO (voz Algenib, grave,
sabio y pillo) entrena al ALUMNO (el dueño del comercio, voz Charon, cansado): "Copiá. Pegá.
Copiá. Pegá. Así vas a pasar el resto de tu vida, pequeño saltamontes." El alumno cree que lo
preparan para algo grande ("¿Cuándo aprendo la patada final?"), pero el entrenamiento es pasar
pedidos del WhatsApp a la planilla uno por uno, a las once de la noche, avisar a mano que el
pedido está listo, recordar turnos y pagos, anotar en el cuaderno. GIRO: "¿Y cuándo termina?"
"Nunca. Te mentí, saltamontes: no había ninguna lección. El verdadero maestro no repite. Hace
que se repita solo." Remate: "¿Y la patada final?" "Esa te la da tu competencia. Mientras vos
copiás y pegás." Entra Orus (Scalerics): el pedido cae solo en la planilla, el aviso sale solo,
el reporte del día llega al celular. Cierre: "Contanos en los comentarios cuál es tu copiá y
pegá." Voz de 70.2 s, total 73.37 s.

## ESTILO: DOJO DE TINTA SUMI (manda sobre SPEC-base)
Fondo claro: pared de papel de arroz con enrejado de shoji, tatami desde y 1400, viga de madera
oscura abajo (y 1688) donde va el logo blanco. Personajes dibujados genéricos con trazo de tinta
sumi gruesa (7 px) y rellenos planos: el MAESTRO (viejo pelado, cejas y barba blancas
larguísimas, gi negro, faja dorada) y el ALUMNO (el dueño: unos 45, bigote, ojeras, gi blanco,
cinturón blanco, vincha roja). Están en `partes/escenas/piezas.mjs` (con el saltamontes, la
pincelada y el ensō) y se insertan con `<!--@MAESTRO-->` / `<!--@ALUMNO-->` en
`partes/escenas/<id>.html`; `node partes/escenas/construir.mjs <id>` arma `compositions/<id>.html`.
Palabras gigantes en Shojumaru (letra de pincel japonesa) que caen como SELLOS; frases de sabio en
Kaushan Script (pincel); rótulos en IBM Plex Mono. Sellos rojos hanko (borde de laca, esquinas
redondeadas, levemente girados) que golpean con temblor. Edición cargada: nada quieto más de
~0.8 s.

## Paleta (SOLO estos)
- Papel de arroz `#efe4cc` / `#fbf6ea` (rellenos claros, piel `#f6eedb`).
- Tinta sumi `#1b1712`: trazos, texto, el gi del maestro.
- Laca roja `#c8102e`: sellos hanko, vincha, lo que duele, el acento del maestro en subtítulos.
- Oro `#c99a2e` (en texto `#a8780c`): faja del maestro, lo valioso, acento del alumno.
- Tatami `#b7ad74`: el piso, el saltamontes.
- Solo desde s14 (Scalerics): verde `#2f8f06` / `#5ce611` para lo que se hace solo.
Prohibido: emojis, fotos, rayas largas, logos o imágenes de Karate Kid ni de ninguna película,
caracteres japoneses o chinos (nada de kanji falso), marcas reales.

## Zona
Subtítulos arriba (y 236 a ~420, tinta, acento por voz: maestro rojo, alumno oro, Scalerics
verde). Contenido entre y 560 y 1520; los pies de los personajes en el tatami (y ~1396). Abajo a
la izquierda (y 1586) `ambiente.html` pone el cartel de quién habla (MAESTRO / ALUMNO /
SCALERICS): no lo tapes. Ancho: x 40-1040.

## Ya hecho en ambiente.html
Shoji, fibra del papel, tatami, manchas de tinta, cartel de quién habla, PINCELADA de tinta que
barre la pantalla en 44.5 ("Nunca.") y 57.86 (entra Scalerics), FLASH de papel en 51.75 ("solo")
y 61.3 ("planilla").


> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema sobre navy con acento verde; es el dojo de tinta sobre
> papel con la paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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


## Cómo se arma
- Las escenas se escriben en `partes/escenas/<id>.html` (con `<!--@ESTILO-->`, `/*@HELPERS*/`,
  `<!--@MAESTRO-->`, `<!--@ALUMNO-->`, `{{ID}}`) y `node partes/escenas/construir.mjs` las copia
  armadas a `compositions/`. Editá SIEMPRE la de `partes/escenas/`, no la de `compositions/`.
- La voz: `partes/voces.sh` (un .txt por parlamento, Algenib maestro, Charon alumno, Orus
  narrador), `partes/procesar.sh` (recorta silencios, acelera maestro x1.18, alumno y Orus x1.12,
  tiempos por parte), `partes/componer.mjs` (pega con 0.3-0.6 s entre parlamentos, aplica
  `partes/fix.json`, escribe `guion.txt`, `palabras.json` y los tramos de quién habla).

## Escenas (tiempos relativos en tiempos.md)
**s01-copia** (6.84). El maestro a la izquierda marca el ritmo con el dedo; COPIÁ (tinta) y PEGÁ
(laca) golpean como sellos en 0 / 0.83 / 1.61 / 2.42 con "CTRL + C / V" y un contador
"REPETICIÓN 1..4"; en "el resto de tu vida" el contador se dispara a 9999 y cae el sello rojo
"DE POR VIDA"; en "pequeño saltamontes" salta un saltamontes al tatami y la palabra en pincel.
**s02-patada** (4.26). El alumno agotado (gota de sudor); en "hace un año" se dibujan palitos de
conteo en la pared y "ENTRENAMIENTO · DÍA 365"; en "¿cuándo aprendo...?" se le iluminan los ojos y
sueña (nube) con una silueta de patada voladora; "LA PATADA FINAL" cae en "final".
**s03-cera** (4.56). "SILENCIO." con pincelada; cartel "COMO EN KARATE KID"; dos manos que giran en
círculos: "DAR CERA" (tinta) y "PULIR CERA" (laca) en su palabra.
**s04-planilla** (5.6). Celular con el chat de pedidos y la planilla; en "copiar/pegar" el mensaje
se marca y vuela a su fila (dos veces, en su palabra); en "uno por uno" se llenan las filas y cae
el sello "UNO POR UNO".
**s05-once** (2.68). El alumno bosteza; reloj de pared con agujas que corren; "23:00" en laca
golpea en "once"; en "noche" baja la luz y sale la luna.
**s06-dolor** (2.49). Rollo colgante que se desenrolla; "El dolor es parte del camino" en pincel,
palabra por palabra; sello "EL MAESTRO"; el maestro se acaricia la barba.
**s07-avisos** (5.07). Nueve chats de clientes; el dedo escribe "Tu pedido está listo" en cada
uno, cada vez más rápido; sello gigante "A MANO" en "mano".
**s08-cansado** (4.87). El alumno saca músculo; barras FUERZA y CANSANCIO: la de fuerza sube y se
desinfla con sello "NO"; la de cansancio revienta con "AL MÁXIMO" y el alumno se hunde.
**s09-tareas** (6.25). Tarjetas que caen en su palabra: TURNO (la señora, 10:00), PAGO (el que te
debe), CUADERNO (garabatos que se dibujan), cada una con sello "A MANO"; el alumno se hunde.
**s10-nunca** (2.73). El alumno suplica de rodillas "¿y cuándo termina?"; la pincelada del
ambiente barre en 44.5 y cae "NUNCA." gigante en laca con salpicaduras de tinta.
**s11-mentira** (3.3). El maestro sonríe de pillo, "te mentí" en pincel, el saltamontes le salta
al hombro; rollo "LA LECCIÓN" vacío con renglones y sello "NINGUNA".
**s12-enso** (4.06). El ensō se pinta de un trazo; "COPIÁ · PEGÁ" tachado con laca en "no
repite"; "SE REPITE / SOLO" en "solo" (flash del ambiente en 51.75), el ensō se vuelve dorado y
una flecha de ciclo gira sola.
**s13-patada** (5.17). "¿y la patada final?"; cartel "LA PATADA DE TU COMPETENCIA" y una pierna
de gi negro que entra desde la derecha y patea al alumno en "competencia" (sello "K.O."); tirado,
sigue copiando y pegando (etiquetas CTRL + C / V).
**s14-solo** (5.01). ENTRA SCALERICS (pincelada de tinta en 57.86). "POR ESO HACEMOS
AUTOMATIZACIONES" en verde; el chat y la planilla "SOLA": cada pedido viaja solo por una vía verde
punteada y cae en su fila con un tilde; sello verde "SOLO" en "solo".
**s15-reporte** (4.47). Los avisos "Tu pedido está listo" salen solos disparados; el alumno toma
té tranquilo; llega al celular el "REPORTE DEL DÍA" (pedidos, avisos, turnos de mañana, pagos por
cobrar, "copiado a mano 0").
**s16-cta** (6.01). Maestro y alumno hacen la reverencia; "CONTANOS EN LOS COMENTARIOS", "¿CUÁL ES
TU" y el sello "COPIÁ Y PEGÁ?"; una caja de comentarios donde se escribe "El mío: pasar los
pedidos a la planilla todas las noches". Sin salida.
