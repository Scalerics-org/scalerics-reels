# taller-service · revisión de arte r2 (QA visual independiente, sobre el MP4)

Fuente: `renders/taller-service-final.mp4` (46,08 s, 1080x1920, 30 fps). Cuadros en
`/tmp/claude-0/-home-user-scalerics-reels/e7134b03-b34e-5982-a6c2-3d3afd5d546e/scratchpad/qa-taller-r2/`:
`c/NNNN.jpg` (cada 0,25 s: t = (N-1)·0,25), `hs/hNN.jpg` (hojas de 10 cuadros, rótulo = t·100),
`cuts/c<t>.jpg` (30 fps desde t-0,3: cuadro n = t-0,3+n/30; el rótulo amarillo de esas tiras NO es el tiempo real),
`cuts/maxi30.jpg`, `cuts/iris.jpg`, `cuts/cuatro.jpg`, `cuts/p3cam.jpg`, `full/t<t>.jpg` y `full/quad*.jpg` (cuadros grandes).
Sin cuadros negros, sin texto fantasma entre cortes, ortografía de burbujas, carteles y UI correcta.

**Veredicto: no se entrega así.** Queda 1 defecto alto nuevo (la cabeza de Walter sale por el techo del auto en Q4).
Lo demás de r1 está casi todo resuelto; quedan medios de encuadre (grúa, Q3g, P4c) y la entrada de Maxi en P6.

## Estado de r1

| r1 | Estado |
|---|---|
| 1 pop de Walter Q4 | Resuelto: abre la puerta y baja (35,84-36,2). Pero ver ALTA 1 (cabeza por el techo mientras maneja). |
| 2 mano suelta Q5 | Resuelto: Óscar de espaldas con el brazo entero. |
| 3 P4b no se lee | Mejor: techo, parabrisas, papelito, limpiaparabrisas y mano con brazo. Queda la guía que parpadea (MEDIA 5). |
| 4 grúa | Parcial: llena el ancho y el cartel está entero, pero sigue sin leerse como grúa (MEDIA 3). Walter ya no aparece de golpe. |
| 5 pop Walter P4 | Resuelto (corte en la acción a P4w). |
| 6 Q3g vacío | Parcial (MEDIA 4). |
| 7 cuadro 0 | Parcial: el papelito se ve y Walter está de 3/4, pero "PRÓXIMO SERVICE" sigue en ~26 px (MEDIA 8). |
| 8 P4c continuidad | Resuelto (sin papelito), pero arriba queda un bloque navy vacío (MEDIA 7). |
| 9 P6 mano en la cara | Resuelto en lo grave (el brazo ya no tapa la cara); el gesto sigue sin señalar el parabrisas (BAJA 12). |
| 10 Q4 llave | Resuelto (llave arriba, cara visible); Walter cortado por el borde (MEDIA 9). |
| 11 bombilla en la boca | Resuelto (el mate en la falda). |
| 12 burbuja sobre el encabezado | Resuelto. |
| 13 Q1i ficha | Resuelto (ficha grande, textos ≥ 36 px, ✓ adentro). Queda piso vacío abajo (BAJA 14). |
| 14 "00" en Q2 | Parcial: todavía asoma ~0,2 s (MEDIA 6). |
| 15 guía de P3 | Resuelto (anclada al pie del elevador, sin puntito ni cruce de burbujas). |
| 16 cartel cortado | Resuelto. |
| 17 motas del cartel | Resuelto (las letras nacen con escala). |
| 18 Óscar primeros planos | Rubor resuelto; el pelo sigue como casquete (BAJA 18). |
| 19 tablet Q3 en los bordes | Resuelto. |
| 20 cierre | Sin cambios de fondo (BAJA 17). |

## ALTA

