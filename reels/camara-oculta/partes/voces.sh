#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/camara-oculta; con reintentos).
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
COND="Sos el conductor de un programa uruguayo de cámaras ocultas, escondido en una camioneta con auriculares: pícaro, cómplice, susurrando muy cerca del micrófono para que la víctima no lo escuche, aguantándose la risa."
FEDE="Sos Fede, un muchacho montevideano de veinticinco años con mucha hambre, mirando el celular en la vereda: primero tranquilo, después cada vez más desesperado e indignado, exagerado y gracioso."
TITO="Sos Don Tito, un parrillero de barrio montevideano de unos sesenta años, orgulloso, canchero y despreocupado, con la pinza del asado en la mano. Lo dice con total seguridad, casi ofendido."
gen 01 Fenrir "$COND Arranca la broma: susurra con picardía, como un secreto, pero clarito."
gen 02 Fenrir "$COND Presenta a la víctima en susurros, divertido, pero articulando bien clarito cada palabra, sobre todo el nombre Fede."
gen 03 Puck "$FEDE Lee la página en voz alta, impaciente, y al final grita sorprendido y avergonzado porque la música sonó fuerte en público."
gen 04 Fenrir "$COND Susurra tentado de risa, casi sin poder aguantarla."
gen 05 Puck "$FEDE Incrédulo, cada frase más indignado."
gen 06 Puck "$FEDE Lee la dirección confundido y remata desconcertado."
gen 07 Puck "$FEDE Rápido, sin pausas largas; al final grita desesperado, harto."
gen 08 Puck "$FEDE Mira alrededor, desconfiado, en voz baja y sospechando."
gen 09 Fenrir "Sos el conductor de un programa uruguayo de cámaras ocultas que sale de la camioneta a revelar la broma: ya no susurra, grita contento, eufórico y fiestero, como en la tele."
gen 10 Puck "$FEDE Se ríe aliviado, se agarra la cabeza, y después pregunta con curiosidad genuina."
gen 11 Fenrir "Sos el conductor de un programa de cámaras ocultas. Se le va la sonrisa de golpe y lo dice serio, bajito, seco, como una mala noticia, pero articulando bien clarito cada palabra."
gen 12 Puck "$FEDE Resignado primero, después cruza la calle contento y lo cuenta rápido, satisfecho, sorprendido de lo fácil que fue."
gen 13 Charon "$TITO"
gen 14 Fenrir "Sos el conductor de un programa de cámaras ocultas. Lo dice despacio, con pena y con ironía, como dándole una mala noticia a un amigo."
gen 15 Orus "Sos el narrador de Scalerics, cercano y con una sonrisa, como un amigo que te dice la verdad después del chiste. Cerrás invitando a compartir el video, con humor."
