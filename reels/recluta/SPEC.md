# Reel "Recluta": spec

Reel vertical 1080x1920 de Scalerics. Tema: TIENDA ONLINE + Black Friday (fin de noviembre).
Formato P (cultura popular): PELÍCULA DE GUERRA / campamento de reclutas. Un SARGENTO INSTRUCTOR
(voz Algenib, gritón) le pasa revista a un RECLUTA, dueño de una tienda de ropa de barrio (voz
Charon, asustado): "¡Atención, soldado! Faltan cuatro semanas para el Black Friday y vos vas a la
guerra con un cuaderno." Revista: no tiene tienda online ("tengo un cartel en la puerta"), a las
tres de la mañana "que me manden un audio, lo escucho cuando abro", los envíos "los llevo yo en el
ómnibus, como Rambo: solo". Referencias solo nombradas: "Señor, sí, señor", "¡No te escuché!",
La chaqueta metálica (casete VHS genérico), Rambo (vincha naranja genérica). El sargento despliega
el MAPA TÁCTICO: tus clientes en el sillón en pantuflas; el de enfrente, un fuerte con tienda
online que cobra sola y despacha sola; vos, con el cuaderno (mira naranja). GIRO: "¿me manda al
calabozo?" "No, soldado. Vos no sos cobarde. A vos nadie te dio el equipo." (el sargento se saca
el sombrero; cajón de EQUIPO vacío con una polilla). Entra Scalerics (Orus): el cajón verde con la
tienda online, Mercado Pago y envíos por DAC, Correo o PedidosYa; "vende sola mientras dormís y
llegás al Black Friday armado". CTA (una sola acción, gritada por el sargento): "¡Mandáselo al
recluta que reparte en ómnibus! ¡Ya!" y el recluta: "¡Señor, sí, señor!".
Voz armada por partes (partes/voces.sh, cortar.sh, componer.mjs): 67.3 s; reel 70.5 s.

## ESTILO: CAMPAMENTO MILITAR / PELÍCULA BÉLICA (comedia)
Lona verde oliva con trama de tela y manchas de camuflaje en los bordes (ambiente.html), cartel
de campamento arriba a la izquierda ("CAMPAMENTO · OPERACIÓN BLACK FRIDAY") y cuenta regresiva
"FALTAN 4 SEMANAS" arriba a la derecha; abajo a la izquierda una CHAPITA DE IDENTIFICACIÓN dice
quién habla (SARGENTO / RECLUTA / SCALERICS). Letras de plantilla militar (Black Ops One), sellos
estampados con borde ("NO TIENE", "TARDE", "DESARMADO", "VACÍO", "ARMADO"), pizarra/mapa táctico
con puntero, flechas punteadas. Personajes dibujados en SVG, planos con contorno negro grueso:
el sargento (sombrero de instructor, cejas furiosas, boca gritando, galones naranja) y el recluta
(casco grande con camuflaje, ojos redondos, chapita). Nada de armas ni violencia: el "arma" es un
cuaderno; "armado" es tener el equipo.

## Paleta (SOLO estos)
- Oliva `#4b5320` / oliva oscuro `#3a4224` `#283018` / fondo `#151a0e`: lona, casco, camisa.
- Caqui `#d9c58f` (y cartón `#c9a86a`, tierra `#8a7a4a`): sombrero, camisa del recluta, mapa, cajas.
- Negro `#121410`: contornos, sombras duras de 6-10 px.
- Naranja alerta `#ff7a1a`: gritos, sellos, rutas, la mira, el acento del sargento.
- Hueso `#f1ecdc`: caras, textos grandes.
- Desde s12 (entra Scalerics) se suma verde Scalerics `#5ce611` para lo que equipa.
Subtítulos: acento naranja (sargento), caqui (recluta), verde (Scalerics), según `reel.voces`.

## Tipos de letra
Black Ops One (plantilla militar, `assets/fonts/BlackOpsOne.woff2`) para lo grande y los sellos;
IBM Plex Mono 600 para rótulos; Lexend para la UI de celulares; Caveat para el cartel de cartón.

## Zona
Subtítulos arriba (y 236-420). Contenido entre y 560 y 1520. Chapita en y 1560-1660 (izquierda) y
logo en y 1746: no taparlos. El mapa táctico (s07-s09) vive en una ventana recortada y 552-1548.

## Lo que hace ambiente.html (segundos globales)
Alerta naranja en las esquinas en 0.05, 8.15 ("escuché") y 28.93 ("desarmado"); flash hueso en
50.32 (entra Scalerics) y 61.08 ("armado"); la cuenta "4 SEMANAS" late en 1.83 y 60.14.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá no es ilustración crema con acento verde: es el campamento con la paleta de arriba). Sí valen las reglas técnicas.

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


