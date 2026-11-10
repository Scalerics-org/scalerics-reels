# me-haces-precio · fuentes

Ficción: sin datos ni afirmaciones de hechos para verificar. Es una situación inventada (un cliente que regatea por
deporte un pote de dulce de leche de $ 200, lo baja a $ 195 y deja los 5 de vuelto). Los precios ($ 200, 180, 190,
195), los puntos (180 / 200, +20, premio a los 200), "5 veces esta semana" y los personajes (Héctor, nuevo; Rubén y
Graciela, del módulo de personajes) son parte del chiste, no estadísticas. No se dice ninguna proporción de puntos ni
cuánto cuesta el servicio.

Sin marcas: dulce de leche, monedas, billete, monedero, celular, tablet, mate y termo genéricos. El billete de 200 no
copia el diseño de ningún billete real (papel crema con guarda verde y "200"); las monedas son discos dorados lisos con
un "5". La tarjeta de puntos del celular dice "Mis puntos · Almacén de Rubén" (almacén inventado), sin logo ni la
palabra Scalerics. Lo que hace la tarjeta en la parte 2 (sumar con cada compra, la tarjeta en el celular, canjear un
premio, el dueño que ve quién viene y cada cuánto) está dentro de lo que vende Scalerics Puntos (ver CLAUDE.md, "Lo
que se vende").

## Voces (Gemini TTS, herramientas/voz.mjs; plan en partes/voces.md)
- Héctor: Sadaltager (alternativas a probar: Achird, Umbriel).
- Rubén: Algenib. Graciela: Gacrux.
- Narrador del cartel: Rasalgethi, frase nueva "Unos puntos más tarde." (no se reusa el cartel.wav de
  abren-hoy-completo, que dice otra cosa).

## Sonido planeado
Todo con grabaciones reales que ya están en el repo con su licencia registrada; nada sintetizado con ffmpeg, sin
golpe.mp3 ni tictac.wav. Copiados a `assets/sfx` y `assets/bgm` desde reels/el-audio (créditos completos en
reels/el-audio/fuentes.md, reels/me-lo-guardas/fuentes.md, reels/abren-hoy/fuentes.md, reels/abren-hoy-2/fuentes.md,
reels/abren-hoy-completo/fuentes.md y reels/que-en-paz-descanse/fuentes.md). **tuba.mp3 se sacó a propósito** (el
remate del remate de esta noche no es contador + tuba).
- Música: "Pizzicato Intrigue" (younoise, CC0), `bgm/pizzicato.wav`; parte 1 se corta seca en 10,5 s antes de
  "Dejá. Quedate con el vuelto."; parte 2 sin cortes, baja ~9 dB con cada voz.
- Ambiente: `calle.wav` (Oper8, CC0) con pasabajos a 1800 Hz.
- Burbujas, números que entran, el segundo pote: `pop.mp3` (HyperFrames).
- Números que chocan y el rodillo 200 → 195: `key-press.mp3` + `whoosh.mp3` corto (HyperFrames); el número que cae:
  `sello.wav` bajito (kermite607, CC0).
- Choque de manos ("¡Hecho!"): `cachetada.mp3` ("Face slap sound effect", magicjoshua,
  https://freesound.org/people/magicjoshua/sounds/704179/, registrado en reels/abren-hoy/fuentes.md; copiado de
  reels/abren-hoy/assets/sfx).
- Frente de Rubén contra el mostrador: `sello.wav` (golpe sordo).
- Monedas que caen del monedero y la moneda de 5: `ping.mp3` cortado en golpecitos (banco de HyperFrames, como hizo
  reels/por-que-el-caramelo). Si se consigue un "coins on wooden table" real CC0 (Freesound, licencia CC0), usarlo y
  anotar acá autor, link y licencia.
- Billete que se apoya y banquito que se arrastra: `papel.wav` (registrado en reels/me-lo-guardas/fuentes.md; para el
  banquito, grave). Si se consigue un roce de banquito de madera real CC0, usarlo y anotarlo acá.
- Tapa de la latita, termo que se apoya, toques en el celular: `click-soft.mp3` (HyperFrames).
- Sorbo de mate: `sorbo.wav` (Abir19, CC0). Campanita de la puerta: `campanita.wav` (775noise, CC0). Pasos:
  `tac-real.mp3` (olver, CC0).
- Celular que vibra: `vibra.wav` (SpliceSound, CC0); tarjeta que aparece: `notification.mp3` (HyperFrames).
- Tilde del 200: `ding.mp3`; "+20 puntos": `sparkle.mp3`; lector de Rubén: `scan.mp3` (banco de HyperFrames de
  molde/netflix-blockbuster, copiados de reels/por-que-se-fue/assets/sfx). "¡Premio!" y "+20 ✓": `cero.mp3`
  (GabFitzgerald, CC0).
- Cartel: `stinger.wav` ("Vibraphone Transition Music Cue", DanJFilms, CC0) y `whoosh.mp3`.
- Línea chica: `whoosh.mp3` corto.

## Lo que se usó al construir (10-11)
- Ronda 2: sin monedas en el mostrador ni banquito arrastrado. El monedero de P3a y la moneda que sale de la latita usan
  `ping.mp3` muy bajo (techo -45/-47): en el repo no hay un sonido real de monedas con origen registrado (el `moneda.mp3` de
  cuenta-cartas/el-conde no tiene fuente) y freesound.org responde 403 desde la nube. Sin sorbo (Rubén no toma). Los codos en
  el mostrador: `tac-real.mp3`.
- Música: la parte 1 arranca en el segundo 0,52 del archivo para que el corte seco (10,10) caiga sobre una nota que suena.
- Nada sintetizado con ffmpeg. Techo por efecto entre -37 y -47 LUFS (momentáneo máximo); mezcla cruda -14,0 LUFS
  integrado, pico verdadero -2,2 dBFS, sin clipping (el loudnorm final lo hace el coordinador).
