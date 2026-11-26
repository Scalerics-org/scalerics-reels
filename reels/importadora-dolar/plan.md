# importadora-dolar · plan plano por plano · IMPORTADORAS, dolor + solución (3D real), ~41,4 s

**De qué trata.** Lunes 9:00, entra el verano. El depósito de "Casa Pao · Importados", que ahora le vende por mayor a
comercios. Seba, el vendedor, entra por el portón con el celular en alto; detrás, en el patio, el contenedor de 20 pies
con las puertas abiertas y vacío: **"¡Pao! ¡Vendimos todo el contenedor!"** Paola: **"¡Vamos! ¿A cuánto?"** / Seba
señala la lista pegada con cinta en la columna, "LISTA DE PRECIOS · JULIO": **"A lista. Mil novecientos cincuenta."**
Mica trae la proforma: **"Pao, llegó la factura del contenedor nuevo."** (USD 46 por ventilador). Paola va al pizarrón,
borra el "DÓLAR: 40" y escribe "43"; la calculadora: reponer cuesta $ 989.000 y se cobraron $ 975.000; el contenedor nuevo
se llena con lo cobrado y quedan 8 huecos rojos: 492 de 500. **Remate:** **"Vendimos todo. Y perdimos plata."** (el
ventilador de muestra se frena solo). **Remate del remate:** Seba, feliz, otra vez en el portón: **"¡Pao! ¡Graciela quiere
doscientos más!"** / pausa / Paola, sin darse vuelta, levanta la mano: **"Seba. Por favor. Dejá de vender."** Cartel
**"Un sistema más tarde…"**. Parte 2: el mismo lunes, el mismo "¡Vendimos todo el contenedor!" y "¿A cuánto?" → **"Al de
hoy. Dos mil quinientos treinta."** (el catálogo en el celular de Seba con "Precio de hoy ✓"); Mica con la misma factura →
**"Ya está cargada."** (el panel: costo USD 46, dólar 43, margen 28 %, "Recalculado solo"); el contenedor se llena entero:
**"Vendimos todo. Y ganamos plata."**; Seba: **"¡Graciela quiere doscientos más! ¿Le hago un diez?"**, el celular marca
"−10 %: debajo del margen mínimo" en rojo, lo baja a −5 % ✓: **"…Le hago un cinco."** / Paola: **"Vendé, Seba. Vendé."**
Cierre: Paola a cámara: **"Comentá DÓLAR y te mando cómo funciona para tu importadora."**

- **Producto: sistema a medida de lista de precios atada al costo en dólares.** Cada producto con su costo en USD (el de
  la proforma) y su margen; cambia el dólar o se carga la proforma de un contenedor y los precios en pesos se recalculan
  solos; el vendedor en el celular y el catálogo del cliente ven siempre el precio de hoy; aviso cuando un precio o un
  descuento queda por debajo del margen mínimo. Se ve funcionando en la parte 2 y se nombra en la línea chica final y en
  `descripcion.txt`. El cartel nunca dice "Scalerics". **No es agente de IA:** no se lo llama así.
- **Sin marcas:** "Casa Pao · Importados" y "Bazar Graciela" son inventados. Contenedor navy liso (sin naviera ni
  código real; si lleva código, uno inventado tipo "CPIU 204518 · 20'"), cajas kraft "VENTILADOR DE PIE 16"", ventilador
  genérico, calculadora, pizarrón, tablet, celulares y chat genéricos (burbujas crema/navy, sin el verde ni el logo de
  ninguna app). Ningún banco, casa de cambio ni fuente de cotización.
- **Sin datos de afuera** (ver `fuentes.md`): el dólar 40 → 43 es un número redondo escrito a mano en el pizarrón, sin
  fecha ni fuente. Todos los montos son del caso.
- **Estructura:** parte 1 **16,4 s** (dolor) + cartel **2,4 s** + parte 2 **18,6 s** (solución) + cierre **4,0 s**.
  Solución + cierre = 22,6 s de 41,4 s (55 %). Si las tomas alargan la parte 1, se recorta el montaje P5 (mínimo 1,8 s) y
  las pausas, nunca la parte 2. Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, como dist-comisiones y
  tienda-tenes-stock.
