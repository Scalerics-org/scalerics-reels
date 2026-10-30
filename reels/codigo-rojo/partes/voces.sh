#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/codigo-rojo; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
PAR="Sos un paramédico uruguayo que entra corriendo a la guardia de un hospital empujando una camilla: urgente, agitado, gritando, exagerado como en una serie de médicos, pero gracioso."
DOC="Sos la doctora jefa de guardia de un hospital de Montevideo, en una serie de médicos: segura, rápida, seca, con autoridad, un poco irónica y con humor seco."
DUE="Sos un comerciante montevideano de unos cincuenta años, acostado en una camilla de hospital, desesperado y quejoso, defendiéndose a los gritos como si lo acusaran injustamente."
gen 01 Fenrir "$PAR"
gen 02 Kore "$DOC Lo dice cortante, sin levantar la vista."
gen 03 Fenrir "$PAR Lee la lista de síntomas rápido, como un parte médico, cada síntoma más grave que el anterior, y remata con indignación lo del jueves."
gen 04 Kore "$DOC Lo dice grave, con suspenso, como un diagnóstico serio."
gen 05 Charon "$DUE"
gen 06 Kore "$DOC Da la orden fuerte y urgente, grita despejen."
gen 07 Fenrir "$PAR Desesperado y con bronca, como si fuera una catástrofe."
gen 08 Kore "$DOC Lo dice con ironía, mirando al paciente de reojo."
gen 09 Kore "$DOC Primero sorprendida al ver la radiografía, después pensativa, y remata el diagnóstico con calma y empatía."
gen 10 Kore "$DOC Receta con seguridad y entusiasmo, clara y rápida, como quien encontró la cura."
gen 11 Fenrir "$PAR Aliviado y eufórico, celebrando."
gen 12 Kore "$DOC Satisfecha, con una sonrisa, cerrando el caso."
gen 13 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás invitando a compartir el video, con humor."
