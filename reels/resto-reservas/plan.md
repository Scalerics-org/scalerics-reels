# resto-reservas · plan plano por plano · PARRILLAS / RESTAURANTES, dolor + solución (3D real), ~40,0 s

**De qué trata.** Viernes 21:00 en "Parrilla Raúl" (la de `parrilla-no-vuelve`), el salón lleno y la parrilla a full.
Raúl, con el celular apretado entre el hombro y la oreja, la pinza en una mano y la birome atada con piolín en la otra,
atiende: **"Raúl, ¿tenés mesa para ocho a las diez? Soy Pablo."** / **"¡Anotado, Pablo!"** y lo escribe en el cuaderno
de reservas engrasado. Fabián planta el cartelito **RESERVADO** en la mesa 7 (la grande) y pone 8 cubiertos. El celular
del mostrador no para ("¿Tenés mesa?" ×14 sin contestar). 21:40, en la puerta, Walter con su familia: **"Raúl, ¿tenés
mesa para seis?"** / Raúl, señalando con la pinza la mesa 7 vacía: **"No, Walter. Esa es de Pablo."** La familia se va
($ 9.000). 22:45, la mesa 7 puesta con la vela entera: **"Raúl, ¿y los de las diez?"** / Raúl mira el celular (Pablo,
21:58: "¡Estamos llegando!"): **"Están llegando."** 23:40, el mismo encuadre, la vela por la mitad y las sillas arriba:
**"¿Y?"** / pausa / **"Siguen llegando."** Remate del remate: 23:58, Fabián junta los cubiertos; a Raúl le llega
"Raúl, perdón, se nos complicó. ¿Mañana a las diez, para ocho?" y, sin mirarlo: **"Dejá los cubiertos."** Fabián vuelve
a poner el tenedor. Cartel **"Un agente de IA más tarde…"**. Parte 2 (más de la mitad del reel): miércoles 2:14, el MISMO
audio de Pablo llega como nota de voz y el agente contesta solo con la mesa real (mesa 7, viernes 22:00, 8 personas) y
la anota en el plano de mesas; jueves 12:00 pide confirmación a las 12 reservas (11 de 12 ✓), Pablo no confirma, segundo
aviso a las 18:00, a las 20:00 la mesa 7 se libera sola y se le ofrece a Walter, primero en la lista de espera: **"¡Esta
vez sí entramos!"**; viernes 21:00, el mismo encuadre del cuadro 0 con Raúl usando las dos manos en la parrilla y el
celular contestando solo (sin contestar 14 → 0) y pasándole a Raúl el cumpleaños de 20: **"Ese es para mí."**; 22:00, el
MISMO "Raúl, ¿y los de las diez?" y Raúl señala la mesa 7 llena con la familia de Walter: **"Llegaron."**; 23:58, la
tablet: "Sábado 22:00 · Mesa 7 · Pablo · 8 · Confirmada ✓" y Raúl, contento: **"Dejá los cubiertos."** Cierre: Raúl a
cámara: **"Comentá RESERVA y te mando cómo funciona para tu restaurante."**

