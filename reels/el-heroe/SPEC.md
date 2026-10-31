# Reel "El héroe": spec

Reel vertical 1080x1920 de Scalerics. Formato P: CÓMIC DE SUPERHÉROES, película de origen del
héroe (genérico: ningún personaje real, solo referencias nombradas: "el tío del cómic", la señal
en el cielo, "no todos los héroes usan capa"). Gancho del NARRADOR de tráiler: "Tu local necesita
un héroe. Porque el villano ya entró: se llama El Visto." EL VISTO (supervillano encapuchado con
ojos de doble tilde celeste) narra: once de la noche, la ciudad duerme, tus clientes no. La
CLIENTA escribe "¿tienen la torta de chocolate para mañana? Es el cumple de mi hija". El Visto:
"Visto. «Te contesto el lunes». Y el lunes... un pulgar." ¡ZAS!: la clienta al de enfrente. El
DUEÑO de la confitería no da más ("hago las tortas, atiendo la caja, los proveedores... ¡y el
celular no para!"). "Como dijo el tío del cómic: con un gran local viene una gran bandeja de
entrada." ORIGEN: esa noche el celular se prendió solo; el AGENTE DE IA (un celular azul con
antifaz rojo, sin capa ni músculos) contesta al instante y reserva la torta. "¡Nooo! ¿Quién sos?"
"El agente de IA del local. Atiendo a cualquier hora, con precios, stock y horarios." "No todos
los héroes usan capa." GIRO: "¿Y yo no era el héroe?" "Vos hacés las mejores tortas, jefe. Lo
que no podías era con todo solo." CIERRE (Orus): "Tu agente de IA lo armamos en Scalerics.
Etiquetá al local que necesita un héroe."
Voces: narrador Enceladus, El Visto Algenib, clienta Leda, dueño Charon, agente Zephyr,
Scalerics Orus. 193 palabras; voz 74.1 s, reel 77.34 s. La voz se arma por partes:
`partes/voces.sh` (+ `voces2.sh`, segunda toma más ágil de 01 04 05 07 08 13), `recortar.sh`,
`tiempos.sh`, `conf.mjs` (atempo y silencios) y `node partes/pegar.mjs`.

## Recurso visual central
Páginas de HISTORIETA: viñetas papel/color con marco de tinta de 10 px y sombra plana, tramas de
puntos (halftone), líneas de acción radiales, onomatopeyas en Bangers con borde de tinta (¡BAM!,
¡ZAS!, ¡PLAF!, ¡FZZZT!, ¡NOOO!, ¡TA-DÁ!), cajas de narración amarillas y globos de diálogo. Los
subtítulos también son recuadros de cómic (Comic Neue 700) con el color de quien habla:
narrador amarillo, El Visto negro con celeste, clienta y dueño globo papel, agente azul con
amarillo, Scalerics negro con verde. `ambiente.html`: cabecera "EL HÉROE · EL ORIGEN", cartel de
quién habla arriba a la derecha y destellos del marco de página en los golpes.

## Paleta (SOLO estos colores)
Tinta `#111111`, papel `#fdf6e3`, amarillo cómic `#ffd23f`, rojo `#e63946`, azul héroe
`#2f6fe0`, noche `#14214a`/`#1d2b53`/`#0b1430` (fondo y villano). Celeste tildes `#4fc3ff` solo
para El Visto y lo de WhatsApp. Verde Scalerics `#5ce611` solo en el cierre.

## Cómo se hacen las escenas
`python3 partes/escenas/gen.py partes/escenas/sNN.py` escribe `compositions/<id>.html` y su
`.sfx.json`. Piezas compartidas en `partes/escenas/comun.py`: VISTO, CLIENTA, DUENO, AGENTE, TIO,
FORTACHON, TORTA, PULGAR, TILDES, CIUDAD, CELU_GRANDE, VINETA, RAYOS, ESTALLIDO, ONO, CAJA, GLOBO.
Fuentes Bangers y Comic Neue (OFL, de Google Fonts) en `assets/fonts`. Música: `assets/bgm/comic.mp3`
(la cama del molde en loop hasta el final).

## Escenas (palabra donde cambia cada cosa: ver tiempos.md)
- s01-portada: confitería de noche, cartel SE BUSCA, silueta punteada de héroe con "?"; ¡HÉROE! en "héroe".
- s02-villano: patada a la puerta ¡BAM!, entra El Visto ("villano"), caja "EL VILLANO YA ENTRÓ..."; EL VISTO gigante en "Visto".
- s03-ciudad: skyline 23:00, cara de El Visto en el cielo; se apagan las ventanas en "duerme" (Z Z Z); en "Tus clientes" se prenden y saltan globitos "¿?".
- s04-torta: la clienta con el celular, mensaje "¿Tienen la torta de chocolate para mañana? 23:02"; la torta entra en "torta"; ¡ES EL CUMPLE! en "cumple".
- s05-pulgar: arriba el mensaje recibe las dos tildes celestes + ¡VISTO!; abajo El Visto con globo "«Te contesto el lunes»", calendario LUNES; en "pulgar" cae la mano con el pulgar ¡PLAF!.
- s06-zas: ¡ZAS! y la clienta corre al local ENFRENTE (ABIERTO); "MIENTRAS, EN LA CONFITERÍA..." el dueño sudando; ¡UF! en "no da más".
- s07-no-da-mas: el dueño grita; aparecen torta ("tortas"), caja registradora ("caja"), cajas PROVEEDORES, celular vibrando; ¡BZZ! ¡BZZ! en "no para".
- s08-tio: "EL TÍO DEL CÓMIC DIJO:" con el tío genérico y su globo; en "viene" caen sobres y chats en una bandeja; ¡BANDEJA DE ENTRADA! en "bandeja".
- s09-origen: EL ORIGEN en "origen"; la confitería de noche, rayo en "celular", el celular se prende con cara, ¡FZZZT! y la señal en el cielo en "prendió".
- s10-respuesta: celular grande "Confitería del Barrio": el mensaje de la clienta, "escribiendo...", la respuesta del agente al instante (¡AL INSTANTE!) y "¿Te la reservo para mañana a las 10?".
- s11-reservala: la clienta boquiabierta, ¿A LAS ONCE?; en "¡Sí, reservala!" sonríe, salta, ¡SÍ!.
- s12-quien: ¡NOOO! con El Visto temblando; entra la sombra del héroe con antifaz y "?"; globo "¿Quién sos?".
- s13-agente: reveal del agente (celular azul con antifaz), AGENTE DE IA + ¡TA-DÁ!; reloj día/noche en "cualquier hora"; PRECIOS, STOCK, HORARIOS en cada palabra.
- s14-capa: el héroe musculoso con capa tachado con X roja en "capa" (SIN CAPA); el agente saluda entre chats, 23:00 HS y ¡ATENDIDO! en "once".
- s15-jefe: el dueño triste con globo "¿Y yo no era el héroe?"; entra el agente; torta y LAS MEJORES TORTAS en "mejores", el dueño sonríe; se juntan y ¡EQUIPO! en "solo".
- s16-cta: CONTINUARÁ... EN TU LOCAL, el agente; LO ARMAMOS EN SCALERICS en "Scalerics"; ¡ETIQUETÁ AL QUE NECESITA UN HÉROE! y la @ que late.

---

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

