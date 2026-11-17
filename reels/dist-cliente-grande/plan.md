# dist-cliente-grande · plan plano por plano · DISTRIBUIDORAS, dolor + solución (3D real), ~36,4 s

**De qué trata.** Noviembre, la oficina vidriada de Rubén arriba del depósito, de tarde. El contador por el altavoz:
**"Rubén, ¿y Héctor?"** / Rubén, recostado con el mate: **"¿Héctor? Compra todos los martes."** / el contador:
**"Compraba."** La cámara se zambulle por el vidrio a la zona de armado: el lugar "HÉCTOR · MARTES" sin pallet desde
agosto, convertido en el rincón del operario (reposera, radio, termo, una planta crecida). $ 38.000 por semana, 12
martes sin pedir: **$ 456.000**. Nico, asomado: **"Yo pensé que lo llamabas vos."** Corte a la vereda del Súper Héctor:
un camión gris sin nombre descargando. Héctor, contento: **"¡Rubén! ¿Cerraste? Dejé de pedir y nadie me llamó."** Pausa.
Rubén: **"Te extrañó el contador."** Remate del remate: Héctor: **"Llamame el martes."**; Nico lo anota en un post-it,
lo pega en el tablero y el post-it se vuela por la ventanilla y se pega en el camión gris. Cartel **"Un aviso automático
más tarde…"**. Parte 2 (la mitad del reel): miércoles 8:10, el celular de Nico avisa solo: **"Súper Héctor no pidió
ayer · compra cada 7 días"**; Nico llama: **"¡Héctor! Ayer no pediste. ¿Todo bien?"** / **"¡Uh, se me pasó! Mandame lo
de los martes."** · "Pedido ✓ · $ 38.000". El pallet HÉCTOR se llena y el operario levanta su reposera. En el panel:
"Dejaron de pedir esta semana: 4 → 0 · $ 61.000 que no se fueron". El contador, otra vez: "Rubén, ¿y Héctor?" / "¿Héctor?
Compra todos los martes." / **"Compra."** Cierre: Rubén a cámara: **"Comentá CLIENTES y te mando cómo funciona para tu
distribuidora."**

- **Producto: CRM para distribuidoras.** La **ficha de cada cliente** (comercio, dueño, vendedor, qué compra, cuánto,
  **cada cuánto**: "compra cada 7 días · los martes", y la tira de las últimas semanas); el **aviso automático** cuando
  un cliente que compra seguido no pidió en su día ("Súper Héctor no pidió ayer"), que le llega **al celular del
  vendedor** con el botón "Llamar"; y el **panel de clientes que dejaron de pedir** (quién, cuánto compraba, si ya lo
  llamaron, si volvió a pedir). Se ve funcionando en la parte 2 y se nombra en la línea chica final y en
  `descripcion.txt`. El cartel nunca dice "Scalerics" ni "CRM" (se oye raro en la voz y suena a aviso).
- **Sin marcas:** chat y llamada genéricos (sin el verde ni el logo de ninguna app), celulares y monitor sin logo,
  planilla de facturación genérica (grilla crema con encabezado navy, sin ícono de ningún programa), productos sin marca
  (aceite en caja kraft con la botella dibujada, "HARINA 000", agua en pack crema liso). **El camión de la otra
  distribuidora es gris claro y liso, sin nombre ni logo** (como el gris de `corralon-portland`), y nadie la nombra.
  "Súper Héctor", "Distribuidora Rubén", "Panadería Nelly", "Rotisería Fede", "Kiosco Beto": inventados.
