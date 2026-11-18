# taller-esta-pronto · plan plano por plano · TALLERES, dolor + solución (3D real), ~38,9 s

**De qué trata.** Martes, 10:00, "Mecánica Óscar" lleno. El elevador está ocupado con el auto de Daniel, así que Óscar
trabaja acostado en la camilla con rueditas abajo del auto de Graciela, en el piso. Suena el celular en el banquito y
sale rodando: Graciela: **"Óscar, ¿está pronto?"** / **"A la tarde."** y vuelve a rodar abajo. Maxi, abajo del auto de
Daniel con la lámpara: **"Jefe, el de Daniel: pierde la bomba de agua."** Óscar lo llama: no contesta, no contesta; le
manda la foto y "¿Te la cambio? $ 11.500": entregado, y nada. La escalada: Walter **"¿Está pronto?"** / **"A la
tarde."** y cortes rápidos de martes a miércoles, una burbuja por salida, el contador "Salió a atender" que sube a 22,
el auto de Daniel siempre arriba, los 4 services del miércoles tachados en la pizarra ($ 26.000 que no entraron).
Miércoles 18:00: en la pantalla dice DANIEL; Óscar sale rodando como nunca: **"¡Daniel!"** / Daniel, apretado en un
ómnibus: **"Óscar, ¿está pronto?"** Pausa. Óscar mira el auto clavado arriba: **"Está pronto para empezar."** Remate del
remate: vuelve a sonar, se empuja para salir y una ruedita de la camilla se sale y rueda sola hasta el portón (24).
Cartel **"Un aviso automático más tarde…"**. Parte 2 (más de la mitad): el mismo martes 10:00, el mismo encuadre, el
celular quieto; a Graciela le llega solo "Tu auto: En diagnóstico" con la foto: **"¡Ay, mi autito! Ya lo están
mirando."**; el panel del taller con cada auto y su estado, todos avisados, "Llamadas '¿está pronto?': 0"; el mismo
"Jefe, el de Daniel: pierde la bomba de agua." (el mismo audio) recibe **"Mandale la foto."** y a Daniel, en el ómnibus,
le llega el extra con el botón Aprobar: **"Dale, cambiala."** (2 minutos); al mediodía el elevador baja su auto, entran
los 4 services ($ 26.000 en verde) y a Daniel le llega "Pronto para retirar ✓". 17:30, el taller tranquilo: Óscar, desde
abajo del auto: **"Maxi, ¿está pronto el mate?"** / Maxi, canchero: **"A la tarde."** Óscar se ríe y sale rodando: su
única salida del día es por el mate. Cierre: Óscar a cámara, sentado en la camilla: **"Comentá PRONTO y te mando cómo
funciona para tu taller."**

- **Producto: automatización de avisos del estado del auto.** A cada cliente le llega solo por WhatsApp (chat
  genérico) el paso en que está su auto: **Recibido · En diagnóstico · Esperando repuesto · Pronto para retirar**, con
  foto; si aparece algo extra, **el presupuesto del extra llega con un botón "Aprobar"** (y "Llamame" si tiene dudas) y
  queda marcado en el panel; el taller ve en **un panel "Autos en el taller"** cada auto, su estado y si el cliente ya
  está avisado. Se ve funcionando en la parte 2 y se nombra en la línea chica final y en `descripcion.txt`. El cartel
  nunca dice "Scalerics".
- **Sin marcas:** autos genéricos (el sedán de juguete de taller-presupuestos en otros colores, sin logo ni rejilla
  reconocible, patentes inventadas sin escudo), bomba de agua y repuestos sin marca, ómnibus genérico (interior navy y
  crema, sin colores ni nombre de ninguna empresa de transporte), chat y botones genéricos (sin el verde ni el logo de
  WhatsApp), celulares y tablet sin logo. "Mecánica Óscar" es inventado.
- **Sin datos de afuera** (ver `fuentes.md`): contador, montos, horas y días son del caso.
- **Estructura** (la de taller-presupuestos y dist-quien-debe): parte 1 **16,0 s** (dolor) + cartel **2,4 s** + parte 2
  **17,0 s** (solución) + cierre **3,5 s** (Óscar a cámara + tarjeta PRONTO). Solución + cierre = 20,5 s de 38,9 s
  (53 %). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, como taller-presupuestos.
- **Cartel:** el time card de siempre: **"Un aviso automático" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si queda
  larga (> 2,4 s), atempo 1,1; fallback: "Un sistema más tarde." de `reels/ya-lo-cargo` y el cartel "Un sistema" /
  "más tarde…".
- **Quién dice "Comentá PRONTO": Óscar**, a cámara, sentado en la camilla con el mate (en taller-presupuestos lo dijo
  Sofi en videollamada: acá se alterna). Llega natural: acaba de salir rodando por el mate, la única salida del día, y
  le habla al que mira de dueño de taller a dueño de taller ("te mando" en singular, como Rubén en la distribuidora).
  Alternativa si el plano no queda: Sofi en un celular parado sobre el banco, como en taller-presupuestos.
