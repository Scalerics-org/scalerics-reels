# inmobiliaria-visitas · plan plano por plano · línea "ANTES QUE TODO" (rubro + dolor + solución + palabra), 3D real, ~36,3 s

**De qué trata.** INMOBILIARIAS. Viernes 18:00 en "Silvana Propiedades". Del celular en altavoz de Silvana, la
propietaria del apartamento de Pocitos: **"¿Y? ¿Hubo visitas?"** Silvana tapa el celular y les pregunta a sus corredores:
**"¿Hubo visitas en lo de Graciela?"** Diego: **"Un montón."** y Romina, a la vez: **"Ninguna."** Silvana, al celular,
pasando lo que le dicen: **"Me dicen que varias, Graciela."** Corte al balcón del apartamento, con el cartel VENDE y la
rambla atrás; Graciela, en altavoz, y en la cerradura de la puerta del balcón cuelga la llave "POCITOS": **"Qué raro. La
llave la tengo yo."** Pausa con el costo (USD 180.000 el apartamento, USD 5.400 de comisión, "Visitas anotadas: 0").
**"Mañana paso a buscar el cartel."** Tu-tu-tu. Remate del remate: Diego mira la llave de su escritorio, etiqueta
"MALVÍN": **"Ah. Era el de Malvín."** Cartel **"Un registro de visitas más tarde…"**. Parte 2 (la mitad del reel): Diego
carga la visita en el celular al salir del apartamento (interesados, qué dijeron, interés, la llave); el viernes a las
18:00 a Graciela le llega solo el resumen de la semana; igual llama: **"¿Y? ¿Hubo visitas?"** (el mismo audio) y Silvana,
sin preguntarle a nadie, mirando la ficha: **"Cuatro. Y el martes vuelve una pareja."** / Graciela: **"Ya sé. Llamaba
para chusmear."** Tres semanas después: RESERVADO, la comisión en verde, y Graciela, contenta: **"Mañana paso a buscar el
cartel."**: sobre el cartel cae la franja VENDIDO. Cierre: Sofi en videollamada: **"Comentá VISITAS y te mando cómo
funciona para tu inmobiliaria."**

- **Producto:** sistema a medida / CRM de propiedades para inmobiliarias: la **ficha de cada propiedad** (dirección
  genérica, dormitorios, precio, propietaria, corredor, la llave), el **registro de cada visita desde el celular del
  corredor** en el momento (fecha y hora, interesados, interés alto/medio/bajo, lo que dijeron, segunda visita), el
  **registro de llaves** (quién la sacó y cuándo volvió al tablero) y el **resumen semanal automático al propietario**
  por WhatsApp (visitas, interés, lo que dijeron, próximas visitas). Se ve funcionando en la parte 2 y se nombra en la
  línea chica final y en `descripcion.txt`. El cartel nunca dice "Scalerics" ni "CRM".
- **Sin marcas:** ningún portal inmobiliario (ni nombrado ni dibujado), chat y celulares genéricos (burbujas crema/navy,
  sin el verde ni el logo de WhatsApp; la palabra "WhatsApp" solo en un rótulo de texto), monitor sin logo. "Silvana
  Propiedades" es inventada. La otra inmobiliaria nunca se nombra ni se muestra.
- **Sin datos de afuera** (ver `fuentes.md`): USD 180.000 y USD 5.400 son del caso; el guion no dice porcentajes.
- **Estructura** (la de `dist-cliente-grande` y `taller-presupuestos`): parte 1 **15,0 s** + cartel **2,5 s** + parte 2
  **15,0 s** + cierre **3,8 s**. Solución + cierre = 18,8 s de 36,3 s (52 %). Un proyecto 3D con gen.mjs (T1/T2).
- **Cartel:** el time card de siempre: **"Un registro" / "de visitas" / "más tarde…"**. Toma NUEVA de Rasalgethi. Si
  queda larga (> 2,6 s), se reusa "Un sistema más tarde." de `reels/ya-lo-cargo/assets/voice/narrador.wav` y el cartel
  dice "Un sistema" / "más tarde…".
- **Rubén NO aparece** (no es distribuidora). Del elenco: Graciela (propietaria) y Sofi (cierre).
- **Quién dice "Comentá VISITAS": Sofi** (ELENCO.sofi, voz Achernar), en un celular parado al lado del monitor, como en
  taller-presupuestos y veterinaria-vacunas.

