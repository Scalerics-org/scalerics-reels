#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/la-ventanilla.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.log && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
ALTAVOZ="Sos la voz grabada del altavoz de una oficina pública uruguaya de los años 80: mujer, monótona, neutra, burocrática, sin ninguna emoción, articulando cada palabra como un anuncio oficial por parlante. Humor seco: lo absurdo lo decís como si fuera lo más normal del mundo."
GABY="Sos Gabriela, una montevideana de unos 28 años con MUCHA hambre, en la ventanilla de una oficina: voz joven, simpática, expresiva, cada vez más impaciente e incrédula. Hablás rápido y natural."
FUNC="Sos un funcionario público uruguayo de ventanilla de unos 60 años, con manguitos y sello de goma: voz grave, lenta, aburrida, desganada, sin levantar la vista de los papeles, como quien dice lo mismo por milésima vez. Suspirás. Humor seco: decís cosas absurdas con total naturalidad burocrática. Pero hablás de corrido, sin pausas largas."
gen 01 Kore "$ALTAVOZ La primera frase la decís seca y clara, como un aviso oficial que pica; 'Número cuarenta y siete' como llamando al siguiente de la fila."
gen 02 Leda "$GABY Saltás de la silla al oír tu número ('¡Yo!'), y pedís el menú con hambre y simpatía."
gen 03 Charon "$FUNC Recitás el reglamento sin mirarla: 'Por triplicado' lo decís con un suspiro."
gen 04 Leda "$GABY Lo decís incrédula, un poco frustrada, como explicando lo obvio."
gen 05 Charon "$FUNC Le das la instrucción con total desgano; 'Y espere que cargue' lento, resignado."
gen 06 Leda "$GABY Resignada, suspirás y preguntás otra cosa con paciencia forzada."
gen 07 Charon "$FUNC Leés un papel viejo; 'Actualizado en dos mil diecinueve' lo decís como si fuera reciente; 'Vencido' lo decís seco, como golpeando un sello de goma."
gen 08 Leda "$GABY Con una última esperanza, casi suplicando."
gen 09 Charon "$FUNC Sin levantar la vista, mandándola a otro lado; 'O vuelva mañana' es la frase de siempre, lenta y aburrida."
gen 10 Leda "$GABY Te cansaste: lo decís seca, con humor, y te levantás para irte."
gen 11 Leda "$GABY Ahora estás feliz y aliviada, en la vereda de enfrente con el celular en la mano: todo te salió al instante. Rápido, contenta, sorprendida; 'Cero trámites' con una sonrisa canchera."
gen 12 Charon "$FUNC Llamás al siguiente número pero la oficina quedó vacía; '¿Alguien?' lo decís desconcertado, con eco de sala vacía."
gen 13 Orus "Sos el narrador de Scalerics que entra al final del sketch: cálido, seguro, cercano, con una sonrisa, como un amigo que le da la solución al dueño del restaurante. Ritmo RÁPIDO y suelto, de corrido, sin pausas entre frases."
gen 14 Orus "Sos el narrador de Scalerics: el cierre es una invitación canchera y cómplice a comentar, con humor. Rápido y de corrido."
