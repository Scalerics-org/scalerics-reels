# Reel "Emergencias": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: SITIO WEB. Formato B (diálogo): LLAMADA A UNA
CENTRAL DE EMERGENCIAS, como en las series policiales (genérica: nada de números ni logos reales).
La OPERADORA (Gemini Kore, profesional, seria, nunca se ríe) atiende: "Emergencias, ¿cuál es su
emergencia?". El LLAMADOR (Gemini Puck, desesperado y muerto de hambre, filtro de teléfono): "¡Son
las nueve, tengo hambre, y la página de la rotisería no dice si abren!". La operadora le pregunta
si la página respira ("está cargando... sigue cargando... ¡no respira!"), despacha "Unidad cuatro,
código milanesa" a la rotisería Doña Elsa; el menú es un PDF de 2019 que se le va para el costado
con el zoom de dos dedos, el teléfono da ocupado y el mapa lo manda a la dirección vieja: una
gomería. El PATRULLERO (Gemini Charon, filtro de radio) llega: el local está abierto, las milanesas
espectaculares, la cocinera ni se enteró. "¿Y el delito?" GIRO: "En la cocina, ninguno. Doña Elsa
cocina bárbaro. El problema es la puerta: la puerta de este local hoy es el celular. Y está
trabada." ORUS (Scalerics) recién ahí: "Esa puerta la destrabamos en Scalerics. Hacemos tu sitio
web: rápido en el celular, con tu horario, tu ubicación y un botón a WhatsApp. Que te encuentren sin
llamar a nadie." Cierre: "Etiquetá al local que te hizo llamar a emergencias."

Voz: 14 parlamentos (`partes/01..14.txt`, `partes/voces.sh`): silencios recortados
(`partes/recortar.sh`), pausas internas acortadas (`partes/pausas.mjs`), atempo por parlamento y
pegados con 0.4-0.6 s (`partes/componer.mjs`, `atempo.json`, `gaps.json`); filtro de teléfono suave
al llamador y de radio al patrullero. Tiempos: Speech-to-Text de cada parte. Locución 67.59 s;
reel 70.79 s; 169 palabras.

## ESTILO: CENTRAL DE DESPACHO NOCTURNA
Fondo azul petróleo oscuro (armar.mjs) con brillo cian al centro. Capa `compositions/ambiente.html`:
mapa del barrio en líneas cian muy tenue que se desliza, barrido de RADAR girando con anillos, barra
de la central arriba ("EN CURSO" rojo que titila · "CENTRAL · DESPACHO" · CRONÓMETRO de llamada en
ámbar que cuenta y se frena en 00:53 cuando entra Scalerics y la barra pasa a "RESUELTO" verde),
ONDA DE LA LLAMADA abajo (64 barras del color de quien habla) con el rótulo de quién habla
(OPERADORA cian, LLAMADOR ámbar, UNIDAD 4 blanco, SCALERICS verde), BALIZAS ámbar en el despacho
(14.2) y en la llegada (35.62), ALARMA roja en "no respira" (12.83), "ocupado" (28.07) y "gomería"
(31.91), brillo verde desde "destrabamos" (54.27).
Recursos: auriculares de la consola, monitor de signos vitales (ECG) de "la página", celular con la
página que carga, mapa con la unidad 4 (patrullero ámbar con baliza), sellos y chips mono, cinta
de peligro "TRABADA · NO PASA NADIE", candado. Subtítulos con acento ámbar.

## Paleta (SOLO estos colores)
- Petróleo `#03121a` / `#072630` / `#0c3a46`: fondo, paneles, pantallas.
- Cian mapa `#3fd6e0`: líneas, mapa, radar, UI de la central, la operadora.
- Ámbar baliza `#ffb020`: códigos, balizas, unidad 4, milanesas, acento de subtítulos, el llamador.
- Rojo alerta `#ff4d4d` (`#c92f2f` en la barra por contraste): no respira, ocupado, trabada.
- Blanco consola `#e8f4f6`: textos, el patrullero, Doña Elsa.
- Desde s13 (Scalerics): verde `#5ce611` para el sitio web y lo que funciona.

## Zona
Barra y 116-192; subtítulos y 236-430; escenas entre y 560 y 1500; onda de la llamada y 1540-1624
y rótulo y 1640 (ambiente); logo y ~1746.

## Cómo se hicieron las escenas
Cada escena salió de un generador (helpers `dibujar`, `pop`, `golpe`, `fuera`, `sacudon` y salida
con blur, iguales en todas): los HTML de `compositions/` son el resultado final y se editan a mano.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba
> (acá no es ilustración crema con acento verde). Sí valen las reglas técnicas y la verificación.

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


## Escenas (tiempos relativos; exactos en `tiempos.md`)

**s01-central** (2.34 s). "Emergencias, ¿cuál es su emergencia?" Auriculares de la consola a medio
dibujar en el cuadro 0, "EMERGENCIAS" gigante ámbar de golpe, ondas de llamada entrante, led rojo;
0.86 chip rojo "LÍNEA 1 · ENTRANTE".

