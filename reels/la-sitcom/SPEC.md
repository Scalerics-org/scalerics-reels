# Reel "La sitcom": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo: agentes de IA para
comercios). Formato B (diálogo) con forma de SITCOM DE LOS 90: comedia de living con risas
grabadas (mostradas como texto: RISAS, UUUH, AWWW), serie inventada "Dos en el Local" (Friends o
Seinfeld solo como referencia de palabra; nada de su estética, logos ni personajes).
El dueño de una tienda de ropa (cansado, en pijama) convive con su compañero de casa: EL AGENTE
DE IA, un celular simpático con cara, gorra mostaza para atrás y zapatillas naranja.

Guion (cinco voces: dueño Charon, agente Puck, Sofi Leda, Graciela Kore, narrador Orus):
- DUEÑO a cámara (gancho): "Mi compañero de casa atiende a mis clientes mejor que yo. Y a las tres
  de la mañana." (risas) APERTURA "Dos en el Local" con la música (bajo slap, bronces).
- 3:00 AM, living a oscuras. AGENTE (bajito): "¡Hola, Sofi! Sí, la campera verde la tenemos en
  talle M. ¿Te la separo para mañana?" SOFI (en la cama): "¡Sí! ¿Me están contestando a las tres
  de la mañana?" AGENTE: "Acá nunca dormimos. Listo, quedó apartada a tu nombre." (risita)
- DUEÑO (se despierta, chancleta en mano): "¿Quién anda ahí? ¡Hay alguien en el living!"
  AGENTE: "Tranqui, campeón. Esta era fácil: precio, talle y pedido. Volvé a dormir." (RISAS)
- A LA MAÑANA, cocina. Audio de GRACIELA: "Hola, soy Graciela, del colegio. Necesito ochenta
  camperas para la generación. ¿Hablamos?" DUEÑO (taza en mano): "¡Ochenta! ¡Contestale vos, que
  sos rápido!" GIRO, AGENTE: "No, no. Esta es para vos, campeón. Ya le dije que la llamás en cinco
  minutos." (UUUH) DUEÑO: "Pará... ¿me la pasás? ¿No me ibas a dejar sin trabajo?" AGENTE: "Al
  revés: yo atiendo lo fácil a cualquier hora, y lo grande te lo paso a vos." (AWWW) DUEÑO: "Sos
  el mejor compañero de casa que tuve." AGENTE: "Y no me como tus yogures." (RISAS)
- ORUS (se apaga el set): "A ese compañero lo hacemos en Scalerics: un agente de IA que atiende
  con tus precios y tu stock, a cualquier hora, y te pasa lo que es para vos. Etiquetá a tu
  socio: que se entere quién se muda."
189 palabras; voz 70.3 s, reel 73.5 s. Partes en `partes/`: `voces.sh` -> `recortar.sh` ->
`tiempos.sh` -> `pegar.mjs` (atempo y silencios en `conf.mjs`) -> `cortina.mjs` (música y
público, toma los momentos de `partes/inicios.json`; escribe `partes/publico/momentos.json`).
Las escenas se generan con `python3 partes/escenas/gen.py partes/escenas/sNN.py` (piezas en
`partes/escenas/comun.py`).

## Recurso visual central
EL SET DE UNA SITCOM DE LOS 90: el fondo de `armar.mjs` es el living (pared violeta empapelada con
rombos mostaza, moldura, zócalo naranja, piso de madera y alfombra turquesa). Cada escena pone sus
muebles (sillón naranja de tres cuerpos con almohadones turquesa y mostaza, lámpara de pie,
puerta turquesa, ventana con cortinas, heladera crema) y, de noche, un velo violeta oscuro.
La capa `compositions/ambiente.html` pone arriba a la izquierda el logo chico "Dos en el Local"
(letras de colores, desde que termina la apertura) y arriba a la derecha el CARTEL DEL PÚBLICO
que se prende (RISAS / UUUH / AWWW), y en los momentos de risa grabada un GOLPE de texto gigante
abajo (y ~1500) en Luckiest Guy: RISAS (27.76, 57.03), UUUH (42.39), AWWW (51.27); un viñeteado
de tele vieja con scanlines suaves. Se apaga todo en 58.49 (entra Scalerics).
Edición cargada: palabras gigantes que caen con golpe y sacudón, punch-in de cámara, carteles
de colores torcidos, globos de chat.

## Paleta (SOLO estos colores)
- Contorno y noche `#24122f` (trazos 7 px, estilo dibujo animado con relleno plano).
- Violeta `#5b2a86` / `#8a4cc2`: pared, pelo de Sofi, velo.
- Naranja quemado `#d4581f`: sillón, zapatillas, chancleta, cachetes.
- Turquesa `#1fb5a8` (subtítulos `#3fd6c8` para las clientas): pijama, puerta, almohadones.
- Mostaza `#f0b429`: rayas del pijama, gorra, lámpara, carteles, acento del dueño.
- Crema `#fff4e0`: caras, textos, heladera.
- Verde `#5ce611`: SOLO el agente de IA (su pantalla/cara, sus checks, sus globos) y Scalerics.
Acento de subtítulos por quién habla: dueño mostaza, clientas turquesa, agente y Scalerics verde.
Prohibido: emojis, fotos, rayas largas, logos/estética de series reales, la palabra "bot".

## Tipos de letra
Luckiest Guy para carteles, golpes y risas; Fredoka 700 para el título "Dos en el Local";
Lexend 700 para globos; IBM Plex Mono 600 para la hora.