- **Sin datos de afuera** (ver `fuentes.md`): los montos y fechas son del caso.
- **Estructura** (la de `dist-pedidos-lunes`): parte 1 **16,4 s** (dolor) + cartel **2,4 s** + parte 2 **13,9 s**
  (solución) + cierre **3,7 s** (Rubén a cámara + tarjeta CLIENTES). Solución + cierre = 17,6 s de 36,4 s (48 %). Un
  proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`, como dist-pedidos-lunes.
- **Cartel:** el time card de siempre: **"Un aviso automático" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si queda
  larga (> 2,4 s), se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice
  "Un sistema" / "más tarde…".
- **Quién dice "Comentá CLIENTES": Rubén**, a cámara, como en dist-pedidos-lunes (en la distribuidora el que habla con
  el que mira es Rubén: "te mando" en singular, de dueño a dueño; Sofi queda para los rubros sin Rubén). Llega natural:
  acaba de oír "Compra.", toma mate y gira a cámara.
- **Sin línea chica de "para mandar" aparte:** la tarjeta CLIENTES lleva abajo, chico, "CRM: la ficha de cada cliente y
  el aviso cuando deja de pedir" / "scalerics.com". Sin tarjeta de videollamada en el video (va en `descripcion.txt`).

## Paleta y set (para "Hechos")
**Dos sets. (1) La oficina vidriada de Rubén DE TARDE (sol bajo y cálido que entra lateral y deja el escritorio en
crema cálido, la pared crema `#efeee5` con zócalo navy3 `#1f3254`), distinta de la de mañana con persiana de
dist-pedidos-lunes y de la de noche con lámpara de la-lista: acá el protagonista del set es el teléfono de escritorio en
altavoz y el monitor de la facturación. (2) NUEVO: la vereda del "Súper Héctor", un autoservicio de barrio de
Montevideo, a media mañana: fachada navy3 con el cartel crema "SÚPER HÉCTOR · AUTOSERVICIO" (Lexend 800 navy), toldo
verde apagado `#365f28` liso, doble puerta de vidrio con la persiana arriba, cajones de fruta y una pila de canastos
crema en la vereda, baldosas de vereda gris claro `#cfccc0` con la cuadrícula de 9 panes (lo montevideano), cordón y
calle de asfalto gris plano. Y la zona de armado del depósito con los carteles kraft por cliente, nueva como lugar
(dist-pedidos-lunes solo vio el pallet WALTER).** Anotar en "Hechos": "oficina de tarde con sol lateral cálido, pared
crema y teléfono en altavoz; zona de armado con carteles kraft por cliente y el rincón del operario; vereda del Súper
Héctor con toldo verde apagado y baldosas de 9 panes; camión gris liso ajeno; parte 2 con interfaz recreada (aviso en el
celular, ficha con tira de martes, panel de clientes que dejaron de pedir)".
- **Rojo apagado `#c7655b` SOLO para el problema:** los ceros de SET/OCT/NOV en la fila de Héctor, "12 martes sin pedir
  · $ 456.000", el hueco de la tira de martes en la ficha (antes de llenarse), el chip "No pidió ayer" del aviso, el
  "4" de "Sin pedir: 4" antes de girar. **Verde `#5ce611` para lo resuelto:** "Llamar", "Pedido ✓ · $ 38.000 · Sale
  hoy", "Último pedido: hoy ✓", las tildes del panel, "Sin pedir: 0", "$ 61.000 que no se fueron", la tarjeta CLIENTES,
  el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. **La del contador sale del teléfono de escritorio** (cola al parlante, una etiqueta chica "Contador ·
  altavoz" con un íconito de parlante dibujado, no un avatar con cara). En la parte 2, las tres burbujas del callback
  ("Rubén, ¿y Héctor?", "¿Héctor? Compra todos los martes.") en el MISMO lugar y tamaño que en la parte 1, para que se lea
  el callback; "Compra." en la misma burbuja que "Compraba." (mismo lugar, mismo tamaño, una sílaba menos).
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "DISTRIBUIDORAS" en el cuadro 0):
  "Noviembre." en P1, "Miércoles, 8:10." en Q1.
- Texto en pantalla: navy sobre crema, crema sobre navy. Nada de blanco ni crema sobre la vereda gris claro sin caja.

## Personajes (copia local de `reels/dist-pedidos-lunes/assets/personajes.js`, que ya tiene a todos)
- **Rubén = ELENCO.ruben** (NO `almacenero`): camisa navy3 manga larga arremangada, cuello crema, bigote, panza. En la
  oficina, sentado y recostado con el mate (P1), que gira la cabeza hacia la puerta (P3) y se inclina hacia el teléfono
  (Q4); en la vereda, parado, con las manos en los bolsillos (P4-P7). Voz Algenib. Expresión: `neutra` relajada en P1,
  `incredula` en el "Compraba." (la bombilla quieta a medio camino), `fastidio` leve en P3, cara de nada en el remate
  (P6, `neutra` con los ojos un poco entrecerrados), `sonrisa` contenida en Q4 y en el cierre.
- **Nico = ELENCO.empleado** con el maletín de muestras navy (de ya-lo-cargo, `crearMochila`) y el celular. P3: asomado a
  la puerta de vidrio de la oficina; P4-P7: maneja el auto (el de ya-lo-cargo, `crearAuto`, limpio y sin globos), se baja
  con Rubén; P7: escribe el post-it apoyado en el capot y lo pega en el tablero. Q1: en el auto, el celular en el soporte
  del tablero. Voz Fenrir.
