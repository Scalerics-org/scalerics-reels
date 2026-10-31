# Nominado · agente de IA · gala de reality de convivencia

**De qué trata.** Gala de eliminación de un reality de convivencia tipo Gran Hermano (nombrado solo
de palabra; nada de logos ni de la casa real). La conductora (Aoede, eufórica) abre con el gancho:
"Esta semana, tus clientes te nominaron. Y no para un premio." En la placa: tu local contra el de
enfrente. Confesionario: la voz grave del Hermano (Algenib, con eco de parlante) le pregunta a la
clienta (Leda) a quién nomina: "A Walter. Le pregunté el sábado por la campera negra. Me clavó el
visto. El lunes me contesta: consultá por privado. ¡Era el privado, Walter!". Walter (Charon, dueño
de una tienda de ropa) hace su descargo: "Yo contesto cuando puedo. Estoy en la caja, en el depósito,
en el mostrador. ¿Qué querés, que no duerma?". El público vota en vivo: tu local abajo, el de enfrente
arriba ("me contestó un domingo a las once de la noche. Al toque."). GIRO (el Hermano): "Walter no es
mal jugador. Está jugando solo." ¡Ingreso sorpresa a la casa!: entra el agente de IA (Kore) que
contesta por WhatsApp al instante con precios, stock y horarios, a las tres de la mañana también, y le
pasa la conversación a Walter cuando es para él. La clienta: "¿Walter? ¿Quién es este? ¡Lo amo!".
Walter: "¿Y yo qué hago?" / "Usted duerma, jefe." Orus: "En Scalerics armamos tu agente de IA: un
empleado más que atiende por WhatsApp, sin horario." Cierre de la conductora: "¿Lo salvás o lo
eliminás? Votá en los comentarios."

**Formato:** P (personaje de la cultura popular: gala de reality de convivencia).
**Recurso visual central:** la casa vigilada: el confesionario (sillón violeta capitoné con luz
violeta y la cámara-ojo arriba), la placa de nominados con dos fotos y un VS, y el contador de votos
en vivo con barras amarillas. Cada escena con marco de visor de cámara (esquinas) y REC del ambiente.

## Paleta (manda sobre SPEC-base)
- Violeta profundo `#22103d` / `#3a1763` (fondo, con líneas de scan en armar.mjs) y tinta `#12051f`.
- Violeta del confesionario `#6a2fb0` (claro `#8f55d6`): sillón, paredes, luz.
- Rosa neón `#ff3d9a`: NOMINADO, la conductora, el visto, la cruz de eliminar, golpes de drama.
- Blanco `#f7f2ff`: textos claros, celulares, carteles, subtítulos.
- Amarillo votación `#ffd23f`: votos, barras, acento de subtítulos, etiquetas, el agente de IA.
- Pieles `#e3a982` / `#c98a62` (solo para personajes). Ilustración plana con relleno y contorno `#12051f`.

## Tipografía
- Subtítulos: Lexend 600, 52px, blanco `#f7f2ff`; acento amarillo `#ffd23f`.
- Carteles de TV (placa, NOMINADO, contador, zócalos): Lexend 800 en mayúsculas.
- Etiqueta debajo del dibujo: IBM Plex Mono 500, 30px, mayúsculas, espaciada 0.26em, amarilla, top 1372.

## Ambiente (`compositions/ambiente.html`)
Dos haces de luz de estudio (violeta y rosa) que barren despacio, marco de visor de cámara con
esquinas y "● REC · EN VIVO" arriba a la derecha del visor (y 600), grano y viñeta; golpes de luz rosa
en los momentos de drama (nominaron, el visto, "privado, Walter", eliminado) y un golpe amarillo en el
ingreso sorpresa. Desde "En Scalerics" la luz se vuelve amarilla pareja y el rótulo de abajo pasa de
"GALA DE NOMINACIÓN · EN VIVO" a "SALVADO POR EL PÚBLICO".

