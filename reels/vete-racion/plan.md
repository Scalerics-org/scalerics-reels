# vete-racion · plan plano por plano · VETERINARIAS, dolor + solución (3D real), ~40,6 s

**De qué trata.** Domingo, 21:40, en la cocina de Vero. Toto empuja con el hocico el plato de acero vacío contra la
pantufla de Vero (clonc); Vero da vuelta la bolsa de 15 kg que compra todos los meses en "Veterinaria Inés" (el sticker
de Inés en la bolsa): cae UNA croqueta. **"Uy. Se terminó."** El celular: "Veterinaria Inés · Cerrado · Abre el lunes
9:00". **"Bueno, Toto. Al súper."** Domingo 22:05, la góndola del súper: la bolsa de 15 kg al carro. Noviembre,
diciembre, enero: el mismo carro, la misma bolsa ("Ración que no se vendió en la veterinaria: $ 3.900 → $ 15.600").
Febrero, en la veterinaria: la torre de bolsas de 15 kg sin tocar al lado del mostrador. Entran Vero y Toto a control;
Toto va derecho a la torre y la huele. Inés, contenta: **"¡Vero! ¿Qué está comiendo Toto?"** Vero, agradecida: **"La
que me recomendaste. La compro en el súper."** Pausa con el costo. Remate del remate: **"¿Me la anotás? Así no me
equivoco."** e Inés, callada, le escribe la lista del súper en una hoja de su recetario con el membrete de la
veterinaria; Toto se echa contra la torre con un suspiro. Cartel **"Una tienda online más tarde…"**. Parte 2: un jueves,
cuatro días antes de que se termine la bolsa, a Vero le llega "A Toto le quedan unos 4 días de ración. ¿Te la
mandamos?": **"¿Cómo sabe?"** (inserto: la ficha de recompra de Toto en la tablet de Inés), toca "Repetir pedido", elige
envío y paga; el viernes Bruno toca el timbre con la bolsa con la etiqueta TOTO: **"¡Ración para Toto!"**; el domingo a
las 21:40 Toto va a empujar el plato… y está lleno (el remate de la parte 2, sin palabras). Febrero: el mismo "¡Vero!
¿Qué está comiendo Toto?" (mismo audio) recibe **"La que me recomendaste. Me llega sola."**; el panel de recompras.
Cierre: Inés a cámara: **"Comentá RACIÓN y te mando cómo funciona para tu veterinaria."**

- **Producto: tienda online + automatización** (Scalerics): la veterinaria vende la ración en su tienda online, con
  envío o retiro y pago; el sistema guarda **qué bolsa lleva cada mascota y cada cuánto la compra** y, unos días antes de
  que se termine, le manda al dueño un WhatsApp con el nombre de la mascota y el botón **"Repetir pedido"** (lleva al
  pedido armado en la tienda: envío o retiro, pagar); panel **"Recompras de ración"** para Inés. **No es agente de IA:**
  no se nombra así en ningún lado. Se nombra en el cartel ("Una tienda online más tarde…"), en la línea chica final
  ("Tienda online con aviso de recompra por WhatsApp" / scalerics.com) y en `descripcion.txt`. Nunca "Scalerics" en el
  cartel.
- **Sin marcas:** bolsas de ración genéricas (kraft o colores planos, una silueta de perro navy y "ADULTO MEDIANO · 15
  kg", sin logos ni nombres de fábrica), góndola sin carteles de marca, el súper sin nombre ("SÚPER" a secas, si hace
  falta), chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp), celular y tablet sin logo. "Veterinaria
  Inés" es inventada (la de veterinaria-vacunas).
- **Sin datos de afuera** (ver `fuentes.md`): $ 3.900, $ 46.800, $ 15.600, 11, 23, 19, $ 74.100, los días y horas son del
  caso. El guion no dice cuánto come un perro ni cada cuánto se termina una bolsa en general: "cada 30 días" es la ficha
  de Toto.
- **Estructura** (la de veterinaria-vacunas y ferreteria-encargo): parte 1 **16,6 s** + cartel **2,6 s** + parte 2
  **18,0 s** + cierre **3,4 s** = **40,6 s**. Solución + cierre = 21,4 s (**53 %**). **Proyecto 3D: copia de
  `reels/veterinaria-vacunas`** (Inés sin lentes, Vero, Bruno, Toto en `assets/perro.js`, el mostrador de recepción y la
  vidriera, `crearCelular`, la tablet en atril, gen.mjs con T1/T2, medir.py, snap.sh, prev.mjs, partes/procesar.sh).
  **Ojo con el largo:** si pasa de ~42 s, recortar primero el montaje de meses de P2 (1,8 → 1,4 s), el inserto de la
  tienda de Q1 y el panel Q5 (3,2 → 2,6 s); nunca la pausa después de "La compro en el súper." (mínimo 0,6 s) ni el
  plato lleno de Q3 (tiene que leerse: mínimo 2,4 s).
