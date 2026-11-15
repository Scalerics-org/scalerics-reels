# Notas del constructor · por-que-te-llaman (15-11)

Duración: **33,31 s** tras la ronda 1 (voz 33,19 s). Cierre desde "videollamada" (30,58) hasta el final: **2,73 s**.
(La tabla de planos y las notas de abajo de "Ronda 1" mandan sobre las de la versión anterior.)
No se renderizó el mp4 (lo hace el coordinador). Guion sin cambios respecto de `guion.txt` aprobado
("Un estudio les escribió a más de dos mil empresas.").

## Render (desde reels/por-que-te-llaman)
```
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/por-que-te-llaman.mp4
ffmpeg -y -i renders/por-que-te-llaman.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/por-que-te-llaman-final.mp4
```
Portada (desde la raíz, con el mp4 ya hecho): `flock /tmp/hyperframes.lock node herramientas/portada.mjs por-que-te-llaman`
(usa `portada-src/fondo-portada.png`).

## Cómo regenerar (desde la carpeta del reel)
1. Voz: `node partes/armar-voz.mjs` → `assets/voice/locucion.wav` + `partes/tramos.json` (una frase por tramo).
   Tomas: `partes/orus1-1.wav` (Orus, frases 1-6), `partes/n7-3.wav` (Orus, "Llamar en la primera hora… al que decide."
   suelta), `partes/ruben-2.wav` (Algenib), `partes/orus2-4.wav` (Orus, CRM → cierre; texto de la voz en
   `partes/orus2-voz.txt` con "ce erre eme"). Orus con atempo 1,06; Rubén a 1,0. Silencios fijos en armar-voz.mjs.
2. Tiempos: `node partes/ajustar-tiempos.mjs` (cada frase exacta en su tramo; adentro, los inicios del STT de la toma
   original `partes/stt-*.json` llevados al tramo; "cuatro" y "nunca" a mano por la envolvente). Control: el STT de la
   locución entera está en `partes/pal-stt.json`.
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (17,77-21,27).
4. `node gen.mjs && node armar.mjs`.
5. Fondo de portada: `LIMPIO=1 node armar.mjs` (pone `window.__portada`: cámara de portada en s01, el celular más chico
   y arriba), snapshot a 2,2 s, `node armar.mjs` para volver. Queda en `portada-src/fondo-limpio-2.2.png` =
   `portada-src/fondo-portada.png` (el celular entre y 270 y 1065; el título va abajo).
6. Snapshots: `./snap.sh "t1,t2,…" nombre` (con el candado; hoja en `renders/snap/<nombre>/hoja.png`).
7. Mezcla: `python3 partes/medir.py && python3 partes/medir-fino.py`.

## Voz (STT de control)
- Las 3 tomas largas de Orus (orus1-1/2/3) salieron **cortadas al final** (la envolvente sigue a -30 dB en el último
  cuadro: "decide" truncado, el STT oía "decir"). Por eso la última frase va de una toma suelta (n7, 3 tomas, todas
  terminan en silencio). El STT oye "al que decides" en las tres tomas sueltas y en la locución: sesgo del STT (la
  palabra termina entera en la envolvente). Revisar de oído.
- orus2: 6 tomas; en las 3 primeras el STT oía "te avisé/aviso"; la 4 (tono marcando la a final) la oye "te avisa".
- "scalerics.com" se dice "Scálerics punto com" (el STT oye "scalar ix.com", como siempre).
- STT de la locución: "porque pedís un presupuesto y te llaman enseguida porque el interés se enfría rápido qué tan
  rápido un estudio les escribió a más de 2000 empresas casi una década cuatro nunca contestó las demás tardaron en
  promedio casi 2 días llamar en la primera hora multiplicaba la chance de llegar al que decides yo le compré al que
  llamó primero y esta consulta de ayer un crm anota cada consulta y te avisa al instante si el cliente se enfría le
  escribe solo quieres llegar primero agenda una videollamada gratis en scaler ix.com" ("una década" = "una de cada",
  "quieres/agenda" sin tilde = STT).

