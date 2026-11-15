# la-lista · plan plano por plano · PARA MANDAR completo (3D real), ~33,4 s

**De qué trata.** La lista de precios de la distribuidora. De noche, en su oficina vidriada arriba del depósito, Rubén
recibe el audio de Graciela: **"Rubén, ¿me pasás la lista actualizada?"**. La manda. El proveedor: **"Rubén, subió el
aceite."**. Cambia la celda, guarda otra versión, y la **cinta de rotuladora con el nombre del archivo** crece. Ráfaga
de pedidos de la lista (Marta, Walter, Nico) y de cambios del proveedor (azúcar, dólar): la cinta pasa por v2, v3_azucar,
v4_dolar, v5_FINAL, v6_FINAL_ESTA_SI y v7_FINAL_ESTA_SI_(2), cruza el escritorio y empuja el termo; abajo, el depósito
se apaga. Graciela llama: **"Rubén, ¿el aceite a cuánto está?"** / **"Está en la lista."** / **"¿En cuál? Tengo
siete."**. Pausa (un perro que ladra lejos). El proveedor: **"Rubén, subió el aceite."** / Rubén: **"Ocho."**. Remate del
remate: **"Dale. ¿Me la mandás en PDF?"**; Rubén mira a cámara y la cinta, ya ".pdf", se cae del escritorio. Cartel
**"Una tienda online más tarde…"**. Parte 2: 18:30, el proveedor otra vez; Rubén cambia el precio una vez en el panel de
la tienda, **"¿Algo más?"**; la etiqueta de precio verde viaja al celular de Graciela, el precio cambia solo y ella
pide sola; los pedidos entran al monitor; el celular de Rubén no suena y él lo revisa como si estuviera roto.

- **Producto:** tienda online mayorista / catálogo para clientes: la lista de precios vive en un solo lugar, el dueño
  cambia un precio una vez, cada cliente ve el precio de hoy en el celular y hace el pedido solo. Solo en la línea
  chica final y en descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** planilla genérica (grilla crema con encabezado navy, sin el verde ni el logo de ningún programa;
  el ícono del archivo es una hojita crema con grilla navy y esquina doblada), chat genérico (burbujas crema y verdes,
  sin logo), celulares sin logo, aceite en caja kraft con una botella dibujada, sin marca de aceite ni de nada.