- **Cartel:** el time card de siempre: **"Una tienda online" / "más tarde…"**. Audio REUSADO de
  `reels/tienda-tenes-stock/assets/voice/narrador.wav` (Rasalgethi, "Una tienda online más tarde.", 2,55 s; ya copiado a
  `assets/voice/narrador.wav`). La versión de hacen-envios/la-lista dura 2,81 s: usar la de tienda-tenes-stock.
- **Quién dice "Comentá RACIÓN": Inés, a cámara** (en vacunas lo dijo Sofi: se alterna). La palabra **RACIÓN** en
  pantalla, en la voz y en la primera línea de `descripcion.txt`.
- **Nadie queda mal parado:** Vero no se fue de la veterinaria (sigue yendo a control) y compra justo lo que Inés le
  recomendó: lo dice como un elogio. Se le terminó un domingo a la noche con todo cerrado; no es traición. Inés recomienda
  bien y es amable; su silencio al escribir la lista es ironía contra la situación, no contra Vero. Toto es el que se da
  cuenta de todo (el plato). Nadie dice nada malo del súper ni de su ración.

## Paleta y set (para "Hechos")
**Escenario principal nuevo: la cocina de Vero (P1, Q1, Q3)**, de noche en la parte 1 y en Q3, de mañana en Q1: pared
navy claro `#16243d` plana; arriba de la mesada, una franja de azulejos crema `#efeee5` rectangulares con junta navy (lisos,
sin brillo); mesada con frente navy3 y tapa crema; piso en damero crema `#d9d7c9` / gris claro `#b9bec4` (cuadros de
40 cm, planos); una lámpara colgante con pantalla verde apagado `#365f28` y luz crema plana (de noche) o la ventana con
luz de mañana crema plana (Q1); la ventana de noche navy oscuro `#0b1220` liso, sin estrellas ni degradés. Objetos: **el
plato de acero de Toto** (gris claro plano `#b9bec4`, sin reflejos especulares fuertes) sobre una alfombrita crema con
"TOTO" en Lexend 800 navy; **la bolsa de 15 kg de la veterinaria** (kraft `#c9a774`) con la pantufla de Vero al lado.
**Set chico: el pasillo del súper (P2)**: góndola gris claro de tres estantes con bolsas de ración de colores planos de
la marca (navy2, ocre `#c9a774`, verde apagado `#365f28`, crema, gris), carteles de precio crema con número navy, piso
gris claro, tubos de techo crema planos, el carro de alambre navy3. **Set de la veterinaria (P3, P4, Q4, Q5, cierre):
la recepción de `veterinaria-vacunas`** (mostrador con frente navy3 y tapa crema, la vidriera, el cartel "VETERINARIA
INÉS", azulejo verde apagado `#365f28` abajo y pared navy arriba) con lo nuevo: **la torre de bolsas de 15 kg** (20
bolsas kraft en un pallet bajo, al lado del mostrador) y una estantería navy con collares y premios genéricos; en la
parte 2 la torre ya no está: en su lugar, el estante **"ENVÍOS DE HOY"** con bolsas con etiqueta de nombre. **Set chico:
la puerta de la casa de Vero (Q2)**: puerta navy2 con marco crema, timbre, felpudo crema, luz de tarde crema plana.
Anotar en "Hechos": "cocina de Vero (pared navy claro #16243d, azulejo crema, damero, plato de acero TOTO, bolsa de 15 kg
con el sticker de la veterinaria), pasillo del súper, recepción de Veterinaria Inés con la torre de bolsas; parte 2 con
interfaz recreada (WhatsApp de recompra, ficha de Toto en la tablet, tienda con envío y pago, panel de recompras);
cartel verde".
- **Rojo apagado `#c7655b` SOLO para el problema:** "Cerrado" del celular, el contador "Ración que no se vendió en la
  veterinaria: $ 3.900 → $ 15.600", los rótulos "$ 3.900 por mes · $ 46.800 al año, en el súper" y "Clientes de bolsa que
  dejaron de venir: 11", el 11 del panel antes de girar. **Verde `#5ce611` para lo resuelto:** cada ✓, "Repetir pedido",
  "Pagado ✓", "Avisos enviados", "Repitieron", "11 → 2", "$ 74.100", la tarjeta RACIÓN, el recuadro de los subtítulos.
