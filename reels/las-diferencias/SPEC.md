# Reel "Las diferencias": spec

Reel vertical 1080x1920 de Scalerics. Tema: SISTEMA A MEDIDA (stock, precios, caja, proveedores y
clientes de varios locales en un solo lugar, hecho para cómo trabaja ese negocio). Formato E: PREGUNTA
AL QUE MIRA, con la forma de un juego de "ENCONTRÁ LAS DIFERENCIAS" de una revista de pasatiempos.
LA PROFE (voz Kore, maestra de pasatiempos implacable) desafía al que mira: "Encontrá las cinco
diferencias entre tu local del Centro y el de Pocitos. Tenés cinco segundos." (un segundo de tic tac
para pensar). EL DUEÑO (voz Charon), sobrado: "¡Fácil! Son iguales. Los armé yo." La profe revela una
por una con círculos rojos de birome: 1 el stock (12 camperas en el Centro, 3 en Pocitos) · el dueño:
"¿Doce? ¿Quién anotó doce?"; 2 la misma campera con dos precios · LUCÍA, la clienta (voz Leda): "¿Cómo
que acá sale más cara? ¡En el Centro me la dejaban a menos!"; 3 la caja no cierra; 4 al proveedor le
pagaste dos veces · el dueño: "¡Con razón me saluda tan contento!"; 5 en el Centro Lucía es clienta VIP
· Lucía: "Y en Pocitos me preguntaron el nombre. ¡Hace años que compro!". El dueño: "Bueno, perdí. ¿Pero
por qué pasa esto?" GIRO (la profe, cómplice): "Esa es la diferencia de verdad. El Centro anota en un
cuaderno. Pocitos, en un Excel. Y la caja, en tu cabeza." Entra Scalerics (Orus): sistemas a medida,
todo en un solo lugar, "hecho para cómo trabaja tu negocio, no al revés". Última ronda: las dos láminas
son iguales; el dueño: "A ver... No hay ninguna. ¡Gané!". CTA (Orus): "¿Y vos, cuántas encontraste
antes que el dueño? Dejá el número en los comentarios."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.sh, atempo 1.25 a la
profe y 1.16-1.17 al resto, partes/fix.json corrige 2 tiempos): 70.5 s; reel 73.7 s.

## RECURSO VISUAL CENTRAL
LA LÁMINA: dos recuadros casi iguales, uno arriba (A · CENTRO) y otro abajo (B · POCITOS), con el
mismo local de ropa dibujado en tinta (`PA.lamina`): perchero con tres camperas, cartel de STOCK
(12 / 3), etiqueta amarilla de precio ($ 2.490 / $ 2.990), caja registradora con visor (CIERRA / − 800),
corcho con la factura del proveedor (un PAGADO / dos PAGADO) y Lucía (corona VIP / globo "¿NOMBRE?").
Cada diferencia se revela con un CÍRCULO ROJO DE BIROME que se dibuja a mano (`PA.circulo`) en los dos
recuadros, y queda anotada en el marcador ENCONTRADAS de abajo. Al final las dos láminas son iguales.
Centros de cada diferencia en coordenadas del recuadro: `PA.D` (stock, precio, caja, factura, lucia).

## ESTILO: REVISTA DE PASATIEMPOS EN PAPEL DE DIARIO
Papel de diario amarillento con grano de trama (armar.mjs). ambiente.html: arriba la cabecera
"PASATIEMPOS" en Cormorant Garamond con doble filete, "Nº 1102", "$ 45" y "ENCONTRÁ LAS 5 DIFERENCIAS"
resaltado en amarillo (desde "Scalerics": "EDICIÓN UN SOLO SISTEMA" resaltado en verde); abajo a la
izquierda la chapa de quién habla (LA PROFE rojo · EL DUEÑO azul · LUCÍA amarillo · SCALERICS verde);
abajo a la derecha el marcador ENCONTRADAS con 5 numeritos que se encierran en rojo en cada revelación
(y se tildan en verde con "ninguna"); decorado: un crucigrama asomando abajo a la izquierda, renglones
de texto de diario y una mancha de café; flash de papel en "Scalerics".
Personajes de historieta de diario, contorno tinta grueso (stroke 7-8), piezas en
`assets/pasatiempos.js` (window.PA): la profe (rodete canoso con lápiz, lentes con cadenita, cárdigan
rojo, birome roja), el dueño (pelado con costados canosos, bigote, camisa azul, birome azul), Lucía
(cola de caballo, buzo amarillo, aros).

