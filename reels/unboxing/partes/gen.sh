V=../../../herramientas/voz.mjs
TY="Sos un youtuber uruguayo de tecnología de unos 28 años, canchero, enérgico y gracioso, haciendo la review de un producto: mucha energía, cómplice con la cámara, como en un unboxing."
TA="Sos un agente de IA que atiende el WhatsApp de un restaurante: voz cálida, clara, amable y rápida, eficiente, simpática, sin sonar robótica."
TC="Sos una clienta joven de Montevideo escribiendo de noche por WhatsApp: casual, simpática, y al final sorprendida para bien."
TO="Sos el locutor de la marca que entra al final del video: seguro, cercano, con una sonrisa en la voz."
for f in "$@"; do
  case $f in *y) v=Puck; t="$TY";; *a) v=Kore; t="$TA";; *c) v=Leda; t="$TC";; *o) v=Orus; t="$TO";; esac
  for i in 1 2 3 4 5 6 7 8 9 10; do
    [ -s raw/$f.wav ] && break
    node $V $f.txt raw/$f.wav --voz $v --tono "$t" 2>&1 | grep -o "voz lista.*\|429" | head -1
    [ -s raw/$f.wav ] || sleep 20
  done
done
