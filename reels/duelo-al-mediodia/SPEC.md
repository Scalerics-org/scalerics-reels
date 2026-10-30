# Duelo al mediodía · Agente de IA (contestar primero) · spaghetti western

**De qué trata.** "El de enfrente te desafió a duelo. Y vos ni te enteraste." Una película del
OESTE (spaghetti western, solo nombrado como género) contada por un NARRADOR de voz grave y
solemne (Algenib). En este pueblo los duelos no son al mediodía: son a las once de la noche. Una
CLIENTA (Leda) escribe "Hola, ¿tenés en talle M?". El que contesta primero se la queda. EL DE
ENFRENTE (Fenrir, pistolero canchero) desenfunda al toque: "Sí, reina. Tengo en M, en negro y en
verde. ¿Te lo separo?" "¡Divino! Mañana paso." VOS (Charon, el dueño, viejo vaquero cansado)
desenfundás tres días después... un pulgar para arriba. "Yo contesto cuando puedo, forastero.
Estaba cebando un mate." Título de película: "El bueno, el malo y el que deja en visto." "¡Es
trampa! ¿Cómo desenfunda tan rápido ese tipo?" GIRO: el de enfrente: "¿Yo? A las once yo estaba
roncando, campeón. El que tira es mi agente de IA: contesta al instante, con precio y stock, a
cualquier hora." Moraleja del oeste: no gana el más guapo, gana el que contesta. Entra ORUS:
"En Scalerics armamos tu agente de IA: contesta en el momento, con tus precios y tu stock,
mientras vos dormís. Etiquetá al más lento del pueblo." Locución de 69.3 s; total 72.5 s.

**Formato:** P (cultura popular: película western) con cinco voces.
**Recurso visual central:** la CALLE DEL PUEBLO en duelo: dos fachadas de madera enfrentadas
(TU LOCAL a la izquierda, ENFRENTE a la derecha), el RELOJ de la plaza que marca la hora, el
cartel de SE BUSCA de papel viejo, tumbleweed que cruza, sol enorme detrás de las mesetas. Los
celulares son los REVÓLVERES: salen de la cartuchera, y cada respuesta es un disparo con fogonazo.

## ESTILO: spaghetti western sepia. Edición CARGADA.
Planos de western: primerísimos primeros planos de OJOS entrecerrados (franja horizontal), manos
sobre la cartuchera, sombreros, silueta a contraluz, títulos de película en mayúsculas gigantes
espaciadas. Golpes de zoom en la palabra, temblor, fogonazos, polvo. Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Café noche `#1c120b` (fondo) y tabaco `#3b2616` (rellenos de siluetas, fachadas).
- Pergamino `#f2e1bd`: trazos (línea 5px, caps redondos), textos grandes, papel del SE BUSCA.
- Ocre sol `#eaa53b`: el sol, la estrella del sheriff, el reloj, lo que brilla, acentos del narrador.
- Rojo óxido `#c8452c` (y `#f0603f` para texto chico sobre oscuro): EL DE ENFRENTE (pañuelo,
  banda del sombrero), fogonazos, sellos ("VENDIDO", "TRAMPA"), la X.
- Verde Scalerics `#5ce611`: SOLO desde s14 (Scalerics): los tildes, la pantalla del agente propio.
Brillos con text-shadow/drop-shadow del mismo color permitidos (1-2 por escena). Prohibido: emojis,
fotos, rayas largas (—) en textos visibles, logos, personajes o carteles de películas reales:
solo vaqueros dibujados genéricos.

## Tipografía
- Subtítulos (los arma armar.mjs): Lexend 600 pergamino; acento ocre (narrador, clienta, vos),
  rojo `#f0603f` (el de enfrente), verde (Scalerics). Arriba de cada grupo, un cartelito mono con
  quién habla: "EL NARRADOR", "LA CLIENTA", "EL DE ENFRENTE", "VOS", "SCALERICS".
- Títulos de película y carteles: Outfit 900 mayúsculas, letter-spacing 0.06-0.12em.
- Rótulos, horas: IBM Plex Mono 500 (mínimo 26px).
- Etiqueta bajo el dibujo: IBM Plex Mono 500 28px, letter-spacing 0.3em, ocre, top 1418 (sobre el piso oscuro, debajo del horizonte).

## Capas fijas
- `compositions/desierto.html` (DEBAJO de las escenas): el sol grande ocre a medio poner detrás de
  mesetas de silueta (horizonte en y ~1380), el piso con líneas de polvo, el sol gira sus rayos
  muy despacio. Las escenas dibujan encima.
- `compositions/ambiente.html` (ENCIMA): grano y rayas de película vieja, viñeta sepia, polvo que
  vuela, el TUMBLEWEED que cruza por abajo (y ~1530) en 3.0-6.0 ("ni te enteraste"), 27.3-31.0 (el silencio de los
  tres días) y 68.6-72.4 (el CTA), fogonazos (flash ocre) en los disparos 2.27 (duelo), 20.96 (Tengo), 49.2 (agente) y
  rótulo "DUELO AL MEDIODÍA · UN FILM DEL OESTE" abajo a la derecha (y 1600).