- **La palabra: PRONTO** (una, mayúsculas, la palabra del gancho y del remate). En pantalla, en la voz y en la primera
  línea de `descripcion.txt`.
- **Nadie queda mal parado:** Graciela y Walter preguntan con cariño (es su auto); Daniel va a trabajar en ómnibus
  porque su auto está en el taller y contesta de buena fe sin haber visto nada; en la parte 2 aprueba en dos minutos.
  Óscar no miente ni se queja: contesta "A la tarde." de oficio y el remate es exacto, no un reto. Maxi le toma el pelo
  con cariño. El chiste es contra la situación: el que pregunta todo el día y el que no contesta cuando le preguntan a
  él, mientras el dueño sale rodando de abajo del auto.

## Paleta y set (para "Hechos")
**Set principal reusado: el taller de día de `reels/taller-presupuestos`** (pared de bloques navy claro `#16243d` hasta
2,2 m y crema arriba, panel de herramientas perforado crema con siluetas navy, piso de hormigón claro `#d9d7c9` con la
franja verde `#5ce611` de seguridad alrededor del elevador, portón levadizo abierto con la luz de mediodía como trapecio
crema plano, la calle afuera, el cartel "MECÁNICA ÓSCAR"). **Lo nuevo del set:** el taller LLENO (tres autos: el de
Daniel arriba en el elevador, el de Graciela en el piso con Óscar abajo, uno más al fondo con el capó abierto), **la
pizarra de turnos**, **el tablero de llaves**, **la camilla con rueditas**, **el banquito con el celular**, **la radio**
y, de tarde (Q5), la luz del portón más baja y cálida (crema más amarillo, sigue plana). **Set nuevo secundario: el
interior del ómnibus** (pasamanos crema, asientos navy3, ventanas con la ciudad low-poly pasando, el timbre de parada
con su botón verde, piso gris con franja crema; nada de los colores de las empresas de Montevideo). **Reusado de
dist-quien-debe / ya-lo-cargo: la rotisería de Graciela** (spiedo con pollos girando, vitrina, pizarrón) solo de fondo
en Q1. Anotar en "Hechos": "taller de día lleno (el de taller-presupuestos: bloques navy claro, panel de herramientas
crema, elevador de dos columnas con el sedán navy claro de Daniel clavado sin una rueda), camilla con rueditas que
pierde una rueda, pizarra de turnos con los services tachados, contador 'Salió a atender'; pantalla partida con el
interior de un ómnibus; parte 2 con interfaz recreada (estado del auto con foto en el celular de Graciela, panel 'Autos
en el taller', extra con botón Aprobar en el celular de Daniel); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** "No contesta", el "Entregado ✓✓" sin respuesta, el contador "Salió
  a atender" en la parte 1 (crema sobre caja roja apagada desde 10 para arriba), los tachones de la pizarra, "Elevador
  ocupado: 2 días", "4 services que no entraron: $ 26.000". **Verde `#5ce611` para lo resuelto:** cada paso tildado en
  el aviso, "Avisado ✓", "Aprobar" y "Aprobado ✓", "Pronto para retirar ✓", los tildes de la pizarra, "Extra aprobado
  en 2 minutos", "4 services que entraron: $ 26.000", "Llamadas '¿está pronto?': 0", "Salió a atender: 0", la tarjeta
  PRONTO, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Las de las llamadas salen del celular de Óscar con el **avatar redondo y el nombre** del que llama
  (Graciela, Walter, Sergio, Fabián, Silvia, Daniel); las de los cortes rápidos de P4 se apilan y se van como cartas
  (una por salida). "¿Está pronto?" en P1 y en P5 en el MISMO lugar y tamaño (que se lea que es la misma pregunta); "Está
  pronto para empezar." en primer plano, centrada abajo de la cara.
- **Contador "Salió a atender: N"** (HTML, caja navy con borde crema, Lexend 900, arriba a la derecha, debajo de
  "TALLERES" en el cuadro 0, nunca encima de una cara): sube con un tic y un rebote por cada salida (0 → 1 → 2 → … 22 →
  23 → 24), en crema hasta 9 y con caja rojo apagado desde 10. En la parte 2 vuelve verde en "0" y al final aparece al
  lado el chip **"Salió por el mate: 1"**.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "TALLERES" en el cuadro 0):
  "Martes, 10:00." (P1), "Martes, 15:10" / "Martes, 17:40" / "Miércoles, 9:00" / "Miércoles, 14:30" (P4, que cambian
  como un reloj), "Miércoles, 18:00." (P5); en la parte 2 "Martes, 10:00." (Q1), "Martes, 12:30." (Q4), "Martes, 17:30."
  (Q5).
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco ni crema sobre el piso claro o la pared crema
  sin caja.

