# ferreteria-encargo · plan plano por plano · FERRETERÍAS, dolor + solución (3D real), ~40,8 s

**De qué trata.** Sábado 10:00 en "Materiales Gustavo" (el de `corralon-portland`), del lado ferretería del mostrador.
Susana trae en una bolsita de nylon el **cartucho cerámico de 35 mm** de su canilla monocomando, blanco de sarro:
**"Gustavo, ¿tenés este cartucho? Me gotea la canilla."** / **"Ese no me queda. Te lo encargo."** / **"Dejame tu
número."** Arranca un pedazo del **rollo de papel de envolver**, escribe "SUSANA · CARTUCHO 35 · 099 4…" y lo pega con
cinta en la **caja registradora**. Tito: **"Seis tornillos del ocho."** y Gustavo, sin mirar, despega el papelito, hace
el cucurucho, mete los tornillos y se lo da: el número de Susana se va con Tito (lo ve el que mira, no Gustavo). Martes:
llega el cartucho; en la caja registradora solo queda la cinta; Gustavo lo mete en el **cajón ENCARGOS** con otras ocho
piezas sin nombre ("Llegaron y nadie avisó: 9 · $ 14.300"). Tres semanas después: **"Gustavo, ¿llegó lo mío?"** /
Gustavo abre el cajón de las nueve piezas, pausa: **"Elegí."** Remate del remate: **"Ya lo compré."** y otra bolsita
(el flotador de la cisterna): **"¿Me encargás este?"** / Gustavo ya arrancando papel: **"Dejame tu número."** Cartel
**"Un sistema más tarde…"**. Parte 2: el mismo pedido se carga en la tablet y a Susana le llega "Anotamos tu encargo ✓";
el mismo "Seis tornillos del ocho." se envuelve en papel en blanco; el martes, la entrada de mercadería se cruza sola con
el encargo y a Susana, en su cocina con la canilla goteando, le llega "llegó tu cartucho, te lo guardamos hasta el
sábado": **"¡Llegó lo mío!"**; panel "Encargos" ("Llegaron y nadie avisó: 9 → 0", recordatorio automático); el miércoles
el cajón ordenado con nombres, y el mismo "¿Me encargás este?" / "Dejame tu número." recibe **"Ya lo tenés."** Cierre:
Gustavo a cámara: **"Comentá ENCARGO y te mando cómo funciona para tu ferretería."**

- **Producto: automatización + registro de encargos** (sistema a medida de Scalerics, con avisos por WhatsApp): cada
  encargo se carga con **nombre, celular y qué pidió** (y a qué proveedor); cuando se carga la **entrada de mercadería**
  (factura o remito del proveedor, o escaneo), el sistema **la cruza sola con los encargos pendientes** y al cliente le
  llega un **WhatsApp automático** ("llegó lo tuyo, te lo guardamos hasta el sábado"); si no lo retira, **recordatorio**;
  panel **"Encargos": pendientes · avisados · retirados**. **No es agente de IA:** no se nombra así en ningún lado. Se
  nombra en el cartel ("Un sistema más tarde…"), en la línea chica final y en `descripcion.txt`. Nunca "Scalerics" en el
  cartel.
- **Sin marcas:** "Materiales Gustavo" inventado (corralon-portland); cartucho, flotador, llave de paso y blísteres
  genéricos (sin marca de grifería); chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp); tablet y
  celulares sin logo; caja registradora genérica. El número de Susana nunca se ve entero ("099 4…", "099 4·· ···").
- **Sin datos de afuera** (ver `fuentes.md`): $ 780, $ 14.300, 9 piezas, los días y las horas son del caso.
- **Estructura** (la de resto-reservas y taller-esta-pronto): parte 1 **16,2 s** + cartel **2,4 s** + parte 2 **18,6
  s** + cierre **3,6 s** = **40,8 s**. Solución + cierre = 22,2 s (54 %). **Proyecto 3D: copiar `reels/corralon-portland`**
  (Gustavo y Tito ya están en su `assets/tres.js`, el mostrador, el galpón, el cartel MATERIALES GUSTAVO, `crearCelular`,
  la cajonera/monitor del mostrador, gen.mjs con T1/T2, `armar.mjs unir`, procesar.sh de voces). Susana se suma con el
  mismo estilo. **Ojo con el largo:** si pasa de ~42 s, recortar primero P3 (2,2 → 1,8 s), Q4 (3,2 → 2,6) y el
  inserto de Q1; nunca la pausa antes de "Elegí." (mínimo 0,5 s) ni el gesto del cucurucho de P2 (tiene que leerse).
