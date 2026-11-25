# inmobiliaria-disponible · notas del constructor (25-11)

Proyecto armado con la infraestructura de `reels/gym-cupo` (prev.mjs, snap.sh, paso10.sh, medir-sfx.py, partes/*.sh,
personajes.js) y la de `reels/inmobiliaria-visitas` (gen.mjs, la oficina de Silvana Propiedades, Silvana y Diego,
tarjetas pegadas a la cámara); medir.py de resto-reservas. Todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena entera está en `assets/tres.js` (escrita para este
reel; función pura del tiempo).

**Duración: 50,17 s** (1505 cuadros). Parte 1 0-22,31 · cartel 22,31-24,75 · parte 2 + cierre 24,75-50,17 = 25,4 s (51 %).
Tarjeta "Comentá DISPONIBLE" desde 45,86 · línea chica desde 48,98 (1,2 s). `check --json`: ok, 0 errores, 0 warnings.
Mezcla (MEDIR=1 node gen.mjs; python3 medir.py): voz ≥ +13,2 LU sobre el resto en todos los tramos de 0,5 s con voz;
-14,0 LUFS, pico -5,3 dBFS; `python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav`: máximo sin voz
-31,3 LUFS momentáneo (paso10.sh toma el audio de assets/audio/mezcla.wav).

**OJO duración:** el plan estimaba ~39 s, pero las 16 líneas del guion suman ~42 s de voz sola. Ya se recortó: atempo 1,05-1,12
en las líneas largas (d1, s1, d2, s3, al, s5, d3, s8, s9), pausas al mínimo del plan (0,5 antes de "Yo también.", ~0,75 antes
de "Preguntar, preguntaron.", 0,4 antes de "¡Qué bueno! Yo también."), escalada P2 1,9 s, Q2 2,1 s, y los audios
reusados de la parte 2 van recortados: Q1 desde "El de Punta Carretas explota. Van doce." (sin "Silvana.") y Q4 desde "¿Nadie
preguntó por el apartamento?". Para bajar de 45 s habría que sacar texto del guion (decisión del coordinador).

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
(reusado de abren-hoy-completo, 2,38 s). Tres tomas por línea (siete para 02).
d1 01-diego-c ×1,1 (3,23) · s1 02-silvana-b ×1,05 (0,90) · d2 03-diego-c ×1,05 (0,93) · s2 04-silvana-a (0,82) · s3 05-silvana-a ×1,1
(3,28) · a1 06-agustina-c + filtro (1,71) · al 07-alberto-b ×1,1 + filtro (2,85) · s4 08-silvana-c (1,77; la única donde oye
"preguntaron") · s5 10-silvana-c ×1,05 · d3 11-diego-b ×1,1 · s6 12-silvana-b · a2 13-agustina-a · s7 14-silvana-a · a3
15-agustina-a · s8 16-silvana-c ×1,1 · s9 17-silvana-b ×1,12 (3,86).
**Dudoso:** "Contestales vos." (02): el STT no lo oye bien en NINGUNA de 7 tomas ("Contéstame vos", "contesta hijos",
"contestar Y vos"); quedó la b. Y "Comentá" lo oye "Comenta" en las 3 tomas de 17 (como en otros reels). A revisar de oído.

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

## Planos (s)
P1 0 (cuadro 0: INMOBILIARIAS + "Martes, 15:00.", el living, 3 consultas ya apiladas abajo a la izquierda, contador 12) ·
P1b 5,55 (Silvana, sonrisa fija, "Yo también." 5,93) · P2 6,87 (escalada cenital, 12 → 38, chips 18:30/23:10, Agustina 7,97,
"La inquilina ideal" 8,27) · P3 8,77 ("Miércoles, 9:10.", sorbo de café) · P3i 9,32 (chat, tipea; "¡Qué bueno! Yo ya no.")
· P3b 15,12 (la pausa: rótulos "Alquiló ayer 16:30 · en otra inmobiliaria" y "Comisión de este alquiler: $ 30.000") · P4
16,17 (vibra, don Alberto en altavoz) · P4i 19,47 (bandeja: 38) · P4b 20,07 ("Preguntar, preguntaron." 20,19) · cartel
22,31 · Q1 24,75 (mismo encuadre, "Martes, 15:00.") · Q1i 28,64 (chat del agente) · Q2 31,25 (monitor: lista → agenda →
listos) · Q2s 33,32 ("Esos dos, para mí.") · Q3 34,53 (palier, "Miércoles, 10:30.") · Q3b 37,07 (Agustina: "¡Qué bueno! Yo
también." en el mismo lugar y tamaño que "Yo ya no.") · Q4 39,33 ("Miércoles, 12:00.", la llamada, "Treinta y ocho…") ·
Q4f 43,43 (la ficha: RESERVADO 44,55, "Comisión… ✓", "Sin contestar 0") · F 45,8 (Silvana a cámara, tarjeta, línea chica).

## Pasadas
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
- Duración 50,2 s (ver arriba).
- "Contestales vos." y "Comentá" sin confirmar de oído (STT).
- Q2: "Esos dos, para mí." arranca 0,3 s antes del corte a Silvana (voz sobre el panel, la burbuja aparece en Q2s).
- En P3i la burbuja "Yo ya no." tapa la cabecera del chat (queda el mensaje de Agustina y la nota de voz a la vista).
- Render final no hecho (lo hace el coordinador); con 4-5 personajes por plano, SwiftShader ~20-25 min.
