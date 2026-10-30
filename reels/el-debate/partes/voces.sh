#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-debate.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
MOD="Sos la moderadora de un debate electoral televisado en Uruguay, a las nueve de la noche: voz firme, seria, impecable, de periodista de noticiero; neutral y cortante, y justamente por lo seria es graciosa."
DUE="Sos un candidato en un debate electoral: el dueño de un comercio de Montevideo de unos 50 años, cansado y chamuyero, hablando como político en campaña, prometiendo con la mano en el pecho cosas que nunca va a cumplir; exagerado, gracioso sin querer."
AGE="Sos el otro candidato del debate: un agente de inteligencia artificial, tranquilo, educado y seguro, con una media sonrisa; filoso sin levantar la voz, como el que sabe que ya ganó."
gen 01 Kore "$MOD Abrís el programa con un golpe dramático y solemne, como anunciando el debate del siglo; 'vos contra un agente de IA' bien marcado, mirando a cámara."
gen 02 Charon "$DUE Arrancás el discurso de campaña con voz de tribuna y emoción falsa."
gen 03 Kore "$MOD Leés el chequeo de datos seca, sin emoción; pausa breve y 'Falso.' como un martillazo."
gen 04 Charon "$DUE Subís el tono, prometiendo a los gritos, entusiasmado, como en un acto de cierre de campaña."
gen 05 Kore "$MOD 'Falso.' cortante; la segunda frase, seca e irónica."
gen 06 Kore "$MOD Hacés una pregunta directa y dura, como repregunta de periodista."
gen 07 Charon "$DUE Esquivás la pregunta como político, con tono de excusa, arrastrando el final."
gen 08 Kore "$MOD Lo cortás en seco, fastidiada pero educada."
gen 09 Charon "$DUE Desesperado, con la mano en el pecho, prometiendo con emoción exagerada."
gen 10 Kore "$MOD Seca y lapidaria; 'Falso.' como sentencia."
gen 11 Kore "$MOD Das la palabra con formalidad de debate."
gen 12 Achird "$AGE Calmo y preciso, sin apuro, cada frase como un dato; el final 'vuelve el jueves' con una sonrisa."
gen 13 Kore "$MOD Una sola palabra, firme, casi sorprendida."
gen 14 Charon "$DUE Ofendido y alarmado, señalando al otro candidato."
gen 15 Achird "$AGE Tranquilizador y canchero; 'me postulo de vice' con gracia; 'vos gobernás, yo hago el seguimiento' como un trato justo; el final, cálido."
gen 16 Kore "$MOD Leés el resultado de la encuesta en boca de urna, solemne, como cierre del debate."
gen 17 Orus "Sos el narrador de Scalerics que entra cuando termina el debate: cálido, claro y seguro, explicando simple y cercano. 'Y no tiene veda.' con una sonrisa."
gen 18 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a un amigo."
