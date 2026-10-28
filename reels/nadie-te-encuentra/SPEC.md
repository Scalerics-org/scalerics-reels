# Reel "Nadie te encuentra": spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace sitios web,
bots de WhatsApp, puntos y tiendas online para comercios). Le dice al dueño de un comercio una
verdad incómoda: "si tu negocio no aparece en Google, para el que busca no existe". El cliente
agarra el celular, escribe "pizzería abierta cerca" y elige entre lo que le aparece. No es que
seas peor, ni que estés lejos, ni que seas caro: es que no te encontró. El de la otra cuadra
tiene su página con horario, dónde queda, qué vende y un botón de WhatsApp; vos, un Instagram que
no dice ni a qué hora abrís. Producto: **Sitio web** (Scalerics hace sitios para comercios). No
se prometen posiciones en Google ni cifras. Cierre: Comentá WEB. Locución de 49.6 s.

Mismo estilo que los reels aprobados: `../el-de-enfrente/`, `../bot-whatsapp/`,
`../puntos-que-vuelven/` y `../descuentos/` (locales, figuritas, celulares con UI simple, badges X,
caja de marca, CTA).

Recurso central del reel: **la pantalla de búsqueda del celular y "tu local fantasma"**. Lo que
aparece en la búsqueda se dibuja en crema con acentos verdes (punto "ABIERTO", botones). Tu local,
cuando no aparece, es un fantasma: el mismo dibujo en crema 0.2-0.35, sin verde, con el badge X.
El de la otra cuadra ("ÉL") tiene su página: celular con UI clara y botón verde. Vos: celular
apagado (crema 0.45) con un perfil de Instagram genérico (grilla de cuadrados, sin logo).
Al final, con Scalerics, tu local pasa a tener SU sitio, prendido y con verde.

Movimiento seco: entradas con golpe (power3.out / back.out), cambios EN la palabra.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo navy casi negro con brillo verde suave centrado en
  y≈900, la locución, el logo de Scalerics abajo (y 1746–1786) y los efectos de sonido.
- `compositions/subtitulos.html`: el texto narrado aparece palabra por palabra arriba a la
  izquierda (x 72, y 236 a ~500, Lexend 600 52px). **Las escenas NO escriben la frase narrada.**
- `compositions/s01-no-existe.html`: **la escena modelo. Leela entera y copiá su estructura,
  clases, helper `dibujar()` y tono visual.** Define el local (reusalo) y el badge X.

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


## Tiempos
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 52.81 (la voz termina en
49.61).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Seguí la idea, pero si se te ocurre
una forma mejor de ilustrar el beat en este lenguaje, usala.

**s01-no-existe** (3.30 s) — "Si tu negocio no aparece en Google, para el que busca no existe."
Tu local grande (el local de `../el-de-enfrente/compositions/s01-te-roba.html` a escala 1.45,
centrado, suelo y≈1110) arranca a medio dibujar con las vidrieras verdes y el cartel "TU LOCAL".
En "aparece" (0.90) entra una lupa grande (círculo r≈95 + mango) desde la izquierda y barre el
local de izquierda a derecha hasta "busca" (2.40), como si buscara y no lo viera. En "no existe"
(2.70–2.90) el local se apaga a fantasma (opacity 0.2, vidrieras apagadas) y salta el badge X
verde arriba a la derecha del local. Etiquetas: "NO APARECE" (0.9) → "NO EXISTE" (2.9).

**s02-busca** (5.50 s) — "Tu próximo cliente no pregunta en el barrio. Agarra el celular y
escribe: pizzería abierta cerca." Primera mitad (0–2.9): una figurita (el cliente) en x≈400 que
aparece en "cliente" (1.10) y un vecino en x≈680; en "pregunta" (1.70) sale de la figurita una
burbuja de línea con "?" hacia el vecino; en "barrio" (2.40) una línea verde la tacha y salta el
badge X. Etiqueta "NO PREGUNTA". Segunda mitad: en "Agarra el celular" (2.96–3.40) se va todo y se
dibuja un celular grande centrado (x 310–770, y 600–1230) con barra de búsqueda (lupa + texto) y
un teclado de líneas abajo. En "escribe" (3.90) aparece el cursor verde, y el texto de la barra
se escribe por palabras: "pizzería" (4.20), "abierta" (4.80), "cerca" (5.40), con teclas que se
iluminan al tipear. Etiqueta "BUSCA EN EL CELULAR".

**s03-elige** (3.53 s) — "Y elige entre lo que le aparece. Y vos no estás." El mismo celular
(misma posición que el final de s02, con "pizzería abierta cerca" en la barra) muestra 3
resultados que caen uno tras otro (0.2–1.5): tarjeta con ícono de local, nombre (Pizza Centro,
Don Mario, La Napolitana) y "ABIERTO" con punto verde. En "elige" (0.70) un anillo verde de toque
marca uno. En "vos no estás" (2.33–2.60) aparece un cuarto lugar fantasma "Tu local" (crema
0.25, sin verde) que salta con el badge X. Etiquetas: "ELIGE ENTRE ESTOS" → "VOS NO ESTÁS".

**s04-no-es** (5.16 s) — "No es que tu pizza sea peor. Ni que estés lejos. Ni que seas caro. Es
que no te encontró." Tres íconos en fila (y≈860): una pizza (pizza 0.27, X en "peor" 0.87), un
pin de mapa con una línea punteada de distancia ("lejos" 1.97), una etiqueta de precio con "$"
("caro" 3.07), cada uno con su badge X (como `../el-de-enfrente/compositions/s03-por-que.html`).
En "no te encontró" (3.87–4.07) los íconos se van y cae una lupa grande al centro que barre
vacía; debajo "0 RESULTADOS" mono verde. Etiquetas: "NADA DE ESO" (3.2) → "NO TE ENCONTRÓ"
(4.07).

