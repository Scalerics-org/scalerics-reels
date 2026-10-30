# Reel "Misión: horario": spec para las escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: SITIO WEB
(rápido en el celular, con horario, mapa y botón de WhatsApp, que aparece cuando te buscan en
Google). Formato C (lista en pasos, con números gigantes de FASE) contado como PELÍCULA DE ESPÍAS.

Gancho (el Jefe, voz grave): "Para saber a qué hora abrís, tu cliente necesita un agente secreto."
El Jefe le da la misión a la Agente Cero (fría, profesional): averiguar a qué hora abre la
rotisería de Don Beto. "¿Una rotisería? Dame un minuto." Fases: 1) Google la da "cerrado
permanentemente" (y ayer había cola); 2) la web: "en construcción" desde 2014; 3) Instagram: último
posteo, Semana de Turismo, hace dos años; 4) el teléfono del toldo tiene siete números. El Jefe:
"es una rotisería, no es Misión Imposible". "Ahora sí": 5) operativo de campo con bigote falso,
binoculares y láseres; llega: cortina baja, cartel a mano "vuelvo en 5 minutos"... ¿desde cuándo?
GIRO: "Tarde, cero cero. El de enfrente tiene página, con horario, mapa y WhatsApp. La clienta
compró ahí hace una hora." "¿Y la milanesa de Don Beto?" "La mejor del barrio. Y ni James Bond la
encuentra." Entra Scalerics (Orus): "Tu local no tiene que ser una misión imposible. Te hacemos
una página rápida... te encuentra hasta tu tía." Cierre (el Jefe): "Mandáselo al que dice: a mí me
encuentran igual." 73.5 s.

Voces: el Jefe = Gemini Algenib (grave), la Agente Cero = Kore, Scalerics = Orus (solo en s13).
Los subtítulos ya colorean el acento según quién habla: manila el Jefe, rojo la Agente Cero,
verde Scalerics.

## ESTILO: PELÍCULA DE ESPÍAS (dossier ultra secreto y láseres)
- Recurso central: el EXPEDIENTE de la misión. Carpeta manila con pestaña, hojas hueso con texto
  mecanografiado (FreeMono Bold), sello rojo "ULTRA SECRETO" torcido, la FOTO en blanco y negro
  de la rotisería de Don Beto pinchada con un clip, y la MIRA TELESCÓPICA circular roja que
  apunta a cada pista. Cada fase es una "hoja" nueva del expediente.
