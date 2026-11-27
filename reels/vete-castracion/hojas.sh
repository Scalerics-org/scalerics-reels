#!/bin/bash
# hojas.sh <carpeta de snapshots>: hojas de 24 cuadros (8x3) con el número de cuadro, h0.png, h24.png, ...
cd "$1" || exit 1
ls frame-*.png | sort -V > /tmp/claude-0/lista-$$.txt
n=$(wc -l < /tmp/claude-0/lista-$$.txt)
for ((s=0; s<n; s+=24)); do
  sed -n "$((s+1)),$((s+24))p" /tmp/claude-0/lista-$$.txt | awk -v d="$PWD" '{print "file \x27" d "/" $0 "\x27"}' > /tmp/claude-0/c-$$.txt
  ffmpeg -loglevel error -y -f concat -safe 0 -i /tmp/claude-0/c-$$.txt -vf "scale=270:-1,drawtext=text='%{eif\:n+$s\:d}':x=6:y=6:fontsize=26:fontcolor=red,tile=8x3" -frames:v 1 h$s.png
done
ls h*.png
