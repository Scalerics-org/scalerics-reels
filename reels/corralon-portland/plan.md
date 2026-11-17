# corralon-portland · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~37,2 s

**De qué trata.** FERRETERÍAS Y CORRALONES. Lunes 6:45 en "Materiales Gustavo". La fila de albañiles en el mostrador,
el teléfono de pared sonando y el celular con 20 WhatsApps sin leer. Del celular sale el audio de Beto, maestro de obra y
cliente de años: **"Gustavo, ¿tenés portland? Cuarenta bolsas. Hoy llenamos la losa."** Gustavo: **"¡Ya te digo!"** y sale
al patio a contar la pila (no promete sin mirar). Mientras cuenta (37, 38, 39…), el celular del mostrador no para (20 → 27:
"¿A cuánto el portland?", "¿Tenés arena gruesa?", "¿Llevan a obra hoy?", "¿Hola?"), el teléfono suena solo y la fila
crece. Vuelve con el "¡40!", escribe "Tengo las 40. ¿Te las mando?" y, al que le señala el celular, le dice con un dedo
levantado: **"Beto espera. Es de la casa."** Llega el audio: **"Ya está, Gustavo. Me contestó otro. Ya las están bajando."**
con la foto de otro camión descargando en la obra. Pausa con el costo (40 bolsas, $ 20.800, con otro; 27 mensajes sin
contestar). Gustavo, mirando la pila: **"Era de la casa."** Remate del remate: Tito, el veterano de la fila: **"¿Me das una
bolsita de portland?"**, y Gustavo mira la pila de 40. Cartel **"Un agente de IA más tarde…"**. Parte 2 (la mitad del
reel): el mismo audio de Beto, y antes de que termine el agente ya contestó con stock, precio y entrega a obra; Beto
confirma dirección y hora; Gustavo dice su "¡Ya te digo!" por costumbre, suena el ding y: **"Ya le dijo."** Los 27 chats
se contestan solos con tilde verde (uno a las 6:30, antes de abrir) y el de 300 bolsas para un edificio le llega a
Gustavo marcado "Para vos". En el mostrador, el mismo Tito: "¿Me das una bolsita de portland?" / **"Las que quieras,
Tito."** El panel de la mañana: 5 pedidos por WhatsApp antes de las 8, $ 48.900, sin contestar 0. El mismo audio de Beto,
"Ya las están bajando.", ahora con la foto del camión de Gustavo, y Gustavo: **"Es de la casa."** Cierre: Sofi de Scalerics
en videollamada: **"Comentá OBRA y te mando cómo funciona para tu corralón."**

- **Producto:** agente de IA para el WhatsApp del corralón: contesta al instante y a cualquier hora (6:30 incluido) con
  el stock, los precios y las condiciones de entrega reales del corralón; toma el pedido con cantidad, dirección de obra,
  día y hora; confirma; y le pasa a Gustavo lo que es para él (una cotización grande, un reclamo). Se muestra funcionando
  en la parte 2 (chat recreado + panel del mostrador) y se nombra en el cartel ("Un agente de IA más tarde…"), en el
  rótulo chico final y en descripcion.txt. El cartel nunca dice "Scalerics". Nunca "bot".
- **Sin marcas:** bolsas de portland genéricas (papel kraft crema con una franja navy y "PORTLAND · 25 kg" en Lexend,
  sin ningún logo ni el color de ninguna cementera); camiones genéricos (cabina sin logo ni parrilla reconocible): el de
  la parte 1 es gris liso sin nombre, el de la parte 2 navy con "MATERIALES GUSTAVO" en crema (inventado); chat genérico
  (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" solo en texto); celulares y monitor
  sin logo. "Rivera 2340" es una dirección inventada sobre una avenida (nombre de calle, no marca).
- **Estructura** como `reels/taller-presupuestos` y `reels/estetica-turnos`: parte 1 (15,8 s) + cartel (2,4 s) + parte 2
  (19,0 s, la solución, con el cierre adentro: 51 %). Un proyecto 3D con gen.mjs (T1/T2).
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), dos renglones:
  **"Un agente de IA" / "más tarde…"**. Audio REUSADO de `reels/abren-hoy-completo/assets/voice/narrador.wav` (Rasalgethi,
  la misma frase): no se genera.
