# dist-comisiones · plan plano por plano · DISTRIBUIDORAS, dolor + solución (3D real), ~41,4 s

**De qué trata.** Día 1 del mes, 8:00, la oficina vidriada de Rubén arriba del depósito. Nico asoma a la puerta con el
celular: **"Jefe, ¿cuánto me toca?"** Rubén, canchero: **"Fácil. Tres por ciento de lo cobrado."** Montaje: la planilla
"COMISIONES OCTUBRE.xlsx" se abre columna por columna (VENDIDO, COBRADO, DEVOLUCIONES, PAGÓ LA MITAD, ¿DE QUIÉN ES?), el
calendario de pared cae de 1 a 2, el termo se vacía y Nico y Javi se duermen en la escalera. Día 2, 19:00: **"Nico:
cuarenta y dos mil."** / Nico, con su propia cuenta en el celular ($ 60.000): **"¿Cuarenta y dos? Súper Héctor es mío."**
/ Javi: **"¡Héctor es mío!"** / pausa / Rubén: **"Felicitaciones. Entre los dos vendieron más que la empresa."** (dos pilas
de cajas 3D, "Según Nico" + "Según Javi", pasan de largo a la de "Facturó la empresa"). Remate del remate: Graciela, por
altavoz: **"Rubén, te devuelvo seis cajas."**; la planilla se recalcula entera por − $ 198, el calendario cae a 3,
"Sueldos: atrasados": **"Te toca menos. Pasá el jueves."** Cartel **"Un sistema más tarde…"**. Parte 2: el mismo día 1,
8:00, el mismo "¿cuánto me toca?": **"Mirá el celular."** → "Tu comisión · $ 42.000 ✓" → **"Cuarenta y dos mil. ¿Ya?"**;
Javi: **"¿Y Súper Héctor?"**, el panel muestra el pedido con "Cargó: Javi" → Nico: **"…Es de Javi."**; las pilas ahora
llegan justo: **"Felicitaciones. Ahora la cuenta da."**; la misma llamada de Graciela y la devolución se descuenta sola,
en el panel y en el celular de Nico: **"Te toca menos."** / **"Ya sé. Me llegó."** Cierre: Rubén a cámara: **"Comentá
COMISIONES y te mando cómo funciona para tu distribuidora."**

- **Producto: sistema a medida de comisiones para distribuidoras.** Cada pedido queda con su vendedor desde que se
  carga; la comisión de cada vendedor se calcula sola **sobre lo cobrado** (cuando entra el pago, no cuando se factura);
  las devoluciones se descuentan solas; lo pendiente de cobro se ve aparte y suma cuando se cobra; cada vendedor ve la
  suya en el celular en tiempo real; el dueño ve el panel por vendedor y el día 1 el cierre del mes ya está. Se ve
  funcionando en la parte 2 y se nombra en la línea chica final y en `descripcion.txt`. El cartel nunca dice
  "Scalerics". No es agente de IA: no se lo llama así.
- **Sin marcas:** "Distribuidora Rubén", "Súper Héctor", "Rotisería Graciela", "Bar Walter" son inventados. La planilla
  es genérica (grilla gris, sin el verde ni el logo de ningún programa; "Excel" y ".xlsx" solo como palabra, como se dice
  en el rubro). Celulares, calculadora, monitor y chat genéricos. Cajas kraft sin marca.
- **Sin datos de afuera** (ver `fuentes.md`): los montos, días y porcentajes son del caso.
- **Estructura:** parte 1 **18,4 s** (dolor) + cartel **2,4 s** + parte 2 **16,8 s** (solución) + cierre **3,8 s**
  (Rubén a cámara + tarjeta). Solución + cierre = 20,6 s de 41,4 s (50 %): si las tomas alargan la parte 1, recortar
  pausas de la parte 1 (montaje P3 a 2,0 s), nunca la parte 2. Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`,
  como dist-cartera y dist-quien-debe.
- **Cartel:** el time card de siempre: **"Un sistema" / "más tarde…"**. Audio REUSADO de
  `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde."), atempo si pasa de 2,4 s.
- **Quién dice "Comentá COMISIONES": Rubén**, a cámara (dist-cartera cerró Sofi; alternamos). "Te mando" en singular, de
  dueño a dueño.
