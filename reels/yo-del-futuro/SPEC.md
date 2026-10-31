# Reel "Yo del futuro": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el AGENTE DE IA.
Formato A/D: MONÓLOGO DE PERSONAJE con VIAJE EN EL TIEMPO (polémica con giro). Entre chispas,
humo y huellas de fuego aparece en el mostrador EL YO DEL FUTURO: el mismo dueño, dentro de
cinco años, canoso, ojeroso, de vuelta de todo (campera magenta, antiparras de viajero en la
frente, voz grave y cansada: Charon). Gancho: "Soy vos. Dentro de cinco años. Y vengo a decirte
que la estás pifiando." EL DUEÑO DE HOY (pelo negro, delantal cian, Puck) se asusta: "¿Qué hacés
en mi local? ¿Y ese auto?". Referencias solo nombradas: el auto es "un Fiat 147" porque "el
DeLorean me dijo: pasá el lunes"; "¿A decirme que compre dólares?"; "como dijo Terminator:
volveré... pero descansado". El del futuro cuenta, con humor, lo que viene: la clienta del
sábado a la noche que dejó en visto ("Estaba cerrando..."), el martes contestando con un pulgar,
las canas "de mensajes sin contestar", las once de la noche con el celular en la mano, el
cumpleaños de la hija contestando WhatsApp entre las velitas. "¿Me venís a decir que cierre?"
GIRO: "No. Vengo a contarte qué hicieron los que crecieron: tienen un empleado de IA" que atiende
a cualquier hora, agenda y vende mientras ellos duermen, "y vos lo podés empezar hoy". "¿Y vos lo
tenés?" "Yo no. Por eso las canas." Narrador Scalerics (Orus): "Tu agente de IA lo hacemos en
Scalerics: atiende por vos, hoy y dentro de cinco años. Escribile un mensaje a tu yo del futuro
en los comentarios."
Voces (partes/voces.sh, partes/componer.mjs): futuro Charon (atempo 1.15), hoy Puck (1.1),
narrador Orus (1.12). Voz de 70.8 s, reel de 74.04 s.

## Recurso visual central
SYNTHWAVE / RETRO 80s NEÓN. Fondo (`armar.mjs`): cielo violeta que se enciende magenta en el
horizonte. `compositions/ambiente.html` (escrita a mano): SOL DE RAYAS naranja→magenta detrás de
todo (horizonte y 1460), GRILLA EN PERSPECTIVA violeta/magenta en el piso (y 1460-1920) que
corre hacia la cámara, estrellas que titilan, scanlines suaves de VHS, arriba un PANEL DE
TIEMPO tipo reloj digital de tablero (sin año: "DESDE · DENTRO DE 5 AÑOS" / "HASTA · HOY") y
abajo el ZÓCALO de quién habla ("YO · DENTRO DE 5 AÑOS" naranja / "YO · HOY" cian). Los momentos
fuertes de cada escena: CHISPAS eléctricas y humo, HUELLAS DE FUEGO, relojes digitales que
cambian, palabras gigantes en letra cromada que caen en su palabra, sacudones. Edición CARGADA:
nada quieto más de ~0.8 s. Personajes dibujados genéricos (nada del auto de la película, ni
caras, ni logos: el Fiat es un auto chiquito cuadrado genérico, sin marca).

## Paleta (SOLO estos colores)
- Noche `#120621`: contornos (6 px), pelo del dueño de hoy, pantallas, fondos de carteles.
- Blanco `#fdf6ff`: piel, canas, textos, papeles.
- Violeta `#7b2ff7`: grilla, sombras de letras, el local.
- Magenta `#ff2a9d`: campera del futuro, neones, alertas, el "visto".
- Cian `#22e4ff`: el dueño de hoy, el celular, el AGENTE DE IA (holograma).
- Naranja atardecer `#ff8a3d`: el yo del futuro (zócalo, antiparras), el fuego, el Fiat, el sol.
- Verde Scalerics `#5ce611`: SOLO desde s15 (entra Scalerics).
Acento de subtítulos por quién habla (`reel.voces` en `armar.mjs`): futuro naranja, hoy cian,
Scalerics verde. Rellenos planos con contorno noche y brillos neón (text-shadow/drop-shadow de
color) en lo grande. Prohibido: emojis, fotos, rayas largas (—), logos, el DeLorean, caras de
actores, años concretos.

