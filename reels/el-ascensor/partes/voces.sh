#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-ascensor.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
RUB="Sos RUBÉN, dueño de una carpintería de muebles a medida de Montevideo, de unos 50 años, en un sketch de comedia incómoda: quedaste trancado en un ascensor con una clienta a la que nunca llamaste. Nervioso, culposo, sonrisa forzada, tragando saliva. Muy expresivo."
VAL="Sos VALERIA, una clienta de Montevideo de unos 32 años, en un sketch de comedia incómoda: trancada en un ascensor con el carpintero que nunca te llamó. Seca, irónica, tranquila, con cara de póker, cero apuro. Frases cortitas, con pausas que matan."
INT="Sos la operadora del INTERCOMUNICADOR DE EMERGENCIAS de un ascensor, en un sketch de humor: voz de parlante, profesional, amable, eficiente, un poco robótica."
gen 01 Charon "$RUB Le confesás al que mira, bajito y mortificado, como contando una pesadilla en primera persona. Ritmo ágil."
gen 02 Leda "$VAL Lo reconocés despacio, sin emoción; tres golpes secos: el nombre, el mueble, el mes."
gen 03 Charon "$RUB Sorprendido, sobreactuando alegría, tartamudeando 'justo... justo'."
gen 04 Leda "$VAL Seca, sin mirarlo, aplastante."
gen 05 Charon "$RUB Defendiéndote, orgulloso de golpe, como si fuera una prueba."
gen 06 Leda "$VAL Corta, levantando una ceja."
gen 07 Charon "$RUB Cada vez más chiquito, enredándote en las excusas. 'En uno de los cinco' con vergüenza."
gen 08 Charon "$RUB Tratando de arreglarla y empeorándola, dudando de verdad."
gen 09 Leda "$VAL Helada, paciente, con un suspiro."
gen 10 Kore "$INT Leés todo con ritmo ágil y voz de parlante, servicial."
gen 11 Charon "$RUB Asombrado e indignado a la vez, mirando el parlante."
gen 12 Kore "$INT Amable pero con un pinchazo; 'No en un post-it' con picardía contenida."
gen 13 Leda "$VAL Tranquila, contando algo obvio, con una sonrisita; disfrutando cada detalle de lo bien que la atendió el otro. Ritmo ágil."
gen 14 Charon "$RUB Con un hilo de voz, dolido, casi sin querer saber."
gen 15 Leda "$VAL Una sola palabra, encantada, sin piedad."
gen 16 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa; comprensivo con Rubén. 'se queda trancado' con picardía. CRM se dice ce, erre, eme."
gen 17 Charon "$RUB Derrotado, pidiendo ayuda de verdad."
gen 18 Leda "$VAL Por primera vez con una sonrisa cómplice, dándole un consejo, saliendo del ascensor."
gen 19 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a comentar."
