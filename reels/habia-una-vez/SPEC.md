# Había una vez · Tienda online · cuento infantil (Caperucita) en libro ilustrado

**De qué trata.** "Había una vez un comercio que no vendía por internet. Y no vivió feliz para
siempre." Una CUENTACUENTOS (abuela dulce y filosa, Gacrux) lee una versión propia de Caperucita
Roja (cuento de dominio público, personajes dibujados genéricos). Un domingo a la noche Caperucita
(Leda) quiere comprarle a TU LOCAL una canasta para su abuelita: "¿Cuánto sale la canasta?"
"Precio por privado." (Charon, desganado). Escribe por privado y espera, y espera. "¡Al fin! ¿Cómo
te pago?" "Transferime y mandame el comprobante." "¿Me la mandás?" "Pasá a buscarla el lunes." Y
hasta el lunes, el bosque era muy largo. Ahí aparece el lobo: EL DE ENFRENTE (Fenrir, canchero,
con delantal de comerciante). GIRO con el diálogo clásico del cuento: "Lobo, ¡qué tienda online
tan grande tenés!" "¡Es para venderte mejor!" "¡Y qué precios tan a la vista!" "¡Es para que no
tengas que preguntar!" "¡Y qué camioneta tan grande!" "¡Es para llevártela mañana a lo de tu
abuela!" El lobo se queda con Caperucita. Y con la abuela. Moraleja: el lobo no era malo, era el
único que le vendió. Y vos tenías la mejor canasta del bosque: te faltó el camino. Entra Orus:
"En Scalerics hacemos ese camino: tu tienda online...". Cierre de la cuentacuentos: "Colorín
colorado: mandale este cuento al que todavía vende por privado."

**Formato:** D (cuento / historia de un cliente con nombre) en forma de cuento infantil narrado,
cinco voces (cuentacuentos, Caperucita, tu local, el lobo, Orus al final).
**Recurso visual central:** EL LIBRO DE CUENTOS. Toda la pantalla es una página de papel crema
con borde doble, firuletes rojos en las esquinas, lomo sombreado a la izquierda, cantos de hojas a
la derecha, cabecera "CAPERUCITA Y TU COMERCIO" y número de página abajo (cambia con cada escena).
En cada corte de escena PASA LA PÁGINA (una hoja que entra desde el canto y se va hacia el lomo).
Cada escena es una ilustración de tinta que se dibuja y se colorea con manchas de acuarela
(filtro de desplazamiento), con un epígrafe de capítulo ("CAPÍTULO III · La pregunta").

## Paleta (manda sobre SPEC-base)
- Papel `#f6ecd6` / fondo de página `#f1e3c4` con borde tostado `#d4b985` (armar.mjs).
- Tinta `#2e2a3b`: todos los contornos, textos y subtítulos.
- Rojo Caperucita `#c0392b`: la capa, sellos, tachaduras, letra capital, firuletes.
- Verde bosque `#4f7a4a`: árboles, techo de tu local, delantal del lobo, Scalerics.
- Ocre dorado `#d49a2a`: canastas, la tienda del lobo, luna, estrellas, el camino.
- Gris lobo `#7d8597`: el lobo (acuarela).
- (Detalles: piel `#f5d6b8`, madera `#8a6a44`.)

## Tipografía
- Subtítulos: Cormorant Garamond 600, 66px, tinta; el acento con el color de quien habla
  (cuentacuentos ocre-óxido `#b4521f`, Caperucita rojo, tu local `#8a6a2e`, lobo gris azulado,
  Orus verde). Arriba de cada grupo una cinta Cinzel con quién habla ("LA CUENTACUENTOS",
  "CAPERUCITA", "TU LOCAL", "EL LOBO · EL DE ENFRENTE", "SCALERICS"): la arma armar.mjs.
- Letra capital: Cinzel 900 sobre cuadro rojo con orla ocre y enredadera verde (s01).
- Epígrafe debajo del dibujo (top 1296): Cinzel 700 rojo espaciado + Cormorant itálica.
- Manuscrito (carteles, notas, "¡Al fin!", "a vos"): Caveat 700.
- Logo de Scalerics oscurecido (filtro) para que se lea sobre el papel.

## Capas fijas
- `compositions/ambiente.html` (ENCIMA de las escenas, debajo de los subtítulos): grano de papel,
  motas doradas que flotan, viñeta tostada, lomo y cantos, borde con firuletes, cabecera, número
  de página y la página que pasa en cada corte (0.2 s + 0.24 s).
- Música: `assets/bgm/bed.mp3` es una cajita de música ORIGINAL (vals en Fa, sintetizada con
  Python para este reel), volumen 0.2.

## Personajes (dibujados genéricos, tinta 5px + acuarela)
- CAPERUCITA: capa roja con capucha, flequillo castaño, cachetes rojos, vestido crema con lunares,
  canasta ocre con mantel rojo; a veces celular en la otra mano.
- EL LOBO (el de enfrente): de pie, gris, orejas con interior ocre, hocico crema, sonrisa enorme con
  colmillos, delantal VERDE de comerciante; brazo en alto presentando.
