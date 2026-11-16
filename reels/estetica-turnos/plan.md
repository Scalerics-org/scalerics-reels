# estetica-turnos · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~34,4 s

**De qué trata.** CENTROS DE ESTÉTICA. Jueves de tarde en el centro de Lorena. A las **15:00 en punto** llega el audio
de Carolina: **"Ay, Lore, justo me surgió algo."** Lorena: "Tranqui." y tacha. A las 16, Mariana: "escribiendo…" y
nada. A las **17:00 en punto**, Jimena: **"¿Era hoy? Lo tenía para el jueves que viene."** Mientras tanto Vale, la
cosmetóloga, sin nada que hacer, dobla la toalla cada vez más elaborada: rollo, cisne, dos cisnes con los cuellos en
corazón. Pausa con el costo en pantalla (3 turnos, 3 horas de camilla vacía, $ 5.400 que no entraron, a Vale se le paga
igual). Lorena: **"Lo único puntual hoy fueron las excusas."** Remate del remate: Carolina otra vez, "¿me guardás el
jueves que viene? Esta vez voy."; Lorena: "Te lo guardo." y Vale agarra otra toalla y empieza el próximo cisne. Cartel
**"Una agenda online más tarde…"**. Parte 2 (más de la mitad del reel): la misma pregunta de Carolina recibe un link;
reserva desde el celular y paga la seña; el miércoles le llega sola a cada clienta el recordatorio con "Confirmar /
Reprogramar"; Mariana reprograma y la lista de espera le avisa a Graciela, que toma el hueco ("¡Me lo quedo!"); el
jueves a las 15:00 en punto entra Carolina: **"¡Llegué! Pagué la seña, ¿cómo no voy a venir?"**; Lorena a Vale: **"Mirá
vos. Hoy le surgió venir."** Cierre: la agenda del jueves llena en verde, "Camilla vacía: 0 h", y Sofi de Scalerics en
videollamada: **"Comentá TURNOS y te mando cómo funciona para tu centro de estética."**

- **Producto:** agenda online + automatizaciones: la clienta reserva desde el celular y deja una seña; el día antes le
  llega sola un recordatorio por WhatsApp con "Confirmar / Reprogramar"; si alguien cancela o reprograma, la lista de
  espera le avisa a la siguiente y el hueco se llena solo. Se muestra funcionando en la parte 2 (interfaz recreada) y se
  nombra en la línea chica final y en descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** chat genérico (burbujas crema/navy, sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" puede
  ir en un rótulo de texto), celulares sin logo, botón "Pagar seña" sin logo de ningún medio de pago, frascos y cremas
  sin marca (etiqueta crema lisa con una hoja dibujada), el centro se llama "Lorena Estética" (inventado).
