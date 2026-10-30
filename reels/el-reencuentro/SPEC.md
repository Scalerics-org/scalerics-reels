# El reencuentro · CRM · programa de reencuentros de la tarde

**De qué trata.** Un programa de reencuentros de la tarde, de esos lacrimógenos ("Volver a Verte",
inventado). La conductora (Aoede, melosa y emocionada) abre con el gancho: "Don Aldo la busca desde
marzo. Ella le pidió un presupuesto. Él nunca la llamó." Don Aldo (Charon), dueño de una mueblería
de barrio, cuenta: entró una señora, quería un sillón verde, le pidió presupuesto y él le dijo "el
lunes la llamo, sin falta". Lo anotó en un post-it, y el post-it quedó abajo de la caja; no sabe ni
cómo se llama: es "la señora del sillón verde". Música triste, un pañuelo, el público llora. "¡Que se
abra la cortina!": aparece Graciela (Gacrux). Don Aldo, eufórico: "¡Tengo su presupuesto acá!". Ella,
con cariño: ya lo compró, al otro día, en la otra cuadra; la llamaron ellos, y se acordaban de que
era verde. "¡Oooh!" del público (Leda, Fenrir, Kore y Puck encimados). GIRO (la conductora): Don
Aldo no es un desastre, tiene treinta clientes en la cabeza y no hay cabeza que dé para tanto. Entra
Orus: un CRM con la ficha de cada cliente, qué te pidió y qué le prometiste, y el lunes te avisa
"Llamá a Graciela". Sin programa de tele. Cierre: "Etiquetá al que te debe un presupuesto desde marzo."

**Formato:** D (historia de una clienta con nombre) vestida de programa de reencuentros de la tele.
**Recurso visual central:** el set del programa: placa "Volver a Verte" con bombitas que titilan,
focos rosados y dorados que barren, telón de terciopelo rosa hondo con bambalina de flecos dorados,
sillones, flores, zócalo en cursiva con el nombre de quien habla, corazones que suben, pañuelos,
el público de espaldas. Personajes dibujados planos (relleno de la paleta, contorno ciruela 5 px).

## Paleta (manda sobre SPEC-base: este reel es CLARO)
- Crema rosada `#f7e6e1` (fondo del set) / `#fbefe9` (caras, papeles, celulares).
- Rosa empolvado `#e3a6ae` (sillones, zócalo, corazones) y su tono hondo `#c4607a` (telón, sellos,
  acento de los subtítulos).
- Lila `#a48cc8` (paneles del costado, cárdigan de Aldo, pelo de Graciela, lágrimas).
- Dorado `#c99a3c` (placa, bombitas, flecos, micrófono, onomatopeyas grandes, rayos de luz).
- Ciruela `#4b2537` (todos los contornos, texto de los subtítulos y de la placa; el logo va teñido
  de ciruela con `filter` en `armar.mjs`).
