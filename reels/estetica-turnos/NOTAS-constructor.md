# estetica-turnos · notas del constructor (16-11)

Proyecto como dice-cuarenta: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`. `assets/personajes.js` = el de dice-cuarenta +
`ELENCO.lorena`, `ELENCO.vale`, `ELENCO.carolina`, `ELENCO.jimena`, `ELENCO.mariana` (peinados existentes: mediaCola,
coletaAlta, coleta, rulos, rodete). Graciela = `ELENCO.clienta`, Sofi = `ELENCO.sofi` (render target al celular parado).

**Duración: 42,54 s** (parte 1 0-17,95 · cartel 17,95-20,53 · parte 2 20,53-42,54; "Comentá TURNOS" desde 38,70;
línea chica desde 40,74). Más largo que el plan (34,4 s): las tomas reales son más largas (Sofi 3,77 s ya con atempo 1,1).
Si hay que recortar: el P4 (1,75 s de pausa), Q2 (2,6 s) o Q3 (3 tramos).

## Comandos (desde reels/estetica-turnos)
```
bash partes/reintentar.sh        # tomas que faltan (LINEAS=, TOMAS=); de a una por la cuota de Gemini
bash partes/medir-tomas.sh       # recorta silencios a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh          # arma assets/voice/ desde las tomas elegidas (filtro de audio de celular en c1, j1, c2)
node gen.mjs                     # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni tarjetas
python3 medir.py                 # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre       # snapshots con el candado
```
`window.__cam = [px,py,pz,mx,my,mz,fov]` fija la cámara (depuración).

## Voces (partes/procesar.sh)
c1 01-carolina-a (atempo 1,06 + celular) · l1 02-lorena-b · j1 03-jimena-a (atempo 1,08 + celular; la única con "era
hoy") · l2 04-lorena-c · c2 05-carolina-b (atempo 1,06 + celular; las c/d decían "guardaste") · l3 06-lorena-a ·
narrador 07-narrador-c (Rasalgethi, toma nueva, 2,33 s) · l4 08-lorena-a · g1 09-graciela-e (el STT oye "me lo quedó";
las otras 6 tomas el STT las oía "creo/quito/pido/tiro/bloqueo") · c3 10-carolina-d (atempo 1,06) · l5 11-lorena-a
(-1 dB) · s1 12-sofi-a (atempo 1,1, lowpass 7 kHz). Todas con "oyó:" igual al texto salvo g1 (acento) y s1/c2 (el STT no
marca la tilde de "comentá"/"guardás").

## Mundo
Gabinete z -3,05..0 (pared del fondo con reloj a la izquierda y ventana con persiana a la derecha), arco ancho en z = 0,
recepción z 0..4,45 (mostrador en z 3,2, estante y cartel en la pared del fondo, puerta de vidrio a la derecha, sillón
de espera a la izquierda). Camilla girada 0,55 rad (cabecera atrás a la izquierda), lámpara lupa sobre la cabecera,
carrito a la izquierda, Vale en el banquito a la derecha. Living de Graciela en x = 30. Los insertos (reserva, tríptico,
tablet) son pegados a la cámara como en dice-cuarenta.

## Pasadas
- Armado (probar.mjs, hojas c1-c3, p1-p3): cámaras dentro de las cabezas (los personajes tienen cabeza de 0,6 m: planos
  medios a 2 m); la camilla a lo largo de z no se leía → girada 0,55 rad; Vale cortada en el borde → x 0,78; la placa
  "Lorena Estética" de la pared se veía de espaldas; la tablet tapaba la cara de Lorena en Q1 → corrida a la derecha;
  textos de la tablet encimados ("limpieza facialseña").
- Pasada 1 (hyperframes snapshot cada 0,5 s desde 0): P3 con el pelo de Lorena tapando media pantalla → cámara del lado
  derecho; audio de 17:52 cortado a los costados → tres renglones; tríptico con "Hola, Carolina" y "Martes 10:00" cortados;
  Q1 primer plano demasiado cerca; Carolina entraba rozando la cámara; Carolina con cejas de enojo al hablar; Q4b con
  Carolina tapando a Lorena → otro ángulo; Q5 con el celular de Sofi cortado.
- Pasada 2 (cada 0,5 s desde 0,25): link y "Te mando el link." encimados; Q5 tablet cortada a la derecha → plano más
  abierto (la tablet escalada 1,35 para que los textos lleguen a ~36 px). `check --json`: 0 errores.

## Pendiente / para los revisores
- Los cisnes se leen chicos en P2/P3 (se ven, pero el corazón no se lee de frente con claridad).
- Las transformaciones de las toallas son escala + vaivén de manos, no manipulación detallada.
- P6: Lorena mira la agenda (ojos casi cerrados, sin hablar).
- Duración 42,5 s (pedido ~34).

## Ronda 1 (16-11, sobre la revisión independiente del MP4 de 42,6 s)
**Duración 38,75 s** (parte 1 0-16,87 · cartel 16,87-19,32 · parte 2 19,32-38,75 = 50,1 %). Render 1876 s.
A1 tablet y celular de Sofi invisibles en la parte 1 · A2 mostrador a 0,9 m, Lorena más adelante, cámara alta (se le ve
el torso), cisnes sobre el mostrador a su derecha · A3 la tablet arranca "15:00 Libre / 16:00 Mariana / 17:00 Jimena" en
blanco; Carolina en verde al reservar, Jimena al confirmar · A4 aviso de Graciela arriba sin cola, cámara más baja ·
A5/A6 rótulos abajo sobre el piso: "3 turnos…" a la camilla, "A Vale se le paga igual" a su regazo, "$ 5.400 que no
entraron" se queda durante "Lo único puntual…"; P4 1,8 s · M1 "Cubierto en 2 minutos" con ajuste · M2 tríptico rehecho
(300 px, textos con ajuste, "Reprogramó / Martes / 10:00 ✓" a 54 px, llega a q2 + 0,05) · M3 sin círculos · M4 celular
con cámara, reborde y mano; tablet con cámara; pie de texto · M5 Q5: tablet ~85 % con "Camilla vacía: 0 h" a 76 px,
después push a Sofi (celular 1,9x); s1 a q5 + 0,2, atempo 1,15, cola 0,4 · M6 la tablet de Q5 ya verde · M7 el cartel no
entra en Q5 · M8 cielorraso crema (sin luz) · M9 P4 más alto y rótulos abajo · M10 horas en Lexend, agenda de frente en
P5/P6 · M11 "¡Llegué!" abajo · M12 pinza verde y mechas en la nuca de Lorena, coleta de Carolina con volumen,
`flequilloAlto` en Vale · M13 Carolina entra por la puerta · M14 cama +4 dB, SFX +6 dB sin voz (techo -31) · M15 push-ins
más marcados en P5, Q4, Q4b · M16 chat de Mariana blanco con tildes verdes · M17 portada desde el plano general (8,9 s).
Bajas: B1 B2 B3 B5 B7 B8 B9 B10 B11 B12. Mezcla: voz ≥ +8,5 LU, -14,2 LUFS, pico -5,2 dBFS.

## Ronda 1 corrida 11:11 (sobre qa-ronda-r1.md)
**Duración 37,30 s** (era 38,6). Parte 1 0-15,54 · cartel 15,54-17,71 · **parte 2 17,71-37,30 = 19,6 s, 52,5 %**.
Q5: tablet 32,63 · viaje a Sofi 33,23-33,61 · s1 desde 33,29 ("TURNOS" ~33,82) · "Comentá TURNOS" 33,81 · línea chica 35,25.
Mezcla: voz ≥ +8,9 LU sobre el resto en todos los tramos, -14,0 LUFS, pico -5,2 dBFS. `check --json`: 0 errores.
Portada rehecha: fondo LIMPIO del cuadro 8,7 s (corazón de frente, pelo nuevo) en portada-src/fondo-portada-8.7.png.
- **S1** el viaje a Sofi arranca en q5+0,6 y aterriza en q5+0,98; Sofi empieza a hablar en el viaje (q5+0,66) y "TURNOS" se
  oye ya en cuadro; el cartel entra en la palabra (s1+0,52), después del barrido (sin fantasma, A11). La tablet sola 0,6 s.
- **S2** j1 sin atempo (el atempo hacía oír "irá hoy lotería"): highpass 200 / lowpass 6000. STT: "era hoy lo tenía para el
  jueves que viene". +0,12 s.
- **S3** l2 y l5 se revelan por palabra (textoSel/verGlobo, el armado no se mueve): "fueron" 1,3 · "las" 1,55 · "excusas."
  1,75 s dentro de l2; "Hoy le surgió" 1,1 · "venir." 1,75 dentro de l5 (STT + envolvente).
- **S4** pausa antes del remate 1,33 s (P5 = P4 + 0,8).
- **S5** push-ins en P6 (46→38) y Q4b (44→33); P3 con push al reloj.
- **S6/A1** sin "$ 5.400" en P5; la cola del remate va a la boca.
- **S7** DUR redondeado hacia arriba a un cuadro (37,3 = 1119/30) y la mezcla recortada a DUR.
- **S8** pop en "Reserva online con seña", "Recordatorio automático" y "Lista de espera".
- **Recorte**: reloj/"escribiendo…" -0,36 · pausa -1,0 · hueco antes del audio de Carolina (c2) -0,25 · narrador toma d
  (2,09 s; cartel 2,17) · Q1b/Q2 -0,2 · Q3c -0,08. NO: el hueco tras "¿Era hoy?" (cortado, el STT pasaba a oír "lotería" en
  todas las variantes probadas, con y sin fundido) · +0,12 de j1 y +0,5 por A9 y S1: por eso 37,3 y no 36.
- **A2** el celular no va sobre la agenda en P5/P6; en P5 la agenda baja a la cintura (fuera de cuadro, no cortada); en P6
  la agenda 1,3x (las manuscritas ~55 px).
- **A3** los audios de Jimena (P3) y Carolina (P1, P6) sin cola y arriba (cy 280-330); ya no tapan a Vale.
- **A4** P3 = corte seco reloj (0,6 s) → Vale (P3b); el audio fijo arriba, sin salto.
- **A5** Q1: cámara mira más alto (Lorena más abajo, menos mostrador vacío); burbuja de Carolina arriba sin cola, "Te mando el
  link." debajo, sin encimarse ni tapar la frente; los cisnes de la recepción no se ven en Q1 (quedaban cortados).
- **A6** el cuadro del living corrido y más chico (los "parantes"); Q3b con Graciela más abajo, "¡Me lo quedo!" debajo del
  aviso con la cola a la boca, no tapa las manos.
- **A7** los cisnes enfrentados (antes de espaldas): los cuellos forman el corazón; Vale gira en el banquito hacia cámara
  y los sostiene de las colas (manos a ±0,37).
- **A8** melena (solo `peinado: "melena"`, la usa solo Lorena): sin los bultos; surcos de mechón irregulares en cortina y
  casquete, puntas desparejas, media cola con pinza verde atrás. Ningún otro personaje cambia.
- **A9** "Te lo guardo." de frente (sigue P6, con boca) y después P6b (Vale y la toalla nueva) 0,52 s.
- **A10** textos secundarios de la tablet en su renglón a lo ancho, 46 px; Q5 fov 38 (la tablet llena el ancho; el vacío
  vertical es por la proporción de la tablet).
- **A12** Sofi con buzo navy claro y franja crema (override en tres.js); la varilla del micrófono separada de la mejilla
  (personajes.js, rama auricularFino: solo Sofi en este reel).
- **A13** el texto del cartel sale cuando abre el iris (no queda verde vacío).
- **A14** sin los tres dedos sueltos (palma + pulgar).
- **A15** "Reprogramar" con ajuste; la cartera verde de Carolina a la cadera, delante (se ve en Q4); sin el parpadeo al
  terminar de hablar; cejas alegres al llegar. Parpadeos de Lorena fuera de sus frases.
- **G1** "Audio" en vez de "audio de WhatsApp". **G2** recordatorio con "con Vale" y el servicio; el nombre queda en la
  cabecera ("Hola, Carolina" a lo ancho quedaba a ~30 px).
- Revisado: snapshots cada 0,5 s de 0 a 37 (renders/snap/f1, f2) + zonas tocadas (a-g). Pendiente para el revisor: el
  surco del pelo es sutil a distancia; la tablet de Q5 deja aire arriba/abajo por proporción.

## Ronda 2 corrida 11:11 (sobre qa-ronda-r2.md)
**Duración 37,03 s** (1111/30). Parte 1 0-15,54 · cartel 15,54-17,71 · **parte 2 17,71-37,03 = 19,3 s, 52,2 %**. Q5: tablet
32,65 · "Camilla vacía: 0 h" 33,05 · viaje 33,25-33,63 · s1 33,31 · "Comentá TURNOS" 33,83 · línea chica 34,98.
Mezcla: voz ≥ +8,9 LU, -14,0 LUFS, pico -5,2. `check --json` 0 errores. Pasada completa cada 0,5 s (renders/snap/r2a, r2b) +
zonas tocadas a resolución completa (renders/snap/h).
1. (ALTA) Sofi: mientras habla la sonrisa baja a 0,15 → el labio queda pegado sobre la boca abierta; una sola boca (visto a
   resolución completa a 34,2).
2. (ALTA) P6: las dos manos sostienen la agenda por detrás (z 0,24-0,26) y la lapicera no se ve en P6; ni puño ni dedo
   atraviesan las hojas (visto a 12,2 / 13,0 / 14,5).
3. Agenda de P6 a 1,15x y paneo de la cámara (mira x -0,53→-0,55): no se corta a la derecha.
4. Q1: la mano izquierda de Lorena abajo, detrás del mostrador (no queda el puño suelto).
5. "Comentá TURNOS" sube 64 px (top 56): no tapa la coronilla ni el borde de la pantalla.
6. "¡Llegué!…" arriba (cy 300) con la cola a la boca de Carolina.
7. Vale mira al frente al girar en el banquito (no queda de 3/4 deformada).
8. Graciela menos agachada (asiente 0,22): la patilla ya no cruza la pupila.
9. "Te lo guardo.": ojos 0,92; en P6 mira la agenda con la cabeza, no con los párpados (incredula los cerraba a 0,55 y
   quedaban bultos de piel).
10. Sin la franja verde del fondo de Sofi (era la mota).
11. A7: manos de Vale a ±0,33 / 0,14 (en las colas). A8: melena con vetas de color por vértice (surco oscuro, cresta clara)
    en cortina y casquete; el borde delantero del casquete ya no es recto (puntas de flequillo desparejas, sube un poco);
    cejas de Lorena 0x6a3f27 (donde asomaban por el flequillo eran la "mota" oscura). A10: "Reprogramar" 38 px con ajuste
    a W-50; la tarjeta del link en dos renglones grandes (sin "turnos · Lorena Estética"). A13: el texto del cartel sale en
    dur-0,22 y el iris abre con power1.in (sin verde vacío; visto a 17,47 / 17,53).
12. Portada: fondo LIMPIO 8,7 s con cámara un poco más abierta (VER=cam), subido 160 px: el reloj queda debajo de y 285 y
    el brazo de Vale lejos del borde.
13. j1: highpass 300 / lowpass 5000 (como el corte bajo de c1/c2). Con el compresor o lowpass 3400 del filtro de celular el STT
    oye "lotería" 3 de 3 veces; así oye "era hoy lo tenía…" 3 de 3.
14. Cola final 0,25 s más corta (DUR = fin de Sofi + 0,1): la tarjeta queda 3,2 s.
15. "Camilla vacía: 0 h" entra a q5+0,4 con ding y pop propios (el chip "Cubierto" ya no aparece en Q5).
16. "Lo único puntual hoy" también se revela palabra por palabra (las 7 palabras).
