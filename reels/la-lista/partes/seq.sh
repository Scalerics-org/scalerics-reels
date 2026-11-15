#!/bin/bash
# tomas extra de a una (cuota de Gemini TTS por minuto)
cd "$(dirname "$0")/.."
for spec in "03-graciela c" "03-graciela e" "04-ruben d" "04-ruben e" "03-graciela f" "01-graciela d"; do
  set -- $spec; id=$1; k=$2
  line=$(grep "^$id	" partes/lineas.tsv); voz=$(echo "$line" | cut -f2); tono=$(echo "$line" | cut -f3)
  for i in 1 2 3; do node ../../herramientas/voz.mjs partes/$id.txt partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" >/dev/null 2>partes/tomas/$id-$k.err && break; sleep 25; done
  sleep 8
done
echo hecho
