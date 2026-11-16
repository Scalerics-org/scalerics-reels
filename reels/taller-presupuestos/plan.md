# taller-presupuestos · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~36,4 s

**De qué trata.** TALLERES MECÁNICOS. Lunes en "Mecánica Óscar". Óscar le da a Sergio el presupuesto de papel con la
huella de grasa: embrague completo, **$ 38.000**. Sergio, simpático: **"Lo pienso y te aviso."** Óscar clava la copia en
el pincho del banco: chac. La semana pasa por el celular de Óscar: martes frenos y discos ("Visto"), miércoles
distribución ("Lo hablo con mi señora."), jueves tren delantero ("Te confirmo el lunes."), viernes service ("Dale,
cualquier cosa te escribo."): chac, chac, chac, chac. Maxi, el ayudante: **"Jefe, ¿a esos no los llamamos?"** / Óscar:
**"Si les interesa, llaman."** Sábado, el elevador vacío. Bocina: pasa Sergio con el auto arreglado, ventanilla baja:
**"¡Óscar! Al final lo hice acá a la vuelta. ¡Me llamaron!"** Pausa con el costo en pantalla (5 presupuestos, $ 90.800
en el pincho, el embrague de $ 38.000 a la vuelta). Óscar: **"Lo pensó. Y me avisó."** Remate del remate: vibra el
celular, "Hola, ¿me pasás presupuesto de embrague?", y Maxi apoya en el banco un segundo pincho, vacío. Cartel **"Un
sistema de presupuestos más tarde…"**. Parte 2 (la mitad del reel): el mismo "Lo pienso y te aviso." (el mismo audio);
Óscar: **"Pensalo tranquilo."** y toca "Enviar" en la tablet: a Sergio le llega el presupuesto con botones y en el tablero
la tarjeta pasa de Enviado a Visto; a los 2 días el seguimiento sale solo, Sergio: **"Justo lo estaba pensando."**, toca
"Aceptar y agendar", jueves 8:30, turno agendado; el tablero de la semana se ordena (3 aceptados, $ 74.500; 1 con una
duda que le toca a Óscar); Maxi repite su pregunta y Óscar: **"Ya les escribió el sistema."**; jueves 8:30, el mismo
encuadre del cuadro 0: entra el auto de Sergio, **"Lo pensé."** / **"Y me avisaste."**, el elevador sube el auto y Maxi
cuelga el pincho en el panel de herramientas, jubilado. Cierre: el tablero de la semana en verde y Sofi de Scalerics en
videollamada: **"Comentá PRESUPUESTO y te mando cómo funciona para tu taller."**

- **Producto:** sistema a medida / CRM de presupuestos para el taller: cada presupuesto se arma y se manda desde la tablet
  con botones "Aceptar y agendar" / "Tengo una duda"; queda en un tablero (Enviado · Visto · Aceptado); si a los 2 días no
  hay respuesta, le llega solo un seguimiento por WhatsApp; el cliente acepta, elige el turno y queda agendado; si tiene
  una duda, la charla le pasa al dueño; el dueño ve cuánto tiene en presupuestos abiertos y cuánto se aceptó. Se muestra
  funcionando en la parte 2 (interfaz recreada) y se nombra en la línea chica final y en descripcion.txt. El cartel
  nunca dice "Scalerics".
- **Sin marcas:** autos genéricos sin logo ni parrilla reconocible (sedán redondeado de juguete, frente liso con dos faros
  y una rejilla de barras navy), patente inventada "STR 4581" (formato uruguayo, sin escudo), repuestos sin marca (caja
  kraft lisa "KIT EMBRAGUE"), bidón de aceite crema liso, chat genérico (burbujas crema/navy, sin el verde ni el logo de
  WhatsApp; la palabra "WhatsApp" solo en un rótulo de texto), celulares y tablet sin logo. El taller se llama "Mecánica
  Óscar" (inventado).
- **Estructura** como `reels/estetica-turnos`: parte 1 (15,6 s) + cartel (2,4 s) + parte 2 (18,4 s, la solución, con el
  cierre adentro: 50,5 %). Un proyecto 3D con gen.mjs (T1/T2), como estetica-turnos y dice-cuarenta.
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), en tres
  renglones: **"Un sistema" / "de presupuestos" / "más tarde…"**. Toma NUEVA de Rasalgethi ("Un sistema de presupuestos
  más tarde."). Si queda larga (> 2,6 s), se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav`
  y el cartel dice "Un sistema" / "más tarde…".
- **Rubén NO aparece** (no es distribuidora). Ningún personaje del elenco salvo Sofi.
- **Quién dice "Comentá PRESUPUESTO": Sofi** (ELENCO.sofi, voz Achernar), como en estetica-turnos y por las mismas
  razones: "te mando cómo funciona" lo dice quien de verdad contesta el comentario; Óscar termina en su remate ("Y me
  avisaste.") sin pasar a vendedor; Sofi es la cara de la videollamada; y aparece en un celular parado sobre el banco de
  trabajo, al lado de la tablet con el tablero verde: la solución sigue en pantalla mientras habla. Alternativa si no se
  llega con Sofi: Óscar a cámara, "Comentá PRESUPUESTO y te cuento cómo lo armé", con el mismo plano.

## Paleta y set (para "Hechos")
**Taller mecánico de día, frío y luminoso: pared del fondo de bloques pintados navy claro `#16243d` hasta 2,2 m (juntas
apenas marcadas, color plano) y arriba crema `#efeee5`; panel de herramientas perforado crema con las siluetas pintadas
navy de cada herramienta; piso de hormigón alisado gris-crema `#d9d7c9` plano, con una franja verde `#5ce611` de seguridad
alrededor del elevador; portón levadizo abierto a la derecha por donde entra la luz de mediodía como un trapecio crema
plano sobre el piso (sin degradé ni polvo flotando: que no haga bandas en Instagram); afuera, la calle de día con vereda
crema y un árbol low-poly verde.** Distinto de estetica-turnos y dist-pedidos-lunes (paredes crema), de dice-cuarenta
(depósito navy entre racks, sin luz de día ni piso claro) y de la parrilla que se hace en paralelo (noche cálida). Anotar
en "Hechos": "taller de día, pared de bloques navy claro #16243d con panel de herramientas crema, piso de hormigón claro
con franja verde, portón abierto con luz de mediodía plana; elevador con el sedán crema; el pincho de presupuestos que se
llena (y el segundo pincho); parte 2 igual + interfaz de presupuesto/seguimiento/tablero; cartel verde".
- **Texto en pantalla:** crema sobre navy, navy sobre crema. Nunca blanco sobre el piso claro o la pared crema. Los
  rótulos con línea guía en caja navy con texto crema.
- **Rojo apagado `#c7655b` SOLO para el problema:** "$ 90.800 en el pincho", "Embrague $ 38.000: a la vuelta", el
  "Visto" sin respuesta (gris), la flechita del auto que se va. **Verde `#5ce611` para lo resuelto:** ✓, "Aceptar y
  agendar", "Turno agendado", la columna ACEPTADO, "$ 74.500 aceptados", la franja de seguridad, el recuadro de selección
  de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  Las del celular (mensajes de clientes): avatar redondo + nombre + **día de la semana grande** ("MARTES", "MIÉRCOLES"…):
  el día es el reloj del chiste, como la hora en estetica-turnos.

## Personajes nuevos (agregar a ELENCO, mismo estilo; solo parámetros y peinados que ya existen en personajes.js)
- **Óscar · `ELENCO.oscar`** (dueño del taller, ~52 años, voz Charon). Piel `PIEL.trigueña`, pelo gris `PELO.gris` en
  `peinado: "texturado"` con `texturaAlto: 0.4` (corto y parejo, nada de pelado: que no se parezca a Rubén), **barba
  candado gris** (`barba: 0x6d6a66, barbaLarga: 0.55, barbaOpacidad: 0.75, barbaBigote: true`), `cejaGruesa: true,
  cejasColor: 0x5a5550`, mejillas `0xc9785e`. **Mameluco navy** = `camisa: MARCA.navy2, mangas: "largas"` (si se puede,
  arremangadas como Rubén), `cuello: MARCA.navy3, cuelloBotones: false, cuelloAlto: 0.07`, **franja verde de marca
  `franja: MARCA.g`** en el pecho (el cierre del mameluco), `pantalon: MARCA.navy2` (mismo color: tiene que leerse como
  una sola pieza), botines `0x2a2220`. `panza: 1.12, nariz: 0.064, alto: 1.02`. Detalles con objetos simples, no
  parámetros nuevos: **trapo crema con manchas de grasa** colgando del bolsillo de atrás (plano doblado, 2 manchas
  gris oscuro), **manchas de grasa** en las manos (puntas de los dedos un tono más oscuro, `dedos` gris oscuro si el
  módulo lo deja) y una mancha en la manga. Expresión base: `neutra`/`incredula` contenido en la parte 1, `sonrisa` en
  la parte 2. Nada de gritos ni manos a la cabeza: es un mecánico de 30 años de oficio que ya lo vio todo.
- **Maxi · `ELENCO.maxi`** (ayudante, ~22 años, voz Puck). Piel `PIEL.morena`, pelo negro `PELO.negro` en
  `peinado: "jopo"` (que no se parezca a Nico, que es trigueño con "corto"), `cejasColor: 0x1e1a18`, mejillas `0xb8644e`.
  **Mameluco verde oscuro** = `camisa: MARCA.gd, mangas: "cortas", cuello: null, cuelloBotones: false, cuelloAlto: 0.06,
  franja: MARCA.navy, pantalon: MARCA.gd`, zapatillas crema `MARCA.cr`. `panza: 0.95, nariz: 0.052, alto: 1.0`. Una
  mancha de grasa en la mejilla (disco gris oscuro chico, `esferaLow` aplastada). En la parte 1 sentado sobre la pila de
  cubiertas, aburrido; en la parte 2 de pie, trabajando.
- **Sergio · `ELENCO.sergio`** (cliente, ~40 años, voz Zubenelgenubi). Piel `PIEL.media`, pelo castaño `PELO.castaño` en
  `peinado: "corto"`, cejas `0x4a3222`, afeitado, mejillas `0xe39282`. Camisa crema `MARCA.cr` de manga larga con cuello
  crema, **campera** `{ color: MARCA.navy3, cuello: MARCA.cr, cierre: 0xb4b2a3, abierta: true }`, pantalón `0x3a3f4a`,
  zapatos `0x3b2a20`. `panza: 1.0, nariz: 0.058, alto: 1.0`. Siempre con **la llave del auto con un llavero verde** en la
  mano. Buena onda total, nunca culpable: es un cliente común. Que no se parezca a Walter (Walter: corbata, mochila,
  "texturado", campera crema).
- **Fabián, Pablo, Silvia, Andrés** (clientes, sin voz): solo como avatar redondo en las burbujas de la semana. Variantes
  rápidas de DEFECTO con peinados existentes (Fabián `costados` con lentes navy; Pablo `texturado` negro con barba;
  Silvia `rodete` castaño; Andrés `corto` rubio). Que no se parezcan a los personajes del elenco.
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de estetica-turnos: buzo navy claro con franja crema, la varilla del
  micrófono separada de la mejilla) en la videollamada del cierre (Q5), plano medio, auriculares verdes, fondo navy liso
  con el logo de Scalerics chico.

## Objetos 3D (el set del taller es nuevo; específicos, que nadie los confunda con un garaje de casa o una gomería)
- **Taller (set principal):** nave con la pared de bloques navy claro del fondo, el **portón levadizo** abierto a la
  derecha (marco navy3, la hoja enrollada arriba en una caja crema), la calle afuera (vereda crema, cordón, un árbol
  low-poly verde). Un cartel en la pared de adentro, placa crema con "MECÁNICA ÓSCAR" en Lexend 800 navy (que se lea de
  frente, no de espaldas).
- **Elevador de dos columnas (EL objeto que importa):** dos columnas navy3 de ~2,6 m con el tope unido por un travesaño,
  cuatro **brazos verdes** de marca con tacos de goma negros, el panel de mando chico (botón verde) en una columna. En la
  parte 1 con el sedán de Sergio levantado (P1) y **vacío, con los brazos abiertos** en el sábado (P4-P6): es la camilla
  vacía de este reel. En Q4 sube el auto de Sergio (movimiento suave, función del tiempo).
- **El sedán de Sergio:** sedán familiar de juguete low-poly, **crema** `#efeee5` con vidrios navy, paragolpes gris
  oscuro, ruedas negras con llanta crema, patente "STR 4581". En P1 levantado en el elevador, sin la rueda delantera
  izquierda (la rueda apoyada contra la columna). En P4 pasa por la calle, ventanilla baja, Sergio asomado. En Q4 entra
  por el portón y sube al elevador. Sin logo ni rejilla reconocible.
- **El pincho de presupuestos (EL gag):** base redonda de metal navy (Ø 10 cm, pesada) con un **clavo vertical** largo
  (25 cm) gris acero. Papeles de presupuesto (A6 crema, renglones navy, "PRESUPUESTO" en el encabezado, el monto
  manuscrito grande en Caveat navy, y **la huella de un pulgar con grasa** gris oscuro en una esquina) clavados por el
  medio, cada uno un poco torcido. Crece: 1 (P1) → 5 (P2), con un chac y un rebote corto del pincho por cada uno. En P7
  aparece el **segundo pincho**, igual y vacío, que Maxi apoya al lado. En Q4 Maxi **cuelga el pincho** (ya vacío) en el
  panel de herramientas, en una silueta pintada que le queda justa.
- **Banco de trabajo:** mesada de madera gruesa con frente navy3, **morsa** gris en la punta, el pincho, la tablet en un
  atril (parte 2), un **kit de embrague** (disco con los resortes a la vista y la placa de presión, gris acero) apoyado
  sobre un trapo, un bidón de aceite crema liso, una lámpara de taller colgada de un gancho (jaula + tubo emisivo crema).
- **Panel de herramientas:** tablero perforado crema con llaves combinadas en escalera, destornilladores, una pinza y un
  martillo, cada uno sobre su silueta navy pintada; una silueta vacía con la forma del pincho (se llena en Q4).
- **Carro de herramientas:** carro rodante navy con 5 cajones de manijas verdes, uno entreabierto con llaves de tubo.
- **Pila de cubiertas:** 4 cubiertas negras apiladas (dibujo de banda marcado), donde se sienta Maxi en P3-P6.
- **Gato carrito** (navy3 con la manija verde; nada de rojo, que es del problema) en el piso, al lado del elevador.
- **Celular de Óscar** (crearCelular de ya-lo-cargo/anotamelo, funda negra gastada) con **huellas de grasa** en la
  pantalla (dos manchas grises semitransparentes que no tapen el texto): pantalla canvas con el chat.
- **Celular de Sergio** (el mismo modelo, funda navy3): el presupuesto y el seguimiento.
- **Tablet de Óscar** en un atril sobre el banco (parte 2): el tablero.
- **Celular parado de la videollamada** (Q5): en un soporte sobre el banco, pantalla con Sofi.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final, celular/tablet ≥ 60 % del cuadro en los insertos)
**Parte 1 · el presupuesto de papel (P1, en la mano de Sergio y en el pincho):** encabezado "MECÁNICA ÓSCAR ·
PRESUPUESTO", manuscrito: "Sedán STR 4581" · "Embrague completo" · "Kit + mano de obra" · grande **"$ 38.000"**.
La huella de grasa en la esquina.
**Parte 1 · el chat de Óscar (P2, la semana; encabezado navy "Presupuestos", fondo crema):** cada fila entra con el
**día grande** arriba (chip navy: "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"):
- Martes · Óscar → Fabián (burbuja derecha, foto del papel): "Frenos y discos · $ 14.500" · abajo, en gris, **"Visto
  10:12"** y nada.
