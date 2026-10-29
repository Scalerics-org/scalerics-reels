# Reel "La receta": spec de escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Producto de este reel: el
AGENTE DE IA (contesta el WhatsApp del comercio al instante y a cualquier hora, con sus precios y su
stock, toma pedidos, le escribe al que preguntó y no compró, y le pasa la charla al dueño cuando es
para él), nombrado una sola vez, al final. Formato C (lista en pasos) en clave de PROGRAMA DE
COCINA DE TV DEL MEDIODÍA.

Un CHEF de la tele (voz Fenrir, canchero, de programa de mediodía, en vivo) mira a cámara: "¡Hola,
hola! Hoy les enseño la receta infalible para espantar a un cliente. Sale en tres días." Y la
enseña en CINCO PASOS con números gigantes: 1) agarrá un WhatsApp bien fresquito («Hola, ¿hacen
envíos?») y no lo contestes; 2) dejalo reposar en visto, dos días, tapadito; 3) agregale un
«consultá por privado» (aunque ya estaba en privado); 4) espolvoreá un «pasá el lunes»; 5) al
horno, con el local cerrado. "¡Listo! A ver, probá, probá." Una CLIENTA del público (voz Leda)
prueba: "Mmm... Está crudo. Y frío. Me voy a comer al de enfrente." y se va. El chef festeja:
"¡Espantada! Salió perfecta." (aplausos y risas del estudio). GIRO, el chef se pone serio: "Ahora,
en serio. Vos cocinás bárbaro: lo que vendés es bueno de verdad. Lo que se te quema es la atención.
Porque estás solo, con mil ollas en el fuego. ¿Y el secreto de la abuela?" Entra el narrador de
Scalerics (voz Orus): "Un agente de IA que atiende mientras vos cocinás. Contesta tu WhatsApp al
instante, a cualquier hora, con tus precios y tu stock. Toma pedidos, le escribe al que preguntó y
no compró, y te pasa la charla cuando es para vos. Lo hacemos a tu medida. Guardá esta receta.
Para no hacerla nunca."
Voz de 70.5 s (178 palabras, 11 parlamentos en `partes/`), reel de 73.67 s.

## RECURSO VISUAL CENTRAL: el NÚMERO DE PASO GIGANTE y el ZÓCALO DE LA RECETA
Cada paso arranca con su NÚMERO GIGANTE (Lexend 900, ~420px, rojo tomate con contorno azul noche
de 14px y sombra dura azul noche) que cae de arriba con rebote en la palabra "Paso", y con la
palabra "PASO" en mono arriba. El número queda a la izquierda (x 120-420) y el ingrediente del
paso se cocina a la derecha. Abajo, en el frente de la mesada, `ambiente.html` pone el ZÓCALO del
programa: "RECETA DEL DÍA · ESPANTA CLIENTES" y cinco pastillas 1-5 que se pintan (azul noche con número amarillo) en cada
"Paso" (5.84, 12.53, 17.61, 23.15, 26.67). En el giro el título cambia a "EL SECRETO DE LA ABUELA"
(51.66) y en el agente (53.86) las pastillas se van y aparece "AGENTE DE IA" en verde. No pongas
nada tuyo debajo de y 1360 (mesada y zócalo).

## ESTILO: ESTUDIO DE PROGRAMA DE COCINA DE TV. Edición CARGADA.
Pared de AZULEJOS celestes con pastina clara (la pone el fondo del index), oscurecida arriba para
los subtítulos, y la MESADA abajo (tapa crema en y 1360, frente azul noche). `ambiente.html` pone:
el cartel "EN VIVO" rojo con punto que titila (arriba izq., y 96-160), el logo del programa
"COCINA AL MEDIODÍA" (arriba der.) que en "¡Espantada!" (39.26) se cambia por un cartel luminoso
"APLAUSOS" que titila, utensilios colgados de un riel en los bordes (cucharón, espumadera,
batidor, cuchara de madera, x <130 y x >950, y 470-760) que se hamacan, y el zócalo.
Las escenas son DIBUJOS planos de caricatura: contornos azul noche gruesos (6-8px, round), rellenos
planos de la paleta, cosas de cocina (ollas, tapas, frascos, salero, horno, platos, cucharas,
timer de cocina, tarjeta de receta escrita a mano en Caveat), con VAPOR que sube (trazos crema
ondulados). Palabras clave GIGANTES que caen en su palabra (Lexend 900, mayúsculas, contorno
azul noche grueso con `paint-order: stroke fill`). Sacudones, rebotes, nada quieto más de ~0.8 s.
Personajes genéricos dibujados: el CHEF (gorro alto crema, pañuelo rojo al cuello, chaqueta
crema con botones, bigote azul noche, ojos de punto, cachetes rojos), la CLIENTA (cola de caballo
azul noche, saco amarillo), el DUEÑO (delantal rojo, chico, solo entre ollas). Nada de personas,
chefs ni programas reales; WhatsApp solo como burbujas de chat genéricas y tildes, sin logo.

