# Reel "La galaxia": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): SPACE OPERA, parodia de la saga
de las galaxias ("como en La Guerra de las Galaxias", solo nombrada: nada de logos, personajes,
naves reconocibles, sables ni música de la obra; todo dibujado genérico). Producto: AGENTE DE IA.

Historia: VOZ DE TRÁILER (Fenrir) sobre el texto amarillo que se aleja: "Hace mucho tiempo, en un
barrio muy, muy lejano... un comerciante dejó un mensaje en visto. Y empezó la guerra." El VILLANO,
el Imperio del de enfrente (Algenib, grave): "Cada mensaje sin contestar es un planeta que me
regalás." La CLIENTA REBELDE (Leda, holograma azul, filtro de teléfono) a las once de la noche:
"¿tenés las zapatillas blancas en treinta y ocho?". Villano: "Nadie. Silencio en la galaxia. Vení
al lado oscuro, querida: acá contestamos en un segundo." El DUEÑO (Charon) en su nave vieja:
"¡Estoy solo en esta nave! ¡Atiendo, cobro, repongo, y a las once me duermo arriba del tablero!".
Villano: "Comerciante... yo soy tu competencia." Dueño: "¡No! ¡No puede ser!". GIRO (tráiler):
"a este piloto le sobra coraje. Lo que le falta es tripulación." Dueño en holograma: "Ayudame,
agente de IA. Sos mi única esperanza." ORUS (Scalerics): armamos tu agente de IA (WhatsApp e
Instagram, al instante, a cualquier hora, precios, stock, horarios, toma pedidos, te pasa la
conversación): un copiloto que no duerme. Villano: "¡Imposible!". Orus: "Que la fuerza te
acompañe... y el WhatsApp también. Y vos, ¿de qué lado de la galaxia estás? Te leemos en los
comentarios."

