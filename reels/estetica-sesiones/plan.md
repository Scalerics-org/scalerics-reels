# estetica-sesiones · plan plano por plano · CENTROS DE ESTÉTICA, dolor + solución (3D real), ~39,4 s

**De qué trata.** Jueves 18:00 en "Lorena Estética" (el centro de `estetica-turnos`). Carolina, sentada en la camilla
con las gafas de láser en la frente, a mitad de su paquete de 10 sesiones de **depilación láser de piernas** (pagado por
adelantado): **"Lore, ¿cuántas me quedan?"** / Lorena, con el cuaderno de paquetes: **"Dejame ver."** El cuaderno tiene
nueve palitos: **"Según el cuaderno, una."** Carolina, de buena fe, saca la tarjetita de cartón: **"¿Una? Acá tengo
siete sellos."** Pausa muda: Lorena mira a Vale; Vale señala su post-it en el equipo láser: ocho palitos. Tres papeles,
tres números (1 · 3 · 2). Lorena: **"Hagamos el promedio."** / Carolina: **"¿Y cuánto da?"** / pausa / **"Tres."** (el
promedio daba 2). Rótulo: "Este mes: 8 sesiones regaladas por las dudas · $ 14.400". Remate del remate: **"Vale, ¿y la
de Jimena?"** y Vale gira el equipo: el otro costado forrado de post-its; "6 paquetes terminados · nadie les avisó · no
renovaron". Cartel **"Un sistema más tarde…"**. Parte 2 (más de la mitad del reel): el mismo jueves 18:00, Vale toca
"Asistió" y la ficha de Carolina baja sola de 4 a 3 con tilde; a Carolina le llega "Sesión 7 de 10 hecha ✓ Te quedan
3." y el MISMO "Lore, ¿cuántas me quedan?" se contesta solo: **"Ah. Tres."** / Lorena: **"Tres. Sin promedio."**; el
MISMO "Vale, ¿y la de Jimena?" se contesta girando la tablet (el equipo limpio; Vale tira el último post-it); dos meses
después a Carolina le llega "te queda 1, ¿renovás?", paga con el botón y guarda la tarjetita en el cajón: **"Chau,
tarjetita."**; el panel de paquetes ("Sesiones regaladas por las dudas: 0"). Cierre: Lorena a cámara: **"Comentá
SESIONES y te mando cómo funciona para tu centro de estética."**

- **Producto: sistema a medida para el centro: la ficha de cada clienta con su paquete de sesiones.** Al vender el
  paquete se carga en la ficha (servicio, cantidad, pagado); al marcar la asistencia en la agenda/tablet la sesión **se
  descuenta sola**; a la clienta le llega por WhatsApp **cuántas lleva y cuántas le quedan**; cuando le queda **1**, le
  llega el **aviso para renovar con botón de pago**; la dueña ve en un **panel** los paquetes activos, las sesiones
  usadas y los que están por terminar. NO es agente de IA: no se nombra así en ningún lado. El cartel dice "Un sistema";
  nunca "Scalerics".
- **Sin marcas:** "Lorena Estética" inventado; equipo láser genérico (torre crema y navy sin logo ni nombre de modelo);
  chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp; "WhatsApp" solo en descripcion.txt); botón
  de pago sin logos de tarjetas ni de procesadora; post-its crema y verde pálido (no amarillo de marca conocida).
- **Sin datos de afuera** (ver `fuentes.md`): $ 1.800 por sesión, paquete de 10 a $ 18.000, 8 sesiones regaladas
  ($ 14.400), 6 paquetes terminados sin renovar, los números del panel: todo del caso.
- **Estructura** (la de `resto-reservas` / `estetica-turnos`): parte 1 **16,2 s** + cartel **2,4 s** + parte 2 **17,0 s**
  + cierre **3,8 s** = **39,4 s**. Solución + cierre = 20,8 s (53 %). Un proyecto 3D con gen.mjs (T1/T2) y
  `armar.mjs unir`, **copiando el proyecto de `reels/estetica-turnos`** (mismo set, mismos personajes; su
  `assets/personajes.js` ya tiene a Lorena, Vale y Carolina). **Ojo con el largo:** si pasa de ~42 s, recortar primero
  Q4 (panel, 3,0 → 2,2 s) y el inserto del cuaderno de P2; nunca la pausa muda de P4 (mínimo 1,2 s) ni la de antes de
  "Tres." (mínimo 0,5 s). Medir que el cartel arranque antes de los 17 s y que parte 2 + cierre duren ≥ 20 s.
