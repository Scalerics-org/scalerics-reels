# taller-service · notas del constructor (26-11)

Proyecto con la forma de importadora-dolar: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html,
index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (infraestructura de importadora-dolar:
tarjetas pegadas a la cámara, globos en dos tiempos con CORTE, globos fijos para los callbacks, camPantalla, avatares por
render target; el taller y el auto de juguete de taller-esta-pronto). `assets/personajes.js` = el de importadora-dolar sin
cambios (ELENCO.oscar, .maxi, .walter, .clienta, .sergio; Daniel se arma en tres.js solo para su avatar).

## Comandos (desde reels/taller-service)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-o7.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre && ./hojas.sh renders/snap/nombre   # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10 después del render (renders/taller-service.mp4 → -final.mp4)
```
Portada: ver la `nota` de portada.json. `portada-src/fondo-limpio.png` ya está (P4: la grúa con el auto humeando arriba,
Walter rascándose la cabeza a la izquierda, Óscar a la derecha, todo en la mitad de arriba). `t` 12,42. portada.mjs pide el mp4.

## Voces (partes/procesar.sh)
Óscar **Charon** · Walter **Umbriel** · Maxi **Puck** · narrador **Rasalgethi** (toma nueva "Una ficha por auto más tarde.",
08-narrador-c, atempo 1,12 → 2,27 s). "service" se mandó como "sérvis" en 05-walter y 15-oscar (pantalla dice SERVICE).
o1 01-oscar-b (pausa tras "Listo, Walter." a 0,2 s; se reusa en Q1) · w1 02-walter-a (se reusa en Q1) · m1 03-maxi-a (se reusa
en Q3g) · o2 04-oscar-a · w2 05-walter-c · o3 06-oscar-c (pausa antes de "Cuatro veces." 0,44 s) · w3 07-walter-a · w4
09-walter-a · o4 10-oscar-c · w5 11-walter-c · o5 12-oscar-b · w6 13-walter-c · o6 14-oscar-a · o7 15-oscar-c. atempo 1,04-1,15.
No se escucharon (elección por STT y duración). Dudas de oído: 01-oscar-b el STT oye "volví" (las tres tomas: "vuelve"/"volví";
la a decía "vuelve", descartada por posible tuteo) · 06 el STT oye "al tres" por "Walter" · 09 "me estaba liando" por
"olvidando" (la toma cruda sí la oye bien) · el STT escribe "Comenta" sin tilde, como en todos los reels.

## Mundo
Taller "Mecánica Óscar" (piso y = 0): pared del fondo z = -5 con el portón ancho a la calle (x -0,6 a 3,5) y el cartel
MECÁNICA ÓSCAR arriba; elevador de dos columnas a la izquierda (LX -2,75, LZ -2,75); banco de trabajo con cajón (se abre en
Q5b) y tablet en atril (solo parte 2) en (-2,85; 1,05); pila de 3 cubiertas (Maxi sentado) en (-1,05; -0,9); tablero de llaves,
panel de herramientas, la calle con vereda, fachadas y árboles. El auto de Walter: hatchback blanco nuevo (`crearAuto(...,
{hatch, puerta})`, SBC 4127, puerta del conductor +x que se abre) en CARPOS (1,45; -3,0), trompa hacia +z. Se corrigió el
parabrisas del auto de juguete: ahora se inclina hacia atrás (antes estaba al revés). Papelito: calco crema con borde verde,
textura en 5 etapas de desteñido (papelT[0..4]). La grúa: cabina crema, plancha navy de 2,06 m con barandas, baliza que gira,
entra de culata hasta z -4,6 y la plancha se inclina 0,16 rad; el auto (copia, papelito ya en blanco) en la cola; humo
determinista de 14 bocanadas. Interior del auto en x = 40: tablero, cuentakilómetros canvas (91.000 → 95.000 → 108.000 →
125.000 rojo; 94.100; 95.300 verde), volante, parabrisas casi transparente con el papelito de adentro, ticket de
estacionamiento (septiembre), calle low-poly; luz propia (ponerLuces) con el sol que cambia por mes.

## Duración y planos (s)
**50,37 s.** Parte 1 0-22,08 · cartel 22,08-24,45 · parte 2 + cierre 24,45-50,37 = 25,9 s (51 %) · cierre C 47,32-50,37
(SERVICE desde 47,68, línea chica desde 48,47).
P1 0 (TALLERES MECÁNICOS + "Marzo, 18:00." desde el cuadro 0; Óscar termina de pegar el papelito, inserto del papelito con
guía; Walter se da vuelta y se va, Óscar saluda con el trapo) · P2 4,55 (montaje desde el asiento: Mayo/Julio/Septiembre/
Noviembre, el papelito se destiñe, cuentakilómetros) · P3 6,85 (Martes 9:00, elevador vacío, rótulos "Martes: 0 turnos" y "38
· $ 247.000") · P4 10,92 (Noviembre, la grúa de culata con humo; Walter entra por la izquierda rascándose) · P4b 14,62
(inserto: el papelito en blanco, la mano de Óscar lo despega; "Último service: 85.000 km") · P4c 15,42 (125.000 km) · P5 15,97
(primer plano seco: "Cuatro veces.") · P6 19,55 (Walter señala el parabrisas; Maxi llega con el rollo por detrás de Óscar) ·
cartel · Q1 24,45 (= P1 sin papelito, Óscar con la tablet) · Q1i 26,88 (la ficha) · Q2 28,52 (Agosto, en el auto: el WhatsApp,
Reservar → Turno reservado ✓) · Q3 31,44 (panel "Les toca este mes · 41", 28 → 33) · Q3g 32,94 (= P3 con el elevador ocupado,
"¿hoy no viene nadie?", la cámara gira al portón: tres autos en la vereda, "Martes: 4 de 4 turnos ✓") · Q3h 35,75 (Óscar: "Ya
vinieron. Tenían el aviso.") · Q4 37,84 (Jueves 9:00, entra manejando, baja con la llave en alto) · Q4i 40,53 (95.300 km
verde) · Q4b 41,05 ("Una vez. Así me gusta." en el mismo lugar que "Cuatro veces.") · Q5 43,0 ("¿No me ponés el papelito?",
mismo lugar que "Ponele otro papelito") · Q5i 44,66 (Service hecho ✓ · Próximo 105.000 km · "El papelito ahora te escribe.")
· Q5b 46,6 (Maxi tira el rollo al cajón) · C 47,32 (Óscar a cámara en la columna, el auto de Walter arriba en el elevador).

## Mezcla
Como importadora-dolar (TECHO -38 antes del bus +6, CAMA +9, HUECO_K 0,6). `MEDIR=1 node gen.mjs`: mediana voz-resto 23,8 LU,
mínimo +13,5 LU en tramos con voz; huecos sin voz máx -31,1 LUFS; -14,1 LUFS, pico -3,3 dBFS. SFX: cinta del papelito, llaves,
trapo, pasos, puerta y arranque (off), tic + clic por mes, auto que pasa en el montaje, sorbo de mate, glitch en los 38, bip-bip
de marcha atrás + diésel + siseo del humo, la plancha (llave neumática lenta), cinta al despegar, tic + glitch en 125.000, acento
grave en "Cuatro veces.", stinger + narrador, toques/dings de la ficha y del turno, notificaciones, tics del panel, auto que
entra, puerta, ding en 95.300, cajón, pops de burbujas. Nuevos BigSoundBank en fuentes.md (marcha atrás, camión, siseo).

## Pasadas (prev + snapshots)
Pasada 0 (prev.mjs): P1 con Óscar de espaldas → personajes "de teatro" (función cheat: hacia el otro, corridos hacia la
cámara) y cámara desde adelante a la izquierda; P2 el cuentakilómetros tapado por el marco (z-fighting) y el volante → marco
atrás, volante más abajo, techo claro; P4 grúa chica y Walter fuera de cuadro → portón más ancho, cámara central, Walter entra
por la izquierda; el auto quedaba en el portón → la grúa entra más y el auto va en la cola de la plancha; P4b la cámara quedaba
dentro de Walter / el parabrisas al revés → inserto de frente al papelito con una mano de Óscar que lo despega; P5 cara baja →
cámara a la altura de la cara; papelito de P1 cortado ("95.000 KM" se salía) → texto ajustado; la tablet del banco mostraba el
panel en la parte 1 → solo parte 2; humo en columna → bocanadas desparejas.
Pasada 1 (renders/snap/pasa1, cada 0,5 s): Q3g el pan al portón dejaba a Óscar afuera mientras hablaba → plano nuevo Q3h para
su respuesta; Q4/Q4b Óscar de espaldas y de perfil → cámaras nuevas; P6 Maxi tapaba la cara de Óscar → llega por detrás a la
derecha; panel con filas vacías al primer cuadro → filas desde el principio; P4c/Q4i el display cortado y tapado por el tablero
→ display adelante del tablero y cámara más lejos; burbuja de o1 partida mal ("Volvé a los" suelto) → "Listo, Walter." /
"Volvé a los diez mil kilómetros."; guía de "Martes: 0 turnos" cruzaba la burbuja de Maxi → al tope del elevador.
Pasada 2 (pasa2, los dos cuadros alrededor de cada corte) y 3 (pasa3): corregidos odómetro, Q4b de 3/4, Q2 el celular más
chico y más abajo (el encabezado ya no queda debajo de la burbuja). `check --json`: 0 errores.

## Flojo / para los revisores
- 50,4 s (el plan decía ~44): las tomas suman ~30 s de voz aun con atempo. Si hay que recortar: P2 (2,3 s), la cola de P6,
  Q3h, Q5b o el inserto Q4i.
- Q2: el rótulo de abajo roza el botón "Elegir otro día" del celular.
- P4: el humo es un racimo gris arriba del auto que tapa parte del cartel MECÁNICA ÓSCAR; Walter de 3/4 de espaldas al llegar.
- P6/Q5: Walter señala en diagonal; el parabrisas casi no entra en Q5 (señala fuera de cuadro a la izquierda).
- Q5b: Maxi de espaldas en primer plano; el gesto de tirar el rollo al cajón es chico.
- C: la mano izquierda de Óscar no llega a apoyarse en la columna (queda abajo).
- P1: en el cuadro 0 Óscar está de perfil pegando el papelito (se da vuelta a los 0,5-0,95 s) y el inserto del papelito tapa
  su cintura; Walter un poco de espaldas.
- No se miró a 30 fps cuadro por cuadro ni se renderizó el mp4; las voces no se escucharon.

## Ronda 1 de corrección (revision-guion-r1.md + pendientes propios) · sin render
**46,0 s.** Parte 1 0-20,21 · cartel 20,21-22,58 · parte 2 + cierre 22,58-46,0 = 23,42 s (51 %) · cierre C 42,89-46,0 (SERVICE
desde 43,25, línea chica desde 44,17). `check --json`: 0 errores.
Planos (s): P1 0 · P2 4,07 · P3 6,37 · P4 10,01 · P4b 13,03 · P4c 13,65 · P5 14,7 · P6 18,04 · cartel 20,21 · Q1 22,58 · Q1i
24,92 · Q2 26,51 · Q3 28,45 · Q3m 29,95 · Q3g 31,78 · Q3h 32,73 · Q4 34,73 · Q4b 37,39 · Q5 39,29 · Q5i 40,9 · C 42,89.
- **A1 "Volvé":** 8 tomas nuevas (01-oscar d-g con el tono vol-VÉ; 01b-oscar d-g "Volvé vos…"). El STT no sirve: escribe
  "volví"/"vuelve" en todas y "volvemos" en las de "volvé vos" (descartadas). Se verificó por formantes (LPC, /tmp no; el
  script está descripto acá): en 01-oscar-e la vocal de "volv_" tiene F1 ≈ 350-380 Hz y F2 ≈ 1.720-1.800 Hz, igual que la
  /e/ de "diez" en la misma toma (F1 340-390, F2 1.880-1.950) y lejos de la /i/ de "mil" (F1 ≈ 290, F2 ≈ 2.200): dice
  "volvé". o1 = 01-oscar-e (pausa 0,18, atempo 1,2), en P1 y Q1. Las tomas viejas a-c en partes/tomas-r1/. Igual conviene
  escucharla.
- **Duración:** sin la voz w4 (Q2 solo con el chat, 1,9 s); sin Q5b (Maxi y el cajón: el código queda pero no hay plano);
  sin el inserto Q4i; cola de P6 0,32 s (el rollo de Maxi entra durante "así no me olvido"); P3 más justo (rótulo de los 38
  1,0 s); Walter dice "Óscar, no entiendo…" mientras entra caminando; atempo de las voces subido (1,08-1,2). Intactos: el
  montaje P2 (2,3 s), la pareja "¿hoy no viene nadie?" / "Ya vinieron", la pausa de 0,46 s antes de "Cuatro veces.".
- **M2:** chip de Q2 "Julio." (cuentakilómetros 94.800); "Setiembre."; sin el segundo "Noviembre." (s06 fuera).
- **M3:** P4c dura 1,05 s y "Último service: 85.000 km" sigue arriba con el 125.000 abajo (juntos 1,05 s, más 0,6 s antes).
- **M4:** panel "Les toca este mes · 12", contador 8 → 10 de 12.
- **B6/Q3:** Q3m nuevo: Maxi de cerca, desde arriba, mirando el mate, pregunta sin que se vea el elevador (el auto del
  elevador no se dibuja en Q3m); recién en Q3g la cámara revela el elevador ocupado y los autos de la vereda; Q3h Óscar.
- **B8:** descripcion.txt: "vuelve cuarenta mil kilómetros después, en grúa. Y mientras, el elevador queda vacío los martes."
- **Pendientes propios:** Q2 el celular más chico y centrado, el rótulo ya no lo toca; humo de P4 más bajo (no tapa el
  cartel); Walter llega a P4 más de frente (cheat 0,88); Q5 cámara nueva con el parabrisas a la vista; cierre: Óscar más cerca
  de la columna (la mano apoyada); cuadro 0: Óscar ya de 3/4 con la cara a la vista y el inserto del papelito abajo a la
  derecha (no lo tapa).
- Bug encontrado y corregido en la pasada: Q4 quedaba en blanco (la clave de cámara usaba T.q4i, que ya no existe).
- Mezcla (`MEDIR=1 node gen.mjs`): mediana voz-resto 23,7 LU, mínimo +8,4 LU con voz; huecos sin voz máx -32,3 LUFS; -14,1
  LUFS, pico -3,3 dBFS.
- Portada: fondo limpio regenerado (Walter ya llegó y se rasca la cabeza, Óscar, la grúa con humo), `t` 12,83.
Snapshots: renders/snap/r1a, r1b (cada 0,5 s), r1c (alrededor de cada corte), r1d (cada 0,5 s desde 0,25).
Quedan: Q5 Óscar fuera de cuadro mientras Walter señala; Q2 primer cuadro con el celular chico subiendo delante del
tablero (es el push-in); no se escuchó ninguna voz.

## Ronda 2 (revision-arte-r1.md + revision-sonido-r1.md)
Duración 46,07 s · P1 0-20,27 · cartel 20,27-22,64 · parte 2 22,64-42,95 · cierre 42,95-46,07 (3,12 s) · parte 2 + cierre 51 %.
Planos: P2 3,99 · P3 6,29 · P4 9,93 · P4w 10,63 · P4b 13,15 · P4c 13,77 · P5 14,82 · P6 18,16 · Q1 22,64 · Q1i 24,98 · Q2 26,57 ·
Q3 28,51 · Q3m 30,01 · Q3g 31,84 · Q3h 32,79 · Q4 34,79 (baja 35,64) · Q4b 37,45 · Q5 39,35 · Q5i 40,96 · C 42,95.
Arte, altos:
- A1 Q4 (pop de Walter): entra manejando (se lo ve por el parabrisas), frena, abre la puerta, baja y camina con la llave.
- A2 Q5 (mano suelta): Óscar de espaldas en primer plano a la izquierda, el brazo entero señala; Walter entero a la derecha.
- A3 P4b: cámara más abierta y desde abajo: techo navy, parante, vidrio con el volante detrás, papelito (~30 % del ancho), capó y
  limpiaparabrisas; la mano de Óscar con su brazo desde el primer cuadro; rótulo "Último service" desde el corte.
- A4 P4: grúa de auxilio con cabina (faros, parabrisas, baliza, puerta, estribo), plancha y el auto de Walter arriba; plano 3/4
  desde la calle, la grúa llena el ancho, el cartel entero arriba, humo bajo. Walter va adentro de la cabina (no se ve) y en
  P4w ya bajó al lado de la puerta abierta (corte en la acción, sin pop) y queda de frente, grande.
Arte, medios: Walter en P4 ya no aparece de golpe (5); Q3g termina sobre los autos de la vereda, que llenan el ancho (6);
cuadro 0 con el papelito visible y Walter de 3/4 (7, r1); P4c sin papelito y con la pared del taller detrás (8); P6 plano más
cerrado y bajo, los dos junto al auto, brazo de Walter afuera, sin piso vacío (9); Q4 llave arriba de la cabeza (10); Maxi con
el mate en la falda mientras habla (11); Q5i celular corrido, la burbuja no tapa el encabezado (12); Q1i ficha vertical a
~60 % del alto, textos ≥ 36 px, botón con el ✓ adentro, sin las manos (eran conos) (13); Q2 el cuentakilómetros se apaga
detrás del celular, sin "00" (14); guía de P3 anclada al elevador, sin puntito ni cruce de burbujas, columnas crema (15);
cartel "MECÁNICA ÓSCAR" oculto en los planos donde quedaba cortado (P1, Q1, P6, Q3g, Q5) (16). Los carteles se sacaron del
`fusionar(SET)` para poder ocultarlos por plano.
Bajos: letras del cartel nacen con escala 0,35 (17); Óscar con `mejillasBajas` (el rubor ya no pasa por el ojo) y P5 casi de
frente (18; el pelo texturado queda); Q3 panel con aire (19); cierre: cámara más baja, la cara arriba de la tarjeta (20).
Sonido: HUECO_K 0,42 (cama en huecos); montaje P2 con música a -44; diésel en ralentí hasta "Volviste" + calle de fondo en la
pausa; puerta y motor de P2 corridos a 4,0+ (en off); tics del panel solo en 8→9→10; puerta de la cabina, ropa y pasos de
Walter en P4w; puerta de Q4 -49, llaves -46/-48, auto-entra más corto.
Mezcla: -14,1 LUFS, pico -3,3 dBFS, mediana voz-resto 23,7 LU, huecos sin voz máx -31,0. El único tramo < 6 LU (35,5 s, +2,8)
es el arranque de "¡Volví…" (la ventana tiene 60 ms de voz); con la voz hablando (36,1 s) es -11,8 contra -30,9 (+19).
Portada: fondo limpio nuevo (Walter de frente rascándose la cabeza en la vereda, la grúa con su auto y el cartel), `t` 10,95.
Snapshots: renders/snap/r2c y r2d (cada 0,5 s con dos desfases + ±1 cuadro en cada corte). `check --json`: 0 errores.

## Ronda 3 (revision-arte-r2.md + revision-sonido-r2.md)
Duración 46,0 s · P1 0-20,61 · cartel 20,61-22,98 · parte 2 22,98-43,01 · cierre 43,01-46,0 (2,99 s) · parte 2 + cierre 50 %.
Planos: P4 9,93 · P4w 10,63 · P4b 13,15 · P4c 13,77 · P5 14,72 · P6 18,56 · Q1 22,98 · Q1i 25,32 · Q2 26,91 · Q3 28,45 · Q3m 29,8 ·
Q3g 31,63 · Q3h 32,58 · Q4 34,58 · Q4b 37,24 · Q5 39,14 · Q5i 40,75 · C 43,01.
- ALTA (cabeza por el techo en Q4): Q4 arranca con el auto ya frenado, la puerta abierta y Walter recién bajado; camina, cierra la
  puerta (sonido en +0,42) y levanta la llave. No se ve a nadie dentro de un auto en ningún plano (en P4 Walter va en la cabina
  de la grúa, con escala 0,8 y oculto por la carrocería; baja en el corte a P4w).
- P6: Maxi aparece fuera de cuadro y entra caminando 0,95 s por detrás de Walter (entre él y el auto), sin taparle la cara.
- P4: grúa de 3/4 desde adelante y arriba: trompa con chapa "AUXILIO", parabrisas, faros, baliza más grande, la plancha con el auto
  de Walter atrás; recula de culata durante el plano (frena en +0,62); humo en bocanadas que suben más; casi sin asfalto vacío.
- Q3g: los tres autos en fila, de trompa al portón, enteros; el paneo termina de frente a ellos, cámara baja; rótulo abajo; Maxi
  sale de cuadro sin astilla. P4b: la guía sigue al papelito despegado hasta el corte. Q2: chat escrito desde el primer cuadro y el
  display se apaga a +0,15 (sin "00"). P4c: cámara más cerrada, el 125.000 al centro. P1: inserto "PRÓXIMO SERVICE" 460x310 (~36 px)
  y Walter casi de frente (cheat 0,95). Q4: cámara más abierta, Walter entero.
- Sonido/ritmo: P5 sostiene 0,5 s la cara seca después de "Cuatro veces." (P6 +0,5); compensado con Q2 (-0,15 s en el toque),
  Q3 (-0,25 s y -0,15 s), P4c (-0,1 s), la cola de P6 y la cola final. 0,42 s entre "El papelito ahora te escribe." y "Comentá"
  (antes 0,15). Llaves de Q4b fuera. Toque/ding de Q2 y auto-pasa más bajos para el techo.
- Bajos: el texto del cartel sale 0,14 s antes (antes del iris); la burbuja de "Cuatro veces." crece desde 0,94 (sin el paso
  chico); P6 el brazo de Walter hacia el parabrisas; el trapo del bolsillo de Óscar fuera en la parte 2 (era lo "blanco y rojo");
  encabezado de Q5i 74/50 px en el lienzo (≥ 36 en pantalla). Pelo de Óscar sin cambios.
- Mezcla: -14,1 LUFS, pico -3,3 dBFS, mediana voz-resto 23,6 LU, mínimo +14,1 (el +2,8 de 35,5 s desapareció), huecos máx -31,0.
- Portada: fondo limpio regenerado (misma composición, la grúa con la baliza nueva). guion.txt sin cambios (la voz es la misma).
- Snapshots: renders/snap/r3c y r3d (cada 0,5 s con dos desfases + cortes). `check --json`: 0 errores.
