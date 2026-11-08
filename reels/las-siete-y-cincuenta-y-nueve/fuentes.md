# las-siete-y-cincuenta-y-nueve · fuentes

Sin datos ni afirmaciones para verificar: es una situación inventada (las horas del chip, 19:59 a 20:41, son parte del
chiste, no una estadística). Tienda, chat, celulares, mercadería, bolsa, mate y termo genéricos, sin marcas.
"Mercado Pago" se nombra solo en descripcion.txt como medio de pago de la tienda (servicio que ofrece Scalerics).

## Voces
- Rubén: Gemini TTS, voz Algenib ("Sacate la campera, Walter." / "Está en la bolsa, Walter.").
- Cartel: Gemini TTS, voz Rasalgethi ("Una tienda online más tarde.").

## Sonido reutilizado (CC0 1.0; créditos completos en reels/abren-hoy/fuentes.md, reels/abren-hoy-2/fuentes.md y
reels/abren-hoy-completo/fuentes.md)
- Ambiente de calle (Oper8), vibración (SpliceSound), pop de burbuja (Mafon2), tipeo (Caitlin_100), música
  "Pizzicato Intrigue" (younoise), tuba (nomiqbomi), sorbo de mate (Abir19), campanita (775noise), respuesta enviada
  (Sunart1), ding del 0 (GabFitzgerald), stinger de vibráfono del cartel (DanJFilms).
- Del repo (HyperFrames): whoosh, whoosh-short, pop, key-press, click-soft, chime.

## Sonido nuevo (08-11, constructor)
Se intentó bajar los específicos (cortina enrollable, clanc, pasos, papel que se desenrolla, campanada, lapicera,
bolsa, abrochadora, cajón, roce de campera) con la API de Openverse (license=cc0): la búsqueda anda, pero
cdn.freesound.org devuelve 403 desde el proxy de la nube y Wikimedia 429/no tiene esos sonidos. Como en
reels/dos-repuestos, se armaron SOLO con grabaciones reales que ya estaban en el repo (nada sintetizado con ffmpeg):
- Cortina que baja / sube: ráfaga de `tac-real.mp3` y `tic-real.mp3` alternados cada 70-85 ms (traqueteo de las lamas)
  + `golpe.mp3` cuando se clava o llega al tope. `tic-real`/`tac-real` son recortes de "Clock ticking", olver,
  https://freesound.org/people/olver/sounds/130388/ (CC0), como en reels/tres-segundos.
- Clanc metálico (Walter frena la cortina), tuc del rollo en el cordón, crujido del cajón: `golpe.mp3` (del banco del
  repo, el mismo de reels/cadena-perpetua y reels/dos-repuestos), a distintos niveles.
- Pasos corriendo y caminando: `tac-real.mp3` / `tic-real.mp3` en ritmo de paso.
- Papel que se desenrolla, papelito, lapicera que tacha, hoja que se da vuelta, roce de la campera, bolsa de papel:
  `papel.wav` ("Paper slide", Kingofgamers_cz, https://freesound.org/people/Kingofgamers_cz/sounds/352914/, CC0,
  copiado de reels/trabajar-con-scalerics), recortado y repetido.
- Abrochadora (el ticket): `sello.wav` ("Stamp", kermite607, https://freesound.org/people/kermite607/sounds/362624/, CC0).
- Campanita del reloj de pared a las 20:00: `campanita.wav` ("Shop door bell.wav", 775noise, CC0).
- Tic de cada salto de hora: `tic-real.mp3`. Ding del 20:00 ✓ y del pago: `cero.mp3` (GabFitzgerald, CC0, de
  reels/trabajar-con-scalerics).
Si una corrida con acceso a freesound puede, conviene reemplazar la cortina y el papel que se desenrolla por las
grabaciones CC0 encontradas: "Rolling shutters down", Areti18 (https://freesound.org/people/Areti18/sounds/394951/),
"Rolling shutter", Areti18 (https://freesound.org/people/Areti18/sounds/394947/) y "Unrolling a toilet paper roll",
txirimiri (https://freesound.org/people/txirimiri/sounds/185779/).

## Mezcla (gen.mjs)
Techo por efecto de -31 LUFS (más bajo en los que caen cerca de una voz), música y ambiente con techo propio; la música
se corta seca cuando Walter da vuelta el papel y en la parte 2 baja 9 dB mientras habla Rubén. Medido por tramos de
0,5 s (momentary, stems con `MEDIR=1 node gen.mjs`): la voz queda siempre 6,4 LU o más por encima del resto mientras
habla (el narrador del cartel incluido). Mezcla final -16 LUFS con pico -4,3 dBFS (el paso 10 la lleva a -14).
