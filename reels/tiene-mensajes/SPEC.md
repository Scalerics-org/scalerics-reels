# Reel "Tiene mensajes": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: CRM. Formato B/D (diálogo de varias voces +
historias de clientes con nombre) en clave de CONTESTADOR AUTOMÁTICO DE LOS 90. Es de noche, el
dueño escucha el contestador en el mostrador. La voz robótica de la máquina (Gemini Kore,
monocorde) arranca bardeándolo: "Tenés catorce mensajes nuevos. Y no te acordás de quién es
ninguno." Bip. Van pasando los mensajes de clientes que se olvidaron (cada uno con su voz y filtro
de teléfono): GRACIELA (Aoede), la de las cortinas, "¿me mandás el presupuesto? Cuando puedas, eh.
Sin apuro."; ERNESTO (Iapetus), "quedamos en que usted me llamaba el lunes. No me dijo qué lunes.";
la NOVIA (Leda), "la de las sillas, me caso el sábado, ¿las sillas vienen?"; el PIBE del talle
(Puck), "entró. Me enteré por tu Instagram". Entre mensaje y mensaje el DUEÑO (Charon, cansado)
murmura: "¿Graciela? ¿Qué Graciela? ¿Le mandé o no le mandé?", "Está en un post-it. O en uno de
estos cinco chats. O en mi cabeza." Mensaje catorce: Graciela otra vez: "Ya está: se lo compré al
de enfrente. Él me llamó." Dueño: "¿Y él cómo se acordó?". GIRO (Orus, narrador, solo al final):
"Te importan. Pero los tenés a todos en la cabeza, y la cabeza no avisa." En Scalerics armamos tu
CRM: quién es cada cliente, qué te compró, qué le prometiste, y te avisa a quién escribirle hoy.
Cierre (Orus): "Etiquetá al que todavía te debe un presupuesto."

Recurso visual central: EL CONTESTADOR (caja de plástico beige con display LCD de 7 segmentos
rojo, luz roja que titila, minicasete con dos carretes que giran, teclas, teléfono de cable en
espiral) y los CLIENTES como FOTOS CARNET dibujadas con su onda de audio roja.

Voz armada de 15 parlamentos (`partes/01..15.txt`, `partes/voces.sh`): `recortar.sh`,
`pausas.mjs`, `componer.mjs` (atempo por parte en `atempo.json`; entre parlamentos `gaps.json`:
un número es silencio y "bip" pega `partes/bip.wav`, el bip de 1040 Hz del contestador). Los
mensajes de clientes pasan por un filtro de teléfono (highpass 380 / lowpass 3400). Tiempos:
Speech-to-Text por parte; `partes/marcas.json` guarda dónde suena cada bip (8.53, 22.30, 29.97,
42.56, 49.37). Locución 71.5 s; reel 74.7 s.

Las escenas se GENERAN: `escenas/lib.mjs` (molde, helpers dibujar/pop/golpe/hablar/onda, el
contestador, el display de 7 segmentos, los post-its, los personajes), `escenas/a.mjs` (s01-s05),
`b.mjs` (s06-s10), `c.mjs` (s11-s15). Para cambiar una escena: editar su .mjs,
`node escenas/hacer.mjs [sNN]` y `node armar.mjs`.

## ESTILO: CONTESTADOR AUTOMÁTICO DE LOS 90 EN EL MOSTRADOR, DE NOCHE, LUZ DE LÁMPARA
Fondo: pared verde oscuro arriba que baja a marrón casi negro, con un círculo de luz cálida de
lámpara arriba a la izquierda (armar.mjs). Capa `ambiente.html`: el MOSTRADOR de madera abajo
(y 1560-1920) con vetas, el cable en espiral del teléfono que cruza, dos post-its pegados en el
borde; el cono de luz de la lámpara que titila apenas; viñeta oscura; y la BARRA DEL CONTESTADOR
arriba (y 116-192): plástico beige con "MENSAJES" y un display rojo con el número del mensaje que
suena (14 → 01 → 02 → 03 → 04 → 14), luz roja que titila y la hora "23:47". Desde s14 la barra
pasa a verde Scalerics ("CRM · AL DÍA") y en s15 el display muestra 00.
Los clientes: FOTO CARNET dibujada (marco beige con borde, fondo verde oscuro, cabeza y hombros,
nombre manuscrito en Caveat abajo) y su ONDA DE AUDIO roja que se mueve mientras habla. Los
textos de pared en POST-ITS amarillos con letra manuscrita (Caveat). Sellos rojos rotados.

