# Reel "Talle único": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el SISTEMA A MEDIDA
(programa de gestión hecho para cómo trabaja ese negocio: stock, pedidos, proveedores, caja,
varios locales) contra el sistema enlatado "talle único".
Formato P: ALFOMBRA ROJA / DESFILE DE MODA de la tele (inventado: revista y programa "LAMÉ ·
Alfombra roja del comercio"; nada real). BÁRBARA LAMÉ, la crítica de moda despiadada (bob negro,
lentes de gata, labios fucsia, vestido negro con dorado, libreta y lapicera) abre mirando a cámara:
"Mirá lo que tiene puesto tu negocio. Querido... eso es un desastre." El presentador TITO
LENTEJUELA (smoking, moño fucsia, jopo dorado, micrófono) la presenta como "la crítica que hizo
llorar al diablo que viste a la moda" (solo nombrado; un diablito genérico llorando). Desfilan:
DON HUGO, ferretero, con un buzo gris "talle único" que le queda CHICO (panza afuera): "¿y los
cuarenta mil tornillos sueltos dónde los mete? ¿En el bolsillo?"; él: "¡Pero era el que venía!";
ella: "Next." (gancho de vodevil que se lo lleva). LA PANADERÍA con "el sistema completo, con
todos los módulos": un tapado ENORME lleno de etiquetas (importación, flota de camiones, sucursal
en Japón): "¿Módulo de importación? Mi amor, vendés bizcochos." LA TIENDA DE LAURA con dos locales:
"un zapato de cada par": dos sistemas que no se hablan. Laura: "Bueno, pero me acostumbré. Ahora
vendo como el sistema me deja" (el molde del sistema la aplasta). Bárbara: "¿Y vos te cortás el pie
para que te entre el zapato?". GIRO: se saca los lentes, en serio: "El talle único no le queda
bien a nadie. Los que se ven impecables... se lo hicieron a medida." (maniquíes de sastre con
sacos a medida y la cinta métrica). Entra Orus: "En Scalerics hacemos tu sistema a medida: stock,
pedidos, proveedores, caja y todos tus locales, cortado para cómo trabaja tu negocio." Bárbara:
"Ahora sí. Divino." Orus: "Mandáselo al que dice que su sistema le queda pintado."
Voces (partes/voces.sh, partes/recortar.sh, partes/componer.mjs): Bárbara Kore, Tito Puck,
Don Hugo Charon, Laura Leda, narrador Orus. Voz de 69.5 s, reel de 72.67 s. 183 palabras.

## Recurso visual central
LA PASARELA EN PERSPECTIVA (ambiente): pasarela oscura que fuga al centro con bordes dorados y
luces que titilan, público en siluetas a los costados con cámaras y FLASHES deterministas,
cabecera de revista "LAMÉ" (serif, É fucsia) con "EN VIVO · ALFOMBRA ROJA DEL COMERCIO", y el
ZÓCALO de quién habla (nombre en serif itálica, rol en mono dorado). Los personajes DESFILAN desde
el fondo de la pasarela. Recursos de moda: etiquetas de talle colgando ("TALLE ÚNICO", "SISTEMA
A/B", "IMPORTACIÓN"), sellos tipo tapa de revista ("CHICO", "ENORME", "IMPECABLE"), tapa de
revista, maniquíes de sastre, cinta métrica, tijeras, el cartel "TALLE ÚNICO" tachado en fucsia.
Edición CARGADA: palabras gigantes en serif que caen en su palabra, sacudones, flashes.

## Paleta (SOLO estos colores)
- Negro `#0e0c10`: fondo, contornos (6 px), vestido de Bárbara, carteles.
- Blanco hueso `#f6f1ea`: piel, textos, papeles.
- Fucsia `#ff2e88`: Bárbara (labios, lapicera), la alfombra, los veredictos, Laura.
- Dorado `#d8b25c`: etiquetas de talle, bordes de revista, Tito, la cinta métrica.
- Gris `#8d8892` (y `#c9c4cc`, `#2a2530`): lo enlatado: el buzo de Don Hugo, el tapado, la bota.
- Verde Scalerics `#5ce611`: SOLO desde s14 (entra Scalerics).
Acento de subtítulos por quién habla (`reel.voces` en `armar.mjs`): Bárbara fucsia, Tito dorado,
dueños gris claro subrayado, Scalerics verde.

## Tipos de letra
Cormorant Garamond 600 (mayúsculas de revista) e itálica 500 (veredictos: "desastre.", "Next.",
"Divino."); IBM Plex Mono 600 para etiquetas y zócalo; Lexend para globos y subtítulos.

## Zona
Cabecera de revista arriba (y 56-186, ambiente). Subtítulos en y 236 a ~420. Contenido de escena
entre y 450 y 1540. Zócalo en y 1572-1700 (ambiente). Logo de Scalerics en y 1746.
El ambiente va DETRÁS de las escenas (pista 1, ver armar.mjs); al entrar Scalerics (55.89) se
apagan la cabecera, el público y los flashes.

## Lo que ya está hecho
- `armar.mjs` (fondo negro con cañón fucsia y brillo dorado, colores de subtítulos por voz, ambiente
  detrás de las escenas).
- `compositions/ambiente.html` (a mano): pasarela, luces, público, flashes, cabecera, zócalo por
  parlamento, flash grande en "desastre", "Next", "medida" y "Divino".
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: critica, presentador,
  hugo, panadera, laura, maniqui, tag, flash). `cd partes/escenas && python3 sNN.py` escribe la
  escena y su `.sfx.json`; después `node armar.mjs`.

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


