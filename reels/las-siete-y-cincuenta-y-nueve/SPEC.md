# las-siete-y-cincuenta-y-nueve · PARA MANDAR completo (3D real), ~30 s

**De qué trata.** Viernes, 19:59. Rubén cierra a las 20: ya tiene la campera puesta, el termo bajo el brazo y está
bajando la cortina. Llega Walter corriendo del trabajo con "una cosita nomás": un papelito que, al soltarlo, se
desenrolla hasta la calle. El reloj vuela (20:00, 20:07, 20:23), Walter da vuelta el papel y atrás sigue. Rubén mira
a cámara, se saca la campera y la cuelga: "Sacate la campera, Walter." Cartel: "Una tienda online más tarde…".
Parte 2: ese mismo viernes a las 16:12 Walter hizo el pedido desde el celular y lo pagó; Rubén armó la bolsa de
tarde con el mate. A las 19:59 Walter llega, recibe la bolsa por abajo de la cortina, arranca "Ah, y…" y Rubén ni lo
deja terminar: "Está en la bolsa, Walter." El pan flauta asoma. La cortina baja a las 20:00 en punto.

**Producto:** tienda online con pedido y pago antes, retiro en el local. Solo en la línea chica final y en
descripcion.txt. El cartel NUNCA dice "Scalerics".

**Recurso visual central:** la LISTA, un rollo de papel 3D que se desenrolla del mostrador a la calle (el objeto
que nadie confunde), y el RELOJ como contador del chiste (chip 3D pegado a cámara + reloj de pared real en el set).
La campera de Rubén, plantada desde el cuadro 0, es el remate.

**Base técnica:** copiar reels/abren-hoy (gen.mjs, assets/tres.js, assets/personajes.js, vendor three) para cada
parte, y reels/abren-hoy-completo (armar.mjs + compositions/cartel.html) para el cartel y la unión. Lo más simple:
UN proyecto con gen.mjs que arma parte 1 y parte 2 como dos renders (o un solo timeline con el cartel en el medio
como escena HTML que tapa el canvas), y `armar.mjs unir` como en abren-hoy-completo.

## Paleta y fondo
- Afuera: noche, navy oscuro `#0b1220` (cielo y fachada en navy, farol de calle cálido a la izquierda). Es el fondo
  de este reel en "Hechos".
- Adentro: luz cálida de lámpara sobre estantes llenos (como abren-hoy), piso damero crema/navy.
- Cortina metálica: gris crema `#d9d7c9`/`#b4b2a3` con ranuras marcadas en navy (bordes duros, nada de degradé fino).
- Campera de Rubén: navy claro `#1f3254` con cierre y puños verdes `#5ce611`. Campera de Walter: crema con cuello navy.
- Rojo apagado `#c7655b` solo para la hora "pasada" (20:07 en adelante en la parte 1). En la parte 2, 20:00 en verde.

## Personajes
- **Rubén** (ELENCO.almacenero, sin cambios de cara): encima, `campera` nueva (ver "Qué sumar"). Termo y mate de
  crearTermo()/crearMate(). Voz: Gemini Algenib.
- **Walter** (NUEVO, ELENCO.walter): ~40, oficinista que sale tarde del trabajo. Piel `PIEL.clara`, pelo castaño
  peinado "corto" con un mechón despeinado (jopo bajo), sin bigote, ojeras suaves; camisa crema con corbata navy
  floja, campera crema abierta con cuello navy, pantalón navy2, mochila navy3 con tira verde. Expresivo, simpático:
  sonrisa de "perdón" con cejas preocupadas (CARA.esperanza), nunca canchero. No habla (solo burbujas).

## Beats (segundos del VIDEO FINAL; los define T en gen.mjs)

