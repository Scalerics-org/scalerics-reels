# Reel "Storytime": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics. Producto de este reel: el SITIO WEB (rápido en el celular,
con horario real, ubicación, menú y botón a WhatsApp), nombrado una sola vez, al final. Formato D
(historia de una clienta) en clave de STORYTIME DE INFLUENCER EN VIVO.

Vale (@vale.comilona, influencer gastronómica inventada, voz Leda, exagerada y graciosa) cuenta en
vivo: "Storytime: casi me pierdo la mejor milanesa de mi vida. Y la culpa fue de su página web."
Le recomiendan un bodegón de barrio (sin nombre). Entra a la página desde el celular: carga,
carga, sigue cargando, "me cebé un mate". Abre y se ve chiquitita ("hago zoom como abuela leyendo
el diario"). Dice "abierto": va, y cortina baja. El menú: un PDF de antes de la pandemia. El mapa:
la mandó a una gomería. El teléfono: no existe. La salva una VECINA (voz Gacrux): "¿Buscás el
bodegón, mija? Golpeá fuerte, que están atrás, fritando." Golpea, abren, y la milanesa: "una
cosa de locos, dorada, del tamaño del plato. Casi lloro en vivo." Le dice al dueño que su página
dice que está cerrado; EL DUEÑO (voz Charon): "¿Página? ¿Para qué? Si acá nos conoce todo el
barrio." GIRO: "El barrio sí. Internet no." (lo mejor del barrio, y en el celular parece
cerrado). Narrador ORUS: "Tu milanesa merece una página a la altura. Hacemos sitios web rápidos
en el celular, con tu horario de verdad, tu ubicación y un botón a tu WhatsApp. ¿Qué lugar
buenísimo casi te perdiste por su página? Contanos en los comentarios."
Voz de 71.8 s (cuatro voces, partes en `partes/`, ver `partes/componer.mjs`), reel de 75 s.

## RECURSO VISUAL CENTRAL: la TRANSMISIÓN EN VIVO
Todo el reel es la pantalla de un vivo (lo pone `compositions/ambiente.html`): barritas de story
arriba (y 44, la del medio se llena en todo el reel), cabecera con avatar, "@vale.comilona",
pastilla roja "EN VIVO" que late y contador de espectadores que sube a saltos (explota con la
milanesa); abajo a la izquierda el CHAT que sube con comentarios cortos de usuarios inventados
(y ~1430-1700, "amiga, volvete" en 32.3, "QUÉ MILANESA" en 40.9...), y a la derecha CORAZONES
dibujados en SVG que flotan en ráfagas (milanesa 41-46 s, cierre 70-73 s) desde un botón de
corazón. Con Orus el chat se apaga a 0.35 y vuelve en el cierre. No pongas nada en esas zonas.

## ESTILO: STORY / VIVO DE DÍA, luminoso, pastel cálido. Edición CARGADA.
Fondo crema con manchas durazno y lila (index). Las escenas son ilustraciones planas con contorno
ciruela grueso (6-7 px) y rellenos pastel, más STICKERS de story: cajas blancas o de color con
borde ciruela y sombra dura desplazada (Lexend 900), textos gigantes con contorno ciruela que caen
de golpe, flechas que se dibujan, sacudones. Personajes: SILUETAS sin cara (Vale con rodete,
vincha durazno y aros dorados, delante de un aro de luz; la vecina con ruleros lila; el dueño con
bigote crema y delantal blanco detrás del mostrador). Nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores y sus opacidades)
- Crema `#fff3e6` (fondo, rellenos claros) y blanco de sticker `#fff`.
- Ciruela `#2b1d2e`: contornos, textos, siluetas.
- Rojo vivo `#ff3b5c`: EN VIVO, corazones, lo que está mal (CERRADO, NO, la culpa) y acento de subtítulos.
- Dorado milanesa `#f5b83d`: la milanesa, la luz, "ABIERTO" mentiroso, stickers de onda.
- Lila `#a78bfa` y durazno `#ff9a78`: ropa, stickers secundarios, bloques del mapa, avatar.
- Desde s14 (Scalerics) se suma verde Scalerics `#5ce611`: la página nueva, el botón, "A LA ALTURA".
Prohibido: emojis (los corazones y el rayo son SVG), fotos, rayas largas (—), logos reales
(WhatsApp solo como burbuja genérica), caras, nombres de locales reales.

