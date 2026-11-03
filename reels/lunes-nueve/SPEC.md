# Reel "Lunes, 9 de la mañana" — spec

Reel vertical 1080x1920 de Scalerics, línea de Juan del 02-11 (público pymes, tono adulto, marca).
Formato motion persuasivo "Caos → control" + "Rutina + punto de dolor". Producto: **un agente de
IA interno**, que trabaja para el equipo (no atiende clientes): junta los pedidos que entran por
varios canales, los agrupa por proveedor y arma los pedidos, avisa lo que falta y le deja al
encargado la lista del día. Locución de Orus (una sola voz), 59 s; total 62.5 s.

Historia: lunes 9:00, 14 pedidos, 3 proveedores, un solo encargado: Diego, que es un crack y
sostiene todo (queda bien parado siempre). Primera mitad: el aluvión y los malabares; a las 9:30 el
café ya está frío; todo pasa por su cabeza. Giro: "mismo lunes, misma hora", ahora el equipo tiene
un agente de IA; los pedidos se juntan, se agrupan, se arman, se avisa lo que falta, Diego revisa,
aprueba y decide. A las 9:30 el café sigue caliente. Cierre: "Etiquetá al encargado que sostiene
todo los lunes."

## Recurso visual central: color con significado
- **Pendiente** = crema apagado (opacity 0.4) y, solo en puntitos de alerta, rojo apagado
  `#b8574e` (opacity 0.9). Nada grande en rojo.
- **Resuelto** = verde de marca `#5ce611`: tildes, bordes de tarjeta, números, botones.
- Primera mitad (s01–s05) casi sin verde (solo acentos de Diego: es un crack). Desde s06 el verde
  va ganando la pantalla hasta el panel resuelto.

## Personajes y objetos (reusar igual en todas las escenas)
- **Diego**: figura de líneas crema con origen en los pies: cabeza r 44 en (0,-290), pelo, ojos y
  sonrisa, torso redondeado, delantal con chapita "DIEGO" (mono 24), brazos separados para animar,
  piernas. Alto ~340 px a escala 1.
- **Agente de IA**: cabeza-pantalla redondeada (170x140, rx 44) con ojos verdes (rects 18x34),
  antena con punto verde, torso con "IA" en verde (Lexend 600). Mismo alto que Diego. Amable.
- **Tarjeta de pedido**: rect redondeado (~120x76, rx 12), trazo crema 4, dos rayitas adentro y un
  número mono chico; pendiente = apagada con puntito rojo apagado; resuelta = borde verde con tilde.
- **Reloj**: círculo con 12 marcas y dos agujas; el minutero gira con `svgOrigin` en el centro.
- **Taza de café**: taza con asa y tres hilos de vapor que suben (dashoffset en loop finito).
- **Panel**: rect redondeado grande (rx 28) con encabezado mono, filas y botón verde relleno con
  texto navy `#07111f`.

## Capa `compositions/ambiente.html` (toda la duración, track 4)
Encabezado de marca arriba (y ~120-180, por encima de los subtítulos): a la izquierda un punto y
"SIN AGENTE" en crema apagado (mono 22); desde "Ahora" (27.86 s) pasa a punto verde y "CON AGENTE
DE IA" en verde. A la derecha el reloj mono "LUN 09:00" que corre: 09:00 → 09:30 hasta "nueve y
media" (19.53 s), se rebobina en "Mismo lunes" (25.92-26.6) y vuelve a correr hasta 09:30 en 49.33.
Una línea finita crema 0.12 debajo. Se queda todo el reel: es la firma.

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
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de la marca (salvo el rojo apagado de alerta, ver arriba):
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


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

### s01-lunes (8.13 s) · el gancho
Arranca con el reloj ya medio dibujado (x 270, y 700, r 78): en "nueve" (0.66) las agujas golpean
las 9:00. En "catorce" (2.44) caen 14 tarjetas de pedido apagadas, desordenadas, a los costados
(y 840-1180), en cascada rápida con puntitos rojos apagados. En "tres proveedores" (3.40) aparecen
tres cajones de proveedor arriba a la derecha (x 610/760/910, y 700). En "encargado" (4.91) se
dibuja Diego en el centro (pies y 1210) y las tarjetas se le vienen encima. En "Diego" (6.32)
pop de la chapita DIEGO. En "crack" (7.26) levanta un brazo con una tarjeta y salta un destello
verde de 6 rayitas alrededor de la cabeza. Etiqueta: LUNES · 9:00 → 14 PEDIDOS → 3 PROVEEDORES
→ 1 ENCARGADO → DIEGO · UN CRACK.

### s02-canales (4.40 s)
Cuatro íconos arriba (y 720): globo de chat (0.55 WhatsApp), sobre (1.49 mail), tubo de teléfono
(2.06), servilleta con garabato (3.10, cae balanceándose). De cada uno salen tarjetas que caen a una
pila desordenada sobre un mostrador (y 1170): 6 + 4 + 3 + 1 = 14. Un contador mono "14" con
PENDIENTES en crema apagado sube con la pila. Etiqueta: WHATSAPP → MAIL → TELÉFONO → Y UNA
SERVILLETA.