- **Rubén NO aparece.** Ningún personaje del elenco salvo Sofi.
- **Quién dice "Comentá OBRA": Sofi** (ELENCO.sofi, Achernar), como en taller-presupuestos y estetica-turnos: Gustavo
  termina en su callback ("Es de la casa.") sin pasar a vendedor, y Sofi aparece en un celular parado sobre el mostrador
  al lado del monitor verde: la solución sigue en pantalla mientras habla.
- **El rubro en el cuadro 0:** "CORRALONES" enorme y debajo, en el mismo bloque y un poco más chico, "Y BARRACAS" (en
  Uruguay el negocio se dice "barraca" tanto como "corralón": ver fuentes.md y la duda en el reporte). Si el coordinador
  prefiere una sola palabra: "CORRALONES".

## Paleta y set (para "Hechos")
**Corralón en un galpón abierto, de madrugada: adentro, la luz blanca-crema plana de los tubos fluorescentes sobre el
mostrador; afuera, por el portón grande, el patio de tierra apisonada crema-gris `#cfc9b6` y el cielo de amanecer en navy
claro `#16243d` PLANO, con una sola franja horizontal crema `#efeee5` baja en el horizonte (sin degradé, sin sol, sin
niebla: que no haga bandas en Instagram). Galpón: pared de chapa acanalada navy `#1f3254` (las ondas marcadas con
geometría, no con textura), cerchas de hierro navy3 arriba, piso de portland alisado gris claro `#d9d7c9`.** Distinto
de taller-presupuestos (taller de día con pared de bloques navy claro y luz de mediodía), de estetica-turnos y
dist-pedidos-lunes (paredes crema de interior), de dice-cuarenta (depósito navy entre racks sin cielo) y de la parrilla
(noche cálida). Es el primer set de la línea con **cielo de amanecer**: el "6:45" se ve sin leer el chip. Anotar en
"Hechos": "corralón en galpón de chapa navy #1f3254, madrugada con cielo navy claro #16243d plano y franja crema de
horizonte, patio de tierra con la pila de bolsas de portland; mostrador con fila de albañiles, pizarrón de tiza y
teléfono de pared; parte 2 igual + chat del agente y panel del mostrador; cartel verde".
- **Texto en pantalla:** crema sobre navy, navy sobre crema. Nunca blanco sobre el piso claro o las bolsas crema. Los
  rótulos con línea guía en caja navy con texto crema.
- **Rojo apagado `#c7655b` SOLO para el problema:** "40 bolsas · $ 20.800: con otro", "27 mensajes sin contestar", el
  contador de sin leer de la parte 1, el camión gris de la foto con una flechita que se va. **Verde `#5ce611` para lo
  resuelto:** ✓, "Pedido confirmado", "Entregado", "$ 48.900", "Sin contestar: 0", el chip "Para vos", el recuadro de
  selección de los subtítulos, el chaleco reflectivo de Beto (detalle, no protagonista).
- **Burbujas de diálogo** (las que dicen los personajes en el local): crema con borde navy de 8 px y sombra dura,
  Lexend 800 navy ≥ 48 px, cola hacia quien habla. **Los audios de Beto** se ven como burbuja de audio en el chat (onda
  + duración "0:04") con la transcripción grande arriba en caja crema, para que se entienda sin sonido.
- **La hora es el reloj del chiste** (como el día en taller-presupuestos): cada mensaje con su hora grande ("6:47",
  "6:48"…), el chip "LUNES · 6:45" en el cuadro 0 y en Q1.

