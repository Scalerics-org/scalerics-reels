#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-sommelier.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SOM="Sos un sommelier uruguayo pretencioso y afectadísimo, en una bodega a la luz de velas, catando con la copa en la mano como en un programa de gastronomía: voz pausada, nasal y engolada, saboreando cada palabra con desdén elegante, como si fuera un crítico de vinos francés, y justamente por eso es gracioso."
CLI="Sos una clienta uruguaya joven, de unos 28 años, que intentó comprar por Instagram: indignada, rápida y exagerada, como contándole un chisme a una amiga."
DUE="Sos el dueño de un comercio uruguayo, de unos 50 años, que se siente ofendido por la crítica: herido en el orgullo, a los gritos pero con ternura."
gen 01 Sadaltager "$SOM Arrancás con desdén, como dando un veredicto; la pausa antes de 'Y la tuve que escupir' bien marcada, y esa frase con asco elegante."
gen 02 Leda "$CLI Sorprendida, con morbo, queriendo saber más."
gen 03 Sadaltager "$SOM Levantás la copa a la luz y describís el color como un experto; 'un visto intenso' con fascinación, 'tres horas de guarda' como un dato técnico."
gen 04 Sadaltager "$SOM Olés la copa con los ojos cerrados; 'Invasivas' con una mueca de disgusto."
gen 05 Leda "$CLI Indignadísima, a los gritos, como el peor recuerdo de su vida."
gen 06 Sadaltager "$SOM Probás un trago, lo hacés girar en la boca; 'Áspero. Muy áspero.' con cara de dolor, lento."
gen 07 Sadaltager "$SOM Dramático, como la peor cosecha de la historia; 'Larguísimo' estirado y con desesperación."
gen 08 Sadaltager "$SOM Veredicto frío y cortante, con una pausa antes de 'Sobre cien.'"
gen 09 Charon "$DUE Interrumpiendo, ofendido."
gen 10 Sadaltager "$SOM De golpe amable y respetuoso, casi tierno, como quien da una buena noticia y después la verdad; la segunda frase como una revelación."
gen 11 Orus "Sos el narrador de Scalerics que entra cuando se calma la escena: cálido, claro y seguro, defendiendo al dueño; la última frase como una verdad simple."
gen 12 Orus "Sos el narrador de Scalerics: claro, cercano y con ritmo, explicando simple, como un amigo que trae la solución. Leé 'DAC' como la palabra 'dac'."
gen 13 Sadaltager "$SOM Ahora fascinado y conmovido, saboreando el mejor vino de su vida; 'Noventa y ocho puntos' con emoción contenida."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una pregunta que invita a comentar."
