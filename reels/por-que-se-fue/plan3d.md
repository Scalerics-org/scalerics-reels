# Plan 3D de por-que-se-fue

Serie "¿Por qué…?" (punto 9a), 3D real (8b), vara de `reels/abren-hoy-completo` (8c). Sin marcas reales.
Producto: sistema a medida de stock (qué se vende, qué se está por acabar, aviso con días de margen).
Voz: solo Orus (90 palabras, ~30 s).

**Fondo: navy oscuro `#0b1220` LISO** (sin degradé ni brillo: compresión de Instagram). Esta noche ya hubo crema
(por-que-buscando) y crema/almacén; la combinación "navy oscuro + góndola/porciones 3D + cierre verde" no se repitió
en los explicadores recientes (por-que-el-final y tres-segundos fueron navy oscuro con otros objetos el 07-11).
Piso navy apenas más claro `#16243d` con sombra suave. Cierre en verde de marca `#5ce611` con letras navy.
Subtítulos blancos/crema con recuadro verde y letras navy en la clave; rojo apagado `#c7655b` para "No había", "nada",
"falte".

Materiales: navy `#16243d`/`#1f3254` (góndola, mostrador, tablet), verde `#5ce611` (lo resuelto, tildes, "?", el
paquete de yerba de la casa), crema `#efeee5` (paquetes, etiquetas de precio, cajas), blanco (pantallas). Rojo
apagado `#c7655b` SOLO para el problema (el hueco y su etiqueta, la porción del 9 %, el contador en 0, la canasta
vacía). Gris crema `#8e8c80` para lo neutro (la otra marca, la espera).

## Objetos 3D (específicos y reconocibles: "¿alguien lo confunde con otra cosa?")
- **EL PAQUETE DE YERBA** (protagonista): ladrillo de 1 kg, más alto que ancho, con el doblez de arriba plegado
  (dos solapas en V, ExtrudeGeometry o RoundedBox con tapa en cuña), papel crema con banda verde y la palabra
  "YERBA" en Lexend 800 navy (textura canvas), una hojita verde dibujada. Sin marca. Variante "otra marca": banda
  gris crema. Que no se confunda con un paquete de harina: la hoja verde y el doblez característico.
- **LA GÓNDOLA**: estante metálico navy con 3 baldas y frente de precios (tiras crema), paquetes alineados de a 6
  por balda. En la balda del medio, a la altura de los ojos, UN HUECO con la etiqueta de precio sola (rojo apagado,
  "$ ---"). Ocupa 80 % del ancho.
- **LAS PORCIONES**: el paquete de yerba gigante (60 % del alto) se rebana en 5 tajadas verticales proporcionales
  (31 / 26 / 19 / 15 / 9), como un gráfico de barras hecho con el paquete. Cada tajada viaja a su destino.
- **LA PUERTA DEL LOCAL DE AL LADO**: marco navy, vidrio crema, cartel colgante "ABIERTO" (genérico) y toldo a rayas
  navy/crema. La tajada del 31 % entra por ahí.
- **LA CANASTA**: canasta de súper de plástico (verde gris apagado, asas navy). Recibe "otra marca" y "otra
  versión"; en el 9 % queda vacía (rojo apagado en el borde).
- **EL RELOJ / CALENDARIO DE TAPA**: almanaque de hojas que se dan vuelta ("Después") para el 15 % que espera.
- **LAS BARRAS DE VENTAS**: los paquetes de la góndola se estiran en barras (ventas de la semana); la barra más alta
  es la del hueco (contorno rojo apagado, vacía por dentro).
- **"?" 3D verde** grande y centrado (bisagra).
- **LA PILA QUE SE VACÍA**: torre de paquetes que bajan uno por uno con un contador 3D arriba (12 → 0) y una notita
  "Pedido: lunes" que llega tarde.
- **RUBÉN** (`personajes.js`, ELENCO.almacenero, no habla), **el almacén de Rubén** (mostrador, estantería, mate y
  termo genéricos, cartel "SÁBADO" en la pizarra), **GRACIELA** (ELENCO.clienta).
- **LA TABLET DEL MOSTRADOR**: RoundedBox navy con pantalla canvas: panel "Stock" con filas (Yerba 1 kg, Fideos,
  Leche) y barritas; la de yerba en ámbar→aviso. Aviso grande: "Yerba 1 kg · quedan 8 · se acaba el sábado" y botón
  verde "Pedir" con tilde. Calendario chico "MARTES".
