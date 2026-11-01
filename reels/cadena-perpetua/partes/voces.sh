#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/cadena-perpetua.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DUE="Sos un preso de película de cárcel: el dueño de un almacén de barrio de Montevideo, de unos 50 años, que cuenta su condena desde la celda. Cansado, resignado, voz ronca y apagada, con humor seco y melancólico, como el narrador de una película de presos."
VET="Sos un preso VETERANO de la celda de al lado, en una película de cárcel: voz muy grave, lenta, rasposa, sabia y misteriosa, como el viejo que conoce todos los secretos del penal. Habla bajo, con calma de quien lleva treinta años adentro, y un toque de sorna."
GUA="Sos un GUARDIA de cárcel de película pasando lista por el pasillo: grita fuerte, seco, autoritario y medio burlón, golpeando las rejas con el bastón."
gen 01 Algenib "$VET Arrancás con un golpe seco, lento y pesado, mirando al recién llegado a los ojos; 'y el juez fuiste vos' con una sonrisa torcida."
gen 02 Charon "$DUE Recuerda el primer día, todavía ingenuo; la pregunta del final, confiado, sin saber lo que le esperaba."
gen 03 Charon "$DUE Más cansado; 'copiar, pegar' mecánico, como un robot agotado; el final, resignado."
gen 04 Fenrir "$GUA Gritando de golpe, con fastidio, como quien lo encuentra otra vez en falta."
gen 05 Charon "$DUE Muy cansado, casi dormido; 'tu pedido está listo' y 'me debés el de marzo' como quien escribe mensajes de memoria, monótono."
gen 06 Algenib "$VET Despacio, como una ley del penal; misterioso."
gen 07 Charon "$DUE Ahora con un brillo de esperanza, en secreto, bajando la voz como un conspirador; 'como en Sueños de libertad' ilusionado."
gen 08 Algenib "$VET Se ríe por lo bajo, incrédulo y burlón."
gen 09 Charon "$DUE Insiste, en susurro, esperanzado, como quien pregunta por una leyenda."
gen 10 Algenib "$VET Como contando una leyenda trágica, y el remate 'ahora están presos los dos' seco y gracioso."
gen 11 Algenib "$VET Se pone serio, le revela un secreto; muy grave, despacio, con pausa antes de 'hay una llave'."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de una película de cárcel, cuando se abre la celda: cálido, seguro, cercano, con una sonrisa y energía."
gen 13 Fenrir "$GUA Primero grita como siempre; después '¿Recluso?' desconcertado, mirando una celda vacía."
gen 14 Charon "$DUE Ahora libre, feliz y relajado, con ruido de fiesta imaginado; ya no está cansado: sonríe."
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, invitando a comentar."