- **Héctor = ELENCO.hector**, acá **dueño del Súper Héctor** (cliente de la distribuidora, ~70): la misma cara, boina
  navy, lentes finos y chaleco mostaza de me-haces-precio, y encima **un guardapolvo de trabajo crema abierto** (si el
  módulo no tiene guardapolvo, `campera: { color: MARCA.cr, cuello: MARCA.cr2, abierta: true }` larga) para que se lea
  "dueño del súper", no "jubilado que pasea". Contento y cordial todo el reel: él no está enojado, nadie lo llamó. En P4
  sale por la puerta con los brazos abiertos; en P7 entra con una caja de la zorra ajena en brazos. En Q2, en la puerta
  del súper con el celular en la oreja. Voz Sadaltager.
- **El contador** (sin cuerpo, solo voz por el altavoz del teléfono de escritorio): seco, prolijo, de pocas palabras.
  Voz **Algieba** (no la usó ningún personaje del repo; ver `fuentes.md`). En la pantallita del teléfono: "CONTADOR".
- **Darío, el operario** (extra sin voz, el de dist-pedidos-lunes: chaleco/camisa navy3 con cuello verde, gorra navy,
  bigote): en P2 sentado en SU reposera en el lugar de Héctor, la radio al lado; en Q3 la pliega y se va con la radio y la
  planta, resignado. Que no parezca vago: es su descanso del mediodía (en P2 tiene el táper y el termo; el reloj del
  depósito no se ve: no hace falta).
- **El chofer del camión gris** (extra sin voz, DEFECTO con gorra gris y camisa gris lisa, sin logo): baja cajas con su
  zorra en P4-P5, de espaldas o de 3/4, nunca protagonista.
- **Avatares chicos** en el panel de Q4: Nelly (panadería), Fede (rotisería), Beto (kiosco): las caras del módulo con
  `crearPersonaje` genérico, en círculos; Héctor con su cara de ELENCO.

## Objetos 3D: qué se reusa y qué es nuevo
**Reusados** (de `reels/dist-pedidos-lunes`, `reels/dice-cuarenta`, `reels/ya-lo-cargo`, `reels/corralon-portland`):
- Oficina vidriada (escritorio de madera clara, monitor con pantalla canvas `dibujarMonitor`, **teléfono de escritorio**
  de la-lista con su altavoz, mate y termo, pila de remitos), el ventanal al depósito.
- Depósito: `crearRack`, `crearPallet`, `crearPalletLleno`, `crearCajaAceite`, `crearBolsaHarina`, la zorra, el
  operario Darío.
- `crearAuto` (el auto de Nico de ya-lo-cargo, sin globos), `crearMochila` (maletín de muestras), `crearCelular`
  (pantalla canvas), `crearMate`, `crearTermo`.
- `crearCamion(color, conNombre)` de corralon-portland **en gris `0xb9bcc2` y `conNombre = false`**, con la caja
  cerrada (furgón) en vez de la plataforma de bolsas: puertas traseras que se abren y cierran (el portazo de P5), una
  rampa y cajas kraft adentro.
- Cartel time card (ya-lo-cargo / dice-cuarenta / dist-pedidos-lunes).

**Nuevos** (específicos, que nadie los confunda):
- **La zona de armado por cliente (P2, Q3):** sobre el piso del depósito, rectángulos pintados crema (líneas de 8 cm)
  del tamaño de un pallet, uno por cliente, y arriba de cada uno, **colgado de dos cadenitas desde el rack, un cartel
  kraft `0xc9a774` con letras navy** (Lexend 800, que se lean en el plano): "GRACIELA · LUNES", "MARTA · LUNES",
  "WALTER · JUEVES" (cada uno con su pallet lleno o a medio armar) y **"HÉCTOR · MARTES"**. Debajo de HÉCTOR, en P2, sin
  pallet: el rincón del operario.
- **El rincón del operario (P2) · el "pasaron tres meses" sin reloj ni almanaque:** una **reposera** plegable de caño
  navy con la lona a rayas crema y verde apagado; una **radio portátil** navy con antena y dial crema; el **termo** y un
  táper apoyados en un cajón de plástico crema dado vuelta; una **planta en una lata de aceite vieja** que ya creció y
  cuelga por el borde (hojas verde apagado, NUNCA verde de marca: el verde de marca es lo resuelto); y un almohadón. Todo
  bien acomodado: alguien se instaló ahí hace rato. En Q3 se desarma (la reposera se pliega en 3 tiempos, la radio bajo
  el brazo, la planta en la otra mano).
