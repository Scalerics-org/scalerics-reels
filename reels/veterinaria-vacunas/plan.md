# veterinaria-vacunas · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~37,2 s

**De qué trata.** VETERINARIAS. Marzo en "Veterinaria Inés". Toto, un mestizo caramelo de oreja caída, recién vacunado
sobre la mesa de acero. Vero, su dueña: **"Doctora, ¿y cuándo le toca la próxima?"** Inés, escribiendo la ficha de
cartón: **"Yo le aviso."** y la guarda adelante de todo en el fichero: plac. Pasan abril, mayo, junio sin sonido: el
consultorio a full, fichas nuevas que entran delante, la ficha de Toto que se hunde en el fichero, una noche Inés llama
y ladra la sala y cuelga, las pestañas rojas de "VENCIDA" se multiplican (12 → 31 → 63). Bruno, con el fichero que ya no
cierra: **"Doctora, ¿y los avisos de las vacunas?"** / Inés: **"El que quiere a su perro, se acuerda."** Julio: entra Vero
con Toto, que trae un pañuelo nuevo de otra veterinaria: **"¡Doctora! A Toto le escribieron de la de la vuelta. Ya está
vacunado."** Pausa con el costo (63 vacunas vencidas, $ 94.500 que no volvieron). Inés se asoma por el mostrador y mira a
Toto, que la mira con las orejas gachas: **"¿Vos también, Toto?"** Remate del remate: Toto, culpable, le da la pata, e
Inés se la da, seca. Cartel **"Un recordatorio automático más tarde…"**. Parte 2 (la mitad del reel): el mismo "¿y cuándo
le toca la próxima?" (el mismo audio); Inés: **"Le vamos a escribir a él."** y guarda la ficha de Toto en la tablet. Un
año después, 5 días antes, a Vero le llega el recordatorio con el nombre de Toto y el botón del turno: **"¡Toto! ¡Te
escribieron!"**, toca "Sí, martes 10:00", turno reservado. En el panel: 63 recordatorios enviados, 48 turnos reservados,
vencidas 63 → 15, $ 72.000 en turnos. Bruno repite su pregunta (el mismo audio) y Inés: **"Ya salieron solos."** Martes
10:00: la sala de espera llena y en hora; entra Toto puntual, va solo al consultorio, e Inés, sonriendo: **"¿Vos también,
Toto?"** Toto le da la pata, ahora contento. Cierre: el panel en verde y Sofi en videollamada: **"Comentá VACUNA y te
mando cómo funciona para tu veterinaria."**

