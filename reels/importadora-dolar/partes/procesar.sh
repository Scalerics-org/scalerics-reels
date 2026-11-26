#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
tal   ${S1:-01-seba-c}    s1  "atempo=1.18"                         # Seba (Umbriel) "¡Pao! ¡Vendimos todo el contenedor!" (se reusa en Q1)
tal   ${PA1:-02-paola-c}  pa1 "atempo=1.12"                         # Paola (Aoede) "¡Vamos! ¿A cuánto?" (se reusa en Q2)
hueco ${S2:-03-seba-a}    s2  0.49 0.81 0.28 "atempo=1.12"           # Seba "A lista. Mil novecientos cincuenta."
tal   ${MI1:-04-mica-a}   mi1 "atempo=1.2"                         # Mica (Zephyr) "Pao, llegó la factura del contenedor nuevo." (se reusa en Q4)
hueco ${PA2:-05-paola-a}  pa2 1.09 1.68 0.38 "atempo=1.06"          # Paola "Vendimos todo. Y perdimos plata."
tal   ${S3:-06-seba-a}    s3  "atempo=1.18"                         # Seba "¡Pao! ¡Graciela quiere doscientos más!"
# Paola "Seba. Por favor. Dejá de vender." (07-c): las dos pausas a 0,4 s
ffmpeg -loglevel error -y -i partes/rec/${PA3:-07-paola-c}.wav -filter_complex "[0]atrim=0:0.56,asetpts=PTS-STARTPTS,afade=t=out:st=0.53:d=0.03[a];[0]atrim=1.18:1.84,asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st=0.63:d=0.03[b];[0]atrim=2.45,asetpts=PTS-STARTPTS,afade=t=in:d=0.02[c];anullsrc=r=48000:cl=mono,atrim=0:0.4[s1];anullsrc=r=48000:cl=mono,atrim=0:0.42[s2];[a][s1][b][s2][c]concat=n=5:v=0:a=1,atempo=1.08" -ar 48000 -ac 1 assets/voice/pa3.wav
ffmpeg -loglevel error -y -i ../ya-lo-cargo/assets/voice/narrador.wav -af atempo=1.1 -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Un sistema más tarde."
tal   ${S4:-11-seba-c}    s4  "atempo=1.12"                         # Seba "Al de hoy. Dos mil quinientos treinta."
tal   ${PA4:-13-paola-a}  pa4                                       # Paola "Ya está cargada."
hueco ${PA5:-14-paola-a}  pa5 1.18 1.71 0.38 "atempo=1.06"          # Paola "Vendimos todo. Y ganamos plata." (la misma cadencia que pa2)
hueco ${S5:-15-seba-c}    s5  2.02 2.41 0.28 "atempo=1.15"            # Seba "¡Graciela quiere doscientos más! ¿Le hago un diez?"
tal   ${S6:-16-seba-b}    s6                                        # Seba "Le hago un cinco."
hueco ${PA6:-17-paola-f}  pa6 1.31 1.49 0.34 "atempo=1.05"                       # Paola "Vendé, Seba. Vendé."
tal   ${PA7:-18-paola-c}  pa7 "atempo=1.12"                         # Paola "Comentá PRECIOS y te mando cómo funciona para tu importadora."
node ../../herramientas/tiempos.mjs assets/voice/pa7.wav partes/18-paola.txt assets/voice/palabras-pa7.json 2>&1 | grep -i "oyó"
for k in s2:03-seba pa2:05-paola pa3:07-paola pa5:14-paola s5:15-seba pa6:17-paola; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
