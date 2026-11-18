# dist-quien-debe · plan plano por plano · DISTRIBUIDORAS, dolor + solución (3D real), ~39,8 s

**De qué trata.** Viernes, 16:00, el box de atención a empresas de un banco genérico. Patricia, la ejecutiva, le gira el
monitor a Rubén: **"Saldo: − $ 140.000"** y **"Sueldos hoy: $ 780.000"**. **"Rubén, estás en rojo. Y hoy pagás
sueldos."** Rubén, con el termo bajo el brazo: **"Tranquila. La calle me debe un millón."** En su celular, la planilla de
cuentas corrientes: 312 filas, $ 1.012.000, y Graciela (rotisería) con una factura a 30 días que va por 94: $ 186.000.
Rubén la llama ahí mismo (pantalla partida con la rotisería y el spiedo), de golpe dulce y chiquito: **"Graciela,
querida… te llamaba por lo de la factura…"** Graciela lo corta, feliz: **"¡Rubén! Justo. Mandame veinte cajas."**
Pausa. **"…Dale."** (caja registradora: "Te deben: $ 1.012.000 → $ 1.034.000"). Patricia: **"¿Y? ¿Cobraste?"** Pausa.
Rubén: **"Mejor. Ahora me deben más."** Remate del remate: Patricia aprieta un botón: **"Te paso con cobranzas."** y el
turnero hace ding-dong: "E-051 → COBRANZAS · BOX 3". Cartel **"Una cobranza automática más tarde…"**. Parte 2 (más de la
mitad del reel): martes 9:00, a Graciela le llega sola la factura que vence hoy con "Por favor, podés pagarla acá" y el
botón Pagar: **"¿'Por favor'? Esto no lo escribió Rubén."** Paga, y el "Pagado ✓" cae en el panel de Rubén, que se marca
solo; detrás, los pagos de los otros clientes: "Vencido: $ 1.012.000 → $ 96.400", y "Quién y desde cuándo" le dice a
Nico a quién visitar: **"Beto. Hoy paso."** Viernes, 16:00, el mismo box: "Saldo: + $ 320.000 · Sueldos ✓". Graciela
llama: **"¡Rubén! Ya te pagué. Mandame veinte cajas."** / **"Dale."** / **"¿Y? ¿Cobraste?"** (el mismo audio) /
**"Mejor. Cobré y vendí."** / **"Te paso con inversiones."** y el turnero en verde: "E-051 → INVERSIONES · BOX 1". Cierre:
Rubén a cámara en el sillón del box de inversiones: **"Comentá COBRAR y te mando cómo funciona para tu distribuidora."**

- **Producto: automatización de cobranza para distribuidoras.** Cada cliente recibe solo **su estado de cuenta**; cuando
  una factura vence, le llega **un recordatorio automático por WhatsApp** (chat genérico) con el **link de pago** o los
  datos de transferencia; **el pago queda marcado solo** en la cuenta del cliente; Rubén ve en un **panel de cuentas por
  cobrar** cuánto le deben, quién y desde cuándo; y **el vendedor sabe a quién visitar** (le llega "Visitar hoy" al
  celular). Se ve funcionando en la parte 2 y se nombra en la línea chica final y en `descripcion.txt`. El cartel nunca
  dice "Scalerics".
- **Sin marcas:** el banco es genérico: **sin nombre, sin logo, sin colores de ningún banco real** (nada de los
  azules/rojos/naranjas de los bancos de Uruguay: el box es crema y navy de Scalerics, y el único texto del banco es
  "ATENCIÓN EMPRESAS", el turnero y "COBRANZAS" / "INVERSIONES"). El chat del recordatorio y el botón Pagar son genéricos
  (sin el verde ni el logo de ninguna app de mensajería ni de pagos). La planilla del celular, sin ícono de ningún
  programa. "Distribuidora Rubén", "Rotisería Graciela", "Súper Héctor", "Bar Walter", "Kiosco Beto", "Panadería Nelly",
  "Cafetería Marta": inventados. Aceite en caja kraft sin marca.