## Sonido
Cortina: la del molde (64 s) alargada a 77 s con un crossfade de sí misma (`assets/bgm/bed.mp3`, volumen 0.24). `drama` (golpe de reality), `uuh` y `murmullo` (público), `impact-bass-1`, `riser` (ingreso
sorpresa), `notification`, `pop`, `ping`, `tic`, `campanita`.

## Voces (`partes/`)
voces.sh (generar) → recortar.sh → pausas.sh → tiempos.mjs por parte → componer.mjs (atempo y
silencios). Conductora Aoede (01, 02, 07, 10, 16), el Hermano Algenib con eco (03, 05, 09),
clienta Leda (04, 08, 12), Walter Charon (06, 13), agente de IA Kore (11, 14), Orus (15).

## Personajes (siempre iguales)
- **Conductora:** pelo rubio platinado con jopo, vestido rosa neón brillante, micrófono plateado con
  cubo amarillo, aros grandes.
- **Clienta:** pelo castaño con rodete alto, campera blanca sobre top amarillo, aros rosas; muy expresiva (cara chusma, enojada o enamorada con ojos de corazón).
- **Walter:** 50 años, pelado arriba con pelo canoso a los costados, bigote, ojeras, chomba violeta
  clara con una cinta métrica colgada del cuello (tienda de ropa).
- **Agente de IA:** una pantalla redondeada (cabeza) con dos ojos amarillos de LED y sonrisa, auricular
  con micrófono, saco blanco con corbata amarilla; nunca un robot de lata.
- **El Hermano:** no se ve: es el ojo/cámara del confesionario con ondas de sonido.

Personajes y piezas compartidas en `partes/personajes.mjs`; cada escena se genera con `node partes/escenas/sNN.mjs` (esqueleto común en `partes/escena.mjs`: helpers pop, entra, temblor, dibujar, etiqueta, flash). Editar el .mjs y volver a generar, no el .html.

## Base técnica (de SPEC-base; la paleta y el estilo de arriba mandan)
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



## Escenas (tiempos relativos; ver tiempos.md)

### s01-gancho (0-4.67) · el gancho
Estudio: pantalla LED "PLACA DE NOMINADOS" (y 610-1060) con la conductora en primer plano abajo a la
izquierda (micrófono). Cuadro 0 a medio armar. "clientes" (1.05): en la pantalla aparece tu local
(persiana baja). "nominaron" (2.06): sello rosa NOMINADO que cae con golpe, temblor y flash rosa.
"no" (3.16): trofeo amarillo; "premio" (3.68): se tacha con una X rosa. Etiqueta "GALA EN VIVO" →
"NOMINADO: TU LOCAL".

### s02-placa (0-3.29) · la placa
Cartel "EN PLACA" arriba. "local" (0.43): polaroid izquierda TU LOCAL (gris, persiana baja, zzz).
"contra" (1.84): VS amarillo que cae en el centro con temblor. "enfrente" (2.24): polaroid derecha
EL DE ENFRENTE (abierto, amarillo, brillos). Etiqueta "PLACA DE NOMINADOS" → "UNO SE VA DE LA CASA".

### s03-confesionario (0-4.07) · habla el Hermano
Confesionario: cartel neón CONFESIONARIO, cono de luz violeta, sillón capitoné, la clienta sentada,
el ojo-cámara arriba a la izquierda con ondas amarillas cuando habla el Hermano (0, 0.83, 1.41).
"Walter" (3.49): entra la polaroid de Walter y se dibuja un círculo rosa. Etiqueta "CONFESIONARIO" →
"NOMINA A: WALTER".

### s04-visto (0-8.11) · la prueba: el chat
Celular gigante "Walter · Ropa". "sábado" (0.46) chip SÁBADO 21:40; "campera" (1.19) burbuja
"¿Tenés la campera en negro?"; "visto" (2.56) tildes rosas + sello EN VISTO con flash; "lunes" (3.45)
chip LUNES 10:15; "consultá" (4.62) respuesta amarilla "Consultá por privado". "¡Era" (6.15): entra la
clienta enojada abajo a la izquierda, cartel rosa "¡ESTO ES EL PRIVADO!" con flecha al chat, temblor.

