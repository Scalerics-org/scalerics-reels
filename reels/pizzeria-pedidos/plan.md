# pizzeria-pedidos · plan plano por plano · PIZZERÍAS, Dos negocios (3D real), ~40,4 s

**De qué trata.** Dos pizzerías en la misma cuadra, el mismo viernes. **Pizzería Don Tano, 21:00:** Tano, con el
celular apretado entre la oreja y el hombro, la birome en la comanda y un bollo de masa en la otra mano: **"Una muzza y
dos fainá… ¿Calle qué?"** / Martín, por teléfono: **"¡Duvimioso Terra!"** / **"Ajá. ¿Con be larga?"** y escribe
DUBIMIOSO sin escuchar el "¡Con V corta!" que sale del teléfono. En el mostrador, el otro celular: 26 mensajes sin
contestar ("¿Hacen envíos?", "¿Cuánto demora?", "Hola??"); al de "¿Cuánto demora?" Tano le graba **"¡Ya sale!"** con la
masa cruda colgando de la mano. 22:10: vuelve Facu, el repartidor, con la caja: **"Tano. Dubimioso no existe."** Pausa.
**"Cenamos."** Abren la caja en el mostrador; vibra el celular: "Martín: ¿Y mi pizza?" y Tano, con la porción de Martín
en la boca, graba: **"¡Ya sale!"**. Cartel **"Mientras tanto, en la de enfrente…"**. **Lucía Pizzas, el mismo viernes:**
Lucía estira la masa con las dos manos; la impresora de comandas saca tickets solos. 22:15, Martín en su sillón recibe el
audio de Tano (el mismo "¡Ya sale!" con la boca llena), abre el menú online de Lucía, pide lo mismo (muzza + 2 fainá),
escribe "Duvi" y el mapa completa **Duvimioso Terra 1432** con el pin, paga: **"¿Ya está?"**. En la cocina de Lucía cae
el ticket #47 impreso y pago; Sabri sale con el recorrido al pin. 22:54, la puerta de Martín: **"¿Martín? Una muzza y dos
fainá."**; abre la caja humeante y le vibra el celular: "Pizzería Don Tano: Disculpá, ¿calle qué?"; Martín mira el
celular, mira la pizza… y muerde. El panel de Lucía: 64 pedidos, pagados, con mapa, 0 que volvieron. Enfrente, Tano en la
puerta con la caja vacía, mirando salir la moto de Sabri: **"¿Y esa cómo hace?"**. Cierre, Lucía a cámara: **"Comentá
MENÚ y te mando cómo funciona para tu pizzería."**

- **Producto: tienda online / menú de pedidos propio con pago** (Scalerics): el cliente entra al menú del local desde el
  celular (link o QR), elige (con mitad y mitad, extras), pone la dirección con autocompletado y pin en el mapa, elige
  envío o retiro y paga; el pedido sale **impreso en la cocina** (ticket con número, ítems, dirección y "PAGADO") y entra
  en el **tablero de pedidos** (En horno / Listo / En camino); el repartidor abre el recorrido al pin; el cliente recibe
  "Tu pedido salió"; el dueño ve el panel del día. **No es agente de IA:** no se nombra así en ningún lado. Se nombra en
  el rótulo de Q1 ("Los pedidos entran solos, en orden"), en el vinilo "Pedí online" de la vidriera de Lucía, en la línea
  chica final ("Menú online con pedidos y pago" / scalerics.com) y en `descripcion.txt`. Nunca "Scalerics" en el cartel.
- **Sin marcas:** chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp), botón "Pagar" genérico sin
  logos de medios de pago, ninguna app de delivery nombrada ni dibujada, celulares/tablet/impresora/motos sin logo,
  cajas kraft con "DON TANO" o "LUCÍA · PIZZAS" (inventados), latas y botellas sin etiqueta. El mapa es un mapa plano
  propio (manzanas crema, calles navy claro, el pin verde), sin estilo de ningún proveedor de mapas.
- **Sin datos de afuera** (ver `fuentes.md`): $ 740, 26, 3, $ 2.220, 64, #47, las horas: todo del caso. Lo único real es
  el nombre de la calle Duvimioso Terra (verificado; el 1432 es inventado).
- **Estructura:** parte 1 (Don Tano) **15,6 s** + cartel **2,3 s** + parte 2 (Lucía) **19,1 s** + cierre **3,4 s** =
  **40,4 s**. Solución + cierre = 22,5 s (**56 %**). **Ojo con el largo:** si pasa de ~42 s, recortar primero Q1 (la
  grúa: 2,5 → 2,0 s), el tablero de Q3 y el panel Q5 (2,4 → 2,0 s); nunca la pausa antes de "Cenamos." (mínimo 0,6 s)
  ni el "mira el celular, mira la pizza, muerde" de Q4 (mínimo 1,6 s: es el remate de la parte 2).
