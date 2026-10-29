# Reel "El millón": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto: el AGENTE DE IA (contesta el WhatsApp del comercio
al instante, a cualquier hora, con sus precios y su stock, y le pasa la charla al dueño cuando es
para él), nombrado una vez, al final. Formato E (pregunta al que mira) en clave de CONCURSO DE
PREGUNTAS DE TV, tipo "el millón" (genérico: sin nombre ni logo de ningún programa real).

El CONDUCTOR (voz Algenib, grave, de show) lanza la pregunta final: "Por el millón: ¿por qué tu
cliente le compró al de enfrente? A: el dólar. B: el precio. C: el de enfrente es más lindo. D: le
contestaron primero." El DUEÑO concursante (voz Charon, nervioso, transpirando): "Eh... ¿puedo usar
un comodín?" "Llamada a un amigo." El AMIGO (voz Puck) atiende: "¿Hola? Ahora no puedo. Te contesto
el lunes." "Cincuenta y cincuenta." (se van la A y la C) "¡Me sacó el dólar! ¿Y ahora a quién le
echo la culpa? ¡Pregunta al público!" EL PÚBLICO (cuatro voces encimadas): "¡La D!". El conductor
para el reloj y mira a cámara: "Tiempo. ¿Y vos, que estás mirando? ¿Qué respondés?" (1.4 s de
silencio con el reloj: el que mira piensa). El dueño: "La B. El precio. Respuesta final."
"Respuesta... incorrecta. Es la D." GIRO: "Su cliente les escribió a los dos a las once de la
noche. El de enfrente le contestó al instante, con su agente de IA. Usted, al otro día a las
nueve." "¡Pero a las once yo duermo!" "Él también. Su agente no. Su mercadería es mejor, señor.
Pero perdió en la pregunta fácil." Cierra ORUS (narrador de Scalerics): "En Scalerics hacemos tu
agente de IA: contesta tu WhatsApp al instante, a cualquier hora, con tus precios y tu stock, y te
pasa la charla cuando es para vos. ¿Vos qué respondías? Comentá A, B, C o D."
Voz de 73.3 s, reel de 76.54 s.

## RECURSO VISUAL CENTRAL: los ROMBOS DE RESPUESTA
Las cuatro respuestas son los ROMBOS clásicos de concurso: barras horizontales con las puntas en
pico (hexágono alargado), relleno azul noche `#0a1135`, borde dorado `#f2c14e` de 5 px, una línea
dorada fina que sale de cada punta hasta el borde de la pantalla, la letra en dorado ("A:") y el
texto en hueso (Lexend 700). En 2x2 (como en la tele) o en columna. Estados:
- normal: azul con borde dorado;
- ELEGIDA: relleno NARANJA `#ff8a1f`, texto noche (s07 en "B");
- CORRECTA: relleno VERDE `#5ce611`, texto noche, titila 3 veces (s07 en "D");
- eliminada (50 y 50): se vacía (solo queda el borde apagado, sin texto).
La PREGUNTA va en un rombo más grande y más alto arriba de las respuestas.

## ESTILO: GAME SHOW DE TV. Edición CARGADA.
Estudio oscuro azul (lo pinta el index: azul noche con resplandor azul al centro y un piso
redondo con brillo abajo). `ambiente.html` pone:
- HACES DE LUZ: cuatro conos de luz azul-blanca que bajan desde arriba y barren lento; en
  "incorrecta" (39.07) se ponen naranjas un instante; en la D correcta (40.91) verdes.
- Arriba (y 70-200) la PLACA del programa: hexágono alargado azul con borde dorado, "EL MILLÓN"
  (Lexend 900 dorado) y abajo "PREGUNTA FINAL" (mono hueso espaciado).
- Abajo al centro (y 1560-1690) los TRES COMODINES: círculos azules con borde dorado, con ícono
  hueso: teléfono (llamada), "50:50", y tres barritas (público). Cuando se usa uno, salta y brilla
  en dorado; después queda tachado con una X naranja y apagado: llamada en "Llamada" (14.94) y
  tachado en 20.0; 50:50 en "Cincuenta" (20.23) y tachado en 21.6; público en "Pregunta" (25.90) y
  tachado en 28.6. Se van cuando entra Orus (60.0).
