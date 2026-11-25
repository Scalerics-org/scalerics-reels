# dist-comisiones · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Rubén,
Nico, Javi y Graciela). **No afirma datos externos, estadísticas, años ni empresas reales**, así que no hubo nada que
verificar con WebSearch. Que la comisión se pague sobre lo cobrado (y no sobre lo facturado) no se presenta como norma
ni como dato del rubro: es la regla de la Distribuidora Rubén en el caso.

## Números del caso (no son estadísticas ni promesas de resultado)
- Comisión: **3 % de lo cobrado** (regla de la ficción).
- **Nico** (zona Este): vendido $ 1.500.000 · cobrado $ 1.400.000 (Bar Walter pagó la mitad de una factura de
  $ 200.000: quedan $ 100.000 pendientes) · comisión **$ 42.000**. Su propia cuenta: lo vendido más Súper Héctor,
  $ 2.000.000 × 3 % = **$ 60.000**.
- **Javi** (zona Centro): vendido $ 1.300.000 (incluye Súper Héctor, pedido 0388, $ 500.000, cargado por Javi el 14/10
  a las 10:12) · cobrado $ 1.200.000 (Panadería Nelly, $ 100.000 pendientes) · comisión **$ 36.000**. Su cuenta:
  $ 1.300.000 × 3 % = **$ 39.000**.
- **Facturó la empresa:** $ 1.500.000 + $ 1.300.000 = **$ 2.800.000**. Lo que dicen los dos: $ 2.000.000 + $ 1.300.000 =
  **$ 3.300.000** (Súper Héctor contado dos veces: + $ 500.000). Comisiones del mes: **$ 78.000**.
- **Devolución de Graciela** (clienta de Nico): 6 cajas de aceite × $ 1.100 (el precio de la caja en dist-quien-debe) =
  $ 6.600 → 3 % = **$ 198** → Nico **$ 41.802**; comisiones del mes **$ 77.802**.
- Tiempo del caso: el cálculo a mano va del día 1, 8:00 al día 2, 19:00; la devolución lo lleva al día 3 y los sueldos
  se atrasan ("Pasá el jueves"). Con el sistema: "Cerrado ✓ · Día 1, 8:00".
- **214 remitos** del mes (los de los dos vendedores, en la ficción).

## Lo que se dice del producto (que sea realista)
Un sistema a medida de Scalerics para distribuidoras: cada pedido se carga con su vendedor; cuando el pago del cliente
se registra, la comisión de ese vendedor se calcula sola según la regla de la empresa (acá, 3 % de lo cobrado); las
devoluciones y notas de crédito la descuentan; lo pendiente se muestra aparte; cada vendedor ve la suya en el celular y
el dueño ve el panel por vendedor y el cierre del mes. Es lo que hace cualquier sistema de comisiones a medida
conectado a pedidos y cobranzas; no se promete ningún resultado en números fuera del caso. No es un agente de IA y no
se lo llama así.

## Sin marcas
"Distribuidora Rubén", "Súper Héctor", "Rotisería Graciela", "Bar Walter", "Panadería Nelly" son inventados. La planilla
es genérica (grilla gris, sin el color ni el logo de ningún programa; "Excel" y ".xlsx" solo como palabra, como se dice
en el rubro). Calculadora, celulares, monitor, calendario y caja de pizza genéricos, sin marcas.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Rubén = Algenib, Nico = Fenrir, Graciela = Gacrux (las de siempre del elenco),
**Javi = Achird** (personaje nuevo), narrador del cartel = Rasalgethi (audio reusado de `reels/ya-lo-cargo`:
"Un sistema más tarde."). Tonos en `partes/lineas.tsv`.

## Música y efectos
Música: `bgm/pizzicato-lleno.wav` y `bgm/pizzicato.wav` (de reels/tienda-tenes-stock vía dist-cartera; crédito en
`reels/dist-cartera/fuentes.md`). Efectos reusados de `assets/sfx` (copiados de dist-cartera, con su crédito en los
`fuentes.md` de origen: `reels/dist-cartera/fuentes.md`, `reels/dist-quien-debe/fuentes.md`,
`reels/dist-cliente-grande/fuentes.md`, `reels/gym-cupo/fuentes.md`): `pop`, `whoosh`, `whoosh-short`, `notification`,
`vibra`, `cero`, `click-soft`, `key-press`, `sorbo`, `stinger`, `zumbido` (gchase, Freesound, CC0), `elevador`,
`bsb-palmada` (BigSoundBank "Slaps" #0597, CC0: la palmada seca de "Felicitaciones."), Kenney CC0 (`k-tick-1`,
`k-page-turn` para la hoja del calendario, `k-book_place_1` para las cajas que caen y asientan, `k-cloth_1/2`,
`k-metal-click` para el golpecito en el vidrio). `glitch-1.mp3` ("Recalculando…") de la biblioteca de HyperFrames del
repo (`molde/assets/sfx`). Nada sintetizado con ffmpeg.

Nuevos en este reel (BigSoundBank, Joseph Sardin, licencia CC0 1.0; bajados en mp3 y recortados a .wav sin procesar):
- `assets/sfx/bsb-ronquido.wav` (Nico y Javi dormidos en la escalera; 4,2-5,8 s): "Man snoring" (#0170),
  https://bigsoundbank.com/man-snoring-s0170.html
- `assets/sfx/bsb-calculadora.wav` (la calculadora con rollo en el montaje; 0-4,3 s): "Old calculator, calculation and
  ticket #1" (#3265), https://bigsoundbank.com/old-calculator-calculation-and-ticket-1-s3265.html
- `assets/sfx/bsb-calc-impresora.wav` (la cinta que sale hasta el piso; 0-1,75 s): "Calculator printer #1" (#3553),
  https://bigsoundbank.com/calculator-printer-1-s3553.html
No se usó aplauso de público: el "aplauso solo" es la palmada seca.
