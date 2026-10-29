# Reel "Pelea de gallos": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; este reel vende UNA cosa:
el AGENTE DE IA que atiende el WhatsApp del comercio). Formato P: BATALLA DE FREESTYLE callejera.
Un PRESENTADOR (voz Puck) abre: "¡Arriba las manos! De este lado, el dueño del local. Del otro,
el agente de IA. Primer round. ¡Tiempo!". Round 1: el DUEÑO (Charon, rapero veterano, cansado y
orgulloso) tira "yo contesto cuando puedo: el que quiere, que sepa esperar... a mí no me gana una
máquina sin corazón"; el público hace "uuuh". La AGENTE DE IA (Kore, rapera filosa y fría)
contesta: "Vos contestás cuando podés. Yo contesto cuando querés. Sin corazón, capaz. Pero
despierta a las tres." UUUH grande. "¡Se picó! ¡Segundo round!". El dueño: "yo atiendo cara a
cara, sé cómo toma el mate la Clara... y si no anda el posnet: pasá el lunes, sin prisa" (se
hunde solo: risas/uuuh). La agente remata: "a las once no hay cara; le tomo el pedido y le agendo
el turno a la Clara; si es para vos, te paso la charla. No vengo a robarte el puesto: vengo a
devolverte el domingo." UUUH enorme. JURADO + narrador (Orus): "gana el agente. Y el dueño
también: recupera el domingo. Armamos el agente de IA de tu comercio. ¿Quién ganó? Comentá DUEÑO
o AGENTE." Voz de 72.2 s, total 75.35 s.

## ESTILO: BATALLA CALLEJERA de noche. Edición CARGADA.
Pared de ladrillo con graffiti genérico (palabras sueltas y dibujos propios, sin marcas ni
firmas reales) detrás de todo, conos de luz magenta y cian que barren, flashes estroboscópicos
en cada remate, el público en silueta abajo que levanta las manos en cada "uuuh". Los MCs son
personajes dibujados genéricos: el DUEÑO (señor de delantal, bigote, gorra, termo bajo el brazo)
en MAGENTA; la AGENTE DE IA (silueta geométrica con visor y auriculares, cara de pantalla con dos
ojos de línea) en CIAN. Palabras clave GIGANTES estilo cartel de batalla: Lexend 900 en
mayúsculas, inclinadas (skew/rotate -4 a -8 grados), con sombra dura desplazada de otro color
(text-shadow sin blur, tipo sticker), que CAEN de golpe en su palabra con sacudón. Carteles de
nombre ("MC DUEÑO", "MC AGENTE DE IA") como chapas grandes. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Negro noche `#07060b` / `#110d18` (fondo, rellenos de siluetas).
- Magenta neón `#ff2bd6`: el DUEÑO (su chapa, su dibujo, sus palabras, su barra del aplausómetro).
- Cian `#19e3ff`: la AGENTE DE IA.
- Amarillo `#ffe83d`: el presentador, ROUND, el reloj, el jurado, los "UUUH".
- Hueso `#f5f1ea`: textos fuertes neutros.
- Verde Scalerics `#5ce611`: SOLO desde s13 (el giro: ganan los dos) y en el CTA.
Brillos (text-shadow / drop-shadow del mismo color) permitidos en 1-2 cosas por escena. Prohibido:
emojis, fotos, rayas largas (—) en textos visibles, logos o caras de personas reales.

## Tipos de letra
Lexend 800-900 para lo grande; IBM Plex Mono 500 para reloj, rótulos, UI. Nada que haya que leer
de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420, `subtitulos.html`; el acento de cada palabra tiene el color de
quien habla: lo arma `armar.mjs` con `voces` del reel.json). Las escenas NO escriben la frase
entera. Contenido de las escenas entre y 560 y y 1400, x 50-1030. Arriba (y 90-180) y abajo
(y 1420-1720) manda `ambiente.html`.

## Capas fijas (ya hechas)
- `compositions/pared.html` (DETRÁS de las escenas): pared de ladrillo, graffiti genérico
  ("RIMA", "BARRIO", corona, flechas, estrellas, chorreados) muy apagado, deriva lenta.
