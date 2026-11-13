# como-viene-el-mes · plan plano por plano · PARA MANDAR completo (3D real), ~31,8 s

**De qué trata.** Almacén de Rubén cerrado, de noche. Marta, la de la cafetería de al lado, se agacha bajo la persiana
con un cortado y pregunta, como quien no quiere la cosa: **"¿Y, cómo viene el mes?"**. Rubén: **"Pará que te
digo."** Caja de zapatos con tickets que saltan, pinche de boletas, calculadora con rollo. Time-lapse: la cinta se
apila en una montaña que lo tapa hasta el pecho, la **torre de pocillos** de Marta crece (1 → 2 → 4 → 7) y ella pasa
de parada a sentada en un cajón; por debajo de la persiana entra la luz de la mañana y **la bolsa del pan**. Rubén
arranca la cinta, la lee hasta el piso, levanta la vista, mano "más o menos": **"Ahí."** Remate del remate: **"¿Y
comparado con el mes pasado?"** → otra caja, más gorda, **"MES PASADO"**, "C" → 0, y Marta agarra la torre: **"Pongo
otro café."** Cartel **"Una automatización más tarde…"**. Parte 2: la misma pregunta; vibra el celular con el resumen que llegó
solo; Rubén, mate en mano: **"Ocho por ciento arriba del mes pasado. Lo que más salió fue la yerba."**; Marta, que
vino con la torre de siete pocillos para la noche larga, no sabe qué hacer; Rubén: **"¿Y a vos?"** y Marta: **"Pará que
te digo."**, saca su propia caja de zapatos; Rubén se sienta en el cajón con el mate y un pocillo: ahora espera él.

- **Producto:** automatización de reportes: el resumen de ventas del día y del mes le llega solo al celular al dueño
  (cuánto vendió hoy y en el mes, contra el mes pasado, lo que más salió). Solo en la línea chica y en
  descripcion.txt. El cartel nunca dice "Scalerics". Sin marcas: calculadora, celular, caja de zapatos (sin marca de
  calzado: nada de pipas ni tiras), yerba, pan, pocillos, mate y termo genéricos.
- **Estructura** como `reels/anotamelo` / `reels/me-haces-precio`: parte 1 (~17,4 s, sin línea chica) + cartel (3,0 s)
  + parte 2 (~11,4 s, con la línea chica). Un proyecto 3D con gen.mjs (T1/T2) y `armar.mjs unir`. Cartel: el de
  anotamelo tal cual (**"Una automatización"** / **"más tarde…"**) con su voz ya grabada
  (`reels/anotamelo/assets/voice/narrador.wav`, Rasalgethi): reusarla, no regenerar.
- **Personajes** (copia local de `reels/anotamelo/assets/personajes.js`): Rubén (ELENCO.almacenero, Algenib) y Marta
  (ELENCO.duena, Aoede, rodete, delantal verde de marca, aros verdes). Nadie más (la mano del panadero es solo un
  antebrazo con manga navy2 y guante-mano en piel: no es un personaje, no se le ve la cara).
- **Mecanismos nuevos para la línea:** el tiempo pasa en **la torre de pocillos** (cada cortado que trae Marta queda
  apilado sobre el platito del anterior) y en **la montaña de cinta** (la escala del esfuerzo); la mañana llega como
  **objeto**: la bolsa del pan que la mano del panadero desliza por debajo de la persiana (con una franja de luz
  plana). La luz del local NO cambia (la lámpara verde queda prendida toda la noche): nada de cielo que oscurece, ni
  almanaque, ni chip de hora, ni lápiz. La pausa es de gesto (arrancar la cinta, leerla hasta el piso, levantar la
  vista); la música baja a -12 dB en 0,4 s y vuelve, NUNCA se corta seca. Remate con la mano "más o menos" (palma
  abajo que se balancea a la altura del pecho, lejos de la cara): nada de mano a la cabeza, frente, oreja ni guiño.

