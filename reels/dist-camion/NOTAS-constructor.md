# dist-camion · notas del constructor (26-11)

Proyecto con la forma de importadora-dolar / dist-quien-debe: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada
concatenando piezas de dist-quien-debe (utilidades, `fusionar`, pantalla partida con dos cámaras + pasada de burbujas, la
rotisería con el spiedo), dist-comisiones (la oficina vidriada con la puerta, el descanso, el depósito con racks),
dist-cartera (la cafetería de Marta por dentro), dist-cliente-grande (la calle y el Súper Héctor), ya-lo-cargo (el camión,
rehecho) e importadora-dolar (tarjetas pegadas a la cámara, globos en dos tiempos, zona segura y 200-1650). **Desde ahora
se edita `assets/tres.js` directo.** `assets/personajes.js` = el de importadora-dolar + **ELENCO.ruso** (nuevo).

## Comandos (desde reels/dist-camion)
```
LINEAS=partes/lineas-todas.tsv TOMAS="a b c" bash partes/reintentar.sh   # tomas (lineas-r1.tsv: 23-ruso d/e/f)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-r10.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # huecos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre && ./hojas.sh renders/snap/nombre             # snapshots con el candado, hojas de 24
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10 (loudnorm en dos pasadas, lineal) después del render
```
Portada: `LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 1.2 renders/prev/por` →
`portada-src/fondo-limpio-1.2.png` (ya hecho: la pantalla partida del cuadro 0, Graciela arriba y Rubén con el mate abajo,
sin textos); después `node gen.mjs` de nuevo (sin LIMPIO). `portada.json` con `t` 1.2 y ese fondo. `herramientas/portada.mjs`
exige el MP4 final: correrla después del render.

## Voces (partes/procesar.sh)
Rubén Algenib · Graciela Gacrux · Marta Aoede · Héctor Sadaltager · Nico Fenrir · Ruso **Zubenelgenubi** · narrador
Rasalgethi (15-a, "Una hoja de ruta más tarde.", plan A). Tomas: g1 01-c (atempo 1,1) · r1 02-a (1,1) · m1 03-b · r2 04-a ·
h1 05-b (hueco 0,12, 1,1) · r3 06-c (la más cansada) · n1 07-a · r4 08-a · n2 09-b (n1/r4/n2 se reusan idénticos en Q3) · r5
10-b (pausa "Nico." → "A algún lado llega." 0,34, 1,1) · r6 11-c · u1 12-a · r7 13-a · u2 14-a · g2 16-a (pausa 0,32) · m2 17-a
· r8 21-a (pausa 0,3) · h2 22-a · u3 23-b (pausa 0,26) · r9 24-b (pausa 0,32) · u4 25-b · r10 26-b (1,08). "oyó:" igual al
guion salvo lo que el STT no entiende de voces graves cortas: "qué senior" (13-a), "vos Héctor voz" (23-b; todas las tomas
de 23 la oyen así), "Ah." no lo transcribe (16-a). Revisar de oído 13-a y 23-b.

