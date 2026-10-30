# El detective · CRM · cine negro

**De qué trata.** Un detective privado de cine negro (voz en off grave, Algenib) busca a una clienta
que el dueño perdió "adentro de su propio celular": Lucía, que en marzo pidió un presupuesto y nadie
la llamó. Sigue tres pistas (el post-it "Lucía ???" en la caja, el chat enterrado bajo los stickers
del grupo de la familia, el cuaderno con letra ilegible), interroga al dueño bajo la lámpara
("¡Yo me acuerdo de todo! … ¿Quién era esta?", Puck) y la encuentra: en abril le compró a otro, que
la llamó al otro día (Lucía, Leda: "Vos, nunca"). Caso cerrado, pero mal. GIRO: el dueño no es un
descuidado: tiene a cada cliente en la cabeza, en un post-it y en cinco chats, y eso no lo aguanta
nadie solo (ni Sam Spade). Entra la luz y Orus: un CRM que junta quién es cada cliente, qué pidió y
qué le prometiste, y te avisa "Llamá a Lucía". Cierre: "Etiquetá al que dice: 'yo me acuerdo de todo'".

**Formato:** D (historia de una clienta con nombre) narrada como película de cine negro.
**Recurso visual central:** la oficina del detective de noche: lluvia en la ventana, sombras de
persiana en diagonal, humo, grano de película, la lámpara de interrogatorio; rótulos de máquina
de escribir ("EXPEDIENTE: LUCÍA") y sellos rojos. En el giro (s12) se abren las persianas y entra
la luz.

## Paleta (manda sobre SPEC-base)
- Negro carbón `#08080a` (fondo) y `#151517`; humo `#26262a`.
- Gris medio `#8a8a90` (lo secundario, lo apagado) y gris claro `#b9b9b4`.
- Blanco papel `#ecebe6` (trazos principales, hojas, textos).
- UN acento: rojo labial `#e0283f` (sellos, signos de pregunta, tachaduras, el aviso, palabras
  acentuadas de los subtítulos). Nada de verde ni otros colores.
- Siluetas (detective, dueño) rellenas `#0d0d0f` con trazo papel o gris; la luz de la lámpara es un
  cono blanco con opacidad 0.10-0.18 (acá sí se permiten degradés suaves de luz).

## Tipografía
- Subtítulos: máquina de escribir (`Maquina` = `assets/fonts/FreeMonoBold.ttf`, 54px), papel, acento rojo.
- Rótulos de expediente y etiqueta debajo del dibujo: `Maquina` 700, 30-34px, mayúsculas,
  letter-spacing 0.18em, papel (o rojo si es sello). La etiqueta va en top 1268 como en SPEC-base.
- Manuscrito (post-it, cuaderno, "yo me acuerdo de todo"): Caveat (`assets/fonts/Caveat-var.woff2`).
- Sellos: rectángulo de borde rojo 6px, texto `Maquina` rojo, rotados -6 a -12°, entran con
  scale 2.2→1 en 0.14 s (power4.in) y un temblor.

## Ambiente (`compositions/ambiente.html`, encima de las escenas, debajo de los subtítulos)
Lluvia (rayas finas grises cayendo en diagonal leve, opacidad baja), sombras de persiana en
diagonal (franjas negras translúcidas), humo que deriva despacio, grano de película que salta
12 veces por segundo, viñeta y parpadeo de luz. Relámpagos (flash blanco) en "Llovía", "Caso
cerrado" y "Ni Sam Spade". Desde "En Scalerics" (58.6 s) la persiana y la lluvia se van y queda
una luz clara: amaneció.

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

### s01-celular (0-5.67) · el gancho
Un celular grande (x 290-650, y 600-1290, rx 52) se está terminando de dibujar en el cuadro 0. En la
pantalla, la SILUETA DE TIZA de una mujer (contorno blanco punteado, como escena del crimen) se
dibuja en "clienta" (0.75). A la derecha, en primer plano, el DETECTIVE en silueta (sombrero de
ala, gabardina con cuello levantado) entra desde la derecha en 0.2 s. "celular" (2.58): el
celular tiembla y un círculo rojo marca la silueta. "contrataron" (3.67): una tarjeta de
máquina de escribir se tipea letra por letra: "EXPEDIENTE: LUCÍA" (etiqueta). "encontrarla"
(4.42): la lupa del detective pasa sobre la pantalla.

### s02-lluvia (5.67-12.59) · la oficina
Ventana con marco en cruz (x 200-880, y 600-1080) con la lluvia corriendo por el vidrio (gotas que
bajan) y una ciudad en silueta afuera (edificios genéricos, una torre alta). "Llovía" (0.64):
relámpago (lo pone ambiente) y la silueta de la ciudad se ilumina. "Lucía" (2.24): sube una
ficha de cartón (x 250-830, y 960-1300) y se tipea "LUCÍA"; "marzo" (3.20) "MARZO: PIDIÓ
PRESUPUESTO"; "nada" (6.03) "DESPUÉS: ..." con el cursor que parpadea y un sello rojo "SIN
RESPUESTA". Etiqueta "MONTEVIDEO · DE NOCHE".

### s03-postit (12.59-18.44) · pista 1
Caja registradora en línea (x 260-820, y 820-1260) con un post-it blanco pegado de costado
(Caveat "Lucía", 70px, tinta oscura). "Primera pista" (0): etiqueta "PISTA 1". "post-it" (1.20):
el post-it hace pop y se despega un poco de una esquina (aleteo). Una lupa entra y se para sobre
el post-it en "caja" (2.16). "Lucía" (3.00) zoom al post-it. "tres" (4.08)/"signos" (4.32)/
"pregunta" (4.80): tres "?" rojos en Caveat aparecen uno por uno.