- **Estructura** como `reels/ya-lo-cargo` y `reels/hacen-envios`: parte 1 (19,3 s, sin línea chica) + cartel (3,0 s) +
  parte 2 (11,1 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel: el de
  hacen-envios, mismo texto **"Una tienda online" / "más tarde…"** y la misma toma de Rasalgethi
  (`reels/hacen-envios/assets/voice/narrador.wav`).
- **Personajes** (copia local de `reels/abren-hoy/assets/personajes.js`, o la de ya-lo-cargo, que ya tiene a Graciela
  con delantal y los sets de la distribuidora): **Rubén = ELENCO.ruben** (NO `almacenero`: camisa navy3 manga larga
  arremangada, cuello crema, sin delantal; en la parte 1 con **anteojos de leer** apoyados en la punta de la nariz, la
  noche y la planilla), **Graciela = ELENCO.clienta** con el **delantal crema** de ya-lo-cargo (dueña de la
  rotisería). Marta, Walter y Nico solo como avatar redondo en sus burbujas (la cara del personaje 3D renderizada chica
  en un círculo, nada de fotos). El **proveedor** nunca se ve (solo voz por el altavoz y burbujas que salen del
  teléfono de escritorio).
- **Mecanismos nuevos para la línea:** la escalada es **un nombre de archivo que crece** (cinta de rotuladora 3D que se
  alarga de versión en versión; texto siempre legible, nunca estirado); el paso del tiempo lo marcan **las campanas de
  luz del depósito que se apagan** (no un reloj ni un almanaque); la pausa la marca **un perro que ladra lejos** con la
  música baja (no cortada); el remate es **una palabra que cuenta** ("Ocho."); el remate del remate es una frase real de
  cliente ("¿Me la mandás en PDF?") + **la mirada a cámara** de Rubén (nueva en la línea) + la cinta que se cae.

## Paleta y set (para "Hechos")
**Distribuidora de noche: oficina vidriada iluminada solo por una lámpara de escritorio cálida y el monitor, sobre un
depósito navy oscuro `#0b1220` con racks navy3 `#1f3254` y largueros verde `#5ce611` en sombra, campanas de luz que se
apagan; parte 2 a las 18:30 con el depósito prendido sobre navy claro `#16243d`.** Distinto de ya-lo-cargo
(distribuidora de día con piso crema2) y de las últimas noches (almacén crema, almacén navy con lamparitas, calle a la
hora azul, siesta con azulejos). Anotar en "Hechos": "distribuidora de noche, oficina con lámpara cálida sobre depósito
navy oscuro #0b1220 que se apaga; parte 2 a las 18:30 con depósito prendido, navy claro #16243d".
- **Oficina de Rubén (el set principal, 80 % del reel):** la de ya-lo-cargo vista de noche: escritorio de madera clara,
  **monitor grande** (pantalla canvas) con la planilla, **teléfono de escritorio** navy con cable rulo y botón de
  altavoz verde (de ya-lo-cargo), el **mate y el termo** crema, una taza con lapiceras, una pila de remitos con broche;
  **lámpara de escritorio** de brazo articulado crema (luz cálida `#ffe2b0` en cono, la única luz cálida del reel); el
  ventanal vidriado (perfiles navy, vidrio celeste `#b9cde0` al 15 %) que da al depósito; persiana americana a medio
  bajar en el vidrio lateral (rayas de luz en la pared: color plano, no degradé suave).
- **Depósito (fondo de la oficina, visible por el ventanal):** tres pasillos de racks con pallets de cajas kraft
  `#c9a46b`, bolsas y pacas de agua; **6 campanas de luz industriales** colgadas (cono navy3, foco crema) que en la
  parte 1 se apagan de a una (cada una deja su pasillo en navy oscuro, plano, sin degradé que haga bandas). Nunca
  pared lisa detrás de Rubén: siempre los racks.
- **Rotisería de Graciela (P4, P6, Q2):** la de ya-lo-cargo (spiedo, vitrina, pizarra "POLLO · MILANESA · TARTA"). En
  la parte 1, **cerrando**: persiana metálica a media altura, el spiedo con las barras vacías y la llama apagada, una
  sola luz de tubo; en la parte 2, abierta y con los pollos girando.
- **Calle (Q2):** la calle de ya-lo-cargo al atardecer (cielo navy claro `#16243d` liso, faroles prendidos crema).
- **Rojo apagado `#c7655b` SOLO para el problema:** el precio viejo tachado en la celda, las versiones viejas en el
  chat (borde rojo apagado), el ".pdf" de la última cinta. **Verde `#5ce611` para lo resuelto:** "Publicado ✓", la
  etiqueta de precio, "Pedido ✓", los pedidos que entran, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla (o hacia el celular o el teléfono de escritorio). Las del proveedor salen del teléfono de escritorio con
  un ícono de tubo; las de los clientes salen del celular con el avatar redondo y el nombre del comercio
  ("Marta · Cafetería", "Walter · Bar", "Nico · Ventas").
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco sobre fondo claro.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **Cinta de rotuladora (crearCintaArchivo)**: EL objeto del reel. Una tira gruesa y rígida (RoundedBox de 0,05 m de
  alto x 0,012 m de espesor, largo variable) **crema con borde navy de 6-8 px y el texto mono navy en relieve** (canvas
  regenerado por versión, Lexend Mono o mono de marca ≥ 40 px en los planos donde se lee), que **sale de una ranura en
  la base del monitor** y apoya sobre el escritorio, como la cinta que escupe una rotuladora. A la izquierda, el ícono
  del archivo (hojita crema con grilla navy). Con cada versión **se alarga hacia la derecha** con un clac y un rebote
  corto (la geometría se rehace al largo nuevo; el texto NUNCA se estira: cada versión tiene su textura con el ancho
  justo). Largos aproximados: "lista_precios.xlsx" 0,30 m · v2 0,36 · v3_azucar 0,42 · v4_dolar 0,48 · v5_FINAL 0,55 ·
  v6_FINAL_ESTA_SI 0,68 · v7_FINAL_ESTA_SI_(2) 0,78 (empuja el termo hasta el borde) · v8_aceite 0,84 (empuja la taza
  de lapiceras) · v8_aceite_FINAL_ESTA_SI_(2).pdf 1,10 (pasa el borde del escritorio y **se dobla hacia el piso**: un
  segundo tramo articulado que cuelga, con un vaivén que se amortigua; nada atraviesa el escritorio). La extensión
  ".pdf" en rojo apagado. En la parte 2: "tienda · precios de hoy" (0,40 m, verde a la izquierda con un tilde), que
  intenta crecer cuando llama el proveedor (un tic de 1 cm) y no crece.
- **Monitor con la planilla**: pantalla canvas grande (en el inserto, ≥ 60 % del cuadro). Parte 1: planilla "LISTA DE
  PRECIOS" con columnas Producto / Presentación / Precio, filas legibles ≥ 36 px en el inserto ("Aceite 1,5 L x 12",
  "Azúcar 1 kg x 10", "Harina 000 25 kg", "Agua 2 L x 6"); la celda del aceite se selecciona (recuadro verde), el número
  viejo se tacha en rojo apagado y entra el nuevo; diálogo "Guardar como…" chiquito que aparece y se va. Parte 2: el
  **panel de la tienda**: la ficha del producto "Aceite 1,5 L x 12" con el campo de precio, el botón verde "Publicar" y
  "Publicado ✓ · lo ven todos tus clientes"; después, la columna "Pedidos de hoy" donde entran las filas en verde.
  Precios de ficción, sin decir que son reales (ej. $ 1.140 → $ 1.190; ponerlos chicos, que no compitan con el chiste).
