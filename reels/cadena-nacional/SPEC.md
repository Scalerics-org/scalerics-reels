# Reel "Cadena nacional": spec de escenas

Reel vertical 1080x1920 de Scalerics. Formato P (cultura popular): CADENA NACIONAL DE TV. Se
interrumpe la programación (barras de color, "señal interrumpida") y la LOCUTORA OFICIAL (Gemini
Kore, impostada) abre: "Interrumpimos tu scroll. El dueño de este local tiene un anuncio. Y no te
va a gustar." El PRESIDENTE DEL LOCAL (personaje inventado: el dueño, Gemini Algenib, grave y
pomposo), desde el atril con micrófonos, entre cortinas y banderas de fantasía, decreta con
artículos numerados: 1) los WhatsApp se contestan cuando yo pueda; 2) el horario es el que dice el
cartel... que se cayó; 3) el que quiera precio, que pase el lunes. Afuera, cacerolas: el
PERIODISTA en la calle (Gemini Fenrir) y la VECINA (Gemini Leda, con cacerola): le preguntó por una
torta el viernes y le contestaron el martes, el cumple era el domingo; cantito "¡Queremos
respuesta!". GIRO (Algenib quebrado, humano): "La verdad... gobierno solo. Atiendo, cobro, repongo
y contesto. Y no doy abasto." Artículo cuatro: nombra a su nuevo MINISTRO DE ATENCIÓN; se abre el
telón y aparece el agente de IA. ORUS (narrador Scalerics, único momento): un agente de IA que
armamos en Scalerics, contesta al instante a cualquier hora con precios, stock y horarios, toma
pedidos y reservas y te pasa la conversación cuando es para vos. La vecina: "¿Me contestó a las
tres de la mañana? ¡Viva el ministro!" (aplausos). Artículo cinco: el lunes queda derogado.
Cierre (Orus): "¿Lo votás o lo echás? Te leemos en los comentarios."
Nada de política real: sin partidos, políticos ni símbolos patrios reales; escudo (taza humeante
entre laureles, lema "CUANDO PUEDO") y bandera (paño azul con borde dorado y taza roja en un
círculo) inventados.

Recurso visual central: la transmisión oficial (barra EN VIVO · CADENA NACIONAL · 20:00, escudo,
zócalos dorado/rojo, zócalo corrido de "comunicado" que pasa a "último momento" cuando asume el
ministro) y los ARTÍCULOS numerados gigantes (dorado con sombra roja), contra el contraplano de la
calle con cacerolas y carteles.

Voz armada de 14 parlamentos (`partes/01..15.txt` sin 09, `partes/voces.sh`): silencios recortados
(`recortar.sh`), pausas internas acortadas (`pausas.mjs`), atempo 1.08-1.24 y pegados con
0.35-0.9 s (`componer.mjs`, `atempo.json`, `gaps.json`; 0.9 s de cacerolas después del artículo 3 y
0.8 s de aplausos después de "¡Viva el ministro!"). Tiempos: Speech-to-Text de cada parte;
`partes/13.json` corregido a mano con silencedetect. Locución 72.1 s; reel 75.3 s.
Sonidos propios sintetizados (`escenas/sonidos.mjs`): fanfarria oficial, cacerolas, aplausos y redoble.

Las escenas se GENERAN: `escenas/lib.mjs` (molde de composición, helpers, personajes y utilería),
`escenas/a.mjs` (s01-s06), `b.mjs` (s07-s11), `c.mjs` (s12-s17), `escenas/ambiente.mjs` (capa
ambiente). Para cambiar una escena: editar su .mjs, `node escenas/hacer.mjs [sNN]` y `node armar.mjs`.

