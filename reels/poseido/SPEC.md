# Reel "Poseído": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Especial de Halloween
(31-10) en clave de PELÍCULA DE EXORCISMOS, en comedia. Vende UNA cosa: AUTOMATIZACIONES.
La esposa de un comerciante llama al cura a medianoche: "Padre, venga ya. Mi marido está
poseído." Todas las noches, después de cerrar, a las once, el marido se sienta en la compu con
los ojos en blanco y repite, con voz de demonio: "copiar... pegar... copiar... pegar...". El cura
("Yo vi El Exorcista. Esto es peor.") intenta exorcizarlo: "¡Sal de este cuerpo, Control C!". El
demonio contesta, ronco y cansado: "No puedo... me quedan cuarenta pedidos de WhatsApp. Avisar
que cada pedido está listo. Actualizar el stock...". "¡Te lo ordeno! ¡Control Z!" "Ya probé... y
se me borró todo." GIRO: "Hija, esto no es el demonio. Son tareas repetidas. Y eso no se
exorciza: se automatiza." Entra el narrador (Orus): los pedidos de WhatsApp pasan solos a la
planilla, el aviso de pedido listo sale solo y el reporte del día llega al celular. El marido se
despierta ("¿Dónde estoy? ¿Qué hora es?"), la esposa: "Las once, mi amor. Vamos a dormir."
Cierre: "Etiquetá al que está poseído por la planilla."
Cinco voces: esposa (Leda), cura (Charon), demonio (Algenib bajado de tono, con eco), marido
liberado (Fenrir), narrador (Orus). Voz de 67.98 s; reel de 71.18 s.

## ESTILO: TERROR A LA LUZ DE UNA VELA (con humor)
Un cuarto negro. La única luz es la compu: la GRILLA DE UNA PLANILLA verde fosforescente que
brilla en la oscuridad (glow con drop-shadow verde, permitido acá) y le ilumina la cara al
poseído. Abajo a la izquierda, una vela que titila (la pone ambiente.html). Dibujos de líneas
color hueso, gruesas, que se dibujan solas; los ojos del poseído en blanco que brillan; el cura
con alzacuello y crucifijo (dibujos genéricos propios: nada de la película, ni póster, ni cara,
ni la escalera famosa). Flashes de relámpago en los golpes. Desde "se automatiza" (s10) se prende
la luz: la planilla se llena sola, todo se ordena, el clima pasa de terror a alivio.

## Paleta (SOLO estos colores)
- Negro cuarto `#070605` (fondo, lo pone index) y `#15110c` para rellenos (pantallas, sotana).
- Hueso `#efe6d2`: todas las líneas de los dibujos y los textos grandes.
- Verde planilla `#6dff8a`: la planilla, la grilla, los ojos del poseído cuando brillan, los
  textos de celda, el CTRL+C. Con brillo `drop-shadow(0 0 14px rgba(109,255,138,0.6))`.
- Ámbar vela `#ffb547`: la llama, el crucifijo, la luz del cura, las etiquetas mono.
- Rojo `#e5484d`: lo malo (errores, "#¡REF!", tachados, el contador de pendientes).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, la palabra "bot".

## Tipos de letra
Lexend 600-900 para lo grande; IBM Plex Mono 500 para celdas, teclas, horas y etiquetas. Nada que
haya que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420). Dibujo entre y 580 y 1330, x 60-1020. Etiqueta mono ámbar en
top 1268. La vela de ambiente.html vive abajo a la izquierda (x 90-230, y 1380-1600): no la
tapes. Logo de Scalerics en y ~1746.

## Personajes (iguales en todas las escenas: copiá el SVG de la escena que los estrena)
- EL POSEÍDO (s01): comerciante de frente, sentado detrás de una laptop abierta (le vemos la
  tapa), pelo revuelto en puntas, delantal con tiras, ojos = dos óvalos rellenos hueso que brillan
  verde, sin pupilas; boca recta. Cuando se libera (s13) tiene pupilas, ojeras y cara de dormido.
- EL CURA (s02): busto, sotana `#15110c` con trazo hueso, alzacuello blanco (rectangulito hueso),
  anteojos redondos, pelo canoso a los costados, calvo arriba; el crucifijo ámbar en la mano.
