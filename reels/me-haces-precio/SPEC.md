# me-haces-precio · PARA MANDAR completo (3D real), ~31,9 s

**De qué trata.** "¿Me hacés precio?" en un pote de dulce de leche de **$ 200**. Héctor (personaje nuevo: jubilado
canchero, boina, chaleco mostaza, monedero de cuero) regatea por deporte: "¿Ciento ochenta?" / "Doscientos." ·
"¿Ciento noventa? Vengo todos los días." / "Doscientos." · se arrima un banquito y se sienta · apila monedas: "Tengo
ciento noventa en monedas." · a Rubén se le vacía el termo. Rubén se rinde: **"Ciento noventa y cinco."** Héctor:
"¡Hecho!", choque de manos, apoya un **billete de 200**. Rubén abre la latita y saca una moneda de 5 para el vuelto. La
música se corta. Héctor: **"Dejá. Quedate con el vuelto."** (pagó los 200: nunca fue por la plata). Rubén con la
moneda en la mano, cara de nada. Remate del remate: en la puerta, Héctor le cuenta a Graciela "¡Me lo dejó en ciento
noventa y cinco!" y Graciela: **"Rubén, ¿me hacés precio?"**; Rubén apoya la frente en el mostrador. Cartel **"Unos
puntos más tarde…"**. Parte 2: Héctor vuelve con el mismo pote, abre la boca ("¿Me hac…") y le vibra el celular: su
tarjeta del almacén, **180 / 200 puntos · Premio: un dulce de leche**. "¿Cuánto es?" / Rubén: **"Doscientos."** /
"¡Pago!" · **+20 puntos** · la barra se llena · **"¡Premio! Un dulce de leche ✓"** · Héctor, el mismo puño de
"¡Hecho!": **"¡Gané!"**. Rubén le apoya el segundo pote. En la puerta: "¡Pagué doscientos y me llevo dos!" y Graciela,
celular en mano: **"Rubén, ¿me hacés puntos?"**; Rubén le acerca el lector: "+20 ✓". Línea chica.

- **Producto:** Scalerics Puntos (el cliente suma con cada compra, lleva la tarjeta en el celular, canjea premios; el
  dueño ve quién viene y cada cuánto). Solo en la línea chica final y en descripcion.txt. El cartel NUNCA dice
  "Scalerics" y la tarjeta del celular tampoco (dice "Mis puntos · Almacén de Rubén"). Sin marcas: dulce de leche,
  billete, monedas, celular y lector genéricos (el billete NO copia el diseño de ningún billete real: papel crema con
  guarda verde y "200" grande; las monedas son discos dorados lisos con un "5" en relieve).
- **Recurso visual central:** el **pote de dulce de leche con la etiqueta colgante "$ 200"** y el **duelo de números 3D**
  arriba del mostrador: el "200" crema que no se mueve contra las ofertas de Héctor en rojo apagado (180, 190) que se
  tachan y caen; en la rendición el 200 rueda a **195**; en la parte 2 el 200 se queda y se le prende un tilde verde.
  En la parte 2 manda la **tarjeta de puntos en el celular de Héctor** (barra que se llena).
