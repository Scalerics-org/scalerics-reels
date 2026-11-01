#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-jardinero.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in $(seq 1 14); do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((20 + i * 4))
  done
  echo "FALLÓ $1"
}
JAR="Sos TITO, el CONDUCTOR de un programa de jardinería de la tarde de la televisión uruguaya, en un sketch de humor: un señor de unos 60 años, cálido, didáctico, entusiasta y un poco cursi, que habla de las plantas con ternura y con ironía. RITMO ÁGIL: hablás rápido, con pausas cortas; el humor está en la intención, no en la lentitud."
PLA="Sos una PLANTA MARCHITA que habla, en un sketch de humor: en realidad es una clienta de Montevideo de unos 35 años que preguntó un precio y nadie le contestó. Voz seca, cansada y muy irónica, ofendida, muy graciosa."
DUE="Sos el DUEÑO de un comercio de barrio de Montevideo, de unos 50 años, desbordado y ofendido: se defiende a los gritos, exasperado pero simpático, muy expresivo y gracioso."
gen 01 Puck "$JAR Arrancás bajito y grave, como un documental de naturaleza ante una planta muerta, con un golpe seco y acusador en 'Y lo dejaste secar'."
gen 02 Puck "$JAR Ahora sí, presentación de programa de la tarde: alegre, cantarín, con una sonrisa enorme; 'Y miren lo que encontramos' con picardía, bajando la voz."
gen 03 Puck "$JAR Presentando un ejemplar como en una exposición de plantas, con fingida admiración; 'después te paso' imitando a un vendedor apurado; 'Y nunca le pasaron' seco, triste."
gen 04 Leda "$PLA Seca, irónica, resentida, arrastrando las palabras."
gen 05 Puck "$JAR Presentando otro ejemplar con fingida solemnidad; 'Más seco que vos a fin de mes' de remate, pícaro, como un chiste al público."
gen 06 Puck "$JAR Presentando el tercer ejemplar con dramatismo creciente; 'La nena ya cumplió dieciséis' como remate, lento y con lástima cómica."
gen 07 Charon "$DUE Interrumpiendo, gritando, ofendido, desesperado."
gen 08 Puck "$JAR Cambia el tono: comprensivo, cálido, más bajito, como quien consuela a un amigo; 'quedó en el fondo del vivero' con cariño."
gen 09 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 10 Puck "$JAR Maravillado, susurrando con emoción, como quien muestra un milagro de la naturaleza."
gen 11 Leda "Sos una clienta de Montevideo de unos 35 años que por fin recibe respuesta de un comercio: sorprendida, feliz, encantada, muy expresiva."
gen 12 Puck "$JAR Cierre de programa, orgulloso y feliz, triunfal, con una sonrisa enorme."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a etiquetar a un amigo."
