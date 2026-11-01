#!/bin/bash
# partes/NN.wav (o NN-a.wav + NN-b.wav para el coro) -> partes/NN-c.wav, con silencios de las
# puntas recortados. El coro: la voz b se estira a la duración de la a y se mezclan (amix), con un
# eco corto para que suene a varios. Correr desde reels/la-murga: partes/limpiar.sh 02
n=$1
REC="silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
if [ -f partes/$n-a.wav ]; then
  ffmpeg -hide_banner -loglevel error -y -i partes/$n-a.wav -af "$REC" -ar 48000 -ac 1 partes/$n-a-c.wav
  ffmpeg -hide_banner -loglevel error -y -i partes/$n-b.wav -af "$REC" -ar 48000 -ac 1 partes/$n-b-c.wav
  k=$(python3 -c "print(max(0.5,min(2.0,$(dur partes/$n-b-c.wav)/$(dur partes/$n-a-c.wav))))")
  ffmpeg -hide_banner -loglevel error -y -i partes/$n-a-c.wav -i partes/$n-b-c.wav -filter_complex \
    "[1:a]atempo=$k[b];[0:a][b]amix=inputs=2:duration=longest:weights=1 0.85:normalize=0,aecho=0.8:0.6:35|60:0.3|0.22[o]" \
    -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le partes/$n-c.wav
else
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "$REC" -ar 48000 -ac 1 -c:a pcm_s16le partes/$n-c.wav
fi
echo "$n $(dur partes/$n-c.wav)"
