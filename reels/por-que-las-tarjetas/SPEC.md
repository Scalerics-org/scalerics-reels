# por-que-las-tarjetas · explicador "¿Por qué…?" (~34 s estimados, 3D real)

"¿Por qué el mejor vendedor de autos le mandaba tarjetas a los que ya le compraron?". Desenlace en la frase 2:
"Porque volvían." (según él: gran parte de su éxito fueron clientes que volvían, joegirard.com). Prueba: Joe Girard,
récord Guinness de autos vendidos en un año (1.425 en 1973; la categoría se retiró en 2018). Bisagra "¿Por qué?".
Giro: la tarjeta no vendía nada; cada mes decía «Me caés bien» ("I like you", Cialdini y Goldstein 2002). Lección: al
que ya te compró no hay que convencerlo, hay que acordarse. Callback: Rubén (voz Algenib): "¿Walter? ¿Hace cuánto que
no viene?"; el sistema sabe (tres semanas) y le escribe solo un mensaje con la forma de la tarjeta, sin oferta; el
sábado Walter volvió. Cierre: videollamada gratis.
**Producto: CRM** (quién compró qué y cuándo, aviso del que deja de venir, mensaje que sale solo). Persona real (Girard)
nombrada en positivo y NUNCA dibujada (ni cara ni silueta): solo sus cosas. Sin marcas (autos genéricos sin escudo;
"Guinness" solo como texto). Voz: Orus + una línea de Rubén (Algenib), ver `plan.md` > Voces. `guion.txt` es el texto
de pantalla (89 palabras); para la voz, `partes/guion-voz.txt` (y `orus1.txt`, `ruben.txt`, `orus2.txt`).
Plan completo con SFX y cuidados por escena en `plan.md`: este SPEC es el resumen operativo; si chocan, manda este.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro, sin rAF, sin Date.now, azar con
semilla) con la base técnica de `reels/por-que-devolver-gratis` y `reels/por-que-el-recordatorio` (luces, PMREM,
cámara por claves Catmull-Rom monótona, nube de pensamiento, "?" verde, gen.mjs para la capa HTML, `assets/firma.json`)
y los personajes de `reels/anotamelo/assets/personajes.js` (Rubén = ELENCO.almacenero, Walter = ELENCO.walter; crearMate,
crearCelular, crearYerba, crearGalletitas, crearAlmanaque, crearPapelito). Objetos nuevos: `crearAuto70()`,
`crearBuzon()`, `crearSobre()`, `crearTarjeta(frente)`, `crearMegafono()`, números 3D con `lexend800.js`.
**El objeto que viaja: LA TARJETA** (cartulina crema con borde verde grueso, se abre como libro, adentro "I like you" y
la firma "Joe Girard") **y su SOBRE** (crema, estampilla verde): sale del buzón en s02, se abre y suelta el "?" en s05,
se lee en s06-s07, aterriza en el mostrador de Rubén en s09, y vuelve con LA MISMA FORMA como el mensaje del CRM que
vuela al celular de Walter en s12 (y en cada ficha en s14).
Las escenas HTML (`gen.mjs`) son SOLO la capa plana: gancho, subtítulos, rótulos con línea guía, créditos y la tarjeta
de cierre. `armar.mjs` escribe `assets/tiempos3d.js` (inicio de cada escena y de cada palabra).

