# El gurú · Agente de IA · seminario de gurú motivacional

**De qué trata.** "Si tu negocio no crece, es porque dormís." Un SEMINARIO MOTIVACIONAL de estadio,
"DESPERTÁ TU IMPERIO": el GURÚ (Fenrir, gritón, vendedor de humo, saco dorado, jopo, micrófono de
vincha y sonrisa de dientes de más) predica el sacrificio: regla uno, a las cuatro de la mañana
ducha fría; regla dos, cada WhatsApp lo contestás vos; "el que descansa, pierde", "¡el éxito es
sufrimiento!", y hace cantar al público "¡sin dormir no hay gloria!" mientras explota la
pirotecnia. Un DUEÑO DEL PÚBLICO (Charon, cansado, con ojeras) levanta la mano: "Perdón... ¿y yo
cuándo duermo?" "¡Cuando factures, campeón!" El dueño cuenta que ya contesta a la una de la
mañana con el celular en la cara, que abre a las siete, que atiende la caja, los proveedores, el
mostrador... "Solo." El gurú: "¡Eso es mentalidad de tiburón!" GIRO: el dueño pregunta "¿Y usted?
¿Contesta su WhatsApp a las cuatro?" y el gurú queda en evidencia: "Eh... No. Ese lo atiende mi
agente de IA. ¡Pero el sufrimiento es de ustedes!" (uuh y risas del público; la pantalla se
tacha). Entra Orus, con la luz cambiada: "Ahí está el truco. Tu negocio no se frena porque dormís:
se frena porque estás solo." "En Scalerics armamos tu agente de IA..." "Vos, dormí. Sin culpa."
Cierre: "Mandáselo al que te dice que duermas menos."