- **Producto:** automatización + sistema a medida para la veterinaria: la **ficha de cada paciente** en la tablet (foto,
  especie y edad, vacunas, desparasitación, próxima fecha, dueño y teléfono); el **recordatorio automático por WhatsApp**
  unos días antes de la fecha, con el nombre de la mascota y botones para reservar el turno ("Sí, martes 10:00" / "Elegir
  otro día"); el turno queda en la agenda solo; si no contesta, sale un segundo aviso; y un **panel** de cuántos vuelven a
  tiempo (recordatorios enviados, turnos reservados, vencidas, plata en turnos). Se muestra funcionando en la parte 2
  (interfaz recreada) y se nombra en la línea chica final y en descripcion.txt. El cartel nunca dice "Scalerics".
- **Sin marcas:** vacunas genéricas (frasquito crema con etiqueta lisa "VACUNA" y tapa verde; nada de laboratorio), ración
  en bolsa kraft lisa con un hueso navy dibujado y la palabra "RACIÓN", chat genérico (burbujas crema/navy, sin el verde
  ni el logo de WhatsApp; la palabra "WhatsApp" solo en un rótulo de texto), celulares y tablet sin logo. La clínica se
  llama "Veterinaria Inés" (inventado). La otra veterinaria nunca se nombra ni se muestra: solo "la de la vuelta" y el
  pañuelo rojo apagado liso, sin texto.
- **Sin datos de afuera:** el guion no dice cada cuánto se vacuna ni que sea obligatorio (ver fuentes.md). Las fechas y
  montos son del caso.
- **Estructura** como `reels/taller-presupuestos`: parte 1 (15,8 s) + cartel (2,5 s) + parte 2 (18,9 s, la solución,
  con el cierre adentro: 51 %). Un proyecto 3D con gen.mjs (T1/T2), como taller-presupuestos y estetica-turnos.
- **Cartel:** el time card de siempre (fondo verde de marca con manchas y burbujas, letras que rebotan), en tres renglones:
  **"Un recordatorio" / "automático" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si queda larga (> 2,6 s), se reusa "Un
  sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel dice "Un sistema" / "más tarde…".
- **Rubén NO aparece** (no es distribuidora). Ningún personaje del elenco salvo Sofi.
- **Quién dice "Comentá VACUNA": Sofi** (ELENCO.sofi, voz Achernar), como en taller-presupuestos y estetica-turnos: lo
  dice quien contesta el comentario; Inés termina en su remate feliz sin pasar a vendedora; Sofi aparece en un celular
  parado al lado de la tablet con el panel en verde. Alternativa si no se llega con Sofi: Inés a cámara, "Comentá VACUNA
  y te cuento cómo lo armé", con el mismo plano.

## Paleta y set (para "Hechos")
**Consultorio veterinario de mañana, limpio y frío: pared de azulejos verde de marca apagado `#365f28` hasta 1,8 m
(cuadrados de 15 cm con juntas apenas marcadas, color plano, sin brillo especular fuerte) y arriba pintada navy
`#0b1220`; mesa de consulta de acero inoxidable `#b9bec4` (metalness media, roughness alta para que no haga brillos
que se rompan en Instagram) con la goma antideslizante crema; mesada crema `#efeee5` con frente navy3; piso vinílico
crema `#d9d7c9` plano; luz fría pareja de un tubo de techo (panel emisivo crema), sin degradés ni polvo flotando. A la
derecha, el mostrador de recepción (frente navy3, tapa crema) y la vidriera a la calle con "VETERINARIA INÉS" en
vinilo crema (que se lea al derecho desde adentro: el cartel va en un panel colgado adentro, no en el vidrio).** Distinto
de taller (bloques navy claro, de día con portón), parrilla (noche cálida, madera), estética y distribuidora (paredes
crema). Anotar en "Hechos": "consultorio veterinario, azulejo verde apagado #365f28 con pared navy arriba, mesa de acero,
piso crema, luz fría; el fichero de cartón con pestañas rojas y la ficha de Toto que se hunde; Toto mestizo caramelo;
parte 2 igual + ficha/recordatorio/panel; cartel verde".
- **Texto en pantalla:** crema sobre la pared navy (arriba) y sobre las cajas navy; navy sobre crema. Nunca blanco ni
  crema sobre el azulejo verde apagado sin caja (poco contraste): "VETERINARIAS" del cuadro 0 va sobre la franja navy de
  arriba o en caja navy.
- **Rojo apagado `#c7655b` SOLO para el problema:** las pestañas "VENCIDA" del fichero, "Vencidas: 63", "$ 94.500 que no
  volvieron", "Vacunado a la vuelta", el pañuelo de Toto de la otra veterinaria, el 63 del panel antes de girar. **Verde
  `#5ce611` para lo resuelto:** ✓, "Sí, martes 10:00", "Turno reservado", "Turnos reservados: 48", "$ 72.000", "Llamadas
  a mano: 0", la chapita del collar de Toto en la parte 2, el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  "¿Vos también, Toto?" en las dos partes con la MISMA burbuja (mismo lugar, mismo tamaño), para que se lea el callback.
- **Chips de mes** (el reloj de este chiste, en lugar de días u horas): caja navy, Lexend 900 crema, arriba a la izquierda:
  MARZO, ABRIL, MAYO, JUNIO, JULIO; en la parte 2 "Un año después · 5 días antes" y "MARTES · 10:00".

## Personajes nuevos (agregar a ELENCO, mismo estilo; solo parámetros y peinados que ya existen en personajes.js)
- **Inés · `ELENCO.ines`** (la doctora, dueña de la veterinaria, ~45, voz Sulafat). Piel `PIEL.clara`, pelo castaño
  entrecano `0x7d6a5c` en `peinado: "coleta"` baja (que no se parezca a Lorena, cobriza de melena, ni a Marta, de rodete
  negro), `cejaFina: true, cejasColor: 0x5a4636`, **lentes `MARCA.navy3`**, pestañas, mejillas `0xe39282`, labios
  `0xa8484f`. **Ambo verde oscuro** `camisa: MARCA.gd, mangas: "cortas", cuello: MARCA.cr` (cuello en V crema si el módulo
  lo permite; si no, `cuello: null` con `franja: MARCA.cr`), `pantalon: MARCA.gd` (se lee como un ambo entero), zuecos
  crema `MARCA.cr`. `panza: 1.0, nariz: 0.05, alto: 0.98`. Detalles con objetos simples: **estetoscopio** navy al cuello
  (tubo en U por detrás del cuello, campana gris acero en el pecho; que no atraviese la barbilla al girar la cabeza) y una
  lapicera en el bolsillo. Expresión base: `sonrisa` contenida en P1-P3, `incredula` y después `resignado` leve en P5-P7
  (nada de llanto ni manos a la cabeza), `sonrisa`/`feliz` en la parte 2.
- **Vero · `ELENCO.vero`** (dueña de Toto, ~38, voz Callirrhoe). Piel `PIEL.morena`, pelo negro `PELO.negro` en
  `peinado: "rulos"` (que no se parezca a Graciela: Graciela es clara, lila y con lentes; Vero sin lentes, más joven),
  `cejaFina: true`, aros crema, mejillas `0xb8644e`, labios `0x8e3f3c`. Buzo crema `MARCA.cr2` con **campera** `{ color:
  MARCA.navy2, cuello: MARCA.cr, abierta: true }`, jean `0x3a4a66`, zapatillas crema. `panza: 0.98, alto: 0.97`. Siempre
  con **la correa verde oscuro** de Toto en la mano (en P4 además la bolsa de ración). Buena onda total, nunca culpable.
- **Bruno · `ELENCO.bruno`** (ayudante y recepción, ~24, voz Sadachbia). Piel `PIEL.media`, pelo castaño `PELO.castaño` en
  `peinado: "texturado"` con `texturaAlto: 0.8`, barba de pocos días (`barba: 0x4a3222, barbaLarga: 0.35, barbaOpacidad:
  0.4`), cejas `0x4a3222`. **Chaqueta de recepción navy** `camisa: MARCA.navy3, mangas: "largas", cuello: MARCA.cr`,
  `franja: MARCA.g`, pantalón `MARCA.navy`, zapatillas crema. `panza: 0.95, alto: 1.02`. Que no se parezca a Nico ni a
  Maxi. En P3 con el fichero en brazos; en Q3 con la tablet.
- **Toto · `crearPerro()` (NUEVO, módulo aparte `assets/perro.js`, mismo lenguaje low-poly de juguete que los
  personajes: formas redondeadas, color plano, ojos grandes brillantes).** Mestizo mediano, **caramelo** `0xc8894a` con el
  **hocico, el pecho y la punta de la cola blancos-crema** `0xefe6d6`, nariz negra brillante, **oreja derecha parada y la
  izquierda caída** (el rasgo que lo hace Toto: que se vea en todos los planos), ojos marrón oscuro con brillo y **cejas
  de perro** (dos manchitas crema arriba de los ojos que suben y bajan: es lo que hace las caras), **collar navy con
  chapita** (redonda, crema en la parte 1, verde de marca en la parte 2) y, solo en P4-P7, el **pañuelo triangular rojo
  apagado** al cuello. Parámetros por tiempo: `cola` (0..1, frecuencia de la batida), `orejas` (0 gachas..1 alertas; la
  caída sigue caída, pero se mueve), `cabezaLadeo` (el ladeo de perro de Q2), `pata` (0..1, levanta la pata delantera
  derecha hacia adelante, P7 y Q4), `sentado` (0..1), `paso` (camina, P4 y Q4), `jadeo` (lengua rosa afuera, solo en la
  parte 2, contento). Proporción: sentado, la cabeza le llega a la cintura de Inés. **¿Alguien lo confunde con otra cosa?**
  Que no parezca un zorro (hocico más corto y ancho, orejas no puntiagudas las dos), ni un oso (patas finas, cola larga).
  Mirá sus snapshots de frente, perfil y 3/4 antes de armar los planos.
- **Pacientes de la sala (Q4, sin voz):** Luna (gata gris en una transportadora crema con rejilla navy; solo se ven ojos
  y orejas), Coco (perro chico blanco, variante de `crearPerro` más chico, con las dos orejas paradas) con su dueño
  (DEFECTO con `corto` canoso), Mora (cachorra negra en brazos de una dueña DEFECTO `coleta` castaño). Fichas de la
  escalada: solo nombres y siluetas en las pestañas.
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de estetica-turnos/taller: buzo navy claro con franja crema, la
  varilla del micrófono separada de la mejilla) en la videollamada del cierre (Q5), plano medio, auriculares verdes, fondo
  navy liso con el logo de Scalerics chico.

