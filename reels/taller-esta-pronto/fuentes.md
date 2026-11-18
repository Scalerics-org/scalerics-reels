# taller-esta-pronto · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Óscar,
Maxi, Daniel; Graciela y Walter del elenco; Sergio y Silvia solo como avatar). **No afirma datos externos,
estadísticas, años ni empresas reales, así que no hubo nada que verificar con WebSearch.** Tampoco afirma nada del
producto que no esté en el brief (aviso del estado del auto por WhatsApp con foto, extra con botón para aprobar, panel
del taller). Los números son del caso que se cuenta, no estadísticas:
- **"Óscar salió a atender"**: 1 (Graciela, martes 10:00) → 5 (Walter, martes 12:10) → 14
  (Silvia, miércoles 9:00) → 22 (Graciela, miércoles 14:30) → 23 (Daniel, miércoles 18:00) → 24 (la ruedita). Unas 11-12 llamadas por día en un taller lleno: creíble para
  "Mecánica Óscar", no se presenta como promedio de nada.
- **El extra de Daniel:** cambio de la bomba de agua, **$ 11.500** (repuesto + mano de obra; precio inventado de
  "Mecánica Óscar", verosímil para Montevideo).
- **El elevador ocupado:** martes 10:00 → miércoles 18:00 ("Elevador ocupado: martes y miércoles"). El miércoles había
  **4 services** en la pizarra (9:00 Pablo, 10:30 Andrés, 14:00 Nelly, 16:00 Ramón: ninguno de los que llaman) que necesitaban el elevador y no entraron: **4 × $ 6.500 = $ 26.000** (el mismo precio de
  service de `reels/taller-presupuestos`, para que el taller sea coherente).
- **Parte 2:** el extra sale con foto y precio y Daniel lo aprueba con un botón desde el ómnibus
  ("Extra aprobado desde el ómnibus"; el rótulo ya no dice cuántos minutos, para no afirmar algo que no se ve); el auto de
  Daniel baja a las 12:30 del martes y los 4 services del miércoles pueden entrar: "Mañana entran 4 services: $ 26.000" en
  verde. En la parte 1 Óscar solo lo llama dos veces y le deja un audio de 0:47 sin foto ni precio (queda sin escuchar);
  en la parte 2 le llega el extra con la foto, el precio y el botón Aprobar. "Llamadas '¿está pronto?': 0" y "Salió a
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

