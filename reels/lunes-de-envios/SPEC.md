# Reel "Lunes de envíos" · spec

Reel vertical 1080x1920 de Scalerics, formato **motion persuasivo "Caos → control"** (línea de
Juan del 02-11). Producto: **automatizaciones** para una tienda que vende online (envíos y avisos).
Público: dueños y encargados de pymes que venden bien por su tienda, Instagram y WhatsApp. Tono
adulto, cómplice, humor inteligente. Giro respetuoso: vender así es un logro; lo que no tiene
sentido es pagar el éxito con una mañana de copiar y pegar. Voces: Orus (narrador) y una línea
corta de clienta con Leda ("¿Y cuándo me llega?"). Locución 61.1 s (acelerada 1.1x con atempo),
duración total 64.3 s.

Recurso visual central: **las tarjetas de pedido** (rect 300x120 rx16, número mono "#1041",
nombre, canal) que llueven de tres canales (TIENDA, INSTAGRAM, WHATSAPP) y se apilan torcidas en
crema APAGADO (gris), y que en s09, cuando se prende el interruptor "Automatizaciones", vuelan y
se acomodan solas en **una lista de pedidos** con tildes verdes. El cierre (s12) es el panel del
lunes resuelto: columnas ENTRÓ / ETIQUETA / AVISO, todo tildado en verde.
**Color con significado**: lo pendiente y lo que salió mal en crema apagado y rojo apagado
`#c0564b` (puntitos, contadores, la etiqueta cruzada; nunca relleno grande); lo resuelto en verde de
marca `#5ce611`.

Paleta (manda sobre SPEC-base): navy del fondo (index), crema `#efeee5`, verde `#5ce611`, blanco
`#ffffff` (solo la marca en el CTA), rojo apagado `#c0564b` (solo pendiente/error). Lexend + IBM
Plex Mono. Sin logos de DAC, Correo, Instagram ni WhatsApp: solo los nombres en texto y
íconos genéricos (ventana de navegador, grilla de fotos, globo de chat).

Personajes y datos de la historia (inventados): Sofía R. (Av. Rivera 2345), Florencia (el buzo),
Martín G. (Bv. Artigas 1180). 32 pedidos: 12 de la tienda, 14 de Instagram, 6 por WhatsApp.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 64.28 (la voz termina en 61.08).

## Escenas (palabras clave en segundos relativos)

**s01-gancho** (0–3.95) "Vendiste todo el fin de semana. Ahora alguien tiene que armar los envíos."
Izquierda: celular (260x540) con cabecera "SÁB · DOM" y avisos "Venta nueva" que se apilan con
punto verde (0.0 ya a medio dibujar, 0.35, 0.7, 1.05, 1.24 "semana"). Derecha: en "armar" 2.84 /
"envíos" 3.10 caen cajas vacías de líneas, una encima de otra, apagadas, con un "?" rojo apagado.
Etiqueta: "Fin de semana" (0.3) → "Lunes: envíos" (2.84).

**s02-lunes** (3.95–7.23) "Lunes, ocho de la mañana. Treinta y dos pedidos."
Reloj digital gigante "LUN" (0) y "08:00" (pop en "ocho" 0.71) Lexend 700. En "Treinta" 1.75 un
contador debajo sube de 0 a 32 hasta "pedidos" 2.40, con "PEDIDOS" mono; detrás se apilan
tarjetas de pedido apagadas. Etiqueta: "Lunes 08:00" → "32 pedidos" (2.40).

**s03-tres-lados** (7.23–10.25) "Doce de la tienda, catorce de Instagram, seis por WhatsApp."
Tres canales arriba (y ~700): ventana de navegador TIENDA, grilla de fotos INSTAGRAM, globo de chat
WHATSAPP; cada uno con su número grande ("12" en 0.0, "14" en 0.77, "6" en 1.87). De cada canal
llueven tarjetas a una pila torcida y apagada abajo (y 950–1200). Etiqueta: "Tres canales".

**s04-planilla** (10.25–17.70) "Y vos los pasás a mano, uno por uno, a la planilla. Copiar el nombre. Copiar la dirección. Copiar el teléfono."
Izquierda: pila de tarjetas; derecha: planilla NOMBRE / DIRECCIÓN / TEL con contador "0/32".
Un cursor lleva cada pedido de la pila a una fila: filas en "uno" 1.65, "uno" 2.29, "planilla"
2.74 (contador 1/32, 2/32, 3/32). Desde 3.90 la cuarta fila se llena campo por campo: en cada
"Copiar" (3.90, 4.49, 5.55) las teclas "Ctrl C" / "Ctrl V" se hunden y el cursor viaja; el campo se
escribe en "nombre" 4.35 ("Sofía R."), "dirección" 5.45 ("Av. Rivera 2345"), "teléfono" 6.85
("099 ··· 218"). Contador 4/32. Etiqueta: "A mano" → "Uno por uno" (1.65) → "Copiar y pegar" (3.90).

