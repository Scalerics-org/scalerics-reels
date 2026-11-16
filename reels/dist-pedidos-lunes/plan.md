# dist-pedidos-lunes · plan plano por plano · DISTRIBUIDORAS, dolor + solución (3D real), ~32,6 s

**De qué trata.** Lunes, 8:00, la oficina vidriada de Rubén arriba del depósito. El celular con **40 sin leer**: audios,
fotos de listas en papel y "lo de siempre". El audio de Graciela (4:12, a 2x) termina en **"…mandame lo de siempre.
¡Besos!"** / Rubén: **"Cuatro minutos para decir lo de siempre."** La foto de la lista de Marta: **"¿Eso es un siete o
una mosca?"** Ráfaga muda de pedidos mientras Rubén tipea con dos dedos; el reloj de pared gira de 8:00 a 11:00, el
termo se vacía, la planilla llega a 39. Walter: "Rubén, ¿y mi pedido?"; su mensaje de las 8:04 estaba aplastado entre
dos audios: **"Dejá, Rubén. Lo de siempre se lo pedí a otro."** Pausa (el tic del reloj). Rubén: **"Lo de siempre era
yo."** Remate del remate: Graciela, "Cambié todo. Te mando audio." (▶ 6:40) y el mate lavado que suena en vacío.
Cartel **"Un catálogo de pedidos más tarde…"**. Parte 2 (la mitad del reel): otro lunes a las 8:00, Graciela toca
**"Repetir lo de siempre"** en el catálogo ("Lo de siempre.": un toque), Marta pone 7 de café con el "+" (Rubén:
**"Siete. Sin mosca."**), los pedidos caen ordenados en el panel (40 de 40 ✓ a las 8:05, Walter con tilde verde),
"Mandar a armar" y el operario arma el pallet WALTER. Rubén: **"Ocho y cinco. ¿Y ahora qué hago hasta las once?"** /
Nico: **"¿Vender?"** Cierre: Rubén a cámara: **"Comentá PEDIDOS y te mando cómo funciona para tu distribuidora."**

- **Producto:** sistema a medida / tienda mayorista: **catálogo de pedidos para los clientes de la distribuidora**. Cada
  cliente entra desde el celular, ve **su** lista de precios, repite "lo de siempre" con un toque o arma el pedido con
  "+", y el pedido **cae ordenado en el panel** del dueño (cliente, productos, hora, total) y **pasa al depósito como
  lista de armado por pasillo**. Nadie pasa nada a mano. Se ve en pantalla (parte 2) y se dice en `descripcion.txt`.
- **Sin marcas:** chat genérico (burbujas crema y verdes, sin el verde ni el logo de ninguna app, sin "✓✓" azules), la
  planilla genérica (grilla crema con encabezado navy, sin ícono ni interfaz de ningún programa; la palabra "planilla"
  ni se dice), celulares sin logo, catálogo y panel con la marca inventada "Distribuidora Rubén", productos sin marca
  (aceite en caja kraft con la botella dibujada, "HARINA 000", café en grano en bolsa crema lisa).
