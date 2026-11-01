# Reel "Las ojeras": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA (atiende WhatsApp a las dos de la mañana con tus
precios, stock y horarios, agenda turnos, toma pedidos y te pasa a la mañana lo que es para vos).
Formato C: LISTA EN PASOS, como TUTORIAL DE MAQUILLAJE DE INFLUENCER (personaje inventado, sin marcas ni
personas reales). LA INFLUENCER (voz Zephyr, cantarina) abre: "¡Holis, mis amores! Hoy les enseño a tapar
las ojeras de un comerciante que contesta WhatsApp a las dos de la mañana." El modelo es NÉSTOR (voz
Charon), dueño de una ferretería, con capa de maquillaje y vincha rosa, que contesta el celular dormido
("Buenas... sí, hay stock... ¿Quién habla?"). Cada paso es un producto y un chiste: PASO 1 base ("no duerme
desde que abrió el local"), PASO 2 corrector (ojo izquierdo: el que preguntó precio a la una; ojo derecho:
el que pidió turno a las tres; Néstor: "y el que me mandó un audio de cuatro minutos"), PASO 3 iluminador
("donde le pega la luz del celular toda la noche"), PASO 4 fijador ("para cuando a las cuatro le escriben:
¿estás?"; Néstor se despierta: "¡Estoy! ¡Siempre estoy!"). GIRO (la influencer sale del personaje,
tierna): "Ay, Néstor... No hay corrector que tape esto. Lo que te falta es dormir." Entra Scalerics (Orus):
agente de IA. Vuelve la influencer: "Paso cinco: dormir ocho horas. El único producto sin código de
descuento." Néstor, dormido y feliz: "Cinco minutitos más..." CTA (Orus): "Etiquetá al que te contestó a
las dos de la mañana. Que alguien le avise."
Voz armada por partes (partes/voces.sh -> partes/tiempos.sh -> partes/componer.mjs; atempo 1.17 a la
influencer, 1.1 a Néstor, 1.15 a Orus): 70.8 s; reel 74 s.

## RECURSO VISUAL CENTRAL
EL ESPEJO DE BOMBITAS del tocador: todo pasa adentro del vidrio rosa nude, enmarcado en dorado con
bombitas que brillan. Adentro, la CARA DE NÉSTOR y sus OJERAS LILA, que ningún producto tapa (la base,
el corrector y el iluminador pasan por encima y las ojeras siguen asomando). Cada paso arranca con una
TARJETA DE CAPÍTULO gigante: "PASO 1" (Lexend 900 dorado) con el producto en letra manuscrita (Caveat).
Al final, con el agente, Néstor duerme con antifaz y las ojeras desaparecen.

## ESTILO: TOCADOR DE INFLUENCER CON ESPEJO DE BOMBITAS
Pared ciruela con papel rayado finito y un brillo dorado cálido al centro (armar.mjs); el vidrio del
espejo (x 100-980, y 500-1500, rx 40) rosa nude con reflejos en diagonal (armar.mjs, debajo de las
escenas); la mesa del tocador abajo (y 1540) con filete dorado. ambiente.html (encima de las escenas):
el MARCO DORADO del espejo con 26 bombitas (fila arriba y columnas a los costados) que titilan suave; en
"¿estás?" parpadean como un corto; en el GIRO ("Ay") bajan a luz cálida tenue; en "Scalerics" flash y
vuelven a full; en "dormir" (paso cinco) bajan a luz de noche. Arriba, el cartel de la transmisión:
"TUTORIAL DE MAQUILLAJE" y debajo "OJERAS DE COMERCIANTE · EN VIVO" con punto rosa que titila (desde
"Scalerics": "CON AGENTE DE IA · EN VIVO" en verde). Abajo a la izquierda la chapa de quién habla (LA
INFLUENCER rosa · NÉSTOR lila · SCALERICS verde); abajo a la derecha el contador "PASO n/5" con 5 puntos
que se llenan en cada "Paso".
Personajes planos con contorno ciruela grueso (stroke 7-8), piezas en `assets/tocador.js` (window.TO):
la influencer (pelo largo ondulado castaño con reflejos dorados, pestañas enormes, labios rosa, aros
dorados, top rosa fuerte, brocha en la mano), Néstor (pelado con costados grises, bigote, ojeras lila
enormes, capa de maquillaje nude y vincha rosa con moño, celular en la mano), los productos (frasco de
base, varita de corrector, compacto de iluminador, spray fijador, esponja, brocha), celular con chat,
reloj digital, luna, destellos, el agente de IA (celular con cara amable, auriculares y pantalla verde).