## Objetos 3D (el set es nuevo; específicos, que nadie lo confunda con un consultorio de humanos ni con un pet shop)
- **Consultorio (set principal):** la pared de azulejo verde apagado + navy arriba, **mesa de consulta de acero** (tapa
  rectangular con borde redondeado y goma crema, una columna central, base), la **mesada** crema con frente navy3; un
  **cartel de pared** placa crema "VETERINARIA INÉS" con una huellita navy (Lexend 800, que se lea de frente); un
  **póster** crema de la silueta de un perro con líneas navy (sin texto chico); una **balanza de piso** para perros
  (plataforma gris con la pantallita); un **frasco de premios** (vidrio con galletitas en forma de hueso crema, tapa
  verde) en la mesada.
- **El fichero de cartón (EL objeto de la parte 1):** caja de cartón kraft `0xc9a774` larga (~45 cm), sin tapa, con las
  fichas crema paradas y **pestañas de colores** arriba (navy normales; **rojas apagadas "VENCIDA"**, que se multiplican);
  un costado con una cinta de embalar vieja (sin texto). En P1 desbordado pero cerrable; en P3 Bruno lo lleva en brazos y
  ya no cierra (fichas que asoman torcidas); al apoyarlo escupe dos fichas (caen al piso). En la parte 2 ya no está en la
  mesada (en su lugar, el atril de la tablet); en Q5, al fondo, en un estante alto, con una planta encima: jubilado (sin
  subrayarlo).