**s05-etiquetas** (17.70–20.30) "Escribir cada etiqueta de DAC o del Correo."
Caja grande de líneas con la etiqueta al frente; se escribe a mano "Para: Sofía R." (0.6) y
"Av. Rivera 2345" (0.9); arriba de la etiqueta aparece "DAC" (1.50) y se cambia por "CORREO" (2.10).
Al costado, pila de etiquetas en blanco con "5/32" rojo apagado. Etiqueta: "Etiqueta a mano".

**s06-avisos** (20.30–26.71) "Avisarle a cada cliente que ya salió su pedido. Y contestar la pregunta de siempre. ¿Y cuándo me llega?"
Celular grande (420x610) con chat. Cabecera "Sofía R."; globo saliente "Hola Sofía, ya salió tu
pedido" se escribe en "salió" 1.80. La cabecera cambia a "Martín G." y "Lucía P." (2.4, 2.8) y el
mismo globo se repite (uno por uno). En "pregunta" 3.75 entra un globo gris "¿Cuándo llega?"; en
"¿Y cuándo me llega?" (4.99–5.55) entran tres más de distintos nombres y un contador rojo apagado
de no leídos sube. Etiqueta: "Uno por uno" → "La de siempre" (3.75).

**s07-catorce** (26.71–32.32) "Catorce veces. Y en el medio, el buzo de Florencia sale con la dirección de Martín."
"×14" gigante con contador 1→14 (0–0.64) y globos chicos que se acumulan. En "medio" 1.89 se va;
entra una caja con tarjeta "Buzo · Florencia" ("buzo" 2.49, "Florencia" 2.89); en "sale" 3.49 la
caja arranca hacia la derecha con líneas de velocidad; en "dirección" 4.03 la etiqueta dice
"Para: Martín G." en rojo apagado y un círculo rojo apagado marca el cruce en "Martín" 4.53.
Etiqueta: "14 veces" → "Paquete cruzado" (3.49).

**s08-logro** (32.32–39.95) "Vender así es un logro. El negocio anda. Lo que no tiene sentido es pagar el éxito con una mañana de copiar y pegar."
EL GIRO. Un gráfico de ventas que sube en verde (0–1.0) con punto final que late en "logro" 0.78;
"anda" 2.08: tilde verde. En "Lo que no tiene sentido" 3.06 el gráfico se achica arriba; en "pagar"
4.48 cuelga de la punta una etiqueta de precio que se balancea; en "mañana" 5.58 adentro aparece
"08:00 → 12:00" y un relojito que gira; "copiar" 5.98 y "pegar" 6.52: teclas Ctrl C / Ctrl V.
Etiqueta: "Un logro" (0.78) → "El precio" (4.48).

**s09-se-ordena** (39.95–47.34) "Mismo lunes, mismas ventas, con automatizaciones. Cada pedido entra solo a una lista, venga de donde venga."
Arriba "LUN 08:00 · 32 PEDIDOS"; la pila apagada de tarjetas. "automatizaciones" 2.05: un
interruptor se prende (perilla corre, se pone verde, anillo verde). En "Cada pedido" 4.01 las
tarjetas vuelan y se acomodan en una lista (panel 800x520) con su canal; "venga de donde venga"
5.85–6.65: los chips TIENDA / INSTAGRAM / WHATSAPP se encienden en verde y cada fila tiene punto verde.
Etiqueta: "Mismo lunes" → "Automatizado" (2.05) → "Una sola lista" (4.01).

**s10-sola** (47.34–52.42) "La etiqueta se genera sola. El aviso con el seguimiento le llega solo al cliente."
Izquierda: una etiqueta sale sola de una ranura (se desliza) ya llena: "DAC", "Para: Sofía R.",
"Av. Rivera 2345", código de barras; tilde verde en "sola" 1.16. Derecha: celular; en "aviso" 2.22
entra un globo "Tu pedido salió. Seguimiento: DAC 0042"; tilde verde "Enviado" en "cliente" 4.16.
Etiqueta: "Etiqueta sola" → "Aviso solo" (2.22).

**s11-cajas** (52.42–54.76) "Y vos solo armás las cajas."
La dueña dibujada en líneas (cabeza, pelo atado, torso, brazos) cierra una caja; a su lado se
apilan cajas prolijas con tilde verde en "solo" 0.61, "armás" 0.93, "cajas" 1.42.
Etiqueta: "Vos: las cajas".

**s12-cta** (54.76–64.28) "En Scalerics hacemos estas automatizaciones para tu tienda. Etiquetá a quien se pasa los lunes escribiendo etiquetas."
"Scalerics" Lexend 700 blanco arriba (0.14) y bajada "Automatizaciones para tu tienda" (1.54).
Panel del lunes resuelto: "LUNES · 32 PEDIDOS", columnas ENTRÓ / ETIQUETA / AVISO, 4 filas con
tildes verdes en cascada. En "Etiquetá" 3.70 una píldora crema "Etiquetá al de las etiquetas".
Sin salida: el último cuadro queda legible.
