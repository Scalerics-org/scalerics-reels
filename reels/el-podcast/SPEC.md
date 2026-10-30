# El podcast · Tienda online · podcast en vivo de dos jóvenes ("Desde la Cama")

**De qué trata.** "Para mi generación, si tu local no vende por internet, no existe." SOFI (24,
Aoede, canchera e irónica) y NACHO (26, Puck, pícaro y exagerado) conducen en vivo "Desde la
Cama", un podcast de charla, y se quejan con humor de comprarle a los comercios de barrio:
zapatillas con "precio por privado" ("¿es una zapatilla o un secreto de Estado?"), el catálogo que
son tres fotos en una historia que se borra al otro día ("como en Misión Imposible: el catálogo se
autodestruye"), "pasá a buscarlo, de nueve a seis" ("¡a esa hora estoy trabajando!"), "yo compro a
las once de la noche, en la cama". Entra un AUDIO DE UN OYENTE: DON, dueño de un local de barrio
(Charon), ofendidísimo: "¡Ustedes no salen de la cama! A mí me conoce todo el barrio." Sofi: "Don,
el podcast se llama Desde la Cama." GIRO: Nacho confiesa que su mejor campera es de un local de
barrio que encontró de casualidad, y que le compraría todos los meses... si lo dejaran. Sofi: "No
es que no queramos el barrio. Queremos el barrio en el celular." Entra Orus (Scalerics): la tienda
online con precios a la vista, Mercado Pago y envíos por DAC, Correo o PedidosYa, que vende sola
a las once de la noche. Cierre de Nacho: "Mandáselo al que todavía te dice: pasá a buscarlo." y
el remate de Sofi imitando al señor: "De nueve a seis."

**Formato:** B (diálogo) vestido de podcast / stream en vivo; cuatro voces (Sofi, Nacho, Don,
Orus al final). Voz de 71.9 s, reel de 75.1 s (partes en `partes/`, ver `partes/componer.mjs`).
**Recurso visual central:** EL ESTUDIO DE PODCAST A OSCURAS. Pared de espuma acústica (fondo de
armar.mjs), dos micrófonos con brazo articulado, auriculares, mesa con borde naranja, el cartel de
neón "DESDE LA CAMA" y la capa fija de stream (`ambiente.html`): EN VIVO rojo + nombre del podcast
+ contador de oyentes arriba, las ondas de audio del que habla abajo (con su color), barra de
progreso del episodio y el chat del vivo (un comentario por vez). Las escenas alternan planos de
los conductores (plano de los dos, primer plano de uno) con "lo que cuentan" (celulares, carteles,
la cama) dibujado en el mismo trazo grueso.

## Paleta (manda sobre SPEC-base)
- Negro estudio `#0e0d10`: fondo, contornos (7px, caps redondos), textos sobre claro.
- Naranja neón `#ff6a13`: Sofi, el neón, el acento principal, la mesa, Scalerics.
- Mostaza `#ffc53d`: Nacho, números, el contador de oyentes.
- Crema `#f4ead6`: textos, buzo de Nacho, auriculares de Sofi, celulares.
- Rojo `#ff2d55`: EN VIVO, Don (el oyente ofendido), sellos de "no".
- Grises de equipo `#2a262d` / `#4a4450` (micrófonos, globos ajenos).
- (Detalles: pieles `#f2c29b` Sofi, `#d9a07a` Nacho, `#eab48f` Don; pelo de Sofi `#3a2230`; canas `#bdb5a8`.)
- Se permite el brillo de neón (text-shadow/box-shadow naranja) SOLO en carteles de neón.

## Tipografía
- Subtítulos: Lexend 600, 52px, crema con sombra negra; arriba de cada grupo, una pastilla mono
  con quién habla (SOFI naranja, NACHO mostaza, AUDIO DE UN OYENTE · DON rojo, SCALERICS crema),
  como el nombre en el chat de un stream. El acento con el color de quien habla. Lo arma armar.mjs.
- Carteles grandes: Lexend 900 mayúsculas (`.pd-grueso`). Neón: `.pd-neon` (Lexend 700).
- UI de celular y etiquetas: IBM Plex Mono 600 / Lexend 600.

## Capas fijas
- `compositions/ambiente.html` (encima de las escenas, debajo de los subtítulos): viñeta, barra de
  arriba (y 96-156), ondas (y 1388-1508), progreso (y 1530), chat (y 1574-1648). Las escenas NO
  dibujan en esas franjas.
- Etiqueta de cada escena: `.pd-etiqueta` (pastilla mono con borde naranja, top 1286): el TEMA del
  momento ("TEMA · <b>PRECIO POR PRIVADO</b>").
- Música: `assets/bgm/bed.mp3` (el bed del molde, alargado a 80 s con crossfade), volumen 0.18.

## Personajes (`assets/pod.js`, 440 x 800, base en y 800; meter en `<g transform="translate() scale()">`)
- SOFI: pelo largo ciruela con flequillo, buzo canguro naranja con cordones crema, auriculares crema.
- NACHO: gorro de lana mostaza con pompón, barba de tres días, buzo crema con franja mostaza,
  auriculares negros.
- DON: pelado con canas a los costados, bigotazo gris, cejas en V, camisa roja, delantal crema,
  puño en alto (brazo derecho).
- `PD.mic("izq"|"der")`, `PD.mesa(y)`, `PD.neonSvg(...)`, kit: `pop golpe entra sale sacudon
  dibujar habla parpadeo respira late titila prende contar salida`.
- La boca de quien habla se mueve (`K.habla`) EXACTAMENTE mientras dice su parlamento.

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



## Escenas (tiempos relativos: ver `tiempos.md`)

**s01-no-existe** (4.04 s) · Sofi en primer plano (grande, a la izquierda, escala ~1.05) hablándole
al micrófono, que entra en cuadro desde la derecha. Cuadro 0: ya está a medio entrar. Arriba a la
derecha un local de barrio (casita con toldo a rayas naranja/crema, cartel "TU LOCAL"). En "local"
(1.36) el local hace pop; en "internet" (2.20) aparece un wifi tachado arriba; en "no existe" (3.00)
el local se vuelve punteado, parpadea como glitch y se borra (quedan solo los contornos punteados).
Etiqueta: "TEMA · <b>COMPRARLE AL BARRIO</b>".

**s02-bienvenidos** (2.58 s) · Plano de los dos: Sofi a la izquierda y Nacho a la derecha (escala
0.72), cada uno con su micrófono, la mesa abajo. En "Bienvenidos" (0.0) se prende el neón
"DESDE LA CAMA" arriba (chispazos); Nacho habla y saluda con la mano en alto. En "podcast" (1.70)
un dibujito de cama al lado del neón. Etiqueta: "EPISODIO <b>47</b>".

**s03-privado** (4.58 s) · Celular grande en el centro: chat con "Local del barrio". Arriba una
foto (dibujo) de una zapatilla naranja con "$ ???". En "¿Cuánto" (1.78) el globo naranja de Sofi
"¿Cuánto salen?"; tres puntitos "escribiendo..."; en "Precio" (3.37) el globo gris del local
"Precio por privado." y en "privado" un candado rojo sobre el precio. Etiqueta "TEMA · <b>PRECIO POR PRIVADO</b>".

**s04-secreto** (3.42 s) · Nacho en primer plano a la derecha, indignado (cejas arriba, brazos
abiertos). A la izquierda una carpeta de expediente con la zapatilla, cuando dice "secreto" (2.20)
el sello rojo "CONFIDENCIAL" golpea y el precio queda tachado con barras negras. Sacudón en "Estado".

**s05-autodestruye** (6.83 s) · Celular con una HISTORIA (barras de progreso arriba, tres fotos
borrosas, el reloj "se borra en 23:59"). En "Tres" (0.60) las tres fotos entran de a una
(1.10, 1.36): son manchones borrosos con signos de pregunta. En "borra" (2.54) el reloj corre
rápido. En "Misión Imposible" (3.77) cambia: Nacho voz de espía; aparece una mecha encendida que
recorre el borde del celular y el texto "ESTE CATÁLOGO SE AUTODESTRUIRÁ"; en "autodestruye" (5.72)
cuenta 3-2-1, el celular se sacude y explota en una nube (círculos crema/naranja) y queda humito
y una zapatilla chamuscada cayendo. Etiqueta "TEMA · <b>EL CATÁLOGO</b>".

**s06-nueve-a-seis** (5.44 s) · La puerta de un local con un cartel colgado "PASÁ A BUSCARLO ·
DE 9 A 18 HS" que se balancea (entra en "pasá", 1.19). Un reloj grande al lado: en "nueve" (2.63)
la aguja marca 9, en "seis" (3.22) gira hasta las 6. En "¡A esa hora" (3.95) entra una franja roja "HORARIO DE TRABAJO" que se superpone EXACTA al
arco 9-18 del reloj (el arco se pinta rojo), y la pastilla "¡ESTOY TRABAJANDO!" golpea en
"trabajando" (4.54). Etiqueta "TEMA · <b>PASÁ A BUSCARLO</b>".

**s07-cama** (2.44 s) · Sofi acostada en la cama, tapada hasta el pecho con un acolchado naranja,
la cara iluminada por el celular. Ventana con luna y un reloj digital "23:00" en la mesa de luz
(en "once" 0.59). En "compro" (0.0) del celular salen corazones/carritos; en "cama" (1.69) la pastilla
"¡COMPRADO!" crema sobre naranja. Etiqueta "<b>23:00</b> · HORA DE COMPRAR".

**s08-audio** (7.39 s) · En "Pará" (0.0) Nacho (chiquito, abajo a la derecha) levanta la mano;
"entró un audio" (0.17): una notificación de audio de WhatsApp genérica (globo con botón play y
onda) entra desde arriba. En "¡Escuchame" (1.87) la onda se pone roja y aparece DON en una
ventana de videollamada/audio (marco rojo "DON · OYENTE"), gritando, con el puño en alto; en
"cama" (4.16) un sacudón y aparecen rayitas de enojo; en "A mí me conoce todo el barrio" (4.69)
detrás de Don aparecen tres vecinos (siluetas crema) saludando y el toldo de su local. Etiqueta
"<b>AUDIO</b> DE UN OYENTE".

**s09-se-llama** (3.56 s) · Plano de los dos otra vez. Sofi le contesta tranquila (boca); Nacho
se tienta de risa (se tapa la boca, se sacude). En "Desde la Cama" (1.99) el neón "DESDE LA CAMA"
titila y late fuerte. Risas grabadas. Etiqueta "<b>JAJAJA</b>".

**s10-campera** (3.94 s) · GIRO. Se apaga la luz (velo oscuro) y queda un cono de luz sobre
Nacho, serio, mirando abajo. En "campera" (1.78) aparece flotando una campera mostaza (tipo
bomber) con brillitos, como un tesoro; en "local de barrio" (2.72) una etiqueta colgada de la
manga "HECHA EN EL BARRIO". Etiqueta "<b>CONFESIÓN</b>".

**s11-si-me-dejaran** (7.01 s) · "¿Posta?" (0.0): Sofi chiquita asomando por la izquierda con
los ojos enormes y "¿POSTA?" en pastilla naranja. "La encontré de casualidad" (0.82): un mapa de
calles crema con un caminito punteado que dobla y llega a una vidriera chiquita con una estrella.
"Le compraría todos los meses" (2.73): un calendario con meses que pasan (ENE, FEB, MAR...) con
un tilde en cada uno. "si me dejaran" (5.41): la puerta del local se cierra, candado rojo y el
cartel "DE 9 A 18" vuelve; Nacho suspira. Etiqueta "<b>SI ME DEJARAN</b>".

**s12-barrio-celular** (4.20 s) · Una cuadra de barrio (cuatro locales con toldos: zapatería,
almacén, ropa, librería, todos genéricos) a lo ancho. En "No es que no queramos el barrio"
corazones salen de los locales. En "Queremos" (2.18) aparece el contorno de un celular enorme y la
cuadra se achica y entra adentro de la pantalla (scale + y); en "celular" (3.05) el celular hace
pop y se ve la cuadra entera adentro con un borde naranja. Etiqueta "EL BARRIO · <b>EN EL CELULAR</b>".

**s13-tienda** (7.42 s) · Orus. Celular con la TIENDA ONLINE del local: cabecera "TU LOCAL ·
TIENDA", grilla de 4 productos (zapatilla, campera, gorro, mochila) con PRECIOS visibles. En
"tienda online" (1.39) se arma la tienda; en "precios a la vista" (2.50) los precios hacen pop uno
por uno; en "Mercado Pago" (3.60) aparece el botón "PAGAR CON MERCADO PAGO" (solo texto, sin
logo) y se aprieta; en "envíos" (4.61) a la derecha del celular aparecen tres pastillas de envío
"DAC", "CORREO", "PEDIDOSYA" (solo texto) con una cajita que viaja. Etiqueta "<b>TIENDA ONLINE</b> · SCALERICS".

**s14-vende-sola** (2.83 s) · El celular sobre una mesa de luz, de noche (luna). Reloj "23:00".
En "Vende sola" (0.0) caen notificaciones "Nueva venta" una tras otra (3 o 4), con "ding". En
"once" (1.19) el reloj pulsa. Etiqueta "<b>VENDE SOLA</b>".

**s15-cta** (9.46 s) · Plano de los dos (CTA). Nacho señala a cámara en "Mandáselo" (0.0); aparece
un botón grande "COMPARTIR" con una flecha de mandar y el texto "AL QUE TE DICE «PASÁ A BUSCARLO»"
(2.52). En "De nueve a seis" (3.74) Sofi imita al señor: se pone unos bigotes postizos (bigote
gris que aparece en su cara) y el cartelito "DE 9 A 18" baja colgado; Nacho se ríe. Después de la
voz (4.6 en adelante): el neón "DESDE LA CAMA" queda prendido, los dos se ríen y el botón
COMPARTIR late hasta el final. Etiqueta "<b>MANDÁSELO</b>".