- **Cartel:** el time card de siempre: **"Un sistema" / "más tarde…"**. Audio REUSADO de
  `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde."), atempo si pasa de 2,4 s.
- **Quién dice "Comentá DÓLAR": Paola**, a cámara (de dueña a dueño, "te mando" en singular). En tienda-tenes-stock
  cerró en modo historia; acá a cámara directa, sin celular, para no repetir.
- **La palabra: DÓLAR** (una, mayúsculas, con tilde). Es la que un importador escribe sin pensar y la que le duele;
  alternativa si el coordinador la ve ambigua (que alguien comente "dólar" por la cotización): **PRECIOS**. En pantalla,
  en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Seba vende de buena fe con la lista que le dieron (y en la parte 2 el celular le frena el
  descuento sin que nadie lo rete); Graciela compra al precio que le pasaron; Paola se ríe de sí misma ("Dejá de
  vender" es lo que todo importador pensó el día que saltó el dólar). El chiste es contra la lista en papel que no se
  entera del dólar, no contra nadie.

## Paleta y set (para "Hechos")
**Set: el depósito de Casa Pao · Importados visto desde ADENTRO hacia el PORTÓN ABIERTO, con el contenedor en el patio**
(lo nuevo respecto de tienda-tenes-stock, que era la mesa de fotos y la pared de cajas: acá manda el portón y el
contenedor; nada del aro de luz). Piso de hormigón alisado gris cálido `#8a877c` mate, pared de bloque pintada blanco
`#f7f7f2` con la franja navy y "CASA PAO · IMPORTADOS" en crema (continuidad con tienda-tenes-stock). El **portón
corredizo de chapa** navy3 abierto de par en par, luz de mañana de verano entrando (cálida, pareja; sin degradés
suaves de fondo: el cielo del patio es un crema liso). En el patio, sobre un **chasis de camión** gris oscuro, el
**contenedor de 20 pies**. Adentro: la **mesa de despacho** (tablón crema sobre caballetes navy) con el celular de Paola,
la calculadora, rollo de cinta de embalar y remitos; **la columna de hormigón** con la lista pegada con cinta; **el
pizarrón blanco** con marco de aluminio colgado al lado ("DÓLAR: 40" a marcador navy, "julio" chiquito abajo); el
**ventilador de pie de muestra** armado al lado de la mesa (gira); estanterías de ángulo ranurado navy3 casi vacías (se
vendió todo) con dos o tres cajas sueltas.
- Fondo: **crema y blanco de depósito con navy3 y el contenedor navy `#16243d`** (el reel anterior del rubro fue navy
  con aro de luz; dist-comisiones fue oficina navy): este va de día y de patio, claro. Los textos blancos nunca sobre el
  piso o la pared clara: rótulos en caja navy.
- **Rojo apagado `#c7655b` SOLO para el problema:** "LISTA · JULIO" (la palabra JULIO), el "40" tachado del pizarrón, los
  8 huecos del contenedor, "492 de 500", "− $ 14.000", "−10 % · Debajo del margen mínimo". **Verde `#5ce611` para lo
  resuelto:** "Precio de hoy ✓", "Recalculado solo ✓", "500 de 500 ✓", "+ $ 276.000", "−5 % · $ 2.404 ✓", la tarjeta
  DÓLAR, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. "Vendimos todo. Y ganamos plata." en el MISMO lugar y tamaño que "Vendimos todo. Y perdimos plata."; y
  "Vendé, Seba. Vendé." en el mismo lugar que "Seba. Por favor. Dejá de vender." (que se lea el callback).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "IMPORTADORAS" en el cuadro 0):
  "Lunes, 9:00." (P1) · "Lunes, 9:05." (P4) · "Lunes, 9:00." (Q1). Nada más: es una sola mañana.

## Personajes
Copia local del `personajes.js` de `reels/tienda-tenes-stock` (Paola y Mica se arman en su `tres.js` con DEFECTO + los
parámetros de su plan: pasarlos al módulo como `ELENCO.paola` y `ELENCO.mica` si no están). Rubén NO aparece.
- **Paola = `ELENCO.paola`** (dueña, ~38): mismos parámetros que en tienda-tenes-stock, **buzo canguro verde de marca**.
  Voz **Aoede**. P1-P3 sonrisa grande de festejo (puño en alto en P2); P5 cara quieta, el marcador en la mano; P6 seca,
  ojos entrecerrados (el remate); P7b de espaldas o de 3/4, la mano levantada sin mirar (el remate del remate es el
  gesto). Parte 2 relajada; Q4b ni levanta la vista del panel; Q7 la mano levantada igual que en P7b, ahora con sonrisa.
  El celular a la altura del pecho, nunca en la oreja.
