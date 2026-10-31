# Reel "Unboxing": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): UNBOXING / REVIEW DE YOUTUBER.
Un youtuber de tecnología canchero (voz Puck) hace el unboxing de "mi nuevo empleado": un agente
de IA para su restaurante. Gancho: "Hoy hacemos el unboxing de mi nuevo empleado. Y viene sin
horario de almuerzo." "Dale like y suscribite. Y escuchen este cartón" (ASMR). Lo que NO trae la
caja: horario, vacaciones, el famoso "te contesto el lunes". Prueba en vivo a las once de la noche:
le escribe una clienta (Leda) "¿tienen mesa para cuatro el sábado?" y el agente (Kore) contesta al
instante, pide el nombre y confirma la reserva ("Lucía. ¡Qué rápido!"). Después el agente le
escribe SOLO a Martín, que ayer preguntó por el menú del cumple y no reservó. Contras de la
review: "no barre. Y te deja sin excusas". GIRO: "Yo esperaba un robot frío, de esos de «marque
uno». Y me salió el mejor empleado del local. Por primera vez en años, ceno con mi familia."
Puntaje: cinco estrellas; "no es contenido patrocinado. Bueno... un poco". Entra Orus
(Scalerics): "Es un agente de IA que atiende tu WhatsApp como un empleado más, a cualquier hora.
Lo hacemos nosotros, en Scalerics." Cierre: "¿Cuántas estrellas le das? Comentá del uno al cinco."
Voz de 69.4 s (cuatro voces, partes en `partes/`, armadas con `partes/unir.mjs`), video de 72.6 s.

## ESTILO: SET DE YOUTUBER (review de tecnología). Edición CARGADA.
Estudio oscuro con una LUZ DE ARO detrás (el anillo blanco tenue del fondo, centrado en 540,930),
una mesa de review, la CAJA DE CARTÓN protagonista, el youtuber dibujado (gorro rojo con pompón,
cara blanca plana, buzo gris oscuro, auriculares amarillos al cuello), el AGENTE dibujado como un
globo de chat blanco con ojos y sonrisa, celulares a pantalla casi completa con el chat, tarjetas
de PROS y CONTRAS, ESTRELLAS amarillas, botones de like y suscribirse GENÉRICOS (un pulgar
dibujado, una píldora roja: nada de logos reales, el play es un triángulo genérico). Ilustración
plana con relleno y contorno (no líneas crema): rellenos de la paleta y contorno negro o blanco.
Palabras gigantes que caen en su palabra exacta, stickers que se pegan girados, sacudones. Nada
quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Negro estudio `#141417` / `#0e0e11` (y gris buzo `#2a2930`): fondos de tarjeta oscura, celulares, contornos.
- Rojo play `#ff3d3d`: gorro, botón suscribirse, sellos, tachones, "EN VIVO", contras.
- Blanco `#f7f5f0`: textos grandes, cara, globos de chat de la clienta, tarjetas.
- Amarillo estrella `#ffc83d`: estrellas, likes, lo bueno, acentos de subtítulos.
- Cartón `#c89a5e` (sombra `#8a6439`, tapa `#d9b07a`, cinta `#e8c48f`): la caja y los globos del agente.
- Solo en s14 (Scalerics): verde `#5ce611` para el sello de Scalerics.
Subtítulos con etiqueta de quién habla: EL YOUTUBER (rojo), EL AGENTE DE IA (cartón), LA CLIENTA
(blanco), SCALERICS (verde). Palabras del agente en cartón claro.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos y horas; Lexend 500-600 para el
chat. Nada que haya que leer de menos de 26px.

## Zona
Subtítulos arriba (y 186 a ~430). Contenido entre y 560 y y 1520, x 50-1030. Abajo: la barra de
reproducción (y 1626-1692) y el logo (y 1746) los pone `ambiente.html` / `index.html`.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo negro de estudio con la luz de aro.
- `compositions/ambiente.html`: viñeta, barra de reproducción roja que avanza con marcas de
  capítulo, "UNBOXING · MI NUEVO EMPLEADO", REC que titila; FLASH en 0.8, 31.4, 53.0 y 64.7.
- Las escenas se escriben a mano en `compositions/` (helpers comunes copiados en cada una:
  `dibujar`, `pop`, `golpe`, `sacudon`, `escribir`, `hablar` para mover la boca del youtuber).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el set de youtuber con la paleta de
> arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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


## Escenas
Tiempos exactos por palabra en `tiempos.md` (segundos relativos a cada escena).

**s01-unboxing** (4.60). Mesa de review (franja gris con borde blanco, y 1300). El youtuber detrás
(cabeza en 540,760) habla 0-4.3. La CAJA de cartón cerrada en la mesa. 0.82 "unboxing": píldora
roja gigante "UNBOXING" que cae girada arriba a la izquierda con sacudón (flash del ambiente). 1.91
"empleado": en la etiqueta blanca de la caja se escribe "MI NUEVO EMPLEADO". 2.8 la caja da un
saltito. 3.85 "almuerzo": sello rojo "SIN HORARIO DE ALMUERZO" sobre la caja.

**s02-like** (2.86). Un botón de like GENÉRICO (círculo oscuro con pulgar blanco) y la píldora roja
"SUSCRIBIRME". 0.19 "like" un cursor lo clickea: el pulgar se vuelve amarillo y sale "+1". 0.64
"suscribite": clickea la píldora, pasa a gris "SUSCRIPTO". 1.43-2.1 "escuchen este cartón": abajo,
la tapa de la caja de cerca con la cinta que se despega, ondas de sonido y "ASMR DEL CARTÓN".

