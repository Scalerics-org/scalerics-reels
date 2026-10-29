#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-remate.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
REM="Sos un rematador de feria ganadera del interior de Uruguay, en una casa de remates rural, con el martillo en la mano y micrófono. Hablás RAPIDÍSIMO, de corrido, con el sonsonete cantado de los rematadores, canchero, entusiasta y gracioso, subiendo la energía en cada pregunta."
gen 01 Fenrir "$REM Arrancás mirando a cámara, más lento y con una sonrisa sobradora: la primera frase es una provocación, la segunda un pinchazo seco."
gen 02 Fenrir "$REM Presentás el lote como si fuera el mejor animal de la feria; en 'el detalle' bajás la voz como un chisme, y en '¿quién da más?' explotás."
gen 03 Algenib "Sos el dueño del comercio de enfrente, un hombre de voz grave y canchera, que levanta la paleta en un remate y grita la oferta, seguro y desafiante."
gen 04 Fenrir "$REM Repetís la oferta a los gritos, rapidísimo."
gen 05 Leda "Sos una mujer joven, encargada de un supermercado, que levanta la paleta en un remate y grita su oferta, entusiasta y competitiva, bien fuerte."
gen 06 Fenrir "$REM Repetís la oferta a los gritos, rapidísimo, apurando a la sala."
gen 07 Puck "Sos un comerciante joven y tranquilo, sentado al fondo de un remate, que levanta la paleta y grita su oferta con total confianza, casi riéndose, sabiendo que gana."
gen 08 Fenrir "$REM Cantás la cuenta final con suspenso creciente, '¡a la una! ¡a las dos!', y en 'a las tres de la mañana' te sorprendés y te reís; '¡Vendido!' es un grito triunfal con martillazo."
gen 09 Charon "Sos el dueño de un comercio, un hombre cansado de unos 50 años, que llega tarde y agitado a un remate, pidiendo perdón, medio despistado."
gen 10 Fenrir "Sos un rematador de feria uruguayo. Ahora hablás despacio, seco, con lástima burlona, como quien da una mala noticia: una sola frase corta. La última palabra es 'señor', cortita, sin estirarla."
gen 11 Charon "Sos el dueño de un comercio, un hombre de unos 50 años, indignado y desconcertado, que no puede creer lo que escucha."
gen 12 Fenrir "Sos un rematador de feria uruguayo. Hablás despacio y con calma, como quien explica algo obvio, con una pausa antes de cada frase; la última es un remate seco."
gen 13 Orus "Sos el narrador de Scalerics que entra al final de un remate de feria: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera a participar."