## Zona
Subtítulos arriba (y 236 a ~420). Barra del ambiente y 70-190. Escenas entre y 520 y 1560;
golpes de risa del ambiente en y ~1480-1620; logo en y 1746.

## Base (molde/SPEC-base.md): vale lo técnico; lo visual lo reemplaza este SPEC
(dibujo animado con relleno plano y contorno #24122f en vez de líneas crema; paleta de arriba;
carteles y textos grandes de Luckiest Guy en vez de la etiqueta mono verde).

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


## Escenas (tiempos relativos a cada escena; ver tiempos.md)
- **s01-apertura** (0-8.00): living de día, ventana, lámpara; el DUEÑO en pijama atrás del
  sillón, el AGENTE sentado en el sillón saluda en "compañero" (0.18). "mejor" (2.59): cartel
  mostaza "¡MEJOR QUE YO!" con golpe, el dueño se hunde, el agente parpadea. "tres" (4.35):
  reloj "3:00 AM" con golpe y punch-in. 5.24: APERTURA "Dos en el Local" a pantalla completa
  (violeta con rayos que giran, letras de colores que caen de a una, TEMPORADA 1, dos retratos
  redondos EL DUEÑO / EL AGENTE DE IA).
- **s02-madrugada** (8.00): velo de noche, reloj 3:00, el agente brilla verde en el sillón;
  globo turquesa de Sofi "¿Tenés la campera verde en talle M?"; "Sí" (0.88) globo verde "¡Sí!
  Hay stock."; "campera" (1.36) tarjeta con la campera; "talle M" (2.54) cartel TALLE M;
  "¿Te" (3.0) botón "¿TE LA SEPARO?".
- **s03-sofi** (12.91): Sofi en la cama con el celular que le ilumina la cara; "¡SÍ!" gigante;
  "tres" (2.32) cartel naranja "¿¡A LAS 3 AM!?" sobre la frazada.
- **s04-apartada** (16.76): el agente guiña con el pulgar arriba; "nunca" (0.52) cartel NUNCA
  DORMIMOS; "Listo" (1.83) entra el ticket PEDIDO (campera verde, talle M, a nombre de Sofi);
  "apartada" (2.72) sello verde APARTADA.
- **s05-susto** (20.95): se abre la puerta turquesa, el dueño despeinado con la chancleta en
  alto, "¿QUIÉN ANDA?" gigante; "Hay" (1.13) cartel "¡HAY ALGUIEN!"; punch-in en "living".
- **s06-tranqui** (23.62): dueño con chancleta (sospecha) y el agente tranqui en el sillón;
  tarjeta "ESTA ERA FÁCIL" con checks verdes en precio (2.06), talle (2.36), pedido (2.82);
  "Volvé" (3.18) el dueño se desinfla y salen "Z z z"; 4.14 RISAS (ambiente), el agente se ríe.
- **s07-manana** (29.45): cartel "A LA MAÑANA..."; cocina de día con heladera y mostrador; el
  dueño con la taza humeante, el agente chiquito en el mostrador; audio de WhatsApp de
  Graciela (avatar, onda que se mueve); "ochenta" (2.64) cartel "¡80 CAMPERAS!".
- **s08-ochenta** (35.22): "¡80!" gigante sobre rayos naranja, el dueño con los brazos arriba,
  la taza vuela y salpica; "Contestale" (0.85) cartel; "rápido" (2.45) "¡SOS RÁPIDO!".
- **s09-para-vos** (38.71): GIRO. El agente niega con la cabeza, "¡ESTA ES PARA VOS!" verde;
  "vos, campeón" (1.0) la conversación de Graciela (80 camperas, PEDIDO GRANDE) pasa de la mano
  del agente al dueño; "cinco" (2.91) pastilla "LA LLAMÁS EN 5 MIN"; 3.68 UUUH, punch-in.
- **s10-sin-trabajo** (43.76): primer plano del dueño desconfiado, zoom lento, se oscurece;
  "¿ME LA PASÁS?"; "sin" (2.41) "¿SIN TRABAJO?" naranja.
- **s11-al-reves** (47.49): "¡AL REVÉS!" entra dado vuelta y gira; dos paneles: LO FÁCIL · A
  CUALQUIER HORA (agente, 1.27/1.64) y LO GRANDE · PARA VOS (dueño, 2.73); flecha naranja en
  "paso" (3.37); 3.78 AWWW con corazones.
- **s12-abrazo** (52.67): el dueño emocionado (lágrima) abraza al agente en el sillón; cartel
  "MEJOR COMPAÑERO DE CASA"; corazones.
- **s13-yogures** (55.56): heladera abierta con tres yogures "DUEÑO" y nota "¡NO TOCAR!"; el
  agente guiña; 1.47 RISAS, se ríe.
- **s14-scalerics** (58.49): apagón del set; el agente solo con halo verde; "HECHO POR
  SCALERICS" (1.73), "Tu agente de IA" (2.82); chips Tus precios (4.63), Tu stock (5.18), A
  cualquier hora (5.91), Lo grande, te lo pasa (6.54).
- **s15-cta** (67.61): "ETIQUETÁ / A TU SOCIO", pastilla @tu_socio, caja de MUDANZA
  ("FRÁGIL · AGENTE DE IA"), "¿quién se muda?"; en "muda" (2.15) el agente sale de la caja y
  saluda hasta el final.
