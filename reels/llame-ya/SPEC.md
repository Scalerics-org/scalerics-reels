# Reel "Llame ya": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: el AGENTE DE IA (atiende el WhatsApp al instante, a
cualquier hora, con precios, stock y horarios; toma pedidos y reservas; le escribe al que preguntó y
no compró), nombrado como "empleado de IA" por el presentador y "agente de IA" por el narrador.
Formato P: TELETIENDA / infomercial de madrugada de los 90.

ROLO, el presentador (voz Puck, exagerado y canchero, jopo y saco magenta con hombreras):
"¿Todavía contestás el WhatsApp con un dedo, a los tres días? ¡Eso se terminó!" La ASISTENTE (voz
Aoede, pelo amarillo enorme, vestido cian): "¡Así es, Rolo! Mirá: una clienta te escribe a las nueve
de la noche." Sección ANTES en BLANCO Y NEGRO con grano: la CLIENTA (Leda): "Hola, ¿me hacés una
torta de chocolate para el sábado?" El DUEÑO torpe (Charon): "Ahí te contesto... ¡no, la sopa!" (el
celular cae en la olla). Asistente: "¡Tres días después!" Dueño: "Ok." Rolo: "¡La clienta ya
festejó el cumpleaños! ¡Con la torta de otro!" PÚBLICO (cuatro voces): "¡Oooh!" (de lástima).
COLOR otra vez: Rolo: "¡Pero llega lo nuevo! Contesta al instante, de día, de noche y en feriado."
Asistente: "¡Sabe tus precios, tu stock y tus horarios! ¡Y toma pedidos y reservas!" TESTIMONIO de
DOÑA ELSA, LAS PIEDRAS (Gacrux, zócalo "clienta real"): "Me encargaron empanadas a las dos de la
mañana. ¡Y yo, durmiendo!" Rolo: "¡Pero espere, que hay más!" Asistente: "¡Le escribe al que
preguntó y no compró! ¡Llame ya!" Público: "¡Oooh!" (de admiración). GIRO: Asistente: "¿Y qué es,
Rolo? ¿Un cuchillo que corta latas?" Rolo: "No: es un empleado de IA. Atiende por vos a las tres de
la mañana. Y no se le cae en la sopa." (sincero) "Y vos no sos lento: estás haciendo la torta."
(rompe el personaje) "Esto no es teletienda. Pero quedaba lindo." NARRADOR (Orus): "En Scalerics
hacemos tu agente de IA: atiende tu WhatsApp como un empleado más, mientras vos hacés las tortas.
¿Lo comprarías? Te leemos en los comentarios."

189 palabras. Voz de 70.52 s, reel de 73.72 s. 19 parlamentos en `partes/` (`voces.sh`,
`cortar.sh` con `topear.mjs`, `componer.mjs`: atempo 1.2 al presentador y la asistente, el público
son cuatro voces encimadas con eco de estudio).

