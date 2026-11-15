#!/bin/bash
cd "$(dirname "$0")/.."
for spec in "09b-ruben d" "09b-ruben e" "09b-ruben f" "09b-ruben g"; do
  set -- $spec; id=$1; k=$2
  line=$(grep "^$id	" partes/lineas.tsv); voz=$(echo "$line" | cut -f2); tono=$(echo "$line" | cut -f3)
  for i in 1 2 3 4; do node ../../herramientas/voz.mjs partes/$id.txt partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" >/dev/null 2>partes/tomas/$id-$k.err && break; sleep 25; done
  sleep 6
done
echo hecho