## Personajes nuevos (agregar a ELENCO, mismo estilo; solo parámetros y peinados que ya existen en personajes.js)
- **Gustavo · `ELENCO.gustavo`** (dueño del corralón, ~50, voz Alnilam). Piel `PIEL.media`, pelo `PELO.negro` con canas
  (si el módulo deja mezclar, gris en los costados; si no, `PELO.gris` oscuro) en `peinado: "costados"` (entradas
  marcadas, nada de pelado: que no se parezca a Rubén), afeitado con sombra de barba leve (`barba: 0x3a3330,
  barbaLarga: 0.35, barbaOpacidad: 0.35, barbaBigote: false`), cejas `0x2e2724`, mejillas `0xd08a72`. **Camisa crema
  `MARCA.cr` de manga larga + chaleco acolchado navy** (`chaleco: { color: MARCA.navy2, botones: MARCA.g }`, cierre verde
  si se puede), `pantalon: 0x3a3f4a`, botines `0x3b2a20`. `panza: 1.08, nariz: 0.062, alto: 1.03`. **Lápiz de carpintero
  en la oreja** (prisma octogonal chato crema con punta navy, apoyado SOBRE la oreja derecha, que no la atraviese) y una
  birome en el bolsillo del chaleco. Expresiones: `concentrada` contando, `neutra` seguro en "Es de la casa", `resignado`
  contenido en "Era de la casa" (sin manos a la cabeza), `sonrisa` en la parte 2. Que no se parezca a Óscar (barba
  candado gris, mameluco) ni a Raúl de la parrilla.
- **Beto · `ELENCO.beto`** (maestro de obra, ~45, voz Sadachbia). Solo en la foto del chat y como avatar redondo:
  **casco de obra crema** (media esfera con ala) sobre `peinado: "corto"` castaño, barba de tres días, piel
  `PIEL.trigueña`, **chaleco reflectivo verde `MARCA.g`** con dos bandas crema sobre campera navy. En la foto de P4 se le
  ve la espalda junto al camión gris; en la de Q4, de frente, con el pulgar arriba al lado del camión navy.
- **Tito · `ELENCO.tito`** (albañil veterano, ~65, voz Enceladus). Piel `PIEL.morena`, **gorro de lana navy3 con doblez**
  (casquete con un aro de doblez; que se lea gorro y no pelo), cejas grises tupidas, bigote canoso corto NO (Rubén tiene
  bigote): afeitado; **campera crema con manchas de polvo de portland** (discos gris claro chatos en mangas y pecho),
  pantalón de trabajo `0x5a5550`, botines. `panza: 1.05, nariz: 0.066, alto: 0.97`. Apoya los codos en el mostrador.
- **Albañiles de la fila** (sin voz, 4 y un quinto que llega en P2): variantes rápidas de DEFECTO con peinados existentes
  y un casco o gorro cada uno (casco crema, gorro verde oscuro, gorra navy, sin nada con pelo `rulos`), camperas navy,
  crema, gris. Uno con una carretilla vacía al lado, otro con un balde. Que ninguno se parezca al elenco.
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de estetica-turnos/taller: buzo navy claro con franja crema, la
  varilla del micrófono separada de la mejilla) en la videollamada del cierre (Q5), plano medio, auriculares verdes,
  fondo navy liso con el logo de Scalerics chico.

## Objetos 3D (el set del corralón es nuevo; específicos, que nadie los confunda con una ferretería de shopping o un depósito)
- **Galpón + portón al patio:** pared de chapa acanalada navy, cerchas de hierro, dos tubos fluorescentes colgados
  (emisivo crema, sin halo), el portón grande abierto al fondo-derecha con el patio y el cielo de amanecer. Un cartel de
  chapa crema arriba del mostrador: "MATERIALES GUSTAVO" (Lexend 800 navy, que se lea de frente).
- **Mostrador:** mesada de madera gastada con frente de chapa navy3, una caja de birome y talonario de remitos, el
  **celular** apoyado (parte 1: boca arriba, vibrando con el contador rojo apagado "20 sin leer"; parte 2: parado en un
  soporte, pantalla al frente) y, en la parte 2, un **monitor** chico en un brazo (el panel).
- **Teléfono de pared con cable en rulos (objeto de ambientación, no gag):** aparato crema con teclado navy, el tubo y el
  cable en espiral (tubo extruido en hélice) que cuelga. Vibra/suena (el aparato tiembla 2 px) cuando suena en P2. No
  se cae, no rebota.
