# tienda-tenes-stock · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Paola,
Mica; Graciela y Walter del elenco). **No afirma datos externos, estadísticas, porcentajes, años ni empresas reales.**
Los números son del caso que se cuenta:
- "Casa Pao · Importados" (inventada) importa freidoras de aire de 4 L en tres colores y las vende por redes y en un
  local chico adelante del depósito. Precio del caso: **$ 4.990** cada una (inventado; no se presenta como precio de
  mercado).
- Parte 1: el cuaderno dice "VERDE: 1"; la última verde se vende dos veces (a Graciela por chat, pagada, y en el local);
  reintegro de $ 4.990; debajo de la mesa de fotos (8) y en la pared (28, de espaldas) hay **36 verdes del contenedor de
  marzo sin cargar** → 36 × $ 4.990 = **$ 179.640 sin vender desde marzo** (a precio de venta del caso).
- Parte 2: Verde quedan 2 → 1 → sin stock; envío a domicilio $ 190 (total $ 5.180); pedido #214; pedido por mayor de
  "Bazar del Puerto" (inventado) de 10 azules (Azul 25 → 15; Mica: "¡Diez azules para el Bazar!"); el contenedor de
  noviembre: ingreso de 36 verdes (Verde 0 → 36), 12 avisados que esperaban y 12 pedidos pagos (Quedan 36 → 24). En la
  parte 2 la pared tiene solo azules y cremas (las verdes de marzo ya se vendieron); las cajas que entran dicen
  "CONT. NOVIEMBRE". Todo ficción del caso.

## Lo que se buscó y por qué el guion no lo dice
Se buscó (WebSearch, 18-11) el precio de una freidora de aire de 4 litros en Uruguay: los resultados de comercios
uruguayos (Megatone, Sodimac Uruguay) no mostraban precio en la página indexada, y los que sí tenían precio eran de otros
países (Argentina, Colombia):
- https://www.megatone.net/producto/freidora-de-aire-mondial-afn-40-bi-4l-220v-60hz-cocina-saludable-y-sin-aceite_MKT0931MHM/
- https://www.sodimac.com.uy/sodimac-uy/product/3346412

**Decisión:** el precio queda como dato del caso ("Casa Pao"), sin presentarlo como precio de referencia, y el guion no
dice cuánto cuesta una freidora "en general" ni cuánto tarda un contenedor. Las marcas que aparecieron en la búsqueda no
se nombran ni se dibujan: las freidoras y sus cajas son genéricas.

Sin marcas: ninguna red social, marketplace ni procesadora de pago nombrada ni dibujada ("redes", "Pagar con crédito o
débito", "link de pago" solo como texto genérico, sin logos ni colores); chat genérico (burbujas crema/navy, sin el verde
ni el logo de WhatsApp); la tienda "Casa Pao" con interfaz neutra navy/crema/verde; "el otro lado" donde compra Graciela
nunca se muestra ni se nombra.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Paola = **Aoede** (cambio del coordinador: Autonoe la usa contable-papeles), Mica = **Zephyr** (ninguna de
las dos en los reels del 16 y 17-11), Graciela = Gacrux (la de siempre), narrador del cartel = Rasalgethi (toma reusada "Una tienda online más
tarde.", `reels/hacen-envios/assets/voice/narrador.wav`, con atempo 1,1). Callbacks con el MISMO audio: "¡Pao! La verde la vendí en el
local." (P3 y Q1) y "¡Hola! ¡Ingreso nuevo!" (P8 y Q4).

## Música y efectos (todos reales, ninguno sintetizado; copiados de otros reels del repo, con su crédito de origen)
- Música `bgm/pizzicato.wav`: "Pizzicato Intrigue", younoise, Freesound, CC0 1.0 (https://freesound.org/people/younoise/sounds/569642/).
- Ambiente `sfx/calle.wav`: "Small quiet street ambience", Oper8, Freesound, CC0 (https://freesound.org/people/Oper8/sounds/241135/).
- `sfx/zumbido.wav` (zumbido del tubo en la pausa): "Room Tone Ambience Medium Control Low Hum", gchase, Freesound, CC0.
- `sfx/zumbido-largo.wav` (la cama del depósito), `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`,
  `notification.mp3`, `glitch-1.mp3` ("Reintegro"), `scan.mp3` (el lector de códigos): la biblioteca de sonidos de
  HyperFrames del repo (molde/assets/sfx, como en reels/caso-pedidosya y reels/anotamelo).
- `sfx/vibra.wav`: "Cell phone vibrate, on table hard surface.wav", SpliceSound, Freesound (https://freesound.org/people/SpliceSound/sounds/369839/), CC0.
- `sfx/cero.mp3` (los ding de "Pagado ✓", "Listo", "Quedan 36"): "[UI Sound] Approval - High Pitched Bell Synth", GabFitzgerald, Freesound, CC0 (https://freesound.org/people/GabFitzgerald/sounds/625174/).
- `sfx/campanita.wav` (la puerta del local): "Shop door bell.wav", 775noise, Freesound, CC0 (https://freesound.org/people/775noise/sounds/494565/).
- `sfx/stinger.wav` (el cartel): "Vibraphone Transition Music Cue", DanJFilms, Freesound, CC0 1.0 (primeros 2,2 s).
- `sfx/papel.wav` y `sfx/papel-fuerte.mp3` (el papel de la mesa que sube): "Paper slide", Kingofgamers_cz, Freesound, CC0 1.0 (https://freesound.org/people/Kingofgamers_cz/sounds/352914/); papel-fuerte = recorte de 0,26-0,86 s con +12 dB (de reels/por-que-caminar-mas).
- Kenney (kenney.nl), CC0 1.0: `paso-0..4.wav` ("footstep_concrete_000..004", Impact Sounds); `madera-golpe.wav`
  ("impact_wood_heavy_000", Impact Sounds: las cajas a la vista); `k-plastico.wav` ("impact_generic_light_002": la
  freidora que se levanta); `k-bolsa-0.wav` ("impactSoft_heavy_000": la caja sobre el mostrador); `k-tick-1/2/4.wav`
  (tics de los números y del audio que entra, en lugar del blip sin origen); `k-cloth_1/2.wav` (RPG Audio: el buzo al
  levantar el celular); `k-switch-3.wav` ("switch_003", Interface Sounds: el click de la foto, en lugar de flash.mp3).
- `rasgado.wav` y `k-motor-bajo.wav` quedaron en assets pero ya no se usan (se fue el plano de la etiqueta).