- **Cartel:** el time card de siempre: **"Un sistema" / "más tarde…"**. Audio REUSADO de
  `reels/ya-lo-cargo/assets/voice/narrador.wav` (Rasalgethi, "Un sistema más tarde.", 2,26 s). Ojo: `ferreteria-encargo`
  (misma corrida) usa el mismo cartel; no publicarlos pegados.
- **Quién dice "Comentá SESIONES": Lorena**, a cámara, en la recepción (de dueña a dueña, como Raúl en resto-reservas).
  La palabra **SESIONES** en pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Carolina no inventa (su tarjetita dice 7 y lo muestra de buena fe; en la parte 2 renueva
  feliz); el cuaderno dice 9 y Vale anotó 8: cada una contó bien en su papel; lo que falla es que son tres papeles.
  Lorena elige no discutir con una buena clienta y lo hace con humor. El chiste es contra el cuaderno, la tarjetita y
  los post-its.

## Paleta y set (para "Hechos")
**El centro de `estetica-turnos`, de tarde: gabinete y recepción crema `#efeee5` con zócalo y muebles navy
`#16243d`/`#1f3254`, persiana con la luz en franjas planas, toallas blanco-crema, acentos verde `#5ce611`.** Lo nuevo:
**el equipo de depilación láser** al lado de la camilla (protagonista de la parte 1), **el cuaderno de paquetes**, **la
tarjetita de cartón con sellos**, **los post-its** (uno en P1-P4, decenas en P6) y **las gafas de láser** de Carolina;
en la parte 2, **la tablet en el carrito** (gabinete) y **en el atril** (recepción), y el **living de Carolina** (el de
Graciela de estetica-turnos con otro almohadón y una mesita con cajón). Los dos cisnes de toalla de estetica-turnos
quedan de adorno en el estante de la recepción (guiño de serie, sin chiste). Anotar en "Hechos": "gabinete crema de
estetica-turnos con el equipo láser forrado de post-its, cuaderno de paquetes y tarjetita de sellos; parte 2 con
interfaz recreada (ficha de la clienta con su paquete, WhatsApp 'te quedan 3', aviso de renovación con botón de pago,
panel de paquetes); cartel verde".
- **Texto en pantalla:** navy sobre crema, crema sobre navy; nunca blanco sobre la pared crema. Rótulos con línea guía
  en caja navy `#0b1220`, texto crema, borde crema de 6 px.
- **Rojo apagado `#c7655b` SOLO para el problema:** "Cuaderno: 1 · Tarjetita: 3 · Post-it: 2" (los tres números),
  "El promedio daba 2.", "Este mes: 8 sesiones regaladas por las dudas · $ 14.400", "6 paquetes terminados · nadie les
  avisó · no renovaron". **Verde `#5ce611` para lo resuelto:** cada ✓, "Te quedan: 4 → 3", "Pagado ✓", el botón
  "Renovar y pagar", "Renovaron: 4", "Sesiones regaladas por las dudas: 0", la tarjeta SESIONES, el recuadro de
  selección de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  "Lore, ¿cuántas me quedan?" en P1 y Q1 con la MISMA burbuja (mismo lugar, mismo tamaño). "Vale, ¿y la de Jimena?" en
  P6 y Q2 igual. "Tres." (P5) y "Tres. Sin promedio." (Q1) en el mismo lugar sobre Lorena.
- **Chips de hora** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "CENTROS DE ESTÉTICA" en el cuadro 0):
  "Jueves, 18:00." · "Jueves, 18:00." (Q1) · "Jueves, 18:30." · "Dos meses después." · (Q4 sin chip). Flip corto +
  `k-tick-1`.

## Personajes (copia local de `reels/estetica-turnos/assets/personajes.js`)
- **Lorena = ELENCO.lorena** (melena castaño cobrizo, chaqueta navy3 con la franja verde). Voz Kore. P1-P6 con el
  **cuaderno de paquetes** en la mano izquierda y la birome en la derecha; `concentrada` (P1-P2), `sorpresa` leve al ver
  la tarjetita (P3), mira a Vale (P4), `sonrisa` de anfitriona en P5 (nada de enojo: se rinde con gracia), `neutra` seca
  en P6. Parte 2: `sonrisa`, manos libres (sin cuaderno). Cierre: `sonrisa` de colega, a cámara.
