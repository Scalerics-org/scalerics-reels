#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
TEL="highpass=f=300,lowpass=f=3400,volume=5dB,asoftclip=type=tanh,volume=-4dB"   # Pablo por teléfono (P1) y como nota de voz (Q1)
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v ${P1:-01b-pablo-b}  p1 "atempo=1.12,$TEL"   # (r1) Pablo (Schedar) "Raúl, soy Pablo. ¿Me guardás mesa para ocho el viernes a las diez?"
v ${R1:-02-raul-a}    r1                        # Raúl (Iapetus) "¡Anotado, Pablo!"
v ${W1:-03-walter-b}  w1 "atempo=1.1"          # Walter (Umbriel) "Raúl, ¿tenés mesa para seis?"
v ${R2:-04-raul-b}    r2 "atempo=1.05"          # "No, Walter. Esa es de Pablo."
v ${F1:-05-fabian-b}  f1 "atempo=1.1"          # Fabián (Achird) "Raúl, ¿y los de las diez?" (P4 y Q4, la misma toma)
v ${R3:-06-raul-a}    r3                        # "Están llegando."
v ${F2:-07-fabian-c}  f2                        # "¿Y?"
v ${R4:-08-raul-b}    r4                        # "Siguen llegando." (seco)
v ${R5:-09-raul-a}    r5                        # "Dejá los cubiertos." (resignado)
v ${W2:-11-walter-g}  w2 "${W2F:-anull}"        # Walter "¡Esta vez sí entramos!"
v ${R6:-12-raul-b}    r6                        # "Ese es para mí."
v ${R7:-13-raul-a}    r7                        # "Llegaron."
v ${R8:-14-raul-a}    r8                        # "Dejá los cubiertos." (contento)
v ${R9:-15-raul-a}    r9 "${R9F:-atempo=1.17}"  # "Comentá RESERVA y te mando cómo funciona para tu restaurante."
# la pausa de "No, Walter." … "Esa es de Pablo." de 0,36 a 0,2 s
ffmpeg -loglevel error -y -i assets/voice/r2.wav -af "aselect='not(between(t,0.73,0.9))',asetpts=N/SR/TB" -ar 48000 -ac 1 partes/tmp/r2c.wav && mv partes/tmp/r2c.wav assets/voice/r2.wav
node ../../herramientas/tiempos.mjs assets/voice/r9.wav partes/15-raul.txt assets/voice/palabras-r9.json 2>&1 | grep -i "oyó"
for k in p1:01b-pablo r1:02-raul w1:03-walter r2:04-raul f1:05-fabian r3:06-raul r4:08-raul r5:09-raul w2:11-walter r6:12-raul r7:13-raul r8:14-raul; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
