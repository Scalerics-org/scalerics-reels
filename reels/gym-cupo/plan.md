# gym-cupo · plan plano por plano · GIMNASIOS (estudio de spinning), dolor + solución (3D real), ~40,8 s

**De qué trata.** Martes, 18:20, en la sala de spinning de "Estudio Mauro" (14 bicis numeradas). Mauro, dueño y profe,
sentado en su bici de instructor con el micrófono de vincha, mira el grupo del celular, que no para: "Yo voy", "yo
voooy", un sticker de pulgar, "anotame a mí y a mi prima", un audio de 0:47. Contador: **YO VOY 22 · BICIS 14**.
**"Veintidós 'yo voy'. Hoy explota."** Audio de Majo: **"Mauro, ¿hay lugar a las siete?"** · **"Llena, Majo.
Perdoná."** (y a Sole, por escrito: "Llena, Sole."). 19:00: entra la gente… **nueve**. Cinco bicis vacías, y en diez
segundos se vuelven percheros: Graciela cuelga la toalla en la de al lado, otro la mochila, otra la campera, una
botella, un celular. Pausa con el costo (Majo y Sole se anotaron en otro lado: $ 3.800 por mes). Mauro, por el
micrófono, seco: **"Los 'yo voy' no pedalean."** Remate del remate: a las 19:04 vibra el celular en el manubrio:
"Rodri: ¿Ya empezó? Yo voy." y el contador pasa a **23**. Mauro lo da vuelta boca abajo y le sube a la música.
Cartel **"Un sistema de reservas más tarde…"**. Parte 2: el lunes a la noche Majo abre "Reservá tu bici": el mapa de las
14 bicis con el cupo real, **"¿Quedan tres? ¡La siete!"**; la clase se llena (14/14) y Sole queda primera en la lista de
espera. El martes a las 15:00 le llega a cada una el recordatorio con su bici; Lucía toca "Liberar mi bici", la 4 se
pone verde y a Sole le llega solo el aviso: "Se liberó la bici 4 · ¿La querés?" ✓. Martes 19:00, el mismo encuadre de la
parte 1: **14 de 14**. **"Catorce reservas. Pedalean catorce."** Graciela, toalla en mano, mira a los costados: no hay
ninguna bici libre: **"Profe, ¿y ahora la toalla dónde la cuelgo?"** · **"En el cuello, Graciela."** El panel del mes
(bicis vacías 20 → 1). Cierre: Mauro a cámara: **"Comentá CUPO y te mando cómo funciona para tu gimnasio."**

- **Producto: sistema de reservas de clases + automatizaciones** (Scalerics): cada alumna reserva su bici desde el
  celular sobre el cupo real (el mapa de la sala con las 14 bicis numeradas); cuando se llena, lista de espera; el día
  de la clase sale solo un recordatorio con su bici y dos botones ("Voy ✓" / "Liberar mi bici"); si alguien libera, el
  sistema le avisa sola a la primera de la lista y se la reserva con un toque; panel de ocupación para Mauro. **No es
  agente de IA:** no se nombra así en ningún lado. Se nombra en el cartel ("Un sistema de reservas más tarde…"), en la
  línea chica final ("Reservas con cupo real y lista de espera" / scalerics.com) y en `descripcion.txt`. Nunca
  "Scalerics" en el cartel.
- **Sin marcas:** bicis de spinning genéricas (sin logos ni nombres de fábrica: cuadro navy, volante gris, número
  pintado), chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp; el grupo se llama "SPINNING MARTES
  19"), sticker de pulgar dibujado plano (no un sticker de ninguna app), celular sin logo, música de spinning sin
  referencias. "Estudio Mauro" es inventado.
- **Sin datos de afuera** (ver `fuentes.md`): 14 bicis, 22 "yo voy", 9 que vinieron, 5 vacías, cuota $ 1.900, $ 3.800,
  20 → 1 y lo demás son del caso. El guion no dice nada de cuántos faltan "en los gimnasios": es la clase de Mauro.
- **Estructura** (la de vete-racion y estetica-turnos): parte 1 **17,0 s** + cartel **2,6 s** + parte 2 **17,8 s** +
  cierre **3,4 s** = **40,8 s**. Solución + cierre = 21,2 s (**52 %**). **Proyecto 3D: copia de `reels/pilates-cuota`**
  (tiene Graciela, Sofi, el rig con `auriculares` + `auricularFino` = vincha con micrófono, ropa de gimnasia, la
  recepción, gen.mjs con T1/T2, medir.py, snap.sh, prev.mjs, partes/procesar.sh) con la sala de spinning nueva.
  **Ojo con el largo:** si pasa de ~42 s, recortar primero Q2 (4,2 → 3,6 s) y el panel Q4 (3,2 → 2,6 s); nunca la pausa
  antes de "Los 'yo voy' no pedalean." (mínimo 0,7 s) ni el gag de los percheros (mínimo 2,2 s: es lo que se entiende sin
  sonido) ni el 22 → 23.