- `compositions/ambiente.html` (DELANTE): conos de luz que barren; arriba a la izquierda la chapa
  de quién habla (PRESENTADOR / MC DUEÑO / MC AGENTE DE IA / JURADO) y a la derecha "ROUND 1 ·
  0:30" con cuenta regresiva; abajo el APLAUSÓMETRO (barra magenta DUEÑO contra cian AGENTE) que
  se mueve en cada "uuuh", y el público en silueta que levanta las manos. Flashes en los remates:
  18.55, 30.69, 45.97, 60.05 y la bocina en 63.8 (segundos globales).
- Audio: `assets/bgm/beat.mp3` (lo genera `partes/beat.mjs`): beat boom-bap de 90 BPM sintetizado,
  scratch, murmullo, "uuuh" del público en 18.55 / 30.69 / 45.97 / 60.05, festejo y bocina en
  63.8. Va como bgm (volumen 0.6) en vez de bed.mp3.

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es batalla callejera con la paleta de
> arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
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


## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Tiempos por palabra en `tiempos.md`.

**s01-arriba** (3.40 s). "¡Arriba las manos! De este lado, el dueño del local."
- Cuadro 0 ya lleno: "ARRIBA" gigante amarillo a medio caer, micrófono de líneas que tiembla.
- 0.38 "LAS MANOS" cae debajo; dos manos de silueta suben desde abajo. Sacudón.
- 1.33 "DE ESTE LADO" + flecha magenta a la izquierda; 2.19 entra el DUEÑO dibujado (magenta) desde
  la izquierda con chapa "MC DUEÑO".

**s02-versus** (4.09 s). "Del otro, el agente de IA. Primer round. ¡Tiempo!"
- 0.12 desde la derecha entra la AGENTE (cian) con chapa "MC AGENTE DE IA"; el dueño queda a la
  izquierda; "VS" amarillo gigante en el medio (0.7) con flash.
- 1.93 "ROUND 1" chapa amarilla; 3.01 "¡TIEMPO!" gigante + reloj que arranca, sacudón fuerte.

**s03-barrio** (5.94 s). Dueño: "Treinta años en el barrio, ¿y me venís a enseñar? Yo contesto
cuando puedo: el que quiere, que sepa esperar."
- El dueño grande a la izquierda moviendo el brazo al ritmo (cada 0.667 s). 0.0 "30 AÑOS" magenta
  inclinado; 1.59 "¿ME VENÍS A ENSEÑAR?" cartel.
- 3.19 "CUANDO PUEDO" gigante magenta; 4.96 un reloj de pared con agujas que giran rápido y un
  cartel colgado "ESPERE" amarillo.

**s04-corazon** (6.07 s). "Tengo libreta, tengo mate, tengo la llave del portón. A mí no me gana
una máquina sin corazón."
- Tres objetos caen en fila en su palabra: libreta (0.08), mate con bombilla (0.96), llave
  grande (1.85), cada uno con su golpe y rótulo.
- 3.62 "NO ME GANA" + 3.97 "UNA MÁQUINA" + 4.59 "SIN CORAZÓN" gigante magenta con un corazón de
  línea que se parte. 5.1 (uuuh, global 18.55) "UUUH" amarillo enorme, flash.

**s05-diez** (5.12 s). Agente: "¿Cuando podés? Divino. Te escribieron a las diez. Contestaste el
martes: ya compró en otro, ¿no ves?"
- La agente a la derecha (cian), con los brazos cruzados. 0.44 "DIVINO." con comillas irónicas.
- 1.15 un celular grande: burbuja "¿tenés talle M?" con hora "22:00"; 2.65 abajo la respuesta del
  dueño con hora "MARTES" en magenta, y 3.72 un sello "VENDIDO EN OTRO
  LADO" cian que cae encima.

**s06-queres** (7.05 s). "Vos contestás cuando podés. Yo contesto cuando querés. Sin corazón,
capaz. Pero despierta a las tres."
- Dos columnas: 0.37 "CUANDO PODÉS" magenta a la izquierda (se apaga), 1.96 "CUANDO QUERÉS" cian
  a la derecha (grande, con brillo).
