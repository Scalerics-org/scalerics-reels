# contable-consultas · notas del constructor (26-11)

Esqueleto de contable-papeles (mismo estudio, Adriana, Lucas, Marcelo y la panadería) con la mezcla y el CORTE de
dist-comisiones: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D está entera en `assets/tres.js` (escrita para este reel: el estudio de mañana
con el MONITOR vertical, el patio nuevo, la panadería reusada). `assets/personajes.js` = el de dist-comisiones (el más
completo, con el arreglo de lentes de contable-papeles) + **Jorge** nuevo en ELENCO (costados grises, barba corta gris
0x6d6a66 opacidad 0,85, chomba crema con cuello navy, delantal navy3 con bolsillo crema, pantalón cargo, alpargatas navy,
panza 1,15, sin bigote). Adriana, Marcelo y Lucas se arman en tres.js igual que en contable-papeles; Graciela, Walter y
Héctor (ELENCO) solo para los avatares. Adriana es una sola: `ponerCampera(true)` en el estudio, `false` en el patio.

## Comandos (desde reels/contable-consultas)
```
TOMAS="a b c" bash partes/reintentar.sh            # tomas (partes/lineas.tsv; sin el narrador, que se reusa)
LINEAS=partes/lineas-extra.tsv TOMAS="d e f" bash partes/reintentar.sh   # tomas extra de 04, 10, 12, 15
bash partes/medir-tomas.sh                         # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                            # assets/voice/ desde las tomas elegidas (+ palabras-a7.json)
node gen.mjs                                       # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                                   # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre                         # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                                     # paso 10 (loudnorm en dos pasadas, lineal) después del render
```
Portada: `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 11.0 renders/prev/por`
→ copiar `renders/prev/por/t-011.00.png` a `portada-src/fondo-limpio-11.0.png`; después `SINAUDIO=1 node gen.mjs` (o sin
SINAUDIO). portada.json ya tiene `t` 11,0 y el `fondo_limpio`. Render: `npx --yes hyperframes@0.8.206 render --workers 2 -o
renders/contable-consultas.mp4` con el candado, después `bash paso10.sh`.

## Voces (partes/procesar.sh; tonos en partes/lineas.tsv)
Adriana Autonoe · Marcelo Enceladus · Graciela Gacrux · Walter Umbriel · Jorge **Zubenelgenubi** · Lucas **Sadaltager** ·
narrador = `reels/inmobiliaria-disponible/assets/voice/narrador.wav` (Rasalgethi, 2,18 s, sin atempo). Los audios de
WhatsApp (m1, g1, w1, m2) con filtro de altavoz suave (200-5000 Hz + compresor).
m1 01-c (se reusa en Q1) · a1 02-c · g1 03-c (atempo 1,05) · w1 04-c · m2 05-a · j1 06-b (hueco 0,53-0,74 → 0,14; se reusa en
Q4) · a2 07-a · j2 08-a (pausa después de "Es Marcelo." ≈ 0,35 s) · m3 10-e (hueco 0,95-1,10 → 0,12) · a3 11-b · l1 12-b (hueco
0,43-1,15 → 0,2) · a4 13-c · a5 14-b · j3 15-e (sin los 0,22 s del arranque, pausa 0,28 s, atempo 1,12) · a6 16-a (pausa
0,28 s) · a7 17-c (atempo 1,08).
"oyó:" igual al guion salvo lo de siempre: el STT escribe "23" por veintitrés y se come la palabra de arranque en algunas:
"¡Uh," (m3 en todas las tomas), "¿Te" (w1), "Es" (j3, todas las tomas salvo 15-e suelta), "¿Ya?" (l1: todas las tomas;
12-b la tiene antes de un silencio de 0,76 s, que se acortó). **Revisar de oído** l1, m3 y j3.

