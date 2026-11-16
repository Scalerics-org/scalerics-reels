# estetica-turnos · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Lorena,
Vale, Carolina, Jimena, Mariana; Graciela y Sofi del elenco). **No afirma datos externos, estadísticas, años ni
empresas reales: no hay nada que verificar con WebSearch.** Los números son del caso que se cuenta, no estadísticas:
- 3 turnos que no vinieron = 3 horas de camilla vacía (un turno por hora, 15, 16 y 17).
- $ 5.400 que no entraron = limpieza facial $ 1.800 + peeling $ 2.200 + depilación $ 1.400 (precios inventados del
  centro de Lorena, verosímiles para Montevideo; no se presentan como promedio de nada).
- Seña de $ 500, "Hueco cubierto en 2 minutos": parte de la ficción del caso.

Sin marcas: "Lorena Estética" es inventado; chat genérico (la palabra "WhatsApp" solo en texto, sin su verde ni su
logo), botón "Pagar seña" sin logo de medio de pago, frascos y cremas sin marca.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Lorena = Kore, Carolina = Leda, Jimena = Despina, Graciela = Gacrux, Sofi =
Achernar, narrador del cartel = Rasalgethi (toma nueva: "Una agenda online más tarde."). Tomas en `partes/tomas/`,
recortes en `partes/rec/`.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/la-lista/fuentes.md`, `reels/ya-lo-cargo/fuentes.md` y
`reels/dice-cuarenta/fuentes.md`): pop, whoosh, whoosh-short, notification, cero, campanita, click-soft, key-press,
k-page-turn, k-cloth_1/2, k-tick-1/2/4, paso-0..4, stinger, música de cama.

No se agregó ningún sonido nuevo: todo sale de `assets/sfx` y `assets/bgm` (copiados de `reels/dice-cuarenta`, con su
crédito en los fuentes.md de ese reel, la-lista y ya-lo-cargo). Campanita de la puerta = `campanita.wav` + `puerta-abre.wav`;
tachadura de la lapicera = `k-page-turn.wav` acelerado y con pasaaltos (dos rasguidos); zumbido de la lámpara =
`zumbido-largo.wav` / `zumbido.wav` con pasabajos; tic del reloj = `k-tick-1/2/4.wav` (Kenney, CC0). Nada sintetizado.