- **La vereda del Súper Héctor (P4-P7, Q2):** fachada de autoservicio de barrio (dos paños de vidrio con la doble
  puerta al medio, persiana de enrollar arriba, cartel crema "SÚPER HÉCTOR · AUTOSERVICIO", toldo verde apagado liso),
  **baldosas de 9 panes** gris claro (textura con relieve leve por normal map o líneas planas: que no haga moiré en
  Instagram; si moirea, líneas más gruesas y menos), cordón, calle; en la vereda, dos **cajones de fruta** (naranjas y
  manzanas de color plano), una **pila de canastos** crema de plástico, un árbol de vereda (tronco + copa low-poly) para
  que no sea un decorado plano. Nunca la palabra "almacén" ni mostrador de barrio a la vista: es un súper (adentro, por
  el vidrio, góndolas navy3 con productos de colores planos).
- **El post-it (P7):** cuadrado de 7,5 cm, **amarillo pálido no**: crema `#f4ecc6` (dentro de la paleta) con la letra de
  Nico en Caveat navy "HÉCTOR · MARTES" (textura canvas, que se lea en el inserto); se pega en el tablero con un pop; al
  arrancar, se despega de una punta (aleteo con rotación como función del tiempo), sale por la ventanilla del acompañante
  dando vueltas y **se pega en la puerta trasera del camión gris** (que la cámara la tenga en cuadro: el último cuadro de
  la parte 1 es el post-it pegado en el gris, con el camión que también arranca).
- **El teléfono de escritorio en altavoz (P1, Q4):** el de la-lista, con una **pantallita crema que dice "CONTADOR"** y
  un led verde de altavoz que titila cuando el contador habla (función del tiempo, de las palabras de `tiempos3d.js`).
- **El soporte del celular en el tablero del auto de Nico (Q1)**, donde en P7 estaba el post-it.

## Interfaz recreada (canvas en las pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**El monitor de Rubén, parte 1 (P1): "Facturación por cliente"** (grilla crema, encabezado navy). Columnas: Cliente ·
AGO · SET · OCT · NOV. Filas: "Rotisería Graciela · $ 62.400 · $ 60.900 · $ 63.100 · $ 31.200" · "Cafetería Marta ·
…" (montos chicos, que no compitan) y **la fila de Héctor, más alta y en negrita: "Súper Héctor · $ 114.000 · $ 0 · $ 0
· $ 0"** con los tres ceros en rojo apagado. En P1 la cámara no entra al monitor (se lee en el plano medio: la fila de
Héctor grande); los rótulos de la plata van en P2.
**Rótulos de P2 (capa HTML, caja navy, texto crema, línea guía al cartel "HÉCTOR · MARTES" y al rincón):**
"Súper Héctor: $ 38.000 por semana" · "Último pedido: martes 18 de agosto" · **"12 martes sin pedir · $ 456.000"** (rojo
apagado, el más grande, último en entrar).
**El celular de Nico, parte 2 (Q1, el aviso):** encabezado navy "Distribuidora Rubén · Clientes". Tarjeta de aviso:
avatar de Héctor + **"Súper Héctor"** · chip rojo apagado **"No pidió ayer"** · "Compra cada 7 días · los martes" ·
"Último pedido: hace 8 días" · "$ 38.000 por semana" · "Vendedor: Nico" · botón verde ancho **"Llamar"**. Al tocarlo:
"Llamando a Héctor…" (Q1-Q2) y después, en Q2, **"Pedido ✓ · Súper Héctor · $ 38.000 · Sale hoy"** en verde. Rótulo
HTML en Q1: "Aviso automático: dejó de pedir".
**El monitor de Rubén, parte 2 (Q3, la ficha):** "Clientes · Súper Héctor" · avatar · "Héctor · dueño" · "Compra cada
7 días · los martes" · "Promedio: $ 38.000" · "Vendedor: Nico" · **la tira de martes:** 8 cuadraditos de las últimas
semanas, 7 verdes y el último **hueco rojo apagado que se llena de verde** con un pop · **"Último pedido: hoy ✓"**.
Rótulo HTML: "La ficha de cada cliente: cada cuánto compra".
**El monitor de Rubén, parte 2 (Q4, el panel): "Dejaron de pedir esta semana"** (encabezado navy): "Súper Héctor ·
$ 38.000 · Llamado ✓ · Pidió ✓" · "Panadería Nelly · $ 9.500 · Llamado ✓ · Pidió ✓" · "Rotisería Fede · $ 7.200 ·
Llamado ✓ · Pidió ✓" · "Kiosco Beto · $ 6.300 · Llamado ✓ · Pidió ✓" (las tildes se prenden de a una) · contador
grande **"Sin pedir: 4 → 0"** (el 4 rojo apagado gira y queda el 0 verde) · **"$ 61.000 que no se fueron"** en verde
(38.000 + 9.500 + 7.200 + 6.300).
**Tarjeta de cierre (HTML, ~3,7 s, sobre Rubén a cámara):** abajo de la cara (nunca encima), en el 80 % seguro:
"Comentá" (Lexend 800 crema, ~90 px) / **"CLIENTES"** (Lexend 900 ~160 px, navy en el recuadro verde de selección; que
entre en el ancho seguro) / "y te mando cómo funciona para tu distribuidora" (Lexend 600 crema ~46 px, 2 líneas) /
"CRM: la ficha de cada cliente y el aviso cuando deja de pedir" (~38 px, crema) / **"scalerics.com"** en verde (~44
px). Entra sobre "CLIENTES" de la voz.

