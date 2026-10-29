# Reel "¿Quién mató a la venta?": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: **TIENDA ONLINE**
(vende sola a cualquier hora, cobra con Mercado Pago, despacha por DAC, Correo o PedidosYa).
Formato: **DOCUMENTAL DE CRÍMENES (true crime)**. Un narrador grave y serio (Algenib) presenta el
caso con total solemnidad: "Martes, veintitrés cuarenta. Una venta murió en un comercio de
Montevideo. Nadie la vio morir." La víctima es una VENTA (joven, con la tarjeta en la mano). La
testigo, una clienta (Leda), da su testimonio a cámara: quería comprar una campera a las once y
pico. Cuatro SOSPECHOSOS con ficha y foto de frente con número: el cuaderno de pedidos (visto por
última vez debajo de la caja, sin coartada), el "consultá precio por privado" (nunca respondió),
el "mandame el comprobante" (tiene antecedentes) y el "pasá el lunes" (el lunes la venta ya
estaba enterrada). La testigo compró en otro lado. GIRO: "las huellas no mienten, como en CSI: la
puerta estaba cerrada y la llave la tenía el dueño". El dueño (Charon), en pijama: "¿Yo? ¡Si yo
estaba durmiendo!". Veredicto: "Inocente de atender mal. Culpable de no tener puerta en
internet." Entra Scalerics (Orus) con la tienda online y el cierre: "¿Y vos, quién creés que fue?
Dejá tu sospechoso en los comentarios." Voz de 69.5 s, cuatro voces.

## ESTILO: DOCUMENTAL DE CRÍMENES. Edición CARGADA.
Todo se ve como la sala de investigación de un true crime: **expedientes de cartón ocre** con
solapa y clip, **fotos de frente de sospechosos** (fondo con rayas de altura y cartel con número
"SOSPECHOSO 01"), **pizarra de corcho** con fotos clavadas y **hilos rojos** que se tensan,
**cinta policial amarilla** ("ESCENA DEL CRIMEN · NO PASAR") que cruza en diagonal, **sellos**
rojos que caen ("CASO ABIERTO", "SIN COARTADA", "CULPABLE", "CASO RESUELTO"), **rótulos de
máquina de escribir** que se tipean letra por letra (fecha, hora, lugar), silueta de tiza,
lupa con huella digital, luces de patrullero (rojo/azul) en los momentos fuertes, flashes de
cámara forense. Los "objetos" sospechosos son dibujos genéricos propios con dos ojitos (el
cuaderno, un globo de chat, un comprobante de papel, una hoja de calendario): así es gracioso.
Nada quieto más de ~0.8 s: zooms lentos de cámara, golpes en la palabra, tiembles.

Mirá `compositions/s01-escena.html`: ES LA ESCENA MODELO. Copiá su estructura (SVG a pantalla
completa + textos HTML absolutos, `.sNN-escenario` que tiembla, `gsap.set(...opacity 0)` +
`fromTo` con `immediateRender:false`, el tipeo de máquina de escribir con spans `.letra`, la
cinta policial, el sello, la salida de 0.2 s).

## Paleta (SOLO estos colores)
- Negro azulado `#070b12` / `#0d1520`: fondo (ya está) y rellenos de fotos, siluetas.
- Blanco papel `#f1ece0`: líneas de dibujo, papeles, textos grandes.
- Amarillo cinta `#ffd23f`: cinta policial, números de sospechoso, lo que hay que mirar.
- Rojo hilo `#e0313b`: hilos, sellos, círculos de marcador, X.
- Ocre expediente `#c9a26b` (y su oscuro `#8a6a3e` para sombras de cartón): carpetas, corcho,
  cartón, rótulos de máquina de escribir sobre fondo oscuro.
- Desde s12 (Scalerics): se suma verde `#5ce611` para la tienda online (lo que salva a la venta).
Luces de patrullero: rojo hilo y azul `#3d7bff` SOLO en ambiente.html. Brillos (text-shadow /
drop-shadow) del mismo color, 1-2 por escena. Prohibido: emojis, fotos, logos (ni de CSI ni de
Mercado Pago, DAC, Correo o PedidosYa: solo los nombres en texto), rayas largas (—) en textos.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 (o 600) para la "máquina de escribir": rótulos,
horas, fichas, carteles de sospechoso. Nada que haya que leer de menos de 26px (lo decorativo
chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420): las escenas NO escriben la frase narrada entera. Contenido entre
y 560 y y 1520, x 50-1030 (medí las palabras gigantes). Abajo a la derecha (y 1600) ambiente.html
pone el rótulo "EXP. N° 2340 · CASO ABIERTO": no lo tapes. Logo en y ~1746.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo negro azulado con luz de lámpara cálida al centro.
- `compositions/ambiente.html`: grano de película, viñeta, líneas de escaneo, rótulo "EXP. N°
  2340 · CASO ABIERTO" (pasa a "CASO RESUELTO" en 51.03), LUCES DE PATRULLERO rojo/azul en
  0.0-1.6 y 47.3-48.5, FLASH de cámara en 2.30, 21.76, 47.32 y 51.03 (globales). Si cae uno en
  tu escena, que tu golpe coincida.
