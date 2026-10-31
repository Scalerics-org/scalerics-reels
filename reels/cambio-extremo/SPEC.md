# Reel "Cambio extremo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende la TIENDA ONLINE.
Formato P: REALITY DE TRANSFORMACIÓN de la tele (inventado: "Cambio Radical, edición comercio";
ningún programa real). La CONDUCTORA (Vicky, eufórica, blazer turquesa y casco blanco, micrófono)
abre mirando a cámara: "Tu local necesita un cambio extremo. Y no, no es pintar la fachada."
Presenta a MÓNICA, de Regalos Mónica (canosa, lentes, saco naranja), que llega emocionada:
"¿Me van a pintar la vidriera?". EL ANTES: el CAPATAZ (el Tano: casco amarillo, chaleco naranja
con bandas, bigote, planilla) da el diagnóstico como si fuera una falla estructural: vende solo
por Instagram con «consultá por privado» abajo de cada foto, los pedidos en un cuaderno, «pasame
la seña por transferencia», y cuando cierra baja la persiana y vende cero. Mónica: "Bueno, pero
con una vidriera nueva...". GIRO: "El cambio no es en el local: es que tu local abra de noche...
sin abrir la puerta." "¿Lista?" y todo el equipo a coro: "¡Mové ese camión!" (frase genérica del
género). El camión se corre y aparece EL DESPUÉS: su tienda online en el celular (pantalla
partida ANTES / DESPUÉS). Mónica llora: "¡Es mi tienda... en el celular!". Precios a la vista,
Mercado Pago, envíos por DAC, Correo o PedidosYa. "¡Me entró un pedido! ¡A las dos de la mañana!
¡Ya pago y con envío! ¡Y yo durmiendo!" Remate del capataz: "La fachada te la pintamos igual,
eh." Narrador Scalerics (Orus): "Tu tienda online la hacemos en Scalerics: vende sola, aunque
tengas la persiana baja. Nominá a un local que necesita un cambio extremo: etiquetalo en los
comentarios."
Voces (partes/voces.sh, partes/componer.mjs): conductora Zephyr, Mónica Gacrux, capataz Alnilam,
coro Zephyr + Alnilam, narrador Orus. Voz de 73.3 s, reel de 76.53 s.

## Recurso visual central
El SET DE UN REALITY DE REFORMAS: galpón oscuro con foco turquesa y piso naranja de obra (fondo de
`armar.mjs`), CINTAS DE PELIGRO amarillo/negro arriba y abajo, la barra del programa (logo
"CAMBIO RADICAL · EDICIÓN COMERCIO" y el estado "ANTES" que pasa a "DESPUÉS" en la revelación) y
el ZÓCALO del reality con quién habla (todo eso en `compositions/ambiente.html`). Los momentos
fuertes: sellos ANTES (naranja) y DESPUÉS (turquesa) que caen torcidos, el diagnóstico con cinta
de "PELIGRO" cruzada encima de cada falla, el CAMIÓN gigante del programa que se corre y deja ver
la tienda online en el celular, la PANTALLA PARTIDA antes/después, lágrimas de Mónica y CONFETI.
Edición CARGADA: palabras gigantes que caen en su palabra, sacudones, nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Carbón `#16191d`: contornos (6 px), pelo de la conductora, pantallas, fondos de carteles.
- Blanco `#fbfaf5`: piel, textos, casco de la conductora, papeles.
- Turquesa `#14c4b8`: el programa, la conductora, el DESPUÉS, la tienda online.
- Naranja obra `#ff7a1a`: el ANTES, Mónica, el chaleco del capataz, el camión.
- Amarillo cinta `#ffd21f`: cintas de peligro, casco del capataz, alertas, confeti.
- Verde Scalerics `#5ce611`: SOLO desde s15 (entra Scalerics) y los "pago aprobado" de la tienda.
Acento de subtítulos por quién habla (`reel.voces` en `armar.mjs`): conductora turquesa, Mónica
naranja, capataz y coro amarillo, Scalerics verde.
Rellenos planos con contorno carbón, sombras duras desplazadas (no difusas) en los textos
gigantes. Prohibido: emojis, fotos, rayas largas (—), logos o nombres de programas reales, caras
de famosos. Instagram, Mercado Pago, DAC, Correo y PedidosYa solo como TEXTO (nada de logos).

