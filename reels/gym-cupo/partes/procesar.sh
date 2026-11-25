#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas de partes/tomas/ (recorte a -38 dB en partes/tmp/r-*.wav)
cd "$(dirname "$0")/.."
TEL="highpass=f=300,lowpass=f=3400,acompressor=threshold=-24dB:ratio=3:attack=5:release=80,volume=-2dB"   # audio de WhatsApp
MIC="highpass=f=120,aecho=0.8:0.6:40:0.15"                                                              # micrófono de vincha a la sala
rec() { ffmpeg -loglevel error -y -i partes/tomas/$1.wav -af "silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-38dB:start_silence=0.04,areverse" -ar 48000 -ac 1 partes/tmp/r-$1.wav; }
v() { rec $1; ffmpeg -loglevel error -y -i partes/tmp/r-$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-mauro-e    m1                              # Mauro (Sadaltager) "Veintidós «yo voy». Hoy explota."
v 02-majo-b     j1 "$TEL"                       # Majo (Zephyr), audio: "Mauro, ¿hay lugar a las siete?"
v 03-mauro-f    m2                              # Mauro "Llena, Majo. Perdoná."
v 04-mauro-a    m3 "aselect='not(between(t,0.64,0.88))',asetpts=N/SR/TB,$MIC"   # Mauro por el micrófono: "Los «yo voy» no pedalean." (r1: la pausa interna 0,6 → 0,35 s)
v 05-narrador-b narrador "atempo=1.07"          # Rasalgethi "Un sistema de reservas más tarde."
v 06-majo-c     j2                              # Majo "¿Quedan tres? ¡La siete!"
v 07-mauro-a    m4 "atempo=1.08,$MIC"           # Mauro por el micrófono: "Catorce reservas. Pedalean catorce."
v 08-graciela-f g1 "atempo=1.06"                # Graciela (Gacrux) "Profe, ¿y ahora la toalla dónde la cuelgo?"
v 09-mauro-f    m5 "$MIC"                       # Mauro por el micrófono: "En el cuello, Graciela."
v 10-mauro-c    m6 "atempo=1.1"                              # Mauro a cámara: "Comentá CUPO y te mando cómo funciona para tu gimnasio."
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
