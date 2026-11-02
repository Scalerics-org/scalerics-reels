# Reel "El guardavidas": spec

Reel vertical 1080x1920 de Scalerics. Tema: AGENTE DE IA, ángulo ATENDER AL INSTANTE Y A CUALQUIER HORA (el
cliente que pregunta y queda en visto). Formato P: PERSONAJE DE LA CULTURA POPULAR, una SERIE DE GUARDAVIDAS
de los noventa (inventada: "Guardavidas de la Rambla"; la referencia "Guardianes de la Bahía" solo se nombra,
sin logos ni caras). El GUARDAVIDAS canchero (voz Fenrir) abre en la cara del que mira: "Bandera roja. Hay
una clienta ahogándose en tu WhatsApp. Y vos, tomando mate." Presenta la serie ("como Guardianes de la
Bahía, pero con termo y bizcochos"), ve con prismáticos a la CLIENTA en el agua (voz Leda): "Hola, ¿tienen
el vestido azul en talle M?". "Tranquilo, está en la orilla. Con un mensaje la sacás." Ella: "¿Hola? ¿Hay
alguien?" "¡Visto! ¡La dejaron en visto! ¡Se la lleva la corriente!" El DUEÑO en la reposera (voz Charon):
"Estoy en la reposera, loco. Mañana le contesto." "¿Mañana? ¡Mañana ya la rescató el de enfrente!" Ella:
"Bueno... lo compro en otro lado." GIRO (el guardavidas se pone serio y humano): "Pero no te culpo. Nadie
puede vigilar el agua todo el día. Ni yo: a las ocho me bajo de la torre." Entra Scalerics (Orus): "Por eso
en Scalerics hacemos agentes de IA: un guardavidas que nunca se baja de la torre." De noche (03:12), el
AGENTE (voz Kore) le contesta a la clienta: "¡Hola! Sí, del azul en M nos queda uno. ¿Te lo reservo?"
"¡Ay, me salvaron! Sí, porfa." El agente al dueño: "Atiendo al instante, a cualquier hora, con tus precios,
tu stock y tus horarios. Y cuando es para vos, te paso la conversación." Dueño: "¿Y yo qué hago?"
Guardavidas: "Vos, cebá otro mate. ¡Bandera verde!" CTA (Orus): "Mandáselo al que tiene la bandera roja
puesta desde marzo."
Voz armada por partes (partes/voces.sh -> partes/tiempos.sh -> partes/componer.mjs; atempo 1.24
guardavidas, 1.12 clienta y Orus, 1.1 dueño, 1.22 agente): 67.6 s; reel 70.8 s.

## RECURSO VISUAL CENTRAL
La BANDERA de la playa: roja en el gancho (gigante, flameando), en el widget de abajo a la derecha todo el
reel ("BANDERA ROJA"), y pasa a VERDE cuando entra el agente y en "¡Bandera verde!". El SALVAVIDAS es el
mensaje: el guardavidas lo tira ("con un mensaje la sacás"), el de enfrente la rescata con el suyo, y el
agente le tira uno VERDE. La HORA arriba a la derecha cuenta el giro: 15:40, 20:00 (se baja de la torre),
03:12 (el agente atiende de noche) y 15:41.

## ESTILO: PLAYA URUGUAYA DE VERANO (serie de TV de guardavidas)
Fondo en armar.mjs: cielo celeste, sol amarillo arriba a la derecha, nubes crema, mar turquesa desde el
horizonte (y 840) con franjas de olas, orilla de espuma y arena con granitos desde y 1290. El timeline
"main" (en armar.mjs) pone la capa de TARDE (naranja) en "ocho", la de NOCHE (azul con luna) en
"Scalerics" y vuelve al día en "Atiendo". ambiente.html: arriba a la izquierda el "bug" rojo de la serie
(salvavidas + GUARDAVIDAS DE LA RAMBLA · LA SERIE · EN VIVO; desde "Scalerics" fondo tinta, borde verde y
CON AGENTE DE IA · SIN HORARIO); a la derecha la hora · PLAYA WHATSAPP; abajo a la izquierda la chapa de
quién habla (EL GUARDAVIDAS amarillo · LA CLIENTA turquesa claro · EL DUEÑO rojo claro · EL AGENTE DE IA
verde · SCALERICS verde); abajo a la derecha el widget BANDERA ROJA (pasa a VERDE en "¡Bandera verde!");
"CLIENTA PERDIDA" en rojo desde "Bueno..." hasta "Scalerics"; viñeta; flash crema en "Scalerics" y en
"verde".
Personajes planos con contorno tinta grueso (stroke 6-9), piezas en `assets/playa.js` (window.PL):
guardavidas (jopo rubio, lentes espejados, protector blanco en la nariz, musculosa roja con cruz crema y
GUARDAVIDAS en amarillo, silbato amarillo; caras canchero/grito/enojado/serio/feliz; brazos señala/arriba/
prismáticos), clienta (en el agua hasta los hombros, malla rosada, cola de pelo; caras feliz/duda/
asustada/triste/aliviada; mano celular/auxilio/chau), dueño (en reposera a rayas, sombrero de paja, camisa
amarilla de lunares rojos, bigote, mate y termo; caras dormido/desganado/unojo), torre amarilla con techo
rojo, bandera, salvavidas, olas, mate, termo, agente de IA (celular con cara verde, visera roja y
silbato), celular con chat y globos con hora y tildes.

