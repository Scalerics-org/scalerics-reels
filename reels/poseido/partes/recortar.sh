#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios de las puntas recortados.
# Al poseído (04 08 10) además se le baja el tono (sin cambiar la duración, así sirven los tiempos
# que se sacan de la versión limpia NN-p.wav) y se le pone un eco de cueva.
for f in partes/??.wav; do
  n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-32dB:stop_silence=0.25" -ar 48000 -ac 1 partes/$n-p.wav
  # 05: se corta después de "Esto es peor." (la pregunta de la planilla se sacó por duración)
  [ $n = 05 ] && ffmpeg -hide_banner -loglevel error -y -i partes/05-p.wav -af "atrim=end=4.32,afade=t=out:st=4.24:d=0.08" partes/05-t.wav && mv partes/05-t.wav partes/05-p.wav
  # 08: se corta después de "el stock" (por duración)
  [ $n = 08 ] && ffmpeg -hide_banner -loglevel error -y -i partes/08-p.wav -af "atrim=end=10.95,afade=t=out:st=10.85:d=0.1" partes/08-t.wav && mv partes/08-t.wav partes/08-p.wav
  case $n in
    04|08|10) ffmpeg -hide_banner -loglevel error -y -i partes/$n-p.wav -af "asetrate=48000*0.86,aresample=48000,atempo=1.16279,aecho=0.8:0.6:70|140:0.25|0.12" -ar 48000 -ac 1 partes/$n-c.wav ;;
    *) cp partes/$n-p.wav partes/$n-c.wav ;;
  esac
done
