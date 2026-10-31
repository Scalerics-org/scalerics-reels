# Reel "Respirá hondo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende AUTOMATIZACIONES.
Formato G: SIMULACIÓN DE PANTALLA de una APP DE MEDITACIÓN guiada a las once de la noche
("Meditación nocturna", app inventada, sin marca). La GUÍA (voz Aoede, susurrada) es el CÍRCULO QUE
RESPIRA de la app, con cara: ojos cerrados serenos, se pone roja y con ojos de susto cuando entra
una notificación, se enoja cuando pierde la paciencia. El DUEÑO (voz Charon, cansado: pelo
parado, ojeras lavanda, barba de tres días, buzo durazno, laptop) la interrumpe cada dos frases
con lo que hace a mano: el pedido de la señora de las empanadas a la planilla, avisarle a Gómez
que está listo, copiar y pegar con el mate helado, el recordatorio del turno de mañana, el stock
de la tienda. La guía: "Exhalá. Exhalá el Excel. Esto no es mindfulness: es mind-full." GIRO:
"Vos no necesitás meditar más. Necesitás dejar de hacer a mano lo que se puede hacer solo."
Entra Orus (Scalerics): "En Scalerics lo automatizamos: el pedido de WhatsApp cae solo en la
planilla, el aviso de «está listo» sale solo, y a las once te llega el reporte del día al
celular." Remate: "¿Y ahora qué hago a las once?" / "Dormí, querido. Dormí." Cierre (Orus):
"Etiquetá al que todavía copia y pega a la medianoche."
Voces: `partes/voces.sh` (Gemini, un .txt por parlamento), `partes/compactar.mjs` (recorta puntas
y deja las pausas internas en 0.5 s), `partes/componer.mjs` (atempo guía 1.08, dueño 1.1, Orus 1.1,
silencios entre parlamentos, correcciones de tiempos a mano en FIX). Voz 70.67 s, reel 73.87 s.

## Recurso visual central
La INTERFAZ DE LA APP a pantalla completa (`compositions/ambiente.html`, generada por
`partes/ambiente.mjs`): barra de estado "23:00" con batería en rojo titilando, cabecera
"Meditación nocturna" con el MEDIDOR DE CALMA que baja con cada interrupción (92 → 71 → 48 → 36 →
27 → 18 → 9 → 3 → ERROR en "Excel") y sube a 64 y 100 % en verde cuando Scalerics automatiza;
estrellas que titilan, tres ondas suaves que corren abajo, barra de progreso de la sesión
("SESIÓN · DORMIR SIN PENDIENTES") que se completa en verde al final, y un DESTELLO ROJO en los
bordes en cada alarma. En las escenas: el círculo que respira (se infla con "INHALÁ · 4 3 2 1"),
las NOTIFICACIONES que caen y se apilan encima rompiendo la calma (WhatsApp, planilla, agenda,
tienda, cobros: solo texto y formas genéricas, nada de logos), la planilla PEDIDOS.XLSX.

## Paleta (SOLO estos colores)
- Azul noche `#1d1a3a`: contornos, sombras de texto, pantallas.
- Lavanda `#b9a7f5` / `#c9b8ff`: anillos del círculo, laptop, acento de la guía en subtítulos.
- Durazno `#ffb38a`: buzo del dueño, mate, mejillas, acento del dueño en subtítulos.
- Menta `#8ee6c5`: centro del círculo calmo, globos de WhatsApp, íconos.
- Crema `#fff7ee` (piel `#ffe6d4`): tarjetas, textos.
- Rojo alerta `#ff4757`: el círculo cuando se rompe la calma, bordes de alarma, ¡PARÁ!, MIND-FULL.
- Verde Scalerics `#5ce611`: SOLO desde que entra Scalerics (s12 en adelante).
Fondo (`armar.mjs`): degradé de azul noche (arriba, subtítulos) a lavanda y durazno abajo, con halo
menta detrás del círculo. Acento de subtítulos por voz (`reel.voces`): g guía lavanda, d dueño
durazno, o Scalerics verde.

## Tipos de letra
Lexend 500-900 para textos y UI; IBM Plex Mono 600 para la UI chica (pills, encabezados de
notificaciones, planilla). Nada que haya que leer de menos de 27-28 px.

