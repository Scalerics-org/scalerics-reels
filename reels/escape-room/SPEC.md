# Reel "Escape room": spec

Reel vertical 1080x1920 de Scalerics. Producto: SISTEMA A MEDIDA (stock, pedidos, proveedores,
caja y varios locales en un solo lugar, hecho para cómo trabaja ese negocio). Formato P: ESCAPE
ROOM / REALITY. Un GAME MASTER (voz grave Algenib, un parlante de pared con ojo LED rojo) encierra a
tres empleados en el depósito del local: para salir tienen que averiguar UNA sola cosa, cuánto
stock hay. "Esto no es El juego del calamar. Es peor." Los tres buscan pistas: el pillo (Fenrir)
va al cuaderno del dueño ("¡Fácil!"), la joven (Leda) lo lee con linterna UV ("cajas de lo de
siempre, unas cuantas. ¿Cuántas son unas cuantas?"), la encargada (Kore) encuentra tres planillas
("stock final, stock final dos, y stock final ahora sí") que dicen tres números distintos; el
proveedor dice que ya le pagaron y el cuaderno dice que debe; las cajas del otro local no las
anotó "nadie, nunca". El cronómetro baja (cuarenta minutos, diez minutos). "¡Llamemos al dueño!":
el dueño (Charon) sale de un rincón, barbudo y con telarañas: "Acá estoy. Hace años que estoy
encerrado. Yo tampoco sé." "Se terminó el tiempo. Nadie sale." GIRO (se prende la luz, Orus): el
problema no es tu gente, es que el negocio vive en un cuaderno, tres planillas y la cabeza del
dueño; sistema a medida, la respuesta está en el celular y la puerta se abre. Cierre: "¿Cuánto
tardarían en salir los de tu local? Comentá tu tiempo." Voz de 72.1 s (14 parlamentos, ver
`partes/`), total 75.28 s.

## Estilo: cuarto oscuro con luz UV
Depósito a oscuras con luz negra: tubo UV violeta arriba que titila, halo violeta que respira,
viñeta negra, piso marcado con una línea violeta, "salida →" pintado en tinta UV abajo a la
derecha. Arriba a la izquierda "SALA 1 · EL DEPÓSITO" (mono violeta); arriba a la derecha el
CRONÓMETRO ROJO DE 7 SEGMENTOS del ambiente: 60:00 quieto hasta "Tienen una hora" (7.59), baja a
40:00 en "Cuarenta minutos" (28.2), a 10:00 en "Diez minutos" (38.84) y a 00:00 en "tiempo"
(46.87), donde titila. Alarma roja en los bordes con cada anuncio de tiempo. Las pistas brillan en
tinta UV (menta) y los candados son rojos. Las escenas de tiempo (s03, s07, s10, s12, s16) muestran
el cronómetro gigante en el centro. Personajes dibujados genéricos con relleno plano y contorno
hueso (caras hueso, rasgos oscuros).
LA LUZ (50.6, entra Orus): flash, el violeta se va, el tubo pasa a blanco, luz clara con un halo
verde Scalerics, el cronómetro rojo se apaga. En la puerta (64.5) aparece un cronómetro VERDE que
pasa de 00:00 a 00:01 cuando "la puerta se abre" (67.4) y el cartel dice "SALA 1 · ABIERTA". En el
CTA (68.3) vuelve el UV violeta (tu local) con el cronómetro rojo en "--:--" titilando.

## Paleta
- Noche violeta `#08040f` / `#1a0f2e`: fondo y rellenos.
- Violeta UV `#9b5cff` (y `#b388ff` en textos mono): luz, tubo, buzo del pillo.
- Tinta UV menta `#39ffd2`: pistas que brillan, acento de los subtítulos.
- Rosa UV `#ff4fd8`: la joven, signos de pregunta, carteles.
- Rojo LED `#ff2d3d`: cronómetro, candados, sellos.
- Hueso `#efe9ff`: contornos, caras y textos.
- Desde s13 (la luz): verde Scalerics `#5ce611` (el sistema, la puerta abierta).