## Personajes (copia local de `reels/taller-presupuestos/assets/personajes.js`, que ya tiene a Óscar, Maxi y Sergio)
- **Óscar = ELENCO.oscar** (mameluco navy2 con la franja verde, barba candado gris, trapo crema con manchas de grasa en
  el bolsillo de atrás). **Acostado boca arriba en la camilla** casi todo el reel: el módulo no tiene pose acostado, así
  que se rota la raíz 90° (raiz.rotation.x = -π/2) sobre la tabla, con las piernas un poco flexionadas (los talones son
  los que empujan: el `paso` de las piernas en el aire, función del tiempo) y la cabeza en el apoyacabeza. Al atender,
  **se incorpora a medias** (torso a ~40°, apoyado en un codo) con el celular en la oreja; la mano libre engrasada.
  Expresiones: P1 `neutra` de oficio; P4 cada vez más `resignado`; P5 `esperanza` grande al ver "DANIEL" (cejas arriba,
  sonrisa) y en P6 cara de nada, ojos un poco entrecerrados mirando para arriba al auto (el remate seco); P7 `fastidio`
  breve cuando se sale la rueda. Parte 2 `sonrisa` tranquila; Q5 se ríe con el "A la tarde." de Maxi. Voz Charon.
- **Maxi = ELENCO.maxi** (mameluco verde oscuro, jopo). P2 y Q3 de pie abajo del auto de Daniel en el elevador, con la
  **lámpara de inspección** (jaula + tubo emisivo crema) apuntando a la bomba de agua. Q3 saca la foto con la tablet.
  Q5 con el **termo bajo el brazo y el mate** de Óscar en la mano, apoyado en el carro de herramientas, canchero. Voz
  Puck.
- **Graciela = ELENCO.clienta** (rulos lila, lentes, cárdigan verde; con el delantal crema de la rotisería en Q1). En la
  parte 1 solo como avatar redondo en la burbuja de la llamada (P1 y P4). En Q1, en el mostrador de su rotisería con el
  celular, se ríe con ternura. Voz Gacrux.
- **Walter = ELENCO.walter** (corbata, campera crema): solo avatar en la burbuja de P4 (voz Umbriel) y la fila del panel
  en Q2.
- **Daniel = personaje NUEVO** (sumarlo al módulo con el mismo estilo, `ELENCO.daniel`; solo parámetros y peinados que
  ya existen): ~45, piel `PIEL.clara`, pelo castaño oscuro en `peinado: "costados"` (entradas grandes, que no se parezca
  a Walter ni a Sergio), **lentes de marco navy** (`lentes: MARCA.navy2`), afeitado, **camisa crema `MARCA.cr` de manga
  larga** con **saco navy3** (`campera: { color: MARCA.navy3, cuello: MARCA.navy3,
  cierre: MARCA.navy3, abierta: true }`), pantalón gris `0x3a3f4a`, una **mochila de laptop navy** (`crearMochila`)
  colgada de un hombro. `panza: 1.05, nariz: 0.06, alto: 1.03`. Buena onda, apurado, de oficina; nunca culpable. En P5
  y Q3/Q4 en el ómnibus, colgado del pasamanos con una mano y el celular en la otra. Voz Schedar.
- **Sergio (ELENCO.sergio), Fabián y Silvia**: solo avatar en las burbujas sin voz de P4 (Fabián y Silvia, variantes de
  DEFECTO como en taller-presupuestos) y Sergio en la fila del panel de Q2.
- Extras sin voz en el ómnibus: dos o tres pasajeros DEFECTO desenfocados, de pie y sentados (no tapan a Daniel).

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/taller-presupuestos`): el taller entero (nave, portón levadizo, calle, cartel "MECÁNICA
ÓSCAR", panel de herramientas, banco de trabajo con morsa, carro de herramientas con manijas verdes, pila de cubiertas,
gato carrito, bidón de aceite crema liso, lámpara de taller colgada), **el elevador de dos columnas** (columnas navy3,
brazos verdes, panel con botón verde; ahora con el auto de Daniel arriba), **el sedán de juguete** (en tres colores:
Daniel navy claro `#4d6a96`, Graciela crema, el del fondo verde apagado `#365f28`), `crearCelular`, `crearTablet`,
`crearMate`, `crearTermo`, `crearBanquito`, `crearMochila`. **La rotisería de Graciela** de dist-quien-debe (solo fondo
en Q1). **El cartel time card** de siempre.

**Nuevos** (específicos, que nadie los confunda):
- **La camilla con rueditas (EL objeto del chiste):** tabla baja de mecánico, acolchada navy3 con costuras crema y
  **apoyacabeza crema** acolchado, bastidor de caño gris acero, **seis rueditas giratorias negras** (horquilla y rueda,
  que giran en su eje vertical según la dirección: función del tiempo). Rueda sobre el piso con un trazo apenas
  marcado. En P7 **una ruedita se sale** (salta 5 cm, rebota dos veces y rueda sola en línea recta hasta el portón,
  dejando la camilla inclinada en esa esquina). En la parte 2 tiene **una ruedita nueva de goma verde** (la única
  distinta: continuidad del chiste).