> En este reel manda el encabezado de arriba sobre SPEC-base: personajes de relleno plano con
> contorno negro, paleta propia, serif de revista. Siguen valiendo las reglas técnicas.

## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-gancho (0 a 5.57) · "Mirá lo que tiene puesto tu negocio"
Cuadro 0: la fachada "TU NEGOCIO" (el cartel asoma como cabeza) con un BUZO GRIS que le queda chico
(mangas cortas, líneas de tensión) y la etiqueta dorada "TALLE ÚNICO · one size" colgando y
balanceándose. "puesto" 1.02: el buzo aprieta y salta un botón. "negocio" 1.70: el cartel titila.
"Querido" 2.85: el local se corre a la izquierda y entra Bárbara por la derecha; "eso" 3.62 baja
los lentes y apunta con la lapicera. "desastre" 4.32: "desastre." gigante en itálica fucsia,
sacudón, flash.

### s02-alfombra (0 a 2.73) · bienvenidos
Tito con los brazos arriba hablando. "alfombra" 0.91: la alfombra fucsia se desenrolla por la
pasarela. "roja" 1.25: "ALFOMBRA ROJA" serif cae; "comercio" 1.75: "del comercio" dorado. Destellos.

### s03-barbara (0 a 5.17) · la crítica
Tapa de revista LAMÉ con Bárbara adentro (entra girando). "Bárbara" 0.92 levanta la lapicera;
"Lamé" 1.35 su nombre en la tapa; "crítica" 2.10 "LA CRÍTICA MÁS TEMIDA". "llorar" 2.77: la tapa se
corre y entra un diablito genérico de vestido negro LLORANDO (lágrimas que caen); "diablo" 3.43
rótulo "el diablo".

### s04-ferreteria (0 a 4.36) · abre el desfile
Tito presenta desde la izquierda ("abre el desfile" 0.26). "ferretería" 1.01: cartel "FERRETERÍA ·
Don Hugo"; Don Hugo desfila desde el fondo de la pasarela hasta el frente. "talle único" 3.19:
etiqueta gigante "TALLE ÚNICO · el que venía" que cae, sacudón.

### s05-chico (0 a 6.23) · le queda chico
Don Hugo de frente, la panza late. "chico" 0.34: sello fucsia "CHICO". "cuarenta" 1.61: "40.000
tornillos sueltos" dorado; "tornillos" 2.20 llueven tornillos y rebotan en el piso. "dónde" 2.79
abre los brazos. "bolsillo" 4.49: los tornillos se meten todos en un bolsillito que se infla;
"¿en el bolsillo?" en itálica.

### s06-next (0 a 2.65) · "¡Pero era el que venía!" / "Next."
Don Hugo indignado, brazos arriba, con la caja "SISTEMA · 1 TALLE" (pop en "venía" 0.46). "Next"
1.67: "Next." gigante fucsia, flash, y un gancho dorado de vodevil se lo lleva fuera de cuadro.

