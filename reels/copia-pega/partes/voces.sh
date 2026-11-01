#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/copia-pega.
# Voces: maestro Algenib · alumno (el dueño) Charon · narrador Orus.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
MAE="Sos un viejo maestro de artes marciales en un dojo de Montevideo, de unos 70 años: voz grave, lenta y profunda, solemne y sabio como en una película de karate, pero pillo y burlón por dentro, con humor seco."
ALU="Sos el dueño de un comercio de Montevideo, de unos 45 años, alumno del dojo: agotado, con sueño, quejoso y medio ingenuo, que cree que lo están preparando para algo grande."
gen 01 Algenib "$MAE Marcando el ritmo como un mantra, golpe por golpe: Copiá. Pegá. Copiá. Pegá. Y la última frase con una sonrisa burlona."
gen 02 Charon "$ALU Ilusionado pero cansado, con una esperanza ingenua."
gen 03 Algenib "$MAE Cortante en la primera palabra, después didáctico y ceremonioso, marcando el ritmo."
gen 04 Charon "$ALU Bostezando, suplicando."
gen 05 Algenib "$MAE Sentencioso, como quien dice una gran verdad, y al final seco: A mano."
gen 06 Charon "$ALU Dudoso, con un hilito de esperanza."
gen 07 Algenib "$MAE Con remate cómico seco en las dos primeras frases, después enumerando las tareas rápido, sin pausas largas."
gen 08 Charon "$ALU Desesperado, casi llorando de cansancio."
gen 09 Algenib "$MAE La primera palabra seca y fría. Después confesando con picardía, y las dos últimas frases lentas y profundas, como la gran enseñanza."
gen 10 Charon "$ALU Desconcertado, con un hilito de voz."
gen 11 Algenib "$MAE Picante y burlón, como un golpe final, con humor."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scálerics que entra al final de una escena de película de karate: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a comentar."
