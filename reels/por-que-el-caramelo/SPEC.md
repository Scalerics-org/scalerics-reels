# por-que-el-caramelo · explicador "¿Por qué…?" (~33 s, 3D real)

"¿Por qué te traen un caramelo con la cuenta?". Estudio de campo en restaurantes (Strohmetz, Rind, Fisher y Lynn,
2002, ver `fuentes.md`): con un caramelo la propina sube un poco, con dos más, y la más alta es dar uno, amagar a irse
y volver con otro: los mismos dos caramelos. Bisagra "¿Por qué?": pareció un gesto personal. Callback: Rubén no se
acuerda de todos sus clientes; su ficha de clientes le avisa que Graciela hace un año que viene; le da un caramelo con
el ticket, amaga a irse, vuelve con otro: "Y este, para vos." (Rubén, voz Algenib). Cierre: videollamada gratis.
Producto: CRM (ficha de cada cliente). Sin marcas reales. Voz: Orus (88 palabras) + Rubén (4 palabras).

**SIN NÚMEROS de propina en pantalla ni en la voz** (las fuentes no coinciden en cómo presentarlos, ver fuentes.md):
el "contador" son pilas de monedas 3D que crecen en orden.

**Recurso central:** una sola escena Three.js (`assets/tres.js`, `renderAt(t)` puro), base técnica de
`reels/por-que-se-fue` (copiar su `tres.js`, `gen.mjs`, `armar.mjs`, `index.html`, vendor) y personajes de
`reels/abren-hoy/assets/personajes.js` (Rubén = ELENCO.almacenero, Graciela = ELENCO.clienta). El objeto que viaja:
**el caramelo envuelto** y **el platito de la cuenta**, que aparecen en el restaurante y VUELVEN en el mostrador de
Rubén (callback visual). Cámara continua (Catmull-Rom) de objeto en objeto, casi sin cortes secos.

**Fondo navy claro `#16243d` LISO** (los dos últimos explicadores fueron crema y navy oscuro); piso `#1f3254` con
sombra suave; nada de degradés ni brillos (compresión de Instagram). Cierre en verde de marca `#5ce611` con letras navy.

## Construcción (10-11) · guion v2 (ronda 1 de correcciones del revisor de guion y datos)
- Guion v2 en `guion.txt` (v1 en `partes/guion-v1.txt`). Voz pegada en `partes/armar-voz.sh`: Orus línea 1 y 4-7 de
  `orus-a2` (v1), línea 2 de `v3-a2` ("Un estudio comparó las propinas."), línea 3 de `v2-a2`, 8-11 de `v2-b2`, Rubén `v2-ruben7` (Algenib; la única toma en la que STT oye
  "por tu año"), línea 13 de `v2-c1`. Tiempos: `partes/ajustar-tiempos.mjs` (silencios + STT; el cierre a mano). 34,94 s.
- Escenas (reel.json): s01-gancho · s02-estudio · s03-uno-dos · s04-uno-mas-uno · s05-mismos · s06-por-que ("¿Por qué?"
  + "Se sintió como un gesto personal.") · s07-quien (el caramelo cae al frasco; la fila con "?" en "quién") · s08-ficha ·
  s09-vuelve (da uno, mira el aviso, el segundo sale de la tablet; "Y este, por tu año.") · s10-gesto · s11-llamada.
- Pilas proporcionales a la propina promedio (19 / 20 / 22 / 23 monedas finas); la diferencia, en color y tilde.
- Sin tarjetita "Para esta mesa". Rótulo s02 "Estudio publicado en 2002". Ficha: "Clienta desde: hace 1 año", aviso
  "Hoy cumple 1 año / como clienta", lista con Héctor en vez de Nico. El logo entra en s02 (no en el cuadro 0).