- **Producto: agente de IA de reservas** para el WhatsApp del restaurante (chat genérico en pantalla): contesta a
  cualquier hora con **las mesas reales del salón**, toma la reserva con **nombre, cantidad y hora**, la anota en el
  **plano de mesas**, **pide confirmación el día antes**, **libera la mesa si no confirman** y **se la ofrece a la lista
  de espera**, y **le pasa al dueño lo que es para él** (el cumpleaños de 20). Se dice "agente de IA", nunca bot ni
  chatbot. Se ve funcionando en la parte 2, se nombra en el cartel, en el encabezado del chat ("Parrilla Raúl · agente de
  IA"), en la línea chica de la tarjeta final y en `descripcion.txt`. El cartel nunca dice "Scalerics".
- **Sin marcas:** "Parrilla Raúl" inventado; chat genérico (burbujas crema/navy, sin el verde ni el logo de ninguna app),
  celulares y tablet sin logo, vino sin etiqueta, sifón sin marca. Pablo no tiene apellido ni cara.
- **Sin datos de afuera** (ver `fuentes.md`): $ 1.500 por persona, la familia de 6 ($ 9.000), la mesa de 8 y los horarios
  son del caso.
- **Estructura** (la de `dist-quien-debe` / `parrilla-no-vuelve`): parte 1 **16,0 s** + cartel **2,4 s** + parte 2
  **18,0 s** + cierre **3,6 s** = **40,0 s**. Solución + cierre = 21,6 s (54 %). Un proyecto 3D con gen.mjs (T1/T2) y
  `armar.mjs unir`, copiando el proyecto de `reels/parrilla-no-vuelve` (mismo set, mismos personajes).
  **Ojo con el largo:** si las tomas estiran el reel a más de ~42 s, recortar primero la escalada muda (P2, 1,6 → 1,2 s),
  el chat de Q1 (que el agente conteste mientras termina la nota de voz) y Q3; nunca la pausa antes de "Siguen
  llegando." (mínimo 0,6 s) ni la de antes de "Dejá los cubiertos." (mínimo 0,5 s). Medir que el cartel arranque antes de
  los 16,5 s y que parte 2 + cierre duren ≥ 20 s.
- **Cartel:** el time card de siempre: **"Un agente de IA" / "más tarde…"**. Audio REUSADO de
  `reels/abren-hoy-completo/assets/voice/narrador.wav` (Rasalgethi), como corralon-portland.
- **Quién dice "Comentá RESERVA": Raúl**, a cámara, detrás de la parrilla, pinza en mano (de dueño a dueño, como Rubén en
  dist-quien-debe). Variamos: los últimos cinco de la línea cerraron con Sofi en videollamada. La palabra **RESERVA** en
  pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Raúl cumple su palabra ("Esa es de Pablo") y confía; Pablo avisa ("¡Estamos llegando!"),
  pide perdón y vuelve a reservar (y en la parte 2 confirma); Walter es buena onda las dos veces. El chiste es contra el
  cuaderno, que no confirma ni libera nada.

## Paleta y set (para "Hechos")
**El set de `parrilla-no-vuelve`, un VIERNES lleno y con la mesa 7 de protagonista** (paredes navy claro `#16243d` lisas,
vigas y mesas de madera oscura `#3b2a20`, manteles crema `#efeee5` a cuadros navy, lámparas colgantes de chapa navy con
luz crema en conos planos, las brasas como único naranja `#d9772f` apagado y plano). Lo nuevo: **la mesa 7 para 8** al
centro del salón con el cartelito RESERVADO, 8 cubiertos, copas y **una vela en botella** que se consume (el reloj del
chiste), **el cuaderno de reservas** en el mostrador con la birome atada, la **pizarra de tiza "VIERNES"** (no "SÁBADO" ni
"MARTES · FEBRERO"), y en la parte 2 la **tablet con el plano de mesas** visto desde arriba. La noche avanza por la luz:
21:00-22:45 todas las lámparas prendidas y el salón lleno; 23:40-23:58 la mitad de las lámparas apagadas (las del fondo),
sillas arriba, la vela y la parrilla como luces fuertes. El living de Walter (Q2): el de Graciela de estetica-turnos con
otro almohadón (sillón crema, lámpara de pie, cortina navy). Anotar en "Hechos": "parrilla de noche de parrilla-no-vuelve,
viernes lleno: mesa 7 con RESERVADO, 8 cubiertos y vela que se consume, cuaderno de reservas engrasado con birome atada,
pizarra VIERNES; parte 2 con interfaz recreada (chat del agente, plano de mesas, panel de confirmaciones, aviso de lista de
espera); cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** "Sin contestar: 14", "Familia de 6 que se fue: $ 9.000", "Mesa de 8
  vacía: 22:00 → 00:00", "Cubiertos puestos: 8 · usados: 0", "sin confirmar" en el panel. **Verde `#5ce611` para lo
  resuelto:** cada ✓ del chat y del panel, "Confirmadas: 11 de 12", "Mesa 7 liberada → Walter", "Reservada ✓", "Sin
  contestar: 14 → 0", "Mesas vacías por reservas que no vinieron: 0", "Confirmada ✓", la tarjeta RESERVA, el recuadro de
  selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien
  habla. La de Pablo (teléfono) sale del celular en el hombro de Raúl, con un iconito de auricular navy y el borde
  punteado (es una llamada). "Están llegando." / "Siguen llegando." en el MISMO lugar y tamaño (que se lea la repetición);
  en Q4 "Llegaron." en ese mismo lugar. "Dejá los cubiertos." en P6 y Q5, mismo lugar.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "PARRILLAS" en el cuadro 0): "Viernes,
  21:00." · "Viernes, 21:40." · "Viernes, 22:45." · "Viernes, 23:40." · "Viernes, 23:58." · "Miércoles, 2:14." · "Jueves,
  12:00." · "Viernes, 21:00." · "Viernes, 22:00." · "Viernes, 23:58.". El cambio de chip con un flip corto + `k-tick-1`.
- Texto en pantalla: crema sobre navy, navy sobre crema; los rótulos con línea guía en caja navy `#0b1220`, texto crema,
  borde crema de 6 px (como parrilla-no-vuelve, sobre la pared navy).