## Paleta (SOLO estos)
- Rosa nude `#f2c4b8` (claro `#f9e1d8`, oscuro `#d9998a`): vidrio del espejo, capa, base, papel de tarjetas.
- Rosa fuerte `#e8577e` (claro `#ff8fb0`): la influencer, sellos, stickers, labios, vincha.
- Dorado `#d9a441` (claro `#f3cf7a`, oscuro `#a8782a`): marco, bombitas, tarjetas "PASO", productos.
- Ciruela `#2b1720` (medio `#4a2533`, `#5a2c3b`): contornos, pared, textos, tags.
- Lila `#7d6b9e` (claro `#c3b2f0`): LAS OJERAS, la noche, la luna, lo que no se tapa.
- Piel `#f0c8a0` / `#e0ad86` (solo personajes).
- Solo desde s10 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para el agente y lo que sale bien.
Subtítulos: crema rosado `#fbeee8` con contorno ciruela; acento rosa claro `#ff8fb0` (influencer), lila
claro `#c3b2f0` (Néstor), verde `#5ce611` (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos o marcas reales (WhatsApp solo como texto), marcas de
maquillaje, caras de personas reales.

## Tipos de letra
Lexend 900 (números de paso, títulos), Lexend 600-800 (chat, stickers), IBM Plex Mono 600 (rótulos,
tags), Caveat 700 (nombre del producto en la tarjeta de paso, notas), Black Ops One (sellos).

## Zona
Cartel arriba en y 30-210. Subtítulos en y 236-420. Bombitas de arriba en y ~486. Contenido de las
escenas DENTRO del vidrio: x 120-960, y 530-1480. Chapa y contador en y 1572-1672 y logo en y 1746:
no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el tocador con la paleta de arriba). Sí valen las
> reglas técnicas.

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