## Mundo (piso y = 0 en cada lugar)
- Oficina (origen): Rubén sentado en (0,12; -1,72) mirando a +z, monitor (planilla "Pedidos · martes" / panel "Entregas de
  hoy"), celular en altavoz acostado en (-0,66; -0,64), reloj en 9:40, puerta vidriada con Nico en (1,2; -2,28), el
  depósito abajo detrás del vidrio.
- Rotisería (x 40) · Cafetería de Marta por dentro (x 60): el celular de Marta en Q2 es un objeto suelto sobre el
  mostrador girado a cámara.
- Calle (x 100): Súper Héctor en x local 0 (Héctor en la puerta), Cafetería Marta por fuera en x local -9 con la persiana
  (lamas en canvas) y el cartel a mano "Fui al banco. ¡No sabía a qué hora venían!" (Caveat).
- Cabina (x 140): tablero, volante crema, portavasos con el celular del Ruso; afuera la rambla (asfalto, murallón crema,
  agua, faroles y edificios que pasan con período de 60 m: `moverRambla`).
- Muelle (x 180), 18:00: el camión de culata (cola hacia +x), las 6 cajas "MARTA" que bajan a la pila, el portón con racks.
- El camión (`crearCamion`): cabina navy3 con parabrisas, faros, parrilla, espejos; caja crema con franja verde y panel navy
  "DISTRIBUIDORA RUBÉN · MAYORISTA · REPARTO"; las dos hojas de atrás abren (`ponerPuertas`). Va a la cafetería (P6a), al
  súper (Q4) o al muelle según el plano. Sin marca de fabricante.
- Remitos: `hojaArrugada` (vértices desplazados con semilla fija); el del inserto con mancha de grasa, garabato y "¿?".

## Duración y planos (s)
**49,0 s.** Parte 1 0-23,9 · cartel 23,9-26,28 · parte 2 + cierre 26,28-49,0 = 22,72 s (46 %) · cierre C 45,32-49,0 (tarjeta
CAMIÓN desde 45,67, línea chica desde 47,1 = 1,9 s).
P1 0 pantalla partida (DISTRIBUIDORAS + "Martes, 9:40." HTML; Graciela con el celular en la oreja arriba, Rubén abajo; rótulo
"Rotisería Graciela · pidió para las 10") · P2 1,76 primer plano de Rubén "Está llegando." · P3 2,89 partida (Marta → Héctor
desde 4,76; Rubén cada vez más hundido; contador HTML en la costura 7 → 12 → 19) · P4 7,65 inserto del celular de Rubén:
RUSO · CHOFER, toca Llamar · P4b 8,31 el celular del Ruso en el portavasos ("Rubén · 14 llamadas perdidas", vibra) · P4c 8,81
el Ruso maneja por la rambla, "Maneja. No atiende." · P5 9,91 oficina, Nico en la puerta · P5b 12,93 primer plano de Rubén
"Es un camión, Nico. / A algún lado llega." · P6a 16,49 "12:10." la persiana baja con el cartel, el Ruso golpea · P6b 17,79
"18:00." el muelle: las puertas, las 6 cajas bajan, rótulos (con guía a la pila) "Viaje perdido · flete $ 4.200", "3 horas de
teléfono", el fajo · P6i 19,59 inserto del remito · P6c 20,76 los dos ("Un señor." / "¿Qué señor?" / "Uno que pasaba.") · P6d
23,1 Rubén cierra los ojos con el celular "Súper Héctor llamando…" · cartel · Q1 26,28 = P1 (el aviso llega) · Q1i 26,98
inserto del chat: 10:00 y 11:00 ✓ → "En camino · Sos la próxima parada" con el mapa y el camioncito · Q1g 28,73 "Ah. / Soy la
próxima." · Q2 30,68 Marta con el cartel y el aviso 12:00 y 13:00 · Q3 32,65 = P5 (el panel en el monitor, Rubén lo gira) ·
Q3m 35,71 panel "Parada 15 · Súper Héctor · llega 10:52" · Q4 37,82 la vereda del súper "¿Firmo yo?" · Q4i 38,99 remito en el
celular: firma con el dedo, foto, Entregado ✓ 10:52 · Q4p 41,38 el chip "Entregado ✓" vuela al panel: 15 de 18 · Q5 42,23 =
P6b ("18:00.", camión vacío) · Q5i 42,98 "18 de 18 · 18 remitos con firma y foto · 0 cajas de vuelta" · Q5d 44,39 "Ni uno." ·
C 45,32 Rubén a cámara en el muelle.

## Mezcla
`MEDIR=1 node gen.mjs`: mediana voz-resto 21,7 LU, mínimo +13,6 LU (pareado) en tramos con voz; huecos sin voz máx -31,6
LUFS; mezcla.wav -14,1 LUFS, pico -2,4 dBFS. Cama: pizzicato, chisporroteo del spiedo, cafetería, calle (y el depósito con
pasabajos), el ómnibus por dentro para la cabina, el motor parado del camión. SFX en cada acción: ring + vibra cortados
cuando atiende, toque en Llamar + tono, vibra en el portavasos, gaviota, golpe de madera (el mate), golpes en la persiana,
freno de aire, puertas, cajas, papel, ring final, stinger + narrador, notificación, dings, firma, obturador, whoosh del chip.

## Pasadas (prev + snapshots; renders/prev/p0-p9, renders/snap/pasa1, pasa2, pasa3, fix1)
- Pasada 0 (prev de la capa 3D): split con Graciela/Marta chicas y cortadas → cámaras más cerca y descentradas; inserto del
  celular de Rubén con el teclado encima → el celular a un lugar libre del escritorio; la cabina terminaba con la cara del
  Ruso llenando el cuadro → plano desde la esquina del tablero con fov 70 (se ve la rambla por la ventanilla); P5b demasiado
  cerca; muelle con Rubén de espaldas → los dos enfrentados en un eje que cruza el cuadro; Q4 con el Ruso tapando a Héctor →
  los dos de perfil desde la vereda; Q2 el celular de Marta de espaldas → girado a cámara; textos que se salían del canvas
  ("Sos la próxima parada", "18 de 18") → ajustar(); inserts de celular más chicos (burbuja arriba, rótulo abajo).
- Pasada 1 (snap cada 0,5 s): la burbuja de Graciela le tapaba la cara → a la izquierda, 3 líneas, el rótulo abajo a la
  derecha; burbujas de Marta/Héctor sobre la frente → fijas a la izquierda con la cola a la boca y los personajes corridos a
  la derecha; las de Rubén en la mitad de abajo, a la izquierda; Rubén hundido se veía de coronilla → menos cabeceo; el
  travelling de la cabina atravesaba el brazo del Ruso → corte (P4b celular / P4c Ruso); burbujas pisadas en P6c (fin antes de
  la siguiente); rótulo "Súper Héctor llamando…" en P6d; el cartel de la pared del muelle quedaba cortado → sacado (el nombre
  va en el camión); el cartel a mano y el Ruso en P6a re-encuadrados; Q2 el celular y el cartel a los dos lados de Marta.
- Pasada 2 (snap desde 0,02): volante navy invisible → crema; Rubén en P3 más a la derecha; Q4/Q5d cámaras más atrás; el chip
  "Entregado" aterriza en el medio de la fila; el título de la planilla cortado → alineado a la derecha; los celulares en la
  oreja (Marta, Héctor) a la altura de la oreja y un poco a cámara.
- `check --json`: 0 errores.

## Dudoso / para los revisores
- 49,0 s (más que los 45 del plan) y parte 2 + cierre 46 % (el plan pedía 51 %): las tomas de Algenib son lentas aun con
  atempo 1,1. Para bajar: sacar P6a (1,3 s) o la llamada de Héctor del montaje.
- P5b (el remate): la cabeza de Rubén se mueve de lado a lado mientras habla (el cuerpo queda quieto); revisar si molesta.
- P6a: el Ruso queda de espaldas a la izquierda; el golpe a la persiana se ve poco (se oye).
- Graciela en P1/Q1: el celular en la oreja queda casi detrás de la burbuja.
- Las manos de los insertos (Q1i, Q4i, Q5i) son las manos sueltas de dist-quien-debe (palma + pulgar): se leen como
  manoplas.
- Q4: el celular que el Ruso le extiende a Héctor casi no se ve en el plano general (se ve en el inserto que sigue).
- No hay plano de la hoja de ruta en el soporte de la cabina (Q4): la hoja de ruta aparece solo en el celular del Ruso.
- Render final no hecho (lo hace el coordinador con `npx … render` + `bash paso10.sh`).

## Ronda 1 de corrección (revision-guion-r1.md + decisiones del coordinador) · sin render
**44,97 s.** Parte 1 0-19,78 · cartel 19,78-22,03 · parte 2 + cierre 22,03-44,97 = 22,94 s (51 %) · cierre C 41,43-44,97 ·
tarjeta CAMIÓN 41,97-44,97 (3,0 s, entra en el comienzo real de "CAMIÓN": T.palabra sale del silencio corto que sigue a
"Comentá" en la toma, medido con silencedetect -35 dB / 0,06 s; palabras-r10.json estaba interpolado) · línea chica desde 43,07.
Planos (s): P1 0 · P2 1,75 · P3 2,85 (solo Marta; el contador salta 7 → 19 en 4,69) · P4b 5,05 (un solo plano de 0,92 s: el
celular del Ruso en el portavasos, "9:42 · Rubén · 14 llamadas perdidas", rótulo "Maneja. No atiende." abajo, motor + rambla) ·
P5 5,97 · P5b 8,88 · P6a 12,41 · P6b 13,63 · P6i 15,13 · P6c 16,26 · P6d 19,17 · cartel · Q1 22,03 · Q1i 22,73 · Q1g 24,48 · Q2
26,43 · Q3 28,40 · Q3m 31,46 · **Q4r 33,55** (nuevo: la hoja de ruta en el soporte del tablero de la cabina, "Parada 15 de 18 ·
Súper Héctor") · Q4 34,17 · Q4i 35,27 · Q4p 37,49 · Q5 38,34 · Q5i 39,09 · Q5d 40,50 · C 41,43.
Corregido:
- Duración y proporción: fuera la llamada de Héctor (h1/r3) y el inserto de "Llamar" + el plano del Ruso manejando; pausas de
  la parte 1 recortadas (no los remates: la pausa antes de "A algún lado llega." y el silencio de "Es un camión, Nico." siguen);
  narrador atempo 1,14 (cartel 2,25 s).
- "¿Qué señor?": las tomas 13-a y 13-d sonaban "qué senior" (STT); 4 tomas con "se-ÑOR" marcado dieron "señor" sin el
  "qué"; quedó la **13-i**, que dice "¿Qué?" y "¿señor?" separados (0-0,36 / 0,8-1,53), con el hueco a 0,07 s: "¿Qué… señor?"
  (el STT oye "señor": el "qué" está en la forma de onda, -13 dB RMS). Revisar de oído.
- Q4: "Vos. No un señor." (toma 23b-d, Zubenelgenubi, pausa 0,28 s; el STT oye "vos no señor": las 4 tomas igual; el "un"
  es corto, revisar de oído) · globo "Vos. / No un {señor.}" en dos tiempos.
- Hoja de ruta en orden (13 Bar Walter ✓, 14 Panadería Nelly ✓, 16, 17); el celular del Ruso a las 9:42; el celular de
  Rubén en el escritorio ya no muestra 18:02 a la mañana (y en P6d muestra "Súper Héctor llamando…": antes quedaba
  "Cafetería Marta" por el corte del montaje); remito de papel con 3 renglones legibles que suman $ 86.400 (Aceite 1,5 L · 12
  cajas 38.400 · Harina 25 kg · 10 bolsas 30.000 · Yerba 1 kg · 6 fardos 18.000); globo de Graciela "Rubén, / ¿por dónde
  viene / el camión?".
- Chips de hora ≥ 1,2 s (los de Q1 y Q5 siguen sobre el inserto, 1,27 s) y sin el cuadro de retraso en cada corte.
- "Ah." de Graciela: medido en g2, los primeros 0,5 s a -16 dB RMS (se oye); el globo en dos tiempos lo acompaña.
- P5b: medí la cabeza de Rubén (posición y rotación) cuadro a cuadro: está quieta; el "balanceo" que se veía era el ajuste
  de la mano izquierda al dejar el mate (IK al escritorio) → la mano queda baja sin IK y el mate en la mesa.
- P6a: cámara de costado; el Ruso de perfil golpea la persiana con la izquierda (se ve el puño contra las lamas) y el cartel
  se lee entero.
- Graciela en P1: el celular en la oreja izquierda (a la derecha del cuadro, lejos del globo).
- Manos de los insertos (Q1i, Q4i, Q5i): ahora sostienen el celular de costado (el pulgar parado sobre el borde, la palma
  abajo, casi fuera del cuadro): ya no hay un pulgar acostado sobre la pantalla.
- Q4: el celular que el Ruso le extiende a Héctor más grande (×1,5) y girado a medio camino entre Héctor y la cámara.
- Q2: el cartel se guarda antes de pasar por el mostrador.
- Mezcla: la cola de "señor." (u3) con fundido de 0,16 s y la música agachada hasta Q4p; la calle de Q4 -2,5 dB; el obturador
  después de la voz. `MEDIR=1 node gen.mjs`: mediana voz-resto 22,2 LU, mínimo +7,6 LU (pareado) en tramos con voz; huecos sin
  voz máx -31,5 LUFS; -14,1 LUFS, pico -2,5 dBFS.
- `check --json` 0 errores. Fondo de la portada regenerado (portada-src/fondo-limpio-1.2.png).
Snapshots: renders/snap/r1a (los tramos tocados), r1p1 (cada 0,5 s desde 0,25), r1cortes (tres cuadros en cada corte), r1p2
(cada 0,5 s desde 0,02).
Quedan: la toma de "¿Qué… señor?" y el "un" de "No un señor." para escuchar; los valores 999 de T.p3b/h1/r3/ring2/tap en
tiempos3d.js son centinelas de lo que se sacó (no se usan).
