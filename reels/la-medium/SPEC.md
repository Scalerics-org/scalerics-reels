# Reel "La médium": spec

Reel vertical 1080x1920 de Scalerics. Tema: SITIO WEB (rápido en el celular, con horario, ubicación y
botón a WhatsApp). Formato H, Día de los Difuntos (2 de noviembre): una SESIÓN DE ESPIRITISMO. MADAME
ESTHER, la médium (voz Gacrux, grave y teatral), le habla al dueño en la cara: "Tu clienta quiso saber a qué
hora abrís. Tuvo que contratar a una médium. O sea, a mí." La CLIENTA (Leda): "Lo busqué en Google, en
Instagram, en todos lados. Nada. Usted es mi última esperanza." La médium invoca: "Tomémonos de las manos.
Espíritu del local, si estás ahí, golpeá una vez." (GOLPE, la mesa salta, relámpago) "¿A qué hora abrís?" El
ESPÍRITU DEL LOCAL (Algenib, más grave y con eco), un fantasma de sábana con el toldo del local de sombrero:
"Dos mil once..." Se manifiesta una página web de 2011 con la dirección vieja ("¡Pero si se mudaron!"), un
teléfono ("El número que usted marcó... no existe.") y un Instagram con la última foto hace dos años: un
alfajor. "¡Está muerto! ¡El local está muerto!" (se apagan las velas). GIRO: "No, mi amor. El local está
vivito: abre todos los días. Pero en internet es un fantasma." Entra Scalerics (Orus): "Por eso en
Scalerics hacemos sitios web. Rápidos en el celular, con tu horario, tu ubicación y un botón directo a
WhatsApp." La clienta: "¡Abre a las nueve! ¡Y queda a dos cuadras!" La médium: "¿Y ahora yo de qué vivo?"
CTA (Orus): "Etiquetá al local que hay que invocar para saber a qué hora abre."
Voz armada por partes (partes/voces.sh -> partes/tiempos.sh -> partes/componer.mjs; atempo 1.3 médium,
1.2 clienta y Orus, espíritu 1.22 con asetrate 0.88 + eco): 68.0 s de voz; reel 71.2 s.

## RECURSO VISUAL CENTRAL
La MESA REDONDA con mantel bordó de flecos y el TABLERO DE ESPIRITISMO genérico (SÍ / NO, letras en arco,
números, ADIÓS; nada de marcas) con la TABLILLA de ventanita que se mueve sola a los signos (a 2-0-1-1).
Las VELAS que titilan. Del más allá se "manifiestan" (aparecen borrosas, flotando, con humo de ectoplasma)
las ruinas digitales del local: la página de 2011, el teléfono que no existe, el perfil abandonado.
Al final, el celular con el sitio web nuevo, nítido y luminoso: lo único que no es un fantasma.

## ESTILO: SALÓN VICTORIANO A LA LUZ DE LAS VELAS
Papel damasco verde botella (motivo ornamental verde claro, en armar.mjs), boiserie de madera oscura con
filete ámbar abajo (y 1540), luz de vela ámbar al centro. ambiente.html: viñeta oscura que titila con la
vela; abajo a la izquierda la chapa de quién habla (MADAME ESTHER ámbar · LA CLIENTA bordó claro · EL
ESPÍRITU ectoplasma · SCALERICS verde); abajo a la derecha la placa "SESIÓN · 2 DE NOVIEMBRE"; relámpago
en el golpe; oscuridad en "¡Está muerto!" que se levanta en "vivito"; en "Scalerics" se prende la luz.
Personajes planos con contorno tinta grueso (stroke 7-8), piezas en `assets/sesion.js` (window.SS): la
médium (turbante bordó con joya ámbar y pluma, aros grandes, delineado, chal hueso con flecos, anillos;
ojos abiertos / en trance / cerrados), la clienta (melena oscura, saco ámbar, cara neutra / asustada /
suplica / feliz, pelo parado del susto), el espíritu (sábana de ectoplasma con el toldo "TU LOCAL" de
sombrero), mesa, tablero, tablilla, velas, telarañas, humo.

## Paleta (SOLO estos)
- Verde botella `#12382a` (oscuro `#0b2219`, medio `#1d5440`, claro `#3f7a5e`): paredes, fondos de pantalla.
- Ámbar de vela `#f2a93b` (claro `#ffd27a`, oscuro `#b86e14`): llamas, marcos, títulos, saco de la clienta.
- Hueso `#ece0c4` (sombra `#cdbf9e`): papeles, tablero, velas, chal, globos. Ectoplasma `#bfe3cf` (hueso verdoso) para fantasmas.
- Bordó `#6e1f2a` (claro `#a3343f`, rosado `#e0697a`): mantel, turbante, sellos, alertas.
- Tinta `#150f0b`: contornos y textos.
- Piel `#f0c8a0` / `#d9a47c` (solo personajes).
- Solo desde s10 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`) para el sitio web.
Subtítulos: hueso con contorno tinta; acento ámbar claro (médium), bordó rosado (clienta), ectoplasma
(espíritu), verde `#5ce611` (Scalerics). Distinto del velorio (lila) y del horóscopo (violeta).
Prohibido: emojis, fotos, rayas largas, logos reales (Google, Instagram y WhatsApp solo como texto), marcas de tableros.