- **Estructura** como `reels/el-audio` y `reels/me-lo-guardas`: parte 1 (16,4 s, sin línea chica) + cartel (3,0 s) +
  parte 2 (12,5 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. El cartel se adapta de
  `compositions/cartel.html` (copiado de el-audio/abren-hoy-completo) con el texto nuevo en dos líneas: **"Unos
  puntos"** (línea a, 136 px) / **"más tarde…"** (línea b, 146 px), mismas letras que rebotan, -4°, fondo verde con
  manchas. Voz nueva de Rasalgethi: "Unos puntos más tarde." (no sirve el cartel.wav de abren-hoy-completo).
- **Personajes:** **Rubén** (ELENCO.almacenero, protagonista, Algenib), **Héctor** (nuevo, `ELENCO.hector`, Sadaltager)
  y **Graciela** (ELENCO.clienta, Gacrux, solo en la puerta en P7 y Q4). Sin Orus, sin Walter.
- Sin emojis, sin rayas largas en textos visibles, nada de "bot". Textos en pantalla ≥ 36 px (en el celular ≥ 40 px).
- **Lo que NO va** (ya usado esta noche y las anteriores): contador que sube + tuba (no hay tuba.mp3 en assets/sfx a
  propósito), remate "X, Graciela.", guiño con el mate al cierre, pill de hora como recurso, Walter.

## Héctor (sumar a personajes.js, mismo estilo que el resto del ELENCO)
`hector: { nombre: "Héctor", piel: PIEL.clara, pelo: PELO.canoso, peinado: "corto" (costados blancos cortos, que no se
vea casquete: la boina tapa arriba), cejasColor: 0xe8e4dc, cejaGruesa: true (cejas blancas tupidas, pícaras),
bigote: null (Rubén ya tiene bigote: Héctor va afeitado), camisa: 0xdfe6ee (celeste muy pálido), mangas: "largas",
cuello: 0xdfe6ee, pantalon: MARCA.navy2, zapatos: 0x6b3f2e, panza: 0.94, nariz: 0.064, mejillas: 0xe8968a, alto: 1.03,
lentes: MARCA.navy3 (finos) }` + accesorios nuevos:
- **Boina** navy3 `#1f3254` (disco aplanado con el borde abullonado y un piquito arriba), inclinada a la derecha. Es su
  silueta: que se lea en la puerta a contraluz.
- **Chaleco de lana mostaza `#d9a441`** abierto sobre la camisa (variante de `campera` sin mangas, `chaleco: { color:
  0xd9a441, botones: MARCA.navy3 }`). Contra la pared navy oscuro y con la luz cálida es lo que lo separa de Rubén.
- **Monedero de cuero** marrón `#6b3f2e` con boquilla de metal dorado (dos bolitas que cierran), que se abre: de ahí
  salen las monedas.
- Cara: sonrisa canchera de costado (CARA.sonrisa con `asim` en las cejas), nunca burlona. Pose **PUÑO** (brazo derecho
  arriba, puño cerrado a la altura de la boina, el codo afuera: no pasa por delante de la cara) para "¡Hecho!" y
  "¡Gané!" (tiene que ser LA MISMA pose en las dos partes).

## Paleta y set (para diferenciarlo en el feed)
- **Almacén con pared navy oscuro `#0b1220`** y **luz cálida**: dos lamparitas colgantes con pantalla de chapa navy3 y
  foco ámbar `#e9a65a` (PointLight cálida sobre el mostrador) + la luz principal tibia de arriba a la izquierda;
  contraluz fría suave para despegar las siluetas de la pared. Esta noche ya hubo crema (el-audio) y navy claro
  (me-lo-guardas, por-que-el-caramelo). Anotar en "Hechos": "almacén con pared navy oscuro #0b1220 y lamparitas
  cálidas sobre el mostrador". La pared es lisa (colores planos, sin degradé: compresión de Instagram); el calor lo
  ponen los objetos iluminados, no un brillo en la pared.
- Mostrador navy3 `#1f3254` con tapa de madera (el de abren-hoy). Estantes de madera clara con mercadería de colores
  planos (crema, mostaza, rojo apagado, blanco; poco verde) y **una fila de potes de dulce de leche** (los mismos
  crearDulceDeLeche) a la altura de la cabeza de Rubén. Puerta de vidrio a la izquierda con marco navy3 y campanita.
- Texto: crema sobre navy, navy sobre crema. Burbujas de diálogo: crema `#efeee5` con borde navy de 8 px y sombra
  dura, letra navy Lexend 800, cola hacia quien habla. Sobre la pared navy oscuro se leen solas.
- Rojo apagado `#c7655b` SOLO para el problema: las ofertas de Héctor (180, 190) y sus tachaduras, y el 195 de la
  rendición. Verde `#5ce611`: lo de la parte 2 (barra de puntos, "+20 puntos", "¡Premio! ✓", tilde del 200, "+20 ✓")
  y el recuadro de selección de los subtítulos.

## Objetos 3D (específicos, que nadie los confunda)
- **Pote de dulce de leche** (crearDulceDeLeche: pote blanco, etiqueta mostaza "DULCE DE LECHE", tapa navy) con una
  **etiqueta colgante de cartulina crema** atada con hilo a la tapa: **"$ 200"** en Lexend 900 navy, que en los planos
  cercanos se lee ≥ 60 px. Escalarlo ×1,6-1,8 respecto de la mercadería del estante (es el protagonista; en Q3 hay
  dos iguales).
- **Números 3D del regateo** (TextGeometry Lexend 800, pegados a cámara arriba, en la franja y 300-560, nunca sobre una
  cara): "**$ 200**" crema con borde navy, siempre en el centro. Las ofertas de Héctor entran desde la izquierda en
  rojo apagado ("180", "190"), chocan contra el 200, una raya roja las tacha y caen girando fuera de cuadro. En P4 el
  200 hace rodillo a **195** (rojo apagado: es la derrota). En P6 el 195 se queda chico en la esquina. En la parte 2,
  el 200 vuelve crema y en Q3 se le prende un **tilde verde** al lado.
- **Banquito de madera** (cuatro patas, asiento redondo) que Héctor arrastra desde la pared y en el que se sienta a la
  altura del mostrador (P3a). En la parte 2 el banquito está contra la pared, **vacío** (callback).
- **Monedas**: discos dorados `#c9a24a` con borde marcado y un "5" en relieve, que caen del monedero y se apilan en
  **tres torrecitas** sobre la madera (P3b). En la parte 2 no hay monedas en el mostrador.
- **Billete de 200 genérico**: rectángulo crema con guarda verde oscuro `#3fa60a` y "200" grande navy en las dos
  esquinas (sin próceres, sin escudo, sin diseño real). Se apoya plano sobre la madera con un golpecito.
- **Latita de las monedas** de Rubén (lata redonda navy3 con tapa, de galletitas vieja, sin marca) que abre y de donde
  saca **una moneda de 5**; en P6b Rubén la sostiene entre el índice y el pulgar, a cámara.
- **Mate y termo de Rubén** (crearMate, crearTermo): en P3b Rubén inclina el termo sobre el mate y **no sale nada**
  (sin chorro; el termo se inclina, pausa, se endereza: se vació de tanto regateo). En la parte 2 el termo está lleno
  y Rubén toma mate tranquilo (sin guiño).
- **Celular de Héctor** (crearCelular, funda mostaza a juego con el chaleco): pantalla canvas con la tarjeta de puntos:
  encabezado navy "Mis puntos · Almacén de Rubén", nombre "Héctor", barra gruesa (≥ 40 px de alto en pantalla) verde
  sobre navy claro con "**180 / 200**", abajo el premio con un dibujito del pote y "**Premio: un dulce de leche**".
  Luego "**+20 puntos**" (pop verde), la barra se llena a **200 / 200** y aparece "**¡Premio! Un dulce de leche ✓**".
  Todo ≥ 40 px en el primer plano (Q1b).
- **Lector / tablet de Rubén** (crearTablet de `reels/abren-hoy/assets/personajes.js`, apoyada en un atril sobre el
  mostrador) solo en la parte 2: en Q2b se ve de costado con una ficha "**Héctor · 5 veces esta semana**" (lo que ve el
  dueño); en Q4 Rubén la levanta hacia el celular de Graciela y aparece "**+20 ✓**".
- **Celular de Graciela** (el de siempre de el-audio/me-lo-guardas) en Q4, con su tarjeta "Mis puntos · 0 / 200" que
  pasa a "20 / 200".

## PARTE 1 · el problema (0,0-16,4 s)
Música desde 0: `bgm/pizzicato.wav` (juguetona, como un duelo de truco). Ambiente: `calle.wav` con pasabajos a 1800 Hz.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-1,90 | **P1 plano medio de Héctor, de 3/4, desde atrás del hombro de Rubén** (el hombro y la oreja de Rubén desenfocados en el borde derecho). Héctor apoyado en el mostrador, el **pote con la etiqueta "$ 200"** en la mano levantado a la altura de la cara, ocupando ~25 % del ancho, adelante. Push-in lento. | **Cuadro 0 = la escena + el gancho**: el gancho entero en grande (capa HTML, Lexend 900 ~130 px, "precio" en verde): **"¿Me hacés precio?"**, y Héctor ya con la sonrisa canchera. El "$ 200" 3D arriba ya está. 0,25 · voz hector-1 **"¿Me hacés precio?"** (el gancho se convierte en su burbuja). | ambiente + pizzicato desde 0; pop 0,25 (burbuja) |
| 1,90-3,00 | **P2 contraplano: Rubén de frente**, plano medio, mate en la mano derecha, la fila de potes de dulce de leche atrás. | Rubén lo mira, sorbe el mate, y burbuja **"Doscientos."** (2,30). CARA.neutra, párpados a media asta: ya sabe lo que viene. | sorbo 2,05; pop 2,30 |
| 3,00-5,60 | **P3a general de perfil del mostrador** (los dos de cuerpo entero hasta la cintura, Héctor a la izquierda, Rubén a la derecha), la cámara hace un travelling lateral lento. Las burbujas alternan de un lado y del otro. | 3,10 · Héctor: **"¿Ciento ochenta?"** y el "180" 3D rojo entra desde la izquierda, choca con el 200, se tacha y cae. 3,70 · Rubén: **"Doscientos."** 4,20 · Héctor: **"¿Ciento noventa? Vengo todos los días."** + "190" que choca, se tacha y cae. 4,90 · Rubén: **"Doscientos."** 5,10 · Héctor se da vuelta, arrastra el **banquito** y se sienta, apoya los codos en el mostrador (se instala). Máximo 2 burbujas a la vista: la vieja sale achicándose. | pop en cada burbuja; whoosh corto + key-press en cada número que choca; un golpe chico (sello.wav bajito) cuando cae; arrastre del banquito con papel.wav grave (o un roce CC0 real si se encuentra, anotar en fuentes.md) 5,10-5,40 |
| 5,60-7,10 | **P3b primer plano del mostrador**, cenital a 45°: las manos de Héctor y el monedero en primer término, el mate y el termo de Rubén a la derecha. | 5,65 · Héctor abre el monedero (las bolitas de la boquilla se separan) y las **monedas caen y se apilan en tres torres**; burbuja **"Tengo ciento noventa en monedas."** (5,90). 6,50 · la mano de Rubén entra con el termo, lo inclina sobre el mate… **no sale nada**; lo endereza, lo mira (6,50-7,05). | monedas: ping.mp3 cortado en golpecitos (como en por-que-el-caramelo) o un "coins on table" CC0 real (anotar); pop 5,90; click-soft cuando el termo vuelve a apoyarse |
| 7,10-8,70 | **P4 primer plano de Rubén de frente**, push-in lento. | Rubén cierra los ojos un segundo (CARA.resignado), suspira y abre: **7,60 · voz ruben-1 "Ciento noventa y cinco."** Subtítulo abajo de la cara con **"cinco"** en el recuadro verde. 8,30 · el 200 3D hace **rodillo a 195** (rojo apagado). | key-press + whoosh corto del rodillo 8,30 |
| 8,70-9,90 | **P5 plano medio de Héctor** (encuadre de P1 más abierto), se para del banquito. | 8,80 · **PUÑO**: voz hector-2 **"¡Hecho!"** (burbuja grande). 9,30 · le tiende la mano a Rubén y **choque de manos** sobre el mostrador (las manos se encuentran de costado, sin atravesarse). | cachetada.mp3 (palmada) 9,35; pop 8,80 |
| 9,90-12,20 | **P6 primer plano del mostrador** (encuadre de P3b): billete, latita y las manos. | 9,95 · Héctor apoya el **billete de 200** sobre la madera (golpecito). 10,20 · Rubén abre la **latita**, busca, saca **una moneda de 5** y la levanta para dársela. **10,50 · la música se corta seca.** Pausa (solo ambiente). 10,90 · la mano de Héctor entra con la palma abierta, gesto de "dejá": voz hector-3 **"Dejá. Quedate con el vuelto."** (burbuja grande, ~45 px). | papel.wav corto (billete) 9,95; click-soft (tapa de la lata) 10,20; ping corto (la moneda) 10,40 |
| 12,20-13,00 | **P6b primer plano de Rubén**, quieto, con la moneda de 5 entre el índice y el pulgar a la altura del pecho (en cuadro, al lado de la cara, sin taparla). | Cara de nada (CARA.neutra, párpados a media asta); mira la moneda, mira a cámara. El 195 3D chiquito en la esquina. Sostener. | solo ambiente |
| 13,00-15,60 | **P7 general hacia la puerta** desde atrás del mostrador (el hombro de Rubén en primer término a la derecha). | 13,05 · **campanita**: Héctor sale con su pote en alto y en la puerta se cruza con **Graciela** que entra. 13,20 · Héctor, orgulloso, le muestra el pote: voz hector-4 **"¡Me lo dejó en ciento noventa y cinco!"** (burbuja). Héctor sale. 14,60 · Graciela mira el pote, mira a Rubén, se le ilumina la cara (CARA.esperanza): voz graciela-1 **"Rubén, ¿me hacés precio?"** (burbuja). | campanita 13,05; pop 13,20 y 14,60; pasos (tac-real) 13,1-13,6 |
| 15,60-16,40 | **P7b primer plano de Rubén** (encuadre de P4). | 15,80 · Rubén apoya despacio **la frente en la madera del mostrador** (la cabeza baja, nada atraviesa el mostrador ni el mate). Fin de la parte 1 (sin línea chica). | sello.wav (golpe sordo) 15,95 |

Último cuadro (16,40) → `assets/img/fin-parte1.png` para el giro del cartel.

**La pausa antes del remate:** 10,50-10,90 (música cortada, la mano de Rubén con la moneda quieta en el aire) y el
remate visual sigue en P6b (la moneda en la mano, cara de nada): un segundo golpe sin palabras.

## CARTEL · "Unos puntos más tarde…" (16,4-19,4 s)
`compositions/cartel.html` con el texto nuevo en dos líneas (**"Unos puntos"** / **"más tarde…"**), mismo fondo verde
`#5ce611` con manchas y burbujas, letras Lexend 900 crema con borde navy que rebotan, -4°. Entra girando el último
cuadro de la parte 1 (540°), sale con iris al primer cuadro de la parte 2. Voz Rasalgethi nueva: **"Unos puntos más
tarde."** Stinger (stinger.wav) y whooshes como en el ejemplar. **No dice "Scalerics".** Duración 3,0 s (si la voz
pasa de 2,4 s, 3,2 s).

