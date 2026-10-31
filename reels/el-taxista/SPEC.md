# Reel "El taxista": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Vende el SITIO WEB. Formato B: DIÁLOGO en un taxi de noche.
WASHINGTON, el taxista montevideano que opina de todo (gorra, bigote canoso, mate en la mano), abre
mirando por el espejito: "Ese local no existe, señora. Si no está en el celular, no existe."
CAROLINA, la pasajera apuradísima, busca "lo de Doña Nélida" (pastelería inventada) para la torta
del cumpleaños de la hija: en el celular le sale una peluquería en Salto ("Salto queda un poquito
lejos"), la página gira y gira y no dice a qué hora abre, el teléfono suena y suena. El taxista
"la conoce": frente a la plaza... o era la otra plaza; en su época se preguntaba en el almacén;
el dólar; "¿usted vio el clásico?". "¡Señor! ¡La ficha sigue subiendo!" La lleva a la de enfrente,
que sale en el celular con horario, cómo llegar y botón de WhatsApp. "¿Y es buena?" "Normal. La
buena es la de Doña Nélida." GIRO: "la mejor torta del mundo no vende si nadie llega". Orus:
"En Scalerics hacemos el sitio web que hace que te encuentren. Hasta un taxista. Mandáselo a ese
local que nadie encuentra."
Voces (partes/voces.sh, partes/componer.mjs): taxista Algenib (atempo 1.1), pasajera Leda (1.08),
Orus (1.1). Voz de 61.2 s, reel de 64.39 s.

## Recurso visual central
INTERIOR DE TAXI DE NOCHE: fondo azul noche con luces de la ciudad en bokeh que pasan por la
ventanilla y una franja ámbar de farola que barre (fondo + main timeline en `armar.mjs`). Arriba,
el ESPEJITO RETROVISOR con los ojos del taxista (parpadean, miran a la pasajera cuando habla, cejas
que suben) y el dado colgando que se hamaca. Abajo, el TABLERO: la radio (ámbar) dice quién habla
(WASHINGTON / CAROLINA / SCALERICS) y el TAXÍMETRO rojo suma FICHAS todo el reel: lento, más rápido
dando vueltas, desbocado en "la ficha sigue subiendo". Todo eso en `compositions/ambiente.html`
(generado por `partes/ambiente.py`). Edición cargada: palabras gigantes que caen, sellos, sacudones.

## Paleta (SOLO estos colores)
- Negro noche `#0b0f1a`: contornos (6 px), fondos de carteles, pantallas.
- Azul noche `#1d2f55`: fondo, campera y gorra del taxista, pelo de la pasajera, manzanas del mapa.
- Amarillo taxi `#ffc81a`: el taxi, acento del taxista, carteles.
- Rojo taxímetro `#ff3b30`: taxímetro, NO EXISTE, errores.
- Ámbar farola `#ff9a3c`: la radio, la pasajera (tapado), lo de Doña Nélida, el pasado.
- Crema `#f4ecd8`: piel, textos, pantallas. Gris canas `#a9aebb` para pelo y bigote.
- Celeste celular `#7fd3ff`: el celular, acento de la pasajera.
- Verde Scalerics `#5ce611`: SOLO el botón de WhatsApp y desde s14 (entra Scalerics).
Subtítulos: taxista amarillo, pasajera celeste, Scalerics verde (`reel.voces` en `armar.mjs`).

## Zona
Espejito arriba (y 56-196), dado hasta ~y 240. Subtítulos en y 236 a ~420. Contenido de escena
entre y 540 y 1500. Tablero (radio y taxímetro) en y 1540-1710. Logo en y 1746.

## Lo que ya está hecho
Las escenas se generan con `partes/escenas/*.py` (personajes y objetos en `base.py`: taxista,
pasajera, local, torta, taxi_arriba, pin, celular, sitio). `cd partes/escenas && python3 sNN.py`
escribe la escena y su `.sfx.json`; después `node armar.mjs`.

## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-gancho (0 a 4.65)
Cuadro 0: el taxista con el mate a media luz. "no existe" 0.55: cae "NO EXISTE" rojo gigante.
"señora" 1.18: levanta el dedo. "celular" 2.64: el taxista se corre y sube un celular con
"tu local", un pin y "SIN RESULTADOS"; "no existe" 3.37: sello rojo NO EXISTE sobre el celular.

### s02-pasajera (0 a 5.94)
Carolina indignada; "existe" 0.37: "¡EXISTE!" celeste gigante. "Doña Nélida" 1.30: cartel
luminoso ámbar "LO DE DOÑA NÉLIDA". "cumpleaños" 2.59: torta de tres pisos con velas; "hija"
3.33: "¡HOY ES EL CUMPLE!". "mejor" 4.63: corona y sello "LA MEJOR", destellos.

### s03-buscador (0 a 5.29)
Celular grande con un "?" amarillo. "Busco" 1.56: se tipea "doña nélida tortas". "sale" 3.23:
resultado "Peluquería Nélida · SALTO, URUGUAY"; "peluquería" 3.60: tijeras; "Salto" 4.25: sello
"¿SALTO?".

### s04-salto (0 a 3.40)
Mapa estilizado de Uruguay; el taxi va de MONTEVIDEO a SALTO dejando puntitos (0.27-1.5).
"lejos" 1.63: "UN POQUITO / LEJOS". "página" 2.72: ventana de navegador con "?".

### s05-pagina (0 a 2.68)
Celular con la página: ruedita que gira y "CARGANDO..."; "GIRA Y GIRA" celeste. "no dice" 1.11:
reloj con las agujas enloquecidas; "hora" 1.76: sello "HORARIO: ¿?".

### s06-llamada (0 a 2.64)
Pantalla de llamada "LLAMANDO... Lo de Doña Nélida". "Suena" 0.92 y 1.48: vibra, ondas y
"RIIING" amarillo dos veces; 2.0: sello "NO ATIENDE NADIE".

### s07-plaza (0 a 4.00)
Mapa de manzanas visto de arriba con dos plazas. "conozco" 0.36: "YO LA CONOZCO". El taxi llega a
la primera plaza en "plaza" 1.91 ("¿ACÁ?"); "otra plaza" 3.36: cruza a la otra ("¿O ERA ACÁ?").

### s08-epoca (0 a 2.68)
Foto vieja ámbar que cae: un ALMACÉN con un vecino. "época" 0.63: "EN MI ÉPOCA...". "preguntaba"
1.18: globo "¿Dónde queda lo de Nélida?". "almacén" 1.82: late el cartel.

### s09-dolar (0 a 4.25)
El taxista se va por las ramas. "dólar" 1.23: "US$" gigante y flecha roja que sube en zigzag.
"¿Usted vio" 2.81: el dólar sale volando, entra rebotando una pelota de fútbol y el globo
"¿Vio el clásico?"; levanta el mate en "clásico" 3.32.

### s10-ficha (0 a 2.44)
"¡SEÑOR!" celeste gigante, Carolina gritando; taxímetro gigante que corre las fichas desde
"ficha" 0.65 y flecha roja en "subiendo" 1.20 (el taxímetro del tablero salta con "+ FICHAS").

### s11-enfrente (0 a 7.63)
"TA, TA. TRANQUILA.": el taxista toma mate. "enfrente" 1.36: entra la "PASTELERÍA LA PLAZA"
(toldo amarillo). "Esa" 2.18: celular con su página; "sale" 2.91: sello "¡SALE EN EL CELULAR!";
"horario" 4.18: ABIERTO HOY; "cómo llegar" 4.82; "botón" 6.18: PEDIR POR WHATSAPP (verde),
late en "WhatsApp" 6.91.

### s12-normal (0 a 4.12)
Globo "¿Y es buena?". "Normal." 1.18: torta gris sin velas y "NORMAL." seco. "La buena" 2.22:
la torta de Nélida con velas, halo amarillo; "Nélida" 2.72: placa "LA DE DOÑA NÉLIDA", destellos.

### s13-torta (0 a 4.11) · el giro
El local de Doña Nélida de noche, con la torta en la vidriera bajo un haz amarillo. "mejor" 0.97:
"LA MEJOR TORTA DEL MUNDO". "no vende" 2.15: sello rojo NO VENDE. "nadie" 2.79: pasa rodando un
yuyo por la vereda vacía; "llega" 3.06: "SI NADIE LLEGA".

### s14-scalerics (0 a 4.55)
Se apaga el taxi (ambiente). Celular con brillo verde y la página de LO DE DOÑA NÉLIDA.
"Scalerics" 0.58: "SCALERICS" verde. "sitio web" 1.64: sello SITIO WEB y entran horario, cómo
llegar y WhatsApp. "encuentren" 3.09: cae un pin verde con onda. "Hasta un taxista" 3.89: llega
el taxi al pin.

### s15-cta (0 a 6.01)
"MANDÁSELO" verde; "a ese local" 1.0; un avioncito de papel verde vuela a un local apagado con
el cartel "¿DÓNDE QUEDA?"; "nadie" 1.81: signo de pregunta amarillo que se hamaca; "encuentra"
2.18: sello "QUE NADIE ENCUENTRA". Queda hasta el final.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es el interior de taxi de noche con la
> paleta de arriba y rellenos planos. Sí valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación con snapshot y check.

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

