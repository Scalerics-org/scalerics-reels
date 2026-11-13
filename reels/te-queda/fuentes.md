# te-queda · fuentes

Ficción: sin datos ni afirmaciones de hechos para verificar. Situación inventada (Rubén baja al sótano del almacén a
fijarse si queda algo). Los números de la tablet ("Polenta · 3", "Dulce de leche · 12", "Yerba · quedan 2", "Llega el
jueves") y el chip "Viajes al depósito" son parte del chiste, no estadísticas.

Lo que hace el sistema en la parte 2 (cada venta descuenta del stock, se ve qué queda sin ir a mirar, aviso cuando algo
queda poco y el pedido queda armado) está dentro de lo que vende Scalerics (CLAUDE.md, "Lo que se vende": sistemas a medida
con stock, pedidos y proveedores; automatizaciones). (ronda 1) La tablet dice solo "Pedido armado ✓": no se promete integración con proveedores ni fecha de entrega.

Sin marcas: polenta, fideos, azúcar, dulce de leche y yerba en cajas kraft escritas a mano; el frasco de dulce de leche
casero sin etiqueta de marca; tablet, casco de obra, linterna, mate y termo genéricos.

## Voces
Gemini TTS (herramientas/voz.mjs), ver `partes/voces.md`. Rubén Algenib · Graciela Gacrux · Héctor Sadaltager · Walter
Umbriel · Marta Aoede · narrador del cartel Rasalgethi (toma de reels/anotamelo).

## Sonido
Nada sintetizado con ffmpeg. Del repo, con su crédito (copiado de los fuentes.md de anotamelo, hacen-envios,
como-viene-el-mes, trabajar-con-scalerics y me-lo-guardas):
- Música `bgm/pizzicato.wav`: "Pizzicato Intrigue", younoise, CC0. Ambiente `sfx/calle.wav`: Oper8, CC0.
- `campanita.wav`: 775noise, CC0. `stinger.wav` (el "ta-dá" del frasco y el cartel): "Vibraphone Transition Music Cue",
  DanJFilms, Freesound, CC0 1.0. `vibra.wav`: SpliceSound, Freesound, CC0 1.0. `cero.mp3` (el ✓ del pedido):
  GabFitzgerald, Freesound, CC0 1.0. `zumbido.wav` (heladera y zumbido del foco): gchase, Freesound, CC0 1.0.
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`, `notification.mp3`, `chime.mp3`: biblioteca de sonidos
  de HyperFrames (la del molde).
- `paso-0..4.wav`: "footstep_concrete_000..004", Kenney, "Impact Sounds" (https://kenney.nl/assets/impact-sounds), CC0.
  `puerta-abre.wav`: "door_open_1", Kenney, "RPG Audio", CC0. `k-cloth_1/2.wav`: Kenney, "RPG Audio", CC0.
- `madera-golpe.wav` ("impact_wood_heavy_000", la tapa de la trampa contra la pared), `madera-tabla.wav`
  ("impact_plank_medium_001", el mate en el mostrador): Kenney, "Impact Sounds", CC0. `cruje.wav` ("creak_1", la tijera que
  se tambalea), `k-creak.wav` ("creak_2", la bisagra de la trampa, la tijera), `k-metal-click.wav` ("metal_click", la
  argolla y la cadenita): Kenney, "RPG Audio", CC0. `interruptor.wav` / `interruptor2.wav` ("switch_002"/"switch_005", el
  foco y la linterna): Kenney, "Interface Sounds" (https://kenney.nl/assets/interface-sounds), CC0.
- `sorbo.wav`: Abir19, Freesound, CC0 (copiado, no se usa: Rubén levanta el mate sin tomar; suena el roce de la manga `k-cloth_2`).

Nuevos, 13-11 (freesound bloqueado desde la nube): Kenney, "Impact Sounds" (https://kenney.nl/assets/impact-sounds), CC0
1.0, espejo https://github.com/Boyquotes/kenney-impact-sounds-for-godot (pasados de .ogg a .wav):
`k-footstep_wood_000..003.wav` (la escalera marinera de madera), `k-impact_soft_heavy_000..002.wav` (cajas de cartón que
caen: avalancha, crash, la caja en la cabeza), `k-impact_soft_medium_000..002.wav` (la caja vacía que se sacude, cartón
hueco), `k-impact_glass_light_000.wav` (el foco que se quema), `k-impact_wood_heavy_002.wav` (el golpe grande de la
avalancha y del crash), `k-impact_plank_medium_002.wav` (el casco calzado), `k-impact_wood_light_000.wav` (copiado, no se
usa).
- (ronda 1) Héctor ya no silba: espera mirando el techo con la boca cerrada (no había silbido CC0 real accesible).
