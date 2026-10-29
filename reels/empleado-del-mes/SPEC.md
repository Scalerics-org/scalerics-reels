# Reel "Empleado del mes": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: el AGENTE DE IA (atiende por WhatsApp con tus
precios, stock y horarios, a cualquier hora), nombrado una vez, al final. Formato P (personaje de
la cultura popular): una GALA DE PREMIOS de TV, con presentador, sobre dorado, estatuilla y
aplausos.

Gancho: el PRESENTADOR (voz Charon, de gala) abre el sobre: "Y el empleado del mes es... No,
Marcelo. No sos vos. Sentate." MARCELO (voz Puck), el empleado que deja en visto, se para
indignado: "¿Cómo que no? ¡Si vengo todos los días!". El presentador le lee el prontuario: contesta
a los tres días con "¿Precio? Consultá.", dejó en visto a la clienta del sábado. "¡Estaba en el
baño!" "Todo el sábado, Marcelo." (risas). Méritos del ganador: atendió un domingo a las tres de
la mañana, contestó precios, stock y horarios al instante, agendó los turnos, le escribió a la
clienta que había dejado de venir y le pasó al dueño la charla que era para él. "El ganador es...
¡tu agente de IA!" (aplausos). El AGENTE (voz Kore) agradece: "Le dedico este premio a todos los
que me escribieron un feriado. Y a Marcelo, que me enseñó todo lo que no hay que hacer." (risas).
GIRO: "¿Y ahora qué? ¿Me echan?" "No. Ahora atendés el mostrador. Mirando a la gente. Sin el
celular en la mano." Marcelo: "Che... la señora me sonrió." Cierra Orus (Scalerics): "En
Scalerics hacemos agentes de IA que atienden tu WhatsApp con tus precios, tu stock y tus
horarios, a cualquier hora. Y tu gente atiende a la gente. Etiquetá a tu Marcelo."
Voz de 69.3 s, reel de 72.5 s.

## RECURSO VISUAL CENTRAL: la GALA y el APLAUSÓMETRO
Escenario de gala: telón bordó de terciopelo al fondo (lo pinta el index), cortinas laterales con
lazos dorados, cenefa con flecos dorados arriba, una MARQUESINA con lamparitas "EMPLEADO DEL MES"
(y 70-200), dos FOCOS dorados que barren desde las esquinas, alfombra roja abajo (index, y 1520+).
Todo eso lo pone `ambiente.html`, que además tiene:
- Abajo a la izquierda (x 90-430, y 1540-1700): rótulo de transmisión "EN VIVO" con punto que late
  y el nombre del rubro "GALA ANUAL DEL LOCAL".
- Abajo a la derecha (x 820-990, y 1530-1710): el APLAUSÓMETRO, una aguja en un medidor de media
  luna (crema y dorado) que sube y baja con el público: baja en "No sos vos" (4.4), sube con las
  risas (18.3), se va al máximo en "IA" (35.9), risas (45.9), "sonrió" (56.6) y final (68.6).
- CONFETI dorado y crema que cae en 35.9 (ganador) y en 68.6 (cierre); FLASH en 3.3 ("No,
  Marcelo") y 35.9.
No pongas nada tuyo en esas dos esquinas de abajo.

## Personajes (siempre iguales, dibujados genéricos, sin caras de nadie real)
- PRESENTADOR: silueta negra `#0a0708` con contorno crema, smoking con solapas, moño dorado,
  peinado para atrás con un brillo dorado; detrás de un ATRIL dorado con una estrella. Lleva el
  SOBRE dorado con sello bordó.
- MARCELO: silueta negra con contorno crema, pelo parado/despeinado, remera con un cartelito
  crema "MARCELO" en el pecho, y un CELULAR siempre en la mano (pantalla con brillo dorado).
- AGENTE DE IA: un GLOBO DE CHAT crema-sobre-negro con contorno dorado grueso, colita abajo a la
  izquierda, dos ojos ovalados crema que parpadean, una boquita que habla, y moño dorado debajo.
  Cuando gana, sostiene la ESTATUILLA (figura dorada estilizada con un globito de chat en la mano,
  sobre base negra con placa "EMPLEADO DEL MES").

## Estilo: GALA DE TV. Edición CARGADA.
Dibujos de líneas gruesas crema con rellenos planos (como el-roast), palabras clave GIGANTES que
caen en su palabra (Lexend 900, mayúsculas, con contorno negro grueso `paint-order: stroke`),
destellos dorados (estrellitas de 4 puntas), sacudones en los golpes. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Bordó `#6b0f1e` / bordó oscuro `#3d0710` / alfombra `#8c1022`: telón, sellos, lo que está mal,
  tachaduras.
- Dorado `#f2c14e` (sombra dorada `#b8862b`): sobre, estatuilla, atril, focos, lo bueno, acento de
  subtítulos. Con brillo (text-shadow/drop-shadow dorado) 1-2 cosas por escena.
- Negro `#0a0708`: siluetas, rellenos, contornos de textos.
- Crema `#f4ead5`: textos grandes y trazos de los dibujos.
- Desde s12 (Scalerics) se suma verde Scalerics `#5ce611` para lo que funciona (tildes, chat).
Prohibido: emojis, fotos, rayas largas (—) visibles, logos reales (WhatsApp solo nombrado; el
chat es un globo genérico), neón rosa, ladrillo.

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos y UI. Nada que haya que leer de
menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420). Marquesina y 70-200. Contenido de cada escena entre y 560 y
1500, x 100-980 (cortinas x 0-90 y 990-1080). Esquinas de abajo: ambiente. Logo y ~1746.

