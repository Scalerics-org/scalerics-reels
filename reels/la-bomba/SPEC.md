# Reel "La bomba": spec

Reel vertical 1080x1920 de Scalerics. Producto: SISTEMA A MEDIDA (el programa de gestión hecho
para cómo trabaja el negocio: stock, pedidos, proveedores, caja y varios locales en un solo lugar,
en vez de la planilla de catorce pestañas). Formato P: PELÍCULA DE DESACTIVAR BOMBAS. En un
búnker en penumbra, la "bomba" es la notebook del local con LA PLANILLA
(`planilla_local_FINAL_v14.xlsx`): cables de colores, cinta de peligro y un cronómetro rojo de
7 segmentos atado arriba del teclado. El EXPERTO en explosivos (Fenrir, casco con linterna, suda)
ordena "¡Nadie se mueve!"; la COMPAÑERA nerviosa (Kore) lee las catorce pestañas ("Stock final",
"Stock final dos", "Stock final ahora sí", "NO TOCAR"); el DUEÑO (Charon) confiesa: "Mi cuñado.
En el dos mil quince. Después se fue a vivir a España." Todo se pone en rojo (#¡REF!, stock -40),
"¿corto el cable rojo o el azul?", "¡el rojo no! ese une la caja con el otro local", quedan diez
segundos y el cuñado no contesta, "esto no lo desarma ni MacGyver", el último recurso: Control Z...
"¡No responde!", "¡Cuerpo a tierra!", BOOM. GIRO (el experto tiznado, mirando a cámara): "La
bomba no era la fórmula. La bomba es que tu negocio entero depende de un archivo que no entiende
nadie." Orus cierra: sistema a medida, "sin pestañas de no tocar, sin llamar al cuñado; un sistema
a tu medida no explota". CTA: "¿Cuántas pestañas tiene la tuya? Contalo en los comentarios."
Voz de 72.8 s (15 parlamentos, ver `partes/`), total 76.03 s.

## Estilo: búnker / depósito en penumbra con bomba-notebook
Fondo casi negro verdoso con la grilla tenue de bloques de hormigón (en `armar.mjs`). Capa
`compositions/ambiente.html` (generada con `node partes/escenas/ambiente.mjs`): haz de LINTERNA
ámbar que barre el búnker, viñeta, cinta de peligro amarilla y negra abajo, rótulo "● OPERATIVO
PLANILLA" arriba a la izquierda y un CRONÓMETRO chico de 7 segmentos arriba a la derecha que
corre EN TIEMPO REAL (00:47 en t=0, 00:10 justo en "quedan diez segundos", se clava en 00:01
durante el Control Z, 00:00 y BOOM a 49.44 s). La bomba de cada escena muestra el mismo valor
(helpers `CRONO_VALS` / `cronoGrupos` / `tickJS` en `pj.mjs`). Alarma roja que late en "se puso
todo en rojo" y desde "quedan diez segundos" cada vez más rápido. BOOM: flash, la cinta se cae, el
rótulo se apaga. Desde Orus (57.06 s): luz verde Scalerics y el cronómetro en "--:--" verde; en
"no explota" el rótulo pasa a "BOMBA DESACTIVADA". Titulares en Black Ops One (estarcido militar),
textos de UI en IBM Plex Mono, personajes dibujados genéricos de relleno plano y contorno hueso.

## Paleta
- Búnker `#070807` / `#1f231d`: fondo y rellenos.
- Oliva `#4a5a2e`: uniformes y casco.
- Rojo cronómetro `#ff2d2d`: dígitos, NO TOCAR, errores, cable rojo.
- Ámbar linterna `#ffb020`: haz, cinta de peligro, acento de subtítulos.
- Azul cable `#2f7bff` y verde planilla `#21a366`.
- Hueso `#ecebe4`: contornos y textos.
- Desde s14: verde Scalerics `#5ce611` (el sistema a medida, "no explota").

## Cómo están hechas
Escenas: `node partes/escenas/gen.mjs` arma `compositions/<id>.html` y `.sfx.json` desde
`partes/escenas/sNN.mjs` (personajes y utilería en `pj.mjs`: bomba, experto, compañera, dueño,
seg7). Ambiente: `node partes/escenas/ambiente.mjs`. Después `node armar.mjs`. Voz:
`partes/voces.sh` (Gemini), `partes/recortar.sh` (silencios y atempo por voz),
`tiempos.mjs` por parlamento y `partes/componer.mjs` (pega con silencios; 1.5 s después de
"¡Cuerpo a tierra!" para la explosión; correcciones a mano con silencedetect).

## Voces
Fenrir experto en explosivos (tenso, susurrado), Kore compañera nerviosa, Charon dueño
avergonzado, Orus narrador (solo al final).

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


## Escenas (tiempos relativos a cada escena; ver tiempos.md)

- **s01-nadie** (3.70 s): la linterna busca en la oscuridad (velo negro con agujero) y encuentra
  la bomba-notebook; se abre la luz en "Alguien" (1.02). "¡NADIE SE MUEVE!" (Black Ops, "mueve" en
  rojo) cae en 0.1. "fórmula" (1.6): recuadro rojo titilante y flecha sobre la celda `=SUMA(`.
  "planilla" (2.2): sello "planilla del local"; la bomba tiembla.