## Paleta (SOLO estos)
- Papel `#ece3cc` (claro `#f6f0de`, sombra `#d6c9a8`): fondo, recuadros, globos.
- Tinta `#1c1a17`: contornos, textos, cabecera.
- Rojo birome `#d62828` (oscuro `#a51d1d`): círculos, sellos, la profe.
- Azul birome `#1f4fbf` (oscuro `#163a8c`): el dueño, lo que él escribe.
- Amarillo resaltador `#ffe14a`: etiquetas de precio, resaltados, Lucía.
- Solo desde "Scalerics": verde `#5ce611` (oscuro `#3f9e0b`) para lo que sale bien.
- Piel `#f0c8a0` / `#e0ad86`, pelo `#3b2f27`, canas `#8d857a` (solo personajes).
Subtítulos: tinta sobre el papel, sin contorno; acento rojo (profe), azul (dueño), resaltado amarillo
(Lucía), resaltado verde (Scalerics).
Prohibido: emojis, fotos, rayas largas, marcas reales (Excel solo como palabra y grilla genérica).

## Tipos de letra
Cormorant Garamond 600 (cabecera, títulos de revista), Special Elite (textos de revista), Lexend 800-900
(números, globos), IBM Plex Mono 600 (rótulos, tags), Caveat (lo que escribe el dueño con birome),
Black Ops One (sellos).