- **La palabra: COMISIONES** (una, mayúsculas). Se pensó COMISIÓN (más corta), pero en plural es lo que el dueño
  escribe y lo que busca. En pantalla, en la voz y en la primera línea de `descripcion.txt`. Si a 130 px no entra en el
  80 % seguro, bajar a 112 px; no partir la palabra.
- **Nadie queda mal parado:** Nico y Javi reclaman de buena fe (cada uno cree que Héctor es suyo, y en la parte 2 Nico
  cede apenas ve el pedido); Graciela devuelve sin culpa (es un trámite); Rubén se ríe de la situación. El chiste es
  contra el Excel de comisiones y el día 1 perdido, no contra los vendedores.

## Paleta y set (para "Hechos")
**Set: la oficina vidriada de Rubén arriba del depósito, vista desde ADENTRO con la puerta de vidrio y la escalera
metálica en cuadro** (lo nuevo respecto de dist-pedidos-lunes y dist-cliente-grande: la escalera, donde esperan y se
duermen los vendedores, y el calendario de pared que cuenta los días). Escritorio crema con canto navy, monitor grande
(pantalla canvas), **calculadora de escritorio con rollo de papel** (la cinta crece hasta el piso en P3), **dos
talonarios de remitos** apilados (tapas navy, hojas crema con borde rosa apagado), el mate y el termo, **calendario de
pared de hojas grandes** (número Lexend 900 navy sobre crema, la hoja que cae con un giro de 3D), un reloj de pared
navy. A través del vidrio, desenfocado, el depósito con racks verde y crema y pallets. **La escalera metálica** navy3 con
baranda, del otro lado de la puerta de vidrio (Nico y Javi sentados en P3; dormidos con la caja de pizza kraft sin
marca). Luz: día 1 a las 8 fría de mañana; en P3 pasa a noche (luz de lámpara cálida, el vidrio oscuro) y en P4-P7 la
tarde del día 2; la parte 2 vuelve a la mañana del P1.
- Fondo: **navy `#0b1220` con la oficina en crema y navy2 `#16243d`**; dist-cartera fue el depósito con guirnalda y
  dist-quien-debe el banco crema: este va de oficina, con el monitor como fuente de luz.
- **Rojo apagado `#c7655b` SOLO para el problema:** las columnas "PAGÓ LA MITAD" y "¿DE QUIÉN ES?", la caja "SÚPER HÉCTOR
  $ 500.000" que está en las dos pilas, la diferencia "+ $ 500.000" de las pilas, "− $ 198" de la parte 1, "Sueldos:
  atrasados", el calendario en 3. **Verde `#5ce611` para lo resuelto:** "$ 42.000 ✓" en el celular, "Cargó: Javi ✓", el
  "= ✓" de las pilas iguales, "Cerrado ✓", "Sueldos: pagados ✓", la tarjeta COMISIONES, el recuadro de selección de los
  subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Graciela por altavoz: burbuja que sale del celular de Rubén con el chip "Altavoz · Rotisería Graciela". En
  la parte 2, "Felicitaciones. Ahora la cuenta da." en el MISMO lugar y tamaño que "Felicitaciones. Entre los dos
  vendieron más que la empresa." y "Te toca menos." en el mismo lugar que en la parte 1 (que se lea el callback).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "DISTRIBUIDORAS" en el cuadro 0):
  "Día 1 del mes, 8:00." (P1) · "Día 1, 13:00." / "Día 1, 22:00." / "Día 2, 19:00." (P3) · "Día 3. Sueldos: atrasados."
  (P7, rojo apagado) · "Día 1 del mes, 8:00." (Q1) · "Día 1, 8:05." (cierre).

## Personajes (copia local de `reels/dist-cartera/assets/personajes.js`, que ya tiene a todos)
- **Rubén = ELENCO.ruben** (NO `almacenero`): camisa navy3 arremangada, bigote, panza. P1 tranquilo, mate en la mano; P2
  se arremanga canchero; P3 se va hundiendo en la silla, ojeras (si el módulo no tiene ojeras, la expresión `cansado` /
  `resignado`); P4 golpea Enter con el índice; P6 cara de nada, ojos un poco entrecerrados (el remate seco); P7
  `resignado`, se saca los lentes de leer o se frota los ojos. Parte 2 `sonrisa` contenida, la bombilla para señalar.
  Voz Algenib.
