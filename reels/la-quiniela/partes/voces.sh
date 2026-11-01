#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-quiniela.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
LOC="Sos la LOCUTORA de un sorteo de lotería de la televisión uruguaya de los años noventa, en un sketch de humor: voz de ceremonia, solemne, impostada, muy pausada y clara, cantando cada número como si fuera un anuncio histórico, con ese tono de 'ante escribano público'. Muy seria aunque lo que dice es gracioso. RITMO ÁGIL: hablás rápido y con pausas muy cortas entre frases; la solemnidad está en la voz, no en la lentitud. Solo estirás un poquito el número cantado."
CLI="Sos una CLIENTA joven de Montevideo, de unos 25 años, escribiéndole por WhatsApp a un comercio que no le contesta: impaciente, irónica, cada vez más fastidiada, muy expresiva y graciosa."
DUE="Sos el DUEÑO de un comercio de barrio de Montevideo, de unos 55 años, mirando el sorteo por la tele: entusiasta, ingenuo, un poco cansado pero ilusionado, muy expresivo y gracioso."
gen 01 Aoede "$LOC Arrancás con un golpe solemne: 'Atención, comerciante.' Después lento, grave, como anunciando una tragedia nacional."
gen 02 Aoede "$LOC Ceremoniosa, con suspenso, como quien da inicio al sorteo."
gen 03 Aoede "$LOC '¡El veintitrés!' cantado fuerte y triunfal, como un número de lotería; el resto solemne y lento, y 'vos dormís' seco."
gen 04 Leda "$CLI Escribiendo, primero amable y después '¿Hola?' impaciente, alargado."
gen 05 Aoede "$LOC '¡El siete!' cantado fuerte y triunfal; el resto solemne, y 'en el asado' con un dejo de reproche."
gen 06 Leda "$CLI Fastidiada, irónica, golpeando el pie."
gen 07 Charon "$DUE Gritando de alegría, saltando del sillón, festejando como un gol: ¡lo tiene, ganó!"
gen 08 Aoede "$LOC Fría, seca y solemne, cortándole el festejo; 'una mesa para ocho' lento, como una sentencia."
gen 09 Aoede "$LOC '¡El cuarenta y ocho!' cantado fuerte y triunfal; 'el muerto que habla' misterioso, como en la quiniela; 'muerto, y no habla' seco, remate de chiste."
gen 10 Leda "$CLI Harta, decidida, cortante, como quien se va dando un portazo."
gen 11 Charon "$DUE Ofendido y defendiéndose; después de una pausa, 'cuando puedo' más bajito, admitiéndolo con culpa."
gen 12 Aoede "$LOC Por primera vez sale del personaje: cálida, comprensiva y humana, más bajito, como quien consuela; 'el celular no duerme nunca' con complicidad."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con energía y una sonrisa."
gen 14 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano y seguro, enumerando con ritmo, con una sonrisa."
gen 15 Aoede "$LOC Vuelve el sorteo: '¡El veintitrés!' cantado fuerte y triunfal, y 'once de la noche' con suspenso."
gen 16 Leda "$CLI Sorprendida y feliz, encantada, como quien no lo puede creer."
gen 17 Aoede "$LOC Gran final de sorteo, triunfal, solemne y feliz, como anunciando el pozo de oro."
gen 18 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: pícaro, cómplice, con una sonrisa, invitando a compartir el video."