- FLASHES blancos en "millón" (0.36), naranja en "incorrecta" (39.07), verde en "D" (40.91).
- Onomatopeyas del público: "UUUH" naranja en "incorrecta" (39.2), "JA JA JA" en "Su agente no"
  (54.3), "¡OOOH!" en "fácil" (58.6), "APLAUSOS" en el cierre (71.1).
No pongas nada tuyo abajo (y > 1520) ni arriba de y 560.

## Personajes (siempre iguales, dibujados genéricos, sin caras de nadie real)
- CONDUCTOR: silueta noche `#070b24` con contorno hueso, traje con solapas, corbata dorada, pelo
  peinado para atrás con brillo, y una TARJETITA de preguntas en la mano. Cejas que suben (dos
  trazos hueso) cuando hace suspenso.
- DUEÑO CONCURSANTE: silueta noche con contorno hueso, pelado arriba con dos mechones, DELANTAL
  hueso (es el dueño del local), sentado en la BANQUETA alta de concurso; GOTAS de sudor azul
  claro (hueso con opacidad) que le saltan de la cabeza cuando duda.
- EL AMIGO (s03): solo su CELULAR con su globo de llamada.
- EL DE ENFRENTE y su AGENTE DE IA (s08-s09): un local con toldo y, adentro de un celular, un
  globo de chat verde con dos ojitos (el agente).

## Paleta (SOLO estos colores)
- Noche `#070b24` (y `#0a1135` para rellenos de rombos): fondo, siluetas, contornos de textos.
- Azul estudio `#1e46c8`: comodines, rellenos, haces de luz, reloj.
- Dorado `#f2c14e`: bordes de rombos, letras A-D, placa, lo valioso, acento de subtítulos.
- Hueso `#f4f1e8`: trazos de los dibujos, textos.
- Naranja `#ff8a1f`: la respuesta ELEGIDA, lo que sale mal, la X de los comodines usados, el
  "INCORRECTA".
- Verde Scalerics `#5ce611`: la respuesta CORRECTA (D) y todo lo del agente de IA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales (WhatsApp solo como
burbujas de chat genéricas y tildes), caras de personas, nombre o logo de un programa real.

## Tipos de letra
Lexend 700-900 para lo grande (con `-webkit-text-stroke` noche + `paint-order: stroke fill`, estilo
zócalo de TV); IBM Plex Mono 500 para rótulos, reloj y UI. Nada que haya que leer de menos de 26px
(lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420); la placa en y 70-200. Contenido de cada escena entre y 560 y
1500, x 40-1040. Abajo (y 1530-1700) los comodines del ambiente. Logo de Scalerics en y ~1746.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): estudio azul noche, resplandor, piso.
- `compositions/ambiente.html` (+ `ambiente.sfx.json`), `compositions/subtitulos.html`.

## Sonidos extra de este reel
`tic` (tic de reloj, 0.1 s), `buzzer` (chicharra de respuesta incorrecta, 0.78 s), `correcta`
(arpegio de respuesta correcta, 1.2 s), `ring` (teléfono, 1.1 s), `redoble` (1.3 s), `uuh`,
`risas`, `aplausos`, `drama` (3 s: usar `max`), `subida`, `beep`, y los de siempre.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el estudio de concurso con la paleta
> de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
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




## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-pregunta (4.15 s).** Cuadro 0: el CONDUCTOR (cintura para arriba, a la izquierda, x 60-420,
y 900-1500) ya está, con la tarjetita en alto; un haz de luz lo baña. "millón" (0.36): FLASH,
"POR EL MILLÓN" gigante dorado cae de arriba con sacudón (y ~600) y destellos. "¿por qué" (1.0):
el ROMBO DE LA PREGUNTA (x 60-1020, y 760-900) se arma desde el centro hacia los costados (las
líneas doradas se dibujan) y el texto "¿POR QUÉ TU CLIENTE LE COMPRÓ AL DE ENFRENTE?" (dos
renglones, Lexend 800 hueso 44px) se escribe; "cliente" (1.70) y "enfrente" (3.32) en dorado con
pop. Al lado derecho, una ESCALERA DE PREMIOS chica (x 640-1000, y 960-1440): cinco escalones
"UN CAFÉ · LA CONSULTA · LA VENTA · EL CLIENTE · EL MILLÓN", la luz sube de a uno hasta EL MILLÓN
(en "enfrente"). Sonidos: impact + riser.

