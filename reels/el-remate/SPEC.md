# Reel "El remate": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: el
AGENTE DE IA (atiende el WhatsApp del comercio a cualquier hora, con sus precios y horarios, y le
pasa la charla al dueño cuando es para él), nombrado una sola vez, al final. Formato P (personaje
de la cultura popular): un REMATE DE FERIA GANADERA uruguaya.

Un REMATADOR de feria (voz Fenrir, rapidísimo, con sonsonete) mira a cámara: "Hoy se remata tu
mejor cliente. Y vos ni viniste." Arranca el remate. "Lote uno: clienta fiel." Viene todos los
sábados, paga al contado, le recomienda el local a la vecina. Una joya. ¿El detalle? El martes le
escribió a su local y la dejaron en visto. ¿Quién da más? Pujan: EL DE ENFRENTE (voz Algenib, paleta
7) "¡Yo le contesto en un minuto!"; LA DEL SÚPER (voz Leda, paleta 12) "¡Yo le hago envío a
domicilio!"; y EL DEL FONDO (voz Puck, paleta 3), tirado en la última fila: "¡Yo le contesto a las
tres de la mañana!". "¡A la una! ¡A las dos! ¡A las tres de la mañana! ¡Vendido! Al señor del
fondo." MARTILLAZO. GIRO: llega tarde EL DUEÑO (voz Charon, con delantal, agitado): "Perdón,
perdón, se me hizo tarde. ¿Qué me perdí?" "Tu mejor cliente, señor." "¿Cómo que la remataron? ¡Si
no estaba en venta!" "Nadie la vendió, señor. Se fue sola. Con el que le contestó." Entra el
narrador de Scalerics (voz Orus): "El del fondo tiene un agente de IA. Atiende su WhatsApp a
cualquier hora, con sus precios y sus horarios, y le pasa la charla cuando es para él. Hacemos el
tuyo, para que no te rematen a nadie. ¿Cuánto vale tu mejor cliente? Ofertá en los comentarios."
Voz de 68.3 s, reel de 71.54 s.

## RECURSO VISUAL CENTRAL: el TABLERO DEL LOTE y el MARTILLO
Abajo a la derecha (lo pone `ambiente.html`, x 770-1010, y 1530-1710) hay un TABLERO de pizarra
verde con marco de madera: arriba "LOTE 1", abajo la MEJOR OFERTA escrita con tiza, que cambia
en cada puja: "· · ·" (aparece en "Lote" 6.44) → "1 MIN" ("minuto" 22.13) → "ENVÍO" ("envío"
26.40) → "3 AM" ("mañana" 32.80) → sello rojo "VENDIDO" ("Vendido" 37.36). Se va cuando entra
Orus (54.6) y vuelve en "Ofertá" (67.0) con "¿TU OFERTA?". No pongas nada tuyo en esa esquina.
El MARTILLO de madera del rematador es el golpe del reel: en "remata" (0.3) y en "¡Vendido!"
(37.36), con sonido `martillo` + `impact-bass-1`, sacudón y flash cálido.

