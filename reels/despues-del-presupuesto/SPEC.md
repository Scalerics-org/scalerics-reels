# Reel "Después del presupuesto" — spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Formato: **consejo de colega en 3 hábitos**, como el segmento de consejos de un programa de
negocios, con **números de capítulo gigantes** (1, 2, 3) que entran de golpe como en `el-golpe`,
pero sobrios y en verde de marca. Tema: **consejo de gestión** (seguimiento de presupuestos);
Scalerics aparece solo al final con el **CRM a medida**. Una sola voz: Orus (Gemini, acelerada
1.08x con atempo, silencios de punta recortados). Locución 58.2 s, total 61.4 s.

Historia: un martes, una carpintería manda el presupuesto de un placard; la clienta (Laura G.)
contesta "Buenísimo, lo veo y te aviso". Lo que hacen las pymes que crecen: 1) anotan a quién y
cuándo, en un lugar fijo (no en un post-it que se despega); 2) le ponen fecha a volver a escribir
y escriben, con una pregunta útil ("¿Lo querés con puertas corredizas?") y no un "¿y? ¿lo
pensaste?"; 3) si es no, preguntan por qué y lo anotan (precio, plazo, madera). Giro: si se te
pasó, tranquilo, oficio de vendedor tenés: al seguimiento le falta un lugar donde vivir. Cierre:
CRM a medida de Scalerics, cada presupuesto con su fecha y su respuesta y el aviso de a quién
escribirle cada mañana. "Mandáselo a tu socio. Al que siempre dice: ya van a llamar."

## Recurso visual central
- **Números de capítulo**: "1", "2", "3" en Lexend 800, 560 px, relleno verde `#5ce611`, con
  "HÁBITO" mono crema encima. Entran con golpe (scale 1.5→1, opacity, power4.out, impact-bass) y,
  en la palabra que arranca el contenido, se achican a badge arriba a la izquierda de la zona
  (~x 175, y 700) y quedan ahí toda la escena.
- **Color con significado**: lo que se pierde (post-it, "¿y? ¿lo pensaste?", pendiente) en crema
  apagado (0.4) y, solo en puntitos/tachaduras, rojo apagado `#c0564b`; lo resuelto en verde.
- Objetos que se repiten igual: **presupuesto** (hoja 320x440 rx 16, encabezado mono
  "PRESUPUESTO", renglones, línea de total "$ ····"), **placard** (rect 280x400, dos puertas,
  manijas, zócalo), **celular** (rx 52, barrita), **ficha** (tarjeta rx 20 con renglones mono).

## Capa `compositions/ambiente.html` (track 4, toda la duración)
Encabezado de estudio arriba de los subtítulos (y 120-190): izquierda punto verde + "CONSEJOS
PARA PYMES" (mono 24, crema 0.7); derecha "EL DÍA DESPUÉS" → "HÁBITO 1/3" (13.07) → "2/3"
(19.51) → "3/3" (28.34) → "SCALERICS · CRM" (43.66); debajo, línea tenue con tres segmentos que se
llenan de verde en cada hábito.

Paleta (manda sobre SPEC-base): navy del fondo (index), crema `#efeee5`, verde `#5ce611`, blanco
(solo la marca en el CTA), rojo apagado `#c0564b` (solo "se pierde"). Lexend + IBM Plex Mono.

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


## Escenas (tiempos relativos; ver `tiempos.md`)

**s01-gancho** (3.77) "Lo que hacen las pymes que crecen el día después de mandar un presupuesto."
Presupuesto a la izquierda (x 230-550), ya a medio dibujar en el cuadro 0. "crecen" 1.0: tres
barras verdes que suben al pie de la hoja. "día" 1.5: hoja de calendario a la derecha (x 620-860)
con "MAR"; "después" 1.8 la hoja se da vuelta y dice "MIÉ" en verde. "mandar" 2.2: sello verde
"ENVIADO" con tilde sobre el presupuesto. Etiqueta: "Consejo de gestión" → "El día después" (1.5).

**s02-placard** (3.35) "Un martes, una carpintería manda el presupuesto de un placard."
Píldora "MARTES 10:40" (0.18). Placard de líneas a la izquierda + cartel "CARPINTERÍA" (0.83).
"manda" 1.33: flecha verde punteada hacia la derecha y entra la hoja de presupuesto; "placard"
2.53 se escribe "Placard · 2 puertas". Etiqueta: "Martes" → "Presupuesto enviado" (1.33).

**s03-te-aviso** (5.95) "La clienta contesta: Buenísimo, lo veo y te aviso. Ahí empieza la parte que casi nadie mira."
Celular al centro; puntitos de escribiendo (0.3); globo "Buenísimo, lo veo y te aviso." (1.38).
"Ahí" 3.61: el celular se achica a la izquierda; a la derecha una línea de días MIÉ · JUE · VIE ·
LUN, punteada y apagada; "nadie" 4.98 una lupa verde recorre la línea ("mira" 5.18).
Etiqueta: "La clienta" → "Te aviso" → "Lo que nadie mira" (3.61).

