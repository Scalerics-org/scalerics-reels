#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
CEL="highpass=f=300,lowpass=f=3400,acompressor=threshold=-24dB:ratio=3:attack=5:release=80:makeup=2,volume=-2dB"   # audio de WhatsApp
LLAM="lowpass=f=7000"                                                                                                  # videollamada, muy leve
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-carolina-a c1 "atempo=1.06,$CEL"     # "Ay, Lore, justo me surgió algo." (audio)
v 02-lorena-b   l1                        # "Tranqui."
v 03-jimena-a   j1 "atempo=1.08,$CEL"     # "¿Era hoy? Lo tenía para el jueves que viene." (audio)
v 04-lorena-c   l2                        # "Lo único puntual hoy fueron las excusas."
v 05-carolina-b c2 "atempo=1.06,$CEL"     # "Lore, ¿me guardás el jueves que viene? Esta vez voy." (audio)
v 06-lorena-a   l3                        # "Te lo guardo."
v 07-narrador-c narrador                  # "Una agenda online más tarde." (Rasalgethi, toma nueva)
v 08-lorena-a   l4                        # "Te mando el link."
v ${GRA:-09-graciela-e} g1                # "¡Me lo quedo!"
v 10-carolina-d c3 "atempo=1.06"          # "¡Llegué! Pagué la seña, ¿cómo no voy a venir?" (en persona)
v 11-lorena-a   l5 "volume=-1dB"          # "Mirá vos. Hoy le surgió venir." (aparte)
v 12-sofi-a     s1 "atempo=1.1,$LLAM"     # "Comentá TURNOS y te mando cómo funciona para tu centro de estética."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
