# Reel "El que más gasta" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo: bots de WhatsApp,
Scalerics Puntos, tiendas online y sitios web para comercios). Le dice al dueño una verdad
incómoda: "el cliente que más gasta en tu local ni sabe que lo valorás". Viene todas las semanas,
deja más que nadie y recibe lo mismo que el que entró una vez. No es que no te importe: es que no
sabés quién es. En el avión el que más viaja sube primero; en tu local hace la misma fila. Con
Scalerics Puntos el que más viene más suma, canjea premios, y vos lo ves con nombre y apellido.
Producto: Scalerics Puntos. CTA: Comentá PREMIO. Locución de 58 s (Orus).

Recurso central: **el cliente de siempre**, una figurita de línea igual a todas (cabeza círculo +
cuerpo de palitos, como las de `../el-de-enfrente/compositions/s01-te-roba.html`, escalada ~1.3)
con una bolsa de compras. Mientras el reel dice que nadie lo reconoce, es crema como todos, sin
nada verde. Cuando entra Scalerics Puntos, recién ahí recibe el verde: su estrella (una estrella
de 5 puntas verde chica sobre el pecho o arriba de la cabeza). En s05 la estrella verde la tiene
el pasajero del avión (él sí es reconocido) y NO la tiene tu cliente en la fila. En s11 por fin
se la ganan.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-ni-sabe.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define la figurita del cliente, el mostrador y la
  bolsa: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 61.25 (la voz termina en
58.05).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-ni-sabe** (4.14 s) — "El cliente que más gasta en tu local ni sabe que lo valorás." Un
mostrador de local (caja registradora chica) a la derecha y el cliente de siempre a la izquierda,
con su bolsa; arrancan medio dibujados (cuadro 0 no negro). En "más gasta" (0.90–1.10) de la
caja salen tres tickets/billetes con "$" que se apilan arriba del cliente, con el último en
verde. En "ni sabe" (2.36–2.50) un "?" crema aparece sobre la cabeza del cliente. En "valorás"
(3.20) un corazón de línea crema 0.4 se dibuja sobre el mostrador y una línea punteada va del
corazón al cliente pero se corta a la mitad. Etiquetas: "EL QUE MÁS GASTA" → "NI SE ENTERA".

**s02-viene** (5.36 s) — "Viene todas las semanas, deja más que nadie, y recibe lo mismo que el
que entró una vez y no volvió." Arriba una fila de 4 casilleros de calendario (SEM 1..4) que se
tildan en verde uno tras otro entre "todas" (0.26) y "semanas" (1.07). En "deja más que nadie"
(1.47–2.06) aparecen 4 barras: la del cliente alta y verde, otras tres bajitas crema. En "recibe
lo mismo" (2.86–3.36) las barras se van, a la derecha aparece otro cliente (sin bolsa) y los
dos reciben una bolsa/ticket idéntico "GRACIAS"; un "=" verde entre los dos en "mismo" (3.36).
En "no volvió" (4.87–5.06) el de la derecha se va caminando y se apaga. Etiquetas: "TODAS LAS
SEMANAS" → "RECIBE LO MISMO".

**s03-no-es** (7.15 s) — "No es que no te importe. Ni que seas amarrete. Ni que no tengas con
qué. Es que no sabés quién es." Tres íconos en fila, cada uno con badge X verde al aparecer: un
corazón (importe 1.20), una billetera cerrada con candadito (amarrete 2.60), una caja
registradora con "$" (qué 4.50), con rótulos mono chicos debajo (IMPORTA / AMARRETE / PLATA).
En "Es que" (5.11) los íconos se van y aparece grande la silueta del cliente con un "?" verde en
la cara (quién 6.10). Etiquetas: "NADA DE ESO" (4.6) → "¿QUIÉN ES?" (6.1).

**s04-de-siempre** (6.14 s) — "Lo tenés de vista. Le decís: ¿lo de siempre? Pero no sabés
cuánto te compró este año." Un ojo (como el de `../el-de-enfrente/compositions/s01-te-roba.html`)
arriba que mira al cliente (vista 0.45). En "decís" (1.25) desde el mostrador sale una burbuja de
diálogo crema "¿Lo de siempre?" (Lexend 600) y aparece una tacita. En "Pero no sabés cuánto"
(3.29–3.85) todo se corre y aparece una ficha/libreta "ESTE AÑO" con el total "$ ? ? ?" donde
cada "?" cae en su lugar (cuánto 3.85, compró 4.55) y el último "?" en verde (año 5.05).
Etiquetas: "LO TENÉS DE VISTA" → "¿CUÁNTO TE COMPRÓ?".

