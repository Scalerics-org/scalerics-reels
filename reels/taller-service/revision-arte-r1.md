# taller-service · revisión de arte r1 (QA visual independiente, sobre el MP4)

Fuente: `renders/taller-service-final.mp4` (46,0 s, 1080x1920, 30 fps). Cuadros en
`/tmp/claude-0/-home-user-scalerics-reels/e7134b03-b34e-5982-a6c2-3d3afd5d546e/scratchpad/qa-taller/`:
`c/NNNN.jpg` (cada 0,25 s: t = (N-1)·0,25), `hs/hNN.jpg` (hojas de 10), `cuts/c<t>.jpg` (30 fps ±0,3 s en cada corte),
`cuts/w35.jpg`, `cuts/c40.9b.jpg`, `full/t<t>.jpg` (cuadros grandes).
Los cortes medidos con detección de escena coinciden con la lista (4,10 · 6,40 · 10,03 · 13,03 · 13,67 · 14,70 · 18,07 · 20,23 ·
24,93 · 26,53 · 28,47 · 29,97 · 31,80 · 32,73 · 34,73 · 37,40 · 39,30 · 40,90 · 42,90; Q1 entra con un iris 22,28-22,45).
Sin cuadros negros, sin texto fantasma entre cortes, ortografía de burbujas y carteles correcta.

**Veredicto: no se entrega así.** Hay 4 defectos de gravedad alta (pops de personajes y una mano suelta, dos planos
que no se leen) y la parte 1 tiene varios planos chicos en el medio con media pantalla de piso vacío, por debajo de la
vara de abren-hoy-completo.

## ALTA

1. **35,57 → 35,60 · Q4: Walter aparece de golpe al lado del auto.** El auto entra y frena vacío; en 35,60 Walter
   aparece parado junto a la puerta, sin que se abra la puerta ni se lo vea bajar (pop puro). Cuadros: `cuts/w35.jpg`
   (35,567 sin Walter, 35,600 con Walter), `c/0143.jpg`. Arreglo: abrir la puerta del conductor y que baje (o que se
   lo vea manejando por el parabrisas y baje), o arrancar Q4 con Walter ya bajando.
2. **40,70-40,87 · Q5: mano suelta de Óscar.** Entra desde el borde izquierdo una mano señalando, flotando delante del
   auto, sin brazo ni cuerpo (Óscar está fuera de cuadro). `cuts/c40.9b.jpg`, `full/t40.75.jpg`. Arreglo: meter a
   Óscar en el plano (que se lo vea señalar el celular) o sacar el gesto.
3. **13,03-13,63 · P4b, el inserto del papelito: plano que no se lee.** Media pantalla de abajo gris lisa (piso), la
   de arriba un panel navy liso; el papelito es un rectángulo crema chico en el medio y en 13,03-13,10 no hay ni mano ni
   rótulo: parece una pantalla vacía. No se entiende que es el parabrisas del auto de Walter. `cuts/c13.03.jpg`,
   `c/0053.jpg`, `c/0054.jpg`. Arreglo: encuadre más cerrado y frontal con el marco del parabrisas, el capó blanco y
   el limpiaparabrisas en cuadro, el papelito ocupando ≥ 40 % del ancho, y la mano/rótulo desde el primer cuadro.
4. **10,03-12,75 · P4, la grúa no se reconoce y el plano es chico.** Se ve una caja con faros sobre ruedas negras
   gigantes (parece un monster truck); la cabina de la grúa nunca entra en cuadro. El conjunto ocupa ~45 % del ancho
   en el centro y el 35-40 % de abajo es piso vacío; Óscar de espaldas cortado por el borde derecho (10,0-12,0) y
   Walter diminuto detrás de la rueda (10,13-11,0) y después cortado por el borde izquierdo (11,25). El humo tapa el
   cartel MECÁNICA ÓSCAR (10,5-11,25; la nota dice que se corrigió, en el render no). `hs/h05.jpg`, `full/t10.75.jpg`,
   `c/0044.jpg`. Arreglo: plano más bajo y cerrado sobre la grúa de 3/4 (cabina + plancha + auto), que llene el
   ancho; humo desde el capó, por debajo del cartel; Óscar de 3/4 entero dentro del cuadro.