- **Sin datos de afuera** (ver `fuentes.md`): los montos, días y fechas son del caso.
- **Estructura** (la de `dist-cliente-grande`): parte 1 **15,9 s** (dolor) + cartel **2,4 s** + parte 2 **17,9 s**
  (solución) + cierre **3,6 s** (Rubén a cámara + tarjeta COBRAR). Solución + cierre = 21,5 s de 39,8 s (54 %). Un
  proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, como dist-pedidos-lunes y dist-cliente-grande.
- **Cartel:** el time card de siempre: **"Una cobranza automática" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si queda
  larga (> 2,4 s), atempo 1,1; fallback: "Un sistema más tarde." de `reels/ya-lo-cargo` y el cartel "Un sistema" / "más
  tarde…".
- **Quién dice "Comentá COBRAR": Rubén**, a cámara, como en dist-pedidos-lunes y dist-cliente-grande (en la
  distribuidora el que habla con el que mira es Rubén: "te mando" en singular, de dueño a dueño). Llega natural: lo
  acaban de pasar a INVERSIONES, se sienta en el sillón y gira a cámara.
- **La palabra: COBRAR** (una, mayúsculas; DEBE no, COBRANZA es más larga y suena a área de banco). En pantalla, en la
  voz y en la primera línea de `descripcion.txt`.
- **Sin línea chica de "para mandar" aparte:** la tarjeta COBRAR lleva abajo, chico, "Cobranza automática: estado de
  cuenta, recordatorio y link de pago" / "scalerics.com". Sin tarjeta de videollamada en el video (va en
  `descripcion.txt`).
- **Nadie queda mal parado:** Graciela no esquiva (nadie le reclamó; paga en cuanto le llega el recordatorio y "ya te
  pagué" con orgullo); Patricia hace su trabajo, amable; Rubén se ríe de sí mismo. El chiste es contra la situación:
  cobrar da vergüenza, vender no, y el banco sí cobra.

## Paleta y set (para "Hechos")
**Set NUEVO y protagonista: el banco.** (1) **El box de atención a empresas, viernes de tarde:** pared crema `#efeee5`
con zócalo navy3 `#1f3254`, una **mampara de vidrio esmerilado** (blanco translúcido con una franja crema horizontal) que
separa del box de al lado, escritorio crema claro con canto navy, **el monitor de Patricia sobre un brazo giratorio**
(que ella gira hacia Rubén: la pantalla se lee de frente), teclado, un portalápices, una plantita en maceta navy, un
**bowl de caramelos** (el detalle de banco), el **timbre del turnero** (botón redondo crema con aro navy) y dos sillas
tapizadas navy3 del lado del cliente. Arriba, colgado del techo, **el turnero**: una pantalla navy `#0b1220` con letras
Lexend 800 crema "E-051 · BOX 2", que cambia a "E-051 → COBRANZAS · BOX 3" en rojo apagado (P8) y a "E-051 →
INVERSIONES · BOX 1" en verde (Q4). Detrás, desenfocada, la sala de espera: fila de sillas navy3, un dispensador de
números, el cartel "ATENCIÓN EMPRESAS" (crema sobre navy). Alfombra gris azulado `#5b6b80` lisa. Luz de oficina pareja,
fría-neutra (contrasta con la tarde cálida de dist-cliente-grande). (2) **El box de inversiones (cierre):** pared navy2
`#16243d` (el cambio de fondo se lee como "subió de categoría"), **sillón de cuero navy3** con capitoné, un cuadro abstracto
verde apagado `#365f28` con manchas crema, lámpara de pie de bronce mate, mesita con **una taza de café servida** y un
platito con dos galletitas. (3) **La rotisería de Graciela** (reusada de ya-lo-cargo / dist-pedidos-lunes: spiedo con
pollos girando, vitrina, pizarra) en la mitad de abajo de la pantalla partida (P4, Q4) y entera en Q1. (4) **El muelle de
la distribuidora** (reusado de ya-lo-cargo: portón navy3, camioneta de reparto) en Q3. (5) **La oficina de Rubén** solo
como fondo desenfocado del panel en Q2. Anotar en "Hechos": "box de atención a empresas de un banco genérico (pared
crema, mampara esmerilada, monitor giratorio, turnero navy que cambia de COBRANZAS rojo a INVERSIONES verde) y box de
inversiones con pared navy2 y sillón de cuero; rotisería con spiedo en pantalla partida; parte 2 con interfaz recreada
(recordatorio con Pagar en el celular de Graciela, panel de cuentas por cobrar, Visitar hoy en el celular de Nico)".
- **Rojo apagado `#c7655b` SOLO para el problema:** "Saldo: − $ 140.000", la fila de Graciela (94 días) en la planilla,
  "Te deben: $ 1.012.000 → $ 1.034.000", "$ 186.000 → $ 208.000", el turnero "COBRANZAS · BOX 3", el número de días
  vencidos en el panel antes de pagarse, "Vencido: $ 1.012.000" antes de bajar. **Verde `#5ce611` para lo resuelto:** el
  botón "Pagar" y "Pagado ✓", cada "Pagado ✓ · se marcó solo" del panel, "Vencido: $ 96.400" al final de la cuenta
  regresiva, "Recordatorio enviado ✓", "Saldo: + $ 320.000", "Sueldos ✓", el turnero "INVERSIONES · BOX 1", la tarjeta
  COBRAR, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. En la pantalla partida, la de Graciela sale de su celular en la mitad de abajo y la de Rubén en la de
  arriba; la línea que divide la pantalla es navy de 10 px con el chip "Llamando · Graciela" en el medio. En la parte 2,
  "¿Y? ¿Cobraste?" en el MISMO lugar y tamaño que en la parte 1, y "Mejor. Cobré y vendí." en el mismo lugar que "Mejor.
  Ahora me deben más." (que se lea el callback).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "DISTRIBUIDORAS" en el cuadro 0):
  "Viernes, 16:00." en P1, "Martes, 9:00." en Q1, "Viernes, 16:00." en Q4.
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco ni crema sobre la pared crema del banco sin caja.