## Paleta y set (para "Hechos")
**Almacén cerrado de noche: persiana metálica baja crema `#efeee5` con nervaduras navy, pared navy claro `#16243d`
plana, lámpara de banquero con pantalla verde de marca sobre el mostrador.** Corchete sugerido: `[formato Para mandar
completo · 3D real con Rubén y Marta, almacén cerrado de noche con persiana crema y pared navy claro #16243d plana,
lámpara verde sobre el mostrador, cartel verde]`. Diferencias con los anteriores: me-haces-precio fue navy oscuro con
lamparitas cálidas colgando; lo-mismo y me-lo-guardas, navy claro de DÍA; acá es la noche con UNA sola lámpara verde y
la persiana como fondo del lado de la calle.
- **Compresión de Instagram:** la noche se hace con colores planos, no con penumbra. Pared navy claro MeshBasic plana
  (sin degradé), persiana crema plana con nervaduras navy de 10-12 cm (bordes marcados), el charco de luz de la
  lámpara sobre el mostrador con borde duro (SpotLight con penumbra ≤ 0,15, o mejor un disco crema-cálido `#f4ecd2`
  plano sobre la tapa del mostrador), nada de brillos suaves ni niebla. Personajes iluminados con la luz principal de
  siempre + contraluz (que no queden en sombra: la "noche" es el fondo, no las caras).
- **Mostrador** navy3 `#1f3254` con tapa de madera clara (el de abren-hoy). Estantes de madera clara en la pared
  navy claro con mercadería de colores planos (crearYerba, crearGalletitas, crearFideos, crearDulceDeLeche,
  crearPolenta). La **yerba** en el estante del medio, a la vista desde el plano general (es la que se tilda en la
  parte 2).
- **Persiana** a la izquierda del cuadro general (la vidriera/puerta del local), bajada hasta 1,15 m del piso en P1
  (Marta pasa agachada); a la mañana (P4) se ve el borde de abajo con la franja de luz. En la parte 2 está a la
  misma altura.
- **Rojo apagado `#c7655b` SOLO para el problema**: la etiqueta "MES PASADO" escrita en rojo apagado sobre la caja
  (marcador), y el piolín. **Verde `#5ce611` para lo resuelto**: la tarjeta del resumen ("+8 %", "Yerba"), el tilde de
  la yerba, el recuadro de selección de los subtítulos. La pantalla de la calculadora en la parte 1: LCD gris verdoso
  `#a9b59a` con dígitos navy (NO verde de marca: el verde es lo resuelto).
- Burbujas de diálogo: crema `#efeee5` con borde navy de 8 px y sombra dura, Lexend 800 navy ≥ 48 px, cola hacia
  quien habla. Sobre la pared navy claro: crema con borde navy (se despega por valor). Subtítulos arriba al centro.

## Objetos 3D nuevos (específicos, que nadie los confunda)
- **crearCalculadoraRollo** (sumadora con impresora, LA protagonista): cuerpo en cuña crema `#efeee5` con canto navy3,
  ~0,30 × 0,24 m (exagerada un 30 % para que lea), teclado de 20 teclas RoundedBox navy3 con dígitos crema (Lexend
  800 en canvas, ≥ 40 px en el inserto), las teclas **"+"** y **"TOTAL"** más grandes, crema con borde navy, y la
  **"C"** en rojo apagado. Pantalla LCD gris verdoso con dígitos navy de siete segmentos (canvas). **Atrás, el brazo de
  metal con el rollo de papel** (cilindro blanco-crema `#f6f4ea` sobre un eje gris, ~0,09 m de diámetro): es lo que la
  hace "calculadora de almacén" y no "calculadora de bolsillo". La cinta sale por arriba y se curva hacia adelante
  con números impresos en navy mono (IBM Plex Mono 500): "1.250 +", "380 +", "2.100 +"…, y al final "412.300 ✱"
  (no hace falta que se lea en el time-lapse; en P5 sí). Teclas que se hunden al tocarlas.
- **Cinta de papel** (geometría de cinta: una tira de planos a lo largo de una curva con semilla, 7 cm de ancho, ida y
  vuelta en rulos): papel blanco-crema `#f6f4ea` con una línea fina de números navy (textura repetida), borde marcado.
  Crece desde la calculadora, cae por el frente del mostrador y se apila en una **montaña de rulos** en el piso del
  lado del cliente, que sube con el time-lapse: rodillas de Rubén (no se ven, el mostrador las tapa) → borde del
  mostrador → **la mitad del pecho de Rubén vista desde cámara** en P5 (la montaña está DELANTE del mostrador: nunca
  atraviesa a Rubén ni al mostrador; el efecto "enterrado" sale de la perspectiva). Determinista: la forma de cada
  rulo sale de una semilla fija y la montaña crece por "nivel de llenado" en función de t.
