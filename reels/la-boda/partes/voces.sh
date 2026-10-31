#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/la-boda.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
TIA="Sos la tía Elsa, una señora uruguaya de unos 65 años, CHUSMA, sentada en el primer banco de la iglesia en un casamiento, con pañuelo en la mano."
CURA="Sos el padre que casa a los novios en una iglesia de Montevideo, de unos 60 años: voz grave, SOLEMNE, lenta, ceremonial, con eco de iglesia, como en una película."
DUE="Sos Ricardo, dueño de una zapatería de barrio en Montevideo, de unos 45 años, que irrumpe en el casamiento de su mejor clienta: DESESPERADO, dramático como en una telenovela."
CLI="Sos Lucía, una clienta uruguaya de unos 30 años vestida de novia en el altar: INDIGNADA, irónica y filosa, con humor, haciéndole un reclamo al dueño del local."
NOV="Sos el novio, el dueño del comercio de enfrente, uruguayo, de unos 35 años: CANCHERO, sobrador, tranquilo y sonriente, con una calma que irrita."
gen 01 Kore "$TIA Le susurrás al que mira, en voz baja y con morbo, como quien cuenta un chisme jugoso, con una pausa antes del remate."
gen 02 Charon "$CURA Pronunciás la fórmula clásica despacio, con mucha solemnidad."
gen 03 Puck "$DUE GRITÁS al entrar corriendo, sin aire, suplicando, exagerado."
gen 04 Kore "$TIA Emocionadísima, encantada con el escándalo, llorando de la emoción."
gen 05 Leda "$CLI Arrancás sorprendida y sobradora, y después vas enumerando cada desplante con indignación creciente, hasta el remate a los gritos, ofendidísima."
gen 06 Charon "$CURA Sorprendido, perdiendo la solemnidad por un segundo, incrédulo."
gen 07 Puck "$DUE A la defensiva, quejoso, y después celoso y dolido, señalando al novio."
gen 08 Leda "$CLI Seca y contundente, como un portazo, enamorada del otro."
gen 09 Fenrir "$NOV Contás lo que hiciste con aire de suficiencia, de corrido, tranquilo, como quien no hizo nada del otro mundo."
gen 10 Puck "$DUE Desconcertado, celoso, incrédulo."
gen 11 Fenrir "$NOV Relajado y sobrador, con una sonrisa, revelando un secreto con picardía."
gen 12 Charon "$CURA Solemne y rápido, como quien quiere terminar, y al final con alegría de fiesta."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de un casamiento de película: cálido, seguro y cercano, con una sonrisa; el cierre es una pregunta canchera que invita a comentar."
