# importadora-dolar · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Paola,
Seba, Mica y Graciela). **No afirma datos externos, estadísticas, años, cotizaciones ni empresas reales**, así que no
hubo nada que verificar con WebSearch. Lo único "técnico" (que si vendés por debajo de lo que te cuesta reponer, con lo
cobrado no te alcanza para traer lo mismo) no se presenta como dato ni como norma: sale de la cuenta del caso, que se ve
entera en pantalla. No se dice cómo funciona una importación (aduana, tributos, despachante): solo "la factura del
contenedor nuevo" (la proforma en USD), que es como se habla en el rubro.

## Números del caso (no son estadísticas, cotizaciones ni promesas de resultado)
Todos los montos en pesos uruguayos; el dólar del caso es un número redondo escrito a mano en el pizarrón, sin fecha ni
fuente, y no pretende ser la cotización de ningún día.
- **Lista de JULIO** (la pegada en la columna): ventilador de pie 16", costo USD 38 × dólar 40 = $ 1.520, margen 28 %
  → $ 1.945,60 → **$ 1.950** (redondeado).
- **Contenedor vendido:** 500 ventiladores × $ 1.950 = **$ 975.000** cobrados.
- **Proforma del contenedor nuevo:** 500 ventiladores × **USD 46** = **USD 23.000**. Dólar del pizarrón: **40 → 43**.
  Reponer: USD 23.000 × 43 = **$ 989.000** ($ 1.978 cada uno).
- **Diferencia:** $ 975.000 − $ 989.000 = **− $ 14.000**. Con lo cobrado se traen $ 975.000 / $ 1.978 = 492,9 → **492
  de 500** (8 huecos en el contenedor).
- Graciela pide **200 más** a lista de julio: 200 × $ 1.950 = $ 390.000 contra $ 395.600 de reponerlos (− $ 5.600, si
  se muestra).
- **Parte 2, con el sistema:** costo USD 46 × 43 = $ 1.978, margen 28 % → $ 2.531,84 → **$ 2.530** (redondeado a la
  decena). 500 × $ 2.530 = $ 1.265.000; − $ 989.000 = **+ $ 276.000** después de reponer ("500 de 500 ✓").
- **Margen mínimo 18 %:** $ 1.978 × 1,18 = $ 2.334,04. Descuento −10 %: $ 2.530 × 0,90 = **$ 2.277** (debajo del
  mínimo, rojo). Descuento −5 %: $ 2.530 × 0,95 = $ 2.403,50 → **$ 2.404** (arriba del mínimo, ✓).
- Las otras filas del panel (mismo margen 28 %, redondeo a la decena): **ventilador de techo** $ 3.900 (julio) → **$ 5.060**;
  **caloventor** $ 1.290 (julio) → **$ 1.670**. (Al nuevo costo en dólares del caso; son ejemplos de la lista recalculada, sin
  proforma propia en pantalla.)
- En la factura proforma (del proveedor): "Precio c/u **USD 46**" y "antes USD 38" tachado (el precio con el que se armó la lista de
  julio). El panel de Paola dice "Costo USD 46" (el precio del proveedor que carga el sistema; no "costo puesto", que en el rubro
  incluye flete y aduana y el reel no los muestra).
- "Recalculado solo · **38 productos**": la cantidad de artículos de Casa Pao en la ficción.

## Lo que se dice del producto (que sea realista)
Un sistema a medida de Scalerics para importadoras: cada producto tiene su costo en dólares (el de la última proforma o
el que se cargue) y su margen; el dólar se actualiza en el sistema (lo carga la empresa o lo toma de la fuente que
elija; el reel no nombra ninguna); cuando cambia el dólar o el costo, los precios en pesos se recalculan solos con el
redondeo que se defina; el vendedor en el celular y el catálogo del cliente muestran siempre el precio vigente; y si un
precio o un descuento deja el margen por debajo del mínimo, avisa. Es lo que hace cualquier sistema de precios a medida
conectado a costos; no se promete ningún resultado en números fuera del caso. No es un agente de IA y no se lo llama así.

## Sin marcas
"Casa Pao · Importados", "Bazar Graciela" son inventados. Ventiladores, contenedor, calculadora, pizarrón, celulares,
tablet y chat genéricos, sin marcas ni logos (cajas kraft con "VENTILADOR DE PIE 16"" en navy, contenedor navy liso sin
naviera). Ningún banco, casa de cambio ni fuente de cotización se nombra ni se dibuja.