## Personajes (copia local de `reels/dist-cliente-grande/assets/personajes.js`, que ya tiene a todos)
- **Rubén = ELENCO.ruben** (NO `almacenero`): camisa navy3 manga larga arremangada, cuello crema, bigote, panza. En el
  banco, sentado del lado del cliente, el **termo bajo el brazo** y el mate en la mano (lo uruguayo: lleva el mate al
  banco). P1 `neutra` relajada y un poco canchera; P4 de golpe `esperanza`/sonrisa forzada y los hombros que se encogen
  al llamar ("querida…"), y `resignado` en el "…Dale."; P7 cara de nada, ojos un poco entrecerrados (el remate seco); P8
  mira para arriba al turnero con la bombilla en la boca. Q4 `sonrisa` contenida; se levanta y se acomoda la camisa al oír
  "inversiones". Cierre `sonrisa` de colega en el sillón. Voz Algenib.
- **Patricia = personaje NUEVO** (sumarlo al módulo con el mismo estilo, `ELENCO.patricia`): la ejecutiva de empresas del
  banco, ~40, pelo castaño oscuro recogido en rodete, lentes de marco fino navy, **blazer navy2 sobre camisa crema**,
  aros chicos crema, una credencial colgada (tarjeta crema lisa, sin logo). Amable y de protocolo: nunca villana. P1 gira
  el monitor con una mano; P6 cejas arriba y la lapicera quieta a medio camino; P8 y Q4 aprieta el timbre del turnero con
  el índice (que el dedo toque el botón, no lo atraviese). Voz Pulcherrima.
- **Graciela = ELENCO.clienta** con el **delantal crema** de ya-lo-cargo (dueña de la rotisería). P4: el celular entre el
  hombro y la oreja, las manos ocupadas atando un pollo o con la pinza del spiedo; contenta. Q1: lee el celular apoyado
  en el mostrador, cejas arriba, se ríe, toca "Pagar". Q4: en la pantalla partida otra vez, con el celular en la mano,
  orgullosa. Voz Gacrux.
- **Nico = ELENCO.empleado** con el maletín de muestras navy (de ya-lo-cargo) y el celular. Solo en Q3, en el muelle,
  junto a la camioneta de reparto; lee el aviso, guarda el celular y sube. Voz Fenrir.