- **Nico = ELENCO.empleado** con el celular y el maletín de muestras navy apoyado en la escalera. Buena fe: P5 ofendido
  sin enojo, Q2 contento, Q3m se rinde con media risa, Q4 tranquilo y adelantado. Voz Fenrir.
- **Javi = personaje NUEVO** (sumarlo al módulo con el mismo estilo, `ELENCO.javi`): vendedor de la zona Centro, ~32,
  pelo castaño corto con jopo bajo, barba de tres días, **chomba verde apagado `#365f28` con cuello crema** (que no se
  confunda con Nico ni con Leo, que tenía campera verde: Javi va de chomba, sin campera), pantalón gris, mochila de
  muestras crema. Canchero de buena fe. Voz **Achird** (en el repo: Diego de inmobiliaria-visitas y los mozos de
  parrilla-no-vuelve y resto-reservas; ninguno de distribuidoras ni de los últimos reels).
- **Graciela = ELENCO.clienta**: solo voz por altavoz (chip "Altavoz · Rotisería Graciela" y su avatar redondo en la
  pantalla del celular de Rubén). Voz Gacrux. El mismo audio en P7 y Q4.
- Extras sin voz: un operario desenfocado en el depósito, detrás del vidrio.

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/dist-cartera`, `reels/dist-quien-debe`, `reels/dist-pedidos-lunes`):
- La oficina vidriada de Rubén y su monitor con pantalla canvas; el depósito con racks y pallets de fondo.
- `crearCelular` (pantalla canvas), `crearMate`, `crearTermo`, `crearMochila` (maletín de muestras), cajas kraft.
- Cartel time card (ya-lo-cargo / dist-cartera).

**Nuevos** (específicos, que nadie los confunda):
- **Calendario de pared de hojas grandes:** el número del día gigante; la hoja cae girando (función del tiempo) en P3
  (1 → 2) y P7 (2 → 3). En la parte 2 queda en 1. Que el número se lea en el plano medio (≥ 90 px en el cuadro).
- **Calculadora de escritorio con rollo:** la cinta de papel sale en P3 hasta tocar el piso (curva de tubo con textura
  de números, sin atravesar el escritorio).
- **Talonarios de remitos** (dos bloques con tapa navy) y **caja de pizza kraft sin marca** en la escalera.
- **La escalera metálica** navy3 con baranda, del otro lado de la puerta de vidrio.
- **Las dos pilas de cajas (P6 y Q3b):** dos columnas de cajas kraft 3D al costado del escritorio, la altura de cada
  caja proporcional a su monto (1 unidad = $ 100.000), el monto en el frente (canvas). Izquierda, **"Facturó la empresa ·
  $ 2.800.000"**: un bloque navy/crema de 28 unidades de alto. Derecha, **lo que dice cada uno**, que cae caja por caja
  con pop: "Nico · $ 1.500.000" (15) + **"SÚPER HÉCTOR · $ 500.000"** rojo apagado (5, la de Nico) + "Javi · $ 800.000"
  (8) + **"SÚPER HÉCTOR · $ 500.000"** rojo apagado (5, la de Javi) = **$ 3.300.000**: pasa de largo la altura de la
  empresa por $ 500.000, con una línea de referencia crema a la altura 28 y el rótulo "+ $ 500.000" en rojo apagado. En
  Q3b la caja roja de Nico sale volando, las de arriba bajan y la pila queda exactamente en 28 (la caja roja que queda se
  pone crema: "Súper Héctor · Javi"), con un "= ✓" verde 3D arriba. Que las pilas llenen ≥ 60 % del alto del cuadro; las
  etiquetas arriba, sin pisar la cabeza de Rubén.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Números del caso (coherentes en todo el reel; comisión = 3 % de lo cobrado):**
| vendedor | zona | vendido real | cobrado | pendiente | comisión | lo que se anota él |
|---|---|---|---|---|---|---|
| Nico | Este | $ 1.500.000 | $ 1.400.000 | Bar Walter pagó la mitad: $ 100.000 | **$ 42.000** | $ 2.000.000 (suma Héctor) → "$ 60.000" |
| Javi | Centro | $ 1.300.000 (incluye Súper Héctor $ 500.000) | $ 1.200.000 | Panadería Nelly: $ 100.000 | **$ 36.000** | $ 1.300.000 → "$ 39.000" |
| Total | | **$ 2.800.000 = facturó la empresa** | $ 2.600.000 | $ 200.000 | **$ 78.000** | $ 3.300.000 (+ $ 500.000) |
Devolución de Graciela (clienta de Nico): **6 cajas de aceite × $ 1.100 = $ 6.600 → 3 % = $ 198** → Nico **$ 41.802**
(total comisiones $ 77.802). Pedido de la discusión: **Pedido 0388 · Súper Héctor · $ 500.000 · Cargó: Javi · 14/10,
10:12**.

**El monitor de Rubén, la planilla (P1-P7):** "COMISIONES OCTUBRE.xlsx", grilla gris clara, encabezado navy. En P1 con
3 columnas (Vendedor · Cliente · Vendido); en P3 se abren de a una con pop: **COBRADO · DEVOLUCIONES · PAGÓ LA MITAD ·
¿DE QUIÉN ES?** (las dos últimas con el encabezado en rojo apagado), con filas que pasan ("Súper Héctor · 500.000 ·
¿Nico? ¿Javi?" en rojo; "Bar Walter · 200.000 · pagó 100.000"); en P4 el resultado **"Nico · $ 42.000"** resaltado; en
P7 la barra "Recalculando…" sobre toda la hoja y **"Nico: $ 42.000 → $ 41.802"** con el chip "− $ 198".
**El celular de Nico (P5):** una calculadora genérica con su cuenta: "2.000.000 × 3 % = **60.000**". **El de Javi
(P5b):** "1.300.000 × 3 % = **39.000**".
**El celular de Nico (Q2, inserto a pantalla llena):** encabezado navy "Distribuidora Rubén · Mis comisiones"; **"Tu
comisión · Octubre"**; **"$ 42.000 ✓"** grande, verde; "Cobrado: $ 1.400.000 × 3 %"; "Pendiente: Bar Walter pagó la mitad
· $ 100.000 · te suma $ 3.000 cuando cobre" (gris, chico pero ≥ 36 px); lista corta de ventas cobradas con tilde.
Rótulo HTML: **"Se calcula sola con cada venta cobrada"**.
**El panel de Rubén (Q1 de fondo, Q3m inserto ≥ 60 %, Q4):** **"Comisiones · Octubre · Cerrado ✓ · Día 1, 8:00"**.
Filas por vendedor: **Nico · Zona Este · Vendido $ 1.500.000 · Cobrado $ 1.400.000 · Comisión $ 42.000** / **Javi · Zona
Centro · Vendido $ 1.300.000 · Cobrado $ 1.200.000 · Comisión $ 36.000** / pie: "Vendido: $ 2.800.000 = Facturado ✓" ·
"Comisiones: $ 78.000" · "Sueldos: pagados ✓". En Q3m Rubén toca y se abre **"Pedido 0388 · Súper Héctor · $ 500.000 ·
Cargó: Javi · 14/10, 10:12 ✓"**; rótulo "Cada pedido, con su vendedor desde que se carga". En Q4 entra la fila
"Devolución · Rotisería Graciela · 6 cajas · − $ 198" y la comisión de Nico baja con tic de contador a **$ 41.802**
(y "Comisiones: $ 77.802"); rótulo **"La devolución se descuenta sola"**.
**El celular de Nico (Q4, inserto ≥ 45 %):** notificación "Devolución · Rotisería Graciela · − $ 198 · Tu comisión:
$ 41.802".

## PARTE 1 · el problema (0,00-18,40 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,30 | **P1 · cuadro 0.** Plano general desde adentro de la oficina, cámara baja detrás del monitor de 3/4: Rubén en el escritorio a la izquierda, la puerta de vidrio a la derecha con Nico asomado (el celular en la mano), Javi detrás en la escalera, el calendario en "1" arriba. Push-in lento. | **Cuadro 0:** "DISTRIBUIDORAS" (Lexend 900 ~130 px, ya entero) y el chip "Día 1 del mes, 8:00."; la escena en curso, la burbuja de Nico asomando. 0,20-1,60 · **Nico: "Jefe, ¿cuánto me toca?"** | oficina, escritorio, monitor con la planilla, talonarios, calculadora, mate, termo, calendario, puerta de vidrio, escalera, Nico, Javi, depósito de fondo | ambiente de depósito de mañana (autoelevador lejano, zumbido de tubo) · golpecito en el vidrio 0,1 |
| 2,30-4,60 | **P2 · Rubén.** Plano medio de Rubén, el monitor en el borde. | 2,45-4,40 · **Rubén: "Fácil. Tres por ciento de lo cobrado."** (sin levantar la vista; se arremanga) | Rubén, monitor, mate | `k-cloth_1` al arremangarse · `key-press` |
| 4,60-7,00 | **P3 · el montaje.** Push-in al monitor (≥ 65 %) que se abre de costado; cortes de 0,5 s al calendario (cae la hoja), al termo que se vacía (lo inclina, no sale nada) y a la escalera (Nico y Javi sentados → dormidos con la caja de pizza). La luz pasa de mañana a noche y a tarde. | Columnas con pop: COBRADO / DEVOLUCIONES / PAGÓ LA MITAD / ¿DE QUIÉN ES? · chips "Día 1, 13:00." → "Día 1, 22:00." → "Día 2, 19:00." · la hoja del calendario cae: 1 → 2 · la cinta de la calculadora llega al piso · rótulos **"2 vendedores · 214 remitos"** y **"Bar Walter: pagó la mitad"**. Sin voz. | monitor, calendario, termo, calculadora y cinta, escalera, Nico, Javi, caja de pizza | `k-tick-1` por columna · calculadora (teclas + papel) en ráfagas · hoja de calendario (`k-page-turn`) · ronquido corto y bajo en la escalera (real, CC0) · la música acelera |
| 7,00-8,60 | **P4 · el número.** Plano medio de Rubén con ojeras, el monitor de 3/4; golpea Enter. | 7,15-8,45 · **Rubén: "Nico: cuarenta y dos mil."** · en el monitor "Nico · $ 42.000". | Rubén, monitor | `key-press` fuerte en el Enter · `ding` corto |
| 8,60-10,80 | **P5 · Nico.** Contraplano: Nico en la puerta (despeinado de la escalera), levanta el celular a cámara (inserto ≥ 45 %: la calculadora con "$ 60.000"). | 8,70-10,60 · **Nico: "¿Cuarenta y dos? Súper Héctor es mío."** · rótulo **"Su cuenta: lo vendido, no lo cobrado"**. | Nico, celular | pop del celular |
| 10,80-12,00 | **P5b · Javi.** Javi se mete por detrás de Nico, el celular en alto: "$ 39.000". | 10,85-11,85 · **Javi: "¡Héctor es mío!"** | Javi, Nico, celular | `k-cloth_2` |
| 12,00-15,40 | **P6 · remate.** Plano general de la oficina: Rubén entre los dos vendedores; a su costado caen las pilas de cajas (≥ 60 % del alto). | Pausa 0,5 · 12,1-12,9 · las cajas de "Según Nico" y "Según Javi" caen de a una y pasan la altura de "Facturó la empresa"; la caja roja "SÚPER HÉCTOR $ 500.000" en las dos; rótulo "+ $ 500.000" en rojo apagado · 13,00-15,20 · **Rubén: "Felicitaciones. Entre los dos vendieron más que la empresa."** (burbuja en dos tiempos). Nico y Javi miran las pilas. | Rubén, Nico, Javi, pilas de cajas, escritorio | `pop` por caja (tono que sube) · un aplauso solo y seco en "Felicitaciones" (real, CC0) · la música baja |
| 15,40-18,40 | **P7 · remate del remate.** Primer plano del celular de Rubén en el escritorio que vibra ("Altavoz · Rotisería Graciela"), después plano medio de Rubén con el monitor y el calendario. | 15,55-17,05 · **Graciela (altavoz): "Rubén, te devuelvo seis cajas."** · pausa 0,4 · "Recalculando…" sobre toda la planilla · "Nico: $ 42.000 → $ 41.802" · chip "− $ 198" · la hoja del calendario cae: 2 → 3 · chip "Día 3. Sueldos: atrasados." · 17,45-18,35 · **Rubén: "Te toca menos. Pasá el jueves."** · Nico mira el celular. | celular de Rubén, monitor, calendario, Rubén, Nico | `vibra` 15,45 · `glitch-1` corto en "Recalculando…" · hoja de calendario · **stinger** 18,3 (la música se corta seca) |

Último cuadro (18,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (18,40-20,80 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un sistema"** / **"más
tarde…"**. Audio de `reels/ya-lo-cargo/assets/voice/narrador.wav` (Rasalgethi). Nunca "Scalerics".

## PARTE 2 · la solución (20,80-37,60 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 20,80-22,90 | **Q1 · el mismo cuadro 0.** Mismo encuadre de P1; calendario en 1, termo lleno, sin talonarios: en el monitor, el panel de comisiones. | Chip "Día 1 del mes, 8:00." · 20,95-22,35 · **el mismo audio de Nico: "Jefe, ¿cuánto me toca?"** | ídem P1, monitor con el panel | ambiente igual que P1 |
| 22,90-24,10 | **Q1b · Rubén.** El mismo plano medio de P2, ahora con el mate. | 23,00-23,90 · **Rubén: "Mirá el celular."** (señala con la bombilla) | Rubén, mate | sorbo de mate |
| 24,10-26,80 | **Q2 · "Tu comisión".** Inserto del celular de Nico a pantalla llena (≥ 70 %), con su pulgar. | 24,2 · vibra · "$ 42.000 ✓" entra con contador · "Cobrado: $ 1.400.000 × 3 %" · "Pendiente: Bar Walter pagó la mitad…" · rótulo **"Se calcula sola con cada venta cobrada"** · 25,10-26,60 · **Nico: "Cuarenta y dos mil. ¿Ya?"** | celular de Nico | `vibra` 24,2 · `k-tick-1` en el contador · `cero.mp3` al llegar |
| 26,80-28,00 | **Q3 · Javi.** El mismo encuadre de P5b. | 26,90-27,80 · **Javi: "¿Y Súper Héctor?"** | Javi, Nico | `k-cloth_2` |
| 28,00-29,60 | **Q3m · el pedido.** Push-in al monitor (≥ 60 %): Rubén toca el pedido. | 28,1 · se abre "Pedido 0388 · Súper Héctor · $ 500.000 · Cargó: Javi · 14/10, 10:12 ✓" · rótulo **"Cada pedido, con su vendedor desde que se carga"** · 28,80-29,50 · **Nico: "…Es de Javi."** (media risa) | monitor con el panel | `click-soft` 28,1 · `ding` 28,3 |
| 29,60-32,60 | **Q3b · las pilas.** El MISMO encuadre de P6: las pilas al costado del escritorio. | 29,7 · la caja roja "SÚPER HÉCTOR" de la pila de Nico sale volando; la pila "Nico $ 1.500.000 + Javi $ 1.300.000" baja hasta quedar justo a la altura de "Facturó la empresa $ 2.800.000" · "= ✓" verde · 30,40-32,40 · **Rubén: "Felicitaciones. Ahora la cuenta da."** (burbuja en el mismo lugar que el remate) | Rubén, Nico, Javi, pilas | whoosh de la caja · golpe seco de caja que asienta · `cero.mp3` en el "= ✓" |
| 32,60-37,60 | **Q4 · la devolución.** El mismo primer plano del celular de Rubén de P7 ("Altavoz · Rotisería Graciela") y después plano medio de Rubén y Nico con el monitor en el centro; inserto del celular de Nico (≥ 45 %). | 32,75-34,25 · **el mismo audio de Graciela: "Rubén, te devuelvo seis cajas."** · 34,3 · en el panel entra "Devolución · Rotisería Graciela · 6 cajas · − $ 198" y Nico baja solo a $ 41.802 · el celular de Nico vibra con la notificación · rótulo **"La devolución se descuenta sola"** · 34,90-35,70 · **Rubén: "Te toca menos."** · 36,00-37,30 · Nico, sin levantar la vista, da vuelta el celular: **"Ya sé. Me llegó."** · el calendario sigue en 1. | celular de Rubén, monitor con panel, Rubén, Nico, celular de Nico, calendario | `vibra` 32,65 · `k-tick-1` en el contador · `notification` 34,5 |

## CIERRE (37,60-41,40 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,60-41,40 | **C · Rubén a cámara.** Primer plano en su oficina, de frente, el mate en la mano; detrás, el monitor con "Comisiones · Octubre · Cerrado ✓ · Día 1, 8:05" y el calendario en "1" (nunca pared lisa). Push-in suave. | 37,75-41,10 · **Rubén: "Comentá COMISIONES y te mando cómo funciona para tu distribuidora."** · sobre "COMISIONES" entra la tarjeta abajo de la cara: "Comentá" / **"COMISIONES"** (recuadro verde de selección) / "y te mando cómo funciona para tu distribuidora"; en los últimos 0,8 s, chico: "Comisiones solas: por vendedor, con cada venta cobrada" / "scalerics.com" en verde. | pop en "COMISIONES" · cama que cierra con un acorde |

## El remate y el remate del remate
- **Remate (P6):** "Felicitaciones. Entre los dos vendieron más que la empresa." Dos días de Excel y cada vendedor se
  anotó el mismo cliente: las pilas de lo que dice cada uno pasan de largo a lo que facturó la empresa.
- **Remate del remate (P7):** una devolución de seis cajas recalcula toda la planilla por **198 pesos**, el calendario
  cae a 3, los sueldos se atrasan: "Te toca menos. Pasá el jueves."
- **Callbacks de la parte 2:** "Mirá el celular." (al mismo "¿cuánto me toca?") · "Felicitaciones. Ahora la cuenta da."
  (las pilas iguales) · "Te toca menos." / "Ya sé. Me llegó." (la misma devolución, descontada sola, y el vendedor se
  entera antes que el jefe).

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "DISTRIBUIDORAS" entero, sin tapar caras; el monitor con "COMISIONES OCTUBRE.xlsx" y el calendario en "1"
  legibles; Nico en la puerta con el celular: que se lea "día 1, vendedor, comisiones" antes de que hable.
- **Se entiende sin sonido:** burbujas de las 16 líneas; las columnas de la planilla (≥ 40 px); el calendario que cae;
  las etiquetas de las pilas y la caja roja "SÚPER HÉCTOR" en las dos; "− $ 198"; el chip "Altavoz · Rotisería
  Graciela"; "$ 42.000 ✓"; "Cargó: Javi ✓"; "= ✓".
- **Continuidad:** P1 = Q1, P2 = Q1b, P5b = Q3, P6 = Q3b, P7 = Q4 en encuadre; calendario en 1 en toda la parte 2;
  en P3 Nico y Javi tienen que estar en la escalera (no en la puerta) y en P5 Nico vuelve despeinado.
- **Física:** las cajas de las pilas no atraviesan el escritorio ni a Rubén; la hoja del calendario cae sin atravesar la
  pared; la cinta de la calculadora no atraviesa el escritorio; el celular en la mano (no flota); la bombilla no
  atraviesa la cara.
- **Números:** los de la tabla de "Interfaz recreada", iguales en todos los planos (42.000, 60.000, 39.000, 41.802,
  2.800.000, 1.500.000, 1.300.000, 500.000, − 198).
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX que no estén en `assets/sfx`** (ronquido, aplauso solo, calculadora con rollo, hoja de calendario si `k-page-turn`
  no sirve): reales con licencia CC0 (BigSoundBank o Freesound CC0), con autor, sitio y licencia en `fuentes.md`. Nunca
  sintetizados.

## Voces (partes/*.txt; tonos en partes/lineas.tsv)
Rubén = Algenib · Nico = Fenrir · Graciela = Gacrux · **Javi = Achird (nuevo)** · narrador del cartel = Rasalgethi (audio
reusado de ya-lo-cargo). 16 archivos a generar (09-narrador se reusa); `01-nico` y `07-graciela` se reusan en la parte 2
(Q1 y Q4). Pedir 3 tomas por línea y elegir: en 06-ruben la pausa después de "Felicitaciones." tiene que ser ≥ 0,35 s
(si no, pegarla a mano), y en 08-ruben ≥ 0,25 s antes de "Pasá el jueves.". Verificar con el STT "Héctor" (no "héctor"
como "el tor") y "Javi" (no "Jabi" / "Javier": que se lea "Javi" en el "oyó:").

## Portada
`portada.json` (copiar el de `reels/dist-cartera` y cambiar `t`, textos y `fondo_limpio`): `chica` **"Día 1 del mes."** ·
`grande` **"¿Cuánto me toca?"** · `sello` **"DISTRIBUIDORAS"**. Fondo limpio de **P1 (~t 1,6)**: Nico asomado a la
puerta con el celular y Rubén en el escritorio con la planilla y el calendario en "1", llenando la mitad de arriba (sin
"DISTRIBUIDORAS", chip, burbuja ni subtítulos). Alternativa si P1 queda chico: P6 con las pilas y los dos vendedores.
