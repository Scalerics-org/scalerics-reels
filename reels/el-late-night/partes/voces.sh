#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/el-late-night; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
NICO="Sos Nico, el conductor de un programa de entrevistas de la tele uruguaya a la medianoche, sentado en su escritorio: canchero, pícaro, rápido, con timing de comediante, medio burlón, como un late night show."
AGE="Sos un agente de inteligencia artificial invitado a un programa de entrevistas de la tele: sereno, simpático, seguro y con humor seco; contesta tranquilo, como una celebridad humilde que no se da cuenta de lo graciosa que es."
gen 01 Fenrir "$NICO Arrancá con un golpe seco, mirando a cámara, presentando al invitado como una bomba; remata con picardía en 'y tu empleado lo odia'."
gen 02 Fenrir "$NICO Saluda a todo pulmón y anuncia al invitado como a una estrella de cine, con suspenso antes de 'el agente de IA'."
gen 03 Aoede "$AGE Agradece contento, saludando al público."
gen 04 Fenrir "$NICO Pregunta con falsa inocencia, como quien busca el chisme."
gen 05 Aoede "$AGE Es una respuesta corta y seca, totalmente tranquila, como algo obvio."
gen 06 Fenrir "$NICO Pregunta rápido, intrigado."
gen 07 Aoede "$AGE Lo cuenta como una anécdota cualquiera, sin darse importancia."
gen 08 Fenrir "$NICO Primero sorprendido, y después remata el chiste mirando a cámara, burlón."
gen 09 Aoede "$AGE Sigue contando tranquilo, como quien repasa la agenda del día."
gen 10 Fenrir "$NICO Pregunta con picardía, como buscando que se equivoque."
gen 11 Aoede "$AGE Lo dice con respeto y una sonrisa, sin dudar."
gen 12 Fenrir "$NICO Se pone serio de golpe, en tono de pregunta incómoda de periodista."
gen 13 Aoede "$AGE Lo dice tranquilo y filoso, con una pausa antes de 'a los tres días', como un remate."
gen 14 Fenrir "$NICO Pregunta en voz más baja, como un chisme jugoso."
gen 15 Aoede "$AGE Lo dice cálido y con humor, primero con un suspiro en 'me odiaba', y después contento."
gen 16 Fenrir "$NICO Lo grita eufórico, aplaudiendo, cerrando la entrevista."
gen 17 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás pidiendo que lo etiqueten, con picardía."