- **Carolina = ELENCO.carolina** (coleta rubia, campera crema con cuello navy, cartera verde oscuro). Voz Leda. En P1-P5 y
  Q1 **sentada en la camilla** (respaldo levantado), la campera colgada en el perchero, remera crema, **toalla
  blanca sobre las piernas** (no se ven las piernas; nada que sexualice), las **gafas de láser** en la frente. P3: saca
  la tarjetita de la cartera que tiene al lado, la muestra con la mano extendida hacia Lorena, `sorpresa` simpática
  (nunca reclamo). P5: `esperanza` en "¿Y cuánto da?", `feliz` con "Tres.". Q1: lee el celular, `sonrisa`. Q3: en el
  sillón de su living, campera puesta, `feliz`; la tarjetita la mira con cariño (`sonrisa`) antes de guardarla.
- **Vale = ELENCO.vale** (coleta alta negra, ambo verde). **Sin voz** (como en estetica-turnos): todo con gestos. P1: en
  el banquito con el cabezal del láser. P4: señala el post-it con el cabezal o con el dedo, `neutra` (cara de "yo tengo
  el mío"). P6: se levanta y gira el equipo láser sobre sus ruedas para mostrar el costado de post-its, `resignado`.
  Q1: toca "Asistió" en la tablet del carrito. Q2: gira la tablet hacia Lorena, despega el último post-it y lo tira al
  tacho (`sonrisa` chica).
- **Jimena:** solo nombre (en el post-it "JIME", en la ficha de Q2). No aparece.

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/estetica-turnos`): el gabinete (paredes crema, zócalo navy, persiana con franjas de luz,
planta, cuadrito), la camilla con la sábana, el carrito auxiliar con frascos sin marca, el banquito de Vale, el estante
de toallas, la recepción (mostrador navy con tapa crema, tablet en atril, puerta de vidrio con "Lorena Estética"), los
dos cisnes de toalla (adorno en el estante de la recepción, parte 2), `crearCelular`, el living de Graciela (para
Carolina en Q3, con otro almohadón y una mesita con cajón). **La lámpara lupa queda en un rincón apagada** (acá el
protagonista es el láser; que no se confundan).

**Nuevos** (específicos, que nadie los confunda):
- **El equipo de depilación láser (protagonista de P1-P6, Q1-Q2):** torre vertical de ~1,1 m sobre cuatro ruedas,
  carcasa crema `#efeee5` con frente navy `#1f3254` redondeado, **pantalla táctil inclinada arriba** (canvas: un menú
  genérico con "Piernas" y unos niveles en barras verdes, sin marca), **cabezal tipo pistola** navy con la punta crema y
  ventana verde oscuro, colgado de un soporte al costado con su **cable espiralado grueso** (tubo de 8 px de radio a la
  vista, que no atraviese la camilla ni a Vale), un **botón de emergencia** rojo apagado arriba. Los **costados son
  planos** (ahí van los post-its). Que se lea "láser de estética" y no "monitor de hospital": formas suaves, crema,
  nada de cables médicos ni pantallas con curvas de pulso.
- **Las gafas de láser:** gafas envolventes de lente verde oscuro opaco `#365f28` y patillas navy, en la frente de
  Carolina (P1-P5, Q1). Que no atraviesen el pelo ni la coleta.
- **El cuaderno de paquetes (P1-P6):** cuaderno espiralado A5, **tapa verde apagado `#3fa60a` gastada con "PAQUETES"** en
  etiqueta crema escrita a mano, hojas crema con renglones navy (≥ 4 px en el inserto), separadores de colores asomando
  (crema, navy, verde pálido). La página de Carolina (Caveat 700 navy, en canvas): **"CAROLINA · LÁSER PIERNAS · PAQ. 10
  · PAGÓ ✓"** y abajo **nueve palitos** en dos grupos (|||| tachado de a cinco + ||||), uno en birome verde, uno con un
  "?" al lado, una **aureola de café** traslúcida plana. Que se lea "9" sin contar con lupa: el palito de cinco tachado.
- **La tarjetita de cartón (P3, Q3):** cartón crema de 8,5 x 5,5 cm, doblada al medio (la marca del doblez y una
  esquina gastada), impresa: **"Lorena Estética · Láser piernas · 10 sesiones"** y una grilla de **10 casilleros**:
  **7 con un sello de hojita verde** (sellos levemente torcidos, uno corrido) y **3 vacíos**. En el inserto de P3 a
  ≥ 60 % del cuadro, que se cuenten los 7. Es un comprobante del paquete, no de fidelización: sin "premio".