- **Burbujas de diálogo:** crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien
  habla; se revelan por frase entera (nunca una palabra colgando, lección de vacunas r1/r2). "¡Vero! ¿Qué está comiendo
  Toto?" en P4 y Q4 en el MISMO lugar y tamaño; "La que me recomendaste." también, y cambia solo la segunda frase ("La
  compro en el súper." → "Me llega sola."), que se lea la vuelta.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "VETERINARIAS" en el cuadro 0):
  "Domingo, 21:40." · "Domingo, 22:05." · NOVIEMBRE · DICIEMBRE · ENERO · "Febrero." · parte 2: "Jueves, 10:00." ·
  "Viernes, 18:40." · "Domingo, 21:40." · "Febrero.". Cambio con flip corto + `k-tick-1`; cada mes del montaje ≥ 0,6 s
  (en vacunas los meses de 0,42 s no se leían).
- Texto en pantalla: crema sobre navy, navy sobre crema; nunca crema sobre el azulejo verde ni blanco sobre el piso
  claro. Rótulos con línea guía en caja navy `#0b1220`, texto crema, borde crema de 6 px; las guías nunca cruzan una cara.

## Personajes (todos de veterinaria-vacunas; ningún nuevo)
- **Vero** (`ELENCO.vero`, Callirrhoe). En la cocina, de entrecasa: **sin campera**, buzo crema `MARCA.cr2`, pantalón
  de jogging navy2, **pantuflas** crema (dos bloques redondeados; la izquierda es la que golpea el plato). En el súper y
  en la veterinaria con la campera navy2 de siempre y la correa verde oscuro de Toto. Expresiones: P1 `sorpresa` leve
  ("Uy") y `resignado` simpático; P4 `sonrisa` grande y agradecida (sin ninguna culpa); P5 `esperanza` práctica; Q1
  `incredula` contenta ("¿Cómo sabe?"); Q4 `sonrisa`. **Doble boca (vacunas r2 A2):** ocultar la sonrisa cerrada cuando
  habla. Que no cierre los ojos al hablar.
- **Inés** (`ELENCO.ines`, Sulafat, **sin lentes**). Ambo verde oscuro, estetoscopio. P3 `neutra` mirando la torre; P4
  `sonrisa` de bienvenida que se congela en la pausa (sonrisa quieta, cejas apenas arriba: nada de enojo ni manos a la
  cabeza); P5 `neutra` profesional mientras escribe (seca, sin mirar a cámara); parte 2 `sonrisa`; cierre `sonrisa` de
  colega. En P5 con **el recetario** (talonario crema con membrete navy) y la lapicera del bolsillo.
- **Bruno** (`ELENCO.bruno`, Schedar). P3/P4 atrás del mostrador, acomodando la torre (sin voz en la parte 1); Q2 en la
  puerta de Vero con la bolsa de 15 kg al hombro (las dos manos sujetándola: que no flote) y la etiqueta TOTO a cámara;
  Q4 armando el estante "ENVÍOS DE HOY".
- **Toto** (`crearPerro(PERROS.toto)`, no habla; ladridos reales CC0 de `assets/sfx`). Parámetros por tiempo: P1
  empuja el plato con el hocico (cabeza.asiente + avance en z, el plato se mueve con él: el hocico TOCA el borde, no lo
  atraviesa), `cejas` tristes, mira la bolsa; con "Al súper." `orejas` 1 y `cola` 1. P4 tira de la correa hacia la torre,
  la huele (`cabeza.asiente`), cola. P5 `echado` contra la torre con un suspiro (respiración marcada, `cejas` -1). Q1
  echado en la cocina, `cabeza.ladea` con "¿Cómo sabe?". Q2 `erguido` contento en la puerta (patas sobre la bolsa sin
  atravesarla) con `jadeo`. **Q3 (el remate de la parte 2):** va al plato con la misma pose de P1, empuja… el plato no
  suena: está lleno; para, `orejas` 1, `cejas` +1, `cabeza.ladea`, mira a cámara 0,4 s y come. Q4 sentado moviendo la
  cola. La oreja parada con volumen (vacunas r1 A7): revisar de atrás y de perfil.
- **Extras:** en el súper (P2), una señora con canasta al fondo, desenfocada (DEFECTO con `corto` canoso), sin voz.

