#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
# Los audios que vuelven en la parte 2 son el MISMO archivo: v1 (P1 por teléfono y Q5 en persona), v9 (P4 por teléfono y
# Q3 en altavoz), b10 (P5 y Q4). El filtro de teléfono / altavoz se pone en la mezcla (gen.mjs), no acá.
cd "$(dirname "$0")/.."
mkdir -p partes/tmp assets/voice
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-vero-b      v1                    # Vero "¿Cómo está Toto?" (P1 teléfono, Q5 en persona)
v 02-bruno-b     b2  "atempo=1.06"     # Bruno "Vero. Te estoy viendo."
v 03-bruno-c     b3                    # Bruno "Está dormido."
v 04-bruno-a     b4                    # Bruno "Sigue dormido."
v 05-bruno-b     b5  "atempo=1.2"      # Bruno "Sí. Dormido. Todavía."
v 06-bruno-a     b6  "atempo=1.05"     # Bruno "Doctora. Vero quiere hablar con él."
v 07-ines-a      i7                    # Inés "Está anestesiado."
v 08-bruno-a     b8                    # Bruno "Dice que no importa."
v 09-vero-a      v9                    # Vero "¡Ay, mi amor!" (P4 teléfono, Q3 altavoz)
v 10-bruno-a     b10                   # Bruno "Ahora el de Coco." (P5 y Q4)
v 11-narrador-b  narrador "atempo=1.1" # narrador "Unos avisos automáticos más tarde."
v 12-vero-d      v12                   # Vero "¡Ay, mirá! ¡Ya entró!"
v ${I13:-13-ines-g} i13 "atempo=1.04"  # Inés "Bruno, ¿llamó alguien?"
v 14-bruno-b     b14                   # Bruno "Nadie."
v 15-bruno-d     b15                   # Bruno "Preguntale a él."
v 16-ines-a      i16 "atempo=1.1"      # Inés "Comentá AVISOS y te mando cómo funciona para tu veterinaria."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
