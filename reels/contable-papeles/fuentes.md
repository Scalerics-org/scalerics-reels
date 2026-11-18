# contable-papeles · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Adriana,
Marcelo, Lucas; Sofi del elenco). **No afirma datos externos, estadísticas, porcentajes, fechas de vencimiento, multas,
recargos ni empresas reales.** Los números son del caso que se cuenta:
- "Estudio Adriana" tiene 60 clientes (inventado). Parte 1: "Mandaron 33 → 41 de 60" el último día, "Cuarta noche hasta
  las 2", "Un mes en una caja de zapatos". Parte 2: "Mandaron 0 → 38 → 52 de 60", "Recordatorio automático enviado a 22",
  "Marcelo · Noviembre · 14", "60 de 60", "Noches hasta las 2: 0". Todo ficción del caso, ninguna cifra se presenta como
  promedio de nada.
- "Último día" y "Vence hoy" van **sin fecha y sin nombrar el impuesto** a propósito (pedido del coordinador: no poner
  vencimientos de DGI/BPS sin verificarlos con dos fuentes; el chiste no los necesita). Los lomos de los biblioratos
  ("IVA", "BPS", "SUELDOS") son rótulos de archivo de un estudio, no afirmaciones.
- "Panadería Marcelo" es inventada; bizcochos, flautas y bolsas de harina sin marca.

## Lo que se verificó (WebSearch, 18-11) y cómo se usa
**1. El ticket que "se borró" (el remate) es verosímil:** el papel térmico no lleva tinta; la impresión pierde contraste
con el tiempo, con el calor, el sol o el roce en una billetera o un bolsillo, y la recomendación habitual es
fotografiarlo o guardar el PDF.
- https://yo-facturo.com/blog/ticket-sale-claro-borroso-o-cortado-causas/ (blog de un sistema de facturación: causas del
  ticket claro o borroso)
- https://www.ultimahora.com/validez-facturas-impresas-papel-termico-n2848084 (prensa paraguaya: la norma de allá exige
  al proveedor de papel térmico garantizar la imagen impresa por un plazo y prevé copia si el original se deteriora; o
  sea, que se deteriora es un problema conocido)
- https://www.facturadorelectronico.com/blog/?p=7229 (guía: guardar y digitalizar los tickets)
**Uso:** solo visual (un ticket en blanco y el rótulo "Ticket térmico · se borró", que describe ESE ticket del caso). El
guion no dice cuánto dura un ticket ni cita ninguna norma. La foto el mismo día de la parte 2 (la factura se lee) es la
consecuencia lógica, no un dato.

**2. Contexto (no se dice en el reel):** en Uruguay la facturación electrónica es general; según la DGI, desde el
1/1/2025 son emisores electrónicos los contribuyentes de IVA, con excepciones puntuales. Igual los comercios siguen
recibiendo representaciones impresas, tickets y facturas en papel o PDF de sus compras, que es lo que el estudio les pide.
- https://www.gub.uy/direccion-general-impositiva/comunicacion/noticias/facturacion-electronica-incorporacion-restantes-contribuyentes-iva
- https://www.rsm.global/uruguay/es/news/facturacion-electronica-inclusion-obligatoria-partir-del-01012025
**Decisión:** el guion dice "las facturas" y "tickets" en general, sin "papel"/"electrónica", y la solución es "subir las
fotos" (foto o archivo): vale para cualquiera de los dos casos. Nada de "la DGI te multa", "te cobran recargo" ni "vence
el 15": no se buscaron dos fuentes concordantes para eso y el chiste no lo necesita.

**Lo que el producto NO promete** (para el revisor de guion y datos): el sistema pide los comprobantes, recuerda, recibe
las fotos y las ordena por cliente y por mes, con el panel de quién mandó. No lee montos, no liquida impuestos, no
presenta declaraciones y no detecta fotos ilegibles.

