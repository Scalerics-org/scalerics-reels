# lo-mismo-que-la-otra-vez · PARA MANDAR completo (3D real), ~28,8 s

Graciela le pide a Rubén "lo mismo que la otra vez" y no dice qué. Rubén saca medio almacén (cada producto aparece
3D grande y se apila en el mostrador) y ella dice que no a todo. Su pista: "¡Era verde!". La estantería entera es
verde. "Todo es verde, Graciela." / "Verde clarito." Cartel "Un sistema de clientes más tarde…". Otro sábado: Rubén
toca "Graciela" en la tablet sin soltar el mate, la ficha dice la última compra (era de limpieza: dos jabones en pan
verdes) y la bolsa está en el mostrador antes de que ella termine la frase. "Era verde." y guiño.

- Producto: sistema de clientes (CRM): saber qué compró cada cliente y cuándo. Solo en la línea chica final y en
  descripcion.txt. El cartel NUNCA dice Scalerics.
- Recurso visual central: la pila de productos 3D que crece en el mostrador (parte 1) y la estantería toda verde en
  un latigazo de cámara; en la parte 2, la tablet con la ficha de Graciela a pantalla casi completa.
- Estructura como `reels/abren-hoy-completo`: parte 1 (14,0 s, sin línea chica) + cartel (3,2 s) + parte 2 (11,6 s,
  con la línea chica). Un proyecto 3D con dos "días" (T1 y T2 en gen.mjs) o dos renders unidos por `armar.mjs unir`,
  como prefiera el constructor; el cartel se reusa de `reels/abren-hoy-completo/compositions/cartel.html` cambiando
  el texto (3 líneas: "Un sistema" / "de clientes" / "más tarde…").
- Personajes: Rubén (ELENCO.almacenero, protagonista, voz Gemini Algenib) y Graciela (ELENCO.clienta, sin voz: solo
  globos). Sin Orus. Sin marcas reales: todos los envases genéricos, con rótulos en Lexend que dicen qué son.

## Paleta y set (para diferenciarlo en el feed)
- Color dominante: **navy claro `#16243d`**: la pared del fondo del almacén, los laterales, y el `background` del body
  y de `#root`. Mostrador navy3 `#1f3254` con tapa de madera (como abren-hoy), estantes de madera clara.
- Productos que ofrece Rubén: crema `#efeee5`, rojo apagado `#c7655b`, mostaza `#d9a441`, blanco, navy. NINGUNO verde
  (si no, el gag de la estantería no funciona).
- Estantería del fondo: en los planos de la parte 1 antes del latigazo, la cámara no la muestra de frente (se ve
  desenfocada o de costado con los productos de colores de siempre). En el latigazo (P5) la cámara llega a un tramo
  de estantería donde TODO es verde (verde de marca `#5ce611` y verde oscuro `#3fa60a`, con algún crema de etiqueta):
  tiene que llenar el cuadro entero, sin un hueco navy.
- Subtítulos y globos: Lexend; la palabra clave del subtítulo de la voz en el recuadro verde de selección
  (como "Graciela." en abren-hoy).
- Sin emojis, sin rayas largas en textos visibles.