- **Cartel:** time card de siempre: **"Un sistema" / "más tarde…"**. Audio REUSADO de
  `reels/ya-lo-cargo/assets/voice/narrador.wav` (Rasalgethi, "Un sistema más tarde.", 2,26 s; como dice-cuarenta).
- **Quién dice "Comentá ENCARGO": Gustavo**, a cámara (en corralon-portland lo dijo Sofi: se alterna). La palabra
  **ENCARGO** en pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Gustavo encarga y la pieza llega (cumple); "Elegí." es ironía seca contra su propio cajón,
  no contra Susana. Susana es amable, no reprocha, y vuelve a encargarle (confía). Tito solo pidió tornillos y no sabe
  nada. El chiste es contra el papelito, que termina de envoltorio.

## Paleta y set (para "Hechos")
**El galpón de `corralon-portland` (chapa acanalada navy `#1f3254`, cerchas navy3, tubos fluorescentes crema planos,
piso de portland gris claro `#d9d7c9`, cartel de chapa crema "MATERIALES GUSTAVO"), pero DE DÍA y del lado FERRETERÍA:**
el portón al patio queda fuera de cuadro o al fondo con luz de media mañana crema plana (sin cielo de amanecer: es otro
reel), y el protagonista es el mostrador con lo nuevo: **la pared de cajoncitos de tornillos** (cajonera metálica navy3
de 6×8 cajoncitos con frente crema y la medida en Lexend navy: "6", "8", "10", "1/4", "5/16"…), **el panel perforado
crema con blísteres colgados** (sin marcas), **la caja registradora**, **el rollo de papel de envolver con su cuchilla
dentada**, **el cajón ENCARGOS** (un cajón grande abajo del mostrador). Set nuevo chico: **la cocina de Susana** (Q3):
mesada crema, pileta de acero gris plano, la **canilla monocomando** cromada (gris claro plano, sin brillos suaves) que
gotea, azulejos navy claro `#16243d` lisos con junta crema, una ventana con luz crema plana. Anotar en "Hechos":
"lado ferretería del galpón de corralon-portland, de día: pared de cajoncitos de tornillos, panel con blísteres, caja
registradora con el papelito pegado, rollo de papel de envolver, cajón ENCARGOS; cocina de Susana con la canilla que
gotea; parte 2 con interfaz recreada (tablet de encargos, entrada de mercadería que se cruza con los encargos, WhatsApp
automático, panel Encargos); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** "Llegaron y nadie avisó: 9 · $ 14.300", "Cartucho 35 · $ 780: lo
  compró en otro lado", el "?" de P3. **Verde `#5ce611` para lo resuelto:** cada ✓ (Guardar, Anotamos, Aviso enviado,
  Avisada, Retirado), "Llegaron y nadie avisó: 9 → 0", la tarjeta ENCARGO, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. "Dejame tu número." en P1b, P5, Q1 y Q5 en el MISMO lugar y tamaño (que se lea la repetición). "¿Llegó lo
  mío?" (P4) y "¡Llegó lo mío!" (Q3) en el mismo lugar arriba (que se lea que se dio vuelta).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "FERRETERÍAS" en el cuadro 0):
  "Sábado, 10:00." · "Martes, 9:00." · "Tres semanas después." · "Sábado, 10:00." · "Martes, 9:00." · "Miércoles, 18:00.".
  Cambio con flip corto + `k-tick-1`.
- Texto en pantalla: crema sobre navy, navy sobre crema; nunca blanco sobre el piso claro. Rótulos con línea guía en caja
  navy `#0b1220`, texto crema, borde crema de 6 px.

