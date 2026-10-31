#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/chimentos; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" > partes/$1.log 2>&1 && return
    sleep $((8 + i * 5))
  done
  echo "FALLÓ $1"
}
CON="Sos la conductora de un programa de chimentos de la tarde de la tele uruguaya, 'Picante a las Cinco': chusma, teatral, exagerada, encantada con el escándalo, con voz de primicia, como quien revela un secreto jugoso en vivo."
AOE="Sos una panelista de un programa de chimentos de la tele uruguaya: chusma, dramática, se escandaliza de todo, montevideana, rápida, interrumpe."
PUC="Sos un panelista varón de un programa de chimentos de la tele uruguaya: pícaro, canchero, exagerado, le encanta pisar a la compañera con un remate, montevideano."
MAR="Sos el marido de una peluquera de barrio en Montevideo, declarando en un programa de chimentos: dolido, resignado, medio tierno, con voz grave y cansada, como un despechado que cuenta su drama con humor seco."
ORU="Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te cuenta la solución después del chiste; seguro y claro."
gen 01 Zephyr "$CON Arrancá con '¡Primicia!' bien fuerte, como una bomba; pausa de suspenso antes de 'mandándole WhatsApp' y remata 'una por una' escandalizada." &
gen 02 Aoede "$AOE Con morbo, desesperada por saber." &
gen 03 Puck "$PUC Lo grita pisándola, triunfal." &
gen 04 Zephyr "$CON Lo de las comillas lo lee como el mensaje del celular; 'cuarenta veces' con escándalo." &
gen 05 Aoede "$AOE Horrorizada y divertida." &
wait
gen 06 Puck "$PUC Mostrando otra foto como si fuera un escándalo mayor; lo de las comillas lo lee como un mensaje." &
gen 07 Zephyr "$CON Como anunciando una exclusiva." &
gen 08 Charon "$MAR" &
gen 09 Aoede "$AOE Un solo grito escandalizado." &
gen 10 Puck "$PUC Lo grita encima, exagerado." &
wait
gen 11 Aoede "$AOE Esta vez frenando a todos, con el dato que nadie tiene, bajando la voz como una confidencia jugosa, y 'le salen solos' con picardía." &
gen 12 Zephyr "$CON Desconcertada, intrigadísima." &
gen 13 Puck "$PUC Canchero, sobrador, como explicando lo obvio." &
gen 14 Orus "$ORU" &
gen 15 Zephyr "$CON Cerrás el programa invitando, cómplice y pícara." &
wait
