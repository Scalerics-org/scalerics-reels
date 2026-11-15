# Notas del constructor · por-que-caminar-mas (15-11)

Duración: ver "Ronda 1" al final (36,61 s).
(Lo de esta parte es de la versión anterior a la ronda 1.)
No se renderizó el mp4 (lo hace el coordinador). `check --json`: ok, 0 errores.

## Guion: un cambio
Con las 96 palabras la voz daba 36,2 s aun recortando pausas. Por la decisión del coordinador se sacó "¿Lo armamos?":
quedan **94 palabras** y el cierre es "Agendá una videollamada gratis en scalerics.com." Todo lo demás, igual a
`guion.txt`. Datos en pantalla: solo los de `fuentes.md` ("× 6", "casi 0", "8 min", barra 1 + 7, "ya era lo normal",
"The New York Times · 2012", "David Maister · Harvard · 1985", "1985"). Los "12 → 13 → 14" y "0" del contador de
llamadas son del personaje (ficción, no dato).

## Render (desde reels/por-que-caminar-mas)
```
flock /tmp/hyperframes.lock npx --yes hyperframes@0.8.206 render --workers 2 -o renders/por-que-caminar-mas.mp4
ffmpeg -y -i renders/por-que-caminar-mas.mp4 -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k renders/por-que-caminar-mas-final.mp4
```
Portada: `LIMPIO=1 node armar.mjs` pone `window.__portada` (cámara de portada en s01: Rubén en el pasillo con el cartel
"Valijas"; el fondo queda crema); snapshot a ~0,8 s y `node armar.mjs` para volver. No hice `portada.json`.

## Cómo regenerar
1. Voz: `node partes/armar-voz.mjs` → `assets/voice/locucion.wav` + `partes/tramos.json` (16 tramos, una frase cada uno).
   Tomas (Gemini TTS, `herramientas/voz.mjs`; textos en `partes/*.txt`): `orus1aj-2.wav` (Orus, gancho → "…la cinta.";
   texto con "Jiúston": dice Houston bien), `orus1b-1.wav` (Orus, "Entonces…" → "…más todavía."), `ruben1-2.wav`
   (Algenib, con la pausa después de "Sale hoy."), `orus2-1.wav`, `ruben2-2.wav` (Algenib, la pausa entre "Nadie llamó."
   y "¿Se cortó…" queda en 0,4 s), `orus3-2.wav` (se usa desde "Agendá"). Orus con atempo 1,12; Rubén a 1,0. Las otras
   tomas (`orus1a-1`, `orus1b-2`, `orus2-2`, `ruben1-1`, `ruben2-1`) quedan de repuesto. La cuota de Gemini es por minuto:
   `partes/voces.sh` reintenta.
2. Tiempos: `node partes/ajustar-tiempos.mjs` (STT de cada toma llevado al tramo; frases 0, 6, 8 y 11 por sílabas; 20
   palabras a mano con el STT de la locución entera `partes/pal-stt.json` y los silencios). "oyó:" de la locución:
   "porque un aeropuerto de Houston hizo caminar más a la gente 6 veces más las quejas casi desaparecieron porque
   espérame en 8 minutos uno caminando y 7 mirando la cinta entonces alejaron las puertas de llegada lo explico un
   profesor en 1985 la espira vacía se siente más larga la que no sabes cuánto dura más todavía sale hoy te lo dije Haz
   una hora tu cliente sin noticias Está frente a la cinta una automatización le avisas Hola cada paso nadie llamó se
   cortó teléfono agenda una videollamada gratis en escaleras punto" ("espérame en" = "Esperaban", "espira" = "espera",
   "avisas Hola" = "avisa sola", "escaleras punto" = "Scálerics punto com": sesgos del STT; revisar de oído).
