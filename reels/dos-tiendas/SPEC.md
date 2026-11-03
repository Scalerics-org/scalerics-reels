# Reel "Dos tiendas" — spec

Serie fija **"Dos negocios: mismo rubro, misma calle, una sola diferencia"** (motion persuasivo,
línea de Juan del 02-11). Producto: **tienda online**. Una sola voz: Orus (locución acelerada a
1.05 con atempo, 58.5 s; total 61.7 s).

Historia, EN SECUENCIA (no pantalla partida: dos-cafeterias ya la usó): dos tiendas de ropa
iguales, 23:40. Primero la de Pablo: ropa linda, buenos precios, baja la persiana a las 19; a las
23:40 el celular tiene tres consultas esperando ("¿La tenés en negro?", "¿Hacen envíos?",
"¿Cuánto sale?") que va a contestar mañana, si la clienta sigue ahí. Después la de Valeria: misma
ropa, mismo horario, la misma persiana. Pero a las 23:40 alguien en pijama elige una campera en
su tienda online, ve el precio, paga con Mercado Pago, elige envío (DAC al interior o PedidosYa en
el barrio): pedido confirmado, que Valeria ve a la mañana con el mate. Giro respetuoso: los dos
trabajan igual de duro; la vidriera de Valeria no cierra. Cierre para compartir: "Mandáselo al
amigo que a las siete baja la persiana."

## Recurso visual central: el reloj 23:40 y la persiana
- **El reloj compartido**: marco redondeado 300x124 (rx 22) con "23:40" en Lexend 600 84px y los
  dos puntos que titilan. Aparece en s01, s04, s05, s07, s08 (chico, en la barra del celular). En
  el lado de Pablo va crema (apagado); desde s07, cuando vende Valeria, el reloj se pone VERDE.
  A las 19 muestra "19:00" (s03, s06, s12).
- **La tienda de ropa** (idéntica para los dos; origen en el piso): paredes 340x250, toldo con
  rayas, cartel arriba con el nombre en mono ("PABLO · ROPA" / "VALERIA · ROPA"), vidriera con una
  campera en percha, puerta a la derecha. **La persiana**: rect oscuro con rayas horizontales que
  baja (scaleY desde arriba) y tapa vidriera y puerta.
- **Color con significado**: lo que espera o se pierde, crema apagado (0.4) y, solo en el dolor
  (CERRADO, el badge "3", "Sin responder", el "?"), rojo apagado `#c0625a`. Lo que se vende y se
  resuelve, verde `#5ce611` (reloj de Valeria, tildes, botón de pago, envíos, pedido confirmado).
  La primera mitad (s01–s06) casi sin verde; desde s07 el verde gana la pantalla.
- Personajes de líneas: Pablo (pelo corto, barba corta) y Valeria (pelo largo), mismo alto y misma
  ropa: son iguales, los dos quedan bien parados. La clienta (cola de caballo).

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


## Inicios globales
s01 0 · s02 6.14 · s03 9.52 · s04 15.06 · s05 21.87 · s06 25.63 · s07 30.46 · s08 34.86 ·
s09 41.75 · s10 45.82 · s11 51.41 · s12 56.20 (dura hasta 61.73; la voz termina en 58.53).
Palabras por escena en `tiempos.md`.

## Escenas

**s01-reloj** (0–6.14) — "Dos tiendas iguales, once y cuarenta de la noche. Una cerró. La otra
está vendiendo." Reloj "23:40" arriba (540, 690), crema, con luna a la izquierda. Abajo dos tiendas
iguales a escala 0.78 (x 290 y 790, piso y 1200) con cartel "ROPA". Cuadro 0: reloj y tienda
izquierda a medio dibujar. En "tiendas" se dibuja la derecha; en "iguales" un "=" crema entre
ellas; en "once" y "cuarenta" el reloj late; en "noche" luna y estrellitas. En "cerró" baja la
persiana de la izquierda, la tienda se apaga a 0.4 y cuelga un cartel "CERRADO" rojo apagado. En
"otra" baja también la persiana de la derecha (sorpresa), y en "vendiendo" sale arriba de ella un
badge verde "+1 PEDIDO" con tilde. Etiqueta: "MISMA HORA" → "UNA CERRÓ" → "LA OTRA VENDE".

**s02-diferencia** (6.14–9.52) — "Mismo rubro, misma calle, una sola diferencia." Tarjeta de la
serie, tipografía grande: tres filas con ícono a la izquierda (x 200) y texto Lexend 600 (x 280):
percha + "Mismo rubro" (en "Mismo"), cartel de calle + "Misma calle" (en "misma"), y en "una sola
diferencia" las dos primeras se apagan a 0.4 y entra en verde "Una diferencia" con un celular
chico y un subrayado verde que se dibuja. Etiqueta: "SERIE · DOS NEGOCIOS" → "UNA DIFERENCIA".

