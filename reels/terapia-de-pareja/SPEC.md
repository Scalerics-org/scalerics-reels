# Reel "Terapia de pareja": spec de las escenas

Reel vertical 1080x1920 de Scalerics. Formato B (DIÁLOGO de tres voces) en un CONSULTORIO DE TERAPIA
DE PAREJA: la clienta (Flor, voz Leda) y el comercio (el dueño, voz Charon) van a terapia; la
terapeuta (voz Kore, calma e irónica) les da la palabra. Gancho: "Siento que ya no me escucha."
Ella se queja (la deja en visto, le contestó a los tres días, solo le habla cuando hay liquidación);
él se defiende ("¡Pero estoy solo! Atiendo el mostrador, la caja, el proveedor. ¡Y el WhatsApp a las
once de la noche!"); ella: "peor que la novela de las nueve". Giro: la terapeuta no le dice que la
quiera más, le dice que solo no puede y que sumen a alguien: "¿Un tercero?" "Un agente de IA" que
contesta por WhatsApp al instante, a cualquier hora, con sus precios y horarios, y le pasa a él lo
que es para él. "¿Y vos cuándo me vas a hablar?" "Cuando sea importante." Reconciliación, "seguimos
el jueves". Cierra Orus (Scalerics): "Lo armamos nosotros... Mandáselo a tu socio. Tienen que hablar."
Voz armada de 20 parlamentos (`partes/`, 67.3 s); reel de 70.5 s.

## ESTILO: CONSULTORIO DE TERAPIA (cálido)
Sofá terracota, sillón salvia de la terapeuta, lámpara de pie mostaza con su cono de luz, cuadro con
marco mostaza (que se vuelve un bordado "Espacio seguro"), reloj de pared, planta, la libreta de
notas de la doctora con letra a mano (Caveat). Personajes dibujados genéricos (bustos con relleno
marrón y contorno crema): la clienta pelirroja con cola de caballo y blusa mostaza, el dueño pelado
con bigote, ojeras y delantal salvia, la terapeuta con rodete y lentes redondos mostaza, y el agente
de IA: un celular con cara en la pantalla salvia y auriculares con micrófono (el que escucha).
Edición cargada: palabras gigantes que caen, sellos terracota ("EN VISTO", "SOLO EN LIQUIDACIÓN",
"PARA ÉL"), triple zoom de telenovela en "¿un tercero?", corazón que se parte, corazones que suben.

Recurso central: los subtítulos llevan la ETIQUETA de quién habla ("LA CLIENTA" terracota, "LA
TERAPEUTA" salvia, "EL DUEÑO" crema, "SCALERICS" mostaza) y las palabras de la clienta van en
terracota claro y las de la terapeuta en salvia claro. Lo arma el `armar.mjs` local con
`partes/voces.json` (c, t, d, o por palabra).

## Paleta (SOLO estos colores)
- Marrón profundo `#2a1a13` / fondo `#24160f` (con brillo cálido `#4a2f22`) y marrón pared `#3d271c`.
- Crema `#f4e8d4`: líneas, papel, textos grandes.
- Terracota `#c8643e`: sofá, pelo de la clienta, sellos, corazones.
- Verde salvia `#8faa86`: sillón, cardigan, planta, delantal, pantalla del agente.
- Mostaza `#e6a93a`: lámpara, lentes, marco, acento de los subtítulos (`#f2b544`).

## Tipos de letra
Lexend 600-900 (lo grande, globos), IBM Plex Mono 500 (rótulos, etiquetas), Caveat 700 (la libreta,
lo escrito a mano). Nada que se lea por debajo de 28 px.

## Cómo se hicieron las escenas
`lib-escenas.mjs` tiene la paleta, los personajes (`clienta`, `duenio`, `terapeuta`, `agente`, con
caras intercambiables `.c-*`, `.d-*`, `.t-*`, `.a-*`), los muebles y el esqueleto de cada
composición (helpers `dibujar`, `pop`, `golpe`, `sacudon`, `escribir`, `cara`, `vaiven`, `fuera`,
`salida`). `escenas.mjs` describe cada escena y escribe `compositions/sNN-*.html` + `.sfx.json`
autocontenidos. Para cambiar una escena: editar `escenas.mjs`, `node escenas.mjs` y `node armar.mjs`.
`compositions/ambiente.html`: empapelado a rayas, luz de lámpara que respira, piso, viñeta, rótulo
"CONSULTORIO · TERAPIA DE PAREJA" (abajo a la derecha), tinte de drama terracota en 12.9, 34.3 y
39.12, flashes en 39.32 ("tercero") y 64.5 ("mandáselo"), brillo rosado en la reconciliación (54.4).

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá no es ilustración crema con acento verde. Sí valen las reglas técnicas.

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



## Escenas (tiempos relativos, en tiempos.md)

**s01-escucha** (2.22 s) Primer plano de la clienta llorando en el sofá terracota (ya dibujada en el
cuadro 0), lágrimas que caen. "YA NO ME" cae en 0.72 y "ESCUCHA" terracota en "escucha" 1.0, sacudón.

**s02-consultorio** (5.11) Plano general: lámpara, reloj que gira, cuadro, la terapeuta en su sillón
salvia con la libreta, el dueño y la clienta en las puntas del sofá (ella enojada). "Respiren" 0.4:
los dos inflan el pecho. "Espacio seguro" 2.4: el cuadro se vuelve un bordado. Etiquetas LA DOCTORA,
EL DUEÑO y "FLOR" en "Flor" 3.97 (ella se pone triste). Rótulo SESIÓN N° 1.

**s03-visto** (5.12) El chat de WhatsApp genérico con "El local": "¡Hola! ¿Tienen talle M?" en
"escribo" 0.09; puntitos de escribiendo que se arrepienten ("no me contesta"); "¿Hola? ¿Hay
alguien?"; "visto" 2.2: tildes terracota y sello EN VISTO. Estado "ÚLT. VEZ: HACE 3 DÍAS", separador
JUEVES y la respuesta "sí" en "días" 4.49 con "¡tres días después!" a mano.

**s04-liquidacion** (4.01) El dueño irrumpe detrás del mostrador gritando: "¡ESTABA EN EL" /
"MOSTRADOR!" (0.25 / 0.55). Corte en 1.2: entra ella; la notificación "¡LIQUIDACIÓN TOTAL! Hola Flor,
¡te extrañamos!" en "habla" 1.95; sello "SOLO EN LIQUIDACIÓN" en "liquidación" 2.7; ella revolea los ojos.

**s05-libreta** (4.35) La libreta de la doctora con espiral: el lápiz golpetea en "Ajá"; en "anoto"
escribe "· la deja en visto", "· tarda tres días", "· solo liquidaciones"; "¿y él?" terracota en
"vos" 2.15 con flecha. Rótulo NOTAS DE LA DOCTORA.

**s06-solo** (5.98) El dueño gritando: "ESTOY SOLO" en "solo" 0.3 con sacudón. Tarjetas que caen en su
palabra: MOSTRADOR 1.45, CAJA 2.25, PROVEEDOR 2.85, WHATSAPP (celular vibrando) 3.95; "23:00" en
"once" 4.6. Todo tiembla.

**s07-novela** (4.41) Ella revolea los ojos; post-its de excusas: "estaba en el mostrador", "no vi el
mensaje", "pasá el lunes" (0.05-0.8), que salen volando en 1.85. "Peor" 2.3: un televisor viejo con
dos siluetas y un corazón, "¡Nooo!" a mano en 2.85, "LA NOVELA DE LAS 21:00".

**s08-verdad** (4.09) Reloj de pared con "tic... tac...". La terapeuta baja los lentes y levanta la
ceja (0.55). Corte en 2.55 a la clienta: corazón terracota que se parte en "quiere" 3.08, lágrima.

**s09-no-puede** (3.82) "NO." gigante con sacudón. Nota: "no la quiere" tachado (1.0) y "él solo no
puede" a mano (1.1). "Sumar a alguien": se dibuja una silla vacía (2.25) y "+1" mostaza (2.7).

**s10-tercero** (1.64) Telenovela: rayos terracota/mostaza girando, la clienta boquiabierta con
triple zoom (0.22, 0.5, 0.78), "¿UN TERCERO?" en 0.25, flash.

**s11-agente** (6.40) El agente de IA cae en el sillón (0); cartel "AGENTE DE IA" en 0.45. Chat:
"¿Abren el domingo?" (1.0) y la respuesta al toque (1.3), "¡al instante!" en 2.6. "A cualquier hora"
3.3: reloj que da vueltas, sol y luna. "PRECIOS" (5.2) y "HORARIOS" (5.75) tildados.

**s12-pasa** (3.13) El agente recibe "CLIENTE NUEVO · ¿Me hacés precio por mayor?" (0.3); flecha
punteada hacia el dueño (0.95); el mensaje viaja (1.5); sello "PARA ÉL" en "pasa" 1.98; el dueño
sonríe (2.3). Rótulo LO IMPORTANTE, A VOS.

**s13-importante** (8.63) El sofá con los dos separados. Ella lo mira; "cuando sea importante" a mano
mostaza en 2.08 con subrayado; "Ay" 4.1: se derrite, corazones que suben; "Eso fue lindo" 5.2: se
acercan. "Seguimos el jueves" 6.45: tarjeta PRÓXIMA SESIÓN · el jueves.

**s14-cta** (11.58) Orus. El agente con auriculares sube; "TU AGENTE DE IA" en "Scalerics" 1.3 y
"HECHO POR SCALERICS"; "escucha" 2.7: ondas en los auriculares; preguntas de clientes alrededor
(3.2-3.7) y "23:47" (4.4). En 5.25 se va todo: "MANDÁSELO" (5.6) / "A TU SOCIO." (6.72) gigantes,
avioncito de papel, sofá vacío con "SESIÓN PARA DOS", "Tienen que hablar." a mano en 7.42. Sin salida.
