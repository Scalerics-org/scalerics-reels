# contable-papeles · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~38,6 s

**De qué trata.** ESTUDIOS CONTABLES. Último día, 18:00, en "Estudio Adriana", una casona reciclada. En el celular de
Adriana, la contadora, suena el audio de WhatsApp de Marcelo, su cliente de la panadería: **"Adri, las facturas te las
mando mañana sin falta."** Adriana graba la respuesta: **"Marcelo. Vence hoy."** Escalada sin voz: llegan fotos
imposibles (el pulgar tapando el total, una factura doblada en cuatro), "Mandaron 33 → 41 de 60", Lucas el asistente
tiende tickets en un piolín con broches, la tira de la sumadora llega al piso. 22:10, timbre: Marcelo entra con una caja
de zapatos, orgulloso: **"Acá está todo, Adri. Ordenadito."** y la vuelca: avalancha de tickets. Adriana levanta uno EN
BLANCO contra la lámpara: **"¿Y esta?"** / Marcelo: **"Esa es la más importante."** Pausa con el costo. Marcelo, desde
la puerta, generoso: **"Si querés, te mando una foto."** Remate del remate: llega la foto: un papel blanco con su pulgar.
Cartel **"Una automatización más tarde…"**. Parte 2 (la mitad del reel o más): el día 1 a Marcelo le llega solo el
WhatsApp del estudio con el link; el día 3, cuando el repartidor le deja la harina, saca la foto de la factura en el
momento (se lee entera): **"Listo. Ordenadito."**; en el estudio, el panel por cliente y por mes sube solo, el
recordatorio del día 5 sale solo a los que faltan, "Mandaron 52 de 60"; el último día a las 18:00, el MISMO audio de
Marcelo ("te las mando mañana sin falta") y Adriana, mirando el panel: **"Marcelo, las mandaste el día tres."** /
Marcelo: **"¿Yo? Qué ordenadito."** 18:05: Adriana apaga la lámpara verde y se va. Cierre: Sofi en videollamada:
**"Comentá PAPELES y te mando cómo funciona para tu estudio."**

- **Producto:** **automatización del pedido de comprobantes** para estudios contables: el **día 1 a cada cliente le
  llega solo un WhatsApp** del estudio con su nombre y un **link para subir las fotos** de sus facturas y tickets del mes
  desde el celular; el **recordatorio automático** a los que todavía no subieron nada (día 5 y antes del cierre); todo
  queda **ordenado por cliente y por mes** (carpeta "Marcelo · Noviembre", cada comprobante con su foto y su fecha); y la
  contadora ve un **panel "Mandaron 52 de 60"** con quién falta. Se ve funcionando en la parte 2 y se nombra en la línea
  chica final y en `descripcion.txt`. El cartel nunca dice "Scalerics".
  **No prometer:** que el sistema lea los montos, liquide impuestos, presente nada ante la DGI o el BPS, ni que detecte
  si una foto es ilegible. Solo pide, recuerda, recibe y ordena.
- **Sin marcas:** ninguna marca de software contable, banco, ni la DGI dibujada (ni su logo ni sus colores); chat y
  celulares genéricos (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" solo en un rótulo
  de texto). "Estudio Adriana" y "Panadería Marcelo" son inventados. La sumadora, la lámpara y los biblioratos sin marca.
- **Sin datos de afuera** (ver `fuentes.md`): 60 clientes, 33/41/52 de 60, "cuarta noche hasta las 2", 14 comprobantes
  de Marcelo: todo del caso. **Ninguna fecha de vencimiento concreta** (se dice "Último día" y "Vence hoy" sin fecha), ni
  multas, ni recargos, ni nombres de impuestos en la voz (en los lomos de los biblioratos sí puede leerse "IVA", "BPS",
  "SUELDOS": son rótulos de archivo, no afirmaciones).
