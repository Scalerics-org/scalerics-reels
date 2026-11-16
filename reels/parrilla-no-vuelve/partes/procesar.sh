#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
LLAM="lowpass=f=7000"                     # videollamada, muy leve
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-walter-a   w1 "atempo=1.08"          # "¡Impecable, Raúl! ¡Volvemos!" (P1 y Q1, la misma toma)
v 02-raul-a     r1                        # "¡Cuando quieras, maestro!"
v 03-raul-a     r2 "volume=-2dB"          # "¿Quién era?" (aparte)
v 04-mozo-a     f1 "atempo=1.06"          # "¿Y si les avisás a los del sábado?"
v 05-raul-a     r3                        # "¿A quién? ¿A maestro?"
v 06-walter-b   w2 "atempo=1.08"          # "¡Raúl! ¿Te acordás de mí?" (P7 y Q4, la misma toma; la a decía "acuerdas")
v 07-raul-b     r4 "atempo=1.08"          # "¡Obvio, maestro!"
v 08-narrador-a narrador "atempo=1.05"    # "Una tarjeta de puntos más tarde." (Rasalgethi)
v ${R5:-09-raul-e} r5                     # "¡Te espero, Walter!"
v 10-graciela-a g1                        # "¡Vamos el martes!"
v ${R6:-11-raul-e2} r6 "${R6F:-atempo=1.18}"     # "Walter. Tira y morcilla dulce. Faltaste dos sábados."
v 12-sofi-b     s1 "atempo=1.15,$LLAM"    # "Comentá VUELVE y te mando cómo funciona para tu parrilla."
# pausas internas más cortas (recorte de silencio dentro de la toma ya procesada)
corta() { ffmpeg -loglevel error -y -i assets/voice/$1.wav -af "aselect='not(between(t,$2,$3))',asetpts=N/SR/TB" -ar 48000 -ac 1 /tmp/claude-0/c-$1.wav && mv /tmp/claude-0/c-$1.wav assets/voice/$1.wav; }
corta r3 0.75 0.95        # "¿A quién?" … "¿A maestro?": la pausa de 0,5 a 0,3 s
corta w2 1.0 1.3          # "¡Raúl!" … "¿Te acordás de mí?": de 0,41 a 0,15 s
# (r2) estira la pausa antes de "Faltaste dos sábados." (0,13 → 0,3 s)
estira() { ffmpeg -loglevel error -y -i assets/voice/$1.wav -filter_complex "[0:a]atrim=0:$2,asetpts=N/SR/TB[a];[0:a]atrim=$2,asetpts=N/SR/TB[b];anullsrc=r=48000:cl=mono,atrim=0:$3[s];[a][s][b]concat=n=3:v=0:a=1" -ar 48000 -ac 1 /tmp/claude-0/e-$1.wav && mv /tmp/claude-0/e-$1.wav assets/voice/$1.wav; }
estira r6 2.26 0.17
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
