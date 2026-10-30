#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/poseido.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ESP="Sos la esposa de un comerciante de Montevideo, de unos 40 años, en una película de exorcismos pero en clave de comedia: asustada, dramática y exagerada, como en una telenovela, con humor."
CUR="Sos un cura exorcista viejo y solemne, de voz grave y teatral, en una película de exorcismos en clave de comedia: hablás con toda la seriedad del mundo de algo ridículo, y eso es lo gracioso."
DEM="Sos un demonio que posee a un comerciante: voz muy grave, ronca, lenta y cavernosa, arrastrando las palabras, como en una película de terror, pero lo que decís es aburrido y de oficina, y eso es lo gracioso."
gen 01 Leda "$ESP Arrancás de golpe, desesperada, en susurro urgente y con miedo, como quien llama al cura a medianoche."
gen 02 Charon "$CUR Tranquilo y grave, pausado, como un médico que ya vio de todo."
gen 03 Leda "$ESP Contás rápido y nerviosa, cada vez más asustada; 'con los ojos en blanco' casi llorando."
gen 04 Algenib "$DEM Repetís como en trance, muy lento, hipnótico, en un murmullo grave y monótono, con pausas entre cada palabra."
gen 05 Charon "$CUR Primero espantado, en voz baja; 'Esto es peor' con terror sincero; la pregunta final asustado, señalando la pantalla."
gen 07 Charon "$CUR A los gritos, con toda la fuerza de un exorcismo, levantando el crucifijo."
gen 08 Algenib "$DEM Contestás despacio, ronco y cansado, como un demonio agotado que enumera su lista de tareas pendientes."
gen 09 Charon "$CUR Gritando todavía más fuerte, desesperado, como el último conjuro."
gen 10 Algenib "$DEM Lento, ronco y desolado, con un suspiro; el final 'se me borró todo' con angustia de oficina."
gen 11 Charon "$CUR Ahora calmo y sabio, bajando los brazos, como quien descubre la verdad; el final con una sonrisa canchera."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de una película de exorcismos en clave de comedia: cálido, seguro, cercano y con ritmo, como quien prende la luz y trae la solución."
gen 13 Fenrir "Sos un comerciante uruguayo de 45 años que se acaba de despertar de un trance: voz normal, aturdido, desorientado y confundido, bajito."
gen 14 Leda "$ESP Ahora aliviada, tierna y cariñosa, con una sonrisa, bajito."
gen 15 Orus "Sos el narrador de Scalerics al final de un reel de comedia: invitación canchera y pícara, con una sonrisa."