## MEDIA

5. **10,13 · P4: Walter aparece de golpe** detrás de la grúa (en 10,10 no está, en 10,13 sí). `cuts/c10.03.jpg`.
   Que entre caminando desde fuera de cuadro.
6. **31,80-32,70 · Q3g: plano vacío.** El paneo al portón termina con Maxi chico a la izquierda, los "tres autos en la
   vereda" diminutos al fondo y el 55-60 % de abajo de piso liso (32,25-32,70). El rótulo "Martes: 4 de 4 turnos ✓"
   flota sobre nada. `hs/h13.jpg` (32,25), `c/0131.jpg`. Arreglo: terminar el paneo más cerca de los autos de la vereda
   (que llenen el ancho) o con el elevador ocupado en primer plano.
7. **0,0-4,0 · P1, cuadro 0: el papelito no se ve.** La guía del inserto "PRÓXIMO SERVICE" arranca en x ≈ 10, pegada
   al borde izquierdo: el papelito en el parabrisas queda fuera de cuadro y el auto cortado por el borde (patente
   "4127" cortada). Walter de espaldas (se ve su nuca y una oreja) y el inserto le tapa la espalda. "PRÓXIMO SERVICE"
   mide ~22 px de alto. `full/t0.jpg`, `full/t0.75.jpg`. Arreglo: correr la cámara para que entre el parabrisas con el
   papelito, Walter de 3/4 con la cara, y "PRÓXIMO SERVICE" ≥ 36 px.
8. **13,67-14,70 · P4c: continuidad del papelito.** En P4b la mano de Óscar despega el papelito (13,37-13,60); en el
   corte siguiente el papelito en blanco sigue pegado en el parabrisas (arriba a la izquierda, cortado por el borde).
   Además, el auto está arriba de la grúa dentro del taller y por el parabrisas se ve una calle. `cuts/c13.67.jpg`.
   Arreglo: sin papelito en P4c (o invertir el orden: 125.000 primero, después la mano que lo despega), y el fondo del
   parabrisas = el taller.
9. **18,07-20,20 · P6: la mano de Walter tapa su ojo/cara.** El brazo que "señala el parabrisas" queda levantado
   delante de su cara, con el dedo a la altura del ojo (parece que se toca la nariz); no señala nada. Walter cortado a
   la mitad por el borde izquierdo; Maxi entra cortado por el borde derecho (19,25-20,20) y su cara queda pegada
   detrás de la de Óscar. Piso vacío en el tercio de abajo. `full/t18.5.jpg`, `hs/h08.jpg`. Arreglo: brazo extendido
   hacia el parabrisas (lejos de la cara), Walter entero en cuadro, Maxi del lado libre.
10. **36,0-37,35 · Q4: la llave y la mano sobre el ojo de Walter** al levantar la llave ("¡Volví a los diez mil!"), y
    Walter de 3/4 de espaldas; Óscar no está en el plano aunque Walter le habla. `full/t36.5.jpg`. Arreglo: llave en
    alto por encima de la cabeza, Walter de frente, Óscar en cuadro (aunque sea de espaldas en primer plano).
11. **30,0-31,77 · Q3m: la bombilla entra en la boca de Maxi mientras habla** (boca abierta con la bombilla adentro).
    `full/t30.3.jpg`. Arreglo: bajar el mate mientras dice la línea, o que la boca no se mueva con la bombilla puesta.
    En el mismo plano, las piernas de Maxi terminan en dos palitos verdes finos con zapatos blancos tipo malvavisco.
12. **41,0-42,87 · Q5i: la burbuja tapa el encabezado del celular.** En 40,9 se lee "Mecánica Óscar · en línea"; desde
    41,0 la burbuja "El papelito ahora te escribe." lo tapa y queda medio ícono verde y "en línea" asomando.
    `cuts/c40.9b.jpg`, `full/t41.2.jpg`. Arreglo: bajar el celular ~120 px o subir la burbuja.
