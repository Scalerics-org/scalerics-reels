# Reel "El velorio": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Especial del DÍA DE LOS
DIFUNTOS (2 de noviembre) en formato VELORIO URUGUAYO, con humor negro liviano (nunca morboso:
nadie se muere de verdad, es un cliente que "murió esperando una respuesta"). Vende UNA cosa: el
AGENTE DE IA (contesta a cualquier hora y le hace el seguimiento al que preguntó y no compró).

Historia: en una sala velatoria, EL DE LA FUNERARIA abre: "Estamos reunidos para despedir a un
cliente. Y lo mataste vos." LA TÍA llora a los gritos ("¡Tan joven! ¡Con tantas ganas de
comprar!"). Causa de muerte: preguntó un precio un domingo, le contestaron el jueves. EL DUEÑO
salta ("¡Pero le contesté!") y EL VECINO DEL TERMO, mate en mano, lo baja: "Tarde, campeón. Como
dicen en Coco: uno se muere de verdad cuando lo olvidan." Las coronas: "Con cariño, tus amigos del
visto" y "Pasá el lunes". La tía: "¡Y ni siquiera le avisaste que había llegado lo que buscaba!"
GIRO: se abre la puerta y entra EL CLIENTE, vivito: "¡Eh! ¿Qué hacen? ¡Estoy vivo!" "¡Resucitó!"
"No resucité, señora. Me fui al de enfrente": preguntó a las once de la noche y el agente de IA
de enfrente le contestó en un minuto, le pasó el precio, le agendó y al otro día le escribió por
si le quedaba alguna duda. El vecino: "Y ta. Para vos se murió. Para el de enfrente, está más vivo
que nunca." Entra Orus (Scalerics). Cierre: "Dejale una flor en los comentarios al cliente que
dejaste en visto."

Seis voces: el de la funeraria (Algenib, grave y solemne), la tía (Gacrux, llanto de
telenovela), el dueño (Charon), el vecino del termo (Fenrir, sobrador), el cliente (Puck), el
narrador (Orus). Voz de 72.12 s; reel de 75.32 s.

## ESTILO: SALA VELATORIA LILA, NEGRO Y DORADO
Una sala velatoria de barrio, de noche, iluminada por cirios: fondo negro violáceo con un
resplandor lila al centro y calor dorado abajo (lo pone index). `ambiente.html` pone cortinas de
terciopelo a los costados con galería arriba y fleco dorado, un papel tapiz de rombos apenas
visible, el parpadeo cálido de los cirios, motas de polvo que flotan y la viñeta. Los dibujos son
de LÍNEAS LILA que se dibujan solas, con rellenos lila oscuro, y el DORADO para lo importante
(cirios, manijas y placa del cajón, marcos, sellos, tildes, cintas de las coronas). Lo blanco
crema es para las flores, las lágrimas, las llamas y el papel. En el GIRO (s08, "¡Eh!") se abre la
puerta: flash cálido, las cortinas se corren y el fondo pasa a un lila más claro (`#dia`, lo pone
index): la sala se "despierta" porque el muerto está vivo.

## Paleta (SOLO estos colores)
- Negro violáceo `#0e0a14` (fondo, lo pone index) y `#160f1f` para el traje y lo más oscuro.
- Lila oscuro `#2a1f38`: rellenos de personajes, cajón, coronas.
- Lila `#c9b2ef`: TODAS las líneas de los dibujos.
- Dorado `#e8b84f`: acento (cirios, manijas, placas, marcos, sellos, tildes, cintas, números
  grandes, acento de subtítulos). Glow permitido SOLO en llamas: `drop-shadow(0 0 12px rgba(232,184,79,0.8))`.
- Crema `#f4eee2`: flores, lágrimas, núcleo de las llamas, papel (certificado, libro), textos grandes.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, las palabras "bot" y "chatbot",
cruces u otros símbolos religiosos, calaveras realistas, sangre. Nada de la película "Coco": solo
se nombra (en el dibujo, papel picado genérico).

## Tipos de letra
Lexend 600-900 para lo grande; IBM Plex Mono 500 para etiquetas, horas, carteles. Nada que haya
que leer de menos de 26px (lo decorativo chico, `data-layout-ignore`).

## Zona
Cortinas en x 0-64 y 1016-1080 y galería arriba (y 0-70): NO poner nada ahí. Subtítulos y 236 a
~420. Dibujo entre y 580 y 1250, x 80-1000. Etiqueta mono dorada en top 1268. Logo en y ~1746.

## Personajes (iguales en todas las escenas: copiá el SVG de la escena que los estrena)
- EL DE LA FUNERARIA (s01): alto y flaco, cara larga, pelo engominado con raya al costado, ojeras,
  bigote finito, traje negro `#160f1f` con solapas, moño dorado, manos juntas. Atril con placa
  dorada.
