#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/match-point.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
C1="Sos un comentarista veterano de tenis en un torneo sobre césped, transmitiendo por televisión: hablás en SUSURRO, bajito, muy cerca del micrófono, solemne y elegante para no molestar a los jugadores, pero con ironía seca. Y justamente por eso es gracioso."
C2="Sos una comentarista de tenis uruguaya en la transmisión de TV de un torneo sobre césped: hablás en SUSURRO, bajito y cerca del micrófono, refinada, irónica, como si estuvieras viendo una final histórica."
EMP="Sos una empleada joven de una tienda de ropa uruguaya, en el mostrador, hablando por teléfono con el depósito: amable pero apurada, un poco desesperada, con la clienta adelante."
DEP="Sos el encargado del depósito de una tienda uruguaya, atendiendo el teléfono entre cajas: canchero, desganado, sacándose el problema de encima como quien devuelve una pelota."
gen 01 Charon "$C1 Arrancá con suspenso, como presentando un partido eterno; 'nadie sabe si hay stock' con gravedad."
gen 02 Kore "$C2 Admirada en la primera frase; 'silencio en la tribuna' casi un murmullo; 'saca el local' expectante."
gen 03 Leda "$EMP La pregunta rápida y simpática."
gen 04 Charon "$C1 Apreciando el golpe, en voz bajita."
gen 05 Fenrir "$DEP Seco, sin ganas, rápido."
gen 06 Kore "$C2 Susurrando con asombro irónico; 'qué valiente' con sorna."
gen 07 Leda "$EMP Confundida y apurada, buscando entre cajas."
gen 08 Fenrir "$DEP Despachándola rapidísimo, aburrido."
gen 09 Charon "$C1 Lento y con pausas, como un punto que no termina nunca; 'ya pidió frutillas con crema' resignado y gracioso."
gen 10 Leda "$EMP Exasperada, levantando la voz."
gen 11 Fenrir "$DEP Ofendido, a la defensiva, levantando la voz."
gen 12 Kore "$C2 Susurro tajante, como una jueza de línea; 'deuce' en inglés, resignada."
gen 13 Aoede "Sos una clienta uruguaya de unos 35 años que esperó demasiado en el mostrador: educada pero harta, irónica, se va. Corto, con un suspiro."
gen 14 Charon "$C1 Solemne, como anunciando el final de una final; 'para el de enfrente' con dramatismo contenido."
gen 15 Kore "$C2 Cambia el tono: ya no se burla, defiende a los empleados con cariño; 'raqueta prestada' clara, como la clave del partido."
gen 16 Orus "Sos el narrador de Scalerics que entra cuando termina el partido: voz normal, no susurro, cálido, claro y seguro, como un amigo que trae la solución; 'sistema a medida' bien claro; ritmo ágil."
gen 17 Kore "$C2 Susurro emocionado, como cuando el ojo de halcón confirma un punto clave."
gen 18 Charon "$C1 Admirado, susurrando; 'ni se oyó el pique' con una sonrisa."
gen 19 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una pregunta directa al que mira, invitando a contestar en los comentarios."
