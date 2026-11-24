# vete-racion · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Inés, Vero,
Bruno y Toto, de `veterinaria-vacunas`). **No afirma datos externos, estadísticas, años ni empresas reales.** Que el
cliente que compraba la ración en la veterinaria pase a comprarla en el súper no se presenta como dato ni porcentaje: es
lo que le pasa a Inés con Vero.

## Números del caso (no son estadísticas ni promesas de resultado)
- **Bolsa de ración de 15 kg · $ 3.900** (el precio en Veterinaria Inés y en la góndola del súper del caso; número del
  caso, sin marca).
- **$ 3.900 → $ 7.800 → $ 11.700 → $ 15.600**: lo que Inés no vendió de ración con Vero en cuatro meses (octubre a
  enero, 4 × $ 3.900).
- **$ 46.800 al año** = 12 × $ 3.900 (la bolsa de Toto, una por mes).
- **Clientes de bolsa que dejaron de venir: 11** (en la ficción del caso).
- **Toto compra cada 30 días · última compra hace 26 días · le quedan ~4 días**: la ficha de Toto, no una regla general
  sobre cuánto come un perro.
- Parte 2, panel "Recompras de ración · febrero": avisos enviados 23 · repitieron el pedido 19 (envío 14 · retiro 5) ·
  dejaron de comprar 11 → 2 · **$ 74.100** = 19 × $ 3.900.
- Días del caso: domingo 21:40 (veterinaria cerrada, abre el lunes 9:00), súper el domingo 22:05; parte 2: aviso el
  jueves 10:00, envío el viernes de 18 a 20 h (Bruno llega 18:40), el domingo 21:40 el plato lleno, control en febrero.

## Lo que se dice del producto (que sea realista)
Tienda online de Scalerics para la veterinaria (catálogo de ración y accesorios, envío o retiro en el local, pago online)
más una automatización: cada compra queda asociada a la mascota con la bolsa y la frecuencia; unos días antes de la
fecha estimada en que se termina, sale un WhatsApp al dueño con el nombre de la mascota y un botón que abre el mismo
pedido armado en la tienda; panel de recompras. Mandar ese aviso por WhatsApp a un cliente que dejó su número y aceptó
recibir avisos es lo que permite la plataforma de WhatsApp Business con plantillas aprobadas; un recordatorio de recompra
de un producto que el cliente compra seguido es, para Meta, una plantilla de **marketing** (no de "utilidad"), así que
requiere el consentimiento del cliente para recibir mensajes de la veterinaria (lo da al comprar en la tienda) y respetar
la baja:
- [Meta for Developers · Template categorization](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization)
- [Meta for Developers · Get opt-in for WhatsApp](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in)
(Nota del coordinador, etapa 2: el reel no hace ninguna afirmación sobre WhatsApp ni sobre la plataforma; los links quedan como referencia y no se volvieron a verificar.)

El reel no nombra la API ni promete resultados en números fuera del caso. No es un agente de IA y no se lo llama así.

