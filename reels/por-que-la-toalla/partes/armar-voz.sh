#!/bin/sh
# ronda 2: "la reutiliza" +2,5 dB con 0,17 s más de silencio antes y después; fundidos de 30 ms en las colas de
# "¿Por qué?" y "barrio." (se cortaban seco).
# Arma assets/voice/locucion.wav (ronda 1 de revisión): orus1 con "El otro: la mayoría la reutiliza." (reutiliza1) en
# lugar de "la reusa" (sonaba "rehúsa"), pausas de 0,35 s antes y 0,25 s después de "¿Por qué?", 0,25 s antes de "Es el
# cartel de la toalla", y el cierre regenerado (cierre1, "Scálerics punto com"); 0,32 s de silencio al final.
# Los tiempos: node partes/ajustar-tiempos.mjs (usa los mismos cortes).
O=partes/orus1.wav
ffmpeg -y -hide_banner -loglevel error -i $O -i partes/reutiliza1.wav -i partes/cierre1.wav -filter_complex "\
[0:a]atrim=0:8.0,asetpts=N/SR/TB[a];[1:a]atrim=0.1:2.49,asetpts=N/SR/TB,volume=2.5dB,afade=t=out:st=2.36:d=0.03[n];[0:a]atrim=10.15:11.28,asetpts=N/SR/TB[b];\
[0:a]atrim=11.28:11.9,asetpts=N/SR/TB,afade=t=out:st=0.56:d=0.03[c];[0:a]atrim=11.9:22.63,asetpts=N/SR/TB,afade=t=out:st=10.69:d=0.03[d];[0:a]atrim=22.63:24.15,asetpts=N/SR/TB[e];\
[2:a]atrim=0.12:4.85,asetpts=N/SR/TB[f];\
anullsrc=r=48000:cl=mono,atrim=0:0.17[y1];anullsrc=r=48000:cl=mono,atrim=0:0.17[y2];anullsrc=r=48000:cl=mono,atrim=0:0.35[z1];anullsrc=r=48000:cl=mono,atrim=0:0.25[z2];anullsrc=r=48000:cl=mono,atrim=0:0.25[z3];\
anullsrc=r=48000:cl=mono,atrim=0:0.12[z4];anullsrc=r=48000:cl=mono,atrim=0:0.32[z5];\
[a][y1][n][y2][b][z1][c][z2][d][z3][e][z4][f][z5]concat=n=14:v=0:a=1[o]" -map "[o]" assets/voice/locucion.wav