### s05-descargo (0-7.88) · el descargo de Walter
Walter en el sillón, ojo-cámara con ondas (0, 1.2). "descargo" (1.42): zócalo rosa "EN VIVO · WALTER ·
SU DESCARGO". "caja" (4.3), "depósito" (4.79), "mostrador" (5.48): medallas con ícono alrededor.
"¿Qué querés" (5.74): las medallas saltan, Walter tiembla. "duerma" (6.86): cara de cansado, gotas.

### s06-votos (0-5.29) · el público vota
Tablero VOTACIÓN EN VIVO con dos barras y público con carteles amarillos y rosas abajo. "vivo"
(1.15) suben las dos; "abajo" (2.57) la de TU LOCAL cae y se pone rosa con flecha abajo; "enfrente"
(3.54) la de ENFRENTE sube amarilla hasta arriba; "arriba" (4.31) flecha y brillos.

### s07-enfrente (0-4.96) · al toque
Clienta a la izquierda, celular "El de enfrente" a la derecha con su pregunta. "domingo" (1.66) chip
DOMINGO 23:00; "once" (2.58) reloj con luna "23:00"; "toque" (3.9) respuesta amarilla "¡Sí! Queda una.
¿Te la guardo?", la clienta pasa a ojos de corazón y salen corazones.

### s08-solo (0-6.25) · el giro: juega solo
Cartel amarillo PRUEBA SEMANAL, Walter cansado en el centro y burbujas de mensajes que se le amontonan.
"jugando" (2.53): dos lugares vacíos punteados con "?" y VACANTE. "Por eso" (4.5): se apagan las luces;
"noche" (4.91): un foco amarillo que titila.

### s09-ingreso (0-2.37) · ¡ingreso sorpresa!
Cartel neón INGRESO SORPRESA que titila, la puerta de la casa. "sorpresa" (0.53): la puerta se abre,
rayos amarillos, humo y la silueta con ojos LED. "casa" (1.25): flash amarillo y confeti.

### s10-agente (0-6.77) · el agente se presenta
El agente de IA saluda con la mano bajo un cono de luz. "agente" (0.71): zócalo AGENTE DE IA · DE
WALTER. Fichas a la derecha: WHATSAPP (2.84), AL INSTANTE (3.47), PRECIOS (4.49), STOCK (5.2),
HORARIOS (5.99).

### s11-tres (0-3.41) · a las tres de la mañana
Reloj digital 03:00 con luna; el agente a la izquierda, Walter durmiendo en la cama a la derecha (zzz).
"si es para él" (1.27): burbuja "¿Hablo con el dueño?". "se lo paso" (2.4): arco punteado y la ficha
PARA WALTER que vuela hasta su cama.

### s12-lo-amo (0-5.97) · ¡lo amo! / usted duerma, jefe
Clienta y agente. "¿Quién es este?" (0.98) signos de pregunta; "¡Lo amo!" (1.96) ojos de corazón y
corazones. "¿Y yo qué hago?" (3.0): Walter perdido con signos de pregunta. "Usted duerma" (4.2): antifaz
rosa, frazada, zzz, y el agente chiquito al lado.

### s13-scalerics (0-5.73) · Orus: tu agente de IA
Agente bajo luz amarilla; "agente de IA" (1.47) cartel TU AGENTE DE IA; "empleado" (2.67) gafete
EMPLEADO; "WhatsApp" (3.88) celular con chat; "sin horario" (4.56) medalla 24 h que gira. El ambiente
pasa a luz amarilla y el rótulo a "INGRESÓ: TU AGENTE DE IA".

### s14-cta (0-7.14) · ¿lo salvás o lo eliminás?
Polaroid de Walter con sello NOMINADO; botones SALVAR (amarillo, 0.17) y ELIMINAR (rosa, 1.16);
"Votá" (1.69) caja de comentario "Votá en los comentarios" con cursor; los botones laten hasta el final.