## Personajes
- **Gustavo** (el de corralon-portland, `assets/tres.js`: chaleco acolchado navy, camisa crema, lápiz de carpintero en la
  oreja). Voz Alnilam. Aquí además: **el calibre** (pie de rey gris plano, ≥ 6 px) en P1 y Q1, el lápiz de carpintero
  que baja de la oreja para escribir en P1b. Expresiones: `concentrada` midiendo, `sonrisa` servicial al encargar,
  `neutra` en "Dejame tu número.", P3 `incredula` mirando la caja registradora vacía, P4 `neutra` seca con media sonrisa
  amarga en "Elegí." (sin cara de chiste, sin manos a la cabeza), P5 reflejo automático (ya arrancando papel), parte 2
  `sonrisa`, Q5 se ríe con "Ya lo tenés.", cierre `sonrisa` de colega.
- **Tito** (el de corralon-portland: gorro de lana navy3, campera crema empolvada). Voz Enceladus. Codos en el mostrador
  en P2 y Q2; se va con el cucurucho en la mano (que el cucurucho quede EN su mano, no flotando).
- **Susana · nueva** (clienta, ~60, voz Vindemiatrix): mismo estilo del módulo, parámetros y peinados que ya existen;
  pelo corto canoso con volumen (no casquete), anteojos de lectura colgados de un cordón sobre el pecho (dos aros navy y
  un cordón fino ≥ 6 px; si da problema, sin cordón), saco de lana verde oscuro `#365f28` sobre blusa crema, cartera
  navy al hombro. Que no se parezca a Graciela (Gacrux, pelo rubio) ni a Ceci. Expresiones: `esperanza` en P1/P4,
  `neutra` amable en "Ya lo compré." (sin reproche), `sonrisa` en Q3 y Q5 (media sonrisa pícara en "Ya lo tenés.").
  En Q3, en su cocina, de 3/4 con el celular en la mano.
- **Extras:** uno o dos albañiles de la fila de corralon-portland al fondo, desenfocados (sin voz), en P1, P4 y Q1.

## Objetos 3D (reusados de corralon-portland + nuevos, específicos)
**Reusados:** galpón, mostrador de madera con frente de chapa navy3, cartel MATERIALES GUSTAVO, pizarrón con tiza (al
fondo, como está, sin texto nuevo), `crearCelular`,
el monitor/atril del mostrador (ahora una **tablet en atril**).

**Nuevos:**
- **El cartucho cerámico de 35 mm (EL objeto):** cilindro blanco-crema `#e9e6dc` de ~35 mm de diámetro × ~70 mm de alto,
  con base de plástico navy3 con dos patitas/encastres, cuerpo con dos anillos de goma navy oscuro, y arriba **el
  vástago estriado** de bronce apagado `#b08a4a` (prisma con 8-10 estrías marcadas con geometría). El viejo, con **sarro**:
  manchas blancas tizosas planas y un poco de verde apagado en el vástago. El nuevo, en un **blíster** (cartón crema con
  "CARTUCHO 35 mm" en Lexend navy y la burbuja de plástico translúcido plano, sin brillos suaves). En los insertos ≥ 50 %
  del cuadro: que nadie lo confunda con un tornillo o una bujía.
- **La bolsita de nylon** (P1, P4, P5, Q1, Q5): bolsa transparente plana con nudo arriba (geometría simple con
  transmisión baja o crema translúcido plano), el cartucho adentro. En P5/Q5 la segunda bolsita con **el flotador de la
  cisterna** (bocha de plástico crema con brazo de alambre gris).
- **El calibre** (P1, Q1): pie de rey gris claro, la regla con marcas navy; en el inserto se lee "35".
- **El rollo de papel de envolver** (P1b, P2, P5, Q2): rollo de papel kraft crema `#e8dcc0` en un soporte de hierro navy3
  con la cuchilla dentada (dientes marcados). El papel que se arranca: plano con borde dentado.
- **El papelito:** rectángulo de papel kraft con borde dentado, escrito con lápiz de carpintero (Caveat 700 navy en canvas):
  "SUSANA" / "CARTUCHO 35" / "099 4…" (la tercera línea cortada por el borde). Pegado con **cinta** (franja crema
  translúcida plana) al costado de la caja registradora. En P2 se despega (función del tiempo), se enrolla en **cucurucho**
  (cono) con los 6 tornillos adentro: el cono muestra "SUSANA · CART…" mientras se cierra. En P3 queda solo la cinta.
