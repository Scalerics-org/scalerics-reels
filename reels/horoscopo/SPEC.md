# Reel "Horóscopo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: el
AGENTE DE IA (atiende WhatsApp a cualquier hora con tus precios, stock y horarios, agenda turnos,
le escribe al que preguntó y no compró, y te pasa la charla cuando es para vos), nombrado una sola
vez por el narrador al final. Formato P (personaje de la cultura popular): un PROGRAMA DE
HORÓSCOPO DE LA TELE NOCTURNA, con llamados al aire.

LA ASTRÓLOGA (voz Kore, mística, teatral y apurada) mira a cámara: "Tu horóscopo de hoy: vas a
perder un cliente. Y no es culpa de Mercurio." Saluda: "Buenas noches, mis estrellas." Lee tres
signos que pinchan al dueño: ARIES (un cliente te escribe a las once de la noche, vos dormís, él
compra en otro lado), TAURO (te piden precio y respondés "pasá el lunes"; nadie pasa el lunes),
GÉMINIS (ves el mensaje, lo dejás en visto; hoy Venus te deja en visto a vos). "Tenemos un
llamado. Hola, ¿estás en el aire?" Llama EL DUEÑO (voz Charon, desconfiado): "Mire, yo no creo en
esas cosas. Pero soy Tauro. ¿Y qué hago?" GIRO: "Ay, mi amor. Los astros no tienen nada que ver.
Lo que está retrógrado es tu WhatsApp." "¿Mi WhatsApp?" La astróloga mira la bola de cristal:
"Veo... veo un local con un agente de IA. Le escriben a las tres de la mañana y contesta. Con tus
precios. Con tu stock. Agenda el turno. Le escribe al que preguntó y no compró." "¿Y yo?" "Vos
dormís. Y cuando es para vos, te pasa la charla." "Eso no es horóscopo, señora. Eso es un
empleado." "Por eso se cumple." Entra el narrador de Scalerics (Orus): "Ese agente de IA lo
hacemos nosotros, en Scalerics. Mandáselo al de tu signo que siempre deja en visto."
Voz de 71.0 s, reel de 74.23 s. Las voces: `partes/voces.sh` (genera), `partes/recortar.sh`,
`partes/tiempos.sh`, `partes/componer.mjs` (pega con atempo y arma `guion.txt` y `palabras.json`).

## RECURSO VISUAL CENTRAL: la BOLA DE CRISTAL y la RUEDA ZODIACAL
La BOLA DE CRISTAL de la astróloga es la "pantalla" del reel: adentro aparecen las visiones
(el cliente que se va, el celular en visto, el local con el agente). La RUEDA ZODIACAL dorada
gira lenta todo el reel DETRÁS de las escenas (la pone `ambiente.html`, centrada en 540,960, r
~470, opacity baja); en cada signo que se lee, ese glifo se ilumina en la rueda. Los GLIFOS de
los signos son trazos SVG dibujados (nunca emojis ni caracteres Unicode de signos).

## ESTILO: MÍSTICO DE TV NOCTURNA. Edición CARGADA.
Cielo violeta profundo con estrellas (lo pone el fondo del index). `ambiente.html` (DETRÁS de
las escenas, `armar.mjs` lo pone antes de los hosts) pone: TELONES de terciopelo violeta con
flecos dorados a los costados (x 0-70 y 1010-1080) que se mecen; estrellitas de 4 puntas que
titilan; la rueda zodiacal girando; arriba (y 60-200) el LOGO DEL PROGRAMA "HORÓSCOPO DEL
COMERCIANTE" en dorado con una lunita y un punto "EN VIVO" rosa que titila; abajo (y 1530-1710)
el ZÓCALO de TV: barra violeta con borde dorado, a la izquierda una pastilla que dice el signo
del momento (ARIES / TAURO / GÉMINIS) y después "EN EL AIRE" (rosa, titilando) durante el
llamado (25.48-64.6), y a la derecha "LLAMÁ AL 0800-ESTRELLA" (número ficticio, con letras) que
en el llamado pasa a "LLAMADA: DUEÑO DE TAURO". Se va con Orus (64.6). No pongas nada tuyo en
esas franjas. Las escenas: DIBUJOS de trazo crema grueso con rellenos planos violeta y dorado,
destellos de 4 puntas, cartas de tarot con marco dorado, humo místico (curvas que suben), letras
GIGANTES que caen (Lexend 900 mayúscula con contorno oscuro grueso `#160a2e`), sacudones.
Nada quieto más de ~0.8 s. En las revelaciones: destello (sparkle/magia) y gong.
Personajes: SILUETAS genéricas, rellenas de noche `#160a2e` con contorno crema: LA ASTRÓLOGA con
turbante violeta con joya dorada y pluma, aros dorados enormes, chal violeta con estrellas, ojos
cerrados (dos curvitas); EL DUEÑO (en un recuadro de llamada, como en la tele) con delantal,
bigote y un teléfono; EL CLIENTE como silueta con celular. Nada de personas ni marcas reales
(WhatsApp solo como burbujas de chat genéricas y tildes; el nombre se dice y se escribe, sin logo).

