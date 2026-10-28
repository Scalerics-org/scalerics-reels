# Reel "Más horas, lo mismo" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, Scalerics Puntos y tiendas online para comercios). Le habla al dueño de un comercio al
que le va bien o regular y que crece a fuerza de sus propias horas: "trabajás más horas que nunca
y vendés lo mismo". No es falta de ganas, ni de clientes, ni la crisis: el negocio llega hasta
donde llegan sus horas, y el día no se estira. Mientras atiende una cosa, se le cae otra. El techo
no es el esfuerzo: es no tener un sistema. Producto: todo Scalerics (bot, Puntos, tienda).
Locución de 52 s, ritmo rápido. Mismo estilo que los reels aprobados (`../el-de-enfrente/`,
`../puntos-que-vuelven/`, `../bot-whatsapp/`, `../descuentos/`).

Recursos centrales del reel:
1. **Las dos líneas**: un gráfico de líneas simple (dos ejes crema). La línea **HORAS** (crema)
   sube empinada; la línea **VENTAS** (crema apagada 0.45) queda plana. Abre el reel (s01) y lo
   cierra (s11): ahí se dan vuelta, HORAS baja y VENTAS sube en verde.
2. **Los malabares**: el dueño es una figurita de palitos (como las de `../el-de-enfrente/s01`)
   que hace malabares con lo que tiene que atender (burbuja de WhatsApp, ticket de pedido,
   cliente esperando). En s11 deja de hacer malabares: las cosas caen cada una en su caja (BOT,
   PUNTOS, TIENDA) y él baja los brazos.
3. **El techo**: una línea horizontal gruesa que el negocio golpea y no pasa (s04); en s07 el
   engranaje del sistema la empuja y la rompe.