## Mundo
- Estudio (origen): el de contable-papeles de MAÑANA, sin los 60 sobres ni el piolín (una segunda estantería de biblioratos
  en su lugar); el teclado navy delante de Adriana; la lámpara (-0,5; 0,95), la sumadora (-0,3; 1,2), el celular en el
  soporte (0,2; 1,2, primer término) y el **monitor vertical** 0,33 × 0,53 en (0,47; 0,88) girado -0,32 (lienzo 800 × 1290:
  el balance de Súper Héctor 3 % rojo + "Consultas de la semana" 14 → 38 → 52 → 63; en la parte 2 la barra verde 3 → 8 %,
  "Asistente del estudio · agente de IA ✓", el toast "¡Gracias, Adri!", la bandeja con Graciela / Walter / Marcelo con ✓ y
  "Para vos (2)" con Héctor y el camión, y el viernes "Balances · noviembre" con Súper Héctor y Bar Walter en 100 % ✓). Las
  tazas 1 → 2 → 3 en la ráfaga. El escritorio de Lucas a la derecha (1,22). Luces: día (lunes / parte 2), noche (miércoles
  23:40: la lámpara prendida), tarde (viernes), oscuro (Q3n: la lámpara apagada, el estudio vacío y el monitor que igual
  recibe).
- Patio (x = -40): piso de baldosas rojo ladrillo apagado lisas, muro crema con cornisa, pérgola y parra plana, cielo crema;
  la parrilla de ladrillo crema (textura con juntas) con campana, chimenea, brasas planas, dos tiras con huesitos, tres
  chorizos con nudito y rayas de la parrilla, dos morrones con huevo (yema de frente); la mesa con mantel a cuadros navy y
  crema, canasta de pan, ensalada, jarra y vasos de vino, platos, sillas plegables navy; la tabla con el pan abierto. Jorge
  en (-0,3; -0,55) con la pinza en la derecha (la pinza va del puño al chorizo, que se mueve: parrilla → aire (congelado) →
  pan); el celular de Jorge (funda crema) en el bolsillo del delantal, vibra, sale a la mano izquierda en P5 / Q4j. Adriana
  sentada en (0,55; -1,1) con el celular; en Q4 lo deja boca abajo y se levanta con el plato; en Q4a / C parada con el
  choripán en el plato.
- Panadería (x = 40): de contable-papeles sin bolsas, factura ni repartidor. El inserto Q2 va sobre fondo liso (el
  mostrador tapaba la pantalla); igual P5i / Q4i (la mesa asomaba).

