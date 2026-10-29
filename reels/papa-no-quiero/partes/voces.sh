#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/papa-no-quiero.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
HIJO="Sos un pibe uruguayo de unos veinte años, el hijo del dueño de una pizzería de barrio de Montevideo, hablándole a tu papá adentro del local mientras lo filmás con la cámara vieja de la familia. Cariñoso, sincero y con humor, medio canchero, como quien le dice una verdad difícil a su viejo sin querer lastimarlo."
PAPA="Sos un pizzero uruguayo de unos sesenta años, voz grave, gastada y cansada, dueño de una pizzería de barrio de toda la vida. Tu hijo te está hablando en el local."
gen 01 Puck "$HIJO Arrancás de golpe, serio, como quien lo viene ensayando hace días y lo larga de una."
gen 02 Charon "$PAPA Acaba de decirte que no se va a quedar con el negocio: te ofendés, dramático e indignado como en una telenovela, levantando la voz, herido en el orgullo."
gen 03 Puck "$HIJO Paciente, y el remate dicho con cara de pena, despacito."
gen 04 Charon "$PAPA Indignado y desconcertado, casi gritando, como si Google te hubiera insultado."
gen 05 Puck "$HIJO Divertido, sobrador y cariñoso, cada remate con una mini pausa antes."
gen 06 Charon "$PAPA Orgulloso y terco, de brazos cruzados, seguro de que tenés razón."
gen 07 Puck "$HIJO Primero canchero, después más serio; la última frase, sincera y con cariño, bajando la voz."
gen 08 Charon "$PAPA Se te quiebra el orgullo: preguntás despacito, conmovido, casi en un susurro, sin poder creer el elogio."
gen 09 Puck "$HIJO Emocionado y cálido, despacio, como una reconciliación; la última frase con una sonrisa."
gen 10 Charon "$PAPA Después de un silencio largo, con la voz baja, medio a regañadientes pero ya convencido, carraspeando, con humor."
gen 11 Orus "Sos el narrador de Scalerics que entra al final de un video casero de una familia: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación cómplice."