- **Celular de Rubén (crearCelular de ya-lo-cargo/anotamelo)**: apoyado en el escritorio, vibra (función del tiempo)
  cuando entra un mensaje. Pantalla canvas con el chat de Graciela: en el inserto P6, **siete burbujas de archivo
  apiladas** (ícono de hojita + nombre en mono ≥ 36 px + "✓✓"), las seis viejas con borde rojo apagado y la última
  arriba. En la parte 2, la pantalla negra-navy, quieta, con la hora; Rubén lo levanta y lo alza hacia la ventana.
- **Celular de Graciela (Q2)**: la tienda mayorista: arriba "Distribuidora · Precios de hoy", grilla de 4 productos
  con dibujito plano (la caja de aceite, la bolsa de harina, el paquete de azúcar, el pack de agua) y su precio, botón
  "+" verde, contador "6", botón "Pedir" y "Pedido ✓". Inserto ≥ 60 % del cuadro.
- **Etiqueta de precio (crearEtiquetaPrecio)**: la etiqueta colgante de cartón con ojal y piolín, **verde de marca**
  con el precio en navy y "hoy" abajo (≥ 44 px en el plano cercano). Sale del monitor en la parte 2, vuela con una
  estela corta (cinta plana verde, no partículas) y entra en el celular de Graciela. Distinta de la tarjeta "Cargado ✓"
  de ya-lo-cargo (forma de etiqueta con ojal y piolín, no tarjeta).
- **Lámpara de escritorio (crearLampara)**: brazo articulado crema con pantalla cónica navy, foco crema; luz puntual
  cálida con sombra suave sobre el escritorio.
- **Campanas de luz del depósito (crearCampana)**: cono navy3 con foco crema emisivo; al apagarse, el foco pasa a gris
  y su luz puntual a 0 en 3 cuadros (con un clunk lejano).
- **Anteojos de leer de Rubén**: armazón navy fino pero de 6 px mínimo, apoyados en la punta de la nariz (parte 1).
- **Taza de lapiceras**: taza crema con 3 lapiceras navy y verde; la cinta la empuja en v8 (se corre 3 cm, no se cae).
- Reusados: oficina, teléfono de escritorio, mate y termo, racks y pallets, rotisería con spiedo, calle (de
  ya-lo-cargo); crearCelular.

## PARTE 1 · el problema (0,00-19,30 s)

