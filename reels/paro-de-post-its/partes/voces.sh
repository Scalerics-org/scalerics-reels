#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/paro-de-post-its; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" > partes/$1.log 2>&1 && return
    sleep $((8 + i * 5))
  done
  echo "FALLÓ $1"
}
DEL="Sos el delegado de una asamblea de post-its en paro: un post-it amarillo con megáfono, montevideano, arengador, enérgico e indignado pero gracioso, como gritando por megáfono en una movilización, con mucha convicción y picardía."
PER="Sos una periodista de noticiero uruguayo haciendo un móvil en vivo de último momento: rápida, sorprendida, como si cubriera algo insólito."
ROS="Sos un post-it rosa, una compañera joven montevideana, harta y dramática, indignada con ironía, como en una asamblea."
CEL="Sos un post-it celeste veterano, viejo y cansado, de voz grave, seco y resignado, con humor seco de jubilado montevideano."
CHI="Sos un post-it chiquito, indignadísimo, agudo y exagerado, gritando como en una marcha, ofendido por la cinta."
DUE="Sos el dueño de un comercio de barrio en Montevideo, cansado y nervioso, intentando calmar a todos con una sonrisa forzada, conciliador, como negociando con gente enojada."
ORU="Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste; seguro y claro."
gen 01 Fenrir "$DEL Arrancá con un golpe seco por el megáfono, bien fuerte: '¡estamos de paro!', y remata 'y tenemos razón' con orgullo." &
gen 02 Kore "$PER" &
gen 03 Fenrir "$DEL Leé el primer punto como una proclama, y 'compañera' cediéndole la palabra." &
wait
gen 04 Leda "$ROS Lo de las comillas lo lee del papel, y las preguntas con fastidio." &
gen 05 Algenib "$CEL Pausa antes de 'ni Gómez', bien seco." &
gen 06 Puck "$CHI" &
wait
gen 07 Kore "$PER Lo grita alarmada." &
gen 08 Fenrir "$DEL Esta vez solemne y triste, como despidiendo a un compañero caído; 'minuto de silencio' muy grave." &
gen 09 Charon "$DUE" &
wait
gen 10 Fenrir "$DEL Primero grita '¡no queremos más cinta!' y 'queremos jubilarnos'; después baja el tono, sincero y cariñoso, casi de amigo, para 'jefe: vos no tenés mala memoria'." &
gen 11 Orus "$ORU" &
gen 12 Algenib "$CEL Feliz por primera vez, aliviado, como quien se va de vacaciones para siempre." &
gen 13 Orus "$ORU Cerrás invitando a comentar, con humor." &
wait
