# Reel "El roast": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: el
SITIO WEB (rápido en el celular, horarios de verdad, ubicación justa, botón a WhatsApp), nombrado
una sola vez, al final. Formato A (polémica con giro) en forma de ROAST de stand-up.

Un COMEDIANTE canchero (voz Fenrir) sube al escenario de un club de comedia y le da con todo a la
presencia en internet de "tu negocio": "Buenas noches. Hoy rosteamos a tu negocio. Y no va a
quedar nada." La página hecha en 2014 que en el celular todavía está cargando, con contador de
visitas (y todas las visitas sos vos). Google dice "abierto los domingos": fue un domingo y lo
atendió la cortina. Una del PÚBLICO (voz Leda) grita: "¡A mí me pasó lo mismo!". La foto del
local de noche, movida, con un perro en la puerta: "parece de un secuestro". Precios: "consultas
por privado", y el privado no lo contestás. El mapa: "cómo llegar" te deja en otra cuadra,
terminó en una ferretería y compró un martillo, por las dudas. Risas del público en cada remate.
GIRO: "Pero bueno, ya que estaba, entré. Pedí la milanesa." Mordisco, silencio. "Pará. Pará un
poco. Esta es la mejor milanesa del barrio. ¿Y por qué nadie lo sabe? Lo de adentro es
buenísimo. Lo de afuera no te hace justicia." Entra el narrador de Scalerics (voz Orus): "Hacemos
tu sitio web: rápido en el celular, con horarios de verdad, la ubicación justa y un botón a
WhatsApp. Que lo de afuera esté a la altura. Dejá el @ de tu local y te lo rosteamos."
Voz de 70.4 s, reel de 73.65 s.

## RECURSO VISUAL CENTRAL: el CARTEL DE PUNTAJE que va bajando
Abajo a la derecha (lo pone `ambiente.html`, x 800-1010, y 1540-1700) hay una paleta de jurado
"PUNTAJE · AFUERA" con un número gigante que BAJA en cada remate: 10 (en "nada") → 8 ("vos") →
6 ("cortina") → 4 ("secuestro") → 3 ("contestás") → 1 ("dudas"). Se va con el giro (43.9) y en
s11 vuelve como DOS carteles: ADENTRO 10 / AFUERA 1. En s12, cuando Scalerics hace el sitio,
AFUERA sube a 10. No pongas nada tuyo en esa esquina.

## ESTILO: CLUB DE COMEDIA. Edición CARGADA.
Pared de ladrillo (la pone el fondo del index), cortinas rojas de terciopelo a los costados
(ambiente), un cartel de NEÓN rosa "NOCHE DE ROAST" arriba de todo (ambiente, y 70-200), el FOCO
amarillo que cae sobre el escenario, tablas del piso desde y 1530. Las cosas que se rostean son
DIBUJOS de líneas gruesas color hueso con rellenos planos, como carteles del show; cada remate
tiene una ONOMATOPEYA de risas ("JA JA JA", la pone ambiente abajo a la izquierda) y un golpe de
batería (`redoble`). Palabras clave GIGANTES que caen en su palabra (Lexend 900, mayúsculas),
sacudones, flashes del foco, cosas que se tuercen y se caen. Nada quieto más de ~0.8 s.
El COMEDIANTE es una silueta negra genérica con saco (sin cara: solo contorno hueso y un
brillito) con su micrófono de pie; aparece en s01, s10 y s13. NADA de comediantes reales.