## Cómo están hechas las escenas
Se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs` y `amb.mjs` (el
ambiente); personajes y utilería en `partes/escenas/pj.mjs` (pillo, joven, encargada, dueño, game
master, candado, cuaderno, planilla, caja, puerta, celular, local y `seg7()` el cronómetro de
segmentos, que el JS maneja con `reloj()`/`pinta()` desde UNA interpolación por escena). Después,
`node armar.mjs` (subtítulos menta, fondo violeta y la capa `compositions/ambiente.html`).
Voz: `partes/voces.sh` (Gemini, una voz por parlamento), `partes/recortar.sh` (silencios y atempo
por voz), `tiempos.mjs` por parlamento y `partes/componer.mjs` (pega con silencios y arma
`palabras.json`).

## Voces
Algenib game master (grave, frío), Fenrir el pillo, Leda la joven, Kore la encargada, Charon el
dueño, Orus narrador (la luz y el cierre).

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


## Escenas (tiempos relativos a cada escena: ver tiempos.md)
- **s01-encerrados** (0.00, 3.34 s): los tres empleados en fila bajo un cono de luz violeta (ya a
  medio entrar en el cuadro 0). "tres" parpadean; "empleados" (0.9) cae un candado rojo y se tensan
  dos cadenas violetas; "depósito" (1.7) sello rojo "ESCAPE ROOM · SALA: EL DEPÓSITO".
- **s02-objetivo** (3.34, 4.25 s): puerta chica del depósito con candado y cartel "SALIDA" que
  titila; "una sola cosa" (1.16) golpe "UNA SOLA COSA"; desde 2.2 una linterna menta barre y en
  tinta UV aparecen "¿CUÁNTO" (2.36), "STOCK" (2.99) y "HAY?" (3.62).
- **s03-una-hora** (7.59, 3.82 s): cronómetro gigante 60:00 que arranca a bajar en "hora"; el
  parlante del game master abajo con el LED que titila y ondas; "juego del calamar" (1.31) la frase
  "Esto no es El juego del calamar."; "Es peor" (2.71) golpe rojo "ES PEOR." con sacudón.
- **s04-facil** (11.41, 2.76 s): "¡FÁCIL!" menta gigante, el pillo sobrador señalando; "cuaderno"
  (1.4) cae el cuaderno "DEL DUEÑO" y se dibujan los garabatos; etiqueta "PISTA 1 · EL CUADERNO".
- **s05-lo-de-siempre** (14.17, 6.04 s): el cuaderno abierto a pantalla, oscuro; la joven abajo a
  la derecha con linterna UV que barre la hoja. En letra manuscrita menta aparecen "cajas de lo de"
  (1.1), "siempre:" (1.95), "unas cuantas" (3.2, se encierra en un óvalo rosa). "¿Cuántas son unas
  cuantas?" (4.5) tres signos de pregunta rosas, cejas arriba.
- **s06-planillas** (20.21, 7.99 s): una planilla "STOCK FINAL 2" en el centro; "tres" (1.5)
  entran "STOCK FINAL" y "STOCK FINAL / AHORA SÍ"; cada una salta cuando se nombra (1.8, 2.9, 4.5;
  "ahora sí" tiembla); "las tres dicen" (6.3) aparecen 48, 112 y 7; "distinto" (6.95) dos "≠" rojos
  y sello "NO COINCIDEN".
- **s07-cuarenta** (28.20, 1.84 s): cronómetro gigante 40:00 que titila, "QUEDAN" rojo, parlante.
- **s08-proveedor** (30.04, 4.13 s): el pillo con el celular en la oreja; "Dice que ya le pagamos"
  (1.1) globo menta "EL PROVEEDOR: Ya me pagaron."; "cuaderno" (2.65) entra el cuaderno, gota de
  sudor; "no" (3.5) sello rojo "DEBE" y un "≠".
- **s09-otro-local** (34.17, 4.67 s): LOCAL 1 y LOCAL 2 (rosa) unidos por una ruta punteada; caen
  tres cajas con "?" junto al local 2; "¿Quién las anotó?" (1.4) un REGISTRO vacío; "Nadie." (3.0)
  y "Nunca." (3.83) dos sellos.
- **s10-diez** (38.84, 3.29 s): cronómetro 10:00 que titila; el pillo tiembla con las manos en la
  cabeza; "¡Llamemos al dueño!" (1.75) cartel rosa "¡LLAMEN AL DUEÑO!".
- **s11-dueno** (42.13, 3.74 s): el dueño sale de la oscuridad (barba gris larga, ojeras); sello
  "RECLUSO: EL DUEÑO" (0.95); "encerrado" se dibujan telarañas en las esquinas; "Yo tampoco sé"
  (2.6) un "?" rosa gigante arriba.
- **s12-nadie-sale** (45.87, 4.73 s): cronómetro gigante llega a 00:00 y titila; "Nadie" (2.0-2.5)
  caen tres candados que se cierran; "sale" (2.6) sello "NADIE SALE".
- **s13-luz** (50.60, 5.81 s): SE PRENDE LA LUZ (ambiente). Los cuatro (tres empleados y el dueño)
  en fila, encandilados; "gente" (0.85) checks verdes sobre cada uno; arriba entran "cuaderno"
  (2.65), "tres planillas" (3.45) y "la cabeza del dueño" (4.35, con un nudo rojo), enredados con
  hilos rojos punteados hacia la gente; etiqueta verde "TODO DESPARRAMADO".
- **s14-a-medida** (56.41, 8.07 s): celular "Tu sistema" con etiqueta verde "A MEDIDA" (0.8) y una
  cinta métrica menta que lo mide; cartel rosa "COMO TRABAJÁS VOS" (1.5); entran las filas verdes
  Stock (2.84), Pedidos (3.53), Proveedores (4.25), Caja (5.13), Local 1 + Local 2 (5.79); "en un
  solo lugar" (6.6) marco verde que las junta y sello "TODO EN UN SOLO LUGAR".
- **s15-puerta** (64.48, 3.84 s): a la izquierda el celular "¿Cuánto stock hay?" y en "celular"
  (0.95) la respuesta "248 · CAJAS · AL DÍA"; a la derecha la puerta del depósito con candado:
  "puerta" (2.3) el candado se abre y cae, "abre" (2.9) la puerta se abre a verde.
- **s16-cta** (68.32, 6.96 s): cronómetro gigante en "--:--" titilando, la puerta cerrada con
  candado (tu local); globo de comentario "TU TIEMPO" que se escribe solo "Nunca. Seguimos
  adentro." (desde 2.3); "Comentá tu tiempo" (2.67) sello menta "COMENTÁ TU TIEMPO".
