# Notas del constructor · por-que-caminar-mas (15-11)

Duración: **35,65 s** (voz 35,20 s; la última palabra termina en 35,03; DUR = fin de voz + 0,45 para que la tarjeta de
cierre dure 2,8 s). Tarjeta de cierre desde "videollamada" (32,84) hasta el final.
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
