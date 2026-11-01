#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-clon.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CIE="Sos el DUEÑO de un almacén de Montevideo convertido en CIENTÍFICO LOCO de película de terror en blanco y negro, en un sketch de humor: exaltado, teatral, con risa nerviosa de genio desquiciado, ojeroso de tanto pasar pedidos a la planilla. Muy expresivo y gracioso. IMPORTANTE: hablás RÁPIDO, atropellado de entusiasmo, sin estirar las vocales, y casi sin pausas entre frases."
CRI="Sos la CRIATURA de un científico loco, recién despertada, en un sketch de humor: voz grave, cavernosa y monótona, como un monstruo de película vieja; muy seria aunque lo que dice es gracioso. IMPORTANTE: hablás RÁPIDO y seco, sin estirar las vocales, frases cortitas y pausas MÍNIMAS entre frases, como un robot eficiente."
gen 01 Fenrir "$CIE Confesando a cámara, cómplice y un poco desquiciado; 'así que me fabriqué uno' con orgullo de genio loco."
gen 02 Fenrir "$CIE Dramático y en susurro rápido al principio, 'Medianoche. Tormenta. Un rayo' de corrido, sin pausas largas; después explota gritando eufórico '¡Está vivo! ¡Está vivo!' como en la película, sin reírte y sin pausa antes de seguir; el remate 'pero con delantal' más bajo y canchero."
gen 03 Algenib "$CRI Despertando, desorientada, pero sin pausas largas."
gen 04 Fenrir "$CIE Emocionado, como un padre orgulloso, y después de maestro: 'copiar' lento y marcado."
gen 05 Algenib "$CRI Repitiendo como un robot, grave y seco."
gen 06 Fenrir "$CIE Marcado y lento, como enseñando una palabra a un bebé."
gen 07 Algenib "$CRI Repite 'pegar' y enseguida, sin emoción, lee un pedido como un empleado de oficina: monótono y eficiente."
gen 08 Fenrir "$CIE Eufórico, aplaudiendo, '¡Aprende!' gritado con risa de científico loco; el resto rápido, dando órdenes entusiasmado."
gen 09 Algenib "$CRI Cumpliendo órdenes, monótono; al final 'es lindo trabajar' tierno e ingenuo."
gen 10 Algenib "$CRI Como el cartel de una película de terror: 'Día tres' grave, lento y ominoso, como una voz de tráiler."
gen 11 Algenib "$CRI Agotada, ojerosa, harta, con fastidio; 'Quiero vacaciones' firme, como un sindicalista."
gen 12 Fenrir "$CIE Indignado y escandalizado, gritando."
gen 13 Algenib "$CRI Avergonzada, confesando un error en voz baja, de corrido."
gen 14 Fenrir "$CIE Horrorizado, como quien se ve en un espejo, agarrándose la cabeza."
gen 15 Algenib "$CRI Calma y siniestra; '¿Y si me clono yo también?' con una media sonrisa malévola, como el giro de una película de terror."
gen 16 Fenrir "$CIE Aterrado, gritando de pánico, rapidísimo."
gen 17 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch, a la luz: cálido, seguro, cercano, con una sonrisa; 'No hacía falta un clon' tranquilo y con complicidad, y enumerás con ritmo lo que hacen las automatizaciones."
gen 18 Algenib "$CRI Tímida, ilusionada y un poco triste, como un perrito."
gen 19 Fenrir "$CIE Por fin relajado, feliz y aliviado, bostezando de contento."
gen 20 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a etiquetar a alguien."
