#!/bin/bash
# Genera cada parlamento con su voz y su tono (correr desde reels/la-murga). Con reintentos.
V=../../herramientas/voz.mjs
gen() { # archivo voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/${1%%-*}.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CUP="Sos el director y cupletero de una murga uruguaya de carnaval, de galera y cara pintada, arriba de un tablado de barrio en Montevideo, de noche. Recitás medio cantando, con el ritmo marcado de la marcha camión del bombo y los platillos, pícaro, canchero y burlón, estirando un poco la última vocal de cada verso."
CORO="Sos el coro de una murga uruguaya de carnaval cantando todos juntos a viva voz en el tablado, fuerte, burlón y con ritmo marcado de marcha camión, estirando la última vocal de cada verso."
RET="Sos el coro de una murga uruguaya cantando la retirada, el final emotivo del espectáculo: a viva voz, cálido, emocionado y con ritmo lento y solemne de murga, estirando las vocales."
gen 01 Fenrir "$CUP Este es el saludo: arrancá con un golpe seco, provocador."
gen 02-a Puck "$CORO"; gen 02-b Algenib "$CORO"
gen 03 Fenrir "$CUP"
gen 04-a Puck "$CORO"; gen 04-b Algenib "$CORO"
gen 05 Fenrir "$CUP"
gen 06-a Puck "$CORO Es un remate corto, gritado."; gen 06-b Algenib "$CORO Es un remate corto, gritado."
gen 07 Charon "Sos el dueño de un comercio de barrio, cansado, que está mirando la murga desde el público y se ofende: gritás desde abajo del tablado, indignado y agotado a la vez, con humor, interrumpiendo el espectáculo."
gen 08 Fenrir "Sos el director de una murga uruguaya que frena el espectáculo de golpe: primero sorprendido y serio, dándole la razón al vecino con respeto, y al final arengás con energía a la murga."
gen 09-a Puck "$RET"; gen 09-b Algenib "$RET"
gen 10 Fenrir "$CUP Ahora es la retirada: tono cálido y orgulloso, celebrando."
gen 11-a Puck "$CORO Final de fiesta, eufórico."; gen 11-b Algenib "$CORO Final de fiesta, eufórico."
gen 12 Orus "Sos el narrador que cierra el reel después de la murga: cercano, seguro y con una sonrisa, invitando a etiquetar a alguien."