- **Pizarrón de precios con tiza** en la pared detrás del mostrador: marco de madera, superficie navy muy oscuro
  `#0b1220`, texto crema en letra de tiza (Caveat): "PORTLAND 25 kg · $ 520", "ARENA GRUESA m³ · $ 2.400", "PEDREGULLO m³ ·
  $ 2.900", "HIERRO DEL 8 · $ 380". Se lee en el cuadro 0 (es lo que le preguntan por WhatsApp: está escrito ahí y nadie
  lo puede ver desde la obra).
- **LA PILA DE BOLSAS DE PORTLAND (EL objeto que importa):** 40 bolsas de papel kraft crema `#e8dcc0` (RoundedBox chato
  con las esquinas cosidas un poco hinchadas, una franja navy y "PORTLAND · 25 kg"), trabadas en hileras sobre un pallet
  de madera, en el patio, con la luz del amanecer de costado. En P2 Gustavo las cuenta: cada bolsa que toca se marca
  con un brillo crema de 0,2 s y una burbuja con el número (37, 38, 39, **40** grande). En P5 es la protagonista del
  costo, intacta. En P7 Tito pide "una". En Q3 Gustavo le carga una a Tito. En Q4 el pallet está vacío (se fueron en su
  camión). Un poquito de polvo de portland (partículas gris claro chatas, con semilla) cuando se apoya una bolsa.
- **Patio:** montaña de arena (cono low-poly crema-ocre `#d8c7a0`) y otra de pedregullo (gris, facetas marcadas), hierros
  de construcción en un caballete (barras navy3 largas y finas pero ≥ 6 px en pantalla), dos carretillas (batea gris,
  rueda negra, manijas de madera), un tacho de 200 L navy. Nada rojo.
- **Camión gris de la foto (P4):** camión plataforma genérico gris `#8a8f98` sin nombre ni logo, con una pila de bolsas
  iguales a medio bajar en la vereda de una obra (cerco de chapa crema, una mezcladora navy, andamio). Se ve como FOTO
  dentro del chat (render a textura o canvas), no como escena entera.
- **Camión navy de "Materiales Gustavo" (Q4):** el mismo modelo en navy con la caja crema y "MATERIALES GUSTAVO" en el
  costado; misma vereda, mismo encuadre de foto, Beto con el pulgar arriba. Es la misma foto con otro camión: el chiste.
- **Celular de Gustavo** (crearCelular de ya-lo-cargo/anotamelo/taller, funda negra con polvo de portland: dos manchas
  gris claro en la funda, nunca en la pantalla).
