# Reel "El jardinero": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA (hace el seguimiento del que preguntó y no
compró, le escribe al que dejó de venir, y te pasa la conversación cuando el cliente quiere comprar).
Formato P: PERSONAJE DE LA CULTURA POPULAR, un PROGRAMA DE JARDINERÍA DE LA TARDE (inventado: "Jardín
de la tarde", sin marcas reales). El conductor TITO (voz Puck, sombrero de paja, bigote canoso, delantal
verde) recorre "el vivero de un comercio" y cada cliente es una PLANTA EN MACETA, con cara, MARCHITA
porque nadie la regó. Gancho (Tito, bajito, como documental): "Este cliente te preguntó un precio en
agosto. Y lo dejaste secar." Ejemplares: la PREGUNTONA ("le dijeron «después te paso». Y nunca le
pasaron"; la planta habla, voz Leda: "Sigo esperando, eh."), el HABITUÉ ("venía todos los sábados...
más seco que vos a fin de mes"), la DEL PRESUPUESTO ("pidió precio para el cumple de quince de la nena.
La nena ya cumplió dieciséis"). Interrumpe el DUEÑO (voz Charon): "¡Pará, Tito! ¡Yo no soy mal
jardinero! ¡Estoy todo el día en el mostrador!" GIRO (Tito, cálido): "Y tiene razón. Usted riega lo que
tiene adelante. El de agosto quedó en el fondo del vivero." Entra Scalerics (Orus): agentes de IA, "un
empleado que riega por vos, a cualquier hora". Las plantas FLORECEN; la Preguntona: "¡Ay, me
escribieron! ¿Me lo reservás?" Tito: "Eso, amigos, es un vivero que vende." CTA (Orus): "Etiquetá al que
tiene el WhatsApp lleno de clientes secos."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → `AJ=1.2 AO=1.15 node partes/componer.mjs`;
partes/fix.json corrige "Tito"): 65.7 s; reel 68.9 s.

## RECURSO VISUAL CENTRAL
Las PLANTAS-CLIENTE en maceta de terracota con cara (`JA.planta`): secas (hojas ocre colgando, tierra
agrietada, cara de ojos caídos) y, con el agente, VIVAS (hojas verdes paradas, flores, cara feliz). La
REGADERA del agente de IA (verde, con pantallita y "IA") cuyas gotas son globitos de chat verdes.
En ambiente.html, el medidor "HUMEDAD DEL VIVERO" que está en SECO y se llena cuando entra el agente.

## ESTILO: INVERNADERO (programa de la tarde)
Fondo (armar.mjs): invernadero de vidrio verde oscuro con parantes (grilla de 180 x 300 px), luz de sol
cálida arriba a la izquierda, piso de baldosas de terracota desde y 1540 con zócalo de madera.
ambiente.html: arriba el cartel de madera del programa "JARDÍN DE LA TARDE" con "EN VIVO · CANAL DE
LA TARDE" y punto que titila; enredaderas que cuelgan de las esquinas superiores y se mecen; abajo a la
izquierda la chapa de quién habla (TITO verde hoja · LA PREGUNTONA terracota · EL DUEÑO ocre · SCALERICS
verde); abajo a la derecha el medidor "HUMEDAD" (barra en SECO, terracota; se llena verde desde
"Scalerics" y queda en "AL DÍA"); viñeta; flash crema en "Scalerics" y en "poquito" (florecen); desde
"Scalerics" el cartel suma "CON AGENTE DE IA".
Personajes planos con contorno tinta grueso (stroke 6-8), piezas en `assets/jardin.js` (window.JA).

## Paleta (SOLO estos)
- Verde hoja `#4f9a3a` (claro `#8cc85a`, oscuro `#2c6b2a`): hojas vivas, delantal de Tito, regadera IA.
- Verde invernadero `#123323` (oscuro `#0d2419`, medio `#1b4a31`): fondo, vidrios, pantallas.
- Terracota `#c8643b` (claro `#f08a5c`, oscuro `#8f3f22`): macetas, piso, sellos, camisa del dueño, flores.
- Crema `#f3e9d2` (sombra `#e2d3b0`): camisas, carteles, globos, papel.
- Amarillo pétalo `#f2c14e` (seco/ocre `#b08a45`, `#7a5a2a`): centro de flores, títulos; en ocre, lo SECO
  (hojas muertas, madera).
- Tinta `#1c1712`: contornos y textos.
- Piel `#f0c8a0` / `#e0ad86` (solo personajes); agua `#8fd3ff` solo en gotas.
- Solo desde s08 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para el agente y lo que sale bien.
Subtítulos: crema con contorno tinta; acento amarillo `#f2c14e` (Tito), terracota claro `#f08a5c`
(planta/clienta), verde hoja claro `#8cc85a` (dueño), verde `#5ce611` (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), marcas reales.

## Tipos de letra
Lexend 900 (títulos), Lexend 600-800 (chat, globos), IBM Plex Mono 600 (rótulos, tags, carteles),
Black Ops One (sellos), Caveat (carteles escritos a mano en las macetas).

## Zona
Subtítulos arriba (y 236-420). Cartel del programa en y 26-206. Contenido entre y 540 y 1540. Chapa y
medidor en y 1572-1672 y logo en y 1746: no taparlos.