## ESTILO: CASA DE REMATES RURAL. Edición CARGADA.
Pared de tablas de madera con luz cálida de galpón (la pone el fondo del index), baranda de
madera abajo (y 1520+). `ambiente.html` pone: un CARTEL colgado de dos sogas arriba de todo
(y 60-200) "GRAN REMATE · FERIA DEL SÁBADO", una fila de CABEZAS DEL PÚBLICO de espaldas (boinas,
sombreros, una con rodete) abajo a la izquierda (x 40-740, y 1560-1710) que se mueven y levantan
paletas numeradas en cada puja, el tablero del lote, onomatopeyas del público ("UUUH" en "visto",
"¡OOOH!" en "Vendido") y el flash. Las escenas son DIBUJOS de líneas gruesas color crema con
rellenos planos (madera, pizarra, rojo de cartel), como carteles pintados a mano de feria:
carteles de madera con letras pintadas, pizarras con TIZA (IBM Plex Mono o Lexend en crema con
opacity 0.9 y un poquito de blur 0.4px), paletas numeradas (círculo crema con número negro y
mango de madera), el martillo y el taco. Palabras clave GIGANTES que caen en su palabra (Lexend
900, mayúsculas, con contorno oscuro grueso), sacudones, cosas que se balancean colgadas de sogas.
Nada quieto más de ~0.8 s.
Personajes: SILUETAS genéricas con relleno oscuro `#1a0f08` y contorno crema, sin cara (a lo sumo
un bigote o un brillito): el rematador con sombrero de ala y bigote detrás de una tribuna de
madera; la clienta con rodete, bolsa de los mandados y un cartelito "LOTE 1" colgado; el de
enfrente con gorra; la del súper con chaleco y changuito; el del fondo tirado con los pies arriba
y el celular; el dueño con delantal. Nada de personas ni marcas reales (el súper es "el súper").

## Paleta (SOLO estos colores)
- Madera `#6b3f1f` / madera clara `#a8703a`: carteles, tribuna, mangos, marcos.
- Oscuro `#1a0f08`: siluetas, contornos gruesos de los textos, rellenos.
- Verde campo `#2f5d34`: pizarras, paño; con tiza crema encima.
- Crema `#f3e6c8`: trazos de los dibujos, textos grandes, tiza.
- Rojo cartel `#d23a22`: "LOTE 1", sello VENDIDO, "VISTO", lo que está mal.
- Paja `#f2b632`: acento de subtítulos, números de paleta, la luz, lo valioso (la clienta "joya").
- Desde s12 (Scalerics) se suma verde Scalerics `#5ce611` para el agente de IA (tildes, la
  pantalla del celular, el "contestó").
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales (WhatsApp solo como
burbujas de chat genéricas y tildes), caras de personas.

## Tipos de letra
Lexend 700-900 para lo grande (con `-webkit-text-stroke` + `paint-order: stroke fill` oscuro,
estilo cartel); IBM Plex Mono 500 para rótulos, tiza y UI. Nada que haya que leer de menos de
26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420); el cartel colgado en y 60-200. Contenido de cada escena entre
y 560 y 1500, x 60-1020. Abajo (y 1530-1710) es del ambiente: público a la izquierda, tablero a la
derecha. Logo de Scalerics en y ~1746.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): pared de tablas, luz cálida, baranda.
- `compositions/ambiente.html`, `compositions/subtitulos.html`, `compositions/s01-se-remata.html`.

## Sonidos extra de este reel
`martillo` (golpe de martillo de madera, 0.48 s), `murmullo` (murmullo de la sala, 3 s), y de los
de siempre `impact-bass-1`, `impact-bass-2`, `pop`, `click`, `whoosh`, `ping`, `notification`,
`sparkle`, `riser`, `glitch-1`.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la casa de remates con la paleta de
> arriba, rellenos y madera. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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



## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-se-remata (3.65 s).** Cuadro 0: la TRIBUNA de madera del rematador ya está (centro-derecha,
y 1000-1480) y el rematador (silueta con sombrero de ala y bigote crema) detrás, con el martillo
levantado. "remata" (0.30): MARTILLAZO sobre el taco, sacudón; cae "SE REMATA" gigante crema
(y ~600). "cliente" (1.20): un cartel de madera ROJO colgado de dos sogas baja balanceándose:
"TU MEJOR CLIENTE" (y ~730). "Y vos ni viniste" (2.03-2.40): a la izquierda, una SILLA vacía de
madera con un cartelito "DUEÑO" y una telaraña; en "viniste" pop de "NI VINISTE" en paja,
torcido, y la silla tiembla. Sonidos: martillo + impact en "remata".

