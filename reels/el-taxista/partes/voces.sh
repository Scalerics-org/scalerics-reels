#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-taxista.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
TAX="Sos un taxista de Montevideo de unos 60 años, de los que opinan de todo: voz grave y ronca de fumador, canchero, sobrador y entrador, tranquilo, con muchas horas de volante, hablándole a la pasajera por el espejito, sin ningún apuro."
PAS="Sos una pasajera de taxi de Montevideo de unos 35 años, APURADÍSIMA y nerviosa: tiene que conseguir una torta de cumpleaños para su hija ya mismo; habla rápido, indignada, mirando el celular."
gen 01 Algenib "$TAX Arrancás seco y sentencioso, como quien dice una verdad absoluta, con una pausa antes del remate."
gen 02 Leda "$PAS Indignada, ofendida porque le dijo señora, defendiendo la pastelería."
gen 03 Algenib "$TAX Desconfiado, sobrador."
gen 04 Leda "$PAS Frustrada, leyendo la pantalla sin poder creerlo."
gen 05 Algenib "$TAX Con ironía seca, haciéndose el gracioso, y después la pregunta al pasar."
gen 06 Leda "$PAS Desesperada, mirando la ruedita que gira en la pantalla."
gen 07 Algenib "$TAX Corto, como una orden."
gen 08 Leda "$PAS Resignada, con el teléfono en la oreja."
gen 09 Algenib "$TAX Muy seguro al principio, después dudando, y después yéndose por las ramas con nostalgia, filosofando, hasta cambiar de tema al fútbol, muy entusiasmado."
gen 10 Leda "$PAS GRITANDO, al borde del ataque de nervios, señalando el taxímetro."
gen 11 Algenib "$TAX Tranquilo, sin hacerse problema, como quien tenía la solución desde el principio."
gen 12 Leda "$PAS Desconfiada, más calmada."
gen 13 Algenib "$TAX Primero seco y honesto, encogiéndote de hombros; después, sabio y filosófico, como una frase de sobremesa."
gen 14 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de un diálogo en un taxi: cálido, seguro y cercano, con una sonrisa; el remate es un chiste al pasar y el cierre una invitación canchera a compartir."
