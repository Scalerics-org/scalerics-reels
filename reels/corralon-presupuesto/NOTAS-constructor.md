# corralon-presupuesto · notas del constructor (27-11)

Proyecto con la forma de taller-service (gen.mjs con CORTE, chips HTML, mezcla bus → ganancia → limitador) y el set de
ferreteria-encargo / corralon-portland. Todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita nueva sobre la base técnica de
ferreteria-encargo). `assets/personajes.js` = el de taller-service + `ELENCO.monica` (nueva).

## Comandos (desde reels/corralon-presupuesto)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-g14.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre && ./hojas.sh renders/snap/nombre   # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x       # solo la capa 3D (FULL=1 a 1080)
flock /tmp/hyperframes.lock node prev2.mjs "t@px,py,pz,mx,my,mz,fov …" renders/prev/x   # cámara por cuadro
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/corralon-presupuesto.mp4
bash paso10.sh                            # paso 10 (loudnorm en dos pasadas) → renders/corralon-presupuesto-final.mp4
```
Portada: ver la `nota` de portada.json (fondo limpio P1 a 2,2 s con VER=portada LIMPIO=1). portada.mjs pide un mp4 aunque
use el fondo limpio: se generó con un mp4 negro de 1 s puesto y borrado en renders/ (después del render real, regenerar
igual da lo mismo: el fondo es el PNG).

## Voces (partes/procesar.sh)
m1 01-monica-a (Laomedeia, atempo 1,14; P1 y Q1, MISMO archivo) · g2 02-gustavo-a (Alnilam, 1,05) · t3 03-tito-a (Enceladus,
1,1; P3 y Q4, MISMO archivo) · g4 04-gustavo-c · m5 05-monica-c (pausa interna 0,43 → 0,14 s, 1,08; P4 y Q5, MISMO archivo) ·
m6 06-monica-b (1,14) · g7 07-gustavo-b (1,05) · m8 08-monica-c (1,05) · narrador 09-narrador-b (Rasalgethi, toma nueva
"Un seguimiento más tarde.", 2,06 s) · g10 10-gustavo-a · m11 11-monica-c · g12 12-gustavo-c (pausa 0,5 → 0,3, 1,05) · g13
13-gustavo-a (pausa 0,38 → 0,32, 1,05) · g14 14-gustavo-b (1,12). Elegidas por STT y duración: NO se escucharon.
"oyó:" igual al guion salvo lo del STT: sin tildes ("pasas", "armó", "compro", "pase", "Comenta"). g13 con el corte del
silencio más justo el STT oía "es mi hija mía": con el corte 0,55-0,93 oye "Ya sé es mi camión" (conviene escucharla). m8 con
atempo 1,1 el STT perdía la "y" inicial: quedó en 1,05 y la oye. CORTE (segunda mitad de las líneas en dos tiempos) medido
con silencedetect: m1 1,55 · m5 0,87 · m6 2,13 · m8 1,72 · g12 0,68 · g13 0,88.
Guion: sin cambios de texto.

## Duración y planos (s)
**51,63 s** (el plan decía ~43,4: las 14 tomas suman 30 s de voz aun con atempo 1,05-1,14). Parte 1 0-23,89 · cartel
23,89-26,15 · parte 2 + cierre 26,15-51,63 = 25,5 s (49 %) · cierre C 47,91-51,63 (PRESUPUESTO desde 48,36, línea chica
desde 49,73).
P1 0 (CORRALONES + "Sábado, 10:00.", la lista cae del mostrador al piso) · P1g 3,01 (Gustavo: "Te lo armo para el lunes.",
la lista en primer plano) · P2a 4,63 (19:10, lámpara, calculadora, mate) · P2b 5,35 (21:30, la cinta cuelga hasta el piso) ·
P2d 6,07 (23:20, POV de Gustavo, push-in al display "1.260.000", rótulo "4 horas armándolo") · P2c 6,73 (celular: Enviado
23:22 → Visto ✓✓) · P3 7,68 (Jueves, Tito desde el lado de Gustavo) · P3g 9,78 (Gustavo por encima del hombro de Tito, con
el rollito de cinta) · P4 11,62 (Tres semanas después: desde el portón, el camión gris recula, el peón baja ladrillos,
Mónica cruza con el casco) · P4m 14,13 (Mónica: "El de la otra cuadra…") · P4p 17,09 (la pausa: los dos y el camión,
rótulos) · P5 18,04 (Gustavo seco) · P6 20,56 (Mónica agradecida) · P6i 22,36 (el tablero del camión gris: la hoja tachada,
entra con "Se lo pasé a él.") · cartel · Q1 26,15 · Q1g 29,16 ("Te lo armo ahora.", toca la tablet) · Q1t 30,14 (Nuevo
presupuesto: renglones de la lista de precios, total, Enviar) · Q2c 31,79 (el celular de Mónica, Aceptar / Tengo una duda) ·
Q3c 33,19 (Lunes · 2 días después: el aviso con el mensaje listo, Enviar → Enviado) · Q3m 34,69 (Mónica en su terreno:
"¡Ay, qué atentos!") · Q3a 36,43 (Aceptar → "Aceptado ✓ · Primera entrega: lunes 8:00") · Q4 37,58 (Tito, Gustavo le gira la
tablet) · Q4t 39,73 (panel Presupuestos abiertos, Ganados 3 → 4) · Q4b 40,88 ("Compró. Con un botón.", mismo plano y lugar
que "Yo no ando persiguiendo…") · Q5 42,68 (el camión navy MATERIALES GUSTAVO, el mismo encuadre de P4) · Q5g 45,22 ("Ya sé.
Es mi camión.", mismo plano y lugar que "Por lo menos…") · Q5b 47,06 (Tito guarda el rollito en el cajón) · C 47,91.

## Mundo
Galpón de corralon-portland/ferreteria-encargo (origen): mostrador con cajón del lado de Gustavo, pizarrón de precios,
pallet de portland y hierros adentro, patio por el portón. P2 es el mismo galpón de noche (portón bajado, lámpara de brazo,
fondo navy, luces cambiadas en `luces()`). La calle en x = 60 (fachada con el cartel, vereda, calle, la obra de Mónica:
cimientos, hiladas de ladrillo terracota, arena, andamio, cartel de obra en blanco, vecinos, árboles). El tablero del camión
gris en x = 120. Objetos nuevos: la lista de materiales (tira por camino con el rollo que rueda), la calculadora de rollo y
la cinta que crece y se enrula (cicloide), el rollito, el camión plataforma en 3D (de la foto de corralon-portland) con
pallets de ladrillos y bolsas, el peón que pasa ladrillos (ciclo de 0,62 s) y la pila que crece, la hoja tachada / con
"Aceptado ✓" (la de "Aceptado" está hecha pero sin plano), el casco blanco y la carpeta de Mónica.

## Mezcla
`MEDIR=1 node gen.mjs`: -14,1 LUFS, pico -3,4 dBFS, mediana voz-resto 25,9 LU, mínimo +12,3 LU en tramos con voz; huecos sin
voz máx -31,0 LUFS. SFX: papel que se desenrolla y el rollo que toca el piso, interruptor de la lámpara, tic del reloj,
teclas + impresora real de calculadora por chip, whoosh + ding del Visto, calle, codos, papel del rollito, marcha atrás +
diésel, un ladrillo por ciclo del peón, la música se corta en la pausa, tono grave antes de "Por lo menos…", glitch en la
hoja tachada, stinger + narrador, toques/dings/notificaciones de las pantallas, tics de los renglones, el camión navy, cajón
que se cierra de golpe, pops de burbujas y rótulos. Sin el sorbo de mate (no hay gesto visible).

## Pasadas
- Armado (prev.mjs/prev2.mjs, renders/prev/a-j): bug de `OB.add(...).position.set` (Object3D.add devuelve el padre: la obra
  entera quedaba en la puerta del portón tapando la cámara) → corregido, igual en la carpeta; la lista mostraba el título
  repetido en el piso (la textura se repetía cada 2 m) → 3 m por vuelta y v invertida; P1 con Mónica de espaldas tapando a
  Gustavo → cámara desde adelante a la izquierda y Mónica de 3/4; P2 Gustavo dormido sobre la calculadora → menos inclinado;
  P2d la mano y la cabeza tapaban el display → POV de Gustavo (él oculto) y la mano suelta a las 23:20; la lista de noche
  hacía cruzar el brazo izquierdo → al otro lado; P3 de costado se tapaban → plano/contraplano; P4 sin Mónica en cuadro →
  sale de detrás del camión y cámara alta; Mónica de espaldas en la calle (giro mal calculado) → mira a Gustavo; la hoja del
  tablero cortada → cámara más lejos y sin el cartel duplicado por el parabrisas; Q2c/Q3a con media pantalla vacía → mensaje
  previo y tarjeta 1,1×; C demasiado cerca → desde adentro del portón, Gustavo de medio cuerpo con su camión atrás.
- Pasada 1 (renders/snap/pasa1, cada 0,5 s): P4m/P5/P6/Q5g/C caras que llenaban el cuadro → planos más abiertos; P4m/P6 la
  cabeza de Gustavo tapaba a Mónica → cámara del otro lado; Q4b Tito tapaba a Gustavo → cámara más a la derecha; Q5b solo se
  veía el gorro de Tito → cámara desde la punta del mostrador; Q5b el mate en primer plano → mate y termo a la otra punta en
  la parte 2; Q3m ojos que se leían cerrados (feliz alto mirando el celular) → FELIZ con ojos abiertos; parpadeos de Mónica
  en medio de sus líneas → movidos; el casco del peón detrás de la cabeza de Gustavo en C → Gustavo corrido; burbuja de m1 →
  a la derecha; P2c arrancaba con el chat vacío → la tarjeta entra en el primer cuadro.
- Pasada 2 (renders/snap/pasa2, cada 0,5 s desde 0,25): ojos de Gustavo de noche que se leían cerrados → más abiertos;
  P1 personajes muy arriba → cámara corrida; P4m/P6 de nuevo (cámara a la derecha de Gustavo); Q5b más lejos y desde arriba.
- Pasada 3 (renders/snap/pasa3, cada 0,5 s desde 0): confirmadas las correcciones (P4m/P6 Mónica de frente sin tapar, Q4b
  Gustavo a la vista, P2d el display entero, C de medio cuerpo). Quedan los flojos de abajo; no se corrigió nada nuevo.
`check --json`: 0 errores (lint, runtime, layout, motion, contrast, craft, audio).

## Flojo / para los revisores
- 51,6 s (plan ~43,4). Si hay que recortar: Q5b (Tito y el cajón, 0,85 s), la cola de P6i, P3 (Tito tarda en entrar), o
  más atempo en m1/m6 (ya en 1,14).
- Ninguna voz se escuchó (elegidas por STT y duración). Revisar sobre todo g7 ("Por lo menos yo no fui pesado.": que sea
  plano) y g13.
- Q5b: el rollito de cinta casi no se lee (chico, la mano lo tapa); el cajón se ve poco por el mostrador.
- P4: el camión gris se ve de costado con la cabina fuera de cuadro; la obra apenas asoma por detrás de la carga.
- P1/Q1: Gustavo chico en el fondo a la izquierda; la lista se lee en P1g y en la portada, en P1 es una tira de renglones.
- P5/Q5g: detrás de Gustavo, la fachada navy lisa y la esquina de un pallet de ladrillos (el cartel MATERIALES GUSTAVO no
  entra).
- P4/Q5: en los últimos 0,3 s del cruce Mónica queda medio cortada por el borde izquierdo (justo antes del corte a P4m/Q5g).
- P1/Q1: la burbuja de "¿me pasás presupuesto? / Es toda la casa." roza el pelo de Mónica arriba.
- Los parpadeos programados de Gustavo pueden caer en algún cuadro de los snapshots (C a 49,45 s).
- No se miró a 30 fps alrededor de los cortes ni se renderizó el mp4.

## Ronda de ajuste (pedido del coordinador, antes de la revisión) · ≤ 47 s
**46,8 s.** Parte 1 0-21,37 · cartel 21,37-23,4 · parte 2 + cierre 23,4-46,8 = 23,4 s (50 %) · cierre C 43,37-46,8
(tarjeta PRESUPUESTO 43,73-46,8 = 3,07 s; línea chica desde ~44,9). Diálogo sin cambios de texto.
Planos (s): P1g 2,86 · P2 4,34 (montaje 2,3 s) · P2c 5,86 · P3 6,64 · P4 10,18 · P4m 12,54 · P4p 15,41 · P5 16,11 · P6 18,46 ·
P6i 20,22 · Q1 23,4 · Q1g 26,27 · Q1t 27,23 · Q2c 28,68 · Q3c 29,83 · Q3m 31,2 · Q3a 32,77 · Q4 33,69 · Q4t 35,72 · Q4b 36,7 ·
Q5 38,38 · Q5g 40,81 · Q5i 42,52 · C 43,37.
- Tiempos: silencios entre líneas y cortes más justos (el corte a Gustavo entra sobre la risita de "Es toda la casa"),
  montaje del domingo 2,3 s, pausa antes de "Por lo menos…" 0,94 s (antes 1,23), cola de P6i 1,15 s, cartel 2,03 s,
  insertos 0,1-0,2 s más cortos. atempo moderado: g2 1,08, t3 1,13, g4 1,05, m6 1,17, m11 1,05, g12/g13 1,07, g14 1,18,
  narrador 1,05 (todas con "oyó:" igual que antes). CORTE nuevo: m6 2,08 · g12 0,67 · g13 0,86.
- **Q5b fuera** (Tito guardando la cinta en el cajón: era el plano más flojo y no entraba con Q5i): el código queda sin
  plano. **Q5i nuevo** (0,85 s): el tablero del camión navy (tablero navy) con la hoja "MATERIALES GUSTAVO · PRESUPUESTO"
  y el sello verde "Aceptado ✓ · Primera entrega: lunes 8:00", callback de la hoja tachada de P6i.
- P4/Q5: cámara alta desde la vereda (encima de Gustavo): el camión con la cabina, el peón y la carga, y la obra
  (hiladas, arena, andamio) detrás; el camión corrido para que entre; Mónica aparece por delante de la trompa y cruza por
  el medio del cuadro a paso parejo en dos tramos (en el corte está entera en cuadro; termina de llegar en P4m/Q5g, ya
  hablando). La pila de ladrillos en la vereda de la obra, detrás de la culata.
- P1/Q1: cámara más cerca (Gustavo más grande) y la burbuja de Mónica abajo, sobre la lista (no roza ninguna cara).
- P5/Q5g: adentro del portón, detrás de Gustavo, un cartel MATERIALES GUSTAVO y una pila de portland; cámara un poco
  desde abajo.
- Parpadeos: fuera los de P1, P6, Q1, Q3m y C; quedan solo en planos de paso (arranque del cruce, insertos, P2a, P3, P4m, Q4).
- Rótulos más grandes (56-66 px); chips que ya no pisan el plano siguiente ("Lunes · 2 días después." salía sobre Q3m;
  "Tres semanas después." corta con el contraplano); P2c y Q2c con la tarjeta desde el primer cuadro; el iris de la parte 2
  abre desde la lista y el piso crema (no desde el navy); el sello "Aceptado ✓" de Q5i ya no pisa los renglones.
- Pasadas: renders/snap/r1a (cada 0,5 s) y renders/snap/r1c (cuadro anterior, el del corte y el siguiente a 30 fps en los
  28 cortes); prev n para el cruce y Q5i después del último arreglo. `check --json`: 0 errores.
- Mezcla: HUECO_K 0,58; primer renglón de Q1t más bajo (pisaba la cola de "Te lo armo ahora."). -14,1 LUFS, pico -3,4
  dBFS, mínimo voz-resto +6,5 LU (27,5 s, cola de g10), huecos sin voz máx -32,0 LUFS.
- Render (con el candado, `--workers 2`, SwiftShader): **46 min 29 s** para 46,8 s (1.404 cuadros); paso10.sh: 1 min 7 s.
  renders/corralon-presupuesto-final.mp4: 46,8 s, -14,0 LUFS integrado, pico -3,0 dBFS (true peak -3,2), ~4,5 Mbps.
  Hoja del final: renders/hoja.png (coincide con los snapshots). La portada no cambió (el fondo limpio usa la cámara de
  VER=portada, que no se tocó).