- **crearCajaZapatos**: caja de cartón kraft apagado `#c4a57c` con tapa de canto navy3 (tapa de solapa, más ancha que la
  caja: lo que la hace caja de zapatos), en el lateral corto una etiquetita blanca con "N° 42" y un dibujo de línea de
  un zapato (navy, genérico, sin marca). En la tapa, cinta de papel pegada torcida con **"TICKETS"** en Caveat 700
  navy. Adentro: papel de seda crema arrugado y **tickets térmicos** (tiras blanco-crema con renglones grises, un poco
  enrulados). Al abrirla, los tickets **saltan como resorte** (8-12 tiras que suben, giran y caen sobre el mostrador:
  pop con semilla). Variantes: **"MES PASADO"** (más gorda, la tapa no cierra, tickets que asoman por los costados,
  atada con piolín rojo apagado en cruz, etiqueta en rojo apagado) y **"CAFETERÍA"** (la de Marta, parte 2: la misma
  caja con etiqueta "CAFETERÍA" y un pocillo dibujado en navy).
- **crearPincheBoletas**: base de disco navy3 pesada (8 cm), varilla de metal gris claro de 15 cm con punta, y 10-14
  boletas pinchadas (rectángulos crema con renglones, cada uno girado distinto). En el time-lapse se van sacando de a
  una (la pila baja) hasta que queda **pelado**; el pinche pelado se ve en P4-P5.
- **crearPocillo** (de la cafetería de Marta): pocillo de cerámica crema `#efeee5` con una franja verde de marca y asa,
  sobre su platito crema con borde navy3; café oscuro `#3a2a20` adentro con la espuma crema en anillo (cortado), y
  vapor (crearVapor) solo en el primero de cada vuelta. **Torre de pocillos**: cada nuevo pocillo con su platito se
  apoya ARRIBA del anterior (platito sobre el pocillo de abajo); la torre se inclina un poco hacia la derecha a partir
  del cuarto y se balancea suave cada vez que suma uno (sin caerse nunca). Alturas: 1, 2, 4, 7. En la parte 2, la
  misma torre de 7 sobre una bandeja redonda navy3.
- **crearLamparaBanquero**: base rectangular navy3, brazo de bronce apagado `#9a8556`, pantalla de vidrio semicilíndrica
  **verde de marca `#5ce611`** (material con emissive suave, sin bloom), cadenita con bolita. Arroja el charco de luz
  sobre la tapa del mostrador. Es la "luz de la noche" del reel y no cambia.
- **crearPersiana**: persiana metálica de lamas horizontales (lamas crema con canal navy cada 11 cm), cajón arriba
  navy3, borde de abajo con perfil navy3 y una manija. Parámetro `alto` (cuánto baja). Del otro lado, la calle navy
  oscuro `#0b1220` plana (P1-P3); a la mañana (P4) **la franja de debajo de la persiana pasa a crema cálido `#f4ecd2`
  plano** y proyecta un rectángulo de luz en el piso: es lo único que cambia de luz en todo el reel, y es por el pan.
- **Bolsa de pan**: crearBolsaPapel con tres crearPanFlauta asomando (doradas, con sus cortes), que entra por debajo de
  la persiana empujada por una mano (antebrazo con manga navy2), se desliza 40 cm por el piso y queda apoyada.
- **crearCajon** (de refrescos, para que Marta se siente): cajón de plástico navy3 con agujeros, sin marca ni logo.
  Parte 2: Marta lo trae bajo el brazo; al final Rubén se sienta.
- **Celular de Rubén** (crearCelular, parte 2): apoyado en un atrilito sobre el mostrador; la pantalla (canvas) con la
  tarjeta de notificación **"Resumen del mes · 21:00"** y, abajo, cuatro filas grandes (Lexend 700 ≥ 40 px en el
  inserto): **"Hoy  $ 18.450"**, **"Mes  $ 412.300"**, **"+8 % contra el mes pasado"** (verde, con flecha para
  arriba), **"Lo que más salió: Yerba"** (verde, con el ícono plano de un paquete). Sin logo de ninguna app.
- Reusados del módulo: crearMate, crearTermo, crearYerba, crearGalletitas, crearFideos, crearDulceDeLeche,
  crearPolenta, crearBolsaPapel, crearPanFlauta, crearVapor, crearCelular, crearBanquito (si se prefiere al cajón:
  NO, va el cajón de refrescos, que es de Marta).