- `compositions/subtitulos.html`, `compositions/s01-escena.html`.

## Sonidos extra disponibles
Además de la lista de abajo: `drama` (dun dun dunnn, 3 s: a lo sumo 2 en todo el reel, con
"max"), `flash` (disparo de cámara), `sirena` (2 s, suave), `beep`, `impact-bass-2`, `glitch-2`,
`glitch-3`, `whoosh-cinematic`, `typing` y `key-press` (máquina de escribir).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el documental de crímenes con la
> paleta de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el
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



## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Tiempos por palabra en
`tiempos.md` (salen de Speech-to-Text y pueden correrse ~0.2 s).

**s01-escena** (5.76 s, hecha). "Martes, veintitrés cuarenta. Una venta murió en un comercio de Montevideo. Nadie la vio morir."
- 0.0 la fachada de un comercio de líneas papel (toldo, vidriera, puerta) ya a medio dibujar.
- 0.23-1.2 rótulo de máquina de escribir que se tipea: "MARTES · 23:40" (mono ocre, grande).
- 2.3 ("murió") la CINTA POLICIAL amarilla cruza en diagonal "ESCENA DEL CRIMEN · NO PASAR"
  con flash y sacudón; en el piso, una silueta de tiza con forma de bolsa de compras.
- 3.7 "MONTEVIDEO" se tipea abajo de la hora.
- 4.2-5.2 ("nadie la vio morir") la luz de la vidriera se apaga; un ojo tachado en rojo y
  "0 TESTIGOS" en mono.

**s02-victima** (3.67 s). "La víctima: una venta joven, con la tarjeta en la mano."
- 0.14 cae un EXPEDIENTE ocre abierto, con foto pegada con clip de la víctima: una bolsa de
  compras de líneas con dos ojitos y un ticket; sello rojo "VÍCTIMA".
- 1.34 ("joven") ficha que se tipea: "EDAD: 4 MINUTOS".
- 2.14 ("tarjeta") una mano de líneas con una tarjeta de crédito genérica (rectángulo, chip,
  números en puntos) entra a la foto; rótulo "TENÍA CON QUÉ PAGAR".

**s03-testigo** (6.63 s). TESTIMONIO de la clienta (Leda). "Yo quería comprar, eh. Eran las once y pico y quería esa campera. Ya."
- Encuadre de entrevista de documental: silueta de una mujer sentada (relleno oscuro, contorno
  papel, luz de recorte ocre), una silla, un foco de luz. Zócalo de entrevista abajo a la
  izquierda: "VALENTINA · 28 · TESTIGO" (barra amarilla + texto). Puntito rojo "REC".
- 0.5 ("comprar") la silueta gesticula (brazo que sube).
- 2.5 ("once") un reloj de pared que corre a 23:1x; "23:12" tipeado.
- 5.25 ("campera") una campera de líneas en un recuadro de foto con precio en etiqueta.
- 5.71 "YA." gigante amarillo con sacudón.

**s04-cuaderno** (6.40 s). "Sospechoso uno: el cuaderno de pedidos. Visto por última vez debajo de la caja. Sin coartada."
- 0.0 FOTO DE FRENTE: pared con rayas de altura (líneas finas papel con números 150, 160, 170...)
  y el CUADERNO de pedidos (espiral, tachones, dos ojitos culpables) sosteniendo el cartel negro
  "SOSPECHOSO 01" (amarillo). Flash.
- 1.5 ("cuaderno") ficha "ALIAS: EL CUADERNO".
- 3.06-4.8 recuadro "ÚLTIMA VEZ VISTO": la caja registradora de líneas y el cuaderno asomando
  abajo, círculo rojo de marcador que se dibuja.
- 5.7 ("coartada") sello rojo "SIN COARTADA" con golpe (flash global 21.76).

**s05-privado** (5.90 s). "Sospechoso dos: el 'consultá precio por privado'. Ella consultó. El privado nunca respondió."
- 0.0 foto de frente "SOSPECHOSO 02": un globo de comentario con ojitos y la frase
  "CONSULTÁ PRECIO POR PRIVADO" en su cartel.
- 3.72-3.9 ("ella consultó") un celular chico con burbuja enviada "¿Precio?" a las 23:14.
- 4.6-5.4 ("nunca respondió") se tipean puntos suspensivos que se apagan; reloj que avanza
  rápido 23:14 → 23:52; rótulo "0 RESPUESTAS" rojo.

**s06-comprobante** (4.30 s). "Sospechoso tres: el 'mandame el comprobante'. Tiene antecedentes."
- 0.0 foto de frente "SOSPECHOSO 03": un comprobante de papel largo (borde dentado, renglones)
  con ojitos y cartel "MANDAME EL COMPROBANTE".
