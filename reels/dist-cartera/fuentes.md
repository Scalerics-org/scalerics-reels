# dist-cartera · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Rubén,
Leo, Nico, Marta y Sofi). **No afirma datos externos, estadísticas, años ni empresas reales**, así que no hubo nada que
verificar con WebSearch. Que un vendedor que se va "se lleve la cartera" no se presenta como dato ni porcentaje: es lo
que le pasa a Rubén.

## Números del caso (no son estadísticas ni promesas de resultado)
- **Zona Este: 38 clientes · $ 1.900.000 por mes** (lo que factura esa zona en la ficción; unos $ 50.000 por cliente
  por mes, coherente con los montos de dist-quien-debe).
- **En el Excel: 3** (y 2 cuando Rubén borra a Marta).
- Ficha de Cafetería Marta: pide los martes, cada semana; lo de siempre: 6 cajas de aceite, 4 bolsas de harina, 2 de
  azúcar; lista de precios B; paga a 30 días; lo prometido: 2 cajas de la oferta.
- Panel de la parte 2: Zona Este · Nico · 38; Zona Centro · Nico · 41; Zona Oeste · Rubén · 29 = **108 clientes** en el
  sistema; "Pedidos esta semana · Zona Este: 35 de 38" (de la ficción del caso, no un resultado prometido).
- Días del caso: la despedida el viernes 18:00; Nico llama a Marta el martes 9:00.
- Teléfonos nunca enteros ("099 1·· ···"): ningún número real en pantalla.

## Lo que se dice del producto (que sea realista)
Un CRM de Scalerics para distribuidoras: ficha de cada cliente con datos de compra, frecuencia, lista de precios,
condiciones de pago, notas de la última conversación y lo prometido; las fichas son de la empresa y se reasignan de un
vendedor a otro; el vendedor las ve en el celular; el dueño ve la cartera entera por zona y vendedor. Es lo que hace
cualquier CRM a medida; no se promete ningún resultado en números fuera del caso. No es un agente de IA y no se lo
llama así.

## Sin marcas
"Distribuidora Rubén", "Cafetería Marta", "Rotisería Graciela", "Autoservicio Pérez" son inventados. La planilla es genérica
(grilla gris, sin el color ni el logo de ningún programa; "Excel" y ".xlsx" solo como palabra, como se dice en el
rubro). Torta, gaseosa (botella navy sin marca), celulares, monitor y chat genéricos.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Rubén = Algenib, Nico = Fenrir, Marta = Aoede, Sofi = Achernar (las de siempre
del elenco), **Leo = Sadachbia** (personaje nuevo; en el repo esa voz solo fue el audio de Beto en corralon-portland),
narrador del cartel = Rasalgethi (audio reusado de `reels/lo-mismo-que-la-otra-vez/assets/voice/narrador.wav`, "Un
sistema de clientes más tarde."). Detalle en `partes/voces.md`.

## Efectos
Los que se reusan vienen de `assets/sfx` (copiados de dist-quien-debe, con su crédito en los `fuentes.md` de origen).
Nada sintetizado con ffmpeg. Nuevos en este reel (todos BigSoundBank, Joseph Sardin, licencia CC0 1.0; bajados en mp3 y
recortados/pasados a .wav sin procesar el sonido):
- `assets/sfx/bsb-murmullo.wav` (el murmullo de la despedida, que se corta en "¿Y los clientes?"; 10-40 s): "Small Restaurant Conversations" (#3542), https://bigsoundbank.com/small-restaurant-conversations-s3542.html
- `assets/sfx/bsb-cafeteria.wav` (el ambiente de la cafetería de Marta; 20-40 s): "Coffee Shop at the Capucins" (#2561), https://bigsoundbank.com/coffee-shop-at-the-capucins-s2561.html
- `assets/sfx/bsb-molinillo.wav` (el molinillo de Marta; 0-3 s): "Coffee grinder #3" (#2539), https://bigsoundbank.com/coffee-grinder-3-s2539.html
- `assets/sfx/bsb-palmada.wav` (la palmada del abrazo y la del celular del pecho; 0,27-0,77 s): "Slaps" (#0597), https://bigsoundbank.com/slaps-s0597.html
- `assets/sfx/bsb-aplauso.wav` (bajado, sin usar por ahora; 0-4 s): "Applause about 25-50 people #1" (#0812), https://bigsoundbank.com/applause-about-25-50-people-1-s0812.html
Las tarjetas que vuelan al celular de Nico suenan con `whoosh.mp3` + `k-page-turn.wav` (ya en assets/sfx).

Los `k-*` reusados (todos Kenney, https://kenney.nl, CC0 1.0), con el reel donde está el crédito completo:
- `k-tick-1.wav`, `k-tick-2.wav` ("tick_001/002", pack "Interface Sounds"): `reels/dice-cuarenta/fuentes.md`.
- `k-page-turn.wav` ("Page turn", pack "Everyday objects", espejo mangarr-sounds): `reels/anotamelo/fuentes.md`.
- `k-plastico.wav` ("impact_generic_light_002", pack "Impact Sounds"): `reels/como-viene-el-mes/fuentes.md`.
- `k-tono.wav` ("tone1", pack "Digital Audio"): `reels/la-lista/fuentes.md` (también en `reels/dist-quien-debe/fuentes.md` y `reels/dist-cliente-grande/fuentes.md`,
  (que remiten a `reels/dist-pedidos-lunes/fuentes.md` y `reels/veterinaria-vacunas/fuentes.md`).
