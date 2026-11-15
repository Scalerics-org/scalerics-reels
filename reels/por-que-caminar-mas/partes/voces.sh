#!/bin/bash
# genera tomas con reintento (cuota por minuto de Gemini TTS). uso: partes/voces.sh <txt> <salida.wav> <voz> <tono>
V=../../herramientas/voz.mjs
for k in 1 2 3 4 5 6; do node $V "$1" "$2" --voz "$3" --tono "$4" 2>/dev/null && exit 0; sleep 25; done; echo "FALLO $2"
