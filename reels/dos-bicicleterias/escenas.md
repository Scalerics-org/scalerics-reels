# Escenas de dos-bicicleterias (3D real, puntos 8b y 8c)

89 palabras, voz Orus, ~30-32 s estimados (0,34 s/palabra + pausas). Índices de palabra = como los cuenta
`reel.json` (separando por espacios; "bicicleterías," "scalerics.com." cuentan una cada una).

**Serie "Dos negocios" · Producto: CRM** (saber qué compró cada cliente y avisarle solo al que le sirve).
Sin marcas reales: las fachadas no llevan nombre (las distinguen el toldo y el color). Ninguna red social nombrada ni dibujada.

**Fondo del reel: crema `#efeee5`** liso (es primavera), piso/vereda crema un poco más oscuro `#dcdacb`, sin
degradés; sombras suaves navy al 20 %. Objetos en navy `#0b1220` / `#16243d`, verde `#5ce611`, blanco, crema.
Rojo apagado `#c7655b` SOLO para el problema (la foto que se pasa de largo, el casco que falta). Subtítulos arriba
al centro, navy sobre crema, palabra clave en recuadro verde.

## La pantalla partida en 3D (la base de la serie)
Una sola calle low-poly en 3D, vista de frente: **dos fachadas iguales lado a lado**, misma altura, misma
vidriera grande, separadas por un poste/medianera navy en el centro (x = 0) que hace de línea de pantalla
partida.
- **Izquierda:** toldo a rayas gris `#9aa0a8` y crema, marco de vidriera gris, interior con luz apagada
  (material desaturado, emisivo bajo). No es fea ni sucia: es la misma tienda, sin el acento verde.
- **Derecha:** toldo a rayas verde `#5ce611` y crema, marco navy, interior con luz cálida y un borde verde.
- En cada vidriera, **el mismo casco** (mismo modelo, mismo color: los dos tienen la misma mercadería) sobre un
  pedestal, y una bici colgada atrás. La diferencia NUNCA está en el producto, solo en el acento y en lo que pasa.
Cuando la historia va a un solo lado, la cámara viaja (travelling lateral) hacia esa vidriera y la otra queda
fuera de cuadro o en el borde; en las bisagras ("Mismos cascos, mismos clientes") vuelve al plano de las dos.

## Objetos protagonistas (específicos y reconocibles)
- **EL CASCO** (el objeto que une todo): casco urbano de bici, casco redondeado (media esfera alargada hacia
  atrás), **5-6 ventilaciones** alargadas en el lomo (ranuras extruidas, se tienen que ver: es lo que dice
  "casco de bici" y no "gorro" ni "bowl"), visera corta adelante, carcasa navy `#16243d` brillante con una franja
  crema, correas negras con hebilla, interior de espuma gris. Preguntarse: ¿alguien lo confunde con un casco de
  moto? No: es abierto, liviano, con ranuras.
- **LA BICI DE PAULA:** bici urbana low-poly, **cuadro verde `#5ce611`** (así se reconoce cuando vuelve),
  dos ruedas con llanta, cubierta navy y **rayos** (16-20 por rueda, cilindros finos pero ≥ 6 px en pantalla),
  manubrio curvo con puños crema, asiento de cuero crema, pedales y cadena, guardabarros, canasto chico adelante.
  Las ruedas giran (rueda libre) cuando entra.
- **EL CELULAR:** RoundedBox navy, pantalla crema; feed genérico (tarjetas crema y navy, sin logo ni colores de
  ninguna app) o chat genérico con globos navy/verde. Textos de interfaz ≥ 28 px.
- **LA FICHA DE LA CLIENTA (CRM):** tarjeta RoundedBox blanca con borde navy, 70 % del ancho: "Paula" grande,
  debajo "Compró: bici urbana · marzo" y "Casco: no" (en rojo apagado; pasa a "Casco: sí ✓" verde en el
  callback). Atrás, otras fichas en abanico.

