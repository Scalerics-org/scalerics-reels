#!/bin/bash
# Hoja de contacto del último snapshot: partes/hoja.sh <salida.png> [columnas]
d=$(ls -td .hyperframes/artifacts/snapshots/*/ | head -1)
c=${2:-5}
ffmpeg -hide_banner -loglevel error -y -pattern_type glob -i "$d/frame-*.png" -vf "scale=360:-1,tile=${c}x$(( ($(ls $d/frame-*.png | wc -l) + c - 1) / c ))" -frames:v 1 "$1"