## Tipos de letra
Lexend 800-900 mayúsculas para lo grande; IBM Plex Mono 600 para cartelas, horas y el zócalo
chico. Nada que haya que leer de menos de 26 px.

## Zona
Barra del programa arriba (y 70-150) y cintas de peligro en los bordes (ambiente). Subtítulos en
y 236 a ~420. Contenido de escena entre y 540 y 1540. Zócalo del reality en y 1566-1690 (ambiente).
Logo de Scalerics en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo, colores de subtítulos por voz, cortina `assets/bgm/bed.mp3` en loop).
- `compositions/ambiente.html` (escrita a mano): cintas, barra, ANTES→DESPUÉS en 47.08, zócalo
  por parlamento, confeti en la revelación (47.1) y en el pedido (57.7), flash en el camión.
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: conductora, monica,
  capataz, camion, celular). `cd partes/escenas && python3 sNN.py` escribe la escena y su
  `.sfx.json`; después `node armar.mjs`.

## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-gancho (0 a 4.60) · el gancho
Cuadro 0 ya armado: la fachada de un local (toldo naranja a rayas, vidriera, puerta) a media luz,
con una cinta de peligro cruzada. "cambio" 1.40: cae gigante "CAMBIO EXTREMO" (blanco, sombra
naranja dura), sacudón; la conductora entra desde la derecha con el micrófono. "no" 2.50: un
rodillo de pintura blanco gigante aparece sobre la fachada; "pintar" 3.08 pinta una franja;
"fachada" 3.58: X naranja tachando el rodillo, sacudón.

### s02-programa (0 a 6.64) · el programa
"Bienvenidos" 0: la conductora al centro con los brazos arriba, destellos. "Cambio" 1.12: logo
del programa gigante (placa turquesa "CAMBIO RADICAL", cinta amarilla "EDICIÓN COMERCIO" en
"edición" 2.16). "Mónica" 4.26: el logo sube y se va; entra el local de Mónica con el cartel
"REGALOS MÓNICA" (pop en "Regalos" 5.00) y Mónica asomada que saluda.

### s03-monica (0 a 4.10) · Mónica emocionada
Mónica grande al centro, aplaudiendo con las manos en "emoción" 0.57 (corazones-estrella
amarillos). "pintar" 2.46: globo de pensamiento con un rodillo y una lata de pintura; "vidriera"
2.91: la vidriera con brillitos dentro del globo.

### s04-antes (0 a 3.42) · el antes
"antes" 0.66: SELLO "ANTES" naranja gigante, torcido, que cae con golpe. "Equipo" 1.55: entra el
capataz con la planilla y otros dos cascos (siluetas) atrás. "encontraron" 2.25: la planilla se
levanta.

### s05-instagram (0 a 5.36) · diagnóstico 1
"Grave" 0: cartela "DIAGNÓSTICO" con alerta amarilla parpadeante. "Instagram" 1.65: un celular
con un perfil (cuadritos de fotos, sin logos). "foto" 2.96: zoom a una foto; "consultá" 3.85: el
comentario «consultá por privado» se repite debajo de cada foto (pop en cadena); "privado" 4.35:
cinta de peligro cruzada sobre el celular, sacudón.

### s06-cuaderno (0 a 4.16) · diagnóstico 2
"cuaderno" 0.68: un cuaderno abierto con pedidos garabateados y tachados (pop con sacudón).
"pasame" 2.37: globo de chat «pasame la seña por transferencia» y un comprobante borroso;
"transferencia" 3.08: sello "FALLA ESTRUCTURAL" amarillo cruzado.

