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
