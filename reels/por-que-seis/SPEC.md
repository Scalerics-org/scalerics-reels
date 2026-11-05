# por-que-seis · "¿Por qué…?" sin marcas (3D real), ~31-33 s

Serie "¿Por qué…?" (CLAUDE.md, puntos 8, 8b, 8c y 9). El experimento de las mermeladas (Iyengar y Lepper, 2000):
una mesa de degustación con 24 mermeladas atrajo más gente que una con 6, pero en la de 6 compró mucha más gente.
Lección: cuando hay demasiadas opciones, a mucha gente le cuesta decidir y lo deja para después. Callback: tu
catálogo de WhatsApp con 200 fotos sueltas es la mesa de 24; en tu tienda online (Scalerics) ordenamos el
catálogo: lo más pedido primero, pocas categorías, el cliente elige y paga. Cierre: videollamada gratis.
Datos y límites en `fuentes.md` (el efecto no es ley: no decir ni mostrar "siempre", "x10", "triplicó").
SIN marcas: ni el supermercado ni la marca de las mermeladas, etiquetas genéricas.

## Recurso visual central
- **El frasco de mermelada** como protagonista: vidrio (MeshPhysicalMaterial, transmission baja o vidrio
  opaco-satinado si SwiftShader no da), mermelada de color dentro (frutilla rojo vino `#8e2a3a`, durazno
  `#e39a3c`, arándano `#3b2a5a`, naranja `#e07a1f`, ciruela `#5a2440`, higo `#7a4a3a`: colores de FRUTA, no de
  marca; el frasco es el único lugar donde entran), tapa cubierta con **tela cuadrillé** (disco + faldón con
  ondas, textura de canvas procedural navy/crema o verde/crema) atada con un hilo, y **etiqueta crema** con una
  frutita simple dibujada (sin texto de marca). Que nadie lo confunda con un tarro de pintura o un vaso.
- **La mesa de degustación**: tablero con mantel blanco que cae a los costados, frascos en gradas (24 = 3 filas
  de 8 en una tarima escalonada; 6 = una fila), platito con galletitas y **cucharitas** de madera clavadas.
  Un cartelito plegado crema "Degustación" (texto genérico, Lexend).
- **La canasta del súper** (plástico verde de marca `#5ce611` con asas navy) donde caen los frascos comprados.
- **El celular** (RoundedBox navy, pantalla crema) que se vuelve la mesa: la grilla de 200 fotos sueltas se
  levanta como frascos y después se ordena en la tienda.
- Fondo **crema `#efeee5` liso** (sin degradés: compresión de Instagram), piso crema apenas más oscuro
  `#e4e2d6` con sombra suave navy al 25 %. Objetos navy `#0b1220` / `#16243d`, verde `#5ce611` (sombra
  `#3fa60a`), blanco. Rojo apagado `#c7655b` solo para el problema ("3", el 3 de cada 100, el caos de 200 fotos).
- Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 86 px **navy** sobre crema (no blanco), palabra clave en
  recuadro de selección verde con texto navy; rojo apagado para "tres", "menos", "doscientas". Gancho (s01) y CTA
  (s13) sin subtítulos: tienen el texto grande.
- Números y "24 / 6 / 3 / 30 / 200" en TextGeometry 3D (lexend800.js trae dígitos); el "?" es geometría propia
  (como en caso-pedidosya). Años: no hay.
- Cámara continua en curva Catmull-Rom, sin cortes secos: mesa grande → mesa chica → "?" → mesa grande con gente →
  canastas → cucharita → frascos en órbita → celular → el celular como mesa → tienda → pago → local → cierre.

## Escenas (índice de palabra 0-based sobre guion.txt; tiempos estimados a 0,34 s/palabra, rehacer con tiempos.md)

