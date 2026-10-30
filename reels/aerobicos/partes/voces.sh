#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/aerobicos.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
INS="Sos una instructora de aeróbicos de un video casete de gimnasia de los años ochenta, de Montevideo: HIPERENERGÉTICA, sonriente, a los gritos y con el ritmo de la música, aplaudiendo, contando las repeticiones con mucho entusiasmo, como un show de televisión de la mañana."
DUE="Sos un comerciante uruguayo de unos 50 años, agotado, haciendo gimnasia a la fuerza a la noche: hablás JADEANDO, sin aire, con pausas para respirar, quejoso y gracioso."
gen 01 Laomedeia "$INS Arrancás la clase despertando al alumno a los gritos, con una sonrisa enorme."
gen 02 Laomedeia "$INS"
gen 03 Enceladus "$DUE"
gen 04 Laomedeia "$INS Contestás sin dejar de sonreír, como si fuera obvio."
gen 05 Enceladus "$DUE Confundido y sin aire."
gen 06 Laomedeia "$INS"
gen 07 Laomedeia "$INS Más lento en la elongación, después otra vez a los gritos para felicitar."
gen 08 Enceladus "Sos un comerciante uruguayo de unos 50 años tirado en el piso de un gimnasio, agotado y jadeando, que de golpe tiene una idea brillante: primero sin aire, después la pregunta con picardía."
gen 09 Laomedeia "Sos una instructora de aeróbicos de los años ochenta que se queda descolocada: la sonrisa se le congela, contesta despacio, confundida y un poco ofendida, como si le hubieran desenchufado la música."
gen 10 Orus "Sos el narrador de Scalerics que entra al final de una clase de gimnasia: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a compartir."