- **Estructura** (la de `inmobiliaria-visitas` y `pilates-cuota`): parte 1 **16,5 s** + cartel **2,5 s** + parte 2
  **16,0 s** + cierre **3,6 s**. Solución + cierre = 19,6 s de 38,6 s (51 %). Un proyecto 3D con gen.mjs (T1/T2).
- **Cartel:** el time card de siempre: **"Una" / "automatización" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si queda
  larga (> 2,6 s), se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice
  "Un sistema" / "más tarde…".
- **Rubén NO aparece** (no es distribuidora, y ya tiene su contador en `dist-cliente-grande`). Del elenco: Sofi (cierre).
- **Quién dice "Comentá PAPELES": Sofi** (ELENCO.sofi, voz Achernar), en un celular parado al lado del monitor de
  Adriana, como en inmobiliaria-visitas y veterinaria-vacunas.

## Paleta y set (para "Hechos")
**Dos sets. (1) NUEVO: "Estudio Adriana", en una casona reciclada del Cordón, de noche (parte 1) y de tarde (parte 2):
pared navy2 `#16243d` lisa con **boiserie crema `#efeee5`** (zócalo alto de madera pintada hasta 1,1 m, con paneles en
relieve bajo y moldura, color plano); piso de **baldosas calcáreas en damero crema y navy** (placas planas grandes, sin
dibujo fino: la compresión de Instagram las rompe); **ventana alta de casona** con postigos de madera crema abiertos
(afuera navy liso de noche, crema cálido de tarde, sin degradés); al fondo, **estantería metálica crema llena de
biblioratos** (lomos navy3 y verde oscuro `#3fa60a`, etiquetas crema con "IVA", "BPS", "SUELDOS", "CLIENTES A-F",
"2025", Lexend 800 navy) y al lado el **estante de 60 sobres de papel madera** con el nombre de cada cliente.
Luz de parte 1: la pileta cálida de la **lámpara de banquero con pantalla verde de marca `#5ce611`** y una general baja
navy (distinto de todos los sets de día); parte 2: luz de tarde pareja por la ventana. (2) NUEVO y chico: **"Panadería
Marcelo"**, de mañana: azulejo blanco `#f7f7f2` con una guarda verde de marca a 1,4 m, mostrador de madera clara con
vitrina de vidrio (bizcochos: medialunas, cuernitos, bolas de fraile en bandejas crema), atrás un canasto con flautas,
y en el piso **bolsas de harina de 25 kg** crema con banda navy (sin marca). Distinto de la oficina de Rubén, el gabinete
crema, la parrilla de noche, el taller navy claro, el galpón del corralón, el consultorio de azulejo verde, el estudio de
pilates de madera clara y la inmobiliaria de ladrillo crema.** Anotar en "Hechos": "estudio contable en casona del
Cordón: pared navy2 con boiserie crema, damero de calcáreas crema y navy, lámpara de banquero verde, biblioratos y 60
sobres de papel madera, sumadora con tira al piso; panadería de azulejo blanco con guarda verde; parte 2 con interfaz
recreada (WhatsApp con link, foto de la factura, panel por cliente y mes); cartel verde".
- **Texto en pantalla:** crema sobre navy, navy sobre crema. "ESTUDIOS CONTABLES" del cuadro 0 en caja navy con el
  recuadro verde de selección (la pared es navy: la caja va con borde crema de 6 px para que se despegue).
