# Reel "La orquesta": spec

Reel vertical 1080x1920 de Scalerics. Tema: SISTEMA A MEDIDA (el programa de gestión hecho para cómo
trabaja el negocio: stock, pedidos, proveedores, caja, varios locales). Formato P: TRANSMISIÓN DE UN
CONCIERTO DE GALA, con un PRESENTADOR que susurra como en la tele (voz Enceladus). Gancho: "Tu negocio
es una orquesta. Y suena horrible." El DIRECTOR es el dueño (Charon): "Entró un pedido grande. Bolero
de Ravel. Y uno, y dos..." y la orquesta desafina. Cada músico es una herramienta del local y toca otra
partitura: LA PLANILLA DE EXCEL, primer violín, diva snob (Leda: "Yo tengo quince. Bueno, tenía. Me
actualizaron en marzo."); EL CUADERNO DE LA CAJA, percusión, bruto y a los gritos (Fenrir: "¡Yo anoté
veinte! Creo. Hay una mancha de café arriba."); EL SISTEMA ENLATADO DE LA CAJA, trompeta, robótico (Kore:
"Pedidos por mayor: eso no lo hago. No viene en mi versión." / "Nota no reconocida. Actualice a
premium."). El atril del stock está vacío: Graciela, la única que se lo sabe, hoy tiene libre. Tose una
señora, se va la fila tres, el director suda; él intenta "pasar todo al Excel, después al cuaderno,
después a la caja...". GIRO (presentador): "Dirige bien. Pero le dio a cada músico una partitura
distinta." Entra Scalerics (Orus): "hacemos sistemas a medida: el programa de gestión hecho para cómo
trabaja tu negocio. Stock, pedidos, proveedores, caja y varios locales, en una sola partitura." CTA:
"¿Qué instrumento desafina en tu local? Te leemos."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs, con partes/fix.json
para 5 palabras corridas a mano; atempo 1.25 al presentador, 1.5 a la caja): 72.3 s; reel 75.5 s.
La parte 17 se sacó para acortar (no hay partes/17).

## RECURSO VISUAL CENTRAL
El ESCENARIO de un concierto de gala bajo un reflector, con los MÚSICOS-HERRAMIENTA dibujados (la planilla
con cara y violín, el cuaderno espiralado con tambor y mancha de café, la caja registradora con pantalla de
ojos y trompeta) y el DIRECTOR de esmoquin detrás del podio "EL DUEÑO". Los PENTAGRAMAS crema que se
enredan en rojo cuando desafinan (s03, s13) y la PARTITURA ÚNICA con cinco pentagramas alineados en verde
(s16). El contador "DESAFINADAS" de la transmisión sube con cada falla y pasa a "AFINADAS · TODAS" con
Scalerics.

## ESTILO: SALA DE CONCIERTOS DE GALA (transmisión de TV)
Platea azul noche, cono de reflector crema/bronce desde arriba, tablado de madera clara en perspectiva
(y 1330-1560), filete bronce y foso negro abajo (en armar.mjs). ambiente.html: cortinas azul terciopelo
a los costados con filete bronce, viñeta, arriba a la izquierda el zócalo "● EN VIVO · GALA DEL
COMERCIO" (punto rojo que titila), arriba a la derecha el contador "DESAFINADAS" (0 → 6, en rojo) que se
vuelve "AFINADAS · TODAS" en verde en 59.15; abajo a la izquierda la chapa de quién habla (EL PRESENTADOR
bronce · EL DIRECTOR azul · LA PLANILLA DE EXCEL / EL CUADERNO DE LA CAJA / EL SISTEMA DE LA CAJA rojo ·
SCALERICS verde); flash crema en "En Scalerics".
Personajes planos con contorno negro esmoquin (stroke 5-7). Piezas compartidas en `assets/orquesta.js`
(window.OR: director, planilla, cuaderno, caja, atril, silla, publico, pentagrama, nota, kit). Las escenas
s02-s17 salen de `partes/escenas/<id>.mjs` con `node partes/gen-escenas.mjs . <ids>`; s01 está a mano.

## Paleta (SOLO estos)
- Negro esmoquin `#0d0f14` (esmoquin `#1a1d26`, satén `#2b3040`): contornos, esmoquin, caja registradora.
- Azul platea `#13233f` (noche `#0a1426`, medio `#2a4470`, claro `#7fb2ff`): fondo, cortinas, público.
- Crema partitura `#f3ead6` (papel `#e6dbc2`): partituras, planilla, carteles, subtítulos.
- Bronce `#c08a3e` (claro `#e0ab5c`) y madera clara `#d8b27c` / `#b98c55`: reflector, filetes, trompeta, podio, tablado.
- Rojo nota desafinada `#ff3b47` (oscuro `#d02a35`): todo lo que desafina, sellos, contador.
- Piel `#f0c8a0`, canas `#c9cdd6`, café `#7a4a22` (solo personajes y la mancha).
- Solo desde s15 (Scalerics) se suma verde `#5ce611` (oscuro `#2f6e0a`).
Subtítulos: crema con contorno negro; acento bronce (presentador), azul `#7fb2ff` (director), rojo
`#ff5a63` (los tres músicos), verde (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales, música real (las obras solo nombradas).

## Tipos de letra
Cinzel 800-900 (carteles de gala, sellos, chapas, títulos de partitura), Cormorant Garamond itálica
(subtítulos de carteles), Lexend 800 (globos, números), IBM Plex Mono 600 (zócalo, etiquetas, la caja
robot), Caveat 700 (el cuaderno y el post-it).

## Sonido
sfx sintetizados para este reel: `desafina` (dos violines que se separan), `chirrido`, `tos`,
`trompeta` (tres notas que bajan), `acorde` (acorde mayor para Scalerics). Además redoble, bombo,
aplausos, murmullo, uuh, gong.

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 580 y 1560 (los personajes se paran sobre el tablado).
Chapa en y 1594-1700 y logo en y 1746: no taparlos. Zócalo y contador en y 70-185.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es la sala de conciertos con la paleta de arriba). Sí valen las
> reglas técnicas.

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