## Zona
Barra de estado y cabecera de la app (y 30-200, ambiente). Subtítulos en y 236 a ~420. Contenido de
escena entre y 560 y 1540. Ondas y sesión de la app en y 1500-1700 (ambiente). Logo en y 1746.

## Cómo se arman las escenas
`node partes/escenas.mjs [s01 ...]` escribe `compositions/sNN-*.html` y su `.sfx.json` con las
piezas de `partes/lib.mjs` (círculo con cara, dueño, mate, laptop, notificación, planilla, teclas) y
los tiempos de cada palabra (`w(i)` = segundo relativo de la palabra i); después `node armar.mjs`.
Si cambia la voz: `node partes/componer.mjs && node armar.mjs && node partes/escenas.mjs && node
partes/ambiente.mjs && node armar.mjs` (las animaciones se recalculan solas).

---

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


## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-gancho (global 0.00, dura 4.38 s)
Cuadro 0: el círculo con cara serena ya a medio inflar, pill "INHALÁ · 4". "Respirá" 0: se infla. "Estás" 1.46: pill "SOSTENÉ · 4", el círculo aguanta. "pedido" 2.04: cae la notificación de WhatsApp "Nuevo pedido · «¿Me anotás 2 docenas para mañana?»", el círculo se pone rojo y tiembla; "perder" 2.69: ojos de susto. "cabeza" 3.24: segunda notificación con borde rojo "PLANILLA · 3 pedidos sin pasar", el círculo rojo entero, temblor fuerte y sacudón.

### s02-bienvenida (global 4.38, dura 6.28 s)
"Bienvenido" 0: estrellas y luna, "Buenas noches" gigante, el círculo chico con ojos abiertos. "once" 1.67: "23:00 · SESIÓN NOCTURNA". "Cerrá" 3.05: se van los textos, el círculo sube; "ojos" 3.52 cierra los ojos. "Inhalá" 4.45: pill "INHALÁ · 4 3 2 1" y el círculo se infla.

### s03-empanadas (global 10.66, dura 3.87 s)
"Pará" 0: el dueño entra de abajo con la laptop, "¡PARÁ!" rojo gigante, el círculo atrás rojo con cara de susto, sacudón en el segundo "pará". "pedido" 1.36: cae la notificación "WHATSAPP · SRA. DE LAS EMPANADAS · «2 docenas de carne para mañana»"; gota de sudor en "señora". "planilla" 2.91: entra la planilla PEDIDOS.XLSX y aparece la fila "Sra. emp. · 2 doc. · a mano".

### s04-playa (global 14.53, dura 6.11 s)
"Soltá" 0 / "planilla" 0.51: la planilla sale volando y el círculo vuelve a menta, sereno. "Imaginá" 1.94: el círculo sube y es el sol; "playa" 2.49: mar lavanda, arena durazno, palmera que se dibuja. "olas" 3.61: olas que van (3.79) y vienen (5.18); etiqueta "SONIDO · OLAS DEL MAR".

### s05-gomez (global 20.64, dura 3.99 s)
"Como los mensajes" 0: las olas se vuelven globos de WhatsApp que entran como marea ("¿Hay de jamón y queso?", "¿A qué hora cierran?", "¿Me pasás precio?", "Hola", "¿Hacen envíos?"), más en "WhatsApp" 0.82. "¿Le" 1.65: se apagan, entra el dueño; "Gómez" 2.19: globo "GÓMEZ · HACE 3 HORAS · «¿Está pronto lo mío?»" con dos tildes grises, gota de sudor. "listo" 3.19: signo "?" rojo gigante y el círculo chico rojo con susto.

### s06-mate (global 24.63, dura 3.94 s)
"Sostené" 0: el círculo vuelve a menta, pill "SOSTENÉ · 4 3 2 1", tirita aguantando el aire. "Tomá" 1.78: abre los ojos y habla; entra el mate con vapor que se dibuja; "mate" 3.19: etiqueta "AL LADO DE LA COMPU · DESDE LAS 19".

