# Reel "El de enfrente" — spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace bots de
WhatsApp, apps de puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "el de enfrente te está robando clientes" y no es la crisis: contesta rápido,
conoce a sus clientes y vende por internet. Locución de 52 s, ritmo rápido. Mismo estilo que los
reels ya aprobados: `../puntos-que-vuelven/`, `../bot-whatsapp/` y `../descuentos/` (mirá sus
escenas en `compositions/`: locales, figuritas, celulares con chat, badges X, splits, monedas,
engranaje, caja de marca y CTA) y la referencia (`../../referencias/puntos-ig/hoja1.png`,
`hoja2.png`, `hoja3.png`).

Recurso central del reel: **"él" contra "vos"**. Él es el de enfrente: se dibuja en crema con
acentos verdes (luces prendidas, tildes, respuestas). Vos es tu local: lo mismo pero apagado
(crema 0.4) y sin verde. Cuando una escena compara, él va a la DERECHA y vos a la IZQUIERDA,
como en s01, con rótulos mono chicos "ÉL" / "VOS" si hace falta.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-te-roba.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define los dos locales (TU LOCAL / ENFRENTE), las
  figuritas que caminan y el ojo: reusalos.

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
- Todo selector CSS con prefijo `[data-composition-id="<id>"]`; clases e ids con prefijo de la
  escena (`s05-...`). Un contenedor `.clip` de la escena con data-start 0 y data-duration = dur.
- Determinista: nada de Math.random, Date, timers, `repeat: -1`. No animar letterSpacing, width,
  height, left, top: solo transforms, opacity, filter, strokeDashoffset.
- Además escribí `compositions/<id>.sfx.json`: 3 a 8 golpes de sonido en segundos relativos a la
  escena, `[{"t":0.4,"sfx":"pop","vol":0.3}]`. Nombres: chime, click, click-soft, error,
  glitch-1, impact-bass-1, key-press, notification, ping, pop, riser, sparkle, typing, whoosh,
  whoosh-short. Volumen 0.2–0.45; `"max": 0.6` recorta los largos. Sin whoosh de transición (lo
  pone armar.mjs).
- Verificá: `node armar.mjs` (desde la carpeta del proyecto) y
  `npx hyperframes snapshot --at <tiempos globales> --no-end` en 3–5 momentos de tu escena; MIRÁ
  los PNG y corregí lo que choque, quede cortado, vacío o chico. Después
  `npx hyperframes check --json` sin errores en tus archivos. Los tiempos globales = inicio de la
  escena + relativo (inicios abajo).

## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 55.50 (la voz termina en
52.17).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s02-mismo** (4.40 s) — "Mismo barrio, mismos precios, misma crisis. Y vende más que vos." Los
dos locales chicos lado a lado (vos izq., él der.) y entre ellos tres filas que aparecen en su
palabra: un cartel de calle "BARRIO" (barrio 0.24), dos etiquetas "$ 290" iguales (precios 1.16),
y un gráfico chiquito en baja igual en los dos (crisis 2.24), cada fila con un "=" verde al
medio. En "vende más" (3.12) todo eso se va y aparecen dos barras: la tuya baja, la de él crece
alta en verde con punch. Etiquetas: "TODO IGUAL" → "VENDE MÁS QUE VOS".

**s03-por-que** (3.70 s) — "¿Por qué? No es suerte. Ni el local. Ni la plata." Un "?" grande en
"Por qué". Después tres íconos en fila: trébol (suerte 1.14), local (local 2.06), bolsa de plata
con "$" (plata 2.92), cada uno con su badge X verde al aparecer (como
`../bot-whatsapp/compositions/s02-no-es.html`). Etiqueta final "NADA DE ESO".

**s04-contesta** (4.70 s) — "Es que él contesta el WhatsApp en dos minutos, y vos al otro día."
Dos celulares chicos con chat (como `../bot-whatsapp/compositions/s01-domingo.html`), vos izq.,
él der., los dos con la burbuja crema del cliente "¿Tienen stock?". En "contesta" (0.58) al de
él le llega la respuesta verde "¡Sí! ¿Te lo guardo?" y arriba "2 MIN" verde (dos minutos 1.80).
En "vos al otro día" (2.82–3.84) el tuyo muestra solo el doble tilde, y arriba un calendario
chico que pasa de hoja con "AL OTRO DÍA"; tu celular se apaga a 0.4. Rótulos "VOS" / "ÉL".
Etiqueta "2 MINUTOS VS. 1 DÍA".

