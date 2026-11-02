# Reel "Modo difícil": spec de escenas

Reel vertical 1080x1920 de Scalerics. Producto: AUTOMATIZACIONES. Formato G (simulación de
pantalla): un VIDEOJUEGO SIMULADOR DE VIDA (el género de Los Sims, solo nombrado en la idea; nada
de su interfaz, logos, música ni íconos reales: todo dibujado genérico). Un STREAMER (Gemini
Fenrir, canchero) juega en vivo con HUGO, dueño de un bazar (Gemini Charon, cansado, habla en
tercera persona). Una VOZ DEL JUEGO (Gemini Kore, con eco) anuncia avisos. ORUS (Scalerics) entra
recién con el truco.

Gancho: "Tu vida es un videojuego. Y el que juega es malísimo." Once de la noche: el jugador pone a
Hugo a copiar los pedidos de WhatsApp a la planilla uno por uno ("Hugo copia. Hugo pega."), a
mandar "tu pedido está listo" a cada cliente y recordar el pago al que debe. Voz del juego:
"Necesidad crítica: sueño." "Tranqui": vendió un termo, que actualice el stock de la tienda, que
arme el reporte, "lo pongo en velocidad tres". Hugo no siente los ojos, cenó galletitas. "Atención:
la familia se fue de la casa." "¡Pero Hugo, sos malísimo!" GIRO: Hugo mira a cámara: "Hugo no es
malo. El que juega mal sos vos. Lo ponés a hacer a mano lo que se puede hacer solo." "¿Este juego
tiene trucos?" "Código de trucos: automatizar." ORUS: en Scalerics lo automatizamos (pedidos de
WhatsApp a la planilla solos, el "está listo" sale solo, el stock se actualiza solo, el reporte del
día te llega al celular). Hugo duerme, cena con su familia. Cierre (Orus): "Etiquetá al que juega
su negocio en modo difícil."

Voz: 14 parlamentos (`partes/01..14.txt`, `partes/voces.sh`), silencios recortados
(`recortar.sh`), pausas internas a 0.18 s (0.3 en Hugo, `pausas.mjs`), atempo 1.0-1.1 y pegados con
0.35-0.6 s (`componer.mjs`, `atempo.json`, `gaps.json`); la voz del juego lleva `aecho`. Tiempos:
Speech-to-Text por parte; `partes/02.json` (Hugo copia / pega) armado a mano con silencedetect.
Locución 70.59 s; reel 73.79 s. 188 palabras.

## ESTILO: VIDEOJUEGO ISOMÉTRICO PASTEL
Interfaz de juego de vida inventada: piezas isométricas con piso en damero menta/celeste y dos
paredes (rosa y crema), personajes chibi con contorno tinta, el DIAMANTE flotante sobre la cabeza de
Hugo (verde menta; rojo cuando las cosas van mal; vuelve a verde con el truco), globos de
"murmullo" con un idioma inventado ("¡Grubel nifa!", "Nefi... plub.", "¡Chaufi!"), burbujas de
pensamiento con íconos dibujados (cama), cursor del jugador que hace clic, menú de acciones con
opciones tachadas (Dormir, Cenar, Familia), cola de acciones, avisos del juego.

Capa fija (`compositions/ambiente.html`):
- Arriba (y 112-192): RELOJ del juego "LUN 23:00" con botones de velocidad (pausa, 1, 2, 3). Avanza
  despacio; en "velocidad tres" (30.16) se prende el 3 y el reloj vuela hasta la madrugada; en
  "automatizar" (52.47) el truco lo rebobina a 21:30 y vuelve a velocidad 1. Arriba a la derecha
  pastilla rosa "VIVO" (el stream).
- Abajo (y 1396-1696): PANEL DE NECESIDADES de Hugo (Sueño, Diversión, Familia, Paciencia) con
  barras que se vacían (menta, rojas bajo 26%): copiar/pegar, "crítica" (22.78) sueño al piso y
  titila, "velocidad tres" todo se vacía, "familia" (37.03) familia a cero; desde Scalerics se
  recuperan y en "duerme"/"familia" (65.13/66.63) se llenan. Diamante del panel rojo de 22.78 a
  65.13. Etiqueta "MODO DIFÍCIL" (roja) que en el truco pasa a "TRUCOS: ON" (menta).
- Alarma roja en las esquinas en "crítica" y "familia"; destello menta en "automatizar"; grilla
  isométrica tenue que se desliza.

Piezas compartidas en `assets/juego.js` (las escenas lo cargan con `<script src>`): `HUGO()`,
`DIAMANTE()`, `PIEZA()`, `FAMILIA()`, `GLOBO()`, `NUBE()`, `CURSOR()`. Lo que se anima no lleva
atributo `transform` (GSAP lo pisa): se envuelve en un `<g transform>` y se anima el `<g>` de adentro.
Las escenas se escribieron como fuentes cortas y se armaron con un generador (cabecera común con
`pop`, `golpe`, `sacudon`, `dibujar`, `ojos`, `diamRojo`, `diamGira`).