## Tipos de letra
Lexend 900 mayúsculas, inclinadas (skew -8°) para lo grande, con relleno cromado (degradé
blanco→cian | magenta→naranja) y sombra dura violeta; IBM Plex Mono 600 para relojes, el panel y
el zócalo. Nada que haya que leer de menos de 26 px.

## Zona
Panel de tiempo arriba (y 64-170, ambiente). Subtítulos en y 236 a ~420. Contenido de escena
entre y 540 y 1540. Zócalo en y 1566-1680 (ambiente). Logo de Scalerics en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo synthwave, colores de subtítulos por voz, cortina `assets/bgm/bed.mp3`).
- `compositions/ambiente.html`: sol, grilla, estrellas, scanlines, panel de tiempo, zócalo por
  parlamento, flash de llegada (0.0) y de partida (59.1), apagado del set en 61.39 (Scalerics).
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: futuro, hoy,
  mostrador, fiat, celular, agente, chispas, fuego). `cd partes/escenas && python3 sNN.py`
  escribe la escena y su `.sfx.json`; después `node armar.mjs`.
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


## Escenas (tiempos relativos a la escena; ver `tiempos.md`)

### s01-llegada (0 a 5.15) · el gancho
Cuadro 0 ya armado: el mostrador del local (frente magenta con borde neón) y un arco de chispas
cian/blanco con humo violeta sobre él; flash. El YO DEL FUTURO aparece detrás del mostrador
(sube con humo). "Soy vos" 0.00-0.26: cae "SOY VOS" gigante cromado, sacudón. "cinco años" 1.30:
reloj digital "DENTRO DE 5 AÑOS" que rueda dígitos y frena. "pifiando" 3.91: cae "LA ESTÁS
PIFIANDO" magenta, sacudón; el futuro lo señala con el dedo.

### s02-mi-local (0 a 2.05) · el dueño de hoy
El DUEÑO DE HOY a la izquierda, con delantal cian, salta del susto (pelos de punta, líneas de
susto) "Qué" 0; el futuro a la derecha, chico, entre humo. "local" 0.45: globo "¡¿QUÉ HACÉS EN
MI LOCAL?!". "auto" 1.18: por la puerta se asoma la trompa naranja de un auto humeando.

### s03-fiat (0 a 3.83) · el Fiat 147
El auto chiquito cuadrado naranja (genérico, sin marca) con dos HUELLAS DE FUEGO detrás y
chispas. "147" 0.43: placa gigante "FIAT 147" que cae. "DeLorean" 2.00: cartel "DELOREAN"
cromado que se tacha con una X magenta; "pasá" 2.69: post-it/sello "PASÁ EL LUNES" que cae
torcido, sacudón.

### s04-dolares (0 a 3.41) · ¿comprar dólares?
El dueño de hoy, desconfiado, brazos cruzados, ojos entrecerrados. "dólares" 2.27: lluvia de
billetes "US$" cian y una flecha de cotización que sube; el futuro (chico, al costado) niega con
la cabeza.

### s05-sabado (0 a 5.98) · el sábado a la noche
"Ojalá" 0: el futuro con cara de "ojalá" (ojos al cielo). "sábado" 2.17: reloj digital gigante
"SÁB 23:12" con luna y estrellas. "clienta" 3.83: un celular cian; "tenés" 5.09: entra el globo
de chat «¿Tenés para hoy?» de la clienta (nombre "Clienta" arriba).

### s06-visto (0 a 3.50) · en visto
El celular grande: debajo del globo aparece "VISTO 23:12" y dos tildes que se pintan en
"visto" 1.33; sello gigante "EN VISTO" magenta, sacudón. "Estaba cerrando" 2.25: el dueño de
hoy chiquito, avergonzado, con la persiana a medio bajar y gotita de sudor.