### s03-malabares (4.53 s)
Diego en el centro haciendo malabares: cuaderno (anota 0.30), calculadora (suma 0.92), teléfono
con globito "LÁCTEOS" (llama 1.66), los tres giran en órbita arriba de su cabeza. En "atiende"
(3.04) a la derecha se dibuja la puerta con un cliente esperando y Diego gira la cabeza. Brazos
alternando. Etiqueta: ANOTA → SUMA → LLAMA → ATIENDE. Diego bien parado: concentrado, sonriendo.

### s04-cafe-frio (4.89 s)
Taza grande al centro (y ~980) con vapor; alrededor, girando rápido, los íconos de antes en chico
("todo a la vez"). En "café" (0.96) la taza hace pop. Reloj chico arriba a la izquierda: en
"nueve y media" (2.47-2.78) el minutero gira media vuelta. En "frío" (3.79) el vapor se corta,
la taza se apaga a crema 0.4 y aparece la chapita gris FRÍO. Etiqueta: TODO A LA VEZ → 9:30 · CAFÉ FRÍO.

### s05-cabeza (3.97 s)
Perfil grande de la cabeza de Diego (mira a la derecha). "hace todo bien" (0.22-0.60): tres
tildes verdes al costado. "todo pasa por su cabeza" (1.61-2.77): desde los bordes entran líneas
de tarjetas, cajones y teléfonos que convergen en la cabeza (embudo); adentro se amontonan
puntitos apagados y la cabeza tiembla un poco. Etiqueta: TODO BIEN → TODO PASA POR ÉL.

### s06-agente (4.54 s) · el giro
Reloj grande al centro con el minutero en las 9:30: en "Mismo lunes" se rebobina (gira para atrás,
ícono de rebobinar verde) y en "hora" (1.25) clava las 9:00. En "Ahora" (1.94) el reloj se achica y
se va; Diego entra a la izquierda (x 360). En "equipo" (2.57) una llave/corchete verde arriba con
EQUIPO. En "agente" (3.14) pop del agente de IA a la derecha (x 720), parpadea en "IA" (3.70).
Etiqueta: MISMO LUNES → AGENTE DE IA.

### s07-junta (3.98 s)
Los cuatro canales arriba en chico; en "Entran" las tarjetas caen otra vez (las mismas). En
"agente" (1.58) aparece el agente chico al costado y en "junta" (2.28) todas vuelan a un panel
(PEDIDOS DEL LUNES · 14) y quedan en filas ordenadas. En "lugar" (3.22) el borde del panel se
pone verde. Etiqueta: LOS MISMOS PEDIDOS → UN SOLO LUGAR.

### s08-proveedores (4.51 s)
Las filas del panel se separan en tres columnas con rótulo LÁCTEOS / HARINAS / LIMPIEZA
("Agrupa" 0, "proveedor" 0.65). En "deja" (1.50) cada columna se convierte en una hoja de pedido;
tildes verdes en "tres" (1.88), "pedidos" (2.07), "armados" (2.35). En "listos" (3.23) sello
verde LISTO en cada una. Etiqueta: POR PROVEEDOR → 3 PEDIDOS ARMADOS.

### s09-falta (1.99 s)
Medidor de stock HARINA que baja hasta un tramo rojo apagado; en "falta" (0.67) suena la campanita
y aparece la tarjeta verde "Queda poco · va en el pedido"; en "falte" (1.62) tilde. Etiqueta:
ANTES DE QUE FALTE.

### s10-lista (8.21 s)
Panel "LA LISTA DE DIEGO" (y 640-1200). En "lista" (1.14) se dibuja; en "primero" (2.17)
filas 1-3 con número verde (Aprobar los 3 pedidos · Confirmar la harina · Armar el pedido 9);
en "espera" (2.93) separador PUEDE ESPERAR y dos filas apagadas. En "revisa" (4.15) un cursor
recorre las filas; en "aprueba" (4.63) clic en el botón verde APROBAR y tildes; en "decide" (5.63)
chip MAÑANA en una fila apagada. En "agente" (6.80) el agente chico arriba a la derecha y en
"resto" (7.46) las filas 1-3 pasan a ENVIADO. Etiqueta: LA LISTA DEL DÍA → DIEGO DECIDE → EL
AGENTE, EL RESTO.

### s11-caliente (2.39 s)
La taza otra vez, ahora con vapor verde que sube; reloj chico en 9:30; detrás, mini panel con tres
tildes verdes. En "caliente" (1.42) el vapor crece. Etiqueta: 9:30 · CAFÉ CALIENTE.

### s12-cta (10.93 s)
"Scalerics" (0.35): caja de marca (Lexend 700) con AGENTES DE IA debajo. "puertas adentro"
(2.99): se dibuja una puerta/local con Diego y el agente adentro, lado a lado; "equipo" (4.31)
llave verde EQUIPO. "Etiquetá" (5.05): todo sube y aparece un campo de comentario con "@" y el
texto que se tipea "@el_encargado"; en "lunes" (7.23) se manda (tilde) y queda quieto con un
pulso suave hasta el final. Etiqueta: PUERTAS ADENTRO → ETIQUETALO.
