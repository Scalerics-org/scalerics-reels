# Reel "Cuenta cartas": spec

Reel vertical 1080x1920 de Scalerics. Tema: CRM (cada cliente, qué compró, qué le prometiste y cuándo
escribirle, en un solo lugar en vez de la cabeza, los post-its y cinco chats). Formato E: PREGUNTA AL QUE
MIRA, en una MESA DE BLACKJACK de casino de noche. La CRUPIER (voz Kore, elegante y filosa) abre con el
gancho: "Tu competencia cuenta cartas. Y vos jugás de memoria." En la mesa, VOS (el dueño, voz Charon) y EL
DE ENFRENTE (voz Fenrir, canchero, con palillo y libretita). Cada carta es un cliente: la señora del
presupuesto del martes ("Esa la tengo en la cabeza... ¿Mónica? ¿Marta?" / "Marisa. Cortinas. La llamo mañana
a las diez."), el muchacho de marzo al que le prometiste avisar cuando llegara el talle ("Le aviso... cuando me
acuerde" / "Ya le escribí."), el número sin agendar ("¿Y este quién era?" / "Gonzalo. Dos sillas en
septiembre."). Cada mano la gana el de enfrente (marcador). PREGUNTA: "Ahora decime vos: ¿quién gana esta
mano? Pensalo." (1.4 s de silencio con cuenta regresiva). Revelación: el de enfrente anota cada carta. Referencia
solo nombrada: "En las películas de Las Vegas, al que cuenta cartas lo echan. En tu negocio, al que no cuenta lo
dejan los clientes." GIRO a favor del dueño: "Esas cartas eran tuyas: esos clientes ya te habían elegido."
Entra Scalerics (Orus): el CRM; "Y cuando toca llamar a Marisa, te avisa." La crupier: "La casa siempre gana.
Y la casa sos vos." CTA (Orus): "¿Vos jugás de memoria o contás cartas? Te leemos en los comentarios."
Voz armada por partes (partes/voces.sh → partes/tiempos.sh → partes/componer.mjs; atempo 1.3 crupier, 1.22
dueño, 1.18 enfrente, 1.2 Orus): 72.5 s; reel 75.7 s.

## RECURSO VISUAL CENTRAL
Los NAIPES FRANCESES con CARA DE CLIENTE (Q de corazones = la señora/Marisa, J de picas = el muchacho del
talle, "?" de tréboles = el número sin agendar, K de diamantes = Gonzalo), que la crupier reparte boca abajo
(dorso petróleo con rombos magenta y "21" dorado) y se dan vuelta en la palabra que los nombra. La LIBRETITA
del de enfrente (tapa magenta) donde anota todo; al final, el CRM en pantalla con las mismas cartas adentro.

## ESTILO: CASINO DE NOCHE CON NEÓN
Sala casi negra con luz magenta arriba y foco dorado al centro; abajo el paño azul petróleo de la mesa con riel
dorado (y 1430 en armar.mjs; las escenas dibujan su propio borde de mesa con `CC.mesa(y)` delante de los
personajes, que quedan sentados detrás). ambiente.html: arriba el cartel de neón magenta "BLACKJACK / MESA 21 ·
LA CASA SIEMPRE GANA" que titila (desde "Scalerics" el borde pasa a verde y en "la casa sos vos" el subtítulo del
cartel dice "LA CASA SOS VOS"); luces de la sala desenfocadas que flotan; abajo a la izquierda la chapa de quién
habla (LA CRUPIER magenta · VOS dorado · EL DE ENFRENTE petróleo claro · SCALERICS verde); abajo a la derecha el
marcador "MANOS · VOS 0 · ENFRENTE 0→3" (suma en "Marisa", "Ya le escribí", "Gonzalo"); flash en "El de enfrente
anota" y en "Scalerics". Los subtítulos: crema con contorno tinta, acento del color de quien habla.
Personajes planos con contorno tinta grueso (stroke 6-8), piezas en `assets/casino.js` (window.CC): la crupier
(rodete negro con cinta magenta, camisa blanca, chaleco negro, moño magenta, chapita CRUPIER, labios rojos, una
ceja levantada), el dueño (pelado con costados grises, bigote, chaleco de lana dorado, camisa crema), el de
enfrente (jopo negro, barba de tres días, palillo, campera petróleo claro, remera magenta, libretita).
Personajes genéricos dibujados: nada de caras, logos ni imágenes de películas.

