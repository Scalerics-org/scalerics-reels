#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/ultimo-momento; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
COND="Sos la conductora de un noticiero de televisión uruguayo, en el estudio, leyendo una noticia de último momento: voz firme, seria, solemne y urgente, como si fuera una catástrofe nacional. Dicción impecable de noticiero."
CRON="Sos un cronista de exteriores de un noticiero uruguayo, en vivo desde la vereda de un barrio de Montevideo, micrófono en mano: enérgico, chismoso, un poco exagerado y canchero, como movilero de noticiero."
DUE="Sos un comerciante de barrio montevideano de unos sesenta años, cansado y resignado, quejoso, que le echa la culpa a todo menos a él. Habla lento, arrastrando, con tono de excusa."
VEC="Sos una vecina joven de Montevideo, entrevistada en la vereda por la tele: un poco avergonzada al principio, después indignada y chusma, contándolo como un chisme."
gen 01 Kore "$COND"
gen 02 Puck "$CRON"
gen 03 Charon "$DUE"
gen 04 Puck "$CRON Pregunta corta, picante, con un poco de sorna."
gen 05 Charon "$DUE Lo dice como si fuera lo más normal del mundo, sin culpa."
gen 06 Puck "$CRON Lo dice con suspenso y chusmerío, haciendo una pausa dramática antes de 'del local de enfrente'."
gen 07 Leda "$VEC"
gen 08 Puck "$CRON Lo cuenta como una gran revelación, en voz baja y con suspenso, y remata fuerte en 'un agente de IA'."
gen 09 Charon "$DUE Pregunta desconcertado, casi suplicando."
gen 10 Puck "$CRON Lo remata seco, con ironía, como el golpe final."
gen 11 Kore "$COND Lo dice sorprendida, conteniendo la indignación, y cierra la nota."
gen 12 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta algo en confianza después del chiste. Cerrás invitando a compartir el video, con humor."
