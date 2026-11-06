# Plan 3D de por-que-dos-sellos

Serie "¿Por qué…?" (punto 9a), 3D real (8b), vara de `reels/abren-hoy-completo` (8c). Producto: Scalerics Puntos.
**Fondo: navy oscuro `#0b1220` liso** (sin degradé radial ni estrellas: compresión de Instagram). Velo del mismo
color arriba solo para los subtítulos. Recurso principal: UN objeto que se transforma (la tarjeta de sellos
→ dos tarjetas → sellos que se convierten en el "?" → la tarjeta en el celular de Graciela).
Materiales: navy `#16243d`/`#1f3254`, verde `#5ce611` (sellos puestos, lo resuelto), crema `#efeee5` (cartón de
la tarjeta), blanco; rojo apagado `#c7655b` SOLO para la tarjeta vacía / "arrancar de cero".
Duración estimada: 90 palabras con Orus ≈ 30-32 s (12 escenas, 1,5-3 s cada una; ajustar con tiempos.md).

## Objetos 3D (específicos y reconocibles)
- **LA TARJETA DE SELLOS** (la protagonista): cartón crema RoundedBox fino (proporción de tarjeta de visita,
  esquinas redondeadas, canto visible con grosor), título "TU 10.º LAVADO GRATIS" / "TARJETA DE SELLOS" en navy
  (textura canvas Lexend), fila de casilleros circulares con borde navy de 6-8 px. Los sellos son discos verdes
  con relieve (tinta que se "aplasta": escala en y + pop), con una estrellita o tilde calada. Se ve desgastada
  apenas (una esquina doblada) para que no parezca una tarjeta de crédito.
- **EL SELLO DE GOMA**: mango de madera torneado (lathe, tono madera claro) + base navy + goma verde abajo. Baja,
  aplasta (squash), deja el disco verde y rebota.
- **EL AUTO DEL LAVADERO**: sedán genérico low-poly navy claro, sin marca, con espuma blanca (esferas agrupadas
  sobre el techo y el capó, que se deshacen) y dos rodillos de cepillo verdes girando a los costados (arco del
  lavadero en crema). Gotas en arco.
- **NÚMEROS 3D** (TextGeometry Lexend 800): "34 %" verde y "19 %" crema-gris, "8", "10", "2", "+2".
- **"?" 3D verde** grande para la bisagra.
- **RUBÉN, GRACIELA** (`personajes.js`, ELENCO.almacenero y ELENCO.clienta), el **almacén de Rubén** (mostrador,
  estantes, el mate y el termo genéricos) y el **celular de Graciela** (RoundedBox navy, pantalla con la tarjeta de
  puntos: 10 círculos, 2 verdes con "¡Bienvenida! 2 de regalo · por estrenarla").

## Escenas (frase · objeto · transformación/cámara · rótulos · palabra que dispara)

1. **s01-gancho** · "¿Por qué algunas tarjetas de sellos vienen con dos puestos?" (~3,0 s)
   - Cuadro 0 = portada en movimiento: LA TARJETA enorme (70-80 % del ancho), en leve contrapicado, con los dos
     primeros casilleros YA sellados en verde y ocho vacíos; el sello de goma suspendido arriba a la derecha.
     Gancho entero en Lexend 900 110-130 px, 3 líneas, "dos puestos" en recuadro verde; se va antes del primer
     subtítulo karaoke.
   - Push-in lento + órbita corta. En "dos" los dos sellos hacen un pulso (brillo + escala 1,1).

2. **s02-lavadero** · "En un lavadero de autos, casi el doble llegó al premio." (~3,4 s, dos tiempos)
   Tiempo A, "En un lavadero de autos,":
   - La cámara hace una grúa hacia atrás y abajo: la tarjeta vuela y queda pegada en el parabrisas
     del auto (sigue en cuadro) y entra EL AUTO con espuma bajo el arco, rodillos verdes girando. Pop de espuma en "autos".
   - Rótulo con línea guía: "Estudio de campo" (o "Lavadero de autos" si el subtítulo no lo repite).

   Tiempo B, "casi el doble llegó al premio." (sin corte, la cámara sube siguiendo las barras):
   - Del techo del auto suben dos columnas/barras 3D: la baja crema-gris con "19 %" y la alta verde con "34 %",
     números 3D ARRIBA de las barras, limpios, sin pisar el auto (el auto baja y se aleja al fondo).
   - Al pie de cada barra, una mini tarjeta (la vacía de 8 bajo el 19 %, la de 10 con dos sellos verdes bajo el
     34 %), así se entiende qué se compara antes de que la voz lo explique.
   - Ojo: `lexend800.js` trae solo dígitos (ver caso-tu-nombre): el "%" va como geometría propia (dos anillos y una
     barra extruidos) o como capa HTML pegada al número.
   - "19 %" aparece en "doble", "34 %" crece y hace pop en "premio". Rótulo chico abajo: "Nunes y Drèze, 2006".

3. **s03-ocho** · "A unos les dieron una de ocho, vacía." (~2,0 s)
   - Las barras se aplanan y se convierten en dos tarjetas lado a lado (la pantalla repartida). Primero se
     ilumina la IZQUIERDA: tarjeta de 8 casilleros, todos vacíos, borde rojo apagado tenue. "8" 3D arriba en "ocho".
   - Rótulo con línea guía: "0 de 8" en "vacía".