## RECURSO VISUAL CENTRAL: el SET DE TELETIENDA y el ANTES en blanco y negro
Todo pasa en un set chillón de los 90 (lo pone `estudio.html` detrás de las escenas: rayos magenta y
cian que giran desde el centro, chispas que titilan, piso en damero magenta). Encima (`ambiente.html`)
líneas de barrido de tele vieja, una franja de interferencia que baja, el bug "TELEVENTAS · EN VIVO"
arriba a la izquierda (y 120) y, desde "¡Llame ya!" (43.27) hasta que entra Scalerics (61.2), la
BANDA amarilla de abajo (y 1532-1648) con la cinta "¡LLAME YA! • OFERTA POR TIEMPO LIMITADO" que
corre. La sección ANTES (s03-s07, 7.43-24.81) es una dramatización en BLANCO Y NEGRO: cada escena
pinta su propio fondo gris opaco a pantalla completa (`.tv-antes-fondo`), todo adentro de `.tv-antes`
(grayscale) con GRANO que salta y el cartel "ANTES" arriba a la derecha. En s08 ("¡Pero llega lo
nuevo!") vuelve el COLOR de golpe con una estrella de explosión "¡NUEVO!".

## ESTILO: teletienda de los 90. Edición CARGADA
Ilustración PLANA con contorno tinta `#0d0630` de 6-7 px, rellenos de la paleta. Tipografía gruesa
(Lexend 900, mayúsculas) con contorno tinta y sombra dura abajo (`.tv-grueso`). Estrellas de
explosión amarillas con texto rotado (`svg data-tv="estrella"`), bandas de precio amarillas
(`.tv-banda`), zócalos de testimonio magenta y amarillo (`.tv-zocalo`), números y relojes que
parpadean. Entradas con golpe (scale 2.4 a 1 en 0.14 s) o pop con rebote, sacudones, estrellas que
giran y laten. Nada quieto más de ~1 s. Lo del narrador (s17-s18) más limpio.

## Paleta (SOLO estos colores)
- Magenta `#ff2e88`: saco de Rolo, zócalos, rayos, lo que "no".
- Amarillo `#ffd400`: estrellas, bandas, títulos gruesos, acento de subtítulos.
- Cian `#19d3ff`: vestido de la asistente, rayos, el agente de IA.
- Azul profundo `#1a1060`: fondo, pelo, pantallas.
- Blanco `#ffffff`: texto, dientes, globos.
- Tinta `#0d0630`: contornos y sombras duras. (Piel de los personajes `#ffd9b8`.)
En el ANTES todo eso pasa a grises con el filtro. Prohibido: emojis, fotos, rayas largas (—), logos
reales (WhatsApp solo como texto y un globito verde no: usá cian), caras de personas reales.

## Tipos de letra
- Lexend 800-900 (títulos gruesos, zócalos, bandas), Lexend 600 (UI de celulares, globos).
- IBM Plex Mono 600: carteles ("ANTES", relojes, rótulos).
- Subtítulos: Lexend 600 blanco con contorno tinta y acento amarillo (los arma `armar.mjs`).
Mínimo 26 px lo que hay que leer.

## Zona
Bug del canal en y 120-182. Subtítulos en y 236 a ~420. Contenido de cada escena entre y 520 y 1480
(el piso del set empieza en y 1490). La banda de LLAME YA ocupa y 1532-1648 entre 43.3 y 61.2 s. Logo
de Scalerics en y ~1746.

## `assets/tele.js` (cargarlo en cada escena después de GSAP)
- `TV.mesa(x, w)`: el mostrador del set (y 1280-1480). `K.origen(el, x, y)`: punto de giro en coordenadas locales del personaje (hombros: Rolo 372,420 y 68,420; asistente 366,430 y 74,430; dueño 360,440).
- Personajes (`TV.rolo()`, `TV.asis()`, `TV.duenio()`, `TV.elsa()`, `TV.clienta(gorro)`): un `<g>` de
  440 x 800 (de la cintura para arriba) para meter en `<g transform="translate(x y) scale(s)">`.
  Partes animables: `.tv-boca` (con `K.habla(boca, a, b)`), `.tv-brazo-d`, `.tv-brazo-i`,
  `.tv-ojos`, `.tv-brillo` (diente de Rolo), `.tv-cel` (celular del dueño).
- `TV.llenar(root)`: dibuja las `<svg data-tv="estrella" width height data-puntas data-color>` y los
  `<div data-tv="grano">`.
- Clases: `.tv-grueso` (`.tv-blanco`, `.tv-mag`, `.tv-cia`), `.tv-zocalo` (`.tv-z1`, `.tv-z2`),
  `.tv-banda`, `.tv-cartel`, `.tv-antes`, `.tv-antes-fondo`.
- `TV.kit(tl, root)` devuelve `{ q, qa, pop, golpe, sacudon, dibujar, habla, origen, late, gira, parpadea,
  granular, salida }`.

## Lo que ya está hecho (no tocar)
`index.html` y `subtitulos.html` (los genera `armar.mjs`), `estudio.html`, `ambiente.html`,
`assets/momentos.js` (DUR y momentos clave, también de `armar.mjs`).

## Escenas (tiempos relativos a cada escena; ver `tiempos.md`)

### s01-dedo (5.59 s): el dedo
Un celular grande (azul profundo, contorno tinta) con un chat; un DEDO gigante (piel, uña) que baja
lento y aprieta una letra por vez (ya a medio entrar en el cuadro 0). "dedo" 2.08: rótulo "1 DEDO"
con flecha. "tres días" 3.06-3.17: un reloj/calendario arranca las hojas "LUN · MAR · MIÉ". "¡Eso se
terminó!" 3.87-4.25: sello magenta gigante "¡SE TERMINÓ!" en estrella amarilla que golpea encima,
sacudón y el celular sale volando.

### s02-set (1.84 s): el set
Rolo (izquierda) y la asistente (derecha) en el set, de la cintura para arriba. "¡Así es" 0.0: ella
aplaude (brazo arriba); "Rolo" 0.58: el diente de Rolo brilla, él guiña. "Mirá" 1.35: la asistente
señala a la derecha y la imagen empieza a ponerse gris (pasa al ANTES).

### s03-antes (2.93 s): el ANTES
Blanco y negro con grano. Golpe del cartel "ANTES" (0.0). Una ventana con la luna y un reloj de pared
que marca las 21:00 ("nueve" 1.49). En el centro un celular que vibra con la notificación "Clienta:
1 mensaje nuevo" ("escribe" 0.74). "noche" 2.24: estrellitas en la ventana.

### s04-torta (3.12 s): el pedido
B/N. El celular grande con el globo de la clienta (audio + texto) "Hola, ¿me hacés una torta de
chocolate para el sábado?" que se escribe ("torta" 0.98); a la derecha una torta dibujada con velitas
que aparece en "torta" y se le derrite el chocolate en "chocolate" 1.43; chip "SÁBADO" en 2.14.

### s05-sopa (3.01 s): ¡la sopa!
B/N. El dueño (TV.duenio) con delantal frente a una olla humeante, celular en la mano. "Ahí te
contesto" 0.0-0.38: levanta el celular despacio. "¡no" 1.22: el celular se le resbala, gira y cae
en la olla en "sopa" 1.81: SPLASH (gotas), onomatopeya "¡PLOP!" en estrella, sacudón.

### s06-tres-dias (2.39 s): tres días después
B/N. Placa de cine mudo (marco con filetes) "TRES DÍAS DESPUÉS" en golpe (0.0). "Ok" 1.66: el
celular empapado (gotas) con la respuesta "ok" y la hora "VIE 21:03" con dos tildes; sello "OK."

### s07-cumple (5.93 s): el cumpleaños
B/N. La clienta con gorrito de cumpleaños (TV.clienta(true)) con una torta ajena con velas; banderines.
"festejó el cumpleaños" 0.58-1.25: confeti. "torta de otro" 2.50-3.00: cartelito clavado en la torta
"DE OTRO" y flecha. "¡Oooh!" 4.04: onomatopeya gigante "¡OOOH!" blanca y siluetas del público abajo
que se balancean.

### s08-nuevo (4.93 s): ¡llega lo nuevo!
COLOR de golpe. Estrella de explosión "¡NUEVO!" girando arriba; Rolo en el centro con el micrófono.
"Contesta al instante" 1.54-2.00: un rayo amarillo. "de día" 2.67 (sol), "de noche" 3.34 (luna),
"feriado" 4.00 (hoja de calendario "FERIADO") que entran en fila abajo como chips.

### s09-sabe (4.64 s): sabe todo
La asistente (izquierda) presenta con el brazo; a la derecha tres BANDAS de precio que entran de a una:
"PRECIOS" (0.59), "STOCK" (1.17), "HORARIOS" (1.92). "pedidos y reservas" 3.00-3.50: un ticket de
pedido con tildes y una etiqueta "RESERVADO".

### s10-elsa (5.01 s): el testimonio
Doña Elsa (TV.elsa) con una fuente de empanadas; zócalo "DOÑA ELSA · LAS PIEDRAS" con segunda línea
"CLIENTA REAL (MÁS O MENOS)". "empanadas" 0.78: empanadas que saltan; "dos de la mañana" 1.91-2.34:
reloj "02:00" y luna; "durmiendo" 3.93: ojos cerrados y "Z Z Z".

### s11-hay-mas (1.97 s): ¡pero espere!
Tipografía gigante en tres líneas que golpean: "¡PERO" (0.0) "ESPERE," (0.17) y "¡HAY MÁS!" (0.80)
en estrella magenta, rayos que giran rápido, sacudón.

### s12-llame (5.27 s): ¡llame ya!
Un celular con el chat que el agente le escribe a una clienta que no compró: "¿Te reservo la torta
para el sábado?" (0.75). "¡Llame ya!" 1.91: aparece un TELÉFONO de los 90 gigante que suena (vibra) y
el cartel "¡LLAME YA!" parpadeante; un reloj "OFERTA POR TIEMPO LIMITADO 00:59" que cuenta. "¡Oooh!"
3.04: onomatopeya "¡OOOH!" y chispas.

### s13-cuchillo (2.79 s): ¿un cuchillo?
La asistente con cara de ilusión; "cuchillo que corta latas" 1.17-1.75: un cuchillo de teletienda
que corta una lata en dos con chispas; signo de pregunta gigante.

### s14-empleado (6.00 s): el giro
"No" 0.0: tachón magenta sobre el cuchillo. "empleado de IA" 0.83-1.42: Rolo saca la tela de la caja
misteriosa: adentro un celular con un agente de IA dibujado (cara de pantalla amable, cian) con
gafete "EMPLEADO DE IA". "tres de la mañana" 3.17: reloj 03:00, luna, el agente contesta. "no se le
cae en la sopa" 4.34-5.00: la olla con una X magenta.

### s15-lento (2.63 s): no sos lento
Más tierno: el dueño en COLOR haciendo la torta (manga pastelera, torta), corazones; rótulo "NO SOS
LENTO" (0.45) y "ESTÁS HACIENDO LA TORTA" (1.34).

### s16-lindo (3.15 s): no es teletienda
Rolo de frente, guiña. "teletienda" 0.71: el cartel "TELETIENDA" de neón se descuelga de un lado y
queda colgando; "quedaba lindo" 1.78-2.14: Rolo levanta el pulgar, brilla el diente.

### s17-agente (6.70 s): el agente de IA (narrador)
Limpio: un celular grande con el chat del local: la clienta "¿me hacés una torta para el sábado?" y
el agente contesta al instante con precio y "¡Te la reservo!". Encima "TU AGENTE DE IA" (1.70).
"como un empleado más" 4.16: gafete. "mientras vos hacés las tortas" 5.10-6.36: abajo el dueño
tranquilo con la torta.

### s18-cta (5.82 s): ¿lo comprarías?
Estrella amarilla con "¿LO COMPRARÍAS?" (0.34) y dos botones de teletienda "SÍ" / "OBVIO" que laten;
globo de comentario "TE LEEMOS EN LOS COMENTARIOS" (1.27). Queda ~3 s con el logo.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es teletienda con la paleta de arriba. Sí
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