## Tipos de letra
Cinzel 700-900 (títulos, tablero, sellos, chapas), Cormorant Garamond itálica (lo que "dicta" el más allá),
Lexend 600-800 (pantallas, globos), IBM Plex Mono 600 (rótulos chicos, datos), Caveat (notas a mano).

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 460 y 1540. Chapa y placa en y 1576-1686 y logo en y 1746:
no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es el salón de espiritismo con la paleta de arriba). Sí valen
> las reglas técnicas.

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


## Brief por escena (tiempos relativos en tiempos.md)

- **s01-medium** (6.32 s): plano de la médium de frente detrás de la mesa con el tablero, dos velas a los
  lados, humo. Arranca a medio dibujar (nada de cuadro negro). "abrís" (1.92): un reloj de bolsillo con
  signo de pregunta flota al lado. "médium" (3.69): tarjeta Cinzel "MADAME ESTHER · MÉDIUM" con sello.
  "O sea, a mí" (4.15-5.54): se señala el pecho, sonrisa canchera, joya del turbante brilla.
- **s02-busque** (5.37): la clienta con el celular; en "Google" (0.41) y "Instagram" (1.08) aparecen
  tarjetas de búsqueda: "a qué hora abre tu local" con "0 resultados", perfil sin datos; en "todos lados"
  (1.91) más tarjetas en abanico; "Nada" (2.97) sello bordó NADA y las tarjetas caen; "última esperanza"
  (4.41) cara de súplica con lágrima, junta las manos.
- **s03-invoca** (5.87): plano cenital: mesa con el tablero grande y las cuatro manos (médium + clienta)
  tomadas en "manos" (0.61). "Espíritu" (1.63): médium en trance (ojos en blanco), humo. "golpeá" (3.75) y
  "una vez" (4.27-4.46): suspenso; en 5.27 (relativo) GOLPE: la mesa salta, las velas se sacuden,
  relámpago (ambiente), onomatopeya "¡TOC!" en Cinzel.
- **s04-tablilla** (4.57): primer plano del tablero; "hora" (0.38) la tablilla tiembla; "Dos" (1.61) va al
  2, "mil" (1.94) al 0, "once" (2.26) al 1, después al 1; abajo se escribe en Cormorant "2 0 1 1". El
  espíritu se asoma borroso detrás del tablero (flota).
- **s05-pagina** (6.35): del humo se manifiesta una página web vieja (marco de navegador hueso, título
  "Bienvenidos a nuestra web", contador de visitas, "EN CONSTRUCCIÓN", "© 2011"); "dirección" (3.08):
  resalta "Dirección: Av. de Antes 1234" (inventada); "mudaron" (4.86): la clienta asustada a un costado y
  la dirección se tacha con un trazo bordó y sello "SE MUDARON".
- **s06-telefono** (7.84): un teléfono antiguo de disco flota con el espíritu; "teléfono" (2.05) aparece el
  número en Cormorant; "marcó" (4.70) el tubo suena (vibra), el espíritu habla; "no existe" (6.03) sello
  NO EXISTE y el número se desvanece.
- **s07-instagram** (4.96): celular con un perfil genérico (sin logo, solo "@tulocal"), grilla de fotos casi
  vacía con telarañas; "Última foto" (1.41) una sola foto; "dos años" (2.85) etiqueta "hace 2 años";
  "alfajor" (4.08) la foto es un alfajor dibujado, zoom.
- **s08-muerto** (3.02): la clienta grita, pelo parado, se apagan las velas (humito); "local" (1.42):
  el cartel del local (toldo y "TU LOCAL") cuelga torcido y oscuro, con telarañas que se dibujan.
- **s09-vivito** (7.18): la médium sale del trance, sonríe. "vivito" (1.84): el LOCAL de verdad,
  vidriera iluminada con cartel ABIERTO y el toldo, gente adentro; "abre todos los días" (2.72-3.61);
  "internet" (4.77): al lado, un celular donde el local es el fantasma de sábana con el toldo, con
  "fantasma" (5.92) sello "EN INTERNET: FANTASMA".
- **s10-scalerics** (3.11): se prende la luz: se descorre una cortina bordó y aparece el celular con
  borde verde; "Scalerics" (0.75) tag verde; "sitios web" (2.09) título.
- **s11-sitio** (5.40): el sitio web en el celular, nítido: "Rápidos" (0) barra de carga que se llena al
  instante; "horario" (1.47) bloque "Lun a sáb · 9 a 20 h" (sin cifras de negocio, es un horario);
  "ubicación" (2.22) mini mapa con pin; "botón" (3.31) botón verde "Escribinos por WhatsApp" que hace pop;
  "WhatsApp" (4.56) el dedo lo toca.
- **s12-llega** (5.19): la clienta feliz con el celular: "nueve" (0.50) reloj a las 9; "dos cuadras" (1.75)
  caminito con dos cuadras y el local; "¿Y ahora yo de qué vivo?" (2.73) la médium triste, sola en la mesa,
  se le apaga la vela y un cartel "SE ATIENDEN CONSULTAS" se cae torcido.
- **s13-cta** (6.03): la tablilla escribe en el tablero; título "ETIQUETÁ" en Cinzel y debajo "al local que
  hay que invocar"; tag verde "SCALERICS · SITIOS WEB". Quieto con movimiento leve al final.