- **El post-it de Vale (P1-P4):** post-it crema-verde pálido `#e3f2c8` pegado en el costado del equipo, escrito en birome
  navy (Caveat): **"CARO"** y **ocho palitos** (|||| tachado + |||). Con la esquina levantada (curva leve).
- **El costado de post-its (P6, EL gag del remate del remate):** el otro costado del equipo forrado de **30-40 post-its**
  crema y verde pálido, superpuestos y algo torcidos, cada uno con un nombre y palitos ("JIME ||||", "PATO |||||||",
  "MÓNICA ?", "SOFÍA |||| |", "LU ||"); rotaciones y alturas con semilla fija; algunos con la esquina levantada. Que se
  lea como "un sistema de post-its" de lejos y que 4-5 nombres se lean de cerca. Vale gira el equipo ~180° sobre las
  ruedas (función pura del tiempo, sin que la torre atraviese la camilla ni el carrito).
- **El tacho (Q2):** papelera chica navy con tapa a pedal al lado del carrito; el último post-it cae adentro.
- **La tablet del carrito (Q1-Q2):** tablet sin logo en una funda navy apoyada en el carrito; pantalla canvas con la
  ficha. **La tablet del atril** (Q4): la de estetica-turnos.
- **El celular de Carolina** (crearCelular, funda verde oscuro, la de estetica-turnos): Q1 en la mano, Q3 en el living.
- **La mesita con cajón del living (Q3):** mesita navy chica con un cajón que se abre y se cierra; adentro, otras
  cosas planas (un sobre crema, una birome) para que no quede un cajón vacío.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Parte 1 · rótulos** (caja navy, texto crema, borde crema, línea guía): P2 al cuaderno **"Cuaderno: queda 1"**; P3 a la
tarjetita **"Tarjetita: quedan 3"**; P4 al post-it **"Post-it: quedan 2"** (los tres números en rojo apagado; en P4 los
tres rótulos a la vez, cada uno con su línea guía a su papel). P5, después de "Tres.": chico **"El promedio daba 2."** y
**"Este mes: 8 sesiones regaladas por las dudas · $ 14.400"**. P6, a los post-its: **"6 paquetes terminados · nadie les
avisó · no renovaron"**.
**Parte 2 · Q1 · la ficha** (tablet del carrito, inserto ≥ 65 %): encabezado navy **"Carolina · Láser piernas"**;
debajo "Paquete de 10 · pagado ✓"; una fila de **10 círculos**: 6 llenos en navy, el 7.º se llena en verde con tilde al
tocar "Asistió"; un contador grande **"Te quedan: 4 → 3"** (baja con tic, queda verde); abajo, chico: "Enviado a
Carolina ✓". Después, el **celular de Carolina** (inserto ≥ 60 %): chat genérico, encabezado navy "Lorena Estética":
**"Hola, Carolina. Sesión 7 de 10 hecha ✓ Te quedan 3."** Rótulo: **"Cada sesión se descuenta sola"**.
**Parte 2 · Q2 · la tablet girada hacia Lorena:** **"Jimena · Láser axilas · 5 de 10 · quedan 5"** con su fila de
círculos (5 llenos).
**Parte 2 · Q3 · el aviso de renovación** (celular de Carolina ≥ 65 %): **"Hola, Carolina. Hoy hiciste la 9 de 10: te
queda 1. ¿Renovás tu paquete?"** · tarjeta "Láser piernas · 10 sesiones · $ 18.000" · botón verde **"Renovar y pagar"** ·
toca · pantalla de pago genérica de un toque ("Lorena Estética · $ 18.000 · Confirmar") · **"Pagado ✓ · Paquete nuevo:
10 sesiones"** · chico: "Arranca después de la que te queda". Rótulo: **"Con 1 sesión, le avisa para renovar"**.
**Parte 2 · Q4 · el panel "Paquetes"** (tablet del atril ≥ 70 %): **"Activos: 42"** · **"Sesiones descontadas este mes:
96 ✓"** · **"Por terminar: 5 · aviso enviado ✓"** · **"Renovaron: 4"** · y abajo, grande y verde, **"Sesiones regaladas
por las dudas: 0"**. Las filas entran de a una con tic.
**Tarjeta de cierre (HTML, ~3,8 s, sobre Lorena a cámara):** abajo de la cara (nunca encima), en el 80 % seguro:
"Comentá" (Lexend 800 crema sobre caja navy, ~90 px) / **"SESIONES"** (Lexend 900 ~150 px, navy en el recuadro verde de
selección; que entre entero en el ancho seguro) / "y te mando cómo funciona para tu centro de estética" (Lexend 600
~46 px, 2 líneas) / en los últimos 0,8 s: "La ficha de cada clienta con su paquete, que se descuenta sola" (~38 px) /
**"scalerics.com"** en verde (~44 px). Entra sobre "SESIONES" de la voz.

