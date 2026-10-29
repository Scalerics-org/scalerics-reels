#!/bin/bash
# Genera cada parlamento con su voz y su tono (con reintentos: la cuota por minuto es compartida).
# Correr desde reels/la-receta.
V=../../herramientas/voz.mjs
gen() { # n voz tono
  [ -s partes/$1.wav ] && return
  for i in 1 2 3 4 5 6 7 8; do
    node $V partes/$1.txt partes/$1.wav --voz $2 --tono "$3" 2>/dev/null && return
    sleep $((15 + i * 5))
  done
  echo "FALLÓ $1"
}
CHEF="Sos un cocinero de un programa de cocina de la tele uruguaya del mediodía, en vivo, canchero, simpático y exagerado, que le habla a las señoras de la casa y al público del estudio con entusiasmo de animador. Ritmo ágil, sonrisa en la voz."
gen 01 Fenrir "$CHEF Arrancás saludando a cámara con energía y presentás la receta como un truco genial; 'Sale en tres días' es un remate seco y sobrador."
gen 02 Fenrir "$CHEF 'Paso uno' lo anunciás fuerte como título; el mensaje entre comillas lo leés imitando a un cliente amable; 'Y no lo contestes' lo decís pícaro, en voz más baja."
gen 03 Fenrir "$CHEF 'Paso dos' fuerte como título; el resto con calma de cocinero que tapa la olla, cariñoso."
gen 04 Fenrir "$CHEF 'Paso tres' fuerte como título; 'consultá por privado' lo decís con tono de cartel de Instagram; 'Aunque ya estaba en privado' es un chiste, como aparte, cómplice."
gen 05 Fenrir "$CHEF 'Paso cuatro' fuerte como título; 'Espolvoreá' con gesto elegante de chef, y 'pasá el lunes' con desgano de mostrador."
gen 06 Fenrir "$CHEF 'Y paso cinco' con suspenso; '¡Listo!' triunfal; 'A ver, probá, probá' invitando a una clienta del público, entusiasmado."
gen 07 Leda "Sos una clienta joven uruguaya, del público de un programa de cocina, que prueba un plato con la cuchara. Arrancás saboreando, dudosa; después con cara de asco, seca y educada; al final te levantás y te vas, decidida, con humor."
gen 08 Fenrir "$CHEF Festejás orgulloso, a los gritos, como si el plato hubiera salido de diez."
gen 09 Fenrir "Sos un cocinero de programa de cocina de la tele uruguaya. Ahora bajás el tono, te ponés serio y cálido, como un amigo que te dice la verdad: le hablás al dueño de un comercio. Frases claras, sin apuro."
gen 10 Fenrir "Sos un cocinero de programa de cocina de la tele uruguaya. Hacés una pregunta en voz baja, cómplice, como quien cuenta un secreto de familia, acercándote a la cámara."
gen 11 Orus "Sos el narrador de Scalerics que entra al final de un programa de cocina: cálido, seguro y cercano, con una sonrisa; el cierre 'Guardá esta receta. Para no hacerla nunca.' es una invitación canchera, con una pausa antes de 'Para no hacerla nunca'."