**s02-hambre** (4.90 s). 0.49 "nueve": "21:00" gigante mono ámbar; 1.17 "hambre": plato con
cubiertos, ruido de panza, chip "MOTIVO: HAMBRE"; 1.94 "página": sube el celular con la página de
la rotisería Doña Elsa (milanesa dibujada), "HORARIO: ¿?" y "ABRE: ¿?" titilan en rojo en "no";
3.79 "abren": sello rojo "¿ABREN O NO ABREN?".

**s03-respira** (3.08 s). Monitor de signos vitales "PACIENTE: PÁGINA WEB", ECG que se dibuja;
0.47 chip "MANTENGA LA CALMA"; 1.98 "respira": "¿RESPIRA?" gigante ámbar, el pulso se achica.

**s04-cargando** (3.88 s). Celular con spinner y barra de carga que casi no avanza, ECG debajo;
2.51 "no respira": línea plana roja, el celular se pone rojo, sello "¡NO RESPIRA!" con sacudón.

**s05-despacho** (4.43 s). Mapa del barrio; 0.38 "cuatro": patrullero ámbar con baliza y chip
"UNIDAD 4 · EN CAMINO"; 1.23 "milanesa": sello ámbar "CÓDIGO MILANESA"; 1.79 "diríjase": ruta
punteada y el patrullero la recorre; 2.64 cae el pin rojo; 3.39 "Elsa": rótulo "DOÑA ELSA".

**s06-pdf** (6.82 s). "¡APARECIÓ!"; 0.77 "menú": menú escaneado torcido en el celular; 1.54 chip
"PDF · 2019" (el año titila en 2.21); 3.46 "zoom": dos dedos que se abren y el menú se agranda;
4.91 "se me fue": el menú se va al costado; 5.58 chip rojo "¿DÓNDE QUEDÓ EL MENÚ?".

**s07-ocupado** (3.39 s). Celular agarrado con la mano (dedos ámbar), chip "NO SUELTE EL CELULAR";
1.61 "llamar": "LLAMANDO..." a Doña Elsa con ondas; 2.62 "ocupado": "OCUPADO" rojo, "tu tu tu".

**s08-gomeria** (4.50 s). Mapa con la ruta ámbar y el puntito del llamador; 1.15 pin "DIRECCIÓN
VIEJA"; 2.40 "estoy": el mapa se va y aparece la GOMERÍA (cartel ámbar, cubiertas que caen y una
que rueda); 3.07 sacudón y sello rojo "DESTINO EQUIVOCADO".

**s09-reporte** (7.01 s). Handy de la unidad "U-4" con ondas; 1.12 chip "UNIDAD 4 · REPORTE"; 2.98
"llegamos": fachada "ROTISERÍA DOÑA ELSA" con toldo y el patrullero que estaciona; 4.09 "abierto":
se prende el cartel "ABIERTO"; 4.82 "milanesas": el plato de cerca con vapor; 5.67 brillitos y chip
"ESPECTACULARES".

**s10-cocinera** (3.34 s). Doña Elsa (genérica) cocinando, la milanesa salta en la sartén, notas;
0.84 chip "NI SE ENTERÓ"; 2.02 "¿y el delito?": entra el expediente con "DELITO:" vacío y "¿?" rojo.

**s11-inocente** (4.46 s). Expediente: "COCINA: SIN DELITO" con tilde en "ninguno"; 2.67 "bárbaro":
sello ámbar "COCINA BÁRBARA"; 3.48 "PROBLEMA:"; 4.10 "puerta": "LA PUERTA" en rojo con una puerta.

**s12-trabada** (5.14 s). La puerta del local ("EMPUJE"); 1.68 chip "LA PUERTA DE HOY"; 2.41
"celular": la puerta gira y es el celular; 3.85-4.02 "está trabada": dos cintas de peligro
"TRABADA · NO PASA NADIE" y candado rojo de golpe.

**s13-destrabamos** (4.09 s). Orus. 0.98 "destrabamos": el candado se abre y se pone verde, las
cintas se caen; 1.87 chip verde "SCALERICS"; 2.79 "hacemos": se arma la página verde; 3.48 sello
"SITIO WEB".

**s14-sitio** (7.03 s). El sitio de Doña Elsa: rayo de "rápido"; 1.35 "Abierto hoy"; 2.16 "Cómo
llegar"; 3.23 botón "WHATSAPP"; 4.48 el celular se corre y aparecen los auriculares de la central
durmiendo (Z z z); 5.91 chip "EMERGENCIA CANCELADA".

**s15-cta** (6.38 s). Baliza ámbar que gira, "ETIQUETÁ" gigante, "al local que te hizo / LLAMAR A
EMERGENCIAS", campo de comentario "@" con cursor que titila y botón verde que late.
