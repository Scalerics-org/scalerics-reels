# Reel "Tres clientes" · spec para los que construyen escenas

Formato E, **pregunta al que mira con revelación** (motion persuasivo, línea de Juan del 02-11).
Producto: **CRM**. Una sola voz: Orus. Rubro: una ferretería de barrio.

Historia: tres tarjetas de cliente, como en un estudio sobrio de marca. A: Elsa, la señora que
viene todos los días, lleva un foco y charla. B: Gustavo, aparece una vez por mes y llena el carro.
C: Walter, pintor, no pisa el local: pide por WhatsApp para sus obras. "¿Cuál te deja más plata?
Pensalo." Pausa real de ~2.5 s en la voz con un **temporizador** en pantalla (3, 2, 1). La
revelación: con la memoria, los tickets y los chats no lo podés saber; cada uno parece el mejor
según el día (lunes Elsa, fin de mes Gustavo, ¿y Walter?). Giro respetuoso: a los tres los conocés
por el nombre, lo que falta es verlos juntos. El CRM: quién compra, qué, cada cuánto y quién dejó
de venir; Walter hace cinco semanas que no pide y nadie lo notó: hoy le escribís. "En Scalerics
armamos ese CRM a la medida de tu negocio." Cierre: "La respuesta está en tus números. Igual, votá
en los comentarios: ¿A, B o C?" (la respuesta NO se revela: es para que voten).

**Recurso visual central: las tres tarjetas de cliente.** Tarjetas de línea crema (rect rx 28,
trazo 5), con la letra A / B / C en IBM Plex Mono 500 verde arriba a la izquierda, un busto de
línea del cliente y el nombre en Lexend 600 crema abajo. Tamaño chico (fila de tres): 280x400,
centros x 210 / 540 / 870. Tamaño grande (presentación): ~520x600 centrado. Los bustos son
siempre los mismos (cabeza r 46, hombros en arco):
- Elsa: rodete arriba (círculo r 18), lentes redondos, cuello en V, sonrisa.
- Gustavo: pelo corto, bigote, campera abierta.
- Walter: gorro de pintor con visera, tiradores de mameluco, dos manchitas verdes en el gorro.
Color con significado: lo que no se sabe o se perdió en crema apagado (0.4) y, solo en el dolor
(Walter que no pide hace cinco semanas), **rojo apagado `#c0625a`**; lo resuelto (el panel, el
aviso, el mensaje enviado) en verde `#5ce611`. Ningún monto ni porcentaje: no se revela quién
deja más plata.

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).

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


## Inicios globales
s01 0 · s02 6.13 · s03 10.78 · s04 14.95 · s05 20.67 · s06 28.77 · s07 33.06 · s08 38.18 ·
s09 41.87 · s10 46.99 · s11 52.86 · s12 56.14 (dura hasta 64.19; la voz termina en 60.99).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-tres** (0–6.13) · "Tres clientes de una ferretería. Uno te deja más plata que los otros dos
juntos. ¿Cuál?" Línea de mesa (y 1170) y las tres tarjetas chicas que se reparten como naipes:
A ya medio dibujada en el cuadro 0, B en "clientes" (0.3), C en 0.6, cada una con un leve giro que
se endereza. En "Uno" (2.11) un marcador verde (corchetes de esquina alrededor de la tarjeta) salta
A → B → C → A al ritmo de "deja", "plata", "otros" como una ruleta; en "juntos" (4.2) se queda
temblando entre las tres. En "¿Cuál?" (5.33) el marcador se va y sobre cada tarjeta hace pop un "?"
verde. Etiqueta: "TRES CLIENTES" → "¿CUÁL DEJA MÁS?".

**s02-elsa** (6.13–10.78) · Tarjeta A grande (520x600, centro 540,920). En "A" (0.37) punch de la
letra; en "Elsa" (0.79) el nombre. En "todos los días" (1.77) una tira de 6 días L M M J V S debajo
del busto con tildes crema que se marcan en cascada. En "foco" (2.87) una lamparita dibujada a la
derecha del busto; en "charla" (3.37) un globito de diálogo con tres puntitos que laten.
Etiqueta: "CLIENTE A" → "TODOS LOS DÍAS".

**s03-gustavo** (10.78–14.95) · Tarjeta B grande. En "Gustavo" (0.72) nombre. En "una vez por mes"
(2.02) un calendario chico de un mes (grilla 7x4 de puntitos) con un solo día marcado en círculo.
En "llena el carro" (2.82) un carrito de ferretería a la derecha y caen en él cajas, una lata y un
rollo de manguera, con pops. Etiqueta: "CLIENTE B" → "UNA VEZ POR MES".

**s04-walter** (14.95–20.67) · Tarjeta C grande corrida a la izquierda (centro x 360) para hacer
lugar a un celular a la derecha (x 700–960). En "Walter" (0.9) nombre; en "pintor" (1.35) un
rodillo en la mano que pinta una franja. En "No pisa el local" (2.45) una puertita de local con un
caminito punteado que no llega. En "WhatsApp" (4.05) el celular con globos entrantes: "20 L de
látex", "3 rodillos", "para la obra del lunes". Etiqueta: "CLIENTE C" → "PIDE POR WHATSAPP".

