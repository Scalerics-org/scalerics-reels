#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/tiene-mensajes.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
MAQ="Sos la voz grabada de un contestador automático de los años 90: una voz de mujer robótica, monocorde, sin ninguna emoción, todas las palabras con la misma altura, articulando prolijo como una máquina; y por eso es gracioso."
GRA="Sos Graciela, una clienta uruguaya de unos 55 años dejando un mensaje en un contestador: amable, educada, un poco pasivo agresiva."
DUE="Sos el dueño de un comercio uruguayo, de unos 50 años, escuchando el contestador a la noche: cansado, murmurando para sí mismo, confundido, medio culpable; muy cómico, en voz baja."
gen 01 Kore "$MAQ La segunda frase ('y no te acordás de quién es ninguno') igual de monocorde, como si la máquina te bardeara sin darse cuenta."
gen 02 Aoede "$GRA Dulce y paciente; 'sin apuro' con una sonrisa que dice que sí hay apuro."
gen 03 Charon "$DUE Rascándose la cabeza, buscando en la memoria."
gen 04 Kore "$MAQ"
gen 05 Iapetus "Sos Ernesto, un señor uruguayo de unos 70 años dejando un mensaje en un contestador: formal, lento, un poco ofendido; 'no me dijo qué lunes' con ironía seca."
gen 06 Kore "$MAQ"
gen 07 Leda "Sos una novia uruguaya de unos 28 años dejando un mensaje en un contestador: acelerada, nerviosa, al borde del ataque; '¿las sillas vienen?' casi gritando."
gen 08 Charon "$DUE Revolviendo post-its y el celular, cada vez más desesperado y en voz baja; 'o en mi cabeza' rendido."
gen 09 Kore "$MAQ"
gen 10 Puck "Sos un pibe uruguayo de unos 22 años dejando un mensaje en un contestador: decepcionado, con sarcasmo, canchero."
gen 11 Kore "$MAQ"
gen 12 Aoede "$GRA Ahora tranquila, resignada y con un poquito de veneno: 'él me llamó' lento y bien clarito."
gen 13 Charon "$DUE Perplejo, ofendido, casi en un susurro."
gen 14 Orus "Sos el narrador de Scalerics que entra cuando termina el contestador: cálido, claro y seguro, ritmo ágil; 'te importan' comprensivo, 'la cabeza no avisa' con una sonrisa; CRM se dice 'ce erre eme', bien claro."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, invitando a etiquetar a alguien en los comentarios."
echo listo