## Tipos de letra
Lexend 600-900 para stickers, textos grandes y UI; IBM Plex Mono 500 para URLs, nombres de
archivo y rótulos chicos (decorativos con `data-layout-ignore`). Subtítulos ciruela con borde
crema, acento rojo (`armar.mjs`).

## Zona
Cabecera del vivo y 40-200; subtítulos y 236 a ~420. Contenido de cada escena entre y 560 y
~1420, x 60-1020. Chat x 56-840 y 1430-1700; corazones x 920-1010 y 1300-1720; logo y 1746.

## Lo que ya está hecho
`index.html` y `subtitulos.html` (los genera `armar.mjs`), `ambiente.html` y las 15 escenas.

> **Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de
> arriba**: acá NO es ilustración crema sobre navy con acento verde; es el vivo pastel de arriba.
> Sí valen las reglas técnicas, la entrada/salida, el `.sfx.json` y la verificación.

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

**s01-storytime (5.56 s).** Cuadro 0: sticker blanco gigante "STORYTIME" en rojo entrando
girado; abajo "casi me la pierdo" en pastilla ciruela que tiembla en "casi". "milanesa" (2.25): una
milanesa dorada cae a un plato a la izquierda y aplasta; "vida" (2.92) brillos y sticker dorado
"LA MEJOR MILANESA". "Y la culpa" (3.62-3.75): entra por la derecha un celular con
"www.bodegon..." y la ruedita de carga girando; sticker rojo "LA CULPA" cae; "página web" (4.42)
una flecha roja apunta al celular, que tiembla.

**s02-en-vivo (4.54 s).** Vale (silueta) delante de su aro de luz dorado, saluda con la mano en
"Hola". "vivo" (1.50): cae el sticker rojo "● EN VIVO" y el aro parpadea. "recomiendan" (2.59):
llega un mensaje de @mati_uy "tenés que ir a este bodegón". "bodegón" (3.34): aparece el bodegón
(toldo rayado rojo, cartel "BODEGÓN"); "barrio" (3.75) sticker lila "DE BARRIO".

**s03-carga (7.94 s).** Celular grande con "www.bodegon...", ruedita que gira todo el rato y barra
de carga que casi no avanza (y retrocede en "sigue cargando"). "Carga" (2.19) sticker "CARGA..."
izquierda; "Carga" (3.51) otro a la derecha; "Sigue cargando" (4.89) sticker durazno "SIGUE
CARGANDO" y una telaraña que se dibuja en la esquina. "Me cebé un mate" (6.73): todo se corre,
entra un mate lila con bombilla y vapor, sticker "PAUSA MATE"; la pantalla dice "casi... (mentira)".

**s04-chiquitita (4.71 s).** "Abre" (0): sticker "¡ABRIÓ!" y en el celular la página de
computadora en miniatura; "chiquitita" (1.86): se achica más, rótulo chiquito "chiquitita" con
flecha. "zoom" (2.75): dos dedos que pellizcan y la página se agranda y se sale. "abuela" (3.25):
caen unos lentes redondos gigantes sobre el celular, el celular se aleja y vuelve; sticker lila
"MODO ABUELA".

**s05-cortina (3.61 s).** Celular a la izquierda con "horario" y la pastilla dorada "ABIERTO"
que late en "abierto" (0.79). "Voy" (1.46): sticker "¡VOY!" y pasitos hacia el bodegón de la
derecha. "Cortina baja" (1.99-2.61): la cortina metálica baja y golpea en "baja"; sacudón, sello
rojo "CERRADO" y una X roja sobre el "ABIERTO" del celular.

**s06-pdf (2.69 s).** "menú" (0.17): un documento "MENÚ" con etiqueta roja "PDF" y una barra de
descarga "menu_final_FINAL2.pdf". "PDF" (0.92) el documento se sacude. "pandemia" (1.84): se pone
amarillento, polvo, telaraña y sticker rojo "DE OTRA ÉPOCA".

