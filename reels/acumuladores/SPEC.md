# Reel "Acumuladores": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: TIENDA ONLINE. Formato P (cultura popular): REALITY
DE ACUMULADORES, programa inventado "Enterrados en Stock" (el género solo se nombra de forma
genérica; nada de programas, logos ni caras reales). La VOZ EN OFF del reality (Gemini Algenib,
grave y solemne) abre con el gancho: "Esta mujer tiene trescientas camperas guardadas. Y vende solo
a los que pasan por la vereda." Presenta el caso de NORMA, dueña de un bazar de barrio con "un
depósito que da miedo". La organizadora profesional PATRICIA (Gemini Kore, firme, con guantes)
pregunta por cada caja; NORMA (Gemini Gacrux, señora tierna y terca) se aferra: "¡No, esa no! Son
camperas. Las vendo en marzo." / "Norma, la caja dice marzo del año pasado." / "¡Bueno, algún marzo
va a ser!" / las ojotas "de dos veranos atrás, pero están nuevitas. El que quiera, que venga al
local." Voz en off: "Pero nadie viene. Norma tiene una sola vidriera. Y medio metro de vereda."
CONFESIONARIO (Norma, llorando): "Yo no soy acumuladora. Yo quiero vender. Pero la gente pasa
mirando el celular." GIRO (Patricia, se saca los guantes, cálida): "Norma, vos no acumulás. Tenés
lo que la gente busca... guardado donde la gente no mira." ORUS (Scalerics): "armamos tu tienda
online: todo tu depósito a la venta las veinticuatro horas, con Mercado Pago y envíos por DAC,
Correo o PedidosYa." Voz en off: "Un mes después. El depósito respira. Y las camperas se van en
camioneta." Norma: "¡Vendí las camperas! ¡Y ni siquiera es marzo!" Cierre (Orus): "Mandáselo al que
tiene el depósito lleno."

Recurso visual central: la PARED DE CAJAS de cartón kraft hasta el techo (cinta amarilla, etiquetas
a mano en Caveat, rótulos rojos URGENTE) que al final se convierte en productos dentro del celular
turquesa y se va en una camioneta.

Voz armada de 15 parlamentos (`partes/01..15.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.05-1.2 y pegados con
0.28-0.55 s (`componer.mjs`, `atempo.json`, `gaps.json`). Tiempos: Speech-to-Text de cada parte;
01, 04, 07, 09, 10, 11 y 14 corregidos a mano con silencedetect. Locución 72.73 s; reel 75.93 s.

Las escenas se GENERAN: `escenas/lib.mjs` (molde de composición, helpers, personajes, cajas),
`escenas/a.mjs` (s01-s05), `b.mjs` (s06-s10), `c.mjs` (s11-s15). Para cambiar una escena: editar
su .mjs, `node escenas/hacer.mjs [sNN]` y `node armar.mjs`.

## ESTILO: REALITY EN UN DEPÓSITO ABARROTADO. Cámara en mano. Edición cargada.
Fondo gris cemento oscuro con la luz fría de un TUBO FLUORESCENTE arriba (y ~480, parpadea en los
momentos de miedo). Capa ambiente: marco de visor de cámara (esquinas crema), barra superior
"● REC · ENTERRADOS EN STOCK · T3 E12 · CAM 2" (y 116-190), polvo flotando, viñeta. ZÓCALOS del
reality (y 1376-1480): pestaña roja mono + título sobre cinta amarilla (Lexend 800, tinta
cemento). Cajas kraft con cinta de embalar amarilla y etiquetas escritas a mano (Caveat),
rótulos estarcidos (Black Ops One) rojos "URGENTE" / "FRÁGIL". Sellos rotados. Título del programa y
"UN MES DESPUÉS" sobre tiras de cinta amarilla cruzadas. El confesionario: fondo casi negro con un
cono de luz y Norma sola en una silla.
- Norma: señora, pelo de rulos crema-gris, anteojos colgando de una cadenita amarilla, cárdigan
  rojo con botones, blusa crema.
- Patricia: rodete oscuro, delantal gris cemento, GUANTES amarillos de goma, mirada firme.
- Desde s11 (Scalerics): turquesa `#19c2a5` para la tienda online (celular, botones, chips,
  sellos VENDIDO).

## Paleta (SOLO estos colores)
- Cemento `#2b2a28` / `#1c1b1a` (fondo, tinta) y gris `#77736b` (delantal, líneas apagadas).
- Kraft `#c08a4e` / `#8a5a2b` (cajas, cartón).
- Amarillo cinta `#f2c230` (cinta, zócalos, guantes, acento de subtítulos).
- Rojo etiqueta `#d7332b` (URGENTE, REC, sellos, cárdigan).
- Crema tubo `#f4ecd8` (caras, contornos, textos, subtítulos).
- Turquesa tienda `#19c2a5` (solo desde s11).
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o marcas (Mercado Pago, DAC,
Correo y PedidosYa solo como palabra en chips genéricos).

## Zona
Barra REC y 116-190; subtítulos y 236-420; tubo fluorescente y ~470-500 (ambiente). Contenido de
escenas entre y 560 y 1370; zócalo y 1376-1480; piso libre hasta 1700; logo y ~1746.

## Lo que ya está hecho
- `armar.mjs`: fondo cemento con luz fría arriba y brillo kraft al centro; subtítulos crema con
  acento amarillo cinta; capa ambiente.
- `compositions/ambiente.html`: barra REC, esquinas de visor, tubo fluorescente que parpadea
  (miedo en 12.2, confesionario apagado 40.6-46.3, turquesa desde 52.3), polvo, viñeta.

## El lenguaje visual (de la referencia)
- Fondo transparente: la escena no pinta fondo, el index ya lo tiene.
- Ilustración de líneas: `stroke #f4ecd8`, `stroke-width 5`, `round` caps/joins, sin relleno. El
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