- **Rojo apagado `#c7655b` SOLO para el problema:** las pestañas de los sobres vacíos, "Mandaron 33 de 60" / "41 de 60"
  en la parte 1, "Ticket térmico · se borró", "Cuarta noche hasta las 2", la foto en blanco. **Verde `#5ce611` para lo
  resuelto:** "Subido ✓", "Mandaron 52 de 60" → "60 de 60 ✓", "Recordatorio enviado ✓", la carpeta "Marcelo · Noviembre
  · 14 ✓", "Noches hasta las 2: 0", el recuadro de selección de los subtítulos. **La lámpara verde no cuenta como
  "resuelto"**: es del set (verde de marca), siempre igual.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  **El audio de Marcelo** es una burbuja de audio de chat (play, onda en navy, "0:04") que sale del celular de Adriana,
  con el texto de lo que dice debajo en la burbuja de diálogo (cola al celular, etiqueta chica "Marcelo · panadería").
  En la parte 2 la MISMA burbuja, mismo lugar y tamaño, para que se lea el callback.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "ESTUDIOS CONTABLES" en el cuadro
  0): "Último día · 18:00" (P1), "19:40", "20:30", "22:10" (P3-P4), "Día 1 · 9:00" y "Día 3" (Q1), "Día 5" (Q2), "Último
  día · 18:00" (Q3), "18:05" (Q4).

## Personajes (copia local de `reels/inmobiliaria-visitas/assets/personajes.js`; agregar a ELENCO, mismo estilo, solo parámetros y peinados que ya existen)
- **Adriana · `ELENCO.adriana`** (contadora, dueña del estudio, ~55, voz **Autonoe**). `piel: PIEL.clara`, `pelo:
  0x5a4a40` (castaño oscuro con algo de canas), `peinado: "melena"` corta (que no se parezca a Silvana, platinada, ni a
  Lorena, cobriza), **lentes** `lentes: MARCA.navy3, lentesFinos: true` (que no se confunda con Graciela: Graciela tiene
  rulos lila y cárdigan verde), `cejasColor: 0x4a3c34, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true`; camisa
  blanca `0xf7f7f2` con `cuello: 0xf7f7f2`, **chaleco/cárdigan navy3** (`campera: { color: MARCA.navy3, cuello:
  MARCA.navy3, cierre: MARCA.navy2, abierta: true }`), `pantalon: MARCA.navy`, `zapatos: MARCA.navy2`, `aros: MARCA.cr`,
  `labiosPegados: true, labios: 0xa8585a, mejillas: 0xe39282, panza: 1.0, nariz: 0.05, alto: 0.97`. Sentada en su silla
  de escritorio. Expresión: `fastidio` controlado en "Vence hoy", `concentrada` en la escalada, `incredula` con el ticket
  en blanco, ojos cerrados al final de P1 (sin manos a la cara); `sonrisa` tranquila en la parte 2. Seca y con humor,
  nunca maltrata a Marcelo.
- **Marcelo · `ELENCO.marcelo`** (cliente del estudio, dueño de "Panadería Marcelo", ~50, voz **Enceladus**; alternativa
  Puck si el coordinador prefiere o si el otro reel de la noche la usa). `piel: PIEL.media`, `pelo: PELO.gris` mezclado
  con negro `0x4a4644`, `peinado: "texturado", texturaAlto: 0.3`, **barba candado** `barba: 0x4a4644, barbaLarga: 0.3,
  barbaOpacidad: 0.7, barbaBigote: true` (que no se parezca a Rubén: Rubén es pelado con bigote grande y camisa navy),
  `cejasColor: 0x3a3634, cejaGruesa: true`; buzo crema `MARCA.cr2` con `cuello: MARCA.cr`, **campera verde oscuro
  `0x2f5a1c` abierta** (`campera: { color: 0x2f5a1c, cuello: 0x2f5a1c, cierre: MARCA.navy3, abierta: true }`), `pantalon:
  0x3a3f4a`, `zapatos: 0x3b2a20`, `panza: 1.1, nariz: 0.06, mejillas: 0xd98a78, alto: 1.0`. Simpático, orgulloso,
  generoso, cero culpa: él cree de verdad que trajo todo ordenado.
