> **Nota (18-11, después de tres rondas de revisión):** este es el plan ORIGINAL. Lo construido difiere en: 36 verdes
> ($ 179.640 sin vender desde marzo; Verde 0 → 36; Quedan 36 → 24), contenedor de noviembre, línea nueva de Mica
> ("¡Diez azules para el Bazar!"), sin la impresora de etiquetas, Paola = Aoede. Ver NOTAS-constructor.md y fuentes.md.

# tienda-tenes-stock · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~38,6 s

**De qué trata.** IMPORTADORAS. Lunes 10:00 en el depósito de "Casa Pao · Importados": Paola importa freidoras de aire
y las vende por redes y en un localcito adelante del depósito. Está sacando la foto de la freidora verde en la mesa de
fotos cuando entra el audio de Graciela: **"Pao, ¿tenés stock de la verde?"** Paola mira el cuaderno colgado del clavo
("VERDE: 1"): **"¡Sí! La última. Hoy te la mando."** Entra "Pagado ✓ $ 4.990". Mica viene del local, levanta la freidora
de la mesa de fotos y se la lleva: **"¡Pao! La verde la vendí en el local."** El aro de luz queda iluminando el hueco.
Paola, al celular: **"Graciela, perdoname: se me agotó."** / Graciela: **"Ay. Bueno, la compro en otro lado."** Mica vuelve
a cambiar el papel de fondo y lo levanta: la "mesa" de fotos son cajas apiladas FREIDORA 4 L · VERDE. **"Pao. ¿Y estas
cajas?"** / Paola, seca: **"Del contenedor de marzo."** (40 verdes sin cargar, $ 199.600 parados). Remate del remate:
Paola levanta el celular en modo historia, sonrisa de vendedora: **"¡Hola! ¡Ingreso nuevo!"** Cartel **"Una tienda
online más tarde…"**. Parte 2 (más de la mitad): Mica vende una verde en el local, mismo audio "¡Pao! La verde la vendí en
el local." y Paola, sin mirar: **"Ya lo sabe la tienda."** (el catálogo baja solo a "Queda 1"); Graciela, en su living, ve
"Queda 1": **"Queda una. ¡Mía!"**, paga y elige envío sin preguntar nada, y la tienda dice "Sin stock" sola; el pedido le
cae a Paola pago y listo para despachar, y una venta por mayor descuenta del mismo stock; llegan las 40 verdes, Mica las
carga, Paola graba de nuevo "¡Hola! ¡Ingreso nuevo!" (mismo audio) y antes de que termine entran 12 pedidos pagos:
**"Ya se enteraron."** Cierre: Paola, a su celular en modo historia: **"Comentá STOCK y te mando cómo funciona para tu
importadora."**

- **Producto:** tienda online propia de la importadora: **catálogo con el stock real** por color (si queda 1 dice "Queda
  1", si se agota dice "Sin stock" sola), **precio a la vista, pago y envío elegidos por el cliente** sin preguntar
  ("Envío a domicilio $ 190" / "Retiro en el local $ 0", botón "Pagar"), **el pedido le cae a la dueña ya pago y listo
  para despachar** (con la etiqueta de envío), y **un solo stock** que se descuenta solo cuando se vende en el local (la
  tablet del mostrador) o por mayor. Detalle de la parte 2: "Avisarme cuando vuelva" (la tienda les avisa sola a los que
  esperaban). Se ve funcionando en la parte 2 y se nombra en la línea chica final y en `descripcion.txt`. El cartel nunca
  dice "Scalerics".
- **Sin marcas:** freidoras genéricas (cajas kraft con "FREIDORA DE AIRE 4 L" y el color, sin marca ni logo); nada de
  Instagram, Mercado Libre ni Mercado Pago dibujados ni con sus colores (la palabra "redes" y "pago" solo como texto
  genérico; botón "Pagar con tarjeta o débito" sin logos de tarjetas); chat genérico (burbujas crema/navy, sin el verde ni
  el logo de WhatsApp); la tienda de la parte 2 es "Casa Pao" (inventada), con interfaz de marca Scalerics neutra
  (navy/crema/verde). "El otro lado" donde compra Graciela nunca se muestra ni se nombra.
- **Sin datos de afuera** (ver `fuentes.md`): $ 4.990, 40 verdes, $ 199.600, 12 pedidos, 25 azules, $ 190 de envío: todo
  del caso.
- **Estructura** (la de `inmobiliaria-visitas` y `pilates-cuota`): parte 1 **16,2 s** + cartel **2,5 s** + parte 2
  **15,9 s** + cierre **4,0 s**. Solución + cierre = 19,9 s de 38,6 s (51,6 %). Un proyecto 3D con gen.mjs (T1/T2).
- **Cartel:** el time card de siempre: **"Una tienda" / "online" / "más tarde…"**. Se reusa la toma de Rasalgethi "Una
  tienda online más tarde." (`reels/hacen-envios/assets/voice/narrador.wav`, que a su vez es la de
  `reels/las-siete-y-cincuenta-y-nueve`). Generar nueva solo si no encaja.