- **Proyecto 3D:** copia de **`reels/resto-reservas`** (restaurante, personajes de comedia, gen.mjs con T1/T2, medir.py,
  snap.sh, partes/procesar.sh) o de `reels/vete-racion` (crearCelular con chat, tablet en atril, time card verde).
  **La pizza:** partir de `crearPizza` / porciones de `reels/mesa-doce/assets/tres.js` (masa, borde dorado, queso,
  tomate, aceitunas verdes) y la porción de muzza con aceitunas enteras de `reels/tres-segundos/assets/tres.js`; sumar
  el fainá (nuevo). Personajes con `assets/personajes.js` (sumar los nuevos al módulo, mismo estilo).
- **Nadie queda mal parado:** Tano es simpático, rápido y está solo contra todo un viernes; los chistes son de la
  situación (la comanda, el celular en el hombro, el "ya sale" que dice todo el rubro). Se ríe él mismo ("Cenamos.") y al
  final mira enfrente con curiosidad de colega ("¿Y esa cómo hace?"): es el que mira el reel, y Lucía le contesta con
  el cierre. Lucía no se burla de nadie ni mira a Tano: trabaja tranquila. Martín no es malo con Tano: tiene hambre.
  Facu lo dice sin reproche.

## Paleta y set (para "Hechos"; distinto de los recientes y del gym-cupo navy que se hace en paralelo)
**Dominante: la calle de noche y dos interiores enfrentados en espejo, con el ladrillo de las pizzerías hecho en la
paleta de marca.** Recientes: cocina navy claro y recepción crema (vete-racion), galpón navy (ferreteria), consultorio
crema (estetica), depósito (dist-cartera), parrilla navy (resto-reservas, parrilla-no-vuelve), pizzería cálida
(mesa-doce). Este reel:
- **Pizzería Don Tano (P1-P4, Q5b):** pared de **azulejo blanco "subte"** crema `#efeee5` con junta navy hasta 1,6 m y
  arriba pared **verde apagado `#365f28`** plana; **horno pizzero de acero** navy3 de dos bocas con la puerta abierta y
  luz crema cálida plana adentro (sin bloom); campana de acero gris `#b9bec4`; mostrador de mármol crema con frente
  navy; **la pizarra de precios** navy con tiza crema ("MUZZA $ 520 · FUGAZZETA $ 580 · FAINÁ $ 110"); pila de cajas
  kraft; el gancho de comandas con 8-10 papelitos clavados; harina en el mostrador (manchas crema planas, no partículas).
  Luz de tubo crema plana arriba. Desorden: papeles, la birome, la masa, dos celulares.
- **Lucía Pizzas (Q1, Q3, Q5, cierre):** EL MISMO módulo en espejo (para que se lea "mismo rubro, misma calle"), pero la
  pared de arriba **navy claro `#16243d`** y el frente del mostrador **verde de marca `#5ce611`** en una franja; el
  mismo horno; ordenado: **la impresora térmica** chica navy en el mostrador, **el riel de tickets** de acero con 5-6
  tickets colgados en fila, **la tablet en atril** con el tablero de pedidos, el estante de cajas armadas con el ticket
  pegado. Vinilo crema en el vidrio: "Pedí online" con un QR (cuadritos navy planos, ilegible a propósito).
- **La calle (Q1 grúa, Q5b):** calle de adoquines navy `#0b1220` lisa con líneas de junta navy2, veredas crema
  `#d9d7c9`, las dos fachadas enfrentadas: **toldo navy con "DON TANO · PIZZAS" en crema** y **toldo crema con "LUCÍA ·
  PIZZAS" en navy**, la luz de las vidrieras crema plana, un farol, la moto de Facu (navy3) en la puerta de Tano. Cielo
  navy liso, sin estrellas.
- **Living de Martín (Q2) y su puerta (Q4):** sillón verde apagado `#365f28`, pared crema, lámpara de pie; puerta navy2
  con marco crema, timbre, luz de palier crema.
- Anotar en "Hechos": "dos pizzerías enfrentadas en espejo (Don Tano: azulejo subte crema y pared verde apagado; Lucía:
  pared navy claro con franja verde), la calle de noche con los dos toldos, living de Martín; interfaz recreada (chat,
  menú online con mapa y pago, ticket impreso, tablero de pedidos, panel); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** el contador "26 sin leer", "Mensajes sin contestar: 26", "Pizzas
  que volvieron hoy: 3 · $ 2.220", la B tachada de la comanda, "¿Y mi pizza?", el 3 y el 26 del panel antes de girar.
  **Verde `#5ce611` para lo resuelto:** el pin del mapa, cada ✓, "Pagar"/"Pagado ✓", "PAGADO ✓" del ticket, "En
  camino", "0", la tarjeta MENÚ, el recuadro de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla (las del teléfono, con cola al celular del hombro y un borde punteado); se revelan por frase entera.
  "Una muzza y dos fainá" (P1) y "Una muzza y dos fainá." (Q4, Sabri) con la misma tipografía y tamaño: que se lea el
  callback. "¡Ya sale!" (P2 y P4) igual las dos veces.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "PIZZERÍAS" en el cuadro 0):
  "Viernes, 21:00." · "Viernes, 22:10." · parte 2: "Viernes, 21:00." · "Viernes, 22:15." · "Viernes, 22:54.". Con
  cada chip, una etiqueta chica del local ("DON TANO" en crema / "LUCÍA" en verde) para que nunca se dude de qué
  pizzería es. Cambio con flip corto + `k-tick-1`.