- LA ESPOSA (s13): ruleros (círculos chicos) en la cabeza, bata con cinturón.
- LA PLANILLA (s04): rectángulo de pantalla con la grilla verde (encabezado A B C D, filas
  numeradas), celdas con texto mono verde ("Pedido", "Ana · 2 kg", "Listo").

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo negro con brillo verde al centro y ámbar abajo a
  la izquierda.
- `compositions/ambiente.html`: la vela que titila con su halo, polvo que flota, viñeta;
  RELÁMPAGOS (flash blanco) en 2.50 ("poseído"), 21.81 ("peor"), 24.59 ("Control C") y 36.77
  ("Control Z"); en 48.91 ("se automatiza") se prende una luz cálida que queda hasta el final;
  en 64.1 ("dormir") la vela se apaga con un hilo de humo.

## Escenas (tiempos relativos a cada escena: ver tiempos.md)

### s01-poseido (0.00 → 3.65) "Padre, venga ya. Mi marido está poseído."
Cuadro 0: el poseído ya a medio dibujar detrás de la laptop, en la oscuridad. La pantalla de la
laptop tira un halo verde sobre la cara. "Padre" (0.0) termina de dibujarse; teclea (manos que
suben y bajan sobre el borde de la laptop). "poseído" (2.50): los ojos se prenden en blanco con
brillo verde, la cabeza da un tirón, sacudón de todo el dibujo (el flash lo pone ambiente).
Etiqueta: "Caso 31·10" → "Poseído" (2.50).

### s02-cura (3.65 → 6.39) "Calma, hija. ¿Cuándo empezó?"
El cura entra por un marco de puerta (se dibuja la puerta y él aparece con pop), crucifijo en
alto que brilla ámbar. "Calma" (0.0) levanta la mano abierta; "¿Cuándo empezó?" (1.37): un signo
de pregunta ámbar gigante a su lado y el cura se acomoda los anteojos (se mueven). Etiqueta: "El
padre".

### s03-once (6.39 → 12.80) "Todas las noches. Cierra el local, cena, y a las once se sienta en la compu con los ojos en blanco."
Tres tiempos. 1) "Todas las noches" (0.0): luna menguante y un calendario que pasa hojas solas.
2) "Cierra el local" (1.13): una cortina metálica (rectángulo con listones) que baja de golpe
sobre un local y un candado. 3) "a las once" (3.16): reloj digital GIGANTE "23:00" en verde que
titila; "compu" (4.04) se dibuja la laptop debajo; "ojos" (4.74): primer plano de dos ojos en
blanco enormes que se abren con brillo. Etiqueta: "Todas las noches" → "23:00" → "Ojos en blanco".

### s04-copiar (12.80 → 18.32) "Copiar... pegar... copiar... pegar..."
LA PLANILLA a pantalla casi completa, brillando verde. A la izquierda arriba un globo de chat de
WhatsApp ("Hola! 2 kg de yerba"). En cada "copiar" (0.0, 2.77) aparece la tecla gigante
"CTRL + C" y el texto del chat se resalta; en cada "pegar" (1.18, 3.95) la tecla "CTRL + V" y
la celda siguiente se llena con el texto. Un cursor parpadea. Leve sacudón de trance.
Etiqueta: "Copiar · pegar".

### s05-exorcista (18.32 → 22.64) "Dios mío. Yo vi El Exorcista. Esto es peor."
El cura se persigna (la mano hace la cruz). "Exorcista" (1.72): un televisor viejo de tubo con
estática y una cinta VHS genérica con etiqueta escrita a mano "TERROR" (nada de la película).
"peor" (3.49): el televisor se apaga de golpe y el cura retrocede con gotas de sudor; el
crucifijo tiembla. Etiqueta: "Ya vio todo" → "Esto es peor".

### s06-control-c (22.64 → 25.64) "¡Sal de este cuerpo, Control C!"
El cura de perfil derecho levanta el crucifijo ámbar con rayos que salen; del otro lado la tecla
"CTRL" + "C" gigante verde, con ojos rojos chiquitos, que tiembla. "Control" (1.38) las teclas
hacen pop; "C" (1.95) el rayo del crucifijo les pega y rebotan sin romperse. Etiqueta: "¡Fuera!".