**Formato:** A (polémica con giro), con forma de seminario de gurú motivacional. Tres voces.
**Recurso visual central:** el ESCENARIO DEL SEMINARIO con una PANTALLA LED GIGANTE (rectángulo con
grilla de puntitos, y 600-900 en la mayoría de las escenas) donde aparecen las frases del gurú en
mayúsculas doradas ("DORMÍS", "DESPERTÁ TU IMPERIO", "4:00 AM · DUCHA FRÍA", "EL QUE DESCANSA
PIERDE", "SIN DORMIR NO HAY GLORIA"); llamaradas y columnas de pirotecnia DIBUJADAS a los costados
en cada grito; luces doradas que barren. En el giro las frases se TACHAN con una raya roja y la
pirotecnia se apaga (una llamita que hace "pff" y humo). Desde que entra Orus la luz cambia a una
calma celeste: el agente de IA (una burbuja de chat celeste con ojos) y el dueño durmiendo.

## Paleta (manda sobre SPEC-base)
- Escenario casi negro violáceo `#0a0710` / `#150d1c` (fondo y relleno de siluetas).
- Crema cálido `#fff4e0` (trazos principales, personajes, textos).
- Dorado `#f5b82e`: el gurú (saco, pantalla LED, letras), luces, confeti.
- Naranja fuego `#ff6a1a`: llamas, pirotecnia, y el acento del dueño del público (`#ff7b2e` en subtítulos).
- Rojo `#ff3b3b`: SOLO las tachaduras de las frases del gurú y el "uuh".
- Celeste `#5ad1e6`: SOLO el agente de IA y lo de Scalerics (desde el giro).
- Sin degradés en los dibujos (los haces de luz del escenario y el brillo del fondo sí).

## Tipografía
- Subtítulos: Lexend 600 crema; el acento toma el color de quien habla (gurú dorado, dueño naranja,
  Orus celeste). Arriba de cada grupo, un cartelito mono con quién habla ("EL GURÚ", "UN DUEÑO DEL
  PÚBLICO", "SCALERICS"): lo arma armar.mjs.
- Frases de la pantalla LED y carteles: Outfit 900 mayúsculas, dorado sobre la pantalla oscura.
- Tachaduras: raya roja de 12px que se dibuja de izquierda a derecha, levemente inclinada.
- Etiqueta debajo del dibujo: IBM Plex Mono 500 28px, letter-spacing 0.3em, dorado (celeste desde
  s11), top 1300.

## Cómo están hechas las escenas
- `assets/kit.js` (lo cargan todas las escenas después de GSAP): dibujos compartidos (`KIT.svg.guru`,
  `duenio`, `agente`, `led`, `llama`, `publico`) y helpers (`dibujar`, `pop`, `golpe`, `temblor`,
  `etiquetas`, `llamas`, `pirotecnia`, `confeti`, `salida`). Cada escena arma su `<svg>` con esos
  dibujos y anima en las palabras.
- Voces: `partes/voces.sh` (Gemini, con reintentos) → `recortar.sh` → `pausas.sh` → `tiempos.mjs` por
  parte → `partes/componer.mjs` (atempo por parte, silencios entre parlamentos, arreglos a mano de
  tiempos) arma `assets/voice/locucion.wav` y `palabras.json`.

## Capas fijas
- `compositions/escenario.html` (DEBAJO de las escenas): dos haces de luz dorados que barren desde
  arriba (y 560), el borde del escenario en y 1262 con una fila de foquitos dorados. Se apaga casi
  entero en la escena del dormitorio (s07) y desde que entra Orus (50.44 s).
- `compositions/ambiente.html` (ENCIMA de las escenas): "● EN VIVO" arriba a la izquierda y
  "DESPERTÁ TU IMPERIO" dorado arriba a la derecha (y 66-110), que se apagan en 50.3 s; la viñeta;
  flashes cálidos suaves en cada explosión de pirotecnia.
- No dibujes nada arriba de y 580 ni abajo de y 1330.

## Personajes (dibujados genéricos)
- GURÚ: hombre de unos 40, JOPO enorme engominado, cejas arriba, SONRISA gigante con una fila de
  dientes blancos, micrófono de vincha (línea de la oreja a la boca con un puntito), camisa abierta,
  SACO DORADO (trazo dorado 6px sobre relleno oscuro), brazos abiertos en V o un dedo que señala.
- DUEÑO DEL PÚBLICO: hombre de unos 50, pelado arriba, bigote, OJERAS (dos curvas), buzo con
  cierre naranja, sentado en una butaca; levanta la mano; celular que le ilumina la cara.
- AGENTE DE IA: una burbuja de chat celeste redondeada (trazo celeste 6px, relleno oscuro) con dos
  ojos-punto y una sonrisa tranquila; nunca grita.
- Público: cabezas y hombros en silueta (relleno `#150d1c`, trazo crema 0.4) en primer plano, abajo.
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



> En este reel mandan la paleta y la tipografía de arriba: donde SPEC-base dice crema `#efeee5` y
> verde `#5ce611`, acá es crema cálido `#fff4e0` y el color de cada personaje; la etiqueta va en dorado.

## Brief por escena (tiempos relativos a cada escena; ver tiempos.md)

**s01-dormis (0-3.67).** El gurú en el centro del escenario, ya a medio dibujar en el cuadro 0,
señalando a cámara; detrás, la PANTALLA LED (y 600-860). "negocio" (0.46): en la pantalla aparece
"TU NEGOCIO NO CRECE" chico. "dormís" (2.04): la pantalla se llena con "DORMÍS" gigante, dos
LLAMARADAS suben a los costados (x 140 y 940), temblor y flash. Etiqueta "SEMINARIO · EN VIVO".

**s02-imperio (3.67-7.35).** El gurú con los brazos en V. "campeones" (0.43): en primer plano abajo
se levantan las manos del público (siluetas). "Despertá tu Imperio" (1.81-2.76): la pantalla
escribe "DESPERTÁ TU IMPERIO" en dos líneas, columnas de pirotecnia (chispas que suben) en los
costados y confeti dorado que cae. Etiqueta "DESPERTÁ TU IMPERIO".

**s03-ducha (7.35-10.14).** Pantalla "REGLA 1" arriba. "cuatro" (1.24): un despertador dorado
gigante salta y vibra marcando 4:00 ("AM" al lado). "ducha fría" (2.30): una ducha que larga
gotas crema sobre un hombrecito tiritando; letra "BRRR". Etiqueta
"4:00 AM · DUCHA FRÍA".

**s04-vos (10.14-14.80).** Pantalla "REGLA 2". "WhatsApp" (1.72): un celular con globos de chat que
entran uno tras otro (sin nombres reales, "¿precio?", "¿abren hoy?", "¿tenés talle?"). "vos"
(2.93) y "¡Vos!" (3.68): un DEDO ÍNDICE del gurú gigante que avanza hacia cámara (scale 1→1.6) con
líneas de impacto. Etiqueta "TODO VOS".

**s05-gloria (14.80-23.37).** Pantalla con frases que cambian: "EL QUE DESCANSA PIERDE" en
"descansa" (0.44) con una cama dibujada que se tacha (X roja); "ÉXITO = SUFRIMIENTO" en "éxito"
(2.37) con el gurú que levanta el puño y llamas; "Repitan conmigo" (4.48): el público levanta los
brazos; "SIN DORMIR NO HAY GLORIA" (5.62-6.84) gigante en la pantalla, letra por letra, pirotecnia
doble, confeti y aplausos. Etiqueta "REPITAN CONMIGO".

**s06-duermo (23.37-28.73).** Corte al público: butacas en filas; un reflector cae sobre el DUEÑO
que levanta la mano, ojeras, bostezo. "cuándo duermo" (2.00): una Z chica que sube. "¡Cuando
factures, campeón!" (3.27): el gurú entra desde la derecha guiñando y su sonrisa destella (destello
de 4 puntas en los dientes); "FACTURÁ" en un cartelito dorado. Etiqueta "PREGUNTA DEL PÚBLICO".

**s07-una (28.73-33.56).** El escenario se apaga: el dueño en la cama, la cara iluminada por el
celular (un cono de luz crema), la almohada. "una de la mañana" (1.03): reloj de mesa "1:00".
"cara" (2.84): el celular le cae en la cara (golpe, estrellitas). "siete" (4.22): el reloj salta a
"7:00" y una persiana de local que sube. Etiqueta "1:00 AM".

**s08-solo (33.56-38.17).** El dueño en el mostrador con cuatro brazos (como un pulpo): "caja" (0.78)
una caja registradora, "proveedores" (1.38) cajas apiladas que llegan, "mostrador" (2.33) un
cliente que espera con un ticket. "Solo." (3.56): todo se apaga menos un reflector sobre él,
los brazos bajan; queda chiquito. Etiqueta "TODO VOS" → "SOLO".

**s09-tiburon (38.17-42.93).** "tiburón" (0.91): el gurú con una ALETA de tiburón dibujada atrás,
"MENTALIDAD DE TIBURÓN" en la pantalla, olas. "¿Y usted?" (2.01): un reflector gira y lo apunta a
él; la sonrisa se congela. "WhatsApp a las cuatro" (3.35): una gota de sudor y el texto de la
pantalla parpadea. Etiqueta "¿Y USTED?".

**s10-pillado (42.93-50.44).** Primer plano del gurú sudando, sonrisa torcida. "No" (0.82):
la pantalla hace glitch. "agente de IA" (2.91): aparece su celular (borde celeste) y en la pantalla LED su
chat: "¿Me reservás dos entradas?" y la respuesta celeste "¡Listo! Te las aparté. ¿Algo más?",
con la burbuja del AGENTE y "4:02 AM · RESPONDIDO". "¡Pero el
sufrimiento es de ustedes!" (4.60): la frase "SIN DORMIR NO HAY GLORIA" se TACHA en rojo, la
pirotecnia se apaga ("pff", humo), letras "UUUH" rojas rebotando y risas. Etiqueta "PILLADO".

**s11-truco (50.44-55.96).** Cambia la luz a celeste calmo; el escenario vacío con el micrófono
caído. "truco" (0.55): el cartel "SIN DORMIR NO HAY GLORIA" tachado cae. "dormís" (2.82): una cama
con una tilde celeste. "estás solo" (4.46): el dueño solito bajo un único reflector, y a su lado
una silueta punteada vacía (el lugar del que falta). Etiquetas celestes "AHÍ ESTÁ EL TRUCO", "DORMIR ESTÁ BIEN", "LO QUE FALTA: ALGUIEN"; en
"estás solo" cae "ESTÁS SOLO" celeste gigante arriba.

**s12-agente (55.96-63.11).** La burbuja celeste del AGENTE ocupa el lugar punteado al lado del
dueño. "agente de IA" (1.14): pop del agente, que saluda. "tres de la mañana" (2.98): un celular
con "03:00" y una luna; "WhatsApp" (2.55): globo "¿Tenés la campera negra en M?"; "precios" (3.86): respuesta
celeste del agente "¡Sí! Te paso el precio y te la guardo." (sin cifras); "pedidos" (4.83): ficha
"PEDIDO TOMADO" con tilde; "deja" (5.53): llega "¿Me hacen precio por mayor?" y en "apartados"
(5.79) vuela a una carpeta dorada "PARA VOS". Etiqueta "TU AGENTE DE IA".

**s13-dormi (63.11-64.92).** El dueño durmiendo feliz, luna, Zzz celestes; al lado, en la mesa de
luz, el celular con la burbuja del agente trabajando (puntitos que escriben). Etiqueta "SIN CULPA".

**s14-cta (64.92-70.6).** "MANDÁSELO" gigante dorado y debajo "AL QUE TE DICE QUE DUERMAS MENOS"
crema ("MENOS" celeste); el gurú chiquito señalando y gritando; en 2.0 un avioncito de
compartir celeste vuela hasta él, el gurú se queda dormido (ojos cerrados, brazo caído, se ladea)
y le salen "Z" celestes que suben y bajan hasta el final. Etiquetas "COMPARTILO" y "Y DORMÍ TRANQUILO".
