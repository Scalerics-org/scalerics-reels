# dice-cuarenta · plan plano por plano · PARA MANDAR completo (3D real), ~33,2 s

**De qué trata.** El stock de la distribuidora vive en un Excel. Nico pregunta si hay aceite (Graciela quiere 40);
Rubén, desde la oficina vidriada, mira la planilla: **"El Excel dice cuarenta."** Sobre el rack del aceite baja un
**"40" 3D gigante colgado de cadenas**, como un cartel. Nico: **"¡Vendido!"**, y lo vende dos veces más (Marta, Walter);
con cada venta se clava un remito "· 40" en el parante, y **el 40 no se mueve**. Llega el camión: la grúa baja desde el
40 gigante hasta el pallet y hay **tres cajas**. Pausa (una paloma cruza el galpón). Nico: **"Pero el Excel dice
cuarenta."** Rubén: **"El Excel nunca bajó al depósito."** El operario se lleva las 3 cajas; Nico: **"Tranqui, ya lo
actualicé."** y el cartel gira a **37**, rojo apagado, sobre un pallet vacío. Rubén: **"Bárbaro. Ahora miente
actualizado."** Cartel **"Un sistema más tarde…"**. Parte 2: el mismo encuadre; Nico: "Rubén, ¿hay aceite?" Rubén: **"Fijate
vos."** El celular de Nico dice el stock real; el cartel verde baja solo con cada caja escaneada, avisa en 10, Rubén
pide, entra el proveedor y vuelve a 40. Rubén lo prueba (saca una caja: 39; la pone: 40). Nico: **"¿Y? ¿Cuántos hay?"**
Rubén: **"Los que dice."**

- **Producto:** sistema de stock a medida: cada venta descuenta y cada entrada suma sola, el vendedor ve el stock real en
  el celular antes de prometer, y avisa cuando algo se está por acabar. Solo en la línea chica final y en
  descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** planilla genérica (grilla crema con encabezado navy, sin el verde ni el logo de ningún programa; la
  palabra "Excel" se dice y se escribe en burbujas, pero no se dibuja el ícono ni la interfaz del programa), chat
  genérico, celulares sin logo, cajas kraft con una botella dibujada y "ACEITE 1,5 L x 12", sin marca de aceite.
