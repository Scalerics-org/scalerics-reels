#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-tesoro.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CAP="Sos un capitán pirata de película de aventuras, uruguayo, de unos 55 años: voz grave, ronca y TEATRAL, solemne y exagerado como en una película de piratas, con humor. Hablás como si contaras una leyenda frente al timón."
GRU="Sos el grumete del barco pirata, un pibe uruguayo de unos 19 años: voz joven, nerviosa, ingenua y graciosa, siempre un poco asustado del capitán."
LOR="Sos un loro de barco pirata: voz chillona, aguda, nasal, gritada y repetitiva, como un loro que imita palabras. Graciosísimo, a los graznidos."
ORU="Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final de la película de piratas: cálido, seguro, cercano, con una sonrisa, como un amigo que trae la solución."
gen 01 Algenib "$CAP Arrancás con un golpe dramático, solemne, mirando a cámara; 'Y un loro' después de una pausita, seco y cómico."
gen 02 Zephyr "$LOR Dos graznidos chillones."
gen 03 Algenib "$CAP Épico, como anunciando la búsqueda de un tesoro legendario; 'la mejor de Montevideo' con reverencia."
gen 04 Puck "$GRU Pregunta tímida y curiosa."
gen 05 Algenib "$CAP Misterioso, bajando la voz; 'dos mil diecinueve' con drama, como si fuera un pergamino antiguo."
gen 06 Puck "$GRU Leyendo de un papelito, dudando, confundido."
gen 07 Algenib "$CAP Indignado, rugiendo, cómico."
gen 08 Puck "$GRU Leyendo, desconcertado; 'depende' con incredulidad."
gen 09 Zephyr "$LOR Repetís gritando, burlón."
gen 10 Puck "$GRU Preocupado, con el teléfono en la mano, bajito."
gen 11 Algenib "$CAP Gritando una orden épica, valiente, a todo pulmón."
gen 12 Puck "$GRU Desilusionado, con una pausa larga después de 'capitán', y 'está cerrado' con bajón."
gen 13 Algenib "$CAP Dolido, dramático, como un héroe derrotado de película."
gen 14 Puck "$GRU Resignado y gracioso, consolando."
gen 15 Algenib "$CAP Serio, sabio y pausado, como el que revela el secreto; 'el problema es el mapa' remarcado y lento."
gen 16 Orus "$ORU Claro y entusiasta, enumerando con ritmo."
gen 17 Puck "$GRU Eufórico, gritando de alegría, con el celular en la mano."
gen 18 Zephyr "$LOR Graznando feliz, eufórico."
gen 19 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, una invitación cálida y corta."