- **s02-catorce** (3.13): la compañera con linterna temblorosa a la izquierda; "¿QUÉ?" (0.05);
  "catorce" (1.3): "14" ámbar gigante y "pestañas"; caen las 14 pestañas en dos columnas
  (STOCK FINAL, ... NO TOCAR en rojo, PRECIOS 2019, COPIA DE COPIA, HOJA7, CAJA (MAL)...).
- **s03-leemelas** (2.45): primer plano del experto sudando, una gota cae, la lámpara del casco
  titila; "Despacio" (1.21): "DESPACIO" en mono ámbar, letra por letra.
- **s04-pestanas** (7.24): las pestañas grandes entran en su palabra (0, 1.25, 2.5) y se iluminan
  mientras se leen; "y una que dice..." (4.62); "NO" (5.78): pestaña roja gigante "NO TOCAR" con
  sacudón y brillo que late en "TOCAR".
- **s05-cunado** (6.04): "¿QUIÉN ARMÓ ESA?" + pestaña NO TOCAR temblando; "Mi" (1.49): entra el
  dueño y cae la polaroid del cuñado (anteojos negros, peinado con gel, mate); "dos mil" (2.79):
  sello "2015"; "Después" (3.92): avioncito que se va por una ruta punteada; "España" (5.19):
  "→ ESPAÑA".
- **s06-rojo** (6.16): la bomba; la pantalla parpadea y se tiñe de rojo en "rojo" (0.89);
  "Error" (1.57): "#¡REF!" en todas las celdas y sello "ERROR EN TODAS LAS CELDAS"; "stock"
  (3.7): panel STOCK; "cuarenta" (5.0): "-40" gigante con sacudón.
- **s07-cables** (5.30): el experto con el alicate a la izquierda, cable rojo y azul gruesos a la
  derecha; "TRANQUILOS." (0.1); "películas" (1.89): sello "como en las películas"; "¿ROJO" en
  "rojo" (3.59) y "o AZUL?" en "azul" (4.4), cada cable engorda en su palabra; el alicate duda.
- **s08-caja** (3.24): "¡EL ROJO NO!" en rojo (0.05) y el dueño gritando; "caja" (1.6): caja
  registradora; "otro local" (2.2): el otro local; el cable rojo los une (se dibuja desde 1.3).
- **s09-diez** (3.89): el cronómetro gigante (00:10 → 00:07, en tiempo real, late cada segundo);
  "Y" (1.3): la compañera llama: celular "LLAMANDO... Cuñado +34 · España" que vibra; "contesta"
  (2.5): "NO CONTESTA" en rojo.
- **s10-ctrlz** (6.09): el experto sudando a mares; "MacGyver" (1.2): caen un clip y un chicle
  rosa, sello "ni MacGyver"; "Voy" (2.55): suben dos teclas gigantes CTRL + Z y "lo único que
  queda..."; tiemblan de suspenso; "Control" (4.52) y "Z" (5.0) se hunden y se ponen ámbar.
- **s11-boom** (3.59): ventana "(No responde) ¿Esperar? ¿Esperar más?" con la ruedita girando;
  "¡Cuerpo" (1.25): "¡CUERPO A TIERRA!" y los dos se tiran al piso; 2.2 (BOOM global 49.44):
  estrella de explosión ámbar y roja, "BOOM", sacudones, flash del ambiente y humo que tapa todo.
- **s12-tiznado** (1.70): el experto tiznado, con el pelo parado y hollín, entre el humo que se
  disipa; parpadea dos veces; "era" (0.9): sello "no era la fórmula".
- **s13-archivo** (4.53): EL GIRO: tu local entero colgando; "tu negocio entero" (1.3); "depende"
  (2.0): el hilo sube hasta un archivito .XLSX con etiqueta NO TOCAR (2.5); "no entiende nadie"
  (3.0-3.4): signos de pregunta rojos; el local se balancea.
- **s14-medida** (7.86): Orus. "SISTEMA A MEDIDA" en verde; notebook limpia, sin cables ni
  cronómetro, con un sistema verde "TU LOCAL · sistema"; módulos en su palabra: STOCK 1.4,
  PEDIDOS 2.1, PROVEEDORES 2.8, CAJA 3.6, LOCALES 4.6; "solo lugar" (5.3): panel con Local Centro,
  Local 2, Depósito y Caja de hoy en OK; "hecho" (6.28): una cinta métrica ámbar la mide y sello
  "a tu medida" en "trabajás" (6.8).
- **s15-no-explota** (5.11): "Sin pestañas de no tocar": la pestaña NO TOCAR se tacha en verde
  (0.6); "Sin llamar al cuñado": el contacto "Cuñado" se tacha (2.04); "Un sistema" (2.95):
  cronómetro verde "--:--" y los cables se desenchufan; "explota" (4.14): "NO EXPLOTA." verde.
- **s16-cta** (6.00): "¿CUÁNTAS PESTAÑAS / TIENE LA TUYA?" y una fila de pestañas que titila en
  "???"; "Contalo" (1.71): dos comentarios de ejemplo ("Diecinueve. Y una se llama 'NO ABRIR'.",
  "La mía la armó mi suegro.").
