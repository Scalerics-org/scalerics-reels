# Reel "El truco": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Vende UNA cosa: el AGENTE DE IA que atiende el WhatsApp
del comercio. Formato B (diálogo) con forma de la cultura popular uruguaya: una PARTIDA DE TRUCO
en el boliche del barrio. Gancho: EL DE ENFRENTE (Fenrir, pillo sobrador) golpea la carta:
"¡Truco! Y no te hagas el sota: tus clientes ya están jugando conmigo." EL MIRÓN (Puck, veterano
gracioso que relata la mesa como un partido) presenta: el dueño del local contra el de enfrente.
EL DUEÑO (Charon, cansado y canchero) canta envido con su horario ("de lunes a viernes, de nueve
a seis"), el otro sube con "¡real envido: yo atiendo a las once de la noche y los domingos!". El
dueño quiere retruco con "pasá el lunes"; el otro "le contesté en un minuto, con precio, con
stock, y le reservé el turno". Las SEÑAS del truco son chiste: el de enfrente levanta las cejas
(seña del ancho de espadas), el dueño se muerde el labio "pero de los nervios". El de enfrente
muestra la carta: el ANCHO DE ESPADAS = su agente de IA (WhatsApp a cualquier hora, le escribe al
que preguntó y no compró). "¡Vale cuatro!" "¡Se fue al mazo!". GIRO con ORUS (Scalerics, voz
tranquila): "el dueño no juega mal: juega solo, contra uno que tiene compañero. Y en el truco,
nadie gana solo. Armamos tu agente de IA: el compañero que juega la mano mientras vos dormís."
Cierre: "Mandáselo al que siempre se va al mazo." Voz de 69.85 s, total 73.05 s.

Recurso visual central: la MESA DE TRUCO vista desde arriba (paño verde, borde de madera) con
CARTAS ESPAÑOLAS DIBUJADAS genéricas que se golpean, se abren en abanico y se dan vuelta; la
PIZARRA DE TANTOS (NOS | ELLOS) con palitos de tiza que lleva el marcador de toda la partida.

## ESTILO: BOLICHE DE BARRIO, de noche. Edición CARGADA.
Lámpara colgante cálida que se balancea arriba, humo que sube lento, vasos vistos desde arriba.
Cartas: rectángulo crema `#f3ead6` (rx 18, trazo `#3a2416` 5px, filete interior), número en
Lexend 800 arriba a la izquierda y el palo dibujado al centro: ESPADA (hoja recta, guarda, puño),
BASTO (garrote con nudos), COPA (cáliz), ORO (moneda con círculo interior). Rojo para espadas y
copas, oro para oros, madera para bastos. El dorso: crema con rombos rojos. El ANCHO DE ESPADAS
brilla en oro (drop-shadow) cuando se revela. Personajes dibujados genéricos (sin caras reales):
EL DUEÑO = mangas y gorra oro, bigote; EL DE ENFRENTE = mangas rojas, gorra para atrás, escarbadientes,
sonrisa de costado. Palabras GIGANTES de "canto" (TRUCO, REAL ENVIDO, QUIERO RETRUCO, VALE CUATRO,
SE FUE AL MAZO): Lexend 900 mayúsculas, inclinadas (-4 a -8 grados), sombra dura sin blur (tipo
cartel de boliche), CAEN en su palabra con sacudón y golpe de naipe. Lo escrito en tiza: Lexend
700 crema con opacidad 0.9 y trazos irregulares. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Paño `#0f5536` / `#0a3a25` / sombra `#05170f` (fondo, rellenos oscuros).
- Madera `#7a4a26` / `#3a2416` (borde de la mesa, marco de la pizarra, trazos de las cartas).
- Crema naipe `#f3ead6` (cartas, tiza, textos fuertes).
- Rojo `#e5392b` (y `#ff5a43` en textos sobre paño): EL DE ENFRENTE, espadas y copas.
- Oro `#f2b632`: EL DUEÑO, oros, la lámpara, el brillo del ancho.
- Celeste tiza `#9fdcff`: solo la chapa y el acento del MIRÓN.
- Verde Scalerics `#5ce611`: SOLO desde s13 (el compañero del dueño) y en el CTA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos, marcas o caras reales.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos, horarios y UI. Nada que haya que
leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420; el acento de cada palabra tiene el color de quien habla: lo arma
`armar.mjs` con `voces` del reel.json: e rojo, d oro, m celeste, o verde). Las escenas NO
escriben la frase entera. Contenido de escenas entre y 520 y y 1420, x 50-1030. Arriba (y 0-180)
y abajo (y 1450-1710) manda `ambiente.html`.

## Capas fijas (ya hechas)
- `compositions/mesa.html` (DETRÁS de las escenas): borde de madera de la mesa (rectángulo
  redondeado x 34-1046, y 470-1440) y textura de paño muy suave.
