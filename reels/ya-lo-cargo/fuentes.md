# ya-lo-cargo · fuentes

Ficción: **sin afirmaciones de hecho** para verificar. Es una situación inventada (el vendedor de la distribuidora de
Rubén que toma pedidos y no los carga). Los pedidos ("40 harina · lunes", "2 azúcar", "agua con gas x6", el audio de
1:47), el "100 %" del celular, "Compra cada 15 días" y "Último: aceite, hace 2 semanas" son parte del chiste, no
estadísticas. El reel no dice nada sobre cuántos pedidos se pierden ni cuánto cuesta.

Lo que hace el sistema en la parte 2 (el vendedor carga el pedido en el celular, el pedido entra a la lista del depósito
para armarlo y a la ficha del cliente con su historial) está dentro de lo que vende Scalerics (CLAUDE.md, "Lo que se
vende": sistemas a medida, "stock, pedidos, proveedores"; CRM, "qué te compraron… en un solo lugar").

Sin marcas: chat genérico (burbujas crema y verdes, sin logo ni colores de ninguna app de mensajería), celular, monitor
y teléfono de escritorio sin logo, autoelevador, zorra, camión y auto genéricos sin marca, harina en bolsa lisa "HARINA
000", cajas kraft. Los comercios (rotisería, cafetería, bar, kiosco) llevan solo el rubro pintado.

## Voces (Gemini TTS, herramientas/voz.mjs; ver partes/voces.md)
- Nico: Fenrir (primera vez con voz para ELENCO.empleado) · Rubén: Algenib · Graciela: Gacrux · Marta: Aoede · narrador
  del cartel: Rasalgethi, reusando `reels/anotamelo/assets/voice/narrador.wav` ("Un sistema más tarde.").

## Sonido usado
Nada sintetizado con ffmpeg (los filtros de teléfono y de voz ahogada sobre las voces sí van: son procesamiento de
voz, no sonidos inventados).

Reusados del repo, con el crédito que ya tienen en otros fuentes.md:
- Música `bgm/pizzicato.wav`: "Pizzicato Intrigue", younoise, CC0 (anotamelo).
- `stinger.wav`: "Vibraphone Transition Music Cue", DanJFilms, Freesound, CC0 1.0 (primeros 2,2 s) (abren-hoy-completo).
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`, `ding.mp3`, `notification.mp3`, `key-press.mp3`: la
  biblioteca de sonidos de HyperFrames del molde.
- `calle.wav`: ambiente de calle, Oper8, CC0 (anotamelo, hacen-envios).
- `zumbido.wav` (luminarias del depósito): "Room Tone Ambience Medium Control Low Hum", gchase, Freesound, CC0 1.0
  (anotamelo).
- `campanita.wav` (puerta de la rotisería): 775noise, CC0 (anotamelo).
- `paso-0..4.wav`: "footstep_concrete_000..004", Kenney, "Impact Sounds", CC0 1.0 (anotamelo).
- `vibra.wav` (el teléfono que vibra): "Cell phone vibrate, on table hard surface.wav", SpliceSound, Freesound, CC0 1.0
  (anotamelo).
- `madera-golpe.wav`, `cruje.wav` (mate en la baranda, pallet): de reels/hacen-envios (crédito en su fuentes.md).
- `motor.mp3` (el auto de Nico): "Car engine Start Up 02", looneybits, OpenGameArt, CC0 1.0 (por-que-las-tarjetas).
- `cero.mp3` (el tilde del pallet y del remito en la parte 2): "[UI Sound] Approval - High Pitched Bell Synth",
  GabFitzgerald, Freesound, CC0 1.0 (anotamelo).

Nuevos en este reel (reales, CC0 1.0), todos de Kenney (https://kenney.nl), bajados del espejo
https://github.com/Daarko/sparkstream-sounds (convierte a .wav los packs originales de kenney.nl y guarda la licencia de
cada pack en `credits/`; freesound.org, opengameart.org y kenney.nl no responden desde la nube):
- `k-tono.wav` (el bip de marcha atrás del autoelevador, repetido; un poco más grave con asetrate): "tone1", pack
  "Digital Audio" (https://kenney.nl/assets/digital-audio), CC0 1.0.
- `k-dos-tonos.wav` (el teléfono de escritorio que suena, dos veces, con pasaaltos): "twoTone1", pack "Digital Audio", CC0 1.0.
- `k-metal-pesado-0.wav`, `k-metal-pesado-2.wav` (las dos hojas de la puerta del camión que se cierran):
  "impactMetal_heavy_000/002", pack "Impact Sounds" (https://kenney.nl/assets/impact-sounds), CC0 1.0.
- `k-metal-medio-1.wav`, `k-metal-medio-3.wav` (las dos palmadas en la chapa): "impactMetal_medium_001/003", "Impact
  Sounds", CC0 1.0.
- `k-metal-liviano-2.wav` (la puerta del auto que se cierra): "impactMetal_light_002", "Impact Sounds", CC0 1.0.
- `k-chapa-pesada.wav` (el auto que apoya en el piso de la caja): "impactPlate_heavy_000", "Impact Sounds", CC0 1.0.
- `k-neumatico-abre.wav` (el hidráulico de las horquillas y la ventanilla eléctrica, con pasabajos y más lento):
  "doorOpen_000", pack "Sci-Fi Sounds" (https://kenney.nl/assets/sci-fi-sounds), CC0 1.0.
- `k-motor-bajo.wav` (el zumbido del motor eléctrico del autoelevador, con pasabajos): "spaceEngineLow_000", "Sci-Fi
  Sounds", CC0 1.0.
- De reels/como-viene-el-mes (Kenney, CC0, crédito en su fuentes.md): `k-plastico.wav` (globos que se inflan, se aplastan
  y entran apretados; más lento = más grave), `k-creak.wav` (el freno corto del auto en cada parada, más rápido),
  `k-metal-click.wav` (la manija de la puerta del auto).
- `motor.mp3` también para el camión (más grave, asetrate 0,72) y el auto marcha atrás.

No se consiguieron reales y se resolvieron con lo que había (nada sintetizado): motor de camión diésel (el arranque del
auto más grave), ring de celular adentro del camión (`vibra.wav` con pasabajos), goma de globo (`k-plastico.wav`).

Créditos que faltaban (mismos archivos que en otros reels del repo):
- `k-cloth_1.wav`, `k-cloth_2.wav`: Kenney (kenney.nl), "RPG Audio", CC0 1.0 (como en como-viene-el-mes).
- `madera-tabla.wav`: Kenney (kenney.nl), "Impact Sounds", CC0 1.0 (como en hacen-envios).
- `puerta-abre.wav`: "door_open_1", Kenney, "RPG Audio", CC0 1.0 (como en anotamelo y hacen-envios).
- `pop`, `whoosh`, `ding` y demás sin prefijo `k-`: biblioteca de sonidos que trae el repo (`assets/sfx` de los reels anteriores).
