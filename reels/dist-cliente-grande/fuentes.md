# dist-cliente-grande · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Rubén,
Nico, Héctor, Darío el operario y el contador, del elenco de la distribuidora). **No afirma datos externos, estadísticas,
años ni empresas reales**, así que no hubo nada que verificar con WebSearch. Los números son del caso que se cuenta, no
estadísticas:
- Súper Héctor (autoservicio de barrio inventado) le compraba a la Distribuidora Rubén **$ 38.000 por semana, los
  martes** (monto inventado, verosímil para un súper chico de Montevideo; no se presenta como promedio de nada).
- Último pedido: **martes 18 de agosto** (de 2026, que es martes). Martes sin pedir hasta el martes 10 de noviembre:
  25-8, 1-9, 8-9, 15-9, 22-9, 29-9, 6-10, 13-10, 20-10, 27-10, 3-11 y 10-11 = **12 martes**. 12 × $ 38.000 =
  **$ 456.000**.
- Facturación por cliente del monitor (P1): agosto = 3 martes (4, 11 y 18) × $ 38.000 = **$ 114.000**; setiembre,
  octubre y noviembre = $ 0. Las otras filas (Graciela, Marta) son montos de relleno, chicos.
- Parte 2: aviso "no pidió ayer" el miércoles 8:10 (compra cada 7 días; último pedido hace 8 días); pedido de
  $ 38.000. Panel de la semana: Súper Héctor $ 38.000 + Panadería Nelly $ 9.500 + Rotisería Fede $ 7.200 + Kiosco Beto
  $ 6.300 = **$ 61.000** "que no se fueron"; "Sin pedir: 4 → 0".

Sin marcas: "Distribuidora Rubén", "Súper Héctor" y los demás comercios son inventados. La otra distribuidora no se
nombra ni se muestra salvo un camión gris liso, sin texto ni logo, que nadie menciona. Chat, llamada, planilla y
celulares genéricos, sin el color ni el logo de ninguna app o programa. Productos sin marca (aceite en caja kraft,
"HARINA 000", agua en pack liso).

## Voces
Gemini TTS con `herramientas/voz.mjs`: Rubén = Algenib, Nico = Fenrir, Héctor = Sadaltager (las de siempre del
elenco), el contador = **Algieba** (nueva en el repo: no la usa ningún otro personaje), narrador del cartel =
Rasalgethi (toma nueva: "Un aviso automático más tarde."; fallback: la de `reels/ya-lo-cargo`). Tonos en `plan.md`
(tabla de voces).

## Música y efectos
Todo de `assets/sfx` y `assets/bgm` del repo, con su crédito en los `fuentes.md` de los reels de donde vienen; no se bajó
ni se sintetizó nada:
- `pizzicato.wav` (la cama), `calle.wav` (Oper8, CC0), `auto-entra.wav`, `puerta-auto.wav`, `motor.mp3` ("Car engine Start
  Up 02", looneybits, OpenGameArt, CC0), `sorbo.wav`, `papel.wav`, `whoosh*.mp3`, `pop.mp3`, `cero.mp3`, `vibra.wav`,
  `notification.mp3`, `click-soft.mp3`, `stinger.wav`, `zumbido-largo.wav`, `k-*` (Kenney, CC0: `k-metal-click` para
  los tres clac de la reposera que se pliega, `k-metal-pesado-0/2` para las dos hojas de la puerta del camión,
  `k-neumatico-abre`, `k-tono`, `k-plastico`, `k-page-turn` y `k-book_place_1` para las capas del pallet, `k-tick-*`):
  ver `reels/dist-pedidos-lunes/fuentes.md` y `reels/veterinaria-vacunas/fuentes.md`.
- `pajaro.wav` ("Bird Chirp", swiftoid, Freesound, CC0; viene de hacen-envios por corralon-portland).
- `hoja.mp3` (el aleteo del post-it): del `assets/sfx` del repo (por-que-caminar-mas, que lo lista entre los SFX del
  repo).
No hay radio portátil real: la "radio" de Darío es la misma cama de pizzicato con pasaaltos y pasabajos (suena a parlante
chico), no un sonido sintetizado.
