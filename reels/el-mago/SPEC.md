# Reel "El mago": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende AUTOMATIZACIONES.
Formato P: SHOW DE MAGIA de la tele (genérico, mago inventado). EL GRAN MAXIMILIANO (galera con
cinta rosa, frac negro, capa violeta, bigote manubrio, varita) arranca con el gancho: "Para mi
próximo truco, voy a hacer desaparecer tres horas de tu vida." y se desinfla: "Ah, no. Eso ya lo
hacés vos. Todas las noches." Su ASISTENTE (vestido lila de lentejuelas, pluma rosa) pide un
voluntario: el DUEÑO de un local (delantal violeta, remera cian, pelado con los lentes en la
frente, celular en la mano). Cada truco se lo arruina: "Elegí una carta" / "Pará, que estoy
pasando el pedido de la señora de las empanadas. Doce de carne..."; "¡De esta galera voy a
sacar...!" / "¿El reporte del día? Porque yo lo saco a mano, a la una de la mañana."; "¡La mujer
cortada al medio!" / "Esperá, que aviso que los pedidos están listos. Uno por uno." El público:
¡UUUH! El mago: "¡Basta! Esto no lo arregla ni Harry Potter con la varita" (se le parte). GIRO,
la asistente: "Maestro, el problema no es él: hace a mano lo que se puede hacer solo." y hace el
truco de verdad: "¡Tadá! El pedido pasó solo a la planilla. El aviso de listo salió solo. Y el
reporte ya le llegó al celular." (público: ¡OOOH! y aplausos). Dueño: "¿Y ahora qué hago con
tres horas?" Mago: "Ni idea. Yo solo las hago desaparecer." Dueño: "¿Pero cómo lo hizo?" Mago:
"Un mago nunca revela sus trucos." Narrador Scalerics: "Nosotros sí: automatizamos las tareas
repetidas de tu negocio. Lo hacemos en Scalerics. Contanos en los comentarios qué tarea querés
hacer desaparecer."
Voces: mago Fenrir, asistente Leda, dueño Charon, narrador Orus (+ público uuuh/oooh con 5 voces).
Voz de 70.1 s, reel de 73.32 s.

## Recurso visual central
El ESCENARIO de magia: violeta profundo con estrellitas, REFLECTOR circular desde arriba con su
círculo en el piso, humo que se arrastra por el piso, destellos de cuatro puntas, galera, varita,
cartas, caja con sierra y conejo. Arriba (`ambiente.html`): pastilla rosa SHOW DE MAGIA + quién
habla, y tres galeritas a la derecha (los trucos) que se ponen ROSAS cuando el dueño arruina
cada uno (20.87, 26.79, 33.93) y VERDES en el ¡TA-DÁ! (45.81). Desde el giro entra el verde de
Scalerics: lo que se hace solo es verde (fila de planilla, aviso, reporte, circuito final).

## Paleta (SOLO estos colores)
- Negro `#0a0610` y violeta `#2b1250` (fondo `#170a2e`-`#2a1250` en `armar.mjs`): rellenos.
- Plateado `#e6e8f0`: trazos (7 px) y textos.
- Rosa `#ff4fa3`: la magia (cinta de la galera, moño), títulos, destellos.
- Lila `#c3a2ff`: la asistente (vestido) y su acento en subtítulos.
- Cian `#45dcf0`: el celular, la remera y los lentes del dueño, la planilla a mano.
- Verde Scalerics `#5ce611`: desde el giro, lo automático.
Acento de subtítulos por quién habla (`reel.voces`): mago rosa, asistente lila, dueño cian,
Scalerics verde. Prohibido: emojis, fotos, rayas largas, logos o caras reales (Harry Potter solo
se NOMBRA).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para cartelas, planillas y horas.

## Zona
Subtítulos arriba (y 236 a ~420); barra de `ambiente.html` en y 100-170; contenido de escena
entre y 580 y 1540; logo en y 1746.

## Cómo está hecho
- `armar.mjs` local: fondo violeta con reflector y estrellas, colores de subtítulos por voz,
  cortina `assets/bgm/show.mp3` (la arma `partes/cortina.mjs`: vals misterioso con cajita de
  música, redobles antes de la galera y la sierra, trombón triste en cada truco arruinado, ¡uuuh!
  en 36.85, fanfarria del ¡TA-DÁ! en 45.81, ¡oooh! y aplausos en 51.95, acorde final).
