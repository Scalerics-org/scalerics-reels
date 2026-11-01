# Reel "Conferencia de prensa": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el AGENTE DE IA.
Formato P: CONFERENCIA DE PRENSA POST-PARTIDO (la del DT que perdió el clásico; solo nombrada:
garra charrúa, el clásico, el VAR, "el fútbol es así", "dar vuelta la página", "pasá el lunes";
nada de clubes ni personas reales). VALE (periodista joven de "Canal del Barrio", camisa
amarilla, colita, credencial PRENSA, micrófono TV) abre: "Profe, perdiste el clásico contra el de
enfrente. ¿Qué pasó en el minuto noventa?". EL PROFE NÉSTOR (el dueño de Tienda Néstor, de DT:
pelado, bigotazo, campera deportiva azul con franjas celestes, silbato amarillo, cachetes rojos de
bronca) culpa al árbitro ("el fútbol es así... el árbitro no nos dio nada"). EL POCHO (Radio La
Esquina, camisa roja, auriculares celestes, micrófono RADIO) lee el mensaje de la clienta: domingo
a las once, «¿tenés el buzo en talle M?», y nadie le contestó. El Profe: la cancha pesada, el
dólar, "no se puede jugar". Vale: el de enfrente contestó al toque, mandó la foto y la cerró
(¡GOL!). El Profe: "dar vuelta la página, decile que pase el lunes". El Pocho: "¿y el VAR? ¿no
revisaste el celular?". El Profe: "lo tenía en silencio, querido. Era domingo" (mate). La jefa de
prensa: "Última pregunta". GIRO: DON ANÍBAL (periodista veterano: boina, pelo y bigote blancos,
lentes, saco azul, libreta): "garra charrúa no te faltó. Te faltó banco. El de enfrente tiene un
jugador que juega de noche, los domingos, y nunca se lesiona". "¿Y quién es ese fenómeno?" "Un
agente de IA. Le atiende el WhatsApp mientras él duerme." El Profe: "Se terminó la conferencia" y
se va. Cierre con el narrador (Orus): "Ese jugador lo armamos en Scalerics: un agente de IA que
atiende tu WhatsApp a cualquier hora, con tus precios y tu stock, y te pasa la charla cuando es
para vos. Mandáselo al que siempre le echa la culpa al árbitro."
Voces (partes/voces.sh, partes/componer.mjs): Vale Leda, el Profe Puck, el Pocho Fenrir, jefa de
prensa Kore, don Aníbal Charon, narrador Orus. Voz de 65.7 s, reel de 68.93 s.

## Recurso visual central
UNA SALA DE PRENSA DE FÚTBOL: de fondo, el PANEL DE SPONSORS genéricos inventados repetido en
grilla (Yerba La Gaucha, Fideos Don Tito, Bizcochos Doña Rosa, Seguros El Paraguas, Pinturas Sol de
Mayo, Banco del Barrio; fijo en `armar.mjs`, opacity 0.16); en `compositions/ambiente.html`: la
PLACA "CONFERENCIA DE PRENSA · EN VIVO / Néstor 0 · 1 Enfrente" arriba (y 54-194), la MESA de la
conferencia (tapa hueso en y 1340, faldón azul con "CLÁSICO DEL BARRIO · FECHA 1" y los
sponsors) con cuatro MICRÓFONOS de cubo (TV, AM, FM, WEB) que asoman sobre la mesa, el ZÓCALO de
quién habla sobre el faldón (y 1430) y los FLASHES de los fotógrafos (blanco + destellos). Cuando
entra Scalerics (55.84 s) se van la placa y la mesa y queda el panel.
Los personajes de la conferencia son bustos (SVG 460x640) puestos en top 780: la mesa los tapa de
la cintura para abajo. Lo que tiene que leerse no baja de y ~1250 (ahí asoman los micrófonos).

## Paleta (manda sobre SPEC-base)
- Tinta azul noche `#0d1424` (contornos de 6, sombras duras), azul panel `#1b3a6b`, celeste
  `#6cc4ff`, hueso `#f4f1e8` (piel y papeles), amarillo flash `#ffd447`, rojo tarjeta `#e63946`.
- Subtítulos: hueso con sombra tinta; acento por voz: periodistas y jefa celeste, el Profe
  amarillo, don Aníbal naranja `#ff9f6b`, Scalerics verde `#5ce611`.
- El verde `#5ce611` solo aparece en el cierre de Scalerics (s14, s15).
- Textos grandes: Lexend 900 en mayúsculas con borde tinta de 12 y sombra dura (`.big`), sellos
  con borde grueso (`.sello`). Todo con trazo, nada de degradés ni glow.

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


