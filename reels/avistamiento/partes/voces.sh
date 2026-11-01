#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/avistamiento.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos el conductor de un programa uruguayo de misterios y fenómenos paranormales de la tele de madrugada, en clave de comedia: voz grave, misteriosa y teatral, hablás lento, susurrando con suspenso, con pausas dramáticas, como si contaras un secreto del más allá."
NIL="Sos Nilda, una vecina uruguaya de 70 años del barrio La Blanqueada, en una comedia: indignada y emocionada, hablás rápido y con énfasis, jurando que viste algo increíble y que nadie te cree."
EXP="Sos un experto escéptico uruguayo de 60 años invitado a un programa de misterios, en una comedia: sobrador, condescendiente y seguro, con tono de sabelotodo que se ríe un poco."
HIJ="Sos la hija de 30 años de una señora uruguaya, en una comedia: harta, con vergüenza ajena y cariño, hablando por teléfono."
TES="Sos un testigo uruguayo de 40 años en un programa de misterios, en una comedia: decepcionado y resignado, con fastidio."
gen 01 Algenib "$CON Arrancás con un gancho: misterioso, grave, cada palabra pesa; 'La ciencia no lo puede explicar' muy lento y en susurro."
gen 02 Algenib "$CON Presentás el programa con solemnidad teatral, y después presentás a la testigo con misterio."
gen 03 Gacrux "$NIL Contás exaltada, casi gritando de emoción, jurando que es verdad; el final ¡y me tomó el pedido! con asombro total."
gen 04 Charon "$EXP Te reís con desprecio y lo descartás; 'ni el sereno' como remate de chiste."
gen 05 Leda "$HIJ Rápido, avergonzada y un poco exasperada."
gen 06 Algenib "$CON Con suspenso creciente, susurrando, como quien revela otro caso inexplicable."
gen 07 Fenrir "$TES Resignado y seco; 'Y el lunes me dejó en visto' con bronca contenida, remate de chiste."
gen 08 Algenib "$CON Lento, solemne y en susurro misterioso, como frase célebre de un programa de misterios."
gen 09 Orus "Sos el narrador de Scalerics que entra en un programa de misterios en clave de comedia y prende la luz: seguro, cálido, canchero y con una sonrisa, desarmando el misterio."
gen 10 Orus "Sos el narrador de Scalerics: claro, cercano y con ritmo ágil, explicando algo simple y útil a un dueño de comercio."
gen 11 Gacrux "$NIL Triunfal y a los gritos, con alegría y revancha: '¡Yo les dije!'."
gen 12 Charon "Sos un experto escéptico uruguayo de 60 años que acaba de quedar en ridículo, en una comedia: bajás el tono, avergonzado y de golpe muy interesado, en voz baja, preguntando casi en secreto."
gen 13 Orus "Sos el narrador de Scalerics al final de un reel de comedia: filoso y pícaro, pinchando al dueño en la cara con una sonrisa; después seguro y cálido."
gen 14 Orus "Sos el narrador de Scalerics al final de un reel: invitación canchera, curiosa y pícara, con una sonrisa."