## Sin marcas
"Veterinaria Inés" es inventada (veterinaria-vacunas). Bolsas de ración genéricas (kraft o colores planos con una silueta
de perro y "15 kg", sin logo ni nombre de fábrica), góndola y súper sin nombre ni colores de ninguna cadena, carro,
plato, celular y tablet sin logo. Chat genérico (burbujas crema y navy, sin el verde ni el logo de WhatsApp); "WhatsApp"
se nombra solo como canal, en la línea chica final y en `descripcion.txt`.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Inés = Sulafat, Vero = Callirrhoe, Bruno = Schedar (las de veterinaria-vacunas);
narrador del cartel = Rasalgethi, audio reusado de `reels/tienda-tenes-stock/assets/voice/narrador.wav` ("Una tienda
online más tarde."). Detalle en `partes/voces.md`.

## Efectos
Nada sintetizado con ffmpeg. Los reusados (copiados con el proyecto de `reels/veterinaria-vacunas` o de otros reels), con
el reel cuyo `fuentes.md` tiene el crédito:
- `k-plato-000.wav` (el plato de acero contra el piso, P1): crédito en `reels/como-viene-el-mes/fuentes.md` (y dist-quien-debe).
- `k-tick-1/2/4.wav` (uñas, croqueta, chips, filas del panel): Kenney, CC0, en `reels/dice-cuarenta/fuentes.md` (y taller-presupuestos).
- `k-metal-liviano-2.wav` (el alambre del carro): `reels/corralon-portland/fuentes.md`.
- `campanita.wav` (la puerta de la veterinaria): `reels/anotamelo/fuentes.md` (y abren-hoy-2).
- `stinger.wav` (fin de la parte 1): `reels/abren-hoy-completo/fuentes.md`.
- `bgm/pizzicato.wav` (la cama): `reels/abren-hoy/fuentes.md`.
- `zumbido.wav` / `zumbido-largo.wav` (tubo del súper, heladera): `reels/anotamelo/fuentes.md` / `reels/contable-papeles/fuentes.md`.
- `puerta-abre.wav` (la puerta de Vero): `reels/anotamelo/fuentes.md`.
- `paso-0..4.wav` (pasos): `reels/anotamelo/fuentes.md`.
- `whoosh-short.mp3`, `whoosh.mp3`, `vibra.wav`, `click-soft.mp3`: `reels/abren-hoy/fuentes.md`.
- `notification.mp3`, `pop.mp3`, `cero.mp3`: `reels/anotamelo/fuentes.md`.
- `ladrido-*.wav` (Toto): Freesound CC0, detallados en `reels/veterinaria-vacunas/fuentes.md`.
- `birome.wav` (la lapicera): BigSoundBank CC0, `reels/resto-reservas/fuentes.md`.
- `bsb-rasga.wav` (la hoja del recetario): "Torn paper #2", BigSoundBank CC0, `reels/ferreteria-encargo/fuentes.md`.

Nuevos en este reel (todos de BigSoundBank, Joseph Sardin, licencia CC0 1.0 "public domain", verificada en la página de
cada sonido el 24-11; bajados en mp3 a `partes/bsb/` y recortados/pasados a .wav sin procesar el sonido):
- `assets/sfx/bsb-cereal.wav` (las croquetas que se mueven en el plato lleno, Q3; 0,62-2,2 s): "Cereal in bowl #1" (#2071), https://bigsoundbank.com/cereal-in-bowl-1-s2071.html
- `assets/sfx/bsb-masticar.wav` (Toto que come, Q3; 0,17-4,7 s): "Eating potato chips #2" (#1432), https://bigsoundbank.com/eating-potato-chips-2-s1432.html
- `assets/sfx/bsb-olfateo.wav` (Toto que huele la torre, P4; dos olfateos 0-0,38 s y 1,42-1,74 s): "Sniff" (#0784), https://bigsoundbank.com/sniff-s0784.html
- `assets/sfx/bsb-suspiro.wav` (el suspiro de Toto echado, P5; 0,42-2,4 s, pasabajos en la mezcla): "Sigh by the nose" (#1404), https://bigsoundbank.com/sigh-by-the-nose-s1404.html
- `assets/sfx/bsb-timbre.wav` (el timbre de la casa de Vero, Q2; 0-2 s): "Doorbell house #1" (#0159), https://bigsoundbank.com/doorbell-house-1-s0159.html
- `assets/sfx/bsb-papel.wav` (la bolsa de papel vacía y la que sale de la góndola; 0,2-0,82 s): "Paper" (#0785), https://bigsoundbank.com/paper-s0785.html
- `assets/sfx/bsb-bolsa-piso.wav` (la bolsa de 15 kg que cae al carro y al piso; 0-0,32 s): "Canvas bag on floor" (#0576), https://bigsoundbank.com/canvas-bag-on-floor-s0576.html (ya usado en contable-papeles)

## Medición de la mezcla (ronda 1)
Con los stems al día (`MEDIR=1 node gen.mjs` + `medir.py`), la voz queda ≥ 6,5 LU sobre música + SFX en todos los tramos
de 0,5 s con voz, contando el arranque del narrador. El revisor de sonido midió 11,4 LU de margen típico sobre los stems
de la versión anterior. Los SFX de los tramos sin voz quedaron en la meta del revisor sin pasar -31 LUFS momentáneo en el
MP4 (cereal ~-32, masticar ~-31, birome ~-31, notificación ~-35).