## Planos (segundos globales) · OBSOLETA: es la versión original (32,2 s). La vigente es la de "Ronda 2" al final.
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | O1: por encima del hombro derecho de Rubén sentado; formulario "Pedir presupuesto · Autoelevador eléctrico", clic 0,42 → "Enviado ✓"; mate a la altura del pecho; vibra el celular del atril 1,21 ("Llamada entrante"); push-in al celular |
| 2 | s02-se-enfria | 2,51 | R: corte escondido al celular gigante (mismo encuadre), se achica girando y nace el mate gigante (2,59-2,93); vapor verde; en "enfría" (3,14) el vapor se despega y se apaga, yerba gris, las agujas del piso corren |
| 3 | s03-que-tan | 4,20 | paneo 3,98-4,30 al "?" verde que cae (3,90) y rebota |
| 4 | s04-estudio | 5,31 | el "?" se pliega (5,29) y sale el avión; la cámara lo sigue; edificios brotan desde 5,26; bandada en "dos" (6,58); "2.241" en "mil" (6,72) |
| 5 | s05-nunca | 7,74 | buzones; sobres 7,79-8,15; banderitas y tildes 8,04 / 8,19 / 8,34; rojo + telaraña en "nunca" (8,82); push-in al rojo |
| 6 | s06-dos-dias | 10,24 | el buzón rojo gira y se achica, nace el reloj de pie en su lugar (10,19); agujas 10,81-12,14 (42 h) con sol y luna; "42 h" 12,29 |
| 7 | s07-primera-hora | 13,46 | a las 12 (13,41); porción verde 12-1 en "primera" (13,92); "1 h" |
| 8 | s08-el-que-decide | 14,94 | cable verde enrulado 14,96-15,99 hasta la silla vacía; cable gris corto; tildes 15,81-16,51 (se van 17,17-17,47); de frente a la silla |
| 9 | s09-ruben-compro | 17,77 | O2: corte en la silla: Rubén en la misma silla, de frente (girado a la cámara), mate y celular; corta la llamada 18,12; push-in |
| 10 | s10-ruben-ayer | 19,90 | Rubén mira por encima del hombro la pantalla de atrás; corte en "ayer" (20,81) al inserto O3 de la bandeja (fila roja), push-in |
| 11 | s11-crm | 21,67 | R2: corte escondido a la fila roja de la ficha del CRM; pasa a navy 21,97; la cámara se abre; "Anotado" 22,45, "Aviso a Nico" 24,15 + campanita |
| 12 | s12-escribe-solo | 25,34 | paneo rápido (25,22-25,72) al mate frío; termo entra 25,44, ceba 26,37-26,77; burbuja 26,47-27,07; vapor vuelve |
| 13 | s13-llegar | 27,60 | la burbuja se achica (27,9) y entra la respuesta "¡Sí! Mandame 40 cajas." (28,10) |
| 14 | s14-cierre | 29,25 | F: fondo verde, "Videollamada / gratis / scalerics.com" + mate humeando |

## Objetos 3D (assets/tres.js)
Oficina vidriada de por-que-el-99 (escritorio más bajo, 0,76, Rubén sentado; el vidrio de atrás oculto), monitor con
CanvasTexture viva (formulario / bandeja), celular en atril (pantalla "Llamada entrante" / "Llamada finalizada"), silla
de director (asiento y respaldo que giran, pie estrella con ruedas), mate y termo (`personajes.js`), depósito abajo
(racks, pallets, cajas kraft, zorra). Reloj-piso (esfera CanvasTexture 2048, radio 11 m; agujas planas MeshBasic);
mate gigante (crearMate ×6,2) con volutas de vapor (TubeGeometry que se rearma por cuadro y se afina en la punta);
celular gigante del corte; "?" 3D; avión de papel (con sobre verde) y bandada de 16; 50 edificios instanciados; "2.241";
4 buzones (tapa crema, banderita, ranura) con sobres, tildes y telaraña; reloj de pie (aro navy, esfera crema con
12/3/6/9, porción verde extruida, agujas) con sol y luna; "42 h", "1 h" (fuente `vendor/three/lexend800h.js`, generada
con `partes/fuente3d.py`: 0-9 . , ? h %); cable enrulado verde y gris (hélice sobre Catmull-Rom); 7 tildes; ficha del
CRM vertical (CanvasTexture), campanita, burbuja de chat ✓✓ y respuesta verde, termo gigante con chorro; mate del cierre.

