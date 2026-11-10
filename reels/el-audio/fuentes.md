# el-audio · fuentes

Sin datos ni afirmaciones de hechos para verificar: es una situación inventada (el audio de WhatsApp de 4:12 para
preguntar a cuánto está la polenta). Las duraciones (4:12, 0:01, 6:47), el "2x", el reloj (10:15 → 10:19), el precio
"$ 90" y las fichas de temas ("el sobrino", "el perro", "la vecina del 3", "la Nelly (o la Beba)") son parte del chiste,
no estadísticas. Celular, chat, polenta, yerba, mate y termos genéricos, sin marcas: no se nombra ni se dibuja ninguna
app de mensajería (el chat es navy/crema/verde, sin logo).

Lo que hace el agente de IA en la parte 2 (escuchar los audios del cliente, entender la pregunta y contestar al
instante con precios y stock, separar el producto) está dentro de lo que vende Scalerics (ver CLAUDE.md, "Lo que se
vende": agentes de IA que atienden por WhatsApp con tus precios, stock y horarios y toman pedidos).

## Voces (Gemini TTS, herramientas/voz.mjs; tomas en partes/tomas, recortes en partes/rec)
- Graciela: Gacrux (tomas graciela-1-c, 2-a, 3-a, 4-a, 5-b, 6-a). Se probaron también Sulafat y Aoede para el arranque
  (graciela-1-sa, graciela-1-oa); se eligió Gacrux por ser la voz de Graciela en reels/el-reencuentro y por tono medio
  más alto y ritmo más rápido en la toma c (más charlatana).
  - g1-g5 (audio de WhatsApp): silencios recortados, atempo 1,1 (g1-g3), 2,3 (g4, el "2x", que se tiene que notar) y 1,3 (g5, para que
    "¿A cuánto está la polenta?" se entienda), filtro de celular (highpass 300-320 Hz, lowpass 3,3-3,4 kHz,
    compresor). g1 se corta después de "sobrino", g2 después de "divino" (saltos del audio).
  - g6 (en persona, parte 2): sin filtro.
- Rubén: Algenib ("Noventa." toma ruben-1-a; "Contame." toma ruben-2-a).
- Narrador del cartel: Rasalgethi ("Un agente de IA más tarde."): reels/abren-hoy-completo/assets/voice/narrador.wav
  tal cual (registrado en reels/abren-hoy-completo/fuentes.md).

## Sonido
Todo con grabaciones reales que ya están en el repo con su licencia registrada; nada sintetizado con ffmpeg, sin
golpe.mp3 ni tictac.wav. Archivos copiados de reels/me-lo-guardas/assets/sfx y assets/bgm (créditos completos en
reels/me-lo-guardas/fuentes.md, reels/abren-hoy/fuentes.md, reels/abren-hoy-2/fuentes.md,
reels/abren-hoy-completo/fuentes.md y reels/que-en-paz-descanse/fuentes.md):
- Ambiente: `calle.wav` (Oper8, CC0) con pasabajos a 1800 Hz.
- Música: "Pizzicato Intrigue" (younoise, CC0), `bgm/pizzicato.wav`; parte 1 debajo del audio de Graciela, se corta
  seca en P5 antes de "Noventa."; parte 2 sin cortes, baja 9 dB mientras hablan Graciela y Rubén.
- Play, 2x, botón del micrófono: `click-soft.mp3` (HyperFrames).
- Fichas de temas, 0:01, el audio que llega, la etiqueta "Graciela": `pop.mp3` (HyperFrames).
- Contador: `key-press.mp3` (HyperFrames). Agujas del reloj del time-lapse y la luz que vuelve: `tic-real.mp3` /
  `tac-real.mp3` (olver, CC0). Pasos de Graciela: `tac-real.mp3`.
- La luz que vuelve de golpe: `whoosh.mp3` al revés (HyperFrames); planos y push-in: `whoosh.mp3`.
- Audio enviado y burbujas: `burbuja.mp3` (Mafon2, CC0). Audio de 6:47 que llega: `notification.mp3` (HyperFrames).
- Tuba del 6:47: `tuba.mp3` (nomiqbomi, CC0). Segundo termo que se apoya: `sello.wav` (kermite607, CC0).
- Sorbos: `sorbo.wav` (Abir19, CC0). Campanita de la puerta: `campanita.wav` (775noise, CC0).
- "Audio escuchado": `cero.mp3` (GabFitzgerald, CC0). Respuestas del agente: `respuesta.wav` (Sunart1, registrado en
  reels/abren-hoy-2/fuentes.md). Vibración: `vibra.wav` (SpliceSound, CC0).
- "Graciela está grabando un audio…": `ping.mp3` (banco de HyperFrames, copiado de reels/a-que-hora-abren).
- El agente que escribe (tecleo suave en Q1/Q1b): `tipeo.mp3` ("Typing on an iPhone.mp3", Caitlin_100, CC0,
  https://freesound.org/people/Caitlin_100/sounds/365543/; registrado en reels/abren-hoy/fuentes.md).
- Sin sonido de agua: no hay ninguno real registrado en el repo (se buscó en todos los assets/sfx), y en la versión
  final Rubén no ceba en cuadro (le alcanza el mate ya cebado).
- Cartel: `stinger.wav` (DanJFilms, CC0) y `whoosh.mp3`.
Sin ladrido (no hay uno registrado): "el perro" va solo como ficha.
