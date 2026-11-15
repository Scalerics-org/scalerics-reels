#!/bin/bash
cd "$(dirname "$0")/.."
for spec in "04-ruben f" "05-graciela f" "09b-ruben a" "04-ruben g" "05-graciela g" "09b-ruben b" "09b-ruben c" "04-ruben h"; do
  set -- $spec; id=$1; k=$2
  line=$(grep "^$id	" partes/lineas.tsv); voz=$(echo "$line" | cut -f2); tono=$(echo "$line" | cut -f3)
  for i in 1 2 3 4; do node ../../herramientas/voz.mjs partes/$id.txt partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" >/dev/null 2>partes/tomas/$id-$k.err && break; sleep 25; done
  sleep 6
done
echo hecho
