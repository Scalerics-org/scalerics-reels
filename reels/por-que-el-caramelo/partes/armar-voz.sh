#!/bin/sh
# Pega la locución: Orus (orus-a2, con "Pareció un gesto personal." de la toma orus-parecio, que STT oye bien) +
# pausa antes de "¿Por qué?" y antes de "y vuelve" + Rubén (ruben2) + Orus (orus-b1). Correr desde reels/por-que-el-caramelo.
set -e
P=partes
ff() { echo "atrim=$1:$2,asetpts=PTS-STARTPTS,afade=t=in:d=0.006,afade=t=out:st=$(echo "$2 - $1 - 0.008" | bc -l | sed "s/^\./0./"):d=0.008"; }
sil() { echo "aevalsrc=0:d=$1:s=48000:c=mono"; }
ffmpeg -y -hide_banner -loglevel error -i $P/orus-a2.wav -i $P/orus-parecio.wav -i $P/ruben2.wav -i $P/orus-b1.wav -filter_complex "
[0:a]$(ff 0.20 14.60)[a1];
$(sil 0.15)[s1];
[0:a]$(ff 14.60 15.26)[a2];
[1:a]$(ff 0.20 1.99),volume=1.9dB[a3];
[0:a]$(ff 17.05 25.53)[a4];
$(sil 0.28)[s2];
[0:a]$(ff 25.53 26.13)[a5];
$(sil 0.35)[s3];
[2:a]$(ff 0.24 1.57),volume=1.2dB[a6];
$(sil 0.5)[s4];
[3:a]$(ff 0.24 6.14)[a7];
[a1][s1][a2][a3][a4][s2][a5][s3][a6][s4][a7]concat=n=11:v=0:a=1,aformat=sample_rates=48000:channel_layouts=mono[o]" -map "[o]" -c:a pcm_s16le assets/voice/locucion.wav