## Paleta (SOLO estos colores)
- Marrón noche `#17110c`: fondo, tinta de contornos y caras, ventanas del contestador.
- Marrón madera `#5a3a24`: mostrador, pelo, saco, buzo del dueño.
- Beige plástico `#d8ccb0` y crema `#f6ecd8`: el contestador, marcos de carnet, caras, textos grandes, subtítulos.
- Rojo LCD `#ff3b2a`: dígitos, luz, ondas de audio, sellos, círculos.
- Amarillo post-it `#ffd84a`: post-its, acento de subtítulos, textos que pican.
- Verde oscuro `#1f3328`: pared, fondo de carnets. Desde s14: verde Scalerics `#5ce611` para el CRM.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o marcas (Instagram solo como palabra, el post se dibuja genérico).

## Zona
Barra del contestador y 116-192; subtítulos y 236-420. Contenido de escenas entre y 560 y 1400;
mostrador y 1560+; logo y ~1746.

## SPEC-base (el ESTILO de arriba manda sobre "El lenguaje visual": paleta, sombras y rellenos de este reel)

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



## Escenas (tiempos relativos a cada escena; ver tiempos.md)

### s01-catorce (5.18 s) · gancho
El CONTESTADOR grande en el centro (y ~760-1180), ya a medio dibujar en el cuadro 0. Display "14"
titilando, luz roja. "catorce" 0.36: el 14 se enciende de golpe + sacudón + ping. "nuevos" 1.92:
los carretes arrancan a girar. "Y no te acordás" 2.49: alrededor saltan 4 post-its con
"¿quién?", "¿Gra...?", "¿¿??", "¿el de las...?". "ninguno" 4.35: sello rojo rotado "NI UNO" sobre
el contestador. Etiqueta: ninguna (la barra de arriba ya dice MENSAJES).

### s02-tres-meses (3.95 s)
Primer plano del MINICASETE (ventana con dos carretes grandes girando, la cinta) y display "01".
"Recibido" 0.91: tira LCD "RECIBIDO HACE 3 MESES". "tres meses" 2.07-2.67: un almanaque arranca 3
hojas (AGO, SEP, OCT) que caen. BIP 3.35: "BIP" gigante rojo con ondas + luz.

### s03-graciela (5.91 s)
Foto carnet de GRACIELA (rulos marrón, anteojos rojos con cadenita, blusa amarilla, collar) a la
izquierda; su onda de audio a la derecha que se mueve mientras habla. "cortinas" 1.72: una
cortina dibujada. "presupuesto" 3.0: hoja "PRESUPUESTO · CORTINAS" con sello "PENDIENTE".
"Sin apuro" 4.89: sello amarillo "SIN APURO" y un relojito que gira rápido.

### s04-quien-era (4.08 s)
El DUEÑO (pelo gris revuelto, ojeras, barba de dos días, buzo marrón) bajo la lámpara,
rascándose la cabeza. "¿Graciela?" 0 y "¿Qué Graciela?" 1.37: signos de pregunta. "¿Le mandé o no
le mandé?" 2.28: deshoja una MARGARITA; arriba el cartel alterna "LE MANDÉ" / "NO LE MANDÉ" con
cada pétalo que cae.

### s05-telaranas (3.78 s)
Contestador con display "02". "Hace siete semanas" 1.30: TELARAÑAS que se dibujan en las
esquinas del aparato, una araña que baja colgada, tira LCD "HACE 7 SEMANAS". BIP 3.18.

