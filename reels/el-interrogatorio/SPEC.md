# Reel "El interrogatorio": spec

Reel vertical 1080x1920 de Scalerics. Producto: AGENTE DE IA (toma reservas y agenda turnos a
cualquier hora, mientras el dueño trabaja; si es para él, le pasa la conversación). Formato P:
INTERROGATORIO POLICIAL de serie de TV, con policía malo y policía buena, al dueño de un
restaurante de barrio en la sala del espejo y la lámpara colgante.
Gancho (policía malo, Algenib, en el primer segundo): "¿Dónde estabas el sábado a las nueve y
catorce de la noche? Porque una clienta quiso reservar. Y vos no estabas." El dueño (Charon, de
gorro de chef): "¡Estaba cocinando! Tengo un restaurante, oficial." La buena (Kore): "Tranquilo.
Acá nadie te acusa. Todavía. ¿Un cafecito?" El malo golpea la mesa: "¡Nada de cafecito! Prueba
número uno." Prueba 1: el mensaje de la clienta (Leda): "Hola, ¿tienen mesa para cuatro esta
noche? Es el cumple de mi vieja." "Leído: nunca." Prueba 2: la misma mesa para cuatro en el de
enfrente, que le contestó en un minuto. El dueño: "¡Quiero a mi abogado! ¡Pido mi llamada!" La
buena: "¿Tu llamada? Si no atendés ni las que te hacen." El malo: "Tenés derecho a guardar
silencio. Total, con tus clientes ya lo venís haciendo." El dueño: "¿Y qué querían? ¿Que dé vuelta
la milanesa con una mano y conteste con la otra?" GIRO (la buena): "No sos un vago. Sos culpable
de querer hacer todo solo." Entra Orus (se abre la puerta, luz verde): agentes de IA que atienden
el WhatsApp mientras cocinás, toman la reserva, agendan turnos y confirman, a las 21:14 o a las
3 de la mañana, y si es para vos te pasan la conversación. La buena: "Queda en libertad." El
malo: "Condicional." Cierre (Orus): "Mandáselo al que siempre dice: ahora te contesto."
Voz de 69.55 s (15 parlamentos, ver `partes/`), total 72.75 s, 184 palabras.

Recurso visual central: la SALA DE INTERROGATORIO. Lámpara colgante arriba con un cono de luz
amarilla que se balancea, espejo polarizado de fondo, mesa (todo lo que aparece "apoya" en el
borde de la mesa, y 1352), reloj de pared clavado en 21:14 con segundero, carpeta de expediente
manila, fotos de prueba con clip, sellos rojos estampados, ficha policial con rayas de altura.

## Estilo: sala de interrogatorio
- Pared gris verdosa oscura con viñeta; espejo polarizado (#espejo en `armar.mjs`, rectángulo
  oscuro con marco y dos reflejos en diagonal); la mesa (#mesa en `armar.mjs` + borde en el
  ambiente, por encima de las escenas: los personajes quedan detrás). Las escenas recortan su SVG
  en y 1360.
- `compositions/ambiente.html` (va encima de las escenas): lámpara + cono (titila en el golpe
  16.5, el abogado 33.2 y "culpable" 48.95; se sacude fuerte con el golpe), reloj de pared arriba a
  la derecha (21:14, segundero a saltos), cartel mono "SALA 3 · INTERROGATORIO" arriba a la
  izquierda. Cuando entra Orus (51.63): flash, luz de puerta abierta desde la derecha con halo
  verde Scalerics y el cartel pasa a "CASO RESUELTO" (verde). En el CTA (66.81) vuelve la sala.
- Subtítulos hueso con sombra oscura y acento amarillo lámpara.
- Etiqueta de cada escena: tarjeta manila con texto mono oscuro, sobre la mesa (top 1452).
- Personajes dibujados genéricos (`partes/escenas/pj.mjs`): relleno plano y contorno hueso, caras
  piel: el MALO (camisa blanca, corbata roja floja, cartuchera, pelo cepillo, bigote y cejas en V),
  la BUENA (saco verde gris, placa dorada, rodete, sonrisa), el DUEÑO (chaqueta de cocinero,
  pañuelo rojo, gorro de chef, gotas de sudor), la CLIENTA (pelo castaño, buzo rojo, celular) y el
  AGENTE DE IA (celular verde Scalerics con cara y vincha de auriculares, solo desde la entrada de
  Orus).

## Paleta
- Gris verdoso `#26332d` / `#1c2620` / `#0f1512`: pared, fondo, mesa (`#18211c`).
- Amarillo lámpara `#ffd23f`: luz, carteles, acento de subtítulos.
- Rojo sello `#e5484d`: sellos, corbata, toldo del de enfrente, llamadas perdidas.
- Manila `#d9b779`: carpeta, etiquetas, milanesa, mesa del de enfrente.
- Hueso `#efeadf`: contornos, fotos, textos (piel `#f0d6b0`, gris claro `#7f9a8c`).
- Desde la entrada de Orus: verde Scalerics `#5ce611` (el agente, LIBERTAD, Mandáselo).

## Cómo están hechas las escenas
Se generan con `node partes/escenas/gen.mjs` (todas) o `node partes/escenas/gen.mjs s03 s07`
desde `partes/escenas/sNN.mjs` y `amb.mjs`; helpers de animación (golpe, pop, entra, sale,
sacudon, dibujar, hablar, parpadeo) en `gen.mjs`. Después `node armar.mjs`.
Voz: `partes/voces.sh` (Gemini, una voz y un tono por parlamento), `partes/recortar.sh`
(silencios y atempo por voz), `tiempos.mjs` por parlamento (`partes/NN.json`) y
`partes/componer.mjs` (pega con silencios de 0.35-0.7 s y arma `assets/voice/palabras.json`).

