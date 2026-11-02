#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/la-sitcom; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
DUE="Sos el dueño de una tienda de ropa de barrio en Montevideo, protagonista de una comedia de living de la tele de los noventa: cansado, en pijama, despeinado, exagerado y querible, con timing de comedia."
AGE="Sos un agente de inteligencia artificial que vive en el living del dueño, el compañero de casa simpático de una comedia de la tele: canchero, rápido, alegre, seguro, con humor, como el amigo gracioso de la serie."
SOF="Sos Sofi, una clienta joven que escribe a la madrugada desde la cama: contenta y sorprendida."
GRA="Sos Graciela, una profesora de un colegio, amable y apurada, que manda un audio para hacer un pedido grande."
gen 01 Charon "$DUE Habla a cámara, como en la apertura de la serie, quejándose con resignación graciosa; remata 'y a las tres de la mañana' indignado."
gen 02 Puck "$AGE Atiende a una clienta a la madrugada, en voz bajita pero animada, para no despertar a nadie."
gen 03 Leda "$SOF Sorprendida y contenta, riéndose un poco."
gen 04 Puck "$AGE Bajito y canchero, con un guiño."
gen 05 Charon "$DUE Se despierta asustado de golpe, gritando medio dormido, con la voz ronca."
gen 06 Puck "$AGE Tranquilo y canchero, como quien calma a un amigo que exagera; remata 'volvé a dormir' con cariño burlón."
gen 07 Kore "$GRA Amable y directa, en un audio de WhatsApp."
gen 08 Charon "$DUE Desesperado y entusiasmado a la vez, gritando con la taza de café en la mano."
gen 09 Puck "$AGE Tranquilo y firme, con una sonrisa, como un buen compañero que le pasa la pelota."
gen 10 Charon "$DUE Desconfiado y sorprendido, en voz más baja, entrecerrando los ojos."
gen 11 Puck "$AGE Cálido y sincero, sin perder la simpatía."
gen 12 Charon "$DUE Emocionado, casi lagrimeando, como en el momento tierno de la serie."
gen 13 Puck "$AGE Remata el chiste rápido y seco, con picardía."
gen 14 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás pidiendo que lo etiqueten, con picardía."