- **La ficha de Toto (el objeto que viaja):** ficha crema A6, encabezado navy "FICHA", foto pegada de Toto (dibujo plano
  de la cara con la oreja caída), manuscrito en Caveat navy: "TOTO · Vero" · "Vacuna: hoy ✓" · **"Próxima: MARZO"**
  grande. En P2 la cámara la sigue mientras fichas nuevas entran delante (Luna, Coco, Negro, Mora, Simón, Pancho...) y se
  hunde hasta el fondo; en P2c Inés la tiene en la mano con el teléfono.
- **La jeringa y la vacuna:** jeringa sin aguja visible, con tapa crema, en una bandeja de acero riñón; el
  frasquito "VACUNA" crema con tapa verde. La curita en el lomo de Toto (rectángulo crema).
- **El teléfono de la clínica** (P2c): inalámbrico navy en su base sobre el mostrador.
- **Mostrador de recepción:** frente navy3, tapa crema, la vidriera detrás; en P4-P6 el fichero arriba, la bolsa de
  ración que trae Vero.
- **La sala de espera (Q4):** banco largo crema contra el azulejo, la transportadora de Luna, la balanza.
- **Celular de Vero** (crearCelular de ya-lo-cargo/anotamelo, funda navy2): el recordatorio. **Living de Vero** (Q2):
  sillón crema con almohadón verde, la ventana con luz de mañana, Toto echado en el sillón.