| # | id | arranca en | ~dur |
|---|----|-----------|------|
| 1 | s01-gancho | 0 "Pusieron" | 2,4 s |
| 2 | s02-seis | 7 "vendieron" | 1,8 s |
| 3 | s03-porque | 12 "¿Por" | 1,7 s |
| 4 | s04-gente | 14 "Un" | 3,0 s |
| 5 | s05-canastas | 23 "Pero" | 3,6 s (dos golpes) |
| 6 | s06-ganas | 34 "No" (les) | 1,8 s |
| 7 | s07-despues | 38 "No" (pudieron) | 2,7 s |
| 8 | s08-whatsapp | 46 "Pensá" | 3,0 s |
| 9 | s09-mesa24 | 55 "Es" | 1,8 s |
| 10 | s10-tienda | 60 "En" (Scalerics) | 3,8 s (dos golpes) |
| 11 | s11-paga | 72 "El" | 1,8 s |
| 12 | s12-negocio | 77 "¿Querés" | 2,7 s |
| 13 | s13-cta | 86 "videollamada" | 2,6-2,9 s (con cola) |

### s01-gancho (0 "Pusieron" → "seis")
- Cuadro 0 = portada en movimiento: la **mesa de 24 frascos** llena el ancho (gradas, mantel, cucharitas), cámara
  a 3/4 desde arriba, empezando un push-in lento. Arriba, ya entero: "**24 mermeladas.**" (Lexend 900, 140 px,
  "24" en verde) y abajo, más chico, "¿Vendieron más?" (navy 90 px).
- "vendieron menos": no hay cambio de objeto todavía (el texto cambia en s02).
- SFX: `whoosh-cinematic` en 0, `pop` suaves escalonados mientras los frascos terminan de asentarse (0-0,8 s).

### s02-seis (7 "vendieron" → "seis")
- Travelling lateral a la derecha: aparece **la mesa de 6** (misma mesa, una sola fila, frascos más grandes en
  cuadro). Las dos mesas en cuadro, la de 6 adelante. "menos" → la mesa de 24 se apaga a gris crema (desatura);
  "seis" → la de 6 se prende, cada frasco da un pop. 3D "24" sobre la grande (gris) y "6" sobre la chica (verde).
- Rótulo HTML: pill "Vendió más" con línea guía a la mesa de 6.
- SFX: `whoosh` en el travelling, `pop` x6 escalonado en "seis".

### s03-porque (12 "¿Por qué?")
- Bisagra, UN solo objeto: la tapa cuadrillé de un frasco de la mesa chica sale volando hacia cámara, gira y se
  transforma en un **"?" 3D verde grande** centrado (dentro del 80 % seguro). Fondo crema liso.
- SFX: `whoosh-short` + `pop` al formarse el "?".

### s04-gente (14 "Un experimento famoso" → "gente")
- El "?" se encoge y cae como punto sobre la mesa de 24 (vuelve la mesa grande, ahora a color). Grúa hacia atrás:
  llegan **siluetas low-poly navy** (cápsula + esfera, sin caras) alrededor de la mesa grande: muchas; alrededor de
  la chica (al fondo, desenfocada) pocas. Contador HTML o 3D "60" vs "40" NO: solo siluetas (más / menos se ve).
- Rótulos: pill chica mono arriba a la izquierda "Experimento · 2000" (fuentes.md); en "más gente" pill verde
  "Más gente" con línea guía a la mesa grande.
- SFX: `click-soft` por cada silueta que llega (en ráfaga), `whoosh` en la grúa.

### s05-canastas (23 "Pero" → "treinta")
- Golpe 1 ("compraron tres de cada cien"): push-in a **una canasta verde** delante de la mesa grande. Caen solo
  tres frascos (pop, rebote). Número 3D "3" arriba en rojo apagado, "de cada 100" en HTML debajo.
- Golpe 2 ("En la de seis, treinta"): la cámara viaja a la otra canasta delante de la mesa chica; caen frascos en
  chorro hasta llenarla y desbordar un poco; el 3D "3" rueda a "30" en verde (como el 2009 → 2014 de pedidosya).
- SFX: `pop` x3 con `impact-bass-1` chico en el tercero; `whoosh` en el viaje; ráfaga de `pop` + `chime` en "treinta".

### s06-ganas (34 "No les faltaban ganas")
- Push-in macro a **un frasco abierto con una cucharita** de madera: la cucharita sale cargada de mermelada (que
  gotea, brillante) hacia cámara. El objeto llena la pantalla. Pill "Probaron" con tilde verde.
- SFX: `sparkle` suave al salir la cucharita.

