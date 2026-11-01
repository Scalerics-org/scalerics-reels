#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-medium.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
MED="Sos MADAME ESTHER, una MÉDIUM de Montevideo de unos 60 años, en una sesión de espiritismo a la luz de las velas, en un sketch de humor: voz grave, ronca, teatral y misteriosa, arrastrando las palabras con dramatismo de telenovela, como si hablara con los muertos; pero canchera y uruguaya. RITMO ÁGIL: el misterio está en la voz, no en la lentitud; pausas cortas."
CLI="Sos una CLIENTA joven de Montevideo, de unos 28 años, que contrató a una médium porque no encuentra en internet a qué hora abre un local: desesperada, asustada, muy expresiva y graciosa."
ESP="Sos el ESPÍRITU de un local comercial, hablando desde el más allá en una sesión de espiritismo: voz de ultratumba, muy grave, lenta, cavernosa y gemida, como un fantasma de película vieja, en un sketch de humor."
gen 01 Gacrux "$MED Le hablás directo al dueño del local, en la cara, con un golpe seco: 'Tu clienta quiso saber a qué hora abrís.' Después, solemne: 'Tuvo que contratar a una médium.' Y 'O sea, a mí' rápido, canchera, con orgullo."
gen 02 Leda "$CLI Atropellada y frustrada al enumerar; 'Nada' seco; 'Usted es mi última esperanza' suplicando, al borde del llanto."
gen 03 Gacrux "$MED Ceremoniosa, bajando la voz: 'Tomémonos de las manos.' Después invocando en voz alta, solemne y dramática, como en una película de terror: 'Espíritu del local, si estás ahí, golpeá una vez.'"
gen 04 Gacrux "$MED Preguntándole al espíritu, misteriosa y solemne, alargando un poco: '¿A qué hora abrís?'"
gen 05 Algenib "$ESP Gimiendo, muy lento y cavernoso."
gen 06 Gacrux "$MED En trance, con los ojos cerrados, describiendo una visión con asombro y misterio."
gen 07 Leda "$CLI Indignada y desesperada, casi gritando."
gen 08 Gacrux "$MED En trance, misteriosa, escuchando al más allá."
gen 09 Algenib "$ESP Como la grabación de la compañía telefónica pero desde ultratumba: lento, monótono, cavernoso y gemido."
gen 10 Gacrux "$MED En trance, describiendo la visión con creciente horror; 'Un alfajor' seco, como el remate de un chiste."
gen 11 Leda "$CLI Gritando aterrada, como en una película de terror."
gen 12 Gacrux "$MED Sale del trance: cálida, comprensiva y canchera, como una abuela que te explica algo obvio; 'Pero en internet es un fantasma' más lento, con complicidad, como revelando el secreto."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa, enumerando con ritmo."
gen 14 Leda "$CLI Ahora feliz y aliviada, sorprendida, encantada, como quien no lo puede creer."
gen 15 Gacrux "$MED Desolada y graciosa, quejándose, preocupada por quedarse sin trabajo."
gen 16 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a etiquetar en los comentarios."
