# Reel "El adiestrador": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): PROGRAMA DE TV DE ADIESTRAMIENTO
CANINO ("¡Sentado, dueño!", con Tito; programa y personajes inventados, el género solo se nombra,
nada de programas, conductores, logos ni caras reales). Producto: AGENTE DE IA.
Gancho (Tito, Gemini Fenrir, canchero): "El problema no es el perro. Es el dueño. Y hoy vino uno
que deja en visto." Primer ejercicio: la clienta SOFÍA (Gemini Leda) escribe "¿tenés estos
championes en treinta y ocho?"; Tito entrena al DUEÑO (Gemini Charon, cansado) como a un perro:
"¡Atento! ¡Celular! ¡Contestá!"; el dueño: "Ahora no, estoy en la caja"; "¡Quieto! ¡Soltá la caja!
¡Contestá!"; Sofía: "Me clavó el visto". Obediencia: cero puntos. De noche: "Son las once, ¿me
guardás un par para mañana?"; el dueño, dormido: "Pasá el lunes". "Gruñó. Esto es grave."
GIRO (Tito, serio y cálido): el dueño no es malo, está solo: atiende la caja, repone, cobra, y a
las once quiere dormir; no le podés pedir que conteste también. "Este no necesita correa. Necesita
un compañero." ORUS (Scalerics): le armamos un agente de IA: contesta por WhatsApp al instante, a
cualquier hora, con precios, stock y horarios; toma el pedido y, cuando es para vos, te pasa la
conversación. Sofía: "¡Me contestaron en un segundo! Mañana paso." Tito: "¡Buen dueño! Diez
puntos. Tomá, una galletita." Dueño: "¿Es de las de perro?" (el perro se la roba). Cierre (Orus):
"Mandáselo al que dice «ya te contesto»."