## PARTE 2 · resuelto (19,4-31,9 s)
Misma luz cálida, música pizzicato más baja y sin cortes (todo anda).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 19,40-21,20 | **Q1 = encuadre de P1 (callback):** Héctor de 3/4 desde atrás del hombro de Rubén, con **el mismo pote** y la etiqueta "$ 200". El banquito contra la pared, vacío. | 19,80 · Héctor, sonrisa canchera, levanta el pote: burbuja **"¿Me hac…"** que se corta a la mitad (la burbuja tiembla y se queda) porque **20,30 · le vibra el celular** en el bolsillo del chaleco; lo saca y mira. | pop 19,80; vibra 20,30 |
| 21,20-22,60 | **Q1b primer plano del celular de Héctor** (la pantalla llena ~70 % del ancho), push-in lento; atrás desenfocada la cara de Héctor. | La tarjeta: **"Mis puntos · Almacén de Rubén"** · "Héctor" · barra **180 / 200** · **"Premio: un dulce de leche"** con el dibujito del pote. 21,70 · la barra late (le faltan 20). | notification 21,25; click-soft 21,70 |
| 22,60-23,50 | **Q2 plano medio de Héctor** (encuadre de P5), levanta la vista del celular. | Cara de "ya entendí" (cejas arriba): voz hector-5 **"¿Cuánto es?"** (burbuja). | pop 22,70 |
| 23,50-24,60 | **Q2b = encuadre de P2 (callback):** Rubén de frente, mate en la mano (el termo lleno al lado), la **tablet** en su atril de costado con la ficha "Héctor · 5 veces esta semana". | Media sonrisa (CARA.sonrisa suave): voz ruben-2 **"Doscientos."** (la misma palabra de P2, ahora tranquila). Subtítulo con "Doscientos." en el recuadro verde. | sin SFX (música baja ~9 dB mientras habla) |
| 24,60-27,40 | **Q3 = encuadre de P3a (callback):** general de perfil del mostrador, mismo travelling. | 24,70 · Héctor estampa el **billete de 200** en el mostrador: burbuja **"¡Pago!"**. 24,90 · el 200 3D de arriba se queda y se le prende el **tilde verde**. 25,20 · en el celular de Héctor (que sostiene en alto, pantalla a cámara, ≥ 30 % del alto del cuadro) **"+20 puntos"** y la barra se llena a **200 / 200**; 25,80 · **"¡Premio! Un dulce de leche ✓"**. 26,20 · **PUÑO** (la misma pose de "¡Hecho!"): voz hector-6 **"¡Gané!"**. 26,90 · Rubén apoya **el segundo pote** al lado del primero (pop con rebote). | papel.wav (billete) 24,70; ding 24,90; sparkle 25,20; cero.mp3 25,80; pop 26,90 |
| 27,40-30,40 | **Q4 = encuadre de P7 (callback):** general hacia la puerta, el hombro de Rubén en primer término. | 27,45 · campanita: Héctor sale con **los dos potes** en alto y se cruza con Graciela que entra: voz hector-7 **"¡Pagué doscientos y me llevo dos!"** (burbuja). Héctor sale. 28,90 · Graciela saca su celular, lo levanta feliz: voz graciela-2 **"Rubén, ¿me hacés puntos?"** (burbuja). 29,90 · Rubén, con media sonrisa, le acerca la **tablet** al celular: **"+20 ✓"** verde en las dos pantallas. | campanita 27,45; pop 27,60 y 28,90; scan.mp3 29,90; cero.mp3 30,10 |
| 30,40-31,90 | **Q4 sigue** (push-in suave hacia Rubén y Graciela). **Línea chica** (capa HTML, abajo, ~1,5 s): **"Scalerics Puntos: tus clientes suman y vuelven"** / **"scalerics.com"** en verde. | whoosh-short de la línea chica 30,40 |

