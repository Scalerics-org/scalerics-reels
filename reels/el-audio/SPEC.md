# el-audio · PARA MANDAR completo (3D real), ~30,2 s

> **Nota de construcción (10-11): los tiempos que mandan son los de `gen.mjs` (objeto `T`), no los de las tablas de
> abajo.** Con las voces reales el reel quedó en 32,6 s: parte 1 0-16,5 (P1 0-2,0 · P2 2,0-5,0 · P3a 5,0-6,95 · P3b
> 6,95-9,0 · P4 9,0-10,95 · P4b 10,95-12,5 · P5 12,5-14,45 · P6 14,45-15,72 · P6b 15,72-16,5), cartel 16,5-19,7,
> parte 2 19,7-32,6 (Q1 19,7-21,8 · Q1b 21,8-23,3 · Q2 23,3-24,7 · Q3 24,7-26,8 · Q4 26,8-29,6 · Q5 29,6-32,6).
> Cambios respecto de este SPEC: el mate va en la mano derecha de Rubén (toca la pantalla con la izquierda); Q1 sin
> cebar; el 6:47 de Q5 es un audio de **Nelly** ("¡Hola, Nelly! La polenta está a $ 90. ¿Te la separo?"), solo en la
> capa HTML; línea chica "Un agente de IA contesta los precios por vos · scalerics.com"; ficha de arranque "¡Hola,
> Rubén! ¿Cómo andás?" en P1.


**De qué trata.** El audio de WhatsApp de cuatro minutos para preguntar un precio. Graciela le manda a Rubén un audio de
**4:12**; él le da play y en el audio pasa de todo (el sobrino de Las Piedras, el perro que se comió una media, el frío,
la vecina del 3, la Nelly o la Beba) mientras al mate se le va el vapor, la luz de la vidriera pasa de mañana a noche y
Rubén lo pone en **2x** sin que se acorte. Recién al final: "¿A cuánto está la polenta? Beso." La luz vuelve de golpe a
la mañana: la pill dice **10:19** (fueron cuatro minutos). Música que se corta, pausa, Rubén graba su respuesta:
**"Noventa."** Debajo del 4:12 aparece su audio de **0:01**. Remate del remate: "Graciela está grabando un audio…" →
**6:47** (tuba) y Rubén, sin cambiar la cara, pone un **segundo termo** en el mostrador. Cartel **"Un agente de IA más
tarde…"**. Parte 2: el mismo 4:12 lo escucha el agente en un segundo y contesta "La polenta está a $ 90. ¿Te la
separo?" + "Saludos a tu sobrino."; Rubén ceba tranquilo, la luz no se mueve; entra Graciela en persona: "¡Rubén! ¿Te
conté lo de mi sobrino?"; Rubén levanta el segundo termo: **"Contame."** y le ceba un mate; el 6:47 lo contesta el
celular solo.

- **Producto:** agente de IA que escucha los audios del cliente, entiende la pregunta y contesta al instante con tus
  precios y stock, a cualquier hora. Solo en la línea chica final y en descripcion.txt. El cartel NUNCA dice
  "Scalerics". Sin marcas: chat genérico (navy/crema/verde, sin logo ni colores de ninguna app de mensajería), polenta
  y termo genéricos.
- **Recurso visual central:** el **celular de Rubén con la burbuja de audio** (onda gruesa, barra de avance, contador
  de duración 3D) y el **contraste 4:12 / 0:01** una burbuja abajo de la otra. La **luz de la vidriera** que cae del día
  a la noche y vuelve de golpe (el tiempo que "se sintió"), el **mate que deja de humear** y el **segundo termo**.