## Personajes (copia local de `reels/parrilla-no-vuelve/assets/personajes.js`, que ya tiene a Raúl y Fabián)
- **Raúl = ELENCO.raul** (pelo corto entrecano, barba corta canosa, camisa navy2 de manga corta, delantal de parrillero
  crema gastado con borde verde oscuro). Voz Iapetus. Siempre con la **pinza** en la derecha. P1: el celular apretado
  entre el hombro izquierdo y la oreja (cabeza ladeada: `ladea` ~0,25), la birome en la izquierda; `concentrada` con media
  sonrisa. P3: `sonrisa` de anfitrión con pena al decir que no, señala con la pinza (la pinza apunta a la mesa 7, no a
  Walter). P4: mira el celular, `neutra` confiada. P5: `neutra` seca, ojos un poco entrecerrados (el remate sin cara de
  chiste). P6: lee el celular, pausa, `resignado` con media sonrisa amarga, abre el cuaderno. Q3: `sonrisa`, las dos manos
  en la parrilla (pinza y pala), mira de reojo el celular parado. Q4: `sonrisa` contenida, señala con la pinza. Q5:
  `feliz`. Cierre: `sonrisa` de colega.
- **Fabián = ELENCO.fabian** (jopo, camisa blanca, chaleco navy, trapo crema al hombro). Voz Achird. P2: planta el
  RESERVADO y pone los cubiertos (el gesto rápido de mozo). P4: bandeja redonda bajo el brazo. P5: una silla en la mano
  (la está subiendo a la mesa de al lado). P6 y Q5: **junta los cubiertos de la mesa 7 en la mano** y, con "Dejá los
  cubiertos.", se congela con el tenedor en el aire y lo vuelve a poner; en P6 con cara de `incredula`, en Q5 con
  `sonrisa`. Que los cubiertos queden en su mano (no flotando ni atravesando los dedos).
- **Walter = ELENCO.walter** (camisa blanca, corbata floja, campera crema). Voz Umbriel. P3: en la puerta, `esperanza`,
  después `resignado` simpático, se va con la familia saludando con la mano. Q2: en el living, el celular en la mano,
  `feliz`, puño chiquito de festejo. Q4: sentado en la cabecera de la mesa 7, levanta la copa hacia Raúl.
- **La familia de Walter** (extras sin voz, variantes de DEFECTO con peinados distintos, que no se parezcan a nadie del
  elenco): su mujer (melena castaña) y tres hijos (un adolescente con buzo, una nena con coleta, un chiquito en brazos;
  el chiquito es un personaje escalado ~0,55 con proporciones de nene, si no queda bien, que la nena sostenga un
  peluche y son 6 igual: Walter, su mujer, tres hijos + la abuela de pelo blanco corto). Son 6 en P3 y en Q4: contarlos.
- **Pablo:** sin cuerpo. Solo voz por teléfono (P1), nota de voz (Q1) y mensajes. Su avatar en el chat: un círculo navy con
  "P" crema.