1. **34,79-35,97 · Q4: la cabeza de Walter sale por el techo del auto.** Mientras el auto entra, Walter va
   "manejando" con toda la cabeza (y el cuello) arriba del techo navy, como si el auto no tuviera techo o él
   lo atravesara. Se ve 1,2 s, en el centro del cuadro. `full/t35.0.jpg`, `full/quad1.jpg` (1.º),
   `cuts/c34.79.jpg`, `cuts/c35.64.jpg`, `c/0141.jpg`. Arreglo: bajar a Walter en el asiento (o escalar la
   cabina del auto) para que la cabeza quede detrás del parabrisas, por debajo del techo. Mejor todavía, que se
   le vea la cara a través del parabrisas. Si no, arrancar Q4 con el auto ya frenado y la puerta abriéndose.

## MEDIA

2. **19,31-19,45 · P6: Maxi entra de golpe y le pasa por delante de la cara a Walter.** En 4 cuadros va
   del borde izquierdo (cortado) al centro, más grande que los demás (está más cerca de la cámara), y le tapa
   media cara a Walter mientras sigue en pantalla la burbuja de Walter. Parece un teletransporte.
   `cuts/maxi30.jpg`, `full/t19.35.jpg`, `full/quad3.jpg` (izq.). Arreglo: que entre caminando en ≥ 0,6 s,
   por detrás de Walter (entre él y el auto) o por el lado de Óscar, sin taparle la cara.
3. **9,93-10,63 · P4: la grúa no se lee como grúa.** Desde ese ángulo se ve una caja blanca con ventanas
   (parece un camión de mudanza o una casa rodante): no se ven el frente de la cabina, los faros ni la baliza.
   El "humo" es un disco gris liso detrás del auto que parece una pelota o una luna. Además está quieta (no
   entra de culata) y el cuarto de abajo es asfalto vacío. `full/t10.2.jpg`, `full/quad2.jpg` (2.º),
   `cuts/c9.93.jpg`. Arreglo: plano de 3/4 desde adelante (cabina con parabrisas, faros y la baliza crema
   prendida), humo en varias bocanadas que se muevan y salgan del capó del auto, y que la grúa recule en el plano.
4. **32,25-32,76 · Q3g: final del paneo pobre.** En 32,25 queda una astilla de Maxi (manga y mano verdes)
   cortada por el borde izquierdo. Al final se ven solo 2 autos ("tres autos esperando"), cada uno cortado por
   un borde, sin personas, con ~35 % de piso liso abajo, y el rótulo "Martes: 4 de 4 turnos ✓" flota sobre la
   pared. `full/t32.6.jpg`, `full/quad2.jpg` (4.º), `cuts/c32.79.jpg`, `c/0131.jpg`. Arreglo: cerrar el paneo
   con los 3 autos enteros en fila (o el elevador ocupado en primer plano y la fila atrás), la cámara más baja
   para comer el piso, sin el pedazo de Maxi.
5. **13,15-13,47 · P4b: la guía de "Último service" parpadea.** El rótulo aparece sin guía, la guía se dibuja
   (13,25-13,40), llega al papelito con su punto y desaparece en 13,45, mientras el rótulo queda. `cuts/c13.15.jpg`
   (2.ª fila). Arreglo: que la guía quede hasta el corte (o que salga junto con el rótulo).
6. **26,67-27,00 · Q2: celular con la pantalla en blanco y "00" que asoma.** El celular sube con la pantalla
   vacía (solo el encabezado) en 26,67-26,80 y, al subir, deja ver "94.8|00" / "00" del cuentakilómetros al
   costado hasta ~27,0. `cuts/c26.57.jpg` (2.ª fila), `c/0108.jpg`. Arreglo: el chat ya escrito desde que el
   celular entra, y el display apagado o fundido antes de que el celular lo cruce.
7. **13,77-14,80 · P4c: bloque navy vacío arriba.** El tercio de arriba (~35-40 %) es un panel navy liso (el
   "parabrisas") con el rótulo encima. El tablero y el volante están bien, pero media pantalla no muestra nada.
   `cuts/c13.77.jpg`, `cuts/c14.82.jpg`, `hs/h05.jpg`. Arreglo: encuadre más cerrado sobre el display de 125.000
   (que suba al centro) o, por el parabrisas, el taller con la grúa y la baliza.
