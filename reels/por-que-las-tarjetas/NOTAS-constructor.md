# Notas del constructor · por-que-las-tarjetas (12-11)

Duración: **34,23 s** (voz 34,11 s). `check --json`: ok, 0 errores (warnings: canvas al borde, estructura del #fondo,
console de WebGL, y "line_unread" de rótulos/créditos de 1,1-1,8 s que no entran más en su escena).
No se renderizó el mp4 ni se hizo commit (lo hace el coordinador).

## Cómo regenerar (desde la carpeta del reel)
1. Voz: `node partes/armar-voz.mjs` (tomas elegidas `partes/orus1-2.wav`, `partes/ruben-2.wav`, `partes/orus2-1.wav`;
   pausas normalizadas, ganancias por parte) → `assets/voice/locucion.wav`.
2. Tiempos: `node ../../herramientas/tiempos.mjs assets/voice/locucion.wav partes/guion-voz.txt partes/pal-stt.json`
   y `node partes/ajustar-tiempos.mjs` (arreglos a mano sobre silencedetect; junta "Scálerics punto com" en
   "scalerics.com." → 89 palabras como guion.txt).
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (envolvente de 19,0-21,7 s a 30 fps).
4. `node gen.mjs && node armar.mjs` (gen escribe las escenas HTML, sus .sfx.json y `assets/firma.json`; armar escribe
   index.html, subtítulos, tiempos.md, `assets/tiempos3d.js` y la cama recortada con sidechain).
5. Portada: `LIMPIO=1 node armar.mjs`, snapshot a 12,95 s → `portada-src/fondo-limpio-12.95.png`; corrida 270 px hacia
   arriba → `portada-src/fondo-portada.png` (la que usa portada.json); `node armar.mjs` para volver. OJO:
   `herramientas/portada.mjs` igual pide el mp4 aunque haya `fondo_limpio`: sin render, se le pasó un mp4 de 0,2 s
   hecho con ese PNG en `renders/` y se borró después. Con el render final se puede volver a correr tal cual.
6. Fuente 3D: `assets/vendor/three/lexend800t.js` (subconjunto "0-9 . , ? d í a s D Í A S") con
   `python3 partes/fuente3d.py assets/fonts/Lexend-var.woff2 assets/vendor/three/lexend800t.js "0123456789.,?díasDÍAS "`
   (necesita `python3 -m pip install fonttools brotli`).