- **Extras del salón** (como parrilla-no-vuelve): 6-8 siluetas sentadas de espaldas o de 3/4 con platos en P1-P3 y Q3-Q4;
  en P5-P6 y Q5, el salón vacío (las sillas arriba, una pareja pagando al fondo en P5, nadie en P6).

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/parrilla-no-vuelve`): la parrilla a leña con varillas en V, el brasero con troncos, la campana, la
tira con los huesitos, chorizos, morcillas y provoleta, la pinza y la pala, la pizarra de tiza (texto nuevo: arriba
**"VIERNES"**, abajo el menú fijo "TIRA · VACÍO · CHORIZO · MORCILLA · PROVOLETA"), las mesas a cuadros, sifón, vino sin
etiqueta, panera, lámparas colgantes, vigas, la puerta de vidrio con "Parrilla Raúl" en vinilo y la campanita, el
mostrador/caja con la tablet en atril, `crearCelular`. El living para Q2 (de estetica-turnos, vía parrilla-no-vuelve Q3).

**Nuevos** (específicos, que nadie los confunda):
- **La mesa 7 (protagonista de P2-P6, Q4-Q5):** mesa rectangular larga de madera oscura para 8 (tres sillas por lado y una
  en cada cabecera), mantel crema a cuadros navy, **8 platos de loza crema con 8 cuchillos de asado de mango de madera y
  8 tenedores**, 8 copas de vidrio (geometría simple, transmisión baja o crema translúcido plano: que no hagan bandas),
  servilletas de tela navy dobladas en triángulo, panera y sifón. En el centro, **el cartelito RESERVADO**: tarjeta plegada
  en V invertida, crema con borde navy, "RESERVADO" en Lexend 800 navy (TextGeometry o textura canvas), ≥ 60 px en el
  plano de P4; en P1-P6 cara a cámara.
- **La vela en botella (el reloj):** botella de vino vacía navy oscura con una vela crema encajada y chorreaduras de cera;
  la vela es un cilindro cuya altura es función pura del tiempo de la historia (22:45 entera → 23:40 por la mitad → 23:58
  un cabito), llama plana emisiva crema-naranja (dos conos, sin brillo difuso) que tiembla con ruido con semilla. En Q4
  (22:00) la vela entera recién prendida.
- **El cuaderno de reservas (P1, P2, P6):** cuaderno de tapa dura navy3 gastado, abierto sobre el mostrador junto a la
  parrilla, hojas crema con renglones navy finos (≥ 4 px en el inserto), una **mancha de grasa** traslúcida y otra de
  **chimichurri** (verde apagado `#365f28` con puntitos rojos), la esquina doblada. Escrito a mano (Caveat 700, navy, en
  canvas): "VIERNES" arriba, y renglones "GONZÁLEZ 4 · 21", "MESA 3 · 2 · 21:30" tachado y reescrito, "PABLO · 8 · 22:00"
  (este se escribe en P1 con la birome, letra por letra como función del tiempo). **La birome atada con piolín**: birome
  crema con capuchón navy, un piolín crema (tubo fino curvo con 5-6 puntos de control) que va de la birome al espiral del
  cuaderno; que el piolín no atraviese la mano ni el cuaderno. En P6, Raúl da vuelta la hoja a "SÁBADO" y escribe "PABLO ·
  8 · 22:00" otra vez.
- **El celular en el hombro (P1):** el celular de crearCelular, apretado entre el hombro izquierdo y la oreja de Raúl,
  inclinado; que no atraviese la oreja, la barba ni el cuello (si no queda limpio, que lo sostenga con la mano izquierda
  contra la oreja y la birome pase a la derecha con la pinza apoyada en la parrilla).
- **El celular del mostrador (P2, P4, P6, Q3):** parado contra el frasco de escarbadientes, pantalla canvas con las
  burbujas que entran; vibra (desplazamiento chico con ruido con semilla).
