#!/bin/bash
# genera de a una las tomas que faltan (la cuota de Gemini TTS es por minuto)
cd "$(dirname "$0")/.."
for pasada in 1 2 3 4 5 6; do
  falta=0
  while IFS=$'\t' read -r id voz tono; do
    for k in ${TOMAS:-a b}; do
      [ -s partes/tomas/$id-$k.wav ] && continue
      falta=1
      node ../../herramientas/voz.mjs partes/$id.txt partes/tomas/$id-$k.wav --voz "$voz" --tono "$tono" > /dev/null 2>partes/tomas/$id-$k.err || sleep 20
    done
  done < ${LINEAS:-partes/lineas.tsv}
  [ $falta = 0 ] && break
done
ls partes/tomas/*.wav | wc -l
