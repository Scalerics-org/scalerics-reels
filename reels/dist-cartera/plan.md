# dist-cartera · plan plano por plano · DISTRIBUIDORAS, dolor + solución (3D real), ~43,6 s

**De qué trata.** Viernes 18:00 en el depósito de la Distribuidora Rubén: la despedida de **Leo**, el vendedor de la zona
Este. Torta sobre un pallet ("¡SUERTE, LEO!"), vasitos, guirnalda. Leo, con la mochila al hombro, abraza a Rubén:
**"Rubén, te quiero un montón. Pero me voy."** Rubén, con el cuchillo de la torta quieto en el aire: **"¿Y los
clientes?"** Leo, amable, palmeándose el celular del bolsillo del pecho: **"Tranqui. Te dejé el Excel."** En el monitor
del escritorio de Leo (ya vacío), "CARTERA ZONA ESTE.xlsx": 3 filas, y la tercera es "El de la camioneta roja". Rótulos
"Zona Este: 38 clientes · $ 1.900.000 por mes" / "En el Excel: 3". **"Treinta y ocho clientes. Me dejaste tres."**
Rubén llama a la primera: **"Marta, habla Rubén."** / Marta, por altavoz, detrás del mostrador de su cafetería: **"¿Qué
Rubén? Yo le compro a Leo."** Pausa. Remate del remate: Nico: **"Jefe, ¿y la zona de Leo?"** Rubén borra a Marta del
Excel (3 → 2): **"Tuya. Son dos."** Stinger. Cartel **"Un sistema de clientes más tarde…"**. Parte 2: la misma
despedida, el mismo "¿Y los clientes?" y Leo: **"Donde estuvieron siempre."** señalando el monitor: el CRM "Clientes ·
Zona Este · 38", la ficha de Marta (qué compra, cada cuánto, a qué precio, cómo paga, la última conversación, lo
prometido) y hasta "Autoservicio Pérez · nota: camioneta roja". Nico: el mismo **"Jefe, ¿y la zona de Leo?"** / Rubén toca
"Pasar cartera: Leo → Nico" y las 38 fichas vuelan al celular de Nico: **"Tuya. Son treinta y ocho."** Martes: Nico
llama a Marta con la ficha en la mano: **"Marta, ¿lo de siempre? Y las dos cajas que te guardó Leo."** / **"¡Ay, sí!
Mandame."** Pedido ✓. El panel de Rubén: la cartera entera. Rubén: **"Treinta y ocho. Con nombre y apellido."** Cierre:
Sofi a cámara en el depósito: **"Comentá CARTERA y te mando cómo funciona para tu distribuidora."**

- **Producto: CRM de Scalerics para distribuidoras.** Cada cliente con **su ficha en el sistema de la empresa** (no en
  el celular ni en la cabeza del vendedor): qué compra ("lo de siempre"), cada cuánto, a qué lista de precios, cómo paga,
  la **última conversación** y **lo prometido**. Si un vendedor se va, **se pasa la cartera** al que entra con un toque y
  la ve entera desde el día 1 en su celular. Rubén ve en un **panel** a todos sus clientes por zona y por vendedor. Se ve
  funcionando en la parte 2; se nombra en el cartel ("Un sistema de clientes"), en la línea chica final y en
  `descripcion.txt`. **No es agente de IA:** no se nombra así en ningún lado. Nunca "Scalerics" en el cartel.
- **Sin marcas:** "Distribuidora Rubén", "Cafetería Marta", "Rotisería Graciela", "Autoservicio Pérez" inventados. El Excel
  es una **planilla genérica** (grilla gris, sin el verde ni el logo de ningún programa; el nombre del archivo
  ".xlsx" se puede leer como texto). Torta y gaseosa sin marca (botella navy con etiqueta crema lisa). Celulares, monitor
  y chat genéricos.
