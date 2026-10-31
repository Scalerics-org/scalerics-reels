# Reel "Curso de uruguayo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): CURSO DE IDIOMAS EN CASETE DE
LOS 90 ("Aprenda uruguayo comerciante en 10 lecciones", inventado). Una profesora muy didáctica
(Aoede, x1.18) enseña frases del comerciante y el alumno (Puck, x1.1) las repite; la profe las
"traduce". Gancho: "Lección uno de comerciante uruguayo. Repita conmigo: «Después te contesto»."
"Muy bien. Significa: nunca." Frase dos: "Pasá el lunes" = "No te voy a atender. Ni el lunes." El
visto: "dos tildes azules, significa «Lo leí. Y no»". El alumno: "¿cómo pregunto a qué hora
abren?" "Se pregunta hoy. Se contesta mañana. Cuando ya cerraron." "Profe, yo no quería aprender
un idioma. Yo quería comprar." El casete (Charon, voz grabada plana): "Fin del lado A. Dé vuelta el
casete." GIRO (lado B): "el comerciante no es maleducado: está solo con el mostrador, la caja y el
celular. Por eso hay comercios que hablan otro idioma: el del cliente. Contestan al toque, a
cualquier hora, con precios y horarios." "¿A las tres de la mañana?" "También. Ahí atiende un
agente de IA. Repita: «Ya te lo reservo»." "¡Ya te lo reservo! Ese idioma sí lo entiendo." Orus
(Scalerics): "Un agente de IA que atiende tu WhatsApp como un empleado más. Lo hacemos en
Scalerics." Cierre: "¿Qué frase de comerciante agregarías a la lección dos? Te leemos."
Voz de 72.0 s (cuatro voces, partes en `partes/`: `gen.sh` genera, `recortar.sh` recorta y
acelera, `pj.sh` saca los tiempos por parte, `unir.mjs` arma locución, palabras.json y voces.json),
video de 75.2 s.

## ESTILO: LIBRO DE TEXTO DE IDIOMAS + CASETE DE LOS 90
Hoja de cuaderno crema con renglones azul marino tenues y margen rojo (el fondo de `armar.mjs`).
Ilustración clip-art de líneas gruesas (trazo azul marino 6 px, rellenos planos de la paleta, sin
degradés): la PROFESORA (rodete, lentes redondos, saco rojo, caravanas mostaza, puntero), el
ALUMNO (pelo parado, auriculares de walkman mostaza, buzo celeste), el COMERCIANTE (pelado,
bigote, delantal mostaza), el AGENTE DE IA (globo de chat mostaza con ojos, sonrisa y vincha con
micrófono). Recursos de libro de texto: título "LECCIÓN 1" gigante con resaltador mostaza,
recuadros VOCABULARIO / DICCIONARIO / SIGNIFICA (borde azul marino, cabecera azul o roja, sombra
plana desplazada), transcripción fonética mono "[des·PUÉS te con·TES·to]", correcciones de maestra
en manuscrita roja (Caveat: "¡Muy bien!", "Ni el lunes.", "12 ¡Sobresaliente!"), sellos rojos,
tabla de conjugación, banderita inventada (cuatro franjas y un mate en el cantón). El CASETE
(carcasa azul marino, etiqueta crema con franja roja, bobinas que giran) y un pasacasete abajo.
Los dibujos son `<svg>` propios posicionados en HTML (se mueven con transforms CSS).

## Paleta (SOLO estos colores)
- Papel `#f2e8cf` (y claro `#f8f2e2` para caras, tarjetas y globos).
- Azul marino tinta `#1f2b4d` (y `#2c3b66` para sombras/persiana): trazos, textos, casete.
- Rojo corrección `#d64532`: sellos, tachones, saco de la profe, acento de subtítulos.
- Mostaza `#e3a92b`: resaltador, auriculares, delantal, el agente, la luna.
- Celeste `#5b9bd5`: buzo del alumno, los dos tildes del visto, la bandera del cliente.
- Solo en s14: verde Scalerics `#5ce611` en el sello "Scalerics".
Subtítulos azul marino con acento rojo; etiqueta de quién habla: LA PROFESORA (azul), EL ALUMNO
(mostaza; sus palabras en azul más claro), EL CASETE (rojo; sus palabras en mono), SCALERICS
(verde). Logo oscuro (`assets/logo-oscuro.png`).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos y fonética; Caveat 700 para las
correcciones manuscritas. Nada que haya que leer de menos de 28 px.

## Zona
Cabecera del libro (y 96-146) y subtítulos (y 186-430) arriba. Contenido entre y 560 y y 1520.
Abajo: el pasacasete (y 1600-1696) y el logo (y 1746), en `ambiente.html` / `index.html`.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): papel con renglones y margen rojo.
- `compositions/ambiente.html`: cabecera "APRENDA URUGUAYO COMERCIANTE · EN 10 LECCIONES" y el
  pasacasete: bobinas que giran, PLAY encendido; en 33.0 (fin del lado A) se paran y se enciende
  STOP; en 37.1 pasa a "LADO B" y vuelve PLAY. Barra de cinta que avanza por lado.
- Las escenas las escribe `escenas.mjs` (node escenas.mjs [s05 ...] y después node armar.mjs):
  helpers comunes (`dibujar`, `pop`, `golpe`, `sacudon`, `escribir`, `hablar`, `parpadeo`,
  `girar`, `flotar`), los personajes y una función por escena con los tiempos por palabra T(i).
  Para cambiar una escena se edita ahí, no el html.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema sobre navy con acento verde; es el libro de texto con la
> paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

