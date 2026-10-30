# El debate · Agente de IA (seguimiento) · debate electoral televisado

**De qué trata.** "Esta noche, el debate que define tu local: vos contra un agente de IA." Un
DEBATE ELECTORAL de TV: la MODERADORA (Kore, seria y cortante), el candidato DUEÑO (Charon, cansado
y chamuyero, promesas de campaña con la mano en el pecho) y el candidato AGENTE DE IA (Achird,
tranquilo y filoso). El dueño promete "contestar todos los mensajes en el día", "llamar a todos los
que me pidieron presupuesto" y "acordarme de Doña Elsa", y cada promesa pasa por el CHEQUEO DE DATOS
con sello rojo FALSO ("el del lunes lo contestaste el viernes", "el presupuesto de Gustavo sigue en
el chat, desde mayo", "nadie le escribe desde el invierno"). En el medio, la moderadora le pregunta
por qué Doña Elsa dejó de venir y el dueño sale con "el tema del dólar": "Eso no es lo que
pregunté." Público: "uuuh". Minuto de réplica del agente: "Yo no prometo: lo hago", le escribe hoy
al que preguntó y no compró, y a Doña Elsa le escribió anoche: vuelve el jueves. VERDADERO.
GIRO: "¡Me viene a sacar el puesto!" "Tranquilo. No me postulo a presidente: me postulo de vice.
Vos gobernás, yo hago el seguimiento. Y si la charla es para vos, te la paso." Boca de urna: sin
seguimiento, tus clientes votan en blanco. Entra Orus: "En Scalerics armamos tu agente de IA..."
"Y no tiene veda." Cierre: "Etiquetá al candidato que promete y no llama."

**Formato:** B (diálogo de tres voces + narrador) con forma de debate electoral televisado.
**Recurso visual central:** el SET DEL DEBATE: dos atriles enfrentados (dueño a la izquierda, rojo;
agente a la derecha, celeste) sobre un piso brillante, con reflectores. El CHEQUEO DE DATOS es una
tarjeta blanca de "dato chequeado" con la prueba (un chat, una fecha) y un SELLO rojo "FALSO" que cae
de golpe; el del agente es verde "VERDADERO". Abajo, siempre, la barra de INTENCIÓN DE VOTO
(ambiente.html, y 1390-1500) que se corre hacia el agente con cada FALSO y en el giro se funde en
una sola barra dorada "FÓRMULA DUEÑO + AGENTE".

## Paleta (manda sobre SPEC-base)
- Azul noche `#0b1a3a` (fondo y rellenos de siluetas), `#071026` el más oscuro.
- Blanco `#f4f4f4` (trazos principales, tarjetas de chequeo, textos).
- Rojo `#e63946`: el candidato dueño (corbata, atril, zócalo) y el sello FALSO.
- Celeste `#57c4e5`: el candidato agente de IA (pantalla-cara, atril, zócalo).
- Dorado `#f2c14e`: la moderadora, el cronómetro, la fórmula, acentos de subtítulos de la moderadora y Orus.
- Verde `#2ec27e`: SOLO el sello VERDADERO y los tildes de "enviado".
- Sin degradés en los dibujos (los haces de luz del estudio y el brillo del piso sí).

## Tipografía
- Subtítulos: Lexend 600 blanco; el acento toma el color de quien habla (moderadora y Orus dorado,
  dueño rojo claro `#ff5d68`, agente celeste). Arriba de cada grupo, un cartelito mono con quién
  habla ("MODERADORA", "CANDIDATO · DUEÑO", "CANDIDATO · AGENTE DE IA", "SCALERICS"): lo arma armar.mjs.
- Zócalos de TV (nombre del candidato): Outfit 800 mayúsculas sobre barra de color, y 1150-1250.
- Sellos: Outfit 900, borde 8px, rotados -8 a -14°, entran con scale 2.4→1 en 0.14 s (power4.in)
  y un temblor de la escena.
- Etiqueta debajo del dibujo: IBM Plex Mono 500 28px, letter-spacing 0.3em, dorado, top 1290.

## Capas fijas
- `compositions/estudio.html` (DEBAJO de las escenas): haces de reflectores que barren, paneles de
  la pared del fondo, piso brillante con líneas de perspectiva desde y 1272, "● EN VIVO" arriba a la
  izquierda y "EL DEBATE · TU LOCAL" arriba a la derecha (y 66-110).
- `compositions/ambiente.html` (ENCIMA de las escenas): la barra de INTENCIÓN DE VOTO (y 1390-1500)
  y la viñeta; flashes blancos suaves en cada sello.
- No dibujes nada entre y 1370 y 1520 (la barra) ni arriba de y 580.

## Personajes (dibujados genéricos, línea blanca 5px sobre relleno azul noche)
- DUEÑO: hombre de unos 50, pelado arriba con pelo a los costados, bigote, ojeras, camisa y
  CORBATA ROJA; gestos de político (mano en el pecho, dedo en alto).
- AGENTE DE IA: un cuerpo de traje simple y la cabeza es una PANTALLA redondeada con borde celeste,
  dos ojos-punto y una sonrisa de línea celeste; antena chica.
- MODERADORA: mujer de pelo carré, anteojos, detrás de un escritorio con tarjetas, dorado.

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


> En este reel mandan la paleta y la tipografía de arriba: donde SPEC-base dice crema `#efeee5` y
> verde `#5ce611`, acá es blanco `#f4f4f4` y el color de cada personaje; la etiqueta va en dorado.

## Brief por escena (tiempos relativos a cada escena; ver tiempos.md)

**s01-debate (0-5.71).** El set: dos atriles enfrentados (rojo izq., celeste der.) a medio dibujar
en el cuadro 0, micrófonos. "debate" (1.08): cae "EL DEBATE" dorado gigante + "QUE DEFINE TU LOCAL".
"vos" (2.67): sube el dueño detrás del atril rojo, zócalo "VOS · EL DUEÑO". "agente" (4.17): sube
el agente (cabeza-pantalla celeste), zócalo "AGENTE DE IA"; "VS" blanco entre los dos.

**s02-promesa (5.71-9.72).** Primer plano del dueño en su atril con la mano en el pecho; detrás, un
CARTEL DE CAMPAÑA rojo que se despliega: "CONTESTO TODO · EN EL DÍA". "prometo" (0.92): mano al
pecho y el cartel cae; "día" (3.04): papelitos/confeti dorado y el dueño guiña.

**s03-lunes (9.72-14.06).** Tarjeta blanca CHEQUEO DE DATOS (cinta dorada "CHEQUEO DE DATOS").
Adentro un chat: globo de cliente "¿Tenés en talle M?" con "LUNES 09:12"; "viernes" (2.54): llega
la respuesta del local "Sí! perdón la demora" con "VIERNES 18:40" y un reloj que gira. "Falso"
(3.64): SELLO ROJO "FALSO" cae en diagonal, temblor.

**s04-presupuesto (14.06-17.37).** El dueño grita con un megáfono rojo desde el atril; el cartel
nuevo: "LLAMO A TODOS". "todos" (0.78): aparece una lista de nombres con tildes vacíos;
"presupuesto" (2.08): ondas del megáfono.

**s05-gustavo (17.37-21.61).** "Falso" (0): sello FALSO de entrada sobre la tarjeta de chequeo. Un
chat de "Gustavo": "¿Me pasás presupuesto?" con telarañas que se dibujan; "sigue en el chat"
(1.88): dos tildes grises sin respuesta; "mayo" (3.03): etiqueta de fecha "MAYO" y un calendario
que pasa hojas.

**s06-dolar (21.61-27.87).** La MODERADORA en su escritorio (pelo carré, anteojos, tarjetas en la
mano). "Doña Elsa" (1.00): foto-polaroid dibujada de una señora con rodete y cartera, "¿DÓNDE
ESTÁ?". "Mirá, el tema del dólar" (2.87): corte al dueño con un billete dibujado "$" que agita,
gotas de sudor. "Eso no es lo que pregunté" (4.50): la moderadora golpea las tarjetas; un cartel
"ESO NO ES LO QUE PREGUNTÉ" dorado sobre el dueño, que se achica.

**s07-elsa (27.87-33.92).** El dueño promete con las dos manos en el pecho, ojos llorosos, cartel
"ME ACUERDO DE DOÑA ELSA". "Nadie le escribe" (2.45): tarjeta de chequeo con el chat de Doña Elsa
vacío "ÚLTIMO MENSAJE: INVIERNO" y un copo de nieve. "Falso" (4.46): sello FALSO + público
"uuuh" (letras "UUUH" que rebotan).

**s08-replica (33.92-37.07).** Zócalo celeste "CANDIDATO · AGENTE DE IA" y el CRONÓMETRO del minuto
de réplica: círculo dorado con "1:00" que arranca a correr en "minuto" (1.64); el agente se acomoda
y su pantalla-cara sonríe.

**s09-agente (37.07-41.56).** Primer plano del agente. "Yo no prometo" (0.33): las promesas del
dueño (cartelitos rojos) se tachan. "lo hago" (1.16): un celular con chats que salen solos: "Hola
Sofi, ¿te quedó alguna duda del presupuesto?" "al que preguntó y no compró" (2.08); "hoy" (3.83):
tildes verdes dobles.

**s10-verdadero (41.56-48.07).** Chat con Doña Elsa: el agente "Doña Elsa, ¡la extrañamos!" y ella
responde "¡El jueves paso!" en "vuelve el jueves" (2.00). "Verdadero" (3.28): SELLO VERDE
"VERDADERO", aplausos. "¡Me viene a sacar el puesto!" (4.52): el dueño señalando, furioso, signos
de exclamación rojos.

**s11-vice (48.07-51.34).** El agente levanta las manos ("Tranquilo"); un cartel de campaña con dos
casillas: "PRESIDENTE: _____" se tacha en "presidente" (1.25) y aparece "VICE" en "vice" (2.50) con
su cara-pantalla; la barra de abajo se vuelve dorada (ambiente).

**s12-gobernas (51.34-55.80).** Cartel de FÓRMULA dorado con los dos: "DUEÑO · PRESIDENTE" y
"AGENTE · VICE", apretón de manos en el medio. "seguimiento" (1.23): flechas de chats que van y
vienen. "te la paso" (3.06): un globo de chat que vuela del agente al dueño, que sonríe.

**s13-urna (55.80-59.83).** La URNA dorada en el centro. "seguimiento" (1.19): un cliente-silueta
duda con su sobre; "votan en blanco" (2.46): sobres en blanco que caen en la urna, cartel "VOTO EN
BLANCO".

**s14-scalerics (59.83-66.69).** Cambia la luz: la moderadora se va; el agente solo, celular grande
con dos chats que se mandan solos: "¿Te quedó alguna duda?" (preguntó y no compró, 2.90) y
"¡Te extrañamos! ¿Volvés?" (dejó de venir, 4.61). "Y no tiene veda" (5.63): cartel "SIN VEDA"
con una luna y un reloj de las 3.

**s15-cta (66.69-72.81).** Cierre: "ETIQUETÁ" gigante blanco y debajo "AL CANDIDATO QUE PROMETE Y NO
LLAMA" con el dueño-cartel de campaña y un "@" rojo que cae sobre él; el sello FALSO final chico.