## Paleta y set (para "Hechos")
**Dos sets. (1) NUEVO: la oficina a la calle de "Silvana Propiedades", viernes de tarde: pared de ladrillo pintado crema
`#efeee5` (ladrillos en relieve muy bajo, juntas `#d9d7c9`, color plano), con una franja corrida verde de marca `#5ce611`
de 25 cm a 1,6 m de altura y encima el nombre "SILVANA PROPIEDADES" en letras navy corpóreas (Lexend 800); piso de
porcelanato navy2 `#16243d` mate en placas grandes (sin reflejos); tres escritorios de tapa crema con patas navy3; a la
izquierda, la vidriera a la calle vista desde adentro, con un panel de fichas de propiedades colgado ADENTRO, mirando a
la sala (8 fichas A4 crema con encabezado navy "VENDE" o verde oscuro `#3fa60a` "ALQUILA", la casita dibujada en líneas
navy y el precio); al fondo, el **tablero de llaves**. Luz de tarde pareja, ventanal claro, sin sol directo (distinto de
la oficina de Rubén con sol lateral). (2) NUEVO: el apartamento vacío a la venta en Pocitos: living sin muebles con piso
de parquet en espiga miel `#b8874f` plano, paredes crema, un ventanal-puerta de marco navy3 al balcón; el balcón con
baranda de caño navy, el cartel VENDE atado y, detrás, la rambla de Pocitos low-poly (edificios en bloques crema y cr2,
la vereda de la rambla, el río navy claro `#16243d` liso y el cielo crema liso; como la Montevideo de abren-hoy, sin
degradés).** Distinto del consultorio verde (vet), el gabinete crema (estética), la parrilla de noche, el taller navy
claro, el galpón del corralón, el estudio de pilates de madera clara y la oficina de Rubén. Anotar en "Hechos": "oficina
de inmobiliaria con ladrillo pintado crema, franja verde y piso navy2, tablero de llaves y panel de fichas; apartamento
vacío en Pocitos con parquet en espiga, balcón con cartel VENDE y la rambla low-poly; parte 2 con interfaz recreada
(visita en el celular del corredor, resumen semanal en el de la propietaria, ficha de la propiedad); cartel verde".
- **Texto en pantalla:** navy sobre crema, crema sobre navy. "INMOBILIARIAS" del cuadro 0 en caja navy (la pared es
  crema). Nada de crema sin caja sobre el cielo crema del balcón.
- **Rojo apagado `#c7655b` SOLO para el problema:** "Visitas anotadas: 0", "USD 5.400 de comisión" en la parte 1, los
  signos "¿?" de los post-its de Diego, la pantalla "Llamada finalizada". **Verde `#5ce611` para lo resuelto:** "Interés:
  ALTO", "Visita cargada ✓", "Visitas: 4 ✓", "Segunda visita ✓", "Visitas sin anotar: 0", "RESERVADO ✓", "USD 5.400 de
  comisión" en la parte 2, la franja "VENDIDO", el recuadro de selección de los subtítulos.
