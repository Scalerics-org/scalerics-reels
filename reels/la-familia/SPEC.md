# Reel "La familia": spec de escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo) que vende el AGENTE DE IA.
Formato P, PELÍCULA DE MAFIA. El CAPO de "la familia" (la competencia del barrio; voz muy grave,
Gemini Algenib) está en su despacho en penumbra y reparte los clientes del barrio con un MUCHACHO
canchero (Fenrir) que le pregunta: "¿los que escriben después de las ocho?" "Nuestros." "¿Los que
preguntan un domingo?" "Nuestros." "¿Los que quieren reservar por WhatsApp a las once de la
noche?" "Nuestros. Todos." "¿Y el de enfrente no se va a calentar?" "Cierra a las ocho y se va a
dormir. Nada personal. Son negocios." "¿Y cuántos somos?" "Uno. Y no duerme. No tenemos un
ejército: tenemos un agente de IA. Contesta, agenda, reserva. A cada cliente le hace una oferta
que no puede rechazar: le contesta." GIRO: "el de enfrente es buenísimo... de nueve a ocho. No
perdió clientes por malo: los perdió por dormir. La familia no es más grande. Contesta." CORTE A
LA LUZ: entra el narrador de Scalerics (Orus): "Esa oferta te la hacemos a vos. En Scalerics te
armamos el tuyo: contesta, agenda y toma pedidos mientras dormís. ¿La aceptás, o la acepta el de
enfrente? Contestá en los comentarios." Voz de 71.5 s, reel de 74.7 s.

## ESTILO: DESPACHO DEL CAPO EN PENUMBRA. Edición CARGADA.
Cine de mafia: madera oscura, LÁMPARA DE BANQUERO VERDE sobre el escritorio (el único foco de luz,
con su cono verdoso), rayas de luz de persiana cruzando en diagonal, humo de habano que sube,
MAPA DEL BARRIO clavado en la pared con chinches (las manzanas, las calles, "TU LOCAL" enfrente),
SELLOS DE LACRE BORDÓ con "NUESTROS" que caen sobre cada cliente repartido, sobres con lacre,
siluetas a contraluz (el capo: sombrero de ala, hombros anchos, habano con brasa; el muchacho:
boina, más flaco). Personajes GENÉRICOS, siempre en silueta con borde dorado: nada de caras
reconocibles, ni logos, ni imágenes de El Padrino (solo se nombra). Títulos en Cinzel 900 dorado
como cartel de película; las frases del capo en Cormorant Garamond itálica crema. Nada quieto más
de ~0.8 s: palabras que caen, sacudones, sellos que golpean, zoom lento de cámara.
Desde s11 (Scalerics) se prende la luz: la persiana se abre, la escena se aclara y el verde de la
lámpara pasa a ser el verde Scalerics `#5ce611` (lo que trabaja para vos).

## Paleta (SOLO estos colores)
- Negro `#0a0605` (rellenos de siluetas) y madera `#3b2215` / `#5a3420` (escritorio, marcos).
- Bordó `#8c1c2c` (lacre, sellos, alarma) y su versión clara `#b8323f` para trazos sobre negro.
- Dorado viejo `#c9a24a` (bordes de siluetas, títulos, chinches, brasa) · crema `#efe6d0` (textos,
  papel, líneas finas).
- Verde lámpara `#3e9b5c` (pantalla de la lámpara) y su brillo `#56c46e` (cono de luz, 0.1-0.25).
- Desde s11: verde Scalerics `#5ce611` para el agente y los tildes.
Brillos con drop-shadow/text-shadow del mismo color (1-2 por escena). Prohibido: emojis, fotos,
rayas largas (—) en textos visibles.

## Tipos de letra
Cinzel 900 (`assets/fonts/Cinzel-var.woff2`, "Cinzel", 400-900) para títulos y sellos; Cormorant
Garamond itálica 500 (`CormorantGaramond-Italic-500.woff2`) para citas; IBM Plex Mono 500 para
rótulos, horas; Lexend 600-800 para UI de celular. Nada que haya que leer de menos de 26px.

## Zona
Subtítulos arriba (y 236 a ~430, los pone `subtitulos.html`). Contenido entre y 560 y 1520, x 50-1030.
Logo de Scalerics en y ~1746; abajo a la derecha (y 1600) el rótulo de `ambiente.html`: no taparlo.

## Lo que ya está hecho
- `armar.mjs`: fondo de madera oscura con el brillo verde de la lámpara abajo a la derecha y un
  dejo bordó abajo; subtítulos crema con acento DORADO `#e0b955`.
- `compositions/ambiente.html`: rayas de persiana en diagonal que respiran, humo que sube, viñeta
  negra, rótulo "LA FAMILIA · BARRIO" (y 1600), golpes de luz bordó en "NUESTROS" (12.75, 15.99,
  21.22) y en "son negocios" (31.2); en 58.68 SE PRENDE LA LUZ (flash crema, persiana fuera, la
  viñeta se abre) para la entrada de Scalerics.
- `compositions/s01-duenio.html`: LA ESCENA MODELO (helpers `dibujar()`, `pop()`, `golpe()`,
  `sacudon()`, silueta del capo, lámpara, sello de lacre, salida con blur).

