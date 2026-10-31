#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/cambio-extremo.  10 (¡Mové ese camión!) es un coro: 10a conductora + 10b capataz, mezclados en componer.mjs.
V=../../herramientas/voz.mjs
gen() { # n voz tono [txt]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/${4:-$1}.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos la conductora de un reality de televisión de reformas y cambios extremos, de Montevideo: EUFÓRICA, sonriente, teatral, con la energía de un programa de la tarde, alargando las vocales cuando se emociona."
MON="Sos Mónica, dueña de una tienda de regalos de barrio en Montevideo, de unos 55 años, dulce, ilusionada y muy emotiva, con voz cálida."
CAP="Sos el capataz de obra de un programa de reformas de la tele, uruguayo, de unos 45 años, con casco: voz grave y ronca, seco y canchero, dando un diagnóstico como si fuera un problema estructural gravísimo."
gen 01 Zephyr "$CON Arrancás el programa mirando a cámara, provocadora, como quien le dice la verdad en la cara al que mira."
gen 02 Zephyr "$CON Presentás el programa a todo volumen, con aplausos."
gen 03 Gacrux "$MON Emocionadísima, aplaudiendo, con ilusión inocente."
gen 04 Zephyr "$CON Ahora más seria, misteriosa, con suspenso."
gen 05 Alnilam "$CAP Hablás RÁPIDO, de corrido, como leyendo un informe de daños, con fastidio y sin pausas largas."
gen 06 Zephyr "$CON Preocupada, con suspenso."
gen 07 Alnilam "$CAP Con una pausa dramática y un remate seco y triste."
gen 08 Gacrux "$MON Un poco avergonzada, tímida, tratando de defenderse."
gen 09 Zephyr "$CON Tierna al principio, después revelando un secreto con picardía, y al final a los gritos, eufórica, preparando la gran revelación."
gen 10a Zephyr "$CON Gritás con todas tus fuerzas, como un coro de estadio, la frase más famosa del programa." 10
gen 10b Alnilam "$CAP Gritás con todas tus fuerzas, como un coro de obreros en una obra." 10
gen 11 Gacrux "$MON LLORANDO de emoción, sollozando, con la voz quebrada, tapándose la boca, sin poder creerlo."
gen 12 Zephyr "$CON Presentando las novedades MUY rápido, de corrido, como un vendedor emocionado de la tele."
gen 13 Gacrux "$MON Entre lágrimas de felicidad y risa, cada vez más eufórica, gritando de alegría, incrédula."
gen 14 Alnilam "$CAP Seco y canchero, como un chiste al pasar."
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de un reality de televisión: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a etiquetar a alguien."
