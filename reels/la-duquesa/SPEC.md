# Reel "La duquesa": spec

Reel vertical 1080x1920 de Scalerics. Tema: TIENDA ONLINE (vende sola, a cualquier hora, envíos por
DAC, Correo o PedidosYa, cobro con Mercado Pago). Formato D: HISTORIA DE UNA CLIENTA CON NOMBRE contada
como DRAMA DE ÉPOCA (las series de época con bailes y chismes de la alta sociedad, solo como género:
ningún título, logo, cara ni música de ninguna serie). La CRONISTA anónima de la sociedad (voz Kore,
"querido lector") abre con el gancho: "Querido lector: tu local vende como en mil ochocientos. Y tus
clientas viven en este siglo." Temporada de bailes: la SEÑORITA CLARA (Leda, dramática) ve unas botas
divinas en el Instagram de Calzados Ernesto: "¡Las botas de mi vida! ¿Cuánto cuestan? ¿Hay en treinta
y ocho?". Escribe un martes a las once de la noche; la respuesta llega el jueves, LACRADA. DON ERNESTO
(Charon, impostando tono antiguo) lee su carta: "Distinguida señorita: para adquirir mi mercancía,
deberá usted presentarse en el local, en horario de atención, de lunes a viernes. Precio por privado."
Clara: "¿Por privado? ¡Pero si le escribí por privado!" Cronista: "Escándalo en sociedad. Esa misma
noche, Clara compró en otro lado: tienda online, Mercado Pago, y envío a domicilio al otro día." Clara:
"Y las estrené en el baile del sábado." Ernesto: "¡Pero mis botas son mejores! ¡Cuero de verdad!"
GIRO de la cronista: "Lo son, querido Ernesto. Tu mercancía es de primera. Lo que es de otro siglo es
cómo la vendés. Esta temporada, el baile es en el celular." Scalerics (Orus): "En Scalerics hacemos tu
tienda online: vende sola, a cualquier hora, con envíos por DAC, Correo o PedidosYa, y cobra con
Mercado Pago." CTA de la cronista: "Mandáselo al que todavía vende por privado. Que se entere por carta."
Voz armada por partes (partes/voces.sh → partes/apretar.sh + recorte de puntas → tiempos.mjs por parte
→ partes/componer.mjs): 73.0 s; reel 76.2 s.

## RECURSO VISUAL CENTRAL
La CARTA LACRADA: el sobre crema con el sello de cera roja "E" que llega dos días tarde y se abre en la
carta de Don Ernesto escrita con pluma (Cormorant itálica). Frente a ella, el CELULAR moderno (el
anacronismo, en tinta oscura) donde Clara ve las botas, escribe y al final compra en un toque. Las
BOTAS rosa empolvado de cordones son el objeto del deseo. Todo enmarcado en MARCOS DORADOS
ornamentados (rectos con volutas, u ovales tipo camafeo con cresta).

## ESTILO: DRAMA DE ÉPOCA PASTEL
Salón de época claro: papel tapiz crema con rayas dobles celestes, luz cálida al centro, boiserie verde
salvia con moldura dorada (y 1392-1680) y franja ciruela con filete dorado abajo, donde va el logo (todo
en armar.mjs). ambiente.html: arriba a la izquierda la cartela dorada de la "serie" "CRÓNICAS DE
SOCIEDAD · TEMPORADA DE BAILES" (Cinzel); arriba a la derecha el lacre chico con "CAP. I"; abajo a la
izquierda la chapa de quién habla, con camafeo de color (LA CRONISTA · VOZ ANÓNIMA oro · SEÑORITA CLARA
· CLIENTA rosa · DON ERNESTO · CALZADOS ERNESTO lacre · SCALERICS · TIENDAS ONLINE verde); pétalos
pastel que caen lento todo el reel; flash rosa en "Escándalo" y flash crema en "Scalerics", donde la
cartela pasa a "CRÓNICAS DE SOCIEDAD · ESTA TEMPORADA: ONLINE".
Personajes planos con contorno tinta (stroke 6-8) y rellenos pastel: Clara (rodete castaño con moño
celeste, bucles, vestido rosa empolvado de mangas abullonadas, collar de perlas, mejillas rosas; caras
sonrisa / O / enojo, ojos de corazón; brazos: con celular, abanico, mano en la frente), Don Ernesto
(pelado con costados canosos, bigote de manubrio, monóculo dorado, levita salvia, chaleco crema, moño
lacre; caras seria / sonrisa / grito, gotas; brazos: pluma, bota, arriba, mano al pecho), la cronista
(nunca se le ve la cara: silueta crema de perfil dentro de un camafeo oval). Piezas compartidas en
`assets/epoca.js` (window.EP).

