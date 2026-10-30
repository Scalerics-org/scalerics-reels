#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/escape-room.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GM="Sos el GAME MASTER de un escape room, hablando por un parlante desde una sala de control oscura, como el villano de una serie de juegos mortales: voz GRAVE, lenta, fría y teatral, con un toque de humor negro. Ritmo ÁGIL y firme: pausas cortas, nada de arrastrar las palabras."
FEN="Sos un empleado joven y canchero de un comercio uruguayo, encerrado en un escape room, muy seguro de sí mismo, medio pillo, con humor."
LEDA="Sos una empleada joven uruguaya encerrada en un escape room, leyendo un cuaderno con letra ilegible: desconcertada, indignada, con humor, ritmo ágil."
KORE="Sos la encargada de un comercio uruguayo encerrada en un escape room: práctica, rápida, cada vez más exasperada, con ironía."
gen 01 Algenib "$GM Arrancás con un golpe seco: 'Encerramos a tres empleados' como quien presenta un juego macabro. 'Una sola cosa: cuánto stock hay' con suspenso. 'Es peor.' en un susurro."
gen 02 Fenrir "$FEN Lo decís sobrador, como si fuera lo más fácil del mundo."
gen 03 Leda "$LEDA Leés lo del cuaderno despacio, entrecerrando los ojos, y la pregunta la hacés indignada."
gen 04 Kore "$KORE 'Encontré la planilla' contenta; 'Bueno, tres' bajando el entusiasmo; los tres nombres de archivo cada vez más ridículos; 'Y las tres dicen distinto' resignada."
gen 05 Algenib "$GM Anunciás el tiempo que queda, lento y amenazante."
gen 06 Fenrir "$FEN Ya no tan seguro: contás lo del proveedor confundido, y 'El cuaderno dice que no' con miedo."
gen 07 Leda "$LEDA Preguntás alarmada, como quien descubre algo terrible."
gen 08 Kore "$KORE Respondés seco y cortante, resignada."
gen 09 Algenib "$GM Anunciás el tiempo que queda, más lento, disfrutándolo."
gen 10 Fenrir "$FEN Gritás desesperado, como última salvación."
gen 11 Charon "Sos el dueño de un comercio uruguayo, cansado, que aparece desde un rincón oscuro del depósito: voz cansada, resignada, con humor triste, como un fantasma que vive ahí hace años. 'Yo tampoco sé.' bien resignado."
gen 12 Algenib "$GM 'Se terminó el tiempo.' lento y satisfecho; 'Nadie sale.' bajito y cruel."
gen 13 Orus "Sos el narrador de Scalerics que prende la luz en un escape room y resuelve todo: voz segura, tranquila y cálida, con un toque canchero. Enumerás claro y ágil. 'Lo mirás en el celular.' con una sonrisa; 'Y la puerta se abre.' es el remate. Ritmo ágil, sin pausas largas."
gen 14 Orus "Sos el narrador de Scalerics que cierra un reel de Instagram: cercano, cómplice y canchero, desafiando al que mira con una sonrisa."
