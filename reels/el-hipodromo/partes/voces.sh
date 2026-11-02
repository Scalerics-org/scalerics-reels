#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-hipodromo.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
REL="Sos un relator de turf uruguayo transmitiendo una carrera de caballos en el hipódromo de Maroñas por la radio: rapidísimo, como una ametralladora, apasionado, a los gritos, con la cadencia clásica del relato hípico, y justamente por eso es gracioso."
CLI="Sos una clienta joven de unos 28 años mandando un audio de WhatsApp a un local de ropa: simpática, tranquila, concreta, un poco ilusionada."
APO="Sos un apostador veterano de la tribuna del hipódromo, uruguayo, de unos 60 años, con el boleto en la mano: ronco, desesperado e indignado porque su caballo no corre, de manera muy cómica."
gen 01 Fenrir "$REL Arrancás a todo volumen con la largada; la segunda frase indignado y burlón, 'dormido' estirado."
gen 02 Fenrir "$REL La hora rápida, ambientando; después a los gritos cuando sale la clienta como una flecha."
gen 03 Leda "$CLI Pregunta normal y amable."
gen 04 Fenrir "$REL Incrédulo y a los gritos; 'en visto' tres veces, cada vez más alto y más rápido."
gen 05 Charon "$APO Le grita al caballo desde la tribuna; la segunda frase desesperada, casi llorando de bronca."
gen 06 Fenrir "$REL ¡Sorpresa total! Gritando como cuando un caballo atropella en la recta final, rapidísimo."
gen 07 Fenrir "$REL El clímax de la llegada: 'llegan, llegan, llegan' cada vez más alto, 'ganó' explotando; la última frase burlona."
gen 08 Charon "$APO Furioso, rompiendo el boleto."
gen 09 Fenrir "Sos el mismo relator de turf uruguayo, pero ahora se calma de golpe y le habla al apostador con cariño y calma, defendiendo al caballo, despacio y cálido; el remate 'no tiene jinete' suave, como una revelación."
gen 10 Orus "Sos el narrador de Scalerics que entra cuando se calma la carrera: cálido, claro y seguro; 'agente de IA' bien claro, como la revelación."
gen 11 Orus "Sos el narrador de Scalerics: claro y cercano, explicando simple, como un amigo que trae la solución, ritmo ágil."
gen 12 Fenrir "$REL Festejando a los gritos, triunfal."
gen 13 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