### Efectos nuevos de este reel (reales, CC0 1.0) · agregados por el constructor (18-11)
Bajados de BigSoundBank (Joseph Sardin, https://bigsoundbank.com), licencia CC0 1.0 / dominio público
(https://bigsoundbank.com/licenses.html). Solo recortados, fundidos y pasados a WAV 48 kHz con ffmpeg (nada sintetizado):
- `assets/sfx/bsb-ring.wav` (el celular que suena en el banquito; 0,2-3,0 s): "Phone Ring #5" (#0375), https://bigsoundbank.com/phone-ring-5-s0375.html (timbre electrónico genérico de un inalámbrico, no el tono de ninguna marca de celulares)
- `assets/sfx/bsb-rueditas.wav` (las rueditas de la camilla y la ruedita suelta, con cambio de velocidad; 7,5-13 s): "Trash can rolling on a road #1" (#1287), https://bigsoundbank.com/trash-can-rolling-on-a-road-1-s1287.html
- `assets/sfx/bsb-fibron.wav` (los tachones y los tildes en la pizarra; 0,8-2,7 s): "Whiteboard marker" (#0807), https://bigsoundbank.com/whiteboard-marker-s0807.html
- `assets/sfx/bsb-omnibus.wav` (el ómnibus por dentro; 30-52 s): "London bus" (#0644), https://bigsoundbank.com/london-bus-s0644.html (ambiente sin voces reconocibles ni anuncios)
- `assets/sfx/bsb-timbre-parada.wav` (el timbre de parada): "Small bell #1" (#0292), https://bigsoundbank.com/small-bell-1-s0292.html
- `assets/sfx/bsb-foto.wav` (el obturador de la tablet de Maxi): "Trigger of camera #1" (#2394), https://bigsoundbank.com/trigger-of-camera-1-s2394.html
- `assets/sfx/bsb-neumatica.wav` (la pistola neumática cuando baja el auto; 0,25-1,9 s): "Impact wrench #1" (#0964), https://bigsoundbank.com/impact-wrench-1-s0964.html
- `assets/sfx/bsb-matraca.wav` (matraca; copiada, sin usar en esta versión): "Small ratchet" (#0794), https://bigsoundbank.com/small-ratchet-s0794.html

### Créditos de los efectos y la música reusados del repo (copiados de los fuentes.md que los acreditan)
- `assets/bgm/pizzicato.wav`: "Pizzicato Intrigue.wav", younoise, Freesound, CC0 1.0. https://freesound.org/people/younoise/sounds/569642/ (de reels/abren-hoy).
- `assets/bgm/pizzicato-lleno.wav`: derivado del mismo archivo (mismo crédito y licencia), con eco y compresor de ffmpeg sobre la grabación real (de reels/dist-quien-debe).
- `assets/sfx/zumbido.wav`: "Room Tone Ambience Medium", gchase, Freesound, CC0 1.0 (de reels/tienda-tenes-stock / dist-quien-debe).
- `assets/sfx/chisporroteo.wav` (el spiedo de la rotisería): "Frying pan 2" (#0144), BigSoundBank, CC0 1.0. https://bigsoundbank.com/frying-pan-2-s0144.html (de reels/parrilla-no-vuelve).
- `assets/sfx/k-switch-3.wav`, `k-tick-*`, `k-tono`, `k-dos-tonos`, `k-cloth_*`, `k-plastico`: Kenney (kenney.nl), CC0 1.0.
- `assets/sfx/elevador.wav`: "Elevator (3 floors)" (#1711), BigSoundBank (Joseph Sardin), CC0 1.0. https://bigsoundbank.com/elevator-3-floors-s1711.html (de reels/taller-presupuestos).
- `assets/sfx/gota.wav`: "Drops of water #1" (#1384), BigSoundBank, CC0 1.0. https://bigsoundbank.com/drops-of-water-1-s1384.html (de reels/taller-presupuestos).
- `assets/sfx/llaves.wav`: "Keys in a hand" (#0445), BigSoundBank, CC0 1.0. https://bigsoundbank.com/keys-in-a-hand-s0445.html · `puerta-auto.wav`: "Car door #1", https://bigsoundbank.com/car-door-1-s0971.html · `auto-entra.wav`: https://bigsoundbank.com/car-arrival-stop-departure-s0187.html · `auto-pasa.wav`: https://bigsoundbank.com/car-passing-50km-h-3-s2987.html · `bocina.wav`: https://bigsoundbank.com/car-horn-4-s0260.html (BigSoundBank, CC0 1.0; de reels/taller-presupuestos).
- `assets/sfx/calle.wav` (tramo 46-61,5 s): "Small quiet street ambience", Oper8, Freesound, CC0 1.0. https://freesound.org/people/Oper8/sounds/241135/ (de reels/estetica-turnos).
- `assets/sfx/vibra.wav`: "Cell phone vibrate, on table hard surface.wav", SpliceSound, Freesound, CC0 1.0. https://freesound.org/people/SpliceSound/sounds/369839/
- `assets/sfx/sorbo.wav` (tramo 0,45-1,4 s): "drink;slurps;small.wav", Abir19, Freesound, CC0 1.0. https://freesound.org/people/Abir19/sounds/629505/
- `assets/sfx/stinger.wav` (primeros 2,2 s): "Vibraphone Transition Music Cue", DanJFilms, Freesound, CC0 1.0. https://freesound.org/people/DanJFilms/sounds/528980/
- `assets/sfx/cero.mp3`: "[UI Sound] Approval - High Pitched Bell Synth", GabFitzgerald, Freesound, CC0 1.0. https://freesound.org/people/GabFitzgerald/sounds/625174/
- `assets/sfx/notification.mp3`, `whoosh.mp3`, `whoosh-short.mp3`, `pop.mp3`, `click-soft.mp3`, `ding.mp3`, `key-press.mp3`, `zumbido-largo.wav`: banco de SFX de HyperFrames (como en reels/abren-hoy y reels/ya-lo-cargo).