- **La tablet del plano de mesas (Q1-Q2, Q5):** la de parrilla-no-vuelve en su atril, pantalla canvas con el plano.
- **Sillas arriba de las mesas** (P5-P6, Q5): las sillas del salón dadas vuelta sobre las mesas del fondo.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**Parte 1 · el celular del mostrador (P2):** encabezado navy "Mensajes" · burbujas recibidas que se apilan con pop:
"¿Tenés mesa?" · "¿Para dos a las 21:30?" · "¿Hacen cumpleaños?" · "¿Tenés mesa para cuatro?" · "¿Hola?" · arriba, chip
**"Sin contestar: 14"** en rojo apagado que sube de 9 a 14 con tic.
**Parte 1 · inserto del celular de Raúl (P4):** chat genérico, encabezado navy "Pablo"; burbuja recibida **"¡Estamos
llegando!"** con la hora "21:58" chica abajo. Que el "21:58" se lea (≥ 36 px).
**Parte 1 · el mensaje de medianoche (P6):** "Pablo · 23:58" · **"Raúl, perdón, se nos complicó. ¿Mañana a las diez, para
ocho?"** (2-3 renglones, Lexend 700 ≥ 44 px en el inserto).
**Parte 1 · rótulos** (caja navy, texto crema, borde crema, línea guía): P3, a la puerta: **"Familia de 6 que se fue:
$ 9.000"** (rojo apagado). P5, a la mesa 7: **"Mesa de 8 vacía: 22:00 → 00:00"** y **"Cubiertos puestos: 8 · usados: 0"**
(rojo apagado).
**Parte 2 · Q1 · el chat del agente** (inserto ≥ 65 %): encabezado navy **"Parrilla Raúl · agente de IA"** (con un
puntito verde "en línea"); arriba, en gris navy claro, "Miércoles 2:14". Llega la **nota de voz de Pablo** (burbuja con
la onda de audio que avanza con el audio real y "0:03") · el agente escribe ("escribiendo…", 0,3 s) y contesta: **"¡Hola,
Pablo! El viernes a las 22:00 tengo la mesa 7, para 8. ¿Te la reservo?"** · Pablo: "Dale" · agente: **"Listo ✓ Mesa 7 ·
viernes 22:00 · 8 personas. El jueves te pido que confirmes."** · y se abre a su lado el **plano de mesas** (vista desde
arriba: 12 mesas como rectángulos y círculos redondeados con su número; libres en crema, reservadas en navy3, la mesa 7
se pinta y aparece la etiqueta **"Pablo · 8 · 22:00"**). Rótulo: **"Contesta a cualquier hora, con tus mesas reales"**.
**Parte 2 · Q2 · el panel "Reservas de mañana"** (la tablet a ≥ 70 % del cuadro): encabezado navy "Viernes · reservas";
filas con nombre · personas · hora · mesa, y a la derecha el estado: "Gonzalez · 4 · 21:00 · Confirmada ✓", "Ferreira · 2
· 21:30 · Confirmada ✓", … las tildes caen de a una y arriba un contador **"Confirmadas: 0 → 11 de 12"**; la fila **"Pablo
· 8 · 22:00 · Mesa 7 · sin confirmar"** en rojo apagado; abajo, una línea de tiempo chica que avanza: "12:00 · pedido de
confirmación ✓" → "18:00 · segundo aviso ✓" → **"20:00 · Mesa 7 liberada"** (la fila de Pablo se tacha y la mesa 7 en el
plano vuelve a crema) → **"Lista de espera: Walter · 6 → Ofrecida ✓"**. Rótulo: **"Si no confirman, la mesa se libera
sola"**. Después, el aviso vuela (la cámara lo sigue) al **celular de Walter** en el living: chat "Parrilla Raúl · agente
de IA": **"Walter, se liberó una mesa para 6 mañana a las 22:00. ¿La querés?"** con dos botones **"Sí"** (verde) y "No";
toca "Sí" → **"Reservada ✓ Mesa 7 · viernes 22:00 · 6"**.
**Parte 2 · Q3 · el celular del mostrador que contesta solo:** el mismo encuadre de P2 pero con las respuestas: "¿Mesa para 2
a las 21:30?" → agente: **"Sí: mesa 3 ✓"**; "¿Tenés mesa para cuatro?" → "A las 22:30, mesa 5 ✓"; el chip **"Sin
contestar: 14 → 0"** baja con tic y queda verde. Entra una tarjeta distinta (borde verde, ícono de persona): **"Para vos,
Raúl · Cumpleaños de 20 · sábado · quiere menú cerrado"**. Rótulo: **"Lo que es para vos, te lo pasa"**.
**Parte 2 · Q4 · rótulos:** "Mesa 7 · Walter · 6 · $ 9.000 ✓" y **"Mesas vacías por reservas que no vinieron: 0"** (verde).
**Parte 2 · Q5 · la tablet:** ding y tarjeta **"Sábado 22:00 · Mesa 7 · Pablo · 8 · Confirmada ✓"**.
**Tarjeta de cierre (HTML, ~3,6 s, sobre Raúl a cámara):** abajo de la cara (nunca encima), en el 80 % seguro: "Comentá"
(Lexend 800 crema, ~90 px) / **"RESERVA"** (Lexend 900 ~170 px, navy en el recuadro verde de selección) / "y te mando cómo
funciona para tu restaurante" (Lexend 600 crema ~46 px, 2 líneas) / "Agente de IA de reservas: confirma y libera la mesa
solo" (~38 px, crema) / **"scalerics.com"** en verde (~44 px). Entra sobre "RESERVA" de la voz.

