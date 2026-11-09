# me-lo-guardas · PARA MANDAR completo (3D real), ~30,0 s

**De qué trata.** El "¿me lo guardás? ya vengo". Rubén es buena gente y guarda todo: cada mensaje es una bolsa de
papel madera con un papelito ("Walter · ya vengo", "la del perro · a la tarde", "Sr. del 4B · ya voy") en el estante
**GUARDADOS** detrás del mostrador. El estante crece, el contador sube 3 → 11 → 27, pasa un mes y nadie viene. Entra
Graciela: "Rubén, ¿tenés yerba?". El lugar de la yerba está vacío: la última es la de Walter, con telaraña.
"¿Y cuándo viene?". Música que se corta, pausa, Rubén a cámara: **"Ya viene, Graciela."** Remate del remate: ¡Walter
en la puerta!… "¡Guardame un dulce de leche!" / "¡Ya vengo!", y se va (28, tuba). Cartel **"Un agente de IA más
tarde…"**. Parte 2: el mismo mensaje de Walter lo contesta el agente solo, con seña y "Te espera hasta el viernes";
el estante queda en 3 reservas con seña, la que vence se libera sola y la yerba vuelve a la venta; Walter viene a
buscar lo suyo; Graciela: "¿Walter?"; Rubén: **"Ya vino, Graciela."**; Walter pide otro dulce de leche y el celular
lo resuelve solo; guiño con el mate.

- **Producto:** agente de IA que atiende el "¿me lo guardás?" por WhatsApp: reserva con seña por link de pago, avisa
  hasta cuándo se guarda y libera la reserva si vence. Solo en la línea chica final y en descripcion.txt. El cartel
  NUNCA dice "Scalerics". Sin marcas: chat genérico (navy/crema/verde, sin logo ni colores de ninguna app), botón
  "Pagar seña" sin logo de ningún medio de pago.
- **Recurso visual central:** el **estante GUARDADOS** que se llena de bolsas con papelitos y se arquea (la escalada
  que se entiende sin sonido), la **telaraña** de la bolsa de Walter (el tiempo que pasó) y el **contador
  "Guardados"** 3D pegado a cámara. El celular de Rubén en primer término abre las dos partes (callback).
- **Estructura** como `reels/que-en-paz-descanse` y `reels/las-siete-y-cincuenta-y-nueve`: parte 1 (14,4 s, sin línea
  chica) + cartel (3,2 s) + parte 2 (12,4 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs
  unir`. El cartel se reusa de `reels/abren-hoy-completo/compositions/cartel.html` (es el mismo texto: "Un agente" /
  "de IA" / "más tarde…"); su audio `assets/audio/cartel.wav` se puede reusar tal cual.
- **Personajes:** **Rubén** (ELENCO.almacenero, protagonista, voz Gemini Algenib), **Graciela** (ELENCO.clienta, solo
  burbujas), **Walter** (ELENCO.walter de la copia local de `reels/las-siete-y-cincuenta-y-nueve/assets/personajes.js`:
  el de "una cosita nomás", camisa crema, corbata navy floja, campera crema, mochila navy3 con tira verde; solo
  burbujas). Sin Orus.
- Sin emojis, sin rayas largas en textos visibles. Textos en pantalla ≥ 36 px (en el celular ≥ 40 px).

## Paleta y set (para diferenciarlo en el feed)
- **Almacén de mañana con pared navy claro `#16243d`** (pared del fondo y laterales, `background` del body y de
  `#root`). Esta noche ya hubo un reel con pared crema (que-en-paz-descanse). Anotar en "Hechos": "almacén con pared
  navy claro #16243d, estante GUARDADOS". Para no ser igual a lo-mismo-que-la-otra-vez (también navy claro): acá la
  luz es de mañana (blanca, desde la vidriera a la izquierda, manchas duras en el piso) y el protagonista del set es
  el estante GUARDADOS a la derecha, con su cartel de madera.
- Mostrador navy3 `#1f3254` con tapa de madera (el de abren-hoy), estantes de madera clara con mercadería de colores
  planos (crema, mostaza `#d9a441`, rojo apagado, blanco, navy; poco verde: el verde significa "resuelto").
- **Papel madera `#c49a63`** (crearBolsaPapel) para las bolsas: contra el navy claro se recorta bien. Papelitos crema
  `#efeee5` con letra manuscrita navy (Caveat 700, o Lexend 700 si Caveat no se lee a esa distancia), pegados con
  cinta, grandes (en los planos donde se leen, ≥ 40 px en pantalla).
