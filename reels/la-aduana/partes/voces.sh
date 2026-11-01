#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-aduana.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
OFI="Sos una OFICIAL DE ADUANA de aeropuerto de Montevideo, de unos 45 años, en un sketch de humor tipo reality de control de fronteras: seca, cortante, implacable, sin una gota de emoción, voz firme de autoridad que ya vio de todo; el humor sale de lo seca que es."
DOC="Sos el NARRADOR EN OFF de un reality de televisión de control de aduanas: voz grave de documental, dramática y solemne, con suspenso, como si contaras un caso policial terrible, en un sketch de humor."
DUE="Sos ÓSCAR, dueño de un bazar de barrio de Montevideo, de unos 55 años, en un sketch de humor en el control de aduana: nervioso, transpirado, justificándose, con risita nerviosa, como el que esconde algo en la valija."
ENF="Sos el DUEÑO DEL LOCAL DE ENFRENTE, de unos 35 años, en un sketch de humor: canchero, tranquilo, sobrador y simpático, pasa la aduana sin despeinarse."
gen 01 Kore "$OFI Golpe seco desde la primera palabra, levantando la vista del pasaporte; 'abra la valija' como una orden."
gen 02 Iapetus "$DOC 'Aduanas Extremas' como título de programa; el resto con suspenso."
gen 03 Charon "$DUE Rapidito, con risita nerviosa, como el que miente mal."
gen 04 Kore "$OFI Sacando cosas de la valija una por una, levantándolas con desprecio; '¿y esto?' seca y 'precio por privado' leído con asco."
gen 05 Charon "$DUE Achicado, con vocecita, justificándose."
gen 06 Kore "$OFI Leyendo un cartel con desdén; 'internet no cierra' lento y cortante, como una sentencia."
gen 07 Charon "$DUE Desesperado, indignado, levantando la voz, como quien saca su última carta."
gen 08 Kore "$OFI Pasando fotos con aburrimiento; 'a la máquina' como una orden, empujando la valija."
gen 09 Iapetus "$DOC Muy dramático, lento, como antes de una revelación."
gen 10 Kore "$OFI Leyendo la pantalla del escáner, cada 'sin' más duro; la pregunta final fría, mirándolo fijo."
gen 11 Charon "$DUE Tragando saliva, dudando, cada vez más bajito."
gen 12 Kore "$OFI Una sola palabra, seca y definitiva, como un sellazo."
gen 13 Iapetus "$DOC Con suspenso y un poquito de ironía."
gen 14 Fenrir "$ENF Relajado, sobrador, con una sonrisa; 'vendí mientras hacía la fila' como quien no quiere la cosa."
gen 15 Kore "$OFI Por primera vez casi amable, rápida, sin mirarlo."
gen 16 Charon "$DUE Escandalizado, gritando de bronca, señalando."
gen 17 Kore "$OFI Se saca los lentes y lo mira; firme pero con un toque humano; 'le falta el pasaporte' lento, como un diagnóstico, y el final claro."
gen 18 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa y energía; DAC se dice 'dac'; 'tu local, con pasaporte' con complicidad."
gen 19 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, invitando a comentar."
