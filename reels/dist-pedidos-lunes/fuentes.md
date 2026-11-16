# dist-pedidos-lunes · fuentes

Reel de dolor + solución con Rubén en la distribuidora (comedia de situación, línea de "ANTES QUE TODO", Juan 15-11):
**no afirma datos externos**, estadísticas, años ni empresas reales. No hay nada que verificar con WebSearch.
Todos los números son **del caso contado** y de ficción: los 40 pedidos del lunes, el audio de 4:12, el de 6:40, las
8:00 → 11:00 pasando a mano, "39 de 40", el pedido de Walter de las 8:04, "40 de 40 ✓" a las 8:05, "Cargados a mano: 0"
y los precios del catálogo, de ficción pero en el orden de un mayorista uruguayo de 2026 (revisión de guion, 16-11):
aceite girasol 1,5 L x 12 $ 2.300 · harina 000 25 kg $ 900 · azúcar 1 kg x 10 $ 450 · agua 2 L x 6 $ 330 (lo de siempre de
Graciela: 4 · 2 · 1 · 3 = $ 12.440) · café en grano 1 kg $ 1.300 (Marta x 7 = $ 9.100) · leche 1 L x 12 $ 520. Son
referencias aproximadas, no cotizaciones: no se presentan como dato.

Sin marcas: chat genérico (burbujas crema y verdes, sin logo ni colores de ninguna app), planilla genérica (no se
dibuja ícono ni interfaz de ningún programa), catálogo y panel de la "Distribuidora Rubén" (inventada), productos sin
marca.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Rubén = Algenib, Graciela = Gacrux, Walter = Umbriel, Nico = Fenrir, narrador del
cartel = Rasalgethi (toma nueva "Un catálogo de pedidos más tarde."; fallback: la de
`reels/ya-lo-cargo/assets/voice/narrador.wav`). Ver `partes/voces.md`.

## Música y efectos
Los de siempre del repo (copiados de `reels/dice-cuarenta/assets/` y `reels/la-lista/assets/`, con su crédito en
`reels/la-lista/fuentes.md`, `reels/ya-lo-cargo/fuentes.md` y `reels/dice-cuarenta/fuentes.md`).

Nuevos en este reel: ninguno. Desde la nube no se pudo bajar nada (opengameart.org y el espejo de Kenney en GitHub
devuelven error por el proxy), así que no hay archivos nuevos y nada se sintetizó con ffmpeg. Los tres sonidos pendientes
se resolvieron con los del repo:
- tic-tac del reloj de pared: `k-tick-1.wav`, `k-tick-2.wav`, `k-tick-4.wav` (Kenney, CC0 1.0, ya acreditados en
  `reels/dice-cuarenta/fuentes.md`), más graves (asetrate 0,62-0,70) y con pasabajos; el time-lapse los acelera.
- chorro de termo: no hay; las tres cebadas suenan con `k-plastico.wav` (Kenney, CC0) del termo que se inclina.
- sorbo de mate en vacío: `sorbo.wav` del repo con pasaaltos (suena más hueco, a bombilla en vacío).