- **Cartel:** time card de siempre: **"Un sistema de reservas"** / **"más tarde…"**. Audio NUEVO: generar
  `05-narrador` con Rasalgethi ("Un sistema de reservas más tarde."), mismo tono que
  `reels/ferreteria-encargo/assets/voice/narrador.wav` ("Un sistema más tarde."); si queda en más de 2,8 s, atempo hasta
  ~2,6 s.
- **Quién dice "Comentá CUPO": Mauro, a cámara** (el dueño, como Inés en vete-racion). La palabra **CUPO** en pantalla,
  en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Mauro es buen profe y tiene un grupo que lo quiere (22 dicen que van: eso es un elogio);
  las alumnas no son malas: "yo voy" es lo que se escribe en un grupo, y a la tarde surge algo. Majo y Sole no
  "traicionan": les dijeron "llena" y se anotaron donde había lugar. El chiste es contra el grupo de WhatsApp como sistema
  de reservas, no contra nadie. Graciela es la alumna fiel y simpática (vino en la parte 1 y en la 2).

## Paleta y set (para "Hechos")
**Escenario principal nuevo: la sala de spinning de "Estudio Mauro", de noche (P1-P5, Q3, cierre).** Pared del fondo
**navy oscuro `#0b1220` lisa** con una **franja diagonal crema `#efeee5` pintada** de 60 cm de ancho que cruza de abajo a
la izquierda hacia arriba a la derecha (la "pintura de gimnasio", plana, sin degradé); arriba, en el borde del techo, una
**tira de luz verde `#5ce611` plana** (un prisma emisivo de 6 cm, sin bloom ni halo: la compresión de Instagram no
perdona los brillos); paredes laterales navy2; **piso de goma gris grafito `#3a3f4a`** plano con las juntas de las
baldosas de goma en navy (cuadros de 1 m, líneas ≥ 6 px en pantalla); techo navy3 con dos paneles de luz crema planos.
Al frente, la **tarima del profe** (crema, 20 cm de alto, borde navy) con la bici de instructor de frente a la sala; en
la pared del fondo, arriba de la tarima, un **reloj digital** (caja navy, dígitos verdes de 7 segmentos en geometría:
18:20 → 19:00 → 19:04) y el **cartel "ESTUDIO MAURO"** en Lexend 900 crema sobre la franja navy. A un costado, un
**ventilador de pie** navy con aspas crema (gira, función del tiempo) y un **parlante** negro-navy en un estante. La
puerta de vidrio esmerilado crema a la derecha con la manija verde.
**Set chico: el living de Majo (Q1)**: sofá navy2 con almohadón verde apagado `#365f28`, pared crema `#efeee5` lisa, una
lámpara de pie con pantalla crema, la mochila de gimnasio de Majo en el piso, luz de noche crema plana. Es de lunes a las
21:30.
**Set chico: la recepción de Estudio Mauro (Q2, Q4)**: mostrador crema con frente navy3, la tablet en atril, un
exhibidor de botellas de agua genéricas (crema, verde, navy, sin etiqueta de marca), la franja diagonal crema de la sala
continúa en la pared (que se lea que es el mismo lugar). Luz de tarde crema plana en Q2.
Anotar en "Hechos": "sala de spinning de noche (pared navy oscuro #0b1220 con franja diagonal crema y tira de luz verde,
piso de goma grafito, 14 bicis numeradas, tarima del profe, reloj digital verde), living de Majo crema, recepción del
estudio; parte 2 con interfaz recreada (mapa de bicis, recordatorio con 'Liberar mi bici', aviso a la lista de espera,
panel de ocupación); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** el contador "VINIERON 9" junto a "YO VOY 22", el 23 del remate del
  remate, los rótulos "5 bicis vacías" y "Majo y Sole: «llena» · se anotaron en otro lado · $ 3.800 por mes", la palabra
  "Llena" de las burbujas de Mauro en la parte 1, el "20" del panel antes de girar. **Verde `#5ce611` para lo
  resuelto:** las bicis libres del mapa, cada ✓, "Reservar", "Bici 7 reservada ✓", "Liberar mi bici" → aviso, "14/14",
  "1", la tarjeta CUPO, el recuadro de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien
  habla; se revelan por frase entera (nunca una palabra colgando). La voz de Mauro por el micrófono de vincha (P4, Q3) va
  en una burbuja con un **iconito de micrófono** navy a la izquierda (se entiende que habla a la sala). "Los 'yo voy' no
  pedalean." (P4) y "Catorce reservas. Pedalean catorce." (Q3) en el MISMO lugar y tamaño: que se lea la vuelta.