### Parte 1 · el problema (0,0 a 14,4)
- **0,0 · Plano 1, general de la vereda, de noche** (cámara a 1,5 m, frontal levemente desde la izquierda, fov ~38).
  Fachada navy con letrero "ALMACÉN" (el de abren-hoy), la cortina metálica a 2/3 de bajada, luz cálida que se escapa
  por abajo, el farol. Rubén afuera, de costado, con la campera puesta y el termo bajo el brazo izquierdo, tira de la
  cortina con el gancho (varilla larga con punta en U). CARA.neutra con párpados a media asta (cansado, contento de irse).
  Arriba, el chip de hora 3D grande: "VIERNES · 19:59" (19:59 en verde, Lexend 800, ~140 px de alto en pantalla).
  Cuadro 0 = la escena entera y la hora: es la portada en movimiento.
  SFX: ambiente de calle de noche (bajo), ratchet de cortina que baja (0,1 a 1,1), música pizzicato liviana.
- **1,15 · Walter entra corriendo desde la izquierda** (paso rápido, mochila rebotando), frena y pone la mano en la
  cortina; la cortina se clava con un "clanc". 1,35 · burbuja de diálogo 3D (crema, letra navy, pico hacia él)
  "¡Pará, pará!" (pop). SFX: pasos rápidos, clanc metálico, pop.
- **2,0 · Plano 2, contraplano por encima del hombro de Walter, primer plano de Rubén** (fov ~32): Rubén lo mira,
  cejas arriba, mira la hora (baja los ojos al reloj de pulsera o al chip), resopla (respiración, sin palabra).
- **2,9 · Plano 3, primer plano de Walter, cámara baja desde adentro por debajo de la cortina** (fov ~34): sonrisa
  de perdón, cejas preocupadas, manos juntas. 3,1 · burbuja "¡Perdón! Es una cosita nomás." (pop; la anterior sube y
  se va). Walter muestra entre dos dedos un papelito doblado chiquito (cuadradito de 4 cm, blanco, se lee "lista").
- **4,1 · Plano 4, general interior, frente al mostrador** (fov ~38, cámara detrás de la caja): la cortina sube
  (ratchet hacia arriba, 4,1 a 4,6) y Walter entra; Rubén vuelve atrás del mostrador, campera puesta, apoya el termo.
  4,9 · Walter pone el papelito sobre el mostrador; Rubén lo mira y sonríe aliviado (CARA.sonrisa): "es poquito".
- **5,4 · pausa de 0,3 s.** 5,7 · Walter agarra una punta y la suelta: **la lista se desenrolla.**
- **5,7 · Plano 5, la lista (cámara continua, una sola curva):** arranca en primer plano del papel que cae del
  mostrador (se leen los primeros renglones manuscritos: "Yerba · Fideos moñita · 2 leches · Pan flauta…"), baja con
  el rollo hasta el piso de damero, el rollo rueda hacia la puerta (la cámara lo sigue a ras del piso, travelling),
  sale por debajo de la cortina, cruza la vereda, salta el cordón y sigue por la calle hasta perderse (6,9 a 7,3: la
  cámara se eleva y gira, grúa, y vemos el almacén chiquito con la tira blanca cruzando la calle). SFX: papel que se
  desenrolla (largo, que crece), un "tuc" del rollo al bajar el cordón, whoosh de la grúa.
  Ojo continuidad: el rollo siempre en cuadro y grande; nunca la calle vacía.
- **7,3 · Plano 6, general interior frontal: el montaje** (un solo plano, cámara con push-in lento; la hora corre):
  Rubén va y viene a los estantes (paso), cada vez que vuelve aparece un objeto en el mostrador con pop y squash:
  paquete de yerba (7,5), fideos (7,8), dos sachets de leche (8,1), pan flauta (8,4), maple de huevos (8,7), zapallo
  (9,0), rollos de papel higiénico (9,2). Walter lee la lista, que le cuelga hasta el piso, y tacha con lapicera.
  Burbujas de Walter que se apilan: "Ah, y…" (7,9) y "Ah, y…" (8,9). El chip de hora salta con un flip y un tic:
  20:00 (7,6, en verde todavía, campanita del reloj de pared), 20:07 (8,3, pasa a rojo apagado), 20:23 (9,1).
  El reloj de pared (arriba de los estantes, visible) gira el minutero rápido. Rubén con la campera, transpirado
  (gotita), CARA.fastidio suave, nunca enojado.
  SFX: pop por objeto (variar tono), tic de reloj en cada salto, campanita a las 20:00, pasos, tachón de lapicera.
