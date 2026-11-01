# Reel "Avistamiento": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). PROGRAMA DE MISTERIOS DE LA
TELE DE MADRUGADA (inventado: "Fenómenos del Más Acá"; "Expedientes X" y "la verdad está ahí
afuera" solo nombrados, nada de la serie). Vende UNA cosa: el AGENTE DE IA que atiende el WhatsApp
del local a cualquier hora con sus precios y su stock, toma el pedido y le pasa al dueño lo que es
para él.

Historia: el conductor (voz grave y misteriosa) presenta el caso: "Un comercio uruguayo contestó un
WhatsApp un domingo a las once de la noche. La ciencia no lo puede explicar." Nilda, vecina de La
Blanqueada (inventada), jura que le contestaron al instante, con precio y stock, y le tomaron el
pedido. El experto escéptico: "En Uruguay eso no pasa. Un domingo a esa hora no contesta ni el
sereno." La hija: "En el grupo de la familia ya creen que estás loca." Otro "avistamiento" en
Maroñas: al final era el sobrino ("y el lunes me dejó en visto"). "La verdad está ahí afuera, como
en Expedientes X." GIRO (entra Orus, la cámara enfoca): el platillo volador era un GLOBITO DE
WHATSAPP. "No fue un fenómeno. Ese local tiene un agente de IA." Nilda: "¡Yo les dije!" El experto,
bajito: "¿Y eso lo puede tener mi local?" Orus: "Lo raro no es que te contesten: lo raro es que tu
local todavía no. En Scalerics te lo armamos." CTA: "¿A vos te contestó alguno a esa hora? Contalo
en los comentarios."

Seis voces: conductor (Algenib), Nilda (Gacrux), experto (Charon), hija (Leda), testigo de Maroñas
(Fenrir), narrador Scalerics (Orus, desde s10). Voz de 72.27 s; reel de 75.47 s.

## RECURSO VISUAL CENTRAL: el PLATILLO VOLADOR que resulta ser un GLOBITO DE WHATSAPP
En s01 y s09 hay un platillo volador dibujado (cúpula, disco con luces, haz de luz) sobre los
techos de La Blanqueada, visto por una cámara nocturna con retícula. En s10, el zoom de la cámara
lo ENFOCA: el platillo se da vuelta y es un globito de chat con su colita y tres renglones, y el
haz de luz era la pantalla del celular. Es el remate visual del reel.

## ESTILO: CÁMARA NOCTURNA DE PROGRAMA DE MISTERIOS (TV de madrugada)
Todo es "material de archivo" filmado con cámara nocturna: dibujos de líneas VERDE FÓSFORO que se
dibujan solos, rellenos verde oscuro, y lo que brilla (ojos de los personajes, luces del platillo,
pantallas) en blanco quemado. Siluetas genéricas dibujadas (nada de caras reales). El programa
pone su marca en ÁMBAR (como un zócalo de TV vieja): el logo "FENÓMENOS DEL MÁS ACÁ" chico arriba
a la derecha, los zócalos de nombre ("NILDA · VECINA · LA BLANQUEADA") y los sellos del caso
("CASO 0347", "SIN EXPLICACIÓN", "IDENTIFICADO"). El rojo es solo el punto de REC y algún sello de
"IMPOSIBLE". El ambiente (`compositions/ambiente.html`) ya pone: grano que titila, líneas de
barrido, viñeta de tubo de TV con esquinas redondeadas, retícula de cámara (esquinas + cruz chica
en el centro), REC, "CAM NOCTURNA", contador de cinta, el logo del programa, y una interferencia
en los momentos fuertes. Las escenas NO repiten nada de eso.

Diferencia con `actividad-paranormal` (cámara de seguridad, 30-10): acá es un PROGRAMA DE TV
(marca ámbar, zócalos de testigo, sellos de expediente, platillo volador), no una cámara de
seguridad de un local; y en el giro NO se prende la luz: la cámara ENFOCA (s10 hace un "enfoque"
de blur a nítido) y el ambiente pasa de "CAM NOCTURNA" a "CASO RESUELTO".

## Paleta (SOLO estos colores, y sus opacidades)
- Negro verdoso `#020806`: fondo (lo pone index) y relleno de lo que tapa.
- Verde oscuro `#0c2416`: rellenos de siluetas, platillo, celulares.
- Verde fósforo `#7dff8a`: TODAS las líneas (stroke 5, round), textos de cámara.
- Blanco quemado `#eaffe8`: brillos (ojos, luces del platillo, pantallas, haz), textos grandes.
- Ámbar `#ffb23e`: la marca del programa (zócalos, sellos de caso, logo) y el acento de los
  subtítulos. Un acento por cosa, no lo uses para dibujos enteros.
- Rojo `#ff4b3a`: solo sellos de "IMPOSIBLE" / tachado y el REC.
Se permite un glow suave (`filter: drop-shadow(0 0 10px rgba(125,255,138,.5))`) en lo verde y
blanco: es la cámara nocturna. Nada de degradés de colores fuera de la paleta.

## Tipografías
- Lexend 800/900 en mayúsculas para palabras gigantes (sellos de caso, "¡YO LES DIJE!").
- IBM Plex Mono 500/600 para todo lo de cámara y expediente (zócalos, etiquetas, fechas).
- Lexend 600 para UI de chat.

## Cambios contra SPEC-base (mandan sobre lo de abajo)
- Colores: los de la paleta de arriba en vez de crema/verde `#5ce611`.
- Etiqueta mono de cada escena: en ÁMBAR `#ffb23e`, IBM Plex Mono 500 28px, letter-spacing 0.3em,
  top 1268 (como siempre), 1 a 4 palabras, como zócalo de expediente.
- Glow suave permitido (ver paleta).
- Zona de dibujo igual: y 600-1330. Arriba de 580 están los subtítulos; el logo del programa del
  ambiente está arriba a la derecha (y 120-200), y el REC arriba a la izquierda: no dibujar ahí.

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


## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

### s01-platillo (8.25 s) · "Un comercio uruguayo contestó un WhatsApp un domingo a las once de la noche. La ciencia no lo puede explicar."
Cuadro 0 a medio dibujar: línea de techos de La Blanqueada (casas bajas, un tanque de agua, una
antena, cables de luz) en y 1100-1330, y un cielo con estrellitas (puntos blancos chicos). Arriba,
EL PLATILLO (centrado x 540, y ~780): cúpula con ventanitas blancas, disco ancho con 5 luces que
titilan en secuencia; flota (sube y baja suave). En "contestó" (1.65) se prende el HAZ de luz
blanco quemado (trapecio, opacity 0.25) del platillo hacia una casa con toldo (el local: cartel
"ALMACÉN" chico). En "domingo" (3.27) y "once" (3.94): sello ámbar "DOM · 23:00" que golpea abajo
a la derecha. En "ciencia" (5.48): la cámara hace zoom digital (scale 1→1.15 sobre el platillo) y
aparece sello ámbar grande "CASO 0347" y después en "explicar" (7.02) "SIN EXPLICACIÓN" en rojo
torcido. Etiqueta: "MATERIAL DE ARCHIVO" → "CASO 0347".

### s02-programa (3.53 s) · "Esto es Fenómenos del Más Acá."
Placa de apertura del programa: el título en dos líneas, "FENÓMENOS" (Lexend 900, ~150px, blanco
quemado con glow) y "DEL MÁS ACÁ" (ámbar, ~110px), centrado en y 760-1000, que entra letra por
letra con temblor de señal (x jitter). Detrás, una espiral/remolino de líneas fósforo que gira
lento (círculos concéntricos punteados) y un platillo chiquito que cruza en diagonal. Abajo
(y ~1120-1300) la silueta del conductor: torso con piloto de cuello levantado, sombra, sin cara
(solo dos puntos blancos de ojos que brillan), de pie junto a una lámpara. Etiqueta: "TRANSMISIÓN 03:12".

### s03-nilda (4.01 s) · "Nilda, de La Blanqueada, jura que lo vio."
Nilda en silueta de entrevista (plano medio, x 540, y 640-1260): rulos (círculos), lentes grandes
que brillan blanco, bata con botones, una mano levantada jurando (en "jura" 1.98 la mano sube).
Atrás, una ventana con cortina y una planta. Zócalo ÁMBAR de TV en y ~1150: barra ámbar con texto
negro verdoso "NILDA · VECINA DE LA BLANQUEADA" (Plex Mono 600 32px) que entra en "Nilda" (0) desde
la izquierda; debajo una línea chica "TESTIGO" que entra en "Blanqueada" (0.99). En "vio" (2.82),
un pixelado/mosaico de identidad NO (es testigo que da la cara): en cambio los lentes destellan.
Etiqueta: "TESTIMONIO 1".

### s04-celular (6.78 s) · "¡Le escribí al local y me contestó al instante! Con el precio, el stock, ¡y me tomó el pedido!"
Celular grande (380x760, x 350-730, y 600-1330, borde fósforo, pantalla verde oscuro). Arriba de
la pantalla: "Almacén La Esquina" y "en línea" (blanco). Hora del celu "DOM 23:04". En "escribí"
(0.11) aparece el globito de Nilda (derecha, blanco quemado con texto negro verdoso): "¿tienen
yerba de 1 kg?". En "contestó" (1.51) llega la respuesta (izquierda, verde fósforo con texto negro
verdoso) con un destello y el sello "AL INSTANTE" ámbar: "¡Hola Nilda! Sí, tenemos". En "precio"
(3.41) un renglón "Yerba 1 kg: $ 289" (precio de ejemplo de UI, no es una estadística). En "stock" (4.30)
"Stock: quedan 6". En "pedido" (5.41) aparece la tarjetita "PEDIDO TOMADO ✓" (el tilde dibujado,
no carácter) y el celular vibra. Etiqueta: "PRUEBA 1: EL CHAT".

