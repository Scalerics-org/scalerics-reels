# Reel "Toma catorce": spec de escenas

Reel vertical 1080x1920 de Scalerics. Vende **agentes de IA** (atiende el WhatsApp del local al
instante, a cualquier hora, con tus precios y horarios, toma el pedido y te pasa la conversación
cuando es para vos). Formato P (cultura popular): **detrás de cámaras de un rodaje / blooper**.
Están filmando la publicidad de una pizzería de barrio inventada, "Lo de Beto". La DIRECTORA
(rodete, auriculares con micrófono, megáfono amarillo, Kore) abre seca: "Toma catorce. Catorce
tomas para que un comerciante diga una frase sin agarrar el celular. ¡Acción!". BETO (pelado, bigote,
gorro de pizzero, delantal blanco sobre camisa roja, Puck) arranca "Hola, soy Beto. En mi pizzería
te atendemos como en..." y le suena el WhatsApp: "Hola, ¿hacen delivery?" (clienta, Leda) "¡Sí,
reina! Ya te paso el menú." "¡Corten! Toma quince. Celular en silencio. ¡Acción!" Vuelve a vibrar:
"¿A qué hora cierran?" (señora Marta, Zephyr) "¡A la medianoche, querida!" "¡Corten! Toma dieciséis.
Esto ya tiene más partes que Rápido y Furioso. Vicky, sacale el celular." Forcejeo con la asistente
VICKY (rulos, remera amarilla STAFF), se cae la claqueta: "¡No, pará, que me están pidiendo dos
muzzarellas!". GIRO (la directora, calma): "Actuás bárbaro. El problema es que sos el único que
atiende ese teléfono. Prometés atender como en casa, y mientras filmás, tus clientes quedan en
visto." Beto: "¿Y quién les contesta, si estoy yo solo?". Entra Orus (Scalerics): "Un agente de IA.
Atiende tu WhatsApp al instante, a cualquier hora, con tus precios y tus horarios. Toma el pedido, y
cuando la charla es para vos, te la pasa. Vos, hacé la tuya. Lo armamos en Scalerics." Directora:
"Toma diecisiete. La buena. ¡Acción!" Beto, perfecto: "En mi pizzería te atendemos como en casa.
Aunque yo esté filmando." Cierre de la directora: "¡Esa va! Mandáselo al que no termina una frase
sin mirar el celular."
Voz de 68.7 s, reel de 71.9 s, cinco voces (ver `partes/voces.sh`; Kore directora, Puck Beto, Leda
clienta, Zephyr señora, Orus Scalerics). La parte 11 y la 13 se recortaron con ffmpeg (originales en
`partes/11-orig.wav` y `partes/13-orig.wav`); tiempos por palabra arreglados en `partes/arreglos.mjs`.