### s07-pendientes (25.64 → 34.87) "No puedo... Me quedan cuarenta pedidos de WhatsApp. Avisar que cada pedido está listo. Actualizar el stock..."
La lista de pendientes del demonio: un pergamino largo que se desenrolla hacia abajo. "cuarenta"
(1.92): número "40" rojo gigante con la palabra "pedidos"; "WhatsApp" (3.52): globos de chat
apilados que caen en el pergamino. "Avisar" (4.57): renglón "Avisar: tu pedido está listo" se
escribe y se repite (x3 copias que se apilan). "Actualizar el stock" (7.22): una caja con un
número de stock que cambia y una flecha circular. Todo tiembla con la voz grave. Etiqueta:
"Pendientes" → "Uno por uno".

### s08-control-z (34.87 → 43.02) "¡Te lo ordeno! ¡Control Z! / Ya probé... y se me borró todo."
"Te lo ordeno" (0.0): el crucifijo en primer plano con rayos ámbar. "Control Z" (1.39-1.90):
teclas "CTRL" + "Z" caen como martillo. "Ya probé" (3.10): la planilla llena aparece. "borró"
(5.37): las celdas se vacían de abajo para arriba y aparece "#¡REF!" rojo en el medio; "todo"
(6.33) la grilla parpadea y queda vacía. Etiqueta: "Último conjuro" → "Se borró todo".

### s09-tareas (43.02 → 47.01) "Hija, esto no es el demonio. Son tareas repetidas."
El cura, tranquilo, baja el crucifijo y mira con una lupa. "demonio" (1.43): un diablito genérico
de líneas (cuernos y cola) que una línea roja tacha. "tareas repetidas" (2.50): una fila de
tarjetitas idénticas "copiar · pegar" que se repiten en loop en una cinta circular (flechas).
Etiqueta: "Diagnóstico" → "Tareas repetidas".

### s10-automatiza (47.01 → 50.43) "Y eso no se exorciza: se automatiza."
"exorciza" (0.74): el crucifijo con una X roja (se aparta). "automatiza" (1.90): una palanca o
interruptor grande que se baja, CLACK, y desde ahí se prenden luces: engranajes ámbar que giran
y la planilla que empieza a brillar más. Etiqueta: "Se automatiza".

### s11-sola (50.43 → 55.16) Orus: "En Scalerics hacemos automatizaciones: los pedidos de WhatsApp pasan solos a la planilla,"
La planilla ordenada, sin nadie adelante. Globos de chat (izquierda) que vuelan solos hacia la
planilla y se convierten en filas que se llenan solas, una tras otra ("WhatsApp" 2.81, "solos"
3.51). Un tilde verde por fila. Etiqueta: "Automatizaciones" → "Solos".

### s12-reporte (55.16 → 60.09) "el aviso de pedido listo sale solo y el reporte del día te llega al celular."
Un celular: "aviso" (0.10) sale un mensaje "Tu pedido está listo" con doble tilde que se va
solo (avión de papel); "reporte" (2.12) llega una notificación "Reporte del día" con barritas
que crecen (sin números) y un tilde. Etiqueta: "Sale solo" → "Al celular".

### s13-despierta (60.09 → 65.28) "¿Dónde estoy? ¿Qué hora es? / Las once, mi amor. Vamos a dormir."
El marido liberado (pupilas, ojeras, pelo aplastado) mira para los costados ("¿Dónde estoy?"),
un reloj chico marca 23:00 ("hora" 1.24). "Las once, mi amor" (2.14): entra la esposa con
ruleros al lado, corazón ámbar. "dormir" (3.99): la laptop se cierra sola y salen "z z z".
Etiqueta: "Liberado" → "A dormir".

### s14-cta (65.28 → 71.18) "Etiquetá al que está poseído por la planilla."
Póster de película de terror de mentira: arriba en mono "ESTRENO 31·10", al centro un "@" verde
gigante con brillo, adentro dos ojos en blanco; debajo "ETIQUETÁ" en Lexend 900 y "al poseído
por la planilla" en hueso. Termina quieto con el "@" latiendo despacio. Etiqueta: "Feliz Halloween".

## Base (molde/SPEC-base.md: lo técnico vale; lo visual lo reemplaza este SPEC)
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