- **LA CAJA DEL PROVEEDOR**: caja de cartón crema con cinta verde, llena de paquetes de yerba, que cae en el estante.

## Escenas (frase · objeto · transformación/cámara · rótulos · palabra que dispara)
Índices de palabra = posición en `guion.txt` contando desde 0.

1. **s01-gancho** · "Vino por su yerba. No había. ¿Qué hizo?" (palabra 0, ~2,8 s)
   - Cuadro 0 = portada en movimiento: LA GÓNDOLA de frente, leve contrapicado, llena de paquetes de yerba, y en el
     centro EL HUECO con la etiqueta roja sola. Gancho entero Lexend 900, 3 líneas: "Vino por su **yerba**." (yerba en
     recuadro verde) / "No había." (rojo apagado) / "¿Qué hizo?". Se va antes del primer subtítulo.
   - Push-in lento al hueco. En "No había" la etiqueta tiembla (tic seco). En "¿Qué hizo?" un paquete de la balda de
     abajo sube y queda flotando frente al hueco (whoosh corto): es el que se va a rebanar.

2. **s02-otro-lado** · "Casi un tercio se va a comprarla a otro lado." (palabra 8, ~2,6 s) · DESENLACE
   - Sin corte: el paquete crece hasta llenar el cuadro y se rebana en 5 tajadas (pop de cada una, separación en
     abanico). En "tercio" la tajada más ancha (31 %) se ilumina en crema y sale volando a la derecha; la cámara la
     sigue (travelling) hasta LA PUERTA DEL LOCAL DE AL LADO, que se abre (campanita) y la tajada entra.
   - Número 3D "31 %" arriba, limpio, sobre la puerta. Rótulo con línea guía: "Compra en otro local".

3. **s03-marca** · "Otros cambian de marca o esperan." (palabra 18, ~2,0 s)
   - Travelling de vuelta a las tajadas: en "marca" la de 26 % y la de 19 % caen en LA CANASTA y se convierten en un
     paquete de otra marca (banda gris) y uno de otro tamaño (medio kilo). En "esperan" la de 15 % se apoya en EL
     CALENDARIO, que da vuelta dos hojas.
   - Rótulos chicos: "26 % otra marca" · "19 % otra versión" · "15 % espera" (los tres a la vez, arriba, sin pisar).

4. **s04-nada** · "Y nueve de cada cien no compran nada." (palabra 24, ~2,4 s)
   - Queda la tajada más chica (9 %): cae en la canasta y desaparece (la canasta queda vacía, borde rojo apagado,
     rebote seco). Número "9 %" 3D en rojo apagado arriba.
   - Crédito chico abajo (aparece en "nueve", 2 líneas, 36-40 px): "Más de 70.000 compradores · 29 países" /
     "Gruen, Corsten y Bharadwaj, 2002".

5. **s05-lo-que-mas** · "Y suele faltar lo que más se vende." (palabra 32, ~2,4 s) · EL GIRO
   - La cámara sube (grúa) y vuelve a LA GÓNDOLA del gancho (callback). En "faltar" los paquetes de cada columna se
     estiran hacia arriba como BARRAS DE VENTAS; en "más se vende" la barra más alta es la del hueco: un contorno rojo
     apagado, vacío por dentro, con la corona/rótulo "N.º 1 en ventas". Golpe grave en "vende".
   - Rótulo: "El más vendido" con línea guía al hueco.

6. **s06-por-que** · "¿Por qué?" (palabra 40, ~1,6 s) · BISAGRA
   - La barra vacía se dobla y se condensa en UN "?" 3D verde grande, centrado, solo en cuadro (60 % del alto de la
     zona). Push-in. Título dentro del 80 % seguro. Riser corto + sparkle.

7. **s07-rapido** · "Sale tan rápido que se acaba antes de pedirlo." (palabra 42, ~2,8 s)
   - El "?" gira y es LA PILA DE PAQUETES: bajan de a uno con pop (tic-real por paquete) y el contador 3D de arriba
     baja 12 → 0 (rojo apagado al llegar a 0) en "acaba". En "pedirlo" entra desde la izquierda la notita "Pedido:
     lunes" y llega tarde: se apoya sobre la pila vacía (sello seco).
   - Rótulo: "Se vacía antes del pedido".

