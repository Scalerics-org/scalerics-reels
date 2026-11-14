# Plan de escenas · por-que-el-99 (explicador "¿Por qué…?", ~33 s, 3D real)

"¿Por qué los precios terminan en 99?" sobre **Rubén en su oficina vidriada arriba del depósito, cambiando el aceite
de $ 1.000 a $ 999 en la lista de precios** (cuadro 0 = escena en curso, lo que piden las stats). Desenlace en la frase
2: "Porque el primer número pesa más." (Thomas y Morwitz 2005). **Giro 1 (s04):** "¿Lo del cajero y el vuelto? No está
probado." (la explicación que todos repiten). **Giro 2 (s05-s07), el fuerte:** el mismo vestido en un catálogo, a 34,
39 y 44 dólares: **más caro… y vendió más** el de 39 (Anderson y Simester 2003), y 34 y 39 empiezan con el mismo 3,
así que no era el primer número: **el nueve suena a oferta** (s08). **Matiz (s09):** a veces gana el redondo.
**Callback:** vuelve el MISMO 999 de Rubén: "¿Y mi noventa y nueve vendió más?" (Algenib), y el monitor de la lista se
vuelve su celular con el reporte de la semana: en el aceite ganó el 999, en la yerba ganó el redondo. Cierre:
videollamada gratis.

- **Producto: reportes de ventas automáticos** (automatización / sistema a medida: qué vendiste, de qué producto y a
  qué precio, en el celular, sin calcular). En voz: "un reporte automático"; en pantalla el celular dice "Ventas de la
  semana". No se promete "test de precios" ni nada fuera de "Lo que se vende".
- **Qué lo diferencia de lo hecho:** nada en "Hechos" habla de precios. Ojo con no repetir recursos de los últimos
  "¿Por qué…?": **sin balanza** (la usaron por-que-sacar-numero y por-que-el-recordatorio), sin numerador, sin almacén.
- **Rubén es el de la DISTRIBUIDORA** (`ELENCO.ruben` de `reels/abren-hoy/assets/personajes.js`: camisa navy de manga
  larga arremangada, sin delantal; mate y termo con `crearMate`/`crearTermo`). Nada de almacén, mostrador de barrio,
  fiado ni vecinas. Si la corrida de `ya-lo-cargo` (misma noche) arma la oficina vidriada y el depósito, **reusar su
  set** para que la distribuidora sea la misma en el feed.
- **Personas reales:** Anderson y Simester solo en crédito mono chico ("Anderson y Simester · 2003"), sin dibujarlos y
  sin escudos de universidades. **Sin marcas:** el catálogo y el vestido son genéricos, la planilla no es Excel
  (grilla genérica sin logo ni verde de Excel), el celular sin logo.
- **Voces:** Orus (81 palabras) + **Rubén (Algenib), 7 palabras:** "¿Y mi noventa y nueve vendió más?". Ver
  `partes/voces.md`.
- **Base técnica:** `reels/por-que-sacar-numero` y `reels/por-que-las-tarjetas` (tres.js con `renderAt(t)` puro,
  cámara Catmull-Rom, PMREM, gen.mjs, firma.json, partes/armar-voz.mjs), personajes de `reels/abren-hoy`
  (ELENCO.ruben) + utilitarios de `reels/anotamelo/assets/personajes.js` (crearCelular, crearMoneda, crearCaja).

