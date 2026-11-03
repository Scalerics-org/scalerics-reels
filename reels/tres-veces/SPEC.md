# Reel "La regla de las tres veces": spec

Reel vertical 1080x1920 de Scalerics, CORTO: ~29 s (voz Orus de 25.7 s + 3.2 s de cierre).
Producto: **automatizaciones**, nombradas una sola vez al final. Público: dueños y encargados de
pymes. Formato del punto 6 de "LO PRIMERO": **tipografía cinética**, solo texto grande y ritmo.
Consejo de colega: "Si lo hiciste una vez, hacelo a mano. Si lo hiciste dos veces, anotá cómo. Si
lo hacés todos los días, que se haga solo." Ejemplos de pyme: pasar el pedido a la planilla,
avisar que está listo, mandar el resumen del día. El dueño queda bien parado: "Tu tiempo, para lo
que solo vos sabés hacer." Gancho (0 s): "Una regla para saber qué sacarte de encima esta
semana." Cierre: "Guardalo y hacé tu lista el lunes." (acción: guardar).

## Recurso visual central
**La regla (doble sentido: regla = norma y regla de medir).** En s01 el subrayado de "UNA REGLA"
es una regla de medir verde. De s02 a s05 hay una regla de medir crema abajo (y 1440-1510) con
tres marcas: 1 VEZ · 2 VECES · TODOS LOS DÍAS; un cursor verde avanza de marca en marca y cada
marca pasa a verde cuando se dice. En s08 la regla entera queda en una tarjeta "para guardar".
**Color con significado:** gris `#7c8698` = lo que se hace a mano todos los días (los ejemplos
antes del tilde, los días de la semana); verde `#5ce611` = lo que ya se hace solo / lo resuelto;
blanco y crema = la voz del reel.

## ESTILO: tipografía cinética de marca (manda sobre SPEC-base donde choque)
- Distinto de `cuanto-vendiste` (que apila frases con objetos): acá las frases ENTRAN y SALEN.
  Cada pregunta golpea (scale 1.25-1.7 → 1, 0.2 s, power4.out) y en la respuesta la pregunta se va
  para arriba con blur y la respuesta entra desde abajo (back.out). Golpe seco con 3 tweens de
  8-14 px solo en "SACARTE", "3" y "SOLO". Sin rotaciones mayores a 2 grados, sin glitch.
- Casi sin dibujos: la regla de medir, una onda verde bajo "A MANO", un anotador con 1·2·3 bajo
  "ANOTÁ CÓMO", una flecha circular verde bajo "SOLO", tildes, un marcador de guardado.
- **Sin subtítulos karaoke** (`"subtitulos": false` en reel.json, armar.mjs de
  `cuanto-vendiste`): el texto gigante ES el subtítulo. Se entiende sin sonido.
- Paleta: navy de fondo (index), crema `#efeee5`, blanco, verde `#5ce611`, gris `#7c8698`.
- Letra: Lexend 700-900 mayúsculas para lo grande; IBM Plex Mono 500 para etiquetas y la regla.
- Zona: y 380-1600 (no hay subtítulos). Logo en y ~1746. Etiqueta mono verde en top 400.
- `compositions/ambiente.html`: renglones crema muy tenues (hoja de anotador) que suben despacio,
  viñeta navy, destello verde suave en "solo" (11.85 s) y "Scalerics" (22.5 s). Va debajo de
  las escenas.
- Las escenas se generan con un script (helpers comunes `golpe`, `sube`, `desliza`, `sale`,
  `dibujar`, `pop`); cada archivo de `compositions/` es autónomo.

## Escenas (tiempos relativos en tiempos.md)
- **s01-regla** (0-3.78): cuadro 0 con "UNA REGLA" ya entrando; su subrayado es una regla de
  medir verde que se dibuja (0.05-0.6). "PARA SABER QUÉ" sube (0.70), "SACARTE" golpea gigante
  (1.60), "DE ENCIMA" verde entra de costado (2.00) y empuja a "SACARTE"; pastilla mono "ESTA
  SEMANA" (2.28). Etiqueta "Consejo de colega".
- **s02-tres** (3.78-5.85): "LA REGLA DE LAS" crema (0.1/0.52) que se apaga cuando cae el "3"
  verde gigante (0.92) con sacudón; "VECES." sube (1.22). La regla de medir se dibuja abajo y sus
  tres marcas aparecen con el "3". Etiqueta "La regla".
- **s03-una** (5.85-8.21): "¿LO HICISTE / UNA VEZ?" golpean (0/0.45); cursor a la marca 1 (verde
  0.75). Se van arriba; "HACELO" sube (1.34) y "A MANO." golpea (1.70) con onda verde manuscrita.
- **s04-dos** (8.21-10.37): "¿DOS / VECES?" (0/0.19); cursor a la marca 2. "ANOTÁ" (0.98) y
  "CÓMO." verde (1.29); se dibuja un anotador con 1·2·3 y renglones.
- **s05-todos** (10.37-12.56): "¿TODOS / LOS DÍAS?" (0/0.30), LUN MAR MIÉ JUE VIE SÁB en gris que
  se prenden uno atrás del otro; cursor a TODOS LOS DÍAS. "QUE SE HAGA" (0.97) y "SOLO." verde
  enorme (1.48) con sacudón y flecha circular verde que gira.
- **s06-ejemplos** (12.56-17.15): tres filas que entran de costado en gris con círculo gris:
  "PASAR EL PEDIDO / A LA PLANILLA" (0.0), "AVISAR QUE / ESTÁ LISTO" (1.57), "MANDAR EL RESUMEN /
  DEL DÍA" (2.92); cada una se resuelve (0.85, 2.32, 3.84): tilde verde, texto a blanco y
  "SE HACE SOLO" mono verde. Al final los tres tildes laten. Etiqueta "Lo de todos los días".
- **s07-tiempo** (17.15-23.68): "TU TIEMPO," (0/0.2) se achica arriba; "PARA LO QUE" (0.94),
  "SOLO" (1.25) "VOS" (1.65) en verde, "SABÉS HACER." (1.95). Todo sale (2.9); "ESAS" (3.12),
  "AUTOMATIZACIONES" (3.38), "LAS HACEMOS EN" (4.59), "SCALERICS." verde (5.35) con subrayado.
  Etiqueta "Tu tiempo" → "Automatizaciones".
- **s08-cta** (23.68-28.89): "GUARDALO" (0), "Y HACÉ TU LISTA" (0.62), "EL LUNES." verde (1.42);
  tarjeta crema "LA REGLA DE LAS 3 VECES" con las tres filas (1 VEZ · A MANO / 2 VECES · ANOTÁ
  CÓMO / TODOS LOS DÍAS · QUE SE HAGA SOLO en verde) y un marcador de guardado que se dibuja y se
  llena de verde (2.7-3.1). Queda ~3 s con latidos suaves.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba** (acá hay texto gigante, gris pendiente, zona y 380-1600 y no hay subtítulos).

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

