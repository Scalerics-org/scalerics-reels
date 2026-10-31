# La trasnoche · Agente de IA · programa de radio de trasnoche ("Corazones de Medianoche")

**De qué trata.** Gancho de HUGO, el locutor meloso (Enceladus): "Esta noche, tus clientes llaman a
la radio para hablar de vos. Y no te va a gustar." "Corazones de Medianoche", AM de madrugada,
para corazones solitarios. Llama CARMEN (Gacrux, señora con ruleros): hace meses que no va a la
panadería de Raúl "y nadie me extrañó. Ni un mensajito." Hugo, galán: "¿Ni un 'Carmen, tengo
bizcochos calentitos'?" "Veinte años de flautitas, y ni me buscó." "Más triste que el final de
Titanic." Llama MATÍAS (Puck): preguntó el precio de una heladera, le contestaron "y nunca más".
"Te ghostearon, Matías." Entra RAÚL, el panadero (Charon), tapado de harina: "¡Yo pensé que te
habías ido por el precio!" GIRO: Carmen: "¿Por el precio? Me fui porque nadie me extrañó." Raúl:
"¡Estoy solo! Amaso a las cuatro, atiendo, hago la caja. ¿Cuándo le escribo?" Hugo: "Raúl no es
frío, corazones. Está tapado de harina." Entra Orus (Scalerics): el agente de IA le escribe al
que dejó de venir y le hace el seguimiento al que preguntó y no compró, por WhatsApp, a cualquier
hora, mientras vos amasás. Carmen vuelve a llamar: "¡Me escribieron! Mañana voy por bizcochos."
Cierre de Hugo: "Y vos: dedicale este video a ese cliente que hace meses que no ves."

**Formato:** P (personaje de la cultura popular: programa de radio de trasnoche de corazones
solitarios, inventado) · cinco voces (Hugo Enceladus, Carmen Gacrux, Matías Puck, Raúl Charon,
Orus). 189 palabras; voz de 74.4 s, reel de 77.6 s (partes en `partes/`: `voces.sh` →
`recortar.sh` → `pausas.sh` → `tiempos.sh` → `componer.mjs`, con atempo por voz y tiempos
corregidos a mano en 05, 08 y 11).
**Recurso visual central:** EL ESTUDIO DE RADIO AM DE MADRUGADA. Paneles de madera bordó con el
brillo ámbar del dial (fondo de `armar.mjs`) y la capa fija `compositions/ambiente.html`: la luz
roja AL AIRE que late + "Corazones de Medianoche" + la hora de la madrugada (02:14 que avanza)
arriba; abajo el DIAL ámbar con la aguja que busca la emisora (AM 1270) y las tres LÍNEAS del
teléfono (Carmen, Matías, Raúl), que titilan rojo cuando suena y quedan ámbar mientras habla esa
persona. Las escenas alternan a Hugo con su micrófono de pie con los que llaman (con el tubo del
teléfono de línea con cable en rulos) y "lo que cuentan" (la panadería, el chat vacío, el
corazón partido, la heladera-fantasma, la carta manuscrita).

## Paleta (manda sobre SPEC-base)
- Negro cálido `#140b09`: fondo, contornos (7px, caps redondos), textos sobre claro.
- Ámbar `#ffb03b`: el dial, Hugo, el acento principal, el agente de IA, Scalerics.
- Bordó `#7d1f2b` (y `#a8323f`): el saco de Hugo, la bata de Carmen, los paneles, cabeceras de chat.
- Rojo AL AIRE `#ff3b2f`: la luz AL AIRE, Raúl, sellos, corazones, el teléfono que suena.
- Crema `#f5e6c8`: textos, papel de la carta, gorro y delantal de Raúl, tubos de teléfono.
- (Detalles: madera `#3a2018`, metal `#cbbba5`, coral `#ff7a6b` para Carmen en subtítulos,
  celeste `#9fd0e8` solo para lágrimas y el cartel FRÍO.)
- Brillo (box-shadow) SOLO en la luz AL AIRE y el dial.

## Tipografía
- Subtítulos: Lexend 600, 52px, crema con sombra negra; arriba de cada grupo una pastilla mono con
  quién habla (HUGO · AL AIRE ámbar, LÍNEA 1 · CARMEN coral, LÍNEA 2 · MATÍAS crema, LÍNEA 3 · RAÚL
  rojo, SCALERICS crema con borde ámbar). El acento con el color de quien habla. Lo arma armar.mjs.
- Carteles: Lexend 900 mayúsculas (`.rd-grueso`), sellos `.rd-sello`, `.rd-alaire`.
- Carta y textos soñados: Caveat 700 (`.rd-mano`). UI y etiquetas: IBM Plex Mono 600.