Voz armada de 18 parlamentos (`partes/01..18.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.05-1.13 y pegados con 0.35-0.65 s
(`componer.mjs`, `atempo.json`, `gaps.json`). 10 y 17 regenerados (STT oía "pasa lunes" y "la de
Pardo"). Tiempos: Speech-to-Text de cada parte; `partes/06`, `15`, `16` y `17.json` corregidos a mano
con silencedetect. Locución 72.02 s; reel 75.22 s. 175 palabras.

Las escenas se GENERAN: `escenas/lib.mjs` (molde, helpers dibujar/pop/golpe/hablar/cola/zocalos,
personajes y objetos), `escenas/a.mjs` (s01-s06), `b.mjs` (s07-s12), `c.mjs` (s13-s17); el campo y
el ambiente con `escenas/fondo.mjs`. Para cambiar una escena: editar su .mjs,
`node escenas/hacer.mjs [sNN]` y `node armar.mjs`. OJO: no tweenear x/y/scale de un `<g>` que tiene
atributo `transform` (GSAP lo pisa): la clase va en un `<g>` interno.

## ESTILO: CAMPO DE ENTRENAMIENTO CANINO DE TV, AL AIRE LIBRE. Edición cargada.
Fondo (armar.mjs): cielo azul en degradé arriba y césped verde desde y 1152 (horizonte).
`compositions/campo.html` va DETRÁS de las escenas: nubes que cruzan, árboles y valla blanca en el
horizonte, franjas de pasto cortado en perspectiva, líneas de tiza (eje y óvalo), conos naranjas,
vallas de salto y el plato del perro en el borde de abajo (y 1500-1720).
`compositions/ambiente.html` va ENCIMA: barra del programa (y 116-192) EN VIVO · ¡SENTADO, DUEÑO! ·
CON TITO · OBEDIENCIA ? → 0 (24.43, "cero") → 10 (64.27, "diez"); la NOCHE (26.2 a 34.1): velo
azul oscuro, luna y estrellas.
Zócalos de TV (y 1386-1486): pestaña naranja mono + título tiza Lexend 800. Gritos de adiestrador:
Lexend 900 tiza o naranja con contorno y sombra tinta. Sellos naranjas sobre tinta.
- Tito (adiestrador): gorra naranja con "T", campera tinta con chaleco naranja reflectivo, silbato
  colgado, riñonera de premios; brazo que señala (`.<p>-brazo`).
- El dueño: pelado con costados, ojeras, bigote, camisa celeste, COLLAR NARANJA con chapita.
- Sofía: pelo largo, remera naranja, aros, celular.
- El perro: blanco con manchas, oreja caída, collar naranja; es el único obediente del programa.
- Desde s13 (Scalerics): el agente de IA es una cara amable VERDE con auriculares; chips verdes.

## Paleta (SOLO estos colores)
- Azul cielo `#2f7fd0` (y el degradé del fondo `#154f96`-`#6aa6e0`): cielo, camisa del dueño, UI.
- Verde césped `#3a9a48` / `#23703a`: el campo.
- Naranja cono `#ff7a1a`: conos, chaleco, collar, zócalos, sellos, acento de subtítulos (`#ff8a2a`).
- Tinta azul uniforme `#0d2c54`: contornos, rellenos oscuros, tableros.
- Blanco tiza `#fbf9f1`: caras, líneas del campo, textos grandes, subtítulos.
- Desde s13: verde Scalerics `#5ce611` para el agente de IA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o marcas (WhatsApp solo como palabra).

## Zona
Barra del programa y 116-192; subtítulos y 236-420. Contenido de escenas entre y 560 y 1370;
zócalo y 1386-1486; conos y vallas del campo y 1500-1720; logo y ~1746.

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

**s01-dueno** (5.16). Tito ya entrando, señala; "EL PROBLEMA" golpea. 0.73 "perro": entra el perro
sentado con tilde verde, "NO ES EL PERRO", mueve la cola. 1.82 "dueño": el perro sale, entra el
dueño (collar), cae "ES EL DUEÑO" naranja con sacudón. 2.64 zócalo HOY "Caso: dueño en visto"; el
dueño bosteza. 4.09 "visto": sello "DEJA EN VISTO".
**s02-programa** (4.54). Cartel naranja del programa con huesos; 0.62 "¡SENTADO," 1.25 "DUEÑO!"
golpean; 2.05 "ejercicio" el cartel sube y entra la pizarra "EJERCICIO 1 · CONTESTAR A LA
CLIENTA"; 2.95 "clienta" celular con notificación que vibra.
**s03-championes** (3.01). Sofía con celular; chat "Calzados del barrio": 0.4 foto del champión,
0.7 globo "Hola, ¿tenés estos championes en 38?"; 1.09 el champión se mueve; 2.27 sello "38".
**s04-atento** (2.67). Tito en primer plano gritando, silbato: "¡ATENTO!" (0), "¡CELULAR!" (0.93,
celular vibrando), "¡CONTESTÁ!" naranja (1.69) con sacudón fuerte.
**s05-caja** (2.40). El dueño detrás del mostrador mira la caja registradora, gruñe (zigzag); el
celular vibra solo en el mostrador. 1.39 "caja": se abre el cajón, "¡CLIN!". Zócalo «Estoy en la caja».
**s06-quieto** (3.74). Tito con la correa enganchada a la caja; el dueño abrazado a la caja.
"¡QUIETO!" (0), "¡SOLTÁ LA CAJA!" (0.95), tironeos en 1.48 y 1.93, gotas de sudor; "¡CONTESTÁ!"
(2.45) y el dueño dice que no con la cabeza.
**s07-visto** (5.71). Celular: "¿Hola?"; 1.16 tildes azules "Visto 10:13", sello "ME CLAVÓ EL
VISTO". 2.46 el celular sale, cae el tablero OBEDIENCIA; 2.91 "cero" golpea el "0"; Tito niega.
4.17 "probemos de noche": pizarra "EJERCICIO 2 · DE NOCHE" (y empieza la noche del ambiente).
**s08-once** (2.99). Noche. Celular ("últ. vez hoy 19:30"); 0.45 "once" reloj "23:00"; 0.95 globo
"Son las once. ¿Me guardás un par para mañana?". Zócalo 23:00 "Sofía insiste".
**s09-gruno** (4.06). El dueño dormido en la cama (Z z), el celular brilla en la mesa de luz;
0.29 "lunes" zigzag y "GRRR..."; 1.70 "gruñó" Tito asoma por la izquierda, en voz baja; 2.90
"grave" sello "GRAVE". Zócalo «Pasá el lunes».
**s10-solo** (4.57). GIRO, vuelve el día. "¡PARÁ!" y Tito levanta la mano; 0.81 "mirá bien" luz
sobre el dueño solo en el medio del campo; 1.83 zócalo DIAGNÓSTICO "El dueño está solo"; 2.95
sello "NO ES MALO"; 3.62 zoom al dueño que baja la cabeza, "ESTÁ SOLO" naranja.
**s11-todo** (7.26). El dueño al centro y sus tareas alrededor: CAJA (0.43), REPONER (1.08),
COBRAR (1.97), 23:00 (2.84); 4.09 "dormir" se le cierran los ojos, bosteza, Z z; 5.34 "pedir" le
cae el celular "+9" encima; 6.23 "también" "¿Y TAMBIÉN?". Zócalo "Hace todo él".
**s12-companero** (3.95). La correa se dibuja; 0.91 "correa" la tacha una X; 1.68 "necesita": el
hueco punteado con "?" al lado del dueño, el perro se ofrece moviendo la cola; 2.55 "UN COMPAÑERO".
**s13-agente** (7.68). Orus. Celular con el mensaje de Sofía a las 23:00; 1.55 "agente" aparece la
cara verde con auriculares y "AGENTE DE IA"; 2.49 "contesta" globo verde "¡Sí, hay en 38! ¿Te los
guardo para mañana?"; chips: "Al instante" (3.63), "A toda hora" (4.87), "Precios" (5.58), "Stock"
(6.29), "Horarios" (6.99).
**s14-pasa** (3.16). 0.2 "pedido" ticket "PEDIDO TOMADO · Championes 38 · Sofía · Retira mañana a
las 10" y sello "LISTO"; el agente y el dueño; 1.63 "pasa" tarjeta "PARA EL DUEÑO: Quiere 20 pares
para un club" con flecha verde al dueño, que se alegra. Zócalo "Y te pasa lo tuyo".
**s15-segundo** (2.83). Sofía feliz con el celular (globo verde); 1.0 "segundo" cronómetro "1 SEG";
1.73 sello verde "MAÑANA PASO". Zócalo "Atendida a las 23:00".
**s16-galletita** (5.95). Tablero OBEDIENCIA; 1.33 "diez" golpea el "10", confeti, el dueño
sonríe; 2.23 "tomá" la galletita-hueso; 3.6 "¿es de las...?" el dueño la mira desconfiado; 4.75
"perro" el perro salta y se la roba. Zócalo "¡Aprobado!".
**s17-cta** (5.54). "MANDÁSELO" naranja, "al que dice", globo «Ya te contesto» con tildes; el perro
entra e inclina la cabeza; flecha de compartir; zócalo COMPARTILO "Al que deja en visto".

## Lo que ya está hecho
Todo: voz, tiempos, 17 escenas, campo y ambiente; `check` sin errores.
