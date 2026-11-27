#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
# Los audios que se reusan en las dos partes (m1, t3, m5) son UN solo archivo.
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
tal   ${M1:-01-monica-a}    m1 "atempo=1.14"                 # Mónica (Laomedeia) "Gustavo, ¿me pasás presupuesto? Es toda la casa." (P1 y Q1)
tal   ${G2:-02-gustavo-a}   g2 "atempo=1.08"                 # Gustavo (Alnilam) "Te lo armo para el lunes."
tal   ${T3:-03-tito-a}      t3 "atempo=1.13"                 # Tito (Enceladus) "Gustavo, ¿la de la casa te compró?" (P3 y Q4)
tal   ${G4:-04-gustavo-c}   g4 "atempo=1.05"                 # Gustavo "Yo no ando persiguiendo a nadie."
hueco ${M5:-05-monica-c}    m5 0.80 1.20 0.14 "atempo=1.08"  # Mónica "¡Gustavo! ¡Arrancamos la casa!" (P4 y Q5)
tal   ${M6:-06-monica-b}    m6 "atempo=1.17"                 # Mónica "El de la otra cuadra me escribió todos los días. ¡Un pesado!"
tal   ${G7:-07-gustavo-b}   g7 "atempo=1.05"                 # Gustavo "Por lo menos yo no fui pesado." (plano, seco)
tal   ${M8:-08-monica-c}    m8 "atempo=1.05"                 # Mónica "¡Y gracias por tu presupuesto! Se lo pasé a él."
tal   ${NAR:-09-narrador-b} narrador "atempo=1.05"           # Rasalgethi "Un seguimiento más tarde."
tal   ${G10:-10-gustavo-a}  g10                              # Gustavo "Te lo armo ahora."
tal   ${M11:-11-monica-c}   m11 "atempo=1.05"                # Mónica "¡Ay, qué atentos!"
hueco ${G12:-12-gustavo-c}  g12 0.42 0.92 0.3 "atempo=1.07"  # Gustavo "Compró. Con un botón."
hueco ${G13:-13-gustavo-a}  g13 0.55 0.93 0.32 "atempo=1.07" # Gustavo "Ya sé. Es mi camión."
tal   ${G14:-14-gustavo-b}  g14 "atempo=1.18"                # Gustavo a cámara "Comentá PRESUPUESTO y te mando cómo funciona para tu corralón."
node ../../herramientas/tiempos.mjs assets/voice/g14.wav partes/14-gustavo.txt assets/voice/palabras-g14.json 2>&1 | grep -i "oyó"
for k in m1:01-monica m5:05-monica m6:06-monica m8:08-monica g12:12-gustavo g13:13-gustavo; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