- Zona: nada arriba de y 580 (subtítulos), contenido entre y 580 y 1340; x 50-1030.

## Personajes (genéricos, línea pergamino 5px sobre relleno tabaco)
- EL DE ENFRENTE: pistolero flaco, sombrero de ala ancha con banda roja, pañuelo rojo al cuello,
  bigote finito, sonrisa de costado, ojos entrecerrados; cartuchera con un CELULAR en vez de revólver.
- VOS (el dueño): vaquero viejo y panzón, sombrero abollado, bigotazo caído, ojeras, MATE en la
  mano y TERMO bajo el brazo; cartuchera con un celular viejo con funda.
- LA CLIENTA: joven, pelo largo suelto, en la cama con el celular (s03); su retrato en el SE BUSCA.
- EL AGENTE DE IA: un sheriff cuya cabeza es una PANTALLA redondeada (ojos-punto ocre y sonrisa de
  línea), sombrero, ESTRELLA ocre en el pecho con "IA"; dos celulares como revólveres.

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


## Escenas (tiempos relativos a la escena: ver tiempos.md)

### s01-duelo (6.11 s) "El de enfrente te desafió a duelo. Y vos ni te enteraste."
Cuadro 0: la calle del pueblo ya a medio dibujar (fachadas de madera a izquierda y derecha, con
carteles TU LOCAL y ENFRENTE). En "enfrente" (0.38) zoom a la fachada de enfrente: el pistolero en
silueta en la puerta. "desafió" (1.51): tira un GUANTE que cae al piso en el medio de la calle. En
"duelo" (2.27): franja de OJOS entrecerrados a todo ancho (primerísimo plano) + palabra "DUELO"
gigante roja que cae con temblor y fogonazo. "Y vos" (2.73-3.46): corte a TU LOCAL: vos en la
mecedora, sombrero sobre la cara, "zzz"; "ni te enteraste" (4.19-4.54): la mecedora se balancea y
un cartel "CERRADO" se da vuelta en la puerta. Etiqueta: "DESAFÍO A DUELO" / "VOS: DURMIENDO".

### s02-once (6.57 s) "En este pueblo los duelos no son al mediodía. Son a las once de la noche."
El RELOJ de la torre de la plaza grande (círculo ocre, números romanos mínimos), a pleno sol marca
12:00 en "mediodía" (2.67), con un sello "MEDIODÍA" tachado con X roja en "no son" (1.93-2.23). En
"Son a las once" (3.79-4.60) las agujas giran rápido hacia las 11, el cielo se oscurece (luna
aparece), y "23:00" gigante en Outfit 900 en "noche" (5.49). Etiqueta: "HORA DEL DUELO".

### s03-mensaje (2.02 s) "Hola, ¿tenés en talle M?"
Celular a mitad de pantalla (pergamino sobre tabaco) con hora 23:04 arriba; el globo de la clienta
"Hola, ¿tenés en talle M?" tipeado; al costado, la clienta dibujada en la cama con el celular
iluminándole la cara. Notificación que vibra. Etiqueta: "23:04 · UN MENSAJE".

### s04-se-busca (5.08 s) "Una clienta. Un mensaje. El que contesta primero, se la queda."
El cartel SE BUSCA de papel viejo clavado en una madera: "SE BUSCA" arriba, retrato de la clienta
(en "clienta" 0.15), abajo "RECOMPENSA: UNA VENTA". En "mensaje" (1.46) se clava en el cartel el
globito "¿talle M?". En "contesta primero" (2.69-3.15) dos manos sobre las cartucheras a los lados
(izquierda VOS, derecha ENFRENTE) y un cronómetro de bolsillo ocre que corre. "se la queda"
(4.23): sello rojo "PARA EL MÁS RÁPIDO". Etiqueta: "REGLAS DEL PUEBLO".

### s05-desenfunda (4.81 s) "Sí, reina. Tengo en M, en negro y en verde. ¿Te lo separo?"
El de enfrente desenfunda el CELULAR de la cartuchera como un revólver (0.0-0.4), FOGONAZO en
"Tengo" (1.18) y el globo de respuesta sale disparado: "Sí, reina. Tengo en M." con "23:04" y
dos tildes dibujados en SVG. "negro" (2.18) y "verde" (3.09): dos remeras
dibujadas con cartelito NEGRO y VERDE. "¿Te lo separo?" (3.45): globo chico. Etiqueta "23:04 · AL INSTANTE".

### s06-divino (2.56 s) "¡Divino! Mañana paso."
Globo de la clienta "¡Divino! Mañana paso" sobre la fachada de ENFRENTE; en "paso" (1.43) sello
rojo "VENDIDO" de golpe. La puerta de enfrente hace vaivén (puertas de saloon). Etiqueta "UNA MENOS PARA VOS".