## PARTE 1 · el problema (0,00-16,20 s)
Cámara continua en el gabinete. Eje: la camilla en diagonal al centro con Carolina sentada, el equipo láser a la derecha
de la camilla (costado con el post-it hacia cámara), Vale en el banquito entre los dos, Lorena en la puerta a la
izquierda en primer término.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,30 | **P1 · cuadro 0.** Desde la puerta, por encima del hombro de Lorena: Carolina en la camilla con las gafas en la frente, Vale con el cabezal, el equipo láser prendido. Push-in lento. | **Cuadro 0:** arriba, enorme, **"CENTROS DE ESTÉTICA"** (Lexend 900 ~120 px, navy sobre la pared crema, "ESTÉTICA" en el recuadro verde) y el chip "Jueves, 18:00."; la burbuja de Carolina ya asomando. 0,20-1,60 · **Carolina: "Lore, ¿cuántas me quedan?"** 1,70 · Lorena abre el cuaderno y hojea. 1,90-2,60 · **Lorena: "Dejame ver."** | gabinete, camilla, Carolina con gafas y toalla, Vale, equipo láser con cabezal y cable, post-it, Lorena, cuaderno | música liviana tipo spa bajita · zumbido suave del equipo · el "pip" del cabezal (CC0) ×2 · hojas del cuaderno (`k-page-turn`) 1,80 |
| 3,30-5,60 | **P2 · el cuaderno.** Inserto del cuaderno abierto en las manos de Lorena (≥ 60 %), la página de Carolina; el dedo de Lorena cuenta los palitos. | 3,60 · rótulo **"Cuaderno: queda 1"**. 4,20-5,40 · **Lorena: "Según el cuaderno, una."** | cuaderno, manos de Lorena, birome | pop del rótulo |
| 5,60-8,40 | **P3 · la tarjetita.** Contraplano: Carolina se incorpora, saca la tarjetita de la cartera y la extiende hacia Lorena; inserto de la tarjetita (≥ 60 %) de 0,8 s. | 5,80-7,60 · **Carolina: "¿Una? Acá tengo siete sellos."** (sorpresa simpática). 7,60 · inserto: 7 sellos, 3 vacíos · rótulo **"Tarjetita: quedan 3"**. | Carolina, cartera, tarjetita, camilla | cierre de cartera (CC0) 5,70 · cartón (`k-cloth_1` corto o papel CC0) 7,50 · pop del rótulo |
| 8,40-10,20 | **P4 · la pausa muda.** Plano general del gabinete: Lorena con el cuaderno a la izquierda, Carolina con la tarjetita en el centro, Vale y el equipo con el post-it a la derecha. Lorena mira a Vale; Vale señala el post-it. Cámara quieta. | La música baja a -12 dB en 0,4 s (no se corta). 8,90 · Vale señala · 9,10 · rótulo **"Post-it: quedan 2"** · 9,40 · los tres rótulos juntos, cada uno a su papel. | todo el gabinete, post-it | zumbido del equipo · pop chico por rótulo · nada encima |
| 10,20-13,60 | **P5 · el remate.** Primer plano de Lorena (la camilla con Carolina desenfocada detrás). Al "¿Y cuánto da?", contraplano corto de Carolina esperanzada; vuelve a Lorena. | 10,40-11,60 · **Lorena: "Hagamos el promedio."** 11,80-12,50 · **Carolina: "¿Y cuánto da?"** · pausa 0,5 s (Lorena cierra el cuaderno) · 13,00-13,40 · **Lorena: "Tres."** · 13,40 · rótulos "El promedio daba 2." y **"Este mes: 8 sesiones regaladas por las dudas · $ 14.400"**. | Lorena, cuaderno, Carolina | cuaderno que se cierra (CC0 o `k-page-turn` corto) 12,90 · pop de rótulos |
| 13,60-16,20 | **P6 · remate del remate.** Plano medio del equipo láser con Vale; Lorena en primer término de espaldas. Vale se levanta y gira la torre sobre sus ruedas: aparece el costado forrado de post-its; push-in corto a los post-its. | 13,70-14,90 · **Lorena: "Vale, ¿y la de Jimena?"** · 15,00-15,60 · Vale gira el equipo · 15,70 · rótulo **"6 paquetes terminados · nadie les avisó · no renovaron"** · 16,05 stinger. | equipo láser girando, post-its, Vale, Lorena | ruedas sobre el piso (CC0) 15,00 · post-its que aletean (papel CC0, muy corto) 15,50 · stinger 16,05 |