- **Mica = `ELENCO.mica`** (depósito, ~23), chaleco crema y cúter colgado: trae la proforma (hoja A4 crema en un sobre
  navy). Voz **Zephyr**. Seria pero no dramática: es un trámite.
- **Seba = personaje NUEVO** (`ELENCO.seba`, mismo estilo): vendedor de calle de la importadora, ~28, piel trigueña,
  pelo negro corto con **rulos chicos arriba** (peinado existente más parecido: "texturado" alto; que no se confunda con
  Nico, que es trigueño de pelo corto liso, ni con Joaco), sin barba, **camisa crema de manga corta** con cuello navy,
  pantalón navy2, zapatillas crema, **riñonera navy cruzada** y el celular siempre en alto. Entusiasta de buena fe.
  Voz **Umbriel** (alternativa Sadaltager). Si el módulo no tiene rulos, `"texturado"` con `texturaAlto: 1`.
- **Graciela = `ELENCO.clienta`**: sin voz. Solo su avatar redondo y "Bazar Graciela" en el chat del celular de Seba (P7a,
  Q6). Si el plano lo pide, nada más.
- Extras sin voz: ninguno (el patio vacío ayuda a "vendimos todo").

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados:** el depósito de Casa Pao (pared, piso, franja, estanterías, cajas kraft) de `reels/tienda-tenes-stock`;
`crearCelular` (pantalla canvas), calculadora (de dist-comisiones, sin rollo), tablet/monitor con pantalla canvas;
cartel time card (ya-lo-cargo / dist-comisiones).

**Nuevos** (específicos, que nadie confunda el lugar con una distribuidora ni un corralón):
- **El contenedor de 20 pies (EL objeto del reel):** caja de chapa corrugada navy `#16243d` (corrugado en relieve
  marcado, no líneas finas), puertas dobles abiertas con las **cuatro barras de cierre verticales** y manijas crema, las
  esquineras en navy3, sobre un chasis de camión gris oscuro con ruedas. En P1 vacío (se ve el piso de madera del
  contenedor). En P5 es "el contenedor nuevo": la cámara entra de frente a las puertas abiertas y las cajas kraft entran
  apiladas en grilla (función del tiempo, con pop) hasta 492; quedan **8 huecos** marcados con contorno rojo apagado
  arriba a la derecha y el rótulo "492 de 500". En Q5 el mismo encuadre: entran las 500, "500 de 500 ✓" verde. Que el
  contenedor llene ≥ 65 % del ancho; el número arriba, limpio.
- **El ventilador de pie de muestra:** base redonda navy, caño crema, motor navy, **jaula de alambre gruesa** (≥ 6 px en
  cuadro) y aspas crema que giran (ángulo = función del tiempo). En P6 se frena solo (velocidad que cae a 0 en 1,2 s, sin
  saltos) y la cabeza baja apenas; en la parte 2 gira siempre. Ojo: que la jaula no atraviese a Paola.
- **La lista pegada en la columna:** hoja A4 crema con dos tiras de cinta de embalar, "LISTA DE PRECIOS" navy y
  **"JULIO"** rojo apagado, filas: "Ventilador de pie 16" · $ 1.950" resaltada, "Ventilador de techo · $ 3.900", "Caloventor
  · $ 1.290" (texto ≥ 40 px en el inserto). En la parte 2 la columna tiene la tablet con el catálogo (o nada: la lista no
  está).
- **El pizarrón blanco** con marco de aluminio: "DÓLAR:" y el número a marcador navy (trazo gordo, Lexend 900 o mano);
  en P5 la mano de Paola borra el 40 (queda una mancha gris) y escribe "43" (aparece trazo por trazo). En la parte 2 el
  pizarrón dice "Lunes: despachar Bazar Graciela" (ya no se usa para el dólar).
- **La proforma:** hoja A4 crema con encabezado navy "PROFORMA", "500 × Ventilador de pie 16"", "USD 46 c/u", "Total USD
  23.000" (inserto ≥ 55 % del cuadro, en la mano de Mica, levemente curvada).