- **9,6 · Plano 7, medio de Walter** (fov ~34): tacha el último renglón, sonríe, levanta la vista... y da vuelta el
  papel (9,95). **El dorso: "ATRÁS" subrayado arriba y la carilla entera llena.** Walter cejas arriba, sonrisa de
  perdón (no burla). 10,2 · la música se corta seca.
- **10,4 · Plano 8, Rubén de frente, mira a cámara, cara de nada** (CARA.resignado, párpados a media asta). Pausa
  0,6 s, solo ambiente. 10,9 a 11,3 · push-in rápido a la cara (whoosh).
- **11,3 · Rubén se saca la campera** (la toma de la solapa, se la saca por un hombro; corte a 11,8 con la campera
  ya en la mano y la cuelga en un perchero de pared detrás del mostrador). **11,6 · voz (Algenib): "Sacate la
  campera, Walter."** (con el suspiro antes; la boca sigue la envolvente). Subtítulo palabra por palabra, "Walter."
  en recuadro verde.
- **13,3 · remate del remate, general interior** (fov 38): chip a **20:41** con tuba; Walter, contento, se saca su
  campera y se sienta en un cajón de verduras dado vuelta; Rubén pone el termo y el mate sobre el mostrador
  (está para rato). 14,4 · fin de la parte 1 (sin línea chica).

### Cartel (14,4 a 17,6)
- Igual a compositions/cartel.html de abren-hoy-completo (fondo verde `#5ce611` con manchas y burbujas, letras Lexend
  900 crema con borde navy que rebotan, -4°), con el texto **"Una tienda online más tarde…"** en tres líneas
  ("Una tienda" / "online" / "más tarde…"). Entra con el último cuadro de la parte 1 girando 540°; sale con un iris al
  primer cuadro de la parte 2. Voz: Gemini Rasalgethi, caricaturesca, "Una tienda online más tarde." Stinger de
  vibráfono, whoosh del giro y del iris. Nunca dice "Scalerics".

### Parte 2 · lo mismo, resuelto (17,6 a 30,0)
- **17,6 · Plano A, el celular de Walter en grande** (llena 70 % del alto, en sus manos; atrás, desenfocado, su
  escritorio con una lámpara y una planilla de papel; sin logos). Chip de hora crema: "VIERNES · 16:12". Pantalla:
  tienda genérica "Almacén de Rubén" (navy y crema, sin colores de ninguna app). Los renglones de la MISMA lista se
  tildan en verde de a uno, rápido (yerba ✓ 17,9, fideos ✓, 2 leches ✓, pan flauta ✓, …, un scroll largo que hace
  callback al rollo de papel), 19,0 · botón "Pagar" → "Pagado ✓"; abajo "Retiro en el local · hasta las 20:00".
  SFX: taps (key-press), un ding de pago.
- **19,6 · Plano B, el mostrador de Rubén a la tarde** (luz de día cálida por la puerta, cortina arriba): el celular
  de Rubén vibra con el aviso "Pedido nuevo · Walter · Pagado ✓ · Retira hoy". Rubén, con el mate (sorbo, ojos
  cerrados), arma la bolsa sin apuro: los mismos objetos de la parte 1 vuelan a una bolsa de papel crema con manijas
  verdes (pops en cascada, 20,1 a 21,1); 21,2 · abrocha el ticket "WALTER · PAGADO ✓" (abrochadora: clac).
  Push-in suave a la bolsa. SFX: vibra, sorbo, pops, bolsa de papel, clac de abrochadora.
- **21,9 · Plano C, callback exacto del Plano 1**: misma vereda de noche, mismo encuadre, chip "VIERNES · 19:59",
  Rubén con la campera y el termo bajando la cortina. 22,4 · llega Walter caminando (no corriendo): el cambio se ve.
  Rubén, sin mirarlo, saca la bolsa de abajo de la cortina y se la da (22,8). 23,1 · burbuja de Walter "¡Gracias,
  Rubén!". 