- **Lucas · `ELENCO.lucas`** (asistente del estudio, ~24, **sin voz**). `piel: PIEL.trigueña`, `pelo: PELO.negro`,
  `peinado: "corto", cortoMechas: true` (que no se parezca a Joaco ni a Nico: Lucas lleva **lentes redondos** `lentes:
  MARCA.navy2` y camisa celeste muy pálida `0xdfe8ee` arremangada), `pantalon: MARCA.cr2`, `zapatos: MARCA.navy`, `panza:
  0.95, alto: 1.02`. En la parte 1, sentado en el piso tendiendo tickets; en la parte 2, en su escritorio con un café.
- **El repartidor de la harina (Q1, sin voz):** un DEFECTO de 3/4 con buzo navy y gorra crema, deja la bolsa y la
  factura en el mostrador y se va.
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de inmobiliaria-visitas/taller: buzo navy claro con franja crema, la
  varilla del micrófono separada de la mejilla) en el celular parado del cierre.

## Objetos 3D (específicos, que nadie confunda el estudio con una oficina cualquiera ni con un banco)
- **La lámpara de banquero (EL objeto del set):** base de bronce opaco `0x9a7a4a`, pantalla cilíndrica alargada de
  vidrio **verde de marca** (emisiva suave hacia abajo, sin brillo que se rompa en la compresión), tirador de cadenita.
  Siempre en el escritorio de Adriana, a su derecha. En Q4 se apaga (tirón de la cadenita, clic).
- **La sumadora con rollo de papel:** sumadora de escritorio crema con teclas navy (sin marca), con la **tira de papel
  que sale por arriba y cae por el borde del escritorio**: en P1 llega hasta la mitad de la pata; en P3 crece hasta el
  piso y hace un rulo (función pura del tiempo); en la parte 2, una tira corta de dos vueltas.
- **El estante de 60 sobres de papel madera:** 6 filas de 10 sobres kraft `0xc9a774` parados con el nombre del cliente
  en crema (Lexend 800 navy, "MARCELO", "SUSANA", "TALLER ROLO", "ÓPTICA VERA", ...). Los que no mandaron, **chatos con
  una pestaña rojo apagado**; los que mandaron, abultados. En P3 se abultan de a uno (33 → 41). En la parte 2 no
  existen: el estante tiene biblioratos ordenados (los sobres los reemplaza el panel).
- **La estantería de biblioratos:** metálica crema, 4 estantes de biblioratos AZ (lomos navy3 y verde oscuro, anillo
  metálico, etiquetas crema "IVA", "BPS", "SUELDOS", "CLIENTES A-F", "2025").
- **El piolín con tickets (P3):** un hilo de lado a lado del estudio, a 1,2 m, con **broches de ropa de madera** y
  tickets colgando (papel blanco largo, renglones navy finos de 6 px dibujados como líneas, nada de texto chico). Lucas
  cuelga uno más.
- **El celular de Adriana:** `crearCelular` de ya-lo-cargo/anotamelo con funda navy2, apoyado sobre la mesa (cuadro 0)
  y en la mano a la altura del pecho cuando graba (botón de micrófono crema en pantalla). Pantalla: el chat "Marcelo ·
  panadería" con la burbuja de audio.
- **La caja de zapatos:** caja de cartón crema `0xe2d9c4` con tapa y banda navy (sin marca), un poco abollada, bajo el
  brazo de Marcelo. **La avalancha (P4):** al volcarla caen ~40 tickets blancos (rectángulos curvados, de 8 × 20 cm a
  8 × 40 cm, algunos arrugados en bolita), **un boleto de ómnibus** crema chico, **una servilleta de bar** con números a
  mano, **una figurita** (rectángulo con borde blanco y una pelota de fútbol dibujada, genérica). Caída determinista
  (cada pieza con su semilla fija), se apilan sobre el escritorio y la sumadora, ninguna atraviesa a nadie.
- **EL ticket en blanco (el remate):** ticket térmico largo, BLANCO total con apenas el borde dentado arriba y abajo y
  un fantasma gris muy claro de "TOTAL" (ilegible), que Adriana levanta contra la pantalla verde de la lámpara (se ve a
  contraluz, sin nada). Grande en cuadro en P5 (≥ 40 % del alto).
