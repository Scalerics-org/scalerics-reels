# Reel "ASMR": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES. Formato P (cultura popular):
un VIDEO DE ASMR PARA DORMIR de YouTube. Una ASMRtista (Aoede, susurro) le habla al micrófono
binaural: "Shhh. Hoy te vas a dormir mirando a un comerciante que no duerme desde que abrió el
local." Son las once y cuarenta; Beto, el panadero (Charon, susurro cansado y fastidiado), pasa los
pedidos de WhatsApp a la planilla. "Oreja izquierda: pedidos. Oreja derecha: más pedidos. Copiar.
Pegar." Pedido doce: dos docenas de bizcochos. Beto la corta: "Shh. ¿Podés bajar la voz? Estoy
trabajando." Ella: "mi favorito: la planilla que se tranca". Él: "No, no, no. ¿Guardé?". El aviso
de "pedido listo" uno por uno, a mano; el audio a la señora Ofelia a la una ("Perdón"). GIRO: "Lo
más relajante es que no te pasa a vos. Para vos, esto es ASMR. Para Beto, es la vida." Se prende
la luz y entra el narrador de Scalerics (Orus, voz normal): "Beto, andá a dormir. Eso lo
automatizamos en Scalerics: los pedidos de WhatsApp pasan solos a la planilla, el aviso de pedido
listo sale solo, y el reporte del día te llega al celular." ASMRtista: "Y ahora sí: Beto,
durmiendo." Cierre (Orus): "¿A qué hora cerraste vos la planilla anoche? Susurralo en los
comentarios." Voz de 68.95 s (171 palabras, tres voces); reel de 72.15 s.

Recurso visual central: el MICRÓFONO BINAURAL CON OREJAS (dibujado genérico: cuerpo con rejilla y
dos orejas de piel a los costados, LED rosa de grabación) y la PLANILLA azulada, en un cuarto en
penumbra violeta con luz de velador.

## ESTILO: cuarto de ASMR en penumbra (violeta/lavanda, velador cálido, pantalla azul)
Personajes de dibujo animado con relleno y contorno oscuro grueso (como `las-ojeras`): la
ASMRtista (pelo largo violeta, buzo lavanda, ojos cerrados), Beto (gorro de panadero, bigote,
ojeras violetas, delantal), el micrófono binaural, la planilla, el celular con chat genérico (sin
logos), la medialuna, el disquete, la ruedita de carga, la cama. Todo sale de `assets/asmr.js`
(`AS.beto`, `AS.asmrtista`, `AS.mic`, `AS.planilla`, `AS.celular`, `AS.globo`, `AS.bizcocho`,
`AS.disquete`, `AS.rueda`, `AS.cama`, `AS.mano`, `AS.velador`, `AS.zzz`, `AS.luna`, `AS.estrellas`
y `AS.kit(tl, root)` con `pop`, `popSvg`, `suave`, `sello`, `sacudon`, `vibrar`, `dibujar`,
`flotar`, `latir`, `titilar`, `roncar`, `hablar`, `tipear`, `tipearSvg`, `salida`). Ritmo lento a
propósito al principio (aparición `suave` con desenfoque, flotar, zoom lento), pero algo pasa
siempre en la palabra que lo nombra; desde que habla Beto, golpes secos (sellos, sacudones). La
salida de cada escena es un fundido con blur de 0.3 s (como cerrar los ojos).
Escena modelo: `compositions/s01-shhh.html`.

## Paleta (SOLO estos colores)
- Noche violeta `#120c22` / `#1b1430` / `#2c2250`: fondo, contornos (`#120c22`), rellenos oscuros.
- Lavanda `#b9a6ff` (+ clara `#e4dcff`, oscura `#7a68c4`): el mundo ASMR, la ASMRtista, el
  micrófono, la onda, sus acentos en los subtítulos.
- Ámbar de velador `#ffbf69` (+ `#ffe0b0`, `#c98a3c`): Beto, su luz, sus acentos, el reloj.
- Azul de pantalla `#6cc4ff` (+ `#16305a`, `#bfe6ff`): la planilla y la luz en la cara de Beto.
- Rosa alerta `#ff6f91`: "NO DUERME", "NO RESPONDE", el ?, la hora 01:00, el LED.
- Desde que entra Scalerics (s12): verde `#5ce611` para lo automático (tubo, tildes, reporte).
Piel de los personajes: `#f3c99a` / `#d9a272` (tonos del ámbar). Prohibido: emojis, fotos,
logos reales, rayas largas (—) en textos visibles.