### s04-stickers (18.44-24.30) · pista 2
Celular (x 330-750, y 600-1300) con el chat del grupo "FAMILIA". "su chat" (1.13): la burbuja de
Lucía ("Hola! me pasás un presupuesto?") aparece y queda resaltada con un borde rojo.
"Enterrado" (2.20): desde arriba caen stickers dibujados (carita, corazón, pulgar, torta,
"FELIZ CUMPLE", perrito) que se apilan y empujan la burbuja de Lucía hacia arriba hasta taparla.
"trescientos" (2.80): globito rojo "+300" sobre el celular. "familia" (4.80): una pala aparece
clavada al costado. Etiqueta "PISTA 2".

### s05-cuaderno (24.30-28.86) · pista 3
Cuaderno abierto (x 180-900, y 760-1240) con renglones; "cuaderno" (0.91): garabatos manuscritos
ilegibles se dibujan en los renglones, uno con "Lu..." y una mancha. "letra" (2.21): la lupa pasa
y adentro los garabatos se ven igual de ilegibles. "Marlowe" (3.11): sello "ILEGIBLE" rojo.
Etiqueta "PISTA 3".

### s06-lampara (28.86-36.78) · el interrogatorio
Lámpara colgante arriba (pantalla en y 600-680) que se balancea, con cono de luz blanco sobre una
mesa. El DUEÑO en silueta sentado del otro lado (cabeza, hombros, manos sobre la mesa), gotas de
sudor. "lámpara" (1.25): la lámpara se prende de golpe. "¿Lucía?" (2.37): rótulo tipeado
"¿LUCÍA?". "¡Yo" (3.27): globo grande "¡YO ME ACUERDO DE TODO!" (Lexend 800) con temblor.
"Lucía..." (4.55, 5.57): globo de pensamiento vacío, aparecen puntos suspensivos. "¿Quién" (6.60):
un "?" rojo gigante reemplaza todo y el dueño se rasca la cabeza.

### s07-encontre (36.78-39.79) · la encontré
"encontré" (0.09): foto de ficha de Lucía (dibujo de línea: cara, pelo largo, gabardina) clipada a
una carpeta, sello "UBICADA". "abril" (1.25): hoja de almanaque "ABRIL". "compró" (1.75): bolsa de
compras con cartel "OTRO LOCAL" y flecha roja de la foto a la bolsa.

### s08-lucia (39.79-44.73) · habla Lucía
Lucía de medio cuerpo (x 330-750, y 640-1300) con un celular en la mano. "llamó" (0.19): el celular
suena (ondas) "LLAMADA ENTRANTE"; "día" (0.64): rótulo "AL OTRO DÍA". "acordaba" (1.55): en su
celular se ve una tarjeta "Lucía · presupuesto" con tilde. "Vos" (3.44): se apaga todo menos un
rótulo grande "VOS: NUNCA." en rojo (Maquina).

### s09-cerrado (44.73-47.54) · caso cerrado
Carpeta "EXPEDIENTE: LUCÍA" se cierra de golpe (la tapa rota). "Caso" (0): sello "CASO CERRADO"
rojo con temblor. "Pero mal" (1.30): un segundo sello chico torcido "PERO MAL" y la carpeta se
desliza torcida.

### s10-cabeza (47.54-55.07) · el giro
Cabeza del dueño de perfil (línea papel, grande, x 260-820, y 640-1260). "descuidado" (1.36):
rótulo "DESCUIDADO" que se tacha con una raya roja. "cliente" (3.20): adentro de la cabeza se
amontonan caritas de clientes (círculos chiquitos). "post-it" (5.23): post-its se pegan en la
cabeza. "cinco chats" (6.00): cinco burbujas de chat orbitan. La cabeza tiembla de sobrecarga.

### s11-spade (55.07-58.61) · ni Sam Spade
"nadie solo" (0.71): el DETECTIVE en silueta grande; una pila torcida de post-its, burbujas y
cuadernos le cae encima y él se encorva. "Spade" (2.07): se le cae el sombrero. Etiqueta
"NI SAM SPADE".

### s12-crm (58.61-69.11) · entra la luz: el CRM
Se abren las persianas (ambiente). Una pantalla/ficha limpia (x 170-910, y 600-1290): a la
izquierda lista de clientes (filas), una resaltada "Lucía". "CRM" (1.60): título "CRM" tipeado
y la ficha se arma. "cliente" (3.19): filas de la lista se dibujan. "pidió" (4.16): campo
"PIDIÓ: presupuesto (marzo)". "prometiste" (5.05): campo "PROMETISTE: llamarla". "solo lugar"
(6.73): los post-its y burbujas sueltos entran volando desde los bordes y se meten en la ficha.
"avisa" (8.68): baja una notificación con campanita y punto rojo: "Llamá a Lucía" (9.27). Etiqueta
"TODO EN UN SOLO LUGAR".

### s13-cta (69.11-75.13) · cierre
Expediente con sello "CASO REABIERTO". "Etiquetá" (0): rótulo grande "ETIQUETÁ" con una @ roja.
"dice" (0.74): post-it grande con Caveat "yo me acuerdo de todo" y comillas. El sombrero del
detective se levanta en saludo. Queda quieto ~3 s con un movimiento leve (lluvia afuera).
