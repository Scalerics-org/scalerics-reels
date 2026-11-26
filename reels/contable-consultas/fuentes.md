# contable-consultas · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Adriana,
Jorge, Lucas, Marcelo, Graciela, Walter, Héctor). **No afirma datos externos, estadísticas, montos de impuestos ni
fechas de vencimiento como regla general.** "El veintitrés" y "el 18" son los vencimientos de esos clientes en el caso,
no una fecha de la DGI o del BPS; ningún impuesto se nombra en la voz ni en los chats.

## Por qué la pregunta es verosímil (contexto, no se dice en el guion)
Que "¿cuándo vence lo mío?" sea una consulta de todos los meses tiene sustento: en Uruguay el calendario de
vencimientos de la DGI se publica por año, cambia de mes a mes y por tipo de obligación, y para varias obligaciones el
día depende del último dígito del RUT del contribuyente (además hay prórrogas por resolución). O sea: cada cliente
tiene su fecha y cambia. El guion NO lo explica ni da fechas reales; solo usa la pregunta.
- DGI, "Vencimientos 2026. Calendario general actualizado" (fuente oficial):
  https://www.gub.uy/direccion-general-impositiva/comunicacion/publicaciones/vencimientos-2026-calendario-general-actualizado
- DGI, "Vencimientos del mes" (comunicaciones mensuales, con las prórrogas):
  https://www.gub.uy/direccion-general-impositiva/comunicacion/noticias/vencimientos-del-mes
- Segunda fuente independiente (guía de un servicio de facturación, explica que el día varía según el dígito del RUT;
  se usa solo para el contexto, no por sus fechas): https://yo-facturo.com/blog/calendario-vencimientos-dgi-uruguay-2026/

## Números del caso (no son estadísticas ni promesas de resultado)
- Consultas de la semana: 14 → 38 → **63**, las mismas 3 preguntas. Con el agente: **61** contestadas por el agente,
  **2** para Adriana.
- Balance 2025 de Súper Héctor: **3 %** toda la parte 1; en la parte 2 llega a **100 %** el viernes.
- Marcelo (panadería): vence **el 23**, paga **$ 14.300** este mes, **14** facturas de octubre recibidas.
- Graciela (rotisería): vence **el 18**, **$ 8.900**, 9 comprobantes.
- Walter (bar): vence el 23, $ 11.200, **12** comprobantes, falta el recibo del alquiler.
- Héctor: consulta de fondo ("¿Me conviene poner el camión a nombre de la empresa?"): el agente no la contesta, se la pasa
  a Adriana. No se da ninguna respuesta tributaria.

## Lo que se dice del producto (que sea realista)
Un agente de IA de Scalerics conectado al WhatsApp del estudio y a los datos que el estudio ya tiene por cliente
(vencimiento, monto liquidado del mes, boleta o recibo generado por el estudio, comprobantes recibidos): reconoce al
cliente por su número, le contesta a cualquier hora con sus datos, le manda su boleta, le dice qué comprobantes llegaron
y cuál falta, y lo que es consulta de fondo o una decisión se lo pasa a la contadora con el resumen. Se presenta como
"Asistente del estudio". **No liquida impuestos, no presenta declaraciones ni da asesoramiento.** No se promete ningún
resultado en números fuera del caso.

## Sin marcas
"Estudio Adriana", "Panadería Marcelo", "Súper Héctor", "Rotisería Graciela", "Bar Walter" son inventados. Chat genérico
(sin el verde ni el logo de WhatsApp; la palabra solo en texto), boleta genérica, sin logos ni colores de la DGI o el
BPS. Parrilla, vino, celulares y monitores sin marca.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Adriana = Autonoe, Marcelo = Enceladus (las de contable-papeles), Graciela =
Gacrux, Walter = Umbriel (las de siempre del elenco), **Jorge = Zubenelgenubi** (personaje nuevo), **Lucas =
Sadaltager** (primera vez con voz), narrador del cartel = Rasalgethi (audio reusado de
`reels/inmobiliaria-disponible/assets/voice/narrador.wav`, "Un agente de IA más tarde.").

## Música y efectos (constructor, 26-11)
Nada sintetizado con ffmpeg; ningún archivo nuevo descargado: todos vienen de otros reels del repo, con su crédito original.
- `chisporroteo.wav` (las brasas del asado): "Frying pan 2" (#0144), Joseph Sardin · BigSoundBank · CC0 1.0, https://bigsoundbank.com/frying-pan-2-s0144.html (de reels/parrilla-no-vuelve).
- `fuego.wav` (copiado, no usado en la mezcla): "Fireplace 2" (#0031), BigSoundBank · CC0 1.0 (de reels/parrilla-no-vuelve).
- `pajaro.wav` (el patio y el pájaro lejano): "Bird Chirp", swiftoid · Freesound · CC0.
- `vibra.wav` (los celulares que vibran): "Cell phone vibrate, on table hard surface", SpliceSound · Freesound · CC0.
- `tic-real.mp3` (el reloj de la noche): "Clock ticking", olver · Freesound · CC0 1.0.
- `calle.wav` (la calle lejana del estudio y de la panadería): "Small quiet street ambience", Oper8 · Freesound · CC0.
- `cero.mp3` (los dings del panel y del balance terminado): "[UI Sound] Approval - High Pitched Bell Synth", GabFitzgerald · Freesound · CC0.
- `stinger.wav` (el cartel): "Vibraphone Transition Music Cue", DanJFilms · Freesound · CC0 1.0.
- `bgm/pizzicato.wav` (la música): "Pizzicato Intrigue", younoise · Freesound · CC0.
- `k-pep.wav` (el "tuc" del audio de chat), `k-cloth_1.wav` (el celular que sale del bolsillo, la silla de Lucas), `k-tick-1.wav` (el contador), `k-metal-click.wav` (la pinza), `k-plato-000.wav` (el plato), `madera-tabla.wav` (el celular boca abajo en la mesa): Kenney · kenney.nl · CC0 1.0.
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `ding.mp3`, `notification.mp3`, `click-soft.mp3`, `key-press.mp3`, `zumbido-largo.wav`: banco de SFX de HyperFrames (como en reels/abren-hoy, ya-lo-cargo, contable-papeles).
- Narrador del cartel: `reels/inmobiliaria-disponible/assets/voice/narrador.wav` (Gemini Rasalgethi, "Un agente de IA más tarde.", 2,18 s), reusado sin cambios.
