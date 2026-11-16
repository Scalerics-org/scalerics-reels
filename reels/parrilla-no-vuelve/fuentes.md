# parrilla-no-vuelve · fuentes

Reel de la línea "ANTES QUE TODO" (rubro + dolor + solución), comedia de situación con personajes inventados (Raúl,
Fabián, los clientes extra; Walter, Graciela y Sofi del elenco). **No afirma datos externos, estadísticas, años ni
empresas reales: no hay nada que verificar con WebSearch.** Que febrero sea un mes flojo para una parrilla de
Montevideo no se afirma como dato: es la situación del caso ("Martes de febrero" en la pizarra), no una estadística.

Los números son del caso que se cuenta, no estadísticas:
- "Sábado: 112 cubiertos" y "Nombres que sabe Raúl: 0" (la parrilla de Raúl, ese sábado).
- "Martes de febrero: 3 mesas de 25" (el salón de Raúl ese martes).
- "Visita 4 de 5 · a la 5ª, provoleta de regalo" (el premio que eligió Raúl).
- "Hace más de 4 semanas que no vienen: 38", "Walter · cada 2 semanas · última visita: hace 5 semanas" (el panel de
  Raúl en febrero; con 5 semanas sin venir, a Walter, que viene cada 2, le faltaron dos visitas: "Faltaste dos sábados").
- "Nombres que sabe Raúl: 0 → 112" y "Martes de febrero: 3 → 17 mesas": parte de la ficción del caso, no una promesa
  de resultado ni un promedio de nada.

Sin marcas: "Parrilla Raúl" y "Carnicería Don Tito" son inventados; avisos y chat genéricos (sin el verde ni el logo de
WhatsApp), celulares sin logo, botellas de vino sin etiqueta, sifón sin marca. Nada de bebidas de marca.

## Voces
Gemini TTS con `herramientas/voz.mjs`: Raúl = Iapetus, Fabián = Achird (decisión del coordinador: Charon y Puck los usa taller-presupuestos), Walter = Umbriel, Graciela = Gacrux, Sofi =
Achernar, narrador del cartel = Rasalgethi (toma nueva: "Una tarjeta de puntos más tarde."). Tomas en `partes/tomas/`,
recortes en `partes/rec/`.

## Música y efectos
Los de siempre del repo (con su crédito en `reels/la-lista/fuentes.md`, `reels/ya-lo-cargo/fuentes.md` y
`reels/dice-cuarenta/fuentes.md`): pop, whoosh, whoosh-short, notification, cero, campanita, click-soft, k-cloth_1/2,
k-page-turn, paso-0..4, stinger, música de cama. **Para completar el constructor (sonidos nuevos que hacen falta y no
están en `assets/sfx`):** chisporroteo de carne en la parrilla, leña que cruje, murmullo de restaurante lleno, ventilador
de techo, tiza en pizarra, grillos de verano. Solo grabaciones reales con licencia CC0 (anotar acá autor, sitio y
licencia de cada uno); nunca sintetizados con ffmpeg. Si alguno no aparece, reemplazarlo por lo más cercano del repo
(p. ej. el zumbido de estetica-turnos para el ventilador) y anotarlo.

### Sonidos nuevos (constructor, 16-11)
Bajados de BigSoundBank (Joseph Sardin, https://bigsoundbank.com), licencia **CC0 1.0** (dominio público; ver
https://bigsoundbank.com/licenses.html). Solo recortados, remuestreados a 48 kHz y con nivel/filtro en la mezcla; nada
sintetizado.
- `assets/sfx/chisporroteo.wav` (la carne en la parrilla): "Frying pan 2" (#0144), https://bigsoundbank.com/frying-pan-2-s0144.html
- `assets/sfx/fuego.wav` (la leña del brasero, 30 s desde 5 s): "Fireplace 2" (#0031), https://bigsoundbank.com/fireplace-2-s0031.html
- `assets/sfx/salon.wav` (el salón lleno, 45 s desde 20 s): "Restaurant 2" (#3376), https://bigsoundbank.com/restaurant-2-s3376.html
- `assets/sfx/grillos.wav` (grillos de verano, con pasabajos y lejos): "Field cricket" (#1020), https://bigsoundbank.com/field-cricket-s1020.html
- `assets/sfx/ventilador.wav` (el ventilador de techo): "Electric fan 2" (#0079), https://bigsoundbank.com/electric-fan-2-s0079.html
- `assets/sfx/tiza.wav` (la tiza en la pizarra, 1,2 s desde 1,4 s): "Chalk on blackboard" (#0541), https://bigsoundbank.com/chalk-on-blackboard-s0541.html
Del repo (créditos en estetica-turnos/dice-cuarenta/ya-lo-cargo): pop, whoosh, whoosh-short, cero, campanita, puerta-abre,
click-soft, notification, vibra, k-cloth_1/2, k-page-turn, k-metal-click, k-tick, paso-0..4, stinger, bgm/pizzicato.
