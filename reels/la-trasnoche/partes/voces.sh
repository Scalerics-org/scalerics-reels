#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/la-trasnoche.
# Voces: Hugo el locutor Enceladus, Carmen Gacrux, Matías Puck, Raúl el panadero Charon, narrador Orus.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>>partes/voces.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
HUG="Sos Hugo, el locutor de un programa de radio AM de trasnoche de Montevideo, 'Corazones de Medianoche', de unos 55 años: voz grave, melosa y aterciopelada, pegado al micrófono, seductor y teatral como un locutor de boleros de las dos de la mañana, con mucho humor y picardía. Acento uruguayo."
CAR="Sos Carmen, una señora montevideana de unos 65 años que llama por teléfono a un programa de radio de trasnoche: despechada, dolida y dramática como en una telenovela, con suspiros, pero muy graciosa. Acento uruguayo de barrio bien marcado."
MAT="Sos Matías, un muchacho montevideano de unos 28 años que llama por teléfono a una radio a la madrugada: desconcertado y dolido, como alguien al que dejaron plantado, gracioso sin querer. Acento uruguayo joven."
RAU="Sos Raúl, un panadero de barrio de Montevideo de unos 55 años que llama por teléfono a la radio a la madrugada, con las manos llenas de harina: atropellado, agitado, sincero, desbordado, con cariño por su clienta. Acento uruguayo de barrio."
gen 01 Enceladus "$HUG Arrancás el programa con un susurro seductor y venenoso, mirando al dueño del comercio que escucha: 'para hablar de vos' con picardía; 'Y no te va a gustar' lento, como una amenaza dulce."
gen 02 Enceladus "$HUG Presentás el programa con voz de terciopelo, lenta y melosa: 'corazones solitarios' acariciando las palabras; 'Corazones de Medianoche' como el nombre del programa, con orgullo."
gen 03 Gacrux "$CAR Saludás con la voz quebrada; contás tu pena despacio; 'Y nadie me extrañó' dolida; 'Ni un mensajito' como el golpe final, con un suspiro de telenovela."
gen 04 Enceladus "$HUG Le preguntás con ternura y picardía; 'Carmen, tengo bizcochos calentitos' lo decís como un galán seductor, susurrado."
gen 05 Gacrux "$CAR 'Nada.' seco y ofendido; 'Veinte años de flautitas' con nostalgia dramática; 'y ni me buscó' con despecho, casi llorando, graciosa."
gen 06 Enceladus "$HUG Conmovido y teatral, como si se te piantara un lagrimón: 'el final de Titanic' con un suspiro; 'Otra llamada' recuperándote, profesional y meloso."
gen 07 Puck "$MAT Saludás tímido; 'Pregunté el precio de una heladera' normal; 'Me contestaron' esperanzado; pausa; 'y nunca más' dolido y desconcertado."
gen 08 Enceladus "$HUG 'Te ghostearon, Matías' con lástima y complicidad, la palabra ghostearon en inglés a la uruguaya, 'goustearon'; 'Pará...' sorprendido; '¡está llamando Raúl!' emocionado como quien anuncia un escándalo en vivo."
gen 09 Charon "$RAU Entrás al aire desesperado y a los gritos, sorprendido: '¡Carmen!' como quien ve a alguien después de mucho tiempo; 'por el precio' convencido."
gen 10 Gacrux "$CAR '¿Por el precio?' indignada, ofendidísima; 'Me fui porque nadie me extrañó' lento y dolido, con dignidad; 'Raúl' como un reproche tierno."
gen 11 Charon "$RAU Desbordado y sincero, defendiéndote: '¡Estoy solo, Hugo!' casi gritando; la lista 'Amaso a las cuatro, atiendo, hago la caja' rápida y agitada; '¿Cuándo le escribo?' desesperado, de verdad."
gen 12 Enceladus "$HUG Con ternura y humor, al micrófono, como quien consuela: 'Raúl no es frío' cálido; 'Está tapado de harina' con una sonrisa."
gen 13 Orus "Sos el narrador de Scalerics que entra al final del programa de radio: cálido, claro y seguro, cercano, ritmo ágil; 'agente de IA' remarcado; 'mientras vos amasás' con una sonrisa."
gen 14 Gacrux "$CAR Llamás de nuevo a la radio emocionadísima, feliz como una adolescente: '¡Me escribieron!' con un gritito de alegría; 'Mañana voy por bizcochos' contenta y coqueta."
gen 15 Enceladus "$HUG Despedís el programa meloso y pícaro, invitando al que escucha: 'dedicale este video' como quien dedica un bolero; 'a ese cliente que hace meses que no ves' con intención."
echo FIN