- **Estructura** como `reels/abren-hoy-completo` / `reels/dice-cuarenta`: parte 1 (14,4 s) + cartel (2,5 s) + parte 2
  (17,5 s, la solución, con el cierre adentro). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`.
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), texto en tres
  renglones como el de `reels/las-siete-y-cincuenta-y-nueve`: **"Una agenda" / "online" / "más tarde…"**. Toma NUEVA de
  Rasalgethi ("Una agenda online más tarde."), mismo tono y largo que `reels/las-siete-y-cincuenta-y-nueve/assets/voice/narrador.wav`.
- **Rubén NO aparece** (no es distribuidora). Graciela sí (ELENCO.clienta), en la lista de espera.
- **Quién dice "Comentá TURNOS": Sofi** (ELENCO.sofi, la de Scalerics, voz Achernar como en `trabajar-con-scalerics`).
  Por qué: (1) "te mando cómo funciona" es primera persona de Scalerics: lo dice quien de verdad va a contestar el
  comentario, y no una dueña inventada haciendo de testimonio; (2) Lorena termina en su remate ("Hoy le surgió venir")
  sin pasar a vendedora; (3) Sofi ya es del elenco y es la cara de "videollamada"; (4) aparece como videollamada en un
  celular parado sobre la recepción, al lado de la agenda verde: la solución sigue en pantalla mientras habla. Si el
  constructor no llega con Sofi, alternativa: la línea en la voz de Lorena mirando a cámara ("Comentá TURNOS y te
  cuento cómo lo armé"), con el mismo plano.

## Paleta y set (para "Hechos")
**Centro de estética de día, todo en claro: paredes crema `#efeee5` lisas, zócalo y muebles navy `#16243d`/`#1f3254`,
toallas y sábana blanco-crema, acentos verde `#5ce611` (el ambo de Vale, la planta, los ✓), luz de tarde que entra por
una persiana (franjas planas, sin degradé).** Es el primer reel de la línea fuera de la distribuidora y el primero con
el set entero en claro: distinto de dice-cuarenta (depósito navy claro), la-lista (oficina de noche), ya-lo-cargo y
anotamelo (almacén). Anotar en "Hechos": "centro de estética de día, gabinete y recepción crema #efeee5 con muebles navy
y persiana; toallas que se doblan en cisnes; parte 2 igual + interfaz de reserva/recordatorio/lista de espera; cartel
verde".
- **Texto en pantalla:** navy sobre crema, crema sobre navy. Nunca blanco sobre la pared crema. Los rótulos con línea
  guía en caja navy con texto crema.
- **Rojo apagado `#c7655b` SOLO para el problema:** las tachaduras de la agenda, el "$ 5.400 que no entraron", el
  "escribiendo…" que desaparece (gris). **Verde `#5ce611` para lo resuelto:** ✓, "Turno reservado", "Confirmar", la
  agenda llena, "Camilla vacía: 0 h", el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  Los audios: burbuja de audio genérica (botón play, onda de barras navy, duración "0:02") con avatar redondo de la
  clienta (su cara 3D renderizada chica), nombre y **la hora bien grande** ("15:00", "17:00"): la hora es el chiste de
  "puntual". Debajo del audio, el texto de lo que dice (se entiende sin sonido).

## Personajes nuevos (agregar a ELENCO, mismo estilo; peinados que ya existen en personajes.js)
- **Lorena · `ELENCO.lorena`** (dueña del centro, ~45 años, voz Kore). Pelo castaño cobrizo `0x7a4a2e` en
  `peinado: "mediaCola"` (suelto a los hombros con rodetito atrás), piel `PIEL.trigueña`, cejas finas (`cejaFina: true`,
  `cejasColor: 0x4a2e1e`), pestañas `0x1a1414`, labios `0xa8484f`, aros crema chicos `MARCA.cr`, mejillas `0xd98a7a`.
  **Chaqueta de estética navy** `MARCA.navy3` de manga larga, sin cuello de camisa (`cuello: null, cuelloBotones:
  false, cuelloAlto: 0.08`), con una franja verde de marca `franja: MARCA.g` en el cruce; pantalón navy `MARCA.navy`,
  zapatos crema `MARCA.cr`. `panza: 1.02, nariz: 0.05, alto: 0.98`. Siempre con la agenda de papel (parte 1) o el
  celular en la mano. Expresión base: `incredula`/`fastidio` contenido en la parte 1, `sonrisa` en la parte 2. Nada de
  gritos ni manos a la cabeza: es una dueña que ya lo vio mil veces.
- **Vale · `ELENCO.vale`** (cosmetóloga, ~25 años, sin voz). Pelo negro `PELO.negro` en `peinado: "coletaAlta"`, piel
  `PIEL.clara`, pestañas, cejas `0x2a2220`, labios `0xc0606a`, aros verdes chicos. **Ambo verde de marca** completo:
  `camisa: MARCA.g, mangas: "cortas", cuello: null, cuelloBotones: false, cuelloAlto: 0.06, franja: MARCA.navy`,
  `pantalon: MARCA.gd` (verde oscuro), zapatos crema. `panza: 0.96, alto: 0.95`. En la parte 1 sentada en el banquito
  de ruedas, doblando toallas con cara de nada (`concentrada` → `resignado`); en la parte 2 de pie, trabajando.