- **El banquito con el celular:** el banquito de crearBanquito, al lado del auto de Graciela, con el celular boca
  arriba, el trapo y una llave combinada. El celular **vibra y se desplaza** un poco con cada llamada (parte 1) y en la
  parte 2 solo se le prende la pantalla, quieto ("Aviso enviado ✓").
- **La bomba de agua de Daniel:** vista desde abajo del motor: pieza gris acero con la polea al frente, la correa navy,
  dos mangueras negras y **la gota que cae** (gota de refrigerante verde apagado `#365f28` translúcida, ciclo de caída
  función del tiempo) a una bandeja de goteo navy en el piso. En Q4, la bomba nueva limpia (gris claro) y sin gota.
- **La pizarra de turnos:** pizarra crema con marco navy en la pared de bloques, escrita a mano en Caveat navy:
  "MIÉ 9:00 · SERVICE · FABIÁN", "10:30 · SERVICE · PABLO", "14:00 · SERVICE · ANDRÉS", "16:00 · SERVICE · SILVIA" (los
  cuatro necesitan el elevador). En P4 se tachan de a uno con un trazo rojo apagado que se dibuja; en Q4 llevan tilde
  verde. Un fibrón navy colgado de un hilo.
- **El tablero de llaves:** tablero de madera navy3 al lado del portón con ganchos y llaves con **etiquetas de cartón
  kraft** con el nombre: GRACIELA, WALTER, SERGIO, DANIEL, FABIÁN. En Q4, la de SERGIO ya no está (se la llevó) y la
  de DANIEL la descuelga Maxi cuando baja el auto.
- **La radio del taller:** radio vieja crema con frente navy, perilla verde, antena estirada, una mancha de grasa;
  sobre el banco al lado del mate. Suena bajo (la cama con pasabajos).