### s07-persiana (0 a 4.36) · cierra
Conductora preocupada "cierra" 0.38. "persiana" 1.49: la persiana metálica baja de golpe sobre el
local (con candado), luna. "cero" 2.97: contador "VENTAS: 0" gigante naranja que cae y titila.

### s08-vidriera (0 a 2.32) · la idea de Mónica
Mónica tímida, con un dedo arriba, y una vidriera nueva con moño que aparece en "vidriera" 0.81
(brillitos); en "nueva" 1.27 un rodillo de pintura cae del cielo a su lado.

### s09-giro (0 a 7.77) · el giro
"divina" 1.49: la vidriera con un corazón turquesa. "cambio" 2.74: cartel gigante "EL CAMBIO NO
ES EN EL LOCAL"; en "local" 3.58 la fachada se achica y queda tachada. "abra" 5.30: se hace de
noche (luna, estrellas) y el local tiene la persiana baja; "noche" 5.66: del local sale un
celular brillante turquesa. "sin abrir la puerta" 6.41-7.08: candado en la puerta, el celular se
prende con "ABIERTO 24 H".

### s10-camion (0 a 4.35) · ¡Mové ese camión!
"Lista" 0: Mónica de espaldas, tapándose la boca, ante el CAMIÓN gigante del programa (cabina
turquesa, caja naranja "CAMBIO RADICAL"). "Mové" 1.02: texto gigante "¡MOVÉ ESE CAMIÓN!" en tres
golpes; "camión" 1.62: el camión arranca y se va a la derecha (humo, sacudón). Detrás aparece
un celular gigante tapado con una lona... que cae al final (destello).

### s11-despues (0 a 4.53) · la revelación
Pantalla partida: a la izquierda ANTES (naranja: cuaderno, persiana); a la derecha DESPUÉS
(turquesa: el celular con su tienda). Mónica llora a mares (lágrimas turquesa) en "creer" 0.63.
"tienda" 2.07: el celular crece al centro; "celular" 3.22: se ve completo con "REGALOS MÓNICA ·
TIENDA ONLINE".

### s12-tienda (0 a 4.49) · la tienda
El celular grande con la tienda: tarjetas de productos con precio grande (en "vista" 0.45),
botón "PAGAR CON MERCADO PAGO" (en "Mercado" 0.96), y chips de envío "DAC" 2.29, "CORREO" 2.77,
"PEDIDOSYA" 3.37 que caen al costado.

### s13-pedido (0 a 5.35) · el primer pedido
Noche: reloj "2:00" gigante en "dos" 1.32; notificación "NUEVO PEDIDO" en "pedido" 0.32;
"pago" 2.50: badge "PAGO APROBADO" verde; "envío" 3.05: etiqueta de envío; "durmiendo" 3.95:
Mónica dormida con antifaz y Zzz, confeti.

### s14-fachada (0 a 2.14) · el remate
El capataz, con un rodillo, pinta una franja en "pintamos" 0.61 y guiña en "eh" 1.25.

### s15-scalerics (0 a 5.44) · entra Scalerics
Se apaga el set (ambiente). El celular con la tienda al centro, con brillo verde; "Scalerics"
1.61: logo-palabra SCALERICS. "vende sola" 2.57: carrito que se llena solo; "persiana baja"
4.20: chiquita, la persiana baja con luna y el celular sigue vendiendo.

### s16-cta (0 a 7.50) · cierre
"Nominá" 0: sobre gigante tipo nominación "NOMINÁ UN LOCAL" (turquesa/amarillo).
"cambio extremo" 1.70: casco amarillo que cae sobre la palabra. "etiquetalo" 2.84: gran "@"
y un globo de comentario con "@tu_local_favorito" escribiéndose. Queda quieto hasta el final
con el casco que rebota suave.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el set de reality de reformas con
> la paleta de arriba y rellenos planos. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

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

