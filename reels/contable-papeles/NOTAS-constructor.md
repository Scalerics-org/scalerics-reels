# contable-papeles · notas del constructor (18-11)

Esqueleto de inmobiliaria-visitas: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, escrita de cero para este reel sobre la
infraestructura de inmobiliaria-visitas (tarjetas pegadas a la cámara, regla de burbujas, catmull() quieto después de la
última clave, Sofi por render target) y el chat genérico de corralon-portland (cabecera, audios, fotos, `dibujarChat`).
`assets/personajes.js` = copia del de inmobiliaria-visitas, sin cambios: Adriana, Marcelo, Lucas y el repartidor se arman
en tres.js con DEFECTO + los parámetros del plan; Sofi = la de inmobiliaria-visitas.

## Comandos (desde reels/contable-papeles)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-*.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana; VER=portada
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D
VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs "14.6" renders/prev/porfull   # fondo de la portada (después: node gen.mjs)
```

## Voces (partes/voces.md, partes/procesar.sh)
Adriana Autonoe · Marcelo Enceladus · Sofi Achernar (atempo 1,12) · narrador Rasalgethi (toma c, atempo 1,05, 2,12 s: entra
"Una automatización más tarde."). Tomas: m1 01-c (hueco interno acortado, filtro de altavoz suave 260-4300 Hz: con
320-3400 el STT no entendía m6), a1 02-c, m2 03-b, a2 04-b, m3 05-a, m4 06-c, m5 08-b, a3 09-b, m6 10-a (hueco cortado en
0,9: con otros cortes el STT oía "yo Jordan hábito"), so 11-c. "oyó:" igual al guion en todas; el STT oye "la factura te la"
en m1 (la s se pega). El "Adri, las facturas…" de Q3 es el MISMO m1.wav.

## Mundo
Estudio (origen, piso y = 0): pared del fondo z = -0,7 navy2 con boiserie crema a 1,1 m; damero de calcáreas crema/navy;
ventana alta con postigos (fondo, x -1,75); estantería de biblioratos (x -0,68) y estante de 60 sobres kraft con nombres
(x 0,66; atlas de nombres; los que no mandaron, chatos con pestaña roja; P3 33 → 41; parte 2 todos llenos sin pestaña).
Adriana sentada en (0; 0,42) mirando a +z; escritorio de madera oscura x ±0,7, z 0,7-1,36; lámpara de banquero
(-0,36; 0,8) con pantalla verde emisiva, luz puntual cálida y cadenita; sumadora (0,42; 1,12) con la tira (cinta que se
recalcula con su largo: 0,52 m en P1, 1,45 m en P3 hasta el piso con rulos, 0,16 m en la parte 2); celular en soporte
(-0,1; 1,18); pila de carpetas (parte 1) / monitor (parte 2) en (0,4; 0,84). Puerta de calle en la pared de adelante
(x -0,95 a -0,05). Piolín a lo largo de z en x 1,6 con tickets y broches; Lucas en banquito (1,12; 2,1); en la parte 2,
Lucas en su escritorio (1,32; 0,05) con el café. Avalancha: 44 piezas (40 tickets, boleto, servilleta, figurita, bollo)
con semilla fija; salen de la boca de la caja en el vuelco (BOCA fija) y caen a su lugar en la pila (montículo sobre el
escritorio y la sumadora). Ticket en blanco: térmico con borde dentado, emisivo crema (se lee blanco a contraluz).
Panadería (x = 40): azulejo blanco con guarda verde, mostrador con vitrina y bandejas de bizcochos, canasto de flautas,
bolsas de harina; el cartel PANADERÍA MARCELO alto (fuera de los planos medios).
Luces: noche (hemisférica navy baja + key cálida + relleno frío + la lámpara), tarde (sol y cielo cálidos).

Planos: P1 cuadro 0 (Adriana, lámpara, celular con el audio) · P2 graba · P3 inserto del celular (19:40, 20:30) · P3b
Lucas cuelga el ticket · P3c los sobres (contador 33 → 41) · P4 desde atrás de Adriana: la puerta y Marcelo · P4v la
avalancha de costado · P5 Adriana levanta el ticket contra la lámpara, push-in · P5c contraplano de Marcelo · P6 la pausa
con 4 rótulos · P7 Marcelo en la puerta · P7i la foto en blanco · P7c Adriana cierra los ojos · cartel · Q1 panadería ·
Q1i el WhatsApp del estudio (inserto sobre el azulejo liso: el mostrador tapaba la pantalla) · Q1b el repartidor y la
bolsa · Q1c el visor de la cámara → Subido · Q1w "Listo. Ordenadito." · Q2 estudio de tarde · Q2m el panel · Q3 encuadre
del cuadro 0 · Q4 60 de 60 · Q4b la cadenita · Q5 Sofi.

## Duración y mezcla
42,5 s (1275 cuadros). Parte 1 0-18,61 · cartel 18,61-20,91 · parte 2 20,91-42,5 = 21,6 s (51 %); cierre (Sofi) 39,26-42,5,
tarjeta PAPELES desde 39,34 (3,2 s). Mezcla: duck de la cama 0,6 bajo cada voz (desde 1 s antes); voz ≥ +6,0 LU sobre el
resto en todos los tramos de 0,5 s (el más justo: 39,0 s, la entrada de Sofi; el clic de la cadenita quedó bajo por eso);
-14 LUFS. SFX nuevos de BigSoundBank CC0 (obturador, sumadora, lámpara, bolsa), en fuentes.md.

## Pasada propia (prev + snapshots cada 0,5 s en renders/snap/p1, p2, p3)
- "ESTUDIOS CONTABLES" se cortaba en una línea → dos líneas de 118 px; el chip debajo.
- P1: lámpara cortada en el borde → escritorio más angosto, lámpara y sumadora más cerca, fov 54; el audio abajo con la
  cola al celular (no lo tapa).
- P2 y P7c demasiado cerca (los lentes llenaban el cuadro) → cámara más atrás.
- P3b: la cámara veía a Lucas de espaldas y sin el piolín → desde adelante, el piolín con los tickets en cuadro.
- P4/P7: la puerta quedaba detrás de Lucas y la cabeza de Adriana tapaba a Marcelo → la puerta a la izquierda, cámara alta
  detrás de Adriana; la burbuja de "Acá está todo" no pisa el chip 22:10.
- La avalancha no se veía (el respaldo de la silla) → plano P4v de costado en el vuelco.
- P5c era negro (la cámara dentro del pelo de Adriana) → por detrás del otro hombro.
- P6: rótulos encimados y guía de los sobres a la cabeza de Adriana → reubicados, la guía va a la fila de arriba de sobres.
- Q1i: el mostrador tapaba la pantalla del celular → inserto sobre fondo liso; el rótulo abajo (no pisa la cabecera).
- Q1: el celular le tapaba la cara a Marcelo → a la altura del pecho; el cartel de la panadería más alto.
- Q2m/Q4: la cabeza de Adriana entraba en el inserto del monitor → monitor en (0,4; 0,84), ry -0,4.
- Q5: el celular de Sofi chico → más cerca; cierre 3,4 → 3,2 s (Sofi atempo 1,12).
- `check --json`: 0 errores.

## Portada
Plano propio VER=portada (LIMPIO=1, t 14,6): Adriana de frente con el ticket en blanco en alto contra la lámpara verde, la
montaña de tickets delante (portada-src/fondo-limpio.png). Sin Marcelo (en vertical tapaba la pila o quedaba cortado).
chica "Último día, 22:10.", grande "¿Y esta?", sello ESTUDIOS CONTABLES.

## Flojo / para los revisores
- 42,5 s: más largo que el plan (38,6) por las tomas reales; parte 1 18,6 s.
- Q3: el monitor queda cortado en el borde derecho (fondo; el panel se lee en Q2m y Q4).
- Q1b: el repartidor se ve de espaldas y grande a la derecha.
- P3b: Lucas grande en cuadro, la tira en el piso casi no se ve en ese plano (se ve en P5/P6).
- P4v: Adriana queda en el borde izquierdo durante la avalancha.
- Los sobres en la parte 2 quedan llenos y sin pestaña (no se reemplazaron por biblioratos como decía el plan).
- Marcelo golpea la puerta (madera-golpe) en vez del timbre del plan; `bsb-0160.mp3` (timbre) está descargado si se prefiere.
- Manos-puño del elenco: el dedo de Adriana sobre el celular en Q3 se lee como una bola.

## Render de revisión (18-11)
Render 941 s (15,7 min, SwiftShader, --workers 2); re-codificación del paso 10: 171 s. Final 42,6 s, 1275 cuadros,
-14,1 LUFS, pico -5,4 dBFS (renders/contable-papeles-final.mp4; hoja cada 0,5 s en renders/hoja-final.png).

## Ronda 1 de corrección (18-11, sobre contable-arte, contable-sonido, contable-guion)
**39,8 s (1192 cuadros).** Parte 1 0-17,65 · cartel 17,65-19,95 · parte 2 19,95-39,73 (50 %); cierre (Sofi) 36,52-39,73 (3,2 s).
Render 837 s; paso 10 75 s; final -14,2 LUFS, LRA 7,7, pico -1,2 dBFS. `check --json` 0 errores. medir.py ahora compara
ventanas pareadas (voz y resto en el mismo cuadro): mínimo +12,7 LU (criterio viejo de máximos del tramo: +8,8).
- Guion: todo en octubre (el Día 1 pide las de octubre, factura 31/10, "Subido · 14 fotos · día 3 · Octubre: 14
  comprobantes", panel "Comprobantes · Octubre", carpeta "Marcelo · Octubre · 14 ✓" del 3 al 31 de octubre, sin "harina");
  "¿Y este?" (toma nueva Autonoe a); "¿Ah, sí? Ni me di cuenta." (toma nueva Enceladus a); rótulo "Cada cliente, su link";
  carpeta 1,65 s; portada "¿Mañana sin falta?" / "Último día, 18:00." / ESTUDIOS CONTABLES (fondo: el cuadro 0 limpio).
- Lámpara: más chica (0,85), de costado (la pantalla apunta a la cámara) y en (-0,37; 1,0): no toca la cara en ningún
  plano. P5: el ticket al costado de la cara, la mano abajo; plano más abierto (fov 40).
- P7: el celular de Marcelo muestra su chat con "Adri · estudio" y la foto en blanco (nada de la solución); la caja vacía
  queda en el piso con la tapa desde la pausa (rótulo con guía a la caja).
- Puerta: Marcelo golpea afuera con la puerta cerrada, se abre y entra; en P7 la puerta se cierra detrás de él (sonido
  ajustado). Relleno de luz en la puerta; pelo de Marcelo gris oscuro en todo el reel; repartidor con gorra crema.
- Q3 de 7,6 s → tres planos: el encuadre del cuadro 0 (el audio, cortado por Adriana en "mañana s…", m1b.wav), primer
  plano de Adriana de 3/4 con el monitor entero, pausa de 0,45 s, inserto del celular con "¿Ah, sí? Ni me di cuenta.".
- "Ilandaron": Adriana se oculta en los insertos del monitor (su pelo pisaba la M). Monitor más chico (0,5 m) y entero
  en Q3; fuera de cuadro en Q5. Monitor de Lucas al costado. Luz de tarde más cálida + luz de ventana.
- Lámpara apagada: pantalla verde oscura no emisiva + foco y luz apagados; clic de la cadenita a -37 con hueco en la música.
- P6: 1,28 s con rótulos escalonados; guía de Adriana al hombro (no cruza la cara), del ticket a la punta, sobres y caja.
- Burbuja de Adriana en P2 con aire arriba (la cola baja a la cabeza); en Q3a al costado.
- Audio m1 "0:03"; filtro de altavoz más suave (200-5000 Hz) para "Adri"; "¿Y este?" +1,5 dB. Compresor suave en el bus
  (LRA 13,1 → 7,7) para que el loudnorm del paso 10 no bombee. Rubro "ESTUDIOS CONTABLES" se va antes de la burbuja.
- Cartel de la panadería entero en Q1; inserto Q1i con el chat lleno (textos de 46-64 px); Q1c al 80 %.
- No hecho: el saco de Adriana en Q4 (solo tira de la cadenita); el estante de sobres en la parte 2 sigue con los sobres
  llenos (no biblioratos); los 0,1 s de audio de más los agrega el AAC del paso 10.