Cámara: **una sola curva Catmull-Rom** para todo el reel: calle de frente (las dos fachadas) → travelling a la
vidriera izquierda → celular con la foto → travelling a la derecha → zambullida al monitor/ficha → el mensaje
vuela a un celular → Paula en la vereda frente a las dos → la puerta de la derecha → vuelta al plano de las dos →
ficha → cierre. Push-ins y órbitas cortas, sin cortes secos; en cada transición un objeto grande en cuadro.

| # | id | arranca en | dur. aprox. |
|---|----|-----------|-------------|
| 1 | s01-gancho | 0 "Dos" | 3,3 s |
| 2 | s02-izquierda | 10 "A" | 3,2 s |
| 3 | s03-derecha | 20 "A" | 2,0 s |
| 4 | s04-filtro | 26 "quién" | 1,8 s |
| 5 | s05-escribe | 31 "Le" | 1,9 s |
| 6 | s06-mensaje | 36 "Paula," | 2,8 s |
| 7 | s07-vio | 44 "Paula" | 3,2 s |
| 8 | s08-su-nombre | 54 "Su" | 2,3 s |
| 9 | s09-mismos | 60 "Mismos" | 1,8 s |
| 10 | s10-sabia | 64 "Una" | 2,3 s |
| 11 | s11-scalerics | 71 "En" | 1,8 s |
| 12 | s12-tu-local | 76 "¿Vemos" | 3,0 s |
| 13 | s13-llamada | 85 "videollamada" | 2,8 s |

Las escenas 1, 2 y 7 pasan de 3 s: cada una tiene un cambio grande adentro (marcado abajo con la palabra), así
nada queda quieto más de 2 s. Si con la voz real alguna supera ~3,5 s, partirla en esa palabra:
s01 en 5 "Una", s02 en 14 "foto", s07 en 48 "La". Si s04 o s11 quedan por debajo de 1,7 s, unir s04 con s03
(arranca en 20) y s11 con s12 (arranca en 71).

## 1 · s01-gancho (0 "Dos bicicleterías, los mismos cascos. Una sabe a quién avisarle.")
- **Objeto:** LA CALLE con las dos fachadas lado a lado, llenando el ancho (cada fachada ~48 % del ancho, zona
  y 580-1330), ya en cuadro en el segundo 0. En cada vidriera, sobre su pedestal, el mismo casco navy.
- **Cambio adentro:** en "cascos" (pal. 4) los dos cascos hacen pop a la vez (escala 0,8 → 1,05 → 1) y giran
  media vuelta sincronizados: son iguales. En "Una" (pal. 5) se prende la luz cálida y el toldo verde de la
  DERECHA (la izquierda queda gris: misma tienda, sin acento).
- **Cámara:** push-in lento y frontal, centrado en el poste del medio (pantalla partida simétrica).
- **HTML:** el gancho ENTERO en el cuadro 0, Lexend 900 ~120 px navy: "Dos bicicleterías, los mismos cascos.
  Una sabe **a quién avisarle**." ("a quién avisarle" en recuadro verde). Sello chico mono arriba: "Mismo rubro,
  misma calle, una sola diferencia". Karaoke recién desde la escena 2.
- **SFX:** whoosh suave de entrada, timbre de bici (ring-ring) en "bicicleterías", pop doble en "cascos", clic de
  luz en "Una".

## 2 · s02-izquierda (10 "A la izquierda, una foto en las redes: llegaron cascos.")
- **Objeto:** travelling lateral a la vidriera IZQUIERDA, el casco gris-navy grande (60 % del ancho). En "foto"
  (pal. 14) sube desde abajo un celular enorme (65 % del alto) delante de la vidriera: en la pantalla, un post
  genérico con la foto del casco y el texto "LLEGARON CASCOS" (navy sobre crema). En "llegaron" (pal. 18) el
  post se multiplica: el mismo post se repite en una cascada de celulares chiquitos que se alejan hacia atrás
  (el mismo aviso para todos, igual).
