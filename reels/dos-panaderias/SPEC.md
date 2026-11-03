# Reel "Dos panaderías" — spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
línea de Juan del 02-11). Producto: **sistema a medida** (ventas por día → cuánto producir). Una
sola voz: Orus.

Historia: dos panaderías en la misma cuadra, las dos con buen pan. A la IZQUIERDA la de Jorge: la
cuenta de cuánto hornear la hace a ojo, a las cuatro de la mañana. Un domingo se pasa (sobran
tres bandejas, regaladas o a la basura), al otro se queda corto (a las diez no hay más y la gente
se va con las manos vacías); el cuaderno de "lo que salió" está a medio llenar. A la DERECHA la de
Mónica: el mismo pan y un sistema hecho a su medida que anota qué se vende cada día; el sábado a la
noche mira en el celular cómo se vendió los últimos domingos, sabe que si llueve salen más
bizcochos y que a fin de mes cambia, y hornea lo justo. Giro respetuoso: los dos son igual de
buenos panaderos; Mónica, además, sabe lo que va a vender. Cierre para compartir: "Mandáselo al
panadero que hace las cuentas a las cuatro de la mañana."

**Recurso visual central: EL MISMO DOMINGO EN PARALELO, CON UN RELOJ COMÚN.** (dos-cafeterias y
dos-distribuidoras partieron izquierda/derecha con una línea; dos-talleres arriba/abajo;
dos-tiendas en secuencia.) Acá las dos panaderías cuelgan de UN reloj de pared compartido en el
centro de arriba, que marca la misma hora para las dos y gira cuando la historia salta (04:00 de
la madrugada, 13:00 con lo que sobró, 10:00 cuando no queda, sábado 21:00 cuando Mónica mira el
celular). Debajo del reloj un rótulo mono con el día y la hora. Medidas fijas (s01–s10):
- Reloj: círculo centro (540, 700) r 46 crema, 12 marquitas, aguja de hora (largo 24) y de
  minutos (largo 34) que rotan con `svgOrigin "540 700"`. Rótulo: mono 24px crema 0.6, centrado
  en (540, 784): "DOMINGO", "DOM 04:00", "CADA DÍA", "DOM 13:00", "OTRO DOMINGO", "DOM 10:00", "SÁB 21:00".
- Divisoria punteada x=540, y 812–1220 (crema 0.3), que nace del reloj. Suelo común y=1180.
- Encabezados: izquierda x=270, "JORGE" (Lexend 600 36px, crema 0.55) y=672 + "A OJO" (mono 24px,
  crema 0.4) y=712; derecha x=810, "MÓNICA" (verde) + "A SU MEDIDA" (verde 0.8).
- Panadería (coordenadas locales, origen = suelo al centro, ~400 de ancho): pared
  `M-180 0 V-230 H180 V0`, toldo con festones, cartel `rect -130,-336 260x50` "PANADERÍA" (mono),
  vitrina `rect -150,-190 200x130` con dos estantes y medialunas, puerta `rect 70,-170 80x170`.
  Centro x 270 / 810.
- Cuando el beat es de un solo lado, el otro queda a 0.28 (no desaparece).
- El encabezado (reloj, nombres, divisoria) no se va con el blur de salida cuando la escena
  siguiente también lo tiene: así el reloj queda fijo entre cortes.
Color con significado: lo de Jorge en crema apagado y SOLO en los dolores (bandejas que sobran,
la basura, la vitrina vacía, la mitad vacía del cuaderno) **rojo apagado `#c0625a`**; lo de
Mónica en verde `#5ce611` (vidrios, barras del panel, tildes, cinta métrica de "a su medida").
Jorge nunca queda mal parado: es buen panadero, solo calcula a ojo.
Interfaz recreada: caja que registra, barras de la semana, celular con barras de "los últimos 4
domingos" (las cifras son bandejas de la historia: 7, 8, 7, 8; nada de porcentajes), chips
"LLUEVE: + BIZCOCHOS" y "FIN DE MES", tarjeta "DOMINGO · HORNEAR 8 BANDEJAS".

Fondo, logo y subtítulos: los del molde (`armar.mjs` sin cambios).

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
- Prohibido: emojis, degradés, glow/neón, glass, sombras, serif, cualquier color fuera de `#c0625a` (rojo apagado, solo en dolores),
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


