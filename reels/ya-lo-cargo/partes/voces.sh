#!/bin/bash
# genera las tomas a y b de cada línea (Gemini TTS) en partes/tomas/
cd "$(dirname "$0")/.."
while IFS=$'\t' read -r id voz tono; do
  for k in ${TOMAS:-a b}; do
    [ -f partes/tomas/$id-$k.wav ] && continue
    node ../../herramientas/voz.mjs partes/$id.txt partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" > /dev/null 2>partes/tomas/$id-$k.err &
  done
done < ${LINEAS:-partes/lineas.tsv}
wait
ls -la partes/tomas/*.wav | wc -l
