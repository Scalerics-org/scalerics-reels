#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/acumuladores.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
LOC="Sos la voz en off de un reality de televisión sobre acumuladores, grave, solemne y dramática, como un documental de casos extremos, uruguayo, con pausas de suspenso; tan exagerado que es gracioso."
ORG="Sos Patricia, una organizadora profesional uruguaya de unos 40 años, con guantes de látex, en un reality: firme, paciente pero implacable, como una enfermera que no se deja engañar."
NOR="Sos Norma, una señora uruguaya de unos 60 años, dueña de un bazar de barrio, en un reality: aferrada a su mercadería, dramática, defensiva y muy tierna; graciosa sin querer."
gen 01 Algenib "$LOC Abrís el programa con un golpe: 'trescientas camperas' con horror; la segunda frase lenta y grave, como una condena."
gen 02 Algenib "$LOC Presentando el programa y el caso con solemnidad; 'un depósito que da miedo' bajando la voz."
gen 03 Kore "$ORG Se presenta seria y señala una caja con el dedo enguantado."
gen 04 Gacrux "$NOR Salta a proteger la caja, a los gritos: '¡no, esa no!' desesperada; 'las vendo en marzo' muy segura."
gen 05 Kore "$ORG Lee la etiqueta de la caja, seca, sin levantar la vista."
gen 06 Gacrux "$NOR Ofendida y orgullosa, sin dar el brazo a torcer."
gen 07 Kore "$ORG Sacando otra caja, ya resignada."
gen 08 Gacrux "$NOR Abraza las ojotas con cariño; 'el que quiera, que venga al local' digna y terca."
gen 09 Algenib "$LOC Suspenso dramático: 'pero nadie viene' lento; 'medio metro de vereda' como una tragedia."
gen 10 Gacrux "$NOR En el confesionario del reality, a solas, emocionada, con la voz quebrada, casi llorando, sincera."
gen 11 Kore "Sos Patricia, una organizadora profesional uruguaya de unos 40 años, que ahora se saca los guantes y le habla a Norma con cariño, despacio y cálida; el remate 'guardado donde la gente no mira' suave, como una revelación."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se resuelve el caso: claro, cálido y seguro, ritmo ágil; 'tienda online' bien claro, como la solución. DAC se dice 'dac'."
gen 13 Algenib "$LOC Ahora es el final feliz del reality: grave pero con una sonrisa, triunfal."
gen 14 Gacrux "$NOR Feliz, eufórica, gritando de alegría, riéndose."
gen 15 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, una invitación a compartir el video."
echo listo