### s07-despues (38 "No pudieron decidir" → "después")
- La cámara se aleja y orbita: los **24 frascos se despegan de la mesa y giran en anillo** alrededor de la cámara
  (mareo controlado); la cucharita va de un frasco al otro sin decidirse (3 saltos). "lo dejaron para después":
  la canasta se queda vacía y se desliza hacia afuera del cuadro; los frascos vuelven a su lugar.
- Rótulo chico (opcional, de fuentes.md): "Sobre todo si no sabés qué querés" (mono 30 px, navy al 70 %).
- SFX: `click-soft` en cada salto de la cucharita, `whoosh-short` en la órbita, `glitch-1` muy bajo en "después".

### s08-whatsapp (46 "Pensá en tu catálogo" → "sueltas")
- El anillo de frascos se cierra hacia un punto y de ahí crece **el celular** (vertical, grande, 70 % del alto).
  Pantalla: un chat genérico navy/crema (sin logo ni verde de la app) con una **grilla de miniaturas** que no para
  de subir (fotos = tarjetitas de colores planos con un objeto simple). Contador 3D o HTML "200" en rojo apagado
  que sube de 0 a 200 en "doscientas".
- Rótulo: pill "Tu catálogo" con línea guía al celular.
- SFX: `notification` en ráfaga (cada vez más rápido), `typing` bajo.

### s09-mesa24 (55 "Es la mesa de veinticuatro")
- CALLBACK: el celular se acuesta (rota a horizontal, cámara a 3/4 desde arriba como en s01) y las miniaturas se
  levantan de la pantalla como **frascos**: el celular ES la mesa de 24 (mismo encuadre que el cuadro 0).
  3D "24" arriba en rojo apagado.
- SFX: `whoosh` al acostarse, `pop` escalonado al levantarse los frascos.

### s10-tienda (60 "En Scalerics armamos tu tienda online" → "categorías")
- Golpe 1 ("tu tienda online"): los frascos se ordenan solos (se juntan, se van los que sobran) y el celular vuelve
  a vertical con **la tienda**: cabecera crema "Tu tienda", fila "Los más pedidos" con 3 frascos grandes.
- Golpe 2 ("lo más pedido primero, pocas categorías"): recuadro verde de selección sobre "Los más pedidos";
  en "categorías" entran 3 pills grandes (Mermeladas · Dulces · Regalos) con tilde. Interfaz de 28 px para arriba.
- SFX: `whoosh` en el orden, `sparkle`, `click` en cada pill.

### s11-paga (72 "El cliente elige, y paga")
- Un cursor/dedo toca un frasco de "Los más pedidos" (tilde verde "Elige") → botón "Pagar" verde → tilde "Paga".
  El frasco sale de la pantalla y cae en la **canasta verde** (el mismo objeto de s05, ahora llena de una).
- SFX: `click` en elige, `ping` en paga, `pop` al caer.

### s12-negocio (77 "¿Querés ver cómo quedaría en tu negocio?")
- La cámara se aleja: el celular queda en la mano/mostrador de **un local genérico** (fachada low-poly crema con
  toldo verde, cartel "Tu negocio"), la tarjeta "Pedido nuevo" vuela del celular al local y el local se prende.
- SFX: `whoosh-short`, `chime` al prenderse.

### s13-cta (86 "videollamada" → fin, 2,6-2,9 s)
- Tarjeta de cierre de marca: fondo verde `#5ce611` liso con objetos navy, o crema con verde (el fondo verde vale
  para el cierre según punto 7). El celular gira a horizontal y es la videollamada (como por-que-la-tarjeta).
  Texto grande: "Videollamada gratis" (Lexend 900 ~120 px navy) y "scalerics.com" (verde o navy según fondo,
  grande). Logo de Scalerics abajo. Arranca exactamente sobre "videollamada".
- SFX: `whoosh-cinematic` de entrada, `chime` en "scalerics.com". Cola 0,3 s y fundido de audio 0,35 s.

## Portada
- Fondo: cuadro limpio de s01 (mesa de 24 a pantalla llena) renderizado sin gancho ni subtítulos.
- `chica`: "24 mermeladas." · `grande`: "Vendieron menos" · `sello`: "¿Por qué?". Acento y sello en verde
  `#5ce611`; "menos" puede ir en rojo apagado. Todo entre y 285 y 1635.