- 2.6-3.5 ("tiene antecedentes") cae una PILA de expedientes ocres; el de arriba se abre y es una
  lista tipeada de "VENTA PERDIDA" ×5 con fechas; sello rojo "REINCIDENTE".

**s07-lunes** (6.20 s). "Sospechoso cuatro: el 'pasá el lunes'. El lunes, la venta ya estaba enterrada."
- 0.0 foto de frente "SOSPECHOSO 04": hoja de calendario "LUNES" con ojitos y cartel "PASÁ EL LUNES".
- 2.8 ("el lunes") las hojas del calendario se arrancan (mar, mié, jue, vie, sáb, dom).
- 4.9 ("enterrada") una LÁPIDA de líneas sube del piso: "AQUÍ YACE / UNA VENTA / MARTES 23:40";
  una florcita; la escena se pone solemne (todo un poco más oscuro). Sonido drama.

**s08-otro-lado** (3.23 s). Testigo otra vez. "Al final compré en otro lado. Me llegó el jueves."
- La silueta de Valentina (como s03) chica a la izquierda; a la derecha entra deslizando una caja
  de envío con etiqueta "OTRA TIENDA" y en 2.0 ("jueves") un sello "ENTREGADO · JUEVES".
- Rótulo "LA VENTA SE FUE CON OTRO".

**s09-huellas** (6.37 s). EL GIRO. "Pero las huellas no mienten, como en CSI. La puerta estaba cerrada. Y la llave la tenía el dueño."
- 0.0 PIZARRA DE CORCHO (ocre) con las 4 fotos de sospechosos clavadas con chinches rojas y
  hilos rojos que se tensan entre ellas.
- 0.33 ("huellas") una LUPA grande que pasa y agranda una huella digital (espiral de líneas);
  rótulo chico "COMO EN CSI".
- 2.63-3.23 ("la puerta estaba cerrada") en el centro, la foto de una puerta con cartel "CERRADO"
  y candado.
- 4.13 ("llave") una llave; 5.23 ("dueño") todos los hilos rojos convergen en una foto nueva con
  "?" que se da vuelta: "EL DUEÑO" (silueta con gorro de dormir). Flash + patrullero (47.32 global).

**s10-dueno** (2.57 s). Habla el dueño (Charon). "¿Yo? ¡Si yo estaba durmiendo!"
- El dueño de líneas en pijama a rayas con gorro de dormir y almohada bajo el brazo, ojos de
  recién despertado, cejas de indignado. "¿YO?" gigante papel que cae en 0.0; en 0.96
  ("durmiendo") "Zzz" que flotan y "ESTABA DURMIENDO" en mono. Tiembla de indignación.

**s11-veredicto** (5.82 s). "Caso resuelto. Inocente de atender mal. Culpable de no tener puerta en internet."
- 0.0 sello gigante "CASO RESUELTO" que cae sobre el expediente (flash 51.03 global).
- 1.19 ("inocente") renglón tipeado "ATENDER MAL: INOCENTE" con un tilde papel.
- 2.59 ("culpable") renglón "PUERTA EN INTERNET: CULPABLE" en rojo; en 3.89 ("puerta") una
  ventana de navegador de líneas con una puerta cerrada adentro y un candado; sello "CULPABLE".

**s12-tienda** (8.10 s). ENTRA SCALERICS (verde). "En Scalerics te hacemos la tienda online: vende sola a cualquier hora, cobra con Mercado Pago y despacha por DAC, Correo o PedidosYa."
- 0.0 la ventana de navegador de s11: la puerta se ABRE (verde, con luz). Rótulo "TIENDA ONLINE".
- 1.6-2.9 se arma la tienda: grilla de productos, la campera con botón "COMPRAR" verde.
- 2.9 ("sola") + 3.6 ("cualquier hora") un reloj "23:40" y una notificación "VENTA NUEVA" que
  entra sola.
- 4.8 ("Mercado Pago") chip "PAGO APROBADO" con tilde verde (solo texto, sin logo).
- 6.2-7.5 tres etiquetas de envío que caen: "DAC", "CORREO", "PEDIDOSYA" (solo texto).
- Al final la víctima (la bolsa de s02) aparece viva y feliz con tilde verde: "LA VENTA VIVE".

**s13-cta** (7.75 s). "¿Y vos, quién creés que fue? Dejá tu sospechoso en los comentarios."
- La pizarra de corcho con las 5 fotos (los 4 sospechosos + el dueño) numeradas 1 a 5 y hilos
  rojos; en 1.8 ("fue") "¿QUIÉN FUE?" gigante papel con "FUE" amarillo; en 2.6 ("sospechoso")
  un globo de comentario grande "DEJÁ TU SOSPECHOSO" con un cursor que tipea "el 4"; chinche
  que late. Sello "CASO ABIERTO" que vuelve a caer, torcido, con humor.
- Es la última escena: SIN salida, todo late suave hasta el final.