- **Tablet de Inés** en un atril sobre la mesada (parte 2): la ficha (Q1) y el panel (Q3, Q5).
- **Celular parado de la videollamada** (Q5): en un soporte sobre la mesada, pantalla con Sofi.

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final, celular/tablet ≥ 60 % del cuadro en los insertos)
**Parte 1 · P2 · chip del mes + contador de vencidas:** "ABRIL" "Vencidas: 12" · "MAYO" "Vencidas: 31" · "JUNIO"
"Vencidas: 63" (rojo apagado). En P2c (la noche): chip "JUNIO · 21:40".
**Parte 1 · rótulos de la pausa (P5):** caja navy, texto crema, línea guía al fichero: **"63 vacunas vencidas en el
fichero"** y debajo, en rojo apagado, **"$ 94.500 que no volvieron"** (63 × $ 1.500, precio inventado de la vacuna en
"Veterinaria Inés": número del caso, no estadística); al pañuelo de Toto: **"Vacunado a la vuelta"** (rojo apagado).
**Parte 2 · Q1 · la ficha de Toto en la tablet** (encabezado navy "Pacientes · Toto", fondo crema): foto de Toto (la
cara con la oreja caída) · "Mestizo · 6 años · Vero" · "Vacuna ✓ hoy" · **"Próxima: marzo"** · "Desparasitación ✓" ·
"Aviso por WhatsApp: activado ✓" (verde) · botón verde "Guardar" → "Guardado ✓". Rótulo HTML: "La ficha de cada paciente".
**Parte 2 · Q2 · recordatorio** (chip arriba: "Un año después · 5 días antes"; rótulo: "Recordatorio automático · 5 días
antes"): celular de Vero ≥ 60 %, encabezado navy "Veterinaria Inés": **"Hola, Vero. A Toto le toca la vacuna. ¿Te reservo
el martes a las 10:00?"** · botones **"Sí, martes 10:00"** (verde) y "Elegir otro día" (crema con borde navy) · toca Sí ·
**"Turno reservado ✓ · Martes 10:00"**.
**Parte 2 · Q3 · el panel** (tablet ≥ 70 % del cuadro, encabezado "Vacunas de marzo"): **"Recordatorios enviados: 63 ✓"**
· lista con tildes que se prenden de a una (Luna ✓, Coco ✓, Mora ✓, Simón ✓, Toto ✓ martes 10:00) · **"Turnos
reservados: 48"** (sube 0 → 48) · **"Vencidas: 63 → 15"** (el 63 rojo apagado gira y queda el 15 crema) · **"$ 72.000 en
turnos reservados"** (verde, 48 × $ 1.500) · chip chico "Segundo aviso: mañana" junto al 15 (borde navy, no rojo).
**Parte 2 · Q5 · el panel + cierre:** "Turnos reservados: 48 ✓", "Vencidas: 15" y **"Llamadas a mano: 0"** (verde).
**Capa HTML:** "Comentá **VACUNA**" grande (Lexend 900, ~140 px, VACUNA en el recuadro verde), sobre la escena; en los
últimos 0,8 s, abajo chico: "Ficha de cada mascota con recordatorio automático" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-15,80 s)
Cámara continua en el consultorio, a la altura de la mesa (baja: el perro tiene que estar grande); el eje del set: mesa de
acero al centro, mesada con el fichero a la izquierda, mostrador y vidriera a la derecha.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-3,10 | **P1 · cuadro 0.** Plano medio desde la altura de la mesa: Toto sentado sobre la mesa de acero, grande, de 3/4 (la oreja caída hacia cámara), Vero a la derecha acariciándolo, Inés a la izquierda con la ficha en la mano; el fichero desbordado en la mesada, a la izquierda en primer término. Push-in lento. | **Cuadro 0:** arriba, enorme, **"VETERINARIAS"** (Lexend 900, ~130 px, crema sobre la franja navy, "VETERINARIAS" con el recuadro verde de selección en la mitad derecha o entera); chip "MARZO". La jeringa ya en la bandeja, la curita en el lomo. 0,30-1,90 · **Vero: "Doctora, ¿y cuándo le toca la próxima?"** 1,90 · Inés escribe "Próxima: MARZO" en la ficha. 2,00-2,75 · **Inés: "Yo le aviso."** 2,80 · guarda la ficha adelante de todo en el fichero: **plac** · Toto mueve la cola. | consultorio, mesa de acero, Toto (sentado, curita), Vero, Inés, ficha, fichero, bandeja con jeringa y frasquito | ambiente de consultorio de mañana: música liviana bajita + el zumbido del tubo muy bajo · un ladrido corto lejano en la sala 0,10 · lapicera en papel 1,95 · **plac** de la ficha en el cartón 2,80 · cola contra la mesa (tic-tic suave) 2,9 |
| 3,10-6,10 | **P2 · la escalada.** a) Inserto del fichero (≥ 60 % del cuadro): la ficha de Toto adelante, y la cámara la sigue mientras entran fichas delante y se hunde (3,10-4,40), chips ABRIL → MAYO → JUNIO, pestañas rojas que aparecen. b) Entre medio, dos flashes de 0,4 s del consultorio a full: el gato que no se deja (gata gris arqueada en la mesa) y el cachorro que hace pis en la mesa (charquito crema, Bruno con el trapo). c) 5,00-6,10 · JUNIO · 21:40: el mostrador de noche (la vidriera navy oscura), Inés con el teléfono en la oreja y la ficha de Toto en la mano; ladra un perro en la sala (de internación), Inés suspira y cuelga. Chip "Vencidas: 12 → 31 → 63". | fichas nuevas (Luna, Coco, Negro, Mora, Simón, Pancho) que entran con un pop cada una; las pestañas rojas "VENCIDA" se multiplican; el teléfono que se cuelga | fichero, fichas, gata, cachorro, Bruno (flash), Inés, teléfono, mostrador | papel/plac por ficha (6, escalonados y cada vez más rápidos) · whoosh-short en cada salto de mes · maullido corto (flash a) · ladrido en la sala 5,60 · clic del teléfono que cuelga 5,90 |
| 6,10-9,20 | **P3 · la creencia.** Plano medio-general desde la mesa: Bruno entra por la izquierda con el fichero en brazos (ya no cierra, fichas torcidas asomando); Inés en la pileta lavándose las manos, de 3/4. Chip "JUNIO". | 6,20-7,60 · **Bruno: "Doctora, ¿y los avisos de las vacunas?"** 7,75-9,10 · **Inés: "El que quiere a su perro, se acuerda."** (se seca las manos, segura). 9,00 · Bruno apoya el fichero en la mesada y el fichero escupe dos fichas, que caen al piso. | consultorio, Bruno, fichero, Inés, pileta, toalla de papel | canilla 6,1-7,7 · papel (toalla) 7,8 · fichas al piso (dos tics de cartón) 9,05 |
| 9,20-12,30 | **P4 · el golpe.** La cámara gira al mostrador (paneo corto): por la puerta entra Vero con Toto de la correa, Toto con un **pañuelo rojo apagado** nuevo al cuello; Vero con una bolsa de ración. Chip "JULIO". | 9,25 · campanita de la puerta. 9,50-12,20 · **Vero: "¡Doctora! A Toto le escribieron de la de la vuelta. Ya está vacunado."** (contenta, apoya la bolsa de ración en el mostrador) · Toto se sienta abajo del mostrador. | mostrador, vidriera, Vero, Toto con pañuelo, bolsa de ración, fichero en el mostrador | campanita 9,25 · uñas de Toto en el piso (tic-tic) 9,3-10,5 · bolsa en el mostrador 11,6 |
| 12,30-13,40 | **P5 · la pausa.** Plano desde atrás del mostrador, alto: el fichero lleno en primer término (grande, enfocado), Inés detrás de pie, y abajo Toto sentado con el pañuelo, mirando arriba. Cámara quieta. | Silencio de consultorio: la música baja a -12 dB en 0,4 s (no se corta), solo el zumbido del tubo y el tic de las uñas de Toto. 12,45 · rótulos con línea guía: "63 vacunas vencidas en el fichero" / **"$ 94.500 que no volvieron"** (rojo apagado) al fichero; **"Vacunado a la vuelta"** (rojo apagado) al pañuelo. | fichero, Inés, Toto con pañuelo, mostrador | zumbido · pop chico por rótulo |
| 13,40-14,60 | **P6 · el remate.** Contraplano en picado desde atrás de Inés hacia Toto (Inés asomada por encima del mostrador, de espaldas/3/4 en el borde superior) y corte a contrapicado de Toto: orejas gachas (la parada también baja), cejas de perro arriba, ojos grandes. | 13,55-14,45 · **Inés: "¿Vos también, Toto?"** (seca, en voz baja; la burbuja se revela con la pausita antes de "Toto"). | Inés, Toto | gemidito corto de perro (CC0) 14,50 |
| 14,60-15,80 | **P7 · remate del remate.** Plano medio a la altura del mostrador: Toto se para en dos patas apoyando una en el mostrador y le ofrece la pata derecha; Inés, seca, se la da (un apretón); Vero mira a uno y a otro, sin entender. | 14,80 · Toto levanta la pata · 15,10 · Inés se la da · 15,70 stinger. | Toto, Inés, Vero, mostrador | ladridito corto 14,85 · stinger 15,70 |

