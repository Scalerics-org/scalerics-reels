# Reel "¿Quién es quién?": spec de las escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo) sobre **CRM**. Formato P:
un JUEGO DE MESA de adivinar quién es, jugado como PROGRAMA DE JUEGOS de la tele con conductor.
Gancho: a Ramiro (dueño de una ferretería de barrio) le escribe un contacto agendado como
"Cliente nuevo 3": "Hola, ¿sigue en pie lo que hablamos?". "¡Y no tenés idea de quién es!".
El conductor lo hace jugar: "¿Te compró algo?" "Eh... no sé." "¿Le prometiste un presupuesto?"
"Puede ser...". "¡Bajá caritas! ¿Es el de la obra? ¿La del calefón? ¿Gómez?" "¿Cuál Gómez?
Tengo tres. Bajo... a la del calefón." "¡Bajó la equivocada! ¡Se termina el tiempo!". La clienta
se cansa ("Bueno... dejá.") y se va a la ferretería de enfrente, que sí se acordaba: "¡Hola,
Silvia! ¿Te paso el presupuesto del calefón?". "¡Era Silvia, la del calefón! Ramiro, perdiste."
"¡Pero si yo me acuerdo de todos mis clientes!". GIRO con el narrador (Orus): "Y se acuerda. Lo
que pasa es que tiene demasiados clientes para jugar de memoria." En Scalerics te armamos un
CRM: cada carita con su nombre, qué te compró y qué le prometiste. Cierre: "¿Cuántos Cliente
nuevo tenés agendados en el celular? Contalo en los comentarios."
Voces: Silvia Leda, conductor Sadachbia, Ramiro Charon, el de enfrente Achird, narrador Orus.