- Texto en pantalla: crema sobre navy, navy sobre crema; nunca crema sobre el azulejo blanco ni sobre el mármol.
  Rótulos con línea guía en caja navy `#0b1220`, texto crema, borde crema de 6 px; las guías nunca cruzan una cara.

## Personajes (nuevos; sumar a `assets/personajes.js` con el estilo del módulo)
- **Tano** (Algieba). Dueño de Pizzería Don Tano, ~55. Piel trigueña, pelado arriba con costados canosos cortos
  (peinado "costados", pelo gris), **cejas gruesas negras canosas**, sin bigote (para no confundirlo con Rubén ni con
  Raúl), panza 1.12. Remera navy2 de manga corta, **delantal crema enharinado** (manchas blancas planas) con borde navy,
  un repasador verde apagado al hombro (el hombro izquierdo, el del celular, queda libre para el celular). Expresiones:
  P1 `concentrada` apurada; P2 `sonrisa` de vendedor al grabar el audio; P3 `sorpresa` leve → `neutra` en la pausa;
  P4 `resignado` con media sonrisa ("Cenamos."), boca llena (mejillas infladas, `boca` cerrada masticando); Q5b
  `esperanza`/curioso. **El celular en el hombro:** el teléfono apretado entre la oreja y el hombro, la cabeza ladeada
  (que el celular TOQUE oreja y hombro, sin atravesarlos; revisar de 3/4 y de frente). Ojos abiertos al hablar.
- **Lucía** (Erinome). Dueña de Lucía Pizzas, ~38. Piel morena, pelo negro en rodete con **pañuelo verde de marca**,
  aros crema, remera crema, **delantal navy** con borde verde, antebrazos con un poco de harina. Tranquila, sin mirar el
  celular en ningún momento (las dos manos en la masa). Cierre `sonrisa` de colega. Labios pegados, sin doble boca.
- **Martín** (Enceladus). Cliente, ~32. Piel clara, pelo castaño texturado, barba corta, buzo verde apagado `#365f28`
  con capucha, jogging navy, medias (en el living, sin zapatillas). P1/P2 solo como voz del teléfono (no aparece en la
  parte 1). Q2 en el sillón: `fastidio` con hambre → `incredula` contento ("¿Ya está?"). Q4 en la puerta `sonrisa`, mira
  el celular `neutra`, mira la pizza y muerde (la porción TOCA la boca, no la atraviesa; la mordida se ve como un
  hueco en la punta de la porción).
- **Facu** (Puck). Repartidor de Tano, ~22. Piel media, pelo negro corto (oculto bajo el casco en P3), campera navy3
  con franja crema reflectiva, **casco** (ver objetos) con la visera levantada, **mochila térmica**. P3 `cansado`/neutra;
  P4 se saca el casco (el casco va a la mano, el pelo aparece aplastado) y agarra una porción.
- **Sabri** (Despina). Repartidora de Lucía, ~25. Piel clara, pelo castaño en cola debajo del casco, campera crema con
  franja navy, el mismo modelo de casco en verde apagado, mochila térmica navy. Q3 de espaldas/3/4 con el celular; Q4
  `sonrisa` en la puerta de Martín con la caja en las dos manos (que no flote).
- **Extras:** ninguno con voz. En Q1, por la vidriera de Lucía, un cliente esperando en una silla (DEFECTO, desenfocado).

## Objetos 3D (específicos; "¿alguien lo confunde con otra cosa?")
- **La muzza uruguaya (EL objeto):** pizza redonda de ~40 cm, **borde dorado inflado** `#c7843a`, el **queso crema
  amarillento** `#ffd75e` que cubre todo (con burbujas doradas `#e0a64e`, 6-10 manchas planas), **aceitunas verdes
  enteras** `#5c7a26` (8, con el hueco oscuro), un poco de **salsa roja** `#c9512f` asomando en el borde, orégano
  (motitas verde oscuro planas, no partículas sueltas). Cortada en 8 porciones (líneas de corte navy finitas). En P4 y
  Q4, humeando: 3-4 cintas de vapor crema semitransparentes que suben (función del tiempo). Al levantar una porción, el
  **hilo de queso** que se estira (un tubo curvo crema que se afina y se corta). Partir de `crearPizza` de mesa-doce.