## Inicios globales
s01 0 · s02 5.36 · s03 8.90 · s04 13.91 · s05 20.60 · s06 26.05 · s07 31.11 · s08 33.91 ·
s09 38.51 · s10 44.23 · s11 51.64 · s12 56.34 (dura hasta 62.69; la voz termina en 59.49).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-dos-panaderias** (0–5.36) — "Dos panaderías en la misma cuadra. Una sabe cuántas medialunas
hornear el domingo." Cuadro 0: la panadería de la izquierda a medio dibujar. En "panaderías"
(0.40) se dibuja la de la derecha, idéntica. En "cuadra" (1.50) aparece el reloj común, la
divisoria y los encabezados; rótulo "DOMINGO". En "Una" (2.32) la de Mónica se prende (vidrio y
vitrina verdes) y la de Jorge baja a 0.5. En "medialunas" (3.40) las medialunas de la vitrina de
Mónica hacen pop una por una en verde; en "domingo" (4.30) tilde verde arriba de la derecha y "?"
crema apagado arriba de la izquierda. Etiqueta: "MISMA CUADRA" → "UNA SABE CUÁNTO HORNEAR".

**s02-diferencia** (5.36–8.90) — Tabla de la serie, columnas x 270 / 810, filas y 900 / 1020 /
1140 (encabezado con el reloj arriba). "rubro" (0.24): medialuna = medialuna; "calle" (1.24):
cartel de calle = cartel; "una sola diferencia" (1.89–2.34): a la izquierda un cuaderno con "?"
rojo apagado, a la derecha un panel con barras verdes y tilde, "≠" verde con punch. Etiqueta:
"MISMO RUBRO" → "UNA DIFERENCIA".

**s03-jorge** (8.90–13.91) — Lado de Jorge (derecha 0.28). En "izquierda" (0.20) punch de la
panadería; en "Jorge" (1.00) la panadería baja a 0.25 y se dibuja Jorge (gorro de panadero,
bigote, delantal) detrás de un mostrador, x 270. "buen pan" (1.81): pop de un pan flauta con
tilde crema. "la cuenta a ojo" (2.60–2.90): globo de pensamiento con "¿6? ¿8? ¿10?" que van
apareciendo, el ojo de Jorge entrecerrado. "cuatro de la mañana" (3.50): el reloj común gira a las
04:00, rótulo "DOM 04:00", una luna crema chica al lado del reloj. Etiqueta: "LA DE JORGE" → "BUEN PAN" →
"A OJO, A LAS 4".

**s04-monica** (13.91–20.60) — Lado de Mónica (izquierda 0.28). En "derecha" (0.19) punch de la
panadería; en "Mónica" (1.09) se dibuja Mónica (gorro, pelo atado) detrás del mostrador, x 700.
"el mismo pan" (2.09–2.39): el mismo pan flauta. En "sistema" (3.19) pop de una caja con pantalla
a la derecha (x 900); en "medida" (3.79) una cinta métrica verde se dibuja alrededor de la caja;
en "anota" (4.39) tickets que entran a la caja; en "cada día" (5.39) arriba de la caja una fila
de 7 barritas (L M M J V S D) que crecen en verde, y el reloj gira dos vueltas rápido (pasan los
días, rótulo "CADA DÍA"). Etiqueta: "LA DE MÓNICA" → "EL MISMO PAN" → "HECHO A SU MEDIDA" →
"ANOTA CADA DÍA".

**s05-se-pasa** (20.60–26.05) — Lado de Jorge. "Un domingo" (0.10): el reloj gira a las 13:00,
rótulo "DOM 13:00". Vitrina grande de Jorge (x 90–450, y 830–1120) con 4 estantes llenos. En
"sobran" (1.55) los estantes se mantienen llenos; en "tres bandejas" (1.80–2.10) tres estantes se
marcan en rojo apagado con un "+3" rojo. En "regaladas" (3.40) una bandeja sale de la vitrina
hacia una bolsita con un corazón crema (se regala); en "basura" (4.40) un tacho se dibuja abajo a
la derecha (x 440) y la otra bandeja cae adentro, rojo apagado. Etiqueta: "SOBRAN 3 BANDEJAS" →
"REGALADAS O A LA BASURA".

**s06-corto** (26.05–31.11) — Lado de Jorge. "Al otro" (0.05): rótulo "OTRO DOMINGO"; "diez"
(1.85): el reloj gira a las 10:00, rótulo "DOM 10:00". La misma vitrina, vacía (estantes
punteados), con un cartelito "NO HAY" rojo apagado en "no hay" (2.55). En "gente" (3.25) tres
figuritas en fila delante; en "se va" (3.65) giran y salen caminando hacia la izquierda; en "manos
vacías" (3.95–4.25) sobre la última, dos manos abiertas con un "0" crema. Etiqueta: "A LAS 10 NO
HAY" → "SE VAN SIN NADA".

