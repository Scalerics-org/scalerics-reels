# Plan de escenas · por-que-las-tarjetas (explicador "¿Por qué…?", ~33-34 s, 3D real)

"¿Por qué el mejor vendedor de autos le mandaba tarjetas a los que ya le compraron?". Desenlace en la frase 2:
"Porque volvían." (según él mismo: gran parte de su éxito fueron clientes que volvían, ver `fuentes.md` [D]). La prueba
en la 3: Joe Girard, récord Guinness de autos vendidos en un año (1.425 en 1973). Bisagra "¿Por qué?". **Giro:** la
tarjeta no vendía nada, ni un precio: cada mes decía «Me caés bien» ("I like you", Cialdini [A] [E]). Lección: al que
ya te compró no hay que convencerlo, hay que acordarse. **Callback:** Rubén no sabe hace cuánto no viene Walter
("¿Walter? ¿Hace cuánto que no viene?", voz de Rubén); el sistema sí (tres semanas) y le escribe solo un mensaje que
tiene LA FORMA DE LA TARJETA del gancho (crema, borde verde) y, como ella, no vende nada: "Walter, ¿todo bien? Hace
rato que no te vemos. Acá estamos. · Rubén". "El sábado, Walter volvió." Cierre: videollamada gratis.

- **Producto: CRM** (quién te compró, qué y cuándo; aviso cuando alguien deja de venir; mensaje que sale solo en el
  momento justo, escrito por el dueño una vez). Nunca "bot". Se dice "el sistema" en voz; en pantalla la ficha dice
  "Clientes" (sin nombre de producto).
- **Qué lo diferencia de reels ya hechos:** `por-que-la-tarjeta` (03-11, Puntos: datos y ofertas) y `por-que-dos-sellos`
  (08-11, Puntos) avisaban al que deja de venir con una oferta. Acá el mensaje **no lleva oferta** (como la tarjeta de
  Girard): la idea es acordarse, no vender. Que el mensaje de Walter NO tenga precio, descuento ni cupón.
- **Persona real:** Joe Girard se nombra en positivo y **no se dibuja** (ni cara, ni silueta, ni personaje que lo
  imite). Su presencia son sus cosas: la tarjeta con "I like you" y su firma escrita "Joe Girard", los sobres, el
  buzón, los autos que vendió. **Sin marcas:** autos genéricos de los 70 sin escudo ni moño ni parrilla reconocible;
  "Guinness" solo en texto chico, sin logo ni colores; nada de "Chevrolet".
- **Voz:** Orus (narrador, 82 palabras) + **Rubén (Gemini Algenib), una línea de 7 palabras.** Ver "Voces" abajo.
- **Base técnica:** `reels/por-que-devolver-gratis` y `reels/por-que-el-recordatorio` (tres.js con `renderAt(t)` puro,
  cámara por claves Catmull-Rom/Hermite monótona, PMREM, nube de pensamiento, "?" verde, gen.mjs para la capa HTML,
  `assets/firma.json` para esconder el logo en primeros planos, `partes/armar-voz.sh` para pegar voces con pausas,
  `partes/ajustar-tiempos.mjs`, `partes/medir.py`). Personajes: **`reels/anotamelo/assets/personajes.js`** (el más
  nuevo: tiene Rubén = ELENCO.almacenero, **Walter = ELENCO.walter**, crearMate, crearTermo, crearCelular, crearYerba,
  crearGalletitas, crearAlmanaque, crearReloj, crearPapelito, crearBolsaPapel). Leer también `SPEC.md`, `tres.js`,
  `gen.mjs` y `armar.mjs` de `reels/abren-hoy` y `reels/abren-hoy-completo` (el ejemplar, 8c).
- **Objetos nuevos** (al `tres.js` del reel): `crearAuto70()`, `crearSobre()`, `crearTarjeta(frente, interior)`,
  `crearBuzon()`, `crearMegafono()`, `crearFichaCliente()` (o textura de celular), `crearNumero3D("1.425")`.

