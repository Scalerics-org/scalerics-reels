# Reel "Bot de WhatsApp" — spec para los que construyen escenas

Reel vertical 1080x1920 que vende los bots de WhatsApp que Scalerics hace para comercios
uruguayos, narrado por una locución. Mismo estilo que el reel ya aprobado de Scalerics Puntos
(`../puntos-que-vuelven/`, mirá sus escenas en `../puntos-que-vuelven/compositions/` como
ejemplos de cómo se resolvieron íconos, celulares, badges, splits y el CTA) y que la referencia
(`../../referencias/puntos-ig/hoja1.png`, `hoja2.png`, `hoja3.png`).

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-domingo.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helpers `dibujar()` y `pop()` y tono visual.** Define cómo se ve un chat de WhatsApp
  en este reel: celular de líneas, cabecera con círculo + nombre, mensaje del cliente con borde
  crema a la derecha, respuesta del comercio con borde verde a la izquierda, hora en mono chica
  debajo de cada burbuja, "escribiendo" con tres puntos. Reusá ese dibujo siempre que haya chat.

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
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. No animar letterSpacing, width,
  height, left, top: solo transforms, opacity, filter, strokeDashoffset.
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft, error,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx hyperframes snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx hyperframes check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (inicios abajo).

## Inicios globales
s02 5.55 · s03 9.80 · s04 14.02 · s05 22.24 · s06 26.84 · s07 30.07 · s08 34.40 · s09 39.38 ·
s10 42.22 · s11 52.44 · s12 57.32 (dura hasta 62.50; la voz termina en 59.69)

Tiempos por palabra de cada escena: `tiempos.md`.

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala. Nada de logos de WhatsApp ni de
marcas reales: el chat se reconoce por las burbujas.

**s02-no-es** — "No es que tengan más empleados. Ni que trabajen de noche. Ni suerte." Tres
íconos en fila (y≈900): un grupo de 3 figuritas (EMPLEADOS), una luna con estrellita (DE
NOCHE), un trébol de cuatro hojas (SUERTE). Cada uno se dibuja en su palabra (empleados 0.90 /
noche 2.75 / suerte 3.60) y enseguida le cae el badge X verde. Etiquetas chicas debajo de cada
uno (mono 22px crema 0.6). Etiqueta principal al final: "NADA DE ESO".

**s03-primero** — "Es que entendieron algo: el cliente le compra al primero que le contesta."
Una figurita (cliente) a la izquierda con un globo de mensaje; dos celulares chicos a la
derecha, uno arriba del otro. En "cliente" (1.57) el mensaje sale hacia los dos (dos flechas
finas punteadas). En "primero" (2.61) uno responde (burbuja verde con pop + "1º" verde), el otro
queda con "escribiendo..." que nunca llega. En "contesta" (3.27) una línea verde se dibuja del
cliente al que contestó y el otro se apaga a 0.35. Etiquetas: "LA REGLA" → "EL PRIMERO QUE
CONTESTA".

**s04-billetera** — "Cuando alguien te escribe ¿cuánto sale?, está con la billetera en la mano.
Diez minutos después, ya se le pasó. O le compró a otro." Arranca con el celular del chat (como
s01, más chico o corrido a la izquierda) y en "¿cuánto sale?" (1.03) aparece la burbuja crema
del cliente "¿Cuánto sale?". En "billetera" (2.80) al costado se dibuja una billetera abierta
con un billete asomando en verde. En "Diez minutos" (4.03) un reloj de líneas con la aguja que
barre y "10 MIN" verde; la burbuja muestra el doble tilde gris y ninguna respuesta. En "se le
pasó" (5.93) la billetera se cierra (el billete baja y desaparece). En "le compró a otro" (7.11)
aparece a la derecha un segundo local chico con un tilde verde y una flechita de la billetera
hacia allá. Etiquetas: "LISTO PARA COMPRAR" → "10 MINUTOS DESPUÉS" → "LE COMPRÓ A OTRO".

**s05-se-enfrio** — "Vos creés que no estaba tan interesado. Estaba. Se enfrió esperando." Un
termómetro de líneas grande al centro, bulbo y columna en verde llena arriba. En "no estaba tan
interesado" (0.67) aparece al lado un signo de pregunta crema. En "Estaba." (2.14) la columna
hace punch (pulso, llena). En "enfrió esperando" (3.37) la columna baja despacio hasta casi
vacía y alrededor caen 3-4 copos de líneas; un relojito con puntos suspensivos. Etiquetas:
"ESTABA INTERESADO" → "SE ENFRIÓ ESPERANDO".

