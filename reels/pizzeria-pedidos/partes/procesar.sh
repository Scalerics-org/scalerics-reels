#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas elegidas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
TEL="highpass=f=300,lowpass=f=3400,asoftclip=type=tanh:threshold=0.6,volume=-2dB"   # filtro de teléfono
v 01-tano-a     t1 "atempo=1.2"           # Tano "Una muzza y dos fainá… ¿Calle qué?"
v 02-martin-b   m1 "atempo=1.05,$TEL"      # Martín por teléfono "¡Duvimioso Terra!"
v 03-tano-a     t2 "atempo=1.12"           # Tano "Ajá. ¿Con be larga?"
v 04-tano-c     t3                         # Tano "¡Ya sale!" (con la masa cruda)
v 05-facu-a     f1 "atempo=1.22"           # Facu "Tano. Dubimioso no existe."
v 06-tano-c     t4                         # Tano "Cenamos."
v 07-tano-a     t5 "atempo=1.08"           # Tano "¡Ya sale!" con la boca llena (se reusa en Q2 con filtro en la mezcla)
v 08-narrador-c narrador "atempo=1.12"     # narrador Rasalgethi "Mientras tanto, en la de enfrente."
v 09-martin-c   m2                         # Martín "¿Ya está?"
v 10-sabri-b    s1 "atempo=1.15"           # Sabri "¿Martín? Una muzza y dos fainá."
v 11-tano-a     t6                         # Tano "¿Y esa cómo hace?"
v 12-lucia-c    l1 "atempo=1.14"            # Lucía "Comentá MENÚ y te mando cómo funciona para tu pizzería."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
# la pausa interna de "Ajá. ¿Con be larga?" de 0,59 s a ~0,34 s
ffmpeg -loglevel error -y -i assets/voice/t2.wav -filter_complex "[0]atrim=0:0.45,asetpts=PTS-STARTPTS[a];[0]atrim=0.70,asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1" -ar 48000 -ac 1 partes/tmp/t2.wav && mv partes/tmp/t2.wav assets/voice/t2.wav
printf "t2 recortado %s\n" $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/t2.wav)