- **Poses nuevas:** `BRAZOS.teclea` (las dos manos sobre la calculadora; en el time-lapse la derecha teclea a
  velocidad de dibujito, posición repetida con semilla, sin blur); `BRAZOS.leeCinta` (las dos manos sostienen la cinta
  arrancada a la altura del pecho, la cinta cuelga hasta el piso por delante del mostrador); `BRAZOS.masOMenos` (mano
  derecha abierta, palma abajo, a la altura del pecho y al costado, que rota ±15° dos veces); `AGACHA_CAJA` (Rubén se
  agacha detrás del mostrador y sube con la caja: es bajar el cuerpo entero, no la cabeza); Marta: `AGACHADA`
  (pasando bajo la persiana), `SENTADA` (en el cajón, pocillo en las dos manos), `INCLINADA` (hacia adelante, el
  pocillo a medio camino), `LLEVA_TORRE` (las dos manos sosteniendo la torre / la bandeja a la altura del pecho).

## Voces (Gemini TTS, una toma por archivo; probar 2-3 tomas de cada una en partes/tomas/)
Sin Orus. Desde `reels/como-viene-el-mes`: `node ../../herramientas/voz.mjs partes/<x>.txt partes/tomas/<x>-a.wav --voz
<Voz> --tono "..."`. Recortar silencios (silenceremove) a `partes/rec/`; finales en `assets/voice/`. Medir con
`tiempos.mjs` ("oyó:" tiene que coincidir; "Ahí" puede salir "ahí/aí", está bien).

| archivo | quién | voz | tono (para --tono) | largo |
|---|---|---|---|---|
| 01-marta.txt · "¿Y, cómo viene el mes?" | Marta | Aoede | La dueña de la cafetería de al lado, cuarentona, simpática, al pasar y de colega a colega, como quien saluda al cerrar; la "Y" sola y estirada ("¿Yyy, cómo viene el mes?"), sin interés de chusma ni apuro: pura cortesía. | ~1,4 s · es el gancho (entra a ~0,25 s). **La misma toma se reusa en la parte 2 (Q1)**. |
| 02-ruben.txt · "Pará que te digo." | Rubén | Algenib | Almacenero uruguayo grave y cansado, serio y prolijo, como quien se toma la pregunta en serio y se arremanga; parejo, sin suspiro. | ~1,1 s |
| 03-ruben.txt · "Ahí." | Rubén | Algenib | El mismo Rubén después de una noche entera sumando: seco, bajo, con total naturalidad, como contesta cualquier uruguayo; "Ahí" corto y cerrado, un poco descendente; ni ironía ni lamento. Probar 3 tomas y elegir la más seca. | ~0,5-0,7 s · es EL remate: va después de ~0,7 s de quietud, que se oiga solo. |
| 04-marta.txt · "¿Y comparado con el mes pasado?" | Marta | Aoede | Marta de buena fe, interesada de verdad, con una sonrisa, sin picardía ni sorna: pregunta lo que preguntaría cualquier colega. | ~1,6 s · si pasa de 1,8, atempo 1,1 |
| 05-marta.txt · "Pongo otro café." | Marta | Aoede | Marta resignada con cariño y sin queja, práctica, ya levantándose; como quien acepta que la noche sigue. Corto, cálido. | ~1,0 s |
| 06-narrador.txt · "Una automatización más tarde." | Narrador del cartel | Rasalgethi | — | **No se genera:** reusar `reels/anotamelo/assets/voice/narrador.wav` (misma frase). |
| (sin archivo) · "¿Y, cómo viene el mes?" en Q1 | Marta | Aoede | la misma toma de 01 | callback exacto |
| 07-ruben.txt · "Ocho por ciento arriba del mes pasado. Lo que más salió fue la yerba." | Rubén | Algenib | El mismo Rubén grave, ahora tranquilo y al toque, leyendo de reojo el celular con el mate en la mano; seguro, casi orgulloso sin presumir, ritmo más ágil que en la parte 1. Pausa corta (0,15 s) entre las dos frases. | ~3,2 s · si pasa de 3,5, atempo 1,1 |
| 08-ruben.txt · "¿Y a vos?" | Rubén | Algenib | Rubén amable y genuino, devolviendo la cortesía, con media sonrisa; nada de chicana. | ~0,6 s |
| 09-marta.txt · "Pará que te digo." | Marta | Aoede | Marta pescada, después de una pausa: seria de golpe, arremangándose, la misma frase y la misma entonación que Rubén en la parte 1 (es el espejo); sin vergüenza, decidida. | ~1,0 s |

