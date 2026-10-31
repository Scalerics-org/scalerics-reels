# Reel "La boda": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el AGENTE DE IA.
Formato P: CASAMIENTO DE PELÍCULA (la boda interrumpida de las telenovelas y de "El graduado",
solo nombrada; nada de imágenes de la obra). LA TÍA ELSA (sombrero rosa, rulos dorados, vestido
azul a lunares, pañuelo) le susurra al que mira: "Tu mejor clienta se casa hoy. Y no es con vos."
EL PADRE (alba marfil, estola dorada, libreta vino): "Si alguien se opone a esta unión, que hable
ahora o calle para siempre." Se abren las puertas de la iglesia de un golpe: RICARDO (el dueño de
Calzados Ricardo: camisa azul, delantal vino, despeinado, bigote, sudando): "¡Yo me opongo!
¡Lucía, no te cases! ¡Vos sos clienta mía de toda la vida!". La tía, encantada: "¡Ay, como en la
novela!". LUCÍA (la novia, la clienta; vestido marfil, tiara dorada, ramo) indignada: "¿Tuya? Un
sábado a la noche te pregunté si tenías las botas en treinta y ocho. Visto. Te insistí y me
pusiste: «pasá el lunes». Y el miércoles... ¡un pulgar!". El padre: "¿Un pulgar?". Ricardo:
"¡Estaba solo en el mostrador! ¿Qué tiene él que no tenga yo?". Lucía: "¡Me contesta!". EL DE
ENFRENTE (el novio: traje azul, moño dorado, jopo, sonrisa sobradora): "A las once de la noche le
contesté al toque. Le reservé las botas, y cuando entró el treinta y ocho, le avisé." Ricardo:
"¿Y vos cuándo dormís?". Novio: "Como un bebé. El que contesta es mi empleado nuevo: no duerme y
se sabe el stock de memoria." Padre: "Los declaro clienta y comercio. ¡Tiren el arroz!". GIRO y
cierre con el narrador (Orus): "El empleado nuevo del de enfrente es un agente de IA: atiende su
WhatsApp a cualquier hora, reserva y avisa. En Scalerics te hacemos el tuyo, antes de que te
toque ir de invitado. ¿Te oponés o callás para siempre? Contanos en los comentarios."
Voces (partes/voces.sh, partes/componer.mjs): tía Kore, padre Charon, Ricardo Puck, Lucía Leda,
novio Fenrir, narrador Orus. Voz de 70.1 s, reel de 73.28 s.

## Recurso visual central
UNA IGLESIA DE TELENOVELA en penumbra: ventanales en ojiva con VITRALES de colores a los costados,
rosetón apagado arriba y alfombra vino al altar (fondo fijo de `armar.mjs`); haces de luz rosa y
azul, PÉTALOS que caen todo el tiempo, la PLACA de la invitación arriba ("HOY SE CASAN · Lucía &
el de enfrente", en cursiva Cormorant dorada) y el ZÓCALO de telenovela con quién habla (todo en
`compositions/ambiente.html`, que también tira el ARROZ en "¡Tiren el arroz!" y hace los flashes).
Momentos fuertes: las PUERTAS de la iglesia que se abren de golpe con Ricardo a contraluz, el
ARCO DE FLORES del altar, el celular de Lucía con el chat (visto, «pasá el lunes», el PULGAR
gigante dibujado), los ANILLOS, la TORTA, y al final el celular del novio que contesta solo.
Edición CARGADA: palabras gigantes que caen en su palabra, sacudones, nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Vino-negro `#2a1220`: contornos (6 px), fondos de carteles, el jopo del novio.
- Marfil `#fbf4e6`: piel, vestido de la novia, alba del padre, textos.
- Dorado `#e3b448`: anillos, estola, tiara, arco, el padre y el novio (acento de subtítulos).
- Rosa empolvado `#eba5b3`: la tía, la novia, flores, pétalos, burbujas de Lucía.
- Vino `#9b2445`: puertas, delantal de Ricardo, libreta, pelo de Lucía, sombras de los textos.
- Azul vitral `#5b8ee0` (y `#7fa6ea` en subtítulos): Ricardo, el traje del novio, la tía.
- Verde Scalerics `#5ce611`: SOLO desde s13 (entra Scalerics).
Acento de subtítulos por quién habla (`reel.voces`): tía y Lucía rosa, padre y novio dorado,
Ricardo azul, Scalerics verde.

