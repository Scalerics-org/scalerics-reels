# que-en-paz-descanse · fuentes

Sin datos ni afirmaciones de hechos para verificar: es una situación inventada (un almacén que en internet figura
"Cerrado permanentemente" y el barrio que le cree). El contador "Pésames: 3 → 7 → 12 → 13", el horario "8:00 a 20:00"
de la web y los mensajes de la mamá de Rubén son parte del chiste, no estadísticas. Buscador, ficha, sitio web,
celulares, bizcochos, corona, mate y termo genéricos, sin marcas: no se nombra ni se dibuja ningún buscador ni app
(en pantalla y en burbujas se dice "dice acá" / "internet").

## Voces (Gemini TTS)
- Rubén: Algenib ("Es, Graciela." y "Estoy, Graciela."), en partes/ruben-1.txt y partes/ruben-2.txt.
- Narrador del cartel: Rasalgethi ("Un sitio web más tarde."), en partes/narrador.txt.

## Sonido
Todo con grabaciones reales que ya estaban en el repo con su licencia registrada (la descarga de freesound está
bloqueada en la nube); nada sintetizado con ffmpeg, y sin golpe.mp3 (sin licencia registrada).

Reutilizados, CC0 1.0 (créditos completos en reels/abren-hoy/fuentes.md, reels/abren-hoy-2/fuentes.md,
reels/abren-hoy-completo/fuentes.md y reels/las-siete-y-cincuenta-y-nueve/fuentes.md):
- Ambiente de barrio de día: `calle.wav` (Oper8), con pasabajos a 1800 Hz (se oye desde adentro del almacén); un
  tramo muy bajo bajo el final del cartel para que no quede silencio digital antes del iris.
- Música: "Pizzicato Intrigue" (younoise), `bgm/pizzicato.wav`; arranca desde 0,6 s del archivo para que en 8,4 s
  esté sonando una nota y el corte seco se oiga; vuelve en la parte 2 (baja 9 dB mientras habla Rubén).
- Campanita de la puerta (entra Marta, entra Graciela, el cierre): `campanita.wav`, "Shop door bell.wav", 775noise.
- Pop de las burbujas: `burbuja.mp3` (Mafon2).
- Sorbo de mate: `sorbo.wav` (Abir19).
- Vibración del celular de Rubén: `vibra.wav` (SpliceSound).
- Tuba del "Pésames: 13": `tuba.mp3` (nomiqbomi).
- Ding del "Pésames: 0": `cero.mp3` (GabFitzgerald, de reels/trabajar-con-scalerics).
- Stinger de vibráfono del cartel: `stinger.wav` (DanJFilms).
- Pasos de Marta y de Graciela, y el mate que toca el pecho: `tac-real.mp3` / `tic-real.mp3`, recortes de "Clock
  ticking", olver, https://freesound.org/people/olver/sounds/130388/ (CC0 1.0).
- La bandeja que se apoya y el trípode de la corona que toca el piso: `sello.wav`, "Stamp", kermite607,
  https://freesound.org/people/kermite607/sounds/362624/ (CC0 1.0).
- El pañuelo, el bizcocho que cruje, la raya que tacha el 13: `papel.wav`, "Paper slide", Kingofgamers_cz,
  https://freesound.org/people/Kingofgamers_cz/sounds/352914/ (CC0 1.0).
- Del banco de HyperFrames que viene con la herramienta (`molde/assets/sfx`, usados en todos los reels aprobados):
  whoosh, whoosh-short, pop, key-press (tics del contador y tipeo), click-soft (el tap), notification (la
  notificación de Mamá), chime (el guiño).

## Mezcla (gen.mjs)
Techo por efecto de -31 LUFS (más bajo en golpes secos y en los que caen cerca de una voz), la cama (música + calle)
con techo propio; voces con compresor suave (5:1) y recorte de picos antes de la suma; normalización lineal con
limitador sobremuestreado. Medido (MEDIR=1, por tramos de 0,5 s): la voz queda 16 LU o más por encima del resto
mientras habla (Rubén y el narrador del cartel). Mezcla: -15,6 LUFS, pico -3,3 dBFS (el loudnorm del paso 10 la
lleva a -14).
