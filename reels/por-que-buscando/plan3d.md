# Plan 3D de por-que-buscando

Serie "¿Por qué…?" (punto 9a), 3D real (8b), vara de `reels/abren-hoy-completo` (8c). Sin marcas reales.
Producto: Automatizaciones (avisos de estado del pedido por WhatsApp). Voz: solo Orus (88 palabras, ~30 s).

**Fondo propuesto: crema `#efeee5` liso** (sin degradé: compresión de Instagram) con objetos llenos navy y verde,
y **el celular gigante como escenario recurrente** (pantalla navy claro `#16243d`). Cierre en verde de marca
`#5ce611` con letras navy. Motivo: las últimas noches fueron navy oscuro (por-que-el-final, contador, dos-negocios
de Rubén, vereda de noche), navy claro (por-que-dos-sellos, almacén para mandar) y crema solo el 07-11
(por-que-seis); la combinación "crema + celular gigante + cierre verde" no se repitió, y lo otro de la noche
(`que-en-paz-descanse`) va en el almacén. En crema los subtítulos van navy con el recuadro verde y letras navy
(nunca texto blanco sobre crema).
Materiales: navy `#0b1220`/`#16243d` (celular, avión, mostrador), verde `#5ce611` (tildes, lo resuelto, "?"),
crema más oscuro `#dcd9c8` para el piso/sombra, blanco (pantallas, burbujas); rojo apagado `#c7655b` SOLO para
el problema (el chat sin respuesta, el relojito de "¿y mi pedido?").

## Objetos 3D (específicos y reconocibles)
- **EL CELULAR GIGANTE** (protagonista y escenario): RoundedBox navy con canto grueso, isla de cámara, botones
  laterales; pantalla con textura canvas (Lexend) que cambia por escena. Ocupa 70-80 % del alto de la zona de dibujo.
- **LA PANTALLA DE "BUSCANDO…"**: ruedita de carga 3D (anillo de 8 segmentos verdes que se encienden en orden,
  función del tiempo) + lista de filas que se van tildando (casillero → tilde verde con pop). Filas genéricas:
  "Aerolínea 1", "Aerolínea 2"… (sin nombres reales).
- **EL AVIÓN DE PAPEL / AVIÓN LOW-POLY**: avioncito navy y blanco, sin logo, que sale de la pantalla (página de viajes).
- **LAS DOS PANTALLAS**: dos celulares lado a lado (izquierda instantáneo, derecha con la lista). **El rayo** (un
  relámpago 3D crema) sobre el izquierdo; **el reloj de arena** 3D (vidrio, arena verde que cae) sobre el derecho.
- **LA TARJETA DE VUELO / BOARDING PASS**: dos tarjetas idénticas (crema, troquel, avioncito, "MVD → ?") que se
  apilan y coinciden para "mismos vuelos".
- **LA BALANZA**: balanza de platillos navy con la tarjeta "al instante" de un lado y la tarjeta + reloj de arena
  del otro; baja el lado de la espera ("se valoraba más").
- **"?" 3D verde** grande para la bisagra.
- **EL OJO / LUPA**: lupa 3D navy con lente que agranda las manos trabajando (puente a "vieron el trabajo").
- **RUBÉN** (`personajes.js`, ELENCO.almacenero, voz no habla), **el almacén de Rubén** (mostrador, estantes, mate y
  termo genéricos), **la bolsa del pedido** (bolsa de papel kraft con fideos, yerba sin marca, una botella de leche,
  pan asomando), **el celular de Graciela** (ELENCO.clienta; o el cliente genérico de la casa de enfrente).
- **LOS GLOBITOS DE AVISO**: burbujas de chat 3D (RoundedBox blanco con colita) con tilde verde, que salen del
  almacén y viajan al celular del cliente.

## Escenas (frase · objeto · transformación/cámara · rótulos · palabra que dispara)

1. **s01-gancho** · "¿Por qué algunas páginas te muestran que están "buscando"?" (~2,8 s, palabra 0)
   - Cuadro 0 = portada en movimiento: EL CELULAR GIGANTE de frente, leve contrapicado, pantalla con la ruedita de
     carga verde girando y "Buscando…" + 3 filas, la primera ya tildada. Gancho entero Lexend 900 110-130 px navy,
     3 líneas, "buscando" en recuadro verde; se va antes del primer subtítulo karaoke.
   - Push-in lento. En "buscando" se tilda la segunda fila (pop + tic).

2. **s02-prefiere** · "Hay gente que hasta prefiere esa espera." (~2,2 s, palabra 9)
   - Sin corte: la cámara orbita corto al costado del celular y un **sello verde "PREFERIDA"** 3D cae sobre el
     celular en "prefiere" (squash + rebote). La pantalla sigue tildando filas.
   - Rótulo con línea guía: "Esperar… ¿y gustar?" en "espera".

3. **s03-viajes** · "Lo probaron con una página de viajes." (~2,0 s, palabra 16)
   - Desde la pantalla despega EL AVIÓN low-poly y hace una curva; la pantalla pasa a una página de viajes genérica
     ("Buscá tu vuelo · MVD → ?"). Grúa que sigue al avión y vuelve al celular.
   - Rótulo chico abajo: "Experimento · Buell y Norton, 2011".

4. **s04-instante** · "A unos, los vuelos al instante." (~1,8 s, palabra 23)
   - El celular se desdobla en DOS (pantalla partida, travelling a la izquierda primero): el izquierdo muestra los
     vuelos ya listos de golpe; un rayo crema 3D cae arriba en "instante" (flash corto, sin brillo suave).
   - Rótulo: "Al instante" con línea guía.