- **La foto en blanco (remate del remate):** en el celular de Adriana, una foto en el chat: el mismo ticket blanco sobre
  la mesa de la panadería, con **el pulgar de Marcelo** tapando una esquina. Etiqueta del chat "Marcelo · 22:16".
- **Escritorio de Lucas (parte 2):** monitor chico, taza de café crema (el mate es de Rubén), sin tickets.
- **Panadería (Q1):** mostrador de madera clara con vitrina (medialunas, cuernitos, bolas de fraile en bandejas crema),
  canasto de flautas, **bolsa de harina de 25 kg** crema con banda navy que el repartidor apoya en el mostrador, y la
  **factura** (hoja A5 crema con encabezado navy, renglones gruesos) que Marcelo fotografía.
- **Monitor de Adriana (parte 2):** monitor sin logo, en el lugar donde en P1 estaba la pila de carpetas; al lado, en Q5,
  el celular parado en su soporte con Sofi.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final; celular/monitor ≥ 60 % del cuadro en los insertos)
**Parte 1 · P1/Q3 · el audio en el celular de Adriana** (encabezado navy "Marcelo · panadería"): burbuja de audio (play
crema, onda navy, "0:04") · hora "18:00".
**Parte 1 · P3 · las fotos que llegan** (mismo chat): "19:40" foto de una factura con **un pulgar enorme tapando el
total**; "20:30" foto de una factura doblada en cuatro; "20:31" texto "¿esto sirve?"; "22:16" (P7) la foto del ticket en
blanco con el pulgar. Contador grande, caja navy, número rojo apagado: **"Mandaron 33 de 60"** → **"41 de 60"**.
**Parte 1 · P6 · rótulos de la pausa** (caja navy, texto crema, línea guía): al ticket en blanco, **"Ticket térmico · se
borró"** (rojo apagado); a la caja de zapatos, "Un mes en una caja de zapatos"; al estante de sobres, **"Mandaron 41 de
60"** (rojo apagado); a Adriana, **"Cuarta noche hasta las 2"** (rojo apagado).
**Parte 2 · Q1 · el WhatsApp del día 1 en el celular de Marcelo** (encabezado navy "Estudio Adriana"): "Hola, Marcelo.
Subí acá las facturas y tickets de noviembre. Una foto alcanza." · botón verde **"Subir fotos"**. Chip "Día 1 · 9:00".
Rótulo: "El día 1 le llega solo". Chip "Día 3": la cámara del celular sobre la factura de la harina (encuadre con
esquinas crema), clic, miniatura → **"Subido ✓ · Factura · harina · día 3"** · "Noviembre: 9 comprobantes".
**Parte 2 · Q2 · el panel en el monitor de Adriana** (≥ 70 % del cuadro; encabezado navy "Comprobantes · Noviembre"):
lista de clientes con su chip ("MARCELO · 9 ✓", "SUSANA · 22 ✓", "TALLER ROLO · 0 · falta" en rojo apagado, "ÓPTICA VERA
· 15 ✓", ...), contador grande **"Mandaron 0 → 38 de 60"** (chip "Día 3"), chip "Día 5" + renglón **"Recordatorio
automático enviado a 22 ✓"**, el contador sigue **38 → 52 de 60** (verde). Click en MARCELO: la carpeta **"Marcelo ·
Noviembre · 14 ✓"** con miniaturas en fila ordenadas por fecha (la factura de la harina se lee). Rótulo: "Todo ordenado
por cliente y por mes".
**Parte 2 · Q4 · el mismo panel, el último día:** **"Mandaron 60 de 60 ✓"** · **"Noches hasta las 2: 0"** (verde).
**Capa HTML del cierre:** "Comentá **PAPELES**" grande (Lexend 900, ~140 px, PAPELES en el recuadro verde); en los últimos
1,4 s, abajo chico: "Pedido de comprobantes automático, cliente por cliente" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-16,50 s)
Eje del estudio: Adriana al centro en su escritorio, la lámpara verde a su derecha (izquierda del cuadro), la sumadora a
su izquierda con la tira colgando; detrás, la estantería de biblioratos y el estante de sobres; la puerta de calle a la
derecha del cuadro; la ventana alta a la izquierda.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,30 | **P1 · cuadro 0.** Plano medio desde enfrente del escritorio, a la altura de la mesa: Adriana grande al centro bajo la luz de la lámpara verde, el celular sobre la mesa en primer término con el chat abierto, la sumadora con la tira, los biblioratos y el estante de sobres (pestañas rojas) detrás. Push-in lento. | **Cuadro 0:** arriba, **"ESTUDIOS CONTABLES"** (Lexend 900, ~120 px, crema en caja navy con borde crema y el recuadro verde de selección); chip "Último día · 18:00" · 0,25-2,85 · **Marcelo (audio): "Adri, las facturas te las mando mañana sin falta."** (burbuja de audio + burbuja de diálogo desde el celular). Adriana mira el celular sin tocarlo. | estudio, escritorio, lámpara, sumadora, celular, Adriana, biblioratos, sobres | ambiente de estudio de noche (reloj de pared bajito, calle lejana) · "tuc" de audio de chat al empezar |
| 3,30-4,70 | **P2 · la respuesta.** Primer plano de Adriana: levanta el celular a la altura del pecho y mantiene el botón del micrófono. | 3,40-4,50 · **Adriana: "Marcelo. Vence hoy."** (seca, `fastidio` controlado) · suelta: "fiu" de audio enviado. | Adriana, celular | sonido de audio enviado (corto) |
| 4,70-7,40 | **P3 · la escalada, sin voz.** 4,70 inserto del celular ≥ 60 %: chip "19:40", llega la foto del pulgar; 5,40 chip "20:30", la factura doblada en cuatro y "¿esto sirve?". 6,00 plano general del estudio con travelling lateral: Lucas sentado en el piso cuelga un ticket más en el piolín con broches; la tira de la sumadora toca el piso y hace rulo; en el estante, sobres que se abultan de a uno; contador "Mandaron 33 → 41 de 60" (rojo apagado). | Sin voz. Los cambios en cada 0,6-0,8 s (foto, foto, piolín, sobres). | celular, piolín con broches y tickets, Lucas, sumadora y su tira, estante de sobres | ding chico por foto · teclas de la sumadora en ráfaga · whoosh-short del travelling · pop chico por sobre |
| 7,40-10,20 | **P4 · llega Marcelo.** Chip "22:10". 7,45 timbre; plano desde atrás de Adriana (su hombro en primer término) hacia la puerta: entra Marcelo con la caja de zapatos bajo el brazo, sonriente. Se para del otro lado del escritorio. | 7,90-9,60 · **Marcelo: "Acá está todo, Adri. Ordenadito."** · 9,70 abre la tapa y vuelca la caja: **avalancha** de tickets sobre el escritorio (tapa la sumadora a medias), el boleto, la servilleta, la figurita que cae de frente. Lucas, en el piso, levanta la vista. | puerta, Marcelo, caja de zapatos, avalancha, escritorio | timbre 7,45 · pasos · avalancha de papel 9,70 (crujido, no golpe) |
| 10,20-12,80 | **P5 · el remate.** Plano medio corto de Adriana: saca un ticket de la pila y lo levanta contra la lámpara verde; push-in al ticket: BLANCO, a contraluz, grande en cuadro. 11,20 contraplano de Marcelo, orgulloso. | 10,40-11,00 · **Adriana: "¿Y esta?"** (`incredula`) · pausita (0,3 s) · 11,30-12,60 · **Marcelo: "Esa es la más importante."** (contento, convencido). | Adriana, ticket en blanco, lámpara, Marcelo | papel que cruje al levantarlo |
| 12,80-13,90 | **P6 · la pausa.** Plano general quieto desde el costado: Adriana con el ticket en alto, Marcelo, la pila sobre el escritorio, el estante de sobres y Lucas en el piso bajo el piolín. | La música baja a -12 dB en 0,4 s (no se corta). 12,95 · rótulos: al ticket **"Ticket térmico · se borró"**; a la caja "Un mes en una caja de zapatos"; al estante **"Mandaron 41 de 60"**; a Adriana **"Cuarta noche hasta las 2"**. | todos | pop chico por rótulo |
| 13,90-16,50 | **P7 · remate del remate.** Marcelo, ya en la puerta, se da vuelta, generoso, con el celular en la mano a la altura del pecho. | 14,00-15,50 · **Marcelo: "Si querés, te mando una foto."** · 15,60 sale, cierra la puerta · 15,80 vibra el celular de Adriana sobre la pila: inserto ≥ 50 % con la foto: el ticket en blanco y el pulgar de Marcelo (chip "22:16") · 16,10 contraplano corto de Adriana, que cierra los ojos · 16,40 stinger. | Marcelo, puerta, celular de Adriana, Adriana | puerta que se cierra · vibración + ding 15,80 · stinger 16,40 |