- La fila del almacén está a la derecha de Graciela, paralela al mostrador; la tablet, a la izquierda del mostrador.
- En la tarjeta de cierre el caramelo va grande abajo del texto (no en la esquina).
- Ronda 1 de arte y sonido: 36,44 s. Inicios: s02 2,56 · s03 4,83 · s04 8,30 · s05 12,44 · s06 14,58 · s07 17,33 ·
  s08 20,62 · s09 24,54 · s10 31,00 · s11 33,74. Frasco ABIERTO a la izquierda de Rubén (tapa al lado), caramelos desde
  el fondo; estantería lateral y pared de enfrente (solo en el contraplano) para que nunca haya fondo navy vacío;
  s09 en plano a dos (Rubén da uno al platito, mira la tablet, el segundo vuela de la tablet a su palma abierta y
  Graciela lo toma); contraplano de Graciela con estantes atrás y el caramelo en el pecho; s05 los dos pares grandes
  con "=" y las pilas abajo; el "?" sale entero hacia arriba; el caramelo del cierre es crema con rayas verdes.

## Lo que cambia respecto de SPEC-base
Todo lo dibujado es 3D (no líneas SVG). Subtítulos arriba al centro, 1 a 3 palabras, Lexend 700 ~86 px crema con
borde navy; la palabra clave en recuadro verde con letras navy (acentos sugeridos: caramelo, cuenta, midieron, poco,
más, volver, mismos, personal, todos, ficha, año, vuelve, gesto, videollamada). Rojo apagado `#c7655b` solo para el
problema ("no se acuerda": los signos de pregunta sobre las caras). El gancho (s01) y la tarjeta (s12) no llevan
karaoke: tienen el texto grande. Logo blanco abajo. Rótulos con línea guía 6-8 px, Lexend 600 36-44 px. Texto de
interfaz de la tablet 36 px o más. Sin emojis ni rayas largas.

## Paleta de materiales
navy `#16243d`/`#1f3254`/`#0b1220` (mesa, mostrador, tablet, delantales), verde `#5ce611` (el envoltorio del caramelo,
lo resuelto, tildes, "?", la pila ganadora), crema `#efeee5` (mantel, platito, ticket, paredes del almacén), blanco
(pantalla de la tablet), gris crema `#8e8c80` (lo neutro: la pila "sin caramelo"), dorado apagado `#c9a24a` solo para
las monedas (metal; si queda chillón, crema metálico). Rojo apagado `#c7655b` solo en s08.

## Objetos 3D (específicos y reconocibles: "¿alguien lo confunde con otra cosa?")
- **EL CARAMELO ENVUELTO** (protagonista): caramelo duro ovalado dentro de celofán verde `#5ce611` brillante con rayas
  finas crema en espiral, las DOS PUNTAS RETORCIDAS en moño (pliegues tipo abanico, ExtrudeGeometry o Lathe + ruido
  con semilla). Material físico con clearcoat alto (celofán). Que no se confunda con una pastilla ni un bombón: el moño
  de las puntas es la clave. Cuando aparece entra grande, con pop y un giro de 20°.
- **EL PLATITO DE LA CUENTA**: platito ovalado de loza crema con borde navy fino, el ticket doblado a la mitad
  (papel crema, renglones navy impresos, arriba "CUENTA" en Lexend 800, abajo "TOTAL $ ----", tipografía de ticket),
  y el caramelo apoyado encima. En el cuadro 0 llena el 70 % del ancho, visto en contrapicado de 3/4.
- **LA MESA DEL RESTAURANTE**: mesa redonda con mantel crema hasta el piso, dos copas de agua, dos servilletas
  dobladas verdes, dos sillas de madera navy. Dos comensales genéricos sentados (figuras de `crearPersonaje` con
  ropa crema y navy, nombres "Comensal", que NO son del elenco fijo), vistos de 3/4 y de espaldas.
- **LA MOZA**: figura genérica con `crearPersonaje` (no es del elenco fijo: no es Marta), camisa crema, delantal largo
  navy con bolsillo, coleta, y una canastita de mimbre crema con caramelos verdes en la mano. Nunca habla.
