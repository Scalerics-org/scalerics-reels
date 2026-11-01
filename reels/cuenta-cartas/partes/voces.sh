#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/cuenta-cartas.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CRU="Sos la CRUPIER de una mesa de blackjack de un casino elegante, de noche, en un sketch de humor: voz grave, aterciopelada, elegante y filosa, irónica, segura, con un dejo de desprecio divertido hacia el jugador que pierde. RITMO ÁGIL: pausas cortas, frases secas."
DUE="Sos el DUEÑO de un comercio de barrio de Montevideo, de unos 55 años, sentado en la mesa de blackjack: cansado, confiado de más, un poco perdido, muy expresivo y gracioso."
ENF="Sos EL DE ENFRENTE, un comerciante canchero y pícaro de Montevideo, de unos 35 años, sentado en la misma mesa: rápido, seguro, sobrador, con una sonrisa de costado, como el que siempre sabe la respuesta. Hablás rápido y seco."
NAR="Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 01 Kore "$CRU Arrancás con un golpe seco, mirando a cámara. Leé las dos frases enteras."
gen 02 Kore "$CRU Ceremoniosa, repartiendo las cartas, presentando la mesa."
gen 03 Kore "$CRU Dando vuelta una carta, con suspenso."
gen 04 Charon "$DUE Primero confiado y sobrador, golpeándose la cabeza; después dudando, buscando el nombre, cada vez más inseguro."
gen 05 Fenrir "$ENF Sin dudar ni un segundo, rapidísimo, casi aburrido de lo fácil que es."
gen 06 Kore "$CRU Dando vuelta otra carta, y 'le prometiste' con reproche filoso."
gen 07 Charon "$DUE Sorprendido, se acuerda de golpe; después de una pausa, 'cuando me acuerde' más bajito, con culpa."
gen 08 Fenrir "$ENF Seco, sobrador, cortándolo."
gen 09 Kore "$CRU Dando vuelta la tercera carta; 'buenas, ¿al final?' imitando con gracia el mensaje de un cliente."
gen 10 Charon "$DUE Totalmente perdido, rascándose la cabeza, confundido."
gen 11 Fenrir "$ENF Rapidísimo, sin mirar, sobrador, como recitando una ficha."
gen 12 Kore "$CRU Mirando a cámara, hablándole al que mira, desafiante y misteriosa; 'Pensalo' lento y bajito, dejando suspenso."
gen 13 Kore "$CRU Revelando el secreto, cómplice, bajando la voz."
gen 14 Kore "$CRU Filosa e irónica, como una sentencia; el remate 'lo dejan los clientes' seco."
gen 15 Kore "$CRU Más cálida y humana por primera vez, como quien le da una buena noticia al dueño."
gen 16 Fenrir "$ENF Burlón y sobrador, juntando las fichas, con una risita."
gen 17 Orus "$NAR"
gen 18 Orus "$NAR Con complicidad y una sonrisa."
gen 19 Kore "$CRU Elegante, triunfal, guiñando un ojo; 'la casa sos vos' con calidez."
gen 20 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a comentar el video."
