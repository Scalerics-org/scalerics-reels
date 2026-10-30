# Reel "Otra vez las once": spec

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES (pedidos de WhatsApp que pasan
solos a la planilla, aviso al cliente de que el pedido está listo, recordatorio de turnos, stock
de la tienda que se actualiza con lo que se vende en el local, reporte del día al celular).
Formato C: LISTA EN PASOS contada como película de BUCLE TEMPORAL ("como en la película de la
marmota", solo nombrada). NÉSTOR (dueño de local, voz Charon, cansado y con humor seco) cuenta en
primera persona: "Todas las noches a las once revivo el mismo día. Y no puedo salir." Un
RADIO-RELOJ despertador lo despierta cada vez con un LOCUTOR de radio AM uruguaya (Fenrir):
"¡Once en punto en Montevideo! ¡Arriba, que hay pedidos!". Cada paso es una NOCHE con número
gigante de 7 segmentos: NOCHE 1 (pasar pedidos del WhatsApp a la planilla, uno por uno), NOCHE 2
(avisar uno por uno que el pedido está listo y recordar cada turno), NOCHE 47 (pasar al stock de
la tienda lo que vendió en el local y hacer la caja). Intenta escaparse: se acuesta a las nueve,
y el reloj REBOBINA a las 23:00 y se despierta igual, con el WhatsApp explotando. NOCHE 312: ya
sabe lo que le va a escribir cada cliente ("¿está listo lo mío?"). GIRO: "el bucle no se rompe
trabajando más". Entra Orus (Scalerics): "Se rompe automatizándolo." y cuenta qué hace la
automatización. Última vez del radio: "¡Once en punto!", y Néstor está en el sillón, con el mate:
"Mañana es otro día." (la hoja del calendario pasa al día siguiente). Cierre (Orus): "Contanos en
los comentarios a qué hora terminás vos." Voz de 69.7 s (16 parlamentos, ver `partes/`), total
72.89 s.

## Estilo: dormitorio azul noche con radio-reloj de segmentos rojos
Noche azul con luz de luna que entra por una persiana (franjas diagonales celestes muy tenues),
viñeta. Pieza central: el RADIO-RELOJ despertador (caja azul con contorno hueso, parlante de
agujeritos, display negro con dígitos de 7 SEGMENTOS ROJOS que brillan; los segmentos apagados se
ven tenues). Los números de NOCHE son dígitos de 7 segmentos gigantes. Contador fijo arriba
(`ambiente.html`): "BUCLE · NOCHE 001" con punto rojo que titila; cambia a 002, 047, 312 en cada
noche. Antes de cada "¡Once en punto!" (5.70, 19.41, 34.72) hay un REBOBINADO de VHS de 0.5 s:
tinte celeste, líneas de barrido, banda de ruido que sube dos veces y el cartel "◀◀ REBOBINANDO"
(triángulos en SVG) arriba a la derecha; en el golpe, flash rojo. Desde 49.9 s (entra Scalerics)
el HUD pasa a "BUCLE ROTO · NOCHE 313" en verde, luz verde de fondo, y en la última vez del radio
ya no rebobina: el reloj chiquito queda en verde.
Personajes dibujados genéricos con relleno plano y contorno hueso (Néstor: canoso, bigote, ojeras,
pijama azul a rayas o remera naranja; variantes de ojos: ojeras, locos, cerrados, felices).

## Paleta
- Azul noche `#050b18` / `#0f2347`: fondo y rellenos.
- Rojo segmentos `#ff2d2d`: dígitos del reloj, números de NOCHE, el bucle, sellos de amenaza.
- Ámbar `#ffb84d`: "¡Once en punto!", acentos de subtítulos, sellos, post-its de turno.
- Celeste luna `#7fb4ff`: persiana, rebobinado, tienda online.
- Hueso `#f4efe4`: contornos y textos.
- Desde s11: verde Scalerics `#5ce611` (el bucle roto, engranajes, flujos que andan solos).

## Cómo están hechas las escenas
Las escenas se generan con `node partes/escenas/gen.mjs` desde `partes/escenas/sNN.mjs`
(CSS + HTML + JS + SFX de cada escena; piezas compartidas en `partes/escenas/pj.mjs`: `seg7()`
dígitos de 7 segmentos, `radio()` radio-reloj con varias horas para alternar, `nestor()`, `celu()`;
y `partes/escenas/noche.mjs`: el cartel de capítulo NOCHE N). Después, `node armar.mjs`. La voz:
`partes/voces.sh` (Gemini), `partes/recortar.sh` (silencios, atempo por voz y recorte de 09 y 14,
donde la voz repitió la frase), `tiempos.mjs` por parlamento y `partes/componer.mjs` (pega y arma
`palabras.json`).

## Voces
Charon Néstor (dueño cansado, en primera persona), Fenrir locutor de radio AM del radio-reloj,
Orus narrador de Scalerics (giro y cierre).

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


(Lo de arriba es la base: en este reel mandan el estilo y la paleta de este SPEC.)

## Escenas (tiempos en tiempos.md)
- **s01-once** (0-5.7): radio-reloj en 22:59 que pasa a 23:00 en "once" (sacudón, titila); "TODAS LAS NOCHES" arriba; en "revivo" un lazo rojo con punta de flecha se dibuja alrededor del reloj y gira; "EL MISMO DÍA" y en "salir" "NO PUEDO SALIR" rojo.
- **s02-radio** (5.7-10.4): el radio vibra con ondas ámbar, "¡ONCE EN PUNTO!" de golpe, sello "RADIO AM · MONTEVIDEO", "¡ARRIBA!" (el radio salta) y en "pedidos" llueven cinco burbujas de mensajes.
- **s03-nestor** (10.4-14.3): Néstor en pijama, cartel "NÉSTOR · DUEÑO DE LOCAL", aro rojo que gira a su alrededor, "ATRAPADO" rojo, sello "COMO EN LA PELÍCULA DE LA MARMOTA".
- **s04-noche1** (14.3-19.4): NOCHE 1 gigante; celular con cinco mensajes de pedido; planilla verde; un "Pedido" vuela de a uno a una celda; "UNO. POR. UNO." palabra por palabra.
- **s05-noche2** (19.4-26.3): radio "¡ONCE EN PUNTO!" otra vez; NOCHE 2; cuatro clientes (Gabi, Walter, Sole, Cacho) y "Tu pedido está listo" mandado de a uno; en "turno" cada mensaje se cambia por un post-it "Turno mañana 10:00".
- **s06-noche47** (26.3-31.8): NOCHE 47; panel "EN EL LOCAL · VENDÍ 2" y flecha a "TIENDA ONLINE" con el stock 12, 11, 10 "A MANO"; tira de papel de la caja que corre y "Y HAGO LA CAJA".
- **s07-escape** (31.8-34.7): Néstor en la cama, pícaro, sello "PLAN DE FUGA"; en "nueve" 21:00 gigante, cierra los ojos, Z Z Z.
- **s08-despierta** (34.7-40.3): el reloj rebobina 21:00 > 22:13 > 22:48 > 23:00, "¡ONCE EN PUNTO!"; Néstor despeinado con ojos locos gritando; en "WhatsApp explotando" el celular tiembla, diez notificaciones y "+99".
- **s09-noche312** (40.3-45.5): NOCHE 312; pared de palitos contando noches; Néstor loco, sello "YA ME LO SÉ"; cinco "¿Está listo lo mío?".
- **s10-entendi** (45.5-49.5): lamparita sobre Néstor en "entendí"; el bucle rojo "+ HORAS" gira cada vez más rápido, sello "NO SE ROMPE", "TRABAJANDO MÁS".
- **s11-rompe** (49.5-53.5): ORUS. "SE ROMPE": el aro se parte en cuatro y vuela (flash verde), "AUTOMATIZÁNDOLO" verde, engranajes verdes girando, tarjeta "EN SCALERICS HACEMOS / AUTOMATIZACIONES".
- **s12-flujos** (53.5-61.0): cuatro flujos que se arman en su palabra, con tilde verde: Pedido de WhatsApp > Planilla; Pedido listo > Aviso al cliente; Venta en el local > Stock al día; Fin del día > Reporte al celular. "SOLO · MIENTRAS VOS VIVÍS".
- **s13-sillon** (61.0-66.5): el radio "¡ONCE EN PUNTO!" pero no rebobina: se va y aparece Néstor feliz en el sillón con el mate, reloj chiquito en verde, calendario OCT 30 que se arranca y queda 31; "MAÑANA ES OTRO DÍA" verde.
- **s14-cta** (66.5-72.9): "CONTANOS EN LOS COMENTARIOS", radio-reloj con horas que van cambiando (la de cada uno), "¿A QUÉ HORA TERMINÁS VOS?" ámbar y caja de comentario "Yo a las ..." con cursor.