- **Carolina · `ELENCO.carolina`** (clienta, ~32 años, voz Leda). Pelo rubio `PELO.rubio` en `peinado: "coleta"`
  (coleta baja), piel `PIEL.media`, labios `0xb5555a`, campera corta crema `MARCA.cr` con cuello navy, pantalón navy,
  zapatillas crema, **cartera verde oscuro** `MARCA.gd` al hombro (objeto simple: RoundedBox con correa). En la parte 1
  solo como avatar redondo en sus audios; en la parte 2 entra al centro (Q4) y su celular sale en el inserto (Q1).
- **Jimena** (clienta, voz Despina) y **Mariana** (sin voz): solo como avatar redondo en las burbujas. Pueden ser
  variantes rápidas de DEFECTO (Jimena: pelo castaño `corto` con flequillo; Mariana: pelo negro `rodete`, lentes navy).
  Que no se parezcan a Lorena, Vale ni Carolina.
- **Reusados:** Graciela (`ELENCO.clienta`, rulos lila, lentes, cárdigan verde) en su living tocando el celular (Q3);
  Sofi (`ELENCO.sofi`) en la videollamada del cierre (Q5), plano medio, auriculares verdes, fondo navy liso con el
  logo de Scalerics chico.

## Objetos 3D (el set del centro es nuevo; específicos, que nadie los confunda con un consultorio médico)
- **Gabinete (set principal):** cuarto chico de paredes crema, zócalo navy, piso de vinílico gris-crema plano, una
  ventana con **persiana americana** (láminas crema, la luz de tarde entra en franjas planas sobre la pared), una planta
  en maceta navy (hojas verdes de marca, tipo sansevieria) en el rincón, cuadrito con una hoja dibujada.
- **Camilla de estética:** base de patas metálicas navy, colchoneta tapizada crema en tres tramos con el respaldo
  levantado (~30°), **sábana blanca estirada** con el borde doblado, **toalla enrollada** en la cabecera y el agujerito
  para la cara NO (es facial, no masajes). Es el objeto protagonista de la parte 1: vacía, impecable, para nadie.
- **Lámpara lupa:** pie con ruedas navy, brazo articulado de dos tramos (con resorte a la vista), cabezal en aro grande
  crema con la lente (vidrio celeste muy transparente) y el tubo de luz circular prendido (emisivo crema). Se reconoce al
  toque: es LA lámpara de cosmetóloga. Zumbido de fondo en la pausa.
- **Carrito auxiliar:** tres bandejas navy con ruedas: frascos de vidrio (crema/verde pálido, tapa navy), pomos,
  algodones en un bowl, pincel de máscara, un **vaporizador facial** (cuerpo crema con el pico) al costado.
- **Banquito de cosmetóloga:** asiento redondo navy con ruedas y aro para los pies. Vale sentada.
- **Estante de toallas:** repisa con toallas blancas y verde pálido **enrolladas** en pila (6-8), de donde Vale saca la
  nueva al final de la parte 1.
- **Toallas que se doblan (EL gag):** (1) toalla doblada en cuadrado en las rodillas de Vale (cuadro 0); (2) rollo;
  (3) **cisne de toalla** (el clásico: cuerpo de rollo y cuello en S, cabeza en punta), blanco, con volumen; (4) dos
  cisnes enfrentados con los cuellos formando un **corazón**. Cada transformación con un pop corto y "tela" (no aparecen
  de golpe: Vale los manipula). En la parte 2 los dos cisnes quedan de adorno en el estante de la recepción.
- **Reloj de pared:** redondo, marco navy, esfera crema, números grandes Lexend 800, agujas navy y segundero verde.
  Siempre que el tiempo importa está en cuadro: 15:00 (cuadro 0), corre a 16:00 (agujas rápidas, P2), 17:00 en punto
  (P3), 15:00 en punto otra vez (Q4). La hora tiene que leerse.
