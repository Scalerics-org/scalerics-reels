# Reel "El clon": spec

Reel vertical 1080x1920 de Scalerics. Tema: AUTOMATIZACIONES (los pedidos de WhatsApp pasan solos a la
planilla, el aviso de "tu pedido está listo" sale solo, el reporte del día llega al celular). Formato B:
DIÁLOGO científico-criatura, como una PELÍCULA DE CIENTÍFICO LOCO en blanco y negro (Frankenstein solo
nombrado). El CIENTÍFICO (el dueño del almacén, voz Fenrir, exaltado) confiesa: "Necesitaba a alguien que
pasara los pedidos a la planilla. Así que me fabriqué uno." Medianoche, tormenta, un rayo: "¡Está vivo!
Como Frankenstein, pero con delantal." La CRIATURA (su clon, voz Algenib grave y monótona): "Amo... ¿qué
soy?" · "Sos yo. Pero descansado." Lección: copiar, pegar, "Señora Graciela: doce empanadas. Fila treinta y
cuatro." "¡Aprende!": avisa que el pedido está listo y actualiza el stock; "es lindo trabajar". DÍA 3: "Son
las once. Cuarenta pedidos. Quiero vacaciones." · "¡Los clones no tienen vacaciones!" · se equivoca igual
que él (las empanadas de Graciela en la fila de las milanesas) · "¡Eso me pasa a mí!" · "¿Y si me clono yo
también?" · "¡Dos como yo, no!". GIRO (Orus, a la luz): "No hacía falta un clon. Hacía falta automatizar.
Eso hacemos en Scalerics: el pedido de WhatsApp pasa solo a la planilla, el aviso sale solo, y el reporte del
día te llega al celular." El científico: "Vos, de vacaciones. Yo, a dormir." CTA (Orus): "Etiquetá al que
se clonaría con tal de no pasar un pedido más."

Voz armada por partes: `partes/voces.sh` (Gemini: Fenrir científico, Algenib criatura, Orus narrador) →
`partes/tiempos.sh` (recorta silencios, tiempos por parte) → `partes/componer.mjs` (atempo 1.3 científico y
criatura, 1.15 Orus; silencios 0.25-0.7 s). `partes/10.txt` ("Día tres") y `partes/18.txt` ("Amo... ¿y yo?")
quedaron afuera por duración. `partes/fix.json` corrige el inicio de "hacía" (palabra 118). Locución 73.7 s;
reel 76.9 s.

## RECURSO VISUAL CENTRAL
El CLON: la criatura es el mismo dueño (mismo bigote) con piel gris verdosa, cabeza chata, costura en la
frente, electrodos en las sienes y ojos verde eléctrico, con el delantal del almacén. Los RAYOS verdes de
las bobinas de Tesla lo prenden y lo multiplican (ejército de clones). La PLANILLA es el objeto que va y
viene (filas que se llenan a mano, la fila equivocada en rojo, la fila que se llena sola en verde).

## ESTILO: LABORATORIO GÓTICO EN BLANCO Y NEGRO CON RAYOS VERDE ELÉCTRICO
Película de terror vieja: muro de piedra gris carbón con foco pálido al centro, piso negro con baldosas
(y 1540, en armar.mjs). ambiente.html: grano de película que salta, parpadeo de luz, rayas verticales de
celuloide, viñeta; arriba el cartel de película "EL CLON / UNA PELÍCULA DEL ALMACÉN" (Cinzel, marco doble
hueso); abajo a la izquierda la chapa de quién habla (EL CIENTÍFICO rojo claro · LA CRIATURA verde claro ·
SCALERICS verde); abajo a la derecha el contador "EXPERIMENTO · DÍA 1 / DÍA 3"; flash blanco+verde en
"rayo" y "clono"; en "No hacía falta" (Scalerics) se prende la luz: flash largo, el cartel pasa a
"AUTOMATIZACIONES · SCALERICS" con borde verde, se va el contador, baja el grano y dejan las rayas.
Personajes planos con contorno tinta grueso; piezas en `assets/lab.js` (window.LAB): científico (pelo blanco
desquiciado, antiparras verdes en la frente, ojeras, bigote, guardapolvo y delantal ALMACÉN; caras loco,
grito, horror, feliz, dormido; brazos arriba o en la cabeza), criatura (caras neutra, cansada, malvada,
feliz, triste; lentes de sol), bobina de Tesla, mesa de operaciones, palanca, ventana gótica, planilla,
celular, globos, reloj, teclas, rayos, y el kit de animación (pop, sello, dibujar, chispazo, hablar...).