## Paleta (SOLO estos)
- Celeste cielo `#8fd6f0` (claro `#c9eef8`).
- Turquesa mar `#1aa6b7` (claro `#7fe0e6`, oscuro `#0b6e7a`).
- Arena `#f2d49b` (sombra `#d9b36c`).
- Rojo bandera `#e5484d` (claro `#ff9a8a`): banderas, musculosa, sellos, alertas.
- Amarillo torre `#ffc93c` (oscuro `#e0a400`): torre, jopo, títulos, tags.
- Tinta `#10202b` y crema `#fff6e3`. Piel (solo personajes).
- Solo desde s10 (Scalerics) se suma verde `#5ce611` (oscuro `#3f9e0b`): agente, salvavidas del agente,
  bandera verde.
Subtítulos: crema con contorno tinta; acento amarillo (guardavidas), turquesa claro (clienta), rojo claro
(dueño), verde (agente y Scalerics).
Prohibido: emojis, fotos, rayas largas, logos reales (WhatsApp solo como texto), marcas reales, caras de la
serie real.

## Tipos de letra
Lexend 900 (títulos), Lexend 600-800 (chat, globos), IBM Plex Mono 600 (tags, chapas), Black Ops One
(sellos, carteles), Caveat (notas a mano: "¡auxilio!", "mañana le contesto", "¿?").

## Zona
Bug y hora en y 70-192. Subtítulos arriba (y 236-420). Contenido entre y 560 y 1540. Chapa y bandera en y
1572-1672 y logo en y 1746: no taparlos.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba (acá
> no es ilustración crema con acento verde: es la playa de verano con la paleta de arriba). Sí valen las
> reglas técnicas.

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



