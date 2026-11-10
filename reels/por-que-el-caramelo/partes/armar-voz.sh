#!/bin/sh
# Pega la locución (guion v2 + ronda 1 de sonido). Orus: línea 1 y 4-7 de orus-a2 (toma de la v1; "Con dos, más." y
# "¿Por qué?" +2 dB, pausa de ~0,7 s antes de "¿Por qué?"), línea 2 de v3-a2, línea 3 de v2-a2 (entera hasta "poco"),
# líneas 8-10 de v2-b2, "Le da un caramelo…" de v4-leda2 (más claro), pausa del amague 0,75 s, "y vuelve con otro." de
# v2-b2 (-1,5 dB relativo), Rubén (Algenib) v4-ruben4 ("Y este… por tu año.", la que STT oye "por tu año"), línea 13 de
# v2-c3 ("querés" con voseo, entera hasta "punto com" con fundido), Rubén de v4-ruben7e (toma nueva, recortada: "Y este…" + 0,4 s + "por tu año"; STT oye "por tu año"), y 0,3 s de cola para la tarjeta. Correr desde reels/por-que-el-caramelo.
set -e
P=partes
ff() { echo "atrim=$1:$2,asetpts=PTS-STARTPTS,afade=t=in:d=0.006,afade=t=out:st=$(echo "$2 - $1 - 0.008" | bc -l | sed "s/^\./0./"):d=0.008"; }
fl() { echo "atrim=$1:$2,asetpts=PTS-STARTPTS,afade=t=in:d=0.006,afade=t=out:st=$(echo "$2 - $1 - $3" | bc -l | sed "s/^\./0./"):d=$3"; }
sil() { echo "aevalsrc=0:d=$1:s=48000:c=mono"; }
ffmpeg -y -hide_banner -loglevel error -i $P/orus-a2.wav -i $P/v2-a2.wav -i $P/v2-b2.wav -i $P/v4-ruben7e.wav -i $P/v2-c3.wav -i $P/v3-a2.wav -i $P/v4-leda2.wav -filter_complex "
[0:a]$(ff 0.20 2.45)[a1];
$(sil 0.25)[s1];
[5:a]$(ff 0.22 2.12),volume=-0.6dB[a2a];
$(sil 0.3)[s1b];
[1:a]$(fl 2.45 4.33 0.035),volume=0.5dB[a2];
$(sil 0.12)[s2];
[0:a]$(ff 7.30 8.74),volume=2dB[a3a];
[0:a]$(ff 8.74 14.55)[a3b];
$(sil 0.5)[s3];
[0:a]$(ff 14.60 15.26),volume=2dB[a4];
$(sil 0.12)[s4];
[2:a]$(ff 0.20 9.30),volume=1.3dB[a5a];
$(sil 0.15)[s5a];
[6:a]$(ff 0.20 1.87),volume=1.0dB[a5b];
$(sil 0.75)[s5b];
[2:a]$(ff 10.66 11.58),volume=-1.2dB[a5c];
$(sil 0.4)[s5];
[3:a]$(ff 0.0 2.88),volume=0.4dB[a6];
$(sil 0.45)[s6];
[4:a]$(fl 0.22 5.611 0.045),volume=1.8dB[a7];
$(sil 0.3)[s7];
[a1][s1][a2a][s1b][a2][s2][a3a][a3b][s3][a4][s4][a5a][s5a][a5b][s5b][a5c][s5][a6][s6][a7][s7]concat=n=21:v=0:a=1,aformat=sample_rates=48000:channel_layouts=mono[o]" -map "[o]" -c:a pcm_s16le assets/voice/locucion.wav
