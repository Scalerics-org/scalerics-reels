# como-se-hace · "Hoy, en Cómo se hace: una fábrica de pedidos que trabaja día y noche. ¡Y tiene un solo operario!"

**Producto:** automatizaciones (una sola cosa vendida). **Formato P:** documental de fábrica tipo
"Cómo se hace" (la referencia solo nombrada: ni logo ni música de la obra). Un documentalista
entusiasta (Puck) recorre una "planta de pedidos" estación por estación, maravillado como si fueran
máquinas suizas; el único operario (Gustavo, Charon) contesta agotado. **Giro:** a las once de la
noche la planta se apaga, Gustavo dice "la fábrica soy yo" y el decorado de fábrica se cae: es una
rotisería y un tipo con el celular. "En las fábricas de verdad, esto lo hacen las máquinas." Entra
Orus (narrador Scalerics): automatizamos lo que hacés a mano. Cierre: "Mandáselo al que es la
fábrica entera."

**Voces:** documentalista Puck (amarillo en subtítulos) · clienta Leda (rosa `#ff9eb0`) ·
Gustavo Charon (azul `#7fb2ff`) · Orus Scalerics (verde `#5ce611`). Armado: `partes/voces.sh`,
`partes/tiempos.sh`, `partes/componer.mjs` (atempo 1.2 doc, 1.15 Gustavo, 1.1 clienta, 1.15 Orus;
`partes/fix.json` corrige 8 tiempos). Música: `partes/musica.mjs` → `assets/bgm/bed.mp3`:
marimba saltarina + fagot "oom-pa" + bloque de madera, 112 BPM; en "Las once de la noche" se frena
como una máquina que se apaga, silencio en el giro, y vuelve cálida (pad + marimba) con Scalerics.

**Recurso visual central:** la planta industrial y sus CARTELES DE ESTACIÓN amarillos que bajan
colgados de cadenas y se balancean ("ESTACIÓN 2 · COPIAR Y PEGAR"), la cinta transportadora que
corre con cajas PEDIDO, engranajes que giran y Gustavo (overol azul, casco amarillo, bigote,
ojeras) con el celular. Todas las piezas están en `assets/fabrica.js` (FAB.operario, cinta,
engranaje, brazo, caja, baliza, planilla, celular, globo, reloj, microfono, kit con pop, bajar,
sello, correr, girar, salida).

## Lo que cambia de SPEC-base (manda sobre lo de abajo)
- **Paleta (solo estos):** negro carbón `#121417` (contornos, trazo 7-8), gris acero `#2b3036`
  / `#4a525c` / `#8a939c`, hueso `#f2f1ea`, amarillo seguridad `#f5c518` (carteles, casco, acento
  del documental), azul overol `#2f5d9e` / `#7fb2ff`, rojo alarma `#e5484d` (solo sellos y la
  hora), cartón `#c8a06a`, piel `#e2b48c`. El verde `#5ce611` aparece SOLO desde Scalerics (52.05).
- Dibujo con relleno plano y contorno negro grueso (no líneas crema), estilo infografía de fábrica.
- Fondo (`armar.mjs`): chapa acanalada gris acero con luz de galpón, piso de hormigón y franja de
  seguridad amarilla y negra en y 1474. `ambiente.html`: viga amarilla y negra arriba, cartel del
  programa "CÓMO SE HACE · EPISODIO · LOS PEDIDOS" (y 56-206) con dos balizas que titilan, placa de
  estación abajo a la izquierda (EN VIVO → ESTACIÓN 1…5 → "23:00 · SIGUE" en rojo → AUTOMÁTICO en
  verde), placa OPERARIOS 1 → 0 en "dormir"; a las once la planta se oscurece (velo 0.38) y con
  Scalerics vuelve la luz con un halo verde, balizas y cartel en verde.
- Zona del dibujo: y 580-1470 (los personajes se paran sobre el piso). Nada arriba de 580
  (subtítulos en 236) ni en 1540-1800 (placas y logo).
- Tipos: Black Ops One (carteles, títulos, sellos), IBM Plex Mono 600 (etiquetas), Lexend (chat).

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

1. **s01-fabrica** (5.95 s) · La planta andando desde el cuadro 0: tres engranajes girando arriba a
   la izquierda, disco DÍA/NOCHE a la derecha, cinta con cajas PEDIDO que avanzan. "fábrica" 1.58:
   saltito de engranajes y etiqueta PLANTA DE PEDIDOS. "noche" 3.58: el disco gira y queda la luna.
   "¡Y tiene" 3.95: cono de luz y Gustavo sube desde atrás de la cinta con el celular. "operario"
   5.0: sello rojo "1 SOLO OPERARIO".
2. **s02-recepcion** (3.40 s) · Baja el cartel "ESTACIÓN 1 · RECEPCIÓN". Un tubo neumático a la
   derecha; "Llega" 1.42: un globo de chat sale del tubo y cae en un cajón de cartón sobre la cinta;
   "materia prima" 2.33: etiqueta MATERIA PRIMA con flecha al cajón.
