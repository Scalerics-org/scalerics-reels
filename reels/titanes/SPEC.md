# Titanes · SPEC

**Tema:** automatizaciones. **Formato C** (lista en pasos con rivales) como **lucha libre de la tele de
antes** ("Titanes en el Ring" solo nombrado de palabra por el presentador; en pantalla no aparece el
nombre). El presentador anuncia la velada: el dueño del local (sin máscara, con delantal, agotado)
contra una seguidilla de rivales enmascarados, uno por round con número gigante: LA PLANILLA, EL
COPIA-PEGA, EL RECORDATORIO y el golpe final TU PEDIDO ESTÁ LISTO. A las once lo tiran a la lona y
el árbitro cuenta uno, dos, tres. **Giro:** "esto no se gana a piñas: es lucha por parejas": el dueño
le da el relevo a su compañero, LA AUTOMATIZACIÓN de Scalerics (luchador negro y verde con
engranaje), que tira a los rivales uno por uno haciendo todo solo. Ganador: el dueño, que hoy cena
caliente. **Cierre:** "¿Cuál es el rival que te tira a vos? Contanos en los comentarios."

**Voces** (`partes/`, ver `partes/componer.mjs`): presentador exaltado Fenrir; los rivales Algenib
(grave, burlón); el dueño Charon; narrador Orus solo cuando entra Scalerics (14) y en el CTA (16).
Tiempos por palabra: `tiempos.mjs` por parte + `partes/fijar.mjs` (a mano donde STT comprimió).

**Recurso visual central:** el ring de lucha libre (en `armar.mjs`): lona azul eléctrico en
perspectiva, cuerdas roja / blanca / azul, esquineros amarillos y el delantal del ring rojo con
"LUCHA DEL BARRIO". Encima, `compositions/ambiente.html`: dos reflectores (amarillo y azul) que
barren, líneas de barrido de tele vieja, viñeta, el bug "EN VIVO · LUCHA DEL BARRIO", flashes de
cámara en cada golpe y tinte verde desde que entra el compañero (55.5 s).
Personajes en `assets/kit.js` (dueño, luchador enmascarado con emblema, presentador, árbitro,
planilla, celular, reloj, cartel de round, estallido). Escenas generadas con `gen/*.py`
(`python3 gen/s01_s03.py` etc., después `node armar.mjs`).

**Paleta (manda sobre SPEC-base):** rojo `#e8332a`, amarillo `#ffd23f`, azul eléctrico `#2a5cff`,
negro `#0b0b12`, hueso `#f4efe2` (+ piel `#e8b48a`); verde Scalerics `#5ce611` solo desde el relevo.
Carteles de póster: Lexend 900 en mayúsculas con contorno negro y sombra dura desplazada (clase
`.cartel`), en y ~490. Subtítulos hueso con acento amarillo y sombra negra.

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


## Escenas (tiempos relativos, ver tiempos.md)

- **s01-paliza** (4.37): el dueño y un rival oscuro en el ring desde el cuadro 0. "paliza" 1.15:
  piñazo, estallido ¡PAF!, el dueño cae (cara KO), cartel rojo ¡PALIZA!, etiqueta "TODAS LAS NOCHES ·
  23:00". "Y vos volvés" 2.19: se levanta tambaleando con una gota de sudor; "subir" 2.69: ¡Y VOLVÉS!
- **s02-cartel** (3.36): póster amarillo de la velada ("Gran velada de LUCHA LIBRE · esta noche 23 h
  · EL DUEÑO vs. SUS TAREAS") que se enciende línea por línea; el presentador (saco rojo) grita con el
  micrófono; en "Titanes" 2.25 cae el sello "COMO EN LA TELE".
- **s03-rincon** (5.93): el dueño solo en el centro; "máscara" 0.25 etiqueta SIN MÁSCARA con flecha,
  "delantal" 0.95 CON DELANTAL; "dueño" 2.18 cartel ¡EL DUEÑO! y saluda sin ganas; "local" 2.87 ficha
  "ENTRENA DE 7 A 23 · CENA: NUNCA"; "Pará" 4.24 levanta la mano, aparece TU LOCAL y en "persiana"
  baja la persiana (CERRADO).
- **s04-planilla** (8.61): cartel ROUND 1 amarillo; "WhatsApp" el dueño con el celular lleno de
  pedidos; "Planilla" 3.59 entra LA PLANILLA (máscara azul con grilla); "Pasame" 4.84 la hoja
  PEDIDOS.XLS; cada "uno / fila" se llena una fila y el dueño se hunde.
- **s05-copia-pega** (6.59): ROUND 2 rojo; EL COPIA-PEGA (máscara amarilla); cada "Copiar" tecla
  CTRL+C y selección punteada; cada "Pegar" CTRL+V y aparece su clon; el segundo, ¡DOBLE! en sándwich.
- **s06-recordatorio** (8.12): ROUND 3 azul; EL RECORDATORIO (máscara roja con reloj) y un
  despertador que suena; "confirmó" 4.46 le pega el post-it "10:00 turno sin confirmar"; "marzo" 6.96
  "GÓMEZ debe desde marzo".
- **s07-listo** (6.58): ¡GOLPE FINAL!; "Tu pedido / está listo" en dos golpes; el dueño manda
  "¡Está listo!" uno por uno en el celular mientras el rival negro y amarillo le aplica una llave.
- **s08-lona** (6.75): el dueño cae a la lona; los cuatro rivales festejan atrás; "Once" 1.62 reloj
  23:00 que titila; el árbitro golpea la lona en 1, 2, 3 (números gigantes); K.O.
- **s09-relevo** (6.98): el presentador frena: ¡ESPEREN! / ¡A PIÑAS NO! / ¡POR PAREJAS!; el dueño se
  arrastra al rincón y estira la mano; afuera espera el compañero a contraluz; "relevo" 4.3 ¡PLAF!
  chocan las manos (RELEVO); "compañero" 5.31 se enciende en verde.
- **s10-companero** (5.18): entra saltando las cuerdas: ¡AUTOMATIZACIÓN! "DE SCALERICS"; "planilla"
  2.78 la hoja se llena sola y LA PLANILLA sale volando (¡ZAS!); "listo" 4.52 el celular manda todos
  los avisos de una y vuela ¡ESTÁ LISTO!.
- **s11-llaves** (4.22): tira al RECORDATORIO; tarjetas ✓ "Turno 10:00 confirmado" y "Gómez: pago
  recordado"; "manda" 1.6 llega el celular "Reporte del día" con 4 renglones; "Solo" 3.42 ¡SOLO!.
- **s12-ganador** (4.39): el compañero le levanta el brazo al dueño; ¡GANADOR!, confeti, cinturón de
  CAMPEÓN en "dueño"; "cena" 2.13 plato humeante y ¡CENA CALIENTE!.
- **s13-cta** (6.65): los cuatro rivales en fila con sus nombres, ¿CUÁL TE TIRA?; el foco salta de uno
  a otro; "Contanos" 1.92 la caja de comentario "Contanos: el mío es..." con cursor.