**s03-caja** (6.61). La caja ABIERTA abajo (solapas arriba). Píldora roja "NO INCLUYE" (0.82
"caja"). 2.0 "horario": sale un reloj de la caja y le cae una prohibición roja; 3.18 "vacaciones":
una sombrilla de playa y prohibición; 4.67-5.82: un globo de chat "te contesto el lunes" que se
tacha con una X roja gigante en "lunes" y sacudón.

**s04-en-vivo** (3.26). Insignia roja "PRUEBA EN VIVO" con punto que titila (0.42 "vivo"). 0.96
"Once": reloj mono gigante "23:00" que cae, luna amarilla y estrellitas. 1.86 "escribe": un
celular abajo se prende con una notificación "Lucía: Hola, ¿tienen mesa...".

**s05-pregunta** (2.60). Celular grande (x 250-830, y 590-1500), chat con "Lucía". 0.0-1.8 se
escribe el globo blanco "Hola, ¿tienen mesa para cuatro el sábado?" con hora 23:04. 2.1 el
agente "escribiendo..." (tres puntitos). Sin salida (corte seco a s06, mismo celular).

**s06-respuesta** (6.00). El mismo celular. 0.0 globo cartón del agente "¡Hola! Sí, a las nueve.
¿A nombre de quién la reservo?" (cae en 0.0 y se completa en 1.81), sticker rojo "AL INSTANTE"
pegado en la esquina del celular. 3.49 globo de Lucía "Lucía"; 4.77 "¡Qué rápido!" con rayitas
amarillas de sorpresa y sacudón.

**s07-reserva** (4.69). Ticket de reserva blanco: "RESERVA", "LUCÍA" (0.29), mesa redonda vista de
arriba con 4 sillas que aparecen una por una (1.53 "cuatro"), "SÁB" (1.91) y "21:00" (2.86). 3.53
"esperamos": sello rojo "CONFIRMADA" con sacudón.

**s08-vieron** (2.98). Primer plano del youtuber, cara de asombro (boca abierta, cejas arriba).
0.0 "¿VIERON?" gigante blanco arriba. 0.82 "instante": sticker amarillo "AL INSTANTE" con rayas de
velocidad (flash). 1.36 "miren": señala con una flecha roja enorme a la derecha y todo se desliza.

**s09-martin** (5.29). Otro chat: "Martín". Globo gris de ayer con chip "AYER" ("¿Cuánto sale el
menú para un cumple?") y "visto, sin reservar". 0.0 píldora roja "LE ESCRIBE SOLO". 0.4-4.4 el
agente escribe primero el globo cartón "Hola, Martín. ¿Te guardo la mesa grande para el cumple?".
4.6 "grande": responde Martín "¡Dale! Guardámela" y un corazón amarillo.

**s10-contras** (4.99). Tarjetas de review. 0.0 tarjeta "PROS" (barra amarilla) con "RECUPERA AL
QUE NO COMPRÓ" y tilde (1.0 "compró"). 1.37 "Contras": tarjeta "CONTRAS" (barra roja) que entra
de golpe. 2.73 "barre": una escoba de cartón y "NO BARRE". 4.0 "excusas": "TE DEJA SIN EXCUSAS" y
sello.

**s11-giro** (5.88). 0.64 "robot": un robot frío, cuadrado y gris (cabeza de caja, antena, boca
de rejilla) con una pantallita "MARQUE 1"; 2.09 "marque": su pantalla muestra "MARQUE 1 / 2 / 3"
y titila con glitch. 3.54 "me salió": el robot se cae al costado tachado y aparece GRANDE el
agente (globo blanco con ojos) con una escarapela amarilla "EL MEJOR DEL LOCAL" (4.21 "mejor") y
papel picado amarillo, rojo y cartón.

**s12-familia** (2.80). Mesa de cena de frente con lámpara colgando, cuatro platos con vapor, el
youtuber y tres siluetas de la familia. 1.38 "ceno": el youtuber sonríe; a un costado el celular
boca arriba se prende con "Nueva reserva" (el agente sigue trabajando). Corazón amarillo.

**s13-estrellas** (5.92). "PUNTAJE" mono. 0.46-1.3 cinco estrellas gigantes que se llenan de
amarillo una por una ("cinco estrellas"), con sacudón al final (flash). 1.98-2.64 tarjeta blanca
"NO ES CONTENIDO PATROCINADO" con casilla que se tilda. 3.87 "Bueno...": el tilde tiembla; 4.82
"poco": sticker amarillo "BUENO... UN POCO" pegado girado y el youtuber chiquito que guiña.

**s14-scalerics** (7.55). Entra Orus. La caja cerrada en el centro, la etiqueta dice "AGENTE DE
IA" (0.8). Etiquetas de envío que se pegan: 1.8 "ATIENDE TU WHATSAPP", 2.72 "COMO UN EMPLEADO MÁS",
3.6 "A CUALQUIER HORA". 4.9 "LO HACEMOS NOSOTROS"; 6.25 "Scalerics": sello verde "HECHO EN
SCALERICS" (flash en 64.7 global = 6.22 relativo).

**s15-cta** (6.61). "¿CUÁNTAS ESTRELLAS LE DAS?" gigante. Cinco estrellas vacías que se iluminan
de a una en loop finito. 1.83 "Comentá": una caja de comentario blanca con cursor que escribe un
número; 2.7-3.0 chips "1 2 3 4 5". Flecha roja hacia la caja. Última escena: sin salida.
