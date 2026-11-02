# Reel "El náufrago": spec de las escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo), formato P: PELÍCULA DE
NÁUFRAGO / BITÁCORA DE SUPERVIVENCIA. Producto: TIENDA ONLINE.
Vero (inventada), dueña de una tienda de ropa, está varada en "la isla de Instagram" y graba su
bitácora: "Día cuarenta en la isla de Instagram. Me siguen dos mil personas. Y no me compra ni mi
madre." Le llegan botellas con mensajes ("¿Precio?", "¿Precio por privado?", "¿Hacen envíos al
interior?"); contesta con otra botella y cuando llega el cliente ya compró en otro lado. "Como en
la película, ya le hablo a una pelota": Wilmar, una pelota de vóley con cara pintada, le contesta
seco ("Te dije que pusieras los precios a la vista", "Y sé más de ventas que vos"). Pasa un barco
lleno de clientes y ella agita un cartel "CONSULTAS POR DM": sigue de largo. GIRO (lo dice Wilmar):
"No estás perdida por falta de seguidores. Estás perdida porque para comprarte hay que mandarte
una botella." Entra Orus: tiendas online que venden solas, precios a la vista, Mercado Pago, envíos
por DAC, Correo o PedidosYa; "el que te sigue, compra sin esperar botella". Remate: "¡Wilmar!
¡Vendí una campera durmiendo!" "Te dije." CTA: "¿Cuántos días llevás en la isla? Dejá tus rayitas
en los comentarios."
Voces: Vero = Leda, clienta en botella = Kore, Wilmar = Puck, narrador = Orus. Voz de 69.6 s, reel
de 72.8 s.

## ESTILO: ISLA DESIERTA DE DIBUJO ANIMADO, al atardecer. Edición cargada.
Ilustración plana de caricatura con RELLENOS y contorno oscuro (`#04161c`, trazo 5, caps redondos),
sobre el fondo de mar de atardecer (lo pone el index). Recursos que vuelven: el montículo de arena
con la palmera, el mar en olas turquesa, botellas de vidrio turquesa con corcho y papelito enrollado
que se desenrolla mostrando el mensaje (letra manuscrita Caveat, tinta oscura), el cuaderno de
bitácora con rayitas de días (tiza/lápiz), la fogata, cocos, el cartel de cartón. Palabras clave
GIGANTES (Luckiest Guy, mayúsculas, color arena o sol, con contorno oscuro grueso con
`-webkit-text-stroke` y una sombra dura desplazada) que caen en su palabra exacta, sacudones de
cámara, olas que suben, zoom. Nada quieto más de ~0.8 s.
La escena modelo es `compositions/s01-dia40.html`: copiá su estructura (escenario que tiembla,
`gsap.set` + `fromTo` con `immediateRender:false`, helper `pop()`, `golpe()` para sacudones, palabra
gigante `.sNN-grande`, salida de 0.25 s con blur y caída hacia abajo como una ola que se la lleva).

## Personajes (iguales en todas las escenas: copiá el SVG de s01 / s06)
- VERO: piel arena `#f2d49b`, rodete despeinado coral `#ff6f59` con un lápiz clavado, musculosa
  turquesa `#37d3c4` rota en el borde (zigzag), short arena oscuro `#d4ac68`, ojeras, sonrisa de
  loca. Contorno `#04161c`.
- WILMAR: pelota de vóley espuma `#fff4dc` con las costuras en curvas (`#d4ac68`), y una CARA
  pintada con la mano en coral (manchón de mano con dos ojos y boca chueca). Habla: su boca se
  abre y cierra; globo de diálogo cuadrado y seco.
