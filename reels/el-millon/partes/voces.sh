#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-millon. Voces: conductor Algenib (01 03 05 08 10 12), dueño concursante
# Charon (02 06 09 11), amigo del teléfono Puck (04), público (07: cuatro voces mezcladas), Orus (13).
V=../../herramientas/voz.mjs
gen() { # n voz tono [archivo de texto]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/${4:-$1}.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos el conductor de un concurso de preguntas y respuestas de la televisión, de traje, en un estudio oscuro con reflectores. Voz grave de show, solemne y dramática, con mucho suspenso, pero con picardía y humor: disfrutás poner nervioso al concursante."
DUE="Sos el dueño de un comercio de Montevideo, un hombre de unos 50 años, sentado en la silla de un concurso de televisión, muy nervioso, transpirando, inseguro; gracioso sin querer."
gen 01 Algenib "$CON Arrancás con suspenso de pregunta final, despacio y grave en 'Por el millón'; después leés las cuatro opciones con su letra, claras, una pausa corta entre cada una, y la última con misterio."
gen 02 Charon "$DUE Dudás, tartamudeás un poco y preguntás con miedo."
gen 03 Algenib "$CON Anunciás el comodín con pompa, como un anuncio."
gen 04 Puck "Sos un amigo uruguayo que atiende el celular con fastidio, apurado y despreocupado, con ruido de fondo; cortás rápido. Muy natural, canchero."
gen 05 Algenib "$CON Anunciás el comodín con pompa, seco."
gen 06 Charon "$DUE Primero desesperado y gracioso porque te sacaron tu excusa favorita; después gritás pidiendo ayuda al público."
gen 07a Leda "Sos una señora del público de un concurso de televisión que grita la respuesta a los gritos, segura y entusiasta." 07
gen 07b Fenrir "Sos un hombre del público de un concurso de televisión que grita la respuesta a los gritos, desesperado." 07
gen 07c Kore "Sos una muchacha del público de un concurso de televisión que grita la respuesta, fuerte y obvia." 07
gen 07d Puck "Sos un muchacho del público de un concurso de televisión que grita la respuesta a todo pulmón." 07
gen 08 Algenib "$CON Primero 'Tiempo' seco. Después te das vuelta y le hablás directo a la cámara, al que mira el video desde su casa, cómplice y despacio, con suspenso."
gen 09 Charon "$DUE Respondés tragando saliva, tratando de sonar seguro, pero se te quiebra la voz en 'final'."
gen 10 Algenib "$CON 'Respuesta...' con una pausa de suspenso larga, 'incorrecta' seco. Después explicás con calma, sobrador, como quien cuenta un chisme; la última frase es un pinchazo lento."
gen 11 Charon "$DUE Te defendés indignado, a los gritos, como una excusa obvia."
gen 12 Algenib "$CON Contestás tranquilo, lento y sobrador, con pausas; la última frase con lástima burlona, como sentencia final."
gen 13 Orus "Sos el narrador de Scalerics que entra al final de un concurso de televisión: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a participar."
