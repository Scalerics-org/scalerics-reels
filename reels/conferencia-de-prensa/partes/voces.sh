#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/conferencia-de-prensa.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SALA="Es una conferencia de prensa después de un partido de fútbol, en una sala con micrófonos y flashes de fotógrafos."
DT="Sos el Profe Néstor, dueño de una casa de ropa de barrio en Montevideo, de unos 55 años, que acaba de perder el clásico del barrio contra el local de enfrente: hablás como un director técnico uruguayo calentón y a la defensiva en la conferencia post-partido, poniendo excusas de fútbol con mucha seguridad, mal perdedor, gracioso."
P1="Sos una periodista deportiva uruguaya joven, de unos 28 años, punzante, rápida y filosa, que pregunta con ironía y sin miedo."
P2="Sos un periodista de radio deportiva uruguayo, de unos 40 años, picante y canchero, que mete el dedo en la llaga con una sonrisa."
VET="Sos un periodista deportivo veterano uruguayo, de unos 70 años, voz grave y gastada de tantos años de radio, sabio, pausado, con autoridad: todos se callan cuando habla."
JEF="Sos la jefa de prensa del club, uruguaya, de unos 35 años, seca, apurada, cortante."
gen 01 Leda "$SALA $P1 Arrancás con un golpe seco, en la cara, y la pregunta del final con picardía."
gen 02 Puck "$SALA $DT Resignado y filosófico al principio, después indignado con el árbitro."
gen 03 Fenrir "$SALA $P2 Leés el mensaje de la clienta imitándola, y el remate lo decís lento y con maldad."
gen 04 Puck "$SALA $DT Poniendo excusas absurdas con total seriedad, como si fueran obvias."
gen 05 Leda "$SALA $P1 Contundente y burlona, el final como un gol."
gen 06 Puck "$SALA $DT Cortante, queriendo cambiar de tema, con fastidio."
gen 07 Fenrir "$SALA $P2 Insistís, provocador, con sorna."
gen 08 Puck "$SALA $DT Ofendido y sobrador, como si fuera lo más normal del mundo."
gen 09 Kore "$SALA $JEF Cortás la conferencia, apurada, sin ganas."
gen 10 Charon "$SALA $VET Despacio, con pausas, como quien da una lección. Remarcás 'te faltó banco'."
gen 11 Puck "$SALA $DT Desconcertado y celoso, en voz más baja."
gen 12 Charon "$SALA $VET Tranquilo, revelando un secreto, con una media sonrisa."
gen 13 Puck "$SALA $DT Te levantás ofendido de la mesa, cortante, y te vas."
gen 14 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de una conferencia de prensa de fútbol: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a compartir el video."
