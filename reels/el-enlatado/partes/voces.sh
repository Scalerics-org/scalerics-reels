#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-enlatado.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
COM="Sos el comentarista uruguayo de una transmisión de boxeo por televisión, al costado del ring: rápido, apasionado, metido en la pelea, con gracia, como un relator de fútbol uruguayo pero de boxeo."
ANU="Sos el anunciador del ring de una velada de boxeo de campeonato, con el micrófono que baja del techo: voz enorme, estirando las vocales, épico y teatral, presentando a cada peleador a los gritos."
SIS="Sos un sistema de computadora viejo y enlatado, una voz automática de máquina: monótona, fría, robótica, sin ninguna emoción, cada palabra igual de plana, como un contestador automático."
DUE="Sos el dueño de un comercio de Montevideo, de unos 50 años, cansado y golpeado, mitad indignado y mitad resignado, hablando desde el rincón del ring con la toalla al cuello."
ENT="Sos el entrenador veterano de boxeo en el rincón, un viejo de gimnasio de barrio de Montevideo, voz ronca y grave, que le grita a su boxeador para despertarlo, con cariño y con autoridad."
gen 01 Puck "$COM Arrancás con un golpe seco, como anunciando una tragedia en vivo: la primera frase alarmado, la segunda bajando la voz, como un secreto que indigna."
gen 02 Fenrir "$ANU Las dos presentaciones bien estiradas y épicas, con una pausa dramática en los puntos suspensivos."
gen 03 Puck "$COM Anunciando el round, rápido y entusiasmado."
gen 04 Kore "$SIS"
gen 05 Puck "$COM 'Gancho al hígado' gritado como si te doliera a vos; después rápido."
gen 06 Kore "$SIS"
gen 07 Puck "$COM 'A la mandíbula' gritado de dolor; después rápido, casi riéndose de la desgracia."
gen 08 Charon "$DUE La primera frase indignado; la segunda gritada con desesperación graciosa."
gen 09 Puck "$COM Rápido, con un poco de lástima."
gen 10 Kore "$SIS Como la grabación de un centro de atención telefónica que te deja esperando."
gen 11 Puck "$COM Gritando, preocupado, como cuando un boxeador está a punto de caer."
gen 12 Algenib "$ENT Primero lo frena; 'vos pegás bien' con orgullo; lo último como una orden a los gritos."
gen 13 Orus "Sos el narrador de Scalerics que entra cuando para la pelea: cálido, claro y seguro, explicando simple, como un amigo que trae la solución; la última frase con una sonrisa."
gen 14 Fenrir "$ANU Anunciás al ganador con todo, la pausa larga antes de 'tu negocio'."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, invitando a votar en los comentarios."