- **Monitor del mostrador** (parte 2): el panel.
- **Celular parado de la videollamada** (Q5): en un soporte sobre el mostrador, pantalla con Sofi.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final, celular/monitor ≥ 60 % del cuadro en los insertos)
**Parte 1 · P1 · el celular en el mostrador:** pantalla bloqueada con "WhatsApp · 20 sin leer" (chip rojo apagado) y la
notificación de arriba "Beto (obra) · audio 0:04".
**Parte 1 · P2 · el chat (insertos de 0,4 s, encabezado navy "Chats", fondo crema), cada fila con la hora grande:**
"6:47 · Marcos · ¿A cuánto el portland?" · "6:48 · Luis · ¿Tenés arena gruesa?" · "6:49 · Ana · ¿Llevan a obra hoy?" ·
"6:50 · Ramón · ¿Hola?" · arriba, el contador rojo apagado que sube **20 → 27**.
**Parte 1 · P3 · Gustavo escribe a Beto:** burbuja derecha "Tengo las 40. ¿Te las mando?" con un solo tilde gris.
**Parte 1 · P4 · el golpe:** chat con Beto (avatar con casco): burbuja de audio 0:03 con la transcripción grande "Ya está,
Gustavo. Me contestó otro." · otra 0:02 "Ya las están bajando." · la FOTO (≥ 45 % del ancho del celular): camión gris
descargando bolsas en la vereda de la obra.
**Parte 1 · P5 · rótulos de la pausa:** caja navy, texto crema, línea guía a la pila: **"40 bolsas · $ 20.800: con otro"**
(el monto en rojo apagado; 40 × $ 520 del pizarrón, número del caso); al celular: **"27 mensajes sin contestar"** (rojo
apagado).
**Parte 2 · Q1 · chat con Beto (celular ≥ 60 %):** el audio de Beto (transcripción igual a P1) → "escribiendo…" → **Agente:**
"Hola, Beto. Sí: 40 bolsas de portland en stock, $ 20.800. ¿Te las llevamos hoy a la obra?" → Beto: "Dale. A las 9,
Rivera 2340." → tarjeta verde **"Pedido confirmado ✓ · 40 portland · Entrega hoy 9:00 · Rivera 2340"**. Rótulo HTML:
"Contesta con tu stock y tus precios". La burbuja del agente lleva una etiqueta chica "Agente de IA · Materiales Gustavo".
**Parte 2 · Q2 · la lista de chats (celular ≥ 60 %), cada fila con hora, pregunta, respuesta y ✓ verde:**
- "6:30 · Marcos · ¿Tenés hierro del 8?" → "Sí, $ 380 la barra. ¿Cuántas?" (chip crema "antes de abrir")
- "6:47 · Luis · ¿A cuánto el portland?" → "$ 520 la bolsa de 25 kg."
- "6:48 · Ana · ¿Tenés arena gruesa?" → "Sí, $ 2.400 el m³."
- "6:49 · Ramón · ¿Llevan a obra hoy?" → "Sí, de 9 a 17. ¿Dirección?"
- arriba, **"Sin contestar: 27 → 0"** (el número baja en rojo apagado y el 0 queda verde)
- un chat se separa con borde verde: "6:52 · Facundo (obra edificio) · 300 bolsas para un edificio, ¿qué precio me
  hacés?" → chip verde **"Para vos, Gustavo"**. Rótulos: "Toma el pedido con dirección y día" / "Te pasa lo que es para
  vos". (Sin nombre de constructora: un nombre de empresa inventado puede coincidir con una real.)