## Paleta (SOLO estos colores)
- Celeste azulejo `#6fbfdb` / pastina `#e8f7fc`: pared, detalles fríos, el "visto".
- Azul noche `#1d2b3a`: contornos, sombras duras, contorno de los textos, frente de mesada.
- Crema `#fff4dc`: chaqueta y gorro del chef, platos, tarjeta de receta, vapor, textos grandes.
- Rojo tomate `#e8432e`: números de paso, ollas, EN VIVO, sellos, lo que está mal.
- Amarillo `#ffc93c`: acento de subtítulos, fuego, chispas, estrellas, lo que está bueno.
- Desde s10 (Scalerics) se suma verde Scalerics `#5ce611` para el agente de IA (el celular que
  contesta, tildes, "AGENTE DE IA").
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos reales, caras de personas
reales, degradés en los dibujos (el brillo de estudio del fondo ya está).

## Tipos de letra
Lexend 700-900 para lo grande (contorno azul noche); IBM Plex Mono 500 para rótulos; Caveat 700
(`assets/fonts/Caveat-var.woff2`) para lo escrito a mano en la tarjeta de receta. Nada que haya
que leer de menos de 26px (lo decorativo chico lleva `data-layout-ignore`).

## Zona
Subtítulos arriba (y 236 a ~430, con contorno azul noche y acento amarillo); EN VIVO y logo del
programa en y 90-180. Contenido de cada escena entre y 560 y 1350, x 130-950 (los bordes son de
los utensilios colgados). Las cosas "apoyadas" en la mesada tienen la base en y ~1350.
Abajo (y 1360+) es del ambiente. Logo de Scalerics en y ~1746. En este estilo NO hay etiqueta
mono verde debajo del dibujo: la reemplazan el zócalo y los textos dentro del dibujo.

## Sonidos extra de este reel
`aplausos` (3.3 s), `risas` (2.8 s), `uuh` (1.9 s), `redoble` (1.3 s), y los de siempre
(`chime` como "ding" del timer y del horno, `pop`, `click`, `whoosh`, `impact-bass-1/2`,
`sparkle`, `notification`, `ping`, `riser`, `glitch-1`).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración de líneas crema con acento verde sobre navy; es el estudio de
> cocina con la paleta de arriba y rellenos planos. Sí valen las reglas técnicas, la
> entrada/salida, el `.sfx.json` y la verificación con snapshot y check.

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

### s01-hola (5.84 s) · el chef saluda y presenta la receta
El CHEF grande al centro detrás de la mesada (x 300-780, y 600-1350), ya dibujado en el cuadro 0
(entra con un rebote desde abajo). "¡Hola, hola!" (0.0-0.17): saluda con la mano (el brazo se
hamaca 3 veces). "receta" (1.74): a la derecha cae una TARJETA DE RECETA crema con chinche roja,
escrita a mano en Caveat: "Receta infalible" / "para espantar un cliente". "espantar" (2.87): sobre
la tarjeta cae el sello rojo gigante "ESPANTAR" (rotado, sacudón). "Sale en tres días" (4.37-4.96):
a la izquierda pop de un TIMER DE COCINA (redondo rojo con perilla) cuya cara dice "3 DÍAS"; la
aguja gira y en "días" hace "ding" (chime), y el chef guiña (un ojo se cierra).

### s02-paso-uno (6.69 s) · un WhatsApp bien fresquito
"Paso" (0.0): cae el número gigante "1" con "PASO". "Agarrá un WhatsApp" (1.09-1.56): a la derecha,
sobre una TABLA DE PICAR de madera amarilla, aparece una BURBUJA DE CHAT crema grande, con la cola
abajo a la izquierda, como si fuera un pescado recién comprado. "fresquito" (2.34): chispas
amarillas y gotitas celestes alrededor (frescura), la burbuja salta. "«Hola, ¿hacen envíos?»" (3.40-
4.08): el texto de la burbuja se escribe ("Hola, ¿hacen envíos?" Lexend 600, 40px, azul noche) y
abajo "11:02" con UN tilde gris. "Y no lo contestes" (5.08-5.47): sello rojo "NO CONTESTAR" cae en
diagonal sobre la tabla; la burbuja tiembla.