- LA TÍA (s02): rodete alto, mantilla, ojos apretados (dos arcos), boca abierta de llanto,
  lágrimas crema que caen en chorro, collar de perlas crema, pañuelo crema en la mano.
- EL DUEÑO (s04): pelo corto, delantal con bolsillo, cejas en V, celular en la mano.
- EL VECINO DEL TERMO (s04/s05): gorra con visera, bigote grueso, ojos a media asta (sobrador),
  termo bajo el brazo (lila con tapa dorada) y el mate con bombilla dorada en la mano.
- EL CLIENTE (s08): muchacho con gorro de lana, buzo con capucha y cordones, sonrisa enorme,
  brazos abiertos.
- EL CAJÓN (s01): de costado, hexagonal alargado, relleno lila oscuro, manijas y placa dorada
  "Q.E.P.D. · UN CLIENTE", una flor crema arriba. Dos cirios dorados con llama a los costados.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo; en 36.0 ("¡Eh!") el main timeline prende `#dia`.
- `compositions/ambiente.html`: cortinas, galería, papel tapiz, parpadeo de cirios, polvo,
  viñeta; flash cálido y cortinas que se abren en 36.0; golpes de luz en 4.23 ("mataste") y 16.5
  ("jueves").

## Escenas (tiempos relativos a cada escena: ver tiempos.md)

### s01-reunidos (0.00 → 5.61) Funeraria: "Estamos reunidos para despedir a un cliente. Y lo mataste vos."
Cuadro 0: la sala a medio dibujar: el CAJÓN al centro (y ~960-1150), un cirio a cada lado con la
llama ya prendida, y atrás un atril con el retrato (marco dorado, silueta lila genérica con un
signo de pregunta). El de la funeraria a la derecha, de busto, con las manos juntas. "cliente"
(2.79): la placa dorada del cajón "Q.E.P.D. · UN CLIENTE" hace pop. "mataste" (4.23): una mano
gigante dibujada que entra desde la derecha y señala a cámara, con golpe y sacudón; las llamas se
agachan. Etiqueta: "Sala 2 · Velatorio" → "Lo mataste vos".

### s02-tia (5.61 → 9.78) Tía: "¡Tan joven! ¡Con tantas ganas de comprar!"
LA TÍA de busto, grande, llorando: lágrimas crema que caen en chorros (dashoffset en loop
determinista), hombros que se sacuden, pañuelo que se agita. "comprar" (2.59): un globo de
pensamiento con una bolsa de compras dorada y un corazón. Etiqueta: "La tía" → "Tan joven".

### s03-causa (9.78 → 17.89) Funeraria: "Causa de muerte: preguntó un precio un domingo. Le contestaron el jueves."
CERTIFICADO DE DEFUNCIÓN (papel crema, borde dorado, encabezado mono). "muerte" (0.54): la línea
"Causa de muerte:" se escribe. "preguntó un precio" (1.73): globo de chat del cliente "Hola, ¿qué
precio tiene?" con la hora "DOMINGO 10:14"; "domingo" (3.91) el "DOMINGO" se pinta dorado. Entre
medio, unas telarañas y puntos suspensivos: lunes, martes, miércoles pasan tachados.
"contestaron" (6.04): globo de respuesta "¡Hola! Disculpá la demora" con "JUEVES 19:30"; "jueves"
(6.72): sello dorado "MURIÓ ESPERANDO" que cae con golpe. Etiqueta: "Certificado" → "Causa: visto".

### s04-conteste (17.89 → 20.36) Dueño: "¡Pero le contesté!" / Vecino: "Tarde, campeón."
El DUEÑO a la izquierda, ofendido, levantando el celular (pantalla con "Enviado" y "JUE").
"Tarde" (1.23): entra el VECINO DEL TERMO por la derecha, ceba y le apoya la mano en el hombro
(o lo mira de costado). Etiqueta: "El dueño" → "Tarde, campeón".

### s05-coco (20.36 → 24.39) Vecino: "Como dicen en Coco: uno se muere de verdad cuando lo olvidan."
El VECINO de busto a la izquierda, chupando el mate. "Coco" (0.86): una guirnalda de papel picado
lila y dorado se despliega arriba (y ~600). A la derecha el retrato del cliente en su marco
dorado. "olvidan" (2.95): la silueta del retrato se desarma en motas y el marco queda vacío.
Etiqueta: "Como en Coco" → "El olvido".

### s06-coronas (24.39 → 31.62) Funeraria: "Las coronas. Con cariño, tus amigos del visto. Y otra: pasá el lunes."
Dos CORONAS de flores (anillos de flores crema y lila sobre trípode dorado). "coronas" (0.28) se
dibujan. "cariño" (1.67): en la primera, la cinta dorada "Con cariño, / tus amigos del visto" con
un doble tilde dorado. "pasá" (5.67): en la segunda, la cinta "Pasá el lunes". Etiqueta:
"Coronas" → "De: los del visto" → "De: pasá el lunes".