- Ojo de coherencia: en P2 los nombres de las preguntas tienen que ser los mismos que en Q2 (Marcos, Luis, Ana, Ramón)
  con las mismas preguntas; ajustar P2 a esta tabla (en P2: 6:47 Luis "¿A cuánto el portland?", 6:48 Ana "¿Tenés arena
  gruesa?", 6:49 Ramón "¿Llevan a obra hoy?", 6:50 Marcos "¿Hola?").
**Parte 2 · Q3 · el panel del monitor (≥ 70 % del cuadro en el push-in, encabezado "Hoy · antes de las 8"):**
"Pedidos por WhatsApp: 5" · grande en verde **"$ 48.900"** con el contador que sube por pedido (20.800 → 28.500 →
36.100 → 43.900 → 48.900) · "Sin contestar: 0" (verde) · "Entregas a obra: 9:00 Beto · 10:30 Luis · 11:00 Marcos" ·
"Para vos: 1". Los 5 pedidos del caso (precios del pizarrón): Beto 40 portland $ 20.800 · Luis 2 m³ arena + 1 m³
pedregullo $ 7.700 · Marcos 20 barras del 8 $ 7.600 · Ana 15 portland $ 7.800 · Ramón 1 m³ arena + 5 portland $ 5.000.
**Parte 2 · Q4 · chat con Beto:** el audio "Ya las están bajando." (0:02, misma transcripción) + la FOTO con el camión navy
de "Materiales Gustavo" y Beto con el pulgar arriba · tarjeta verde **"Entregado ✓ 9:02"**.
**Parte 2 · Q5 · cierre:** el monitor con "$ 48.900" y "Sin contestar: 0" en verde. **Capa HTML:** "Comentá **OBRA**" grande
(Lexend 900, ~140 px, OBRA en el recuadro verde), sobre la escena; en los últimos 0,8 s, abajo chico: "Un agente de IA
que atiende tu WhatsApp" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-15,80 s)
Cámara continua en el galpón, a la altura de los ojos; el eje del set: el mostrador de frente con la fila a la izquierda
en primer término, Gustavo atrás del mostrador al centro, el pizarrón en la pared, y el portón a la derecha con el patio,
la pila de bolsas y el cielo de amanecer.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,05 | **P1 · cuadro 0.** Plano medio-general desde atrás de la fila (por encima de los cascos): Gustavo de frente atrás del mostrador con el tubo en el hombro, el celular vibrando en el mostrador, el pizarrón arriba, por el portón la pila de bolsas y el cielo. Push-in lento hacia el celular. | **Cuadro 0:** arriba, enorme, **"CORRALONES"** / "Y BARRACAS" (Lexend 900, ~130 px y ~90 px, crema sobre la chapa navy, "CORRALONES" en el recuadro verde); chip "LUNES · 6:45". El celular ya vibra con "20 sin leer". 0,25-3,00 · **audio de Beto** (sale del celular, filtro de audio de WhatsApp): "Gustavo, ¿tenés portland? Cuarenta bolsas. Hoy llenamos la losa." con la burbuja-transcripción grande sobre el celular. | galpón, mostrador, pizarrón, teléfono de pared, celular, fila (4 albañiles), portón, patio, pila de bolsas, Gustavo | ambiente de galpón temprano (zumbido de tubo fluorescente, un pájaro lejos, una carretilla que rueda) + música liviana bajita · `vibra.wav` 0,0 y 1,6 · teléfono de pared sonando bajito (timbre de teléfono real CC0, no `ring.mp3` de celular) 0,1-2,8 |
| 3,05-3,90 | **P1b.** El mismo plano; Gustavo cuelga el tubo y agarra el celular. | 3,05-3,75 · **Gustavo: "¡Ya te digo!"** y arranca hacia el portón. | ídem | tubo que se cuelga (`k-plastico` + `k-metal-click`) 3,0 · pasos 3,5 |
| 3,90-7,00 | **P2 · la escalada.** Travelling con Gustavo por el portón hasta la pila (la cámara lo sigue por el costado, la pila llena el cuadro); insertos de 0,4 s al celular del mostrador (≥ 60 %). | Gustavo cuenta con el dedo: burbujas "37…" (4,1), "38…" (4,9), "39…" (5,7) · entre cada una, inserto: 6:47 Luis "¿A cuánto el portland?" (4,5) · 6:48 Ana "¿Tenés arena gruesa?" (5,3) · 6:49 Ramón "¿Llevan a obra hoy?" (6,1) · 6:50 Marcos "¿Hola?" (6,5) · contador 20 → 27 · el teléfono de pared vuelve a sonar adentro (6,0) · en el fondo, un quinto albañil se suma a la fila y mira el reloj · 6,70 · **"¡40!"** grande (verde no: crema con borde navy; el verde es de lo resuelto) y Gustavo palmea la última bolsa: puf de polvo. | patio, pila, carretillas, arena, Gustavo; celular | `notification` ×4 escalonadas (cada una un poco más fuerte) · whoosh-short en cada inserto · palmada en bolsa (golpe sordo de papel/tela CC0) + polvo 6,7 · teléfono 6,0-6,9 |
| 7,00-9,00 | **P3 · la creencia.** Plano medio desde el lado de la fila: Gustavo de vuelta atrás del mostrador, agitado, tipeando; el primero de la fila (casco crema) le señala el celular con la cabeza. | 7,05 · inserto corto: "Tengo las 40. ¿Te las mando?" (un tilde gris) · 7,20-7,80 · **Gustavo: "Beto espera."** (levanta un dedo, tranquilo) · 8,05-8,90 · **"Es de la casa."** (seguro, con orgullo de veinte años de mostrador). | mostrador, Gustavo, albañil 1, celular | teclado (`key-press` ×3) 7,0 · `vibra` 7,9 (el 27 sigue ahí) |
| 9,00-12,00 | **P4 · el golpe.** Inserto del celular (≥ 60 %), quieto; la foto entra al final con un pop. | 9,10 · llega el audio · 9,20-10,80 · **Beto: "Ya está, Gustavo. Me contestó otro."** (de fondo en el audio, ruido de obra) · 11,00-11,90 · **"Ya las están bajando."** · 10,9 · entra la FOTO: el camión gris descargando bolsas en la obra (flechita rojo apagado). | celular, foto (camión gris, obra, Beto de espaldas) | `notification` 9,1 · obra lejos dentro del audio (lo trae la toma o un CC0 de obra muy bajo) · pop de la foto 10,9 |
| 12,00-13,00 | **P5 · la pausa.** Plano general desde atrás del mostrador hacia el patio: la pila de 40 intacta en el centro, la luz del amanecer, Gustavo de espaldas en el portón, quieto. Cámara quieta. | Silencio de galpón: la música baja a -12 dB en 0,4 s (no se corta), solo el zumbido del tubo y un pájaro. 12,15 · rótulos con línea guía: **"40 bolsas · $ 20.800: con otro"** (rojo apagado) a la pila; **"27 mensajes sin contestar"** (rojo apagado) al celular en el mostrador (primer término, abajo a la izq.). | pila, patio, Gustavo, mostrador, celular | zumbido · pop chico por rótulo |
| 13,00-14,10 | **P6 · el remate.** Push-in a primer plano de Gustavo de 3/4, mirando la pila (la pila desenfocada lo justo atrás). | 13,10-14,00 · **Gustavo: "Era de la casa."** (seco, grave, sin queja). | Gustavo, pila | nada (silencio con la cama baja) |
| 14,10-15,80 | **P7 · remate del remate.** Contraplano rápido al mostrador: Tito apoya los codos, gorro de lana, campera empolvada. | 14,20-15,40 · **Tito: "¿Me das una bolsita de portland?"** (burbuja grande) · 15,40 · Gustavo gira despacio la cabeza hacia el portón (la pila de 40 al fondo, nítida) · Tito levanta un dedo: una · 15,60 · stinger. | mostrador, Tito, Gustavo, pila al fondo | codos en madera (`madera-golpe` suave) 14,1 · **stinger** 15,6 (la música se corta seca) |

## CARTEL · 15,80-18,20 s
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: "Un agente de IA" / "más tarde…".
Audio: `reels/abren-hoy-completo/assets/voice/narrador.wav` (Rasalgethi). Música de cartel de siempre. Nunca "Scalerics".

## PARTE 2 · la solución (18,20-37,20 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,20-22,80 | **Q1 · el mismo cuadro 0.** Mismo encuadre que P1 (callback visual): la fila, el pizarrón, el teléfono de pared, la pila al fondo; el celular ahora parado en un soporte. Chip "LUNES · 6:45". Push-in al celular hasta inserto (≥ 60 %) a 19,6. | 18,30-21,00 · **el mismo audio de Beto** · en el chat, mientras suena: "escribiendo…" (19,8) → respuesta del agente (20,3) → Beto "Dale. A las 9, Rivera 2340." (20,9) → tarjeta **"Pedido confirmado ✓"** (21,2) · rótulo "Contesta con tu stock y tus precios" · 21,10-21,80 · corte a Gustavo: **el mismo "¡Ya te digo!"**, ya agarrando el tubo · 21,85 ding · 22,00-22,60 · **Gustavo: "Ya le dijo."** mirando el celular, cejas arriba, media sonrisa. | ídem P1 + soporte del celular, monitor | ambiente igual que P1 pero sin el teléfono de pared sonando · `notification` 20,3 y 20,9 · `ding` 21,85 (el ✓ de confirmado) |
| 22,80-26,30 | **Q2 · los 27 contestados.** Inserto del celular (≥ 60 %), la lista de chats se desplaza; push-in leve. | Fila por fila (cada 0,5 s) la respuesta del agente y ✓ verde: 6:30 Marcos hierro (chip "antes de abrir") · 6:47 Luis portland · 6:48 Ana arena · 6:49 Ramón entrega · arriba "Sin contestar" baja 27 → 0 (24,9, el 0 en verde) · 25,3 el chat de 300 bolsas se separa con borde verde y chip **"Para vos, Gustavo"** · rótulos "Toma el pedido con dirección y día" (23,6) / "Te pasa lo que es para vos" (25,4). | celular | `click-soft`/tilde por fila (×4) · contador bajando (`k-tick` rápido) · `cero.mp3` al llegar a 0 · `campanita` en "Para vos" |
| 26,30-30,40 | **Q3 · el mostrador libre.** Plano medio de frente: Gustavo atiende la fila tranquilo, el celular parado al lado contestando solo (pantalla que se mueve). Tito apoya los codos (mismo gesto que P7). 29,0 push-in al monitor del mostrador (≥ 70 %). | 26,40-27,60 · **el mismo audio de Tito** · 27,80-29,00 · **Gustavo: "Las que quieras, Tito."** (media sonrisa) y apoya una bolsa en el mostrador (puf de polvo) · 29,00-30,40 · el panel "Hoy · antes de las 8": "$ 48.900" sube por pedido, "Sin contestar: 0", entregas a obra, "Para vos: 1". | mostrador, Gustavo, Tito, bolsa, celular parado, monitor | `madera-golpe` 26,3 · bolsa en el mostrador (golpe sordo + polvo) 28,6 · tick por cada salto del contador · `ding` al llegar a 48.900 |
| 30,40-33,00 | **Q4 · la misma foto, otro camión.** El inserto del celular con el encuadre de P4 (callback visual exacto); 32,0 corte a Gustavo en el mostrador con el portón atrás: el pallet del patio VACÍO. | 30,50 llega el audio · 30,60-31,50 · **el mismo "Ya las están bajando."** · 31,0 entra la FOTO: el camión navy de "Materiales Gustavo" descargando en la misma vereda, Beto con el pulgar arriba · tarjeta **"Entregado ✓ 9:02"** · 32,00-32,80 · **Gustavo: "Es de la casa."** (el mismo audio de P3, ahora con media sonrisa; el chiste es que ahora es verdad). | celular, foto (camión navy, obra, Beto), Gustavo, pallet vacío | `notification` 30,5 · pop de la foto 31,0 · `ding` 31,3 · camión que arranca lejos (CC0) 32,0, bajo |
| 33,00-37,20 | **Q5 · cierre.** Push-in al mostrador: el monitor con "$ 48.900" y "Sin contestar: 0" en verde y, al lado, el celular parado con la videollamada de Sofi; Gustavo al fondo, desenfocado, atendiendo. | 33,30-36,40 · **Sofi: "Comentá OBRA y te mando cómo funciona para tu corralón."** · capa HTML "Comentá **OBRA**" grande desde 33,4 (OBRA en el recuadro verde en la palabra) · 36,40-37,20 · línea chica "Un agente de IA que atiende tu WhatsApp" / "scalerics.com" en verde. | mostrador, monitor, celular con Sofi | pop del texto 33,4 · música que cierra arriba con un golpe final a 37,0 |

## Mezcla y sonido
- Techo por efecto -31 LUFS (`TECHO` de su armar.mjs), voz ≥ 6 LU sobre música + SFX por tramos de 0,5 s, final -14 LUFS,
  pico -1,5 dBFS.
- Los audios de Beto con filtro de audio de WhatsApp (highpass 250 Hz, lowpass 6 kHz, un poco de compresión) y, si la
  toma no lo trae, una cama de obra CC0 muy baja ADENTRO del audio (mezcladora/martillo lejos). Gustavo, Tito: limpios.
- Sonidos que probablemente haya que sumar (buscar primero en `assets/sfx` de otros reels; si no están, uno real con
  licencia CC0 y anotarlo en fuentes.md): **timbre de teléfono de pared** (campanilla mecánica, no ringtone de celular),
  **bolsa de portland que se apoya** (golpe sordo de bolsa de papel pesada), **ambiente de obra** (para dentro del audio
  de Beto), **camión que arranca / motor diésel lejos**, **carretilla** (rueda sobre tierra, ambiente). Nada sintetizado
  con ffmpeg.