- `compositions/ambiente.html` (DELANTE): lámpara colgante (x 540, y 0-170) que se balancea con su
  cono de luz cálida; humo que sube; arriba a la izquierda la CHAPA de quién habla (EL DE ENFRENTE
  rojo / EL MIRÓN celeste / EL DUEÑO oro / SCALERICS verde); abajo, desde 26.1 s, la PIZARRA DE
  TANTOS (NOS | ELLOS): ELLOS 3 palitos (real envido), +4 en "vale cuatro" (50.9), +3 en "mazo"
  (53.1); NOS se llena en VERDE desde "Armamos" (63.04) hasta pasar adelante en "dormís" (66.6).
- Audio: `assets/bgm/boliche.mp3` (lo arma `partes/sonidos.sh`: bed en loop + murmullo) y dos sfx
  propios: `naipe` (carta golpeada) y `tiza` (palito en la pizarra).

## Voces (partes/)
01 Fenrir (el de enfrente) · 02 Puck (mirón) · 03 Charon (dueño) · 04 Fenrir · 05 Puck · 06 Charon
· 07 Fenrir · 08 Puck · 09 Charon · 10 Fenrir · 11 Puck · 12 Orus (Scalerics). `partes/voces.sh`
genera, `partes/pegar.sh` recorta y pega (atempo 1.08, Orus 1.04), `partes/componer.mjs` arma
`palabras.json` con los tiempos de cada parte y ajustes a mano contra los silencios.

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


> En este reel manda el ESTILO de arriba sobre el "lenguaje visual" de la base: colores de la
> paleta del boliche, rellenos permitidos, sombras duras y brillo solo en el ancho de espadas. Sin
> etiqueta mono verde: la chapa de quién habla está en `ambiente.html`. Sfx extra: `naipe`, `tiza`,
> `impact-bass-2`, `glitch-1`.

> Trampa de este reel: `svgOrigin` va en coordenadas LOCALES del grupo animado (el de adentro del
> `translate`) y SIEMPRE con `smoothOrigin: false`; si no, GSAP compensa y las cartas quedan corridas.
> No animar x/y de un `<g>` que tiene `transform` en el atributo: envolverlo. Las cartas salen de
> `partes/naipes.js` (`carta()`, `dorso()`, `pinta()`), que `partes/inyectar.mjs` copia en cada escena.

## Escenas (tiempos relativos a cada escena; ver tiempos.md)

### s01-truco (0.00, 4.76 s) · el de enfrente
Cuadro 0 ya en movimiento: una mano roja (manga roja desde arriba a la derecha) GOLPEA una carta
de dorso sobre el paño, el texto "¡TRUCO!" gigante rojo con sombra crema cayendo, sacudón.
"sota" 1.48: aparece una SOTA (carta 10 de bastos, figura de paje genérica de líneas) que se
hace la distraída (se balancea, silbido de tres notitas en tiza) con el rótulo "NO TE HAGAS EL
SOTA". "clientes" 2.31: fichas-cliente (porotos crema con cabecita) se deslizan del lado de
abajo (el dueño) hacia arriba, hacia la carta roja; "conmigo" 3.61: se agrupan alrededor de la
mano roja, que les hace un gesto de "vengan".

### s02-boliche (4.76, 6.70 s) · el mirón
"¡UH!" en tiza celeste-crema 0.0; "picante" 1.01: sello rojo "PICANTE" ladeado. "Boliche" 1.75:
la mesa desde arriba se arma: vasos (círculos con reflejo) en las esquinas, el mazo al centro.
"dueño" 3.98: abajo, las manos oro con 3 cartas de dorso y la placa "EL DUEÑO DEL LOCAL"; "enfrente"
5.55: arriba, las manos rojas con 3 cartas y la placa "EL DE ENFRENTE". Un "VS" chico entre los dos.

### s03-envido (11.46, 5.53 s) · el dueño
"Pará, pará": una mano oro abierta (palma, "pará") con "EL ENVIDO ESTÁ PRIMERO" en placa oro en
"envido" 1.11. "Yo atiendo" 2.58: el dueño abre su abanico. "lunes... viernes" 3.15-3.43: tira de
días L M M J V encendidos en oro, S D apagados. "nueve" 4.26: carta 9 DE OROS; "seis" 4.63: carta
6 DE OROS al lado (el envido de su horario: "9 A 18 HS" en Plex Mono debajo).

### s04-real (16.99, 4.99 s) · el de enfrente
"¡REAL ENVIDO!" rojo cayendo 0.0 con golpe de naipe. "once" 2.13: carta 11 DE ESPADAS (caballo
genérico) con "23:00" en Plex Mono; "noche" 2.78: una luna se dibuja sobre la carta. "domingos"
3.61: la misma tira de días, ahora con S y D encendidos en ROJO; sello "ABIERTO".