## Paleta (SOLO estos)
- Tinta `#0a0a0c`: contornos, fondo.
- Grafito `#26262b` (claro `#3a3a41`): muros, ropa de la criatura, máquinas.
- Plata `#8d8d94` (claro `#b9b9be`): metal, bobinas, detalles apagados.
- Hueso `#ecebe4` (sombra `#d2d0c6`): guardapolvo, planilla, papeles, textos.
- Verde eléctrico `#5ce611` (claro `#b8ff7a`, oscuro `#2f7a0a`): rayos, ojos de la criatura, lo que sale bien.
- Rojo alarma `#e5484d` (claro `#ff6b70`): errores, sellos, el grito del científico.
- Pieles: científico `#d8d4c8`, criatura `#a3ab9c` (solo personajes).
Subtítulos: hueso con contorno tinta; acento rojo claro (científico), verde claro (criatura), verde (Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), caras o imágenes de películas.

## Tipos de letra
Cinzel 900 (títulos de película, carteles, chapas), Lexend 600-900 (chat, planilla, textos), IBM Plex Mono
600 (rótulos, tags), Black Ops One (sellos y el cartel de protesta).

## Zona
Cartel de película arriba (y 48-194). Subtítulos (y 236-420). Contenido entre y 520 y 1560. Chapa y contador
en y 1572-1672 y logo en y 1746: no taparlos (los bustos pueden pasar por detrás de la chapa).

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el laboratorio gótico con la paleta de arriba). Sí valen las
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


