#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas elegidas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
CEL="highpass=f=260,lowpass=f=4200,acompressor=threshold=-24dB:ratio=2.5:attack=4:release=80:makeup=1.5"   # audio de chat (pasabanda leve)
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
# hueco <toma> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
hueco() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
hueco 01-graciela-c g1 0.42 0.66 0.16 "$CEL"   # Graciela (Gacrux, audio) "Pao, ¿tenés stock de la verde?"
v 02-paola-c   pa1                           # Paola (Aoede) "¡Sí! La última. Hoy te la mando."
v 03-mica-e    mi1                           # Mica (Zephyr) "¡Pao! La verde la vendí en el local." (se reusa igual en Q1)
v 04-paola-b   pa2                           # Paola "Graciela, perdoname: se me agotó."
hueco 05-graciela-c g2 0.86 1.24 0.3 "$CEL"   # Graciela (audio) "Ay. Bueno, la compro en otro lado."
hueco 06-mica-e mi2 0.62 1.3 0.32            # Mica "Pao. ¿Y estas cajas?"
v 07-paola-c   pa3                           # Paola, seca "Del contenedor de marzo."
v 08-paola-c   pa4                           # Paola, de historia "¡Hola! ¡Ingreso nuevo!" (se reusa igual en Q4)
v 10-paola-a   pa5                           # Paola "Ya lo sabe la tienda."
v 11-graciela-b g3                           # Graciela en el sillón "Queda una. ¡Mía!"
v 12-paola-c   pa6                           # Paola "Ya se enteraron."
v 13-paola-a   pa7 "atempo=1.1"              # Paola a su historia "Comentá STOCK y te mando cómo funciona para tu importadora."
for k in pa7:13-paola mi2:06-mica g1:01-graciela g2:05-graciela mi1:03-mica; do a=${k%%:*}; b=${k##*:}; node ../../herramientas/tiempos.mjs assets/voice/$a.wav partes/$b.txt assets/voice/palabras-$a.json 2>&1 | grep -i "oyó" | sed "s/^/$a /"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