- **LAS PILAS DE MONEDAS** (el contador sin números): 4 pilas de monedas 3D (cilindros con canto estriado) sobre una
  regla/bandeja navy, con un caramelo chico encima de cada una como etiqueta: sin caramelo (gris), 1, 2, 1 + 1. Las
  monedas caen de a una desde arriba y apilan (tic metálico por moneda). Alturas en ORDEN, sin escala numérica:
  sin < 1 (apenas más) < 2 < 1 + 1 (la más alta, en verde). Debajo de cada una un rótulo 36-40 px: "Sin caramelo",
  "Uno", "Dos", "Uno + uno".
- **"?" 3D verde** grande y centrado (bisagra), Lexend 800 en TextGeometry, extruido, con bisel.
- **EL ALMACÉN DE RUBÉN**: mostrador navy con frente crema, la caja registradora, el mate y el termo genéricos, una
  estantería atrás con paquetes sin marca, y sobre el mostrador UN FRASCO DE VIDRIO con tapa navy lleno de caramelos
  verdes (el mismo caramelo del restaurante). El mismo platito de la cuenta, ahora con el ticket del almacén.
- **LA FILA DE CLIENTES** (s08): 5-6 siluetas de clientes genéricas (las figuras de `crearPersonaje` en crema plano,
  sin cara detallada) en fila frente al mostrador, cada una con un "?" rojo apagado 3D chico encima. Graciela es una de
  ellas.
- **LA TABLET DEL MOSTRADOR** (CRM): RoundedBox navy con pantalla blanca canvas. Pantalla "Clientes": ficha de
  Graciela con avatar redondo (rulos lila, lentes, dibujito plano), nombre "Graciela" (Lexend 800, 52 px), filas
  "Viene desde: hace 1 año", "Lleva siempre: yerba y bizcochos", "Visitas: 98" y un aviso verde grande arriba
  "Hoy: 1 año viniendo" con estrellita. Botón verde "Tener un gesto" con tilde.

## Escenas (inicio por índice de palabra de `guion.txt`, desde 0; segundos estimados a ~0,34 s/palabra + pausas; se
## ajustan con tiempos.md)
| # | id | arranca en | seg. aprox. | frase | objeto protagonista | qué cambia y en qué palabra |
|---|----|-----------|-------------|-------|--------------------|-----------------------------|
| 1 | s01-gancho | 0 "¿Por" | 0,0-3,1 | ¿Por qué te traen un caramelo con la cuenta? | Platito con ticket y caramelo | Cuadro 0 = portada |
| 2 | s02-midieron | 9 "Lo" | 3,1-4,9 | Lo midieron en un restaurante. | La mesa con la moza | Grúa hacia atrás |
| 3 | s03-uno-dos | 14 "Con" | 4,9-8,6 | Con un caramelo, la propina subió un poco. Con dos, más. | Pilas de monedas | Crecen pilas 1 y 2 |
| 4 | s04-uno-mas-uno | 25 "Y" | 8,6-13,0 | Y la que más: dar uno, amagar a irse y volver con otro. | La moza que amaga y vuelve | Pila 1 + 1 la más alta |
| 5 | s05-mismos | 38 "Los" | 13,0-14,6 | Los mismos dos caramelos. | Dos caramelos lado a lado | "=" entre dos pares |
| 6 | s06-por-que | 42 "¿Por" | 14,6-16,3 | ¿Por qué? | "?" 3D verde | Los caramelos se funden en el "?" |
| 7 | s07-personal | 44 "Pareció" | 16,3-18,0 | Pareció un gesto personal. | El segundo caramelo con la canastita | El "?" se abre y deja el caramelo |
| 8 | s08-ruben | 48 "Rubén" | 18,0-20,2 | Rubén no se acuerda de todos. | Almacén de Rubén y la fila de clientes | "?" rojos sobre las siluetas |
| 9 | s09-ficha | 54 "Su" | 20,2-24,0 | Su ficha de clientes le avisa: Graciela hace un año que viene. | La tablet con la ficha | Aviso "Hoy: 1 año viniendo" |
| 10 | s10-vuelve | 65 "Le" | 24,0-28,6 | Le da un caramelo, amaga a irse y vuelve. / RUBÉN: Y este, para vos. | Rubén, Graciela y el platito | El 1 + 1 en el almacén |
| 11 | s11-gesto | 78 "¿Querés" | 28,6-31,4 | ¿Querés el gesto justo con cada cliente? Agendá una | Tablet con la lista de clientes | Tildes verdes en fila |
| 12 | s12-llamada | 87 "videollamada" | 31,4-34,2 | videollamada gratis en scalerics.com. | Tarjeta verde | "Videollamada gratis" / "scalerics.com" |

