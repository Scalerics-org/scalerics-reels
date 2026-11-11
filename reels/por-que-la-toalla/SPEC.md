# por-que-la-toalla · explicador "¿Por qué…?" (29,5 s, 3D real)

"¿Por qué el hotel te dice que la mayoría reutiliza la toalla?". Un estudio en un hotel (2008, ver `fuentes.md`)
probó dos carteles en el baño: el que pedía cuidar el ambiente y el que contaba que la mayoría de los huéspedes
reusaba la toalla. Ganó el segundo (en pantalla, como crédito: 35 % / 44 %). Bisagra "¿Por qué?": antes de decidir,
miramos a los demás. Giro: con "los de esta habitación", más todavía (49 % / 37 %, mismo estudio, otro experimento) y
el rótulo honesto obligatorio "Otros estudios: no siempre da igual de fuerte". Callback: Graciela duda qué pedirle a
Rubén; el sitio de Rubén le muestra "Lo más pedido del barrio": ES el cartel de la toalla (la tarjeta sale del celular
con la misma forma y encaja con el cartel del hotel). El pedido vuela al almacén: "Hoy: 12 pedidos" pasa a 13.
Cierre: videollamada gratis. **Producto: sitio web** (lo más pedido, reseñas de vecinos, botón para pedir).
Sin marcas reales (hotel, toalla y cartel genéricos). Voz: Orus sola, 83 palabras.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro) con la base técnica de
`reels/por-que-el-mozo` (luces, PMREM, cámara por claves Catmull-Rom monótona, la nube de pensamiento) y los
personajes de `assets/personajes.js` (Rubén = ELENCO.almacenero, Graciela = ELENCO.clienta). **El objeto que viaja:
EL CARTELITO DEL TOALLERO** (tarjeta de cartón con ojal de metal y cordón, borde navy grueso, textura de canvas
nítida): nace en el gancho, se duplica, se da vuelta, se estampa, cae al pie de su pila, se vuelve el de la 214 y
vuelve en el callback como "Lo más pedido del barrio" (misma geometría, mismo cordón, mismo toallero cromado).
Las escenas HTML (`gen.mjs`) son SOLO la capa plana: gancho, rótulos con línea guía, créditos, el sello "Ganó" y la
tarjeta de cierre. `armar.mjs` escribe `assets/tiempos3d.js` (inicio de cada escena y de cada palabra).

**Fondo navy oscuro `#0b1220` LISO** (html/body/#fondo); el baño es de azulejos navy (`#16243d` con junta `#0b1220`,
juntas de ~6 px en pantalla), así toalla blanca y cartel crema recortan fuerte. Sin degradés ni brillos. Cierre en
verde `#5ce611` con letras navy. Subtítulos: cartel BLANCO con borde navy, recuadro verde con texto navy, arriba al
centro (1-3 palabras, 86 px). Logo oscuro en píldora blanca. Rótulos: placa navy claro con texto crema y borde verde,
líneas guía crema de 7 px.

## Voz y tiempos
- `partes/guion-voz.txt` = guion.txt sin las comillas «» (la voz las leía raro). Toma: `partes/orus1.wav`
  (Orus, tono "narrador uruguayo de explicador curioso, ágil y cálido…"); `partes/orus2.wav` es la toma descartada.
- `assets/voice/locucion.wav` = orus1 + 0,35 s de silencio en 11,28 (pausa antes de "¿Por qué?") + 0,25 s en 22,63
  (pausa antes del remate "Es el cartel de la toalla") + 0,6 s al final (la tarjeta dura 2,85 s).
- `node partes/ajustar-tiempos.mjs`: corrige a mano lo que Speech-to-Text interpoló (reusa, Ganó el segundo, ¿Por
  qué?, scalerics.com; medido con silencedetect) y corre los tiempos por los silencios agregados.
  "oyó:" coincidió con el guion salvo "rehúsa" (reusa), "se/lo" (de/le) y "escaleras punto com" (STT, la voz dice bien).
- Orden: `node partes/ajustar-tiempos.mjs && node armar.mjs && node gen.mjs && node armar.mjs`.
- `python3 partes/medir.py`: mezcla aproximada voz contra música + SFX por tramos (sin render).

## Escenas (segundos globales)
| # | id | arranca | dura | frase |
|---|----|---------|------|-------|
| 1 | s01-gancho | 0,00 | 3,69 | ¿Por qué el hotel te dice que la mayoría reutiliza la toalla? |
| 2 | s02-carteles | 3,69 | 2,41 | Un estudio probó dos carteles. |
| 3 | s03-ambiente | 6,10 | 2,05 | Uno pedía cuidar el ambiente. |
| 4 | s04-mayoria | 8,15 | 3,66 | El otro: la mayoría la reusa. Ganó el segundo. |
| 5 | s05-por-que | 11,81 | 0,91 | ¿Por qué? (el "?" se arma desde 11,56) |
| 6 | s06-demas | 12,72 | 2,24 | Antes de decidir, miramos a los demás. |
| 7 | s07-habitacion | 14,96 | 3,29 | Y si decía «los de esta habitación», más todavía. |
| 8 | s08-graciela | 18,25 | 1,96 | Graciela duda qué pedirle a Rubén. |
| 9 | s09-sitio | 20,21 | 3,18 | El sitio de Rubén le muestra lo más pedido del barrio. |
| 10 | s10-cartel | 23,39 | 1,50 | Es el cartel de la toalla. |
| 11 | s11-local | 24,89 | 1,71 | ¿Lo vemos en tu local? Agendá una |
| 12 | s12-llamada | 26,60 | 2,85 | videollamada gratis en scalerics.com. |