- 3.11 un corazón de línea cian que se dibuja con signo de pregunta "¿capaz?"; 4.97 reloj digital
  "03:00" cian que titila y la agente con ojos abiertos; "DESPIERTA" gigante.
- 6.07 (global 30.69) UUUH gigante + flash, todo tiembla.

**s07-round2** (2.88 s). Presentador: "¡Se picó! ¡Segundo round!"
- 0.20 "¡SE PICÓ!" amarillo gigante con llamitas de línea; 1.28 "ROUND 2" que golpea como cartel,
  el reloj se reinicia.

**s08-cara** (5.98 s). Dueño: "Pará la mano, maquinita: yo atiendo cara a cara. Sé el nombre de
todos, y cómo toma el mate la Clara."
- El dueño adelante, mano extendida de "pará" (0.0). 0.71 "MAQUINITA" magenta burlón.
- 2.04 "CARA A CARA" con dos perfiles de línea enfrentados; 3.19 una libreta con nombres que se
  tildan; 4.78 un mate magenta con rótulo "LA CLARA: AMARGO".

**s09-posnet** (6.25 s). "Vos sos una pantalla, yo tengo la sonrisa. Y si no anda el posnet:
pasá el lunes, sin prisa."
- 0.39 una pantalla de línea cian (la agente) vs 1.72 una sonrisa magenta enorme del dueño.
- 3.22 un posnet dibujado con pantalla "ERROR" que titila; 3.92 un cartel colgado "PASÁ EL
  LUNES" que se balancea; 5.4 (global 45.97) el público: "UUUH" + "JAJA" amarillos, el dueño se
  da cuenta (gota de sudor).

**s10-once** (7.18 s). Agente: "¿Cara a cara? Precioso. Pero a las once no hay cara. Yo le tomo el
pedido y le agendo el turno a la Clara."
- 1.0 "PRECIOSO." cian. 2.38 reloj "23:00" + persiana del local bajada con "CERRADO", 3.27 "NO HAY
  CARA" gigante.
- 4.77 celular de la agente: burbuja "PEDIDO TOMADO" con tilde; 5.92 "TURNO: CLARA · 10:30" con
  tilde; los tildes cian hacen pop.

**s11-domingo** (7.32 s). "Si es para vos, te paso la charla, tranquilo. No vengo a robarte el
puesto: vengo a devolverte el domingo."
- 0.96 flecha de la agente al dueño: un chat que viaja de un celular cian a uno magenta, rótulo
  "PARA VOS"; 1.84 "TRANQUILO." 
- 3.35 "ROBARTE EL PUESTO" tachado; 4.94 hoja de calendario gigante "DOMINGO" hueso con "LIBRE"
  cian; 5.56 golpe. 6.09 (global 60.05) UUUH ENORME + flash + todo tiembla.

**s12-jurado** (2.91 s). Orus: "El jurado decidió: gana el agente."
- Tres tarjetas de jurado (amarillas) que se dan vuelta una a una en 0.47-1.3: dicen "AGENTE".
- 1.56 "GANA" + 2.06 "EL AGENTE" gigante cian, la agente con el brazo en alto; bocina (global
  63.8), confeti de líneas.

**s13-tambien** (2.83 s). "Y el dueño también: recupera el domingo."
- Giro: entra el dueño en hamaca paraguaya con el mate (verde Scalerics + magenta), 0.36
  "TAMBIÉN" verde; 1.95 "DOMINGO RECUPERADO" sello verde. Los dos MCs chocan los puños.

**s14-cta** (8.33 s). "Armamos el agente de IA de tu comercio. ¿Quién ganó? Comentá DUEÑO o AGENTE."
- 0.43 "AGENTE DE IA" verde con "PARA TU COMERCIO"; rótulo mono "SCALERICS".
- 2.45 "¿QUIÉN GANÓ?" amarillo gigante; 3.51 botón grande "DUEÑO" magenta y 4.47 "AGENTE" cian,
  con "COMENTÁ" arriba; los dos laten al beat hasta el final.
