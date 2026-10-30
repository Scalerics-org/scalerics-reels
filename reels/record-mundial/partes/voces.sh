#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/record-mundial.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos el presentador de una transmisión en vivo de un intento de récord mundial, en un estadio lleno, con micrófono en mano: relator eufórico, acelerado, exagerado como un relator de fútbol uruguayo, y gracioso: sabés que lo que relatás es ridículo."
JUE="Sos el juez oficial de los récords mundiales, de traje y con portapapeles: voz grave, seria, solemne y lenta, de funcionario que lee un reglamento; humor seco, cero emoción."
WAL="Sos Walter, dueño de una rotisería de Montevideo, de unos 50 años, que está a la medianoche copiando y pegando pedidos en la computadora: agotado, nervioso y apurado, gracioso sin querer."
gen 01 Puck "$PRE Arrancás en voz baja, casi confidencial, como quien cuenta un secreto, mirando a cámara; la segunda frase, más lenta, con pena teatral."
gen 02 Puck "$PRE Ahora explotás de euforia, a los gritos, presentando el intento como si fuera la final del mundial."
gen 03 Rasalgethi "$JUE Leés el reglamento sin apuro, con pausas secas entre cada punto. 'Y sin cenar' con la misma seriedad."
gen 04 Puck "$PRE Relatás a los gritos, como un gol, cantando el número y el pedido."
gen 05 Aoede "Sos Graciela, la esposa de Walter, uruguaya de unos 50 años: cariñosa, cansada y un poco resignada, le traés el mate a la medianoche. Hablás bajito y dulce, la pregunta con un poquito de reproche."
gen 06 Charon "$WAL Le contestás a los gritos sin sacar los ojos de la pantalla, desesperado."
gen 07 Rasalgethi "$JUE Informás el calambre como un parte médico oficial, serio y lento."
gen 08 Puck "$PRE Contás los números cada vez más fuerte, y en 'nuevo récord mundial' gritás como un gol en la final."
gen 09 Rasalgethi "$JUE Ahora bajás la voz, más humano y con pena, casi en secreto: es la parte triste. Pausas largas entre frases."
gen 10 Charon "$WAL Le contestás ofendido y cansado, con la voz quebrada, sin entender."
gen 11 Rasalgethi "$JUE Corto, suave y firme, con una media sonrisa."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de la transmisión de un récord: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera y graciosa."
