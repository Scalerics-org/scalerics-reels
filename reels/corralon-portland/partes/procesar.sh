#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
LLAM="lowpass=f=7000"                                                   # videollamada, muy leve
WA="highpass=f=250,lowpass=f=6000,acompressor=threshold=-20dB:ratio=3:attack=5:release=80"   # audio de WhatsApp
mkdir -p partes/tmp
# pausa(entrada, salida, a, b, deja): acorta el silencio interno [a, b] a `deja` segundos
pausa() { local h=$(python3 -c "print($5/2)");
  ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$(python3 -c "print($3+$h)"),asetpts=PTS-STARTPTS[a];[0]atrim=$(python3 -c "print($4-$h)"),asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1" $2; }
v() { ffmpeg -loglevel error -y -i ${4:-partes/rec/$1.wav} -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
# b1 · Beto (audio): "Gustavo, ¿tenés portland? Cuarenta bolsas. Hoy llenamos la losa." (se reusa igual en Q1)
pausa partes/rec/01-beto-e.wav partes/tmp/b1a.wav 0.64 0.82 0.1
pausa partes/tmp/b1a.wav partes/tmp/b1b.wav 1.45 1.68 0.14
pausa partes/tmp/b1b.wav partes/tmp/b1c.wav 2.48 2.68 0.12
v x b1 "atempo=1.08,$WA" partes/tmp/b1c.wav
v 02-gustavo-c g1                                  # "¡Ya te digo!" (se reusa igual en Q1)
v 03-gustavo-b g2                                  # "Beto espera."
v 04-gustavo-c g3                                  # "Es de la casa." (se reusa igual en Q4)
pausa partes/rec/05-beto-f.wav partes/tmp/b2.wav 0.99 1.23 0.16
v x b2 "atempo=1.06,$WA" partes/tmp/b2.wav         # Beto (audio): "Ya está, Gustavo. Me contestó otro."
v 06-beto-a b3 "atempo=1.05,$WA"                   # Beto (audio): "Ya las están bajando." (se reusa igual en Q4)
v 07-gustavo-a g4                                  # "Era de la casa."
v 08-tito-a t1 "atempo=1.1"                        # Tito: "¿Me das una bolsita de portland?" (se reusa igual en Q3)
v 10-gustavo-a g5                                  # "Ya le dijo."
v 11-gustavo-c g6                                  # "Las que quieras, Tito."
v 12-sofi-a f1 "atempo=1.06,$LLAM"                 # Sofi: "Comentá OBRA y te mando cómo funciona para tu corralón."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
