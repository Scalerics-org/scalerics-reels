#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/el-reencuentro. Voces: conductora Aoede (01 02 04 06 11), Don Aldo Charon (03 05 08),
# Graciela Gacrux (07 09), público (10: cuatro voces encimadas), narrador Orus (12 13).
V=../../herramientas/voz.mjs
gen() { # n voz tono [archivo de texto]
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/${4:-$1}.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos la conductora de un programa de reencuentros de la tarde en la televisión, de esos lacrimógenos: voz cálida, melosa y muy emocionada, dramática, con la voz que se le quiebra a propósito; exagerada a propósito, y por eso es graciosa."
ALD="Sos Don Aldo, el dueño de una mueblería de barrio de Montevideo, de unos 60 años, sentado en el sillón de un programa de reencuentros de la tele. Bonachón, emocionado hasta las lágrimas, con la voz temblorosa; gracioso sin querer."
GRA="Sos Graciela, una señora uruguaya de unos 60 años, que aparece detrás de la cortina en un programa de reencuentros de la tele. Amable, tranquila y un poco piadosa, como quien da una mala noticia con cariño."
gen 01 Aoede "$CON Arrancás fuerte, como el anuncio de un drama: 'Don Aldo la busca desde marzo' con emoción; 'Él nunca la llamó' lento, con un suspiro, como la peor tragedia del mundo."
gen 02 Aoede "$CON Saludás a la audiencia con dulzura de la tarde, y después le pedís a Don Aldo que cuente, con ternura."
gen 03 Charon "$ALD Contás la historia con nostalgia, como un amor perdido; 'el lunes la llamo, sin falta' con orgullo ingenuo, como una promesa."
gen 04 Aoede "$CON Preguntás con un hilo de voz, con suspenso, ya sabiendo la respuesta."
gen 05 Charon "$ALD Primero avergonzado; se te va quebrando la voz, casi llorando en 'la señora del sillón verde'."
gen 06 Aoede "$CON 'Música, por favor' susurrado; 'Un pañuelo para Don Aldo' con ternura; 'Porque hoy, la encontramos' subiendo la emoción; y '¡Que se abra la cortina!' a los gritos, eufórica, como el gran momento del programa."
gen 07 Gacrux "$GRA Saludás con calma, un poco incómoda."
gen 08 Charon "$ALD Feliz, eufórico, aliviado, casi gritando de alegría, como si encontrara a un familiar perdido."
gen 09 Gacrux "$GRA 'Ay, Aldo' con lástima. Contás despacio y con cariño que ya lo compraste en otro lado; la última frase con una sonrisita, sin maldad, como un pinchazo amable."
gen 10a Leda "Sos una señora del público de un programa de televisión que reacciona a una noticia triste con un largo '¡Oooh!' de pena y sorpresa." 10
gen 10b Fenrir "Sos un hombre del público de un programa de televisión que reacciona a una noticia triste con un largo '¡Oooh!' de pena." 10
gen 10c Kore "Sos una muchacha del público de un programa de televisión que reacciona con un largo '¡Oooh!' de lástima." 10
gen 10d Puck "Sos un muchacho del público de un programa de televisión que reacciona con un '¡Oooh!' largo y burlón." 10
gen 11 Aoede "$CON Ahora consolás a Don Aldo, cálida y comprensiva, como una amiga: 'Usted no es un desastre' con cariño; la última frase convencida y tierna."
gen 12 Orus "Sos el narrador de Scalerics que entra al final de un programa de reencuentros de la tele: cálido, claro y seguro, explicando simple. 'Llamá a Graciela' como el mensaje de un aviso. 'Sin programa de tele' con una sonrisa."
gen 13 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a un amigo."
