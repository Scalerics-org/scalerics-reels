# Reel "Cita a ciegas": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: la
TIENDA ONLINE (todo con precio, pago con Mercado Pago, envío a la casa), nombrada una sola vez, al
final. Formato P (personaje de la cultura popular): un REALITY DE CITAS A CIEGAS de la tele.

La CONDUCTORA del programa (voz Kore, chusma y teatral) abre: "Tu clienta tuvo una cita a ciegas
con tu local. Y fue un desastre. Vamos al confesionario." La CLIENTA (voz Leda) cuenta a cámara:
"Llegué con ganas, eh. Le pregunté si podía pagar con tarjeta. Solo efectivo. Le pedí que me lo
mande a casa. Pasá el lunes. Le pedí ver qué tenía. Me mandó una foto borrosa de una
estantería." El LOCAL (voz Charon, dueño cansado y buenazo) en su confesionario: "Yo pensé que
fue bien. Hasta le mandé una foto." Conductora: "Química: cero. Pero ella tuvo una segunda cita.
Con otro local." Clienta, enamorada: "Me mandó un link. Vi todo, con precio. Pagué con Mercado
Pago desde el sillón. Y al otro día me llegó a casa por DAC. Yo en pijama." Conductora: "¡Química
por las nubes! Entonces, ¿te quedás con el nuevo?" GIRO, la clienta nostálgica: "Ay, no sé. Lo
del primero era lo mejor del barrio. Pero nunca me dejó entrar." El local, conmovido: "¿Lo mejor
del barrio?" Entra el narrador de Scalerics (voz Orus): "Hacemos tu tienda online: todo con
precio, pago con Mercado Pago y envío a la casa. Que lo mejor del barrio se pueda comprar desde
el sillón." Cierra la conductora: "Y vos, ¿le das una segunda cita? Contanos en los comentarios."
Voz de 67.3 s, reel de 70.46 s.

## RECURSO VISUAL CENTRAL: el MEDIDOR DE QUÍMICA
Abajo a la derecha (lo pone `ambiente.html`, x 782-1008, y 1532-1702) hay un medidor de aguja
"QUÍMICA" con un arco coral / amarillo / turquesa. La aguja baja con cada queja (efectivo, lunes,
estantería), se cae a CERO de golpe en "cero" (26.06), sube con la segunda cita y llega a tope en
"nubes" (41.39); en el giro vuelve a dudar, y con la tienda online (s11) vuelve a tope en
"comprar" (61.6). Algunas escenas (s07, s09) muestran además un medidor GRANDE en el centro.
No pongas nada tuyo en esa esquina.

## ESTILO: PROGRAMA DE CITAS DE LA TELE. Edición CARGADA.
Estudio violeta con paneles y dos focos de color (coral a la izquierda, turquesa a la derecha), piso
de tablero desde y 1520 con borde amarillo (lo pone el fondo del index). Arriba de todo, el CARTEL
del programa "CITA A CIEGAS" con bombitas amarillas que corren (ambiente, y 58-214). Abajo a la
izquierda, la CAJA DEL PÚBLICO (ambiente, x 76-396, y 1556-1680): dice "EN VIVO" y se prende con
"UUUH", "JAJAJA", "APLAUSOS" o "AWWW" en las reacciones (ya con sus sonidos).
Los PERSONAJES son dibujos geométricos planos, con contorno grueso violeta oscuro `#120a22` (o crema sobre los rellenos oscuros):
- LA CLIENTA: cabeza redonda crema, pelo coral oscuro en rodete (círculo arriba), ojos de punto,
  vestido coral `#ff6f59`, aros turquesa. Gestos con los brazos (palitos gruesos).
- EL LOCAL (tu local): un LOCALCITO con cara: frente ciruela, toldo a rayas crema/coral, vidriera
  con dos ojos y boca, puerta; un moñito amarillo de "cita". Ingenuo, sonriente.