### s03-paso-dos (5.31 s) · reposar en visto, tapadito
"Paso" (0.0): número "2". "Dejalo reposar" (1.18): una OLLA roja grande a la derecha (sin tapa);
la burbuja de chat cae adentro (entra desde arriba y desaparece por la boca de la olla). "visto"
(2.26): sobre la olla sube un cartelito con DOS TILDES celestes gigantes (el visto) que hace pop.
"Dos días" (3.17): un timer chico al lado de la olla marca "2 DÍAS" y gira. "tapadito" (4.07): la
TAPA baja y cierra con golpe (click + impact), sacudón, y salen tres hilos de vapor crema por los
costados de la tapa.

### s04-paso-tres (5.54 s) · un «consultá por privado»
"Paso" (0.0): número "3". "Agregale" (0.99): un FRASCO de condimento crema con etiqueta roja que
dice "CONSULTÁ POR PRIVADO" entra inclinado desde la derecha. "«consultá" (1.39): el frasco se
inclina y caen letras/granitos rojos dentro de un BOL azul noche abajo. "privado" (2.27): la
etiqueta se agranda (pop). "Aunque ya estaba en privado" (4.00-4.70): al lado del bol aparece la
burbuja de chat con un candado y al lado, escrito a mano en Caveat amarillo con flecha:
"¡ya estaba en privado!"; el chef no está, solo un "?!" rojo gigante que salta.

### s05-paso-cuatro (3.52 s) · espolvoreá un «pasá el lunes»
"Paso" (0.0): número "4". "Espolvoreá" (1.25): un SALERO gigante crema con tapa roja agujereada
a la derecha, se da vuelta y se sacude (3 sacudidas); caen granitos. "«pasá el lunes»" (1.83-2.61):
del salero caen las palabras "PASÁ" "EL" "LUNES" (Lexend 900 crema con contorno) que rebotan
sobre la mesada; "LUNES" queda grande y rojo, con sacudón.

### s06-paso-cinco (6.95 s) · al horno con el local cerrado
"Y paso cinco" (0.13-0.48): número "5". "al horno" (1.30): HORNO azul noche con puerta de vidrio
celeste a la derecha; la puerta se abre. "con el local cerrado" (1.83-2.82): adentro, en la
bandeja, un LOCALCITO (fachada con toldo rojo y persiana) entra y en "cerrado" le cuelga el cartel
"CERRADO" rojo que se hamaca; la puerta se cierra; la perilla gira y el visor se pone amarillo.
"¡Listo!" (4.16): ding (chime), el número se va y aparece en el centro una BANDEJA con una
CAMPANA crema; la campana se levanta y deja ver el plato humeando (un plato con una burbuja de
chat carbonizada azul noche y humito). "A ver, probá, probá" (4.67-5.88): una CUCHARA de madera
amarilla entra desde la izquierda y se ofrece hacia la derecha dos veces (en cada "probá").

### s07-la-prueba (8.68 s) · la clienta prueba y se va. ¡Espantada!
La CLIENTA del público (x 520-860) con la cuchara en la boca; el plato humeante en la mesada a la
izquierda. "Mmm..." (0.0): sus ojos miran arriba y a la izquierda se escribe gigante "Mmm...". "crudo"
(1.38): cartel rojo "CRUDO" (sello) y la cara se tuerce (boca en zigzag). "frío" (2.70): cartel
celeste "FRÍO" con copitos de nieve y la clienta tiembla. "Me voy a comer al de enfrente" (3.98-
4.70): ella se da vuelta y sale caminando a la derecha (sale de cuadro); aparece una FLECHA de
cartel amarilla "AL DE ENFRENTE" apuntando a la derecha. "¡Espantada!" (5.64): entra el CHEF por
la izquierda saltando con los brazos arriba; sello gigante "¡ESPANTADA!" amarillo con contorno,
rotado, sacudón fuerte (impact + aplausos + risas). "Salió perfecta" (6.46-6.82): el chef besa los
dedos (la mano va a la boca y se abre), estrellitas amarillas.