## Paleta (SOLO estos colores)
- Noche `#160a2e`: siluetas, contornos gruesos de los textos, rellenos oscuros.
- Violeta `#5b2a9c` (y claro `#7d47c4` para brillos de la bola): telones, turbante, cartas, chal.
- Dorado `#e8b64a`: glifos, marcos, estrellas, acento de subtítulos, lo mágico.
- Crema estelar `#f5ecd7`: trazos de los dibujos, textos grandes.
- Rosa místico `#e0457b`: lo que está mal (el visto, el cliente que se va, "EN EL AIRE",
  "RETRÓGRADO", tachones).
- Desde s09 (la visión del agente) se suma verde Scalerics `#5ce611` para el agente de IA
  (la pantalla del celular, tildes de "contestó", la carta del agente).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales, caras de personas
reales.

## Tipos de letra
Lexend 700-900 para lo grande (con `-webkit-text-stroke` + `paint-order: stroke fill` noche);
IBM Plex Mono 500 para rótulos, zócalo y UI. Nada que haya que leer de menos de 26px (lo
decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420); el logo del programa en y 60-200. Contenido de cada escena
entre y 560 y 1500, x 80-1000 (los telones ocupan los bordes). Abajo (y 1530-1710) es del zócalo.
Logo de Scalerics en y ~1746.

## Sonidos extra de este reel
`gong` (gong místico, 3.8 s: usar con `max`), `ring` (timbre de teléfono, 1.1 s), `magia`
(arpegio brillante, 2.6 s), y de los de siempre `sparkle`, `chime`, `pop`, `whoosh`,
`impact-bass-1`, `impact-bass-2`, `notification`, `ping`, `glitch-1`, `typing`, `riser`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el programa místico con la paleta
> de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

**s01-tu-horoscopo (5.42 s).** Cuadro 0: la ASTRÓLOGA ya está (centro, de la cintura para
arriba, y 640-1200) con las manos sobre la BOLA DE CRISTAL (y 1180-1440). "horóscopo" (0.09): la
bola se ilumina (destello dorado) y sube humo. "perder un cliente" (1.96-2.59): adentro de la
bola una silueta de CLIENTE con bolsa se aleja y se achica; cae "VAS A PERDER UN CLIENTE" gigante
crema/rosa (y ~600-760) con sacudón. "Y no es culpa de Mercurio" (3.45-4.29): a la derecha un
planeta con el GLIFO DE MERCURIO dorado entra girando y en "Mercurio" se le estampa un tachón
rosa; rótulo "NO ES MERCURIO". Gong en "horóscopo", impacto en "cliente".

**s02-buenas-noches (2.27 s).** Saludo: la astróloga abre los brazos (las manos suben),
"BUENAS NOCHES" en dorado cursivo grande (Lexend 800) y en "estrellas" (1.07) una lluvia de
destellos de 4 puntas que explotan alrededor; la luna creciente sube detrás. Sparkle.

**s03-aries (6.01 s).** Una CARTA DE TAROT gigante (x 290-790, y 600-1360) gira y se da vuelta en
"Aries" (0.0): marco dorado, GLIFO DE ARIES grande arriba, "ARIES" abajo. "once de la noche"
(2.05-2.58): la carta se corre a la izquierda y chica; a la derecha un CELULAR con hora "23:00"
y burbuja de cliente "¿Tenés talle M?" que hace ping. "Vos dormís" (3.28): una camita con el
dueño tapado y "ZZZ" que sube; el celular sigue vibrando. "Él compra en otro lado" (4.29-5.08):
el cliente (silueta) se va caminando a la derecha hacia un toldito "OTRO LADO" con una bolsa;
flecha rosa y "OTRO LADO" gigante.

**s04-tauro (6.37 s).** Carta de TAURO (glifo de Tauro) que cae girando (0.0). "Te piden precio"
(0.99-1.34): burbuja "¿PRECIO?" con signo de pesos dibujado. "pasá el lunes" (2.91-3.31): un
CARTEL de cartón escrito a mano "PASÁ EL LUNES" colgado de un hilo, torcido. "Nadie pasa el
lunes" (4.32-5.29): una HOJA DE CALENDARIO "LUNES" con una telaraña y una planta rodadora
(bolita de pasto) que cruza; "NADIE" gigante rosa cae.

**s05-geminis (5.41 s).** Carta de GÉMINIS (glifo) (0.0). "Ves el mensaje" (0.79-1.07): un ojo
místico dorado (dibujado, almendra con pupila) que se abre arriba de un celular. "Lo dejás en
visto" (1.86-2.41): dos tildes rosas gigantes que se dibujan y "EN VISTO". "Hoy Venus te deja en
visto a vos" (3.14-4.64): un PLANETA con el GLIFO DE VENUS que muestra su propio celular con
tildes dorados, y se da vuelta ofendido; "A VOS" gigante dorado en "vos".

