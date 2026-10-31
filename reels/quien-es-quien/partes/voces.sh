#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/quien-es-quien. Voces: conductor Sadachbia (02 04 06 08 10 12), Ramiro Charon (03 05 07 13),
# Silvia Leda (01 09), el de enfrente Achird (11), narrador Orus (14 15).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos el conductor de un programa de juegos de la televisión uruguaya, de esos de concurso con luces y público: voz de animador, enérgica, eufórica, rápida, exagerada a propósito, con mucho show; por eso es gracioso."
RAM="Sos Ramiro, el dueño de una ferretería de barrio de Montevideo, de unos 50 años, sentado como concursante en un programa de juegos de la tele. Nervioso, dudando, sin tener idea; gracioso sin querer."
SIL="Sos Silvia, una clienta uruguaya de unos 40 años que le escribe por WhatsApp a una ferretería."
gen 01 Leda "$SIL Leés tu mensaje de WhatsApp con naturalidad, amable y un poco expectante, como una nota de voz casual."
gen 02 Sadachbia "$CON 'Y no tenés idea de quién es' como un remate burlón; '¡Bienvenidos a Quién es quién!' a los gritos, como la apertura del programa; presentás a Ramiro con show; 'Primera pregunta' con suspenso y '¿te compró algo?' rápido."
gen 03 Charon "$RAM Dudás, con un 'eh' largo, y admitís que no sabés, avergonzado."
gen 04 Sadachbia "$CON Preguntás con suspenso, acercándote al concursante."
gen 05 Charon "$RAM Decís solo esto, dudando, arrastrando la última palabra, y te callás."
gen 06 Sadachbia "$CON Apurado y eufórico, presionando al concursante, cada pregunta más rápida que la anterior."
gen 07 Charon "$RAM '¿Cuál Gómez? Tengo tres' indignado y confundido; después dudás y elegís con miedo, despacio: 'Bajo... a la del calefón'."
gen 08 Sadachbia "$CON Dramático, como cuando el concursante se equivoca feo: '¡Bajó la equivocada!' con un grito de horror cómico; '¡Se termina el tiempo!' con urgencia."
gen 09 Leda "$SIL Desilusionada y cansada de esperar, con un suspiro: 'Bueno... dejá.' Seca, sin enojo, como quien se va."
gen 10 Sadachbia "$CON Un '¡Uuuh!' largo de lástima, como el público, y después anunciás la tragedia con show."
gen 11 Achird "Sos el dueño de la ferretería de enfrente, uruguayo, de unos 35 años, que le escribe por WhatsApp a una clienta: simpático, atento, cálido y rápido, como quien se acuerda perfecto de lo que hablaron."
gen 12 Sadachbia "$CON Revelás la respuesta como en el final del juego: '¡Era Silvia, la del calefón!' con show; 'Ramiro, perdiste' con lástima teatral."
gen 13 Charon "$RAM Protestás ofendido, casi gritando, como quien jura que tiene una memoria perfecta."
gen 14 Orus "Sos el narrador de Scalerics que entra al final de un programa de juegos de la tele: cálido, claro y seguro, explicando simple, con una sonrisa. 'Y se acuerda' comprensivo; 'jugar de memoria' con un guiño."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una pregunta para que la gente comente."
