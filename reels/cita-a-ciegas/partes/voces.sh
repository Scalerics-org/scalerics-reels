#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/cita-a-ciegas.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos la conductora de un reality de citas a ciegas de la televisión uruguaya: enérgica, chusma, teatral, con sonrisa de presentadora y mucho drama, como quien anuncia un chisme jugoso al público del estudio."
CLI="Sos una mujer joven uruguaya de unos 28 años hablándole a cámara en el confesionario de un reality de citas, después de una cita que salió mal: indignada, irónica y graciosa, contando el chisme con los ojos en blanco. Cuando citás lo que te dijo él, lo imitás con voz seca y aburrida."
LOC="Sos el dueño de un comercio de barrio uruguayo, un hombre de unos 55 años, cansado y buenazo, hablando a cámara en el confesionario de un reality de citas. No tenés idea de que la cita salió mal: tranquilo, ingenuo, satisfecho."
gen 01 Kore "$CON Arrancás el programa con la frase bomba, y en 'fue un desastre' bajás la voz con dramatismo; después, 'vamos al confesionario', con picardía."
gen 02 Leda "$CLI"
gen 03 Kore "$CON Preguntás con picardía, cómplice con el público."
gen 04 Charon "$LOC"
gen 05 Kore "$CON 'Química: cero' lo decís seco, como un veredicto. Después, con suspenso y chisme: ella tuvo una segunda cita con otro."
gen 06 Leda "Sos una mujer joven uruguaya de unos 28 años en el confesionario de un reality de citas, contando una cita que salió perfecta: enamorada, soñadora, encantada, suspirando. 'Yo en pijama' lo decís riéndote, pícara."
gen 07 Kore "$CON Festejás a los gritos, eufórica, y después preguntás con suspenso, bajando la voz."
gen 08 Leda "Sos una mujer joven uruguaya de unos 28 años en el confesionario de un reality de citas. Ahora te ponés nostálgica y un poco triste, despacio, suspirando: extrañás al primero. La última frase con dolor sincero."
gen 09 Charon "Sos el dueño de un comercio de barrio uruguayo, un hombre de unos 55 años, que acaba de escuchar algo que no esperaba. Despacio, sorprendido, conmovido, casi con un nudo en la garganta."
gen 10 Orus "Sos el narrador de Scalerics que entra al final de un reality de citas: cálido, seguro, cercano, con una sonrisa, como quien da un buen consejo de amor."
gen 11 Kore "$CON Cerrás el programa mirando a cámara, pícara, invitando al público de casa a opinar."