- **El fainá (2 porciones):** rectángulos de ~12 × 10 cm, 1 cm de alto, **naranja dorado** `#e3a43a` con la superficie
  tostada (manchas `#b5701f`) y pimienta negra (motitas navy), apoyados **encima de la muzza** ("a caballo", como se come
  en Uruguay) o al lado en la caja. Que se lea "fainá" y no "queso": el color naranja y el canto liso.
- **La caja de pizza:** cartón kraft `#c9a774`, cuadrada, tapa con bisagra que se abre (función del tiempo), impreso en
  navy "DON TANO · PIZZAS" (P3/P4) o "LUCÍA · PIZZAS" con el ticket #47 pegado (Q3/Q4). Esquinas con el doblez marcado.
- **La comanda (P1, P3):** talonario de comandas crema con encabezado impreso navy "COMANDA N° 0347" y renglones navy
  claro; en el inserto (≥ 60 % del cuadro) se escribe en Caveat 700 navy, letra por letra: "1 MUZZA · 2 FAINÁ" y
  "DUBIMIOSO TERA 14??" (la B, en el inserto de P3, se marca con un círculo rojo apagado). Una mancha de grasa/salsa en
  una esquina. La birome (cuerpo crema, tapa navy) se mueve con la mano de Tano.
- **El gancho de comandas (P1, P2):** un pincho de acero en una base navy con 8-10 papelitos crema clavados, torcidos.
- **El celular en el hombro de Tano** (`crearCelular`, funda navy3): solo se ve el canto; burbuja de voz que sale de él.
- **El celular del mostrador de Tano** (`crearCelular`, funda verde apagado): apoyado contra el servilletero, vibra
  (desplazamiento de 2-3 mm alternado, función del tiempo) con cada mensaje. Inserto ≥ 60 %.
- **El horno pizzero:** horno de piso de acero navy3 de dos bocas, puertas con manija crema, la de arriba abierta con
  luz crema plana y una muzza adentro sobre la piedra; **la pala** de madera crema clara apoyada. Igual en las dos
  pizzerías (la misma geometría, en espejo).
- **La masa cruda:** bollo crema `#efe6c8` en la mano de Tano (P1), que en P2 cuelga estirado como un disco blando
  desparejo (deformación por vértices, función del tiempo). En Lucía, el disco perfecto girando entre sus manos (Q1).
- **El casco del repartidor:** casco integral redondeado (esfera recortada con mentonera) navy3 (Facu) / verde apagado
  (Sabri), **visera** gris humo oscuro semitransparente (opacidad 0,6, sin reflejos especulares fuertes) que se levanta
  con bisagra a los costados, franja reflectiva crema. Calza en la cabeza (no flota, no atraviesa el pelo: ocultar el
  pelo de arriba cuando lo tiene puesto).
- **La mochila térmica:** cubo redondeado navy (Facu) con franja crema reflectiva / navy2 (Sabri), tiras al hombro.
- **La moto de reparto (Q1, Q5b):** moto chica tipo 110 cc navy3 con el baúl/mochila atrás, rueda crema/navy, faro
  crema. En Q5b la de Sabri arranca y se va (luz trasera roja apagada).
- **La impresora térmica (Lucía):** caja navy chica con la boca arriba; el **ticket** crema que sale enrollándose
  (plano que crece en largo con una curva al final, función del tiempo) con "#47 · 1 MUZZA · 2 FAINÁ · DUVIMIOSO TERRA
  1432 · PAGADO ✓ · 22:16" en mono navy (en el inserto ≥ 36 px; "PAGADO ✓" en verde).
- **El riel de tickets (Lucía):** barra de acero con 5-6 tickets en fila, ordenados (contraste con el pincho de Tano).
- **La tablet en atril (Lucía, Q3, Q5):** pantalla canvas.
- **El sillón y el celular de Martín (Q2)** (`crearCelular`, funda navy).
- **La puerta de Martín (Q4)** y el timbre.

## Interfaz recreada (canvas en pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**P2 · celular del mostrador de Tano · chat genérico** (lista de chats, burbujas crema/navy, sin colores de ninguna
app): se apilan "¿Hacen envíos?" · "¿Cuánto demora?" · "Hola??" · "¿Están abiertos?" · "¿Me pasás el menú?"; arriba el
contador redondo rojo apagado **9 → 17 → 26**. Abajo, Tano mantiene apretado el micrófono (onda de audio, "0:01").
**P4 · el mismo chat:** entra "**Martín: ¿Y mi pizza?**" (rojo apagado el "¿Y mi pizza?") y Tano graba otro audio.
**Q2 · celular de Martín · chat "Pizzería Don Tano":** sus mensajes ("Una muzza y dos fainá a Duvimioso Terra 1432" ·
"¿Y mi pizza?") y el audio que llega ("0:01", se reproduce el 07-tano con filtro). Después abre **"Lucía Pizzas · Pedí
acá"**: 
- **Menú:** encabezado con el nombre y "Abierto · Envío 30-40 min"; tarjetas grandes con la foto plana de cada pizza
  (la muzza con aceitunas, la fugazzeta con cebolla, jamón y morrón, el fainá): "Muzza $ 520 [+]" · "Fugazzeta $ 580" ·
  "Jamón y morrón $ 610" · "Fainá $ 110 [+]". Toca + en Muzza (1) y dos veces en Fainá (2). Carrito: "1 Muzza · 2 Fainá
  · $ 740".
