#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
ALT="highpass=f=320,lowpass=f=3400,acompressor=threshold=-24dB:ratio=3:attack=4:release=80:makeup=2"   # el altavoz del celular de Silvana
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
# hueco <toma> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
hueco() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
hueco 01-graciela-b g1 0.35 0.83 0.22 "$ALT"     # Graciela (Gacrux, altavoz) "¿Y? ¿Hubo visitas?" (se reusa igual en Q3)
v 02-silvana-b  s1 "atempo=1.05"               # Silvana (Erinome) "¿Hubo visitas en lo de Graciela?"
v 03-diego-b    d1                             # Diego (Achird) "Un montón."
v 04-romina-c   ro1                            # Romina (Pulcherrima) "Ninguna."
v 05-silvana-b  s2 "atempo=1.05"               # Silvana "Me dicen que varias, Graciela."
hueco 06-graciela-b g2 1.0 2.06 0.5             # Graciela en el balcón "Qué raro. … La llave la tengo yo."
v 07-graciela-b g3 "$ALT"                      # Graciela (altavoz, seca) "Mañana paso a buscar el cartel."
hueco 08-diego-b d2 0.95 1.33 0.25 "atempo=1.1"   # Diego, bajito "Ah. Era el de Malvín."
v 09-narrador-b narrador "atempo=1.07"                     # Rasalgethi "Un registro de visitas más tarde."
hueco 10-silvana-b s3 0.51 1.02 0.3 "atempo=1.04"  # Silvana "Cuatro. Y el martes vuelve una pareja."
hueco 11-graciela-c g4 0.58 1.08 0.28 "$ALT"     # Graciela (altavoz) "Ya sé. Llamaba para chusmear."
v 12-graciela-c g5                             # Graciela en el balcón, contenta "Mañana paso a buscar el cartel."
v 13-sofi-c     so                             # Sofi (Achernar) "Comentá VISITAS y te mando cómo funciona para tu inmobiliaria."
for k in g2 so; do node ../../herramientas/tiempos.mjs assets/voice/$k.wav partes/$( [ $k = g2 ] && echo 06-graciela || echo 13-sofi ).txt assets/voice/palabras-$k.json 2>&1 | grep -i "oyó"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