## Escenas (tiempos en tiempos.md)
**s01-atencion** (5.92). Sargento de frente gritando; "¡ATENCIÓN!" naranja golpea en 0.0 con líneas de grito; sellos "FALTAN 4 SEMANAS" (1.83) y "OBJETIVO BLACK FRIDAY" (2.78); en "cuaderno" (4.78) cae el cuaderno con rótulo "SU ARMA:" y el sargento levanta las cejas.
**s02-firme** (4.62). Recluta haciendo la venia, "SEÑOR, SÍ, SEÑOR"; en "¡No" (1.88) baja el ala del sombrero del sargento, "¡NO TE ESCUCHÉ!" y el casco salta; en "¿Tenés tienda online?" entra la planilla de REVISTA con "?" naranja.
**s03-cartel** (3.36). "NO, SEÑOR"; fachada de la tienda de ropa (percha en el vidrio); en "cartel" (1.27) cae el cartel de cartón "ABIERTO de 9 a 19" y se hamaca; en "señor" (2.27) sello "TIENDA ONLINE: NO TIENE".
**s04-audio** (6.05). Luna, celular con "¿Tenés el buzo en talle M?"; reloj "03:00" en "tres" (1.39); burbuja de audio en "audio" (3.37); en "escucho" el reloj pasa a "09:00" y sello "ESCUCHADO A LAS 09:00 · TARDE".
**s05-omnibus** (5.41). "¿Y LOS ENVÍOS?"; el ómnibus entra con el recluta parado entre cajas; en "Rambo" (3.54) corte a primer plano con vincha naranja y cajas, rótulo "REFERENCIA: RAMBO"; "SOLO." gigante en 4.34.
**s06-chaqueta** (6.01). Casete VHS genérico "LA CHAQUETA METÁLICA", sello "x20" en "veinte"; el sargento niega con la cabeza; sello "DESARMADO" (3.57); en "mapa" se despliega "MAPA TÁCTICO".
**s07-sillon** (3.75). Mapa táctico entero; la cámara entra a los CLIENTES en el sillón con el celular; puntero; en "pantuflas" se mueven las pantuflas naranja y sello "OBJETIVO A · EN PANTUFLAS".
**s08-enfrente** (4.60). La cámara cruza al fuerte del de enfrente con bandera y cartel "TIENDA ONLINE"; "COBRA SOLA" con tilde (2.92); en "despacha" la cámara se abre y las cajas viajan por rutas naranja hasta el sillón; sello "DESPACHA SOLA".
**s09-vos** (3.12). La cámara baja a vos (casco y cuaderno en una mesita); en "Vos" la mira naranja se cierra y "VOS." gigante; en "cuaderno" la X titila y sello "EQUIPO CERO".
**s10-calabozo** (2.75). Primer plano del recluta temblando; en "calabozo" caen las rejas con cartel "CALABOZO" y "¿CALABOZO?".
**s11-equipo** (4.73). EL GIRO: el sargento se saca el sombrero y sonríe; "COBARDE" aparece y se tacha (1.65); el cajón "EQUIPO" entra, se abre en "equipo" (3.48): vacío, sale una polilla, sello "VACÍO", rótulo "ENTREGADO: NADA".
**s12-scalerics** (7.77). Cae el cajón verde "SCALERICS · EQUIPO DE TIENDA" y se abre con rayos verdes (0.98); celular "TU TIENDA" (1.96) con productos (3.21); tarjeta "MERCADO PAGO · PAGO APROBADO" (4.11); cajas "DAC" (5.53), "CORREO" (6.19), "PEDIDOSYA" (6.78) con tilde verde; "EQUIPO ENTREGADO".
**s13-armado** (4.00). El recluta duerme en el catre (Z Z Z) mientras entran tres "PEDIDO NUEVO · PAGADO · CON ENVÍO"; en "llegás" se para equipado (correaje con el celular verde) haciendo la venia; "BLACK FRIDAY" (2.05) y sello verde "ARMADO" (2.99).
**s14-cta** (8.41). "MANDÁSELO / AL RECLUTA QUE / REPARTE EN ÓMNIBUS" con avión de papel; el ómnibus cruza; "¡YA!" gigante (2.73) y el ómnibus sale disparado; el recluta hace la venia con "¡SEÑOR, SÍ, SEÑOR!" verde. Sin salida: late suave hasta el final.
