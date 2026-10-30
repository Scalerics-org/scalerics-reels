#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-velorio.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
FUN="Sos el de la funeraria que da el discurso en un velorio de barrio en Montevideo, en una comedia de humor negro: voz grave, solemne, lenta y muy seria, como un sepulturero de película, pero con un remate seco y acusador."
TIA="Sos la tía uruguaya de 65 años en un velorio, en una comedia: llorás a los gritos, exagerada y teatral, sollozando entre palabras, como en una telenovela."
VEC="Sos el vecino uruguayo de 55 años que en el velorio está con el termo bajo el brazo y el mate en la mano: canchero, sobrador, comentando por lo bajo, con humor y sin ninguna pena."
DUE="Sos el dueño de un comercio uruguayo de 45 años, en una comedia: te defendés indignado y ofendido, a la defensiva."
CLI="Sos un muchacho uruguayo de 28 años que entra de golpe a su propio velorio, en una comedia: vivo, sano, descontracturado y divertido, sin entender nada."
gen 01 Algenib "$FUN Arrancás de golpe, solemne; hacés una pausa antes de 'Y lo mataste vos' y lo decís seco, acusando a cámara."
gen 02 Gacrux "$TIA Llorás desconsolada y a los gritos."
gen 03 Algenib "$FUN Leés el certificado con tono de forense, lento; 'el jueves' con pausa y seco."
gen 04 Charon "$DUE Saltás ofendido, rápido."
gen 05 Fenrir "$VEC Le contestás sobrador, cebando un mate; la frase de la película con falsa solemnidad."
gen 06 Algenib "$FUN Leés las cintas de las coronas de flores con solemnidad absoluta, como si fueran poesía."
gen 07 Gacrux "$TIA Reprochás llorando, indignada y exagerada."
gen 08 Puck "$CLI Entrás alegre y sorprendido, fuerte."
gen 09 Gacrux "$TIA Gritás de susto y de emoción, como un milagro."
gen 10 Puck "$CLI Le explicás tranquilo y contento, rápido y con ritmo, como quien cuenta algo obvio."
gen 11 Fenrir "$VEC Remate canchero, con una sonrisa, después de un sorbo de mate."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de un reel de comedia de humor negro: cálido, seguro, cercano y con ritmo, como quien trae la solución."
gen 13 Orus "Sos el narrador de Scalerics al final de un reel de comedia por el Día de los Difuntos: invitación pícara, con una sonrisa."