- **El mate y el termo de Óscar** sobre el banco (parte 1: mate frío, olvidado; parte 2 Q5: Maxi los tiene).
- **El interior del ómnibus (P5, Q3, Q4):** pasillo con pasamanos horizontal crema y agarraderas colgantes, asientos
  navy3 de dos, ventanas con la ciudad low-poly que pasa (fachadas crema y navy, árboles verdes, movimiento lateral
  función del tiempo), el **botón de parada** verde en un caño con el cartel "PARADA" (Lexend 800 crema sobre navy).
  Leve vaivén del plano (función del tiempo, sin ruido aleatorio).

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**El celular de Óscar (parte 1):** funda negra gastada con **huellas de grasa** en la pantalla (dos manchas grises
semitransparentes que no tapen el texto). Llamada entrante: avatar grande y el nombre en Lexend 900 ("GRACIELA",
"WALTER", "DANIEL"), botones genéricos (círculo verde y círculo rojo apagado, sin íconos de marca).
**P3 · llamar a Daniel y el chat:** "Llamando a Daniel…" → **"No contesta"** (rojo apagado) ×2; chat (encabezado navy
"Daniel · Sedán STR 7720"): burbuja de Óscar con **la foto de la bomba goteando** + "Daniel, pierde la bomba de agua.
¿Te la cambio? **$ 11.500**" · abajo **"Entregado ✓✓ 10:16"** en gris y nada.
**Rótulos de P4** (HTML, caja navy, texto crema, línea guía): al elevador **"Elevador ocupado: 2 días"**; a la pizarra
**"4 services que no entraron: $ 26.000"** (rojo apagado).
**El celular de Graciela (Q1, inserto ≥ 60 %):** encabezado navy "Mecánica Óscar" (avatar: una llave combinada
dibujada, no la cara de Óscar); mensaje recibido: "Hola, Graciela. **Tu auto: En diagnóstico.**" con **la foto** (su
auto crema en el taller con Óscar abajo) y la **línea de pasos** vertical: Recibido ✓ (verde) · **En diagnóstico**
(punto verde que late) · Esperando repuesto (gris) · Pronto para retirar (gris). "Te avisamos en cada paso." Rótulo
HTML: **"Le avisa solo, en cada paso"**.
**El panel del taller (Q2, la tablet en su atril sobre el banco, inserto ≥ 60 %): "Autos en el taller · Martes"**
(encabezado navy), una tarjeta por auto con miniatura del auto y avatar del dueño:
- Graciela · Hatch crema · **En diagnóstico** · Avisado ✓
- Walter · **Esperando repuesto** · llega mañana 9:00 · Avisado ✓
- Sergio · **Pronto para retirar ✓** (foto) · Avisado ✓
- Daniel · Sedán STR 7720 · **En el elevador** (se completa en Q3: "Extra: bomba de agua · $ 11.500 · Esperando
  aprobación" → **"Aprobado ✓ 10:04"**)
Abajo, grande: **"Llamadas '¿está pronto?': 0"** y **"Salió a atender: 0"** en verde. Los "Avisado ✓" entran de a uno
con un ding suave. Rótulo HTML: **"Cada auto y su estado, en un panel"**.
**El celular de Daniel (Q3 y Q4, inserto ≥ 60 %, sobre el fondo del ómnibus):** "Mecánica Óscar · **Extra: bomba de
agua · $ 11.500**" con la foto de la bomba goteando, **"Encontramos esto. Si lo aprobás, sale
hoy."**, botón verde ancho **"Aprobar"** y botón crema con borde navy
**"Llamame"**. Al tocar: **"Aprobado ✓"** verde. En Q4: **"Tu auto: Pronto para retirar ✓"** con la foto del sedán
abajo del elevador, limpio. Rótulo HTML: **"Lo extra se aprueba con un botón"**.
**Rótulos de Q4** (HTML): **"Extra aprobado en 2 minutos"** (verde) y a la pizarra **"4 services que entraron:
$ 26.000"** (verde).
**Tarjeta de cierre (HTML, ~3,5 s, sobre Óscar a cámara):** abajo de la cara (nunca encima), en el 80 % seguro:
"Comentá" (Lexend 800 crema, ~90 px) / **"PRONTO"** (Lexend 900 ~170 px, navy en el recuadro verde de selección) / "y te
mando cómo funciona para tu taller" (Lexend 600 crema ~46 px, 2 líneas) / "Avisos automáticos del estado del auto"
(~38 px, crema) / **"scalerics.com"** en verde (~44 px). Entra sobre "PRONTO" de la voz.

## PARTE 1 · el problema (0,00-16,00 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,30 | **P1 · cuadro 0.** Plano general bajo (cámara a 60 cm del piso), en diagonal: en primer plano el auto crema de Graciela con Óscar saliendo de abajo en la camilla; detrás, el elevador con el auto de Daniel arriba sin la rueda (Maxi abajo, chico) y el portón con la luz. Push-in lento a Óscar y al banquito. | **Cuadro 0:** arriba, **"TALLERES"** (Lexend 900 ~150 px, crema con borde navy, ya entero), chip "Martes, 10:00." y el contador "Salió a atender: 0"; la camilla ya rodando hacia afuera (las piernas de Óscar asomando), el celular vibrando en el banquito con "GRACIELA". 0,10 · el contador pasa a 1. 0,15-1,15 · **Graciela (por teléfono): "Óscar, ¿está pronto?"** (burbuja con su avatar desde el celular). 1,40-2,00 · **Óscar: "A la tarde."** (incorporado a medias, el celular en la oreja). 2,05 · deja el celular, se empuja con los talones y rueda abajo del auto. | taller, auto de Graciela, camilla, Óscar, banquito, celular, elevador, auto de Daniel, Maxi, pizarra (de fondo), radio | radio baja · ringtone corto (ver fuentes) + `vibra.wav` 0,00 · rueditas sobre hormigón (salida) 0,00-0,40 · tic del contador 0,10 · rueditas (vuelta) 2,05 |
| 2,30-4,50 | **P2 · abajo del elevador.** Contrapicado desde el piso: la panza del auto de Daniel llenando la mitad de arriba, Maxi de pie con la lámpara; push-in a la bomba de agua y la gota que cae a la bandeja. | 2,40-4,30 · **Maxi: "Jefe, el de Daniel: pierde la bomba de agua."** (la lámpara ilumina la gota en "pierde"). | elevador, auto de Daniel (desde abajo), bomba de agua, gota, bandeja de goteo, Maxi, lámpara de inspección | `gota.wav` 3,30 y 4,10 · zumbido de la lámpara (`zumbido.wav` bajo) |
| 4,50-6,40 | **P3 · Daniel no contesta.** Inserto del celular de Óscar en su mano engrasada (≥ 60 %), Óscar acostado en la camilla de fondo, desenfocado. | 4,55 · "Llamando a Daniel…" → 5,10 **"No contesta"** · 5,20 "Llamando a Daniel…" → 5,55 **"No contesta"** · 5,70 la foto de la bomba vuela al chat y "¿Te la cambio? $ 11.500" · 6,05 **"Entregado ✓✓ 10:16"** y nada (el cursor que titila). | celular de Óscar, mano, camilla | `k-tono` ×2 (tono de llamada cortado) · `k-dos-tonos` (no contesta) ×2 · whoosh-short 5,70 · notification (enviado) 6,05 |
| 6,40-10,40 | **P4 · la escalada.** El encuadre de P1, más cerrado (Óscar + banquito + el elevador al fondo). Suena, sale rodando, contesta, vuelve. Después, cortes rápidos (0,4-0,6 s) con el chip del día que avanza; entre cortes, un plano de 0,8 s de la pizarra donde se tachan los services. | 6,40 · suena "WALTER", sale (contador 2). 6,55-7,25 · **Walter (por teléfono): "¿Está pronto?"** 7,40-8,05 · **Óscar: "A la tarde."** (cansado). 8,10-9,40 · sin voz, cada corte con su burbuja: "Martes, 15:10" Sergio "¿Y? ¿Está pronto?" (5) · "Martes, 17:40" Fabián "¿Ya está?" (9) · "Miércoles, 9:00" Silvia "¿Está pronto?" (14) · "Miércoles, 14:30" Graciela "Óscar, ¿y?" (22): la camilla cada vez más rápida, Óscar cada vez más `resignado`, el auto de Daniel siempre arriba. 9,40-10,40 · la pizarra: los 4 services del miércoles se tachan en rojo apagado; rótulos **"Elevador ocupado: 2 días"** y **"4 services que no entraron: $ 26.000"**. | camilla, Óscar, banquito, celular, auto de Graciela, elevador con el auto de Daniel, pizarra de turnos, fibrón | ringtone + rueditas por cada salida (cada vez más cortos) · tic del contador por salida · pop por burbuja · fibrón sobre pizarra (tachón, ×4; CC0, ver fuentes) |
| 10,40-12,70 | **P5 · "¡Daniel!"** Chip "Miércoles, 18:00." (la luz del portón más baja). Primer plano bajo del banquito: el celular suena y dice **"DANIEL"**; la camilla sale disparada (contador 23) y Óscar se sienta de golpe. Después, **pantalla partida**: arriba Óscar sentado en la camilla con el celular, el elevador detrás; abajo, Daniel apretado en el ómnibus, colgado del pasamanos. Línea navy de 10 px al medio con el chip "En llamada · Daniel". | 10,65-11,15 · **Óscar: "¡Daniel!"** (alivio, sonrisa grande). 11,35-12,45 · **Daniel (por teléfono, en el ómnibus): "Óscar, ¿está pronto?"** (la burbuja en el MISMO lugar y tamaño que la de Graciela en P1). | celular, camilla, Óscar, elevador con el auto de Daniel; ómnibus, Daniel, pasamanos, pasajeros desenfocados, ventanas con la ciudad que pasa | ringtone 10,40 · rueditas rápidas 10,50 · tic 10,55 · ambiente de ómnibus (motor, frenada suave) bajo en la mitad de abajo |
| 12,70-14,50 | **P6 · el remate.** Pausa 12,70-13,20: Óscar levanta la vista despacio al auto de Daniel clavado arriba, sin la rueda (corte de 0,4 s a ese contrapicado: la gota cae). Primer plano de Óscar, frontal, sentado en la camilla, el elevador detrás (nunca pared lisa). | 13,20-14,50 · **Óscar: "Está pronto para empezar."** (seco, grave, sin sonrisa). | Óscar, camilla, elevador con el auto de Daniel, gota | `gota.wav` 12,95 · la cama baja -12 dB y nada encima de la línea |
| 14,50-16,00 | **P7 · remate del remate.** Plano general bajo de P1. Óscar corta, se acuesta y rueda abajo del auto; vuelve a sonar ("GRACIELA"); se empuja para salir y una **ruedita se sale**: la camilla se ladea en esa esquina y la rueda sigue sola, en línea recta, por el piso de hormigón hasta el portón, donde se frena contra el cordón. La cámara la sigue con un paneo corto. | 14,55 · rueditas (vuelta) · 14,90 · ringtone · 15,15 · tac, la rueda salta y rueda · contador 24 (con rebote) · 15,85 · la rueda se frena. | camilla, ruedita suelta, Óscar (piernas), banquito, celular, portón | rueditas 14,55 · ringtone 14,90 · tac de plástico (`k-plastico.wav`) 15,15 · rodada liviana que se aleja 15,20-15,80 · tic 15,20 · stinger 15,85 |

Último cuadro (16,00) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,00-18,40 s)
Time card de dibujito de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan, -4°: **"Un aviso
automático"** (línea a, ~112 px: que entre en el 80 % seguro; si no, partir "Un aviso" / "automático") / **"más
tarde…"** (línea b, 146 px). Voz Rasalgethi nueva ("Un aviso automático más tarde."). Nunca "Scalerics". 2,4 s.