## PARTE 1 · el problema (0,00-16,40 s)

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-4,50 | **P1 · cuadro 0.** Plano medio de Rubén recostado en su silla, de 3/4, el mate en la mano; en primer término, a la derecha, el teléfono de escritorio con la pantallita "CONTADOR" y el led verde; a la izquierda, el monitor con la fila de Héctor; atrás, el ventanal al depósito. Push-in lento al teléfono y a Rubén. | **Cuadro 0:** arriba, **"DISTRIBUIDORAS"** (Lexend 900 ~130 px, crema con borde navy, ya entero) y el chip "Noviembre."; la burbuja del contador ya asomando. 0,20-1,35 · **Contador: "Rubén, ¿y Héctor?"** 1,50-3,40 · **Rubén: "¿Héctor? Compra todos los martes."** (relajado, ceba). 3,40-3,80 · pausa chica. 3,85-4,45 · **Contador: "Compraba."** La bombilla de Rubén se frena a medio camino de la boca; Rubén gira los ojos al monitor: la fila de Héctor, los ceros rojos. | oficina de tarde, Rubén, teléfono en altavoz, monitor, mate, termo, ventanal | ambiente de oficina (el depósito de fondo, muy bajo) · el contador con filtro de altavoz · sorbo de mate 1,6 (`sorbo.wav`) · el sorbo que se corta en seco 4,45 |
| 4,50-7,20 | **P2 · el lugar de Héctor.** La cámara sale por el vidrio y baja como grúa a la zona de armado (whoosh): pasa por los carteles kraft "GRACIELA · LUNES", "MARTA · LUNES", "WALTER · JUEVES" con sus pallets y frena en **"HÉCTOR · MARTES"**: sin pallet, el rincón del operario llenando el cuadro. Push-in. | 5,00 · Darío en la reposera, el táper en la falda, la radio sonando bajito; levanta el mate y saluda a cámara, contento (no sabe nada). 5,30 · rótulo "Súper Héctor: $ 38.000 por semana" · 5,80 · "Último pedido: martes 18 de agosto" · 6,30 · **"12 martes sin pedir · $ 456.000"** (rojo apagado). | zona de armado, carteles kraft, pallets, reposera, radio, termo, táper, planta en lata, Darío | whoosh 4,50 · radio lejana (música de la cama filtrada como radio portátil, sin marca) · pop por rótulo · tic de contador en el $ 456.000 |
| 7,20-9,20 | **P3 · "Pensé que lo llamabas vos".** La grúa vuelve a subir a la oficina, esta vez de frente a la puerta de vidrio: Nico asomado con el maletín y el celular, Rubén de espaldas/3/4 en primer término. | 7,30-8,85 · **Nico: "Yo pensé que lo llamabas vos."** (sincero, señalando a Rubén con el celular). 8,85-9,20 · Rubén gira la cabeza despacio hacia Nico; Nico baja el celular. | oficina, puerta de vidrio, Nico, maletín, Rubén | whoosh-short 7,20 · picaporte (`k-metal-click`) 7,25 |
| 9,20-12,80 | **P4 · el golpe.** Corte (whoosh) a la vereda del Súper Héctor, plano general desde la calle: el camión gris estacionado con las puertas traseras abiertas, el chofer bajando cajas con la zorra; el auto de Nico entra a cuadro y estaciona detrás; Rubén y Nico se bajan. Héctor sale por la doble puerta con los brazos abiertos. Push-in a Héctor y Rubén. | 9,30 · auto que entra y frena · 9,50 portazo de auto. 9,60-12,60 · **Héctor: "¡Rubén! ¿Cerraste? Dejé de pedir y nadie me llamó."** (contento, de verdad, le palmea el hombro). Rubén con las manos en los bolsillos. | vereda, fachada, toldo, cajones de fruta, canastos, baldosas de 9 panes, árbol, camión gris, chofer, zorra, auto de Nico, Héctor, Rubén, Nico | `auto-entra.wav` 9,30 · `puerta-auto.wav` 9,50 · calle de fondo (`calle.wav` bajo) · zorra (rueditas en baldosa) |
| 12,80-13,40 | **P5 · la pausa.** Plano desde atrás de Héctor: Rubén de frente mirando más allá, al camión gris; en primer término desenfocado, la caja que entra al súper en la zorra ajena. | Silencio de vereda: la música baja a -12 dB en 0,4 s (no se corta). 13,10 · el chofer cierra las puertas del camión: portazo metálico. Rubén vuelve los ojos a Héctor. | Rubén, camión gris, chofer, zorra | portazo de caja de camión (`k-chapa-pesada` / `k-metal-pesado-0`) 13,10 |
| 13,40-14,70 | **P6 · el remate.** Primer plano de Rubén, frontal, el toldo verde apagado y el cartel del súper desenfocados atrás. | 13,45-14,65 · **Rubén: "Te extrañó el contador."** (seco, grave, sin sonrisa). | Rubén | · (la cama baja, nada encima de la línea) |
| 14,70-16,40 | **P7 · remate del remate.** Plano medio: Héctor ya entrando con una caja en brazos, de la zorra ajena; Nico apoyado en el capot con el post-it. Después, plano del auto desde la vereda: arranca, el post-it vuela por la ventanilla y se pega en la puerta del camión gris, que también arranca. | 14,75-15,55 · **Héctor: "Llamame el martes."** (por encima del hombro, amable). 15,55 · Nico, pulgar arriba, escribe "HÉCTOR · MARTES" en el post-it (inserto corto, que se lea) y lo pega en el tablero: pop. 15,85 · el auto arranca; 16,00 el post-it se despega y sale volando; 16,25 se pega en el camión gris. 16,30 · stinger. | Héctor, caja, Nico, post-it, auto, camión gris | pop 15,70 · motor (`motor.mp3`, corto) 15,85 · aleteo de papel (`k-page-turn` / `papel.wav`) 16,00 · pop seco del post-it en la chapa 16,25 · stinger 16,30 |

