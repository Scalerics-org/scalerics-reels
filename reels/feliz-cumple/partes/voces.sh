#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/feliz-cumple.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
GRA="Sos Graciela, una señora uruguaya de unos 65 años, de barrio, que cuenta una anécdota a cámara como a una amiga: cálida, tierna, con humor, emocionada sin exagerar. Voz de señora, nada de locutor."
gen 01 Gacrux "$GRA Arrancá como una confesión que sorprende: 'once años' con peso; 'por primera vez' lento; 'feliz cumpleaños' con una sonrisa enternecida."
gen 02 Gacrux "$GRA Contando cómo fue: 'me suena el celular' sorprendida; el mensaje de la carnicería leído en voz alta del celular, como quien lee algo que la emociona."
gen 03 Gacrux "$GRA '¿Puntos?' extrañada, como si se lo preguntara a sí misma; después explicando, divertida; 'yo ni me enteraba' riéndose de sí misma."
gen 04 Gacrux "$GRA Pícara y contenta; 'vacío, chorizo, morcilla' enumerando con gusto; 'viene la familia entera' orgullosa."
gen 05 Gacrux "$GRA Bajando la voz, cómplice, como quien cuenta un chisme tierno."
gen 06 Charon "Sos Julio, un carnicero uruguayo de unos 60 años, grandote y tímido, que está colorado de la vergüenza: le habla de usted a una clienta de años, con cariño, un poco avergonzado, sincero y cálido."
gen 07 Gacrux "$GRA Perdonándolo con humor y cariño: 'once años esperando' haciéndose la ofendida; 'lo perdono, eh' riéndose; el remate pícaro."
gen 08 Orus "Sos el narrador de Scalerics que entra al final: cálido, claro y seguro, con una sonrisa, ritmo ágil. 'No se le va a pasar' tranquilizador y simpático. 'Scalerics Puntos' bien claro. El cierre como una invitación simpática a compartir."
echo listo