- **La calculadora de escritorio** grande (P5): "23.000 × 43 =" y el visor que llega a **989.000**; al lado, en un rótulo,
  "Cobramos: 500 × 1.950 = 975.000".

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Números del caso (coherentes en todo el reel; ver `fuentes.md`):**
| | parte 1 (lista de julio) | parte 2 (sistema) |
|---|---|---|
| costo por ventilador | USD 38 × 40 = $ 1.520 (el de julio) | USD 46 × 43 = $ 1.978 (proforma nueva) |
| margen | 28 % (sobre el costo de julio) | 28 % · mínimo 18 % ($ 2.334) |
| precio | **$ 1.950** | **$ 2.530** |
| 500 vendidos | $ 975.000 | $ 1.265.000 |
| reponer 500 (USD 23.000 × 43) | $ 989.000 → **− $ 14.000**, **492 de 500** | $ 989.000 → **+ $ 276.000**, **500 de 500 ✓** |
| Graciela, 200 más | a $ 1.950 (lo que la frena Paola) | −10 % = $ 2.277 ✗ (debajo del mínimo) · −5 % = **$ 2.404 ✓** |

**El celular de Seba, parte 1 (P1, P7a):** chat genérico con burbujas "Confirmado ✓" de varios comercios ("Bazar
Graciela", "Ferretería Sur", "Casa Lilián"), contador "500 / 500"; en P7a entra "Bazar Graciela: ¡Mandame 200 más!".
**El celular de Seba, parte 2 (Q3, inserto a pantalla llena):** encabezado navy "Casa Pao · Mayorista"; foto 3D/ícono del
ventilador; **"Ventilador de pie 16""**; **"$ 2.530"** grande; chip verde **"Precio de hoy ✓"**; abajo "Actualizado hoy,
9:00". Rótulo HTML: **"El vendedor ve el precio de hoy"**.
**El panel de Paola (Q4b, tablet en la mesa, inserto ≥ 60 %):** "Precios · Casa Pao"; fila del ventilador: **"Costo: USD
46 · Proforma contenedor nuevo ✓"** · **"Dólar: 43"** · **"Margen: 28 %"** · **"Precio: $ 2.530 ✓"**; banda verde
**"Recalculado solo · 38 productos"**; los otros dos productos con su precio nuevo (techo, caloventor). Rótulo **"Cambia
el dólar o el costo: la lista se recalcula sola"**.
**El celular de Seba (Q6-Q6b):** el pedido de Bazar Graciela "200 × Ventilador de pie 16"" con un control de descuento:
en **−10 %** el precio "$ 2.277" y la banda rojo apagado **"Debajo del margen mínimo"**; el dedo lo baja a **−5 %**:
"$ 2.404 ✓" verde y "Pedido listo para enviar". Rótulo **"Avisa si un precio queda debajo del margen"**.

## PARTE 1 · el problema (0,0-16,4 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,0-2,6 | **P1 · cuadro 0.** Plano general desde el fondo del depósito hacia el portón abierto, cámara a la altura del pecho: Paola en la mesa de despacho a la izquierda con el ventilador girando, el portón al centro con el contenedor vacío en el patio, Seba entrando a paso rápido con el celular en alto. Push-in lento. | **Cuadro 0:** "IMPORTADORAS" (Lexend 900 ~130 px, ya entero) y el chip "Lunes, 9:00."; la escena en curso, la burbuja de Seba ya asomando · 0,2-2,2 · **Seba: "¡Pao! ¡Vendimos todo el contenedor!"** | depósito, portón, contenedor vacío en el chasis, mesa, ventilador, estanterías casi vacías, Paola, Seba, celular | ambiente de patio de mañana (pájaros lejos, un camión que pasa por la calle) · pasos rápidos · zumbido suave del ventilador |
| 2,6-4,2 | **P2 · Paola.** Plano medio de Paola en la mesa, el ventilador detrás. | 2,7-4,0 · **Paola: "¡Vamos! ¿A cuánto?"** (puño en alto, sonrisa grande) | Paola, ventilador, mesa | `k-cloth_1` del puño · un golpe de palma en la mesa |
| 4,2-6,4 | **P3 · la lista.** Contraplano: Seba junto a la columna, señala la lista pegada; push-in a la lista (inserto ≥ 55 %). | 4,3-6,2 · **Seba: "A lista. Mil novecientos cincuenta."** · la fila "Ventilador de pie 16" · $ 1.950" se resalta, "JULIO" en rojo apagado. | Seba, columna, lista con cinta | pop del resaltado · papel |
| 6,4-8,4 | **P4 · la proforma.** Mica entra por la puerta de la oficina con la hoja; inserto de la proforma en su mano. | Chip "Lunes, 9:05." · 6,5-8,3 · **Mica: "Pao, llegó la factura del contenedor nuevo."** · "USD 46 c/u" se marca. | Mica, proforma, Paola de espaldas | papel · `pop` en "USD 46" |
| 8,4-10,6 | **P5 · la cuenta.** Montaje sin voz, cámara continua: el pizarrón (Paola borra el 40 y escribe 43) → la calculadora (989.000) → travelling por el portón hasta el contenedor nuevo de frente, que se llena de cajas y deja 8 huecos rojos. | "DÓLAR: 40" → "43" · calculadora "23.000 × 43 = 989.000" contra "Cobramos: 975.000" · cajas que entran con pop hasta "492 de 500" · rótulo **"Con lo que cobramos, traemos 492"** (rojo apagado). | pizarrón, marcador, calculadora, contenedor, cajas kraft | marcador en pizarrón (real, CC0) · teclas de calculadora · `pop` por fila de cajas (tono que sube) · golpe sordo y vacío en los huecos |
| 10,6-12,6 | **P6 · remate.** Plano medio de Paola, quieta; detrás el ventilador. | Pausa 0,4 · 11,0-12,4 · **Paola: "Vendimos todo. Y perdimos plata."** (burbuja en dos tiempos) · el ventilador se frena solo y la cabeza baja · chip "− $ 14.000" rojo apagado. | Paola, ventilador | el zumbido del ventilador que baja hasta apagarse · la música baja |
| 12,6-14,6 | **P7a · Seba otra vez.** El mismo encuadre de P1, más cerrado: Seba en el portón, feliz, el celular en alto (inserto ≥ 40 %: "Bazar Graciela: ¡Mandame 200 más!"). | 12,7-14,4 · **Seba: "¡Pao! ¡Graciela quiere doscientos más!"** | Seba, celular, portón | `notification` 12,6 · pasos |
| 14,6-16,4 | **P7b · remate del remate.** Paola de 3/4 de espaldas a Seba, mirando el contenedor de los huecos; levanta la mano sin darse vuelta. | Pausa 0,5 · 15,0-16,3 · **Paola: "Seba. Por favor. Dejá de vender."** | Paola, Seba al fondo, ventilador quieto | **stinger** 16,3 (la música se corta seca) |

Último cuadro (16,4) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,4-18,8 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un sistema"** / **"más
tarde…"**. Audio de `reels/ya-lo-cargo/assets/voice/narrador.wav` (Rasalgethi). Nunca "Scalerics".

## PARTE 2 · la solución (18,8-37,4 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,8-21,0 | **Q1 · el mismo cuadro 0.** Mismo encuadre de P1; el ventilador gira; en la columna, la tablet con el catálogo en vez de la lista; el pizarrón dice "Lunes: despachar Bazar Graciela". | Chip "Lunes, 9:00." · 19,0-21,0 · **el mismo audio de Seba: "¡Pao! ¡Vendimos todo el contenedor!"** | ídem P1, tablet en la columna | ambiente igual que P1 |
| 21,0-22,4 | **Q2 · Paola.** El mismo plano de P2. | 21,1-22,3 · **el mismo audio: "¡Vamos! ¿A cuánto?"** | Paola, ventilador | ídem P2 |
| 22,4-25,2 | **Q3 · el precio de hoy.** Inserto del celular de Seba a pantalla llena (≥ 70 %), con su pulgar. | "$ 2.530" entra con contador · chip "Precio de hoy ✓" · rótulo **"El vendedor ve el precio de hoy"** · 22,6-25,0 · **Seba: "Al de hoy. Dos mil quinientos treinta."** | celular de Seba | `k-tick-1` en el contador · `cero.mp3` al llegar |
| 25,2-27,2 | **Q4 · la proforma.** El mismo plano de P4: Mica entra con la hoja. | 25,3-27,1 · **el mismo audio de Mica: "Pao, llegó la factura del contenedor nuevo."** | Mica, proforma | papel |
| 27,2-29,6 | **Q4b · el panel.** Push-in a la tablet de Paola en la mesa (≥ 60 %); Paola no levanta la vista. | 27,3-28,3 · **Paola: "Ya está cargada."** · en el panel: "Costo: USD 46 ✓" · "Dólar: 43" · los precios de las filas giran solos (tic de contador) · banda **"Recalculado solo · 38 productos"** · rótulo **"Cambia el dólar o el costo: la lista se recalcula sola"**. | tablet, mesa, mano de Paola | `click-soft` · `k-tick-1` por fila · `ding` en la banda |
| 29,6-31,8 | **Q5 · el contenedor lleno.** El MISMO encuadre del contenedor de P5: entran las 500 cajas, sin huecos. | "500 de 500 ✓" verde · "+ $ 276.000" · 30,0-31,6 · **Paola (en off, burbuja en el lugar del remate): "Vendimos todo. Y ganamos plata."** · el ventilador del depósito sigue girando en el corte de vuelta. | contenedor, cajas | `pop` por fila (tono que sube) · `cero.mp3` en "500 de 500 ✓" |
| 31,8-34,0 | **Q6 · Seba.** El mismo encuadre de P7a: Seba en el portón, el celular en alto. | 31,9-33,9 · **Seba: "¡Graciela quiere doscientos más! ¿Le hago un diez?"** · toca "−10 %". | Seba, celular, portón | `notification` · `click-soft` |
| 34,0-35,8 | **Q6b · el margen.** Inserto del celular (≥ 60 %): "−10 % · $ 2.277" con la banda roja "Debajo del margen mínimo"; el pulgar lo baja a "−5 % · $ 2.404 ✓". | Rótulo **"Avisa si un precio queda debajo del margen"** · 34,9-35,7 · **Seba: "…Le hago un cinco."** | celular de Seba | `glitch-1` corto en el rojo · `ding` en el ✓ |
| 35,8-37,4 | **Q7 · el callback.** El mismo plano de P7b: Paola de 3/4, levanta la mano sin darse vuelta, ahora sonriendo. | 35,9-37,2 · **Paola: "Vendé, Seba. Vendé."** (burbuja en el lugar de "Dejá de vender.") | Paola, Seba al fondo, ventilador girando | la música vuelve arriba |

## CIERRE (37,4-41,4 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,4-41,4 | **C · Paola a cámara.** Primer plano en el depósito, de frente; detrás, el ventilador girando y por el portón el contenedor lleno (nunca pared lisa). Push-in suave. | 37,6-40,9 · **Paola: "Comentá DÓLAR y te mando cómo funciona para tu importadora."** · sobre "DÓLAR" entra la tarjeta abajo de la cara: "Comentá" / **"DÓLAR"** (recuadro verde de selección) / "y te mando cómo funciona para tu importadora"; en los últimos 0,8 s, chico: "Tu lista de precios, atada al costo en dólares" / "scalerics.com" en verde. | pop en "DÓLAR" · cama que cierra con un acorde |

## Parlamentos (voces Gemini; un .txt por parlamento en `partes/`)
| # | personaje | voz | texto | tono sugerido |
|---|---|---|---|---|
| 01 | Seba | Umbriel | ¡Pao! ¡Vendimos todo el contenedor! | eufórico, entrando corriendo, uruguayo joven |
| 02 | Paola | Aoede | ¡Vamos! ¿A cuánto? | festejo, puño en alto, la pregunta al pasar |
| 03 | Seba | Umbriel | A lista. Mil novecientos cincuenta. | orgulloso, obvio |
| 04 | Mica | Zephyr | Pao, llegó la factura del contenedor nuevo. | trámite, neutra, un poco seria |
| 05 | Paola | Aoede | Vendimos todo. Y perdimos plata. | seca, lenta, pausa entre las dos frases, sin drama |
| 06 | Seba | Umbriel | ¡Pao! ¡Graciela quiere doscientos más! | más eufórico que en 01 |
| 07 | Paola | Aoede | Seba. Por favor. Dejá de vender. | calma total, cansada, cada frase separada |
| 08 | narrador | Rasalgethi | Un sistema más tarde. | (reusado de ya-lo-cargo) |
| 09-10 | Seba / Paola | | (los mismos audios de 01 y 02) | |
| 11 | Seba | Umbriel | Al de hoy. Dos mil quinientos treinta. | tranquilo, canchero |
| 12 | Mica | Zephyr | (el mismo audio de 04) | |
| 13 | Paola | Aoede | Ya está cargada. | al pasar, sin levantar la vista |
| 14 | Paola | Aoede | Vendimos todo. Y ganamos plata. | la misma cadencia que 05, con media sonrisa |
| 15 | Seba | Umbriel | ¡Graciela quiere doscientos más! ¿Le hago un diez? | eufórico y después dudando |
| 16 | Seba | Umbriel | …Le hago un cinco. | se corrige solo, mirando el celular |
| 17 | Paola | Aoede | Vendé, Seba. Vendé. | relajada, sonriendo, mismo ritmo que 07 |
| 18 | Paola | Aoede | Comentá DÓLAR y te mando cómo funciona para tu importadora. | a cámara, cálida, de colega |
95 palabras habladas (sin contar las repetidas como audio reusado: 79 grabadas).
Pronunciación: "Seba" (no "Ceba"), "dólar" con acento en la o, "quinientos treinta" claro (que en el "oyó:" salga
"2530" o "dos mil quinientos treinta").

## El remate y el remate del remate
- **Remate (P6):** "Vendimos todo. Y perdimos plata." La mejor noticia del año (el contenedor entero vendido) se da vuelta
  con una cuenta: lo vendido a la lista de julio no alcanza para traer el mismo contenedor (492 de 500), y el ventilador
  de muestra se apaga solo.
- **Remate del remate (P7):** el vendedor, feliz, trae más ventas al mismo precio, y la dueña de una importadora le pide
  por favor que deje de vender.
- **Callbacks de la parte 2:** "¿A cuánto?" → "Al de hoy." · la factura → "Ya está cargada." · "Y perdimos plata." → "Y
  ganamos plata." (el contenedor lleno) · "Dejá de vender." → "Vendé, Seba. Vendé." (y el descuento que el celular frena
  solo, sin reto).

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "IMPORTADORAS" entero, sin tapar caras; el contenedor vacío con las puertas abiertas y Seba con el
  celular legibles: que se lea "importadora, contenedor, vendedor contento" antes de que hable.