## Objetos 3D (reusados de veterinaria-vacunas + nuevos, específicos)
**Reusados:** recepción (mostrador, vidriera, cartel "VETERINARIA INÉS", azulejo), `crearCelular` (funda navy2), la
tablet en atril, el frasco de premios en la mesada (aparece en el mostrador).
**Nuevos:**
- **La bolsa de ración de 15 kg (EL objeto):** bolsa de papel kraft `#c9a774` con fuelle (caja redondeada con los
  lados apenas abombados y la parte de arriba doblada y cosida: una costura en zigzag navy de ≥ 6 px), frente con una
  **silueta de perro navy** y una franja crema con "ADULTO MEDIANO" y **"15 kg"** grande en Lexend 900 navy, y el
  **sticker redondo verde apagado `#365f28` con "VETERINARIA INÉS" en crema** (la bolsa de la veterinaria). Llena: alta y
  firme. Vacía (P1): desinflada, arrugada (los lados hundidos, dos o tres pliegues marcados en la geometría), Vero la da
  vuelta y cae UNA croqueta. **La bolsa del súper** (P2, P4 nombrada, Q no): la misma forma, color verde apagado
  `#365f28` con franja crema y "15 kg", silueta de perro crema, sin sticker. **¿Alguien la confunde con otra cosa?** Que
  no parezca una bolsa de portland ni de harina: la silueta de perro y "15 kg" grandes y legibles en el plano de P1
  (≥ 40 % del ancho en el inserto).
- **Las croquetas:** bolitas marrón `#8a5a30` con forma de hueso chiquito o de anillo (geometría simple), la única de P1
  cae y rebota dos veces en el plato (física función del tiempo); en Q3 el plato lleno (domo de 40-60 croquetas
  instanciadas, posiciones con semilla fija).
- **El plato de acero de Toto:** cuenco bajo de acero gris claro `#b9bec4` (roughness alta, sin reflejos fuertes), borde
  enrollado, sobre la alfombrita crema "TOTO". En P1 vacío, se desliza 10-15 cm con cada empujón; en Q3 lleno.
- **La pantufla de Vero:** dos pantuflas crema con borde navy, la izquierda en primer término (el plato choca contra ella).
- **El celular de Vero** (`crearCelular`): P1 tarjeta genérica de lugar "Veterinaria Inés · **Cerrado** · Abre el lunes
  9:00" (rojo apagado en "Cerrado"); Q1 el chat y la tienda.
- **La góndola del súper (P2):** tres estantes con 18-24 bolsas de colores planos (sin texto salvo "15 kg"/"3 kg" en
  algunas), carteles de precio crema con "$ 3.900" en la de 15 kg verde, el carro de alambre navy3 (barras ≥ 6 px de
  grueso en pantalla). La señora de fondo.
- **La torre de bolsas (el objeto del costo, P3-P5):** 20 bolsas de 15 kg de la veterinaria apiladas en cuatro hileras de
  cinco sobre un pallet bajo crema, al lado del mostrador, más alta que Toto parado (llega al pecho de Inés); un cartel
  colgado de cartón "RACIÓN 15 kg · $ 3.900" en Caveat navy. En P5 Toto se echa contra la base. Las bolsas no se
  atraviesan entre sí.
- **El recetario de Inés (P5):** talonario crema con membrete navy "VETERINARIA INÉS" y una huellita; Inés arranca una
  hoja (se dobla y se separa, función del tiempo) y escribe en Caveat 700 navy "Ración adulto mediano · bolsa 15 kg"; en
  el inserto (≥ 60 % del cuadro) se leen el membrete y la letra.
- **El estante "ENVÍOS DE HOY" (Q4):** estante navy con 5 bolsas de 15 kg de la veterinaria, cada una con una etiqueta
  crema y el nombre ("TOTO", "LUNA", "COCO", "MORA", "SIMÓN") en Lexend 800 navy.
- **La puerta de Vero (Q2)** y el timbre.
- **La tablet en atril** (Q1 inserto de la ficha, Q5 panel): pantalla canvas.