- Extras sin voz: un cliente desenfocado en la sala de espera del banco (DEFECTO, de espaldas, con un número en la mano).
- **Avatares chicos** en el panel de Q2: Graciela, Héctor (ELENCO.hector), Walter (ELENCO.walter), Beto, Nelly, Marta: las
  caras del módulo en círculos.

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/dist-cliente-grande`, `reels/dist-pedidos-lunes`, `reels/ya-lo-cargo`):
- `crearCelular` (pantalla canvas), `crearMate`, `crearTermo`, `crearMochila` (maletín de muestras).
- La rotisería (spiedo con pollos girando, vitrina, pizarra) de ya-lo-cargo / dist-pedidos-lunes.
- El muelle con portón navy3 y la camioneta/camión de reparto (`crearCamion`) de ya-lo-cargo / dice-cuarenta.
- La oficina de Rubén (monitor con pantalla canvas `dibujarMonitor`) solo de fondo en Q2.
- Cartel time card (ya-lo-cargo / dice-cuarenta / dist-pedidos-lunes / dist-cliente-grande).

**Nuevos** (específicos, que nadie los confunda):
- **El box del banco (P1-P8, Q4):** escritorio con canto navy, **monitor en brazo giratorio** (gira 70° hacia Rubén en
  P1 con una función del tiempo; pantalla canvas `dibujarSaldo`), **mampara esmerilada**, sillas navy3, plantita, **bowl
  de caramelos** (esferitas de color plano crema, verde apagado y rojo apagado, envueltas: un cilindro con dos moños),
  **timbre del turnero** (botón que se hunde 4 mm cuando lo aprieta Patricia), **portalápices con lapiceras**, la
  lapicera de Patricia en la mano.
- **El turnero (P1, P8, Q4):** pantalla navy colgada de dos varillas del techo, marco navy3, letras Lexend 800 crema en
  canvas. Cambia con un "flip" de 2 cuadros + ding-dong: "E-051 · BOX 2" → "E-051 → COBRANZAS · BOX 3" (la palabra
  COBRANZAS en rojo apagado) → (Q4) "E-051 → INVERSIONES · BOX 1" (INVERSIONES en verde). Que se lea en el plano
  medio (letras ≥ 60 px en el cuadro final; si no, un plano corto del turnero de 0,6 s).
- **El box de inversiones (cierre):** sillón de cuero capitoné navy3, cuadro abstracto, lámpara de pie, taza de café con
  platito y galletitas. Rubén corre la taza para apoyar el termo (detalle de personaje).
- **La caja registradora "de la ironía" (P4-P5):** no es un objeto en cuadro: el contador "Te deben" de la capa HTML sube
  con el sonido de caja registradora y un "ka-ching" de rótulo (chip rojo apagado que rebota). Nada de caja registradora
  3D (sería el almacén).

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**El monitor de Patricia (P1, en el cuadro 0 y de frente a cámara):** encabezado navy "Cuenta empresa · Distribuidora
Rubén" · **"Saldo: − $ 140.000"** grande, rojo apagado · "Sueldos hoy: $ 780.000" · "Descubierto autorizado: usado" (chico).
En Q4, el mismo monitor: **"Saldo: + $ 320.000"** verde · "Sueldos $ 780.000 ✓" · "Entró esta semana: $ 1.240.000".
**El celular de Rubén, la planilla (P3, inserto ≥ 60 %):** grilla crema con encabezado navy, columnas Cliente ·
Factura · Vence · Días · Saldo; las filas pasan rápido con el pulgar (motion blur por desplazamiento, función del tiempo)
y un contador de fila abajo "fila 47 de 312"; frena en **"Rotisería Graciela · 0431 · 30 días · 94 · $ 186.000"**, con
94 y $ 186.000 en rojo apagado. Rótulos HTML (caja navy, texto crema, línea guía): "Te deben: $ 1.012.000 · 38 clientes"
y **"Factura a 30 días: va por 94"**.
**Los rótulos de P4-P5:** tras el "…Dale.", el chip "Te deben: $ 1.012.000 → $ 1.034.000" (rojo apagado, el número que
sube con tic de contador) y "Graciela: $ 186.000 → $ 208.000" (+ 20 cajas de aceite × $ 1.100 = $ 22.000).
**El celular de Graciela (Q1, el recordatorio, inserto ≥ 60 %):** encabezado navy "Distribuidora Rubén" (avatar: una
caja kraft dibujada, no la cara de Rubén); burbuja recibida: "Hola, Graciela. Tu factura 0517 vence hoy: **$ 48.600**.
Por favor, podés pagarla acá:" · botón verde ancho **"Pagar"** · "o por transferencia: Cuenta 00-123456" · "Ver estado de
cuenta" (link chico con ícono de documento). La palabra "Por favor" con un subrayado verde a mano (el ojo la tiene que
agarrar antes del chiste). Al tocar: **"Pagado ✓ · Factura 0517 · $ 48.600"** en verde. Rótulo HTML: "Recordatorio
automático cuando vence".
**El panel de Rubén (Q2, inserto ≥ 60 %): "Cuentas por cobrar"** (encabezado navy): contador grande **"Vencido:
$ 1.012.000"** (rojo) que baja con cada pago hasta **"$ 96.400"** (verde al llegar) · filas que se tildan de a una con
pop: "Rotisería Graciela · $ 48.600 · Pagado ✓ · se marcó solo" (la primera, con el "Pagado ✓" que llega volando del
celular de Q1) · "Súper Héctor · Pagado ✓" · "Cafetería Marta · Pagado ✓" · "Panadería Nelly · Pagado ✓" · "Bar Walter ·
Pagado ✓" · abajo, **"Quién y desde cuándo"**: "Kiosco Beto · 12 días · $ 22.400 · **Visitar hoy → Nico**" · "Bar
Walter · 5 días · $ 31.000 · Recordatorio enviado ✓" · "Súper Héctor · 3 días · $ 43.000 · Recordatorio enviado ✓"
(22.400 + 31.000 + 43.000 = 96.400). Rótulo HTML: "El pago se marca solo".
**El celular de Nico (Q3):** aviso: "Visitar hoy · **Kiosco Beto** · vencida hace 12 días · $ 22.400" y un botón
"Ver ruta". Rótulo HTML: "El vendedor sabe a quién visitar".
**Tarjeta de cierre (HTML, ~3,6 s, sobre Rubén a cámara):** abajo de la cara (nunca encima), en el 80 % seguro:
"Comentá" (Lexend 800 crema, ~90 px) / **"COBRAR"** (Lexend 900 ~170 px, navy en el recuadro verde de selección) / "y te
mando cómo funciona para tu distribuidora" (Lexend 600 crema ~46 px, 2 líneas) / "Cobranza automática: estado de cuenta,
recordatorio y link de pago" (~38 px, crema) / **"scalerics.com"** en verde (~44 px). Entra sobre "COBRAR" de la voz.

## PARTE 1 · el problema (0,00-15,90 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,80 | **P1 · cuadro 0.** Plano medio de costado del escritorio: Patricia a la izquierda girando el monitor, Rubén a la derecha en la silla del cliente con el termo bajo el brazo; el monitor, de frente a cámara en el medio, se lee. Arriba a la derecha, el turnero "E-051 · BOX 2". Push-in lento al monitor y a Rubén. | **Cuadro 0:** arriba, **"DISTRIBUIDORAS"** (Lexend 900 ~130 px, crema con borde navy, ya entero) y el chip "Viernes, 16:00."; el monitor ya a medio girar con "Saldo: − $ 140.000" en rojo. 0,15-2,45 · **Patricia: "Rubén, estás en rojo. Y hoy pagás sueldos."** (señala "Sueldos hoy: $ 780.000" con la lapicera). | box del banco, Patricia, Rubén, monitor giratorio, turnero, mampara, termo, mate, bowl de caramelos | ambiente de banco (murmullo bajo, teclado lejano: `key-press` muy bajo) · el brazo del monitor (`k-creak` corto) 0,10 · tic de la lapicera en la pantalla 1,90 (`k-tick-1`) |
| 2,80-5,00 | **P2 · contraplano.** Por encima del hombro de Patricia: Rubén de frente, recostado, ceba; el turnero desenfocado arriba. | 2,85-4,95 · **Rubén: "Tranquila. La calle me debe un millón."** (canchero; sorbo al final). 4,60 · saca el celular del bolsillo de la camisa. | Rubén, mate, termo, celular, silla navy3 | sorbo de mate 4,80 (`sorbo.wav`) · ropa (`k-cloth_1`) 4,60 |
| 5,00-6,60 | **P3 · la planilla.** Inserto del celular de Rubén (≥ 60 %): el pulgar baja y baja la planilla, "fila 47 de 312" … frena en Graciela. | 5,10 · rótulo "Te deben: $ 1.012.000 · 38 clientes" · 5,80 · frena en "Rotisería Graciela · 30 días · 94 · $ 186.000" (rojo) · 6,10 · rótulo **"Factura a 30 días: va por 94"**. Rubén toca "Llamar". | celular, mano de Rubén | scroll (`k-page-turn` cortito ×3, o `papel.wav` filtrado) · pop por rótulo · click-soft 6,40 |
| 6,60-11,40 | **P4 · la llamada (pantalla partida).** Arriba: Rubén en el banco, primer plano, el celular en la oreja, Patricia de perfil mirándolo. Abajo: la rotisería, plano medio de Graciela con el celular entre el hombro y la oreja, el spiedo girando detrás. Línea navy al medio con el chip "Llamando · Graciela". | 6,70-8,80 · **Rubén: "Graciela, querida… te llamaba por lo de la factura…"** (se encoge, sonrisa forzada, cada vez más bajito). 8,60-10,20 · **Graciela: "¡Rubén! Justo. Mandame veinte cajas."** (lo corta, feliz, pinza del spiedo en la mano). 10,20-10,70 · pausa: Rubén abre la boca, la cierra. 10,75-11,20 · **Rubén: "…Dale."** Graciela corta contenta (beso al aire). 11,00 · rótulos: "Te deben: $ 1.012.000 → $ 1.034.000" y "Graciela: $ 186.000 → $ 208.000" (rojo, el número que sube). | Rubén, Patricia, celular; rotisería, Graciela, spiedo con pollos, vitrina, pizarra | tono de llamada corto (`k-tono`) 6,60 · spiedo (chisporroteo de pollo al spiedo: CC0, ver fuentes) bajo en la mitad de Graciela · colgado (`k-dos-tonos`) 11,15 · **caja registradora (CC0, ver fuentes) 11,05** · tic de contador |
| 11,40-12,60 | **P5 · "¿Y? ¿Cobraste?"** Plano de Patricia de frente por encima del hombro de Rubén: cejas arriba, la lapicera quieta a medio camino. | 11,50-12,40 · **Patricia: "¿Y? ¿Cobraste?"** | Patricia, lapicera, monitor (de espaldas) | (la cama baja -12 dB en 0,4 s) |
| 12,60-14,40 | **P6 · el remate.** Primer plano de Rubén, frontal, la mampara esmerilada detrás (nunca pared lisa). | 12,60-13,00 · pausa (Rubén chupa la bombilla, nada sale). 13,00-14,40 · **Rubén: "Mejor. Ahora me deben más."** (seco, grave, sin sonrisa). | Rubén, mate | sorbo vacío (`sorbo.wav` cortado al final) 12,70 · nada encima de la línea |
| 14,40-15,90 | **P7 · remate del remate.** Plano medio del escritorio: Patricia aprieta el timbre (inserto de 0,3 s del dedo en el botón) y la cámara sube al turnero (tilt rápido): "E-051 · BOX 2" → **"E-051 → COBRANZAS · BOX 3"**. Rubén mira para arriba con la bombilla en la boca. | 14,45-15,55 · **Patricia: "Te paso con cobranzas."** (amable, de trámite). 15,55 · el turnero flipea, ding-dong. 15,60-15,90 · música de espera (la cama en pizzicato con pasaaltos/pasabajos: suena a parlante de techo, como la radio de dist-cliente-grande; no sintetizada). 15,85 · stinger. | Patricia, timbre, turnero, Rubén | click del timbre (`k-switch-3`) 15,45 · **ding-dong de turnero (CC0, ver fuentes) 15,58** · stinger 15,85 |

Último cuadro (15,90) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (15,90-18,30 s)
Time card de dibujito de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan, -4°:
**"Una cobranza automática"** (línea a, ~112 px: que entre en el 80 % seguro; si no, partir "Una cobranza" / "automática")
/ **"más tarde…"** (línea b, 146 px). Voz Rasalgethi nueva ("Una cobranza automática más tarde."). Nunca "Scalerics".
2,4 s.

## PARTE 2 · la solución (18,30-36,20 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,30-22,60 | **Q1 · el recordatorio.** Chip "Martes, 9:00." La rotisería, plano medio de Graciela detrás del mostrador, el spiedo girando; el celular apoyado en el mostrador vibra. Push-in al celular hasta inserto (≥ 60 %). | 18,60 · vibra; llega el mensaje "Distribuidora Rubén · Hola, Graciela. Tu factura 0517 vence hoy: $ 48.600. Por favor, podés pagarla acá:" + botón verde **"Pagar"** + transferencia + "Ver estado de cuenta". Rótulo "Recordatorio automático cuando vence". 19,40-21,60 · **Graciela: "¿'Por favor'? Esto no lo escribió Rubén."** (se ríe, cariñosa). 21,80 · toca "Pagar" → **"Pagado ✓ · Factura 0517 · $ 48.600"** en verde. | rotisería, spiedo, vitrina, Graciela, celular | spiedo bajo · vibra 18,60 · notification 18,65 · click-soft 21,80 · ding (`cero.mp3`) 22,10 |
| 22,60-27,00 | **Q2 · el panel.** Travelling: el chip "Pagado ✓" sale del celular de Graciela y vuela (la cámara lo sigue, Catmull-Rom) hasta el panel de Rubén, que llena el cuadro (≥ 60 %); detrás, desenfocada, la oficina de Rubén con el mate humeando. | 22,80 · la fila de Graciela: "Pagado ✓ · se marcó solo" · 23,30-25,10 · "Pagado ✓" de a uno (Héctor, Marta, Nelly, Walter) y el contador **"Vencido: $ 1.012.000 → $ 96.400"** que baja (rojo → verde al llegar) · 25,40 · se abre "Quién y desde cuándo": Beto "12 días · Visitar hoy → Nico", Walter "5 días · Recordatorio enviado ✓", Héctor "3 días · Recordatorio enviado ✓". Rótulo "El pago se marca solo". | chip 3D "Pagado ✓" (placa redondeada verde con tilde extruida), monitor del panel, oficina desenfocada | whoosh-short 22,60 · ding suave por fila (escalonados) · tic de contador mientras baja · pop 25,40 |
| 27,00-29,20 | **Q3 · a quién visitar.** El muelle de la distribuidora: Nico con el maletín junto a la camioneta de reparto, el celular en la mano; inserto corto del aviso. | 27,10 · aviso "Visitar hoy · Kiosco Beto · vencida hace 12 días · $ 22.400". Rótulo "El vendedor sabe a quién visitar". 27,60-28,60 · **Nico: "Beto. Hoy paso."** 28,70 · guarda el celular y sube a la camioneta; portazo. | muelle, portón, camioneta de reparto, Nico, maletín, celular | notification 27,10 · `puerta-auto.wav` 28,90 · motor corto (`motor.mp3`) 29,00 |
| 29,20-36,20 | **Q4 · "Te paso con inversiones."** Chip "Viernes, 16:00." **El mismo encuadre del cuadro 0** (callback): el monitor girado dice **"Saldo: + $ 320.000"** y "Sueldos $ 780.000 ✓" en verde; Rubén tranquilo con el mate. Vibra su celular → pantalla partida con la rotisería (como en P4). Después, P5 y P6 repetidos (mismos encuadres), y el tilt al turnero. | 29,40 · vibra. 29,60-31,60 · **Graciela: "¡Rubén! Ya te pagué. Mandame veinte cajas."** (orgullosa). 31,80-32,20 · **Rubén: "Dale."** (firme, sin pausa). 32,40-33,30 · **Patricia: "¿Y? ¿Cobraste?"** (el mismo audio, misma burbuja, mismo encuadre de P5). 33,60-35,00 · **Rubén: "Mejor. Cobré y vendí."** (mismo encuadre de P6, media sonrisa; la burbuja en el mismo lugar que "Mejor. Ahora me deben más."). 35,10-36,20 · **Patricia: "Te paso con inversiones."** · timbre · el turnero flipea a **"E-051 → INVERSIONES · BOX 1"** en verde · Rubén se levanta y se acomoda la camisa. | box del banco, monitor, Rubén, Patricia, celular, rotisería, Graciela, turnero | vibra 29,40 · click-soft (atiende) 29,50 · colgado 32,30 · `k-switch-3` 35,90 · ding-dong 36,05 |

## CIERRE (36,20-39,80 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 36,20-39,80 | **C · Rubén a cámara en el box de inversiones.** Primer plano de Rubén de frente, recién sentado en el sillón de cuero, el cuadro verde apagado y la lámpara detrás (nunca pared lisa). Al entrar al plano corre la taza de café con el dorso de la mano para apoyar el termo. Push-in suave. | 36,30 · corre la taza (tintineo). 36,40-39,40 · **Rubén: "Comentá COBRAR y te mando cómo funciona para tu distribuidora."** (de colega, media sonrisa). 37,00 · sobre "COBRAR" entra la tarjeta abajo de la cara; en los últimos 0,8 s, la línea chica "Cobranza automática: estado de cuenta, recordatorio y link de pago" / "scalerics.com". | cuero del sillón (`k-cloth_2`) 36,20 · taza en platito (`k-plato-000`) 36,30 · pop en "COBRAR" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "DISTRIBUIDORAS" entero y legible desde el primer cuadro, sin tapar las caras ni el monitor; "Saldo:
  − $ 140.000" legible en el plano medio; la burbuja de Patricia asomando.
- **Se entiende sin sonido:** todas las líneas en burbujas (las 15 de voz más la repetición de "¿Y? ¿Cobraste?"); la pantalla partida con el chip "Llamando · Graciela"; el
  contador que sube tras el "Dale."; el turnero COBRANZAS / INVERSIONES legible.
- **El banco es genérico:** sin nombre, sin logo, sin colores de bancos reales; el turnero dice solo números, box y área.
- **Patricia:** el dedo toca el timbre sin atravesarlo; la lapicera no atraviesa el monitor; ojos abiertos cuando habla;
  nunca villana (sonríe al pasarlo a cobranzas: es un trámite).
- **Graciela:** el celular entre hombro y oreja sin atravesar la cabeza ni el pelo de rulos; el spiedo gira siempre
  (función del tiempo) y los pollos no atraviesan las varillas.
- **Rubén con el termo bajo el brazo:** el termo no atraviesa el torso ni el brazo al moverse; la bombilla no le
  atraviesa el bigote.
- **Continuidad:** el encuadre de P1 y Q4 igual (el callback se ve: cambia solo el monitor de rojo a verde); P5/P6 y sus
  repeticiones en Q4 con el mismo encuadre y las burbujas en el mismo lugar; el turnero con el mismo número E-051.
- **La solución ocupa la mitad:** medir en el render que el cartel arranque antes de los 16,2 s y que parte 2 + cierre
  duren ≥ 20 s. Si hay que recortar, se recorta P3 (la planilla) o el travelling de Q2, nunca el callback de Q4.
- **SFX que no están en assets/sfx** (caja registradora, ding-dong de turnero, chisporroteo de spiedo): reales con
  licencia CC0, con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados con ffmpeg. Si no aparece un ding-dong
  de turnero CC0, usar `k-dos-tonos.wav` (Kenney, CC0) con pasabajos, que ya suena a timbre de dos tonos.

## Voces (partes/*.txt; tonos en partes/lineas.tsv; detalle en partes/voces.md)
Rubén = Algenib · Graciela = Gacrux · Nico = Fenrir · Patricia = Pulcherrima (nueva en el elenco) · narrador del cartel
= Rasalgethi. 16 archivos; 06-patricia se reusa en Q4.

## Portada
`portada.json`: `chica` "Viernes, 16:00." · `grande` "¿Y? ¿Cobraste?" (la frase que el dueño escucha) · `sello`
"DISTRIBUIDORAS". Fondo limpio (sin gancho, burbujas, chips ni logo) del encuadre del cuadro 0 (~1,6 s): Patricia y
Rubén llenando la mitad de arriba y el monitor girado con "Saldo: − $ 140.000" en rojo entre los dos (el objeto con el
número que duele). Si en el render el mejor cuadro es otro (Rubén con el celular en la oreja y Patricia mirándolo, ~9 s),
cambiar `t` y `fondo_limpio`.