- **Estructura** como `reels/me-lo-guardas`: parte 1 (14,6 s, sin línea chica) + cartel (3,2 s) + parte 2 (12,4 s, con
  la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. El cartel se reusa de
  `reels/abren-hoy-completo/compositions/cartel.html` (mismo texto: "Un agente" / "de IA" / "más tarde…") con su audio
  `assets/audio/cartel.wav`.
- **Personajes:** **Rubén** (ELENCO.almacenero, protagonista, voz Gemini Algenib) y **Graciela** (ELENCO.clienta, voz
  Gemini Gacrux: en la parte 1 solo como audio de celular filtrado y en un contraplano en su casa; en la parte 2 en
  persona). Sin Orus. Sin Walter (dos noches seguidas ya).
- Sin emojis, sin rayas largas en textos visibles. Textos en pantalla ≥ 36 px (en el celular ≥ 40 px). Nada de "bot".

## Paleta y set (para diferenciarlo en el feed)
- **Almacén con pared crema `#efeee5`** y **luz que cambia**: es lo que hace distinto este set. Mañana (luz blanca
  desde la vidriera de la izquierda, manchas duras en el piso), atardecer (naranja cálido `#e9a65a`, sombras largas),
  noche (azul `#0b1220` del otro lado del vidrio, farol de la vereda prendido, interior con la lamparita del techo). La
  pared crema hace que el cambio de luz se lea en el celular. (que-en-paz-descanse, 09-11, también fue crema de día:
  acá el protagonista es el celular en primer término y la vidriera con el time-lapse; si el coordinador prefiere no
  repetir crema, la alternativa es pared navy oscuro `#0b1220` con la vidriera grande como fuente de luz; NO navy claro
  `#16243d`, que fue de me-lo-guardas.) Anotar en "Hechos": "almacén con pared crema y luz de vidriera que pasa de día a
  noche".
- Mostrador navy3 `#1f3254` con tapa de madera (el de abren-hoy), estantes con mercadería de colores planos (mostaza
  `#d9a441`, rojo apagado, blanco, navy; poco verde), **una fila de paquetes de polenta** amarillo mostaza con banda
  crema (genéricos, sin marca, se lee "POLENTA" en Lexend 800 navy) bien a la vista detrás de Rubén.
- Texto: navy sobre crema, crema sobre navy. Nada blanco sobre la pared crema. Burbujas de diálogo: crema con borde navy
  de 8 px y sombra dura, letra navy Lexend 800, cola hacia quien habla.
- Rojo apagado `#c7655b` SOLO para el problema: el contador de duración de los audios de la parte 1 (4:12, 6:47) y la
  barra de avance que "no avanza". Verde `#5ce611` para lo resuelto: "Audio escuchado ✓", el botón de play que se
  aprieta en la parte 2, el recuadro de selección de los subtítulos, "Separada ✓".

## Objetos 3D (específicos, que nadie los confunda)
- **Celular de Rubén** (crearCelular de que-en-paz-descanse/me-lo-guardas, funda navy3), acostado y apenas inclinado
  sobre la madera del mostrador, en primer término. Pantalla canvas con **chat genérico**: encabezado navy con
  "Graciela" y un avatar círculo crema con "G" (lila del pelo de Graciela en el borde); **burbuja de audio de la clienta**
  crema con botón de play circular navy, **onda de 30-40 barras gruesas** (≥ 8 px en pantalla, que Instagram no las
  ablande), bolita de avance verde que recorre la onda, y la duración abajo a la derecha. Burbuja de audio de Rubén
  (navy claro, onda corta de 6 barras). Indicador "Graciela está grabando un audio…" con micrófono y punto rojo apagado
  que late. Vibra = temblor + 2 mm sobre la madera. Todo el texto de la pantalla ≥ 40 px en los planos cercanos.
- **Contador de duración 3D pegado a cámara**, arriba y limpio (el mismo lugar que "Hoy: 47 veces" / "Guardados: 27"):
  placa navy con borde verde, "Audio:" en crema y el tiempo en TextGeometry **rojo apagado**: `0:00 / 4:12` que corre;
  rodillo cuando salta (1:02 → 2:14 al 2x; 4:09 → 4:12 al final); en el remate del remate cambia a `6:47` con flip.
  En la parte 2: `4:12` → "escuchado ✓" en verde. Nunca pisa caras.
- **Mate de Rubén** (crearMate) con **vapor** (3-4 cintas de humo crema semiopacas, gruesas, que ondulan por T,
  deterministas) y **termo** (crearTermo). El vapor se apaga en P3a (el mate se enfrió) y vuelve en la parte 2.
- **Segundo termo**: otro crearTermo, distinto color (navy con detalle verde), que Rubén apoya con un golpe seco en P6 y
  levanta en Q4. Es el callback: tiene que ser el mismo en las dos partes.
- **Vidriera** a la izquierda con la vereda y un **farol** que se prende en la noche; la luz que entra (DirectionalLight
  + manchas en el piso) cambia de color y de ángulo por T.
- **Reloj de pared** redondo (marco navy, fondo crema, agujas navy gruesas, segundero verde) sobre la estantería: en
  la parte 1 las agujas giran rápido durante el time-lapse y vuelven de golpe a **10:19** con la luz; en la parte 2 marca
  10:15 → 10:16 quieto.
- **Etiquetas de "temas del audio"** (los que se entienden sin sonido): fichas 3D crema con borde navy de 8 px y letra
  navy Lexend 800 que saltan desde la burbuja de audio y se apilan alrededor del celular con pop: "el sobrino", "el
  perro", "la vecina del 3", "el frío", "la Nelly (o la Beba)". Máximo 3 a la vista; la vieja sale achicándose.
- **Paquete de polenta** (nuevo, crearPolenta: caja/bolsa rectangular mostaza `#d9a441`, banda crema con "POLENTA"):
  en la estantería en todos los planos generales; en Q2 se le pega una etiquetita "Graciela ✓" verde.
- **Casa de Graciela (solo P2):** un rincón chico: pared lila muy apagada o crema `#e6e1d3` con un cuadrito, una
  planta en maceta y la ventana; Graciela camina y gesticula con el celular delante de la boca (pose GRABA: mano derecha
  con el celular a la altura del mentón, mano izquierda gesticulando).

## PARTE 1 · el problema (0,0-14,6 s)
Pill de hora abajo a la derecha (como abren-hoy s01-hora), flip y tic al cambiar: `MARTES · 10:15` (0,0) → la pill no
se mueve durante el time-lapse → **`MARTES · 10:19`** (9,6, con la luz que vuelve).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,20 | **P1 primer plano del celular** en el mostrador, ocupando ~55 % del ancho, abajo; Rubén atrás en plano medio (la cara arriba, nítida), con el mate humeante en la mano izquierda. Push-in lento. Luz de mañana. | **Cuadro 0 = la escena + el gancho**: en la pantalla, "Graciela" arriba y la burbuja de audio con **4:12** grande y la onda larguísima; el contador 3D arriba ya dice **"Audio: 0:00 / 4:12"**. Rubén con CARA.sonrisa (le escribe Graciela). 0,30 · el pulgar de Rubén toca play (el dedo entra desde arriba, no atraviesa la pantalla). 0,45 · arranca el audio (graciela-1, filtrado): "¡Hola, Rubén! ¿Cómo andás? Mirá, te cuento, porque ayer vino mi sobrino, el de Las Piedras…". La bolita de avance casi no se mueve; el contador corre 0:01, 0:02… 1,80 · primera ficha "el sobrino" salta de la burbuja (pop). | ambiente (calle.wav con pasabajos) y pizzicato desde 0; click-soft 0,30; pop 1,80 |
| 2,20-3,80 | **P2 contraplano: Graciela en su casa**, plano medio, cámara a la altura de la cara, órbita corta. | Graciela camina feliz (CARA.feliz) grabando con el celular delante del mentón, gesticula con la mano libre, se ríe. Sigue graciela-1 hasta "Las Piedras…" y entra graciela-2 (3,10): "…y el perro, divino, pero se comió una media entera…". 3,20 · ficha "el perro" (pop, pegada a cámara arriba a la derecha). | pop 3,20 |
| 3,80-5,70 | **P3a general del almacén** desde el lado de la clienta: vidriera a la izquierda, Rubén atrás del mostrador con el mate, el celular sobre la madera, el reloj de pared arriba, la fila de polenta atrás. Dolly lateral lento hacia la derecha. **La luz empieza a caer**: de blanco a naranja (3,8-5,7), las sombras se alargan, las agujas del reloj giran rápido. | Corta graciela-2 en "entera" y entra graciela-3 (3,85): "…¿y viste el frío que hace? Yo le dije a la del tres…". Fichas "el frío" (4,30) y "la vecina del 3" (4,90). El contador del audio va en 1:02. 4,60 · Rubén sorbe el mate: **ya no humea**; aleja la bombilla y mira el mate (CARA.fastidio suave, no enojo). | pop 4,30 y 4,90; sorbo 4,60; tic-real rápido de fondo (las agujas) bajito |
| 5,70-7,60 | **P3b plano medio de Rubén** con el celular en primer término (más cerca que P1, la pantalla se lee). **Atardecer → noche**: la luz se pone azul, se prende el farol de afuera (6,90) y la lamparita del techo. | 5,80 · Rubén toca **"2x"** (chip verde que salta en la pantalla y en el contador: "2x"); graciela-4 a 2x: "…y ahí me dice la Nelly, no, pará, ¿la Nelly o la Beba? La Beba…". Ficha "la Nelly (o la Beba)" (6,30). 6,60 · el contador: rodillo a **"2:14 / 4:12"** (sigue faltando la mitad). 6,80 · Rubén apoya la mejilla en la mano (FACEPALM suave, codo en el mostrador), CARA.resignado. | click-soft 5,80; pop 6,30; key-press 6,60; whoosh-short bajito con el farol 6,90 |
| 7,60-9,80 | **P4 primer plano de la pantalla del celular** (la burbuja de audio llena ~75 % del ancho), push-in muy lento. Noche (la pantalla ilumina). | La bolita llega al final de la onda: contador **4:09 → 4:10 → 4:11** (key-press cada uno). graciela-5 (7,70): "…bueno, no te molesto más. **¿A cuánto está la polenta?** Beso." Cuando dice "polenta" (~8,70) aparece la última ficha, más grande y en el centro, con recuadro verde de selección: **"¿A cuánto está la polenta?"**. 9,50 · "Beso." → contador **4:12** y la bolita se apaga. **9,60 · la luz vuelve de golpe a la mañana** (todo el cuadro se aclara de un saque) y la pill hace flip a **`MARTES · 10:19`**. | key-press ×3; pop 8,70; whoosh invertido (whoosh.mp3 al revés) + tic-real 9,60 |
| 9,80-12,10 | **P5 primer plano de Rubén de frente**, mañana otra vez, la fila de polenta desenfocada atrás. | **9,80 la música se corta seca.** Pausa 9,80-10,60 (solo ambiente): Rubén levanta la cabeza de la mano y mira a cámara, cara de nada (CARA.resignado, párpados a media asta). 10,50 · acerca el celular a la boca (mano derecha, el celular de canto abajo en cuadro, sin tapar la boca) y aprieta el micrófono: chip "Grabando · 0:00" crema sobre navy pegado a cámara. **10,70 · voz (Algenib): "Noventa."** (~0,8 s; la boca sigue la envolvente). Subtítulo abajo de la cara (como s02-linea de abren-hoy), **"Noventa."** en el recuadro verde. 11,60 · suelta el botón. | whoosh-short 10,45 (push-in a la cara); click-soft 10,55; voz; burbuja.mp3 (enviado) 11,65 |
| 12,10-14,60 | **P6 = encuadre de P1** (el celular en primer término, Rubén atrás), ahora con la pantalla legible: **la burbuja 4:12 arriba y la de Rubén 0:01 abajo**, una sobre la otra (la onda larga contra la cortita). | 12,15 · pop de la burbuja **0:01** (navy claro, onda de 6 barras). 12,60 · abajo, **"Graciela está grabando un audio…"** con el micrófono que late. 13,20 · llega el audio: burbuja nueva con **6:47** y la onda que no entra en la burbuja (sigue de largo hasta el borde); el contador 3D flip a **"Audio: 6:47"** + **tuba**. Rubén no cambia la cara. 13,70 · su mano izquierda apoya **un segundo termo** en el mostrador, al lado del celular (golpe seco). 14,00-14,60 · Rubén mira a cámara, sostiene. Fin de la parte 1 (sin línea chica). | pop 12,15; notification 13,20; key-press + tuba 13,20; sello.wav (el termo) 13,70 |

Último cuadro (14,60) → `assets/img/fin-parte1.png` para el giro del cartel.

**La pausa antes del remate:** 9,80-10,70 (corte seco de música + mirada a cámara + push-in). El remate visual
(0:01 debajo de 4:12) llega 1,5 s después de la palabra, para que sea un segundo golpe.

## CARTEL · "Un agente de IA más tarde…" (14,6-17,8 s)
El de `reels/abren-hoy-completo/compositions/cartel.html` tal cual (mismo texto, mismas tres líneas). Fondo verde de
marca `#5ce611` con manchas y burbujas, letras Lexend 900 crema con borde navy que rebotan, -4°. Entra girando el último
cuadro de la parte 1 (540°), sale con iris al primer cuadro de la parte 2. Voz Gemini Rasalgethi: **"Un agente de IA
más tarde."** (reusar `reels/abren-hoy-completo/assets/audio/cartel.wav`). Stinger y whooshes iguales que en el
ejemplar. **No dice "Scalerics".**

## PARTE 2 · resuelto (17,8-30,2 s)
Pill de hora: `OTRO MARTES · 10:15` (17,8) → `10:16` (22,0). La luz es de mañana y **no se mueve** en toda la parte 2.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 17,80-19,90 | **Q1 = encuadre de P1 (callback):** el celular en primer término, Rubén atrás cebando mate (crearTermo en la mano, el mate **humea**). | 17,90 · llega el mismo audio de Graciela: **4:12** (pop). El contador 3D: "Audio: 4:12". 18,20 · Rubén no lo toca. En la pantalla, debajo, una línea del agente: "Escuchando…" y la bolita de avance **recorre toda la onda en 0,7 s** (whoosh rápido). 18,95 · **"Audio escuchado ✓"** en verde; el contador cambia a **"escuchado ✓"** verde (ding). 19,25 · respuesta del agente (burbuja navy claro, letra crema, "respondido automáticamente" ≥ 28 px): **"¡Hola, Graciela! La polenta está a $ 90. ¿Te la separo?"** | pop 17,90; whoosh-short 18,20; cero.mp3 18,95; respuesta.wav 19,25 |
| 19,90-21,40 | **Q1b push-in a la pantalla** (Rubén atrás desenfocado sorbiendo). | 19,95 · segunda burbuja del agente: **"Saludos a tu sobrino."** (escuchó todo) (pop). 20,60 · respuesta de Graciela en texto, cortita: **"¡Sí! Paso en un rato."** (burbuja crema). 20,90 · Rubén sorbe atrás (el vapor se ve). | respuesta.wav 19,95; burbuja.mp3 20,60; sorbo 20,90 |
| 21,40-23,00 | **Q2 = encuadre de P3a (callback):** general del almacén, misma vidriera, mismo reloj; **la luz se queda de mañana** y el reloj marca 10:16 quieto. | 21,50 · al paquete de polenta del estante se le pega una etiquetita **"Graciela ✓"** verde (pop). Rubén, tranquilo, ceba y toma mate; el segundo termo está en el mostrador. 22,00 · flip de la pill a `10:16`. | pop 21,50; tic-real 22,00 |
| 23,00-25,00 | **Q3 = mismo general, hacia la puerta**: entra Graciela. | 23,05 · **campanita**: entra Graciela en persona (CARA.feliz), con su cartera, va al mostrador. 23,60 · voz (Gacrux, sin filtro) y burbuja: **"¡Rubén! ¿Te conté lo de mi sobrino?"** (pop). | campanita 23,05; pasos (tac/tic-real) 23,1-23,5; pop 23,60 |
| 25,00-27,50 | **Q4 = encuadre de P5 (callback):** primer plano de Rubén de frente, push-in lento. | 25,00-25,50 · pausa: Rubén la mira, se le arma media sonrisa (CARA.sonrisa suave). 25,50 · levanta **el segundo termo** a cuadro (el mismo de P6). **25,80 · voz (Algenib): "Contame."** (~0,7 s). Subtítulo con **"Contame."** en el recuadro verde. La música baja 9 dB mientras habla. | voz; sello.wav suave (el termo) 25,50 |
| 27,50-30,20 | **Q5 general que se abre** (dolly atrás suave), de 3/4: Rubén y Graciela a los dos lados del mostrador, el celular de Rubén en primer término a la derecha. | 27,55 · Rubén le ceba un mate y se lo alcanza; Graciela lo agarra feliz y arranca a contar (burbuja chica **"Resulta que…"**). 28,00 · el celular **vibra**: llega otro audio, **6:47** (el del remate del remate), y debajo, solo: **"Audio escuchado ✓"** y la respuesta "¡Qué lindo lo del perro! Ya te la separé." (navy claro, "respondido automáticamente"). Nadie lo mira. 28,60 · **línea chica** abajo (caja navy con borde verde, como s03-cierre de abren-hoy, Lexend 600 ≥ 36 px): **"Un agente de IA escucha los audios"** / **"y contesta por vos"** / **"scalerics.com"** en verde (1,6 s, hasta el final). Sin tarjeta de videollamada. | burbuja.mp3 27,60; vibra 28,00; respuesta.wav 28,20 |

## Cámara
PLANOS de abren-hoy (cortes entre planos, Catmull-Rom adentro de cada uno). P3a es un dolly lateral con el time-lapse,
P4 un push-in muy lento a la pantalla, P5 el push-in rápido a la cara antes de "Noventa.". Los planos de la parte 2
repiten EXACTO el encuadre de su par de la parte 1 (P1→Q1, P3a→Q2, P5→Q4): el callback se ve. En las transiciones
siempre hay un objeto grande en cuadro (el celular o Rubén), nunca la pared crema lisa.

## Sonido por tramo (techo -31 LUFS por efecto; voz ≥ 6 LU arriba del resto mientras habla; final -14 LUFS, pico -1,5)
- **0 a 9,8:** ambiente (calle.wav con pasabajos, que de noche baja un poco), pizzicato liviano; el audio de Graciela
  filtrado como celular (es la voz: la música y los SFX van ≥ 6 LU abajo mientras suena), pops de las fichas, sorbo,
  click del 2x, key-press del contador, tic-real bajito con las agujas, whoosh invertido cuando vuelve la luz.
- **9,8 a 12,1:** **la música se corta seca**; solo ambiente, whoosh corto del push-in, click del micrófono, la voz,
  y el "enviado".
- **12,1 a 14,6:** pop del 0:01, notification del 6:47, **tuba**, golpe seco del segundo termo.
- **Cartel:** como abren-hoy-completo (whoosh, stinger CC0, narrador, whoosh del iris).
- **17,8 a 30,2:** música tranquila (pizzicato más bajo, nunca se corta: todo anda), pop del audio que llega, whoosh
  corto de la escucha rápida, ding (cero.mp3) en "escuchado ✓", respuesta.wav en cada respuesta del agente, sorbos,
  campanita y pasos de Graciela, vibra; la música baja 9 dB mientras hablan Graciela y Rubén.
- Todo con grabaciones reales ya registradas (las de `reels/que-en-paz-descanse/assets/sfx` y `assets/bgm`, créditos en
  los fuentes.md de me-lo-guardas y anteriores). No usar golpe.mp3 ni tictac.wav (sin licencia registrada). Nada
  sintetizado. Sin ladrido (no hay uno registrado): "el perro" va solo como ficha. Si se quiere un ladrido lejano dentro
  del audio de Graciela, solo uno real CC0 anotado en fuentes.md.

## Qué sumar a personajes.js (copia local, partiendo de la de me-lo-guardas, que ya tiene crearCelular, papelito, etc.)
- `crearPolenta()` (paquete mostaza con banda crema "POLENTA"), `crearReloj()` (pared, agujas por parámetro),
  `crearVapor()` (cintas de humo deterministas por T, con intensidad 0-1), un segundo termo `crearTermo(MARCA.navy3,
  MARCA.g)`.
- Poses: `GRABA` (Graciela con el celular delante del mentón, mano libre gesticulando), `MICRO` (Rubén con el celular
  cerca de la boca, sin taparla), `APOYA_MEJILLA` (codo en el mostrador, mejilla en la mano, sin que los dedos entren a
  la cara), `CEBA` (Rubén con el termo vertiendo en el mate), `ALCANZA_MATE` (Rubén le pasa el mate a Graciela; las
  manos se encuentran en el mate, no lo atraviesan).
- La casa de Graciela (P2): un set chico aparte, en otro lugar de la escena (sin que se vea el almacén).

## Riesgos para el QA (buscarlos a propósito)
- Que la pantalla del celular se lea en P1, P4, P6, Q1 y Q1b (onda gruesa, 4:12 / 0:01 / 6:47 ≥ 40 px, nada cortado
  por el borde); que el contraste 4:12 arriba / 0:01 abajo se entienda en un vistazo en P6.
- El dedo de Rubén que toca play y 2x: no atraviesa el vidrio.
- El vapor del mate: está en P1, se apaga en P3a, no está en P3b ni P5, vuelve en la parte 2 (continuidad).
- El segundo termo: no está antes de 13,7; está desde ahí en todos los planos de la parte 1 y en toda la parte 2
  (mismo color y lugar hasta que Rubén lo levanta en Q4).
- La luz: que el regreso a la mañana en 9,6 sea un golpe limpio (sin un cuadro negro en el medio) y que la parte 2
  nunca cambie de luz. Nada de bandas en el degradé del atardecer (colores planos, poco degradé: compresión de
  Instagram).
- El reloj de pared: 10:19 desde 9,6 en la parte 1; 10:15-10:16 en la parte 2; nunca otra hora en un plano quieto.
- Graciela en su casa (P2): que no aparezca nada del almacén; el celular delante del mentón sin tapar la boca.
- Las fichas de temas: máximo 3 a la vista, nunca sobre la cara de Rubén ni sobre el contador.
- Manos al pasar el mate (Q5) y al apoyar la mejilla (P3b): nada atraviesa caras ni bombillas.
- "Saludos a tu sobrino." y "¡Qué lindo lo del perro!" bien escritos (es el callback que prueba que el agente escuchó).

## Portada (portada.json, fondo LIMPIO=1, sin fichas ni subtítulos ni contador ni pill)
- Fondo: P6 ~14,2 s (el celular con 4:12 arriba, 0:01 abajo y 6:47 llegando, Rubén atrás con el segundo termo) o P1 ~0,2
  s (Rubén con el mate humeante y el 4:12 en la pantalla); zoom 1,2-1,3.
- `chica`: "Para preguntar un precio:" · `grande`: "un audio de 4:12" · `sello`: "Para mandar" · acento y sello
  `#5ce611`.

## Duración
Parte 1 14,6 s + cartel 3,2 s + parte 2 12,4 s = **30,2 s**. Voces: Graciela ×6 (Gacrux; 5 como audio filtrado y 1 en
persona), Rubén ×2 (Algenib: "Noventa." / "Contame."), narrador del cartel (Rasalgethi: "Un agente de IA más tarde.").