- **Sin datos de afuera** (ver `fuentes.md`): 38 clientes, $ 1.900.000 por mes, las cajas y los días son del caso.
- **Estructura:** parte 1 **17,4 s** + cartel **2,6 s** + parte 2 **20,0 s** + cierre **3,6 s** = **43,6 s**.
  Solución + cierre = 23,6 s (**54 %**). **Proyecto 3D: copia de `reels/dist-quien-debe`** (Rubén, Nico, Graciela,
  la distribuidora, `crearCelular`, gen.mjs con T1/T2, `armar.mjs unir`, procesar.sh de voces). Se suman Leo (nuevo),
  Marta (`ELENCO.duena`) y Sofi (`ELENCO.sofi`) con el estilo del módulo.
  **Si pasa de 44 s,** recortar primero Q2 (4,0 → 3,4 s), la pausa de P4 y el timbre de P5; nunca la pausa antes de
  "¿Qué Rubén?" (mínimo 0,3 s) ni la de antes de "Tuya. Son dos." (mínimo 0,5 s).
- **Cartel:** time card de siempre: **"Un sistema de clientes" / "más tarde…"**. Audio REUSADO de
  `reels/lo-mismo-que-la-otra-vez/assets/voice/narrador.wav` (Rasalgethi, "Un sistema de clientes más tarde.", 2,88 s;
  ya copiado a `assets/voice/narrador.wav`); si queda largo, atempo 1,1 (≈ 2,6 s). Fallback: "Un sistema más tarde." de
  `reels/ya-lo-cargo` con el cartel "Un sistema" / "más tarde…".
- **Quién dice "Comentá CARTERA": Sofi** (ELENCO.sofi, Achernar), a cámara y en persona en el depósito, con la tablet del
  sistema bajo el brazo. Los últimos tres de distribuidoras (pedidos-lunes, cliente-grande, quien-debe) cerró Rubén; se
  alterna. Llega natural: Rubén ya dijo su remate final y le deja la cámara.
- **La palabra: CARTERA** (una, mayúsculas). En pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Leo se va con cariño (abrazo, torta, "te quiero un montón") y deja el Excel de buena fe;
  no se lleva nada a propósito: los clientes le escriben a él porque él los atendía. Marta es leal a quien la atiende,
  sin maldad. Rubén se ríe de su propia empresa. El chiste es contra la situación: la empresa no tenía nada propio.

## Paleta y set (para "Hechos")
**Set NUEVO como principal: el depósito de la Distribuidora Rubén convertido en despedida, viernes 18:00** (no el
banco de dist-quien-debe ni la oficina vidriada de dist-cliente-grande, que acá queda arriba, al fondo y desenfocada):
estanterías navy3 `#1f3254` con cajas kraft `#c9a878` y bolsas crema, piso de hormigón gris `#8d939c` con líneas de
seguridad crema, tubos fluorescentes crema planos y, desde el portón entreabierto a la derecha, una franja de luz de
tarde cálida plana (crema-ámbar `#e8c98a`, sin degradé). En primer término **un pallet de madera clara con un mantel de
papel crema** de mesa: la **torta rectangular** (bizcochuelo crema, cobertura blanca-crema, borde de merengue con
picos, "¡SUERTE, LEO!" escrito con manga en verde `#5ce611`), vasitos de plástico crema, una gaseosa navy sin marca,
servilletas, el cuchillo de la torta. **Guirnalda de banderines** crema y verde colgada entre dos estanterías. **El
escritorio de Leo** al pie de la escalera de la oficina vidriada: escritorio navy3 chico, el monitor con la planilla,
una caja de cartón con sus cosas (taza, gorra, una plantita), la silla vacía. Sets chicos: **la cafetería de Marta**
(P5, Q4): mostrador de madera con frente navy2 `#16243d`, cafetera de dos grupos gris plano, pizarra navy con "CAFÉ ·
MEDIALUNAS" en tiza crema, frasco de medialunas; y **el muelle** de la distribuidora (reusado) solo de fondo en Q4.
Anotar en "Hechos": "depósito de la distribuidora de despedida (pallet de mesa con torta ¡SUERTE, LEO!, guirnalda
crema y verde, escritorio del vendedor vacío con el monitor de la planilla); cafetería de Marta; parte 2 con interfaz
recreada (CRM con ficha de cliente, pasar cartera al celular de Nico, panel de cartera por zona); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** "Zona Este: 38 clientes · $ 1.900.000 por mes" con "En el Excel: 3"
  (y 3 → 2), la fila "El de la camioneta roja", la fila de Marta tachada. **Verde `#5ce611` para lo resuelto:**
  "38 clientes ✓", cada ✓ de la ficha, "Pasar cartera ✓", "Pedido ✓", el contador "En el sistema: 38", la tarjeta
  CARTERA, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. La de Marta por altavoz sale **del celular de Rubén** (cola al parlante) con el chip "Altavoz · Cafetería
  Marta". "¿Y los clientes?" (P2/Q1), "Jefe, ¿y la zona de Leo?" (P6/Q3) y "Tuya. Son dos." / "Tuya. Son treinta y
  ocho." en el MISMO lugar y tamaño (que se lea la repetición).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "DISTRIBUIDORAS" en el cuadro 0):
  "Viernes, 18:00." · "Viernes, 18:00." (Q1) · "Martes, 9:00." (Q4). Cambio con flip corto + `k-tick-1`.
