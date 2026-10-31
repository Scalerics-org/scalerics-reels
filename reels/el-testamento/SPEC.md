# El testamento · sistema a medida · lectura de la herencia ante el escribano

**De qué trata.** Telenovela familiar en una escribanía antigua. Don Hugo, ferretero de toda la
vida, se jubila (VIVO y feliz: se va a pescar a La Paloma) y les deja la ferretería a sus dos hijos.
El escribano (Charon, solemnísimo) abre con el gancho: "Don Hugo les dejó la ferretería a sus hijos.
El problema es que el negocio estaba en su cabeza." Lee el testamento: "Les dejo el local, la
clientela... y todo lo demás, que está en mi cabeza." Los hijos (hija Leda, hijo Fenrir) preguntan
lo básico: ¿cuánto stock hay?, ¿a qué proveedor le debemos?, ¿el precio especial del de la obra? Y
el escribano lee los anexos: el cuaderno ("tornillos: los de siempre, en el cajón de siempre"; "¡hay
mil cajones!"), la caja de zapatos de las facturas, y la cláusula "el código de los precios es mi
fecha de cumpleaños al revés" ("¿alguien sabe cuándo cumple papá?" "¿en invierno?"). Mensaje grabado
de Don Hugo (Gacrux) desde la costa: "cualquier cosa me llaman, pero de mañana no, que pica la
corvina." La hija, al borde del llanto: "¡nos dejó un negocio que solo funciona con él adentro!".
GIRO (Orus): Don Hugo no hizo nada mal, pero un negocio vale de verdad cuando funciona sin vos. Un
sistema a medida de tu ferretería (stock, proveedores, precios y caja) que entiende cualquiera: esa
es la verdadera herencia. Don Hugo: "¿Vieron? Ni me llamaron." Cierre: "¿En tu negocio quién es Don
Hugo? Etiquetalo."

**Formato:** P (personaje de la cultura popular: lectura del testamento de telenovela).
**Recurso visual central:** la escribanía: escritorio de madera, lámpara de banquero verde, el
pergamino del testamento escrito con pluma, el sobre con lacre rojo y sello, el retrato de Don Hugo
en marco dorado, y los "anexos" (cuaderno con tachones, caja de zapatos, cláusula) presentados
como reliquias con un sello de lacre "ANEXO I / II / III". Golpes de telenovela: zoom de cara y luz
roja en el borde (ambiente).

## Paleta (manda sobre SPEC-base)
- Nogal `#3a2416` / `#26170d` (fondo, con vetas verticales en armar.mjs) y tinta `#140b06`.
- Madera del escritorio `#6b4426` (canto `#4a2d18`).
- Pergamino `#efe2c2` (sombra `#d9c79c`): papeles, camisas, el texto claro.
- Verde banquero `#1f5b3f` (claro `#2f7a55`): lámpara, traje del escribano, delantal de Don Hugo, la pantalla del sistema.
- Rojo lacre `#a8202a`: sellos, lacre, tachones, la blusa de la hija.
- Dorado `#e8b44c`: marcos, acento de subtítulos, etiquetas, la cinta métrica, el buzo del hijo.
- Piel `#d9a77c` (Don Hugo bronceado `#c48a5e`). Ilustración plana con relleno y contorno `#140b06`.

## Tipografía
- Subtítulos: Lexend 600, 52px, pergamino `#f3e6c8`; acento dorado `#e8b44c`.
- Documentos (títulos del testamento, cláusulas, etiqueta debajo del dibujo, rótulo del ambiente):
  Cormorant Garamond 600 (serif de escribanía; manda sobre el "sin serif" de SPEC-base).
- Lo manuscrito de Don Hugo (cuaderno, cláusulas, firma): Caveat 700.
- Etiqueta debajo del dibujo: Cormorant 600, 34px, mayúsculas, espaciada 0.22em, dorada, top 1372.

## Ambiente (`compositions/ambiente.html`)
Luz cálida de la lámpara que respira, motas de polvo que flotan, grano, viñeta, y golpes de luz roja
de telenovela en el borde en los momentos de drama (problema 2.87, cabeza 13.52, ¿en invierno?
39.09, ¡nos dejó! 46.04). Desde "En Scalerics" (54.45) luz dorada pareja y el rótulo de abajo pasa
de "ESCRIBANÍA · SUCESIÓN DON HUGO" a "HERENCIA EN ORDEN".

## Sonido
Efectos propios en `assets/sfx/`: `drama` (golpe de telenovela), `martillo` y `golpe` (sellos de
lacre), `murmullo`, `uuh`, `olas`, `tic`, `campanita`, `estatica`.

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh (las del escribano y Orus con pausas de 0.18 s) →
tiempos.mjs por parte → componer.mjs (atempo 1.08-1.3 y silencios entre parlamentos). Escribano
Charon (01, 02, 04, 07, 09), hija Leda (03, 06, 10, 14), hijo Fenrir (05, 08, 11), Don Hugo Gacrux
(13, 18, con filtro de grabación), Orus (15, 16, 17, 19). La 12 ("Hay un mensaje grabado") quedó
afuera por largo; a la 07 se le cortó "Número cuarenta y dos".

## Personajes (siempre iguales)
- **Escribano:** pelado con pelo canoso a los costados, bigote canoso, anteojos redondos dorados,
  traje verde banquero, camisa pergamino, moño rojo lacre.
- **Don Hugo:** bigote canoso grande, cejas tupidas, lápiz en la oreja; en el retrato con delantal
  verde banquero; en la costa con sombrero de pescador dorado, camisa pergamino y caña.
- **Hija:** pelo oscuro largo, aros dorados, blusa rojo lacre.
- **Hijo:** pelo corto oscuro y barba corta, buzo dorado.

## Base técnica (de SPEC-base; la paleta y el estilo de arriba mandan)
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



## Escenas (tiempos relativos; ver tiempos.md)

### s01-gancho (0-5.52) · el gancho
Escribanía: escritorio de madera abajo (y 1150-1330) con la lámpara de banquero verde a la izquierda
(encendida) y el sobre con lacre rojo. En la pared, el retrato ovalado de Don Hugo en marco dorado
(delantal verde, lápiz en la oreja). Cuadro 0 ya a medio armar. "ferretería" (1.15): plaquita dorada
"FERRETERÍA DON HUGO" bajo el retrato. "hijos" (1.97): las cabezas de los dos hijos de espaldas
entran por abajo. "problema" (2.87): golpe de telenovela (zoom). "cabeza" (4.67): sale del retrato un
globo de pensamiento lleno de cosas del negocio (tornillo, caja, factura, llave) . Etiqueta
"SUCESIÓN · DON HUGO" → "EL NEGOCIO: EN SU CABEZA".

### s02-vivito (0-4.29) · el testamento
El escribano de medio cuerpo sosteniendo el pergamino "TESTAMENTO". "vivito" (1.24): entra la
polaroid de Don Hugo pescando, sello dorado "VIVO". "jubilado" (1.77): sello rojo "JUBILADO".
"La Paloma" (3.54): la polaroid se agranda (mar, faro). Etiqueta "SE PROCEDE A LA LECTURA".

### s03-lo-demas (0-4.68) · y todo lo demás
Pergamino en primer plano; una pluma escribe la lista: "el local" (0.48, con un local de toldo
verde), "la clientela" (1.33, tres cabecitas), "y todo lo demás..." (2.64). "cabeza" (3.71): flecha
roja de lo demás a un perfil de Don Hugo con engranajes adentro; el escribano baja los anteojos.

### s04-stock (0-2.63) · ¿cuánto stock hay?
Primer plano de la hija indignada (zoom de telenovela). "stock" (1.69): detrás, estantería de
ferretería con cajas que tienen "?". 

### s05-cuaderno (0-5.61) · anexo I
Sello de lacre "ANEXO I" (0.0). El cuaderno viejo abierto con manchas y tachones rojos; con letra de
Don Hugo se escribe "Tornillos:" (2.0) "los de siempre," (2.97) "en el cajón de siempre." (4.08).

### s06-cajones (0-2.30) · ¡hay mil cajones!
El hijo frente a una pared de cajoncitos de ferretería; "mil" (1.07): zoom out, la pared se
multiplica, signos de pregunta.

### s07-zapatos (0-5.67) · anexo II
La hija con miedo y una carta "PROVEEDOR · ¿CUÁNTO LE DEBEMOS?". "Anexo dos" (2.10): sello "ANEXO II".
"caja de zapatos" (3.41): una caja de zapatos sobre el escritorio; "facturas" (4.89): la tapa salta y
vuelan facturas.

### s08-codigo (0-5.94) · anexo III
"el de la obra" (1.16): un cliente con casco y "PRECIO ESPECIAL ?". "código" (2.36): cláusula manuscrita
en pergamino "El código de los precios es mi fecha de cumpleaños"; "al revés" (5.08): el papel da
media vuelta y queda cabeza abajo. Sello "ANEXO III".

### s09-invierno (0-3.87) · ¿cuándo cumple papá?
Los dos hijos de frente, mirándose; calendario de taco que pasa hojas. "invierno" (2.45): copos y el
hijo se encoge de hombros. Golpe de telenovela.

### s10-corvina (0-5.53) · mensaje grabado
El sobre lacrado se rompe; Don Hugo en la costa con sombrero de pescador y caña, mar, faro, onda de
audio. "mañana no" (3.07): levanta la mano. "corvina" (4.03): salta un pez y la caña se dobla.

### s11-drama (0-3.76) · el final de capítulo
Primer plano de la hija llorando con pañuelo, zooms de telenovela. "solo funciona" (1.33): la
ferretería con Don Hugo adentro aparece en un recuadro; "con él adentro" (2.31) se ilumina solo con él.

### s12-giro (0-4.48) · el giro (Orus)
La ferretería de frente. "nada mal" (0.87): el retrato de Don Hugo con un tilde dorado. "vale" (2.17):
"sin vos" (3.65): Don Hugo sale de la ferretería caminando y las luces siguen prendidas: cartel
"ABIERTO".

### s13-sistema (0-7.43) · el sistema a medida
Una pantalla sobre el escritorio con barra verde "FERRETERÍA DON HUGO". "a medida" (1.83): una cinta
métrica dorada mide la pantalla. Módulos que aparecen: "STOCK" (3.19), "PROVEEDORES" (3.73),
"PRECIOS" (4.51), "CAJA" (4.92), cada uno con su dato sin cifras inventadas. "cualquiera" (6.42): los
dos hijos asoman contentos.

### s14-herencia (0-4.83) · la verdadera herencia
Sobre que se cierra y lacre con sello "H" (0.82, "herencia"). "¿Vieron?" (1.96): Don Hugo pescando,
celular al lado: "SIN LLAMADAS". Ríe.

### s15-cta (0-6.20) · CTA
Marco dorado de retrato vacío con una silueta y "?" (0.45 "quién"). "Don Hugo" (1.36): plaquita
"DON HUGO: ____". "Etiquetalo" (2.18): "ETIQUETALO" grande en dorado y una "@" que se escribe con
pluma en la plaquita. Queda quieto con un respiro hasta el final.
