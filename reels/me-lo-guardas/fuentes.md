# me-lo-guardas · fuentes

Sin datos ni afirmaciones de hechos para verificar: es una situación inventada (el estante de "guardados" del almacén
de Rubén que nadie viene a buscar). El contador "Guardados: 3 → 11 → 27 → 28" y "3 · con seña", los papelitos, los
días ("UN MES DESPUÉS") y el "hasta el viernes" son parte del chiste, no estadísticas. Celular, chat, link de pago,
bolsas, yerba, dulce de leche, queso, pan, mate y termo genéricos, sin marcas: no se nombra ni se dibuja ninguna app
de mensajería ni de pagos (el chat es navy/crema/verde, el botón dice "Pagar seña").

Lo que hace el agente de IA en la parte 2 (atender por WhatsApp, reservar, mandar un link de pago para la seña, avisar
hasta cuándo se guarda y liberar la reserva si vence) está dentro de lo que vende Scalerics (ver CLAUDE.md, "Lo que se
vende": agentes de IA que toman pedidos y reservas y hacen el seguimiento del cliente).

## Voces (Gemini TTS)
- Rubén: Algenib ("Ya viene, Graciela." y "Ya vino, Graciela."), en partes/ruben-1.txt y partes/ruben-2.txt.
- Narrador del cartel: Rasalgethi ("Un agente de IA más tarde."): se reusa tal cual
  reels/abren-hoy-completo/assets/voice/narrador.wav (misma frase; registrado en reels/abren-hoy-completo/fuentes.md).
- Graciela y Walter: sin voz, solo burbujas.

## Sonido
Todo con grabaciones reales que ya están en el repo con su licencia registrada (la descarga de freesound está
bloqueada en la nube); nada sintetizado con ffmpeg, sin golpe.mp3 (sin licencia registrada). Créditos completos en
reels/abren-hoy/fuentes.md, reels/abren-hoy-2/fuentes.md, reels/abren-hoy-completo/fuentes.md,
reels/las-siete-y-cincuenta-y-nueve/fuentes.md y reels/que-en-paz-descanse/fuentes.md. Archivos en
reels/que-en-paz-descanse/assets/sfx y assets/bgm:
- Ambiente: `calle.wav` (Oper8, CC0) con pasabajos a 1800 Hz (se oye desde adentro del almacén).
- Música: "Pizzicato Intrigue" (younoise, CC0), `bgm/pizzicato.wav`; se corta seca antes de "Ya viene, Graciela." y
  vuelve en la parte 2 (no se corta; baja 9 dB mientras habla Rubén).
- Campanita de la puerta (entra Graciela, entra y sale Walter): `campanita.wav` (775noise, CC0).
- Burbujas de chat y de diálogo: `burbuja.mp3` (Mafon2, CC0); mensaje que llega: `notification.mp3` (banco de
  HyperFrames); respuesta del agente: `respuesta.wav` ("Message sound.wav", Sunart1,
  https://freesound.org/people/Sunart1/sounds/592772/, registrado en reels/abren-hoy-2/fuentes.md).
- Bolsas y cosas que caen en el estante: `pop.mp3` (HyperFrames) y `sello.wav` (kermite607, CC0) bajo para el apoyo.
- Birome y papelito: `papel.wav` ("Paper slide", Kingofgamers_cz, CC0).
- Contador: `key-press.mp3` (HyperFrames); pill de días: `tic-real.mp3` (olver, CC0); el mes que pasa: ráfaga de
  `tic-real.mp3`/`tac-real.mp3` acelerando (recortes de "Clock ticking", olver, CC0). NO usar `tictac.wav`: no
  figura en ningún fuentes.md.
- Pasos: `tac-real.mp3` / `tic-real.mp3` (olver, CC0).
- Sorbo de mate: `sorbo.wav` (Abir19, CC0).
- Vibración del celular: `vibra.wav` (SpliceSound, CC0).
- Tuba del "Guardados: 28": `tuba.mp3` (nomiqbomi, CC0).
- Ding del "3 · con seña" y de "Seña paga ✓": `cero.mp3` (GabFitzgerald, CC0).
- Tap en "Pagar seña": `click-soft.mp3` (HyperFrames).
- Cartel: `stinger.wav` (DanJFilms, CC0), `whoosh.mp3` (HyperFrames; la zambullida, el mismo archivo más lento).
- Guiño final: `chime.mp3` (HyperFrames).

Son los únicos archivos en assets/sfx y assets/bgm (se borraron tictac.wav, impact-bass-1.mp3, puerta.wav y whoosh-short.mp3 (duplicado de whoosh.mp3), que no se
usan). Los toma gen.mjs (lista SONIDO).
