#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/empleado-del-mes.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos el presentador de una gala de premios de televisión, de smoking, en un teatro de Montevideo, con micrófono y sobre dorado en la mano. Voz de gala: solemne, elegante y teatral, con suspenso en los anuncios, pero con picardía de humor: sabés que lo que decís es gracioso."
MAR="Sos Marcelo, un empleado de comercio uruguayo de unos 25 años, en el público de una gala de premios. Ofendido, quejoso y exagerado, como un pibe al que lo agarraron en falta; gracioso sin querer."
gen 01 Charon "$PRE Arrancás con mucho suspenso, leyendo el sobre; después del suspenso cortás seco, desilusionado y canchero, mirando a Marcelo: 'No, Marcelo. No sos vos.' Y 'Sentate' como orden seca."
gen 02 Puck "$MAR Te parás de golpe, indignado, a los gritos."
gen 03 Charon "$PRE Le contestás a Marcelo con ironía, enumerando sus pecados, imitando con burla el '¿Precio? Consultá.'"
gen 04 Puck "$MAR Te defendés rápido, a los gritos, con la voz finita, como excusa desesperada."
gen 05 Charon "$PRE Remate seco, lento y sobrador, en voz más baja."
gen 06 Charon "$PRE Leés los méritos del ganador con admiración creciente, cada uno más impresionado, y al final anunciás al ganador con todo el suspenso y la emoción de una gala, a los gritos de alegría en '¡tu agente de IA!'."
gen 07 Kore "Sos un agente de inteligencia artificial que acaba de ganar el premio a empleado del mes en una gala: emocionado, educado y simpático, con humor seco y una sonrisa, como un discurso de agradecimiento de los Oscar. El final, sobre Marcelo, con picardía."
gen 08 Puck "$MAR Ahora estás preocupado, con miedo, voz chiquita pero clara, preguntando."
gen 09 Charon "$PRE Ahora tranquilo, cálido y amable, como quien da una buena noticia. Leé las cuatro frases seguidas, con pausas cortas."
gen 10 Puck "$MAR Ahora estás sorprendido y conmovido, bajito y feliz, con una sonrisa tímida, como quien descubre algo lindo."
gen 11 Orus "Sos el narrador de Scalerics que entra al final de una gala de premios: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera."
