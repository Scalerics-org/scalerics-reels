#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
tal   01-graciela-c g1 "atempo=1.1"                     # Graciela (Gacrux) "Rubén, ¿por dónde viene el camión?"
tal   02-ruben-a    r1 "atempo=1.1"                     # Rubén (Algenib) "Está llegando."
tal   03-marta-b    m1                                   # Marta (Aoede) "¿Por dónde viene?"
tal   04-ruben-a    r2                                   # Rubén "Llegando." (más corto)
hueco 05-hector-b   h1 0.61 0.82 0.12 "atempo=1.1"      # Héctor (Sadaltager) "Rubén, ¿y el camión?"
tal   06-ruben-c    r3                                   # Rubén "Llegando." (más cansado)
tal   07-nico-a     n1 "atempo=1.04"                     # Nico (Fenrir) "Jefe, ¿dónde está el camión?" (se reusa en Q3)
tal   08-ruben-a    r4                                   # Rubén "Llegando." (automático; se reusa en Q3)
tal   09-nico-b     n2                                   # Nico "¿Adónde?" (se reusa en Q3)
hueco 10-ruben-b    r5 1.75 1.91 0.34 "atempo=1.1"      # Rubén "Es un camión, Nico. … A algún lado llega."
tal   11-ruben-c    r6 "atempo=1.06"                     # Rubén "¿Y esta firma?"
tal   12-ruso-a     u1                                   # Ruso (Zubenelgenubi) "Un señor."
hueco 13-ruben-i    r7 0.36 0.8 0.07                     # Rubén "¿Qué… señor?" (r1: toma i, separada; la a sonaba "sénior")
tal   14-ruso-a     u2                                   # Ruso "Uno que pasaba."
tal   15-narrador-a narrador "atempo=1.14"               # narrador (Rasalgethi) "Una hoja de ruta más tarde."
hueco 16-graciela-a g2 0.54 0.99 0.32 "atempo=1.05"      # Graciela "Ah. … Soy la próxima."
tal   17-marta-a    m2 "atempo=1.04"                     # Marta "Al banco voy a la una."
hueco 21-ruben-a    r8 0.8 1.44 0.3 "atempo=1.06"        # Rubén "A lo de Héctor. … En dos minutos."
tal   22-hector-a   h2                                   # Héctor "¿Firmo yo?"
hueco 23b-ruso-d   u3 0.37 0.89 0.28                   # Ruso "Vos. … No un señor." (r1)
hueco 24-ruben-b    r9 0.47 1.12 0.32 "atempo=1.05"      # Rubén "¿Y hoy? … ¿Pasó algún señor?"
tal   25-ruso-b     u4                                   # Ruso "Ni uno."
tal   26-ruben-b    r10 "atempo=1.08"                    # Rubén "Comentá CAMIÓN y te mando cómo funciona para tu distribuidora."
node ../../herramientas/tiempos.mjs assets/voice/r10.wav partes/26-ruben.txt assets/voice/palabras-r10.json 2>&1 | grep -i "oyó"
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
