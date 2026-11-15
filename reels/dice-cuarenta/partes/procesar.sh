#!/bin/bash
# arma las voces finales de assets/voice/ desde las tomas recortadas de partes/rec/ (ver voces.md)
cd "$(dirname "$0")/.."
ECO="aecho=0.85:0.6:45|80:0.16|0.08"    # reverb corta de galpón: Rubén habla desde la oficina hacia el depósito
v() { ffmpeg -loglevel error -y -i partes/rec/$1.wav -af "${3:-anull}" -ar 48000 -ac 1 assets/voice/$2.wav; }
v 01-ruben-b r1 "$ECO"          # "El Excel dice cuarenta."
v 02-nico-b  n1                  # "¡Vendido!" (Graciela)
v 03-nico-b  n2 "atempo=1.05"    # "¡Vendido!" (Marta)
v 04-nico-c  n3 "atempo=1.1"     # "¡Vendido!" (Walter, cantadito)
v 05-nico-a  n4                  # "Pero el Excel dice cuarenta."
v 06-ruben-c r2                  # "El Excel nunca bajó al depósito."
v 07-nico-e  n5                  # "Tranqui, ya lo actualicé."
v 08-ruben-c r3                  # "Bárbaro. Ahora miente actualizado." (pausa de 0,39 s después de "Bárbaro.")
v 10-nico-b  n6                  # "Rubén, ¿hay aceite?"
v 11-ruben-c r4 "$ECO"           # "Fijate vos."
v 02-nico-b  n7                  # "¡Vendido!" (parte 2: la MISMA toma que la primera, callback)
v 13-nico-c  n8                  # "¿Y? ¿Cuántos hay?"
v 14-ruben-c r5                  # "Los que dice."
cp ../ya-lo-cargo/assets/voice/narrador.wav assets/voice/narrador.wav   # "Un sistema más tarde." (Rasalgethi)
for f in assets/voice/*.wav; do printf "%s %s\n" $(basename $f .wav) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
