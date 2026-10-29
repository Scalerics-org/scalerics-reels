# Reel "Hábitat natural": spec de las escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto: el AGENTE DE IA
(atiende WhatsApp a cualquier hora con tus precios y stock, agenda turnos, le escribe al que
preguntó y no compró), nombrado una sola vez por el narrador de Scalerics al final. Formato P
(personaje de la cultura popular): un DOCUMENTAL DE NATURALEZA de la tele, con narrador
susurrante y fascinado que observa al comerciante como a un animal.

EL NARRADOR DEL DOCUMENTAL (Algenib, grave, susurra): "Observen al comerciante uruguayo en su
hábitat natural. Está a punto de perder a su presa." El ejemplar macho acecha detrás del
mostrador; el celular vibra; un cliente se acerca al abrevadero y pregunta el precio; el ejemplar
lo mira y lo deja en visto, "una técnica ancestral". EL CAMARÓGRAFO (Puck, susurra nervioso):
"¿No lo vamos a ayudar?" "Nunca intervenimos." Horas después el ejemplar emite su llamado: EL
COMERCIANTE (Charon, desganado): "Pasá el lunes." La presa huye hacia la manada del de enfrente,
donde una especie más evolucionada la atrapa en segundos. "Pobre bicho." GIRO: "Este ejemplar no
es lento: está solo. Atiende el mostrador, la caja, los proveedores y el celular. Y la naturaleza
no perdona." "¿Y el de enfrente cómo hace?" "Tiene un agente de IA" (y lo que hace). "¿Y si le
pasamos el dato?" "Nunca intervenimos. Bueno. Esta vez, sí." ORUS (Scalerics): "Ese agente de IA
lo hacemos nosotros, en Scalerics. Etiquetá al ejemplar que deja en visto."
Voz de 72.8 s, reel de 75.97 s. Voces: `partes/voces.sh`, `partes/recortar.sh`,
`partes/tiempos.sh`, `partes/componer.mjs` (atempo 1.17 al narrador; tiempos corregidos a mano
con silencedetect en `FIX`).

## RECURSO VISUAL CENTRAL: la LÁMINA DEL CUADERNO DE CAMPO
Todo pasa sobre una hoja de cuaderno de naturalista (la pone `ambiente.html`: papel crema con
manchas ocre y cuadrícula sepia, x 50-1030, y 516-1526, con cintas en las esquinas, cabecera
"CUADERNO DE CAMPO · LÁMINA VII" en y 538 y una firma "obs. en Montevideo" abajo a la derecha en
y ~1452). Las escenas DIBUJAN en tinta sepia sobre esa hoja, con manchas de ACUARELA (formas de
relleno suave con opacidad 0.5-0.8 y bordes irregulares) y RÓTULOS EN LATÍN DE BROMA en letra
manuscrita (Caveat 700) con flechas a mano: "Comercians uruguayensis", "Vistus perpetuus",
"Clientis fugax", "Agentis intelligens"... Recursos de documental: el VISOR DE LA CÁMARA (las
esquinas, "REC" titilando y el contador ya están en el ambiente, arriba de los subtítulos), la
MIRA (círculo con cruz) que se clava en el ejemplar, la VIÑETA DE PRISMÁTICOS (dos círculos
recortando la hoja), sellos de "ESPÉCIMEN".

## ESTILO: LÁMINA DE NATURALISTA. Edición cargada pero elegante.
Trazos sepia `#4a2f1a` de 5-6 px que se dibujan solos (`dibujar()`), rellenos de acuarela que
aparecen con un fade (opacity + scale 0.96→1), rótulos Caveat que se escriben (clip-path de
izquierda a derecha, helper `escribir()`), flechas que se dibujan. Golpes: sellos rojo lacre que
caen torcidos, sacudón suave. Nada quieto más de ~0.8 s (respiración, hojas, mira que tiembla).

## Personajes (siempre los mismos, dibujados genéricos)
- **El ejemplar (el comerciante)**: hombre de unos 50, cabeza redonda con relleno ocre suave,
  bigote sepia grueso, pelo ralo (tres rayas), delantal crema con bolsillo, cejas caídas. Detrás
  de un MOSTRADOR (rectángulo sepia con vetas de madera ocre). Su celular: rectángulo sepia
  chico.
- **La presa (el cliente)**: figura delgada con relleno verde selva, bolsa de compras ocre, y
  dos orejitas de gacela (chiste visual). Rótulo "Clientis fugax".
- **El camarógrafo**: escondido detrás de un ARBUSTO de acuarela verde; solo se le ven los ojos
  (dos puntos) y una cámara de cine sepia con lente.