- LA ABUELA (de Caperucita): rodete gris, anteojos redondos, chal ocre, vestido verde.
- TU LOCAL: casita de barrio con techo verde, cartel "TU LOCAL", puerta cerrada.
- LA TIENDA DEL LOBO: techo dorado, cartel verde "EL DE ENFRENTE", vidriera iluminada, "TIENDA ONLINE".

## Escenas
- **s01-habia** (CAP. I): letra capital "H" + "abía una vez" que se escribe; en "comercio" se
  dibuja tu local entre un pino y un árbol; en "internet" un wifi que se tacha en rojo; en "feliz"
  la cinta "feliz para siempre" y en "siempre" se tacha en rojo y la casita se tambalea.
- **s02-domingo** (CAP. II): luna, estrellas en "noche", "DOM · 23:10" en "domingo"; Caperucita con
  celu y canasta; en "comprarte" flecha roja "a vos" hacia tu local; en "abuelita" globo de
  pensamiento "para la abuelita" con corazón.
- **s03-privado** (CAP. III): tarjeta de publicación con la canasta; comentario de Caperucita
  "¿Cuánto sale la canasta?" y respuesta de TU LOCAL "Precio por privado."; en "privado" cae un
  sello rojo redondo "POR PRIVADO" y tiembla la página.
- **s04-espera** (CAP. IV): Caperucita en un tronco con el celu, "Enviado ✓"; reloj de arena que
  corre, hora 23:12 → 02:40 (primer "esperó", el reloj gira) → 06:15 (segundo); telaraña con
  araña, caracol que cruza, la luna atraviesa el cielo, "...".
- **s05-comprobante** (CAP. V): "¡Al fin!" y Caperucita salta; en "Transferime" se desenrolla un
  pergamino "COMPROBANTE" con pasos manuscritos (transferí al alias, sacale foto, mandámela,
  esperá que la vea, esperá un poco más, ...) y lacre rojo.
- **s06-lunes** (CAP. VI): tu local con cartel "Cerrado"; en "Pasá" el cartel gira: "Pasá el
  lunes"; calendario DOMINGO → LUNES (circulado en rojo) en "lunes"; Caperucita se desinfla.
- **s07-bosque**: camino serpenteante con cartel "TU LOCAL: LUNES"; Caperucita chiquita camina y
  se aleja; en "bosque" aparecen más árboles; en "largo" el bosque se estira.
- **s08-lobo** (CAP. VIII): árbol grande; en "apareció" el lobo sale de atrás y saluda; en "El de
  enfrente" se dibuja su tienda dorada que titila, brillitos y flecha "el de enfrente".
- **s09-tienda** (CAP. IX): el lobo y un celular gigante con su tienda (4 productos con precio,
  botón COMPRAR); Caperucita "¡oh!"; en "grande" la pantalla crece; en "venderte mejor" guiño y
  el botón late.
- **s10-precios** (CAP. X): primer plano del lobo; etiquetas de precio colgando en "precios"; en
  "vista" los ojos se agrandan (el "¡qué ojos tan grandes!"); en "Es para" aparece el cartelito
  "precio por privado" y en "preguntar" se tacha con una X roja y se cae.
- **s11-camioneta** (CAP. XI): la camioneta de ENVÍOS del de enfrente (el lobo maneja) entra
  rodando; en "mañana" cae el cartel rojo MAÑANA; en "llevártela" aparece la casa de la abuela,
  la camioneta llega y el paquete rebota en la puerta.
- **s12-abuela** (CAP. XII): el lobo saluda; en "quedó" entra Caperucita ("clienta nueva"); en
  "Y con la abuela" entra la abuela con el celu con tilde verde ("y la abuela también"),
  corazones.
- **s13-moraleja**: cartela ovalada "MORALEJA"; el lobo adentro; en "malo" una aureola dorada; en
  "único" medalla y "el único"; en "vendió" sello rojo VENDIÓ.
- **s14-canasta**: la canasta dorada en un pedestal con laureles y estrellas, cinta "la mejor del
  bosque"; en "Te faltó" un caminito de puntos que se corta en un borde y un "?" rojo.
- **s15-scalerics** (SCALERICS · tu tienda online): tu local; en "camino" un camino dorado sale de
  la puerta hacia un celular: "TU LOCAL · TIENDA", la canasta, "Canasta del bosque", precio en
  "precios", botón "PAGAR CON MERCADO PAGO" (solo texto, sin logo) en "Mercado", "ENVÍO A
  DOMICILIO" con camioncito en "envío"; en "Vende sola" caen avisos "Nueva venta 23:10 / 23:47 /
  00:15", luna y estrellas en "domingo a la noche".
- **s16-cta**: "Fin" en itálica roja que se escribe, "COLORÍN COLORADO"; en "mandale" un sobre
  con lacre en "cuento" y "Para: el que todavía vende por privado" que se escribe; Caperucita y el
  lobo saludan a los costados. Queda quieto ~3 s.

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
Ver `tiempos.md` (lo genera `node armar.mjs`).