## Brief por escena (cámara, rótulos, sonido, cuidados)

1. **s01-gancho** (~3,1 s) · "¿Por qué te traen un caramelo con la cuenta?"
   - Cuadro 0 = portada en movimiento: EL PLATITO con el ticket doblado y el caramelo verde encima, grande (70 % del
     ancho), sobre el mantel crema, cámara en contrapicado de 3/4, luz cálida de costado. Gancho entero Lexend 900,
     3 líneas, 110-130 px, arriba (y 200-640): "¿Por qué te traen" / "un **caramelo**" (recuadro verde) / "con la cuenta?".
     El texto se va antes del primer subtítulo (no hay karaoke en s01).
   - Push-in lento al caramelo; en "caramelo" el caramelo da un saltito y gira 20° (pop + crujido de papel); en
     "cuenta" el ticket se despliega un poco (papel).
   - SFX: papel (0,1), pop (en "caramelo"), papel (en "cuenta").

2. **s02-midieron** (~1,8 s) · DESENLACE EN CAMINO · "Lo midieron en un restaurante."
   - Sin corte: grúa hacia atrás y arriba desde el platito; aparece LA MESA entera con los dos comensales y LA MOZA de
     pie al lado, con la canastita de caramelos. La mesa llena el 75 % del ancho (no queda chiquita en el centro).
   - En "midieron" baja desde arriba un rótulo con línea guía a la mesa: "Estudio de campo · 2002" (Lexend 600 40 px,
     crema sobre placa navy oscuro, borde verde).
   - SFX: whoosh (cámara), click-soft (rótulo), ambiente muy bajo de restaurante si hay CC0.

3. **s03-uno-dos** (~3,7 s) · "Con un caramelo, la propina subió un poco. Con dos, más."
   - La cámara baja a la mesa y el platito se transforma en LA BANDEJA de LAS PILAS DE MONEDAS (el mantel se pliega
     hacia la bandeja navy; el platito se achata en la base de la primera pila). Las 4 bases aparecen de izquierda a
     derecha con pop; la pila "Sin caramelo" ya está, baja y gris.
   - En "caramelo": un caramelo cae sobre la pila 2 ("Uno") y llueven monedas: queda APENAS más alta que la gris.
     Rótulo "Un poco más". En "dos": dos caramelos sobre la pila 3 y caen más monedas, claramente más alta. Rótulo
     "Más". Las pilas llenan el ancho (cada una ~18 % del ancho, alto hasta y ~1150); la 4ª base vacía con un "?" de
     línea.
   - Cuidado: monedas que no atraviesen a las vecinas; nada de números.
   - SFX: tic-real por cada moneda (secuencia rápida, no más de 6 golpes audibles), pop por cada caramelo.

