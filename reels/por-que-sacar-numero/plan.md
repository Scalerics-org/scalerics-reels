# Plan de escenas · por-que-sacar-numero (explicador "¿Por qué…?", ~33-34 s, 3D real)

"¿Por qué en la fiambrería te hacen sacar número?". Desenlace en la frase 2: "Para que nadie que llegó después te pase."
Bisagra "¿Por qué?". La prueba: un profesor del MIT (Richard Larson, "Dr. Queue") hizo fila para retirar una bici y
vio a los que llegaron después llevársela antes; pasó años estudiando filas y escribió que **el miedo a que te pasen
muchas veces pesa más que la espera** (Operations Research, 1987; ver `fuentes.md`). **Giro 1 (s08):** la fila no es
solo tiempo, es justicia. **Giro 2 (s09):** en el almacén de Rubén hay fila… pero no se ve (WhatsApp, mostrador, web)
y no hay número. **Callback:** el MISMO numerador del gancho aparece en el mostrador de Rubén y, con el sistema, le da
número a cada pedido venga de donde venga: Graciela 23 (WhatsApp, 9:02) queda primera, Walter 24 (mostrador, 9:10)
segundo. "Graciela, primera." Cierre: videollamada gratis.

- **Producto: sistema a medida de pedidos** (todos los pedidos, de mostrador, WhatsApp y web, en una sola lista por
  orden de llegada, con número y estado). Nunca "bot". En voz: "un sistema"; en pantalla la tablet dice "Pedidos".
- **Qué lo diferencia de lo hecho:** nada en "Hechos" trata de filas ni de orden de llegada. `se-juntan` (03-11, CRM)
  juntaba cuaderno/Excel/post-its en fichas de clientes; acá el punto es el ORDEN y la justicia entre clientes. El dolor
  NO es "no contestar": Rubén vio el mensaje, lo que falla es el orden (ojo constructor: que Graciela no aparezca
  "en visto" ni ignorada; aparece esperando, con su número de pedido sin número).
- **Persona real:** Larson se nombra en texto chico ("Richard Larson · MIT") y **no se dibuja**. La tienda de la
  anécdota no se nombra ni se dibuja con ninguna identidad. "MIT" solo en texto, sin escudo.
- **Sin marcas:** el chat es genérico (burbujas crema y verde Scalerics, sin logo ni verde de WhatsApp); bici genérica.
- **Voz:** Orus (90 palabras) + **Rubén (Algenib), 4 palabras:** "¿Graciela? ¿Vos estabas antes?".
- **Personajes:** módulo más nuevo de personajes (`reels/anotamelo/assets/personajes.js`: ELENCO.almacenero = Rubén,
  ELENCO.clienta = Graciela, ELENCO.walter = Walter; crearMate, crearTermo, crearCelular, crearTablet, crearQueso,
  crearYerba, crearBolsaPapel, crearReloj). Base técnica: `reels/por-que-las-tarjetas` y `reels/por-que-devolver-gratis`
  (tres.js con `renderAt(t)` puro, cámara Catmull-Rom, PMREM, "?" verde, gen.mjs, firma.json, partes/armar-voz).

## Voces
| Parte | Texto | Voz | Tono |
|---|---|---|---|
| `partes/orus1.txt` | frases 1-9 (gancho → "…se fue antes.") | Orus | Narrador de los explicadores, uruguayo, curioso, con ritmo. "¿Por qué?" pregunta de verdad, con pausa antes (+0,3 s). "MIT" = "eme-i-te" en español (si sale "em-ai-ti" está bien también; que se entienda). "que te pasen" con un mini peso, "pesa más que esperar" asentado. "En lo de Rubén, la fila no se ve." con media sonrisa (es el giro). "Walter vino después… y se fue antes." con una micro-pausa antes de "y se fue antes". |
| `partes/ruben.txt` | "¿Graciela? ¿Vos estabas antes?" | **Algenib** (Rubén) | Almacenero uruguayo grave y cansado. "¿Graciela?" sorprendido al ver el celular (subida corta); "¿Vos estabas antes?" más lento, con culpa sincera, sin drama. ~2 s. |
| `partes/orus2.txt` | frases 11-13 ("Con un sistema…" → cierre) | Orus | Igual. "Graciela, primera." con una sonrisa (remate). Cierre natural, sin urgencia. "scalerics.com" = "Scálerics punto com". |

Pausas: +0,3 s antes de "¿Por qué?" (palabra 17), +0,3 s después; +0,25 s después de "esperar" (50); 0,45 s antes de
Rubén y 0,4 s después; +0,3 s después de "primera" (84).

