#!/bin/bash
# como voces.sh pero de a una, con reintentos (cuota de Gemini TTS por minuto)
cd "$(dirname "$0")/.."
while IFS=$'\t' read -r id voz tono; do
  for k in ${TOMAS:-a b}; do
    for intento in 1 2 3 4 5 6; do
      [ -f partes/tomas/$id-$k.wav ] && break
      f=partes/$id.txt; [ -f partes/$id-voz.txt ] && f=partes/$id-voz.txt
      node ../../herramientas/voz.mjs $f partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" > /dev/null 2>partes/tomas/$id-$k.err || sleep 25
    done
  done
done < ${LINEAS:-partes/lineas.tsv}
