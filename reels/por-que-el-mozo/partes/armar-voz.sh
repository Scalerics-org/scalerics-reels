#!/bin/sh
# Pega la locución de por-que-el-mozo (ronda 1). Orus: orus-a1 (líneas 1-6 y 8) con la pausa después de "Pagaron…"
# estirada a 0,5 s, la de antes de "¿Por qué?" a 0,5 s y la de DESPUÉS de "¿Por qué?" a ~1 s (bisagra ≥ 1,3 s);
# línea 7 nueva de orus-c1 ("…un plan concreto la despeja.", -2 dB, atempo 1,12: la toma nueva venía más lenta); línea 9 nueva de orus-d2 ("…va al sistema…");
# 0,4 s; Rubén (Algenib) ruben1 "Anotado. Ya me olvidé." (+3 dB); 0,45 s; Orus orus-b1 (cierre, -0,8 dB) y 0,1 s de cola.
# Correr desde reels/por-que-el-mozo.
set -e
P=partes
ff() { echo "atrim=$1:$2,asetpts=PTS-STARTPTS,afade=t=in:d=0.006,afade=t=out:st=$(echo "$2 - $1 - 0.01" | bc -l | sed "s/^\./0./"):d=0.01"; }
sil() { echo "aevalsrc=0:d=$1:s=48000:c=mono"; }
ffmpeg -y -hide_banner -loglevel error -i $P/orus-a1.wav -i $P/ruben1.wav -i $P/orus-b1.wav -i $P/orus-c1.wav -i $P/orus-d2.wav -filter_complex "
[0:a]$(ff 0.26 7.15)[a1];
$(sil 0.5)[s1];
[0:a]$(ff 7.37 11.98)[a2];
$(sil 0.5)[s2];
[0:a]$(ff 12.18 12.6)[q];
$(sil 0.88)[s2b];
[0:a]$(ff 12.95 14.85)[a3];
$(sil 0.22)[s3a];
[3:a]$(ff 0.24 3.83),atempo=1.12,volume=-2dB[c];
$(sil 0.26)[s3b];
[0:a]$(ff 17.72 21.45)[a4];
$(sil 0.25)[s3c];
[4:a]$(ff 0.22 4.85)[d];
$(sil 0.4)[s3];
[1:a]$(ff 0.2 2.33),volume=3dB[r];
$(sil 0.45)[s4];
[2:a]$(ff 0.22 5.451),volume=-0.8dB[b];
$(sil 0.1)[s5];
[a1][s1][a2][s2][q][s2b][a3][s3a][c][s3b][a4][s3c][d][s3][r][s4][b][s5]concat=n=18:v=0:a=1,aformat=sample_rates=48000:channel_layouts=mono[o]" -map "[o]" -c:a pcm_s16le assets/voice/locucion.wav
