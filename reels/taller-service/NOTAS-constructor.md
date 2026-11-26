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
