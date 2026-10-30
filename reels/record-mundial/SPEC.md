# Reel "Récord mundial": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES (el pedido de WhatsApp pasa solo
a la planilla, el aviso de "ya está listo" sale solo, el reporte del día llega al celular),
nombrado una vez, al final. Formato A (polémica con giro) vestido de TRANSMISIÓN EN VIVO DE UN
INTENTO DE RÉCORD MUNDIAL (como el libro de los récords, solo nombrado: nada de logos).

Gancho: el PRESENTADOR (voz Puck, relator eufórico) en voz baja a cámara: "Este hombre está por
batir un récord mundial. Y es lo más triste que vas a ver hoy." Explota: "¡En vivo desde una
rotisería del Cerro! Walter intenta el récord de más pedidos de WhatsApp copiados a mano en una sola
noche." El JUEZ OFICIAL (voz Rasalgethi, grave y burocrático, con portapapeles): "Reglamento
oficial: control C, control V. Sin ayuda. Y sin cenar." Presentador: "¡Pedido ochenta y siete!
¡Dos milanesas, una sin sal!" GRACIELA, la esposa (voz Aoede): "Walter, te traje el mate. ¿Venís a
dormir?" WALTER (voz Charon): "¡Ahora no, Graciela! ¡Me falta avisarles a todos que ya está listo!"
Juez: "Atención: calambre en el dedo índice. El intento sigue en pie." Presentador: "¡Ciento
cuarenta! ¡Ciento cuarenta y uno! ¡Nuevo récord mundial!" (aplausos, confeti). GIRO: el juez baja
la voz: "Felicitaciones, Walter. Lo triste no es el récord. Es que mañana lo vuelve a batir. Y
pasado." Walter: "¿Y qué querés? ¿Que lo haga más rápido?" Juez: "No. Que no lo hagas vos." Cierra
Orus (Scalerics): "Walter no es lento: es el mejor del mundo en algo que ya no hace falta hacer a
mano. En Scalerics hacemos automatizaciones: el pedido pasa solo a la planilla, el cliente recibe el
aviso de que está listo y el reporte del día te llega al celular. Y Walter, a dormir. Etiquetá al
campeón mundial de copiar y pegar."
Voz de 74.8 s, reel de 78.0 s.

## RECURSO VISUAL CENTRAL: el CONTADOR del récord en un ESTADIO de noche
Escenario de estadio de noche: cielo navy, resplandor azul eléctrico sobre el escenario y piso
con líneas azules (lo pinta el index, piso desde y 1500). `ambiente.html` pone encima:
- Arriba (y 64-206, x 150-930): el MARCADOR DEL RÉCORD: a la izquierda "RÉCORD MUNDIAL" (blanco)
  sobre "PEDIDOS A MANO" (mono azul); a la derecha el CONTADOR de tres dígitos dorados que sube con
  la noche: 000 durante la presentación, arranca en "Reglamento" (13.55), clava 087 en "ochenta y
  siete" (21.0) y se queda ahí durante el pedido (hasta 25.6), 140 en 39.1, 141
  en 41.5, titila dorado en "nuevo récord" (42.4). En "mañana" (49.8) vuelve a 000 en ROJO y en
  "pasado" (52.0) otra vez. En "automatizaciones" (63.7) se pone VERDE y sube solo de 000 a 141 en
  2 s, con el rótulo "PASAN SOLOS".
- Dos TORRES DE REFLECTORES en las esquinas de arriba con haces blancos-azulados que barren.
- Una fila de PÚBLICO (siluetas de cabezas, y 1450-1530) que salta en los momentos de euforia.
- Abajo a la izquierda (x 90-420, y 1560-1690): rótulo "EN VIVO" con punto rojo que late y
  "DESDE EL CERRO".
- Abajo a la derecha (x 700-990, y 1560-1690): el RELOJ de la noche ("HORA 23:12" que avanza hasta
  las 03:4x en el récord); en "mañana" pasa a "MAÑANA 23:00" y en "pasado" a "PASADO 23:00".
- CONFETI dorado/blanco/azul en "nuevo récord" (42.4) y en "Etiquetá" (72.8); FLASH en 1.7
  ("récord mundial") y 42.4.
No pongas nada tuyo en esas dos esquinas de abajo ni arriba de y 560.

## Personajes (siempre iguales, dibujados genéricos, sin caras de nadie real)
- WALTER: dueño de rotisería de unos 50, pelado arriba con mechones a los costados y brillo,
  BIGOTE grueso blanco, VINCHA dorada de atleta en la frente, DELANTAL azul eléctrico con
  cartelito "WALTER". Siempre frente a su MONITOR con la PLANILLA y el celular al lado.