## Sonido
Todo de `assets/sfx` (ver `fuentes.md`): click, vibra, ring, whoosh-cinematic, pop, tic-real, whoosh-short, golpe,
papel, tac-real, sparkle, tic, ding, chime, whoosh, whoosh-cine-corto, ping, notification, burbuja. Música
`assets/bgm/bed.mp3` con sidechain de la voz; baja en la pausa entre las dos líneas de Rubén (DUCK). TECHO -31 LUFS.
Nada nuevo ni sintetizado.

## Mezcla (pre-loudnorm, partes/medir.py + medir-fino.py)
I -17,2 LUFS, pico -3,0 dBFS (el paso 10 lleva a -14 / -1,5). Tramos de 0,1 s con voz sonando y < 6 dB sobre
música+SFX: **ninguno**. Tramos de 0,5 s: solo 13,0 (0,9 dB): es la cola de "días." (la voz termina a 13,21) + pausa
con el whoosh/tac de la entrada a s07. Ajustes: vibra 0,14 → 0,06 y ring 0,05 → 0,018 (pisaban "llaman enseguida");
el golpe del buzón rojo pasó al hueco después de "contestó." (en "nunca" queda un tic chico); tac de s07 y whoosh de
s12 más bajos.

## check --json
ok, 0 errores. Warnings de siempre: estructura #fondo/#capa3d, track 0 de subtítulos denso, ReadPixels de SwiftShader,
canvas al borde. Craft y contraste: 0.

## Pasadas de snapshots (PNG en renders/snap/<nombre>/)
Tiempos: 65 cuadros ≈ 70-80 s; 5-20 cuadros 20-40 s; check ≈ 30 s.
- **Armado (p1-p13):** s01 con la cabeza de Rubén enorme y el monitor cortado → cámara más alta y atrás (fov 32), el
  vidrio de atrás oculto; vapor de bolitas (se leía como globos verdes) → volutas de tubo afinadas; el vapor que se
  enfriaba quedaba como un nudo → se despega hacia arriba; cuadros vacíos entre el mate y el "?" (4,0) → el "?" cae
  antes y paneo corto; avión fuera de cuadro (5,5-6,2) → la mirada de la cámara sigue al avión; "2.241" sobre el
  subtítulo y tapado por la bandada → más chico, más arriba y atrás; buzones cortados → más juntos y cámara más
  lejos; el cuarto buzón sin rojo en la tapa → tapa también roja; "42 h" y "1 h" pisando el subtítulo o el 6 → más
  bajo / más chico y a la derecha; s08 vacío → la silla más cerca del reloj y plano abierto del cable; tildes sobre el
  subtítulo → más bajas y se van antes del corte; s09 con la cámara del otro lado del vidrio (parante negro en medio)
  → vidrio de atrás oculto y plano medio a 3 m; el giro de la silla en s10 atravesaba la cabeza de Rubén y quedaba un
  cuadro gris (el respaldo) → sin giro: Rubén mira por encima del hombro la pantalla que tiene atrás y corte al inserto
  (Rubén, silla, mate y celular ocultos en el inserto); la ficha del CRM apaisada no entraba en vertical → ficha vertical
  con la consulta en rojo arriba (empalma con la fila roja del monitor); burbujas cortadas y con letra chica → más
  angostas, texto a todo el ancho, la respuesta reemplaza a la primera; el vapor que llenaba el cuadro antes del cierre
  (fideos gigantes) → corte limpio al verde; el termo acostado sobre el mate → más chico, inclinado con el pico arriba de
  la boca; reloj de pie lejos del buzón → nace donde estaba el buzón rojo; "1 hora después" apuntando al cable verde →
  sin línea guía, abajo a la izquierda.
