# anotamelo · plan plano por plano · PARA MANDAR completo (3D real), ~31,5 s

**De qué trata.** La libreta del fiado. Graciela: **"Anotámelo, Rubén."** y Rubén saca el lápiz de la oreja y anota.
Desfile: Héctor, Walter, Marta, "Anotámelo." y más burbujas; el lápiz se gasta (sacapuntas en cada cliente) y el
almanaque pierde hojas hasta el **30 · COBRAR**. A cobrar: Héctor **"¿Yo te debía?"**, Walter **"¿Eso no te lo pagué el
martes?"**, y el martes tiene una mancha de mate encima del número. Entra Graciela a pagar: **"Rubén, vengo a pagarte.
¿Cuánto es?"**. Rubén va a la última hoja (llena), la contratapa (llena), cierra la libreta; quietud; da vuelta el
antebrazo, lleno de anotaciones como un machete: **"Mil ochocientos cuarenta."** Remate del remate: Héctor, que ahora
sí quiere pagar: **"¿Y yo cuánto te debía?"** y Rubén le agacha la pelada: **"HÉCTOR · DULCE DE LECHE $ 200"**.
Cartel **"Un sistema más tarde…"**. Parte 2: "Anotámelo, Rubén." → la mano va a la oreja, se frena, toca la tablet:
"Anotado."; a fin de mes a Héctor le llega el saldo al celular con el botón Pagar: **"¡Ah, mirá! Yo te debía."**; las
cuentas se ponen en verde; la libreta se jubila en el estante; Rubén, brazo limpio y mate, hace el crucigrama con el
lápiz: FIADO.

- **Producto:** sistema a medida con cuentas corrientes (cada cliente tiene su cuenta y lo que se anota queda ahí) +
  automatización del aviso (a fin de mes le llega solo al celular el saldo con el detalle y un botón para pagar).
  Solo en la línea chica final y en descripcion.txt. El cartel nunca dice "Scalerics". Sin marcas: tablet, celular,
  botón "Pagar" sin logo de ningún medio de pago, diario genérico ("CRUCIGRAMA", sin cabezal de ningún diario real),
  dulce de leche, yerba, galletitas, fideos, azúcar, mate y termo genéricos.
