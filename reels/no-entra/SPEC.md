# Reel "No entra": spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Formato **motion persuasivo con metáfora visual de piezas geométricas**. Producto: **sistema a
medida** (stock, pedidos, proveedores, caja, varios locales). Gancho en el segundo 0: "Tu negocio no
entra en un software genérico." Una sola voz: Orus (Gemini, tono de colega, atempo 1.06). Locución
56.1 s; total 59.3 s. 160 palabras.

Historia: tu negocio es una PIEZA verde con forma propia: un cuerpo cuadrado y cuatro puntas, cada
una algo real de tu negocio (la yerba suelta por kilo, el precio especial del cliente de siempre,
los dos locales, el proveedor que te fía a 30 días). El software genérico es un MOLDE cuadrado gris.
Para que entre hay que apretar, y las puntas se cortan; cada punta cortada termina en otro lado
(una planilla aparte, de memoria, otro sistema, un cuaderno) y es trabajo a mano para el equipo.
Giro (el dueño queda bien parado): lo raro de tu negocio no es un defecto, es por qué te eligen
(un cliente llega por cada punta). Cierre: no recortes la pieza, hacé el molde a su medida; en
Scalerics armamos el sistema con la forma de tu negocio y la pieza entra entera. CTA para compartir:
"Mandáselo al colega que todavía recorta su negocio para que entre en el sistema."

## Recurso visual central: la pieza y el molde (manda sobre SPEC-base donde choque)
- La PIEZA (centro 0,0; cuerpo 280x280): contorno único `U` + 4 puntas con glifos chicos
  (kg · tag con $ · tabs 1 y 2 · gancho 30). Trazo verde `#5ce611` 6 px y relleno verde 0.13.
  En partes (cuerpo + puntas separables) para el corte (s06) y el rearmado (s09).
- El MOLDE GENÉRICO: marco cuadrado gris `#7c8698` (exterior 340, hueco 280) con relleno gris 0.2.
- El MOLDE A MEDIDA: placa crema con un hueco con la forma exacta de la pieza (s10-s12).
- **Color con significado**: verde = tu negocio y lo que encaja; gris `#7c8698` = lo genérico y lo
  recortado (las puntas se ponen grises cuando se cortan, y verdes cuando vuelven); crema = la voz
  de Scalerics y lo hecho a medida. Sin rojo.
- Paleta: navy de fondo (index), verde `#5ce611`, crema `#efeee5`, gris `#7c8698`, blanco solo en
  la marca del CTA. Lexend + IBM Plex Mono. Logo abajo (index).
- Las escenas se generaron con un script (partes comunes: pieza, molde, helpers); cada
  `compositions/sNN-*.html` es autocontenido.

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


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 59.34 (la voz termina en 56.14).

## Escenas (segundos relativos)

**s01-no-entra** (0–2.79) "Tu negocio no entra en un software genérico."
Cuadro 0: el molde gris (abajo, y 1115, escala 0.72) y la pieza verde (arriba, y 785) a medio
dibujar. La pieza baja y choca contra el marco en "no entra" (0.88): rebota torcida, el molde tiembla,
chispitas grises. En "genérico" (1.8) la pieza gira 90 grados y vuelve a intentar: tampoco.
Etiqueta "No entra" (0.88).

**s02-pieza** (2.79–5.90) "Esta pieza es tu negocio, con su forma."
La pieza grande al centro (y 930) se dibuja y se planta en "pieza" (0.21); "Tu negocio" adentro en
"negocio" (1.11); en "forma" (2.11) las cuatro puntas se encienden una tras otra.
Etiqueta "Tu negocio" (0.9) → "Con su forma" (2.0).

**s03-yerba-precio** (5.90–10.47) "Acá, la yerba suelta, por kilo. Acá, el precio especial del cliente de siempre."
Pieza al centro (y 905, 0.85). "yerba" 0.5: la punta redonda se resalta y aparece a la izquierda
"Yerba suelta" + "POR KILO" (1.2). "precio" 2.4: el tag de arriba se resalta y arriba "Precio
especial" + "CLIENTE DE SIEMPRE" (3.2). Sin etiqueta (los rótulos ocupan el lugar).