## Cámara
PLANOS de abren-hoy (cortes entre planos, Catmull-Rom adentro de cada uno). Los planos de la parte 2 repiten EXACTO el
encuadre de su par de la parte 1 (P1→Q1, P2→Q2b, P3a→Q3, P5→Q2, P7→Q4): el callback se ve. En todos los planos hay un
personaje o el mostrador con objetos llenando el cuadro: nunca la pared navy lisa (ojo en P7 y Q4: la puerta y
Graciela tienen que llenar el centro; el marco de la puerta y los estantes rellenan los costados).

## Sonido por tramo (techo -31 LUFS por efecto; voz ≥ 6 LU arriba del resto mientras habla; final -14 LUFS, pico -1,5)
- **0 a 10,5:** ambiente, pizzicato, pops de burbujas, key-press y whoosh corto de cada número que choca, sorbo,
  monedas, banquito, palmada.
- **10,5 a 13,0:** **la música se corta seca**; solo ambiente, la voz de Héctor y nada más (P6b en silencio).
- **13,0 a 16,4:** ambiente, campanita, pasos, las dos voces, golpe sordo de la frente. Sin tuba ni contador.
- **Cartel:** whoosh, stinger, narrador Rasalgethi, whoosh del iris.
- **19,4 a 31,9:** pizzicato más bajo y sin cortes, vibra, notification, ding, sparkle, "¡Premio!" con cero.mp3,
  pops, campanita, scan del lector; música baja ~9 dB con cada voz.

