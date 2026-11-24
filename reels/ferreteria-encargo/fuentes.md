# ferreteria-encargo · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Gustavo,
Tito, Susana). **No afirma datos externos, estadísticas, años ni empresas reales.** Que los encargos anotados en papel
se pierden y que la pieza queda sin avisar no se presenta como dato ni porcentaje: es lo que le pasa a Gustavo.

## Lo único del mundo real que aparece en pantalla (verificado)
- **"Cartucho 35 mm" de una canilla monocomando:** los cartuchos cerámicos de monocomando se venden por diámetro, y
  35 mm y 40 mm son las medidas habituales (por eso Gustavo lo mide con el calibre antes de encargarlo).
  - [ManoMano: cartucho cerámico de 40 mm para monomando (indica medir el diámetro; 35/40 mm)](https://www.manomano.es/p/cartucho-de-grifo-de-cermica-cecipa-sedal-de-40-mm-para-reemplazo-de-vlvula-monomando-52099092)
  - [La Tienda de Electricidad: cartucho cerámico Ø 35 mm, recambio de monomandos](https://latiendadeelectricidad.com/gb/articulos-fontaneria/330127-ceramic-cartridge-o-35-mm-oryx-mixer-spare-8435450446207.html)
  - [Easy Argentina: "Cartucho monocomando cocina 35 mm"](https://www.easy.com.ar/cartucho-monocomando-cocina-35-mm/p) (solo para el nombre del producto en el Río de la Plata; no se usa ningún precio ni marca).

## Números del caso (no son estadísticas ni promesas de resultado)
- **Cartucho 35 · $ 780** (el precio de venta en lo de Gustavo; número del caso).
- **Llegaron y nadie avisó: 9 · $ 14.300** = las 9 piezas del cajón ENCARGOS a precio de venta de Gustavo: cartucho 35
  $ 780 · flotador de cisterna $ 650 · llave de paso 3/4 $ 1.450 · 4 bisagras cazoleta $ 1.200 · sifón de pileta $ 890 ·
  válvula de descarga $ 2.400 · canilla de servicio $ 1.300 · cerradura $ 3.900 · brazo de ducha $ 1.730 = $ 14.300.
- Parte 2, panel "Encargos": Pendientes 4 · Avisados 3 · Retirados 12; "Llegaron y nadie avisó: 9 → 0" (ese mes, en la
  ficción del caso).
- Días del caso: encargo el sábado 10:00; llega el martes 9:00; Susana vuelve "tres semanas después" (parte 1). Parte 2:
  aviso el martes 9:02 ("te lo guardamos hasta el sábado"), recordatorio el jueves a los que no retiraron, Susana retira
  el miércoles 18:00.
- El celular de Susana nunca se ve entero ("099 4…" / "099 4·· ···"): ningún número real en pantalla.

## Lo que se dice del producto (que sea realista)
Un sistema a medida de Scalerics con avisos automáticos por WhatsApp: el encargo se carga con nombre, celular, pieza y
proveedor; al cargar la entrada de mercadería (remito o factura del proveedor, o escaneo del código) el sistema cruza
los productos con los encargos pendientes y manda el aviso; si no se retira, un recordatorio; panel con pendientes,
avisados y retirados. Mandar ese aviso por WhatsApp a un cliente que dejó su número es lo que la plataforma de WhatsApp
Business permite con plantillas de categoría "utilidad" (avisos sobre un pedido o una solicitud del cliente, sin
promociones), incluso fuera de la ventana de 24 h; requiere que el cliente haya aceptado recibir mensajes (lo acepta al
dejar su número para el aviso):
- [Meta for Developers · Template categorization (utility: confirmaciones y actualizaciones de pedidos)](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization)
- [Meta for Developers · Utility templates](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/utility-templates/utility-templates)
- [SleekFlow · Guide to using Utility message templates](https://help.sleekflow.io/whatsapp/guide-to-using-utility-message-templates) (segunda fuente, de un proveedor)

El reel no nombra la API ni promete resultados en números fuera del caso. No es un agente de IA y no se lo llama así.

## Sin marcas
"Materiales Gustavo" es inventado (corralon-portland). Cartucho, flotador, blísteres, calibre, caja registradora, tablet y
celulares genéricos, sin logo ni colores de ninguna marca. Chat genérico (burbujas crema y navy, sin el verde ni el logo
de WhatsApp); "WhatsApp" se nombra solo como canal, en la línea chica final y en `descripcion.txt`.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Gustavo = Alnilam y Tito = Enceladus (los de corralon-portland), Susana =
Vindemiatrix (nueva para este personaje), narrador del cartel = Rasalgethi (audio reusado de
`reels/ya-lo-cargo/assets/voice/narrador.wav`, "Un sistema más tarde."). Detalle en `partes/voces.md`.

## Efectos
Los que se reusan vienen de `reels/corralon-portland/assets/sfx` y `reels/resto-reservas/assets/sfx` (`birome.wav`,
BigSoundBank CC0) con su crédito en los `fuentes.md` de esos reels. Los nuevos (papel contra la cuchilla, cinta adhesiva,
tornillos en papel) los agrega el constructor acá: autor, sitio y licencia CC0. Nada sintetizado con ffmpeg.

Nuevos en este reel (todos BigSoundBank, Joseph Sardin, licencia CC0 1.0; bajados en mp3 y recortados/pasados a .wav sin
procesar el sonido):
- `assets/sfx/bsb-cinta.wav` (la cinta que pega y despega el papelito; 0-0,75 s): "Adhesive tape #2" (#0298), https://bigsoundbank.com/adhesive-tape-2-s0298.html
- `assets/sfx/bsb-rasga.wav` (el papel contra la cuchilla dentada): "Torn paper #2" (#3239), https://bigsoundbank.com/torn-paper-2-s3239.html
- `assets/sfx/bsb-rasga2.wav` (el segundo pedazo, P5 y Q2): "Torn paper #3" (#3240), https://bigsoundbank.com/torn-paper-3-s3240.html
- `assets/sfx/bsb-cajon-madera.wav` (el cajón ENCARGOS): "Wooden drawer opening" (#1499), https://bigsoundbank.com/wooden-drawer-opening-s1499.html
- `assets/sfx/bsb-cajoncito.wav` (el cajoncito metálico del "8"; 0-1,15 s): "Metal drawers #1" (#0792), https://bigsoundbank.com/metal-drawers-1-s0792.html
- `assets/sfx/bsb-clavo.wav` (los tornillos que caen; 0,72-1,95 s): "Nail falling on tiles" (#0461), https://bigsoundbank.com/clou-qui-tombe-sur-carrelage-s0461.html
- `assets/sfx/papel.wav` (el papel que se dobla en cucurucho): "Paper slide", Kingofgamers_cz, Freesound, CC0 1.0, https://freesound.org/people/Kingofgamers_cz/sounds/352914/
- `assets/sfx/gota.wav` (la canilla que gotea): "Drops of water #1" (#1384), BigSoundBank, CC0 1.0 (de reels/taller-presupuestos).