## Tipos de letra
Lexend 300 para el susurro (`.as-susurro`, con brillo lavanda), Lexend 600-900 para títulos,
IBM Plex Mono 600 para etiquetas, Caveat para el comentario escrito del CTA.

## Zona
Subtítulos arriba (y 236 a ~420, con el acento del color de quien habla: lavanda ASMRtista, ámbar
Beto, verde Scalerics). Contenido entre y 580 y y 1440. Abajo, en y 1470-1550, la ONDA de audio
de `ambiente.html` (toma el color de quien habla) y en y 1596 los rótulos "REC · BINAURAL" y "ASMR
PARA DORMIR / USÁ AURICULARES": no taparlos. Logo en y ~1746.

## Lo que ya está hecho
- `armar.mjs`: fondo violeta con luz de velador abajo a la izquierda y reflejo azul a la derecha;
  subtítulos con acento por voz (`reel.json` → `voces`); reescribe los tiempos de `ambiente.html`.
- `compositions/ambiente.html`: viñeta, onda de audio, REC que titila, parpadeo en "tranca" y
  "¿guardé?", la LUZ del cuarto que se prende cuando entra Scalerics (52.3) y se apaga antes de
  "durmiendo" (63.4).
- Música de fondo propia (`assets/bgm/bed.mp3`): ruido marrón suave (cuarto) + acorde de pad que
  cambia a uno más claro cuando entra Scalerics. Sonidos extra: `suspiro` (sintetizado), `tipeo`,
  `ronquido`, `tic`, `drone`, `blip`, `beep`.
- Voz: `partes/voces.sh` (genera), `partes/tiempos.sh` (normaliza, corta y saca tiempos),
  `partes/componer.mjs` (acorta pausas internas, atempo 1.25 susurro / 1.08 Beto / 1.12 Orus,
  pega con 0.3-0.45 s y arma `palabras.json` y `guion.txt`; `partes/fix.json` corrige "que").

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el cuarto de ASMR con la paleta de
> arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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



## Escenas (tiempos relativos a cada escena; ver `tiempos.md`)

### s01-shhh (6.32 s) · el gancho
Cuadro 0: la ASMRtista (x 360) con el dedo en los labios y el micrófono binaural (x 790) ya
dibujados. "shhh..." en susurro grande (0.05) con arcos de sonido que laten hacia el micrófono; la
oreja izquierda del micrófono se inclina. Etiqueta "ASMR · PARA DORMIR" (0.9). "dormir" (1.36):
luna y estrellas. Baja el brazo y susurra. "comerciante" (2.72): la ASMRtista se va a la esquina y
aparece Beto con la luz azul de la pantalla en la cara, cansado. "no duerme" (3.72): abre los ojos
de golpe, sacudón, sello rosa "NO DUERME". "abrió" (5.07): etiqueta ámbar "ABIERTO 24 H".

### s02-once-cuarenta (5.73 s)
"hola..." susurrado. Reloj ámbar "23:39" (once 0.80) que cambia a "23:40" en "cuarenta" (1.52).
"Beto" (1.92): el reloj se achica arriba a la izquierda y aparece el escritorio: velador, Beto
cabeceando, monitor con la planilla. "panadero" (2.48): etiqueta "BETO · PANADERO". "pedidos de
WhatsApp" (3.52-4.0): tres mensajes ("2 tortas", "1 docena", "¿hay pan?") vuelan a las filas 4-6,
que se llenan.

### s03-orejas (5.05 s)
Micrófono binaural grande al centro. "izquierda" (0.39): L lavanda, la oreja izquierda se mueve,
arcos; tres mensajes entran por la izquierda y se meten en la oreja (1.19). "derecha" (2.55): R
ámbar, oreja derecha; "más pedidos" (3.48): una catarata de seis mensajes entra por la derecha y
el micrófono se satura (vibra, LED).

### s04-copiar (3.02 s)
Teclas "Ctrl + C" y "V" arriba; chat de WhatsApp a la izquierda y planilla a la derecha. Cada
"copiar" (0, 1.38): Ctrl+C se hunden y el mensaje se selecciona; cada "pegar" (0.70, 2.14):
Ctrl+V y el texto se tipea en la fila 9 y 10. El cursor va y viene.