## Escenas (tiempos en tiempos.md; segundos relativos a la escena)
**s01-orquesta** (3.82). Plano general: el director detrás del podio "EL DUEÑO" al fondo, la planilla con
violín a la izquierda, el cuaderno con tambor, un atril vacío con silla y la caja registradora con
trompeta a la derecha. Cuadro 0 todo ya está. En "orquesta" (1.12) cada músico salta y toca; en
"horrible" (2.64) rayos rojos, notas rojas que vuelan, todo tiembla, sello rojo "DESAFINA" y el director
abre la boca espantado.
**s02-batuta** (3.44). Primer plano del director. Cartel de gala "SILENCIO · en la sala, por favor" en 0;
mira a los costados; en "director" (1.44) etiqueta "EL DIRECTOR"; en "batuta" (2.56) la levanta despacio y
brilla la punta.
**s03-ravel** (5.33). "PEDIDO GRANDE" (sello rojo, 0.36), cartel "BOLERO · de Ravel · por mayor" (1.43),
pentagrama crema que se dibuja; la batuta marca en "uno" (2.33) y "dos" (3.66); en 4.02 la orquesta
arranca y DESAFINA: el pentagrama se vuelve un enredo rojo, notas rojas, sacudón (contador a 1).
**s04-violin** (2.40). La planilla de Excel entra con su violín; "PRIMER VIOLÍN" (0.31); reverencia snob en
"planilla" (0.96).
**s05-marzo** (4.16). La planilla habla: globo "TENGO 15" (0.34); en "tenía" (1.47) se tacha en rojo, la
celda queda "¿?" (contador a 2); en "marzo" (3.21) un almanaque "MARZO 1" con telaraña.
**s06-tambor** (3.03). El cuaderno de la caja con su tambor: redoble en "percusión" (0.16), salta en
"cuaderno" (1.20), golpe seco en "caja" (2.24).
**s07-cafe** (4.49). Primer plano de la página: "Stock yerba:" y un "20" gigante en "veinte" (1.05); en
"Creo" (1.58) aparece un "?" rojo y "(o 26... o 28)" (contador a 3); en "mancha" (2.68) cae una mancha de
café sobre el número, que se borronea.
**s08-trompeta** (2.71). La caja registradora entra con su trompeta: "TROMPETA" (0.16), la pantalla
"SISTEMA V1.0" parpadea en "sistema" (0.96), sello "DE FÁBRICA" en "vino" (1.52).
**s09-version** (4.75). Le llega la partitura "PEDIDOS por mayor"; globo robot "ESO NO LO HAGO" (1.49); la
trompeta se cae (2.79) y sello rojo "NO VIENE EN MI VERSIÓN" en "versión" (3.66) (contador a 4).
**s10-otra-nota** (6.58). Director contra caja: le reclama (0.27), globo "¡OTRA NOTA!" (1.06) y suda;
globo robot rojo "NOTA NO RECONOCIDA" (2.31), ojos rojos (contador a 5); cartel dorado "PREMIUM · actualice
y pague" (4.4) y el director se agarra la cabeza.
**s11-graciela** (4.58). La silla vacía bajo el reflector y el atril "STOCK"; la silla se balancea sola en
"vacío" (0.98); chapa "GRACIELA" (1.68); la partitura del stock se borra y quedan "?" rojos (2.8);
post-it "HOY LIBRE" en "libre" (3.68) (contador a 6).
**s12-publico** (4.29). Desde la platea, cabezas de espaldas: tos (0 y 0.64), "FILA 3 · SE VA" y tres
cabezas se van (1.45-2.16); zoom al director que suda y sello "SUDA" (3.36).
**s13-arreglo** (4.23). El director desesperado arriba, tres atriles (EXCEL, CUADERNO, CAJA): el papel
"PEDIDO" salta de atril en atril en "Excel" (1.42), "cuaderno" (2.05), "caja" (3.12); pentagrama rojo
enredado.
**s14-partituras** (5.34). GIRO. El director tranquilo, sello bronce "DIRIGE BIEN" (0.40); en "cada
músico" (1.84) suben las tres partituras distintas; signos "distinto" rojos (3.28) y sello "CADA UNO LA
SUYA" (3.76).
**s15-scalerics** (5.32). Flash. Un atril nuevo con una pantalla "TU NEGOCIO · GESTIÓN"; cinta métrica y
sello verde "A MEDIDA" (1.67); filas que son de ESTE negocio (yerba suelta por kilo, pedido por mayor,
precio especial de Don Carlos, Local Centro + Local Pocitos) entran en "programa", "gestión", "trabaja",
"negocio".
**s16-partitura** (5.43). La partitura única: cinco pentagramas STOCK, PEDIDOS, PROVEEDORES, CAJA, LOCALES,
cada uno en su palabra, con notas verdes; en "sola partitura" (4.01) llave y barras de compás verdes
alineadas, todo late junto (acorde).
**s17-cta** (5.56). Cartel de gala "¿QUÉ INSTRUMENTO DESAFINA EN TU LOCAL?" y etiqueta verde "TE LEEMOS EN
LOS COMENTARIOS" (1.57); abajo la orquesta toca junta (planilla "OK", cuaderno "OK", caja "A MEDIDA"),
notas verdes y bronce, aplausos y reverencia del director.