## Escenas (tiempos relativos en tiempos.md)
**s01-bandera** (3.66). Bandera roja gigante flameando a la izquierda, mar con olas que corren; de la
clienta solo se ve la mano en alto saliendo del agua (cuadro 0 ya armado). En "roja" (0.56) sello "BANDERA
ROJA" con sacudón. En "clienta" (1.69) asoma asustada con la mano de auxilio; en "ahogándose" (1.94) se
hunde y sube tres veces. En "WhatsApp" (2.82) globos de chat flotando ("¿Hola?", "¿Talle M?", "¿Hay
alguien?") y tag rojo "EN TU WHATSAPP".
**s02-mate** (2.00). El dueño dormido en la reposera bajo la sombrilla roja, con lentes, zzz; atrás, lejos,
la clienta pide auxilio ("¡auxilio!" en Caveat). En "tomando" (0.63) se lleva el mate a la boca; en "mate"
(0.94) tag "Y VOS: TOMANDO MATE".
**s03-programa** (5.85). Apertura de la serie: rayos amarillos que giran detrás del guardavidas canchero.
En "Guardavidas" (0.80) el cartel rojo "GUARDAVIDAS · DE LA RAMBLA · LA SERIE". En "Como" (2.47) "CÁMARA
LENTA" titila, sube despacito y brilla. En "termo" (4.27) entra el termo; en "bizcochos" (4.67) la bolsa
de bizcochos.
**s04-prismaticos** (5.32). El guardavidas con prismáticos y tag "ATENCIÓN, TORRE". En "clienta" (0.80) la
vista de los prismáticos (dos círculos) barre el mar y la encuentra con el celular en alto. En "Hola"
(2.67) su globo "Hola, ¿tienen el vestido azul en talle M?" (15:40); en "vestido" (3.56) el vestido azul
con la etiqueta M.
**s05-orilla** (3.42). El guardavidas señala a la clienta, cerca de la orilla (arena en diagonal). En
"orilla" (1.05) tag "EN LA ORILLA" y una cota de distancia corta; en "mensaje" (1.94) tira el salvavidas,
que cae al lado de ella; en "sacás" (2.50) tag verde "UN MENSAJE Y LISTO".
**s06-visto** (5.25). Celular grande con el chat de la tienda ("en la reposera"): la pregunta (15:40),
"¿Hola?" (16:52) y en "¿Hay" (0.66) "¿Hay alguien?" (19:15). En "Visto" (1.65) las tildes se ponen azules,
tilde doble gigante y sello "¡VISTO!" con sacudón. En "Se la lleva" (3.27) suben las olas y la corriente se
lleva el celular a la derecha; en "corriente" (4.15) flechas de corriente y tag "SE LA LLEVA LA CORRIENTE".
**s07-reposera** (3.69). El dueño desganado en la reposera con el celular boca abajo en la panza (vibra);
tag "MODO REPOSERA" en "reposera" (0.36). En "Mañana" (2.01) cartel de pendientes "mañana le contesto" en
Caveat; zzz en "contesto".
**s08-enfrente** (5.30). El guardavidas gritando, sello "¿MAÑANA?". Atrás, la torre "ENFRENTE" con bandera
verde: en "rescató" (1.53) le tiran una soga y un salvavidas a la clienta; en "enfrente" (2.09) se la llevan
para su torre y tag "LA RESCATÓ ENFRENTE". En "Bueno" (3.14) su globo "Bueno... lo compro en otro lado." y en
"otro" (4.29) se va nadando. El ambiente marca "CLIENTA PERDIDA".
**s09-torre** (5.59). GIRO. El guardavidas serio, sin lentes, junto a su torre. En "Nadie" (1.01) un reloj;
"todo el día": las agujas vuelan. En "ocho" (3.96) se hace la tarde y sello "HASTA LAS 20" en la torre; en
"bajo" (4.20) se va de cuadro; en "torre" (4.60) tag "TORRE VACÍA".
**s10-agente** (6.45). De noche (03:12, luna). Flash. En "Scalerics" (0.69) aparece en la torre el agente de
IA (celular con cara verde y visera roja), con chispas; el reflector barre el mar. Título verde "AGENTE DE
IA" en "agentes" (2.03); parpadea; saluda en "guardavidas" (3.55); tag verde "NUNCA SE BAJA DE LA TORRE"
en "nunca" (4.62).
**s11-rescate** (6.52). De noche. El agente en la orilla tira un salvavidas VERDE que cae alrededor de la
clienta; sus globos verdes "¡Hola! Sí, del azul en M nos queda uno." (0) y "¿Te lo reservo?" (3.27) a las
03:12. En "Ay" (4.18) la clienta aliviada: "¡Ay, me salvaron! Sí, porfa."; sello verde "¡RESCATADA!" en
"salvaron" (4.62).
**s12-explica** (7.81). De día otra vez (15:41). El agente habla; a la izquierda entran tags verdes en su
palabra: AL INSTANTE (0.57), A CUALQUIER HORA (1.48), TUS PRECIOS (2.71), TU STOCK (3.36), TUS HORARIOS
(4.10). En "Y cuando" (4.86) se van y aparece el dueño en la reposera; en "paso" (6.31) el agente le tira
el celular con el chat y tag "TE PASA LA CONVERSACIÓN".
**s13-verde** (3.75). El dueño con un ojo abierto, "¿?" en "hago" (0.37). Entra el guardavidas feliz con
el puño en alto en "Vos" (1.22); el dueño toma mate en "mate" (1.62); en "Bandera" (2.29) sube la bandera
verde flameando y en "verde" (2.67) sello verde "¡BANDERA VERDE!" (el widget pasa a VERDE).
**s14-cta** (6.15). "MANDÁSELO" amarillo gigante; a la izquierda una bandera roja desteñida; a la derecha
"al que tiene / la bandera roja (rojo) / puesta desde" entrando en sus palabras y "MARZO" como sello en
"marzo" (2.41), con una hoja de almanaque "MARZO 1" colgada del palo y una telaraña que se dibuja en la
bandera; tag "ENVIÁSELO · ETIQUETALO".