Si alguna voz de siempre no estuviera disponible, no cambiarla: avisar.

## PARTE 1 · el problema (0,00-17,40 s)

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-2,30 | **P1 · cuadro 0, plano general.** Desde adentro del local, a la altura del pecho, en diagonal: a la izquierda la persiana a media altura (con la calle navy oscuro por debajo) y Marta pasando agachada; a la derecha el mostrador con la lámpara verde prendida, Rubén detrás, de frente; sobre el mostrador, en primer término y grandes, **la caja de zapatos "TICKETS"** y **el pinche lleno de boletas** (entre los dos, ~45 % del ancho). Push-in lento hacia el mostrador. | **Cuadro 0:** gancho entero arriba al centro, Lexend 900 ~130 px: **"¿Y, cómo viene el mes?"** con **"mes?"** en el recuadro verde; ya están Marta (agachada a medias, con un pocillo humeante), Rubén y la caja. 0,25 · voz de Marta (el gancho se apaga en 0,3 s y arrancan los subtítulos). 0,60-1,20 · Marta se endereza adentro y apoya el pocillo en el mostrador (pocillo 1 de la torre). 1,70 · Rubén baja la vista a la caja de zapatos (CARA.neutra, ojos abiertos). | persiana: roce metálico corto 0,05 (CC0) · ambiente de noche: heladera (`zumbido.wav`) y calle muy lejos, todo el reel · música pizzicato desde 0,0 · clink de pocillo sobre platito 1,10 (CC0) |
| 2,30-3,90 | **P2 · "Pará que te digo."** Plano medio de Rubén de frente, la caja y el pinche abajo en el cuadro (~60 % del ancho). Push-in corto en la caja. | 2,40 · Rubén: **"Pará que te digo."** (se arremanga: un gesto de manga, manos abajo). 3,40 · levanta la tapa y **los tickets saltan como resorte** (8-12 tiras, suben ~40 cm, giran y caen sobre el mostrador). 3,65 · la mano derecha arrastra la **calculadora con rollo** desde la derecha del cuadro hasta el centro (pop de entrada, llena ~45 % del ancho). | pop + papel en ráfaga 3,40 (`pop.mp3` + `papel.wav`) · arrastre de plástico sobre madera 3,65 (`k-book_place_1` o CC0) |
| 3,90-9,10 | **P3 · la noche (time-lapse).** Cámara continua (Catmull-Rom): grúa que sube y se abre en órbita lenta de ~70° hasta un **plano general alto desde el lado del cliente** (la montaña de cinta crece en primer término, abajo; Rubén y la lámpara al centro; Marta y la persiana a la izquierda; la torre de pocillos a la derecha del mostrador, a la vista). Nada de cortes. | Rubén teclea a velocidad de dibujito (BRAZOS.teclea), la calculadora imprime sin parar y la **cinta se riza y cae por el frente del mostrador**: la montaña sube del piso al borde del mostrador (4,0 → 7,0) y al pecho de Rubén (→ 9,0). Las boletas salen del pinche de a una (la pila baja) y la caja de zapatos se vacía. **Marta va y vuelve** (sale por debajo de la persiana y entra con otro pocillo, en loop rápido): torre **2 (4,60) → 4 (6,00) → 7 (7,60)**, cada pocillo nuevo se apoya arriba y la torre se balancea. Marta: parada (3,9) → apoyada en el mostrador con el codo (5,3) → **sentada en el cajón de refrescos** con el pocillo en las dos manos (6,8 en adelante). Al final de P3 la caja está vacía y el pinche pelado. | teclas en ráfagas (CC0, cada 0,1-0,15 s) · impresora de la calculadora "trrrk" en loop debajo (CC0: adding machine / receipt printer; si no hay, anotar) · clink de pocillo en cada uno que se apila 4,60 / 6,00 / 6,35 / 7,60 / 7,85 / 8,10 · persiana (roce corto) cada vez que Marta pasa · música: el mismo pizzicato, este tramo con atempo 1,2 (sin cambio de tono) |
| 9,10-10,30 | **P4 · la mañana.** 9,10 corte a un plano bajo, al ras del piso, junto a la persiana (la montaña de cinta a la derecha, desenfocada): **la franja de debajo de la persiana pasa de navy a crema cálido** y entra **la mano del panadero empujando la bolsa del pan** con tres flautas (9,30-9,70), que se desliza y queda apoyada. 9,80 corte al inserto de la calculadora desde arriba (llena el 65 % del cuadro): el dedo de Rubén aprieta **TOTAL**, la calculadora imprime la última línea ("412.300 ✱"… no se lee todavía, va de canto) y **10,05 Rubén arranca la cinta** (la mano tira hacia arriba y el papel se corta en el filo dentado). | la bolsa de papel sobre baldosa 9,60 (`k-book_place_2` + `papel.wav` bajo) · un pájaro lejano NO (sería cliché): nada · tecla TOTAL 9,90 (click seco) · impresora: un "trrrk" largo 9,92-10,02 · **papel que se rasga** 10,05 (CC0) |
| 10,30-13,40 | **P5 · la pausa y el remate.** 10,30 plano medio de Rubén de frente, por arriba de la montaña de cinta (la montaña le llega a la mitad del pecho desde cámara), la lámpara verde arriba a la izquierda del cuadro, la cinta arrancada en las dos manos que le **cuelga hasta perderse en la montaña**. 11,40 contraplano: Marta sentada en el cajón (plano medio, la torre de 7 pocillos a su lado sobre el mostrador, desenfocada), se inclina hacia adelante, el pocillo a medio camino de la boca, ojos grandes. 12,10 vuelta a Rubén, push-in lento a plano corto. | 10,30-11,30 · Rubén **lee la cinta de arriba abajo** (BRAZOS.leeCinta): los ojos bajan, la cabeza acompaña un poco, las manos "trepan" la cinta (se ve impreso "1.250 +", "380 +"… ≥ 36 px, sin el total legible: el número no importa). 11,40 · Marta INCLINADA, expectante. **12,10-12,80 quietud:** la música baja a -12 dB en 0,4 s (no se corta), solo la heladera; Rubén levanta la vista a Marta, cara de nada (CARA.neutra, ojos abiertos, nada de párpados caídos). 12,80 · **Rubén (Algenib): "Ahí."** + `BRAZOS.masOMenos` (la mano derecha suelta la cinta, se abre palma abajo a la altura del pecho y se balancea dos veces). Subtítulo "**Ahí.**" en el recuadro verde y burbuja grande crema. | papel (manos que pasan la cinta) 10,40-11,20 suave · nada en la quietud salvo la heladera · voz 12,80 · la música vuelve a su nivel en 13,30 |
| 13,40-17,40 | **P6 · remate del remate.** 13,40 plano general medio de costado (los dos a la vista: Marta a la izquierda en el cajón, Rubén a la derecha detrás del mostrador, la montaña de cinta abajo, la torre en el mostrador). 15,20 inserto del mostrador desde el lado del cliente, cámara a la altura de la tapa. 16,00 vuelta al plano de costado; Marta sale por la izquierda. | 13,50 · **Marta**, de buena fe: **"¿Y comparado con el mes pasado?"** 15,10 · Rubén, cara de nada y sin decir nada, **baja entero detrás del mostrador** (AGACHA_CAJA, desaparece) y **15,30 sube y apoya de golpe la otra caja: "MES PASADO"**, más gorda, tapa que no cierra, tickets que asoman, atada con piolín rojo apagado (golpe seco y polvillo de 6-8 motas que se asientan; la torre de pocillos se sacude). 15,70 · el dedo aprieta **"C"**: la pantalla de la calculadora pasa a **"0."** (inserto chico dentro del mismo plano: la calculadora queda en primer término a la derecha). 16,10 · Marta se levanta del cajón, agarra **la torre de pocillos entera con las dos manos** (LLEVA_TORRE): **"Pongo otro café."** (16,20) y sale agachada por debajo de la persiana con la torre. Último cuadro (17,40): Rubén ya tecleando de nuevo, la calculadora que imprime; el cajón vacío. | voz 13,50 · cuerpo que baja (roce de ropa `k-cloth_1`) 15,10 · **golpe de caja de cartón** 15,30 (`k-book_place_1` grave + `papel.wav`) · tecla C 15,70 (click) · "beep" chico de calculadora NO (sería sintetizado): solo el click · clink de la torre que se levanta 16,10 · persiana 17,00 · la impresora arranca de nuevo 17,10 · la música sube para el cartel |