- **Los tornillos del 8:** 6 tornillos (cabeza + rosca con 4-5 anillos marcados, gris plano) que caen al cucurucho.
- **La caja registradora:** cuerpo crema con teclado navy de botones redondos, cajón de dinero, visor navy con números
  crema; un pedazo de cinta pegada al costado.
- **La pared de cajoncitos de tornillos:** cajonera metálica navy3 con 48 cajoncitos de frente crema, manija navy y la
  medida en Lexend 800 navy ("6", "8", "10", "12", "1/4", "5/16"…); el cajoncito "8" se abre en P2 y Q2.
- **El panel perforado crema con blísteres** (llaves de paso, flexibles, bisagras, sin marca) detrás, a la derecha.
- **El cajón ENCARGOS (el objeto del costo):** cajón grande de madera abajo del mostrador, del lado de Gustavo, con
  "ENCARGOS" escrito a mano con marcador navy en un pedazo de cinta de papel. Parte 1 (P3, P4): adentro, revueltas, **9
  piezas sin nombre** y bien distintas: el cartucho 35 en su blíster, un flotador, una llave de paso de 3/4, 4 bisagras
  cazoleta atadas, un sifón de pileta, una válvula de descarga, una canilla de servicio, una cerradura, un brazo de
  ducha. Que entren y se lean en el plano de P4 (cajón inclinado hacia cámara). Parte 2 (Q5): las mismas piezas, cada
  una en su bolsita con etiqueta crema y nombre ("SUSANA · CARTUCHO 35" adelante).
- **La caja del proveedor** (P3, Q3): caja de cartón crema-ocre con cinta y un remito blanco-crema pegado.
- **La tablet en atril** (Q1-Q5): pantalla canvas.
- **La cocina de Susana** (Q3): mesada, pileta, la **canilla monocomando** con la gota que cae cada ~0,6 s (gota
  emisiva crema-celeste plana, función del tiempo; `gota.wav`).

## Interfaz recreada (canvas en pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Parte 2 · Q1 · tablet "Nuevo encargo"** (encabezado navy "Encargos · Materiales Gustavo"): campos que se llenan con
tipeo: **Cliente:** Susana · **Celular:** 099 4·· ··· · **Pieza:** Cartucho monocomando 35 mm · **Proveedor:** martes ·
botón verde **"Guardar ✓"**. Al tocarlo, el celular de Susana (en su mano, ≥ 45 % del cuadro en el inserto): chat
genérico "Ferretería Gustavo": **"Anotamos tu encargo ✓ Cartucho 35 mm. Te avisamos cuando llegue."** Rótulo: **"Cada
encargo, con nombre y celular"**.
**Q3 · tablet "Entrada de mercadería"**: "Remito · proveedor · martes 9:00" → fila **"Cartucho monocomando 35 mm × 1"**
→ tarjeta verde **"Coincide con 1 encargo: Susana"** → **"Aviso enviado ✓"**. Rótulo: **"Cuando entra la mercadería,
avisa solo"**. Celular de Susana: **"Susana, llegó tu cartucho de 35 ✓ Te lo guardamos hasta el sábado. · Ferretería
Gustavo"** con la hora "9:02".
**Q4 · panel "Encargos"** (tablet a ≥ 70 %): tres columnas con contador: **Pendientes 4 · Avisados 3 · Retirados 12**;
filas "Susana · Cartucho 35 · Avisada ✓", "Ramírez · Llave de paso 3/4 · Pendiente · llega jueves", "Pereira · Bisagras
×4 · Retirado ✓"; abajo **"Jueves: recordatorio a los que no retiraron ✓"**; arriba, el contador **"Llegaron y nadie
avisó: 9 → 0"** (baja con tic, queda verde). Rótulo: **"Si no lo retira, se lo recuerda"**.
**Q5 · tablet:** "Susana · Cartucho 35 · Retirado ✓" y después **"Nuevo encargo · Susana · Flotador de cisterna ✓"** (los
datos de Susana se completan solos: el chiste de "Ya lo tenés.").
**Tarjeta de cierre (HTML, ~3,6 s, sobre Gustavo a cámara):** abajo de la cara, en el 80 % seguro: "Comentá" (Lexend 800
crema ~90 px) / **"ENCARGO"** (Lexend 900 ~170 px, navy en el recuadro verde) / "y te mando cómo funciona para tu
ferretería" (Lexend 600 crema ~46 px, 2 líneas) / "Registro de encargos con aviso automático por WhatsApp" (~38 px) /
**"scalerics.com"** en verde (~44 px). Entra sobre "ENCARGO" de la voz.