## Interfaz recreada (canvas en pantallas; insertos ≥ 60 % del cuadro; Lexend, ≥ 36 px en el cuadro final)
**P1 · celular · tarjeta de lugar genérica** (sin mapa de ninguna marca): "Veterinaria Inés" · "**Cerrado**" (rojo
apagado) · "Abre el lunes 9:00". 0,9 s.
**Q1 · celular · chat genérico "Veterinaria Inés"** (burbuja crema, hora 10:00): **"Hola, Vero. A Toto le quedan unos 4
días de ración. ¿Te la mandamos?"** y dos botones: **"Repetir pedido · $ 3.900"** (verde) y "La paso a buscar". Rótulo:
**"Aviso antes de que se termine"**.
**Q1 · tablet de Inés · ficha de recompra** (respuesta visual a "¿Cómo sabe?"): encabezado "Recompras · Toto (Vero)" con
la cara plana de Toto · "Ración adulto mediano · 15 kg" · "Compra cada 30 días" · "Última compra: hace 26 días" · "Le
quedan: ~4 días" · **"Aviso enviado ✓ jueves 10:00"**. Rótulo: **"Sabe qué bolsa lleva cada uno y cada cuánto"**.
**Q1 · celular · tienda "Veterinaria Inés"** (al tocar "Repetir pedido"): el pedido ya armado: la bolsa (foto plana) ·
"Ración adulto mediano 15 kg · × 1" · opciones **"Envío · viernes 18 a 20 h"** (marcada) / "Retiro en la veterinaria" ·
"Total $ 3.900" · botón verde **"Pagar"** → **"Pagado ✓ · Llega el viernes"**. Rótulo: **"Repetir y pagar: un toque"**.
**Q5 · panel "Recompras de ración · febrero"** (tablet ≥ 70 %, el mostrador alrededor, nunca pantalla lisa): **"Avisos
enviados 23 ✓"** · **"Repitieron el pedido 19 ✓"** (con "Envío 14 · Retiro 5" chico, ≥ 36 px) · **"Dejaron de comprar
11 → 2"** (el 11 rojo apagado gira a 2 verde) · **"$ 74.100 en ración este mes"** (19 × $ 3.900). Filas con tilde: "Toto
· Vero · Enviado ✓", "Luna · Retiro ✓", "Coco · Enviado ✓". Rótulo: **"Panel de recompras"**.
**Tarjeta de cierre (HTML, ~3,4 s, sobre Inés a cámara):** abajo de la cara, en el 80 % seguro y con y ≤ 1500: "Comentá"
(Lexend 800 crema ~90 px) / **"RACIÓN"** (Lexend 900 ~170 px, navy en el recuadro verde) / "y te mando cómo funciona
para tu veterinaria" (Lexend 600 crema ~46 px, 2 líneas). Los últimos ~0,8 s, debajo: "Tienda online con aviso de
recompra por WhatsApp" (~38 px) / **"scalerics.com"** en verde (~44 px). Entra sobre "Comentá", no tapa la cara.