## Capas fijas
- `compositions/ambiente.html` (encima de las escenas, debajo de los subtítulos): viñeta, barra de
  arriba (y 96-156), dial (y 1392-1510), líneas (y 1538-1608). Las escenas NO dibujan ahí.
- Etiqueta de cada escena: `.rd-etiqueta` (top 1268), pastilla mono con borde ámbar.
- Música: `assets/bgm/musica.mp3`, sintetizada con `partes/musica.mjs` (bolero/lounge de piano
  eléctrico con trémolo, bajo, shaker y crujido de AM; desde Orus, 56.0 s, acordes mayores), vol 0.09.
- SFX extra: ring (teléfono), estatica, drama, uuh, tic, beep.

## Personajes (`assets/radio.js`, 440 x 800, base en y 800; meter en `<g transform>`)
- HUGO: pelo negro engominado con canas en las sienes, bigote finito, ojos entornados de galán,
  saco bordó con solapas, pañuelo ámbar, auriculares retro.
- CARMEN: pelo batido con canas, ruleros ámbar, anteojos bordó, aros de perla, bata bordó a
  lunares con cuello crema, tubo del teléfono en la oreja (`tubo: false` para sacarlo).
- MATÍAS: pelo castaño despeinado, buzo canguro gris, celular en la oreja.
- RAÚL: gorro de panadero, bigote, harina en la cara y los brazos, delantal crema (`tubo: true`).
- Objetos: `RD.mic()`, `RD.telefono()`, `RD.corazon()`, `RD.ventana()`, `RD.consola()`,
  `RD.hoja()`; kit `pop golpe entra sale sacudon suena dibujar habla parpadeo respira mece late
  titila prende etiqueta contar escribe salida`.
- OJO (trampa pagada acá): no animar x/y/scale de un `<g>` que tiene `transform="translate() scale()"`
  (GSAP le pisa el transform): envolverlo en otro `<g>` y animar el de afuera. Los `svgOrigin`
  van en las coordenadas del padre del elemento (para las piezas de adentro de un personaje,
  las coordenadas locales 440 x 800).
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



## Escenas (tiempos relativos: ver `tiempos.md`)

**s01-gancho** (5.74 s) · Hugo a la izquierda con su micrófono de pie, la luz AL AIRE grande que se
prende arriba a la derecha (cuadro 0 ya medio prendida) y una ventana con luna. En "clientes" (1.08)
aparece el teléfono de línea y en "llaman" (1.54) suena (tiembla, rayitas rojas). En "radio" (2.08)
salen ondas ámbar del micrófono. En "vos" (3.08) golpe del "VOS" gigante ámbar. En "gustar" (4.54)
sello rojo "NO TE VA A GUSTAR" con sacudón. Etiqueta: "AM 1270 · 02:14" → "LLAMAN TUS CLIENTES".

**s02-medianoche** (4.93 s) · Radio capilla de madera con dial que se prende. En "corazones" (0.88)
un corazón rojo late en la rejilla; en "solitarios" (1.39) corazoncitos sueltos suben; en
"Corazones de Medianoche" (3.11) golpe del título gigante crema/ámbar con brillo.

**s03-carmen** (4.92 s) · Carmen con ruleros y el tubo, entra. En "Carmen" (1.31) se le mueven los
ruleros. En "Hace meses" (2.28) un almanaque se deshoja JUL, AGO, SEP y queda OCT. En "panadería"
(3.77) globo de pensamiento con la Panadería Raúl (toldo a rayas bordó/crema).

**s04-mensajito** (3.55 s) · Celular con el chat "Panadería Raúl": chip JULIO y el último globo de
Carmen "¡Hasta mañana, Raúl!". En "nadie" (0.49) "· · · nada · · ·" y grillos; en "extrañó" (0.98)
un corazón se parte en dos; en "mensajito" (2.21) sello "NI UN MENSAJITO".

**s05-bizcochos** (3.48 s) · Hugo galán (cejas que suben y bajan). En "Carmen" (0.90) globo soñado
con letra manuscrita que se escribe: "Carmen, tengo bizcochos calentitos...". En "bizcochos" (1.84)
la bandeja de bizcochos; en "calentitos" (2.30) humo que se dibuja y corazoncitos.

**s06-flautitas** (5.34 s) · Carmen a la derecha niega con la cabeza en "Nada". En "Veinte" (0.87)
golpe "20 AÑOS DE FLAUTITAS"; en "flautitas" (1.52) una pila de flautitas cae de a una. En "buscó"
(3.90) la de arriba se parte, lágrimas. Etiqueta "CLIENTA DE TODA LA VIDA" → "Y NI LA BUSCÓ".