**s02-atencion (5.04 s).** "Atención, señores" (0.0-0.61): el rematador grande al centro (de la
cintura para arriba detrás de la tribuna), martillo en alto, micrófono de pie; murmullo; líneas
de "voz" que salen de la boca. "arranca el remate" (1.22-1.74): campanazo (pop + glitch) y
"¡ARRANCA!" chico en paja. "Lote uno" (2.79-3.13): desde arriba cae colgado de sogas un CARTEL
ROJO "LOTE 1" gigante (y 600-820) y se balancea. "clienta fiel" (3.85-4.35): sobre una tarima
de madera aparece la CLIENTA (silueta con rodete, bolsa de los mandados con una baguette/puerro,
cartelito "LOTE 1" colgado del cuello) con pop; el rematador se corre a la derecha y la señala
con el martillo; rótulo de tiza "CLIENTA FIEL".

**s03-la-ficha (6.00 s).** La FICHA DEL LOTE: una pizarra verde con marco de madera (x 120-960,
y 600-1300) titulada "LOTE 1 · CLIENTA FIEL". Se escribe con tiza renglón por renglón, cada uno
con su tilde de tiza: "VIENE TODOS LOS SÁBADOS" (0.0, con un calendario chiquito con los sábados
marcados), "PAGA AL CONTADO" (1.04, billetes), "RECOMIENDA A LA VECINA" (2.18-3.39, flechita a
una cabecita de vecina). "Una joya, señores" (4.38-4.52): una estrella PAJA gigante con brillo
estampa en la esquina "JOYA" y la pizarra se sacude; sparkle.

**s04-en-visto (6.34 s).** "¿El detalle?" (0.09): la pizarra se va y el rematador baja la voz:
una LUPA gigante entra. "El martes" (1.13): una hoja de calendario "MARTES". "le escribió a su
local" (1.74-2.26): un CELULAR grande (crema, y 620-1440) con un chat "TU LOCAL"; burbuja de la
clienta: "¡Hola! ¿Tienen para el sábado?" con la hora "MAR 10:14". "Y la dejaron en visto"
(2.70-4.09): aparecen los dos TILDES de visto, se agrandan, y un sello ROJO "EN VISTO" se estampa
torcido; los tres puntitos de "escribiendo" no aparecen nunca (un cartelito "..." que se
desinfla). UUUH del público (ambiente 18.8). "¿Quién da más?" (5.17-5.48): el celular se va y
cae "¿QUIÉN DA MÁS?" gigante paja con martillo que señala.

**s05-enfrente (4.57 s).** EL DE ENFRENTE: silueta con gorra, se para de golpe en "¡Yo" (0.0) y
levanta su PALETA "7"; arriba de él un toldo chico "ENFRENTE". "un minuto" (1.00-1.10): un
CRONÓMETRO gigante crema con "1:00" que hace tic; "¡1 MINUTO!" en globo. "¡Un minuto el de
enfrente!" (2.21-3.02): el rematador (chico, a la derecha, en su tribuna) lo repite y apunta con
el martillo; el tablero del ambiente cambia a "1 MIN". "¿Quién mejora?" (3.11-3.57): el martillo
barre a la izquierda; signos de pregunta.

**s06-super (5.71 s).** LA DEL SÚPER: silueta con chaleco y CHANGUITO, paleta "12". "envío a
domicilio" (0.80-1.30): una camionetita de reparto cruza la pantalla de izquierda a derecha con
líneas de velocidad y una casita al final. "¡Envío la del súper!" (2.54-3.18): letras gigantes
"¡ENVÍO!" que caen; el tablero cambia a "ENVÍO". "¡Envío!" (3.63): segundo golpe. "¿Quién da
más?" (4.18-4.54): el rematador se inclina hacia el fondo, una flecha de tiza apunta "AL FONDO".

**s07-el-del-fondo (2.46 s).** Lo OSCURO del fondo: la última fila, un tipo tirado en la silla
con los pies arriba, el celular le ilumina la cara (brillo paja), levanta sin ganas su PALETA "3".
"tres de la mañana" (0.89-1.50): una LUNA y un reloj "3:00 AM" aparecen arriba; el "3" de la
paleta se agranda. El tablero cambia a "3 AM".

