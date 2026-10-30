# Reel "El museo": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: la
TIENDA ONLINE (vende sola, con foto y precio, Mercado Pago, envíos por DAC, Correo o PedidosYa),
nombrada una sola vez, al final. Formato A (polémica con giro) montado como una VISITA GUIADA a un
museo.

Una GUÍA DE MUSEO (voz Kore, solemne, aburrida, humor seco) recibe a la excursión: "Bienvenidos al
Museo del Comercio Antiguo. Nuestra pieza estrella todavía abre todos los días. Es tu local." Y
recorre las vitrinas con placas de bronce: "Vitrina uno: el cartel de «consultá precio por
privado». Circa 2015. Nadie supo nunca cuánto salía nada." "Vitrina dos: el catálogo. Tres fotos
borrosas en una historia de Instagram, que se borraba sola al otro día." "Vitrina tres: la
libreta de pedidos. Una mancha de café, y un pedido de marzo que nadie entregó." "Y la joya de la
colección: el ritual del «pasá a buscarlo». De nueve a seis. Si estaba abierto." Un NENE de la
excursión (voz Leda subida de tono): "Señora, ¿y la gente compraba así?" La guía: "No. Por eso
está en el museo." Un TURISTA (voz Fenrir, canchero, celular en mano): "Qué reliquia. Le saco una
foto… y ya que estoy, compro lo mismo en otra tienda. Me llega mañana." GIRO: la guía se para
frente a un estante SIN vidrio: "Esto, en cambio, no es de museo: tu mercadería. Lo mejor del
barrio. Lo único antiguo es cómo te compran." Entra el NARRADOR (Orus): "En Scalerics hacemos tu
tienda online: tus productos con foto y precio, pago con Mercado Pago y envío por DAC, Correo o
PedidosYa. Vende sola, hasta con la cortina baja. Mandáselo al que todavía dice «pasá a
buscarlo». Antes de que lo pongan en una vitrina."
188 palabras. Voz de 70.06 s, reel de 73.26 s. 11 parlamentos en `partes/` (`voces.sh`,
`cortar.sh`, `componer.mjs`: atempo por voz, eco chico de sala en las voces del museo, el nene
con la voz un poco más aguda).