## Voces (propuestas)
Gemini TTS con `herramientas/voz.mjs`: Paola = **Aoede** (la de `tienda-tenes-stock`), Mica = **Zephyr** (la de
`tienda-tenes-stock`), **Seba = Umbriel** (personaje nuevo; si suena parecido a otro vendedor del feed, Sadaltager),
narrador del cartel = Rasalgethi (audio reusado de `reels/ya-lo-cargo/assets/voice/narrador.wav`, "Un sistema más
tarde."). Graciela no habla (solo su nombre en el chat).

## Música y efectos (todos reales, ninguno sintetizado con ffmpeg)
Reusados del repo, con el crédito de su origen (ver `reels/tienda-tenes-stock/fuentes.md`, `reels/dist-comisiones/fuentes.md`,
`reels/gym-cupo/fuentes.md`, `reels/ferreteria-encargo/fuentes.md`):
- Música `bgm/pizzicato.wav` y `bgm/pizzicato-lleno.wav` (derivado con eco): "Pizzicato Intrigue", younoise, Freesound, CC0 1.0
  (https://freesound.org/people/younoise/sounds/569642/). En el montaje P5, el mismo tema acelerado (asetrate 1,2).
- Ambiente del patio `sfx/calle-tramo.wav` (calle.wav recortado a 2,0-15,4 s para que el loop no vuelva al retumbe del principio): "Small quiet street ambience", Oper8, Freesound, CC0 (https://freesound.org/people/Oper8/sounds/241135/);
  `sfx/pajaro.wav` (pájaros de la mañana): "Bird Chirp", swiftoid, Freesound, CC0 (viene de hacen-envios).
- `sfx/ventilador.wav` (el ventilador de pie, en loop; en P6 se apaga con un fundido de 1,25 s): "Electric fan 2" (#0079),
  BigSoundBank, Joseph Sardin, CC0 1.0 (https://bigsoundbank.com/electric-fan-2-s0079.html).
- Las teclas de la calculadora son `key-press.mp3` (crédito en
  `reels/dist-comisiones/fuentes.md`).
- Kenney (kenney.nl), CC0 1.0: `paso-0..4.wav` (los pasos de Seba), `madera-golpe.wav` (la palma en la mesa), `k-chapa-pesada.wav`
  (el golpe sordo de los 8 huecos), `k-tick-1.wav`, `k-page-turn.wav`, `k-book_place_1.wav`, `k-cloth_1/2.wav`.
- `pop.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `click-soft.mp3`, `notification.mp3`, `glitch-1.mp3`, `vibra.wav`, `cero.mp3`,
  `stinger.wav`, `papel.wav`: los de siempre del repo (crédito en `reels/tienda-tenes-stock/fuentes.md`).

- `sfx/interruptor.wav` (el clic del ventilador que se apaga en P6): "switch_002", Kenney (kenney.nl), CC0 1.0 (de reels/tienda-tenes-stock).
- `sfx/ventilador-baja.wav` (el ventilador que se frena): DERIVADO de `ventilador.wav` ("Electric fan 2", BigSoundBank, CC0), seis tramos
  de 0,24 s con asetrate 0,95 → 0,36 y volumen que baja, en fila; no es sintetizado.

**Nuevo (CC0):**
- `sfx/bsb-marcador.wav` (el marcador en el pizarrón: borra el 40, escribe el 43): dos tramos (0,65-1,2 s y 4,15-4,8 s) de
  "Whiteboard marker" (#0807), BigSoundBank, Joseph Sardin, CC0 1.0 (https://bigsoundbank.com/search?q=marker; archivo
  https://bigsoundbank.com/UPLOAD/mp3/0807.mp3), con fundidos de 20-50 ms.

## Voces
Gemini TTS (`herramientas/voz.mjs`): Paola = **Aoede**, Mica = **Zephyr**, Seba = **Umbriel** (nuevo). Narrador del cartel =
Rasalgethi, audio REUSADO de `reels/ya-lo-cargo/assets/voice/narrador.wav` ("Un sistema más tarde.", atempo 1,1). Graciela no
habla. Tomas elegidas y cortes en `partes/procesar.sh` y `NOTAS-constructor.md`.