## PARTE 1 · el problema (0,0-14,0 s)
Pill de hora abajo a la derecha (como abren-hoy, s01-hora): `SÁBADO · 11:40`, hasta 9,1 s.

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-1,70 | **P1 general 3/4** desde el lado de la clienta, a la altura del pecho. Mostrador cruzando el tercio inferior; Graciela a la izquierda, de 3/4 (cara a la vista); Rubén atrás del mostrador, apoyado (BRAZOS.apoyado), sonrisa servicial. Push-in lento. | **Cuadro 0 = la escena con el globo ya entrando** (escala 0,6 → 1). 0,25 · globo de Graciela, grande y arriba, cola hacia ella: **"Lo mismo que la otra vez."** (pop). 1,05 · a Rubén se le congela la sonrisa: ojos abiertos de más, cejas arriba, sonrisa fija (mezcla CARA.sonrisa + sorpresa sin abrir la boca). | ambiente interior, música pizzicato desde 0; pop del globo 0,25 |
| 1,70-2,60 | **P2 primer plano de Rubén** (contraplano desde atrás del hombro de Graciela, desenfocada en primer término). | Rubén piensa: mano al mentón (pose nueva PIENSA), ojos arriba a la derecha, una ceja arriba (CARA.incredula). Parpadeo lento. | ninguno (que respire) |
| 2,60-6,20 | **P3 plano medio frontal del mostrador** desde atrás de Graciela (hombro y rulos lila a la izquierda del cuadro, cortados con gusto). La cámara se aleja de a poco (dolly hacia atrás) a medida que la pila crece, para que la pila entera quede siempre en cuadro y llenando el 60-70 % del ancho. | Cada producto: Rubén lo levanta con las dos manos hacia cámara (pose nueva OFRECE), el producto entra **grande con pop** (escala 0 → 1,15 → 1), llena medio ancho de pantalla en la mano de Rubén, y cuando ella dice que no, él lo deja en la pila (cae con un rebotito y queda torcido). Ritmo que se acelera: | |
| 2,60 | | globo Rubén **"¿Yerba?"** + paquete de yerba de 1 kg | pop 2,60 |
| 3,05 | | globo Graciela **"No."**; él lo deja: 3,25 | pop corto; golpe de paquete 3,30 |
| 3,45 | | **"¿Galletitas?"** + paquete tubular de galletitas de agua | pop |
| 3,85 | | **"No."**; lo deja 4,00 | golpe |
| 4,20 | | **"¿Dulce de leche?"** + pote de dulce de leche | pop |
| 4,55 | | **"No."**; lo deja 4,68 | golpe |
| 4,85 | | **"¿Fideos?"** + paquete de spaghetti | pop |
| 5,10 | | **"No."** (globo más chico); lo deja 5,20 | golpe |
| 5,35 | | **"¿Huevos?"** + maple de 12 | pop |
| 5,55-6,10 | | ella ya no habla: niega con la cabeza dos veces (helper nuevo `niega`), labios apretados. Él deja el maple arriba de la pila, que se tambalea. Pila final: 5 productos, alto ~1,5 veces la cabeza de Rubén. Los globos de esta tanda se apilan como chat (los 2 últimos a la vista, el nuevo empuja al viejo) y se van en 6,15. | golpe; tambaleo (crujido de cartón) |
| 6,20-7,40 | **P4 contraplano bajo de Graciela** (como el de abren-hoy cuando mira el cartel), la pila desenfocada en el borde. | 6,20-6,80 · **pausa**: ella piensa, ojos arriba, índice en el mentón (CARA.concentrada). La música baja 8 dB. 6,85 · levanta el índice (pose nueva INDICE), cara feliz, orgullosa: globo **"¡Era verde!"** (pop). | pop + ding chico (chime -20 dB) 6,85 |
| 7,40-9,20 | **P5 latigazo** (whip pan con motion blur, 0,25 s) de Graciela a la estantería del fondo, y travelling lateral lento por un tramo donde **todo es verde**: llena el cuadro de borde a borde. | Contador 3D pegado a cámara, arriba y limpio (como "Hoy: 47 veces"): **"Cosas verdes: 1"** aparece en 7,75 y rueda rápido hasta **37** en 8,9 (rodillo, desacelera al final). El jabón en pan verde está en el estante del medio, sin destacar (para el que lo vuelva a ver). | whoosh 7,40; click por número (key-press muy bajo, cada vez más seguido); chime en el 37 |
| 9,20-12,30 | **P6 primer plano de Rubén** de frente, la estantería verde atrás (desenfocada). | 9,20 · gira la cabeza lento a cámara, cara de nada (CARA.resignado con ojos a media asta). **9,25 la música se corta seco.** Pausa 0,5 s. 9,80 · **voz (Algenib): "Todo es verde, Graciela."** (~1,8 s, suspiro antes si sale natural), la boca sigue la envolvente. Subtítulo palabra por palabra abajo de su cara (como s02-linea de abren-hoy), **"verde"** en el recuadro verde de selección. | voz; nada más (silencio de música = el chiste) |
| 12,30-14,00 | **P7 general** (el de P1 un poco más abierto: entra la pila entera). | 12,35 · globo Graciela, servicial: **"Verde clarito."** (pop). 12,80 · vuelve el contador arriba: "Cosas verdes: 37"; "verdes" se tacha con una raya roja apagada y abajo entra "verde clarito" → **"Cosas verde clarito: 37"** (el número NO cambia). 12,90 tuba. 13,05 · Rubén apoya la frente en la pila (pose nueva FRENTE: inclina fuerte hacia adelante, frente sobre el paquete de yerba); 13,30 el paquete de galletitas se cae del mostrador rodando (física hecha a mano, determinista). Termina en 14,0 sin línea chica. | pop 12,35; key-press + tuba 12,90; golpe sordo de frente 13,05; paquete que cae 13,35 |