## PARTE 1 · el problema (0,00-16,00 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,80 | **P1 · cuadro 0.** Plano medio de Raúl detrás de la parrilla, de 3/4: la parrilla llena en primer plano abajo (la tira, los chorizos, el humo tenue), Raúl con el celular en el hombro anotando en el cuaderno sobre el mostrador a su izquierda, el salón lleno detrás desenfocado con la mesa 7 todavía sin RESERVADO. Push-in lento al cuaderno. | **Cuadro 0:** arriba, **"PARRILLAS"** (Lexend 900 ~130 px, crema con borde navy, ya entero) y el chip "Viernes, 21:00."; la burbuja de teléfono ya asomando. 0,15-2,75 · **Pablo (teléfono): "Raúl, ¿tenés mesa para ocho a las diez? Soy Pablo."** Raúl escribe "PABLO · 8 · 22:00" con la birome (se escribe con la voz). 2,90-3,70 · **Raúl: "¡Anotado, Pablo!"** | parrilla, brasero, carne, pinza, Raúl, celular en el hombro, cuaderno, birome con piolín, salón | murmullo de salón (`salon.wav`) · chisporroteo (`chisporroteo.wav`) bajo · fuego del brasero · birome sobre papel (CC0, ver fuentes) 1,0-2,6 |
| 3,80-5,40 | **P2 · escalada muda.** Travelling lateral (Catmull-Rom) del mostrador a la mesa 7: en el camino, el celular del mostrador vibrando con las burbujas que se apilan; llegamos a la mesa 7 cuando Fabián planta el RESERVADO y reparte los cubiertos con dos movimientos rápidos. Inserto de 0,4 s del cuaderno (tachones, grasa, chimichurri). | 3,85 · "¿Tenés mesa?" · 4,05 "¿Para dos a las 21:30?" · 4,25 "¿Hacen cumpleaños?" · 4,45 "¿Hola?" · chip **"Sin contestar: 9 → 14"** · 4,90 · el RESERVADO cae en su lugar con pop · 5,00-5,30 los cubiertos. | celular del mostrador, mesa 7, RESERVADO, cubiertos, Fabián, cuaderno | vibra ×4 (`vibra.wav`) · pop por burbuja · `k-plato-000` al apoyar platos · cubiertos (CC0) 5,00-5,30 · teléfono de fondo (`k-tono`) |
| 5,40-8,70 | **P3 · la puerta.** Plano desde adentro hacia la puerta de vidrio: Walter y su familia de 6 en la puerta (la campanita arriba), Raúl de espaldas a 3/4 en primer plano a la derecha, y en el medio, entre los dos, la mesa 7 puesta y vacía con el RESERVADO. Contraplano corto a Raúl cuando contesta. | Chip "Viernes, 21:40." 5,55-7,05 · **Walter: "Raúl, ¿tenés mesa para seis?"** 7,10 · Raúl levanta la pinza hacia la mesa 7. 7,20-8,60 · **Raúl: "No, Walter. Esa es de Pablo."** 8,10 · Walter asiente, saluda y se van (la campanita). 8,20 · rótulo **"Familia de 6 que se fue: $ 9.000"**. | puerta con vinilo y campanita, Walter, familia, mesa 7, Raúl, pinza | campanita al entrar 5,40 y al salir 8,30 · pop del rótulo |
| 8,70-11,10 | **P4 · la mesa 7, 22:45.** Plano medio de la mesa 7 a la altura de la mesa: los 8 cubiertos, las copas, el RESERVADO y la vela entera en primer plano; detrás Fabián con la bandeja y Raúl en la parrilla al fondo, foco en la mesa. | Chip "Viernes, 22:45." (flip). 8,85-10,05 · **Fabián: "Raúl, ¿y los de las diez?"** 10,10 · inserto del celular de Raúl: "Pablo · 21:58 · ¡Estamos llegando!" 10,25-11,05 · **Raúl: "Están llegando."** (confiado; la burbuja en su lugar fijo). | mesa 7, vela, RESERVADO, Fabián, bandeja, Raúl, celular | `k-tick-1` en el chip · notification chica en el inserto · el murmullo baja un poco |
| 11,10-13,50 | **P5 · el remate.** EL MISMO encuadre de P4 (corte duro de salto de tiempo): la vela por la mitad, las sillas arriba en las mesas del fondo, la mitad de las lámparas apagadas; Fabián con una silla en la mano. Al "Siguen", corte a primer plano de Raúl de frente (la parrilla con brasas detrás, nunca pared lisa). | Chip "Viernes, 23:40." 11,30-11,70 · **Fabián: "¿Y?"** 11,70-12,35 · pausa: Raúl mira la vela. 12,35-13,35 · **Raúl: "Siguen llegando."** (seco). 13,00 · rótulos **"Mesa de 8 vacía: 22:00 → 00:00"** y **"Cubiertos puestos: 8 · usados: 0"**. | mesa 7, vela, sillas arriba, Fabián, silla, Raúl | silla que se apoya en la mesa (CC0) 11,15 · el murmullo se apaga; solo fuego y la vela · nada encima de la línea |
| 13,50-16,00 | **P6 · remate del remate.** Plano medio de la mesa 7 con Fabián juntando los cubiertos (los tiene en un puño); Raúl entra al cuadro con el celular en la mano; inserto corto del mensaje. Al "Dejá", contraplano de Fabián que se congela. | Chip "Viernes, 23:58." 13,60 · vibra; inserto **"Raúl, perdón, se nos complicó. ¿Mañana a las diez, para ocho?"** 14,40-14,90 · pausa (Raúl lee, suspira). 14,90-15,80 · **Raúl: "Dejá los cubiertos."** 15,20-15,80 · Fabián vuelve a poner el tenedor; Raúl da vuelta la hoja del cuaderno a "SÁBADO" y anota. 15,85 · stinger. | mesa 7, cubiertos en la mano de Fabián, Raúl, celular, cuaderno | vibra 13,60 · cubiertos juntándose (CC0) 13,60-14,20 · tenedor en la mesa 15,40 · página (`k-page-turn`) 15,60 · stinger 15,85 |

