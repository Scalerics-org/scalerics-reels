# Reel "Último momento": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo; este reel vende UNA cosa:
el AGENTE DE IA que atiende el WhatsApp del comercio). Formato P: NOTICIERO DE ÚLTIMO MOMENTO.
La CONDUCTORA en el estudio (voz Kore, solemne como si fuera una catástrofe nacional): "Último
momento. Un comercio de barrio pierde a sus clientes, y el dueño le echa la culpa al dólar.
Vamos con nuestro móvil en el lugar." El CRONISTA en la vereda (Puck, movilero chusma): "Adentro:
el dueño, el mostrador y una mosca. Don Raúl, ¿qué pasó?". DON RAÚL (Charon, cansado, quejoso):
"Y, es el dólar, querido. La gente no tiene un peso. Antes esto se llenaba." "¿Y el WhatsApp del
local?" "Lo miro a la noche. Cuando me acuerdo." La VECINA (Leda) sale con bolsas... del local de
enfrente: "Le escribí a las once de la noche para ver si tenía pañales. Nada. Le escribí al de
enfrente, y me contestó al toque. Con precio y todo." GIRO: el cronista cruza: el dueño de
enfrente estaba durmiendo; "el que contesta es un agente de IA". Raúl: "¿Y el dólar?" Cronista:
"El dólar está igual para los dos, Raúl." Conductora: "Insólito. Seguiremos informando." Cierra
Orus (Scalerics): "Esto pasa en todos los barrios. En Scalerics te armamos el tuyo. Mandáselo al
que le echa la culpa al dólar." Voz de 64.07 s, total 67.27 s.

## ESTILO: NOTICIERO DE TV. Edición cargada.
Todo se ve como una transmisión: arriba el "EN VIVO" rojo que titila y la hora, abajo el ZÓCALO
rojo y blanco que cambia con cada tramo y el TICKER amarillo que corre con titulares graciosos
(eso lo hace `ambiente.html`, fijo). Las escenas son los PLANOS: el estudio (escritorio, la
conductora, pantalla gigante detrás con el gráfico), y el MÓVIL en la calle (fachada del local,
el cronista con su micrófono con cubo amarillo, el dueño en la puerta, la vecina con bolsas).
Cortes de cámara secos (los planos entran con un golpe, no con fundidos lentos), recuadros de
"pantalla dividida" estudio/móvil, flashes rojos de "URGENTE", cartelas de "EXCLUSIVO". Personajes
dibujados GENÉRICOS, planos (rellenos azul oscuro con contorno blanco grueso y un color de
identidad). Nada de logos de canales reales, nada de caras reales.

## Paleta (SOLO estos colores)
- Azul estudio: noche `#050d22`, oscuro `#0b1d4a` (rellenos de personajes y paneles), medio
  `#1f4fa8` (pantallas, paneles del estudio, líneas apagadas).
- Rojo urgente `#e3212d` (zócalos, URGENTE, EN VIVO, el dueño y su "dólar"); rojo claro
  `#ff5a5f` solo para texto rojo sobre azul (el contraste).
- Blanco `#f4f6fb`: contornos de los dibujos, zócalo, textos fuertes.
- Amarillo `#ffd21f`: EN VIVO/hora, el cubo del micrófono del móvil, los carteles de
  EXCLUSIVO, la vecina (sus bolsas).
- Verde Scalerics `#5ce611`: SOLO desde s11 (el agente de IA, el giro) y en el CTA.
Brillos (drop-shadow/text-shadow del mismo color) en 1-2 cosas por escena como máximo.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o caras de gente real.

## Personajes (iguales en todas las escenas que aparecen)
Contorno `#f4f6fb` stroke 7, rellenos `#0b1d4a`, round caps/joins.
- CONDUCTORA: pelo carré (relleno blanco con contorno), saco ROJO `#e3212d`, aros, papeles en la
  mano, detrás de un escritorio azul medio con borde blanco.
- CRONISTA: pelo parado, campera azul, micrófono en la mano con CUBO AMARILLO que dice "MÓVIL"
  (Lexend 900).
- DON RAÚL: pelado con flequillo al costado, bigote grande, delantal BLANCO (relleno `#f4f6fb`
  al 90%), brazos cruzados o abiertos, cara de resignado (cejas caídas).
- VECINA: rodete, campera, dos BOLSAS AMARILLAS llenas (con cosas que asoman).
- EL AGENTE DE IA (desde s11): un celular con cara (ojos de línea) y auriculares, en VERDE.

## Tipos de letra
Lexend 800-900 para zócalos, carteles y palabras gigantes (mayúsculas, sin inclinar: es tele,
no batalla); IBM Plex Mono 500 para hora, rótulos chicos, interfaz de celular. Nada que haya que
leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~400, `subtitulos.html`; el acento de cada palabra tiene el color de
quien habla: amarillo noticiero/vecina, rojo claro el dueño, verde Scalerics; lo arma
`armar.mjs` con `voces`). Las escenas NO escriben la frase entera. Contenido de las escenas
entre y 540 y y 1400, x 40-1040. Arriba (y 90-190) y abajo (y 1410-1720) manda `ambiente.html`.