- Rojo apagado `#c7655b` SOLO para el problema: el número del contador en la parte 1, el cartelito "AGOTADA" del hueco
  de la yerba, la etiqueta "venció" de la parte 2. Verde `#5ce611` para lo resuelto: "Seña paga ✓", las etiquetas con
  tilde de la parte 2, "3 · con seña", el botón "Pagar seña", y el recuadro de selección de los subtítulos.
- Burbujas de diálogo: crema `#efeee5` con borde navy de 8 px y sombra dura (sobre navy claro se leen; no blanco
  suelto), letra navy Lexend 800; cola hacia quien habla. Burbujas del chat del celular: las de abren-hoy-2 (cliente
  en crema, respuesta del agente en navy claro con letra crema y "respondido automáticamente").

## PARTE 1 · el problema (0,0-14,4 s)
Pill de día abajo a la derecha (como abren-hoy, s01-hora), con flip y tic al cambiar: `LUNES · 10:15` (0,0) →
`MIÉRCOLES` (3,0) → `VIERNES` (3,9) → **`UN MES DESPUÉS`** (4,8, se queda hasta 8,2).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,10 | **P1 plano medio de Rubén** atrás del mostrador, cámara a la altura del pecho, levemente picada, push-in lento. En primer término, a la izquierda y abajo, **el celular de Rubén** apoyado en el mostrador, nítido, ocupando ~45 % del ancho (pantalla canvas). Atrás, a la derecha de Rubén, se adivina el estante GUARDADOS con 2 bolsas. | **Cuadro 0 = la escena + el gancho**: en la pantalla, chat genérico con "Walter" arriba y la burbuja **"¿Me lo guardás? Ya vengo."** (≥ 44 px). Rubén, servicial (CARA.sonrisa), escribe con birome (crearLapicera) sobre un papelito crema apoyado en el mostrador (pose nueva ESCRIBE). 0,60 · contador 3D arriba: **"Guardados: 3"** (pop). 1,10 · Rubén levanta el papelito a cámara, lo pega con cinta en una **bolsa de papel madera de la que asoma un paquete de yerba**: el papelito llena ~35 % del ancho y se lee **"Walter · ya vengo"**. | ambiente (calle.wav con pasabajos) y pizzicato desde 0; notification 0,05; papel.wav (birome) 0,25-0,85; pop + key-press 0,60; papel.wav corto (cinta) 1,30 |
| 2,10-4,80 | **P2 el estante GUARDADOS de frente** (pared derecha detrás del mostrador; cartel de madera crema arriba, **"GUARDADOS"** en Lexend 800 navy, se lee entero). Cámara: arranca cerca del estante de abajo y hace **dolly atrás + grúa suave** a medida que se llena, para que el estante entero quede siempre llenando 70-80 % del ancho. Rubén entra y sale de cuadro por la izquierda dejando cosas (de espaldas o de 3/4, sin tapar el estante). | 2,15 · Rubén deja la bolsa de Walter en el estante de abajo (rebotito). Mensajes del chat que se apilan pegados a cámara arriba a la izquierda (2 a la vista, el nuevo empuja al viejo), y por cada uno aparece algo en el estante con pop y squash, con su papelito: 2,45 **"¿Me separás un queso? Paso a la tarde."** → queso envuelto en papel ("la del perro · a la tarde"); 2,95 **"Guardame 2 flautas, ya voy."** → dos panes flauta cruzados ("Sr. del 4B · ya voy"); 3,40 **"¿Me lo guardás hasta el lunes?"** → bolsa ("el de la gorra · lunes"); 3,80 → maple de huevos ("sobrino de Marta"); 4,05-4,60 cuatro bolsas más seguidas, sin mensaje, cada vez más rápido; un zapallo entero con papelito ("¿?") en 4,40. Contador: **11** (3,40, flip) → rodillo hasta **27** (4,65). 4,30-4,80 · las tablas del estante **se arquean** un poco por el peso. 4,80 · con "UN MES DESPUÉS", a la bolsa de Walter (abajo, a la vista) **le crece una telaraña** gruesa del borde de la bolsa al estante (hilos de ≥ 6 px, crema, que Instagram no borre) y se le asienta polvo (motas grandes, pocas). | burbuja.mp3 por mensaje; pop.mp3 por objeto (variar tono), sello.wav bajo en los apoyos; key-press por número del contador, cada vez más seguido; tic-real en cada cambio de pill; 4,80 ráfaga de tic/tac acelerando (el mes que pasa) |
| 4,80-6,40 | **P3 general 3/4** desde el lado de la clienta: mostrador cruzando el tercio inferior, Rubén atrás con el mate (crearMate) en la mano, a la izquierda **el estante normal** (la fila de yerba a la vista), a la derecha el **estante GUARDADOS** lleno. | 4,85 · **campanita**: entra Graciela (pasos), se para frente al mostrador. 5,20 · burbuja: **"Rubén, ¿tenés yerba?"** (pop; los mensajes del chat ya se fueron). 5,55 · Rubén gira hacia el estante normal: **el lugar de la yerba está vacío**, con la etiqueta de precio sola y un cartelito **"AGOTADA"** en rojo apagado (pop chico). 5,95-6,35 · Rubén y Graciela giran la cabeza lento, al mismo tiempo, hacia GUARDADOS. | campanita 4,85; pasos; pop 5,20; pop chico 5,60; whoosh suave del giro 6,00 |
| 6,40-8,20 | **P4 zambullida al estante GUARDADOS**: cámara continua (Catmull-Rom) desde el estante entero hasta la bolsa de Walter abajo, push-in hasta que **el paquete de yerba con el papelito llena el 60-70 % del ancho**. | 6,40-7,20 · el viaje: el estante siempre en cuadro, nunca la pared lisa. 7,20 · se lee entero **"Walter · ya vengo"** y la telaraña cruzada delante de la bolsa (sin tapar el texto), una mota que cae. 7,35 · burbuja de Graciela pegada a cámara, arriba, cola hacia afuera de cuadro a la izquierda: **"¿Y cuándo viene?"** (pop). | whoosh 6,40; pop 7,35 |
| 8,20-11,40 | **P5 primer plano de Rubén de frente**, el estante GUARDADOS desenfocado atrás. | **8,20 la música se corta seca.** Pausa 8,20-9,10 (solo ambiente): Rubén gira la cabeza lento a cámara, cara de nada (CARA.resignado con párpados a media asta), el mate quieto en la mano. 8,80-9,10 push-in rápido a la cara. **9,25 · voz (Algenib): "Ya viene, Graciela."** (~1,4 s; la boca sigue la envolvente). Subtítulo palabra por palabra abajo de la cara (como s02-linea de abren-hoy), **"viene,"** en el recuadro verde. 10,70-11,40 sostiene la mirada (silencio). | whoosh-short 8,80; voz; nada más (el silencio es el chiste) |
| 11,40-14,40 | **P6 general = encuadre de P3** (se ve la puerta vidriada al fondo). | 11,45 · **campanita**: se abre la puerta, **Walter** asoma medio cuerpo, apurado, mochila. 11,60 · Rubén y Graciela giran a la puerta con cara de esperanza (CARA.esperanza); 11,75 Rubén levanta la bolsa con la yerba y la telaraña hacia Walter (pose OFRECE de lo-mismo-que-la-otra-vez). 12,00 · burbuja de Walter, simpático (CARA.esperanza, sonrisa de perdón): **"¡Guardame un dulce de leche!"** (pop). 12,55 · segunda burbuja: **"¡Ya vengo!"** (pop) y Walter se va (la puerta se cierra, campanita). 12,95 · el contador vuelve arriba: **"Guardados: 28"** (flip + **tuba**). 13,30-14,40 · Rubén, todavía con la bolsa en el aire, mira a cámara; Graciela le da dos palmaditas en el brazo (mano en el antebrazo, no en la cara). Fin de la parte 1 en 14,40 (sin línea chica). | campanita 11,45; pops 12,00 y 12,55; campanita 12,75; key-press + tuba 12,95; dos tac-real suaves 13,60 |