Último cuadro (16,00) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,00-18,40 s)
Time card de dibujito de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan, -4°: **"Un agente de
IA"** / **"más tarde…"**. Audio de abren-hoy-completo (Rasalgethi). Nunca "Scalerics". 2,4 s.

## PARTE 2 · la solución (18,40-36,40 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,40-22,60 | **Q1 · 2:14 de la madrugada.** El salón cerrado y a oscuras (luz de la calle por la puerta de vidrio, las sillas arriba, la parrilla apagada con un hilo de humo), el celular del local en el mostrador se prende solo. Push-in hasta el inserto del chat (≥ 65 %); el plano de mesas se abre al lado. | Chip "Miércoles, 2:14." 18,60-21,20 · **la nota de voz de Pablo (el mismo audio 01)** con la onda que avanza. 21,30 · "escribiendo…" y la respuesta: "¡Hola, Pablo! El viernes a las 22:00 tengo la mesa 7, para 8. ¿Te la reservo?" 21,80 · "Dale" · 22,00 · **"Listo ✓ Mesa 7 · viernes 22:00 · 8 personas. El jueves te pido que confirmes."** 22,20 · el plano: mesa 7 → "Pablo · 8 · 22:00". Rótulo "Contesta a cualquier hora, con tus mesas reales". | salón a oscuras, sillas arriba, parrilla apagada, celular, cuaderno cerrado al lado (ya no se usa) | grillos/calle de noche muy bajo (`calle.wav`) · notification 18,55 · pop por burbuja · `cero.mp3` en el ✓ 22,00 |
| 22,60-27,00 | **Q2 · el jueves.** La tablet en su atril a ≥ 70 %: el panel "Reservas de mañana". Después, travelling: el aviso sale de la tablet y vuela al living de Walter (cámara que lo sigue con Catmull-Rom; el celular de Walter crece hasta leerse). | Chip "Jueves, 12:00." 22,80-24,20 · tildes de a una, "Confirmadas: 0 → 11 de 12"; Pablo "sin confirmar" (rojo). 24,20 "18:00 · segundo aviso ✓" · 24,60 **"20:00 · Mesa 7 liberada"** (la fila de Pablo se tacha, la mesa 7 vuelve a crema) · 24,90 "Lista de espera: Walter · 6 → Ofrecida ✓". Rótulo "Si no confirman, la mesa se libera sola". 25,20 · el celular de Walter: "Walter, se liberó una mesa para 6 mañana a las 22:00. ¿La querés?" · 25,50 toca "Sí" → "Reservada ✓". 25,60-26,90 · **Walter: "¡Esta vez sí entramos!"** | tablet, atril, living, sillón, Walter, celular | ding suave por tilde (escalonados) · tic de contador · whoosh-short 25,00 · notification 25,20 · click-soft 25,50 · `cero.mp3` 25,55 |
| 27,00-30,60 | **Q3 · viernes 21:00 (callback del cuadro 0).** EL MISMO encuadre de P1: Raúl detrás de la parrilla, ahora con las dos manos (pinza y pala), sin celular en el hombro; el cuaderno no está: en su lugar, el celular parado contestando solo. Push-in lento al celular. | Chip "Viernes, 21:00." 27,20-28,60 · "¿Mesa para 2 a las 21:30?" → "Sí: mesa 3 ✓" · "¿Tenés mesa para cuatro?" → "A las 22:30, mesa 5 ✓" · chip **"Sin contestar: 14 → 0"** (verde). 28,80 · tarjeta **"Para vos, Raúl · Cumpleaños de 20 · sábado · quiere menú cerrado"**. Rótulo "Lo que es para vos, te lo pasa". 29,40-30,30 · **Raúl: "Ese es para mí."** (mira de reojo, contento, sin soltar la pinza). | parrilla, carne, Raúl, pinza, pala, celular parado | murmullo de salón · chisporroteo · pop por respuesta · tic de contador · notification distinta (más grave) en la tarjeta 28,80 |
| 30,60-33,80 | **Q4 · "Llegaron."** EL MISMO encuadre de P4: la mesa 7, pero llena: Walter en la cabecera, su familia, la tira en la tabla, la vela entera recién prendida. Fabián con la bandeja; Raúl al fondo en la parrilla. | Chip "Viernes, 22:00." 30,80-32,00 · **Fabián: "Raúl, ¿y los de las diez?"** (el mismo audio de P4). 32,10 · Raúl señala la mesa 7 con la pinza. 32,40-33,00 · **Raúl: "Llegaron."** (la burbuja en el lugar de "Están llegando."). 32,80 · Walter levanta la copa. 33,10 · rótulos "Mesa 7 · Walter · 6 · $ 9.000 ✓" y **"Mesas vacías por reservas que no vinieron: 0"**. | mesa 7 llena, Walter, familia, tira, vela, Fabián, Raúl | murmullo · copas que chocan (CC0) 32,85 · pop por rótulo |
| 33,80-36,40 | **Q5 · 23:58 otra vez.** EL MISMO encuadre de P6: Fabián junta los cubiertos de la mesa 7, que la familia acaba de dejar (servilletas usadas, platos con huesitos); la tablet en el atril hace ding. | Chip "Viernes, 23:58." 34,00 · ding; tarjeta **"Sábado 22:00 · Mesa 7 · Pablo · 8 · Confirmada ✓"**. 34,40 · Raúl la mira. 35,00-35,90 · **Raúl: "Dejá los cubiertos."** (contento, sin pausa; la burbuja en el lugar de la de P6). 35,40 · Fabián vuelve a poner el tenedor, ahora sonriendo. | mesa 7 usada, cubiertos, Fabián, tablet, Raúl | cubiertos juntándose · `cero.mp3` 34,00 · tenedor en la mesa 35,50 |

