# dist-cartera · notas del constructor (24-11)

Proyecto con la forma de dist-quien-debe: todo sale de `node gen.mjs` (assets/tiempos3d.js, compositions/*.html, index.html,
assets/audio/mezcla.wav). La escena 3D entera está en `assets/tres.js`, armada para este reel con la infraestructura de
dist-quien-debe (utilidades, `fusionar`, tarjetas pegadas a la cámara, globos con la cola a la boca, rótulos, catmull()
quieto después de la última clave, avatares por render target, la herradura de pelo de Rubén, el bigote que se esconde de
nuca, el muelle y la oficina de Rubén) y los pallets/racks/cajas de dist-cliente-grande. `assets/tres.js` se arma
concatenando piezas que quedaron en el scratchpad de la sesión; desde ahora se edita directamente `assets/tres.js`.
`assets/personajes.js` = el de dist-quien-debe + **Leo** nuevo en ELENCO (castaño oscuro texturado, barba de tres días,
chomba crema, campera de nylon verde apagado #365f28 abierta, pantalón navy2); la mochila (navy3 con franja verde, dos
correas) y el celular en el bolsillo del pecho (lado derecho) los cuelga tres.js.

## Comandos (desde reels/dist-cartera)
```
TOMAS="a b c" bash partes/reintentar.sh   # tomas (partes/lineas.tsv; LINEAS=partes/lineas-r1.tsv TOMAS="d e f" para Marta/Nico)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas (+ palabras-s1.json)
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 sin capa plana
python3 medir.py                          # voz contra resto por tramos de 0,5 s (después de MEDIR=1 node gen.mjs)
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x [px,py,pz,mx,my,mz,fov]   # solo la capa 3D (FULL=1 a 1080)
bash paso10.sh                            # paso 10: loudnorm en DOS pasadas, lineal
```

## Voces
Ver `partes/voces.md`. Leo = Sadachbia (nuevo), Rubén = Algenib, Nico = Fenrir, Marta = Aoede, Sofi = Achernar. El narrador
es el audio de `reels/lo-mismo-que-la-otra-vez` ("Un sistema de clientes más tarde.", el STT lo oye igual) con atempo
1,2 desde la ronda 1 (2,40 s); el cartel dice "Un sistema" / "de clientes" / "más tarde…" (nota 1 del coordinador). Línea final de Rubén cambiada
a **"Treinta y ocho. Con nombre y apellido."** (nota 2: "Y ninguna camioneta" era críptico); el callback de la camioneta
queda en la tarjeta "Autoservicio Pérez · Carlos Pérez ✓ · Nota: camioneta roja" de Q2 con el rótulo "Hasta el de la
camioneta roja".

## Mundo
- Depósito (origen): mesa = 4 pallets + tabla + mantel en (0, 0, 0,82); la torta con "¡Suerte, Leo!" escrito y el
  cartelito "¡SUERTE, LEO!" de frente a cámara; vasitos, gaseosa navy sin marca, platitos; guirnalda crema/verde en
  z = -2,7; rack lleno al fondo (z -3,6) y otro detrás de la cámara del cuadro 0 (z 4,5, fondo de los planos frente al
  monitor); portón con franja de luz de tarde plana a la derecha; escalera a la oficina vidriada a la izquierda.
- Escritorio de Leo en (-3,1; -0,7): monitor 0,84 m (pantalla canvas 1280×800: la planilla en la parte 1, el sistema de
  clientes en la 2), teclado, mouse, silla corrida con la caja de cartón de sus cosas, archivador.
- Cafetería de Marta (x 40), muelle (x 60, de dist-quien-debe), oficina de Rubén (x 80, de dist-quien-debe; sin el mate de
  la mesa: Rubén tiene el suyo en la mano).

## Planos
P1 cuadro 0 (despedida) · P2 primer plano de Rubén · P3 Leo + P3i inserto del celular del bolsillo · P4 la planilla (la
línea de Rubén con burbuja sin cola abajo) · P5 Rubén frente al monitor, la cámara detrás del monitor · P5m Marta · P6
Rubén y Nico (detrás del monitor) · P6i inserto: la fila se tacha y se va · P6b los dos · cartel · Q1 = P1 · Q1r = P2 ·
Q1l Leo señala y la cámara viaja al monitor (Catmull-Rom) y se queda en la ficha (Q2 dentro del mismo plano) · Q3 = P6 ·
Q3m el monitor "Pasar cartera" y las 38 tarjetas que vuelan · Q3i el celular de Nico (llegan, 38 clientes ✓) · Q3b los
dos · Q4 Nico en el muelle · Q4m Marta · Q5 el panel en la oficina · C Sofi a cámara.

## Duración
44,0 s (1320 cuadros). Parte 1 0-17,88 · cartel 17,88-20,63 · parte 2 20,63-44,0 = 23,37 s (53 %); cierre C 40,20-44,0,
tarjeta CARTERA desde 40,75 (el STT ubica mal "Comentá": el hueco de la k de "CARTERA" está en 0,43-0,50 s de s1).

## Mezcla
Bus +6 dB → compresor → ganancia a -14 LUFS → limitador (como dist-quien-debe). mezcla.wav -14,0 LUFS; voz ≥ +7,6 LU
sobre el resto en todos los tramos con voz (medir.py, ventanas pareadas; el peor era la cola de "¡Ay, sí! Mandame." contra
el ding de "Pedido ✓": ding a -42 y 0,12 s después). El murmullo de la despedida y la música se CORTAN secos en "¿Y los
clientes?" (P2) y vuelven bajos en P4; en la parte 2 el murmullo no se corta. SFX nuevos CC0 de BigSoundBank en
fuentes.md. Paso 10 (paso10.sh, loudnorm en dos pasadas, lineal): -14,0 LUFS, true peak -2,8 dBTP.

## Pasada propia (prev de la capa 3D cada 0,5 s en renders/prev/full + snapshots con la capa HTML en renders/snap/s1, s2)
- P1: personajes chicos y Leo cortado en el borde → cámara más baja y cerca (fov 56), la burbuja desde el cuadro 0.
- Abrazo: la mano de Rubén se juntaba con el puño de Leo en el pecho → la mano de Rubén al hombro de Leo; Leo con los
  brazos al costado.
- P2/Q1r y P3/Q1l: el cartelito "¡SUERTE, LEO!" asomaba cortado en el borde → cámaras corridas.
- P3i: la mano de Leo tapaba el celular del bolsillo → el bolsillo pasó al lado derecho; notificaciones más compactas para
  que "+36" quede arriba del bolsillo.
- P5/P6/Q3: con la cámara detrás del monitor, el dorso del monitor tapaba a Rubén → Rubén y Nico al costado del
  escritorio; bisel navy3; un rack detrás de la cámara del cuadro 0 como fondo (antes pared lisa).
- P6b/Q3b: el brazo de Rubén cruzaba el cuadro hasta el mouse → sin mano en el mouse (el click se ve en los insertos).
- Q1l: el gesto de Leo (índice para arriba) se leía como un gesto feo → la mano señala de costado; burbuja de Leo solo
  hasta que la cámara se va; los operarios se esconden mientras la cámara viaja (uno llenaba el cuadro).
- Q2: "Autoservicio Pérez · nota: camioneta roja" chico → tarjeta grande centrada (86/62/70 px de lienzo).
- Q3i: una cuña negra (la silla de Leo) y la mano suelta tapaban el celular → silla movida, sin mano.
- Q4: el cartel DISTRIBUIDORA RUBÉN del muelle quedaba cortado → fuera de cuadro.
- Q5: Rubén cortado en el borde → cámara más abierta, Rubén al lado del panel.
- C: la tablet de Sofi se veía como una franja negra → sin tablet; Sofi más arriba (la tarjeta le tapaba la boca); el
  rack nuevo atravesaba la cámara → más atrás.
- Parpadeos: Leo y Rubén parpadeaban hablando (4,5 s, 25,0 s y 3,2 s en el render 1) → parpadeos fuera de las líneas.
- `check --json`: 0 errores.

## Render
Render 1: 13 min 10 s de captura (SwiftShader, --workers 2; 36 min con la espera del candado por el otro reel). Paso 10 ~50 s.
Render 2 (parpadeo de Rubén en "¿Y los clientes?" corregido): 13 min 43 s de captura (sin espera de candado), paso 10 lineal: -14,0 LUFS, true peak -2,8 dBTP. Final: renders/dist-cartera-final.mp4, 44,01 s.

## Portada
Fondo limpio de P1 a 1,6 s (portada-src/fondo-limpio-1.6.png, LIMPIO=1: sin capa plana, burbujas ni el cartelito de la
torta, cuyo texto asomaba debajo del gancho): Leo y Rubén en la mitad de arriba. zoom 1,2, foco 88 %, foco_x 42 %. chica
"Viernes, 18:00.", grande "¿Y los clientes?", sello DISTRIBUIDORAS.

## Flojo / para los revisores
- 44,0 s justos; solución + cierre 53 %.
- Q5: el panel y Rubén quedan en la mitad de arriba; abajo, escritorio y piso de la oficina.
- Q1l: el viaje de la cámara de Leo al monitor pasa ~0,4 s por un pallet de harina (cuadro de transición).
- Q3i: el celular de Nico flota sin mano (inserto).
- El cuchillo de la torta se ve chico; P2 lo tiene en la mano pero casi fuera de cuadro.
- Leo nunca se ve con el gesto de señalar dentro del cuadro con claridad (la mano sale por el borde izquierdo).
- P2 (2,3-3,9 s) y Q1r: en la esquina de abajo a la izquierda todavía asoma un pedacito del cartelito de la torta (render 2). Arreglo: CAM_P2 más a la derecha o el cartelito oculto en esos planos.

## Ronda 1 (revisión independiente: arte, sonido, guion)
**42,47 s.** Parte 1 0-17,76 · cartel 17,76-20,24 · parte 2 + cierre 20,24-42,47 = 22,2 s (52 %). Cierre 3,51 s.
`assets/tres.js` se edita directo desde esta ronda (las piezas del scratchpad quedaron viejas).
- A1 Q3i: la pantalla del celular llena el cuadro (93 %), ya no se ve flotando; las fichas solo vuelan en Q3m (no tapan el
  contador ni el encabezado).
- A2 Q5: oficina nueva: pared alta (sin la franja clara), la cartera en una pantalla grande en la pared y Rubén parado
  debajo, sin escritorio; la pantalla entera desde el primer cuadro (sin filas vacías); parpadeo antes de hablar.
- A3 pausas: hueco interno de r2 0,45 s; "¿Qué Rubén?" 0,42 s después de "Marta, habla Rubén."; "Donde estuvieron
  siempre." 0,41 s después de "¿Y los clientes?".
- A4 remates en dos tiempos (r2, m1, r4, r5, r6): gen.mjs calcula `CORTE` (fin del silencio interno de cada toma) y tres.js
  muestra la burbuja "a" (mismo tamaño, segunda línea vacía) y la completa con pop cuando suena. En P4 "En el Excel: 3"
  late en rojo en "tres." y entra "$ 1.900.000 por mes / que se van con Leo".
- M1 "Autoservicio Pérez" en todos lados. M2 líneas nuevas de Nico y Marta (voces nuevas), Walter "¿Pasás el jueves?",
  inserto Q4i del celular de Nico con la ficha (texto ≥ 46 px de lienzo) y el dedo que toca "Llamar" → "En llamada".
- M3 Marta: toma con "cómpro" forzado (el STT transcribe "compró" siempre; ver partes/voces.md).
- M4 la repetición arranca en "¿Y los clientes?": la interfaz entra a 22,86 s; total 42,47 s.
- M5 sin travelling: corte limpio de Leo al monitor sobre "siempre", whoosh largo a -38.
- M6 TECHO -38 antes de la ganancia final (≈ +6,9 dB → ningún efecto ni la cama pasan -31 en el final); la cama ya no se
  sube +7; duck de la cama 0,55 (~-7 dB) en P4, P6i, Q2, Q3m y 37,2-37,9; tics/toques/dings/page-turn/whoosh a -38/-40.
  Voz ≥ +6,9 LU sobre el resto (medir.py).
- M7 encuadres de Leo (P3, Q1l) y Marta (P5m, Q4m) más bajos y burbuja más alta.
- M8 el cuchillo con la hoja para arriba en P2/Q1r; el cartelito de la torta solo en P1 y P3i.
- M9 sin la gaseosa; la mano de Leo va al celular del pecho y se queda 0,45 s.
- M10 el molinillo (el cono marrón) fuera del cuadro de Marta. M14 la pizarra fuera de cuadro; cámara de P6/Q3 más
  abierta (Nico entero).
- M11 Sofi sin la franja navy (el "cinturón"), tablet bajo el brazo, cierre 3,51 s.
- M12 monitor del escritorio cuadrado (0,84 × 0,84): en los insertos llena ~53 % del alto (más que eso cortaría los
  costados de la pantalla). M13 textos de interfaz ≥ 36 px en el cuadro (lienzo del monitor ≥ 54 px; panel ≥ 66 px;
  celular de Rubén sin texto chico: la cara de Marta y el parlante).
- M15 portada: fondo limpio con cámara propia (más arriba y atrás): las dos caras enteras, el cartelito "¡SUERTE, LEO!"
  y el borde de la torta arriba del gancho; zoom 1,0, foco 30 %.
- Bajas: baranda de la escalera navy (sin la raya verde); sin la inscripción de la torta; DISTRIBUIDORAS hasta el corte;
  parpadeos fuera de las líneas (Rubén 1,2 · 9,36 · 22,32; Nico 13,61; Sofi ninguno); barba de Leo más visible;
  créditos Kenney en fuentes.md; sin "bolsillo" en textos.
Render r1: 10 min 29 s de captura (10,5 min con candado). Final 42,5 s, -14,0 LUFS, true peak -3,3 dBTP.

## Ronda 2
- Q4i sin burbuja (entra en Q4, 30,98): el botón "En llamada" queda libre. Q3i: 2 fichas (el rótulo ya no pisa la tercera).
- "Pedido ✓" con el ding sobre "Mandame." (T.pedido = m2 + 2,3) y queda ~1 s; r6 0,3 s antes; pausa de 0,35 s antes de Sofi.
- Ficha Q2: "Siempre: Aceite x6 · Harina x4". Q5: cámara más baja (Rubén más arriba), rótulo a y 1790 sobre el pecho.
- Contador de Q2 en 38 0,4 s antes de la ficha. Whoosh/ding/pop de Q2, Q3m y Pedido 1 dB más bajos. "En el Excel:" igual
  en P4 y P6. Rubén en Q3b más a cámara. Tablet de Sofi pegada al costado, detrás de la mano. Sello de la portada 20 px más
  abajo (sello_top 330 px).
- No hecho: subir el murmullo y el pizzicato de P1 a -35 antes de la ganancia: con la ganancia final de ~+6,9 dB quedarían en
  ~-28 en el final (más que el techo de -31 de 8c); quedan en -38 (≈ -31 en el final). Sofi sigue con atempo 1,08 (sin él, el
  cierre pasa de 3,6 s).
- Excepción aceptada: en el cuadro 0 la burbuja de Leo muestra la línea entera ("…Pero me voy.") desde el primer cuadro: es
  el gancho.
Render r2: 10 min 57 s de captura. Final 42,6 s, -14,0 LUFS, true peak -2,9 dBTP.

## Retoques ronda 3
Sin la tablet de Sofi; "Mandame." en dos tiempos junto con "Pedido ✓" (T.pedido); parpadeo de Rubén en Q5 a q5 - 0,25
(fuera de cuadro); sin el cartel DISTRIBUIDORA RUBÉN de la pared del fondo (asomaba cortado en P1); portada con fondo a
fov 52 y sello_top 286 px (no tapa el pelo de Leo). Render final: 11 min 55 s; 42,6 s, -14,0 LUFS, TP -2,9 dBTP.
