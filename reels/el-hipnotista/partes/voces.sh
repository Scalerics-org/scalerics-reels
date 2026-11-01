#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/el-hipnotista.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
HIP="Sos EL GRAN MESMERINO, un hipnotizador de teatro de revista de Montevideo, de unos 55 años, con capa y bigote, en un sketch de humor: voz grave, teatral y engolada de presentador de varieté, que estira las vocales con misterio y pomposidad, y se exaspera de forma cómica cuando el truco no sale."
DUE="Sos OSVALDO, el dueño de una veterinaria de barrio de Montevideo, de unos 50 años, HIPNOTIZADO en un escenario: hablás en trance, monótono, lento y sin emoción, como un sonámbulo que repite de memoria lo que hace todas las noches, arrastrando las palabras, con pausas largas entre cada tarea. Es gracioso por lo mecánico."
PUB="Sos una VECINA del público de un teatro de revista de Montevideo, de unos 45 años, chusma y graciosa, que grita desde la platea riéndose."
gen 01 Algenib "$HIP Arrancás triunfal, presentando el número al público; después de 'Ah, no' hacés una pausa, lo mirás de cerca, y 'ya viene hipnotizado' sorprendido y burlón."
gen 02 Leda "$PUB Gritás asombrada y divertida, a carcajadas."
gen 03 Algenib "$HIP Misterioso, susurrando con dramatismo, como quien prepara el gran truco."
gen 04 Charon "$DUE Totalmente en trance, monótono y lentísimo; cada tarea separada por una pausa, como un robot cansado."
gen 05 Leda "$PUB Muerta de risa, gritando desde la platea."
gen 06 Charon "$DUE En trance, monótono, cansado; 'uno por uno' repetido como un mantra aburrido."
gen 07 Algenib "$HIP Exasperado, aplaudiendo para cortar; la cuenta muy teatral y el '¡tres!' fuerte, como un golpe."
gen 08 Charon "$DUE Sigue en trance como si nada, igual de monótono; 'son las dos de la mañana' con un bostezo resignado."
gen 09 Algenib "$HIP Desesperado y teatral, al público, sin poder creerlo."
gen 10 Leda "$PUB Con lástima burlona, en voz alta desde la platea."
gen 11 Algenib "$HIP Te ponés serio de golpe y defendés al hombre con nobleza; 'sabe hacer de todo' firme, y la última frase despacio y cálida, como la gran revelación del show."
gen 12 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa; 'mientras vos te despertás de verdad' con complicidad."
gen 13 Orus "Hablás con ritmo ágil. Sos el narrador de Scalerics: cómplice, pícaro y con una sonrisa, invitando a compartir."