## Fondo y paleta (anotar en "Hechos")
- **Fondo crema `#efeee5` LISO** con líneas y objetos navy y verde (cielo de la escena 3D crema, piso invisible con
  `ShadowMaterial` al ~35 %), **mostrador de fiambrería** (vitrina con vidrio, azulejo navy claro solo en el zócalo
  del mostrador, NO pared de azulejos como en `por-que-el-recordatorio`), y **almacén de Rubén** en la segunda mitad.
  Últimos explicadores: por-que-las-tarjetas navy oscuro (12-11), por-que-devolver-gratis navy claro (12-11),
  por-que-la-toalla navy oscuro (11-11), por-que-el-recordatorio crema con azulejos (11-11). Combinación nueva:
  **crema liso + objetos de mostrador (numerador, tickets, cintas de fila) + cierre verde**.
- **Numerador** (el objeto que viaja): carcasa redondeada verde `#5ce611` con frente navy `#16243d`, ranura y rollo de
  tickets crema `#efeee5` con número navy grande (TextGeometry o textura ≥ 120 px en pantalla). Sin rojo (los reales
  son rojos: acá es de marca).
- **Display "TURNO"**: caja navy con dígitos verdes (TextGeometry extruido), números grandes arriba y limpios.
- Verde = orden y lo resuelto (tickets en orden, tildes, "primera"). **Rojo apagado `#c7655b` SOLO para el problema**:
  el que pasa adelante (flecha que se cuela), el platillo "que te pasen", el chip "sin número" del pedido de Graciela.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 NAVY `#0b1220` con borde crema 14 px (fondo crema);
  palabra clave en recuadro verde con texto navy. Rótulos: placa navy con texto crema y borde verde, línea guía navy de
  7 px, ≥ 36 px. Créditos de datos: mono navy 34-38 px. Logo navy; `firma.json` lo esconde en primeros planos.

## Escenas (tiempos estimados a 0,34 s/palabra + pausas; los reales salen de armar.mjs)
| # | id | palabra | arranca | dura | frase |
|---|----|---------|---------|------|-------|
| 1 | s01-gancho | 0 | 0,0 | 3,1 | ¿Por qué en la fiambrería te hacen sacar número? |
| 2 | s02-nadie-te-pase | 9 | 3,1 | 2,9 | Para que nadie que llegó después te pase. |
| 3 | s03-por-que | 17 | 6,0 | 1,6 | ¿Por qué? |
| 4 | s04-bici | 19 | 7,6 | 3,1 | Un profesor del MIT hacía fila por una bici. |
| 5 | s05-se-la-llevaban | 28 | 10,7 | 2,7 | Los que llegaron después se la llevaban antes. |
| 6 | s06-anos | 36 | 13,4 | 2,1 | Pasó años estudiando filas. Y escribió: |
| 7 | s07-balanza | 42 | 15,5 | 3,3 | que te pasen, muchas veces, pesa más que esperar. |
| 8 | s08-almacen | 51 | 18,8 | 3,1 | En lo de Rubén, la fila no se ve. |
| 9 | s09-graciela | 60 | 21,9 | 1,6 | Graciela pidió por WhatsApp. |
| 10 | s10-walter | 64 | 23,5 | 2,6 | Walter vino después y se fue antes. |
| 11 | s11-ruben | 71 | 26,1 | 2,4 | (Rubén) ¿Graciela? ¿Vos estabas antes? |
| 12 | s12-sistema | 75 | 28,5 | 2,7 | Con un sistema, cada pedido saca número solo. |
| 13 | s13-primera | 83 | 31,2 | 2,2 | Graciela, primera. ¿Ordenamos la tuya? Agendá una |
| 14 | s14-cierre | 90 | 33,4 | 2,8 | videollamada gratis en scalerics.com. |

Total ~36 s. Si queda largo, apretar las pausas (no cortar palabras).

## Brief por escena (objeto 3D protagonista, cámara, rótulos, SFX)

**s01-gancho (0-3,1).** Cuadro 0 = portada en movimiento: el **numerador** 3D enorme (60-70 % del ancho), en
contrapicado suave, con un ticket crema asomando que dice **23**; detrás, fuera de foco, el borde de una vitrina de
fiambrería con un queso y un salame (crearQueso + salame simple: cilindro bordó apagado con atadura crema; ¿alguien lo
confunde? que el salame tenga el piolín y las rodajas en la punta). Gancho entero en el tercio superior desde el cuadro
0 (Lexend 900, 120-140 px, "fiambrería" en verde, "número" en recuadro verde). En "sacar" una mano genérica (solo mano
y puño de camisa navy, sin cara) tira del ticket: **el ticket se corta con un tirón** y se acerca a cámara.
Cámara: push-in lento hacia el ticket. SFX: ambiente de súper muy bajo, "tic" de papel al cortar (s ~2,3), pop chico al
aparecer el gancho no (ya está en el cuadro 0).

