# El diablito · SPEC

**De qué trata.** Diálogo de dibujo animado: el dueño, a las once de la noche, con el celular. Una
clienta le preguntó un precio ayer y no compró. En un hombro el DIABLITO (Fenrir, canchero: "vas a
quedar de pesado", "mañana le escribís"); en el otro el ANGELITO (Leda, dulce y agotado: "escribile...",
bosteza, se duerme). El dueño (Charon, cansado) le hace caso al diablito. GIRO: el angelito renuncia
("tengo tres comercios a cargo") y aparece un tercero en el hombro, el AGENTE DE IA (Kore), que ya
le escribió a la clienta, le reservó el pedido y le avisó a la señora de los sábados. El diablito queda
sin trabajo ("buscate otro hombro"). Orus vende al final. Cierre: "Mandáselo al que siempre dice:
mañana le escribo."

**Recurso visual central.** Dibujo animado de los años 30 (rubber hose): personajes genéricos
inventados con ojos de pastel, guantes blancos, piernas de manguera, que REBOTAN AL COMPÁS de la
musiquita (oom-pah generada, 132 bpm, `assets/bgm/bed.mp3`); iris que se abre al principio,
nubecitas de humo, chispas de 4 puntas, globos de diálogo, sellos de goma, pesa que cae. Capa
`compositions/ambiente.html`: grano de película que salta 12 veces por segundo, parpadeo de
proyector, rayas y pelitos de celuloide, viñeta redonda oscura; flash de luz cuando entra el agente.

**Este estilo manda sobre SPEC-base** (que queda abajo como referencia técnica):
- Paleta: papel crema sepia `#e9dcb8`/`#fbf3dc` (fondo en `armar.mjs`), tinta `#1d1610` (contornos
  de 5-8 px, rellenos), rojo diablo `#c8312b`, celeste angelito `#8ec5e0`, amarillo halo `#f2c230`,
  piel `#f6e0b8`, sepia `#d9c79c`.
- Dibujos con relleno y contorno de tinta (no líneas sueltas). Entradas con estirón de goma
  (`pop()` squash and stretch, elastic) en vez de dibujarse.
- Tipografías: títulos y carteles en Luckiest Guy (`assets/fonts/LuckiestGuy.woff2`); globos y
  subtítulos en Fredoka 600 tinta, acento rojo. Logo en tinta (`filter: brightness(0)`).
- Etiqueta: cartelito crema con borde de tinta, Luckiest Guy 46 px, top 1262.
- Personajes (todos en las escenas, mismas formas): diablito rojo con cuernitos, cola con punta de
  flecha y tridente; angelito con túnica crema, alas celestes, halo amarillo y párpados que se
  cierran; dueño calvo de bigote, ojeras y piyama a rayas, con párpados a media asta; agente de IA
  con cabeza de pantalla, antena con lucecita amarilla, auriculares, moño rojo y cuerpo de tinta;
  la señora de los sábados con sombrero rojo, rodete gris y anteojos.

**Voces** (partes/: `voces.sh`, `recortar.sh`, `componer.mjs`): 01 04 06 08 10 12 diablito (Fenrir),
03 07 09 angelito (Leda), 02 05 dueño (Charon), 11 13 agente (Kore), 14 15 narrador (Orus).
`componer.mjs` arma `locucion.wav`, `palabras.json` (tiempos por parlamento con correcciones a mano
en 07 y 09) y `guion.txt`.

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


## Escenas

### s01-diablito (0.00 · 3.67) "Esa venta la perdiste por mí. Soy tu diablito."
Iris negro que se abre (cuadro 0 ya muestra la cara). Diablito grande al centro con el ticket
"VENTA" en la mano; en "perdiste" lo rompe en dos y las mitades caen. "mí": se ríe, la cabeza se
sacude. "diablito": cejas arriba, tridente, cola que se mueve, tres chispas. Etiquetas "Una venta
perdida" → "Tu diablito".

### s02-noche (3.67 · 8.14) "Once de la noche. Una clienta me preguntó un precio ayer, y no compró."
Ventana con luna y estrellitas, reloj que gira hasta las 11, el dueño con el celular. "clienta": sale
el reloj y entra el globo "¿Qué precio tiene? · Clienta · ayer 18:40"; el dueño lo mira, la pantalla
se prende. "no compró": sello rojo NO COMPRÓ.