### s05-experto (5.34 s) · "Imposible, señora. En Uruguay eso no pasa. Un domingo a esa hora no contesta ni el sereno."
El experto escéptico: silueta de plano medio (x 540, y 650-1200) con lentes, moño, birrete NO;
un libro abierto. Zócalo ámbar "DR. ESCÉPTICO · EXPERTO" en "Imposible" (0). Sello ROJO
"IMPOSIBLE" que golpea en diagonal encima en 0.1. En "Uruguay" (1.43) aparece un mapita chico de
Uruguay (contorno simplificado) a su lado con un "NO" rojo. En "sereno" (4.38): al costado
derecho, un sereno dibujado sentado en una silla con gorra y linterna, dormido, con "z z z" que
suben. Etiqueta: "LA CIENCIA OPINA".

### s06-grupo (4.93 s) · "Mamá, pará. En el grupo de la familia ya creen que estás loca."
Chat del grupo "FAMILIA" (celular a pantalla, x 300-780, y 600-1330). En "Mamá" (0) entra el
mensaje de la hija (Lucía): "Mamá, pará". En "grupo" (1.70) aparecen en ráfaga: "Tío Raúl: jajaja",
"Primo: otra vez con el platillo", "Raúl: mamá ya está grande" (renglones cortos). En "loca" (3.60)
un sticker dibujado de una cara con espiral en los ojos (líneas fósforo) y el contador "3 personas
escribiendo...". Etiqueta: "LA FAMILIA NO LE CREE".