## CARTEL (16,50-19,00 s)
Time card de dibujito de siempre: **"Una" / "automatización" / "más tarde…"**. Narrador Rasalgethi (toma nueva). Nunca
"Scalerics".

## PARTE 2 · resuelto (19,00-38,60 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 19,00-23,40 | **Q1 · la foto, el mismo día.** Chip "Día 1 · 9:00". La panadería: Marcelo detrás del mostrador, vibra el celular; 19,40 inserto ≥ 60 %: el WhatsApp del estudio con el botón "Subir fotos" (rótulo "El día 1 le llega solo"). 20,80 chip "Día 3": entra el repartidor, apoya la bolsa de harina en el mostrador y le da la factura; Marcelo apunta el celular a la factura (inserto de la cámara, se lee entera), clic, **"Subido ✓"**. | 22,40-23,20 · **Marcelo: "Listo. Ordenadito."** (contento, ahora con razón) · guarda el celular. | panadería, vitrina con bizcochos, Marcelo, celular, repartidor, bolsa de harina, factura | notification 19,40 · campanita de la puerta 20,80 · golpe sordo de la bolsa · obturador 21,90 · ding 22,00 |
| 23,40-27,40 | **Q2 · el panel.** El estudio de tarde (luz pareja de ventana): Adriana en su escritorio sin pilas; Lucas en el suyo con un café; el piolín ya no está. 23,70 push-in al monitor hasta ≥ 70 %. | El panel "Comprobantes · Noviembre": "Mandaron 0 → 38 de 60" (chip "Día 3"), chip "Día 5" y **"Recordatorio automático enviado a 22 ✓"**, 38 → **52 de 60** en verde · click en MARCELO: **"Marcelo · Noviembre · 14 ✓"** con las miniaturas por fecha (la de la harina se lee). Rótulo: "Todo ordenado por cliente y por mes". Sin voz. | estudio de día, Adriana, Lucas, monitor | tecleo suave · ding por chip (escalonados) · whoosh-short del contador |
| 27,40-33,60 | **Q3 · callback.** Chip "Último día · 18:00". El encuadre del cuadro 0 (mismo plano, misma burbuja), pero el escritorio despejado, la sumadora con su tira corta, la lámpara verde prendida, el monitor con el panel. | 27,60-30,20 · **Marcelo (audio): "Adri, las facturas te las mando mañana sin falta."** (el MISMO audio de P1) · Adriana sonríe, mira el monitor (no levanta el celular) y graba con el celular apoyado · 30,40-32,10 · **Adriana: "Marcelo, las mandaste el día tres."** · 32,30-33,40 · **Marcelo (audio): "¿Yo? Qué ordenadito."** (sorprendido y orgulloso). | estudio, Adriana, celular, monitor con el panel, sumadora | "tuc" de audio · audio enviado · risita corta de Lucas si sale en la toma |
| 33,60-35,00 | **Q4 · a casa.** Chip "18:05". Inserto corto del panel: **"Mandaron 60 de 60 ✓"**, **"Noches hasta las 2: 0"**. 34,20 plano medio: Adriana se pone el saco y tira de la cadenita de la lámpara verde: se apaga. | Sin voz. | panel, Adriana, lámpara | ding 33,70 · clic de la cadenita 34,40 |
| 35,00-38,60 | **Q5 · cierre.** El escritorio con la luz de tarde: el monitor con el panel en verde y, al lado, el celular parado con **Sofi en videollamada**; travelling corto a Sofi. | 35,20-38,20 · **Sofi: "Comentá PAPELES y te mando cómo funciona para tu estudio."** · en "PAPELES" entra grande **"Comentá PAPELES"** (capa HTML) · 37,20 · línea chica: "Pedido de comprobantes automático, cliente por cliente" / "scalerics.com". | monitor, celular parado con Sofi | pop en "PAPELES" · final de la música |

