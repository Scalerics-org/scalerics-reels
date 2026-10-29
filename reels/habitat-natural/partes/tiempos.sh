#!/bin/bash
# Tiempos de un parlamento recortado: lo acolcha con 0.8 s de silencio adelante (STT se come la
# primera palabra si no), corre tiempos.mjs y resta. Correr desde partes/: ./tiempos.sh 01a
b=$1; mkdir -p pad
ffmpeg -hide_banner -loglevel error -y -i $b-c.wav -af "adelay=800,apad=pad_dur=0.6" pad/$b.wav
node ../../../herramientas/tiempos.mjs pad/$b.wav $b.txt pad/$b.json 2>&1 | grep -iE "oy|interp" | sed "s/^/$b /"
node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('pad/$b.json'));j.forEach(w=>{w.start=Math.max(0,+(w.start-0.8).toFixed(3));w.end=Math.max(0,+(w.end-0.8).toFixed(3));});fs.writeFileSync('$b.json',JSON.stringify(j))"