4. **s04-uno-mas-uno** (~4,4 s) · "Y la que más: dar uno, amagar a irse y volver con otro."
   - Travelling: la cámara deja las pilas a la izquierda y vuelve a LA MESA en plano medio (la pila 4 queda en el
     borde derecho del cuadro, todavía baja). La moza (plano medio, llena 60 % del alto):
     "dar uno": deja un caramelo en el platito (pop). "amagar a irse": se da vuelta y da un paso hacia afuera
     (whoosh-short, la cámara la sigue un poco). "volver": frena, gira (tic), vuelve y desde la canastita ofrece
     OTRO caramelo a cada comensal; los comensales sonríen.
   - En "otro": corte de cámara suave (dolly lateral) a la pila 4: llueven monedas y queda LA MÁS ALTA, en verde, con
     un caramelo + un caramelo encima. Rótulo "Uno + uno: la que más". Mini tilde verde.
   - Pausa visual de 0,3 s sobre la moza congelada a mitad de giro antes de "volver" (timing).
   - SFX: pop (caramelo), whoosh-short (amague), tic-real (frena), pop (segundo caramelo), lluvia de tic-real, ding (récord).

5. **s05-mismos** (~1,6 s) · "Los mismos dos caramelos."
   - Push-in a los caramelos: dos pares de caramelos gigantes flotan lado a lado (izquierda: dos juntos; derecha:
     uno y uno separados con una flechita curva de "vuelta"); entre los pares, un "=" 3D crema. Llenan el ancho.
   - Rótulos chicos debajo: "Dos juntos" / "Uno + uno". En "mismos" el "=" hace pop.
   - SFX: pop ("mismos"), click-soft.

