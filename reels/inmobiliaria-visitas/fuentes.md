# inmobiliaria-visitas · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Silvana,
Diego, Romina; Graciela y Sofi del elenco). **No afirma datos externos, estadísticas, porcentajes, años ni empresas
reales.** Los números son del caso que se cuenta:
- El apartamento de Graciela en Pocitos: 2 dormitorios, USD 180.000 (precio inventado, verosímil para el barrio; no se
  presenta como promedio de nada).
- "USD 5.400 de comisión": la comisión de ESTA venta en "Silvana Propiedades" (equivale al 3 % de USD 180.000, pero el
  guion no dice el porcentaje ni que sea la comisión habitual). Parte 2: 4 visitas en la semana, 2 con interés alto, una
  segunda visita el martes 11:00; tres semanas después, 11 visitas, 3 segundas visitas, VENDIDO. Todo ficción del caso.
- Pocitos y Malvín son barrios de Montevideo (nombres de lugar, no marcas).

## Lo que se verificó y por qué el guion NO lo dice
Se buscó (WebSearch, 17-11) cuánto cobra de comisión una inmobiliaria en Uruguay por una compraventa:
- Avisos de inmobiliarias uruguayas publican sus honorarios como "3 % del precio de venta más IVA" (ej. listados en
  InfoCasas): https://www.infocasas.com.uy/venta/inmuebles/montevideo/palermo/con-balcon/pagina2
- Una calculadora de gastos de compraventa de Uruguay indica que la comisión "se rige según acuerdo (~3 % + IVA)" y que
  se pacta aparte: https://hacecuentas.com/uy/calculadora-gastos-compraventa-inmueble-uruguay
- No se encontró una norma que fije la comisión ni quién la paga: es un acuerdo entre las partes.

**Decisión:** el guion y los rótulos dicen solo el monto del caso ("USD 5.400 de comisión"), sin porcentaje, sin "más
IVA" y sin decir quién la paga. Las fuentes de arriba solo respaldan que el monto es verosímil.

Sin marcas: "Silvana Propiedades" es inventada; la otra inmobiliaria nunca se nombra ni se muestra; ningún portal
inmobiliario (ni nombrado ni dibujado); chat genérico (la palabra "WhatsApp" solo en texto, sin su verde ni su logo).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Silvana = **Erinome** (no la usó ningún reel del repo), Diego = **Achird**
(alternativa Puck; todas las voces masculinas salieron en los reels del 16 y 17-11; Achird solo hizo de Fabián, el mozo
de parrilla-no-vuelve), Romina = **Pulcherrima** (no la usó ningún reel del repo), Graciela = Gacrux (la de siempre),
Sofi = Achernar, narrador del cartel = Rasalgethi (toma nueva: "Un registro de visitas más tarde.").
El "¿Y? ¿Hubo visitas?" de Q3 es el MISMO audio de P1. "Mañana paso a buscar el cartel." va con DOS tomas (P7 seca y
digna, Q4 contenta).

## Música y efectos
Los de siempre del repo (con su crédito en `reels/taller-presupuestos/fuentes.md`, `reels/veterinaria-vacunas/fuentes.md`
y `reels/ya-lo-cargo/fuentes.md`). Sonidos que probablemente haya que sumar (el constructor los busca primero en
`assets/sfx` de otros reels; si no están, uno real con licencia CC0 y anota acá autor, sitio y licencia; nada sintetizado
con ffmpeg): **tintineo de llaves**, **rueditas de silla de oficina**, **viento suave de balcón / gaviota lejana**,
**tono de llamada colgada** (`k-dos-tonos.wav`, Kenney CC0, ya registrado en ya-lo-cargo), **reloj de pared**.

## Sonidos usados (constructor, 17-11)
- `assets/sfx/gaviota.wav` (la gaviota lejana del balcón): recorte de 1,8 s de "Gulls on the Harbor" (2573),
  BigSoundBank, CC0 1.0: https://bigsoundbank.com/gulls-on-the-harbor-s2573.html (licencia: https://bigsoundbank.com/licenses.html).
- `llaves.wav` ("Keys in a hand", BigSoundBank, ya acreditado en reels/taller-presupuestos), `k-dos-tonos.wav` (Kenney,
  CC0), `tic-real.mp3`, `key-press.mp3`, `ding.mp3`, `cero.mp3`, `notification.mp3`, `vibra.wav`, `puerta-abre.wav`,
  `paso-*.wav`, `calle.wav`, `zumbido-largo.wav`, whoosh/pop/stinger y `bgm/pizzicato.wav`: los de siempre del repo
  (créditos en reels/dist-cliente-grande, ya-lo-cargo y veterinaria-vacunas). Nada sintetizado.