Último cuadro (17,40) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Una automatización más tarde…" (17,40-20,40 s)
El de anotamelo tal cual: **"Un sistema"** (línea a, 140 px) / **"más tarde…"** (línea b, 146 px), Lexend 900 crema
con borde navy, letras que rebotan, -4°, fondo verde de marca con manchas y burbujas. Entra girando el último cuadro de
la parte 1, sale con iris al primer cuadro de la parte 2. Voz: `reels/anotamelo/assets/voice/narrador.wav` (Rasalgethi).
Stinger y whooshes del ejemplar. Nunca dice "Scalerics".

## PARTE 2 · resuelto (20,40-31,80 s)

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 20,40-22,60 | **Q1 · callback de P1:** el mismo encuadre del cuadro 0. El mostrador **limpio** (ni caja ni pinche ni calculadora), la lámpara verde prendida, el **celular de Rubén en un atrilito** donde estaba la caja, el mate y el termo. Rubén detrás, tranquilo, mate en la mano izquierda. | 20,40 · Marta pasa agachada por debajo de la persiana, **preparada para la noche larga**: la **torre de siete pocillos sobre una bandeja** en las dos manos y el **cajón de refrescos colgando del antebrazo** (gag de imagen: viene con todo). 20,65 · **Marta: "¿Y, cómo viene el mes?"** (la misma toma de P1). 21,90 · apoya la bandeja en el mostrador (la torre se balancea) y deja el cajón en el piso, a su lado. | persiana 20,40 · voz 20,65 · clink de torre sobre bandeja 21,90 |
| 22,10-25,90 | **Q2 · el resumen.** 22,10 **vibra el celular** en el atril (se sacude), y la cámara hace push-in rápido hasta el **inserto del celular** (llena ~60 % del cuadro, la lámpara verde detrás, desenfocada): la notificación **"Resumen del mes · 21:00"** se abre en la tarjeta con las cuatro filas. 23,30 corte a plano medio de Rubén de frente, mirándolo de reojo, sin dejar el mate. 25,00 paneo corto al estante: **la yerba**. | 22,15 · la tarjeta se arma fila por fila: "Hoy $ 18.450" (22,40), "Mes $ 412.300" (22,70), **"+8 % contra el mes pasado"** (23,00, verde con flecha). 23,40 · **Rubén: "Ocho por ciento arriba del mes pasado. Lo que más salió fue la yerba."** (al toque, sin levantarse). 25,00 · en el estante, el paquete de yerba hace pop y le aparece al costado un **tilde verde** grande; la fila **"Lo que más salió: Yerba"** se pinta de verde en el celular (inserto chico arriba a la derecha, o la cámara pasa de la yerba al celular en un mismo movimiento). | vibra 22,10 (`vibra.wav`) · notification 22,15 · pop por fila 22,40 / 22,70 / 23,00 · voz 23,40 · whoosh-short 25,00 · ding 25,10 |
| 25,90-28,10 | **Q3 · "¿Y a vos?"** 25,90 contraplano a Marta (plano medio, por encima del hombro de Rubén: el mate en primer término), con la bandeja de siete pocillos todavía en las manos, mirándola: no sabe qué hacer con tanto café (los ojos van a la torre y vuelven). 26,90 vuelta a Rubén, plano medio. | 26,30 · Marta sube y baja apenas la bandeja (la torre tiembla). 27,00 · **Rubén**, amable: **"¿Y a vos?"** 27,60 · corte a Marta: **se congela** (0,5 s de quietud: la torre deja de temblar, ella abre grandes los ojos; la música baja a -8 dB, no se corta). | voz 27,00 · nada en la quietud salvo la heladera |
| 28,10-31,80 | **Q4 · el espejo y el cierre.** 28,10 plano medio de Marta de frente; 29,00 grúa corta hacia atrás hasta el plano general de costado (el de P6): Marta a la izquierda con su caja, Rubén pasa al lado del cliente y se sienta en el cajón. | 28,15 · **Marta: "Pará que te digo."** (seria de golpe, el gesto de arremangarse de Rubén en P2). 29,00 · saca de su bolsa **su propia caja de zapatos, "CAFETERÍA"**, la apoya en el mostrador, levanta la tapa: **los tickets saltan como resorte** (el mismo pop de P2). 29,60 · Rubén sale de atrás del mostrador con el mate, **le saca un pocillo de arriba de la torre**, agarra el cajón de refrescos que trajo Marta y **se sienta** donde se sentaba Marta, mate en una mano y pocillo en la otra: ahora el que espera es él (sin guiño, cara tranquila, toma un sorbo del pocillo). 30,30 · **línea chica** (caja navy con borde verde, Lexend 600 ≥ 36 px, arriba, sin tapar la caja ni las caras): **"Una automatización te manda al celular cómo viene el mes"** / **"scalerics.com"** en verde (1,5 s, hasta el final). Sin tarjeta de videollamada. | voz 28,15 · pop + papel en ráfaga 29,05 (los mismos de P2) · clink de pocillo 29,80 · cajón de plástico al piso 21,95 y 30,00 (CC0 impacto de plástico) · la música cierra |

