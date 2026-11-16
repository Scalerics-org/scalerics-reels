# taller-presupuestos · notas del constructor (16-11)

Proyecto como estetica-turnos: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (se editó directo; ya no hay piezas aparte).
`assets/personajes.js` = el de estetica-turnos + `ELENCO.oscar`, `ELENCO.maxi`, `ELENCO.sergio` (solo parámetros y
peinados existentes: texturado, jopo, corto). Fabián, Pablo, Silvia y Andrés son variantes de DEFECTO solo como avatar
(tres.js). Sofi = `ELENCO.sofi` con el override de estetica-turnos (buzo navy claro, franja crema), render target al
celular parado.

**Duración: 38,57 s** (1157/30). Parte 1 0-16,29 · cartel 16,29-18,92 · **parte 2 18,92-38,57 = 19,65 s, 50,9 %**.
"Comentá PRESUPUESTO" desde 35,46 · línea chica desde 36,52. Mezcla: voz ≥ +10 LU sobre el resto en todos los tramos de
0,5 s, -14,0 LUFS, pico -6,0 dBFS. `check --json`: ok, 0 errores (lint/runtime/layout/motion/contrast/craft/audio).

## Comandos (desde reels/taller-presupuestos)
```
bash partes/reintentar.sh        # tomas que faltan (LINEAS=, TOMAS=); de a una por la cuota de Gemini
bash partes/medir-tomas.sh       # recorta silencios a partes/rec/ y mide duración + "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh          # arma assets/voice/ desde las tomas elegidas (pausas internas, atempo, filtros)
node gen.mjs                     # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana ni burbujas
python3 medir.py                 # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre       # snapshots de hyperframes con el candado (renders/snap/<nombre>/hoja.png)
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D, rápido
```
`prev.mjs` (nuevo) abre Chrome con playwright-core y llama `__tresRender(t)`; con `FULL=1` guarda a 1080x1920 (así salió
el fondo limpio de la portada). `window.__cam = [px,py,pz,mx,my,mz,fov]` fija la cámara.

## Voces (partes/procesar.sh)
s1 01-sergio-a (Zubenelgenubi; se reusa igual en Q1) · m1 02-maxi-a (Puck; pausa después de "Jefe," a 0,1 s; se reusa
igual en Q3) · o1 03-oscar-c (Charon, atempo 1,08) · s2 04-sergio-a (pausas internas acortadas, atempo 1,14,
highpass 150 -2 dB "calle") · o2 05-oscar-a (pausa entre "Lo pensó." y "Y me avisó." a 0,42 s) · narrador 06-narrador-b
(Rasalgethi, toma NUEVA "Un sistema de presupuestos más tarde.", atempo 1,1 → 2,53 s, menos de 2,6: no hizo falta
ya-lo-cargo) · o3 07-oscar-b · s3 08-sergio-b · o4 09-oscar-e (la única de 7 tomas con "Ya les") · s4 10-sergio-b ·
o5 11-oscar-c · f1 12-sofi-b (Achernar, atempo 1,12 + lowpass 7 kHz, 3,31 s). "oyó:" igual al texto en todas, salvo
que el STT no marca tildes/signos ("comenta", "a eso no lo llamamos" en m1) y en s2 se come "¡Óscar!" (se oye).

## Mundo
Pared del fondo z = -5 (bloques navy claro hasta 2,2 m, crema arriba) con el portón abierto x -1,95..1,55 (calle,
vereda crema, árbol, fachada de enfrente); cartel "MECÁNICA ÓSCAR" arriba del portón. Elevador en LX -0,2, LZ -2,6
(columnas de 3,3 m en x -1,5 y 1,1; el auto levantado con los tacos a 1,8 m), botonera en pedestal adelante de la
columna izquierda. Banco a lo largo de z en x -1,82 (z 0,9..3,3) con el pincho en (-1,74, 1,18), la tablet (parte 2) en
z 1,66 y el celular de Sofi en z 2,24. Panel de herramientas a la izquierda del portón con la silueta del pincho. La
pila de cubiertas aparece el sábado (P3-P7) en (0,62, 2,05). La vereda de Sergio (Q2b) en x = 30. Insertos pegados a la
cámara: el celular de Óscar arriba con el pincho 3D abajo (P2: los papeles vuelan del celular al pincho), el celular
de Sergio (Q1b/Q2/Q2c), el tablero (Q3).

