# Reel "Prueba de ADN": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): TALK SHOW DE ESCÁNDALOS DE LA
TARDE con prueba de ADN ("Cara a cara con Norma", programa y personajes inventados; el género solo
se nombra de forma genérica, nada de programas, conductores, logos ni caras reales). La conductora
NORMA (Gemini Kore, teatral) abre a los gritos: "¡Que pase el desgraciado! Hoy sabremos de quién es
esta clienta." RUBÉN, ferretero del barrio (Gemini Charon): "Romina es mía. Viene desde hace diez
años. ¡La crié yo!". EL DE ENFRENTE (Gemini Fenrir, canchero): "Perdoname, Rubén, pero ahora compra
conmigo." La clienta ROMINA (Gemini Leda): un domingo a la noche le escribió a Rubén por una mecha,
la dejó en visto; el de enfrente le contestó en un minuto, con el precio, y se la guardó para el
lunes. Rubén: "¡Era domingo! ¡Estaba durmiendo!". Sobre del ADN: "Rubén... usted no es el padre."
¡Uuuh!, sillas que vuelan, el guardia de seguridad; el de enfrente: "Tranquilo, Rubén. Seguí
durmiendo." GIRO (Norma, seria y cálida): Rubén no es mal padre, está solo en el mostrador; un
cliente no es del que lo conoció primero, es del que le contesta. ORUS (Scalerics): armamos tu
agente de IA (contesta al instante, a cualquier hora, con tus precios y tu stock; seguimiento del
que preguntó y no compró; le escribe al que dejó de venir; te pasa la conversación cuando es para
vos). Norma: "Y Rubén... recupera la tenencia." Cierre (Orus): "Mandáselo al que dice que sus
clientes son fieles."

Voz armada de 14 parlamentos (`partes/01..14.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`; los suspensos de Norma en 04, 09 y 13
quedan más largos), atempo 1.06-1.13 y pegados con 0.35-1.0 s (`componer.mjs`, `atempo.json`,
`gaps.json`; los silencios de ~0.7-1 s después de 01, 03, 05 y 09 son los "¡uuuh!" del público).
Tiempos: Speech-to-Text de cada parte; `partes/11.json` y `partes/13.json` corregidos a mano con
silencedetect (STT los había corrido). Locución 71.37 s; reel 74.57 s.

Las escenas se GENERAN: `escenas/lib.mjs` (molde de composición, helpers dibujar/pop/golpe/hablar/
zocalos y los personajes dibujados), `escenas/a.mjs` (s01-s06), `b.mjs` (s07-s12), `c.mjs`
(s13-s16). Para cambiar una escena: editar su .mjs, `node escenas/hacer.mjs [sNN]` y `node armar.mjs`.