6. **s06-por-que** (~1,7 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: los cuatro caramelos se juntan en el centro y el celofán verde se estira y se moldea en un "?" 3D
     verde enorme (dentro del 80 % seguro, centrado, 55 % del alto). Push-in lento, órbita corta de 15°.
   - Sin rótulos. SFX: whoosh-cine-corto + impact-bass-1 suave en "qué".

7. **s07-personal** (~1,7 s) · GIRO · "Pareció un gesto personal."
   - El "?" se desenrolla (el punto del "?" es el caramelo) y queda UN caramelo gigante en la palma de la mano de la
     moza, con la canastita detrás desenfocada. En "personal" una etiquetita de papel crema atada al moño del caramelo,
     escrita en Lexend 700 navy: "Para esta mesa" (como tarjetita de regalo), que gira hacia cámara.
   - Rótulo con línea guía: "Gesto personal" (verde).
   - SFX: papel (desenrolla), sparkle suave (en "personal").

8. **s08-ruben** (~2,2 s) · "Rubén no se acuerda de todos."
   - Viaje de cámara continuo: el caramelo de la mano se aleja y cae dentro del FRASCO DE VIDRIO del mostrador de Rubén
     (la cámara lo sigue en caída, tic de vidrio): estamos en el almacén. Rubén detrás del mostrador (plano medio, 55 %
     del alto), mate en mano. Delante, LA FILA DE CLIENTES de espaldas o 3/4; en "todos", sobre cada cabeza aparece
     un "?" rojo apagado 3D chico (pop escalonado, sin pisar caras: arriba de las cabezas). Rubén se rasca la cabeza,
     cejas preocupadas. Etiqueta "Rubén" con línea guía (sobre el pecho, nunca sobre la cara).
   - Graciela es la primera de la fila (rulos lila, lentes, cárdigan verde): reconocible.
   - SFX: tic de vidrio (caramelo al frasco), pop x5 escalonados ("?"), campanita de puerta muy baja.

9. **s09-ficha** (~3,8 s) · EL CRM · "Su ficha de clientes le avisa: Graciela hace un año que viene."
   - Push-in a LA TABLET del mostrador, que se levanta y gira a cámara hasta llenar el 70 % del ancho (Rubén detrás,
     desenfocado). En "ficha": la pantalla pasa de la lista "Clientes" a la ficha de Graciela (deslizamiento).
     En "avisa": vibra (vibra.mp3) y cae el aviso verde "Hoy: 1 año viniendo". En "Graciela": se ilumina su nombre y
     avatar. Filas "Lleva siempre: yerba y bizcochos", "Visitas: 98" (texto UI, no dato del estudio).
   - Los "?" rojos de s08 desaparecen (se apagan) cuando se abre la ficha: el problema resuelto.
   - SFX: whoosh-short (cámara), click (cambio de pantalla), vibra + notification (aviso).

10. **s10-vuelve** (~4,6 s) · CALLBACK · "Le da un caramelo, amaga a irse y vuelve." + Rubén: "Y este, para vos."
    - Contraplano: Rubén y Graciela frente a frente en el mostrador (plano general corto, los dos llenan el cuadro).
      "Le da un caramelo": Rubén pone el ticket en EL MISMO PLATITO del gancho con un caramelo del frasco (pop).
      "amaga a irse": Rubén gira hacia la estantería (whoosh-short). Pausa de 0,3-0,4 s (timing de comedia).
      "vuelve": frena, se da vuelta (tic), saca otro caramelo del frasco.
    - Primer plano de Rubén (push-in) para su línea "Y este, para vos.": le ofrece el segundo caramelo en la palma,
      sonrisa debajo del bigote, guiño leve. Contraplano de Graciela: se lleva la mano al pecho, ojos felices (feliz 0,8),
      sonrisa. Tilde verde chico arriba de los dos.
    - Burbuja de diálogo crema (se entiende sin sonido): "Y este, para vos." en Lexend 700 navy 48 px, sobre Rubén, sin
      pisar caras.
    - Cuidado (QA de arte): la mano con el caramelo no atraviesa el mostrador ni la cara de Graciela; el frasco no
      desaparece entre planos; la boca de Rubén abre al hablar con los ojos abiertos.
    - SFX: pop, whoosh-short, tic-real, papel (envoltorio), chime suave en el tilde.

11. **s11-gesto** (~2,8 s) · "¿Querés el gesto justo con cada cliente? Agendá una"
    - Grúa hacia arriba y atrás sobre el almacén, Graciela sale feliz con sus dos caramelos; la cámara termina sobre
      LA TABLET en el mostrador, que ahora muestra la lista de clientes con una tilde verde de "gesto" al lado de varios
      nombres genéricos (ej.: "Graciela · 1 año", "Nico · su pedido de siempre", "Alicia · volvió", cada una con su tilde 3D o dibujada (no el carácter ✓); solo
      nombres de pila genéricos). Las tildes aparecen en fila (pop rítmico).
    - SFX: whoosh (grúa), pop x3 (tildes).

12. **s12-llamada** (~2,8 s) · CIERRE · "videollamada gratis en scalerics.com."
    - Tarjeta de cierre que arranca justo en "videollamada": fondo verde `#5ce611` liso, "Videollamada gratis" Lexend
      900 navy ~120 px y debajo, grande, "scalerics.com" en navy sobre placa crema (o crema sobre navy). Un caramelo 3D
      verde oscuro `#3fa60a` (para que se distinga sobre el verde) gira lento en la esquina como firma, sin tapar el
      texto. Logo de Scalerics abajo.
    - SFX: whoosh-cinematic corto de entrada, chime.

## Cuidados generales
- Cuadro 0 nunca negro ni vacío; sin logo en el gancho.
- Nada de números de propina ni porcentajes en ninguna capa.
- La moza y los comensales quedan bien: el caramelo es un gesto amable, no un truco; nadie se burla de nadie.
- Ortografía de carteles: "Estudio de campo · 2002", "Un poco más", "Más", "Uno + uno: la que más", "Dos juntos",
  "Gesto personal", "Para esta mesa", "Hoy: 1 año viniendo", "Lleva siempre: yerba y bizcochos", "Y este, para vos.",
  "Videollamada gratis", "scalerics.com".
- Mezcla: techo de -31 LUFS por efecto, voz 6 LU por encima de música + SFX, final -14 LUFS, pico -1,5 dBFS.
