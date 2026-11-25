# gym-cupo · notas del constructor (25-11)

Proyecto copiado de `reels/pilates-cuota` (gen.mjs, medir.py, snap.sh, prev.mjs, partes/*.sh, personajes.js) con la escena
3D y gen.mjs reescritos. Todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena entera está en `assets/tres.js`. Se armó por partes en `partes/tmp/t/*.js`
(`partes/tmp/t/armar.sh` las concatena en assets/tres.js); se puede seguir editando assets/tres.js directo, pero entonces
NO volver a correr armar.sh (pisa los cambios).

**Duración: 42,63 s.** Parte 1 0-18,80 · cartel 18,80-21,46 · parte 2 + cierre 21,46-42,63 = 21,17 s (49,7 %).
Tarjeta "Comentá CUPO" desde 39,22 · línea chica desde 41,78 (0,85 s). `check --json`: ok, 0 errores (warnings de siempre:
canvas anidado, mensajes del driver WebGL, craft "dead_stretch" que no ve la capa 3D).
Mezcla (MEDIR=1 node gen.mjs; python3 medir.py): voz ≥ +9,3 LU sobre el resto en todos los tramos de 0,5 s con voz;
-14,0 LUFS, pico -5,2 dBFS; `python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav`: máximo sin voz
-31,2 LUFS momentáneo (el paso 10 con `paso10.sh` toma el audio de assets/audio/mezcla.wav).

## Comandos (desde reels/gym-cupo)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv; LINEAS=otro.tsv para un subconjunto)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1|px,py,pz,mx,my,mz,fov;t2" renders/prev/x   # solo la capa 3D
bash paso10.sh                            # recodificación final (después del render)
```
OJO: después de `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs` volver a correr `SINAUDIO=1 node gen.mjs`.

## Voces (partes/procesar.sh; "oyó:" en partes/rec/medidas.tsv)
Mauro = Sadaltager, Majo = Zephyr, Graciela = Gacrux, narrador = Rasalgethi.
m1 01-mauro-e (2,14 s, "veintidós yo voy hoy explota") · j1 02-majo-b + filtro de celular (1,86) · m2 03-mauro-f (1,35;
"llena Majo perdona") · m3 04-mauro-a + micrófono (2,05; trae una pausa de 0,6 s antes de "no pedalean"; el STT oye
"pedalea") · narrador 05-narrador-b atempo 1,07 (2,54) · j2 06-majo-c (1,76) · m4 07-mauro-a atempo 1,08 + micrófono
(2,42) · g1 08-graciela-f atempo 1,06 (2,32; la única toma donde el STT oye "toalla" y "cuelgo") · m5 09-mauro-f +
micrófono (1,31) · m6 10-mauro-c (3,11). Micrófono de vincha = highpass 120 + aecho 0.8:0.6:40:0.15.
Las tomas salieron más largas que el plan (3,3 s más de voz): se recortó el armado en P2 (cámara rápida), P3, P5, Q1-Q4.

## Mundo
- Sala de spinning (x -3,4…3,4, z -5,2 tarima … 3,2 fondo, alto 3,2): pared de adelante y fondo navy #0b1220 con la
  franja diagonal crema, tira verde emisiva arriba, piso grafito con juntas navy, techo navy3 con dos paneles crema;
  cartel ESTUDIO MAURO (pared de adelante), reloj de 7 segmentos (pared del fondo, canvas: 18:20 → 18:52…19:00 → 19:01 →
  19:04), puerta de vidrio esmerilado en la pared -x (se abre en P2), ventilador de pie (aspas giran), parlante.
- 14 bicis (`crearBici`): base en T con tapas crema, lambda navy3, volante gris con protector, bielas y pedales que giran,
  manubrio en cuernos con perilla verde, plaquita con el número (de los dos lados). Filas 4 · 5 · 5 (la 4 en la primera,
  la 7 en el medio de la segunda); la del profe en la tarima, con soporte de celular. Mismo orden en el mapa de la app.
- personajes.js: `ELENCO.mauro`, `ELENCO.majo`, `ELENCO.sole` y la pose `pies: { I: [z, y], D: [z, y] }` (IK de la pierna
  a los pedales; la suela queda casi horizontal). Graciela = ELENCO.clienta con remera crema, calza navy y vincha verde
  (aro en tres.js). 11 alumnos de relleno (DEFECTO, sin dedos).
- Living de Majo en x = 40 (sofá navy2, almohadón verde apagado, lámpara, mochila, cuadro).
- Insertos pegados a la cámara (fondos planos: sala, living, oficina, recepción con mostrador y botellas): P1b chat (audio
  de Majo, "Llena"), P3i (19:01, Majo), P5 (pantalla de bloqueo 19:04 con Rodri, vibra), Q1/Q1c mapa de Majo, Q1s Sole
  lista de espera, Q2 recordatorio a Lucía, Q2t tablet de la recepción, Q2s aviso a Sole, Q4 panel de noviembre.

## Planos (s)
P1 0 (Mauro desde la sala, con la "lupa" del grupo pegada a la cámara y la cola a su celular) · P1b 3,04 · P2 7,34 (gran
plano desde la tarima, el reloj corre, entran los nueve en cámara rápida y saltan a la bici; percheros 9,53-10,53) · P3
10,98 ("5 bicis vacías") · P3i 11,83 · P4 13,08 (pausa, "Los «yo voy» no pedalean." 13,80) · P5 16,15 (inserto del
celular, 22 → 23) · P5c 17,10 (Mauro lo da vuelta) · P5b 17,95 (arrancan a pedalear) · cartel 18,80 · Q1 21,46 · Q1b
22,21 · Q1c 24,19 · Q1s 25,57 · Q2 26,49 · Q2t 27,64 · Q2s 28,49 · Q3 29,69 (= P2, 14 de 14) · Q3b 32,41 · Q3c 34,91 (= P4)
· Q3d 36,33 (toalla al cuello) · Q4 37,08 · C 39,08.

## Pasadas (prev.mjs y snapshots; hojas en renders/snap/)
- Cuadro 0: sobre el hombro de Mauro la cabeza tapaba todo (y el celular quedaba de espaldas: se dio vuelta, pantalla
  hacia él) → plano desde la sala, Mauro de frente con ESTUDIO MAURO detrás, el grupo en una "lupa" grande (texto ≥ 40
  px) con cola a su celular; burbuja a la izquierda; contador y chip arriba. A las 18:20 la sala vacía (los alumnos no
  aparecían hasta P2).
- Gran plano: tres pruebas de cámara (las cabezas de juguete llenaban todo): cámara en la tarima a 3,1 m, fov 74, Graciela
  y las bicis 1-4, 6, 7, 12-14 a la vista; el reloj movido para que no lo tape el contador.
- Insertos: el chat anclado abajo (como un chat real), mensajes anteriores para que no quede vacío; la transcripción del
  audio de Majo en burbuja con cola al audio; "A dos les dijo «llena»" y el costo arriba (tapaban mensajes).
- P4/P5c: cámaras abiertas (la cabeza llenaba el cuadro); la mano al micrófono por fuera de la cara; cara seca sin cejas
  de enojo. P5 pasó a inserto del celular (desde atrás de Mauro no se veía nada).
- Parte 2: Majo, Graciela (Q3b) y el cierre con cámaras más abiertas; en Q3b/Q3d Mauro oculto (la cámara está en la
  tarima, su brazo entraba como una mancha); toalla de Graciela blanca con franjas verdes (crema sobre crema no se veía) y
  las manos la llevan al cuello antes del panel; "Llena · 14/14" (pisaba el texto); tablet y panel con las filas enteras.
- Mezcla: SFX de Q1, Q2, P5 y Q4 bajados 2-3 dB y la música con duck leve en el panel (pasaban -31 sin voz).

## Pendiente / a mirar en la revisión
- Render final no hecho (lo hace el coordinador). Con 15 personajes en los gran planos (P2-P3, P5b, Q3) el render por
  SwiftShader va a ser más lento que pilates-cuota (~27 min); medirlo.
- Cuadro 0 no es el "sobre el hombro" del plan: Mauro de frente desde la sala con la lupa del grupo (decisión de
  encuadre); las bicis vacías se ven abajo (primer término) y en P2.
- La toalla al cuello de Mauro (parte 2) se lee como dos tiras blancas sobre el pecho; la franja verde de su remera es un
  aro grueso (se ve en P4/Q3c/C).
- Los alumnos con cara "neutra" se ven algo serios (cejas) en el gran plano de la parte 1 (están esperando).
- La entrada de los nueve es en cámara rápida (el reloj corre 18:52 → 19:00) y el salto a la bici dura 0,16 s: en ese
  instante las piernas pueden cruzar el cuadro de la bici.
- Portada: `portada.json` con t 11,2 y `portada-src/fondo-limpio-11.2.png` (VER=portada LIMPIO=1, la sala con la toalla en
  la 2 y el celular en la 7). `herramientas/portada.mjs` necesita el MP4 final en la rama: correrlo después del render.