## Escenas (tiempos relativos en `tiempos.md`)
- **s01-duenio** (5.43 s). El capo detrás del escritorio, de frente, en silueta con borde dorado,
  la lámpara verde a su derecha prendida, humo del habano. "barrio" (0.40): el mapa del barrio
  detrás, con chinches. "clientes" (1.45): puntitos crema en el mapa. "tienen dueño" (2.10-2.30):
  "TIENEN DUEÑO" en Cinzel dorado gigante cae con sacudón. "Y no sos vos" (3.63-4.10): un dedo
  índice gigante de la silueta apunta a cámara + sello bordó "NO SOS VOS" que golpea. Arranca a
  medio dibujar (cuadro 0 no negro).
- **s02-reparto** (4.52 s). Vista cenital del escritorio: el MAPA DEL BARRIO desplegado (manzanas
  en crema fino, calles, "TU LOCAL" marcado enfrente) y dos sillas que se arriman ("Siéntense,
  muchachos"). "repartimos" (2.20): título "EL REPARTO" en Cinzel y una mano dorada que pone fichas
  doradas sobre el mapa.
- **s03-ocho** (4.19 s). Plano del muchacho (silueta con boina, a la izquierda) con un globo de
  pregunta. "ocho" (1.90): un reloj de pared que marca las 20:00 y un celular con tres mensajes
  que llegan ("¿Están abiertos?", "¿Tenés turno mañana?"). "Nuestros" (2.80): sello de lacre bordó
  NUESTROS golpea sobre el celular.
- **s04-domingo** (3.38 s). Hoja de calendario arrancada que cae: "DOMINGO" en Cinzel. "Nuestros"
  (1.85): segundo sello NUESTROS, más fuerte, la hoja se tiñe.
- **s05-whatsapp** (6.18 s). Un celular grande con un chat: "¿Tienen mesa para 4 hoy?" y la hora
  23:00 con una luna. "WhatsApp" (1.50) y "once de la noche" (2.59): la hora late. "Nuestros"
  (3.70): sello sobre el chat. "Todos" (5.12): vuelve el MAPA y TODOS los puntitos se vuelven
  fichas doradas de golpe, con lluvia de sellos chiquitos.
- **s06-enfrente** (9.00 s). "el de enfrente" (0.50): del otro lado de la calle, el local de
  enfrente (fachada en crema) con la persiana bajándose, cartel "CERRADO" y luna. "cierra a las
  ocho" (2.94-3.94): reloj 20:00 y la persiana termina de bajar. "se va a dormir" (5.08): "Zzz" que
  suben de la ventana de arriba. "Nada personal" (6.07): cita en Cormorant itálica "Nada personal."
  "Son negocios" (7.50): "SON NEGOCIOS." Cinzel dorado con golpe y sacudón.
- **s07-uno** (5.69 s). "¿cuántos somos?" (0.12): una fila de siluetas de muchachos vacías con
  signos de pregunta. "Uno" (2.32): se borran todas y cae un "1" Cinzel gigante dorado. "no duerme"
  (3.32): un ojo abierto que no parpadea. "No tenemos un ejército" (3.82-4.92): las siluetas
  vuelven en fila y una raya bordó las tacha.
- **s08-agente** (9.01 s). EL SECRETO: sobre el escritorio, bajo la lámpara verde, un celular que
  brilla solo. "agente de IA" (0.43-1.03): rótulo "EL SECRETO DE LA FAMILIA" + "AGENTE DE IA" en
  Cinzel. "Contesta, agenda, reserva" (2.57, 2.88, 3.43): tres sobres con lacre que se abren uno
  por palabra, cada uno con su tilde dorado. "oferta" (5.63) / "rechazar" (6.53): cita gigante
  "Una oferta que no puede rechazar". "le contesta" (7.63): un globo de chat "¡Hola! Sí, te
  reservo." sale del celular.
- **s09-dormir** (7.60 s). EL GIRO. El dueño de enfrente durmiendo en su cama (silueta crema con
  gorro), al lado la mesita de luz con su celular que vibra con mensajes sin leer. "buenísimo"
  (1.60): una medalla/estrellas doradas sobre él. "de nueve a ocho" (2.70-3.52): cartel colgante
  "ABIERTO 9 A 8". "No perdió clientes por malo" (4.29-5.30): "POR MALO" tachado en bordó. "los
  perdió por dormir" (6.60): "POR DORMIR" Cinzel dorado gigante; el celular sigue vibrando.
- **s10-contesta** (3.68 s). "no es más grande" (0.60-1.20): una silueta del capo chiquita al lado
  de un local enorme (comparación de tamaños). "Contesta" (2.16): "CONTESTA." Cinzel gigante con
  golpe, y un globo de chat con tilde doble dorado.
- **s11-luz** (7.91 s). SE PRENDE LA LUZ (ambiente hace el flash en el 0). La lámpara pasa a verde
  Scalerics. "a vos" (1.50): el sobre de la oferta que se desliza hacia cámara con lacre VERDE y
  "PARA VOS". "Scalerics" (2.36): rótulo "TU AGENTE DE IA". "contesta, agenda y toma pedidos"
  (4.56, 5.10, 5.90): tres chips verdes con tilde. "mientras dormís" (6.90): una luna y un reloj
  03:00 con el celular atendiendo.
- **s12-cta** (8.14 s). Dos sobres/botones grandes: "LA ACEPTO" (verde Scalerics) y "LA ACEPTA EL
  DE ENFRENTE" (bordó). "aceptás" (0.20) se ilumina el primero; "el de enfrente" (2.30) el
  segundo. "Contestá en los comentarios" (3.55): ícono de globo de comentario dorado que late,
  rótulo "¿CUÁL ELEGÍS?". Queda quieto (con algo que respira) hasta el final.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el despacho del capo con la paleta y
> las letras de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
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