- **23,5 · Walter ya se va, se frena y se da vuelta:** burbuja "Ah, y…" (23,7; callback). Plano D, primer plano de
  Rubén con el mate (fov ~32): **24,1 · voz (Algenib): "Está en la bolsa, Walter."** sin dejarlo terminar, con
  parsimonia; "bolsa" en recuadro verde. 25,4 · inserto: Walter mira adentro de la bolsa, el pan flauta asoma,
  sonrisa grande (CARA.feliz); se va saludando.
- **26,0 · Plano E, general de la vereda:** Rubén baja la cortina de un tirón (ratchet corto + clanc) y el chip pasa a
  **20:00 ✓ en verde** (26,3, ding; callback del reloj de la parte 1). 26,6 a 28,3 · Rubén se acomoda el termo bajo
  el brazo, sorbe el mate, mira a cámara y guiña (ojos.guiño), push-in lento.
- **28,4 a 30,0 · línea chica final** abajo (como abren-hoy-2): "Tu tienda online toma el pedido y lo cobra" y debajo,
  en verde, "scalerics.com" (Lexend 600, ≥ 36 px, recuadro navy con borde verde).

## Objetos 3D por plano (todo genérico, sin marcas)
- **Plano 1, C, E (vereda de noche):** fachada navy con letrero ALMACÉN (de abren-hoy), **cortina metálica** (lámina
  ondulada con ranuras horizontales cada ~8 cm, enrollable: el tambor arriba y la lámina que baja según un parámetro
  `alto`, con manija/argolla abajo), **gancho de cortina** (varilla navy con punta en U), farol de calle con luz
  cálida, baldosas y cordón (de abren-hoy), luz que sale por abajo de la cortina (un rectángulo emisivo en el piso).
- **Plano 2, 3:** la cortina en primer plano (Plano 3 la cámara está adentro, mirando a Walter por el hueco de abajo:
  la cortina corta el cuadro arriba como un marco), papelito doblado en la mano de Walter.
- **Plano 4, 6, 7, 8 (interior):** estantes llenos y mostrador de abren-hoy, **reloj de pared analógico** (redondo,
  esfera crema, números navy, borde verde, agujas navy por t; arriba de los estantes, que se lea en los generales),
  **perchero de pared** (tres ganchos de madera), cajón de verduras de madera, mercadería reconocible: paquete de
  yerba (ladrillo de papel con franja verde y "YERBA"), paquete de fideos moñita (bolsa transparente con moñitos
  crema), **sachets de leche** (almohadita blanca con franja navy: lo local), pan flauta (largo, con cortes), maple de
  huevos, zapallo, rollos de papel higiénico, lapicera.
- **Plano 5 (la lista):** **rollo de papel** que se desenrolla: una cinta 3D (ancho 9 cm, grosor visible) que sigue
  una curva por t (mostrador → piso → puerta → vereda → cordón → calle) con el rollo que se achica en la punta;
  textura canvas manuscrita (Caveat, está en reels/cadena-perpetua/assets/fonts) navy sobre blanco, renglones con
  tachones; repetir la textura a lo largo.
- **Plano A:** celular de Walter grande (RoundedBox, pantalla canvas con la tienda genérica), escritorio con lámpara.
- **Plano B, C, D:** celular de Rubén con aviso (canvas), **bolsa de papel crema** con manijas verdes, fuelle lateral
  y doblez arriba, **ticket abrochado** (rectángulo blanco con grapa metálica, "WALTER · PAGADO ✓"), mate y termo.
- **Chip de hora** (pegado a cámara, arriba, como el contador de abren-hoy): placa navy con borde verde, "VIERNES ·"
  en crema y los dígitos en TextGeometry; cada cambio es un flip de dígitos (como reloj de paletas).
- **Burbujas de diálogo** (no de chat: con pico hacia quien habla), las de abren-hoy adaptadas, pegadas a cámara.