## Riesgos para el QA (buscarlos a propósito)
- La etiqueta "$ 200" se lee en P1 y Q1; el pote nunca se corta en el borde ni tapa la boca de Héctor.
- Los números 3D (200, 180, 190, 195) arriba y limpios: nunca nacen dentro de una cabeza ni de la boina; el 180 y el
  190 caen fuera de cuadro sin atravesar a nadie.
- Continuidad: banquito (pared → Héctor sentado en P3a-P5 → vacío en la parte 2), monedas (torres en P3b-P6, ninguna
  en la parte 2), billete (aparece en P6; el de Q3 es otro), termo (vacío en P3b, lleno en la parte 2), el segundo
  pote (solo desde 26,9), la moneda de 5 (en la mano de Rubén solo en P6-P6b).
- La pose PUÑO igual en P5 y Q3; el brazo no pasa por delante de la cara ni la boina atraviesa la mano.
- El choque de manos y el gesto de "dejá" (P5, P6): manos que se encuentran, no se atraviesan.
- La frente de Rubén en el mostrador (P7b): sin atravesar la madera ni el mate.
- El celular de Héctor (Q1b, Q3): "180 / 200", "+20 puntos", "¡Premio! Un dulce de leche ✓" ≥ 40 px, sin la palabra
  Scalerics, sin logo.