(En este reel manda el ESTILO de arriba sobre SPEC-base: rellenos planos de la paleta, no solo líneas.)

## Escenas (tiempos relativos a cada escena; exactos en `tiempos.md`)

**s01-camperas** (6.26). Cuadro 0: la PARED DE CAJAS kraft ya armada de piso a techo (y 560-1370),
etiquetas "CAMPERAS" a mano; las últimas cajas caen arriba. 0.55 "trescientas": sello rojo gigante
"300 CAMPERAS" con sacudón; 1.74 "guardadas": tira de cinta amarilla cruzada "NO TOCAR". 3.01 "Y
vende": la pared se achica y sube; abajo aparece la fachada chiquita del bazar con su puerta y la
vereda; 4.11 "pasan": un peatón cruza mirando el celular; 4.82 "vereda" flecha y rótulo "VEREDA".
Zócalo CASO 12 "Vende solo por la vereda".
**s02-programa** (7.02). Título del programa en tiras de cinta amarilla cruzadas: "ENTERRADOS EN
STOCK" (0.75); 2.07 "Hoy": ficha del caso con la cara de Norma, "NORMA" y "bazar de barrio" (3.88);
4.95 "y un depósito": corte a una persiana metálica que sube y muestra el depósito oscuro lleno de
cajas; 5.94 "miedo": parpadeo y sacudón, sello "URGENTE".
**s03-patricia** (4.83). Patricia entra por la derecha y se calza el guante (0.36, "¡PLAF!"); 0.91
zócalo "Patricia, organizadora"; pila de cajas a la izquierda; 3.22 "¿Qué hay" señala una caja, 4.0
"caja" la caja tiembla con "?" encima.
**s04-esa-no** (3.80). Norma se tira encima de la caja con los brazos abiertos; "¡NO, ESA NO!"
gigante (0 y 0.64) con sacudón; 1.43 "camperas" se abre la solapa y asoma una campera; 2.87
"marzo" hoja de calendario "MARZO". Zócalo "Norma defiende la caja".
**s05-etiqueta** (3.42). Primer plano de la etiqueta de la caja: "CAMPERAS · para vender en MARZO";
el dedo enguantado de Patricia señala (1.18 "dice"); 2.27 "año pasado" cae el sello rojo "DEL AÑO
PASADO" y sube polvo.
**s06-algun-marzo** (2.04). Norma ofendida, brazos cruzados, nariz arriba; hojas de calendario
"MARZO" vuelan alrededor; 0.84 "marzo" cinta amarilla "ALGÚN MARZO".
**s07-ojotas** (6.14). Patricia levanta unas ojotas con una pinza, polvo que cae; 1.83 "dos veranos"
dos soles con tilde y la etiqueta "hace 2 veranos"; 3.48 "nuevitas" brillos y Norma las abraza;
4.65 "venga al local" cartel de cartón "EL QUE QUIERA, QUE VENGA AL LOCAL".
**s08-vidriera** (7.10). Fachada del bazar: una sola vidriera abarrotada, puerta, cartel "BAZAR
NORMA"; 0.19 "nadie" una rodadora cruza la vereda con líneas de viento; 2.63 "una sola vidriera"
recuadro de cinta y "1"; 4.69 "medio metro" la cinta métrica se estira sobre la vereda: "0,5 m",
sello "MEDIO METRO".
**s09-confesionario** (5.71). Fondo casi negro, cono de luz, Norma sentada con un pañuelo; zócalo
CONFESIONARIO "Norma"; 0.54 "acumuladora" niega con la cabeza; 2.36 "vender" junta las manos; 3.36
"gente" recuadro con peatones mirando el celular que pasan de largo; 3.63 cae la lágrima.
**s10-giro** (6.03). Patricia se saca los guantes (0.3) y vuelan; 1.24 "acumulás" cae "VOS NO
ACUMULÁS" crema y amarillo; 2.23 caja grande con lupa y "LO QUE LA GENTE BUSCA"; 3.8 "guardado"
baja la persiana con candado; 4.73 "no mira": ojos que miran todos hacia un celular a la derecha.
**s11-tienda** (4.65). Orus. Celular turquesa "Bazar Norma · tienda online" (1.31); 2.27 "todo tu
depósito" las cajas vuelan al celular y se vuelven tarjetas de producto (campera, ojotas, taza) con
botón "Comprar"; 3.59 "veinticuatro horas" sello turquesa "ABIERTO 24 H" con luna y sol.
**s12-envios** (3.83). El pago y el envío: 0.08 botón "Pagar · Mercado Pago" (genérico, sin
logo); 0.96 "envíos" caja con cinta turquesa; chips 1.40 "DAC", 1.97 "Correo", 2.45 "PedidosYa".
**s13-camioneta** (5.45). "UN MES DESPUÉS" en tiras de cinta (0); 1.09 el depósito con espacio,
pocas cajas, el tubo prendido y líneas de respiro (1.79 "respira"); 2.9 entra la camioneta, las
cajas con sello VENDIDO turquesa suben; 4.29 "camioneta" arranca y se va con líneas de velocidad.
**s14-vendi** (4.28). Norma salta con los brazos arriba, confeti; 0.75 "camperas" sello "¡VENDIDAS!";
1.93 calendario con "MARZO" tachado en rojo y 2.83 "marzo" el mes de hoy "NOVIEMBRE" con "HOY".
**s15-cta** (5.37). "MANDÁSELO" gigante en cinta amarilla; 0.74 "al que tiene"; 1.11 "EL DEPÓSITO
LLENO" con una pilita de cajas que tambalea; flecha de compartir; zócalo PRÓXIMO CASO "¿Vos?".
