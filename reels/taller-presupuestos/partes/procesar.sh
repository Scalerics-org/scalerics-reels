#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
LLAM="lowpass=f=7000"        # videollamada, muy leve
CALLE="highpass=f=150,volume=-2dB"   # Sergio gritando desde el auto, en la calle
mkdir -p partes/tmp
# pausa(entrada, salida, a, b, deja): acorta el silencio interno [a, b] a `deja` segundos
pausa() { local m=$(python3 -c "print(($3+$4)/2)"); local h=$(python3 -c "print($5/2)");
  ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$(python3 -c "print($3+$h)"),asetpts=PTS-STARTPTS[a];[0]atrim=$(python3 -c "print($4-$h)"),asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1" $2; }
v() { ffmpeg -loglevel error -y -i ${4:-partes/rec/$1.wav} -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-sergio-a s1                                   # "Lo pienso y te aviso." (se reusa igual en Q1)
pausa partes/rec/02-maxi-g.wav partes/tmp/m1.wav 0.57 1.03 0.12
v x m1 "anull" partes/tmp/m1.wav                   # "Jefe, ¿a esos no los llamamos?" (pausa después de "Jefe," 0,1 s; se reusa igual en Q3)
v 03-oscar-c  o1 "atempo=1.08"                     # "Si les interesa, llaman."
pausa partes/rec/04-sergio-a.wav partes/tmp/s2a.wav 0.49 0.94 0.16; pausa partes/tmp/s2a.wav partes/tmp/s2b.wav 2.20 2.43 0.12
v x s2 "atempo=1.14,$CALLE" partes/tmp/s2b.wav    # "¡Óscar! Al final lo hice acá a la vuelta. ¡Me llamaron!"
pausa partes/rec/05-oscar-a.wav partes/tmp/o2.wav 0.69 1.38 0.42
v x o2 "anull" partes/tmp/o2.wav                   # "Lo pensó. Y me avisó." (pausa interna 0,42 s)
v 06-narrador-b narrador "atempo=${NARV:-1.1}"     # "Un sistema de presupuestos más tarde." (Rasalgethi)
v 07-oscar-b  o3                                   # "Pensalo tranquilo."
v 08-sergio-a s3 "atempo=1.08"                    # "Justo lo estaba pensando." (r2: la toma a, la b se comía el "lo")
v 09-oscar-e  o4                                   # "Ya les escribió el sistema."
v 10-sergio-b s4                                   # "Lo pensé."
v 11-oscar-c  o5                                   # "Y me avisaste."
v 12-sofi-b   f1 "atempo=1.12,$LLAM"               # "Comentá PRESUPUESTO y te mando cómo funciona para tu taller."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