Último cuadro (14,0) → `assets/img/fin-parte1.png` para el giro del cartel.

## CARTEL · "Un sistema de clientes más tarde…" (3,2 s)
Copia de `reels/abren-hoy-completo/compositions/cartel.html` con otro texto: tres líneas, "Un sistema" (136 px) /
"de clientes" (136 px) / "más tarde…" (146 px). Revisar que "de clientes" entre en el 80 % seguro con el borde navy
de 16 px (si no, 128 px). Fondo verde de marca con manchas y burbujas, letras que rebotan, entrada girando el último
cuadro de la parte 1, salida con iris al primero de la parte 2. Voz Gemini Rasalgethi: "Un sistema de clientes más
tarde." (narrador caricaturesco de dibujito; probar 2 tomas y quedarse con la más exagerada que diga bien
"sistema"). Stinger de vibráfono y whooshes iguales que en el ejemplar. **No dice "CRM"** (en voz suena a sigla
rara y el dueño no la usa) **ni "Scalerics"**.

## PARTE 2 · resuelto (0,0-11,6 s de la parte; 17,2-28,8 del reel)
Pill de hora: `OTRO SÁBADO · 11:40` (hasta 6,0).

| t (s) | plano y cámara | qué pasa | SFX |
|---|---|---|---|
| 0,00-1,30 | **Q1 general 3/4, mismo encuadre que P1** (callback). | Rubén con el mate en la mano izquierda (crearMate), relajado; **sobre el mostrador una tablet** apoyada en un atril (nueva). La pila no está. 0,10 · campanita de la puerta (ella recién entró, ya está en el mostrador). 0,35 · globo de Graciela que se va escribiendo letra por letra al ritmo del habla: "Lo mismo que la ot…". 0,60 · Rubén, sin mirar, toca la tablet con el índice derecho. | campanita 0,10; tecla suave en el toque 0,60 |
| 1,30-3,10 | **Q2 inserto cenital de la tablet**, grande (70 % del ancho), un poco inclinada, el mate y la mano de Rubén entrando por el borde. | Pantalla (canvas, textos ≥ 36 px): lista "Clientes" con 4 nombres; 1,45 el dedo toca **"Graciela"** (ripple verde) → 1,70 ficha: avatar "G" verde, **"Graciela"**, **"Última compra: sáb 17/10"** y 3 renglones que entran uno por uno con tilde verde: **"2 jabones en pan (verdes)"** 2,05 · **"1 lavandina 2 L"** 2,40 · **"3 esponjas"** 2,70. El globo de Graciela sigue arriba, congelado en "Lo mismo que la ot…". | key-press + chime bajo por tilde |
| 3,10-4,60 | **Q3 plano medio frontal** (el de P3, callback de la pila). | Pop, pop, pop: **bolsa de papel** en el mostrador con el contenido que entra de a uno por arriba (jabones en pan verdes, lavandina, esponjas: asoman por arriba de la bolsa), 3,20 / 3,45 / 3,70. 3,95 · Rubén empuja la bolsa hacia ella con una mano, sin soltar el mate. Graciela quieta, boca abierta a mitad de palabra (CARA.sorpresa); su globo sigue cortado. | pop por cosa; arrastre de bolsa de papel 3,95 |
| 4,60-6,00 | **Q4 primer plano de Graciela** (en sus lentes se refleja el verde del jabón, pose.reflejo). | 4,60 sorpresa → 5,00 feliz; levanta el jabón en pan verde (lo saca de la bolsa) y globo **"¡Eso! ¿Cómo supiste?"** (5,15, pop). | pop |
| 6,00-9,40 | **Q5 primer plano de Rubén**, push-in lento todo el tramo. | 6,00-6,80 sorbe el mate con los ojos cerrados (sorbo). 6,90 baja el mate, mira a cámara de reojo, canchero. 7,10 · **voz (Algenib): "Era verde."** (~1,0 s; tono satisfecho, nada cansado). Subtítulo con **"verde"** en el recuadro de selección. 8,30 · guiño (ojos.guiño) + sonrisa (CARA.sonrisa), levanta apenas el mate como brindis. | sorbo 6,00; voz 7,10; chime chiquito en el guiño 8,30 |
| 9,40-11,60 | **Q6 general que se abre** (dolly atrás suave). | Graciela se va contenta con la bolsa (paso, da media vuelta), Rubén toma mate. 9,90 · **línea chica** abajo (caja navy con borde verde como s03-cierre de abren-hoy): **"Tu sistema se acuerda de lo que compra cada cliente"** / **"scalerics.com"** (1,7 s, hasta el final). | campanita al irse 10,6 (bajita) |

