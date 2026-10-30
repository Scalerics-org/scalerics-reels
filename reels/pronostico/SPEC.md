# Reel "Pronóstico para tu local": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; este reel vende UNA cosa:
el AGENTE DE IA que atiende el WhatsApp del comercio cuando llueven los mensajes). Formato P:
EL PRONÓSTICO DEL TIEMPO DE LA TELE. La METEORÓLOGA (voz Zephyr, canchera, exagerada) frente al
mapa: "Alerta naranja para tu local. Este domingo a la noche te llueven mensajes, y vos sin
paraguas." Tormenta desde el oeste, "ráfagas de '¿a cuánto está?'", "granizo de audios de cuatro
minutos", "probabilidad de visto: altísima". "Vamos con el móvil." El MOVILERO (Puck, piloto de
lluvia amarillo, empapado, gritando sobre el viento): "¡Acá estamos, en el ojo de la tormenta!
Don Walter, ¿por qué no contesta?". DON WALTER (Charon, empapado detrás del mostrador, sin
paraguas, le llueven globitos de mensajes): "¡Estoy en el mostrador! ¡Yo contesto cuando para!".
"No para, Walter. Mire: una clienta se refugia... en el de enfrente." La CLIENTA (Leda): "Pregunté
si tenían mi talle. Nada. Enfrente me contestaron al toque, con precio, y me lo apartaron."
Meteoróloga: "Atención: frente frío del de enfrente. Se lleva a tus clientes." GIRO (movilero):
"¡Pero enfrente llueve igual! Lo que tienen es paraguas: un agente de IA que contesta precios,
toma pedidos y agenda turnos, aunque sea domingo a la noche." Walter: "¿Me está diciendo lento?"
"No, Walter. Usted está solo bajo la tormenta." Meteoróloga: "Para fin de mes: más lluvia.
Sensación térmica: cliente enojado." Cierra Orus (Scalerics): "En Scalerics te armamos el
paraguas. ¿Qué pronóstico tiene tu local? Dejalo en los comentarios." Voz de 68.77 s, total 71.97 s.

Recurso visual central: el MAPA DEL TIEMPO de la tele (costa inventada, isobaras, frentes con
triangulitos, nubes que en vez de gotas largan GLOBITOS DE MENSAJE) y la LLUVIA DE MENSAJES que
le cae encima al dueño. El PARAGUAS VERDE (el agente de IA) es lo único verde del reel.

## ESTILO: MAPA METEOROLÓGICO DE TV. Edición cargada.
Todo se ve como el segmento del tiempo de un noticiero: arriba la pastilla naranja "EL TIEMPO" y
la hora, abajo el ZÓCALO del clima que cambia con cada tramo y la tira "EXTENDIDO" que corre con
pronósticos graciosos de la semana (eso lo hace `ambiente.html`, fijo). Las escenas son los
PLANOS: el ESTUDIO (la meteoróloga parada a la derecha frente al MAPA, con su clicker, señalando)
y el MÓVIL en exteriores (lluvia diagonal de globitos de mensaje, el movilero con piloto amarillo
y micrófono, el local de Walter, el de enfrente). Cortes secos, sacudones con los truenos,
relámpagos (flash blanco), íconos de clima que hacen pop, números de temperatura gigantes.
Personajes dibujados GENÉRICOS, planos (rellenos azul noche con contorno blanco grueso y un color
de identidad). Nada de logos de canales reales, nada de caras reales.

## Paleta (SOLO estos colores)
- Azul noche `#061428` (fondo) y `#0b2547` (rellenos de personajes, paneles, el MAR del mapa).
- Azul mapa `#14457a` (la TIERRA del mapa, paneles, cosas apagadas).
- Celeste lluvia `#5ec8ff`: gotas y globitos de mensaje que llueven, triangulitos del frente
  frío, el dueño (Walter) y su acento en los subtítulos.
- Naranja alerta `#ff8a1f`: ALERTA NARANJA, la meteoróloga (blazer), el pin "TU LOCAL", zócalo.
- Amarillo `#ffd23f`: el piloto de lluvia del movilero, el cubo del micrófono, la clienta,
  relámpagos, la hora.
- Blanco `#f4f6fb`: contornos, isobaras (al 35%), textos fuertes, la barra del zócalo.
- Verde Scalerics `#5ce611`: SOLO el paraguas = agente de IA (desde s09) y el CTA.
Brillos (drop-shadow del mismo color) en 1-2 cosas por escena como máximo.
Prohibido: emojis, fotos, rayas largas en textos visibles, logos o caras de gente real.