Último cuadro (14,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Un agente de IA más tarde…" (14,4-17,6 s)
El de `reels/abren-hoy-completo/compositions/cartel.html` tal cual (mismo texto, mismas tres líneas). Fondo verde de
marca con manchas y burbujas, letras Lexend 900 crema con borde navy que rebotan, -4°. Entra girando el último cuadro
de la parte 1 (540°), sale con iris al primer cuadro de la parte 2. Voz Gemini Rasalgethi: **"Un agente de IA más
tarde."** (reusar assets/audio/cartel.wav del ejemplar o generar 2 tomas de partes/narrador.txt). Stinger de
vibráfono y whooshes iguales que en el ejemplar. **No dice "Scalerics".**

## PARTE 2 · resuelto (17,6-30,0 s)
Pill de día: `OTRO LUNES · 10:15` (hasta 22,4) → `VIERNES` (22,4, hasta 24,4).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 17,60-20,20 | **Q1 = encuadre de P1 (callback):** el celular de Rubén en primer término, Rubén atrás. Ya no escribe papelitos: **toma mate** (crearMate, termo crearTermo al lado). | 17,70 · llega el mismo mensaje: **"Walter"** / **"¿Me lo guardás? Ya vengo."** (pop). 17,95 · "escribiendo…". 18,30 · la respuesta sola (burbuja navy claro, "respondido automáticamente"): **"¡Dale, Walter! Te lo reservo con una seña."** + botón verde **"Pagar seña"**. 18,40 Rubén sorbe sin mirar el celular. 18,95 · el botón se aprieta (ripple) y aparece la tarjeta verde **"Seña paga ✓"** (ding). 19,35 · nueva burbuja del agente: **"Te espera hasta el viernes."** (El contador no aparece acá: vuelve en Q2.) | notification 17,70; respuesta.wav 18,30; sorbo 18,40; click-soft 18,95; cero.mp3 19,00; respuesta.wav 19,35 |
| 20,20-22,40 | **Q2 = encuadre del final de P2 (callback):** el estante GUARDADOS de frente, entero. | Está **ordenado**: tablas rectas, sin telaraña, solo **3 bolsas** con etiquetas impresas crema con tilde verde: **"Walter · seña ✓ · hasta vie"**, "Sr. del 4B · seña ✓", "la del perro · seña ✓". 20,40 · contador: **"Guardados: 27"** (rojo apagado) se tacha → **"3 · con seña"** en verde (ding). 21,10 · la etiqueta de una cuarta bolsa ("el de la gorra") pasa a **"venció"** en rojo apagado; 21,35 la bolsa se vacía sola: **el paquete de yerba sale volando en arco y cae en su lugar del estante normal** (a la izquierda, entra en cuadro con la cámara que lo sigue en un paneo corto), el cartelito "AGOTADA" se da vuelta y queda el precio. | ding 20,45; papel.wav 21,10; whoosh-short 21,35; pop + sello bajo 21,85 |
| 22,40-24,40 | **Q3 = encuadre de P3/P6 (callback):** general 3/4 con la puerta al fondo. | Graciela en el mostrador **con la yerba en la mano** (la liberada), pagando. 22,50 · **campanita**: entra Walter, con el celular en alto mostrando "Seña paga ✓" (CARA.feliz), va al mostrador. 22,90 · Rubén le alcanza su bolsa del estante. 23,30 · Graciela gira, ojos enormes (CARA.sorpresa), burbuja: **"¿Walter?"** (pop). | campanita 22,50; pasos; papel.wav (bolsa) 22,95; pop 23,30 |
| 24,40-26,70 | **Q4 = encuadre de P5 (callback):** primer plano de Rubén de frente, push-in lento. | 24,45-24,95 sorbe el mate con los ojos cerrados. 25,05 baja el mate, mira a cámara con media sonrisa (CARA.sonrisa suave). **25,20 · voz (Algenib): "Ya vino, Graciela."** (~1,3 s). Subtítulo con **"vino,"** en el recuadro verde. La música baja 9 dB mientras habla. | sorbo 24,45; voz |
| 26,70-28,50 | **Q5 general = encuadre de P6 (callback del remate del remate):** la puerta al fondo, el celular de Rubén sobre el mostrador en primer término a la derecha. | 26,75 · Walter, ya en la puerta con su bolsa, se da vuelta: burbuja **"¡Ah! ¿Me guardás un dulce de leche?"** (pop). Rubén ni se mueve. 27,25 · el celular **vibra** y aparece, pegada a cámara sobre el celular, la respuesta del agente: **"Reservado. Te espera hasta el viernes."** (navy claro, "respondido automáticamente"). 27,55 · Walter mira su celular, contento, pulgar arriba con la mano (gesto, no emoji). 27,85 · Rubén levanta el mate a cámara y **guiña** (ojos.guiño). | pop 26,75; vibra 27,25; respuesta.wav 27,30; chime 27,85 |
| 28,50-30,00 | **Q6 general que se abre** (dolly atrás suave): Graciela se va con su yerba, Walter atrás, Rubén con el mate. | 28,55 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Un agente de IA reserva, cobra la seña y avisa por vos"** / **"scalerics.com"** en verde (1,45 s, hasta el final). Sin tarjeta de videollamada. | campanita bajita 29,3 (opcional) |

## Objetos 3D por plano (específicos, sin marcas; que nadie los confunda)
- **Set (todos los planos):** el almacén de abren-hoy por dentro con **pared navy claro `#16243d`**, zócalo navy
  `#0b1220`; estantería normal a la izquierda con mercadería de colores planos (crearYerba, crearGalletitas,
  crearFideos, crearDulceDeLeche, latas, sachets) y **una fila de yerba** con su etiqueta de precio (vacía en la parte
  1 con el cartelito "AGOTADA"; en la parte 2 vuelve el paquete); mostrador de abren-hoy; puerta vidriada con marco
  navy y cartel colgante "ABIERTO" al fondo; vidriera con luz de mañana.
- **Estante GUARDADOS (P1 al fondo, P2, P4, P5 desenfocado, Q2):** estantería de 3 tablas de madera clara sobre la
  pared derecha detrás del mostrador, ~1,6 m de ancho; arriba, **cartel de madera crema con "GUARDADOS"** en Lexend 800
  navy (TextGeometry o canvas). Las tablas se curvan levemente en P2 (deformación de vértices por T, determinista).
  En Q2 están rectas.
- **Bolsas de papel madera** (crearBolsaPapel) con cosas que asoman y **papelitos** crema pegados con una tira de cinta
  (un plano translúcido amarillento): "Walter · ya vengo" (con yerba: crearYerba asomando), "la del perro · a la
  tarde", "Sr. del 4B · ya voy", "el de la gorra · lunes", "sobrino de Marta", "¿?". Cada papelito con letra distinta
  de tamaño (Rubén los escribe apurado), siempre legible en los planos que lo muestran de cerca.
- **Otros guardados:** queso envuelto en papel blanco con hilo, dos panes flauta cruzados, maple de huevos
  (crearMaple), un **zapallo** entero (esfera achatada con gajos marcados, verde oscuro con manchas crema: el detalle
  absurdo), un frasco de dulce de leche (crearDulceDeLeche).
- **Telaraña (P2 final, P4, P6):** 5-6 hilos radiales + 3 vueltas, tubos de ≥ 6 px en pantalla, crema semiopaco, del
  borde de la bolsa de Walter al estante. Motas de polvo: 6-8 esferitas grandes que flotan lento. NO están en la
  parte 2.
- **Celular de Rubén (P1, Q1, Q5):** funda navy, más viejito, sobre la madera del mostrador (el de
  que-en-paz-descanse); pantalla canvas con el chat genérico: encabezado navy con "Walter" y un avatar círculo crema
  con "W"; burbujas crema (cliente) y navy claro (agente, con "respondido automáticamente" en 28 px mínimo); botón
  verde "Pagar seña", tarjeta verde "Seña paga ✓". Vibra = temblor + 2 mm sobre la madera.
- **Celular de Walter (Q3, Q5):** funda crema, en su mano, pantalla con "Seña paga ✓" (grande, se lee de lejos).
- **Mate y termo de Rubén:** crearMate()/crearTermo() (su firma). En P1 escribe con la birome (el mate apoyado al
  lado); desde P3 lo tiene en la mano.
- **Birome:** crearLapicera() de la copia de las-siete (navy con capuchón verde).
- **Contador "Guardados":** placa navy con borde verde pegada a cámara, arriba y limpia (como "Hoy: 47 veces"):
  "Guardados:" en crema y el número en TextGeometry **rojo apagado** con flip/rodillo (3 → 11 → 27 → 28). En Q2 "27" tachado → **"3 · con seña"** en verde. Nunca pisa caras ni el cartel GUARDADOS: si
  el encuadre lo pide, baja el estante en el cuadro, no el contador.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, cola hacia quien habla, pegadas a cámara, máximo
  2 a la vista.

## Qué sumar a personajes.js (en la copia local, partiendo de la de las-siete que ya tiene Walter y la lapicera)
- `ELENCO.walter` tal cual (no cambiarle la cara: es el mismo de las-siete). Pose de "asoma por la puerta": mano en el
  marco, cuerpo inclinado.
- Utilería: `crearCelular(funda)` con pantalla canvas (copiar de que-en-paz-descanse), `crearPapelito(texto)` (plano
  crema con canvas y la tira de cinta), `crearEstanteGuardados()` (con el cartel y las tablas que se arquean por
  parámetro), `crearTelaraña()`, `crearZapallo()`, `crearQueso()`, `crearPanFlauta()`.
- Poses: `ESCRIBE` (Rubén con la birome sobre el papelito, mano izquierda sujetando el papel), `OFRECE` (la de
  lo-mismo-que-la-otra-vez, con la bolsa), `PALMADITA` (Graciela, mano en el antebrazo de Rubén), giro de cabeza
  sincronizado de Rubén y Graciela (P3).

## Cámara
PLANOS de abren-hoy (cortes entre planos, Catmull-Rom adentro de cada uno). P4 es la zambullida (del estante entero
al papelito de Walter) y P2 el dolly atrás que acompaña el estante que crece. Los planos de la parte 2 repiten EXACTO
el encuadre de su par de la parte 1 (P1→Q1, final de P2→Q2, P3/P6→Q3 y Q5, P5→Q4): el callback se ve. En las
transiciones siempre hay un objeto grande en cuadro, nunca la pared navy lisa.

## Sonido por tramo (techo -31 LUFS por efecto; voz ≥ 6 LU arriba del resto mientras habla; final -14 LUFS, pico -1,5)
- **0 a 8,2:** ambiente (calle.wav con pasabajos), pizzicato liviano; notification, birome y cinta (papel.wav),
  burbujas de chat, pops de cada guardado (variar tono) con apoyo bajo (sello.wav), key-press del contador cada vez
  más seguido, tic-real en cada cambio de día y la ráfaga de tic/tac en "UN MES DESPUÉS", campanita y pasos de
  Graciela, whoosh del giro de cabezas y de la zambullida.
- **8,2 a 11,4:** **la música se corta seca**; solo ambiente. Whoosh corto del push-in y la voz. Silencio después.
- **11,4 a 14,4:** campanita (entra), pops de las burbujas de Walter, campanita (sale), **tuba** en el 28,
  palmaditas.
- **Cartel:** como abren-hoy-completo (whoosh, stinger CC0, narrador, whoosh del iris).
- **17,6 a 30,0:** música tranquila (pizzicato más bajo, nunca se corta: todo anda), notification, respuesta.wav en
  cada respuesta del agente, click-soft del botón, ding (cero.mp3) en "Seña paga ✓" y en "3 · con seña", whoosh de la
  yerba que vuelve, campanita, sorbos, vibra, chime del guiño; la música baja 9 dB mientras habla Rubén.
- Todo con grabaciones reales ya registradas (ver fuentes.md). No usar golpe.mp3 ni tictac.wav (sin licencia
  registrada). Nada sintetizado.

## Portada (portada.json, fondo LIMPIO=1, sin burbujas ni subtítulos ni contador ni pill)
- Fondo: P2 ~5,0 s (el estante GUARDADOS lleno y arqueado, la bolsa de Walter con telaraña) o P4 ~7,6 s (el papelito
  "Walter · ya vengo" con la telaraña); zoom 1,3.
- `chica`: "¿Me lo guardás?" · `grande`: "Ya vengo." · `sello`: "Para mandar" · acento y sello `#5ce611`.

## Duración
Parte 1 14,4 s + cartel 3,2 s + parte 2 12,4 s = **30,0 s**. Voz: Rubén ×2 (Algenib: "Ya viene, Graciela." / "Ya
vino, Graciela."), narrador del cartel (Rasalgethi: "Un agente de IA más tarde."). Graciela y Walter solo en burbujas.

## Riesgos para el QA (buscarlos a propósito)
- Los papelitos: que se lean enteros en P1 y P4 (ni cortados por el borde ni tapados por la telaraña o la burbuja).
- La telaraña: gruesa y limpia (no se ablanda en la compresión), solo en la parte 1; no atraviesa la yerba.
- Continuidad del estante: lo que entra en P2 sigue igual en P3, P4 y P6 (mismas bolsas, mismos papelitos); el hueco
  de la yerba vacío en toda la parte 1 y lleno desde 21,9 en la parte 2.
- La bolsa que Rubén le ofrece a Walter en P6 es la de la telaraña (la telaraña se estira o se corta, no flota sola).
- Manos: la birome no atraviesa el papel ni la mano; la palmadita de Graciela en el antebrazo, no en la cara; la mano
  de Walter en el marco de la puerta, no adentro del vidrio.
- El contador no nace dentro de una cabeza ni tapa el cartel GUARDADOS.
- Texto: nada crema sobre crema; burbujas crema con borde navy sobre la pared navy claro.
- Walter: el mismo de las-siete (ropa y cara iguales).
