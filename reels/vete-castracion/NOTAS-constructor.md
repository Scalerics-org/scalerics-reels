# vete-castracion · notas del constructor (27-11)

Proyecto copiado de `reels/vete-racion` (personajes.js, perro.js, infraestructura de tres.js: tarjetas pegadas a la
cámara, globos, rótulos, guías, insertos, render targets; gen.mjs con la mezcla) y de `reels/taller-service` (medir.py,
snap.sh, hojas.sh). Todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena entera está en `assets/tres.js` (se edita directo; se armó concatenando las piezas
de `partes/tmp/t_*.js`, que ya no se usan).

## Comandos (desde reels/vete-castracion)
```
TOMAS="a b" bash partes/reintentar.sh     # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre && ./hojas.sh renders/snap/nombre
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D
bash paso10.sh                            # paso 10 después del render (renders/vete-castracion.mp4 → -final.mp4)
```
OJO: después de `LIMPIO=1 …` o `VER=cam:… node gen.mjs` volver a correr `SINAUDIO=1 node gen.mjs`.

## Duración: 53,27 s (más largo que los ~44 del plan)
Parte 1 0-22,90 · cartel 22,90-25,43 · parte 2 + cierre 25,43-53,27 = 27,8 s (52 %) · cierre C 49,19-53,27 (línea chica
desde 52,17). Las 16 tomas suman ~25 s de voz aun con atempo; ya se recortaron los tiempos muertos (montaje P2 con 0,12 s
de cola por chip, pausa de P4 1,25 s, insertos 1,3-1,4 s). Si hay que acortar más: el plano Q2 (Inés cruzando, 0,85 s),
Q4c ("Nadie." en plano propio), el inserto Q4i, o subir atempo a b5/i16.

Planos (s): P1 0 (cuadro 0: VETERINARIAS + chip, el teléfono ya suena) · P1b 3,38 (por encima del hombro de Bruno: Vero
saluda en la vereda) · P2a 4,18 / P2b 5,42 / P2c 6,66 (10:30, 12:00, 14:00; contador 2 → 13 → 27; la señora se va) · P3
10,07 (15:30 sala) · P3b 12,57 (Inés de gorro) · P3c 13,82 (Bruno) · P4 14,98 (la pausa, rótulos 34 llamadas / $ 4.500)
· P4b 16,63 (primer plano: el auricular en la oreja de Toto, ronca 17,03, "¡Ay, mi amor!" 17,78) · P5 19,30 · P5i 19,65
(inserto PAPÁ DE COCO) · P5b 20,40 ("Ahora el de Coco." y travelling a Coco que ronca 22,05) · cartel · Q1 25,43 · Q1i
26,68 · Q1b 28,08 · Q2 30,37 · Q2i 31,22 · Q3 32,87 · Q3k 34,12 · Q3i 34,62 · Q3v 35,87 · Q4 37,45 · Q4b 39,74 · Q4c 41,75
· Q4i 42,62 · Q5i 44,07 · Q5 45,42 (Vero entra, "¿Cómo está Toto?", "Preguntale a él.", Toto trota 47,52, ladra 48,59) · C
49,19.