Voz armada de 12 parlamentos (`partes/01..12.txt`, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas y el 11 cortado en "¡Imposible!" (`pausas.mjs`), atempo
1.0-1.2 por parlamento y pegados con 0.35-0.6 s (`componer.mjs`, `atempo.json`, `gaps.json`).
Tiempos: Speech-to-Text de cada parte. Locución 73.06 s; reel 76.26 s.

## ESTILO: GALAXIA NEGRA, SPACE OPERA. Edición cargada.
Espacio negro con estrellas que derivan (ambiente), nebulosas tenues. Recurso central: el TEXTO
AMARILLO QUE SE ALEJA EN PERSPECTIVA (s01), y las naves y planetas dibujados genéricos: la NAVE
VIEJA del dueño (carguero redondo, parches, humo), el DESTRUCTOR ROJO del Imperio del de enfrente
(triángulo largo con luces rojas y un toldo de local en el puente), planetas con anillos, rayos
láser, HOLOGRAMAS azules con líneas de barrido. Palabras gigantes Lexend 900 que caen en su palabra;
sacudones en los gritos; nada quieto más de ~0.8 s.
- El villano (Imperio del de enfrente): capa negra de cuello alto con forro rojo, cara alargada
  pálida con bigote fino y cejas en V, ojos rojos que brillan. Nunca casco ni máscara.
- La clienta rebelde: holograma AZUL (pelo atado en cola, celular en la mano).
- El dueño: pelado con bigote, delantal, cara cansada; su nave vieja.
- El agente de IA (desde s11): copiloto VERDE Scalerics, casco redondo con visor, auricular.

## Paleta (SOLO estos colores)
- Negro espacio `#03040a` / panel `#0a0d1c` / `#141a33`: fondo y rellenos.
- Blanco estrella `#f2f0e6`: líneas de dibujo, textos grandes, subtítulos.
- Amarillo título `#ffd21f`: el texto que se aleja, titulares gigantes, acento de subtítulos.
- Azul láser `#3fa9ff`: hologramas, tildes de visto, láseres de los buenos, la clienta.
- Rojo imperio `#e5484d`: el villano, su nave, alarmas, sellos.
- Desde s11 (Scalerics): verde `#5ce611` para el agente de IA y lo que funciona.
Brillos con drop-shadow del mismo color (1-2 por escena). Prohibido: emojis, fotos, rayas largas
(—) en textos visibles, logos (WhatsApp e Instagram solo como palabra).

## Tipos de letra
Lexend 700-900 para lo grande; IBM Plex Mono 500 para rótulos, horas, paneles. Nada que haya que
leer de menos de 26px (lo decorativo lleva `data-layout-ignore`).

## Zona
Rótulo de episodio arriba (y ~130-180, lo pone ambiente); subtítulos y 236-420. Contenido de
escenas entre y 560 y 1500, x 50-1030. Logo y ~1746.

## Lo que ya está hecho
- `index.html` (lo genera `armar.mjs`), fondo negro espacio con nebulosas roja y azul.
- `compositions/ambiente.html`: estrellas en tres capas que derivan, rótulo "EPISODIO IV · LA
  AMENAZA DEL VISTO" (amarillo) que pasa a "EPISODIO V · EL AGENTE CONTRAATACA" (verde) en
  "Scalerics" (52.20); SALTO AL HIPERESPACIO (estrellas estiradas) en "guerra" (6.61) y en
  "Scalerics"; ALARMA roja en "competencia" (38.0) y "¡No!" (39.76) y en "¡Imposible!" (65.23);
  FLASH en "guerra"; nebulosa verde que crece desde 52.2.
- `compositions/subtitulos.html` (acento amarillo).

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


## Escenas (tiempos relativos a cada escena; exactos en `tiempos.md`)

**s01-crawl** (6.05 s). Tráiler: "Hace mucho tiempo, en un barrio muy, muy lejano... un comerciante dejó un mensaje en visto."
- Cuadro 0: ya se ve, en azul láser, "Hace mucho tiempo, en un barrio muy, muy lejano...." (Lexend
  500, 2 líneas, centrado, y ~860), con las palabras encendiéndose.
- 2.9 se apaga la línea azul; 3.1 "EL VISTO" gigante amarillo con contorno (Lexend 900) entra
  enorme y se aleja hacia el centro hasta desaparecer.
- 3.4 el TEXTO AMARILLO QUE SE ALEJA EN PERSPECTIVA (plano inclinado rotateX): "EPISODIO IV" / "LA
  AMENAZA DEL VISTO" / párrafo de la guerra comercial; sube y se achica hacia el horizonte.
- 5.30 "visto": doble tilde azul gigante que se clava con un golpe, abajo del plano.

**s02-guerra** (1.64 s). "Y empezó la guerra."
- 0.0 el destructor rojo del Imperio (derecha) y la nave vieja (izquierda) frente a frente; 0.2
  láseres rojos y azules que se cruzan; 0.56 "¡GUERRA!" gigante amarillo con sacudón y flash.

**s03-imperio** (1.84 s). Villano: "Soy el Imperio del de enfrente."
- El VILLANO de medio cuerpo, en el puente de su nave (ventanal con estrellas detrás), capa con
  forro rojo, ojos rojos. 0.5 "Imperio": estandarte rojo "IMPERIO DEL DE ENFRENTE" con un emblema
  de toldo de local. 1.34 "enfrente" los ojos destellan.

**s04-planetas** (5.67 s). "Y cada mensaje sin contestar es un planeta que me regalás."
- 0.91 "mensaje": tres globos de chat flotando a la izquierda con doble tilde azul; 1.83
  "contestar" a cada uno le cae "SIN RESPUESTA" rojo. 3.33 "planeta": cada globo se convierte en
  un planeta (con anillo) que vuela a la derecha hacia el destructor rojo; 4.25 "regalás" a cada
  planeta le clavan una bandera roja y aparece el sello "REGALADO".

**s05-holograma** (5.74 s). Clienta (holograma, audio): "Hola, ya sé que son las once de la noche, pero ¿tenés las zapatillas blancas en treinta y ocho?"
- Un proyector chico abajo con un cono azul; la CLIENTA REBELDE en holograma azul (líneas de
  barrido que bajan, parpadeo), con el celular. 1.21 "once": reloj mono "23:00". 2.60 "tenés":
  globo azul "¿Tenés las zapatillas blancas en 38?"; 3.24 "zapatillas" una zapatilla dibujada en
  azul con etiqueta "38" en 4.85. Rótulo "TRANSMISIÓN REBELDE".

**s06-lado-oscuro** (6.93 s). Villano: "Nadie. Silencio en la galaxia. Vení al lado oscuro, querida: acá contestamos en un segundo."
- 0.0 "NADIE": el local del dueño (asteroide con un almacén, persiana baja, cartel "CERRADO") y el
  globo de la clienta flotando solo con "..." que no llega. 0.81 "Silencio": todo se queda quieto,
  rótulo "SILENCIO EN LA GALAXIA". 2.12 "Vení": desde arriba a la derecha baja un RAYO TRACTOR rojo
  del destructor que atrapa el globo y lo sube; 3.31 "oscuro" tinte rojo. 4.83 "contestamos":
  globo rojo de respuesta "¡Sí! Te las guardo" con cronómetro "0:01" en 5.76 "segundo".

**s07-nave-vieja** (7.36 s). Dueño: "¡Pará, pará! ¡Estoy solo en esta nave! ¡Atiendo, cobro, repongo, y a las once me duermo arriba del tablero!"
- La cabina de la nave vieja: tablero con relojes y perillas, una ventanilla con estrellas, un
  parche y humo. El DUEÑO al mando, agarrando el timón, la nave tiembla. 1.09 "solo": rótulo
  "TRIPULACIÓN: 1". 2.34 "ATIENDO", 3.25 "COBRO", 3.72 "REPONGO": chips amarillos que saltan
  alrededor, cada uno con un temblor más. 4.91 "once": reloj "23:00". 5.54 "duermo": cabeza sobre
  el tablero, Zzz; 6.27 "tablero" las luces del tablero titilan rojas.

**s08-competencia** (7.05 s). Villano: "Comerciante... yo soy tu competencia." Dueño: "¡No! ¡No puede ser!"
- El villano gigante en primer plano, con luz roja, que se inclina despacio. 1.65-2.59 "YO SOY TU
  COMPETENCIA" gigante (amarillo, "COMPETENCIA" rojo) con golpe. 4.53 corte: el dueño chiquito en
  una pasarela sobre el abismo, brazos arriba; "¡NOOO!" gigante con sacudón; 5.37 "¡NO PUEDE SER!".

**s09-tripulacion** (4.94 s). Tráiler, se calma: "Pero a este piloto le sobra coraje. Lo que le falta es tripulación."
- La cabina vista de atrás: el asiento del piloto con el dueño y tres asientos vacíos. 0.44
  "piloto": rótulo "PILOTO"; 1.32 "sobra": medalla amarilla en el pecho; "CORAJE: DE SOBRA".
  2.72 "falta": los tres asientos vacíos se marcan con contorno azul punteado y "VACÍO"; 3.51
  "tripulación": cartel "SE BUSCA TRIPULACIÓN".

**s10-esperanza** (4.51 s). Dueño en holograma: "Ayudame, agente de IA. Sos mi única esperanza."
- El dueño en holograma AZUL, de rodillas suplicando, sobre un proyector. 0.62 "agente de IA":
  rótulo azul "MENSAJE PARA: AGENTE DE IA". 2.77-3.21 "única esperanza": "SOS MI ÚNICA ESPERANZA"
  gigante amarillo; al final una chispa verde aparece en el borde (llega alguien).

**s11-agente** (5.89 s). Orus: "En Scalerics armamos tu agente de IA: atiende por WhatsApp e Instagram al instante y a cualquier hora,"
- Salto al hiperespacio verde (ambiente). 0.47 "Scalerics": aparece el COPILOTO verde (agente de
  IA) en el asiento vacío; 1.56 "agente de IA" rótulo verde "AGENTE DE IA · COPILOTO". 3.04
  "WhatsApp" y 3.65 "Instagram": dos pantallas de chat (pestañas con la palabra); 4.17
  "instante": respuesta verde con "0:01"; 5.04 "cualquier hora": reloj que gira.

**s12-precios** (5.55 s). "con tus precios, tu stock y tus horarios, toma pedidos y, cuando es para vos, te pasa la conversación."
- Panel de la nave: tres fichas verdes que se tildan PRECIOS (0.28), STOCK (0.98), HORARIOS
  (1.67). 2.37 "pedidos": ticket "PEDIDO · ZAPATILLAS BLANCAS · 38" con tilde verde. 3.67 "vos":
  una flecha verde lleva el chat del agente al dueño: "TE PASA LA CONVERSACIÓN".

**s13-copiloto** (3.76 s). "Un copiloto que no duerme." Villano: "¡Imposible!"
- 0.0 cabina de noche: el dueño dormido (Zzz), el copiloto verde despierto contestando; reloj
  "03:00"; 0.12 "COPILOTO" rótulo, 1.08 "no duerme". 2.05 corte: el destructor rojo humeando que
  se aleja; "¡IMPOSIBLE!" rojo gigante con sacudón.

**s14-cta** (9.33 s). Orus: "Que la fuerza te acompañe... y el WhatsApp también. Y vos, ¿de qué lado de la galaxia estás? Te leemos en los comentarios."
- 0.17 "QUE LA FUERZA TE ACOMPAÑE" amarillo; 1.69 "...Y EL WHATSAPP TAMBIÉN" verde.
- 2.62-4.19: la galaxia partida en dos: izquierda roja "LADO OSCURO · DEJAR EN VISTO", derecha
  verde "LADO VERDE · CONTESTAR SIEMPRE", con una línea que los divide; 4.19 "estás?" un signo de
  pregunta gigante late en el medio. 4.73 "leemos": globo de comentario "TE LEEMOS EN LOS
  COMENTARIOS" que late hasta el final. Queda ~3 s quieta con vida (estrellas, latido).
