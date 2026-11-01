#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-oculista.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
OCU="Sos un OCULISTA de consultorio de Montevideo, de unos 60 años, en un sketch de humor: serio, pausado, paciente y muy profesional, con voz calma de doctor que ya vio de todo, y un humor seco que no se ríe de sus propios chistes."
MAR="Sos MARTÍN, un paciente de unos 30 años en un sketch de humor en el consultorio del oculista: preocupado, exagerado y dramático, medio desesperado, entrecerrando los ojos para leer, muy expresivo y gracioso."
DUE="Sos DON CARMELO, el dueño de una pizzería de barrio de Montevideo, de unos 60 años, que entra de golpe al consultorio OFENDIDO: orgulloso, indignado, teatral, defendiendo su página web como si fuera su hija."
gen 01 Puck "$MAR Arrancás de golpe, angustiado, como quien da una noticia terrible; 'mi pizzería favorita' casi llorando."
gen 02 Iapetus "$OCU Tranquilo, sin apuro, señalando la carta en la pared."
gen 03 Puck "$MAR Leyendo con esfuerzo: la primera línea bien; después entrecerrás los ojos y 'hormiguitas' desconcertado."
gen 04 Iapetus "$OCU Paciente, como una indicación médica."
gen 05 Puck "$MAR Frustrado, cada vez más dramático; la segunda frase con fastidio."
gen 06 Iapetus "$OCU Seco y profesional, sin emoción."
gen 07 Puck "$MAR Esperando, cada vez más lento y aburrido, como una ruedita que gira; 'sigue cargando' resignado."
gen 08 Iapetus "$OCU Calmo y suave, como un doctor que receta paciencia."
gen 09 Puck "$MAR Sobresaltado de golpe, gritando; 'suscribite a nuestro boletín' leído con bronca, burlón."
gen 10 Iapetus "$OCU Solemne, como el momento clave del examen."
gen 11 Puck "$MAR Leyendo despacio, dudando; la pregunta final totalmente confundido."
gen 12 Iapetus "$OCU Anotando en su planilla, sin levantar la vista."
gen 13 Puck "$MAR Derrotado, desanimado."
gen 14 Iapetus "$OCU Se saca los anteojos, hace una pausa dramática y da el diagnóstico grave, como una mala noticia; el remate seco."
gen 15 Charon "$DUE Entrás gritando '¡pará, pará!', ofendidísimo; 'mi página es preciosa' con orgullo, y 'en la compu de mi sobrino' un poco más bajo, como admitiendo algo."
gen 16 Iapetus "$OCU Paciente pero firme, como explicándole a un paciente terco; 'tienen un celular' lento y claro."
gen 17 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa y energía; 'que se lea sin anteojos' con complicidad."
gen 18 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice, desafiante y con una sonrisa, invitando a hacer la prueba ahora."
