#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
ALT="highpass=f=320,lowpass=f=3400,acompressor=threshold=-24dB:ratio=3:attack=4:release=80:makeup=2"   # altavoz del teléfono de escritorio
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-contador-b c1 "$ALT"              # contador (Algieba) "Rubén, ¿y Héctor?" (se reusa igual en Q4)
v 02-ruben-b    r1 "atempo=1.06"       # Rubén (Algenib) "¿Héctor? Compra todos los martes." (se reusa igual en Q4)
v 03-contador-b c2 "$ALT"              # contador "Compraba."
v 04-nico-a     n1                     # Nico (Fenrir) "Yo pensé que lo llamabas vos."
v 05-hector-b   h1 "atempo=1.1"        # Héctor (Sadaltager) "¡Rubén! ¿Cerraste? Dejé de pedir y nadie me llamó."
rec 06-ruben-c                         # Rubén "Te extrañó el contador." (atempo 1,08) con una pausita de 0,1 s antes de "el contador"
ffmpeg -loglevel error -y -i partes/tmp/r-06-ruben-c.wav -filter_complex "[0]atrim=0:0.6,afade=t=out:st=0.57:d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=0.6,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:0.1[s];[a][s][b]concat=n=3:v=0:a=1,atempo=1.08" -ar 48000 -ac 1 assets/voice/r2.wav
v 07-hector-a   h2                     # Héctor "Llamame el martes."
v 08-narrador-b narrador               # Rasalgethi "Un aviso automático más tarde."
v 09-nico-a     n2 "atempo=1.14"       # Nico "¡Héctor! Ayer no pediste. ¿Todo bien?"
v 10-hector-a   h3 "atempo=1.06"       # Héctor "¡Uh, se me pasó! Mandame lo de los martes."
v 11-contador-b c3 "$ALT"              # contador "Compra."
v 12-ruben-c    r3 "atempo=1.05"       # Rubén "Comentá CLIENTES y te mando cómo funciona para tu distribuidora."
node ../../herramientas/tiempos.mjs assets/voice/r3.wav partes/12-ruben.txt assets/voice/palabras-r3.json 2>&1 | grep -i "oyó"
node -e 'const p=require("./assets/voice/palabras-r3.json");console.log(JSON.stringify(p.map(w=>({w:w.text,a:w.start}))))' > partes/tmp/pal.json && mv partes/tmp/pal.json assets/voice/palabras-r3.json
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
