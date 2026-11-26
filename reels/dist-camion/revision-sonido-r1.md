# dist-camion · revisión de sonido y ritmo · ronda 1 (revisor independiente, 26-11)

Material: `renders/dist-camion-final.mp4` (45,0 s, 1350 cuadros) y los stems `assets/audio/stem-voz.wav` / `stem-resto.wav`
(misma duración que `mezcla.wav`; la pista del MP4 está alineada con la mezcla, desfase 0 muestras por correlación).
No se regeneró nada ni se abrió Chrome. Scripts y cuadros en el scratchpad (`qa-camion-sonido/`).

## Medidas (pasan)
- Integrado **-14,0 LUFS**, true peak **-2,8 dBFS** (astats: pico -2,89 dB, 0 muestras recortadas). LRA 4,9 LU.
- Voz contra música + SFX, ventanas de 0,5 s pareadas (momentánea, ganancia final aplicada): mínimo **+13,0 LU** (28,0 s,
  cola de "a la una."), mediana ~22 LU. `medir.py` da mínimo +7,6 LU. Ningún tramo con voz por debajo de +6 LU.
- Tramos sin voz: máximo **-31,3 LUFS M** (5,5 s, la cabina) y -31,8 (22,5 s). Pasa, justo en el borde del techo de -31.
- Nivel de cada línea (RMS de la parte con voz): entre -15,6 y -19,5 dB. Parejo, ninguna línea se cae (el "Ah." da -17,4).
- Huecos muertos (RMS de 50 ms por debajo de -42 dBFS durante más de 0,15 s): solo 22,75-22,90 y 23,75-23,90 (ver abajo).
- Burbujas contra la voz: todas entran entre -0,15 y +0,1 s de su línea, y el texto coincide con lo dicho. Los globos en
  dos tiempos ("A algún lado llega." 11,0 · "No un señor." 36,0 · "¿Pasó algún señor?" 39,4) caen sobre la palabra.
- Sincronía revisada cuadro a cuadro: los 3 golpes en la persiana (los mínimos de movimiento del puño en 12,60 / 12,83 /
  13,07; los SFX en 12,63 / 12,86 / 13,09), freno de aire y puertas (13,65 / 13,77), 6 cajas (13,86-14,71), fajo de papel
  (14,85), ring de "Súper Héctor llamando…" (19,22), notificación y ding del aviso (22,38 / 23,48), obturador (36,83, la
  miniatura de la foto aparece en 36,8), ding de Entregado ✓ (37,10), whoosh + ding del chip que vuela (37,54 / 37,99, el
  panel pasa a 15 de 18 en 38,0), pops de la tarjeta CAMIÓN (41,99) y de la línea chica (43,12). Bien.

## Tomas dudosas
**"¿Qué… señor?" (17,02-18,22, toma 13-i).** El "qué" está y se oye: explosión de /k/ (17,03-17,06) y vocal /e/ con F1
~300 Hz y F2 ~2100-2400 Hz hasta 17,35, a -17 dB RMS, el mismo nivel que "señor" (-18,6). El corte no come nada: la /e/
decae sola (-19 → -38 dB en 40 ms) antes del corte y la /s/ de "señor" arranca desde el silencio con su subida natural.
Confianza alta en que se entiende "qué". **Lo que suena raro es la entonación:** el "¿Qué?" termina subiendo fuerte (F0 ~90 →
~300 Hz) y "señor" arranca otra vez abajo, en fry (~63 Hz), y vuelve a subir (~225). Son dos preguntas separadas
("¿Qué? ¿Señor?") pegadas con 0,07 s de silencio digital (silencio acústico total ~0,09 s): un salto de tono de dos octavas
en menos de una décima de segundo. Confianza media-alta en que se oye como pegote (no lo puedo escuchar; lo deduzco de F0 y
de la duración). En la toma original el hueco era 0,44 s.

**"Vos. No un señor." (35,39-36,69, toma 23b-d).** El "un" está en la señal: /n/ 36,02-36,08, /o/ 36,09-36,14 (F1 ~420,
F2 1100 → 930), **/u/ 36,15-36,21 (F1 ~285, F2 ~620-650, la /u/ típica)**, nasal /n/ 36,22-36,24 (F1 ~200) y recién ahí la /s/
(36,25). "No un" dura 0,23 s, cuando "no" solo daría ~0,12-0,15 s. Además el pico de tono (~222 Hz) cae justo sobre el "un",
o sea que va acentuado. Es corto (~0,1 s entre /u/ y /n/) y en el STT se funde. Con el globo "No un señor." en pantalla,
confianza ~75 % en que se oye "No un señor"; lo peor que puede pasar es "No'n señor", no "No, señor".

## Defectos, por gravedad

### Media
1. **17,36-18,34 · el remate "Uno que pasaba." sin pausa.** Entre el final de "¿señor?" (18,22) y "Uno" (18,34) hay
   0,12 s. Es el remate de la parte 1 y llega pegado a la pregunta, sin tiempo de comedia. Cambio: correr u2 (y lo que
   sigue) +0,35-0,45 s para dejar ~0,5 s de silencio (con un gesto de Rubén o un cuadro quieto del Ruso mientras tanto).
