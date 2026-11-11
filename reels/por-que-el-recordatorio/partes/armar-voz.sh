#!/bin/sh
# Arma assets/voice/locucion.wav desde partes/orus1.wav (Orus, toma 1, 32,37 s; guion para la voz en
# partes/guion-voz.txt: sin «» y con "Scálerics punto com"):
#  +0,20 s de silencio antes de "¿Por qué?" (queda ~0,57 s de pausa), +0,30 s antes de "Y Graciela pasa."
#  (pausa de comedia), se acorta la pausa entre "Y" y "Graciela" (0,29 -> 0,11 s) y 0,30 s de silencio al final.
# Los tiempos: node partes/ajustar-tiempos.mjs (usa los mismos cortes).
O=partes/orus1.wav
ffmpeg -y -hide_banner -loglevel error -i $O -filter_complex "\
[0:a]atrim=0:6.30,asetpts=N/SR/TB[a];[0:a]atrim=6.30:25.64,asetpts=N/SR/TB[b];\
[0:a]atrim=25.64:25.86,asetpts=N/SR/TB,afade=t=out:st=0.2:d=0.02[c];[0:a]atrim=26.04,asetpts=N/SR/TB,afade=t=in:d=0.02[d];\
anullsrc=r=48000:cl=mono,atrim=0:0.20[z1];anullsrc=r=48000:cl=mono,atrim=0:0.30[z2];anullsrc=r=48000:cl=mono,atrim=0:0.30[z3];\
[a][z1][b][z2][c][d][z3]concat=n=7:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 assets/voice/locucion.wav