- EL OTRO LOCAL: un local más moderno con toldo turquesa y un celular en la vidriera.
Elementos del programa: mesa de restaurante con mantel y VELA (llama amarilla que se apaga en el
desastre), corazones geométricos (dos círculos + triángulo, o path) que se inflan o se rompen,
CARTELITOS DE PUNTAJE en paleta (número grande, el "10" del local en s06), letreros con bombitas ("¿SEGUNDA CITA?"),
el marco de cámara del CONFESIONARIO (esquinas en L, punto REC coral, rótulo mono "CONFESIONARIO ·
ELLA" o "· ÉL"), cortina de terciopelo violeta detrás del sillón del confesionario.
Palabras clave GIGANTES que caen en su palabra (Lexend 900, mayúsculas, contorno `#120a22` con
`-webkit-text-stroke` + `paint-order: stroke fill`), sacudones, flashes, sellos. Lo que dice el
local la clienta lo imita en un cartelito escrito a mano (Caveat) colgado de un hilo.

## Paleta (SOLO estos colores)
- Violeta noche `#120a22`: contornos, rellenos oscuros, sombras.
- Ciruela `#3b1d5a` / `#241238`: superficies (mesa, sillón, paneles, celulares).
- Coral `#ff6f59`: la clienta, el drama, lo que sale mal, tachaduras, acento de subtítulos.
- Turquesa `#22d1c3`: lo que sale bien, la segunda cita, el otro local.
- Amarillo vela `#ffc857`: la vela, las bombitas, los puntajes, brillos.
- Crema `#fff3e0`: trazos, textos grandes, piel de los personajes.
- Desde s11 (Scalerics) se suma verde Scalerics `#5ce611` para lo que funciona (tilde, botón).
Brillos (text-shadow / drop-shadow del mismo color) en 1-2 cosas por escena, no más.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, rosa/dorado, logos reales (Mercado
Pago y DAC solo como texto genérico en un botón o en el costado de una camioneta, sin logos).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos y UI; Caveat 700 para los
cartelitos escritos a mano (`@font-face` con `assets/fonts/Caveat-var.woff2`, weight 400 700).
Nada que haya que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420); el cartel del programa en y 58-214. Contenido de cada escena
entre y 560 y 1500, x 70-1010. Abajo (y 1530-1700) ya están la caja del público (izquierda) y el
medidor (derecha); logo de Scalerics en y ~1746.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo de estudio, focos, piso de tablero.
- `compositions/ambiente.html` + `ambiente.sfx.json`: cartel con bombitas, medidor, caja del
  público con reacciones en 4.2 (UUUH), 18.95 y 23.6 (JAJAJA), 26.1 (UUUH), 39.55 (JAJAJA), 41.45
  (APLAUSOS), 51.95 (AWWW), 62.3 (APLAUSOS); flashes de estudio en 4.15, 26.06 y 41.39.
- `compositions/subtitulos.html`.

## Sonidos extra de este reel
`risas`, `uuh` (ya los usa el ambiente), `redoble`, `drama` (golpe de telenovela, 3 s: usar
`max`), `flash` (cámara de fotos), `subida` (3 s, sube), `beep`, `impact-bass-2`, `glitch-2`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el programa de citas con la paleta de
> arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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

**s01-cita** (5.18 s). "Tu clienta tuvo una cita a ciegas con tu local. Y fue un desastre."
Mesa del restaurante al centro (y ~1150-1420) con mantel, vela prendida y dos copas. A la
izquierda la CLIENTA sentada, a la derecha un BIOMBO violeta con un "?" gigante que tapa a su
cita. Cuadro 0 ya con mesa y clienta a la vista. "clienta" (0.09) ella saluda; "cita a ciegas"
(1.19) cae "CITA A CIEGAS" grande en crema/coral arriba (y ~600); "local" (2.29) el biombo se cae
y aparece EL LOCAL con su moñito, sonriendo; corazoncito que late entre los dos. "Y fue" (3.22)
suspenso: la llama tiembla; "desastre" (4.13) la vela se apaga (humo), el corazón se parte en
dos y cae "DESASTRE" como sello coral torcido. Sonido: drama.

