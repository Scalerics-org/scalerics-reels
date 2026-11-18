#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver partes/voces.md)
cd "$(dirname "$0")/.."
mkdir -p assets/voice partes/tmp
TEL="highpass=f=300,lowpass=f=3400"      # teléfono suave (Graciela y Walter, que no están en cuadro)
TEL2="highpass=f=200,lowpass=f=4200"     # teléfono leve (Daniel en la pantalla partida, que sí está en cuadro)
ABAJO="lowpass=f=6000"                   # Óscar abajo del auto: un poco apagado
# corta <entrada> <salida> <a> <b> <silencio> [filtro]: corta el silencio interno [a, b] y deja <silencio> s
corta() { ffmpeg -loglevel error -y -i $1 -filter_complex "[0]atrim=0:$3,afade=t=out:st=$(printf "%.3f" $(echo "$3-0.03" | bc)):d=0.03,asetpts=PTS-STARTPTS[a];[0]atrim=$4,afade=t=in:st=0:d=0.02,asetpts=PTS-STARTPTS[b];anullsrc=r=48000:cl=mono,atrim=0:$5[s];[a][s][b]concat=n=3:v=0:a=1,${6:-anull}" -ar 48000 -ac 1 $2; }
hueco() { corta partes/rec/$1.wav assets/voice/$2.wav $3 $4 $5 "$6"; }
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
hueco ${G1:-01-graciela-a} g1 0.6 0.73 0.08 "atempo=1.1,$TEL"            # Graciela (Gacrux, por teléfono) "Óscar, ¿está pronto?"
v ${O1:-02-oscar-d} o1                                                       # Óscar (Charon) "A la tarde."
v ${W1:-03-walter-c} w1 "atempo=1.04,$TEL"                                   # Walter (Umbriel, por teléfono) "¿Está pronto?"
v ${O2:-04-oscar-c} o2                                                       # Óscar "A la tarde." (cansado)
hueco ${M1:-05-maxi-a} m1 1.42 1.55 0.09 "atempo=1.12"                       # Maxi (Puck) "Jefe, el de Daniel: pierde la bomba de agua." (se reusa en Q3)
v ${O3:-06-oscar-a} o3                                                       # Óscar "¡Daniel!"
hueco ${D1:-07-daniel-c} d1 0.44 0.80 0.1 "$TEL2"                              # Daniel (Schedar, en el ómnibus) "Óscar, ¿está pronto?"
v ${O4:-08-oscar-c} o4                                                       # Óscar "Está pronto para empezar." (EL remate)
v ${NAR:-09-narrador-a} narrador "atempo=1.1"                                # Rasalgethi "Un aviso automático más tarde."
v ${G2:-10-graciela-b} g2 "atempo=1.12"                                      # Graciela "¡Ay, mi autito! Ya lo están mirando."
v ${O5:-11-oscar-b} o5 "$ABAJO"                                              # Óscar (abajo del auto) "Mandale la foto."
v ${D2:-12-daniel-f} d2                                                      # Daniel "Dale, cambiala."
hueco ${O6:-13-oscar-b} o6 0.57 0.82 0.12 "atempo=1.05,$ABAJO"               # Óscar (abajo del auto) "Maxi, ¿está pronto el mate?"
v ${M2:-14-maxi-a} m2                                                        # Maxi "A la tarde." (canchero)
hueco ${O7:-15-oscar-a} o7 0.92 1.13 0.12 "atempo=1.04"                      # Óscar a cámara "Comentá PRONTO y te mando cómo funciona para tu taller."
node ../../herramientas/tiempos.mjs assets/voice/o7.wav partes/15-oscar.txt assets/voice/palabras-o7.json 2>&1 | grep -i "oyó"
for k in g1:01-graciela o1:02-oscar w1:03-walter m1:05-maxi d1:07-daniel o4:08-oscar g2:10-graciela d2:12-daniel o6:13-oscar; do f=${k%%:*}; t=${k##*:}; echo "$f $(node ../../herramientas/tiempos.mjs assets/voice/$f.wav partes/$t.txt partes/tmp/pal-$f.json 2>&1 | grep -i "oyó")"; done
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
