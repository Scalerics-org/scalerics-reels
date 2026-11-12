# anotamelo · fuentes

Ficción: sin datos ni afirmaciones de hechos para verificar. Es una situación inventada (la libreta del fiado del
almacén de Rubén). Los montos ("$ 320", "1.840", "$ 1.260", "$ 200"), los días del almanaque (1, 8, 15, 22, 30) y lo
que dice la libreta, el antebrazo y la pelada son parte del chiste, no estadísticas. El reel no dice nada sobre
cuántos comercios fían ni desde cuándo.

Contexto (no se cita en el reel; solo para confirmar que la situación es reconocible y no un invento): la "libreta del
fiado" es una práctica de almacén de barrio en el Río de la Plata, con la deuda anotada en una libreta y cobrada a fin
de quincena o de mes, ofrecida a clientes habituales.
- Elonce (Entre Ríos, Argentina), almacén de ramos generales donde la libreta de fiado sobrevive por la confianza con
  los clientes de toda la vida: https://www.elonce.com/uid-762181
- Canal 12 Misiones, el fiado se limita a clientes habituales del barrio: https://www.canal12misiones.com/?p=671662
- El Heraldo (Colombia), la deuda anotada en libreta o cartón y cotejada a fin de quincena o de mes:
  https://www.elheraldo.co/economia/2017/08/22/los-creditos-del-carton-a-la-letra-de-cambio-394901/
(No se encontró una nota uruguaya específica en la búsqueda del 12-11; por eso el reel no afirma nada sobre Uruguay ni
da cifras.)

Lo que hace el sistema en la parte 2 (cada cliente con su cuenta, lo que se lleva queda anotado, a fin de mes el aviso
automático al celular con el saldo y un botón para pagar, el dueño ve quién pagó) está dentro de lo que vende
Scalerics (CLAUDE.md, "Lo que se vende": sistemas a medida y automatizaciones, "recordar turnos y pagos"). A confirmar
con Juan: el botón "Pagar" del aviso supone un link de pago; se muestra genérico, sin logo de ningún medio de pago.

Sin marcas: tablet, celular, diario (sin cabezal real, solo "CRUCIGRAMA"), dulce de leche, yerba, galletitas, fideos,
azúcar, mate, termo, lápiz y sacapuntas genéricos; los billetes son el billete genérico de me-haces-precio.

## Voces (Gemini TTS, herramientas/voz.mjs; ver partes/voces.md)
- Graciela: Gacrux · Héctor: Sadaltager · Walter: Umbriel · Marta: Aoede · Rubén: Algenib · narrador del cartel:
  Rasalgethi. Tomas elegidas (12-11, en partes/tomas → partes/rec → assets/voice): g1 = 01-graciela-c (atempo 1,08; se reusa en Q1) · h1 = 02-hector-b · w1 = 03-walter-a (-2 dB) · m1 = 04-marta-b (atempo 1,12) · h2 = 05-hector-a · w2 = 06-walter-b (atempo 1,1) · g2 = 07-graciela-b (pausas internas acortadas a ~0,13 y ~0,2 s, atempo 1,08) · r1 = 08-ruben-a · h3 = 09-hector-a · narrador = 10-narrador-a · r2 = 11-ruben-a · h4 = 12-hector-c (atempo 1,1). Todas verificadas con tiempos.mjs ("oyó" coincide con el guion).

## Sonido
Nada sintetizado con ffmpeg. Del repo (créditos en los fuentes.md de reels/hacen-envios, reels/me-haces-precio y
anteriores): música `bgm/pizzicato.wav` ("Pizzicato Intrigue", younoise, CC0), ambiente `sfx/calle.wav` (Oper8, CC0),
`campanita.wav` (775noise, CC0), `papel.wav` ("Paper slide", Kingofgamers_cz, CC0), `tic-real.mp3`, `vibra.wav`,
`notification.mp3`, `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`, `ding.mp3`, `cero.mp3`,
`stinger.wav`, `paso-0..4.wav` (Kenney, Impact Sounds, CC0), `puerta-abre.wav` (Kenney, RPG Audio, CC0),
`zumbido.wav` (la heladera: "Room Tone Ambience Medium Control Low Hum", gchase, Freesound 144046, CC0 1.0).

Nuevos, bajados el 12-11 (freesound.org está bloqueado desde la nube; espejos en GitHub que conservan la licencia):
- Kenney, pack "RPG Audio" (https://kenney.nl/assets/rpg-audio), CC0 1.0. Espejo:
  https://github.com/Boyquotes/kenney-rpg-audio-for-godot (pasados de .ogg a .wav):
  `k-book_flip_1/2/3.wav` (hojas de la libreta y del almanaque que se arrancan), `k-book_close.wav` (la tapa que
  cierra), `k-book_place_1/2.wav` (la libreta gorda; la libreta que se jubila en el estante), `k-cloth_1/2.wav` (roce
  de la manga: la mano a la oreja, el antebrazo que se da vuelta, agacharse), `k-knife_slice.wav` y
  `k-knife_slice_2.wav` (el sacapuntas: **no se encontró un sacapuntas CC0 real accesible desde la nube**; se usa el
  roce corto de una hoja de metal sobre madera, filtrado, como pide el plan), `k-page-turn.wav` ("Page turn",
  Kenney, vía el pack "Everyday objects" de https://github.com/Asion001/mangarr-sounds, CC0 1.0).
- `reloj.wav` (el tic del reloj en la quietud): "Clock ticking", Mortifreshman, Freesound
  (https://freesound.org/people/Mortifreshman/sounds/237210/), CC0 1.0. Espejo: release "mangarr-objects" de
  https://github.com/Asion001/mangarr-sounds (licencia verificada por el autor del espejo, ver su CREDITS.md).
- **Lápiz escribiendo: no hay un CC0 real accesible**; se usan recortes cortos y filtrados de `papel.wav` (papel
  real). El sorbo de mate se sacó (Rubén sostiene el mate en Q4, no toma: nada cerca de la cara).