8. **s08-ruben** · "A Rubén le pasa con la yerba del sábado." (palabra 51, ~2,6 s) · CALLBACK, el problema
   - Zambullida: la cámara cae a través de la notita al ALMACÉN DE RUBÉN, un sábado (pizarra "SÁBADO"). Plano medio:
     Rubén detrás del mostrador, la estantería de yerba con el MISMO HUECO y etiqueta roja; Graciela en la punta del
     mostrador, con la mano estirada al hueco, cara de resignada; Rubén "fastidio" y se rasca la pelada. Campanita.
   - Etiqueta "Rubén" sobre él (nunca en la cara). Rótulo "Sábado · 11:40".

9. **s09-aviso** · "Su sistema a medida le avisa el martes: quedan pocas." (palabra 60, ~3,0 s) · LA SOLUCIÓN
   - Rebobinado del calendario (las hojas vuelven: Sáb → Mar, whoosh) y push-in a LA TABLET del mostrador, que crece
     hasta llenar el cuadro. Panel de stock: filas Yerba 1 kg / Fideos / Leche con barritas; en "martes" la de yerba
     baja a ámbar y salta EL AVISO (notification): "Yerba 1 kg · quedan 8 · se acaba el sábado".
   - Pill "Sistema a medida" en "sistema". Rubén al costado, mate en mano, cejas arriba (sorpresa → sonrisa).

10. **s10-encuentra** · "Pide a tiempo. El sábado, Graciela encuentra la suya." (palabra 70, ~2,8 s) · REMATE
    - En "Pide" Rubén toca "Pedir" (click + tilde verde con pop). Corte con whoosh: LA CAJA DEL PROVEEDOR cae en el
      estante (papel/golpe) y llena el hueco con paquetes de banda verde (pop en cascada). En "sábado" la pizarra vuelve
      a "SÁBADO"; en "Graciela" ella toma SU paquete del estante y sonríe; tilde verde 3D arriba, limpia.
    - Etiqueta "Graciela" sobre ella. Nada de texto encima de las caras.

11. **s11-llamada** · "¿Querés que no te falte? Agendá una videollamada gratis en scalerics.com." (2,5-3 s, arranca en
    "videollamada", palabra 86; "¿Querés que no te falte? Agendá una" va sobre el final del s10, con la góndola llena)
    - Tarjeta de cierre en verde de marca: "Videollamada gratis" en navy y "scalerics.com" grande; de fondo, la góndola
      del gancho con el hueco lleno y la etiqueta ya en verde (callback del cuadro 0).

## Sonido (sugerido, todo de `reels/por-que-buscando/assets/sfx`, con licencias ya anotadas allí)
tic-real en la etiqueta del hueco y en cada paquete de la pila; pop en cada tajada y cada paquete; whoosh-short en
cada travelling, whoosh-cinematic en la zambullida al almacén y en el rebobinado; campanita en la puerta de al lado y
al entrar al almacén; papel en la canasta y en la caja del proveedor; impact-bass-1 en "más se vende"; riser-corto +
sparkle en el "?"; sello en la notita "Pedido: lunes"; notification en el aviso de la tablet; click + ding en "Pedir";
chime en scalerics.com. Nada sintetizado; si falta algo (puerta de vidrio), CC0 anotado en fuentes.md.

## Cuidados (lo que el director de arte va a buscar)
- Las tajadas del paquete NO deben leerse como un pastel genérico: conservan la banda verde y la hojita del paquete.
- "31 %", "9 %" y el contador arriba y limpios, sin pisar la puerta, la canasta ni la pila.
- Los tres rótulos de s03 a 36 px para arriba, sin encimarse; en navy oscuro nunca texto navy.
- En la zambullida al almacén siempre hay un objeto grande en cuadro (la notita que crece, después el estante).
- Graciela: la mano llega al paquete sin atravesar la balda; la etiqueta "Graciela" no va sobre la cara.
- La tablet: texto de 36 px o más, máximo 3 filas + el aviso.
- Ningún logo ni colores de marcas de yerba reales; paquetes con "YERBA" genérico.