## PARTE 1 · el problema (0,00-16,20 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-4,70 | **P1 · cuadro 0.** Plano medio desde el lado del cliente, por encima del hombro de Susana: Gustavo de frente atrás del mostrador, la pared de cajoncitos detrás, la caja registradora y el rollo de papel en el mostrador. Push-in lento a las manos. | **Cuadro 0:** "FERRETERÍAS" (Lexend 900 ~130 px, ya entero) y el chip "Sábado, 10:00."; Susana ya levanta la bolsita con el cartucho con sarro; la burbuja asomando. 0,15-2,75 · **Susana: "Gustavo, ¿tenés este cartucho? Me gotea la canilla."** · 2,0 · Gustavo saca el cartucho y lo mide (inserto 0,4 s del calibre "35") · 2,95-4,55 · **Gustavo: "Ese no me queda. Te lo encargo."** | galpón, mostrador, cajonera, caja registradora, rollo, Susana, Gustavo, bolsita, cartucho, calibre | ambiente de ferretería (zumbido de tubo, murmullo bajo, `llaves.wav` lejos) · nylon de la bolsita (`k-bolsa-m`) 0,2 · `k-metal-click` del calibre 2,3 |
| 4,70-6,30 | **P1b.** Inserto/plano corto de las manos sobre el mostrador. | 4,75 · arranca el papel (cuchilla) · 4,80-5,70 · **Gustavo: "Dejame tu número."** · escribe con el lápiz de carpintero (se escribe letra por letra) · 5,9 · lo pega con cinta en la caja registradora; el papelito se lee ≥ 44 px. | rollo, papelito, lápiz, caja registradora, cinta | papel que se arranca contra la cuchilla (CC0) 4,75 · lápiz sobre papel (`birome.wav` de resto-reservas, CC0) 5,0-5,8 · cinta (CC0) 6,0 |
| 6,30-8,40 | **P2 · la pérdida.** Plano medio de frente, más abierto: Tito con los codos en el mostrador, la caja registradora con el papelito en primer término a la derecha. | 6,40-7,70 · **Tito: "Seis tornillos del ocho."** · 7,0 · Gustavo abre el cajoncito "8", saca 6 · 7,3 · sin mirar, despega el papelito de la caja · 7,6 · inserto 0,4 s: "SUSANA · CARTUCHO 35" se enrolla en cucurucho con los tornillos · 8,0 · se lo da; Tito se va. | Tito, Gustavo, cajonera, tornillos, papelito → cucurucho, caja registradora | cajoncito metálico (`k-metal-liviano-2`) 7,0 · tornillos que caen (`k-metal-medio-1` ×2 bajo) 7,7 · papel que se dobla (`k-cloth_1`) 7,4 · `madera-golpe` codos 6,3 |
| 8,40-10,60 | **P3 · martes.** Plano medio desde atrás del mostrador (contraplano): la caja del proveedor abierta, Gustavo con el blíster del cartucho 35 en la mano mira la caja registradora: solo la cinta. Panea hacia abajo al cajón ENCARGOS que se abre. | Chip "Martes, 9:00." (flip). 8,6 · saca el blíster · 9,0 · mira la caja registradora: burbuja muda "?" (rojo apagado) · 9,5 · abre el cajón: 8 piezas sin nombre; mete el cartucho (9 piezas) · 10,0 · rótulo **"Llegaron y nadie avisó: 9 · $ 14.300"** (rojo apagado) con línea guía al cajón. | caja del proveedor, blíster, caja registradora con la cinta, cajón ENCARGOS con 9 piezas | cartón que se abre (`k-cloth_2`) 8,45 · `k-tick-1` en el chip · cajón de madera que se abre (`k-creak` + `madera-tabla`) 9,5 · pop del rótulo |
| 10,60-13,20 | **P4 · el remate.** EL MISMO encuadre del cuadro 0 (por encima del hombro de Susana). Al "Elegí.", el cajón inclinado hacia cámara llena la mitad de abajo; Gustavo de frente arriba. | Chip "Tres semanas después." 10,75-12,05 · **Susana: "Gustavo, ¿llegó lo mío?"** · 12,1 · Gustavo abre el cajón hacia ella · pausa · 12,65-13,15 · **Gustavo: "Elegí."** (seco). | Susana, Gustavo, cajón ENCARGOS con 9 piezas | cajón que se abre 12,1 · nada encima de "Elegí." (la música baja) |
| 13,20-16,20 | **P5 · remate del remate.** Contraplano corto a Susana (amable) y vuelta al plano de manos. | 13,35-14,15 · **Susana: "Ya lo compré."** · 13,6 · rótulo **"Cartucho 35 · $ 780: lo compró en otro lado"** (rojo apagado) · 14,2 · levanta otra bolsita: el flotador · 14,35-15,25 · **Susana: "¿Me encargás este?"** · 15,2 · Gustavo, de reflejo, arranca papel · 15,35-16,10 · **Gustavo: "Dejame tu número."** · 16,15 stinger. | Susana, bolsita con flotador, rollo, papel, Gustavo | nylon 14,2 · papel contra la cuchilla 15,2 · **stinger** 16,15 (la música se corta seca) |