### s07-avisaste (31.62 → 36.00) Tía: "¡Y ni siquiera le avisaste que había llegado lo que buscaba!"
La TÍA a la izquierda, señalando indignada con el pañuelo. A la derecha un celular con un mensaje
a medio escribir "¡Llegó lo que buscabas!" y abajo "Borrador · sin enviar"; "llegado" (1.83) una
caja con moño aparece; "buscaba" (2.40) se llena de telarañas. Etiqueta: "Ni un aviso".

### s08-vivo (36.00 → 38.86) Cliente: "¡Eh! ¿Qué hacen? ¡Estoy vivo!"
GIRO: la doble puerta de la sala se abre de golpe (flash cálido: ambiente) con rayos de luz y
EL CLIENTE en el vano con los brazos abiertos. "Qué hacen" (0.82): signos de pregunta. "vivo"
(2.00): da un saltito, destellos dorados. Etiqueta: "El cliente" → "Vivito".

### s09-resucito (38.86 → 40.81) Tía: "¡Resucitó!"
La TÍA con los brazos arriba, ojos como platos, el pañuelo vuela; rayos dorados detrás. Etiqueta: "¡Milagro!".

### s10-enfrente (40.81 → 44.49) Cliente: "No resucité, señora. Me fui al de enfrente."
Dos locales, uno frente al otro: TU LOCAL (izquierda, persiana baja, telaraña, apagado) y
ENFRENTE (derecha, vidriera dorada y prendida). "No resucité" (0.19): el cliente chiquito niega
con el dedo; "enfrente" (2.43): camina (pasos punteados) hacia el de enfrente, que brilla.
Etiqueta: "No resucitó" → "Se fue enfrente".

### s11-minuto (44.49 → 49.01) Cliente: "Pregunté a las once de la noche y su agente de IA me contestó en un minuto."
Celular grande. "once" (0.53): reloj "23:00" con una luna. Globo del cliente "¿Qué precio tiene?".
"agente de IA" (2.02): el encabezado del chat "Agente de IA · en línea" con avatar.
"contestó" (2.77): globo de respuesta "¡Hola! Te paso el precio". "minuto" (3.42): "23:01" dorado
con un cronómetro. Etiqueta: "23:00" → "Agente de IA" → "23:01".

### s12-agendo (49.01 → 54.49) Cliente: "Me pasó el precio, me agendó, y al otro día me escribió por si me quedaba alguna duda."
Tres tarjetas que entran una abajo de la otra, con tilde dorado: "precio" (0.40) "Precio ·
enviado"; "agendó" (1.34) un calendario "Agendado · mañana 10:00"; "escribió" (3.02) "Al otro día:
¿te quedó alguna duda?". Etiqueta: "Precio" → "Agendado" → "Seguimiento".

### s13-mas-vivo (54.49 → 59.66) Vecino: "Y ta. Para vos se murió. Para el de enfrente, está más vivo que nunca."
Pantalla partida con una línea dorada. Izquierda "PARA VOS": el cajón con su placa. "murió" (1.34)
la tapa se cierra con golpe. Derecha "ENFRENTE" (2.50): el cliente bailando con bolsas de compras,
destellos; "vivo" (3.55) salta. Etiqueta: "Para vos" → "Para enfrente".

### s14-scalerics (59.66 → 68.06) Orus: "En Scalerics armamos tu agente de IA: contesta a cualquier hora y le escribe al que preguntó y no compró. Que no se te muera ninguno más."
La sala con luz. Celular con el agente ("Agente de IA" con avatar y "en línea"). "cualquier hora"
(3.04): un sol y una luna que giran alrededor del celular. "escribe" (4.28): globo "¿Seguís
interesado? Te lo guardo." con etiqueta "seguimiento". "muera" (6.95): abajo un electro (línea de
pulso) dorado que late. Etiqueta: "Scalerics" → "A cualquier hora" → "Seguimiento" → "Vivos".

### s15-cta (68.06 → 75.32) Orus: "Dejale una flor en los comentarios al cliente que dejaste en visto."
Una flor (cala) crema que se dibuja sobre una lápida chiquita y simpática "Q.E.P.D. · EL CLIENTE
QUE DEJASTE EN VISTO"? (no: texto corto), un globo de comentario con una flor adentro y un campo
"Agregá un comentario...". Grande "DEJALE UNA FLOR" Lexend 900 crema y abajo "al cliente que
dejaste en visto" con el doble tilde dorado. Termina quieto con la flor que se mece. Etiqueta:
"2 de noviembre".

## Base (molde/SPEC-base.md: lo técnico vale; lo visual lo reemplaza este SPEC)
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