- **El contador de la parte 1** (HTML, arriba a la derecha, debajo del chip, caja navy `#0b1220` borde crema 6 px,
  Lexend 900): **"YO VOY"** crema con el número grande verde que sube 14 → 22 en P1 (tick por número) · **"BICIS 14"**
  crema · en P2 aparece la tercera fila **"VINIERON 9"** en rojo apagado (cuenta 1 → 9 a medida que se sientan) · en P5
  el 22 de YO VOY salta a **23** con un golpe (`k-tick-4` + pop), y se pone rojo apagado.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "GIMNASIOS" en el cuadro 0):
  "Martes, 18:20." · "Martes, 19:00." · "19:04." · parte 2: "Lunes, 21:30." · "Martes, 15:00." · "Martes, 19:00." ·
  "Noviembre.". Cambio con flip corto + `k-tick-1`.
- Texto en pantalla: crema sobre navy, navy sobre crema; nunca crema sobre la franja crema ni sobre la pared crema del
  living. Rótulos con línea guía en caja navy `#0b1220`, texto crema, borde crema de 6 px; las guías nunca cruzan una
  cara.

## Personajes
- **Mauro** (NUEVO, `ELENCO.mauro`, Sadaltager): dueño y profe de spinning, ~38 años. Piel trigueña, pelo negro corto
  rapado a los costados (`peinado: "corto"` con `cortoMechas: false`, como Joaco pero más corto), **barba candado** corta
  (`barba` negro, `barbaLarga` 0.3, `barbaBigote: true`), cejas gruesas; **musculoso pero no caricatura** (hombros un
  poco más anchos, `panza` 0.85); **remera navy3 de manga corta con franja verde de marca en el pecho** (`franja`),
  **short navy** (pantalón corto: si el rig no tiene, pantalón navy y que no se note: casi siempre está detrás del
  manubrio o de la tarima), zapatillas crema, **vincha con micrófono verde** (`auriculares: MARCA.g, auricularFino:
  true`, el micrófono a la comisura de la boca, no adentro), **toalla crema al cuello en la parte 2 y el cierre**. Una
  pulsera navy. Expresiones: P1 `sonrisa` canchera ("Hoy explota"); P1b `concentrada` escribiendo; P2 `sorpresa` leve
  que se apaga cuando entra la novena y no entra nadie más; P3 `resignado` quieto (pausa, sin manos a la cabeza); P4
  `fastidio` seco suave, mira a la sala, no a cámara; P5 `incredula` al leer el 23, deja el celular boca abajo; Q3
  `sonrisa` tranquila; cierre `sonrisa` de colega, un poco agitado (respira más). Que no cierre los ojos al hablar; sin
  doble boca.
- **Majo** (NUEVA, `ELENCO.majo`, Zephyr): alumna ~30, piel media, pelo cobrizo `0x8a4a2a` en **coleta alta**,
  remera verde de marca, calza navy, zapatillas crema. P1b solo como avatar redondo del audio en el chat (no está en la
  sala: le dijeron "llena"). Q1 en el sofá del living con el celular (`esperanza` → `feliz` en "¡La siete!"). Q3 en la
  **bici 7**, pedaleando, contenta.
- **Sole** (NUEVA, sin voz): ~35, piel clara, pelo castaño oscuro en **rodete**, musculosa navy claro. P1b solo burbuja y
  avatar ("¿Me guardás una?"); Q2 solo en el celular (avatar + "Lo quiero ✓"); Q3 en la **bici 4**.
- **Graciela** (`ELENCO.clienta`, Gacrux, la de siempre, ~65): **versión gimnasio**: la misma cara, rulos lila y
  lentes, con **vincha de tela verde de marca**, remera crema manga larga, calza navy, zapatillas crema, **toalla
  crema** en la mano. Bici 1, primera fila, delante de la tarima. P2 cuelga la toalla en el manubrio de la bici 2 vacía
  (es la que arranca el gag); Q3 con la toalla en la mano, mira a la izquierda (bici 2 ocupada) y a la derecha (ocupada),
  `incredula` simpática; en "En el cuello, Graciela." se la pone al cuello y sonríe.
