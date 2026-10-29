#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-roast.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
COM="Sos un comediante de stand-up uruguayo haciendo un roast en un club de comedia de Montevideo, con micrófono, ante un público que se ríe. Canchero, picante, sobrador y simpático, con timing de chiste: cada remate con una mini pausa antes, como quien sabe que va a matar."
gen 01 Fenrir "$COM Arrancás saludando al público y lanzás la amenaza con una sonrisa malvada."
gen 02 Fenrir "$COM"
gen 03 Fenrir "$COM El último remate, seco y lento."
gen 04 Leda "Sos una mujer joven del público en un club de comedia que grita desde su mesa, riéndose, indignada y cómplice, bien fuerte."
gen 05 Fenrir "$COM Le contestás a la del público, divertido, y seguís con los chistes."
gen 06 Fenrir "$COM El último remate, en voz más baja, como un secreto."
gen 07 Fenrir "$COM Ahora cambiás: medio aburrido, resignado, como quien va a comer algo sin ganas."
gen 08 Fenrir "Sos un comediante de stand-up uruguayo que acaba de probar una milanesa y se queda impresionado: primero mudo y asombrado, despacio, con la boca llena, después sincero y casi emocionado, sin chiste. Bajás el tono, serio y cálido."
gen 09 Orus "Sos el narrador de Scalerics que entra al final de un roast en un club de comedia: cálido, seguro y cercano, con una sonrisa; el cierre es una invitación canchera."