### s06-ernesto (5.57 s)
Carnet de ERNESTO (boina, bigote gris, anteojos, saco marrón) arriba a la izquierda, onda a la
derecha. "Quedamos" 1.58: un ALMANAQUE de un mes (grilla 7x5, columna "LUN"). "No me dijo qué
lunes" 3.92-4.65: se encierran en rojo TODOS los lunes, uno por uno, y un "¿?" gigante.

### s07-la-boda (7.07 s)
"Mensaje tres": display "03" grande con los carretes (0-1.9), BIP 1.5. "¡Hola!" 2.10: carnet de
la NOVIA (velo, pelo recogido, aros), onda. "sillas" 4.23: una pila de sillas. "sábado" 5.15:
almanaque "SÁBADO" con dos anillos. "¿Las sillas vienen?" 5.81: las sillas tiemblan, "¿VIENEN?"
rojo, la novia con ojos de pánico.

### s08-post-its (5.19 s)
El dueño en el centro. "post-it" 0.84: una pared de post-its le salta alrededor ("llamar a G.",
"¿sillas?", "presup.!!", "Ernesto: lunes", "talle M", "urgente", "¿quién era?"). "cinco chats"
2.27: cinco celulares en abanico con globitos rojos. "cabeza" 4.0: una nube de pensamiento con
un garabato enredado.

### s09-el-talle (6.91 s)
Display "04" y carretes (0-2.3), BIP 1.83. "Te pedí" 2.43: carnet del PIBE (gorra amarilla,
auriculares, buzo rojo), onda. "talle" 3.91: una remera colgada con etiqueta "TALLE M".
"Entró" 4.58: sello "ENTRÓ". "Instagram" 5.86: un celular con un posteo genérico (la remera,
"¡Llegó!", corazón): sin logos.

### s10-catorce (2.33 s)
AVANCE RÁPIDO: el display pasa 05, 06... 14 a toda velocidad, carretes con líneas de velocidad,
"AVANCE RÁPIDO" mono. "catorce" 0.63: el 14 queda fijo y titila. BIP 1.73.

### s11-enfrente (5.16 s)
Carnet de GRACIELA otra vez (brazos cruzados, cara seria, un "2" en la esquina). "Ya está" 1.79:
la hoja del presupuesto cae. "enfrente" 3.05: un local "ENFRENTE" a la derecha con una bolsa de
cortinas. "Él me llamó" 3.80: el teléfono del local suena (ondas) y sello rojo "ÉL ME LLAMÓ".

### s12-como-se-acordo (1.92 s)
Primer plano del dueño: boca abierta, gota de sudor, "¿CÓMO SE ACORDÓ?" amarillo gigante.

### s13-la-cabeza (3.86 s) · el giro (Orus)
Perfil de una CABEZA grande. "importan" 0.09: un corazón. "todos en la cabeza" 1.67-2.10:
adentro de la cabeza se arremolinan las 4 caritas de los clientes y post-its. "no avisa" 3.16:
una campanita tachada en rojo y sello "NO AVISA".

### s14-crm (7.99 s) · Scalerics
Sobre el mostrador una PANTALLA (tablet) con el CRM en verde Scalerics. "CRM" 2.03: título.
"cada cliente" 2.98: filas con las caritas (Graciela, Ernesto, la novia, el pibe) y nombres.
"compró" 3.86: chips "Cortinas", "Sillas", "Remera M", "Cuaderno". "prometiste" 4.82: columna
"Presupuesto", "Llamar lunes", "Confirmar", "Avisar talle". "avisa" 5.79: baja una notificación
verde con campanita "HOY: escribile a Graciela" y su fila se ilumina.

### s15-cta (5.81 s)
"ETIQUETÁ" gigante amarillo; un post-it grande con "@ el que te debe un presupuesto" (Caveat) y
el contestador chico con el display "00" y la luz quieta.