- **Agenda de papel:** anillada, tapa navy, hoja crema con renglones, encabezado **"JUEVES"** en Lexend 800 navy, tres
  renglones manuscritos (Caveat o similar, navy, ≥ 44 px en el plano donde se lee): "15:00 Carolina · limpieza facial",
  "16:00 Mariana · peeling", "17:00 Jimena · depilación". Tachaduras en rojo apagado que se dibujan (trazo grueso,
  8 px). Lapicera navy en la mano de Lorena. En P6 da vuelta la hoja: otro "JUEVES" y anota "15:00 Carolina".
- **Recepción:** mostrador navy con tapa crema, la agenda de papel (parte 1) / **una tablet apoyada en atril** (parte 2),
  un frasquito con tarjetas, una planta chica, el timbre de la puerta (campanita colgada sobre la puerta de vidrio con
  "Lorena Estética" en vinilo crema). Sillón de espera crema y una mesita con revistas (tapas lisas de colores de marca).
- **Celular de Lorena** (crearCelular de ya-lo-cargo/anotamelo): pantalla canvas con el chat.
- **Celular de Carolina** (el mismo modelo, funda verde oscuro): la reserva.
- **Celular parado de la videollamada** (Q5): apoyado en un soporte sobre el mostrador, pantalla con Sofi.
- **Living de Graciela (Q3, set chico):** sillón crema, lámpara de pie, cortina navy, Graciela con el celular y los
  lentes. Un solo plano corto (≤ 1,3 s); si no da el tiempo, Graciela va solo como avatar en el inserto de su celular.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final, celular ≥ 60 % del cuadro en los insertos)
**Parte 1 · chat de Lorena** (encabezado navy con el nombre de la clienta, fondo crema):
- Carolina · audio 0:02 · **15:00** · debajo, en texto: "Ay, Lore, justo me surgió algo."
- Mariana · mensaje de Lorena (burbuja verde pálido, derecha): "Mariana, ¿venís? Te esperamos a las 16." · 16:05 ✓✓ ·
  arriba "escribiendo…" (16:06) que aparece 0,8 s y se apaga. Nada más.