**s05-su-pagina** (5.89 s) — "El de la otra cuadra tiene su página: el horario, dónde queda, qué
vende y un botón de WhatsApp." Un celular centrado (rótulo mono verde "ÉL" arriba) con la página
del otro: cabecera con ícono de local y "Don Mario" (página 1.31). Filas que aparecen en su
palabra: reloj + "Abierto hasta las 00" (horario 2.11), pin + "Cómo llegar" con mapita de líneas
(queda 3.01), pizza + "Menú y precios" (vende 3.71), y un botón verde de borde con burbuja +
"Escribinos" que entra con golpe en "botón" (4.51) y late en "WhatsApp" (4.91). Etiquetas:
"TIENE SU PÁGINA" → "TODO A LA VISTA" (4.5).

**s06-instagram** (4.70 s) — "Vos tenés un Instagram que no dice ni a qué hora abrís. Y el cliente
no va a adivinar." Tu celular, apagado (crema 0.45, rótulo "VOS"): perfil genérico con avatar
circular, "tu_local", y una grilla de 3x3 cuadrados que se dibuja en "Instagram" (0.82). En "no
dice" (1.42) las líneas de la bio quedan vacías con un tachón; en "qué hora" (2.02–2.12) entra
una burbuja crema "¿A qué hora abren?" sin respuesta (solo el doble tilde gris). En "no va a
adivinar" (3.52–3.72) saltan tres "?" verdes alrededor del celular. Etiquetas: "SIN HORARIO" →
"NO VA A ADIVINAR".

**s07-al-otro** (1.92 s) — "Se va al otro, que le saca la duda al toque." Dos locales chicos:
el tuyo a la izquierda (fantasma, 0.3) y el de él a la derecha (prendido, vidrieras verdes); la
figurita cruza de izquierda a derecha en "se va al otro" (0–0.6). En "saca la duda" (0.92–1.32)
sobre el local de él salta una burbuja verde "Abierto hasta las 00" y en "toque" (1.62) un tilde
verde con golpe. Etiqueta "SE VA AL OTRO".

**s08-no-es-caro** (2.72 s) — "No es caro ni es cosa de empresas grandes." Una etiqueta de precio
"$$$" a la izquierda (caro 0.70, X en 0.95) y un edificio alto de oficinas con ventanitas a la
derecha (empresas 1.50, X en "grandes" 1.90). Etiquetas: "NO ES CARO" → "NI DE EMPRESAS GRANDES".

**s09-lugar-propio** (2.08 s) — "Es tener tu lugar propio, que trabaje por vos." Una ventana de
navegador (rect redondeado con 3 puntitos y barra de dirección) se dibuja en "tener" (0.08);
adentro tu local, ahora prendido con vidrieras verdes, en "lugar propio" (0.48–0.68). En
"trabaje" (1.38) un engranaje verde chico al lado gira con golpe. Etiqueta "TU LUGAR PROPIO".

**s10-scalerics** (6.70 s) — "En Scalerics hacemos sitios web para comercios. Claros, rápidos y
hechos para verse bien en el celular." Arriba (y≈680) una caja redondeada que se dibuja con
"Scalerics" (Lexend 700 ~60px, crema) en "Scalerics" (0.70), y debajo "SITIOS WEB PARA COMERCIOS"
mono en "sitios web" (1.80). Debajo, una laptop con un sitio de líneas (cabecera, foto como
rectángulo con montañita, renglones, botón verde) que se dibuja en "sitios" (1.80). En "Claros"
(3.35) los renglones se ordenan con un tilde verde; en "rápidos" (3.97) un rayo verde y líneas de
velocidad; en "celular" (5.00–5.90) la laptop se corre a la izquierda y aparece un celular a la
derecha con el mismo sitio apilado. Etiquetas: "CLAROS" → "RÁPIDOS" → "PARA EL CELULAR".

**s11-tu-sitio** (6.34 s) — "Con tus horarios, cómo llegar, lo que ofrecés, y un botón que te
trae las consultas directo a tu WhatsApp." Dos celulares: a la izquierda TU sitio, prendido
(cabecera "Tu local"): filas reloj "Horarios" (0.30), pin "Cómo llegar" (1.20), lista "Lo que
ofrecés" (2.20), botón verde "Escribinos" (botón 3.20). En "trae las consultas" (3.70–4.10)
salen burbujitas verdes del botón y vuelan al celular de la derecha (tu WhatsApp) donde entran
3 mensajes crema: "¿Tienen para hoy?", "¿Hacen envíos?", "¿Hasta qué hora?" (4.10, 4.60, 5.20)
con un punto verde de aviso en "WhatsApp" (5.30). Etiquetas: "TU SITIO" → "CONSULTAS A TU
WHATSAPP".

**s12-cta** (4.97 s) — "Comentá WEB y te contamos cómo." (la voz termina en 1.26). El cierre
como `../el-de-enfrente/compositions/s11-cta.html`: "Scalerics" grande (Lexend 700 110px, crema)
centrado en y≈860, debajo "Sitios web para comercios" (Lexend 500 34px, crema 0.7), y la píldora
crema con texto navy #0B1D35: Comentá "WEB", que entra con pop en "Comentá", golpe en "WEB" (0.36)
y pulsos suaves cada ~1.2 s (tweens finitos). Sin salida con blur: el último cuadro queda quieto.
