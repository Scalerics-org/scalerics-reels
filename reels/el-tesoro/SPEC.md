# Reel "El tesoro": spec de las escenas

Reel vertical 1080x1920 de Scalerics, formato P: PELÍCULA DE PIRATAS (la referencia a "Piratas del
Caribe" solo nombrada: "la brújula de Jack Sparrow", sin caras, logos ni música de la obra).
Producto: SITIO WEB. Gancho del capitán: "Para encontrar tu local hace falta un mapa del tesoro.
Y un loro." El capitán y su grumete buscan "la legendaria fugazzeta de Doña Rosa" (inventada): la
única pista es un posteo de 2019 ("frente a donde estaba el kiosco"), el horario dice "abierto:
depende" (el loro lo repite), llaman y nadie atiende, izan las velas igual y llegan: cerrado. "Ni con
la brújula de Jack Sparrow la encontrás." GIRO (capitán): "El tesoro existe. Y es buenísimo. El
problema es el mapa." Orus: "En Scalerics hacemos ese mapa: un sitio web con la X bien marcada. Te
encuentran en Google, abre rápido en el celular, con tus horarios, la ubicación y un botón directo a
WhatsApp." Remate: "¡Capitán! ¡Abre a las siete! ¡Y queda a dos cuadras!" "¡Fugazzeta!" CTA (Orus):
"¿Cuál es el tesoro escondido de tu barrio? Dejalo en los comentarios. Le hacemos el mapa."

Voces (partes/voces.sh): capitán = Algenib (grave, teatral), grumete = Puck, loro = Zephyr con el
tono subido (asetrate x1.32), narrador = Orus. `partes/componer.mjs` pega las partes con atempo
(capitán 1.3, grumete 1.25, loro 1.1, Orus 1.18) y silencios de 0.3-0.8 s; `partes/fix.json` corrige
3 tiempos. La parte 13 ("Siete mares crucé por una fugazzeta") quedó afuera por duración.
Voz de 70.4 s, reel de 73.6 s, 167 palabras.

## ESTILO: MAPA DEL TESORO EN PERGAMINO, de dibujo animado
Fondo de mar profundo de noche (`#12395a` → `#0b2438` → `#06141f`, con brillo oro suave al centro y
azul abajo; lo pone armar.mjs). Ilustración plana con RELLENOS y contorno de tinta sepia (`#2b1a0c`,
trazo 6, caps redondos). Recursos que vuelven: el pergamino con bordes gastados (helper
`pergamino()`), la rosa de los vientos, la X ROJA gruesa, el camino punteado, el barco de líneas con
velas crema, olas azules, monedas de oro, la porción de fugazzeta dorada (con aros de cebolla) como
"tesoro" con rayos. Palabras gigantes en Cinzel 900 mayúsculas (oro o crema, contorno tinta 12px y
sombra dura), sellos rojos de Cinzel, manuscrita Caveat para el mapa y los carteles. Sacudones de
cámara (`golpe()`), slams, nada quieto más de ~0.8 s.

## Personajes (iguales en todas las escenas; están en gen/comun.mjs)
- CAPITÁN: tricornio tinta con ribete oro y calavera crema, parche en el ojo, barba sepia enorme,
  bigote, nariz redonda, saco rojo con solapas oro y charreteras. Boca `.sNN-cap-boca` que habla,
  brazo opcional que señala.
- GRUMETE: pibe flaco, pañuelo rojo con lunares, ojos grandes, pecas, arito de oro, remera a rayas
  crema/azul. Brazo opcional levantado.
- LORO: rojo, ala azul con punta oro, cola azul/oro, cresta oro, cara crema; pico de abajo
  `.sNN-loro-pico` que se abre al graznar.

## Paleta (SOLO estos colores)
- Pergamino `#ecd7a6` (y su sombra `#c9a46a`): mapas, carteles, textos gigantes crema.
- Tinta sepia `#2b1a0c` y sepia medio `#6b4423`: contornos, barba, madera, cofre.
- Rojo `#d23a2a`: la X, sellos, saco del capitán, loro, lo que sale mal.
- Oro `#f5b82e`: tesoro, monedas, rayos, acento de los subtítulos, botón de WhatsApp.
- Mar `#2f7fb5`: olas, rayas del grumete, ala del loro, ruta en el mapa del sitio.
- Piel `#e9b98c` (solo personajes).
Prohibido: emojis, fotos, logos (Google y WhatsApp solo como TEXTO), rayas largas (—).

## Tipos de letra
Cinzel 400-900 (`assets/fonts/Cinzel-var.woff2`) para lo gigante y sellos; Caveat 700 para lo
manuscrito; Lexend para la UI del sitio; IBM Plex Mono 500 para rótulos. Nada de menos de 28px.

## Zona
Subtítulos arriba (y 236 a ~420, crema `#f6e9c8` con acento oro). Contenido entre y 585 y y 1530.
Abajo: olas del ambiente (y 1540-1720), rótulo "Rumbo: lo de Doña Rosa" (hasta 50.1 s) y el logo.

## Cómo se hacen las escenas
Las 13 escenas se generan con `node gen/sNN.mjs` (desde la carpeta del reel o desde gen/): cada script
escribe `compositions/<id>.html` (autocontenido) y su `.sfx.json`, con las piezas de `gen/comun.mjs`
(personajes, pergamino, rosa, barco, porción y los helpers `pop`, `slam`, `golpe`, `dibujar`,
`hablar`, `flotar`). Si cambian los tiempos: `node armar.mjs` y volver a correr los gen (leen las
duraciones de tiempos.md; los tiempos de palabra están como constantes arriba de cada `js`).
`compositions/ambiente.html`: olas abajo, brillitos, viñeta, rótulo y FLASH crema en 3.38 (la X),
39.22 ("cerrado"), 49.21 ("mapa" del giro) y 53.56 (la X del sitio).
Sonidos extra en assets/sfx: olas, splash, moneda, campanita, braaam (bocina), risas, drama, uuh,
golpe, viento, tiza, salto, ring, tic, fanfarria, gong, redoble.

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


(En este reel manda el estilo de arriba sobre SPEC-base: rellenos, varios colores y serif Cinzel.)

## Escenas (tiempos relativos en tiempos.md)
1. **s01-mapa** (0-7.04). Cuadro 0: el pergamino desenrollándose. Se dibuja la costa de la isla, la
   rosa de los vientos gira, el barquito se hamaca. "tu local" (1.0): tiendita con toldo rojo y
   "tu local" en Caveat. "hace falta" (1.78): camino punteado del barco al local; "mapa" (2.62):
   título MAPA DEL TESORO; "tesoro" (3.38): X ROJA slam + flash. "Y un loro" (4.41): el loro cae
   sobre la esquina del mapa. "¡Un loro! ¡Un loro!" (5.24, 5.88): el mapa se apaga, el loro al frente
   grazna, ¡UN LORO! oro arriba y ¡UN LORO! rojo abajo, plumas que caen.
2. **s02-capitan** (6.98). El capitán entra señalando (abajo izq.), el grumete se asoma (abajo der.).
   LA LEGENDARIA (1.54); "fugazzeta" (2.0): la porción dorada sube con rayos que giran y brillitos;
   "de Doña Rosa" (2.92) en Caveat; "mejor" (4.85): coronita; "Montevideo" (5.54): cinta roja LA
   MEJOR DE MONTEVIDEO.
3. **s03-pista** (6.2). El grumete grande pregunta con tres "?"; se achica abajo a la izquierda:
   UNA SOLA PISTA (2.2). "posteo" (3.37): la tarjeta de un posteo viejo (pizzeria.donarosa, foto de
   la porción, "¡Vengan a probarla! Estamos frente a donde estaba el kiosco") con telarañas y polvo;
   sello rojo 2019 (4.29).
4. **s04-kiosco** (6.69). Mapa de un cruce de calles; la cita "frente a donde estaba el kiosco" se
   escribe; local con "¿acá?" y flecha; el kiosco aparece punteado como fantasma (1.76-2.8). "¿Qué
   kiosco?" (3.96): entra el capitán furioso; "ya no está" (5.65): el kiosco se hace nube, ¡YA NO
   ESTÁ! rojo.
5. **s05-depende** (7.96). Cartel de madera colgado HORARIO / "Abierto:" (1.63) / "depende" (2.57).
   El loro entra: ¡DEPENDE! oro (3.45) y ¡DEPENDE! rojo (4.51). "Llamé al número" (5.66): celular
   "Llamando... Doña Rosa" que vibra con ondas; sello NADIE ATIENDE (6.76).
6. **s06-velas** (2.43). ¡IZAD / LAS VELAS! gigantes; el barco se hamaca en olas grandes, las velas
   se izan (0.38); "vamos igual" (0.69) y el barco arranca hacia la derecha.
7. **s07-cerrado** (2.98). Frente de PIZZERÍA DOÑA ROSA con toldo; "llegamos" (0.8): la persiana
   baja de golpe; "cerrado" (1.92): cae el cartelito rojo CERRADO y se hamaca (flash). Grumete chico
   abajo a la izquierda, mirando para abajo.
8. **s08-brujula** (3.39). Brújula dorada grande; la aguja gira como loca; NI CON LA BRÚJULA (0.4),
   "(la de la película)" (1.12); "encontrás" (1.92): la aguja se clava cualquier cosa y tiembla,
   sello SIN RUMBO y signos "?".
9. **s09-giro** (6.67). EL GIRO. Capitán serio abajo, cofre cerrado arriba. "tesoro" (1.84): se
   abre el cofre: monedas, la porción y rayos; EL TESORO EXISTE (2.96); ¡BUENÍSIMO! sello (3.61).
   "El problema" (4.77): todo se apaga, EL PROBLEMA ES; "mapa" (5.54): cae un mapa viejo arrugado
   con "?" y garabatos, EL MAPA rojo y un óvalo rojo que lo rodea (flash).
10. **s10-sitio** (4.23). Orus. El mapa viejo flota con el rótulo SCALERICS; ESE MAPA (0.97);
   "un sitio web" (2.17): el mapa gira y se convierte en un celular con el sitio de Pizzería Doña Rosa
   ("Dónde estamos" con mini mapa y ruta punteada); UN SITIO WEB; "X" (3.22): X roja slam en el mini
   mapa, óvalo rojo y "¡Acá estamos!" (3.72).
11. **s11-google** (6.27). El mismo celular: se tipea "pizzería fugazzeta cerca", primer resultado
   Pizzería Doña Rosa con estrellas y "Abierto" (0.85, "Google" solo en el subtítulo). "abre rápido"
   (1.59): rayo y barra que carga al toque, "¡al toque!". "horarios" (3.31): fila "Hoy: de 19 a 24 h";
   "ubicación" (3.99): fila "Cómo llegar" con pin; "botón" (4.83): botón oro "Escribinos por
   WhatsApp" que un dedo toca en "WhatsApp" (5.51).
12. **s12-llegan** (5.6). El grumete salta con el celular en alto: ¡ABRE A LAS 7! (1.12), ¡A DOS
   CUADRAS! (2.24). El loro entra volando con una porción: ¡FUGAZZETA! rojo (3.2, 3.84) y lluvia de
   monedas.
13. **s13-cta** (7.17). Pergamino TU BARRIO con calles y casitas; "tesoro escondido" (0.59): cinco
   "?" oro por el barrio; globo "Dejalo en los comentarios" (1.91); "Le hacemos el mapa" (3.09-3.56):
   cada "?" se vuelve una X roja y aparece "le hacemos el mapa" en Caveat. Se queda latiendo hasta el
   final.