## RECURSO VISUAL CENTRAL: la VITRINA con su PLACA DE BRONCE
Cada "pieza" del comercio viejo está expuesta como una reliquia: sobre un PEDESTAL de mármol,
adentro de una VITRINA de vidrio con reflejos que barren, iluminada por un foco cenital cálido, con
una PLACA DE BRONCE grabada (título en Cinzel, descripción en Cormorant itálica, fecha "CIRCA
2015"). Delante de todo, en primer plano, el CORDÓN DE TERCIOPELO bordó entre dos postes dorados
con el cartelito "NO TOCAR" (lo pone `ambiente.html`): el que mira está del lado del público. En
el GIRO ("no es de museo", 49.13) el cordón se desengancha del poste derecho y cae: la mercadería
no es de museo, se puede tocar (y comprar). Las piezas y la placa salen de `assets/museo.js`.

## ESTILO: MUSEO. Edición CARGADA pero solemne
Pared de sala oscura (bordó casi negro) con boiserie, riel de bronce en y 522, piso de MÁRMOL
(y 1440-1670, vetas grises) y zócalo negro abajo con el logo (lo pone el fondo del index,
`armar.mjs`). `ambiente.html`: haces de luz cálida desde el techo, POLVO flotando en el haz, pozo
de luz en el piso, viñeta y el cordón. Ilustración PLANA con contorno oscuro `#120d0f` de 4-6 px
(no líneas crema): rellenos de mármol, bronce, bordó, vidrio translúcido. Personajes genéricos
dibujados: la guía (rodete gris, anteojos, saco bordó, puntero de madera), el nene (gorrito, mochila,
mano levantada), el turista (piluso, camisa, celular). Movimiento: entradas con pop o "golpe"
(scale 2.2 a 1 en 0.14 s), reflejos que barren el vidrio, polvo, flashes de cámara, sellos. Nada
quieto más de ~1 s. Lo que habla el narrador (s13-s15) puede ser más limpio.

## Paleta (SOLO estos colores)
- Negro museo `#120d0f` / pared `#2a1a1e`: contornos, fondos, texto sobre bronce.
- Mármol `#ece8e1` (claros `#f6f3ee`, sombra `#cfc8bc`, veta `#a69f93`): pedestales, piso, papel.
- Bronce `#a8762f` / bronce claro `#e8b866` (brillo `#f3d69a`): placas, marcos, postes, acento de
  subtítulos.
- Terciopelo bordó `#7a1424` (brillo `#a8303f`): cordón, saco de la guía, sellos, lo que "no".
- Vidrio: blanco con opacidad 0.08-0.2 y bordes `rgba(236,244,244,0.7)`.
- Solo en s13-s15 (la tienda online) se suma verde Scalerics `#5ce611` (botón comprar, tilde).
Prohibido: emojis, fotos, rayas largas (—), logos reales (Instagram, Mercado Pago, DAC, Correo y
PedidosYa solo como texto en cajitas o chips), caras de personas reales.

## Tipos de letra
- Cinzel (`assets/fonts/Cinzel-var.woff2`, 400-900, solo mayúsculas): placas, carteles de sala,
  títulos de museo.
- Cormorant Garamond (`CormorantGaramond-600.woff2`, `CormorantGaramond-Italic-500.woff2`):
  descripciones de las placas.
- Caveat (`Caveat-var.woff2`): letra a mano en la libreta y el cartelito de cartón.
- Lexend / IBM Plex Mono: UI de celulares y la tienda online.
- Subtítulos: Lexend 600 mármol con sombra dura negra y acento bronce claro (los arma `armar.mjs`).
Mínimo 26 px lo que hay que leer.

## Zona
Subtítulos en y 236 a ~420. Contenido de cada escena entre y 560 y 1440 (la base de los pedestales
apoya en el piso, y 1440). El cordón (ambiente) cruza por delante entre y 1330 y 1600: lo que esté
detrás de y 1330 en el centro queda tapado por el cartelito "NO TOCAR", así que nada importante
ahí. Logo de Scalerics en y ~1746 (zócalo negro).

## `assets/museo.js` (cargarlo en cada escena después de GSAP)
- `MU.llenar(root)`: reemplaza `<div data-mu="pedestal" data-w data-h>` y
  `<div data-mu="vitrina" data-w data-h>` por su SVG (el div tiene que tener width y height en px).
- Clases globales: `.mu-placa` (placa de bronce: `<div class="mu-placa"><div class="mu-t">TÍTULO</div>
  <div class="mu-d">descripción</div><div class="mu-f">CIRCA 2015</div></div>`), `.mu-sello`
  (sello bordó rotado), `.mu-sala` (cartel de sala, Cinzel sobre negro con filete de bronce).
- `MU.kit(tl, root)` devuelve `{ q, qa, pop, golpe, sacudon, dibujar, reflejo, salida }`:
  `pop(el, t)`, `golpe(el, t)` (de 2.2x a 1x), `sacudon(el, t, f)`, `dibujar(path, t, d)`,
  `reflejo(vitrinaDiv, t)` (los reflejos barren el vidrio), `salida(el, DUR)` (opacity 0 + blur
  en los últimos 0.25 s).

## Lo que ya está hecho (no tocar)
`index.html` y `subtitulos.html` (los genera `armar.mjs`), `compositions/ambiente.html`, el fondo.

## Escenas (tiempos relativos a cada escena; ver `tiempos.md`)

### s01-bienvenidos (2.75 s): la entrada del museo
Frontispicio de museo (columnas de mármol, frontón triangular) a medio dibujar en el cuadro 0; en
el friso, en Cinzel: "MUSEO DEL COMERCIO" y abajo, grande, "ANTIGUO" (golpe en "Antiguo" 1.92 con
sacudón). Una cinta bordó de inauguración. Cámara que se acerca lento.

### s02-pieza (4.67 s): la pieza estrella
Pedestal enorme bajo el foco, con vitrina. "pieza estrella" 0.33-0.58: estrellitas de bronce
alrededor. "todavía abre todos los días" 1.08-2.42: adentro de la vitrina aparece un LOCALCITO en
miniatura (toldo bordó, persiana que SUBE en "abre" 1.67, cartel "ABIERTO" que se da vuelta).
"Es tu local" 3.19-3.58: la placa de bronce cae con golpe: "TU LOCAL · pieza en uso · CIRCA
SIEMPRE"; reflejo que barre el vidrio.

### s03-cartel (5.97 s): vitrina uno
Cartel de sala "VITRINA I" arriba (0.0). En la vitrina, un cartel de cartón escrito a mano (Caveat):
"CONSULTÁ PRECIO POR PRIVADO" (aparece en 2.18, palabra por palabra hasta 3.2). "Circa 2015"
4.23-4.56: placa "CARTEL DE PRECIO · Cartón y marcador · CIRCA 2015". Reflejo.

### s04-precio (2.63 s): nadie supo nunca
Primer plano de una etiqueta de precio de cartón colgando de un hilo, con "$ ?" que gira; en
"cuánto" 1.10 se multiplican signos de pregunta de bronce; "nada" 1.71: sello bordó "PRECIO
DESCONOCIDO".

### s05-catalogo (6.24 s): vitrina dos
"VITRINA II". Un celular dentro de la vitrina con una historia de Instagram: barra de progreso
arriba, tres fotos borrosas (rectángulos con blur) que entran en "Tres fotos borrosas" 1.72-2.54.
"se borraba sola" 4.34-4.83: la barra de progreso llega al final y las fotos se desvanecen; queda
la pantalla vacía. Placa "CATÁLOGO EFÍMERO · duraba un día".

### s06-libreta (6.58 s): vitrina tres
"VITRINA III". Libreta abierta en un atril (papel crema, renglones, letra Caveat): "Sra. de la
esquina: 2 frascos", "Pedro: ¿?", "MARZO: 1 mesa" ... "mancha de café" 2.88: aparece un anillo
marrón; "pedido de marzo" 4.07-4.55: se marca con círculo bordó; "nadie entregó" 5.19: sello
"SIN ENTREGAR". Placa "LIBRETA DE PEDIDOS · manuscrito".

### s07-ritual (7.04 s): la joya de la colección
"joya" 0.25: foco más fuerte, destellos. Pedestal de honor con cordoncito propio; colgando, el
cartelito de puerta: "PASÁ A BUSCARLO" (3.02-3.28) con horario "DE 9 A 18" (4.43-5.24). "Si
estaba abierto" 5.64-6.15: el cartelito se da vuelta y dice "CERRADO". Placa "EL RITUAL ·
pasá a buscarlo".

### s08-nene (2.80 s): la pregunta
El nene de excursión (gorrito, mochila) levanta la mano en "Señora" (0.0); globo de diálogo
"¿Y LA GENTE COMPRABA ASÍ?" que se escribe en "compraba" 1.51.

### s09-museo (2.59 s): la respuesta
La guía (rodete gris, anteojos, saco bordó, puntero) de frente: "No." 0.0 con sello gigante "NO";
"museo" 1.31: ella apunta con el puntero a una vitrina; cartel "POR ESO ESTÁ EN EL MUSEO".

### s10-turista (6.58 s): el turista
El turista con piluso saca el celular. "foto" 1.76: FLASH de cámara (blanco). "compro lo mismo en
otra tienda" 3.38-4.26: en su celular, una tienda online genérica ("OTRA TIENDA"), botón COMPRAR
que se aprieta, "PAGADO". "Me llega mañana" 4.91-5.28: chip "LLEGA MAÑANA". Él sonríe, se va.

### s11-mercaderia (5.08 s): el giro
Sin vidrio: un estante de madera bajo el foco con la mercadería (un mate, un frasco, un buzo
doblado, una caja) que brilla. "Esto, en cambio" 0.0: la guía se detiene (silueta chica al
costado). "no es de museo" 1.28-1.78: la VITRINA se levanta y desaparece hacia arriba (y el cordón
del ambiente cae). "tu mercadería" 2.80: etiqueta "TU MERCADERÍA". "Lo mejor del barrio" 3.90-4.41:
estrellas / medalla de bronce "LO MEJOR DEL BARRIO".

### s12-antiguo (3.13 s): lo antiguo
Las piezas viejas (cartel de cartón, libreta, celular con historia, cartelito "pasá a buscarlo")
en fila sobre un pedestal largo, con una placa: "ANTIGUO" (0.51) y abajo "CÓMO TE COMPRAN"
(1.62-1.95), golpe y sacudón.

### s13-tienda (7.63 s): la tienda online (narrador)
"Scalerics" 0.31: el celular grande (limpio, mármol con verde) con "TU TIENDA ONLINE" (1.16). Grilla
de productos con foto y precio (2.32-3.21). "Mercado Pago" 4.29: botón "Pagar con Mercado Pago"
(texto). "DAC, Correo, PedidosYa" 5.63-6.61: tres chips que entran de a uno.

### s14-sola (2.44 s): vende sola
El local en miniatura con la persiana baja de noche ("cortina baja" 1.21-1.48), y arriba del
local un celular que suma notificaciones "NUEVA VENTA" (0.0, 0.32, 0.85).

### s15-cta (7.13 s): mandáselo
Una VITRINA vacía con placa "RESERVADA" que se completa: "PARA EL QUE DICE «PASÁ A BUSCARLO»"
(1.18-1.55). "Mandáselo" 0.0: avión de papel / botón compartir de bronce que late. "Antes de que
lo pongan en una vitrina" 2.51-3.36: la vitrina baja sobre... nada, con "ESPACIO DISPONIBLE".
Queda quieta ~3 s con el logo.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es museo con la paleta de arriba. Sí
> valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