## Paleta
- Pizarra noche `#182436` / `#0f1826` (tinta, contornos, paneles) / `#2c3f58`.
- Menta `#8fe3b9`: diamante, lo bueno, acento de subtítulos.
- Celeste `#8ccfe8`: camisa de Hugo, piso, reloj.
- Crema `#fbf3dc`: textos, globos, papeles.
- Rosa `#f4a3b8`: delantal, paredes, "VIVO".
- Rojo alerta `#ef5b5b`: diamante rojo, MALÍSIMO, necesidad crítica, MODO DIFÍCIL.
- Desde s12 (Scalerics): verde `#5ce611` para lo que se automatiza.
(Piel `#f2c9a5` y galletita `#e8b878` solo en personajes y objetos.)

## Zona
Reloj y=112-192, subtítulos y 236-420, escenas y 590-1380, panel y 1396-1696, logo y ~1746.

## Escenas
- s01-partida (0-2.78): pieza isométrica con Hugo; "TU VIDA ES UN / VIDEOJUEGO" cae en
  "videojuego"; el diamante aparece y gira; en "juega" entra el cursor y hace clic sobre Hugo; en
  "malísimo" sello rojo "JUGADOR · MALÍSIMO" y sacudón.
- s02-chat (2.78-7.00): chat del stream a la izquierda (usuarios inventados); en "Hugo" la ficha
  del personaje (busto, "HUGO", "Dueño de un bazar", rasgos Laburador/Cumplidor/Cansado en "bazar");
  en "once" el reloj 23:00 con la luna.
- s03-orden (7.00-11.48): clic sobre Hugo: menú de acciones; Dormir, Cenar y Familia tachadas; el
  cursor elige "Copiar pedidos" en "pedidos"; "UNO POR UNO" cae en "uno".
- s04-copia (11.48-16.79): Hugo detrás del mostrador; celular con pedidos y planilla; en cada
  "copia"/"pega" un mensaje vuela a la planilla y aparece la fila; globo "¡Grubel nifa!"; en
  "dormir" ojos caídos, ojeras y nube con la cama.
- s05-listo (16.79-21.96): "ni ahí": el cursor cancela la nube de la cama; celular de chats: "Tu
  pedido está listo" vuela a cada chat uno por uno; en "recordale" el cuaderno "DEBEN" y en "pago"
  la campana roja.
- s06-critica (21.96-24.88): aviso "NECESIDAD CRÍTICA"; Hugo gigante; en "crítica" el diamante se
  pone rojo y sacudón; en "sueño" aparece SUEÑO, cierra los ojos, cabecea, Zzz.
- s07-velocidad (24.88-31.00): cola de acciones (termo, tienda, reporte) que se llena; termo en el
  mostrador "VENDIDO EN EL LOCAL"; la tienda online con el stock cambiado a mano; el reporte
  línea por línea; en "velocidad" ">>>" gigante y en "tres" "VELOCIDAD 3": Hugo va y viene a mil.
- s08-galletitas (31.00-35.91): primer plano de Hugo, diamante rojo, ojeras; "Nefi... plub."; en
  "ojos" tic y venitas; en "cenó" el paquete de galletitas; migas en el bigote en "galletitas".
- s09-familia (35.91-39.91): aviso "ATENCIÓN · La familia se fue de la casa"; Hugo tecleando de
  espaldas; la familia ("¡Chaufi!") se va con la valija por la puerta; portazo en "casa".
- s10-cuarta-pared (39.91-48.14): clics furiosos y "¡MALÍSIMO!"; en "Hugo no es malo" Hugo mira a
  cámara (zoom), pastilla "HUGO NO ES MALO"; en "sos vos" señala a cámara, "SOS VOS" y el cursor
  queda tachado; en "mano" pastilla roja "A MANO" y en "solo" menta "SOLO".
- s11-trucos (48.14-54.14): "¿QUÉ?" y "¿TRUCOS?"; consola "CÓDIGO DE TRUCOS" donde se escribe
  "automatizar"; "TRUCO ACTIVADO", destellos, el diamante vuelve a verde.
- s12-planilla (54.14-58.69): pastilla "SCALERICS · AUTOMATIZACIONES" en "Scalerics"; engranaje
  verde que gira; en "pasan solos" los cinco pedidos vuelan a la vez a la planilla con tildes.
- s13-solo (58.69-62.14): los tres "Tu pedido está listo" salen solos con doble tilde, sello
  "SOLO"; LOCAL y TIENDA con flecha verde: el stock de la tienda se actualiza; "SE ACTUALIZÓ SOLO".
- s14-duerme (62.14-67.70): el celular a las 21:30 recibe "Reporte del día" con barras; Hugo
  duerme (Zzz, diamante verde); Hugo cena con la familia, corazón.
- s15-cta (67.70-73.79): menú "ELEGÍ LA DIFICULTAD" (Fácil con trucos / Normal / Difícil todo a
  mano); el cursor elige Difícil en "difícil" (se pone rojo); "@ ETIQUETALO"; el borde de "Fácil"
  se pone menta y el cursor va hacia ahí.

> Lo que sigue es la base de los reels anteriores. Donde choca con lo de arriba, MANDA lo de arriba
> (paleta pastel con rellenos, no líneas crema). Valen las reglas técnicas, la entrada/salida, el
> `.sfx.json` y la verificación.

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