## Tipos de letra
Lexend 800-900 mayúsculas para lo grande; Cormorant Garamond Italic para lo de invitación (solo
decorativo y grande); IBM Plex Mono 600 para horas y zócalo. Nada que haya que leer de menos de 26 px.

## Zona
Placa de la invitación arriba (y 58-194, ambiente). Subtítulos en y 236 a ~420. Contenido de
escena entre y 540 y 1540. Zócalo en y 1560-1690 (ambiente). Logo de Scalerics en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo de iglesia con vitrales en SVG, colores de subtítulos por voz, cortina).
- `compositions/ambiente.html` (a mano): placa, haces, pétalos, zócalo por parlamento, flashes
  (11.55, 29.9, 37.15), arroz (53.75); se apaga en 55.8 cuando entra Scalerics.
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: tia, cura, dueno,
  novia, novio; objetos: anillos, arco, puertas, pulgar, botas, torta, celular).
  `cd partes/escenas && python3 sNN.py` escribe la escena y su `.sfx.json`; después `node armar.mjs`.

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


## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-gancho (0 a 5.23) · la tía cuenta el chisme
Cuadro 0 ya armado: el arco de flores dorado del altar, a media luz, y los anillos girando al
centro. La tía Elsa entra por la izquierda, tapándose la boca con la mano para susurrar (vaivén).
"clienta" 0.38: cae "TU MEJOR CLIENTA" (marfil, sombra vino). "casa" 1.81: "SE CASA HOY" dorado
gigante, sacudón, los anillos dan un golpe de brillo. "no" 3.33: todo se corre; "con vos" 3.71-4.05:
sello vino torcido "Y NO ES CON VOS" que cae encima con sacudón fuerte; la tía se ríe (boca).

### s02-cura (0 a 6.36) · ¿alguien se opone?
El padre al centro bajo el arco de flores, con la libreta abierta, hablando solemne (vaivén lento,
cejas que suben). "opone" 1.00: "¿ALGUIEN SE OPONE?" cae arriba (dorado). "hable" 3.18: la cámara
se acerca (zoom suave del padre). "calle" 4.48: "O CALLE" en marfil; "siempre" 5.09: "PARA
SIEMPRE" vino; un silencio tenso: velas a los costados titilando.

### s03-opongo (0 a 5.44) · ¡Yo me opongo!
Cuadro 0: las puertas de la iglesia cerradas (vino, arco dorado). "Yo" 0.0-"opongo" 0.37: se abren
de golpe (hojas que giran), luz marfil detrás y Ricardo a contraluz con los brazos abiertos;
"¡YO ME OPONGO!" gigante, sacudón fuerte. "Lucía" 1.37: Ricardo corre hacia adelante (escala),
gotas de sudor. "clienta" 3.24 "mía" 3.61: cartel dorado "CLIENTA MÍA" y "DE TODA LA VIDA" en
"toda" 4.07 como sello.

### s04-novela (0 a 3.06) · ¡como en la novela!
La tía en primer plano llorando de emoción con el pañuelo (lágrimas azules que saltan), corazones
rosas que suben. "novela" 1.43: rótulo de telenovela en cursiva dorada "Pasión de barrio · capítulo
final" con destellos.

### s05-visto (0 a 5.96) · el chat de Lucía
"Tuya" 0: Lucía (novia) a la izquierda, brazos en jarra, cejas furiosas; "¿TUYA?" cae rosa. "sábado"
1.30: aparece su celular a la derecha con el chat con "Calzados Ricardo": mensaje rosa "¿Tenés las
botas en 38?" con "sáb 22:47". "botas" 3.43: dibujo de las botas vino con "38". "Visto" 5.31: debajo
del mensaje, "Visto" y sello gigante "VISTO" vino que cae torcido, sacudón.

### s06-lunes (0 a 3.23) · «pasá el lunes»
"insistí" 0.06: el chat sigue: tres mensajes de Lucía en fila ("¿?", "holaaa", "¿las tenés?").
"pusiste" 1.17: respuesta de Ricardo en blanco: "pasá el lunes" (pop) y "PASÁ EL LUNES" gigante en
azul que cae en 2.03. Lucía de costado, indignada.