Cámara continua (Catmull-Rom) en la oficina; a la rotisería y de vuelta, **zambullida por la pantalla del celular**
(el celular llena el cuadro antes y después del pase: nunca pantalla lisa de más de 4 cuadros).

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,50 | **P1 · cuadro 0.** Plano medio de Rubén sentado al escritorio, de 3/4 desde el lado del ventanal, a la altura de los ojos: el **monitor** grande a la izquierda (con la planilla), la **cinta** "lista_precios.xlsx" abajo, el **celular** en primer término vibrando, Rubén a la derecha con los anteojos en la punta de la nariz; atrás, por el vidrio, el depósito con las 6 campanas prendidas. Push-in lento hacia el celular. | **Cuadro 0:** arriba al centro, el gancho entero Lexend 900 ~120 px **"¿Me pasás la lista actualizada?"** con "lista" en el recuadro verde; ya está la burbuja de Graciela en el celular (avatar + "Graciela · Rotisería" + el ícono de audio). 0,25-2,05 · **Graciela: "Rubén, ¿me pasás la lista actualizada?"** (sale del celular, filtro de audio de chat; el gancho se apaga y arrancan los subtítulos). 2,10 · Rubén arrastra el archivo con el mouse (la mano) · 2,20 · "✓✓" en el celular. | oficina, escritorio, monitor con planilla, cinta, celular, teléfono de escritorio, mate y termo, taza de lapiceras, lámpara, Rubén, depósito con campanas | ambiente: zumbido de la oficina (`zumbido.wav` bajo) · música desde 0,0 · vibra 0,05 · click-soft 2,10 · whoosh-short 2,15 (archivo enviado) |
| 2,50-4,60 | **P2 · el proveedor.** La cámara se corre a la izquierda y baja (Catmull-Rom corta) hasta el **teléfono de escritorio** en primer término, Rubén detrás. | 2,45 · suena el teléfono (el tubo tiembla); Rubén toca el botón de altavoz (se prende verde). 2,75-3,95 · **Proveedor: "Rubén, subió el aceite."** (sale del teléfono, burbuja con ícono de tubo). 4,05 · inserto del monitor: la celda del aceite, el número viejo tachado en rojo apagado, entra el nuevo. 4,30 · **clac**: la cinta crece a "lista_precios_v2.xlsx" (rebote). | teléfono de escritorio, monitor, cinta | ring de teléfono de escritorio (`k-dos-tonos.wav`) 2,45 · click-soft del altavoz 2,70 · key-press ×3 4,05 · clac de cinta métrica (CC0, ver abajo) 4,30 |
| 4,60-8,20 | **P3 · la ráfaga.** Órbita corta y lenta alrededor del escritorio, que sube como grúa: al final se ve desde arriba y de 3/4 el escritorio entero con la cinta larga, Rubén, y por el vidrio el depósito que se va apagando. | Cada vez más rápido, burbujas sin voz con pop: 4,60 Marta · Cafetería **"¿Me pasás la lista?"** → ✓✓ 4,90 · 5,25 proveedor **"Bajó el azúcar."** → clac "lista_v3_azucar.xlsx" 5,45 · 5,80 Walter · Bar **"¿Tenés la lista nueva?"** → ✓✓ 6,00 · 6,30 proveedor **"Cambió el dólar."** → clac "lista_v4_dolar.xlsx" 6,45 · 6,75 Nico · Ventas **"¿La lista para el cliente nuevo?"** → clac "lista_v5_FINAL.xlsx" 6,95 · 7,25 clac "lista_v6_FINAL_ESTA_SI.xlsx" (la cinta toca el termo) · 7,60 clac "**lista_v7_FINAL_ESTA_SI_(2).xlsx**" (empuja el termo, que se inclina en el borde) · 7,80 Rubén lo agarra sin mirar, con la mano izquierda, y lo deja del otro lado · campanas del depósito: se apagan a 5,00 / 5,70 / 6,40 / 7,00 / 7,50 / 8,00 (queda solo la oficina). | escritorio, cinta, termo, celular, teléfono, burbujas, Rubén, depósito con campanas | pop por burbuja · notification.mp3 chico por pedido · whoosh-short por envío · clac por versión (cada uno un poco más agudo) · clunk lejano por campana (CC0, con pasabajos) · k-cloth al agarrar el termo 7,80 |
| 8,20-10,40 | **P4 · zambullida a la rotisería.** 8,25 suena el celular (llamada entrante "Graciela · Rotisería"); push-in rápido a la pantalla del celular, que llena el cuadro, y **salimos por la pantalla del celular de Graciela**: plano medio de Graciela en la rotisería cerrando, el celular en la oreja. | Rotisería con la persiana a media altura, el spiedo vacío y apagado, una luz de tubo. 8,70-10,20 · **Graciela: "Rubén, ¿el aceite a cuánto está?"** (filtro de teléfono). | celular, Graciela con delantal, rotisería cerrando (persiana, spiedo vacío, vitrina) | ring de celular (vibra + tono, CC0) 8,25 · whoosh 8,45 (zambullida) · persiana que baja un poco más 9,60 (chapa, `k-metal-medio`) |
| 10,40-11,40 | **P5 · Rubén.** Vuelta por la misma pantalla (salimos del celular de Rubén, que él tiene en la oreja). Primer plano de Rubén con los anteojos en la punta de la nariz, la cinta larga entra por abajo del cuadro. | 10,45-11,30 · **Rubén: "Está en la lista."** (seco, cansado). | Rubén, celular, anteojos, cinta | whoosh-short 10,40 |
| 11,40-13,90 | **P6 · "Tengo siete."** Contraplano corto a Graciela (sin zambullida: corte de plano a plano en el mismo eje de la llamada) y push-in a su celular que ella separa de la oreja para mirar. | 11,50-13,00 · **Graciela: "¿En cuál? Tengo siete."** (de buena fe, mirando el celular). 13,00-13,90 · **inserto del chat de Graciela** (≥ 60 % del cuadro): siete burbujas de archivo apiladas, de "lista_precios.xlsx" a "lista_v7_FINAL_ESTA_SI_(2).xlsx", las seis viejas con borde rojo apagado; el dedo de Graciela hace scroll arriba y abajo. | Graciela, su celular con el chat | scroll (key-press suave) 13,20 |
| 13,90-16,90 | **P7 · pausa y "Ocho."** Plano medio de Rubén desde el lado del depósito oscuro (se ve el escritorio, el teléfono de escritorio, la cinta larga y Rubén con el celular en la oreja). Push-in muy lento. | 13,90-14,70 · **pausa**: Rubén mira el monitor sin moverse; la música baja a -12 dB en 0,4 s (no se corta); 14,10 **un perro ladra lejos**, dos veces. 14,75 · suena el teléfono de escritorio; Rubén toca el altavoz sin mirarlo. 15,05-16,15 · **Proveedor: "Rubén, subió el aceite."** (otra toma). 16,45-16,90 · **Rubén: "Ocho."** (sin sacar la vista del frente). 16,95 · **clac**: la cinta crece a "lista_v8_aceite.xlsx" y empuja la taza de lapiceras 3 cm. | Rubén, teléfono, cinta, taza, depósito oscuro | perro lejano (CC0, ver abajo) 14,10 · ring 14,75 · click-soft 14,95 · clac 16,95 · roce de cerámica (CC0) 17,00 · la música vuelve a su nivel en 17,00 |
| 16,90-19,30 | **P8 · remate del remate.** El mismo eje; la cámara se acerca a Rubén y queda frontal. | 17,15-18,60 · **Graciela: "Dale. ¿Me la mandás en PDF?"** (desde el celular, filtro de teléfono, simpática y práctica). 18,30-18,90 · **Rubén gira despacio la cabeza hacia cámara**, cara de nada, los anteojos en la punta de la nariz. 18,85 · sin mirar, toca una tecla. 18,95 · **clac largo**: la cinta crece a "lista_v8_aceite_FINAL_ESTA_SI_(2).pdf" (".pdf" en rojo apagado), pasa el borde del escritorio y **se dobla hacia el piso** con un vaivén. 19,30 · fin de la parte 1 (stinger al cartel). | Rubén, celular, cinta que cuelga, escritorio | key-press 18,85 · clac largo + roce de cartón 18,95 · stinger 19,25 |