## Música y sonido
Pizzicato del repo (`bgm/pizzicato.wav`, la firma de la línea) en las dos partes; en el time-lapse P3 el mismo tema con
atempo 1,2. Duck de -6 dB debajo de cada voz. Pausas (12,10 y 27,60): la música baja en fundido de 0,4 s y vuelve,
**nunca se corta seca**. Ambiente: heladera (`zumbido.wav`) bajo todo el reel; la calle (`calle.wav`) casi nada, solo
cuando la persiana se ve abierta abajo. Techo por efecto -31 LUFS (TECHO), voz ≥ 6 LU sobre el resto en cada tramo de
0,5 s, final -14 LUFS, pico -1,5 dBFS. **SFX que no están en assets/sfx** (teclas de calculadora, la impresora de la
calculadora, papel que se rasga, clink de pocillo/platito, persiana metálica, cajón de plástico): reales con licencia
CC0 (Kenney "Impact Sounds" tiene `impactPlate_light` para la cerámica e `impactMetal` / `impactPlank` para la
persiana; espejos de GitHub como en anotamelo), con autor, sitio y licencia en `fuentes.md`. Nunca sintetizados. Si
no aparece una impresora de calculadora CC0, usar teclas reales + roce de papel real y anotarlo.

## Revisión pedida para este reel (además de 8c)
- **La montaña de cinta** nunca atraviesa a Rubén, al mostrador ni a Marta; se ve que crece entre plano y plano
  (continuidad: en P4-P6 está del mismo tamaño; en la parte 2 no está).