## CARTEL (15,80-18,30 s)
Time card de dibujito de siempre: **"Un recordatorio" / "automático" / "más tarde…"**. Narrador Rasalgethi (toma
nueva). Nunca "Scalerics".

## PARTE 2 · resuelto (18,30-37,20 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 18,30-21,90 | **Q1 · callback.** El encuadre del cuadro 0 (otro marzo): Toto en la mesa con la curita, Vero, Inés; en la mesada, en lugar del fichero, la tablet en su atril. Push-in a la tablet en 20,4. | 18,45-20,05 · **Vero: "Doctora, ¿y cuándo le toca la próxima?"** (el mismo audio de 01) · 20,20-21,30 · **Inés: "Le vamos a escribir a él."** (media sonrisa, señala a Toto con la cabeza) y toca "Guardar": la ficha de Toto en la tablet, "Aviso por WhatsApp: activado ✓", "Guardado ✓" 21,40. Toto ladea la cabeza. Rótulo HTML: "La ficha de cada paciente". | consultorio, mesa, Toto, Vero, Inés, tablet en atril | click-soft 21,35 · ding chico 21,45 · tic-tic de la cola |
| 21,90-26,00 | **Q2 · el recordatorio solo.** Chip "Un año después · 5 días antes". El living de Vero: Toto echado en el sillón; inserto del celular de Vero ≥ 60 %. | 22,10 · llega el recordatorio: "Hola, Vero. A Toto le toca la vacuna. ¿Te reservo el martes a las 10:00?" · 23,00-24,00 · **Vero: "¡Toto! ¡Te escribieron!"** · Toto levanta la cabeza y la ladea (la oreja caída se balancea) · 24,40 toca **"Sí, martes 10:00"** · 25,00 **"Turno reservado ✓ · Martes 10:00"**. Rótulo: "Recordatorio automático · 5 días antes". | living, sillón, Toto echado, Vero, su celular | notification 22,10 · ladridito contento 24,1 · click-soft 24,40 · ding (`cero.mp3`) 25,00 |
| 26,00-29,80 | **Q3 · el panel.** El consultorio; push-in a la tablet del atril hasta ≥ 70 % del cuadro; Bruno al lado con otra tablet en la mano (no con el fichero), Inés de 3/4. | 26,20-27,30 · los tildes se prenden en la lista; "Turnos reservados" sube 0 → 48; el 63 rojo de "Vencidas" gira y queda 15; "$ 72.000 en turnos reservados" sube en verde; "Segundo aviso: mañana" · 27,40-28,80 · **Bruno: "Doctora, ¿y los avisos de las vacunas?"** (el mismo audio de 03) · 28,95-29,75 · **Inés: "Ya salieron solos."** (sin levantar la vista). | tablet, mesada, Inés, Bruno | ding por tilde (escalonados, suave) · tic de contador · whoosh-short del 63 que gira |
| 29,80-33,40 | **Q4 · martes 10:00.** Chip "MARTES · 10:00". Plano general de la sala de espera, llena y en hora (Luna en su transportadora, Coco con su dueño, Mora en brazos); la puerta. Travelling corto que sigue a Toto hasta el consultorio y termina en el encuadre del cuadro 0 desde abajo. | 30,00 · campanita a las 10:00: entra Vero con Toto (collar navy con la chapita verde, sin pañuelo) · Toto va derecho al consultorio y se sienta solo al pie de la mesa, cola a mil · 31,40 · Inés se asoma por la puerta del consultorio, sonriendo · 31,60-32,50 · **Inés: "¿Vos también, Toto?"** (la misma burbuja, ahora con sonrisa) · 32,60 · Toto le da la pata, contento (lengua afuera); Inés se la da · Vero se ríe. | sala de espera, banco, transportadora con Luna, Coco y dueño, Mora y dueña, Vero, Toto, Inés | campanita 30,00 · uñas en el piso 30,1-31,2 · ladridito 32,60 · risa corta de Vero (sin voz de texto: respiración/risa de la toma de 09 si hay; si no, nada) |
| 33,40-37,20 | **Q5 · el panel + cierre.** La cámara va de la mesa a la tablet del atril (≥ 60 % al principio): "Turnos reservados: 48 ✓", "Vencidas: 15", "Llamadas a mano: 0"; al lado, el celular parado con **Sofi en videollamada**; travelling corto a Sofi. Al fondo, desenfocado en un estante alto, el fichero con una planta encima. | 33,50 · "Llamadas a mano: 0" en verde (ding). 33,80-36,90 · **Sofi: "Comentá VACUNA y te mando cómo funciona para tu veterinaria."** · en "VACUNA" entra grande **"Comentá VACUNA"** (capa HTML). 36,40 · línea chica: "Ficha de cada mascota con recordatorio automático" / "scalerics.com". | mesada, tablet, celular parado con Sofi, el fichero al fondo | ding 33,50 · pop en "VACUNA" · final de la música |