- CLIENTES: puntitos/siluetas redondas sol `#ffc145` (como los clientes de el-golpe).
Referencia a la película de náufrago SOLO insinuada (pelota con cara de mano, "como en la
película"): nada de logos, nombres de marcas de pelotas, caras de actores ni imágenes de la obra.

## Paleta (SOLO estos colores)
- Arena `#f2d49b` (y su sombra `#d4ac68`): la isla, la piel, textos gigantes.
- Turquesa `#37d3c4`: el mar, las botellas (vidrio con opacidad 0.35 + trazo), la musculosa.
- Coral `#ff6f59`: el pelo, la cara de Wilmar, sellos, X, lo que sale mal, "visto".
- Sol de atardecer `#ffc145`: los clientes, el sol, acento de los subtítulos, lo valioso.
- Verde palmera `#6bbf59`: hojas de palmera. Desde s11 (Scalerics) también lo que sale bien
  (tildes, el botón de pagar, "VENDIDO").
- Espuma `#fff4dc`: papelitos, Wilmar, espuma, textos chicos. Tinta/contorno `#04161c`.
Fondo: mar de atardecer `#10495a` → `#061c23` (en armar.mjs). Prohibido: emojis, fotos, logos
(Instagram, Mercado Pago, DAC, Correo, PedidosYa solo como TEXTO), rayas largas (—).

## Tipos de letra
Luckiest Guy (`assets/fonts/LuckiestGuy.woff2`) para lo gigante; Caveat 700 para lo manuscrito
(mensajes en botellas, bitácora, cartel); Lexend 600-800 para UI de la tienda; IBM Plex Mono 500
para rótulos chicos. Nada que haya que leer de menos de 26px.

## Zona
Subtítulos arriba (y 236 a ~420). Contenido entre y 560 y y 1520; ancho x 50-1030. Abajo:
las olas del ambiente (y 1540-1720), el rótulo "Bitácora · día 40" (x>700, y 1586-1680) y el logo
(y 1746): no taparlos.

## Lo que ya está hecho
- `index.html` (armar.mjs) con fondo de mar de atardecer y subtítulos con acento sol.
- `compositions/ambiente.html`: tres olas turquesa abajo que se corren, brillitos, viñeta, rótulo
  "Bitácora · día 40 / isla de Instagram"; FLASH espuma en 5.44 ("madre"), 50.09 ("botella" del
  giro) y 63.6 ("durmiendo") globales.

## Sonidos extra en assets/sfx
olas, splash, viento, ronquido, campanita, moneda, drama, uuh, tiza, golpe, braaam (bocina de
barco), risas, beep.

## Escenas (tiempos relativos en tiempos.md)
1. **s01-dia40** (0-6.49). Cuadro 0: la isla con palmera y Vero sentada con la bitácora, DÍA 40
   a medio entrar. "cuarenta" (0.24): DÍA 40 gigante + cuaderno con 40 rayitas que se tachan solas.
   "isla de Instagram" (1.28): cartel de madera ISLA DE INSTAGRAM (texto, sin logo). "dos mil" (3.2):
   contador SEGUIDORES que sube a 2.000 y puntitos sol (seguidores) que aparecen flotando en el mar.
   "madre" (5.36): todo se apaga, sello coral VENTAS: 0 + "(ni mi mamá)"; flash del ambiente.
2. **s02-botella** (2.86). Sol de atardecer; Vero salta con los brazos arriba ("¡una botella!");
   una ola trae la botella que aterriza en la arena con salpicón en 0.96; salta el corcho y cae el
   papelito "¿precio?" gigante en 1.88; Vero baja los brazos.
3. **s03-respuesta** (3.79). Vero en su islita tira una botella con "Precio: ¡te lo paso!"; la
   botella viaja por una ruta punteada mientras un calendario pasa DÍA 1, 2, 3; llega a la islita
   de la clienta (silueta sol), que ya tiene una bolsa coral: sello YA COMPRÓ (2.4) y EN OTRO LADO
   gigante (2.88).
4. **s04-privado** (4.67). Botella grande flotando, papelito "¿precio x privado?" (0.38). Corte a
   Vero grande gritando con rayitas de bronca: ¡YA ES PRIVADO! (2.27), ¡ES UNA BOTELLA! (3.2) y la
   botella que sacude en primer plano.
5. **s05-visto** (6.45). "¿hacen envíos al interior?"; el sol cruza el cielo en arco (pasa un día):
   AL OTRO DÍA (2.39); dos tildes coral gigantes que se dibujan + sello VISTO (3.35-3.91); "en el
   medio del mar" (4.88): la cámara se aleja, la isla queda chiquita en un mar de olas y las dos
   tildes flotan al lado.
6. **s06-wilmar** (3.33). Barras de cine y rótulo COMO EN LA PELÍCULA; Vero cuchichea a cámara
   junto a la fogata; "pelota" (1.36): Wilmar cae rebotando; "¿Qué decís, Wilmar?": zoom a la
   pelota y su nombre en manuscrita.
7. **s07-pelota** (7.03). Wilmar grande habla (boca que se mueve) con globo seco; tres etiquetas
   de precio "$" caen colgadas en "precios"; entra Vero furiosa señalándolo: ¡SOS UNA PELOTA!
   (3.23); le caen lentes de sol a Wilmar y SÉ MÁS DE VENTAS QUE VOS (5.23).
8. **s08-barco** (6.34). Horizonte alto; un barco con puntitos sol (clientes) cruza; ¡UN BARCO!;
   Vero salta dos veces agitando el cartel de cartón CONSULTAS POR DM (1.6 y 3.12); bocina, el
   barco acelera y se va, el cartel cae: SIGUIÓ DE LARGO (5.25).
9. **s09-ropa** (5.98). Perchero de ramas con campera, vestido y remera que brillan: LA ROPA MÁS
   LINDA DE LA ISLA (0.96). "Por eso" (2.31): Wilmar en primer plano con lentes, POR ESO.; se saca
   los lentes y habla en serio; SEGUIDORES aparece (4.4) y se tacha con trazo coral (4.86).
10. **s10-botella** (4.45). EL GIRO. La clienta con el celular: "¡lo quiero!"; PARA COMPRARTE
   (1.33); en vez de comprar tiene que escribir un papelito (1.97); HAY QUE MANDARTE UNA BOTELLA
   (2.42) y una botella gigante cae encima en 3.15 (flash del ambiente).
11. **s11-tienda** (3.25). Orus. El celular sale del mar como un muelle con "la tienda de Vero";
   las cuatro prendas entran a la grilla en "tiendas online"; sello verde VENDE SOLA (2.43). Wilmar
   con lentes mira desde abajo a la izquierda.
12. **s12-checkout** (4.73). Cada prenda muestra su precio ("$ ····", sin cifras) en "precios a
   la vista"; botón verde PAGAR CON MERCADO PAGO (texto, sin logo) que un dedo toca (1.35); chips
   DAC (2.57), CORREO (3.18), PEDIDOSYA (3.7) y una camioneta que cruza abajo.
13. **s13-vendi** (6.58). Los seguidores nadan hasta el celular y aparecen ventas con tilde verde:
   sello VENDIDO (0.87); la botella se hunde (1.06). Noche: Vero duerme en una hamaca coral entre
   palmeras con zzz; notificación "¡Vendiste! campera · pago aprobado" (2.6); se sacude despierta:
   ¡VENDÍ DURMIENDO! (4.23, flash); "Te dije." de Wilmar con lentes (5.28).
14. **s14-cta** (6.81). La bitácora abierta: "¿Cuántos días llevás en la isla?" a la izquierda y
   rayitas que se dibujan solas a la derecha hasta el final; globo de comentario "Dejá tus rayitas
   en los comentarios" (1.65); Wilmar asiente abajo a la izquierda.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba (acá: ilustración con rellenos y la paleta de la isla, no líneas crema con acento verde).
> Valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