- **Pasada 1 (a1, cada 0,5 s) y pasada 2 (a2, cada 0,5 s desde 0,25)** sobre versiones intermedias; **pasada 3 (a3,
  cada 0,5 s)** y **pasada 4 (a4, cada 0,5 s desde 0,25) sobre la versión final** + cuadro a cuadro (30 fps) en los
  cortes 2,51 / 17,77 / 20,81 / 21,67 / 29,25 y en el morph 2,6-2,8 y el pliegue 5,3-5,4 (c1). En a3/a4: motas verdes
  (tildes a escala mínima) a 17,4 → se ocultan por debajo de 0,08; "42 h" fantasma detrás de "Llamar en" (13,5) → sale
  antes; vapor que entraba desde arriba (2,8) → crece desde la boca.

## Dudoso / para el revisor
- 2,55-2,75: el celular gigante se achica DENTRO del mate que crece (morph de 0,2 s; se ve el celular "clavado" un
  instante).
- 3,3-3,5 y 25,6-27: las volutas del vapor suben por detrás del subtítulo (lo tapan los subtítulos, no al revés).
- 4,0-4,3, 7,6-7,8, 25,2-25,7: paneos rápidos con el objeto saliendo/entrando por el borde y piso solo un instante.
- 5,3-5,8: el avión solo, arriba, con piso vacío abajo (los edificios entran por la derecha).
- 10,1-10,4: el buzón rojo girando dentro del reloj que nace (morph); el reloj entra grande y toca el borde un instante.
- 14,2-14,6: push-in a la porción verde con el reloj cortado a los costados.
- s01: de espaldas, el brazo derecho de Rubén en el mouse se ve como un bloque; el título del formulario queda debajo
  del gancho (se leen "Autoelevador eléctrico" y el botón).
- s09-s10: el monitor de atrás se ve chico (la fila roja se lee recién en el inserto). Rubén mira hacia atrás con la
  cabeza a -0,85 rad y los ojos al costado (no gira el cuerpo).
- La respuesta "¡Sí! Mandame 40 cajas." es ficción (no es dato); si el revisor de guion la ve como promesa de venta,
  se cambia por "¡Sí! Ahora lo veo." en `hacerBurbuja` de tres.js.
- "decide" (fin de la frase 7): revisar de oído (el STT oye "decides").


