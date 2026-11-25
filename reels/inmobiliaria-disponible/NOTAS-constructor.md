# inmobiliaria-disponible · notas del constructor (25-11)

Proyecto armado con la infraestructura de `reels/gym-cupo` (prev.mjs, snap.sh, paso10.sh, medir-sfx.py, partes/*.sh,
personajes.js) y la de `reels/inmobiliaria-visitas` (gen.mjs, la oficina de Silvana Propiedades, Silvana y Diego,
tarjetas pegadas a la cámara); medir.py de resto-reservas. Todo sale de `node gen.mjs` (assets/tiempos3d.js,
compositions/*.html, index.html, assets/audio/mezcla.wav). La escena entera está en `assets/tres.js` (escrita para este
reel; función pura del tiempo).

**Duración: 44,80 s** (1344 cuadros) desde la corrección r2 (igual en el pulido final). Solución 22,54 s (50,3 %); cierre 3,38 s. Lo que sigue en este párrafo es de r1: Parte 1 0-20,01 · cartel 20,01-22,26 · parte 2 +
cierre 22,26-44,57 = 22,31 s (50,05 %). Cierre (plano F, tarjeta "Comentá DISPONIBLE" y voz juntos) 41,33-44,57 = 3,24 s
(voz 2,98 + 0,25 de cola); línea chica desde 43,07 (1,5 s). `check --json`: ok, 0 errores, 0 warnings.
Mezcla (MEDIR=1 node gen.mjs; python3 medir.py): voz ≥ +9,1 LU sobre el resto en todos los tramos de 0,5 s con voz;
-14,0 LUFS, pico -5,7 dBFS; `python3 medir-sfx.py assets/audio/mezcla.wav assets/audio/stem-voz.wav`: máximo sin voz
-31,6 LUFS momentáneo.

## Corrección r1 (QA de arte, guion y sonido + decisiones del coordinador, 25-11)
- Línea 02 → "Contestá vos." (partes/02-silvana.txt, lineas.tsv con el tono co-men-TÁ, burbuja, guion): 4 tomas nuevas, el
  STT oye "contesta vos" en las 4 (no oye tildes); quedó la k (0,84 s), sin atempo.
- Rótulo de P3b: "Ayer 16:30 · reservó / en otra inmobiliaria" (fuentes.md también).
- Q2 rehecho: el monitor de Silvana pasa a VERTICAL (0,42 × 0,672 m, canvas 1000×1600) y el panel entra entero con márgenes:
  "Punta Carretas · hoy · agente de IA", cuatro renglones grandes (Consultas 38 · Contestadas al instante 38 ✓ · Visitas
  agendadas 6 ✓ · resaltado "Listos para visitar y firmar 2 → para vos, Silvana" con Agustina · ANDA · Martina · CGN), lleno
  desde el primer cuadro, quieto 2,55 s (push-in mínimo), chip "Martes, 23:10.". Sin agenda ni filas que se llenan.
- Solución ≥ 50 %: la parte 1 bajó 1,26 s sin tocar las pausas de comedia: Silvana empieza a decir el mensaje sobre el plano
  del café y el inserto P3i entra a los 0,3 s (sin el sorbo); enviado → nota de voz más corto; la entrada de P4 (vibra →
  atiende → altavoz) 0,27 s; silencios internos de d1, al y s3 acortados a 0,2 s (partes/apretar.py: -0,2, -0,55, -0,1 s);
  escalada P2 1,4 s.
- Colas y vida de TODAS las burbujas: cada burbuja se va 0,12 s después de su parlamento (`vivo()` en tarjetas()); el altavoz
  de don Alberto va DEBAJO del celular parado con la cola hacia el celular (P4 y Q4, no lo tapa); "Preguntar, preguntaron."
  abajo con la cola hacia ella (no tapa la cara ni el pelo); "Yo ya no." y "Yo también." en el mismo lugar (y 380) y tamaño
  (84 px, 780 de ancho), arriba del celular, que en P3i arranca más abajo: la cola baja al celular sin tapar la cabecera;
  "Treinta y ocho…" en Q4f sin cola (ella está fuera de cuadro), arriba de la ficha, y se va al terminar; Agustina en Q3b
  con su avatar en la cabecera de la burbuja.
- Chat P3i como un chat de verdad: los mensajes anclados abajo, sobre la barra de escribir, y arriba la ficha de la consulta
  (ALQUILA · 1 dorm. · Punta Carretas · $ 30.000); horas, "Ayer/Hoy" y "escribiendo…" ≥ 34 px de canvas (≥ 36 en pantalla);
  horas del chat del agente 34 (≈ 38 en pantalla).
- P3: el chip "Miércoles, 9:10." ya no pisa el cartel (cámara más baja). P2: la tarjeta de Agustina más ancha (920) y la
  cola a SU fila de la bandeja. Q4: el brazo de Silvana cruzado era aCuerpo con la raíz del cuadro anterior (palier) → la
  raíz se pone en su lugar antes de calcular la pose (oficina y palier). P4i: el celular al 70 % y el contador abajo.
- Q1: corte a Q1b más abierto (Silvana y Diego enteros). Q3: Agustina entra desde más adentro y el rótulo "Agustina · ANDA"
  aparece a los 0,3 s del palier; en Q3b se suma "firma el viernes ✓". Cuadro 0 más abierto (Silvana y Diego a ±0,5, la
  pareja más cerca y al medio). Rótulo del chat del agente a y 165 (no toca el borde). Contador del cuadro 0 a 0,78 (≥ 36 px).
- Íconos de canal: la cámara (parecía un logo) pasa a un sobre. El iris del cartel arranca de 0 px (sin la mancha oscura).
- F más cerca y más arriba (sin el cuarto inferior vacío, la boca por encima de la tarjeta). Q4f: RESERVADO y los rótulos
  "Comisión… ✓" (a +0,15) y "Sin contestar 0" (a +0,3) quedan 1,2 s; la línea chica 1,5 s.
- Sonido: 0,25 s entre los tres primeros parlamentos; 0,33 s narrador → Diego; 0,35 s antes de "Treinta y ocho"; cola de
  0,25 s al final; "Comentá": 3 tomas nuevas (h, i, j) con el tono marcando la tilde: el STT oye "Comenta" en las 10 tomas (no
  distingue la tilde) → queda la g (×1,2). Sin `pajaro.wav` ni `llaves.wav` (sin crédito): la llave del 3B con Kenney
  (`k-metal-liviano-2`, `k-metal-click`); `zumbido-largo.wav` reemplazado por `zumbido.wav` (gchase, CC0). Créditos de todo lo
  que suena en fuentes.md. Narrador con atempo 1,1.
- Portada: fondo limpio a 0,05 s (Diego con la boca cerrada, antes de hablar) con la cámara más atrás y corrida: Silvana ya no
  toca el borde (`portada-src/fondo-limpio-0.05.png`); se regeneró portada.png.
- guion.txt, descripcion.txt ("Doce mientras… Treinta y ocho a la noche.", "WhatsApp e Instagram"), fuentes.md actualizados.
- Snapshots: renders/snap/r2 (62 cuadros a los dos lados de cada corte y en cada cambio) y r3 (P3, Q4f, F después de los
  últimos ajustes).

## Corrección r2 (QA arte + sonido/guion, 25-11)
- "Yo ya no." entra con la voz (12,98): el STT ponía "Yo" en 0,5 s de la toma, pero es el fin de la pausa (silencedetect:
  1,147 s); T.yaNo = a1 + 1,12. Igual "preguntaron." (s4: silencedetect 0,84 s): la burbuja de P4b dice "Preguntar," y suma
  "preguntaron." a las 18,71.
- "para tu inmobiliaria": s9 con atempo 1,1 (antes 1,2, sonaba "para ti mobiliaria"); STT completo. Cierre 3,38 s (voz 3,27 +
  0,1 de cola), dentro de los ~3,3-3,4 que autorizó el coordinador.
- P2: la tarjeta de Agustina va pegada debajo de SU fila de la bandeja, así la cola llega a la fila resaltada; la bandeja,
  bajada hasta Agustina (3.ª fila) cuando se ilumina. El celular arranca más cerca (no 40 %) y más abajo (el contador no tapa la
  cabecera).
- "ALQUILA" entero en todas las fichas: las letras se achican hasta entrar en el ancho de la ficha (texFicha). F un poco a la
  derecha: el ✓ de RESERVADO no toca el borde. Q4f: la ficha más abajo en el cuadro y la burbuja "Treinta y ocho…" más arriba
  (no tapa ALQUILA).
- Bocas solo con su voz: Diego en Q1/Q1b movía la boca con el audio reusado corrido 0,64 s (usaba T.d1b en vez de T.d1b0);
  todo el que no habla queda con la boca cerrada (`callada()`: sonrisa ≤ 0,6 sin abrir; con 0,85 el rig dibuja la boca
  abierta: Silvana en el palier, Agustina en Q3b, la pareja).
- Taza crema (no se pierde contra la campera). El dedo de Silvana tipea en la barra de escribir (no tapa el mensaje). P3i:
  la ficha de la consulta con las tres fotos de la propiedad (llena el hueco de arriba). Q1b más abierto. La cola de don
  Alberto termina debajo del celular (no pisa "altavoz").
- Bandeja coherente: cada fila es la k-ésima consulta del día con su hora (las 12 primeras hasta las 15:00, Agustina la 13 a
  las 15:02, la 38 a las 23:10), la más nueva arriba; la misma fila tiene la misma hora en P1, P2 y P4i.
- Diego "Le pidió la garantía": atempo 1,08 (antes 1,15).
- ANDA y Porto Seguro se quedan (decisión del coordinador). fuentes.md con las URL de stinger, tic-real, zumbido y Kenney.
- Duración 44,80 s, solución 50,3 %. Mezcla: voz ≥ +15,7 LU sobre el resto en todos los tramos con voz, -14,0 LUFS, pico
  -5,6 dBFS, máximo sin voz -31,7.

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
Portada: `VER=portada LIMPIO=1 SINAUDIO=1 node gen.mjs && FULL=1 flock /tmp/hyperframes.lock node prev.mjs 0.05 renders/prev/portada`
→ `portada-src/fondo-limpio-0.05.png`; después `SINAUDIO=1 node gen.mjs` (¡volver a correrlo!) y desde la raíz
`node herramientas/portada.mjs inmobiliaria-disponible` (el script exige que exista el mp4 final aunque use el fondo limpio:
para generarla antes del render se puso un mp4 negro temporal en renders/ y se borró; desde r1 ya está el render).

## Voces (partes/procesar.sh; "oyó:" en partes/rec/medidas.tsv)
Silvana = Erinome, Diego = Achird, Agustina = Laomedeia, don Alberto = Charon (filtro de altavoz), narrador = Rasalgethi
(reusado de abren-hoy-completo, atempo 1,1 desde r1). Tres tomas por línea (siete para 02, siete para 17).
d1 01-diego-c ×1,15 + apretada (2,88) · s1 02-silvana-k "Contestá vos." (0,84) · d2 03-diego-c ×1,05 (0,93) · s2 04-silvana-a (0,82) · s3 05-silvana-a ×1,15
· a1 06-agustina-c + filtro (1,71) · al 07-alberto-b ×1,15 + filtro · s4 08-silvana-c (1,77; la única donde oye "preguntaron")
· s5 10-silvana-c ×1,05 · d3 11-diego-b ×1,08 (r2) · a2 13-agustina-a · s7 14-silvana-a · a3 15-agustina-a · s8 16-silvana-c ×1,1
recortada (sin "Seis visitas.", 2,17) · s9 17-silvana-g ×1,1 (3,27; r2: con ×1,2 sonaba "para ti mobiliaria"). (Sin s6: "Esos dos, para mí." salió en r1.)
**Dudoso:** (r1) la 02 ahora es "Contestá vos." (toma k; el STT oye "contesta vos"). Y "Comentá" lo oye "Comenta" en las 10 tomas de 17 (como en otros reels). A revisar de oído.

## Mundo
- **Oficina de Silvana Propiedades** (origen): la de inmobiliaria-visitas SIN el tablero de llaves ni los escritorios de
  Diego/Romina; el cartel "SILVANA PROPIEDADES" más chico y alto (2,3 m); el panel de fichas a la derecha del cuadro con la
  ficha protagonista ALQUILA · PUNTA CARRETAS · 1 dorm. · $ 30.000 (borde verde; gris de P3b al cartel; franja RESERVADO ✓
  en Q4). Escritorio con monitor VERTICAL (r1; canvas 1000×1600: bandeja roja "Sin contestar: 38" en la parte 1, el panel del agente
  de cuatro renglones en la 2), celular en soporte (pantS), celular acostado para la escalada de noche (luces bajas,
  vidriera navy), taza crema con franja verde (r2; en la mano en P3), planta.
- **Living vacío de Parque Batlle** (x = 60): crema, monolítico claro en placas, ventanal navy con árboles low-poly verde
  oscuro, foco pelado, escalera de pintor plegada, tarro y lona. Silvana (celular crema) y Diego (celular navy) adelante, la
  pareja (Ana tapado crema, Martín buzo verde oscuro) al medio mirando la ventana; giran la cabeza en el cruce.
- **Palier 3B** (x = 120): puerta navy3 con paneles, mirilla, "3B" de bronce, picaporte, llave con llavero verde en la
  cerradura; felpudo, planta, aplique; adentro claro. La puerta se abre en "Sí.".
- Agustina nueva (Laomedeia): castaño en coleta alta, campera crema abierta, remera navy3, jean, aritos verdes, mochila navy.
- Pantallas en canvas: bandeja de consultas con avatares de iniciales e íconos genéricos de canal (casita/globo/sobre, sin
  logos; r2: cada fila es una consulta fija con su hora, la más nueva arriba); chat con Agustina (tipeo sincronizado con las palabras de s3, "9:10" con tilde roja, escribiendo…, nota de voz
  0:02); llamada "Don Alberto · propietario" (DA); chat del agente "Silvana Propiedades · agente de IA" con la ficha
  ($ 30.000 + GC $ 5.000, ANDA/CGN/Porto Seguro o depósito, no acepta mascotas, 3 miniaturas, 12 fotos ▸) → "Visita
  confirmada ✓ Mié 10:30 · Diego"; panel (r1: Consultas 38 / Contestadas al instante 38 ✓ / Visitas agendadas
  6 ✓ / "Listos para visitar y firmar 2 → para vos, Silvana · Agustina · ANDA · Martina · CGN"); pantalla "Sin contestar 0".

## Planos (s) (tiempos reales, pulido final; 44,80 s)
P1 0 (cuadro 0) · P1b 5,45 ("Yo también." 5,83) · P2 6,77 (escalada; chip 23:10 a las 7,17; Agustina 7,55; "La inquilina
ideal" 7,77) · P3 8,17 (empieza a decirlo 8,37) · P3i 8,67 (chat; nota de voz 11,86; "Yo ya no." 12,98) · P3b 13,65 (la pausa,
rótulos) · P4 14,70 (don Alberto 14,97) · P4i 17,17 (38) · P4b 17,77 ("Preguntar," 17,89 · "preguntaron." 18,71) · cartel
20,01 · Q1 22,26 (Diego 22,38) · Q1b 24,90 ("¿Y quién contesta?" 24,98) · Q1i 26,12 (chat del agente; Diego 26,17) · Q2 28,77
(panel, "Martes, 23:10.") · Q3 31,32 (palier; "¿Sigue disponible?" 31,70; "Sí." 32,88) · Q3b 33,74 ("¡Qué bueno!" 33,79 ·
"Yo también." 34,58; rótulo 35,35) · Q4 35,90 (altavoz 36,12; "Treinta y ocho." 38,00) · Q4f 38,95 ("Y el viernes firman."
39,03; RESERVADO 40,07) · F 41,42-44,80 (tarjeta desde "Comentá" 41,42; línea chica 43,30).

## Pulido final (QA r3, 25-11)
- "Yo también." entra con la voz: T.tambien = a3 + 0,79 (34,58; el STT ponía "Yo" en el arranque de la pausa).
- "Treinta y ocho." y "Y el viernes firman." en dos tiempos (silencedetect: 1,045 s → 39,03), en Q4 y en Q4f.
- Cola de don Alberto limpia: la cola que sube va sin la sombra (era la astilla negra escalonada); P4 y Q4 con la mirada
  más baja (CAM_OF2) para que la burbuja quepa debajo del celular sin tapar botones ni "altavoz"; en Q4 el cartel
  "SILVANA PROPIEDADES" se oculta (quedaba pegado debajo del chip).
- Q4f: "Comisión… $ 30.000 ✓" a y 1625 y "Sin contestar 0" más chico abajo: no cortan el "$ 30.000" de la ficha.
- Boca de Silvana en Q3b: verificada cerrada (callada() de r2; prev y snapshot a 34,0).
- P2: el chip pasa a "Martes, 23:10." cuando el contador pasa la consulta 24 (las 18:30), a las 7,17; el celular un poco más
  abajo (el contador no tapa "Carretas").
- P3i: lo que sube detrás de la ficha fija ya no se dibuja (no queda "y me mudo el 1°." cortado); "Yo ya no." y "Yo también."
  a y 350 (la punta no pisa la cabecera).
- Q2: "Agustina · ANDA · Martina · CGN" a 56 px de canvas (≈ 50 en pantalla).
- "para tu inmobiliaria": no se tocó (bajar el atempo alargaba el cierre a > 3,5 s).
- Mezcla re-medida (solo se movió el whoosh del chip): voz ≥ +15,7 LU, -14,0 LUFS, máximo sin voz -31,7. check: 0 errores.
- Snapshots: renders/snap/p5 (P2, P3i, P4, Q2, Q3b a 30 fps 34,533/34,567/34,6, Q4, Q4f a 30 fps 39,0/39,033/39,067), p6, p7.

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
`portada-src/fondo-limpio-0.05.png` (VER=portada a 0,05 s, antes de que Diego hable: Silvana, la pareja y Diego con los
celulares llenando la mitad de arriba; regenerada en r2 con las bocas cerradas).

## Flojo / para los revisores
- "Contestá vos." y "Comentá" sin confirmar de oído (el STT no oye tildes).
- La parte 1 tiene planos largos (P1 5,45 s, P3i 5,0 s): las pausas de comedia y el tipeo.
- El narrador con atempo 1,1: el STT lo oye igual que el original ("agente de ella más tarde"), revisar de oído.
- En P3i la burbuja "Yo ya no." tapa la cabecera del chat (queda el mensaje de Agustina y la nota de voz a la vista).
- El render lo hace el coordinador; con 4-5 personajes por plano, SwiftShader ~20-25 min.