Último cuadro (16,20) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,20-18,60 s)
Time card de dibujito de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan, -4°: **"Un sistema"**
/ **"más tarde…"**. Audio de `reels/ya-lo-cargo/assets/voice/narrador.wav`. Nunca "Scalerics". 2,4 s.

## PARTE 2 · la solución (18,60-35,60 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,60-24,20 | **Q1 · callback del cuadro 0.** EL MISMO encuadre de P1: Carolina en la camilla con las gafas en la frente, Vale termina y toca la tablet del carrito; el equipo láser con el costado LIMPIO (sin post-it). Push-in a la tablet (inserto de la ficha), después al celular de Carolina. | Chip "Jueves, 18:00." 18,80 · Vale toca **"Asistió"** · 19,00-19,80 · el 7.º círculo se llena con tilde, **"Te quedan: 4 → 3"**. 19,90 · vibra el celular de Carolina. 20,00-21,40 · **Carolina: "Lore, ¿cuántas me quedan?"** (el mismo audio de P1, la misma burbuja), mientras lo dice mira el celular. 21,50 · inserto: "Hola, Carolina. Sesión 7 de 10 hecha ✓ Te quedan 3." 22,20-22,90 · **Carolina: "Ah. Tres."** 23,00-24,10 · **Lorena: "Tres. Sin promedio."** (media sonrisa, sin cuaderno). Rótulo "Cada sesión se descuenta sola". | gabinete, camilla, Carolina, Vale, tablet, celular, equipo limpio, Lorena | zumbido del equipo · click-soft 18,80 · tic de contador 19,40 · `cero.mp3` 19,80 · vibra 19,90 · notification 21,50 |
| 24,20-27,60 | **Q2 · "¿y la de Jimena?"** EL MISMO plano de P6 (el equipo y Vale). | Chip "Jueves, 18:30." 24,40-25,60 · **Lorena: "Vale, ¿y la de Jimena?"** (el mismo audio de P6). 25,70 · Vale gira la tablet hacia Lorena: **"Jimena · Láser axilas · 5 de 10 · quedan 5"**. 26,40 · Vale despega el último post-it del costado del equipo (un "JIME" viejo), lo hace un bollito y lo tira al tacho; la tapa se cierra. | equipo limpio, Vale, tablet, post-it, tacho | click-soft · papel que se arruga (CC0) 26,50 · tapa del tacho (CC0) 27,10 |
| 27,60-32,60 | **Q3 · el aviso de renovar.** Chip "Dos meses después." El living (el de Graciela con otro almohadón): Carolina en el sillón, vibra el celular; push-in al celular (≥ 65 %); después vuelve a Carolina, que saca la tarjetita de cartón de la cartera, la mira con cariño y la guarda en el cajón de la mesita. | 27,80 · "Hola, Carolina. Hoy hiciste la 9 de 10: te queda 1. ¿Renovás tu paquete?" · 28,60 toca **"Renovar y pagar"** · 29,00 "Confirmar" · 29,40 **"Pagado ✓ · Paquete nuevo: 10 sesiones"** · rótulo "Con 1 sesión, le avisa para renovar". 30,40 · saca la tarjetita · 31,20-32,20 · **Carolina: "Chau, tarjetita."** (con cariño) · cierra el cajón. | living, sillón, Carolina, celular, cartera, tarjetita, mesita con cajón | notification 27,80 · click-soft 28,60 y 29,00 · `cero.mp3` 29,40 · cajón que se abre y se cierra (CC0) 31,00 / 32,30 |
| 32,60-35,60 | **Q4 · el panel.** La recepción; push-in a la tablet del atril hasta ≥ 70 %; los dos cisnes en el estante detrás. | 32,80-34,60 · las filas entran de a una: "Activos: 42" · "Sesiones descontadas este mes: 96 ✓" · "Por terminar: 5 · aviso enviado ✓" · "Renovaron: 4" · 34,80 · **"Sesiones regaladas por las dudas: 0"** grande y verde. | recepción, tablet en atril, cisnes | whoosh corto de cámara 32,60 · tic por fila · `cero.mp3` 34,80 |