## CARTEL (19,30-22,30 s)
El de hacen-envios (time card de dibujito, fondo verde de marca con manchas y burbujas, letras que rebotan): **"Una
tienda online" / "más tarde…"**, voz Rasalgethi reusada de `reels/hacen-envios/assets/voice/narrador.wav`. Nunca
"Scalerics".

## PARTE 2 · resuelto (22,30-33,40 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 22,30-25,40 | **Q1 · callback del cuadro 0:** el mismo encuadre de P1 pero **a las 18:30**: el depósito prendido (las 6 campanas), un operario pasando con la zorra al fondo. Rubén sin anteojos, el mate en la mano. En el monitor, el panel de la tienda. La cinta, corta: **"tienda · precios de hoy"** con tilde verde. Push-in hacia el teléfono de escritorio. | 22,35 · suena el teléfono de escritorio; altavoz. 22,60-23,80 · **Proveedor: "Rubén, subió el aceite."** (**la misma toma** que P2: callback exacto). 23,85 · la cinta hace un tic de 1 cm, como si fuera a crecer, y no crece. 24,00 · inserto del panel: Rubén cambia el precio **una vez** ("Aceite 1,5 L x 12"), toca "Publicar" · 24,10 "**Publicado ✓** · lo ven todos tus clientes". 24,35-25,00 · **Rubén: "¿Algo más?"** (al teléfono, seco, tranquilo, con el mate). 25,20 · silencio del proveedor y tono de colgado. | oficina de tarde, depósito prendido, operario con zorra, monitor con el panel, cinta corta, teléfono, mate, Rubén | ambiente de depósito trabajando (zumbido + pasos lejanos) · ring 22,35 · click-soft 22,55 · tic de cinta (clac chiquito) 23,85 · key-press ×2 + click 24,00 · ding (cero.mp3) 24,10 · tono de colgado (CC0) 25,20 |
| 25,40-28,60 | **Q2 · el viaje del precio.** Una **etiqueta de precio verde** sale del monitor; la cámara la sigue (Catmull-Rom, travelling a 1,5 m detrás de ella, grande en cuadro): baja por la escalera de la oficina, cruza el depósito entre los racks, sale por el portón a la calle al atardecer (los faroles prendidos) y entra por la vidriera de la rotisería, **abierta, con el spiedo girando**, hasta el celular de Graciela. | 27,10 · la etiqueta entra en la pantalla del celular de Graciela; inserto (≥ 60 % del cuadro): la tienda mayorista "Distribuidora · Precios de hoy", **el precio del aceite cambia** mientras ella mira (flip). 27,50 · toca "+" hasta **6**; 27,90 · "Pedir"; 28,20 · **"Pedido ✓"**. Graciela sigue con lo suyo (da vuelta un pollo del spiedo). | etiqueta de precio verde, escalera, racks, portón, calle, rotisería abierta con spiedo, Graciela, su celular con la tienda | whoosh largo del viaje 25,40 · calle de tarde 26,30 · campanita de la puerta de la rotisería 26,80 · click-soft ×3 27,50-27,90 · ding 28,20 |
| 28,60-33,40 | **Q3 · el celular que no suena.** De vuelta a la oficina (la cámara entra por el ventanal desde el depósito: grúa que sube). Plano medio de Rubén al escritorio, el celular en primer término. | 28,70 / 29,00 / 29,30 · en el monitor entran solos los pedidos, en verde: **"Graciela · 6 aceite ✓"**, "Marta · azúcar ✓", "Walter · agua ✓". 29,60 · Rubén mira el celular: quieto. 30,00 · lo levanta, 30,30 · lo toca con el dedo, 30,70-31,40 · **lo alza hacia la ventana buscando señal** (lo mueve un poco, como antena). 31,60 · lo deja boca abajo sobre el escritorio; 31,80 · toma mate y se recuesta. 31,90 · **línea chica** abajo (caja navy con borde verde, como en ya-lo-cargo, Lexend 600 ≥ 36 px): **"Tu lista de precios, siempre al día:"** / **"tus clientes ven el precio de hoy y piden solos"** / **"scalerics.com"** en verde (1,5 s, hasta el final). Sin tarjeta de videollamada. | monitor con pedidos, celular, Rubén, mate, depósito prendido | pop ×3 + notification chico 28,70-29,30 · roce del celular 30,00 · tap 30,30 · celular apoyado (golpe chico) 31,60 · bombilla (sorbo de mate, CC0 si hay; si no, sin sonido) 31,80 · final de la música |

