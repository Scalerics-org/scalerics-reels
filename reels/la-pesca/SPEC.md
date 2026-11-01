# Reel "La pesca": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA, ángulo SEGUIMIENTO del cliente que preguntó y no
compró. Formato P: PERSONAJE DE LA CULTURA POPULAR, un PROGRAMA DE PESCA DEPORTIVA DE LA TELE (inventado:
"Pique Comercial"). El CONDUCTOR (voz Fenrir, susurro emocionado de documental) abre en la cara del que
mira: "Lo tenías picando. Y lo soltaste." Presenta el programa ("Silencio... hoy pescamos en aguas de
WhatsApp"), muestra la SONDA con un "ejemplar hermoso: cliente nuevo, con ganas de comprar". La CLIENTA-PEZ
(voz Leda) pregunta "Hola, ¿cuánto sale el sillón gris?"; "¡Picó! Despacito... ahora recogé la línea". El
DUEÑO de la mueblería en la lancha (voz Charon, desganado): "Treinta y dos mil. Cualquier cosa, avisame."
"¿Avisame? ¡Soltó la caña! ¡Se puso a mirar el agua!" El pez: "Ah... bueno. Lo voy a pensar", y nada
derechito a la mueblería de enfrente. Dueño: "Tranquilo, ya va a volver." "No vuelven, señor. ¿Y usted qué
hace?" "Tiro más carnada. Pago más publicidad." "¡Pero si ya picó! ¡Lo que falta es recoger la línea!"
GIRO (el conductor deja de susurrar, cálido): "Y lo entiendo: usted tiene un local que atender. No puede
estar todo el día con la caña en la mano." Entra Scalerics (Orus): agentes de IA, "un empleado que nunca
suelta la línea". El AGENTE (voz Kore): "Al otro día le escribo: ¿te quedó alguna duda con el sillón? Le
mando las medidas, le agendo la entrega, y cuando es para vos, te paso la conversación." Clienta: "¡Ay, sí!
¿Me lo traen el sábado?" Conductor: "¡Arriba, arriba! ¡Qué ejemplar!" CTA (Orus): "Mandáselo al que deja
picando a los clientes."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs; atempo 1.22 conductor,
1.15 clienta y Orus, 1.12 dueño, 1.2 agente): 71.7 s; reel 74.9 s.

## RECURSO VISUAL CENTRAL
La LÍNEA DE PESCA: la caña, la boya roja y crema que se hunde cuando el cliente pica, el carrete que hay
que girar ("recogé la línea") y la SONDA (fish finder) donde el cliente aparece como un eco naranja con una
mira roja. El pez es la clienta (naranja, pestañas, panza crema). Al final, el agente de IA (un celular con
cara verde y gorro de pescador) sostiene la caña firme y el pez sale del agua enganchado.