3. **s03-milanesas** (2.42 s) · Celular grande (chat "Sofía · en línea"): el mensaje de la clienta
   se escribe con su voz ("Hola, ¿me guardás" / "dos milanesas" / "para las nueve?"); 1.9-2.3:
   entran dos mensajes más ("¿hacen envío?", "¿abren mañana?") y vibra.
4. **s04-copiar** (5.37 s) · Cartel "ESTACIÓN 2 · COPIAR Y PEGAR". Gustavo a la izquierda con el
   celular, planilla a la derecha. "copiar" 0.91 tecla CTRL C, "pegar" 1.25 CTRL V. "relojero"
   2.58: lupa de relojero en el ojo de Gustavo. "pasa el pedido a la planilla" 3.67-4.5: el globo
   vuela del celular a la fila 43 y se llena (Sofía · 2 milanesas 21 h).
5. **s05-fila** (2.88 s) · Gustavo en primer plano repitiendo; dos teclas gigantes C y V a los
   costados que se hunden alternadas como pistones en "Copiar" 0 y "Pegar" 0.86; placa "FILA" con
   el número que sube 41 → 42 → 43 en "cuarenta" 1.27 y "tres" 1.87.
6. **s06-aviso** (4.88 s) · Cartel "ESTACIÓN 3 · EL AVISO". Celular grande con globos que salen
   "uno por uno" (2.57-2.91), y el último se tipea letra por letra en "tu pedido está listo"
   (3.53-4.25), con su tilde.
7. **s07-chocolate** (2.77 s) · Cinta a toda velocidad llevando globos "LISTO"; "chocolate" 0.87:
   una barra de chocolate genérica con sello rojo "NI ESTA"; "así" 1.95: título "¡FASCINANTE!".
8. **s08-stock** (4.74 s) · Cartel "ESTACIÓN 4 · EL STOCK": vidriera de tienda online con
   "MILANESAS 12" que Gustavo corrige a mano a 10 en "stock" 0.99. "Estación cinco" 2.38: cambia a
   "ESTACIÓN 5 · EL REPORTE": hoja REPORTE DEL DÍA que se escribe sola a mano con un lápiz; reloj
   23:40 al lado.
9. **s09-turnos** (5.37 s) · Entrevista: el micrófono del documentalista entra desde la derecha
   hacia Gustavo en "Señor operario" 0. "Uno." 2.18: placa TURNOS: 1. Reloj de fábrica a las 8
   ("ocho" 3.13); "termina..." 3.83 las agujas giran rápido; "¿qué hora es?" 4.63: signo de
   pregunta sobre Gustavo.
10. **s10-once** (2.62 s) · La planta se oscurece. Reloj gigante a las 23:00, "23:00" en rojo;
    "termina" 1.92: sello "HORAS EXTRA".
11. **s11-gustavo** (3.94 s) · Gustavo en primer plano, parche "GUSTAVO". Decorado de fábrica a los
    costados (engranajes, cinta). "rotisería" 1.21: asoma el cartel ROTISERÍA y el spiedo con pollos.
    "La fábrica soy yo" 2.34-2.95: el decorado se cae (gira y cae); flecha "LA FÁBRICA" a Gustavo.
12. **s12-maquinas** (2.65 s) · Planta vacía con siluetas punteadas de brazos robot y signos de
    pregunta ("máquinas" 0.26); "¿Qué máquinas?" 1.04: Gustavo asoma sorprendido.
13. **s13-de-verdad** (5.06 s) · Dos paneles: "DE VERDAD" (brazo robot amarillo que mueve cajas
    solo, arranca en "fábricas" 1.08) y "ACÁ" (Gustavo con el celular, 23:00). "máquinas" 3.83: el
    brazo levanta otra caja; Gustavo suspira.
14. **s14-automatizamos** (4.87 s) · Luz verde. Engranaje verde gigante que arranca solo;
    "Scalerics" 2.03: baja el cartel verde "SCALERICS · AUTOMATIZACIONES"; "a mano" 4.17: una mano
    se tacha con línea verde.
15. **s15-solo** (7.87 s) · Tres filas que pasan solas, cada una con tilde verde y etiqueta SOLO:
    pedido → planilla (0.08-2.08), aviso "Tu pedido está listo" (2.91-4.43), celular con
    notificación "Reporte del día" (5.15-6.87).
16. **s16-dormir** (4.00 s) · La cinta sigue corriendo con engranajes verdes; "Gustavo, a dormir"
    1.99-2.95: Gustavo dormido en su almohada (con casco), Z flotando.
17. **s17-cta** (4.88 s) · "MANDÁSELO" en verde, "AL QUE ES LA FÁBRICA ENTERA" en hueso; píldora
    "Enviar a · el operario" con cursor; Gustavo feliz saludando.
