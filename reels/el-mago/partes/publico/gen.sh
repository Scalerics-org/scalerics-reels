#!/bin/bash
# Voces sueltas del público (abucheo "uuuh" y asombro "oooh") para mezclar en la cortina.
cd "$(dirname "$0")"
V=../../../../herramientas/voz.mjs
T="Sos una persona del público de un show de magia de la tele. Hacé solo el sonido escrito, largo, como abucheo burlón de la tribuna, sin decir palabras."
O="Sos una persona del público de un show de magia de la tele. Hacé solo el sonido escrito, largo, de asombro maravillado, sin decir palabras."
for v in Puck Leda Fenrir Kore Charon Aoede; do
  [ -s uh-$v.wav ] || node $V uh.txt uh-$v.wav --voz $v --tono "$T" >/dev/null 2>&1 &
  [ -s oh-$v.wav ] || node $V oh.txt oh-$v.wav --voz $v --tono "$O" >/dev/null 2>&1 &
done
wait
ls