### s07-pulgar (5.66 s) "Y vos, tres días después, desenfundás. Un pulgar para arriba."
Silencio de western: el tumbleweed cruza (ambiente). Calendario de hojas: JUE, VIE, SÁB pasan en
"tres días" (0.86-1.66). En "desenfundás" (2.17) tus manos tiemblan sobre la cartuchera, zoom lento;
en "pulgar" (3.87) sale de la cartuchera un PULGAR PARA ARRIBA gigante dibujado (ridículo), con
un "pfff" de polvo; "arriba" (4.53) globo "visto · hace 3 días". Etiqueta "TU RESPUESTA".

### s08-forastero (3.63 s) "Yo contesto cuando puedo, forastero. Estaba cebando un mate."
VOS de medio cuerpo, sombrero abollado, bigote, ojos entrecerrados haciéndose el duro; en
"forastero" (1.11) "FORASTERO" en Outfit 900 cae al costado; en "mate" (2.68) levanta el mate con
la bombilla y vapor que sube; el termo bajo el brazo. Etiqueta "EXCUSA Nº 1".

### s09-titulo (4.97 s) "El bueno, el malo y el que deja en visto."
Título de película en tres paneles verticales tipo cartel: "EL BUENO" (0.16) silueta de sombrero
limpio, "EL MALO" (1.60) silueta con pañuelo rojo, "Y EL QUE DEJA EN VISTO" (3.04-3.68) vos con
mate + doble tilde gigante. Cada panel entra de golpe con zoom de cine. Etiqueta: "PRÓXIMAMENTE".

### s10-trampa (3.70 s) "¡Es trampa! ¿Cómo desenfunda tan rápido ese tipo?"
Vos enojado señalando a la derecha, sombrero que salta; en "trampa" (0.26) sello rojo "¿TRAMPA?";
en "desenfunda tan rápido" (1.39-2.22) del lado derecho la silueta del de enfrente con líneas de
velocidad y una ráfaga de 3 globos que pasan volando. Etiqueta: "QUEJA FORMAL".

### s11-roncando (3.04 s) "¿Yo? A las once yo estaba roncando, campeón."
GIRO. El de enfrente en una cama de hierro, sombrero sobre la cara, poncho de frazada; "¿Yo?"
(0.0) se levanta el ala del sombrero; reloj chico en la mesa de luz "23:00" en "once" (0.96); en
"roncando" (1.65) "ZZZ" en Outfit 900 que suben. Etiqueta "EL DE ENFRENTE: DURMIENDO".

### s12-agente (6.45 s) "El que tira es mi agente de IA: contesta al instante, con precio y stock, a cualquier hora."
Aparece EL AGENTE DE IA (sheriff con pantalla por cara y estrella ocre "IA") en "agente" (1.05),
con un fogonazo y polvo. En "contesta al instante" (2.28-2.88) dispara con los dos celulares y
salen globos (sin cifras): "PRECIO" y "STOCK: TALLE M" con tilde dibujado, en "precio"
(3.83) y "stock" (4.27). En "a cualquier hora" (5.05-5.66) tres relojitos que caen: 23:04, 03:12,
07:45. Etiqueta "SHERIFF DE GUARDIA".

### s13-moraleja (6.58 s) "Moraleja del oeste: en este pueblo no gana el más guapo. Gana el que contesta."
Atardecer: el sol se agranda. "MORALEJA DEL OESTE" título (0.0-0.84). En "guapo" (3.69) un
vaquero musculoso con pecho inflado aparece y se lo tacha con X roja; en "Gana el que contesta"
(4.56-5.70) una estrella de sheriff ocre gigante con la palabra "CONTESTA" grabada, que gira y
brilla. Etiqueta "FIN".

### s14-scalerics (6.29 s) Orus: "En Scalerics armamos tu agente de IA: contesta en el momento, con tus precios y tu stock, mientras vos dormís."
Cambia la luz (lo ocre se vuelve más claro). TU LOCAL de noche, con tu propio agente-sheriff en
la puerta (estrella con borde VERDE); un celular a un costado con globos que llegan con tildes
VERDES ("¿talle M?" → "Sí, tenemos. ¿Te lo separo?"); en "dormís" (5.36) vos en la mecedora
durmiendo tranquilo, "zzz" verde. Etiqueta "SCALERICS · AGENTES DE IA".

### s15-cta (5.07 s) "Etiquetá al más lento del pueblo."
Cartel SE BUSCA gigante: "SE BUSCA" / retrato vacío con un "@" grande dentro (para que lo
etiqueten) / "EL MÁS LENTO DEL PUEBLO" / "RECOMPENSA: UN PULGAR PARA ARRIBA". Clavado con un
golpe (impact), y el tumbleweed de ambiente que rueda adelante. Queda ~3 s quieto pero respirando.