## Revisión pedida para este reel (además de 8c)
- **La cinta:** el texto siempre legible y nunca estirado (cada versión con su textura al ancho justo); apoya sobre el
  escritorio, nunca lo atraviesa ni atraviesa el monitor, el termo, la taza ni el brazo de Rubén; el termo y la taza
  se corren porque la cinta los empuja (contacto creíble, no antes ni después); en P8 el tramo que cuelga se dobla en
  el borde y no atraviesa el escritorio ni la silla. Los nombres se leen en el celular (≥ 40 px) en P2, P3 (al final),
  P7 y P8.
- **El chat de siete archivos (P6):** los siete nombres completos y legibles, en orden, sin cortar con "…" (la gracia
  está en leer "FINAL_ESTA_SI_(2)").
- **Las campanas:** se apagan de a una y el depósito queda navy oscuro **plano**, sin degradés que hagan bandas en
  Instagram; la oficina sigue bien iluminada (nunca Rubén en penumbra: la lámpara le da en la cara).
- **La mirada a cámara (P8):** ojos abiertos y de frente al lente, sin parpadeo raro; los anteojos no atraviesan la
  nariz.
- **Las zambullidas (P4, P5):** el celular llena el cuadro antes y después del pase, nunca pantalla lisa de más de 4
  cuadros (lección de netflix-blockbuster).