## PARTE 1 · el problema (0,00-16,60 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,90 | **P1 · cuadro 0.** Plano bajo (a la altura de Toto) en la cocina de noche: Toto y el plato vacío en primer término, la pantufla de Vero, Vero de pie de 3/4 dando vuelta la bolsa vacía; la ventana navy y la lámpara verde detrás. Push-in lento a la bolsa y al plato. | **Cuadro 0:** "VETERINARIAS" (Lexend 900 ~130 px, ya entero, en caja navy o sobre la pared navy claro) y el chip "Domingo, 21:40."; Toto YA está empujando el plato contra la pantufla. 0,30-1,20 · **Vero: "Uy. Se terminó."** · 0,8 · cae UNA croqueta al plato y rebota · 1,40-2,40 · inserto del celular (≥ 60 %): "Veterinaria Inés · Cerrado · Abre el lunes 9:00" · 2,50 · Toto empuja el plato otra vez · 2,60-3,70 · **Vero: "Bueno, Toto. Al súper."** · Toto levanta las orejas y mueve la cola. | cocina, Vero, Toto, plato, alfombrita TOTO, bolsa vacía con sticker, croqueta, celular | ambiente de cocina de noche (heladera muy baja) · plato de acero contra el piso (`k-plato-000`) 0,1 y 2,5 · bolsa de papel arrugada (`papel.wav` / `k-cloth_1`) 0,4 · croqueta que pica en el acero (`k-tick-2` ×2, bajo) 0,8 · `vibra.wav` al prender el celular 1,4 · `ladrido` corto contento 3,6 |
| 3,90-6,90 | **P2 · el súper y los meses.** 3,90-5,10 plano medio del pasillo: Vero de 3/4 saca la bolsa verde de 15 kg de la góndola y la tira al carro; travelling corto a lo largo de la góndola. 5,10-6,90 el MISMO encuadre, montaje de meses: el carro con la bolsa verde, otra vez y otra vez. | Chip "Domingo, 22:05." · 4,4 · la bolsa al carro · rótulo **"15 kg · $ 3.900 · en el súper"** (guía a la bolsa). 5,10 NOVIEMBRE · 5,75 DICIEMBRE · 6,40 ENERO (cada uno ≥ 0,6 s; un golpe de bolsa por mes) · contador rojo apagado arriba: **"Ración que no se vendió en la veterinaria: $ 3.900 → $ 7.800 → $ 11.700 → $ 15.600"**. | góndola, bolsas genéricas, carteles de precio, carro, Vero, señora al fondo | tubo fluorescente y música de súper muy baja (cama) · bolsa al carro (`k-book_place_1` grave + alambre `k-metal-liviano-2`) 4,4, 5,15, 5,8, 6,45 · `k-tick-1` por chip · whoosh corto al entrar |
| 6,90-8,20 | **P3 · febrero en la veterinaria.** Plano general de la recepción: la torre de 20 bolsas en primer término a la izquierda (≥ 35 % del alto), el mostrador, Inés atrás con el talonario (en la parte 1 NO hay tablet), Bruno acomodando la torre. Push-in a la torre. | Chip "Febrero." · el cartel "RACIÓN 15 kg · $ 3.900" en la torre se lee · 7,90 · campanita de la puerta. | recepción, torre, cartel de cartón, Inés, Bruno | ambiente de veterinaria (un ladrido lejano en la sala) · `k-tick-1` · `campanita.wav` 7,90 · `puerta-abre` |
| 8,20-13,20 | **P4 · el remate.** 8,20 Vero y Toto entran (plano medio desde atrás del mostrador, sobre el hombro de Inés); Toto tira de la correa derecho a la torre y la huele. 10,0 contraplano: Vero de frente, contenta, con la torre detrás. 12,5 Inés de 3/4, la sonrisa quieta (pausa). | 8,40-9,90 · **Inés: "¡Vero! ¿Qué está comiendo Toto?"** (contenta de verlos) · 9,2 · Toto huele la torre, cola · 10,10-12,50 · **Vero: "La que me recomendaste. La compro en el súper."** (agradecida) · 12,50-13,20 · pausa: Inés quieta · rótulos (a la derecha, guías fuera de las caras): **"$ 3.900 por mes · $ 46.800 al año, en el súper"** (guía a Vero) y **"Clientes de bolsa que dejaron de venir: 11"** (guía a la torre), rojo apagado. | Vero (campera), Toto con correa, torre, Inés, Bruno al fondo | pasos y uñas de Toto en el piso (`paso-*` bajo, `k-tick-4`) 8,3 · Toto que olfatea (sniff CC0 si hace falta; ver fuentes) 9,2 · nada encima de la pausa (la música baja) · pop de cada rótulo |
| 13,20-16,60 | **P5 · remate del remate.** Plano medio de Inés y Vero sobre el mostrador; inserto del recetario (≥ 60 %) a 15,4; plano final bajo: Toto echado contra la torre. | 13,30-14,90 · **Vero: "¿Me la anotás? Así no me equivoco."** · 15,0 · Inés, callada y profesional, arranca una hoja del recetario y escribe · 15,40-16,10 · inserto: membrete **"VETERINARIA INÉS"** y en Caveat **"Ración adulto mediano · bolsa 15 kg"** · 16,10 · Toto se echa contra la base de la torre con un suspiro · 16,50 · stinger. | recetario, lapicera, Inés, Vero, Toto echado, torre | hoja que se arranca (`bsb-rasga.wav` de ferreteria-encargo, CC0) 15,0 · lapicera (`birome.wav` de resto-reservas, CC0) 15,2-16,0 · suspiro de perro (CC0, ver fuentes) 16,1 · **stinger** 16,50 (música cortada seca) |

Último cuadro (16,60) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL (16,60-19,20 s)
Time card de siempre: fondo verde de marca con manchas y burbujas, letras que rebotan: **"Una tienda online"** /
**"más tarde…"**. Audio reusado de `reels/tienda-tenes-stock/assets/voice/narrador.wav` (Rasalgethi, 2,55 s) desde 16,65.
Nunca "Scalerics". Texto con buen contraste (vacunas r1 B28: navy sobre verde, centrado).