- **Estructura** (distinta de los "para mandar" anteriores, por "ANTES QUE TODO"): parte 1 **13,6 s** (dolor) +
  cartel **2,4 s** + parte 2 **12,8 s** (solución) + cierre **3,8 s** (Rubén a cámara + tarjeta PEDIDOS). Solución +
  cierre = 16,6 s de 32,6 s (51 %). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, como dice-cuarenta.
  Cartel: el de ya-lo-cargo/dice-cuarenta con el texto **"Un catálogo de pedidos" / "más tarde…"** (toma nueva de
  Rasalgethi; si no queda bien en 2,4 s, se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav`
  y el cartel dice "Un sistema" / "más tarde…").
- **Sin línea chica final de "para mandar":** la reemplaza el cierre de "ANTES QUE TODO" (Rubén a cámara + tarjeta
  PEDIDOS + scalerics.com chico). Sin tarjeta de videollamada en el video (la videollamada va en `descripcion.txt`).

## Por qué el cierre lo dice Rubén (y no un narrador)
1. **"Te mando"** está en singular: es la voz de una persona, no de una marca. En boca de Rubén es un dueño de
   distribuidora hablándole a otro dueño ("esto me pasaba a mí, te mando cómo funciona"), que es lo que hace que el
   que mira comente; en boca de un narrador suena a aviso.
2. Los reels que saltaron (anotamelo, abren-hoy-completo, hacen-envios) **no tienen narrador**; Orus narrando fue lo
   que no anduvo (`stats.md`). Romper la ficción con una voz nueva a los 29 s es donde se va la gente.
3. La voz ya la conocen (Algenib) y la cara también: Rubén mirando a cámara, con el mate lleno, después de "¿Vender?",
   es el cierre natural (ya no tiene nada que hacer hasta las once: se pone a hablar con vos). La mirada a cámara de
   la-lista era el remate; acá es la invitación, con media sonrisa y sin chiste.
4. El texto exacto de Juan se respeta palabra por palabra; PEDIDOS va en mayúsculas en pantalla y en
   `descripcion.txt`.

## Personajes (copia local de `reels/dice-cuarenta/assets/personajes.js`, que ya tiene todo lo de la distribuidora)
- **Rubén = ELENCO.ruben** (NO `almacenero`): camisa navy3 manga larga arremangada, cuello crema, sin delantal, bigote,
  panza. Sentado al escritorio casi todo el reel; el mate en la mano izquierda, el celular en la derecha. Poses nuevas:
  **tipear con dos dedos** (índices extendidos, el resto cerrado, manos que suben y bajan alternadas como función del
  tiempo) y **zoom con dos dedos** sobre el celular (pulgar e índice que se abren). Voz Algenib.
- **Graciela = ELENCO.clienta** con el **delantal crema** de ya-lo-cargo (dueña de la rotisería). En la parte 1 solo
  como avatar redondo en el chat y su voz por el audio; en la parte 2, en cuadro en la rotisería (Q1). Voz Gacrux.
- **Marta = ELENCO.duena** con su delantal verde (dueña de la cafetería). Parte 1: avatar en la foto de la lista;
  parte 2: en su cafetería (Q2), el celular en la mano. Sin voz.
- **Walter = ELENCO.walter** (acá, dueño del bar): solo avatar redondo en su burbuja y en el audio. Voz Umbriel.
- **Nico = ELENCO.empleado** con el maletín de muestras navy (de ya-lo-cargo, crearMochila): asoma por la puerta de la
  oficina en Q4. Voz Fenrir.
- **El operario** (extra sin voz, el de dice-cuarenta: chaleco verde, gorra navy) con la zorra y una tablet en Q3.
- Beto (kiosco), Nelly (panadería) y Fede (rotisería) solo como avatares en las burbujas mudas de la ráfaga (caras del
  módulo con `crearPersonaje` genérico renderizadas chicas en un círculo).

## Paleta y set (para "Hechos")
**Oficina de Rubén un lunes a las 8 de la mañana: paredes crema `#efeee5` con zócalo navy3 `#1f3254`, luz de mañana
fría y rasante que entra por una persiana americana y deja franjas planas en la pared y el escritorio (color plano, sin
degradé: que no haga bandas en Instagram), el reloj de pared grande como protagonista; por el ventanal, el depósito con
racks navy3 y largueros verdes y el camión esperando.** Distinto de la-lista (la oficina de noche con lámpara cálida
sobre depósito navy oscuro), de dice-cuarenta (abajo, entre los racks, navy claro) y de ya-lo-cargo (calle de mediodía,
rotisería, depósito de día desde el piso). Anotar en "Hechos": "oficina de mañana, pared crema #efeee5 con zócalo
navy3 y franjas de persiana planas, reloj de pared protagonista; parte 2 con interfaz recreada (catálogo + panel) a
pantalla casi completa".
- **Oficina (el set principal, ~70 % del reel):** la oficina vidriada de la-lista/ya-lo-cargo (escritorio de madera
  clara, monitor grande con pantalla canvas, teléfono de escritorio, mate y termo, pila de remitos con broche), pero de
  día: la pared del fondo **crema** con un **reloj de pared grande** (R ≈ 0,32 m, el de `crearReloj` agrandado: tiene
  que leerse la hora en el plano medio) y un **almanaque de distribuidora no** (eso fue anotamelo): en su lugar, un
  pizarrón blanco chico con "LUNES" escrito en marcador navy. Persiana americana en la ventana lateral. **Nunca pared
  lisa detrás de Rubén:** o el reloj y el pizarrón, o el ventanal con el depósito.
- **Depósito (por el ventanal y en Q3):** el de dice-cuarenta (racks, pallets, cajas kraft, escalera metálica), con el
  **camión de reparto en el muelle con las puertas abiertas y la caja medio vacía** en la parte 1 (esperando los
  pedidos), y cargándose en la parte 2.
- **Rotisería de Graciela (Q1):** la de ya-lo-cargo (spiedo con pollos girando, vitrina, pizarra "POLLO · MILANESA ·
  TARTA"), a las 8:00: el spiedo recién prendido.
- **Cafetería de Marta (Q2, nuevo, chico):** barra de madera clara con frente navy3, **máquina de espresso** crema con
  dos grupos y los portafiltros navy, molinillo con la tolva llena de granos, una pila de tazas crema, pizarra navy
  "CAFÉ · MEDIALUNAS" en tiza crema. Solo de fondo del inserto del celular de Marta.
- **Rojo apagado `#c7655b` SOLO para el problema:** el mensaje perdido de Walter (borde), "39 de 40", el "▶ 6:40".
  **Verde `#5ce611` para lo resuelto:** "Repetir lo de siempre", "Pedido ✓", las tildes del panel, "40 de 40 ✓",
  "Cargados a mano: 0", el 7 de Marta, la tarjeta PEDIDOS, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Las que salen del celular de Rubén llevan avatar redondo + "Nombre · Comercio". Sobre la pared crema,
  siempre con el borde navy grueso (nada de crema sobre crema sin borde).
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco sobre fondo claro.

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/dice-cuarenta/assets/tres.js` y `personajes.js`, `reels/la-lista`, `reels/ya-lo-cargo`):
- Oficina vidriada con escritorio, monitor (pantalla canvas: `dibujarMonitor`), teléfono de escritorio, ventanal que da
  al depósito (la-lista / ya-lo-cargo).
- Depósito: `crearRack`, `crearPallet` (con el cartel kraft colgado de ya-lo-cargo: "WALTER"), `crearPalletLleno`,
  `crearCajaAceite`, `crearBolsaHarina`, escalera metálica (dice-cuarenta).
- `crearCamion` (camión de reparto en el muelle), zorra y el operario (dice-cuarenta).
- `crearCelular` (pantalla canvas; `dibujarCeluN` de dice-cuarenta como base del chat), `crearTablet` (la del operario
  en Q3), `crearMate`, `crearTermo`, `crearVapor` (el termo humeando en Q4), `crearMochila` (maletín de Nico).
- `crearReloj` (con `userData.poner(h, m, s)`: se agranda y se cuelga en la pared; el time-lapse es solo cambiar los
  argumentos con el tiempo).
- Rotisería con spiedo (ya-lo-cargo). Cartel time card (ya-lo-cargo / dice-cuarenta).

**Nuevos** (específicos, que nadie los confunda):
- **Persiana americana con franjas de luz (crearPersiana):** láminas crema finas inclinadas en la ventana lateral; la
  luz de mañana pasa por las ranuras y deja **franjas planas** sobre la pared crema y el escritorio (no sombras
  degradadas: textura de franjas proyectada o planos de color con opacidad dura). En el time-lapse (P3) las franjas
  cambian de ángulo y se corren (función del tiempo): eso, más el reloj, dice "pasaron tres horas".
- **Termo que se vacía (estado del termo):** en P1 parado; en P3 se inclina cada vez más (Rubén lo vuelca de a poco
  para cebar, 3 veces); en P5 queda **acostado sobre el escritorio** con la tapa abierta. En Q4, parado y con vapor.
  (Es el mismo `crearTermo` con poses; lo nuevo es la animación y la gota que no cae.)
- **Pizarrón chico "LUNES"** en la pared (blanco crema con marco navy3, marcador navy, Caveat 700 ≥ 56 px).
- **Cafetería de Marta (Q2):** máquina de espresso (cuerpo crema con canto navy, dos grupos con portafiltros navy de
  mango, bandeja de goteo gris claro, manómetro redondo), molinillo con tolva transparente llena de granos marrón café
  `#5a3a24`, pila de tazas, barra de madera clara. Solo de fondo, que se reconozca como cafetería en un vistazo.
- **Bolsa de café en grano (para el catálogo, dibujito plano en la interfaz, no 3D):** bolsa crema con válvula y
  "CAFÉ EN GRANO 1 kg".
- **Puerta de la oficina** con vidrio esmerilado para que Nico asome (Q4): marco navy3, picaporte, se abre 40°.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el inserto)
**El celular de Rubén, parte 1 (chat genérico):**
- Encabezado navy: "Pedidos · Lunes" con el globito verde **"40"** sin leer (el número que vibra).
- P1: el audio de Graciela (avatar + "Graciela · Rotisería"): botón play crema, onda de barras navy, **"2x"** en un
  chip, la barra de progreso en **4:05 / 4:12** que llega a 4:12.
- P2: la foto de Marta ("Marta · Cafetería"): papel cuadriculado torcido con la mancha marrón de un pocillo, escrito a
  mano en Caveat grafito: "Café en grano x [garabato]", "Azúcar x 2", "Leche x 12", "Medialunas (las de siempre)". Al
  hacer zoom, el garabato es un 7 corrido con **una mancha negra chica al lado con dos alitas** (que pueda ser una
  mosca: se tiene que entender sin sonido).
- P3 (ráfaga, burbujas que caen): "Lo de siempre." (Beto · Kiosco) · "Lo mismo que el lunes, sin azúcar." (Nelly ·
  Panadería) · "▶ 2:51" (Fede · Rotisería) · una foto torcida · "Lo de siempre." (Walter no: el de Walter ya quedó
  arriba).
- P4: burbuja de Walter (Walter · Bar): **"Rubén, ¿y mi pedido?"** · al subir: el mensaje de las **8:04**, "Lo de
  siempre + 2 de aceite", entre dos audios ("▶ 3:20", "▶ 1:58"), con borde rojo apagado y sin leer · después, el audio de
  Walter (onda + avatar) mientras habla.
- P5: Graciela: **"Rubén, cambié todo. Te mando audio."** y el audio **"▶ 6:40"** (el número en rojo apagado).

**El monitor de Rubén, parte 1 (planilla genérica):** grilla crema con encabezado navy: Cliente / Producto / Cant. En
P3 las filas se llenan de a una ("Graciela · Aceite 1,5 L x 12 · 4", "Marta · Café en grano · ¿7?", "Beto · …"); abajo a
la derecha el contador **"Cargados: 12 / 27 / 39"**; en P4, **"39 de 40"** en rojo apagado.

**El celular de Graciela, parte 2 (Q1, el catálogo):**
- Arriba, franja navy: **"Distribuidora Rubén"** y abajo, chico, **"Tus precios · Rotisería Graciela"**.
- Botón verde grande, ancho completo: **"Repetir lo de siempre"** (con una flechita circular).
- Al tocarlo, el carrito se llena con pop por fila (dibujito plano de cada producto a la izquierda):
  "Aceite 1,5 L x 12 · $ 1.140 · 4" · "Harina 000 · 25 kg · $ 890 · 2" · "Azúcar 1 kg x 10 · $ 610 · 1" · "Agua 2 L x 6 ·
  $ 320 · 3" · Total **$ 7.910**. Precios de ficción, chicos (que no compitan con el chiste).
- Botón **"Pedir"** → **"Pedido ✓ · Lo armamos hoy"** en verde.

**El celular de Marta, parte 2 (Q2):** el mismo catálogo ("Tus precios · Cafetería Marta"), la fila "Café en grano 1
kg" con el selector [–] **7** [+]: el 7 crece en cada toque (1… 4… 7) y queda **enorme, verde, sin mancha**. "Pedir ✓".

**El panel de pedidos de Rubén, parte 2 (Q2-Q3, monitor):**
- Encabezado navy: **"Pedidos · Lunes"** y a la derecha el reloj del panel **"8:05"**.
- Contador grande arriba: **"Pedidos de hoy: 40 de 40 ✓"** (sube 12 → 27 → 40 con un tic por número); debajo, chico:
  **"Cargados a mano: 0"**.
- Columnas: **Nuevos · Para armar · Listos**. Filas (cliente, resumen, hora, total, tilde verde):
  "8:01 · Graciela · Rotisería · Lo de siempre · $ 7.910 ✓" · "8:02 · Marta · Cafetería · Café en grano 1 kg x 7 ✓" ·
  "8:04 · Walter · Bar · Lo de siempre + 2 de aceite ✓" (se **ilumina en verde** un instante: es el que se había
  perdido) · y más filas que entran rápido.
- Botón verde **"Mandar a armar"** → las filas pasan a "Para armar".

**La tablet del operario, parte 2 (Q3):** "Para armar · Walter · Bar" y la lista **ordenada por pasillo**: "Pasillo 2 ·
Aceite 1,5 L x 12 · 6 ☐" · "Pasillo 4 · Harina 000 · 2 ☐" · "Pasillo 5 · Agua 2 L x 6 · 4 ☐"; cada casilla se tilda en
verde cuando la caja va al pallet "WALTER".

**Tarjeta de cierre (HTML, ~3,8 s, sobre Rubén a cámara):** abajo de la cara (nunca encima), en el 80 % seguro:
"Comentá" (Lexend 800 crema, ~90 px) / **"PEDIDOS"** (Lexend 900 ~170 px, navy en el recuadro verde de selección) /
"y te mando cómo funciona para tu distribuidora" (Lexend 600 crema ~46 px, 2 líneas) / **"scalerics.com"** chico en
verde (~44 px) en la última línea. Entra sobre "PEDIDOS" de la voz.

## PARTE 1 · el problema (0,00-13,60 s)

Cámara continua (Catmull-Rom) dentro de la oficina, sin salir: push-ins al celular y al monitor y una órbita corta en el
time-lapse. Los insertos de pantalla son la cámara que llega al celular hasta que llena ≥ 60 % del cuadro (nunca
pantalla lisa).

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-1,60 | **P1 · cuadro 0.** Plano medio de Rubén sentado al escritorio, de 3/4: el celular en su mano derecha en primer término, el monitor a la izquierda, el reloj de pared grande arriba a la derecha (8:00), la persiana con franjas de luz; por el ventanal, el depósito y el camión. Push-in lento al celular. | **Cuadro 0:** arriba, **"DISTRIBUIDORAS"** (Lexend 900 ~130 px, crema con borde navy de 12 px y sombra dura, entero desde el cuadro 0) y debajo **"Lunes, 8:00."** (Lexend 700 ~64 px, verde). El celular ya vibra con "40"; el audio de Graciela ya corre a 2x en 4:05. 0,15-1,45 · **Graciela (audio, 2x): "Y nada, Rubén, así que mandame lo de siempre. ¡Besos!"** El rótulo DISTRIBUIDORAS se queda hasta 1,8 s y sale hacia arriba; arrancan los subtítulos. | oficina, escritorio, monitor con planilla vacía, celular, reloj 8:00, persiana, termo y mate, ventanal con depósito y camión, Rubén | ambiente de oficina de mañana (`zumbido.wav` bajo + un camión que espera en marcha, `k-motor-bajo` muy bajo) · música desde 0,0 · vibra cada 0,4 s (`vibra.wav`, bajo) · notification chico ×2 |
| 1,60-3,80 | **P2 · "Cuatro minutos".** Primer plano de Rubén, el celular entra por abajo con la barra en 4:12. | 1,55 · el audio termina (clic de fin). 1,70 · Rubén mira la duración, cara de nada. 1,80-3,60 · **Rubén: "Cuatro minutos para decir lo de siempre."** (subtítulo con "lo de siempre" en el recuadro verde). | Rubén, celular | click-soft 1,55 · notification chico 3,70 (entra la foto) |
| 3,80-5,40 | **P3 · la foto.** Push-in al celular hasta inserto (≥ 60 %): la foto de la lista de Marta; los dedos de Rubén hacen zoom. | 3,90 · zoom con dos dedos sobre "Café en grano x [garabato]": aparece la mancha con alitas. 4,10-5,30 · **Rubén: "¿Eso es un siete o una mosca?"** | celular, mano de Rubén | pop 3,80 · roce de pantalla (`k-cloth_1` bajo) 3,90 |
| 5,40-7,60 | **P4 · la ráfaga y las tres horas.** Órbita corta y lenta alrededor del escritorio, de frente a Rubén, que deja el celular parado contra el monitor y tipea con dos dedos. El reloj y el termo siempre en cuadro. | Burbujas mudas que caen en el celular, cada vez más rápido (5,45 "Lo de siempre." · 5,75 "Lo mismo que el lunes, sin azúcar." · 6,00 "▶ 2:51" · 6,20 foto · 6,40 "Lo de siempre."), el globito sigue en 40. **Time-lapse 5,60-7,40:** el reloj gira de 8:00 a 11:00 (minutero que vuela, horario que avanza 3 horas), las franjas de la persiana se corren, el termo se inclina en tres pasos (Rubén ceba), la planilla suma filas: "Cargados: 12… 27… 39". | Rubén tipeando, celular, monitor, reloj, persiana, termo y mate | pop por burbuja (cada uno un poco más agudo) · key-press en ráfaga (dos dedos: tac… tac… tac, irregular) · tic-tac acelerado del reloj (CC0, ver abajo) · chorro de termo (`k-plastico` + agua, CC0) ×3 |
| 7,60-10,50 | **P5 · "¿Y mi pedido?"** 7,60 el reloj en 11:00 se frena (el segundero da un tic). Push-in al celular (inserto ≥ 60 %). | 7,65 · pop: **"Rubén, ¿y mi pedido?"** (Walter · Bar). 7,95 · Rubén sube en el chat (scroll rápido) y para en el mensaje de las **8:04**, "Lo de siempre + 2 de aceite", aplastado entre dos audios; el borde se pone rojo apagado. 8,40 · entra el audio de Walter (onda + avatar). 8,50-10,30 · **Walter (audio): "Dejá, Rubén. Lo de siempre se lo pedí a otro."** 10,00 · corte al monitor: **"39 de 40"** en rojo apagado. | celular, reloj 11:00, monitor | tic del reloj 7,60 · pop + notification 7,65 · scroll (key-press suave) 7,95 · "tuc" seco (click-soft bajado de tono) al ponerse rojo 8,30 |
| 10,50-12,30 | **P6 · pausa y remate.** Primer plano de Rubén, frontal, el reloj desenfocado atrás arriba. | 10,50-11,00 · **pausa**: Rubén quieto mirando el celular; la música baja a -12 dB en 0,4 s (no se corta); se oye solo el **tic del reloj** y el celular que vibra una vez más. 11,05-12,20 · **Rubén: "Lo de siempre era yo."** (seco, sin levantar la vista). | Rubén, celular, reloj | tic-tac del reloj ×2 · vibra 10,80 · la música vuelve en 12,30 |
| 12,30-13,60 | **P7 · remate del remate.** Plano medio desde el costado del escritorio: Rubén, el celular, el termo volcado. | 12,35 · pop: Graciela, **"Rubén, cambié todo. Te mando audio."** y el **"▶ 6:40"** (rojo apagado) en el celular (burbuja grande en pantalla, sin voz). 12,70 · Rubén, sin cambiar la cara, deja el celular boca abajo. 12,90 · toma mate: **la bombilla suena en vacío** (mate lavado); el termo, acostado en el escritorio con la tapa abierta. 13,50 · stinger. | Rubén, celular, mate, termo volcado | pop + notification 12,35 · celular boca abajo (golpe chico) 12,70 · **sorbo de mate vacío** (`sorbo.wav` del repo; si no suena a bombilla en vacío, uno CC0) 12,90 · stinger 13,50 |

Último cuadro (13,60) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (13,60-16,00 s)
El de ya-lo-cargo / dice-cuarenta (time card de dibujito, fondo verde de marca con manchas y burbujas, letras que
rebotan, -4°): **"Un catálogo de pedidos"** (línea a, ~120 px: es más larga que "Un sistema", que entre en el 80 %
seguro) / **"más tarde…"** (línea b, 146 px). Voz Rasalgethi nueva (`partes/06-narrador.txt`); fallback: la toma de
ya-lo-cargo con "Un sistema" / "más tarde…". Nunca "Scalerics". 2,4 s.

## PARTE 2 · la solución (16,00-28,80 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 16,00-18,80 | **Q1 · Graciela, lunes 8:00.** Plano medio en la rotisería (el spiedo recién prendido atrás), Graciela con el celular; push-in rápido al celular (inserto ≥ 60 %). Chip arriba "Lunes, 8:00." (como en el cuadro 0: callback). | 16,30 · abre el catálogo **"Distribuidora Rubén · Tus precios · Rotisería Graciela"**. 16,60-17,40 · **Graciela: "Lo de siempre."** y toca **"Repetir lo de siempre"** (un toque). 17,40-17,90 · el carrito se llena con pop por fila (4 filas). 18,00 · "Pedir" · 18,20 **"Pedido ✓ · Lo armamos hoy"**. 18,50 · Graciela guarda el celular y da vuelta un pollo. | rotisería, spiedo, Graciela con delantal, su celular con el catálogo | campanita de la puerta 16,00 · click-soft 17,30 · pop ×4 · click-soft 18,00 · ding (`cero.mp3`) 18,20 |
| 18,80-21,40 | **Q2 · Marta y el 7.** Inserto del celular de Marta (≥ 60 %) con la cafetería de fondo (la máquina de espresso). 20,00 la cámara viaja (whoosh, sin corte seco) al monitor de Rubén en la oficina. | 18,90-19,60 · Marta toca "+" en "Café en grano 1 kg": 1… 4… **7**, que queda enorme y verde. 19,70 · "Pedir ✓". 20,00 · en el panel de Rubén entra la fila "8:02 · Marta · Cafetería · Café en grano 1 kg x 7 ✓". 20,20-21,20 · **Rubén (en cuadro, de perfil al monitor, con el mate): "Siete. Sin mosca."** | cafetería (máquina de espresso, molinillo, tazas), celular de Marta, monitor con el panel, Rubén | click-soft ×3 (cada "+") · ding 19,70 · whoosh-short 20,00 · pop 20,05 |
| 21,40-25,00 | **Q3 · los 40 a las 8:05.** Inserto del panel (≥ 60 %), después la cámara baja como grúa por el ventanal hasta el depósito. | 21,40-22,80 · los pedidos caen solos y ordenados, con tilde verde cada uno; el contador sube **12 → 27 → 40 de 40 ✓**; "Cargados a mano: 0"; el reloj del panel y el de la pared en **8:05**. 22,20 · la fila **"8:04 · Walter · Bar · Lo de siempre + 2 de aceite ✓"** se ilumina en verde. 22,90 · Rubén toca **"Mandar a armar"**. 23,10-25,00 · grúa al depósito: el operario con la tablet "Para armar · Walter · Bar" (lista por pasillo) carga cajas de aceite en el pallet **"WALTER"**; cada caja tilda una casilla. | monitor con el panel, reloj 8:05, ventanal, escalera, racks, operario con tablet y zorra, pallet WALTER, cajas de aceite, camión cargándose | pop chico por pedido (ráfaga, bajo) · tic por número del contador · ding al llegar a 40 · click-soft 22,90 · whoosh lento de grúa 23,10 · cajas al pallet (`madera-golpe`) ×3 · bip de tilde (`k-tono` corto) ×3 |
| 25,00-28,80 | **Q4 · "¿Vender?"** La grúa vuelve a subir a la oficina (callback del encuadre del cuadro 0): Rubén al escritorio, el mate lleno, **el termo parado y humeando**, la planilla cerrada, el reloj en 8:05, las franjas de la persiana como a las 8. | 25,20-27,60 · **Rubén: "Ocho y cinco. ¿Y ahora qué hago hasta las once?"** (mira el reloj; ceba). 27,60 · se abre la puerta de vidrio: asoma **Nico** con el maletín de muestras. 27,80-28,30 · **Nico: "¿Vender?"** 28,30-28,80 · Rubén lo mira, cara de nada; gira despacio hacia cámara. | oficina, Rubén, mate, termo con vapor, reloj 8:05, puerta, Nico con maletín | chorro de termo 25,10 · puerta de vidrio que se abre (`puerta-abre.wav`) 27,55 |

## CIERRE (28,80-32,60 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 28,80-32,60 | **C · Rubén a cámara.** Primer plano de Rubén de frente, el mate en la mano, el reloj 8:05 desenfocado atrás arriba (nunca pared lisa). Push-in suave. | 28,90-32,10 · **Rubén: "Comentá PEDIDOS y te mando cómo funciona para tu distribuidora."** (tranquilo, de colega, media sonrisa). 29,30 · sobre "PEDIDOS" entra la **tarjeta** abajo de la cara: "Comentá" / **"PEDIDOS"** (recuadro verde) / "y te mando cómo funciona para tu distribuidora" / **"scalerics.com"** chico en verde. Queda hasta el final. Los subtítulos karaoke se apagan cuando entra la tarjeta (no duplicar el texto). | pop + whoosh-short 29,30 · final de la música |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "DISTRIBUIDORAS" entero y legible desde el primer cuadro, sin tapar la cara de Rubén ni el celular; la
  escena ya en curso (celular vibrando, audio corriendo). Que en 2 s se lea: rubro, lunes 8:00, 40 mensajes.
- **El reloj de pared:** la hora se lee en el plano medio (agujas navy gruesas sobre esfera crema, ≥ 0,32 m de radio) en
  P1, P4, P5, Q3 y Q4; el time-lapse no hace saltar las agujas (giro continuo); en Q4 marca 8:05 exacto.
- **La mosca:** que se lea como mosca chica junto a un 7 corrido, no como una mancha cualquiera (alitas, cuerpo negro);
  en Q2 el 7 es enorme, limpio y verde.
- **Las interfaces:** textos legibles (≥ 36 px en el inserto) y sin cortes por el borde; los precios chicos; nada que
  parezca una app real (ni verde de chat conocido, ni tildes azules, ni ícono de planilla).
- **El termo:** parado en P1, inclinándose en P4, acostado en P7; parado con vapor en Q4. Nunca atraviesa el escritorio
  ni el monitor; la bombilla no atraviesa la cara de Rubén al tomar.
- **Rubén es ELENCO.ruben** en TODOS los planos (ni una instancia de `almacenero`); ojos abiertos cuando habla; en el
  cierre, mirada al lente, sin parpadeo raro; las manos de dos dedos no atraviesan el teclado.
- **Continuidad:** parte 1 de 8:00 a 11:00 (persiana que se corre); parte 2 de 8:00 a 8:05; el camión medio vacío en la
  parte 1 y cargándose en la 2; el pallet WALTER solo en la parte 2.
- **La solución ocupa la mitad:** medir en el render que el cartel arranque antes de los 16,3 s y que parte 2 + cierre
  duren ≥ 16 s. Si hay que recortar, se recorta la parte 1 (la ráfaga), nunca la solución.
- **SFX que no están en assets/sfx** (tic-tac de reloj de pared, chorro de termo, sorbo de mate en vacío si `sorbo.wav`
  no alcanza): reales con licencia CC0 (Kenney del espejo github.com/Daarko/sparkstream-sounds, OpenGameArt), con
  autor, sitio y licencia en `fuentes.md`. Nunca sintetizados con ffmpeg. Si no hay tic-tac CC0, la pausa la marca el
  celular que vibra solo.

## Portada (punto 7 de "ANTES QUE TODO")
`t` ≈ 6,8 (el time-lapse: Rubén tipeando con dos dedos, el reloj girando arriba, el celular con "40" y las burbujas, el
termo inclinado: la escena del dolor llenando la mitad de arriba) o ≈ 11,6 (primer plano de Rubén en "Lo de siempre
era yo.", el reloj en 11:00 atrás). `chica`: "Lunes, 8 de la mañana." · `grande`: "¿Y mi pedido?" · `sello`:
"DISTRIBUIDORAS". Fondo renderizado sin "DISTRIBUIDORAS", subtítulos ni burbujas (`fondo_limpio`).