## ESTILO: ESTUDIO DE TALK SHOW DE LOS 90. Edición cargada.
Fondo azul rey con rayos de decorado que giran lento y formas geométricas noventosas en los bordes
(triángulo, zigzag, círculo, cuadrado); piso del estudio y una fila de cabezas del PÚBLICO abajo
(y 1600-1760) que saltan con cada "¡UUUH!" (texto gigante amarillo con sombra roja en y 1500).
Barra del programa arriba (y 116-192): EN VIVO · CARA A CARA · CON NORMA · 15:30. ZÓCALOS de TV
(y 1376-1480): pestaña roja mono + título amarillo Lexend 800 con textos escandalosos ("¿De quién
es esta clienta?", "Rubén la dejó en visto", "No es el padre", "¡Se armó en el estudio!"). Sillones
enfrentados: Rubén en sillón ROJO, el de enfrente en sillón AZUL REY. Sellos rotados ("¡Es mía!",
"En visto", "¡Era domingo!", "NO"), sacudones, sillas que vuelan.
- Norma: pelo amarillo gigante festoneado, blazer rojo con hombreras, aros rojos, micrófono.
- Rubén: pelado, bigote, anteojos redondos, delantal azul de ferretería con lápiz en el bolsillo.
- El de enfrente: jopo con gel, lentes de sol amarillos (se los baja), camisa amarilla, cadenita, escarbadientes.
- Romina: pelo con colita, blusa roja, celular en la mano.
- Guardia: remera "SEGURIDAD", lentes, auricular, brazos cruzados.
- Desde s13 (Scalerics): el agente de IA es una cara amable VERDE con auriculares; chips verdes.

## Paleta (SOLO estos colores)
- Azul noche `#0a1250` / `#13207a`: fondo, rellenos oscuros, tinta de caras.
- Azul rey `#2343c9`: fondo central, sillón del de enfrente, delantal de Rubén.
- Amarillo chillón `#ffd21f`: zócalos, "¡UUUH!", pelo de Norma, el de enfrente, acento de subtítulos.
- Rojo `#e5262d`: sillón de Rubén, EN VIVO, sellos, "NO ES EL PADRE".
- Crema `#fff4dc`: caras, líneas de contorno, textos grandes, subtítulos.
- Desde s13: verde Scalerics `#5ce611` para el agente de IA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o marcas (WhatsApp solo como palabra).

## Zona
Barra del programa y 116-192; subtítulos y 236-420. Contenido de escenas entre y 560 y 1370;
zócalo y 1376-1480; "¡UUUH!" y 1500-1620 (ambiente); público y 1600-1760; logo y ~1746.

## Lo que ya está hecho
- `armar.mjs`: fondo azul rey con brillo amarillo, subtítulos crema con acento amarillo, capa ambiente.
- `compositions/ambiente.html`: rayos, formas, público, barra del programa; "¡UUUH!" en 4.55,
  12.85, 19.6 y 43.15, "¡APLAUSOS!" en 67.95; flash en "no" (41.13) y "padre" (42.78) y alarma roja.

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

**s01-desgraciado** (5.40). Norma grande al centro con micrófono, conos de luz que barren. Cuadro 0:
"¡QUE PASE" ya entrando; 0.65 "desgraciado" cae "EL DESGRACIADO!" amarillo con sacudón; 1.86 el
grito se achica y entra el zócalo HOY "¿De quién es esta clienta?"; 3.55 "clienta" saltan tres "?".
**s02-ruben** (8.15). Rubén en el sillón rojo entra desde la izquierda; 0.99 zócalo "Rubén ·
ferretero"; 3.38 "Romina es mía" habla y cae el sello "¡ES MÍA!"; 5.33 "diez años" cae la polaroid
"SU 1er TORNILLO"; 6.53 "crié" lágrimas, zoom, zócalo "«¡La crié yo!»". (¡Uuuh! en 7.45.)
**s03-enfrente** (6.89). 0.37 la cámara cruza al otro lado: el de enfrente en sillón azul con
brillos; 2.07 zócalo "El de enfrente"; 3.56 "Perdoname" se baja los lentes y guiña; 4.02 "Rubén"
recuadro con Rubén echando humo; 5.32 "compra conmigo" sello amarillo "¡AHORA ES MÍA!". (¡Uuuh!)
**s04-clienta** (4.70). Norma presenta, Romina entra caminando por el telón rojo; 0.55 zócalo
"Romina, en disputa"; 2.0 "domingo a la noche" nube con luna y "DOMINGO · 22:40"; 4.14 "mecha" la mecha gira.
**s05-visto** (2.46). Celular "Ferretería Rubén" con su mensaje; 0.43 "visto" tildes rojas, "Visto
22:40", sello "EN VISTO", zócalo; 1.23 segundo sello "¡EN VISTO!" con sacudón fuerte.
**s06-minuto** (5.07). Celular "El de enfrente": escribiendo...; 1.54 "contestó" llega "¡Sí! Tengo
de 8. Sale $ 190."; 1.98 "minuto" reloj "1' minuto"; 2.79 "precio" el globo salta; 3.77 "guardó"
"Te la guardo hasta el lunes." y sello "RESERVADA · ROMINA".
**s07-durmiendo** (2.88). Rubén en la cama con gorro de dormir, celular vibrando en la mesa de luz;
0.18 sello "¡ERA DOMINGO!"; 1.39 "durmiendo" Z z z. Zócalo "Rubén se defiende".
**s08-sobre** (3.39). Norma y el sobre "ADN · CONFIDENCIAL" que cae girando y late; 0.93 zócalo "El
resultado del ADN"; 2.13 "ADN" se dibuja la doble hélice; el sobre tiembla.
**s09-no-es-el-padre** (5.38). La hoja "PRUEBA DE ADN" sale del sobre (clienta Romina, supuesto
padre Rubén, RESULTADO:); 2.19 "no" cae "NO" rojo gigante; 3.84 "padre" "ES EL PADRE", zócalo
ÚLTIMO MOMENTO, recuadro con Rubén boquiabierto. (Flash, alarma roja, ¡UUUUH! del ambiente.)
**s10-sillas** (2.60). Se arma: el guardia entra frenando, tres sillas vuelan girando, estrella de
golpe, sacudones; el de enfrente se baja los lentes: "Tranquilo, Rubén. Seguí durmiendo."
**s11-mostrador** (2.66). El giro, en la ferretería: Rubén detrás del mostrador "FERRETERÍA", cola
de clientes, celular con aviso que vibra, gotas de sudor; 0.61 zócalo "«No es mal padre»"; 1.59
"solo" rótulo "SOLO · TODO EL DÍA".
**s12-contesta** (4.09). Tipografía: "UN CLIENTE / NO ES DEL QUE / LO CONOCIÓ PRIMERO" (tachado rojo
en "primero"), 2.53 "ES DEL QUE" y 2.9 "LE CONTESTA" amarillo gigante con subrayado y tilde.
**s13-agente** (5.35). Orus. Celular "Ferretería Rubén"; 1.24 "agente de IA" aparece el agente verde
con auriculares; 2.09 "contesta al instante" pregunta y respuesta verde a las 03:12; 3.28 "cualquier
hora" reloj 03:12; 4.25 / 4.87 chips "Precios" y "Stock". Zócalo verde "Tu agente de IA".
**s14-seguimiento** (6.12). Tarjetas que entran de a una: 0.23 "PREGUNTÓ Y NO COMPRÓ: ¿Y? ¿Te
llevás la amoladora?"; 2.35 "HACE RATO QUE NO VIENE: ¡Llegaron las pinturas!"; 4.0 "PEDIDO GRANDE
PARA UNA OBRA: Esto es para Rubén." y 4.65 flecha verde "PARA VOS, RUBÉN".
**s15-tenencia** (3.51). Rubén y Romina abrazados, corazones; 1.13 zócalo "Rubén recupera a
Romina"; 1.84 sello verde "TENENCIA RECUPERADA" y confeti. (¡APLAUSOS! del ambiente en 2.8.)
**s16-cta** (5.88). "MANDÁSELO" gigante, "al que dice que sus", "CLIENTES SON FIELES" subrayado; el
de enfrente aparece y guiña, flecha de compartir; zócalo MAÑANA "«Mis clientes son fieles»".
