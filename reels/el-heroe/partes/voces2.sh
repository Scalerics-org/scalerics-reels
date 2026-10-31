#!/bin/bash
# Segunda toma, más ágil, del narrador y de la frase 04 del villano (la primera quedó lenta: partes/v1).
V=../../herramientas/voz.mjs
gen() { for i in $(seq 1 30); do node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.err && return; sleep $((20 + (RANDOM % 25))); done; echo "FALLÓ $1"; }
NAR="Sos el narrador de un tráiler de película de superhéroes de cómic: voz grave, enorme y dramática, pero con ritmo ágil de tráiler, encadenando las frases sin pausas largas, con un guiño de humor."
VIL="Sos El Visto, un supervillano de cómic que deja a los clientes en visto: voz grave y malvada, burlona, disfrutando cada palabra, a ritmo ágil."
gen 01 Enceladus "$NAR Arrancá con un golpe seco y amenazante y remata 'El Visto' bien grande, sin demorarte."
gen 05 Enceladus "$NAR '¡Zas!' gritado como onomatopeya de cómic, y enseguida, rápido, lo demás con pena por el dueño."
gen 07 Enceladus "$NAR Solemne, como citando una gran frase, con ironía en 'bandeja de entrada'. Sin pausas largas."
gen 08 Enceladus "$NAR Con misterio, creciendo hacia 'se prendió solo'. Sin pausas largas."
gen 13 Enceladus "$NAR Épico, como la frase final de un tráiler, de corrido."
gen 04 Algenib "$VIL 'Visto' seco; se burla imitando 'te contesto el lunes'; remata 'un pulgar' con una risita. De corrido."