### s07-pulgar (0 a 3.58) · el martes, con un pulgar
Reloj/calendario digital que rueda "SÁB → DOM → LUN → MAR" en "martes" 0.78 (cada día un
clic). "pulgar" 2.17: en el chat aparece un PULGAR ARRIBA gigante (dibujado), y una respuesta de
la clienta "ya compré en otro lado" que se tacha... (sin texto extra: solo el pulgar y la hora
"MAR 10:04").

### s08-canas (0 a 4.45) · las canas
Primer plano del YO DEL FUTURO señalándose el pelo blanco. "canas" 0.50: zoom a la cabeza; "Son
de mensajes" 1.64-1.98: de cada mechón salen globitos de notificación magenta con números
(1, 3, 9) que hacen pop en cadena; "contestar" 2.85: cartel "SIN CONTESTAR" que titila.

### s09-once (0 a 1.97) · las once de la noche
Reloj digital "23:00" gigante neón en "once" 0.14; abajo, una cama y el dueño de hoy acostado
con la cara iluminada por el celular "celular" 1.18.

### s10-cumple (0 a 4.93) · el cumpleaños de tu hija
Torta de cumpleaños con velitas encendidas y guirnalda; "hija" 1.73: la hija (dibujo chico,
gorrito de cumpleaños) soplando; "contestando WhatsApp" 2.68: el dueño de hoy de espaldas a la
torta, con el celular, globos de chat que caen; "velitas" 3.82: las velitas se apagan solas
(humito), sacudón.

### s11-cierre (0 a 2.68) · ¿cierro?
El dueño de hoy asustado, manos arriba "Pará" 0; "cierre" 1.63: cartel "CERRADO" neón magenta
que titila y se cae torcido con un clang.

### s12-giro (0 a 5.57) · el giro
"No" 0: "NO." gigante naranja, el cartel CERRADO se cae fuera de cuadro. "crecieron" 2.35: tres
locales neón que crecen (escalones) con flechas hacia arriba; "empleado de IA" 3.74-4.52: entra
el AGENTE DE IA: un holograma cian con forma de persona con auricular, que se arma de líneas
(scanlines) y saluda; etiqueta "EMPLEADO DE IA".

### s13-agente (0 a 6.05) · lo que hace
El agente de IA al centro con tres pantallitas alrededor que se encienden en su palabra: "hora"
0.52 reloj "03:47"; "agenda" 1.34 agenda con un turno "MAÑ 10:00 ✓" (sin ✓: un tilde dibujado);
"vende" 1.82 "PEDIDO CONFIRMADO". "duermen" 2.60: el dueño durmiendo con Zzz y luna. "hoy" 4.95:
reloj gigante que se reinicia en "HOY", flash.

### s14-terminator (0 a 8.24) · volveré
"tenés" 0.28: el dueño de hoy pregunta (globo "?"). "Yo no" 1.25: el futuro encoge los hombros;
"canas" 2.65: canas que se erizan. "Hacelo vos" 3.43: el futuro le apunta al de hoy. "Terminator"
4.82: el futuro se pone lentes oscuros genéricos (cian/negro); "volveré" 5.96: cae "VOLVERÉ..."
cromado; "descansado" 6.91: debajo "PERO DESCANSADO" naranja y el futuro se va: el Fiat arranca
dejando dos huellas de fuego, flash.

### s15-scalerics (0 a 6.06) · entra Scalerics
Se apaga el set (ambiente). El holograma del agente al centro, ahora con brillo verde;
"Scalerics" 1.88: logo-palabra SCALERICS verde. "atiende por vos" 2.74: globos de chat que se
responden solos. "hoy" 4.00 y "cinco años" 5.00: dos relojes "HOY" y "DENTRO DE 5 AÑOS" con un
tilde verde cada uno.

### s16-cta (0 a 6.59) · cierre
"Escribile" 0: un globo de comentario gigante con "Querido yo del futuro:" que se escribe solo;
"futuro" 1.62: el sello "TU YO DEL FUTURO" naranja; "comentarios" 2.42: ícono de comentario y
"ESCRIBILE EN LOS COMENTARIOS" que late. Queda latiendo hasta el final con chispas suaves.