## Sonidos extra
`aplausos` (aplauso de público, 3.2 s), `risas` (2.8 s), `uuh` (1.9 s), `redoble` (ba-dum-tss,
1.3 s), `beep`, `riser`, `impact-bass-1/2`, `sparkle`, `chime`. Van en el `.sfx.json` de la
escena donde caen.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la gala con la paleta de arriba,
> rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación con snapshot y check.

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

**s01-sobre (6.16 s). EL GANCHO.** Cuadro 0: el PRESENTADOR ya está en el atril (derecha, x
600-960, y 820-1480) con el SOBRE dorado a medio abrir; a la izquierda, en primera fila, la
cabeza y hombros de MARCELO de espaldas/perfil, sentado (x 140-460, y 1180-1480), con el celular
brillando. "Y el empleado del mes es..." (0-1.23): cae "EL EMPLEADO DEL MES ES..." en dos
líneas (crema, y ~600-760), el sobre se abre y sale la TARJETA. Suspenso (1.3-3.3): Marcelo se
acomoda el pelo y se empieza a parar, sonriendo; tres puntitos que laten; los focos lo apuntan.
"No, Marcelo" (3.31): golpe: sobre la tarjeta aparece "MARCELO" TACHADO con una X bordó; flash
(ambiente). "No sos vos" (3.96-4.43): "NO SOS VOS." gigante bordó con contorno; Marcelo queda
congelado, se le cae el celular; `uuh`. "Sentate." (5.10): el presentador señala abajo y Marcelo
se hunde de golpe en el asiento (y +120), sacudón.

**s02-marcelo (2.55 s).** Marcelo de cuerpo entero, parado, indignado (centro), con el cartelito
"MARCELO" en el pecho y el celular en alto; globo de grito con borde bordó "¡SI VENGO TODOS LOS
DÍAS!" que entra palabra a palabra ("todos" 1.23, "días" 1.52); en "¿Cómo que no?" (0-0.38) se
para de un salto con líneas de enojo.

**s03-prontuario (7.36 s).** "Venís." (0): una TARJETA DE ASISTENCIA (fichero) con tildes en
todos los días, sellada "PRESENTE". "Contestás a los tres días" (0.93-1.79): la tarjeta sale y
entra un CELULAR grande (crema): burbuja del cliente "Hola, ¿precio?" con hora LUN; en "tres
días" las hojas de un calendario pasan rápido LUN→MAR→MIÉ→JUE. "¿Precio? Consultá." (2.54-3.34):
aparece la respuesta de Marcelo "consultá" (minúscula, seca) y un sello bordó "3 DÍAS DESPUÉS".
"Y a la clienta del sábado" (4.48-5.27): segunda burbuja "¿Abren el sábado?" con etiqueta SÁB.
"la dejaste en visto" (6.01-6.52): dos tildes y sello gigante bordó "VISTO" que tiembla.

**s04-bano (4.25 s).** "¡Estaba en el baño!" (0-0.5): una PUERTA de baño (cartel "BAÑO" en
crema) y detrás de la puerta asoma Marcelo con el celular iluminándole la cara; globo chico "¡ESTABA EN EL
BAÑO!". "Todo el sábado, Marcelo" (1.43-2.19): un RELOJ de pared arriba de la puerta gira las
agujas a toda velocidad, un rollo de papel que se termina; "TODO EL SÁBADO" gigante dorado;
risas + redoble al final (ambiente sube el aplausómetro en 18.3 = 2.23).

**s05-meritos (8.42 s).** El presentador desenrolla un PERGAMINO dorado "MÉRITOS DEL GANADOR"
(0.18). Los méritos entran como renglones con tilde dorado y un dibujito cada uno: "DOMINGO 3:00
AM" con luna y estrellas (2.33-3.28; la luna hace pop en "mañana"); "PRECIOS · STOCK ·
HORARIOS" con tres fichitas que se dan vuelta (4.49, 5.00, 5.69) y "AL INSTANTE" con un rayo
(6.21); "TURNOS AGENDADOS" con una agenda de tres renglones que se tildan solos (7.11-7.50).