- JUEZ OFICIAL: traje negro-navy con contorno blanco, camisa blanca, MOÑO dorado, lentes
  rectangulares, raya al costado, cara seria, PORTAPAPELES dorado con hoja blanca y lapicera.
- PRESENTADOR: saco azul eléctrico, jopo, sonrisa enorme, MICRÓFONO en mano (bola blanca, aro rojo).
- GRACIELA: ruleros azules, bata azul, MATE dorado con bombilla y TERMO bajo el brazo.
Todos: silueta `#050b24` con trazo blanco `#f4f7ff` de 6 px, rellenos planos.

## Estilo: TRANSMISIÓN DE RÉCORD. Edición CARGADA.
Palabras clave GIGANTES que caen en su palabra (Lexend 900, mayúsculas, contorno navy grueso con
`paint-order: stroke`), dígitos de contador en IBM Plex Mono 600 dorados con brillo, sacudones
en los golpes, destellos (estrellitas de 4 puntas), flashes. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Navy `#050b24` (y `#0c1f5c` para paneles): siluetas, contornos de textos, fondos de paneles.
- Azul eléctrico `#2f6bff`: delantal, saco, haces, bordes de paneles, rótulos.
- Blanco `#f4f7ff`: trazos de los dibujos y textos grandes.
- Dorado `#ffc93c`: contador, medalla, certificado, vincha, lo heroico; acento de subtítulos.
- Rojo `#ff3d55`: EN VIVO, calambre, tachaduras, lo triste.
- Desde s12 (Scalerics) se suma verde Scalerics `#5ce611` para lo que funciona solo.
Prohibido: emojis, fotos, rayas largas (—) visibles, logos reales (WhatsApp solo nombrado; el chat
es un globo genérico; el libro de los récords solo nombrado), bordó/dorado de gala.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500/600 para rótulos, dígitos y UI. Nada que haya que
leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420). Marcador y 64-206. Contenido de cada escena entre y 560 y 1440,
x 90-990. Público y 1450-1530 y esquinas de abajo: ambiente. Logo y ~1746.

## Sonidos extra
`aplausos` (3.2 s), `risas` (2.8 s), `uuh` (1.9 s), `redoble` (1.3 s), `beep`, `riser`,
`impact-bass-1/2`, `sparkle`, `chime`, `key-press`, `typing`. Van en el `.sfx.json` de la escena.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el estadio con la paleta de arriba,
> rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
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

**s01-gancho (5.22 s). EL GANCHO.** Cuadro 0: WALTER ya está en su escritorio (centro-izquierda,
x 150-560, y 840-1420) con vincha dorada, frente a un MONITOR con la planilla (derecha, x 600-950,
y 860-1160), bajo un cono de luz; el celular al lado. Teclea (manos que suben y bajan). "Este
hombre" (0.28): flecha roja gigante que lo señala. "récord mundial" (1.67): cae "RÉCORD MUNDIAL"
dorado gigante (y 600-760), flash del ambiente, sacudón. "lo más triste" (3.52): el texto se
cambia por "LO MÁS TRISTE" en blanco/rojo; a Walter le cae una gota de sudor/lágrima, un solo
papelito de confeti cae lento y triste; `uuh`.

**s02-en-vivo (8.33 s).** El PRESENTADOR a la izquierda (x 120-470, y 820-1430) con micrófono en
alto, saltando. "¡En vivo" (0.09): sello rojo "EN VIVO" que cae. "rotisería del Cerro" (0.98):
cartel dorado colgando "ROTISERÍA DEL CERRO". "Walter" (2.41): a la derecha la tarjeta de Walter
(busto en un marco azul con su nombre). "pedidos" (4.64): se arma un panel CONTADOR gigante "000"
(centro, y 1180-1400) con rótulo "PEDIDOS COPIADOS A MANO" en "copiados" (5.85). "una sola noche"
(7.14): luna en cuarto que hace pop y rótulo "EN UNA NOCHE".

**s03-reglamento (6.97 s).** El JUEZ de cuerpo entero (derecha, x 620-960) con el portapapeles.
A la izquierda un pliego "REGLAMENTO OFICIAL" (x 110-560, y 600-1400) que se despliega en
"Reglamento" (0). Tres renglones que se dibujan y se tildan: "control C" (2.0) y "control V"
(2.59): dos TECLAS gigantes "CTRL + C" y "CTRL + V" que se hunden; "Sin ayuda" (4.2): renglón con
X roja; "sin cenar" (5.92): un plato con cubiertos tachado en rojo. El juez se acomoda los lentes y
anota.

