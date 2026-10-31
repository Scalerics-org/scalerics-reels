#!/bin/bash
# genera los parlamentos que falten en raw/ (uso: bash gen.sh 01p 02a ...). Reintenta si la API da 429.
V=../../../herramientas/voz.mjs
TP="Sos una profesora de idiomas grabando un curso en casete de los años noventa: voz clara, muy didáctica, pronunciación prolija y marcada pero con ritmo ágil y vivo, sin pausas largas, con entusiasmo de maestra y un dejo de ironía seca cuando traduce. Sonrisa en la voz."
TA="Sos el alumno de un curso de idiomas en casete: un muchacho de unos 25 años, voluntarioso, repite las frases con ganas y un poco torpe, y cuando pregunta suena confundido y desesperado, gracioso."
TK="Sos la voz grabada de un casete viejo de los noventa que anuncia el fin del lado: voz de locutor neutra, plana, solemne, un poco robótica, sin emoción."
TO="Sos el locutor de la marca que entra al final del video: seguro, cercano, con una sonrisa en la voz."
for f in "$@"; do
  case $f in *p) v=Aoede; t="$TP";; *a) v=Puck; t="$TA";; *k) v=Charon; t="$TK";; *o) v=Orus; t="$TO";; esac
  for i in 1 2 3 4 5 6 7 8; do
    [ -s raw/$f.wav ] && break
    node $V $f.txt raw/$f.wav --voz $v --tono "$t" 2>&1 | grep -o "voz lista.*\|429\|rror.*" | head -1
    [ -s raw/$f.wav ] || sleep 15
  done
done