Sin marcas: ningún software contable, banco ni la DGI dibujados (ni logo ni colores); chat genérico (la palabra
"WhatsApp" solo en texto, sin su verde ni su logo).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Adriana = **Autonoe** (no la usó ningún personaje del repo), Marcelo =
**Enceladus** (alternativa Puck; ver partes/voces.md), Sofi = Achernar, narrador del cartel = Rasalgethi (toma nueva:
"Una automatización más tarde."). El "Adri, las facturas te las mando mañana sin falta." de Q3 es el MISMO audio de P1.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/inmobiliaria-visitas/fuentes.md`, `reels/veterinaria-vacunas/fuentes.md`
y `reels/ya-lo-cargo/fuentes.md`). Sonidos que probablemente haya que sumar (el constructor los busca primero en
`assets/sfx` de otros reels; si no están, uno real con licencia CC0 y anota acá autor, sitio y licencia; nada sintetizado
con ffmpeg): **teclas de sumadora / máquina de sumar**, **papel que cae / crujido de tickets** (avalancha), **timbre de
puerta**, **"tuc" de audio de chat y audio enviado**, **obturador de cámara de celular**, **clic de cadenita de
lámpara**, **campanita de puerta de comercio** (panadería), **golpe sordo de bolsa de harina**, **reloj de pared**.

## Sonidos usados (constructor, 18-11)
Nuevos, de BigSoundBank, licencia CC0 1.0 (https://bigsoundbank.com/licenses.html), recortados en gen.mjs:
- `assets/sfx/bsb-0307.mp3` (el obturador del celular de Marcelo): "Triggering camera" (0307), https://bigsoundbank.com/triggering-camera-s0307.html
- `assets/sfx/bsb-3553.mp3` (la ráfaga de la sumadora en P3): "Calculator-printer" (3553), https://bigsoundbank.com/calculator-printer-1-s3553.html
- `assets/sfx/bsb-0036.mp3` (el clic de la cadenita de la lámpara): "Switch desk lamp" (0036), https://bigsoundbank.com/switch-desk-lamp-s0036.html
- `assets/sfx/bsb-0576.mp3` (el golpe sordo de la bolsa de harina en el mostrador): "Canvas bag on floor" (0576), https://bigsoundbank.com/canvas-bag-on-floor-s0576.html
- `assets/sfx/bsb-0160.mp3` (timbre de puerta; descargado, no se usó: Marcelo golpea la puerta con `madera-golpe.wav`): "Doorbell" (0160), https://bigsoundbank.com/doorbell-2-s0160.html
Del repo, por archivo (autor · sitio · licencia, según los fuentes.md de los reels de donde vienen):
- `papel.wav`, `papel-fuerte.mp3` (la avalancha, el ticket que cruje, el ticket al piolín): "Paper slide", Kingofgamers_cz · Freesound · CC0 1.0.
- `cruje.wav` (avalancha): "creak_1", Kenney · kenney.nl (RPG Audio) · CC0 1.0.
- `hoja.mp3` (avalancha): `book_flip_1`, Kenney · kenney.nl (RPG Audio) · CC0 1.0.
- `k-page-turn.wav` (la caja que se vuelca): "Page turn", Kenney · kenney.nl · CC0 1.0.
- `puerta-abre.wav` (la puerta del estudio): "door_open_1", Kenney · kenney.nl (RPG Audio) · CC0 1.0.
- `madera-golpe.wav` (los golpes a la puerta, la puerta que cierra), `paso-0..4.wav` (pasos): Kenney · kenney.nl (Impact Sounds) · CC0 1.0.
- `k-cloth_1.wav` (Adriana levanta el celular): Kenney · kenney.nl (RPG Audio) · CC0 1.0.
- `k-pep.wav` (el "tuc" del audio de chat): pepSound1, Kenney · kenney.nl (Digital Audio) · CC0 1.0.
- `campanita.wav` (la puerta de la panadería): "Shop door bell", 775noise · Freesound · CC0.
- `pajaro.wav` (la tarde en el estudio): "Bird Chirp", swiftoid · Freesound · CC0.
- `vibra.wav` (el celular que vibra): "Cell phone vibrate, on table hard surface", SpliceSound · Freesound · CC0.
- `tic-real.mp3` (el reloj en la pausa): "Clock ticking", olver · Freesound · CC0 1.0.
- `calle.wav` (la calle de noche, la panadería): "Small quiet street ambience", Oper8 · Freesound · CC0.
- `cero.mp3` (los dings del panel): "[UI Sound] Approval - High Pitched Bell Synth", GabFitzgerald · Freesound · CC0.
- `stinger.wav` (el cartel): "Vibraphone Transition Music Cue", DanJFilms · Freesound · CC0 1.0.
- `bgm/pizzicato.wav` (la música): "Pizzicato Intrigue", younoise · Freesound · CC0.
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `ding.mp3`, `notification.mp3`, `click-soft.mp3`, `key-press.mp3`, `zumbido-largo.wav`: banco de SFX de HyperFrames (como en reels/abren-hoy, reels/ya-lo-cargo e inmobiliaria-visitas).
