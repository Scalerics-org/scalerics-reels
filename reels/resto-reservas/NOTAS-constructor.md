# resto-reservas · notas del constructor (18-11)

Proyecto con la forma de dist-quien-debe / parrilla-no-vuelve: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`: el set de la
Parrilla Raúl de parrilla-no-vuelve reacomodado (mostrador del cuaderno pegado a la parrilla, la mesa 7 para 8 al medio
del salón) con la infraestructura de tarjetas pegadas a la cámara, insertos, avatares por render target y Catmull-Rom.
`assets/personajes.js` = el de parrilla-no-vuelve (Raúl, Fabián, Walter) + la familia de Walter en ELENCO
(`walterMujer` Silvia, `walterAdo` Mateo, `walterNena` Lucía, `walterNene` Tomi, `walterAbuela` Nélida). Pablo no tiene
cuerpo: voz por teléfono / nota de voz y avatar "P".

## Comandos (desde reels/resto-reservas)
```
LINEAS=partes/lineas-gen.tsv TOMAS="a b c" bash partes/reintentar.sh   # tomas (lineas-gen = lineas.tsv sin el narrador)
LINEAS=partes/lineas-11.tsv TOMAS="d e f g" bash partes/reintentar.sh  # retomas de Walter 11 ("esta vez sí")
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-r9.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/resto-reservas.mp4
bash paso10.sh                            # paso 10: loudnorm en DOS pasadas, lineal → renders/resto-reservas-final.mp4
LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 6.6 renders/prev/por   # fondo de la portada (después: SINAUDIO=1 node gen.mjs)
```

## Voces (partes/procesar.sh)
Pablo Schedar (filtro de teléfono: pasaaltos 300, pasabajos 3,4 kHz, asoftclip) · Raúl Iapetus · Fabián Achird · Walter
Umbriel · narrador Rasalgethi (reusado de abren-hoy-completo). Tomas: p1 01-c (atempo 1,06) · r1 02-a · w1 03-b (1,1) ·
r2 04-b (1,05, pausa interna de 0,36 a 0,2 s; el STT sin aire delante no oye el "No", con 0,3 s de silencio delante sí) ·
f1 05-b (1,1) · r3 06-a · f2 07-c (0,3 s) · r4 08-b · r5 09-a (resignado) · w2 11-g (retoma: las a/b/c el STT las oía
"pista bici entramos"; d-g bien) · r6 12-b · r7 13-a · r8 14-a (contento) · r9 15-a (atempo 1,13; la b terminaba
cortada). p1 y f1 son el MISMO audio en la parte 1 y en la 2 (callback). "oyó:" igual al texto en todas (sin tildes).

## Duración
45,7 s. Parte 1 0-20,68 · cartel 20,68-23,08 · parte 2 23,08-45,7 = 22,6 s (49 %). Cierre (C) desde 41,57, tarjeta
RESERVA desde la palabra, línea chica el último segundo. Más largo que los 40 del plan: 15 parlamentos reales (atempo
1,05-1,13 y huecos internos ya recortados).

## Mundo / planos
P1 cuadro 0 (Raúl con el celular en la oreja derecha, la pinza en la parrilla, anota PABLO · 8 · 22:00 con la birome
atada) · P2 inserto del celular del mostrador (Sin contestar 10 → 14) · P2b la mesa 7: el RESERVADO cae y los 8 lugares
aparecen de a uno · P3 general desde el salón: Raúl a la izquierda, Walter y la familia (6) a la derecha, la mesa 7 abajo ·
P3b contraplano de Raúl con la pinza · P3c se van (rótulo $ 9.000) · P4/P5/P5c la mesa 7 con la vela (entera, por la
mitad) y Fabián · P5b primer plano de Raúl · P6 Fabián junta los cubiertos + mensaje de Pablo · P6b Fabián ·
cartel · Q1 el celular del local a oscuras (se prende) con la nota de voz · Q1i chat del agente + plano de mesas · Q2 la
tablet (11 de 12, Pablo liberado, lista de espera) · Q2b Walter en el living · Q3 = P1 con el chat que contesta solo y
la tarjeta "Para vos, Raúl" · Q4 = P4 con la familia sentada · Q5 = P6 con la tarjeta "Confirmada" · C Raúl a cámara.

## Mezcla
Bus +6 dB → compresor → ganancia a -14 LUFS → limitador 0,675 (como dist-quien-debe). SFX nuevos CC0 de BigSoundBank
(birome, cubiertos, tenedor, silla, copas; ver fuentes.md). medir.py: ver la última medición abajo.

## Pasada propia (prev + snapshots)
Ver la lista en el reporte final de abajo (sección "Pasadas").

## Pasadas (prev de la capa 3D + snapshots cada 0,5 s desde 0 y desde 0,25; las hojas se borraron por el disco)
- P1: el celular en la oreja izquierda quedaba escondido detrás de la cabeza → oreja derecha (de cara a la cámara),
  1,35×; Raúl menos girado al cuaderno y la cabeza menos agachada (se le veía la cara); la mano izquierda baja hasta la
  birome (antes flotaba arriba).
- P3: una cabeza de comensal de la mesa del frente tapaba medio cuadro → saqué las dos mesas entre la cámara y la mesa 7;
  Walter de espaldas → girado a 3/4 (cuerpo hacia la cámara, cabeza hacia Raúl); la familia reacomodada (los chicos
  adelante, la abuela atrás).
- P3b: la pinza en alto le cruzaba la cara → más abajo y afuera.
- P4/P5: Fabián cortado en el borde y después de nuca → al costado de la mesa, de 3/4; la mesa con cámara más alta (se ve
  Raúl al fondo).
- P5c: la guía del rótulo "Mesa de 8 vacía" iba al borde → apunta al RESERVADO; Fabián (brazo cortado) fuera del plano.
- P6/Q5: la tarjeta del mensaje tapaba la cabeza de Fabián → cámara más alta; Fabián a la derecha (Raúl se ve);
  "complicó." se salía de la tarjeta → tres renglones.
- La vela: chorreaduras que sobresalían de la boca de la botella → cuelgan del pico; vela más gruesa.
- Q1: chat vacío 2,5 s con una sola burbuja → la nota de voz suena sobre el plano 3D del celular que se prende (tarjeta
  "Pablo · nota de voz" con la onda), el inserto entra con la respuesta cerca; los mensajes se apilan desde arriba.
- Q2: "Mesa 7" y "sin confirmar" encimados → la mesa en un círculo y el estado debajo del nombre; la lista de espera se
  cortaba abajo → filas más bajas; el rótulo arriba.
- Q2b: el globo de Walter le tapaba la frente → más arriba; sin parpadeo al entrar el plano.
- Q3: las tarjetas le tapaban la cara a Raúl → chat más chico abajo, "Para vos, Raúl" sobre el pecho, rótulo y globo
  arriba de la cabeza.
- Q4: la abuela de espaldas y Walter tapaban a Raúl → nadie adelante salvo el nene; Walter a la derecha con la copa; los
  rótulos abajo (pisaban "Llegaron.").
- C: Raúl con los ojos cerrados al empezar a hablar (parpadeo) → parpadeo antes; encuadre con la cara arriba de la tarjeta.
- Mezcla: los pops de los rótulos de P5c pisaban la cola de "Siguen llegando." → -45/-44. medir.py: voz ≥ +8,2 LU sobre el
  resto (ventanas pareadas); mezcla.wav -14,1 LUFS, pico -2,5 dBFS. `check --json`: 0 errores.

## Flojo / para los revisores
- 45,7 s (plan 40); parte 2 49 % (plan 54 %).
- P2b: Fabián ocupa medio cuadro; el RESERVADO se lee chico ahí (se lee grande en P3/P4).
- P6b: el tenedor que vuelve a la mesa casi no se ve (las manos quedan abajo); en Q5 tampoco es claro.
- Q4: Fabián no entra en cuadro (la cola del globo apunta al borde derecho); la vela le cruza la cara al adolescente.
- Q1i: ~1 s de chat con solo la nota de voz y "escribiendo…".
- El piolín de la birome es fino (casi no se ve en el plano general).
- Q2b sin chip de hora (el living va directo con la tarjeta del aviso).
- No hay render mp4 todavía (ni de prueba); portada.png se armó con un mp4 de un cuadro provisorio (borrado).
