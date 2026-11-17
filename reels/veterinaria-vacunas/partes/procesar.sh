#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
LLAM="lowpass=f=7000"        # videollamada, muy leve
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-vero-b    v1 "atempo=1.12"            # Vero "Doctora, ¿y cuándo le toca la próxima?" (se reusa igual en Q1)
v 02-ines-b    i1                          # Inés "Yo le aviso."
v 03-bruno-a   b1 "atempo=1.12"            # Bruno (Schedar) "Doctora, ¿y los avisos de las vacunas?" (se reusa igual en Q3)
v 04-ines-b    i2 "atempo=1.06"            # Inés "El que quiere a su perro, se acuerda."
v 05b-vero-e   v2 "atempo=1.1"             # (r1) Vero "A Toto le escribieron de la de la vuelta. Ya está vacunado." (sin "¡Doctora!")
v 06-ines-b    i3                          # Inés "¿Vos también, Toto?" (seca)
ffmpeg -loglevel error -y -i partes/tmp/r-06-ines-b.wav -filter_complex "[0]atrim=0:0.57,afade=t=out:st=0.54:d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=0.57,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:0.14[s];[a][s][b]concat=n=3:v=0:a=1" -ar 48000 -ac 1 assets/voice/i3.wav   # (r1) pausita de 0,14 s antes de "Toto"
v 07-narrador-a narrador "atempo=1.1"      # Rasalgethi "Un recordatorio automático más tarde."
v 08-ines-a    i4                          # Inés "Le vamos a escribir a él."
v 09-vero-c    v3 "atempo=1.1"             # Vero "¡Toto! ¡Te escribieron!"
v 10-ines-c    i5                          # Inés "Ya salieron solos."
v 11-ines-c    i6                          # Inés "¿Vos también, Toto?" (feliz)
v 12-sofi-b    f1 "atempo=1.12,$LLAM"      # Sofi "Comentá VACUNA y te mando cómo funciona para tu veterinaria."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