- Jimena · audio 0:03 · **17:00** · "¿Era hoy? Lo tenía para el jueves que viene."
- Carolina · audio 0:03 · 17:52 · "Lore, ¿me guardás el jueves que viene? Esta vez voy."
**Parte 1 · rótulos de la pausa (P4):** caja navy, texto crema, línea guía: a la agenda "3 turnos · 3 horas de camilla
vacía" y debajo, en rojo apagado, "$ 5.400 que no entraron" (limpieza facial $ 1.800 + peeling $ 2.200 + depilación
$ 1.400: números del caso, no estadística); a Vale: "A Vale se le paga igual".
**Parte 2 · Q1 · respuesta de Lorena:** burbuja "Te mando el link." + tarjeta de link "Lorena Estética · Reservá tu turno".
**Parte 2 · Q1 · celular de Carolina, página de reserva** (fondo crema, encabezado navy "Lorena Estética"):
"Limpieza facial · 60 min · $ 1.800" · tira de días "Mar · Mié · **Jue** · Vie" · horas "14:00 · **15:00** · 16:00" (la
elegida se pone en verde) · "Seña para reservar: $ 500" · botón verde "Pagar seña" · resultado: **"Turno reservado ✓"**
/ "Jueves 15:00 · con Vale". Rótulo HTML: "Reserva online con seña".
**Parte 2 · Q2 · recordatorio automático** (chip arriba: "Miércoles · 15:00"; rótulo: "Recordatorio automático · el
día antes"): tres celulares en tríptico, mismo mensaje con su hora: "Hola, Carolina. Te esperamos mañana jueves a las
15:00 para tu limpieza facial con Vale." · botones **"Confirmar"** (verde) y **"Reprogramar"** (crema con borde navy).
Carolina → "Confirmado ✓"; Jimena (17:00, depilación) → "Confirmado ✓"; Mariana (16:00, peeling) → "Reprogramar" →
"Martes 10:00 ✓".
**Parte 2 · Q3 · lista de espera:** la tablet de la recepción, agenda "JUEVES": el bloque de las 16:00 pasa a
"Libre" (punteado) y debajo "Avisando a la lista de espera…" · al celular de Graciela: "Se liberó un turno: jueves
16:00 · Peeling · ¿Lo querés?" · botón verde **"Lo quiero"** · "Reservado ✓ · seña paga" · en la tablet: "16:00
Graciela ✓ · lista de espera" · chip verde "Hueco cubierto en 2 minutos". Rótulo HTML: "Lista de espera".
**Parte 2 · Q5 · la agenda del jueves llena** (tablet, ≥ 60 % del cuadro al principio del plano): "JUEVES" · "15:00
Carolina · limpieza facial ✓ seña" · "16:00 Graciela · peeling ✓ lista de espera" · "17:00 Jimena · depilación ✓
confirmó" · abajo, grande y verde: **"Camilla vacía: 0 h"**.
**Cierre (capa HTML):** "Comentá **TURNOS**" grande (Lexend 900, TURNOS en el recuadro verde), sobre la escena (no
tarjeta de videollamada: la acción es comentar); en los últimos 0,8 s, abajo chico: "Agenda online con seña y
recordatorios" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-14,40 s)
Cámara continua en el centro, a la altura de los ojos de Lorena; el gabinete se ve desde la puerta (Lorena de espaldas
o de tres cuartos en primer término, la camilla y Vale al fondo, el reloj en la pared).

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-2,70 | **P1 · cuadro 0.** Desde atrás del hombro de Lorena en la puerta: la camilla vacía llena el centro, Vale en el banquito a la derecha con la toalla en las rodillas, el reloj 15:00 arriba a la izquierda, la lámpara lupa prendida. Push-in lento hacia la camilla. | **Cuadro 0:** arriba, enorme, **"CENTROS DE ESTÉTICA"** (Lexend 900, ~120 px, navy sobre la pared crema con "ESTÉTICA" en el recuadro verde); ya en pantalla el audio de Carolina con la hora **15:00**. 0,30-2,00 · **Carolina (audio): "Ay, Lore, justo me surgió algo."** 2,10-2,60 · **Lorena: "Tranqui."** (sin drama). 2,60 · tacha "15:00 Carolina" en rojo apagado. Vale enrolla la toalla. | gabinete, camilla, lámpara lupa, carrito, banquito, reloj, persiana, Vale, Lorena, agenda, celular | ambiente: música liviana tipo spa (ironía, bajita) + zumbido de la lámpara · notification 0,25 · play de audio (click-soft) 0,28 · tachadura (lapicera: `k-page-turn` corto o rasguido CC0) 2,60 · tela (`k-cloth_1`) 2,65 |
| 2,70-5,30 | **P2 · el reloj corre.** Plano al reloj de pared con Vale debajo; las agujas giran rápido 15:01 → 16:00. Inserto del celular de Lorena. | 3,00 · Lorena escribe "Mariana, ¿venís? Te esperamos a las 16." ✓✓ 16:05 · 3,90 · "escribiendo…" aparece · 4,70 se apaga · nada. 4,90 · tacha "16:00 Mariana". Vale: el rollo se vuelve **cisne**. | reloj, Vale, toalla→cisne, celular, agenda | tic-tic rápido del reloj (`k-tick-*`) · key-press al escribir · enviado (whoosh-short chico) · tachadura 4,90 · tela + pop suave del cisne |
| 5,30-7,60 | **P3 · 17:00 en punto.** Plano medio de Lorena con el celular; el reloj marca 17:00 atrás. | 5,50-7,50 · **Jimena (audio): "¿Era hoy? Lo tenía para el jueves que viene."** 7,30 · tacha "17:00 Jimena". Vale termina el segundo cisne y los junta: **corazón**. | Lorena, celular, reloj, agenda, Vale con 2 cisnes | notification 5,35 · click-soft 5,45 · tachadura 7,30 · tela + pop 7,40 |
| 7,60-8,80 | **P4 · la pausa.** Plano general del gabinete desde la puerta: la camilla vacía al centro, Vale con los dos cisnes en corazón, Lorena con la agenda tachada en primer término. Cámara quieta. | Silencio de centro de estética: la música baja a -12 dB en 0,4 s (no se corta), zumbido de la lámpara, tic del reloj. 7,80 · rótulos con línea guía: "3 turnos · 3 horas de camilla vacía" / "$ 5.400 que no entraron" (rojo apagado) a la agenda; "A Vale se le paga igual" a Vale. | todo el gabinete | zumbido + tic · pop chico por rótulo |
| 8,80-10,90 | **P5 · el remate.** Push-in a primer plano de Lorena (la camilla vacía desenfocada atrás). | 9,00-10,80 · **Lorena: "Lo único puntual hoy fueron las excusas."** (seca, grave, sin levantar la voz). | Lorena, agenda | ninguno (la música vuelve en 10,90) |
| 10,90-14,40 | **P6 · remate del remate.** Plano medio de Lorena con la agenda; Vale al fondo. | 11,00-13,10 · vibra: **Carolina (audio, 17:52): "Lore, ¿me guardás el jueves que viene? Esta vez voy."** Lorena da vuelta la hoja (otro "JUEVES") y anota "15:00 Carolina". 13,20-13,80 · **Lorena: "Te lo guardo."** 13,80 · al fondo, Vale deja los cisnes en la camilla, saca una toalla nueva del estante y empieza a doblar el próximo, cara de nada. 14,30 stinger. | Lorena, celular, agenda (hoja nueva), Vale, estante de toallas, cisnes | notification 10,95 · vuelta de hoja (`k-page-turn`) 12,90 · lapicera 13,00 · tela 13,90 · stinger 14,30 |

## CARTEL (14,40-16,90 s)
Time card de dibujito de siempre: **"Una agenda" / "online" / "más tarde…"**. Narrador Rasalgethi (toma nueva). Nunca
"Scalerics".

## PARTE 2 · resuelto (16,90-34,40 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 16,90-20,40 | **Q1 · callback.** La recepción, Lorena detrás del mostrador con la tablet; en el estante, los dos cisnes de adorno. Inserto del celular de Carolina. | 17,00 · burbuja de Carolina (sin voz, pop): "Lore, ¿me guardás el jueves que viene?" · 17,60-18,40 · **Lorena: "Te mando el link."** (sin levantar la vista, tranquila) · 18,40-20,40 · inserto: la página de reserva; Jueves 15:00 en verde; "Seña para reservar: $ 500"; "Pagar seña"; **"Turno reservado ✓"**. En la tablet de Lorena entra "15:00 Carolina ✓ seña". | recepción, mostrador, tablet, cisnes, Lorena, celulares | notification 16,95 · whoosh-short 18,30 · tap (click-soft) 19,40 · ding (`cero.mp3`) 19,80 |
| 20,40-23,60 | **Q2 · el recordatorio solo.** Chip "Miércoles · 15:00". Tríptico de tres celulares (los de Carolina, Mariana, Jimena, con sus avatares) que llenan el cuadro. | 20,60 · el mismo mensaje cae en los tres a la vez · 21,40 Carolina "Confirmar" → "Confirmado ✓" · 21,90 Jimena → "Confirmado ✓" · 22,40 Mariana → "Reprogramar" → "Martes 10:00 ✓" · 23,10 en la tablet el bloque de las 16:00 pasa a "Libre". | 3 celulares, tablet | notification ×3 (escalonadas) · click-soft ×3 · ding ×2 · whoosh 23,10 |
| 23,60-26,40 | **Q3 · lista de espera.** La tablet: "Avisando a la lista de espera…"; el aviso vuela a Graciela en su living (plano corto) / inserto de su celular. | 24,20 · "Se liberó un turno: jueves 16:00 · Peeling · ¿Lo querés?" · 24,80 Graciela toca **"Lo quiero"** · 25,10-25,90 **Graciela: "¡Me lo quedo!"** · 26,00 en la tablet: "16:00 Graciela ✓ · lista de espera" + chip "Hueco cubierto en 2 minutos". | tablet, Graciela, su celular, living | whoosh-short 24,10 · notification 24,25 · click-soft 24,80 · ding 26,00 |
| 26,40-30,80 | **Q4 · jueves 15:00, el mismo encuadre del cuadro 0.** El gabinete desde la puerta: reloj **15:00 en punto**, camilla con la toalla estirada (ni un cisne), Vale de pie lista. | 26,50 · suena la campanita de la puerta; entra Carolina con la cartera, sonriente. 26,80-29,00 · **Carolina: "¡Llegué! Pagué la seña, ¿cómo no voy a venir?"** · Vale la hace pasar a la camilla. 29,20-30,70 · Lorena, en la puerta, a Vale en voz baja, media sonrisa: **"Mirá vos. Hoy le surgió venir."** | gabinete, reloj, camilla, Vale, Carolina, cartera, Lorena | campanita de puerta 26,50 · pasos · tela 28,80 |
| 30,80-34,40 | **Q5 · la agenda llena + cierre.** La cámara sale del gabinete a la recepción y hace push-in a la tablet (≥ 60 % del cuadro): el jueves lleno en verde; al lado, el celular parado con **Sofi en videollamada**. | 30,90 · las tres filas se ponen verdes una por una (✓) y abajo **"Camilla vacía: 0 h"**. 31,00-34,00 · **Sofi: "Comentá TURNOS y te mando cómo funciona para tu centro de estética."** · en "TURNOS" entra grande **"Comentá TURNOS"** (capa HTML). 33,60 · línea chica: "Agenda online con seña y recordatorios" / "scalerics.com". | recepción, tablet, celular parado con Sofi, cisnes en el estante | ding por fila (escalonados) · pop en "TURNOS" · final de la música |

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "CENTROS DE ESTÉTICA" entero y legible, la camilla vacía y Vale esperando en el mismo cuadro, el reloj
  en 15:00, el audio de Carolina con la hora visible. Que se lea "centro de estética" y no "consultorio médico" (lámpara
  lupa, carrito con frascos, toallas, persiana; nada de instrumental quirúrgico ni camilla de hospital).
- **Las toallas:** que el cisne se lea como cisne (cuello en S, cabeza en punta) y el corazón de los dos cuellos se vea
  de frente; que no atraviesen las manos de Vale ni la camilla; que cada cambio sea manipulación, no pop de la nada.
- **El reloj:** la hora se lee en P1, P3 y Q4 (15:00, 17:00, 15:00); las agujas no tiemblan.
- **La agenda:** los tres renglones se leen; las tachaduras se dibujan en rojo apagado y quedan; la hoja nueva de P6.
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp,
  botón de pago sin logo; los ✓ verdes; la tablet final con "Camilla vacía: 0 h".
- **Continuidad:** los dos cisnes de la parte 1 están de adorno en la recepción en toda la parte 2; Carolina igual en el
  avatar y en persona; Lorena siempre con la chaqueta navy y la franja verde; Vale siempre con el ambo verde.
- **Sofi:** ELENCO.sofi (no un personaje nuevo), ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` ≈ 7,9 (P4: la camilla vacía, Vale con los dos cisnes en corazón, Lorena con la agenda tachada; renderizar sin
gancho, rótulos, subtítulos ni burbujas). `chica`: "Jueves a las 17." · `grande`: "¿Era hoy?" (la frase que la dueña
escucha, 2 palabras entre signos, como "¿Yo te debía?") · `sello`: "ESTÉTICA". Alternativa de `grande`: "Me surgió algo".