## PARTE 2 · la solución (19,20-37,20 s)
| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 19,20-25,20 | **Q1 · el aviso.** EL MISMO encuadre del cuadro 0, de mañana: Toto echado al lado del plato con croquetas, la bolsa de la veterinaria en la mesada con un poco adentro (doblada a la mitad). 19,70 inserto del celular (≥ 60 %). 21,70 whoosh a la tablet de Inés en la veterinaria (inserto ≥ 60 %). 23,20 vuelta al celular. | Chip "Jueves, 10:00." · 19,50 · ding: el chat **"Hola, Vero. A Toto le quedan unos 4 días de ración. ¿Te la mandamos?"** con "Repetir pedido · $ 3.900" / "La paso a buscar" · rótulo "Aviso antes de que se termine" · 21,00-21,70 · **Vero: "¿Cómo sabe?"** (Toto ladea la cabeza) · 21,70-23,20 · la ficha de recompra de Toto ("Compra cada 30 días · Le quedan: ~4 días · Aviso enviado ✓") · rótulo "Sabe qué bolsa lleva cada uno y cada cuánto" · 23,20 · Vero toca "Repetir pedido" → la tienda con el pedido armado, "Envío · viernes 18 a 20 h" marcado → 24,30 "Pagar" → 24,60 **"Pagado ✓ · Llega el viernes"** · rótulo "Repetir y pagar: un toque". | cocina de día, Toto, plato con croquetas, bolsa con poco, celular, tablet | ambiente de cocina de mañana (pajaritos no: calle muy lejos) · `notification` 19,50 · whoosh 21,70 y 23,20 · `click-soft` 23,25 y 24,30 · `cero.mp3` 24,60 |
| 25,20-27,40 | **Q2 · viernes.** Plano medio desde adentro: la puerta de Vero que se abre; Bruno con la bolsa de 15 kg al hombro, la etiqueta crema **TOTO** a cámara; Toto erguido de contento. | Chip "Viernes, 18:40." · 25,30 · timbre · 25,50 · Vero abre · 25,80-26,80 · **Bruno: "¡Ración para Toto!"** · Toto salta, jadeo, ladrido · 27,0 · Bruno apoya la bolsa adentro. | puerta, Bruno, bolsa con etiqueta TOTO, Vero, Toto | timbre (`ding` o `k-dos-tonos` suave) 25,30 · `puerta-abre` 25,50 · ladrido contento 26,9 · bolsa en el piso (`k-book_place_2`) 27,1 |
| 27,40-30,20 | **Q3 · el remate de la parte 2.** EL MISMO encuadre del cuadro 0, de noche, la misma lámpara: Toto va al plato con la misma pose de P1 y lo empuja… está lleno. Push-in a Toto. Vero al fondo, tranquila, con una taza. La bolsa nueva llena en la mesada. | Chip **"Domingo, 21:40."** (el mismo del cuadro 0) · 27,70 · Toto empuja: el plato no suena; se mueven las croquetas · 28,2 · Toto para, orejas arriba, cejas arriba, ladea la cabeza · 28,7-29,1 · mira a cámara · 29,2 · come. Sin voz. | cocina de noche, Toto, plato lleno, bolsa nueva, Vero al fondo | ambiente de P1 · croquetas que se mueven (`k-plastico` muy bajo) 27,70 · NADA de plato de acero (es el chiste) · masticar suave (CC0, ver fuentes) 29,2 · la cama vuelve |
| 30,20-34,20 | **Q4 · febrero.** EL MISMO encuadre de P4: la recepción; donde estaba la torre, el estante "ENVÍOS DE HOY" con 5 bolsas con nombre; la tablet en el atril del mostrador. 32,0 contraplano de Vero de frente (el mismo de P4). | Chip "Febrero." · campanita 30,25 · Vero y Toto entran; Toto pasa de largo el estante (la suya ya está en su casa), se sienta y mueve la cola · 30,40-31,90 · **el mismo audio: Inés "¡Vero! ¿Qué está comiendo Toto?"** · 32,00-34,00 · **Vero: "La que me recomendaste. Me llega sola."** · Inés sonríe. | recepción, estante ENVÍOS DE HOY, tablet, Vero, Toto, Inés, Bruno armando envíos | `campanita.wav` 30,25 · pasos y uñas · pop suave al cambiar la burbuja |
| 34,20-37,20 | **Q5 · el panel.** La tablet a ≥ 70 % en el atril (el mostrador y el estante ENVÍOS DE HOY alrededor). Push-in leve. | "Recompras de ración · febrero": las filas se tildan; **"Avisos enviados 23 ✓"** · **"Repitieron el pedido 19 ✓"** · **"Dejaron de comprar 11 → 2"** (34,9-35,9, el 11 gira y queda verde) · **"$ 74.100 en ración este mes"** · rótulo "Panel de recompras". | tablet, atril, mostrador, estante | `k-tick-1` por fila · `cero.mp3` en el 2 · `ding` en "$ 74.100" |

