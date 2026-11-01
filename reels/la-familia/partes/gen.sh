#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde partes/: bash gen.sh 01c 02c ...
V=../../../herramientas/voz.mjs
CAPO="Sos el capo de una familia mafiosa de película, viejo, sentado en su despacho en penumbra, hablándole a sus muchachos. Voz muy grave y ronca, con una calma que da miedo, pero a ritmo ágil: no arrastres las palabras y no hagas pausas largas; tan serio que es gracioso, como un padrino de cine pero con acento de Montevideo."
MUCH="Sos un muchacho de la familia mafiosa, joven, canchero y medio nervioso, de barrio de Montevideo, preguntándole cosas al jefe con respeto y entusiasmo, rápido y gracioso."
NARR="Sos el narrador de la marca que entra al final del video, cuando se prende la luz: cálido, seguro y cercano, con una sonrisa en la voz, ritmo ágil."
for f in "$@"; do
  case $f in *c) v=Algenib; t="$CAPO";; *m) v=Fenrir; t="$MUCH";; *o) v=Orus; t="$NARR";; esac
  extra=$(cat $f.tono 2>/dev/null)
  for i in 1 2 3 4 5 6 7 8; do
    [ -s raw/$f.wav ] && break
    node $V $f.txt raw/$f.wav --voz $v --tono "$t $extra" 2>&1 | grep -o "voz lista.*\|429\|Error.*" | head -1
    [ -s raw/$f.wav ] || sleep $((15 + i * 5))
  done
done
