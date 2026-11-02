# El Conde · SPEC del reel

**De qué trata.** Película de vampiros de clase B en Technicolor. El Conde (voz grave y teatral,
Algenib) tiene cuatrocientos años, vive en un castillo en Tacuarembó y solo sale de noche. Quiere una
capa nueva de una tienda del Centro que abre de nueve a siete, por Instagram contesta "pasá por el
local" y no hace envíos (la parte de envíos quedó afuera del audio por largo; el mensaje la sugiere).
Su ayudante jorobado (tipo Igor, voz Enceladus) le lee las opciones; sale el sol y no llegó. Giro (lo
dice el ayudante): mucha gente compra así, de noche, en pijama, desde el celular y desde el interior;
"¿son todos vampiros?" "No, amo. Trabajan hasta las siete." Entra Orus (Scalerics): tiendas online
que venden solas a cualquier hora, Mercado Pago, envío por DAC o Correo, hasta el castillo. Final: el
paquete llega al atardecer, el Conde se pone la capa nueva. Cierre: "Etiquetá al que compra en
pijama a las tres de la mañana." Comedia: nada de sangre, los colmillos son chiquitos y simpáticos.

**Gancho:** "Hace cuatrocientos años que quiero comprarte algo. Y vos cerrás a las siete."

**Voces:** el Conde (Algenib, atempo 1.33), el ayudante (Enceladus, 1.25), la empleada (Leda, 1.05),
Orus narrador (1.15) solo en s11-s12 y el CTA. Partes en `partes/`, se arma con
`node partes/componer.mjs`.

**Recurso visual central:** cartel de película de terror de los 50 pintado a mano: castillo en una
colina con luna amarilla enorme, murciélagos de líneas, antorchas verde lima; los personajes son
dibujos planos con contorno de tinta violeta casi negra (como un cómic de terror). El reloj/horario
"9 a 19" es el villano recurrente. En s11 entra el verde Scalerics como la luz de una pantalla.

## Paleta y tipografía (manda sobre SPEC-base)
- Fondo (armar.mjs): violeta profundo `#12061f` → `#23104a` → `#3a1766`, con brillo de luna
  amarilla arriba a la derecha y un dejo rojo arriba.
- Tinta (contornos): `#12061f` (trazo 5). Crema de los trazos sueltos y textos: `#f4ead5`.
- Luna amarilla `#ffd23f` (también acento de subtítulos), rojo capa `#c8102e`, verde lima de
  antorchas `#b6ff3b`, piel del Conde `#dfe8c8`, traje `#1c0d30`, Igor: túnica `#7a4e2d`, piel
  `#c9b98a`. Verde Scalerics `#5ce611` SOLO desde s11.
- Títulos tipo afiche: Cinzel 800-900 (con contorno de tinta y sombra dura); textos de UI: Lexend
  600; etiquetas/sellos: IBM Plex Mono 500. Notas manuscritas: Caveat.
- Se permiten rellenos planos, contornos gruesos y sombras duras (offset, sin blur). Sin degradés
  dentro de los dibujos (salvo el cielo del amanecer de s08), sin glow.
- `compositions/ambiente.html`: estrellas que titilan, dos murciélagos que cruzan cada tanto,
  niebla baja que se corre, viñeta, flashes de relámpago en los golpes, y un rótulo abajo a la
  derecha "EL CONDE · en Technicolor".

## Personajes (iguales en todas las escenas)
- **El Conde**: grupo SVG con los pies en (0,0), ~520 px de alto a escala 1. Capa negra con forro
  rojo y cuello alto, traje violeta casi negro, pechera crema con medallón amarillo, cara verde
  pálida, pelo negro con pico, cejas en V, ojos rojos chiquitos, dos colmillitos blancos.
- **El ayudante**: jorobado, túnica marrón con cuerda, cabeza adelantada, pelo revuelto, un ojo
  grande y uno chico, ~330 px de alto.

SPEC-base sigue valiendo en lo técnico (zona y 580-1330, entrada/salida, determinismo, prefijos,
sfx). En lo visual manda este SPEC.

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


## Escenas (tiempos relativos: ver tiempos.md)

**s01-hace (6.13 s).** Afiche: castillo negro en la colina a la derecha recortado contra una
luna amarilla gigante; el Conde en primer plano a la izquierda, mirando a cámara. "cuatrocientos"
(0.23): cae "400 AÑOS" en Cinzel gigante con contorno y sombra roja, golpe. "comprarte" (2.03): el
Conde extiende una mano con una bolsita de monedas de oro que tintinea. "cerrás" (3.91): un cartel
colgante de tienda "CERRADO" se da vuelta y un reloj marca 19:00; "siete" (4.96): sello rojo
"19:00" que golpea y el Conde se indigna (cejas). Cuadro 0 con el afiche ya a medio aparecer.

**s02-castillo (7.36 s).** "Soy el Conde" (0): título de película "EL CONDE" en Cinzel amarillo con
murciélagos que salen de la O. "castillo" (1.73): castillo en una colina con tres torres, ventanas
verde lima. "Tacuarembó" (2.48): cartel de ruta "TACUAREMBÓ" clavado al pie de la colina (pop).
"solo salgo de noche" (3.76-4.44): la luna sube y la etiqueta "SOLO DE NOCHE" debajo. "capa nueva"
(6.01): el Conde abre su capa vieja: tres agujeros de polilla, una polilla que sale volando.