8. **0,0-3,9 · P1: texto chico y Walter hablando de espaldas.** "PRÓXIMO SERVICE" del inserto mide ~26 px
   (la vara es ≥ 36). En 2,25-3,7 Walter dice "¡Obvio! Vos sos mi mecánico." casi de perfil/espaldas: no se le
   ve la boca. `full/t0.5.jpg`, `full/t2.75.jpg`, `full/quad2.jpg` (1.º). Arreglo: subir el rótulo a ≥ 36 px y
   girar a Walter hacia la cámara cuando habla (que se le vea la boca).
9. **36,0-37,4 · Q4: Walter cortado por el borde derecho.** Con la llave en alto queda cortado el hombro y el
   brazo izquierdo (desde 36,25), y Óscar nunca le recibe la llave. `full/t36.5.jpg`, `full/quad3.jpg` (der.),
   `hs/h14.jpg`. Arreglo: Walter ~120 px más a la izquierda (o la cámara un poco más abierta).

## BAJA

10. **22,267 (un cuadro) · iris del cartel: la mancha sobre "tarde".** El iris de Q1 arranca como un círculo
    navy (el torso de Óscar) justo encima del texto que se está desvaneciendo: "más t●rde…". `cuts/iris.jpg`
    (2.ª fila, 3.er cuadro). Arreglo: que el texto termine de salir 2-3 cuadros antes del iris, o que el iris
    arranque fuera del texto (abajo, donde está Óscar) o con el centro sobre un color claro.
11. **17,10 · P5: la burbuja se achica un cuadro** cuando se suma "Cuatro veces." y vuelve a su tamaño.
    `cuts/cuatro.jpg`. Que crezca sin el paso intermedio chico.
12. **18,16-20,2 y 39,35-40,9 · P6/Q5: Walter señala para arriba**, al lado de su cara (parece "tengo una
    idea"), no al parabrisas que tiene detrás. `full/t18.6.jpg`. Brazo hacia el parabrisas, la mano lejos de
    la cara.
13. **40,3 · Q5:** la mano de Walter pasa por su cachete al subir el celular. Menor.
14. **24,98-26,5 · Q1i:** ~35 % de abajo de piso beige desenfocado y vacío. Los cartelitos "GRACI…/DANIE…"
    quedan cortados en el borde derecho. `hs/h10.jpg`.
15. **28,5-29,9 · Q3:** ~40 % de arriba de pared navy con la columna, sin contenido; el texto de las filas
    ("Reservó · Jue 9:00") mide ~33 px. `hs/h11.jpg`.
16. **35-41 · Q4/Q5:** Óscar lleva en la mano un papelito blanco con rojo a la altura de la cadera. ¿Es el
    papelito viejo? En la parte 2 no tendría que haber papelito. `full/t35.0.jpg`.
17. **42,95-46,08 · cierre:** sigue sin verse el auto de Walter arriba del elevador (solo un brazo verde) y abajo
    a la izquierda asoma una curva negra (cubierta) cortada. `hs/h18.jpg`.
18. **Óscar en primeros planos (14,8-18,1 · 37,45-39,3 · cierre):** el pelo sigue como casquete gris con relieve
    y se ve el cuello de palito entre el cuello del buzo y la cabeza (`full/t15.5.jpg`).
19. **41,0-42,9 · Q5i:** "Mecánica Óscar · en línea" del encabezado del celular mide ~28 px.

## Vara abren-hoy-completo

Mucho mejor que r1: los pops y la mano suelta desaparecieron, P4b ya se entiende, P6/Q4/Q5 tienen a los dos
personajes en cuadro y los planos de interfaz (Q1i, Q2, Q3, Q5i) están bien. No llega todavía por el ALTO 1
(cabeza por el techo, muy visible en Q4) y por Maxi cruzando de golpe por la cara de Walter en el remate del
remate (2). Con 1 y 2 resueltos, y 3-9 corregidos, otra pasada sobre el render.
