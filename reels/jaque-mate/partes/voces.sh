#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/jaque-mate.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>partes/$1.err && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
GM="Sos un gran maestro de ajedrez veterano, uruguayo, comentando un torneo por televisión: voz grave, lenta, solemne, cada palabra pesada como una jugada histórica, con una ironía seca. Lo gracioso es lo serio que se lo toma."
AY="Sos el ayudante joven del comentarista en la transmisión de ajedrez, uruguayo: entusiasta, acelerado, un poco tonto, no entiende nada de ajedrez y lo relata como si fuera un partido de fútbol."
DU="Sos el dueño de una zapatería de barrio en Uruguay, atendiendo el mostrador lleno de gente: apurado, distraído, desganado con el celular, sin darle importancia."
CL="Sos una clienta uruguaya de unos treinta años escribiéndole por WhatsApp a una zapatería: simpática, natural, interesada."
gen 01 Charon "$GM Arrancá con el resultado como una sentencia: 'Jaque mate' lento y grave; la segunda frase, mirando al dueño a la cara, con sorna."
gen 02 Puck "$AY Presentando el torneo a los gritos como un relator; 'pero sin glamour' más bajito, con picardía."
gen 03 Charon "$GM Narrando la primera jugada con ceremonia, en voz baja."
gen 04 Leda "$CL Pregunta rápida y simpática."
gen 05 Fenrir "$DU Seco, rápido, sin levantar la vista; 'cualquier cosa, avisame' como quien se saca el tema de encima."
gen 06 Charon "$GM 'Buena apertura' aprobando; pausa; 'y ahora... el reloj' con suspenso."
gen 07 Puck "$AY Impaciente, confundido."
gen 08 Fenrir "$DU Desganado, con la boca llena, sin ganas."
gen 09 Charon "$GM Seco, demoledor, como un dato terrible."
gen 10 Puck "$AY Gritando, sorprendido como en un gol del rival; '¿eso se puede?' indignado e ingenuo."
gen 11 Charon "$GM Tranquilo, pedagógico; 'seguimiento' bien claro, como el nombre de una apertura famosa."
gen 12 Puck "$AY Escandalizado, rápido, como en un contraataque."
gen 13 Charon "$GM Lento, con pausas; 'pero a la de enfrente' con pena; 'Jaque' fuerte y seco."
gen 14 Fenrir "$DU Desesperado, levantando la voz, ofendido, con el mostrador lleno."
gen 15 Charon "$GM Lento, definitivo, con un susurro grave, como cerrando la partida."
gen 16 Puck "$AY Preguntando de verdad, inocente, un poco triste."
gen 17 Charon "$GM Cambia el tono: ya no se burla, defiende al dueño con respeto y cariño; 'juega solo' clave; 'tiene ayuda' revelando el secreto."
gen 18 Orus "Sos el narrador de Scalerics que entra cuando termina la partida: voz cálida, clara y segura, como un amigo que trae la solución; 'agente de IA' bien claro; ritmo ágil."
gen 19 Kore "Sos un agente de IA amable que le escribe a una clienta de una zapatería uruguaya: cálida, simpática, eficiente, breve."
gen 20 Leda "$CL Contenta, sorprendida para bien, decidida."
gen 21 Puck "$AY Eufórico, como un gol propio."
gen 22 Charon "$GM Grave, con una sonrisa, desafiante."
gen 23 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una pregunta directa al que mira, invitando a contestar en los comentarios."