- Personajes: SILUETAS negras genéricas (relleno `#0b0b0d`, borde acero `#6b7380` de 4-5 px):
  el Jefe en su sillón con una lámpara que le pega de costado (nunca se le ve la cara); la Agente
  Cero de gabardina, pelo corto y anteojos negros (en s09 con bigote falso y binoculares). Nada de
  caras, actores ni logos de películas: las referencias (Misión Imposible, James Bond, "cero
  cero") solo se nombran con texto.
- Números de fase GIGANTES: "FASE" en Lexend 900 hueso y el número en manila 460-520 px, con un
  rótulo mono "EXP. 00-CERO" y esquinas de visor; entran de golpe (escala 2.6→1 en 0.14 s +
  sacudón) como en `reels/el-golpe`.
- Láseres: líneas rojas `#ff1f3d` de 4-6 px con `drop-shadow` rojo (permitido el brillo SOLO en
  láseres, mira y sellos: 1-2 cosas por escena).
- Edición cargada: golpes de texto, sacudones, flashes, zoom de mira, cortes rápidos. Nada quieto
  más de ~0.8 s. Salida de cada escena: 0.2 s con blur + corrimiento (como el-golpe).
- DESDE s13 (entra Scalerics): se prende la luz; acento verde Scalerics `#5ce611` y hueso; el
  rojo solo para lo que se tacha del pasado.

## Paleta (SOLO estos colores)
- Negro `#0b0b0d` (fondo, siluetas, texto mecanografiado sobre papel).
- Rojo láser `#ff1f3d` (láseres, mira, sellos, "CERRADO", lo que falla).
- Manila `#d9b77e` (carpeta, números de fase, rótulos, el Jefe).
- Blanco hueso `#f1ece1` (hojas, foto, textos gigantes).
- Gris acero `#6b7380` (bordes de silueta, líneas de dibujo en las fotos, rótulos apagados).
- Verde Scalerics `#5ce611`: solo s13 y s14.
Sin degradés de colores, sin emojis, sin fotos, sin rayas largas (—) en textos visibles.

## Tipos de letra
- Lexend 800-900 mayúsculas para lo gigante; Lexend 600 para UI de celular/navegador.
- FreeMono Bold (`assets/fonts/FreeMonoBold.ttf`, "máquina de escribir") para el expediente.
- IBM Plex Mono 500 para rótulos de visor, horas y datos.
- Caveat (`assets/fonts/Caveat-var.woff2`) SOLO para el cartel escrito a mano de s10.
Nada que haya que leer de menos de 26 px (lo decorativo más chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~420, los pone `subtitulos.html`): las escenas NO escriben la frase
narrada entera, solo palabras clave. Contenido entre y 560 y y 1520. Logo de Scalerics en y ~1746.
`ambiente.html` pone abajo a la izquierda (y 1600) el rótulo "EXP. 00-CERO · ULTRA SECRETO"
(hasta 57.95), grano de película y viñeta: no los tapes ni dupliques.

## Lo que ya está hecho (no tocar)
- `index.html`, `compositions/subtitulos.html` (los genera `armar.mjs`).
- `compositions/ambiente.html` (segundos globales): barrido de láser rojo de lado a lado en
  0.0, 31.35 (Misión Imposible) y 38.85 (láseres); flashes rojos de alarma en 16.17
  ("cerrado permanentemente"), 30.14 ("siete números"), 43.55 ("¿desde cuándo?"), 44.61
  ("tarde"); en 57.95 flash hueso y se prende la luz verde Scalerics hasta el final.

**Lo de abajo (SPEC-base) vale para lo técnico; en colores, letras y movimiento manda lo de arriba.**

## Sonidos extra disponibles
Además de la lista de abajo: `impact-bass-2`, `glitch-2`, `glitch-3`, `whoosh-cinematic`, `error`
(tramo mudo al principio: mejor `glitch-1`).

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


# Las escenas (tiempos relativos a cada escena: ver `tiempos.md`)

### s01-secreto (0.00, 4.48 s) · el gancho
Cuadro 0 ya con algo: la MIRA telescópica roja (círculo r 300, cruz, marcas) centrada en y ~930,
moviéndose de lado como buscando. Adentro de la mira, un RELOJ de pared (hueso, agujas acero) con
"¿ABIERTO?" en mono rojo debajo. "hora" 0.73: el reloj gira las agujas loco. "cliente" 1.64:
aparece abajo un celular chico en silueta con "¿a qué hora abren?" (Lexend 600, 30 px). "agente"
2.82: CORTE: la silueta de la Agente Cero (gabardina, anteojos) sube desde abajo, la mira se le
centra en el pecho; "secreto" 3.18: golpe "AGENTE SECRETO" Lexend 900 (hueso / manila, 120-150
px) en y ~600-760 + sello rojo "ULTRA SECRETO" torcido + flash. Salida con blur.

### s02-mision (4.48, 7.92 s) · el expediente
El Jefe en su sillón (silueta, de 3/4, abajo a la izquierda y 1150-1500, lámpara manila que
oscila) y la CARPETA manila que se desliza sobre la mesa. "Agente Cero" 0.00-0.50: rótulo
mecanografiado "PARA: AGENTE CERO" se tipea. "misión" 1.59: se abre la carpeta: hoja hueso con
"MISIÓN N° 00" y líneas mecanografiadas. "aceptarla" 2.95: sello rojo "ULTRA SECRETO" cae (golpe
+ sacudón). "averiguar" 3.94: la FOTO en blanco y negro de la rotisería (frente con toldo a rayas
acero/hueso, cortina, cartel "ROTISERÍA") cae pinchada con un CLIP. "hora" 4.95: en la hoja se
tipea "OBJETIVO: HORARIO". "rotisería" 5.77 / "Don Beto" 6.59: la mira roja se cierra sobre la
foto; rótulo "ROTISERÍA DE DON BETO" en mono. Último segundo: abajo de la hoja, "ESTE MENSAJE SE
AUTODESTRUYE" con cuenta 3, 2, 1 y la hoja humea/tiembla (sin texto narrado: es el chiste visual).

### s03-minuto (12.40, 2.28 s) · "¿Una rotisería? Dame un minuto."
La Agente Cero (silueta, media figura) con una ceja levantada: "¿UNA ROTISERÍA?" en Lexend 900
hueso arriba (y ~600). "minuto" 1.52: un CRONÓMETRO grande (círculo hueso, aguja roja) que arranca
en "00:60" mono manila y empieza a correr; la aguja gira rápido. Sobradez: la agente se acomoda los
anteojos.

### s04-google (14.68, 4.19 s) · FASE 1
Golpe "FASE" + "1" gigante (0.00-0.34). "Google" 0.86: el número se va y aparece una TARJETA de
resultado de búsqueda genérica (sin logo: barra con lupa y "rotisería don beto", ficha con nombre
"Rotisería Don Beto", estrellitas acero). "Cerrado" 1.49 / "permanentemente" 1.92: se estampa en
rojo "CERRADO PERMANENTEMENTE" (flash de ambiente en 16.17 global). "ayer" 3.09 / "cola" 3.67:
la mira se va a la foto del frente donde aparecen 5-6 siluetas en COLA en la puerta; rótulo
"AYER · 20:30" mono.

### s05-web (18.87, 3.64 s) · FASE 2
Golpe "FASE 2". "web" 0.96: ventana de navegador (marco acero, barra con "rotiseriadonbeto.com.uy")
que tarda en cargar: barra de carga trabada. "construcción" 1.65: adentro aparece un cartel
manila a rayas con conos y "EN CONSTRUCCIÓN" en negro, un obrerito
silueta con pala. "dos mil catorce" 2.44-3.04: abajo "© 2014" en rojo, se estampa; telarañas
acero en las esquinas de la ventana.

### s06-instagram (22.51, 5.20 s) · FASE 3
Golpe "FASE 3". "Instagram" 0.90: perfil genérico en un celular (círculo de foto, grilla de 3x2
fotos dibujadas en acero; nada de logo ni de colores de la marca). "último posteo" 1.74-2.00: la
mira roja se posa en la primera foto: una tarjeta "¡FELIZ SEMANA DE TURISMO!" con un sol y una
milanesa dibujados. "Turismo" 3.31: zoom a esa foto. "hace dos años" 4.01-4.35: sello rojo "HACE 2
AÑOS" y telarañas/polvo que caen sobre la grilla.

### s07-toldo (27.71, 3.64 s) · FASE 4
Golpe "FASE 4". "teléfono" 1.13 / "toldo" 1.74: el TOLDO a rayas (acero/hueso) de la rotisería en
grande con "TEL. 408 21 75" pintado (siete números) en negro sobre una banda hueso. "Siete" 2.43:
la mira cuenta los dígitos uno por uno (marcas rojas 1 a 7 debajo) y "números" 2.81: rótulo rojo
"FALTA UN NÚMERO" o "NÚMERO INEXISTENTE" con glitch (flash de ambiente en 30.14 global).

### s08-imposible (31.35, 3.79 s) · el Jefe pierde la paciencia
Barrido de láser de ambiente al entrar. El Jefe en su sillón, de espaldas, golpea la mesa
(sacudón) en "Cero" 0.00. "rotisería" 1.09: la foto de la rotisería con un rótulo hueso
"ROTISERÍA" humilde, chiquita. "Misión Imposible" 2.27-2.63: una MECHA encendida (línea manila con
chispa roja) recorre la pantalla de lado a lado y "NO ES MISIÓN IMPOSIBLE" en Lexend 900 (hueso,
"IMPOSIBLE" en rojo) cae de golpe. Solo el título nombrado, nada de la obra.

### s09-campo (35.14, 5.05 s) · FASE 5: operativo de campo
"Ahora sí" 0.00: la Agente Cero se pone en guardia. "Fase cinco" 0.44-0.78: golpe "FASE 5" chico
arriba (no gigante: hay mucho que contar) + "OPERATIVO DE CAMPO" en mono manila. "Bigote" 2.26:
a la silueta le aparece un BIGOTE FALSO hueso con pop (y rebota). "binoculares" 2.96: se lleva
unos binoculares a los ojos (los círculos de visión aparecen como máscara doble). "láseres" 3.83:
rayos láser rojos cruzados aparecen en diagonal y la silueta se contorsiona (se agacha / gira)
para esquivarlos; barrido de ambiente en 38.85 global.

### s10-cortina (40.19, 4.42 s) · llegó
"Cortina" 0.00 / "baja" 0.35: el frente de la rotisería con la CORTINA metálica que BAJA de golpe
(líneas horizontales acero), con el toldo arriba. "cartel" 1.22: un papel hueso pegado con cinta
en la cortina, escrito a mano (Caveat, negro, ~70 px) "Vuelvo en 5 min". "vuelvo" 1.92-"minutos"
2.35: la mira hace zoom al cartel. "¿Desde cuándo?" 3.36-3.64: golpe "¿DESDE CUÁNDO?" Lexend 900
en rojo y un reloj que da vueltas sin parar; polvo/telaraña en el cartel.

### s11-tarde (44.61, 7.68 s) · el giro
"Tarde" 0.00: sello rojo gigante "MISIÓN FALLIDA" sobre el expediente (flash de ambiente) y la
silueta del Jefe. "cero cero" 0.27-0.78: rótulo "AGENTE 00" que se tacha. "el de enfrente" 1.45:
paneo a la vereda de enfrente: OTRO local con la luz prendida, y adelante un CELULAR grande con
su página: nombre, "ABIERTO · 11 a 23 h", un mapita con pin, botón "WhatsApp" (verde NO: hueso
con borde manila: el verde es solo de Scalerics). "página" 2.00, "horario" 2.91, "mapa" 3.52,
"WhatsApp" 4.18: cada cosa hace pop en su palabra con una tilde manila. "La clienta" 5.36: una
silueta de clienta sale del local de enfrente con una BOLSA; "compró" 5.64 sello "VENDIDO"; "hace
una hora" 6.27-6.82: reloj manila "hace 1 h".

### s12-milanesa (52.29, 5.83 s) · "¿Y la milanesa de Don Beto?"
"milanesa" 0.29: una MILANESA dibujada (con limón) en un plato, bajo un foco, adentro de una
caja fuerte que se abre (como el tesoro de una película). "La mejor del barrio" 2.05-2.67: una
medalla manila "LA MEJOR DEL BARRIO". "Y ni James Bond" 3.44-4.02: la mira roja la busca y no la
encuentra: la caja se cierra / la milanesa se hunde en la niebla acero; "la encuentra" 4.54: rótulo
rojo "OBJETIVO NO ENCONTRADO" con glitch.

### s13-pagina (58.12, 9.34 s) · entra Scalerics (Orus)
Flash hueso de ambiente en 57.95 y LUZ: verde Scalerics. "Tu local" 0.16: la rotisería de Don
Beto ahora iluminada. "misión imposible" 1.48-1.82: el sello "ULTRA SECRETO" se tacha en verde.
"página rápida" 3.35-3.73: un CELULAR grande (hueso, rx 52) con la página de la rotisería, que
carga al toque (barrita verde que se llena en 0.3 s). "horario" 4.33: "Abierto hoy · 11 a 23 h";
"mapa" 4.76: mapita con pin verde; "botón de WhatsApp" 5.16-5.66: botón verde "Escribinos por
WhatsApp". "Google" 7.40: arriba aparece la barra de búsqueda con "rotisería cerca" y el
resultado con la tilde verde. "hasta tu tía" 8.43-8.80: una silueta de TÍA (rodete, anteojos,
cartera) con el celular, que pone cara de "¡ah, mirá!" (globo hueso "¡Abre a las 11!").

### s14-cta (67.46, 6.00 s) · el cierre
El expediente cerrado en el centro, con "MANDÁSELO" gigante (Lexend 900 hueso) arriba y "AL QUE
DICE:" en mono. "a mí me encuentran igual" 1.58-2.47: tarjeta manila con la frase entre comillas
en FreeMono negro ("«A mí me encuentran igual»") y un sello rojo "CASO PERDIDO" torcido. Desde
3.0: cuenta regresiva de AUTODESTRUCCIÓN 3, 2, 1 (mono rojo) y el expediente echa humo; queda
quieto lo justo para leer (sin explotar del todo). Logo de Scalerics abajo (lo pone el index).