## Zona
Cabecera en y 34-212. Subtítulos arriba (y 236-420). Contenido entre y 520 y 1550. Chapa y marcador en
y 1572-1672 y logo en y 1746: no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es la revista de pasatiempos con la paleta de arriba). Sí
> valen las reglas técnicas.

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
**s01-encontra** (5.86). Cuadro 0: la lámina (A · CENTRO arriba en y 570, B · POCITOS abajo en y 1070) ya
entrando. En "cinco" (0.56) círculo rojo de birome alrededor de "5 DIFERENCIAS" de la cabecera; en
"Centro" (2.40) el rótulo A late y el recuadro se sacude; en "Pocitos" (3.30) lo mismo con B; la profe
sube abajo a la derecha con la birome en alto, hablando; en "Tenés" (3.80) cronómetro entre los dos
recuadros y en "segundos" (4.32) la aguja salta de a un segundo (tic tac) y tag "5 SEGUNDOS".
**s02-facil** (2.84). El dueño grande, sobrado, birome azul en alto; en "Fácil" (0.0) sello azul
"¡FÁCIL!"; en "iguales" (0.94) escribe con birome (Caveat azul) "son iguales" sobre una hojita de
revista con las dos láminas en miniatura y un "=" gigante; en "armé" (1.88) se señala el pecho, tag
"LOS ARMÉ YO".
**s03-stock** (5.64). Zoom a la izquierda de las dos láminas (cartel de STOCK). En "Diferencia" (0.0) el
tag "DIFERENCIA Nº 1" y en "stock" (1.60) zoom; en "doce" (3.20) círculo rojo en el 12 de A y flecha; en
"tres" (4.80) círculo rojo en el 3 de B y sello "1".
**s04-quien** (2.27). El dueño confundido con la birome; en "Doce" (0.0) un papelito con "12" tachado a
birome y "¿?"; en "Quién anotó" (0.96) tres papelitos más con números distintos (12 · 8 · 3) caen
alrededor, gota de sudor.
**s05-precios** (3.39). Zoom a las etiquetas de precio de A y B. "Número dos" (0.0) tag "DIFERENCIA Nº 2";
en "misma campera" (1.12) las dos camperas rojas se resaltan; en "dos" (2.16) círculo en $ 2.490 y en
"precios" (2.40) círculo en $ 2.990 y "≠" rojo entre los dos.
**s06-mas-cara** (3.58). Lucía grande, enojada, con la campera roja con etiqueta en la mano; en "más
cara" (0.60) globo "¿MÁS CARA?"; en "Centro" (1.71) globo "¡EN EL CENTRO ME LA DEJABAN A MENOS!"; sacudón.
**s07-caja** (5.62). Zoom a la caja: "Número tres" tag "Nº 3"; en "caja" (1.04) el visor CIERRA vs
− 800 y en "cierra" (1.60) círculo rojo en − 800 con la cinta de ticket que sale larga. En "Número
cuatro" (2.52) zoom a la factura: tag "Nº 4"; en "proveedor" (3.52) círculo en la factura de A y en
"dos veces" (4.64) círculo en la de B con los dos PAGADO (que hacen sello de golpe).
**s08-contento** (2.41). El proveedor en su camioncito "DISTRIBUIDORA" saludando feliz con la mano,
corazones; en "saluda" (0.77) se le agranda la sonrisa y saluda más; en "contento" (1.29) dos billetes
vuelan; el dueño chiquito a la izquierda con la mano en la frente.
**s09-vip** (4.80). Zoom a Lucía de A: "número cinco" tag "Nº 5"; en "Centro" (1.28) alfombra roja y
la corona brilla; en "Lucía" (2.17) chapa con el nombre; en "VIP" (3.52) círculo rojo en la corona y en
el globo "¿NOMBRE?" de B.
**s10-nombre** (3.97). Lucía en Pocitos frente a una planilla "CLIENTE NUEVO · NOMBRE: ____"; en
"nombre" (1.37) el empleado (manos) le pide el nombre; en "Hace años" (2.26) sello rojo "HACE AÑOS QUE
COMPRA" y Lucía ofendidísima.
**s11-perdi** (3.08). El dueño rendido tira la birome; el marcador grande con los 5 círculos y sello
rojo "PERDISTE" en "perdí" (0.43); en "por qué" (1.54) un gran "¿?" de birome.
**s12-cuaderno** (8.10) GIRO. La profe cómplice, sin sello. En "diferencia de verdad" (0.48) la
profe se baja los lentes; en "Centro" (1.84) arriba: un cuaderno espiralado con números a birome
("camperas 12"); en "Pocitos" (4.09) abajo: una planilla genérica de celdas verde/gris con "3";
en "caja" (6.00) la cabeza del dueño con nubes de números (− 800 ¿?) que giran; en "cabeza" (6.96)
tag "TRES LUGARES · TRES VERDADES".
**s13-sistema** (6.74). Flash. En "Scalerics" (0.0) el cuaderno y la planilla se juntan en una pantalla
grande (sistema) con encabezado "TU SISTEMA" y dos columnas CENTRO · POCITOS; en "sistemas a medida"
(1.21) tag verde "SISTEMA A MEDIDA"; en "Stock" (2.27), "precios" (2.94), "caja" (3.36), "proveedores"
(3.79) y "clientes" (4.40) se tilda una fila verde cada vez con el mismo dato en los dos locales; en
"un solo lugar" (5.78) sello verde "UN SOLO LUGAR".
**s14-a-medida** (2.77). Una cinta métrica de modista (amarilla, numerada) envuelve la pantalla como a
un traje; en "trabaja" (0.50) se lee "HECHO PARA TU NEGOCIO"; en "no al revés" (1.65) un sistema
enlatado (caja cuadrada gris) queda tachado.
**s15-ultima** (5.71). La lámina otra vez con las dos iguales (12, $ 2.490, CIERRA, un PAGADO, VIP); tag
"ÚLTIMA RONDA"; en "Encontrá" (0.87) cronómetro; en "A ver" (2.73) el dueño con lupa pasa por las dos;
en "ninguna" (3.66) "=" verde entre los dos recuadros; en "Gané" (4.56) el dueño feliz y papelitos.
**s16-cta** (6.91). Hoja de respuesta de la revista: "¿CUÁNTAS ENCONTRASTE?" en Cormorant, un casillero
grande "__ / 5" donde una birome escribe "?" en "cuántas" (0.54); en "dueño" (1.64) el dueño
chiquito con la lupa; en "Dejá el número" (2.27) un globo de comentario dibujado con "5/5" a birome y
tag "DEJÁ TU NÚMERO EN LOS COMENTARIOS" (en dos líneas). Queda quieto con el lápiz latiendo.