**s06-cuando-puede** — "Mientras tanto, el comercio chico contesta cuando puede." Un local chico
de líneas (como el café de `../puntos-que-vuelven/compositions/s01-mismo-cafe.html`, cartel "TU
LOCAL") o un mostrador con una figurita atendiendo a 2-3 clientes en fila. Sobre el mostrador
un celular chico que vibra (líneas de vibración) con un globo contador verde que sube 1→3→7 sin
que nadie lo agarre. En "cuando puede" (2.33) la figurita mira un segundo el celular y vuelve a
atender. Etiqueta: "CONTESTA CUANDO PUEDE".

**s07-en-visto** — "Y cada mensaje que queda en visto es una venta que se va sin hacer ruido."
Columna de 4 burbujas de clientes (crema, a la derecha, como s01) que aparecen una tras otra
desde "cada mensaje" (0.19–1.2), cada una con su doble tilde. En "visto" (1.51) los dobles
tildes se ponen verdes a la vez (leídos) pero no aparece ninguna respuesta. En "venta" (2.46) de
cada burbuja sale una moneda/ticket "$" chico que se va flotando hacia afuera y se desvanece en
silencio (en "sin hacer ruido" 3.17 se terminan de ir). Etiquetas: "VISTO" → "VENTAS QUE SE
VAN".

**s08-sistema** — "Vender por WhatsApp no es vivir pegado al celular. Es tener un sistema." Una
figurita con un celular en la mano, unidos por una cadena (se dibuja en "pegado" 1.80), y
alrededor burbujas que no paran de llegar. En "celular" (2.37) le cae el badge X verde y todo
se apaga a 0.35. En "sistema" (3.94) aparece un engranaje que se dibuja y gira despacio con
punch (como `../puntos-que-vuelven/compositions/s07-sistema.html`). Etiquetas: "PEGADO AL
CELULAR" → "ES UN SISTEMA".

**s09-marca** — "Por eso hacemos bots de WhatsApp para comercios." Una caja redondeada de trazo
crema (como `../puntos-que-vuelven/compositions/s08-marca.html`) que se dibuja; adentro, Lexend
700 ~64px, "Bots de" crema + " WhatsApp" verde, que entran en "bots" (0.71) y "WhatsApp" (1.14),
con un pulso en WhatsApp. Debajo, en "comercios" (1.85), una línea mono crema 0.6 "PARA
COMERCIOS". Al final la caja sube hacia y≈680 y se encoge (la escena siguiente arranca desde
ahí, o simplemente sale con blur).

**s10-como-anda** — "Contesta al instante, a cualquier hora, con tus precios y tus horarios.
Agenda turnos, toma pedidos, y cuando la consulta es para vos, te la pasa." La demo: un celular
con un chat como s01, cabecera "Tu local" y un puntito verde "en línea". Beats:
- "Contesta al instante" (0.00–1.2): burbuja del cliente "¿A qué hora abren mañana?" y casi
  pegada la respuesta verde "De 9 a 19 h. ¿Te reservo?". Hora "03:12" en las dos; en "cualquier
  hora" (1.81) la hora hace punch y aparece una luna chica afuera del celular.
- "precios y horarios" (3.28 / 4.18): dos chips verdes a un costado: "$ PRECIOS" y "HORARIOS"
  (con relojito) que se conectan con líneas finas al chat.
- "Agenda turnos" (5.10): la conversación sube y aparece dentro del chat una tarjeta con un
  calendario chico y "Jueves 10:30" + tilde verde. "toma pedidos" (6.29): otra tarjeta con una
  bolsa y "Pedido #128 · 2 ítems" + tilde verde.
- "cuando la consulta es para vos, te la pasa" (7.80–9.27): a la derecha del celular una
  figurita (el dueño) y una flecha verde que se dibuja del chat a ella, con una burbuja chica
  "Te paso con Ana" en el chat.
Etiquetas: "AL INSTANTE" → "A CUALQUIER HORA" → "AGENDA Y VENDE" → "TE LA PASA". Es la escena
larga: algo se mueve siempre.

**s11-grandes** — "Las marcas grandes lo hacen con equipos enteros. Vos lo podés tener en tu
local." En "marcas grandes" (0.24): un edificio corporativo de líneas con grilla de ventanas; en
"equipos enteros" (1.47) una fila de 6–7 figuritas con auriculares (vincha + micrófono) debajo.
Etiqueta "EQUIPOS ENTEROS". En "Vos" (2.70) todo se apaga/achica y aparece un local chico (como
el de s06) con un celular al lado que muestra una burbuja verde y un tilde que se dibuja en
"local" (4.08). Etiqueta "EN TU LOCAL".

**s12-cta** — "Comentá BOT y te contamos cómo." (la voz termina en 1.93; la escena dura 5.18).
El cierre como `../puntos-que-vuelven/compositions/s12-cta.html`: "Bots de WhatsApp" grande
(Lexend 700 ~96px, "WhatsApp" en verde, en dos líneas si no entra) centrado en y≈860, con una
línea chica debajo "Atención 24/7 para tu comercio" (Lexend 500 34px, crema 0.7); y una píldora
crema con texto navy #0B1D35: Comentá "BOT" en y≈1150, que entra con pop en "Comentá" y hace un
pulso suave cada ~1.2 s hasta el final (tweens finitos, no repeat -1). NO hagas la salida con
blur: es el último cuadro, tiene que quedar quieto y legible al final.
