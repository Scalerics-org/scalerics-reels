# Reel "El match": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: **CRM**.
Formato P/G: una COACH DE CITAS (voz Zephyr), filosa y graciosa, le agarra el celular al dueño de
una óptica de barrio (voz Puck) y revisa sus "matches" como si fuera una app de citas: son sus
clientes. "Veintisiete matches. Y no le escribiste a ninguno. Así no vas a conseguir pareja. Ni
clientes." Él: "¡Pero es el WhatsApp de la óptica!" Ella: "Para mí es una app de citas. Y vos sos
el que nunca llama." Gabriela (voz Kore) le preguntó por unos lentes de sol en enero y él le puso
"te lo paso mañana" ("¿mañana de qué año?"); ella: "¿Hola? ¿Seguís ahí?". Rodrigo compró dos
veces y nunca más le escribió ("ese te quería en serio"); uno agendado como "quién era". El dueño
se defiende: "los tengo anotados: en un post-it, en el otro celular, en la cabeza". GIRO: "Mi
amor, vos no sos feo. Sos desorganizado. Te sobran interesados y te falta memoria." Entra el
narrador de Scalerics (Orus): el CRM, todos los clientes en un solo lugar, qué compraron, a quién
le prometiste algo, a quién volver a escribirle, con aviso; "tu memoria, en la pantalla". Él le
escribe a Gabriela: "¡Al fin! ¿Me los guardás?". "¡MATCH!" Cierre de la coach: "Y vos, ¿cuántos
clientes tenés en visto? Confesalo en los comentarios." Voz de 65.8 s, reel de 69 s.

## ESTILO: INTERFAZ DE APP DE CITAS (inventada: "Corazonada"). Edición CARGADA.
Todo pasa adentro de una app de citas genérica, de noche: TARJETAS DE PERFIL blancas con esquinas
muy redondeadas (rx 36) que entran, se inclinan y se DESLIZAN a la izquierda (nope, sello lavanda
"NOPE"/X) o a la derecha (sello coral "LIKE"/corazón); arriba de cada tarjeta un bloque de color
(coral o violeta) con el cliente DIBUJADO genérico en líneas noche, nombre en Lexend 800 y una
línea mono ("CLIENTE · ÓPTICA"); abajo los botones redondos X (lavanda) y corazón (coral).
Burbujas de chat VIEJAS con fecha mono y tildes de "visto", contador de matches, corazones que
laten o se rompen, el cartel MATCH gigante en Lexend 900 itálica coral con brillo. Personajes:
la COACH (rulos grandes, aros de argolla, lentes de sol en la cabeza, campera violeta, uñas
coral) y el DUEÑO DE LA ÓPTICA (anteojos grandes de marco grueso, bigote, guardapolvo blanco,
pelo con entradas). Palabras clave gigantes que caen en su palabra. Nada quieto más de ~0.8 s.
`compositions/s01-matches.html` es la escena modelo, escrita a mano. Las escenas s02-s14 salen de
`gen/a.mjs`, `gen/b.mjs` y `gen/c.mjs` con el boilerplate común de `gen/lib.mjs` (estilos, helpers
`dibujar()`/`pop()`/`entra()`/`sellar()`/`swipe()`/`late()`, la tarjeta de perfil, los avatares, la
coach y el dueño): para cambiar una escena, editá su bloque y corré `node gen/a.mjs` (o b, c) desde
`reels/el-match`; no edites el .html generado a mano.

## Paleta (SOLO estos colores)
- Coral `#ff5a6e`: corazones, MATCH, LIKE, botón corazón, acento de subtítulos, lo que "pica".
- Blanco cálido `#fff7f4`: tarjetas, textos grandes, líneas de dibujo sobre el fondo oscuro.
- Violeta `#9b6bff`: bloques de foto alternativos, botones, la campera de la coach, marcos.
- Lavanda gris `#b9a8d6`: lo viejo y lo apagado (burbujas viejas, fechas, el X, "visto").
- Noche `#1a0d2b` (y `#120820`): líneas de los dibujos DENTRO de tarjetas, rellenos de pantallas.
- Desde s11 (entra Scalerics) se suma verde Scalerics `#5ce611` para lo que ordena: tildes,
  el aviso del CRM, la lista que se completa.
Brillos con drop-shadow/text-shadow del mismo color (1-2 por escena). Prohibido: emojis, fotos,
logos o nombres de apps reales, rayas largas (—) en textos visibles.