## PARTE 2 · la solución (18,40-35,40 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,40-22,00 | **Q1 · el aviso a Graciela.** Chip "Martes, 10:00." **El mismo encuadre del cuadro 0** (callback): Óscar abajo del auto de Graciela, solo las piernas, la camilla con la **ruedita verde nueva**; el celular en el banquito, quieto: solo se le prende la pantalla, "Aviso enviado ✓ · Graciela · En diagnóstico". Travelling corto: el aviso "sale" de la pantalla y la cámara corta al inserto del celular de Graciela en su mostrador (≥ 60 %), con la rotisería y el spiedo desenfocados detrás. | 18,50 · se prende la pantalla del celular de Óscar, sin sonar (el contador "Salió a atender: 0" en verde). 18,90 · al celular de Graciela le llega "Tu auto: En diagnóstico." con la foto y la línea de pasos (Recibido ✓ · En diagnóstico). Rótulo **"Le avisa solo, en cada paso"**. 19,70-21,70 · **Graciela: "¡Ay, mi autito! Ya lo están mirando."** (se ríe, con ternura). | taller, auto de Graciela, camilla con la rueda verde, banquito, celular quieto; celular de Graciela, Graciela, mostrador, spiedo (fondo) | radio baja · nada de ringtone (silencio donde antes sonaba) · notification suave 18,90 (del lado de Graciela) · spiedo bajo |
| 22,00-24,60 | **Q2 · el panel.** Push-in a la tablet en su atril sobre el banco (≥ 60 %), el taller desenfocado detrás con el elevador y Óscar abajo del auto. | 22,10 · "Autos en el taller · Martes": las tarjetas entran de a una con pop (Graciela · En diagnóstico, Walter · Esperando repuesto: llega mañana 9:00, Sergio · Pronto para retirar ✓ con foto, Daniel · En el elevador) y a cada una se le prende **"Avisado ✓"** (ding suave). 23,60 · abajo, grande: **"Llamadas '¿está pronto?': 0"** y **"Salió a atender: 0"** en verde. Rótulo **"Cada auto y su estado, en un panel"**. | tablet, atril, banco, taller desenfocado | whoosh-short 22,00 · pop por tarjeta · ding suave (`cero.mp3` bajo) por "Avisado ✓" escalonado |
| 24,60-29,40 | **Q3 · el extra.** El mismo plano de P2 (contrapicado abajo del auto de Daniel, Maxi con la lámpara, la gota). Corte a la camilla: Óscar asoma solo la cabeza, sin salir. Maxi le saca la foto a la bomba con la tablet (flash crema). Corte al ómnibus: Daniel colgado del pasamanos mira el celular; inserto (≥ 60 %) con el extra y el botón Aprobar. | 24,70-26,60 · **Maxi: "Jefe, el de Daniel: pierde la bomba de agua."** (el mismo audio de P2). 26,75-27,55 · **Óscar (desde abajo del auto): "Mandale la foto."** 27,60 · flash de la foto. 27,80 · al celular de Daniel le llega "Extra: bomba de agua · $ 11.500" con la foto, "Encontramos esto. Si lo aprobás, sale hoy." y los botones "Aprobar" / "Llamame". Rótulo **"Lo extra se aprueba con un botón"**. 28,20-28,90 · **Daniel: "Dale, cambiala."** 29,00 · toca "Aprobar" → **"Aprobado ✓"**; en el panel (corte de 0,4 s) la fila de Daniel: **"Aprobado ✓ 10:04"**. | elevador, auto de Daniel, bomba, gota, Maxi, lámpara, tablet; camilla, Óscar; ómnibus, Daniel, pasamanos, celular de Daniel | `gota.wav` 24,70 · obturador de cámara (`click-soft` + flash) 27,60 · notification 27,80 · ambiente de ómnibus · click-soft 29,00 · ding (`cero.mp3`) 29,10 |
| 29,40-32,60 | **Q4 · el elevador libre.** Chip "Martes, 12:30." Plano general del elevador: baja el auto de Daniel arreglado (la bomba nueva limpia, la rueda puesta), Maxi lo saca, entra el siguiente auto (el del service de las 14:00, adelantado) y sube. Paneo a la pizarra: los 4 services con tilde verde. Corte de 0,9 s al ómnibus: a Daniel le llega "Pronto para retirar ✓" con la foto y aprieta el botón de PARADA. | 29,50 · el elevador baja (motor). 30,40 · entra y sube el siguiente. 31,00 · rótulos **"Extra aprobado en 2 minutos"** y **"4 services que entraron: $ 26.000"** (verde) · 31,60 · "Pronto para retirar ✓" en el celular de Daniel; Daniel sonríe y toca el timbre de parada. | elevador, auto de Daniel, otro auto, Maxi, pizarra con tildes; ómnibus, Daniel, botón de parada | `elevador.wav` 29,50 y 30,40 · `k-neumatico-abre` 30,00 (pistola neumática) · tic por tilde ×4 · notification 31,60 · timbre de parada del ómnibus (CC0) 31,90 |
| 32,60-35,40 | **Q5 · "¿Está pronto el mate?"** Chip "Martes, 17:30." El encuadre del cuadro 0 con la luz de tarde: el taller tranquilo, la radio, el celular quieto en el banquito; Óscar abajo del auto (solo las piernas, el pie que marca el ritmo de la radio). Maxi entra en cuadro con el termo bajo el brazo y el mate. Óscar sale rodando, solo, sin que suene nada. | 32,70-33,90 · **Óscar (desde abajo del auto): "Maxi, ¿está pronto el mate?"** 34,20-34,80 · **Maxi: "A la tarde."** (canchero, media sonrisa). 34,90 · Óscar se ríe, se empuja y sale rodando (la ruedita verde gira) y le saca el mate. El contador sigue en **"Salió a atender: 0"** y al lado entra el chip **"Salió por el mate: 1"**. | taller de tarde, auto, camilla con la rueda verde, Óscar, Maxi, termo, mate, banquito, celular quieto, radio | radio un poco más alta · rueditas 34,90 · pop del chip 35,10 · risa breve de Óscar (de la toma, si sale; si no, nada) |

