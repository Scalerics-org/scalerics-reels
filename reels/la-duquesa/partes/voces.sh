#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-duquesa.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CRO="Sos la CRONISTA ANÓNIMA de una serie de época de la alta sociedad, la que narra en off los chismes de los bailes, en un sketch de humor: elegante, refinada, venenosa y divertida, con aire de escándalo y un placer travieso por el chisme, pronunciación cuidada pero con voseo uruguayo."
CLA="Sos la SEÑORITA CLARA, una joven de unos 25 años en un sketch de humor que parodia una serie de época: dramática, teatral, exagerada como una dama de novela que se desmaya, pero hablando con voseo uruguayo actual."
ERN="Sos DON ERNESTO, dueño de una zapatería de barrio de Montevideo, de unos 60 años, en un sketch de humor de serie de época: impostás un tono antiguo, ceremonioso, solemne y pomposo, como si dictaras una carta de otro siglo."
gen 01 Kore "$CRO Arrancá con un golpe seco y picante, como quien abre el chisme más jugoso de la temporada; 'querido lector' con deleite, y 'en este siglo' como un pinchazo."
gen 02 Kore "$CRO Presentando la escena con elegancia y suspenso, saboreando 'botas divinas'."
gen 03 Leda "$CLA Enamorada, suspirando, exaltada, como quien vio el amor de su vida; la pregunta del talle ansiosa."
gen 04 Kore "$CRO Con suspenso creciente; 'el jueves' con escándalo y 'Lacrada' sola, lenta, como un golpe de teatro."
gen 05 Charon "$ERN Leyendo su carta en voz alta, lento, ceremonioso, muy formal y pomposo; 'precio por privado' al final igual de solemne."
gen 06 Leda "$CLA Indignada, incrédula, a punto de desmayarse; el segundo 'por privado' casi gritado."
gen 07 Kore "$CRO Escandalizada y feliz con el chisme; 'escándalo en sociedad' como titular; lo de la tienda rápido, como un secreto que se cuenta en voz baja."
gen 08 Leda "$CLA Triunfal, coqueta, satisfecha, con una sonrisa."
gen 09 Charon "$ERN Ofendidísimo, perdiendo la compostura, levantando la voz."
gen 10 Kore "$CRO Más cálida, con un toque de compasión y sabiduría; 'de otro siglo' con intención, y 'el baile es en el celular' como la moraleja, lenta y clara."
gen 11 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa y energía; DAC se dice 'dac'."
gen 12 Kore "$CRO Cómplice y traviesa, cerrando el chisme; 'que se entere por carta' con picardía."