3. Boca de Rubén: `node partes/boca.mjs` → `assets/boca.js` (solo en sus tramos 10, 13 y 14).
4. `node armar.mjs && node gen.mjs && node armar.mjs`.
5. Snapshots: `./snap.sh "t1,t2,…" nombre` (con el candado); `partes/hojas.sh renders/snap/<nombre>` arma hojas de 24.
6. Mezcla: `python3 partes/medir.py && python3 partes/medir-fino.py`.
7. Fuente 3D: `partes/fuente3d.py assets/fonts/Lexend-var.woff2 assets/vendor/three/lexend800c.js "<glifos>"` (necesita
   `pip install fonttools brotli`).

## Planos (segundos)
| # | escena | inicio | plano 3D |
|---|---|---|---|
| 1 | s01-gancho | 0,00 | Rubén camina hacia cámara por el pasillo del aeropuerto (mate en la derecha, cara resignada); el cartel "Valijas →" viaja 2 m detrás de él y nunca se acerca; zoom de vértigo 0,9-2,5 (la cámara se acerca y abre el ángulo: el pasillo se estira) |
| 2 | s02-seis-veces | 3,51 | grúa arriba: el pasillo entero desde atrás del hall; se pintan los 6 tramos (el primero, "antes: 1 min caminando"); "× 6" 3D verde; globos de queja rojos con "!" que se desinflan y caen; "casi 0" verde |
| 3 | s03-por-que | 6,61 | picado a la cinta de valijas: el "?" verde cae y rebota en la isla; flashback ("ANTES"): Rubén parado al costado, "8 min" y barra 1 verde + 7 rojos; órbita corta; salen las valijas; grúa a vista cenital |
| 4 | s04-alejaron | 11,17 | match cut: la cinta chica de la maqueta, mismo tamaño en pantalla; se abre: terminal, pasillo, bloque de puertas con aviones; las puertas se alejan, el pasillo se estira, flecha verde, las valijitas saltan a la cinta lejana ("DESPUÉS", "puertas más lejos") |
| 5 | s05-maister | 13,47 | la maqueta se pliega en la página (pop-up), el libro entero de 3/4, pasan tres hojas; la página tiene un reloj de arena dibujado; "1985" 3D; crédito Maister |
| 6 | s06-espera | 16,50 | sale el reloj de arena 3D de la página, banquito de espera vacío; "espera vacía"; en "más larga" se estira; gira sobre su centro y se vuelve el reloj de pared con "?" rojos; agujas cada vez más rápido; "sin saber cuánto falta"; tiembla en "todavía" |
| 7 | s07-ruben-tel | 21,75 | corte seco a la oficina vidriada: Rubén con el tubo en la oreja y el mate; monitor con tarjetas "¿Y mi pedido?" que se apilan; contador 12 → 13 → 14 (rojo); parpadeo en "hora"; push-in al monitor |
| 8 | s08-frente-cinta | 24,02 | la cinta otra vez (mismo encuadre que s03) con cajas kraft; Graciela con el celular "¿Y mi pedido? · sin respuesta"; "Pedido #418 · ¿?"; push-in al celular (lo gira hacia cámara) |
| 9 | s09-avisos | 26,48 | corte escondido al celular gigante delante de la cinta: Preparando ✓, Sale hoy 14:00 ✓, En camino (el camioncito sale de la burbuja), Entregado ✓ verde; tildes 3D sobre las cajas; "aviso automático" |
| 10 | s10-ruben-nadie | 29,45 | oficina: contador "0" verde, monitor vacío; Rubén tranquilo, levanta el tubo, lo mira con sospecha, dos golpecitos; en "Agendá" lo deja y sonríe |
| 11 | s11-cierre | 32,84 | fondo verde: "Videollamada / gratis / scalerics.com" + el mate de Rubén humeando |

