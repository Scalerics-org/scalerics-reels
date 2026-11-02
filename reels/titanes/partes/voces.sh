#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/titanes.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
PRE="Sos el presentador de una velada de lucha libre de la televisión de los años setenta, en un estudio con público: exaltado, teatral, a los gritos, estirando las vocales de los nombres de los luchadores, como un animador de catch que vende cada golpe como el fin del mundo. Con humor."
RIV="Sos un luchador enmascarado villano de catch de la tele vieja: voz grave, lenta, amenazante y burlona, disfrutando de torturar al dueño del local. Teatral y gracioso, no da miedo de verdad."
DUE="Sos el dueño de un comercio de Montevideo de unos 50 años, agotado después de un día largo, con el delantal puesto, hablando con resignación graciosa."
gen 01 Fenrir "$PRE Arrancás a los gritos acusando al que mira, como anunciando una tragedia: la primera frase indignado, la segunda casi riéndote."
gen 02 Fenrir "$PRE La presentación estirada y épica, con una pausa dramática en los puntos suspensivos y 'el dueño del local' a todo pulmón."
gen 03 Charon "$DUE Lo decís cansado, medio fastidiado, como pidiendo un minuto."
gen 04 Fenrir "$PRE Anunciando el primer round con todo; 'La Planilla' estirado como el nombre de un luchador temible."
gen 05 Algenib "$RIV Cada frase lenta y pesada, saboreando la tortura."
gen 06 Fenrir "$PRE Rápido y exaltado; 'El Copia-Pega' como un nombre de luchador."
gen 07 Algenib "$RIV Monótono e hipnótico, como un golpe que se repite, cada palabra igual."
gen 08 Fenrir "$PRE Rápido y exaltado; 'El Recordatorio' estirado y épico."
gen 09 Algenib "$RIV Como quien recita una lista de cobranzas, lento y burlón, con una risita al final."
gen 10 Fenrir "$PRE Anunciando el golpe final con dramatismo enorme, cada palabra del nombre separada."
gen 11 Charon "$DUE Repetís la frase como un robot agotado, cada vez más cansado, y la última se apaga a medio decir."
gen 12 Fenrir "$PRE 'A la lona' gritado de dolor; después contás uno, dos, tres como el árbitro, golpeando cada número."
gen 13 Fenrir "$PRE Primero frenás todo, sorprendido; después cada vez más entusiasmado, y 'a su compañero' con una pausa de suspenso antes."
gen 14 Orus "Sos el narrador de Scalerics que entra al ring como el compañero de equipo: cálido, claro y seguro, rápido, como un amigo que trae la solución; 'Solo.' al final con una sonrisa."
gen 15 Fenrir "$PRE Anunciando al ganador con todo, la pausa larga antes de 'el dueño', y lo último riéndote."
gen 16 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, invitando a contar en los comentarios."