### s07-copiar (global 28.57, dura 4.69 s)
"Está" 0: el mate gigante; "helado" 0.27: copos de hielo, "MATE: HELADO" lavanda. "Copiar" 0.98: teclas gigantes CTRL + C que se apretan, el dueño chico abajo con ojos de robot; "pegar" 1.92 CTRL + V; se repite en 2.78 y 3.78, y en cada golpe aparece una fila igual en la planilla (copiado, pegado...).

### s08-om (global 33.26, dura 2.40 s)
"Repetí conmigo" 0: pill "REPETÍ CONMIGO", el círculo sereno y una flor de loto que se abre debajo. "Om" 1.59: "Ommm" lavanda gigante y ondas menta que salen del círculo.

### s09-alarma (global 35.66, dura 4.96 s)
"Om" 0: el dueño sentado en flor de loto con los ojos cerrados y la laptop en las piernas, el círculo atrás. "recordatorio" 1.18: abre los ojos, salta; cae "AGENDA · Turno de mañana 9:00 · Mandale el recordatorio a Laura" (borde rojo), el círculo rojo con susto. "stock" 3.43: "TIENDA ONLINE · Stock desactualizado"; "tienda" 3.82: se apilan "COBROS · Recordarle el pago a Ramírez", "WHATSAPP · 7 CHATS", "PLANILLA · Pedidos sin pasar"; temblor y sacudón.

### s10-excel (global 40.62, dura 6.28 s)
La guía se enoja (cara de enojo, rojiza). "Exhalá" 0: el círculo se desinfla; aparece una grilla de Excel; "Excel" 1.80: "EXHALÁ EL EXCEL" rojo y el soplido (líneas de viento) hace volar las celdas. "Esto" 2.79: entra una cabeza de perfil lavanda; se llena de íconos de notificaciones; "mindfulness" 3.70: "MINDFULNESS"; "es" 4.40 lo tacha una raya roja; "mind-full" 5.08: "MIND-FULL" rojo cae encima, la cabeza tiembla.

### s11-giro (global 46.90, dura 6.77 s)
"Mirá, querido" 0: el círculo se acerca, ojos abiertos, habla de frente (deja de susurrar). "meditar" 2.03: sello rojo "SESIÓN CANCELADA". "Necesitás" 3.33: el círculo se achica arriba a la izquierda, entra una mano; "mano" 4.44: X roja sobre la mano. "lo que" 4.53: "LO QUE SE PUEDE" y tres engranajes (menta, lavanda, durazno) que giran solos; "solo" 5.55: "HACER SOLO" menta.

### s12-automatico (global 53.67, dura 4.71 s)
Entra Scalerics (verde). "Scalerics" 0.41: "SCALERICS"; "automatizamos" 1.23: "LO AUTOMATIZA" verde con raya. "pedido" 2.16: globo de WhatsApp "«2 docenas de carne»" y la planilla abajo; "cae" 2.82: flecha verde punteada; "solo" 3.36: el globo cae en la planilla y aparece la fila "Sra. emp. · 2 doc. carne · anotado solo"; "planilla" 3.82: tilde verde.

### s13-reporte (global 58.38, dura 4.89 s)
Un celular: chat de WhatsApp con Gómez; "está listo" 0.47: el mensaje "Gómez, tu pedido está listo. ¡Te esperamos!"; "solo" 1.29: tildes en verde y "ENVIADO SOLO". "once" 2.20: la pantalla marca "23:00"; "llega" 2.65: notificación "SCALERICS · 23:00 · Tu reporte del día · Pedidos, ventas y stock: todo al día"; "reporte" 2.93: barras que crecen.

### s14-dormi (global 63.27, dura 4.55 s)
"¿Y ahora qué hago?" 0: el dueño desconcertado, tres "?" lavanda. "Dormí" 1.82: el dueño dormido en la cama con frazada lavanda, el círculo arriba como luna serena que respira, "z z Z" desde "querido" 2.19.

### s15-cta (global 67.82, dura 6.05 s)
"Etiquetá" 0: "@" verde gigante que late; caja de comentario "ETIQUETALO EN LOS COMENTARIOS" con "@el_que_copia_y_pega" que se escribe letra por letra con cursor. "copia" 1.00: teclas CTRL C V que se aprietan en "copia" y "pega"; "medianoche" 2.10: "00:00 · TODAVÍA" lavanda que titila. Queda quieto hasta el final.
