# Reel "La tasación": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: SISTEMA A MEDIDA. Formato A (polémica con giro),
montado como programa de CASA DE EMPEÑOS / TASACIONES de TV (genérico, personajes inventados).
Gancho: el TASADOR (Gemini Algenib, grave y seco, "el viejo del mostrador", lupa de joyero en el
ojo) le dice al que mira: "Tu negocio no vale nada." Entra BETO (Gemini Charon), dueño de una
distribuidora de bebidas con dos locales, a venderla para jubilarse: "¿Cuánto me da?". El AYUDANTE
joven (Gemini Puck, gorra roja para atrás, chicle) hace chistes de fondo. El tasador revisa pieza
por pieza: 1 el cuaderno del stock ("escritura antigua; esto no se tasa: se descifra"), 2 la
planilla "precios final final v3" ("la final final nunca es la final"), 3 la caja que cierra "más
o menos" ("más o menos no cotiza"), 4 el sistema enlatado que no maneja los dos locales ("eso no
lo hace"). "¿Todo esto quién lo sabe usar?" "Yo." "Entonces lo que usted vende... es usted. Y sin
usted, vale cero." Ayudante: "Jefe, ¿le ofrezco cincuenta y un alfajor?" Beto: "¡¿Un alfajor?!".
GIRO (el tasador se ablanda): su negocio vale un montón: los clientes, los proveedores, el nombre
en el barrio; lo que no vale es que dependa de usted. ORUS (Scalerics): sistema a medida, hecho
para cómo trabaja tu negocio: stock, pedidos, proveedores, caja y los dos locales en un solo
lugar, para que camine aunque vos no estés. Remate del ayudante: "Y el alfajor se lo guardo."
Cierre (Orus): "Hacete la pregunta y contestala en los comentarios: ¿tu negocio abre mañana sin vos?"

Recurso visual central: el MOSTRADOR de la casa de empeños (vidrio oscuro abajo, con relojes y
anillos adentro) y el cartel de NEÓN "COMPRO · TASO · VENDO" arriba; cada cosa de Beto aparece
como una PIEZA tasada (rótulo dorado "PIEZA N") y las ETIQUETAS DE PRECIO crema colgadas de un hilo
dorado que se hamacan. Distinto de `el-testamento` y `houston-marta`: acá no es "todo en la cabeza
de uno" contado por la familia o el equipo, sino el VALOR del negocio: sin el dueño, cero.

## Voz (20 parlamentos, sin el 18)
`partes/NN.txt` + `partes/voces.sh` (Algenib tasador 01 04 05 07 09 11 13 16; Charon Beto 02 08
10 12 15; Puck ayudante 03 06 14 19; Orus 17 20). `recortar.sh` + `pausas.mjs` (pausa dramática del
13 en 0.5 s), después `partes/cortar-inicio.mjs 02 1` ("Buenas.") y `cortar-inicio.mjs 11 2`
("Última pregunta.") para acortar: si se vuelve a correr recortar/pausas, repetir esos dos cortes.
El 18 ("Vuelva con eso.") quedó afuera, en `partes/fuera/`. Tiempos: `tiempos.mjs` sobre cada
NN-p.wav -> `partes/NN.json`; `partes/componer.mjs` (atempo.json 1.0-1.2, gaps.json 0.3-0.55)
arma locucion.wav y palabras.json. Locución 73.3 s; reel 76.5 s.

## Cómo se arma
`node escenas.mjs` escribe reel.json (escenas por parlamento, cortes y acento), `ambiente.html` y
las 16 escenas con sus .sfx.json, buscando los tiempos de cada palabra en palabras.json, y corre
`armar.mjs`. Si cambia la voz, se corre de nuevo y todo se reacomoda solo.

## ESTILO: CASA DE EMPEÑOS DE NOCHE, NEÓN ROJO Y AZUL. Edición cargada.
Fondo verde botella (armar.mjs) con listones dorados verticales tenues, brillo rojo arriba (el
neón) y azul abajo (el vidrio). Ambiente: cartel de neón (letras rojas, marco azul; "TASO" titila
a ratos; desde Orus el marco pasa a verde), viñeta, golpes rojos en "nada", "Yo", "cero" y "un
alfajor", MOSTRADOR de vidrio en y 1440-1920 (borde dorado, relojes y anillos adentro) y rótulo
"CASA DE EMPEÑOS · TASACIONES". Personajes de busto detrás del mostrador (los corta el borde).

## Paleta (SOLO estos colores)
- Verde botella `#07120d` / `#0d241a` / `#16392a`: fondo, rellenos de personajes y paneles.
- Crema etiqueta `#f1e6c8`: contornos, caras, etiquetas colgantes, textos grandes, subtítulos.
- Dorado gastado `#c9a24a`: hilos, rótulos de pieza, marcos, la registradora, acento de
  subtítulos (`#e6b94f`).
- Neón rojo `#ff3b4a`: "NADA", sellos, la gorra del ayudante, alarmas.
- Neón azul `#4aa8ff`: marco del cartel, globos del ayudante, "ABIERTO", reflejos.
- Desde s13 (Scalerics): verde `#5ce611` para el sistema a medida.