**s03-pablo** (9.52–15.06) — La tienda de Pablo a escala 1 (x 430, piso 1200) y Pablo al lado
(x 820). En "Pablo" se dibuja él; en "ropa" campera en la vidriera y en "linda" brillitos; en
"precios" una etiqueta de precio "$" que hace pop; en "siete" un reloj chico "19:00" arriba a la
derecha; en "baja la persiana" Pablo levanta el brazo y la persiana baja; todo pasa a crema
apagado. Etiqueta: "LA DE PABLO" → "BUENA ROPA" → "19:00 · CIERRA".

**s04-consultas** (15.06–21.87) — Reloj "23:40" crema arriba; la tienda de Pablo chica y apagada,
con persiana, abajo a la izquierda. Al centro-derecha el celular de Pablo (420x460) con encabezado
"PABLO · ROPA". En "tres" un badge rojo apagado "3"; las consultas entran como globos en sus
palabras: "¿La tenés en negro?", "¿Hacen envíos?", "¿Cuánto sale?", en crema, con hora "23:40"; al
final "Sin responder" en rojo apagado. Etiqueta: "23:40" → "TRES CONSULTAS" → "ESPERANDO".

**s05-manana** (21.87–25.63) — Reloj grande al centro (540, 760): en "mañana" los números pasan de
"23:40" a "09:00" y la luna se cambia por un sol. En "clienta" se dibuja la clienta con su celular
(x 540, piso 1200); en "todavía está" se vuelve contorno punteado y salta un "?" rojo apagado.
Etiqueta: "MAÑANA, 9:00" → "¿SIGUE AHÍ?".

**s06-valeria** (25.63–30.46) — Espejo de s03: la tienda de Valeria (x 650) y Valeria (x 260). En
"Valeria" se dibuja ella; en "ropa" la misma campera; en "horario" reloj "19:00" arriba a la
izquierda; en "persiana" baja la persiana. Todo crema: son iguales. Etiqueta: "LA DE VALERIA" →
"MISMA ROPA" → "19:00 · CIERRA".

**s07-pijama** (30.46–34.86) — El reloj "23:40" se pone VERDE en "once" (con punch). Abajo una
cama con la clienta en pijama sentada contra la almohada, celular en la mano; en "pijama" rayitas
del pijama; en "elige" sale grande el celular (a la derecha) con la tienda "VALERIA · ROPA": 4
tarjetas de producto; en "campera" una se marca en verde con un toque. Etiqueta: "23:40 · ABIERTO"
→ "DESDE LA CAMA".

**s08-compra** (34.86–41.75) — Celular grande al centro (420x590) con la compra: arriba la barra
con "23:40" verde; tarjeta "Campera negra" con precio que se marca en "precio"; botón "Pagar con
Mercado Pago" que se pone verde con tilde en "Mercado Pago" ("Pago aprobado"); "Envío" con dos
opciones que se tildan en verde en sus palabras: "DAC · al interior" y "PedidosYa · en el barrio".
Un dedo (círculo) toca cada paso. Etiqueta: "PRECIO A LA VISTA" → "PAGO ONLINE" → "ENVÍO: DAC O
PEDIDOSYA".

**s09-confirmado** (41.75–45.82) — Tilde verde grande en círculo + "Pedido confirmado" (verde) en
"Pedido"; en "Valeria" sube y se achica, y se dibuja Valeria (x 360) con el mate y el celular con
la notificación "Nuevo pedido · 23:40"; en "mañana" un sol; en "mate" vapor del mate. Etiqueta:
"PEDIDO CONFIRMADO" → "A LA MAÑANA, CON MATE".

**s10-giro** (45.82–51.41) — El giro. Pablo (x 300) y Valeria (x 780) iguales, con gotitas de
sudor y un "=" en "igual de duro". En "diferencia" se van y entran dos vidrieras: la de Pablo
física con persiana y "CERRADO" (crema apagado, rojo apagado) y la de Valeria, un celular con una
vidriera adentro, en verde, "ABIERTO"; en "no cierra" badge "24 H" verde y pedidos +1. Etiqueta:
"IGUAL DE DURO" → "UNA VIDRIERA QUE NO CIERRA".

**s11-scalerics** (51.41–56.20) — "Scalerics" grande arriba en "Scalerics"; en "tiendas online" se
dibuja una laptop con una tienda (barra, 3 productos, carrito); en "venden" el carrito suma +1 con
tildes; en "local descansa" una tiendita con persiana abajo a la derecha y "z z z". Etiqueta:
"SCALERICS" → "TIENDAS ONLINE" → "VENDE MIENTRAS DESCANSÁS".

**s12-cta** (56.20–61.73) — "Mandáselo al amigo que a las siete baja la persiana." Celular a la
izquierda con botón verde "Mandar"; en "amigo" sale un avión de papel verde por un arco hasta una
tienda con persiana a la derecha; en "siete" reloj "19:00" arriba; en "persiana" la persiana se
sacude y aparece sobre ella un cartel verde "TIENDA ONLINE" con tilde, que late hasta el final.
Etiqueta: "MANDÁSELO" → "AL QUE BAJA LA PERSIANA".
