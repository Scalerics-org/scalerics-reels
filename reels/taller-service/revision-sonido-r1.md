# taller-service · revisión de sonido y ritmo · ronda 1 (revisor independiente)

Material: renders/taller-service-final.mp4 (46,0 s) y assets/audio/stem-voz.wav / stem-resto.wav / mezcla.wav (10:32).
El audio del mp4 es la mezcla.wav (diferencia ≤ 0,2 LU por tramo). Medido con ffmpeg ebur128/astats + numpy; cuadros cada
0,25 s y tiras a 10/30 fps. Trabajo en el scratchpad qa-taller-sonido/ (tramos.txt, hojas, tiras, fmt.py).

## Lo que pasa
- Integrado **-14,0 LUFS**, true peak **-2,9 dBTP**, LRA 6 LU, sin clipping (flat factor 0; sin clics: los únicos
  transitorios bruscos son los tics previstos en 4,12 / 4,68 / 5,24 / 5,80 / 13,69 / 28,55-29,39).
- **Voz contra música + SFX** por tramos de 0,5 s: en todos los tramos con voz la diferencia es de **+12 a +31 LU**
  (mediana ~23). El único tramo marcado (40,5-41,0, -0,1 LU) es el hueco sin voz entre "¿No me ponés el papelito?" y
  "El papelito ahora te escribe": no es una falla.
- **"Volvé" (0,9-1,2 s y 23,5-23,8 s):** es la misma toma (o1, correlación 0,965 en 0,081 s y 0,968 en 22,701 s).
  Formantes por LPC (o1.wav a 10 kHz): la primera vocal (o1 0,87-0,90) tiene F1 ≈ 410-420 Hz, F2 ≈ 710-1.000 Hz, que es
  /o/, no el diptongo /ue/ de "vuelve" (F2 no llega a 1.700 antes de la /l/, F1 no baja a ~300 como /u/); la
  /l/ en 0,93-0,98 (F1 ~295, F2 ~1.330); la vocal tónica (1,01-1,05) tiene F1 335-385 Hz, F2 1.700-1.780 Hz, que es /e/ y
  pasa a /a/ ("volvé‿a", F1 570); la /i/ de la misma toma ("Listo", "mil") está en F1 210-320, F2 2.150-2.280, así que no
  es "volví". El pico de f0 (156→192 Hz) cae en la segunda sílaba: acento agudo, no en la primera como en "vuelve".
  **Dice "volvé": confianza alta (~85-90 %).** Igual conviene que alguien la escuche una vez.
- "Ya" de "Ya vuelven" (o2) y "Ya vinieron" (o4): el STT se los come en todas las tomas, pero en la señal están (fricativa
  "sh" 2,4-3,3 kHz + /a/ F1 ~500, 50-70 ms). Están, aunque son cortos.
- Las burbujas cambian en sincronía con la voz: la segunda mitad de o1 en 0,90 (voz 0,88) y 23,50 (voz 23,50); "Cuatro
  veces." en ~16,97 (voz 16,99); el texto del cartel se arma con "Una ficha por auto más tarde"; SERVICE en 43,25. Los textos
  coinciden con lo que se dice. No hay subtítulos grises ni cortados.
- Los arranques de las tomas no están recortados (las rampas de 5-10 ms son las de la toma cruda). Los silencios internos
  insertados (o1, o3, o4) no hacen clic.
- SFX en sincronía con lo que se ve: cinta 0,02; tics y meses del montaje; sorbo (6,42 y 29,95, Maxi con el mate); glitch en
  los 38 (8,73); marcha atrás, diésel y siseo con la grúa (10,0-11,3); llave neumática en la plancha (11,26); cinta al
  despegar (13,33, la mano se ve); tic y glitch del 125.000 (13,69); el acento en "Cuatro veces."; stinger, narrador y pops
  del cartel; toque y ding en "Guardado" (25,67); vibración y notificación (26,5); toque en "Reservar" (27,61) y ding en
  "Turno reservado" (27,77); ding en "Martes: 4 de 4" (32,18); el auto que entra (34,4); llaves en alto (35,88);
  notificación en 40,78; pops de SERVICE y de la línea chica.

## Defectos