Planos: P1 cuadro 0 · P1b el chac desde atrás del banco · P2 la semana · P3 sábado · P4 el portón (Óscar y Maxi en
contraluz, pasa el sedán) · P5 la pausa desde atrás del pincho · P6 primer plano de Óscar · P7 remate del remate (la
mano de Maxi apoya el segundo pincho, Óscar con el celular en el portón) · Q1 = P1 · Q1t por encima del hombro, Enviar
· Q1b / Q2 / Q2c insertos · Q2b Sergio en su vereda · Q3 tablero · Q3b el banco desde atrás · Q4 = P1, entra el auto ·
Q4b la llave · Q4c sube el elevador, Maxi cuelga el pincho en el panel · Q5 tablet → Sofi.

## Pasadas
- Armado (prev.mjs, renders/prev/a-h): personajes fuera de cuadro en el 9:16 (P3, P4, P5) → pila de cubiertas
  movida, Óscar y Maxi al portón en P4-P7; el auto se leía apoyado → columnas de 3,3 m y auto a 1,8; el chac pasaba
  fuera de cuadro → P1b; la mano de cartón del celular de Óscar → sin mano; tablero ilegible (≈24 px) → tablet a
  1040 px de ancho, textos 40-52; Q3b de espaldas / tapado por la tablet → cámara desde atrás del banco; Q5 cortado.
- Pasada 1 (hyperframes snapshot cada 0,5 s desde 0, renders/snap/p1): el presupuesto rótulo tapaba el auto → abajo a
  la izquierda; LUNES pisaba el título; el papel que vuela pasaba pegado a la cámara (un "22.0" gigante) → sale a 0,9 m
  y más chico; P5 con Óscar detrás de la columna → cámara nueva; P7 con el brazo de Maxi gigante → más abierto; la mano
  del inserto tapaba "Turno agendado" → sin pulgar; burbujas de Sergio/Óscar encimadas en Q1.
- Pasada 2 (cada 0,5 s desde 0,25, renders/snap/p2): la tarjeta de Andrés se metía en los totales (Q3) → tarjetas
  más bajas; la burbuja de Maxi quedaba debajo de la de Óscar (P3) → sale en o1; P5 con el pincho cortado → cámara más
  alta; la línea "a la vuelta" apuntaba a Maxi → al elevador vacío; celular de Sofi negro en Q3b → oculto hasta Q5.
  Zonas tocadas vistas otra vez (renders/snap/z).
- Mezcla: voz −5 LU en 26,5 s (dings del tablero sobre "Jefe…") y 30,5 s (motor que entra) → cartas antes, Maxi en
  q3+0,95, motor más bajo y más tarde → mínimo +10 LU.

## Portada
`portada.json`: t 12,75, fondo LIMPIO P5 con cámara propia (Óscar y Maxi dados vuelta en el portón, el pincho
adelante), subido 280 px (portada-src/fondo-portada-12.75.png). chica "Embrague, $ 38.000." (con espacio duro),
grande "Lo pienso…", sello TALLERES. `herramientas/portada.mjs` exige el mp4 aunque haya fondo_limpio: se corrió con un
mp4 provisorio (borrado); cuando esté el render, se puede volver a correr igual.

## Pendiente / para los revisores
- El "chac" de P1b: la copia va pegada al puño de Óscar (no hay dedos que la pellizquen).
- P7: de Maxi se ve solo el brazo (plan: "la mano de Maxi").
- En la parte 2 Sergio no se ve bajar del auto (corte de Q4 a Q4b con el sonido de la puerta).
- En Q3b Óscar queda un poco cortado a la derecha; en P6 asoma una punta del árbol arriba a la izquierda.
- La tarjeta que se mueve en el tablero pasa un instante por encima de la de Sergio (0,28 s).
- 38,57 s (objetivo ≤ 38): si hay que recortar, la pausa de P5 (0,95 s) o Q2 (0,8 s antes de Sergio).
- Revisión de arte sobre el MP4 renderizado: no hecha (no se renderizó, lo hace el coordinador).

## Ronda 1 (16-11, sobre qa-ronda-r1.md)
**Duración 38,0 s** (1140/30). Parte 1 0-15,66 · cartel 15,66-18,29 · **parte 2 18,29-38,0 = 19,71 s, 51,9 %**. Mezcla: voz
≥ +6,1 LU en todos los tramos de 0,5 s (los tramos justos son colas de voz contra el toque de "Aceptar" y la puerta del auto),
-14,0 LUFS, pico -5,9 dBFS. La música baja 0,5 (antes 0,35) debajo de cada voz y la cola del duck es 0,95 s.
- **Arte 1 / Guion 1 (ALTA):** P4 se parte: P4 general (bocina, el auto entra) y **P4b** desde la vereda del taller
  acompañando a Sergio asomado por la ventanilla, grande, saludando, con la cola de la burbuja a su boca. Sin piernas
  dentro del auto (ya no atraviesan el piso); más inclinado hacia la ventanilla.