## Ronda 1 de corrección (15-11, sobre /home/user/revision/qa-llaman y snd-llaman)
Duración **33,31 s** (voz 33,19). Cierre 30,58 → 33,31 (**2,73 s**, arranca en "videollamada"). `check --json`: ok,
0 errores, craft 0 (warnings de siempre: estructura #fondo/#capa3d, track de subtítulos denso, ReadPixels, canvas al borde).

**Guion (G1-G8).** Voz nueva del tramo de Orus (`partes/orus1b.txt` → `orus1b-4.wav`, ver partes/voces.md): "¿Qué tan
rápido? Un estudio lo midió: llamar en la primera hora multiplicaba las chances de llegar al que decide. Pero cuando les
escribió a más de dos mil empresas, casi una de cada cuatro nunca contestó. Las demás tardaron, en promedio, casi dos
días." Escenas reordenadas (s04 lo-midio, s05 el-que-decide, s06 dos-mil, s07 nunca, s08 dos-dias). guion.txt,
partes/orus1.txt, partes/texto.txt, fuentes.md (filas 3 y 6: la primera hora = otro análisis del mismo artículo),
descripcion.txt actualizados. Burbuja "Graciela, te paso el presupuesto. ¿Lo vemos?" (G2), "Autoservicio Sur ·
pedido" (G3), respuesta "¡Sí! ¿Me llamás?" (G4), la ficha mantiene "Presupuesto · ayer 18:40" (G5), crédito
"Harvard Business Review · 2011 · EE. UU." mono 36 px (G6), subtítulo "dos mil" en letras y "2.241" más abajo (G8).

### Planos (segundos globales, ronda 1) · los inicios de escena siguen valiendo; los cambios de la ronda 2 están abajo
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | O1: Rubén corrido a su izquierda (la nuca ya no tapa el formulario), mate en el escritorio, celular del atril 1,7× (vibra 1,21); push-in al celular, que termina entero y debajo del subtítulo |
| 2 | s02-se-enfria | 2,55 | R: corte escondido al celular gigante; sube y se achica (2,63-2,79) mientras nace el mate (desde 2,69); vapor; "enfría" 3,18 |
| 3 | s03-que-tan | 4,27 | paneo corto (4,05-4,37) al "?" (cae 3,97), grande y centrado |
| 4 | s04-lo-midio | 5,32 | el "?" gira y en su lugar nace el reloj de pie (5,34); 12:00 en "llamar" (6,38); porción verde en "primera" (6,93), "1 h" |
| 5 | s05-el-que-decide | 7,59 | cable verde 7,61-8,59 hasta la silla; cable gris desde afuera del aro; tildes 8,54-9,24 |
| 6 | s06-dos-mil | 10,29 | el avión despega de la silla (10,24) y la cámara lo sigue; edificios desde 10,34; bandada 11,61; "2.241" 11,80 (se va 12,44) |
| 7 | s07-nunca | 12,79 | buzones casi de frente; sobres 12,84-13,20; banderitas 13,35/13,50/13,65; rótulo 23 % 13,91; rojo 14,66; push-in a los tres de la derecha |
| 8 | s08-dos-dias | 15,86 | el buzón rojo se va hacia atrás achicándose (15,56-15,86) y adelante nace el reloj (15,62); agujas 16,14-17,29; "42 h" 17,44 |
| 9 | s09-ruben-compro | 18,88 | O2: corte seco a Rubén de frente en su silla (cabeza debajo del subtítulo); corta la llamada 19,23 |
| 10 | s10-ruben-ayer | 21,06 | mira por encima del hombro (cabeza -0,4 rad + torso -0,42); corte en "ayer" (21,97) al inserto O3: monitor entero (90 % del ancho) |
| 11 | s11-crm | 22,87 | R2: corte a la ficha entera (fila roja → navy 23,17); pasos en verde 23,65 / 25,35 / 25,84 |
| 12 | s12-escribe-solo | 26,60 | paneo 26,48-26,98 al mate frío; termo 26,70 (entra por la derecha), ceba 27,87; burbuja 27,77 |
| 13 | s13-llegar | 28,86 | la burbuja se achica, respuesta 29,36; el termo sale por la derecha |
| 14 | s14-cierre | 30,58 | F: verde, "Videollamada / gratis / scalerics.com", mate humeando |

### Visual (lista del director de arte)
- ALTA 1 inserto: el monitor entero (cámara a 2,95 m, fov 34; push-in a 2,72 sin cortar texto), "Consultas" en y≈600.
- ALTA 2 Rubén mirando atrás: cabeza -0,4 rad + torso -0,42 (antes -0,85 solo cabeza); ojos -0,75.
- ALTA 3 primera hora: relojes más chicos (radio 0,85) y cámaras más lejos: el borde de arriba queda debajo del subtítulo
  y no toca los costados; push-in frenado.
- MEDIA 4 avión: despega de la silla y la mirada de la cámara lo sigue; edificios con escala 0 antes de brotar (sin
  sombras sueltas); el "?" se oculta por debajo de 12 % de escala (sin mota).
- MEDIA 5 "2.241" se va antes del paneo a los buzones.
- MEDIA 6 números 3D: `textoGrupo` (tres.js): cada contorno del glifo en su extrusión, sin bisel, corrido 1,5 mm en z (los
  contornos superpuestos de Lexend variable se pisaban y dejaban líneas). Usado en "?", "1 h", "2.241", "42 h".
- MEDIA 7 el celular gigante sube y se achica en 0,16 s; el mate nace desde 2,69 (sin celular clavado ni resto oscuro).
- MEDIA 8 el buzón rojo se va hacia atrás mientras el reloj nace adelante (no se atraviesan); el rótulo 23 % sale antes;
  los buzones y tildes se ocultan por debajo de 45-50 % de escala (sin motas).
- MEDIA 9 buzones 1,3× y juntos, casi de frente (los cuatro enteros); sobres desde más abajo; push-in a los tres de la
  derecha (el izquierdo queda fuera entero); la línea guía termina en el buzón rojo.
- MEDIA 10 s01: Rubén corrido 0,34 m a su izquierda, teclado delante de él, mouse a su derecha, mate en el escritorio a
  la vista, celular 1,7×; la cámara ya no queda pegada a la nuca.
- MEDIA 11 subtítulos: grupos de más de 17 caracteres a 78 px y de más de 26 a 72 px (antes 74/64), en dos líneas.
- MEDIA 12 termo: la mitad de grande, entra y sale por la derecha (sin achicarse a mota), chorro fino y translúcido;
  la burbuja aparece en su lugar (no cruza el borde), cola a la izquierda.
- MEDIA 13 ficha: entera desde el corte, como lista de pasos (gris → verde): sin hueco ni texto cortado.
- MEDIA 14 "?" 1,9 de alto, centrado. MEDIA 15 el cable gris nace afuera del aro.
- BAJA 16-19: arco del sol más angosto; "1 hora después" en x 360; tildes más chicas, se van antes de s06 y por debajo de
  30 %; "42 h" y "las que contestaron" salen antes; Rubén con los antebrazos sin cruzarse (su izquierda es -x cuando mira
  a -z) y el mate tomado de costado; el subtítulo ya no apoya en su cabeza; vapor más bajo; mates grandes con 96
  segmentos; agujas de los relojes de pie más cortas (no tapan el 12); agujas del piso ocultas mientras está el campo de
  edificios (desde arriba se leían como una viga); logo oculto en 1,75-3,15 (celular), 7,59-10,29 (cable y silla) y
  18,88-26,60 (Rubén, inserto, ficha); visible en el mate de s12-s13.

### Sonido
- S1 música: `bed.mp3` a 0,40 con sidechain suave (umbral 0,015, ratio 4) en vez del fuerte de antes; sin las bajadas de
  la versión anterior; solo baja 80 % en dos colas de frase ("rápido." y "días."). Cama: -38,4 LUFS integrada (antes
  ~-45), los huecos ya no quedan en silencio.
- S2 SFX subidos: clic, sobres, banderitas, tics del reloj, pop del buzón rojo, golpe+tac del corte al CRM (momentánea
  del resto en esos tramos: -30 a -33 LUFS). La vibración y el ring quedan más bajos (pisaban "enseguida": vibra
  momentánea -38,6 con música).
- S3 **no hay pour CC0**: freesound.org y commons.wikimedia.org dan 403 en el proxy; en el repo no hay agua con origen
  anotado. El cebado suena con `burbuja.mp3` (Mafon2, CC0), anotado en fuentes.md.
- S4 tramos de voz 60-120 ms más largos, fundido de 60 ms.
- S6 cierre 2,73 s; el ding cae en el latido de "scalerics.com".
- S7 subtítulos reagrupados: "Porque el interés se enfría rápido." · "¿Qué tan rápido?" · "Un estudio lo midió:" ·
  "llamar en la primera hora" · "multiplicaba las chances" · "de llegar al que decide." · "Pero cuando les escribió" ·
  "a más de dos mil empresas," · "casi una de cada cuatro" · "nunca contestó." · "Las demás tardaron," · "en promedio,
  casi dos días." · Rubén · "Un CRM anota" · "cada consulta" · "y te avisa al instante." · "Si el cliente se enfría," ·
  "le escribe solo." · "¿Querés llegar primero?". "Agendá una" sin subtítulo (0,55 s antes de la tarjeta).

### Mezcla (pre-loudnorm)
I -17,2 LUFS, pico -2,9 dBFS. RMS cada 0,5 s y cada 0,1 s con voz < 6 dB sobre música+SFX: **ninguno**. Sonoridad
momentánea (`partes/medir-m.py`, como el revisor) cada 0,5 s con voz > -45: **ninguno**; cada 0,1 s con voz > -30: dos
tramos (6,4: 5,2 LU, arranque de "llamar"; 15,7: 4,8 LU, cola de "contestó."), los dos solo con música.

### Pasadas (renders/snap/)
- Armado: r1a-r1d, c3 (s01, morph, avión, buzones, transición buzón→reloj, ficha, termo).
- Pasada 1 (b1, cada 0,5 s) → arreglos: s01 (mate sobre el botón Enviar → al lado del atril), avión cortado (seguimiento
  de cámara antes y avión 1,15×), buzones cortados y torcidos (de frente, sin giro), cuadro vacío 15,75 (el reloj nace
  antes), viga de las agujas del piso en los edificios, "2.241" cerca del subtítulo, burbuja cortada en el borde (cámara
  de s12 más lejos y burbuja 0,86×).
- Cortes cuadro a cuadro (c2, c4: 2,55 / 18,88 / 21,97 / 22,87 / 30,58 ± 2 cuadros, morph 2,6-2,75 y buzón→reloj
  15,55-15,8) → encabezado del celular gigante debajo del subtítulo (push-in más corto) y reloj antes.
- Pasada 2 (b2, cada 0,5 s desde 0,25) → morph más corto (cuadro casi vacío en 2,75).

### Dudoso / para el revisor
- 2,63-2,79: el celular gigante sube encima del mate que nace (la bombilla pasa cerca del borde de abajo del celular).
- 15,56-15,8: el buzón rojo, chico, se ve detrás y arriba del reloj que crece (no se tocan).
- 4,05-4,37, 12,6-12,9, 26,48-26,98: paneos con objetos entrando por el borde un instante.
- 10,25-10,5: el avión recién despegado arriba del cuadro antes de que la cámara lo alcance.
- La vibración del celular (1,2-2,2) queda en -38,6 LUFS momentánea: más fuerte pisa "enseguida".
- Los números 3D ya no tienen bisel (aristas rectas); las líneas de triangulación ya no están.

## Ronda 2 de corrección (= ronda 3 del coordinador, 15-11; sobre /home/user/revision/qa-llaman-r2 y snd-llaman-r2)

Duración 33,31 s, mismos inicios de escena que la ronda 1 (s01 0,00 · s02 2,55 · s03 4,27 · s04 5,32 · s05 7,59 ·
s06 10,29 · s07 12,79 · s08 15,86 · s09 18,88 · s10 21,06 · s11 22,87 · s12 26,60 · s13 28,86 · s14 30,58).

### Planos que cambiaron (segundos globales)
| tramo | antes | ahora |
|---|---|---|
| 5,0-5,4 (A2) | el "?" giraba y se achicaba dentro del reloj | el "?" sube y sale por arriba (5,04-5,32) sin girar; el reloj nace en 5,22 cuando el "?" ya no lo cruza |
| 7,6-9,0 (M6) | cables cruzados, rótulo tapando la punta gris | silla corrida a la derecha y adelante (PS), cable gris detrás del reloj; "1 hora después" a la izquierda con línea guía |
| 10,3-11,1 (B15) | la silla quedaba cortada en la esquina | la silla se achica y se va cuando el avión ya despegó (10,69-10,94) |
| 12,4-12,8 (M8) | "2.241" se achicaba; paneo vacío a los buzones; disco blanco y verde suelto | "2.241" se funde (12,49-12,71); casi corte a los buzones (12,75), que ya están creciendo al corte; edificios fuera en el corte; el centro del piso-reloj oculto 10,0-16,3 |
| 13,4-15,3 (M8/B12/B14) | banderas chicas; tildes subían al subtítulo | banderas más grandes; push-in más abierto (z +5,0, mira 1,64) y se queda hasta 15,24 |
| 15,2-15,9 (A3) | buzones se desvanecían, tildes y sombras sueltas, cuadro vacío | rótulo 23 % fuera 15,18; los buzones blancos y sus tildes se van juntos 15,34-15,56; el rojo gira y se achica hacia atrás 15,40-15,60; el reloj nace adelante en 15,45 (pop con sonido) y la cámara ya llega encuadrada 15,81 |
| 16,1-17,3 (B13) | sol/luna cortados | arco angosto por arriba del aro (0,72 × 0,45) |
| 21,06-21,48 (A1) | giro de cabeza y cámara que lo rodeaba: ojo fuera de la silueta | torso 0,3 rad, cabeza 0,08 rad, ojos hacia el monitor; la cámara solo hace push-in corto; inserto antes, en 21,48 |
| 21,48-22,87 (M10/B18) | franja oscura abajo; texto cortado | monitor "liso" (sin texto) en O2; inserto O3 desde más arriba: monitor entero, escritorio y teclado llenan abajo |
| 26,6-30,6 (M11/B16/B17) | burbujas en la punta de la bombilla, vapor dentro de la burbuja verde, asa del termo detrás del mate | burbuja blanca (0,46; 2,15; esc. 0,82) y verde (0,43; 2,2; esc. 0,84) a la derecha de la bombilla y por arriba del vapor (alto 0,7 en R2); la verde reemplaza a la blanca de golpe; asa del termo afuera |
| 2,63-2,79 (M4) | celular montado en la bombilla, mota | el celular se achica en su lugar y se apaga antes de que la bombilla llegue a su altura |
| 0,00 (B19) | sin cambio de cámara en esta ronda: un perfil de Rubén y el formulario no entran juntos en 9:16 sin tapar el formulario; queda la nuca y el brazo (ver dudoso) | |

### Sonido (S1-S3, B4-B6)
- Música: sidechain sin adelanto (atrim 0,02), threshold 0,08, ratio 2,5, attack 15, release 450, makeup 1; cama
  vol 0,27 → -36,8 LUFS integrada; fundido final desde ~32,85 (0,46 s).
- Inaudibles subidos al techo -31/-33: vibración (vibra-medios 0,22), tics s04 y s08 ("tic" 0,25/0,3), pop rojo 0,3 +
  golpe 0,12, pop "42 h" 0,3, notificación + tres burbujas del cebado (28,00/28,22/28,44 aprox., vols 0,075/0,05/0,06).
- Aire muerto 20,55-21,05: whoosh-short suave al girar (T.insert-0,1). No se acortaron "Las demás tardaron," ni "Yo le compré".
- Pop del reloj de las 42 h movido al momento en que nace (15,45, en s07).
- Medición final (partes/medir.py + medir-m.py, stems pre-loudnorm): RMS por 0,5 s con voz < 6 dB: ninguno;
  momentánea cada 0,5 s (voz > -45) y cada 0,1 s (voz > -30) con voz < 6 LU: ninguno. Mezcla -17,1 LUFS, pico
  -2,9 dBTP antes del loudnorm a -14.

### Pasadas
- b3: cada 0,5 s desde 0 (67 cuadros, hojas s0-s4). b4: cada 0,5 s desde 0,25 (66 cuadros).
- Cuadro por cuadro en cortes: c1/c2 (giro de Rubén 21,06-21,6), c4 (12,6-12,93, 2,5-2,77, 18,85-18,9, 21,45-21,5,
  22,85-22,9, 30,55-30,6, 15,5-15,63), c5-c8 y c10-c11 (buzones → reloj 15,2-15,95), c3/c9 (burbujas 26,6-30,5),
  c7 (silla 10,2-11,25).
- check --json: 0 errores (warnings: lint 3, runtime 7, layout 1, los mismos de antes).

### Dudoso / para el revisor
- Cuadro 0: sigue siendo por encima del hombro (nuca, pelo y brazo de Rubén a la izquierda); la portada usa su propio encuadre.
- 15,6: el reloj nace con rebote y por ~0,1 s roza el borde derecho mientras la cámara termina de abrirse.
- 15,45: el sobre del buzón rojo asoma arriba mientras el buzón gira (se va en 15,46).
- 28,9-29,0: el termo sale por la derecha (cortado por el borde porque se está yendo).
- Pour real CC0 sigue sin conseguirse (freesound/commons con 403): el cebado son tres burbujas (burbuja.mp3, Mafon2 CC0).
