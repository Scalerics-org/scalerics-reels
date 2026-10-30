#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/houston-marta.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
DIR="Sos el director de vuelo de un control de misión espacial de película de los años setenta, con auriculares y camisa arremangada, en plena crisis: voz grave y tensa, dramático y solemne como en una película de la NASA, y por eso es gracioso."
OPE="Sos un operador de consola joven de un control de misión espacial en crisis, reportando fallas a los gritos, rápido, nervioso y acelerado, como quien lee alarmas en la pantalla."
MAR="Sos Marta, la encargada de un comercio de Montevideo, de unos 55 años, hablando por radio desde la playa en Piriápolis, en una reposera: tranquilísima, relajada, dulce y sin ningún apuro, como si no pasara nada."
gen 01 Charon "$DIR Arrancás con un golpe seco y solemne, hablando por el micrófono: 'Houston, tenemos un problema', pausa, y la segunda parte como una tragedia."
gen 02 Puck "$OPE Tres alarmas seguidas, cada vez más alarmado."
gen 03 Charon "$DIR Pregunta seca y urgente."
gen 04 Puck "$OPE Con miedo, bajando la voz: 'Eso lo sabe Marta' como si fuera una mala noticia."
gen 05 Charon "$DIR Una orden a los gritos, desesperado."
gen 06 Aoede "$MAR Saludás con cariño y mucha calma, como si te despertaran de la siesta."
gen 07 Puck "$OPE Primero entusiasmado; 'Analizando...' concentrado; la pregunta final confundido de verdad, mirando un garabato."
gen 08 Aoede "$MAR Corregís con paciencia, despacito, como explicándole a un nene."
gen 09 Puck "$OPE Alarmado, como si entrara un meteorito: '¡Vino Don Carlos!'."
gen 10 Charon "$DIR Suplicando, al borde del llanto."
gen 11 Aoede "$MAR Tranquila y sobradora: 'ese lo sé yo' con una sonrisa; la última frase queda cortada en el aire, sin terminar."
gen 12 Puck "$OPE Desesperado, gritando."
gen 13 Charon "$DIR Dramático y solemne, mirando la pantalla grande; la segunda frase como sentencia."
gen 14 Charon "$DIR Ahora cambia: más calmo, reflexivo y cálido, defendiendo a Marta con admiración; 'Y su cabeza está en la playa.' con resignación graciosa."
gen 15 Orus "Sos el narrador de Scalerics que entra cuando se calma la crisis: cálido, claro y seguro, explicando simple, como un amigo que trae la solución."
gen 16 Orus "Sos el narrador de Scalerics: alegre y con una sonrisa; 'sin que nada explote' con gracia."
gen 17 Aoede "$MAR Volviste de vacaciones, contenta y bronceada, entrando al local: '¿me extrañaron?' con picardía."
gen 18 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a una amiga o un compañero."