## Personajes (iguales en todas las escenas que aparecen: están en `partes/escenas/comun.py`)
Contorno `#f4f6fb` stroke 7, rellenos `#0b2547`, round caps/joins.
- METEORÓLOGA: pelo largo con ondas (relleno blanco), blazer NARANJA, clicker en la mano que
  señala el mapa (el brazo rota con `svgOrigin`).
- MOVILERO: piloto de lluvia AMARILLO con capucha, micrófono con cubo amarillo "MÓVIL", gotas
  que le chorrean.
- DON WALTER: pelo mojado pegado, bigote, delantal blanco, detrás de un mostrador; empapado
  (gotitas celestes que le caen de la cabeza), brazos que manotean.
- CLIENTA: colita alta, campera amarilla, celular en la mano.
- EL PARAGUAS VERDE (el agente de IA): paraguas verde abierto con dos ojitos de línea en la tela.

## Tipos de letra
Lexend 800-900 para zócalos, carteles, temperaturas y palabras gigantes (mayúsculas); IBM Plex
Mono 500 para hora, rótulos chicos, datos del mapa, interfaz de celular. Nada que haya que leer
de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~400, `subtitulos.html`; el acento de cada palabra tiene el color de
quien habla: naranja meteoróloga, amarillo movilero y clienta, celeste Walter, verde Scalerics;
lo arma `armar.mjs` con `voces`). Las escenas NO escriben la frase entera. Contenido de las
escenas entre y 540 y y 1400, x 40-1040. Arriba (y 90-190) y abajo (y 1410-1690) manda
`ambiente.html`.

