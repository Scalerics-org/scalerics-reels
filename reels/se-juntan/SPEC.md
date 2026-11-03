# Reel "Se juntan" — spec

Reel vertical 1080x1920 de Scalerics, formato **motion persuasivo "Convergencia"** (línea de Juan
del 02-11). Producto: **CRM a medida**. Público: dueños y encargados de pymes. Tono adulto, cálido,
humor inteligente; el dueño queda bien parado ("tu memoria anda bien: lo que creció fue el negocio").
Una sola voz: Orus. Locución 59.0 s (acelerada 1.1x con atempo), duración total 62.2 s.

Recurso visual central: **los cuatro lugares donde vive hoy el seguimiento de los clientes**
(CUADERNO, EXCEL, WHATSAPP, POST-ITS), dibujados en líneas crema APAGADAS (crema 0.45 = gris),
flotando torcidos y desordenados. En s08 ("juntalos") vuelan al centro, se enderezan, se achican y
se funden en **un solo panel de clientes** dibujado en crema pleno con acentos verdes: fichas de
cliente, avisos y la lista de "a quién escribirle hoy", con tildes verdes y un cursor.
**Color con significado**: lo desordenado/pendiente en crema apagado y, como marca de "pendiente",
un rojo apagado `#c0564b` (puntitos y signos de pregunta, nunca relleno grande); lo resuelto en verde
de marca `#5ce611`.

Paleta (manda sobre SPEC-base): navy del fondo (index), crema `#efeee5`, verde `#5ce611`, blanco
`#ffffff` (solo para la marca en el CTA), rojo apagado `#c0564b` (solo "pendiente"). Lexend + IBM Plex Mono.

Íconos compartidos (coordenadas locales, centro 0,0; reusalos igual en todas las escenas):
- CUADERNO 220x280: rect rx14, espiral de 6 círculos r9 en el borde izquierdo, 5 renglones tenues.
- EXCEL 280x220: rect rx12, fila de encabezado y grilla de 3 columnas x 4 filas.
- WHATSAPP: celular 160x290 rx28 con barrita y 4 globos de chat (izq/der). Sin logo.
- POST-IT 170x170: cuadrado con la esquina inferior derecha doblada, garabatos adentro.
- CABEZA: perfil de una cabeza de líneas (s06, s07).

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 62.2 (la voz termina en 59.0).

## Escenas (palabras clave en segundos relativos)

**s01-cuatro** (0–5.28) "Cuaderno, Excel, WhatsApp y una pila de post-its. Mirá lo que pasa cuando se juntan."
Gancho: cada objeto entra EN su palabra, torcido y apagado, en las cuatro esquinas de la zona
(cuaderno arriba-izq 0.25, Excel arriba-der 0.70, celular abajo-izq 1.20, pila de 3 post-its
abajo-der 2.10-2.50). El cuaderno ya está a medio dibujar en el cuadro 0. Flotan (deriva seno).
En "Mirá" (3.43) aparece en el centro un punto verde con un anillo que late; en "juntan" (4.40)
los cuatro tiemblan y se acercan un poco al centro (amague, la convergencia de verdad es s08).
Etiqueta: "Tus clientes hoy" (0.3) → "Mirá esto" (3.43).

**s02-cuaderno** (5.28–11.21) "Pero antes, así están hoy. En el cuaderno, el presupuesto que pidió Marisa. Quedaste en llamarla el lunes."
0–1.7: los cuatro íconos chicos en fila, apagados ("así están hoy" 0.70: un leve sacudón).
"cuaderno" 2.12: los otros se van, el cuaderno crece al centro abierto en dos páginas.
"presupuesto" 2.82: se escribe un renglón "Presupuesto"; "Marisa" 3.82: "Marisa ·  cortinas"
con trazo de birome; "lunes" 5.32: "Llamar el lunes" y un puntito rojo apagado al lado (pendiente).
Etiqueta: "Así están hoy" → "El cuaderno" (2.12).

**s03-excel** (11.21–15.76) "En el Excel, quién te compró en marzo. Tres versiones, ninguna al día."
Planilla grande (y 640–1140): encabezado CLIENTE / COMPRÓ / MES, filas que se llenan en "compró"
1.29 con barras tenues; en "marzo" 1.69 la columna MES muestra "marzo". "Tres versiones" 2.09–2.59:
detrás aparecen dos planillas más, corridas, con pestañas `clientes.xlsx`, `clientes (2).xlsx`,
`clientes final.xlsx`. "ninguna al día" 3.09–4.17: sello rojo apagado "SIN ACTUALIZAR" sobre las tres.
Etiqueta: "El Excel" → "Tres versiones".

