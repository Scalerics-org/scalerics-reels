# por-que-la-toalla · explicador "¿Por qué…?" (30,5 s, 3D real)

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

## Voz y tiempos (ronda 1 de revisión)
- Base: `partes/orus1.wav` (Orus; `partes/guion-voz.txt` = guion sin «»). "la reusa" sonaba "la rehúsa": se regeneró
  SOLO "El otro: la mayoría la reutiliza." (`partes/reutiliza1.wav`) y el cierre con "Scálerics punto com"
  (`partes/cierre1.wav`, STT lo oye "escalera ix.com", igual que en otros reels de Orus). guion.txt dice "la reutiliza".
- Ronda 2: "la reutiliza" +2,5 dB con 0,17 s de silencio antes y después; fundidos de 30 ms en las colas de "¿Por
  qué?" y "barrio.".
- `sh partes/armar-voz.sh` arma `assets/voice/locucion.wav`: orus1 + reutiliza1 + pausa 0,35 s antes de "¿Por qué?" +
  0,25 s después + 0,25 s antes de "Es el cartel de la toalla" + cierre1 + 0,32 s al final (tarjeta de 2,99 s).
- `node partes/ajustar-tiempos.mjs`: palabras.json desde el STT de cada toma, corrido por el lugar de cada tramo, con
  los arreglos a mano (Ganó el segundo, ¿Por qué?, Graciela; medidos con silencedetect).
- Orden: `sh partes/armar-voz.sh && node partes/ajustar-tiempos.mjs && node armar.mjs && node gen.mjs && node armar.mjs`.
- `python3 partes/medir.py`: mezcla aproximada voz contra música + SFX por tramos (sin render).

## Escenas (segundos globales)
| # | id | arranca | dura | frase |
|---|----|---------|------|-------|
| 1 | s01-gancho | 0,00 | 3,69 | ¿Por qué el hotel te dice que la mayoría reutiliza la toalla? |
| 2 | s02-carteles | 3,69 | 2,41 | Un estudio probó dos carteles. |
| 3 | s03-ambiente | 6,10 | 1,94 | Uno pedía cuidar el ambiente. |
| 4 | s04-mayoria | 8,04 | 4,01 | El otro: la mayoría la reutiliza. Ganó el segundo. |
| 5 | s05-por-que | 12,05 | 1,16 | ¿Por qué? (el "?" se arma desde 0,25 s antes) |
| 6 | s06-demas | 13,21 | 2,24 | Antes de decidir, miramos a los demás. |
| 7 | s07-habitacion | 15,45 | 3,14 | Y si decía «los de esta habitación», más todavía. |
| 8 | s08-graciela | 18,59 | 2,11 | Graciela duda qué pedirle a Rubén. |
| 9 | s09-sitio | 20,70 | 3,18 | El sitio de Rubén le muestra lo más pedido del barrio. |
| 10 | s10-cartel | 23,88 | 1,61 | Es el cartel de la toalla. |
| 11 | s11-local | 25,49 | 2,05 | ¿Lo vemos en tu local? Agendá una |
| 12 | s12-llamada | 27,54 | 2,99 | videollamada gratis en scalerics.com. |

## Brief por escena (lo que hay en `tres.js` y `gen.mjs`)
1. **s01-gancho** · cuadro 0 = portada en movimiento: toallero cromado con LA toalla blanca (franja tejida verde) y el
   cartelito "La mayoría de los huéspedes reutiliza su toalla" con 4 muñequitos, llenando ~75 % del ancho, sobre los
   azulejos navy. Gancho Lexend 900 (112-136 px) crema con borde navy de 18 px, "mayoría" en recuadro verde, y 130-660.
   En "mayoría" el cartel se balancea y se prenden 3 de 4 muñequitos en verde (pop x3); en "toalla" la toalla da un
   tirón (papel). Push-in lento.
2. **s02-carteles** · travelling atrás: las dos toallas (más angostas, enteras en cuadro) con sus carteles; el de la
   derecha pasa de canto a solo íconos (muñequitos); el de la izquierda muestra la hoja grande; nunca se ve un dorso en
   blanco. En "estudio", rótulo "Estudio publicado en 2008"; en "carteles" los dos se presentan (giro corto de 17°).
3. **s03-ambiente** · push-in al de la izquierda (gris crema): en "pedía" pasa de canto a "Ayudá a cuidar el ambiente";
   rótulo "Cartel de siempre".
4. **s04-mayoria** · paneo al de la derecha: "La mayoría…", en "mayoría" 3 muñequitos verdes. En "Ganó" las toallas
   colgadas caen, la cámara retrocede, crecen las dos pilas (11 grises / 14 verdes, toallas que caen de a una), los
   carteles se sueltan y quedan apoyados al pie de su pila; números 3D "35 %" (gris) y "44 %" (verde) arriba de cada
   pila; los carteles quedan apoyados al pie con sus íconos (hoja / muñequitos); sello "Ganó" sobre la pila verde;
   crédito arriba "Estudio publicado en 2008 / reusaron la toalla". Las toallas colgadas caen derecho, detrás.
