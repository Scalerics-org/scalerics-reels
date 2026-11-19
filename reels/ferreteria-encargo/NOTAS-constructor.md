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