## Capa fija: `compositions/ambiente.html` (DELANTE de las escenas)
- Arriba izquierda: pastilla naranja "EL TIEMPO" + rótulo blanco del plano ("ESTUDIO ·
  PRONÓSTICO" / "MÓVIL · OJO DE LA TORMENTA"). Arriba derecha: caja amarilla "DOM 22:47:10"
  con segundos que corren.
- Abajo (y 1420-1580): ZÓCALO del clima. Cartela naranja (o celeste/amarilla) + barra blanca con
  el titular. Cambia en 0, 6.22, 11.19, 13.64, 18.87, 23.38, 27.12, 32.12, 38.60, 43.74, 47.55,
  52.56, 58.44; se va en 63.4 (el CTA es limpio).
- Abajo (y 1606-1676): tira celeste "EXTENDIDO" que corre con el pronóstico gracioso de la semana.
- Borde naranja de ALERTA que late en 0 y en 38.60; relámpago (flash blanco) en 6.85
  ("tormenta"), 20.23 y 43.74 (el giro).
- Audio: `assets/bgm/clima.mp3` (lo genera `partes/cortina.mjs`): cortina liviana de segmento
  del clima (acordes de piano eléctrico, pulso suave), con truenos sintetizados en los relámpagos
  y un acorde mayor cuando entra Scalerics.

## Cómo están hechas las escenas
Todas se generan con `python3 partes/escenas/gen.py partes/escenas/sNN.py` (desde
`reels/pronostico`): cada `sNN.py` tiene ID, DUR, CSS (`$` = selector de la escena), HTML, JS y
SFX; `gen.py` pone el esqueleto, los helpers (`golpe`, `pop`, `entra`, `dibujar`, `habla`,
`sacudon`, `lluvia`) y la salida con blur; `comun.py` tiene los personajes, el mapa, la nube y el
paraguas. Para cambiar una escena, editá su `.py` y regenerala. OJO: `svgOrigin` va en
coordenadas del propio elemento (si está dentro de un `<g transform>`, en coordenadas locales).

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el mapa del tiempo con la paleta de
> arriba, rellenos y zócalos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
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

**s01-alerta** (6.22 s, ESTUDIO). "Alerta naranja para tu local. Este domingo a la noche te
llueven mensajes, y vos sin paraguas."
- Cuadro 0 lleno: cartel naranja gigante "ALERTA NARANJA" (Lexend 900, con triángulo de
  alerta) que cae de golpe con sacudón, sobre el mapa ya dibujado (costa, isobaras).
- 1.16 "tu local": el cartel se va hacia arriba y cae un PIN naranja en el mapa con la etiqueta
  "TU LOCAL"; anillos de radar que se expanden. La meteoróloga entra por la derecha.
- 2.32 "domingo": chip mono "DOM 22:00" junto al pin. 3.30 "llueven mensajes": aparece una nube
  gorda sobre el pin y empiezan a caer GLOBITOS DE MENSAJE celestes. La meteoróloga señala.
- 4.91 "sin paraguas": ícono de paraguas blanco con una cruz naranja encima (golpe).

**s02-tormenta** (7.42 s, ESTUDIO, mapa). "Se viene una tormenta desde el oeste: ráfagas de '¿a
cuánto está?', granizo de audios de cuatro minutos, y..."
- 0.63 "tormenta": nube negra enorme con relámpago entra desde la izquierda (oeste) arrastrando
  una flecha gruesa curva hacia el pin; letrero "O" de oeste. Relámpago (lo da `ambiente`).
- 2.70 "ráfagas": tres ráfagas de viento (líneas curvas con rulo) que cruzan el mapa; 3.58
  "¿a cuánto está?": cada ráfaga lleva una cartelita "¿A CUÁNTO ESTÁ?" que vuela (3 copias,
  distinto tamaño).
- 4.97 "granizo": caen piedras de granizo que son GLOBITOS DE AUDIO (botón play + onda) con
  "4:00" en mono; rebotan contra el piso del mapa. Sacudón en cada tanda.

**s03-visto** (5.23 s, ESTUDIO). "probabilidad de visto: altísima. Vamos con el móvil."
- Panel de pronóstico tipo tarjeta: "PROBABILIDAD DE VISTO" con una barra que se llena
  (0 a 1.3 s) y una aguja; a 1.33 "visto" aparece un doble tilde gigante celeste.
- 2.87 "altísima": la barra revienta el tope, el número "100%" (chiste) late en naranja y la
  tarjeta tiembla. Sello "ALTÍSIMA".
- 3.66 "Vamos con el móvil": la meteoróloga señala a la derecha; la tarjeta se achica a un
  recuadro "MÓVIL" (pantalla dividida) con lluvia adentro que crece y llena la pantalla.

**s04-movil** (4.51 s, MÓVIL). "¡Acá estamos, en el ojo de la tormenta! Don Walter, ¿por qué no
contesta?"
- Lluvia diagonal de globitos y gotas en toda la escena. El MOVILERO (piloto amarillo, capucha)
  en primer plano a la izquierda con el micrófono, se inclina contra el viento; la capucha
  flamea.
- 1.09 "ojo de la tormenta": arriba, remolino de nube (espiral) que gira.
- 2.43 "Don Walter": a la derecha aparece el local de Walter (toldo celeste, cartel "WALTER")
  y Walter detrás del mostrador, chorreando; el movilero le acerca el micrófono.
- 3.45 "contesta?": signo de pregunta gigante amarillo.

**s05-walter** (3.74 s, MÓVIL, primer plano de Walter). "¡Estoy en el mostrador! ¡Yo contesto
cuando para!"
- Walter grande en el centro detrás del mostrador (caja, bolsas), le llueven globitos que le
  rebotan en la cabeza; manotea.
- 0.57 "mostrador": golpe de la mano en el mostrador, sacudón.
- 1.90 "contesto cuando para": cartela amarilla torcida "¡CUANDO PARA!" y el celular en el
  mostrador vibrando con un contador de mensajes que sube (99+).

**s06-refugia** (5.00 s, MÓVIL, la calle). "No para, Walter. Mire: una clienta se refugia... en el
de enfrente."
- Plano de calle bajo la lluvia: a la izquierda el local de Walter (apagado), a la derecha EL
  DE ENFRENTE con toldo amarillo y luz.
- 0.09 "No para": cartel "NO PARA" que cae. 1.81 "clienta": la clienta cruza corriendo con la
  campera sobre la cabeza. 3.00-4.00 "en el de enfrente": la cámara panea a la derecha y la
  clienta entra bajo el toldo del de enfrente (seco). Cartela "SE REFUGIÓ ENFRENTE".

**s07-clienta** (6.48 s, MÓVIL, testigo). "Pregunté si tenían mi talle. Nada. Enfrente me
contestaron al toque, con precio, y me lo apartaron."
- La clienta a la izquierda, bajo el toldo del de enfrente; a la derecha su CELULAR grande con
  dos chats. 0.46: chat "LOCAL DE WALTER": su globo "¿Tienen talle M?" y abajo "visto" con
  tilde; 1.57 "Nada": cartel "NADA" con eco.
- 2.52 "Enfrente": el celular cambia al chat "EL DE ENFRENTE": su pregunta y, 3.76 "al toque",
  la respuesta inmediata "¡Sí! Talle M a $ 1.490"; 5.18 "apartaron": globo "Te lo aparto. ¿Pasás
  mañana?" y sello "APARTADO".

**s08-frente** (5.14 s, ESTUDIO, mapa). "Atención: frente frío del de enfrente. Se lleva a tus
clientes."
- Borde naranja de alerta (lo da `ambiente`). El mapa con dos pines: "TU LOCAL" (naranja) y "EL
  DE ENFRENTE" (amarillo). 0.0 cartel "ATENCIÓN".
- 1.16 "frente frío": una línea de FRENTE FRÍO con triangulitos celestes se dibuja desde el de
  enfrente y avanza sobre tu local.
- 3.30 "se lleva a tus clientes": puntitos/personitas que estaban alrededor de tu pin se
  deslizan hacia el de enfrente siguiendo la flecha. La meteoróloga se lamenta.

**s09-paraguas** (3.81 s, MÓVIL, el de enfrente). "¡Pero enfrente llueve igual! Lo que tienen es
paraguas: un agente de IA..."
- Relámpago de giro (lo da `ambiente`). Plano del de enfrente: le llueve IGUAL (misma lluvia de
  globitos). 0.63 "llueve igual": cartela "LLUEVE IGUAL".
- 2.18 "paraguas": se ABRE de golpe un PARAGUAS VERDE gigante sobre el mostrador de enfrente;
  los globitos rebotan contra la tela. 2.99 "agente de IA": el paraguas abre dos ojitos y
  aparece la etiqueta "AGENTE DE IA" verde.

**s10-agente** (5.01 s, MÓVIL). "que contesta precios, toma pedidos y agenda turnos, aunque sea
domingo a la noche."
- El paraguas verde arriba; abajo, debajo de él, un celular con un chat donde los globitos que
  caen se convierten en respuestas verdes: 0.55 "precios" ("Talle M: $ 1.490"), 1.55 "pedidos"
  ("Pedido anotado"), 2.55 "turnos" ("Turno: lunes 10:00").
- 3.64 "domingo a la noche": reloj "DOM 23:14" con luna; el paraguas se balancea tranquilo.

**s11-solo** (5.88 s, MÓVIL). "¿Me está diciendo lento? No, Walter. Usted está solo bajo la
tormenta."
- Walter ofendido, señalándose: 0.48 "lento": cartela "¿LENTO?" con un caracol dibujado.
- 2.26 "No, Walter": la cámara se aleja: Walter chiquito, solo, en el medio de la calle con una
  nube negra encima SOLO para él, lloviéndole. 3.80 "solo": cartela "SOLO". El movilero le pone
  el micrófono como paraguas (no sirve, chiste).

**s12-extendido** (5.07 s, ESTUDIO). "Para fin de mes: más lluvia. Sensación térmica: cliente
enojado."
- Tablero de PRONÓSTICO EXTENDIDO: cuatro días (columnas) con íconos; la última "FIN DE MES"
  con una nube de tormenta doble. 0.98 "más lluvia": la nube de fin de mes crece.
- 2.04 "sensación térmica": un TERMÓMETRO gigante que sube hasta reventar; 3.44 "cliente
  enojado": la bola del termómetro es una cara enojada naranja, con vapor.

**s13-cta** (8.46 s, CTA, Scalerics). "En Scalerics te armamos el paraguas. ¿Qué pronóstico tiene
tu local? Dejalo en los comentarios."
- Fondo limpio (ambiente se fue). Paraguas verde gigante se abre en el centro con lluvia
  rebotando; 0.19 "Scalerics": nombre "SCALERICS" en verde debajo.
- 2.55 "¿Qué pronóstico tiene tu local?": tarjeta del tiempo vacía con signo de pregunta y tres
  íconos opcionales (sol, nube, tormenta) que hacen pop como opciones de encuesta.
- 3.97 "Dejalo en los comentarios": globo de comentario grande con cursor que escribe
  "Tormenta..." y la flecha hacia abajo. Queda quieto ~3 s.
