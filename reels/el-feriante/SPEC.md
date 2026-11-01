# Reel "El feriante": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: TIENDA ONLINE (vende sola, Mercado Pago, envíos por
DAC, Correo o PedidosYa). Formato A, polémica con giro, contada por un PERSONAJE: un FERIANTE
canchero (Fenrir, voz de pregón) que desde su puesto de la feria del domingo le dice al dueño de un
local en la cara: "Yo vendo tomates arriba de un tablón. Y vendo más por internet que vos." Pregona
("¡Lleve, lleve, que se termina! Cuatro por cien, y la yapa de regalo"), se burla con cariño del
local con vidriera y alarma que vende de lunes a sábado de nueve a siete ("yo tengo un toldo a rayas
y vendo hasta cuando duermo"). Una VECINA (Leda) le grita "¡Don! ¿Me mandás un cajón de naranjas?":
"Ya te llegó, mi amor. Lo pagaste anoche." "¿Anoche? ¡Si estaba en pijama!" "La feria abre los
domingos. Mi puesto en el celular no cierra nunca." El DUEÑO (Charon) protesta: "Lo mío no se vende
por internet. Hay que verlo, hay que tocarlo." "¿Y el tomate qué es, un holograma?" GIRO: "Vos
vendés mejor que yo. Con el cliente enfrente no se te escapa ni uno. Pero tu cliente ya no pasa por
la vidriera: está en el celular. Yo puse el puesto ahí, donde está la gente." Entra ORUS: "Eso
hacemos en Scalerics: tu tienda online..." Cierre: "Mandáselo al que dice que lo suyo no se vende
por internet." Y el feriante remata: "¡Lleve, lleve, que se termina!"
Voz de 71.0 s, reel de 74.2 s. Cuatro voces: Fenrir (feriante), Leda (vecina), Charon (dueño), Orus.

## ESTILO: FERIA DE BARRIO (manda sobre SPEC-base)
Ilustración plana con relleno y contorno oscuro `#141816` (trazo 5-6, caps redondos), como un cartel
pintado de feria. Paleta: rojo toldo `#d8342c`, crema `#f3ead6`, verde hoja `#5fae3e`, naranja
`#ff9a2e`, negro pizarra `#1e2420`, madera `#b07a45` (oscura `#7a4e2a`), papel madera `#c9a06a`.
Fondo (armar.mjs): pizarra verde-negra `#1a1f1c` con luz cálida al centro. Subtítulos crema con
acento NARANJA `#ff9a2e`.
`compositions/ambiente.html` (encima de las escenas): arriba el TOLDO de lona a rayas rojo/crema
(y 0-200, borde festoneado) que se mece apenas; abajo el TABLÓN de madera (tapa y 1338-1388 y frente
de tablas hasta y 1590) por delante de los personajes, que quedan "detrás del mostrador"; polvo de
tiza muy suave. El tablón baja y se va en las escenas que no son de la feria (s03 local del dueño,
s07 dueño, s11-s12 Scalerics) y vuelve después.
Textos de tiza: Caveat 700 crema sobre PIZARRITAS negras con marco de madera (la "etiqueta" de cada
escena, 1-4 palabras, y precios). Palabras gigantes: Lexend 900 crema/naranja con contorno oscuro.
Personajes genéricos dibujados: FERIANTE (gorra roja con visera, bigote, delantal verde, cara
redonda), VECINA (rulos, chismosa de mandados, pijama en s05), DUEÑO (anteojos, camisa celeste
apagada, pelada, cara cansada). Frutas y verduras dibujadas: tomates, naranjas, lechugas, zapallo,
en cajones de madera. Edición cargada: palabras que caen en su palabra, sacudones, pops.

## Escenas (tiempos relativos en tiempos.md)
- s01-tablon (4.73): el feriante detrás del tablón con cajones de tomates; "tomates" un tomate salta
  a su mano; "tablón" sello; "más por internet" cae ENORME "MÁS POR INTERNET" y "QUE VOS" en naranja
  con sacudón; un dedo que apunta a cámara.
- s02-pregon (4.96): primer plano del pregón: boca abierta, ondas de grito; "LLEVE, LLEVE" gigante
  que rebota dos veces; pizarrita "4 x $100" en "cuatro por cien" (la tiza se escribe); "yapa" una
  naranja extra cae en la bolsa con etiqueta "YAPA".
- s03-vidriera (6.37): el local del dueño: fachada con vidriera, cortina, alarma con luz roja
  titilando; en "local", "vidriera", "alarma" cada cosa hace pop con rótulo; "lunes a sábado" cartel
  de horario "LUN A SÁB · 9 A 19" y cortina que baja en "siete" con candado.
- s04-toldo (4.65): el puesto entero: toldo, tablón; "toldo a rayas" se despliega; "vendo hasta
  cuando duermo" el feriante dormido con zzz en una reposera, y el celular colgado del toldo
  vibrando con avisos "VENDIDO" que van apilándose.
- s05-pedido (8.24): la vecina a la izquierda con la chismosa grita "¡Don!"; globo "¿me lo mandás?";
  en "ya te llegó" una caja con naranjas aterriza en su puerta; "anoche" luna y celular con
  "PAGADO"; en "pijama" la vecina aparece en pijama con antifaz para dormir. Risas.
- s06-domingo (5.83): pizarra "FERIA: DOMINGOS 8 A 14"; en "mi puesto en el celular" la cámara entra
  a un celular gigante que muestra el mismo puesto con toldo a rayas, botón "COMPRAR"; "no cierra
  nunca" cartel "ABIERTO 24 HS" que se enciende.
- s07-dueno (5.72): el dueño con los brazos cruzados frente a su vidriera; "pará, pará" manos
  arriba; "no se vende por internet" globo; "verlo" ojo, "tocarlo" mano tocando una tela/producto.
- s08-holograma (3.99): el feriante levanta un tomate: en "holograma" el tomate se vuelve líneas
  celestes temblando (glitch) y vuelve; "te digo un secreto" se acerca, la mano al costado de la
  boca, y la luz baja.
- s09-giro (7.98): EL GIRO. Medalla/cinta "EL MEJOR VENDEDOR" al dueño; "con el cliente enfrente"
  dueño y cliente cara a cara con corazones; "pero tu cliente ya no pasa por la vidriera" el cliente
  pasa de largo mirando el celular; "está en el celular" el celular brilla.
- s10-puesto (2.84): el puestito con toldo a rayas DENTRO del celular, rodeado de gente (cabezas de
  colores) que llega; "donde está la gente" pizarra.
- s11-tienda (10.22): Scalerics: celular con la tienda online (grilla de productos, carrito); "vende
  sola" un sello; "Mercado Pago" botón PAGAR; "DAC, Correo, PedidosYa" tres paquetes en camino;
  "vos seguí atendiendo como nadie" el dueño sonriendo en su mostrador.
- s12-cta (8.70): pizarra gigante "MANDÁSELO al que dice: lo mío no se vende por internet" + flecha
  de compartir; el feriante asoma y en "¡Lleve, lleve!" saluda con un tomate en la mano.
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

