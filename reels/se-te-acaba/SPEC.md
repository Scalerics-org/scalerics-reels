# Reel "Se te acaba" · spec

Reel vertical 1080x1920 de Scalerics sobre **automatizaciones (stock)**, formato motion persuasivo
"Rutina + punto de dolor" con un **dato en vivo** (línea de Juan del 02-11). Gancho: "El producto
que más vendés es justo el que se te acaba." Una pinturería de barrio; el que más sale es el látex
blanco. El lunes hay 15 baldes; martes se venden 5 en el mostrador, miércoles 4 por WhatsApp,
jueves 6 en la tienda online: cada venta entra por un lado distinto y nadie ve el número. El
pedido al proveedor se hace "cuando alguien se acuerda". Viernes 17:00 un pintor pide tres baldes
y no queda ni uno. Giro que deja bien parado al dueño: que se te acabe es buena noticia (vendés),
lo malo es enterarte por el cliente. Misma semana con una automatización: cada venta descuenta el
stock sola en todos lados, cuando quedan pocos llega un aviso, el pedido al proveedor ya está
armado (lo revisás y lo mandás) y el viernes el pintor se lleva sus tres baldes. Cierre para
compartir: "Mandáselo al que hace los pedidos en tu negocio." Una sola voz (Orus), 57.8 s.

Recurso visual central: **el número de stock en vivo** (`compositions/stock.html`), una capa
propia que `armar.mjs` monta encima de las escenas desde "El lunes" hasta "En Scalerics"
(`reel.json` → `stock: [23, 153]`). Caja crema arriba (x 120–960, y 600–770): ícono de balde,
número IBM Plex Mono 124px y a la derecha "STOCK · LÁTEX BLANCO" + un estado que cambia con la voz.
Primera semana: 15 → 10 (mostrador) → 6 (WhatsApp) → 0 rojo (web); en "Nadie ve el número" la
caja se apaga y se desenfoca (NADIE LO MIRA); en "No queda ni uno" vuelve, tiembla, borde rojo
(SIN STOCK); en "buena noticia" el estado pasa a verde (VENDISTE 15) y en "Lo malo" a rojo (TE
AVISÓ EL CLIENTE). Segunda semana todo en verde: 15 → 10 → 6, "QUEDAN POCOS" titila en el aviso,
"PEDIDO ENVIADO", el viernes 26 (LLEGÓ EL PEDIDO) → 23 (HAY STOCK). Con la capa a la vista las
escenas dibujan en y 800–1240.

Color con significado (manda sobre el "un solo acento" de la base): lo que está mal en rojo
apagado `#c7655b` (números que se van sin que nadie los vea, SIN STOCK, PENDIENTE, el "¿No
tenés?"), lo neutro y pendiente en crema apagado; lo resuelto en verde `#5ce611` (líneas que
sincronizan, tildes, aviso, pedido enviado). Personaje en crema: el pintor (gorra, pechera y
rodillo). Fondo navy, subtítulos y logo del molde. Las escenas salen de un armador común
(helpers `dibujar()`, `pop()`, `latir()`, `etq()`), con la estructura de s01.

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



## Escenas (tiempos relativos en tiempos.md)
1. **s01-gancho** (0–3.46): estante de pinturería con latas grises en tres estantes; en el del
   medio, tres baldes con el cartel verde MÁS VENDIDO. En "vendés", "justo" y "que" se van de a
   uno; en "acaba" el hueco queda con contorno rojo punteado y el cartel cambia a AGOTADO (rojo).
   Etiqueta EL QUE MÁS SALE → AGOTADO.
2. **s02-pintureria** (3.46–9.40): fachada PINTURERÍA con toldo, puerta y vidriera con baldes;
   en "látex blanco" la fachada se apaga y salta un balde grande. En "El lunes" aparece la capa del
   stock (15) y abajo el estante con 15 baldes que saltan en "quince", calendario LUNES a la
   izquierda. Etiquetas PINTURERÍA DE BARRIO, LÁTEX BLANCO, LUNES · 15 BALDES.
3. **s03-semana** (9.40–15.49): tres paneles MARTES/LOCAL (mostrador con 5 baldes que se van en
   "mostrador"), MIÉRCOLES/WHATSAPP (celular con "4 baldes"), JUEVES/WEB (notebook con "6
   baldes"); el activo a pleno, los otros apagados; sube un "−5", "−4", "−6" rojo con cada venta y
   la capa baja 15 → 10 → 6 → 0.
4. **s04-distinto** (15.49–18.79): local, celular y notebook a la izquierda; flechas grises que
   se cruzan hacia un cuaderno, un chat y un panel, cada uno con su número suelto en gris. En
   "Nadie" un "?" rojo al centro; la capa se apaga. Etiqueta CADA UNO POR SU LADO → NADIE VE EL
   NÚMERO.
5. **s05-acuerda** (18.79–21.63): calendario que pasa MAR, MIÉ, JUE; post-it gris "PEDIR LÁTEX
   BLANCO"; en "hace" sello rojo PENDIENTE; en "acuerda" el post-it se balancea a punto de caerse.
6. **s06-viernes** (21.63–27.26): chip VIERNES 17:00, estante vacío a la izquierda; el pintor
   entra en "pintor" con su globo "Tres baldes de blanco"; en "No queda" el estante se pone rojo y
   salta un 0 grande; la capa vuelve en rojo. Etiquetas VIERNES · 17:00, TRES BALDES, SIN STOCK.
7. **s07-giro** (27.26–33.10): ticket que se imprime "LÁTEX BLANCO x15"; en "buena noticia"
   VENDIDO con tilde verde. En "Lo malo" el ticket se apaga y aparece el pintor con globo rojo
   "¿No tenés?". Etiqueta BUENA NOTICIA → TE ENTERÁS POR EL CLIENTE.
8. **s08-automatiza** (33.10–40.93): chip LUNES verde y engranaje verde que gira en
   "automatización"; después local, celular y notebook abajo, unidos con líneas a la capa del
   stock; cada venta corre en verde por su línea (15 → 10 → 6) y la web muestra STOCK 6; tildes en
   "descuenta". Etiquetas MISMA SEMANA, CON UNA AUTOMATIZACIÓN, SE DESCUENTA SOLO.
9. **s09-aviso** (40.93–46.93): celular con notificación verde "Quedan 6 baldes de látex
   blanco"; debajo la tarjeta PEDIDO ARMADO "Látex blanco x 20"; el cursor tilda la fila en
   "revisás" y aprieta Enviar en "mandás" (se pone verde, ENVIADO).
10. **s10-viernes** (46.93–49.99): VIERNES 17:00 en verde, estante lleno, el pintor se lleva tres
    baldes en "lleva"; tilde verde. La capa marca 26 → 23 HAY STOCK.
11. **s11-scalerics** (49.99–55.56): caja verde SCALERICS · AUTOMATIZACIONES; abajo UN SOLO
    STOCK y en "varios lados" el local, el celular y la notebook conectados con líneas verdes.
    Etiqueta PARA PYMES → QUE VENDEN POR VARIOS LADOS.
12. **s12-cta** (55.56–60.97): celular con la pantalla de compartir: tarjeta del reel "Se te
    acaba", contactos; el cursor elige "Encargado de pedidos" en "pedidos" y aprieta Enviar en
    "negocio" (avioncito). Etiqueta MANDÁSELO → AL QUE HACE LOS PEDIDOS.
