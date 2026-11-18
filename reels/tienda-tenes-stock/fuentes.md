# tienda-tenes-stock · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Paola,
Mica; Graciela y Walter del elenco). **No afirma datos externos, estadísticas, porcentajes, años ni empresas reales.**
Los números son del caso que se cuenta:
- "Casa Pao · Importados" (inventada) importa freidoras de aire de 4 L en tres colores y las vende por redes y en un
  local chico adelante del depósito. Precio del caso: **$ 4.990** cada una (inventado; no se presenta como precio de
  mercado).
- Parte 1: el cuaderno dice "VERDE: 1"; la última verde se vende dos veces (a Graciela por chat, pagada, y en el local);
  reintegro de $ 4.990; debajo de la mesa de fotos y en la pared hay **40 verdes del contenedor de marzo sin cargar** →
  40 × $ 4.990 = **$ 199.600 parados desde marzo**.
- Parte 2: Verde quedan 2 → 1 → sin stock; envío a domicilio $ 190 (total $ 5.180); pedido #214; pedido por mayor de
  "Bazar del Puerto" (inventado) de 10 azules (Azul 25 → 15); ingreso de 40 verdes, 12 avisados que esperaban y 12
  pedidos pagos (40 → 28). Todo ficción del caso.

## Lo que se buscó y por qué el guion no lo dice
Se buscó (WebSearch, 18-11) el precio de una freidora de aire de 4 litros en Uruguay: los resultados de comercios
uruguayos (Megatone, Sodimac Uruguay) no mostraban precio en la página indexada, y los que sí tenían precio eran de otros
países (Argentina, Colombia):
- https://www.megatone.net/producto/freidora-de-aire-mondial-afn-40-bi-4l-220v-60hz-cocina-saludable-y-sin-aceite_MKT0931MHM/
- https://www.sodimac.com.uy/sodimac-uy/product/3346412

**Decisión:** el precio queda como dato del caso ("Casa Pao"), sin presentarlo como precio de referencia, y el guion no
dice cuánto cuesta una freidora "en general" ni cuánto tarda un contenedor. Las marcas que aparecieron en la búsqueda no
se nombran ni se dibujan: las freidoras y sus cajas son genéricas.

Sin marcas: ninguna red social, marketplace ni procesadora de pago nombrada ni dibujada ("redes", "Pagar con tarjeta o
débito", "link de pago" solo como texto genérico, sin logos ni colores); chat genérico (burbujas crema/navy, sin el verde
ni el logo de WhatsApp); la tienda "Casa Pao" con interfaz neutra navy/crema/verde; "el otro lado" donde compra Graciela
nunca se muestra ni se nombra.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Paola = **Autonoe**, Mica = **Zephyr** (ninguna de las dos en los reels del 16 y
17-11), Graciela = Gacrux (la de siempre), narrador del cartel = Rasalgethi (toma reusada "Una tienda online más
tarde.", `reels/hacen-envios/assets/voice/narrador.wav`). Callbacks con el MISMO audio: "¡Pao! La verde la vendí en el
local." (P3 y Q1) y "¡Hola! ¡Ingreso nuevo!" (P8 y Q4).

## Música y efectos
Los de siempre del repo (con su crédito en `reels/inmobiliaria-visitas/fuentes.md`, `reels/pilates-cuota/fuentes.md`,
`reels/veterinaria-vacunas/fuentes.md` y `reels/ya-lo-cargo/fuentes.md`). Sonidos que probablemente haya que sumar (el
constructor los busca primero en `assets/sfx` de otros reels; si no están, uno real con licencia CC0 y anota acá autor,
sitio y licencia; nada sintetizado con ffmpeg): **click de foto de celular**, **papel grande que se enrolla**, **cinta de
embalar**, **bip de lector de código de barras**, **impresora de etiquetas**, **campanita de puerta de comercio**
(ver parrilla-no-vuelve / veterinaria-vacunas), **zumbido de tubo fluorescente**, **caja de cartón apoyada**.
