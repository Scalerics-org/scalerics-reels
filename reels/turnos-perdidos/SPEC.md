# Reel "Turnos perdidos" · spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le habla al dueño de una peluquería,
barbería, estética o consultorio: "perdés más turnos por no contestar que por cancelaciones". La
escena tipo: estás con las manos ocupadas atendiendo a una clienta, entra un WhatsApp pidiendo
turno, contestás una hora después y ya reservó con otro. Ese turno no aparece en ninguna parte:
no es una cancelación, es alguien que nunca llegó a tu agenda. El bot contesta al instante,
muestra los lugares libres y agenda el turno solo. Locución de 56.8 s, ritmo rápido.

Mismo estilo que los reels aprobados: `../el-de-enfrente/`, `../bot-whatsapp/`,
`../puntos-que-vuelven/` (celulares con chat, badges X, engranaje, CTA).

Recurso visual central: **la agenda de papel del sábado**. Una hoja con anillos arriba, el
título "SÁBADO" y filas de horarios (mono) con nombres (Lexend). Los turnos tomados son crema;
el turno que se perdió es una fila VACÍA con borde punteado tenue (lo que no se ve); la
cancelación es un nombre tachado. Cuando entra el bot, las filas se llenan en verde.
Segundo recurso: **las manos ocupadas**: vos de pie con la tijera, la clienta sentada en el
sillón, y el celular aparte.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-turnos.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define la agenda del sábado (hoja, anillos, filas): reusala.

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
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (inicios abajo).

## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 59.97 (la voz termina en
56.77).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-turnos** (3.89 s) · "Perdés más turnos por no contestar que por cancelaciones." La agenda
del sábado (centrada, x 330-750, y 640-1190) arranca medio dibujada, con 6 filas de 13:00 a 18:00.
En "turnos" (0.80) se escriben los nombres. En "no contestar" (1.40-1.60) tres filas pierden el
nombre (blur out) y quedan como hueco punteado con un globito de chat chico al costado. En
"cancelaciones" (2.50) UNA fila se tacha con línea crema. Los tres huecos laten en verde.
Etiquetas: "TURNOS PERDIDOS" → "MÁS QUE CANCELADOS".

**s02-no-es** (3.98 s) · "No es la crisis. Ni el precio. Ni que la gente sea informal." Tres
íconos en fila con badge X verde en su palabra (como `../bot-whatsapp/compositions/s02-no-es.html`):
gráfico en baja (crisis 0.31), etiqueta de precio con "$" (precio 1.41), reloj con figurita
que llega tarde (informal 2.81). Rótulos mono debajo. Etiqueta "NADA DE ESO" (3.2).

**s03-manos** (3.73 s) · "Mirá tu sábado: estás con las manos ocupadas, atendiendo a una
clienta." Un sillón de peluquería con la clienta sentada (capa) y vos de pie atrás, con tijera
en una mano y peine en la otra. Arriba un taco "SÁB" que hace pop en "sábado" (0.33). En
"manos ocupadas" (1.93-2.23) las dos manos se marcan con círculos verdes y la tijera corta
(hojas que se abren y cierran). El celular está apoyado en el mostrador a la derecha, chico.
Etiquetas: "SÁBADO" → "MANOS OCUPADAS".

**s04-mensaje** (4.60 s) · "Y en el celular entra un mensaje: ¿Tenés lugar hoy a las seis?"
Un celular grande centrado (chat "Clienta nueva"). En "celular" (1.10) vibra; en "mensaje"
(2.00) entra la burbuja crema con su notificación verde; en "Tenés lugar" (2.97) se lee
"¿Tenés lugar hoy a las seis?". Arriba a la izquierda la tijera chica sigue cortando (seguís
ocupado). Etiquetas: "NUEVO MENSAJE" → "QUIERE UN TURNO".

**s05-una-hora** (7.50 s) · "No podés contestar. Terminás, cobrás, y le escribís una hora
después. Ya reservó con otro. Con el primero que le contestó." El mismo celular. "No podés
contestar" (0-0.5): doble tilde gris, nada. Un reloj al costado: en "Terminás" (1.0) la aguja
empieza a girar; "cobrás" (2.27) pop de una moneda "$"; en "una hora después" (3.3-3.6) "+1 HORA"
verde y tu respuesta tardía "¡Sí! ¿Te queda bien?". En "reservó" (4.6) llega "Gracias, ya
reservé en otro lado." y tu celular se apaga a 0.4 y se corre a la izquierda; a la derecha
aparece otro celular chico "OTRO LOCAL" con respuesta verde instantánea y un "1º" verde en
"primero" (6.1). Etiquetas: "NO PODÉS CONTESTAR" → "UNA HORA DESPUÉS" → "RESERVÓ CON OTRO".