## Paleta (SOLO estos colores)
- Ladrillo `#6e2a1f` / `#3a1712`: fondos de carteles, sombras cálidas.
- Rojo cortina `#c1122f`: lo que está mal, tachaduras, sellos, la cortina metálica.
- Negro escenario `#0b0708`: rellenos, siluetas, contornos gruesos de los textos.
- Amarillo foco `#ffd23f`: el foco, los números del puntaje, lo bueno (la milanesa), acento de subtítulos.
- Rosa neón `#ff3d9a`: el neón, los "JA JA", las palabras-chiste. Con brillo (text-shadow/drop-shadow del mismo color, 1-2 por escena).
- Hueso `#f6efe4`: textos grandes y trazos de los dibujos.
- Desde s12 (Scalerics) se suma verde Scalerics `#5ce611` para lo que funciona (tildes, botón, el 10 que sube).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales (ni Google, ni
WhatsApp, ni mapas reales: todo dibujos genéricos; "Google" solo se nombra en la voz y como
texto chico de buscador genérico si hace falta).

## Tipos de letra
Lexend 700-900 para lo grande (con `-webkit-text-stroke` o `paint-order: stroke` negro grueso,
estilo cartel); IBM Plex Mono 500 para rótulos y UI. Nada que haya que leer de menos de 26px
(lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420, `subtitulos.html`); el neón está en y 70-200. Contenido de cada
escena entre y 560 y 1500, x 100-980 (las cortinas ocupan x 0-90 y 990-1080). Abajo a la
izquierda (x 90-460, y 1530-1700) van las risas de ambiente; abajo a la derecha el puntaje.
Logo de Scalerics en y ~1746.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo de ladrillo, foco, piso.
- `compositions/ambiente.html`: cortinas, neón (titila al arrancar y en 48.9 se apaga y prende
  cuando "pará"), cono de luz, PUNTAJE, risas "JA JA" en 15.2, 20.9, 30.9, 35.0, 42.5 y 70.3, y FLASH
  del foco en 4.98 ("nada") y 52.3 ("mejor milanesa").
- `compositions/subtitulos.html`, `compositions/s01-roast.html`.

