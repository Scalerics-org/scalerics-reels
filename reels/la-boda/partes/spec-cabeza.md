# Reel "La boda": spec para los que construyen escenas

Reel vertical 1080x1920 de Scalerics (software factory de Montevideo). Vende el AGENTE DE IA.
Formato P: CASAMIENTO DE PELÍCULA (la boda interrumpida de las telenovelas y de "El graduado",
solo nombrada; nada de imágenes de la obra). LA TÍA ELSA (sombrero rosa, rulos dorados, vestido
azul a lunares, pañuelo) le susurra al que mira: "Tu mejor clienta se casa hoy. Y no es con vos."
EL PADRE (alba marfil, estola dorada, libreta vino): "Si alguien se opone a esta unión, que hable
ahora o calle para siempre." Se abren las puertas de la iglesia de un golpe: RICARDO (el dueño de
Calzados Ricardo: camisa azul, delantal vino, despeinado, bigote, sudando): "¡Yo me opongo!
¡Lucía, no te cases! ¡Vos sos clienta mía de toda la vida!". La tía, encantada: "¡Ay, como en la
novela!". LUCÍA (la novia, la clienta; vestido marfil, tiara dorada, ramo) indignada: "¿Tuya? Un
sábado a la noche te pregunté si tenías las botas en treinta y ocho. Visto. Te insistí y me
pusiste: «pasá el lunes». Y el miércoles... ¡un pulgar!". El padre: "¿Un pulgar?". Ricardo:
"¡Estaba solo en el mostrador! ¿Qué tiene él que no tenga yo?". Lucía: "¡Me contesta!". EL DE
ENFRENTE (el novio: traje azul, moño dorado, jopo, sonrisa sobradora): "A las once de la noche le
contesté al toque. Le reservé las botas, y cuando entró el treinta y ocho, le avisé." Ricardo:
"¿Y vos cuándo dormís?". Novio: "Como un bebé. El que contesta es mi empleado nuevo: no duerme y
se sabe el stock de memoria." Padre: "Los declaro clienta y comercio. ¡Tiren el arroz!". GIRO y
cierre con el narrador (Orus): "El empleado nuevo del de enfrente es un agente de IA: atiende su
WhatsApp a cualquier hora, reserva y avisa. En Scalerics te hacemos el tuyo, antes de que te
toque ir de invitado. ¿Te oponés o callás para siempre? Contanos en los comentarios."
Voces (partes/voces.sh, partes/componer.mjs): tía Kore, padre Charon, Ricardo Puck, Lucía Leda,
novio Fenrir, narrador Orus. Voz de 70.1 s, reel de 73.28 s.

## Recurso visual central
UNA IGLESIA DE TELENOVELA en penumbra: ventanales en ojiva con VITRALES de colores a los costados,
rosetón apagado arriba y alfombra vino al altar (fondo fijo de `armar.mjs`); haces de luz rosa y
azul, PÉTALOS que caen todo el tiempo, la PLACA de la invitación arriba ("HOY SE CASAN · Lucía &
el de enfrente", en cursiva Cormorant dorada) y el ZÓCALO de telenovela con quién habla (todo en
`compositions/ambiente.html`, que también tira el ARROZ en "¡Tiren el arroz!" y hace los flashes).
Momentos fuertes: las PUERTAS de la iglesia que se abren de golpe con Ricardo a contraluz, el
ARCO DE FLORES del altar, el celular de Lucía con el chat (visto, «pasá el lunes», el PULGAR
gigante dibujado), los ANILLOS, la TORTA, y al final el celular del novio que contesta solo.
Edición CARGADA: palabras gigantes que caen en su palabra, sacudones, nada quieto más de ~0.8 s.

## Paleta (SOLO estos colores)
- Vino-negro `#2a1220`: contornos (6 px), fondos de carteles, el jopo del novio.
- Marfil `#fbf4e6`: piel, vestido de la novia, alba del padre, textos.
- Dorado `#e3b448`: anillos, estola, tiara, arco, el padre y el novio (acento de subtítulos).
- Rosa empolvado `#eba5b3`: la tía, la novia, flores, pétalos, burbujas de Lucía.
- Vino `#9b2445`: puertas, delantal de Ricardo, libreta, pelo de Lucía, sombras de los textos.
- Azul vitral `#5b8ee0` (y `#7fa6ea` en subtítulos): Ricardo, el traje del novio, la tía.
- Verde Scalerics `#5ce611`: SOLO desde s13 (entra Scalerics).
Acento de subtítulos por quién habla (`reel.voces`): tía y Lucía rosa, padre y novio dorado,
Ricardo azul, Scalerics verde.

## Tipos de letra
Lexend 800-900 mayúsculas para lo grande; Cormorant Garamond Italic para lo de invitación (solo
decorativo y grande); IBM Plex Mono 600 para horas y zócalo. Nada que haya que leer de menos de 26 px.

## Zona
Placa de la invitación arriba (y 58-194, ambiente). Subtítulos en y 236 a ~420. Contenido de
escena entre y 540 y 1540. Zócalo en y 1560-1690 (ambiente). Logo de Scalerics en y 1746.

## Lo que ya está hecho
- `armar.mjs` (fondo de iglesia con vitrales en SVG, colores de subtítulos por voz, cortina).
- `compositions/ambiente.html` (a mano): placa, haces, pétalos, zócalo por parlamento, flashes
  (11.55, 29.9, 37.15), arroz (53.75); se apaga en 55.8 cuando entra Scalerics.
- Las escenas se generan con `partes/escenas/*.py` (personajes en `base.py`: tia, cura, dueno,
  novia, novio; objetos: anillos, arco, puertas, pulgar, botas, torta, celular).
  `cd partes/escenas && python3 sNN.py` escribe la escena y su `.sfx.json`; después `node armar.mjs`.