Último cuadro (16,20) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,20-18,60 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un sistema"** / **"más
tarde…"**. Audio de `reels/ya-lo-cargo/assets/voice/narrador.wav` (Rasalgethi). Nunca "Scalerics".

## PARTE 2 · la solución (18,60-37,20 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,60-23,00 | **Q1 · el mismo cuadro 0.** Mismo encuadre que P1; al lado de la caja registradora, la tablet en atril. Push-in a la tablet (≥ 60 %) a 21,2; inserto al celular de Susana a 22,4. | Chip "Sábado, 10:00." 18,75-21,35 · **el mismo audio de Susana** · 20,4 · Gustavo mide ("35") y toca "Nuevo encargo" · 21,45-22,35 · **el mismo "Dejame tu número."** mientras se llenan los campos · 22,45 · "Guardar ✓" · 22,6 · ding en el celular de Susana: "Anotamos tu encargo ✓". Rótulo "Cada encargo, con nombre y celular". | ídem P1 + tablet, celular de Susana | ambiente igual que P1 · `key-press` ×4 · `click-soft` 22,45 · `notification` 22,6 |
| 23,00-25,00 | **Q2 · el papel en blanco.** EL MISMO encuadre de P2. | 23,10-24,40 · **el mismo audio de Tito** · 24,0 · Gustavo arranca papel del rollo y hace el cucurucho: inserto 0,4 s, **el papel en blanco** · 24,7 · Tito se va. | Tito, Gustavo, cajoncito 8, tornillos, papel en blanco | los mismos de P2 |
| 25,00-29,80 | **Q3 · martes, solo.** EL MISMO encuadre de P3: la caja del proveedor; Gustavo carga el remito en la tablet (inserto ≥ 60 %) → "Coincide con 1 encargo: Susana" → "Aviso enviado ✓". Travelling: el aviso sale de la tablet y la cámara lo sigue (Catmull-Rom) hasta la cocina de Susana: la canilla goteando en primer plano, Susana de 3/4 con el celular (≥ 45 %). | Chip "Martes, 9:00." 25,4 · fila "Cartucho monocomando 35 mm × 1" · 26,2 · "Coincide con 1 encargo: Susana" · 26,7 · "Aviso enviado ✓" · rótulo "Cuando entra la mercadería, avisa solo" · 27,2 · whoosh · 27,9 · el celular: "Susana, llegó tu cartucho de 35 ✓ Te lo guardamos hasta el sábado." · 28,60-29,50 · **Susana: "¡Llegó lo mío!"** (contenta; burbuja en el lugar de "¿Llegó lo mío?"). | caja, blíster, tablet; cocina, canilla, gota, Susana, celular | cartón 25,05 · `click-soft` 25,4 · `ding` 26,2 · `cero.mp3` 26,7 · whoosh 27,2 · `gota.wav` cada ~0,6 s en la cocina · `notification` 27,9 |
| 29,80-33,00 | **Q4 · el panel.** La tablet a ≥ 70 % en el atril (el mostrador y la cajonera alrededor, nunca pantalla lisa). Push-in leve. | Las columnas se llenan con tic; "Llegaron y nadie avisó: 9 → 0" (30,6-31,6, el 0 en verde) · 31,9 · "Jueves: recordatorio a los que no retiraron ✓" · rótulo "Si no lo retira, se lo recuerda". | tablet, atril, mostrador | `k-tick-1` por salto · `cero.mp3` en el 0 · `ding` 31,9 |
| 33,00-37,20 | **Q5 · miércoles.** EL MISMO encuadre de P4: Gustavo abre el cajón ENCARGOS, ahora ordenado con bolsitas con nombre, y le da a Susana la suya sin buscar. | Chip "Miércoles, 18:00." 33,3 · el cajón · 33,6 · la bolsita "SUSANA · CARTUCHO 35" pasa de mano · tablet "Retirado ✓" · 33,9 · Susana levanta la bolsita del flotador · 34,00-34,90 · **el mismo "¿Me encargás este?"** · 35,10-36,00 · **el mismo "Dejame tu número."** · 36,20-37,00 · **Susana: "Ya lo tenés."** (señala la tablet, media sonrisa) · 36,8 · tablet "Nuevo encargo · Susana · Flotador de cisterna ✓" · Gustavo se ríe. | Susana, Gustavo, cajón ordenado, bolsitas con etiqueta, tablet | cajón 33,3 · nylon 33,6 · `cero.mp3` en Retirado ✓ · `click-soft` 36,8 |

