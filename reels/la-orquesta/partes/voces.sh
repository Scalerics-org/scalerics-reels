#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-orquesta.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos el PRESENTADOR de la transmisión de un concierto de gala por la tele, en un sketch de humor: hablás SUSURRANDO, muy bajito, muy cerca del micrófono, solemne y elegante como en un teatro lleno donde no se puede hacer ruido, con un humor seco que no se ríe."
DIR="Sos el DIRECTOR de una orquesta, que en realidad es el dueño de un comercio de Montevideo de unos 50 años, en un sketch de humor: nervioso, sudando, cansado, tratando de que todo salga bien delante del público."
PLA="Sos LA PLANILLA DE EXCEL, que toca el primer violín en una orquesta, en un sketch de humor: una diva engreída y snob, de voz aguda y afectada, que dice todo con aires de grandeza aunque esté desactualizada."
CUA="Sos EL CUADERNO DE LA CAJA, que toca el tambor en una orquesta, en un sketch de humor: un tipo bruto, entusiasta y a los gritos, medio atolondrado, que no está muy seguro de lo que anotó."
CAJ="Sos EL SISTEMA ENLATADO DE LA CAJA REGISTRADORA, que toca la trompeta en una orquesta, en un sketch de humor: voz de máquina, monótona, plana y robótica, como un contestador automático, sin ninguna emoción, articulando cada sílaba."
gen 01 Enceladus "$PRE Arrancás con un susurro grave y dramático; 'y suena horrible' con una pausa antes, seco, como dando una noticia terrible."
gen 02 Enceladus "$PRE Susurrando, con emoción contenida, como el momento previo al comienzo."
gen 03 Charon "$DIR Hablándole bajito a los músicos, apurado; 'y uno, y dos' marcando el compás con energía."
gen 04 Enceladus "$PRE Susurrando, presentando al músico con elegancia."
gen 05 Leda "$PLA Orgullosa; 'bueno, tenía' bajando el tono; 'me actualizaron en marzo' como si fuera un logro."
gen 06 Enceladus "$PRE Susurrando, presentando con elegancia."
gen 07 Fenrir "$CUA Gritando contento '¡yo anoté veinte!'; 'creo' dudando; la mancha de café como quien se disculpa."
gen 08 Enceladus "$PRE Susurrando, con un dejo de ironía."
gen 09 Kore "$CAJ Totalmente robótica y plana, como un mensaje de error."
gen 10 Charon "$DIR Desesperado, en voz baja pero exasperado, rogándole."
gen 11 Kore "$CAJ Robótica y plana, como un mensaje de error de una máquina; 'actualice a premium' como una publicidad grabada."
gen 12 Enceladus "$PRE Susurrando, con pena; 'hoy tiene libre' en voz más baja, como una mala noticia."
gen 13 Enceladus "$PRE Susurrando, como relatando una tragedia en cámara lenta; cada frase con una pequeña pausa; 'el director suda' muy serio."
gen 14 Charon "$DIR Desesperado y acelerado, cada vez más rápido y atropellado, como quien se ahoga en tareas."
gen 15 Enceladus "$PRE Susurrando con compasión y ternura, sin demorarte; 'una partitura distinta' lento y claro, como la revelación."
gen 16 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa y energía, en voz normal (ya no susurro); 'en una sola partitura' con orgullo."
gen 18 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice, desafiante y con una sonrisa, invitando a comentar."
