#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-truco.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
F="Sos un pillo sobrador de barrio jugando al truco en un boliche de Montevideo, canchero, burlón, con sonrisa de costado; cantás las jugadas fuerte, golpeando la carta contra la mesa."
P="Sos el mirón de la mesa de truco en un boliche de Montevideo, un veterano gracioso y exagerado que relata la partida como un relator de fútbol, con muchísima energía y gritos de asombro."
C="Sos un comerciante de barrio de unos cincuenta años, cansado pero canchero, jugando al truco en el boliche; habla con calma, algo desganado y orgulloso."
gen 01 Fenrir "$F Arrancá gritando TRUCO con todo y después decí el resto picante y sobrador."
gen 02 Puck "$P"
gen 03 Charon "$C Frena al otro con calma: el envido está primero."
gen 04 Fenrir "$F Contestás gritando, ganador."
gen 05 Puck "$P"
gen 06 Charon "$C Desafiante pero sin darse cuenta de que se está hundiendo."
gen 07 Fenrir "$F Rematás tranquilo, sobrador, disfrutándolo."
gen 08 Puck "$P En voz baja y cómplice al principio, como un chisme, y después exclamando."
gen 09 Charon "$C Nervioso, confiesa con vergüenza graciosa y después pregunta medio asustado."
gen 10 Fenrir "$F Mostrás la carta despacio, saboreando cada palabra, y cerrás gritando VALE CUATRO."
gen 11 Puck "$P Gritando a todo el boliche, muerto de risa."
gen 12 Orus "Sos el narrador de Scalerics: entrás después del barullo, tranquilo y cercano, con una sonrisa, dando vuelta la historia a favor del dueño, y cerrás con complicidad."