## Sonido
Todo de `assets/sfx` (anotado en `fuentes.md`): pasos (tac-real), whoosh, pop, tic, tic-real (el reloj que acelera),
golpe, ding, sparkle, papel, hoja, ring, click, notification, chime, motor. Cama `bed.mp3` a 0,22 con sidechain; DUCKS
en la cola de "gente?", la cola de "más todavía." (corte seco a la oficina), antes de "Tu cliente" y entre "Nadie llamó."
y "¿Se cortó…" (timing de comedia). TECHO -31 LUFS por efecto (armar.mjs). Nada sintetizado ni bajado.
Medido (pre-loudnorm): I -17,0 LUFS, pico -3,7 dBFS. Tramos de 0,1 s con voz y < 6 dB sobre música+SFX: **ninguno**.
Tramos de 0,5 s: solo 18,5 (3,5 dB): es la cola de "larga." más el whoosh del giro del reloj de arena (que arranca
cuando la voz ya terminó; a 0,1 s no aparece).
Ajustes: ring antes de "Sale hoy" (pisaba la primera palabra); whoosh del push-in y de s08 más cortos y antes de "Tu";
notificaciones a 0,025; motor recortado a 0,85 s (pisaba "Nadie"); el whoosh-cinematic de la grúa (con preámbulo que
pisaba "gente?") cambiado por whoosh-short; el ding de scalerics.com después de la voz.

## Pasadas (PNG en renders/snap/<nombre>/)
- **Armado (p1-p11):** sin tapa de pasillo para la vista aérea; el cartel "Valijas" quedaba debajo del gancho → el gancho
  más compacto, el crédito "Un aeropuerto de Houston" abajo y el cartel detrás de Rubén; HUD de números con tamaño en
  píxeles (salían gigantes); isla de la cinta crema (se leía como un agujero) → navy con aro verde; Rubén y Graciela
  fuera de cuadro en la cinta → cámara más atrás y a la izquierda; maqueta ilegible desde arriba → terminal con paredes
  navy, cámara alta y de 3/4; libro: silueta de gente negra (manchas) → reloj de arena dibujado en línea (anticipa el 3D);
  reloj de "?" cortado en los costados → más chico y cámara atrás; oficina demasiado cerca (Rubén cortado, termo tapando)
  → cámara atrás, termo al costado, monitor más grande; celular gigante debajo del subtítulo → más chico y más abajo;
  camión invisible detrás del celular → camioncito que sale de la burbuja "En camino".
- **Pasada 1 (a1, cada 0,5 s desde 0):** el rótulo "1 min" apuntaba a la pierna de Rubén durante la grúa → entra cuando
  llega la vista aérea; maqueta con aviones cortados arriba → aviones más cerca y cámara más alta; el reloj de arena
  giraba desde la base y salía del cuadro → gira sobre su centro; "llamadas hoy" encima del contador y del monitor → se
  sacó (el monitor ya dice "Llamadas"); el tubo de s10 tapado junto a la boca → lo sostiene al costado de la cara.
- **Pasada 2 (a2, cada 0,5 s desde 0,25):** el cartel quedaba debajo de "Seis veces más." al subir la grúa → se va en
  0,25 s; "casi 0" sobre Rubén y navy sobre la pared navy (no se leía la c) → verde y más abajo a la derecha; push-in al
  celular de Graciela pasaba por su cara → ella gira el celular hacia la cámara y la cámara entra desde abajo; el
  camioncito tapaba "En camino" → arranca a la derecha del texto; rótulos de menos de 1,3 s (craft) → "antes: 1 min
  caminando" 1,4 s y "ya era lo normal" 1,5 s.
- **Pasada 3 (a3, cada 0,5 s desde 0,1):** cuadro casi vacío en el cambio reloj de arena → reloj (19,1) → el reloj de "?"
  nace mientras el otro se va; motas sueltas (reloj de arena y banquito a escala mínima) → se ocultan; la hoja que pasa
  mostraba el dibujo espejado detrás del "1985" → hoja sin dibujo. Revisados de nuevo los cuadros de esos arreglos (p10,
  p11): sin defectos nuevos.

## Dudoso / para el revisor
- 26,2-26,45: en el final del push-in al celular de Graciela se ven arriba un pedazo de sus anteojos/labios y abajo sus
  manos grandes (0,25 s, antes del corte al gigante).