- Miércoles · Pablo: **"Lo hablo con mi señora."**
- Jueves · Silvia: **"Te confirmo el lunes."**
- Viernes · Andrés: **"Dale, cualquier cosa te escribo."**
Cada uno termina con el chac del papel en el pincho (corte al pincho, 0,3 s) o con el papel volando del celular al
pincho en el mismo cuadro (mejor, si da).
**Parte 1 · rótulos de la pausa (P5):** caja navy, texto crema, línea guía al pincho: "5 presupuestos esta semana" y
debajo, en rojo apagado, **"$ 90.800 en el pincho"** (38.000 + 14.500 + 22.000 + 9.800 + 6.500: números del caso, no
estadística); al elevador vacío: **"Embrague $ 38.000: a la vuelta"** (rojo apagado).
**Parte 1 · P7 · mensaje nuevo:** celular de Óscar: "Hola, ¿me pasás presupuesto de embrague?" (sin nombre, avatar gris).
**Parte 2 · Q1 · la tablet de Óscar, "Nuevo presupuesto":** "Sergio · Sedán STR 4581" · "Embrague completo · kit +
mano de obra" · **"$ 38.000"** · botón verde **"Enviar"** → "Enviado ✓".
**Parte 2 · Q1 · celular de Sergio** (fondo crema, encabezado navy "Mecánica Óscar"): "Presupuesto · Embrague completo"
· "$ 38.000" · "Válido 7 días" · botones **"Aceptar y agendar"** (verde) y **"Tengo una duda"** (crema con borde navy).
Rótulo HTML: "Presupuesto con botón".
**Parte 2 · Q1 · tablero (chico, en la tablet atrás):** la tarjeta "Sergio · Embrague · $ 38.000" pasa de ENVIADO a VISTO.
**Parte 2 · Q2 · seguimiento automático** (chip arriba: "Miércoles · 2 días después"; rótulo: "Seguimiento automático"):
celular de Sergio ≥ 60 %: "Hola, Sergio. ¿Pudiste ver el presupuesto del embrague? Si querés, te lo agendamos esta
semana." · botones "Aceptar y agendar" / "Tengo una duda" · toca Aceptar · tira de turnos "Mié 16:00 · **Jue 8:30** ·
Vie 10:00" (la elegida en verde) · **"Turno agendado ✓ · Jueves 8:30"**.
**Parte 2 · Q3 · el tablero de la semana** (tablet ≥ 70 % del cuadro, encabezado "Presupuestos · esta semana"):
tres columnas **ENVIADO · VISTO · ACEPTADO** (la última con el encabezado verde). Tarjetas (nombre · trabajo · monto):
"Sergio · Embrague · $ 38.000" ya en ACEPTADO; "Fabián · Frenos y discos · $ 14.500" VISTO → ACEPTADO; "Pablo ·
Distribución · $ 22.000" VISTO → ACEPTADO; "Silvia · Tren delantero · $ 9.800" con chip "Tiene una duda · te toca a
vos" (borde navy, no rojo); "Andrés · Service · $ 6.500" en VISTO con "Seguimiento: mañana". Abajo, dos números grandes:
**"Abiertos: $ 16.300"** (crema) y **"Aceptados: $ 74.500"** (verde, el contador sube 38.000 → 52.500 → 74.500 con cada
tarjeta).
**Parte 2 · Q5 · el tablero lleno + cierre:** el mismo tablero con "Aceptados: $ 74.500" grande y "Seguimientos a mano:
0" (verde). **Capa HTML:** "Comentá **PRESUPUESTO**" grande (Lexend 900, PRESUPUESTO en el recuadro verde; ojo, es una
palabra larga: ≤ 900 px de ancho, bajar a ~110 px si hace falta), sobre la escena; en los últimos 0,8 s, abajo chico:
"Presupuestos con seguimiento automático" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-15,60 s)
Cámara continua en el taller, a la altura de los ojos; el eje del set: elevador al centro, banco de trabajo con el pincho a
la izquierda en primer término, portón a la derecha con la luz y la calle.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,60 | **P1 · cuadro 0.** Plano medio-general desde el banco: Óscar (izq., de 3/4) y Sergio (der.) frente al sedán crema levantado en el elevador; la rueda apoyada en la columna, el portón con la luz atrás. Push-in lento. | **Cuadro 0:** arriba, enorme, **"TALLERES MECÁNICOS"** (Lexend 900, ~120 px, crema sobre la pared navy, "MECÁNICOS" en el recuadro verde); chip "LUNES". Sergio ya tiene el papel del presupuesto en la mano ("$ 38.000" se lee). 0,30-1,50 · **Sergio: "Lo pienso y te aviso."** (se da vuelta hacia el portón). 1,70 · Óscar clava la copia en el pincho del banco: **chac** (el pincho rebota). | taller, elevador con el sedán, rueda, banco, pincho (1 papel), Óscar, Sergio, presupuesto | ambiente de taller de día: música liviana (bajita) + un compresor que arranca lejos y una radio apagada NO (sin música de radio) · papel (`k-page-turn` corto) 0,15 · **chac** del pincho (golpe seco metálico CC0 o `k-tick` grave + papel) 1,70 · pasos de Sergio 1,9 |
| 2,60-6,00 | **P2 · la semana.** Inserto del celular de Óscar (≥ 60 %) con las huellas de grasa; entre burbujas, cortes de 0,3 s al pincho que se llena (o el papel vuela del celular al pincho). | Chip de día que salta: MARTES (2,7) Fabián "Visto 10:12" · MIÉRCOLES (3,5) Pablo "Lo hablo con mi señora." · JUEVES (4,3) Silvia "Te confirmo el lunes." · VIERNES (5,1) Andrés "Dale, cualquier cosa te escribo." · después de cada una, **chac** y el pincho suma un papel (2 → 5). | celular de Óscar, pincho | notification ×4 (escalonadas) · chac ×4 (cada vez un poco más fuerte) · whoosh-short en cada salto de día |
| 6,00-8,60 | **P3 · la creencia.** Plano general desde el portón hacia adentro: el elevador **vacío** con los brazos abiertos, Maxi sentado en la pila de cubiertas mirando el pincho lleno, Óscar limpiándose las manos con el trapo junto al banco. Chip "SÁBADO". | 6,10-7,30 · **Maxi: "Jefe, ¿a esos no los llamamos?"** 7,50-8,50 · **Óscar: "Si les interesa, llaman."** (guarda el trapo en el bolsillo, seguro). | taller, elevador vacío, cubiertas, Maxi, Óscar, banco, pincho (5) | trapo (`k-cloth_1`) 7,4 · ambiente |
| 8,60-11,20 | **P4 · el golpe.** La cámara gira hacia el portón (paneo corto): por la calle pasa el sedán crema, entero, andando, ventanilla baja, Sergio asomado saludando con la mano. | 8,70 · **bocina** (doble, corta). 9,00-11,10 · **Sergio: "¡Óscar! Al final lo hice acá a la vuelta. ¡Me llamaron!"** (contento, buena onda) · el auto sigue y sale de cuadro por la derecha. Óscar y Maxi quedan en contraluz en el portón. | portón, calle, árbol, sedán con Sergio, Óscar, Maxi | bocina CC0 8,70 · motor que pasa (paneo izq.→der.) 8,7-11,2 |
| 11,20-12,40 | **P5 · la pausa.** Plano general desde atrás del banco: el pincho lleno en primer término (grande, enfocado), el elevador vacío al centro, Óscar y Maxi de espaldas en el portón, que se dan vuelta. Cámara quieta. | Silencio de taller: la música baja a -12 dB en 0,4 s (no se corta), solo el zumbido de la lámpara del banco y un goteo de aceite. 11,40 · rótulos con línea guía: "5 presupuestos esta semana" / **"$ 90.800 en el pincho"** (rojo apagado) al pincho; **"Embrague $ 38.000: a la vuelta"** (rojo apagado) al elevador vacío. | pincho (5), elevador vacío, Óscar, Maxi, portón | zumbido + gota · pop chico por rótulo |
| 12,40-13,90 | **P6 · el remate.** Push-in a primer plano de Óscar mirando el pincho (el pincho en el borde inferior, desenfocado lo justo). | 12,50-13,80 · **Óscar: "Lo pensó. Y me avisó."** (seco, grave, pausa entre las dos frases; la burbuja se revela por frase). | Óscar, pincho | ninguno (la música vuelve en 13,90) |
| 13,90-15,60 | **P7 · remate del remate.** Plano medio del banco: Óscar con el celular, el pincho lleno. | 14,00 · vibra: "Hola, ¿me pasás presupuesto de embrague?" (inserto chico arriba, sin voz). 14,50 · Óscar mira el celular, mira el pincho. 14,80 · entra la mano de Maxi y apoya al lado un **segundo pincho, vacío**: tac. Óscar lo mira. 15,50 stinger. | Óscar, celular, pincho (5), segundo pincho, Maxi (mano/brazo, o Maxi entero de 3/4) | notification 14,00 · tac metálico 14,80 · stinger 15,50 |

