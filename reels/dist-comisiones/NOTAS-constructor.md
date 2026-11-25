# dist-comisiones · notas del constructor (25-11)

Proyecto con la forma de dist-cartera / gym-cupo: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html,
index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada concatenando piezas del
scratchpad de la sesión (utilidades, `fusionar`, tarjetas pegadas a la cámara, globos con cola a la boca, rótulos con guía,
catmull(), avatares, la herradura de Rubén y el bigote de nuca, pallets y racks de dist-cartera; la oficina con puerta de
dist-cliente-grande, rehecha). **Desde ahora se edita `assets/tres.js` directo** (las piezas no van al repo).
`assets/personajes.js` = el de dist-cartera + **Javi** nuevo en ELENCO (castaño, jopo bajo `jopoAlto 0.6`, barba de tres
días, chomba verde apagado #365f28 con cuello crema, pantalón gris); la mochila crema la cuelga tres.js.

## Comandos (desde reels/dist-comisiones)
```
LINEAS=partes/lineas-gen.tsv TOMAS="a b c" bash partes/reintentar.sh   # tomas (lineas-gen = lineas.tsv sin el narrador)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-r8.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10 (loudnorm en dos pasadas, lineal) después del render
```
Portada: `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 1.6 renders/prev/por`
→ `portada-src/fondo-limpio-1.6.png`; después `SINAUDIO=1 node gen.mjs`. `herramientas/portada.mjs` exige que exista el MP4
final aunque use el fondo limpio: lo corrí con un archivo vacío temporal en renders/ (borrado después). Volver a correrlo
después del render si hace falta.

## Voces (partes/procesar.sh)
Rubén Algenib · Nico Fenrir · Javi **Achird** · Graciela Gacrux (con filtro de altavoz: pasabanda 320-3400 + compresor) ·
narrador = `reels/ya-lo-cargo/assets/voice/narrador.wav` (2,26 s, sin atempo).
n1 01-c · r1 02-a (pausa "Fácil." 0,36 s, atempo 1,1) · r2 03-a (1,05) · n2 04-b (1,13) · j1 05-b · r3 06-b (pausa 0,44 s
después de "Felicitaciones.", 1,1) · g1 07-c (1,12) · r4 **08-f** (pausa 0,32 s, 1,06) · r5 10-b · n3 11-b (pausa 0,26) · j2
12-c · n4 13-c · r6 14-c (pausa 0,38, 1,03) · r7 **15-c** (1,04) · n5 16-a · r8 17-a (1,06).
OJO "Te toca menos": el STT oye "tu camino / toca menos" en TODAS las tomas sueltas (6 de 08 y 6 de 15). Pegadas detrás de
la toma de Graciela (como suenan en el reel) oye "te toca menos" solo en 08-f y 15-c: por eso esas. Revisar de oído.
"oyó:" del resto igual al guion (el STT escribe "3%", "42.000", "6 cajas"; j2 sin la "y" inicial).

## Mundo (todo alrededor del origen, piso y = 0)
Oficina vidriada: pared del fondo z = -2,4 crema a la izquierda (calendario de hojas grandes NOVIEMBRE en x -0,62, y 1,99;
reloj navy en x -1,5) y vidrio desde x 0 con la puerta (0,78-1,62) abierta hacia afuera. Escritorio crema con frente navy3
(tapa las piernas), Rubén sentado en (0,12; -1,72); monitor 0,9 × 0,63 girado 0,42 rad hacia la cámara (pantalla canvas
1280 × 896: la planilla / el panel); calculadora crema con rollo y la cinta (geometría propia, largo según el tiempo: llega al
piso en P3d); dos talonarios de remitos (solo parte 1); mate y termo (acostado = vacío el día 2); el celular de Rubén
acostado (vibra). Afuera: el descanso de chapa, la escalera de 14 escalones que baja al depósito (y -3,2: racks, pallets,
tubos). Dos Rubén: `ruben` y `rubenO` (con ojeras, día 2: P3d-P7b). Luces por modo (mañana fría / noche / tarde).
Las pilas (P6/Q3b): 1 unidad = $ 100.000 = 0,066 m. Empresa (navy) 28 u; vendedores Nico 15 + SÚPER HÉCTOR 5 (rojo) + Javi 8
+ SÚPER HÉCTOR 5 (rojo) = 33 u, la línea de referencia crema a 28 u y "+ $ 500.000"; en Q3b la roja de Nico sale volando, las
de arriba bajan 5 u, la de Javi pasa a kraft "SÚPER HÉCTOR · JAVI ✓" y aparece "= ✓".

## Duración y planos (s)
**46,8 s.** Parte 1 0-22,15 · cartel 22,15-24,51 · parte 2 + cierre 24,51-46,8 = 22,3 s (48 %); cierre C 42,79-46,8 (tarjeta
COMISIONES desde 43,1, línea chica desde 45,5).
P1 0 (general desde adentro: Rubén con la planilla, Nico en la puerta, Javi detrás del vidrio, el calendario en 1) · P2 1,73
(Rubén, se arremanga; "Fácil." en dos tiempos) · P3a ~4,2 (la planilla se abre: COBRADO / DEVOLUCIONES / PAGÓ LA MITAD / ¿DE
QUIÉN ES?, rótulo "2 vendedores · 214 remitos") · P3b (la escalera de noche, Nico y Javi dormidos, la caja de pizza) · P3c (el
calendario cae 1 → 2) · P3d (el termo acostado, la cinta en el piso, Rubén con ojeras) · P4 (Enter, "Comisión de Nico $
42.000") · P5 (Nico con su cuenta, $ 60.000, rótulo) · P5b (Javi, $ 39.000) · P6 ~12,6 (vista de las pilas: caen las cajas,
"+ $ 500.000"; pausa; la cámara viaja al grupo sobre "Felicitaciones.") · P7a (el celular de Rubén: Graciela por altavoz) ·
P7b (Recalculando… · 42.000 → 41.802 · − $ 198 · el calendario cae a 3 · chip "Día 3. Sueldos: atrasados.") · cartel · Q1 = P1
(panel en el monitor) · Q1b = P2 (mate, "Mirá el celular.") · Q2 (el celular de Nico a pantalla llena: contador a $ 42.000 ✓,
pendiente de Bar Walter, "Se calcula sola…") · Q3 = P5b · Q3m (el monitor: el cursor toca y se abre "Pedido 0388 · Súper Héctor ·
Cargó: Javi ✓") · Q3b = P6 (las pilas dan justo, "= ✓") · Q4 = P7a · Q4b = P7b (el panel descuenta: "Devolución · Rotisería
Graciela · − $ 198", Nico 41.802; "La devolución se descuenta sola") · Q4n = P5 (Nico muestra la notificación: "Ya sé. Me
llegó.") · C (Rubén a cámara con el mate; detrás el panel "Cerrado ✓" y el calendario en 1).
Las burbujas de los remates en dos tiempos (r1, n2, r3, r4, n3, r6, n5) usan CORTE (el silencio interno de la toma). r3/r6
y r4/r7 en el mismo lugar y tamaño (callback).

## Mezcla
TECHO -38 antes de la ganancia final (+7,2 dB). `python3 medir.py`: voz ≥ +6,8 LU sobre el resto en todos los tramos de
0,5 s con voz. `medir-sfx.py`: máximo sin voz -31,4 LUFS. mezcla.wav -14,0 LUFS, pico -1,7 dBFS. La música del montaje P3 va
acelerada (vel 1,25). SFX nuevos CC0 (BigSoundBank) en fuentes.md: ronquido, calculadora, impresora de la calculadora.

## Pasadas (prev + snapshots; hojas en renders/snap/pasa1, pasa2, pasa3 y renders/prev/)
Pasada 0 (prev de la capa 3D): P1 chico y lejos → la puerta y el calendario se acercaron al centro (puerta 0,78-1,62,
calendario arriba del monitor) y cámara a 1,5 m, fov 60; P2 demasiado cerca (la burbuja no entraba) → más atrás; P3b en
negro (cámara dentro de las piernas) → cámara más abajo en la escalera, escalera más ancha (1,2 m), noche más clara, la
pizza delante de ellos; P6: cuatro composiciones probadas (las pilas en primer plano cortaban a la gente en vertical) →
vista de pilas + viaje al grupo (Rubén con Nico y Javi detrás), cajas más angostas con texto más grande, empresa en navy
(en crema se perdía contra la pared); P7b/Q4b Rubén cortado → cámara corrida; C la tarjeta le tapaba la cara → cámara
mirando más abajo.
Pasada 1 (snapshots cada 1 s): la hoja de la puerta abierta hacia ADENTRO cruzaba la cara y el celular de Nico en P5/P5b/Q4n
→ la puerta abre hacia afuera; el celular de Nico le tapaba la boca → al costado y el pulgar debajo de la pantalla ("60.000"
entero); el celular de Javi no se veía → cámara de P5b más alta y atrás; la burbuja de "Felicitaciones." tapaba las pilas
→ pausa más larga (r3 a p6 + 1,3) para leer las pilas y la burbuja recién en el plano del grupo.
Pasada 2 (cada 0,5 s): el termo asomaba como una mancha blanca abajo en P5b/Q3 → oculto en los planos de la puerta; "= ✓"
cortado arriba → cámara de pilas más alta; "Tu comisión · Octubre" cortado en el celular → texto ajustado al ancho.
Pasada 3 (cada 0,5 s, renders/snap/pasa3/h1.png y h2.png): sin defectos altos a la vista.
`check --json`: 0 errores (warnings de siempre: canvas anidado).

## Dudoso / para los revisores
- 46,8 s, parte 2 + cierre 48 % (el plan pedía 50 %): las tomas salieron más largas que el plan aun con atempo.
- "Te toca menos" (r4, r7): el STT no la oye bien suelta; elegidas por contexto (ver Voces).
- En la vista de pilas del P6 la gente queda chica atrás; Nico y Javi aparecen de golpe adentro de la oficina (en P5b
  estaban en la puerta).
- P3a: las tres columnas de base quedan chiquitas (a propósito: la planilla "se multiplica"); lo legible son los 4 encabezados
  nuevos y el rótulo.
- P3d: la cabeza de Rubén queda cortada arriba (plano del escritorio).
- Render final no hecho (lo hace el coordinador). Medir el tiempo de SwiftShader.

## Ronda 1 de corrección (qa dist-r1-arte / guion / sonido, decisiones del coordinador) · sin render
**Duración 43,97 s** (antes 46,8). Parte 1 0-19,81 · cartel 19,81-21,97 · parte 2 + cierre 21,97-43,97 = 22,0 s (50,03 %) ·
cierre 40,98-43,97 = 3,0 s (tarjeta desde 41,28, línea chica desde 42,77, 0,2 s de aire). check: 0 errores. Mezcla (MEDIR=1):
voz ≥ +6,3 LU sobre el resto en todos los tramos de 0,5 s con voz; efectos sin voz máx -31,6; -14,0 LUFS.
Planos (s): P1 0 · P2 1,50 · P3a 3,83 · P3b 4,63 · P3c 4,99 · P3d 5,35 · P4 5,65 · P5 7,63 · P5b 10,01 · P6 10,99 (remate
11,73) · P7a 15,16 · P7b 16,79 · cartel 19,81 · Q1 21,97 · Q1b 23,50 · Q2 24,51 · Q3 27,59 · Q3m 28,65 · Q3b 30,64 (r6 32,09) ·
Q4 34,73 · Q4b 36,36 · Q4n 38,71 · C 40,98.
- Tiempo: atempo más alto en la parte 1 (n1 1,08, r1 1,16, n2 1,18, r3 1,16, g1 1,18), montaje 2,0 → 1,82 s, P6 con la pausa justa
  (las cajas caen en 0,65 s, "Felicitaciones." a 0,74 s), Javi pisa el final de Nico, la línea de Graciela termina sobre P7b
  (corte 0,35 s antes de su final) en P7 y Q4, narrador con atempo 1,08 (cartel 2,16 s). En la parte 2, momentos de lectura un
  poco más largos (Q2 "$ 42.000 ✓" antes de "Cuarenta y dos mil.", el pedido 0388, el "= ✓", la devolución en el panel, 0,55 s
  antes de "Ya sé.") para llegar al 50 %. Cierre: toma nueva 17-ruben-e (pedida más rápida), sin el hueco interno, atempo 1,23.
- Nico y Javi: se quedan en la puerta en P6, P7b, Q3b y Q4b (no aparecen de golpe adentro). Javi asomado detrás de Nico.
- Pilas: plano único P6/Q3b con las dos pilas enteras (cajas de 0,45 m), Rubén en el escritorio y los dos en la puerta; la
  burbuja del remate arriba a la derecha, sin tapar las pilas ni la referencia. Cajas rojas "HÉCTOR · $ 500.000 · según Nico /
  según Javi"; en Q3b "HÉCTOR · $ 500.000 · Javi ✓". La roja de Nico sale primero hacia la cámara (no atraviesa a JAVI) y
  recién afuera sube y se va; las de arriba bajan después.
- Burbujas: crecen con el texto (la "a" tiene solo la primera mitad, de su tamaño); las fijas se anclan por abajo. La de
  Graciela apunta al borde de arriba del celular (no al avatar). r3/r6 a 50 px; r4/r7 en el mismo lugar.
- Voces: "Te toca menos." (r4 y r7) = toma nueva 15-ruben-h (articulada) + "Pasá el jueves." de 08-f; j1 y r7 con cadena suave
  (compresor 2:1, sin el limitador 0,34). STT por tramo sobre la mezcla final (partes/tmp/stt.sh): todas las líneas dan el
  texto ("te toca menos pasa el jueves", "te toca menos", "Héctor es mío" desde el inicio de la línea, "súper Héctor" para j2:
  el STT se come la "y" en todas las tomas). Sin la palmada (no tenía acción visible).
- Encuadres: P1 cámara más baja (Nico entero, menos frente de escritorio); P4 y P7b/Q4b con el resultado del monitor entero,
  el calendario 3 libre y Nico en la puerta; P3b escalera más ancha y cámara más atrás (caras separadas, la caja de pizza
  abierta sin tapa); P3d más abierto; C más atrás (NOVIEMBRE y el panel enteros).
- Texto: Q2 sin texto chico (pendiente en dos renglones de 54 px, una sola venta), Q4n pasa a inserto del celular a pantalla
  llena (se da vuelta hacia Rubén), panel con "Cobrado $ …" a 56 px y "Devolución · Graciela" a 60 px; el cursor del Q3m
  desaparece al hacer clic. Rótulo P5 "Su cuenta: lo vendido + Súper Héctor"; chip "Día 3. Comisiones: sin pagar.";
  cartel a 136 px (dentro del 80 %); descripcion.txt dice "la planilla".
- Snapshots: renders/snap/r1a (cada 0,5 s), r1b y r1c (alrededor de P6, P7, Q3b, Q4b, C).
- Portada: el fondo no cambió (P1 con CAM_PORTADA); no se regeneró. El logo SCALERICS de `herramientas/portada.mjs` está fijo
  en bottom 250 px (y ≈ 1644-1670): la herramienta no permite moverlo y no la toqué (es compartida).
- No hecho: guion 10 (opcional). Queda: en P6 la mitad de abajo es piso; en el plano de pilas Rubén y los vendedores se ven
  chicos (≈ 150 px de cara).

## Ronda 2 de corrección (qa dist-r2-arte / dist-r2-sonido-guion) · sin render
**Duración 44,47 s** · parte 1 0-20,01 · cartel 20,01-22,17 · parte 2 + cierre 22,17-44,47 = 22,3 s (50,1 %) · cierre 41,27-44,47
(3,2 s; tarjeta desde ~41,6). check: 0 errores. Mezcla (MEDIR=1): voz ≥ +13,7 LU sobre el resto en todos los tramos con voz;
efectos sin voz máx -31,5 LUFS; -14,0 LUFS. STT por tramo sobre la mezcla (`bash partes/tmp/stt.sh`, regenerarlo con los T
actuales): las 18 líneas dan el texto del guion ("Héctor es mío", "y Súper Héctor", "jefe cuánto me toca", "te toca menos pasa
el jueves", "te toca menos", "comentá comisiones…").
Planos (s): P1 0 · P2 1,44 · P3a 3,75 · P3b 4,47 · P3c 4,81 · P3d 5,17 · P4 5,47 · P5 7,41 · P5b ~9,8 · P6 ~10,8 (remate ~11,6) ·
P7a ~15,1 · P7b ~16,7 · cartel 20,01 · Q1 22,17 · Q1b ~23,6 · Q2 ~24,6 · Q3 ~27,8 · Q3m ~28,9 · Q3b ~30,8 · Q4 ~34,9 · Q4b ~36,5 ·
Q4n ~38,9 · C 41,27 (los exactos en assets/tiempos3d.js).
- Plano de las pilas (P6/Q3b): pilas más altas (U 0,077: empresa 2,16 m, vendedores 2,54 m), pegadas al frente del escritorio
  (z -0,27), cámara a 2,3 m, fov 70: las pilas llenan el alto y Rubén queda a ~215 px de cara; el monitor apagado detrás (sin
  astillas de texto); Nico (x 1,02) y Javi en la puerta, a la derecha de Rubén.
- La línea de la empresa: regla crema con borde navy de la pila de la empresa hasta pasar la de los vendedores, con la etiqueta
  "EMPRESA"; "+ $ 500.000" entra cuando asienta la última caja (con su ding) y queda hasta el final del P6, con guía a la caja de
  arriba.
- Caja roja de Q3b: se achata en su lugar y las de arriba bajan apoyadas (sin huecos ni cajas flotando, no pasa por delante de
  nadie); la roja de Javi gira sobre sí misma y de canto pasa a la kraft "HÉCTOR · $ 500.000 · Javi ✓".
- Voces: todas con la cadena suave; j1 = 05-javi-g (tomas nuevas d-h), j2 = 12-javi-a, 0,1 s de aire después del "es mío" de
  Nico; pausas de ~0,45 s antes de los remates ("Felicitaciones." → resto, Graciela → "Te toca menos.", "¿Ya?" 0,35 s); cierre a
  atempo 1,12 (3,2 s).
- Termo: sin la animación del P3d (le atravesaba la oreja); el día 2 está acostado lejos de Rubén.
- Javi: en P5b/Q3 entra más a la izquierda (Nico no lo tapa, cámara corrida); está en P7b y Q4b (en la puerta, detrás de Nico).
- Texto ≥ 36 px: panel nuevo con poco texto y grande (Nico / Javi / montos a 110-120 px, "Devolución − $ 198", "Comisiones:
  cerradas ✓"); planilla del P7 con "Recalculando…", "Comisión de Nico" y "− $ 198" más grandes; Q2 "Cobrado: $ 1.400.000" /
  "× 3 %" y el pendiente a 62-64 px, sin la fila de Graciela; calculadoras sin el "Mi cuenta" chico; cabecera de Graciela
  "Altavoz · Graciela" más grande. Sin el rótulo "Bar Walter".
- Franjas navy: techo claro con tubos (antes navy3), sin la carcasa de las lámparas. Bordes: P2/Q1b, P3d, P4 y la portada con
  el monitor entero o fuera de cuadro.
- Bajas: chip "Día 2, 19:00." cuando ya cayó la hoja; iris que abre desde el frente del escritorio (no desde la cara); Rubén sin
  el parpadeo de P1; cursor del Q3m que sube por la izquierda y desaparece al hacer clic; cola de "…Es de Javi." oculta; caja
  de pizza abierta; cama de música más arriba en el montaje y sin el duck fuerte en Q3m/Q3b; crédito de elevador.wav.
- Portada regenerada (fondo nuevo sin el monitor cortado). El logo sigue en y ≈ 1644 (fijo en la herramienta compartida).
- Snapshots cada 0,5 s: renders/snap/r2a y r2b (h1.png, h2.png).
- (r2) Burbujas del remate (r3/r6) a 46 px, abajo a la derecha sobre el frente del escritorio, con la cola a Rubén: no tapan las cajas ni sus montos.

## Pulido final (qa dist-r3) · sin render · 44,47 s (sin cambios de tiempos)
- M2: la regla EMPRESA se va en Q3b antes de que baje la roja de Javi; la roja de Nico se achica entera (sin texto comprimido).
- M1: Javi entra por adentro de la oficina, a la izquierda de Nico (sin el marco de la puerta en la cara), el celular en la mano
  izquierda a la altura del pecho ($ 39.000 a la vista); cámara de P5b/Q3 un poco corrida.
- M4: en P7b/Q4b Nico está más adentro del marco (x 1,36) con el celular pegado al pecho: no estira el brazo hacia Rubén; la
  cámara de P7b/Q4b más cerca (M3 en esos planos). P1/Q1 sin tocar (más cerca cortaba a Nico o al monitor).
- Sonido: el golpe de cada caja cuando asienta (+0,2 s) y un ding suave (-44) con "+ $ 500.000"; mezcla re-medida: voz ≥ +13,7
  LU, efectos sin voz máx -31,7, -14,0 LUFS.
- Cierre: el panel sin la fila de abajo (asomaba partida sobre la tarjeta).
- Portada: fondo nuevo (CAM_PORTADA más atrás, VER=portada sin monitor ni calendario): la cara de Rubén despegada del borde.
- Bajas: sin los tubos del techo en P6/Q3b; guía de "+ $ 500.000" a la esquina de arriba de la caja (no sobre el número);
  burbujas de P2 y P4 corridas a la derecha (no tapan el calendario); P3b más abierto (la cabeza de Javi entera); mate del día 2
  lejos del bigote; cursor oculto en el clic; Rubén señala con la bombilla en Q1b.
- Boca: bocaVoz no escribe sobre objetos compartidos (crea un objeto nuevo por cuadro); verificado con prev.mjs en orden
  9,9 → 10,5 → 11,0 → 12,0 → 13,0: el que no habla tiene la boca cerrada.
- check: 0 errores. Snapshots: renders/snap/pul y pul2.
- (final) P7b/Q4b: cámara más baja y abierta (fov 70): el monitor y el panel entran enteros (sin texto cortado en el borde);
  banda "Recalculando…" opaca; P5b: el celular de Javi más bajo (no le tapa la boca, "39.000" a la vista). check 0 errores;
  snapshots en renders/snap/fin, fin2.