- 6,5-6,9: en el picado a la cinta el "?" cae cerca de la cámara y entra cortado por arriba un instante.
- 3,5-3,8 y 10,8-11,17: grúas rápidas (el piso o la cinta llenan el cuadro un instante).
- 18,9-19,0: el reloj de arena gira y se achica DENTRO del reloj de "?" que crece (morph de 0,2 s).
- 26,5-27,8: el celular gigante tiene la parte de abajo vacía hasta que caen los avisos (uno cada ~0,6 s).
- s07: el monitor queda al borde derecho; las tarjetas se leen bien recién en el push-in (23,6-24,0).
- Rubén camina con el mate en la mano a la altura del pecho; en s03 lo tiene en la izquierda (no se lo lleva a la boca).
- No hay ambiente de aeropuerto ni sonido de cinta (no hay en el repo y no se bajó nada).

## Ronda 1 (revisión independiente sobre el MP4) · manda sobre lo de arriba
Duración nueva: **36,61 s** (voz 36,41 s; última palabra 36,23 + 0,2). Tarjeta de cierre desde "videollamada" (34,05):
2,56 s. Escenas: se sumó `s10b-ciegas` (palabra 90), para que s10 no pase de 3,1 s. `check --json`: ok, 0 errores (craft 0).

### Guion y voz
- **Maister:** "Un profesor ya lo había explicado en 1985:" (toma nueva `partes/orus1c-2.wav`, texto `partes/orus1c.txt`;
  de la misma toma sale "la espera vacía se siente más larga.").
- **Cierre ligado al tema:** "¿Sin esperas a ciegas? Agendá una videollamada gratis en scalerics.com." (pregunta de
  `partes/orus4-2.wav`; "Agendá…" sigue siendo `orus3-2`).
- **Pausa de comedia** antes de "¿Se cortó el teléfono?": ~0,7 s con la cola de "Nadie llamó." (silencio fijo 0,62).
- **"Ya la habían bajado a 8 min / y las quejas seguían": NO entró en la voz** (con la frase de Maister y la pregunta del
  cierre la voz ya llega a 36,4 s; sumar esa frase daba ~38 s). Va como rótulos en s03: "ya la habían bajado a 8 min"
  (verde, 7,7-9,6) y "y las quejas seguían" (rojo, 9,65-10,97).
- Rótulo "ya sabe cuánto falta" en s09 (reemplaza a "aviso automático": dos rótulos no llegaban a leerse).
- `guion.txt`, `fuentes.md` (filas 4, 6, C y la nueva S9) y `descripcion.txt` (orden: personal → 8 min → las quejas
  seguían → alejaron) actualizados. Índices de palabra corridos en reel.json, tres.js, gen.mjs y armar.mjs.

### Visual
- **A/B/C celular:** sin push-in a la cara de Graciela; corte seco a 26,14 al celular gigante, que es el MISMO chat
  ("Distribuidora", "¿Y mi pedido?" arriba) con "Preparando ✓" ya presente al cortar; los avisos caen debajo. El
  celular ocupa ~88 % del ancho (KG 11,6), encabezado debajo del subtítulo, globos dentro del celular, camioncito navy
  que cruza por debajo de los globos; rótulo abajo, separado. Sin tildes cortadas en las cajas de los costados.
- **D libro:** páginas crema con renglones (y emisivo, para que la hoja que gira no quede como placa gris); la textura de
  la maqueta queda solo mientras está la maqueta; tapa y lomo navy.