## Brief por escena (lo que hay en `tres.js` y `gen.mjs`)
1. **s01-gancho** · cuadro 0 = portada en movimiento: toallero cromado con LA toalla blanca (franja tejida verde) y el
   cartelito "La mayoría de los huéspedes reutiliza su toalla" con 4 muñequitos, llenando ~75 % del ancho, sobre los
   azulejos navy. Gancho Lexend 900 (112-136 px) crema con borde navy de 18 px, "mayoría" en recuadro verde, y 130-660.
   En "mayoría" el cartel se balancea y se prenden 3 de 4 muñequitos en verde (pop x3); en "toalla" la toalla da un
   tirón (papel). Push-in lento.
2. **s02-carteles** · travelling atrás: las dos toallas con sus carteles; el de la derecha se da vuelta de dorso al
   arrancar; en "estudio", rótulo "Estudio en un hotel · 2008" con línea guía; en "carteles" los dos giran de frente
   mostrando solo el ícono (hoja / muñequitos).
3. **s03-ambiente** · push-in al de la izquierda (gris crema): en "pedía" se estampa "Ayudá a cuidar el ambiente";
   rótulo "Cartel de siempre".
4. **s04-mayoria** · paneo al de la derecha: "La mayoría…", en "mayoría" 3 muñequitos verdes. En "Ganó" las toallas
   colgadas caen, la cámara retrocede, crecen las dos pilas (11 grises / 14 verdes, toallas que caen de a una), los
   carteles se sueltan y quedan apoyados al pie de su pila; números 3D "35 %" (gris) y "44 %" (verde) arriba de cada
   pila; sello "Ganó" sobre la pila verde; crédito "Estudio en un hotel · 2008 / reusaron la toalla".
5. **s05-por-que** · bisagra: la pila gris se va y las toallas verdes vuelan y se juntan en un "?" 3D verde grande,
   centrado; push-in y órbita corta. Sin rótulos.
6. **s06-demas** · corte (match en el "?") al cuarto 214 del hotel: el "?" sobre el huésped (muñequito crema con su
   toalla en la mano); grúa atrás hasta el hotel en corte (3 x 4 cuartos, cartel HOTEL); en "demás" las toallas de los
   otros cuartos se cuelgan en cadena con tildes verdes; el de la 214 cuelga la suya y se va el "?". Rótulo "Lo que
   hacen los demás".
7. **s07-habitacion** · push-in a la 214: el huésped sale por la puerta, el cartel se da vuelta (flip) y pasa a "La
   mayoría de los huéspedes de esta habitación…" con "214" en verde (pop en "habitación"); en "todavía" la cámara se
   corre a la derecha (el cartel queda afuera) y crecen dos pilas: "37 %" (gris) y "49 %" (verde). Placa única
   "Mismo estudio · otro experimento / Otros estudios: no siempre da igual de fuerte" (mono 40 px) con línea guía al
   49 %, en pantalla 1,3 s.
8. **s08-graciela** · la cámara sale del hotel y viaja por la calle (casas con balcón, plátanos, vereda) hasta
   Graciela en la vereda de enfrente, con el almacén de Rubén atrás (toldo a rayas, cartel ALMACÉN RUBÉN, Rubén en
   el mostrador). Cejas de duda y nube de pensamiento con tarta, pan casero y maple de huevos. Rótulo "Almacén de Rubén".
9. **s09-sitio** · en "sitio" Graciela da vuelta el celular y lo muestra; push-in hasta que llena ~70 % del alto: el
   sitio de Rubén (Abierto · 8 a 21 h), en "pedido" las tres tarjetas en cascada (1 Tarta de jamón y queso, 2 Pan
   casero, 3 Milanesas, "N vecinos"), en "barrio" las reseñas con estrellas verdes. Rótulo "Reseñas de vecinos".
10. **s10-cartel** · callback: la tarjeta "Lo más pedido del barrio" (misma forma que el cartel del hotel) sale del
    celular y cuelga de un tramo de toallero que entra; el cartel de la toalla entra por la izquierda, en "toalla" se
    mete en la tarjeta y aparece el marco verde de selección. Rótulo "Mismo cartel · otro mostrador".
11. **s11-local** · la cámara sube por arriba de Graciela y cruza la calle siguiendo la tarjeta (el pedido) hasta el
    mostrador de Rubén: el celular vibra, "Hoy: 12 pedidos" pasa a 13 con pop, la luz del almacén sube, Rubén sonríe
    con el mate en la mano.
12. **s12-llamada** · tarjeta verde: "Videollamada" / "gratis" (navy) / "scalerics.com" (verde en placa navy); abajo,
    el cartelito con el tilde verde colgado de un toallero, balanceándose.

## Sonido
Todo de `assets/sfx` (orígenes en `reels/por-que-el-mozo/fuentes.md`: tic/tac-real de olver CC0, papel de
Kingofgamers_cz CC0, campanita de 775noise CC0; el resto, biblioteca del repo) y `bgm/bed.mp3` con sidechain bajo la
voz y bajada extra en la bisagra. Techo -31 LUFS por efecto (`TECHO` en armar.mjs). Toallas que caen = tic/tac-real
(máx. 6 audibles), giros de cartel = papel, estampado = sello, cadena de toallas = pop, vuelo de cámara = whoosh /
whoosh-cinematic, encaje = chime, celular = vibra, contador = pop + campanita. No hay ambiente de baño ni de calle con
origen registrado: no se usa ninguno.

## Portada
`portada.json`: fondo = cuadro limpio de s01 (t 2,2, `portada-src/fondo-limpio-2.2.png`, armado con
`LIMPIO=1 node armar.mjs` + snapshot; volver a correr `node armar.mjs` después), zoom 1,4. "El cartel del hotel" /
"¿Por qué?" / sello "La mayoría lo hace", acento verde.