5. **s05-aerolinea** · "A otros, esperar viendo cada aerolínea revisada." (~2,4 s, palabra 29)
   - Travelling a la derecha: el otro celular con la lista que se tilda fila por fila (una cada ~0,3 s, tic cada una)
     y EL RELOJ DE ARENA 3D girando arriba en "esperar". En "aerolínea" pop de la fila iluminada.
   - Rótulo: "Mostrando el trabajo".

6. **s06-mismos** · "Mismos vuelos. Y la espera se valoraba más." (~2,8 s, palabra 36) · EL GIRO
   - Las dos pantallas escupen su TARJETA DE VUELO; la cámara se abre y las dos tarjetas vuelan al centro y se
     superponen calzando exacto (signo "=" crema 3D) en "mismos". Sello HTML "MISMO RESULTADO".
   - En "espera" las tarjetas caen en LA BALANZA: un platillo con la tarjeta + reloj de arena, el otro con la tarjeta
     + rayo; baja el de la espera en "valoraba", tilde verde 3D arriba del platillo ganador (arriba y limpio).

7. **s07-por-que** · "¿Por qué?" (~1,5 s, palabra 44) · BISAGRA
   - La arena verde del reloj sube y se condensa en un "?" 3D verde grande y centrado (60 % del alto de la zona),
     solo en cuadro. Push-in. Título dentro del 80 % seguro.

8. **s08-trabajo** · "Vieron el trabajo, y lo valoraron." (~2,0 s, palabra 46)
   - El "?" se da vuelta y es LA LUPA: a través del lente se ven las filas tildándose grandes (el trabajo agrandado).
     En "valoraron" una tilde verde gigante 3D cae dentro del lente (pop).
   - Rótulo: "Esfuerzo a la vista = más valor".

9. **s09-ruben** · "Rubén arma cada pedido con cuidado." (~2,2 s, palabra 52) · CALLBACK, primera mitad
   - La lupa vuela hacia el fondo y la cámara cae (zambullida) dentro del ALMACÉN DE RUBÉN: Rubén detrás del
     mostrador metiendo cosas en LA BOLSA DEL PEDIDO (fideos, yerba, leche, pan), mate al costado. Plano medio,
     push-in a la bolsa en "cuidado" (cada producto entra con pop).
   - Etiqueta "Rubén" SOBRE él, nunca en la cara. Rótulo "Pedido de Graciela · 10:12".

10. **s10-no-ve** · "Pero el que pidió por WhatsApp no ve nada." (~2,4 s, palabra 58) · EL GIRO DEL CALLBACK
    - Corte con whoosh (contraplano) a GRACIELA en su casa con el celular grande en primer plano: chat genérico con
      "¿Y mi pedido?" y una tilde gris; el relojito rojo apagado da vueltas. Graciela con cejas preocupadas. En
      "nada" la pantalla queda en silencio (sin burbujas nuevas) y el reloj hace "tic" seco.
    - Rótulo: "Sin noticias" en rojo apagado. Pausa corta antes de la siguiente frase.

11. **s11-avisos** · "Lo automatizamos: recibimos tu pedido, lo estamos armando, salió." (~3,0 s, palabra 67)
    - LA MISMA PANTALLA del s01 vuelve con otro contenido (callback visual): la lista que se tilda, pero ahora es el
      estado del pedido. Cámara entre los dos: del almacén salen LOS GLOBITOS DE AVISO y viajan al celular de
      Graciela, uno por frase, cada uno con tilde verde y pop: "Recibimos tu pedido ✓" (en "recibimos"),
      "Lo estamos armando ✓" (en "armando", se ve a Rubén cerrando la bolsa), "Salió ✓" (en "salió", la bolsa se va
      en la canasta de una bici de reparto genérica). Graciela se relaja y sonríe; Rubén toma mate.
    - Pill "Automatizado" en "automatizamos".

12. **s12-llamada** · "¿Querés que se vea tu trabajo? Agendá una videollamada gratis en scalerics.com." (2,5-3 s,
    arranca en "videollamada"; "¿Querés que se vea tu trabajo? Agendá una" va sobre el final del s11, con la bolsa
    llegando y el último globito "Llegó ✓")
    - Tarjeta de cierre en verde de marca: "Videollamada gratis" en navy y "scalerics.com" grande; de fondo, el
      celular 3D con la lista toda tildada (callback del gancho).

## Sonido (sugerido)
Tic en cada fila que se tilda, pop en tildes y globitos, whoosh en cada travelling, avión (whoosh largo) al despegar,
golpe seco en el sello "PREFERIDA" y al bajar la balanza, arena (riser corto) en el reloj y en el "?", notification
en cada aviso, campanita de la puerta del almacén, papel de la bolsa (`papel.mp3`), timbre de bici si hay uno CC0 en
el repo. Nada sintetizado; CC0 anotado aquí si se suma algo.

## Cuidados (lo que el director de arte va a buscar)
- Texto de las pantallas de 36 px para arriba en el 1080x1920 (las filas de "Aerolínea N" grandes, máximo 4 filas).
- Nada de texto blanco sobre crema; burbujas blancas con borde navy de 6-8 px.
- El rayo y el reloj de arena arriba de los celulares, sin pisarlos; la tilde de la balanza arriba y limpia.
- En la zambullida al almacén siempre hay un objeto grande en cuadro (la lupa que crece, después la bolsa).
- El celular de Graciela no atraviesa su mano ni su cara; etiquetas sobre el personaje correcto.
- Sin logo ni ícono de WhatsApp ni de ninguna aerolínea; filas "Aerolínea 1, 2, 3".