**Fondo navy oscuro `#0b1220` LISO** (html/body/#fondo y fondo de la escena 3D), piso invisible con `ShadowMaterial`,
sin degradés ni brillos; la ventana iluminada de s01 en `#e9a65a` plano. El almacén de Rubén (s09-s14), sábado a la
mañana: pared crema `#efeee5`, zócalo navy claro `#16243d`, estantería verde, luz de mañana fría. Verde `#5ce611` = lo
resuelto y la simpatía (estampillas, borde de la tarjeta, tildes); rojo apagado `#c7655b` SOLO para el problema (el
megáfono de s08, el contador "21 días" de s11). Cierre en verde con letras navy. Subtítulos: arriba al centro, 1-3
palabras, 86 px, Lexend 800 crema con borde navy oscuro de 14 px (en el almacén, navy con borde blanco de 16 px),
palabra clave en recuadro verde con texto navy. Rótulos: placa crema con texto navy y borde verde, línea guía de 7 px,
≥ 36 px. Créditos de datos: mono crema 34-38 px arriba, debajo de los subtítulos. Base general de estilo y helpers:
`SPEC-base.md` (copiado abajo; lo que dice este SPEC manda sobre SPEC-base: fondo, color de subtítulos, rótulos, 3D).

## reel.json propuesto (índices sobre `guion.txt`, 89 palabras, 0 = "¿Por")
- `escenas`: s01-gancho 0, s02-tarjetas 7, s03-volvian 16, s04-record 22, s05-por-que 30, s06-nada 32, s07-me-caes 37,
  s08-convencer 43, s09-acordarse 52, s10-ruben 55 (voz de Rubén), s11-sistema 61, s12-escribe 66, s13-volvio 73,
  s14-ninguno 77, s15-llamada 85.
- `acento`: volvían 17, Girard 21, Guinness 23, tarjeta 33, nada 36, caés 41, bien 42, compró 47, convencerlo 51,
  acordarse 54, Walter 55, sistema 62, semanas 65, escribe 68, vender 71, volvió 76, olvide 81, videollamada 85,
  scalerics 88.
- `subDesde` 16 (el gancho del cuadro 0 es la capa grande, se queda en s01 y s02; el karaoke arranca en "Porque"),
  `subFin` 85.
- Pausas a agregar en la voz: +0,3 s antes de "¿Por qué?" (30), +0,25 s después de «bien» (42), +0,3 s después de
  "acordarse." (54), 0,45 s antes y 0,4 s después de la línea de Rubén (55-60), +0,3 s antes de "El sábado" (73),
  +0,3 s al final.
- La línea de Rubén (55-60) va en el subtítulo con una etiquetita "Rubén" (mono verde 30 px) a la izquierda del
  bloque, para que sin sonido se entienda que habla él.

## Escenas (segundos globales estimados; los reales salen de armar.mjs)
| # | id | arranca | dura | frase | plano 3D |
|---|----|---------|------|-------|----------|
| 1 | s01-gancho | 0,0 | 2,4 | ¿Por qué el mejor vendedor de autos | picado al auto VENDIDO de noche, buzón |
| 2 | s02-tarjetas | 2,4 | 3,1 | le mandaba tarjetas a los que ya le compraron? | bajada al buzón, entran sobres |
| 3 | s03-volvian | 5,5 | 2,0 | Porque volvían. Lo contaba Joe Girard, | grúa: la calle, los autos vuelven |
| 4 | s04-record | 7,5 | 2,9 | récord Guinness de autos vendidos en un año. | estacionamiento en grilla + "1.425" |
| 5 | s05-por-que | 10,4 | 1,3 | ¿Por qué? | el sobre solo suelta el "?" |
| 6 | s06-nada | 11,7 | 1,7 | La tarjeta no vendía nada. | la tarjeta; "$" y "OFERTA" se caen |
| 7 | s07-me-caes | 13,4 | 2,3 | Decía, cada mes: «Me caés bien». | se abre: "I like you"; abanico de 12 |
| 8 | s08-convencer | 15,7 | 3,0 | Al que ya te compró no hay que convencerlo. | tarjeta vs megáfono que se apaga |
| 9 | s09-acordarse | 18,7 | 1,7 | Hay que acordarse. | la tarjeta vuela al mostrador de Rubén |
| 10 | s10-ruben | 20,4 | 2,6 | (Rubén) ¿Walter? ¿Hace cuánto que no viene? | plano medio de Rubén, yerba con papelito |
| 11 | s11-sistema | 23,0 | 1,8 | El sistema sabe: tres semanas. | celular: ficha de Walter, "21 días" |
| 12 | s12-escribe | 24,8 | 2,5 | Y le escribe solo, sin vender nada. | el mensaje-tarjeta vuela a Walter |
| 13 | s13-volvio | 27,3 | 1,8 | El sábado, Walter volvió. | campanita, Walter entra, "hoy" ✓ |
| 14 | s14-ninguno | 29,1 | 2,6 | ¿Que no se te olvide ninguno? Agendá una | lista de clientes se prende en verde |
| 15 | s15-llamada | 31,7 | 2,9 | videollamada gratis en scalerics.com. | cierre verde, tarjeta chica con tilde |

## Brief por escena
1. **s01-gancho** · cuadro 0 = portada en movimiento: de noche, picado 3/4 del auto de los 70 (crema, techo navy claro,
   ~80 % del ancho) en la entrada de una casa (pedazo de fachada crema con ventana `#e9a65a`), etiqueta verde "VENDIDO"
   colgando del espejo (≥ 44 px), buzón de pie a la izquierda. Gancho Lexend 900 crema con borde navy, 112-124 px, y
   130-640: "¿Por qué el **mejor vendedor**" / "de autos le mandaba" / "**tarjetas** a los que" / "ya le compraron?".
   En "mejor" pop de la etiqueta; en "autos" los faros parpadean. Push-in bajando hacia el buzón.
2. **s02-tarjetas** · el buzón llena ~60 % del alto; en "mandaba" entra un sobre (estampilla verde) por la ranura y la
   banderita verde sube; en "tarjetas" 2 sobres más con almanaque chico (OCT, NOV, DIC). En "compraron" órbita corta:
   el auto VENDIDO atrás, legible. Crédito "Así lo nombró Guinness". Rótulo "Ya le había comprado" al auto. El gancho
   sale con blur al final de la escena.
3. **s03-volvian** · grúa atrás y arriba: calle de 5-6 casas con buzón (banderitas arriba) y auto crema cada una; en
   "volvían" los autos salen marcha atrás y forman una fila hacia una concesionaria genérica (fachada navy claro,
   cartel crema "AUTOS", banderines verdes) que se prende. Fila grande en primer plano. Crédito "Según él: gran parte
   de sus ventas, clientes que volvían".
4. **s04-record** · picado sobre el estacionamiento: autos crema en grilla con pop por filas; arriba, limpio, "1.425" 3D
   (crema con canto verde, ~70 % del ancho) en "Guinness" y "1973" verde chico debajo en "año". Crédito "Récord Guinness
   · la categoría se retiró en 2018". Rótulo "Autos en un año" al número. Grilla entera en cuadro.
5. **s05-por-que** · BISAGRA, un solo objeto: caída en picado hasta un sobre solo al centro; en "qué" la solapa se abre y
   sale el "?" 3D verde con borde navy (~55 % del alto) con resorte. Push-in y órbita de 15°. Sin rótulos, dentro del
   80 % seguro.
6. **s06-nada** · sale la tarjeta (frente con hoja de otoño, borde verde, ~70 % del alto); en "vendía" flotan una
   etiqueta "$" y un cartel "OFERTA" (gris/rojo apagado); en "nada" se caen fuera de cuadro y la tarjeta queda sola.
   Crédito "Cambiaba el dibujo según la fecha. El texto, nunca." Rótulo "Ni un precio".
7. **s07-me-caes** · en "Decía" la tarjeta se abre como libro: "I like you" a mano, grande, navy, y la firma "Joe Girard"
   (≥ 48 px). En "cada mes" retroceso: abanico de 12 tarjetas abiertas (frentes distintos, mismo texto) y almanaque que
   pasa hojas; en "bien" vuelven a ser una. Crédito "Una por mes, a cada cliente · según contaba, unas 13.000 por mes".
   (Fondo de la portada: la tarjeta abierta.)
8. **s08-convencer** · tarjeta de pie a la derecha; megáfono (navy claro, aro rojo apagado) a la izquierda apuntándole;
   en "compró" tilde verde 3D sobre la tarjeta; en "convencerlo" el megáfono vibra, se apaga a gris y rueda fuera.
   Push-in a la tarjeta. Rótulo "Ya es tu cliente".
9. **s09-acordarse** · la tarjeta vuela hacia cámara, la cámara la sigue y aterriza parada contra el frasco de caramelos
   del mostrador de Rubén (sábado a la mañana). Nunca pantalla lisa. Pausa: Rubén entra en foco atrás con el mate.
10. **s10-ruben** · plano medio de Rubén (~60 % del ancho), mate en la izquierda, mira el estante: yerba con papelito
    "Walter" (Caveat) y 2-3 motas de polvo que caen (sin telaraña). "¿Walter?": cejas arriba; "¿Hace cuánto…?": se
    rasca la cabeza, cejas de duda, ojos abiertos, boca sincronizada; nube con un almanaque borroso y un "?" chico.
    Contraplano de 0,5 s a la tarjeta de Girard en el mostrador. Rótulo "Walter · yerba de siempre" al papelito.
11. **s11-sistema** · el celular de Rubén se levanta y gira; push-in a ~65 % del alto: ficha "Clientes · Walter" (avatar
    "W" verde, "Compra siempre: yerba 1 kg, galletitas", "Última compra:") y contador 3D "21 días" rojo apagado que
    llega en "semanas"; línea de 3 semanas vacías en gris. Rótulo "Avisa quién dejó de venir".
12. **s12-escribe** · de la ficha sale el mensaje con la forma de LA TARJETA (crema, borde verde) y vuela, la cámara lo
    sigue, al celular de Walter (ELENCO.walter, mañana en su casa con una taza; plano medio): "Walter, ¿todo bien? Hace
    rato que no te vemos. Acá estamos. · Almacén de Rubén" (≥ 40 px), sin precio, cupón ni botón de compra. Walter
    sonríe. Contraplano 0,5 s: Rubén toma mate sin tocar el celular. Rótulo "Sin oferta. Como la tarjeta".
13. **s13-volvio** · tras la pausa: campanita, entra Walter sonriendo; Rubén baja la yerba con su papelito y se la da;
    almanaque de pared "SÁBADO". En "volvió" la ficha del celular pasa a "Última compra: hoy" con tilde verde y el
    contador rojo se apaga.
14. **s14-ninguno** · push-out: la lista de Clientes (Walter, Graciela, Héctor, Marta, Nico, Susana) en fichas grandes; a
    cada ficha con días en rojo se le posa una tarjetita crema con borde verde y pasa a verde, en cascada. Rubén
    levanta el mate. Sin rótulo.
15. **s15-llamada** · fondo verde: "Videollamada" / "gratis" / "scalerics.com" (navy sobre placa crema), logo, y la
    tarjeta 3D cerrada chica abajo con tilde. Arranca sobre "videollamada", 2,5-3 s.

## Cuidados (lo que el director de arte va a buscar)
- **Girard no aparece dibujado** en ningún cuadro (ni de espaldas, ni silueta, ni mano que firma): solo la firma escrita.
- Autos sin escudo, sin moño, sin parrilla de marca; "Guinness" sin logo ni colores.
- "1.425" y "1973" no nacen dentro de un auto ni los pisan; la grilla de autos y el abanico de 12 tarjetas, enteros
  dentro del cuadro.
- Ninguna pantalla lisa en los viajes (s04 → s05 caída: siempre un auto o el sobre en cuadro; s09: la tarjeta en cuadro
  todo el viaje).
- El sobre entra por la ranura del buzón sin atravesarlo; tarjetas del abanico escalonadas en Z, sin atravesarse.
- Rubén: la mano que rasca no atraviesa la pelada, el mate no atraviesa el bigote, la nube no tapa la cara, ojos
  abiertos mientras habla. Rubén y Walter: manos que no se atraviesan en la yerba.
- El mensaje de s12 se lee como la tarjeta del gancho (mismo borde verde) y NO tiene precio ni oferta.
- No parecerse a `me-lo-guardas` (sin estante GUARDADOS, sin telaraña) ni a `por-que-la-tarjeta` (sin tarjeta de
  puntos ni ofertas).
- Ortografía: "VENDIDO", "AUTOS", "I like you", "Joe Girard", "1.425", "Última compra", "21 días", "Walter, ¿todo bien?
  Hace rato que no te vemos. Acá estamos.", "Almacén de Rubén", "SÁBADO".

## Sonido
SFX de `assets/sfx` (detalle por escena en `plan.md`). Faltan motor de auto viejo y tapa de buzón metálica: si se
suman, CC0 real con autor, sitio y licencia en `fuentes.md`; si no, `riser-corto` muy bajo y `tac-real`. TECHO -31 LUFS
por efecto (armar.mjs), cama `bed.mp3` con sidechain a la voz (también bajo la línea de Rubén).

---

# SPEC-base (del molde; para lo plano. Lo de arriba manda)

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