- **Alumnos de relleno** (sin voz): 8 en la parte 1 (además de Graciela) y 11 en Q3 (además de Graciela, Majo y Sole),
  variantes de `DEFECTO` con ropa de gimnasia de la paleta (remeras crema, navy claro, verde apagado; calzas y shorts
  navy), pelos y pieles variados, nadie repetido en la misma fila. Uno con una **campera** navy2 que cuelga en la bici
  11, uno con **mochila** verde apagado (bici 9). **Rendimiento (SwiftShader):** los de la fila de atrás pueden ser
  versiones simplificadas (sin dedos, menos segmentos), y en los planos cortos se esconden los que no entran en cuadro.
- **Pedaleo:** si el rig no pedalea, las piernas quedan del lado de la bici que no se ve o detrás del protector del
  volante, y el pedaleo se vende con el torso que sube y baja poco (función del tiempo, misma fase por bici con un
  desfase fijo), las bielas del volante que giran y las rodillas que suben y bajan. **Las piernas nunca atraviesan el
  cuadro de la bici.** En la parte 1, antes de las 19:04, la gente está sentada sin pedalear (esperan): el pedaleo
  arranca con la música en P5.

## Objetos 3D (nuevos, específicos)
- **La bici de spinning (EL objeto, ×15: 14 + la del instructor):** cuadro navy3 `#1f3254` en "lambda" (tubo grueso
  diagonal y base en T con dos pies redondeados crema), **volante de inercia gris claro `#b9bec4` adelante con protector
  navy**, bielas y pedales con correa navy (giran, función del tiempo), asiento crema `#efeee5` en su poste, **manubrio
  en "cuernos" negro-navy con la perilla de resistencia verde `#5ce611`** en el tubo, un **portabotella**, y **el número
  de la bici pintado en una plaquita crema en el poste del manubrio, Lexend 900 navy grande** (1 a 14; la 4 y la 7 se
  tienen que leer en P2 y Q3). ¿Alguien la confunde con una bici común? No: la base en T, el volante adelante y los
  cuernos la hacen de spinning. La del instructor, en la tarima, de frente a la sala, con un soporte de celular en el
  manubrio.
- **Las 14 bicis en la sala:** tres filas mirando a la tarima (5 · 5 · 4), separadas lo justo para que entre una persona
  (nada se atraviesa). Bici 1 y 2 al frente a la izquierda (Graciela y el perchero de la toalla), la 4 en la primera
  fila, la 7 en el medio de la segunda.
- **Los percheros (P2, el gag de la parte 1):** en las 5 bicis vacías (2, 4, 7, 11, 13): en la 2 la **toalla crema** de
  Graciela colgada del manubrio (cae doblada, sin atravesarlo), en la 4 una **botella de agua** verde apagado en el
  asiento, en la 7 un **celular** apoyado en el soporte, en la 11 una **campera** navy2 colgada de los cuernos, en la 13
  una **mochila** verde apagado colgada del asiento. Cada objeto entra con un pop chico y su sonido. (La 4 y la 7 son
  las que en la parte 2 ocupan Sole y Majo.)
- **El celular de Mauro** (`crearCelular`, funda navy2): P1 en su mano, el chat del grupo en pantalla (canvas); P5 en
  el soporte del manubrio de la bici de instructor, vibra (se sacude 3 veces) y él lo da vuelta boca abajo (giro de 180°
  sobre el soporte, sin atravesarlo).
- **El micrófono de vincha** de Mauro (rig) y **el parlante** del estante (en P5 se le sube la música: la perilla del
  parlante gira; o el celular de la música, no el de los mensajes).
- **El reloj digital** de la pared (dígitos verdes en geometría: 18:20, 19:00, 19:04; parte 2: 19:00).
- **El ventilador de pie** (aspas que giran, función del tiempo; P4 hace volar un poco la toalla de la bici 2).
- **El celular de Majo** (Q1) en su mano en el sofá; **la tablet en atril** de la recepción (Q2, Q4).
- **Las toallas:** la de Graciela (crema, con una franja verde fina) en P2 colgada de la bici 2 y en Q3 en su mano →
  al cuello; la de Mauro al cuello en Q3 y el cierre.