**s02-opciones (8.22 s).** El rombo de la pregunta queda arriba (y 590-700, más chico: "¿POR QUÉ TU
CLIENTE LE COMPRÓ AL DE ENFRENTE?" en un renglón de 34px). Las cuatro respuestas en COLUMNA
(x 80-1000, alto 120, y 760 / 900 / 1040 / 1180) entran deslizando desde los costados cada una en
su letra: "A:" (0.0) EL DÓLAR, "B:" (1.22) EL PRECIO, "C:" (2.70) EL DE ENFRENTE ES MÁS LINDO,
"D:" (5.36) LE CONTESTARON PRIMERO. Cada una brilla dorado al entrar y queda. En "dólar" (0.63) un
signo $ dorado salta en la A; en "lindo" (4.68) un destellito y un espejo de mano; en "primero"
(7.15) la D tiembla apenas (pista). Abajo (y 1330-1460), el dueño de espaldas en su banqueta mira
las respuestas (silueta chica). Sonidos: un "beep" por respuesta.

**s03-llamada (7.86 s).** "Eh..." (0.0): el DUEÑO grande (x 260-820, y 760-1480) en su banqueta,
con delantal, se seca la frente; GOTAS de sudor saltan; "¿puedo usar un comodín?" (1.23-1.76):
se agarra la cabeza, "¿COMODÍN?" en globo de pensamiento. "Llamada" (2.57): corte: un CELULAR
gigante (x 290-790, y 600-1470) con pantalla azul "LLAMANDO... · EL AMIGO" y ondas; suena ring.
"¿Hola?" (4.69): atiende (pantalla "EN LLAMADA 00:01"), globo de llamada blanco: "AHORA NO PUEDO"
(5.46); "Te contesto el lunes" (6.58): sello naranja torcido "EL LUNES" y un calendario que
arranca hojas. Sonido: ring, pop, buzzer suave en "lunes".

**s04-cincuenta (5.67 s).** "Cincuenta" (0.0): las cuatro respuestas en 2x2 (x 60-1020, y 760-1080)
y un "50:50" dorado gigante que gira y cae arriba (y ~600). "cincuenta" (0.77): la A y la C se
VACÍAN con un glitch (quedan los bordes apagados); quedan B "EL PRECIO" y D "LE CONTESTARON
PRIMERO". "¡Me sacó el dólar!" (2.14-2.79): abajo (y 1150-1480) el DUEÑO con los brazos en alto,
y un signo $ que se va volando (la A vacía larga una moneda que se cae). "¿a quién le echo la
culpa?" (3.69-4.73): el dueño señala a un lado y al otro; aparece un dedo acusador que gira y no
encuentra a nadie; "¿Y AHORA?" naranja. Sonidos: glitch-1, impact, whoosh.

**s05-publico (3.35 s).** "¡Pregunta al público!" (0.0-0.45): GRÁFICO DE BARRAS del público
(x 140-940, y 700-1400), cuatro columnas A B C D con base dorada; las barras suben: A, B y C
bajitas y la D sube en DORADO hasta arriba y desborda el gráfico.
"¡La D!" (1.73-2.08): "¡LA D!" gigante hueso con contorno noche, temblando, y cabecitas del
público (siluetas) gritando abajo. Sonidos: subida, impact en "D".

**s06-reloj (5.41 s).** "Tiempo." (0.0): el RELOJ de cuenta regresiva (círculo azul con borde
dorado, x 340-740, y 640-1040) se congela en 15 con un golpe. "¿Y vos, que estás mirando?"
(1.46-2.20): el CONDUCTOR (abajo, y 1050-1480) se da vuelta y SEÑALA A CÁMARA (el dedo en primer
plano crece). "¿Qué respondés?" (2.37-3.05): "¿Y VOS?" gigante dorado; las cuatro letras A B C D en
rombitos abajo del reloj. Desde 3.3 hasta el final (el silencio para pensar): el reloj CORRE de 5
a 0 con tic en cada segundo y el arco dorado que se vacía. Sonido: tic x5.

**s07-final (7.12 s).** Las cuatro respuestas en 2x2 (y 700-1020). "La B" (0.0-0.23): la B se pone
NARANJA (elegida) con un "clac"; "El precio" la B late. "Respuesta final" (1.40-1.92): el DUEÑO
(abajo, y 1100-1480) se tapa los ojos; cartel "RESPUESTA FINAL" (mono, naranja). "Respuesta..."
(3.03-4.40): suspenso: el conductor (silueta chica) cejas arriba; redoble; las luces bajan; la B
titila. "incorrecta" (4.41): la B se APAGA, "INCORRECTA" sello naranja torcido gigante, buzzer.
"Es la D." (5.88-6.25): la D se pone VERDE y titila 3 veces, destellos verdes, sonido correcta.

**s08-las-once (8.95 s).** Pantalla partida: dos CELULARES (izq "TU LOCAL", der "EL DE ENFRENTE",
x 60-500 y 580-1020, y 640-1440), y arriba al centro un RELOJ digital "23:00" con luna. "les
escribió a los dos" (0.15-1.25): en las dos pantallas aparece el mismo globo de la clienta
"¿TENÉS EN STOCK?" "once de la noche" (1.76-2.27): el reloj marca 23:00, se oscurece. "El de
enfrente le contestó al instante" (2.96-4.30): en la derecha aparecen tres puntitos y la
respuesta verde "¡SÍ! TE LO GUARDO" con doble tilde verde; "con su agente de IA" (4.89-5.57):
aparece el AGENTE (globito verde con ojitos) en la pantalla derecha y la etiqueta "AGENTE DE IA".
"Usted, al otro día a las nueve" (6.36-8.03): la pantalla izquierda: el reloj salta a "09:00",
sol; tu respuesta "Hola, sí" llega tarde, gris, y la clienta ya no está: "VISTO" naranja / globo
"YA COMPRÉ". Sonidos: notification, ping, pop, glitch.

**s09-duermo (4.21 s).** "¡Pero a las once yo duermo!" (0.0-0.84): el DUEÑO indignado, con
gorro de dormir que le aparece en "duermo" y "ZZZ". "Él también." (1.83-2.00): al lado, el DE
ENFRENTE (silueta con gorra) en una cama durmiendo, ZZZ. "Su agente no." (2.95-3.44): sobre la
mesita de luz del de enfrente, el CELULAR con el agente (globito verde con ojitos) bien despierto,
guiña un ojo, respondiendo; "NO DUERME" en verde. Sonido: pop, sparkle.

**s10-facil (5.14 s).** "Su mercadería es mejor, señor." (0.0-1.35): a la izquierda, un mostrador
con productos lindos dibujados y un sello dorado "MEJOR" (el conductor lo concede). "Pero perdió"
(2.22-2.73): la ESCALERA DE PREMIOS: la luz se desploma del MILLÓN hasta abajo; "en la pregunta
fácil" (3.30-3.55): "PREGUNTA FÁCIL" sello naranja gigante torcido con sacudón. Sonido: drama.

**s11-agente (9.43 s).** Entra el narrador de Scalerics: luces verdes. Un CELULAR grande al centro
(x 300-780, y 600-1460) con una conversación de WhatsApp genérica (burbujas, sin logos); el agente
(globito verde con ojitos) arriba. "contesta tu WhatsApp al instante" (2.68-3.82): llega mensaje y
respuesta verde al toque, doble tilde; "a cualquier hora" (4.41-5.02): reloj 03:12 en la barra;
"con tus precios y tu stock" (5.45-6.57): burbuja con lista "PRECIO · STOCK" con tildes verdes;
"te pasa la charla cuando es para vos" (7.16-8.94): una burbuja hace "pase" (flecha) a un
avatar del dueño con delantal: "ESTA ES PARA VOS". Etiqueta mono "TU AGENTE DE IA".

**s12-cta (7.03 s).** "¿Vos qué respondías?" (0.0-0.55): las cuatro respuestas en 2x2 de nuevo
(y 760-1080), la placa "¿VOS QUÉ RESPONDÍAS?" arriba (y 600). "Comentá" (1.58): un globo de
comentario gigante con cursor. "A, B, C o D" (2.12-3.65): cada letra se ilumina en su palabra
(dorado). Al final, todas laten y "COMENTÁ A, B, C O D" en mono abajo (y 1380-1460).
