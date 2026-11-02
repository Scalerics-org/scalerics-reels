#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/toma-catorce; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" > partes/$1.log 2>&1 && return
    sleep $((8 + i * 5))
  done
  echo "FALLÓ $1"
}
DIR="Sos la directora de una publicidad de barrio en Montevideo, en pleno rodaje: seca, cansada, harta, con ironía filosa y voz firme de quien ya repitió lo mismo mil veces."
BET="Sos Beto, el dueño de una pizzería de barrio en Montevideo, actuando en su propia publicidad: simpático, bonachón, medio exagerado, con voz de vendedor de la tele cuando actúa y nervioso cuando lo interrumpen."
CLI="Sos una clienta joven de Montevideo que manda un audio de WhatsApp a una pizzería: casual, rápida, con hambre."
CL2="Sos una señora de Montevideo que pregunta por WhatsApp a una pizzería: amable, directa, curiosa."
ORU="Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta la solución después del chiste; seguro y claro."
gen 01 Kore "$DIR Arrancá seca y cansada con 'Toma catorce', remarcá 'catorce' con fastidio, y el '¡Acción!' del final con resignación de director." &
gen 02 Puck "$BET Acá actúa: voz de publicidad, sonrisa enorme, y la frase queda cortada en el aire al final, como interrumpido." &
gen 03 Leda "$CLI Corto, como un mensaje de voz." &
gen 04 Puck "$BET Contestando al celular con alegría, olvidándose de la cámara." &
gen 05 Kore "$DIR '¡Corten!' fuerte y harta; 'Celular en silencio' con los dientes apretados." &
wait
gen 06 Puck "$BET Decí SOLO estas siete palabras, nada más, y cortá en seco: otra vez la voz de publicidad, más rápido y nervioso; la frase queda cortada en el aire." &
gen 07 Zephyr "$CL2 Corto, como un mensaje de voz." &
gen 08 Puck "$BET Contestando contento al celular, sin darse cuenta de que arruinó la toma." &
gen 09 Kore "$DIR '¡Corten!' a los gritos; lo de Rápido y Furioso con ironía sarcástica; 'Vicky, sacale el celular' como una orden." &
gen 10 Puck "$BET Desesperado, forcejeando para que no le saquen el celular." &
wait
# 11: se generó con "Beto, escuchame." al principio y se recortó (original en 11-orig.wav)
gen 11 Kore "$DIR Acá cambia: baja la voz, se calma, le habla de frente con cariño firme, como quien dice una verdad incómoda; 'quedan en visto' pausado." &
gen 12 Puck "$BET Sincero, cansado, medio derrotado." &
# 13: se generó con el texto "... horarios. Contesta si hay delivery, toma el pedido ..." y se recortó "Contesta si hay delivery" con ffmpeg (original en 13-orig.wav)
gen 13 Orus "$ORU" &
gen 14 Kore "$DIR Ahora con esperanza y energía, como la última toma del día." &
gen 15 Puck "$BET Voz de publicidad perfecta, seguro, con una sonrisa enorme, y el remate con picardía." &
gen 16 Kore "$DIR '¡Esa va!' feliz y aliviada; el resto cómplice, invitando a compartir." &
wait