- **El de enfrente**: otro local dibujado (toldo rayado verde selva) con un celular que brilla
  verde Scalerics: la "especie más evolucionada" ("Agentis intelligens").

## Paleta (SOLO estos colores)
- Selva de noche `#17251a` (fondo, ya está) y verde selva acuarela `#4f8a3c` (hojas, arbusto,
  presa).
- Papel crema `#f1e6c8` y ocre `#d6a85a` (manchas, madera, piel, cintas; acento de subtítulos
  `#e2b25a`).
- Tinta sepia `#4a2f1a`: todos los trazos y la letra.
- Rojo lacre `#b8432f`: lo malo (el visto, "PASÁ EL LUNES", tachones, sellos, la presa que huye).
- Desde s10 (el agente) se suma verde Scalerics `#5ce611` SOLO para el agente de IA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales (WhatsApp solo como
burbujas genéricas y tildes), caras de personas reales.

## Tipos de letra
Caveat 700 (rótulos manuscritos, 48-84px), Lexend 800-900 para palabras grandes impresas (sellos),
IBM Plex Mono 500 para rótulos técnicos ("ESPÉCIMEN Nº 1", ≥26px).

## Zona
Subtítulos arriba (y 236 a ~420, crema con acento ocre). Visor/REC en y 100-150. Contenido de
cada escena SOBRE LA HOJA: x 90-990, y 600-1430 (y 538 es la cabecera del cuaderno, y 1452 la
firma). Nada debajo de y 1500 (helechos y logo en y ~1746).

## Sonidos extra de este reel
`flash` (obturador, 0.29 s), `tic` (0.1 s), `drama` (golpe dramático, 3 s: usar `max`), y los de
siempre (`pop`, `click`, `whoosh`, `notification`, `ping`, `chime`, `sparkle`, `impact-bass-1/2`,
`glitch-1`, `typing`, `riser`).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema con acento verde; es la lámina de naturalista con la
> paleta de arriba. Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la
> verificación.

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



## Escenas (tiempos relativos a cada escena: ver `tiempos.md`)

**s01-habitat (6.03 s).** Cuadro 0: el ejemplar ya está a medio dibujar detrás del mostrador
(centro, y 760-1300). "Observen" (0.0): la MIRA (círculo + cruz, rojo lacre) entra temblando y se
clava en su cabeza. "comerciante uruguayo" (0.60-1.11): rótulo Caveat "Comercians uruguayensis"
con flecha hacia él (arriba a la izquierda, y ~640). "hábitat natural" (2.05-2.48): alrededor se
dibujan el hábitat: estantes con frascos, una lamparita colgando, el cartel de "ABIERTO". "perder
a su presa" (4.36-4.96): sello rojo lacre "ESPÉCIMEN EN PELIGRO" cae torcido abajo. Flash al
entrar la mira, impacto en "presa".

**s02-ejemplar (6.18 s).** VIÑETA DE PRISMÁTICOS: dos círculos que recortan al ejemplar (el resto
de la hoja oscuro). "ejemplar macho" (0.08-0.60): rótulo "ejemplar macho, adulto" con
flecha. "acecha" (1.35): el ejemplar entrecierra los ojos y se
agacha un poco. "mostrador" (2.39): rótulo "Mostradorus vulgaris". "Silencio" (3.45): todo se
quieta, solo tiemblan las hojas; rótulo chico "shhh". "celular vibra" (4.74-4.96): el celular en
el mostrador vibra (rayitas de vibración, sacudón chico). Sonido: notification en "vibra".

**s03-abrevadero (4.50 s).** Se ve EL ABREVADERO: un charco de acuarela que es la pantalla del
celular gigante acostado (forma de celular). "cliente" (0.08): entra la PRESA (figura verde con
orejitas de gacela y bolsa) desde la izquierda, en puntas de pie. "acerca al abrevadero"
(1.02-1.70): se agacha a "beber"; rótulo "Clientis fugax". "Pregunta el precio" (2.90-3.58): de
la presa sale una burbuja de chat "¿precio?" que cae en el abrevadero (ondas). Pop en la burbuja.

**s04-visto (5.41 s).** Primer plano del celular del ejemplar (sepia, y 640-1300) con la burbuja
"¿precio?". "lo mira" (0.77): ojos grandes del ejemplar asoman arriba del celular. "visto"
(2.13): aparecen DOS TILDES rojo lacre gigantes, sello "VISTO" y rótulo "Vistus perpetuus".
"técnica ancestral" (3.52-3.93): pintura rupestre (estilo cueva, ocre) de un hombrecito con un
celular y dos tildes; rótulo "técnica ancestral, c. 2010". Drama en "visto".