**s05-sabe** (6.02 s) — "Él sabe quiénes son sus clientes y les escribe. Vos no tenés ni el
teléfono de los que ya vinieron." Primero él (0–3.0): una lista de 4 clientes con círculo de
iniciales y nombre (Lucía M., Martín R., Sofía P., Diego A.) que aparecen en "quiénes son"
(0.56); en "les escribe" (2.24) de la lista salen 3 sobres/burbujas verdes volando hacia afuera.
Etiqueta "SABE QUIÉNES SON". Después vos (3.08–6.0): la lista se reemplaza por una libreta o
agenda vacía con "0 CONTACTOS" y figuritas que salen de tu local sin dejar nada (en "ya
vinieron" 4.94). Etiqueta "NI EL TELÉFONO".

**s06-internet** (4.44 s) — "Él vende por internet mientras duerme. Vos dependés de que alguien
pase por la puerta." Él (0–2.3): una casa de noche con luna y "Zzz" chicos, y al lado una laptop
o celular con una tienda online donde caen notificaciones verdes "+1 pedido" una tras otra
("internet" 0.62, "duerme" 1.50). Vos (2.36–4.4): tu local con la puerta abierta y vos parado
en la puerta, mirando una calle vacía; un relojito que avanza; en "pase por la puerta" (3.50)
pasa UNA figurita de largo sin entrar. Etiquetas: "VENDE DORMIDO" → "ESPERÁS EN LA PUERTA".

**s07-excusa** (5.02 s) — "Y le echás la culpa a la crisis, porque es la excusa perfecta: no te
pide cambiar nada." Un diario de líneas con el titular "CRISIS" grande (crisis 1.42) y una mano
o flecha que lo señala (echás la culpa). En "excusa perfecta" (2.22–2.64) el diario se dobla y
se convierte en un cartel/escudo detrás del cual se esconde una figurita (vos). En "no te pide
cambiar nada" (3.34–4.20) aparece una lista de checks "CAMBIOS" con 3 casillas vacías que quedan
sin tildar, y un "0" verde. Etiquetas: "LA CULPA ES DE LA CRISIS" → "LA EXCUSA PERFECTA".

**s08-se-fue** (4.56 s) — "Pero tu cliente no se fue por la crisis. Se fue al que lo atendió
mejor." Una figurita (tu cliente) al lado de tu local. En "no se fue por la crisis" (0.86–1.86)
un cartel chico "CRISIS" que aparece con un badge X verde. En "Se fue al que lo atendió mejor"
(2.50–3.58) la figurita cruza al local de enfrente (como s01) y allá aparecen 3-5 estrellitas de
línea verdes o un corazón, con punch en "mejor". Etiquetas: "NO FUE LA CRISIS" → "LO ATENDIERON
MEJOR".

**s09-sistema** (3.72 s) — "Lo bueno es que nada de eso es caro. Es tener un sistema." Una
etiqueta de precio chica con "$" (como la de `../descuentos/compositions/s01-caro.html`) que en
"caro" (1.38) recibe el badge X; en "sistema" (2.72) se transforma en el engranaje que se dibuja
y gira con punch (como `../puntos-que-vuelven/compositions/s07-sistema.html`). Etiquetas: "NO ES
CARO" → "ES UN SISTEMA".

**s10-scalerics** (8.02 s) — "En Scalerics armamos eso para comercios: el bot que contesta, los
puntos que hacen volver, y la tienda que vende sola." Arriba (y≈680) una caja redondeada que se
dibuja con "Scalerics" (Lexend 700 ~60px, crema) en "Scalerics" (0.24), y debajo "PARA
COMERCIOS" mono en "comercios" (1.82). De la caja baja un árbol a tres ramas (como
`../puntos-que-vuelven/compositions/s09-como-anda.html`), cada una en su palabra: un celular con
burbuja verde (BOT, en "bot" 2.92), una tarjeta con "+120" verde (PUNTOS, en "puntos" 4.40), una
bolsa de compras con un tilde verde (TIENDA, en "tienda" 6.08). Cada ícono hace un pequeño gesto
cuando se nombra su función ("contesta" 3.46: la burbuja late; "volver" 5.06: aparece la flecha
circular; "vende sola" 6.62: caen 2 monedas). Rótulos mono debajo de cada ícono. Sin etiqueta
central.

**s11-cta** (5.86 s) — "Comentá CLIENTES y te contamos por dónde empezar." (la voz termina en
2.53). El cierre como `../puntos-que-vuelven/compositions/s12-cta.html`: "Scalerics" grande
(Lexend 700 ~110px, crema) centrado en y≈860, debajo "Bots · Puntos · Tiendas para comercios"
(Lexend 500 34px, crema 0.7), y la píldora crema con texto navy #0B1D35: Comentá "CLIENTES", que
entra con pop en "Comentá" y hace un pulso suave cada ~1.2 s (tweens finitos, no repeat -1). NO
hagas la salida con blur: es el último cuadro, tiene que quedar quieto y legible al final.