## CIERRE (35,60-39,40 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 35,60-39,40 | **C · Lorena a cámara.** Plano medio de Lorena detrás del mostrador de la recepción, la tablet con el panel verde a su lado (que se vea el "0"), la puerta de vidrio con "Lorena Estética" detrás (nunca pared lisa). Push-in suave. | 35,70-38,90 · **Lorena: "Comentá SESIONES y te mando cómo funciona para tu centro de estética."** (de colega, media sonrisa). 36,30 · sobre "SESIONES" entra la tarjeta abajo de la cara; en los últimos 0,8 s, la línea chica "La ficha de cada clienta con su paquete, que se descuenta sola" / "scalerics.com". | pop en "SESIONES" · la cama spa cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "CENTROS DE ESTÉTICA" entero y legible sin tapar caras; se lee "depilación láser" (el equipo con su
  cabezal y las gafas de Carolina), no "consultorio médico" ni "dentista".
- **Se entiende sin sonido:** las burbujas, los tres rótulos de P4 con su número, los 9 palitos del cuaderno, los 7
  sellos de la tarjetita y los 8 palitos del post-it legibles; "El promedio daba 2."; en la parte 2 la ficha, el
  WhatsApp, el aviso y el panel.
- **Coherencia de números:** cuaderno 9 usadas → queda 1; tarjetita 7 → quedan 3; post-it 8 → quedan 2; promedio 2;
  Lorena dice 3. Parte 2: sesión 7 de 10 → quedan 3 (coincide con lo que Lorena "regaló" en la parte 1, guiño); dos
  meses después, 9 de 10 → queda 1. $ 1.800 × 8 = $ 14.400; paquete de 10 = $ 18.000.
- **Continuidad:** P1 = Q1 y P6 = Q2 en encuadre (que el callback se vea: post-it → equipo limpio, cuaderno → tablet);
  Carolina con las gafas en la frente en P1-P5 y Q1, en el living sin gafas; la tarjetita es la misma en P3 y Q3;
  Lorena sin cuaderno en toda la parte 2.
- **Física:** el cable espiralado del cabezal no atraviesa la camilla, a Vale ni a Carolina; el equipo gira sin
  atravesar el carrito; la tarjetita en la mano de Carolina sin atravesar los dedos; las gafas no atraviesan el pelo;
  los post-its pegados al costado (no flotando a 1 cm); el bollito de papel entra al tacho.
- **Nada de piernas a la vista:** la toalla tapa las piernas de Carolina en todos los planos.
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX que no están en assets/sfx** (pip del láser, cierre de cartera, ruedas, papel que se arruga, tapa del tacho,
  cajón): reales con licencia CC0, con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados.

## Voces (partes/*.txt; detalle y tonos en partes/voces.md)
Lorena = Kore · Carolina = Leda (las de estetica-turnos) · Vale sin voz · narrador del cartel = Rasalgethi (audio
reusado de ya-lo-cargo). 13 archivos, 12 a generar (09-narrador se reusa); 01-carolina y 08-lorena se reusan en la parte 2.

## Portada
`portada.json`: `chica` "Jueves, 18:00." · `grande` **"¿Cuántas me quedan?"** (la frase que la dueña escucha todos los
días, 3 palabras entre signos) · `sello` **"ESTÉTICA"**. Fondo limpio (sin gancho, burbujas, chips, rótulos ni logo) de
P4 (~9,0 s) o un plano propio (VER=portada LIMPIO=1): Carolina en la camilla con las gafas en la frente mostrando la
tarjetita, Lorena con el cuaderno abierto y Vale señalando el post-it del equipo, los tres en la mitad de arriba.
Alternativa: P6 con el costado de post-its (chica "Y eso es con una clienta."). Ajustar `t` y `fondo_limpio` con el
render.