- **Rubén NO aparece** (no es distribuidora). Del elenco: Graciela (la clienta, por audio y en su living) y Walter
  (cliente del local en Q1, sin voz).
- **Quién dice "Comentá STOCK": Paola**, a su propio celular en modo historia (callback de "¡Ingreso nuevo!"), como
  Rubén a cámara en `dist-pedidos-lunes` y `dist-cliente-grande`. Alternativa si el coordinador prefiere la línea de
  siempre: Sofi en el celular parado (`ELENCO.sofi`, Achernar, "Comentá STOCK y te mando cómo funciona para tu
  importadora.").
- **Palabra: STOCK** (propuesta en lugar de TIENDA): engancha con el gancho "¿Tenés stock?", con la portada y con lo que
  duele; la descripción aclara que es la tienda online.

## Paleta y set (para "Hechos")
**Dos sets. (1) NUEVO: el depósito-showroom de "Casa Pao · Importados", lunes de mañana: un galpón chico de ciudad con
piso de hormigón alisado gris cálido `#8a877c` mate (placas grandes, juntas finas, sin reflejos); pared del fondo de
bloque visto pintado blanco `#f7f7f2` (bloques en relieve muy bajo) con una franja navy `#0b1220` de 60 cm a 2 m de
altura y encima, pintado a mano en crema, "CASA PAO · IMPORTADOS"; tubos fluorescentes de depósito (luz blanca pareja
desde arriba) y el **aro de luz** de la mesa de fotos como luz práctica cálida. Lo que manda en cuadro: **las paredes de
cajas de cartón kraft `#c49a6c`** del contenedor (cajas de 45 × 40 × 40 cm, cinta de embalar marrón clara, etiquetas
crema con "FREIDORA DE AIRE 4 L" en navy, una franja de color por caja: verde menta `#8fc7a0`, azul navy3, crema) y
estanterías de ángulo ranurado navy3 `#1f3254`. Al frente, el localcito: una puerta abierta con cortina de enrollar
navy a medio subir y un mostrador chico crema con la tablet del local. (2) NUEVO: el living de Graciela: sillón navy2
`#16243d`, manta tejida crema, mesita baja de madera clara `#c9a774`, una ventana con cortina crema lisa, cuadro chico
de líneas. ** Distinto del galpón de chapa del corralón (navy, cielo de amanecer), el depósito con pallets de Rubén
(estanterías altas, oficina vidriada), la oficina de ladrillo crema de la inmobiliaria, el consultorio verde, el estudio
de pilates, el taller y la parrilla. Anotar en "Hechos": "depósito-showroom de importadora con paredes de cajas kraft,
bloque blanco con franja navy, piso de hormigón gris cálido, mesa de fotos con rollo de papel crema y aro de luz; living
de Graciela con sillón navy2; parte 2 con interfaz recreada (catálogo con stock por color, checkout con envío, pedido
pago en la tablet, panel de stock único); cartel verde".
- **El "verde" del producto NO es el verde de marca:** las freidoras verdes son verde menta apagado `#8fc7a0` (y sus
  cajas, franja `#8fc7a0`), para que el verde `#5ce611` quede solo para lo resuelto y el recuadro de los subtítulos.
- **Texto en pantalla:** navy sobre crema, crema sobre navy. "IMPORTADORAS" del cuadro 0 en caja navy con el recuadro
  verde de selección (el fondo es claro: cajas kraft y pared blanca).
- **Rojo apagado `#c7655b` SOLO para el problema:** "Vendida dos veces", "Venta perdida: $ 4.990", "Reintegro $ 4.990"
  en el chat, "40 verdes sin cargar", "$ 199.600 parados desde marzo", el "1" del cuaderno tachado. **Verde `#5ce611`
  para lo resuelto:** "Pagado ✓", "Listo para despachar ✓", "Queda 1" (chip), "Quedan 40", "12 pedidos pagos ✓",
  "Ventas dobles: 0", "Cajas sin cargar: 0", el recuadro de selección de los subtítulos. "Sin stock" de la parte 2 va en
  gris navy `#5a6478` (es la tienda diciendo la verdad, no un problema).
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  **Las de Graciela en la parte 1 son audios de chat**: salen del celular de Paola (en el trípode de la mesa de fotos),
  con una onda de audio chica y la etiqueta "Graciela". En la parte 2, "¡Pao! La verde la vendí en el local." en el MISMO
  lugar y tamaño que en P3, y "¡Hola! ¡Ingreso nuevo!" en el mismo marco de historia que en P8, para que se lea el
  callback.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "IMPORTADORAS" en el cuadro 0):
  "Lunes, 10:00." en P1, "Otro lunes." en Q1, "Llegó el contenedor." en Q4.

