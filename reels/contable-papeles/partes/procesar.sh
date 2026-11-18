#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
ALT="highpass=f=260,lowpass=f=4300,acompressor=threshold=-24dB:ratio=3:attack=4:release=80:makeup=2"   # el altavoz del celular (audios de WhatsApp de Marcelo)
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
# hueco <toma> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
hueco() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
mkdir -p assets/voice partes/tmp
hueco 01-marcelo-c m1 0.45 0.84 0.14 "atempo=1.05,$ALT"   # Marcelo (Enceladus, audio) "Adri, las facturas te las mando mañana sin falta." (se reusa igual en Q3)
hueco 02-adriana-c a1 0.65 1.0 0.24 "atempo=1.04"         # Adriana (Autonoe) "Marcelo. Vence hoy."
hueco 03-marcelo-b m2 1.06 1.38 0.14 "atempo=1.08"        # Marcelo "Acá está todo, Adri. Ordenadito."
v 04-adriana-b a2                                         # Adriana "¿Y esta?"
v 05-marcelo-a m3 "atempo=1.12"                           # Marcelo "Esa es la más importante."
v 06-marcelo-c m4 "atempo=1.05"                           # Marcelo "Si querés, te mando una foto."
v 07-narrador-c narrador "atempo=1.05"                    # Rasalgethi "Una automatización más tarde."
hueco 08-marcelo-b m5 0.52 1.03 0.2 "atempo=1.04"         # Marcelo en la panadería "Listo. Ordenadito."
v 09-adriana-b a3 "atempo=1.1"                            # Adriana "Marcelo, las mandaste el día tres."
hueco 10-marcelo-a m6 0.62 0.9 0.28 "atempo=1.05,$ALT"   # Marcelo (audio) "¿Yo? Qué ordenadito."
v 11-sofi-c so "atempo=1.08,lowpass=f=7000"               # Sofi (Achernar) "Comentá PAPELES y te mando cómo funciona para tu estudio."
for k in m1:01-marcelo m6:10-marcelo so:11-sofi a3:09-adriana; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt assets/voice/palabras-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