- **HTML:** rótulo con línea guía al post: "para todos igual" (mono, gris).
- **SFX:** whoosh de travelling, clic de cámara de foto en "foto", cascada de "swipe" suaves al multiplicarse.

## 3 · s03-derecha (20 "A la derecha, el CRM sabe")
- **Objeto:** travelling de vuelta pasando por el poste del medio (las dos fachadas cruzan el cuadro) hasta la
  vidriera DERECHA. Sobre el mostrador, una notebook/monitor navy que gira hacia la cámara y la pantalla crece
  hasta llenar el 70 % del ancho: lista de clientes del CRM (filas con nombre, "Compró", fecha).
- **HTML:** rótulo "CRM" con línea guía a la pantalla (CRM en verde).
- **SFX:** whoosh, pop del monitor, tecleo corto.

## 4 · s04-filtro (26 "quién compró bici sin casco.")
- **Objeto:** zambullida a la pantalla: arriba, dos chips de filtro 3D que caen y se encastran: "Compró: bici" y
  "Casco: no" (este con borde rojo apagado). La lista larga se encoge (las filas que no aplican se apagan en gris
  y bajan) y quedan **tres o cuatro** fichas iluminadas en verde, adelante "Paula".
- **HTML:** contador chico "quedan 4" (solo como resultado del filtro de la historia, no es estadística).
- **SFX:** dos clics de filtro, "shhh" de lista que se acomoda, ding al quedar.

## 5 · s05-escribe (31 "Le escribe a esos pocos:")
- **Objeto:** la ficha de Paula sale de la lista hacia la cámara (RoundedBox blanca, 70 % del ancho): "Paula",
  "Compró: bici urbana · marzo", "Casco: no" (rojo apagado). A su lado, en 3D, la BICI DE PAULA (cuadro verde)
  entra rodando de derecha a izquierda y frena al lado de la ficha (las ruedas siguen girando un instante).
- **HTML:** tilde verde en "pocos".
- **SFX:** whoosh corto, rueda libre (tic-tic-tic) y freno.

## 6 · s06-mensaje (36 "Paula, llegaron cascos para tu bici de marzo.")
- **Objeto:** de la ficha sale un globo de mensaje que vuela a un celular que entra grande por abajo (65 % del
  alto, levemente inclinado). Chat genérico (sin logo): el globo llega con "Paula, llegaron cascos para tu bici
  de marzo." Adentro del globo, una miniatura del casco y de la bici verde. En "bici" (pal. 41) asoma la bici
  verde detrás del celular.
- **Cámara:** sigue al globo y hace push-in a la pantalla.
- **SFX:** whoosh del mensaje, notificación (vibra + ding) al llegar.

## 7 · s07-vio (44 "Paula vio las dos. La foto la pasó de largo.") · BISAGRA / GIRO
- **Objeto:** la cámara se aleja: Paula NO se dibuja como personaje (nada caricaturesco), es **su celular** el
  protagonista, en primer plano y grande, frente a la calle con las dos fachadas al fondo (desenfocadas). En "dos"
  (pal. 47) en la pantalla aparecen las dos cosas apiladas: arriba el post genérico "LLEGARON CASCOS", abajo el
  mensaje "Paula, llegaron cascos para tu bici de marzo".
- **Cambio adentro:** en "La foto" (pal. 48) el pulgar (cursor redondo) hace scroll: el post se va para arriba y
  se pierde, gris, con un leve tinte rojo apagado (lo que se pasó de largo). El mensaje con su nombre queda.
- **HTML:** título de bisagra corto dentro del 80 % seguro: "Vio **las dos**". Rótulo con línea guía al post que
  se va: "se pasó de largo" (rojo apagado).
- **SFX:** whoosh de alejamiento, swipe rápido de scroll en "foto".

