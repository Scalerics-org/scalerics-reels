# veterinaria-vacunas · notas del constructor (17-11)

Proyecto como taller-presupuestos: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (se editó directo). Toto, Coco y Mora en
`assets/perro.js` (nuevo: `crearPerro(cfg)` con sentado / erguido / echado / paso / cola / orejas / cejas / pata / jadeo, y
`crearCaraGato()` para Luna en la transportadora). `assets/personajes.js` = el de taller + `ELENCO.ines`, `ELENCO.vero`,
`ELENCO.bruno` (solo parámetros y peinados existentes: coleta, rulos, texturado). El estetoscopio y la lapicera de Inés
van en tres.js. Sofi = `ELENCO.sofi` con el override de taller, render target al celular parado.

**Duración: 39,87 s.** Parte 1 0-18,15 · cartel 18,15-20,67 · parte 2 20,67-39,87 = 19,2 s (48 %). "Comentá VACUNA"
desde 36,60 · línea chica desde 38,27. Mezcla: voz ≥ +7,2 LU sobre el resto en todos los tramos de 0,5 s, -14,0 LUFS,
pico -6 dBFS. `check --json`: ok, 0 errores.

## Comandos (desde reels/veterinaria-vacunas)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x   # solo la capa 3D
```
OJO: después de `VER=portada LIMPIO=1 node gen.mjs` hay que volver a correr `SINAUDIO=1 node gen.mjs` (tiempos3d.js).

## Voces (partes/procesar.sh)
v1 01-vero-b (Callirrhoe, atempo 1,12; la c con 1,12 el STT perdía "Doctora"; se reusa en Q1) · i1 02-ines-b (Sulafat) ·
b1 03-bruno-a (**Schedar**, atempo 1,12; se reusa en Q3) · i2 04-ines-b (atempo 1,06) · v2 05-vero-a (atempo 1,18, 3,62 s;
STT "doctora atotol escribieron de la de la vuelta ya está vacunado") · i3 06-ines-b · narrador 07-narrador-a
(Rasalgethi, atempo 1,1 → 2,40 s, < 2,6: no hizo falta ya-lo-cargo) · i4 08-ines-a · v3 09-vero-c (atempo 1,1) · i5
10-ines-c · i6 11-ines-c · f1 12-sofi-b (Achernar, atempo 1,12 + lowpass 7 kHz). "oyó:" igual al texto en todas (el STT no
marca tildes ni signos).

## Cambio de dato del guion (para el coordinador)
La ficha decía "Próxima: MARZO" con el chip MARZO en el cuadro 0: entonces la vacuna de Toto vencía recién al marzo
siguiente y en JULIO no tenía por qué vacunarse en otro lado. Pasó a **"Próxima: JUNIO"** (ficha de cartón y tablet); en
JUNIO la pestaña de Toto se pone roja, y la parte 2 dice "JUNIO · 5 días antes" y "Vacunas de junio". Las voces no
cambian. Anotado en guion.txt.

## Sonido
Ladridos reales CC0 de Freesound (vía el repo robwizzie/fetch, freesound no responde desde la nube): ver fuentes.md.
No hay gemidito, maullido ni canilla CC0 accesibles: esos momentos van con música y zumbido.

## Mundo
Consultorio: pared del fondo z = -2,2 (azulejo #365f28 hasta 1,8 m, navy arriba), mesa de acero en (-0,45, -0,15) alto
0,72 (Toto escala 0,9 arriba), carrito en (-0,86, 0,95) con el fichero (parte 1) y la tablet en atril + el celular de Sofi
(parte 2), mesada con pileta contra la pared izquierda, mostrador en (2,35, -1,05) con el cartel "VETERINARIA INÉS"
arriba y el estante de ración; sala de espera: banco contra la pared derecha, vidriera y puerta (la hoja abre hacia
afuera). Living de Vero en x = 30. Insertos pegados a la cámara: la ficha en la tablet (Q1t), el celular de Vero (Q2,
Q2c), el panel (Q3).

Planos: P1 cuadro 0 · P2 el fichero (la cámara sigue la ficha de Toto; ABRIL, MAYO, JUNIO; vencidas 4 → 12 → 31 → 63) ·
P2c JUNIO 21:40 en el mostrador ("¡Guau! ¡Guau!" en burbuja con la cola fuera de cuadro) · P3 Bruno con el fichero e Inés
en la pileta, caen dos fichas · P4 JULIO, entran Vero y Toto (pañuelo) · P5 la pausa con los tres rótulos · P6 picado de
Toto (POV de Inés) · P7 Toto con las patas en el mostrador le da la pata · Q1 = P1 con la tablet · Q1t · Q2 · Q2b living ·
Q2c · Q3 panel + Bruno (burbuja con avatar) · Q3b Inés y Bruno con sus tablets · Q4 la sala (la cámara sigue a Toto) ·
Q4b "¿Vos también, Toto?" y la pata · Q5 panel → Sofi.

## Pasadas
- Toto (renders/test/p1): primer armado con la cabeza mirando al cielo (un `.add().rotation` que giraba toda la cabeza) →
  arreglado; cola en cuentas sueltas → cápsulas; patas largas → cadera más baja; pañuelo que no se veía → más grande y
  más abajo. Visto de frente, perfil, 3/4, sentado, parado, echado, erguido, dando la pata y Coco.
- Armado (prev.mjs, renders/prev/a-e): P1 con Inés y Vero cortadas → cámara más atrás, personajes y carrito más
  adentro; P2 con la ficha de adelante tapando todo → cámara más alta; P3 Bruno de espaldas tapando a Inés → entra desde
  el fondo de frente y la mira por arriba del hombro, las fichas caen de sus brazos; P6 Toto tapado por el mostrador →
  cámara del lado del cliente; P7 la cámara dentro de la cabeza de Inés → por encima del hombro de Toto, con las dos
  patas en el mostrador; Q4 la cámara quedaba en el mostrador vacío → sigue a Toto; Q2b, Q3b y Q4b más abiertos;
  la hoja de la puerta tapaba a Vero → abre hacia afuera.
- Pasada 1 (hyperframes snapshot cada 0,5 s, renders/snap/p1): la caja VETERINARIAS tapaba el chip MARZO → chip más
  abajo; la burbuja de Vero pisaba el chip → más chica y a la derecha; "Le vamos a escribir a él." sobre el chip → más
  abajo; Bruno fuera de cuadro al empezar a hablar → entra más cerca; Vero fuera de cuadro cuando arranca su burbuja →
  entra más adentro; la planta y el fichero jubilado del estante alto se leían como un bulto verde flotando arriba en la
  parte 2 → sacados (el fichero ya no está en la parte 2); Toto con la cabeza rara 3 cuadros al pararse en P7 → se para en
  0,12 s. Zonas tocadas vistas otra vez (renders/snap/z1).

## Portada
VER=portada en tres.js: Inés asomada sobre el mostrador mirando abajo y Toto parado delante del mostrador, de frente,
con las orejas gachas, las cejas tristes y el pañuelo rojo apagado. `FULL=1 prev.mjs` → recortado 520 px de arriba (fondo
navy abajo): portada-src/fondo-limpio-portada.png. grande "¿Vos también, Toto?", chica "Julio." (la chica larga "Le
escribió otra veterinaria." tapaba el hocico de Toto), sello VETERINARIAS (queda sobre el pelo de Inés, sin tapar los ojos).

## Render
`hyperframes render --workers 2`: 1333 s (22 min, SwiftShader, con el otro constructor en paralelo); re-codificación del
paso 10: 88 s. renders/veterinaria-vacunas-final.mp4, 39,9 s.

## Ronda 1 (17-11, sobre qa-ronda-r1.md)
**Duración 38,87 s.** Parte 1 0-16,79 · cartel 16,79-19,24 · **parte 2 19,24-38,87 = 19,63 s, 50,5 %**. Mezcla: voz ≥ +6,4 LU en
todos los tramos, -14 LUFS. `check --json` 0 errores. Guion 6 hecho: cuadro 0 JUNIO, ficha "Próxima: JUNIO", escalada
AGOSTO → DICIEMBRE → JUNIO, parte 2 "Un año después · 5 días antes". Vencidas 12 → 25 → 41 → 63.
- Rig: `personajes.js` · la cabeza respetaba mal `cuelloAlto` (poner() la bajaba 6 cm); lentes de Inés finos y pegados a la
  cara (`lentesCerca: 1,05`); en 3/4 y perfil se esconden el aro y las patillas del lado de atrás (ya no flota un aro ni
  cruza la patilla el ojo); Inés filmada de 3/4 o de frente y con la cabeza menos baja (el ojo de perfil quedaba como
  rayita). Bruno sin franja (era el aro verde de la cintura). Toto: oreja parada de volumen (lathe, base ancha, interior
  rosado), pañuelo triangular grande de frente y la chapita escondida bajo el pañuelo.
- Colocaciones: Inés detrás de la mesa (P1/Q1) y Q1b más abierto desde la izquierda: Toto ya no la toca; Bruno lleva el
  fichero con el largo hacia adelante y las manos por fuera; P7 Toto con las dos patas en el canto y la derecha sube 10 cm
  hacia la mano de Inés (cámara en diagonal); Q4b Toto se para y da la pata a la altura de la mano, Inés más lejos; en Q3
  las tablets bajas (con el panel en pantalla) y Bruno en cuadro; P3b contraplano de Inés en su remate.
- Duración (sonido 1): v2 nueva sin "¡Doctora!" (05b-vero-e, atempo 1,1, 3,52 s), MES 0,42, P2c 0,72, v1 en 0,15,
  P7 0,85, cartel nar + 0,05, Q1t i4 + 0,3, ficha 1,5 s, "Turno reservado" 1,05 s, el panel cuenta sobre "Ya salieron
  solos." (Q3c, burbuja con avatar de Inés), aire final 0,25 s, "Comentá VACUNA" entra en "Comentá". i3 con 0,14 s de
  pausa antes de "Toto".
- Cuadro 0: el fichero 1,7x, en primer término a la izquierda, con 12 pestañas rojas; VETERINARIAS 54 px más abajo.
- Planos: P3b, P4b (Vero de frente, Toto con pañuelo), Q1b nuevos; P6 picado con el mostrador; P2c más abajo; Q5 panel
  entero junto a Sofi con push-in suave (sin barrido); la ficha de P1 en y ≤ 1490, la línea final en y 1240-1500, el rótulo
  "Vacunado a la vuelta" en 1390.
- Interfaz: "Vencidas" → "Pendientes" en el panel; "A los 15: segundo aviso mañana" a 46 px; el inserto del celular
  860×1400; el toque sin aro sobre "10:00"; burbuja de Vero entera (sin cortes de "de").
- Sonido: tono de teléfono (k-dos-tonos, auricular), escalada más fuerte con un plac por ficha, ladrido contento antes del
  corte, campanita con la puerta, pasos de Vero en Q4, roce de tela en la mano.
- Portada: chica "Vino vacunado.", Inés corrida a la derecha (el sello no le tapa la cara), lentes bien, pañuelo de
  frente, cámara más abierta y recortada 300 px.

## Ronda 2 (17-11, sobre qa-ronda-r2.md)
**Duración 39,83 s.** Parte 1 0-17,45 · cartel 17,45-19,90 · parte 2 19,90-39,83 = 19,93 s (50,0 %). Mezcla: voz ≥ +6,2 LU,
-14 LUFS. `check --json` 0 errores. (+0,97 s sobre la ronda 1: la noche pasó de 0,72 a 1,5 s; para sostener el 50 % se
sumaron 0,15 s a la sala de Q4 y 0,14 s antes de Bruno en Q3, y se sacaron 0,05 s al arranque y 0,07 s a P7.)
- A1: Inés sin lentes en todo el reel, el avatar y la portada (`ELENCO.ines.lentes: null`).
- A2: `personajes.js` · con labios pegados, al hablar la sonrisa se aplana del todo y la boca abierta queda en la línea
  de los labios (ya no hay dos bocas). Vero sin el parpadeo en "¡Toto!".
- A3: Toto 15 cm más cerca de Vero y Vero 8 cm más a la derecha (Toto lejos de la cara de Inés); la burbuja de Vero más
  chica (52 px) y sin pisar el chip; Q1b más abierto, con la burbuja arriba.
- A4: rótulos de P5 abajo a la izquierda (guía al fichero sin cruzar la cara) y "Vacunado a la vuelta" a la derecha;
  P5 con Inés y el fichero enteros.
- A5: P7 de costado (el perfil de Toto con las patas en el mostrador y la cara de Inés); la media crema de las patas
  más corta (ya no son columnas blancas).
- M1: P6 desde el costado y abajo: Toto mirando arriba, el frente del mostrador e Inés asomada (sin la bolsa delante).
- M2: la noche dura 1,5 s (tono, ladrido a +0,65, cuelga a +1,15), con el fichero en el mostrador y sin el cartel cortado.
- M3: P3b centrado en Inés. M4: Q1b (ver A3). M5: Q4c contraplano de 3/4 sobre Inés en el segundo "¿Vos también,
  Toto?" (sin parpadeo) y Q4d abierto para la pata. M6: panel del cierre más grande y más arriba (la línea final ya no
  tapa "Llamadas a mano: 0"); Sofi al lado. M7: la burbuja de Vero solo en el plano de frente (P4b entra a los 0,3 s de
  su línea) y la de Bruno solo en P3. M8: la guía "Ficha de Toto" aparece en AGOSTO, cuando la pestaña TOTO ya asoma.
  M9: el pañuelo de frente se ve en P4b, P5, P6 y P7.
- Sonido/guion: guion.txt reescrito con los tiempos reales (`node partes/guion-real.mjs`); fuentes.md con 12 → 25 → 41 →
  63, "Próxima: JUNIO" y 15 pendientes; último chip "JUNIO · un año después"; Luna "mar 9:45" y Mora "mar 10:30"; la
  tercera línea de la burbuja de v2 se revela en "Ya".
- Bajos: techo navy (sin franja crema arriba); panel con letras de 48-52 px; sala con las cabezas separadas.
- OJO (bug encontrado): en gen.mjs un comentario se había comido `T.bolsa` (la pose de Vero quedaba NaN en P4b). Arreglado.
- Portada: Inés sin lentes, Toto parado de frente con el pañuelo arriba del texto, cámara a 3,9 m y recorte de 420 px.

## Ronda 3 (17-11, sobre qa-ronda-r3.md)
**Duración 39,83 s** (sin cambios de voz ni guion). Parte 1 0-17,45 · cartel 17,45-19,90 · parte 2 19,90-39,83. Mezcla rehecha
(cambió la entrada de Vero): voz ≥ +6,2 LU sobre el resto en todos los tramos de 0,5 s, -14,0 LUFS, pico -5,9 dBFS.
`check --json` ok, 0 errores. Dos pasadas completas de snapshots cada 0,5 s (renders/snap/p2 y p3) y cuadro por cuadro
(1/30 s, ±2 cuadros) alrededor de cada corte con prev.mjs (renders/prev/cortes).
- Cortes (general): en tres.js ningún plano puede durar menos de 0,3 s (se saca y avisa por consola). Q4b duraba 2 cuadros
  (era el flash de 34,37 s): se sacó; Q4 sigue a Toto hasta Q4c. P4b (10,43): Vero ya terminó de entrar y está de frente en
  el corte (entrada 0,55 s, `T.entra = [p4+0,05, p4+0,6]`, giros por el lado corto: antes daba una vuelta de 300°).
- N2 boca (personajes.js): la curva de los labios sigue la esfera de la cabeza (extremos hundidos x²/2R), tubo aplastado
  contra la cara, interior más fino, la boca 2° más arriba; con la cabeza girada > ~25° respecto de la cámara la boca se
  angosta y se aplasta (ojoLejano). Q4c pasó de primer plano de perfil a plano medio de 3/4 frontal.
- A3 (P1/Q1): Toto 14 cm más a la derecha en la mesa, Inés 12 cm más a la izquierda, Vero detrás de la mesa de 3/4 (ya no de
  espaldas); cámara más abierta (z 3,9 → 3,65); "Yo le aviso." más chico y arriba (la cola termina sobre el pelo).
  Fichero 2,3x en el cuadro 0, más adentro, con "Vencidas: 12" encima; la ficha de Toto ya no cruza la cara al guardarla.
- N1 (P6): cámara baja desde la vidriera; Inés derecha detrás del mostrador (cara entera por encima), Toto sentado de 3/4
  con el pañuelo de frente mirando hacia arriba; burbuja a la boca. En P4b Toto se sienta mirando a Vero (pañuelo de
  frente) y en la pausa (P5) se da vuelta hacia Inés.
- A5 (P7): de costado desde la vidriera, Inés entera, la pata y la mano a la vista; sin la bolsa ni la correa en ese plano
  (Vero no está en cuadro).
- Medios: Q1b desde la izquierda (Inés y Toto enteros, Vero detrás de Toto); Q4d con la cabeza de Inés entera; oreja de
  Toto con volumen (0,72) y lomo oscuro; pañuelo más grande y con punta redonda; cartel "VETERINARIA INÉS" escondido en
  P4, P6, P7 y Q4 (donde quedaba cortado).
- Bajos: la cifra de vencidas cambia con el mes; "Ya está vacunado." en 12,15 s; Coco "mar 10:15"; Pendientes baja a la
  par que suben los turnos (63 - turnos); el chat del celular con la fecha, la tarjeta de Toto en el mensaje y botones
  grandes; portada: Inés más a la derecha (el sello ya no toca el pelo), pañuelo sin chapita.
- No hecho: el panel del cierre (Q5) sigue con letras de ~25-30 px (acercar la cámara corta el panel o a Sofi); el cierre
  sigue en 3,43 s (lo marca la voz de Sofi, 3,18 s).
- Cortes (s): P2 3,21 · P2c 4,54 · P3 6,04 · P3b 8,18 · P4 9,88 · P4b 10,43 · P5 13,73 · P6 14,68 · P7 16,67 · cartel 17,45 ·
  Q1 19,90 · Q1b 22,08 · Q1t 23,65 · Q2 25,15 · Q2b 25,80 · Q2c 27,78 · Q3 29,28 · Q3c 31,62 · Q4 33,20 · Q4c 34,42 ·
  Q4d 35,56 · Q5 36,28.

## Ronda 4 (17-11, sobre qa-ronda-r4.md)
**Duración 41,57 s.** Parte 1 0-18,32 · cartel 18,32-20,77 · parte 2 20,77-41,57 = 20,8 s (50,0 %). Mezcla rehecha: voz ≥ +7,2 LU
en todos los tramos de 0,5 s, -14,0 LUFS, pico -5,8 dBFS. `check --json` ok. Dos pasadas completas (renders/snap/r4p1 cada
0,5 s y r4p2 desfasada 0,25 s) y cuadro por cuadro en todos los cortes (renders/prev/cortes4).
- Regla de burbujas (todas): `hablar(globo, personaje, …)` en tres.js pone la burbuja arriba del que habla, con el borde de
  abajo ~100 px sobre la coronilla y la cola terminando en el pelo; si no entra o el que habla queda cortado, lo anota en
  AVISOS y prev.mjs lo imprime. Cámaras abiertas hasta que no quede ningún aviso grave (P3, P4b, Q1b, Q2b, Q3, Q4c).
- ALTA 1 P3 20 % más abierto (Bruno entero). P3b sin push-in; P3c nuevo (vuelve a Bruno desde 9,30 para ver caer las fichas).
- ALTA 2 P4b: Vero 20 cm más lejos de Toto (VERO_MOS x +0,92), bolsa a +0,62; Toto sentado de frente a cámara (pañuelo de
  frente) y entero; correa desde el collar por detrás; cámara más abierta.
- ALTA 3 / R1 P5: los tres rótulos entran entre 13,73 y 13,89 y quedan 1,7 s (pausa 0,95 → 1,7 s); r1/r2 apilados con aire,
  "Vacunado a la vuelta" al costado de Toto, nunca sobre su cabeza. Compensado en la parte 2: Q1t +0,25, Q2c +0,2, Q3c +0,42.
- ALTA 4 Q1b: Vero de la parte 2 en VERO2 (no queda detrás de Toto), cámara desde la izquierda con Inés y Toto enteros.
- ALTA 5 Q2b más abierto: la burbuja sobre la cabeza de Vero.
- M1 P2c: "¡Guau!" abajo a la derecha (de la sala, lejos de la cara), cámara más alta, sin el cartel. M2 ver ALTA 1.
  M3 rig: con giro > ~36° se esconden la ceja y el rubor del lado de atrás (personajes.js). M5 Toto gira la cabeza en 0,55 s.
  M6 P6 de frente y bajo (Toto culpable con el pañuelo de frente, Inés arriba), P7 diagonal más abierto (Inés ~25 %, la
  pata y la mano juntas); Toto se para recién en P7. M8 Q5: Sofi y el panel enteros.
- G1 "Toto · Próxima vacuna". B4 descripcion.txt "decenas de fichas".
- Bajas: tubos del techo ocultos en P1/Q1 (la placa crema flotando); póster lejos del cuello de Vero; tablet de Q1 sin tapar a
  Inés; chip JUNIO abajo; el panel de Q5 en cero desde el primer cuadro.
- No hecho: texto de las tablets de Q3 (~16 px, son objetos chicos en mano), panel del cierre ~25 px, lengua de Toto,
  sello de la portada (la portada no cambió en esta ronda), cierre 3,55 s (voz de Sofi).
- Cortes (s): P2 3,21 · P2c 4,54 · P3 6,04 · P3b 8,18 · P3c 9,30 · P4 9,88 · P4b 10,43 · P5 13,73 · P6 15,43 · P7 17,42 ·
  cartel 18,32 · Q1 20,77 · Q1b 22,95 · Q1t 24,52 · Q2 26,27 · Q2b 26,92 · Q2c 28,90 · Q3 30,60 · Q3c 32,94 · Q4 34,94 ·
  Q4c 36,16 · Q4d 37,30 · Q5 38,02.
