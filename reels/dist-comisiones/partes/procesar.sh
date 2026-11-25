#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
ALT="highpass=f=320,lowpass=f=3400,acompressor=threshold=-22dB:ratio=3:attack=5:release=80"   # Graciela por el altavoz del celular
tal   ${N1:-01-nico-c}    n1 "atempo=1.08"                                 # Nico (Fenrir) "Jefe, ¿cuánto me toca?" (se reusa en Q1)
hueco ${R1:-02-ruben-a}   r1 0.62 0.97 0.34 "atempo=1.16"     # Rubén (Algenib) "Fácil. Tres por ciento de lo cobrado."
tal   ${R2:-03-ruben-a}   r2 "atempo=1.05"                                 # Rubén "Nico: cuarenta y dos mil."
hueco ${N2:-04-nico-b}    n2 1.31 1.49 0.14 "atempo=1.18"     # Nico "¿Cuarenta y dos? Súper Héctor es mío."
tal   ${J1:-05-javi-b}    j1                                  # Javi (Achird) "¡Héctor es mío!"
hueco ${R3:-06-ruben-b}   r3 1.30 1.61 0.38 "atempo=1.16"     # Rubén "Felicitaciones. Entre los dos vendieron más que la empresa." (≥ 0,35 s de pausa)
tal   ${G1:-07-graciela-c} g1 "atempo=1.18,$ALT"               # Graciela (Gacrux, altavoz) "Rubén, te devuelvo seis cajas." (se reusa en Q4)
# (r1) r4 = "Te toca menos." de 15-h (articulada: se entiende sola y en la mezcla) + 0,3 s + "Pasá el jueves." de 08-f
ffmpeg -loglevel error -y -i partes/rec/15-ruben-h.wav -i partes/rec/08-ruben-f.wav -filter_complex "[0]atempo=1.2,afade=t=out:st=1.2:d=0.03[a];anullsrc=r=48000:cl=mono,atrim=0:0.3[s];[1]atrim=1.31,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.02,atempo=1.1[b];[a][s][b]concat=n=3:v=0:a=1" -ar 48000 -ac 1 assets/voice/r4.wav
ffmpeg -loglevel error -y -i ../ya-lo-cargo/assets/voice/narrador.wav -af atempo=1.08 -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Un sistema más tarde."
tal   ${R5:-10-ruben-b}   r5                                  # Rubén "Mirá el celular."
hueco ${N3:-11-nico-b}    n3 1.35 1.65 0.2 "atempo=1.04"     # Nico "Cuarenta y dos mil. ¿Ya?"
tal   ${J2:-12-javi-c}    j2                                  # Javi "¿Y Súper Héctor?"
tal   ${N4:-13-nico-c}    n4                                  # Nico "…Es de Javi."
hueco ${R6:-14-ruben-c}   r6 1.09 1.34 0.38 "atempo=1.03"     # Rubén "Felicitaciones. Ahora la cuenta da."
tal   ${R7:-15-ruben-h}   r7 "atempo=1.2"                                 # Rubén "Te toca menos."
hueco ${N5:-16-nico-a}    n5 0.69 0.80 0.2                    # Nico "Ya sé. Me llegó."
hueco ${R8:-17-ruben-e}   r8 1.12 1.19 0.0 "atempo=1.23"                    # Rubén "Comentá COMISIONES y te mando cómo funciona para tu distribuidora."
node ../../herramientas/tiempos.mjs assets/voice/r8.wav partes/17-ruben.txt assets/voice/palabras-r8.json 2>&1 | grep -i "oyó"
for k in r1:02-ruben n2:04-nico r3:06-ruben g1:07-graciela r4:08-ruben n3:11-nico r6:14-ruben r7:15-ruben n5:16-nico; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