## Voz
- Orus (2 tomas por parte) + Rubén (Gemini Algenib, 2 tomas). Elegidas: orus1-2 (el STT oye "yo girar" = "Joe
  Girard" dicho en inglés; la toma 1 decía algo como "yo Gerardo"), orus2-1 (la 2 decía "lo escribe"), ruben-2 (2,4 s).
  No hizo falta regenerar "Joe Girard" con otra grafía. "Scálerics punto com": el STT oye "escalera ix punto", como en
  todos los reels con Orus.
- Pausas: 0,55 s antes de "¿Por qué?", 0,62 s después (el "?" en pantalla), 0,42 s después de «bien», 0,7 s antes de
  Rubén y 0,4 s después, 0,62 s antes de "El sábado", 0,3 s al final.
- "oyó" de la locución armada: igual al guion salvo "acordar Walter" (palabras pegadas) y el dominio.

## Escenas (segundos globales)
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | picado 3/4 del auto de los 70 de noche, cartel VENDIDO en el parabrisas (pop en "mejor"), faros que parpadean en "autos", buzón y casa |
| 2 | s02-tarjetas | 1,60 | bajada al buzón: 3 sobres con estampilla entran por la boca (la puerta se abre y cierra), la banderita sube; órbita al auto VENDIDO ("Ya le había comprado") |
| 3 | s03-volvian | 4,36 | grúa: la calle de 6 casas, los autos salen y se ponen en fila hacia la concesionaria "AUTOS" (se prende) |
| 4 | s04-record | 6,96 | el estacionamiento en grilla (12 autos, pop por filas), "1.425" 3D en "Guinness", "1973" en "año" |
| 5 | s05-por-que | 9,62 | la cámara cae en picado al pasillo: el sobre solo; se abre la solapa y sale el "?" verde |
| 6 | s06-nada | 10,61 | sale la tarjeta (hoja de otoño); "$" gris y "OFERTA" rojo apagado flotan y se caen en "nada"; "Ni un precio" |
| 7 | s07-me-caes | 12,31 | la tarjeta se abre: "I like you" / firma "Joe Girard"; abanico de 11 tarjetas con los 12 dibujos y almanaque que pasa los meses; en "bien" se cierra |
| 8 | s08-convencer | 15,13 | megáfono (navy + aro rojo) apunta a la tarjeta; tilde en "compró"; en "convencerlo" vibra, se apaga a gris y se cae; push-in |
| 9 | s09-acordarse | 17,61 | la tarjeta vuela hasta tapar la cámara (corte escondido a 18,03) y aterriza contra el frasco de caramelos del mostrador de Rubén (18,45) |
| 10 | s10-ruben | 19,18 | plano medio de Rubén (boca por amplitud); mira la yerba con el papelito "Walter"; se rasca la cabeza; nube con almanaque que pasa hojas y "?"; contraplano 21,45 a la tarjeta |
| 11 | s11-sistema | 21,95 | el celular se levanta y queda apoyado en el termo; ficha "Clientes · Walter", contador 3D rojo que cuenta hasta "21 días" en "semanas" |
| 12 | s12-escribe | 24,46 | el mensaje con LA forma de la tarjeta sale de la ficha, tapa la cámara (25,10) y se posa en el celular de Walter (25,44); 26,04 Walter sonríe; 26,41 Rubén con el mate y la yerba ya en el mostrador |
| 13 | s13-volvio | 26,96 | campanita, entra Walter, Rubén le arrima la yerba en "Walter"; 28,25 inserto del celular: "Hoy" + tilde + "Volvió" |
| 14 | s14-ninguno | 29,20 | la lista de Clientes: tarjetitas que se posan en cada fila roja y pasan a "Le escribió" (verde), en cascada |
| 15 | s15-llamada | 31,30 | cierre verde: "Videollamada gratis / scalerics.com", tarjeta 3D (borde navy, corazón) con tilde (2,93 s) |

## Objetos nuevos (assets/tres.js)
Auto de los 70 (partes compartidas; suelto para el del gancho, InstancedMesh para la calle y el estacionamiento; sin
escudo), buzón de pie (puerta con bisagra, banderita), sobre (estampilla dentada con tilde, solapa articulada), la
tarjeta (dos hojas de cartulina extruidas con esquinas redondeadas, bisagra en el lomo, 12 frentes dibujados en canvas:
hoja, corazón, calabaza, árbol, estrella, trébol, regalo, sol, copo, flor, campana, globo; interior "I like you" +
firma en Caveat), cartel VENDIDO, la calle (casas, vereda, concesionaria "AUTOS" con banderines), "1.425"/"1973" 3D,
precio "$" y cartel "OFERTA", megáfono, frasco de caramelos, almacén de mañana (vidriera clara, almanaque "SÁBADO"),
celular con páginas ficha/lista/chat, contador 3D "N días", casa de Walter. Personajes y utilería de
`reels/anotamelo/assets/personajes.js` (copiado). Girard no aparece dibujado en ningún cuadro.

## Sonido
Todo de `assets/sfx` (copiado de por-que-devolver-gratis) más `hoja.mp3` y `cierra.mp3`, conversiones a mp3 de
`k-book_flip_1.wav` y `k-book_close.wav` de reels/anotamelo (Kenney "RPG Audio", CC0; anotado en fuentes.md). Sin motor de auto (no hay CC0 en el repo; el plan lo dejaba opcional).
Mezcla (`python3 partes/medir.py`, pre-loudnorm): I -16,5 LUFS, pico -3,9 dBFS. Tramos de 0,5 s con menos de 6 dB:
5,0 (3,1: cola de "volvían." + pausa, la cama sube en la pausa), 24,0 (-2,5: pausa entre "semanas." y "Y"; medido de
a 0,1 s la voz le gana cuando suena), 26,5 (5,9). Bajé whoosh-cinematic de s03 y la notification de s11; saqué el
riser de s03.

## Pasadas de snapshots
- Pasada 1 (cada 0,5 s, 0-34 s): gancho con el auto cortado y sin VENDIDO visible → cámara desde la izquierda y el
  cartel en el parabrisas; buzón demasiado cerca; viaje calle → estacionamiento con cuadros vacíos → estacionamiento
  pegado a la concesionaria (x 66) y los autos aparecen antes; "1.425" chico y debajo de los subtítulos → más grande y
  más bajo, sin sombra en el piso; "1973" asomando en la caída → se va antes; autos del estacionamiento y líneas en el
  "?" → se esconden en "qué"; tarjeta de s06 cortada en los bordes y crédito encima → cámara más lejos, créditos
  abajo; "$"/"OFERTA" cortados → más chicos y adentro; abanico más bajo (almanaque fuera de los subtítulos); megáfono
  cortado → cámara más atrás; termo delante de Rubén → movido a la derecha con el celular; nube tapando la cara →
  más a la izquierda; ficha bajo los subtítulos → celular más abajo en cuadro; el mensaje quedaba detrás de la
  pantalla de Walter (z) → adelante; Walter demasiado cerca → plano medio; tilde de "Hoy" pisando la H; tarjetitas
  de la lista detrás de la pantalla; tarjeta del cierre detrás de "scalerics.com" → más abajo, borde navy.
- Pasada 2 (cada 0,5 s desfasada 0,25 s): VENDIDO tapado por el buzón → buzón 0,7 m más a la izquierda; órbita de
  "compraron" con el cartel cortado → cámara corrida y la guía apunta al cartel; tarjeta naciendo bajo el logo en s06 →
  sale más rápido; "OFERTA" cortado; "Ni un precio" de 0,1 s → 0,6 s; Rubén gigante y cortado al aterrizar la tarjeta →
  cámara más atrás; rótulo de la yerba apuntando a la nube → aparece antes y se va al llegar la nube; tarjetita que
  asomaba fuera del celular; rótulos cortos alargados ("Cambiaba el dibujo", "Avisa quién", "Sin oferta").
- Verificación de los arreglos con cuadros puntuales: sin defectos altos.

## Dudoso / para el revisor
- Las transiciones con la tarjeta tapando la cámara (18,0 y 25,1) muestran 2-4 cuadros de tarjeta gigante (es el
  "objeto en cuadro"; confirmar que no lea como error).
- Rubén queda un poco cortado a la derecha en 18,3-18,7 (la cámara viene de la tarjeta).
- s13: Walter entra mirando a cámara de 3/4, no de frente al mostrador; no se dan la yerba en la mano (Rubén la arrima
  sobre el mostrador; ya estaba preparada: el sistema avisó).
- La nube de s10 tapa la yerba de Walter (el rótulo ya se fue cuando aparece).
- En los insertos del celular el termo hace de fondo crema grande.
- "line_unread" de check en créditos de 1,1-1,8 s (escenas cortas).

## Ronda 1 de corrección (3 revisores sobre el MP4)
Duración nueva **34,36 s** (voz 34,24 s; cierre 2,88 s). Inicios: s02 1,60 · s03 4,36 · s04 6,96 · s05 9,62 · s06 10,79 ·
s07 12,49 · s08 15,31 · s09 17,79 · s10 19,36 · s11 22,13 · s12 24,64 · s13 27,14 · s14 29,38 · s15 31,48.

Guion y datos: 1 el frente de LA tarjeta es un corazón grande (la hoja de 7 puntas, fuera de todos los planos; en el
abanico, regalo con moño y una torta en su lugar) y la portada se rehízo · 2 "les mandaba" en el gancho del cuadro 0
y en descripcion.txt; "Les escribía a los que" en portada.json (la voz quedó igual) · 3 la yerba sin papelito (paquete
"YERBA MATE 1 kg" sin nombre) y el rótulo "Lo que lleva Walter: yerba", centrado en x 420 (no toca el borde) ·
4 "El texto, nunca." · 5 descripcion.txt: "le manda un mensaje automático en el momento justo, sin oferta" ·
6 portada sobre la página "I like you" (recorte del cuadro limpio de 13,0 s; sin la página izquierda vacía).

Arte: 7 sin subtítulos mientras el mensaje-tarjeta tapa la cámara ("solo," sale de los subtítulos: reel.json sinSub y
la capa de subtítulos se apaga de escribe+0,12 a sin−0,06); el mensaje tapa la cámara a 0,42 m y escala 0,2 (entra
entero); texto del mensaje ajustado al ancho; el chat de Walter más lejos y más abajo (el encabezado queda debajo del
subtítulo); sin "Sábado" · 8 desde "bien" (14,3) la tarjeta crece a 0,95 y el megáfono a 0,92, separados (tarjeta
x +0,5, megáfono x −0,78); juntos ~75 % del ancho; tilde más grande · 9 corte limpio calle → estacionamiento en s04
(sin el travelling por el asfalto vacío) · 10 la grúa de s03 mira más alto: los autos llenan la mitad de abajo ·
11 cámara del aterrizaje centrada en Rubén (no se corta la cabeza) · 12 el contador 3D aparece recién con el celular
levantado · 13 textos del celular más grandes ("Compra siempre", "Última compra", "Últimas semanas" 52-54 px,
filas 66/52 px, en pantalla ≥ 40 px) y sublíneas mono de los créditos a 40 px · 14 cierre: tarjeta del corazón ~45 %
del ancho, borde navy, tilde abajo de "scalerics.com", cierre 2,88 s · 15 ventanas sin travesaños (no cruzan el gancho); "Ni un precio" abajo al centro
con guía a la tarjeta; "$" más adentro; sin logo en s06 (el cartel OFERTA lo tapaba); el almanaque se esconde antes de
achicarse (sin astilla); las tarjetitas de la lista hacen pop en su fila (no vuelan desde afuera), más chicas y más a la
derecha (no tapan "21 días sin venir").

Sonido: 16 la cama hace sidechain con la voz adelantada 0,2 s (attack 10 ms, release 700 ms) y baja de 0,24 a 0,2;
VOLX de los SFX 4 → 2,8; SFX que pisaban arranques de palabra bajados o corridos a la pausa (pop/tics del gancho,
sobres, ding de "año", tics de s11, ding del cierre); el "?" de la bisagra (sobre, papel, impact, pop) sale 0,2 s más
tarde, en la pausa · 17 la cola de "acordarse." 80 ms más larga con fundido de 30 ms (la pausa siguiente se acortó lo
mismo); el tac de la tarjeta después de la palabra · 18 motor real CC0 (`assets/sfx/motor.mp3`, "Car engine Start Up
02", looneybits, OpenGameArt, anotado en fuentes.md) dos veces cuando los autos salen; dos hojas más del almanaque;
whoosh+pop en el corte al mate de Rubén; ping del "Hoy" alineado al tilde · 19 cortes "récord Guinness / de autos
vendidos / en un año.", "Al que ya te compró / no hay que convencerlo.", "¿Que no se te olvide / ninguno?" · 20 pausa
después de "¿Por qué?" 0,62 → 0,8 s (s05 dura 1,17 s).
Mezcla (medir.py + `partes/medir-fino.py`, tramos de 0,1 s donde la voz suena): I -16,6 LUFS, pico -3,9 dBFS; un solo
tramo de 0,1 s con menos de 6 dB (33,5 s, 5,9 dB). Los de 0,5 s que quedan (12,0, 18,5, 21,5, 24,0) son pausas.

Ronda 1, verificación: snapshots de cada arreglo (0,3-34,2 s; tapa-cámara de s12 a 25,15/25,35/25,5: el mensaje entra entero y ya no lo tapa el celular de Walter). `check --json`: ok, 0 errores. Portada rehecha (`portada-src/fondo-portada.png` = recorte del cuadro limpio de 13,0 s sobre "I like you"; mismo truco del mp4 provisorio para portada.mjs).
Queda: 4,6 s la calle todavía muestra más casas que autos (los autos recién salen); 14,7 s la tarjeta sola a la derecha 0,15 s antes de que entre el megáfono.

## Ronda 2 de corrección
Arte: 1 el megáfono ya no cambia de color: vibra, se inclina y sale deslizando hacia la izquierda mientras se achica ·
2 el abanico se cierra antes ("bien" −0,2 s) y la tarjeta crece a la grande desde "bien" −0,15 s; el almanaque se
esconde entero (sin el "11" diminuto) · 3 en "Lo contaba Joe Girard" la cámara sigue al auto VENDIDO (claves calculadas
sobre su camino): auto entero y grande en primer plano · 4 pastilla oscura en los subtítulos de la caída ("en un año.",
"¿Por qué?"); el crédito del récord se va en "año" +0,12 s (antes de que arranque la cámara); la caída es más corta y
pasa más cerca del sobre; el "?" sale 0,05 s después de "qué" (antes +0,2) · 5 "Cambiaba el dibujo…" se va antes de
"Ni un precio"; OFERTA más arriba (no pisa el rótulo) · 6 "$" y OFERTA sin sombra · 7 el sobre que vuela entra bajo y
casi sin arco (no cruza el gancho) · 8 tarjetitas de la lista más chicas y más a la derecha · 9 nube más arriba y más
chica (la yerba queda a la vista) · 10 celdas vacías de "Últimas semanas" con "·" (sin raya larga).
Sonido: 11 whoosh de s04 a 0,02 y adelantado; los motores terminan en s04 −0,08 con fundido · 12 el ding del cierre
suena después de "com" (cola cortada al final del reel) · 13 ping de "compró" 0,08; golpe de OFERTA 0,38 s después de
"nada" y más bajo; hoja de "Decía" 0,2 · 14 el subtítulo "¿Que no se te olvide / ninguno?" sigue hasta la tarjeta de
cierre (sin "Agendá una" suelto; subHasta 83) · 15 portada: el cuadro limpio con la firma tapada con el crema de la
página (sin "…ard" detrás del texto). SFX de la bisagra más bajos (papel 0,04, impact 0,045, pop 0,05).
Mezcla: I -16,6 LUFS, pico -3,9 dBFS; medido de a 0,1 s donde la voz suena: ningún tramo con menos de 6 dB (6,95-7,05,
33,45-33,55, 9,6, 12,5, 15,3, 27,1 incluidos). Los de 0,5 s que quedan (12,0, 18,5, 21,5, 24,0) son pausas.
Verificación: snapshots de cada arreglo (2,35 / 5,0-6,85 / 9,3-9,75 / 11,45-11,95 / 14,2-14,6 / 17,15-17,4 / 20,8 /
30,9). `check --json`: ok, 0 errores. No se tocó renders/.

## Ronda 3 (final)
1 el tilde de s08 se achica y se va entre s09 −0,35 y −0,2 s (antes del push-in; no pisa el subtítulo) · 2 la caída al
sobre es un corte: plano general del estacionamiento hasta q0 +0,06 y corte a 2 m arriba del sobre (sin rozar los autos)
· 3 el sobre más arriba en cuadro (la solapa no pisa el logo) y el "?" un poco más bajo (no toca el subtítulo) · 4 las
tarjetas del abanico se esconden cuando el abanico baja del 30 % (sin astilla) · 5 el mensaje-tarjeta entra desde abajo
del celular (no tapa "Walter" ni "21 días") · 6 Walter sin corbata (la franja oscura corrida al costado) · 7 el celular
de s11 arranca con la cámara cerca (entra grande). Ojo: en un paso intermedio un comentario se tragó el
`scene.add(walter.raiz)` y Walter desaparecía; corregido y verificado (26,5 y 28,0 s con Walter).
Verificación: snapshots a 9,3 / 9,45 / 9,9 / 10,3 / 14,27 / 17,5 / 17,65 / 22,05 / 22,2 / 24,92 / 25,0 / 25,4 / 26,5 /
27,5 / 28,0. `check --json`: ok, 0 errores. No se tocó renders/.
