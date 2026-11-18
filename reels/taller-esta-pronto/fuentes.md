# taller-esta-pronto · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Óscar,
Maxi, Daniel; Graciela y Walter del elenco; Sergio, Fabián y Silvia solo como avatar). **No afirma datos externos,
estadísticas, años ni empresas reales, así que no hubo nada que verificar con WebSearch.** Tampoco afirma nada del
producto que no esté en el brief (aviso del estado del auto por WhatsApp con foto, extra con botón para aprobar, panel
del taller). Los números son del caso que se cuenta, no estadísticas:
- **"Salió a atender"**: 0 → 1 (Graciela, martes 10:00) → 2 (Walter) → 22 (los cortes rápidos hasta el miércoles
  14:30) → 23 (Daniel, miércoles 18:00) → 24 (la ruedita). Unas 11-12 llamadas por día en un taller lleno: creíble para
  "Mecánica Óscar", no se presenta como promedio de nada.
- **El extra de Daniel:** cambio de la bomba de agua, **$ 11.500** (repuesto + mano de obra; precio inventado de
  "Mecánica Óscar", verosímil para Montevideo).
- **El elevador ocupado:** martes 10:00 → miércoles 18:00 ("2 días"). El miércoles había **4 services** en la pizarra
  (9:00, 10:30, 14:00, 16:00) que necesitaban el elevador y no entraron: **4 × $ 6.500 = $ 26.000** (el mismo precio de
  service de `reels/taller-presupuestos`, para que el taller sea coherente).
- **Parte 2:** el extra sale a las 10:02 y Daniel lo aprueba a las 10:04 ("Extra aprobado en 2 minutos"); el auto de
  Daniel baja a las 12:30 y los mismos 4 services entran: "$ 26.000" en verde. "Llamadas '¿está pronto?': 0" y "Salió a
  atender: 0" son del día del caso.

Sin marcas: "Mecánica Óscar" es inventado (de `reels/taller-presupuestos`). Autos genéricos sin logo ni frente
reconocible (el sedán de juguete de taller-presupuestos en otros colores), patentes inventadas en formato uruguayo sin
escudo. Bomba de agua, repuestos y bidón sin marca. **El ómnibus de Daniel es genérico**: interior navy y crema, sin el
color, el logo ni el nombre de ninguna empresa de transporte de Montevideo. Chat del aviso, botón Aprobar, panel,
celulares y tablet genéricos, sin el color ni el logo de ninguna app. La palabra "WhatsApp" va solo en
`descripcion.txt`, como canal.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Óscar = Charon y Maxi = Puck (los de `reels/taller-presupuestos`), Graciela =
Gacrux y Walter = Umbriel (las de siempre del elenco), **Daniel = Schedar** (personaje nuevo; en el repo Schedar solo
lo usaron secundarios: el proveedor de la-lista y Bruno de veterinaria-vacunas; ningún recurrente; si se parece a
Óscar, probar Achird), narrador del cartel = Rasalgethi (toma nueva: "Un aviso automático más tarde."). Tonos en
`partes/lineas.tsv`, detalle en `partes/voces.md`.

## Música y efectos
Los del repo, con su crédito en los `fuentes.md` de donde vienen (copiar de `reels/taller-presupuestos/assets/sfx`, que
ya tiene el set del taller: `elevador.wav`, `llaves.wav`, `gota.wav`, `puerta-auto.wav`, `calle.wav`, `vibra.wav`,
`k-metal-*`, `k-neumatico-abre`, `k-tono`, `k-dos-tonos`, `k-tick-*`, `k-cloth_*`, `sorbo.wav`, `stinger.wav`,
`cero.mp3`, `notification.mp3`, `whoosh*`, `pop.mp3`, `click-soft.mp3`; créditos en `reels/taller-presupuestos/fuentes.md`
y en los que ese cita). **Probablemente haya que sumar** (el constructor los busca primero en `assets/sfx` de otros
reels; si no están, uno real con licencia CC0, con autor, sitio y licencia anotados acá; nunca sintetizado con ffmpeg):
- **las rueditas de la camilla sobre el hormigón** (rodada corta de ida y de vuelta; sirve una silla de oficina o un
  carro con ruedas rodando sobre piso duro),
- **el timbre de un celular** (un ringtone genérico CC0, sin el tono de ninguna marca; si no, `vibra.wav` + `k-tono`),
- **la ruedita que se sale y rueda** (un "tac" de plástico, `k-plastico.wav`, y una rodada liviana que se aleja),
- **ambiente de ómnibus** (motor de ómnibus urbano por dentro, frenada, el timbre de parada),
- **llave de crique / matraca** (ratchet) y **pistola neumática** para el trabajo del taller (`k-neumatico-abre` ya está),
- **la radio del taller** (la cama de `bgm` con pasabajos, como la radio de dist-cliente-grande).