## Paleta (SOLO estos)
- Crema papel `#f6efe1` (oscuro `#e9dcc2`, blanco cálido `#fffaf0`): fondo, papel, carta.
- Celeste `#a9cfe0` (oscuro `#6f9fb8`): rayas del tapiz, abanico, moños, paquete.
- Rosa empolvado `#e7b7b4` (oscuro `#c98b8a`): Clara, botas, cinta.
- Verde salvia `#a7b99a` (oscuro `#6f8a66`): boiserie, levita de Ernesto.
- Dorado `#c9a046` (oscuro `#9a7a2e`, claro `#ecd38a`): marcos, cartelas, volutas.
- Tinta ciruela `#3b2f3a`: contornos, texto, celular, franja de abajo.
- Lacre `#b3262e` (oscuro `#7f1a20`): el sello de cera, sellos y alertas.
- Desde "Scalerics" se suma el verde `#5ce611` (oscuro `#3d9e0a` para texto sobre crema).
Subtítulos: tinta sobre el crema (halo crema); acento dorado `#a8761c` (cronista), rosa `#c2506e`
(Clara), lacre (Ernesto), verde `#3d9e0a` (Scalerics) (reel.voces + armar.mjs).
Prohibido: emojis, fotos, rayas largas, logos reales (Instagram y Mercado Pago solo como texto o UI
genérica), caras o títulos de series reales.

