# Reel "Papá, no quiero": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: el
SITIO WEB (rápido en el celular, con horarios, cómo llegar y botón a WhatsApp), nombrado una sola
vez, al final. Formato D (historia familiar / confesión) en DIÁLOGO padre-hijo, filmado como
VIDEO CASERO VHS.

El HIJO (voz Puck, pibe de veintipico, cariñoso y canchero) filma a su padre con la cámara vieja
de la familia y se lo larga: "Papá, no me voy a quedar con el negocio." El PADRE (voz Charon,
pizzero de toda la vida, grave y cansado) se ofende: "¿Cómo que no? ¡Treinta años levantando la
cortina! ¡Treinta!". El hijo: en Google dice "cerrado permanentemente"; "¡Pero si estoy acá!
¡Abierto! ¡Con la radio prendida!". "Andá a decírselo a Google. ¿Y la página? Es el teléfono
pintado en el toldo. Con siete números. Eso ya no existe, papá." (referencia uruguaya: los
teléfonos fijos pasaron a ocho cifras). "Ese número lo sabe todo el mundo." "Todo el mundo de tu
edad. Mis amigos no saben que existís. Buscan pizza y les sale la de la otra cuadra. Y vos tenés
la mejor pizza del barrio." El padre, quebrado: "¿La mejor?". GIRO: "La mejor, viejo. Por eso te
lo digo. No es que no quiera el negocio. Así como está, no. Si lo ponemos en internet, me quedo."
Silencio. El padre: "¿Y eso cuánto lleva?". STOP de la cámara y pantalla azul de casetera: entra
el narrador de Scalerics (voz Orus): "Hacemos tu sitio web: rápido en el celular, con tus
horarios, cómo llegar y un botón a WhatsApp. Para que la cortina se siga levantando treinta años
más. Mandáselo a tu viejo. O a tu hijo."
Voz de 64.0 s, reel de 67.23 s. Locución armada por parlamentos (`partes/voces.sh`,
`partes/componer.mjs`).

## RECURSO VISUAL CENTRAL: la cámara de video casera
Todo el reel es la grabación de una camcorder vieja: OSD "● REC" arriba a la izquierda (el punto
titila), batería que se va gastando y "SP" arriba a la derecha, fecha "PM 7:42 / OCT. 29 2026" abajo
a la izquierda y contador de cinta abajo a la derecha (amarillo OSD). Cámara en mano (deriva
suave en todas las escenas), zoom de la cámara con la barra "T ▮▮▮ W" sobre la cara del padre
(s02 y "¿la mejor?" en s09), cortes con ruido y rayas de tracking, una banda de tracking que baja
cada tanto, grano, líneas de barrido y viñeta. Antes de Scalerics la cámara hace "■ STOP" (51.75)
y desde 52.29 es la PANTALLA AZUL de casetera con "▶ PLAY". Lo arma `compositions/ambiente.html`.

## Paleta (SOLO estos colores)
- Azul VHS `#2b4cd1`: pantalla azul del final, buzo del hijo, aberración de color.
- Amarillo OSD `#f2e35b`: textos de la cámara, "30", acento de subtítulos, lo bueno.
- Rojo REC `#ff3b3b`: el punto de REC, sellos, tachaduras, "NO".
- Crema lavado `#e9dfc6`: trazos, delantal, textos grandes.
- Sombra `#1a1622`: siluetas, contornos gruesos de los textos.
- Tomate `#c8553d`: toldo, mostrador, gorrita, cabecera del sitio.
- Desde s12 (Scalerics) se suma verde `#5ce611` para lo que funciona (barra de carga, abierto, botón).
Prohibido: emojis, fotos, rayas largas (—), logos reales (ni Google ni WhatsApp: buscador y
botón genéricos, solo nombrados).

## Personajes (siluetas genéricas; las escenas se generaron con `partes/gen/*.mjs`)
PADRE: cabeza redonda oscura con contorno crema, gorro de pizzero, bigote crema, delantal con
mancha de tomate. HIJO: buzo azul con capucha, gorrita tomate para atrás. Vecinos: siluetas
chicas; "de tu edad" les suma canas, anteojos y bastón. Brazos con poses (abajo, amasar, arriba,
pecho, frente, cabeza) que cambian con `attr d`.

## Tipos de letra
Lexend 800-900 en mayúsculas con contorno oscuro grueso y aberración roja/azul para lo grande;
IBM Plex Mono 600 para el OSD. Subtítulos Lexend 600 crema con aberración, acento amarillo.

## Zona
OSD arriba (y 90-200) y abajo (y 1570-1690); subtítulos y 236-430; logo y ~1746. Contenido de
cada escena entre y 560 y 1500.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el video casero VHS con la paleta de
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


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-rec (2.77 s).** Cuadro 0: el padre amasando detrás del mostrador tomate, cartel "EL HORNO" y
reloj en la pared. "no" (0.19): se queda duro, ojos grandes, cejas arriba. "negocio" (1.43): la
masa se aplasta, boca abierta, cae "NO ME QUEDO." rojo sobre el mostrador, sacudón.