## Interfaz recreada (canvas en pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**P1 · celular de Mauro · grupo "SPINNING MARTES 19"** (encabezado navy, "38 participantes"): burbujas crema que suben
rápido, con nombre arriba en verde apagado: "Yo voy" (Caro) · "yo voooy" (Seba) · sticker plano de un pulgar navy
(Ana) · "Anotame a mí y a mi prima" (Lu) · audio "0:47" (Fede) · "Yo voy" (Mabel) · "voy pero llego 19:10" (Nati) ·
"Yo voy" (Rodri) · … Mauro hace scroll: no se lee todo, se lee el aluvión. Contador HTML YO VOY 14 → 22.
**P1b · el mismo celular · el audio de Majo** (avatar cobrizo, onda del audio, "0:02") y la respuesta escrita de Mauro
**"Llena, Majo. Perdoná."** ("Llena" en rojo apagado); arriba entra la burbuja de Sole **"¿Me guardás una?"** y Mauro
contesta **"Llena, Sole."**. Rótulo: **"A dos les dijo «llena»"**.
**P3 · el celular de Mauro, inserto corto** (19:01): Majo: **"Tranqui, Mauro. Me anoté en otro lado: ahí reservás la
bici."** (sin voz, pop). Es el costo, sin drama.
**P5 · el celular en el soporte (19:04)**: notificación grande del grupo: **"Rodri: ¿Ya empezó? Yo voy."** (Rodri ya
había dicho "yo voy" en P1: es el mismo, otra vez).
**Q1 · celular de Majo · "Estudio Mauro · Reservá tu bici"**: "Spinning · martes 19:00 · con Mauro" · **"Quedan 3"**
(verde) · **el mapa de la sala**: la tarima arriba con la bici del profe, y las 14 bicis como íconos con su número en
tres filas (5 · 5 · 4), las ocupadas en gris `#b9bec4` con "✓", las libres verdes (4, 7, 13). Majo toca la 7 → se pone
navy con su inicial "M" → botón verde **"Reservar bici 7"** → **"Bici 7 reservada ✓ · martes 19:00"**. Después, en
cámara rápida, la 4 y la 13 se ocupan: **"Clase llena · 14/14"** y aparece **"Anotarme en la lista de espera"**: en un
segundo celular (el de Sole, en una burbuja de pantalla partida o un whoosh) **"Sos la 1ª de la lista de espera ✓"**.
Rótulos: **"Cupo real: 14 bicis"** y **"Lista de espera"**.
**Q2 · recordatorio y lista de espera** (chip "Martes, 15:00."): en el celular de Lucía (avatar), el mensaje automático:
**"Hoy spinning 19:00 · Tu bici: 4 · ¿Venís?"** con **"Voy ✓"** / **"Liberar mi bici"**; Lucía toca "Liberar mi bici" →
whoosh al mapa en la tablet de la recepción: la 4 se pone verde **"Bici 4 libre · avisando a la lista de espera"** →
vuela el aviso al celular de Sole: **"Se liberó la bici 4 · hoy 19:00 · ¿La querés?"** → toca **"La quiero"** →
**"Bici 4 reservada ✓"** · chip **"Bici 4: ocupada otra vez en 3 minutos"**. Rótulos: **"Recordatorio el mismo día"** y
**"Se libera sola y le avisa a la siguiente"**.
**Q4 · panel "Spinning martes 19:00 · noviembre"** (tablet ≥ 70 % en el atril de la recepción, el mostrador y las
botellas alrededor, nunca pantalla lisa): **"Reservaron 14 · vinieron 14 ✓"** · **"Bicis vacías en el mes 20 → 1"** (el
20 rojo apagado gira y queda 1 verde) · **"Lugares que llenó la lista de espera: 6 ✓"** · **"Alumnas nuevas desde la
lista: 3 ✓"**. Rótulo: **"Panel de ocupación"**.
**Tarjeta de cierre (HTML, ~3,4 s, sobre Mauro a cámara):** abajo de la cara, en el 80 % seguro y con y ≤ 1500: "Comentá"
(Lexend 800 crema ~90 px) / **"CUPO"** (Lexend 900 ~190 px, navy en el recuadro verde) / "y te mando cómo funciona para
tu gimnasio" (Lexend 600 crema ~46 px, 2 líneas). Los últimos ~0,8 s, debajo: "Reservas con cupo real y lista de espera"
(~38 px) / **"scalerics.com"** en verde (~44 px). Entra sobre "Comentá", no tapa la cara.

