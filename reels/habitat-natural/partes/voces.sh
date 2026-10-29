#!/bin/bash
# Genera cada parlamento con su voz y su tono, con reintentos (la cuota por minuto es compartida).
# Correr desde reels/habitat-natural. n = narrador de documental (Algenib), c = camarógrafo (Puck),
# d = el comerciante (Charon), o = narrador de Scalerics (Orus).
V=../../herramientas/voz.mjs
NAR="Sos el narrador de un documental de naturaleza de la televisión, grave, culto y fascinado, que susurra para no espantar a los animales: hablás bajito, casi al oído, con asombro reverente, como si observaras una especie rara desde un escondite en la selva. Humor seco, sin reírte nunca. Ritmo pausado pero sin estirar de más."
CAM="Sos el camarógrafo de un documental de naturaleza, un muchacho uruguayo joven, escondido detrás de un arbusto con la cámara: susurrás nervioso, preocupado y un poco tierno."
gen() { # base voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
gen 01n Algenib "$NAR Arrancás la presentación del documental susurrando, fascinado; la segunda frase es una advertencia de tragedia, en voz todavía más baja."
gen 02n Algenib "$NAR Describís al animal con admiración científica; 'Silencio' lo decís casi sin voz, y 'el celular vibra' con tensión, como si empezara la caza."
gen 03n Algenib "$NAR Narrás con suspenso cómo una presa se acerca a beber, muy despacio y en voz baja."
gen 04n Algenib "$NAR Narrás con asombro; 'y lo deja en visto' es el momento cumbre, dicho con fascinación absoluta; 'una técnica ancestral' con respeto solemne."
gen 05c Puck "$CAM Preguntás bajito, con lástima, casi suplicando."
gen 06n Algenib "$NAR Respondés seco, firme y en voz baja, sin dudar, como una regla sagrada."
gen 07n Algenib "$NAR Narrás con expectativa, como anunciando el canto de un animal salvaje."
gen 08d Charon "Sos el dueño de un comercio de Montevideo, de unos 50 años, cansado y desganado, que contesta a un cliente sin ganas, arrastrando las palabras."
gen 09n Algenib "$NAR Narrás la huida de la presa con dramatismo creciente; la última frase, la de la especie más evolucionada, con admiración y rapidez."
gen 10c Puck "$CAM Lo decís con lástima de verdad, bajito, en un suspiro."
gen 11n Algenib "$NAR Ahora cambiás a un tono comprensivo y tierno, defendiendo al animal: 'está solo' con ternura; la enumeración cada vez más agotada, y la última frase sentenciosa."
gen 12c Puck "$CAM Preguntás con curiosidad, susurrando."
gen 13n Algenib "$NAR Describís a la especie evolucionada con fascinación científica, frase por frase, como si fueran capacidades asombrosas de un depredador perfecto. Un poco más rápido."
gen 14c Puck "$CAM Proponés algo prohibido, pícaro y esperanzado, en voz bajita."
gen 15n Algenib "$NAR 'Nunca intervenimos' lo decís firme; después una pausa, 'bueno' rendido, y 'esta vez, sí' cediendo con una sonrisa cómplice."
gen 16o Orus "Sos el narrador de Scalerics que entra al final de un documental de naturaleza: cálido, seguro y cercano, con una sonrisa, en voz normal (ya no susurra); el cierre es una invitación canchera y cómplice a etiquetar a alguien."