5. **s05-por-que** · bisagra: la pila gris se va y las toallas verdes vuelan y se juntan en un "?" 3D verde grande,
   centrado; push-in y órbita corta. Sin rótulos.
6. **s06-demas** · corte con match en el "?" (mismo tamaño y giro) al cuarto 214: el "?" sobre el huésped (personas
   simples con cara, pelo y ropa de colores de marca, `hacerHuesped`); grúa atrás hasta el hotel en corte (3 x 4 cuartos, cartel HOTEL); en "demás" las toallas de los
   otros cuartos se cuelgan en cadena con tildes verdes; el de la 214 cuelga la suya y se va el "?". Rótulo "Lo que
   hacen los demás".
7. **s07-habitacion** · push-in directo al cartel de la 214 (grande todo el tramo): pasa de canto a "La mayoría de
   los huéspedes de esta habitación…" con "214" en verde (pop en "habitación"); en "todavía" la cámara se abre: el
   cartel a la izquierda y dos pilas, "37 %" (navy) y "49 %" (verde), rótulo chico "cartel de siempre" bajo la gris.
   Placa "2.º experimento / Otros estudios: no siempre tan fuerte" (mono 40 px) desde "habitación" (~1,7 s), con línea
   guía al 49 % cuando aparece. La placa 214 de la puerta queda tapada por la placa (sin texto cortado).
8. **s08-graciela** · barrido rápido del hotel por la calle hasta Graciela (en cuadro al decir su nombre), con el
   almacén de Rubén atrás (toldo a rayas, Rubén en el mostrador; el cartel ALMACÉN RUBÉN va alto, fuera de la franja
   de subtítulos). Celular con funda crema. Cejas de duda y nube de pensamiento con tarta, pan casero y maple de huevos. Rótulo "Almacén de Rubén".
9. **s09-sitio** · en "sitio" Graciela da vuelta el celular (el sitio llega lleno); push-in al teléfono entero, en
   "pedido" push-in al ítem 1 (medallas verdes en cascada, textos ≥ 50 px efectivos), en "barrio" baja a las reseñas
   (Laura, Jorge) con estrellas verdes. Rótulo "Reseñas de vecinos".
10. **s10-cartel** · callback: la tarjeta "Lo más pedido del barrio" (misma forma que el cartel del hotel) sale del
    celular (Graciela lo baja) y cuelga de un tramo de toallero; en "cartel" se da vuelta: del otro lado ES el cartel
    de la toalla; en "toalla" vuelve y aparece el marco verde. Sin fundidos. Rótulo "Mismo cartel · otro mostrador".
11. **s11-local** · el toallero sale por la derecha, la cámara sube por arriba de Graciela (sin pasar por su cabeza) y
    cruza la calle con la tarjeta adelante hasta el celular de Rubén: el celular vibra, "Hoy: 12 pedidos" pasa a 13 con pop, la luz del almacén sube, Rubén sonríe
    con el mate en la mano.
12. **s12-llamada** · tarjeta verde: "Videollamada" / "gratis" (navy) / "scalerics.com" (verde en placa navy); abajo,
    el cartelito con el tilde verde colgado de un toallero, balanceándose.

## Sonido (ronda 2: todo más presente)
- `armar.mjs`: sin la baja ×0,6 de los SFX sobre palabras; cada efecto sube hasta el techo de -31 LUFS (`VOLX`), salvo
  los que pisaban la voz (bajados a mano en gen.mjs, medido con `partes/medir.py` + `partes/medir-fino.py`). Whoosh: el
  de medios (`whoosh`) en lugar de `whoosh-cine-corto` (casi todo graves), puestos en las pausas. Vibración:
  `vibra-medios.mp3` = `vibra-fuerte.mp3` (biblioteca) con paso alto 150 Hz y realce 1,8-3 kHz (se oye en el celular).
  La cama baja también antes de "El sitio" (tenía un golpe propio).
Todo de `assets/sfx` (orígenes en `reels/por-que-el-mozo/fuentes.md`: tic/tac-real de olver CC0, papel de
Kingofgamers_cz CC0, campanita de 775noise CC0; el resto, biblioteca del repo) y `bgm/bed.mp3` con sidechain bajo la
voz y bajada extra en la bisagra. Techo -31 LUFS por efecto (`TECHO` en armar.mjs). Toallas que caen = tic/tac-real
(máx. 6 audibles), giros de cartel = papel-fuerte (papel solo no se oía), estampado = sello, cadena de toallas = pop, vuelo de cámara = whoosh /
whoosh-cine-corto (audibles en la grúa y el barrido), encaje = chime en el encaje real, celular = vibra, contador = pop + campanita. No hay ambiente de baño ni de calle con
origen registrado: no se usa ninguno.

## Portada
`portada.json`: fondo = cuadro limpio de s01 (t 2,2, `portada-src/fondo-limpio-2.2.png`, armado con
`LIMPIO=1 node armar.mjs` + snapshot; volver a correr `node armar.mjs` después), zoom 1,4.
chica "¿Por qué el hotel te dice…", grande "La mayoría lo hace", sello "¿Por qué?", acento verde.