4. **s04-diez** · "A otros, una de diez con dos de regalo." (~2,3 s)
   - Travelling a la DERECHA: tarjeta de 10 casilleros. En "dos" baja EL SELLO DE GOMA dos veces (pum, pum),
     dos discos verdes. "10" 3D arriba en "diez".
   - Rótulo: "2 de 10" con línea guía al segundo sello, en "regalo".

5. **s05-mismos** · "Mismos ocho lavados." (~1,8 s) · EL GIRO
   - La cámara se abre para ver las dos tarjetas juntas; sobre cada una caen 8 gotitas/fichas de lavado iguales
     (o el número "8" verde idéntico encima de las dos). Un signo "=" 3D crema entre las dos.
   - Sello HTML "MISMO ESFUERZO" en "mismos".

6. **s06-por-que** · "¿Por qué?" (~1,5 s) · BISAGRA
   - Las tarjetas salen de cuadro; los dos sellos verdes de la tarjeta de diez se juntan, giran y se funden en un
     "?" 3D verde grande y centrado (60 % del alto de la zona de dibujo), solo. Push-in. Título dentro del 80 % seguro.

7. **s07-cero** · "Vacía, es arrancar de cero." (~1,8 s)
   - El "?" se desarma en la tarjeta de ocho, vacía, de frente, con una barra de progreso 3D debajo en 0 % (gris,
     rojo apagado). En "cero" un "0" 3D cae arriba y rebota.

8. **s08-camino** · "Con dos sellos, ya estás en camino." (~2,0 s)
   - La tarjeta se estira a diez casilleros (transformación: los casilleros se corren y aparecen dos nuevos ya
     sellados en verde a la izquierda); la barra de progreso pasa a 20 % en verde y una flecha/camino 3D verde
     avanza por los casilleros en "camino". Rótulo: "Ya empezaste" + rótulo chico "y más rápido" (sin número).

9. **s09-excusa** · "Y mejor con excusa: por estrenarla." (~2,2 s)
    - Sobre los dos sellos cae un moño/etiqueta de regalo crema con lazo verde que dice "por estrenarla" (textura
      Lexend). En "excusa" el lazo se cierra con pop. Rótulo con línea guía: "Aunque sea una excusa chica".

10. **s10-ruben** · "Rubén lo hace con Scalerics Puntos: Graciela arranca con dos." (~3,0 s)
    - CALLBACK: la tarjeta se encoge y vuela dentro de la pantalla del CELULAR DE GRACIELA (la cámara la sigue).
      Plano general del almacén de Rubén: Rubén detrás del mostrador con el mate, Graciela del otro lado con el
      celular. Contraplano / push-in al celular en "Graciela": tarjeta de 10 círculos, los 2 primeros se prenden
      verdes en "dos" con "¡Bienvenida! 2 de regalo". Rubén guiña / sonríe (cejas arriba, boca sonrisa).
    - Pill "Scalerics Puntos" en "Puntos". Etiquetas de nombre (Rubén, Graciela) SOBRE el personaje correcto, nunca
      encima de la cara.

11. **s11-aviso** · "Si deja de venir, le llega un aviso." (~2,2 s)
    - Elipsis: el almacén se apaga un poco (pasa el tiempo: el sol del vidrio cambia), el celular de Graciela en
      primer plano vibra y aparece el aviso: "Rubén: Graciela, te faltan 6 para el premio. ¡Te esperamos!".
      En "aviso" vibra + notificación. Corte (con whoosh) a Graciela entrando de nuevo y un tercer sello verde que
      se suma: el contador "3 de 10".

12. **s12-llamada** · "¿Lo vemos en tu local? Agendá una videollamada gratis en scalerics.com." (2,5-3 s, arranca en
    "videollamada"; el tramo "¿Lo vemos en tu local? Agendá una" va sobre s11 o sobre un plano del celular con la
    tarjeta "TU LOCAL" en vez de "Almacén de Rubén")
    - Tarjeta de cierre de marca: "Videollamada gratis" y "scalerics.com" grande en verde sobre navy; abajo, la
      tarjeta 3D con 2 sellos verdes de fondo (callback). Sin "¡no te lo pierdas!".

## Sonido (sugerido)
Pop en cada sello (golpe seco del sello de goma: `golpe` + `pop`), espuma/whoosh del lavadero, `tic` en los números
que crecen, `ding` en el "34 %", whoosh en cada travelling, `correcta` en el lazo, vibra + notification en el aviso,
campanita en la puerta del almacén. Nada sintetizado; si falta un sonido real (agua, sello), CC0 anotado en fuentes.md.

## Cuidados (lo que el director de arte va a buscar)
- Los números 34 %/19 % arriba de las barras, sin tocar el auto ni el borde.
- Los casilleros de la tarjeta legibles en el celular: círculos de al menos ~90 px en pantalla, trazos 6-8 px.
- El celular de Graciela no atraviesa su mano ni su cara; la tarjeta que vuela al celular nunca deja la pantalla
  lisa (siempre se ve la tarjeta o el celular grande).
- Rótulos con el nombre correcto sobre cada personaje.