## ESTILO: TRANSMISIÓN OFICIAL DE TV. Edición cargada.
Fondo azul institucional profundo con brillo dorado al centro; textura de TV vieja (líneas de
barrido, banda clara que baja, parpadeo leve, viñeta). Barra arriba (y 116-188): EN VIVO rojo ·
CADENA NACIONAL dorado · 20:00; escudo chico arriba a la derecha que se mece. Zócalo corrido abajo
(y 1520-1586): pestaña roja "COMUNICADO" con el texto de los decretos; desde 49.3 s pestaña verde
"ÚLTIMO MOMENTO" con el ministro. ZÓCALOS de escena (y 1376-1480): pestaña dorada mono + título
rojo (o azul en la calle y con el ministro) Lexend 800. Sellos rojos rotados ("¡No te va a
gustar!", "Cuando yo pueda", "Que pase el lunes", "¡El martes!", "No doy abasto", "Derogado").
- Presidente: pelo peinado con raya, bigotazo, cejas gruesas, traje azul noche, corbata roja,
  banda presidencial dorada con franja roja y medalla. Atril azul con borde dorado, cuatro
  micrófonos de colores y el escudo al frente. Cortinado azul con borlas doradas y cenefa roja.
- Periodista: campera azul, auricular, micrófono con cubo "CN" dorado.
- Vecina: colita, blusa roja, aros dorados, cacerola con cuchara.
- Gente de la calle: siluetas simples con remeras de la paleta, carteles de cartón ("¡QUEREMOS
  RESPUESTA!", "¿Y EL HORARIO?", "¡CONTESTÁ!", "NO AL «VISTO»") y cacerolas.
- Desde s12 (Scalerics): el agente de IA es una pantalla con cara amable VERDE, auriculares y la
  banda de ministro; chips y detalles verdes.

## Paleta (SOLO estos colores)
- Azul noche `#071640` / `#0e2766`: fondo, tinta, rellenos oscuros.
- Azul institucional `#163a8c`: cortinas, atril, bandera, ropa.
- Dorado `#e0b13a`: artículos, escudo, laureles, bordes oficiales, acento de subtítulos.
- Blanco `#f7f4ea`: caras, contornos, textos, subtítulos.
- Rojo zócalo `#d7262e`: zócalos, EN VIVO, sellos, cenefa, telón.
- Desde s12: verde Scalerics `#5ce611` para el agente de IA.
Prohibido: emojis, fotos, rayas largas (—) en textos visibles, logos o marcas (WhatsApp solo como
palabra), símbolos patrios o políticos reales.

## Zona
Barra y 116-188; subtítulos y 236-420. Contenido de escenas entre y 560 y 1370; zócalo y
1376-1480; zócalo corrido y 1520-1586 (ambiente); logo y ~1746.

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

**s01-interrumpimos** (5.73). Cuadro 0: barras de color de la señal y "SEÑAL INTERRUMPIDA" con
"INTERRUMPIMOS" encima; glitch y 0.5 se cortan; 0.6 el escudo del local con rayos dorados que giran;
0.88 "scroll" cae "TU SCROLL" dorado; 1.75 "dueño" zócalo CADENA NACIONAL · Mensaje del dueño; 3.33
"anuncio" "COMUNICADO OFICIAL DEL LOCAL"; 4.24 "y no te va a gustar" sello rojo "¡NO TE VA A GUSTAR!"
con sacudón. Fanfarria sintetizada desde 0.
**s02-pueblo** (4.83). El despacho: cortinas, cenefa, dos banderas que flamean, el presidente detrás
del atril con micrófonos; 0.34 zócalo EN VIVO · El Presidente del Local; 1.86 "autoridad" brillos en
la banda; 3.80 "decreto" golpe en el atril y sello dorado "DECRETO".
**s03-articulo-uno** (4.39). 0.51 "uno" cae "ARTÍCULO 1"; celular "WhatsApp del local" con mensajes
que llegan desde 1.27 "WhatsApp" (talle M, precio, abren mañana, hola??) y contador 12 → 47 → 99+;
2.21 zócalo DECRETO 1 · Se contesta cuando pueda; 2.88 "yo pueda" sello "CUANDO YO PUEDA", los
mensajes se apagan.
**s04-articulo-dos** (4.82). 0.54 "ARTÍCULO 2"; puerta del local; 1.31 "horario" cuelga el cartel
HORARIO (Lun a Vie 9 a 13 · 16 a 20, más o menos); 2.85 "cartel" se mece; 3.36 se zafa; 4.05 "cayó"
cae al piso con polvo y "(se cayó)".
**s05-articulo-tres** (4.54). 0.6 "ARTÍCULO 3"; calendario LUNES y un cliente con globo "¿Precio?"
(1.7); 2.46 "pase el lunes" sello "QUE PASE EL LUNES", se circula la L; el cliente se va; 3.55
"AFUERA: CACEROLAS" y todo tiembla al ritmo de las cacerolas.
**s06-la-calle** (3.34). Contraplano: la fachada de EL LOCAL con toldo rojo, el periodista con
micrófono CN, gente con carteles y cacerola; 0.43 zócalo EN VIVO · Desde la puerta del local; 2.45
"arde" llamitas en las ventanas y "¡ESTÁ QUE ARDE!".
**s07-torta** (4.22). La vecina con cacerola y su celular: 1.02 "torta" su mensaje "¿Tienen torta
para el domingo?" Vie 20:14; sáb · dom · lun; 2.68 "contestó" llega "Hola! Sí, ¿para cuándo?" Mar
11:02; 3.77 "martes" sello "¡EL MARTES!". Zócalo VECINA · «¡Me contestó el martes!».
**s08-cumple** (1.99). "FELIZ CUMPLE" con guirnalda y banderines; cae un alfajor con una velita y un
gorrito; 0.78 "domingo" sello "ERA EL DOMINGO", "(un alfajor)".
**s09-queremos** (3.47). Cantito: "¡QUEREMOS / RESPUESTA!" gigante en cada repetición (0 y 1.54),
la multitud salta, carteles ("¡CONTESTÁ!", "NO AL «VISTO»", "¿PRECIO?") y cacerolas. Zócalo EN VIVO ·
El pueblo cliente, en la calle.
**s10-gobierno-solo** (7.14). El giro: el presidente solo bajo un foco, cejas tristes, gotas (1.02
"gobierno"), se achica en "solo" (1.53) "GOBIERNA SOLO"; después cuatro paneles que entran en cada
palabra: ATIENDE (2.26), COBRA (3.19), REPONE (3.98), CONTESTA (5.0); 6.21 "abasto" todo tiembla y
sello "NO DOY ABASTO". Zócalo PRESIDENTE · «La verdad... gobierno solo».
**s11-ministro** (4.84). Telón rojo cerrado; el presidente chico al costado en su atril; 1.36
"cuatro" "ARTÍCULO 4"; 2.16 "nombro" se prende el foco; 3.14 "ministro" "?" dorado gigante y el telón
tiembla; zócalo DECRETO 4 · Nuevo ministro de atención. Redoble que remata en "ministro".
**s12-agente** (2.55). Orus. Se abre el telón: el agente de IA verde con auriculares y banda de
ministro; confeti; 0.63 "IA" sonríe y "MINISTRO DE ATENCIÓN"; 1.3 zócalo ASUME · Agente de IA ·
Scalerics. Aplausos suaves.
**s13-contesta** (4.89). Celular "El local": la pregunta de la torta a las 03:12, escribiendo... y
0.49 "instante" la respuesta verde (chocolate o frutilla, $ 890, abrimos de 8 a 20, ¿te la
reservo?); 1.38 "cualquier hora" reloj 03:12 "de madrugada" y luna; chips Precios (2.54), Stock
(3.45), Horarios (4.15).
**s14-pedidos** (4.42). El agente con tickets: 0.15 "pedidos" PEDIDO #14 torta chocolate dom 10 h;
0.78 "reservas" RESERVA sáb 21 h · 4 personas; 1.4 "cuando" globo "¿Me hacen una torta de 3 pisos?";
2.2 "vos" entra el presidente; 2.74 "pasa" flecha verde y el globo viaja hasta él, "PARA VOS".
**s15-viva** (4.12). La vecina mirando el celular (03:12) con la gente; 1.04 "tres" se sorprende;
2.19 "¡Viva" cae "¡VIVA EL MINISTRO!" verde, confeti, carteles "¡GRACIAS MINISTRO!" y "¡A LAS 3 AM!",
todos saltan; aplausos. Zócalo ÚLTIMO MOMENTO · El pueblo festeja.
**s16-derogado** (3.58). 0.54 "ARTÍCULO 5"; el presidente triunfal en el atril y el calendario
LUNES; 2.36 "derogado" cruz roja sobre la L, sello "DEROGADO", confeti, fanfarria. Zócalo
DECRETO 5 · Chau «pasá el lunes».
**s17-cta** (6.43). "¿LO VOTÁS" verde (0.18) / "O LO ECHÁS?" rojo (1.11); urna con la cara del
agente y dos boletas VOTO / ECHO que entran y vuelven; 1.44 "TE LEEMOS EN LOS COMENTARIOS".
