#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
CHAT="highpass=f=260,lowpass=f=3800,acompressor=threshold=-24dB:ratio=4:attack=5:release=80:makeup=3"   # audio de chat (sale del celular)
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-graciela-c g1 "atempo=1.5,$CHAT"      # (ronda 1: a 2x no se entendía) "Y nada, Rubén, así que mandame lo de siempre. ¡Besos!" (el audio a 2x)
v 02-ruben-b    r1 "atempo=1.08"            # "Cuatro minutos para decir lo de siempre."
v 03-ruben-a    r2 "atempo=1.08"            # "¿Eso es un siete o una mosca?"
v 04-walter-b   w1 "atempo=1.06,$CHAT"      # "Dejá, Rubén. Lo de siempre se lo pedí a otro." (audio de chat)
v 05-ruben-d    r3                          # "Lo de siempre era yo."
v 06-narrador-c nar "adeclip,atempo=1.12"   # (ronda 1: la d tenía muestras recortadas) "Un catálogo de pedidos más tarde." (Rasalgethi, cabe en el cartel de 2,4 s)
v 07-graciela-b g2                          # "Lo de siempre."
v 08-ruben-c    r4                          # "Siete. Sin mosca." (toma nueva de la ronda 1: "sin" con la misma fuerza; 0,33 s de pausa)
v 09-ruben-b    r5 "atempo=1.08"            # "Ocho y cinco. ¿Y ahora qué hago hasta las once?"
v 10-nico-a     n1                          # "¿Vender?"
v 11-ruben-d    r6 "atempo=1.155"          # "Comentá PEDIDOS y te mando cómo funciona para tu distribuidora." (la d: el STT oye "comentá")
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