**s02-nadie-te-pase (3,1-6,0).** El ticket 23 vuela y se para en una **fila de tickets gigantes en fila india**
(21, 22, 23, 24, 25, de pie como fichas de dominó gruesas, crema con número navy). Arriba, el **display TURNO** navy con
"22" en verde 3D. En "después" un ticket **31** (rojo apagado en el borde) intenta meterse entre el 22 y el 23: se
desliza en diagonal y **rebota** contra una cinta de fila que sube del piso (poste cromo-navy con cinta verde). En
"pase" el display cambia 22 → 23 (dígitos que giran) y el 23 se ilumina con borde verde. Rótulo: ninguno (lo dice el
dibujo); o uno chico "por orden de llegada". Cámara: travelling lateral siguiendo el 23, termina mirando la fila de
frente. SFX: whoosh (vuelo), "boing" seco del rebote, "ding" del display.

**s03-por-que (6,0-7,6).** Bisagra: el display TURNO hace zoom y sus dígitos **se funden en un "?" 3D verde** grande,
centrado, girando apenas sobre crema liso. Un solo objeto. Título "¿Por qué?" dentro del 80 % seguro. SFX: whoosh corto
+ pop del "?".

**s04-bici (7,6-10,7).** El "?" gira y se transforma en el **manubrio** de una bici: la cámara abre y es una **bici
genérica** (crema con cuadro navy y cintas verdes en el manubrio, sin logo) detrás de una **ventanilla de retiros**
(marco navy, cartel crema "RETIROS"), con un **recibo** crema en primer plano con "N.º 2" (Larson era segundo, pero no
lo decimos: el recibo solo marca "esperando"). Cola de recibos de pie como en s02 (eco visual), el nuestro con borde
verde. Créditos mono: "Richard Larson · MIT". No se dibuja ninguna persona ni cara. Cámara: travelling de la bici al
recibo. SFX: timbre de bici (ring) en "bici", pop del rótulo.

**s05-se-la-llevaban (10,7-13,4).** Desde la ventanilla **salen bicis, una, dos, tres**, rodando solas en diagonal
hacia cámara y fuera de cuadro, cada una con un recibo de número MÁS ALTO pegado (5, 7, 9) que pasa por delante del
nuestro (N.º 2), que queda quieto y se va poniendo gris. Arriba, una flechita roja apagada que se suma por cada bici que pasa (tres flechas, sin número: no es un dato). Cámara: queda fija en el recibo, leve push-in. SFX: tres "whoosh"
de rueda + timbre corto cada una, golpe grave al llegar a 3.

**s06-anos (13,4-15,5).** Grúa hacia arriba: el piso se llena de **postes con cintas** que dibujan una **fila en
serpentina** (la fila única) vista desde arriba, y en las vueltas las hojas de un **almanaque** pasan volando (crearAlmanaque)
para "años". En "escribió" la cámara baja a una **revista científica** (bloque de papel crema con tapa navy, título en
mono "OPERATIONS RESEARCH · 1987") que se abre. Rótulo: "Dr. Queue" (apodo) con línea guía a la serpentina. SFX:
whoosh de grúa, aleteo de hojas, golpe suave de la revista.

**s07-balanza (15,5-18,8).** Desde las páginas sube una **balanza de fiambrería** (callback del mostrador: platillo de
acero, carcasa crema y navy, display verde). Platillo izquierdo: **reloj de arena** navy/crema con rótulo "esperar".
Platillo derecho: un **ticket roto con una flecha roja que se cuela** ("que te pasen"). En "pesa más" el platillo de
"que te pasen" **baja de golpe** y el display marca una flecha hacia abajo (sin número). Créditos mono: "Larson,
Operations Research, 1987". Rótulo chico "muchas veces" junto al platillo (para no decir "siempre"). Cámara: órbita
corta de 20° alrededor de la balanza, push-in en "pesa". SFX: dos clics del platillo, "clonc" metálico al bajar.

