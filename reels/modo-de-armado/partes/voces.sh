#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/modo-de-armado.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
MAN="Sos la voz grabada de un manual de instrucciones de un mueble para armar: una mujer uruguaya neutra, pausada, prolija y DEMASIADO amable, con una sonrisa fija y calma de azafata, como si todo fuera facilísimo aunque sea un desastre; y por eso es gracioso."
DUE="Sos el dueño de un comercio uruguayo de unos 50 años, armando un mueble a medianoche: agotado, ronco, con bronca contenida y quejoso de manera muy cómica."
gen 01 Kore "$MAN Arrancás felicitando con dulzura; 'y ninguno se hace solo' con la misma sonrisa, como si fuera una buena noticia."
gen 02 Kore "$MAN Leyendo la lista de piezas con prolijidad; una pausita corta antes de cada letra; 'el café frío' igual de amable."
gen 03 Kore "$MAN Dictando los pasos con calma y entusiasmo de manual; 'repetí' muy dulce."
gen 04 Charon "$DUE Preguntando desconfiado, cansado."
gen 05 Kore "$MAN Contestando feliz, como si fuera una gran noticia."
gen 06 Charon "$DUE Gritando indignado, incrédulo, la voz se le quiebra."
gen 07 Kore "$MAN Dulce y ordenada; 'uno por uno' lento; 'con una sonrisa' con una sonrisa forzada."
gen 08 Kore "$MAN Amable; 'a mano' con alegría inocente."
gen 09 Charon "$DUE Derrotado, mirando el reloj; 'me sobró un tornillo' preocupado."
gen 10 Kore "$MAN Tranquilizadora y demasiado dulce, como si fuera lo más normal del mundo."
gen 11 Kore "$MAN Primero apenada, carraspeando, como pidiendo disculpas: 'fe de erratas'; después 'paso cero: dejá que se haga solo' lento y revelador."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se arregla el lío: claro, cálido y seguro, ritmo ágil; 'automatizaciones' bien claro, como la solución."
gen 13 Kore "$MAN Feliz y orgullosa presentando el manual nuevo; 'andá a dormir' con cariño."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero, con una sonrisa, invitando a comentar."
echo listo