## Personajes (copia local de `reels/inmobiliaria-visitas/assets/personajes.js`; agregar a ELENCO, mismo estilo, solo parámetros y peinados que ya existen)
- **Paola · `ELENCO.paola`** (dueña de Casa Pao, ~38, voz **Autonoe**). `piel: PIEL.media`, `pelo: 0x2a1a12` (morocha),
  `peinado: "rodete"` alto (Marta y Mariana también usan rodete, pero son morenas y de pelo negro azabache; Paola es piel
  media, más joven, con el buzo verde: que no se parezca a ninguna; si se parece, `"mediaCola"` oscura). `cejasColor: 0x22160f, pestanas: 0x1a1414, cuelloFino: true`,
  **buzo canguro verde de marca `MARCA.g`** (la única que viste verde de marca: es la vendedora; así se la reconoce en el
  feed) con `cuello: MARCA.g`, `pantalon: MARCA.navy2` (jean oscuro), `zapatos: MARCA.cr` (zapatillas), `aros: MARCA.cr`,
  `labiosPegados: true, labios: 0xa8524f, mejillas: 0xd08470, panza: 1.0, nariz: 0.048, alto: 1.0`. Siempre con el
  celular en la mano (a la altura del pecho, nunca en la oreja). Expresión: `sonrisa` segura en P2, cara quieta de nada en
  P3-P4, `incredula` leve en P6, ojos entrecerrados secos en P7, **`sonrisa` grande de historia en P8** (el cambio de cara
  es el chiste); en la parte 2, relajada.
- **Mica · `ELENCO.mica`** (depósito y local, ~23, voz **Zephyr**). `piel: PIEL.clara`, `pelo: 0x8a5a34` (castaño claro),
  `peinado: "coleta"` baja, `cejasColor: 0x6a4428, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true`, remera navy3
  con `cuello: MARCA.cr`, **chaleco de depósito crema** `campera: { color: MARCA.cr2, cuello: MARCA.cr2, cierre: MARCA.navy3,
  abierta: true }`, `pantalon: 0x3a3f4a`, `zapatos: MARCA.navy`, un **cúter navy** colgado del bolsillo (sin hoja visible),
  `labiosPegados: true, labios: 0xb35a5a, mejillas: 0xe8968a, panza: 0.96, nariz: 0.045, alto: 0.95`. Contenta y orgullosa
  de vender, nunca tonta: hizo lo que el cuaderno le dejó hacer.
- **Graciela = `ELENCO.clienta`** (rulos lila, lentes, cárdigan verde; voz Gacrux). En la parte 1 solo por audio (la
  burbuja y su nombre en el chat; si el plano lo pide, un inserto de ella en su living con el celular a la altura del
  pecho). En Q2, sentada en su sillón con el celular a la altura del pecho, nunca en la oreja.
- **Walter = `ELENCO.walter`** (si existe en el módulo; si no, un DEFECTO de pelo canoso y campera crema), cliente del
  local en Q1, sin voz: recibe la caja verde y saluda con la mano levantada.

