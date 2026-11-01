#!/bin/bash
# Segunda toma del conductor (más ágil). Correr desde reels/avistamiento.
V=../../herramientas/voz.mjs
CON="Sos el conductor de un programa uruguayo de misterios de la tele de madrugada, en clave de comedia: voz grave, misteriosa y teatral, con suspenso. Ritmo ágil y fluido: no hagas pausas largas, encadená las frases."
gen() {
  [ -s partes/r$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8 9 10; do
    node $V partes/$1.txt partes/r$1.wav --voz Algenib --tono "$CON $2" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
gen 01 "Arrancás con un gancho misterioso; 'La ciencia no lo puede explicar' en susurro."
gen 02 "Presentás el programa con solemnidad y a la testigo con misterio."
gen 06 "Con suspenso creciente, como quien revela otro caso inexplicable."
gen 08 "Solemne y en susurro misterioso, frase célebre."
