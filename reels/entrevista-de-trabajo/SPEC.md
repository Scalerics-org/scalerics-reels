# Reel "Entrevista de trabajo": spec de las escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo que hace agentes de IA para
comercios). Comedia en formato ENTREVISTA DE TRABAJO (formato B, diálogo): un dueño de almacén
desconfiado y de vuelta de todo (voz Charon) entrevista a su "próximo empleado", que es un agente
de IA con cabeza de pantalla, saco y corbata (voz Kore). Gancho: "Entrevisté a mi próximo empleado.
No come, no duerme y no pide aumento." Preguntas rápidas: domingos, tres de la mañana, Carnaval,
precios y stock, la consulta que no sabe ("¿me fiás hasta el lunes?": te la pasa, "eso es para
vos"), cebar mate (lo único que no hace), dejar en visto ("¿qué es dejar en visto?"), el de
enfrente ("solo si me contrata él primero": la pinchada), el sueldo ("con que no me desenchufes,
estoy bien") y el dueño a cámara: "¿Dónde está la trampa?". Corte: entra Orus (Scalerics): "No hay
trampa. Es un agente de IA que trabaja para tu comercio como un empleado más..." Cierre: "¿Lo
contratás? Comentá SÍ o NO." Voz armada de 24 parlamentos (partes/), 67.2 s; reel de 70.4 s.

## ESTILO: OFICINA DE RRHH (recursos humanos). Edición cargada.
Todo es papelería de oficina sobre una pared azul corporativa con la luz de la persiana cruzando en
diagonal: ficha de candidato con clip, currículum que se completa solo con barras, solicitud de
empleo con "pretensión salarial", checklist de "tareas del puesto" que se tilda, credencial de
"PERSONAL" colgando de una cinta, reloj de pared, taza humeante, el escritorio con el cartelito de
GERENCIA y las dos sillas. Sellos rojos que caen de golpe ("NO COME", "NO DUERME", "NO PIDE
AUMENTO", "PARA VOS", "¿VISTO?", "CONTRATADO" que queda flotando sin bajar). Notas del dueño a mano
(Caveat). Los dos personajes son dibujos genéricos propios.

Recurso central: los subtítulos llevan una ETIQUETA de quién habla ("EL DUEÑO" beige, "EL
CANDIDATO" azul, "SCALERICS" amarillo) y las palabras del candidato van en celeste: se lee como un
diálogo. Lo arma el `armar.mjs` local con `partes/voces.json` (una letra por palabra: d, a, o).

## Paleta (SOLO estos colores)
- Pared azul corporativo `#16264a` / `#0d182c` (fondo en `armar.mjs`, rellenos de los dibujos).
- Beige papel de oficina `#efe4cc`: papeles, líneas de los dibujos, textos grandes `#f6f1e4`.
- Tinta negra `#1d1b19`: lo escrito y dibujado sobre papel.
- Azul corporativo `#2f6fe0` (y su claro `#a9c6ff` sobre fondo oscuro): el candidato, los tildes.
- Rojo sello `#e23a2e`: sellos, tiradores del dueño, cruces, "AM".
- Amarillo resaltador `#ffd94a`: acento de los subtítulos, resaltador, la lucecita de la antena.

## Tipos de letra
Lexend 600-900 (lo grande y los sellos), IBM Plex Mono 500 (campos de formulario, rótulos), Caveat
700 (lo escrito a mano). Nada que se lea por debajo de 28 px.

## Zona y capas
Subtítulos arriba (etiqueta en y ~186, texto y 236-~380). Contenido de escena entre y 580 y 1520.
`compositions/ambiente.html`: luz de persiana que se corre, viñeta, rótulo "ENTREVISTA N° 001 ·
PUESTO: EMPLEADO" con puntito rojo de grabando (y 1600, abajo a la derecha), alarma roja en 41.2
("él primero") y flash en 48.08 ("trampa") y 64.75 ("contratás"). Sonidos extra locales:
`tipeo.mp3` (typing sin el tramo mudo) y `subida.mp3` (riser recortado).

## Cómo se hicieron las escenas
Cada escena es autocontenida (helpers `dibujar`, `pop`, `golpe`, `sacudon`, `escribir`, `cara`,
`parpadeo`, `salida`) y comparte los mismos dibujos de los personajes: el candidato (`.c-ok`,
`.c-feliz`, `.c-duda` son sus caras) y el dueño (`.d-ojos`, `.d-sosp`, `.d-sorpresa`; cejas
`.d-ceja-i`/`.d-ceja-d` que se rotan con svgOrigin).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá no es ilustración crema con acento verde. Sí valen las reglas técnicas.

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


## Escenas (tiempos relativos, en tiempos.md)

**s01-entrevista** (6.29 s) La ficha de candidato entra desde abajo ya en el cuadro 0 (foto del
candidato, NOMBRE "El nuevo" a mano en 0.4, PUESTO "Empleado" en 1.4). Tres sellos rojos caen en
"come" 2.7, "duerme" 3.5 y "aumento" 5.0 (el último más grande, sacudón); el candidato sonríe.

**s02-domingos** (3.43) Plano de entrevista: dueño a la izquierda con tiradores y lentes, candidato a
la derecha, escritorio con GERENCIA y taza, reloj de pared que gira. "Flaco" 0.3: ceja levantada.
"Domingos" 1.8: hoja de calendario DOMINGO. "Sí" 2.66: tilde azul, globo "SÍ." y cara feliz.

**s03-tres** (2.86) Reloj de pared gigante: las agujas giran a lo loco y frenan en las 3 (0.5) con
"03:00 AM" que cae; "mañana" 1.2: luna y estrellas. "Sí" 2.14: el candidato entra con su globo.

**s04-carnaval** (3.33) Calendario FEBRERO, se marca un día en rojo con "¡Carnaval!" a mano (0.2).
"Sobre todo" 1.48: explota el confeti y serpentinas, el candidato con gorrito de cumpleaños;
"SOBRE TODO." gigante amarillo en 1.88.

**s05-precios** (5.12) CURRÍCULUM que se completa solo: PRECIOS (barra llena en "Todos" 1.35,
"¡todos!" a mano), STOCK (2.91), HORARIOS (3.85), cada uno con su ícono y tilde; sello "SABE TODO" 4.2.

**s06-no-sabe** (5.79) Plano de entrevista. "Preguntan" 0.36: mensaje del cliente por WhatsApp
"¿Me fiás hasta el lunes?". El candidato piensa (puntitos). "Te paso la conversación" 2.18: el
mensaje cruza el escritorio hasta el dueño por una flecha punteada; "DERIVADO AL DUEÑO" en el
frente del escritorio. "Vos" 4.88: sello "PARA VOS", el dueño abre los ojos.

**s07-mate** (3.57) Mate con bombilla y termo de líneas. "No." 1.33: cruz roja y sello "NO.", el
candidato chocho; "Lo único que no hace" a mano en 2.0; el mate se va para el lado del dueño.

**s08-visto** (5.85) Chat del cliente "Hola, ¿abren hoy?"; "visto" 1.5: los tildes se ponen azules,
"VISTO · SIN RESPUESTA" y sello "¿VISTO?" junto al dueño desconfiado. "¿Qué es" 2.94: el candidato
gigante con ojos de signo de pregunta, la cabeza ladeada; "VISTO: SIN DATOS" se tipea; glitch en
"visto" 4.29.

**s09-enfrente** (6.29) Primer plano del dueño que entrecierra los ojos, "muy raro..." a mano.
"¿Y si te vas" 1.87: la ventana de la oficina con la persiana que sube y el local "EL DE ENFRENTE"
(toldo rayado); cartel "SE BUSCA EMPLEADO" en 2.8. "Él" 4.97: "ÉL PRIMERO." rojo gigante, alarma.

**s10-sueldo** (4.86) SOLICITUD DE EMPLEO: "Pretensión salarial" con "$" y cursor; "ganar" 0.9 se
resalta en amarillo; "que no me desenchufes" a mano (1.96-2.86), el enchufe entra en el
tomacorriente con chispas; nota del dueño "¿y el aguinaldo?" en 3.56.

**s11-trampa** (2.13) El dueño a cámara, zoom dramático, ceja arriba; "trampa" 0.7: "¿Y LA TRAMPA?"
de golpe con flash.

**s12-agente** (5.33) "TRAMPA" tachada en azul (0.32). Baja la credencial PERSONAL colgada de la
cinta y se hamaca: "AGENTE DE IA" se escribe en 1.3; "Horario: siempre" 2.3, "Trabaja para: tu
comercio" 3.1, "Puesto: empleado" 4.0.

**s13-puesto** (7.04) Tablero con clip "TAREAS DEL PUESTO": se tildan "Atiende WhatsApp al
instante" 0.49, "Toma pedidos" 2.2, "Agenda turnos" 3.49, "Le escribe al que no compró" 5.4; el
candidato se hamaca; sello azul "PERFIL IDEAL" en 6.2.

**s14-cta** (8.48) Vuelve la ficha (Nombre: Agente de IA · Puesto: Empleado · Referencias:
Scalerics, escrita en 1.2). "Contratás" 2.87: "¿LO CONTRATÁS?" gigante y el sello CONTRATADO que
flota sin terminar de bajar. "Comentá" 3.96: globo de comentario; botones "SÍ" azul (4.27) y "NO"
rojo (4.87) que laten; el sello duda entre los dos hasta el final. Sin salida.