## Objetos 3D (específicos, que nadie confunda el depósito con un corralón ni una distribuidora)
- **La freidora de aire (EL objeto del reel):** cuerpo redondeado tipo "huevo cortado" (RoundedBox alto con radio
  grande o lathe), ~32 cm de alto, color verde menta `#8fc7a0` mate con la parte de arriba navy; **cajón-canasto al
  frente** con su manija horizontal crema que sobresale (la clave para que se lea "freidora de aire" y no "cafetera"),
  **perilla redonda de temperatura** y una de tiempo arriba al frente con marcas, rejilla de ventilación atrás (ranuras),
  patitas. Que nadie la confunda con una olla: la manija del cajón se ve SIEMPRE de frente o 3/4.
- **Las cajas del contenedor:** cajas kraft `#c49a6c` con cinta marrón clara, etiqueta crema "FREIDORA DE AIRE 4 L" en
  navy (Lexend 800), el dibujito de la freidora en líneas navy y una franja de color (verde menta / navy3 / crema) que
  dice el color: "VERDE", "AZUL", "CREMA". Paredes de 4-5 cajas de alto; algunas con "CONT. MARZO" en marcador navy.
- **La mesa de fotos (EL objeto del remate):** un rollo de papel fotográfico crema `#efeee5` colgado de un soporte de dos
  patas navy, que baja en curva ("sin fin") y cubre por completo la "mesa" hasta el piso; arriba, la freidora verde de
  muestra y una plantita chica de utilería; al lado, el **aro de luz** en su pie (anillo crema emisivo cálido, con el
  celular de Paola sujeto en el centro). En P6 Mica levanta el papel desde abajo (se enrolla hacia arriba, función del
  tiempo) y aparecen **8 cajas VERDE apiladas en 2 × 2 × 2** haciendo de mesa, con "CONT. MARZO". En la parte 2, la mesa de
  fotos es **una mesa de verdad, con patas**, y el papel ya no llega al piso.
- **El cuaderno del stock:** cuaderno de espiral tamaño carta colgado de un clavo con un hilo, abierto, letra Caveat
  navy: "VERDE: ~~3~~ ~~2~~ 1", "AZUL: ¿?", "CREMA: 4". En la pausa, el "1" se marca con un círculo rojo apagado.
- **El celular de Paola:** funda verde de marca (combina con su buzo), en el aro de luz en P1-P2, en la mano en P4-P8.
  Pantalla: chat con Graciela (audio, "Pagado ✓ $ 4.990" y después "Reintegro $ 4.990" en rojo apagado) y, en P8, marco
  de historia genérico (barras arriba, círculo de grabar abajo, sin logos).
- **El local:** mostrador chico crema con la **tablet del local** en su soporte (parte 2: "Venta en el local · Verde −1");
  la cortina de enrollar navy a medio subir; detrás, un estante con tres freidoras exhibidas (una de cada color).
- **El living de Graciela:** sillón navy2, manta crema, mesita con una taza navy.
- **La tablet de Paola (parte 2):** en un atril sobre una pila de cajas al lado de la mesa de fotos.
- **El lector de código de Mica (Q4):** pistola lectora navy con gatillo crema, sin cable; un destello verde de marca al
  leer cada caja.