**s07-titanic** (2.97 s) · Hugo llora con un pañuelo. En "final" (0.54) un cuadrito nocturno con un
barco genérico de cuatro chimeneas que en "Titanic" (0.84) se inclina y se hunde. En "Otra llamada"
(1.82) suena el teléfono de la línea 2.

**s08-heladera** (4.63 s) · Matías con el celu en la oreja; a la derecha el chat "Electro del Barrio".
"precio" (1.33) su globo "¿Precio de la heladera?"; "contestaron" (2.58) "¡Hola! Está en oferta.
¿Te la reservo?"; "Lo pienso y te aviso". En "nunca más" (3.75) chips "UNA SEMANA DESPUÉS" y "UN MES
DESPUÉS · NADA" y una telaraña que se dibuja en la esquina.

**s09-fantasma** (4.22 s) · "ghostearon": una heladera disfrazada de fantasma (sábana con ojos) flota;
Hugo chiquito a la izquierda; en "Matías" (0.92) sello "GHOSTEADO". En "Pará" (2.16) el fantasma se
va; en "está llamando" (2.69) suena un teléfono rojo grande y en "Raúl" (3.15) golpe "LÍNEA 3 · RAÚL".

**s10-precio** (6.97 s) · Pantalla partida de dos llamadas: Raúl (rojo) y Carmen (coral). Raúl grita
"¡Carmen!"; en "precio" (2.13) una etiqueta "$" se balancea a su lado. En "¿Por el precio?" (3.06)
se apaga Raúl, se prende Carmen y la etiqueta se tacha con una X roja (3.45). En "nadie" (4.95) un
corazón en el medio y en "extrañó" (5.44) se parte. En "Raúl" (5.85) él se queda helado.

**s11-solo** (5.86 s) · Raúl solo bajo un foco que se prende en "solo" (0.26). Alrededor aparecen
sus tareas: "Amaso" (1.71) el bol (y amasa sin parar), "cuatro" (2.30) el reloj de las 4:00, "atiendo"
(2.63) la campanita, "caja" (3.43) la caja registradora. En "¿Cuándo le escribo?" (4.59) un celu con
un "?" late arriba de su cabeza; las tareas se apagan; gotas de sudor.

**s12-harina** (3.40 s) · Hugo consuela a la izquierda, Raúl a la derecha. En "frío" (0.54) cartel
celeste "FRÍO" con copo que se tacha en "corazones" (0.92). En "tapado de harina" (1.92-2.31) una
nube de harina lo tapa y solo le quedan los ojitos. Etiqueta "NO ES FRÍO · ESTÁ SOLO".

**s13-agente** (3.83 s) · Entra Orus: se prende una luz más cálida y sube el celular con el chat
"Carmen". Pastilla "AGENTE DE IA · ATENDIENDO" que late; "escribiendo..." y el mensaje del agente:
"¡Hola, Carmen! Hace rato que no te vemos. Mañana salen bizcochos calentitos. ¿Te guardo media
docena?" (03:12). En "dejó de venir" (3.30) el dato "NO VIENE DESDE JULIO".

**s14-seguimiento** (5.81 s) · El mismo celular, ahora el chat de Matías (Electro del Barrio): en
"seguimiento" (0.78) "¡Hola, Matías! ¿Pudiste pensar lo de la heladera? Te la guardo hasta el
viernes." (03:40); "PREGUNTÓ · NO COMPRÓ"; Matías: "¡Dale! Paso mañana."; en "WhatsApp" (3.04)
"WHATSAPP · A CUALQUIER HORA". En "mientras vos amasás" (4.34) el celu se corre y aparece Raúl
amasando tranquilo con una notita musical.

**s15-me-escribieron** (4.06 s) · Carmen salta de alegría (ruleros que bailan), suena la línea 1.
En "escribieron" (0.90) la notificación "Panadería Raúl · ¿Te guardo media docena?" y corazones;
en "Mañana" (2.21) la bolsa de bizcochos y en "bizcochos" (2.79) sello ámbar "¡VUELVE!".

**s16-cta** (7.90 s) · Hugo con el micrófono. En "dedicale" (0.73) entra una carta en papel rayado y
se escribe a mano "Para:"; en "video" (1.54) sello ámbar "DEDICALE ESTE VIDEO"; "ese cliente que
hace meses que no ves" se escribe a mano mientras lo dice; después "Te extrañamos.", un corazón que
late y un avioncito de papel que sale volando (mandáselo). Queda ~3.6 s quieto con movimiento suave.
