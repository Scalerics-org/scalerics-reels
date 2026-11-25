# gym-cupo · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Mauro,
Majo, Sole, Lucía, Rodri y los alumnos; Graciela del elenco). **No afirma datos externos, estadísticas, años ni empresas
reales: no hay nada que verificar con WebSearch.** Que los "yo voy" de un grupo no sean reservas no se presenta como
dato ni porcentaje: es lo que le pasa a Mauro un martes.

## Números del caso (no son estadísticas ni promesas de resultado)
- Clase de spinning de los martes a las 19:00 en "Estudio Mauro": **14 bicis** para alumnos (la del
  profe aparte).
- En el grupo "SPINNING MARTES 19" (38 participantes): **22 "yo voy"**; **vinieron 9**; **5 bicis vacías**; a **dos**
  (Majo y Sole) les dijo "llena"; a las 19:04, un "yo voy" más (**23**).
- Cuota mensual de spinning en Estudio Mauro: **$ 1.900** (precio inventado del caso, verosímil para Montevideo; no se
  presenta como promedio). Majo y Sole se anotaron en otro lado: **$ 3.800 por mes** = 2 × $ 1.900.
- Parte 2, panel "Spinning martes 19:00 · noviembre": reservaron 14 · vinieron 14 · **bicis vacías en el mes 20 → 1**
  (20 = 5 vacías × 4 martes de un mes como el de la parte 1) · lugares que llenó la lista de espera: 6 · alumnas nuevas
  desde la lista: 3. Todo de la ficción del caso.
- "Ocupada otra vez en 3 minutos", "Quedan 3", "Sos la 1ª de la lista de espera": de la ficción del caso.
- Días del caso: martes 18:20 (el grupo), 19:00 (la clase), 19:04 (el último "yo voy"); parte 2: lunes 21:30 (Majo
  reserva), martes 15:00 (recordatorio), martes 19:00 (14 de 14).

## Lo que se dice del producto (que sea realista)
Sistema de reservas de clases hecho por Scalerics para el estudio: página de reservas con el cupo de cada clase y el
mapa de la sala (bicis numeradas), lista de espera cuando se llena, recordatorio automático el día de la clase con
"Voy" / "Liberar mi bici", y si alguien libera, aviso automático a la primera de la lista para que la reserve con un
toque; panel de ocupación por clase y por mes. Es software de reservas común; el reel no promete resultados en números
fuera del caso, no nombra ninguna plataforma ni API y no es un agente de IA (no se lo llama así). Los avisos por WhatsApp
a alumnas que dejaron su número y aceptaron recibirlos (al reservar) son lo que permite WhatsApp Business con plantillas
aprobadas; el reel no hace ninguna afirmación sobre la plataforma.

## Sin marcas
"Estudio Mauro" es inventado. Bicis de spinning genéricas (sin logo ni nombre de fábrica), botellas sin etiqueta,
parlante y celulares sin logo. Chat genérico (burbujas crema y navy, sin el verde ni el logo de WhatsApp; el sticker de
pulgar dibujado plano, no de ninguna app); "WhatsApp" se nombra solo como canal en `descripcion.txt`. Música de
spinning sin referencia a ningún tema conocido.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Mauro = Sadaltager, Majo = Zephyr, Graciela = Gacrux, narrador del cartel =
Rasalgethi (frase nueva). Detalle en `partes/voces.md`.

## Efectos y música
Nada sintetizado con ffmpeg. Los de siempre del repo, con el crédito en el `fuentes.md` del reel de donde vienen (anotar
al construir): `notification`, `vibra`, `pop`, `whoosh`, `whoosh-short`, `click-soft`, `cero`, `ding`, `key-press`,
`tipeo`, `k-tick-1/2/4`, `k-cloth_1/2`, `k-plastico`, `k-metal-click`, `paso-0..4`, `puerta-abre`, `zumbido-largo`,
`stinger` (ver `reels/vete-racion/fuentes.md`, `reels/pilates-cuota/fuentes.md`, `reels/dice-cuarenta/fuentes.md`,
`reels/anotamelo/fuentes.md`, `reels/abren-hoy/fuentes.md`).
Pendiente del constructor (si hace falta): **música de spinning con beat** y **pedaleo/volante de bici fija**, reales con
licencia CC0: anotar acá autor, sitio y licencia de cada uno.