## Escenas (tiempos relativos en tiempos.md)
**s01-agosto** (4.58). Cuadro 0 ya con dibujo: primer plano de Tito agachado (escala 1.25, a la
izquierda) junto a la PREGUNTONA seca en maceta, con telaraña, sobre la mesada; atrás, un calendario de
pared en AGOSTO (página con el día 8 marcado). Tito habla bajito. En "precio" (1.33) aparece colgando de
la planta un globito de chat "¿Cuánto sale?" con hora "12/08". En "agosto" (1.92) el calendario hace pop
y se le marca el día. En "secar" (3.42) cae una hoja seca, la planta se marchita más (marchitar) y sello
ocre "SE SECÓ".
**s02-bienvenidos** (6.56). En "Bienvenidos" (0.0) cortina de presentación: el título "JARDÍN / DE LA
TARDE" gigante en amarillo con borde de flores que brotan, Tito saludando de cuerpo entero a la
derecha (cara feliz). En "Hoy" (2.67) se corre todo: aparece el VIVERO, dos estantes de madera con
5-6 macetas secas, tag "VIVERO DE UN COMERCIO". En "miren" (4.75) zoom lento hacia las plantas, Tito
señala; en "encontramos" (5.42) caen hojas secas.
**s03-preguntona** (8.66). La Preguntona grande al centro (escala 1.6) con cartel en la estaca
"EJEMPLAR 1 / la Preguntona". En "Ejemplar" (0.0) pop del cartel; en "Preguntó" (2.42) celular a la
derecha con chat: globo de ella "¿Cuánto sale?" 12/08; en "dijeron" (3.83) globo del comercio "Después te
paso" (en Caveat, ladeado); en "nunca" (5.67) sello "NUNCA LE PASARON" y las hojas que caen; el celular
muestra "visto". En "Sigo" (6.9) la planta habla (boca) con cara ofendida, globo de historieta "Sigo
esperando, eh." y una tela de araña que se dibuja.
**s04-habitue** (7.47). El Habitué: CACTUS seco (escala 1.5) con cartel "EJEMPLAR 2 / el Habitué". En
"sábados" (2.75) una tira de calendario de sábados con cruces (S S S S) que se marcan verdes y después
vacías; en "Dejó de venir" (3.4) los sábados siguientes quedan vacíos; en "nadie le escribió" (4.25)
celular con "0 mensajes" / "Sin mensajes"; en "Más seco" (5.48) zoom al cactus y una billetera vacía con
una polilla que sale volando, sello "FIN DE MES".
**s05-presupuesto** (6.99). La del presupuesto: planta seca con gorrito de cumpleaños y cartel
"EJEMPLAR 3 / la del presupuesto". En "presupuesto" (1.5) un papel de "PRESUPUESTO" pendiente; en
"quince" (3.66) una torta con vela "15"; en "dieciséis" (5.58) la vela cambia a "16" (flip) y la
planta se marchita más; sello "PASÓ UN AÑO".
**s06-mostrador** (3.71). El DUEÑO irrumpe (cara grita, gota de sudor) detrás del mostrador con caja
registradora, cola de clientes en silueta y el celular vibrando. En "Pará" (0.0) entra con sacudón; en
"jardinero" (1.36) sello "NO SOY MAL JARDINERO"; en "mostrador" (2.63) aparecen tres globos chicos
"¿Me cobrás?", "¿Tenés cambio?", "¿Me envolvés?" encima de la cola.
**s07-razon** (4.99). Tito comprensivo (cara triste) mano en el pecho. En "riega" (1.16) el dueño con una
regadera común riega SOLO la planta que tiene adelante (gotas); en "fondo" (3.58) la cámara se corre a
la derecha y al fondo, en penumbra, las plantas secas de agosto con cartel "FONDO DEL VIVERO".
**s08-agente** (5.85). En "Scalerics" (0.61) flash y entra la REGADERA DEL AGENTE DE IA (verde, con
pantallita de ojos verdes y "IA") flotando con pop; tag verde "AGENTE DE IA". En "empleado" (3.04) se
le pone un gafete "EMPLEADO" y en "cualquier hora" (4.78) un reloj de las 3:00 de la noche y luna; la
regadera trabaja igual.
**s09-riega** (5.72). Fila de tres macetas secas (Preguntona, Habitué, Presupuesto). La regadera IA las
recorre: en "preguntó" (0.67) riega la primera (gotas-globito verdes) y aparece globito "¿Lo seguís
queriendo?"; en "dejó de venir" (2.41) riega la segunda, globito "¡Te extrañamos!"; en "comprar" (3.89)
la tercera hace globito "¡Lo quiero!" y en "te lo pasa" (4.32-4.76) un celular vuela al costado con
"NUEVA VENTA · para vos".
**s10-florecen** (5.21). Las tres plantas FLORECEN en "poquito" (0.91) una tras otra (florecer), Tito
asombrado a la derecha. En "¡Ay" (2.27) la Preguntona en flor habla feliz, globo "¡Me escribieron!"; en
"reservás" (4.18) globo verde "¡Reservado!".
**s11-vende** (2.75). Tito orgulloso (feliz) con el vivero entero en flor; en "vivero" (1.25) sello verde
"VIVERO QUE VENDE" y pétalos que caen.
**s12-cta** (6.38). Fondo del CTA: una maceta-celular seca: un celular plantado en una maceta, con
pantalla de chats y hojas secas. En "Etiquetá" (0.0) aparece "ETIQUETÁ" gigante amarillo con un "@" en
un círculo; en "WhatsApp" (0.96) la pantalla se llena de chats grises sin responder; en "secos" (2.26)
cae una hoja y sello "@ TU AMIGO"; queda una línea abajo "Jardín de la tarde · con agente de IA". El
logo de Scalerics lo pone el index.


> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá no es ilustración crema con acento verde: es el invernadero con la paleta de arriba). Sí valen las reglas técnicas.

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