Último cuadro (16,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,40-18,80 s)
Time card de dibujito de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan, -4°:
**"Un aviso automático"** (línea a, ~120 px: que entre en el 80 % seguro) / **"más tarde…"** (línea b, 146 px). Voz
Rasalgethi nueva ("Un aviso automático más tarde."); fallback: la toma de ya-lo-cargo y el cartel "Un sistema" / "más
tarde…". Nunca "Scalerics". 2,4 s.

## PARTE 2 · la solución (18,80-32,70 s) · otra semana

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,80-23,10 | **Q1 · el aviso.** Chip "Miércoles, 8:10." Plano desde el asiento del acompañante del auto de Nico, detenido en un semáforo (el mismo auto: callback del post-it): **el tablero sin post-it**, el celular en el soporte que vibra. Push-in al celular hasta inserto (≥ 60 %). | 19,00 · llega el aviso: **"Súper Héctor · No pidió ayer · Compra cada 7 días · los martes · Último pedido: hace 8 días · $ 38.000 por semana"** y el botón verde **"Llamar"**. Rótulo "Aviso automático: dejó de pedir". 20,40 · Nico toca "Llamar" → "Llamando a Héctor…". 20,90-22,90 · **Nico: "¡Héctor! Ayer no pediste. ¿Todo bien?"** (cálido, celular en altavoz). | auto de Nico, tablero, soporte, celular, Nico | vibra 19,00 · notification 19,05 · click-soft 20,40 · tono de llamada corto (`k-tono`) 20,50 |
| 23,10-26,10 | **Q2 · Héctor atiende.** La vereda del Súper Héctor (el mismo encuadre de P4, sin camión gris: callback), Héctor en la puerta con el celular en la oreja, un cajón de naranjas recién acomodado. Inserto del celular de Nico al final. | 23,20-25,60 · **Héctor: "¡Uh, se me pasó! Mandame lo de los martes."** (se ríe de sí mismo, palmada en la frente). 25,70 · inserto: **"Pedido ✓ · Súper Héctor · $ 38.000 · Sale hoy"** en verde. | vereda, fachada, toldo, cajones, Héctor, celular | calle de fondo · ding (`cero.mp3`) 25,70 |
| 26,10-28,60 | **Q3 · el pallet vuelve.** La zona de armado, el mismo encuadre de P2: debajo de "HÉCTOR · MARTES" el operario pliega la reposera (3 tiempos) y se va con la radio bajo el brazo y la planta en la mano; detrás de él entra el pallet de Héctor con la zorra y se llena con pop por capa (aceite, harina, agua). La grúa sube por el ventanal al monitor de Rubén (inserto ≥ 60 %): la ficha de Héctor, la tira de martes, el hueco rojo se llena de verde, **"Último pedido: hoy ✓"**. Rótulo "La ficha de cada cliente: cada cuánto compra". | 26,20 · la reposera se pliega (clac, clac, clac). 26,80 · pallet entra; capas 27,00 / 27,20 / 27,40. 27,70 · grúa al monitor. 28,20 · el hueco de la tira pasa a verde. | zona de armado, reposera, radio, planta, Darío, pallet, cajas, bolsas, zorra, monitor | `k-metal-click` ×3 (la reposera) · pop por capa · whoosh-short 27,70 · ding 28,20 |
| 28,60-32,70 | **Q4 · "Compra."** La oficina, **el mismo encuadre del cuadro 0** (Rubén recostado con el mate, el teléfono en altavoz en primer término, el monitor con el panel "Dejaron de pedir esta semana" a la izquierda, que se lee). | 28,70 · las tildes del panel se prenden de a una; "Sin pedir: 4 → 0"; "$ 61.000 que no se fueron" sube. 28,70-29,85 · **Contador: "Rubén, ¿y Héctor?"** (el mismo audio). 30,00-31,90 · **Rubén: "¿Héctor? Compra todos los martes."** (el mismo audio; ahora con el mate, tranquilo de verdad, y la ficha de Héctor en verde detrás). 32,05-32,55 · **Contador: "Compra."** · tilde verde grande en la fila de Héctor. | oficina, Rubén, teléfono, monitor con el panel, mate | ding suave por tilde (escalonados) · tic de contador · sorbo de mate entero 31,95 |