- **Estructura** como `reels/me-haces-precio` y `reels/hacen-envios`: parte 1 (16,8 s, sin línea chica) + cartel
  (3,0 s) + parte 2 (11,7 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel
  adaptado de `reels/me-haces-precio/compositions/cartel.html` con el texto **"Un sistema"** (línea a) / **"más
  tarde…"** (línea b), mismas letras que rebotan, -4°, fondo verde con manchas. Voz nueva de Rasalgethi.
- **Personajes** (copia local de `reels/hacen-envios/assets/personajes.js`): Rubén (ELENCO.almacenero, Algenib),
  Graciela (ELENCO.clienta, Gacrux), Héctor (ELENCO.hector, Sadaltager, con su boina y chaleco mostaza; acá con
  zapatos, no pantuflas), Walter (ELENCO.walter, Umbriel, con su mochila: crearMochila), Marta (ELENCO.duena, Aoede,
  con su delantal verde). Sin Nico, sin Sofi.
- **Mecanismos** (nuevos para la línea): el tiempo pasa en objetos (el lápiz que se gasta, el almanaque que pierde
  hojas), no en un contador ni en un chip de hora; la pausa es de gesto (última hoja, contratapa, cerrar), con la
  música que sigue baja (fundido a -12 dB en 0,4 s, NUNCA cortada seca); el remate es una imagen de Rubén (el
  antebrazo), el remate del remate escala el absurdo (la pelada). Nada de mano a la cabeza ni frente en el mostrador:
  agachar la cabeza para mostrar la pelada es una inclinación de cuello hacia Héctor, las manos quedan abajo apoyadas
  en el mostrador.

## Paleta y set (para "Hechos")
**Almacén de día con paredes crema `#efeee5`**, luz de mañana fría-neutra que entra por una ventana a la izquierda
(DirectionalLight blanca, sombras suaves en el piso y el mostrador), sin lamparitas cálidas (eso fue me-haces-precio).
Ojo: el-audio y que-en-paz-descanse también fueron almacén con pared crema; para diferenciarlo, acá la pared lleva un
**zócalo navy3 `#1f3254` alto (hasta 0,9 m)** y una **guarda verde de marca fina** arriba del zócalo, y el almanaque es
protagonista. Anotar en "Hechos": "almacén de día, pared crema #efeee5 con zócalo navy3 y guarda verde, luz de
ventana de mañana".
- Mostrador navy3 con tapa de madera clara (el de abren-hoy). Estantes de madera clara con mercadería de colores
  planos (yerba, galletitas, fideos, dulce de leche, polenta: los crear* del módulo). Puerta de vidrio a la izquierda
  con marco navy3 y **campanita** (crearCampanita si no existe: campana dorada chica colgada de un fleje).
- Sobre el mostrador: la **libreta** (protagonista), un **sacapuntas de metal** chico (el lápiz es uno solo, el de la
  oreja: nada de frasquito con lápices), la caja registradora chica a la derecha (navy3 con teclas crema, cajón; genérica), el mate y el termo.
- **Rojo apagado `#c7655b` SOLO para el problema**: el círculo "COBRAR" del 30 en el almanaque, la línea del margen
  de la libreta, la mancha de mate no (es marrón). **Verde `#5ce611` para lo resuelto**: "+ $ 320 ✓", el botón
  "Pagar" y "Pagado ✓", las cuentas en verde de la tablet, el recuadro de selección de los subtítulos.
- Burbujas de diálogo: crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Sobre la pared crema llevan el borde navy grueso para despegarse (nada de crema sobre crema sin borde).
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco sobre la pared crema.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **crearLibretaFiado**: libreta de tapa dura **navy3** con las esquinas un poco gastadas (crema2 en los cantos),
  **espiral metálica arriba** (anillos gris claro, que se vean de a uno: es lo que la hace "libreta" y no "libro"),
  hojas crema con **renglones celeste pálido `#b9cde0` de 6 px** y **margen rojo apagado** a la izquierda, letra a
  mano en Caveat 700 color grafito `#3a3f4a` (canvas por hoja, ≥ 40 px en los planos cercanos). En la tapa, una
  etiqueta crema pegada torcida: **"FIADO"** en Caveat. Hojas que se dan vuelta hacia arriba por la espiral (bisagra
  en el borde de arriba, curva al pasar). En P3 aparece **gorda**: hojas que asoman, puntas dobladas, y una **gomita**
  crema2 cruzada. Tamaño: en P1 llena el ~55 % del ancho del cuadro.
- **crearLapiz**: hexagonal, cuerpo **mostaza `#d9a441`** (el lápiz de toda la vida; no es rojo ni verde), punta de
  madera clara afilada con grafito navy, virola gris y goma rojo apagado. Largo variable (parámetro): 0,19 → 0,15 →
  0,11 → 0,07 → 0,04 → **0,025 m (cabito)**; se acorta desde la punta (la goma y la virola no cambian). Va **detrás de
  la oreja derecha de Rubén** (pegado al hueso de la cabeza, inclinado, sin atravesar la oreja ni la cabeza), y pasa a
  la mano al escribir. Con cada cliente, una lluvia de **virutas** de sacapuntas (rizos de madera con borde mostaza,
  6-8, con semilla) que caen al mostrador y se quedan ahí (continuidad: se acumulan).
- **crearAlmanaque**: taco de almanaque de pared (tablita de cartón navy3 con un colgante, bloque de hojas crema),
  número del día **Lexend 900 navy grande** (se lee a ≥ 120 px en el inserto) y el mes arriba en chico ("MES" genérico:
  no hace falta nombrarlo). Las hojas se arrancan y vuelan (giran y caen, no desaparecen). El **30**: círculo rojo
  apagado a mano y **"COBRAR"** en Caveat. En la parte 2 el 30 aparece limpio, sin círculo.
- **Antebrazo escrito** (variante de Rubén: decal curvo sobre el antebrazo izquierdo, cara interna, canvas con
  transparencia): 6 renglones en Caveat grafito, de la muñeca al codo: **"Graciela 1.840"** (el más grande, arriba,
  con un subrayado), "Héctor dulce", "Walter fideos x2", "Marta azúcar", "Nelly pan", "Beto ???". Se lee entero en el
  push-in (≥ 44 px el primero). Pegado a la piel, sin flotar ni cortarse en el codo.
- **Pelada escrita** (decal sobre la coronilla de Rubén, casquete de esfera apenas más grande que la cabeza): en dos
  renglones, **"HÉCTOR"** / **"DULCE DE LECHE $ 200"**, Caveat grafito, centrado. Se lee entero cuando agacha la
  cabeza a cámara (≥ 48 px). No se ve antes (está arriba y de espaldas a la cámara en los planos anteriores: chequear
  que no asome en P1-P5).
- **crearSacapuntas**: sacapuntas de metal plateado chico (bloque con la cuchilla y el agujero cónico), sin marca; se
  ve en P2 y P3 al lado de las virutas.
- **Mancha de mate**: un anillo marrón `#7a5a3a` semitransparente (la marca del fondo del mate) sobre el número del
  martes en la libreta.
- **crearDiario** (parte 2): diario doblado en cuatro, papel crema2 con columnas de texto gris simuladas (bloques, sin
  letras reales), recuadro **"CRUCIGRAMA"** con grilla navy de casillas grandes; las letras F-I-A-D-O aparecen en Caveat
  grafito una por una en una horizontal.
- Reusados del módulo: crearMate, crearTermo, crearTablet, crearCelular, crearBolsaPapel, crearYerba,
  crearGalletitas, crearDulceDeLeche, crearFideos, crearPolenta, crearMonedero (Graciela), crearBillete, crearMochila,
  crearBanquito.

## PARTE 1 · el problema (0,00-16,80 s)

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,10 | **P1 · cuadro 0.** Plano desde el lado del cliente, picado leve sobre el mostrador: **la libreta abierta en primer término** (abajo, ~55 % del ancho, renglones legibles con dos anotaciones viejas ya escritas), Graciela a la izquierda de perfil 3/4 apoyando la bolsa de papel, Rubén detrás del mostrador de frente con el **lápiz largo detrás de la oreja**. Push-in lento hacia la libreta. | **Cuadro 0:** arriba al centro, el gancho entero Lexend 900 ~130 px: **"Anotámelo, Rubén."** con "Anotámelo" en el recuadro verde; ya están la libreta, Graciela y Rubén. 0,25 · voz de Graciela (el gancho se apaga y arrancan los subtítulos). 1,00 · Rubén saca el lápiz de la oreja (la mano sube por el costado, sin pasar por delante de la cara). 1,40-2,05 · escribe: en la hoja aparece trazo a trazo **"Graciela · yerba, galletitas · $ 320"**. | campanita de la puerta 0,00 (bajo) · ambiente de almacén (heladera, calle lejos) todo el reel · música pizzicato desde 0,0 · lápiz escribiendo (CC0) 1,40 |
| 2,10-5,30 | **P2 · el desfile.** Cámara continua (Catmull-Rom): órbita corta de 140° alrededor del mostrador hasta quedar **por encima del hombro derecho de Rubén** (la oreja con el lápiz en primer término, grande, arriba a la derecha; la libreta abajo; el cliente de turno de frente al otro lado del mostrador; el almanaque en la pared de atrás del cliente, a la izquierda). Los clientes se reemplazan en time-lapse (salen por un lado, entran por la puerta, sin cortes). | 2,20 · **Héctor** con un dulce de leche: "Anotámelo." · 2,95 · **Walter** con fideos y la mochila: "Anotámelo." · 3,65 · **Marta** con un paquete de azúcar: "Anotámelo." · 4,35 / 4,60 / 4,80 · tres burbujas "Anotámelo." más, cada vez más rápidas (sin voz: vecinos genéricos de paso, de espaldas o fuera de foco, o solo la burbuja y la mano que se lleva algo). Con cada uno: Rubén anota, saca punta en el sacapuntas de metal del mostrador (giro rápido de muñeca) y vuelve a la oreja **más corto** (0,19 → 0,15 → 0,11 → 0,07 → 0,04 → 0,025); virutas al mostrador; la libreta pasa hojas solas; el almanaque de atrás pierde hojas 1 → 8 → 15 → 22 (las hojas vuelan). | pop por burbuja · sacapuntas (CC0) por cliente 2,85 / 3,55 / 4,25 / 4,95 · hojas de libreta (papel) · hoja de almanaque que se arranca (papel) |
| 5,30-6,00 | **P3 · el 30.** Push-in rápido al almanaque (llena el 70 % del cuadro): la hoja 22 vuela, y las siguientes en ráfaga, hasta el **30** con el círculo rojo apagado y **"COBRAR"**. 5,75 · la cámara baja de golpe (tilt) a la libreta sobre el mostrador: **cerrada, gorda**, hojas que asoman, la gomita; al lado, el **cabito** de lápiz y la montañita de virutas. | La música baja un escalón. | ráfaga de hojas 5,30-5,60 · tic 5,60 (el 30) · whoosh-short 5,75 |
| 6,00-9,40 | **P4 · cobrar.** 6,00 contraplano sobre el hombro de Rubén: Héctor de frente, plano medio, Rubén le muestra la libreta abierta. 7,25 corte a Walter en el mismo encuadre (llega con la mochila). 8,60 **inserto** cenital de la libreta (llena el cuadro): la hoja del martes. | 6,15 · **Héctor**, cejas arriba, curioso y sin picardía: **"¿Yo te debía?"**. 7,35 · **Walter**, rascándose la nuca: **"¿Eso no te lo pagué el martes?"**. 8,60 · inserto: "MARTES · Walter · fideos x2 · $ …" con la **mancha de mate** justo encima del número y la letra de Rubén que se pone ilegible (garabato); 8,95 la libreta gira 90° (la mano de Rubén la gira), 9,20 gira 180°: sigue sin entenderse. | pop por burbuja de voz · roce de papel 8,95 / 9,20 |
| 9,40-14,30 | **P5 · la pausa y el remate.** 9,40 plano general medio desde el costado del mostrador: la puerta a la izquierda, Graciela entra; Rubén a la derecha con la libreta. 11,30 contraplano: primer plano de las manos de Rubén con la libreta (por encima de su hombro). 12,20 plano medio de Rubén de frente (Graciela de espaldas en primer término, a la izquierda, fuera de foco). 12,60-13,00 **push-in rápido** al antebrazo. | 9,40 · campanita, entra **Graciela** con el monedero abierto, contenta: 9,60 **"Rubén, vengo a pagarte. ¿Cuánto es?"**. 11,30 · Rubén pasa a la última hoja: **llena hasta los márgenes** (renglones apretados, anotaciones torcidas en el borde); 11,75 · la contratapa por dentro: **llena** también; 12,10 · cierra la libreta (golpecito de tapa). **12,20-12,90 quietud de almacén**: la música baja a -12 dB en 0,4 s (no se corta), solo la heladera y un tic de reloj; Graciela espera, parpadea, sonríe; Rubén mira la libreta cerrada, cara de nada (CARA.neutra, ojos abiertos). 12,50 · Rubén da vuelta el antebrazo izquierdo hacia cámara, palma arriba: **lleno de anotaciones en lápiz**. 12,60-13,00 push-in: **"Graciela 1.840"** arriba, subrayado. **13,00 · voz (Algenib): "Mil ochocientos cuarenta."** (subtítulo con **"cuarenta."** en el recuadro verde). | campanita 9,40 · papel (hojas) 11,30-11,80 · tapa que cierra 12,10 · tic del reloj 12,40 · roce de manga / whoosh-short muy bajo 12,55 · voz 13,00 |
| 14,30-16,80 | **P6 · remate del remate.** 14,30 plano medio de los dos sobre el mostrador (Graciela deja los billetes). 14,70 contraplano: la puerta, Héctor entrando con la billetera en la mano. 15,95 plano sobre el mostrador desde el lado de Héctor, **cámara alta** (que mira la coronilla de Rubén cuando agacha la cabeza). 16,20-16,80 push-in corto a la pelada. | 14,35 · Graciela apoya dos billetes y se va contenta (saluda con la mano). 14,70 · **Héctor**, servicial, ya con la billetera: **"¿Y yo cuánto te debía?"**. 15,95 · Rubén, cara de nada, sin decir nada, **inclina la cabeza hacia adelante** (cuello y torso, manos apoyadas en el mostrador): en la pelada, en lápiz, **"HÉCTOR"** / **"DULCE DE LECHE $ 200"**. 16,30 · Héctor se arrima, se acomoda los lentes y lee. Fin de la parte 1. | billetes (papel) 14,35 · campanita 14,70 · voz 14,80 · un "pop" seco muy bajo cuando aparece la pelada 16,10 · la música vuelve a subir para el cartel |

Último cuadro (16,80) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Un sistema más tarde…" (16,80-19,80 s)
El de me-haces-precio adaptado: **"Un sistema"** (línea a, 140 px) / **"más tarde…"** (línea b, 146 px), Lexend 900
crema con borde navy, letras que rebotan, -4°, fondo verde de marca con manchas y burbujas. Entra girando el último
cuadro de la parte 1, sale con iris al primer cuadro de la parte 2. Voz Rasalgethi nueva (`partes/10-narrador.txt`),
stinger y whooshes del ejemplar. Nunca dice "Scalerics".

## PARTE 2 · resuelto (19,80-31,50 s)

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 19,80-22,40 | **Q1 · callback de P1:** el mismo encuadre del cuadro 0, pero en primer término, donde estaba la libreta, hay una **tablet** apoyada en un atril (pantalla canvas ~55 % del ancho): "Cuentas · Almacén de Rubén" con la lista de clientes. Rubén con un **lápiz nuevo, largo,** detrás de la oreja; el antebrazo limpio. | 20,00 · **Graciela**: "Anotámelo, Rubén." (la misma toma de P1). 21,10 · la mano de Rubén sube sola hacia la oreja (el mismo movimiento de P1)… 21,40 se frena a mitad de camino, la mira… 21,60 baja y toca la tablet: la fila **"Graciela"** se abre y entra **"+ $ 320 ✓"** en verde (yerba, galletitas). 21,80 · Rubén, tranquilo: **"Anotado."** | campanita 19,80 · click-soft 21,60 · ding chico 21,70 |
| 22,40-25,60 | **Q2 · fin de mes.** 22,40 inserto rápido del almanaque: hoja que vuela y **30**, ahora **sin círculo rojo**. 22,90 plano medio desde el lado de Rubén: entra Héctor, abre la boca para preguntar… 23,10 le vibra el celular. 23,25 **inserto del celular en la mano de Héctor** (llena el 60 % del cuadro, la mano con los dedos alrededor): notificación **"Almacén de Rubén · Tu cuenta del mes: $ 1.260"**, el detalle (dulce de leche, galletitas, yerba…) y un botón verde grande **"Pagar"**. 24,00 plano medio de Héctor. | 24,05 · **Héctor**, contento de enterarse: **"¡Ah, mirá! Yo te debía."** 25,20 · toca **Pagar** (inserto corto) · 25,40 **"Pagado ✓"** en verde. | hoja de almanaque 22,40 · vibra 23,10 · notification 23,15 · click-soft 25,20 · ding 25,40 |
| 25,60-28,00 | **Q3 · la tablet y la libreta.** Primer plano de la tablet de Rubén (por encima de su hombro, ~65 % del cuadro): la lista de cuentas. Después grúa corta hacia el estante. | 25,70 · "Héctor" pasa a **"Pagado ✓"** en verde · 26,05 · "Walter" (con el detalle **"Martes: pagado ✓"**: callback de la mancha) · 26,40 · "Marta ✓" · 26,75 · "Graciela ✓" (cada fila se pinta de verde con un pop). 27,10-28,00 · la cámara sube al estante: la mano de Rubén deja **la libreta gorda con su gomita** acostada en el estante de arriba, al lado del dulce de leche: se jubila (un poquito de polvo que se levanta al apoyarla). | pop por fila 25,70 / 26,05 / 26,40 / 26,75 · whoosh-short 27,10 · golpecito de la libreta sobre la madera 27,80 |
| 28,00-31,50 | **Q4 · cierre.** Plano medio de Rubén detrás del mostrador, sentado en el banquito, el mate en la mano izquierda (el **antebrazo limpio** a la vista), el diario doblado en el crucigrama sobre el mostrador; push-in suave hasta que el crucigrama y Rubén llenan el cuadro. | 28,40 · Rubén saca el lápiz de la oreja (largo, nuevo) y escribe en una horizontal del crucigrama, letra por letra, **F-I-A-D-O** (28,70-29,50). Toma un sorbo de mate (sin guiño). 30,00 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Un sistema anota el fiado y le avisa a cada cliente"** / **"scalerics.com"** en verde (1,5 s, hasta el final). Sin tarjeta de videollamada. | lápiz escribiendo 28,70-29,50 · sorbo de mate (si hay CC0; si no, nada) · final de la música |

## Revisión pedida para este reel (además de 8c)
- El lápiz detrás de la oreja: siempre pegado al costado de la cabeza, sin atravesar la oreja ni la cabeza, y se nota
  que se achica en cada cliente (el largo coincide con el momento: largo en P1, cabito en P3-P6, nuevo y largo en la
  parte 2).
- La libreta, el almanaque, el antebrazo y la pelada **se leen en el celular** (Caveat grafito ≥ 40-48 px donde importa).
- La pelada escrita NO asoma antes de P6 (revisar los planos donde la cámara está alta).
- El antebrazo: decal pegado a la piel, sin flotar al girar, sin cortarse en la muñeca ni en el codo.
- Continuidad: las virutas se acumulan en P2-P6; la libreta está gorda con gomita desde P3; en la parte 2 la libreta
  no está en el mostrador hasta que Rubén la deja en el estante en Q3 (que esté guardada en un cajón o debajo del
  mostrador antes: que no aparezca de la nada; o mejor, que Rubén la saque de debajo del mostrador a la vista).
- Ningún cliente con cara de vivo o burlona: Héctor y Walter dudan de buena fe, Graciela y Héctor quieren pagar.
- **SFX que no están en assets/sfx** (lápiz escribiendo sobre papel, sacapuntas, hoja de almanaque arrancada, tic de
  reloj de pared, heladera): reales con licencia CC0 (Kenney, espejos de GitHub con licencia, como en hacen-envios),
  con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados. Si no aparece un sacapuntas CC0, usar un roce de
  madera/papel real y anotarlo.

## Portada (sugerencia)
`t` ≈ 13,2 (el antebrazo lleno de anotaciones en primer plano, Rubén detrás) o ≈ 16,5 (la pelada escrita y Héctor
leyendo). `chica`: "Fin de mes." · `grande`: "¿Yo te debía?" · `sello`: "El fiado". Acento `#5ce611`. Renderizar el
fondo sin gancho, subtítulos ni burbujas.
