# Reel "Te recomendaron": spec para los que construyen escenas

Reel vertical 1080x1920 POLÉMICO de Scalerics (software factory de Montevideo que hace sitios web,
bots de WhatsApp, puntos y tiendas online para comercios). Verdad incómoda: el boca a boca te
anda, te manda clientes, pero el que te recomendaron te busca en el celular, encuentra una foto
vieja, un teléfono que nadie atiende y ningún horario (o encuentra al de al lado) y no viene.
Antes alcanzaba con que te recomendaran; hoy todos te buscan antes de venir. No es caro: es tener
un lugar tuyo donde te encuentren. Producto: **Sitio web** (lo que vendés, tus horarios, cómo
llegar, claro y rápido en el celular, y un botón que lleva la consulta a tu WhatsApp). Sin
cifras, sin prometer posiciones en Google. Cierre: Comentá SITIO. Locución de 58.6 s.

Mismo estilo que los reels aprobados: `../el-de-enfrente/`, `../nadie-te-encuentra/`,
`../tarjeta-que-nadie-lee/` (locales, figuritas, celulares con UI simple, badges X, caja de marca,
CTA). Para no repetir a `nadie-te-encuentra` (lupa vacía, "0 resultados", local fantasma), acá el
recurso central es otro:

Recurso central del reel: **el hilo de la recomendación**. La recomendación es una burbuja de
diálogo verde (con una estrellita adentro) que sale de una figurita. De la burbuja sale un hilo
verde punteado que lleva al cliente hacia tu local. En el medio del camino SIEMPRE hay un celular:
cuando el celular no muestra nada serio, el hilo se corta ahí (se dibuja un tramo, se rompe con un
glitch y la mitad que sigue queda crema 0.3). Cuando hay sitio, el hilo llega entero hasta tu
mostrador (s11). Tu local: el de `../el-de-enfrente/compositions/s01-te-roba.html`, con cartel
"PANADERÍA" en s02 y "TU LOCAL" después.

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
Inicios globales y palabras de cada escena: `tiempos.md`. Duración total 61.85 (la voz termina en
58.65).

## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA.

**s01-no-te-encontraron** (3.91 s) — "Te recomendaron. Te buscaron. Y no te encontraron." Tres
tiempos en fila de izquierda a derecha, unidos por el hilo verde punteado: una figurita con la
burbuja verde con estrellita (arranca medio dibujada en 0; "recomendaron" 0.30), un celular chico
con una lupa adentro (pop en "buscaron" 1.60), y tu local a la derecha. En "encontraron" (2.70) el
hilo, que venía dibujándose, se corta al salir del celular: glitch, el tramo final queda crema
0.3 y tu local recibe el badge X. Etiquetas: "TE RECOMENDARON" → "NO TE ENCONTRARON".

**s02-anda** (4.39 s) — "Un cliente le dijo a un amigo: andá a esa panadería, es buenísima." Dos
figuritas grandes (cliente izq., amigo der.) en y≈1150. En "dijo" (0.59) sale de la boca del
cliente una burbuja crema grande con "Andá a esa panadería" (Lexend 600 34px); en "panadería"
(2.29) aparece arriba a la derecha un local chico con cartel "PANADERÍA" y un pan; en "buenísima"
(3.19) la burbuja suma "¡Es buenísima!" en verde y tres estrellitas verdes que hacen pop. El amigo
asiente (cabeza que baja y sube). Etiqueta: "EL BOCA A BOCA".

**s03-te-busca** (6.10 s) — "El amigo saca el celular y te busca. Y encuentra una foto vieja, un
teléfono que nadie atiende y ningún horario." Un celular grande (380x760, centrado, y 600–1230)
que sube desde abajo en "saca el celular" (0.40). Adentro, una barra de búsqueda que se tipea
"panadería" con cursor (te busca 1.32–1.50). En "encuentra" (2.50) aparece el resultado, de a una
fila por palabra: una foto vieja (rectángulo con montañitas, crema 0.4, torcida y con fecha
"2019") en "foto vieja" (3.00); una fila de teléfono con "llamando..." que no contesta y badge X en
"nadie atiende" (4.60); una fila "Horario: ?" con el "?" que tiembla en "ningún horario" (5.40).
Etiquetas: "TE BUSCA" → "FOTO VIEJA" → "NADIE ATIENDE" → "SIN HORARIO".

**s04-al-lado** (2.95 s) — "O peor: encuentra al de al lado." Dos locales chicos lado a lado:
tu local (izq., crema 0.4, apagado) y el de al lado (der., ventanas verdes). Arriba, el celular
chico con la burbuja de la recomendación. En "peor" (0.58) el celular se dibuja; en "al de al lado"
(1.80–2.00) el hilo verde sale del celular y se curva hacia el de al lado (no al tuyo), con flecha
y un pulso del local. Etiqueta: "ENCUENTRA AL DE AL LADO".