**s07-mapa (2.04 s).** Mapa pastel de manzanas; "mapa" (0.06) cae el pin rojo; "mandó" (0.81) la
ruta se dibuja y el pin viaja; "gomería" (1.14) aparece una cubierta que gira y "¿¿GOMERÍA??".

**s08-telefono (2.12 s).** Pantalla de llamada oscura "Bodegón · llamando..." con ondas;
"existe" (0.94): sticker rojo "NÚMERO INEXISTENTE" y sacudón. (En el chat: "amiga, volvete".)

**s09-vecina (4.98 s).** La vecina con ruleros asomada a su ventana con plantas, señala la puerta
del bodegón (derecha); "mija" (1.02) sticker lila "LA VECINA: EL GPS". "Golpeá fuerte"
(2.06-2.41): "TOC TOC" gigante dorado y la puerta tiembla. "atrás" (3.06): flecha y sticker
"ATRÁS"; "fritando" (3.52) humo que sube detrás de la puerta y una sartén con burbujas.

**s10-golpeo (3.95 s).** La puerta grande, "TOC TOC TOC" y tiembla. "Abren" (0.90): la puerta
gira, sale luz dorada con rayos que giran. "Y chicos" (1.74): brillos y sticker "Y CHICOS...".
"milanesa" (2.75): la milanesa sale de la luz y crece.

**s11-milanesa (5.05 s).** El platazo con la milanesa enorme y limón. "locos" (0.71) cae "UNA
COSA DE LOCOS" gigante dorado. "Dorada" (1.55) brillos y la línea de brillo titila. "del tamaño
del plato" (2.30-2.96): una flecha roja de borde a borde y "= PLATO". "Casi lloro en vivo"
(3.74-3.96): sticker lila "CASI LLORO EN VIVO" y una lágrima; ráfaga de corazones (ambiente).

**s12-el-dueno (7.57 s).** Vale a la izquierda con su celular que dice "CERRADO"; "dueño" (0.41)
aparece el dueño detrás del mostrador. "página... cerrado" (1.44-2.33): le acerca el celular, que
late. "¿Página?" (3.24): "¿¿PÁGINA??" gigante lila, el dueño se balancea; "¿Para qué?" (4.29)
sticker. "Si acá nos conoce todo el barrio" (5.13-6.19): detrás aparece una fila de casitas con
corazones y el sticker dorado "NOS CONOCE TODO EL BARRIO".

**s13-internet-no (2.99 s).** EL GIRO, pantalla partida: "EL BARRIO" (casitas con corazones y un
tilde dorado en "sí", 0.43) contra "INTERNET" (1.13: un celular con cartel colgado "CERRADO" que
se hamaca) y el sticker "Lo mejor del barrio, y en el celular: CERRADO"; "no" (1.96) cae "NO"
gigante rojo.

**s14-a-la-altura (9.35 s).** ENTRA SCALERICS (verde). "Tu milanesa merece una página a la
altura" (0-1.94): la milanesa en un podio "1"; desde abajo sube un celular con una página linda
en otro podio a la misma altura; línea verde punteada y sticker verde "A LA ALTURA". "Hacemos"
(2.77): sube el celular de la página nueva (BODEGÓN con la milanesa) y el rótulo "SCALERICS ·
SITIOS WEB". "rápidos" (3.61): rayo verde y sticker "RÁPIDA". "horario de verdad" (5.37-5.92):
fila "● ABIERTO AHORA", tilde y sticker "HORARIO REAL". "ubicación" (6.67): mapita con pin verde
"CÓMO LLEGAR". "botón a tu WhatsApp" (7.87-8.52): botón verde con burbuja "ESCRIBINOS" y un toque.

**s15-cta (7.90 s).** CTA. Sticker de pregunta de story (banda lila): "¿Qué lugar buenísimo casi
te perdiste por su página?" con campo "Contanos acá..." y cursor que titila. "Contanos en los
comentarios" (3.24-3.80): sticker dorado "CONTANOS EN LOS COMENTARIOS", burbuja con puntitos y
flecha al chat, que trae "a mí con una heladería", "una pizzería, te juro"; corazones. Queda
hasta el final (sin salida).