## Recurso visual central y ESTILO: set de filmación
Estudio de noche: fondo gris carbón con paneles, piso con marcas de cinta amarilla en X, cables y dos
luces de pie a los costados con haces ámbar (`assets/set.svg` en el fondo de `armar.mjs`). En
`compositions/ambiente.html`: cinta amarilla "SILENCIO · RODANDO" arriba (y 34-92) que se desliza,
"● REC TOMA 14" arriba a la derecha (y 132) que cambia a 15 (15.55), 16 (26.80) y 17 (58.45), y
pasa a "II PAUSA" verde mientras habla Scalerics (45.99 a 58.45); esquinas de visor blancas
(y 470-1690) y viñeta. Objetos recurrentes: la CLAQUETA blanca y negra (barra con rayas que se
cierra de golpe, "clac", en cada "¡Acción!"; número de toma escrito en tiza amarilla, el viejo
tachado en rojo), el MONITOR DE CÁMARA (marco acero, REC titilando, marco de visor, TOMA, batería)
con el interior de la pizzería (horno con fuego, cartel "Lo de Beto", mostrador), la cámara de cine
en trípode con luz roja, notificaciones blancas que bajan y vibran, globos de chat. Personajes de
busto con contorno negro grueso. Tipografía: Lexend 900 en barras (¡CORTEN! rojo, ¡ESA VA!
amarillo), sellos con borde (PARTE 16, EN VISTO, LA BUENA), etiquetas mono amarillas.
Las escenas se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs` (piezas en
`partes/escenas/comun.mjs`: `persona()`, `directora()`, `beto()`, `vicky()`, `megafono()`,
`claqueta()`, `monitor()`, `pizzeria()`, `pizza()`, `camara()`, `luz()`, `celu()`, `celular()`,
`vibra()`, `noti()`, `globo()`, `cono()`, y los helpers `clac`, `abre`, `vibrar`, `pop`, `golpe`,
`entra`, `dibujar`, `habla`, `respira`, `balancea`, `pestanea`, `flash`, `tiembla`, `acerca`). El
ambiente y `assets/set.svg` salen de `node partes/escenas/ambiente.mjs`; la voz de
`partes/voces.sh` + `partes/recortar.sh` + tiempos.mjs por parte + `node partes/arreglos.mjs` +
`node partes/pegar.mjs` (tempos y silencios en `partes/conf.mjs`).

## Paleta (SOLO estos)
- Negro del set `#111014`: contornos, claqueta, fondo de la cinta de película.
- Blanco claqueta `#f4f1ea`: rayas de la claqueta, delantal, notificaciones, flash.
- Amarillo cinta `#ffcc1a`: cinta, megáfono, tiza de los números, etiquetas, ¡ESA VA!, acento de la directora.
- Rojo REC `#ff3b30` (claro `#ff6b5e`): REC, ¡CORTEN!, sellos, camisa de Beto, acento de Beto.
- Ámbar tungsteno `#ff9a3c`: haces de luz, fuego del horno, íconos de las clientas, su acento.
- Acero `#5b6170` (claro `#8a91a3`): monitor, trípodes, equipos.
- Fondo carbón `#2a2630` a `#0b0b0e`. Con Scalerics (s11-s12) entra el verde `#5ce611`, y vuelve en
  la toma 17 en "Respondido por tu agente".
Subtítulos: crema con sombra; acento según quién habla (amarillo directora, rojo claro Beto, ámbar
clientas, verde Scalerics: `reel.voces` en `reel.json`).
Prohibido: emojis, fotos, logos de apps o de películas, caras reales, rayas largas en textos.

## Zona
Cinta y REC arriba (y 34-170); subtítulos y 236 a ~420. Contenido entre y 580 y ~1600. Logo en y 1746.

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


## Escenas (tiempos relativos en `tiempos.md`)
- s01-toma14 (0-7.03): claqueta gigante abierta "LO DE BETO · ESCENA 1 · TOMA 14" ya en el cuadro 0;
  el 14 de tiza cae en "catorce" (0.26) y late en "Catorce" (1.36); sube la directora harta con el
  megáfono; en "tomas" (2.21) se dibujan 14 rayitas de tiza; etiqueta MAKING OF · DÍA 1 en
  "comerciante"; celular con prohibido rojo en "celular" (5.39) que vibra; "¡Acción!" (6.13): clac,
  flash y sacudón.
- s02-beto (7.03-11.01): por el monitor (REC, TOMA 14): Beto en su pizzería, sonriente, habla;
  la pizza aparece en "pizzería" (1.55) y la levanta en "atendemos"; cámara en trípode y luz abajo;
  etiqueta PUBLICIDAD · LO DE BETO; en "en..." (3.10) la imagen tiembla, congelada.
- s03-delivery (11.01-15.55): baja la notificación "CLIENTA · Hola, ¿hacen delivery?" y vibra con el
  celular; Beto gira hacia el celu; globo "¡Sí, reina! Ya te paso el menú" (2.56); la cámara con luz
  roja sigue: etiqueta roja LA CÁMARA SIGUE GRABANDO (2.9).
- s04-corten (15.55-20.77): barra ¡CORTEN! roja de golpe y temblando; la directora grita al
  megáfono; claqueta con el 14 tachado (0.87) y 15 (1.03); celular con campana tachada en
  "silencio" (2.76) + EN SILENCIO; clac en "¡Acción!" (4.37).