## Voces
| Parte | Texto | Voz | Tono |
|---|---|---|---|
| `partes/orus1.txt` | frases 1-6 (gancho → "Hay que acordarse.") | Orus | Narrador de los explicadores, uruguayo, curioso y con ritmo; en "¿Por qué?" pregunta de verdad; "La tarjeta no vendía nada." con una micro-sonrisa (es la sorpresa); «Me caés bien» dicho cálido, como leyendo la tarjeta. "Joe Girard" en inglés ("Yóu Yirárd", acento en la segunda): si Gemini lo dice "Jo-e Ji-rard" a la española, regenerar SOLO esa frase con la grafía "Yóu Yirárd" y pegarla. "Guinness" = "Guínes". |
| `partes/ruben.txt` | "¿Walter? ¿Hace cuánto que no viene?" | **Algenib** (Rubén) | Almacenero uruguayo grave y cansado, hablando solo, mirando el estante y rascándose la cabeza. "¿Walter?" se le ocurre de golpe (subida corta); "¿Hace cuánto que no viene?" más lento, para adentro, con duda de verdad, sin drama ni culpa. ~2,2 s. Sin filtro (está en su almacén). |
| `partes/orus2.txt` | frases 8-10 ("El sistema sabe…" → cierre) | Orus | Igual que orus1. "tres semanas" con un mini peso; pausa de comedia de 0,3 s antes de "El sábado, Walter volvió." (lo dice con media sonrisa). Cierre natural, sin urgencia. "scalerics.com" = "Scálerics punto com". |

Pegado (como `por-que-el-recordatorio/partes/armar-voz.sh`): recortar silencios con `silenceremove`, y entre partes
0,45 s antes de Rubén y 0,4 s después. Pausas internas: +0,3 s antes de "¿Por qué?" (palabra 30), +0,25 s después de
"«Me caés bien»" (42), +0,3 s después de "Hay que acordarse." (54), +0,3 s antes de "El sábado" (73), +0,3 s al final.
`guion.txt` tiene el texto de pantalla; `partes/guion-voz.txt` el texto completo para `tiempos.mjs`.

