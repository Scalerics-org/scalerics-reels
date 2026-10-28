# Reel "Publicidad sin respuesta" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "pagás publicidad para que te escriban y después no contestás". El anuncio
funciona, la gente escribe "¿Precio?", "¿Tienen talle?", y el dueño contesta a las tres horas o
al otro día, cuando el cliente ya le compró a otro con la plata que él puso en publicidad. El
producto es el bot de WhatsApp. Locución de 57 s. Mismo estilo que los reels aprobados
(`../el-de-enfrente/`, `../bot-whatsapp/`, `../puntos-que-vuelven/`, `../descuentos/`: mirá sus
`compositions/`).

Recurso visual central: **la plata de la publicidad**. Una moneda/billete con "$" verde que
entra al anuncio (el anuncio es un posteo dibujado: cuadro con imagen de líneas, rótulo mono
"PUBLICIDAD" y un botón "Enviar mensaje") y se convierte en mensajes de clientes (burbujas
crema). Cuando el mensaje queda sin respuesta, la plata se va (hacia otro local, a la basura).
Cuando el bot contesta, la burbuja recibe la respuesta verde y la plata se queda. Lo tuyo sin
contestar se apaga (crema 0.4); lo que se contesta es verde.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave, la
  locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-anuncio.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()` y `pop()` y tono visual.** Define el celular, el anuncio y las
  burbujas: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 60.41 (la voz termina
en 57.21).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-anuncio** (3.82 s) — "Pagás publicidad para que te escriban. Y después no contestás."
Un celular al centro (x 540, y 610–1200) que arranca medio dibujado con un posteo adentro: cuadro
de imagen con una remera de líneas, rótulo "PUBLICIDAD" mono chico y botón "Enviar mensaje".
En "publicidad" (0.20) cae desde arriba una moneda "$" verde que entra al celular (el posteo hace
punch). En "te escriban" (1.30–1.40) salen del celular hacia la derecha 3 burbujas crema
"¿Precio?" / "¿Talle?" / "¿Envíos?" que se apilan al costado. En "no contestás" (2.60–2.70) las
burbujas se apagan a 0.4, cada una con un doble tilde gris, y arriba aparece un badge X verde.
Etiquetas: "PAGÁS PUBLICIDAD" → "Y NO CONTESTÁS".

**s02-no-es** (5.01 s) — "No es que el anuncio no funcione. Ni que Instagram esté muerto. Ni
que la gente no compre." Tres íconos en fila (x 270/540/810, y ≈900) con su badge X (como
`../el-de-enfrente/compositions/s03-por-que.html`): un megáfono (anuncio, X en "funcione" 0.78),
un celular con un corazón y "+1" (redes, X en "muerto" 2.48: sin logos de marcas), una bolsa de
compras (X en "compre" 3.98). Cada ícono hace pop un poco antes de su X. Etiqueta final "NADA
DE ESO" en 4.2.

**s03-te-escriben** (6.19 s) — "El anuncio funcionó: te escribieron al WhatsApp. ¿Precio?
¿Tienen talle? ¿Hacen envíos?" Arriba a la izquierda el posteo chico (como s01) con un tilde
verde grande en "funcionó" (0.47). En "te escribieron" (1.57) una flecha verde del posteo al
celular (derecha), que tiene cabecera "WhatsApp" y un contador verde de mensajes. En "WhatsApp"
(2.17) el celular hace punch. Las burbujas del cliente entran una por una, cada una con su
nombre: "¿Precio?" (3.20), "¿Tienen talle?" (3.98), "¿Hacen envíos?" (4.98); el contador
sube 1 → 2 → 3. Etiquetas: "FUNCIONÓ" → "TE ESCRIBIERON".

**s04-tres-horas** (3.80 s) — "Y vos contestaste a las tres horas. O al otro día, cuando
cerraste." Un reloj grande de líneas (x 540, y ≈850, r 150) cuya aguja grande da vueltas rápidas
en "contestaste" y frena en "tres horas" (0.88–1.08) con "+3 H" verde al lado. En "otro día"
(2.08) el reloj se achica a la izquierda y aparece tu local con la persiana bajándose y un
cartel "CERRADO" en "cerraste" (2.68), con una luna chica arriba. Etiquetas: "3 HORAS DESPUÉS" →
"AL OTRO DÍA".

**s05-a-otro** (4.97 s) — "Para entonces, esa persona ya le compró a otro. Con tu plata de
publicidad." Tu celular apagado a la izquierda (con una burbuja "¿Precio?" sin respuesta), a la
derecha otro local ("OTRO LOCAL") prendido. En "esa persona" (1.10–1.28) aparece una figurita
al lado de tu celular; en "compró a otro" (1.88–2.28) cruza al otro local (como en
`../el-de-enfrente/compositions/s01-te-roba.html`), el otro local se prende con punch y aparece
una bolsita con tilde verde. En "tu plata de publicidad" (3.18–3.78) 3 monedas "$" verdes salen
de tu celular y viajan en arco hacia el otro local. Etiquetas: "LE COMPRÓ A OTRO" → "CON TU
PLATA".

**s06-ahora** (4.21 s) — "Porque el que pregunta el precio quiere comprar ahora, no mañana."
Una burbuja crema "¿Precio?" grande (y ≈720) en "pregunta" (0.41); debajo una billetera abierta
con un billete "$" asomando (verde) en "quiere comprar" (1.11–1.71). En "ahora" (2.11) un
cartel "AHORA" Lexend 700 verde grande con punch. En "no mañana" (2.83–2.91) al lado aparece un
calendario chico "MAÑANA" crema 0.4 que se tacha con una línea verde. Etiqueta "QUIERE COMPRAR
YA".

**s07-basura** (5.26 s) — "Cada mensaje que queda sin respuesta es publicidad que pagaste y
tiraste a la basura." Arriba (y 640–900) una columna de 3 burbujas crema "¿Precio?", "¿Talle?",
"¿Envíos?" con tildes, que en "sin respuesta" (1.10–1.30) quedan apagadas con "SIN RESPUESTA"
mono chico. En "publicidad que pagaste" (2.40–3.10) cada burbuja se transforma (fade cruzado) en
un billete verde con "$". Abajo (y ≈1050–1220) un tacho de basura de líneas que se dibuja en
"tiraste" (3.80); en "basura" (4.40) los billetes caen adentro uno tras otro y la tapa rebota.
Etiquetas: "SIN RESPUESTA" → "PLATA TIRADA".

**s08-sistema** (4.77 s) — "Y no se arregla viviendo pegado al celular. Se arregla teniendo un
sistema." Una figurita encorvada mirando un celular, con signos de cansancio (rayitas) y 3
burbujas que siguen llegando ("viviendo pegado" 0.84–1.24); en "celular" (1.54) badge X verde.
En "Se arregla" (2.37) todo se va y en "sistema" (3.64) un engranaje verde se dibuja y gira con
punch (como `../puntos-que-vuelven/compositions/s07-sistema.html`). Etiquetas: "NO ES EL
CELULAR" → "ES UN SISTEMA".

**s09-bot** (2.97 s) — "Por eso hacemos bots de WhatsApp para comercios." Una caja redondeada
que se dibuja con "Scalerics" (Lexend 700 ~60px, crema) arriba (y ≈690). En "bots" (0.67) abajo
aparece un celular chico con una cabecita de robot de líneas (cabeza cuadrada, antena, ojos
verdes) que guiña; en "WhatsApp" (1.27) una burbuja verde sale del celular; en "comercios"
(1.77) un local chico al lado con un tilde. Etiqueta "BOT DE WHATSAPP" → "PARA COMERCIOS".

**s10-que-hace** (9.65 s) — "Contesta al instante, a cualquier hora, con tus precios y tus
horarios. Toma pedidos, agenda turnos, y cuando la consulta es para vos, te la pasa." Un
celular a la izquierda (x 130–470) con chat: arranca con "¿Precio?" del cliente y en "Contesta"
(0.00–0.50) llega al instante la respuesta verde "Sale $ 1.290" con "0:01" chico verde. En
"cualquier hora" (1.40) a la derecha un reloj chico con "24 H" que da una vuelta. En "precios" y
"horarios" (2.90 / 3.90) la respuesta crece con una segunda línea "Abrimos 9 a 20 h". A la
derecha (x 600–960) una lista de 3 filas con ícono y rótulo mono que se tilda en verde en su
palabra: "PEDIDOS" (bolsa, 5.00), "TURNOS" (calendario, 6.10), y en "para vos" (8.00) "TE LA
PASA" (figurita del dueño) con una flecha verde que va del celular a la figurita en "pasa"
(8.80). Etiquetas: "AL INSTANTE" → "A CUALQUIER HORA" (1.40) → "PEDIDOS Y TURNOS" (5.00) → "TE LA
PASA" (8.63).

**s11-respuesta** (4.69 s) — "Así cada mensaje que pagaste tiene respuesta. Aunque estés
atendiendo el mostrador." A la derecha el celular con tres burbujas "¿Precio?" / "¿Talle?" /
"¿Envíos?", cada una recibe una respuesta verde chica en "cada mensaje"… "respuesta" (0.25 /
1.05 / 1.85), y la moneda "$" del anuncio se queda arriba, prendida. En "atendiendo el
mostrador" (3.15–3.75) a la izquierda se dibuja un mostrador con vos detrás atendiendo a un
cliente (dos figuritas), con el celular vibrando solo al lado. Etiquetas: "TIENE RESPUESTA" →
"MIENTRAS ATENDÉS".

**s12-cta** (5.07 s) — "Comentá BOT y te contamos cómo." (la voz termina en 1.87). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande (Lexend 700 ~110px,
crema) centrado en y≈860, debajo "Bots de WhatsApp para comercios" (Lexend 500 34px, crema 0.7),
y la píldora crema con texto navy #0B1D35: Comentá "BOT", que entra con pop en "Comentá" y hace
un pulso suave cada ~1.2 s (tweens finitos). Sin salida con blur.
