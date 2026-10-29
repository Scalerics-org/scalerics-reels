#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios del principio y del final fuera, los del medio a ~0.2 s
# (umbral -32 dB). El 07 ("Visto. Visto.") y el 11-12 (jefe y game over) conservan sus pausas.
# El 10 se corta aparte: se le sacó "¡Cuidado!" (de 1.10 a 2.25 s del recortado).
# Correr desde reels/game-over.
corta() { # n umbral silencio
  ffmpeg -hide_banner -loglevel error -y -i partes/$1.wav -af "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=$2:stop_duration=$(printf "%.2f" $(echo "$3+0.05" | bc)):stop_silence=$3,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$1-c.wav
}
for n in 01 02 03 04 05 06 08 09 13 14 15 16; do corta $n -32dB 0.2; done
corta 07 -36dB 0.3; corta 11 -42dB 0.35; corta 12 -36dB 0.25
corta 10 -36dB 0.2 && mv partes/10-c.wav partes/10-cc.wav
ffmpeg -hide_banner -loglevel error -y -i partes/10-cc.wav -af "aselect='lt(t,1.10)+gte(t,2.25)',asetpts=N/SR/TB" partes/10-c.wav && rm partes/10-cc.wav