- **Se entiende sin sonido:** burbujas de todas las líneas; "JULIO" en la lista; "USD 46" en la proforma; el 40 → 43 del
  pizarrón; "492 de 500" y los 8 huecos; "− $ 14.000"; "Precio de hoy ✓"; "Recalculado solo"; "Debajo del margen
  mínimo"; "500 de 500 ✓".
- **Continuidad:** P1 = Q1, P2 = Q2, P4 = Q4, P5 = Q5 (el contenedor), P7a = Q6, P7b = Q7 en encuadre; el ventilador gira
  en toda la parte 2 y en la parte 1 hasta P6 (después de P6 queda quieto en P7); la lista en la columna solo en la parte
  1, la tablet solo en la parte 2.
- **Física:** las cajas entran al contenedor sin atravesar las paredes ni las puertas; las aspas dentro de la jaula; la
  jaula no atraviesa a Paola; el marcador toca el pizarrón (no flota); el celular en la mano.
- **Números:** los de la tabla, iguales en todos los planos (1.950, 46, 23.000, 40/43, 989.000, 975.000, 492, − 14.000,
  2.530, 2.277, 2.404, 276.000).
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20,7 s.
- **SFX que no estén en `assets/sfx`** (marcador en pizarrón, ventilador que se frena, calculadora): reales con licencia
  CC0 (BigSoundBank o Freesound CC0), con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados.

## Portada
`portada.json` (copia del de `reels/anotamelo`, cambiando `t`, textos y `fondo_limpio`): `chica` **"Vendimos el
contenedor."** · `grande` **"¿A cuánto?"** · `sello` **"IMPORTADORAS"**. Fondo limpio de **P1 (~t 1,6)**: Seba entrando
con el celular en alto, Paola festejando y el contenedor vacío en el portón, llenando la mitad de arriba (sin
"IMPORTADORAS", chip, burbuja ni subtítulos). Alternativa: P5 con el contenedor y los 8 huecos rojos (ojo: que no sea
solo objeto; mejor con Paola en cuadro).
