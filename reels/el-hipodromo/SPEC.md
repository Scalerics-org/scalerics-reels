# Reel "El hipódromo": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): TRANSMISIÓN DE TURF desde el
hipódromo de Maroñas (solo nombrado; nada de logos, studs, jockeys ni caballos reales: todo dibujado
genérico). El RELATOR de turf (Gemini Fenrir, rapidísimo, a los gritos) narra una carrera nocturna:
"¡Largaron en Maroñas! ¡Y tu local se quedó dormido en el partidor!". Diez de la noche: sale como
una flecha la clienta, con un audio de WhatsApp (Gemini Leda, con filtro de teléfono): "Hola,
¿tenés el vestido negro en talle M? Lo quiero para el sábado." Tu local (caballo N° 3, rojo) no se
mueve, sigue en el partidor: "¡En visto, en visto, en visto!". El APOSTADOR de la tribuna (Gemini
Charon) con el boleto: "¡Dale, matungo! ¡Le jugué todo a ese y se quedó durmiendo!". Atropella por
afuera el de enfrente (N° 7, amarillo): contesta al instante, precio, foto, se lo guarda para el
sábado. "¡Llegan, llegan, llegan... ganó el de enfrente por varios cuerpos! ¡Y tu local todavía no
salió!". Apostador: "¡Es un burro! ¡Rompo el boleto!". GIRO (el relator se calma): "Pará, amigo. No
es un burro. De día es el mejor de la pista. Pero a las diez de la noche, no tiene jinete." ORUS
(Scalerics): el de enfrente sí, un jinete que no se baja nunca: un agente de IA; armamos el tuyo
(WhatsApp al instante, precios, stock, horarios, toma el pedido, te pasa la conversación, hasta de
madrugada). Relator: "¡Y en la revancha, tu local larga primero!". Cierre (Orus): "Etiquetá al que
siempre se queda en el partidor."