## Fondo y paleta (anotar en "Hechos")
- **Fondo navy oscuro `#0b1220` LISO** (html/body/#fondo y cielo de la escena 3D), piso invisible con `ShadowMaterial`
  (sombra negra al ~50 %), sin degradés ni brillos. Últimos explicadores: por-que-la-toalla navy oscuro (11-11, hotel),
  por-que-el-recordatorio crema con azulejos (11-11), por-que-devolver-gratis navy claro (12-11). Este: **navy oscuro
  liso con "noche de correo"** (sobres crema que brillan contra el navy, buzón, autos crema) y el **almacén de Rubén a la
  mañana del sábado** en la segunda mitad (pared crema `#efeee5`, zócalo navy claro `#16243d`, luz de mañana fría).
  La combinación nueva: navy oscuro + papel (sobres, tarjetas) + almacén de mañana.
- **Papel**: sobre crema `#efeee5` con solapa crema2 `#d9d7c9`, borde navy de ~6 px en pantalla, estampilla verde
  `#5ce611` con dentado; **la tarjeta** crema con borde verde grueso (es la marca del objeto que viaja).
- **Autos**: sedán genérico de los 70 (capó largo, baúl largo, techo navy claro `#16243d`, carrocería crema, paragolpes
  cromo mate gris claro `#b8bcc4`, faros redondos, ruedas navy con taza crema). Sin escudo ni logo.
- Verde `#5ce611` = lo resuelto y la "simpatía" (estampillas, borde de la tarjeta, tildes, ficha "Volvió"). **Rojo
  apagado `#c7655b` SOLO para el problema**: el megáfono de "convencer" (s08) y el contador "21 días sin venir" (s11).
  Cierre en verde con letras navy.
- Subtítulos: arriba al centro, 1-3 palabras, 86 px, Lexend 800 CREMA con borde navy oscuro de 14 px; palabra clave en
  recuadro verde con texto navy. En el almacén (fondo crema) el borde del subtítulo pasa a navy 16 px (igual que
  recordatorio). Rótulos: placa crema con texto navy y borde verde, línea guía crema de 7 px (navy sobre el almacén),
  ≥ 36 px. Créditos de datos: mono crema 34-38 px arriba, debajo de los subtítulos. Logo blanco (píldora) en navy,
  logo navy en el almacén; `firma.json` lo esconde en primeros planos.

## Objeto que viaja: LA TARJETA (y su sobre)
Una tarjeta de cartulina 3D (RoundedBox fino que se abre como libro, con bisagra en el lomo; frente con un dibujo de la
fecha del mes en relieve plano: calabaza en octubre, árbol en diciembre, corazón en febrero; interior crema con "I like
you" en Caveat/manuscrita navy grande (≥ 90 px en pantalla) y debajo la firma "Joe Girard" más chica) y su **sobre**
(crema, solapa triangular articulada, estampilla verde). Nace en el gancho (sale del buzón junto al auto vendido), se
multiplica en s02 (un sobre por mes) y s07 (abanico de 12), se abre en s05 (sale el "?"), se lee en s06-s07, y vuelve en
s12 **con la misma forma** (crema, borde verde, esquinas redondeadas) como el **mensaje del CRM** que vuela al celular de
Walter. En s14 todas las fichas de clientes se prenden con una tarjetita igual. Esa repetición es el callback visual.

## Escenas (tiempos estimados a 0,34 s/palabra + pausas; los reales salen de armar.mjs)
| # | id | palabra | arranca | dura | frase |
|---|----|---------|---------|------|-------|
| 1 | s01-gancho | 0 | 0,0 | 2,4 | ¿Por qué el mejor vendedor de autos |
| 2 | s02-tarjetas | 7 | 2,4 | 3,1 | le mandaba tarjetas a los que ya le compraron? |
| 3 | s03-volvian | 16 | 5,5 | 2,0 | Porque volvían. Lo contaba Joe Girard, |
| 4 | s04-record | 22 | 7,5 | 2,9 | récord Guinness de autos vendidos en un año. |
| 5 | s05-por-que | 30 | 10,4 | 1,3 | ¿Por qué? |
| 6 | s06-nada | 32 | 11,7 | 1,7 | La tarjeta no vendía nada. |
| 7 | s07-me-caes | 37 | 13,4 | 2,3 | Decía, cada mes: «Me caés bien». |
| 8 | s08-convencer | 43 | 15,7 | 3,0 | Al que ya te compró no hay que convencerlo. |
| 9 | s09-acordarse | 52 | 18,7 | 1,7 | Hay que acordarse. |
| 10 | s10-ruben | 55 | 20,4 | 2,6 | (Rubén) ¿Walter? ¿Hace cuánto que no viene? |
| 11 | s11-sistema | 61 | 23,0 | 1,8 | El sistema sabe: tres semanas. |
| 12 | s12-escribe | 66 | 24,8 | 2,5 | Y le escribe solo, sin vender nada. |
| 13 | s13-volvio | 73 | 27,3 | 1,8 | El sábado, Walter volvió. |
| 14 | s14-ninguno | 77 | 29,1 | 2,6 | ¿Que no se te olvide ninguno? Agendá una |
| 15 | s15-llamada | 85 | 31,7 | 2,9 | videollamada gratis en scalerics.com. |

Total estimado ~34,6 s. Si con la voz real pasa de 35 s, la primera candidata a cortar es "Lo contaba" → "Joe Girard:
récord Guinness…" (y ajustar el crédito de s03); NO cortar el giro ni el callback.

## Plano por plano
1. **s01-gancho** (~2,4 s) · cuadro 0 = portada en movimiento.
   - Picado de 3/4, de noche: **el auto de los 70** (crema y techo navy claro, ~80 % del ancho, faros prendidos con un
     halo plano, no glow) estacionado en la entrada de una casa de barrio low-poly (solo un pedazo de fachada crema
     con una ventana iluminada `#e9a65a`, a la derecha y cortada por el borde a propósito: es contexto, no protagonista).
     En el espejo retrovisor cuelga una **etiqueta verde "VENDIDO"** (≥ 44 px en pantalla, gira suave). Adelante, a la
     izquierda, el **buzón** de pie (caja navy claro redondeada arriba, poste navy, banderita verde abajo).
   - Gancho Lexend 900 (112-124 px) crema con borde navy oscuro, y 130-640: "¿Por qué el **mejor vendedor**" / "de
     autos le mandaba" / "**tarjetas** a los que" / "ya le compraron?" ("mejor vendedor" en recuadro verde,
     "tarjetas" en verde). Karaoke recién en "Porque" (subDesde 16).
   - En "mejor" pop de la etiqueta VENDIDO; en "autos" los faros parpadean una vez (como al cerrar con llave). Push-in
     lento que va bajando hacia el buzón.
   - Crédito chico arriba (debajo del gancho no entra: va en s02).
   - SFX: solo el bed (sin grillos ni perros), `pop` (etiqueta),
     `tic-real` ×2 (faros/llave).

2. **s02-tarjetas** (~3,1 s) · "le mandaba tarjetas a los que ya le compraron?"
   - La cámara termina la bajada en el buzón (llena ~60 % del alto). En "mandaba" **un sobre crema con estampilla
     verde** entra volando desde arriba a la izquierda (girando un cuarto de vuelta) y se mete por la boca del buzón; la
     **banderita verde se levanta** (pop con rebote). En "tarjetas" entran 2 sobres más (cada uno con un **almanaque**
     chiquito que pasa una hoja al costado: OCT, NOV, DIC), ritmo 0,35 s. En "compraron" la cámara hace una órbita
     corta y el auto vendido queda atrás a la derecha, con la etiqueta VENDIDO bien legible: ya le había comprado.
   - Crédito arriba (si el gancho ya salió): "Así lo nombró Guinness" (al "mejor"). Rótulo con línea guía al auto: "Ya
     le había comprado".
   - Cuidado: el sobre no atraviesa el buzón (entra por la ranura, se esconde con la tapa), la banderita no atraviesa la
     caja.
   - SFX: `whoosh-short` ×3 (sobres), `tac-real` (tapa del buzón), `pop` (banderita).

3. **s03-volvian** (~2,0 s) · "Porque volvían. Lo contaba Joe Girard,"
   - Travelling hacia atrás y arriba (grúa): la casa queda abajo y se revela una **calle con 5-6 casas iguales**, cada
     una con su buzón con la banderita verde arriba y su auto crema en la entrada. En "volvían" los autos **salen
     marcha atrás de las entradas a la vez y doblan todos hacia el mismo lado**, en fila, hacia una **vidriera de
     concesionaria** genérica al fondo (fachada navy claro con un cartel crema "AUTOS" en Lexend 800, sin marca, y una
     guirnalda de banderines verdes y crema), que se prende. La fila de autos queda grande en primer plano (~75 % del
     ancho), no chiquita en el fondo.
   - Crédito: "Según él: gran parte de sus ventas, clientes que volvían". Sin rótulo (habla el crédito).
   - Cuidado: los autos no se atraviesan al doblar (separación fija en la curva); nada de pantallas vacías en la grúa.
   - SFX: `whoosh-cinematic` (grúa), motor de auto de los 70 arrancando (CC0 si no hay; si no, `riser-corto` muy bajo),
     `tic` ×1 (cartel que se prende).

4. **s04-record** (~2,9 s) · "récord Guinness de autos vendidos en un año."
   - La cámara sube por encima de la vidriera: el estacionamiento de la concesionaria se llena de **autos crema en
     grilla** vistos desde arriba en picado (pop de a filas, 6 filas en cadena, de abajo hacia arriba), y arriba de todo,
     **limpio y sin pisar los autos**, el número 3D **"1.425"** (TextGeometry Lexend 800 crema con canto verde, ~70 % del
     ancho) que entra con pop en "Guinness". Debajo del número, en 3D chico, "1973" en verde, en "año".
   - Crédito arriba: "Récord Guinness · la categoría se retiró en 2018". Rótulo con línea guía al número: "Autos en un
     año".
   - Cuidado: el número no nace adentro de un auto; la grilla no se corta por los costados (que los autos de los bordes
     queden enteros o la grilla más angosta que el cuadro); nada de trofeo con logo.
   - SFX: `pop` ×6 en cadena ascendente (filas), `impact-bass-1` suave (número), `ding` ("año").

5. **s05-por-que** (~1,3 s) · BISAGRA · "¿Por qué?"
   - UN SOLO OBJETO: la cámara cae en picado entre los autos y aterriza en **un sobre crema solo**, grande, al centro, de
     frente, sobre el navy liso (los autos se fueron fuera de cuadro en la caída: transición con objeto siempre en
     cuadro). En "qué" la solapa se abre de golpe y sale un **"?" 3D verde enorme** (borde navy, ~55 % del alto) con
     resorte (sobrepaso y rebote corto), centrado, dentro del 80 % seguro. El sobre queda abajo, más chico. Push-in y
     órbita de 15°. Sin rótulos.
   - SFX: `whoosh-cine-corto` + `impact-bass-1` suave en "qué", `papel` (solapa), `pop` (resorte).

6. **s06-nada** (~1,7 s) · GIRO · "La tarjeta no vendía nada."
   - El "?" se encoge y vuelve al sobre; de adentro sale **la tarjeta** (frente con una **hoja de otoño** en relieve plano,
     verde y crema2, para no salir de la paleta). Llena ~70 %
     del alto, de frente. En "vendía" aparecen flotando alrededor, como "lo que uno esperaría", **una etiqueta de precio
     "$" y un cartel "OFERTA"** en gris/rojo apagado, y en "nada" se caen y se van fuera de cuadro (no se tachan: se caen),
     mientras la tarjeta queda sola, limpia.
   - Crédito arriba: "Cambiaba el dibujo según la fecha. El texto, nunca." Rótulo con línea guía a la tarjeta: "Ni un
     precio".
   - Cuidado: la etiqueta y el cartel no atraviesan la tarjeta al caer (caen por delante, lejos).
   - SFX: `papel` (sale la tarjeta), `pop` ×2 (aparecen), `whoosh-short` + `golpe` suave (se caen).

7. **s07-me-caes** (~2,3 s) · "Decía, cada mes: «Me caés bien»."
   - En "Decía" la tarjeta **se abre como libro** hacia cámara (bisagra en el lomo, 0,4 s) y adentro, grande, a mano en
     navy: **"I like you"** y abajo la firma **"Joe Girard"** (≥ 48 px). El subtítulo traduce ("Me caés bien" en el
     recuadro verde). En "cada mes" la cámara retrocede y la tarjeta se multiplica en un **abanico de 12 tarjetas**
     abiertas en arco (cada frente con su fecha: corazón, hoja, calabaza, árbol, bandera…; todas con el mismo "I like
     you" adentro), con un **almanaque** chico que pasa hojas arriba. En "bien" las 12 se cierran y vuelven a ser UNA.
   - Crédito: "Una por mes, a cada cliente · según contaba, unas 13.000 por mes". Sin rótulo extra.
   - Cuidado: el texto "I like you" en textura canvas a 2x, nítido; el abanico no se corta por los bordes (radio dentro
     del 80 % seguro); ninguna tarjeta atraviesa a otra (escalonadas en Z).
   - SFX: `papel` (abre), `papel` ×3 muy rápido (abanico), `sparkle` muy bajo en "bien".

8. **s08-convencer** (~3,0 s) · LECCIÓN · "Al que ya te compró no hay que convencerlo."
   - La tarjeta cerrada queda a la derecha, de pie. A la izquierda entra un **megáfono** grande (cono navy claro con
     boca rojo apagado, mango crema) que apunta a la tarjeta: es "convencer" (gritar ofertas). En "compró" un **tilde
     verde** 3D se posa sobre la tarjeta (ya compró). En "convencerlo" el megáfono vibra dos veces, se le cae la boca hacia
     abajo y se apaga a gris, y se va rodando fuera de cuadro. Push-in a la tarjeta.
   - Rótulo con línea guía a la tarjeta: "Ya es tu cliente".
   - Cuidado: el megáfono no atraviesa la tarjeta; nada de caras.
   - SFX: `pop` (megáfono), `glitch-1` muy corto y bajo (vibra), `golpe` suave (se cae), `ping` (tilde).

9. **s09-acordarse** (~1,7 s) · LECCIÓN, remate + transición · "Hay que acordarse."
   - La tarjeta sale volando hacia cámara y la cámara la sigue; atraviesa la noche (un fundido de luz de mañana por la
     ventana del almacén) y **aterriza parada contra el frasco de caramelos del mostrador de Rubén** (el almacén a la
     mañana del sábado: pared crema, zócalo navy claro, estantería verde con yerba y galletitas, vidriera con luz fría).
     Siempre con la tarjeta grande en cuadro durante el viaje (nunca pantalla lisa). Pausa de 0,3 s después de
     "acordarse": la tarjeta quieta, Rubén entra en foco atrás con el mate.
   - Sin rótulo. Subtítulo con "acordarse" en el recuadro verde.
   - SFX: `whoosh-cinematic` (viaje), `tac-real` (aterriza), ambiente de almacén bajo.

10. **s10-ruben** (~2,6 s) · CALLBACK, problema · Rubén: "¿Walter? ¿Hace cuánto que no viene?"
    - Plano medio de **Rubén** (ELENCO.almacenero, ~60 % del ancho) detrás del mostrador, con el mate en la mano
      izquierda. Mira el **estante** a su lado: hay **un paquete de yerba con un papelito "Walter"** (crearPapelito,
      Caveat) que junta polvo (2-3 motitas que caen lentas: NO telaraña, para no parecerse a `me-lo-guardas`). En
      "¿Walter?" levanta las cejas (CARA.sorpresa corta); en "¿Hace cuánto…?" se rasca la cabeza con la mano libre
      (cejas de duda, CARA.incredula suave, boca hablando: ojos ABIERTOS) y aparece la **nube de pensamiento** (la de
      recordatorio) con un **almanaque** cuyas hojas pasan borrosas y un "?" chico. Contraplano de 0,5 s a la tarjeta
      de Girard en el mostrador (el que mira hace la conexión).
    - Rótulo con línea guía al papelito: "Walter · yerba de siempre".
    - Cuidado: la mano que rasca no atraviesa la pelada; el mate no atraviesa el bigote; la nube no tapa la cara; boca
      sincronizada con la voz de Rubén (visemas o abierta/cerrada por amplitud, como abren-hoy).
    - SFX: ambiente de almacén, `burbuja` (nube), `papel` suave (hojas del almanaque).

11. **s11-sistema** (~1,8 s) · CALLBACK, solución 1 · "El sistema sabe: tres semanas."
    - En "sistema" el **celular de Rubén** en el mostrador (crearCelular, funda navy) se levanta y gira hacia cámara;
      push-in hasta que llena ~65 % del alto: **ficha de cliente** "Clientes · **Walter**" con avatar de iniciales "W"
      verde, "Compra siempre: yerba 1 kg, galletitas", "Última compra:" y un **contador 3D "21 días"** (rojo apagado)
      que llega a 21 en "semanas", y una **línea de tiempo** con 3 semanas vacías marcadas en gris. Textos ≥ 36 px.
    - Rótulo con línea guía al contador: "Avisa quién dejó de venir".
    - SFX: `whoosh-short` (celular), `tic` ×3 (contador), `notification` (aviso).

12. **s12-escribe** (~2,5 s) · CALLBACK, solución 2 · "Y le escribe solo, sin vender nada."
    - En "escribe" de la ficha sale volando **el mensaje con la forma de LA TARJETA** (crema, borde verde, esquinas
      redondeadas, misma proporción) y la cámara lo sigue en un paneo hasta el **celular de Walter** (ELENCO.walter,
      a la mañana en su casa, con una taza de café; plano medio, Walter ~55 % del ancho). Push-in al celular hasta
      ~65 % del alto: burbuja "**Walter, ¿todo bien? Hace rato que no te vemos. Acá estamos.** · Almacén de Rubén" con
      un dibujito de mate (≥ 40 px). En "sin vender nada": nada de precio, cupón ni botón de compra (el único botón,
      opcional, "Responder" crema). Walter sonríe (CARA.sonrisa).
    - Contraplano de 0,5 s: Rubén toma mate, no toca el celular (eso es "solo").
    - Rótulo con línea guía a la burbuja: "Sin oferta. Como la tarjeta".
    - Cuidado: la burbuja tiene que leerse como la tarjeta del gancho (mismo borde verde); el celular no atraviesa la
      mano ni la cara de Walter.
    - SFX: `whoosh-short` (vuela), `vibra` (celular de Walter), `notification`.

13. **s13-volvio** (~1,8 s, 0,3 s de pausa antes) · remate chico · "El sábado, Walter volvió."
    - Corte con la pausa: suena la **campanita de la puerta** del almacén y entra Walter (de cuerpo entero a plano medio,
      sonriendo); Rubén baja la yerba con el papelito "Walter" del estante y se la da; el **almanaque** de la pared marca
      "SÁBADO". En "volvió", en el celular de Rubén en el mostrador, la ficha pasa a "Última compra: **hoy**" con tilde
      verde y el contador rojo se apaga.
    - Rótulo chico opcional: "Volvió" con tilde (forma 3D, no carácter) sobre la ficha.
    - Cuidado: las manos de Rubén y Walter no se atraviesan en la yerba; nada pegado a las caras.
    - SFX: `campanita`, `papel` (yerba), `ping` (tilde).

14. **s14-ninguno** (~2,6 s) · "¿Que no se te olvide ninguno? Agendá una"
    - Push-out del celular de Rubén: la lista de **Clientes** (Walter, Graciela, Héctor, Marta, Nico, Susana…) en
      fichas grandes, y en cada una que tenía días en rojo se posa una tarjetita crema con borde verde (la misma forma) y
      la ficha pasa a verde, en cascada (0,2 s entre cada una). Rubén al costado levanta el mate.
    - Sin rótulo (habla la voz).
    - SFX: `pop` ×4 suaves en cadena, `whoosh-short`.

15. **s15-llamada** (~2,9 s) · CIERRE (arranca sobre "videollamada")
    - Tarjeta de cierre fondo verde `#5ce611`: "Videollamada gratis" navy (Lexend 800, ~120 px) y debajo, grande,
      "scalerics.com" navy en placa crema; logo. La tarjeta 3D (cerrada, borde navy sobre verde) chica abajo, con tilde.
      2,5-3 s.
    - SFX: `chime` en "videollamada", música que cierra.

## Objetos 3D (específicos: "¿alguien lo confunde con otra cosa?")
- **Auto de los 70**: sedán de 4 puertas, capó y baúl largos y planos, techo navy claro, carrocería crema, paragolpes
  cromados mate, faros redondos dobles, parrilla de barras horizontales gruesas sin escudo, ruedas con taza. Que se lea
  "auto viejo americano" y no "auto de juguete": proporción larga y baja.
- **Buzón**: de pie, caja con techo de medio cilindro (navy claro), puertita delantera con bisagra, banderita lateral
  verde que sube; poste navy. Es el objeto que dice "correo" sin texto.
- **Sobre**: crema, solapa triangular articulada, borde navy, estampilla verde dentada con una tilde crema.
- **Tarjeta**: cartulina doblada (dos hojas con bisagra), borde verde grueso, frente con el dibujo del mes (formas
  planas en relieve: corazón, hoja, calabaza, árbol, estrella), interior "I like you" + firma "Joe Girard" (textura
  canvas a 2x, Caveat 700 navy).
- **Número "1.425" y "1973"**: TextGeometry con `lexend800.js`, crema con canto verde.
- **Megáfono**: cono navy claro con aro rojo apagado, mango crema; al "apagarse" pasa a gris.
- **Celulares**: `crearCelular` del módulo (funda navy3 para Rubén, funda crema para Walter), pantallas con
  textura canvas nítida.
- **Almacén y personajes**: del módulo de `reels/anotamelo` (Rubén, Walter, mate, termo, yerba, galletitas, almanaque,
  papelito, reloj). La campanita de la puerta como en `por-que-el-recordatorio`.

## Cámara (una curva continua)
Picado al auto (s01) → bajada al buzón (s02) → grúa sobre la calle (s03) → subida al estacionamiento en picado (s04)
→ caída en picado al sobre (s05) → push-in a la tarjeta (s06-s07) → retroceso para el abanico y el megáfono (s07-s08) →
viaje siguiendo la tarjeta hasta el mostrador (s09) → plano medio de Rubén con contraplano a la tarjeta (s10) → push-in
al celular (s11) → paneo siguiendo el mensaje hasta Walter (s12) → corte con pausa al almacén (s13, el único corte
seco, es el remate) → push-out al celular con la lista (s14) → cierre. Claves Catmull-Rom monótonas, como recordatorio.

## Música y mezcla
Cama suave de los explicadores (la de por-que-devolver-gratis), baja; SFX con TECHO -31 LUFS; voz (Orus y Rubén) ≥ 6 LU
sobre el resto por tramos de 0,5 s; final -14 LUFS, pico -1,5 dBFS. Si falta un sonido (motor de auto viejo, tapa de
buzón de metal), uno CC0 con autor y sitio anotados en `fuentes.md`.

## Portada (portada.json, cuadro limpio sin gancho ni subtítulos)
- Fondo: s07 (la tarjeta abierta con "I like you" grande, o el abanico de 12) o s01 (el auto VENDIDO con el buzón).
  Preferida: **la tarjeta abierta con "I like you"** (zoom 1.4, foco arriba del texto): es la imagen más curiosa.
- `chica`: "Le escribía a los que" · `grande`: "ya le habían comprado" · `sello`: "¿Por qué?" · acento y sello `#5ce611`.
  (Alternativa: chica "El mejor vendedor" / grande "mandaba tarjetas. ¿Por qué?")

## Línea para "Hechos" (ideas.md)
- 12-11 · `por-que-las-tarjetas` · CRM (quién te compró y cuándo; aviso cuando alguien deja de venir y mensaje que sale
  solo, sin oferta) · "¿Por qué el mejor vendedor de autos le mandaba tarjetas a los que ya le compraron?" Explicador con
  Rubén (Joe Girard, récord Guinness 1973; Cialdini y Goldstein 2002; joegirard.com; ver fuentes.md): porque volvían;
  ¿por qué? la tarjeta no vendía nada, decía cada mes «Me caés bien» ("I like you"); al que ya te compró no hay que
  convencerlo, hay que acordarse; callback: Rubén ("¿Walter? ¿Hace cuánto que no viene?", voz Algenib), el sistema sabe
  (tres semanas) y le escribe solo un mensaje con la forma de la tarjeta, sin oferta; el sábado Walter volvió ·
  Videollamada gratis en scalerics.com [formato explicador ¿Por qué? · 3D real (auto de los 70 VENDIDO, buzón con
  banderita, sobres, calle de autos que vuelven, "1.425" sobre estacionamiento, "?" que sale del sobre, tarjeta "I like
  you" y abanico de 12, megáfono que se apaga, almacén de Rubén el sábado a la mañana con Walter), fondo navy oscuro
  #0b1220 liso con almacén crema y cierre verde]
