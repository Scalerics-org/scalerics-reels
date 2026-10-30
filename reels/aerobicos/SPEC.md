# Reel "Aeróbicos": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES (el aviso de "pedido listo", el
recordatorio del turno, el stock de la tienda que se actualiza solo y el reporte del día al
celular), nombrado una sola vez, al final. Formato P: VIDEO DE AERÓBICOS DE LOS 80 en VHS.

Una INSTRUCTORA hiperenergética (voz Laomedeia) despierta al dueño: "¡Arriba, comerciante! Tres
horas de ejercicio por noche, y no bajaste ni un gramo. ¡Vincha, calentadores, y dale play al
cassette!". La rutina nocturna del comerciante como ejercicios con repeticiones: EJERCICIO 1, avisar
que el pedido está listo ("Tu pedido está listo. ¡Y uno! Tu pedido está listo. ¡Y dos! ¡No pain,
no gain!"); el DUEÑO jadeando (voz Enceladus): "¿Cuántas... repeticiones son?" "¡Las que haya!";
EJERCICIO 2, recordar los turnos de mañana ("Te esperamos a las diez. ¡Y uno!..."); EJERCICIO 3,
lo que vendiste en el local sacalo de la tienda online ("¡Arriba, abajo!"); ELONGACIÓN: el reporte
del día, sumá todo y mandátelo a vos mismo. "¡Como Rocky, campeón! ¡Mañana, la misma clase!" (la
cinta REBOBINA). GIRO: el dueño se tira al piso: "Pará... ¿y si esta rutina la hace otro?"; la
instructora se congela en PAUSE: "¿Otro? Eso no está en el cassette." Entra ORUS: "Otro, sí.
Hacemos automatizaciones: ... se hacen solos, mientras vos descansás de verdad. Mandáselo al que
todas las noches se pone la vincha."
Voz de 73.1 s (tres voces pegadas por `partes/componer.mjs`), reel de 76.28 s.

## RECURSO VISUAL CENTRAL: los contadores REPES y BAJASTE
Abajo (los pone `ambiente.html`, y 1532-1690): a la izquierda REPES sube en cada repetición
(1, 2 en los pedidos; 3, 4 en los turnos; 5, 6 en arriba/abajo; 7 en "sumá"), y en "Mañana, la
misma clase" se rebobina a 0. A la derecha BAJASTE "0 g" aparece en "gramo" y tiembla en cada
repe, siempre en 0. Los dos se caen al piso en "Pará" (52.8). No poner nada propio ahí.

## ESTILO: VIDEO DE AERÓBICOS EN VHS. Edición CARGADA.
Cielo violeta con horizonte rosa neón en y 1345 (fondo del index) y una GRILLA en perspectiva
turquesa que avanza al ritmo del beat de 128 BPM (ambiente); con Scalerics la grilla y el
horizonte se vuelven verdes. OSD de videocasetera arriba (y 92-190): "PLAY" / "REW" / "PAUSE" /
"STOP" con contador "SP 0:00:xx" y "AERÓBICOS · VOL. 1"; rayas de tele y una FRANJA DE TRACKING
que cruza la pantalla en cada capítulo, en el REW, en "Pará" y que queda temblando en la PAUSA.
Personajes dibujados planos con contorno violeta oscuro grueso y un borde de luz crema/rosa:
la instructora (permanente amarilla, vincha turquesa, malla rosa, calzas violetas, calentadores
turquesa) y el dueño (pelado con vincha rosa, bigote, camiseta amarilla con panza, short turquesa,
calentadores rosa, gotas de sudor). Palabras clave GIGANTES en Lexend 900 itálica con contorno
oscuro y sombra corrida de color (estilo título de los 80), que caen en su palabra con sacudón.
Tarjetas de capítulo "EJERCICIO 1/2/3" con franjas diagonales rosa/turquesa/amarillo.
Música: `assets/bgm/bed.mp3` (la hace `partes/beat.mjs`): beat de aeróbicos de 128 BPM que se
frena como cinta estirada en "Pará", silencio en la pausa y vuelve suave con Scalerics.

## Paleta (SOLO estos colores)
- Violeta noche `#160a2a`: contornos, fondos de carteles, contorno de los textos.
- Rosa neón `#ff2e88`: horizonte, títulos, lo que duele (NO PAIN, AGOTADO).
- Turquesa `#1de9d6`: grilla, burbujas, ¿CUÁNTAS?, ¿OTRO?.
- Amarillo `#ffe14d`: números, CAMPEÓN, acento de los subtítulos.
- Violeta `#5b2a86`: calzas, aparatos, cabecera del chat.
- Crema `#fff3e8`: piel, textos, burbujas.
- Desde s12 (Scalerics) entra el verde `#5ce611` para lo que se hace solo.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales, Rocky dibujado (solo
se nombra), cualquier instructora real.

## Zona
Subtítulos arriba (y 236 a ~420); OSD en y 92-190. Contenido entre y 580 y 1345 (los pies de los
personajes sobre el horizonte). Abajo, y 1532-1690, los contadores del ambiente; logo en 1746.

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

(En este reel el lenguaje visual de SPEC-base no aplica: manda el estilo VHS de arriba. Las escenas
las generan los scripts de `partes/escenas/`, ver LEEME.txt.)

## Escenas (tiempos relativos a cada escena; ver tiempos.md)

### s01-arriba (0.00, 4.63 s)
Cuadro 0: la instructora ya en el aire con los brazos arriba, saltos de tijera en cada beat,
estrellitas de 4 puntas. "¡ARRIBA," rosa gigante desde 0; "COMERCIANTE!" amarillo cae en
"comerciante" (0.34). En "Tres" (1.11) los dos se van y cae "3 HORAS"; "POR NOCHE" turquesa en
"noche" (2.65). En "gramo" (3.93) cae "NI UN GRAMO" rosa con sacudón (y aparece BAJASTE 0 g).

### s02-cassette (4.63, 3.12 s)
"Vincha" (0): cae una vincha turquesa con su rótulo. "calentadores" (0.52): dos calentadores
amarillo y rosa rebotan. Sube una videocasetera violeta (display STOP), el cassette
"AERÓBICOS PARA COMERCIANTES" baja y en "play" (1.87) entra en la ranura: el display pasa a PLAY,
titila el led y cae "¡DALE PLAY!" amarillo en "cassette" (2.21).

### s03-uno (7.75, 3.30 s)
Tarjeta de capítulo: franjas diagonales que cruzan, "EJERCICIO" entra de la izquierda, "1"
gigante amarillo en "uno" (0.69) que late; en "avisar" (1.50) sube la pastilla turquesa
"AVISAR / TU PEDIDO ESTÁ LISTO", que tiembla en "listo" (2.74).

### s04-repes (11.05, 7.90 s)
Dueño a la izquierda levanta el celular como una pesa en cada "listo" (0.80, 3.70); burbujas
"Tu pedido está listo" (22:47, 22:48) aparecen arriba. La instructora a la derecha marca el
tiempo con los brazos. "1!" en "uno" (2.09), "2!" en "dos" (4.97). "NO PAIN," (6.00) y "NO GAIN!"
(6.95) caen gigantes mientras burbujas fantasma iguales siguen cayendo y él sigue levantando.

### s05-cuantas (18.95, 4.29 s)
Dueño solo en el centro jadeando (se infla y desinfla, boca abierta, soplidos, gotas).
"¿CUÁNTAS" turquesa + "REPETICIONES?" en "repeticiones" (1.55). En "Las" (3.13) cae un "∞"
amarillo que gira y "¡LAS QUE HAYA!" rosa en "haya" (3.39); al dueño se le ponen los ojos en X.

### s06-turnos (23.24, 10.54 s)
Tarjeta "EJERCICIO 2" (0.64) con la pastilla amarilla "RECORDAR / LOS TURNOS DE MAÑANA" (1.49);
en "turnos" (2.49) la tarjeta se va y entra el STEP con el dueño subiendo y bajando al beat y la
agenda "MAÑANA" (10:00 Sofía, 11:00 Martín, 11:30 Laura, 12:00 Diego, 12:30 Ana). Burbuja
turquesa "Te esperamos a las 10:00" en "Te" (4.22) y la fila de Sofía se marca; "1!" en "uno"
(6.36); "...a las 11:00" en 7.12 (fila de Martín); "2!" en "dos" (9.56) y las filas que faltan
titilan rosa.

### s07-stock (33.78, 10.25 s)
Tarjeta "EJERCICIO 3" (0.60). Desde 1.4 el estante de EL LOCAL; en "vendiste" se va un frasco.
En "sacalo" (3.00) entra la compu TIENDA ONLINE (Frasco artesanal, STOCK 1, COMPRAR), flecha del
local a la tienda y el dueño chiquito en el medio; en "tienda" (3.76) el cursor cambia el stock a
0. "¡ARRIBA!" / "¡ABAJO!" en cada palabra (5.25, 5.72, 6.39, 6.82) con brazos arriba/abajo. En
"compre" el botón late y en "tenés" (9.23) cae el sello rosa AGOTADO.

### s08-reporte (44.03, 4.94 s)
"ELONGACIÓN" turquesa que se estira; el dueño estira con un brazo arriba, inclinándose. En
"reporte" (1.16) se desenrolla el ticket REPORTE DEL DÍA; en "Sumá" las líneas (Pedidos, Caja,
Turnos, Envíos, Stock) y "TOTAL: ¿?". En "mandátelo" (3.21) el ticket se enrolla y aparece un
celular con el chat "Yo · VOS MISMO" y la burbuja "Reporte del día, hecho a mano"; "¡A VOS
MISMO!" amarillo en "mismo" (4.07).

### s09-rocky (48.97, 3.80 s)
El dueño arriba del step con los dos brazos en alto, rayos rosa/amarillo girando detrás.
"¡CAMPEÓN!" en "campeón" (0.71). En "Mañana" (1.39): REW (dos triángulos crema a la izquierda,
el OSD del ambiente dice REW, el contador REPES vuelve a 0), los rayos giran para atrás, el
dueño retrocede a saltitos. "MAÑANA," + "LA MISMA CLASE" (2.12); se desinfla, ojos en X.

### s10-piso (52.77, 4.50 s)
Se corta la música. El dueño cae de espaldas al piso (cuadro 0 ya cayendo) con polvo; "¡PARÁ!"
crema. Jadea tirado. En "rutina" (1.87) se le prende una lamparita amarilla y levanta el dedo.
"¿Y SI LA HACE" (2.91) + "OTRO?" rosa gigante en "otro" (3.59).

### s11-pausa (57.27, 2.86 s)
PAUSE del VHS: la instructora congelada con un brazo arriba, temblando, con un fantasma corrido;
"¿OTRO?" turquesa que se tuerce. En "Eso" (0.99) se le borra la sonrisa (boca recta) y entra el
cassette; un "?" rosa enorme cae en "cassette" (1.73).

### s12-solas (60.13, 10.79 s)
STOP: la grilla y el horizonte se vuelven verdes. "¡OTRO, SÍ!" rosa (0). "AUTOMATIZACIONES" verde
en 1.36. Cuatro tarjetas verdes con ícono y tilde, cada una en su palabra: Pedido listo / AVISO
SOLO (2.73), Turnos / RECORDATORIO (3.91), Stock tienda / AL DÍA SOLO (5.45), Reporte del día / AL
CELULAR (6.45). En "solos" (7.82) un engranaje gira en el medio y laten todas. En "mientras"
(8.65) el dueño cae en una reposera, brazos detrás de la cabeza, Z Z Z en "descansás" (9.09).

### s13-cta (70.92, 5.36 s)
"¡MANDÁSELO!" amarillo (0), una vincha rosa gigante que se balancea, "AL QUE TODAS LAS NOCHES"
crema en "todas" (0.57), "SE PONE LA VINCHA" rosa en "pone" (1.39); en "vincha" (1.75) sale un
avioncito de papel verde con su estela. Queda ~3 s quieto latiendo.
