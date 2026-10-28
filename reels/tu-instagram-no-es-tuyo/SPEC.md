# Reel "Tu Instagram no es tuyo" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, Scalerics Puntos, tiendas online y sitios web para comercios). Le dice al dueño que
vende por Instagram una verdad incómoda: la cuenta no es suya, es de Meta, y si se la cierran o
se la bloquean pierde las ventas y los clientes. No es paranoia: levantó el negocio en un terreno
alquilado. El comercio que crece usa Instagram de vidriera y vende en su propia casa: la tienda
online (vende sola, cobra con Mercado Pago, envíos por DAC, Correo o PedidosYa) y la lista de
clientes, que sí son suyas. Locución de 51.5 s, ritmo rápido. Mismo estilo que los reels ya
aprobados: `../el-de-enfrente/`, `../puntos-que-vuelven/`, `../bot-whatsapp/`, `../descuentos/`.

Recurso central del reel: **"lo alquilado" contra "lo tuyo"**. El celular con el perfil de
Instagram (cámara de líneas genérica, sin logo real: un cuadrado redondeado con un círculo y un
puntito; grilla de 3x3 fotos de líneas) es lo alquilado: se dibuja en crema y, cuando lo pierde,
se apaga a 0.4 o se candadea. Lo tuyo (tu tienda, tu casa, tu lista, una llave) lleva el verde.
La llave verde aparece cuando algo pasa a ser tuyo.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-no-es-tuyo.html`: **la escena modelo.** Define el celular con el perfil, el
  ícono de cámara, el candado y la llave: reusalos.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 54.69 (la voz termina en
51.49).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-no-es-tuyo** (4.14 s) — "Tu Instagram no es tuyo. Es de Meta, y te lo puede cerrar mañana."
Un celular (380x760 aprox., centrado, y 600–1200) con el perfil: ícono de cámara arriba, una
línea de nombre "tu.comercio", grilla 3x3 de fotitos de líneas. Arranca medio dibujado. En
"tuyo" (0.90) un rótulo "TUYO" con tilde que se tacha con una línea verde. En "Meta" (1.70) un
cartel colgado arriba a la derecha del celular "DE META" (mono, crema) que cae y se balancea. En
"cerrar" (2.80) un candado grande se dibuja sobre el celular, el aro baja con golpe y el celular
se apaga a 0.4. Etiquetas: "NO ES TUYO" → "TE LO PUEDEN CERRAR".

**s02-desaparece** (4.56 s) — "Una cuenta bloqueada, un hackeo, un cambio de reglas, y tu negocio
desaparece." Celular chico a la izquierda (perfil). A la derecha, tres íconos en columna que
aparecen en su palabra: candado (bloqueada 0.46), campo de contraseña "* * * *" con un gancho
(hackeo 1.36), hoja "REGLAS" con renglones que se tachan y se reescriben (reglas 2.76). En
"desaparece" (3.66) las fotitos de la grilla se van una por una (scale 0 + opacity) y el perfil
queda vacío. Etiquetas: "UN DÍA CUALQUIERA" → "TU NEGOCIO DESAPARECE".

**s03-exagerado** (5.89 s) — "¿Exagerado? No es paranoia. Ni le pasa solo a otros. Ni se arregla
con un reclamo." Un "?" grande en "Exagerado" (0.00) que después se achica y sube. Tres íconos en
fila con su badge X verde: ojo con espiral / lupa (paranoia 1.50), tres figuritas "OTROS" (otros
3.30), un formulario "RECLAMO" con un reloj de arena (reclamo 4.90). Rótulos mono debajo.
Etiqueta final "NADA DE ESO".

**s04-alquilado** (3.15 s) — "Es que levantaste tu negocio en un terreno alquilado." Un local
chico se levanta de abajo hacia arriba (levantaste 0.21, negocio 0.91) sobre un terreno (línea de
suelo con un recuadro de alambrado). En "terreno" (1.61) un cartel en un poste se clava al lado:
"ALQUILADO" y debajo "DUEÑO: META" chico. Etiqueta "TERRENO ALQUILADO".

**s05-nada-tuyo** (6.61 s) — "Tus seguidores son de Instagram. Tus ventas dependen de mensajes que
no controlás. Y tu lista de clientes no existe." Tres filas tipo inventario que aparecen en su
frase, cada una con ícono a la izquierda y estado a la derecha: figuritas "SEGUIDORES" → "DE
INSTAGRAM" (0.86); burbujas de chat "VENTAS" → "NO LAS CONTROLÁS" (3.46); libreta "TU LISTA" → en
"no existe" (5.66) sus renglones se borran y queda un "0" verde. Cada fila con un badge X verde.
Etiqueta "NADA ES TUYO".

**s06-se-cae** (3.58 s) — "El día que se cae la cuenta, no tenés a quién avisarle." El celular con
el perfil; en "cae" (0.55) se cae (rota y baja un poco), la pantalla se vacía y aparece "CUENTA
SUSPENDIDA" con una X. En "no tenés a quién" (1.51–2.15) aparece a la derecha un megáfono que
emite ondas hacia un espacio vacío (tres siluetas punteadas que se borran). Etiquetas: "SE CAYÓ
LA CUENTA" → "A NADIE".

**s07-propia-casa** (5.16 s) — "El comercio que crece usa Instagram para que lo conozcan, pero
vende en su propia casa." Izquierda: el celular con la cámara como vidriera, figuritas que lo miran
("conozcan" 2.37) con un ojo. Una flecha verde (pero 3.22) va hacia la derecha a un local/casa que
se dibuja con ventanas verdes y cartel "TU TIENDA"; en "propia" (3.87) una llave verde entra en la
puerta y en "casa" (4.17) golpe. Etiquetas: "INSTAGRAM: VIDRIERA" → "VENDE EN SU CASA".

**s08-sistema** (2.25 s) — "Y eso no es caro. Es tener un sistema." Etiqueta de precio "$" que en
"caro" (0.41) recibe el badge X; en "sistema" (1.51) se transforma en un engranaje que se dibuja y
gira con punch. Etiquetas: "NO ES CARO" → "ES UN SISTEMA".

**s09-tienda** (6.06 s) — "En Scalerics hacemos tu tienda online: vende sola, a cualquier hora, y
cobra con Mercado Pago." Caja de marca "Scalerics" arriba (y≈660) en "Scalerics" (0.26). Debajo,
un celular con la tienda (tienda 1.56): barra "tu tienda", dos productos con precio, botón verde
"Comprar". En "vende sola" (2.64) el botón se aprieta solo y cae "+1 venta"; en "cualquier hora"
(3.54) un reloj a la derecha con las agujas girando rápido; en "Mercado Pago" (4.96) aparece el
cartel "PAGO APROBADO" con tilde verde. Etiquetas: "TU TIENDA ONLINE" → "VENDE SOLA" → "COBRA
CON MERCADO PAGO".

**s10-envios** (3.02 s) — "Los envíos salen por DAC, Correo o PedidosYa." Una caja de envío con
cinta que se dibuja en "envíos" (0.10) y sale hacia la derecha; tres rótulos-etiqueta tipo
"ticket" que aparecen en su palabra: "DAC" (0.90), "CORREO" (1.41), "PEDIDOSYA" (1.90), con una
camioneta de líneas que se va. Etiqueta "ENVÍOS RESUELTOS".

**s11-lista-tuya** (5.22 s) — "Y cada compra te deja el contacto del cliente: una lista que es tuya,
pase lo que pase." Un ticket de compra (compra 0.48) del que sale una tarjeta de contacto (círculo
de iniciales + nombre + teléfono) que vuela (contacto 1.48) a una lista que se llena con 4 filas
(Lucía M., Martín R., Sofía P., Diego A.). En "tuya" (3.65) la llave verde y la lista hace golpe;
en "pase lo que pase" (4.03) al costado el celular de Instagram aparece y se candadea, y la lista
sigue intacta. Etiquetas: "CADA COMPRA, UN CONTACTO" → "TU LISTA, SIEMPRE".

**s12-cta** (5.05 s) — "Comentá TIENDA y te contamos cómo." El cierre como `../el-de-enfrente/compositions/s11-cta.html`:
"Scalerics" grande, "Bots · Puntos · Tiendas para comercios" y la píldora crema con texto navy
#0B1D35: Comentá "TIENDA", pop en "Comentá" y pulsos suaves finitos. Sin salida con blur.