## Fondo y paleta (anotar en "Hechos")
**Navy3 `#1f3254` liso, con el piso convertido en una PLANILLA GIGANTE: grilla de celdas con líneas crema `#efeee5` de
8 px (al 55 %), encabezados de columna A B C D en mono crema; cierre verde.** La planilla es el escenario de todo el
reel: los objetos se apoyan en las celdas (sombra suave al 35 %) y la cámara viaja sobre ella. Últimos explicadores:
por-que-sacar-numero crema liso (13-11), por-que-las-tarjetas navy oscuro (12-11), por-que-devolver-gratis navy claro
`#16243d` (12-11), por-que-la-toalla navy oscuro (11-11), por-que-el-recordatorio crema con azulejos (11-11).
Combinación nueva: **navy3 + planilla gigante crema como piso + oficina vidriada de Rubén + cierre verde**.
- Oficina de Rubén (s01, s10-s12): paredes navy3, ventanal de vidrio grande detrás (borde navy oscuro de 10 cm) que da
  al depósito de abajo: **racks navy claro con largueros crema** (nada de naranja), pallets de
  madera clara con cajas kraft `#c9a46b` y bultos con film; escritorio de madera clara, monitor grande, mate y termo.
  El depósito se ve desenfocado pero reconocible (que nadie lo confunda con un almacén: pallets, rack de 3 niveles,
  una zorra hidráulica, cajas apiladas con fleje).
- **Verde `#5ce611` = lo que gana / el dato**: el primer 9, la etiqueta del 39, la pila que gana, las tildes, el
  recuadro de selección de los subtítulos. **Rojo apagado `#c7655b` SOLO para el problema**: el sello "NO PROBADO" y
  el "?" del precio que Rubén no sabe si funcionó. Lo que pierde, en crema al 60 % / gris navy claro.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 crema `#efeee5` con borde navy `#0b1220` de 14 px;
  palabra clave en recuadro verde con texto navy. Rótulos: placa crema con texto navy y borde verde, línea guía crema
  de 7 px, ≥ 36 px. Créditos de datos: mono crema 34-38 px. Logo crema; `firma.json` lo esconde en primeros planos.
- Números 3D: TextGeometry Lexend 800 (`lexend800.js`), extrusión 0,12, biselado, material físico; arriba y limpios,
  sin pisar objetos.

## Escenas (tiempos estimados a 0,34 s/palabra + pausas; los reales salen de armar.mjs)
| # | id | palabra | arranca | dura | frase |
|---|----|---------|---------|------|-------|
| 1 | s01-gancho | 0 | 0,0 | 3,4 | ¿Por qué los precios terminan en noventa y nueve? |
| 2 | s02-primer-numero | 9 | 3,4 | 2,0 | Porque el primer número pesa más. |
| 3 | s03-cien | 15 | 5,4 | 2,6 | Noventa y nueve parece menos que cien. |
| 4 | s04-cajero | 22 | 8,0 | 3,4 | ¿Lo del cajero y el vuelto? No está probado. |
| 5 | s05-catalogo | 31 | 11,4 | 2,7 | Lo que sí se midió: el mismo vestido, |
| 6 | s06-tres-precios | 39 | 14,1 | 3,1 | a treinta y cuatro y a treinta y nueve. |
| 7 | s07-vendio-mas | 48 | 17,2 | 2,1 | Más caro… y vendió más. |
| 8 | s08-oferta | 53 | 19,3 | 1,7 | El nueve suena a oferta. |
| 9 | s09-redondo | 58 | 21,0 | 1,7 | A veces gana el redondo. |
| 10 | s10-ruben | 63 | 22,7 | 2,4 | (Rubén) ¿Y mi noventa y nueve vendió más? |
| 11 | s11-reporte | 70 | 25,1 | 3,1 | Un reporte automático le dice qué precio vende más. |
| 12 | s12-medimos | 79 | 28,2 | 1,7 | ¿Medimos los tuyos? Agendá una |
| 13 | s13-cierre | 84 | 29,9 | 2,8 | videollamada gratis en scalerics.com. |

Total ~32,7 s. Si s06 queda de más de 3 s, que cambie algo cada 1,5 s (aparece cada etiqueta) o partir en "a treinta y
cuatro" / "y a treinta y nueve".

