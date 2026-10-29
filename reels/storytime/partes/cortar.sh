#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: recorta silencios de punta y acorta los internos largos.
for f in partes/[0-9][0-9].wav; do n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-36dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=-36dB:stop_duration=0.3:stop_silence=0.2,areverse,silenceremove=start_periods=1:start_threshold=-36dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$n-c.wav
done
# recortes para que entre en ~70 s: sin "El chat: amiga, volvete." (queda escrito en el chat) y
# sin "Lo mejor del barrio, y en el celular parece cerrado." (queda escrito en s10)
ffmpeg -hide_banner -loglevel error -y -i partes/04-c.wav -t 7.5 -af "afade=t=out:st=7.38:d=0.12" partes/04-x.wav && mv partes/04-x.wav partes/04-c.wav
ffmpeg -hide_banner -loglevel error -y -i partes/09-c.wav -t 2.75 -af "afade=t=out:st=2.63:d=0.12" partes/09-x.wav && mv partes/09-x.wav partes/09-c.wav
