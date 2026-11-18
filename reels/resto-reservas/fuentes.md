# resto-reservas · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Raúl,
Fabián, Pablo; Walter del elenco). **No afirma datos externos, estadísticas, años ni empresas reales**, así que no hay
nada que verificar con dos fuentes. Que los grupos que reservan a veces no vienen ni avisan no se presenta como dato ni
porcentaje: es lo que le pasa a Raúl ese viernes.

## Números del caso (no son estadísticas ni promesas de resultado)
- **$ 1.500 por persona** en la parrilla de Raúl (plato de parrilla, bebida, postre y cubierto). Elegido para que sea
  creíble en una parrilla de barrio de Montevideo: guías de viaje recientes dan un plato de parrilla de ~$ 650-900 y una
  parrillada para dos de ~$ 1.600-4.000, más el cubierto de ~$ 120-180 por persona
  ([Lorenzigo, guía del Mercado del Puerto](https://lorenzigo.com/mercado-del-puerto-montevideo-guide/),
  [Quanto Custa Viajar, Montevideo](https://quantocustaviajar.com/uruguai/montevideu/alimentacao)). Esas guías se usaron
  solo para calibrar; el reel NO cita ningún precio como dato: el número es el ticket de Raúl.
- **Familia de 6 que se fue: $ 9.000** = 6 × $ 1.500.
- **Mesa 7, para 8**, puesta (8 cubiertos) y vacía de **22:00 a 00:00** (dos horas de la mesa más grande del salón un
  viernes). Si se pone en plata en un rótulo: "8 lugares vacíos · $ 12.000" = 8 × $ 1.500 (lo que esa mesa factura llena
  en un turno; no se suma a los $ 9.000 de la familia para no contar dos veces la misma mesa).
- **"¿Tenés mesa?" ×14 sin contestar** en el celular a las 21:00 (el celular de Raúl, esa noche).
- Parte 2: el jueves, **"Confirmadas 11 de 12"** reservas del viernes (la que falta es la de Pablo); la mesa 7 se libera a
  las **20:00** del jueves tras el aviso de las 12:00 y el segundo de las 18:00; se le ofrece a **Walter · 6**, primero en
  la lista de espera. Viernes: **"Sin contestar: 14 → 0"**; **"Mesa 7 · Walter · 6 · $ 9.000 ✓"**; **"Mesas vacías por
  reservas que no vinieron: 0"** (ese viernes, en la ficción del caso). El cumpleaños de 20 del sábado es un pedido que
  el agente le pasa a Raúl (no lo cierra solo).
- Horarios del caso: viernes 21:00 (cuadro 0), 21:40 (Walter en la puerta), 21:58 ("¡Estamos llegando!"), 22:45, 23:40,
  23:58; parte 2: miércoles 2:14 (Pablo reserva), jueves 12:00 / 18:00 / 20:00, viernes 21:00, 22:00, 23:58.

## Lo que se dice del producto
Que el agente de IA contesta por WhatsApp a cualquier hora con las mesas reales, toma la reserva, la anota en el plano de
mesas, pide confirmación el día antes, libera la mesa si no confirman, avisa a la lista de espera y le pasa al dueño lo
que es para él: es lo que hace el producto de Scalerics (lo arma Scalerics a medida para cada restaurante; ver
"Agentes de IA" en CLAUDE.md). No se promete ningún resultado en números fuera del caso.

## Sin marcas
"Parrilla Raúl" es inventado (el de parrilla-no-vuelve). Chat genérico (burbujas crema y navy, sin el verde ni el logo de
ninguna app de mensajería), celulares y tablet sin logo, botellas de vino sin etiqueta, sifón sin marca, nada de bebidas
de marca. WhatsApp se nombra solo en `descripcion.txt`, como canal.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Raúl = Iapetus, Fabián = Achird (los de parrilla-no-vuelve), Walter = Umbriel,
Pablo = Schedar (nuevo), narrador del cartel = Rasalgethi (audio reusado de `reels/abren-hoy-completo/assets/voice/narrador.wav`).
Tonos en `partes/lineas.tsv`; detalle en `partes/voces.md`.

## Música y efectos (para el constructor)
De `assets/sfx` y `assets/bgm` del repo, con su crédito en los `fuentes.md` de los reels de donde vienen: de
`reels/parrilla-no-vuelve` (`chisporroteo.wav`, `fuego.wav`, `salon.wav`: BigSoundBank, CC0 1.0; campanita de la puerta),
de `reels/dist-quien-debe` (`vibra.wav`, `notification.mp3`, `k-tono`, `k-dos-tonos`, `k-cloth_*`, `k-plato-000`, `stinger.wav`,
`cero.mp3`, `pop.mp3`, `whoosh*`, `click-soft.mp3`). Si hace falta alguno que no esté (birome sobre papel, cubiertos que
se apoyan en la mesa, sillas que se suben a la mesa, fósforo/vela), uno real con licencia CC0 (BigSoundBank o Freesound
CC0) y se anota acá autor, sitio y licencia. Nada sintetizado con ffmpeg.