**s04-habito-uno** (6.44) "Hábito uno: anotan a quién se lo mandaron y cuándo. En un lugar fijo, no en un post-it que se despega."
"1" gigante (0). "anotan" 1.01: badge; ficha: "Placard · 2 puertas", "Para: Laura G." (quién
1.53), "Enviado: martes 10:40" (cuándo 2.63). "lugar fijo" 3.63: debajo se dibuja un cajón
"PRESUPUESTOS" y la ficha recibe tilde verde. "post-it" 4.73: post-it apagado torcido a la
derecha; "despega" 5.53 se despega y cae girando, se apaga. Etiqueta: "Hábito 1" → "Anotan" →
"Un lugar fijo".

**s05-habito-dos** (3.82) "Hábito dos: le ponen fecha a volver a escribir. Y escriben."
"2" gigante (0). "ponen" 0.99: badge; semana de calendario (LUN-DOM, dos filas), en MAR un
mini presupuesto. "fecha" 1.29: círculo verde alrededor de VIE + chip "Volver a escribir".
"escriben" 2.99: sale un globo verde con tilde desde VIE. Etiqueta: "Hábito 2" → "Ponen fecha" →
"Y escriben".

**s06-pregunta** (5.01) "No un ¿y? ¿lo pensaste? Algo útil: ¿Lo querés con puertas corredizas?"
Globo apagado "¿Y? ¿Lo pensaste?" (0.27), tachado rojo apagado (1.07) y se apaga. "útil" 2.37:
globo con borde verde "¿Lo querés con puertas corredizas?" que se escribe (3.10). Debajo el placard;
"corredizas" 3.87: la puerta izquierda se desliza con flechitas verdes. Etiqueta: "Así no" →
"Una pregunta útil".

**s07-habito-tres** (4.52) "Hábito tres: si la respuesta es no, preguntan por qué. Y lo anotan."
"3" gigante. "si" 0.93: badge; globo entrante "Esta vez no, gracias." (no 1.66); globo saliente
verde "¿Me contás qué pesó más?" (preguntan 2.25); ficha "Motivo:" que se escribe "plazo" en
"anotan" 3.66. Etiqueta: "Hábito 3" → "Preguntan por qué" → "Y lo anotan".

**s08-motivos** (4.07) "Precio, plazo, madera: así el próximo presupuesto sale mejor."
Tres chips a la izquierda PRECIO (0), PLAZO (0.34), MADERA (0.84). "próximo" 1.84: flechas al
presupuesto nuevo que se dibuja a la derecha; "mejor" 3.04 tilde verde y barrita que sube.
Etiqueta: "Lo que aprendés" → "El próximo, mejor".

**s09-oficio** (6.73) "Si alguna vez se te pasó, tranquilo: oficio de vendedor tenés. Lo que le falta al seguimiento es un lugar donde vivir."
El carpintero de líneas (delantal, lápiz en la oreja, metro en la mano). "tranquilo" 0.97: tilde
verde a su lado; "oficio" 2.24: escarapela verde "OFICIO" en el delantal. "Lo que" 3.90: se corre a
la izquierda y se apaga un poco; a la derecha tres presupuestos sueltos flotando; "lugar" 5.47:
una casita punteada vacía; "vivir" 5.97 los presupuestos se acercan a la casita. Etiqueta:
"Tranquilo" → "Oficio tenés" → "Le falta un lugar".

**s10-crm** (3.88) "En Scalerics armamos ese lugar: un CRM a medida."
La casita punteada se vuelve sólida y los presupuestos entran como filas ("armamos" 0.54).
"CRM" 2.24: letras gigantes crema que caen; "medida" 2.94: cinta métrica verde que se dibuja.
Etiqueta: "Ese lugar" → "CRM a medida".

**s11-panel** (7.21) "Cada presupuesto con su fecha y su respuesta, y cada mañana te avisa a quién escribirle. Y el placard del martes no queda en el aire."
Panel "PRESUPUESTOS" con 3 filas (Placard · Laura G., Cocina · Marcos R., Vestidor · Ana P.),
columnas FECHA (0.96) y RESPUESTA (1.36). "mañana" 2.46: aviso "HOY · ESCRIBIRLE A Laura G." con
campanita (avisa 3.06) y cursor que hace clic (3.66). "placard" 4.86: la fila 1 se resalta;
"queda" 6.16: pasa de "pendiente" a "respondió" con tilde verde. Etiqueta: "Cada presupuesto" →
"Te avisa" → "No queda en el aire".

**s12-cta** (6.65) "Mandáselo a tu socio. Al que siempre dice: ya van a llamar."
"Scalerics" en blanco + "CRM a medida para pymes". El socio (busto de líneas) con un globo
apagado "Ya van a llamar." (2.47) y un relojito; una flecha de compartir verde hacia él (0).
Píldora crema "Mandáselo a tu socio" (0.05). Sin salida: el último cuadro queda legible.
