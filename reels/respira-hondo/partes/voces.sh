#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/respira-hondo.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GUIA="Sos la guía de una app de meditación, una mujer uruguaya de unos 35 años: voz muy suave, lenta, susurrada, cálida y aterciopelada, como una meditación guiada para dormir, con pausas tranquilas."
DUE="Sos el dueño de un comercio de barrio de Montevideo, de unos 50 años, agotado a las once de la noche, frente a la computadora: voz cansada, ronca, apurada y nerviosa, hablando rápido, medio desesperado."
gen 01 Aoede "$GUIA Lo decís despacio, en susurro, pero con un remate pícaro e inquietante al final." &
gen 02 Aoede "$GUIA Le das la bienvenida, muy calma, como al inicio de una sesión." &
gen 03 Charon "$DUE Interrumpís de golpe, apurado, con fastidio, acordándote de algo urgente." &
gen 04 Aoede "$GUIA Seguís con paciencia, describiendo el mar con voz de ola, lento." &
gen 05 Charon "$DUE Interrumpís otra vez, con un sobresalto, preocupado, rápido." &
gen 06 Aoede "$GUIA Un poco más firme, todavía suave, conteniendo la paciencia." &
gen 07 Charon "$DUE Asqueado al primer sorbo; después, como un robot, monótono, repitiendo mecánicamente mientras trabaja." &
gen 08 Aoede "$GUIA Invitás a repetir, y decís un om corto y sereno de yoga, de no más de un segundo." &
gen 09 Charon "$DUE Empezás imitando un om corto, y de golpe te acordás y gritás, alarmado." &
gen 10 Aoede "$GUIA Perdiendo la paciencia, con los dientes apretados, todavía en susurro pero irónica y cortante. Mindfulness y mind-full se dicen en inglés." &
gen 11 Aoede "$GUIA Dejás de susurrar: le hablás como una amiga honesta que le dice la verdad en la cara, con cariño y firmeza." &
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final: cálido, seguro, cercano, con una sonrisa." &
gen 13 Charon "$DUE Ahora desconcertado, perdido, casi tierno, como quien no sabe qué hacer con tiempo libre." &
gen 14 Aoede "$GUIA Otra vez muy suave, susurrada, dulce, como arrullando a un nene." &
gen 15 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cierre canchero y con picardía, invitando a etiquetar a un amigo." &
wait
