#!/bin/bash
# Voces sueltas del público de estudio (risa, ternura y "uuuh") para mezclar en la cortina.
cd "$(dirname "$0")"
V=../../../../herramientas/voz.mjs
J="Sos una persona del público de estudio de una comedia de la tele. Hacé solo el sonido escrito: una carcajada fuerte y contagiosa, sin decir palabras."
A="Sos una persona del público de estudio de una comedia de la tele. Hacé solo el sonido escrito, largo y tierno, como cuando pasa algo dulce en la serie, sin decir palabras."
U="Sos una persona del público de estudio de una comedia de la tele. Hacé solo el sonido escrito, largo, burlón y picante, como cuando a alguien le tiran un desafío, sin decir palabras."
for v in Puck Leda Charon Kore Achird Zephyr; do
  [ -s ja-$v.wav ] || node $V ja.txt ja-$v.wav --voz $v --tono "$J" >/dev/null 2>&1 &
  [ -s aw-$v.wav ] || node $V aw.txt aw-$v.wav --voz $v --tono "$A" >/dev/null 2>&1 &
  [ -s uh-$v.wav ] || node $V uh.txt uh-$v.wav --voz $v --tono "$U" >/dev/null 2>&1 &
done
wait
ls