### s03-angelito (8.14 · 12.55) "Escribile, corazón. Pasale el precio, preguntale si lo sigue queriendo."
Pop del angelito en el hombro derecho, el halo cae rebotando; le susurra. "corazón": corazoncito
que late. "Pasale el precio": borrador del mensaje ("Hola, te paso el precio" / "¿Lo seguís
queriendo?") con puntitos de escribiendo.

### s04-pesado (12.55 · 16.28) "Ni se te ocurra. Vas a quedar de pesado. Si quiere, que vuelva."
Puf de humo y pop del diablito en el hombro izquierdo, estallido rojo "¡NO!". "pesado": cae una pesa
negra "PESADO" que aplasta el borrador; polvo y temblor. "Si quiere, que vuelva": se encoge de
hombros; el angelito pone cara triste.

### s05-manana (16.28 · 23.48) "Tenés razón. Mañana le escribo. Eso. Mañana. Como dijiste la semana pasada. Y la otra."
El dueño asiente; el celular se va y queda un post-it "MAÑANA le escribo"; bostezo. "Eso": entra un
calendario de taco rojo con hojas que dicen "MAÑANA" y vuelan una tras otra, cada vez más rápido;
telaraña sobre el celular ("1 mensaje"); el diablito se mata de risa en "la otra".

### s06-senora (23.48 · 29.45) "¿Y la señora de los sábados? Hace un mes que no viene. Escribile... escribile..."
Polaroid de la señora "LOS SÁBADOS"; cuatro casillas SÁB. "Hace un mes": se tachan en rojo y la foto
se destiñe. El angelito se duerme de a poco (párpados, cabeza, halo torcido, Zz).

### s07-enfrente (29.45 · 32.35) "Dejala. Se habrá ido con el de enfrente."
Diablito en primer plano con manotazo de "andá". Local "ENFRENTE" con toldo a rayas; la señora entra
feliz, sale un corazón.

### s08-renuncio (32.35 · 40.74) "Escribi... aaah... Perdón. Mirá, yo no doy más. Tengo tres comercios a cargo y ninguno me hace caso. Renuncio."
Angelito grande: bostezo gigante con Zz, se despabila, se desinfla, alas caídas. "tres comercios":
tres localcitos arriba; "ninguno": a cada uno le cae un cartelito "MAÑANA". "Renuncio": tira el halo
(rebota en el piso), levanta el cartel "RENUNCIO" y se va volando.

### s09-ganamos (40.74 · 43.39) "¡Ganamos! ¿Y ese quién es?"
Diablito salta con los brazos arriba, chispas de colores. "¿Y ese?": se congela y mira a la derecha.
"quién es": cono de luz amarilla y la silueta negra del agente con un "?".

### s10-agente (43.39 · 49.98) "Hola. Soy tu agente de IA. Mientras ustedes discutían, le escribí a la clienta, le pasé el precio y le reservé el pedido."
Flash de luz (ambiente) y pop del agente grande al centro, saluda, la antena titila. "discutían":
nube de pelea de dibujito con un cuernito y un halo. "le escribí": el agente se corre a la izquierda y
entra un celular grande con el chat de la Clienta ("¿Lo seguís queriendo?", "Te paso el precio", "¡Sí!
Lo quiero", "Listo, te lo reservé"), y el sello RESERVADO.

### s11-sabados (49.98 · 54.17) "Y a la señora de los sábados le avisé que llegó lo que le gusta. Viene mañana."
Agente con el celular a la izquierda, la señora a la derecha. "avisé": globo "¡Hola! Llegó lo que te
gusta". "gusta": la señora feliz, corazones. "Viene mañana": página de calendario MAÑANA con tilde (el
mañana que sí llega).

### s12-hombro (54.17 · 57.70) "¿Y yo qué hago? Vos buscate otro hombro."
El dueño con el agente en el hombro derecho y el diablito desinflado en el izquierdo (gotita de
sudor). "hombro": el agente lo despide con la mano; el diablito se va caminando con el cartel
"BUSCO HOMBRO".

### s13-scalerics (57.70 · 64.56) Orus: "En Scalerics lo hacemos: un empleado de IA que hace el seguimiento por vos, a cualquier hora, sin quedar pesado."
De noche: el dueño duerme tranquilo (ojos cerrados, sonrisa, Zz); el agente en el hombro tipea en su
celular. "seguimiento": mensajitos que salen volando. "cualquier hora": el reloj gira loco. "sin
quedar pesado": baja una pluma (en vez de la pesa). Etiquetas: Scalerics → Tu empleado de IA → A
cualquier hora → Sin quedar pesado.

### s14-cta (64.56 · 70.77) Orus: "Mandáselo al que siempre dice: mañana le escribo."
Rayos de sol sepia girando (cartel de final de dibujito). Óvalo crema con borde rojo: "Mandáselo al
que siempre dice:" y en "mañana le escribo" MAÑANA / LE ESCRIBO gigantes en rojo. Diablito y agente a
los costados; el diablito se ríe, el agente lo señala. Etiqueta "¡Mandáselo!".

**Las escenas salen de `escenas/gen.mjs`** (personajes compartidos en `escenas/lib.mjs`): para cambiar una, editá el generador y corré `node escenas/gen.mjs s05` desde la carpeta del reel (después `node armar.mjs`).
