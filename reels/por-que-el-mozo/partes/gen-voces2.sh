#!/bin/sh
# ronda 1: regenera solo las dos frases que cambiaron ("la despeja", "va al sistema"), de a una por la cuota
V=../../herramientas/voz.mjs
TA="narrador uruguayo de explicador curioso, ágil y cálido, cuenta una anécdota con picardía; mismo tono que el resto del reel, ritmo parejo"
una() { for k in 1 2 3 4 5 6; do [ -f "$2" ] && return; node $V "$1" "$2" --voz Orus --tono "$TA" && return; sleep 35; done; }
una partes/orus-c.txt partes/orus-c1.wav
una partes/orus-d.txt partes/orus-d1.wav
una partes/orus-c.txt partes/orus-c2.wav
una partes/orus-d.txt partes/orus-d2.wav
echo LISTO