## CARTEL (15,60-18,00 s)
Time card de dibujito de siempre: **"Un sistema" / "de presupuestos" / "más tarde…"**. Narrador Rasalgethi (toma
nueva). Nunca "Scalerics".

## PARTE 2 · resuelto (18,00-36,40 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,00-21,80 | **Q1 · callback.** El encuadre del cuadro 0 (otro lunes): Óscar y Sergio frente al sedán en el elevador; en el banco, la tablet en su atril (el pincho sigue ahí, vacío). Inserto del celular de Sergio. | 18,20-19,40 · **Sergio: "Lo pienso y te aviso."** (el mismo audio de 01) · 19,60-20,50 · **Óscar: "Pensalo tranquilo."** (media sonrisa) y toca "Enviar" en la tablet · 20,60 · inserto: a Sergio le llega el presupuesto con "Aceptar y agendar" / "Tengo una duda" · 21,40 · en la tablet la tarjeta pasa de ENVIADO a **VISTO**. Rótulo HTML: "Presupuesto con botón". | taller, elevador con sedán, Óscar, Sergio, tablet en atril, pincho vacío, celulares | click-soft 20,50 · whoosh-short 20,55 · notification 20,65 · pop 21,40 |
| 21,80-25,60 | **Q2 · el seguimiento solo.** Chip "Miércoles · 2 días después". Sergio en otro lugar (en su auto estacionado, plano corto por la ventanilla, o en la vereda de su trabajo); inserto de su celular ≥ 60 %. | 22,00 · llega el seguimiento: "Hola, Sergio. ¿Pudiste ver el presupuesto del embrague? Si querés, te lo agendamos esta semana." · 22,60-23,80 · **Sergio: "Justo lo estaba pensando."** · 24,00 toca **"Aceptar y agendar"** · 24,40 elige **Jue 8:30** · 25,00 **"Turno agendado ✓ · Jueves 8:30"**. Rótulo: "Seguimiento automático · a los 2 días". | Sergio, su celular, el auto (interior simple) | notification 22,00 · click-soft 24,00 y 24,40 · ding (`cero.mp3`) 25,00 |
| 25,60-29,40 | **Q3 · el tablero.** El taller; push-in a la tablet del banco hasta ≥ 70 % del cuadro; Maxi y Óscar al lado (Óscar de 3/4, Maxi asomando). | 25,80-27,20 · las tarjetas se mueven: Sergio a ACEPTADO (ya), Fabián VISTO → ACEPTADO, Pablo VISTO → ACEPTADO, Silvia "Tiene una duda · te toca a vos", Andrés "Seguimiento: mañana"; el contador "Aceptados" sube 38.000 → 52.500 → 74.500 · 27,30-28,40 · **Maxi: "Jefe, ¿a esos no los llamamos?"** (el mismo audio de 02) · 28,50-29,30 · **Óscar: "Ya les escribió el sistema."** (sin levantar la vista). | tablet, banco, Óscar, Maxi | whoosh-short por tarjeta · ding por cada ACEPTADO (escalonados) · tic de contador |
| 29,40-32,60 | **Q4 · jueves 8:30, el encuadre del cuadro 0.** Chip "JUEVES · 8:30". El elevador vacío; por el portón entra el sedán crema y se acomoda entre las columnas; Sergio baja con la llave del llavero verde. | 30,20-30,80 · **Sergio: "Lo pensé."** · 31,00-31,80 · **Óscar** (recibiendo la llave, media sonrisa): **"Y me avisaste."** · 31,90 · Maxi aprieta el botón verde y el **elevador sube el auto**; en el mismo cuadro, al fondo, **cuelga el pincho vacío en el panel de herramientas**, en su silueta. | taller, portón, sedán, elevador que sube, Sergio, Óscar, Maxi, panel de herramientas, pincho | motor de auto que entra y se apaga 29,5-30,1 · puerta de auto 30,1 · llaves (tintineo) 31,0 · motor eléctrico del elevador 31,9 · clic metálico del pincho en el panel 32,3 |
| 32,60-36,40 | **Q5 · el tablero lleno + cierre.** La cámara va del elevador al banco y hace push-in a la tablet (≥ 60 % al principio): la semana en verde; al lado, el celular parado con **Sofi en videollamada**; travelling corto a Sofi. | 32,80 · "Aceptados: $ 74.500" en verde y "Seguimientos a mano: 0" (con ding). 33,00-36,00 · **Sofi: "Comentá PRESUPUESTO y te mando cómo funciona para tu taller."** · en "PRESUPUESTO" entra grande **"Comentá PRESUPUESTO"** (capa HTML). 35,60 · línea chica: "Presupuestos con seguimiento automático" / "scalerics.com". | banco, tablet, celular parado con Sofi, el pincho colgado al fondo (desenfocado, se reconoce) | ding 32,80 · pop en "PRESUPUESTO" · final de la música |