## PARTE 1 · el problema (0,00-17,00 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-4,00 | **P1 · cuadro 0.** Sobre el hombro de Mauro, desde atrás y arriba de la tarima: en primer término **el celular en su mano (≥ 35 % del ancho) con el grupo que sube**, Mauro de 3/4 (cara visible, sonrisa), y detrás, la sala con las 14 bicis vacías y numeradas, la franja crema, la tira verde y el reloj "18:20". Push-in lento al celular. | **Cuadro 0:** "GIMNASIOS" (Lexend 900 ~140 px, ya entero, arriba sobre la pared navy) y el chip "Martes, 18:20."; el chat YA está subiendo y el contador ya marca YO VOY 14 / BICIS 14. 0,2-2,0 · el contador sube 14 → 22 con cada burbuja · 0,35-2,30 · **Mauro: "Veintidós 'yo voy'. Hoy explota."** (sonrisa canchera, se acomoda el micrófono) · 2,6-3,9 · el chat sigue: sticker, audio 0:47. | sala, 14 bicis, bici del instructor, tarima, reloj 18:20, Mauro, celular | ambiente de sala vacía (zumbido del ventilador, `zumbido-largo` muy bajo) · `notification` corto y bajo por burbuja (8, con altura variada, sin tapar la voz) · `k-tick-1` por número del contador |
| 4,00-7,20 | **P1b · el audio y "llena".** Inserto del celular (≥ 60 %), con la cara de Mauro desenfocada al costado. 6,4 contraplano corto: Mauro escribiendo con el pulgar, `concentrada`. | 4,10-5,70 · **Majo (audio, filtro de celular): "Mauro, ¿hay lugar a las siete?"** (la onda del audio avanza) · 5,90-7,00 · **Mauro: "Llena, Majo. Perdoná."** y aparece su burbuja escrita · 6,50 · Sole: "¿Me guardás una?" → 6,90 "Llena, Sole." · rótulo **"A dos les dijo «llena»"** (rojo apagado). | celular, Mauro | `vibra.wav` 4,05 · `key-press`/`tipeo` 6,0-6,9 · `whoosh-short` al enviar 7,0 |
| 7,20-10,40 | **P2 · 19:00.** Plano general desde la tarima (la bici del profe en primer término a la derecha, de espaldas): la sala, el reloj pasa 18:59 → **19:00**, la puerta de vidrio se abre. Entran y se sientan, de a uno, nueve alumnos. 9,0 la puerta se cierra. Plano quieto (que se cuente). 9,0-10,4 el gag: las 5 bicis vacías se vuelven percheros, cámara con un travelling lateral corto a lo largo de la primera fila. | Chip "Martes, 19:00." · contador: aparece **VINIERON** y cuenta 1 → 9 con cada uno que se sienta (rojo apagado) · Graciela primera, a la bici 1 · 9,0 · Graciela cuelga su toalla en la bici 2 · 9,3 botella en la 4 · 9,6 celular en la 7 · 9,9 campera en la 11 · 10,2 mochila en la 13. Mauro en la tarima, la sonrisa se le apaga de a poco. | sala, puerta, 9 alumnos + Graciela, percheros (toalla, botella, celular, campera, mochila) | `puerta-abre` 7,4 · `campanita` no (es una sala) · `paso-*` ×9 y `k-metal-click` (el asiento) por cada uno · `k-cloth_1/2` toalla y campera · `k-plastico` botella · `k-tick-2` celular · `k-cloth_2` mochila · `k-tick-1` por número del contador |
| 10,40-12,20 | **P3 · la pausa.** El mismo plano general, quieto: 9 sentados, 5 bicis de perchero. Inserto corto del celular (10,9-11,6): el mensaje de Majo. | Pausa: el ventilador, nadie habla · el contador completo: **YO VOY 22 · BICIS 14 · VINIERON 9** · rótulos: **"5 bicis vacías"** (guía a la toalla de la bici 2, nunca a una cara) · 10,9 · Majo: **"Tranqui, Mauro. Me anoté en otro lado: ahí reservás la bici."** · rótulo **"Majo y Sole: se anotaron en otro lado · $ 3.800 por mes"** (rojo apagado). | sala, celular | solo el ventilador y un carraspeo del fondo · `notification` bajo 10,9 · pop de cada rótulo · la música de espera muy baja |
| 12,20-14,20 | **P4 · el remate.** Primer plano de Mauro en la tarima, de frente a la sala (3/4, la sala desenfocada detrás), push-in mínimo. | 12,20-12,50 · pausa (Mauro respira, se acerca el micrófono) · 12,55-14,05 · **Mauro, por el micrófono: "Los 'yo voy' no pedalean."** (burbuja con el iconito de micrófono) · Graciela asiente en el fondo. | Mauro, vincha, sala de fondo | la voz con un poco de sala (PA chico, ver voces.md) · nada encima · el ventilador |
| 14,20-17,00 | **P5 · remate del remate.** Plano medio de Mauro sentado en la bici de instructor con el celular en el soporte del manubrio en primer término (≥ 30 % del ancho); el reloj **19:04** de fondo. 15,6 inserto del celular. 16,2 plano general corto: todos arrancan a pedalear. | Chip "19:04." · 14,50 · vibra el celular · 15,0 · notificación: **"Rodri: ¿Ya empezó? Yo voy."** · el contador **YO VOY 22 → 23** (golpe, se pone rojo) · 15,5 Mauro, `incredula`, mira el 23 · 15,9 da vuelta el celular boca abajo · 16,1 gira la perilla de la música · 16,2 arranca el beat y pedalean todos (9) · 16,9 stinger. | Mauro, celular en el soporte, bicis, alumnos | `vibra.wav` 14,5 · `notification` 15,0 · `k-tick-4` + `pop` en el 23 · `k-metal-click` al dar vuelta el celular 15,9 · música de spinning que arranca 16,2 · **stinger** 16,90 (música cortada seca) |

