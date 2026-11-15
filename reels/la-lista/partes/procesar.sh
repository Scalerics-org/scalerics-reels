#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
TEL="highpass=f=300,lowpass=f=3400,acompressor=threshold=-24dB:ratio=4:attack=5:release=80:makeup=2,volume=4dB"
CEL="highpass=f=250,lowpass=f=5000,acompressor=threshold=-24dB:ratio=3:attack=5:release=80:makeup=2,volume=3dB"
# corta [a,b] de un wav (para acortar una pausa) con fundidos de 10 ms
corte() { ffmpeg -loglevel error -y -i "$1" -filter_complex "[0]atrim=0:$2,afade=t=out:st=$(printf "%.3f" $(echo "$2-0.01"|bc)):d=0.01[a];[0]atrim=start=$3,asetpts=PTS-STARTPTS,afade=t=in:d=0.01[b];[a][b]concat=n=2:v=0:a=1" -ar 48000 "$4"; }
T=/tmp/claude-0/lalista-voz; mkdir -p $T
corte partes/rec/01-graciela-b.wav 0.50 0.60 $T/g1.wav;  ffmpeg -loglevel error -y -i $T/g1.wav -af "atempo=1.08,$CEL" -ar 48000 assets/voice/g1.wav
ffmpeg -loglevel error -y -i partes/rec/02-proveedor-a.wav -af "$TEL" -ar 48000 assets/voice/p1.wav
corte partes/rec/03-graciela-e.wav 0.66 0.82 $T/g2.wav;  ffmpeg -loglevel error -y -i $T/g2.wav -af "atempo=1.08,$TEL" -ar 48000 assets/voice/g2.wav
ffmpeg -loglevel error -y -i partes/rec/04-ruben-h.wav -ar 48000 assets/voice/r1.wav   # (ronda 1) "Está en la lista. La última."
corte partes/rec/05-graciela-f.wav 1.08 1.14 $T/g3.wav;  ffmpeg -loglevel error -y -i $T/g3.wav -af "atempo=1.08,$TEL" -ar 48000 assets/voice/g3.wav   # (ronda 1) "¿Cuál es la última? Tengo siete."
ffmpeg -loglevel error -y -i partes/rec/06-proveedor-b.wav -af "atempo=1.08,$TEL" -ar 48000 assets/voice/p2.wav
ffmpeg -loglevel error -y -i partes/rec/07-ruben-a.wav -ar 48000 assets/voice/r2.wav
corte partes/rec/08-graciela-a.wav 0.58 0.71 $T/g4.wav;  ffmpeg -loglevel error -y -i $T/g4.wav -af "atempo=1.08,$TEL" -ar 48000 assets/voice/g4.wav
ffmpeg -loglevel error -y -i partes/rec/10-ruben-a.wav -ar 48000 assets/voice/r3.wav
corte partes/rec/09b-ruben-b.wav 0.76 0.86 $T/r4.wav; ffmpeg -loglevel error -y -i $T/r4.wav -af atempo=1.06 -ar 48000 assets/voice/r4.wav   # (ronda 1) "Claro. En pe de efe no se mueve."
cp ../hacen-envios/assets/voice/narrador.wav assets/voice/narrador.wav
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
