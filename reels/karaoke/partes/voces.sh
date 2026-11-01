#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/karaoke.
# partes/voz.mjs = herramientas/voz.mjs con --ritmo (para que Vale pueda ir lento, como bolero).
V=partes/voz.mjs
gen() { # n voz tono [ritmo]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" ${4:+--ritmo "$4"} 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ANI="Sos EL ANIMADOR del karaoke de un bar de barrio de Montevideo, de unos 40 años, en un sketch de humor: canchero, fiestero, con voz de presentador de boliche, exagerado y simpático, agarrando el micrófono."
VAL="Sos VALE, una MUJER de unos 30 años, clienta despechada, en la noche de karaoke de un bar de Montevideo, con el micrófono en la mano. Hablás con voz femenina, en un sketch de humor."
BOL="Recitás la letra como un BOLERO SUFRIDO y teatral (sin cantar): arrastrando las vocales, con la voz quebrada de despecho, muy dramática, y haciendo una PAUSA LARGA en cada '...'. Exagerado y gracioso, como una cantante de bolero herida."
LENTO=" Ritmo lento y dramático, con pausas largas en los puntos suspensivos."
PUB="Sos UN TIPO DEL PÚBLICO del bar, medio pasado de cervezas, que grita desde una mesa para alentar a la cantante: el 'Uuuh' largo y burlón, y '¡Dale, Vale!' gritado con entusiasmo."
DUE="Sos EL DUEÑO de un local de barrio de Montevideo, de unos 55 años, que grita desde la barra del bar, cansado y herido en su orgullo: primero indignado y a los gritos, después baja el tono, sincero y medio tierno, casi pidiendo perdón."
# 01 (el animador presentaba a Vale) se sacó: el gancho tiene que ir en el primer segundo
gen 02 Leda "$VAL Hablás al micrófono antes de cantar, despechada y con rencor contenido: 'tu local' con desprecio y 'que me dejó en visto' con dolor, como dedicando un tema a un ex." "$LENTO"
gen 03 Fenrir "$PUB"
gen 04 Leda "$VAL $BOL" "$LENTO"
gen 05 Leda "$VAL $BOL 'pasá el lunes' con amargura." "$LENTO"
# 06 (Instagram, "una promoción") se sacó por largo
gen 07 Leda "$VAL Es el ESTRIBILLO: más fuerte, apasionado y desgarrado, como el clímax del bolero; '¡al instante!' gritado triunfal, con despecho." "$LENTO"
gen 08 Puck "$ANI Aplaudiendo, lee el puntaje del karaoke en la pantalla como un anuncio de concurso, con suspenso en '...' y '¡en visto!' como una sentencia burlona."
gen 09 Charon "$DUE"
gen 10 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa; 'solo, no' como consolando al dueño; 'que ninguna clienta te dedique una canción' con complicidad."
gen 11 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, invitando a comentar."