## Capa fija (ya hecha): `compositions/ambiente.html` (DELANTE de las escenas)
- Arriba izquierda: pastilla roja "● EN VIVO" (el punto titila) + rótulo blanco del lugar
  ("ESTUDIO CENTRAL" / "MÓVIL 3 · DESDE EL BARRIO" / "ESTUDIO CENTRAL"). Arriba derecha: la
  hora en caja amarilla "20:59" con segundos que corren.
- Abajo (y 1420-1580): ZÓCALO. Cartela roja (URGENTE, EN VIVO, HABLA EL DUEÑO, TESTIGO,
  EXCLUSIVO, ÚLTIMO MOMENTO) + barra blanca con el titular en azul. Cambia en 0, 8.09, 14.59,
  21.13, 26.16, 37.81, 42.16, 47.82, 50.50, 54.83; se va en 58.0 (el CTA es limpio).
- Abajo (y 1606-1676): TICKER amarillo que corre a la izquierda con titulares graciosos.
- Flash rojo de URGENTE en 0 y 54.83; flash blanco de corte en 47.82 (el giro).
- Audio: `assets/bgm/noticiero.mp3` (lo genera `partes/cortina.mjs`): cortina de noticiero
  sintetizada (golpe de apertura, pulso urgente tipo reloj) a volumen bajo.

## Cómo están hechas las escenas
`s01-urgente.html` está escrita a mano. `s02` a `s14` se generan con
`python3 partes/escenas/gen.py partes/escenas/sNN.py` (desde `reels/ultimo-momento`): cada `sNN.py`
tiene ID, DUR, CSS (`$` = selector de la escena), HTML, JS y SFX; `gen.py` pone el esqueleto, los
helpers (`golpe`, `pop`, `entra`, `dibujar`, `habla`, `sacudon`) y la salida con blur. Para cambiar
una escena, editá su `.py` y regenerala. OJO: `svgOrigin` va en coordenadas del propio elemento
(si está dentro de un `<g transform>`, en coordenadas locales de ese grupo).

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es noticiero con la paleta de arriba,
> rellenos y zócalos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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

**s01-urgente** (5.99 s, ESTUDIO). "Último momento. Un comercio de barrio pierde a sus clientes, y
el dueño le echa la culpa al dólar."
- Cuadro 0 lleno: cartel rojo gigante "ÚLTIMO MOMENTO" (dos líneas, Lexend 900 blanco sobre
  rojo) cayendo de golpe con flash; barras rojas que barren de costado.
- 1.30 corte al estudio: la CONDUCTORA detrás del escritorio (abajo, y ~1000-1400) y la pantalla
  gigante detrás (y ~560-960) con un local dibujado (toldo y persiana) y abajo "CLIENTES" con un
  contador que baja 47 → 3 en 2.29-3.05 ("pierde ... clientes"): el número es el chiste.
- 4.00 en la pantalla aparece el dueño señalando un billete con "US$"; 5.24 "DÓLAR" rojo
  sello gigante con flecha para arriba, sacudón.

**s02-movil** (2.10 s). "Vamos con nuestro móvil en el lugar."
- Pantalla dividida: a la izquierda la conductora chiquita, a la derecha un recuadro que se abre
  (0.2) con barras de color de "sin señal" que en 0.68 ("móvil") pasan a la calle; cartel amarillo
  "MÓVIL 3 · EN VIVO" que golpea en 0.68.

**s03-local** (4.93 s, MÓVIL). "Estamos en la puerta del local. Adentro: el dueño, el mostrador y
una mosca."
- Fachada del local (toldo rojo a rayas, cartel "ALMACÉN Y DESPENSA", vidriera, puerta) con el
  CRONISTA adelante a la izquierda con el micrófono (cubo MÓVIL). Cuadro 0 lleno.
- 1.71 "Adentro": zoom de cámara a la vidriera (todo escala 1 → 1.6 hacia la puerta).
- 2.57 adentro se ve DON RAÚL tras el mostrador (2.85-3.23 aparece el mostrador vacío), estantes
  vacíos; 4.19 una MOSCA que vuela haciendo loops con línea de puntos; rótulo "UNA MOSCA".

**s04-raul** (4.27 s, MÓVIL). "Don Raúl, ¿qué pasó? Y, es el dólar, querido."
- Plano de entrevista: DON RAÚL grande a la derecha, el micrófono del cronista entra desde la
  izquierda (0.11). Cartela de nombre en la escena: "DON RAÚL · COMERCIANTE" (0.40).
- 1.57 Raúl abre los brazos; 2.53 "EL DÓLAR" gigante rojo con un billete de línea que vuela,
  y una flecha roja de gráfico para arriba. 3.29 "QUERIDO" chico, Raúl asiente.

**s05-peso** (3.84 s). "La gente no tiene un peso. Antes esto se llenaba."
- 0.16 un monedero que se abre y cae UNA moneda chiquita que rueda (o una polilla que sale
  volando); rótulo "UN PESO".