Voz armada de 13 parlamentos (`partes/01..13.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.04-1.12 por parlamento y pegados
con 0.35-0.7 s (`componer.mjs`, `atempo.json`, `gaps.json`). Tiempos: Speech-to-Text de cada parte
(sin desfase entre voces). Locución 69.46 s; reel 72.66 s.

## ESTILO: TRANSMISIÓN DE TURF NOCTURNA. Edición cargada.
Hipódromo de noche bajo reflectores: fondo verde noche (armar.mjs) con dos reflectores arriba y
un brillo de arena abajo; franjas de césped cortado que se deslizan; BARANDA BLANCA con postes que
pasa abajo (la cámara sigue la carrera). Recursos: el PARTIDOR (los cajones de largada vistos de
frente, numerados, con puertas de rejas que se abren), caballos de perfil al galope (silueta rellena
verde oscuro con contorno blanco, mantilla con el número y jinete con chaquetilla del color del
stud), la pista de arena (franja ocre) con el césped, el POSTE DE LLEGADA (disco), el MARCADOR DE
LLEGADA (tablero con 1°/2°/3°, números y "cuerpos"), el BOLETO DE APUESTA (ticket blanco con
número, "A GANADOR", perforado), binoculares, la tribuna con el apostador (sombrero, binoculares).
Palabras gigantes Lexend 900 que caen en su palabra; sacudones en los gritos del relator; nada
quieto más de ~0.8 s.
- Tu local = caballo N° 3, ROJO (`#e63946`): mantilla roja, a veces durmiendo (Zzz, ojos cerrados).
- El de enfrente = caballo N° 7, AMARILLO (`#ffcc1f`).
- La clienta = mensaje / globo blanco.
- El agente de IA (desde s11) = jinete VERDE Scalerics (`#5ce611`) con casco y visera.

## Paleta (SOLO estos colores)
- Verde noche `#04130b` / `#08261a` / `#0d3a20`: fondo y rellenos (caballos, paneles).
- Césped `#2f8f46`: la cancha de césped, franjas.
- Arena `#d9a35b`: la pista, rótulos mono, polvo.
- Blanco baranda `#f5f2e8`: líneas, textos grandes, subtítulos.
- Rojo chaquetilla `#e63946`: tu local (N° 3), EN VISTO, sellos, EN VIVO, alarmas.
- Amarillo chaquetilla `#ffcc1f`: el de enfrente (N° 7), lo que gana, acento de subtítulos.
- Desde s11 (Scalerics): verde `#5ce611` para el agente de IA y lo que funciona.
Brillos con drop-shadow del mismo color (1-2 por escena). Prohibido: emojis, fotos, rayas largas
(—) en textos visibles, marcas o logos (WhatsApp solo como palabra y tildes genéricos).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos, horas, números de tablero. Nada que
haya que leer de menos de 26px (lo decorativo lleva `data-layout-ignore`).

## Zona
Barra de transmisión arriba (y 116-192, "VIVO · MAROÑAS · 5ª NOCTURNA · 22:00", la pone ambiente);
subtítulos y 236-420. Contenido de escenas entre y 560 y 1500, x 50-1030. Baranda blanca en y
1548-1588 y rótulo "PISTA DE ARENA · NOCHE" en y 1612 (ambiente): no taparlos. Logo y ~1746.

## Lo que ya está hecho
- `index.html` (lo genera `armar.mjs`), fondo verde noche con reflectores.
- `compositions/ambiente.html`: césped y baranda que se deslizan, reflectores, viñeta, barra de
  transmisión (la hora cambia a "03:00" en "madrugada"; "VIVO" titila en la llegada), ALARMA roja
  en "visto" (x3: 15.79, 16.65, 17.50) y en "burro" (37.92); FLASH blanco de photo finish en "ganó"
  (32.78) y en "primero" (65.78); la hora pasa a 03:00 en 62.47 (segundos globales).
- `compositions/subtitulos.html` (acento amarillo).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la transmisión de turf con la paleta
> de arriba, rellenos y brillos. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y
> la verificación con snapshot y check.

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



## Escenas (tiempos relativos a cada escena; exactos en `tiempos.md`)

**s01-largaron** (4.25 s). "¡Largaron en Maroñas! ¡Y tu local se quedó dormido en el partidor!"
- Cuadro 0: el PARTIDOR de frente (4 cajones numerados 1 a 4, con el 3
  rojo) a medio dibujar, puertas de rejas cerradas.
- 0.05 "¡LARGARON!" gigante blanco con sacudón; 0.15 se abren todas las puertas (campana); de los
  cajones 1, 2 y 4 sale polvo de arena y quedan vacíos.
- 1.62 "local": en el cajón 3 queda la cabeza de un caballo de frente con mantilla roja "3" y un
  cartel rojo "TU LOCAL" con flecha.
- 2.19 "dormido": ojos cerrados, "Z z z" que suben.
- 2.95 "partidor": sello rojo "SE QUEDÓ EN EL PARTIDOR".

**s02-noche** (4.10 s). "Diez de la noche. ¡Sale como una flecha la clienta!"
- 0.0 tablero de pista con "22:00" en mono gigante y una luna; 0.57 "noche" la luna se enciende.
- 0.95 "Sale": la pista de arena de costado; 2.19 "flecha" un globo de mensaje blanco con cola de
  flecha cruza la pista a toda velocidad con líneas de velocidad y polvo; 2.67 "clienta" rótulo
  "LA CLIENTA · PREGUNTA" sobre el globo.

**s03-mensaje** (4.20 s). Audio de WhatsApp de la clienta.
- Celular grande (marco blanco, pantalla verde noche) con chat "TU LOCAL"; 0.0 llega un globo de
  audio (onda de barras que se mueve) y debajo su transcripción: "Hola, ¿tenés el vestido negro
  en talle M?" (0.66) y "Lo quiero para el sábado." (2.61); un vestido negro dibujado con etiqueta
  "M" que aparece en "talle" (1.79); hora 22:00 en la barra del celular.

**s04-visto** (6.64 s). "¡Y tu local no se mueve! ¡Sigue en el partidor! ¡En visto, en visto, en visto!"
- El cajón 3 del partidor, de cerca: la cabeza del caballo rojo dormida (Zzz). 0.67 "no se mueve"
  un cronómetro de carrera que corre. 2.19 "partidor" rótulo "PARTIDOR · CAJÓN 3".
- 3.24, 4.10, 4.95 "visto": tres sellos rojos "EN VISTO" que caen cada uno más grande, con doble
  tilde, sacudón y alarma roja (ambiente). El caballo ni se mosquea.

**s05-matungo** (4.93 s). Apostador: "¡Dale, matungo! ¡Le jugué todo a ese y se quedó durmiendo!"
- La TRIBUNA: el apostador (figura plana: sombrero, bigote, saco) con binoculares, gritando
  (globo "¡DALE, MATUNGO!" en 0.0-0.57). 1.81 "jugué" levanta el BOLETO: "N° 3 · TU LOCAL · A
  GANADOR"; 2.29 "todo" un sello amarillo "TODO" sobre el boleto. 3.59 "durmiendo" se agarra la
  cabeza (el sombrero salta) y aparece un "Zzz" chico en el boleto.

**s06-atropella** (6.76 s). "¡Atropella por afuera el de enfrente! ¡Contesta al instante! ¡Precio, foto, y se lo guarda para el sábado!"
- La pista de costado: 0.0 el caballo N° 7 amarillo al galope (jinete con chaquetilla amarilla)
  entra desde la izquierda por afuera, con polvo; 1.34 "enfrente" rótulo "EL DE ENFRENTE · N° 7".
- 2.34 "Contesta": globos de respuesta salen del jinete: 2.96 "AL INSTANTE" (con un cronómetro en
  0:01); 3.82 "PRECIO" (etiqueta con $), 4.19 "FOTO" (cuadrito con el vestido), 5.15 "GUARDADO
  PARA EL SÁBADO" con tilde amarillo.

**s07-llegada** (6.66 s). "¡Llegan, llegan, llegan... ganó el de enfrente por varios cuerpos! ¡Y tu local todavía no salió!"
- 0.0, 0.67, 1.25 "¡LLEGAN!" tres veces, cada uno más grande, con el poste de llegada que se acerca.
- 1.90 "ganó": FLASH de photo finish (ambiente) y el caballo amarillo cruza el poste.
- 2.4-3.46 el MARCADOR DE LLEGADA (tablero): 1° 7 EL DE ENFRENTE (amarillo), 2° "VARIOS CUERPOS",
  3° 3 TU LOCAL con "NO LARGÓ" que titila rojo en 5.39 "salió".

**s08-burro** (3.65 s). Apostador: "¡Es un burro! ¡Rompo el boleto!"
- 0.38 "BURRO" gigante rojo con sacudón (orejas de burro dibujadas arriba de la palabra). 1.48-2.11
  el boleto N° 3 se rompe en dos mitades que vuelan y caen papelitos.

**s09-de-dia** (3.52 s). "Pará, amigo. No es un burro. De día es el mejor de la pista."
- Cambio de luz: se calma. 0.0 el caballo rojo N° 3 de perfil, parado y entero (sin Zzz); 0.96
  "No es un burro" tachan la palabra BURRO con una línea; 2.03 "día" sale un sol arena detrás;
  2.50 "mejor" una corona de laureles / escarapela amarilla "EL MEJOR DE LA PISTA" sobre el caballo.

**s10-sin-jinete** (2.87 s). "Pero a las diez de la noche, no tiene jinete."
- 0.56 "diez" el sol baja y sube la luna, "22:00"; el caballo rojo se queda solo con la montura
  vacía; 1.76 "jinete": la montura vacía se marca con un círculo y "SIN JINETE" en rojo; el casco
  del jinete colgado de un clavo (el dueño se fue a dormir).

**s11-agente** (4.80 s). Orus: "El de enfrente sí: un jinete que no se baja nunca. Un agente de IA."
- 0.0 el caballo amarillo N° 7 con su jinete; 1.27 "jinete" el jinete se ilumina verde Scalerics
  (casco con visera de circuito); 2.18-2.55 "no se baja nunca": reloj que gira 24 h; 3.27-3.91
  "UN AGENTE DE IA" gigante con verde.

**s12-precios** (6.31 s). "En Scalerics armamos el tuyo: atiende por WhatsApp al instante, con tus precios, tu stock y tus horarios,"
- 1.42 "tuyo": el caballo ROJO N° 3 ahora con jinete verde (el agente) se despierta. 2.50
  "WhatsApp" celular con el chat de la clienta: responde en 0:01. 4.10, 4.82, 5.53: tres fichas que
  se tildan en verde: PRECIOS, STOCK, HORARIOS.

**s13-madrugada** (4.90 s). "toma el pedido, y si es para vos, te pasa la conversación. Hasta de madrugada."
- 0.21 "pedido" ticket de pedido "VESTIDO NEGRO · M · SÁBADO" con tilde verde. 1.28-2.45 "vos ...
  conversación" una flecha del celular a una figura del dueño ("PARA VOS"). 3.78 "madrugada" la
  hora del chat salta a 03:00 con luna y el agente sigue contestando (la barra de ambiente
  también dice 03:00).

**s14-revancha** (3.46 s). "¡Y en la revancha, tu local larga primero!"
- El partidor de nuevo: 0.48 "REVANCHA"; 1.71 "larga" se abren las puertas y el caballo rojo N° 3
  con jinete verde sale disparado primero (polvo); 2.19 "primero" FLASH y "1°" gigante amarillo.

**s15-cta** (5.61 s). "Etiquetá al que siempre se queda en el partidor."
- Un boleto grande: "ETIQUETÁ" gigante, "AL QUE SIEMPRE SE QUEDA EN EL PARTIDOR" y un "@" que
  late; el cajón con la cabecita roja dormida chiquita al costado (Zzz). Queda quieto con un
  latido suave hasta el final; sin salida.
