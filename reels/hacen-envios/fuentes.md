# hacen-envios · fuentes

Ficción: sin datos ni afirmaciones de hechos para verificar. Es una situación inventada (el vecino de enfrente que le
pide envío al almacén). "14 pasos", los horarios (19:10, 19:26, 19:41), "Envío: $ 60", "Retiro en el local: $ 0" y
"a 15 / 22 cuadras" son parte del chiste, no estadísticas. Lo que hace la tienda en la parte 2 (el cliente arma el
pedido y lo paga desde el celular, elige envío con costo o retiro en el local, los envíos de lejos salen pagos) está
dentro de lo que vende Scalerics (CLAUDE.md, "Lo que se vende": tienda online).

Sin marcas: tienda genérica "Almacén de Rubén" (navy/crema/verde), botón "Pagar" sin logo de ningún medio de pago,
moto y caja de reparto sin marca, yerba, pan, hielo, fósforos, termo y mate genéricos; los billetes del cambio son el
billete genérico de me-haces-precio (crema con guarda verde y "200", sin diseño real).

## Voces (Gemini TTS, herramientas/voz.mjs; ver partes/voces.md)
- Héctor: Sadaltager ("¿Hacen envíos?" hector-1 toma a; "¡Qué cerquita que quedás, Rubén!" hector-2 toma a).
- Rubén: Algenib ("Para estar más cerca del cliente.", ruben-1, archivo de toma `ruben-2-a`, 1,77 s).
- Coro de las 7 ventanas ("¿Hacen envíos?", una toma "a" por voz): Graciela = Gacrux, Marta = Aoede,
  Walter = Umbriel, Beto (vecino) = Charon, Nelly = Vindemiatrix, Fede = Puck, Chela = Callirrhoe.
- Narrador del cartel: reusado `reels/las-siete-y-cincuenta-y-nueve/assets/voice/narrador.wav` (Rasalgethi, "Una
  tienda online más tarde.").

## Sonido
Nada sintetizado con ffmpeg. Del repo (créditos en sus fuentes.md: reels/me-haces-precio, reels/el-audio,
reels/abren-hoy, reels/abren-hoy-completo, reels/caso-pedidosya, reels/las-siete-y-cincuenta-y-nueve):
- Música `bgm/pizzicato.wav` ("Pizzicato Intrigue", younoise, CC0). Ambiente `sfx/calle.wav` (Oper8, CC0).
- `vibra.wav`, `notification.mp3`, `pop.mp3`, `burbuja.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `campanita.wav`,
  `papel.wav`, `tic-real.mp3`, `tac-real.mp3`, `cero.mp3`, `ding.mp3`, `key-press.mp3`, `click-soft.mp3`,
  `stinger.wav`, `sorbo.wav`, `sello.wav`, `sparkle.mp3`.
- `moto.mp3`: "Scooter drive by .wav", nickpursehouse, Freesound, CC0 1.0 (de reels/caso-pedidosya).

Nuevos, descargados el 11-11 (freesound.org y openverse están bloqueados desde la nube; se bajaron de espejos en
GitHub que conservan la licencia CC0 1.0 y el crédito de cada sonido):
- Pasos en la calle `sfx/paso-0..4.wav`: "footstep_concrete_000..004", Kenney, pack "Impact Sounds"
  (https://kenney.nl/assets/impact-sounds), CC0 1.0. Espejo: https://github.com/Boyquotes/kenney-impact-sounds-for-godot
- Pantuflas `sfx/pantufla-0..4.wav`: "footstep_carpet_000..004", Kenney, "Impact Sounds", CC0 1.0 (mismo espejo).
- Golpe del cajón `sfx/madera-golpe.wav`: "impact_wood_heavy_000"; termo sobre la madera `sfx/madera-tabla.wav`:
  "impact_plank_medium_001"; Kenney, "Impact Sounds", CC0 1.0 (mismo espejo).
- Crujido del cajón al sentarse `sfx/cruje.wav`: "creak_1", Kenney, pack "RPG Audio" (https://kenney.nl/assets/rpg-audio),
  CC0 1.0. Espejo: https://github.com/Boyquotes/kenney-rpg-audio-for-godot
- Puertas `sfx/puerta-abre.wav`, `sfx/puerta-cierra.wav`: "door_open_1", "door_close_1", Kenney, "RPG Audio", CC0 1.0.
- Interruptores de las ventanas y clac del farol `sfx/interruptor.wav`, `sfx/interruptor2.wav`: "switch_002",
  "switch_005", Kenney, pack "Interface Sounds" (https://kenney.nl/assets/interface-sounds), CC0 1.0. Espejo:
  https://github.com/Calinou/kenney-interface-sounds
- Pájaro `sfx/pajaro.wav`: "Bird Chirp", swiftoid, Freesound (https://freesound.org/people/swiftoid/sounds/182507/),
  CC0 1.0. Espejo: release "mangarr-nature" de https://github.com/Asion001/mangarr-sounds
  (licencias verificadas por el autor del espejo el 02-11, ver su CREDITS.md).
- Zumbido del farol `sfx/zumbido.wav` (recorte de 8 s con fundido): "Room Tone Ambience Medium Control Low Hum",
  gchase, Freesound (https://freesound.org/people/gchase/sounds/144046/), CC0 1.0. Espejo: release "mangarr-objects"
  del mismo repo.

**Perro lejano: no va.** No se encontró un ladrido real CC0 accesible desde la nube: el único ladrido real disponible
("Oculus Audio Pack 01", en github.com/facebookincubator/Meta-open-sound) es CC BY 4.0, y el "barking" del pack de
criaturas de rubberduck (OpenGameArt, CC0) es un monstruo, no un perro. El silencio de domingo queda con el pájaro, el
zumbido del farol y el ambiente bajo.
