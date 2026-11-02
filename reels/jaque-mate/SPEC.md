# Reel "Jaque mate": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA, ángulo SEGUIMIENTO (le escribe al que preguntó y
no compró y al que dejó de venir). Formato P: PERSONAJE DE LA CULTURA POPULAR, la TRANSMISIÓN DE TV de un
torneo de ajedrez ("Torneo del Barrio", inventado; "Gambito de Dama" solo nombrado, sin logos ni caras).
El GRAN MAESTRO (voz Charon, solemne) abre con el final: "Jaque mate. Y vos ni te enteraste de que estabas
jugando." El AYUDANTE (voz Puck, no entiende nada) presenta: tu local contra el de enfrente, "como Gambito
de Dama, pero sin glamour". Juegan las blancas: la CLIENTA (Leda) pregunta "¿cuánto salen las zapatillas
blancas en treinta y ocho?"; el DUEÑO de la zapatería (Fenrir): "Tres mil novecientos. Cualquier cosa,
avisame." "Buena apertura. Y ahora... el reloj." "¿Y cuándo mueve?" "Mañana le escribo." "Eso dijo hace tres
días." Mueve el de enfrente: le escribe a tu clienta ("¿Eso se puede?" "Se puede. Se llama seguimiento."),
y después a Walter, el que dejó de venir. "Walter vuelve. Pero a la de enfrente. Jaque." "¡Pará, pará!
¡Estaba atendiendo el mostrador!" "Jaque mate." "¿Pero juega mal?" GIRO: "No. Juega solo. Atiende, cobra,
repone, y entre jugada y jugada se le van tres días. El de enfrente no juega mejor: tiene ayuda." Entra
Orus: "Esa ayuda la hacemos en Scalerics: un agente de IA que le escribe solo al que preguntó y no compró,
y al que dejó de venir." El AGENTE (Kore): "Hola, ¿te guardo las blancas en treinta y ocho?" Clienta:
"¡Sí! El sábado paso." "¡Movieron las blancas!" "Revancha." CTA (Orus): "¿Y vos? ¿Cuántas partidas dejaste
abiertas esta semana? Contanos en los comentarios."
Voz armada por partes (partes/voces.sh -> recortar.sh -> pausas.mjs -> tiempos.sh -> componer.mjs; atempo
1.22 maestro y ayudante, 1.18 dueño y Orus, 1.15 clienta, 1.2 agente): 71.1 s; reel 74.3 s.
(partes/13.json corregido a mano: "Jaque" arranca en 3.1 s del parlamento.)

## RECURSO VISUAL CENTRAL
El TABLERO en perspectiva (marfil/ébano, marco de madera) donde cada cliente es una pieza con cara: la
clienta es un PEÓN BLANCO con colita, Walter un PEÓN con gorra bordó, tu local el REY BLANCO con delantal
de cuero, el de enfrente el CABALLO NEGRO canchero (mueve en L, rápido). El RELOJ DE AJEDREZ doble con
dígitos de segmentos: el de TU LOCAL corre y salta a 72:00 (tres días) mientras el de ENFRENTE gasta un
minuto. El rojo es el JAQUE. Con Scalerics aparece la DAMA VERDE (el agente de IA, con cara de pantalla)
al lado del rey blanco, y el reloj del local vuelve a cero en verde.

## ESTILO: TRANSMISIÓN DE AJEDREZ POR TV
Fondo en armar.mjs: estudio de paneles de madera oscura con vetas y un foco cálido al centro; desde
"Scalerics" se prende un brillo verde suave. ambiente.html: arriba a la izquierda el "bug" ébano con borde
latón (rey blanco + TORNEO DEL BARRIO · RONDA 1 · EN VIVO con punto rojo; desde "Scalerics" borde verde y
CON AGENTE DE IA · REVANCHA); abajo a la izquierda la chapa de quién habla (EL GRAN MAESTRO oro · EL
AYUDANTE rojo claro · EL DUEÑO madera clara · LA CLIENTA rosa · EL AGENTE DE IA verde · SCALERICS verde);
abajo a la derecha el reloj de ajedrez TU LOCAL / ENFRENTE con segmentos (TU LOCAL en rojo claro corre:
00:03 hasta "reloj", sube a 72:00 en "días", sigue corriendo; ENFRENTE pasa a 00:01 en "Movió"; con
"Scalerics" TU LOCAL vuelve a 00:00 en verde); borde rojo que titila en el gancho, en "Jaque" y en "Jaque
mate"; viñeta; flash marfil en "Scalerics".
Personajes planos con contorno tinta grueso (stroke 6-8), piezas en `assets/ajedrez.js` (window.AJ):
tablero(TB) y casilla(TB, col, fila) para ubicar piezas en perspectiva; pieza(tipo, x, y, s, color, o)
con caras (feliz, susto, triste, duda, canchero, pantalla) y extras (colita, gorra, delantal); maestro
(pelado con canas, cejas grises enormes, lentes redondos de latón, barba gris, saco de tweed, moño bordó;
caras seria/sorna/triste/enfatico; brazo dedo/pieza); ayudante (jopo revuelto, auriculares con micrófono,
saco bordó; caras feliz/grito/duda/triste; brazos arriba/cabeza); dueño (bigote, lápiz en la oreja,
camisa marfil, delantal de cuero; caras desganado/grito/susto/triste/feliz; brazo celular/caja); reloj de
ajedrez con seg(); celular con chat y globos.
Letras: Cinzel 900 (títulos, sellos, chapas), Cormorant Garamond itálica (notación de jugadas), IBM Plex
Mono (tags), Lexend (chat y subtítulos).