- **E remate de Rubén:** oficina rearmada: monitor más chico y a la derecha (no tapa la cara, entero en cuadro), faldón del
  escritorio de madera y piso hasta la cámara (sin franja navy), sin la carpeta verde. El mate en la izquierda a la vista
  en s07 y s10. El tubo pegado a la oreja de verdad (y 0,26 de la cabeza) en s07; en s10 lo levanta en la pausa, lo mira
  con sospecha al costado de la cara, dos golpecitos, mira a cámara en "¿Sin esperas…?" y cuelga; la mano sigue al tubo
  hasta que queda colgado (sin brazo de goma). Ojos entrecerrados (0,6) al hablar en s07; parpadeo después. Monitor
  vacío con "Sin llamadas". No hice el soplido (no hay un SFX limpio en el repo).
- s02: sin vigas en la vista aérea; globos dentro del pasillo; "× 6" arriba a la izquierda; medidor de quejas (6 bloques
  rojos, en "quejas") que se vacía con los globos y "casi 0" verde en "casi", a la derecha sobre fondo libre.
- s03: el "?" cae desde dentro del cuadro cuando la cámara ya encuadró la cinta; Rubén entra por el movimiento de cámara
  (cambia de lugar con el pasillo fuera de cuadro); órbita y push-in visibles 7,5-10,5.
- Gancho sobre banda crema lisa (sin vigas ni varillas detrás de las letras); "Un aeropuerto de Houston" justo debajo
  (44 px); el cartel "Valijas →" más bajo y más chico.
- Maqueta: más cerca al principio y encuadre más bajo (los aviones ya no quedan bajo el subtítulo); logo oculto en s04.
- Reloj de arena más chico (la tapa no toca el subtítulo); escala cruzada limpia al reloj de "?"; la página del libro se
  oculta bajo el reloj de "?".
- Subtítulos con placa crema translúcida (se leen sobre fondo oscuro); créditos mono a 42 px.

### Sonido
whoosh-cine-corto en 1,4 (el cinematic arrancaba mudo); pasos tac-real a 0,15; grúa de s04 con whoosh (−0,35); papel 0,2
/ hojas 0,03 con max 0,7; tics del reloj de "?" más fuertes (0,08-0,16) y solo hasta antes de "más todavía"; chime de
"Entregado" a 0,1 (Entregado pasó a paso + 0,5, después de la voz); click-soft en las tildes; tac de "uno" 0,2 en 8,55;
golpe del "?" al aterrizar; pops de los globos −3 dB; tac de los golpecitos −2 dB; whoosh del cierre antes (−0,3);
bgm 0,22 → 0,3 con ducks en 12,0-12,4, colas de "gente?", "larga.", "todavía."→"Sale", "hora."→"Tu" y antes de
"¿Se cortó". Cortes de subtítulos según la lista (grupos de menos de 0,4 s unidos). Medido: I −17,0 LUFS, pico −3,8;
**tramos de 0,1 s con voz < 6 dB: ninguno**; de 0,5 s: 21,0 y 28,5 (son el hueco después de "todavía." y de "paso.",
con el ring y el chime que arrancan cuando la voz ya terminó).

### Pasadas (renders/snap/)
- r1a (cada 0,5 s) y r1b-r1e (arreglos puntuales): oficina con Rubén chico y monitor cortado → cámara más cerca (fov 48),
  monitor 0,66 m; globos tapando el medidor → globos dentro del pasillo y medidor abajo a la derecha; motas de globo al
  final del desinflado → se ocultan antes; aviones bajo el subtítulo → encuadre de la maqueta más bajo.
- **Pasada 1 (r1f, cada 0,5 s desde 0)** y **pasada 2 (r1g, cada 0,5 s desde 0,25)** sobre la versión final: sin
  defectos altos. Corregido después: rótulos de menos de 1,3 s (craft) y el "?" que asomaba bajo el subtítulo al caer (r1h).

### Quedan (bajos)
- 26,0: el último cuadro del plano de Graciela la deja grande a la izquierda (la cámara se acerca antes del corte).
- 32,0: el tubo levantado toca el borde izquierdo un instante.
- 26,2-27,4: la mitad de abajo del celular gigante está vacía hasta que caen "Sale hoy" y "En camino".
- Sin soplido en el tubo; sin ambiente de aeropuerto.