## Duración y planos (s)
**46,4 s.** Parte 1 0-17,02 · cartel 17,02-19,32 · parte 2 + cierre 19,32-46,4 = 27,1 s (58 %) · cierre C 42,79-46,4 (3,6 s;
tarjeta CONSULTAS desde 43,09, línea chica desde 45,0).
P1 0 (cuadro 0: ESTUDIOS CONTABLES + "Lunes, 9:00.", Adriana, el 3 %, el audio de Marcelo) · P2 1,63 · P3 3,31 (ráfaga, cámara
fija, luz: lunes 11:00 / miércoles 23:40 desde 4,83 / viernes 19:00 desde 6,11; "Las mismas 3 preguntas") · P4 8,07 (el asado)
· P4b 11,30 (Jorge congelado con el chorizo, la pausa) · P5 12,25 (vibra el bolsillo) · P5i 13,07 (su pantalla: "¿Le
preguntás a Adri cuándo vence lo mío?") · P5j 14,36 · P5c 16,07 (Adriana cierra los ojos, chip "Balance de Súper Héctor: 3 %")
· cartel · Q1 19,32 (= P1; contesta el asistente en el celular del soporte) · Q2 21,5 (el chat de Marcelo: "Estudio Adriana ·
Asistente · agente de IA", la respuesta firmada "Asistente del estudio · agente de IA", la boleta, las facturas; "¡Uh, qué
rápida!") · Q2m 24,19 ("Gracias, Adri.") · Q2b 25,34 (= P2, "De nada.") · Q3 26,19 (push-in al monitor) · Q3n 27,44
(miércoles 23:40, a oscuras) · Q3r 28,29 (Héctor → "Para vos (2)", "Lo de fondo te lo pasa a vos") · Q3b 29,79 (viernes 18:00,
Lucas) · Q4 33,17 (= P4) · Q4j 36,35 (= P5) · Q4i 37,02 · Q4a 38,32 (los dos: "…al toque." / "Sí. Un amor.") · C 42,79.

## Mezcla (MEDIR=1 node gen.mjs)
TECHO -38,5 antes de la ganancia final (+7,0 dB); la música se corta seca en "veintitrés" (P4) y baja (duck) en los tramos
sin voz con efectos (Q1 → Q2, Q3, Q4j). `medir.py`: voz ≥ +21,3 LU sobre el resto en todos los tramos de 0,5 s con voz
(ventanas pareadas; criterio viejo +20,4). `medir-sfx.py`: máximo sin voz -31,0 LUFS. mezcla.wav -14,0 LUFS, pico -2,7 dBFS.
Sin SFX nuevos descargados (créditos en fuentes.md).

## Pasadas propias
`check --json`: 0 errores.
Pasada 0 (prev de la capa 3D, renders/prev/a-h): los personajes del patio estaban en el estudio (faltaba sumar x = -40);
P2/P4b/P5/P5c/Q4j/Q4a/C demasiado cerca (caras que llenaban el cuadro, burbujas que no entraban) → cámaras más atrás;
P5 se veía la nuca de Jorge → cámara del lado al que mira; los anteojos de leer de Jorge se leían como un aro negro → sin
anteojos; la barba de Jorge no se veía → más oscura y opaca; patio rearmado (Jorge y Adriana más juntos, la parrilla
entra a la izquierda); P3 cortaba a Adriana y después el monitor → cámara más abierta (Adriana, el 3 % y el contador
enteros); Q3: "Consultas: 63" y "Contestó" se pisaban → una línea; el rótulo "Lo de fondo…" tapaba a Héctor → el monitor
más arriba en el inserto; Q2 el mostrador tapaba el celular → fondo liso; Q2m el cartel de la panadería detrás de la
burbuja → oculto; noche más oscura.
Pasada 1 (cada 0,5 s desde 0,02, renders/snap/p1): P3 con la cara cortada y el rótulo sobre la cabeza → cámara; P5 el
celular de Jorge se veía de canto como un palito frente a la boca → más abajo y girado hacia la cámara; P5i/Q4i la mesa y la
pata asomaban y el chat vacío arriba → fondo liso, historial ("¿Mañana venís al asado?" / "No llego, Jorge. ¡Disfruten!"),
"Es Marcelo." abajo (no tapa la cabecera); Q3b Adriana cortada → cámara y Lucas más cerca; Q4a Adriana delante de Jorge y
el celular de canto en la mano → Adriana a la derecha, el celular vuelve al bolsillo, la burbuja de Jorge también en Q4a;
C la cara al borde → Adriana y cámara corridas (Jorge detrás a la izquierda); el choripán apuntaba a la cámara → de costado.
Pasada 2 (cada 0,5 s desde 0,27, renders/snap/p2): Q3 Adriana desaparecía al empezar el push-in (pop) → queda visible
(sale sola del cuadro); P5c muy cerca → más atrás; Q3b y C reencuadrados. Cuadros a ±1 cuadro de cada corte
(renders/snap/cortes): sin saltos ni texto fantasma.

## Portada
Fondo limpio con cámara propia (VER=portada, t 11,0): Jorge congelado con el chorizo en la pinza y Adriana con el celular,
la mitad de arriba (portada-src/fondo-limpio-11.0.png). chica "Domingo, 13:30.", grande "¿Cuándo vence?", sello ESTUDIOS
CONTABLES. Falta correr `node herramientas/portada.mjs contable-consultas` (exige el MP4 final).

## Flojo / para los revisores
- 46,4 s (plan 43): las tomas; la parte 2 es 58 % (sobra), se puede recortar Q3 o Q4 si hace falta.
- Las manos-puño del elenco: el agarre de la pinza y del celular de Jorge es aproximado (la pinza sale del puño).
- Q2m: el mostrador ocupa el cuarto de abajo (liso, madera).
- Q3n: el estudio a oscuras se ve chico y oscuro a propósito (el monitor que contesta solo); las tarjetas no se leen ahí.
- Lucas aparece solo en Q3b (no en la parte 1).
- La línea del Q3 pasa de la barra del balance a "Para vos" (la barra vuelve entera en 100 % en Q3b).
- Render final no hecho (lo hace el coordinador).

## Ronda 1 de corrección (26-11, guion + sonido + arte) · sin render
**44,8 s.** Parte 1 0-17,3 · cartel 17,3-19,55 · parte 2 + cierre 19,55-44,8 = 25,25 s (56 %) · cierre C 41,46-44,8 (tarjeta
CONSULTAS desde 41,90 = 2,9 s; línea chica desde 43,4; el reel termina 0,15 s después de la voz).
Planos (s): P4 8,10 · P4b 11,68 · P5 12,63 · P5c 16,45 · Q1 19,55 · Q2 21,82 · Q2m 24,51 · Q2b 25,48 · Q3 26,29 · Q3n 27,21 · Q3r
27,91 · Q3b 28,87 (inserto 100 %) · Q3l 29,36 (Lucas) · Q3a 30,99 (Adriana) · Q4 32,20 · Q4j 35,34 · Q4i 35,84 · Q4a 37,10 · Q4c
39,59 (contraplano "Sí. Un amor.") · C 41,46.
Mezcla (MEDIR=1): voz ≥ +12,6 LU sobre el resto (pareado); efectos sin voz máx -31,0; -14,0 LUFS, pico -2,7 dBFS. Cama: mediana del
resto -34,3 LUFS sin voz y -35,6 bajo voz (antes ~-60: los ducks superpuestos se MULTIPLICABAN; ahora las ventanas de voz se
unen y el duck es 0,25). Corte de la música en "veintitrés": -34,8 → -44,4 (≈ 10 dB; brasas y pájaro más bajos en la pausa).
`check --json`: 0 errores. Snapshots: renders/snap/r1f (cada 0,5 s), renders/prev/r1*.
- Guion: "¡Uh, qué rápido! Gracias, Adri." (toma nueva 10-d, hueco 1,52-2,03, atempo 1,06): "¡Uh, qué rápido!" en el inserto
  Q2 (burbuja arriba, el celular al 72 %), "Gracias, Adri." en Q2m. descripcion.txt "63 consultas en una semana, siempre las
  mismas 3 preguntas". La respuesta del agente es la MISMA (RESP) en Q1 y Q2. BALANCE ANUAL. Walter: "Llegaron 12 ✓ · / falta el
  recibo del alquiler" (tarjeta de dos renglones). Orden de las tarjetas Graciela, Marcelo y Walter (entra en Q3n, miércoles
  23:40). "Para vos (2)" con la segunda tarjeta asomando. Contador 4 → 38 → 52 → 63. El celular de Adriana en el patio con la
  pantalla hacia ella y sin el "Sí, Walter, llegó.". guion.txt y fuentes.md al día. Portada: el sello sigue ESTUDIOS
  CONTABLES (contable-papeles lo usó igual); fondo nuevo t 11,4 (portada-src/fondo-limpio-11.4.png).
- Sonido: w1 = 04-walter-f con 50 ms antes del arranque (el STT oye "te llegó"); "¿Ya?" +2,5 dB; pausas a2 = fin(j1) + 0,65 y
  a5 = fin(j1b) + 0,38; "CONSULTAS" de la tarjeta a 0,36 s de la toma (palabras-a7.json degenerado); a7 atempo 1,12. SFX
  nuevos (del repo): golpe suave del rubro (madera-tabla, pasabajos), loza de cada taza (k-plato-001), ticks de la barra 64 → 100
  % y ding del "Terminado ✓". Q1/Q2, Q4j y la bandeja Q3 bajados 1-3 dB (techo).
- Arte: Jorge con la pinza SIEMPRE a la altura del pecho del lado de la parrilla (manoD en el espacio del cuerpo, la pinza con
  dos brazos abiertos y el chorizo entre las puntas): no barre la cara ni tapa la boca; después de "Ahora." baja y desde Q4j
  el chorizo ya no está. El celular de Jorge apoyado delante de la palma; lo lee también en Q4a. Colas de burbuja solo hacia
  abajo (la invertida era el zigzag). Q3b partido: inserto del monitor con 100 % · Terminado ✓ grande + Lucas (Q3l) + Adriana
  con el monitor (Q3a). Q4a: Adriana de frente, Jorge entero leyendo; Q4c contraplano. Adriana de frente en P3, Q2b y Q3a (sin
  "cíclope"). Q3: el push-in arranca de una vista 3/4 del monitor con la tarjeta de Graciela entrando, sin Adriana ni el
  celular del soporte en el inserto. Q3n: el monitor ≥ 55 % y luz de pantalla sobre el escritorio. Tarjetas del cierre 90 px
  más arriba (la línea chica termina en y ≈ 1670). Q1: rótulo "Contestó el agente de IA ✓" (0,6 s). Q2 con la panadería
  detrás (Marcelo sostiene el celular más alto: el mostrador ya no lo tapa). C: más lejos y fov 40, Jorge fuera de cuadro.
  P5c: el celular más arriba (las manos no se hunden en la ensaladera), la ensaladera más lejos.
- Quedan / dudoso: el pedido "voz 12-15 LU sobre el resto" no es compatible con el techo de -31 por efecto: la voz momentánea
  ronda -5,5 LUFS, así que 12-15 LU pondría la cama en -18/-20. Dejé la cama audible al techo (-34 sin voz) y la voz a +12,6
  mínimo / ~+30 mediana. En P4 la pinza apunta a la parrilla: el chorizo se lee contra los de la parrilla en el plano general.

## Ronda 2 de corrección (26-11) · sin render
**44,73 s.** Parte 1 0-17,2 · cartel 17,2-19,42 · parte 2 + cierre 19,42-44,73 = 25,3 s (57 %) · cierre C 41,39 (tarjeta desde
41,83, línea chica desde 43,33). `check --json`: 0 errores. Snapshots: renders/snap/r2, r2b.
- **El primer audio de Marcelo no sonaba** (ronda 1): el comentario `// (r1) el golpe suave del rubro` había quedado delante de
  `tuc(...); voz("m1", ...)` en la misma línea; también el roce de la silla de Lucas. Revisé con un script todos los
  comentarios con código detrás en gen.mjs y tres.js (y uno más que se comía el `.filter` del duck). Stem de voz en 0,2-1,6 s:
  -17 a -14 LUFS.
- Mezcla: sin compresor en el bus (aplastaba la cama cuando hablaba alguien; cada voz ya va comprimida) y sin duck bajo la
  voz. Como la ganancia final pasó de +7 a -1,8 dB, todos los techos se corren OFF = 8,7 dB (los niveles relativos quedan).
  MEDIR=1: cama -34,7 LUFS bajo la voz y -34,5 sin voz (medianas), voz -14,2 (mediana) → +20,5 LU de mediana, mínimo +9,6 (la
  cola de "Ahora." a 35,5 s). Efectos sin voz máx -31,0. -14,0 LUFS, LRA 4,8, pico -3,7 dBFS.
- El corte seco de la música cae sobre una nota sostenida del loop (`desde` calculado para que el corte coincida con 9,92 s
  del archivo): -33,5 → -44 (≈ 10,5 dB).
- Pausa antes de "Ahora." 0,65 s (igual que antes de "El veintitrés."). "Contestó el agente de IA ✓" en el chat de Q1.
- Q3b: la barra llega a 100 % en 0,18 s y "100 % · Terminado ✓" queda ≈ 0,85 s; abajo, Bar Walter "72 % · en curso" en gris que
  pasa a 100 % ✓ en "Y el de Walter.". Ticks + ding al llegar.
- Todos los globos y rótulos entre y 200 y 1650 (límite en ponerGlobo). Q2: el celular más chico y más arriba (burbuja "¡Uh, qué
  rápido!" arriba de 200, rótulo abajo de 1650). Q3/Q3r: el monitor termina en y ≈ 1490 y "Lo de fondo…" entra abajo.
- P5/P5j/Q4j sin Adriana detrás de la cabeza de Jorge. El celular de Jorge sale por delante del delantal. Desde Q4j Jorge ya
  no tiene la pinza (colgando parecía un bastón). Q3: la tarjeta de Marcelo entra a los 0,25 s. Q3a y Q4a con los bordes
  libres. Lucas casi de frente (la lente ya no flota). Cierre sin la tira de Jorge y la cabeza un poco levantada (la punta de
  la melena tocaba el hombro). P4: push-in desde más abierto (2,85 → 2,4 m), la pinza entra en cuadro.