Las escenas se generan con Python: `partes/escenas/base.py` (personajes, objetos, CSS y helpers
comunes) y un `sNN.py` por escena (`python3 partes/escenas/sNN.py` desde la carpeta del reel). El
ambiente sale de `partes/ambiente.py`.

## Escenas (tiempos en tiempos.md)
- s01-perdiste (0-5.85): el Profe sentado, sudando; entra el micrófono TV de Vale desde la
  izquierda. "PERDISTE" cae en perdiste, "EL CLÁSICO" en clásico; en "enfrente" le caen las gotas.
  En "¿qué pasó?" el Profe se corre a la izquierda y en "minuto" aparece el cartel del cuarto
  árbitro "MINUTO 90'", que late en noventa.
- s02-arbitro (5.85-10.11): "EL FÚTBOL ES ASÍ" y el Profe se encoge de hombros en así; en
  árbitro entra desde la derecha el brazo del árbitro con la ROJA y el Profe lo señala; sello
  "NADA" en nada.
- s03-mensaje (10.11-16.33): el Pocho a la izquierda, el celular de Tienda Néstor a la derecha
  ("últ. vez: sáb 13:02"). "DOM 23:00" en domingo; el mensaje «¿tenés el buzo en talle M?» en
  tenés; "entregado"; en "nadie": "cri... cri..." y sello "SIN RESPUESTA" en contestó.
- s04-cancha (16.33-21.29): el Profe con las excusas: pizarra de cancha con charcos ("CANCHA
  PESADA") en cancha/pesada; billete US$ con la flecha roja que sube ("EL DÓLAR") en dólar; sello
  "¡NO SE PUEDE JUGAR!" en jugar, brazos arriba.
- s05-al-toque (21.29-25.78): Vale a la izquierda; el celular rojo de "EL DE ENFRENTE": la
  respuesta "¡Sí! Te mando foto" en toque, la foto del buzo en foto, "¡Me lo llevo!" y "¡GOL!"
  gigante en cerró.
- s06-pagina (25.78-29.59): el cuaderno del "0-1" da vuelta la hoja en vuelta; en "pase el lunes"
  cae el cartel colgante "CERRADO · PASÁ EL LUNES" que se balancea; el Profe hace "chau" con la mano.
- s07-var (29.59-32.37): la pantalla del VAR se prende ("VAR", "REVISANDO..." titila); adentro un
  celular con "1 mensaje nuevo · clienta · dom 23:00"; zoom en celular. Micrófono RADIO abajo.
- s08-silencio (32.37-35.49): campana tachada en silencio, "querido" entre comillas, el mate y el
  termo en "era domingo" y sello "ERA DOMINGO".
- s09-veterano (35.49-41.52): cartel "ÚLTIMA PREGUNTA" (la jefa); se para don Aníbal desde abajo;
  "GARRA: DE SOBRA" en garra charrúa; dedo arriba y "TE FALTÓ / BANCO" en te faltó banco.
- s10-jugador (41.52-46.84): el jugador misterioso bajo el foco: un celular con piernas, camiseta
  12 y un "?" en la pantalla (silueta); patea en juega; luna "DE NOCHE", calendario "DOM ·
  DOMINGOS", cruz médica tachada "CERO LESIONES".
- s11-fenomeno (46.84-48.67): primer plano del Profe, desconcertado, "¿FENÓMENO?".
- s12-agente (48.67-53.42): se prende el jugador (celeste, carita feliz), "UN AGENTE DE IA";
  globos de WhatsApp en atiende/WhatsApp; el de enfrente durmiendo con gorro y "Z z z" en duerme.
- s13-se-termino (53.42-56.03): sello "SE TERMINÓ", el Profe se para, revolea las hojas y se va;
  flashes.
- s14-scalerics (56.03-63.74): tablero luminoso de CAMBIO: SALE "el visto" (rojo) / ENTRA "tu
  agente de IA" (verde) en armamos; en agente sube el celular de Tienda Néstor con el agente:
  la pregunta del buzo, "¡Sí! En azul y en gris. ¿Te lo reservo?", chips "24 HORAS", "PRECIOS",
  "STOCK", "Reservado a tu nombre" y la tarjeta "Te paso con Néstor" en pasa la charla.
- s15-cta (63.74-68.93): "MANDÁSELO / AL QUE SIEMPRE / LE ECHA LA CULPA / AL ÁRBITRO" y la caja
  "ENVIAR A: el que culpa al árbitro" que se escribe sola y se manda; tarjetas amarilla y roja y
  el silbato.