- **Dirección:** campo "Dirección" donde se escribe "Duvi" y abajo la sugerencia **"Duvimioso Terra 1432"** ✓; el
  mapa plano propio con el **pin verde** que cae sobre la manzana. Rótulo: **"La dirección la pone él, con el mapa"**.
- **Pago:** "Envío · Total $ 740" y botón verde **"Pagar"** → **"Pagado ✓ · Pedido #47 · Llega 22:55"**.
**Q3 · tablet de Lucía · tablero de pedidos:** tres columnas **"En horno" · "Listo" · "En camino"** con tarjetas por
pedido (#44, #45, #46, #47); la tarjeta **#47 · Martín · Duvimioso Terra 1432 · Pagado ✓** pasa de columna en columna.
**Q3 · celular de Sabri:** el mapa con el recorrido navy claro y el pin verde, "Duvimioso Terra 1432 · 8 min".
**Q4 · celular de Martín:** notificación "**Pizzería Don Tano: Disculpá, ¿calle qué?**".
**Q5 · panel "Viernes · Lucía Pizzas"** (tablet ≥ 70 %, el mostrador y el riel alrededor, nunca pantalla lisa):
**"64 pedidos"** · **"Pagados online 64 ✓"** · **"Dirección con mapa 64 ✓"** · **"Pizzas que volvieron 3 → 0"** · **"Sin
contestar 26 → 0"** (el 3 y el 26 rojo apagado, rotulados chico "Don Tano, enfrente", giran a 0 verde) · fila
"**#47 · Martín · cliente nuevo ✓ · entregado 22:54**". Rótulo: **"Panel del viernes"**.
**Tarjeta de cierre (HTML, ~3,4 s, sobre Lucía a cámara):** abajo de la cara, en el 80 % seguro y con y ≤ 1500:
"Comentá" (Lexend 800 crema ~90 px) / **"MENÚ"** (Lexend 900 ~170 px, navy en el recuadro verde) / "y te mando cómo
funciona para tu pizzería" (Lexend 600 crema ~46 px, 2 líneas). Los últimos ~0,8 s, debajo: "Menú online con pedidos y
pago" (~38 px) / **"scalerics.com"** en verde (~44 px). Entra sobre "Comentá", no tapa la cara.

## PARTE 1 · Pizzería Don Tano (0,00-15,60 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-4,20 | **P1 · cuadro 0.** Plano medio desde el lado del cliente, por encima del mostrador: Tano de 3/4 con el celular en el hombro, la comanda y la birome en primer término abajo, el bollo de masa en la otra mano; detrás, el horno abierto con la muzza, la pizarra, la pila de cajas y el gancho de comandas. Push-in lento a la cara de Tano. 2,9 inserto de la comanda (≥ 60 %). | **Cuadro 0:** "PIZZERÍAS" (Lexend 900 ~130 px, ya entero, en caja navy arriba) + chip "Viernes, 21:00." + "DON TANO"; Tano YA está escribiendo y el celular del mostrador YA vibra. 0,25-1,95 · **Tano: "Una muzza y dos fainá… ¿Calle qué?"** · 2,05-2,85 · **Martín (teléfono): "¡Duvimioso Terra!"** (burbuja punteada que sale del celular del hombro) · 2,90-3,40 · inserto: la birome escribe "DUBIMIOSO TERA 14??" · 3,30-4,10 · **Tano: "Ajá. ¿Con be larga?"** · 3,90 · burbuja muda del teléfono "¡Con V corta!" cuando la B ya está escrita. | mostrador, comanda, birome, Tano, celular en el hombro, masa, horno con muzza, pizarra, cajas, gancho, celular del mostrador | ambiente de cocina a full (extractor, horno, platos), `vibra.wav` 0,0 / 1,2 / 2,6 · birome en papel (`birome.wav`) 0,4 y 2,9-3,4 · `pop` de cada burbuja |
| 4,20-7,40 | **P2 · el celular del mostrador.** 4,20-5,90 inserto del celular (≥ 65 %) con el chat que se apila y el contador. 5,90 sube la cámara a Tano: plano medio, se agacha al celular con la masa estirada colgando de la mano (que cuelgue bien larga y blanda) y mantiene el micrófono. | Los mensajes caen de a uno ("¿Hacen envíos?" · "¿Cuánto demora?" · "Hola??" · "¿Están abiertos?" · "¿Me pasás el menú?"), contador **9 → 17 → 26** · rótulos rojo apagado (arriba a la derecha, guía al celular): **"Mensajes sin contestar: 26"** / **"Cada uno, un pedido que se fue a otro lado"** · 6,30-6,90 · **Tano: "¡Ya sale!"** (sonrisa de vendedor, la masa cruda en la mano: que se vea que no hay pizza). | celular del mostrador, Tano, masa estirada, horno | `notification` corto ×5 (cada vez más seguido) · `vibra.wav` · `k-tick-1` en cada salto del contador · whoosh corto 5,90 · `click-soft` al apretar el micrófono 6,25 |
| 7,40-11,40 | **P3 · vuelve la pizza.** 7,40 plano general desde atrás del mostrador (sobre el hombro de Tano): la puerta, entra Facu con el casco puesto (visera arriba), la caja en las manos, la mochila térmica. 8,9 contraplano: Tano de frente. 9,6 inserto de la comanda (la B en círculo rojo apagado). 10,2 Tano de frente, quieto (pausa). | Chip **"Viernes, 22:10."** · 7,50 · campanita de la puerta · 8,00-9,40 · **Facu: "Tano. Dubimioso no existe."** (Facu apoya la caja en el mostrador) · 9,60-10,20 · inserto: "DUBIMIOSO" con el círculo · 10,20-11,40 · pausa: Tano mira la caja; rótulos rojo apagado (a la izquierda, guía a la caja): **"Pizzas que volvieron hoy: 3"** / **"$ 2.220"**. | puerta, Facu con casco y mochila, caja kraft DON TANO, comanda, Tano | `campanita.wav` 7,50 · `puerta-abre` · pasos 7,6-8,0 · caja en el mármol (`k-book_place_1`) 9,4 · whoosh-short al inserto · nada encima de la pausa (la cama baja) · pop de cada rótulo |
| 11,40-15,60 | **P4 · el remate y el remate del remate.** 11,40 plano medio de los dos sobre la caja; Tano abre la tapa: la muzza con los dos fainá a caballo, humeando (vapor). 12,5 primer plano de la caja (hilo de queso cuando Facu levanta la porción, después de sacarse el casco). 13,4 inserto del celular del mostrador. 14,2 plano medio de Tano con la porción en la boca, manteniendo el micrófono. | 11,55-12,05 · **Tano: "Cenamos."** · 12,2 · Facu se saca el casco y agarra una porción (hilo de queso) · 13,40-14,10 · el celular vibra: **"Martín: ¿Y mi pizza?"** · 14,30-14,90 · **Tano (boca llena): "¡Ya sale!"** · 15,00 · Facu lo mira con la porción a medio camino · 15,45 · stinger. | caja abierta, muzza con fainá, vapor, hilo de queso, porciones, casco en la mano de Facu, celular, Tano | cartón que se abre (CC0, ver fuentes) 11,45 · `vibra.wav` + `notification` 13,40 · `click-soft` 14,25 · **stinger** 15,45 (música cortada seca) |

Último cuadro (15,60) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (15,60-17,90 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Mientras tanto,"** / **"en la
de enfrente…"**. Narrador Rasalgethi, toma nueva (08-narrador). Nunca "Scalerics". Navy sobre verde, centrado. Es el
"Dos negocios" en clave de meme: no salta en el tiempo, cruza la calle (por eso no dice "más tarde"); la solución la
nombran el vinilo "Pedí online" y el rótulo de Q1, apenas termina el cartel. (Si el coordinador prefiere la regla
literal de 8d, alternativa: "Un menú online" / "en la de enfrente…", con la misma voz.)

## PARTE 2 · Lucía Pizzas, el mismo viernes (17,90-37,00 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 17,90-20,40 | **Q1 · la misma cuadra.** Grúa continua: arranca en la vereda de Tano (el toldo navy "DON TANO · PIZZAS" y la moto de Facu en primer término, por la vidriera se ve Tano con el celular en el hombro), cruza la calle de adoquines a la altura del farol y entra por la vidriera de enfrente (el vinilo "Pedí online" con el QR pasa grande por cuadro: nunca pantalla lisa) hasta el mostrador de Lucía: EL MISMO encuadre de P1, en espejo. | Chip **"Viernes, 21:00."** + "LUCÍA" · Lucía estira la masa con las dos manos (el disco gira perfecto) · 19,30 · la impresora escupe un ticket, 19,80 otro · rótulo (guía a la impresora): **"Los pedidos entran solos, en orden"**. | calle, dos toldos, moto, farol, vinilo, interior de Lucía en espejo, Lucía, masa, impresora, riel con tickets, tablet | whoosh largo de grúa 17,90 · calle de noche (un auto lejos) · ambiente de cocina más bajo y ordenado · impresora térmica (CC0) 19,30 y 19,80 |
| 20,40-26,40 | **Q2 · Martín pide.** 20,40 plano medio del living: Martín en el sillón, con hambre, el celular en la mano. 20,9 inserto del celular (≥ 65 %), que se queda casi toda la escena con push-ins a cada parte; 25,7 vuelta a Martín. | Chip **"Viernes, 22:15."** · 20,50 · en el chat de Don Tano llega el audio "0:01"; Martín lo toca y se oye **el mismo "¡Ya sale!" con la boca llena** (07-tano con filtro) · Martín levanta una ceja · 21,60 · abre "Lucía Pizzas · Pedí acá": el menú · 22,0 · + Muzza · 22,4 · + Fainá · 22,7 · + Fainá (carrito "1 Muzza · 2 Fainá · $ 740") · 23,2 · escribe "Duvi" → "Duvimioso Terra 1432" ✓ y cae el pin verde en el mapa · rótulo **"La dirección la pone él, con el mapa"** · 24,6 · "Pagar" → 25,0 **"Pagado ✓ · Pedido #47 · Llega 22:55"** · 25,70-26,30 · **Martín: "¿Ya está?"** | living, sillón, Martín, celular | `notification` 20,50 · audio con filtro 20,7 · `click-soft` 22,0 / 22,4 / 22,7 · tecleo suave (`k-tick-4` ×4) 23,2 · pop del pin 23,7 · `click-soft` 24,6 · `cero.mp3` 25,0 |
| 26,40-29,40 | **Q3 · cae en la cocina.** 26,40 inserto de la impresora (≥ 60 %): sale el ticket #47 y se lee entero. 27,4 plano medio: Lucía lo corta y lo cuelga en el riel; la tablet al lado con el tablero. 28,4 Sabri de 3/4 con el casco y la caja, mira el celular con el recorrido (inserto chico ≥ 45 % del ancho) y sale. | 26,50-27,30 · el ticket: **"#47 · 1 MUZZA · 2 FAINÁ · DUVIMIOSO TERRA 1432 · PAGADO ✓"** · rótulo (guía al ticket): **"Pedido pago, dirección exacta"** · 27,6 · al riel · 27,9-28,4 · el tablero: #47 de "En horno" a "Listo" a "En camino" · 28,6 · el celular de Sabri: "Duvimioso Terra 1432 · 8 min" con el pin. | impresora, ticket, riel, tablet, Lucía, Sabri con casco y caja, celular de Sabri | impresora térmica 26,50 · papel que se corta (`k-cloth_1` corto o rasga CC0) 27,4 · `k-tick-1` en cada columna · moto que arranca (CC0) 29,1 |
| 29,40-33,60 | **Q4 · la puerta de Martín (el remate de la parte 2).** 29,40 plano medio desde adentro: la puerta se abre, Sabri con la caja "LUCÍA · PIZZAS" y el ticket #47 pegado. 31,0 Martín abre la caja: primer plano de la muzza con los fainá, humeando (el MISMO objeto y encuadre que P4: callback). 31,9 inserto del celular de Martín. 32,6 primer plano de Martín: mira el celular, mira la pizza, muerde. | Chip **"Viernes, 22:54."** · 29,50 · timbre · 29,70 · puerta · 29,90-31,30 · **Sabri: "¿Martín? Una muzza y dos fainá."** · 31,0 · tapa abierta, vapor · 31,90-32,50 · vibra: **"Pizzería Don Tano: Disculpá, ¿calle qué?"** · 32,6-33,0 · Martín mira el celular, después la pizza (pausa 0,4 s) · 33,1 · muerde (hilo de queso). Sin voz. | puerta, Sabri, caja con ticket, muzza con fainá, vapor, celular de Martín, Martín | timbre 29,50 · `puerta-abre` 29,70 · cartón que se abre 31,0 · `vibra.wav` 31,90 · masticar/morder (CC0) 33,1 · la cama vuelve |
| 33,60-37,00 | **Q5 · el panel y la vereda de enfrente.** 33,60 la tablet de Lucía a ≥ 70 % en el atril, el riel y el mostrador alrededor; push-in leve. 35,90 corte por la vidriera de Lucía hacia la calle: la moto de Sabri sale en primer término; al fondo, enfrente, Tano en la puerta de su pizzería, con la caja vacía bajo el brazo y el delantal; push-in a Tano (plano medio, que se le lea la cara). | "Viernes · Lucía Pizzas": **"64 pedidos"** · **"Pagados online 64 ✓"** · **"Dirección con mapa 64 ✓"** · 34,6-35,4 **"Pizzas que volvieron 3 → 0"** y **"Sin contestar 26 → 0"** (rojos que giran a 0 verde) · fila **"#47 · Martín · cliente nuevo ✓ · entregado 22:54"** · rótulo "Panel del viernes" · 36,05-36,90 · **Tano: "¿Y esa cómo hace?"** (curioso, sin enojo). | tablet, atril, riel, mostrador; calle, moto de Sabri que se va, toldo DON TANO, Tano con caja vacía | `k-tick-1` por fila · `cero.mp3` en cada 0 · moto que pasa y se aleja 35,9 · calle de noche |

## CIERRE (37,00-40,40 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,00-40,40 | **C · Lucía a cámara.** Primer plano de frente atrás del mostrador: el riel de tickets, la impresora y el horno detrás (nunca pared lisa); la vidriera a un costado con el vinilo "Pedí online" leído al revés. Push-in suave. | 37,15-40,20 · **Lucía: "Comentá MENÚ y te mando cómo funciona para tu pizzería."** (de colega, media sonrisa; es la respuesta al "¿Y esa cómo hace?") · sobre "Comentá" entra la tarjeta abajo de la cara · 39,60 la línea chica "Menú online con pedidos y pago" / "scalerics.com". Al final, la impresora saca un ticket más (39,8). | pop en "MENÚ" · impresora 39,8 · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "PIZZERÍAS" entero y legible, sin tapar la cara de Tano; el celular en el hombro, la comanda, el horno
  con la muzza y el otro celular vibrando se entienden en el primer segundo.
- **Se entiende sin sonido:** burbujas de las 12 líneas (reveladas por frase entera, la de teléfono con borde punteado);
  "¡Con V corta!" mudo; la comanda con DUBIMIOSO; el contador 26; "¿Y mi pizza?"; el menú, la dirección con pin, el
  ticket, el tablero, "Disculpá, ¿calle qué?" y el panel, legibles.
- **¿Qué pizzería es?** Siempre claro: chip con "DON TANO"/"LUCÍA", toldos, y la pared (verde apagado en Tano, navy claro
  en Lucía). La grúa de Q1 tiene que mostrar que están en la misma cuadra, enfrentadas.
- **Continuidad:** P1 y el interior de Q1 en espejo (mismo horno, mismo mostrador); el pedido es el mismo en P1, Q2, Q3
  y Q4 (1 muzza + 2 fainá, $ 740); la caja de P4 dice DON TANO y la de Q4 LUCÍA con el ticket; el casco de Facu en la
  cabeza en P3 y en la mano en P4; Tano en Q5b con el mismo delantal enharinado.
- **Física:** el celular entre oreja y hombro sin atravesar; la birome en la mano; la masa cuelga de la mano (no
  atraviesa el mostrador); la caja en las manos de Facu y de Sabri (no flota); el casco calza; la porción toca la boca
  de Tano y de Martín sin atravesarla; el hilo de queso nace en la porción y en la pizza; el vapor no tapa caras.
- **Rig:** ojos abiertos al hablar; nada de doble boca en Lucía; la boca llena de Tano se lee como masticar (no como
  hinchazón rara); Tano sin bigote (que no parezca Rubén).
- **La pizza se reconoce:** muzza uruguaya con aceitunas verdes y el fainá naranja encima, en el inserto de P4 y Q4 a
  ≥ 50 % del cuadro.
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s (plan: 22,5 s).
- **SFX nuevos** (impresora térmica, caja de cartón, moto chica, morder) reales CC0 con autor, sitio y licencia en
  `fuentes.md`; nunca sintetizados.

## Voces (partes/*.txt; detalle en partes/voces.md y partes/lineas.tsv)
Tano = Algieba · Martín = Enceladus · Facu = Puck · Sabri = Despina · Lucía = Erinome · narrador del cartel = Rasalgethi.
12 archivos: `01-tano` "Una muzza y dos fainá… ¿Calle qué?" · `02-martin` "¡Duvimioso Terra!" (filtro de teléfono) ·
`03-tano` "Ajá. ¿Con be larga?" · `04-tano` "¡Ya sale!" · `05-facu` "Tano. Dubimioso no existe." · `06-tano` "Cenamos." ·
`07-tano` "¡Ya sale!" (boca llena; se reusa en Q2 con filtro) · `08-narrador` "Mientras tanto, en la de enfrente." ·
`09-martin` "¿Ya está?" · `10-sabri` "¿Martín? Una muzza y dos fainá." · `11-tano` "¿Y esa cómo hace?" · `12-lucia`
"Comentá MENÚ y te mando cómo funciona para tu pizzería."

## Portada
`portada.json`: `chica` **"Viernes, 21:00."** · `grande` **"¿Calle qué?"** (lo que el pizzero se escucha decir todos los
viernes) · `sello` **"PIZZERÍAS"**. Fondo limpio (sin gancho, burbujas, chips, rótulos ni logo) de P1 (~1,6 s): Tano con
el celular en el hombro, la birome en la comanda y el bollo de masa, el horno abierto con la muzza detrás, todo en la
mitad de arriba. Alternativa: P4 (~14,5 s), Tano con la porción en la boca grabando el audio y Facu con la porción
(grande "¿Y mi pizza?"). Ajustar `t` y `fondo_limpio` con el render.