## ESTILO: LANCHA AL AMANECER (programa de pesca de TV)
Fondo en armar.mjs: cielo naranja (de #a8461a arriba a #ffd9a0 en el horizonte, y 860), sol a medio salir
a la derecha con reflejo a rayas en el agua, costa turquesa oscura a la izquierda, agua turquesa que se
oscurece hacia abajo con ondas. ambiente.html: arriba a la izquierda el "bug" del programa (anzuelo +
PIQUE COMERCIAL · PESCA DEPORTIVA · EN VIVO con punto rojo que titila; desde "Scalerics" dice CON AGENTE DE
IA con borde verde) y a la derecha la hora "06:12 · AGUAS DE WHATSAPP"; abajo a la izquierda la chapa de
quién habla (EL CONDUCTOR naranja · LA CLIENTA turquesa claro · EL DUEÑO rojo claro · EL AGENTE DE IA verde
· SCALERICS verde); abajo a la derecha el contador "CAPTURAS HOY 0" (aparece "SE ESCAPÓ" en rojo cuando el
pez se va; pasa a "1" verde en "¡Arriba!"); viñeta; flash crema en "Scalerics" y en "¡Arriba!".
Personajes planos con contorno tinta grueso (stroke 6-9), piezas en `assets/pesca.js` (window.PE):
conductor (piluso crema con anzuelo, lentes de sol arriba, barba candado, chaleco de pesca naranja con
bolsillos sobre remera turquesa; caras susurro/sorpresa/enojado/feliz/serio, dedo en los labios, brazo
arriba), dueño (gorra turquesa con M, bigote, remera crema con salvavidas rojo, ojeras; caras desganado/
tranquilo/orgulloso/apurado, celular), pez, lancha "LA PICADA", boya, caña, carrete, sonda, cámara
submarina (agua + marco con REC), agente de IA, burbujas, celular con chat.

## Paleta (SOLO estos)
- Naranja amanecer `#ff8a3d` (claro `#ffb35c`, oscuro `#c95a1c`): cielo, chaleco, pez, títulos, tags.
- Turquesa agua `#1fb5ac` (claro `#7fe8e0`, oscuro `#0b6e74`, profundo `#06404a`): agua, cámara submarina.
- Crema arena `#fff1d6` (sombra `#f0d9ae`): globos, lancha, panza del pez, papel.
- Rojo boya `#e5484d` (claro `#ff7a7a`): boya, sellos, alertas, salvavidas.
- Tinta `#0d1b24`: contornos, sonda, tags.
- Piel `#f0c8a0` / `#e0ad86` (solo personajes).
- Solo desde s13 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para el agente y lo que sale bien.
Subtítulos: crema con contorno tinta; acento naranja claro (conductor), turquesa claro (clienta), rojo
claro (dueño), verde (agente y Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), marcas reales.

## Tipos de letra
Lexend 900 (títulos), Lexend 600-800 (chat, globos), IBM Plex Mono 600 (rótulos, tags, sonda), Black Ops One
(sellos, carteles), Caveat (susurros: "shhh...", "despacito...", "(mira el agua)").

## Zona
Bug y hora en y 70-192. Subtítulos arriba (y 236-420). Contenido entre y 540 y 1540. Chapa y contador en y
1572-1672 y logo en y 1746: no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es la lancha al amanecer con la paleta de arriba). Sí valen las
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
**s01-picando** (2.95). Agua de cerca con la superficie ondulada; caña desde arriba a la izquierda, línea a
la boya y el pez debajo mordisqueando (cuadro 0 ya armado). En "picando" (0.68) la boya se hunde a tirones,
ondas, la caña tiembla y tag "¡PICANDO!". En "soltaste" (1.80) la línea queda floja, la boya se va a la
deriva, el pez sale disparado a la izquierda y sello rojo "¡LO SOLTASTE!" con sacudón.
**s02-bienvenidos** (6.14). El conductor en la lancha "LA PICADA" con el dedo en los labios y "shhh..." en
Caveat ("Silencio"). En "Bienvenidos" (1.08) levanta el brazo y sonríe; en "Pique" (2.0) sello del título
"PIQUE / COMERCIAL". En "aguas" (4.79) asoman del agua globitos de chat; en "WhatsApp" (5.24) tag
"AGUAS DE WHATSAPP".
**s03-sonda** (5.23). La sonda a pantalla grande barriendo (fondo marino naranja, ecos). En "abajo" (0.98)
entra el eco grande del cliente con un pez; en "ejemplar" (1.80) una mira roja lo encierra y gira, sello
"¡EJEMPLAR!". En "Cliente" (3.04) ficha "CLIENTE NUEVO · GANAS DE COMPRAR" y en "ganas" (4.01) la barra se
llena hasta "ALTAS".
**s04-pregunta** (2.21). Cámara submarina (REC): el pez nada frente a un anzuelo y le sale un globo "Hola,
¿cuánto sale el sillón gris?"; en "sillón" (1.04) aparece un sillón gris dibujado.
**s05-pico** (3.80). Boya cerca: "¡Picó!" (0) y "¡Picó!" (0.58) dos sellos rojos, la boya se hunde, la caña
se dobla, sacudón. En "Despacito" (1.25) se va todo y entra el carrete en primer plano con "despacito..."
en Caveat; la manija gira lenta; en "recogé" (2.22) flecha naranja y tag "RECOGÉ LA LÍNEA".
**s06-avisame** (3.57). El dueño en su lancha con el celular, desganado; a la derecha el celular con el
chat: la pregunta (18:02), y "$ 32.000" (0) y "Cualquier cosa, avisame" (1.41) a las 21:47. En "avisame"
(2.49) cabecea con "z z" y tag rojo "NI UNA PREGUNTA".
**s07-solto** (3.57). El conductor sorprendido en primer plano (abajo a la izquierda), sello "¿AVISAME?".
Atrás, el dueño en la lancha con la caña; en "Soltó" (0.91) la caña cae al agua y salpica, sello "¡SOLTÓ LA
CAÑA!"; en "Se puso" (2.03) el dueño baja la cabeza, "(mira el agua)" en Caveat y el conductor se enoja.
**s08-se-va** (6.58). Cámara submarina: el pez con cara de duda y globo "Ah... bueno. Lo voy a pensar.". En
"se va" (2.05) cierra los ojos y nada derechito (rastro de puntos) a la derecha; en "mueblería" (4.75)
aparece el cartel "MUEBLERÍA DE ENFRENTE" en el fondo del mar y el pez entra detrás. El contador marca
"SE ESCAPÓ".
**s09-volver** (4.97). El dueño tranquilo, ojos cerrados, en la lancha; "ya va a volver" en Caveat. En "No
vuelven" (2.15) entra el conductor de frente, serio, sello "NO VUELVEN"; en "usted" (3.62) frunce el ceño y
se acerca.
**s10-carnada** (2.75). El dueño orgulloso vuelca el balde "CARNADA" (0.27); en "Pago" (1.21) vuelan
volantes "OFERTA", "2x1", "PROMO", "¡VENÍ!" al agua; sello "MÁS PUBLICIDAD" en "publicidad" (1.52).
**s11-recoger** (3.40). El conductor enojado con el puño en alto: sello "¡YA PICÓ!" (0.41); en "Lo que
falta" (0.74) aparece el carrete y gira cada vez más rápido; tag "RECOGER LA LÍNEA" en "recoger".
**s12-entiendo** (5.53). GIRO. La mueblería con toldo naranja y crema; el dueño apurado va y viene detrás del
mostrador; tags "CAJA", "PROVEEDORES", "ENTREGAS", "EL LOCAL LLENO". En "No puede" (2.88) el local se corre y
aparece la caña sola en un soporte con el celular colgado de la línea; en "todo el día" (3.36) el celular
vibra con 9 mensajes y tag "UN SOLO PAR DE MANOS".
**s13-agente** (5.18). Flash. En "Scalerics" (0.43) aparece el agente de IA (celular con cara verde y gorro
de pescador) con la caña firme; título verde "AGENTE DE IA" en "agentes" (1.47); parpadea; en "nunca suelta"
(3.56) la línea se tensa, la caña tironea y tag verde "NUNCA SUELTA LA LÍNEA".
**s14-seguimiento** (7.79). Celular grande con el chat "Mueblería · agente de IA · en línea": AYER la
pregunta del sillón; en "otro día" separador verde "HOY · SEGUIMIENTO"; en "te quedó" (1.28) "¡Hola, Sofi!
¿Te quedó alguna duda con el sillón?"; en "mando" (3.25) "Medidas: 2,10 x 0,90 m"; en "agendo" (4.25) "¿Te
agendo la entrega para el sábado?"; en "paso" (6.51) banda "Te paso la conversación".
**s15-captura** (5.39). El pez feliz bajo el agua con la línea, globo "¡Ay, sí! ¿Me lo traen el sábado?".
En "Arriba" (2.61) sale del agua enganchado con salpicón, entra el conductor feliz con el puño en alto, el
contador pasa a 1; en "Qué ejemplar" (4.0) sello verde "¡QUÉ EJEMPLAR!".
**s16-cta** (5.83). Tarjeta crema "PIQUE COMERCIAL · EL CONSEJO": "MANDÁSELO" / "al que deja" / "picando a
los clientes" (rojo, en "picando"), "COMPARTÍ · ENVIÁ · ETIQUETÁ" y flecha verde de compartir; el pez
nada abajo con burbujas.
