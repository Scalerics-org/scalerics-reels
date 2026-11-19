#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
# corte(f, a, b): saca el tramo [a, b] (una pausa interna demasiado larga) y deja 0,2 s
cd "$(dirname "$0")/.."
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
pausa() { # toma salida a b [filtro]: deja [0,a] + [b,fin] con 0,05 s de fundido en la unión
  ffmpeg -loglevel error -y -i partes/rec/$1.wav -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(python3 -c "print($3-0.04)"):d=0.04[a];[0]atrim=start=$4,asetpts=PTS-STARTPTS,afade=t=in:d=0.03[b];[a][b]concat=n=2:v=0:a=1,${5:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v ${C1:-01-carolina-c} c1                         # "Lore, ¿cuántas me quedan?" (P1 y Q1: el mismo audio)
v ${L1:-02-lorena-c}   l1                         # "Dejame ver."
v ${L2:-03-lorena-b}   l2 "atempo=1.06"           # "Según el cuaderno, una."
v ${C2:-04-carolina-a} c2 "atempo=1.06"   # "¿Una? Acá tengo siete sellos." (con la pausa interna más corta el STT oye "una vaca")
v ${L3:-05-lorena-b}   l3                         # "Hagamos el promedio."
v ${C3:-06-carolina-c} c3                         # "¿Y cuánto da?"
v ${L4:-07-lorena-c}   l4                         # "Tres."
v ${L5:-08-lorena-c}   l5                         # "Vale, ¿y la de Jimena?" (P6 y Q2: el mismo audio)
v ${C4:-10-carolina-a} c4                         # "Ah. Tres."
pausa ${L6:-11-lorena-a} l6 0.62 1.0          # "Tres. Sin promedio." (pausa interna 0,58 → 0,2)
v ${C5:-12-carolina-a} c5                         # "Chau, tarjetita."
v ${L7:-13-lorena-e}   l7 "${L7F:-atempo=1.05}"    # "Comentá SESIONES y te mando cómo funciona para tu centro de estética."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