## CIERRE (37,20-40,60 s)
| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 37,20-40,60 | **C · Inés a cámara.** Primer plano de frente atrás del mostrador, el estante "ENVÍOS DE HOY" y el cartel VETERINARIA INÉS detrás (nunca pared lisa); Toto asoma con las patas en el mostrador a la derecha (sin tocar a Inés). Push-in suave. | 37,35-40,45 · **Inés: "Comentá RACIÓN y te mando cómo funciona para tu veterinaria."** (de colega, media sonrisa) · sobre "Comentá" entra la tarjeta abajo de la cara; los últimos 0,8 s la línea chica "Tienda online con aviso de recompra por WhatsApp" / "scalerics.com". | pop en "RACIÓN" · cama que cierra con un acorde |

## Revisión pedida para este reel (además de 8c y de los defectos de vacunas r1-r5)
- **Cuadro 0:** "VETERINARIAS" entero y legible, sin tapar a Vero ni a Toto; el plato vacío, Toto empujándolo y la
  bolsa vacía con "15 kg" y el sticker de la veterinaria se entienden en el primer segundo.
- **Se entiende sin sonido:** burbujas de las 8 líneas (reveladas por frase entera); "Cerrado" del celular; el contador
  de meses; rótulos; el recetario; chat, ficha, tienda y panel legibles; el plato lleno de Q3 (que se vean las croquetas
  desde el encuadre).
- **Continuidad:** P1 = Q1 = Q3 en encuadre (Q1 de día, Q3 de noche como P1); P4 = Q4; la torre solo en la parte 1; la
  tablet NO existe en la parte 1 (Inés con el talonario); la bolsa vacía de P1 tiene el sticker, la del súper no; en Q1 la
  bolsa de la veterinaria con poco, en Q3 la nueva llena.
- **Física:** el hocico de Toto toca el borde del plato y lo empuja sin atravesarlo; la croqueta cae desde la boca de la
  bolsa; la bolsa en el hombro de Bruno sujeta con las manos; Toto echado contra la torre sin meterse en las bolsas; la
  correa de la mano de Vero al collar (vacunas: la correa quedaba al frente del collar).
- **Rig (vacunas):** sin lentes; ojos abiertos de 3/4 y perfil al hablar; sin doble boca en Vero; la oreja parada de Toto
  con volumen; nada que atraviese caras (burbujas y guías fuera de los ojos).
- **La solución ocupa la mitad:** parte 2 + cierre ≥ 20 s.
- **SFX nuevos** (suspiro de perro, olfateo, masticar croquetas) reales CC0 con autor, sitio y licencia en `fuentes.md`;
  nunca sintetizados.

## Voces (partes/*.txt; detalle en partes/voces.md, a escribir en la etapa 2)
Vero = Callirrhoe · Inés = Sulafat · Bruno = Schedar · narrador del cartel = Rasalgethi (audio reusado de
tienda-tenes-stock). 8 archivos a generar: `01-vero` "Uy. Se terminó." · `02-vero` "Bueno, Toto. Al súper." ·
`03-ines` "¡Vero! ¿Qué está comiendo Toto?" (se reusa idéntico en Q4) · `04-vero` "La que me recomendaste. La compro en el
súper." · `05-vero` "¿Me la anotás? Así no me equivoco." · `06-vero` "¿Cómo sabe?" · `07-bruno` "¡Ración para Toto!" ·
`08-vero` "La que me recomendaste. Me llega sola." (misma entonación que 04 en la primera frase; si no sale, pegar la
primera mitad de 04 con "Me llega sola." nuevo) · `09-ines` "Comentá RACIÓN y te mando cómo funciona para tu veterinaria."

## Portada
`portada.json`: `chica` **"Domingo, 21:40."** · `grande` **"¿En el súper?"** (lo que la dueña de la veterinaria escucha
y se repite) · `sello` **"VETERINARIAS"**. Fondo limpio (sin gancho, burbujas, chips, rótulos ni logo) de P1 (~1,0 s):
Toto empujando el plato vacío con las cejas tristes y Vero dando vuelta la bolsa vacía de 15 kg con el sticker, todo en
la mitad de arriba. Alternativa: P4 (~12,8 s), la sonrisa quieta de Inés con Vero y Toto oliendo la torre (chica
"Febrero.", mismo grande). Ajustar `t` y `fondo_limpio` con el render.