## CIERRE (37,20-40,80 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,20-40,80 | **C · Gustavo a cámara.** Primer plano de frente atrás del mostrador, la pared de cajoncitos y el panel de blísteres detrás (nunca pared lisa). Push-in suave. | 37,35-40,65 · **Gustavo: "Comentá ENCARGO y te mando cómo funciona para tu ferretería."** (de colega, media sonrisa) · sobre "ENCARGO" entra la tarjeta abajo de la cara; en los últimos 0,8 s la línea chica "Registro de encargos con aviso automático por WhatsApp" / "scalerics.com". | pop en "ENCARGO" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "FERRETERÍAS" entero y legible, sin tapar la cara de Gustavo; la bolsita con el cartucho se entiende en
  el plano medio (cartucho grande, ≥ 8 % del ancho; si no, inserto en el segundo 1).
- **Se entiende sin sonido:** burbujas de las 11 líneas; el papelito legible en P1b; el cucurucho que se lleva "SUSANA"
  legible en el inserto de P2 (es el corazón del chiste: si no se lee, el reel no funciona); chips; rótulos; tablet y
  celulares legibles.
- **Continuidad:** P1 = Q1, P2 = Q2, P3 = Q3, P4 = Q5 en encuadre; el cajón con 9 piezas en P3 y P4 (contarlas); el
  papelito desaparece de la caja registradora en P2 y en P3 solo queda la cinta; la tablet NO existe en la parte 1.
- **Física:** el cucurucho en la mano de Tito (no flota); la cinta no atraviesa la caja; el calibre no atraviesa el
  cartucho; las piezas del cajón no se atraviesan entre sí; la gota cae de la boca de la canilla.
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX que no estén en assets/sfx** (papel contra la cuchilla dentada, cinta adhesiva, tornillos en papel): reales con
  licencia CC0 (BigSoundBank o Freesound CC0), con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados.

## Voces (partes/*.txt; detalle en partes/voces.md)
Gustavo = Alnilam · Tito = Enceladus · Susana = Vindemiatrix (nueva) · narrador del cartel = Rasalgethi (audio reusado de
ya-lo-cargo). 11 archivos a generar; `01-susana`, `03-gustavo`, `04-tito` y `08-susana` se reusan en la parte 2.

## Portada
`portada.json`: `chica` "Tres semanas después." · `grande` **"¿Llegó lo mío?"** · `sello` **"FERRETERÍAS"**. Fondo limpio
(sin gancho, burbujas, chips, rótulos ni logo) de P4 (~12,3 s): Gustavo abriendo el cajón ENCARGOS con las nueve piezas
sin nombre y Susana de espaldas a 3/4, todo en la mitad de arriba. Alternativa: el inserto de P2 con el cucurucho
"SUSANA · CARTUCHO 35" en la mano de Tito (chica "Sábado, 10:00."). Ajustar `t` y `fondo_limpio` con el render.