## CIERRE (36,40-40,00 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 36,40-40,00 | **C · Raúl a cámara.** Primer plano de Raúl de frente detrás de la parrilla, la pinza en la mano, el brasero y la pizarra "VIERNES" detrás (nunca pared lisa), el salón cálido desenfocado. Push-in suave. | 36,50-39,40 · **Raúl: "Comentá RESERVA y te mando cómo funciona para tu restaurante."** (de colega, media sonrisa). 37,10 · sobre "RESERVA" entra la tarjeta abajo de la cara; en los últimos 0,8 s, la línea chica "Agente de IA de reservas: confirma y libera la mesa solo" / "scalerics.com". | chisporroteo bajo · pop en "RESERVA" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "PARRILLAS" entero y legible desde el primer cuadro, sin tapar la cara de Raúl; el celular en el hombro y
  el cuaderno se entienden en el plano medio; la burbuja de la llamada asomando.
- **Se entiende sin sonido:** las 14 líneas en burbujas (la de Pablo con el iconito de llamada); los chips de hora; la
  vela que baja; los rótulos en plata; el chat del agente, el panel y el aviso de Walter legibles.
- **Continuidad:** P1 = Q3, P4/P5 = Q4 y P6 = Q5 en encuadre (que el callback se vea: cambia la gente, la vela, el
  cuaderno → celular); la mesa 7 siempre con 8 lugares; la familia de Walter es de 6 en P3 y en Q4 (contarlos); el
  RESERVADO no cambia de aspecto entre planos; la vela entera (P4, Q4) → por la mitad (P5) → cabito (P6) y nunca sube.
- **Física:** el celular en el hombro no atraviesa la oreja ni la barba; el piolín de la birome no atraviesa la mano ni el
  cuaderno; los cubiertos en el puño de Fabián no flotan ni atraviesan los dedos; la pinza no atraviesa la mesa cuando
  Raúl señala; la llama de la vela no toca el RESERVADO ni las copas.
- **Copas y vidrios:** que no hagan bandas en la compresión (colores planos, sin brillos suaves grandes).
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s; si hay que recortar, se recorta P2 o el chat de Q1, nunca los
  callbacks de Q4 y Q5.
- **SFX que no están en assets/sfx** (birome sobre papel, cubiertos, silla que se apoya en una mesa, copas que chocan):
  reales con licencia CC0, con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados.

## Voces (partes/*.txt; tonos en partes/lineas.tsv; detalle en partes/voces.md)
Raúl = Iapetus · Fabián = Achird · Walter = Umbriel · Pablo = Schedar (nuevo, con filtro de teléfono) · narrador del cartel
= Rasalgethi (audio reusado). 15 archivos (10-narrador no se genera); 01-pablo y 05-fabian se reusan en la parte 2.

## Portada
`portada.json`: `chica` "Viernes, 21:40." · `grande` **"¿Tenés mesa?"** (la frase que el dueño escucha cuarenta veces por
noche) · `sello` **"PARRILLAS"**. Fondo limpio (sin gancho, burbujas, chips, rótulos ni logo) de P3 (~6,6 s): Walter y su
familia en la puerta y Raúl señalando con la pinza la mesa 7 puesta y vacía con el RESERVADO, todo en la mitad de arriba.
Alternativa si en el render se ve mejor: el cuadro 0 (Raúl con el celular en el hombro anotando, ~1,6 s; chica "Viernes,
21:00."). Ajustar `t` y `fondo_limpio` con el render.