### s08-en-serio (4.46 s) · GIRO: vos cocinás bárbaro
La luz baja un poco (un velo azul noche 25% en toda la escena). El CHEF en primer plano a la
izquierda, sin la sonrisa (boca recta), con la mano en alto como diciendo "en serio". "Vos cocinás
bárbaro" (0.53-1.52): a la derecha aparece un PLATO lindo y humeante (una torta/tarta amarilla
con frutillas rojas) sobre una base, con tres ESTRELLAS amarillas que hacen pop una a una en
"bárbaro". "bueno de verdad" (3.21-3.57): sello amarillo "BUENO DE VERDAD" cae sobre el plato.

### s09-mil-ollas (4.90 s) · lo que se te quema es la atención
"se te quema" (0.45): una OLLA roja en el centro con etiqueta crema "ATENCIÓN" echa humo azul
noche (nubes de humo que suben y crecen), llamas amarillas abajo que tiemblan. "atención" (1.07):
la etiqueta parpadea. "estás solo" (2.41): el DUEÑO chiquito (delantal rojo) aparece abajo al
centro, con los brazos abiertos, mirando a los costados. "mil ollas en el fuego" (3.17-3.93):
alrededor aparecen de golpe 8 ollitas (de varios tamaños, con fuego) en ráfaga, que tiemblan y
echan vapor; el dueño corre de una a otra (se mueve izquierda-derecha).

### s10-el-secreto (9.46 s) · el secreto de la abuela: un agente de IA
"¿Y el secreto" (0.19): una LATA de recetas vieja (rojo y crema, con florcitas amarillas) en el
centro; la tapa se abre con brillo (sparkle) y sube una TARJETA de receta crema escrita a mano
(Caveat) "El secreto de la abuela". "abuela" (1.05): la tarjeta se da vuelta. "Un agente de IA"
(2.20-2.75): en la tarjeta, sello verde "AGENTE DE IA" (Lexend 900 verde #5ce611 con contorno);
la tarjeta se achica y se va a la izquierda arriba (x 140-420). "atiende mientras vos cocinás"
(3.11-4.02): a la derecha un CELULAR (crema, contorno azul noche, rx 52) con delantal rojo chiquito;
a la izquierda abajo una sartén con fuego (el dueño cocinando). "Contesta tu WhatsApp al instante"
(4.90-5.93): en el celular entra una burbuja del cliente ("¿Tienen para hoy?") y al instante la
respuesta verde ("¡Sí! Te lo reservo.") con doble tilde verde. "a cualquier hora" (6.78-7.20): un
relojito arriba del celular marca "3:00" con una luna amarilla. "con tus precios y tu stock" (7.93-
8.66): chips en el celular "PRECIOS", "STOCK" y "HORARIOS" con tilde verde, de a uno.

### s11-pedidos (5.38 s) · toma pedidos, sigue al que no compró, te pasa la charla
Una TARJETA DE RECETA grande crema (x 150-930, y 600-1300) con título Caveat "Lo que hace el
agente" y tres renglones que se escriben, cada uno con casilla y tilde verde que se dibuja: "Toma
pedidos" (0.11), "Le escribe al que no compró" (1.02-2.20), "Te pasa la charla" (3.20-3.65).
"cuando es para vos" (4.02-4.74): en la esquina, una flecha verde lleva una burbuja al GORRO del
chef chiquito (el que cocina recibe la charla), pop.

### s12-cta (7.17 s) · Guardá esta receta. Para no hacerla nunca.
"Lo hacemos a tu medida" (0.0-0.73): una cinta métrica amarilla se desenrolla abajo con el texto
mono "SCALERICS · A TU MEDIDA" (verde). "Guardá esta receta" (1.62-2.00): la TARJETA DE LA RECETA del principio (ya cayó al
empezar la escena, en "Lo hacemos") ("Receta infalible para espantar un cliente") vuelve y un ÍCONO DE GUARDAR
(marcador/bookmark crema con contorno, genérico) gigante hace pop y se rellena de amarillo.
"Para no hacerla nunca" (2.69-3.36): una línea roja tacha la tarjeta y cae el sello rojo "NUNCA"
con sacudón. Después queda viva: el bookmark late suave, la tarjeta se hamaca, vapor sube, hasta
el final (3 s quieta con movimiento suave).