Último cuadro (17,00) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (17,00-19,60 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Un sistema de reservas"** /
**"más tarde…"** (navy sobre verde, centrado, dentro del 80 % seguro; "reservas" no se corta). Audio nuevo `05-narrador`
(Rasalgethi) desde 17,05. Nunca "Scalerics".

## PARTE 2 · la solución (19,60-37,40 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 19,60-24,60 | **Q1 · Majo reserva.** El living de Majo, plano medio de 3/4: Majo en el sofá con el celular. 20,0 inserto del celular (≥ 65 %), Majo desenfocada atrás. 23,4 whoosh corto al celular de Sole. | Chip "Lunes, 21:30." · 20,0 "Estudio Mauro · Reservá tu bici · Spinning martes 19:00" · **"Quedan 3"** · el mapa de 14 bicis · 21,10-22,50 · **Majo: "¿Quedan tres? ¡La siete!"** · 22,6 toca la 7 → "Reservar bici 7" → 23,0 **"Bici 7 reservada ✓"** · rótulo "Cupo real: 14 bicis" · 23,3 la 4 y la 13 se ocupan: **"Clase llena · 14/14"** · 23,6-24,5 celular de Sole: "Anotarme en la lista de espera" → **"Sos la 1ª de la lista de espera ✓"** · rótulo "Lista de espera". | living, sofá, Majo, celular | ambiente de casa de noche muy bajo · `click-soft` 22,6 y 22,9 · `cero.mp3` 23,0 · `k-tick-1` ×2 al ocuparse 4 y 13 · `whoosh-short` 23,6 · `click-soft` 24,0 · `ding` 24,3 |
| 24,60-28,80 | **Q2 · el martes, solo.** Inserto del celular de Lucía (≥ 60 %, su mano y su escritorio de oficina desenfocado, sin cara). 26,0 whoosh a la tablet de la recepción (≥ 60 %, el mostrador alrededor). 27,0 whoosh al celular de Sole. | Chip "Martes, 15:00." · 24,8 llega el recordatorio **"Hoy spinning 19:00 · Tu bici: 4 · ¿Venís?"** con "Voy ✓" / "Liberar mi bici" · rótulo "Recordatorio el mismo día" · 25,6 Lucía toca "Liberar mi bici" · 26,0 en la tablet la 4 se pone verde: "Bici 4 libre · avisando a la lista de espera" · 27,0 a Sole: **"Se liberó la bici 4 · hoy 19:00 · ¿La querés?"** · 27,6 toca "La quiero" → **"Bici 4 reservada ✓"** · rótulo "Se libera sola y le avisa a la siguiente" · chip **"Ocupada otra vez en 3 minutos"**. | celulares, tablet, mostrador | `notification` 24,8 · `click-soft` 25,6 · `whoosh` 26,0 y 27,0 · `vibra` 27,05 · `click-soft` 27,6 · `cero.mp3` 27,9 |
| 28,80-34,20 | **Q3 · el callback.** EL MISMO encuadre de P2 (desde la tarima, el reloj **19:00**): las 14 bicis ocupadas, nadie usa una bici de perchero; Majo en la 7 y Sole en la 4 (los números se leen). 31,3 corte a plano medio de Graciela en la bici 1 (Mauro a la derecha en la tarima, de 3/4). 33,4 Mauro de cerca, sonríe. | Chip "Martes, 19:00." · contador nuevo en verde: **RESERVAS 14 · VINIERON 14** · todos pedaleando · 29,10-30,90 · **Mauro, por el micrófono: "Catorce reservas. Pedalean catorce."** (misma burbuja con micrófono, mismo lugar que P4) · 31,40-33,20 · **Graciela, con la toalla en la mano, mira la bici 2 (ocupada) y la otra (ocupada): "Profe, ¿y ahora la toalla dónde la cuelgo?"** · 33,30-34,10 · **Mauro: "En el cuello, Graciela."** · ella se la pone al cuello y sonríe. | sala, 14 bicis ocupadas, Graciela, Majo, Sole, Mauro con la toalla al cuello, reloj 19:00 | la música de spinning de P5 (más baja debajo de las voces) · pedaleo (zumbido de volante: `zumbido-largo` con pasabajos, o CC0 de bici fija, ver fuentes) · `k-cloth_1` toalla al cuello 33,9 |
| 34,20-37,40 | **Q4 · el panel.** La tablet a ≥ 70 % en el atril de la recepción (mostrador y botellas alrededor; por el vidrio de la puerta se ve la sala llena). Push-in leve. | Chip "Noviembre." · "Spinning martes 19:00 · noviembre": las filas se tildan: **"Reservaron 14 · vinieron 14 ✓"** · **"Bicis vacías en el mes 20 → 1"** (34,9-35,9, el 20 gira y queda verde) · **"Lugares que llenó la lista de espera: 6 ✓"** · **"Alumnas nuevas desde la lista: 3 ✓"** · rótulo "Panel de ocupación". | tablet, atril, mostrador, botellas, puerta | `k-tick-1` por fila · `cero.mp3` en el 1 · `ding` en la última fila · la música baja |

## CIERRE (37,40-40,80 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,40-40,80 | **C · Mauro a cámara.** Primer plano de frente en la tarima, sentado en la bici de instructor, toalla al cuello, vincha con micrófono; detrás, la sala llena pedaleando desenfocada, la franja crema y el cartel ESTUDIO MAURO (nunca pared lisa). Push-in suave. | 37,55-40,60 · **Mauro: "Comentá CUPO y te mando cómo funciona para tu gimnasio."** (de colega, media sonrisa, un poco agitado) · sobre "Comentá" entra la tarjeta abajo de la cara; los últimos 0,8 s, la línea chica "Reservas con cupo real y lista de espera" / "scalerics.com". | pop en "CUPO" · la música de spinning baja y cierra en un golpe |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "GIMNASIOS" entero y legible, sin tapar la cara de Mauro; el chat subiendo y YO VOY 14 / BICIS 14 se
  leen en el primer segundo; se ve que es una sala de spinning (bicis numeradas, tarima).
- **Se entiende sin sonido:** burbujas de las 9 líneas (por frase entera); el contador YO VOY / BICIS / VINIERON y el
  23; los percheros (cada objeto claro y grande); el mapa de bicis; recordatorio, aviso y panel legibles.
- **Continuidad:** P2 = Q3 en encuadre; los números de las bicis iguales en la sala y en el mapa (4 y 7 en el mismo
  lugar relativo); el reloj 18:20 → 19:00 → 19:04, y 19:00 en Q3; la toalla de Graciela en la bici 2 en P2-P5 y en su
  mano en Q3; Mauro sin toalla en la parte 1 y con toalla en Q3 y el cierre; el celular de Mauro boca abajo desde P5.
- **Física:** nadie atraviesa una bici (piernas, manos en los cuernos); la toalla, la campera y la mochila cuelgan sin
  meterse en el caño; el celular gira sobre el soporte sin atravesarlo; el micrófono de vincha no entra en la boca.
- **Rig:** Mauro nuevo (barba candado sin manchas, vincha bien apoyada en la cabeza, pelo corto sin casquete); ojos
  abiertos al hablar; Graciela con vincha de tela que no corta los rulos de forma rara.
- **Rendimiento:** 14-16 personajes en P2/Q3 con SwiftShader: simplificar los de atrás y medir el tiempo de render.
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX nuevos** (pedaleo de bici fija si hace falta) reales CC0 con autor, sitio y licencia en `fuentes.md`; nunca
  sintetizados. **Música de spinning:** una cama con beat de la carpeta de bgm del repo (mirá `reels/*/assets/bgm`) o una
  CC0 con su crédito; nada que suene a un tema conocido.

## Voces (partes/*.txt; detalle en partes/voces.md)
Mauro = Sadaltager · Majo = Zephyr · Graciela = Gacrux · narrador del cartel = Rasalgethi (frase nueva). Sole, Lucía,
Rodri y los alumnos no hablan (burbujas). 10 archivos.

## Portada
`portada.json`: `chica` **"Martes, 19:00."** · `grande` **"¿Hay lugar?"** (lo que el dueño escucha en el audio, y la
escena le contesta sola: cinco bicis vacías usadas de perchero) · `sello` **"GIMNASIOS"**. Fondo limpio (sin gancho,
burbujas, chips, contador, rótulos ni logo) del final del gag de P2/P3 (~10,6 s): la sala con los 9 sentados, la toalla
de Graciela en la bici 2, la campera y la mochila en las vacías, Mauro en la tarima; todo en la mitad de arriba (subir el
cuadro como en estetica-turnos si hace falta). Alternativa: P4 (~13,0 s), Mauro con el micrófono y la sala medio vacía
detrás (grande "Yo voy."). Ajustar `t` y `fondo_limpio` con el render.