## Escenas (tiempos relativos en tiempos.md)
**s01-fabrique** (4.07). Cuadro 0: el científico (cara loca) a la izquierda, ventana gótica con rayo atrás,
la planilla vacía arriba a la derecha y la mesa de operaciones con un cuerpo bajo la sábana. En "pedidos"
(1.31) tres mensajes ("12 empanadas", "2 milanesas", "pizza grande"); en "planilla" (1.85) vuelan a la
planilla y llenan las filas; tag "EXPERIMENTO Nº 1"; en "fabriqué" (2.92) rayo sobre la mesa, la sábana
titila verde, sacudón; en "uno" (3.23) asoma una mano gris que se mueve.
**s02-tormenta** (2.49). Exterior del almacén como castillo (torre con pararrayos, ventana verde), reloj a
las 12 con tag "00:00 · MEDIANOCHE"; en "Tormenta" (0.91) lluvia; en "rayo" (1.77) el rayo cae en la torre.
**s03-vivo** (4.70). La criatura sube entre dos bobinas de Tesla, rayos a sus electrodos, ojos que se
prenden; título "¡ESTÁ VIVO!" (Cinzel verde) que late en el segundo "vivo" (1.28); en "Frankenstein" (2.43)
tag "COMO FRANKENSTEIN" y la cabeza se ladea; en "delantal" (3.59) sello verde "+ DELANTAL".
**s04-que-soy** (3.65). Criatura a la izquierda y científico a la derecha; "¿qué soy?": la cabeza se ladea y
aparece un "?" gigante (1.28); en "Sos yo" (2.04) un "=" verde entre los dos; en "descansado" (2.81) tags
"COPIA: DESCANSADA" y "ORIGINAL: ROTO" y círculos rojos en las ojeras del científico.
**s05-copiar** (4.95). Pizarra "LECCIÓN Nº 1"; científico abajo a la izquierda, criatura a la derecha; en
"copiar" (1.72) teclas CTRL + C "COPIAR"; la criatura repite (2.71) y las teclas se aprietan en verde; en
"Pegar" (3.38) CTRL + V "PEGAR"; la criatura repite (4.25).
**s06-graciela** (4.15). Celular con el chat de "Sra. Graciela" (globo "Hola! 12 empanadas" en 0.23), flecha
punteada que corre hacia la planilla (filas 32-35); en "Fila" (2.07) el globo vuela a la fila 34, marco
verde; en "cuatro" (2.88) la fila se llena "Graciela · 12 empanadas" y tag "FILA 34 · LISTO". La criatura
chiquita abajo a la derecha.
**s07-aprende** (4.29). El científico con los brazos arriba, festejando; sello "¡APRENDE!"; en "avisale"
tarjeta "Tu pedido está listo · PARA: GRACIELA" y el tic se dibuja en "listo" (2.23); en "stock" (3.54)
barra de stock de empanadas que baja (48 → 36) y tag "STOCK ACTUALIZADO".
**s08-lindo** (6.08). Lista con dos casillas que se tildan en "listo" (0.66) y "actualizado" (1.97); la
criatura al centro; en "lindo" (3.93) cambia a cara feliz y ladea la cabeza; en "trabajar" (4.67)
corazones verdes y tag "DÍA 1 · CERO QUEJAS".
**s09-dia-tres** (5.55). Placa de película "DÍA 3" (y el contador del ambiente pasa a DÍA 3); en "Son"
(0.66) la criatura cansada (ojeras, ojos a media asta) y reloj que gira hasta las once (1.15); en
"Cuarenta" (1.88) caen papeles en pila y "40" rojo; en "Quiero" (3.62) cartel de protesta "QUIERO
VACACIONES" que se sacude en "vacaciones".
**s10-no-tienen** (3.03). Primer plano del científico gritando con rayos de fondo que giran; en "clon"
(0.31) "¡SOS UN CLON!" rojo; en "vacaciones" (1.85) sello "SIN VACACIONES" y sacudón.
**s11-milanesas** (6.40). Planilla PRODUCTO/PEDIDOS (Empanadas, Milanesas, Pizzas); la criatura triste
abajo; en "empanadas" (0.61) tarjeta "Graciela · 12 empanadas" que flota; en "milanesas" (3.38) cae en la
fila de Milanesas, que se pone roja, sello "ERROR"; en "¡Eso" (4.60) entra el científico horrorizado
agarrándose la cabeza, tag "MISMO ERROR QUE VOS".
**s12-me-clono** (7.90). La criatura malvada y la palanca "CLONAR"; en "clono" (3.46) baja la palanca, rayo,
sacudón, y detrás aparecen clones (2, 4, 8) con el contador "CLONES: 2 / 4 / 8 / 16"; en "¡No!" (5.45) entra
el científico gritando con las manos en la cabeza delante del ejército; en "Dos" (6.14) "¡DOS COMO YO, NO!".
**s13-automatizar** (4.64). Corte a la luz: cono de luz; la silueta apagada del clon y una X roja que se
dibuja en "clon" (0.95); en "Hacía" (1.60) se va y entran dos engranajes verdes que giran; en
"automatizar" (2.00) título "AUTOMATIZAR"; tag "ESO HACE SCALERICS".
**s14-solo** (6.08). Tres filas que entran en orden, cada una con su sello "SOLO": el globo "12 empanadas"
pasa a la planilla y la fila se pone verde (1.27-1.70); la tarjeta "Tu pedido está listo" y el avioncito que
sale (2.83); el celular al que le cae el "REPORTE DEL DÍA" con barras (4.92) y "Tu día, resumido / y vos sin
copiar nada".
**s15-dormir** (2.00). La criatura con lentes de sol, feliz, tag "DE VACACIONES"; el científico dormido, cabeza
que cae y "Zzz" en "dormir".
**s16-cta** (6.89). "ETIQUETÁ" verde gigante, "AL QUE SE CLONARÍA" hueso, campo "@ tu amigo" con cursor que
titila; abajo el científico y la criatura felices con un rayito entre los dos.
