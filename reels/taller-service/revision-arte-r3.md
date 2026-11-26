# taller-service · revisión de arte r3 (QA visual independiente, FINAL, sobre el MP4)

Fuente: `renders/taller-service-final.mp4` (46,02 s, 1080x1920, 30 fps). Cuadros en
`/tmp/claude-0/-home-user-scalerics-reels/e7134b03-b34e-5982-a6c2-3d3afd5d546e/scratchpad/qa-taller-r3/`:
`c/NNNN.jpg` (cada 0,25 s: t = (N-1)·0,25), `hs/hNN.jpg` (hojas de 12 cuadros cada 0,25 s, rótulo = t·100),
`cuts/c<t>.jpg` (30 fps desde t-0,3, rótulo = ms reales), `cuts/maxi.jpg`, `cuts/maxiout.jpg`, `cuts/q4walk.jpg`,
`cuts/grua.jpg`, `cuts/q3g.jpg`, `full/*.jpg` (cuadros grandes y recortes).
Sin cuadros negros, sin texto fantasma entre cortes, ortografía de burbujas, carteles y UI correcta.

**Veredicto: NO se entrega así.** Un defecto alto nuevo: Maxi desaparece de golpe en Q3g (32,13 s).
Es un arreglo chico (que se pare y salga, o que la cámara lo saque de cuadro antes). Todo lo alto y medio de r2 está resuelto.

## Estado de r2

| r2 | Estado |
|---|---|
| ALTA 1 cabeza por el techo (Q4) | Resuelto. Q4 arranca con Walter ya caminando hacia Óscar; nadie dentro de un auto, nada atraviesa (`cuts/c34.58.jpg`, `cuts/q4walk.jpg`). |
| 2 Maxi entra de golpe (P6) | Resuelto: entra caminando 19,63-19,90 desde el borde izq., por detrás de Walter, sin taparle la cara (`cuts/maxi.jpg`). Ver BAJA 6. |
| 3 grúa | Resuelto en lo suficiente: trompa de 3/4, parabrisas, faros, 2 balizas, chapa "AUXILIO", auto en la plancha atrás, humo gris; recula (`full/t10.3.jpg`, `cuts/grua.jpg`). Sin pluma visible, pero se lee como auxilio. |
| 4 Q3g final | Mejorado: 3 autos enteros de trompa, sin astilla de Maxi; pero ver ALTA 1 y BAJA 4. |
| 5 guía P4b | Resuelto: se dibuja 13,27-13,40 y queda hasta el corte (`cuts/c13.15.jpg`). |
| 6 "00" Q2 | Resuelto: chat escrito desde que entra, el display se vacía antes de que lo cruce (`cuts/c26.91.jpg`). |
| 7 P4c bloque vacío | Resuelto: 125.000 al centro, más cerrado (`cuts/c14.72.jpg`). |
| 8 P1 texto chico / Walter de espaldas | Resuelto: inserto "PRÓXIMO SERVICE" ~34-36 px, Walter de frente (`full/t0.0.jpg`). |
| 9 Walter cortado Q4 | Resuelto: entero con la llave en alto (`full/t35.6.jpg`). |
| Bajos 10-19 | Iris limpio (22,70-22,87), burbuja "Cuatro veces." sin paso chico, brazo de P6 hacia el parabrisas, trapo fuera. Pelo de Óscar igual (aceptado). |

## ALTA

1. **32,10 → 32,13 · Q3g: Maxi desaparece en un cuadro.** Está sentado en las cubiertas, en el centro del
   cuadro y con el mate, en 32,100; en 32,133 ya no está y las cubiertas quedan vacías en el mismo lugar,
   mientras la cámara sigue paneando suave. Se ve como un pop clarísimo en un plano que dura 1 s.
   `cuts/maxiout.jpg` (4.º → 6.º cuadro), `full/maxipop.jpg` (izq. 32,10 / der. 32,13), `cuts/q3g.jpg` (2.ª fila).
   Arreglo: o que Maxi se levante y salga caminando (≥ 0,5 s) antes de que el paneo lo deje atrás, o que se quede
   sentado y la cámara lo saque de cuadro por el borde izquierdo con el paneo (no esconderlo con visible=false
   mientras está a la vista). Revisar con 30 fps de 31,6 a 32,6.