## CIERRE (35,40-38,90 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 35,40-38,90 | **C · Óscar a cámara.** Primer plano de Óscar sentado en la camilla, de frente, con el mate en la mano; detrás, el elevador con el auto del service arriba y Maxi trabajando (nunca pared lisa). Push-in suave. | 35,50 · ceba / da un sorbo. 35,60-38,50 · **Óscar: "Comentá PRONTO y te mando cómo funciona para tu taller."** (de colega, media sonrisa). 36,10 · sobre "PRONTO" entra la tarjeta abajo de la cara; en los últimos 0,8 s, la línea chica "Avisos automáticos del estado del auto" / "scalerics.com". | `sorbo.wav` 35,50 · pop en "PRONTO" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "TALLERES" entero y legible desde el primer cuadro, sin tapar a Óscar ni el auto del elevador; el
  celular vibrando con "GRACIELA" y la camilla ya rodando; la burbuja de Graciela asomando; el contador en "0 → 1".
- **Se entiende sin sonido:** todas las líneas en burbujas (14 de voz más la repetición de Maxi y las cuatro burbujas
  sin voz de P4); el contador que sube; "No contesta" y "Entregado ✓✓" sin respuesta; la pizarra tachada; la ruedita.
- **Óscar acostado:** la rotación de la raíz no deja el cuerpo atravesando la tabla ni el auto; la cabeza apoyada en
  el apoyacabeza; al incorporarse, el codo apoya en la tabla y no la atraviesa; el celular en la oreja no atraviesa la
  cabeza ni la barba; las piernas no atraviesan el paragolpes del auto de Graciela. Ojos abiertos cuando habla.