**s01-leccion** (6.93). Cuadro 0: "LECCIÓN 1" gigante con resaltador mostaza y la profe con su
puntero (ya visibles). 0.25 banderita inventada que flamea; "URUGUAYO COMERCIANTE · NIVEL 1" se
escribe. 2.70 "Repita": píldora roja "REPITA". 3.6 entra el recuadro VOCABULARIO y se escribe
"«Después te contesto»" (3.93-5.0) y la fonética. 5.49 corte: sale la profe a la izquierda, entra
el alumno y repite (la frase titila en rojo).

**s02-nunca** (2.84). Recuadro DICCIONARIO "después te contesto · loc. de comerciante · uso
diario". 0.0 tilde rojo de maestra; 0.2 "¡Muy bien!" manuscrito. 0.84 "Significa" y flecha. 1.80
"NUNCA." gigante rojo con sacudón; el reloj de arena se da vuelta.

**s03-lunes** (3.55). Píldora "FRASE 2". Almanaque "PRÓXIMO / LUNES" (1.29) subrayado mostaza.
2.34 sube el alumno con su globo "«Pasá el lunes.»".

**s04-traduccion** (3.60). Sello "TRADUCCIÓN". Tarjeta "DICE «Pasá el lunes»", flecha, tarjeta
"SIGNIFICA: No te voy a atender." que se escribe (1.02-2.1). 2.40 "Ni el lunes." manuscrito y un
almanaquito LUNES que se tacha con una X roja (2.7) y sacudón.

**s05-visto** (5.13). Globo "Hola, ¿cuánto sale? 21:04"; 0.1 píldora "EL VISTO". 1.0 y 1.2 se
dibujan dos tildes celestes gigantes; "DOS TILDES AZULES". 2.58 recuadro SIGNIFICA: "«Lo leí."
(3.48) y "Y NO.»" rojo de golpe (4.36) con sacudón.

**s06-a-que-hora** (2.91). Píldora mostaza "PREGUNTA DEL ALUMNO". El alumno levanta la mano; globo
"¿A qué hora abren?" que se escribe (0.84-2.3). 1.8 reloj con "?" y aguja que gira.

**s07-manana** (4.04). "CONJUGACIÓN · verbo: atender". Tabla: HOY "se pregunta." (0.2), MAÑANA
"se contesta." (1.35). 2.63 baja la persiana del local con toldo rayado; 3.05 sello "CERRADO".

**s08-comprar** (4.01). El alumno desesperado (gota de sudor, tiembla). 1.1 el libro "APRENDA
URUGUAYO COMERCIANTE" que se tacha (1.7) y se cae; 2.47 bolsa de compras mostaza con corazón y
"COMPRAR" (2.7) con sacudón.

**s09-lado-a** (4.09). Casete gigante; las bobinas se paran en 0.06. 0.6 sello "FIN DEL LADO A".
1.8 "dé vuelta el casete" manuscrito y flecha curva; 2.85 el casete se da vuelta (scaleX) y la
etiqueta dice "LADO B"; 3.4 las bobinas vuelven a girar.

**s10-lado-b** (7.44). GIRO. "LADO B" gigante con resaltador. 1.0 sube el comerciante. 1.9 cartel
"MALEDUCADO" que se tacha (2.9) con un "no" rojo. 4.2 sello "ESTÁ SOLO". 4.8 el MOSTRADOR sube
adelante; 5.8 la CAJA registradora; 6.6 el CELULAR que vibra con notificación; le caen gotas.

**s11-otro-idioma** (7.59). Bandera del cliente (celeste con un globo de chat). 1.3 "OTRO IDIOMA:"
y 2.27 "EL DEL CLIENTE". 0.4 sube un celular "Tu local": 2.7 "¿Hasta qué hora abren hoy?",
escribiendo..., 4.0 respuesta "¡Hola! Hasta las 20. ¿Te guardo algo?" y sticker "AL TOQUE". 4.8
reloj con agujas que vuelan, "24 HORAS"; 6.1 "PRECIOS" y 6.7 "HORARIOS" con tilde rojo.

**s12-tres-am** (7.08). Panel de noche azul marino con luna mostaza y estrellas. 0.24 "03:00"
mono que titila; 1.65 "TAMBIÉN." gigante. 3.2 aparece el AGENTE DE IA (globo mostaza con
vincha) con su píldora; 4.85 "REPITA"; 5.78 su globo "«Ya te lo reservo.»" y habla.

**s13-entiendo** (3.67). El alumno feliz salta; globo "¡Ya te lo reservo!". 1.5 estrellitas
mostaza. 2.4 la nota "12" manuscrita en rojo con círculo y "¡Sobresaliente!".

**s14-scalerics** (5.40). Entra Orus. Tapa del libro "CURSO COMPLETO · AGENTE DE IA · el idioma
del cliente" (se escribe en 0.2-1.0); viñetas "ATIENDE TU WHATSAPP" (1.35), "COMO UN EMPLEADO
MÁS" (2.4), "A CUALQUIER HORA" (2.9). El agente flota en la esquina. 4.2 "Scalerics": sello
verde "LO HACEMOS NOSOTROS · Scalerics" con sacudón.

**s15-cta** (6.88). "LECCIÓN 2" con resaltador; "¿Qué frase de comerciante agregarías?" se
escribe; "EJERCICIO · COMPLETÁ" con dos renglones y un lápiz que hace un garabato rojo (2.0-3.2).
2.4 globo de comentario con tres puntitos que saltan; 3.03 "TE LEEMOS" gigante rojo. Queda vivo
hasta el final.