## Cámara continua (Catmull-Rom, una sola curva salvo el cierre)
Oficina (s01, por encima del hombro de Rubén) → zambullida en el monitor: la pantalla crece hasta que la grilla de la
planilla ES el piso del escenario (s02) → travelling lateral sobre la planilla de objeto en objeto (s02-s09: 999 →
etiquetas 99/100 → caja registradora → catálogo → vestidos y pilas → etiqueta OFERTA → regalo) → la cámara sube y
retrocede, la planilla se encoge y vuelve a ser la pantalla del monitor de Rubén (s10, el mismo encuadre del s01 pero
del otro lado: contraplano de Rubén) → push-in al celular que Rubén levanta (s11-s12) → cierre verde. En las
transiciones siempre hay un objeto grande en cuadro (el monitor que crece, la etiqueta que cae en la caja, el cajón que
se vuelve catálogo). Nunca la pantalla lisa.

## Brief por escena (objeto 3D protagonista, cámara, rótulos, SFX)

**s01-gancho (0-3,4).** Cuadro 0 = portada en movimiento: plano por encima del hombro derecho de **Rubén** sentado en
su oficina vidriada; el **monitor** grande (60-70 % del ancho) muestra la **LISTA DE PRECIOS** (grilla crema sobre
navy, filas ≥ 40 px: "Yerba 1 kg · caja x10 · $ 1.200", "**Aceite 900 ml · caja x12 · $ 1.000**" resaltada, "Arroz
1 kg · fardo x10 · $ 640", "Fideos 500 g · caja x20 · $ 980"; precios de ficción). Al lado del teclado, mate y termo.
Detrás del vidrio, desenfocado, el depósito con racks y pallets. Gancho entero en el tercio superior desde el cuadro 0
(Lexend 900, 120-140 px: "¿Por qué los precios" / "terminan en **99**?", 99 en recuadro verde). Ya en el cuadro 0 el
cursor está seleccionando el "1.000" (selección azul-verde); en ~1,0 s Rubén tipea: "1.000" → "999" letra por letra
(textura de canvas, función del tiempo). Rubén: expresión "concentrada", tipea con los dos índices (gesto de dueño, no
torpe). Cámara: push-in lento hacia el 999. SFX: ambiente de depósito muy bajo (zorra lejana, eco), `typing`/`key-press`
×3 sincronizados con cada 9, `click` al confirmar.

**s02-primer-numero (3,4-5,4).** **Zambullida**: el 999 se despega de la pantalla como **TextGeometry 3D gigante**
(crema, 80 % del ancho) y la pantalla crece hasta que su grilla es el piso-planilla del escenario. En "primer número"
el **primer 9 se pone verde y crece** (escala 1 → 1,35) y los otros dos 9 se achican y bajan a crema al 60 %. Rótulo
con línea guía al primer 9: "el primero manda". Cámara: sale del monitor hacia atrás y queda frente al 999, leve
contrapicado. SFX: `whoosh-cinematic` en la zambullida, `pop` en el 9 que crece.

**s03-cien (5,4-8,0).** El 999 se rearma en **dos etiquetas de precio colgantes** (cartón crema con ojal metálico y
piolín navy, bordes marcados): "**$ 99**" con número verde y "**$ 100**" con número crema-gris. Cuelgan de un perchero
fino navy. En "parece menos" la de 100 **cae pesada** (rebote corto) y la de 99 **se hace más chica y liviana** (se
balancea arriba), aunque son casi el mismo número. Rótulo entre las dos: "1 peso de diferencia". Créditos mono:
"Thomas y Morwitz · 2005". Cámara: travelling lateral corto, las dos etiquetas llenan el ancho. SFX: `golpe` sordo de
la de 100, `tic` liviano de la de 99, `pop` del rótulo.

**s04-cajero (8,0-11,4).** La etiqueta de $ 99 se suelta y cae dentro de una **caja registradora antigua** (cuerpo
crema con laterales navy, teclas redondas en filas, display de banderitas arriba que salta a "99", manija lateral; que
nadie la confunda con una calculadora: grande, con cajón y manivela). En "cajero" el **cajón se abre de golpe** hacia
cámara y saltan **monedas** de vuelto (crearMoneda, 4-5, con semilla). En "No está probado" un **sello de goma 3D**
baja desde arriba y estampa sobre la caja una placa **"NO PROBADO"** rojo apagado (texto ≥ 70 px, ligeramente
torcido). Rótulo chico arriba: "la historia del cajero". Cámara: push-in al cajón en "vuelto", leve sacudida en el
sello. SFX: `ring` o timbre de caja (si no hay "ka-ching" real en `assets/sfx`, uno CC0 de freesound y anotarlo en
fuentes.md), monedas (CC0), `sello` en el golpe.

**s05-catalogo (11,4-14,1).** El cajón de la caja **se pliega y se vuelve un catálogo** de papel (tapa navy con
"CATÁLOGO · OTOÑO" en crema, genérico) que se abre en abanico sobre la planilla. Del medio se levanta como pop-up
**un vestido en percha** (percha de madera clara con gancho metálico; vestido verde de marca con escote en V, cintura
con cinto navy y falda acampanada que se mueve apenas; que se lea "vestido" a primera vista). En "el mismo vestido"
el vestido **se triplica**: tres iguales, uno en cada página, en fila. Créditos mono: "Anderson y Simester · 2003 ·
catálogo de ropa". Cámara: travelling de la caja al catálogo, sube un poco para ver los tres. SFX: `papel-fuerte` al
abrirse, `whoosh-short` en el pop-up, `pop` ×2 al triplicarse.

**s06-tres-precios (14,1-17,2).** Cuelga una **etiqueta 3D en cada vestido**: "US$ 34" (en "treinta y cuatro"), "US$
39" (en "treinta y nueve"), y "US$ 44" (sin voz, ~0,5 s después, con su pop). Números TextGeometry ≥ 150 px en
pantalla, arriba de cada vestido, sin pisar la percha. Debajo de cada vestido empiezan a crecer **pilas de cajas de
envío** (kraft con cinta verde), proporción honesta y sin cifras: **34 → 3 cajas, 39 → 4 cajas, 44 → 3 cajas** (de 34
a 39 subió un tercio, de 34 a 44 no cambió: `fuentes.md` [G]). En este plano las pilas van creciendo parejas, todavía
sin ganador. Cámara: dolly hacia atrás para que entren los tres vestidos y las pilas (70 % del ancho). SFX: `pop` por
etiqueta, `tac-real` por cada caja que cae.

**s07-vendio-mas (17,2-19,3).** En "Más caro…" una **flecha crema** sube del 34 al 39 (el precio sube). **Pausa**
(0,4 s: la pila del 39 duda). En "y vendió más" la pila del 39 **suma su cuarta caja de golpe** y se le pone una
**tilde verde** grande arriba; 34 y 44 quedan en crema al 60 %. Rótulo: "vendió más" sobre la pila del 39. Cámara:
push-in al 39. SFX: música baja en la pausa (no se corta), `impact-bass-1` + `ding` en "vendió más".

**s08-oferta (19,3-21,0).** La etiqueta del 39 **se da vuelta** (giro de 180° sobre el piolín) y del dorso dice
**"OFERTA"** en verde sobre crema (≥ 90 px). Rótulo chico: "34 y 39 empiezan con 3" (para que se entienda que no era
el primer número), con línea guía a los dos 3. Cámara: primer plano de la etiqueta, órbita corta de 20°. SFX:
`whoosh-short` del giro, `sparkle` corto.

**s09-redondo (21,0-22,7).** La etiqueta OFERTA cae sobre la planilla y **rebota contra una caja de regalo** (navy con
moño verde, etiqueta "$ 4.000" redonda en crema) que avanza desde la derecha: la caja de regalo gana el cuadro y le
sale una tilde verde. Rótulo: "en regalos y compras con emoción" (Wadhwa y Zhang 2015). Créditos mono chico: "Wadhwa y
Zhang · 2015". Cámara: travelling lateral que sigue el rebote. SFX: `tic-real` del rebote, `pop` de la tilde.

**s10-ruben (22,7-25,1).** **Grúa atrás**: la planilla se encoge y vuelve a ser la pantalla del monitor de Rubén (en
la celda del aceite sigue el "$ 999"). Contraplano: **Rubén de frente**, primer plano medio, mate en la mano, mira el
999 y después el depósito por el vidrio. Su línea "¿Y mi noventa y nueve vendió más?" (boca sincronizada, ojos
abiertos, cejas que suben en "vendió más", expresión "incredula" suave → "esperanza"). Junto al 999 de la pantalla
aparece un **"?" rojo apagado** chico (lo que no sabe). Cámara: llega del monitor girando 180° alrededor del
escritorio (órbita), termina en Rubén. SFX: `whoosh-cine-corto` de la grúa, sorbo de mate después de la línea (si hay
uno real en la base; si no, nada).

**s11-reporte (25,1-28,2).** Rubén levanta su **celular** (crearCelular, pantalla grande que llena el 60-70 % del
ancho en el push-in, texto ≥ 40 px): "**Ventas de la semana**" y dos filas que entran con pop:
"Aceite x12 · a $ 999 · ▲ vendió más ✓" (verde) y "Yerba x10 · a $ 1.200 · ▲ ganó el redondo ✓" (verde). El "?"
rojo del monitor se apaga. Rótulo: "llega solo". Cámara: push-in al celular por encima de la mano de Rubén. SFX:
`notification` al llegar el reporte, `pop` por fila, `chime` en las tildes.

**s12-medimos (28,2-29,9).** Rubén baja el celular y **levanta el mate a cámara** con media sonrisa (no guiño: ya se
usó mucho); detrás, el depósito sigue trabajando. En "¿Medimos los tuyos?" el "$ 999" del monitor crece hacia cámara y
hace de transición a la tarjeta. SFX: `whoosh-short`.

**s13-cierre (29,9-32,7).** Arranca sobre "videollamada": fondo **verde de marca `#5ce611`** liso, "Videollamada
gratis" en navy Lexend 900 grande y debajo "scalerics.com" grande en navy (sobre verde el verde no se lee: navy), una
etiqueta de precio crema chica con "99" de firma en una esquina (opcional) y logo. 2,5-3 s. SFX: whoosh de entrada,
música que cierra.

## Números 3D
- "999" (s02), "$ 99" / "$ 100" (s03), "99" de la caja (s04), "US$ 34 / 39 / 44" (s06), "OFERTA" (s08): todos
  TextGeometry, arriba y limpios, sin pisar objetos. Los años (2005, 2003, 2015) solo en créditos mono, no en 3D.

## Riesgos a mirar en la revisión de arte
- La zambullida al monitor (s02) y la vuelta (s10): la grilla nunca puede quedar como pantalla lisa sin objeto; el 999
  tiene que estar en cuadro durante toda la zambullida.
- El vestido: que se lea vestido (no remera ni delantal); la percha no atraviesa la etiqueta.
- Las pilas: proporción 3 / 4 / 3 exacta, sin números en las pilas (no hay cifras de unidades en las fuentes).
- La caja registradora: que no parezca una calculadora ni un posnet (nada de "problemas de cobrar con tarjeta").
- Rubén: oficina de distribuidora (nunca mostrador, delantal, almacén); camisa navy arremangada; el mate no le atraviesa
  la cara al levantarlo en s12.
- Texto de la planilla y del celular ≥ 36 px; "US$" para que quede claro que el experimento fue en dólares.

## Portada
Fondo limpio (sin gancho, subtítulos ni logo) del s01 (Rubén por encima del hombro con el 999 en el monitor) o del s06
con los tres vestidos y la pila del 39 más alta. Texto: `chica` "¿Por qué los precios", `grande` "terminan en 99?",
`sello` "¿Por qué?", acento verde.
