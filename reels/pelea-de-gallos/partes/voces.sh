#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8 9 10; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((20 + i * 5))
  done
  echo "FALLÓ $1"
}
RAP="Rapeá con ritmo marcado de hip hop, sobre un beat de noventa por minuto, cada línea como una barra, acentuando fuerte las rimas al final de cada línea."
gen 01 Puck "Sos el presentador de una batalla de freestyle callejera en una plaza de Montevideo, con micrófono y el público a los gritos. Arengás a la gente con muchísima energía, gritando, como animador de batalla de gallos."
gen 02 Charon "Sos un comerciante veterano de barrio, cansado pero orgulloso, rapeando en una batalla de freestyle. $RAP Canchero y desafiante."
gen 03 Kore "Sos una rapera filosa, fría y segura, en una batalla de freestyle. $RAP Burlona y letal; el último verso es el remate."
gen 04 Puck "Sos el presentador de una batalla de freestyle, gritando entusiasmado al público después de un remate durísimo."
gen 05 Charon "Sos un comerciante veterano de barrio, picado y orgulloso, rapeando en una batalla de freestyle. $RAP Con bronca y algo de humor."
gen 06 Kore "Sos una rapera filosa, fría y segura, en una batalla de freestyle. $RAP El último verso es el remate final, más lento y demoledor."
gen 07 Orus "Sos el jurado y narrador de la batalla: primero das el veredicto con suspenso y solemnidad, después cerrás cercano y con una sonrisa, invitando a comentar."