Recurso visual central: EL TABLERO de plástico con caritas en marcos que se abaten (rotationX
hacia atrás, como el juego de verdad), con plaquitas de nombre amarillas ("EL DE LA OBRA", "LA
DEL CALEFÓN", "GÓMEZ" x3...). Ramiro dibujado (canoso, bigote, delantal azul) en su atril de
concursante. Al final el tablero se vuelve el CRM: cada carita con nombre, qué compró y qué le
prometiste.

## ESTILO: TABLERO DE JUEGO DE MESA + estudio de TV. Edición cargada.
Plástico de juguete: rectángulos con esquinas redondeadas (rx 18-28), bordes gruesos tinta
(5-6 px), rellenos planos de colores primarios, fichas redondas con un brillito blanco
(una media luna crema al 50 %), sombras duras desplazadas (box-shadow 0 10px 0 tinta, sin blur)
como juguete. Fondo de estudio azul (lo pone index) con cañones de luz y lamparitas que
persiguen en los bordes (ambiente.html). Títulos de programa en Lexend 900, con borde y sombra
dura. Golpes en la palabra exacta, sacudones, sellos.

## Paleta (SOLO estos)
- Rojo tablero `#e63946`: el tablero de Ramiro, errores, X, sellos de "PERDISTE".
- Azul `#2f5bea`: el tablero del rival / el CRM, delantal de Ramiro.
- Amarillo ficha `#ffc928`: plaquitas de nombre, fichas, acentos, "?" del misterio.
- Crema `#fbf3e0`: caras, cartas, textos grandes.
- Tinta `#14182b`: contornos, sombras duras, texto sobre amarillo/crema.
- Estudio `#0e1636` (fondo, lo pone index). Desde el CRM (Scalerics) se suma verde `#5ce611`
  para lo que se resuelve (tildes, "lo que le prometiste" cumplido).
Prohibido: emojis, fotos, logos o nombres de marcas de juguetes, rayas largas (—) en textos
visibles, degradés de color (solo los del ambiente).

## Tipos de letra
Lexend 700-900 para lo grande y las plaquitas; IBM Plex Mono 500 para rótulos chicos (marcador,
reloj). Nada que haya que leer de menos de 24px.

## Zona
Subtítulos arriba (y 236 a ~420). Contenido entre y 540 y y 1560, x 50-1030. Logo de Scalerics
en y ~1746: no lo tapes. Las lamparitas de ambiente están en x 20 y x 1042, y 520-1500.

## Técnica común
- `assets/caritas.js` (cargalo con `<script src="assets/caritas.js"></script>` después de GSAP):
  `QQ.carita(tipo)` devuelve el SVG de una cara (tipos: obra, calefon, gomez, regatea, bano,
  perro, senora, primo, misterio) y `QQ.ramiro(cara)` el busto de Ramiro (duda, mal, grito,
  sonrisa). Se inyectan con innerHTML al armar la escena (determinista).
- Marco que se abate: div `.sNN-marco` con `perspective` en el padre; GSAP `rotationX: -88`
  con `transformOrigin: "50% 100%"` y un brillo que pasa.
- Salida: los últimos 0.2 s, `opacity 0, scale 0.96, blur(6px)` sobre `#sNN-escena`.

## Lo que ya está hecho
- `index.html` (lo genera `armar.mjs`, fondo azul de estudio, acento amarillo en subtítulos).
- `compositions/ambiente.html`: cañones de luz que barren, lamparitas que persiguen en los
  bordes, ALARMA roja en los costados en 32.4, 34.2 y 47.2 y FLASH de estudio en 6.5, 44.37 y
  57.78 (segundos globales).
- Voces por parlamento en `partes/` (`voces.sh` -> `recortar.sh` -> `tiempos.mjs` -> `componer.mjs`).

## Sonidos extra disponibles
`buzzer` (error de concurso), `correcta`, `tic` (reloj), `aplausos`, `ficha` (plástico),
`uuh` (público), además de los de la lista de abajo.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el tablero de juguete con la paleta
> de arriba. Sí valen las reglas técnicas, la salida, el `.sfx.json` y la verificación.

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
Tiempos exactos por palabra en `tiempos.md` (segundos relativos a cada escena).

**s01-mensaje** (4.53 s). "Hola, ¿sigue en pie lo que hablamos? ¡Y no tenés idea de quién es!"
Celular grande con el contacto "Cliente nuevo 3" (avatar con "?"); los puntitos de escribiendo y
en 0.1 la burbuja del mensaje (23:41). En "idea" (3.37) asoma Ramiro preocupado con una gota de
sudor y el celular tiembla; en "quién" (3.72) cae "¿QUIÉN ES?" gigante amarillo con sacudón.

**s02-programa** (2.67 s). "¡Bienvenidos a ¿Quién es quién?!" Cartel rojo del programa con
lamparitas que titilan; "¿QUIÉN ES" en 1.29 y "QUIÉN?" en 1.97; rótulo "EL JUEGO DEL
COMERCIANTE"; abajo cinco caritas que se paran en fila. Flash de estudio.

**s03-versus** (4.53 s). "Hoy juega Ramiro, de la ferretería, contra Cliente nuevo tres." Atril
rojo "RAMIRO / FERRETERÍA" con Ramiro sonriendo; en "contra" (2.47) "VS" gigante; en "Cliente"
(2.78) entra el atril azul "CLIENTE NUEVO 3" con una carta misteriosa.

**s04-compro** (5.06 s). "Primera pregunta: ¿te compró algo? Eh... no sé." Tarjeta amarilla
"PREGUNTA 1" que se da vuelta; la pregunta en 1.38; Ramiro duda ("Eh..." en 2.79) y en "sé"
(4.09) sello rojo "NO SÉ" con buzzer.

**s05-presupuesto** (5.08 s). "¿Le prometiste un presupuesto? Mmm... puede ser..." Tarjeta
"PREGUNTA 2"; un memómetro SÍ/NO cuya aguja duda de lado a lado; "PUEDE SER..." en 3.18.

**s06-tablero** (5.14 s). "¡Bajá caritas! ¿Es el de la obra? ¿La del calefón? ¿Gómez?" EL
TABLERO rojo 3x3 (el de la obra, Gómez, la del baño, la del calefón, el que regatea, Gómez, el del
perro, Gómez, la señora); "¡BAJÁ CARITAS!" y caen dos; aro amarillo en "obra" (2.06), "calefón"
(3.22) y los tres Gómez (4.06).

**s07-gomez** (5.09 s). "¿Cuál Gómez? Tengo tres. Bajo... a la del calefón." "¿CUÁL GÓMEZ?",
los tres Gómez numerados 1-2-3; una mano duda entre caritas y en "calefón" (3.91) baja la del
calefón.

**s08-equivocada** (4.94 s). "¡Bajó la equivocada! ¡Se termina el tiempo! Bueno... dejá." La
carta del calefón con X roja y "¡EQUIVOCADA!" (0.36, buzzer, alarma); reloj 0:03 -> 0:00 con cuña
roja (1.09-2.18); barrido al celular: "sin respuesta" y la burbuja "Bueno... dejá." (3.95), el
contacto "se fue".

**s09-enfrente** (4.32 s). "¡Uuuh! ¡Se fue a la ferretería de enfrente!" "¡UUUH!" del público;
dos locales (Ramiro rojo, LA DE ENFRENTE azul); la ficha de Silvia salta por la ruta punteada al
de enfrente (1.6-2.96); "CLIENTA PERDIDA".

**s10-hola-silvia** (2.74 s). "¡Hola, Silvia! ¿Te paso el presupuesto del calefón?" El celular
del de enfrente: contacto "Silvia · presupuesto calefón", su mensaje azul con tildes, y ella
responde "¡Sí! Pasámelo."; rótulo "LA DE ENFRENTE SE ACORDABA".

**s11-perdiste** (4.45 s). "¡Era Silvia, la del calefón! Ramiro, perdiste." La carta se levanta
y la plaquita cambia de "LA DEL CALEFÓN" a "SILVIA" (0.27), "¡ERA SILVIA!" (flash); Ramiro triste
y sello "PERDISTE" en 3.13 (buzzer, alarma).

**s12-memoria** (2.82 s). "¡Pero si yo me acuerdo de todos mis clientes!" Ramiro gritando con
globo de historieta "¡ME ACUERDO DE TODOS!" y fichas "?" que flotan.

**s13-cabeza** (4.77 s). "Y se acuerda. Lo que pasa es que tiene demasiados clientes para jugar
de memoria." (Orus, el GIRO.) La nube de pensamiento de Ramiro se llena de caritas cada vez más
rápido, desborda y se caen; "MEMORIA LLENA" en 3.86.

**s14-crm** (6.76 s). "En Scalerics te armamos un CRM: cada carita con su nombre, qué te compró
y qué le prometiste." Panel azul con la ficha: "?" que se da vuelta a la carita de Silvia (3.04),
"SILVIA" (3.74), los tres Gómez con nombre propio, "TE COMPRÓ" (4.71), "LE PROMETISTE: presupuesto
del calefón" (5.76) con tilde verde. "TU CRM" en 1.64.

**s15-sabes** (3.59 s). "Y cuando escribe Silvia, ya sabés quién es y qué le debés." El mismo
mensaje del principio, pero "Cliente nuevo 3" se tacha y pasa a "Silvia · la del calefón";
Ramiro sonríe; en "debés" (2.6) cartel "LE DEBÉS: el presupuesto del calefón".

**s16-cta** (7.5 s). "¿Cuántos Cliente nuevo tenés agendados en el celular? Contalo en los
comentarios." Lista de contactos que scrollea llena de "Cliente nuevo N" (en rojo), "Gómez
(otro)"; ficha "?" en "agendados"; en "Contalo" globo azul de comentario "¿Cuántos tenés? Contalo
en los comentarios." con "Yo tengo..." que se escribe.
