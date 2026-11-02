#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/la-bomba.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
EXP="Sos un experto en desactivar bombas de una película de acción, uruguayo, en un depósito oscuro, frente a una bomba a punto de explotar: transpirás, hablás en voz baja, tensa y grave, con la respiración contenida, muy dramático pero con un toque de humor canchero."
COMP="Sos la compañera del experto en explosivos, uruguaya, joven, en una película de acción: nerviosa, acelerada, al borde del pánico, hablás rápido y agudo, con humor."
DUE="Sos el dueño de un local de Montevideo, de unos cincuenta años, cansado y medio avergonzado, explicando algo que sabe que está mal, con tono resignado de comerciante uruguayo."
gen 01 Fenrir "$EXP '¡Nadie se mueve!' es una orden seca y fuerte; el resto lo decís en voz baja, lento, con suspenso, como si fuera lo más grave del mundo."
gen 02 Kore "$COMP '¿Qué planilla?' desconcertada; '¡Tiene catorce pestañas!' aterrada."
gen 03 Fenrir "$EXP Calmado, susurrando, sin sacar los ojos de la bomba."
gen 04 Kore "$COMP Leés los nombres de las pestañas uno por uno, cada vez más desconcertada; 'NO TOCAR' lo decís con miedo, en un susurro."
gen 05 Fenrir "$EXP Preguntás en voz baja, con sospecha."
gen 06 Charon "$DUE 'Mi cuñado.' como confesando; 'En el dos mil quince.' con vergüenza; 'Después se fue a vivir a España.' resignado, con humor."
gen 07 Kore "$COMP Gritás desesperada, cada frase más fuerte."
gen 08 Fenrir "$EXP 'Tranquilos.' firme; 'Esto es como en las películas.' con aplomo de héroe; '¿Corto el cable rojo o el azul?' con el alicate en la mano, tenso, lento."
gen 09 Charon "$DUE '¡El rojo no!' gritando asustado; el resto rápido, explicando nervioso."
gen 10 Kore "$COMP Gritás en pánico, apurada."
gen 11 Fenrir "$EXP 'Esto no lo desarma ni MacGyver.' derrotado; 'Voy a hacer lo único que queda.' solemne, lento; pausa larga; 'Control Z.' como el último recurso, en un susurro dramático."
gen 12 Kore "$COMP Gritás aterrada."
gen 13 Fenrir "$EXP Gritás fuerte, la orden de tirarse al piso antes de la explosión."
gen 14 Fenrir "$EXP Ahora pasó la explosión: hablás tiznado, tosiendo un poco, tranquilo y reflexivo, como el héroe al final de la película que mira a cámara. 'La bomba es que...' con peso, revelando la verdad."
gen 15 Orus "Sos el narrador de Scalerics que cierra un reel de Instagram después de una película de bombas: cálido, seguro y cercano, con una sonrisa, enumerando claro y ágil. 'Sin pestañas de no tocar. Sin llamar al cuñado.' con humor cómplice. 'Un sistema a tu medida no explota.' es el remate. La última pregunta es una invitación canchera."