- **Estructura** como `reels/la-lista` y `reels/ya-lo-cargo`: parte 1 (19,2 s, sin línea chica) + cartel (3,0 s) +
  parte 2 (11,0 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel: el de
  ya-lo-cargo, mismo texto **"Un sistema" / "más tarde…"** y la misma toma de Rasalgethi
  (`reels/ya-lo-cargo/assets/voice/narrador.wav`; anotamelo tiene otra con el mismo texto).
- **Personajes** (copia local de `reels/abren-hoy/assets/personajes.js`, o la de ya-lo-cargo/la-lista, que ya tienen los
  sets de la distribuidora): **Rubén = ELENCO.ruben** (NO `almacenero`: camisa navy manga larga arremangada, sin
  delantal, el mate en la mano casi todo el reel), **Nico = ELENCO.empleado** (el vendedor joven, celular en la mano),
  **el operario** (extra sin voz, el de la zorra de ya-lo-cargo: chaleco verde de marca, gorra navy). Graciela, Marta y
  Walter solo como avatar redondo en sus burbujas (la cara del personaje 3D renderizada chica en un círculo).
- **Mecanismos nuevos para la línea:** la escalada es **un número que no se mueve** (el cartel 3D del Excel, colgado
  sobre el rack) mientras se clavan remitos debajo; el remate visual es **el contraste en un solo plano de grúa** (40
  gigante arriba / 3 cajas abajo); la pausa la marca **una paloma que cruza el galpón** (aleteo) con la música baja; el
  remate del remate es **el marcador que gira a 37** sobre un pallet vacío. En la parte 2, el mismo cartel ya es verde
  y honesto, y Rubén lo prueba sacando y poniendo una caja.

## Paleta y set (para "Hechos")
**Distribuidora de día, a nivel del piso del depósito: paredes y fondo navy claro `#16243d` liso, racks navy3 `#1f3254`
con largueros verde `#5ce611`, pallets de madera clara con cajas kraft `#c9a46b` y crema `#efeee5`, piso de hormigón
gris-crema plano; la oficina vidriada arriba, al fondo.** Distinto de la-lista (oficina de noche con lámpara sobre
depósito navy oscuro) y de ya-lo-cargo (rotisería, calle y depósito visto desde la oficina, piso crema2): acá el 80 %
del reel pasa **abajo, entre los racks**. Anotar en "Hechos": "distribuidora de día a nivel del piso, pasillo de racks
sobre navy claro #16243d, cartel 3D del número colgado; parte 2 igual con el cartel verde".
- **Depósito (el set principal):** un pasillo de racks a cada lado (3 niveles, pallets llenos de cajas kraft, bolsas de
  harina crema, packs de agua envueltos en film), campanas de luz prendidas (planas, sin degradé), el portón del muelle
  abierto al fondo con luz de día crema, la **escalera metálica** que sube a la oficina vidriada (perfiles navy, vidrio
  celeste `#b9cde0` al 15 %) donde se ve a Rubén y el monitor. Nunca pared lisa detrás de nadie: siempre racks.
- **El rack del aceite:** el protagonista. Un módulo de rack con el cartelito de pasillo "ACEITE" (crema, Lexend 800
  navy) en el larguero; en el nivel de abajo, el pallet del aceite. En la parte 1: **3 cajas** en el medio de un pallet
  vacío (se ve la madera del pallet alrededor); en la parte 2: el pallet lleno (40 cajas en 5 capas de 8, envueltas en
  film transparente).
- **Rojo apagado `#c7655b` SOLO para el problema:** el "37" del remate del remate, los remitos que no se van a poder
  cumplir (borde rojo apagado recién cuando aparecen las 3 cajas). **Verde `#5ce611` para lo resuelto:** el cartel de la
  parte 2, "En depósito: 40 ✓", "Pedir ✓", el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla (o hacia el celular). Las de los clientes salen del celular de Nico con avatar redondo y nombre del
  comercio ("Graciela · Rotisería", "Marta · Cafetería", "Walter · Bar").
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco sobre fondo claro.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **Cartel del número (crearCartelNumero)**: EL objeto del reel. Una placa gruesa tipo cartel de pasillo (RoundedBox
  ~1,6 x 1,0 x 0,08 m) **crema con borde navy grueso**, colgada de **dos cadenas** (eslabones de toro o cilindros navy3,
  con un vaivén amortiguado cuando aparece y cuando cambia el número, función del tiempo) del travesaño de arriba del
  rack. El número en **TextGeometry Lexend 800** extruido, navy, que ocupa casi toda la placa; arriba, chiquito en la
  placa, "STOCK · EXCEL" en mono navy (≥ 36 px en el plano general). Cambio de número = **marcador de aeropuerto**
  (split-flap): las dos mitades de cada dígito giran sobre un eje horizontal, 4-6 cuadros por dígito, con un clac. Parte
  1: crema/navy, número "40" → "37" en **rojo apagado** al final. Parte 2: placa **verde de marca** con número navy y
  "STOCK · AL DÍA" arriba; 40 → 30 → 20 → 10 (parpadea) → 0 → 40 → 39 → 40. Siempre arriba en cuadro, limpio, sin
  pisar cabezas (punto 8c: números 3D arriba).
- **Remitos clavados (crearRemito)**: hojitas crema gruesas (0,21 x 0,15 m, 0,01 de espesor, borde navy de 6 px) con
  "GRACIELA · 40", "MARTA · 40", "WALTER · 40" en Lexend 800 navy ≥ 44 px en el plano donde se leen; entran volando desde
  el celular de Nico y **se clavan con una grampa** en el parante del rack, uno arriba del otro (rebote corto). Cuando
  aparecen las 3 cajas, se les pone el borde rojo apagado.
- **Cajas de aceite**: caja kraft con la botella de aceite dibujada de perfil en la cara (crema con la etiqueta en blanco)
  y "ACEITE 1,5 L x 12" en navy; cinta de embalar crema arriba. Las 3 de la parte 1 un poco desalineadas (una con la
  esquina aplastada), en el medio del pallet; las 40 de la parte 2 alineadas y envueltas en film.
- **Pallet de madera**: tablas claras con los tacos, bien específico (no una tabla lisa).
- **Zorra (de ya-lo-cargo)** y el operario.
- **Celular de Nico (crearCelular de ya-lo-cargo/anotamelo)**: pantalla canvas; en la parte 1 el chat con las burbujas de
  Graciela, Marta y Walter y el "¡Vendido!" de Nico en verde; al final, la planilla genérica con la celda "Aceite · 40"
  que él cambia a 37 (inserto rápido opcional). En la parte 2: la ficha "Aceite 1,5 L x 12 · En depósito: 40 ✓" con la
  barrita de stock verde. Inserto ≥ 60 % del cuadro.
- **Paloma**: low-poly gris-navy con el cuello verde tornasol apagado (un toque, no colores de marca ajena), que cruza
  el galpón por arriba de los racks en P4, aleteando (ciclo de alas como función del tiempo). Chica en cuadro, pero que
  se lea como paloma (cabeza chica, pecho redondo, cola en abanico).
- **Monitor de Rubén con la planilla / el panel** (de la-lista): en la parte 1, la planilla "STOCK" con "Aceite 1,5 L x 12
  · 40" (inserto opcional en P1); en la parte 2, el aviso verde "Aceite: quedan 10 · ¿Pedimos 40?" con el botón "Pedir".
- **Camión de reparto** (de ya-lo-cargo, entra al muelle en P3) y **camión del proveedor + autoelevador** (parte 2, Q2:
  solo como set, deja el pallet; nada de levantar personas ni autos).
- Reusados: depósito, racks y pallets, escalera y oficina vidriada, mate y termo (de ya-lo-cargo y la-lista).

## PARTE 1 · el problema (0,00-19,20 s)

Cámara continua (Catmull-Rom) en el depósito, a la altura de los ojos de Nico, con una grúa que baja en P3. Sin
zambullidas: todo pasa en el mismo galpón.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,40 | **P1 · cuadro 0.** Plano general desde el pasillo: en primer término Nico al pie de la escalera con el celular, a la derecha el rack "ACEITE", arriba al fondo la oficina vidriada con Rubén al monitor y el mate. Push-in lento hacia el rack. | **Cuadro 0:** arriba al centro, el gancho entero Lexend 900 ~120 px **"El Excel dice cuarenta."** con "cuarenta" en el recuadro verde; ya está la burbuja de Nico (sin voz) **"Rubén, ¿hay aceite? Graciela quiere 40."** con cola hacia él. 0,25-1,60 · **Rubén: "El Excel dice cuarenta."** (desde la oficina, un poco de eco de galpón; mira la planilla, no a Nico; el gancho se apaga y arrancan los subtítulos). 1,35 · **pop: el cartel "40" baja colgado de sus cadenas** sobre el rack del aceite, con vaivén. 1,80-2,30 · **Nico: "¡Vendido!"** (pulgar arriba, al celular). 2,30 · el remito "GRACIELA · 40" vuela del celular y se clava en el parante. | depósito, racks, rack del aceite, escalera, oficina vidriada con Rubén, monitor, mate, Nico con celular, cartel "40", remito | ambiente de depósito de día (`zumbido.wav` bajo + pasos lejanos) · música desde 0,0 · cadenas (`k-metal-liviano-2`) + pop 1,35 · whoosh-short 2,25 · grampa (`k-metal-click`) 2,35 |
| 2,40-6,40 | **P2 · la ráfaga.** Travelling lateral por el pasillo al lado de Nico, que camina con el celular; el cartel "40" siempre arriba en cuadro (la cámara lo encuadra con Nico debajo). Termina de frente al rack, Nico al lado del parante. | Cada vez más rápido: 2,60 burbuja **Marta · Cafetería "¿Tenés aceite? 40."** (pop + notification) · 3,10 Nico mira el cartel · 3,30-3,75 **Nico: "¡Vendido!"** · 3,85 remito "MARTA · 40" clavado · 4,50 burbuja **Walter · Bar "40 de aceite, para mañana."** · 4,90-5,30 **Nico: "¡Vendido!"** (sin mirar el cartel, cantadito) · 5,40 remito "WALTER · 40" clavado. 5,40-6,40 · inserto corto del parante: los tres remitos uno arriba del otro y, arriba, el "40" que no se movió (≥ 44 px). | Nico, celular, burbujas, cartel, remitos, pasillo de racks | pop + notification chico por burbuja · whoosh-short + grampa por remito (cada grampa un poco más aguda) · pasos de Nico (`paso-*`) |
| 6,40-9,00 | **P3 · el camión y la grúa.** 6,40 por el portón del fondo entra el camión de reparto al muelle (desenfocado al fondo, cámara quieta). 6,90 el operario cruza con la zorra y los tres remitos en la mano hasta el rack. 7,30-9,00 **grúa:** la cámara baja desde el cartel "40" (lleno en cuadro, arriba) siguiendo las cadenas y el rack, hasta el pallet: **tres cajas solas** en el medio de un pallet vacío. Push-in lento. | 8,40 · los remitos del parante toman borde rojo apagado. El "40" queda arriba del cuadro, gigante; las 3 cajas abajo, chicas, en el centro del pallet (que se vea la madera alrededor). | camión, portón, operario con zorra, rack, cartel, pallet, 3 cajas | motor de camión (`k-motor-bajo` / `motor.mp3`) 6,40 · freno de aire (`k-neumatico-abre`) 6,90 · ruedas de la zorra (`k-plastico`, rodando) 7,00 · whoosh lento de grúa 7,30 |
| 9,00-11,00 | **P4 · la pausa.** Contraplano desde atrás del pallet (las 3 cajas en primer término, desenfocadas abajo): Rubén (bajó con el mate en la mano), Nico y el operario en fila frente al rack. | 9,00-10,40 · **pausa**: los tres miran las cajas, levantan la vista al "40" (la cámara está detrás del pallet y debajo del cartel: se ve el canto de la placa y las cadenas arriba del cuadro, no el número al revés), bajan la vista a las cajas. La música baja a -12 dB en 0,4 s (no se corta). 9,50 · **una paloma cruza el galpón** por arriba de los racks, de izquierda a derecha, aleteando. | Rubén con mate, Nico, operario, 3 cajas, paloma, racks | aleteo de paloma (CC0, ver abajo) 9,50 · zumbido del depósito solo |
| 11,00-14,70 | **P5 · el remate.** 11,00 plano medio de Nico y Rubén de perfil (dos personas), el rack atrás. 12,40 Rubén gira la cabeza despacio hacia Nico; push-in a primer plano de Rubén. | 11,05-12,40 · **Nico: "Pero el Excel dice cuarenta."** (de buena fe, mostrando el celular). 12,40-12,80 · beat: Rubén gira la cabeza. 12,80-14,60 · **Rubén: "El Excel nunca bajó al depósito."** (seco, sin levantar la voz). | Nico, Rubén, mate, celular, rack | la música vuelve a su nivel en 14,70 |
| 14,70-19,20 | **P6 · remate del remate.** Plano general medio de frente al rack: el cartel arriba, el pallet abajo, Nico y Rubén a la derecha. | 14,70-15,40 · el operario carga las 3 cajas en la zorra y sale de cuadro: **el pallet queda vacío**. 15,50-16,70 · **Nico: "Tranqui, ya lo actualicé."** (toca el celular, orgulloso). 16,80 · **el cartel gira como marcador de aeropuerto: "40" → "37"**, en rojo apagado, con vaivén de las cadenas, colgado sobre el pallet vacío. 17,00 · Rubén mira el 37, mira el pallet. 17,40-19,00 · **Rubén: "Bárbaro. Ahora miente actualizado."** 19,00 · toma mate, cara de nada. 19,20 · fin de la parte 1 (stinger al cartel). | operario, zorra, 3 cajas, pallet vacío, cartel 37, Nico, Rubén, mate | cajas a la zorra (`madera-golpe` ×3) 14,80 · ruedas de la zorra que se va · tap 16,60 · split-flap (clac rápido ×4, CC0) 16,80 · cadenas 16,90 · stinger 19,15 |

## CARTEL (19,20-22,20 s)
El de ya-lo-cargo (time card de dibujito, fondo verde de marca con manchas y burbujas, letras que rebotan): **"Un
sistema" / "más tarde…"**, voz Rasalgethi reusada de `reels/ya-lo-cargo/assets/voice/narrador.wav`. Nunca "Scalerics".

## PARTE 2 · resuelto (22,20-33,20 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 22,20-25,40 | **Q1 · callback del cuadro 0:** el mismo encuadre de P1. Nico al pie de la escalera con el celular y la burbuja de Graciela; Rubén arriba en la oficina con el mate. Sobre el rack del aceite, el **cartel ya es verde** con "40" navy. | 22,40-23,30 · **Nico: "Rubén, ¿hay aceite?"** (hacia arriba). 23,40 · Rubén, sin levantar la vista del mate, le señala el celular con la bombilla. 23,50-24,20 · **Rubén: "Fijate vos."** 24,20 · inserto del celular de Nico (≥ 60 % del cuadro): **"Aceite 1,5 L x 12 · En depósito: 40 ✓"** en verde. 24,60 · grúa corta al pallet: **lleno de verdad** (40 cajas en film). 24,90-25,30 · **Nico: "¡Vendido!"** | depósito, rack, cartel verde, pallet lleno, Nico, celular, oficina con Rubén y mate | ambiente de depósito · click-soft 24,20 · ding (`cero.mp3`) 24,30 |
| 25,40-28,60 | **Q2 · el stock que se mueve solo.** Plano medio de frente al rack, cartel arriba. | 25,40 · el operario carga capas en la zorra y escanea cada una con el celular (bip): **el cartel baja 40 → 30 → 20 → 10** (split-flap). 26,60 · en **10 parpadea** y sale volando un aviso verde hacia la oficina; inserto del monitor de Rubén: **"Aceite: quedan 10 · ¿Pedimos 40?"**; Rubén toca **"Pedir ✓"** con el mate en la otra mano. 27,20 · el cartel termina en 0 (la última capa a la zorra). 27,60 · entra el camión del proveedor; el autoelevador deja un pallet nuevo: **el cartel sube 0 → 40**. | operario, zorra, cartel verde, monitor con el aviso, Rubén, camión del proveedor, autoelevador, pallet nuevo | bip por capa (`k-tono` corto, agudo) · split-flap por cambio · whoosh-short 26,60 · click-soft 26,90 · motor 27,60 · autoelevador (`k-motor-bajo`) + pallet al piso (`madera-tabla`) 28,10 |
| 28,60-33,20 | **Q3 · "Los que dice."** Plano medio de Rubén frente al pallet nuevo, el cartel verde arriba; Nico entra por la derecha. | 28,70 · Rubén (bajó) saca una caja: bip, **"39"**. 29,30 · la vuelve a poner: bip, **"40"**. (Mira el cartel con desconfianza, como un chico con un juguete.) 30,00-30,80 · **Nico: "¿Y? ¿Cuántos hay?"** 31,00-31,60 · **Rubén: "Los que dice."** 31,70 · toma mate y se va por el pasillo. 31,70 · **línea chica** abajo (caja navy con borde verde, como en ya-lo-cargo y la-lista, Lexend 600 ≥ 40 px): **"Un sistema de stock a medida"** / **"scalerics.com"** en verde (1,5 s, hasta el final). Sin tarjeta de videollamada. | Rubén, mate, caja, pallet lleno, cartel verde, Nico | bip ×2 · split-flap ×2 · cartón (`madera-golpe` suave) al apoyar la caja · pasos de Rubén · final de la música |

## Revisión pedida para este reel (además de 8c)
- **El cartel:** siempre arriba del cuadro, entero (nunca cortado por el borde superior), sin pisar cabezas ni el
  gancho/subtítulos (zona de subtítulos arriba al centro: el cartel va debajo, nunca detrás del texto); las cadenas lo
  sostienen de verdad (no flota despegado) y no atraviesan el larguero; el número se lee en el celular en P1, P2, P3,
  P6, Q1, Q2 y Q3. El split-flap no deja dígitos a medio girar en cuadros quietos.
- **El contraste de P3:** el "40" gigante y las 3 cajas en el mismo cuadro al final de la grúa; las 3 cajas tienen que
  verse POCAS (pallet grande con madera alrededor), no un pallet chico lleno.
- **Los remitos:** legibles (≥ 44 px) en el inserto de P2; clavados en el parante sin atravesarlo; se ponen rojo
  apagado recién en P3.
- **La paloma:** que se lea como paloma (no como murciélago ni mancha); no atraviesa racks ni cartel.
- **Rubén es ELENCO.ruben** en TODOS los planos (ni una instancia de `almacenero`); el mate en la mano izquierda no le
  atraviesa la cara al tomar; ojos abiertos cuando habla.
- **Continuidad:** las 3 cajas siempre las mismas (la de la esquina aplastada) hasta que se las lleva el operario; el
  pallet vacío en P6; el cartel crema en la parte 1 y verde en la parte 2; Rubén en la oficina en P1/Q1 y abajo en
  P4-P6/Q3 (en P4 y Q3 se ve que bajó: llega por la escalera o ya está abajo con el mate).
- **SFX que no están en assets/sfx** (aleteo de paloma, split-flap/marcador de aeropuerto, grampa si `k-metal-click` no
  alcanza, cadenas): reales con licencia CC0 (Kenney del espejo github.com/Daarko/sparkstream-sounds, OpenGameArt,
  Freesound CC0), con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados con ffmpeg. Si no hay paloma CC0, la
  pausa la marca el zumbido del depósito solo y la paloma cruza muda.

## Portada (sugerencia)
`t` ≈ 8,8 (fin de la grúa: el "40" gigante arriba, las 3 cajas solas en el pallet) o ≈ 17,2 (el "37" rojo sobre el
pallet vacío, Rubén y Nico mirándolo). `chica`: "El Excel dice" · `grande`: "cuarenta" · `sello`: "Distribuidora".
Acento `#5ce611`. Con `circulo` rojo sobre las 3 cajas si suma. Renderizar el fondo sin gancho, subtítulos ni burbujas.