## Tipos de letra
Cinzel 700-900 (títulos, cartelas, sellos), Cormorant Garamond itálica 500 (la carta, "querido
lector", letra de pluma) y 600, Lexend 600-800 (UI del celular, globos), IBM Plex Mono 500 (horas).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1480. Chapa en y 1556-1666 (izquierda) y logo
en y 1746: no taparlos. Cartela y lacre arriba en y 56-190.

## Lo que hace ambiente.html (segundos globales)
Chapas de quién habla en cada turno (reel.voces). Pétalos cayendo todo el reel. Flash rosa en 38.14
("Escándalo") y crema en 60.55 ("Scalerics"); la cartela cambia a "ESTA TEMPORADA: ONLINE" en 60.55.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde sobre navy: es el drama de época con la paleta de arriba).
> Sí valen las reglas técnicas; GSAP local y después `<script src="assets/epoca.js"></script>`; en SVG
> rotar/escalar con `svgOrigin` y `smoothOrigin: false`.

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
**s01-siglo** (6.79). Cuadro 0: el marco dorado grande ya medio armado y la pluma escribiendo "Querido
lector," en Cormorant itálica (arriba del marco). En "local" (1.23) dentro del marco una fachada de local
de época (toldo rosa a rayas, vidriera, cartel "CALZADOS") que hace pop; en "mil ochocientos" (2.62)
golpea "1800" gigante en Cinzel dorado debajo de la fachada; en "clientas" (4.26) entra desde la derecha
el celular moderno con una clienta (Clara chiquita en la pantalla) y en "este siglo" (5.49) el rótulo
"ESTE SIGLO" encima del celular y "1800" se agrisa.
**s02-baile** (2.62). Salón de baile: araña de cristal que baja, parejas en silueta que giran. En
"Temporada" (0.00) cartela "TEMPORADA DE BAILES"; en "señorita" (1.88) entra el retrato oval de Clara
con la plaquita "SEÑORITA CLARA".
**s03-instagram** (4.20). Clara (busto grande) con el celular en la mano; al lado un celular grande con
un post genérico: avatar, "calzados.ernesto", foto de las botas rosas, corazón. En "botas" (0.49) las
botas en la pantalla; en "divinas" (0.74) corazones y ojos de corazón; en "Instagram" (1.80) la grilla
de fotos; en "Ernesto" (3.20) el nombre del perfil se subraya.
**s04-vida** (4.50). Clara con la mano en el pecho, suspirando, corazones que suben. En "vida" (1.13) el
rótulo rosa "LAS BOTAS DE MI VIDA"; en "cuestan" (2.44) su mensaje en el celular "¿Cuánto cuestan?";
en "ocho" (3.87) "¿Hay en 38?" y la hora "23:00".
**s05-jueves** (6.22). Reloj de péndulo dorado que marca las once (en "once", 1.89, "MARTES 23:00");
taco de almanaque que pasa "MARTES" → "MIÉRCOLES" → "JUEVES" (en "respuesta" 3.04 y "jueves" 4.43). En
"Lacrada" (5.18) cae el sobre crema con el lacre rojo, golpe y sacudón.
**s06-carta** (5.55). Don Ernesto en su escritorio, ceremonioso, con la pluma y el tintero; al lado la
carta abierta en un marco: "Distinguida señorita:" (0.00) en itálica, se escriben "para adquirir mi
mercancía," (1.81), "deberá usted presentarse" (3.33) y "en el local," (4.84). Ernesto levanta el
mentón y el monóculo brilla.
**s07-privado** (4.28). La carta en primer plano con las líneas "en horario de atención," (0.11) "de
lunes a viernes." (1.41), y en "Precio" (2.72) "Precio por privado." subrayado; en "privado" (3.31)
el lacre rojo se estampa al pie de la carta y sello "PRECIO POR PRIVADO".
**s08-desmayo** (3.98). Clara con la carta en una mano y la otra en la frente; en "privado" (0.39) cara
de O; en "Pero" (1.22) enojo y levanta el celular con su mensaje "¿Cuánto cuestan?" visto; en
"privado" (2.26) se desmaya hacia atrás (rotación) y el globo "¡¡POR PRIVADO!!".
**s09-escandalo** (3.63). La gaceta de sociedad: hoja de diario de época que entra girando con el título
"¡ESCÁNDALO!" (0.00) y "EN SOCIEDAD" (0.45); en "noche" (1.59) una luna en la ventanita del grabado; en
"otro lado" (2.91) el grabado de Clara se va del local de Ernesto (flecha) hacia el celular.
**s10-tienda** (3.68). Celular grande con una tienda online genérica: las botas, precio a la vista
"$ 3.490" y botón "COMPRAR"; en "online" (0.18) la pantalla se arma; en "Mercado Pago" (0.78) botón
"PAGAR CON MERCADO PAGO" y tilde; en "envío" (1.73) etiqueta "ENVÍO A DOMICILIO"; en "otro día" (2.80)
"LLEGA MAÑANA" y un paquete con moño que salta.
**s11-sabado** (2.35). Clara bailando con sus botas rosas en el salón, araña, destellos; en "estrené"
(0.27) las botas brillan; en "sábado" (1.40) rótulo "BAILE DEL SÁBADO".
**s12-cuero** (3.38). Don Ernesto ofendidísimo levantando una bota, cara de grito, gotas; en "mejores"
(0.74) el monóculo salta; en "Cuero" (1.83) sello dorado "CUERO DE VERDAD".
**s13-primera** (3.06). La bota de Ernesto en un marco dorado como un cuadro de museo, con cinta "DE
PRIMERA" en "primera" (2.38); en "Ernesto" (0.74) Ernesto chiquito asoma al costado, consolado.
**s14-celular** (5.79). Dos cosas: la carta lacrada con un rótulo "OTRO SIGLO" (en "otro siglo" 0.47)
y en "cómo la vendés" (1.38) un tachón; en "temporada" (2.68) la carta sale y entra el celular gigante
cuya pantalla es un salón de baile (araña chiquita, parejas); en "celular" (4.56) "EL BAILE ES ACÁ".
**s15-scalerics** (9.50). Flash crema. En "Scalerics" (0.52) el celular con "Calzados Ernesto ·
tienda online" (verde); en "vende sola" (2.66) pedidos que entran "Nuevo pedido"; en "cualquier hora"
(3.65) reloj "03:00"; en "DAC" (5.39), "Correo" (6.04), "PedidosYa" (6.69) chips de envío; en
"Mercado Pago" (8.17) el chip de pago con tilde verde. Ernesto chiquito sonriendo al lado.
**s16-cta** (6.70). Un sobre lacrado sale volando hacia afuera de cuadro como una carta enviada; texto
grande "MANDÁSELO" (0.00) / "al que todavía vende" / "POR PRIVADO" (1.72) en el marco dorado; en
"carta" (2.95) el lacre se estampa y queda la firma "La cronista" con la pluma; queda quieto ~3 s con
pétalos.