**s04-pedido (5.12 s).** CONTADOR GIGANTE (dígitos de 260 px, centro, y 620-900) que va
085, 086 y en "siete" (1.09) clava 087 con sacudón y destello. "Dos milanesas, una sin sal"
(1.91-3.90): un globo de chat genérico (abajo izquierda) con "2 MILANESAS" vuela a la planilla
(abajo derecha) y se pega como fila; "SIN SAL" (3.90) cae como sello rojo. Teclas CTRL C / CTRL V
que titilan.

**s05-mate (3.72 s).** GRACIELA entra por la izquierda con el mate y el termo; WALTER a la
derecha, pegado al monitor, ni la mira. "mate" (1.53): estira el mate, sale vapor. "¿Venís a
dormir?" (2.39-2.76): globo de pensamiento con una cama y una luna; Walter teclea más rápido.

**s06-listo (4.02 s).** WALTER grita de frente (centro) "¡AHORA NO!" gigante rojo (0-0.4), Graciela
sale de cuadro. "avisarles a todos" (1.7-2.2): una cascada de 6 globos de chat iguales "YA ESTÁ
LISTO" que salen de su celular uno atrás de otro (tecla por tecla). "listo" (2.9): "LISTO" dorado
gigante con sacudón.

**s07-calambre (5.19 s).** Primer plano de una MANO gigante con el índice sobre la tecla V.
"Atención" (0): banda roja "ATENCIÓN" con sirena que gira. "calambre" (0.94): el dedo se dobla
torcido, rayitos rojos en zigzag, temblor; "dedo índice" (1.65): círculo rojo sobre el dedo.
"sigue en pie" (2.94-4.35): curita en el dedo, el portapapeles del juez entra y estampa "VÁLIDO".

**s08-record (7.12 s).** CONTADOR GIGANTE 139 que pasa a 140 en "cuarenta" (0.52) y a 141 en
"uno" (2.88), cada uno con sacudón. "¡Nuevo récord mundial!" (3.78-4.95): el contador sube y se
achica, baja una MEDALLA dorada enorme con cinta azul y "141" grabado, rayos que giran detrás,
"NUEVO RÉCORD MUNDIAL" gigante, confeti y aplausos (ambiente).

**s09-triste (7.30 s).** El CERTIFICADO dorado (centro, x 150-930, y 640-1240) con borde, sello
rojo y cinta azul: "CERTIFICADO OFICIAL · WALTER · 141 PEDIDOS COPIADOS A MANO". "Lo triste"
(1.8): la luz baja (velo navy), el juez entra de costado y habla bajito. "mañana" (4.09): una
hoja de calendario "MAÑANA" tapa el certificado con un contador "000" rojo. "pasado" (6.26):
otra hoja "PASADO" encima, "000" otra vez.

**s10-rapido (5.18 s).** WALTER (izquierda, con la medalla puesta) y el JUEZ (derecha). "¿Que lo
haga más rápido?" (0.5-1.2): globo de Walter "¿MÁS RÁPIDO?" con cronómetro y líneas de velocidad.
"No." (2.19): el juez levanta la mano, "NO." gigante blanco. "Que no lo hagas vos." (3.04-3.79):
"QUE NO LO HAGAS" y "VOS." gigante dorado con una flecha a Walter; a Walter se le cae la mandíbula.

**s11-lento (4.54 s).** Entra Orus. WALTER en el PODIO del 1 (centro) con la medalla, solo. "no es
lento" (0.35-0.71): una tortuga genérica tachada en rojo. "el mejor del mundo" (1.52-2.05): un
globo terráqueo de líneas detrás con estrellitas. "a mano" (3.75): sello rojo "A MANO" que tacha
una mano que copia.

**s12-solos (8.41 s).** Llega el verde. "automatizaciones" (0.99): rótulo "AUTOMATIZACIONES" (blanco
y verde, y 600-700). Un flujo de tres pasos que se arma solo: un globo de chat "PEDIDO" (izq.) con
flecha verde a la PLANILLA (der.), que llena sus filas sola con tildes verdes en "pasa solo"
(2.78-3.49); "el cliente recibe el aviso" (4.30-5.73): un celular con la notificación "TU PEDIDO
ESTÁ LISTO" y tilde verde; "reporte del día" (6.53-7.69): un segundo celular con "REPORTE DEL DÍA"
y barras que crecen.

**s13-cta (6.90 s).** CTA. "Y Walter, a dormir." (0-0.71): WALTER dormido en la cama con la
medalla sobre el pecho, Zzz y luna. "Etiquetá" (1.63): cae
"ETIQUETÁ AL CAMPEÓN MUNDIAL" y "DE COPIAR Y PEGAR" dorado, con un badge "@" que late; confeti del
ambiente. Queda quieto pero vivo hasta el final (Zzz y destellos).