**s04-whatsapp** (15.76–19.70) "En WhatsApp, el que preguntó por un talle. Le prometiste avisar cuando llegara."
Celular grande (380x600) con chat: globo entrante "¿Tenés el 42 en negro?" en "preguntó" 0.94;
globo saliente "Cuando llegue te aviso" en "prometiste" 2.54; en "llegara" 3.64 entran globos grises
de otros chats que empujan la conversación hacia arriba (se entierra).
Etiqueta: "WhatsApp" → "Te aviso".

**s05-postit** (19.70–22.35) "Y en un post-it: ¿quién era este?"
Post-it grande torcido (pop 0.60); adentro "099 ··· 412" y en "quién" 1.10 se escribe "¿quién era?";
un signo de pregunta rojo apagado late en "este" 1.80. Etiqueta: "El post-it".

**s06-cinco** (22.35–27.53) "Cada venta sigue abierta. Solo que vive en cinco lugares, y el quinto es tu cabeza."
Arriba (y ~650) tarjeta "VENTA ABIERTA" con puntito rojo apagado ("abierta" 0.95). En "vive" 2.05
cuatro líneas punteadas bajan a los cuatro íconos chicos en arco (y ~1050), cada uno con su número
mono 1-4 que aparece hasta "lugares" 2.75. En "quinto" 3.65 aparece el quinto: la CABEZA (perfil),
con el "5" en verde en "cabeza" 4.45. Etiqueta: "Venta abierta" → "Cinco lugares" → "Tu cabeza".

**s07-memoria** (27.53–30.68) "Tu memoria anda bien. Lo que creció fue el negocio."
Izquierda: la cabeza con un tilde verde adentro en "bien" 0.87. Derecha: un local chico que en
"creció" 1.67 crece (escala) y suma un segundo piso, más clientes y cajas. La cabeza no cambia.
Etiqueta: "Tu memoria: bien" → "El negocio creció".

**s08-juntalos** (30.68–36.67) "Ahora sí: juntalos. Cada cliente con su ficha: quién es, qué compró y qué le prometiste."
EL MOMENTO CENTRAL. Arranca con los cuatro objetos apagados y torcidos. "juntalos" 0.84: vuelan al
centro (power3.in), se enderezan y se achican; anillo verde que se expande; se dibuja el panel
(rect 840x600, y 610–1210) con cabecera "Clientes" y punto verde. "ficha" 2.72: entra una ficha:
avatar "MA", "Marisa A."; "quién es" 3.40: "Tel. 099 ··· 318"; "compró" 4.12: "Compró: almohadones";
"prometiste" 5.12: "Prometido: presupuesto de cortinas" en verde. Etiqueta: "Ahora sí" → "Una ficha por cliente".

**s09-avisos** (36.67–43.04) "Marisa, con el lunes marcado y un aviso para llamarla. El talle llegó, y el aviso al cliente sale hoy."
Panel con dos filas de seguimiento. Fila 1: calendario chico; "lunes" 0.93 se marca el día en
verde; "aviso" 1.93 campanita que suena; "llamarla" 2.43 tilde verde "Llamar a Marisa · lunes 10:00".
Fila 2: caja; "llegó" 3.73: "Llegó: talle 42"; "aviso" 4.53: un globo "Ya llegó tu talle" sale de la
fila; "hoy" 5.63: tilde verde "Enviado hoy". Etiqueta: "Aviso agendado" → "Enviado hoy".

**s10-lista** (43.04–45.84) "Cada mañana, una lista corta: a quién escribirle."
Tarjeta "HOY · ESCRIBIRLE A" con tres filas (Marisa A., Diego R., Florencia P.) con casilleros;
"lista" 0.66 entran las filas; "escribirle" 1.86 un cursor hace clic en la primera y se tilda en verde.
Etiqueta: "Cada mañana".

**s11-crm** (45.84–53.18) "Eso es un CRM. En Scalerics lo armamos a medida, para cómo vende tu negocio. Lo que ya sabías, en un solo lugar."
"CRM" 0.46: letras gigantes Lexend 700 crema que caen con golpe. "medida" 2.76: una cinta métrica
de líneas se dibuja debajo, con marcas y la palabra "a medida" en verde. "Lo que ya sabías" 5.06:
los cuatro íconos chicos apagados caen dentro de un cuadrado (el panel) que se cierra con tilde verde
en "lugar" 6.56. Etiqueta: "CRM a medida" → "Un solo lugar".

**s12-cta** (53.18–62.2) "Contanos en los comentarios: ¿dónde vive hoy el seguimiento de tus clientes? ¿Cuaderno, Excel o post-it?"
"Scalerics" en blanco + bajada "CRM a medida para pymes". Una tarjeta-encuesta con tres opciones
que hacen pop en su palabra (Cuaderno 3.92, Excel 4.32, Post-it 5.12), cada una con su ícono chico.
Píldora crema "Contanos en los comentarios" (0.05). Sin salida: el último cuadro queda legible.
