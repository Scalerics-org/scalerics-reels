#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/modo-dificil.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
JUG="Sos un streamer uruguayo de videojuegos de unos 25 años transmitiendo en vivo un simulador de vida: canchero, sobrador, rápido, divertido, hablándole al chat, y maneja a su personaje como si fuera un muñeco sin ninguna culpa."
HUG="Sos Hugo, el personaje del videojuego: un comerciante uruguayo de unos 55 años, dueño de un bazar, agotadísimo, que habla de sí mismo en tercera persona con voz cansada, lenta y resignada, de forma muy cómica."
JUE="Sos la voz del sistema de un videojuego: femenina, neutra, clara, robótica y un poco solemne, como un aviso automático."
gen 01 Fenrir "$JUG La primera frase como un golpe, provocando al que mira; 'malísimo' estirado y burlón. Después saluda al chat entusiasmado y da la orden a Hugo como quien hace clic."
gen 02 Charon "$HUG Cada frase más cansada que la anterior; 'quiere dormir' casi bostezando."
gen 03 Fenrir "$JUG 'Ni ahí' riéndose; da las órdenes rápido, sin piedad."
gen 04 Kore "$JUE Alerta seria."
gen 05 Fenrir "$JUG Despreocupado, quitándole importancia; 'velocidad tres' orgulloso, como una genialidad."
gen 06 Charon "$HUG Al borde del colapso, con pausas; la última frase triste y tierna."
gen 07 Kore "$JUE Aviso solemne y frío."
gen 08 Fenrir "$JUG Indignado con el personaje, a los gritos, como cuando perdés una partida."
gen 09 Charon "Sos Hugo, el personaje del videojuego, un comerciante uruguayo de unos 55 años, que de golpe se da vuelta y le habla a la cámara, al jugador, rompiendo la cuarta pared: firme, tranquilo, con dignidad y un poco de bronca contenida; 'sos vos' marcado."
gen 10 Fenrir "$JUG Sorprendido de verdad, descolocado."
gen 11 Kore "$JUE Anuncio triunfal, como un logro desbloqueado."
gen 12 Orus "Sos el narrador de Scalerics que entra cuando se arregla todo: cálido, claro y seguro, explicando simple, como un amigo que trae la solución, ritmo ágil; cada 'solo' con una sonrisa."
gen 13 Charon "Sos Hugo, el personaje del videojuego, ahora descansado y feliz, en tercera persona, con paz y una sonrisa."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
echo listo
