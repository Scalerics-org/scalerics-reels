# dist-quien-debe · notas del constructor (18-11)

Proyecto con la forma de dist-cliente-grande / contable-papeles: todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada de cero
para este reel con la infraestructura de dist-cliente-grande (utilidades, `fusionar`, tarjetas pegadas a la cámara,
rótulos con guía, catmull() quieto después de la última clave, avatares por render target, la herradura de pelo de Rubén
y el bigote que se esconde de nuca) y la rotisería con el spiedo de ya-lo-cargo. `assets/personajes.js` = el de
contable-papeles (lentes finos centrados, `sinPatillas`, `rodeteAtras`) + **Patricia** nueva en ELENCO (castaño oscuro en
rodete, lentes finos navy sin patillas, blazer navy2 abierto = `campera` sobre camisa crema, aros crema; la credencial
crema lisa con cinta navy la cuelga tres.js).

## Comandos (desde reels/dist-quien-debe)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-r7.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10: loudnorm en DOS pasadas, lineal
LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 1.6 renders/prev/por   # fondo de la portada (después: node gen.mjs)
```

## Voces (partes/procesar.sh, partes/voces.md)
Patricia Pulcherrima · Rubén Algenib · Graciela Gacrux · Nico Fenrir · narrador Rasalgethi (09-b, atempo 1,06, 2,29 s:
entra "Una cobranza automática más tarde." sin fallback). Tomas: pa1 01-c (atempo 1,03: con 1,07-1,08 el STT oía "ahí
paga") · r1 02-c (1,1) · r2 03-b (hueco interno 0,57 → 0,3, 1,08, fundido final: Graciela lo pisa 0,32 s) · g1 04-a (tres
huecos internos acortados, 1,12) · r3 05-a ("…Dale." resignado) · pa2 06-a (se reusa idéntico en Q4) · r4 07-c (pausa
"Mejor." · "ahora…" 0,32 s; sin atempo: con 1,04 el STT oía "debes") · pa3/pa4: **08b-g / 15b-h**, tomas de "Bueno. Te paso
con …" con el "Bueno." cortado: sin contexto el STT oye "qué pasó" en TODAS las tomas de Patricia (6 normales + 6 con un
tono que pide la t clara); con el "Bueno." delante oye "te pasó", así que es el STT y no la voz · g2 10-b · n1 11-a · g3
12-b (dos huecos, 1,12) · r5 13-c ("Dale." firme) · r6 14-a (el STT oye "bendy" = vendí) · r7 16-c (1,1). "oyó:" igual al
texto en el resto.

## Mundo
Banco (origen, alfombra gris azulado): escritorio crema con canto navy en x ±0,56; Patricia en (-0,86; 0,02) y Rubén en
(0,88; 0,06), los dos girados 0,5 rad hacia la cámara; el monitor en brazo giratorio (gira de -0,2 a 0,36 rad en los
primeros 0,55 s: "− $ 140.000" en rojo apagado; en Q4 "+ $ 320.000" y "Sueldos $ 780.000 ✓" en verde); el timbre crema con
aro navy delante de Patricia (se hunde 6 mm); bowl de caramelos, plantita, portalápices, teclado; mampara esmerilada a la
izquierda (x -2,25), pared crema con cuadro abstracto al fondo, el turnero navy colgado a la derecha (E-051 · BOX 2 →
E-051 → BOX 3 / COBRANZAS rojo → E-051 → BOX 1 / INVERSIONES verde, con un flip de 2 cuadros), la sala de espera hacia
+x (sillas navy3, dispensador, cartel ATENCIÓN EMPRESAS, planta, un cliente de espaldas). Rubén con el termo bajo el
brazo izquierdo y el mate en la mano izquierda (sorbo al final de "un millón", sorbo vacío antes del remate).
Box de inversiones (x 20): pared navy2, sillón capitoné, cuadro verde apagado con manchas crema, lámpara de pie de bronce,
mesita con el café (la taza se corre 7 cm al arrancar C), el termo y el mate.
Rotisería (x 40): azulejo con guarda verde, mostrador con vitrina, spiedo de 3 barras con pollos que giran (función del
tiempo), pizarra; Graciela detrás del mostrador; su celular (funda verde) en un soporte, en altavoz, mirando hacia ella.
Muelle (x 60): pared navy claro, portón a medio subir, cartel DISTRIBUIDORA RUBÉN, camioneta crema con franja verde.
Oficina de Rubén (x 80): el monitor grande con el panel "Cuentas por cobrar".

Planos: P1 cuadro 0 (los dos, el monitor girando, el turnero) · P2 contraplano de Rubén por encima del hombro de Patricia ·
P3 inserto de la planilla (el pulgar baja, "fila n de 312", frena en Rotisería Graciela 94 · 186.000, Llamar) · P4
pantalla partida (dos cámaras con scissor + una pasada de las burbujas pegadas a la cámara principal) · P5 Patricia ·
P6 Rubén de frente · P7 Patricia con el timbre · P7t tilt al turnero (COBRANZAS) · cartel · Q1 rotisería · Q1i el
recordatorio ("¿Por favor?" ya sobre el inserto) · Q1g Graciela · Q1p Pagar → Pagado ✓ · Q2 el panel (el chip 3D "Pagado
✓" vuela a la fila de Graciela, Vencido 1.012.000 → 96.400, Quién y desde cuándo) · Q3i el aviso de Nico · Q3 Nico · Q4 =
P1 en verde · Q4s pantalla partida · Q4p5/Q4p6/Q4p7 = P5/P6/P7 · Q4t turnero INVERSIONES · C Rubén a cámara en el sillón.

## Duración y mezcla
47,53 s (1426 cuadros). Parte 1 0-21,95 · cartel 21,95-24,38 · parte 2 24,38-47,53 = 23,15 s (49 %); cierre (C) 44,0-47,53,
tarjeta COBRAR desde 44,25 ("COBRAR"), línea chica desde 46,13. Más largo que los 39,8 del plan: 16 parlamentos reales
(33,6 s de voz sola aun con atempo 1,04-1,13 y huecos internos acortados). Mezcla: bus +6 dB → compresor → ganancia a
-14 LUFS → limitador 0,675 (≈ -3,4 dBFS); mezcla.wav -14,1 LUFS, LRA 5,7, pico -2,9 dBFS, muestra máxima 22118 (sin
recortes); voz ≥ +13,8 LU sobre el resto en todos los tramos con voz (medir.py, ventanas pareadas).

## Pasada propia (prev + snapshots cada 0,5 s: renders/snap/p1, p2)
- P1 con los dos cortados en los bordes → personajes más juntos (escritorio de 1,12 m), cámara más atrás y fov 58.
- P2 el dorso del monitor tapaba a Rubén → cámara por delante del monitor, sobre el hombro de Patricia.
- P3 "Rotisería Graciela94186.000" encimado → columnas corridas y nombre ajustado; "va por 94" arriba con guía a la fila
  (tapaba Llamar); el encabezado ya no repite "Te deben".
- Pantalla partida: la burbuja de Rubén le tapaba la frente y Graciela quedaba detrás de la vitrina → Graciela a la
  derecha del mostrador, cámaras con más aire arriba.
- Burbujas: "{rojo.}" salía literal → textoSel parte en [verde] y {rojo}. Colas a la boca.
- Q1i duraba 0,4 s (no se leía) → el inserto sigue con "¿Por favor?" encima; Q1g para "Esto no lo escribió Rubén.".
- Q1p: el brazo del soporte cruzaba la pantalla (detrás ahora); la mano sin manga, el pulgar llega a Pagar.
- P7i (el dedo en el timbre, 0,4 s) era una mancha de mano → sacado; el timbre se ve en P7.
- Turnero cortado a la derecha → cámara de frente, lo llena al ~90 %.
- DISTRIBUIDORAS se salía de la caja → 98 px; el chip "Martes, 9:00." pisaba el rótulo del recordatorio → se va antes.
- Contadores HTML "Te deben" con números intermedios raros → de a mil.
- Q3: el cartel DISTRIBUIDORA RUBÉN cortado → corrido; Nico sale de cuadro hacia la cabina, el portazo cae en el corte a Q4.
- `check --json`: 0 errores.

## Render y pasada 2 (MP4 final, renders/qa1 y qa2: cada 0,5 s)
- Render 1: 682 s (SwiftShader, --workers 2); paso 10 (paso10.sh, loudnorm en dos pasadas, "linear") 49 s.
- Pasada sobre el MP4 1: Graciela con los ojos cerrados en "Esto no lo escribió Rubén" (feliz 0,55) → abiertos; Patricia
  de perfil con un solo lente en P7/Q4p7 → cabeza girada a cámara; 0,3 s de camioneta sola al final de Q3 → el corte a Q4
  cae mientras Nico sale de cuadro (el portazo suena sobre el corte).
- Render 2: 659 s; paso 10 lineal. Final: renders/dist-quien-debe-final.mp4, 47,57 s, -14,0 LUFS, pico -2,7 dBFS
  (true peak -3,1); mezcla: voz ≥ +15,8 LU sobre el resto (pareado). Pasada 2 cada 0,5 s sin defectos nuevos.

## Portada
Fondo LIMPIO del cuadro 0 a 1,6 s (portada-src/fondo-limpio.png: Patricia, el monitor "− $ 140.000" y Rubén con el mate;
el turnero E-051 · BOX 2 arriba). chica "Viernes, 16:00.", grande "¿Y? ¿Cobraste?", sello DISTRIBUIDORAS.

## Flojo / para los revisores
- 47,5 s, más largo que el plan (39,8); solución + cierre 49 % (no 54 %).
- P1/Q4: Rubén roza el borde derecho (hombro y termo); los dos personajes quedan medianos (plano general del box).
- P3 y Q1p: el pulgar suelto es grande (manopla) y tapa parte del texto al tocar.
- Q1: debajo de Graciela, el frente navy del mostrador ocupa la mitad de abajo del cuadro (0,45 s).
- Pantalla partida: Patricia no entra en la mitad de arriba (solo Rubén con el celular); el celular de Rubén es chico.
- El "corre la taza" del cierre es solo la taza que se desliza 7 cm (sin la mano).
- El ka-ching es bip de caja + monedas (no hay timbre de cajón CC0 en BigSoundBank).
- El turnero se ve ~1 s por vez; el dedo en el timbre no tiene inserto (se sacó por feo).

## Ronda 1 (18-11, sobre d1/arte.md, d1/sonido.md, d1/guion.md)
**43,3 s.** Parte 1 0-19,36 · cartel 19,36-21,65 · parte 2 21,65-43,3 = 21,65 s (50,0 %); cierre (C) 39,79-43,3, tarjeta
COBRAR desde 40,05. `check --json` 0 errores.
- Guion: Graciela "Mirá vos. Rubén nunca me cobra." (Gacrux, toma 10-d) y en el recordatorio se subraya "vence hoy"; panel
  coherente ("Te deben", Quién y desde cuándo: Kiosco Beto · Panadería Tito · Pizzería Dante; Héctor/Marta/Nelly/Walter
  con los mismos saldos en la planilla de la parte 1); planilla con nombres únicos y sin "almacén"; rótulo "Distribuidora
  Rubén · 15 empleados" con guía a Rubén en el cuadro 0; contador "Te deben" llega en 0,4 s y queda quieto ~0,7 s (en el
  primer plano nuevo de Rubén, centrado, entero); fuentes.md sin la factura 0431, con Tito y Dante.
- Ritmo: la planilla entra sobre "un millón"; Rubén cortado en "la fac—" (r2 a 2,62 s, atempo 1,12, hueco 0,18) y Graciela
  entra encima; g1 toma nueva más seca (2,34 s); una sola pausa de 0,42 s antes de "…Dale." en un PRIMER PLANO de Rubén
  (P4d, sale de la pantalla partida); pausas de 0,30 s antes de los dos "Te paso con…"; sin el plano general del Q1 ni el
  del banco en Q4 (el iris abre al celular; Q4 entra directo a la pantalla partida con el chip "Viernes, 16:00."); panel
  2,25 s; "Te paso con inversiones" = "Te paso" de la toma de cobranzas + "con inversiones."; narrador atempo 1,10; r7
  atempo 1,03; INVERSIONES +0,3 s.
- Sonido: ventanas de duck 0,3 s antes / 0,4 s después de cada voz (sin huecos mudos), ambiente +3-4 dB en banco, rotisería
  y Q4; zumbido.wav (gchase, CC0) en vez de zumbido-largo; sorbo vacío a -34; sin motor sobre el banco; sin el tintineo de
  la taza. medir.py marca 12,5 s: es la cola de "…Dale." contra el ka-ching que sigue (no se pisan).
- Arte: monitor ya girado en el cuadro 0, la mano de Patricia fuera de la pantalla (la lapicera señala "Sueldos hoy" del
  lado derecho; el "−" se lee); Patricia con la cabeza a cámara en P1/P5/P7 y sus repeticiones (lentes de frente, sin
  aro flotando); Graciela sin patillas y de frente; box más cerrado (personajes más juntos, dentro del 90 %); pantalla
  partida con el turnero fuera (no queda cortado), Graciela con el celular y la caja a la vista; planilla más chica con
  los rótulos arriba, fuera del celular; columna de nombres más ancha; el timbre: Patricia lo aprieta en P7 a la vista;
  el turnero termina arriba con Rubén entero abajo mirándolo (sin el monitor cortado); cierre sin la franja verde que nacía
  de la cabeza y sin la mesita (taza y mate cortados); muelle con el cartel entero, Nico de cuerpo entero y pelo de
  mechones; monitor sin textos chicos; importes sin pagar en crema.
- Flojos del coordinador: tarjeta COBRAR 2,99 s (r7 atempo 1,06, entra 0,06 s después del inicio de "COBRAR", cola 0,02 s); la burbuja de Patricia más abajo (minY 640): no toca el turnero. Ding-dong sin la entrada antes del flip (no pisa "Te paso con…").
- Render ronda 1: 566 s; paso10.sh lineal. Final 43,0 s, parte 2 50,0 %, -14,0 LUFS, true peak -3,2 dBTP (pico de muestra -2,4 dBFS), final vs crudo -0,3/+0,1 LU; voz ≥ +15,1 LU sobre el resto. Portada con el fondo limpio nuevo (Patricia, el monitor rojo y Rubén enteros arriba).

## Ronda 2 (18-11, sobre d2/guion.md, d2/arte.md, d2/sonido.md)
**44,0 s.** Parte 1 0-19,33 · cartel 19,33-21,56 · parte 2 21,56-44,0 = 22,44 s (51 %); tarjeta COBRAR 2,99 s.
- Números: recordatorio "Tu saldo vence hoy: $ 208.000", Pagado "Saldo al día · $ 208.000"; el panel arranca en $ 1.034.000
  y cobra $ 937.600 (Graciela 208.000, Héctor 312.000, Marta 205.400, Nelly 161.000, Walter 51.200) → $ 96.400; planilla
  con Beto 33, Tito 26, Dante 24 días y Walter 51.200; guion.txt y fuentes.md al día.
- Burbujas: "…Dale." en el primer plano de Rubén (parte 1) y "Dale." en la parte 2; Rubén "…de la fac—".
- Cortes: la pantalla partida corta a Graciela de pecho (P4g/Q4g) cuando entra "¡Rubén!…" y al primer plano de Rubén en
  "Dale." (Q4d); la línea "En llamada" se va con la pantalla partida.
- Q1: el mensaje ya está escrito al abrir el iris; el rótulo "Recordatorio automático" abajo del celular (no lo tapa el
  chip), 1,2 s; el "Pagado ✓" vuela desde abajo a la izquierda (no pasa por "Te deben").
- Turnero: cambia a COBRANZAS cuando Patricia aprieta el timbre y el tilt arranca ahí: ~0,9 s legible (INVERSIONES igual);
  el turnero más chico y más a la izquierda, entero en el cuadro 0.
- Cuadro 0 (mirado a 1080): cámara más baja y atrás, los dos enteros; monitor más grande (0,84 m) con "Distribuidora Rubén",
  "− $ 140.000" y "Sueldos hoy: $ 780.000" grandes; burbuja de Patricia de 3 líneas a la izquierda (no tapa caras ni
  monitor ni turnero); el termo apoyado en el escritorio atrás (bajo el brazo salía por el borde).
- Pantalla partida: arriba el monitor entero ("+ $ 320.000 · Sueldos ✓" en Q4), sin el turnero; abajo Graciela más cerca.
- Graciela con lentes finos centrados y la cabeza a cámara; sin el parpadeo que caía en "Mirá vos".
- Muelle: aviso de Nico 0,6 s, cartel corrido (la persiana lo tapaba). Cierre: Rubén sentado en el sillón con el mate,
  más chico y alto (la tarjeta no le tapa el torso entero).
- Sonido: "Te paso con…" con 70 ms más antes del corte del "Bueno." (STT: "te pasó"; el de inversiones el STT lo sigue
  oyendo "qué pasó" aunque el empalme es el mismo audio); ka-ching a -33; cola final +0,3 s. Voz ≥ +10,1 LU.
- Texto fantasma del cuadro 3,12: DISTRIBUIDORAS se va 0,04 s antes del corte.
- INVERSIONES cambia con el timbre (como COBRANZAS) y queda ~1 s. Render r2: 461 s; paso10.sh lineal. Final 43,97 s, parte 2
  50,9 %, -14,0 LUFS, true peak -3,1 dBTP (pico -3,0 dBFS), final vs crudo -0,2/+0,1 LU. Portada con fondo limpio nuevo
  (los dos enteros, sin tocar los bordes).
- Flojo: el primer cuadro del tilt al turnero muestra a Patricia cortada (0,1 s); el STT sigue oyendo "qué pasó con
  inversiones".