## Objetos 3D por plano (todos genéricos, sin marcas; cada uno que alguien reconozca sin dudar)
- **Set**: el almacén de abren-hoy por dentro, con pared del fondo navy claro `#16243d`; estantes de madera; mostrador
  navy3 con tapa de madera; frasco de caramelos y balanza (de abren-hoy). Cuidar que lo que ya existe se vea igual.
- **Paquete de yerba de 1 kg**: ladrillo vertical de papel (0,16 × 0,26 × 0,09), parte de arriba doblada en
  "fuelle" y plegada hacia adelante (como se cierran los paquetes de yerba), etiqueta crema con banda roja apagada,
  hoja de yerba dibujada (canvas) y "YERBA MATE · 1 kg" en Lexend. Papel mate (roughness alta).
- **Galletitas de agua**: paquete tubular horizontal (cilindro ~0,3 de largo) en celofán crema semi-brillante, los
  dos extremos plisados y retorcidos, las galletitas redondas apiladas de canto que se marcan en el relieve (anillos
  en la superficie), banda roja "GALLETITAS DE AGUA". Es el que se cae al final de la parte 1.
- **Dulce de leche**: pote de plástico blanco (cilindro levemente cónico, 500 g) con tapa navy y etiqueta mostaza
  "DULCE DE LECHE"; una cucharita de madera no hace falta.
- **Fideos**: paquete largo de spaghetti (0,08 × 0,3 × 0,04) de plástico transparente con los fideos mostaza adentro
  (haz de cilindros finos) y etiqueta crema/navy "SPAGHETTI".
- **Maple de huevos**: maple de cartón gris-crema de 12 con las 12 cúpulas, 12 huevos color crema-marrón claro. Queda
  arriba de la pila, torcido.
- **Estantería verde (P5)**: un tramo de 3 estantes lleno de: botellas de detergente verde (con pico), latas de arvejas
  con etiqueta verde, frascos de aceitunas verdes (aceitunas visibles a través del vidrio), cajón de madera con
  manzanas verdes, paquetes verdes, rollos de bolsas verdes, un escobillón con cerdas verdes apoyado al costado,
  botellas de agua con tapa verde, y **2-3 jabones en pan verdes** en el estante del medio. Todo determinista (semilla).
- **Contador 3D** "Cosas verdes: N" (pegado a cámara, igual que "Hoy: 47 veces": tarjeta navy con borde verde, número
  TextGeometry verde), con la variante tachada "Cosas verde clarito: 37".
- **Parte 2**: **tablet** en atril (marco navy oscuro, borde redondeado, pantalla canvas con 3 estados: lista, ficha,
  ficha con tildes); **mate** (crearMate) y **termo** (crearTermo) al lado; **bolsa de papel madera** con la boca
  doblada; **jabón en pan verde**: barra rectangular (0,1 × 0,05 × 0,06) verde translúcido brillante (material
  físico con transmission o clearcoat), con un envoltorio de papel crema a medio abrir; **lavandina**: botella blanca
  de 2 L con manija y tapa roja apagada, etiqueta "LAVANDINA"; **esponjas**: 3 bloques amarillo-mostaza con la cara
  verde oscura de fibra (la verde no es de marca, es la fibra).
