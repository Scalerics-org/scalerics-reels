#!/bin/bash
# genera un parlamento: ./gen.sh 03c
b=$1; v=${b:2:1}
case $v in
  c) VOZ=Leda; TONO="Sos una clienta de unos 30 años en una sesión de terapia de pareja, harta y dolida, medio dramática como en una telenovela, quejándote de un comercio como si fuera tu novio. Exagerada y graciosa.";;
  t) VOZ=Kore; TONO="Sos una psicóloga en una sesión de terapia de pareja: voz calma, suave, pausada, profesional, con un dejo de ironía seca. Nunca te alterás.";;
  d) VOZ=Charon; TONO="Sos el dueño de un comercio, cansado y desbordado, defendiéndote en terapia de pareja: exasperado, levantando la voz, como quien no da más.";;
  o) VOZ=Orus; TONO="Sos el locutor de la marca que cierra el reel: cálido, seguro, cercano, con una sonrisa, como quien cuenta la solución.";;
esac
node ../../../herramientas/voz.mjs $b.txt raw/$b.wav --voz $VOZ --tono "$TONO"
