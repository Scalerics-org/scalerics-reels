#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-vero-b    v1 "atempo=1.05"            # Vero "Uy. Se terminó."
ffmpeg -loglevel error -y -i partes/tmp/r-01-vero-b.wav -filter_complex "[0]atrim=0:0.47,afade=t=out:st=0.43:d=0.04,asetpts=PTS-STARTPTS[a];[0]atrim=0.76,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=0:a=1,atempo=1.05" -ar 48000 -ac 1 assets/voice/v1.wav   # el hueco entre "Uy." y "Se terminó." más corto
v 02-vero-b    v2 "atempo=1.07"             # Vero "Bueno, Toto. Al súper."
v 03-ines-a    i1 "atempo=1.05"             # Inés "¡Vero! ¿Qué está comiendo Toto?" (se reusa igual en Q4)
v 04-vero-b    v3 "atempo=1.08"            # Vero "La que me recomendaste. La compro en el súper."
v 05-vero-a    v4 "atempo=1.12"            # Vero "¿Me la anotás? Así no me equivoco."
v 06-vero-c    v5                          # Vero "¿Cómo sabe?"
v 07-bruno-b   b1                          # Bruno "¡Ración para Toto!"
v 08-vero-b    v6 "atempo=1.08"             # Vero "La que me recomendaste. Me llega sola."
v 09-ines-a    i2 "atempo=1.05"             # Inés "Comentá RACIÓN y te mando cómo funciona para tu veterinaria."
# narrador.wav: copiado tal cual de reels/tienda-tenes-stock/assets/voice/narrador.wav (Rasalgethi, "Una tienda online más tarde.")
# (r1) la pausa antes del remate: entre "La que me recomendaste." y la segunda frase ~0,48 s de silencio (antes 0,2)
pausa() { ffmpeg -loglevel error -y -i assets/voice/$1.wav -filter_complex "[0]atrim=0:$2,asetpts=PTS-STARTPTS[a];anullsrc=r=48000:cl=mono,atrim=0:$3[s];[0]atrim=$2,asetpts=PTS-STARTPTS[b];[a][s][b]concat=n=3:v=0:a=1" -ar 48000 -ac 1 partes/tmp/p-$1.wav && mv partes/tmp/p-$1.wav assets/voice/$1.wav; }
pausa v3 1.60 0.28
pausa v6 1.33 0.25
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
