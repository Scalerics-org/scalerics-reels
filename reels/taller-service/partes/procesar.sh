#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
hueco ${O1:-01-oscar-e}    o1 0.82 1.25 0.18 "atempo=1.2"   # Óscar (Charon) "Listo, Walter. Volvé a los diez mil kilómetros." (se reusa en Q1)
hueco ${W1:-02-walter-a}   w1 0.50 0.97 0.16 "atempo=1.15"   # Walter (Umbriel) "¡Obvio! Vos sos mi mecánico." (se reusa en Q1)
tal   ${M1:-03-maxi-a}     m1 "atempo=1.16"                  # Maxi (Puck) "Jefe, ¿hoy no viene nadie?" (se reusa en Q3)
tal   ${O2:-04-oscar-a}    o2 "atempo=1.13"                  # Óscar "Ya vuelven. Tienen el papelito."
tal   ${W2:-05-walter-c}   w2 "atempo=1.2"                  # Walter "Óscar, no entiendo. Si le hice el service hace poquito."
hueco ${O3:-06-oscar-c}    o3 2.10 2.56 0.46 "atempo=1.14"   # Óscar "Volviste a los diez mil, Walter. Cuatro veces." (pausa antes del remate)
tal   ${W3:-07-walter-a}   w3 "atempo=1.13"                  # Walter "Ponele otro papelito, así no me olvido."
ffmpeg -loglevel error -y -i partes/rec/${NAR:-08-narrador-c}.wav -af atempo=1.12 -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Una ficha por auto más tarde."
hueco ${W4:-09-walter-a}   w4 0.19 0.55 0.12 "atempo=1.06"   # Walter "¡Uh! Justo me estaba olvidando."
hueco ${O4:-10-oscar-c}    o4 0.79 1.19 0.24 "atempo=1.13"   # Óscar "Ya vinieron. Tenían el aviso."
tal   ${W5:-11-walter-c}   w5 "atempo=1.13"                  # Walter "¡Óscar! ¡Volví a los diez mil!"
tal   ${O5:-12-oscar-b}    o5 "atempo=1.08"                  # Óscar "Una vez. Así me gusta."
tal   ${W6:-13-walter-c}   w6 "atempo=1.1"                  # Walter "¿No me ponés el papelito?"
tal   ${O6:-14-oscar-a}    o6 "atempo=1.13"                  # Óscar "El papelito ahora te escribe."
tal   ${O7:-15-oscar-c}    o7 "atempo=1.15"                  # Óscar a cámara "Comentá SERVICE y te mando cómo funciona para tu taller."
node ../../herramientas/tiempos.mjs assets/voice/o7.wav partes/15-oscar.txt assets/voice/palabras-o7.json 2>&1 | grep -i "oyó"
for k in o1:01-oscar w1:02-walter o3:06-oscar o4:10-oscar w4:09-walter; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