**s08-vendido (6.57 s).** La cuenta: "¡A la una!" (0.28) un "1" gigante de tiza; "¡A las dos!"
(1.19) un "2"; "¡A las tres... de la mañana!" (2.19-2.76) un "3" con una lunita; los números se
apilan torcidos. "¡Vendido!" (3.59): MARTILLAZO GIGANTE (el martillo baja de arriba sobre el
taco, en primer plano), sello rojo "¡VENDIDO!" que se estampa girando, flash (ambiente) y
sacudón fuerte; murmullo y "¡OOOH!" (ambiente). "Al señor del fondo" (4.19-5.23): flecha que
apunta a la paleta "3" y la clienta que camina hacia ella.

**s09-tarde (5.49 s).** El DUEÑO llega tarde: una puerta de galpón se abre de golpe (izquierda) y
entra corriendo una silueta con DELANTAL, gotas de sudor, líneas de movimiento. "se me hizo
tarde" (1.05): un reloj de pared que gira las agujas. "¿Qué me perdí?" (1.62-2.19): signos de
pregunta alrededor de su cabeza. "Tu mejor cliente, señor" (3.24-3.94): la tarima VACÍA con el
cartelito "LOTE 1" tirado en el piso y un sello "VENDIDO"; "TU MEJOR CLIENTE" gigante paja cae
encima.

**s10-en-venta (3.36 s).** Primer plano del dueño (silueta grande con delantal, brazos arriba),
indignado: "¿Cómo que la remataron?" (0.0-0.57) sacudón y "¿¡REMATARON!?" gigante rojo. "¡Si no
estaba en venta!" (1.67-2.19): levanta un cartón escrito a mano "NO ESTÁ EN VENTA", se sacude.

**s11-se-fue-sola (5.53 s).** EL GIRO. "Nadie la vendió, señor" (0.0-1.00): el sello "VENDIDO"
se tacha con tiza y abajo se escribe "NADIE LA VENDIÓ". "Se fue sola" (1.98-2.20): la CLIENTA
camina de izquierda a derecha con su bolsa, sola, sin cartelito (el cartel "LOTE 1" queda en el
piso). "Con el que le contestó" (3.30-3.80): llega a un CELULAR que se ilumina con una burbuja de
respuesta "¡Hola! Sí, tenemos. ¿Te lo guardo?" y "CONTESTÓ" en paja con tilde.

**s12-agente (8.00 s).** ENTRA SCALERICS (verde `#5ce611`). "El del fondo tiene un agente de IA"
(0.0-1.71): el del fondo durmiendo (zzz) con la luna; a su lado el CELULAR con pantalla verde y
un rótulo "AGENTE DE IA" que se ilumina. "Atiende su WhatsApp a cualquier hora" (2.02-3.43): en
el celular entran burbujas de cliente y respuestas al instante con hora "03:12", "03:13".
"precios" (4.10): una etiqueta de precio sale del celular; "horarios" (4.86): un relojito con
"ABIERTO" sale del otro lado. "le pasa la charla cuando es para él" (5.70-7.05): una flecha verde
del celular al dueño (que se despierta, sol) con rótulo "PARA VOS".

**s13-cta (8.82 s).** CTA. "Hacemos el tuyo" (0.0-0.38): un cartel de madera con letras verdes
"TU AGENTE DE IA" baja colgado. "para que no te rematen a nadie" (0.77-1.72): el cartel "LOTE 1"
con un candado verde y "NO SE REMATA". "¿Cuánto vale tu mejor cliente?" (2.54-3.43): una PALETA
numerada gigante con "?" en vez de número sube al centro. "Ofertá en los comentarios"
(4.30-4.77): la paleta dice "OFERTÁ" y un globo de comentario con tres puntos; el martillo golpea
suave una vez; queda quieto hasta el final (el tablero del ambiente vuelve con "¿TU OFERTA?").