**s06-no-lo-ves** (5.41 s) · "Y ese turno no lo ves. No es una cancelación: es alguien que
nunca llegó a tu agenda." La agenda otra vez. En "turno" (0.30) la fila de las 18:00 se marca
con borde punteado verde; en "no lo ves" (0.6-1.1) se desvanece casi del todo. En
"cancelación" (2.30) aparece a un costado una fila tachada ("CANCELÓ") con badge X. En "alguien
que nunca llegó" (3.3-3.9) una figurita camina hacia la agenda, se frena antes y se desvanece;
la fila 18:00 queda en blanco. Etiquetas: "NO LO VES" → "NUNCA LLEGÓ".

**s07-contas** (3.75 s) · "Las cancelaciones las contás. Los que se fueron sin reservar, no."
Split: a la izquierda "CANCELADOS" con palitos de conteo que se dibujan en "contás" (0.79); a la
derecha "SIN RESPUESTA" con figuritas punteadas tenues que se van en "fueron" (1.99) y un "?"
verde grande en "no" (3.19). Etiqueta "ESOS NO LOS CONTÁS".

**s08-sistema** (5.47 s) · "Y no se arregla contestando con una mano mientras atendés. Se
arregla con un sistema." Una mano con el celular y la otra con la tijera, que tiemblan (malabar).
En "mano" (1.84) badge X verde. En "Se arregla" (3.25) se va con blur y en "sistema" (4.24) el
engranaje se dibuja y gira con punch (como `../el-de-enfrente/compositions/s09-sistema.html`).
Etiquetas: "CON UNA MANO, NO" → "UN SISTEMA".

**s09-bot** (6.57 s) · "Por eso hacemos bots de WhatsApp para comercios. Contesta al
instante, a cualquier hora, con tus horarios y tus precios." Celular centrado con la cabecera
"Tu local" y un puntito verde "en línea". En "bots" (0.47) aparece una carita de bot verde
arriba. En "Contesta" (2.58) entra "¿Tenés lugar hoy?" y en "instante" (3.07) la respuesta verde
inmediata. En "cualquier hora" (4.07) un relojito con luna. En "horarios" (5.37) y "precios"
(6.07) dos renglones dentro de la respuesta: "Abrimos 10 a 20 h" y "Corte y peinado". Etiquetas:
"BOT DE WHATSAPP" → "CONTESTA AL INSTANTE".

**s10-agenda** (6.19 s) · "Le muestra los lugares libres y agenda el turno ahí mismo. Y si la
consulta es para vos, te la pasa." Celular a la izquierda, agenda chica a la derecha. En
"lugares libres" (1.10-1.40) la respuesta del bot muestra tres horarios en chips (16:00, 17:30,
18:00). En "agenda" (1.90) el chip 18:00 se pinta verde, y en "turno" (2.40) una flecha verde
va del celular a la agenda y la fila 18:00 se llena con tilde. En "consulta" (4.30) entra una
pregunta rara ("¿Hacen novias?") y en "te la pasa" (5.1-5.6) la burbuja vuela a una figurita
"VOS". Etiquetas: "LUGARES LIBRES" → "TURNO AGENDADO" → "TE LA PASA".

**s11-llena** (3.45 s) · "Vos seguís atendiendo. Y la agenda se llena sola." A la izquierda,
chico, vos con la tijera cortando junto al sillón (como s03); a la derecha la agenda; en
"llena" (2.31) las filas vacías se llenan una tras otra con tildes verdes. Etiquetas: "SEGUÍS
ATENDIENDO" → "SE LLENA SOLA".

**s12-cta** (5.43 s) · "Comentá TURNOS y te contamos cómo." (la voz termina en 1.9). Cierre como
`../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande, bajada "Bots de WhatsApp para
comercios" y la píldora Comentá "TURNOS" con pulsos finitos. Sin salida con blur.