Nada de reloj gigante ni cuaderno ni sombrilla (ya los usaron `el-cuaderno` y
`si-te-vas-una-semana`): el reloj, si aparece, es chico y secundario.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave, la
  locución, el logo de Scalerics abajo y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-horas.html`: **la escena modelo.** Copiá su estructura, clases, helpers
  `dibujar()` y `pop()`, el gráfico de las dos líneas y la etiqueta.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 55.25 (la voz termina en
52.05).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-horas** (2.65 s) — "Trabajás más horas que nunca y vendés lo mismo." El gráfico arranca
con los ejes medio dibujados (cuadro 0 no negro): eje vertical x 220 de y 640 a 1160, eje
horizontal y 1160 de x 220 a 880. En "horas" (0.60) la línea HORAS se dibuja empinada en crema
desde abajo a la izquierda hasta arriba a la derecha (y≈680), con su rótulo mono "HORAS" y una
flechita; en "nunca" (1.10) da un golpecito. En "vendés" (1.50) la línea VENTAS se dibuja plana
(y≈1060) en crema apagada con rótulo "VENTAS"; en "mismo" (2.00) un "=" verde late al final de
la línea. Etiquetas: "MÁS HORAS" → "MISMAS VENTAS".

**s02-jornada** (5.85 s) — "Abrís antes, cerrás más tarde, y contestás mensajes en la cena. Y la
caja, igual que el año pasado." Una barra de jornada horizontal (rectángulo redondeado, y≈760)
con un local chico encima. En "antes" (0.35) la barra se estira a la izquierda y aparece un
solcito; en "tarde" (1.45) se estira a la derecha y aparece una luna. En "contestás mensajes"
(2.25–2.65) abajo (y≈1000) aparece un plato con tenedor y cuchillo y al lado un celular chico que
vibra con burbujas verdes que caen una tras otra ("cena" 3.45). En "caja" (4.45) todo se va y
aparece una caja registradora con dos tickets/barras iguales "AÑO PASADO" y "HOY" y un "=" verde
en "igual" (5.19). Etiquetas: "DE SOL A LUNA" → "Y LA CAJA, IGUAL".

**s03-no-es** (4.61 s) — "No es falta de ganas. Ni de clientes. Ni la crisis." Como
`../el-de-enfrente/compositions/s03-por-que.html`: tres íconos en fila con su badge X verde en
su palabra: batería llena (GANAS, "ganas" 1.60), dos figuritas (CLIENTES, "clientes" 2.60),
diario con titular "CRISIS" (CRISIS, "crisis" 3.80). Etiqueta final "NADA DE ESO".

**s04-techo** (4.68 s) — "Es que tu negocio llega hasta donde llegan tus horas. Y el día no se
estira." A la izquierda (x≈400) una columna de bloques crema que se apilan desde y 1160 en
"llega" (0.59) uno tras otro; cada bloque lleva un relojito chico. Arriba un techo grueso verde
(y≈720, x 220–860) que se dibuja en "hasta" (1.39); en "horas" (2.29) el último bloque choca
contra el techo, rebota y tiembla. En "día" (3.39) a la derecha (x≈720) un reloj de pared
mediano que en "estira" (3.79) intenta estirarse (scaleX 1.35) y vuelve de golpe (elastic).
Etiquetas: "TU TECHO: TUS HORAS" → "NO SE ESTIRA".

**s05-malabares** (6.21 s) — "Mientras le pasás un precio a uno por WhatsApp, el del mostrador
espera. Mientras anotás un pedido, entra otro mensaje." La figurita del dueño al centro (pies en
y≈1180), brazos arriba, y un arco punteado tenue de malabares sobre su cabeza. Las cosas entran
al arco en su palabra y giran por el arco (rotation alrededor de un centro): burbuja de chat con
"$" verde ("precio" 0.91 / "WhatsApp" 1.71); a la izquierda un mostrador con un cliente que
espera y un relojito de arena / "..." ("mostrador" 2.61, "espera" 2.91: tiembla impaciente);
ticket de pedido con renglones ("pedido" 4.61); otra burbuja con badge "1" verde ("entra otro
mensaje" 5.01–5.71). Al final el arco va más rápido y el dueño tambalea. Etiquetas:
"TODO A LA VEZ" → "MALABARES".

**s06-no-vuelve** (4.02 s) — "Y el que vino una vez no vuelve, porque nadie se acordó de él."
Tu local a la derecha (x≈760). Una figurita entra ("vino" 0.80), con un "1" verde arriba ("una
vez" 1.00–1.10), sale y camina hacia la izquierda achicándose y apagándose ("no vuelve" 1.55–
1.70). En "nadie se acordó" (2.60–3.00) aparece en el centro una ficha de cliente vacía (cabeza
punteada, renglones vacíos) con un "?" grande. Etiquetas: "VINO UNA VEZ" → "NADIE SE ACORDÓ".

**s07-sistema** (3.12 s) — "El techo no es tu esfuerzo. Es que no tenés un sistema." El techo
verde de s04 (y≈760) y abajo un brazo flexionado / gota de sudor (ESFUERZO) que en "esfuerzo"
(0.78) recibe el badge X. En "Es" (1.52) se va y en "sistema" (2.28) un engranaje (como
`../el-de-enfrente/compositions/s09-sistema.html`) se dibuja y gira, sube y rompe el techo en
dos mitades que se abren. Etiquetas: "NO ES ESFUERZO" → "ES UN SISTEMA".

**s08-bot** (6.76 s) — "En Scalerics lo armamos para comercios. Un bot de WhatsApp que
contesta al instante con tus precios y toma los pedidos." Primero (0–3.0) una caja redondeada
con "Scalerics" (Lexend 700 ~72px) en "Scalerics" (0.16) y "PARA COMERCIOS" mono debajo en
"comercios" (1.76). En "bot" (3.16) la caja sube y se va, y entra un celular (~380x600) con
chat: burbuja del cliente "¿Cuánto sale?" ya puesta; en "contesta al instante" (4.06–4.66) la
respuesta verde del bot aparece de golpe; en "precios" (5.56) adentro "$ 450 · hasta las 20 h"; en
"toma los pedidos" (6.26–6.66) una burbuja "Pedido anotado" con tilde verde. Etiquetas:
"PARA COMERCIOS" → "BOT DE WHATSAPP".

**s09-puntos** (4.60 s) — "Scalerics Puntos, para que el cliente sume con cada compra y
vuelva." Una tarjeta de puntos en un celular (como las de `../puntos-que-vuelven/`) con
"Scalerics Puntos" arriba (en "Puntos" 1.36). En "sume" (2.40) y "compra" (3.50) se llenan
casilleros con círculos verdes y salta un "+10" verde; en "vuelva" (4.14) una flecha circular
verde gira alrededor de una figurita que vuelve. Etiquetas: "SCALERICS PUNTOS" → "Y VUELVE".

**s10-tienda** (4.39 s) — "Y una tienda online que vende sola, con envíos y Mercado Pago." Una
laptop o celular con una tienda (grilla de 4 productos) en "tienda" (0.60); en "vende sola"
(1.40–1.70) una bolsa con tilde verde y "+1 venta"; en "envíos" (2.50) una caja de envío que se
va en una camionetita; en "Mercado Pago" (3.20) una tarjeta con "PAGADO" y tilde verde (sin logo
de marca). Etiquetas: "TIENDA ONLINE" → "VENDE SOLA".

**s11-crece** (3.17 s) — "Vos dejás de hacer malabares. Y el negocio crece." La figurita con
las tres cosas en el arco (arranca en malabares); en "malabares" (0.61) las cosas caen cada una
en su caja (BOT, PUNTOS, TIENDA, rótulos mono) y el dueño baja los brazos. En "negocio crece"
(1.71–2.01) aparece el gráfico de s01 dado vuelta: HORAS (crema apagada) baja y VENTAS sube en
verde con punch. Etiquetas: "SIN MALABARES" → "EL NEGOCIO CRECE".

**s12-cta** (5.19 s) — "Comentá HORAS y te contamos cómo." (la voz termina en 1.99). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, "Bots · Puntos · Tiendas
para comercios", y la píldora crema con Comentá "HORAS" (pop en "Comentá", golpe en "HORAS" 0.56,
pulsos finitos). Sin salida con blur.