**Si las tomas reales hacen pasar el reel de ~38 s**, recortar en este orden: (1) Q3 sin el intercambio Maxi/Óscar (el
tablero se entiende solo; -2,0 s); (2) P2 con tres días en vez de cuatro (sacar a Andrés del chat pero dejar su papel en
el pincho; -0,8 s); (3) Q2 sin "Justo lo estaba pensando." (-1,2 s). Nunca recortar P5 por debajo de 1,0 s ni la pausa
antes de "Lo pensó.".

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "TALLERES MECÁNICOS" entero y legible; el auto en el elevador, Óscar, Sergio y el papel con "$ 38.000"
  en el mismo cuadro. Que se lea "taller mecánico" y no "garaje de casa" ni "gomería" (elevador de dos columnas, panel de
  herramientas, carro, mameluco).
- **El pincho:** que se lea como pincho de papeles (base pesada + clavo) y los papeles como presupuestos (encabezado +
  monto grande + huella de grasa); que cada papel nuevo se clave por el medio (no flote ni atraviese la mano); el segundo
  pincho igual al primero; que el pincho colgado en Q4 entre justo en su silueta.
- **El elevador:** brazos bajo el auto en los puntos de apoyo (sin atravesar la carrocería); vacío y abierto en P3-P6; el
  auto que sube sin temblar.
