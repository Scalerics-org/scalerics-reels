# mesa-doce · fuentes

No hay datos ni cifras de afuera: la historia (Rubén, 90 visitas, la pizzería de enfrente) es inventada y se cuenta
como caso. Lo que hace el producto (sumar con QR, tarjeta en el celular, premio, regalo de cumpleaños, panel con
quién viene y cada cuánto, regalo guardado al que dejó de venir) es lo que vende Scalerics Puntos según el CLAUDE.md
del repo ("El guion"). Sin marcas reales: "Pizzería Tito" y "La Nueva" son inventadas.

## Voces (Gemini TTS, `partes/voces.sh`)
- Rubén: Algenib (su voz de siempre). Tito, el dueño: Iapetus. Cierre: Orus.
- `partes/prep.sh`: silencios de punta afuera, pausas internas acortadas a 0,2 s, tempo 1,1 en Rubén (1,03 en r07).
  La voz lee "muza" (así se pronuncia); el subtítulo dice "muzza".

## Sonido
- Ambiente de pizzería (`sfx/restaurante.mp3`, desde 4 s): "Dinner Atmo.wav", burkay, CC0 1.0.
  https://freesound.org/people/burkay/sounds/325558/
- Fuego del horno (`sfx/fuego.mp3`): TheWoodlandNomad, CC0 1.0. https://freesound.org/people/TheWoodlandNomad/sounds/363092/
- Toby roncando (`sfx/perro.mp3`, tramo 0,7-2,1 s): "ANIMAL_PUG_DOG_SLEEP_SNORE...", samueljustice00, CC0 1.0.
  https://freesound.org/people/samueljustice00/sounds/156597/
- Ambiente de calle en la vidriera (`sfx/calle.wav`, con pasabajos): "Small quiet street ambience", Oper8, CC0.
  https://freesound.org/people/Oper8/sounds/241135/
- Música (`bgm/pizzicato.wav`): "Pizzicato Intrigue.wav", younoise. https://freesound.org/people/younoise/sounds/569642/
- Campanita del regalo (`sfx/campanita.wav`): "Shop door bell.wav", 775noise, CC0. https://freesound.org/people/775noise/sounds/494565/
- Rebobinado: `whoosh-cine-corto.mp3` al revés (recorte real de `whoosh-cinematic.mp3`, ver reels/caso-tu-nombre) y
  `tic-real.mp3` ("Clock ticking", olver, CC0).
- Trapo sobre la mesa (`k-cloth_1/2.wav`), pasos de Tito (`paso-*.wav`), el plato (`k-plato-001.wav`): Kenney, CC0 1.0
  (ver reels/anotamelo y reels/como-viene-el-mes).
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`, `key-press.mp3`, `sparkle.mp3`, `scan.mp3`:
  la biblioteca de HyperFrames del repo (los mismos de reels/caso-pedidosya y reels/anotamelo).
- Ding de "te faltan 2" (`cero.mp3`): "[UI Sound] Approval - High Pitched Bell Synth", GabFitzgerald, CC0 1.0. https://freesound.org/people/GabFitzgerald/sounds/625174/
- Nada sintetizado con ffmpeg.
