# vete-racion · lo que falta (revisión final de arte sobre el render del 24-11, después de 3 rondas)

No se entrega todavía: 2 defectos ALTOS en Q2 (la entrega de Bruno). Cuadros de referencia: se regeneran con ffmpeg del mp4 de esta rama.

ALTOS
1. 26,67-26,77: Bruno y la bolsa aparecen delante de la puerta mientras se abre hacia adentro; el picaporte se le clava en la frente y media cara queda dentro de la hoja; la puerta se abre en 2 cuadros. Que la puerta se abra antes de que se vea a Bruno (o Bruno detrás de la hoja).
2. 26,33-28,5 (todo Q2): el antebrazo de Vero se mete en la cabeza y el pecho de Toto; la cara de Toto queda tapada todo el plano. Sacar el brazo y que se vea a Toto contento.

MEDIOS
3. 5,07 · 5,63 · 6,17 (montaje del súper): la bolsa salta del carro a la mano en el mismo plano; el chip del mes cambia 0,07-0,1 s tarde. Que el cambio de mes sea un corte real.
4. 12,6-13,3: la burbuja de "La compro en el súper" tapa el pelo de Vero, la colita apunta para arriba; se ve el hueco del cuello (cabeza flotando sobre un disco marrón).
5. 17,6-18,2: Toto echado contra la torre, media cara cortada por el borde derecho.
6. 15,43-16,4 (P5w): la mano de Inés es un mitón con el capuchón verde como una uña; la lapicera casi no se ve; en 16,23 la hoja arrancada aparece cortada por el borde izquierdo; la burbuja "¿Me la anotás?" de Vero queda abajo del primer plano de Inés y parece que lo dice Inés.
7. Portada: la cabeza de Toto (bajada al plato) queda tapada por "DOMINGO, 21:40." y se ve un perro sin cabeza.

BAJOS
8. 28,6-31,2: la parte de arriba de las patas delanteras de Toto se ve como un cilindro cortado. El hocico come en el borde de atrás del plato, no adentro.
9. 3,53-3,6: la cabeza de Toto sube en 2 cuadros.
10. 0,25-1,6: la burbuja "Uy. Se terminó." roza el ojo de Vero.
11. Insertos 1,7-2,57 y 16,6-17,6: franja gris vacía abajo (y 1740-1920).
12. 7,57: el chip "Febrero." se va en el corte.
13. 8,0-9,9: Vero cortada por el borde derecho en el plano general.
14. 22,93-23,0: parpadeo de Vero en medio de "¿Cómo sabe?".
15. 16,43-16,57 y 38,87-38,97: mitad de abajo navy vacía 0,1-0,15 s.
16. Cierre de 3,6 s; Toto no asoma; Inés chica en cuadro.

Ya está bien (no tocar): sonido y mezcla (-14,0 LUFS, voz ≥ 6,3 LU, SFX ≤ -31,5, paso10.sh de dos pasadas lineal), guion y datos, silueta de perro y sticker, saltos de 1,5 y 28,2 resueltos.

## Ronda 4 del constructor (24-11, noche) · corregido sin render (falta render + QA del coordinador)
1. ✔ La hoja de la puerta abre hacia afuera en 0,57 s (T.abre-0,12 → +0,45) y Bruno espera 0,75 m más atrás (BRUNO_P.z = PZ-1,3), fuera del barrido: la hoja pasa DELANTE de él y lo descubre. La mano de Vero sigue el picaporte (PERILLA_V) y lo suelta. Revisado cada 0,03 s de 26,30 a 26,93 (renders/snap/q2).
2. ✔ Toto 34 cm a la derecha de Vero (y Vero 8 cm a la izquierda): el brazo no lo toca. Al oír "Toto" se da vuelta contento hacia la cámara (cara de frente, lengua afuera, 27,2-27,8) y vuelve a mirar la bolsa cuando Bruno la apoya.
3. ✔ Cada mes es un corte: encuadre propio por mes (CORTE_MES), la bolsa vuelve a la mano, el chip y el contador cambian en el mismo cuadro (T.mes).
4. ✔ Contraplano (P4b y Q4b) a la altura de la cabeza y con la cabeza más abajo: la burbuja entra arriba con la colita hacia abajo (sin avisos). El hueco del cuello era un bug del personaje (el cuello terminaba 2,5 cm abajo del cráneo): personajes.js alarga el cuello con cuelloAlto, ya no se ve la tapa en ningún plano.
5. ✔ P5t más abierto (fov 53, mira 10 cm a la derecha): Toto entero.
6. ✔ P5w por encima del hombro de Vero (su cabeza abajo a la derecha, la burbuja apunta a ella); lapicera más gruesa con capuchón crema (sin la "uña" verde); la hoja arrancada entra entera. La mano sigue siendo la de los personajes (de lejos se lee menos como mitón).
7. ✔ Portada regenerada: fondo a 3,9 s (P1b) con Toto con la cabeza levantada mirando a Vero, entre el sello y el texto; Vero con el celular "Cerrado" y la bolsa de 15 kg a la izquierda (queda cortada en el borde).
8. ~ El hocico come 3 cm antes del centro del plato (dentro). Las patas delanteras de Toto: sin tocar (es la geometría de perro.js).
9. ✔ La cabeza de Toto sube en 0,5 s.
10. ✔ "Uy. Se terminó." más chica (0,85) y a la altura del mentón: no toca el ojo.
11. ✔ Insertos "Cerrado" y receta más grandes y sin la franja gris de abajo (sinPiso).
12. ✔ "Febrero." sigue 0,75 s en P4 y se desvanece.
13. ✔ P4 más abierto (V4 fov 61, z 4,1): Vero entra entera.
14. ✔ Sin el parpadeo en "¿Cómo sabe?".
15. ✔ 16,43-16,57: ahora es el plano por encima del hombro (cabeza de Vero abajo). 38,84: la tarjeta entra con el corte al cierre (T.c), con su pop.
16. ✗ Cierre sin tocar (largo atado a la voz de Inés; la tarjeta ocupa la mitad de abajo).
Mezcla regenerada (pop de la tarjeta 0,12 s antes): voz-resto mínimo 6,3 LU (medir.py). check --json: ok, 0 errores.