- **El auto en la calle (P4):** que se vea entero y andando (ruedas que giran), Sergio asomado y saludando; que no
  atraviese el árbol ni el cordón.
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp; ✓
  verdes; el tablero con las tres columnas legibles y los dos totales grandes.
- **Continuidad:** el sedán crema con la misma patente en P1, P4, Q1 y Q4; Óscar siempre con el mameluco navy y la franja
  verde (y el trapo); Maxi con el mameluco verde oscuro; Sergio con la campera navy y la llave del llavero verde; el
  pincho vacío en el banco durante Q1-Q3 y colgado en Q4-Q5.
- **Sofi:** ELENCO.sofi (no un personaje nuevo), ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` ≈ 11,6 (P5: el pincho lleno de presupuestos grasientos en primer término, el elevador vacío, Óscar y Maxi; renderizar
sin gancho, rótulos, subtítulos ni burbujas). Si en ese plano los personajes quedan chicos o de espaldas, alternativa:
cuadro de P6 abierto (Óscar de frente con el pincho en primer plano). `chica`: "Embrague, $ 38.000." · `grande`:
**"Lo pienso…"** (la frase que el dueño escucha, 2 palabras) · `sello`: "TALLERES". Alternativa
de `grande`: "¡Me llamaron!" (con `chica` "Lo hizo a la vuelta."). Nota: `reels/lo-pienso` (03-11) tuvo de portada
«Lo pienso» chico + "y nadie volvió" grande sobre una torre gris sin personajes; esta va con Óscar, el pincho y el
elevador, y el sello del rubro: no se confunden en el feed.
