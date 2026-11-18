# dist-quien-debe · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Rubén,
Graciela, Nico y Patricia, la ejecutiva del banco). **No afirma datos externos, estadísticas, años ni empresas reales**,
así que no hubo nada que verificar con WebSearch. Los números son del caso que se cuenta, no estadísticas:
- Cuenta de la Distribuidora Rubén el viernes de la parte 1: **saldo − $ 140.000**; **sueldos de hoy $ 780.000** (unos
  15 empleados; monto del caso, no un promedio de nada).
- La calle le debe **$ 1.012.000** ("un millón") repartidos en **38 clientes**, en una planilla de **312 filas**.
- Rotisería Graciela: factura **0431** a **30 días** que va por **94**; saldo **$ 186.000**. El pedido de la llamada:
  **20 cajas de aceite × $ 1.100 = $ 22.000** → Graciela $ 208.000; "Te deben" $ 1.012.000 + $ 22.000 = **$ 1.034.000**.
- Parte 2: factura **0517** de Graciela, **$ 48.600**, vence el martes. Panel: "Vencido" baja de $ 1.012.000 a
  **$ 96.400** = Kiosco Beto $ 22.400 (12 días) + Bar Walter $ 31.000 (5 días) + Súper Héctor $ 43.000 (3 días).
- Viernes de la parte 2: entró en la semana **$ 1.240.000**; − $ 140.000 + $ 1.240.000 − $ 780.000 de sueldos =
  **saldo + $ 320.000**.

Sin marcas: "Distribuidora Rubén", "Rotisería Graciela", "Súper Héctor", "Bar Walter", "Kiosco Beto", "Panadería
Nelly", "Cafetería Marta" son inventados. **El banco no tiene nombre, logo ni colores de ningún banco real** (box crema
y navy, turnero navy). Chat, botón de pago, planilla y celulares genéricos, sin el color ni el logo de ninguna app o
programa. Productos sin marca (aceite en caja kraft). WhatsApp se nombra solo en `descripcion.txt`, como canal.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Rubén = Algenib, Graciela = Gacrux, Nico = Fenrir (las de siempre del elenco),
Patricia = **Pulcherrima** (en el repo solo la usó Romina, secundaria de inmobiliaria-visitas, 17-11; no es de ningún
personaje recurrente ni de los reels del 18-11), narrador del cartel = Rasalgethi (toma nueva: "Una cobranza automática
más tarde."; fallback: la de `reels/ya-lo-cargo`). Tonos en `partes/lineas.tsv`.

## Música y efectos
De `assets/sfx` y `assets/bgm` del repo, con su crédito en los `fuentes.md` de los reels de donde vienen
(`k-dos-tonos`, `k-tono`, `k-switch-3`, `k-creak`, `k-tick-*`, `k-cloth_*`, `k-plato-000`: Kenney, CC0; `sorbo.wav`,
`vibra.wav`, `notification.mp3`, `puerta-auto.wav`, `motor.mp3`, `whoosh*`, `pop.mp3`, `stinger.wav`, `cero.mp3`,
`key-press.mp3`: ver `reels/dist-cliente-grande/fuentes.md` y `reels/dist-pedidos-lunes/fuentes.md`).
**Faltan y los busca el constructor (reales, CC0, con autor, sitio y licencia anotados acá):** caja registradora
("ka-ching"), ding-dong de turnero de banco y chisporroteo de pollo al spiedo. Si no aparece un ding-dong CC0, se usa
`k-dos-tonos.wav` con pasabajos. Nunca sintetizados con ffmpeg.