- **Arte 2 (ALTA):** sin cartel de pared: detrás del travesaño del elevador se le perdían las tildes y movido a un costado
  quedaba cortado en P1b y Q3b. "Mecánica Óscar" queda escrito, siempre con tildes, en los presupuestos de papel, el chat,
  la tablet y el celular de Sergio. Tampoco queda el cartel vacío detrás del travesaño (arte 4).
- **Guion 2 (portada):** VER=portada en tres.js: Óscar y Maxi de frente detrás del banco con el pincho lleno adelante;
  grande "¡Me llamaron!", chica "Lo hizo a la vuelta.", sello TALLERES; sin botonera ni cartel.
- Guion 3 / arte 17: P7 plano corto del banco, Maxi detrás del banco apoya el segundo pincho al lado del lleno.
- Guion 4: Q5 con la tablet entera 0,62 s ("Seguimientos a mano: 0" se lee) antes del viaje a Sofi.
- Guion 5: chip "VIERNES" en el tablero (Q3). Guion 8: descripcion.txt con el sujeto ("Sergio pasa por la puerta").
- Arte 3: P2 con el pincho más abajo (el clavo ya no entra en el celular). Arte 9: el chat arranca con MARTES en P2.
- Arte 5: Óscar y Maxi más a la derecha en el portón (Óscar no queda detrás de la columna); rótulo "a la vuelta" a la
  izquierda con la guía al elevador vacío.
- Arte 6: en Q4 Sergio se baja y camina hasta Óscar (0,5 s, pasos) antes del plano de la llave.
- Arte 7 / 8: el presupuesto y el seguimiento llegan al instante (sin pantallas vacías).
- Arte 10: la burbuja de Sergio en Q1 corta seco (sin fantasma). Arte 11: Q1t con la tablet entera.
- Arte 12: la rueda suelta acostada en el piso al costado de la columna derecha (ya no parece una mochila ni flota).
- Arte 13: sedán con techo grueso, parabrisas y luneta más inclinados, capó más bajo.
- Arte 15: sin parpadeo de Sergio en "Justo lo estaba pensando." Arte 16: Óscar levanta la cabeza al hablar en Q3b
  (se le ve la boca) y Maxi ya terminó (hay corte y pausa antes).
- Arte 18: "Visto 10:12" y "enviados esta semana" a 42 px. Arte 19: el celular de Sergio sin la mano de cartón.
- Arte 20: Sofi sin los aros crema en el torso (sin franja; cuello crema), copas verdes de auriculares grandes por fuera
  del pelo y la cámara de la videollamada más abierta (se ven la vincha y las copas).
- Arte 14 / 21 / sonido 10: resueltos con P4b.
- Sonido 1: corte a Q3b y 0,42 s antes de "Ya les escribió el sistema." · 2: 0,42 s entre "Lo pensé." y "Y me
  avisaste." · 3: bocina al techo (-31) · 4: tac del segundo pincho -31 y stinger -33 · 5: auto que entra -33 (puerta
  -37 para no pisar a Sergio) · 6: el primer chac/notificación más fuertes · 7: llaves -33 · 8: "más tarde…" entra en "más"
  (1,42 s) · STT: m1 nueva toma (02-maxi-g), el STT oye "jefe a esos no los llamamos".
- Recortes para 38 s: semana 0,62 s por día, pausa P5 0,8, Q1b 0,88, Q2 0,55 antes de Sergio, tablero 0,8 antes de
  Maxi, Q4c 0,9, Q5 0,62.
- No hecho: arte 18 "$ 22.0" con la huella encima (es la huella de grasa del papel, se deja); sonido 9 (el último plano
  dura lo que dura la línea de Sofi).
- OJO: para correr `portada.mjs` (pide el mp4) se reemplazó un momento `renders/taller-presupuestos-final.mp4`; se
  volvió a generar desde `renders/taller-presupuestos.mp4` con el ffmpeg del paso 10 (igual queda viejo: hay que
  renderizar de nuevo).
- Pasadas: renders/snap/r1 (cada 0,5 s desde 0) y renders/snap/r1b (desde 0,25) después de corregir; en r1 faltaba la
  burbuja de Sergio en P4b, la guía de "a la vuelta" se iba de cuadro, P6 descentrado, Q1t cortado, el iris abría sobre el
  texto del cartel (el texto sale ahora 0,4 s antes) → corregidos y vistos en r1b. `check --json` 0 errores.
