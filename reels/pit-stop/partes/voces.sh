#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/pit-stop.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
REL="Sos un relator uruguayo de automovilismo transmitiendo una carrera de Fórmula 1 por televisión: excitadísimo, a los gritos, rapidísimo, con la emoción de una largada, y justamente por eso es gracioso."
COM="Sos una comentarista técnica de Fórmula 1 en la transmisión de TV, uruguaya: pausada, seca, analítica e irónica, como quien ya vio de todo en los boxes."
CLI="Sos un cliente de un comercio, de unos 30 años, hablando por la radio del auto como un piloto de Fórmula 1 que llama a boxes: voz cortada, apurado y concreto."
DUE="Sos el dueño de un comercio uruguayo de unos 50 años, haciendo de mecánico en boxes: cansado, desordenado, buscando algo entre mil cosas, medio fastidiado, sin ningún apuro."
gen 01 Puck "$REL Arrancás a los gritos como anunciando un récord histórico; 'la más lenta de la historia' estirado, con indignación divertida."
gen 02 Puck "$REL Primero ambientando la noche, después a los gritos cuando entra el cliente."
gen 03 Leda "$CLI Primero 'box, box' seco y profesional, después la pregunta normal, con apuro."
gen 04 Puck "$REL Con suspenso en los puntos suspensivos y después incrédulo, a los gritos."
gen 05 Charon "$DUE Buscando por todos lados, perdido; la última frase desganada, como sacándose el problema de encima."
gen 06 Leda "$CLI Esperando, desconcertado, con silencio de radio; la pregunta casi triste."
gen 07 Kore "$COM Lapidaria; cada tiempo más lento y resignado; el remate 'es una siesta' seco e irónico."
gen 08 Puck "$REL ¡Sorpresa total! A los gritos, como un sobrepaso en la última vuelta."
gen 09 Puck "$REL Rapidísimo como una ametralladora: precio, turno, pedido; 'dos segundos' gritado; festejando la vuelta rápida."
gen 10 Kore "$COM Pausada y lapidaria; 'ese ya no vuelve' como sentencia."
gen 11 Kore "$COM Cambia el tono: defendiendo al dueño con cariño y respeto; enumerando las tareas rápido; 'duerme' suave, con comprensión."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se calma la carrera: cálido, claro y seguro; 'agente de IA' bien claro, como la revelación."
gen 13 Orus "Sos el narrador de Scalerics: claro y cercano, explicando simple, como un amigo que trae la solución, ritmo ágil."
gen 14 Puck "$REL Festejando a los gritos la parada; 'durmiendo' riéndose, de buen humor."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
