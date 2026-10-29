#!/bin/bash
# Sonidos propios del reel (correr desde reels/el-truco):
# - assets/bgm/boliche.mp3: bed.mp3 en loop hasta 74 s con fundido final, más un murmullo grave
#   de boliche (ruido marrón filtrado, muy bajo).
# - assets/sfx/naipe.mp3: carta golpeada contra el paño (ráfaga corta de ruido filtrado).
# - assets/sfx/tiza.mp3: palito de tiza en la pizarra (ruido agudo raspado).
ffmpeg -hide_banner -loglevel error -y -stream_loop 1 -i assets/bgm/bed.mp3 \
  -f lavfi -t 74 -i "anoisesrc=color=brown:amplitude=0.5:seed=7" \
  -filter_complex "[0:a]atrim=0:74,afade=t=out:st=70:d=4[b];[1:a]lowpass=f=420,highpass=f=90,volume=0.22,tremolo=f=0.6:d=0.5,afade=t=in:d=1,afade=t=out:st=70:d=4[m];[b][m]amix=inputs=2:normalize=0[o]" \
  -map "[o]" -ac 2 -ar 48000 -b:a 160k assets/bgm/boliche.mp3
ffmpeg -hide_banner -loglevel error -y -f lavfi -t 0.14 -i "anoisesrc=color=pink:amplitude=1:seed=3" \
  -af "highpass=f=700,lowpass=f=5200,afade=t=out:st=0.004:d=0.13:curve=exp,volume=7" -ar 48000 -ac 2 -b:a 160k assets/sfx/naipe.mp3
ffmpeg -hide_banner -loglevel error -y -f lavfi -t 0.32 -i "anoisesrc=color=white:amplitude=0.8:seed=11" \
  -af "bandpass=f=3800:width_type=h:w=2600,tremolo=f=38:d=0.8,afade=t=in:d=0.02,afade=t=out:st=0.2:d=0.12,volume=1.4" -ar 48000 -ac 2 -b:a 160k assets/sfx/tiza.mp3