**s04-locales-proveedor** (10.47–15.14) "Acá, tus dos locales. Acá, el proveedor que te fía a treinta días."
Sigue igual: "dos" 0.5 los dos tabs y a la derecha "Dos locales" con dos casitas; "proveedor" 2.0 el
gancho de abajo y "Proveedor" + "TE FÍA A 30 DÍAS" (3.0). En 3.75 la pieza entera late con sus
cuatro rótulos encendidos.

**s05-molde** (15.14–17.50) "El software genérico es un molde cuadrado."
El marco gris se dibuja grande (y 940); "SOFTWARE GENÉRICO" debajo (0.46); adentro "TALLE ÚNICO"
(1.46) y escuadras en las esquinas en "cuadrado" (1.76). Etiqueta "Molde cuadrado".

**s06-apretar** (17.50–21.21) "Para que entre, hay que apretar. Y algo se corta."
La pieza al centro; el molde baja desde arriba más grande que ella; flechas grises de presión
(0.9). "apretar" 1.3: el molde se cierra justo al cuerpo, la pieza se aplasta. "algo" 2.1:
tiembla. "corta" 2.8: cuatro líneas de corte, las puntas saltan para afuera y se ponen grises.
Etiqueta "A presión" (1.3) → "Se corta" (2.8).

**s07-recortes** (21.21–29.89) "La yerba por kilo, a una planilla aparte. El precio especial, de memoria. El segundo local, en otro sistema. El proveedor, en un cuaderno."
El cuadrado verde chico en su marco al centro; cada punta gris viaja a un ícono gris en una esquina,
con un hilo: planilla (arriba izq., "PLANILLA APARTE" 1.19), cabeza (arriba der., "DE MEMORIA"
3.49), monitor (abajo izq., "OTRO SISTEMA" 5.39), cuaderno (abajo der., "CUADERNO" 7.39). Lo
anterior se apaga a 0.55; al final todo vuelve a 1. Etiqueta "Lo que no entra".

**s08-equipo** (29.89–33.14) "Cada punta que se corta es trabajo a mano para tu equipo."
Tarjeta "A MANO, CADA DÍA" con cuatro casilleros vacíos y la mini punta gris de cada uno (0.11);
en "trabajo" (1.31) se escriben las tareas: "Pasar la yerba al Excel", "Acordarse del precio",
"Cargar el otro local", "Anotar al proveedor". "equipo" 2.41: tres personas debajo.
Etiqueta "Trabajo a mano" → "Para tu equipo".

**s09-giro** (33.14–37.85) "Pero ojo: lo raro de tu negocio no es un defecto. Es por qué te eligen."
Las puntas grises vuelven a su lugar y se ponen verdes ("ojo"); "raro" 0.96 se encienden. "no es"
1.66: sello gris "DEFECTO" debajo, tachado en verde en "defecto" 2.46. "eligen" 3.91: un cliente
(persona crema) llega por cada punta con un hilo verde. Etiqueta "Ojo" → "No es un defecto" →
"Por esto te eligen".

**s10-medida** (37.85–41.16) "No recortes la pieza. Hacé el molde a su medida."
Línea de corte gris punteada alrededor del cuerpo, cancelada con el badge verde de "no" (0.75).
"Hacé" 1.53: un contorno crema copia la forma de la pieza; "medida" 2.25: cinta métrica verde
debajo con "A MEDIDA". Etiqueta "No recortes" → "A su medida".

**s11-sistema** (41.16–52.09) "En Scalerics armamos sistemas a medida: stock, pedidos, proveedores, caja y varios locales, con la forma de tu negocio. Y la pieza entra entera."
Placa crema con el hueco con forma de la pieza (0.1–1.2). Arriba, chips de módulos que entran en
su palabra (Stock 2.93, Pedidos 3.5, Proveedores 3.94, Caja 5.23, Varios locales 6.04). "forma"
7.24: el hueco se pone verde. "entra" 9.34: la pieza baja y encaja, onda verde, tilde verde en
"entera" 9.84. Etiqueta "Sistema a medida" → "Entra entera".

**s12-cta** (52.09–59.34) "Mandáselo al colega que todavía recorta su negocio para que entre en el sistema."
"Scalerics" blanco + "Sistemas a medida para pymes"; la pieza encajada en su placa; un avión de
papel de líneas sale hacia la derecha; píldora crema "Mandáselo a ese colega". Sin salida.
