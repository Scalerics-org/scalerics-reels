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