- **Impresora de etiquetas (Q3):** caja crema chica que escupe una etiqueta crema "ENVÍO · Graciela · Pagado ✓".

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final; celular/tablet ≥ 60 % del cuadro en los insertos)
**Parte 1 · el chat de Paola con Graciela:** audio de Graciela (onda) · "Pagado ✓ · $ 4.990 · Freidora verde" · después
"Reintegro · $ 4.990" (rojo apagado) y el audio de vuelta de Graciela.
**Parte 1 · rótulos de la pausa (P5 y P7):** caja navy, texto crema, línea guía: al hueco de la mesa de fotos,
**"Vendida dos veces"** (rojo apagado); al celular, **"Venta perdida: $ 4.990"** (rojo apagado). En P7, a las cajas:
**"40 verdes sin cargar"** y **"$ 199.600 parados desde marzo"** (rojo apagado).
**Parte 2 · Q1 · el catálogo** (inserto de la tablet del local y del celular; encabezado navy "Casa Pao · Importados",
fondo crema): tarjeta "Freidora de aire 4 L · $ 4.990" con tres chips de color: **Verde · "Quedan 2" → "Queda 1"**
(chip verde de marca), Azul · "Quedan 25", Crema · "Quedan 4". Rótulo HTML: **"El stock real, a la vista"**.
**Parte 2 · Q2 · la compra de Graciela:** "Verde · Queda 1" → botón **"Comprar"** → "¿Cómo lo recibís?" con **"Envío a
domicilio · $ 190"** (elegido) / "Retiro en el local · $ 0" → "Total $ 5.180" → **"Pagar con tarjeta o débito"** →
**"Pagado ✓"** · y el catálogo: **Verde · "Sin stock"** (gris, sola) con el botón "Avisarme cuando vuelva". Rótulo:
**"Ve, paga y elige el envío. Sin preguntar."**
**Parte 2 · Q3 · el pedido en la tablet de Paola:** "Pedido #214 · Graciela · Freidora 4 L verde · Pagado ✓ · Envío a
domicilio" · **"Listo para despachar ✓"** · botón "Imprimir etiqueta". Abajo, entra **"Pedido por mayor · Bazar del
Puerto · 10 azules"** y el stock: **"Azul: 25 → 15"**. Rótulo: **"Un solo stock: tienda, local y por mayor"**.
**Parte 2 · Q4 · el ingreso:** en la tablet, "Ingreso · Contenedor" con el contador **"Verde: 0 → 40"** (sube con cada
lectura) · el catálogo: **"Sin stock" → "Quedan 40"** · "Les avisamos a 12 que esperaban" · 12 notificaciones
**"Pedido pagado ✓"** apiladas en el celular de Paola · contador **"Quedan 40 → 28"**. Rótulo: **"Avisa sola cuando
vuelve"**.
**Capa HTML del cierre:** "Comentá **STOCK**" grande (Lexend 900, ~150 px, STOCK en el recuadro verde); el panel chico
detrás en verde: "Ventas dobles: 0" · "Cajas sin cargar: 0"; en los últimos 1,3 s, abajo chico: "Tu tienda online con el
stock real" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-16,20 s)
Eje del depósito: la mesa de fotos al centro con el aro de luz a la izquierda, la pared de cajas detrás, el cuaderno
colgado a la derecha de la mesa, la puerta al local a la derecha del cuadro.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,00 | **P1 · cuadro 0.** Plano medio desde atrás del aro de luz, a la altura de la mesa: la freidora verde grande en la mesa de fotos (primer término), Paola detrás sacándole la foto con el celular en el aro, la pared de cajas al fondo. Push-in lento. | **Cuadro 0:** arriba, **"IMPORTADORAS"** (Lexend 900, ~130 px, crema en caja navy, con el recuadro verde de selección); chip "Lunes, 10:00." · 0,25-1,85 · **Graciela (audio): "Pao, ¿tenés stock de la verde?"** (burbuja desde el celular, con onda de audio). | depósito, cajas, mesa de fotos con papel, aro de luz, freidora verde, celular, Paola | ambiente de depósito (fluorescente, calle lejana) · click de foto 0,1 · whoosh-short del audio que entra 0,2 |
| 2,00-3,80 | **P2 · el cuaderno.** Paneo corto a la derecha: el cuaderno colgado del clavo, "VERDE: ~~3~~ ~~2~~ 1" en primer término, Paola de 3/4 detrás, segura. | 2,05-3,60 · **Paola: "¡Sí! La última. Hoy te la mando."** · 3,65 · en el celular: **"Pagado ✓ · $ 4.990"**. | cuaderno, Paola, celular | pop del chat · notification 3,65 |
| 3,80-5,90 | **P3 · se va la verde.** Plano general de la mesa: Mica entra por la puerta del local, levanta la freidora verde de la mesa con las dos manos y se va con ella; el aro de luz queda iluminando el hueco. | 4,10-5,70 · **Mica: "¡Pao! La verde la vendí en el local."** (orgullosa, sin frenar) | Mica, freidora verde, mesa vacía, aro de luz, puerta | pasos de Mica · roce de la caja · campanita lejana del local 5,6 |
| 5,90-8,00 | **P4 · la devolución.** Primer plano de Paola de frente con el celular a la altura del pecho; detrás, desenfocado, el aro iluminando el hueco. | 6,10-7,80 · **Paola: "Graciela, perdoname: se me agotó."** · en el chat: "Reintegro · $ 4.990" (rojo apagado). | Paola, celular | tecleo suave |
| 8,00-10,20 | **P5 · la pérdida.** Inserto del celular (≥ 50 %) y vuelta al plano del hueco iluminado. | 8,15-10,00 · **Graciela (audio): "Ay. Bueno, la compro en otro lado."** · 10,0 · rótulos: al hueco **"Vendida dos veces"**, al celular **"Venta perdida: $ 4.990"** (rojo apagado). La música baja a -12 dB. | celular, mesa con el hueco | pop chico por rótulo |
| 10,20-12,70 | **P6 · el remate.** Plano bajo, desde el piso, de la mesa de fotos: Mica vuelve con un rollo de papel nuevo bajo el brazo, se agacha y levanta el papel viejo desde abajo: se enrolla hacia arriba y aparecen las 8 cajas VERDE apiladas, "CONT. MARZO". Paola entra al cuadro arriba. | 10,40-11,20 · el papel sube · 11,30-12,40 · **Mica: "Pao. ¿Y estas cajas?"** (sincera, curiosa) | mesa de fotos, papel, cajas verdes, Mica, Paola | roce de papel que se enrolla 10,4 · golpe sordo chico 11,2 |
| 12,70-14,30 | **P7 · la confesión.** Primer plano de Paola de frente, cara de nada; corte rápido (13,7) a la pared del fondo, que la cámara recorre: muchas más cajas con la franja verde. | 12,80-14,10 · **Paola: "Del contenedor de marzo."** (seca) · 13,9 · rótulos a las cajas: **"40 verdes sin cargar"** / **"$ 199.600 parados desde marzo"** (rojo apagado). | Paola, pared de cajas verdes | silencio de depósito + zumbido del fluorescente · whoosh-short 13,7 |
| 14,30-16,20 | **P8 · remate del remate.** Plano medio de Paola: sin pestañear, levanta el celular en vertical frente a la cara (a la altura del pecho/mentón, sin tocar la cara), sonrisa de historia; contraplano corto desde el celular: marco de historia, ella con las cajas detrás. | 14,60-15,80 · **Paola: "¡Hola! ¡Ingreso nuevo!"** (cambio de cara y de voz: alegre de redes) · 16,10 stinger. | Paola, celular en modo historia, cajas | click de grabar 14,5 · stinger 16,10 |