- **Burbujas de diálogo:** crema con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia quien habla.
  **La de Graciela en la oficina sale del celular en altavoz** (cola a la pantalla, etiqueta chica "Graciela ·
  propietaria"). "Un montón." y "Ninguna." son dos burbujas a la vez, una de cada lado (Diego izquierda, Romina derecha),
  que aparecen juntas con un pop doble. En la parte 2, "¿Y? ¿Hubo visitas?" en el MISMO lugar y tamaño que en el cuadro
  0, y "Mañana paso a buscar el cartel." en la misma burbuja que en la parte 1, para que se lea el callback.
- **Chips de tiempo** (caja navy, Lexend 900 crema, arriba a la izquierda, debajo de "INMOBILIARIAS" en el cuadro 0):
  "Viernes, 18:00." en P1 y Q2, "Tres semanas después." en Q4.

## Personajes (copia local de `reels/veterinaria-vacunas/assets/personajes.js`; agregar a ELENCO, mismo estilo, solo parámetros y peinados que ya existen)
- **Silvana · `ELENCO.silvana`** (dueña de la inmobiliaria, ~52, voz Erinome). `piel: PIEL.clara`, `pelo: 0xc9c2b4`
  (platinado/canoso claro), `peinado: "melena"` (que no se parezca a Lorena: Lorena es cobriza y trigueña), `cejasColor:
  0x8a7f72, cejaFina: true, pestanas: 0x1a1414, cuelloFino: true`, **sin lentes**. Camisa crema `MARCA.cr` con `cuello:
  MARCA.cr, cuelloBotones: false`, **blazer** `campera: { color: MARCA.navy3, cuello: MARCA.navy3, cierre: MARCA.navy2,
  abierta: true }`, `pantalon: MARCA.navy`, `zapatos: MARCA.navy2`, `aros: MARCA.g`, `labiosPegados: true, labios:
  0xb5555a, mejillas: 0xe8968a, panza: 1.02, nariz: 0.05, alto: 0.98`. Sentada en su silla de oficina en P1-P3 y Q3.
  Expresión: `neutra` segura en P1, `incredula` leve en la contradicción, `sonrisa` forzada en "Me dicen que varias",
  cara quieta de nada en la pausa, ojos cerrados al final de P1 (sin manos a la cabeza); `sonrisa` en la parte 2.
- **Diego · `ELENCO.diego`** (corredor, ~35, voz **Achird**; alternativa Puck si el coordinador prefiere). `piel:
  PIEL.clara`, `pelo: PELO.castaño`, `peinado: "jopo", jopoAlto: 0.7` (más bajo que Maxi, que es morocho y morena),
  barba corta `barba: 0x4a3222, barbaLarga: 0.4, barbaOpacidad: 0.6`, `cejasColor: 0x4a3222`, camisa blanca `0xf7f7f2`
  sin corbata, `campera: { color: MARCA.navy2, cuello: MARCA.navy2, cierre: MARCA.navy3, abierta: true }` (saco de
  corredor), `pantalon: 0x3a3f4a`, `zapatos: 0x3b2a20`, `panza: 0.98, nariz: 0.056, mejillas: 0xe39282, alto: 1.03`.
  Canchero y simpático, nunca cínico. Que no se parezca a Walter (Walter tiene corbata y campera crema) ni a Sergio.
- **Romina · `ELENCO.romina`** (corredora, ~30, voz **Pulcherrima**). `piel: PIEL.trigueña`, `pelo: 0x3a2418`,
  `peinado: "coletaAlta"` (Vale es clara y de pelo negro; Romina trigueña y castaño oscuro), `cejasColor: 0x2a1e18,
  cejaFina: true, pestanas: 0x1a1414, cuelloFino: true`, camisa `MARCA.navy3` con `cuello: MARCA.cr`, `pantalon:
  MARCA.cr2`, `zapatos: MARCA.navy`, `aros: MARCA.cr`, `labiosPegados: true, labios: 0x9a4a4a, mejillas: 0xc9785e,
  panza: 0.96, nariz: 0.046, alto: 0.96`. Seca y segura.
- **Graciela = `ELENCO.clienta`** (la de siempre: rulos lila, lentes, cárdigan verde; voz Gacrux), acá **propietaria del
  apartamento de Pocitos**. Agregar solo una **cartera crema** al hombro en el tres.js. **Siempre con el celular en
  altavoz a la altura del pecho, nunca en la oreja** (QA: nada de manos en la cara). Contenta y chismosa, nunca enojada a
  los gritos: en "Mañana paso a buscar el cartel." de la parte 1 está seca y digna.
- **La pareja de Q1 (sin voz):** dos DEFECTO de espaldas o 3/4 yéndose por el pasillo (ella `coleta` rubia y campera
  crema, él `corto` negro y buzo navy), un saludo con la mano levantada (sin tocar la cara).
- **Reusada:** Sofi (`ELENCO.sofi`, con el override de estetica-turnos/taller: buzo navy claro con franja crema, la
  varilla del micrófono separada de la mejilla) en el celular parado del cierre.

## Objetos 3D (específicos, que nadie confunda la oficina con un banco o un estudio contable)
- **El tablero de llaves (EL objeto de la oficina):** tablero de madera clara `0xc9a774` de ~90 × 60 cm colgado de la
  pared, con 4 filas de 6 ganchos de bronce opaco; de cada gancho, una llave con una **etiqueta kraft redonda** con el
  barrio en Lexend 800 navy ("CENTRO", "CORDÓN", "BUCEO", "PUNTA CARRETAS", "PARQUE RODÓ", ...). El gancho **"POCITOS"
  tiene la etiqueta pegada en la madera y el gancho vacío** en la parte 1; en la parte 2, con su llave colgada.
- **La llave "POCITOS" en la puerta del balcón (el remate):** llave grande (se exagera un poco el tamaño) en la cerradura
  de la puerta-ventana, con su llavero: argolla, la etiqueta kraft redonda "POCITOS" bien legible, que se balancea
  apenas (péndulo, función pura del tiempo). Nadie la toca.
- **La llave "MALVÍN" en el escritorio de Diego:** apoyada sobre el escritorio, al lado del teclado, etiqueta kraft
  "MALVÍN" de frente a cámara. Diego la mira; no la agarra.
- **Escritorio de Diego:** monitor con el marco tapado de post-its **crema `0xf3e9b8`** (nada de amarillo
  chillón) con letra Caveat navy: "Pocitos ¿6?", "llamar a la de Malvín", "visita ¿jueves?", "Martín ¿?"; una taza navy
  (mate no: el mate es de Rubén).
- **Escritorio de Romina:** agenda de papel grande abierta, con renglones tachados en navy y una flecha; una lapicera.
- **Escritorio de Silvana:** monitor (en la parte 2, la ficha), el **celular en altavoz** acostado sobre la mesa, con
  la pantalla "Graciela · Pocitos" y el ícono de altavoz (en la parte 1 termina en "Llamada finalizada" rojo apagado);
  un portalápices, una planta chica.
- **Panel de fichas de la vidriera:** 8 fichas A4 crema colgadas con broches navy de un cable; la de Graciela, más
  grande y al frente: casita dibujada, "VENDE · POCITOS · 2 dorm. · USD 180.000".
- **El cartel del balcón:** cartel crema rectangular (~80 × 50 cm) atado con alambre a la baranda: "VENDE" enorme
  (Lexend 900 navy) y abajo "SILVANA PROPIEDADES" en navy chico (sin teléfono). En Q4, la **franja verde de marca
  "VENDIDO"** (Lexend 900 navy) que cae en diagonal con pop.
- **El apartamento:** living vacío, parquet en espiga, ventanal-puerta navy3, una maceta con una planta en el balcón
  (la que riega Graciela, sin regadera en la mano), la rambla low-poly detrás.
- **Celulares:** `crearCelular` de ya-lo-cargo/anotamelo (funda navy2 el de Diego, funda verde oscuro el de Graciela,
  funda crema el de Silvana). Celular parado en soporte con Sofi (Q5).

## Interfaz recreada (textos exactos; Lexend, ≥ 36 px en el cuadro final; celular/monitor ≥ 60 % del cuadro en los insertos)
**Parte 1 · rótulos de la pausa (P5):** caja navy, texto crema, línea guía: al panel de fichas, "Apartamento de Graciela ·
USD 180.000" y debajo, en rojo apagado, **"USD 5.400 de comisión"**; al gancho vacío del tablero, **"Visitas anotadas:
0"** (rojo apagado).
**Parte 2 · Q1 · la visita en el celular de Diego** (encabezado navy "Visitas · Pocitos, 2 dorm.", fondo crema):
"Vie 17:30" · "Martín y Ana" · **"Interés: ALTO"** (chip verde) · "Dijeron: «Muy luminoso» · «¿Tiene cochera?»" ·
"Segunda visita: martes 11:00" · "Llave: Diego 17:10 → oficina 18:05 ✓" · botón verde "Guardar" → **"Visita cargada ✓"**.
Rótulo HTML: "Cada visita, cargada en el momento".
**Parte 2 · Q2 · el resumen en el celular de Graciela** (encabezado navy "Silvana Propiedades"): "Hola, Graciela. Tu
apartamento de Pocitos esta semana:" · **"Visitas: 4 ✓"** · "Interés alto: 2" · "Lo que dijeron: «Muy luminoso» ·
«¿Tiene cochera?»" · **"Segunda visita: martes 11:00 ✓"**. Rótulo: "Resumen automático a la propietaria · cada
viernes".
**Parte 2 · Q3 · la ficha en el monitor de Silvana** (≥ 70 % del cuadro; encabezado navy "Pocitos · 2 dorm. · USD
180.000 · Propietaria: Graciela"): tabla de 4 visitas que se prenden de a una con su tilde: "Mar 10:00 · Romina · Sergio
y Lu · alto" · "Mié 18:00 · Diego · Jorge · bajo («chico»)" · "Jue 12:00 · Romina · Paula · medio" · "Vie 17:30 · Diego ·
Martín y Ana · alto" · abajo: "Llave: en el tablero ✓" · "Resumen enviado: vie 18:00 ✓" · **"Visitas sin anotar: 0"**
(verde). Rótulo: "La ficha de cada propiedad".
**Parte 2 · Q4 · la misma ficha, tres semanas después:** "Visitas: 11" · "Segundas visitas: 3" · **"RESERVADO ✓"** ·
**"USD 5.400 de comisión"** (el mismo rótulo de la parte 1, ahora en verde: el rojo gira y queda verde).
**Capa HTML del cierre:** "Comentá **VISITAS**" grande (Lexend 900, ~140 px, VISITAS en el recuadro verde); en los
últimos 1,3 s, abajo chico: "Cada visita anotada y el resumen al propietario, solo" / "scalerics.com" en verde.

## PARTE 1 · el problema (0,00-15,00 s)
Eje de la oficina: Silvana al centro en su escritorio, el tablero de llaves detrás de ella (a la derecha del cuadro),
Diego a la izquierda, Romina a la derecha, la vidriera con el panel de fichas a la izquierda.

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 0,00-1,60 | **P1 · cuadro 0.** Plano medio desde enfrente del escritorio, a la altura de la mesa: Silvana grande al centro, el celular en altavoz en primer término sobre la mesa, el tablero de llaves detrás (se lee el gancho vacío "POCITOS"), Diego y Romina desenfocados a los lados. Push-in lento. | **Cuadro 0:** arriba, **"INMOBILIARIAS"** (Lexend 900, ~130 px, crema en caja navy, con el recuadro verde de selección); chip "Viernes, 18:00." 0,20-1,30 · **Graciela (altavoz): "¿Y? ¿Hubo visitas?"** (burbuja desde el celular). | oficina, escritorio, celular en altavoz, Silvana, tablero de llaves | ambiente de oficina (teclado lejano, calle bajita) · vibración/ruido de línea muy bajo |
| 1,60-3,40 | **P2 · la pregunta.** Silvana tapa el celular con la palma sobre la mesa (la mano en la mesa, no en la cara) y gira la silla; la cámara gira con ella. | 1,80-3,30 · **Silvana: "¿Hubo visitas en lo de Graciela?"** | Silvana, silla, celular tapado | rueditas de la silla 1,7 · |
| 3,40-5,40 | **P3 · la contradicción.** Plano general desde atrás de Silvana (su hombro en primer término): Diego a la izquierda, Romina a la derecha, cada uno en su escritorio; barrido corto a los post-its de Diego (3,4-3,9) y a la agenda tachada de Romina, y vuelve al general. | 4,00-4,70 · **Diego: "Un montón."** y **Romina: "Ninguna."** a la vez (Romina arranca 0,1 s después): dos burbujas encimadas, pop doble · 4,8-5,4 · Silvana mira a Diego, mira a Romina. | Diego, post-its, Romina, agenda, la llave "MALVÍN" ya en el escritorio de Diego (plantada, sin subrayar) | whoosh-short del barrido · pop doble 4,0 · |
| 5,40-7,30 | **P4 · la versión oficial.** Primer plano de Silvana, de frente; destapa el celular. | 5,60-7,10 · **Silvana: "Me dicen que varias, Graciela."** (sonrisa forzada, segura) | Silvana, celular | |
| 7,30-9,60 | **P5 · el remate.** Corte al balcón de Pocitos: Graciela de 3/4 con el celular en altavoz a la altura del pecho, el cartel VENDE a su lado, la rambla atrás. 7,9 · push-in (o paneo corto) a la puerta del balcón: la llave "POCITOS" colgando de la cerradura, grande en cuadro. | 7,50 · pausita (0,4 s) · 7,90-9,50 · **Graciela: "Qué raro. La llave la tengo yo."** (la burbuja se revela en "La llave"). La llave se balancea apenas. | balcón, baranda, cartel VENDE, Graciela, puerta-ventana, llave POCITOS, rambla | viento suave y gaviota lejana (si hay CC0) · tintineo chico de llaves 8,6 |
| 9,60-10,80 | **P6 · la pausa.** La oficina, plano quieto desde el costado: Silvana inmóvil con el celular en la mano, el tablero con el gancho vacío y el panel de fichas en el mismo cuadro. | La música baja a -12 dB en 0,4 s (no se corta). 9,75 · rótulos: al panel "Apartamento de Graciela · USD 180.000" / **"USD 5.400 de comisión"** (rojo apagado); al gancho vacío **"Visitas anotadas: 0"** (rojo apagado). | Silvana, tablero, panel de fichas | pop chico por rótulo |
| 10,80-12,40 | **P7 · la pérdida.** Primer plano del celular en altavoz sobre la mesa (≥ 50 % del cuadro). | 10,90-12,30 · **Graciela (altavoz): "Mañana paso a buscar el cartel."** · 12,35 tu-tu-tu · pantalla "Llamada finalizada" (rojo apagado). | celular | tono de colgado (`k-dos-tonos` filtrado, como veterinaria) |
| 12,40-15,00 | **P8 · remate del remate.** Plano medio de Diego en su escritorio, la llave "MALVÍN" en primer término sobre la mesa; silencio de oficina. | 12,80 · Diego baja la vista a la llave · 13,20-14,40 · **Diego: "Ah. Era el de Malvín."** (bajito, descubriéndolo) · 14,5 · contraplano corto de Silvana que cierra los ojos · 14,90 stinger. | Diego, llave MALVÍN, Silvana | silencio + reloj de pared bajito · stinger 14,90 |

## CARTEL (15,00-17,50 s)
Time card de dibujito de siempre: **"Un registro" / "de visitas" / "más tarde…"**. Narrador Rasalgethi (toma nueva).
Nunca "Scalerics".

## PARTE 2 · resuelto (17,50-36,30 s) · la solución en pantalla, más de la mitad del reel

| t (s) | plano y cámara | qué pasa | objetos 3D | SFX |
|---|---|---|---|---|
| 17,50-20,60 | **Q1 · la visita, cargada.** El apartamento de Pocitos desde el living: Diego en la puerta, la pareja se va por el pasillo saludando; Diego saca el celular (ya en la mano, a la altura del pecho). 18,4 · inserto del celular ≥ 60 %. | 18,40-20,20 · la ficha de la visita se completa sola por renglones (Martín y Ana · Interés: ALTO · Dijeron... · Llave ✓) · 20,10 "Guardar" → **"Visita cargada ✓"**. Rótulo: "Cada visita, cargada en el momento". | living, puerta, pasillo, pareja, Diego, celular | pasos de la pareja · tecleo suave por renglón · ding chico 20,15 |
| 20,60-24,00 | **Q2 · el resumen.** Chip "Viernes, 18:00." El balcón: Graciela con el celular a la altura del pecho, el cartel VENDE; vibra. 21,1 · inserto ≥ 60 %. | 21,10 · llega "Resumen de la semana" · los renglones entran de a uno (Visitas: 4 ✓ · Interés alto: 2 · Lo que dijeron · Segunda visita: martes 11:00 ✓). Rótulo: "Resumen automático a la propietaria · cada viernes". 23,3 · Graciela sonríe y toca "Llamar" igual. | balcón, Graciela, su celular | notification 21,10 · ding por renglón (suave) · click-soft 23,4 |
| 24,00-29,00 | **Q3 · callback.** El encuadre del cuadro 0 (mismo plano, misma burbuja): Silvana, el celular en altavoz "Graciela · Pocitos"; Diego y Romina a los costados. 25,6 · push-in al monitor hasta ≥ 70 %. | 24,20-25,30 · **Graciela (altavoz): "¿Y? ¿Hubo visitas?"** (el mismo audio de P1) · 25,4 · Silvana empieza a tapar el celular, Diego y Romina levantan la cabeza; Silvana no pregunta, mira el monitor · la ficha: las 4 visitas se prenden con tilde · 25,80-27,30 · **Silvana: "Cuatro. Y el martes vuelve una pareja."** · 27,50-28,90 · **Graciela (altavoz): "Ya sé. Llamaba para chusmear."** · Diego y Romina vuelven a lo suyo; en el tablero, el gancho POCITOS con su llave (se ve al abrir el plano en 28,4). | oficina, Silvana, celular, monitor con la ficha, Diego, Romina, tablero con la llave POCITOS | ding por tilde (escalonados) · risita corta de Silvana si sale en la toma |
| 29,00-32,50 | **Q4 · vendido.** Chip "Tres semanas después." Inserto del monitor (≥ 60 %): "Visitas: 11", "Segundas visitas: 3", **"RESERVADO ✓"**, "USD 5.400 de comisión" que gira de rojo a verde. 30,4 · corte al balcón: Graciela contenta junto al cartel. | 30,60-32,10 · **Graciela: "Mañana paso a buscar el cartel."** (toma nueva, contenta, en la misma burbuja de P7) · 32,10 · la franja verde **"VENDIDO"** cae en diagonal sobre el cartel: pop. | monitor, balcón, Graciela, cartel VENDE, franja VENDIDO | whoosh-short del número que gira · pop + ding 32,10 |
| 32,50-36,30 | **Q5 · cierre.** La oficina: el monitor con la ficha en verde y, al lado, el celular parado con **Sofi en videollamada**; travelling corto a Sofi. | 32,70-35,90 · **Sofi: "Comentá VISITAS y te mando cómo funciona para tu inmobiliaria."** · en "VISITAS" entra grande **"Comentá VISITAS"** (capa HTML) · 35,00 · línea chica: "Cada visita anotada y el resumen al propietario, solo" / "scalerics.com". | monitor, celular parado con Sofi | pop en "VISITAS" · final de la música |

**Si las tomas reales hacen pasar el reel de ~38 s**, recortar en este orden: (1) Q1 sin la pareja yéndose (empieza en
el inserto; -0,8 s); (2) P3 sin el barrido a los post-its y la agenda (-0,5 s; los post-its se ven en el general);
(3) Q4 con el inserto del monitor más corto (-0,6 s). Nunca recortar la pausita antes de "La llave la tengo yo." ni el
silencio antes de "Era el de Malvín.".

## Revisión pedida para este reel (además de 8c)
- **Cuadro 0:** "INMOBILIARIAS" entero y legible; Silvana grande, el celular en altavoz con la burbuja y el tablero de
  llaves con etiquetas en el mismo cuadro. Que se lea "inmobiliaria" (tablero de llaves, panel de fichas VENDE/ALQUILA,
  franja verde con el nombre) y no "oficina" genérica ni banco.
- **Las llaves:** la llave POCITOS en la cerradura del balcón, legible ("POCITOS") y sin atravesar la puerta; el gancho
  POCITOS vacío en TODA la parte 1 y con su llave en TODA la parte 2; la llave MALVÍN en el escritorio de Diego desde P3
  (que esté antes de que la mire, sin pop).
- **Manos:** nadie se toca la cara; celulares siempre a la altura del pecho o sobre la mesa; Silvana tapa el celular con
  la palma apoyada en la mesa (que la mano no atraviese el celular ni la mesa).
- **Burbujas:** "Un montón." y "Ninguna." legibles las dos a la vez, sin pisarse ni tapar caras; la de Graciela en la
  oficina sale del celular, no de Silvana.
- **Continuidad:** Silvana con el blazer navy; Diego con el saco navy2 y camisa blanca; Romina con la coleta alta;
  Graciela con el cárdigan verde, los lentes y la cartera; el cartel VENDE igual en P5, Q2 y Q4 (hasta que cae la franja).
- **Interfaz de la parte 2:** cada pantalla ≥ 60 % del cuadro, textos ≥ 36 px, sin el verde ni el logo de WhatsApp,
  ningún portal inmobiliario; ✓ verdes; "USD 5.400 de comisión" en rojo apagado en la parte 1 y en verde en Q4.
- **Sofi:** ELENCO.sofi, ojos abiertos cuando habla, dentro de la pantalla del celular parado.

## Portada (portada.json)
`t` y `fondo_limpio` pendientes. Plano propio "portada" (VER=portada en tres.js, LIMPIO=1), como taller-presupuestos y
veterinaria-vacunas: en la mitad de arriba, Silvana de frente en su escritorio con cara de "¿y ahora?" y, a su lado y
más cerca, el celular en altavoz enorme; detrás, el tablero de llaves con el gancho POCITOS vacío; Diego y Romina a los
costados mirándose. Alternativa: Graciela en el balcón con el cartel VENDE y la llave POCITOS colgando en primer plano.
`chica`: "Viernes, 18:00." · `grande`: **"¿Hubo visitas?"** · `sello`: "INMOBILIARIAS". Alternativa de `grande`: "La
llave la tengo yo." es larga (6 palabras): no.