- Verde sillón `#6f9a6a`: SOLO el sillón verde y, al final, el CRM (cabecera, aviso "Llamá a
  Graciela"). El verde une la promesa perdida con la solución.
- Post-it `#ecc97a` (dorado claro).

## Tipografía
- Subtítulos: Lexend 600 ciruela con halo crema; acento rosa hondo.
- Placa, zócalo, carteles del set: Cormorant Garamond Italic 500 (`CormorantGaramond-Italic-500.woff2`).
- Manuscrito (post-it, la promesa, la ficha "la señora del sillón verde"): Caveat 700.
- Rótulos chicos (RECUERDO · MARZO, CLIENTA, NOMBRE:): IBM Plex Mono 500, espaciado.
- Onomatopeyas y golpes (¡HOY!, ¡OOOH!, ¡SNIF!, RIIING, @ETIQUETÁ): Lexend 900 dorado o rosa con
  contorno ciruela (`-webkit-text-stroke` + `paint-order: stroke fill`).

## Ambiente (`compositions/ambiente.html` + `ambiente.sfx.json`)
Placa "Volver a Verte / REENCUENTROS" arriba (y 50-210) con bombitas que titilan alternadas; tres
focos que barren; zócalo en cursiva (y 1392-1532) que cambia de persona: "Don Aldo · busca a su
clienta desde marzo" (0.9 s), "Don Aldo · mueblería de barrio · la prometió para el lunes" (9.7 s),
"Graciela · la señora del sillón verde" (35.0 s, cuando dice su nombre), "Don Aldo · treinta clientes
en la cabeza" (50.8 s); se va cuando entra Scalerics (57.7 s). Corazones que suben a los costados
en la música (25.2), la cortina (31.9), "¡Graciela!" (36.2) y el cierre (70.2). Flash blanco en
"cortina" (31.88) y rosa en "¡Oooh!" (48.29). Sonidos: drama en "nunca la llamó", aplausos en la
cortina, en "¡Graciela!" y al final, "uuh" del público en "¡Oooh!".

## Música (`partes/musica.mjs` → `assets/bgm/musica.mp3`)
Sintetizada: colchón de cuerdas tenso hasta "Música, por favor" (25.0 s), piano triste arpegiado
(Am F C G) hasta el "¡Oooh!" (48.2 s, corte seco), y desde Orus (57.95 s) mayor y más liviano.

## Voces (`partes/`)
`voces.sh` (Gemini: conductora Aoede, Don Aldo Charon, Graciela Gacrux, público Leda+Fenrir+Kore+Puck,
Orus), `recortar.sh` (puntas y pausas topeadas con `topear.mjs`; el público encimado),
`componer.mjs` (atempo por voz, silencios entre parlamentos, `palabras.json`). Las escenas se
generan con `partes/escenas/sNN.py` (snippets de personajes en `personajes.py`, plantilla en `base.py`).

## El lenguaje visual (de la referencia; en este reel mandan la paleta y la tipografía de arriba)
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


## Escenas (tiempos en segundos relativos; ver tiempos.md)

**s01-busca (6.02).** Don Aldo sentado en un sillón rosa, sosteniendo un cartel "¿La vieron?" con el
dibujo del sillón verde; la cámara se acerca. "marzo" (1.48): almanaque MARZO 3 a la izquierda.
"pidió" (2.71): hoja "Presupuesto · sillón verde" desde la derecha, late en "presupuesto". "nunca"
(4.51): se arrancan las hojas del almanaque (MAYO, JUNIO… queda JULIO 12). "llamó" (5.04): zoom
dramático a la cara, cejas tristes, cae una lágrima lila.

**s02-programa (3.68).** Plano del set: bambalina y telón a los costados, conductora con micrófono a
la izquierda, Don Aldo chiquito en su sillón a la derecha, flores al medio. "Volver" (0.82): se
prende el cartel APLAUSOS y titila. "Don Aldo" (1.39): la cámara va hacia él. "contenos" (2.29): el
micrófono lo apunta.

**s03-recuerdo (6.71).** Flashback en un óvalo dorado ("RECUERDO · MARZO"): la mueblería, Don Aldo
detrás del mostrador. "Entró" (0): campanita de la puerta. "señora" (0.43): entra la señora de
espaldas (él nunca le vio bien la cara: silueta lila con rulos). "Quería" (1.27): señala; "verde"
(1.98): el sillón verde late. "pidió" (2.76): hoja "$ ?". "dije" (3.71): Aldo asiente orgulloso.
"El lunes la llamo, sin falta" en Caveat gigante, palabra por palabra.

**s04-postit (4.88).** "¿Y la llamó?" (0-0.17): primer plano de Aldo acorralado por el micrófono, un
"?" dorado gigante, una gota de sudor. "anoté" (1.22): cambia el plano a la caja registradora sobre
el mostrador; "post-it" (1.57): aparece el post-it "Lunes: llamar a la señora del sillón verde".
"post-it quedó" (2.69-3.03): se despega y revolotea. "abajo de la caja" (3.29-3.89): cae, la caja
le cae encima, temblor, asoma una puntita; zoom.

**s05-senora (3.86).** Ficha "CLIENTA · NOMBRE:" con un "?" rosa que tiembla en "llama" (0.82).
"es la señora del sillón verde" (1.78-2.72): se escribe a mano en la raya; ícono del sillón verde.
Abajo, Aldo llora a chorros (dos chorros lila).

**s06-musica (3.42).** Aldo en su sillón; notas musicales que suben; el público de espaldas se mece.
"pañuelo" (1.56): un pañuelo de encaje vuela girando hasta él; el público levanta pañuelitos.
"Aldo" (2.82): "¡SNIF!" y temblor.

**s07-cortina (4.60).** Telón cerrado con bambalina; la conductora delante, a la izquierda. "hoy"
(0.19): "¡HOY!" dorado gigante. "encontramos" (0.93): chispas doradas. "¡Que" (2.27): la conductora
salta. "cortina" (3.31): se abre el telón, rayos dorados que giran y la silueta lila de Graciela.

**s08-graciela (5.83).** Graciela bajo la luz, telón abierto a los costados, saluda tímida. "Graciela"
(1.84): corazones. "¡Graciela!" (3.02): ella se corre a la izquierda y entra Don Aldo eufórico,
saltando, con sonrisa. "¡Tengo su presupuesto" (4.23): saca la hoja con el post-it pegado y la
sacude.

**s09-otra-cuadra (9.29).** "Ay, Aldo" (0): Graciela, con lástima, inclina la cabeza. "sillón" (1.49):
cuadro dorado con Graciela en su sillón verde en su casa; "compré" (2.10): sello COMPRADO. "Al otro
día" (2.63-3.68): almanaque MARZO 4 (ella fue el 3). Dos locales: ALDO (vidriera apagada) y LA OTRA
CUADRA (vidriera prendida); "otra cuadra" (4.69): flecha de uno al otro. "llamaron" (5.88): el
teléfono de disco de la otra suena, RIIING. "se acordaban" (6.7): globo con el mensaje de la otra
mueblería: "Hola, Graciela. ¿Seguís buscando el sillón verde?"; "verde" (8.24): tilde verde.

**s10-oooh (2.48).** El público de frente, bocas en O; "¡OOOH!" gigante dorado que tiembla; un corazón
rosa hondo se parte en dos y cae.

**s11-cabeza (7.25).** Primer plano de Don Aldo; la mano de la conductora le palmea el hombro
("Tranquilo", 0). "treinta clientes en la cabeza" (3.03-4.02): treinta etiquetitas en Caveat brotan
alrededor de su cabeza ("la del sillón", "Rubén: 6 sillas", "¿el del lunes?", "presupuesto ???",
"un tal Raúl"...). "no hay cabeza" (4.93-5.25): se sacuden, sale humo, ojos chiquitos; "tanto" (6.15):
todo sale volando.

**s12-crm (9.49).** Entra Scalerics: un celular con el CRM (cabecera verde "CLIENTES"). "ficha" (2.50):
avatar de Graciela, "Graciela · DESDE MARZO". Filas: "PIDIÓ PRESUPUESTO · Un sillón verde" (3.88),
"LE PROMETISTE · Llamarla el lunes" (4.74), "PRÓXIMO PASO · Lunes 9:00" (5.86). "avisa" (6.21): cae el
aviso verde "LUNES 9:00 · AVISO / Llamá a Graciela" con campana que suena en "Llamá". "Sin programa
de tele" (8.08-8.71): una tele con "Volver a Verte" se tacha y se apaga.

**s13-cta (6.29).** "@ETIQUETÁ" gigante dorado que late, "al que te debe un presupuesto" en cursiva,
la hoja "Presupuesto · pendiente", almanaque MARZO "?" en "desde" (2.09) y sello DESDE MARZO en
"marzo" (2.37). Don Aldo, ahora sonriente, saluda desde la izquierda. Corazones del ambiente. Sin
salida con blur: queda quieta hasta el final.
