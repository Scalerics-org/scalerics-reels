#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/yo-del-futuro.
# Voces: futuro (el dueño de dentro de cinco años) Charon · hoy (el dueño de hoy) Puck · narrador Orus.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
FUT="Sos el dueño de un comercio de Montevideo que viene del futuro: unos 60 años, canoso, de vuelta de todo, cansadísimo, con voz grave y ronca, irónico y con humor seco, como un viejo que ya vio todo y le habla a su yo joven."
HOY="Sos el dueño de un comercio de barrio de Montevideo, de unos 35 años, que se pega un susto bárbaro porque apareció un viejo entre humo y chispas en su mostrador: nervioso, rápido, desconfiado, medio gracioso."
gen 01 Charon "$FUT Recién llegado entre humo, solemne y dramático, con pausas, como en una película: la última frase seca, acusadora."
gen 02 Puck "$HOY Asustado y a la defensiva, casi gritando."
gen 03 Charon "$FUT Fastidiado, como quien cuenta una desgracia de todos los días, con remate seco."
gen 04 Puck "$HOY Desconfiado, medio burlón."
gen 05 Charon "$FUT Contando con suspenso, como un narrador de película, y la última frase con reproche."
gen 06 Puck "$HOY Avergonzado, en voz baja, excusándose."
gen 07 Charon "$FUT Cada vez más indignado y cómico, enumerando las desgracias como un viejo quejoso, rápido y sin pausas largas."
gen 08 Puck "$HOY Asustado, nervioso, atragantándose."
gen 09 Charon "$FUT Ahora cálido y cómplice, bajando la voz como quien cuenta un secreto, con esperanza: la última frase con energía."
gen 10 Puck "$HOY Curioso, entrecerrando los ojos."
gen 11 Charon "$FUT Resignado y gracioso al principio, y al final teatral, como un héroe de película de acción que se despide, con una pausa antes del remate."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de una escena de ciencia ficción: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a comentar."
