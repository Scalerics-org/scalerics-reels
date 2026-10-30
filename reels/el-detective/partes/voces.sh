#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-detective.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DET="Sos un detective privado de película de cine negro de los años cuarenta, con gabardina y sombrero, narrando en voz en off desde su oficina mientras llueve. Voz grave, ronca, cansada y lacónica, frases secas con pausas cortas, un poco de ironía amarga; muy serio, y por eso es gracioso."
DUE="Sos el dueño de un comercio de Montevideo, de unos 45 años, sentado bajo la lámpara de un interrogatorio. Nervioso, a la defensiva y exagerado, gracioso sin querer."
LUC="Sos Lucía, una clienta uruguaya de unos 30 años, tranquila y un poco dolida, sin enojo, contándole al detective lo que pasó; el final 'Vos, nunca.' seco y con un dejo de reproche."
gen 01 Algenib "$DET Arrancás con un golpe seco, acusando en la cara al que mira; la segunda frase, lenta y cansada."
gen 02 Algenib "$DET Ritmo lento, cada frase corta separada, ambientando la escena; 'Y después, nada.' con fastidio."
gen 03 Algenib "$DET Enumerás la primera pista con calma de investigador."
gen 04 Algenib "$DET Segunda pista, con resignación e ironía, como quien excavó mucho."
gen 05 Algenib "$DET Tercera pista, ácido y sobrador."
gen 06 Algenib "$DET Duro, de interrogatorio. '¿Lucía?' como pregunta seca, mirándolo fijo."
gen 07 Puck "$DUE Primero a los gritos, ofendido y seguro: '¡Yo me acuerdo de todo!'; después dudás, pensando 'Lucía... Lucía...', y al final, desorientado y honesto: '¿Quién era esta?'."
gen 08 Algenib "$DET Seco, con pausa después de 'La encontré.'; la segunda frase con amargura."
gen 09 Leda "$LUC"
gen 10 Algenib "$DET Remate lento y amargo, como el cierre de una película triste."
gen 11 Algenib "$DET Ahora más cálido y comprensivo, de su lado, como un amigo que lo defiende; 'Ni Sam Spade.' con una media sonrisa."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de una película de cine negro, cuando sale el sol: cálido, claro y seguro, explicando simple. 'Llamá a Lucía' como el mensaje de un aviso."
gen 13 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a un amigo."