2. **17,36-17,43 · "¿Qué… señor?" pegado** (ver arriba): dos preguntas con salto de tono y 0,07 s entre medio. Cambio: en
   `procesar.sh` `hueco 13-ruben-i r7 0.36 0.8 0.20` (0,18-0,25 s), que es lo que pide el "…" del guion. Si se agranda, el
   globo puede decir "¿Qué… señor?" en dos tiempos. Sumado al punto 1, la parte 1 crece ~0,5 s.
3. **44,85-45,0 · la voz termina pegada al final del video.** "…distribuidora" termina en 44,91 y el audio se corta en
   44,97: solo quedan 0,06 s de aire (RMS -32 → -55 dB en 44,85-44,95). Con el loop de Instagram, la última sílaba choca contra
   "Rubén, ¿por dónde viene…" del cuadro 0, y en algunos reproductores se puede comer. Cambio: dejar 0,3-0,4 s de cola (DUR
   +0,3, la tarjeta llega a ~3,3 s) o bajar las pausas internas de r10 (atempo 1,12, o recortar el silencio de 0,17 s después
   de "CAMIÓN") para que la voz termine en ~44,6 con la tarjeta en 3,0 s.

### Baja-media
4. **21,51-21,96 · el narrador dice "tarde" con el texto ya ido.** "más tarde…" aparece en pantalla en 21,2-21,3 (antes de
   que se diga), el texto se va con el iris en 21,62 y la palabra "tarde" suena entera sobre el iris y Graciela (hasta 21,96).
   Cambio: narrador 0,25-0,3 s antes (P1 + 0,06 → P1 - 0,2, el whoosh y el stinger quedan) o que el texto salga en `dur - 0,1`
   y el iris abra recién después de "tarde".
5. **33,55-34,17 · Q4r (la hoja de ruta en la cabina) sin sonido de cabina.** Se ve la rambla por el parabrisas, pero sigue
   sonando la oficina (`oficina(T.q3, T.q4)`) y la música. Cambio: cortar la oficina en `T.q4r` y poner el ómnibus por
   dentro + motor (como P4b, techo -40) entre 33,55 y 34,17, o un pop/whoosh suave cuando se ilumina "Parada 15 de 18".
6. **10,70-11,00 · la pausa antes de "A algún lado llega." es de 0,30 s.** Funciona, pero es corta para el remate principal
   del reel (después de "¿Adónde?" la pausa con el golpe del mate es de 0,51 s y esa sí respira). Cambio: 0,45-0,55 s
   (`hueco 10-ruben-b r5 1.75 1.91 0.5`). Opcional si el tiempo total no da.

### Baja
7. **2,83-3,43 · el sorbo de mate suena sin que nadie tome mate.** `sorbo.wav` arranca en el corte a P3 (2,85), encima del
   ring y de Marta; en P2 Rubén tiene el mate en la mano pero no toma, y en P3 tampoco. Cambio: sacarlo o moverlo a un plano
   donde Rubén tome.
8. **35,42-36,55 · la firma con el dedo dura más que el sonido.** El trazo se dibuja de 35,5 a ~36,5, y `birome.wav` (0,6 s)
   termina en ~36,0. Además es una birome sobre papel y el dedo va sobre vidrio. Cambio: estirar a ~1,0 s o un roce más suave
   (fricción de dedo), con hp ya puesto.
9. **22,75-22,90 y 23,75-23,90 · dos agujeros de ~0,15 s a -46 dBFS** en el inserto del aviso (Q1i): la oficina termina en
   `T.q1i` y queda solo el chisporroteo agachado al 60 %. No es silencio total, pero en el celular se siente como un vacío.
   Cambio: que el ambiente de la rotisería no se agache tanto en Q1i (HUECO_K más chico en ese tramo) o un roce de mano/celular.
10. **13,88 · el rótulo "Cafetería Marta · vuelve al depósito" entra sin pop** (los otros dos rótulos tienen, 14,25 y 14,55).
    Lo tapan las cajas: menor. Cambio: `pop(T.rotMarta, -44)` por consistencia.
11. **41,43-44,97 · el plano de cierre dura 3,54 s** (la tarjeta CAMIÓN, 3,0 s, está bien). Si por el punto 3 se agranda el
    final, cuidar que la tarjeta no pase de ~3,3 s.
12. **28,52-31,12 · Nico/Rubén/Nico de Q3 son el mismo audio exacto de P5** (n1, r4, n2). Es un callback buscado y está bien;
    solo dejarlo anotado: un "Llegando." distinto (r2 o r3) haría que suene menos a copiar y pegar.

## Lo que está bien y no hay que tocar
Mezcla, techo de SFX, nivel de las voces y sincronía de casi todos los efectos. La música que se corta seca con el golpe del
mate (8,79) antes del remate funciona. P6a/P6b no tienen voz durante 3,1 s, pero cambia algo cada ~0,3 s (golpes, puertas,
cajas, rótulos), así que no hay escena muerta. Ninguna escena pasa los 3 s sin un cambio (P5b, 3,53 s, cambia de globo en
10,98; Q3, 3,06 s, cambia de globo cada ~0,7 s).