## Paleta (SOLO estos)
- Madera `#4a2c17` · `#7a4a26` · `#b07a45` (fondo, marco, mesa, delantal).
- Marfil `#f3e6c8` (sombra `#d9c7a0`) y ébano `#2a211b` / `#4a3a30` (tablero y piezas), tinta `#1c1612`.
- Latón `#d4a73a` (oscuro `#a67c1f`): bordes, tags, lentes.
- Rojo jaque `#d7263d` (claro `#ff8a8a`, bordó `#7a1f2b`): sellos de jaque, borde rojo, reloj del local.
- Solo desde "Scalerics" se suma verde `#5ce611` (oscuro `#3f9e0b`): la dama agente, halos, reloj en verde.
- Piel y canas solo en personajes.
Subtítulos: marfil con contorno tinta; acento oro (maestro), rojo claro (ayudante), madera clara (dueño),
rosa (clienta), verde (agente y Scalerics).
Este estilo manda sobre SPEC-base (que queda abajo para las reglas técnicas): acá hay rellenos, colores,
serif y sombras duras a propósito.

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
- s01-mate (0.00): tablero; el rey blanco con delantal ya tambalea en el cuadro 0; sello JAQUE MATE en
  "mate" y el rey cae (tumbar); el caballo negro canchero da un saltito; "?" sobre el rey en "vos"; nota
  "0-1 ni te enteraste" en "jugando".
- s02-torneo: mesa de transmisión: el maestro (serio) y el ayudante (feliz, gritando) detrás de un
  escritorio de madera con micrófonos; placa TORNEO DEL BARRIO en "Torneo"; en "Tu local" y "enfrente" dos
  carteles TU LOCAL (blancas) vs EL DE ENFRENTE (negras); en "Gambito" tag COMO GAMBITO DE DAMA; en
  "glamour" sello torcido SIN GLAMOUR y el maestro con sorna.
- s03-apertura: tablero; en "blancas" el peón con colita (la clienta) avanza; en "pregunta" globo "¿$?";
  nota "1. ¿precio?" en "precio".
- s04-chat: celular grande de la zapatería: entra el mensaje de la clienta en "Hola"; zapatilla blanca
  con N° 38 en "zapatillas"; el dueño contesta "$ 3.900. Cualquier cosa, avisame." en "Tres", tildes.
- s05-reloj: maestro con dedo en "Buena apertura"; en "reloj" el reloj de ajedrez gigante (TU LOCAL corre,
  la banderita roja), en "cuándo" el ayudante con duda asoma.
- s06-manana: el dueño desganado con una caja en "Mañana"; en "Eso dijo" el calendario pasa hojas LUN
  MAR MIÉ; sello HACE 3 DÍAS en "días" y telaraña sobre el celular.
- s07-enfrente: tablero; en "Movió" el caballo negro salta en L al lado del peón clienta; globo del
  caballo "¿Te las guardo?" en "escribió"; ayudante a los gritos "¿ESO SE PUEDE?" en "Eso".
- s08-seguimiento: maestro con sorna; en "seguimiento" placa de apertura APERTURA: EL SEGUIMIENTO.
- s09-walter: tablero; el peón con gorra (Walter) lejos, en gris; en "escribe" el caballo le manda un globo;
  en "vuelve" Walter camina al lado negro; en "Jaque" línea roja del caballo al rey y sello JAQUE.
- s10-para: el dueño a los gritos con caja y celular ("¡Pará!"); en "Jaque mate" corte al tablero, el rey
  cae, sello JAQUE MATE y 0-1; en "juega mal" el ayudante triste.
- s11-solo: maestro serio (giro); el dueño solo en el mostrador con 4 brazos: en "Atiende" celular, en
  "cobra" ticket, en "repone" caja; en "jugada" los relojes; en "tres días" sello 72 HS.
- s12-ayuda: la mesa del de enfrente: el caballo negro y detrás una silueta con signo de pregunta que le
  sopla jugadas; en "ayuda" la silueta se ilumina (sin revelar quién).
- s13-agente: en "Scalerics" flash, la dama verde con cara de pantalla aparece al lado del rey blanco con
  halo verde; título AGENTE DE IA; en "preguntó" línea verde a la clienta; en "dejó de venir" línea verde
  a Walter.
- s14-revancha: celular: mensaje del agente "Hola, ¿te guardo las blancas en 38?" en "Hola"; respuesta
  "¡Sí! El sábado paso." en "Sí"; en "Movieron" el ayudante con los brazos arriba; sello REVANCHA en
  "Revancha".
- s15-cta: tres tableritos con relojes y tag PARTIDA ABIERTA; título "¿Cuántas partidas dejaste
  abiertas?"; tag verde CONTANOS EN LOS COMENTARIOS en "Contanos".