## Voces
Algenib policía malo (grave, duro), Kore policía buena (dulce e irónica), Charon el dueño
(nervioso, indignado), Leda la clienta (el mensaje), Orus narrador (la entrada y el cierre).

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


## Escenas (tiempos relativos; ver tiempos.md)
- **s01-donde-estabas** (2.71): el MALO grande bajo la lámpara, inclinándose hacia la luz (cuadro 0
  ya visible), se acerca de golpe en "estabas"; en "nueve" cae el sello amarillo "SÁB · 21:14".
  Etiqueta "Caso: la reserva perdida".
- **s02-clienta** (5.65): la CLIENTA con el celular; en "reservar" sale el globo "¿Tienen mesa?"
  con ondas. En "Y vos" barrido a la derecha: silla vacía bajo un haz de luz con el celular del
  local vibrando solo (notificación "1"); en "estabas" sello rojo AUSENTE. Etiquetas "La víctima" y
  "El sospechoso: ausente".
- **s03-cocinando** (3.0): el DUEÑO de chef con la sartén (la milanesa salta y da vuelta), cartel
  "¡Estaba cocinando!", gotas de sudor; se inclina en "oficial". Etiqueta "Sospechoso: el dueño".
- **s04-cafecito** (5.14): la BUENA en primer plano sonriendo, el dueño chico a la derecha; en
  "Todavía" ceja arriba + "todavía..." manuscrito amarillo y el dueño tiembla; en "cafecito" la
  taza se desliza por la mesa y humea. Etiqueta "La policía buena".
- **s05-golpe** (3.03): el MALO baja el puño contra la mesa ("¡PUM!"), sacudón, la taza vuela y se
  vuelca; en "Prueba" cae la carpeta "PRUEBA Nº 1". Etiqueta "El policía malo".
- **s06-prueba-uno** (6.57): foto con clip de la captura del chat: "Clienta · sáb 21:14", el
  mensaje se escribe con la voz de la clienta; en "Leído" aparece "1 mensaje sin leer" y el sello
  "LEÍDO:", en "nunca" se suma NUNCA. Etiqueta "Prueba Nº 1".
- **s07-prueba-dos** (4.95): la prueba 1 queda chica atrás; entra la foto 2: toldo a rayas rojas,
  cartel "EL DE ENFRENTE", mesa con torta (en "mesa") y cuatro caras felices (en "cuatro"); en
  "enfrente" círculo rojo y flecha. Etiqueta "Prueba Nº 2".
- **s08-un-minuto** (2.08): el celular del de enfrente: "¿Tienen mesa para cuatro?" 21:14 y la
  respuesta amarilla "¡Sí! Mesa para 4, a las 21:30. ¡Feliz cumple!" 21:15; en "minuto" sello
  "1 MINUTO". Etiqueta "Respuesta del de enfrente".
- **s09-abogado** (2.4): el dueño con los brazos arriba temblando, cartel "¡Quiero a mi abogado!";
  en "Pido" entra el teléfono rojo. Etiqueta "Derechos del detenido".
- **s10-tu-llamada** (2.93): la BUENA irónica y el teléfono que suena sin que nadie atienda; tres
  tarjetas "× Llamada perdida" en "atendés", "las" y "hacen". Etiqueta "Golpe bajo".
- **s11-silencio** (4.35): el MALO con mueca, "shhh..." en "silencio"; en "Total" el celular "Tus
  clientes" con tres chats (Lucía, Martín, Sofía) en visto; en "haciendo" sello EN VISTO.
  Etiqueta "Derecho a guardar silencio".
- **s12-milanesa** (4.0): el dueño con la sartén en una mano (la milanesa vuela en "milanesa") y el
  celular amarillo vibrando en la otra ("la otra"), cartel "¿Y qué querían?". Etiqueta "La defensa".
- **s13-culpable** (4.81): ficha policial del dueño con rayas de altura y placa "EL DUEÑO · SÁB
  21:14" (flash); "VAGO" que se tacha en rojo en "vago"; sello CULPABLE en "culpable"; manuscrito
  amarillo "de querer hacer todo solo". Etiqueta "El veredicto".
- **s14-agente** (6.46): entra el AGENTE DE IA (celular verde con cara y auriculares) con halo
  verde; globo "¡Hola! ¿En qué te ayudo?" en "WhatsApp"; el dueño cocina feliz a la derecha en
  "cocinás" (la milanesa salta); se va la cocina y entran las tarjetas verdes "Reserva tomada · Mesa
  para 4 · 21:30" (reserva), "Turno agendado · Martes · 10:00" (turnos), "Confirmado · Te
  esperamos" (confirman). Etiqueta "Tu agente de IA".
- **s15-cualquier-hora** (5.23): reloj grande en 21:14 ("21:14" amarillo); en "tres" las agujas
  giran a las 3, "03:00" verde y luna. En "Y si es para vos": agente a la izquierda, dueño a la
  derecha, globo "Te paso con el dueño" que vuela hasta él con flecha verde. Etiquetas "A cualquier
  hora" y "Y si es para vos, te avisa".
- **s16-libertad** (3.49): buena, dueño feliz (salta) y sello verde LIBERTAD; en "Condicional"
  sube el MALO con mueca y estampa CONDICIONAL rojo encima. Etiqueta "Caso cerrado... por ahora".
- **s17-cta** (5.94): ficha del PRÓXIMO SOSPECHOSO: silueta con "?" sobre rayas de altura, botón
  verde "Mandáselo"; en "ahora" sube la placa «AHORA TE CONTESTO» y flash de la foto de ficha.
  Etiqueta "Próximo sospechoso".