## CARTEL (16,20-18,70 s)
Time card de dibujito de siempre: **"Una tienda" / "online" / "más tarde…"**. Narrador Rasalgethi (toma reusada).
Nunca "Scalerics".

## PARTE 2 · resuelto (18,70-38,60 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,70-22,60 | **Q1 · la venta del local.** Chip "Otro lunes." El local: Mica le da a Walter una caja verde por arriba del mostrador; en la tablet del local, "Venta en el local · Verde −1". 20,5 · travelling al depósito: Paola sacando fotos en la mesa (ahora con patas), sin levantar la vista. 21,0 · inserto del catálogo ≥ 60 %. | 18,90-20,50 · **Mica: "¡Pao! La verde la vendí en el local."** (el MISMO audio de P3) · 20,70-21,90 · **Paola: "Ya lo sabe la tienda."** · el chip Verde baja solo: "Quedan 2" → **"Queda 1"**. Rótulo: "El stock real, a la vista". | mostrador, tablet del local, Mica, Walter, caja verde, Paola, mesa de fotos con patas | campanita del local · click-soft de la tablet · whoosh-short del travelling · tic del número |
| 22,60-26,40 | **Q2 · Graciela compra sola.** Su living: Graciela en el sillón con el celular a la altura del pecho. 22,9 · inserto ≥ 60 %. | 22,90-24,00 · **Graciela: "Queda una. ¡Mía!"** · toca "Comprar" → "Envío a domicilio · $ 190" → "Pagar" → **"Pagado ✓"** (25,6) · 26,0 · en el catálogo, Verde: **"Sin stock"** sola. Rótulo: "Ve, paga y elige el envío. Sin preguntar." | living, sillón, Graciela, celular | click-soft por toque · ding 25,6 · tic chico en "Sin stock" |
| 26,40-29,80 | **Q3 · el pedido llega pago.** El depósito: la tablet de Paola en su atril (inserto ≥ 60 %): "Pedido #214 · Graciela · Pagado ✓ · Envío a domicilio · **Listo para despachar ✓**"; la impresora escupe la etiqueta y Mica la pega en una caja verde. 28,4 · entra "Pedido por mayor · Bazar del Puerto · 10 azules" y "Azul: 25 → 15". | Rótulo: "Un solo stock: tienda, local y por mayor". | tablet, impresora de etiquetas, Mica, caja verde, estantería azul | notification 26,6 · impresora 27,3 · cinta de embalar 27,9 · ding 28,5 |
| 29,80-34,60 | **Q4 · callback.** Chip "Llegó el contenedor." Mica pasa la pistola lectora por las cajas verdes que entran al depósito (destello verde por caja): "Verde: 0 → 40". El catálogo: "Sin stock" → **"Quedan 40"**. 30,9 · Paola levanta el celular en modo historia, en el mismo encuadre que P8. | 31,00-32,20 · **Paola: "¡Hola! ¡Ingreso nuevo!"** (el MISMO audio de P8) · 32,2-33,4 · le llueven 12 notificaciones "Pedido pagado ✓" apiladas; "Les avisamos a 12 que esperaban"; contador **"Quedan 40 → 28"** · 33,50-34,40 · Paola baja el celular: **"Ya se enteraron."** Rótulo: "Avisa sola cuando vuelve". | cajas verdes, pistola lectora, Mica, Paola, celular | bip de lector por caja · click de grabar · notification ×12 escalonadas (suaves) · tic del contador |
| 34,60-38,60 | **Q5 · cierre.** Paola en la mesa de fotos (con patas), la freidora verde al lado, el aro de luz; graba su historia; plano desde el celular en el aro (ella de frente, grande). | 34,80-37,90 · **Paola: "Comentá STOCK y te mando cómo funciona para tu importadora."** · en "STOCK" entra grande **"Comentá STOCK"** (capa HTML) · el panel chico: "Ventas dobles: 0" · "Cajas sin cargar: 0" · 37,30 · línea chica: "Tu tienda online con el stock real" / "scalerics.com". | Paola, aro de luz, mesa de fotos, freidora verde | pop en "STOCK" · final de la música |