### s05-pedido-doce (4.00 s)
La planilla grande; la fila 12 resaltada se tipea en cada palabra: "12" (doce 0.40), "Ofelia",
"2 doc. bizcochos" (1.11), "mañana" (2.84). "bizcochos" (1.82): medialuna que flota con destellos.

### s06-baja-la-voz (3.78 s)
Beto grande se da vuelta, enojado, con el dedo en los labios. Parlante con rayitas de volumen y
el micrófono chiquito. "bajar" (1.20): las rayitas se apagan una a una; "voz" (1.66): al micrófono
se le caen las orejas y se apaga el LED. "trabajando" (2.31): sello ámbar "TRABAJANDO".

### s07-se-tranca (4.16 s)
"perdón..." susurrado, la ASMRtista baja la cabeza. "favorito" (1.42): etiqueta "MI FAVORITO",
estrellitas, las orejas del micrófono se mueven. "la planilla" (2.35): entra la planilla con la fila
de Ofelia. "tranca" (3.18): velo blanco, título "PEDIDOS · (NO RESPONDE)" en rosa, ruedita de
carga que gira hasta el final, sacudón y sello "NO RESPONDE" (coincide con el parpadeo de
ambiente).

### s08-guarde (3.32 s)
Beto en pánico con las manos en la cara. Cada "no" (0, 0.18, 0.55): sacudón y un "NO" ámbar que
crece. "¿Guardé?" (1.27): disquete con un ? rosa que se balancea. "Decime" (1.99): gota de sudor,
la cabeza suplica.

### s09-pedido-listo (4.87 s)
Celular con el chat de la "Sra. Ofelia" ("¿y mis bizcochos?") y una mano. "Uno por uno" (1.08):
etiqueta "UNO POR UNO · A MANO". "Pedido listo" (1.92): el dedo aprieta enviar y sale el globo.
Cambia de chat a mano (Marcelo, "¿la torta?") y otra vez (3.39). Sello "FALTAN: MUCHOS" (4.05).

### s10-ofelia (5.32 s)
Beto graba un audio con el celular en la boca. "Ofelia" (0.47): globo de audio "SRA. OFELIA" con
la onda que late. "bizcochos" (1.93): medialuna. "una" (3.73): reloj rosa "01:00" y luna.
"Perdón" (4.41): Beto baja la cabeza, gota; Ofelia contesta "zzz..." a la 01:01.

### s11-la-vida (6.73 s) · el giro
"relajante..." susurrado. "vos" (1.36): panel de arriba, el que mira duerme feliz con auriculares
(zzz, estrellas). "Para vos" (2.66): etiqueta; "ASMR" (3.83): título lavanda. "Para Beto" (4.82):
panel de abajo, Beto despierto frente a la planilla, con la luz azul. "vida" (5.83): sello ámbar
"LA VIDA"; el panel de arriba se apaga.

### s12-automatizamos (5.65 s) · entra Scalerics
Se prende la luz (ambiente) con un clic. Beto feliz, sello verde "¡A DORMIR!" (andá 0.50); se va
por la derecha. "Eso" (1.07): celular con WhatsApp y tres pedidos, planilla a la derecha;
"automatizamos" (1.83): se dibuja el tubo verde punteado; "Scalerics" (2.34): etiqueta
"AUTOMÁTICO". "pedidos... pasan solos" (3.3-4.53): cada pedido viaja como bolita verde por el
tubo y su fila se llena sola con tilde verde.

### s13-solo (4.19 s)
Celular: la lista de chats recibe "Pedido listo" con doble tilde verde, uno atrás del otro, sin
mano (0.2-0.84); etiqueta "SIN TOCAR NADA" (solo 1.23). "reporte" (1.94): pantalla bloqueada
"23:40" con luna; "día" (2.39): notificación "REPORTE DEL DÍA" que se tipea: "Pedidos: en la
planilla", "Avisos: enviados", "Vos: a dormir".

### s14-cta (10.01 s)
Se apaga la luz. Beto durmiendo en la cama (gorro de panadero sobre la almohada), zzz y
ronquido; el micrófono binaural al lado mueve las orejas. "¿A qué hora" (2.56): la cama sube y se
achica, entra la pregunta "¿A qué hora cerraste vos la planilla?" ("la planilla" en ámbar, brilla en
3.72). "Susurralo" (4.81): campo de comentario "Agregá un comentario..."; "comentarios" (5.69): se
escribe a mano "shhh... a las 00:40" y el borde se pone verde. Queda latiendo hasta el final.