**s06-clienta (5.11 s).** "Le escribió a la clienta que había dejado de venir" (0-1.58): globo
de chat "¡Hola! Hace rato que no te vemos. ¿Te guardamos lo de siempre?" llega a la silueta de
una CLIENTA con cartera (izquierda); en "venir" ella sonríe y vuelve (camina hacia la puerta, un
corazoncito dorado). "Y cuando la charla era para el dueño, se la pasó" (1.76-4.26): la burbuja
de conversación viaja en arco (como un pase de fútbol) hasta la silueta del DUEÑO con delantal
(derecha), que la agarra; en "pasó" un cartelito "PARA VOS, JEFE".

**s07-ganador (4.10 s). EL GANADOR.** "El ganador es..." (0-0.52): el sobre en primer plano, la
mano lo abre; riser; los focos se cruzan. "¡tu agente de IA!" (1.39-2.08): explota: la TARJETA
gira y muestra al AGENTE (globo con ojos y moño) y debajo "TU AGENTE DE IA" gigante dorado con
brillo; confeti y flash (ambiente, 35.9 = 2.08), aplausos; el agente salta de alegría.

**s08-discurso (5.22 s).** El AGENTE en el atril con la ESTATUILLA al lado, un micrófono de pie
chico. "Gracias, gracias" (0-0.73): hace reverencias (se inclina dos veces), parpadea. "Le dedico
este premio" (1.82-2.46): levanta la estatuilla con una manito de trazo. "a todos los que me
escribieron un feriado" (2.91-4.27): alrededor llueven globitos de mensajes de clientes y una
hoja de calendario dorada "FERIADO" que hace pop en "feriado".

**s09-ensenio (3.87 s).** "Y a Marcelo" (0-0.14): corte a Marcelo en la platea, que sonríe y se
señala halagado. "que me enseñó todo lo que no hay que hacer" (0.78-2.69): al lado un pizarrón
negro con marco dorado "LO QUE NO HAY QUE HACER" y tres renglones que se escriben y se tachan en
bordó: "DEJAR EN VISTO", "CONSULTÁ", "ESTABA EN EL BAÑO"; en "hacer" la sonrisa de Marcelo se
cae; risas (ambiente 45.9).

**s10-echan (8.25 s). EL GIRO.** "¿Y ahora qué? ¿Me echan?" (0-0.95): Marcelo chiquito en el
centro del foco, temblando, una gota de sudor, "¿ME ECHAN?" con letras que tiemblan. "No."
(2.25): el presentador niega con la mano, "NO." crema. "Ahora atendés el mostrador" (3.13-3.86):
aparece un MOSTRADOR de local (madera bordó, tope dorado, caja registradora) y Marcelo
detrás. "Mirando a la gente" (4.97-5.46): enfrente aparece la silueta de una SEÑORA con bolsa;
línea punteada de miradas entre los dos. "Sin el celular en la mano" (6.42-7.34): el celular de
Marcelo vuela a un cajón que se cierra (o una X bordó sobre el celular); manos libres.

**s11-sonrio (2.96 s).** Primer plano de la SEÑORA del otro lado del mostrador: "Che..." (0):
Marcelo la mira; "la señora me sonrió" (0.80-1.30): la señora sonríe (la boca se curva), un
destello dorado, corazoncito, y Marcelo se pone colorado (cachetes bordó); en el pecho de Marcelo
aparece una escarapela dorada "MENCIÓN ESPECIAL"; aplausos suaves.

**s12-scalerics (9.58 s). Entra Scalerics (Orus).** "En Scalerics hacemos agentes de IA"
(0-1.95): un CELULAR grande (crema) con el AGENTE (el globo con moño, chiquito) arriba como
avatar. "que atienden tu WhatsApp" (2.42-3.06): un chat genérico (sin logo): cliente "¿Tenés en
talle M?" y el agente responde al instante con tilde verde. "con tus precios, tu stock y tus
horarios" (4.07, 4.81, 5.56): tres fichitas con tilde verde "PRECIOS", "STOCK", "HORARIOS".
"a cualquier hora" (6.39-6.76): un relojito que gira con luna y sol. "Y tu gente atiende a la
gente" (7.50-8.89): el celular se hace a un lado y aparece Marcelo en el mostrador con la señora
(chiquitos), con un corazoncito.

**s13-cta (4.69 s).** "Etiquetá a tu Marcelo" (0-0.79): "ETIQUETÁ A TU" crema y "MARCELO"
gigante dorado con brillo; un cartelito tipo etiqueta de Instagram "@ tu Marcelo" que se pega
sobre la silueta de Marcelo con su celular (que sonríe y saluda); la estatuilla gira al costado;
confeti (ambiente) y aplausos los últimos ~3 s. Sin salida con blur: el reel termina ahí.