**Si las tomas reales hacen pasar el reel de ~40 s**, recortar en este orden: (1) Q3 sin el pedido por mayor (-1,0 s;
el "Un solo stock" va en Q1 con la tablet del local); (2) Q1 sin el travelling (corte directo al inserto, -0,5 s);
(3) P7 sin el recorrido de la pared (-0,4 s). Nunca recortar la pausita antes de "Del contenedor de marzo." ni el cambio
de cara antes de "¡Ingreso nuevo!".

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "IMPORTADORAS" entero y legible; la freidora verde grande y reconocible (manija del cajón de frente), el
  aro de luz, las cajas y Paola en el mismo cuadro. Que se lea "importadora que vende por redes" y no "cocina".
- **La mesa de fotos:** en TODA la parte 1 el papel cubre la mesa hasta el piso (nada de cajas asomando antes de P6); el
  papel sube sin atravesar a Mica; las 8 cajas debajo con "VERDE" y "CONT. MARZO" legibles. En la parte 2, mesa con patas.
- **El cuaderno:** "VERDE: 1" legible en P2 (Caveat navy ≥ 48 px en cuadro).
- **Manos:** nadie se toca la cara; el celular de Paola a la altura del pecho o en el aro (en P8 y Q4, delante del
  pecho/mentón, sin tocar la cara); Mica agarra la freidora con las dos manos sin atravesarla.
- **Continuidad:** Paola con el buzo verde y el celular de funda verde; Mica con el chaleco crema y la coleta; la
  freidora verde menta `#8fc7a0` (nunca verde de marca); el hueco iluminado de P3 a P5.
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin logos ni colores de redes,
  marketplaces ni procesadoras de pago; ✓ verdes; "Sin stock" gris; rojos solo en la parte 1.

## Portada (portada.json)
`t` y `fondo_limpio` pendientes. Plano propio "portada" (VER=portada en tres.js, LIMPIO=1): en la mitad de arriba, Paola
de frente detrás de la mesa de fotos con el celular en la mano y cara de "¿y ahora?", el aro de luz iluminando el hueco
vacío y, abajo, el papel levantado a medias con las cajas VERDE asomando; la pared de cajas detrás. `chica`: "Lunes,
10:00." · `grande`: **"¿Tenés stock?"** · `sello`: "IMPORTADORAS". Alternativa de `grande`: "¿Y estas cajas?".
