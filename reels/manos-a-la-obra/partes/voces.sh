#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/manos-a-la-obra.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SENO="Sos la Seño Pochi, la conductora de un programa infantil de manualidades de la tele de los noventa: voz aguda, hiperentusiasta, cantarina y exageradamente alegre, hablándole a los niños con sonrisa enorme, como una maestra jardinera que se toma muy en serio la plasticola."
RAUL="Sos Raúl, el dueño de un comercio uruguayo de unos 50 años, que hace de ayudante en un programa infantil a las doce de la noche: agotado, sin ganas, voz baja y arrastrada, resignado, como alguien que no duerme hace semanas. Es gracioso por el contraste con la conductora."
NENE="Sos una nena de siete años del público de un programa infantil de la tele: voz finita de niña chica, inocente, curiosa y muy sincera."
gen 01 Laomedeia "$SENO Arrancás a los gritos de alegría con '¡Hola, amiguitos!', y 'como en el jardín' y 'con plasticola' con un entusiasmo desbordante."
gen 02 Laomedeia "$SENO Presentás al ayudante como si fuera una estrella; '¡Saludá, Raúl!' cantado."
gen 03 Charon "$RAUL Decís 'Hola' apagado, sin ninguna energía, casi un suspiro."
gen 04 Laomedeia "$SENO Enumerás los materiales como una receta mágica, cada uno con más entusiasmo; '¡y tres horas de tu noche!' feliz, como si fuera lo más lindo del mundo."
gen 05 Laomedeia "$SENO Explicás el paso como algo divertidísimo."
gen 06 Charon "$RAUL Decís 'Copiado' monótono, sin levantar la vista."
gen 07 Laomedeia "$SENO Didáctica y feliz; '¡Bien derechito!' cantado."
gen 08 Charon "$RAUL Desganado y resignado, en voz baja, como quien ya sabe que va a salir mal."
gen 09 Laomedeia "$SENO Con alegría exagerada; 'uno por uno' marcando cada palabra como si contara con los dedos."
gen 10 Leda "$NENE Preguntás sorprendida, con los ojos grandes."
gen 11 Laomedeia "$SENO '¡A los cuarenta!' feliz como si fuera un juego; el paso cuatro con la misma alegría, y '¡a mano!' como un grito de festejo."
gen 12 Charon "$RAUL Agotadísimo, mirando el reloj, casi dormido."
gen 13 Laomedeia "$SENO Festejando a los gritos, como la canción del final del programa."
gen 14 Leda "$NENE Contándole a la seño en voz baja, preocupada y sincera."
gen 15 Orus "Sos el narrador de Scalerics que entra cuando se apaga el programa infantil: cálido, claro y con una sonrisa; la lista dicha con cariño y 'Tu noche, no.' como una verdad simple y firme."
gen 16 Orus "Sos el narrador de Scalerics: claro y cercano, explicando simple y con ritmo, como un amigo que trae la solución."
gen 17 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a compartir el video."