- **La camilla:** las seis rueditas apoyan en el piso siempre (menos la que se sale); giran según la dirección; la
  ruedita suelta no atraviesa nada y se frena contra el cordón del portón; en la parte 2 la ruedita verde está en la
  misma esquina donde faltaba.
- **El elevador:** el auto de Daniel apoyado en los cuatro brazos (no flotando), sin la rueda delantera en toda la parte
  1 (la rueda apoyada contra la columna), la gota cae en la bandeja y no atraviesa el piso; en Q4 baja con la rueda
  puesta.
- **Continuidad:** P1, Q1 y Q5 con el mismo encuadre (el callback se ve: el mismo banquito, el mismo celular, que ahora
  no suena); P2 y Q3 con el mismo encuadre (el mismo audio de Maxi); la burbuja "¿Está pronto?" de P1 y de P5 en el
  mismo lugar; la patente del auto de Daniel igual en el chat, el panel y el auto.
- **El ómnibus es genérico:** sin colores, nombre ni logo de empresas de Montevideo; Daniel con una mano en el
  pasamanos y la otra con el celular (que la mano no atraviese el caño).
- **La solución ocupa la mitad:** medir en el render que el cartel arranque antes de los 16,3 s y que parte 2 + cierre
  duren ≥ 20 s. Si hay que recortar, se recorta P3 (las dos llamadas sin respuesta pasan a una) o los cortes rápidos de
  P4, nunca el callback de Q3 ni el "A la tarde." de Q5.
- **SFX que no están en assets/sfx** (rueditas de la camilla, ringtone genérico, ruedita suelta, ómnibus por dentro,
  timbre de parada, fibrón en pizarra, matraca): reales con licencia CC0, con autor, sitio y licencia en `fuentes.md`.
  Nunca sintetizados con ffmpeg.

## Voces (partes/*.txt; tonos en partes/lineas.tsv; detalle en partes/voces.md)
Óscar = Charon · Maxi = Puck · Graciela = Gacrux · Walter = Umbriel · Daniel = Schedar (nuevo) · narrador del cartel =
Rasalgethi. 15 archivos; 05-maxi se reusa en Q3.

## Portada
`portada.json`: `chica` "Martes, 10:00." · `grande` "¿Está pronto?" (la frase que el dueño escucha veinte veces por
día) · `sello` "TALLERES". Fondo limpio (sin "TALLERES", burbujas, chips, contador ni logo) del encuadre del cuadro 0
(~1,0 s): Óscar incorporado en la camilla con el celular en la oreja, el auto de Graciela, y arriba el auto de Daniel
clavado en el elevador llenando la mitad de arriba. Si en el render el mejor cuadro es otro (P5: Óscar sentado en la
camilla con la cara de "¡Daniel!" y el auto arriba, ~11 s; o P6, la mirada al auto clavado, ~13 s), cambiar `t` y
`fondo_limpio`.
