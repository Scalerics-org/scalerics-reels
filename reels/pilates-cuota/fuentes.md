# pilates-cuota · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Ceci,
Alicia, Joaco; Flor y Gabi solo como nombres en pantalla; Sofi del elenco). **Sin datos de afuera: no afirma
estadísticas, años, normas ni empresas reales. Montos y fechas son del caso.**

Números del caso (no son promedios ni datos de mercado):
- "Estudio Ceci" tiene 40 alumnas y la cuota de marzo es **$ 3.000** (inventada, verosímil para un estudio de
  Montevideo; no se presenta como precio de referencia).
- Parte 1: el día 10 pagaron 23 de 40 → 17 cuotas sin cobrar = 17 × $ 3.000 = **$ 51.000**; Ceci manda 17 mensajes de
  cobro ("Enviados: 17"); la transferencia de Alicia del 2 de marzo fue a "CECILIA · PELUQUERÍA" (ficción).
- Parte 2: la cuota sale sola el día 1; Alicia paga el 1 a las 7:02; del día 1 al 4 pagan 34; el día 5 sale el
  recordatorio automático a las 6 que faltan; pagan 39 → **$ 117.000** (39 × $ 3.000); con el pago de Flor, 40 de 40 →
  **$ 120.000**; Gabi "3 semanas sin venir", aviso enviado, "vuelve el jueves" (ficción).

## Lo que se buscó y por qué el guion no lo dice
Se buscó (WebSearch, 17-11) el precio de la cuota mensual de pilates reformer en Montevideo: no apareció ninguna lista
de precios de estudios montevideanos que sirviera de fuente (solo resultados de otros países y una formación docente).
**Decisión:** el monto queda como dato del caso ("Estudio Ceci"), sin presentarlo como precio de mercado, y el guion no
dice cuánto cuesta el pilates "en general".

Sin marcas: reformers sin logo, banco genérico (comprobante y home banking sin nombre ni logo), botón de pago genérico
("Pagar con tarjeta o débito", sin procesadora ni logos de tarjetas), chat genérico (la palabra "WhatsApp" solo en
texto, sin su verde ni su logo). La peluquería nunca se muestra: solo el texto del comprobante.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Ceci = Vindemiatrix, Alicia = Laomedeia, Joaco = Zubenelgenubi, Sofi = Achernar,
narrador del cartel = Rasalgethi (toma nueva: "Un cobro automático más tarde.").

## Música y efectos
Los de siempre del repo (con su crédito en `reels/taller-presupuestos/fuentes.md`, `reels/veterinaria-vacunas/fuentes.md`,
`reels/estetica-turnos/fuentes.md` y `reels/ya-lo-cargo/fuentes.md`). Sonidos que probablemente haya que sumar (el
constructor los busca primero en `assets/sfx` de otros reels; si no están, uno real con licencia CC0 y anota acá autor,
sitio y licencia): **carro del reformer rodando y clac de resortes**, **marcador en pizarra**, **vibración de
celular**, **interruptor de luz**, **teclado de laptop**, **puerta/pasos**. Nada sintetizado con ffmpeg.

## Sonidos usados (todos grabaciones reales del repo, nada sintetizado)
- Música: `assets/bgm/musica.wav` = "Ukulele", Astounded, Freesound (https://freesound.org/people/Astounded/sounds/484844/), como en `reels/trabajar-con-scalerics/fuentes.md`.
- `vibra.wav`: "Cell phone vibrate, on table hard surface.wav", SpliceSound, Freesound (https://freesound.org/people/SpliceSound/sounds/369839/), CC0 1.0.
- `paso-0..4.wav`: "footstep_concrete_000..004", Kenney, "Impact Sounds" (https://kenney.nl/assets/impact-sounds), CC0 1.0.
- Carro del reformer: `k-creak.wav` ("creak_2", Kenney, "RPG Audio", CC0 1.0) lento y con pasabajos; clac de los resortes: `k-metal-click.wav` (Kenney, CC0 1.0).
- Marcador en la pizarra y subrayado: `k-page-turn.wav` (Kenney, CC0 1.0) acelerado y con pasaaltos (roce corto). No había una grabación CC0 de marcador.
- `interruptor.wav` ("switch_002", Kenney, CC0 1.0), `k-cloth_1/2.wav`, `k-tick-1/2/4.wav` (Kenney, CC0 1.0), `tipeo.mp3` ("Typing on an iPhone.mp3", Caitlin_100, Freesound, CC0: https://freesound.org/people/Caitlin_100/sounds/365543/).
- De la biblioteca de HyperFrames del repo: pop, whoosh, whoosh-short, notification, cero, click-soft, key-press, stinger, zumbido-largo (ver `reels/veterinaria-vacunas/fuentes.md`).
- Sin risita de alumna ni inhalación aparte: no hay grabación CC0 en el repo (la respiración es la de la toma de Ceci).