- s05-cierran (20.77-26.80): monitor TOMA 15, Beto repite rápido; en "¿A qué hora" (2.78) cambia a
  cara de sorpresa, se le cae la pizza, sube la notificación "SEÑORA MARTA · ¿A qué hora cierran?"
  y vibra; sello amarillo ¿NO ERA EN SILENCIO?; globo "¡A la medianoche, querida!" (4.24).
- s06-dieciseis (26.80-31.82): ¡CORTEN! otra vez; claqueta 15 tachado, 16; en "Esto ya tiene más
  partes" (1.90) pasa la tira de película con las tomas 1 a 18 cada vez más rápido; líneas de
  velocidad en "Rápido" (3.45); sello PARTE 16 inclinado en "Furioso" (3.97).
- s07-vicky (31.82-36.19): entra Vicky (STAFF) con la claqueta; el celular entre las dos manos en
  "sacale" (0.33) y forcejeo; a Vicky se le cae la claqueta en "pará" (2.02); baja la notificación
  "PEDIDO · Dos muzzarellas, ¿me las mandás?" en "muzzarellas" (3.06).
- s08-giro (36.19-39.96): Beto solo bajo un cono de luz; sello ¡BÁRBARO! con estrellitas en
  "bárbaro" (0.31); en "El problema" (1.15) se oscurece todo y el cono se cierra; etiqueta EL ÚNICO
  QUE ATIENDE en "único" (1.94); el celular le vibra en la mano con el contador 1, 2, 3 en "teléfono".
- s09-visto (39.96-43.81): cartel de la publicidad "LO DE BETO · PIZZERÍA / TE ATENDEMOS como en
  casa" con casita; REC titila en "filmás" (1.36); entran tres chats en visto (Clienta, Señora
  Marta, Nico, 21:02 a 21:14) en "tus clientes" (2.25); sello EN VISTO sobre la promesa en "visto".
- s10-solo (43.81-45.99): Beto sentado en un cajón que dice BETO, triste, con el celular que le
  ilumina la cara; el cono se achica; etiqueta roja YO SOLO en "solo" (1.33).
- s11-agente (45.99-51.79): (REC en PAUSA) sube el celular del local con "agente de IA · en línea";
  etiqueta verde AGENTE DE IA; "¿Hacen delivery?" en "Atiende" (1.34) y la respuesta "¡Sí! Hasta la
  medianoche. ¿Qué te mando?" + AL INSTANTE en "instante" (2.35); reloj 03:12 con luna en
  "cualquier" (3.13); chips ✓ TUS PRECIOS (4.26) y ✓ TUS HORARIOS (5.04).
- s12-pasa (51.79-58.45): cae la comanda "PEDIDO · 2 muzzarellas · envío a domicilio" con sello
  verde TOMADO; entra Beto en "y cuando" y el celular vuela a él en "te la" (2.11); PARA VOS, BETO;
  en "Vos" (3.25) Beto a cámara y pulgar arriba en "tuya"; en "Lo armamos" todo se va y aparece el
  logo de Scalerics con AGENTES DE IA (5.29).
- s13-toma17 (58.45-65.19): claqueta 16 tachado, 17; sello LA BUENA (1.34); clac y flash en
  "¡Acción!" (2.00); la claqueta se va arriba y entra el monitor TOMA 17: Beto perfecto con la pizza;
  brillitos en "casa" (4.57); en "Aunque" (5.31) su celular en el mostrador vibra y aparece "Respondido
  por tu agente ✓✓" en verde; Beto guiña en "filmando".
- s14-cta (65.19-71.88): barra ¡ESA VA! amarilla; la directora feliz salta con el megáfono;
  MANDÁSELO (0.82) / AL QUE NO TERMINA UNA FRASE (1.24) / sello rojo SIN MIRAR EL CELULAR (2.57);
  claqueta cerrada con OK; queda quieto ~3 s.