**Si las tomas reales hacen pasar el reel de ~40 s**, recortar en este orden: (1) Q1 sin el plano del celular vibrando
en la panadería (empieza en el inserto; -0,6 s); (2) Q4 solo con el inserto del panel, sin la lámpara (-0,8 s); (3) P3
con una foto menos (-0,6 s). Nunca recortar la pausita antes de "Esa es la más importante." ni el vibrar de la foto en
blanco.

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "ESTUDIOS CONTABLES" entero y legible sobre la pared navy (caja con borde); Adriana grande, la lámpara
  verde, la sumadora con la tira, el celular con la burbuja de audio y los biblioratos en el mismo cuadro. Que se lea
  "estudio contable" y no "oficina" genérica ni banco.
- **La avalancha:** determinista, sin tickets que atraviesen la sumadora, la lámpara, el celular ni a Adriana; la
  figurita y el boleto visibles un instante; que no tape la cara de Adriana.
- **El ticket en blanco:** se lee como ticket (borde dentado, largo, papel) y como BLANCO; que la lámpara verde no lo
  tiña de verde de lleno (contraluz cálido, el verde solo en el borde).
- **Manos:** nadie se toca la cara; celulares a la altura del pecho o sobre la mesa; la mano de Adriana no atraviesa el
  ticket ni la lámpara; Marcelo sostiene la caja sin que la caja le atraviese el brazo.
