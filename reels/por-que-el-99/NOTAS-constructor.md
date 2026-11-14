# Notas del constructor · por-que-el-99 (14-11)

Duración: **30,82 s** tras la ronda 1 (voz 30,70 s; ver "Ronda 1 de corrección" al final). Cierre 2,66 s desde "videollamada" (28,16). No se renderizó el mp4 (lo hace el coordinador).

## Render (desde reels/por-que-el-99)
```
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/por-que-el-99.mp4
ffmpeg -y -i renders/por-que-el-99.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/por-que-el-99-final.mp4
```
Portada (desde la raíz, con el mp4 ya hecho): `flock /tmp/hyperframes.lock node herramientas/portada.mjs por-que-el-99`
(usa `portada-src/fondo-portada.png`; `portada.png` ya está generada con ese mismo fondo).

## Cómo regenerar (desde la carpeta del reel)
1. Voz: `node partes/armar-voz.mjs` → `assets/voice/locucion.wav` + `partes/tramos.json` (una frase por tramo).
   Tomas: `partes/orus1-1.wav` (Orus, frases 1-8), `partes/n4-2.wav` ("No está probado." suelta), `partes/ruben-3.wav`
   (Algenib), `partes/orus2-1.wav` (Orus, reporte + cierre). Orus con atempo 1,1; silencios fijos entre frases
   (0,42 después del gancho y de "cien.", 0,45 después de "No está probado.", **0,42 entre "Más caro…" y "y vendió
   más"**, 0,45 antes de Rubén y 0,4 después).
2. Tiempos: `node partes/ajustar-tiempos.mjs` (cada frase cae exacta en su tramo; adentro, palabras repartidas por
   sílabas; `partes/texto.txt` = guion de pantalla con "scalerics.com."). El STT de control quedó en `partes/pal-stt.json`.
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (20,99-22,78).
4. `node gen.mjs && node armar.mjs`.
5. Fondo de portada: `LIMPIO=1 node armar.mjs`, snapshot a 4,1 s, `node armar.mjs` para volver; el fondo limpio está
   en `portada-src/fondo-limpio-4.1.png` y corrido 200 px hacia arriba en `portada-src/fondo-portada.png`.

## Voz (STT de control)
- Orus toma 1 de 3: las tres decían igual para el STT. "No está probado" el STT lo oía "no está aprobado" en las tres
  tomas largas; se generó la frase suelta (n4, 3 tomas): la n4-2 el STT la oye exacta, también recortada sola a tempo
  1,1. Dentro de la locución el STT vuelve a oír "aprobado" solo cuando el recorte incluye la cola de "vuelto" (sesgo del
  STT por contexto; el recorte 8,70-9,90 lo oye "no está probado").
- "se midió" el STT lo oye "se me dio" en todas las tomas (también en 3 regeneraciones con el tono marcando la i): es
  el STT; se dejó la toma original. "El nueve suena a oferta" lo oye "suena oferta" (la a pegada).
- Rubén toma 3 (2,0 s): "¿Y mi noventa y nueve vendió más?" (STT: "y me 99 vendió más").
- "scalerics.com" se dice "Scálerics punto com" (STT: "escalerita.com", como siempre).

## Planos (segundos globales)
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | O1: por encima del hombro de Rubén (oficina vidriada, depósito con racks detrás), push-in al monitor; tipea 9 (0,95), 9 (1,30), 9 (1,65), confirma (2,0); el 999 3D se despega (2,2-2,77) |
| 2 | s02-primer-numero | 2,77 | P: corte al 999 parado en la planilla (mismo encuadre); órbita a 3/4; primer 9 verde y grande en "primer" (3,22-3,62) |
| 3 | s03-cien | 4,71 | travelling (4,59-4,96) a las etiquetas $ 99 / $ 100 (x 2,3); la de 100 cae en "menos" (6,16) |
| 4 | s04-cajero | 7,22 | travelling a la caja (x 4,7); manivela + cajón 7,56; monedas 8,18; sello 8,99; placa NO PROBADO |
| 5 | s05-catalogo | 10,15 | travelling al catálogo (x 7,0); tapa 10,20; vestido 10,76; los otros dos 11,51 |
| 6 | s06-tres-precios | 12,44 | dolly atrás; US$ 34 12,62 · 39 13,90 · 44 14,35; cajas a 3 (12,59 / 12,99 / 13,39) |
| 7 | s07-vendio-mas | 14,95 | push-in a 34/39, flecha 15,24-15,59; pausa; 4.ª caja del 39 y tilde 16,41; vuelve al general |
| 8 | s08-oferta | 17,46 | "mismo 3" con dos guías; giro del 39 a OFERTA 18,62-18,94; push-in |
| 9 | s09-redondo | 19,28 | la OFERTA salta del riel (19,24) y vuela con la cámara al regalo (x 10,6), choca 19,75, cae; tilde 20,12; la cámara sube a cenital sobre la OFERTA (20,45-20,74) |
| 10 | s10-ruben | 20,74 | O2: corte grilla→grilla a la pantalla (celda $ 999 + "?" rojo); la cámara sube por arriba de Rubén y baja de frente (21,1-22,1); Rubén girado hacia cámara habla (boca por amplitud); en "vendió" mira al depósito |
| 11 | s11-reporte | 23,18 | O3: el celular vibra en el escritorio; Rubén lo levanta con las dos manos y lo muestra (23,33-23,73); push-in; tarjetas 23,78 y 24,96 |
| 12 | s12-medimos | 25,92 | O4: baja el celular (26,02-26,37), levanta el mate a cámara (26,17-26,57), media sonrisa |
| 13 | s13-cierre | 27,87 | F: fondo verde, "Videollamada / gratis / scalerics.com" + etiqueta 3D "$ 999" que se hamaca |

## Objetos 3D (assets/tres.js)
Oficina vidriada (piso de tablas, vidrios con parantes navy adelante/atrás/izquierda, pared navy3 con biblioratos),
escritorio de madera clara, monitor con la lista de precios (CanvasTexture viva: selección verde, tipeo con cursor,
celda confirmada, "?" rojo apagado), teclado, mouse, carpeta, celular (pantalla "REPORTE · Ventas de la semana"),
mate y termo (`personajes.js`), Rubén = `ELENCO.ruben` (sin parpadeo automático), depósito abajo (racks navy claro con
largueros crema, pallets con cajas kraft y film, fleje verde, zorra hidráulica, columnas). Planilla gigante (celdas con
líneas crema, fila de encabezados A…AX), 999 (tres TextGeometry Lexend 800), perchero + etiquetas $ 99 / $ 100
(extrusión con ojal y números 3D), caja registradora (base con cajón, cuerpo inclinado, 24 teclas, display "$ 99",
manivela), 5 monedas (balística con semilla), sello de goma, placa NO PROBADO, catálogo de pie que se abre, 3
vestidos (percha de madera, Lathe verde con escote V crema, cinto navy, ruedo), riel, etiquetas US$ 34/39/44 con
dorso OFERTA, pilas de cajas 3/4/3, flecha crema, tildes, regalo navy con moño y precio "$ 4.000", etiqueta "$ 999"
del cierre. Sin marcas ni caras de investigadores.

## Sonido
Todo de `assets/sfx` (copiado de por-que-sacar-numero): click-soft, key-press, click, whoosh-cinematic, tac-real, pop,
golpe, tic, ding (campanita de la caja), tic-real (monedas, choque), sello, papel-fuerte, impact-bass-1, whoosh-short,
sparkle, whoosh-cine-corto, vibra, notification, chime, whoosh. Música `assets/bgm/bed.mp3` con sidechain de la voz y
baja en la pausa de "Más caro… y vendió más" (DUCK en armar.mjs). Nada nuevo ni sintetizado. TECHO -31 LUFS por efecto.

## Mezcla (pre-loudnorm, `python3 partes/medir.py` + `python3 partes/medir-fino.py`)
I -17,2 LUFS, pico -4,4 dBFS (el paso 10 lleva a -14 LUFS / -1,5 dBFS). **Tramos de 0,1 s con voz sonando y menos de
6 dB sobre música+SFX: ninguno.** Tramos de 0,5 s marcados: 17,0 (4,0 dB), 20,5 (3,2), 25,5 (0,6): los tres son cola
de palabra + pausa (la voz termina en los primeros 40-160 ms del tramo; RMS de voz -41 a -55 dB). Ajustes: sello 0,2 →
0,05 (pisaba "está"), ding/impact de "vendió más" más bajos y cortos, whoosh del corte a la oficina después de
"redondo.", chime del reporte 0,03 → 0,015, sin el tac del celular dentro de "¿Medimos los tuyos?".

## Pasadas de snapshots (PNG en el scratchpad de la sesión: p1-p8, pasada1-4, v1-v9)
Tiempos: snapshot de 62 cuadros ≈ 63 s; 5-20 cuadros 18-25 s; `check --json` ≈ 27 s (WebGL por SwiftShader anda;
el CLI dice "WebGL unavailable" en el probe pero el canvas renderiza bien).
- Armado (p1-p8): gancho de 2 líneas cortado a los costados → 3 líneas (132/118/150 px); cámara del s01 dentro de la
  cabeza de Rubén → más alta y atrás, Rubén corrido a +0,2; 999 muy chico/cortado → órbita a 3/4 con el primer 9
  adelante; la Catmull-Rom con tangente centrada se pasaba de las claves en los travellings (cuadros vacíos a mitad de
  camino) → tangentes con límite monótono; caja, catálogo y vestidos cortados → cámaras más lejos y vestidos a ±0,68;
  la flecha pisaba el subtítulo → push-in a 34/39 para que entre arriba; s10-s12 mirando la espalda del monitor →
  Rubén girado hacia la cámara, cámara del lado izquierdo del escritorio, termo y carpeta al otro lado (el termo tapaba
  el celular); el texto de las píldoras del celular salía verde sobre verde → navy.
- Pasada 1 (cada 0,5 s): matched cut del 999 cortado → encuadre frontal más abierto; "el primero manda" quedaba
  apuntando a nada al salir → sale antes; cajón con z-fighting (rayas) → frente del cajón 1 cm adelante; flecha
  visible sobre "y vendió más" → se esconde en "y"; mate cortado en s12 → cámara corrida.
- Pasada 2 (cada 0,5 s desde 0,25): travellings con el piso vacío (4,75 / 7,25 / 10,25) → zonas más juntas (2,3 /
  4,7 / 7,0 / 10,6) y objetos que entran antes; OFERTA tocando el precio del regalo → para 12 cm antes; "ganó el
  redondo" pisado por la tilde → texto más angosto; rótulos que duraban menos que su piso de lectura (check craft) →
  "el primero manda" desde "primer", Thomas y Morwitz toda la escena arriba, "1 peso de diferencia" desde "parece",
  "34 y 39 empiezan con 3" → "mismo 3" con dos guías y el giro del 39 0,22 s más tarde, "en regalos".
- Pasada 3 (cada 0,5 s): "A veces" (19,0) casi vacío → la etiqueta OFERTA del riel salta y vuela con la cámara hasta
  el regalo (continuidad); primer 9 cortado a la izquierda en 3,6-4,4 → cámara más atrás (también es el cuadro de la
  portada).
- Pasada 4 (cada 0,5 s desde 0,25) + cuadros sueltos en los cortes (2,73-2,80, 20,70-20,80, 27,85-27,90): tilde del
  regalo sobre el subtítulo → al costado del precio; regalo cortado al subir la cámara → la grúa termina cenital sobre
  la OFERTA acostada (empalma con la grilla del monitor); patas del riel aplastadas visibles antes del vestido →
  ocultas. `check --json`: ok, 0 errores (warnings: estructura #fondo/#capa3d, GL ReadPixels de SwiftShader, canvas
  al borde, crédito Wadhwa 1,29 s vs. piso 1,27 → ya pasa).

## Dudoso / para el revisor
- 10,15-10,30: whip pan de la caja al catálogo, ~0,15 s con la caja saliendo por la izquierda y el catálogo entrando
  por la derecha (el centro es piso de planilla).
- 2,55-2,90 (el corte escondido): el 999 sale de la pantalla y en el corte queda grande y cortado a los costados 0,2 s.
- s01: la cabeza de Rubén (de espaldas, abajo a la izquierda) tapa la columna A ("Aceite x12" se lee a medias); la
  celda del precio se lee siempre.
- 21,1-21,9: la órbita sobre Rubén pasa cerca de su cabeza (1-2 cuadros con la pelada grande en el borde).
- Coins: dos monedas quedan en el borde inferior en 8,5-9,7.
- En el inserto del celular (23,7-25,9) la cara de Rubén queda detrás del teléfono (se ven ojos y manos a los lados).
- "Videollamada" del cierre: la etiqueta 3D tiene una sombra verde oscura a la derecha (sombra sobre el piso invisible).

## Ronda 1 de corrección (14-11, sobre la lista de `ronda1/por-que-el-99.md`)
Duración 30,52 → **30,82 s** (la frase nueva de la voz es 0,30 s más larga). Cierre 28,16 → 30,82 (2,66 s, arranca en
"videollamada"). `check --json`: ok, 0 errores (warnings de siempre: estructura #fondo/#capa3d, ReadPixels de SwiftShader,
canvas al borde). Mezcla (pre-loudnorm): I -17,3 LUFS, pico -4,5 dBFS; tramos de 0,5 s y de 0,1 s con voz < 6 dB sobre
música+SFX: **ninguno**.

**Voz.** "Lo que sí se midió:" → **"Lo que sí se comprobó:"** (3 tomas nuevas de "se midió" con el tono marcando la i: el
STT las oyó "se murió / se me dio / se mide"; de 3 tomas de "se comprobó" la `partes/n7-3.wav` la oye exacta). Va como
tramo suelto en `partes/armar-voz.mjs` (archivo 4, ganancia -3 dB, desde 0,16 s); `partes/ajustar-tiempos.mjs` pone los
inicios de esa frase con el STT de la toma. Cambiado también en guion.txt, partes/texto.txt, partes/guion-voz.txt,
descripcion.txt, fuentes.md (fila 4) y SPEC.md. Rehechos tiempos, boca de Rubén (21,28-23,07) y mezcla. STT de control de
la locución entera: igual que antes ("aprobado" por "probado" y "suena oferta": sesgos del STT ya anotados).

**ALTA**
1. Celular frente a la cara al bajarlo (26,05): el celular ya no viaja al lado derecho de Rubén cruzando la cara. Lo
   muestra más bajo (`CELU_M` y 1,27 → 1,13, a 0,5 m) y lo deja en el escritorio justo debajo (`CELU_ESC` = OO+0,52,
   z 0,38, entre el teclado y el mate; el mate pasó a OO+0,74): baja en vertical, lejos de la cara. La mota del bigote
   era de ese primer plano de costado: ya no hay ese ángulo.
2. Órbita por dentro de la cabeza (21,2-21,6): sacada. s10 = primer plano de la pantalla (celda $ 999 con el "?" rojo,
   que ahora entra apenas corta, 21,09) y **corte limpio en "noventa" (21,61)** al contraplano frontal ("O2b", push-in
   lento). La pantalla se encuadra más lejos: entran el encabezado B y las 4 filas sin "$" cortado ni el logo encima.
3. Subtítulos fantasma: la palabra acentuada va crema con borde navy como las demás (CSS con variables `--c`/`--sw`) y
   pasa a navy en el mismo instante en que entra su recuadro (`tl.set` en armar.mjs). Mirado en 6,25 / 8,75 / 10,25 /
   11,75 / 13,75 / 15,25 / 16,4 / 18,4 / 19,75 / 26,25.

**MEDIA**
- Título del monitor junto al gancho: "Lista de precios" no se dibuja mientras está el gancho (plano O1).
- Costura en los 9: era el contorno del "9" en `vendor/three/lexend800.js`, que se cruzaba (la cola atravesaba la
  panza) y la triangulación dejaba un arco. Corregido el contorno (unión: la cola sube hasta la panza y sigue por su
  borde). curveSegments 10 → 16. Los demás glifos con cruces (1, 3, 4, $) van con cara navy y no se ve nada.
- 999 cortado en el corte escondido: el 999 de O1 termina a escala 0,17 y centrado (cámara final corrida a la izquierda
  de Rubén, sin su cabeza en cuadro); en la planilla arranca de frente a 4,2 m y la órbita a 3/4 es más corta y lejos
  (los tres 9 con margen en 3,0-4,6). Rehechos `portada-src/fondo-limpio-4.1.png` y `fondo-portada.png` (LIMPIO=1).
- Whip pan de 10,2: el catálogo pasó a x 6,2 (de 7,0) y la caja se achica y se va al llegar (10,27-10,49) con el sello,
  la placa y las monedas; la tapa se abre antes (desde 9,85) para que no quede "CATÁL" cortado a mitad del travelling.
- Riel tachando la tapa: el riel ya no sube desde el piso; baja desde arriba (10,30-10,65) y queda por encima del
  catálogo. Más angosto (patas a ±1,06) para que no toque los bordes.
- "OTOÑO": sacado de la tapa y de las páginas. La tapa (afuera) dice solo "CATÁLOGO" y se lee al abrirse; abierto se ve
  la página (antes el libro abierto mostraba la tapa por dentro: estaban invertidas las caras). Libro más chico
  (1,0 × 1,5) para que abierto entre entero.
- Bordes: etiquetas $ 99 / $ 100 con la cámara a 6,2-6,4 m; vestidos ±0,74 y plano general de s06-s08 a 7,2-7,6 m (sin
  el push-in cerrado a 34/39: la flecha entra igual debajo del subtítulo); el primer plano del 39 (OFERTA) a 2,35 m, y
  el 34 y el 44 se achican durante el giro (ya no asoman ni cruzan detrás del subtítulo); monedas con menos velocidad
  lateral y hacia cámara (caen delante del cajón, no en el borde).
- Vuelo de la OFERTA y regalo: el regalo pasó a x 8,8 (de 10,6), la OFERTA queda más cerca de él; la grúa ya no termina
  cenital: sube a un picado de 3/4 con regalo y OFERTA enteros hasta el corte; la tilde queda (sin disco aplastado).
- Inserto del celular: ojos por encima del teléfono, celular entero en cuadro (cámara a ~1,25 m).
- Subtítulos que destellaban: grupos unidos en reel.json ("Porque el primer número", "Lo que sí se comprobó:", "A veces
  gana el redondo.", "¿Y mi 99 vendió más?", "le dice qué precio vende más."); los largos van a 64-74 px con
  `text-wrap: balance` (dos líneas parejas).

**BAJA**
- Grilla de s10: corregida (ver ALTA 2). La etiqueta 44 detrás de "A veces": corregida (se achica antes).
- Sello: baja desde 1,6 m (entraba cortado por arriba) y golpea en el hueco después de "probado." (9,73).
- Ruedo hueco: el vestido con DoubleSide. "mismo 3": primero se dibujan las dos guías y después entra la placa, ahora
  arriba de las etiquetas, con las guías a los dos "3".
- Doble espacio tras "99": las palabras vacías (texto "") no generan span.
- Cierre: sin la sombra flotante (pisoF 0); cámara más lejos, la etiqueta no toca "scalerics.com".
- Vibración sin celular: el contraplano baja la mirada antes de s11 y el celular se ve en el escritorio cuando vibra.
- Sonido: monedas con tic al salir (8,21) y tics al caer antes de "No" (8,58-8,72); whoosh en la flecha 34→39 (15,53);
  roce y click suave al bajar el celular (26,34 / 26,68); sello en el hueco. El ding/tac de la caja (7,4-7,7) quedó
  donde estaba (no hay hueco en "¿Lo del cajero…"; la mezcla da ≥ 6 dB).
- "no llega a mil" (craft warning): ahora 3,24-4,57.

**Pasadas propias:** a1 (0,5 s), p1 (+0,25), a2-a6 y b1/c1-c4 sueltos en cortes (2,73-2,83, 20,97-21,07, 21,57-21,67,
23,43-23,50, 26,20-26,23, 28,13-28,20) y travellings (9,6-10,35); p2 (0,5 s) y p3 (+0,25) completas finales.
Nota: en un lote de snapshot el PRIMER cuadro a veces sale con el 3D del estado anterior (visto en 9,85 de c2; repetido
en c3 sale bien): es del snapshot, no de renderAt.
**Dudoso:** el celular apoyado queda abajo a la derecha medio tapado por el logo en 26,6-28,1; en 2,2-2,77 el 999 3D
sale de la celda y pisa el texto de la pantalla (es el "se despega"); en los travellings (4,6-4,9, 7,1-7,5, 10,1-10,3,
19,4-19,7) hay objetos que entran y salen por los bordes durante el movimiento.

## Ronda 2 de corrección (14-11, sobre el render de la ronda 1; cuadros en qa-99-r2/)
Duración **30,88 s** (voz 30,76 s: "Porque el primer número pesa más." regenerada). Cierre desde "videollamada" (28,22),
2,66 s. `check --json` ok, 0 errores. Mezcla: -17,2 LUFS, pico -4,5 dBFS; tramos de 0,5 y 0,1 s con voz < 6 dB: ninguno
(golpe de la etiqueta de 100 0,12 → 0,05; whooshes de s07 más bajos).
- ALTA mano en el mate (26,7): Rubén lo agarra por el costado: el mate va 11 cm afuera de la mano y 9 cm más abajo, y el
  objetivo del brindis más bajo (1,30). Ni un cuadro de piel sobre la yerba en 26,3-28,2.
- Celular flotando (23,8-26,5): las manos toman las dos esquinas de abajo del teléfono (±12 cm, -15 cm). La pantalla se
  rearmó para que nada quede bajo las manos: encabezado "REPORTE · LUNES / Ventas de la semana", las dos tarjetas arriba
  (tilde en la esquina, píldora con el texto centrado) y el cuarto de abajo libre. Sin "9:00" ni "llega solo…".
- Regalo cortado / OFERTA cortada (20,0-20,9): cámara a 5,7 m y centrada en -0,18; la OFERTA para 0,70 m a la izquierda
  (ya no atraviesa la placa "$ 4.000"); la tilde va arriba a la izquierda, sobre la tapa.
- Bigote (26,45-26,65): la sonrisa "feliz" del reporte bajada (sonrisa 0,55, ancho 0,95): las comisuras ya no salen.
- "?" y LED (21,07-21,6): cámara de la pantalla 0,18 m más lejos y corrida; el "?" y el LED con margen.
- 999 sobre la celda (2,2-2,77): la celda del aceite se vacía cuando arranca el despegue.
- Texto chico: celular ≥ 66 px de textura (≥ 36 en pantalla); el "US$" sale de las etiquetas y va al subtítulo
  ("a US$ 34", "y a US$ 39."), números 3D más grandes; los subtítulos mono de los créditos 40 → 50 px.
- BAJA: riel crece desde su barra (sin pata suelta en 10,33); monedas caen delante del cajón (vz mayor); "El 9 suena a
  oferta." en un solo grupo; el logo se oculta desde 23,8 hasta el cierre (no tapa el celular apoyado); OFERTA del primer
  plano más baja (no toca "A veces…"). "pesa más": 3 tomas nuevas (n8), el STT oye las tres bien; va la n8-3 suelta (borradas n8-1 y n8-2).
  No tocados: los cuadros de piso en los travellings (4,7 / 7,25 / 19,8) siguen con objetos entrando por los bordes.
Pasadas: r2a-r2g puntuales, q1 (cada 0,5 s), q2 (+0,25) y q3 (cortes y travellings) sobre la versión final.