## CIERRE (32,70-36,40 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 32,70-36,40 | **C · Rubén a cámara.** Primer plano de Rubén de frente, el mate en la mano, el monitor con el panel en verde desenfocado detrás (nunca pared lisa). Push-in suave. | 32,90-36,00 · **Rubén: "Comentá CLIENTES y te mando cómo funciona para tu distribuidora."** (de colega, media sonrisa, tranquilo). 33,30 · sobre "CLIENTES" entra la tarjeta abajo de la cara; en los últimos 0,8 s, la línea chica "CRM: la ficha de cada cliente y el aviso cuando deja de pedir" / "scalerics.com". | pop en "CLIENTES" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "DISTRIBUIDORAS" entero y legible desde el primer cuadro, sin tapar la cara de Rubén ni el teléfono; la
  burbuja "Rubén, ¿y Héctor?" asomando; la fila "Súper Héctor" con los ceros rojos legible en el plano medio.
- **Se entiende sin sonido:** las 11 líneas en burbujas; la del contador sale del teléfono (cola al parlante, etiqueta
  "Contador · altavoz"); "Compraba." y "Compra." en la misma burbuja y lugar; la plata en los rótulos de P2.
- **El rincón del operario:** se tiene que leer en 1 s que ahí "debería" haber un pallet (el cartel HÉCTOR · MARTES,
  las líneas crema del piso, los pallets llenos de al lado) y que alguien se instaló hace mucho (planta crecida). Darío
  no queda como vago: está en su descanso, contento.
- **El camión gris:** liso, sin texto ni logo, sin colores que recuerden a ninguna empresa real; en Q2 no está.
- **El post-it:** que se lea "HÉCTOR · MARTES" en el inserto; que vuele (no que desaparezca entre cuadros); que quede
  pegado en el camión en el último cuadro antes del cartel; que no atraviese el parabrisas ni el marco de la ventanilla.
- **Héctor** con boina, lentes y chaleco de ELENCO.hector + guardapolvo crema: que se lea dueño de súper. Ojos abiertos
  cuando habla; la mano del celular no le atraviesa la boina ni la cara en Q2.
- **Continuidad:** el auto de Nico limpio (sin globos) en P4, P7 y Q1; en Q1 el soporte en el lugar donde estaba el
  post-it; la vereda igual en P4 y Q2 (menos el camión); el encuadre de P1 y Q4 igual (el callback se ve).