- 1.86 "ANTES": recuadro sepia-azul de archivo con "ARCHIVO 1998" y una fila de gente dibujada
  esperando en la puerta del local; 2.64 "SE LLENABA" con la fila que se va desvaneciendo.

**s06-whatsapp** (5.03 s). "¿Y el WhatsApp del local? Lo miro a la noche. Cuando me acuerdo."
- 0.20 un celular grande con WhatsApp del local: globito rojo con "147" mensajes sin leer (el
  número es chiste), lista de chats "¿Tienen pan?", "¿Abren el domingo?", "Hola?? ".
- 1.83 Raúl de costado mira el celular con anteojos en la punta de la nariz; 2.33 una luna;
  3.45 "CUANDO ME ACUERDO" en cartel, con un nudo en el dedo (recordatorio) o un signo de ?;
  los mensajes siguen subiendo (148, 149...).

**s07-vecina** (6.49 s, MÓVIL). "Tenemos a una vecina que sale con bolsas... del local de
enfrente. Señora, ¿por qué se fue?"
- 0.67 entra la VECINA desde la derecha con dos BOLSAS amarillas llenas; 1.71 "bolsas" las
  bolsas rebotan.
- 2.19-3.52 suspenso: cámara que panea la calle de izquierda a derecha y aparece la fachada del
  local de ENFRENTE (toldo amarillo, cartel "ABIERTO"), flecha amarilla "ENFRENTE".
- 4.68 el micrófono del cronista se le pone delante; "¿POR QUÉ SE FUE?" cartela.

**s08-once** (5.16 s). Vecina: "Ay, me da cosa. Le escribí a las once de la noche para ver si
tenía pañales. Nada."
- 0.0 la vecina se tapa la cara (me da cosa). 1.04 celular: chat con "Raúl Almacén"; 1.91
  burbuja "¿Tenés pañales?" con "23:00"; reloj grande "23:00" amarillo.
- 3.24 paquete de pañales chiquito; 4.20 "NADA." gigante + los dos tildes grises y un grillo
  (cri cri) o tres puntitos que nunca llegan.

**s09-toque** (4.35 s). "Le escribí al de enfrente, y me contestó al toque. Con precio y todo."
- Celular del de enfrente: 0.08 burbuja "¿Tenés pañales?" 23:01; 1.51 respuesta inmediata
  "¡Sí! Talle G, $ 690. ¿Te lo guardo?" 23:01 (llega rapidísimo, con ping); 1.98 sello amarillo
  "AL TOQUE"; 2.75 la etiqueta de precio que se balancea.

**s10-cruzamos** (5.66 s, MÓVIL). "Cruzamos a ver quién contesta a esa hora. Y el dueño de enfrente
estaba durmiendo."
- 0.0 el cronista cruza la calle corriendo con el micrófono (cebra, de izquierda a derecha),
  cartel "EXCLUSIVO" amarillo (0.86). 2.67 la fachada de enfrente de noche con luna.
- 3.62 adentro por la ventana: el dueño de enfrente DURMIENDO en una cama/sillón con "Zzz"; 4.48
  "DURMIENDO" y el celular al lado prendido que brilla.

**s11-agente** (2.68 s). "El que contesta es un agente de IA."
- EL GIRO. 0.15 corte blanco; el celular con cara de AGENTE DE IA (verde) contestando chats que
  suben solos; 1.39-1.86 "AGENTE DE IA" gigante verde con brillo y cartela "REVELACIÓN".

**s12-dolar** (4.33 s). "¿Y el dólar? El dólar está igual para los dos, Raúl."
- 0.20 Raúl con cara de desconcierto, un "?" rojo; 1.33 una BALANZA de línea blanca con un
  billete "US$" en cada platillo (izquierda "RAÚL", derecha "ENFRENTE") que se equilibra en 2.13
  "igual"; 2.73 "=" gigante amarillo. 2.83 Raúl se queda duro (gota de sudor).

**s13-insolito** (3.42 s, ESTUDIO). "Insólito. Seguiremos informando."
- La conductora en el escritorio, ordena los papeles; 0.0 "INSÓLITO" sello rojo gigante; 1.34
  la cámara se aleja (el plano se achica) y aparece "SEGUIREMOS INFORMANDO" en la pantalla.

**s14-cta** (9.02 s). Orus: "Esto pasa en todos los barrios. En Scalerics te armamos el tuyo.
Mandáselo al que le echa la culpa al dólar."
- Se apaga la tele: efecto de TV vieja que se cierra en una línea (0.0) y se abre limpio en
  verde. 0.30 mapa de barrio de líneas con muchos puntitos rojos (locales) que se prenden;
  1.92 el logo de Scalerics (`assets/logo-blanco.png`) grande + el celular-agente verde; 3.30 "EL
  TUYO" verde.
- 3.90 "MANDÁSELO" gigante + una flecha de compartir (avión de papel) + "al que le echa la culpa
  al DÓLAR" con dólar tachado en verde. Queda quieto-vivo hasta el final (respira).
