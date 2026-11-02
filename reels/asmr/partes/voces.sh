#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/asmr.
# ASMRtista (Aoede, susurro), Beto el panadero (Charon, cansado y susurrando), narrador Scalerics (Orus).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ASM="Sos una ASMRtista de Montevideo, de unos 28 años, grabando un video de ASMR para dormir, con la boca pegada a un micrófono binaural: SUSURRÁS todo el tiempo, sin voz, solo aire, muy suave, íntimo y lento, con las consonantes bien marcadas, como si le hablaras al oído a alguien que se está quedando dormido. Es un sketch de humor: lo absurdo se dice con total dulzura y seriedad. El susurro es FLUIDO: las palabras de una misma frase van seguidas, sin cortarlas ni separarlas, a ritmo de conversación tranquila; solo una pausa breve entre frase y frase. Nada de silencios largos."
DUE="Sos BETO, un panadero de barrio de Montevideo, de unos 50 años, a la medianoche frente a la computadora, agotado. Hablás en SUSURRO, ronco y cansado, para no despertar a nadie, pero con fastidio. Gracioso sin querer."
gen 01 Aoede "$ASM Arrancás con un 'shhh' corto y suave; después la frase de corrido, dulce, y 'que no duerme desde que abrió el local' con un poquito de picardía."
gen 02 Aoede "$ASM Saludando a la audiencia con ternura, de corrido."
gen 03 Aoede "$ASM Como un disparador de ASMR, con las consonantes crujientes; 'copiar, pegar, copiar, pegar' seguido, con ritmo de tecleo, y nada más."
gen 04 Aoede "$ASM Leyendo el pedido como si fuera un poema para dormir, de corrido."
gen 05 Charon "$DUE Interrumpe a la susurradora con un 'shh' y le pide, susurrando y fastidiado, que baje la voz porque está trabajando."
gen 06 Aoede "$ASM Pide perdón en susurro, apenada; después anuncia 'mi favorito' con ilusión, y 'la planilla que se tranca' como si fuera un regalo."
gen 07 Charon "$DUE Desesperado pero sin levantar la voz: un 'no, no, no' en susurro angustiado, y '¿guardé? decime que guardé' como una súplica."
gen 08 Aoede "$ASM Sedante y de corrido; 'pedido listo, pedido listo' como un mantra, más bajito la segunda vez."
gen 09 Charon "$DUE Mandando un audio de WhatsApp en susurro, cansado y apenado: 'Señora Ofelia, ya están sus bizcochos', y después, avergonzado, 'sí, a la una. Perdón.'"
gen 10 Aoede "$ASM Por primera vez se pone seria y sincera, sigue susurrando, con peso pero sin cortar las frases, como quien dice una verdad: 'Para vos, esto es ASMR' suave, y 'Para Beto, es la vida' con una pausa antes."
gen 11 Orus "Sos el narrador de Scalerics que entra de golpe al final del video, con voz NORMAL y clara (nada de susurro), cálido, seguro y cercano, con una sonrisa. 'Beto, andá a dormir' como un amigo que lo manda a la cama; lo demás con ritmo ágil."
gen 12 Aoede "$ASM Vuelve al personaje, feliz y en susurro: 'Y ahora sí' con alivio, y 'Beto, durmiendo' tiernísimo, casi sin voz, como presentando el mejor sonido del canal."
gen 13 Orus "Sos el narrador de Scalerics, voz normal, pícaro y cómplice, con una sonrisa; 'susurralo en los comentarios' bajando un poco la voz, como un chiste."