- La boina: que no quede como casquete pegado; que tenga volumen y el piquito.
- Ortografía de burbujas: "¿Ciento noventa? Vengo todos los días.", "Tengo ciento noventa en monedas.", "Dejá.
  Quedate con el vuelto.", "¡Me lo dejó en ciento noventa y cinco!", "¡Pagué doscientos y me llevo dos!".
- Sobre la pared navy oscuro: nada navy suelto sin borde crema (la boina y el mostrador necesitan contraluz).

## Portada (portada.json, fondo LIMPIO=1, sin burbujas ni subtítulos ni números 3D)
- Fondo: P1 ~0,8 s (Héctor con el pote y la etiqueta "$ 200" bien grande, sonrisa canchera) o P6b ~12,6 s (Rubén con
  la moneda de 5); zoom 1,2-1,3.
- `chica`: "En algo de $ 200:" · `grande`: "¿Me hacés precio?" · `sello`: "Precio: $ 200" · acento y sello `#5ce611`.

## Duración
Parte 1 16,4 s + cartel 3,0 s + parte 2 12,5 s = **31,9 s**. Voces: Héctor ×7 (Sadaltager), Rubén ×2 (Algenib:
"Ciento noventa y cinco." / "Doscientos."), Graciela ×2 (Gacrux: "¿me hacés precio?" / "¿me hacés puntos?"), narrador
del cartel (Rasalgethi: "Unos puntos más tarde.").

