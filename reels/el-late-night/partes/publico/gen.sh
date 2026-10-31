#!/bin/bash
# Voces sueltas del público (risa, asombro y festejo) para mezclar en la cortina.
cd "$(dirname "$0")"
V=../../../../herramientas/voz.mjs
J="Sos una persona del público de un programa de entrevistas de la tele a la medianoche. Hacé solo el sonido escrito: una carcajada fuerte y contagiosa, sin decir palabras."
O="Sos una persona del público de un programa de la tele. Hacé solo el sonido escrito, largo, de asombro, como cuando alguien dice algo picante, sin decir palabras."
W="Sos una persona del público de un programa de la tele. Hacé solo el sonido escrito, un festejo eufórico, sin decir palabras."
for v in Puck Leda Charon Kore Achird Zephyr; do
  [ -s ja-$v.wav ] || node $V ja.txt ja-$v.wav --voz $v --tono "$J" >/dev/null 2>&1 &
  [ -s oh-$v.wav ] || node $V oh.txt oh-$v.wav --voz $v --tono "$O" >/dev/null 2>&1 &
  [ -s wu-$v.wav ] || node $V wu.txt wu-$v.wav --voz $v --tono "$W" >/dev/null 2>&1 &
done
wait
ls
