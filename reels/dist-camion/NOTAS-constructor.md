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