## Paleta (SOLO estos, más opacidades)
- Tinta `#070b10` (sala y contornos).
- Azul petróleo `#0e4a55` (oscuro `#082f37`, medio `#136070`, claro `#2a8a99` / texto `#6fe3ec`): paño, dorso de los naipes, el de enfrente.
- Magenta neón `#ff2e88` (claro `#ff4fa0`, oscuro `#a3125a`): neón, crupier, rombos del dorso, sellos.
- Dorado `#f2c14e` (oscuro `#b8862b`): riel de la mesa, "21", títulos en Cinzel, el dueño.
- Crema naipe `#f5efe0` (`#e3d9c2`) y rojo naipe `#d62839` (palos rojos).
- Verde Scalerics `#5ce611` SOLO desde que entra Scalerics (CRM, aviso, cartel).
Tipografías: Lexend 600-900 (textos, neón), Cinzel 700-900 (títulos de casino), IBM Plex Mono 600 (tags y
rótulos), Black Ops One (sellos), Caveat (lo que anota el de enfrente en la libreta).

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


### Lo que cambia de SPEC-base en este reel
Manda el estilo casino: fondo y paleta de arriba (no las líneas crema), personajes con relleno plano y contorno
tinta, neón con glow permitido, sellos Black Ops One y tags mono con borde (`.cc-tag`, `.cc-sello`, `.cc-neon`,
`.cc-titulo`, `.cc-globo` en casino.js). La zona del dibujo es y 540-1560 (los subtítulos ocupan y 236-420; la
chapa y el marcador, y 1590-1690). Cada escena carga `assets/casino.js` y usa `CC.kit(tl, root)` (pop, popSvg,
sello, neon, dibujar, repartir, voltear, hablar, respirar, sacudon, salida). Ojo: dentro de un personaje
(grupo con transform), los `svgOrigin` van en coordenadas LOCALES del personaje (cabeza ≈ "0 -350").

## Escenas (tiempos relativos en tiempos.md)
1. **s01-cuenta** (0 → "Primera"): plano general de la mesa: el dueño a la izquierda, la crupier al centro con
   un naipe en la mano, el de enfrente a la derecha; borde de mesa al frente, fichas. "cuenta" → tag petróleo
   CUENTA CARTAS sobre el de enfrente y "+1 -1 +1" que suben (sus ojos van y vienen). "vos" → nube de pensamiento
   vacía con garabato y "¿...?" sobre el dueño; "memoria" → tag dorado JUEGA DE MEMORIA. "mesa" → la crupier
   reparte 4 naipes boca abajo sobre el paño; "carta"/"cliente" → se dan vuelta: caras de clientes.
2. **s02-martes** ("Primera" → "Esa"): primer plano de un naipe gigante boca abajo; tag PRIMERA CARTA; en
   "señora" se da vuelta: Q de corazones con la señora (rulos grises, lentes) y el rótulo PRESUPUESTO; en "martes"
   sello dorado MARTES.
3. **s03-cabeza** ("Esa" → "Segunda"): el dueño grande, confiado, se toca la sien en "cabeza"; nube con "¿Mónica?"
   ("Mónica") y "¿Marta?" ("Marta"), cada una tachada en magenta; cara de duda con gotita. "Marisa" → entra el de
   enfrente desde la derecha con la libretita; globo petróleo "MARISA." y en la libreta en Caveat "Marisa ·
   cortinas" ("Cortinas") y "mañana 10 hs" ("mañana"); fichas que se deslizan hacia él en "diez".
4. **s04-talle** ("Segunda" → "¡Llegó"): la crupier a la izquierda con el naipe; en "muchacho" se da vuelta un
   naipe grande a la derecha: J de picas con el muchacho, rótulo MARZO; "prometiste" → sello magenta PROMETIDO;
   "talle" → una remera con etiqueta "M" que hace pop junto al naipe.