## 8 · s08-su-nombre (54 "Su nombre, no. Esa tarde, vuelve.")
- **Objeto:** el mensaje se queda arriba y su nombre "Paula" se ilumina en verde. En "Esa tarde" (pal. 57) la
  cámara pasa por encima del celular y baja a la vereda: la BICI DE PAULA (cuadro verde) entra rodando y frena
  frente a la fachada DERECHA, grande (60 % del ancho). La puerta se abre (luz cálida).
- **HTML:** sello "vuelve" en verde.
- **SFX:** ding suave en "nombre", rueda libre, freno corto, campanita de puerta en "vuelve".

## 9 · s09-mismos (60 "Mismos cascos, mismos clientes.")
- **Objeto:** grúa hacia atrás al plano de las DOS fachadas (como en la escena 1). En "cascos" los dos cascos de
  las vidrieras hacen pop a la vez otra vez, pero ahora **se elevan y giran en espejo** (no se repiten igual). En
  "clientes" frente a cada vidriera aparece la misma fila de 4 siluetas-fichas (tarjetas chicas iguales a los dos
  lados).
- **HTML:** "=" grande verde 3D o HTML en el poste del medio.
- **SFX:** whoosh de grúa, pop doble en "cascos", pop doble en "clientes".

## 10 · s10-sabia (64 "Una sabía qué se llevó cada uno.")
- **Objeto:** en la DERECHA, sobre cada ficha aparece lo que se llevó, en mini 3D (bici, luz, candado, inflador);
  sobre la de Paula, la bici verde. En la IZQUIERDA las mismas fichas quedan con un "?" chico gris (no rojo: no es
  un error del dueño, es un dato que no tiene a mano).
- **Cámara:** push-in hacia la derecha.
- **HTML:** rótulo con línea guía: "qué se llevó cada uno".
- **SFX:** cuatro pops escalonados.

## 11 · s11-scalerics (71 "En Scalerics armamos ese CRM.")
- **Objeto (CALLBACK):** la ficha de Paula vuelve grande al centro (70 % del ancho): "Casco: no" (rojo apagado)
  se tacha y pasa a **"Casco: sí ✓"** en verde; el casco 3D de la vidriera vuela y se apoya sobre la ficha, encima
  de la mini bici verde. Logo chico de Scalerics recién acá.
- **HTML:** rótulo "CRM · Scalerics" (Scalerics en verde).
- **SFX:** whoosh del casco, clic de hebilla del casco al apoyarse, tilde (ding).

## 12 · s12-tu-local (76 "¿Vemos a quién avisarle en tu local? Agendá una")
- **Objeto:** la cámara sale de la ficha y orbita la vidriera derecha: en la vidriera, en vez de un casco, hay
  una caja de mercadería nueva cerrada (cartón kraft, cinta navy) con un "?" verde arriba ("¿a quién le
  avisás?": la misma pregunta, aplicada al local del que mira). En "local" la caja se abre con un pop y salen
  tres globos de mensaje con nombre (genéricos: "Ana, …", "Diego, …", "Sofía, …") que vuelan hacia la cámara.
- **Cámara:** órbita corta y push-in final hacia el toldo verde, que se vuelve el fondo de la tarjeta.
- **SFX:** whoosh de órbita, pop de la caja, tres pings escalonados.

## 13 · s13-llamada (85 "videollamada gratis en scalerics.com.") · 2,8 s
- **Tarjeta de cierre** sobre crema `#efeee5`: "Videollamada gratis" en Lexend 800 navy, ~120 px; abajo, grande,
  "scalerics.com" en verde `#5ce611` sobre una banda navy (el verde sobre crema no contrasta). Logo de Scalerics
  abajo. El casco 3D chico puede quedar girando arriba. Arranca justo en "videollamada".
- **SFX:** whoosh suave de entrada; la música cierra con un fundido de 0,35 s.

## Paleta
- Fondo crema `#efeee5` · vereda `#dcdacb` · navy `#0b1220` / `#16243d` · verde `#5ce611` · blanco ·
  gris de la fachada izquierda `#9aa0a8` · rojo apagado `#c7655b` (solo "Casco: no", el post que se pasa de largo).
