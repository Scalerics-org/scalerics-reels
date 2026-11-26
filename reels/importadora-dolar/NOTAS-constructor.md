# importadora-dolar · notas del constructor (26-11)

Proyecto con la forma de dist-comisiones / tienda-tenes-stock: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js` (escrita para este reel
con la infraestructura de tienda-tenes-stock y dist-comisiones: tarjetas pegadas a la cámara, globos en dos tiempos con CORTE,
globos fijos para los callbacks, camPantalla, catmull quieto después de la última clave, avatares por render target, `fusionar`).
`assets/personajes.js` = el de dist-comisiones + **ELENCO.paola**, **ELENCO.mica** (los parámetros de tienda-tenes-stock, ronda 3)
y **ELENCO.seba** (nuevo: trigueño, negro texturado alto, camisa crema de manga corta con cuello navy, pantalón navy2,
zapatillas crema). Los rulitos de arriba (icosaedros chicos) y la riñonera navy cruzada de Seba, y el cúter de Mica, los cuelga
tres.js. Cambio del coordinador aplicado: la palabra es **PRECIOS** (guion.txt, plan.md, descripcion.txt, tarjeta y voz).

## Comandos (desde reels/importadora-dolar)
```
LINEAS=partes/lineas-gen.tsv TOMAS="a b c" bash partes/reintentar.sh   # tomas (lineas-r1.tsv: la segunda tanda de 16 y 17)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-pa7.json, narrador atempo 1,1)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav   # efectos sin voz (techo -31)
./snap.sh "t1,t2,…" nombre && ./hojas.sh renders/snap/nombre   # snapshots con el candado; hojas de 24 cuadros numerados
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10 (loudnorm lineal en dos pasadas) después del render
```
Portada: `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 1.6 renders/prev/por`
→ `cp renders/prev/por/t-001.60.png portada-src/fondo-limpio-1.6.png`; después `SINAUDIO=1 node gen.mjs` (o `MEDIR=1 node gen.mjs`).
Ya está hecho: `portada-src/fondo-limpio-1.6.png` (Paola en la mesa mirando a Seba, que entra con el celular en alto; el
ventilador y el contenedor en el portón; las caras en la mitad de arriba). `portada.json` con `t` 1.6 y ese fondo.
`herramientas/portada.mjs` exige el MP4 final: correrla después del render.

## Voces (partes/procesar.sh)
Seba **Umbriel** · Paola **Aoede** · Mica **Zephyr** · narrador = `reels/ya-lo-cargo/assets/voice/narrador.wav` (atempo 1,1, 2,07 s).
s1 01-seba-c (atempo 1,18; se reusa en Q1) · pa1 02-paola-c (1,12; se reusa en Q2) · s2 03-seba-a (pausa 0,28, 1,12) · mi1
04-mica-a (1,2; se reusa en Q4; la c decía "llegó una factura") · pa2 05-paola-a (pausa 0,38, 1,06) · s3 06-seba-a (1,18) · pa3
07-paola-c (las dos pausas a 0,40/0,42, 1,08) · s4 11-seba-c (1,12) · pa4 13-paola-a · pa5 14-paola-a (pausa 0,38, 1,06: la misma
cadencia que pa2) · s5 15-seba-c (pausa 0,28, 1,15) · s6 16-seba-b · pa6 17-paola-f (pausa 0,34, 1,05) · pa7 18-paola-c (1,12).
"oyó:" igual al guion en todas salvo: el STT no oye "Pao" (está en la forma de onda), oye "lista 1950" (sin la "a" pegada) y
"vende eseba vende" para pa6 (17-a, c, d, e, g sonaban "bendecida"/"vende se va": la f es la única con las tres palabras).
Las tomas 16-d/e/f leyeron parte del tono ("claro, palabra por palabra"): descartadas.

## Mundo (piso y = 0)
Depósito de Casa Pao visto desde adentro hacia la pared del portón (z = -3): portón 2,8 × 3,3 m (x -0,2 a 2,6) con el riel y
las hojas de chapa corridas afuera; franja navy "CASA PAO · IMPORTADOS" arriba; la puerta "OFICINA" a la izquierda (x -3,35, por
ahí entra Mica); el pizarrón con marco de aluminio en (-2,35; 1,78) ("DÓLAR: 40" → borrado → "43" rojo apagado; parte 2:
"Lunes: despachar Bazar Graciela"); la mesa de despacho (tablón crema, caballetes navy3, tela navy2 al frente) en (-0,65; -1,45)
con la calculadora grande (visor canvas: 23.000 × 43 = → 989.000), remitos y cinta; Paola detrás (-0,62; -2,05); el ventilador
de pie (base navy, caño crema, jaula de alambre, 3 aspas; el ángulo es la integral de la velocidad: se frena en 1,2 s desde
T.frena y la cabeza baja; en la parte 2 gira siempre) en (0,3; -2,45); la columna de hormigón con la lista de JULIO pegada con
dos cintas (parte 1) / la tablet "Lista de hoy" (parte 2) en (2,9; -1,7); estanterías casi vacías. La tablet del panel de
Paola en la mesa (solo parte 2).
Patio: hormigón claro, muro crema con remate navy3, dos árboles, cielo crema liso. El contenedor de 20' navy corrugado (perfil
trapezoidal extruido, relieve marcado), puertas abiertas ~112° con las 4 barras de cierre y las manijas crema, código inventado
"CPIU 204518 · 20'", piso de tablas, sobre el chasis gris con ruedas atrás y patas adelante; frente de puertas en (1,2; -6).
Las 500 cajas kraft "VENTILADOR DE PIE 16"" = InstancedMesh (20 capas de 5 × 5 desde el fondo, frustumCulled off); las 8 de
arriba a la derecha de la capa del frente van últimas (los huecos: fondo navy oscuro + contorno rojo apagado punteado).
Vacío en P1-P4 y Q1-Q4; se llena a 492 en P5 (queda así en P6-P7b, visto por el portón); a 500 en Q5 (queda en Q6-C).

## Duración y planos (s)
**46,5 s.** Parte 1 0-20,33 · cartel 20,33-22,52 · parte 2 + cierre 22,52-46,5 = 23,98 s (52 %) · cierre C 43,38-46,5 (tarjeta
PRECIOS desde 43,73, línea chica desde 44,6 = 1,9 s).
P1 0 (general hacia el portón: Paola en la mesa, el ventilador, Seba entrando con el celular en alto, el contenedor vacío;
IMPORTADORAS + "Lunes, 9:00." en el cuadro 0, la burbuja ya en el cuadro 0) · P2 2,14 (Paola, puño en alto) · P3 3,86 (Seba en
la columna señala la lista; push-in a la lista en el corte de "Mil novecientos cincuenta", la fila se resalta en verde; la
burbuja pasa abajo) · P4 5,8 (Mica entra por la oficina con la proforma, Paola la mira; push-in a la proforma en la segunda mitad:
"USD 46 c/u" se marca; chip "Lunes, 9:05.") · P5 8,28 (montaje: el pizarrón, Paola borra y escribe 43 → la calculadora
23.000 × 43 = 989.000 con "Reponer: 989.000" y "Cobramos: 500 × 1.950 = 975.000") · P5c 9,9 (la cámara sube y viaja por el
portón al contenedor: se llena, "492 de 500", los 8 huecos, "Con lo que cobramos, traemos 492") · P6 11,48 (Paola seca, el
ventilador se frena detrás, el contenedor con huecos por el portón; "Vendimos todo." → "Y perdimos plata." en rojo; "− $ 14.000")
· P7a 14,42 (Seba en el portón, el celular grande: "¡Mandame 200 más!") · P7b 16,77 (Paola de espaldas mirando el contenedor,
Seba a la derecha; levanta la mano; "Seba." → "Seba. Por favor." → "Dejá de vender." en tres tiempos) · cartel · Q1 22,52 (= P1)
· Q2 24,71 (= P2) · Q3 26,46 (el celular a pantalla llena: $ 2.530, "Precio de hoy ✓", "El vendedor ve el precio de hoy") · Q4
28,85 (= P4) · Q4b 31,29 (la tablet a pantalla: Costo USD 46 ✓ · Dólar 43 · Margen 28 % · Precio de hoy $ 2.530 ✓ · banda
"Recalculado solo · 38 productos"; rótulo; Paola oculta) · Q5 33,09 (= P5c: 500 de 500 ✓, "+ $ 276.000", "Vendimos todo." →
"Y ganamos plata." en el mismo lugar que el remate) · Q6 35,99 (= P7a; toca −10 %) · Q6b 38,88 (−10 % $ 2.277 "Debajo del margen
mínimo" → −5 % $ 2.404 "Margen OK ✓ Listo para enviar"; rótulo) · Q7 40,88 (= P7b, sonriendo: "Vendé, Seba." → "Vendé.") · C 43,38
(Paola a cámara delante del portón, el contenedor lleno y el ventilador detrás).
Números (fuentes.md): 1.950 · 46 · 23.000 · 40/43 · 989.000 · 975.000 · 492 · − 14.000 · 2.530 · 2.277 · 2.404 · 276.000 · 38.

## Mezcla
TECHO -38 antes del bus (+6) y de la ganancia a -14. `MEDIR=1 node gen.mjs`; `python3 medir.py`: voz ≥ +14,8 LU sobre el resto en
todos los tramos de 0,5 s con voz. `medir-sfx.py`: máximo sin voz -33,6 LUFS (el montaje P5 llegaba a -29,7 y se bajó: música
-44, teclas -48, pops -51, chapa -45). mezcla.wav -14,1 LUFS, pico -3,3 dBFS. Cama: pizzicato-lleno (acelerado 1,2 en el
montaje), calle + pájaros del patio, el ventilador en loop (se apaga con fundido de 1,25 s en P6), pasos de Seba, papel, la
palma en la mesa, el marcador (BigSoundBank #0807, nuevo, en fuentes.md), teclas, pops por fila de cajas (tono que sube), la
chapa en los huecos, glitch en "− $ 14.000" y en "Debajo del margen", dings en "Precio de hoy", "Recalculado", "500 de 500" y
"Margen OK", stinger + narrador en el cartel.

## Pasadas (prev + snapshots; hojas en renders/prev/ y renders/snap/pasa1, pasa2, fix1-fix3)
Pasada 0 (prev de la capa 3D): P1 con los personajes chicos → cámara más cerca (z 2,6), Paola y la mesa más al centro, el portón
corrido; las hojas de chapa tapaban las paredes como cortinas navy → afuera del muro; las 500 cajas no se veían (InstancedMesh con
bounding sphere en el origen) → frustumCulled off; el interior del contenedor oscuro → paredes navy claro; P3 la cara de Seba
llenaba el cuadro → Seba al costado de la columna, plano abierto hasta el corte y recién ahí el push-in; P5 Paola en el pizarrón
tapada por el ventilador → el ventilador pasó a la derecha de la mesa y Paola escribe parada a la izquierda del pizarrón; la
calculadora no mostraba el visor (las teclas lo tapaban) → cámara de arriba; P7b Seba fuera de cuadro → recompuesto (cámara
detrás de Paola, Seba a la derecha delante del portón); C Paola entera y lejos → plano medio con la cara arriba de la tarjeta.
Pasada 1 (snapshots cada 0,5 s, pasa1): Seba cortado en el borde al entrar → SEB_B más al centro; la mano gigante de Seba en
el inserto de la lista → Seba oculto en el inserto; claves de cámara fuera de orden en P5 (viaje/contenedor) y deriva de la
Catmull en la calculadora → P5 partido en P5 (pizarrón → calculadora) y P5c (viaje al contenedor), más tiempo con 989.000 en
pantalla; el panel de la tablet mostraba USD 38 / $ 1.950 antes de "Ya está cargada" (contradecía el $ 2.530 del celular) → los
valores son siempre los de hoy y solo se ponen en verde con ✓; el contador de Q3 pasaba por $ 2.060 → precio fijo con pop;
"Debajo del margen mínimo" se cortaba → ajustado; el rojo duraba 0,5 s → 0,67 s; "+ $ 276.000" se encimaba con la burbuja de Q5
→ abajo; en Q4b los ojos de Paola asomaban sobre la tablet → Paola oculta en el inserto; la notificación de Graciela no se leía
→ a pantalla llena ("¡Mandame 200 más!" a 128 px de lienzo) y el celular más grande; los rulitos de Seba hacían un bulto de
costado → más chicos y solo arriba; la línea chica final duraba 1,2 s → 1,9 s.
Pasada 2 (cada 0,5 s desde 0,25, pasa2): el celular de Seba le tapaba la cara en P1 → más afuera; en el inserto de la proforma
asomaba la boca de Mica y la burbuja tapaba "PROFORMA" → la cámara mira más abajo y la burbuja va abajo (sobre los puños).
`check --json`: 0 errores (warnings de siempre: canvas anidado, GPU stall, dead_stretch por ser 3D).

## Dudoso / para los revisores
- 46,5 s (el plan estimaba 41,4): las tomas salieron largas aun con atempo 1,06-1,2. Parte 2 + cierre = 52 %.
- El contenedor del patio "es" el contenedor nuevo en el montaje (P5) y queda con los 8 huecos en P6-P7b: es una licencia de
  montaje (en P1 estaba vacío porque se vendió).
- El STT no oye "Pao" en 01/04/06 (está en el audio); pa6 la oye como "vende eseba vende": revisar de oído.
- P6: el ventilador que se frena se ve chico a la derecha de Paola; el gesto de la cabeza que baja es sutil.
- Los puños de Mica en el inserto de la proforma (las manos del módulo son puños).
- Render final no hecho (lo hace el coordinador con paso10.sh).

## Ronda 1 de corrección (revisores de guion, sonido y arte) · sin render
**44,83 s.** Parte 1 0-20,5 · cartel 20,5-22,59 · parte 2 + cierre 22,59-44,83 = 22,24 s (49,6 %) · cierre C 41,83-44,83 (tarjeta
PRECIOS desde 42,18, línea chica desde 42,93 = 1,9 s). `check --json`: 0 errores.
Planos (s): P1 0 · P2 2,1 · P3 3,8 · P4 5,62 · P5 7,96 (pizarrón) · P5b 8,76 (calculadora) · P5c 10,38 (contenedor) · P6 11,72 ·
P7a 14,94 · P7b 17,21 · cartel 20,5 · Q1 22,59 · Q3 24,78 · Q4 27,23 · Q4b 29,08 · Q5 31,08 · Q6 34,31 · Q6b 37,2 · Q7 39,2 · C 41,83.
Mezcla (`MEDIR=1 node gen.mjs`): mediana voz-resto **19,8 LU** (medir.py ahora la imprime), mínimo +15,2 LU en tramos con voz;
huecos sin voz máx **-31,4 LUFS** (medir-sfx.py); -14,0 LUFS, pico -3,3 dBFS. La mezcla con MEDIR se ancla con anullsrc (amix
sin entrada en t = 0 daba silencio); `STEMS=1` además separa cama y efectos.

Guion:
- Montaje P5 alargado (3,0 → 3,76 s) y con CORTES secos (P5 pizarrón · P5b calculadora · P5c contenedor) en vez de paneos por la
  pared: "$ 989.000 para reponer" arriba y "$ 975.000 cobrados / 500 × $ 1.950" abajo, juntos 1,62 s (8,76-10,38).
- El contenedor queda con las 492 y los 8 huecos: "492 de 500" sigue arriba en P6 (con "− $ 14.000 / para reponer") y en P7b.
- Proforma: "FACTURA PROFORMA", "Costo puesto c/u USD 46", "antes USD 38" tachado en rojo apagado, "Total USD 23.000" a la vista
  (Mica la agarra del borde de abajo; sin el sobre navy). Panel: "Costo puesto", "Caloventor $ 1.670".
- Pizarrón: "julio" se borra con el 40 y con el 43 aparece "hoy" en rojo apagado. Celular de Q3: "Actualizado con la proforma
  nueva". fuentes.md: techo 3.900 → 5.060 y caloventor 1.290 → 1.670; costo puesto y "antes USD 38".
- Sin Q2 (la repetición de "¡Vamos! ¿A cuánto?"): Q1 corta directo al celular ("Al de hoy."). Q4b entra durante "contenedor nuevo".
Sonido:
- Cama: CAMA = +11 dB sobre su techo para música, patio y ventilador, duck de voz 0,2 (era 0,6), compresor del bus ratio 1,5, y en
  los tramos SIN voz la cama baja (HUECO_K 0,7, rampa 0,12 s) para que los huecos queden ≤ -31 con los efectos adelante.
- "Debajo del margen mínimo": glitch grave (asetrate 0,7) a -36; "− $ 14.000": glitch grave a -38 cuando termina "plata" (el rótulo
  entra ahí y P7a arranca 0,3 s después); pop de "USD 46" a -37; ding/chapa/pops del montaje +4 dB.
- Voces: pa4 = 13-paola-c; mi1 con adeclip (pico -2 dBFS, sin clipping); pausa de pa2 y pa5 0,52 s; s2/s3/s4/mi1/pa7 algo más
  rápidas; pausas de pa3 0,30/0,33 s. (Opcional 22, la coma de pa6: no; la toma 17-f no tiene silencio entre "Vendé" y "Seba".)
- Música alegre de vuelta en P7a hasta "Dejá de vender." (corte seco, después el stinger); acentos graves (cero.mp3 a 0,6) en "Y
  ganamos plata." y en el "Vendé." final, y la música sube hasta el cierre.
- El ventilador: clic (interruptor.wav, Kenney) en T.frena y la bajada de velocidad (ventilador-baja.wav, derivado de la grabación
  real), 0,34 s solos antes de "Vendimos todo.".
- Pop suave (-41) en la entrada de cada burbuja y de la segunda mitad de los remates.
Arte:
- Zona segura: toda tarjeta (rótulos y burbujas fijas) con el borde de abajo en y ≤ 1650 (ponerGlobo lo fuerza). Cierre: tarjeta
  PRECIOS desde y 940 y la línea chica desde y 1450 (su borde de abajo ≈ 1656); la cara de Paola arriba de la tarjeta.
- Q3/Q6b: el celular al 52 % del alto (la burbuja de arriba ya no tapa el encabezado; el rótulo de abajo no lo pisa).
- Lista: cintas chicas en las esquinas, título más angosto. Q4b: fuentes del panel ≥ 62 px de lienzo, "Recalculado solo · 38
  productos" a 80, push-in 0,33 → 0,36.
- La puerta de la oficina pasó a la pared izquierda y el pizarrón más a la izquierda (x -3,05): P4 ya no lo corta; Mica gira más a
  cámara (se le ven los dos ojos). P5: el pizarrón entero ("DÓLAR:" con margen), Paola a su izquierda sin tapar el 40.
- Interior del contenedor más claro (paredes 0x4a6290, techo 0x5a6f96).
- Paola levanta la mano ABIERTA en P7b/Q7 (dedos y pulgar abiertos, sin los nudillos del puño). La mano de Seba agarra el borde de
  abajo del celular (no tapa la pantalla). Rulitos de Seba más chicos y solo arriba.
- Cartel: el texto se va con el iris (sin cuadros verdes vacíos) y el iris abre antes (0,4 s) sobre Seba (660, 1000).
Snapshots: renders/snap/r1a (31 cuadros de cada tramo tocado), r1b (proforma, pizarrón, P7b, Q6b, cierre); prev en renders/prev/r1.

## Ronda 2 de corrección (revisores sobre el render de 44,9 s) · sin render
**45,0 s.** Parte 1 0-20,94 · cartel 20,94-23,03 · parte 2 + cierre 23,03-45,0 = 21,97 s (48,8 %) · cierre 42,07-45,0 (PRECIOS
desde 42,42, línea chica desde 43,1). `check --json`: 0 errores. Mezcla: mediana voz-resto 19,7 LU, mínimo +11,1 LU con voz,
huecos sin voz máx -31,0 LUFS (montaje -32 a -35), -14,1 LUFS, pico -3,3 dBFS.
Planos (s): P1 0 · P2 2,1 · P3 3,8 · P4 5,62 · P4i (inserto proforma, corte) ~6,7 · P5 7,96 · P5b 8,76 · P5c 10,38 · P6f 11,51 (inserto
del ventilador) · P6 12,01 · P7a 15,08 · P7b 17,35 · cartel 20,94 · Q1 23,03 · Q3 25,22 · Q4 27,54 · Q4b 29,39 · Q5 31,39 · Q6 34,55 ·
Q6b 37,44 · Q7 39,44 · C 42,07.
Arte:
- Contenedor: la cámara más lejos (la capa del frente entra entera, sin 6.ª columna), los huecos aparecen mientras se llena la capa
  del frente (n ≥ 476): general y primer plano con la misma geometría.
- El celular de Seba va SIEMPRE en su mano (primero la mano en un punto alcanzable, después el celular arriba de ella), en P1/Q1, P3,
  P7a/Q6 (a la altura del pecho, no le tapa la cara) y P7b/Q7. En los insertos (Q3, Q6b) el celular llena ~63-66 % del ancho, con
  la mano de Seba (dedos en el borde, pulgar, antebrazo) y sin las cajas del fondo.
- Último cuadro: renderAt no pasa de DUR - 1 cuadro y las composiciones del cierre duran hasta DUR redondeado para arriba.
- P4: corte seco al inserto de la proforma (P4i) en vez del empuje por la cara; burbuja fija abajo; chip "Lunes, 9:05." se va con el
  corte; plano a dos más abierto (Mica y Paola enteras). Manos de Mica en las esquinas de abajo, afuera del papel.
- Q6: la cabeza de Seba a 3/4 (no perfil). Rulitos: 20, más grandes y pegados arriba (masa suave).
- P1/Q1: Seba de 3/4 hacia Paola/cámara, el brazo con el celular alto y afuera de la cara; cámara más baja y cerca; Paola sonriente.
- Montaje: pizarrón más chico (0,92 × 0,62) con Paola y el marcador en la mano; la calculadora entera (sin empuje). P6f: inserto de
  0,5 s del ventilador que se apaga y se frena ("492 de 500" y "Con lo que cobramos, traemos 492" siguen).
- Cierre: tarjeta y línea chica con márgenes de 100 px, textos 46-60 px; Paola con las dos manos abiertas.
- P7b/Q7: cámara corrida (cartel y Seba enteros). Chat de la parte 1 sin verde ("500 / 500").
Sonido/guion:
- Montaje sin el duck de huecos, música y SFX arriba (~-32/-35). "− $ 14.000": glitch + golpe a -33/-37 después de "plata" (el rótulo
  entra ahí y sigue en P7a); P7a 0,45 s después. 0,35 s de patio solo antes del whoosh del cartel. Loop del patio sobre
  calle-tramo.wav (2,0-15,4 s: sin el retumbe del principio). Error de "Debajo del margen" a -33 sin bajar el tono. pa4 0,2 s más
  tarde. Acentos de "Y ganamos plata." y "Vendé." +4 dB.
- Proforma: "Precio c/u USD 46" / "antes USD 38" ("Costo puesto" solo en el panel). Q3: burbuja en dos tiempos (fase s4) y el rótulo
  "El vendedor ve el precio de hoy / actualizado con la proforma nueva". Pregunta muda "¿A cuánto?" de Paola los últimos 0,4 s de Q1.
  Pedido: "Ventilador de pie 16"". guion.txt reescrito con la estructura y los tiempos actuales; fuentes.md al día.
Snapshots: renders/snap/r2a (33 cuadros), r2b-r2e; prev renders/prev/r2.

## Ronda 3 de corrección (la última, sobre el render de 45,0 s) · sin render
**45,0 s.** Parte 1 0-21,0 · cartel 21,0-23,09 · parte 2 + cierre 23,09-45,0 = 21,91 s (48,7 %) · cierre 42,08-45,0. `check --json`: 0
errores. `python3 partes/comentarios.py gen.mjs assets/tres.js prev.mjs`: ningún comentario antes de código en la misma línea.
Mezcla: mediana voz-resto 19,4 LU, mínimo +10,2 LU con voz, huecos sin voz máx -31,7 LUFS, -14,1 LUFS, pico -3,3 dBFS.
Arte: marcador real (cuerpo navy, tapa crema; su origen es la punta) que sigue el trazo al borrar el 40 y al escribir el 43, con la
mano en el cuerpo del marcador (Paola más cerca del pizarrón) · P2 con el puño entero · toda tarjeta entre y 200 y 1650 (forzado en
ponerGlobo); en Q3/Q6b la burbuja arriba en y ≥ 205 y el celular al 64 % del alto, más abajo · burbuja del remate (P6) y del callback
(Q5) en el mismo lugar, borde de abajo en 700, debajo de "492 de 500" / "500 de 500 ✓" · Paola seca desde el primer cuadro de P6
(ojos entrecerrados aun hablando) · Seba en P7a/Q6 de frente (giro ≤ 35°, en Q6 solo baja los ojos), el pulgar debajo del texto
de la notificación ("¡Mandame / 200 más!" más arriba), cámara corrida · calculadora entera · P7b/Q7 con el cartel CASA PAO entero y
"492 de 500" debajo, la burbuja debajo de eso; sin la tablet en Q7 · P1/Q1: cámara baja mirando un poco para arriba (se ve el
interior vacío del contenedor), la burbuja de Seba abajo sobre el piso con la cola a la boca, el ventilador más a la izquierda (el
celular ya no se le encima) · cejas de festejo de Paola en P1/Q1 y en el cierre · Paola de 3/4 en P4/Q4 (sin la boca de perfil)
· Q4b con la burbuja desde el primer cuadro y push-in 0,38 · P3: corte al inserto de la lista (P3i), sin barrido · ventilador: aspas
navy y un disco de movimiento que se apaga con la velocidad; P6 con el ventilador entero · "Techo… Caloventor…" en navy.
Sonido/texto: glitch de "Debajo del margen" desde 0,2 s (el golpe con el rojo) · acentos de "Y ganamos plata." y "Vendé." a ~-30
con duck de 0,3 s de la música · panel "Costo USD 46" · "+ $ 276.000 / después de reponer" · chapa de los huecos -43 · el patio baja
~4 dB desde el corte de la música en "Dejá de vender." hasta el cartel · "23.000 × 43" 0,52 s antes del 989.000 (el pizarrón un
poco más rápido; el par $ 989.000 / $ 975.000 sigue 1,32 s) · pop en la pregunta muda "¿A cuánto?".
Snapshots: renders/snap/r3a, r3b, r3c; prev renders/prev/r3 y p1x.