### s07-maronas (5.60 s) · "No es el primer avistamiento. En Maroñas le contestaron a uno un sábado."
Pizarra de expediente / mapa: contorno de un mapa de calles de Montevideo con dos pines ámbar
("LA BLANQUEADA" ya marcado, y en "Maroñas" (2.28) cae un pin nuevo "MAROÑAS") unidos por un hilo
rojo que se dibuja. En "avistamiento" (0.84) sello ámbar "AVISTAMIENTO N° 2". En "sábado" (4.59)
una foto polaroid borrosa (blur 6px) de una silueta con un celular aparece clavada. Etiqueta:
"OTROS CASOS".

### s08-sobrino (3.35 s) · "Al final era el sobrino. Y el lunes me dejó en visto."
La foto borrosa de s07 se enfoca (blur 6→0) en "sobrino" (0.60): un muchacho con gorrita y
auriculares con el celular, sello ámbar "IDENTIFICADO: EL SOBRINO". En "visto" (2.30) un globito
con doble tilde gris (dibujado) y el texto "Visto · lunes 9:12" y el sello rojo se tuerce.
Etiqueta: "FALSA ALARMA".

### s09-verdad (5.40 s) · "La verdad está ahí afuera, como en Expedientes X."
Vuelve el cielo de La Blanqueada de s01 pero más cerca: el local con su toldo y el PLATILLO
encima, enorme (ancho ~640). En "verdad" (0.20) el haz baja. En "afuera" (1.60) la retícula de
cámara (dibujada por la escena, un cuadro de enfoque de esquinas ámbar) se cierra sobre el
platillo. En "Expedientes" (3.30) texto de máquina de escribir ámbar en y ~1280: "LA VERDAD ESTÁ
AHÍ AFUERA" (letra por letra). Etiqueta no hace falta (el texto ocupa ese lugar).