## Escenas (tiempos relativos en tiempos.md)
**s01-holis** (6.50). Cuadro 0: la influencer ya está a la derecha (busto grande, x ~700), brocha en alto, a
medio entrar. En "Holis" (0.0) sticker rosa "¡HOLIS, MIS AMORES!" a la izquierda con destellos dorados y la
influencer guiña; en "ojeras" (2.48) aparecen dos medialunas lila gigantes (las ojeras como "swatches")
y la tarjeta "TUTORIAL: OJERAS"; en "comerciante" (2.99) tag "DE COMERCIANTE"; en "WhatsApp" (4.44) un
globo de chat que vibra; en "dos de la mañana" (5.30) reloj digital "02:00" con luna lila.
**s02-nestor** (6.80). En "modelo" (0.34) entra Néstor sentado al centro con capa nude y vincha rosa,
dormido, ojeras lila, celular en la mano que ilumina; en "Néstor" (1.34) tag "EL MODELO: NÉSTOR"; en
"saludá" (2.13) "Zzz" y cabeceo; en "Buenas" (3.13) contesta dormido: globo "Buenas..." que sale del
celular; en "stock" (5.03) globo "sí, hay stock"; en "¿Quién" (5.85) abre un ojo y aparece un "?" rosa.
**s03-base** (5.03). En "Paso" (0.0) tarjeta de capítulo "PASO 1" con "base" en Caveat, que se achica
arriba a la izquierda en "Bien" (1.61); en "base" (0.88) el frasco de base pop; en "cubriente" (1.88) la
esponja va a la cara de Néstor y la cara se cubre de base nude (las ojeras se ven menos pero siguen);
en "duerme" (3.24) cartelito de ferretería "ABIERTO" con telaraña; en "abrió" (3.84) tag "DESDE QUE ABRIÓ".
**s04-corrector** (6.96). Tarjeta "PASO 2 · corrector" en "Paso"; varita del corrector en "corrector" (0.43);
en "Ojo izquierdo" (1.41) zoom a la cara de Néstor; en "preguntó precio" (2.48) etiqueta colgada de la
ojera izquierda: globito "¿precio?" + "01:00"; el corrector la pinta y la ojera vuelve a asomar; en
"derecho" (4.36) la otra: "¿turno?" + "03:00"; en "tres" (6.24) sello "NO TAPA".
**s05-audio** (2.94). Néstor habla: en "audio" (0.82) un globo de audio gigante (triángulo de play,
onda, "4:00") cruza la pantalla; en "cuatro minutos" (1.18-1.73) la onda avanza y las ojeras de Néstor
se estiran hasta el bigote.
**s06-iluminador** (4.04). Tarjeta "PASO 3 · iluminador"; compacto dorado abierto con brocha en
"iluminador" (0.51); en "luz" (1.96) se oscurece el vidrio (noche) y el celular le ilumina la cara a
Néstor desde abajo, con destellos en los pómulos; en "toda la noche" (3.0) luna lila y estrellas.
**s07-fijador** (5.21). Tarjeta "PASO 4 · fijador"; spray en "fijador" (1.14) que rocía nube sobre Néstor
en "para" (1.62); en "cuatro" (2.56) reloj "04:00"; en "¿estás?" (4.02) celular grande con el globo
"¿estás?" que vibra y sacude.
**s08-estoy** (2.96). Néstor se para de golpe, ojos enormes, mano en la frente como soldado: título rosa
"¡ESTOY!" en 0.0; en "Siempre" (0.96) se apilan tres globos "¡Estoy!" con horas 01:00, 03:00, 04:00 y
sello "SIEMPRE".
**s09-dormir** (5.55) GIRO. Luz cálida (las bombitas bajan). La influencer baja la brocha, tierna, mira a
Néstor desplomado; en "corrector" (1.71) un corrector chiquito al lado de una ojera gigante; en "tape"
(2.57) el corrector se cae; en "dormir" (4.47) título "dormir." en Caveat dorado y una almohada.
**s10-agente** (6.22). Flash en "Scalerics" (0.70): el celular de Néstor se vuelve el AGENTE DE IA (cara
amable, auriculares, pantalla verde) con el cartel "TU AGENTE DE IA" en "agentes" (1.92); en "empleado"
(3.39) credencial verde "EMPLEADO"; en "WhatsApp" (4.35) globos de chat contestados con tildes verdes;
en "dos" (5.22) reloj "02:00" con luna y el agente con los ojos bien abiertos.
**s11-pedidos** (7.73). El agente a la izquierda y fichas que aparecen en cada palabra: "precios" (0.39),
"stock" (1.26), "horarios" (2.30), "turnos" (3.57), "pedidos" (4.44), cada una con tilde verde; en "pasa"
(5.39) sale el sol "08:00" y una flecha verde del agente hacia una notificación "PARA VOS" que llega en
"vos" (6.78).
**s12-paso-cinco** (4.75). Tarjeta "PASO 5 · dormir"; en "dormir" (0.91) Néstor duerme con antifaz rosa,
sin ojeras, destellos; en "producto" (2.48) caja de producto "8 HORAS DE SUEÑO" con moño; en "código"
(3.33) cupón "CÓDIGO DE DESCUENTO" que se tacha con sello "NO HAY".
**s13-minutitos** (2.85). Néstor dormido feliz en primer plano, "Zzz" que crecen; en "minutitos" (0.50) el
agente a un costado con tilde "LO ATIENDO YO".
**s14-cta** (6.45). Sticker rosa gigante "ETIQUETÁ" en 0.0; en "contestó" (0.79) un comentario de
Instagram dibujado (sin logo) con "@" que se escribe: "@ el que te contestó a las 2"; en "alguien" (2.53)
sello "QUE ALGUIEN LE AVISE"; la influencer manda un beso y Néstor duerme al costado.
