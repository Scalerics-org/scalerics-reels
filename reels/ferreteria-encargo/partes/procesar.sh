#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
mkdir -p partes/tmp assets/voice
# pausa(entrada, salida, a, b, deja): acorta el silencio interno [a, b] a `deja` segundos
pausa() { local h=$(python3 -c "print($5/2)");
  ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$(python3 -c "print($3+$h)"),asetpts=PTS-STARTPTS[a];[0]atrim=$(python3 -c "print($4-$h)"),asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1" $2; }
v() { ffmpeg -loglevel error -y -i ${4:-partes/rec/$1.wav} -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
pausa partes/rec/${S1:-01-susana-a}.wav partes/tmp/s1.wav ${S1P:-0.773 0.928} 0.07
v x s1 "atempo=${S1T:-1.14}" partes/tmp/s1.wav                  # Susana: "Gustavo, ¿tenés este cartucho? Me gotea la canilla." (P1 y Q1)
pausa partes/rec/02-gustavo-a.wav partes/tmp/g2.wav 0.952 1.143 0.14
v x g2 "atempo=1.08" partes/tmp/g2.wav                          # Gustavo: "Ese no me queda. Te lo encargo."
v 03-gustavo-a g3                                               # Gustavo: "Dejame tu número." (P1b, P5, Q1, Q5)
v 04-tito-b t4 "atempo=1.04"                                    # Tito: "Seis tornillos del ocho." (P2 y Q2)
pausa partes/rec/05-susana-a.wav partes/tmp/s5.wav 0.73 0.95 0.12
v x s5 "atempo=1.1" partes/tmp/s5.wav                          # Susana: "Gustavo, ¿llegó lo mío?"
v 06-gustavo-a g6                                               # Gustavo: "Elegí."
v 07-susana-a s7                                                # Susana: "Ya lo compré."
pausa partes/rec/08b-susana-c.wav partes/tmp/s8.wav 1.46 1.885 0.12   # (r1) "¿Me encargás... este?": la única toma donde el STT oye "este"
v x s8 "atempo=1.16" partes/tmp/s8.wav                          # Susana (P5 y Q5)
v ${S10:-10-susana-d} s10 "atempo=${S10T:-1.0}"                # Susana: "¡Llegó lo mío!"
v 11-susana-a s11                                               # Susana: "Ya lo tenés."
v 12-gustavo-c g12 "atempo=1.09"                                # Gustavo: "Comentá ENCARGO y te mando cómo funciona para tu ferretería."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
