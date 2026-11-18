#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# (08b/15b: tomas de "Bueno. Te paso con …" con el "Bueno." cortado en partes/rec/*-c.wav; sin contexto el STT oye "qué pasó" en TODAS las tomas de Patricia, con el "Bueno." delante oye "te pasó")
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
# hueco <toma> <salida> <a> <b> <silencio> [filtro] (los tiempos de partes/rec, recorte a -45 dB)
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
hueco 01-patricia-c pa1 1.66 1.84 0.12 "atempo=1.03"            # Patricia (Pulcherrima) "Rubén, estás en rojo. Y hoy pagás sueldos."
hueco 02-ruben-c    r1  0.86 1.09 0.14 "atempo=1.1"            # Rubén (Algenib) "Tranquila. La calle me debe un millón."
corta partes/rec/03-ruben-b.wav partes/tmp/r2a.wav 1.46 1.99 0.3 && ffmpeg -loglevel error -y -i partes/tmp/r2a.wav -af "atempo=1.08,areverse,afade=t=in:d=0.15,areverse" -ar 48000 -ac 1 assets/voice/r2.wav   # "Graciela, querida… te llamaba por lo de la factura…" (lo pisa g1)
corta partes/rec/04-graciela-a.wav partes/tmp/g1a.wav 2.15 2.31 0.06       # los tres huecos internos de "¡Rubén! · Justo. · Mandame · veinte cajas."
corta partes/tmp/g1a.wav partes/tmp/g1b.wav 1.51 1.69 0.08
corta partes/tmp/g1b.wav assets/voice/g1.wav 1.14 1.25 0.05 "atempo=1.12"            # Graciela (Gacrux) "¡Rubén! Justo. Mandame veinte cajas."
ffmpeg -loglevel error -y -i partes/rec/05-ruben-a.wav -ar 48000 -ac 1 assets/voice/r3.wav   # "…Dale." (resignado)
ffmpeg -loglevel error -y -i partes/rec/06-patricia-a.wav -ar 48000 -ac 1 assets/voice/pa2.wav   # "¿Y? ¿Cobraste?" (se reusa en Q4)
hueco 07-ruben-c    r4  0.61 1.06 0.32                         # "Mejor. Ahora me deben más." (EL remate)
ffmpeg -loglevel error -y -i partes/rec/${PA3:-08b-g-c}.wav -ar 48000 -ac 1 assets/voice/pa3.wav   # "Te paso con cobranzas."
ffmpeg -loglevel error -y -i partes/rec/09-narrador-b.wav -af "atempo=1.06" -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Una cobranza automática más tarde."
hueco 10-graciela-b g2  0.68 1.07 0.16 "atempo=1.1"             # "¿Por favor? Esto no lo escribió Rubén."
hueco 11-nico-a     n1  0.44 0.89 0.22                          # Nico (Fenrir) "Beto. Hoy paso."
corta partes/rec/12-graciela-b.wav partes/tmp/g3a.wav 1.82 2.34 0.16   # "¡Rubén! Ya te pagué. Mandame veinte cajas."
corta partes/tmp/g3a.wav assets/voice/g3.wav 0.59 0.98 0.14 "atempo=1.12"
ffmpeg -loglevel error -y -i partes/rec/13-ruben-c.wav -ar 48000 -ac 1 assets/voice/r5.wav   # "Dale." (firme)
hueco 14-ruben-a    r6  0.67 1.03 0.32 "atempo=1.04"                          # "Mejor. Cobré y vendí."
ffmpeg -loglevel error -y -i partes/rec/${PA4:-15b-h-c}.wav -ar 48000 -ac 1 assets/voice/pa4.wav   # "Te paso con inversiones."
hueco 16-ruben-c    r7  1.03 1.24 0.1 "atempo=1.1"            # "Comentá COBRAR y te mando cómo funciona para tu distribuidora."
node ../../herramientas/tiempos.mjs assets/voice/r7.wav partes/16-ruben.txt assets/voice/palabras-r7.json 2>&1 | grep -i "oyó"
for k in pa1:01-patricia r1:02-ruben g1:04-graciela r4:07-ruben g2:10-graciela g3:12-graciela r6:14-ruben; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