**s07-cuaderno** (31.11–33.91) — Lado de Jorge. En "cuaderno" (0.19) pop de un cuaderno abierto
(x 80–460, y 830–1150) con espiral; en la hoja izquierda renglones "LUN 6", "MAR 5", "MIÉ 7" que
se escriben; en "salió" (0.69) la pluma se queda quieta; en "A medio llenar" (1.49–1.79) la hoja
derecha vacía con contorno punteado rojo apagado y un "?" rojo apagado. Etiqueta: "LO QUE SALIÓ" →
"A MEDIO LLENAR".

**s08-sabado** (33.91–38.51) — Lado de Mónica. En "sábado a la noche" (0.69–1.19) el reloj gira a
las 21:00, rótulo "SÁB 21:00", luna. Pop del celular de Mónica (x 650–970, y 800–1230) con título
"DOMINGOS"; en "mira" (1.85) se dibujan los ejes; en "vendió" (2.59) crecen 4 barras verdes con
su número arriba (7, 8, 7, 8) y debajo "BANDEJAS"; en "últimos domingos" (3.09–3.49) subrayado
verde "ÚLTIMOS 4". Etiqueta: "SÁBADO, 21:00" → "LOS ÚLTIMOS DOMINGOS".

**s09-lluvia** (38.51–44.23) — Lado de Mónica, el mismo celular. "llueve" (0.49): lluvia de rayitas
crema sobre la mitad derecha y una nube; en el celular las barras se achican arriba y entra el chip
"LLUEVE" con nube y, en "bizcochos" (1.49), "+ BIZCOCHOS" en verde. "fin de mes" (2.69–2.99):
chip con almanaque "FIN DE MES" y una flecha que cambia. En "hornea" (3.97) tarjeta verde
"DOMINGO · HORNEAR 8 BANDEJAS" con tilde que hace punch en "justo" (4.39). Etiqueta: "SI LLUEVE"
→ "FIN DE MES" → "LO JUSTO".

**s10-los-dos** (44.23–51.64) — Los dos de frente, iguales y bien parados: Jorge x 270 y Mónica x
810 (ambos crema a pleno), cada uno con una bandeja de medialunas. "igual" (0.67): "=" en el medio;
"buenos panaderos" (1.17–1.47): tilde crema sobre cada uno. "La diferencia" (2.87): en el frente del
mostrador de Mónica pop de un mini panel con barras verdes; "Mónica, además" (3.87–4.37) el panel hace punch; "sabe lo
que va a vender" (5.47–6.17): tarjeta "DOMINGO · 8 BANDEJAS" con tilde verde. El encabezado se
apaga en los últimos 0.3 s (s11 no lo tiene). Etiqueta: "IGUAL DE BUENOS" → "LA DIFERENCIA" →
"UNA SABE QUÉ VA A VENDER".

**s11-scalerics** (51.64–56.34) — Pantalla completa. "Scalerics" (0.66): "SCALERICS" en Lexend
600 verde arriba (y 700). "sistemas" (1.83): se dibuja un monitor con un panel (barras por
producto: MEDIALUNAS, BIZCOCHOS, PAN) y una caja al lado; "a la medida" (2.86): una cinta
métrica verde con marquitas se dibuja abrazando el monitor; "tu negocio" (3.36–3.46): tilde verde en
la esquina de la cinta. Todo el dibujo corrido 95 px a la izquierda para quedar centrado.
Etiqueta: "SISTEMAS A MEDIDA" → "A LA MEDIDA DE TU NEGOCIO".

**s12-cta** (56.34–62.69) — Cierre. Reloj grande (r 80, centro 540, 760) que en "cuatro" (1.96)
gira a las 04:00, luna; debajo una libretita con "¿6? ¿8? ¿10?" que se tachan en "cuentas"
(1.46). En "Mandáselo" (0.00) botón verde "MANDÁSELO" (avión de papel) abajo (y ~1150); en
"panadero" (0.46) un gorro de panadero chico al lado del botón. Después de la voz, el avión de
papel sale volando y vuelve a posarse (movimiento suave hasta el final). Etiqueta: "A LAS 4 DE LA
MAÑANA".
