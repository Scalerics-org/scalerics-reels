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