- **Rubén es ELENCO.ruben** (camisa navy manga larga, sin delantal) en TODOS los planos: chequear que no quede ninguna
  instancia de `almacenero`.
- **Continuidad:** parte 1 de noche (campanas que se apagan), parte 2 a las 18:30 (todas prendidas); anteojos solo en
  la parte 1; el termo del lado derecho hasta 7,80 y del izquierdo después; la rotisería cerrando en la parte 1 y
  abierta en la parte 2; en la parte 2 la cinta siempre corta.
- **SFX que no están en assets/sfx** (clac de cinta métrica, perro que ladra lejos, clunk de luz que se apaga, tono de
  colgado, roce de cerámica, sorbo de mate): reales con licencia CC0 (Kenney del espejo
  github.com/Daarko/sparkstream-sounds, OpenGameArt, como en ya-lo-cargo), con autor, sitio y licencia en
  `fuentes.md`. Nunca sintetizados con ffmpeg. Si alguno no aparece, se saca y se anota (el perro es el único que
  marca la pausa: si no hay un perro CC0, la pausa la marca el zumbido de la oficina que queda solo).

## Portada (sugerencia)
`t` ≈ 18,9 (Rubén mirando a cámara con los anteojos, la cinta ".pdf" que cuelga del escritorio) o ≈ 7,9 (la cinta
"v7_FINAL_ESTA_SI_(2)" cruzando el escritorio, Rubén agarrando el termo). `chica`: "La lista de precios:" ·
`grande`: "v7_FINAL_ESTA_SI" · `sello`: "Distribuidora". Acento `#5ce611`. Renderizar el fondo sin gancho,
subtítulos ni burbujas.

> **Ronda 1-2 (15-11, coordinador):** la etiqueta verde que viaja (Q2) se sacó (era el mecanismo de ya-lo-cargo). En su lugar, un tríptico con los celulares de Marta (cafetería), Walter (bar) y Graciela (rotisería): el precio cambia a la vez con la chapita "hoy", y después el pedido de Graciela con el chip "1 lista · la de hoy". Líneas nuevas: "Está en la lista. La última." · "¿Cuál es la última? Tengo siete." · "Claro. El PDF no se mueve. El aceite, sí." (Rubén a cámara, antes de la tecla). Sin perro (no hay ladrido CC0). Ver NOTAS-constructor.md.
