#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/rec/ (recortadas a -45 dB por medir-tomas.sh)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
tal() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
ALT="highpass=f=200,lowpass=f=5000,acompressor=threshold=-22dB:ratio=2.5:attack=5:release=80"   # los audios de WhatsApp (altavoz del celular, suave)
tal   ${M1:-01-marcelo-c}  m1 "$ALT"                                   # Marcelo (Enceladus, audio) "Adri, ¿cuándo vence lo mío?" (se reusa en Q1)
tal   ${A1:-02-adriana-c}  a1                                          # Adriana (Autonoe) "El veintitrés, Marcelo."
tal   ${G1:-03-graciela-c} g1 "atempo=1.05,$ALT"                       # Graciela (Gacrux, audio) "Adri, ¿cuánto pago este mes?"
tal   ${W1:-04-walter-c}   w1 "$ALT"                                   # Walter (Umbriel, audio) "¿Te llegó lo que te mandé?"
tal   ${M2:-05-marcelo-a}  m2 "$ALT"                                   # Marcelo (audio) "¿Era el veintitrés?"
hueco ${J1:-06-jorge-b}    j1 0.53 0.74 0.14                           # Jorge (Zubenelgenubi) "Adri, ¿cuándo comemos?" (se reusa en Q4)
tal   ${A2:-07-adriana-a}  a2                                          # Adriana "El veintitrés." (el automático)
hueco ${J2:-08-jorge-a}    j2 0.9 1.4 0.3                          # Jorge "Es Marcelo. Que cuándo vence lo suyo." (pausa ≥ 0,3 s)
ffmpeg -loglevel error -y -i ../inmobiliaria-disponible/assets/voice/narrador.wav -ar 48000 -ac 1 assets/voice/narrador.wav   # Rasalgethi "Un agente de IA más tarde." (reusado)
hueco ${M3:-10-marcelo-e}  m3 0.95 1.10 0.12             # Marcelo "¡Uh, qué rápida! Gracias, Adri."
tal   ${A3:-11-adriana-b}  a3                                          # Adriana "De nada."
hueco ${L1:-12-lucas-b}    l1 0.43 1.15 0.2                                        # Lucas (Sadaltager) "¿Ya? ¿El de Héctor?"
tal   ${A4:-13-adriana-c}  a4                                          # Adriana "Y el de Walter."
tal   ${A5:-14-adriana-b}  a5                                          # Adriana "Ahora."
ffmpeg -loglevel error -y -i partes/rec/${J3:-15-jorge-e}.wav -af "atrim=start=0.22,asetpts=PTS-STARTPTS" -ar 48000 -ac 1 partes/tmp/j3-base.wav; corta partes/tmp/j3-base.wav assets/voice/j3.wav 1.14 1.70 0.28 "atempo=1.12"              # Jorge "Es Marcelo. Que sos un amor, que le contestaste al toque."
hueco ${A6:-16-adriana-a}  a6 0.56 0.98 0.28                           # Adriana "Sí. Un amor." (pausa ≥ 0,25 después de "Sí.")
tal   ${A7:-17-adriana-c}  a7 "atempo=1.08"                                        # Adriana "Comentá CONSULTAS y te mando cómo funciona para tu estudio."
node ../../herramientas/tiempos.mjs assets/voice/a7.wav partes/17-adriana.txt assets/voice/palabras-a7.json 2>&1 | grep -i "oyó"
for k in j1:06-jorge j2:08-jorge m3:10-marcelo j3:15-jorge a6:16-adriana; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
