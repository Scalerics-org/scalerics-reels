#!/bin/bash
# partes/hojas.sh <carpeta>: hojas de 24 cuadros (8x3) con el número de cuadro
d=$1; n=$(ls $d/frame-*.png | wc -l); k=0
for ((i=0;i<n;i+=24)); do
  ffmpeg -loglevel error -y -start_number $i -i "$d/f%03d.png" -frames:v 24 -vf "scale=225:-1,drawtext=text='%{eif\:n+$i\:d}':x=4:y=4:fontsize=24:fontcolor=red,tile=8x3" -frames:v 1 $d/h$k.png 2>/dev/null; k=$((k+1)); done