## RONDA 1 DE REVISIÓN (10-11): lo que cambió y los tiempos nuevos (mandan sobre las tablas de arriba)
Duración **33,09 s**: parte 1 0-18,72 · cartel 18,72-21,42 (2,7 s) · parte 2 21,42-33,09.
- **Fuera:** P3b entero (monedas, termo vacío) y hector-7 ("¡Pagué doscientos y me llevo dos!": Héctor sale mostrando los dos
  potes sin hablar). El tercer escalón del regateo queda en P3a: sentado, sacude el monedero abierto: burbuja "Tengo ciento
  noventa en monedas." (con el tintineo).
- **P6:** "Dejá." sola (104 px) → pausa real de 0,5 s en la voz (sin burbuja nueva) → "Quedate con el vuelto." en otra burbuja
  más grande (96 px) con pop; en la palabra "vuelto" el 195 rojo crece al centro y rueda de vuelta a **$ 200 crema** con
  key-press seco (pagó el precio entero). En P6b el "$ 200" crema queda arriba a la derecha.
- **P7 se parte en P7 (puerta, "¡Me lo dejó en…!") y P7c (Graciela de cerca, desde atrás del mostrador: "Rubén, ¿me hacés
  precio?").** Q4 se parte en Q4 (puerta: Héctor sale, Graciela entra y empieza "Rubén, ¿me hacés puntos?" con el celular en
  alto) y Q4b (Graciela y Rubén en el mostrador: el lector, "+20 ✓", línea chica).
