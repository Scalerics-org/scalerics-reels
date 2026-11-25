#!/bin/bash
# paso10.sh (r2): re-codificación del paso 10 con loudnorm en DOS PASADAS lineal (-14 LUFS, TP -1,7; LRA 20 para que quede LINEAL: la mezcla mide ~14 LU y con LRA 11 loudnorm pasa a dinámico)
cd "$(dirname "$0")"
IN=renders/gym-cupo.mp4; OUT=renders/gym-cupo-final.mp4
A=assets/audio/mezcla.wav   # el audio sale de la mezcla de gen.mjs (la misma que lleva el render; así un retoque de mezcla no pide re-render)
J=$(ffmpeg -hide_banner -nostats -i $A -af loudnorm=I=-14:TP=-1.7:LRA=20:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$J" | python3 -c "import json,sys; print(json.load(sys.stdin)['$1'])"; }
AF="loudnorm=I=-14:TP=-1.7:LRA=20:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true:print_format=json"
echo "$AF"
ffmpeg -y -hide_banner -nostats -i $IN -i $A -map 0:v -map 1:a -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af "$AF" -ar 48000 -c:a aac -b:a 192k $OUT 2>&1 | grep -E '"normalization_type"|"output_i"|"output_tp"'
