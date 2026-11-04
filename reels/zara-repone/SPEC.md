# zara-repone · caso de éxito, formato "resultaaquee"

Zara/Inditex no se juega toda la temporada de entrada: fabrica en tandas chicas, mira qué se
vende cada día en sus tiendas y repone eso. Bisagra "¿Por qué?" (lo que no se vende es plata
colgada). Giro a la mitad: "Todos miran la fábrica. Pero la ventaja empieza en la caja." Cierre:
sistema a medida (stock y ventas en un solo lugar, para saber qué reponer) y videollamada gratis.
Fuentes en `fuentes.md`. La marca se nombra; nada de su logo, tipografía ni colores.

## Lo que cambia respecto de SPEC-base
- Nada de dibujo de líneas: UN objeto grande RELLENO por escena (colores planos, luz en
  diagonal con corte duro, lado más oscuro, sombra plana en el piso) que se transforma en el
  siguiente: remera en la percha → otra que cae → etiqueta "?" → remera apagada que se vuelve
  billete colgado → caja gigante tachada → tres cajas chicas → tienda con la semana tildada y
  globo "Hoy se vendió" → dos perchas (sale / no sale) → fábrica con ojos que la miran → paneo
  a la caja registradora "VENDIDO" → estante con "?" → panel "Stock y ventas" a medida → el
  panel gira y es la videollamada.
- Anotaciones: pills con borde (38-50 px), recuadros de selección verdes con esquinas,
  contadores, tildes y cruces en círculo.
- Subtítulos arriba al centro, 1 a 4 palabras, Lexend 700 86 px blancos, palabra clave en
  recuadro verde (rojo apagado en "colgada" y "no"). Los arma `armar.mjs` (versión propia). El
  gancho (s01) y el CTA (s10) no llevan subtítulos: tienen el texto grande en la escena.
- Fondo navy `#0b1220` casi liso (degradé mínimo, por la compresión) con estrellitas tenues.
- Paleta: navy `#0b1220`, `#16243d`, `#1f3254`; crema `#efeee5` (`#d6d4c6`, `#b9b7a8`);
  blanco; verde `#5ce611` (sombra `#3fa60a`); rojo apagado `#c7655b` solo para lo que no se vende.

## Cómo se arma
Las escenas NO se escriben a mano: salen de `gen.mjs` (piezas: barra, percha, remera, etiqueta,
billete, caja, tablet). Después de tocarlo: `node gen.mjs && node armar.mjs`.

## Escenas
- s01-gancho (0-3.0): "Zara no se juega / toda la / temporada / de entrada." a 112 px desde el
  cuadro 0 + barra de perchero y remera verde gigante. "toda la temporada": el perchero se llena
  de remeras crema; pill "Todo de entrada" roja, tachada.
- s02-repone: "vende": recuadro, tilde y "Se vendió"; la remera sale para arriba; "repone": cae
  otra igual en la percha, pill "Repone".
- s03-colgada: "¿Por qué?": etiqueta con "?" que se hamaca. "no se vende": la remera se apaga a
  gris, "No se vendió". "plata colgada": la remera se vuelve un billete colgado de la percha.
- s04-tandas: caja gigante "TODO" que cae y se tacha; se achica y salen tres cajas chicas 1-2-3,
  "Tandas chicas".
- s05-tiendas: tienda grande; "cada día": se tildan L a D; "cuentan qué se vende": globo blanco
  "HOY SE VENDIÓ" con barras.
- s06-sale: dos perchas. "sale": la verde con recuadro y "Sale"; "vuelve": ícono de repetir y
  copias atrás. "no": la crema pasa a rojo apagado, "No sale"; "no se repite": se cae y queda el
  hueco punteado con cruz.
- s07-giro: fábrica grande y cinco ojos mirándola; "Pero": paneo, sale la fábrica y entra la
  caja registradora con "VENDIDO"; "caja": se abre el cajón, recuadro y "Acá empieza".
- s08-vos: estante con pilas de ropa y "?" sobre cada una; "más": la selección salta sin decidir.
- s09-sistema: tablet "Stock y ventas" con 4 filas; "a medida": sello "A MEDIDA"; "stock" y
  "ventas": columnas que cuentan y barras; "juntos": recuadro a las dos; "reponer": la fila de
  remeras (48 vendidas, 6 en stock, en rojo) se marca y "Reponer remeras". Los números son de
  interfaz de ejemplo, no estadísticas.
- s10-cta: el panel gira a horizontal y es la videollamada (Tu negocio / Scalerics); "Videollamada
  / gratis (recuadro) / scalerics.com" en verde.

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