## MEDIA

2. **43,01-46,0 · cierre: el brazo verde del elevador apunta a la oreja de Óscar.** La barra verde entra desde
   la izquierda y termina justo en la oreja, y debajo de la oreja asoma una punta verde redonda, como si la barra
   le atravesara la cabeza. Dura los 3 s de la tarjeta, en el centro de la pantalla. Además el brazo izquierdo de
   Óscar sube por detrás de la cabeza sin que se vea la mano (gesto raro). `full/t43.3.jpg`, `full/crop43.jpg`,
   `hs/h15.jpg` (43,0-44,75). Arreglo: correr a Óscar ~150 px a la derecha o girar/bajar el brazo del elevador
   para que quede lejos de la cabeza (que no la toque ni salga del otro lado), y el brazo de Óscar abajo o
   saludando con la mano a la vista.

## BAJA

3. **35,55-35,62 · Q4:** al subir la llave, la mano con la llave verde le pasa por encima del ojo a Walter (2 cuadros).
   `full/key35.jpg` (5.º cuadro). Que el arco del brazo pase por delante del hombro, no de la cara.
4. **32,25-32,58 · Q3g final:** los 3 autos quedan en una franja chica (~12 % del alto) con ~40 % de pared arriba y
   ~35 % de piso abajo; el rojo apenas cortado a la derecha. `cuts/c32.58.jpg` (1.ª fila). Si se toca la escena
   por ALTA 1, cerrar un poco más el plano sobre la fila de autos.
5. **13,15-13,77 · P4b:** la mano que señala es una bola con un dedo-cápsula liso, sin pulgar; en el celular se lee
   raro. `full/t13.3.jpg`. Opcional: sumar pulgar o nudillos. No es fálico, pero está cerca del límite.
6. **19,63-19,80 · P6:** cuando Maxi pasa por detrás de Walter, su cabeza con rodete queda pegada atrás de la de
   Walter y por 5 cuadros parece una cabeza doble. `full/t19.7.jpg`, `cuts/maxi.jpg` (1.ª fila, 6.º y 2.ª fila 1.º-2.º).
   Menor: entrar un poco más atrás (más lejos de la cámara) o por la altura del auto.
7. **9,93-10,63 · P4:** la grúa está bien, pero no tiene pluma/gancho; la trompa queda cortada por el borde derecho
   en el arranque (9,97-10,1). Opcional.
8. **Portada:** corresponde al reel (Walter con la mano en la cabeza, el auto en la plancha de la grúa, "Volvió en grúa.
   ¿Hace poquito?", sello TALLERES), sin texto del video asomando, texto entre y 1220-1590 (dentro de 285-1635).
   La cara de Walter ocupa poco de la mitad de arriba (~35 % del ancho); el letrero "MECÁNICA ÓSCAR" queda en
   y ~120-420, en parte fuera del recorte 4:5. Aceptable. `full/portada.jpg`.
9. **43,0-46,0 · cierre:** los textos chicos de la tarjeta ("La ficha de cada auto y el aviso del service") rondan
   36 px: en el límite. Sigue la cubierta negra cortada abajo a la izquierda.

## Revisado sin defectos
P1 (cuadro 0 con rubro grande, inserto legible, Walter de frente), P2 (ruta y papelito que se borra), P3 (guía
anclada), P4w (Walter baja en el corte, sin pop), P5 (primer plano, burbuja estable), P6 (brazo al parabrisas,
entrada de Maxi), cartel (letras con escala, iris limpio), Q1/Q1i (ficha), Q2 (chat), Q3/Q3m, Q3h, Q4 (sin nadie
dentro del auto, nada atraviesa), Q4b, Q5 (Óscar de espaldas con brazo entero), Q5i (celular), cierre (salvo MEDIA 2).
Ningún brazo, mano u objeto con lectura inapropiada.

## Vara abren-hoy-completo
Llega en todo salvo el pop de Maxi (ALTA 1), que no puede salir publicado, y el brazo verde contra la oreja en el
cierre (MEDIA 2), que se ve 3 s. Con esos dos arreglados alcanza una verificación puntual a 30 fps de 31,6-32,6 y
43,0-46,0 sobre el render nuevo; lo demás no hace falta volver a revisarlo.
