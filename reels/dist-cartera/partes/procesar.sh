#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
hueco ${L1:-01-leo-b}   l1 1.27 1.52 0.2 "atempo=1.04"      # Leo (Sadachbia) "Rubén, te quiero un montón. Pero me voy."
tal   ${R1:-02-ruben-c} r1                                  # Rubén (Algenib) "¿Y los clientes?" (se reusa en Q1)
hueco ${L2:-03-leo-a}   l2 0.49 0.87 0.18 "atempo=1.05"     # Leo "Tranqui. Te dejé el Excel."
hueco ${R2:-04-ruben-b} r2 1.51 1.99 0.45 "atempo=1.06"   # (r1) ≥ 0,4 s antes de "Me dejaste tres."      # Rubén "Treinta y ocho clientes. Me dejaste tres."
hueco ${R3:-05-ruben-c} r3 0.56 0.88 0.16 "atempo=1.04"     # Rubén "Marta, habla Rubén."
hueco ${M1:-06b-marta-b} m1 0.70 1.11 0.2 "atempo=1.04"   # (r1) toma con el texto forzado "cómpro" (presente)                    # Marta (Aoede) "¿Qué Rubén? Yo le compro a Leo."
hueco ${N1:-07-nico-d}  n1 0.41 0.78 0.2 "atempo=1.03"                    # Nico (Fenrir) "Jefe, ¿y la zona de Leo?" (se reusa en Q3)
hueco ${R4:-08-ruben-c} r4 0.42 0.85 0.3                    # Rubén "Tuya. Son dos." (EL remate del remate)
ffmpeg -loglevel error -y -i ../lo-mismo-que-la-otra-vez/assets/voice/narrador.wav -af "atempo=1.2" -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Un sistema de clientes más tarde."
tal   ${L3:-10-leo-c}   l3 "atempo=1.03"                    # Leo "Donde estuvieron siempre."
hueco ${R5:-11-ruben-b} r5 0.48 0.83 0.22 "atempo=1.05"     # Rubén "Tuya. Son treinta y ocho."
hueco ${N2:-12-nico-h}  n2 1.54 1.94 0.2 "atempo=1.1"      # (r1) Nico "Marta, ¿lo de los martes? Y las dos cajas que te guardó Leo."
tal   ${M2:-13-marta-g} m2 "atempo=1.12"                    # (r1) Marta "¡Nico! Leo me habló de vos. Mandame."
hueco ${R6:-14-ruben-b} r6 0.81 1.01 0.16 "atempo=1.04"     # Rubén "Treinta y ocho. Con nombre y apellido."
tal   ${S1:-15-sofi-a}  s1 "atempo=1.08"                    # Sofi (Achernar) "Comentá CARTERA y te mando cómo funciona para tu distribuidora."
node ../../herramientas/tiempos.mjs assets/voice/s1.wav partes/15-sofi.txt assets/voice/palabras-s1.json 2>&1 | grep -i "oyó"
for k in l1:01-leo r2:04-ruben m1:06-marta n1:07-nico r5:11-ruben n2:12-nico m2:13-marta r6:14-ruben; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
