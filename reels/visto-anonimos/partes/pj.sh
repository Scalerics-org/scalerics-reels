#!/bin/bash
# tiempos de un parlamento: lo acolcha con 0.8 s de silencio adelante (STT se come la primera palabra si no) y resta
b=$1; mkdir -p pad
ffmpeg -hide_banner -loglevel error -y -i cmp/$b.wav -af "adelay=800,apad=pad_dur=0.6" pad/$b.wav
node ../../../herramientas/tiempos.mjs pad/$b.wav $b.txt pad/$b.json 2>&1 | grep -E "oy|interp" | sed "s/^/$b /"
node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('pad/$b.json'));j.forEach(w=>{w.start=Math.max(0,+(w.start-0.8).toFixed(3));w.end=Math.max(0,+(w.end-0.8).toFixed(3));});fs.writeFileSync('pj/$b.json',JSON.stringify(j))"