## Tipos de letra
Lexend 600-900 para lo grande y la UI; IBM Plex Mono 500 para fechas, horas, rótulos. Nada que
haya que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420): las escenas NO escriben la frase entera. Contenido entre y 560
y y 1520, x 50-1030. Logo de Scalerics en y ~1746; el rótulo de la app abajo a la derecha (y 1600)
lo pone ambiente.html: no taparlo.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`), fondo violeta noche con resplandor coral; desde la palabra
  119 ("En Scalerics", 42.60 s) el fondo se aclara (más violeta, brillo verde).
- `compositions/ambiente.html`: corazoncitos que suben despacio por los costados, viñeta, rótulo
  "CORAZONADA · MODO COACH"; pulsos coral (latido) en 6.2 ("clientes"), 26.4 ("serio"), 60.6
  ("¡Match!"); destello blanco en 42.6 (entra Scalerics).
- `compositions/subtitulos.html`, `compositions/s01-matches.html`.

## Sonidos extra
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `beep`,
`riser`, `notification`, `plano`. Cada swipe lleva whoosh-short; cada MATCH, sparkle + impact.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la app de citas con la paleta de
> arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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


## Escenas
Lo que se dice está en los subtítulos; la escena lo ILUSTRA. Tiempos exactos por palabra en
`tiempos.md`.

**s01-matches** (7.36 s, hecha). La coach (de costado, a la izquierda) sostiene el celular del
dueño; en la pantalla, la app: contador "27 MATCHES" coral que sube de 0 a 27 en "Veintisiete",
una grilla de 6 burbujitas de perfil con punto coral de "sin leer"; en "ninguno" un sello "0
MENSAJES"; en "pareja" un corazón coral que late; en "Ni clientes" el corazón se parte en dos y
cae una etiqueta "NI CLIENTES".

**s02-optica** (2.94 s). "¡Pero es el WhatsApp de la óptica!" El dueño de la óptica (busto,
anteojos enormes, bigote, guardapolvo) entra desde la derecha estirando la mano, indignado; arriba
de él un cartelito de vidriera "ÓPTICA" con unos anteojos dibujados; en "WhatsApp" un globo de
chat genérico (sin logo) blanco con tres puntos; gotitas de sudor.

**s03-app** (2.47 s). "Para mí es una app de citas. Y vos sos el que nunca llama." El celular
gira (flip en Y) y aparece la app "Corazonada" (logo: corazón coral con una llama de línea) con
glitch; en "nunca llama" la tarjeta de perfil DEL DUEÑO (su dibujo en bloque violeta) con la
bio "EL QUE NUNCA LLAMA" en mono y un ícono de teléfono tachado coral.

**s04-gabriela** (4.85 s). "A ver... Gabriela. Te preguntó por unos lentes de sol en enero."
"A ver..." la coach desliza con un dedo (mano con uña coral entra de abajo); tarjetas que pasan
rápido; en "Gabriela" (1.85) para en la tarjeta de GABRIELA (bloque coral, pelo largo, lentes de
sol en la cabeza, sonriente), nombre gigante; en "lentes de sol" (3.46-3.82) aparece un ícono de
anteojos de sol que se apoya sobre la tarjeta; en "enero" (4.09) un sello mono lavanda "ÚLTIMO
MENSAJE: 12 ENE".

**s05-manana** (3.22 s). "Le pusiste: te lo paso mañana. ¿Mañana de qué año?" Chat viejo:
burbuja de él (violeta, derecha) "te lo paso mañana" con hora "12 ENE · 19:40" y doble tilde
lavanda; en "¿Mañana" (1.86) un calendario de taco que pasa hojas a toda velocidad (ENE, FEB,
MAR... NOV) y en "año" un "¿2031?" gigante coral con sacudón.

**s06-hola** (2.09 s). "¿Hola? ¿Seguís ahí?" Burbujas de Gabriela (blancas, izquierda) que
caen una tras otra: "¿Hola?", "¿Seguís ahí?"; abajo "VISTO" lavanda; los tres puntitos de
escribiendo aparecen y se apagan; telaraña de líneas finas en la esquina de la pantalla.

**s07-rodrigo** (4.57 s). "Rodrigo. Te compró dos veces y nunca más le escribiste. Ese te
quería en serio." Tarjeta de RODRIGO (bloque violeta, barba, gorrito) entra; badge "COMPRÓ 2
VECES" con dos corazones coral (uno por compra, en "dos veces"); en "nunca más" un reloj de arena
mono "ÚLTIMO MENSAJE: NUNCA"; en "en serio" (3.36-3.45) la tarjeta se desliza a la izquierda
sola, triste, y queda un corazón coral grande con una venda / remiendo, "TE QUERÍA" en mono.

**s08-quien-era** (3.69 s). "¿Y este, agendado como quién era? ¿No sabés ni con quién hablaste?"
Contacto en la pantalla: silueta lisa con un "?" gigante en vez de cara, nombre "¿QUIÉN ERA?"
en Lexend 800; en "¿No sabés" la coach (de frente, cara de incrédula, ceja levantada) aparece
al costado; signos de pregunta que rebotan.

**s09-anotados** (4.94 s). "¡Los tengo anotados! En un post-it. O en el otro celular. O en la
cabeza." El dueño (busto, transpirando) enumera con los dedos; en "post-it" (1.51) un post-it
coral con garabato ilegible y "llamar a la de los lentes???"; en "otro celular" (2.54) un
segundo celular viejo con tapita, sin batería; en "cabeza" (3.86) una nube de pensamiento sobre
su cabeza llena de caras chiquitas que se borran (fade de a una). Cada ítem con un tilde
lavanda que se tacha.

**s10-feo** (6.47 s). "Mi amor, vos no sos feo. Sos desorganizado. Te sobran interesados y te
falta memoria." La coach de frente, ternura sobradora; "NO SOS FEO" gigante blanco (en "feo" se
tacha "FEO"), en "desorganizado" (2.22) "DESORGANIZADO" gigante coral con las letras torcidas que
se desacomodan; en "interesados" (4.16) una barra/medidor "INTERESADOS" que se llena coral
hasta desbordar con corazoncitos; en "memoria" (5.37) otra barra "MEMORIA" que se vacía a
lavanda con un "1%" de batería y titila.

**s11-crm** (6.73 s, ENTRA SCALERICS: fondo más claro, destello en 0.0). "En Scalerics armamos
tu CRM: todos tus clientes en un solo lugar. Qué te compraron, a quién le prometiste algo." Las
tarjetas sueltas (Gabriela, Rodrigo, ¿quién era?, más) vuelan y se apilan ordenadas en una
pantalla de CRM (panel blanco con encabezado violeta "TUS CLIENTES", filas con avatar, nombre y
estado); en "un solo lugar" se encajan con click; en "compraron" la fila de Rodrigo se despliega:
"2 COMPRAS · ARMAZÓN + LENTES"; en "prometiste" la fila de Gabriela muestra "PROMETIDO:
PRESUPUESTO LENTES DE SOL" con un tilde verde.

**s12-aviso** (6.70 s). "y a quién hay que volver a escribirle, con aviso. Cada venta con su
seguimiento. Tu memoria, en la pantalla." Notificación grande que baja con campanita verde:
"ESCRIBILE A GABRIELA HOY" (en "aviso", 1.91, con ping); en "seguimiento" (3.63) una tira de
seguimiento de una venta en 4 pasos (CONSULTÓ, PRESUPUESTO, COMPRÓ, VOLVER A ESCRIBIR) que se
completa con puntos verdes; en "memoria... pantalla" (4.72-5.54) un cerebrito de líneas entra en
el celular, "TU MEMORIA" en mono verde.

**s13-respuesta** (4.57 s). "¿Ves? Le escribiste a Gabriela. ¡Al fin! ¿Me los guardás?" Chat
de nuevo, ahora con fecha de HOY: burbuja de él (violeta) "¡Gabriela! Llegaron los lentes de
sol. ¿Te los guardo?" sale enviada con tilde verde; en "¡Al fin!" (2.19) burbuja de ella blanca
"¡Al fin! ¿Me los guardás?" con un corazón coral que salta.

**s14-cta** (8.37 s). "¡Match! Y vos, ¿cuántos clientes tenés en visto? Confesalo en los
comentarios." En 0.0 el cartel "¡MATCH!" gigante (Lexend 900 itálica coral con brillo, las dos
tarjetas, Gabriela y la óptica, chocando en el centro, lluvia de corazones); en "vos" (1.14) se
reacomoda: arriba un "¿CUÁNTOS TENÉS EN VISTO?" gigante blanco con dos tildes lavanda; en
"Confesalo" (3.65) una caja de comentario de la app (tipo input redondeado) con cursor que
escribe "yo tengo..." y un botón coral "CONFESAR"; queda latiendo hasta el final.
