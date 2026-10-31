#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/talle-unico. Después: partes/recortar.sh y node partes/componer.mjs
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CRI="Sos Bárbara Lamé, la crítica de moda más despiadada de la alfombra roja, de Montevideo: voz filosa, teatral y altanera, arrastrando las palabras con desprecio elegante, como quien destroza un look en vivo y lo disfruta."
PRE="Sos el presentador de un desfile de moda de la tele, uruguayo, eufórico y exagerado, con voz de animador de alfombra roja, a todo volumen."
DUE="Sos Don Hugo, ferretero de barrio de Montevideo de unos 60 años, voz grave y cansada, ofendido y a la defensiva."
TIE="Sos la dueña de una tienda de ropa de Montevideo, de unos 40 años, resignada, justificándose con un suspiro."
gen 01 Kore "$CRI Arrancás mirando a cámara, lento y venenoso: le hablás al que mira en la cara. Después de Querido hacés una pausa con desdén."
gen 02 Puck "$PRE Presentás el programa y a la crítica con bombos y platillos, rápido y de corrido."
gen 03 Kore "$CRI Burlona, con una risita de desprecio."
gen 04 Charon "$DUE Gritando indignado, defendiéndose."
gen 05 Kore "$CRI Decís una sola palabra en inglés, seca y cortante, como quien echa a alguien: next."
gen 06 Puck "$PRE Anunciás el siguiente look con euforia."
gen 07 Kore "$CRI Asombrada y sarcástica, al final con lástima condescendiente."
gen 08 Puck "$PRE Anunciás con euforia."
gen 09 Kore "$CRI Horrorizada, como si viera un crimen de la moda."
gen 10 Leda "$TIE Encogiéndote de hombros."
gen 11 Kore "$CRI Primero una pregunta indignada y teatral. Después bajás la voz, seria y firme, revelando un secreto de la moda, y terminás con aplomo."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de un programa de moda: cálido, seguro y cercano, con una sonrisa."
gen 13 Kore "$CRI Por primera vez encantada, aprobando con un suspiro de placer."
gen 14 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: el cierre es una invitación canchera y cómplice a compartir el video."