- Texto en pantalla: crema sobre navy, navy sobre crema; nunca blanco sobre el piso claro. Rótulos con línea guía en caja
  navy `#0b1220`, texto crema, borde crema de 6 px.

## Personajes
- **Rubén** (ELENCO.ruben: camisa navy arremangada, bigote, panza; voz Algenib). Aquí: el **cuchillo de la torta** en
  la mano derecha en P1-P2 (bien agarrado, nunca atravesando la mano ni la torta), un vasito en Q1. Expresiones: P1
  `sonrisa` en el abrazo → P2 `neutra` seca con el cuchillo quieto (la pausa es el chiste), P4 `incredula` frente al
  monitor, P5 `sorpresa` corta al "¿Qué Rubén?" y vuelta a `neutra`, P6 `resignado` con media sonrisa amarga en "Tuya.
  Son dos." (sin manos a la cabeza: ya se usó). Parte 2 `sonrisa`, Q5 con el mate, satisfecho y seco.
- **Leo · nuevo** (vendedor de la calle, ~30, voz **Sadachbia**; en el repo solo fue el audio de Beto en
  corralon-portland, secundario): mismo estilo del módulo; piel clara, pelo castaño oscuro "texturado" corto con barba
  de tres días (que no se parezca a Nico: Nico es trigueño, pelo negro corto, sin barba), **campera de nylon verde
  apagado `#365f28`** abierta sobre chomba crema, mochila navy al hombro (correa ≥ 8 px que no atraviese el brazo), **el
  celular asomando del bolsillo del pecho** de la chomba (pantalla hacia afuera: en P3 se prende con notificaciones).
  Expresiones: `sonrisa` cariñosa en el abrazo, `feliz` y despreocupado en "Tranqui. Te dejé el Excel.", Q1 igual.
- **Nico** (ELENCO.empleado, voz Fenrir): entra en P6 y Q3 con un vasito y una porción de torta en un platito.
  `neutra` de buena fe al preguntar; en P6 mira el monitor con 2 filas (`incredula`), en Q3 sonríe con el celular.
- **Marta** (ELENCO.duena: pelo negro en rodete, dueña de la cafetería; voz **Aoede**, la de hacen-envios y
  houston-marta): detrás de su mostrador, el celular en altavoz apoyado en la cafetera o en la mano; `neutra` amable
  (no lo dice con desprecio: de verdad no sabe quién es Rubén), Q4 `feliz`.
- **Sofi** (ELENCO.sofi, Achernar): solo en el cierre, en persona, tablet bajo el brazo, `sonrisa` de colega.
- **Extras sin voz:** Darío (el operario de dist-pedidos-lunes) y Graciela no; dos operarios del depósito con vasitos al
  fondo en P1 y Q1, desenfocados, para que se lea "despedida".

## Objetos 3D (reusados de dist-quien-debe + nuevos, específicos)
**Reusados:** depósito (estanterías, pallets, cajas kraft, bolsas), oficina vidriada arriba (de fondo), escalera,
`crearCelular`, el muelle (de fondo en Q4), monitor de escritorio.