- Voz: `partes/voces.sh` (un .txt por parlamento), `partes/recortar.sh`, tiempos por parte con
  `tiempos.mjs` y `partes/pegar.mjs` (atempo y silencios en `partes/conf.mjs`).
- Escenas: `python3 partes/escenas/gen.py partes/escenas/sNN.py` (piezas en `comun.py`: MAGO,
  ASISTENTE, DUENO, GALERA, CARTA, ESTRELLA/DESTELLOS, HUMO, REFLECTOR, CAJA, SIERRA, CONEJO,
  RELOJ, ENGRANAJE, GLOBO, CARTEL).

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


## Escenas (tiempos en tiempos.md)
- s01-truco (0-6.21): el mago bajo el reflector, la varita tira chispas en "truco"; aparece un
  reloj con las agujas girando; TRES (3.08) y HORAS (4.46) caen gigantes; en "vida" ¡puf! de humo,
  el reloj desaparece, cartel "DE TU VIDA".
- s02-noches: el mago se desinfla (ceja caída, galera torcida) y sale; ventana "23:47 · TU LOCAL"
  con luna: el dueño iluminado por la compu; teclas CTRL C / CTRL V que se aprietan; "TODAS LAS
  NOCHES" y los días de la semana sellándose.
- s03-voluntario: la asistente presenta "ESTA NOCHE · EL GRAN MAXIMILIANO"; el foco barre el
  público y se clava en el dueño (cartel "EL DEL LOCAL"); el dueño en el escenario con el celular
  y notificaciones de WhatsApp ("Pedido nuevo", "¿Tenés de carne?", "¿Está listo?").
- s04-carta: abanico de cartas, "CUALQUIER CARTA", sube el as.
- s05-empanadas: las cartas se caen; chat de "Sra. de las empanadas" y PEDIDOS.XLSX donde el
  dueño tipea a mano "Sra. empanadas · 12 carne".
- s06-galera: la galera con chispas y el conejo que asoma; del sombrero sale el "REPORTE DEL DÍA ·
  HECHO A MANO"; entra el dueño con el lápiz; reloj y "1:00 AM".
- s07-sierra: la caja con la asistente, "LA MUJER CORTADA AL MEDIO", la sierra serrucha y corta.
- s08-uno-por-uno: la sierra trabada al fondo; el dueño manda "Tu pedido está listo" uno por uno
  (Rubén, Marta, Sra. empanadas, Walter, Doña Elsa, Gustavo); sube el público: ¡UUUH!
- s09-basta: "¡BASTA!", la galera salta, vapor; sacude la varita y se le parte en dos con humo.
- s10-maestro: la asistente defiende al dueño ("NO ES ÉL"); tarjetas "A MANO" (copiar · pegar ·
  avisar · anotar) y "SOLO" verde con engranaje; chasquido.
- s11-tada: ¡TA-DÁ! verde con humo y destellos; el mensaje vuela solo a la planilla, la fila se
  pinta verde con tilde; sale solo el aviso "Tu pedido está listo", sello SALIÓ SOLO.
- s12-celular: el reporte a mano se cae; la galera se da vuelta sobre el celular y cae la
  notificación "Reporte del día" con barras; sello LLEGÓ SOLO.
- s13-tres-horas: el dueño feliz, "¿Y AHORA QUÉ HAGO CON TRES HORAS?", el reloj; el mago se
  encoge de hombros (?) y ¡puf! las hace desaparecer.
- s14-revela: el dueño pregunta bajito; primer plano del mago con el dedo en la boca y el sello
  "SECRETO PROFESIONAL".
- s15-cta: se apaga el show; "EL TRUCO, REVELADO": circuito verde PEDIDO → PLANILLA → AVISO →
  REPORTE, "AUTOMATIZACIONES"; logo de Scalerics "LO HACEMOS NOSOTROS"; cierre "¿QUÉ TAREA QUERÉS
  HACER DESAPARECER?" + pastilla verde "Contanos en los comentarios" + galera con destellos.
