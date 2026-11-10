#!/bin/sh
# Pega la locución (guion v2, ronda 1 de correcciones): Orus línea 1 y líneas 4-7 de orus-a2 (toma de la v1),
# líneas 2-3 de v2-a2, líneas 8-11 de v2-b2, Rubén (Algenib) v2-ruben7 (la única toma en la que STT oye "por tu año"),
# línea 13 de v2-c1. Correr desde reels/por-que-el-caramelo.
set -e
P=partes
ff() { echo "atrim=$1:$2,asetpts=PTS-STARTPTS,afade=t=in:d=0.006,afade=t=out:st=$(echo "$2 - $1 - 0.008" | bc -l | sed "s/^\./0./"):d=0.008"; }
sil() { echo "aevalsrc=0:d=$1:s=48000:c=mono"; }
ffmpeg -y -hide_banner -loglevel error -i $P/orus-a2.wav -i $P/v2-a2.wav -i $P/v2-b2.wav -i $P/v2-ruben7.wav -i $P/v2-c1.wav -filter_complex "
[0:a]$(ff 0.20 2.45)[a1];
$(sil 0.25)[s1];
[1:a]$(ff 0.20 4.05),volume=0.5dB[a2];
$(sil 0.35)[s2];
[0:a]$(ff 7.30 14.60)[a3];
$(sil 0.15)[s3];
[0:a]$(ff 14.60 15.26)[a4];
$(sil 0.12)[s4];
[2:a]$(ff 0.20 11.58),volume=1.3dB[a5];
$(sil 0.4)[s5];
[3:a]$(ff 0.10 2.15),volume=0.5dB[a6];
$(sil 0.45)[s6];
[4:a]$(ff 0.14 5.80),volume=2dB[a7];
[a1][s1][a2][s2][a3][s3][a4][s4][a5][s5][a6][s6][a7]concat=n=13:v=0:a=1,aformat=sample_rates=48000:channel_layouts=mono[o]" -map "[o]" -c:a pcm_s16le assets/voice/locucion.wav
