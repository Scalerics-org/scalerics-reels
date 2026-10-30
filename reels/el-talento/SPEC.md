# Reel "El talento": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: agentes de IA para
comercios). Formato P: CONCURSO DE TALENTOS de la tele (genérico, jurado inventado, sin nombre de
ningún programa real). Gancho del PRESENTADOR: "Tu empleado se anotó en un concurso de talentos.
¿Su talento? Dejar a tus clientes en visto." Audiciona MAXI, de Malvín (empleado joven, buzo
celeste, gorra para atrás, celular en la mano): primer número, le preguntan el precio y "visto";
segundo, "te contesto el lunes" y el lunes no llega nunca; gran final, le piden un turno y
contesta con un pulgar. JURADO: el JUEZ MALO ("Dos tildes azules. Ni en Matrix vi tanto azul.
Para mí, es un no"), la JUEZA ("No.") y el JUEZ BUENO ("Maxi, te quiero. Pero es un no"): X, X,
X. "¡Tres X! ¿Unas palabras, Maxi?" GIRO: "Es que estoy solo. El mostrador, la caja, los
proveedores... y el celular que no para." El juez bueno: "a este pibe no le falta talento: le
falta un compañero". Audiciona el AGENTE DE IA (un celular con cara, moño dorado): "Son las tres
de la mañana: ya contesté precios y horarios, agendé turnos y le escribí al que no compró". El
juez malo: "No puede ser... Me gustó." La jueza: "¡Botón dorado!" (confeti). Maxi: "¿Y yo qué
hago?" El agente: "Vos dormí, Maxi. Lo que es para vos, te lo paso mañana." Narrador Scalerics:
"Tu agente de IA lo armamos en Scalerics. ¿Pasa o no pasa? Votá en los comentarios."
Seis voces: presentador Puck, Maxi Umbriel, juez malo Algenib, jueza Kore, juez bueno Achird,
agente Zephyr, narrador Orus. Voz de 73.8 s, reel de 76.97 s.

## Recurso visual central
El ESCENARIO de un talent show: negro, telón bordó a los costados (lo pone el fondo de
`armar.mjs`), haces de luz dorada que barren, candilejas, y las tres LUCES DE X del jurado arriba
a la derecha (las pone `ambiente.html`, se prenden rojas en 28.62, 29.36 y 32.26, titilan en
33.73, se apagan en 42.74 y se ponen DORADAS en 62.62 con confeti dorado que cae). Cada "no" es
una X ROJA GIGANTE que cae con golpe y sacudón; el botón dorado es un domo dorado enorme que se
aprieta. Edición CARGADA: palabras gigantes que caen en su palabra, cartelas de número
("PRIMER NÚMERO", "GRAN FINAL"), sacudones, zoom a las caras, nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Negro escenario `#0b080b` y `#1c151c`: rellenos de caras, ropa oscura, pantallas.
- Crema luz `#fff3d6`: trazos (7 px) y textos.
- Dorado `#f6c544`: luces, títulos, el botón dorado, moños, el presentador.
- Rojo X `#ff2d3d`: las X, los "no", el EN VIVO.
- Celeste tildes `#4fc3ff`: lo de WhatsApp (las dos tildes azules del visto) y el buzo de Maxi.
- Bordó telón `#5a1020`: la mesa del jurado, cortinas.
- Desde s10 (el agente): verde Scalerics `#5ce611`, que es el color del agente de IA.
Acento de subtítulos por quién habla (lo hace `armar.mjs` con `reel.voces`): presentador dorado,
Maxi celeste, jurado rojo, agente y Scalerics verde.
Brillo (drop-shadow del mismo color) permitido en las X y el botón dorado. Prohibido: emojis
(el "pulgar" se DIBUJA como mano genérica), fotos, rayas largas (—), logos o nombres de
programas reales, caras de famosos. Matrix solo se NOMBRA (nada de lluvia de código verde).

## Tipos de letra
Lexend 800-900 para lo grande (mayúsculas), IBM Plex Mono 500 para cartelas chicas y horas. Nada
que haya que leer de menos de 26 px.

## Zona
Subtítulos arriba (y 236 a ~420). Arriba de todo (y 100-170) está la barra de `ambiente.html`
(EN VIVO + quién habla, y las tres luces de X a la derecha). Contenido de escena entre y 560 y
y 1540; candilejas en y 1600; logo en y 1746. Ancho x 50-1030.

## Lo que ya está hecho (no tocar)
- `armar.mjs` (fondo negro con telón bordó, colores de subtítulos, cortina `assets/bgm/escenario.mp3`).
- `compositions/ambiente.html`, `compositions/subtitulos.html`.
- Las escenas se escriben con el generador `partes/escenas/gen.py` + `comun.py` (personajes MAXI,
  PRESENTADOR, JUEZA, SIMPATICO, MALO, AGENTE; MESA, BOTON_X, BOTON_DORADO, XROJA, HAZ, PISO,
  TILDES, GLOBO): `python3 partes/escenas/gen.py partes/escenas/sNN.py` escribe la escena y su
  `.sfx.json`.
- La cortina `partes/cortina.mjs` ya tiene: redoble 18.6-21.9 y platillo en "pulgar" 21.95;
  chicharras en 28.66, 29.4, 32.3 y triple en 33.7; aplausos 7.9 y 50.6; "uuuh" del público en
  14.45 y 22.35; "oooh" en 50.55 y 62.85; redoble, fanfarria y aplausos del botón dorado en 62.66.
  Las escenas no repiten esos sonidos: suman pops, whoosh e impactos de sus golpes.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el escenario de talent show con la
> paleta de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

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


## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-concurso (0 a 5.89) · el gancho
Cuadro 0 ya armado: escenario con haz de luz cenital sobre un piso dorado, y MAXI de espaldas a
media luz con el celular. Arriba del dibujo, cartel de marquesina dorado "CONCURSO DE TALENTOS"
con foquitos que titilan (entra con golpe en "concurso" 1.10). "¿Su talento?" 2.65: Maxi se da
vuelta (pop a frente, haz se cierra sobre él) y un signo "?" dorado gigante. "Dejar" 3.85: cae
"DEJAR EN VISTO" gigante (Lexend 900, crema y "VISTO" celeste) y dos tildes azules enormes que
se dibujan en "visto" 5.00, con sacudón.

### s02-maxi (0 a 3.80) · el presentador
EL PRESENTADOR (smoking, moño dorado, micrófono) entra desde la izquierda en "Con" 0; brazo con
micrófono arriba. En "Maxi" 1.00 se abre el telón (dos paños bordó que se van a los costados) y
aparece la cartela de nombre "MAXI" gigante dorada con la placa mono "DE MALVÍN" en "Malvín"
2.00. Aplausos (cortina).

### s03-visto (0 a 5.46) · primer número
MAXI al centro, canchero, saluda (Gracias 0). Cartela "PRIMER NÚMERO" que cae en "Primer" 1.14.
En "preguntan" 2.50 entra un globo de chat de clienta (crema): "¿Precio de la campera?". En "y"
4.19, Maxi lo mira con desdén y en "visto" 4.33 aparecen las DOS TILDES AZULES gigantes al lado
del globo con golpe; el globo se queda colgado. Al final, carteles "UUUH" del público (mono,
chicos, varios) que suben desde abajo.

### s04-lunes (0 a 3.33) · segundo número
Cartela "SEGUNDO NÚMERO". Globo de Maxi: "Te contesto el lunes" (0.78). En "lunes" 2.00 un
calendario de mesa: las hojas pasan rápido MAR, MIÉ, JUE, VIE, SÁB, DOM... y vuelve a MAR sin
pasar nunca por LUNES (en "nunca" 2.61, sello rojo "NUNCA").

### s05-pulgar (0 a 4.56) · el gran final
Cartela "GRAN FINAL" dorada con foquitos en "gran" 0.17. Haz cenital sobre Maxi; redoble. Globo
de clienta "¿Tenés turno el sábado?" en "turno" 1.86. En "pulgar" 3.47: una MANO con el PULGAR
arriba gigante (dibujo genérico crema con contorno, no emoji) cae con golpe al lado del globo;
Maxi hace reverencia.

### s06-matrix (0 a 6.32) · juez malo
Plano medio del JUEZ MALO detrás de la mesa bordó (anteojos negros, cuello alto). "Dos tildes
azules" 0-0.74: dos tildes celestes enormes en un cartel que él levanta. "Matrix" 2.22: los
anteojos brillan (dos reflejos que barren) y una cartela mono "NI EN MATRIX". "azul" 3.61: las
tildes laten. "es un no" 5.33-5.58: aprieta su botón rojo y cae la X ROJA GIGANTE (5.58).

### s07-tres-x (0 a 7.19) · jueza, juez bueno y la triple X
"No." 0: plano de la JUEZA (ceja levantada) y X roja gigante al instante. "Maxi" 0.64: plano del
JUEZ BUENO, con pena (ojos que se cierran), "te quiero" 1.42 con un corazón dorado chico que se
rompe en "no" 2.90 y su X roja. "¡Tres X!" 3.50-4.37: las tres X rojas en fila gigantes,
golpe-golpe-golpe con sacudón. "¿Unas palabras, Maxi?" 5.24: el PRESENTADOR le acerca el
micrófono (asoma desde la derecha).

### s08-solo (0 a 6.19) · el giro
Se apagan las luces: Maxi solo en un haz frío y angosto, cabeza gacha, sin la sonrisa. "solo"
0.35: cartela mono "SOLO". Alrededor de él aparecen, uno por palabra, íconos que lo rodean y lo
aprietan: MOSTRADOR 1.30, CAJA 2.35, PROVEEDORES (cajas) 3.48, y en "celular" 4.87 el celular que
vibra con globitos que no paran de salir.

### s09-companero (0 a 4.80) · el juez bueno defiende
El JUEZ BUENO se para ("¡Pará!" 0) con la mano levantada. En "talento" 2.12 aparece TALENTO con
tilde dorada; en "compañero" 3.39 al lado de Maxi aparece una silueta punteada vacía con un
cartel "SE BUSCA COMPAÑERO"... "COMPAÑERO" con signo de pregunta.

### s10-agente (0 a 4.08) · entra el agente
El PRESENTADOR señala ("¡Y lo tenemos!" 0). "celular" 1.36: un celular sube desde el piso del
escenario con humo y haz dorado. "agente de IA" 2.29-2.97: el celular abre los ojos (verde) y
saluda con el bracito; cartela "AGENTE DE IA · CONCURSANTE 2" con golpe. "Oooh" del público.

### s11-tres-am (0 a 7.57) · su número
El AGENTE al centro, a la izquierda un reloj grande "03:00" (en "tres" 1.72), luna. "Buenas
noches, jurado" lo dice haciendo reverencia. A la derecha, una lista que se tilda en verde con
cada palabra: "PRECIOS" 3.36, "HORARIOS" 4.05, "TURNO AGENDADO" 4.57, "AL QUE NO COMPRÓ: ¿TE LO
GUARDO?" 6.03-6.64 (globo verde). Movimiento continuo: el agente se balancea y hace malabares.

### s12-dorado (0 a 5.21) · botón dorado
JUEZ MALO, incrédulo: "No puede ser" 0, se saca los anteojos. "Me gustó" 0.96-2.29: le sale una
sonrisa (la boca se curva) y zócalo "NO SONREÍA DESDE EL MARACANAZO". "¡Botón dorado!" 3.43: la
mano de la JUEZA aprieta el BOTÓN DORADO gigante, flash y confeti (el confeti lo pone ambiente).

### s13-dormi (0 a 4.90) · vos dormí
MAXI chiquito, perdido: "¿Y yo qué hago?" 0. El AGENTE a su lado le pone el bracito en el hombro:
"Vos dormí" 1.29: Maxi bosteza, aparecen "Z Z Z" y una luna. "te lo paso mañana" 3.43: una
tarjeta "PARA VOS · MAÑANA 9:00" con lo que es para el dueño, que se apila.

### s14-cta (0 a 7.67) · Scalerics
Se apaga el estudio. "Tu agente de IA" 0-0.48: el AGENTE chico arriba, con su moño. "Scalerics"
1.26: cartela verde "LO ARMAMOS EN SCALERICS". "¿Pasa o no pasa?" 1.62-2.52: dos botones
gigantes: BOTÓN DORADO "PASA" y X ROJA "NO PASA" que laten alternados. "Votá en los
comentarios" 2.91: cartela "VOTÁ EN LOS COMENTARIOS" con flecha que baja. Queda latiendo hasta el
final.