**s06-llamado (2.57 s).** Un TELÉFONO antiguo dorado que salta con timbre (ring) y líneas de
vibración; "¡TENEMOS UN LLAMADO!" en cartel de TV; en "aire" (1.69) un cartel luminoso rosa
"EN EL AIRE" se enciende con destello (el zócalo también cambia a EN EL AIRE).

**s07-no-creo (5.81 s).** PANTALLA DIVIDIDA de TV: a la izquierda la astróloga chica (recuadro
con marco dorado), a la derecha un recuadro grande "LLAMADA EN VIVO" con EL DUEÑO (silueta con
delantal, bigote, teléfono al oído) en su local (estante atrás). "no creo en esas cosas"
(1.70-2.36): brazos cruzados, "NO CREO" gigante crema con un tachón dorado de la astróloga
(ella levanta una ceja: un destello). "Pero soy Tauro" (3.51-3.96): el dueño se agacha, chiquito,
y aparece el glifo de Tauro dorado al lado de su cabeza. "¿Y qué hago?" (5.02-5.19): signos de
pregunta alrededor.

**s08-retrogrado (7.67 s).** EL GIRO. "Ay, mi amor" (0.0-0.45): la astróloga en primer plano,
corazoncito dibujado. "Los astros no tienen nada que ver" (1.23-3.13): la rueda zodiacal chica
con los glifos se apaga y los planetas se caen hacia abajo como fichas. "Lo que está retrógrado
es tu WhatsApp" (3.93-5.54): un CELULAR grande al centro con un chat que gira HACIA ATRÁS
(flechas circulares rosas, los mensajes se desordenan) y el sello rosa "RETRÓGRADO" que se
estampa en "retrógrado". "¿Mi WhatsApp?" (6.59-6.69): el recuadro del dueño entra de costado con
signo de pregunta gigante.

**s09-veo (6.70 s).** LA VISIÓN. La BOLA DE CRISTAL gigante al centro (x 230-850, y 640-1260)
con humo; "Veo... veo" (0.0-0.27): las manos de la astróloga hacen pases, destellos. "un local
con un agente de IA" (1.25-2.50): adentro de la bola aparece un LOCAL (toldo, vidriera) y un
CELULAR con pantalla VERDE y rótulo "AGENTE DE IA" (verde). "Le escriben a las tres de la
mañana" (4.07-4.95): una luna y reloj "03:00"; burbuja de cliente. "y contesta" (5.54): burbuja
de respuesta verde al instante con doble tilde verde; "CONTESTA" en verde. Magia + ping.

**s10-cartas (6.91 s).** TIRADA DE TAROT: cuatro cartas boca abajo en abanico; en cada palabra
una se da vuelta: "precios" (0.41) carta "TUS PRECIOS" con etiqueta de precio; "stock" (1.43)
carta "TU STOCK" con cajitas; "Agenda el turno" (2.63-3.13) carta "TURNO AGENDADO" con
calendario y tilde verde; "Le escribe al que preguntó y no compró" (4.25-5.98) carta "EL QUE NO
COMPRÓ" con burbuja verde "¿Te lo guardo?" y flecha de vuelta. Las cartas tienen marco dorado y
el detalle verde del agente.

**s11-y-yo (4.02 s).** "¿Y yo?" (0.0-0.11): el recuadro del dueño con signo de pregunta, celoso.
"Vos dormís" (0.72-0.90): el dueño en una cama con gorro de dormir, ZZZ, luna. "cuando es para
vos, te pasa la charla" (1.79-3.04): desde el celular verde del agente sale una flecha verde
hasta el dueño, una burbuja con rótulo "PARA VOS"; sol que sale, el dueño se despierta.

**s12-se-cumple (5.64 s).** "Eso no es horóscopo, señora" (0.0-0.85): el dueño en su recuadro,
sobrador; el cartel "HORÓSCOPO" se tacha. "Eso es un empleado" (1.97-2.36): una CREDENCIAL de
empleado verde "AGENTE DE IA · TURNO: SIEMPRE". "Por eso se cumple" (3.45-4.27): la astróloga
guiña (destello), la bola brilla y un SELLO dorado gigante "SE CUMPLE" se estampa con gong.

**s13-cta (9.43 s).** ENTRA SCALERICS. "Ese agente de IA" (0.0-0.76): el celular verde del
agente al centro con brillo; "lo hacemos nosotros, en Scalerics" (1.33-2.57): rótulo "TU
AGENTE DE IA" y "SCALERICS" en verde. "Mandáselo al de tu signo" (3.52-4.33): la rueda de los
12 GLIFOS dorados gira al frente y una flecha de "compartir" (avión de papel dibujado) sale
volando; "que siempre deja en visto" (4.88-5.62): un glifo de la rueda se ilumina en rosa con
doble tilde "EN VISTO" y el texto "MANDÁSELO AL DE TU SIGNO" queda quieto hasta el final.