- **Tarjeta del celular:** "180 / 200 puntos" · barra · "Esta compra: +20" · "Premio a las 10 compras: un dulce de leche".
- **Q2b:** ficha verde "Héctor: 5 veces esta semana" (abajo a la izquierda, cola a la tablet, sin tapar la cara).
- **Cartel:** "Una tarjeta / de puntos / más tarde…" (3 líneas), voz nueva de Rasalgethi (2,06 s).
- **Línea chica:** "Scalerics Puntos: que ganen sin que bajes el precio" · "scalerics.com".

| plano | desde | hasta | dur |
|---|---|---|---|
| P1 Héctor 3/4 + gancho | 0,00 | 1,85 | 1,85 |
| P2 Rubén de frente "Doscientos." | 1,85 | 2,95 | 1,10 |
| P3a general de perfil (180, 190, banquito, monedero) | 2,95 | 6,05 | 3,10 |
| P4 Rubén "Ciento noventa y cinco." (rodillo 7,55) | 6,05 | 8,20 | 2,15 |
| P5 PUÑO "¡Hecho!" + choque de manos | 8,20 | 9,40 | 1,20 |
| P6 billete, latita, música cortada 10,10, "Dejá." 10,45 · "Quedate…" 11,70 · 195→200 12,25 | 9,40 | 12,85 | 3,45 |
| P6b Rubén con la moneda | 12,85 | 13,68 | 0,83 |
| P7 puerta "¡Me lo dejó en ciento noventa y cinco!" 13,93 | 13,68 | 16,05 | 2,37 |
| P7c Graciela "Rubén, ¿me hacés precio?" 16,15 | 16,05 | 18,07 | 2,02 |
| P7b la frente en el mostrador (golpe 18,47) | 18,07 | 18,72 | 0,65 |
| CARTEL "Una tarjeta de puntos más tarde…" | 18,72 | 21,42 | 2,70 |
| Q1 "¿Me hac…", vibra 22,02 | 21,42 | 22,47 | 1,05 |
| Q1b la tarjeta del celular | 22,47 | 23,67 | 1,20 |
| Q2 "¿Cuánto es?" 23,77 | 23,67 | 24,47 | 0,80 |
| Q2b Rubén "Doscientos." 24,57 + ficha | 24,47 | 25,69 | 1,22 |
| Q3 "¡Pago!", tilde, +20, ¡Premio!, PUÑO "¡Gané!" 27,09, segundo pote 27,84 | 25,69 | 28,19 | 2,50 |
| Q4 puerta: Héctor sale con los dos potes; "Rubén, ¿me hacés puntos?" 29,14 | 28,19 | 29,79 | 1,60 |
| Q4b lector 31,29, "+20 ✓" 31,44, línea chica 31,64 | 29,79 | 33,09 | 3,30 |