## Sonidos extra de este reel
`risas` (público riéndose, 2.8 s), `uuh` (público "uuuh", 1.9 s), `redoble` (ba-dum-tss, 1.3 s),
`beep`, `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `riser`. Las risas, el uuh y
el redoble van en el `.sfx.json` de la escena donde cae el remate.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el club de comedia con la paleta de
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


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-roast (6.26 s).** Cuadro 0: el micrófono de pie ya está en el foco (centro, y 900-1440) y la
silueta del comediante entrando desde la derecha. "Buenas noches" (0.0): saluda (brazo arriba).
"rosteamos" (1.54): cae gigante "HOY ROSTEAMOS" (hueso, y ~600) y abajo, en rosa neón, "A TU
NEGOCIO" (2.54). Al lado del micrófono, un LOCALCITO dibujado (toldo a rayas, cartel "TU NEGOCIO")
arriba de una PARRILLA con brasas (roast = asado). "Y" (2.73) pausa: el local traga saliva (una
gota). "no va a quedar nada" (3.75-4.98): salen llamas amarillas/rojas de la parrilla, el local
se sacude; en "nada" golpe: "NADA" gigante rosa, sacudón fuerte, flash (ambiente) y el
puntaje aparece en 10. Sonidos: redoble al final no; `uuh` en "nada".

**s02-pagina (3.37 s).** "Arranquemos por tu página web" (0.0-1.0): una ventana de navegador
viejo entra torcida: barra gris con tres botones, adentro "BIENVENIDOS A MI PÁGINA" en letra
gigante fea centrada, una franja amarilla y negra de "EN CONSTRUCCIÓN", un contador de visitas
chiquito. "2014" (2.46): un sello gigante rojo "2014" se estampa encima, la ventana tiembla.

**s03-cargando (6.80 s).** "En el celular" (0.63): un CELULAR (rectángulo redondeado hueso)
grande; adentro la misma página aplastada y un circulito de carga que gira. "todavía está
cargando" (1.48-1.90): una barra de progreso que llega a 99 % y se queda; al costado unas hojas
de calendario que vuelan (2014, 2018, 2022, 2026) y una telaraña en la esquina del celular.
"Tiene contador de visitas" (2.88): el celular se va a un costado y entra un contador mecánico
grande "VISITAS 000004". "Y todas las visitas" (4.18): flechas apuntando al que mira. "sos vos"
(5.18): "SOS VOS" gigante rosa con un dedo que señala a cámara; redoble y risas (ambiente pone
"JA JA" en 15.2 = 5.57 de la escena). El puntaje baja a 8.

**s04-domingo (5.65 s).** "Google dice" (0.0): una ficha de buscador genérica (tarjeta hueso, sin
logo): nombre "Tu Negocio", estrellitas, y la línea "ABIERTO · Domingo 9 a 21" en amarillo
con un puntito. "abierto los domingos" (0.82-1.64): "ABIERTO" se agranda y late.
"Fui un domingo" (2.39-2.73): un calendario "DOMINGO" que cae. "Me atendió la cortina" (3.49-4.0):
la ficha se va y BAJA de golpe una CORTINA METÁLICA de local (rojo cortina, con rayas
horizontales y candado) que tapa todo el centro; en "cortina" golpe y un cartelito colgando
"CERRADO". Risas y redoble al final (ambiente "JA JA" en 20.9 = 4.47). Puntaje a 6.

**s05-publico (2.17 s).** Plano del público: siluetas de cabezas negras abajo (y 1250-1500, de
espaldas) y una de ellas, una mujer con pelo largo, se PARA de un salto y le sale un globo de
grito gigante (borde rosa neón): "¡A MÍ ME PASÓ LO MISMO!" que entra palabra por palabra. Las otras
cabezas se dan vuelta a mirarla. Sacudón en "mismo".

**s06-foto (7.46 s).** "¿Ves? Le pasa a todos" (0-0.82): el comediante no está; entra una ráfaga
de varias fichas iguales de comercios con "CERRADO" (le pasa a todos), que se apilan. "La foto
del local" (1.70-2.28): las fichas se van y entra una FOTO grande (marco hueso de polaroid
torcida): un local de noche, todo azul-negro, con la vidriera; en "de noche" se oscurece; en
"movida" (3.86) se le aplica un blur/duplicado movido (doble contorno corrido); en "perro" (4.82)
aparece un perro sentado en la puerta (silueta simple con orejas). "Parece de un secuestro"
(5.55-6.37): la foto queda sostenida por una mano/pinza y arriba un cartel tipo recorte de diario
"PRUEBA DE VIDA" con letras de distintos tamaños (estilo nota de secuestro); el perro mira a
cámara. Risas (ambiente 30.9 = 6.65). Puntaje a 4.

**s07-privado (4.33 s).** "¿Precios?" (0.0): una ETIQUETA DE PRECIO gigante colgada de un hilo
(hueso, agujerito) con "$ ???". "Consultas por privado" (0.66-1.27): la etiqueta da vuelta y dice
"CONSULTAS POR PRIVADO" en rosa. "Y el privado" (2.16): aparece un chat de celular: burbuja del
cliente "¿Precio?" con dos tildes, y debajo un "escribiendo..." que se apaga. "no lo contestás"
(2.54-2.73): sello rojo "VISTO" y telaraña sobre el chat; una hora que corre (10:02 → 23:59).
Risas y redoble (ambiente 35.0 = 3.29). Puntaje a 3.

**s08-mapa (7.87 s).** "¿Y el mapa?" (0.18): un MAPA de cuadras genérico (calles hueso finas,
manzanas ladrillo) visto desde arriba, con un pin rosa "TU NEGOCIO". "Le das a cómo llegar"
(1.25-1.82): un botón "CÓMO LLEGAR" que se aprieta; una ruta punteada amarilla se dibuja. "y te
deja en otra cuadra" (2.18-2.82): la ruta termina en la manzana EQUIVOCADA, lejos del pin, y una
banderita "LLEGASTE" ahí. "Terminé en una ferretería" (3.70-4.27): en ese lugar pop de un
localcito con cartel "FERRETERÍA". "Compré un martillo" (4.58-5.26): un MARTILLO gigante gira y
cae al frente. "por las dudas" (5.91-6.18): el martillo se apoya en el hombro de la silueta del
comediante o golpea la mesa; sacudón. Risas y redoble (ambiente 42.5 = 6.46). Puntaje a 1.

**s09-milanesa (5.08 s). EL GIRO.** Cambio de clima: el foco se cierra (la escena oscurece los
bordes). "Pero bueno, ya que estaba, entré" (0-1.64): una puerta de local que se abre con
campanita. "Pedí la milanesa" (2.72-3.0): llega un PLATO (vista de 3/4) con una MILANESA dorada
grande (amarillo foco con textura de pan rallado, puntitos) y una rodaja de limón, cubierto al
lado; vapor que sube. Después de "milanesa" (3.4): un tenedor pincha y se lleva un pedazo:
"CRUNCH" gigante amarillo (onomatopeya de cómic) con sonido de impacto, y la escena queda en
SILENCIO, el vapor subiendo (el comediante mastica). Nada de risas.

**s10-para (7.75 s).** "Pará." (0.0): la silueta del comediante, quieta, con el tenedor en la
mano, en el foco; el neón se apaga y prende (ambiente). "Pará un poco" (0.19-1.52): "PARÁ" gigante
hueso que tiembla, un "..." encima de la cabeza. "Esta es la mejor milanesa del barrio"
(2.99-4.47): entra una MEDALLA/ escarapela dorada gigante "LA MEJOR MILANESA DEL BARRIO" con
destellos, flash (ambiente 52.3 = 3.31 de la escena). "¿Y por qué nadie lo sabe?" (4.85-6.28): la
medalla se achica y queda chiquita en un cuarto oscuro; signos de pregunta rosa que caen; en
"nadie" (5.90) "NADIE" gigante rojo; en "sabe" se escucha `glitch-1`.

**s11-adentro (4.52 s).** Dos PALETAS DE JURADO gigantes lado a lado. "Lo de adentro es
buenísimo" (0-0.53): la izquierda "ADENTRO" con "10" amarillo enorme y brillos, chime. "Lo de
afuera no te hace justicia" (2.37-3.20): la derecha "AFUERA" con "1" rojo, temblando; en
"justicia" la de AFUERA se cae de costado.

**s12-sitio (7.12 s). Entra Scalerics (Orus).** "Hacemos tu sitio web" (0-0.75): un CELULAR
grande con la página nueva que se arma sola: arriba el nombre del local y una foto dibujada de la
milanesa. "rápido en el celular" (1.41-1.87): un rayo y un tilde verde con la palabra
"CARGA AL TOQUE" (sin cifras). "con horarios de verdad" (2.56-3.09): fila "HOY · ABIERTO 12 a 23" con tilde
verde; "la ubicación justa" (3.37-4.12): un mapita con el pin justo arriba del local; "y un botón a
WhatsApp" (4.49-5.05): botón verde grande "ESCRIBINOS" (sin logo) que late. "Que lo de afuera
esté a la altura" (5.33-6.45): el celular sube a la altura de la medalla de la milanesa; el
puntaje de ambiente sube a 10 en verde en "altura".

**s13-cta (5.27 s).** El comediante vuelve al micrófono en el foco. "Dejá el @ de tu local"
(0-0.73): "DEJÁ EL @" gigante (el @ rosa neón con brillo) y "DE TU LOCAL" abajo. "y te lo
rosteamos" (1.01-1.62): "Y TE LO ROSTEAMOS" en amarillo, con llamitas en la parrilla chiquita
otra vez. Queda quieto con movimiento suave (el neón latiendo, el comediante que se balancea) los
últimos ~3 s, con risas y aplausos (`risas`). Sin salida con blur: el reel termina ahí.