**s05-fila** (7.03 s) — "En un avión, el que más viaja sube primero. En tu local, el que más
compra hace la misma fila que todos." Arriba un avioncito de línea (avión 0.21). Debajo una
puerta de embarque con cartel "PRIORIDAD" y una fila de figuritas; en "sube primero" (1.81–2.21)
la que tiene la estrella verde se adelanta y pasa primera. En "En tu local" (3.21–3.41) el avión
y la puerta se van y aparece tu mostrador a la derecha con una fila de 5 figuritas crema iguales.
En "el que más compra" (4.31–4.41) se marca una (la 4.ª) con un círculo punteado crema que
aparece... y en "misma fila" (5.41–5.71) se apaga: queda igual a todos; en "todos" (6.11) las
5 dan un pasito juntas. Etiquetas: "PRIMERO EN SUBIR" → "LA MISMA FILA".

**s06-otro-lado** (4.22 s) — "Y el que nunca recibe nada distinto, un día prueba en otro lado."
Tu local a la izquierda (apagado, crema 0.4) y el cliente de siempre al lado. En "nada distinto"
(0.98–1.28) aparece un regalo de línea punteada vacío con badge X. En "un día" (2.18–2.28) un
calendario chico pasa de hoja. En "prueba en otro lado" (2.85–3.28) a la derecha se dibuja otro
local con ventanas verdes y el cliente camina hacia allá. Etiquetas: "NADA DISTINTO" → "PRUEBA EN
OTRO LADO".

**s07-sistema** (3.19 s) — "Agradecer no es caro. Es tener un sistema." Una etiqueta de precio
con "$" (agradecer 0) que en "caro" (1.06) recibe el badge X y se va girando; en "sistema"
(2.26) se dibuja el engranaje (geometría de `../puntos-que-vuelven/compositions/s07-sistema.html`)
que gira con punch, el centro verde. Etiquetas: "NO ES CARO" → "ES UN SISTEMA".

**s08-puntos** (5.75 s) — "Por eso hicimos Scalerics Puntos. Cada compra suma, y el que más
viene, más suma." Caja redondeada con "Scalerics" (Lexend 700, ~70px) en "Scalerics" (0.87) y
debajo "PUNTOS" mono verde en "Puntos" (1.91). En "Cada compra suma" (2.83–3.37) la caja sube a
y≈650 y abajo dos figuritas: cada una con una pila de monedas verdes; en "suma" (3.37) cae una
moneda "+10" en cada pila. En "el que más viene" (4.27–4.37) la izquierda es el cliente de
siempre; en "más suma" (4.77–4.97) su pila crece alta (6 monedas) y la otra queda con 1.
Etiquetas: "CADA COMPRA SUMA" → "MÁS VIENE, MÁS SUMA".

**s09-tarjeta** (3.22 s) — "Lleva su tarjeta en el celular y canjea premios que elegís vos."
Un celular (como `../descuentos/compositions/s10-como-anda.html`) con la app "Scalerics Puntos":
nombre "Marcos", "TUS PUNTOS 1.240", y una tarjeta de premio "Café gratis · 300 PTS" con botón
CANJEAR. Se dibuja en "tarjeta" (0.32); en "canjea" (1.82) el botón se llena de verde y el saldo
baja a 940; en "elegís vos" (2.82) aparece al lado una notita "VOS ELEGÍS EL PREMIO". Etiqueta
"EN SU CELULAR" → "CANJEA PREMIOS".

**s10-panel** (6.40 s) — "Y vos ves, con nombre y apellido, quiénes son tus mejores clientes y
cada cuánto vienen." Una tablet apaisada (como `../puntos-que-vuelven/compositions/s10-panel.html`)
"Tus clientes". En "vos ves" (0.80–1.10) se dibuja; en "nombre y apellido" (1.80–2.30) entran 4
filas con avatar de iniciales y nombre completo (Marcos Silva, Lucía Méndez, Diego Acosta, Sofía
Pérez). En "mejores clientes" (3.80–4.30) la fila de Marcos sube primero, se marca en verde y
le aparece la estrella verde. En "cada cuánto vienen" (5.41–6.00) aparece a la derecha de cada
fila "cada 6 días", "cada 9 días", etc. Etiquetas: "CON NOMBRE Y APELLIDO" → "TUS MEJORES
CLIENTES".

**s11-el-mejor** (3.26 s) — "Que tu mejor cliente se entere de que es el mejor." El cliente de
siempre grande al centro. En "se entere" (1.70) le aparece una burbuja/notificación arriba "Sos
de nuestros mejores clientes" y en "mejor" (2.50) la estrella verde le aparece en el pecho con
punch y rayitas verdes alrededor. Etiqueta "QUE SE ENTERE".

**s12-cta** (5.39 s) — "Comentá PREMIO y te contamos cómo." (la voz termina en 1.44). Como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Puntos para los que
vuelven" (Lexend 500 34px, crema 0.7) y la píldora crema con texto navy: Comentá "PREMIO". Sin
salida con blur.