### s10-globito (3.70 s) · "No fue un fenómeno. Ese local tiene un agente de IA." (entra Orus)
EL GIRO. Cuadro 0: el platillo de s09 en el cuadro de enfoque, borroso. En "No fue" (0.0) el
enfoque gira (blur 10→0, scale 1.2→1): el platillo se transforma (cross-fade + escala Y) en un
GLOBITO DE WHATSAPP grande (x 200-880, y 700-1050, verde fósforo de relleno verde oscuro, colita
abajo a la izquierda) con tres renglones: "¡Hola Nilda!", "Sí, tenemos.", "¿Te lo separo?". Las 5
luces del disco quedan como los "..." del escribiendo y después el doble tilde. En "agente"
(2.29) debajo aparece una tarjetita ámbar "AGENTE DE IA · EN LÍNEA 24 H". Etiqueta: "CASO
RESUELTO".

### s11-agente (7.16 s) · "Atiende el WhatsApp a cualquier hora con sus precios y su stock, toma el pedido y le pasa al dueño lo que es para él."
Un reloj de pared grande (x 540, y 820) cuyas agujas giran rápido (horas pasando: "cualquier hora"
1.02) y alrededor, entrando en órbita, 4 chips/tarjetitas: "PRECIOS" (2.31), "STOCK" (3.15),
"PEDIDO ✓" (4.26) y en "dueño" (5.46) una flecha que sale hacia un dueño dibujado (abajo derecha,
silueta durmiendo en una cama con almohada) con un globito "Para vos: un pedido grande" que se
le deposita al lado. Etiqueta: "QUÉ HACE" → "TE PASA LO TUYO".

### s12-yo-les-dije (4.51 s) · "¡Yo les dije!" · "¿Y eso lo puede tener mi local?"
Pantalla partida en dos (dos cuadros de testigo): arriba Nilda (de s03) saltando con los brazos
arriba y el texto gigante ámbar "¡YO LES DIJE!" en 0.30; abajo, en "¿Y eso" (1.89) el experto (de
s05) se achica, se saca los lentes, y aparece un globito chico "¿y para mi local?" (Plex Mono).
Los zócalos ámbar de cada uno: "NILDA · TENÍA RAZÓN" y "DR. ESCÉPTICO · INTERESADO". Etiqueta no.

### s13-lo-raro (6.14 s) · "Lo raro no es que te contesten: lo raro es que tu local todavía no. En Scalerics te lo armamos."
Un radar/osciloscopio fósforo (círculo con barrido que gira) centrado. En "raro" (0.19) texto
"LO RARO" blanco. En "tu local" (2.47) aparece en el radar un puntito (TU LOCAL) apagado con el
rótulo "SIN SEÑAL" que titila en rojo; en "todavía no" (2.85) sello ámbar "TODAVÍA NO". En
"Scalerics" (4.19) el punto se prende (blanco quemado) y emite ondas, y abajo el wordmark de texto
"SCALERICS" (Lexend 800, blanco quemado) con la etiqueta "TE LO ARMAMOS".

### s14-cta (6.77 s) · "¿A vos te contestó alguno a esa hora? Contalo en los comentarios."
Placa final del programa: "¿A VOS TE CONTESTÓ" (blanco) / "ALGUNO" (ámbar gigante) / "A ESA HORA?"
centrado en y 640-1000. Debajo, en "Contalo" (2.13), una caja de comentario dibujada (avatar
redondo, renglón "Escribí tu avistamiento...", cursor que titila) y un platillo/globito chiquito
que pasa por encima. Etiqueta: "CONTALO EN LOS COMENTARIOS". Queda quieto con loops suaves hasta
el final.