5. **s05-me-acuerde** ("¡Llegó" → "Tercera"): el dueño sorprendido con una caja "LLEGÓ" que hace pop; en "aviso"
   cara de culpa; en "acuerde" un post-it "avisar al de marzo" se le despega de la frente y cae. "Ya le escribí"
   → el de enfrente a la derecha muestra el celular con el globo "¡Llegó tu talle!" con dos tildes.
6. **s06-sin-agendar** ("Tercera" → "¿Y"): naipe "?" de tréboles que se da vuelta abajo a la izquierda; celular
   grande al centro con cabecera "+598 9• ••• •••" (número sin agendar) y en "buenas" el globo "Buenas, ¿al
   final?"; tres puntitos de escribiendo antes.
7. **s07-quien-era** ("¿Y" → "Ahora"): el dueño perdido, con signos de pregunta que hacen pop alrededor en "quién
   era"; "Gonzalo" → el de enfrente con la libreta grande al frente: "Gonzalo" ("Gonzalo"), "2 sillas · sept."
   ("sillas"), "quiere 2 más" ("Quiere"); el naipe K de diamantes con Gonzalo se da vuelta al lado.
8. **s08-pensalo** ("Ahora" → "El de enfrente anota"): LA PREGUNTA. Neón grande "¿QUIÉN GANA?" que se prende en
   "quién"; dos manos de cartas boca abajo: VOS (izq., dorado) y ENFRENTE (der., petróleo) con un retrato chico de
   cada uno; en "Pensalo" un reloj de arena / aro de cuenta regresiva 3·2·1 en el centro y la etiqueta PENSALO.
9. **s09-anota** ("El de enfrente" → "En las películas"): la revelación. El de enfrente guiña; en "anota" la
   libretita se agranda al frente; renglones en Caveat que se escriben: "quién es" ("quién"), "qué compró"
   ("compró"), "qué le prometí" ("prometió"); tag EL SECRETO.
10. **s10-vegas** ("En las películas" → "¿Lo peor?"): cartel de neón dorado de casino "LAS VEGAS" (genérico, con
   estrella y bombitas) en "Vegas"; un patovica (silueta) señala la salida y un contador de cartas sale volando con
   las cartas en "echan" (sello ¡AFUERA!). "En tu negocio" → vidriera de TU LOCAL; en "dejan" los naipes-cliente
   salen caminando del local hacia la derecha; sello TE DEJAN.
11. **s11-tuyas** ("¿Lo peor?" → "En Scalerics"): las 4 cartas-cliente con borde dorado y sello chico "TU LOCAL";
   en "tuyas" brillan; en "elegido" un corazón dorado sobre cada una. "Gracias" → el de enfrente guiña y las cartas
   y las fichas se deslizan hacia él; el dueño queda mirando.
12. **s12-crm** ("En Scalerics" → "Y cuando toca"): ENTRA SCALERICS (verde). En "CRM" pop de una pantalla grande
   con la lista de clientes (Marisa, Matías, Gonzalo) y la ficha de Marisa: "Pidió: presupuesto de cortinas"
   ("compró"), "Prometiste: llamarla" ("prometiste"), "Escribirle: mañana 10 hs" ("escribirle"); en "un solo lugar"
   los 4 naipes vuelan adentro de la pantalla.
13. **s13-casa** ("Y cuando toca" → "¿Vos"): el celular del dueño con la notificación verde "Llamá a Marisa · hoy
   10 hs" en "llamar"; el dueño confiado. "La casa siempre gana" → neón dorado LA CASA SIEMPRE GANA; "sos vos" →
   las fichas se apilan del lado del dueño y sello verde LA CASA SOS VOS.
14. **s14-cta** ("¿Vos" → fin): dos naipes gigantes para votar: "DE MEMORIA" (dorso gris, dueño) y "CONTÁS CARTAS"
   (frente con libreta); globo de comentario "Te leemos en los comentarios" en "comentarios"; queda quieto ~3 s con
   respiración leve.