- **La solución ocupa la mitad:** medir en el render que el cartel arranque antes de los 16,6 s y que parte 2 + cierre
  duren ≥ 17 s. Si hay que recortar, se recorta P2 (la grúa) o P3, nunca la parte 2.
- **SFX que no están en assets/sfx** (reposera que se pliega, si `k-metal-click` no alcanza; aleteo de papel): reales
  con licencia CC0, con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados con ffmpeg.

## Voces (partes/*.txt; recortar con silenceremove, finales en assets/voice/)
| archivo | quién | voz | tono | proceso |
|---|---|---|---|---|
| 01-contador.txt · "Rubén, ¿y Héctor?" | Contador | Algieba | Contador de estudio, 50 años, prolijo y seco, hablando por teléfono mientras mira una planilla: pregunta de rutina, sin alarma, "¿y Héctor?" con curiosidad profesional. ~1,1 s. | **Filtro de altavoz** (highpass 300, lowpass 3400, compresión leve). Se reusa igual en Q4. |
| 02-ruben.txt · "¿Héctor? Compra todos los martes." | Rubén | Algenib | Dueño de distribuidora de 55 años, grave, recostado con el mate, seguro y despreocupado: "¿Héctor?" como "¿qué tiene Héctor?", y "compra todos los martes" como una verdad de toda la vida. ~1,9 s. | Sin filtro. Se reusa igual en Q4 (por eso: seguro, sin ironía). |
| 03-contador.txt · "Compraba." | Contador | Algieba | El mismo contador, seco, una sola palabra, después de una pausa, como quien corrige un número: sin maldad ni sorna, plano. ~0,6 s. | Filtro de altavoz. |
| 04-nico.txt · "Yo pensé que lo llamabas vos." | Nico | Fenrir | Vendedor de 25 años asomado a la puerta, sincero y un poco descolocado, como quien recién se da cuenta: sin excusarse, señalando. ~1,5 s. | Sin filtro. |
| 05-hector.txt · "¡Rubén! ¿Cerraste? Dejé de pedir y nadie me llamó." | Héctor | Sadaltager | Dueño de un súper de barrio de 70 años, contentísimo de ver a Rubén después de meses, cordial y sin reproche: "¿Cerraste?" preocupado de verdad, "nadie me llamó" como un dato, casi con cariño. ~3,0 s. | Sin filtro. Si el reproche se oye, regenerar: es alegría. |
| 06-ruben.txt · "Te extrañó el contador." | Rubén | Algenib | Rubén después de una pausa, mirando el camión ajeno: seco, grave, bajito, con mala leche contra sí mismo, sin sonrisa. Leve pausa antes de "el contador". ~1,2 s. | Sin filtro. Es EL remate: con la cama baja. Si suena triste o a sermón, regenerar. |
| 07-hector.txt · "Llamame el martes." | Héctor | Sadaltager | Héctor ya entrando con una caja, por encima del hombro, amable y sin darle importancia. ~0,8 s. | Sin filtro. |
| 08-narrador.txt · "Un aviso automático más tarde." | Narrador del cartel | Rasalgethi | Narrador caricaturesco de dibujito, exagerado y alegre, que estira "más taaarde". ~2,1 s. | Toma nueva; si pasa de 2,3 s, atempo 1.1. Fallback: ya-lo-cargo "Un sistema más tarde." |
| 09-nico.txt · "¡Héctor! Ayer no pediste. ¿Todo bien?" | Nico | Fenrir | Nico en el auto, por el altavoz del celular, cálido y liviano, como quien llama a un amigo: nada de vendedor insistente. ~1,9 s. | Sin filtro (está en cuadro). |
| 10-hector.txt · "¡Uh, se me pasó! Mandame lo de los martes." | Héctor | Sadaltager | Héctor al teléfono en la puerta del súper, riéndose de sí mismo, agradecido: "¡Uh!" de olvido, "mandame lo de los martes" de corrido. ~2,3 s. | **Filtro de teléfono suave** (se oye desde el celular de Nico) solo si el plano es del auto; en Q2 está en cuadro: sin filtro. |
| 11-contador.txt · "Compra." | Contador | Algieba | El mismo contador, una sílaba, satisfecho sin decirlo: el mismo tono plano de "Compraba." pero cerrando el tema. ~0,5 s. | Filtro de altavoz. |
| 12-ruben.txt · "Comentá CLIENTES y te mando cómo funciona para tu distribuidora." | Rubén | Algenib | Rubén a cámara, tranquilo, de dueño a dueño, media sonrisa: una invitación, no un aviso. ~3,1 s. | Sin filtro. |