13. **24,93-26,50 · Q1i: la ficha flota sobre un fondo sin sentido.** No se lee como la tablet en manos de Óscar:
    panel suelto sobre un fragmento de auto blanco, una rueda cortada en el borde derecho, una forma negra cortada en el
    borde de abajo (26,0) y el 30 % inferior beige vacío; la burbuja de Walter flota arriba sin personaje. "Guardado ✓"
    se sale de la píldora (el ✓ queda en el borde) y la píldora toca el borde de la ficha; "Último service" y "Próximo"
    ~26 px. `full/t25.75.jpg`, `hs/h11.jpg`. Arreglo: marco de tablet con las manos de Óscar, fondo del taller
    desenfocado, ficha más alta (llenar 60 %+ del alto), botón con ancho para el ✓, etiquetas ≥ 36 px.
14. **26,73-28,43 · Q2: "00" gigante al lado del celular.** El display de 94.800 queda tapado por el celular y asoma
    "00" enorme cortado por el borde derecho, compitiendo con el chat. `full/t27.2.jpg`, `cuts/c26.53.jpg`. Arreglo:
    correr el celular para que tape todo el display o desenfocar/oscurecer el tablero detrás.
15. **6,47-8,70 · P3: la guía de "Martes: 0 turnos" termina en un puntito suelto** a la izquierda de la burbuja de
    Maxi (6,6-8,0) y después cruza la burbuja "Ya vuelven." (8,25-8,5) hasta un punto escondido detrás. El elevador
    "vacío" casi no se lee (columnas navy sobre pared navy). Tercio de abajo de piso vacío en 6,5-8,5. `full/t8.25.jpg`,
    `hs/h04.jpg`. Arreglo: anclar la guía a los brazos del elevador sin cruzar burbujas; elevador con contraste (brazos
    verdes, piso del elevador claro) y cámara más baja.
16. **39,30-40,87 · Q5: cartel cortado "ECÁNICA ÓSCAR"** por el borde izquierdo durante todo el plano; Walter señala a
    otro auto del fondo en vez de su parabrisas; Óscar fuera de cuadro; 35 % de abajo de piso vacío. `hs/h16.jpg`,
    `hs/h17.jpg`. Arreglo: cartel entero o fuera de cuadro; Walter señalando su parabrisas, Óscar en el plano.

## BAJA

17. **20,25-21,30 · cartel:** al tipear letra por letra quedan motas sueltas (la letra siguiente nace como un punto:
    "Una fi ." en 20,25, "más ," en 21,25). `cuts/c20.23.jpg`, `c/0082.jpg`, `c/0086.jpg`. Que cada letra nazca con
    escala desde su tamaño, sin el punto.
18. **14,7-17,75 y 37,4-39,25 · primeros planos de Óscar:** el pelo es un casquete gris con relieve que parece un gorro;
    el cachete rosado se ve a través del blanco del ojo derecho (14,7-16,0); cuello de palito entre el cuello de la
    remera y la cabeza (15,0). `full/t15.0.jpg`. Pelo con mechones/volumen irregular, rubor detrás del ojo.
19. **28,47-31,77 · Q3 panel:** la tablet toca los dos bordes laterales del cuadro (28,75-29,9). Dejar ~40 px de aire.
20. **42,90-46,0 · cierre:** no se ve "el auto de Walter arriba en el elevador" (solo la columna y un brazo verde
    cortado arriba a la izquierda) y la mano de Óscar cuelga, no se apoya en la columna. `hs/h18.jpg`. Menor.
21. **3,90 · fin de P1:** la burbuja de "¡Obvio! Vos sos mi mecánico." se va ~0,2 s antes del corte mientras Walter se
    da vuelta; está bien, pero si la voz sigue sonando conviene dejarla hasta el corte. `cuts/c4.1.jpg`.

## Vara abren-hoy-completo

Los planos cerrados funcionan (P2 montaje del cuentakilómetros, P5 "Cuatro veces.", Q2 WhatsApp, Q3 panel, Q3h, Q4b,
Q5i, cierre). Lo que no llega: P4 (grúa chica y no reconocible), P4b (plano vacío), Q3g y Q4/Q5 (personajes chicos en el
centro con 35-60 % de piso vacío abajo) y los dos pops (10,13 y 35,60) más la mano suelta (40,70). Con 1-4 resueltos y
5-16 corregidos, otra pasada.