**Si las tomas reales hacen pasar el reel de ~38 s**, recortar en este orden: (1) Q3 sin el intercambio Bruno/Inés (el
panel se entiende solo; -2,4 s); (2) P2 sin el flash del cachorro (-0,4 s); (3) Q4 con el travelling más corto (-0,8 s).
Nunca recortar P5 por debajo de 1,0 s ni la pausa antes de "¿Vos también, Toto?".

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "VETERINARIAS" entero y legible; Toto grande en la mesa de acero, Inés con la ficha, Vero y el fichero
  en el mismo cuadro. Que se lea "veterinaria" y no "consultorio médico" ni "pet shop" (mesa de acero, perro en la mesa,
  ambo, estetoscopio, jeringa en la bandeja).
- **Toto:** reconocible como perro mestizo en todos los planos (oreja derecha parada y la izquierda caída SIEMPRE, hocico
  blanco, collar); la pata que se levanta sin atravesar la mano de Inés ni el mostrador; la lengua solo en la parte 2;
  orejas gachas en P6 bien legibles; el pañuelo rojo apagado SOLO en P4-P7 y nunca en la parte 2; la chapita crema en la
  parte 1 y verde en la parte 2. Que no tiemble ni flote: patas apoyadas en la mesa, el piso o el sillón.