## Voces (partes/procesar.sh; las mismas de vete-racion)
Vero Callirrhoe · Bruno Schedar · Inés Sulafat · narrador Rasalgethi (toma nueva 11-narrador-b, atempo 1,1 → 2,38 s).
Tomas: v1 01-vero-b · b2 02-bruno-b (1,06) · b3 03-bruno-c · b4 04-bruno-a · b5 05-bruno-b (1,2) · b6 06-bruno-a (1,05) ·
i7 07-ines-a · b8 08-bruno-a · v9 09-vero-a · b10 10-bruno-a · v12 12-vero-d · i13 13-ines-g (tono nuevo, "bien
articulado"; las a-f el STT las oía "llamosa y m", "somos Alien") (1,04) · b14 14-bruno-b · b15 15-bruno-d · i16
16-ines-a (1,1). Mismos archivos en las dos partes: v1 (P1 por teléfono, Q5 en persona), v9 (P4 por teléfono, Q3 en
altavoz), b10 (P5 y Q4); el filtro de teléfono (300-3300 Hz, -4 dB) / altavoz (220-5200 Hz) se pone en la mezcla.
"oyó:" de los finales en partes/tmp/oyo-final.txt: todos bien salvo variaciones del STT ("cómo está todo", "oral de
coco", "Quiero hablar"; las tomas crudas los oían bien). "AVISOS" cae a 0,66 s de i16. No se escucharon.
No se cambió ninguna línea del guion.

## Mundo
- Recepción (x = 40): mostrador al centro; la pared del fondo es azulejo a la izquierda (pizarra CIRUGÍAS · JUEVES con
  los 6 nombres en Caveat, solo en la parte 1; el cartel VETERINARIA INÉS) y VIDRIERA a la derecha con la puerta de calle;
  afuera la vereda, el cordón, un árbol low-poly y la casa de enfrente crema. Vidrio apenas celeste (opacidad 0,22, sin
  reflejos). Puerta de vaivén QUIRÓFANO en la pared izquierda (abre hacia el quirófano). Dos sillas de espera contra la
  vidriera. El inalámbrico: base crema con luz que titila al sonar, auricular navy3 1,35× (antena, pantallita verde con
  el nombre: VERO / PAPÁ DE COCO, teclado crema) y tres pares de arcos crema cuando suena. Va pegado a la oreja derecha
  del que habla (enOreja) y la mano lo sigue por IK.
- Sala de recuperación (x = 80): pared navy/azulejo, dos camillas de acero con manta y pliegue, lámpara de calor (luz
  puntual), el vano a la recepción (izquierda) y la puerta QUIRÓFANO con ojo de buey (derecha). Sin instrumental ni sangre.
- Cocina de Vero (x = 0): la de vete-racion, de día.
- Collar isabelino: cono truncado crema (opacidad 0,88) con borde navy grueso en las dos bocas y la tira de cierre abajo,
  pegado a la cabeza de Toto y de Coco (abierto hacia el hocico). Toto lo tiene desde P3 (no en P1/Q1, antes de operar).
- Dormidos: echados, ojos con escala 0,12 y sin el brillo (se leen como dos líneas), respiración (el torso sube y baja),
  el hocico se infla y las orejas tiemblan con la envolvente del ronquido. Q3: Toto levanta la cabeza, ojos a media asta.
- Inés de cirugía = segunda instancia (inesQ) con el pelo oculto, gorro verde apagado (casquete con vincha y moño),
  guantes de látex crema (material de las manos), barbijo celeste pálido bajo el cuello. Q4b se saca el guante izquierdo
  (la mano vuelve a piel y el guante queda colgando en la derecha).
- Fotos de los avisos: render target del mismo Toto (sentado en el mostrador; dormido con el collar). Avatares del panel:
  Toto y Coco 3D, los demás perfiles planos.
- Interfaz (canvas): aviso Ingresó / Despertando (video con ▶, barra y 0:0x) / Listo (indicaciones + recorrido de
  etapas), panel "Pacientes de hoy · 6" (etapas, toque, "Aviso a … enviado", "Llamadas hoy 34 → 3" que gira, "Consultas
  atendidas ✓"), la pantallita grande PAPÁ DE COCO. Textos ≥ 36 px en el inserto.

## Mezcla
`MEDIR=1 node gen.mjs`: -14,0 LUFS, pico -5,5 dBFS; mediana voz-resto 29,6 LU, mínimo +8,8 LU en tramos con voz;
huecos sin voz máx -31,7 LUFS (la notificación de Q1 bajada a -36,5). Ronquidos con `libre` (-31,5 en P4, -35 Coco, -34
por el altavoz en Q3). Música (pizzicato) que baja en la pausa de P4 y vuelve con el ring de P5.

## Pasadas
- Armado (prev.mjs, 6 vueltas): el gorro salía como una esfera gigante (el helper mesh no aceptaba escala: ahora sí) ·
  P1 Vero parecía adentro → vidrio celeste, vereda y Vero más lejos · el teléfono de la base fuera de cuadro → base al
  lado de Bruno · P1b la cámara dentro de Bruno → por encima del hombro · Toto en Q1/C aparecía parado en el piso → sentado
  en el mostrador · el isabelino enorme y la oreja de Toto: cono más chico (0,125-0,245 × 0,22) · P4b no se veía el
  teléfono → primer plano frontal (el auricular en la oreja, el guante) · ojos dormidos con brillo → sin brillo · Inés
  tapada detrás del cono → Inés detrás del cuerpo, no de la cabeza, cámara más alta, cabeza menos baja.
- Pasada 1 (renders/snap/pasa1, cada 0,5 s): P3b la cámara detrás de la nuca de Inés → contraplano de frente, mirando a
  Bruno · P4 Bruno e Inés encimados → Bruno a la izquierda de la camilla · Q2 cámara dentro de Inés → plano general ·
  Q4 la señora fuera de cuadro → cámara más abierta · Q4b la mano asomando por la puerta cerrada → la puerta abre hacia el
  quirófano antes de que salga · Q4i "Consultas atendidas" cortado → filas más bajas · Q5 Vero de espaldas → cámara desde
  la izquierda, Vero de 3/4 · burbuja de "¿Cómo está Toto?" pisada por "Preguntale a él." → se va antes · cocina: cámara
  más lejos.
- Pasada 2 (pasa2): pizarra cortada en el borde → más adentro y cámara corrida · P4/P5b Bruno cortado a la izquierda →
  cámaras corridas · P5b travelling a Coco cuando ronca (la burbuja de Bruno se va antes) · Q3 Bruno cortado → cámara
  propia · fotos de los avisos más altas (la mitad de abajo del celular quedaba vacía) · Q3v el celular tapaba la boca →
  más abajo.
- Pasada 3 (pasa3) + vueltas sueltas (prev/j, prev/k): Q5 Vero cortada a la derecha → cámara; la puerta del quirófano.
  `check --json`: ok, 0 errores (3 warnings de siempre: capa3d, clip_ends_past_root de s05/s09).
- Portada: `portada-src/fondo-limpio.png` = 18,5 s con LIMPIO=1 y cámara propia (ver portada.json); sello arriba (300 px),
  "¿Cómo está Toto?" abajo. portada.mjs pide el mp4: se generó con un mp4 negro de relleno (borrado después).

## Flojo / para los revisores
- 53,3 s (el plan decía ~44).
- Inés de cirugía: el gorro se lee más como un casco/gorro redondo que como gorro de tela; el barbijo casi no se ve; en
  P4b y en la portada Inés queda de perfil/espaldas (se ve el gorro y el guante, no la cara).
- P1/P2: plano general con los personajes en el medio y el frente del mostrador abajo; Bruno con la mano en la oreja (el
  auricular se ve chico en el general). 14:00: Bruno con la frente en el mostrador (se ve la coronilla).
- P1b: el brazo de Bruno con el auricular ocupa el primer plano a la izquierda.
- El vaivén del quirófano en la recepción abre hacia adentro de la pared (en Q4b/Q5 se ve el vano, no la hoja).
- Coco en P3-P5 es chico al fondo; se ve grande solo en el travelling final de P5b.
- Q2: Inés de espaldas cruzando hacia el quirófano.
- No se miró a 30 fps alrededor de los cortes ni se renderizó el mp4. Las voces no se escucharon.

## Ronda de duración (pedido del coordinador, 27-11) · 53,27 → 46,97 s
Parte 1 0-21,08 · cartel 21,08-23,43 · parte 2 + cierre 23,43-46,97 = 23,5 s (50,1 %) · tarjeta "Comentá AVISOS" desde
44,0 (arranca sobre "AVISOS"), 3,0 s · línea chica desde 45,92. Diálogo sin cambios.
- Voces: recorte a -45 dB (antes -38); atempo b2 1,12 · b5 1,3 · b6 1,12 · narrador 1,15 · i16 1,2. v1 = el recorte de
  medir-tomas (con el de procesar el STT oía "todo"). STT de los finales y con el filtro de teléfono: v1 "cómo está toto",
  b10 "ahora el de coco", v9 "ay mi amor" (también filtrados).
- Planos sacados: Q2 (Inés cruzando: el chip 11:00 va sobre el panel), Q3k (la cocina vibra: entra directo el inserto),
  P5 (el ring queda en P4b), Q4c ("Nadie." en el mismo plano general de Q4b con Inés en la puerta y Bruno).
- Silencios entre líneas apretados (chips del montaje, pausa de P4 0,98 s, insertos 1,0-1,2 s).
- Gorro de tela (casquete blando y bajo con arrugas, tira fina, lazo atrás con las puntas colgando), barbijo celeste
  pálido bajado al cuello (se ve en P3b), Inés mira a cámara en P4b (cara a la vista), la hoja del vaivén se oculta al
  abrir, globos que se pisaban (v1/b2, b10 en el travelling a Coco), Bruno ya no gira la cabeza a cámara en P1b, Toto en
  Q5 más atrás (no se corta abajo).
- Mezcla: -14,0 LUFS, voz ≥ +8,4 LU, huecos sin voz ≤ -31,3. check: ok, 0 errores (lint y runtime).
- Pasada 4 de snapshots cada 0,5 s: renders/snap/pasa4.
- Render (renders/vete-castracion.mp4, 1410 cuadros, --workers 2, SwiftShader): 36,8 min. paso10.sh (1,2 min) →
  renders/vete-castracion-final.mp4: 47,0 s, -14,1 LUFS, pico -5,6 dBFS (loudnorm lineal). Hoja: renders/hoja.png.
- Portada regenerada: fondo limpio a 16,4 s (P4b con la cámara de la portada): Toto dormido con el collar y el
  auricular en la oreja, el guante, Inés con gorro y barbijo mirando a cámara, seca.

## Ronda 1 de corrección (revision-arte-r1, revision-sonido-r1, revision-guion-r1) · 46,87 s
Parte 1 0-21,08 · cartel 21,08-23,40 · parte 2 + cierre 23,40-46,87 (50,1 %) · tarjeta desde 43,86 (sobre "AVISOS"),
3,0 s · línea chica desde 44,25 (2,6 s). check: ok, 0 errores. Mezcla: -14,0 LUFS, voz ≥ +9,2 LU, huecos ≤ -31,6.
Arte:
- A1 (ALTA) remate final: Toto se sienta de 3/4 a cámara (cuerpo hacia la cámara, cabeza hacia Vero, jadeo/ladrido,
  cola); Vero con cejas arriba (BUENA → FELIZ → CARA.feliz, sin "esperanza"); cámara KQ5 nueva, Vero entera.
- A2 (ALTA) el auricular: la cabeza de Toto ladeada (0,9) deja la oreja con el teléfono arriba y a la vista; Inés lo
  agarra con la mano IZQUIERDA (la del lado de la cabeza), el puño sobre el auricular (IK a un punto del cuerpo del
  teléfono, no al costado). P4b nuevo: 3/4 alto, se ven Toto, el teléfono con el guante y la cara de Inés.
- A3 (ALTA) "¡Ay, mi amor!" arriba (y ~250), cola corta al auricular: no tapa caras.
- M4 cuadro 0: cámara más baja y cerca (personajes en el centro), Vero más afuera (1,5 m detrás del vidrio), un
  parante de la vidriera entre Toto y Vero, vidrio más visible, la base del teléfono adelante en el mostrador.
- M5 pizarra entera (más chica, más adentro) y el cartel VETERINARIA INÉS arriba de la vidriera (entero).
- M6 el auricular de Bruno con la pantalla hacia afuera-adelante; mentón sin hundirse en 12:00.
- M7 14:00: push-in lento hacia la derecha y las sillas más adentro: la señora se levanta y se va en cuadro.
- M8 sala: cámara general más baja y cerca; P5b viaja a Coco desde la mitad de "Ahora el de Coco." (Coco grande al
  final), el vinilo QUIRÓFANO entero.
- M9 Inés de cirugía: ojos hacia Bruno sin bizquear, gorro más arriba (se ve la frente), barbijo una banda plana
  (sin los anillos).
- M10 continuidad de Toto: el primer plano P4b mantiene la pose y el lado del plano general.
- M11 Coco echado de costado, la cabeza apoyada mirando a cámara (antes parecía sentado).
- M12 Q1b: Vero más a la derecha y afuera, el celular a la altura del pecho.
- M13 cocina: cejas arriba (DERRETIDA sin ceño) y burbuja normal (lo dice ella en persona; el audio sin filtro).
- M14 "Ahora el de Coco." (Q4) ahora va sobre el inserto del panel: se ve el toque en la fila de Coco y "Aviso a Julio
  enviado ✓"; rótulo "Bruno, en la tablet".
- M15 Q4b: sin los aros del estante (el rojo en la boca de Inés), plano más cerrado con Inés y Bruno enteros; el
  rótulo de llamadas y "Consultas atendidas ✓" van en este plano (sin el inserto Q4i).
- M16 Q5 Vero entera en cuadro.
- M17 Inés del cierre con la coleta al costado (volumen, no casquete).
- M18 portada nueva (ver abajo).
- B19 el chip "Jueves, 9:02." se va cuando habla Bruno · B20 Coco oculto en Q3 · B21 insertos más cortos (panel 1120,
  Listo 1140), horas de los avisos a 42 px, dueños del panel a 44 px · B23 tarjeta 3,0 s. Sin tocar: B22 (Toto pasa del
  piso al mostrador en el cierre), B24 (aro de Vero).
Sonido:
- D1 (ALTA) ronquido.wav recortado de nuevo desde el ronquido (sin los 0,6 s mudos), ENV.ronq recalculado, "¡Ay, mi
  amor!" entra cuando termina (T.v9 = ronca + dur + 0,05), techo -30,5.
- D2 Coco: ronquido2 recortado, P1 = fin del ronquido + 0,05 (antes del stinger), techo -32.
- D3 b5 sin atempo, silencios internos a 0,3 s ("sí dormido todavía"); D4 b6 sin atempo ("quiere").
- D5 ring: bsb-ring.wav ("Phone Ring #5", BigSoundBank CC0, de taller-esta-pronto) en cada llamada.
- D6 pausa: zumbido de la sala de fondo (-47) y la música baja a la mitad (antes 85 %).
- D7 "¿Cómo está Toto?" en persona con pasabanda suave (150-7000 Hz) · D8 toques, foto, pasos, dings y chips +3/+5 dB.
Guion:
- G1 el rótulo dice "Llamadas preguntando 34 → 0" (no contradice "Nadie.") · G2 pizarra entera · G3 collar opaco
  crema (de 3/4 se lee el embudo) · G5 línea chica con la tarjeta (2,6 s) · G6 descripcion.txt ("Treinta y cuatro
  llamadas preguntando cómo está cada uno. Hasta que Vero quiere hablar con Toto.") · G7 = M10 · G8 = M5 · G9 portada.
Duración: Q4i afuera, chips y pausas apretados para compensar b5/b6 sin atempo y los ronquidos enteros.
- Render r1: 36,4 min (1406 cuadros, --workers 2); paso10 → renders/vete-castracion-final.mp4: 46,87 s, -14,1 LUFS, pico
  -6,6 dBTP. Snapshots cada 0,5 s: renders/snap/pasa5; cortes tocados: renders/snap/r1a, r1b, r1c.
- Portada r1: fondo limpio a 16,9 s con cámara propia alta (ver portada.json): Inés con gorro mirando a cámara, el
  guante que sostiene el auricular en la oreja de Toto, el collar de 3/4; sello a 230 px (sobre el gorro).