## Personajes
- Tasador: pelado con mechones a los costados, cejas gruesas, anteojo redondo dorado y LUPA DE
  JOYERO negra en el ojo derecho, bigote crema, chaleco con moño dorado.
- Beto: cara redonda, peinado de cortina, bigotazo, nariz grande, chomba con cuello dorado y
  bordado en el pecho; cejas de indignado y boca en O; gota de sudor azul.
- Ayudante: gorra roja para atrás, ojos a media asta, arito dorado, buzo; burbuja de chicle roja.

## Zona
Cartel de neón y 96-208; subtítulos y 236-430; escenas y 560-1440; mostrador desde y 1440.

## Escenas (tiempos exactos en `tiempos.md`)
- **s01-nada** (2.1 s): primer plano del tasador mirando a cámara (está desde el cuadro 0). "NO
  VALE" cae en "vale"; "NADA" en neón rojo gigante en "nada", con sacudón, golpe rojo y titileo.
- **s02-beto** (4.4 s): campanita de la puerta; Beto entra desde la izquierda, el tasador a la
  derecha. "Dos locales": dos fachadas LOCAL 1 / LOCAL 2; "jubilar": reposera azul, sol y mate;
  "¿CUÁNTO ME DA?" dorado gigante.
- **s03-brazo** (2.9 s): el ayudante entra desde la derecha; en "negocio" aparece la fachada de la
  distribuidora abajo del brazo de Beto (gota de sudor) y el globo "¿TODO EL NEGOCIO?"; chicle.
- **s04-cuaderno** (5.0 s): PIEZA 1. Cuaderno abierto con garabatos; LUPA grande que lo recorre
  ("Coca: los de siempre (ver lo de Ramírez)"); etiqueta colgante "ESCRITURA ANTIGUA"; sello "NO
  SE TASA: SE DESCIFRA".
- **s05-excel** (7.3 s): PIEZA 2. Planilla con celdas "????", "#REF!", "Beto sabe"; el nombre de
  archivo se completa en cada "final" y en "versión": precios_final_final_v3.xls. El ayudante
  asoma: globo "NUNCA ES LA FINAL".
- **s06-caja** (5.8 s): PIEZA 3. Registradora vieja; "¿CIERRA?"; Beto asoma, el visor dice "MÁS O
  MENOS" titilando y el cajón se traba; sello "MÁS O MENOS NO COTIZA".
- **s07-enlatado** (6.4 s): PIEZA 4. Una LATA "SISTEMA · TALLE ÚNICO" cae y se le abre la tapa;
  LOCAL 1 y LOCAL 2 con cables punteados; en "No." cruces rojas y los cables titilan; sello "ESO NO
  LO HACE".
- **s08-quien** (2.9 s): primer plano del tasador, se saca la lupa: "¿QUIÉN LO SABE USAR?"; corte a
  Beto gigante: "YO" en neón rojo.
- **s09-cero** (5.8 s): Beto adentro de una VITRINA como una pieza más; "LO QUE VENDE ES USTED";
  le cuelga una etiqueta "BETO"; sello grande "SIN USTED: CERO".
- **s10-alfajor** (4.8 s): el ayudante ofrece: globo "¿CINCUENTA Y UN ALFAJOR?", cae un alfajor
  con etiqueta "OFERTA"; Beto indignado: "¡¿UN ALFAJOR?!" en neón rojo, salta.
- **s11-vale** (5.6 s): GIRO. "OJO, BETO" y "VALE UN MONTÓN" dorado; tres etiquetas colgantes que
  caen en su palabra: CLIENTES (gente), PROVEEDORES (camión), EL BARRIO (la fachada "DE BETO").
- **s12-depende** (2.3 s): las tres cosas cuelgan de hilos dorados que salen de Beto; sello "TODO
  CUELGA DE BETO"; todo se hamaca con él.
- **s13-sistema** (8.2 s, Orus): "SISTEMA A MEDIDA" verde con una CINTA MÉTRICA dorada; "hecho
  para cómo trabaja tu negocio"; módulos STOCK, PEDIDOS, PROVEEDORES, CAJA y LOCAL 1 + LOCAL 2 en su
  palabra, conectados a "UN SOLO LUGAR" que se prende en "solo".
- **s14-camina** (2.5 s): en "camine" a la distribuidora le salen patitas y camina sola, con
  "ABIERTO" en neón azul; "aunque vos no estés": Beto en la reposera con el mate.
- **s15-guardo** (2.1 s): el ayudante se lleva el alfajor ("EL ALFAJOR SE LO GUARDO") y el
  tasador guiña.
- **s16-cta** (8.5 s): etiqueta de precio gigante que cae y se hamaca: "TASACIÓN FINAL · ¿TU
  NEGOCIO ABRE MAÑANA SIN VOS?" (sin vos en rojo) y "CONTESTÁ EN LOS COMENTARIOS" que late.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba: acá NO es ilustración crema con acento verde, es la casa de empeños con la paleta de
> arriba, rellenos y brillos de neón. Sí valen las reglas técnicas.

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