### Gravedad media
1. **26,6-30,0 s · 3,4 s sin voz en el corazón de la solución (Q2 + Q3).** Todo el audio queda entre -32 y -37 LUFS
   (momentáneo), ~20 LU por debajo del diálogo (-12/-15). En el celular suena a que se cortó el audio justo cuando se ve
   el producto (WhatsApp, Reservar, panel). Qué cambiar: subir la cama en los huecos sin voz (HUECO_K 0,6 → ~0,3; la cama
   hoy queda en -40/-44 y puede ir a ~-33 con los SFX encima sin pasar -31) o devolver una línea corta encima de Q2 (la w4
   "¡Uh! Justo me estaba olvidando." que se sacó) para que no haya 3,4 s sin voz.
2. **14,2-14,75 s · la pausa antes del remate queda muerta.** Desde que se va el diésel (13,65) la mezcla cae a -38/-43
   LUFS (de 14,4 a 14,7 está en -42/-43, casi silencio) hasta "Volviste…" (14,75). La pausa tiene que estar (está bien que
   la música se vaya), pero se tiene que oír el lugar: un tono de taller o la calle a ~-36, o la baliza/el diésel en ralentí
   con cola hasta 14,7, para que la pausa se sostenga y no parezca un hueco de edición.
3. **4,07-6,37 s · el montaje P2 también queda bajo** (-31 a -37, mediana ~-33,5) después de una línea a -14: 2,3 s de casi
   nada, con los tics como único elemento claro. Misma solución que el 1: la música acelerada (techo -47) puede subir 4-6 dB.

### Gravedad baja
4. **3,85 y 4,02 s · la puerta de auto y el arranque suenan sin la acción.** En cuadro, Walter recién se da vuelta y da un
   paso (3,8-4,07); no hay puerta ni auto. Hay que correr la puerta + motor a ≥ 4,10 (por debajo del montaje, en off) o
   sacar la puerta y dejar solo el arranque como puente.
5. **3,8-4,2 s y 35,4-35,8 s · huecos sin voz apenas arriba del techo:** momentáneo máx. -30,4 (puerta + motor + whoosh +
   paso) y -30,1 (auto que entra + puerta). Bajar 1-1,5 dB la puerta o el motor en 3,85-4,02 y la cola de auto-entra.
6. **28,55-28,91 s · cuatro tics de "fila" sin acción:** las filas del panel ya están completas desde el primer cuadro de Q3
   (28,45). Los tics del contador arrancan en 28,95 pero el número cambia recién en ~29,25 (8→9) y ~29,35 (→10): 0,3 s antes.
   Sacar los tics de las filas (o animarlas) y correr los del contador a 29,2-29,4, con el ding en 29,4.
7. **19,59 / 19,84 s · el trapo y el pop del rollo de Maxi:** Maxi llega por detrás de Óscar y el rollo casi no se ve
   (19,3-20,2). O se muestra el rollo o se sacan esos dos sonidos.
8. **37,44 s · llaves que pasan de mano en un primer plano de Óscar** donde no se ve la llave. Pasa, pero se puede bajar o
   sacar.
9. **10,1-10,7 s · Walter entra caminando y hay un solo paso (10,76).** Lo tapa el diésel; si se quiere, 2-3 pasos más desde
   10,15.
10. **42,89-46,0 s · el plano de cierre dura 3,11 s** (la tarjeta dura 2,75 s desde 43,25). Está en el límite; si hace
    falta, recortar 0,1-0,15 s de la entrada de C. La voz termina en 45,69 y la música se va con un fundido de 0,6 s:
    queda bien.
11. **35,5-35,6 s · Walter aparece de golpe junto al auto** (no se ve que abra la puerta) mientras suena la puerta en 35,53.
    Es más del director de arte, pero el sonido marca el salto.

## Ritmo
- Planos: P1 4,07 s (cambia: burbuja en 0,90, Walter en 2,32, se da vuelta en 3,8), P3 3,64 s (dos líneas y dos rótulos),
  P4 3,02 s, P5 3,34 s (primer plano fijo: la burbuja en 14,75 y "Cuatro veces." en 16,97; 2,2 s sin cambio visual, con la
  voz andando). Ninguno queda muerto; P5 es el más quieto.
- Pausa antes de "Cuatro veces.": 0,46 s (16,5-16,97), se oye y tiene el acento grave. Bien. Pausa entre "¿hoy no viene
  nadie?" y "Ya vinieron." en Q3: ~1,0 s con el giro de cámara al portón. Funciona como revelación.
- No encontré pegotes, palabras comidas ni respiraciones raras en la señal (no se escuchó: se analizó por
  niveles y formantes).
