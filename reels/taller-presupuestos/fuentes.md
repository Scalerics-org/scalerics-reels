# taller-presupuestos · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Óscar,
Maxi, Sergio, Fabián, Pablo, Silvia, Andrés; Sofi del elenco). **No afirma datos externos, estadísticas, años ni
empresas reales: no hay nada que verificar con WebSearch.** Los números son del caso que se cuenta, no estadísticas:
- 5 presupuestos en la semana, uno por día de lunes a viernes, ninguno con respuesta.
- $ 90.800 en el pincho = embrague completo $ 38.000 + frenos y discos $ 14.500 + distribución $ 22.000 + tren
  delantero $ 9.800 + service $ 6.500 (precios inventados de "Mecánica Óscar", verosímiles para Montevideo; no se
  presentan como promedio de nada).
- Parte 2: aceptados $ 74.500 (embrague + frenos y discos + distribución) y abiertos $ 16.300 (tren delantero + service);
  suman los mismos $ 90.800. Seguimiento "a los 2 días", "Válido 7 días", turno "Jueves 8:30": parte de la ficción del caso.

Sin marcas: "Mecánica Óscar" es inventado; autos genéricos sin logo ni frente reconocible, patente inventada "STR 4581";
repuestos y bidón sin marca; chat genérico (la palabra "WhatsApp" solo en texto, sin su verde ni su logo).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Óscar = Charon, Maxi = Puck, Sergio = Zubenelgenubi, Sofi = Achernar, narrador del
cartel = Rasalgethi (toma nueva: "Un sistema de presupuestos más tarde."). Tomas en `partes/tomas/`, recortes en
`partes/rec/`.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/la-lista/fuentes.md`, `reels/ya-lo-cargo/fuentes.md`,
`reels/dice-cuarenta/fuentes.md` y `reels/estetica-turnos/fuentes.md`). Sonidos que probablemente haya que sumar (el
constructor los busca en `assets/sfx` de otros reels antes; si no están, uno real con licencia CC0 y anota acá autor,
sitio y licencia): **bocina de auto**, **auto que pasa / motor que entra y se apaga**, **puerta de auto**, **motor
eléctrico del elevador**, **chac del pincho** (golpe metálico seco + papel; puede salir de un golpe metálico CC0 de
Kenney + `k-page-turn`), **llaves**, **gota**. Nada sintetizado con ffmpeg.

### Efectos nuevos de este reel (reales, CC0 1.0)
Bajados el 16-11 de BigSoundBank (Joseph Sardin, https://bigsoundbank.com), licencia CC0 1.0 / dominio público
(https://bigsoundbank.com/licenses.html). Recortados y pasados a WAV 48 kHz con ffmpeg (solo corte y fundidos, nada
sintetizado):
- `assets/sfx/bocina.wav` (la bocina doble de Sergio, P4): "Car horn #4", https://bigsoundbank.com/car-horn-4-s0260.html
- `assets/sfx/auto-pasa.wav` (el auto que cruza el portón, P4): "Car passing 50 km/h #3", https://bigsoundbank.com/car-passing-50km-h-3-s2987.html
- `assets/sfx/puerta-auto.wav` (Sergio se baja, Q4): "Car door #1", https://bigsoundbank.com/car-door-1-s0971.html
- `assets/sfx/llaves.wav` (la llave del llavero verde, Q4b): "Keys in a hand", https://bigsoundbank.com/keys-in-a-hand-s0445.html
- `assets/sfx/gota.wav` (la gota en la pausa, P5): "Drops of water #1", https://bigsoundbank.com/drops-of-water-1-s1384.html
- `assets/sfx/auto-entra.wav` (el sedán entra y frena, Q4): "Car arrival, stop, departure", https://bigsoundbank.com/car-arrival-stop-departure-s0187.html
- `assets/sfx/elevador.wav` (el motor del elevador, Q4c): "Elevator (3 floors)", https://bigsoundbank.com/elevator-3-floors-s1711.html
El chac del pincho es `k-metal-medio-1/3.wav` + `k-page-turn.wav` (Kenney, CC0, crédito en reels/dice-cuarenta/fuentes.md);
la calle por el portón es `calle.wav` (crédito en reels/estetica-turnos/fuentes.md).