**s05-pensalo** (20.67–28.77) · Las tres tarjetas chicas en fila arriba (y 640–1000, escala 0.85).
En "Pensalo" (1.34) aparece un temporizador circular (centro 540,1140, r 78): anillo verde que se
vacía en 3 s y número grande 3 → 2 → 1 (1.6, 2.6, 3.6) con tic. En "¿Ya" (4.26) el anillo cierra
y el número cambia a una tilde. En "difícil" (5.73) el temporizador se va y una lupa grande se
dibuja sobre las tarjetas; en "¿cómo" (6.74) adentro de la lupa hace pop un "?" y las tarjetas
bajan a 0.45. Etiqueta: "PENSALO" → "¿CÓMO LO SABÉS?".

**s06-memoria** (28.77–33.06) · Lo que tenés hoy, todo en crema apagado: una cabeza de perfil con
nube de pensamiento (en "memoria" 0.23), una pila de tickets enrulados (en "tickets" 0.73), un
celular con burbujas (en "chats" 1.43), en fila a la altura y 680–900. En "cada uno" (2.1) abajo
entran las tres tarjetas chicas (escala 0.6) y una coronita verde salta de A a B a C ("parece",
"mejor", "día"). Etiqueta: "MEMORIA · TICKETS · CHATS" → "SEGÚN EL DÍA".

**s07-segun-el-dia** (33.06–38.18) · Tres tarjetas chicas (y 780–1180) y arriba una hoja de
calendario que cambia: en "lunes" (0.09) dice "LUNES" y la corona verde se posa en A; en "fin de
mes" (1.34) la hoja da vuelta, dice "FIN DE MES" y la corona salta a B. En "¿Y Walter?" (2.64) la
hoja dice "¿?" y C baja a 0.4; en "¿Cuándo" (3.41) debajo de C un relojito rojo apagado con "?".
Etiqueta: "LUNES: ELSA" → "FIN DE MES: GUSTAVO" → "¿Y WALTER?".

**s08-juntos** (38.18–41.87) · El giro. El dueño (busto con delantal, centro) y en "conocés" (0.52)
tres globitos con los nombres "Elsa", "Gustavo", "Walter" con tilde verde. En "falta" (1.92) el
dueño se apaga y las tres tarjetas, desparramadas y torcidas, se acomodan derechas en fila; en
"juntos" (2.72) un marco verde se dibuja alrededor de las tres. Etiqueta: "LOS CONOCÉS" →
"VERLOS JUNTOS".

**s09-crm** (41.87–46.99) · Panel del CRM a pantalla completa (laptop de líneas, pantalla x 120–960,
y 660–1150). Título "TUS CLIENTES" en mono verde. Columnas: CLIENTE · COMPRA · CADA · ÚLTIMA.
En "CRM" (0.53) se dibuja el panel; en "quién" (1.71) entran las filas con avatar y nombre; en
"qué" (2.65) "Focos, cinta" / "Herramientas" / "Pintura"; en "cada cuánto" (3.13) "Diario" /
"Mensual" / "Semanal"; en "dejó de venir" (4.03) la última columna: "Hoy" / "Hace 9 días" y
"Hace 5 sem." en rojo apagado, con la fila de Walter subrayada. Etiqueta: "TU CRM".

**s10-walter-aviso** (46.99–52.86) · Tarjeta C a la izquierda (centro x 330) con el busto apagado y
debajo un sello rojo apagado "HACE 5 SEMANAS" en "cinco semanas" (1.91). En "Nadie" (3.67) tres
puntitos grises que no llegan a nada (nadie le escribió). En "Hoy" (4.74) aparece a la derecha un
aviso verde "ESCRIBILE A WALTER" y en "escribís" se manda un mensaje verde "Hola Walter, ¿cómo vienen
las obras?" con doble tilde; Walter se prende. Etiqueta: "NADIE LO NOTÓ" → "HOY LE ESCRIBÍS".

**s11-a-medida** (52.86–56.14) · Panel chico centrado con las tres filas; en "medida" (1.84) una
cinta métrica de ferretería verde se desenrolla a lo largo del borde superior del panel con sus
rayitas; en "negocio" (2.34) arriba del panel se dibuja el toldo de la ferretería. Etiqueta:
"CRM A MEDIDA".

**s12-cta** (56.14–64.19) · "La respuesta está en tus números" (0–1.3): las tres tarjetas chicas y
debajo tres barritas tapadas por una cortina punteada con "?" (no se revela). En "votá" (2.56) un
campo de comentario (rect redondeado) con cursor que titila; en "A" (3.72), "B" (4.06), "C" (4.51)
cada tarjeta hace punch con el marco verde y su letra se escribe en el comentario ("A", "B", "C"
alternando). Hasta el final el cursor titila y las tarjetas respiran. Etiqueta: "VOTÁ" →
"A, B O C".