**s03-tienda (5.10 s).** El ayudante a la izquierda leyendo un pergamino largo. "tienda" (0.80):
vidriera de tienda a la derecha con toldo rayado rojo y crema, cartel "TIENDA · CENTRO".
"Capas de lana" (2.09): adentro un maniquí con capa nueva que hace pop; "rojo" (3.52): el forro
rojo se abre y brillitos amarillos.

**s04-horario (3.45 s).** "¡Perfecto!" (0): el Conde se frota las manos (sube y baja). "abren"
(0.81): cartel de horario colgado de la puerta que se balancea. "nueve" (2.02): aparece "9" y "a"
"19" (2.58) en el cartel, grande, y el Conde se congela; signo "?" sobre su cabeza.

**s05-ceniza (3.54 s).** "¿De la mañana?" (0.23): sol amarillo gigante con rayos que entra desde
abajo a la derecha; el Conde se tapa con la capa. "ceniza" (1.73): versión comedia: el Conde se
reduce a un montoncito de ceniza gris con sus dos ojitos rojos y el medallón encima, en una
vereda de baldosas; nubecita de humo. "vereda" (2.48): la etiqueta "VEREDA DEL CENTRO · 9:00".

**s06-mensaje (4.21 s).** El ayudante con un celular gigante (pantalla de chat de un perfil de
tienda, sin logos). "escribí" (0.16): burbuja del ayudante que se tipea "Buenas noches. ¿Me venden
una capa?" y la hora "3:12". "Hola" (2.14): burbuja de la tienda "Hola."; "Pasá por el local"
(3.00): segunda burbuja "Pasá por el local." con hora "10:47" y tilde de visto.

**s07-a-que-hora (2.70 s).** El Conde grita al cielo con los brazos abiertos (capa abierta); detrás
la luna. "local" (0.60): rayo y relámpago (flash). "hora" (1.51): "¿¡A QUÉ HORA!?" en Cinzel rojo
gigante con temblor; murciélagos que salen espantados.

**s08-amanecer (6.99 s).** "saliendo el sol" (0.88-1.44): el cielo se pone naranja/rosa (rect con
degradé que sube) y el sol asoma por el horizonte; el ayudante señala. "Otra noche sin capa" (2.25):
el Conde se mete en su ataúd (la tapa baja de a poco) con la capa vieja. "Mi primo Drácula" (4.67):
cuadro ovalado colgado en la pared con un vampiro de bigote riéndose ("JA JA" que salta) y la
plaquita "PRIMO D."; "reír" (5.86): el cuadro tiembla de risa.

**s09-pijama (7.02 s).** GIRO. El ayudante, más sabio, con un puntero. "único" (1.20): etiqueta
"NO ES EL ÚNICO". Cuatro viñetas en grilla 2x2 que hacen pop en su palabra: "noche" (3.44) luna
sobre una ventana con un reloj 3:00; "pijama" (4.16) una persona en pijama a rayas con gorro;
"celular" (5.20) mano con celular; "interior" (6.08) mapita de Uruguay simplificado con un pin.

**s10-vampiros (4.96 s).** "¿Son todos vampiros?" (0-0.82): las cuatro siluetas aparecen con capas
y colmillos (como el Conde se lo imagina, burbuja de pensamiento). "No, amo" (2.13): se borra la
burbuja. "Trabajan hasta las siete" (3.11-3.89): las personas con ropa de trabajo frente a un
reloj de oficina que marca 19:00 y el cartel de la tienda "9 a 19": los dos horarios iguales
chocan con un sello "MISMO HORARIO".

**s11-online (7.55 s).** Entra Orus, entra el verde Scalerics. "no son vampiros" (0.61-1.13): los
colmillos de una silueta se caen. "compran como si lo fueran" (2.0): la silueta en la cama con el
celular, luna en la ventana. "tiendas online" (4.78): celular a pantalla completa con la tienda
online: capa de lana, precio, botón verde "Comprar"; "solas" (6.0): el botón se aprieta solo;
"cualquier hora" (6.52): reloj 3:00 AM en verde.

**s12-envio (4.49 s).** "Mercado Pago" (0.19): tarjeta de checkout "Pago con Mercado Pago" con
tilde verde (solo texto, sin logo). "envío" (1.15): camioncito que va por una ruta punteada del
"CENTRO" al castillo; "DAC o Correo" (1.58-2.02): las dos opciones con tilde. "castillo" (3.15):
el camión llega al pie del castillo, ping.

**s13-paquete (6.18 s).** Atardecer violeta-naranja. "paquete" (0.88): caja de cartón con moño en
la puerta del castillo, el ayudante la trae. "Comprada" (1.89): el Conde abre la caja y saca la capa
nueva (forro rojo brillante); "tres" (2.87): etiqueta del pedido "PEDIDO 03:00 AM". "¡Excelente!"
(4.60): el Conde se pone la capa con un giro, brillitos, sonrisa con colmillitos.

**s14-cta (6.16 s, CTA).** Fondo de noche con luna y murciélagos. "Etiquetá" (0): una "@" gigante
amarilla que cae con contorno; "pijama" (1.13): un pijama a rayas colgado con un murciélago encima;
"tres" (1.91): reloj "3:00 AM". Debajo: "Etiquetalo." en Cinzel y logo de Scalerics (ya en el
index), la luna queda quieta. Sin listar productos.