- **Continuidad:** Adriana con lentes, camisa blanca y cárdigan navy3 en todo el reel (saco encima solo en Q4); Marcelo
  con campera verde oscuro y barba candado; Lucas con lentes redondos y camisa celeste; la tira de la sumadora larga en
  toda la parte 1 y corta en toda la parte 2; el piolín solo en la parte 1.
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp,
  ninguna marca de software ni la DGI; ✓ verdes; "Mandaron X de 60" rojo apagado en la parte 1 y verde en la parte 2.
- **Sofi:** ELENCO.sofi, ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` y `fondo_limpio` pendientes. Plano propio "portada" (VER=portada en tres.js, LIMPIO=1), como inmobiliaria-visitas y
veterinaria-vacunas: en la mitad de arriba, Adriana de frente detrás del escritorio con el ticket en blanco en alto
contra la lámpara verde, cara de `incredula`; delante, la montaña de tickets de la avalancha y la caja de zapatos vacía
volcada; Marcelo de 3/4 a un costado, orgulloso. `chica`: "Último día, 22:10." · `grande`: **"¿Y esta?"** · `sello`:
"ESTUDIOS CONTABLES". Alternativa de `grande`: "¿Ordenadito?" (no está textual en el guion, pero se lee solo con la
montaña de tickets).
