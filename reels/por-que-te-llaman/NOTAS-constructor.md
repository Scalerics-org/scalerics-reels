# Notas del constructor · por-que-te-llaman (15-11)

Duración: **32,21 s** (voz 32,09 s). Cierre desde "videollamada" (29,25) hasta el final: **2,96 s**.
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

## Planos (segundos globales)
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