**s05-no-es** (4.93 s) — "No es que tu producto sea malo. Ni que te falten clientes. Ni que el
boca a boca no ande." Tres íconos en fila (como `../nadie-te-encuentra/compositions/s04-no-es.html`):
un pan/medialuna (producto 0.35), un grupo de 3 figuritas (clientes 2.35), dos burbujas de diálogo
encimadas (boca a boca 3.55); cada uno con badge X en su palabra ("malo" 0.95, "clientes" 2.35,
"ande" 4.25) y se apaga a 0.4. Etiqueta final "NADA DE ESO".

**s06-lo-perdes** (4.05 s) — "El boca a boca anda. Te manda al cliente. Y lo perdés en el celular."
EL recurso central entero: figurita con burbuja verde a la izquierda (anda 0.52: la burbuja late),
hilo punteado que se dibuja hacia la derecha y una figurita (el cliente) que camina sobre el hilo
(manda 1.22), un celular en el medio del camino y tu local a la derecha. En "perdés" (2.52) el
cliente entra al celular, el hilo se corta con glitch, la figurita se desvanece y el tramo hacia tu
local queda crema 0.3. Etiquetas: "TE MANDA AL CLIENTE" → "LO PERDÉS ACÁ" (con una flechita verde
apuntando al celular).

**s07-antes-hoy** (5.32 s) — "Antes alcanzaba con que te recomendaran. Hoy, antes de venir, todos
te buscan." Split vertical arriba/abajo con rótulos mono "ANTES" / "HOY". ANTES (y≈760): burbuja
→ hilo recto → puerta de tu local (alcanzaba 0.37–recomendaran 1.37). HOY (y≈1080): burbuja → hilo
→ celular con lupa → recién ahí la puerta ("Hoy" 2.68, "venir" 3.57). En "todos te buscan"
(4.15–4.47) aparecen 3 celularcitos más en abanico detrás del celular de HOY. Etiquetas: "ANTES:
ALCANZABA" → "HOY: TE BUSCAN".

**s08-duda** (4.45 s) — "Si te encuentran claro, vienen. Si no, dudan. Y el que duda no viene."
Izquierda: celular chico con una página clara (3 filas con tilde verde), y una figurita que camina
hasta la puerta de tu local y entra (vienen 1.38). Derecha (dudan 2.64): celular apagado con
líneas tenues, figurita quieta con un "?" verde que tiembla arriba; en "no viene" (4.08) se da
vuelta y se va. Rótulos "CLARO" / "DUDA". Etiquetas: "VIENEN" → "NO VIENE".

**s09-sistema** (6.20 s) — "No es caro ni es para empresas grandes. Es tener un sistema: un lugar
tuyo donde te encuentren." Etiqueta de precio con "$" y badge X (caro 0.80); edificio alto de
oficinas con badge X (empresas grandes 1.70–1.80); los dos se van y se dibuja el engranaje que gira
(sistema 3.40); en "un lugar tuyo" (4.39–4.80) el engranaje se achica a un costado y aparece una
ventana de navegador con tu local adentro y un pin verde que cae encima ("donde te encuentren"
5.70). Etiquetas: "NO ES CARO" → "ES UN SISTEMA" → "UN LUGAR TUYO".

**s10-scalerics** (8.33 s) — "En Scalerics hacemos sitios web para comercios. Con lo que vendés,
tus horarios y cómo llegar, claro y rápido en el celular." Arriba (y≈660) caja redondeada con
"Scalerics" (Lexend 700 ~56px) que se dibuja en "Scalerics" (0.70); debajo "SITIOS WEB PARA
COMERCIOS" mono en "sitios web" (1.70). Abajo un celular con el sitio (y 760–1220) que se arma por
filas: "Lo que vendés" con tres panes (3.70), "Horarios" con reloj y "Abierto" verde (4.50), "Cómo
llegar" con pin (5.60). En "claro y rápido" (6.38–6.80) un rayito verde y un tilde. Sin
etiqueta central.

**s11-boton** (5.99 s) — "Y un botón que lleva la consulta a tu WhatsApp. Así, cada recomendación
termina en tu mostrador." El celular del sitio con un botón verde "Escribinos" (pop en "botón"
0.17, se presiona en "lleva" 0.67); una burbuja de consulta "¿Tenés para hoy?" vuela a un segundo
celular chico con chat (WhatsApp 1.67). En "Así, cada recomendación" (2.48–3.47) todo se reacomoda
y vuelve el recurso central completo: burbuja verde → hilo → celular con el sitio → tu mostrador
(un mostrador con caja y una figurita que llega), y esta vez el hilo llega entero y verde
(termina 3.77, mostrador 4.87: tilde verde y pulso). Etiquetas: "DIRECTO A TU WHATSAPP" →
"TERMINA EN TU MOSTRADOR".

**s12-cta** (5.23 s) — "Comentá SITIO y te contamos cómo." Como
`../nadie-te-encuentra/compositions/s12-cta.html`: "Scalerics" grande, bajada "Sitios web para
comercios", píldora crema con texto navy: Comentá "SITIO", pop en "Comentá" y pulsos suaves finitos.
Sin salida con blur: el último cuadro queda quieto y legible.
