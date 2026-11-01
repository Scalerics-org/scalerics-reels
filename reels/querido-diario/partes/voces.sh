#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/querido-diario.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
SOF="Sos Sofi, una chica de 14 años de Montevideo que lee en voz alta su diario íntimo, en su cuarto, de noche. Voz joven, dulce y adolescente, medio dramática como quien cuenta un chisme gravísimo, con humor tierno y un poco de fastidio de hija; nada de drama pesado."
PAP="Sos el papá de Sofi, dueño de una ferretería de Montevideo, de unos 48 años, a las once de la noche frente a la compu: cansado, distraído, con la cabeza en otra cosa, voz de fondo como desde otra habitación."
ORU="Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del diario de Sofi: cálido, seguro, cercano, con una sonrisa, como un amigo que trae la solución."
gen 01 Leda "$SOF Arrancás con un susurro de secreto escandaloso, como quien confiesa un chisme terrible; 'tiene otra' con drama exagerado."
gen 02 Leda "$SOF Sigue el chisme, misteriosa; pausa antes de 'Se llama Planilla', y lo decís con asco y fastidio, como el nombre de la rival."
gen 03 Leda "$SOF Contando el día, resignada y con ironía; 'uno por uno' arrastrado, aburrida."
gen 04 Charon "$PAP Contestás distraído, sin mirar, mecánico, como el que dice 'ya voy' y nunca va."
gen 05 Leda "$SOF Seca y ofendida al principio; 'a mí me dejó en visto' indignada, y 'desde el living' como el colmo, con humor."
gen 06 Leda "$SOF Incrédula, contando una locura; 'a mano' con un suspiro."
gen 07 Leda "$SOF Un poquito triste pero con humor, tierna; 'el reporte del día' imitando la voz grave del papá."
gen 08 Charon "$PAP Murmurando concentrado 'copiar, pegar' como un robot agotado, y de golpe un grito desesperado y cómico en 'se me corrió una fila'."
gen 09 Leda "$SOF Ahora más suave y aliviada, contando lo que le dijo la mamá, pensativa, entendiendo; el final claro y con una sonrisa."
gen 10 Leda "$SOF Esperanzada, tierna, mirando al techo, como una pregunta en voz alta."
gen 11 Orus "$ORU Le contestás a Sofi con cariño y después hablás claro y entusiasta."
gen 12 Leda "$SOF Feliz, emocionada y tierna, con una sonrisa enorme; 'sin la Planilla' con orgullo y un poquito de revancha."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cercano, cómplice y con una sonrisa, una invitación cálida y corta."
