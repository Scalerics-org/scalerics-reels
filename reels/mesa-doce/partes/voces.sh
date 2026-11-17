#!/bin/bash
# genera las voces de mesa-doce (Gemini TTS); de a una, respetando la cuota por minuto
TR="Sos Rubén, 58 años, dueño de una distribuidora mayorista de Montevideo, cliente de toda la vida de una pizzería de barrio. Voz grave, cansada, uruguaya, con sarcasmo seco y picante, como quien cuenta una injusticia que le causa gracia. En primera persona, pausado, sin gritar."
TD="Sos el dueño de una pizzería de barrio de Montevideo, de 50 años, simpático, cordial y medio gritón, saludando a un cliente en la mesa con una sonrisa enorme."
TN="Sos el narrador de Scalerics: cercano, claro y seguro, invitando a comentar sin vender de más."
gen(){ local b=$1 v=$2 t=$3; [ -f partes/$b.wav ] && return; for k in 1 2 3 4; do node ../../herramientas/voz.mjs partes/$b.txt partes/$b.wav --voz $v --tono "$t" 2>/dev/null && return; echo "reintento $b"; sleep 25; done; }
for b in r01 r02 r03 r04 r05 r06 r07 r08 r09 r10 r11; do gen $b Algenib "$TR"; done
gen d01 Iapetus "$TD"; gen d02 Iapetus "$TD"; gen n01 Orus "$TN"
for f in partes/*.wav; do echo "$f $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)"; done