### s07-panaderia (0 a 3.52) · el sistema completo
Tito presenta; cartel "PANADERÍA · sistema completo" ("completo" 1.17 se pone fucsia). La panadera
desfila arrastrando un TAPADO GRIS ENORME. "todos los módulos" 1.7-2.5: etiquetas que se le pegan
(IMPORTACIÓN, FLOTA DE CAMIONES, MULTIMONEDA, AEROPUERTO, BOLSA DE VALORES, SUCURSAL EN JAPÓN).

### s08-enorme (0 a 5.55) · le queda enorme
"enorme" 0.43: el tapado crece y la cabeza se hunde; sello "ENORME". "Módulo" 1.40: etiqueta
"IMPORTACIÓN · módulo pagado"; "importación" 1.87 entra un barquito con contenedores. "vendés"
3.73: bandeja con bizcochos (medialunas) que caen; "bizcochos" 4.40: "vendés bizcochos." dorado.

### s09-dos-locales (0 a 2.25) · la tienda con dos locales
Cartel "LA TIENDA · de Laura". "tienda" 0.25 aparece LOCAL 1 (toldo fucsia); "dos" 0.92 LOCAL 2
(toldo dorado); "locales" 1.25: "dos locales" itálica fucsia.

### s10-zapatos (0 a 3.73) · un zapato de cada par
Primer plano de los pies: stiletto fucsia y bota de lluvia gris, cada uno se mueve en su palabra;
"par" 1.10 se dibuja una línea de corte entre los dos. "Dos sistemas" 1.80: etiquetas "SISTEMA A ·
local 1" y "SISTEMA B · local 2" y globos "¿Stock?" / "¿Ventas?". "hablan" 2.71: X fucsia en el
medio y los globos se dan vuelta.

### s11-acostumbre (0 a 3.67) · "me acostumbré"
Laura se encoge de hombros. "Ahora" 1.66: cae el MOLDE DEL SISTEMA (rectángulo punteado) y la
aplasta (scaleX/scaleY), cabeza torcida en "sistema" 2.41; "deja" 2.95 etiqueta gris "ASÍ NOMÁS ·
talle único".

### s12-pie (0 a 3.69) · "¿Y vos te cortás el pie...?"
Bárbara indignada a la derecha; a la izquierda un pie gigante y un zapatito fucsia. "cortás" 0.51:
"¿te cortás el pie?" en itálica. "pie" 1.02: entran unas tijeras doradas que cortan en el aire
(gotas de sudor del pie). "zapato" 2.46: X fucsia encima, sacudón.

### s13-giro (0 a 6.77) · el giro
"Escuchame" 0: Bárbara se saca los lentes, seria. "talle" 1.06: cartel "TALLE ÚNICO · ONE SIZE FITS
ALL"; "nadie" 2.41: tachado fucsia que se dibuja, el cartel se tuerce. "Los que" 3.41: tres
maniquíes de sastre con sacos a medida (blanco, fucsia, dorado); "impecables" 4.02 destellos.
"se lo hicieron" 5.06: la cinta métrica dorada se dibuja entre ellos; "medida" 5.55: "a medida."

### s14-scalerics (0 a 6.33) · entra Scalerics (verde)
Se apaga el desfile. "TU NEGOCIO" de nuevo, ahora con un SACO A MEDIDA negro con solapas y pespunte
verde que baja en "hacemos" 0.69. "sistema" 1.20 "HECHO"; "medida" 1.77 "a medida" en verde y la
cinta métrica verde. Etiquetas verdes con tilde en su palabra: STOCK 2.31, PEDIDOS 2.99,
PROVEEDORES 3.67, CAJA 4.54, TUS LOCALES ~5.4.

### s15-divino (0 a 4.64) · "Ahora sí. Divino."
Tijeras doradas recorren una línea de corte verde ("cortado" 0). El local con su saco posa; entra
Bárbara (1.1), baja los lentes y aplaude en "sí" 2.56. "Divino" 3.17: "Divino." gigante fucsia,
destellos, sello dorado "IMPECABLE".

### s16-cta (0 a 5.81) · "Mandáselo al que dice que su sistema le queda pintado."
Tapa de revista "LAMÉ · EDICIÓN COMPARTIR": "MANDÁSELO" serif, "al que dice que / su sistema"
dorado y "le queda pintado." fucsia ("pintado" 1.90). Un avioncito de papel verde (compartir) vuela
con su estela; Don Hugo, con su buzo talle único, entra en "queda" 1.73 saludando muy convencido.
Queda quieto-vivo ~3 s.