- **La torre de pocillos**: siempre apoyada (cada platito sobre el pocillo de abajo, sin flotar), cuenta correcta en
  cada plano (1 en P1-P2, 2 / 4 / 7 en P3, 7 de P4 a P6, se va con Marta en P6; 7 en la bandeja en la parte 2, 6 cuando
  Rubén saca uno). Que no se cuelen pocillos de más ni de menos entre cortes.
- **La mano del panadero**: solo antebrazo y mano, entra y sale por debajo de la persiana, sin cortar el borde de la
  persiana ni atravesar el piso.
- "Ahí." se tiene que leer sin sonido: burbuja grande + subtítulo en el recuadro verde + la mano "más o menos" bien
  visible y lejos de la cara.
- Las cajas "TICKETS", "MES PASADO" y "CAFETERÍA" y la tarjeta del celular se leen en el celular (≥ 44 px donde importa).
- Rubén se agacha detrás del mostrador en P6: que no quede un hueco vacío más de 0,2 s y que la caja no aparezca antes
  que sus manos.
- La lámpara verde: emissive plano, sin halo ni bandas; el charco de luz de borde duro.
- Marta no queda como chusma ni como la que lo apura: pregunta de buena fe y la parte 2 la pesca con cariño.

## Portada (sugerencia)
`t` ≈ 12,0 (Rubén enterrado en la montaña de cinta hasta el pecho, la cinta en las manos, la lámpara verde, la torre
de pocillos) o ≈ 8,5 (plano general alto con la montaña y Marta en el cajón). `chica`: "¿Cómo viene el mes?" ·
`grande`: "Ahí." · `sello`: "Fin de mes". Acento `#5ce611`. Fondo renderizado sin gancho, subtítulos ni burbujas.


## Cambios de las rondas de corrección (constructor)
- Cartel: "Una automatización / más tarde…" (anotamelo ya había usado "Un sistema…"), voz Rasalgethi nueva. Línea chica: "Una automatización te manda / al celular cómo viene el mes / scalerics.com".
- Final (ronda 2, decisión del coordinador): Rubén se queda detrás del mostrador, le saca un pocillo a la torre, lo deja junto a él y toma mate; Marta suma con su caja CAFETERÍA. Ver NOTAS-constructor.md.