- **El fichero y la ficha:** que el fichero se lea como fichero de cartón (caja kraft + fichas paradas + pestañas), la
  ficha de Toto legible en P1 y en P2 ("TOTO", "Próxima: MARZO"), las fichas nuevas que entran sin atravesarse, las dos
  que caen al piso en P3 quietas después (no desaparecen en el corte).
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp; ✓
  verdes; el panel con los cuatro números legibles; el 63 rojo que gira y queda 15.
- **Continuidad:** Inés siempre con el ambo verde oscuro, lentes y estetoscopio; Vero con la campera navy y la correa
  verde oscuro; Bruno con la chaqueta navy; Toto con el mismo collar; el fichero en la mesada en la parte 1 y fuera de la
  mesada en la parte 2. Las burbujas de "¿Vos también, Toto?" iguales en P6 y Q4.
- **Sofi:** ELENCO.sofi (no un personaje nuevo), ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` ≈ 13,9 (P6: el contraplano con Inés asomada arriba y Toto abajo con las orejas gachas y el pañuelo; renderizar sin
gancho, rótulos, subtítulos ni burbujas). Si en ese plano Inés queda de espaldas, alternativa: un plano propio "portada"
como hizo taller-presupuestos (VER=portada en tres.js): Inés de frente, asomada por encima del mostrador, y Toto abajo
mirando arriba con las orejas gachas, los dos en la mitad de arriba; el fichero de vencidas en un costado. `chica`: "Le
escribió otra veterinaria." · `grande`: **"¿Vos también, Toto?"** (la frase que la dueña se dice, 3 palabras, entre
signos) · `sello`: "VETERINARIAS". Alternativa de `grande`: "Yo le aviso." (con `chica` "Marzo. Vacuna de Toto.").