### s07-pulgar (0 a 3.74) · ¡un pulgar!
"miércoles" 0.16: hoja de almanaque "MIÉRCOLES" que cae. "pulgar" 1.37: un PULGAR dorado gigante
dibujado cae al centro con sacudón y "¡UN PULGAR!" debajo. "¿Un pulgar?" 2.14: el padre asoma a la
derecha, horrorizado, con la libreta en alto.

### s08-mostrador (0 a 4.12) · ¡estaba solo!
Ricardo a la izquierda con los brazos arriba, detrás de un mostrador de zapatería con cajas de
zapatos apiladas (y el teléfono que vibra en el mostrador). "solo" 0.37: "SOLO" azul cae. "tiene"
2.03: Ricardo señala a la derecha, donde está el novio de espaldas posando; "¿QUÉ TIENE ÉL?" en
dorado en "él" 2.40.

### s09-contesta (0 a 7.03) · ¡Me contesta! y el novio
"contesta" 0.70: Lucía grande, "¡ME CONTESTA!" rosa gigante con sacudón y corazones. 1.47: entra
el novio con el celular; reloj "23:00" dorado. "contesté" 2.56: celular del novio: chat con Lucía,
respuesta "¡Hola Lucía! Sí, tenemos" (23:01). "reservé" 4.02: "Te las reservo a tu nombre" y el
sello "RESERVADO" sobre las botas. "entró" 5.56: notificación "¡Llegaron tus botas en 38!" y
"avisé" 6.38 guiño del novio.

### s10-dormis (0 a 3.10) · ¿Y vos cuándo dormís?
Ricardo a la izquierda, desconcertado, "¿CUÁNDO DORMÍS?" azul. "Como un bebé" 1.86: luna dorada,
el novio durmiendo acostado en una cama, "z z Z" dorados que suben.

### s11-empleado (0 a 4.70) · el empleado nuevo
Un celular grande al centro con la pantalla encendida en la oscuridad, contestando solo (globitos que
entran) y la tarjeta "EMPLEADO NUEVO" que cae en "empleado" 0.76. "duerme" 2.12: reloj "03:12" y
"NO DUERME". "stock" 3.12: estante de cajas de zapatos con números que se tildan, "STOCK DE
MEMORIA". Es un misterio: no se dice todavía qué es.

### s12-arroz (0 a 3.83) · los declaro clienta y comercio
El padre arriba con la libreta, los novios abajo tomados del brazo (Lucía con ramo, el novio
canchero), la torta de bodas al costado. "clienta" 0.45: "clienta y comercio" en cursiva dorada arriba (y 548). "comercio" 1.27: la torta
a la izquierda. "Tiren" 1.82: ramo y brazo arriba, saltitos. "arroz" 2.64: lluvia de arroz (ambiente),
guiño del novio y Ricardo chiquito a la derecha, solo, cabizbajo.

### s13-agente (0 a 6.38) · el giro: un agente de IA
Se apaga la iglesia. "enfrente" 1.09: el celular del novio, ahora con la etiqueta verde. "agente"
2.09: "AGENTE DE IA" gigante verde con sacudón. "WhatsApp" 3.73: el chat contesta solo; reloj que
gira "a cualquier hora" (4.09). "reserva" 5.10 y "avisa" 5.55: dos chips verdes "RESERVA" y "AVISA".

### s14-invitado (0 a 3.80) · antes de ir de invitado
"Scalerics" 0.08: tarjeta de invitación marfil con borde dorado que se abre: "En Scalerics te
hacemos el tuyo" (verde). "antes" 2.24: abajo cae la tarjetita de mesa "INVITADO · vos · mesa 14 · al fondo";
"invitado" 3.26: una X vino la tacha (para que no te toque).

### s15-cta (0 a 7.30) · ¿te oponés o callás?
"oponés" 0.65: "¿TE OPONÉS" marfil; "callás" 1.37: "O CALLÁS" dorado; "siempre" 1.64: "PARA
SIEMPRE?" rosa. Dos botones grandes: "ME OPONGO" (vino) y "CALLO" (azul) que laten. "Contanos"
2.74: caja de comentario con cursor que escribe "me opongo" y anillos girando.
