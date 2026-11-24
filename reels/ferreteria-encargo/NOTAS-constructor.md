# ferreteria-encargo · notas del constructor (19-11)

Proyecto copiado de corralon-portland: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita nueva sobre la base técnica de corralon:
tarjetas pegadas a la cámara, avatares por render target, poses por claves, bocas por envolvente, PLANOS Catmull-Rom,
insertos a pantalla). `assets/personajes.js` = la copia de corralon sin cambios: Gustavo y Tito se arman en tres.js como en
corralon; Susana (nueva) con parámetros existentes (peinado texturado canoso + mechones chatos de volumen, saco = campera
abierta verde #365f28, anteojos colgados del cordón, cartera navy al hombro).

## Comandos (desde reels/ferreteria-encargo)
```
TOMAS="a b c" bash partes/reintentar.sh                       # tomas (partes/lineas.tsv)
LINEAS=partes/lineas-r.tsv TOMAS="d e f" bash partes/reintentar.sh   # retomas de 01, 08 y 10
bash partes/medir-tomas.sh                                    # recorta a partes/rec/ y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                                       # assets/voice/ desde las tomas elegidas
node gen.mjs                                                  # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin tarjetas
python3 medir.py                                              # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                                    # snapshots de hyperframes con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x        # solo la capa 3D (FULL=1 a 1080)
flock /tmp/hyperframes.lock node prev2.mjs "t@px,py,pz,mx,my,mz,fov[,1] …" renders/prev/x   # cámara por cuadro (",1" = vista desde arriba)
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/ferreteria-encargo.mp4
bash paso10.sh                                                # paso 10 (loudnorm en dos pasadas) → renders/ferreteria-encargo-final.mp4
```

## Voces (partes/procesar.sh)
s1 01-susana-a (Vindemiatrix; pausa tras "Gustavo," a 0,07 s, atempo 1,14; P1 y Q1) · g2 02-gustavo-a (Alnilam; pausa a
0,14, atempo 1,08) · g3 03-gustavo-a ("Dejame tu número.", la MISMA toma en P1b, P5, Q1 y Q5) · t4 04-tito-b (Enceladus,
atempo 1,04; P2 y Q2) · s5 05-susana-a (pausa a 0,12, atempo 1,1) · g6 06-gustavo-a ("Elegí.") · s7 07-susana-a · s8
08-susana-a (P5 y Q5) · s10 10-susana-d · s11 11-susana-a · g12 12-gustavo-c (atempo 1,07) · narrador = reels/ya-lo-cargo
(Rasalgethi, "un sistema más tarde"). "oyó:" igual al texto salvo lo que el STT no separa: "¿Me encargás este?" lo oye
"me encargaste te" en las 6 tomas (las dos palabras pegadas; se oye bien), "Comentá ENCARGO" → "Comenta encargo" (el STT no
pone tildes), "Déjame" con tilde (es "Dejame", acento del STT).

## Duración
43,7 s. Parte 1 0-17,88 · cartel 17,88-20,26 · parte 2 + cierre 20,26-43,73 = 23,5 s (54 %). Cierre (C) desde 40,48,
"Comentá ENCARGO" desde 40,88, línea chica el último 1,35 s. Más largo que los 40,8 del plan: las tomas de Susana son más
largas (01 = 3,0 s con atempo 1,14); P2, P3, Q1-Q5 ya apretados.

## Mundo / planos
Galpón de corralon con el portón corrido a la derecha (fuera de cuadro), pared del frente con una góndola de pinturas
(detrás de los clientes), pared de 48 cajoncitos detrás de Gustavo (el "8" sale), panel perforado con blísteres, caja
registradora crema girada (-0,6) con el papelito en su frente del lado de Gustavo, rollo kraft con cuchilla dentada, cajón
ENCARGOS que sube de abajo del mostrador. Cocina de Susana en x = 30.
Planos: P1 por encima del hombro de Susana (= Q1, P4, Q5) · P1i inserto del calibre "35" · P1b las manos desde arriba
(cámara con el +z arriba de la pantalla; = P5b) · P2 al lado de Gustavo, hacia la cara de Tito, la caja con el papelito
adelante (= Q2) · P2i el cucurucho (= Q2i, papel en blanco) · P3 desde la punta del mostrador: Gustavo con el blíster, la
caja con solo la cinta y el resto de papel, el cajón (= Q3) · P4 push-in al cajón inclinado ("Elegí.") · P5 contraplano a
Susana · Q1t/Q3t/Q4 la tablet a pantalla · Q1c/Q3c el celular de Susana a pantalla · Q3k/Q3s la cocina · C Gustavo a cámara.

## Mezcla
Como corralon: techo -31 por efecto, bus +6 dB → limitador → -14 LUFS. SFX nuevos CC0 de BigSoundBank (cinta, papel
rasgado, cajón de madera, cajoncito metálico, clavos que caen); ver fuentes.md.

## Pasadas
- Armado (prev.mjs / prev2.mjs, renders/prev/a-k): el cuadro 0 sin Susana → cámara por encima de su hombro derecho y la
  bolsita levantada a la altura del pecho de Gustavo (escondida detrás del antebrazo → arriba de la mano, 1,25×); un
  albañil con casco crema tapaba la cámara del cuadro 0 → los de la fila solo en los contraplanos (P2, P5); P1b con el
  texto al revés → plano cenital con el +z arriba (se lee como lo escribe Gustavo) y la punta del lápiz siguiendo la letra;
  P2 desde el lado del cliente mostraba a Tito de nuca → cámara al lado de Gustavo hacia la cara de Tito, con el papelito en
  el frente de la caja (lado de Gustavo) en primer término; P3 desde atrás no mostraba la cara → desde la punta del
  mostrador, la caja girada -0,6 deja ver la cinta y el resto de papel; el calibre atravesaba el cartucho → bocas largas,
  el cartucho entre las bocas y la regla arriba; el inserto del cucurucho tenía las manos de Tito delante → Tito oculto en
  los insertos; P4 con el cajón chico → push-in al cajón inclinado; galpón sin pared del frente (contraplano con fondo
  crema) → pared de chapa con góndola; Susana y Tito "fuera" se veían en P3 → a x = 12; cocina: Susana tapaba todo →
  cámara contra la pared, canilla con la gota a la derecha y Susana a la izquierda; cierre demasiado cerca → más lejos.
- Pasada 1 (snapshots cada 0,5 s desde 0, renders/snap/p1): el "?" tapaba la cara en P3 → arriba a la izquierda; los
  globos de P4 sobre la frente → más arriba; Susana asustada en "¡Llegó lo mío!" → sonrisa abierta; Gustavo con los
  ojos cerrados en el primer cuadro del cierre → el parpadeo a mitad de la frase; chat de Q1c con medio celular vacío →
  historial ("AGOSTO"); el pulgar tapaba el texto del chat → sin pulgar; texto que se salía de la burbuja verde → 4
  renglones; fuentes de la tablet más grandes (inserto 0,86).
- Pasada 2 (snapshots cada 0,5 s desde 0,25, renders/snap/p2): "Ya lo compré." con cara de preocupada → sonrisa amable;
  "Guardado" pisaba su tilde; Susana cortada en la cocina → encuadre corrido.

## Render y portada
`hyperframes render --workers 2` (SwiftShader, con el candado): **32 min 25 s** para 43,8 s; paso10.sh: ~2 min.
Final: renders/ferreteria-encargo-final.mp4 (43,88 s), -13,9 LUFS integrado, pico -6,4 dBFS (true peak -6,8), sin
clipping. medir.py: voz ≥ +6 LU sobre el resto en todos los tramos de 0,5 s salvo 25,0 s (-4,7): es la cola de la ventana
de 400 ms ("Dejame tu número." ya terminó en 24,68 y entra el toque/ding de "Guardar"). Hoja del final: renders/hoja.png
(coincide con los snapshots). `check --json`: 0 errores.
Portada: fondo LIMPIO de P4 a 13,9 s con cámara propia más abierta (Gustavo con el cajón ENCARGOS inclinado y las piezas sin
nombre, la cabeza de Susana a la izquierda; cámara en portada.json → "cam"), `portada-src/fondo-limpio.png`. chica "Tres
semanas después.", grande "¿Llegó lo mío?", sello FERRETERÍAS.

## Flojo / para los revisores
- 43,8 s (plan 40,8): las tomas de Susana son más largas.
- Susana de espaldas en P1/Q1/P4/Q5 es un primer término grande (cabeza y brazo verde a la izquierda); su cara se ve en
  P5, la cocina y Q5 de perfil.
- P5 (contraplano a Susana): asoma el hombro de Gustavo al borde derecho y arriba de P1b/P5b asoman cabezas de clientes.
- El papelito pegado se lee grande solo en P2 (en el frente de la caja, ~90 px) y en el inserto P2i; en P3 la cinta y el
  triangulito de papel son chicos (la caja en primer término a la izquierda).
- El cucurucho del inserto: los tornillos caen grandes (1,5×) y en el último cuadro el cono ya se lee "SANA / TUCHO".
- "Elegí." queda pegado arriba de la cabeza de Gustavo (le roza el pelo) por el push-in.
- La gota de la canilla es chica en el plano de la cocina.

## Ronda 1 de corrección (3 revisores)
**45,47 s.** Parte 1 0-19,10 · cartel 19,10-21,48 · parte 2 + cierre 21,48-45,47 = 24,0 s (53 %). Cierre (C) 42,25-45,47
(3,2 s; g12 atempo 1,09, 0,15 s de cola). Más largo por la toma nueva de s8 (1,9 s) y la pausa antes de "Ya lo compré.".
- Rótulos de la parte 2: la parte sin recuadro en crema (textoSel con tinta propia para el texto plano).
- Lápiz de carpintero detrás de la oreja (ya no llega al ojo en P3/Q3).
- Tito: al recibir el cucurucho la mano va al borde del mostrador y después baja delante de la panza (no cruza la cabeza).
- Tornillos a 0,55× (antes 1,5×), caen por el eje del cono y quedan adentro siguiéndolo en la mano.
- El cucurucho gira de cara a la cámara de P2 al pasar a la mano ("SUSANA" derecho); el papelito pegado se lee derecho.
- Una sola vez el cartucho: al agarrarlo, en el mostrador queda la bolsita vacía.
- La bolsita del cuadro 0 más abajo y al costado: ya no tapa la cara.
- "¿Me encargás este?": toma nueva 08b-susana-c ("¿Me encargás... este?", pausa interna a 0,12 s, atempo 1,16; STT "me
  encargas este"); la bolsita del FLOTADOR levantada en cuadro (P5 y Q5), más grande.
- Cajón: las 9 piezas en grilla 3 × 3 (1,15×), "ENCARGOS" entero (más alto en P4, push-in corrido para que no lo tape la
  cabeza de Susana).
- Tablet vertical en el mostrador en toda la parte 2 (también en reposo, con "Encargos"); oculta solo en Q2 (tapaba a Tito).
- Insertos de la tablet verticales (940 × 1344 px, 70 % del alto), textos ≥ 44 px; globo arriba, rótulo abajo.
- "Ferretería Gustavo" en el cartel del galpón, la tablet y el chat; sin el mensaje de AGOSTO; chat anclado arriba.
- Cocina: Q3k es la canilla entera goteando en primer plano; Susana en Q3s.
- P1b termina al pegar (sin mostrador vacío); P2 algo más abierto (el papelito entero).
- Cajón de Q5: LUCÍA · LLAVE 3/4 y OMAR · BISAGRAS x4; la bolsita SUSANA · CARTUCHO 35 a 1,45×.
- Mezcla: la cama +9 dB (duck -2,0) en los tres tramos sin voz y los efectos ahí al techo -31; pausa de 0,3 s antes de
  "Ya lo compré." y el cajón se cierra de golpe (bsb-cajon-madera + madera-golpe); tic en el chip de Q1 y pop en los
  rótulos de Q1t, Q3t y Q4.
- Bajas: cartel del galpón más alto (no asoma), "Elegí." arriba a la derecha y el chip "Tres semanas después." se va con
  él, globos de Q5 arriba de la cabeza, brazo de Susana doblado al señalar.
- Portada: fondo con VER=portada (Susana oculta).
- No hecho: medir.py sigue marcando +0,5 en 34,5 s (cola de la ventana de 400 ms: "¡Llegó lo mío!" ya terminó en 34,18
  y entra el whoosh del panel).

## Ronda 2 de corrección (3 revisores)
**46,1 s.** Parte 1 0-18,98 · cartel 18,98-21,36 · parte 2 + cierre 21,36-46,10 = 24,7 s (54 %). Cierre (C) 42,88-46,10.
+0,6 s: Q5 partido en cinco planos y la pausa antes de "Ya lo tenés."; se recortó Q1c (-0,12), Q4 (-0,25) y P1b (-0,22).
Q5: Q5 (cajón + bolsita, 36,29) · Q5f contraplano a Susana con el flotador (37,69) · Q5g Gustavo "Dejame tu número." (39,82)
· Q5s Susana de frente "Ya lo tenés." (41,17, voz 41,29) · Q5r Gustavo se ríe + tablet "Nuevo encargo" (42,10) · C 42,88.
medir.py: voz ≥ +10,3 LU sobre el resto en todos los tramos. Mezcla -14,0 LUFS, pico -6,4 dBFS. `check --json`: 0 errores.
- A1: sin el dedo levantado. Susana dice "Ya lo tenés." en un contraplano de frente (Q5s), pícara, con la cabeza hacia la tablet.
- A2/A3: la vuelta del inserto del cucurucho (P2 y Q2): el cucurucho espera parado en el mostrador ya de cara a la cámara (no se
  da vuelta ni se lee espejado), la mano DERECHA de Gustavo (lejos de la cámara: ya no hay brazo pegado al lente) lo agarra y desde
  ahí va pegado a la mano hasta la de Tito. Además Tito se posa antes que Gustavo y la punta del lápiz sale de una pose fija
  (antes ambos leían la pose del cuadro anterior: no era función pura de t).
- M1/M2: la bolsita del flotador cuelga del nudo con la mano a la altura del hombro (al costado de la cara, no delante), nylon
  al 24 %, flotador entero adentro; se levanta solo en los contraplanos (P5c, Q5f) y se baja en el corte (P5b, Q5g). La bolsita
  SUSANA · CARTUCHO 35 queda parada en el mostrador delante de Susana; el rótulo apunta a ella (ya no al pelo).
- M3: P1b con el lápiz visible (la mano más atrás que la punta, lápiz 1,25×) y corta al terminar de escribir (el pegado se ve en
  P2: sin la mano suelta de 6,2). P5b ya no es cenital: Gustavo de frente ya arrancando papel (CG).
- M4: Susana con flequillo ondulado sobre el borde del casco; solapas más gruesas y saco 3,5-5 % más afuera (sin dientes blancos).
- M5: la tablet chica muestra el formulario vacío hasta el inserto.
- M6/M7: Q5 partido (ver arriba); 0,42 s de pausa antes de "Ya lo tenés."; Gustavo se ríe cuando ella termina (Q5r, 0,78 s).
- B1 el papelito se despega de cara a la cámara de P2 · B2 tornillos más juntos y más arriba en el cono · B3 caen desde más cerca
  y sin el globo de Tito en los insertos · B4 globos más arriba (s1, g2, s5, Q1) y "Elegí." con la cola al costado; P5b/Q5g con la
  cámara más alta sobre la cabeza · B5 sin albañiles en P5 · B6 sin latas verdes en la góndola (la mota del borde) · B7 chat más
  bajo, texto 60 px, sin la "mano", más margen para la tilde · B8 píldora más alta · B9/B18 guías a puntos de la tablet sin texto;
  cajón con LUCÍA · LLAVE 3/4, OMAR · FLEXIBLE x2, BETO · TARUGOS x50 y panel Susana/Lucía avisadas, Pereira retirado · B10 el
  texto del cartel se va antes del barrido · B11 tablet en reposo navy con "Encargos" y "+ Nuevo" enormes · B12 portada: fondo
  subido 130 px (ENCARGOS arriba del texto) · B13 inserto del calibre en Q1 (Q1i) y P5 partido (P5c) · B14 click del calibre,
  rasgado, cinta, cajoncito y cajón de "Elegí." más fuertes (forzar, fuera de la regla de la cola de la voz) · B15 la cama sube en
  Q1c y hasta "¿llegó lo mío?" · B16 s11 desde la toma sin recortar el final + fundido de 80 ms · B19 "Recordatorio jueves ·
  programado" con reloj · B20 "Llega: el martes" · B21 inserto Q2i +0,2 s.
- No hecho: B17 ("¡Llegó lo mío!"): 10-susana-d ya es la toma que el STT oye bien sola; las otras son "seguro mío" o más largas.
  B16: la toma de Gemini termina justo en la "s" (no hay más audio que recuperar): queda con el fundido. B22: no se pudo acortar
  más sin perder la pausa y el contraplano pedidos (46,1 s).

## Ronda 3 de corrección (3 revisores)
**46,07 s.** Parte 1 0-18,85 · cartel 18,85-21,23 · parte 2 + cierre 21,23-46,07. P1b→P2 en 6,15 (pegado en el corte);
inserto del cucurucho 7,29-7,76; "¡Llegó lo mío!" +0,1 s (33,0); risita de Gustavo en Q5r (42,05).
- R1: el papelito queda quieto en el mostrador hasta el corte y P2 arranca con él ya pegado en la caja y la mano de Gustavo
  sobre él, que después se retira.
- R2: corte al inserto 0,12 s después de agarrarlo (antes 0,25): el papel no se despega flotando ni queda el puño cortado.
- R3: la bolsita del flotador es apaisada (0,31 × 0,135), apoyada en la mano a la altura del pecho, centrada, nylon al 36 %, el
  flotador a 1,35× (bolsita a 1,25×) con la bocha y la varilla enteros; se ve solo en P5c y Q5f; el contraplano apunta más abajo
  (CF2) para que entre. Ni la bolsita del cartucho ni el cajón están en Q5f/Q5s (tapaban el flotador y confundían).
- R4: cuando Susana habla el labio se aplana sobre la boca abierta (sonrisa → 0,04 según cuánto abre): una sola boca.
- R5: sin los anteojos colgados (el "OC").
- R6 bolsita SUSANA más honda (el cartucho no atraviesa la etiqueta) · R7 sin el albañil de gorro verde · R8 lápiz navy, 1,6× y la
  mano más atrás (se ve con la punta en el papel) · R9 (ver R3) · R10 el texto del cartel se va cuando arranca el barrido · R11
  celular de Q1c más bajo (860 px) · R12 en el cajón del miércoles solo las 3 avisadas (SUSANA, LUCÍA · LLAVE 3/4, OMAR), grandes
  y de frente · R13 "Ya lo compré." con ojos abiertos y sonrisa leve · R14 risita de Gustavo (toma nueva Alnilam "Je, je.",
  partes/tomas/13-gustavo-b → assets/voice/g13.wav) y el toque/pop de "Nuevo encargo" forzados · R15 rasga() y cajoncito()
  aceptan opciones (forzar) · R16 tono de sala a -39 (los huecos del pizzicato quedan en -36/-41 en vez de -43/-46).
- Bug de mezcla encontrado: la regla "sin voz: cada efecto al techo -31" subía también sonidos largos que seguían sonando debajo
  de la voz siguiente (el zumbido de la cocina debajo de "¡Llegó lo mío!"): ahora solo si terminan 0,4 s antes de esa voz.
- No hecho: R17 ("Elegí."): las tomas a y b el STT las oye "elegí" solas; queda la a.
- Los stems de medición ya no se commitean (.gitignore del reel). medir.py: ≥ +16,1 LU; -14,0 LUFS, pico -6,2 dBFS; check 0 errores.
- Pasada de snapshots cada 0,5 s (renders/snap/r3p) + cortes tocados (r3a): sin defectos nuevos. Portada sin cambios (su fondo es P4).