**s08-almacen (18,8-21,9).** Travelling continuo (sin corte): la balanza se aleja y queda sobre el **mostrador del
almacén de Rubén** (pared crema, estantes con yerba, galletitas, dulce de leche). **Rubén** con el mate; al lado de la
caja, **el MISMO numerador** del gancho, apagado (sin polvo ni telaraña: no se burla de Rubén). En "no se ve" aparecen **cuatro filas fantasma** que salen de
cuatro lados (líneas de puntos navy al 40 %): del celular (WhatsApp), de la puerta (mostrador), de una laptop (web) y
del teléfono fijo, todas apuntando a Rubén, sin orden. Rótulo: "4 filas, ningún número". Cámara: llega en travelling
lateral y queda en plano general del almacén. SFX: campanita de puerta, pop por cada fila fantasma.

**s09-graciela (21,9-23,5).** Split vertical (sin corte seco: la cámara barre a la derecha): **Graciela en su casa**
(sillón y lámpara simples) manda un mensaje desde el celular (crearCelular, pantalla con chat genérico grande, ≥ 36 px):
"Rubén, ¿me separás un queso y una yerba? Gracias" (sin emojis) con hora
**9:02**. El mensaje vuela como burbuja y entra al celular de Rubén, que está apoyado boca abajo en el mostrador.
SFX: tecleo, "fiu" de mensaje enviado, vibración apagada del celular.

**s10-walter (23,5-26,1).** En la puerta del almacén entra **Walter** (chip 9:10 arriba); Rubén le alcanza una
**bolsa de papel** con un queso; Walter saluda y **se va**. Mientras, el celular boca abajo vibra (Graciela sigue
esperando, su chip 9:02 se pone gris). Rótulo: "llegó después" con flecha sobre Walter → "se fue antes" al salir. Cámara:
plano medio que sigue a Walter de la puerta al mostrador y de vuelta. SFX: campanita, papel de bolsa, "¡chau!" sin voz
(solo SFX de paso), campanita de salida.

**s11-ruben (26,1-28,5).** Primer plano de Rubén dando vuelta el celular: la pantalla (grande, de frente a cámara, sin
cortes) muestra el mensaje de Graciela de las **9:02**. Su línea: "¿Graciela? ¿Vos estabas antes?" (boca sincronizada,
ojos abiertos, cejas que suben en "¿Graciela?", mano a la nuca en "¿Vos estabas antes?"). Detrás, por la ventana,
Graciela llegando con su changuito (que ella vino a buscarlo). Rótulo rojo apagado sobre el chat: "sin número". SFX:
pausa de música, "tic" del celular al darse vuelta.

**s12-sistema (28,5-31,2).** El celular se apoya sobre el mostrador y **se transforma en una tablet** "Pedidos" (crearTablet,
pantalla grande que llena el 70 % del ancho). El **numerador** del gancho se prende (luz verde) y escupe tickets que
vuelan a la tablet y se convierten en filas de la lista: **23 · Graciela · WhatsApp · 9:02**, **24 · Walter · mostrador
· 9:10**, **25 · web · 9:14**. Íconos genéricos por canal (globo de chat, mostrador, globo terráqueo) en navy. Las
cuatro filas fantasma de s08 se juntan en una sola línea verde que entra a la tablet. Rótulo: "una sola fila". Cámara:
push-in a la tablet. SFX: "trrr" del numerador por cada ticket, pop por cada fila de la lista.

**s13-primera (31,2-33,4).** En "primera" el pedido 23 se pone verde con **tilde** y "LISTO"; plano general: Rubén le
da la bolsa a Graciela, que sonríe; el display TURNO (vuelve el de s02, ahora en la pared del almacén) marca **23**.
Walter, en la vereda, saluda (no queda mal parado: su pedido 24 también tiene su tilde después). En "¿Ordenamos la
tuya?" la cámara se aleja y el ticket 23 crece hacia cámara para hacer de base de la tarjeta. SFX: "ding" del display,
tilde (pop brillante), campanita.

**s14-cierre (33,4-36,2).** Arranca sobre "videollamada": fondo **verde de marca `#5ce611`** liso, "Videollamada
gratis" en navy Lexend 900 grande y debajo "scalerics.com" grande; el ticket 23 crema chico en una esquina como
firma visual (opcional) y logo. 2,5-3 s. SFX: whoosh de entrada, música que cierra.

## Números y años 3D
- "23" del ticket (s01-s02, s12-s13), display "22 → 23" (s02, s13): arriba y limpios, sin pisar objetos.
- "1987" solo en texto (crédito mono), no en 3D grande (no es el centro de la historia).

## Portada
Fondo limpio (sin gancho, subtítulos ni logo) del numerador con el ticket 23 de s01 o de la balanza de s07; texto encima
(ver `portada.json`).
