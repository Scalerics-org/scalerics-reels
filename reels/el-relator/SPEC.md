# Reel "El relator": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (partido con relator). Un RELATOR de fútbol
uruguayo, a los gritos (Gemini Puck), narra cómo TU clienta se escapa al de enfrente: sábado a las
once de la noche, la clienta "tira el centro" ("Hola, ¿tenés talle M?", Gemini Leda), llega,
doble tilde azul... y el dueño la deja en visto. El COMENTARISTA (Gemini Charon, pausado y
lapidario, zócalo "El veterano · desde la tribuna"): "Qué error de la defensa. Eso, en el
Centenario, no se perdona." VAR: "Lo leyó a las once y dos. Pensaba contestar el lunes. Es visto,
nomás." La clienta se escapa por la banda, el de enfrente tiene un agente de IA que contesta al
instante: ¡GOOOOL del de enfrente! GIRO (comentarista): "no tenían mejor equipo. Tenían la misma
remera. Pero estaban en la cancha." Relator: "Mucha garra charrúa, mucha celeste, y el partido lo
perdiste con el celular en el bolsillo." Entra ORUS (Scalerics): tu agente de IA, el arquero que
ataja todas, hasta un sábado a las once. Cierre: "Etiquetá al que siempre deja en visto."
Voz armada de 12 parlamentos (`partes/01..12.txt`): silencios recortados, relator con atempo 1.15,
comentarista 1.05, Orus 1.07, pegados con 0.35-0.7 s; el GOOOOL largo del relator se recortó a ~2.5 s.
`palabras.json` armado por parlamento (Speech-to-Text de cada parte + tiempos a mano en 04 y 08).
Locución 70.56 s; reel 73.76 s.

## ESTILO: TRANSMISIÓN DE FÚTBOL DE TV. Edición cargada.
Césped verde oscuro en franjas (ambiente), líneas de cancha blancas, pizarra táctica (cancha vista
desde arriba, jugadores como puntitos, flechas amarillas punteadas), MARCADOR fijo arriba
("VIVO · TU LOCAL 0 · 0 EL DE ENFRENTE · reloj" que corre de 88:46 a 90:00 y cambia a 0 · 1 en el
GOOOL, 40.62 s), zócalos de TV (comentarista, gol), monitor del VAR, sellos rojos, palabras
gigantes que caen en su palabra con sacudón. Rótulo "CÁMARA 1 · TRIBUNA" abajo a la derecha.

## Paleta (SOLO estos colores)
- Césped `#07200f` / `#0e3b1f` / `#15532c`: fondo (armar.mjs) y rellenos.
- Blanco cal `#f4f6f0`: líneas de cancha, textos grandes.
- Amarillo marcador `#ffd23f`: la clienta, las jugadas, acento de subtítulos, el GOOOL.
- Rojo `#ff3b30`: el error, el visto, sellos, VIVO, tarjeta roja.
- Celeste `#5ec8f2`: el doble tilde azul y "la celeste".
- Desde s13 (Scalerics): verde `#5ce611` para el agente de IA (guantes del arquero, atajadas).

## Zona
Marcador en y 112-196 (ambiente); subtítulos y 236-420. Contenido de escenas entre y 580 y 1520,
x 60-1020. Logo en y ~1746, rótulo de cámara en y 1610.

## Escenas (tiempos relativos en tiempos.md)
- s01-goleando: tu cancha desde arriba se dibuja; "TE ESTÁN" + "GOLEANDO" amarillo gigante; la
  pelota viaja por flecha punteada a tu arco y la red se infla; "EN TU PROPIA CANCHA"; "¿Y VOS?";
  en "enteraste" sello rojo "ARQUERO: NO VINO".
- s02-sabado: placa de TV "SÁBADO | 23:00" (la hora cae en "once"), "EL LOCAL, CERRADO"; pizarra
  táctica: la CLIENTA (puntito amarillo) corre por la izquierda con el celular; "tira el centro":
  la pelota va al área "TU WHATSAPP"; "¡CENTRO!".
- s03-talle: celular a primer plano, el globo "Hola, ¿tenés talle M?" palabra por palabra, 23:01,
  doble tilde gris; una "M" gigante amarilla salta.
- s04-visto: "¡LLEGA!"; doble tilde gigante, un tilde por "doble", se pone celeste en "azul"
  ("DOBLE TILDE AZUL", "LEÍDO · 23:02"); el dueño dibujado con su celular y su mate ("DEFENSA: EL
  DUEÑO"); en "visto" sello rojo gigante "EN VISTO".
- s05-error: "¡QUÉ ERROR!" rojo, repetición táctica con el defensor DUEÑO que se da vuelta y el
  círculo rojo de la tele; zócalo del comentarista; en "Centenario" se dibuja un estadio genérico;
  "NO SE PERDONA".
- s06-var: "¡MOMENTO!" x2; el rectángulo del árbitro se dibuja en el aire; "VAR" gigante, línea de
  escaneo, "REVISANDO...".
- s07-repe: monitor "VAR · REPETICIÓN": timecode que corre a 23:02 "LEÍDO"; SÁB / DOM / LUN con la
  flecha que salta al lunes; banda roja "DECISIÓN DEL VAR · ES VISTO, NOMÁS".
- s08-banda: cancha entera de costado (TU LOCAL / EL DE ENFRENTE); la clienta se escapa por la
  banda al área de enfrente; "¡POR LA BANDA!".
- s09-agente: celular de "El de enfrente · en línea · agente de IA" (ícono de chispa); la misma
  pregunta, tres puntitos y la respuesta al instante "¡Hola! Sí, talle M tenemos." y "¿Te lo
  guardo para mañana?"; chip "AGENTE DE IA" y sello "AL INSTANTE".
- s10-gol: la pelota a la red, "GOOOOOL" con las O sumándose, papelitos; zócalo de gol "GOL | EL DE
  ENFRENTE | 89'" + "ASISTENCIA: SU AGENTE DE IA". El marcador cambia a 0 · 1 (ambiente).
- s11-remera: dos remeras iguales (TU LOCAL / EL DE ENFRENTE); "¿MEJOR EQUIPO?" tachado; "=" y
  "LA MISMA REMERA"; en "cancha": la tuya a la percha ("EN EL VESTUARIO"), la de ellos amarilla
  sobre una cancha ("EN LA CANCHA"). Zócalo del comentarista.
- s12-garra: "GARRA" / "CHARRÚA" / "CELESTE" (celeste) a golpes; sello "PARTIDO PERDIDO"; el
  bolsillo del pantalón con el celular que vibra y la notificación "1 MENSAJE · 23:01 · Clienta".
- s13-arquero (entra Scalerics): el arco vacío; "EN LA CANCHA" + "SIEMPRE"; se dibuja el arquero
  con guantes verdes e "IA" en el pecho; "SCALERICS"; "TU AGENTE DE IA" verde.
- s14-ataja: los mensajes ("¿A qué hora abren?", "¿Precio de la campera?", "¿Hay stock en azul?")
  vuelan como pelotas y el arquero los ataja en "instante", "precios", "stock" (tilde verde cada
  uno); "ATAJA TODAS"; chip verde "SÁB · 23:00 · ATAJADA".
- s15-cta: "ETIQUETÁ" + la tarjeta roja en alto con "@" y el doble tilde que se pone celeste en
  "visto"; "AL QUE SIEMPRE DEJA EN VISTO"; "FINAL DEL PARTIDO". Queda ~3.8 s.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba. Valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