**s05-intervenimos (3.23 s).** EL CAMARÓGRAFO detrás del arbusto (cámara asomando, ojos).
"¿No lo vamos a ayudar?" (0.0-0.66): el arbusto tiembla, burbuja manuscrita. "Nunca
intervenimos" (1.49-1.92): una página de "REGLAMENTO DEL DOCUMENTAL" con "Regla 1: Nunca
intervenimos." subrayada dos veces.

**s06-llamado (4.64 s).** Reloj de sol / reloj de bolsillo sepia avanza con un barrido (tic tic)
en "Horas después" (0-0.25). "emite su llamado" (1.45-2.30): el ejemplar abre la boca, ondas
sonoras como de animal (arcos que salen). "Pasá el lunes" (3.25-3.55): sale el grito como texto
gigante Lexend 900 rojo lacre "PASÁ EL LUNES" con sacudón; rótulo "llamado de apareamiento: no".

**s07-huye (8.48 s).** MAPA DEL TERRITORIO: dos locales dibujados (el del ejemplar a la
izquierda, el "de enfrente" a la derecha, toldo verde) y la presa al medio. "huye" (0.43): la
presa corre hacia la derecha dejando una línea punteada roja de huellitas. "manada del de
enfrente" (1.28-1.96): alrededor del de enfrente aparecen tres siluetas verdes (la manada).
"especie más evolucionada" (3.85-4.44): el local de enfrente se marca con un círculo y rótulo
"especie más evolucionada"; su celular brilla. "atrapa en segundos" (5.30-5.90): la presa entra
al local (flash) y aparece un "¡zas!" manuscrito. "Pobre bicho" (7.05): una lágrima y el arbusto
del camarógrafo asoma abajo a la izquierda.

**s08-no-es-lento (4.72 s).** El GIRO. "Pero no se confundan" (0-0.51): la hoja "se da vuelta"
(se raya todo con un trazo y aparece limpio). "no es lento" (2.45-2.82): un dibujo de un
CARACOL con la cara del ejemplar (bigote) se tacha en rojo. "está solo" (3.57-3.84): el ejemplar
solito en el medio de la hoja vacía, chiquito; rótulo "ejemplar solitario".

**s09-solo (6.68 s).** El ejemplar con CUATRO BRAZOS (como un pulpo): en cada palabra aparece un
objeto en una mano: "mostrador" (0.51) una bolsa de pan, "caja" (1.56) la caja registradora,
"proveedores" (2.46) un cajón de mercadería, "celular" (3.62) el celular que vibra. Cada uno con
su rótulo chico. "naturaleza no perdona" (4.69-5.79): cae sello rojo "LA NATURALEZA NO PERDONA"
con sacudón y todo se desordena un poco.

**s10-enfrente (3.11 s).** "¿Y el de enfrente cómo hace?" (0-0.86): los prismáticos giran a la
derecha: el local de enfrente con toldo verde. "agente de IA" (1.90-2.50): adentro, un celular
que se ilumina en verde Scalerics con un pequeño personaje-agente (círculo con dos ojitos); rótulo
"Agentis intelligens" con flecha. Chime en "IA".

**s11-agente (7.34 s).** Lámina de ANATOMÍA del agente: el celular grande al centro (pantalla
oscura sepia con UI verde) y cuatro anotaciones con flecha que se escriben en cada palabra:
"WhatsApp a cualquier hora" (0.59-1.62: luna y sol que giran arriba), "precios y stock"
(2.47-2.98: burbuja de respuesta con precio), "agenda turnos" (3.82-4.09: calendario chico con un
tilde verde), "le escribe al que preguntó" (5.32-5.63: burbuja saliente "¿Te lo guardo?") y "no
compró" (6.49). Pops y pings.

**s12-el-dato (6.34 s).** El camarógrafo asoma del arbusto con un papelito ("el dato"). "Nunca
intervenimos" (2.14-2.48): la regla de la página de reglamento vuelve. "Bueno" (3.93): la regla
se tacha. "Esta vez, sí" (4.68-5.23): el camarógrafo tira el papelito con la flecha al ejemplar,
que lo agarra; al ejemplar se le prende una lamparita. Sparkle en "sí".

**s13-cta (9.31 s).** Corte a Scalerics. La lámina se cierra en una FICHA DE ESPECIE nueva:
"Ese agente de IA" (0-0.77) un celular verde Scalerics con el agente. "Scalerics" (2.73): rótulo
grande Lexend "SCALERICS" sobre la ficha. "Etiquetá al ejemplar que deja en visto" (3.95-5.43):
un rótulo de museo / etiqueta colgante (cartoncito con hilo) que dice "ETIQUETÁ AL EJEMPLAR QUE
DEJA EN VISTO" con un @ manuscrito, y unas tildes rojas que se tachan. Queda quieto ~3 s
respirando.
