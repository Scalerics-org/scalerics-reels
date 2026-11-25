# pizzeria-pedidos · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Tano,
Martín, Facu, Lucía, Sabri). **No afirma datos externos, estadísticas, años ni empresas reales.** No dice cuántos
pedidos se pierden en general ni cuánto cuesta una pizza en Uruguay: todos los números son del caso.

## Lo único real: el nombre de la calle
- **Duvimioso Terra** (en el reel, "Duvimioso Terra 1432") es una calle real de Montevideo (La Comercial / Tres Cruces).
  Se usa solo como nombre de calle difícil de deletrear por teléfono; el número 1432 es inventado y no se refiere a
  ninguna casa ni comercio. Fuentes:
  - https://c21responsive.immobel.com/property/duvimioso-terra-1111-la-comercial-montevideo-11800-uruguay-C21114228955-USD
    ("Duvimioso Terra 1111, La Comercial, Montevideo").
  - https://www.infocasas.com.uy/venta-casa-en-ph-tres-dormitorios-en-tres-cruces/193953201 (calle Duvimioso Terra,
    entre Hocquart y Nueva Palmira, Tres Cruces).
- "Dubimioso" (con B) es como lo escribe Tano en la comanda: no existe, es el chiste.

## Números del caso (no son estadísticas)
- "Una muzza y dos fainá": Muzza $ 520 + 2 fainá × $ 110 = **$ 740** (los precios de Lucía Pizzas en su menú; los de Don
  Tano se asumen iguales).
- "Mensajes sin contestar: 26" (el celular de Tano, ese viernes a las 21:00).
- "Pizzas que volvieron hoy: 3" y "$ 2.220" (3 × $ 740, la cuenta de Tano ese viernes).
- Lucía, ese viernes: "64 pedidos", "Pagados online 64", "Dirección con mapa 64", "Pizzas que volvieron 3 → 0" y
  "Sin contestar 26 → 0" (el 3 y el 26 son los de Tano, puestos al lado para comparar: es la ficción del caso, no una
  promesa de resultado). "Pedido #47", "Llega 22:55", "entregado 22:54".

## Sin marcas
"Pizzería Don Tano" y "Lucía Pizzas" son inventadas. Chat genérico (burbujas crema/navy, sin el verde ni el logo de
WhatsApp); el pago es un botón "Pagar" genérico, sin logos de medios de pago ni de billeteras; ningún nombre de app de
delivery; celulares, impresora de tickets, tablet y motos sin logo; cajas de pizza kraft con el nombre inventado del
local; latas y botellas sin etiqueta.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Tano = Algieba, Martín = Enceladus, Facu = Puck, Sabri = Despina, Lucía =
Erinome, narrador del cartel = Rasalgethi (toma nueva: "Mientras tanto, en la de enfrente."). Ver `partes/voces.md`.

## Música y efectos
Los de siempre del repo (crédito en `reels/la-lista/fuentes.md`, `reels/ya-lo-cargo/fuentes.md`,
`reels/dice-cuarenta/fuentes.md`, `reels/parrilla-no-vuelve/fuentes.md` y `reels/vete-racion/fuentes.md`): pop,
whoosh, whoosh-short, notification, vibra, cero, campanita, click-soft, k-tick-*, k-cloth_*, paso-*, stinger, timbre,
puerta-abre, birome (de resto-reservas), música de cama. **Para completar el constructor (sonidos que hacen falta y
quizás no están en `assets/sfx`):** impresora térmica de tickets, ambiente de cocina de restaurante (extractor, horno),
cartón de caja de pizza que se abre, moto de reparto chica que arranca y se va, morder/masticar. Solo grabaciones reales
con licencia CC0 (anotar acá autor, sitio y licencia); nunca sintetizados con ffmpeg. Si alguno no aparece, el más
cercano de `assets/sfx` y anotarlo.