**s02-confe** (3.13 s). "Vamos al confesionario. Llegué con ganas, eh."
Marco de cámara del CONFESIONARIO (esquinas en L, REC coral que titila, rótulo "CONFESIONARIO ·
ELLA"); cortina violeta detrás; la clienta en un sillón ciruela, de frente, brazos cruzados.
"confesionario" (0.42) entra el marco con un clic de cámara. "ganas" (2.11) le salen tres
corazoncitos que se inflan, y en "eh" (2.48) se desinflan y caen.

**s03-tarjeta** (4.05 s). "Le pregunté si podía pagar con tarjeta. Solo efectivo."
Flashback de la cita (borde de foto de recuerdo): la mano de la clienta extiende una TARJETA
genérica (crema con chip amarillo) hacia el local. "tarjeta" (1.25) la tarjeta brilla. "Solo
efectivo" (2.04-2.53): en la puerta del local cae, colgando de un hilo y balanceándose, un
cartelito a mano (Caveat) "SOLO EFECTIVO"; la tarjeta se parte o se tacha con X coral; el
local pone cara de nada. Cartelito de puntaje "3" en coral.

**s04-lunes** (3.03 s). "Le pedí que me lo mande a casa. Pasá el lunes."
Una cajita de pedido con moño; una CASITA a la derecha; una línea punteada de envío que se dibuja
del local a la casa en "mande" (0.66) hasta "casa" (0.93). "Pasá el lunes" (1.60-2.02): la línea
se corta en el medio con una tijera o un tachón coral, y cae una hoja de CALENDARIO arrancado
"LUNES" grande. La caja vuelve al local.

**s05-foto** (3.98 s). "Le pedí ver qué tenía. Me mandó una foto borrosa de una estantería."
Celular grande (ciruela, x 300-780) con chat: burbuja de ella "¿qué tenés?" en "ver" (0.36).
"mandó" (1.54) llega una FOTO del local: un rectángulo con una estantería dibujada con blur
fuerte; en "borrosa" (2.27) la foto se pone todavía más borrosa y se mueve; "estantería" (2.90)
rótulo grande "FOTO BORROSA" en coral y la foto se tuerce. (Las risas las pone el ambiente.)

**s06-el** (5.71 s). "¿Y él qué dice? Yo pensé que fue bien. Hasta le mandé una foto."
CONFESIONARIO del LOCAL ("CONFESIONARIO · ÉL"): el localcito en el sillón, relajado, satisfecho.
"Y él" (0.0) el marco entra; "dice" (0.74) zoom suave. "bien" (2.48) levanta un cartelito de
puntaje "10" amarillo, orgulloso, y le sale un brillito. "foto" (4.22) muestra la foto borrosa
enmarcada como un trofeo, con una sonrisa enorme. (Risas del ambiente en 4.23 relativo.)

**s07-cero** (6.77 s). "Química: cero. Pero ella tuvo una segunda cita. Con otro local."
Medidor GRANDE al centro (semicírculo coral/amarillo/turquesa, aguja). "Química" (0.0) entra;
"cero" (0.98) la aguja se desploma a cero, el medidor echa humo y cae "0" gigante coral.
"segunda cita" (3.39) se prende un letrero con bombitas "¿SEGUNDA CITA?" y el medidor se va;
"otro local" (4.87-5.32) entra deslizándose EL OTRO LOCAL (toldo turquesa), con brillos.

**s08-segunda** (8.52 s). "Me mandó un link. Vi todo, con precio. Pagué con Mercado Pago desde el
sillón. Y al otro día me llegó a casa por DAC. Yo en pijama."
Celular grande al centro. "link" (0.55) llega una burbuja con un link turquesa; "Vi todo" (1.59)
se abre una tiendita: grilla de 4 productos dibujados con su precio "$ 690" etc.; "precio" (2.20)
los precios hacen pop amarillos. "Pagué" (2.85) botón "PAGAR CON MERCADO PAGO" turquesa que se
aprieta y pasa a "PAGO OK" con tilde; "sillón" (4.31) el celular se achica a la mano de la
clienta en un sillón. "Y al otro día" (5.00) una camioneta genérica con "DAC" escrito en el
costado cruza y deja la caja en la puerta de la casa en "casa" (6.15); "pijama" (7.62) la
clienta abre en pijama a rayas turquesa, feliz, corazones.

**s09-nubes** (4.87 s). "¡Química por las nubes! Entonces, ¿te quedás con el nuevo?"
"Química" (0.0) medidor grande a tope que tiembla y explota en corazones; "nubes" (1.02) nubes
crema y "POR LAS NUBES" gigante turquesa. "Entonces" (1.58) se apaga todo menos un foco: suspenso,
dos fotos tipo polaroid se enfrentan: EL LOCAL (coral) y EL OTRO LOCAL (turquesa), con un "VS".
"nuevo" (3.89) la del nuevo se ilumina.

**s10-giro** (9.71 s). "Ay, no sé. Lo del primero era lo mejor del barrio. Pero nunca me dejó
entrar. ¿Lo mejor del barrio?"
Confesionario de ELLA otra vez, más íntimo (luz baja). "Ay, no sé" (0.0-0.66) ella mira la foto
del primer local. "Lo del primero" (2.14) se abre la vidriera del local en grande: adentro todo
lo bueno (estantes llenos, cosas ricas, una estrella "LO MEJOR DEL BARRIO" en "mejor" 3.87). "Pero
nunca me dejó entrar" (5.77-6.60): la puerta se cierra de golpe y cae un candado coral; cartel
a mano "CERRADO". "¿Lo mejor del barrio?" (7.68-8.38): primer plano del LOCAL, ojos enormes y
una lágrima que cae; corazoncito que se vuelve a inflar.

**s11-tienda** (8.23 s). (Orus) "Hacemos tu tienda online: todo con precio, pago con Mercado Pago
y envío a la casa. Que lo mejor del barrio se pueda comprar desde el sillón."
Entra Scalerics: verde `#5ce611` para lo que funciona. "tienda online" (0.46-0.83) al localcito le
aparece al lado un celular con SU tienda (mismo toldo a rayas en el encabezado): "TU TIENDA
ONLINE". "precio" (2.14) productos con precio; "Mercado Pago" (2.87) botón de pago con tilde
verde; "envío a la casa" (3.77-4.26) cajita que sale del celular hacia una casita. "lo mejor del
barrio" (5.09) estrella amarilla en el local; "comprar" (6.39) la puerta del local se abre (ya
no hay candado); "sillón" (7.31) corazón grande.

**s12-cta** (7.28 s). "Y vos, ¿le das una segunda cita? Contanos en los comentarios."
La mesa de nuevo con la vela prendida; el LOCAL esperando del otro lado con un ramo de flores
geométricas; del lado de acá una silla vacía (la del que mira) con un cartelito "reservado" sobre la
mesa en "Y vos" (0.0). Arriba un letrero con bombitas "¿SEGUNDA CITA?" que cae y se prende en
"segunda cita" (1.22-1.40). "Contanos" (2.51) una burbuja de comentario "Contanos en los
comentarios" (crema, "comentarios" en coral) debajo del letrero. Queda ~3 s quieto pero vivo (vela
titilando, bombitas, ramo que se hamaca, burbuja que flota).

## Cómo se generan las escenas
Las `compositions/sXX-*.html` salen de `partes/gen/src/sXX-*.tpl` con `python3 partes/gen/gen.py` (expande los personajes `<!--@CLIENTA ...-->`, `<!--@LOCAL ...-->`, `<!--@OTRO ...-->`, el confesionario, el medidor, el letrero con bombitas, los corazones y los helpers de GSAP). Para cambiar una escena, editá su .tpl y volvé a generar.
