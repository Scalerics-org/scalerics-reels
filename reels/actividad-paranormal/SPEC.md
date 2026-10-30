# Reel "Actividad paranormal": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Especial de Halloween
(31-10) en clave de PELÍCULA DE TERROR DE CÁMARA ENCONTRADA (tipo Actividad Paranormal, solo
nombrada por el formato: nada de la película). Vende UNA cosa: el AGENTE DE IA (le escribe al
cliente que dejó de venir, hace el seguimiento del que preguntó y no compró, atiende a cualquier
hora). El dueño de un almacén de barrio pone la cámara de seguridad porque de noche pasan cosas
raras, y lo cuenta en susurros: NOCHE 1, a las tres de la mañana el celular del local se prende
solo y contesta; NOCHE 2, abre el local y hay turnos agendados y pedidos tomados que él no tomó;
NOCHE 3, suena la campanita de la puerta y entra Doña Nélida ("¡Hola, querido! Vengo por lo que me
escribiste"), que no viene desde julio, y atrás el muchacho que preguntó un precio en agosto y
nunca compró: "Están volviendo... de entre los muertos." Llama a la hija: "el local está
embrujado". GIRO (se prende la luz): "Papá, no es un fantasma. Es el agente de IA que te
contraté." "¿Y por qué no me avisaste?" "Te avisé. Me dejaste en visto." Entra Orus: "En
Scalerics lo armamos para tu local". Cierre: "Etiquetá al que necesita un fantasma así en su local."
Cuatro voces: dueño (Fenrir, susurrando), Doña Nélida (Gacrux), hija (Leda), narrador (Orus).
Voz de 67.89 s; reel de 71.09 s.

## ESTILO: CÁMARA DE SEGURIDAD CON VISIÓN NOCTURNA (hasta s10) → LUZ PRENDIDA (desde s11)
Todo lo de noche se ve como una cámara de seguridad infrarroja: plano picado desde una esquina
del techo, dibujos de líneas VERDE FÓSFORO que se dibujan solas, rellenos verde oscuro, y lo que
refleja el infrarrojo (los OJOS de los personajes, la pantalla del celular) en blanco quemado con
brillo, como en las películas de cámara encontrada. El HUD de la cámara (REC titilando, CAM 02 ·
MOSTRADOR, fecha y hora que corren, NOCHE 1/2/3, esquinas del visor), el grano, las líneas de
barrido y la interferencia en los sustos ya los pone `ambiente.html`. Personajes dibujados
genéricos propios. En s11 la hija PRENDE LA LUZ: el fondo pasa a cálido (lo pone index), el HUD a
crema, y los dibujos pasan a líneas CREMA con acentos fósforo: el terror se terminó.

## Paleta (SOLO estos colores)
- Negro verdoso `#030a04` (fondo de noche, lo pone index) y verde oscuro `#0f2a12` para rellenos.
- Fósforo `#8cff6b`: todas las líneas de noche, textos grandes de noche, acento de subtítulos.
  Glow permitido acá: `drop-shadow(0 0 10px rgba(140,255,107,0.55))` en lo importante.
- Blanco quemado `#eaffdf`: ojos que brillan, pantalla del celular, lo sobreexpuesto.
  Con `drop-shadow(0 0 14px #8cff6b)`.
- Rojo REC `#ff3b30`: solo lo alarmante (REC, el sello "JULIO", "SIN COMPRAR", la X).
- Crema día `#f6ead2`: líneas desde s11 (luz prendida). El fondo de día `#19140e` lo pone index.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, las palabras "bot" y "chatbot".

## Tipos de letra
Lexend 600-900 para lo grande; IBM Plex Mono 500/600 para la UI de cámara, horas, carteles y
etiquetas. Nada que haya que leer de menos de 26px (lo decorativo chico, `data-layout-ignore`).

## Zona
HUD arriba (y 88-170) y abajo (y 1630-1702): NO poner nada ahí. Subtítulos y 236 a ~420.
Dibujo entre y 580 y 1330, x 60-1020. Etiqueta mono fósforo en top 1268 (crema desde s11).
Logo en y ~1746. La mira chica del HUD está en el centro (540, 940): da igual si un dibujo la tapa.

## Personajes (iguales en todas las escenas: copiá el SVG de la escena que los estrena)
- EL DUEÑO (s01/s04): pelado arriba con dos mechones a los costados, bigote ancho, delantal con
  bolsillo, ojos = dos óvalos blanco quemado que brillan (reflejo del infrarrojo), cejas
  levantadas de miedo. En s04 y s10 tiene gotas de sudor y una linterna. Desde s11 (de día) los
  ojos tienen pupila normal.
- EL CELULAR DEL LOCAL (s01): apoyado en el mostrador, rectángulo redondeado; la pantalla se
  prende en blanco quemado con brillo y burbujas de chat.
- DOÑA NÉLIDA (s06): señora bajita, pelo batido (nube de rulos), anteojos redondos, cárdigan con
  botones, cartera colgada del brazo, bolsa de mandados. Ojos blancos que brillan detrás de los
  anteojos (por la cámara, no es un fantasma de verdad: da risa, no miedo real).
- EL MUCHACHO (s08): casco de bici, mochila, empujando una bici; ojos brillando igual.
- LA HIJA (s11): pelo largo atado en colita alta, buzo con capucha, celular en la mano; líneas crema.

## Lo que ya está hecho (no tocar)
- `index.html` (lo genera `armar.mjs`): fondo negro verdoso con brillo fósforo al centro; en 42.51
  ("Papá") el main timeline prende `#dia` (fondo cálido).
- `compositions/ambiente.html`: grano, líneas de barrido, banda que baja, viñeta, HUD (REC, CAM,
  fecha/hora, NOCHE 1 en 0, NOCHE 2 en 10.65, NOCHE 3 en 18.63, CAM 01 · PUERTA desde 18.63);
  interferencia + flash en 9.05 ("contesta"), 16.6 ("Yo no tomé"), 28.84 ("julio"), 37.92
  ("muertos"); en 42.45 flash cálido, se va lo nocturno y el HUD dice LUZ PRENDIDA.

## Escenas (tiempos relativos a cada escena: ver tiempos.md)

### s01-noche-uno (0.00 → 5.27) "Noche uno. Algo atiende el WhatsApp de mi local mientras duermo."
Cuadro 0: el local visto desde la cámara del techo, a medio dibujar: mostrador en perspectiva,
estantería atrás con frascos y paquetes, la persiana bajada a la izquierda. Sobre el mostrador el
celular apagado. "Noche uno" (0.0): cartel GIGANTE "NOCHE 1" en Lexend 900 fósforo con glow que
entra con golpe y se va en 1.3 s. "WhatsApp" (2.29): la pantalla del celular se prende sola en
blanco quemado (halo), vibra. "duermo" (3.90): arriba a la derecha unas "z z z" chicas y una
burbuja de chat que sale del celular. Etiqueta: "Cámara 02" → "Algo atiende".

### s02-tres-am (5.27 → 10.65) "Tres de la mañana. El celular se prende solo. Y contesta."
Primer plano del celular sobre el mostrador (la cámara hace zoom digital: marco de zoom con
"ZOOM 4X"). "Tres" (0.0): reloj "03:00" mono gigante que titila. "prende" (2.17): la pantalla se
enciende con brillo; "solo" (2.73) vibra. "contesta" (3.81): aparecen burbujas en la pantalla
("Hola, ¿a qué hora abren?" del cliente y una respuesta "¡Hola! Mañana desde las 9. ¿Te reservo?")
y un "escribiendo..." que titila antes; susto (el flash lo pone ambiente). Etiqueta: "03:00" →
"Contesta solo".

### s03-noche-dos (10.65 → 14.99) "Noche dos. Abro el local y hay turnos agendados."
"Noche dos": cartel NOCHE 2 igual que s01. "Abro el local" (0.84): la persiana metálica sube
(listones) y se ve el mostrador. "turnos agendados" (2.82): una agenda/calendario de la semana
en una tablet sobre el mostrador se llena sola de bloques ("10:00 Turno", "11:30 Turno", "16:00
Turno"). Etiqueta: "Noche 2" → "Turnos solos".

### s04-pedidos (14.99 → 18.63) "Pedidos tomados. Yo no tomé ningún pedido."
Izquierda: una lista de pedidos que cae como ticket ("Pedido 1 · Tomado", "Pedido 2 · Tomado",
con tildes). "Yo" (1.56): el dueño en primer plano (busto) con linterna, sudando, mirando a
cámara, ojos blancos que brillan, bigote que tiembla. "ningún" (2.05) la linterna tiembla.
Etiqueta: "Pedidos tomados" → "Yo no fui".

### s05-noche-tres (18.63 → 22.41) "Noche tres. Suena la campanita de la puerta."
Cartel NOCHE 3. Vista CAM 01 desde arriba de la puerta: la puerta de vidrio con su cartel
"ABIERTO" y la campanita colgada arriba. "campanita" (1.73): la campanita se sacude (rotación),
ondas de sonido. "puerta" (2.59): la puerta se abre despacio, una sombra en el vidrio con dos
ojos blancos. Etiqueta: "Cam 01 · Puerta" → "Tilín".

### s06-nelida (22.41 → 26.34) "¡Hola, querido! Vengo por lo que me escribiste."
DOÑA NÉLIDA de cuerpo entero, entrando, con los ojos blancos que brillan; saluda con la mano
("Hola" 0.0). "escribiste" (2.30): levanta su celular y en la pantalla se ve un mensaje "Doña
Nélida, ¡la extrañamos! Llegó su yerba." Etiqueta: "Doña Nélida".

### s07-julio (26.34 → 29.87) "Doña Nélida... ¡Doña Nélida no viene desde julio!"
Ficha de clienta tipo expediente (borde fósforo): "Doña Nélida" y "Última compra:". "julio"
(2.50): una hoja de calendario "JULIO" con telarañas en las esquinas y un sello rojo "HACE MESES"
que cae con golpe; el dibujo se sacude. Etiqueta: "Última vez" → "Julio".

### s08-agosto (29.87 → 35.71) "Y atrás, el muchacho que preguntó un precio en agosto y nunca compró."
El MUCHACHO con casco y bici aparece atrás de Nélida (ella chiquita adelante a la izquierda).
"preguntó un precio" (1.85): globo de chat "¿Precio?" sobre él; "agosto" (3.05): un tag "AGOSTO"
colgando; "nunca compró" (3.98): sello rojo "SIN COMPRAR". Etiqueta: "El de agosto".

### s09-muertos (35.71 → 39.43) "Están volviendo... de entre los muertos."
Fila de siluetas en la puerta, cada vez más, con ojos blancos (5 o 6, distintas alturas), que
avanzan despacio hacia la cámara (escala). "muertos" (2.21): manos que salen desde abajo del
cuadro como de una tumba, sacudón; una lápida de cartel "CLIENTES" en el medio. Etiqueta:
"Vuelven" → "De entre los muertos".

### s10-embrujado (39.43 → 42.51) "Hija, el local está embrujado."
El dueño agachado abajo del mostrador con el celular en la oreja y la linterna, susurrando.
"embrujado" (1.60): un fantasma de sábana genérico dibujado que flota detrás de él (líneas
fósforo), y el dueño tiembla. Etiqueta: "Llamada" → "Embrujado".

### s11-luz (42.51 → 47.35) "Papá, no es un fantasma. Es el agente de IA que te contraté."
SE PRENDE LA LUZ (flash cálido de ambiente en 0.0). Líneas CREMA. LA HIJA de pie con la mano en
la llave de la luz. "fantasma" (1.22): ella saca la sábana del fantasma y abajo había... el
celular del local. "agente de IA" (2.45): el celular con su pantalla: un avatar simple del agente
(círculo con dos ojitos) y el texto "Agente de IA · en línea" en fósforo. Etiqueta: "Luz" →
"Agente de IA".

### s12-hace (47.35 → 52.86) "Les escribe a los que dejaron de venir, sigue al que preguntó y no compró, y atiende a las tres de la mañana."
Tres burbujas de chat del agente que entran en su palabra, una abajo de la otra:
"escribe" (0.16): "Doña Nélida, ¡la extrañamos!"; "sigue" (1.29): "¿Te quedó alguna duda con el
precio?"; "atiende" (3.46): "03:00 · ¡Hola! Te reservo para mañana." Cada una con un tilde
fósforo. Etiqueta: "Escribe" → "Sigue" → "A las 3".

### s13-visto (52.86 → 57.80) "¿Y por qué no me avisaste? / Te avisé. Me dejaste en visto."
El dueño (de día, ojos normales, ofendido, brazos cruzados) a la izquierda. "avisé" (2.01): en
grande el chat de la hija: "Papá, te contraté un agente de IA" y abajo "Visto" con doble tilde.
"visto" (3.81): doble tilde gigante fósforo con golpe; el dueño se pone colorado (líneas de
vergüenza en las mejillas). Etiqueta: "Te avisé" → "Visto".

### s14-scalerics (57.80 → 65.13) Orus: "En Scalerics lo armamos para tu local: no duerme, no se olvida de nadie y trae de vuelta a los que se fueron."
El local de día lleno de vida: el mostrador, el celular con brillo. "no duerme" (2.64): una luna y
un sol que giran sobre el celular (siempre prendido); "no se olvida de nadie" (3.91): fichas de
clientes que se apilan con tilde; "trae de vuelta" (5.15): flechas curvas que traen siluetas a la
puerta (Nélida, el muchacho), ahora con ojos normales y sonrisa. Etiqueta: "Scalerics" → "Vuelven".

### s15-cta (65.13 → 71.09) "Etiquetá al que necesita un fantasma así en su local."
Un fantasma de sábana simpático, crema, con un celular en la mano (es el agente), y un "@"
fósforo gigante que late. Debajo "ETIQUETÁ" en Lexend 900 y "al que necesita un fantasma así" en
crema. Termina quieto con el "@" latiendo despacio. Etiqueta: "Feliz Halloween".

## Base (molde/SPEC-base.md: lo técnico vale; lo visual lo reemplaza este SPEC)
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

