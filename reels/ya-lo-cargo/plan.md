# ya-lo-cargo · plan plano por plano · PARA MANDAR completo (3D real), ~31,4 s

**De qué trata.** El vendedor que toma el pedido y no lo carga. En la rotisería, Graciela termina de dictar ("Cuarenta
de harina para el lunes.") y Nico: **"Ya lo cargo."**. Del celular sale un globo de chat que se le mete en el auto. La
ronda: Marta ("¿Me sumás dos de azúcar?"), el bar, el kiosco y tres más, cada uno con su "Ya lo cargo." y su globo, hasta
que el auto queda lleno de globos aplastados contra los vidrios. El lunes, en la distribuidora, Graciela llama a Rubén:
**"Rubén, ¿y mi harina?"**; en el monitor no hay ningún pedido; entra el auto de Nico reventado de globos con el celular
cargando al 100 %: **"Lo único que carga Nico es el celular."**. "¡Nico!" / "¡Ya lo cargo!" (de reflejo). Pausa con el
bip de marcha atrás. Rubén, en el autoelevador, levanta el auto con Nico adentro y lo mete en el camión de Graciela:
**"Ya lo cargué."**. Remate del remate: desde adentro del camión cerrado, ahogado, Nico atiende a otro cliente: **"Sí,
sí. Ya lo cargo."**; dos palmadas, el camión arranca. Cartel **"Un sistema más tarde…"**. Parte 2: "Ya lo car…" y el
sistema lo carga antes de que termine; la tarjeta del pedido vuela por la misma calle hasta el pallet GRACIELA y la ficha
de Graciela; Rubén mete la harina en el camión; Nico: "Rubén, ¿lo de Graciela?" / **"Ya salió."**; Rubén levanta un
poquito las horquillas hacia el auto de Nico, y Nico se va marcha atrás.

- **Producto:** sistema de pedidos a medida + CRM: el vendedor carga el pedido en el celular en la calle, entra solo a
  la lista del depósito para armarlo (pallet con el nombre del cliente) y queda en la ficha del cliente (qué pidió, cada
  cuánto compra). Solo en la línea chica final y en descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** chat genérico (burbujas crema y verdes, sin logo de ninguna app), celular sin logo, harina en bolsa
  lisa ("HARINA 000"), aceite en cajas kraft con una botella dibujada, autoelevador y camión sin marca, el auto de Nico
  un hatchback genérico.
- **Estructura** como `reels/anotamelo` y `reels/hacen-envios`: parte 1 (16,9 s, sin línea chica) + cartel (3,0 s) +
  parte 2 (11,5 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel: el de anotamelo,
  mismo texto **"Un sistema" / "más tarde…"** y la misma toma de Rasalgethi.
- **Personajes** (copia local de `reels/abren-hoy/assets/personajes.js`; si hace falta ELENCO.duena o variantes, del
  módulo de anotamelo): **Rubén = ELENCO.ruben** (NO `almacenero`: camisa navy3 manga larga arremangada, cuello crema,
  sin delantal), **Nico = ELENCO.empleado** (remera verde de marca; sumarle una **mochila/maletín de muestras navy** y
  el celular en la mano), **Graciela = ELENCO.clienta** con un **delantal crema** encima del cárdigan (dueña de la
  rotisería), **Marta = ELENCO.duena** (su delantal verde). Extras sin voz con `crearPersonaje` genérico (no del elenco
  fijo): el del bar (bigote, chaleco navy), el del kiosco (canosa, lentes), el **operario del depósito** (mameluco navy
  con franja verde, guantes crema) y el **chofer** (gorra navy).
- **Mecanismos nuevos para la línea:** la escalada es un objeto que ocupa lugar (los **globos de chat que llenan el
  auto**); la pausa la marca el **bip de marcha atrás de un autoelevador** (música baja a -12 dB en 0,4 s, NUNCA cortada
  seca); el remate es un **juego de palabras hecho imagen** (cargar el pedido / cargar a Nico); el remate del remate es
  de personaje (una voz ahogada y una burbuja aplastada por la rendija), no un número ni tuba ni plano general.

## Paleta y set (para "Hechos")
**Distribuidora mayorista de día: depósito alto con piso de hormigón crema2 `#dcd9c8` liso, paredes navy claro
`#16243d`, estanterías rack con parantes navy3 `#1f3254` y largueros verde de marca `#5ce611`, pallets de madera clara,
luz fría de claraboyas; oficina vidriada arriba (perfiles navy, vidrio apenas celeste `#b9cde0` al 15 %); afuera, calle
de Montevideo de mediodía con fachadas crema y navy.** Distinto de todo lo de las últimas noches (almacén crema de día,
navy oscuro de noche con lámparas, calle a la hora azul, siesta con azulejos). Anotar en "Hechos": "distribuidora de
día, piso crema2 + paredes navy claro + racks navy3 con largueros verdes, oficina vidriada arriba; calle de mediodía y
rotisería".
- **Depósito:** tres pasillos de racks de 3 niveles llenos de pallets con cajas kraft `#c9a46b` y bolsas, que llenan el
  fondo de cada plano (nunca pared lisa); **muelle de carga** con portón levadizo navy3 y rampa niveladora gris; líneas
  de seguridad en el piso **crema** (no amarillo chillón); la **escalera metálica** navy3 que sube a la oficina, con
  baranda.
- **Oficina de Rubén:** escritorio de madera clara con monitor (pantalla canvas), **teléfono de escritorio** navy con
  cable rulo, el mate y el termo, una pila de remitos con broche; ventanal que da al depósito (se ve todo desde arriba).
- **Calle (P2, Q2):** low-poly de Montevideo al mediodía, cielo celeste pálido `#b9cde0` liso (sin degradé), fachadas
  crema y navy3 con persianas, plátanos (copa verde oscuro `#2f5a2a` plana), veredas de baldosa gris claro, cordón crema.
  Los comercios con cartel pintado genérico: "ROTISERÍA", "CAFETERÍA", "BAR", "KIOSCO" (Lexend 800 navy sobre crema).
- **Rotisería (P1, Q1):** mostrador con vitrina (bandejas de milanesas, tarta, papas), **spiedo** con 3 barras de
  pollos dorados `#c98a3a` que giran sobre la llama (protagonista del fondo: nadie lo confunde), pizarra navy con
  "POLLO · MILANESA · TARTA" en tiza crema, azulejo blanco con guarda verde.
- **Rojo apagado `#c7655b` SOLO para el problema**: "Pedidos: ninguno" en el monitor, el borde de los globos que se
  aplastan (cuando ya no entran), el remito "GRACIELA" sin tilde en la puerta del camión de la parte 1. **Verde
  `#5ce611` para lo resuelto**: la tarjeta "Cargado ✓", el pallet GRACIELA lleno, la ficha, el recuadro de selección de
  los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Sobre el cielo claro o el piso crema llevan el borde navy grueso. Las de Nico, con el "Ya lo cargo." en
  el recuadro verde de selección (es la palabra clave del reel).
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco sobre fondo claro.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **Globo de chat (crearGloboChat)**: el pedido sin cargar hecho objeto. Una burbuja de chat **inflada** (caja
  redondeada gorda, RoundedBox con segmentos + una colita cónica abajo a la izquierda), crema `#efeee5` con un **borde
  navy grueso** (extrusión del contorno) y el texto en la cara (canvas, Lexend 800 navy ≥ 44 px en los planos donde se
  lee): "40 harina · lunes", "2 azúcar", "agua con gas x6", "lo de siempre", "lo mismo + 2", "dale". Variantes: **audio**
  (botón play verde + onda de barras navy + "1:47") y **foto** (miniatura de una servilleta con garabatos). Tamaño al
  salir del celular: 0,25 m; se infla a 0,45-0,6 m con rebote (escala con sobrepaso, semilla). Flota con un vaivén suave
  (seno del tiempo, sin azar). Dentro del auto se **aplasta** contra los vidrios (escala no uniforme según la caja del
  auto: nunca atraviesa el vidrio ni a Nico). Material con un poco de brillo (clearcoat), color plano.
- **Auto de Nico (crearAutoVendedor)**: hatchback chico de 3 puertas, carrocería **crema** con una franja navy3 en el
  costado, vidrios celeste pálido semitransparentes (que se vean los globos adentro), llantas navy, faros crema; en el
  tablero el **celular enchufado** (cable crema al encendedor) con la pantalla "100 %" y la batería verde. Puertas y
  ventanilla del conductor animables (baja la ventanilla en P5). Lo tienen que poder levantar las horquillas: piso del
  auto plano a la altura justa (las horquillas entran entre las ruedas).
- **Autoelevador (crearAutoelevador)**: cuerpo **verde de marca** con contrapeso navy3 redondeado atrás, techo de
  protección de caños navy, **mástil gris claro con dos horquillas** que suben y bajan (parámetro de altura y
  inclinación), asiento navy, volante, **baliza** chica rojo apagado arriba que gira cuando va marcha atrás, portavasos
  con el mate de Rubén. Ruedas macizas navy. Lo maneja Rubén sentado (pose de manos en el volante y en la palanca).
- **Camión de reparto (crearCamionReparto)**: cabina navy3 con vidrio celeste pálido, **caja/furgón crema** con una
  franja verde a la altura de la mitad, **puertas traseras de dos hojas** que abren 180° (bisagras navy) y piso de caja
  a la altura del muelle. En la puerta, un **remito** pegado (hoja crema con "GRACIELA · ROTISERÍA" en Lexend 800 navy
  ≥ 40 px en el primer plano). Sin marca ni texto en la caja.
- **Rack selectivo (crearRack)**: parantes navy3 perforados (agujeritos como textura de líneas, no 1 px), largueros
  verde de marca, 3 niveles, cada uno con pallets: cajas kraft con cinta crema, bolsas de harina, pacas de agua con
  film (verde translúcido plano), cajas de aceite. Instancias para llenar el depósito (InstancedMesh si pesa).
- **Pallet (crearPallet)**: tarima de madera clara `#d7b98a` con sus tablas y tacos (que se vean las ranuras para las
  horquillas), con el **cartel kraft colgado** "GRACIELA" (marcador navy, Caveat 700 ≥ 48 px en el plano cercano).
- **Bolsa de harina (crearBolsaHarina)**: bolsa de papel de 25 kg, crema2, con la **costura de cierre arriba en zigzag**
  y las "orejas" de las esquinas, "HARINA 000" en navy en la cara. Se apilan de a cuatro en el pallet (pop con
  aplastado al caer).
- **Zorra (crearZorra)**: transpaleta manual gris claro con mango navy y horquillas largas; la lleva el operario en Q2.
- **Teléfono de escritorio (crearTelefonoEscritorio)**: navy, teclado crema, tubo apoyado, **cable rulo**; botón de
  altavoz verde que se prende cuando atiende Rubén; vibra al sonar (función del tiempo).
- **Monitor de Rubén**: pantalla canvas grande (en el inserto, ≥ 60 % del cuadro): parte 1 "Pedidos · Graciela ·
  Rotisería" con **"ninguno"** en rojo apagado; parte 2 la **ficha** "Graciela · Rotisería" con "Pedido: 40 harina ·
  lunes ✓" (verde), "Compra cada 15 días", "Último: aceite, hace 2 semanas". Lexend ≥ 40 px.
- **Spiedo de la rotisería (crearSpiedo)**: caja de acero gris claro con vidrio, 3 barras horizontales con 3 pollos
  cada una (pollo dorado con las patitas atadas, forma reconocible, no esferas) y detrás una **llama
  naranja apagado plana** (el único naranja del reel, chico) que titila con seno del tiempo; las barras giran.
- **Tarjeta de pedido (parte 2)**: tarjeta plana verde de marca con esquinas redondeadas, "Graciela · 40 harina ·
  lunes" en navy y "Cargado ✓"; vuela con estela corta (cinta plana verde, no partículas difusas) y se parte en dos.
- Reusados del módulo: crearMate, crearTermo, crearCelular (si existe en anotamelo/hacen-envios; si no, el de abren-hoy
  con la pantalla canvas del chat), crearMochila (como maletín de muestras de Nico).

## PARTE 1 · el problema (0,00-16,90 s)

Cámara continua (Catmull-Rom) dentro de cada set; entre sets, transición con un objeto grande en cuadro (el globo que
tapa la lente al pasar, el camión que cruza el cuadro). Nada de cortes a pantalla lisa.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,20 | **P1 · cuadro 0.** Plano medio desde el costado del mostrador de la rotisería, a la altura de los ojos: el **spiedo** grande atrás a la izquierda (llena el tercio de arriba), Graciela detrás del mostrador (centro-derecha), **Nico** en primer término a la izquierda de 3/4, el celular en la mano. Push-in lento hacia Nico. A 1,4 s la cámara retrocede (dolly atrás) atravesando la vidriera hacia la vereda, donde está el auto. | **Cuadro 0:** arriba al centro, el gancho entero Lexend 900 ~130 px **"Ya lo cargo."** con "cargo" en el recuadro verde; ya están el spiedo girando, Graciela con su burbuja "Cuarenta de harina para el lunes." y Nico. 0,25-1,00 · **Nico: "Ya lo cargo."** (el gancho se apaga y arrancan los subtítulos), pulgar arriba. 1,05 · del celular sale el **globo "40 harina · lunes"**, que se infla con rebote y queda flotando arriba de su hombro. 1,40 · Nico se guarda el celular en el bolsillo sin mirarlo y sale; el globo lo sigue. 1,90-2,20 · abre la puerta del auto y el globo se mete apretado en el asiento del acompañante. | spiedo con pollos, mostrador con vitrina, pizarra, Graciela con delantal, Nico con maletín, celular, globo de chat, auto de Nico | ambiente de rotisería (calle baja, `calle.wav`) · música desde 0,0 · pop + "inflado" (goma, CC0) 1,05 · pasos 1,45 · puerta de auto que se abre 1,90 y cierra 2,15 (CC0) |
| 2,20-5,80 | **P2 · la ronda.** Travelling lateral continuo por la calle, la cámara a la altura de la ventanilla, del lado de la vereda: el auto en perfil llena el 70 % del ancho; detrás, las fachadas pasan. Tres paradas con una curva corta de la cámara hacia cada vidriera (sin cortes); las tres últimas en time-lapse (la calle pasa rápido, el auto frena con un cabeceo). | 2,35 · para frente a la **CAFETERÍA**: Marta asomada a la puerta con su delantal: **"¿Me sumás dos de azúcar?"** (2,40-3,55). 3,65-4,25 · Nico desde la ventanilla: **"Ya lo cargo."** · globo "2 azúcar" sale del celular y entra al auto. 4,35 · **BAR**: burbuja "¿Y el agua con gas?" / "Ya lo cargo." (sin voz) · globo "agua con gas x6". 4,85 · **KIOSCO**: "Lo de siempre." / "Ya lo cargo." · globo de audio "1:47". 5,25 / 5,45 / 5,60 · tres paradas en ráfaga, solo burbujas "Ya lo cargo." chiquitas y los globos: la foto de la servilleta, "lo mismo + 2", "dale". 5,60-5,80 · el auto queda **lleno**: globos aplastados contra los vidrios (bordes rojo apagado), Nico maneja con un cachete contra uno; en el tablero, el celular cargando. | calle de Montevideo, fachadas con carteles genéricos, Marta, el del bar, la del kiosco, auto, globos de chat (6-8), celular en el tablero | motor/rodar del auto (CC0) bajo todo el plano · freno corto en cada parada · pop por burbuja de diálogo · pop + inflado por globo, cada uno un semitono más agudo · chirrido de goma cuando los globos se aplastan 5,60 (CC0) |
| 5,80-8,90 | **P3 · el lunes, la distribuidora.** Transición: el último globo tapa la lente (crema lleno, con borde navy: nunca liso más de 4 cuadros) y se destapa en el depósito. Plano general bajo desde el piso: los pasillos de racks llenos (llenan el cuadro hasta arriba), el muelle al fondo; el **camión** sale del muelle (5,80-6,80). Grúa que sube por la escalera metálica hasta el ventanal de la oficina (6,80-7,40) y entra: Rubén en su escritorio con el mate, de frente. | 7,40 · suena el **teléfono de escritorio** (vibra); Rubén aprieta el altavoz (botón verde). 7,60-8,80 · **Graciela** (filtro de teléfono): **"Rubén, ¿y mi harina?"**. 8,30 · Rubén gira hacia el monitor. | racks, pallets, muelle con portón, camión, escalera metálica, oficina vidriada, escritorio, teléfono de escritorio, monitor, mate y termo, Rubén | whoosh de la transición 5,80 · motor de camión que se aleja (CC0) 5,80-6,80 · ambiente de depósito (zumbido de luminarias, `zumbido.wav`, y un autoelevador lejos) todo el plano · whoosh-short de la grúa 6,80 · ring de teléfono (CC0) 7,40 · click-soft del altavoz 7,55 |
| 8,90-11,20 | **P4 · la línea picante.** 8,90 inserto del monitor (llena el 65 % del cuadro): "Pedidos · Graciela · Rotisería" y **"ninguno"** en rojo apagado. 9,20 contraplano por encima del hombro de Rubén, a través del ventanal: abajo, por el portón, entra el **auto de Nico reventado de globos** (se ve chico pero entero, y la cámara hace push-in a través del vidrio hasta que llena el 60 % del ancho). 9,90 inserto del tablero del auto: el **celular enchufado, "100 %"** en verde. 10,40 plano medio de Rubén de perfil mirando abajo. | 9,10-11,10 · **Rubén**, seco, mirando por el vidrio: **"Lo único que carga Nico es el celular."** (subtítulo con "celular" en el recuadro verde). Sin gestos grandes: apoya el mate en el escritorio. | monitor, ventanal, auto con globos, celular en el tablero, Rubén | `click-soft` bajado de tono (un "tuc" seco de UI) al aparecer "ninguno" 8,95 · el auto entra: motor + chirrido de globos 9,20 · cama baja durante la voz |
| 11,20-12,50 | **P5 · "¡Nico!"** Rubén sale a la baranda de la oficina (plano picado desde arriba y detrás de él: Rubén en primer término arriba a la derecha, el auto abajo). 11,85 contraplano contrapicado desde el auto: la ventanilla de Nico baja, asoma un globo y la cabeza de Nico (Rubén chico arriba, en la baranda, contra los racks). | 11,25-11,60 · **Rubén: "¡Nico!"**. 11,85 · baja la ventanilla, se escapa medio globo. 11,95-12,50 · **Nico**, de reflejo y antes de que le pregunten nada, pulgar arriba: **"¡Ya lo cargo!"** | baranda, escalera, auto, globos, Nico | puerta de vidrio de la oficina 11,20 · voz con un poco de galpón · ventanilla eléctrica (CC0) 11,85 · pop del globo que asoma |
| 12,50-13,20 | **P6 · la pausa.** Plano quieto desde atrás del auto, a la altura del piso: el auto en primer término, Rubén arriba en la baranda, en el medio del cuadro. | **Silencio de depósito:** la música baja a -12 dB en 0,4 s (no se corta); solo el **"bip… bip… bip…"** de un autoelevador que da marcha atrás en algún pasillo, y el zumbido de las luminarias. Rubén mira a Nico sin decir nada, cara de nada (ojos abiertos, CARA.neutra). 12,90 · deja el mate en la baranda (apoyo con golpecito). Nico sonríe, esperando. | Rubén, mate, auto | bip de marcha atrás (CC0) ×3 · mate en la baranda (madera-golpe chico) 12,90 |
| 13,20-15,20 | **P7 · el remate.** Corte a plano general medio desde el costado: **Rubén al mando del autoelevador** (ya está sentado: el corte esconde el viaje) entra por la izquierda, baliza girando; las horquillas se meten debajo del auto (13,40), lo levantan (13,60-14,00: el auto sube 1 m con un cabeceo, los globos rebotan adentro, Nico con cara de sorpresa sin perder la sonrisa). La cámara acompaña en travelling al autoelevador que va hasta el muelle y sube la rampa (14,00-14,60); el camión con las puertas abiertas espera; el auto entra en la caja (14,60-14,90). Plano de las puertas traseras: el remito pegado "GRACIELA · ROTISERÍA" (rojo apagado, sin tilde). | 14,30-15,10 · **Rubén: "Ya lo cargué."** (subtítulo con "cargué" en el recuadro verde). 15,00-15,20 · Rubén baja del autoelevador y cierra las dos hojas de la puerta. | autoelevador con Rubén, auto con Nico y globos, rampa, camión, remito | motor eléctrico + bip de marcha atrás 13,20 · hidráulico de las horquillas (CC0) 13,60-14,00 · chirrido de globos 13,80 · golpe del auto en el piso de la caja 14,90 · portazo metálico doble 15,10 y 15,20 |
| 15,20-16,90 | **P8 · remate del remate.** Primer plano de las puertas cerradas del camión (llenan el cuadro; el remito en primer término a la izquierda). | 15,30 · adentro suena un celular, ahogado. 15,45-16,60 · **Nico**, ahogado, atendiendo: **"Sí, sí. Ya lo cargo."**; por la rendija entre las dos hojas asoma, aplastada, una burbuja con el mismo texto (se lee sin sonido). 16,55 · entra la mano de Rubén por la derecha y le da **dos palmadas** a la puerta (la seña al chofer). 16,70 · el camión arranca (la cámara queda quieta y el camión sale de cuadro hacia la izquierda, mostrando a Rubén parado, cara de nada). Fin de la parte 1. | puertas del camión, remito, burbuja aplastada, mano y Rubén | ring de celular con lowpass (es el mismo ring del CC0, filtrado) 15,30 · voz ahogada · dos palmadas en chapa (CC0) 16,55 / 16,70 · motor de camión que arranca 16,75 · la música vuelve a subir para el cartel |

Último cuadro (16,90) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Un sistema más tarde…" (16,90-19,90 s)
El de anotamelo tal cual: **"Un sistema"** (línea a, 140 px) / **"más tarde…"** (línea b, 146 px), Lexend 900 crema
con borde navy, letras que rebotan, -4°, fondo verde de marca con manchas y burbujas. Entra girando el último cuadro de
la parte 1, sale con iris al primer cuadro de la parte 2. Voz: la toma de Rasalgethi de anotamelo
(`reels/anotamelo/assets/voice/narrador.wav`), stinger y whooshes del ejemplar. Nunca dice "Scalerics".

## PARTE 2 · resuelto (19,90-31,40 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 19,90-22,40 | **Q1 · callback del cuadro 0:** el mismo encuadre de P1 (spiedo, Graciela, Nico en primer término). Push-in más rápido que en P1 hacia el celular de Nico. | Graciela con la misma burbuja "Cuarenta de harina para el lunes." (sin voz). 20,40 · Nico toca el celular dos veces (inserto corto de la pantalla: "Nuevo pedido · Graciela · 40 harina · lunes" y el botón verde "Cargar"). 20,90-21,35 · **Nico: "Ya lo car…"** · 21,30 · **ding**: antes de que termine, sale del celular una **tarjeta verde "Cargado ✓"** (en vez de un globo) y vuela por la vidriera. 21,50 · Nico cierra la boca, mira el celular, cejas arriba. | spiedo, Graciela, Nico, celular, tarjeta de pedido verde | campanita de la puerta de la rotisería 19,90 · key-press ×2 20,40 · ding 21,30 · whoosh-short de la tarjeta 21,45 |
| 22,40-25,30 | **Q2 · el viaje del pedido.** La cámara sigue a la tarjeta (Catmull-Rom, travelling a 1,5 m detrás de ella, grande en cuadro): sale por la vidriera, recorre **la misma calle de la ronda** (la cafetería, el bar, el kiosco pasan rápido, sin globos), entra por el portón de la distribuidora y la tarjeta **se parte en dos**: la cámara sigue a la mitad que baja al pasillo y después sube con la otra a la oficina. | 23,70 · una mitad cae en el **cartel del pallet "GRACIELA"** y el cartel se tilda en verde; el operario llega con la **zorra** y apila **cuatro bolsas de harina** (23,80 / 24,00 / 24,20 / 24,40, cada una con pop y aplastado). 24,50-25,30 · la otra mitad sube por la escalera, atraviesa el ventanal y entra al **monitor de Rubén**: la **ficha** "Graciela · Rotisería · Pedido: 40 harina · lunes ✓ · Compra cada 15 días" (inserto ≥ 60 % del cuadro). | tarjeta, calle, fachadas, portón, rack, pallet con cartel, operario con zorra, bolsas de harina, oficina, monitor con la ficha | whoosh largo del viaje 22,40 · calle pasando · whoosh-short al partirse 23,60 · golpe de bolsa (madera-golpe/tela, CC0) ×4 · chime/ding al tildarse el cartel 23,75 · click-soft al entrar en la ficha 25,00 |
| 25,30-28,60 | **Q3 · "Ya salió."** Plano general medio desde el costado del muelle (el mismo eje que P7: callback): **Rubén en el autoelevador, el mate en el portavasos**, mete el pallet de harina en el camión con cuidado. 26,30 · por el portón entra el **auto de Nico, limpio, sin un globo**, y frena al lado. Contraplano corto a la ventanilla. | 26,55-27,50 · **Nico**, servicial, por la ventanilla: **"Rubén, ¿lo de Graciela?"**. 27,60 · Rubén cierra la puerta del camión sin mirarlo (el remito ahora con **tilde verde**). 27,75-28,30 · **Rubén: "Ya salió."** · 28,30 · dos palmadas a la puerta y el camión arranca cargado. | autoelevador con Rubén y el mate, pallet de harina, camión, remito con tilde, auto de Nico limpio | motor eléctrico del autoelevador · hidráulico corto · motor del auto que entra 26,30 · portazo 27,60 · palmadas 28,30 · motor de camión 28,40 |
| 28,60-31,40 | **Q4 · cierre.** Plano medio de los dos: el autoelevador de Rubén a la izquierda, el auto de Nico a la derecha, el camión saliendo por el portón al fondo (la luz de la calle). Push-in suave. | 28,70 · Nico, aliviado, pulgar arriba por la ventanilla. 29,10 · Rubén, cara de nada, gira despacio el autoelevador hacia el auto de Nico y **levanta un poquito las horquillas** (bip, bip). 29,60 · Nico pone marcha atrás y sale del cuadro rápido; Rubén baja las horquillas y toma el mate del portavasos (no lo lleva a la boca: lo sostiene). 29,90 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Un sistema de pedidos: el vendedor lo carga en la calle"** / **"y entra solo al depósito y a la ficha del cliente"** / **"scalerics.com"** en verde (1,5 s, hasta el final). Sin tarjeta de videollamada. | autoelevador, Rubén, mate, auto de Nico, camión que sale, portón | hidráulico corto + bip ×2 29,10 · motor del auto marcha atrás 29,60 · final de la música |

## Revisión pedida para este reel (además de 8c)
- **Los globos:** nunca atraviesan el vidrio, el techo del auto ni a Nico; aplastados se deforman (escala no uniforme)
  y no se superponen entre ellos (cada uno con su lugar fijo en el auto, calculado, no física). Sus textos se leen en el
  celular en los planos donde importan (≥ 44 px): "40 harina · lunes" en P1, "2 azúcar" en P2.
- **El autoelevador y el auto:** las horquillas entran por debajo, el auto apoya sobre ellas (nada de auto flotando ni
  horquillas que atraviesan la carrocería); al subir la rampa el conjunto se inclina junto; al entrar en la caja del
  camión el auto entra entero (escala del camión acorde: caja ≥ 1,8 m de alto, que entre; que no se vea forzado).
- **Nico adentro del auto:** con la cabeza visible por la ventanilla en P5 y P7 (cara de sorpresa con sonrisa, ojos
  abiertos), sin atravesar el techo ni los globos.
- **Rubén es ELENCO.ruben** (camisa navy manga larga, sin delantal) en TODOS los planos: chequear que no quede ninguna
  instancia de `almacenero`.
- **Continuidad:** el mate de Rubén está en el escritorio (P3-P4), en la baranda (P6 en adelante) y en el portavasos del
  autoelevador (parte 2); el remito sin tilde en la parte 1 y con tilde en la parte 2; el auto lleno de globos desde
  P2 hasta P8; en la parte 2 ningún globo.
- **Transición del globo que tapa la lente (P2 → P3):** crema con borde navy y texto, nunca un cuadro liso de más de 4
  cuadros (lección de netflix-blockbuster).
- **SFX que no están en assets/sfx** (bip de marcha atrás de autoelevador, hidráulico, motor de camión, puerta de auto,
  ventanilla eléctrica, ring de teléfono de escritorio, palmada en chapa, goma de globo que se infla/aplasta): reales
  con licencia CC0 (Kenney, OpenGameArt, espejos de GitHub con licencia, como en anotamelo y hacen-envios), con autor,
  sitio y licencia en `fuentes.md`. Nunca sintetizados con ffmpeg. Si alguno no aparece, se saca y se anota.

## Portada (sugerencia)
`t` ≈ 13,9 (el auto lleno de globos arriba de las horquillas, Rubén en el autoelevador) o ≈ 5,7 (el auto lleno de
globos en la calle, Nico con el cachete contra uno). `chica`: "El vendedor:" · `grande`: "Ya lo cargo." · `sello`:
"Distribuidora". Acento `#5ce611`. Renderizar el fondo sin gancho, subtítulos ni burbujas.