## Qué sumar
- **personajes.js** (en reels/abren-hoy, el canónico, y copiar):
  - `ELENCO.walter` (ver arriba).
  - opción `campera: color` (+ `camperaCierre`, `camperaCuello`): una capa de torso un poco más ancha, abierta o con
    cierre, mangas largas encima, cuello alzado. Tiene que ser un **grupo separable** (`p.campera`) para poder
    sacarla: visible on/off y un objeto suelto "campera colgada" (crearCamperaColgada(color)) para el perchero y la
    mano de Rubén.
  - opción `corbata: color, corbataFloja: true` (nudo bajo, un poco torcida).
  - utilería: `crearMochila(color, tira)`, `crearBolsa()` (bolsa de papel con manijas, se le pueden agregar hijos),
    `crearGancho()` (varilla de la cortina), `crearLapicera()`.
  - poses: `CORRER` (paso más rápido y brazos que bracean), `TACHAR` (mano con lapicera sobre la lista), `SACAR_CAMPERA`
    (dos claves: manos a las solapas, mano derecha arriba sosteniendo la campera), `SENTADO` (en el cajón).
- **tres.js** (proyecto nuevo, partiendo del de abren-hoy): el set de noche (cielo, farol, luces), la cortina
  enrollable con `alto(t)`, el reloj de pared, el rollo de papel desenrollable por t, el mostrador que se llena, el
  chip de hora con flip, las pantallas canvas de los dos celulares y la bolsa con ticket. Cámara: PLANOS de abren-hoy
  (cortes entre planos, Catmull-Rom adentro); el Plano 5 es una sola curva larga con grúa al final.

## Sonido por tramo (techo -31 LUFS por efecto; voz ≥ 6 LU arriba del resto mientras habla; final -14 LUFS)
- **0 a 10,2:** ambiente de calle de noche (bajo), pizzicato (reutilizado) que sube de energía en el montaje; ratchet
  de cortina (baja y sube), pasos corriendo, clanc, pops de burbujas, papel que se desenrolla, tuc del cordón,
  whoosh de grúa, pops de mercadería, tic + flip en cada salto de hora, campanita del reloj de pared a las 20:00,
  tachón de lapicera, roce de papel al darlo vuelta.
- **10,2 a 13,3:** la música se corta seca; solo ambiente. Whoosh del push-in, roce de tela de la campera, la voz.
- **13,3 a 14,4:** tuba del 20:41 (la de abren-hoy), un crujido del cajón cuando Walter se sienta.
- **Cartel:** como abren-hoy-completo (whoosh, stinger CC0, narrador, whoosh del iris).
- **17,6 a 30,0:** música tranquila (pizzicato más bajo, nunca se corta: todo anda), taps, ding de pago, vibración,
  sorbo de mate, pops en cascada, papel de bolsa, clac de abrochadora, pasos tranquilos, ratchet corto + clanc,
  ding del 20:00 ✓ (el "cero.mp3" de abren-hoy-2), y la música baja 9 dB mientras habla Rubén.
- **SFX nuevos a buscar (reales, CC0, Openverse/Freesound con license=cc0; anotar en fuentes.md; nunca sintetizar):**
  cortina metálica enrollable bajando/subiendo (rolling shutter), clanc metálico, pasos corriendo en vereda,
  papel que se desenrolla (paper roll unroll), tic-tac / campanada de reloj de pared, tachón de lapicera, bolsa de
  papel, abrochadora, crujido de cajón de madera, roce de campera.

## Portada (portada.json, fondo LIMPIO=1)
- Fondo: el Plano 5 al final de la grúa (el almacén con la lista cruzando la calle) o el Plano 6 con el mostrador lleno
  y la lista colgando; zoom 1,3.
- `chica`: "Cerrás a las 20." · `grande`: "Entra a las 19:59" · `sello`: "Para mandar" · acento y sello `#5ce611`.

## Duración
Parte 1 14,4 s + cartel 3,2 s + parte 2 12,4 s = **30,0 s**. Voz: Rubén ×2 (Algenib), narrador del cartel (Rasalgethi).
Plan B si sacar la campera queda feo en 3D: corte directo a Rubén ya en camisa colgando la campera en el perchero
mientras dice la frase (la campera colgada es el objeto, no la animación).
