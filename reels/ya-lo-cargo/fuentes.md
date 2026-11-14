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

## Sonido planeado (a confirmar por el constructor; completar autor, sitio y licencia de cada uno nuevo)
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

A buscar, reales y CC0 (Kenney, OpenGameArt o espejos de GitHub que conserven la licencia; freesound.org está bloqueado
desde la nube). Si alguno no aparece, se saca del plan y se anota acá:
- Bip de marcha atrás de autoelevador (la pausa y el remate final).
- Hidráulico de las horquillas subiendo/bajando; motor eléctrico del autoelevador.
- Motor de camión que arranca y se aleja.
- Puerta de auto que se abre y cierra; ventanilla eléctrica.
- Ring de teléfono de escritorio (y ring de celular para el remate del remate, filtrado).
- Palmada en chapa / portazo metálico de puerta trasera de camión.
- Goma de globo que se infla y se aplasta (chirrido).
- Bolsa de harina que cae sobre madera.