### s05-palitos (21.98, 4.33 s) · el mirón
Primer plano de la PIZARRA (marco madera, fondo casi negro verdoso) con "NOS | ELLOS" en tiza.
"¡UH!" 0.0; "real envido" 0.83: "REAL ENVIDO" escrito en tiza arriba de ELLOS. "Andá anotando"
2.30: una tiza dibuja tres palitos en ELLOS (2.52, 2.77, 2.96), cada uno con sfx tiza; NOS queda vacío.

### s06-retruco (26.31, 4.71 s) · el dueño
"QUIERO RETRUCO" oro cayendo 0.0. "preguntó un precio" 1.85: celular de líneas con burbuja de
cliente "¿Precio?" 2.32. "pasá el lunes" 3.06: la respuesta del dueño (burbuja oro) "Pasá el lunes"
y la carita del cliente se va (la burbuja se desinfla y aparece "visto" frío). Un 4 de copas
cae solo en la mesa (mala carta).

### s07-minuto (31.02, 5.60 s) · el de enfrente
Celular rojo: la misma burbuja "¿Precio?" y la respuesta al instante; cronómetro arriba que da UNA
vuelta en "minuto" 1.02 con "1 MIN". La respuesta tiene renglones que se tildan: "Precio" 2.13,
"Stock: hay" 2.96, "Turno reservado" 3.96-4.53 (tilde rojo en cada uno).

### s08-cejas (36.62, 4.42 s) · el mirón (en voz baja)
Cara del DE ENFRENTE asomando detrás de su abanico de cartas (dibujo de líneas: gorra para atrás,
ojos de raya, sonrisa de costado, escarbadientes). "Levantó" 0.48 y "cejas" 1.20: las cejas suben
dos veces (boing). Rótulo de tiza "SEÑA: CEJAS". "ancho de espadas" 2.87: detrás de la cabeza brilla
el contorno de una carta con una espada y "= ANCHO DE ESPADAS".

### s09-labio (41.04, 3.76 s) · el dueño
Cara del DUEÑO (gorra oro, bigote) detrás de su abanico: "muerdo el labio" 0.47-0.84: dientes sobre
el labio; rótulo de tiza "SEÑA · muerdo el labio" que en "nervios" 1.88 se TACHA en rojo y aparece
"(son nervios)" en oro, con la cara que tiembla y gotas de sudor. "¿Qué tenés, a ver?" 2.67: ojos que se van para arriba, signo "?" oro.

### s10-ancho (44.80, 7.72 s) · el de enfrente
La mano roja DA VUELTA la carta 0.0-0.6: el ANCHO DE ESPADAS gigante, brillo oro; en "agente de IA"
0.19-0.83 placa roja "MI AGENTE DE IA". Desde "Atiende" 1.64, fichas que salen de la carta: "WHATSAPP"
2.13 (burbuja), "A CUALQUIER HORA" 3.06 (reloj), "LE ESCRIBE AL QUE NO COMPRÓ" 3.80-5.0 (burbuja
"¿Lo seguís buscando?"). "¡Vale cuatro!" 5.87: "¡VALE CUATRO!" rojo cae, sacudón, flash oro.

### s11-mazo (52.52, 3.39 s) · el mirón
Las 3 cartas del dueño vuelan al mazo del centro; "¡SE FUE AL MAZO!" crema con sombra roja en "mazo"
0.55; "dueño" 1.67: la gorra oro del dueño se hunde abajo de la mesa; "JA JA JA" en tiza.

### s12-solo (55.91, 7.13 s) · Scalerics (giro)
La luz baja. Mesa de 4 lugares vista desde arriba (cabezas y hombros): abajo el dueño SOLO (gorra oro), a su
lado un lugar VACÍO punteado con "?"; arriba el de enfrente (rojo) y a su lado su compañero (cabeza
oscura con auriculares y luz roja: un agente).
"no juega mal" 0.39-0.87: rótulo "NO JUEGA MAL"; "solo" 1.64: el lugar vacío late con "?"; "compañero"
3.46: el compañero rojo se ilumina. "nadie gana solo" 5.52-6.15: "EN EL TRUCO NADIE GANA SOLO" grande
crema.

### s13-companero (63.04, 4.55 s) · Scalerics
"Armamos" 0.0: en la silla vacía del dueño aparece SU agente de IA en VERDE (silueta con auriculares
y una carta: ancho de espadas en verde). "compañero" 1.62: placa verde "TU COMPAÑERO". "mientras vos
dormís" 2.87-3.54: luna y "zzz" sobre el dueño; el agente juega una carta sola sobre el paño.

### s14-cta (67.59, 5.46 s) · Scalerics
"MANDÁSELO" grande crema 0.0; "al que siempre se va al mazo" 0.53-1.78: un mazo de cartas con una
flecha de compartir (avioncito de papel de línea verde) que sale volando; queda quieto el final.
