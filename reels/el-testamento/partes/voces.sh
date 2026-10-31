#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-testamento.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ESC="Sos un escribano uruguayo veterano, de traje, en una escribanía antigua de madera oscura, leyendo un testamento ante la familia: voz grave, lenta y solemnísima, ceremoniosa como en una telenovela, y justamente por eso es gracioso."
HIJA="Sos la hija de un ferretero, de unos 35 años, en la lectura de la herencia: dramática como en una telenovela de la tarde, indignada y exagerada."
HIJO="Sos el hijo de un ferretero, de unos 30 años, en la lectura de la herencia: medio perdido, desesperado y quejoso, como en una telenovela."
HUGO="Sos Don Hugo, un ferretero uruguayo recién jubilado de unos 70 años, grabando un mensaje desde la costa mientras pesca: feliz, tranquilísimo, bonachón y sin ningún apuro."
gen 01 Charon "$ESC Arrancás con un golpe seco, como anunciando una tragedia familiar; la segunda frase como sentencia."
gen 02 Charon "$ESC Leés el testamento en primera persona, con pompa; 'vivito y jubilado' con orgullo; la pausa antes de 'y todo lo demás' bien marcada, y el final como una revelación."
gen 03 Leda "$HIJA Primero desconcertada, después alarmada."
gen 04 Charon "$ESC Leés el anexo con toda la solemnidad, como si fuera un documento sagrado."
gen 05 Fenrir "$HIJO Desesperado, a los gritos."
gen 06 Leda "$HIJA Con miedo de la respuesta."
gen 07 Charon "$ESC Solemne, como quien presenta una reliquia; 'Número cuarenta y dos' seco, como dato oficial."
gen 08 Fenrir "$HIJO Esperanzado, casi suplicando."
gen 09 Charon "$ESC Lo leés como una cláusula legal importantísima."
gen 10 Leda "$HIJA Mirando a todos, con suspenso."
gen 11 Fenrir "$HIJO Dudando muchísimo, en voz baja, sin tener idea."
gen 12 Charon "$ESC Con misterio, abriendo un sobre lacrado."
gen 13 Gacrux "$HUGO Con cariño; 'que pica la corvina' con entusiasmo de pescador."
gen 14 Leda "$HIJA Al borde del llanto, como el final de un capítulo de telenovela."
gen 15 Orus "Sos el narrador de Scalerics que entra cuando se calma el drama: cálido, claro y seguro, defendiendo a Don Hugo con respeto; la segunda frase como una verdad simple."
gen 16 Orus "Sos el narrador de Scalerics: claro y cercano, explicando simple, como un amigo que trae la solución."
gen 17 Orus "Sos el narrador de Scalerics: con una sonrisa, una frase redonda y cálida."
gen 18 Gacrux "$HUGO Feliz y orgulloso, riéndose un poco, desde la costa."
gen 19 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
