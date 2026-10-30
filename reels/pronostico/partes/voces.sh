#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/pronostico; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
MET="Sos la meteoróloga de un noticiero de televisión uruguayo, frente al mapa del tiempo: canchera, simpática, súper expresiva y rápida, con el entusiasmo exagerado de la que anuncia una tormenta histórica, un poco de picardía en cada frase."
MOV="Sos un movilero de exteriores de un noticiero uruguayo, en vivo bajo una tormenta en un barrio de Montevideo, empapado, gritando por encima del viento y la lluvia: enérgico, chismoso y exagerado."
DUE="Sos un comerciante de barrio montevideano de unos cincuenta y cinco años, empapado bajo la lluvia, desbordado, a los gritos y a la defensiva, quejoso."
CLI="Sos una clienta joven de Montevideo, entrevistada por la tele bajo la lluvia: indignada y chusma, contándolo como un chisme, con ritmo."
gen 01 Zephyr "$MET Arrancá con un golpe seco, como un aviso urgente que le habla en la cara al que mira."
gen 02 Zephyr "$MET Leelo como un parte meteorológico dramático y divertido, enumerando con ritmo, y remata con picardía en 'altísima'."
gen 03 Puck "$MOV"
gen 04 Charon "$DUE Lo grita como si fuera obvio, a la defensiva."
gen 05 Puck "$MOV Lo dice con sorna y después con suspenso chusmero, con una pausa dramática antes de 'en el de enfrente'."
gen 06 Leda "$CLI"
gen 07 Zephyr "$MET Lo dice como una alerta seria pero con picardía."
gen 08 Puck "$MOV Lo cuenta como una gran revelación, y remata fuerte y claro en 'un agente de IA'."
gen 09 Charon "$DUE Pregunta ofendido, herido en el orgullo."
gen 10 Puck "$MOV Lo dice más bajo, con ternura y compasión, como consolándolo."
gen 11 Zephyr "$MET Cierra el pronóstico con picardía, como un chiste."
gen 12 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás invitando a comentar, con humor."