**Nuevos:**
- **La torta de despedida (el objeto del cuadro 0):** rectangular ~45 × 30 cm, bizcochuelo crema `#e9d9b0` (el corte se
  ve en Q1 con una porción sacada: capas crema y dulce de leche `#a8743a`), cobertura crema-blanca, borde de merengue
  con picos (conos chicos repetidos), "¡SUERTE, LEO!" en Lexend 800 verde con manga (TextGeometry plana en relieve o
  textura) que se lea ≥ 44 px en el cuadro 0. Sobre una bandeja de cartón dorado apagado (`#b08a4a`, plano).
- **El cuchillo de la torta:** hoja gris claro plana + mango navy, ≥ 6 px de canto.
- **Vasitos, gaseosa, servilletas, platitos de cartón.**
- **Guirnalda de banderines:** cordel + triángulos crema y verde alternados, que no tiemble.
- **El escritorio de Leo vacío y su monitor:** monitor 24" (pantalla canvas) en un brazo o pie navy; la caja de cartón
  con sus cosas en la silla.
- **La mochila de Leo** y **el celular del bolsillo del pecho** (pantalla canvas, en P3 y P6 con notificaciones que se
  apilan: "Marta: Leo, ¿pasás el martes?", "Walter: lo de siempre", "+36": es el remate silencioso de quién tiene la
  cartera; que se lea en el inserto de P3 a ≥ 40 px).
- **La cafetería de Marta** (P5, Q4): mostrador, cafetera de dos grupos, molinillo, frasco de medialunas, pizarra.
- **El celular de Rubén en altavoz** (P5) y **el celular de Nico** (Q3, Q4).
- **La tablet de Sofi** (cierre).

