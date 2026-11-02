#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos). Correr desde reels/emergencias.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((10 + i * 5))
  done
  echo "FALLÓ $1"
}
OPE="Sos una operadora de la central de emergencias de noche, como en las series policiales: profesional, seria, serena, firme y clara, voz de protocolo. Te tomás todo totalmente en serio aunque sea absurdo, y nunca te reís: justamente por eso es gracioso."
LLA="Sos un muchacho uruguayo de unos 30 años que llama a emergencias desde el celular, desesperado y muerto de hambre, sobreactuado, hablando rápido y entrecortado, como si fuera una tragedia de verdad, de manera muy cómica."
PAT="Sos un policía veterano uruguayo, de unos 55 años, hablando por la radio del patrullero: grave, cansado, parco, informe de procedimiento, sin apuro."
gen 01 Kore "$OPE Atendés la llamada con la frase de protocolo."
gen 02 Puck "$LLA Arrancás de golpe, a los gritos, angustiado."
gen 03 Kore "$OPE Calmada, preguntando como si fuera un paciente."
gen 04 Puck "$LLA Mirando la pantalla con angustia creciente; 'cargando' estirado; '¡no respira!' como un grito de drama."
gen 05 Kore "$OPE Despachando por radio, rápida y precisa; 'código milanesa' con total seriedad."
gen 06 Puck "$LLA Primero esperanzado, después indignado con el PDF, al final desesperado porque se le movió la pantalla."
gen 07 Kore "$OPE Instrucción firme y tranquila."
gen 08 Puck "$LLA Indignado; la última frase con desesperación total."
gen 09 Kore "$OPE Por radio, seca y breve."
gen 10 Charon "$PAT Informe por radio; 'espectaculares' con la boca llena, disfrutando, en voz baja."
gen 11 Kore "$OPE Pregunta seca, profesional."
gen 12 Charon "$PAT Grave y sabio, como un detective que resuelve el caso; 'está trabada' como la revelación final."
gen 13 Orus "Sos el narrador de Scalerics que entra cuando se resuelve el caso: cálido, claro, seguro y cercano, como un amigo que trae la solución, ritmo ágil."
gen 14 Orus "Sos el narrador de Scalerics: cierre canchero y con una sonrisa, una invitación a etiquetar a alguien."