- **Globos de diálogo** (nuevos): de historieta con cola hacia el que habla, pegados a cámara y reescalados con el
  fov (como las burbujas de abren-hoy). Graciela: crema con texto navy. Rubén: navy claro con borde verde y texto
  crema. Texto Lexend 700, ≥ 54 px en pantalla, medido y achicado hasta entrar. El de "Lo mismo que la ot…" se escribe
  letra por letra y queda con el cursor quieto.

## Sonido por tramo (todo CC0; techo -31 LUFS por efecto; voz ≥ 6 LU sobre el resto mientras habla)
- Parte 1: ambiente interior de almacén (heladera que zumba + calle lejos; se puede bajar `calle.wav` con lowpass,
  o buscar un "shop interior ambience" CC0), música `pizzicato.wav` de 0 a 9,25 (baja 8 dB en la pausa de 6,2-6,8 y
  se corta seco en 9,25), pops de globos, golpe de paquete sobre madera en cada producto que deja (NUEVO: buscar
  CC0 "box drop on wood / package thud"), crujido de cartón en el tambaleo, whoosh del latigazo, clicks del
  contador, chime en el 37, voz, tuba en "verde clarito", golpe sordo de la frente, paquete que cae y rueda (NUEVO CC0).
- Cartel: el de abren-hoy-completo (whoosh, stinger CC0, Rasalgethi, whoosh del iris).
- Parte 2: ambiente, música pizzicato desde 0 sin cortes (todo anda; baja 9 dB mientras habla Rubén, como
  abren-hoy-2), campanita, tecla/toque en la tablet, key-press + chime por tilde, pops de la bolsa, arrastre de bolsa
  de papel (NUEVO CC0 "paper bag"), sorbo de mate, voz, chime del guiño.
- Final -14 LUFS, pico -1,5 dBFS, `alimiter` después del loudnorm como en el ejemplar.

## Cosas nuevas para `assets/personajes.js` (sumarlas al módulo canónico, mismo estilo)
- `BRAZOS.piensa` (mano derecha al mentón, codo abajo) y `BRAZOS.ofrece` (dos manos adelante a la altura del pecho
  sosteniendo algo de ~0,2 de ancho; exponer el punto entre las manos para colgar el producto).
- `INDICE` (mano izquierda arriba con el índice estirado: hace falta un dedo índice si `dedos: false`; si no hay
  dedos, una mano cerrada con un cilindro índice).
- `niega(t, t0, t1)`: helper de cabeza.giro oscilando (±0,35, 2 ciclos) con ease.
- `FRENTE` (inclina ~0,55, cabeza.asiente 0,6, manos en el mostrador): la frente contra la pila.
- Utilería: `crearYerba()`, `crearGalletitas()`, `crearDulceDeLeche()`, `crearFideos()`, `crearMaple()`,
  `crearJabonPan()`, `crearLavandina()`, `crearEsponja()`, `crearBolsaPapel()`, `crearTablet(lienzo)`.
  Origen en la base, como crearMate.
- Revisar que ninguna mano atraviese un producto ni la cara (el QA lo busca a propósito).

## Cosas nuevas para `assets/tres.js`
- Pared del fondo navy claro; estantería verde del latigazo (tramo propio, fuera de cuadro en los otros planos).
- Globos de diálogo con cola (pegados a cámara), incluido el que se escribe letra por letra.
- Pila de productos con posiciones de reposo a mano (sin física), cada uno con su caída y rebotito deterministas;
  el tambaleo del maple y la caída rodando de las galletitas en 13,30.
- Contador "Cosas verdes" con rodillo 1 → 37 y la variante tachada.
- Latigazo de cámara: tramo de 0,25 s con blur (render a dos sub-cuadros mezclados o un plano de velocidad en la
  capa HTML).
- Tablet con 3 pantallas (canvas) y el toque con ripple.