**s02-treinta (5.41 s).** Zoom de la cámara a la cara del padre enojado (barra de zoom en el OSD).
"¡Treinta" (1.34): brazos arriba, "30" amarillo gigante y "AÑOS". Corte (2.0) a la persiana de la
pizzería que sube y baja cinco veces con sol/luna y "AÑO 1 … AÑO 30". "¡Treinta!" (4.10): vuelve a
la cara, "30" de nuevo más fuerte, zoom más cerrado, sacudón doble.

**s03-cerrado (5.54 s).** El celular sube a cámara en la mano del hijo (manga azul). "Pero te
busqué" (1.36): se escribe "pizzería el horno". "Dice" (2.80): ficha con mapa. "cerrado" (3.34):
titila la línea roja; "permanentemente" (3.80): sello rojo gigante "CERRADO PERMANENTEMENTE".

**s04-abierto (4.46 s).** El padre se golpea el pecho ("acá", 0.5); "¡Abierto!" (0.90): abre los
brazos y se prende titilando el neón "ABIERTO". "radio prendida" (2.8): la radio del mostrador salta
y salen notas.

**s05-pagina (3.32 s).** El celular con el "cerrado" se achica y tiembla; "ANDÁ A DECÍRSELO" (0.37).
Corte (2.0) a un navegador vacío "www.???" con un "?" gigante y el cursor; "¿LA PÁGINA?" (2.24).

**s06-toldo (5.82 s).** El frente del local: toldo a rayas con "TEL. 409 27 13" pintado en el faldón.
"teléfono" (0.23): círculo amarillo; zoom al número (0.7); el toldo flamea (1.26); "siete" (2.47):
se cuentan los dígitos 1 a 7; "Eso ya no existe" (3.93-4.34): cruz roja y "NO EXISTE".

**s07-todo-el-mundo (4.07 s).** El padre de brazos cruzados, orgulloso. "todo el mundo" (1.1):
aparecen cuatro vecinos, dos con globos "409 27 13". "de tu edad" (2.41-3.06): les salen canas,
anteojos y bastón; "(DE TU EDAD)" amarillo; al padre se le cae la sonrisa.

**s08-otra-cuadra (4.83 s).** Tres amigos del hijo con el celular y un "?" cada uno ("existís",
0.95). Corte (1.96) a un mapa: se escribe "pizza cerca"; "sale" (3.29): el pin cae en "LA OTRA
CUADRA" con ondas; EL HORNO se apaga con un "?".

**s09-la-mejor (4.01 s).** Pizza de muzza girando con vapor; "mejor" (0.52) medalla "1";
"barrio" (1.26) cinta "LA MEJOR DEL BARRIO". Corte (2.5) a primer plano del padre (zoom en el
OSD), cejas tristes, bigote que tiembla y una lágrima en "¿mejor?" (2.81).

**s10-asi-no (6.32 s).** El hijo da vuelta la cámara (selfie). Sonríe en "la mejor, viejo",
asiente en "por eso te lo digo". "No es que no quiera" (2.89): se corre y aparece el frente chico;
corazón en "negocio" (3.79). "Así como está" (4.81): telarañas, el toldo se cae; "no." (5.53): "NO."
rojo gigante, niega con la cabeza.

**s11-cuanto (5.74 s).** El frente entra en un celular; ondas de wifi en "internet" (0.86); "ME
QUEDO." (1.83). Corte (2.45) al padre en silencio: tres puntos que aparecen, el reloj que avanza,
mira a los costados. "¿Y eso cuánto lleva?" (3.77): se rasca la cabeza, ceja arriba, "¿CUÁNTO
LLEVA?". Al final el OSD pasa a "■ STOP".

**s12-sitio (9.55 s).** Pantalla azul, "▶ PLAY". Entra un celular con el sitio de EL HORNO: barra
de carga verde y chip "RÁPIDO" (1.49), "Abierto ahora" con horarios (3.09), mapa "CÓMO LLEGAR" con
ruta (3.87), botón verde "Escribinos por WhatsApp" (4.86). "Para que la cortina" (6.09): sale el
celular, entra la persiana, que sube (6.55) y adentro están padre e hijo juntos, saludando;
"TREINTA AÑOS MÁS" (7.95).

**s13-cta (5.39 s).** Pantalla azul, un casete VHS con ruedas que giran; en la etiqueta, a mano:
"MANDÁSELO A TU VIEJO." (palabra por palabra) y "O A TU HIJO." rojo (1.48). Debajo "SCALERICS ·
SITIOS WEB" (2.3). Queda quieto hasta el final.
