# inmobiliaria-disponible · notas del constructor (25-11)

Proyecto armado con la infraestructura de `reels/gym-cupo` (prev.mjs, snap.sh, paso10.sh, medir-sfx.py, partes/*.sh,
personajes.js) y la de `reels/inmobiliaria-visitas` (gen.mjs, la oficina de Silvana Propiedades, Silvana y Diego,
tarjetas pegadas a la cámara); medir.py de resto-reservas. Todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena entera está en `assets/tres.js` (escrita para este
reel; función pura del tiempo).

**Duración: 44,17 s** (1325 cuadros) desde el recorte r1 del coordinador (antes 50,17). Parte 1 0-21,27 · cartel 21,27-23,52 ·
parte 2 + cierre 23,52-44,17 = 20,65 s (47 %). Cierre (plano F y tarjeta "Comentá DISPONIBLE") 41,17-44,17 = 3,0 s, arranca
sobre "Comentá"; línea chica desde 43,17 (1,0 s). `check --json`: ok, 0 errores, 0 warnings.
Mezcla (MEDIR=1 node gen.mjs; python3 medir.py): voz ≥ +10,9 LU sobre el resto en todos los tramos de 0,5 s con voz;
-14,0 LUFS, pico -5,5 dBFS; `python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav`: máximo sin voz
-31,1 LUFS momentáneo (paso10.sh toma el audio de assets/audio/mezcla.wav).

## Recorte r1 (coordinador, 25-11): de 50,17 a 44,17 s
- Fuera "Esos dos, para mí." (12-silvana → partes/descartadas/; sin s6): Q2 es solo visual (2,18 s), termina en "Listos para
  visitar y firmar: 2" resaltado; sin el plano Q2s.
- Q4: "Treinta y ocho. Y el viernes firman." (16-silvana.txt actualizado): la toma 16-silvana-c recortada con ffmpeg en
  procesar.sh ("Treinta y ocho." 0-0,95 s con su pausa + "Y el viernes firman." desde 2,35 s, fundidos de 30-40 ms); STT oye
  "treinta y ocho y el viernes firman". Las 6 visitas van como rótulo "Visitas agendadas: 6 ✓" (38,25 s).
- Cierre ≤ 3 s: toma nueva 17-silvana-g (tono "de corrido y ágil") con atempo 1,2 (2,98 s; con 1,24 el STT ya no oía
  "disponible"); el plano F, la tarjeta y la voz arrancan juntos en 41,17; la línea chica el último 1,0 s.
- Parte 2 sin planos de más de 3 s: Q1 se parte en Q1 (2,48) + Q1b (corte a los dos más cerca en "¿Y quién contesta?", 1,22);
  Q2 2,18; Q3 2,42; Q3b 2,16; Q4 2,56; Q4f 2,07 (rótulos de la comisión y "Sin contestar 0" a +0,2/+0,38 de RESERVADO).
- Para llegar a 44: atempo 1,15 (antes 1,1) en d1, s3, d3 y al; narrador reusado con atempo 1,1 (cartel 2,25 s); escalada P2
  1,65 s; tiempos muertos de P3 (sorbo 0,45, enviado → nota de voz) y del vibrar de P4 más cortos. Las pausas de comedia de la
  parte 1 (antes de "Yo también.", la pausa P3b 1,05 s, antes de "Preguntar, preguntaron.") quedaron igual.
- Mezcla: la cama de la parte 2 a -39 y los SFX del panel más bajos (sin voz en Q2 pasaba -31).

## Comandos (desde reels/inmobiliaria-disponible)
```
TOMAS="a b c" LINEAS=partes/lineas-gen.tsv bash partes/reintentar.sh   # tomas (lineas-gen.tsv = lineas.tsv sin el narrador)
bash partes/medir-tomas.sh                # recorta y mide "oyó:" (partes/rec/medidas.tsv)
bash partes/procesar.sh                   # assets/voice/ desde las tomas elegidas + palabras-*.json
node gen.mjs                              # todo; SINAUDIO=1 no rehace la mezcla; MEDIR=1 stems; LIMPIO=1 / VER=portada
python3 medir.py                          # voz contra resto por tramos (después de MEDIR=1 node gen.mjs)
python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav
./snap.sh "t1,t2,…" nombre                # snapshots con el candado
flock /tmp/hyperframes.lock node prev.mjs "t1,t2" renders/prev/x  # solo la capa 3D ("t|px,py,pz,mx,my,mz,fov;…" para probar cámaras)
bash paso10.sh                            # recodificación final (después del render)
```
Portada: `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 2.0 renders/prev/portada`
→ `portada-src/fondo-limpio-2.0.png`; después `SINAUDIO=1 node gen.mjs` (¡volver a correrlo!) y desde la raíz
`node herramientas/portada.mjs inmobiliaria-disponible` (el script exige que exista el mp4 final aunque use el fondo limpio:
para generarla antes del render se puso un mp4 negro temporal en renders/ y se borró).

## Voces (partes/procesar.sh; "oyó:" en partes/rec/medidas.tsv)
Silvana = Erinome, Diego = Achird, Agustina = Laomedeia, don Alberto = Charon (filtro de altavoz), narrador = Rasalgethi
(reusado de abren-hoy-completo, atempo 1,1 desde r1). Tres tomas por línea (siete para 02, siete para 17).
d1 01-diego-c ×1,15 · s1 02-silvana-b ×1,05 (0,90) · d2 03-diego-c ×1,05 (0,93) · s2 04-silvana-a (0,82) · s3 05-silvana-a ×1,15
· a1 06-agustina-c + filtro (1,71) · al 07-alberto-b ×1,15 + filtro · s4 08-silvana-c (1,77; la única donde oye "preguntaron")
· s5 10-silvana-c ×1,05 · d3 11-diego-b ×1,15 · a2 13-agustina-a · s7 14-silvana-a · a3 15-agustina-a · s8 16-silvana-c ×1,1
recortada (sin "Seis visitas.", 2,17) · s9 17-silvana-g ×1,2 (2,98). (Sin s6: "Esos dos, para mí." salió en r1.)
**Dudoso:** "Contestales vos." (02): el STT no lo oye bien en NINGUNA de 7 tomas ("Contéstame vos", "contesta hijos",
"contestar Y vos"); quedó la b. Y "Comentá" lo oye "Comenta" en las 7 tomas de 17 (como en otros reels). A revisar de oído.

## Mundo
- **Oficina de Silvana Propiedades** (origen): la de inmobiliaria-visitas SIN el tablero de llaves ni los escritorios de
  Diego/Romina; el cartel "SILVANA PROPIEDADES" más chico y alto (2,3 m); el panel de fichas a la derecha del cuadro con la
  ficha protagonista ALQUILA · PUNTA CARRETAS · 1 dorm. · $ 30.000 (borde verde; gris de P3b al cartel; franja RESERVADO ✓
  en Q4). Escritorio con monitor (canvas 1600×1000: bandeja roja "Sin contestar: 38" en la parte 1, el panel del agente en
  la 2), celular en soporte (pantS), celular acostado para la escalada de noche (luces bajas, vidriera navy), taza navy con
  franja verde (en la mano en P3), planta.
- **Living vacío de Parque Batlle** (x = 60): crema, monolítico claro en placas, ventanal navy con árboles low-poly verde
  oscuro, foco pelado, escalera de pintor plegada, tarro y lona. Silvana (celular crema) y Diego (celular navy) adelante, la
  pareja (Ana tapado crema, Martín buzo verde oscuro) al medio mirando la ventana; giran la cabeza en el cruce.
- **Palier 3B** (x = 120): puerta navy3 con paneles, mirilla, "3B" de bronce, picaporte, llave con llavero verde en la
  cerradura; felpudo, planta, aplique; adentro claro. La puerta se abre en "Sí.".
- Agustina nueva (Laomedeia): castaño en coleta alta, campera crema abierta, remera navy3, jean, aritos verdes, mochila navy.
- Pantallas en canvas: bandeja de consultas con avatares de iniciales e íconos genéricos de canal (casita/globo/cámara, sin
  logos); chat con Agustina (tipeo sincronizado con las palabras de s3, "9:10" con tilde roja, escribiendo…, nota de voz
  0:02); llamada "Don Alberto · propietario" (DA); chat del agente "Silvana Propiedades · agente de IA" con la ficha
  ($ 30.000 + GC $ 5.000, ANDA/CGN/Porto Seguro o depósito, no acepta mascotas, 3 miniaturas, 12 fotos ▸) → "Visita
  confirmada ✓ Mié 10:30 · Diego"; panel (38 / 38 ✓ / mascota 5 → 2 / sin garantía 9 → requisitos / visitas 6 ✓ / agenda de
  Diego / "Listos para visitar y firmar: 2 · Agustina · ANDA · Martina · CGN → para vos, Silvana"); pantalla "Sin contestar 0".

## Planos (s) (r1)
P1 0 (cuadro 0: INMOBILIARIAS + "Martes, 15:00.", el living, 3 consultas apiladas, contador 12) · P1b 5,30 ("Yo también." 5,68)
· P2 6,62 (escalada cenital 12 → 38, chips 18:30/23:10, Agustina 7,57, "La inquilina ideal" 7,82) · P3 8,27 ("Miércoles,
9:10.", el café) · P3i 8,72 (chat, tipeo, "¡Qué bueno! Yo ya no." 12,48) · P3b 14,27 (la pausa, rótulos) · P4 15,32 (don
Alberto en altavoz) · P4i 18,43 (38) · P4b 19,03 ("Preguntar, preguntaron." 19,15) · cartel 21,27 · Q1 23,52 (mismo encuadre,
"Martes, 15:00.") · Q1b 26,00 ("¿Y quién contesta?") · Q1i 27,22 (chat del agente) · Q2 29,78 (panel: lista → agenda → listos
31,21) · Q3 31,96 (palier, "Miércoles, 10:30.", "Sí." 33,52 abre) · Q3b 34,38 ("¡Qué bueno! Yo también.", rótulo 35,99) · Q4
36,54 ("Miércoles, 12:00.", "¿Nadie preguntó…?", "Treinta y ocho. Y el viernes firman." 38,15, "Visitas agendadas: 6 ✓") · Q4f
39,10 (RESERVADO 40,22, comisión ✓, "Sin contestar 0") · F 41,17-44,17 (Silvana a cámara, tarjeta; línea chica 43,17).

## Pasadas
- r1 (recorte): snapshots a los dos lados de cada corte nuevo (renders/snap/r1, r1b): Q1b quedaba con Silvana y Diego
  cortados en los bordes → cámara más atrás; el resto sin defectos.
- Armado (prev.mjs, renders/prev/a-e): P1 muy cerrado (Silvana cortada) → cámara a 4,5 m, fov 46, personajes más juntos y la
  pareja al medio; las consultas tapaban caras → se apilan abajo a la izquierda (brotan del celular y bajan), contador a la
  derecha; burbuja de Diego que no se iba al hablar Silvana; P2 celular chico y torcido → cenital a 0,3 m, ≥ 60 % del ancho,
  lejos del teclado; tarjetas semitransparentes al achicarlas (opacidad atada a la escala) → `esc` aparte en ponerGlobo; la
  taza escondida dentro del puño → corrida a la mano con el asa; mano gigante de Silvana en el inserto P3i → Silvana oculta en
  los insertos; ficha del chat del agente cortada a la derecha → textos con ajustar; P3/P3b con Silvana cortada → cámaras
  más abiertas; P4b/F demasiado cerca; Q3 Diego tapando a Silvana → Diego a la derecha contra la pared; Q3b la burbuja
  sobre la cara de Agustina → cámara con la cabeza abajo; techo del living oscuro → emisivo.
- Pasada 1 (snapshots cada 1 s, renders/snap/p1): contador pisando la pila; "¿Sigue disponible?" y "Sí." encimadas en Q3;
  mano de Agustina rara (tira de mochila) → costado; RESERVADO + rótulos solo 0,85 s → 1,25 s; mezcla: la escalada y
  RESERVADO pasaban -31 sin voz (-28,0) → sin el +4 dB en P2 y SFX más bajos (-31,3).
- Pasada 2 (snapshots cada 1 s desfasados, renders/snap/p2, y cuadros a los dos lados de cada corte, renders/snap/p3): el
  cartel "SILVANA PROPIEDADES" cortado en el borde en P4b/Q4/F → más chico, centrado y más alto; P4b y Q2s más bajas; F más
  abierta (se ven el monitor con el panel verde y la ficha RESERVADO); el celular parado seguía en "llamada" en el cierre →
  pantalla "Sin contestar 0 · Contestadas: 38 ✓". Sin defectos nuevos en la pasada de cortes.

## Portada
`portada.json` (formato de gym-cupo): chica "Martes, 15:00.", grande "¿Sigue disponible?", sello INMOBILIARIAS, fondo limpio
`portada-src/fondo-limpio-2.0.png` (VER=portada: Silvana, la pareja y Diego con los celulares llenando la mitad de arriba).

## Flojo / para los revisores
- "Contestales vos." y "Comentá" sin confirmar de oído (STT).
- La parte 1 tiene planos largos (P1 5,3 s, P3i 5,5 s): son las pausas de comedia y el tipeo; no se tocaron por indicación.
- El narrador con atempo 1,1: el STT lo oye igual que el original ("agente de ella más tarde"), revisar de oído.
- En P3i la burbuja "Yo ya no." tapa la cabecera del chat (queda el mensaje de Agustina y la nota de voz a la vista).
- Render final no hecho (lo hace el coordinador); con 4-5 personajes por plano, SwiftShader ~20-25 min.
