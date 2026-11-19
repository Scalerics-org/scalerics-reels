#!/bin/bash
# paso10.sh (r2): re-codificación del paso 10 con loudnorm en DOS PASADAS lineal (mismos objetivos: -14 LUFS, TP -1,5, LRA 11)
cd "$(dirname "$0")"
IN=renders/ferreteria-encargo.mp4; OUT=renders/ferreteria-encargo-final.mp4
J=$(ffmpeg -hide_banner -nostats -i $IN -vn -af loudnorm=I=-14:TP=-1.7:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$J" | python3 -c "import json,sys; print(json.load(sys.stdin)['$1'])"; }
AF="loudnorm=I=-14:TP=-1.7:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true:print_format=json"
echo "$AF"
ffmpeg -y -hide_banner -nostats -i $IN -c:v libx264 -preset slow -crf 16 -tune animation -profile:v high -pix_fmt yuv420p -g 60 -maxrate 14M -bufsize 28M -movflags +faststart -af "$AF" -ar 48000 -c:a aac -b:a 192k $OUT 2>&1 | grep -E '"normalization_type"|"output_i"|"output_tp"'