## Interfaz recreada (canvas en pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Parte 1 · P4 · la planilla** (monitor de Leo, inserto ≥ 65 %): barra de título "CARTERA ZONA ESTE.xlsx" (texto
crema sobre navy, sin ícono de ningún programa), grilla gris clara, columnas "Cliente · Tel. · Notas":
1. "Marta · cafetería · 099 1·· ··· · martes"
2. "Graciela · ¿rotisería? · — · ¿?"
3. **"El de la camioneta roja" · — · "pide poco"** (rojo apagado)
y debajo filas vacías hasta el borde (se lee que falta todo). Rótulos: **"Zona Este: 38 clientes · $ 1.900.000 por
mes"** y **"En el Excel: 3"** (rojo apagado). **P6:** la fila 1 se tacha y se va; "En el Excel: 3 → 2".
**Parte 2 · Q2 · el CRM en el MISMO monitor** (encabezado navy "Clientes · Distribuidora Rubén"; filtro "Zona Este ·
Vendedor: Leo"; contador verde **"38 clientes"**): grilla de 38 tarjetas chiquitas con nombre; se abre la **ficha de
Cafetería Marta**: "Pide: martes · cada semana" · "Lo de siempre: 6 cajas de aceite · 4 bolsas de harina · 2 de
azúcar" · "Lista de precios: B" · "Paga: a 30 días ✓ al día" · "Última conversación (lunes): '¿Me guardás dos cajas de
la oferta?'" · **"Prometido: 2 cajas de la oferta · lo guardó Leo ✓"**. Rótulos: **"Cada cliente, con su ficha"** y
**"Qué compra, cada cuánto y qué le prometieron"**. Al final, una tarjeta salta al frente: **"Autoservicio Pérez · Carlos ·
nota: camioneta roja"** (el callback; 0,8 s, rótulo chico "Hasta el de la camioneta roja").
**Q3 · "Pasar cartera"** (el mismo monitor): "Zona Este · Leo → Nico" · botón verde **"Pasar cartera ✓"** · las 38
tarjetas vuelan (en 3D, cartitas planas crema en fila, función del tiempo) al celular de Nico, que muestra "Tu cartera:
38 clientes ✓ · con historial". Rótulo **"Se va el vendedor. La cartera se queda."**
**Q4 · el celular de Nico** (≥ 45 % del cuadro en el inserto): la ficha de Marta con "Lo de siempre" y "Prometido: 2
cajas de la oferta"; botón "Llamar"; después **"Pedido ✓ · Cafetería Marta · martes"**.
**Q5 · panel "Cartera"** (el monitor de Rubén en la oficina vidriada, ≥ 70 %): por zona y vendedor: "Zona Este ·
Nico · 38 ✓" · "Zona Centro · Nico · 41" · "Zona Oeste · Rubén · 29"; arriba el contador **"En el sistema: 108
clientes"**; "Pedidos esta semana · Zona Este: 35 de 38". Rótulo **"Todos tus clientes, en tu empresa"**.
**Tarjeta de cierre (HTML, ~3,6 s, sobre Sofi a cámara):** abajo de la cara, en el 80 % seguro: "Comentá" (Lexend 800
crema ~90 px) / **"CARTERA"** (Lexend 900 ~170 px, navy en el recuadro verde) / "y te mando cómo funciona para tu
distribuidora" (Lexend 600 crema ~46 px, 2 líneas) / "Sistema de clientes: la cartera queda en tu empresa" (~38 px) /
**"scalerics.com"** en verde (~44 px). Entra sobre "CARTERA" de la voz.

## PARTE 1 · el problema (0,00-17,40 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,00 | **P1 · cuadro 0.** Plano medio, cámara a la altura de la torta: el pallet con la torta en primer término abajo (≥ 35 % del ancho, "¡SUERTE, LEO!" legible), detrás Leo (mochila) y Rubén abrazados de costado, la guirnalda arriba, estanterías al fondo. Push-in lento. | **Cuadro 0:** "DISTRIBUIDORAS" (Lexend 900 ~130 px, ya entero) y el chip "Viernes, 18:00."; el abrazo ya en curso, la burbuja asomando. 0,15-2,55 · **Leo: "Rubén, te quiero un montón. Pero me voy."** · los operarios del fondo levantan los vasitos. | depósito, pallet, torta, vasitos, gaseosa, guirnalda, Leo, Rubén, 2 extras | ambiente de depósito (zumbido de tubo, murmullo de despedida bajo, risas lejanas) · palmada en la espalda 0,4 · `pop` de vasitos 2,0 |
| 3,00-4,40 | **P2 · el corte.** Primer plano de Rubén, el cuchillo de la torta en la mano, quieto en el aire. | Pausa 0,2 · 3,05-4,05 · **Rubén: "¿Y los clientes?"** (seco). El murmullo se corta. | Rubén, cuchillo, torta abajo | el murmullo baja de golpe a 3,0 |
| 4,40-6,10 | **P3 · el celular en el bolsillo.** Plano medio de Leo, feliz; push-in rápido al celular del bolsillo del pecho (inserto 0,6 s: notificaciones que se apilan "Marta: Leo, ¿pasás el martes?" / "Walter: lo de siempre" / "+36"). | 4,45-5,85 · **Leo: "Tranqui. Te dejé el Excel."** · palmea el bolsillo · 5,3 · inserto del celular. | Leo, celular con notificaciones | palmada 4,8 · `notification` ×3 apiladas 5,3-5,7 (bajo) |
| 6,10-9,60 | **P4 · el Excel.** Grúa corta: la cámara gira al escritorio de Leo al pie de la escalera (silla vacía, caja de cartón) y entra al monitor (≥ 65 %), con Rubén de 3/4 en el borde derecho. | 6,4 / 6,7 / 7,0 · las 3 filas (pop) · 7,3 · rótulo **"Zona Este: 38 clientes · $ 1.900.000 por mes"** · 7,6 · **"En el Excel: 3"** (rojo apagado) · 7,70-9,40 · **Rubén: "Treinta y ocho clientes. Me dejaste tres."** | escritorio, monitor con la planilla, caja de cartón, silla, Rubén | whoosh 6,1 · `click-soft` por fila · pop por rótulo |
| 9,60-13,90 | **P5 · la llamada.** Rubén frente al monitor con el celular en altavoz en la mano; a 11,4 corte a la cafetería de Marta (plano medio detrás del mostrador, el celular apoyado en la cafetera); vuelta a Rubén en 13,4. | 9,7 · toca la fila de Marta · tono de llamada (2 ring) · 10,45-11,25 · **Rubén: "Marta, habla Rubén."** · pausa 0,3 · 11,55-13,25 · **Marta (altavoz): "¿Qué Rubén? Yo le compro a Leo."** (amable, de verdad no sabe) · 13,4 · Rubén, `sorpresa` y vuelta a `neutra`. | Rubén, celular, monitor; cafetería, Marta, cafetera, pizarra | `ring` 9,8 · ambiente de cafetería (molinillo, tazas) bajo, filtrado como altavoz · cafetera que silba 11,5 (bajo) |
| 13,90-17,40 | **P6 · remate del remate.** Plano medio de Rubén y Nico frente al monitor (Nico entra con el platito de torta), el monitor en el centro. | Pausa 0,5 · 14,05-15,35 · **Nico: "Jefe, ¿y la zona de Leo?"** · 15,5 · Rubén, sin mirarlo, borra a Marta: la fila se tacha y se va, "En el Excel: 3 → 2" · pausa 0,4 · 16,05-16,95 · **Rubén: "Tuya. Son dos."** · Nico mira el monitor con dos filas · 17,15 stinger. | Rubén, Nico, platito, monitor | `click-soft` + `glitch-1` corto en el borrado 15,5 · **stinger** 17,15 (la música se corta seca) |

Último cuadro (17,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (17,40-20,00 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un sistema de clientes"** /
**"más tarde…"**. Audio de `assets/voice/narrador.wav` (Rasalgethi, reusado de lo-mismo-que-la-otra-vez; atempo 1,1 si
hace falta). Nunca "Scalerics".

## PARTE 2 · la solución (20,00-40,00 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 20,00-25,60 | **Q1 · el mismo cuadro 0.** Mismo encuadre de P1 (la torta ya con una porción sacada: se ve el corte con dulce de leche), después el mismo primer plano de P2 y Leo. | Chip "Viernes, 18:00." · 20,15-22,55 · **el mismo audio de Leo** · 23,00-24,00 · **el mismo "¿Y los clientes?"** · 24,30-25,50 · **Leo: "Donde estuvieron siempre."** y señala con el pulgar el monitor de su escritorio (ahora con el CRM). | ídem P1 + monitor con el CRM | ambiente igual que P1 (el murmullo NO se corta) |
| 25,60-29,60 | **Q2 · la ficha.** La MISMA grúa de P4 al monitor (≥ 65 %), con push-in a la ficha. | 25,8 · "Clientes · Zona Este · 38" (las 38 tarjetas con pop rápido) · 26,4 · se abre la ficha de Cafetería Marta, renglón por renglón · rótulo "Cada cliente, con su ficha" · 27,6 · "Prometido: 2 cajas de la oferta · lo guardó Leo ✓" · rótulo "Qué compra, cada cuánto y qué le prometieron" · 28,6 · salta la tarjeta "Autoservicio Pérez · nota: camioneta roja" · rótulo chico "Hasta el de la camioneta roja". | escritorio, monitor con CRM | whoosh 25,6 · `k-tick-1` por renglón · `ding` 27,6 · pop 28,6 |
| 29,60-33,20 | **Q3 · pasar cartera.** El MISMO encuadre de P6: Rubén y Nico frente al monitor. Las tarjetas vuelan al celular de Nico (inserto ≥ 45 %). | 29,75-31,05 · **el mismo "Jefe, ¿y la zona de Leo?"** · 31,1 · Rubén toca "Pasar cartera ✓" · 31,2-31,9 · las 38 tarjetas en fila vuelan al celular · "Tu cartera: 38 clientes ✓" · rótulo "Se va el vendedor. La cartera se queda." · 31,90-33,10 · **Rubén: "Tuya. Son treinta y ocho."** (en el lugar de "Tuya. Son dos."). | Rubén, Nico, monitor, tarjetas, celular de Nico | `click-soft` 31,1 · whoosh de cartas (barajar) 31,2 · `cero.mp3` 31,9 |
| 33,20-37,40 | **Q4 · martes, Marta.** Chip "Martes, 9:00.". Nico en el muelle con el celular (inserto de la ficha de Marta ≥ 45 %) y corte a la cafetería, el MISMO encuadre de P5. | 33,35-36,05 · **Nico: "Marta, ¿lo de siempre? Y las dos cajas que te guardó Leo."** · 36,30-37,20 · **Marta: "¡Ay, sí! Mandame."** (`feliz`) · 37,2 · en el celular de Nico: "Pedido ✓ · Cafetería Marta". | muelle de fondo, Nico, celular; cafetería, Marta | `k-tick-1` en el chip · ring corto 33,25 · ambiente de cafetería · `ding` 37,2 |
| 37,40-40,00 | **Q5 · el panel.** La oficina vidriada de Rubén: el monitor con el panel "Cartera" a ≥ 70 % y Rubén de 3/4 con el mate en el borde; push-in leve. | 37,6 · las filas por zona con tic · "En el sistema: 108 clientes" · rótulo "Todos tus clientes, en tu empresa" · 38,10-39,80 · **Rubén: "Treinta y ocho. Con nombre y apellido."** (seco, satisfecho). | oficina vidriada, monitor, Rubén, mate | `k-tick-1` por fila · `ding` 38,0 |

## CIERRE (40,00-43,60 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 40,00-43,60 | **C · Sofi a cámara.** Primer plano en el depósito, de frente, la tablet bajo el brazo; detrás, desenfocados, la guirnalda y la torta (nunca pared lisa). Push-in suave. | 40,15-43,40 · **Sofi: "Comentá CARTERA y te mando cómo funciona para tu distribuidora."** (de colega, simpática) · sobre "CARTERA" entra la tarjeta abajo de la cara; en los últimos 0,8 s la línea chica "Sistema de clientes: la cartera queda en tu empresa" / "scalerics.com". | pop en "CARTERA" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "DISTRIBUIDORAS" entero y legible, sin tapar caras; la torta con "¡SUERTE, LEO!" legible y la mochila
  de Leo: que se lea "despedida" antes de que hable.
- **Se entiende sin sonido:** burbujas de las 14 líneas; la planilla con 3 filas legible (≥ 40 px) y "El de la camioneta
  roja" claramente leíble (el final depende de esa fila); el chip "Altavoz · Cafetería Marta"; la fila tachada; la
  ficha de Marta en el CRM; el "Pasar cartera ✓".
- **Continuidad:** P1 = Q1, P2 = Q1b, P4 = Q2 (mismo monitor), P5 = Q4b (cafetería), P6 = Q3 en encuadre; la torta
  entera en P1 y con una porción sacada en Q1 (el corte, de frente); en P6 y Q3 Nico con el mismo platito.
- **Física:** el cuchillo en la mano de Rubén (no flota ni atraviesa la torta); la mochila no atraviesa el brazo ni el
  abrazo (que los brazos del abrazo no se metan en el torso del otro: si no sale limpio, de costado, la mano de Rubén en
  el hombro de Leo); el celular dentro del bolsillo; las 38 tarjetas no atraviesan a Nico.
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX que no estén en assets/sfx** (palmada en la espalda, cartas que se barajan, molinillo/cafetera, vasitos de
  plástico): reales con licencia CC0 (BigSoundBank o Freesound CC0), con autor, sitio y licencia en `fuentes.md`. Nunca
  sintetizados.

## Voces (partes/*.txt; detalle en partes/voces.md, a reescribir: los .tsv copiados son de dist-quien-debe)
Rubén = Algenib · Nico = Fenrir · Marta = Aoede · Sofi = Achernar · **Leo = Sadachbia (nuevo)** · narrador del cartel =
Rasalgethi (audio reusado). 13 archivos a generar; `01-leo`, `02-ruben` ("¿Y los clientes?") y `07-nico` se reusan en
la parte 2.

## Portada
`portada.json`: `chica` "Viernes, 18:00." · `grande` **"¿Y los clientes?"** · `sello` **"DISTRIBUIDORAS"**. Fondo limpio
(sin gancho, burbujas, chips, rótulos ni logo) de P1-P2 (~3,4 s): Rubén con el cuchillo quieto sobre la torta "¡SUERTE,
LEO!" y Leo con la mochila, todo en la mitad de arriba. Alternativa: P5 con Rubén y el celular en altavoz frente a la
planilla de 3 filas. Ajustar `t` y `fondo_limpio` con el render.
