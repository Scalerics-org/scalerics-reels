# corralon-portland · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Gustavo,
Beto, Tito, Marcos, Luis, Ana, Ramón, Facundo; Sofi del elenco). **No afirma estadísticas, años ni empresas reales.** Lo
que sigue es lo poco que toca el mundo real (vocabulario y presentación del producto) y los números del caso.

## Lo verificado (WebSearch, 17-11)
- **El portland se vende en Uruguay en bolsas de 25 kg** (lo dice el pizarrón, el chat y la bolsa 3D: "PORTLAND · 25 kg").
  - Pliego de compra estatal uruguayo con "Portland, bolsa de 25 kg" como ítem: https://www.comprasestatales.gub.uy/Pliegos/pedido_1121669.pdf
  - Publicación de portland uruguayo en bolsa de 25 kg (origen Uruguay): https://latinafy.com/products/ancap-portland/
  - (La marca no se nombra ni se dibuja: la bolsa es genérica, kraft crema con franja navy.)
- **"Llenado" de la losa** es el término uruguayo de obra ("Hoy llenamos la losa"): documento del Ministerio de Vivienda
  (MVOT) que habla del "momento del llenado" de la losa:
  https://www.gub.uy/ministerio-vivienda-ordenamiento-territorial/sites/ministerio-vivienda-ordenamiento-territorial/files/documentos/publicaciones/CIR%20COMPLETO_Parte2_0.pdf
- **"Barraca" es como se dice en Uruguay** al comercio de materiales de construcción (por eso el cuadro 0 dice
  "CORRALONES" / "Y BARRACAS"): listado oficial del Ministerio de Defensa Nacional, "Barracas, ferreterías":
  https://www.gub.uy/ministerio-defensa-nacional/politicas-y-gestion/barracas-ferreterias
- Cuenta de plausibilidad (no se dice en el reel): con ~14 bolsas de 25 kg por m³ de hormigón (350 kg/m³), 40 bolsas
  alcanzan para una losa chica de vivienda; el pedido es verosímil para "hoy llenamos la losa".

## Lo que es ficción del caso (no se presenta como dato de nada)
- **Precios del pizarrón de "Materiales Gustavo"** (inventados, verosímiles; no se encontró una fuente pública de precio
  de portland en barracas uruguayas, así que NO se presentan como precio de mercado, solo como los de este corralón):
  portland 25 kg $ 520 · arena gruesa $ 2.400 el m³ · pedregullo $ 2.900 el m³ · hierro del 8 $ 380 la barra.
- **El pedido perdido:** 40 bolsas × $ 520 = **$ 20.800**.
- **27 mensajes sin contestar** a las 6:50 (20 al abrir + 7 mientras Gustavo cuenta).
- **Panel de la parte 2, "antes de las 8": 5 pedidos, $ 48.900** = Beto 40 portland $ 20.800 · Luis 2 m³ arena + 1 m³
  pedregullo $ 7.700 · Marcos 20 barras del 8 $ 7.600 · Ana 15 portland $ 7.800 · Ramón 1 m³ arena + 5 portland $ 5.000.
- Entregas a obra "de 9 a 17", "Rivera 2340" (dirección inventada), "Entregado ✓ 9:02", el pedido de 300 bolsas para un
  edificio: ficción del caso.
- Lo que hace el agente (contesta con stock, precios y entregas, toma el pedido con dirección y hora, pasa al dueño lo
  que es para él) es lo que vende Scalerics (CLAUDE.md, "Lo que se vende": agentes de IA), no un dato externo.

Sin marcas: "Materiales Gustavo" es inventado; bolsas de portland genéricas sin marca de ninguna cementera; camiones
genéricos sin logo; chat genérico (la palabra "WhatsApp" solo en texto, sin su verde ni su logo).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Gustavo = Alnilam, Beto = Sadachbia, Tito = Enceladus, Sofi = Achernar; narrador
del cartel = Rasalgethi, audio reusado de `reels/abren-hoy-completo/assets/voice/narrador.wav`.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/taller-presupuestos/fuentes.md`, `reels/la-lista/fuentes.md`,
`reels/dice-cuarenta/fuentes.md` y `reels/estetica-turnos/fuentes.md`). Efectos que probablemente haya que sumar
(el constructor busca primero en `assets/sfx` de otros reels; si no están, uno real con licencia CC0, y anota acá autor,
sitio y licencia): timbre de teléfono de pared (campanilla mecánica), bolsa de papel pesada que se apoya, ambiente de
obra, camión diésel que arranca lejos, carretilla sobre tierra. Nada sintetizado con ffmpeg.

### Efectos nuevos de este reel (reales, CC0 1.0; agregados por el constructor, 17-11)
De Kenney (https://kenney.nl), pack "Impact Sounds" (https://kenney.nl/assets/impact-sounds), CC0 1.0, bajados del espejo
https://github.com/Daarko/sparkstream-sounds (guarda la licencia del pack en `credits/impact-sounds-License.txt`;
bigsoundbank.com, freesound.org y kenney.nl no responden desde la nube):
- `assets/sfx/k-bolsa-0.wav`, `k-bolsa-2.wav` (la bolsa de portland que se palmea / se apoya en el mostrador):
  "impactSoft_heavy_000/002".
- `assets/sfx/k-bolsa-m.wav` (el toque en cada bolsa que cuenta Gustavo): "impactSoft_medium_001".
- `assets/sfx/k-tierra-0/2/4.wav` (pasos en el patio de tierra): "footstep_grass_000/002/004".
De otros reels del repo (crédito en sus fuentes.md): `pajaro.wav` ("Bird Chirp", swiftoid, Freesound, CC0; hacen-envios),
`k-metal-liviano-2.wav` (martillazos lejanos de la obra dentro de los audios de Beto, con pasabajos; Kenney, CC0),
`motor.mp3` más grave (el camión que arranca lejos; looneybits, OpenGameArt, CC0; por-que-las-tarjetas).
No se consiguió un timbre mecánico de teléfono de pared real CC0 (bigsoundbank bloqueado): el teléfono de pared no suena (ronda 1).
Nada sintetizado con ffmpeg.
